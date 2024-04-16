import { addCharacterToCache } from "../../cache";
import { CharacterData as Data } from "../../model";
import { ResponseJson, responseJsonSchema } from "./ResponseJson";
import { GenerateUrlProps, generateUrl } from "./generateUrl";
import { parseData } from "./parser";

export type FetchDataProps = GenerateUrlProps;

export async function fetchData(props: FetchDataProps): Promise<Data> {
  const url = generateUrl(props);
  const responseJson: ResponseJson = await fetch(url)
    .then((response) => response.json())
    .then(responseJsonSchema.parse);
  const data = parseData(responseJson);

  addCharacterToCache(data);

  return data;
}
