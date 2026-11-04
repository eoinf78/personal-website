"use client";

import { ReactElement } from "react";

export const BackToTop = (): ReactElement => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className="BackToTop"
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
};