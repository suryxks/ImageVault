module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/warnings",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      1,
      {
        groups: [
          ["external", "builtin"],
          "internal",
          ["sibling", "parent"],
          "index",
        ],
        pathGroups: [
          { pattern: "components", group: "internal" },
          { pattern: "components/**", group: "internal" },
          { pattern: "constants/**", group: "internal" },
          { pattern: "common", group: "internal" },
          { pattern: "error/**", group: "internal" },
          { pattern: "hooks/**", group: "internal" },
          { pattern: "locale/**", group: "internal" },
          { pattern: "routes/**", group: "internal" },
          { pattern: "selectors", group: "internal" },
          { pattern: "store", group: "internal" },
          { pattern: "assets/**", group: "internal", position: "after" },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
