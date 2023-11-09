---
title: Getting Started | TinyNG
---

# Getting Started

`TinyNG` is a web UI component library based on Angular + TypeScript. This article will introduce how to use `TinyNG` components in a project.

> Before using the `TinyNG` component library, we recommend that you learn [HTML](https://www.w3schools.com/html/default.asp), [CSS](https://www.w3schools.com/css/default.asp), [TypeScript](https://www.typescriptlang.org/), and [Angular](https://angular.io/docs).

## First Local Instance

If you already have an Angular application project, please go directly to the [Installation](#installation) step.

If not, we strongly recommend using the official `@angular/cli` tool to create a project. It has outstanding contributions in building, developing, debugging, packaging, and deploying projects, and provides great help for developers.

#### Installing scaffolding tools

> If you want to learn more about the functionality and commands of the CLI toolchain, it is recommended to visit [@angular/cli](https://angular.io/cli) to learn more.

```bash
$ npm install -g @angular/cli
```

#### Creating a project

> Before creating a project, please make sure that `@angular/cli` has been successfully installed.

Create an Angular project named MYAPP in the current directory using `@angular/cli`, and automatically install the corresponding dependencies.

```bash
ng new MYAPP
```

## Installation and Use

#### Enter the project root directory and use npm to install `TinyNG`.

```bash
cd MYAPP
npm install @opentiny/ng @angular/cdk
```

#### Import the module

Before using a specific component, you need to import the corresponding module. Here, we will use the `Button` component as an example.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // some components depend on angular animations, so you may need to import the animations module
import { NgModule } from '@angular/core';
import { TiButtonModule } from '@opentiny/ng'; // import the module of a specific component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TiButtonModule // import this module
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Importing the Style File

In the `angular.json` file, import the `TinyNG` component library style files.

```json
{
  "build": {
    "styles": [
      "node_modules/@opentiny/ng/themes/styles.css", // basic style
      "node_modules/@opentiny/ng/themes/theme-default.css", // theme style
      "src/styles.css"
    ]
  }
}
```

The `TinyNG` component library has built-in 5 sets of themes, which are theme-default.css, theme-blue.css, theme-green.css, theme-purple.css, and theme-red.css. You can choose according to your business scenario, or select more style configuration methods in [Theme Configuration](./themedoc).

## Starting Development Debugging

```bash
ng serve --open
```
