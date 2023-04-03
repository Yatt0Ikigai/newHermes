import React, { useEffect } from 'react'

export default function outsideAlerter({ref, callback}: {
    callback: () => void,
    ref: React.RefObject<HTMLElement>
}) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(this: Document, ev: MouseEvent) {
        if (ref.current && ev.currentTarget instanceof Node && !ref.current.contains(ev.target as Node)) callback();
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
