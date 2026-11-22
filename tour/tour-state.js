// Which scene the walkthrough is on. Wraps round at both ends.
export function createTour(count) {
  let i = 0;
  return {
    get index() {
      return i;
    },
    next() {
      i = (i + 1) % count;
      return i;
    },
    prev() {
      i = (i - 1 + count) % count;
      return i;
    },
    goTo(n) {
      if (Number.isInteger(n) && n >= 0 && n < count) i = n;
      return i;
    },
  };
}
