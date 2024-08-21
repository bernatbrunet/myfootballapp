module.exports = [
    {
      ignores: ["node_modules/**"],
    },
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "warn",
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
      },
    },
  ];