import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { scrollToTarget } from "./lenis";

// A deliberately tiny path router. The site has two routes ("/" and
// "/see-it-work") and no need for a routing library. History API plus a
// popstate listener is the whole thing.
//
// Static hosting needs an SPA fallback so a hard load of /see-it-work serves
// index.html. See public/_redirects (Netlify) and vercel.json (Vercel).

const RouterContext = createContext({ path: "/", navigate: () => {} });

function currentPath() {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    if (to !== currentPath()) {
      window.history.pushState({}, "", to);
      setPath(to);
    }
    // New route, top of page. Immediate, so it does not read as a scroll.
    scrollToTarget(0, { immediate: true });
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

// An anchor that keeps navigation in the SPA. Modified clicks (new tab, etc.)
// fall through to the browser.
export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRouter();

  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
