---
title: FAQ | TinyNG
---

# FAQ
## 1. How to fix the error "Can't bind to 'ngModel' since it isn't a known property of 'ti-xxxxx'"?

To use `ngModel`, you need to import `FormsModule`.

```typescript
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ...
    FormsModule,
    ...
  ],
})
```

## 2. How to fix the error "Can't bind to 'yyyyy' since it isn't a known property of 'ti-xxxxx'"?

Import the corresponding module of the component.

```
 If 'ti-xxxxx' is an Angular component and it has 'options' input, then verify that it is part of this module.
 If 'ti-xxxxx' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
 To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.
```

## 3. How to find the module name of the `TinyNG` component?

When looking at examples of specific components, the module on which the component depends will be displayed at the top of the page.

## 4. How to fix the error "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked"?

This is a prompt from the Angular debugging environment, indicating that Angular has finished rendering the templates, but the business code changes the template variables after `ngAfterViewInit()` or later.

Two solutions: 1. Optimize code organization and change template variables in advance. 2. After changing the template variables, force the template to refresh (refer to this article).

## 5. When using the `TinyNG` library for business development, how to debug it step by step?

The TinyNG library has built-in source maps, which is very convenient for debugging step by step. The method of debugging step by step:

At present, Angular CLI 7.0 version, `ng serve --vendor-source-map` (this parameter has been officially deprecated)

Angular CLI 7.2 version, `ng serve --source-map=true`

## 6. Why did I encounter an error when the code I wrote was exactly the same as that on the official website?

Please use `Angular CLI` to create a new project, copy the code from the official website, and check if the component behaves the same as that on the official website.

## 7. There is a scrollbar in part of the page, and the dropdown list inside it is misplaced when scrolling?

The dropdown box component registers the `tiScroll` event on the document. When this event is detected, the component will make the dropdown box disappear.

Developers need to trigger the `tiScroll` event on the document in the callback function of the corresponding scroll bar's scroll event to make the dropdown box disappear when dragging the local scrollbar.

```typescript
const event: Event = document.createEvent('HTMLEvents');
event.initEvent('tiScroll', false, true);
element.dispatchEvent(event);
```

## 8. How to fix the error "can't bind 'fromGroup'"?

To use the reactive form directive, you need to import `ReactiveFormsModule`, see [Reactive Forms](https://angular.io/guide/reactive-forms) for details.

```typescript
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
imports: [
...
ReactiveFormsModule,
...
],
```

## 9. Why aren't the style settings on the tags in HTML string fragments passed to some component interfaces effective?

In order to prevent XSS attacks, the component uses Angular's `DomSanitizer.sanitize` method for anti-XSS attack security processing, which will filter out the `style` setting, so it is recommended to use the `class` method to add styles. If you must use the `style` method and can ensure that the HTML string fragment passed in is safe, you can use the `bypassSecurityTrustHtml` method on the Angular-provided `DomSanitizer` to remove Angular's security filtering processing, which can be referenced from `message/message-security`.
