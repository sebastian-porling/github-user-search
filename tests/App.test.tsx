import React from "react";
import { BaseTestCase } from "./utils/BaseTestCase";
import App from "$/App";

describe("App", () => {
  let testCase: AppTestCase;

  beforeEach(() => {
    testCase = new AppTestCase();
  });

  test("renders learn react link", () => {
    expect(testCase.link.textContent).toBe("Learn React");
  });
});

class AppTestCase extends BaseTestCase {
  constructor() {
    super();

    super.doRender(<App />);
  }

  get link() {
    return this.container.getByTestId("link");
  }
}
