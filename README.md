# Placeholdem

#### Placeholder Caret Animation

- **Version:** v1.0.1
- **Date:** 2014-02-18

#### [View Demo](http://placeholdem.jackrugile.com)

Placeholdem is a JavaScript plugin that animates placeholder carets on inputs and textareas. The placeholder value will incrementally delete on focus, and restore on blur.

```html
<!-- add placeholder to input or textarea -->
<input name="fieldname" placeholder="Placeholder Value" />
```

```js
// run Placeholdem on all elements with placeholders
Placeholdem( document.querySelectorAll( '[placeholder]' ) );
```