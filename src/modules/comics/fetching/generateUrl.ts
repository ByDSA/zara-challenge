import { CharacterData } from "#modules/characters/model";

export enum ComicFetchingOrderBy {
  ON_SALE_DATE_ASC = "onsaleDate",
  FOC_DATE_ASC = "focDate",
  TITLE_ASC = "title",
  ISSUE_NUMBER_ASC = "issueNumber",
  MODIFIED_ASC = "modified",
  ON_SALE_DATE_DESC = "-onsaleDate",
  FOC_DATE_DESC = "-focDate",
  TITLE_DESC = "-title",
  ISSUE_NUMBER_DESC = "-issueNumber",
  MODIFIED_DESC = "-modified",
}

type OptionalProps = Partial<{
  orderBy: ComicFetchingOrderBy;
  nameStartsWith: string;
  limit: number;
}>;
export type GenerateUrlProps = OptionalProps & {
  publicKey: string;
  characterId: CharacterData["id"];
};

export function generateUrl( { publicKey,
  orderBy,
  limit,
  characterId,
  nameStartsWith }: GenerateUrlProps): URL {
  const url = new URL("https://gateway.marvel.com/v1/public/characters/" + characterId + "/comics");
  const queryParams = new URLSearchParams();

  queryParams.append("apikey", publicKey);

  if (orderBy)
    queryParams.append("orderBy", orderBy);

  if (nameStartsWith)
    queryParams.append("nameStartsWith", nameStartsWith);

  if (limit)
    queryParams.append("limit", limit.toString());

  url.search = queryParams.toString();

  return url;
}
