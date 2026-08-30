import { useReveal } from "../hooks/useReveal";
import { Link } from "../lib/router";
import { quietButton } from "../lib/ui";

// A single quiet invitation dropped into the homepage flow between the origin
// section and the engagement section. Its own vertical whitespace, so it does
// not disturb the rhythm of either neighbour. Revealed with the shared primitive.
export function HomeBridge() {
  const ref = useReveal();

  return (
    <div className="container-page py-20 md:py-28">
      <div ref={ref} className="reveal flex justify-center">
        <Link to="/see-it-work" className={quietButton}>
          See how it works
        </Link>
      </div>
    </div>
  );
}
