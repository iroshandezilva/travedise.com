// One counter per page render (the Request is new for every render), so the same page always
// produces the same ids.
const counters = new WeakMap<Request, number>();

export function nextAccordionId(request: Request): number {
  const next = (counters.get(request) ?? 0) + 1;
  counters.set(request, next);
  return next;
}
