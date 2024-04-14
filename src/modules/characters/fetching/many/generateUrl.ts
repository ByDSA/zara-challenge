
export enum OrderBy {
  MODIFIED_DESC = "-modified",
  NAME_DESC = "-name",
  MODIFIED_ASC = "modified",
  NAME_ASC = "name"
}

type OptionalProps = Partial<{
  orderBy: OrderBy;
  nameStartsWith: string;
  limit: number;
}>;
export type GenerateUrlProps = OptionalProps & {
  publicKey: string;
};

export function generateUrl( { publicKey,
  orderBy,
  limit,
  nameStartsWith }: GenerateUrlProps): URL {
  const url = new URL("https://gateway.marvel.com/v1/public/characters");
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
