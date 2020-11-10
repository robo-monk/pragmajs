export const choiseTemplate = (attr={}) => {
  return  {
          key: attr.key,
          value: 1,
          type: "choice",
          element_template: (key, index) => {
            return {
              key: key,
              value: index,
              icon: `<div style='width:25px;height:25px;border-radius:25px;font-family:${key}'>Aa</div>`,
              click: () => { 
                
                font = key 
              }
            }
          },
          choices: fonts
        }
}