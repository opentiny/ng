---
title: Join us | TinyNG
---
## Contribution Guide

### Issue Specification

- Issues are only used to submit Bugs or Features, as well as content related to user experience. Other content may be directly closed.

- Before submitting an issue, please search for related content first to see if it has already been raised.

- When providing the Bug, please specify clearly the version number of @opentiny/ng and related environment used.

### Pull Request Specification

- Please fork a copy to your own project and create a branch for changes.

  ```bash
  git checkout -b my-branch master
  ```

- Follow [commit rules](https://github.com/opentiny/ng/blob/main/commit.template) when writing commit message.

- Prior to submitting a PR, please perform a rebase to ensure that the commit record is clean.
  ```bash
  git rebase master -i
  git push -f
  ```

- If you are fixing a `bug` or `issue`, please describe it clearly in the PR.


### Development

```bash

# fork && git clone
...
# my-branch
npm install
npm start

```

## Unit Testing

### Overall Testing
```bash
$ npm test ng-demo
```
or
```bash
$ npx ng test ng-demo
```

### Specific Component Testing
```bash
$ npm test ${component name for test}-demo
```
or
```bash
$ npx ng test ${component name for test}-demo
```

For example:
```bash
$ npm test text-demo
```

### Adding Test Cases

- Because each component in the library has a separate version, developers need to prepare a unit test environment for newly added components. (An automated script can also be used to generate the required files for the new component, such as: `npm build:test radio`)
- For existing components, simply create a `${your component name}.spec.json` file in the component `demo/` directory and write test scripts.
- If the `${your component name}.spec.json` file already exists in the component demo directory, simply modify the case in this file.

TinyNG uses the [Jasmine testing framework](https://jasmine.github.io/) to perform unit testing on the component library content.
The `npm test` command builds the application in **watch mode** and starts the [karma test runner](https://karma-runner.github.io/).
After the run is complete, the console outputs the test results in the following format:

```
✔ Browser application bundle generation complete.
28 11 2022 08:40:17.804:WARN [karma]: No captured browser, open http://localhost:9876/
28 11 2022 08:40:17.824:INFO [karma-server]: Karma v6.3.20 server started at http://localhost:9876/
28 11 2022 08:40:17.825:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
28 11 2022 08:40:17.833:INFO [launcher]: Starting browser Chrome
28 11 2022 08:40:19.278:INFO [Chrome 107.0.0.0 (Windows 10)]: Connected on socket swhnqYi_RwdYbu8uAAAB with id 55443332
Chrome 107.0.0.0 (Windows 10): Executed 5 of 5 SUCCESS (0.562 secs / 0.815 secs)
TOTAL: 5 SUCCESS
```

It also opens the Chrome browser and displays the test output in the [Jasmine HTML Reporter](https://github.com/dfederm/karma-jasmine-html-reporter). You can click on a specific test case to rerun it, or click on a description row to rerun the tests selected in that test suite.

Unit testing cases and related configurations are located in the `/src/test/` directory.

For more detailed information, consult the [Angular testing introduction](https://angular.cn/guide/testing).

### Code Specification
Follow [ESLint](https://github.com/opentiny/ng/blob/main/.eslintrc.js)

## Recruiting Talents
### Web Front-end Development Engineer

#### Job Responsibilities

+ The team currently uses Angular and Vue as front-end frameworks and uses ES6/7 to do specific development work;

+ Front-end engineering, creating an end-to-end engineering system from project initialization, construction deployment, release to operation and maintenance, and creating front-end DevOps;

+ Visual building technology, based on less or no code building methods, improves the development efficiency of activity operations;

+ Targeting scenarios that focus on first-screen rendering and SEO, research and develop a Nodejs+Vue Isomorphic solution to achieve ultimate page performance for first screen rendering;

+ For Nodejs, independently research and develop front-end engineering system-related tools, use Nodejs more efficiently to implement web layer development, and use Nodejs for server-side development in high-concurrency business scenarios;

+ Based on Serverless solutions, solve Nodejs operation and maintenance issues and improve front-end development efficiency.


#### Skills required

+ Proficient in various front-end technologies, including HTML, CSS, JavaScript, etc.;

+ Have cross-terminal front-end development capabilities, proficient in at least one direction of Web (PC+Mobile), Nodejs, and Native App, and having multiple ones is better, and encourage exploration of the integration of Native and Web technologies;

+ Have a certain understanding of front-end engineering and modular development, and have practical experience (such as Webpack, Babel, AMD, CMD, etc.);

+ Possess excellent teamwork spirit, use own technical capabilities to improve the overall development efficiency of the team, and enhance team influence;

+ Have sustained enthusiasm for front-end technology, with a cheerful personality, strong logical thinking, and smooth communication skills;

+ Willing to share, good at summarizing and precipitating, and able to share good experiences within the team;

+ Optional: be familiar with at least one non-front-end language (such as Java, PHP, C, C++, Python, Ruby), and have practical experience.

### Java Backend Development Engineer

#### Job Responsibilities

+  Participate in the architecture design, detailed scheme design and development of core frameworks, and provide users with high-availability and high-performance console services;

+  Responsible for solution design and development in the field of cloud-native, realizing high traffic and high concurrency of cloud service business;

+  Responsible for the incubation, design, and development of public services and middleware, building industry-leading platform capabilities.

#### Skills required

+ Familiar with J2EE, Java Web programming technology, deeply apply and optimize various open-source frameworks such as Spring;

+ Familiar with Netty, familiar with multi-threaded model programming and network IO model;

+ Familiar with Spring Boot, Spring MVC, Redis, MySQL;

+ Have strong learning ability and technical sensitivity, a strong sense of responsibility and enterprising spirit, and enjoy learning and sharing technology.

If you are interested in joining, please add WeChat to consult: ly5353523.
