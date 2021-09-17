### Recipe App

Single‐page web application which allows users to manage their favorite recipes. Used a dashboard to show all available recipes and the actions to create, update and delete a recipe.

[![Netlify Status](https://api.netlify.com/api/v1/badges/de5051b6-244d-423c-b8fa-aa6323b83ff1/deploy-status)](https://app.netlify.com/sites/gracious-bhabha-1f6f7b/deploys)


#### Global pre-requisites
- [Node.js](https://nodejs.org/en/) (v14.x or higher, preferably latest LTS)
- [Vue CLI](https://www.npmjs.com/package/@vue/cli) (v4.0.5 or higher)

#### Getting started
Navigate to the repository's root directory and run the following commands:
```
npm install
npm run serve
```

- The application is now running at [http://localhost:8080](http://localhost:8080)

## Conclusions
This project at first was an assigment which I ended up spending a total of around 6 hours and later on become my own project 😄

After performing this assignment, I realized that the JS community is moving very fast toward TypeScript, yet traditional tools are still widely used. These tools are not well-adapted to use TypeScript. This can especially be felt when performing tests. Good examples are Mongoose and barebones Express which are very hard to interface with testing frameworks. Using TypeScript-era tooling makes testing a lot easier. Although I'm not familiar with TypeScript I'm ready to learn and adapt.


## Decisions

- **Project structure:** I tried to minimize over-engineering, but at the same time demonstrate the structure of a Vue.js application that is comfortable to build upon and scale. This resembles the MVVM pattern. In case I would've built the API I would use the Controller/Service pattern and I would consider choosing a framework such as NestJS (based on Express) which makes this a lot easier to build/maintain and especially easier to test.

- **Logging:** The application features one log level (using firebase).

- **UX/UI:** For the sake of simplicity, I used Vuetify (Material Design component framework for Vue.js).

- **Run mode:** The application runs in development mode. In a production-ready application, I would set up configurations for different environments, and utilize environment variables.

- **Testing:** Work in progress (Jest wil; be added)

### To-do
- [ ] Improve liking system.
- [x] Improve recipe list rendering time [in case there is a lot of recipes] result: will be using Vuetify deafult feature.
- [ ] Add unit testing (Jest).

### Demo images
![Stock list](image-login.png)
![Stock list](image-home.png)
![Stock list](image-home-2.png)
![Stock menu](image-menu.png)
![Stock reload](image-reload.png)
