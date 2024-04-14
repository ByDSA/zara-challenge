import { addCharacterComicsToCache } from "../cache";
import { ComicData } from "../model";
import { ResponseJson, responseJsonSchema } from "./ResponseJson";
import { GenerateUrlProps, generateUrl } from "./generateUrl";
import { parseData } from "./parser";

export type FetchDataProps = GenerateUrlProps;

export async function fetchComics(props: FetchDataProps): Promise<ComicData[]> {
  const url = generateUrl(props);
  const responseJson: ResponseJson = await fetch(url)
    .then((response) => response.json())
    .then(responseJsonSchema.parse);
  const data = parseData(responseJson);

  addCharacterComicsToCache(props.characterId, data);

  return data;
}
