export {};

declare global {
  export interface Element {
    getByTestId(testid: string): Element;
  }
}

Element.prototype.getByTestId = function (testid: string) {
  const selector = `[data-testid=${testid}]`;
  const element = this.querySelector(selector);
  if (element) return element;
  throw new Error(
    `No element found for selector '${selector}' in HTML:\n${this.innerHTML}`
  );
};
