---
title: Theme configuration | TinyNG
---

# Theme configuration

TinyNG supports a certain degree of style customization to meet diverse visual needs in business and brands, including but not limited to main color, rounding, border, and partial component visual customization.

<img class="mb30 b-a" src="./images/theme.png" alt="theme" style="border-style:solid" />

## Use predefined themes

### Default theme

Modify the `styles` field of `angular.json`, fully import `"node_modules/@opentiny/ng/themes/styles.css"` and `"node_modules/@opentiny/ng/themes/theme-default.css"`.

```json
{
  ...
  "architect": {
    "build": {
      ...
      "styles": [
        "node_modules/@opentiny/ng/themes/styles.css",
        "node_modules/@opentiny/ng/themes/theme-default.css",
        "src/styles.css",
      ],
      ...
    }
  }
  ...
}
```

### Official themes

In addition to the default theme, we also provide 4 official themes, welcome to try it out and provide us feedback.

- theme-blue.css
- theme-green.css
- theme-purple.css
- theme-red.css

Modify the `styles` field of `angular.json`, fully import `"node_modules/@opentiny/ng/themes/styles.css"` and `"node_modules/@opentiny/ng/themes/theme-xxx.css"`.

```json
{
  ...
  "architect": {
    "build": {
      ...
      "styles": [
        "node_modules/@opentiny/ng/themes/styles.css",
        "node_modules/@opentiny/ng/themes/theme-xxx.css",
        "src/styles.css",
      ],
      ...
    }
  }
  ...
}
```

## Custom theme

If you need a custom theme, after importing the official theme file, customize the parameters that override the theme style variables according to actual needs. Add the `src/theme-my.css` file, modify the `styles` field of `angular.json`, and import `src/theme-my.css`.

```json
{
  ...
  "architect": {
    "build": {
      ...
      "styles": [
        "node_modules/@cloud/tiny3/themes/styles.css",
        "node_modules/@cloud/tiny3/themes/theme-default.css",
        "src/theme-my.css",
        "src/styles.css",
      ],
      ...
    }
  }
  ...
}
```

For example, in the following sample, by modifying the value of `--ti-base-color-brand`, the base color of the predefined default theme is modified to `#999999`.

```css
:root {
  --ti-base-color-brand: #999999;
  ...
  --ti-common-font-size-base: 16px;
  ...
  --ti-tag-text-color: #888888;
  --ti-tag-icon-color: var(--ti-base-color-icon-graybg-normal);
  ...
}
```

For variables related to themes, please see [basic-var.css](https://github.com/opentiny/ng/blob/main/%40opentiny/ng/themes/basic/basic-var.css).

In addition to manually modifying the variables involved in the theme, the theme can also be modified through the [theme configuration system](../../designtheme/home).

## Dynamically switch themes

### Step 1: Copy the `TinyNG` theme CSS file to `assets`

Modify the `assets` field of `angular.json`, refer to the following modification. `input` and `output` mean that when packaging, `"node_modules/@opentiny/ng/themes/"` is copied to `"/assets/tiny3/themes/"`.

```json
{
  ...
  "architect": {
    "build": {
      ...
      "assets": [
        "src/favicon.ico",
        "src/assets",
        {
          "glob": "**/*",
          "input": "node_modules/@opentiny/ng/themes/",
          "output": "/assets/tiny3/themes/"
        }
      ],
      ...
    }
  }
  ...
}
```

### Step 2: Add basic styles `"node_modules/@opentiny/ng/themes/styles.css"`

Modify the `styles` field of `angular.json`, import `"node_modules/@opentiny/ng/themes/styles.css"`.

```json
{
  ...
  "architect": {
    "build": {
      ...
      "styles": [
        "node_modules/@opentiny/ng/themes/styles.css",
        "src/styles.css",
      ],
      ...
    }
  }
  ...
}
```

### Step 3: Load theme CSS files

Modify the Angular project startup file `main.ts`, load the theme CSS file, and then start the `AppModule`.

```typescript
import { enableProdMode } from '@angular/core';
import { TiTheme } from '@opentiny/ng';

import { AppModule } from './app/AppModule';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment.production) {
  const themename: string = 'default';
  // Load the theme CSS file. Only production environment supports online skin switching,
  // so basic CSS configuration is in angular.json, and theme CSS is loaded in code and applied later.
  // The CSS file will be loaded from assets/tiny3/themes/theme-${theme}.css and put it in head link
  const link: HTMLLinkElement = TiTheme.loadCss(
    `assets/tiny3/themes/theme-${themename}.css`,
    'tiny3theme'
  );

  // Native support for CSSVars
  // In Chrome, the newly added CSS is too late to load, the CSS style takes effect late,
  // components with width calculation issues such as overflow have problems,
  // so wait until the CSS is loaded before starting the App
  link.addEventListener(
    'load',
    () => {
      TiTheme.bootstrapModule(AppModule);
    },
    false
  );
  link.addEventListener(
    'error',
    () => {
      TiTheme.bootstrapModule(AppModule);
    },
    false
  );
} else {
  TiTheme.bootstrapModule(AppModule);
}
```

### Step 4: Call code to switch themes, see [theme](../components/theme) example for details

```typescript
import { TiTheme } from '@opentiny/ng';

...
TiTheme.loadThemeCss('blue', 'tiny3theme');
...
```



## Dynamically change component styles on the web page

The JavaScript method of operating CSS variables is as follows: (Chrome, Firefox, and Safari support it natively)

> The compatibility patch for IE does not currently support JavaScript manipulation of CSS variables,
> but this capability may be supported in later versions.

```javascript
// Set variable
document.body.style.setProperty('--primary', '#7F583F');

// Read variable
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// Delete variable
document.body.style.removeProperty('--primary');
```
