import { CharacterData as Character } from "../model";

type CharactersCache = Record<number, Character>;

const KEY = "characters-cache";
let currentCache: CharactersCache | undefined;

function readCharacters(): CharactersCache | undefined {
  const serialized = localStorage.getItem(KEY);

  if (!serialized)
    return undefined;

  try {
    const parsedCache = JSON.parse(serialized) as CharactersCache;

    currentCache = parsedCache;

    return parsedCache;
  } catch (_) {
    return undefined;
  }
}

function writeCharacters(cache: CharactersCache) {
  const serialized = JSON.stringify(cache);

  localStorage.setItem(KEY, serialized);
}

export function getCharacterFromCache(characterId: Character["id"]): Character | undefined {
  const cache = currentCache ?? readCharacters();

  if (!cache)
    return undefined;

  return cache[characterId];
}

export function addCharacterToCache(character: Character) {
  if (!currentCache) {
    currentCache = {
    };
  }

  // Para evitar añadir propiedades no deseadas (ej: isFavorite)
  const trimmedCharacter: Character = {
    description: character.description,
    id: character.id,
    label: character.label,
    urlImage: character.urlImage,
  };

  currentCache[character.id] = trimmedCharacter;

  writeCharacters(currentCache);
}
