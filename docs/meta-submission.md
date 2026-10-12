# Meta submission: what must ship, and the app settings sheet

Companion to `public/privacy.html`, `public/terms.html`, `public/data-deletion.html` and
`docs/legal-meta-scope.md`. Written 12 October 2026. Spec only: nothing here is built.

Tags: [Certain] read in code or a doc, cited. [Likely] strong inference. [Guessing] flagged.
Code refs are `tompapesch-ctrl/timeslot` branch `backend` at `b8cab79` unless said otherwise.

## 1. Must ship before the pages are published

The rule: every sentence in the three pages is true of the code today **or** is made true by an
item below. Each item names the sentences it makes true.

### S1. Per-client erase (blocks the client half of /data-deletion)

**Why.** Today a client's data is deleted only when the provider's whole account is erased
(`lib/account/erase.ts:307-321`). There is no route for one client [Certain].

**Input.** `providerId` plus `clientId` (`BusinessClient.id`). The admin path finds the client by
provider plus WhatsApp number (`BusinessClient.waId`, digits only).

**Who can trigger it.**
- **The provider, in the app.** Add a "Delete this client's information" action. Backend:
  `DELETE /api/v1/business/clients/:id`, bearer auth, and only for the caller's own provider.
  The app half sits in Daniel's `apps/business` lane.
- **An admin, from the ops console**, for requests that arrive by email. The action is logged in
  `AdminAction` with a reason. Correntum is the operator, so the admin records the provider's
  instruction, or the provider's failure to answer within the 30-day window.

**What it must clear, in one transaction, all scoped to that provider and that client:**

| Table | What | How |
|---|---|---|
| `BusinessMessage` | Every message in the client's thread: bodies, captions, file names, location names, echoes, history rows | delete by threadId |
| `BusinessThread` | The client's thread | delete |
| `BusinessRecord` | Interpretations (including `basis` quotes of client text, `interpret.ts:107`), proposed actions and receipts for that thread | delete where the data names the thread or its messages |
| `BusinessEvent` | **Message text lives here.** `message.received` and `message.sent` payloads carry the whole message (`packages/engine/engine.ts:570, 676, 690`), plus `interpretation.recorded`, `booking.written` and `hold.*` for that client | The table is append-only by trigger. Add a `SECURITY DEFINER` function `erase_client_business_events(provider, client)` modelled on `erase_business_events` (migration `20261004074516_p2_u0_deletion:107-126`). It deletes only events whose subject or payload names the client's thread, messages, holds or bookings |
| `SlotHold` | Holds whose `clientRef` is the client | delete |
| `Booking` (+ `TimeBlock`, `BookingEvent` by cascade) | The client's bookings with this provider | First snapshot paid and deposit rows into `RetainedFinancialRecord` (reuse `erase.ts:138-165`), then delete |
| `BusinessClient` | The client row (name, waId, notes, source) | delete |
| `User` | The placeholder user (`email` ends `.invalid`, `channel.ts:177-179`) | delete, same filter as `erase.ts:320` |
| New `ClientErasure` | providerId, a one-way hash of the waId, date | insert, so a restore can replay it (S2) |

**Logs.** Vercel runtime logs expire after 1 hour on Hobby (`DEPLOY.md:36`) [Certain]. The erase
must log ids only, like `erase.ts:429-432`. Check that `console.error(..., e)` at
`lib/business/channel.ts:353` cannot print message text from an Anthropic error [Guessing that it
can].

**Backups.** Not edited. The data stays until the backup is pruned (8 weeks at most once S2
ships). After any restore, S2 replays the `ClientErasure` rows.

**Meta and Anthropic.** No call. Meta keeps messages at most 30 days (Meta data-privacy page)
[Certain]. No deletion API for either is used anywhere in the code [Certain].

**Before it.** S6. Otherwise username-only clients share one thread and the erase deletes other
people's messages.

**Tests.** Mutation-tested, the same way the existing erase was:
- Deletes only that client; the same provider's other clients are untouched.
- Other providers are untouched.
- A paid booking leaves a `RetainedFinancialRecord`.
- Running it twice is safe.
- Refused for another provider's client.
- That client's `BusinessEvent` rows are gone and the others stay.

**Effort.** Backend 2 to 4 days. App button 0.5 to 1 day.

**Makes true:**
- /privacy: "It is erased when the business deletes it ... or when you ask us to delete it".
- /terms §5: "delete it when you ask". /terms §6: "until you delete them".
- /data-deletion: the whole client section, including "They can do this in the app" and
  "Within 30 days of confirming your request".

