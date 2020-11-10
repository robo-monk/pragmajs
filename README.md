# pragma.js
dead simple powerful fast ui composer in javascript

# Installation
```bash
npm i pragmajs
```
```html
cdn coming soon
```

# Set Up & basic concepts

`hello world`
```Javascript
import PragmaComposer from "pragmajs"
let nice = 69
let pragmaMap = {
  key: "settings",
  icon: "icons/settings",
  type: "composer",
  elements: [{
      key: "Nice",
      value: nice,
      type: "value_choose"
    }]
  }
new PragmaComposer(pragmaMap)
```

A `pragmaMap` is a fancy dictionary that contains the structure of the dom page, and connects "phsycial" elements with objects behind the screen.

`pragmaMap idea`

Each `pragmaMap` is a map for creating 1 html element. When passing a `pragmaMap` to a `PragmaComposer`, the `PragmaComposer` generates, and appends the mapped element to the dom. A `pragmaMap` object contains the following attributes. You can specify these attributes, to generate different type of UI components.

### Pragma Map Templates

To create an element with an icon, that when you hover over it a popup appears with some elements in it.

```js
let someValue = 420
let someChoices = ["green", "blue", "orange"]
let pragma Map = {
  key: "settings", // name and id of the object
  icon: "icons/settings", // from the default icons that pragma.js contains, grab the setttings one
  
  elements: [ // elements is an array of pragmaMaps. 
	// The html elements that these pragmaMaps generate will be appended to the upper object #recursion🎸
    {
      key: "someElement",
      type: "value_choice",
      min: 1,
      max: 10,
      step: 1,
      value: someValue
    },
    {
      key: "someChoices",
      value: colorIndex
      type: "choice",
      element_template: (key, index) => {
        return {
          key: key,
          value: index,
          icon: `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>`,
          click: (value) => { colorIndex = value }
        }
      },
      choices: someChoices
    }
  ],
  
  type: "showonhover" // show the elements when hovered, in a nice popup
 ```
