"use client";

import { useRouter } from "next/navigation";
import { Header, RESULT_TYPE_SEARCH_PARAM, ResultType, parseResultType, resultTypeStringify, useCharacterResultData } from "./_layout";
import styles from "./styles.module.css";
import { FavoritesContext, useCreateFavoritesContextData } from "#modules/characters/contexts/Favorites";
import { SearchCharactersContext } from "#modules/characters/contexts/Search";
import { FetchManyCharactersOrderBy, FetchManyCharactersProps, debounceFetchManyCharacters } from "#modules/characters/fetching";
import { CharacterCardCustomPropsCreator as CardCustomPropsCreator, CharacterList, CharacterCardFavButtonCustomProps as FavButtonCustomProps } from "#modules/characters/listing";
import { env } from "#modules/envs";
import { SearchWrapper } from "#modules/search/Search";

type Props = {
  searchParams?: {
    [RESULT_TYPE_SEARCH_PARAM]?: string;
  };
};
export default function Home(props: Props) {
  const router = useRouter();
  const resultTypeSearchParamStr = props.searchParams?.[RESULT_TYPE_SEARCH_PARAM];
  const resultTypeSearchParam = resultTypeSearchParamStr
    ? parseResultType(resultTypeSearchParamStr)
    : ResultType.SEARCH;
  const favoritesContextData = useCreateFavoritesContextData();
  const { getFavoritesLength,
    getFavoritesList,
    adaptCharacterDataToCardData,
    addFavorites,
    removeFavorites } = favoritesContextData;
  const { resultData: resultCharactersData,
    setResultData,
    resultTypeRef,
    updateResultDataWithFavorites } = useCharacterResultData( {
    getFavoritesList,
    resultTypeSearchParam,
  } );
  const resultType = resultTypeRef.current;
  const FAVORITES_URL = "/?" + RESULT_TYPE_SEARCH_PARAM + "=" + resultTypeStringify(ResultType.FAVORITES);
  const goToFavorites = () => {
    router.push(FAVORITES_URL);
  };
  const header = <Header favorites={{
    counter: getFavoritesLength(),
    onClick: resultType === ResultType.FAVORITES ? undefined : goToFavorites,
  }}
  />;
  const cardCustomPropsCreator: CardCustomPropsCreator = ( { data: character } ) => {
    const href = `/detail/${character.id}`;
    const favoriteButton: FavButtonCustomProps = {
      onClick: ( { newActiveValue } ) => {
        if (newActiveValue)
          addFavorites(character);
        else {
          removeFavorites(character.id);

          if (resultType === ResultType.FAVORITES)
            updateResultDataWithFavorites();
        }
      },
    };

    return {
      href,
      favoriteButton,
    };
  };
  const cardsData = adaptCharacterDataToCardData(resultCharactersData);
  const resultCharactersList = <CharacterList
    cardsData={cardsData}
    theme={{
      className: styles.characterList,
    }}
    card={cardCustomPropsCreator}
  />;
  const onSearchHandler = (value: string | null) => {
    const fetchProps: FetchManyCharactersProps = {
      publicKey: env("NEXT_PUBLIC_MARVEL_PUBLIC_KEY"),
      orderBy: FetchManyCharactersOrderBy.NAME_ASC,
      limit: 50,
      nameStartsWith: value ?? undefined,
    };

    debounceFetchManyCharacters(fetchProps)
      .then(data=> {
        // Sólo se actualizan los datos si durante el fetching no ha cambiado el tipo de resultado
        if (resultTypeRef.current === ResultType.SEARCH)
          setResultData(data);
      } );
  };

  return (
    <>
      <FavoritesContext.Provider value={favoritesContextData}>
        {header}
        <main className={styles.main}>
          {resultType === ResultType.FAVORITES
          && <h1 className={styles.favoritesHeader}>FAVORITES</h1>}
          <SearchCharactersContext.Provider value={resultCharactersData}>
            <SearchWrapper
              onSearch={onSearchHandler}
              resultsNumber={resultCharactersData.length}
              disabled={resultType !== ResultType.SEARCH}
            />
            {resultCharactersList}
          </SearchCharactersContext.Provider>
        </main>
      </FavoritesContext.Provider>
    </>
  );
}
