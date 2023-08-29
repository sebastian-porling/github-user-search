import { fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";

export {};

declare global {
  export interface Element {
    getByTestId(testid: string): Element;
    changeIt(value: string): void;
    getValue(): string | undefined;
    pressEnter(): Promise<void>;
    clickIt(): Promise<void>;
    isDisabled(): boolean;
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

Element.prototype.changeIt = function (value: string): void {
  fireEvent.change(this, {
    target: { value },
  });
};

Element.prototype.getValue = function (): string | undefined {
  return (this as unknown as HTMLInputElement).value;
};

Element.prototype.pressEnter = async function (): Promise<void> {
  const element = this as HTMLInputElement;
  await user.type(element, "[Enter]");
};

Element.prototype.clickIt = async function (): Promise<void> {
  await user.click(this);
};

Element.prototype.isDisabled = function (): boolean {
  return (this as unknown as HTMLButtonElement).disabled;
};
