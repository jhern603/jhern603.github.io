/** Visible arrow for links that open a new tab, with the same message for screen readers. */
export function NewTabMark() {
  return (
    <>
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}
