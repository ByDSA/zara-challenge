import { createContext } from "react";
import { CharacterData } from "../../model";

export const SearchContext = createContext<CharacterData[]>([]);
