import { z } from "zod";

export const comicDataSchema = z.object( {
  id: z.number(),
  title: z.string(),
  year: z.number(),
  urlImage: z.string().url(),
} );

export type ComicData = z.infer<typeof comicDataSchema>;
