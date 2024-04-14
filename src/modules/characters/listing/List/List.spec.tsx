import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { CardData } from "../Card";
import { List as CharacterList } from "./List";

describe("characterList component", () => {
  const sampleCard: CardData = {
    label: "sample",
    id: 1,
    description: "sample",
    isFavorite: false,
    urlImage: "https://sample.com/sample.jpg",
  };

  it("should render", () => {
    const { container } = render(<CharacterList
      cardsData={[]}
    />);

    expect(container.firstChild).toBeInTheDocument();
  } );
  it("should render card", () => {
    const { container } = render(<CharacterList
      cardsData={[sampleCard]}
    />);

    expect(container).toHaveTextContent(sampleCard.label);
    expect(container).toHaveTextContent(sampleCard.description);
  } );
} );
