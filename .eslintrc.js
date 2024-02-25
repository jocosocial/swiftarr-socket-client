// The Odyssey that it took to arrive at this file cost many browser tabs,
// a fuckton of swearing, a journey through Yarn, and finally ChatGPT to
// the rescue. What a pile...
module.exports = {
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module",
        "project": "./tsconfig.json"
      },
      "plugins": ["@typescript-eslint"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "rules": {
        "@typescript-eslint/semi": ["error", "always"], // Require semicolons for TypeScript files
        "@typescript-eslint/indent": ["error", 2] // Enforce two-space indentation for TypeScript files
      }
    }
  ],
  "rules": {
    "semi": ["error", "always"], // Require semicolons for JavaScript files
    "indent": ["error", 2] // Enforce two-space indentation for JavaScript files
  }
};
