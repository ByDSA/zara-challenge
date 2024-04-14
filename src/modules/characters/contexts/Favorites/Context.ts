import { createContext, useEffect, useState } from "react";
import { addCharacterToCache, getCharacterFromCache } from "../../cache";
import { CharacterCardData as CardData } from "../../listing";
import { CharacterData } from "../../model";
import { readFavoritesStorage, writeFavoritesStorage } from "./favoritesStorage";

type ContextData = {
  getFavoritesList: ()=> CharacterData[];
  addFavorites: (newValue: CharacterData)=> void;
  removeFavorites: (id: CharacterData["id"])=> void;
  getFavoritesLength: ()=> number;
  isInFavorites: (characterId: CharacterData["id"])=> boolean;
  adaptCharacterDataToCardData: (data: CharacterData[])=> CardData[];
};

export const Context = createContext<ContextData>(undefined!);

export function useCreateContextData(): ContextData {
  let [favoritesSet, setFavoritesSet] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const favs = readFavoritesStorage();

    if (favs) {
      setFavoritesSet(favs);

      // Para evitar useRef y reinstanciación de las funciones que usen favoritesSet
      favoritesSet = favs;
    }
  }, []);
  const getFavoritesList = () =>Array.from(favoritesSet)
    .map(getCharacterFromCache)
    .filter((character) => character !== undefined) as CharacterData[];
  const addFavorites = (character: CharacterData) => {
    favoritesSet.add(character.id);

    // Se cambia la referencia para que se detecte el cambio
    const newValue = new Set(favoritesSet);

    setFavoritesSet(newValue);

    writeFavoritesStorage(newValue);
    addCharacterToCache(character);
  };
  const removeFavorites = (id: CharacterData["id"]) => {
    favoritesSet.delete(id);

    // Se cambia la referencia para que se detecte el cambio
    const newValue = new Set(favoritesSet);

    setFavoritesSet(newValue);

    writeFavoritesStorage(newValue);
  };
  const isInFavorites = (characterId: CharacterData["id"]) => favoritesSet.has(characterId);
  const getFavoritesLength = () => {
    return favoritesSet.size;
  };

  return {
    getFavoritesLength,
    getFavoritesList,
    addFavorites,
    removeFavorites,
    isInFavorites,
    adaptCharacterDataToCardData: (data: CharacterData[]) => {
      return data.map((element) => ( {
        ...element,
        isFavorite: isInFavorites(element.id),
      } ));
    },
  };
}
