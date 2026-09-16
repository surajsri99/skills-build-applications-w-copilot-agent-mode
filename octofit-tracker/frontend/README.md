# OctoFit Tracker frontend

The presentation tier is a React 19 and Vite application. It uses `react-router-dom` for resource navigation and reads the backend location from Vite environment variables.

## Environment

For a GitHub Codespaces backend, create `octofit-tracker/frontend/.env.local` with the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

`VITE_CODESPACE_NAME` must be defined when the frontend is running in Codespaces so requests use `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...`. When it is unset, the app safely falls back to `http://localhost:8000/api/...` for local development instead of constructing an `undefined` URL.

## Development

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
