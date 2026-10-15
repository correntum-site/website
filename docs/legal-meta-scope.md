# Privacy policy, terms and data deletion for Meta: scope

Scope only. No legal text, no app code, nothing pushed, no Meta or hosting setting touched.
Written 12 October 2026 for Tom, Daniel and Marcel. Not legal advice.

> **Superseded in part (12 Oct 2026, branch `legal/meta-pages`):** the pages now live at `/privacy`,
> `/terms` and `/data-deletion` as static HTML (not the `/timeslot-business/...` paths suggested below).
> The build items and settings sheet are in `docs/meta-submission.md`.

**Tags.** [Certain] = read in a doc or in code, cited. [Likely] = strong inference, reason given.
[Guessing] = flagged as a guess.

**Where the citations point.**

| Short | What it is |
|---|---|
| Site | this repo, `correntum-site/website`, `main` at `0275d91` |
| B | `tompapesch-ctrl/timeslot`, branch `backend` at `b8cab79` (12 Oct 2026, newest backend, the only ref with deletion code) |
| BZ | timeslot, branch `business` (App Store research) |
| CS | timeslot, branch `correntum-site` at `d60b9cf` (Daniel's static draft of this site and its research) |
| SS | timeslot, branch `marcel/site-setup` at `6444428` (`SITE-SETUP.md`) |
| LG | timeslot, branch `ledger` (`TODO.md`, `LEDGER.md`) |
| L | timeslot, `lane/whatsapp-interface-2026-10` at `00e08f7`, local on Tom's machine, not pushed |
| Live | `curl` against `https://www.correntum.com` on 12 Oct 2026 |
| Meta | developers.facebook.com pages fetched 12 Oct 2026; each page's own "Updated" date is given |

---

## 0. Read this first

1. **There is no document called the "Meta webhooks integration plan".** [Certain] What I searched:
   every file on this repo (no `docs/`, README has no Meta content, no issues, no PRs), and every
   branch of `tompapesch-ctrl/timeslot` with `git grep` for webhook, Meta, WhatsApp, privacy,
   deletion, "Tech Provider", "coexistence", "integration plan", "data deletion", "App Review".
   The ledger points at `~/Projects/compliance-pack/META.md` as the source for the Embedded Signup
   deadline (LG `TODO.md:84`). That file is in no repo and not on Tom's machine. [Certain]
   This scope therefore treats these as "the plan" [Likely, they are what exists]:
   - CS `META-APPLE-CHECKLIST.md` and CS `research/REQUIREMENTS.md`: Meta, Apple and POPIA
     requirements mapped to site pages.
   - SS `SITE-SETUP.md`: site, domain, email and the URLs to put in the Meta dashboard.
   - B `docs/business/whatsapp-cloud-api.md` and B
     `docs/superpowers/plans/2026-09-22-timeslot-business-build-guide.md` section 4: the webhook
     build and what is owed.
   - LG `TODO.md`: the open legal and WhatsApp items.
   If `compliance-pack/META.md` is the real plan, someone with it should diff it against this
   file.
2. **The privacy policy Meta will check cannot be read by a crawler.** [Certain] Every path on
   www.correntum.com returns the same 1,448 byte `index.html` (Live; `index.html`). The policy
   text exists only in the JavaScript bundle. Without JavaScript the page says "This site needs
   JavaScript to display" (`index.html:25`). Platform Terms 4.a requires the policy URL to be
   "easily accessible (including by our crawlers)" (Meta, Platform Terms, last updated
   3 Feb 2026). Whether Meta's checker runs JavaScript is not documented anywhere I found
   [Guessing that it does not]. Removing `noindex` will not fix this.
3. **What the policy promises clients cannot be done today.** The policy tells a client to email
   support and says "we will ... help them delete your information" (Site
   `src/pages/Privacy.jsx:683-685`). [Certain] The code has no way to delete one client's data
   short of erasing the provider's whole account (section 4.4, item 1). Platform Terms 4.b
   requires that "The right to request deletion must be available to all Users who can access
   your App". Platform Terms 3.d.i.2(d) adds, for Tech Providers, deletion "when a User or the
   Client requests". [Certain]

---

## 1. What the plan requires (Step 1)

| Requirement | Plan says | Source |
|---|---|---|
| Privacy Policy URL | `https://correntum.com/timeslot-business/privacy`, "only after the legal review and once the `noindex` is removed" | SS `SITE-SETUP.md` §5 [Certain] |
| User Data Deletion URL | `https://correntum.com/timeslot-business/privacy#delete-your-data`, a section of the policy | SS §5; CS checklist META-13 [Certain] |
| Terms of Service URL | None. "No terms page: it is not in the contract's page list, and terms were not invented" (META-14, status **Not met**) | CS checklist [Certain] |
| Contact email | `support@correntum.com` (an alias to `marcel@`) | SS §3; Site `Footer.jsx` [Certain] |
| Support URL | `https://correntum.com/support` | SS §5 [Certain] |
| Domain verification | an empty slot for `facebook-domain-verification`; no token exists | CS checklist META-05 [Certain] (this repo has no such slot [Certain]) |
| Company facts on site | legal name, registration number, address, phone, all as on the CIPC certificate | CS checklist META-01, 03, 07; SS §5 [Certain] |
| Policy contents | what data, how, why, how every user asks for deletion; Tech Provider processes only for and at the direction of each client | CS checklist META-12, META-15 [Certain] |
| Deadline | "Embedded Signup v2 and v3 are deprecated on 15 October 2026; integrations must move to v4" | B `docs/business/whatsapp-cloud-api.md` §1; LG `TODO.md:84` [Certain] |
| Order | business verification before App Review (checklist META-10 is context only); legal review before publishing | CS META-10; SS §6-7 [Certain] |
| Owners | Meta side (adapter, webhooks, connect, disconnect, Disconnect WhatsApp endpoint): **Tom** (R53, LG `LEDGER.md:188`). Legal and money: "all Tom" (LG `TODO.md:34`). Privacy Policy URL: "**Daniel**, with legal help" (BZ `research/APPSTORE-REVIEW-NOTES.md:308`). Site, Vercel, domain, mail: **Marcel** (SS §1-3) | [Certain] |
| Gates before a real number | Daniel's written agreement (R50); `[LEGAL REVIEW]` on RICA s5, POPIA operator agreement, s72 transfer (R51); release gate AS-27 says client text may not reach Anthropic "until the in-app disclosure and consent exist" | LG `TODO.md:81-82`; B `RELEASE-GATES.md:67-70` [Certain] |
| Still open in the policy | Information Officer, hosting provider and country, payment provider, AI country, s72 grounds, retention per category, activity-record deletion, in-app deletion steps, effect on clients, under-18 decision, effective date | SS §6; Site `Privacy.jsx` `<Needs>` at lines 163, 273, 409, 440, 518, 522, 531, 544, 554, 659, 667, 741 [Certain] |

---

## 2. Current Meta requirements (Step 2)

All fetched 12 Oct 2026. I re-fetched and checked the quotes marked ✓ myself. The rest come
from one research pass on official pages.

| Topic | Finding | Source (page updated) |
|---|---|---|
| Terms of Service URL | ✓ "This field is required to switch your app to Live mode." [Certain] | Basic Settings (18 Oct 2023) |
| Privacy Policy URL | ✓ The settings page does not mark it required. Platform Terms 4.a: "This URL must also be disclosed in the privacy policy field in the settings of your App Dashboard". The Tech Provider page lists "privacy policy" among the basic settings the app needs. [Certain] | Basic Settings; Platform Terms (3 Feb 2026); Get started for Tech Providers (20 Aug 2026) |
| Policy contents | ✓ "must clearly explain what data you are Processing, how you are Processing it, the purposes ..., and how Users may request deletion of that data. The right to request deletion must be available to all Users who can access your App." [Certain] | Platform Terms 4.b |
| Policy must be crawlable | ✓ "active, publicly available, easily accessible (including by our crawlers), and non-geoblocked URL" [Certain] | Platform Terms 4.a |
| Deletion: instructions or callback | ✓ "Developers need to specify either a data deletion callback instruction URL or a callback URL" (FAQ). The instructions "may be the relevant section in the application's Privacy Policy". [Certain] | Data Deletion Request Callback (7 Nov 2025); Basic Settings |
| Callback format | POST with field `signed_request` = `<base64url sig>.<base64url payload>`. Signature is HMAC-SHA256 of the payload under the app secret. Payload is `{"algorithm":"HMAC-SHA256","expires":…,"issued_at":…,"user_id":"…"}`, and `user_id` is an app-scoped ID. HTTPS only. ✓ The response is `{ url: '<url>', confirmation_code: '<code>' }`. The status page must give "a human-readable explanation of the status of their request, including a legitimate justification for any refusal". [Certain] | Data Deletion Request Callback |
| Tech Provider deletion duty | Delete "when a User or the Client requests their Platform Data be deleted or the Client no longer has an account with you". Also delete when no longer needed, and when the product stops. Keep each Client's data separate. Process only "on behalf of and at the direction of your Client". Tell the Client about Meta-relayed data-subject requests. [Certain] | Platform Terms 3.d.i.2, 5.b |
| Facebook Login for Business and deletion | "Embedded Signup uses the Facebook Login for Business product and our JavaScript SDK." **No page says either way whether it triggers the deletion callback requirement.** The general rule covers "Apps that access user data". [Certain that nothing explicit was found] | Facebook Login for Business (30 Jun 2026); Embedded Signup overview (24 Jul 2026) |
| FLfB go-live | "advanced access to the public_profile permission is required for Facebook Login for Business apps before they go live" [Certain] | Facebook Login for Business FAQ |
| Embedded Signup domains | Results return "only if the domain of the page that spawned the flow is listed in the Allowed domains and Valid OAuth redirect URIs fields". "Only domains that have enabled HTTPS are supported." Client OAuth settings: Client OAuth, Web OAuth, Enforce HTTPS, Embedded Browser OAuth, Strict Mode, Login with JS SDK. The page does not mention the Basic Settings "App Domains" field. [Certain] | Embedded Signup implementation (24 Jul 2026) |
| v4 | v2 and v3 are deprecated on 15 Oct 2026. v4 needs a new FLfB configuration. [Certain] | Embedded Signup versions (24 Jul 2026) |
| Coexistence | Needs `featureType: whatsapp_business_app_onboarding`, Business app 2.24.17 or later, "Embedded Signup with session logging", and webhooks `account_update`, `history`, `smb_app_state_sync`, `smb_message_echoes`. Contacts and history must be synced within 24 hours. [Certain] | Onboarding WhatsApp Business app users (26 Jun 2026) |
| Order | "Your business must be verified before you can start the app review process." "You will not be able to onboard business customers until your app has been approved for advanced access". Onboarding is capped at 10 new businesses per rolling 7 days until verification, App Review and access verification are done. [Certain] | Tech Providers; Embedded Signup overview |
| Disconnect | `DELETE /{WABA-ID}/subscribed_apps` unsubscribes the app from webhooks. The Deregister API cannot deregister a coexistence number. The business disconnects in the WhatsApp Business app instead, which fires `account_update` with `PARTNER_REMOVED`. [Certain] | Subscribed Apps API (no date); Onboarding Business app users |
| Meta's role | "acts as a data processor/service provider on behalf of the business". Messages are kept at most 30 days. [Certain] | Data privacy and security (16 Jun 2026) |
| ZA local storage | South Africa (`ZA`) is a supported `data_localization_region`. It can only be set while the number is unregistered. [Likely: read through an extraction tool, so re-check in a browser] | Phone number registration (26 Jun 2026); Local storage (21 May 2026) |

---

## 3. The three pages (Deliverable 1)

All under `https://www.correntum.com`, the canonical host. The apex returns 308 to `www` [Certain, Live].

| Page | URL path | What Meta checks | Required sections | Depends on |
|---|---|---|---|---|
| Privacy policy | `/timeslot-business/privacy`. Exists, but as a draft: `noindex` meta (`src/lib/pageMeta.js`), `X-Robots-Tag: noindex, nofollow` (`vercel.json`, confirmed on Live), a draft banner (`Privacy.jsx:30`), and no footer link (`Footer.jsx` comment). [Certain] | URL entered in App Dashboard; reachable by Meta's crawler, public, not geoblocked (4.a); contents per 4.b; Tech Provider role per 5.b | Already drafted, keep: responsible party, roles, IO, information (providers / clients), sources, purposes, legal grounds, assistant, operators, cross-border, retention, security, breach, rights, deletion, complaints, changes. **Add or correct**: (1) contacts synced from the provider's address book, including people who never messaged (B `lib/business/channel.ts:133-137, 238-243`); (2) history sync of past chats (`channel.ts:121-132`); (3) message text sent to Anthropic (B `lib/business/interpret.ts:112-113`) and that its answer can quote the client (`interpret.ts:107`); (4) hosting is Vercel `lhr1` and Supabase `eu-west-2`, both London (B `vercel.json:3`, B `DEPLOY.md:13`); (5) Postmark keeps email content in the US for 45 days (B `docs/launch/infra-runbook.md:87`); (6) in-app deletion now exists as a request with a 30-day grace period, and it is refused while future bookings exist (B `lib/account/deletion.ts:48-90`, `:62-69`; B `vercel.json` cron); (7) financial records are kept 7 years by default (B `lib/account/retention.ts:15-17`); (8) backups keep erased people until pruned (B `DEPLOY.md:373-374`); (9) a client deletion route that matches what the code can do | Legal review; founders' facts (section 5); retention decision (D4); s72 decision (D3); either build T5 or change the client-deletion wording; T1 (crawlable HTML) |
| Terms of Service | `/timeslot-business/terms`. **Does not exist.** `/terms` returns the home page with HTTP 200 (Live, an SPA soft 404). [Certain] | Required to switch the app to Live (Basic Settings) [Certain]. Meta "may require that your Clients agree to these Terms" (5.b) [Certain] | Parties and who may use it (business providers only); the service and its status; provider warranties (lawful basis for client data, WhatsApp Business Policy, opt-in, no special personal information); Correntum as operator, with a POPIA s20/s21 operator schedule; the Meta terms accepted inside Embedded Signup; AI processing; disconnect, termination and what is deleted when; fees (none today); liability; SA governing law; ECTA s43 supplier details | Counsel (LG `TODO.md:49`: legal scoping R20k to R80k+, BLOCKED); D1 roles; pricing |
| Data deletion instructions | Recommended: `/timeslot-business/delete-data`, a short page of its own. The plan's alternative is the anchor `/timeslot-business/privacy#delete-your-data`. (Decision D7) | URL in the "User Data Deletion" field; "explicit instructions for your app users on how to delete their data" (Basic Settings) [Certain] | Providers: in-app steps, the grace period, what is kept and why. Providers disconnecting WhatsApp, and what that deletes. Clients: how to ask (provider or Correntum), what Correntum deletes, what it cannot (the chat in the provider's WhatsApp, Meta's 30-day copy), how long it takes. A contact route that needs no account | T5, T6 for truthful steps; D4 retention; T1 |
| (Only if callback) Deletion status | `/timeslot-business/deletion-status?code=…`, or served by the backend | Human-readable status, including a justification for any refusal [Certain] | Request date, state, what was deleted, what was kept and why | D6 |

---

## 4. Data deletion (Deliverable 2)

### 4.1 Recommendation: an instructions URL now, no callback

Use an **instructions page** (D6). Build a callback only if App Review asks for one.

- Meta allows either. ✓ "either a data deletion callback instruction URL or a callback URL" [Certain].
- **A callback could not find anyone today.** It identifies people by app-scoped Facebook ID
  [Certain, Meta]. `WhatsAppAccount` stores providerId, phoneNumberId, wabaId, displayPhone,
  tokenRef and createdAt, and no Facebook user ID (B `prisma/schema.prisma:1007-1020`) [Certain].
- **Clients never log in to Facebook through our app.** So a callback can never cover group (b),
  the people the deletion promise matters most for [Likely, because a callback is keyed to an app
  user's ASID].
- **This site has no backend.** `vercel.json` rewrites every path to `index.html`, and `/api/test`
  returns the SPA shell (Live) [Certain]. A Vercel function in an `api/` folder would probably run
  here [Likely; Vercel serves functions before rewrites]. It would have no database access, and the
  data lives behind `api.timeslotbusiness.com` (B `DEPLOY.md:13`) [Certain]. A callback belongs on
  the backend, not on this site [Likely].

### 4.2 Endpoint spec, if a callback is ever required

- **Where:** backend, `POST https://api.timeslotbusiness.com/api/meta/data-deletion`. Body is
  `application/x-www-form-urlencoded` with field `signed_request`.
- **Verify:**
  - Split on `.`.
  - base64url-decode both halves.
  - Require `algorithm == "HMAC-SHA256"`.
  - Compute HMAC-SHA256 of the raw payload half under the Meta app secret (the same secret as
    `WHATSAPP_APP_SECRET`, B `ENV.md:83`).
  - Compare in constant time. On mismatch, answer 400 and record nothing.
- **Map:** look up `user_id` (ASID) in a new column holding the ASID captured at Embedded Signup.
  It is the `/me` `id` with the user token (FLfB page). It does not exist today, so it needs
  T10. No match still gets a confirmation code and a status of "no data held".
- **Act:** start the same erase as a provider deletion request (B `lib/account/deletion.ts`
  `requestDeletion`), or the per-client erase (T5) if the ASID ever maps to one.
- **Respond:** `200 {"url":"https://www.correntum.com/timeslot-business/deletion-status?code=<code>","confirmation_code":"<code>"}`.
  The code is random, alphanumeric and stored with the request.
- **Status page:** read-only by code. Shows the request date, the state (received, waiting for the
  30-day grace, erased, or refused with the reason, e.g. future bookings per `deletion.ts:62-69`),
  and what was kept and why.
- **Tests:** a valid signature; a bad signature; a wrong algorithm; an unknown ASID; replay of the
  same request (idempotent); an expired `expires`.

### 4.3 Data map (Step 4)

The channel is **off** in production. The release gate requires 0 rows in `WhatsAppAccount` and
in inbound `BusinessMessage`, and no WhatsApp or Anthropic env vars (B `RELEASE-GATES.md:66-80`)
[Certain]. I did not check any live database. Everything below is what the code would do once
the channel is switched on.

**(a) Providers (they sign up with us)**

| Data | Table / place | Retention today | How it is deleted today |
|---|---|---|---|
| Account, name, email, password hash, consent stamps | `User`, `Provider` | Until deletion | Request at `POST /api/v1/me/deletion` (B `app/api/v1/me/deletion/route.ts:13-39`). Erased by the 02:00 UTC sweep after 30 days (B `app/api/cron/deletion-sweep/route.ts:16-23`; `lib/account/erase.ts:337, 412`) [Certain] |
| WhatsApp number link | `WhatsAppAccount` (phoneNumberId, wabaId, displayPhone, tokenRef) | Until erase | Row deleted at `erase.ts:321` [Certain]. **No disconnect without deleting the whole account.** No endpoint on B, main or feat/business. The `disconnect()` interface exists only on L, as a fake (`lib/business/whatsapp/interface.ts:51-54`) [Certain] |
| **Meta access token** | **Not in the DB.** An env var whose *name* is in `tokenRef` (`schema.prisma:1016-1017`; read at `channel.ts:384`; default `WHATSAPP_TOKEN`, B `ENV.md:85`) [Certain] | Forever | **Manual.** "Remove the WhatsApp secret from Vercel by hand when a provider disconnects" (LG `TODO.md:213`) [Certain]. Erase deletes the row, not the variable |
| Meta-side link (webhook subscription) | At Meta | Until the provider disconnects in their app | **No code calls Meta on disconnect or erase.** The only Meta calls are `POST /messages` (`channel.ts:386`) and `POST smb_app_data` (`scripts/whatsapp-connect.ts:51`) [Certain]. The webhook ignores `account_update`, so `PARTNER_REMOVED` goes unnoticed (it handles only `messages`, `smb_message_echoes`, `history`, `smb_app_state_sync`, `channel.ts:104-133`) [Certain]. After an erase, deliveries for the number are acknowledged and dropped (`channel.ts:198-204`) [Likely] |
| Financial snapshots | `RetainedFinancialRecord` | 7 years default, floor 5 (`lib/account/retention.ts:15-17`) | A DB trigger blocks deleting them earlier. **No job deletes them after `retainUntil`** [Certain] |
| Erasure receipt | `AccountErasure` (ids, dates) | Forever by design (`erase.ts:19-20`) | Never [Certain] |
| Emails sent | Local outbox rows; Postmark copies | Postmark: 45 days, US (`infra-runbook.md:87`) | Local rows on erase (`erase.ts:403-405`); Postmark copies not touched [Certain] |

**(b) Clients (they only message on WhatsApp and never agree to anything with Correntum)**

| Data | Table / place | How it gets there | Retention today | How it is deleted today |
|---|---|---|---|---|
| Identity: name, WhatsApp ID / number | `BusinessClient` (waId, name); a placeholder `User` (`wa-<waId>.<hash>@clients.timeslot.invalid`, passwordHash `"!"`) | First inbound message, echo, history, or contact sync (`channel.ts:165-181`) | None | Only when the provider is erased (`erase.ts:317-320`) [Certain] |
| **Address-book contacts who never messaged** | Same tables, source `contacts` | `smb_app_state_sync` (`channel.ts:240-243`). "a removed contact stays a client" (`channel.ts:241`) | None | Only with the provider's erase [Certain] |
| Messages: inbound, echoes, history | `BusinessMessage` (body, wamid unique, `historical`) | Webhook (`channel.ts:104-132`) | None. The 30-day figure is a read window only (`store-db.ts:51, 142`) | Only with the provider's erase (`erase.ts:309`) [Certain] |
| Media | **Not stored.** Labels only, e.g. "[photo] caption", "[document: filename]" (`channel.ts:62-87`). Captions, filenames and location names do land in `body` | | | as above [Certain] |
| Threads | `BusinessThread` | Webhook | None | Provider erase only (`erase.ts:310`) [Certain] |
| Event log with **full message bodies** | `BusinessEvent`, append-only by trigger (migration `20260926120000_whatsapp_channel`) | Engine emits `message.received` / `message.sent` carrying the message (B `packages/engine/engine.ts:570, 676, 690`) | None | Only through `erase_business_events(provider)` (migration `20261004074516_p2_u0_deletion:107-126`); the trigger refuses anything else [Certain] |
| AI interpretation | `BusinessRecord.data` plus the event payload; prompts not stored | `interpret.ts`; may quote the client (`interpret.ts:107`) [Likely] | None | Provider erase only (`erase.ts:308`) [Certain] |
| Copy at Anthropic | Anthropic | `interpret.ts:186-193` | Unknown; no retention or zero-retention document found | None [Certain that nothing was found] |
| Bookings | `Booking`, `SlotHold`, `TimeBlock` | Approved proposals | Expired holds only (`lib/business/holds.ts:39`) | Provider erase (`erase.ts:316`, after financial snapshot) [Certain] |
| Raw webhook payloads | **Not stored.** HMAC on raw bytes, then extracted fields only (`channel.ts:425-433`); no inbox or webhook table [Certain] | | | n/a |
| Copy at Meta | Meta Cloud API | | At most 30 days (Meta) | Out of our reach [Certain] |
| Chat in the provider's WhatsApp app | Provider's phone | | Provider's choice | Out of our reach [Certain] |

**Both groups: backups and logs**

| Place | Retention | Deletion reaches it? |
|---|---|---|
| Manual encrypted backups, `~/TimeslotBackups` on Daniel's Mac, weekly by hand (B `scripts/backup-db.sh:5-7, 52, 73`) | Newest 8; older ones deleted only with `--prune`, "without `--prune` nothing is ever deleted" (B `DEPLOY.md:372-374`) | **No.** A restore brings erased people back, to be re-erased by hand (B `DEPLOY.md:414-417`) [Certain] |
| Vercel runtime logs | 1 hour on Hobby (B `DEPLOY.md:36`) | Expire on their own [Certain] |
| Erase logs | ids and codes only (`erase.ts:429-432`) | n/a [Certain] |

### 4.4 Cannot actually be deleted today

1. **One client's data on request**, without erasing the provider's whole account. There is no
   route, and placeholder users cannot sign in [Certain]. This contradicts `Privacy.jsx:683-685`
   and Platform Terms 4.b and 3.d.i.2(d).
2. **`BusinessEvent` rows for one client.** The append-only trigger blocks it, and they hold full
   message text [Certain].
3. **The Meta-side connection.** No unsubscribe call, and no `account_update` handling [Certain].
4. **The Meta token**, an env var in Vercel, removed by hand only [Certain].
5. **A WhatsApp disconnect that keeps the account.** No endpoint on any pushed ref [Certain].
6. **Backups**, and erasures undone by a restore [Certain].
7. **Text already sent to Anthropic.** No deletion route or retention terms on file [Certain
   that none was found].
8. **Financial snapshots after `retainUntil`.** Allowed by the trigger, but no job does it [Certain].
9. **`AccountErasure` rows.** Kept forever by design [Certain].
10. **Old data of an active provider.** No age-based deletion at all. `RETENTION_MONTHS` is "read
    and checked only" (B `ENV.md:71`) [Certain].
11. **Merged rows from the username-only bug.** A WhatsApp user with a username and no number
    lands in one shared thread per provider (LG `TODO.md:85`). Deleting that thread deletes other
    people's messages [Likely].
12. **Postmark copies** for 45 days [Certain].

---

## 5. Facts the founders must supply (Deliverable 3)

| Fact | Value found | Where | Status |
|---|---|---|---|
| Registered name | Correntum (Pty) Ltd. The certificate renders it CORRENTUM (PTY) LTD | Site `Footer.jsx`; SS §5 | Found. **Decide which form** is used in the Meta Business Portfolio; it must match exactly (CS META-01) |
| Registration number | 2026/683805/07 | Site `Footer.jsx`, `Privacy.jsx:122` | Found [Certain] |
| Registered address | 1236 Val de Vie Boulevard, Paarl, Western Cape, 7646 | Site `Footer.jsx` | Found [Certain] |
| Phone | +27 72 388 0408 | Site `Support.jsx:67` | Found [Certain] |
| Contact email | support@correntum.com, an alias into marcel@. `privacy@correntum.com` also exists (SS §3) and is unused on the site. `index.html:26` and `BookAudit.jsx:13` show marcel@ | Site; SS | Found. **Decide** whether privacy and IO mail goes to `privacy@` |
| Domain | correntum.com, canonical **www.correntum.com** (apex 308). Product API domain api.timeslotbusiness.com, which gave no HTTPS answer on 12 Oct (Live) | Live; B `DEPLOY.md:13` | Found [Certain] |
| Information Officer (name, registration with the Regulator) | none | `Privacy.jsx:163` `<Needs>` | **MISSING** |
| Effective date | none | `Privacy.jsx:741` | **MISSING** |
| Retention periods per category | none | `Privacy.jsx:544` | **MISSING** |
| Hosting provider and country | Vercel `lhr1` and Supabase `eu-west-2`, London, for the pilot (B `DEPLOY.md:13`) | timeslot repo only; `Privacy.jsx:409, 518` still `<Needs>` | Found in timeslot, **MISSING** on the site |
| AI provider and processing country | Anthropic (Site `Privacy.jsx:358`); country none | `Privacy.jsx:522` | Country **MISSING** |
| s72 ground per transfer | none | `Privacy.jsx:531` | **MISSING** |
| Payment provider | none for Timeslot Business | `Privacy.jsx:440` | **MISSING** (or remove the card if Business takes no payments) |
| Under-18 clients | none | `Privacy.jsx:273` | **MISSING** |
| Meta App ID, Business Portfolio ID, app admins | none in either repo | searched both | **MISSING** |
| Page that hosts Embedded Signup (domain for Allowed domains) | none | searched both | **MISSING** |
| Meta domain-verification token | none | CS META-05 | **MISSING** (created in Business Settings) |

---

## 6. Open decisions for Tom, Daniel and Marcel (Deliverable 4)

| # | Decision | Recommendation |
|---|---|---|
| D1 | **Operator or responsible party for client data.** | Correntum is the **operator** for client data, and each provider is the responsible party. The code (B `schema.prisma:1000-1003`), the draft (`Privacy.jsx:129-150`) and Platform Terms 5.b ("on behalf of and at the direction of your Client") already assume this. It only holds if Correntum never uses client data for its own purposes: no model evaluation on real chats, no cross-provider analytics. It also needs a written s21 operator agreement, best as a schedule to the Terms. Correntum stays responsible party for provider account data. Counsel confirms. |
| D2 | **Information Officer.** Who, and when they register. | Name one director, and register them on the Regulator's portal before the policy is published or a real number is connected. Until then, change the footer line "We process personal information in line with POPIA" (`Footer.jsx`). It is a compliance claim that the site's own research rules out (CS checklist POPIA-12, POPIA-18). |
| D3 | **Cross-border transfer.** The pilot DB and functions are in London. Anthropic is abroad. Postmark is in the US. | Before real client data: either move to the Cape Town path that already exists (`cpt1` / RDS `af-south-1`, B `DEPLOY.md:9-10`), or have counsel record an s72 ground for the UK. Anthropic needs its own s72 ground whatever the hosting. When onboarding, check whether to set Meta's `ZA` local storage on each number, which can only be done while the number is unregistered. |
| D4 | **Retention periods.** | Propose to counsel: messages and threads deleted 12 months after a client's last message. Address-book contacts who never messaged are **not stored at all**, or deleted after 30 days. `BusinessEvent` stores ids, not message bodies (or follows the message retention). Backups: always `--prune`, 8 weeks. Financial: keep the existing 7 years and add the job that deletes after `retainUntil`. Every number here is a proposal, not a finding. |
| D5 | **Handling data-subject requests.** | One route, `privacy@correntum.com`, owned by the IO, with a request log. A client's request goes to the provider, the responsible party, and Correntum carries it out as operator with T5. Meta-relayed requests are forwarded to the provider, as 5.b requires. Publish no response-time number until one is decided. |
| D6 | **Deletion instructions URL or callback.** | Instructions URL (section 4.1). Build the callback (T10) only if App Review asks. |
| D7 | **Deletion instructions as a page or as an anchor.** | A short page of its own at `/timeslot-business/delete-data`. Reviewers land on it directly, it can be plain HTML, and the policy links to it. The anchor also meets Meta's wording if you prefer fewer pages. |
| D8 | **How to make legal pages crawlable.** | Serve the three legal pages as static HTML from `public/` (Vercel serves files before the SPA rewrite [Likely]). Daniel's static draft on CS (`src/pages/privacy/index.html`) is a starting point. Check with `curl -A facebookexternalhit/1.1`. |
| D9 | **Which domain hosts Embedded Signup.** | A page on the product API's domain or on `www.correntum.com`, over HTTPS. Put that exact domain in Allowed domains and Valid OAuth redirect URIs, and put both `correntum.com` and `timeslotbusiness.com` in App Domains. Not urgent until T15. |
| D10 | **Where the legal pages live.** | `www.correntum.com`. It is the legal entity's site, which business verification matches (CS META-01). Use the `www` form in every dashboard field. |
| D11 | **Request the contact sync (`smb_app_state_sync`) at all?** | Do not request it for the pilot. It brings in people who never messaged and never heard of Correntum (`channel.ts:240-243`), it is the weakest data to justify under POPIA, and it can only be requested once within 24 hours. |
| D12 | **Who writes the Terms, and the budget.** | Counsel writes them, from the section list in section 3. This is the blocked "legal scoping call + quotes" item (LG `TODO.md:49`), and it now blocks Meta Live mode too. |

---

## 7. Build tasks (Deliverable 5)

Estimates are for one experienced developer and exclude counsel's time. Owner is left blank.

| # | Task | Where | Effort | Owner |
|---|---|---|---|---|
| T1 | Crawlable HTML for privacy, terms and delete-data (D8), checked with a non-JS fetch | this repo | 0.5 to 1 day | |
| T2 | Finalise the privacy policy after review: fill section 5, correct the "planned" items against B, add the additions in section 3, remove the banner, `noindex` (`pageMeta`, `vercel.json`) and the open-points list, add a footer link | this repo | 1 to 2 days | |
| T3 | Terms page and footer link, once counsel's text exists | this repo | 0.5 day | |
| T4 | Delete-data page (D7) | this repo | 0.5 day | |
| T5 | **Per-client erase**: client, threads, messages, records, placeholder user, and that client's `BusinessEvent` rows (a scoped variant of `erase_business_events`), with an admin or support trigger and mutation-tested | timeslot B | 2 to 4 days | |
| T6 | **Disconnect WhatsApp**: `DELETE /{WABA}/subscribed_apps`, token removal, row handling; plus `account_update` / `PARTNER_REMOVED` going through the same path. R53 assigns this to Tom | timeslot B / L | 2 to 3 days | |
| T7 | Move the Meta token out of per-provider Vercel env vars into encrypted storage that code can delete. Embedded Signup exchanges a token per business, and a Vercel env edit and redeploy per onboarding will not scale [Likely] | timeslot B | 1 to 2 days | |
| T8 | Retention jobs for the D4 periods, plus deleting financial records after `retainUntil` | timeslot B | 1 to 2 days | |
| T9 | Backups: make `--prune` the default, and keep a list of erasures to replay after a restore | timeslot B | 0.5 to 1 day | |
| T10 | Deletion callback, status page and ASID capture at signup. Only if D6 changes | timeslot B | 1.5 to 2 days | |
| T11 | Fix the username-only shared-thread bug (LG `TODO.md:85`) before T5, or T5 deletes other people's data | timeslot B | 1 to 2 days | |
| T12 | `facebook-domain-verification` meta tag in `index.html` once the token exists | this repo | under 1 hour | |
| T13 | Register the IO with the Information Regulator (D2) | admin | 1 hour plus waiting | |
| T14 | PAIA manual: decide, then publish (CS PAIA-01) | this repo / counsel | 0.5 day after text | |
| T15 | Embedded Signup v4 page (session logging, coexistence `featureType`, config ID, domains per D9) | timeslot B or this repo | 2 to 4 days | |
| T16 | App Review: request advanced access to `whatsapp_business_messaging`, `whatsapp_business_management` and `public_profile`, with one screen recording per permission | Meta dashboard | 1 day | |
| T17 | Correct `SITE-SETUP.md` (repo name, `www` URLs), and record the new ruling rows in the ledger | timeslot SS / LG | under 1 hour | |

---

## 8. Conflicts between the plan and current Meta docs (Deliverable 6)

| # | Plan says | Current state | Source |
|---|---|---|---|
| C1 | Removing `noindex` and the banner is enough to publish (CS META-11; SS §7) | Platform Terms 4.a also requires crawler access. The page is JavaScript-only (section 0.2) | Platform Terms (3 Feb 2026); Live [Certain] |
| C2 | Clients can ask Correntum to delete their information (`Privacy.jsx:683-685`; CS META-12 "Met") | No per-client deletion exists in code. Meta requires deletion for all Users, and for Tech Providers on a User's or the Client's request | Platform Terms 4.b, 3.d.i.2(d); B `erase.ts:308-321` [Certain] |
| C3 | No Terms page (CS META-14, "not invented") | Required to switch to Live mode, so without one the app cannot go Live | Basic Settings ✓ [Certain] |
| C4 | Use `https://correntum.com/...` URLs (SS §5) | The apex returns 308 to `www`. Enter the final URLs to avoid a redirect hop [Likely that it matters] | Live [Certain for the redirect] |
| C5 | Site source is `marcelzur-glitch/correntum-site` (SS §1) | That repo does not resolve. The source with the same history is `correntum-site/website` [Likely moved] | `gh repo view` [Certain that it fails] |
| C6 | "Whether South Africa is a local storage region is unknown" (CS checklist, sources table) | `ZA` is a supported `data_localization_region` | Phone number registration (26 Jun 2026) [Likely, re-check] |
| C7 | The webhook build handles messages, echoes, history and contacts (B build guide §4) | Embedded Signup requires the `account_update` subscription, which carries `PARTNER_REMOVED` on disconnect. The code ignores it | Embedded Signup implementation; Onboarding Business app users; B `channel.ts:104-133` [Certain] |
| C8 | Connect a number with `scripts/whatsapp-connect.ts` and a token in an env var named by `tokenRef` (build guide §4) | v4 Embedded Signup gives each business its own token through a 30-second code exchange. A hand-set env var per provider does not fit self-serve onboarding [Likely] | Embedded Signup implementation [Certain for the code exchange] |
| C9 | Policy and Support say in-app deletion and the WhatsApp connection are "planned" (`Privacy.jsx:653`; `Support.jsx:146-149`) | B has a deletion request route with a 30-day grace period and a daily sweep. The WhatsApp code exists but is switched off | B `deletion.ts`, `vercel.json` [Certain] |
| C10 | Not in the plan | FLfB apps need advanced access to `public_profile` before going live. Onboarding is capped at 10 businesses per 7 days until verification and review | FLfB (30 Jun 2026); Embedded Signup overview (24 Jul 2026) [Certain] |
| C11 | The plan cites the Basic Settings page for deletion (CS META-13) | That page is from 18 Oct 2023. The deletion-callback page (7 Nov 2025) is the current word, and it agrees: instructions URL or callback | ✓ [Certain] |
| C12 | v4 before 15 Oct 2026 (B Cloud API doc) | Confirmed. v2 and v3 end 15 Oct 2026, three days from this writing. Nothing has been built on v2 or v3, so nothing breaks; Stage 5 starts on v4 | Embedded Signup versions (24 Jul 2026) [Certain] |
