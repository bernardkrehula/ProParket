import { useEffect } from "react";
import type { RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        callback();
      }
    };

    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClick);
    };
  }, [enabled, callback, ref]);
};
