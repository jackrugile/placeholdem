# Placeholdem

[![Project Status: Inactive - The project has reached a stable, usable state but is no longer being actively developed; support/maintenance will be provided as time allows.](https://www.repostatus.org/badges/latest/inactive.svg)](https://www.repostatus.org/#inactive)

#### 2016-11-04 Update

This project is no longer being developed or maintained. The effect this plugin gives is visually appealing, but it's a bad practice in terms of usability and accessibility. On top of that, manipulating the values of different HTML5 input types directly has a lot of issues (text, email, number, search, etc.). I suggest using an alternative styling for labels and placeholders, such as [Floating Labels](https://css-tricks.com/float-labels-css/).

-----

#### Placeholder Caret Animation

- **Version:** v1.0.2
- **Date:** 2015-02-08

#### [View Demo](https://placeholdem.jackrugile.com)

Placeholdem is a JavaScript plugin that animates placeholder carets on inputs and textareas. The placeholder value will incrementally delete on focus, and restore on blur.

```html
<!-- add placeholder to input or textarea -->
<input name="fieldname" placeholder="Placeholder Value" />
```

```js
// run Placeholdem on all elements with placeholders
Placeholdem( document.querySelectorAll( '[placeholder]' ) );
```
