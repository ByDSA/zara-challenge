jest.mock("#modules/icons/heart-icon/HeartIconSelected", () => ( {
  HeartIconSelected: () => <svg data-testid="heart-icon-selected"/>,
} ));

jest.mock("#modules/icons/heart-icon/HeartIconUnselected", () => ( {
  HeartIconUnselected: () => <svg data-testid="heart-icon-unselected"/>,
} ));

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Card } from "./Card";
import { CardData } from ".";

describe("characterList component", () => {
  const noFavSampleCard: CardData = {
    label: "sample",
    id: 1,
    description: "sample",
    isFavorite: false,
    urlImage: "https://sample.com/sample.jpg",
  };
  const favSampleCard: CardData = {
    ...noFavSampleCard,
    isFavorite: true,
  };

  it("should render", () => {
    const { container } = render(<Card
      data={noFavSampleCard}
    />);

    expect(container.firstChild).toBeInTheDocument();
  } );
  it("should render with provided info (except favorite value)", () => {
    const { container } = render(<Card
      data={noFavSampleCard}
    />);

    expect(container).toHaveTextContent(noFavSampleCard.label);
    expect(container).toHaveTextContent(noFavSampleCard.description);

    const image = container.querySelector("img");
    const src: string = image?.getAttribute("src") as string;

    expect(src).toBeDefined();

    const decodedSrc = decodeURIComponent(src);

    expect(decodedSrc).toContain(noFavSampleCard.urlImage);

    expect(container).toContainHTML("<svg"); // Favorite icon
  } );

  it("should render with favorite button active", () => {
    const { getByTestId } = render(<Card
      data={favSampleCard}
    />);
    const svg = getByTestId("heart-icon-selected");

    expect(svg).toBeInTheDocument();
  } );

  it("should render with favorite button inactive", () => {
    const { getByTestId } = render(<Card
      data={noFavSampleCard}
    />);
    const svg = getByTestId("heart-icon-unselected");

    expect(svg).toBeInTheDocument();
  } );
} );
