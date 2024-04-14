import { z } from "zod";
import { ComicData as Data, comicDataSchema } from "../model";
import { ResponseJson } from "./ResponseJson";

export function parseData(response: ResponseJson): Data[] {
  const data = response.data.results.map((item) => ( {
    id: item.id,
    title: item.title,
    year: getYearFromDates(item.dates),
    urlImage: item.thumbnail.path + "." + item.thumbnail.extension,
  } satisfies Data));

  z.array(comicDataSchema).parse(data);

  return data;
}

function getYearFromDates(dates: ResponseJson["data"]["results"][0]["dates"]): number {
  const onSaleDate = dates.find((date) => date.type === "onsaleDate");
  let date: Date;

  if (onSaleDate)
    date = new Date(onSaleDate.date);
  else
    date = new Date(dates[0].date);

  const year = date.getFullYear();

  if (Number.isNaN(year) || year < 1900)
    return -1;

  return year;
}
