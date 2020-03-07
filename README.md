### ABN Recipe

#### Global pre-requisites
- [Node.js](https://nodejs.org/en/) (v12.x or higher, preferably latest LTS)
- [Vue CLI](https://www.npmjs.com/package/@vue/cli) (v4.0.5 or higher)

#### Getting started
1. To run this app you will need to use this boiler plate [https://www.dropbox.com/s/4z004sx0xxui6dg/Applicant-Boilerplate-V1-master.rar?dl=0](https://www.dropbox.com/s/4z004sx0xxui6dg/Applicant-Boilerplate-V1-master.rar?dl=0) and follow the instructions via the README.md file.

2. Navigate to the repository's root directory and run the following commands:
```
npm install
npm run serve
```

- The application is now running at [http://localhost:8080](http://localhost:8080)

## Conclusions
I ended up spending a total of around 6 hours on this assignment.

After performing this assignment, I realized that the JS community is moving very fast toward TypeScript, yet traditional tools are still widely used. These tools are not well-adapted to use TypeScript. This can especially be felt when performing tests. Good examples are Mongoose and barebones Express which are very hard to interface with testing frameworks. Using TypeScript-era tooling makes testing a lot easier. Altough I'm no familiar with TypeScript I'm ready to learn and adopt it.


## Decisions

- **Project structure:** I tried to minimize over-engineering, but at the same time demonstrate the structure of a Vue.js application that is comfortable to built upon and scale. This resembles of the MVVM pattern. In case I would've built the API I would use the Controller/Service pattern and I would consider choosing a framework such as NestJS (based on Express) which makes this a lot easier to build/maintain and especially easier to test.

- **Logging:** The application features one log level. In a production-ready application I would include several levels of verbosity (environment-dependant) and possibly external logging services for alerts.

Although in a real application I would most likely create a middleware to simplify the API of logging errors, as this one can easily get over-bloated.

- **Run mode:** The application runs in development mode. In a production-ready application I would set up configurations for different environments, and utilise environment variables.

- **Testing:** Due to limited time, I did not cover the application with tests. However, it is something I'm willing to work on as well as learn and adopt.


### Demo images
![Stock list](image-login.png)
![Stock list](image-home.png)
![Stock list](image-home-2.png)
![Stock menu](image-menu.png)
![Stock reload](image-reload.png)
