# Placeholdem

#### Placeholder Caret Animation

- **Version:** v1.0.2
- **Date:** 2015-02-08

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