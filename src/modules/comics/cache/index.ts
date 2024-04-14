import { ComicData } from "../model";
import { CharacterData } from "#modules/characters/model";

type CharacterId = CharacterData["id"];
type CharactersComicsCache = Record<CharacterId, ComicData[]>;

const KEY = "characters-comics-cache";
let currentCache: CharactersComicsCache | undefined;

function readCharacterComics(): CharactersComicsCache | undefined {
  const serialized = localStorage.getItem(KEY);

  if (!serialized)
    return undefined;

  try {
    const parsedCache = JSON.parse(serialized) as CharactersComicsCache;

    currentCache = parsedCache;

    return parsedCache;
  } catch (_) {
    return undefined;
  }
}

function writeCharacterComics(cache: CharactersComicsCache) {
  const serialized = JSON.stringify(cache);

  localStorage.setItem(KEY, serialized);
}

export function getCharacterComicsFromCache(characterId: CharacterId): ComicData[] | undefined {
  const cache = currentCache ?? readCharacterComics();

  if (!cache)
    return undefined;

  return cache[characterId];
}

export function addCharacterComicsToCache(characterId: CharacterId, comics: ComicData[]) {
  if (!currentCache) {
    currentCache = {
    };
  }

  currentCache[characterId] = comics;

  writeCharacterComics(currentCache);
}
