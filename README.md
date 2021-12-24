# Scripts

### Project build

`npm run build`

### Project development

`npm run start`

### Lint JS/CSS

`npm run lint`

# Styleguide

### SVG

On project available svg sprite. All icons from `assets/images/icons/sprite` folder will automatically include to HTML via js. Example usage:
```html
<svg>
    <use xlink:href="#<ICON-NAME>"/>
</svg>
```

`spite` contain "one color" icons where elements are not intersect, can be changed color and size. Use for simple one color icons.

> In case when you need a static file, look for comments in `For static sprite file` in `webpack.config.js`. And remove script from `src/js/main.js`

### HTML / CSS
[Use BEM methodology](https://en.bem.info/methodology/).

Use `src/styles/readme.md` for explanation of files structure in css.

### JS
Babel included so you are free to use ES6 syntax.
Also use import\export for destructure main file.
