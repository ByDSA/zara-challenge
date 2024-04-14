// Conversión JSON a Schema de Zod: https://transform.tools/json-to-zod

import { z } from "zod";

export const responseJsonSchema = z.object( {
  code: z.number(),
  status: z.string(),
  copyright: z.string(),
  attributionText: z.string(),
  attributionHTML: z.string(),
  etag: z.string(),
  data: z.object( {
    offset: z.number(),
    limit: z.number(),
    total: z.number(),
    count: z.number(),
    results: z.array(
      z.union([
        z.object( {
          id: z.number(),
          name: z.string(),
          description: z.string(),
          modified: z.string(),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          resourceURI: z.string(),
          comics: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          series: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          stories: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                type: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          events: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
        } ),
        z.object( {
          id: z.number(),
          name: z.string(),
          description: z.string(),
          modified: z.string(),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          resourceURI: z.string(),
          comics: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          series: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          stories: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                type: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          events: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(z.unknown()),
            returned: z.number(),
          } ),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
        } ),
        z.object( {
          id: z.number(),
          name: z.string(),
          description: z.string(),
          modified: z.string(),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          resourceURI: z.string(),
          comics: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(z.unknown()),
            returned: z.number(),
          } ),
          series: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(z.unknown()),
            returned: z.number(),
          } ),
          stories: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(z.unknown()),
            returned: z.number(),
          } ),
          events: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(z.unknown()),
            returned: z.number(),
          } ),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
        } ),
      ]),
    ),
  } ),
} );

export type ResponseJson = z.infer<typeof responseJsonSchema>;
