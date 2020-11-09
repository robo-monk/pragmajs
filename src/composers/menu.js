export let other = (mark) => { return { 
  key: "settings",
  elements: [
  {
    key: "settings",
    type: "button",
    icon: "settings",
    elements: [
      {
        key: "color",
        value: 1,
        type: "choice",
        element_template: (key, index) => {
          return {
            key: key,
            value: index,
            icon: `<div style='width:25px;height:25px;border-radius:25px;background:${key}'></div>`,
            click: () => { mark.color = index }
          }
        },
        choices: mark.colors
      }
    ]
  },
  {
    key: "wpm",
    value: 250,
    type: "value_verbose",
    min: 10,
    max: 4000,
    step: 10
  }]
  }
}