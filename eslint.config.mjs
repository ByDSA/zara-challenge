import commonConfig from "./lib/eslint/eslint.config.mjs";

const barrels = [
  "**/*modules/{envs,utils}",
  "**/*modules/icons/*",
  "**/*modules/search/Search",
  "**/*modules/characters/{listing,model,cache,Resume,fetching}",
  "**/*modules/comics/{model,listing,fetching,cache}",
];
const nextBarrels = [
  "next/{image,navigation}",
];
const projectConfig = [
  {
    files: ["src/{modules,app}/**/*.ts{,x}", "jest.config.ts"],
    rules: {
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "**/*modules/**/contexts/**/*",
            ...barrels,
            ...nextBarrels,
          ],
        },
      ],
    },
  },
  {
    files: ["**/page.tsx"],
    rules: {
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "**/_layout/*",
            ...barrels,
            ...nextBarrels,
          ],
        },
      ],
    },
  },
  {
    files: ["**/icons/*.ts{x,}"], // Barrels: icons
    rules: {
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "**/*modules/icons/**/**",
          ],
        },
      ],
    },
  },
];
const nextjsConfig = [{
  files: ["src/app/**/{page,layout}.tsx", "next.config.mjs", "jest.config.*", "playwright.config.ts"],
  rules: {
    "import/no-default-export": "off",
    "import/prefer-default-export": "error",
  },
},
];
const ret = [
  ...commonConfig,
  ...nextjsConfig,
  ...projectConfig,
];

export default ret;
