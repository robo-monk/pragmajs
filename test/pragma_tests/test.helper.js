// function createMock(tag, text, width, height, top=0, left=0) {
//   const div = document.createElement(tag);
//   div.textContent = text
//   Object.assign(div.style, {
//     width: width + "px",
//     height: height + "px",
//   });
//   // we have to mock this for jsdom.
//   div.getBoundingClientRect = () => ({
//     width,
//     height,
//     top: top,
//     left: left,
//     right: left+width,
//     bottom: top+height
//   });
//   div.offset = () => {
//     return div.getBoundingClientRect()
//   }
//   div.text = () => {
//     return text
//   }
//   div.width = () => {
//     return div.width
//   }
//   div.height = () => {
//     return div.height
//   }
//   return div;
// }

// function mockWordNest(master, wpl = 4){
//   const height = 20
//   let index = 0
//   let line = 0
//   let top = () => { return height*Math.floor(index/wpl) + height/2 }
//   let left = () => { return index%wpl }
//   let width = (child) => { return child.text().length*2 }
//   for (let child of master.children){
//     child.element = createMock("w", child.text(), width(child), height, top(), left())
//     index+=1
//   }
// }


// export { mockWordNest, createMock }