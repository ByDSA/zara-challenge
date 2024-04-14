import { z } from "zod";

const KEY = "characters-favorites";

export function readFavoritesStorage(): Set<number> | undefined {
  const serialized = localStorage.getItem(KEY);

  if (!serialized)
    return undefined;

  try {
    const array = JSON.parse(serialized) as number[];

    z.array(z.number()).parse(array);

    return new Set(array);
  } catch (_) {
    return undefined;
  }
}

export function writeFavoritesStorage(favorites: Set<number>) {
  const serialized = JSON.stringify(Array.from(favorites));

  localStorage.setItem(KEY, serialized);
}
