import { z } from "zod";

let checked: boolean = false;
const envsSchema = z.object( {
  NEXT_PUBLIC_MARVEL_PUBLIC_KEY: z.string(),
} );
const browserEnvs = {
  NEXT_PUBLIC_MARVEL_PUBLIC_KEY: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
};

type Envs = z.infer<typeof envsSchema>;

export function env(name: keyof Envs): string {
  if (!checked) {
    process.env = {
      ...process.env,
      ...browserEnvs,
    };
    envsSchema.parse(process.env);
    checked = true;
  }

  const ret = process.env[name];

  if (!ret)
    throw new Error(`Missing env ${name}`);

  return ret;
}
