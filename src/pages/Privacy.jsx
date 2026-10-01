import { usePageMeta } from "../lib/pageMeta";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { Needs } from "../components/Needs";

const REVEAL_BLOCKS = ":scope > :not(section), :scope > section > *";

// Privacy policy for Timeslot Business. A DRAFT: marked noindex, kept behind
// no nav or footer link, and still carrying its draft banner, review notes and
// open-points list. It must have a legal review and the founders' facts before
// it is published and the noindex removed. Content ported verbatim from
// Daniel's draft; support@correntum.com is now a live alias and fills the
// support-email placeholder.
const EMAIL = "support@correntum.com";

export function Privacy() {
  usePageMeta({
    title: "Privacy policy for Timeslot Business (draft)",
    description:
      "Draft privacy policy for the Timeslot Business app, written for POPIA. Not yet reviewed.",
    noindex: true,
  });

  const revealRef = useRevealOnScroll({ selector: REVEAL_BLOCKS });

  return (
    <main>
      <section id="top" className="section container-page">
        <div className="doc" ref={revealRef}>
          <p className="draft-banner">
            Draft. Not legal advice. Needs review before publishing.
          </p>

          <h1>Privacy policy for Timeslot Business</h1>

          <p className="lede">
            This policy explains what personal information the Timeslot Business
            app handles, why it is used, who else handles it, and what you can do
            about it. It is written for South Africa's Protection of Personal
            Information Act, called POPIA.
          </p>

          <p>It is for two groups of people:</p>
          <ul>
            <li>
              <strong>Providers.</strong> People who run a service business and
              use the Timeslot Business app on their phone.
            </li>
            <li>
              <strong>Clients.</strong> People who message a provider on WhatsApp.
              Clients do not install anything, and may not know that the provider
              uses Timeslot Business.
            </li>
          </ul>

          <p className="note">
            Timeslot Business is still being built. This draft describes how the
            app is designed to handle personal information, taken from the product
            plan. Parts marked <strong>planned</strong> are in the plan but are
            not built yet. Before this policy is published, every section must be
            checked against the app that ships.
          </p>

          <div className="toc">
            <h2 id="contents">On this page</h2>
            <ol>
              <li><a href="#in-short">In short</a></li>
              <li><a href="#responsible-party">Who is responsible</a></li>
              <li><a href="#information-officer">Information Officer</a></li>
              <li><a href="#information">What information the app handles</a></li>
              <li><a href="#purposes">Why the information is used</a></li>
              <li><a href="#assistant">How the assistant reads messages</a></li>
              <li><a href="#operators">Who else handles the information</a></li>
              <li><a href="#cross-border">Information sent outside South Africa</a></li>
              <li><a href="#retention">How long information is kept</a></li>
              <li><a href="#security">How the information is protected</a></li>
              <li><a href="#rights">Your rights</a></li>
              <li><a href="#delete-your-data">How to delete your data</a></li>
              <li><a href="#complain">How to complain to the Information Regulator</a></li>
              <li><a href="#website">This website</a></li>
              <li><a href="#changes">Changes to this policy</a></li>
              <li><a href="#open-points">Open points before publishing</a></li>
            </ol>
          </div>

          <h2 id="in-short">In short</h2>
          <ul>
            <li>
              Timeslot Business is designed to read the WhatsApp messages clients
              send to a provider, check each booking request against the
              provider's calendar, and draft a reply. Today the app runs in a
              demo with invented clients. The WhatsApp connection is planned.
            </li>
            <li>
              Correntum makes the app. We are responsible for providers'
              information. For clients' information, the provider is responsible
              and we act on the provider's behalf.
            </li>
            <li>
              An AI service from another company reads client messages. The app
              asks the provider for permission first.
            </li>
            <li>
              Other companies handle information for us: Meta for WhatsApp
              messages, a hosting and database provider, and the AI provider.
              Apple distributes the app.
            </li>
            <li>
              You can ask to see, correct or delete your information, and you can
              complain to the Information Regulator.
            </li>
          </ul>

          <h2 id="responsible-party">Who is responsible</h2>
          <p>
            Timeslot Business is made by Correntum. In this policy, "we" and "us"
            mean Correntum.
          </p>
          <dl>
            <dt>Legal name</dt>
            <dd>Correntum (Pty) Ltd.</dd>
            <dt>Registration number</dt>
            <dd>2026/683805/07</dd>
            <dt>Registered address</dt>
            <dd>1236 Val de Vie Boulevard, Paarl, Western Cape, 7646</dd>
            <dt>Email</dt>
            <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
          </dl>

          <h3 id="roles">Our role and the provider's role</h3>
          <p>
            POPIA names two roles. A responsible party decides why and how
            personal information is used. An operator uses personal information
            for a responsible party, under a contract, and only as that party
            directs.
          </p>
          <ul>
            <li>
              <strong>Information about providers.</strong> We are the responsible
              party for information about the providers who use the app, such as
              their account and settings.
            </li>
            <li>
              <strong>Information about clients.</strong> Each provider is the
              responsible party for their own clients' information. We act as the
              provider's operator. We use clients' information only to run the app
              for that provider, as the provider directs, and not for our own
              purposes. We keep each provider's information separate from every
              other provider's.
            </li>
          </ul>
          <p className="note">
            Review note: this split of roles is the intended structure from the
            product plan. It needs legal review before publishing.
          </p>

          <h2 id="information-officer">Information Officer</h2>
          <p>
            Our Information Officer deals with requests and questions about
            personal information.
          </p>
          <dl>
            <dt>Name</dt>
            <dd><Needs>Information Officer name</Needs></dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, with "For the Information
              Officer" in the subject line
            </dd>
          </dl>
          <p className="note">
            Review note: under POPIA, an Information Officer takes up their duties
            only after we register them with the Information Regulator. This draft
            does not say that registration is done.
          </p>

          <h2 id="information">What information the app handles</h2>

          <h3 id="providers-information">About providers</h3>
          <ul>
            <li>The details you give to create your account, and your business name.</li>
            <li>
              <strong>Planned.</strong> Your WhatsApp Business number, once you
              connect it to the app through WhatsApp's own sign-up steps.
            </li>
            <li>
              Your services and prices, working hours, breaks between bookings,
              time off, and your deposit and cancellation policy.
            </li>
            <li>The assistant's name and tone, and your quiet hours.</li>
            <li>Your calendar: bookings, times held for a client, and time off.</li>
            <li>Your decisions in the app: what you approve, edit or decline.</li>
            <li>
              <strong>Planned.</strong> Events from another calendar you connect.
              These events block times in Timeslot Business, and the app does not
              change them.
            </li>
            <li>
              <strong>Planned.</strong> The link between the app and your own
              merchant account with the payment provider.
            </li>
            <li>
              <strong>Planned.</strong> A morning brief: a voice note and its text
              about your day, which the app can also send to your WhatsApp.
            </li>
            <li>
              <strong>Planned.</strong> An activity record of everything that
              happened in the app: every message received and sent, every check,
              every approval and refusal, and every change.
            </li>
          </ul>

          <h3 id="clients-information">About clients</h3>
          <p>
            The app holds real clients' information only once the provider
            connects WhatsApp, and that connection is planned. This list is what
            the app is designed to hold after that.
          </p>
          <ul>
            <li>
              Your name and WhatsApp number, as saved in the provider's WhatsApp
              contacts.
            </li>
            <li>
              Your WhatsApp messages with the provider: the messages you send and
              the provider's own replies.
            </li>
            <li>
              <strong>Planned.</strong> The replies the app sends to you for the
              provider.
            </li>
            <li>
              <strong>Planned.</strong> Earlier messages between you and the
              provider. When the provider connects WhatsApp, these may be copied
              into the app, for a period the provider chooses.
            </li>
            <li>
              What the app read from your messages, for example the service, day
              and time you asked for.
            </li>
            <li>
              Your bookings with the provider: service, day, start and end time,
              and whether the booking is confirmed, completed or cancelled.
            </li>
            <li>Notes the provider writes about you.</li>
            <li>
              <strong>Planned.</strong> Payment requests for your bookings:
              amount, whether it is paid, how it was paid, the payment reference,
              and any balance you owe the provider. Money goes straight to the
              provider's own merchant account. Timeslot Business never holds it.
            </li>
          </ul>

          <h3 id="sources">Where the information comes from</h3>
          <p>Providers give us their own information when they use the app.</p>
          <p>
            Clients' information does not come from clients directly. It comes
            from the provider's WhatsApp contacts, from the messages clients send
            to the provider, and from what the provider adds in the app. This
            policy is public so that clients can read how their information is
            handled.
          </p>

          <h3 id="not-collected">What the app does not collect</h3>
          <ul>
            <li>
              <strong>Health information.</strong> The app is not designed to hold
              health, injury or medical information. POPIA calls this special
              personal information. Providers should not put it in client notes.
            </li>
            <li>
              <strong>Children's information.</strong> Whether providers may use
              the app for clients under 18 is not decided yet.{" "}
              <Needs>founders' decision on clients under 18</Needs>
            </li>
          </ul>

          <h2 id="purposes">Why the information is used</h2>
          <ul>
            <li>
              To run your account and show you your day, your requests and your
              clients.
            </li>
            <li>
              To read a client's booking request, check it against the provider's
              calendar and rules, and draft a reply.
            </li>
            <li>
              <strong>Planned.</strong> To send the replies the provider approves,
              through WhatsApp. At first, nothing is sent to a client until the
              provider approves it.
            </li>
            <li>
              <strong>Planned.</strong> To handle requests the calendar can settle
              without waiting for the provider, inside rules the provider sets.
              Requests the app cannot settle still go to the provider for a
              decision. A provider can pause this.
            </li>
            <li><strong>Planned.</strong> To send a payment request for a booking.</li>
            <li>To answer you when you contact us.</li>
            <li>To keep the app working and secure.</li>
          </ul>
          <p>
            The app sends messages to a client only about a booking or request
            that client made. The assistant deals only with bookings, payments
            and the provider's own questions, such as prices, location and what to
            bring. The app does not send marketing messages to clients.
          </p>

          <h3 id="legal-grounds">Legal grounds</h3>
          <ul>
            <li>
              <strong>Providers.</strong> We use your information to give you the
              app under our agreement with you. Where we ask for your consent, for
              example before client messages go to the AI provider, we use the
              information on the basis of that consent.
            </li>
            <li>
              <strong>Clients.</strong> The provider, as the responsible party,
              decides the legal ground for using your information. For a booking
              request, that ground is to take the booking you asked for.
            </li>
            <li>
              You can withdraw consent at any time. This does not change what was
              done before you withdrew it.
            </li>
          </ul>
          <p className="note">
            Review note: the legal grounds need legal review. This draft names no
            law that makes anyone give this information. A reviewer should confirm
            that.
          </p>

          <h3 id="voluntary">Whether you must give the information</h3>
          <ul>
            <li>
              <strong>Providers.</strong> You need to create an account to use the
              app. <strong>Planned.</strong> Once the WhatsApp connection is
              built, you will also need to connect your WhatsApp Business number.
              Without these, the app cannot do its work.
            </li>
            <li>
              <strong>Clients.</strong> Messaging a provider is your choice. If you
              do not want your messages handled by the app, ask the provider for
              another way to book.
            </li>
          </ul>

          <h2 id="assistant">How the assistant reads messages</h2>
          <p>
            Timeslot Business uses an AI service from another company to read
            client messages and work out what the client is asking for. Software,
            not the AI, then checks the request against the provider's calendar.
            The AI never decides whether a time is free, and it cannot change the
            calendar or send anything.
          </p>
          <dl>
            <dt>Who receives the messages</dt>
            <dd>Anthropic (the Claude AI service)</dd>
            <dt>What is sent</dt>
            <dd>The client's message, so the AI can read what the client is asking for.</dd>
            <dt>Permission</dt>
            <dd>
              Before any client message goes to the AI provider, the app asks the
              provider for explicit permission and names the AI provider. No
              client message is sent to it without that permission. The provider
              gives the permission, but the messages are about the clients, which
              is why this section is public.
            </dd>
            <dt>How the message is treated</dt>
            <dd>
              The AI treats a client's message as information to read, never as an
              instruction to follow.
            </dd>
          </dl>
          <p>
            Where the AI provider processes messages is in{" "}
            <a href="#cross-border">Information sent outside South Africa</a>.
          </p>

          <h2 id="operators">Who else handles the information</h2>
          <p>
            These companies handle personal information when the app is used. We
            name them by the job they do.
          </p>
          <div className="grid">
            <div className="card">
              <p>
                <strong>Meta, through the WhatsApp Business Platform</strong>{" "}
                <span className="muted">Planned.</span>
              </p>
              <dl>
                <dt>Role</dt>
                <dd>
                  Operator. Meta says that for the WhatsApp Cloud API it acts as a
                  data processor on behalf of the business.
                </dd>
                <dt>What they handle</dt>
                <dd>
                  WhatsApp messages between clients and providers, and WhatsApp
                  numbers.
                </dd>
                <dt>Why</dt>
                <dd>To receive and send WhatsApp messages.</dd>
              </dl>
            </div>
            <div className="card">
              <p>
                <strong>
                  Hosting and database provider: <Needs>app hosting provider</Needs>
                </strong>
              </p>
              <dl>
                <dt>Role</dt>
                <dd>Operator.</dd>
                <dt>What they handle</dt>
                <dd>
                  Everything the app stores, as listed in{" "}
                  <a href="#information">What information the app handles</a>.
                </dd>
                <dt>Why</dt>
                <dd>To run the app and store its data.</dd>
              </dl>
            </div>
            <div className="card">
              <p>
                <strong>AI provider: Anthropic (the Claude AI service)</strong>
              </p>
              <dl>
                <dt>Role</dt>
                <dd>Operator.</dd>
                <dt>What they handle</dt>
                <dd>Client messages.</dd>
                <dt>Why</dt>
                <dd>To read booking requests.</dd>
              </dl>
            </div>
            <div className="card">
              <p>
                <strong>
                  Payment provider: <Needs>payment provider name</Needs>
                </strong>{" "}
                <span className="muted">Planned.</span>
              </p>
              <dl>
                <dt>Role</dt>
                <dd>
                  A licensed South African payment provider. The provider's
                  merchant account is with this company. Its exact role is not
                  confirmed.
                </dd>
                <dt>What they handle</dt>
                <dd>
                  The details needed for a payment request: booking, amount and
                  payment state.
                </dd>
                <dt>Why</dt>
                <dd>
                  To take payment into the provider's own merchant account, and to
                  make refunds.
                </dd>
              </dl>
            </div>
            <div className="card">
              <p><strong>Apple</strong></p>
              <dl>
                <dt>Role</dt>
                <dd>A separate company with its own privacy policy.</dd>
                <dt>What they handle</dt>
                <dd>
                  Your Apple account and your download of the app, under Apple's
                  own privacy policy.
                </dd>
                <dt>Why</dt>
                <dd>To distribute the app through the App Store.</dd>
              </dl>
            </div>
            <div className="card">
              <p>
                <strong>A calendar service the provider connects</strong>{" "}
                <span className="muted">Planned.</span>
              </p>
              <dl>
                <dt>Role</dt>
                <dd>Chosen by the provider.</dd>
                <dt>What they handle</dt>
                <dd>The provider's calendar events.</dd>
                <dt>Why</dt>
                <dd>To block times that are already taken.</dd>
              </dl>
            </div>
          </div>
          <p>
            Each operator may use personal information only on our instructions,
            must keep it confidential, and must keep security measures in place
            under a written contract with us. We share personal information only
            with third parties that give it the same or equal protection as this
            policy.
          </p>
          <p>
            Clients' information is also shown to the provider it belongs to. We
            give personal information to a government body only when the law
            obliges us to.
          </p>
          <p className="note">
            Review note: the operator contracts, and the exact roles of the
            payment provider and Apple, must be confirmed before publishing.
          </p>

          <h2 id="cross-border">Information sent outside South Africa</h2>
          <ul>
            <li>
              <strong>Meta.</strong> Meta says its WhatsApp Cloud API processes
              messages on servers in Meta data centres. These may be outside
              South Africa.
            </li>
            <li>
              <strong>Hosting and database provider.</strong>{" "}
              <Needs>country where the app hosting provider stores data</Needs>
            </li>
            <li>
              <strong>AI provider.</strong>{" "}
              <Needs>country where the AI provider processes data</Needs>
            </li>
          </ul>
          <p>
            POPIA allows personal information to go to another country only in some
            cases. For example: the receiver is bound by a law, binding corporate
            rules or a binding agreement that gives an adequate level of
            protection; you consent; or the transfer is needed for a contract with
            you. The ground for each transfer above:{" "}
            <Needs>POPIA section 72 ground for each transfer outside South Africa</Needs>
          </p>

          <h2 id="retention">How long information is kept</h2>
          <p>
            We keep personal information only as long as we need it for the
            purposes in this policy, unless a law says we must keep it longer, a
            contract needs it, or you agree. After that, we delete it or
            de-identify it so that it cannot be rebuilt.
          </p>
          <ul>
            <li>
              How long each kind of information is kept:{" "}
              <Needs>retention periods per data category</Needs>
            </li>
            <li>
              Meta says its WhatsApp Cloud API keeps messages for at most 30 days,
              to provide the service.
            </li>
            <li>
              <strong>Planned.</strong> The product plan says entries in the
              activity record are never changed or deleted. How that record is
              deleted or de-identified when someone asks for deletion:{" "}
              <Needs>how deleting an account deletes or de-identifies the activity record</Needs>
            </li>
          </ul>
          <p>
            What happens when you delete your account is in{" "}
            <a href="#delete-your-data">How to delete your data</a>.
          </p>

          <h2 id="security">How the information is protected</h2>
          <p>
            We take appropriate, reasonable technical and organisational measures
            to keep personal information safe from loss, damage, and unauthorised
            access or use. The app's design includes these measures:
          </p>
          <ul>
            <li>
              The AI reads messages only. It has no tools and cannot change the
              calendar or send anything.
            </li>
            <li>A client's message is treated as information, never as an instruction.</li>
            <li>Each provider's information is kept separate from every other provider's.</li>
            <li>
              <strong>Planned.</strong> Every message sent and every change is
              recorded in the activity record.
            </li>
          </ul>
          <p className="note">
            Review note: describe the actual security measures once the hosting
            provider is chosen.
          </p>

          <h3 id="breach">If there is a breach</h3>
          <p>
            If we have reason to believe someone got unauthorised access to
            personal information, we will tell the Information Regulator and the
            people affected as soon as reasonably possible. We will tell them in
            writing, for example by email or on this website, and say what they
            can do to protect themselves. When clients' information is affected, we
            tell the provider immediately, because the provider is responsible for
            it.
          </p>

          <h2 id="rights">Your rights</h2>
          <p>Under POPIA, you have the right to:</p>
          <ul>
            <li>
              be told when your personal information is collected, and when someone
              got unauthorised access to it
            </li>
            <li>
              ask whether we hold information about you, free of charge, and ask
              for a copy or a description of it, including who has had access to it
            </li>
            <li>
              ask for information to be corrected or deleted if it is wrong, out of
              date, incomplete, misleading, excessive or unlawfully obtained, or if
              it may no longer be kept
            </li>
            <li>object at any time to your information being used</li>
            <li>withdraw your consent at any time</li>
            <li>not receive direct marketing by electronic messages without your consent</li>
            <li>
              not be subject to some decisions made only by a computer. In Timeslot
              Business, software checks times against the calendar, and at first
              the provider approves every reply
            </li>
            <li>complain to the Information Regulator</li>
            <li>take the matter to court</li>
          </ul>

          <h3 id="use-your-rights">How to use your rights</h3>
          <ul>
            <li>
              <strong>Providers.</strong> Email{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a> to use any of these rights.{" "}
              <strong>Planned.</strong> You will also be able to export or delete
              your information in the app, in Settings under Data and privacy.
            </li>
            <li>
              <strong>Clients.</strong> The provider is responsible for your
              information, so ask the provider first. You can also email{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the provider's business
              name and your WhatsApp number. We will pass your request to the
              provider and help them answer it.
            </li>
          </ul>
          <p>
            We may ask you to prove who you are before we act on a request. We help
            you free of charge. You can object using Form 1, and ask for
            correction or deletion using Form 2. Both forms are in the POPIA
            regulations, and you do not have to use them to email us. We will tell
            you what we did about your request.
          </p>

          <h2 id="delete-your-data">How to delete your data</h2>

          <h3 id="delete-providers">Providers</h3>
          <ul>
            <li>
              <strong>Planned.</strong> You will be able to delete your account in
              the app, in Settings under Data and privacy, without calling or
              emailing us. This is in the product plan and is not built yet.
            </li>
            <li>
              Steps and how long it takes:{" "}
              <Needs>in-app account deletion steps and how long deletion takes</Needs>
            </li>
            <li>
              <strong>Planned.</strong> Deleting your account will delete your
              personal information. It will not just switch your account off.
            </li>
            <li>
              What deleting your account does to your clients' information:{" "}
              <Needs>what deleting a provider's account does to their clients' information</Needs>
            </li>
            <li>
              Any information a law makes us keep is named in{" "}
              <a href="#retention">How long information is kept</a>.
            </li>
            <li>
              You can also ask for deletion by email:{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </li>
          </ul>

          <h3 id="delete-clients">Clients</h3>
          <ul>
            <li>Ask the provider to delete your information from Timeslot Business.</li>
            <li>
              Or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the provider's
              business name and your WhatsApp number. We will pass your request to
              the provider and help them delete your information.
            </li>
            <li>
              Deleting your information from Timeslot Business does not delete the
              chat in the provider's own WhatsApp app. Ask the provider about that.
            </li>
          </ul>

          <h2 id="complain">How to complain to the Information Regulator</h2>
          <p>
            If you think your personal information has been misused, you can tell
            us first at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, and we will try to
            fix it. You can also complain to the Information Regulator at any time.
            A complaint must be in writing.
          </p>
          <dl>
            <dt>Website</dt>
            <dd>
              <a href="https://inforegulator.org.za/">https://inforegulator.org.za/</a>
            </dd>
            <dt>Email for POPIA complaints</dt>
            <dd>
              <a href="mailto:POPIAComplaints@inforegulator.org.za">
                POPIAComplaints@inforegulator.org.za
              </a>
            </dd>
            <dt>Email for general questions</dt>
            <dd>
              <a href="mailto:enquiries@inforegulator.org.za">
                enquiries@inforegulator.org.za
              </a>
            </dd>
            <dt>Toll-free number</dt>
            <dd>0800 017 160</dd>
            <dt>Phone</dt>
            <dd>010 023 5200</dd>
            <dt>Address</dt>
            <dd>
              Woodmead North Office Park, 54 Maxwell Drive Woodmead, Johannesburg,
              2191
            </dd>
          </dl>
          <p>
            The Information Regulator's website says complaints are made through
            its eService Portal, after you register a user profile there.
          </p>

          <h2 id="website">This website</h2>
          <p>
            This website sets no cookies, has no analytics or tracking, has no
            forms and loads nothing from other websites. If you email us, we use
            your email address and message only to answer you.
          </p>

          <h2 id="changes">Changes to this policy</h2>
          <p>
            Effective date: <Needs>effective date of this policy</Needs>
          </p>
          <p>
            If we change this policy, we will publish the new version on this page
            and change the date. If a change affects how we use your information,
            we will tell providers before it takes effect.
          </p>

          <h2 id="open-points">Open points before publishing</h2>
          <p className="muted">
            This list is for the people reviewing this draft. Remove it before
            publishing.
          </p>
          <ul>
            <li>
              A legal review of the whole policy, including the roles, the legal
              grounds and the transfers outside South Africa.
            </li>
            <li>
              Check every part marked planned against the app that ships, and
              remove the label or the text.
            </li>
            <li>Confirm written contracts with each operator.</li>
            <li>Register the Information Officer with the Information Regulator.</li>
            <li>Fill every placeholder on this page.</li>
            <li>Decide whether Correntum needs a PAIA manual on this website.</li>
            <li>
              Keep this page public and readable by Meta's and Apple's reviewers
              once it is published. The draft is marked noindex, and the published
              policy must not be.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
