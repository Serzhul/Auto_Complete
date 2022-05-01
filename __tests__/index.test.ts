import { screen } from "@testing-library/dom";

import "@testing-library/jest-dom";

describe("ui tests", () => {
  test("uses jest-dom", () => {
    document.body.innerHTML = `<span data-testid="not-empty"><span data-testid="empty"></span></span>
        <span data-testid="with-whitespace"> </span>
        <span data-testid="with-comment"><!-- comment --></span>`;

    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
    expect(screen.getByTestId("not-empty")).not.toBeEmptyDOMElement();
    expect(screen.getByTestId("with-whitespace")).not.toBeEmptyDOMElement();
  });
});
