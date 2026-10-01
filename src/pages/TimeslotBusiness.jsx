import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../lib/pageMeta";
import { Link } from "../lib/router";

// Timeslot Business product page. Content ported from Daniel's draft, kept
// exactly as limited: nothing is claimed as live that is not built, planned
// parts are labelled, no prices, customers or dates. Styled in the site's
// own dark design via the shared .doc layer.
export function TimeslotBusiness() {
  usePageMeta({
    title: "Timeslot Business",
    description:
      "Timeslot Business, by Correntum, is a booking app for independent service providers in South Africa. Their clients keep using WhatsApp and install nothing.",
  });

  const introRef = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <main>
      <section id="top" className="section container-page">
        <div className="doc">
          <div ref={introRef}>
            <p data-reveal className="reveal">
              <img
                className="app-icon"
                src="/timeslot-business/media/timeslot-business-app-icon.png"
                alt="Timeslot Business app icon"
                width="96"
                height="96"
              />
            </p>
            <h1 data-reveal className="reveal">
              Timeslot Business
            </h1>
            <p data-reveal className="reveal lede">
              One app on a service provider's phone that runs their business,
              while their clients carry on using WhatsApp exactly as they do now.
            </p>
            <p data-reveal className="reveal">
              Your work. Your brand. Your slots.
            </p>
            <p data-reveal className="reveal muted">
              Timeslot Business is made by Correntum. It is not made by WhatsApp
              or Meta.
            </p>
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Where the app is today</h2>
            <p>
              Timeslot Business is still being built. Today the app runs in a
              demo with invented clients, and nothing in the demo is sent to
              anyone.
            </p>
            <p>
              Connecting a real WhatsApp number, sending replies to clients, and
              payments are not built yet. This page marks each of those parts as
              planned.
            </p>
            <p>Release status: Coming soon. The app is not yet on the App Store.</p>
          </div>

          <h2>Who it is for</h2>
          <p>
            Timeslot Business is for independent service providers in South
            Africa whose clients book with them on WhatsApp. Personal trainers
            come first, but the way the app checks bookings is not specific to
            trainers.
          </p>
          <p>
            The app is for the provider: the person or small business offering
            the service. Their clients do not install anything. They keep
            messaging the provider on WhatsApp, in the same chat they already
            use.
          </p>

          <h2>How it works with WhatsApp</h2>
          <p>
            These are the steps the app is designed to follow. In the demo, the
            same steps run on invented messages.
          </p>
          <ol>
            <li>
              <strong>A client sends a message.</strong> The client writes to
              your WhatsApp Business number, for example to ask for a booking on
              Thursday at 15:00.
            </li>
            <li>
              <strong>An AI reads the request.</strong> It picks out what the
              client asked for, such as the service, the day and the time. It
              does not decide anything.
            </li>
            <li>
              <strong>Your calendar decides.</strong> Software checks the request
              against your calendar and working hours. Only the calendar says
              what is open. The AI never invents an opening.
            </li>
            <li>
              <strong>A reply is drafted.</strong> If the time is free, the reply
              offers it. If the time is taken, the reply says so and offers up to
              three open times.
            </li>
            <li>
              <strong>You approve.</strong> You see the client's own message,
              what was read, what the calendar found and the drafted reply.
              Nothing is sent until you approve it.
            </li>
          </ol>
          <p>
            A message from a number you don't know is never booked. It comes to
            you first, and an unknown number becomes a client only when you
            approve it.
          </p>

          <h3>Rules the booking assistant is built to follow</h3>
          <ul>
            <li>
              It talks only about bookings and your own common questions, such as
              your prices, your location and what to bring. For anything else, it
              says you will reply.
            </li>
            <li>
              If a client asks whether it is a person, it says it is your booking
              assistant. It never claims to be you.
            </li>
            <li>It only offers times your calendar shows as open.</li>
            <li>
              When you reply to a client from your own phone, it stops replying
              in that chat until the client's next message.
            </li>
          </ul>

          <h2>What you see in the app</h2>
          <p>These screens are in the app's demo today, with invented clients.</p>
          <dl>
            <dt>Today</dt>
            <dd>
              Your day's bookings in order, and how many requests are waiting for
              you.
            </dd>
            <dt>Queue</dt>
            <dd>
              Each request that needs your decision: the client's message, what
              was read, what the calendar found, and the reply waiting for you.
              You approve, edit or decline it.
            </dd>
            <dt>Focus</dt>
            <dd>
              One client's conversation in full, with the client's messages and
              each reply labelled by who sent it.
            </dd>
            <dt>Calendar</dt>
            <dd>Your day, with the week above it.</dd>
            <dt>Clients</dt>
            <dd>
              Each client's last and next booking, and their conversation with
              you.
            </dd>
          </dl>

          <h2>Planned, not built yet</h2>
          <ul>
            <li>
              <strong>WhatsApp connection.</strong> You connect your WhatsApp
              Business number inside the app, and your own WhatsApp Business app
              keeps working on your phone. Approved replies go to your client on
              WhatsApp, from your number.
            </li>
            <li>
              <strong>Payment requests and deposits.</strong> One payment request
              per booking, paid through a licensed South African payment provider
              into your own merchant account. Timeslot never holds your money.
              Deposit and cancellation terms are shown to the client before they
              pay.
            </li>
            <li>
              <strong>Handling simple requests.</strong> When your calendar can
              settle a request, the booking is made, the reply goes out and you
              are told what happened. Only the requests the calendar cannot
              settle wait for you. You can pause this at any time.
            </li>
          </ul>

          <h2>Not in the first version</h2>
          <p>
            An app or marketplace for clients, group bookings, classes and
            memberships, calendars for more than one staff member, and
            accounting.
          </p>

          <h2>Your clients' information</h2>
          <p>
            Client messages will be read by an AI from an outside provider:
            Anthropic (the Claude AI service). Before any client message is sent
            to that provider, the app will tell you what is sent and who receives
            it, and ask for your permission.
          </p>
          <p>The app does not keep health or injury notes about clients.</p>
          <p>
            Read the{" "}
            <Link to="/timeslot-business/privacy">
              privacy policy for Timeslot Business
            </Link>
            .
          </p>

          <h2>Questions</h2>
          <p>
            See <Link to="/support">Support</Link> for how to contact Correntum
            about Timeslot Business.
          </p>
        </div>
      </section>
    </main>
  );
}
