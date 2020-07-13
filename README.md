# Scripts

### Project build
`yarn build`

### Project development

`yarn start`

### Lint JS/CSS

`yarn lint`

# Styleguide

### SVG

On project available svg sprite. All icons from `assets/images/icons/sprite-...` folders automatically include to inline HTML sprite via js. Example usage:
```html
<svg>
    <use xlink:href="#<ICON-NAME>"/>
</svg>
```

`sprite-complex` contain complex icons without elements formatting. Can be changed only size.

`spite-simple` contain "one color" icons where elements are not intersect, can be changed color and size.


> In case when including sprite will be changed and you will need a static file, look for comments in `webpack.config.js`. And remove script from `src/js/main.js`

Rules when icon should be added in sprite:
* reusable
* single color without no shadows

By default there is a few groups:
* UI - for interface interactions
* Social - social networks icons
* Other - do not included to the sprite, since do not satisfied the rules

### HTML / CSS
[Use BEM methodology](https://en.bem.info/methodology/).

Use `src/styles/readme.md` for explanation of files structure in css.

### JS
Babel included so you are free to use ES6 syntax.
Also use import\export for destructure main file.
