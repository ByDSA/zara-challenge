import { z } from "zod";
import { CharacterData as Data, characterDataSchema as dataSchema } from "../../model";
import { ResponseJson } from "./ResponseJson";

export function parseData(response: ResponseJson): Data[] {
  const data = response.data.results.map((item) => ( {
    id: item.id,
    label: item.name,
    description: item.description.trim() || "(No description available)",
    urlImage: item.thumbnail.path + "." + item.thumbnail.extension,
  } satisfies Data));

  z.array(dataSchema).parse(data);

  return data;
}
