import { z } from "zod";

export const dataSchema = z.object( {
  id: z.number(),
  label: z.string(),
  description: z.string(),
  urlImage: z.string().url(),
} );

export type Data = z.infer<typeof dataSchema>;
