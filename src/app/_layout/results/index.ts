import { useEffect, useRef, useState } from "react";
import { FetchManyCharactersOrderBy, FetchManyCharactersProps, fetchManyCharacters } from "#modules/characters/fetching";
import { CharacterData } from "#modules/characters/model";
import { env } from "#modules/envs";

export enum ResultType {
  SEARCH,
  FAVORITES,
}

const RESULT_TYPE_SEARCH = "search";
const RESULT_TYPE_FAVORITES = "favorites";

export const RESULT_TYPE_SEARCH_PARAM = "resultType";

export const resultTypeStringify = (resultType: ResultType) => {
  switch (resultType) {
    case ResultType.SEARCH:
      return RESULT_TYPE_SEARCH;
    case ResultType.FAVORITES:
      return RESULT_TYPE_FAVORITES;
    default: {
      const _: never = resultType;

      throw new Error(`Unknown result type: ${resultType}`);
    }
  }
};

export const parseResultType = (resultType: string) => {
  switch (resultType) {
    case RESULT_TYPE_SEARCH:
      return ResultType.SEARCH;
    case RESULT_TYPE_FAVORITES:
      return ResultType.FAVORITES;
    default:
      throw new Error(`Unknown result type: ${resultType}`);
  }
};

export type SetResultData = (data: CharacterData[])=> void;

type UseCharacterResultDataProps = {
  getFavoritesList: ()=> CharacterData[];
  resultTypeSearchParam: ResultType | undefined;
};
export function useCharacterResultData( { getFavoritesList,
  resultTypeSearchParam }: UseCharacterResultDataProps) {
  // No se puede usar CharacterCardData porque esto está fuera del Favorites context
  const [data, setData] = useState<CharacterData[]>([]);

  useEffect(() => {
    if (resultTypeSearchParam === ResultType.FAVORITES)
      updateResultDataWithFavorites();
  }, [resultTypeSearchParam]);
  const resultTypeRef = useRef<ResultType>(resultTypeSearchParam ?? ResultType.SEARCH);
  const setResultType = (resultType: ResultType) => {
    resultTypeRef.current = resultType;
  };
  const setResultData = (
    characters: CharacterData[],
  ) => {
    setData(characters);
  };
  const updateResultDataWithFavorites = () => {
    const newFavoritesList = getFavoritesList();

    setResultType(ResultType.FAVORITES);
    setResultData(newFavoritesList);
  };

  useEffect(() => {
    const initialProps: FetchManyCharactersProps = {
      publicKey: env("NEXT_PUBLIC_MARVEL_PUBLIC_KEY"),
      orderBy: FetchManyCharactersOrderBy.NAME_ASC,
      limit: 50,
    };

    if (resultTypeRef.current === ResultType.SEARCH) {
      fetchManyCharacters(initialProps)
        .then(results =>{
          if (resultTypeRef.current === ResultType.SEARCH)
            setResultData(results);
        } );
    }
  }, []);

  return {
    resultData: data,
    setResultData,
    updateResultDataWithFavorites,
    setResultType,
    resultTypeRef,
  };
}
