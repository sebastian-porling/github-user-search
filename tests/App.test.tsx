import React from "react";
import { BaseTestCase } from "./utils/BaseTestCase";
import App from "$/App";

describe("App", () => {
  let testCase: AppTestCase;

  beforeEach(() => {
    testCase = new AppTestCase();
  });

  test("renders app component", () => {
    expect(testCase.app).toBeDefined();
  });
});

class AppTestCase extends BaseTestCase {
  constructor() {
    super();

    super.doRender(<App />);
  }

  get app() {
    return this.container.getByTestId("app");
  }
}
