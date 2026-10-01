import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../lib/pageMeta";
import { Link } from "../lib/router";

// Support and contact page. This is the Apple Support URL and carries the
// company details for Meta. support@correntum.com is a live alias; the
// remaining company facts stay as flagged placeholders until confirmed.
const SUPPORT_EMAIL = "support@correntum.com";

export function Support() {
  usePageMeta({
    title: "Support and contact",
    description:
      "How to contact Correntum about Timeslot Business, what to put in a support email, and how to ask about your personal information.",
  });

  const introRef = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <main>
      <section id="top" className="section container-page">
        <div className="doc">
          <div ref={introRef}>
            <h1 data-reveal className="reveal">
              Support and contact
            </h1>
            <p data-reveal className="reveal lede">
              Correntum makes Timeslot Business, a booking app for service
              providers in South Africa. To contact Correntum, send us an email.
            </p>
          </div>

          <section aria-labelledby="contact">
            <h2 id="contact">Email us</h2>
            <div className="card">
              <p>
                Support email:{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </p>
              <p>
                A person at Correntum reads this inbox and replies to you
                directly. Replies are written by hand, so please allow a little
                time for one.
              </p>
            </div>
            <p>
              Use this address for questions about the app, problems with it,
              feedback and ideas, and requests about your personal information.
            </p>
          </section>

          <section aria-labelledby="company">
            <h2 id="company">Who is behind Timeslot Business</h2>
            <p>
              Timeslot Business is made by Correntum, a company registered in
              South Africa with the CIPC. These are the company's details.
            </p>
            <dl>
              <dt>Legal name</dt>
              <dd>Correntum (Pty) Ltd.</dd>
              <dt>Registration number</dt>
              <dd>2026/683805/07</dd>
              <dt>Registered address</dt>
              <dd>1236 Val de Vie Boulevard, Paarl, Western Cape, 7646</dd>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </dd>
              <dt>Phone</dt>
              <dd>
                <a href="tel:+27723880408">+27 72 388 0408</a>
              </dd>
            </dl>
          </section>

          <section aria-labelledby="what-to-include">
            <h2 id="what-to-include">What to put in your email</h2>
            <h3>If you use Timeslot Business for your business</h3>
            <p>These details help us find the problem on the first read:</p>
            <ul>
              <li>your name and the name of your business</li>
              <li>your WhatsApp Business number</li>
              <li>what you were trying to do, and what happened instead</li>
              <li>
                the screen you were on, and the date and time it happened, if you
                know them
              </li>
              <li>your phone model and its software version</li>
              <li>
                a screenshot, if it helps. Cover any client names and numbers we
                do not need to see.
              </li>
            </ul>
            <p>Do not send passwords, PINs or card details by email.</p>

            <h3>If you are a client of a business that uses Timeslot Business</h3>
            <p>
              Questions about a booking go to that business. Message them in your
              usual WhatsApp chat with them.
            </p>
            <p>
              Email us if your question is about Timeslot Business itself, or
              about your personal information. Tell us the name of the business
              and the WhatsApp number you messaged from.
            </p>
          </section>

          <section aria-labelledby="personal-information">
            <h2 id="personal-information">Ask about your personal information</h2>
            <p>
              You can ask us what personal information we hold about you. You can
              also ask us to correct it or to delete it.
            </p>
            <ol>
              <li>
                Email us at{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
              </li>
              <li>Write "Personal information request" in the subject line.</li>
              <li>
                Say what you are asking for: to see your information, to correct
                it, or to delete it.
              </li>
            </ol>
            <p>
              Before we act on a request, we may need to check that it comes from
              you.
            </p>
            <p>
              The{" "}
              <Link to="/timeslot-business/privacy">
                privacy policy for Timeslot Business
              </Link>{" "}
              explains what information the app handles and why, who else receives
              it,{" "}
              <Link to="/timeslot-business/privacy#rights">
                your rights under POPIA
              </Link>
              , and{" "}
              <Link to="/timeslot-business/privacy#complain">
                how to complain to the Information Regulator
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="delete-account">
            <h2 id="delete-account">Delete your Timeslot Business account</h2>
            <p>
              Deleting your account in the app is planned. It is in the product
              plan and is not built yet. Once it is available, the steps will be
              here.
            </p>
            <p>
              For now, ask for deletion by email, as described above. The privacy
              policy for Timeslot Business explains{" "}
              <Link to="/timeslot-business/privacy#delete-your-data">
                what happens to your information when your account is deleted
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="more">
            <h2 id="more">More about Timeslot Business</h2>
            <ul>
              <li>
                <Link to="/timeslot-business">What Timeslot Business does</Link>
              </li>
              <li>
                <Link to="/timeslot-business/privacy">
                  Privacy policy for Timeslot Business
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
