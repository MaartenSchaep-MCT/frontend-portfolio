import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

const getInitialState = () => {
  if (typeof window === "undefined") return false;
  return !window.matchMedia(QUERY).matches;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(getInitialState);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
}
export default usePrefersReducedMotion;
