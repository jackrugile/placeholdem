# Placeholdem

#### Placeholder Caret Animation

- **Version:** v0.0.3
- **Date:** 2014-02-10

#### [View Demo](http://placeholdem.jackrugile.com)

Placeholdem is a JavaScript plugin that animates placeholder carets on inputs and textareas. The placeholder value will incrementally delete on focus, and restore on blur.

```html
// Input or Textarea
<input name="fieldname" placeholder="Placeholder Value" />
```

```js
// Initialize
var fields = document.querySelectorAll( '[placeholder]' ),
    placeholdem = new Placeholdem( fields );
```