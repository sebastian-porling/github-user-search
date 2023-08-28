import React from "react";
import { render, screen } from "@testing-library/react";
import "./ElementExtensions";

export class BaseTestCase {
  private ui?: React.ReactElement;
  private _container?: HTMLElement | null;
  public readonly screen = screen;

  protected doRender(ui?: React.ReactElement): void {
    this.ui = ui;
  }

  get container(): HTMLElement {
    if (this._container && this._container.innerHTML) {
      return this._container;
    }
    return this.initialize().container;
  }

  private initialize(): { container: HTMLElement } {
    if (!this.ui) throw new Error("Test case is not yet rendered!");

    const renderResult = render(this.ui);
    this._container = renderResult.container;

    return {
      container: this._container,
    };
  }
}
