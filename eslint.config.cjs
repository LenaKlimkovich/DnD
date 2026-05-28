module.exports = {
  files: ["**/*.js"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      window: "readonly",
      document: "readonly",
      console: "readonly",
      btoa: "readonly"
    }
  },
  rules: {
    semi: "error",
    quotes: ["error", "double"],
    "no-unused-vars": "warn",
    "no-undef": "error"
  }
};
