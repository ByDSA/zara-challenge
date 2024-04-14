import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Wrapper as SearchWrapper } from "./Wrapper";
import { Search } from ".";

describe("search component", () => {
  it("should render", () => {
    const { container } = render(<SearchWrapper />);

    expect(container.firstChild).toBeInTheDocument();
  } );

  describe("result string", () => {
    describe.each([
      [1, /1 RESULT\b/],
      [0, /0 RESULTS\b/],
      [2, /2 RESULTS\b/],
    ])("resultsNumber: %i", (resultsNumber, expected) => {
      it(`renders "${expected}"`, () => {
        const { container } = render(<SearchWrapper resultsNumber={resultsNumber}/>);

        expect(container).toHaveTextContent(expected);
      } );
    } );
  } );

  it("should call onSearch when text is changed", () => {
    const onSearch = jest.fn();
    const { getByRole } = render(<Search onSearch={onSearch}/>);
    const input = getByRole("searchbox");

    fireEvent.change(input, {
      target: {
        value: "test",
      },
    } );

    expect(onSearch).toHaveBeenCalledWith("test");
  } );

  it("should text as placeholder appears as placeholder in input", () => {
    const { getByRole } = render(<Search placeholder="test"/>);
    const input = getByRole("searchbox");

    expect(input).toHaveAttribute("placeholder", "test");
  } );

  it("should be disabled when disabled is true", () => {
    const { getByRole } = render(<Search disabled={true}/>);
    const input = getByRole("searchbox");

    expect(input).toBeDisabled();
  } );

  it("should contain SearchIcon", () => {
    const { container } = render(<Search />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();

    const expectedSize = "12px";

    expect(svg).toHaveStyle("width: " + expectedSize);
    expect(svg).toHaveStyle("height: " + expectedSize);
  } );
} );
