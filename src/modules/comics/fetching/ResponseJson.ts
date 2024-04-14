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
          digitalId: z.number(),
          title: z.string(),
          issueNumber: z.number(),
          variantDescription: z.string(),
          description: z.string(),
          modified: z.string(),
          isbn: z.string(),
          upc: z.string(),
          diamondCode: z.string(),
          ean: z.string(),
          issn: z.string(),
          format: z.string(),
          pageCount: z.number(),
          textObjects: z.array(
            z.object( {
              type: z.string(),
              language: z.string(),
              text: z.string(),
            } ),
          ),
          resourceURI: z.string(),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
          series: z.object( {
            resourceURI: z.string(),
            name: z.string(),
          } ),
          variants: z.array(z.unknown()),
          collections: z.array(z.unknown()),
          collectedIssues: z.array(z.unknown()),
          dates: z.array(z.object( {
            type: z.string(),
            date: z.string(),
          } )),
          prices: z.array(z.object( {
            type: z.string(),
            price: z.number(),
          } )),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          images: z.array(
            z.object( {
              path: z.string(),
              extension: z.string(),
            } ),
          ),
          creators: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                role: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          characters: z.object( {
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
        } ),
        z.object( {
          id: z.number(),
          digitalId: z.number(),
          title: z.string(),
          issueNumber: z.number(),
          variantDescription: z.string(),
          description: z.string(),
          modified: z.string(),
          isbn: z.string(),
          upc: z.string(),
          diamondCode: z.string(),
          ean: z.string(),
          issn: z.string(),
          format: z.string(),
          pageCount: z.number(),
          textObjects: z.array(
            z.object( {
              type: z.string(),
              language: z.string(),
              text: z.string(),
            } ),
          ),
          resourceURI: z.string(),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
          series: z.object( {
            resourceURI: z.string(),
            name: z.string(),
          } ),
          variants: z.array(
            z.object( {
              resourceURI: z.string(),
              name: z.string(),
            } ),
          ),
          collections: z.array(z.unknown()),
          collectedIssues: z.array(z.unknown()),
          dates: z.array(z.object( {
            type: z.string(),
            date: z.string(),
          } )),
          prices: z.array(z.object( {
            type: z.string(),
            price: z.number(),
          } )),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          images: z.array(
            z.object( {
              path: z.string(),
              extension: z.string(),
            } ),
          ),
          creators: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                role: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          characters: z.object( {
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
        } ),
        z.object( {
          id: z.number(),
          digitalId: z.number(),
          title: z.string(),
          issueNumber: z.number(),
          variantDescription: z.string(),
          description: z.string(),
          modified: z.string(),
          isbn: z.string(),
          upc: z.string(),
          diamondCode: z.string(),
          ean: z.string(),
          issn: z.string(),
          format: z.string(),
          pageCount: z.number(),
          textObjects: z.array(
            z.object( {
              type: z.string(),
              language: z.string(),
              text: z.string(),
            } ),
          ),
          resourceURI: z.string(),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
          series: z.object( {
            resourceURI: z.string(),
            name: z.string(),
          } ),
          variants: z.array(
            z.object( {
              resourceURI: z.string(),
              name: z.string(),
            } ),
          ),
          collections: z.array(z.unknown()),
          collectedIssues: z.array(z.unknown()),
          dates: z.array(z.object( {
            type: z.string(),
            date: z.string(),
          } )),
          prices: z.array(z.object( {
            type: z.string(),
            price: z.number(),
          } )),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          images: z.array(
            z.object( {
              path: z.string(),
              extension: z.string(),
            } ),
          ),
          creators: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                role: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          characters: z.object( {
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
        } ),
        z.object( {
          id: z.number(),
          digitalId: z.number(),
          title: z.string(),
          issueNumber: z.number(),
          variantDescription: z.string(),
          description: z.null(),
          modified: z.string(),
          isbn: z.string(),
          upc: z.string(),
          diamondCode: z.string(),
          ean: z.string(),
          issn: z.string(),
          format: z.string(),
          pageCount: z.number(),
          textObjects: z.array(z.unknown()),
          resourceURI: z.string(),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
          series: z.object( {
            resourceURI: z.string(),
            name: z.string(),
          } ),
          variants: z.array(
            z.object( {
              resourceURI: z.string(),
              name: z.string(),
            } ),
          ),
          collections: z.array(z.unknown()),
          collectedIssues: z.array(z.unknown()),
          dates: z.array(z.object( {
            type: z.string(),
            date: z.string(),
          } )),
          prices: z.array(z.object( {
            type: z.string(),
            price: z.number(),
          } )),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          images: z.array(
            z.object( {
              path: z.string(),
              extension: z.string(),
            } ),
          ),
          creators: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                role: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          characters: z.object( {
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
        } ),
        z.object( {
          id: z.number(),
          digitalId: z.number(),
          title: z.string(),
          issueNumber: z.number(),
          variantDescription: z.string(),
          description: z.null(),
          modified: z.string(),
          isbn: z.string(),
          upc: z.string(),
          diamondCode: z.string(),
          ean: z.string(),
          issn: z.string(),
          format: z.string(),
          pageCount: z.number(),
          textObjects: z.array(z.unknown()),
          resourceURI: z.string(),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
          series: z.object( {
            resourceURI: z.string(),
            name: z.string(),
          } ),
          variants: z.array(z.unknown()),
          collections: z.array(z.unknown()),
          collectedIssues: z.array(z.unknown()),
          dates: z.array(z.object( {
            type: z.string(),
            date: z.string(),
          } )),
          prices: z.array(z.object( {
            type: z.string(),
            price: z.number(),
          } )),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          images: z.array(
            z.object( {
              path: z.string(),
              extension: z.string(),
            } ),
          ),
          creators: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                role: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          characters: z.object( {
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
        } ),
        z.object( {
          id: z.number(),
          digitalId: z.number(),
          title: z.string(),
          issueNumber: z.number(),
          variantDescription: z.string(),
          description: z.string(),
          modified: z.string(),
          isbn: z.string(),
          upc: z.string(),
          diamondCode: z.string(),
          ean: z.string(),
          issn: z.string(),
          format: z.string(),
          pageCount: z.number(),
          textObjects: z.array(z.unknown()),
          resourceURI: z.string(),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
          series: z.object( {
            resourceURI: z.string(),
            name: z.string(),
          } ),
          variants: z.array(z.unknown()),
          collections: z.array(z.unknown()),
          collectedIssues: z.array(z.unknown()),
          dates: z.array(z.object( {
            type: z.string(),
            date: z.string(),
          } )),
          prices: z.array(z.object( {
            type: z.string(),
            price: z.number(),
          } )),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          images: z.array(z.unknown()),
          creators: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                role: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          characters: z.object( {
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
        } ),
        z.object( {
          id: z.number(),
          digitalId: z.number(),
          title: z.string(),
          issueNumber: z.number(),
          variantDescription: z.string(),
          description: z.string(),
          modified: z.string(),
          isbn: z.string(),
          upc: z.string(),
          diamondCode: z.string(),
          ean: z.string(),
          issn: z.string(),
          format: z.string(),
          pageCount: z.number(),
          textObjects: z.array(
            z.object( {
              type: z.string(),
              language: z.string(),
              text: z.string(),
            } ),
          ),
          resourceURI: z.string(),
          urls: z.array(z.object( {
            type: z.string(),
            url: z.string(),
          } )),
          series: z.object( {
            resourceURI: z.string(),
            name: z.string(),
          } ),
          variants: z.array(z.unknown()),
          collections: z.array(z.unknown()),
          collectedIssues: z.array(z.unknown()),
          dates: z.array(z.object( {
            type: z.string(),
            date: z.string(),
          } )),
          prices: z.array(z.object( {
            type: z.string(),
            price: z.number(),
          } )),
          thumbnail: z.object( {
            path: z.string(),
            extension: z.string(),
          } ),
          images: z.array(
            z.object( {
              path: z.string(),
              extension: z.string(),
            } ),
          ),
          creators: z.object( {
            available: z.number(),
            collectionURI: z.string(),
            items: z.array(
              z.object( {
                resourceURI: z.string(),
                name: z.string(),
                role: z.string(),
              } ),
            ),
            returned: z.number(),
          } ),
          characters: z.object( {
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
        } ),
      ]),
    ),
  } ),
} );

export type ResponseJson = z.infer<typeof responseJsonSchema>;
