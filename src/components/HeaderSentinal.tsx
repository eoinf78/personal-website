"use client";

import { ReactElement, useEffect, useRef } from "react";

const SCROLLED_CLASS = "--scrolled";

export const HeaderScrollSentinel = (): ReactElement => {
  const addRef = useRef<HTMLDivElement>(null);
  const removeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addEl = addRef.current;
    const removeEl = removeRef.current;
    if (!addEl || !removeEl) return;

    // Header has scrolled out of view above the viewport: add the class
    const addObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        document.body.classList.add(SCROLLED_CLASS);
      }
    });

    // Very top of the page is visible again: remove the class
    const removeObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.remove(SCROLLED_CLASS);
      }
    });

    addObserver.observe(addEl);
    removeObserver.observe(removeEl);

    return () => {
      addObserver.disconnect();
      removeObserver.disconnect();
      document.body.classList.remove(SCROLLED_CLASS);
    };
  }, []);

  return (
    <>
      <div ref={addRef} className="Header__sentinel" aria-hidden="true" />
      <div ref={removeRef} className="Header__topSentinel" aria-hidden="true" />
    </>
  );
};