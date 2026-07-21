import React from "react";

/** Smooth-scroll to a section without putting a #hash in the URL. */
export function scrollToId(e: React.MouseEvent, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
