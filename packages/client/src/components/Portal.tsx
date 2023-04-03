import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({children}: {children: React.ReactNode | undefined}) => {
  const mount = document.getElementById("portal-modal");
  const el = document.createElement("div");

  useEffect(() => {
    if( !mount ) return;
    mount.appendChild(el);
    return () => {
        mount.removeChild(el);
    }
  }, [el, mount]);

  return createPortal(children, el)
};

export default Portal;