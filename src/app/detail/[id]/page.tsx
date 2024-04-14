"use client";

import { useEffect, useState } from "react";
import { Header, RESULT_TYPE_SEARCH_PARAM, ResultType, resultTypeStringify } from "../../_layout";
import { FixedWidthContent } from "./_layout/FixedWidthContent";
import styles from "./styles.module.css";
import { getCharacterFromCache } from "#modules/characters/cache";
import { CharacterResume } from "#modules/characters/Resume";
// eslint-disable-next-line import/no-internal-modules
import cardDetailStyles from "#modules/characters/card-detail-common.module.css";
import { useCreateFavoritesContextData } from "#modules/characters/contexts/Favorites";
import { readFavoritesStorage } from "#modules/characters/contexts/Favorites/favoritesStorage";
import { fetchOneCharacter } from "#modules/characters/fetching";
import { CharacterCardData } from "#modules/characters/listing";
import { CharacterData } from "#modules/characters/model";
import { getCharacterComicsFromCache } from "#modules/comics/cache";
import { ComicFetchingOrderBy, fetchComics } from "#modules/comics/fetching";
import { ComicsList } from "#modules/comics/listing";
import { ComicData } from "#modules/comics/model";
import { env } from "#modules/envs";
import { classNames } from "#modules/utils";

type Props = {
  params: {
    id: string;
  };
};
export default function Detail( { params }: Props) {
  const favoritesContextData = useCreateFavoritesContextData();
  const { getFavoritesLength,
    addFavorites,
    removeFavorites } = favoritesContextData;
  const header = <Header favorites={{
    counter: getFavoritesLength(),
    href: "/?" + RESULT_TYPE_SEARCH_PARAM + "=" + resultTypeStringify(ResultType.FAVORITES),
  }}
  />;
  const id = +params.id;
  const { characterCardData } = useCharacterCardData(id);
  const { comics } = useComicsOfCharacter(id);

  return (
    <>
      <section className={styles.main}>
        {header}
        <FixedWidthContent theme={{
          className: classNames(styles.resume, cardDetailStyles.main),
          innerDiv: {
            className: styles.content,
          },
        }}>
          <CharacterResume data={characterCardData} favButton={{
            onClick: ( { newActiveValue } ) => {
              if (newActiveValue)
                addFavorites(characterCardData);
              else
                removeFavorites(characterCardData.id);
            },
          }}/>
        </FixedWidthContent>
        <FixedWidthContent theme={{
          className: styles.comics,
          innerDiv: {
            className: styles.content,
          },
        }}>
          <h2 className={styles.title}>COMICS</h2>
          <ComicsList data={comics} />
        </FixedWidthContent>
      </section>
    </>
  );
}

function useComicsOfCharacter(id: number) {
  const [comics, setComics] = useState<ComicData[] | undefined>(undefined);

  useEffect(() => {
    const cachedComics = getCharacterComicsFromCache(id);

    if (cachedComics)
      setComics(cachedComics);
  }, []);

  if (!comics) {
    fetchComics( {
      characterId: id,
      publicKey: env("NEXT_PUBLIC_MARVEL_PUBLIC_KEY"),
      orderBy: ComicFetchingOrderBy.ON_SALE_DATE_ASC,
      limit: 20,
    } ).then(setComics);
  }

  return {
    comics: comics ?? [],
  };
}

function useCharacterCardData(id: number) {
  const [
    characterCardData, setCharacterCardData,
  ] = useState<CharacterCardData | undefined>(undefined);

  useEffect(() => {
    const cachedCharacter = getCharacterFromCache(id);

    if (cachedCharacter)
      setCharacterCardData(characterDataToCardData(cachedCharacter));
  }, []);

  if (!characterCardData) {
    fetchOneCharacter( {
      characterId: id,
      publicKey: env("NEXT_PUBLIC_MARVEL_PUBLIC_KEY"),
    } )
      .then(characterDataToCardData)
      .then(setCharacterCardData);
  }

  const defaultCharacterCardData: CharacterCardData = {
    id,
    label: "(loading)",
    urlImage: "",
    description: "(loading)",
    isFavorite: false,
  };

  return {
    characterCardData: characterCardData ?? defaultCharacterCardData,
  };
}

function characterDataToCardData(data: CharacterData): CharacterCardData {
  const isFavorite = readFavoritesStorage()?.has(data.id) ?? false;
  const d: CharacterCardData = {
    ...data,
    isFavorite,
  };

  return d;
}
