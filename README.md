# Frontend Exercise

This repo contains a TODO list MVC app that we use to do our frontend exercises. We created it with [create-vue](https://github.com/vuejs/create-vue).

# Development

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Exercise

Following is the sample exercise that we'll be working through. Don't worry if you can't complete the whole exercise. We're most interested in seeing your approach and workflow for solving problems.

## Users should be able to add and filter by tags.

### Background

Our Users have a lot of items in their TODO lists. This is creates a lot of noise and makes it difficult for them to figure out what they should tackle next. To workaround this, we want to allow them to add tags to each TODO that they can then filter by when they're deciding what to work on next.

### Story

As a User creating or editing a TODO,
When I type add a tag to a TODO,
Then I should be able to see and filter by that tag.
