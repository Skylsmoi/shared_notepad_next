'use client'

// NextJs workaround for React portal
// see: https://github.com/vercel/next.js/blob/canary/examples/with-portals/components/ClientOnlyPortal.js
import {ReactNode, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

export default function ClientOnlyPortal(
  { children, selector }: { children: ReactNode, selector: string }
) {
  'use client'
  const ref = useRef<Element | DocumentFragment | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  /* eslint-disable react-hooks/refs */
  // @ts-expect-error Don't know how to set default value for useRef that match Element | DocumentFragment
  return mounted ? createPortal(children, ref.current) : null;
  /* eslint-enable react-hooks/refs */
}
