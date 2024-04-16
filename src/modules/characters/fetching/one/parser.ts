import { CharacterData as Data, characterDataSchema as dataSchema } from "../../model";
import { ResponseJson } from "./ResponseJson";

export function parseData(response: ResponseJson): Data {
  const [item] = response.data.results;
  const data = {
    id: item.id,
    label: item.name,
    description: item.description.trim() || "(No description available)",
    urlImage: item.thumbnail.path + "." + item.thumbnail.extension,
  } satisfies Data;

  dataSchema.parse(data);

  return data;
}