### S2. Backups: keep 8, replay erasures after a restore

**Today.** `scripts/backup-db.sh` keeps everything unless someone runs `--prune`, and nothing
schedules it ("by Daniel, by hand, once a week", `backup-db.sh:5-7, 85-88`). A restore brings
erased people back, to be re-erased by hand (`DEPLOY.md:414-417`) [Certain].

**Ship.**
- Prune to 8 on every backup run.
- Have the restore procedure replay `AccountErasure` and `ClientErasure`.
- Name an owner for the weekly run.

**Effort.** 0.5 to 1 day.

**Makes true:** /privacy and /data-deletion "keep the 8 most recent ... at most about 8 weeks" and
"we erase again anyone who had already been erased".

### S3. WhatsApp disconnect

**Today.** The webhook ignores `account_update`. It handles only `messages`,
`smb_message_echoes`, `history` and `smb_app_state_sync` (`channel.ts:104-133`). Nothing calls
Meta on disconnect. There is no disconnect endpoint on any pushed branch [Certain].

**Ship.**
- On `account_update` with `PARTNER_REMOVED` (Meta's coexistence page), and from an admin action
  for emailed requests: call `DELETE /{WABA-ID}/subscribed_apps`, delete the `WhatsAppAccount`
  row, and delete the token (S4).
- Keep threads and messages. They stay until per-client erase (S1) or account erase.
- R53 assigns this to Tom.

**Effort.** 2 to 3 days.

**Makes true:**
- /terms §6: "email us and we will disconnect it for you" and "we stop receiving ... and we
  delete the connection details and access key".
- /data-deletion: "Only disconnecting WhatsApp".

### S4. A token that code can delete

**Today.** The token is a Vercel env var named by `WhatsAppAccount.tokenRef`
(`schema.prisma:1016-1017`, `channel.ts:384`). It is removed by hand (ledger `TODO.md:213`)
[Certain].

**Ship.** Encrypted per-number storage that S3 deletes in the same transaction. Embedded Signup
v4 issues a token per business, so per-provider env vars will not scale anyway [Likely].

**Effort.** 1 to 2 days.

**Makes true:** "we delete the connection details and access key".

### S5. Admin "delete this account" for emailed requests

**Today.** Deletion can only be requested by the signed-in user
(`app/api/v1/me/deletion/route.ts:13-39`). The ops console (`app/admin/*`) has no deletion action
[Certain].

**Ship.** An admin action that calls the existing `requestDeletion` (`lib/account/deletion.ts:48`)
for a user, after checking the email came from the account's address, logged in `AdminAction`.

**Effort.** 0.5 day.

**Makes true:** /data-deletion and /terms §7: "Or email support@correntum.com ... and ask us to
delete it".

### S6. Username-only WhatsApp senders

**Today.** A sender with a username and no number lands in one shared thread per provider
(ledger `TODO.md:85`; `channel.ts:58, 108, 147`) [Certain].

**Ship.** Key clients on Meta's user id when there is no number.

**Effort.** 1 to 2 days.

**Makes true:** a precondition of S1. Without it, "we delete your information" deletes other
people's too.

### S7. In-app Delete account, released

**Today.** The screen exists on branch `business`: `apps/business/app/delete-account.tsx`, which
confirms, asks for sign-in again, requests, and shows the 30-day date
(`src/screens/settings/DeleteAccount.tsx:13-22`). The app is not released ("Coming soon", site
`TimeslotBusiness.jsx`) [Certain].

**Ship.** Release the app with this screen wired to the backend. Or, until then, remove the in-app
steps from /data-deletion and /terms §7 and leave the email route (which needs S5).

**Effort.** Part of the app release, Daniel's lane. Not estimated here.

**Makes true:** /data-deletion provider steps 1 to 3, and /terms §7 "Settings, then Delete
account".

### S8. Facts, review and publish

**Fill.** Every `[[MISSING: ...]]` in the three pages:
- effective date;
- Information Officer;
- the s72 grounds;
- where Anthropic and Expo process data;
- fees;
- the liability cap.

**Then.**
- Founder review, then lawyer review.
- Remove the three `DRAFT` banners.
- Deploy the site (Marcel's Vercel project).
- Confirm on the live URL: `curl -A "facebookexternalhit/1.1" https://www.correntum.com/privacy`
  returns 200, the full text, and no `X-Robots-Tag`.

**Effort.** Under 1 day of work, plus review time.

**Hold-back.** If any S-item is not shipped, the matching sentence must be cut before publishing,
not published as a promise.

### Watch items (true today, false if something changes)

- "Our server logs are kept for 1 hour" holds only on Vercel Hobby (`DEPLOY.md:36`). A plan
  upgrade changes it.
- "London" holds only while `vercel.json` says `lhr1` and Supabase is `eu-west-2`
  (`DEPLOY.md:13`). The Cape Town path (`cpt1`) would change the cross-border section.
- "Postmark keeps email content for 45 days" comes from `docs/launch/infra-runbook.md:87`, not
  from the Postmark account settings [Likely].
- The WhatsApp contacts sentence assumes the contact sync is requested
  (`scripts/whatsapp-connect.ts --sync`). If the founders decide never to request it, remove that
  paragraph.

## 2. Meta app settings sheet

"Ready" means the value exists and is true today. Everything else names what blocks it. The Meta
app itself has not been created: no App ID is in either repo [Certain].

| Where | Field | Value to enter | Status |
|---|---|---|---|
| Settings > Basic | Display Name | `Timeslot Business` | Ready (the app's name in `apps/business/app.json`) |
| Settings > Basic | App Icon | `public/timeslot-business/media/timeslot-business-app-icon.png` (1024x1024) | Ready |
| Settings > Basic | Contact Email | `support@correntum.com` | Ready [Likely: alias to marcel@ per SITE-SETUP §3] |
| Settings > Basic | Privacy Policy URL | `https://www.correntum.com/privacy` | Blocked by S1 to S8 (deploy, MISSING facts, DRAFT banner) |
| Settings > Basic | Terms of Service URL | `https://www.correntum.com/terms` | Blocked by S3, S4, S5, S7, S8 (fees and liability cap are MISSING). Required to switch to Live |
| Settings > Basic | User Data Deletion | Choose "Data deletion instructions URL": `https://www.correntum.com/data-deletion` | Blocked by S1, S3, S5, S6, S7, S8 |
| Settings > Basic | App Domains | `correntum.com`. Add the Embedded Signup host domain once chosen | Ready for `correntum.com` |
| Settings > Basic | Category | Founder choice [Guessing: a business or productivity category] | Blocked by founder decision |
| Settings > Basic | App Purpose | Clients (Correntum builds for other businesses) [Likely] | Blocked by founder decision |
| Business portfolio | Legal name / address / phone / website | `Correntum (Pty) Ltd` / `1236 Val de Vie Boulevard, Paarl, Western Cape, 7646` / `+27 72 388 0408` / `https://www.correntum.com` | Ready on the site. Verification needs the CIPC document, from the founders |
| Business portfolio | Domain verification | `<meta name="facebook-domain-verification" content="...">` in `index.html` | Blocked: the token is created in Business Settings |
| Facebook Login for Business > Configurations | Configuration | Template "WhatsApp Embedded Signup Configuration With 60 Expiration Token" (v4) | Blocked by app creation |
| Facebook Login for Business > Settings | Client OAuth login, Web OAuth login, Enforce HTTPS, Embedded Browser OAuth Login, Strict Mode for redirect URIs, Login with the JavaScript SDK | All Yes | Blocked by app creation |
| Facebook Login for Business > Settings | Allowed Domains for the JavaScript SDK | [[MISSING: domain of the page that hosts Embedded Signup]] | Blocked: no Embedded Signup page exists |
| Facebook Login for Business > Settings | Valid OAuth Redirect URIs | [[MISSING: same page's HTTPS URL]] | Blocked, as above |
| WhatsApp > Configuration | Webhook callback URL | `https://api.timeslotbusiness.com/api/whatsapp/webhook` (route exists: `app/api/whatsapp/webhook/route.ts`) | Blocked. The host does not answer yet (curl on 12 Oct). The pilot release gate keeps WhatsApp off (`RELEASE-GATES.md:66-80`). R50 (Daniel's written agreement) is open |
| WhatsApp > Configuration | Verify token | The value of `WHATSAPP_VERIFY_TOKEN` (a secret, never written here) | Blocked, as above |
| WhatsApp > Configuration | Webhook fields | `messages`, `smb_message_echoes`, `history`, `smb_app_state_sync`, `account_update` | `account_update` blocked by S3. The rest are handled in code |
| App Review | Permissions (Advanced access) | `whatsapp_business_messaging`, `whatsapp_business_management`, `public_profile` | Blocked by business verification, then one screen recording per permission |
