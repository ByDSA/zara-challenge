import { addCharacterToCache } from "../../cache";
import { Data } from "../../model/Data";
import { ResponseJson, responseJsonSchema } from "./ResponseJson";
import { GenerateUrlProps, generateUrl } from "./generateUrl";
import { parseData } from "./parser";
import { debounceAsync } from "#modules/utils";

export type FetchDataProps = GenerateUrlProps;

export async function fetchData(props: FetchDataProps): Promise<Data[]> {
  const url = generateUrl(props);
  const responseJson: ResponseJson = await fetch(url)
    .then((response) => response.json())
    .then(responseJsonSchema.parse);
  const data = parseData(responseJson);

  for (const character of data)
    addCharacterToCache(character);

  return data;
}

export const debounceFetchData = debounceAsync((props: FetchDataProps) => {
  return fetchData(props);
}, 500);
