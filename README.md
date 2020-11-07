# Next.js Recipe Book 🍜

## Introduction

The goal is to allow people share their recipes with everyone and save your favourites. Also, users can write comments about the published recipes.

## Technologies

This project is created with [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [styled components library](https://styled-components.com/) to manage styles.

Recipes data, images and users authentication are managed with Firebase.

The application is deployed on Netlify using [@netlify/plugin-nextjs](https://github.com/netlify/netlify-plugin-nextjs#installation-and-configuration) plugin for resolving a problem with next routing on website reload.

## Getting Started

First, fork and clone this repository. Then, run `bash npm install` to install all dependencies, when it will finish, run `bash npm run dev` to start the development server locally.

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

```bash
├── components
│ ├── Layout
│ ├── Theme
│ └── UI
├── constants
├── firebase
├── hooks
├── out
├── pages
│ └── recipes
|   ├── \[id].js
│ ├── \_app.js
│ └── \create-account.js
│ └── \index.js
│ └── \login.js
│ └── \new-recipe.js
│ └── \popular.js
│ └── \search.js
├── public
└── validation
```
