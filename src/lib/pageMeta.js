import { useEffect } from "react";

// Sets the document title and description per route, and adds a robots
// noindex tag while a draft/hidden page is mounted (removed on unmount).
// The site is an SPA, so these are managed at runtime.
export function usePageMeta({ title, description, noindex = false }) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    let descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl ? descEl.getAttribute("content") : null;
    if (description) {
      if (!descEl) {
        descEl = document.createElement("meta");
        descEl.setAttribute("name", "description");
        document.head.appendChild(descEl);
      }
      descEl.setAttribute("content", description);
    }

    let robotsEl = null;
    if (noindex) {
      robotsEl = document.createElement("meta");
      robotsEl.setAttribute("name", "robots");
      robotsEl.setAttribute("content", "noindex, nofollow");
      document.head.appendChild(robotsEl);
    }

    return () => {
      document.title = prevTitle;
      if (descEl && prevDesc !== null) descEl.setAttribute("content", prevDesc);
      if (robotsEl) robotsEl.remove();
    };
  }, [title, description, noindex]);
}
