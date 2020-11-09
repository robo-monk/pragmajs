import Word from '../../src/pragmas/word.js'
import Mark from "../../src/pragmas/mark.js"
import { wfy } from "../../src/pragmas/helper.js"
import Lector from "../../src/pragmas/lector.js"
import $ from "jquery"

function createMock(tag, text, width, height, top=0, left=0) {
  const div = document.createElement(tag);
  div.textContent = text
  Object.assign(div.style, {
    width: width + "px",
    height: height + "px",
  });
  // we have to mock this for jsdom.
  div.getBoundingClientRect = () => ({
    width,
    height,
    top: top,
    left: left,
    right: left+width,
    bottom: top+height
  });

  div.offset = () => {
    return div.getBoundingClientRect()
  }

  div.text = () => {
    return text
  }
  return div;
}
describe("word class is working", () => {

  // beforeAll(()=>{ matchMediaPolyfill(window)
  //   window.resizeTo = function resizeTo(width, height) {
  //     Object.assign(this, {
  //       innerWidth: width,
  //       innerHeight: height,
  //       outerWidth: width,
  //       outerHeight: height,
  //     }).dispatchEvent(new this.Event('resize'))
  //   }
  // window.resizeTo(8, 30)
  // })

  test('word breaks down', () => {
    let element = $("<div> Im destined to live </div>")
    let masterWord = new Word(wfy(element), null, new Mark(element))
    expect(masterWord.virgin()).toBe(false)
  })

  test('word can exist as a singular entity', () => {
    let element = $("<w>Im</w>")
    let virg = new Word(element, null, new Mark(element))
    expect(virg.virgin()).toBe(true)
  })

  function mockWordNest(master, wpl = 4){
    const height = 20
    let index = 0
    let line = 0
    let top = () => { return height*Math.floor(index/wpl) + height/2 }
    let left = () => { return index%wpl }
    let width = (child) => { return child.text().length*2 }
    for (let child of master.children){
      child.element = createMock("w", child.text(), width(child), height, top(), left())
      index+=1
    }
  }

  let element;
  let master;
  function setup(){
    element = wfy($("<div>Now there's a look in your eyes, like 2 black holes in the sky</div>"))
    master = new Word(element, null, new Mark(element))
    mockWordNest(master)
  }
  test('word descends succesfully', () => {
    setup()
    expect(master.children[0].text()).toBe("Now")
    expect(master.children[3].text() == "look")
    expect(master.children[master.children.length-1].text()).toBe("sky")
  })

  describe("word is correctly connected with siblings", () => {
    beforeEach(() => {
      setup()
    })
    test('word next() is working', () => {
      expect(master.children[5].next()).toBe(master.children[6])
      expect(master.children[7].next()).toBe(master.children[8])
      expect(master.children[master.children.length-1].next()).toBe(undefined)
    })

    test('word pre() is working', () => {
      expect(master.children[5].pre()).toBe(master.children[4])
      expect(master.children[7].pre()).toBe(master.children[6])
      expect(master.children[0].pre()).toBe(undefined)
    })

    test('word sigbling(n) is working', () => {
      expect(master.children[5].sibling(8)).toBe(master.children[13])
      expect(master.children[7].sibling(-3)).toBe(master.children[4])
      expect(master.children[0].sibling(-9)).toBe(undefined)
    })
  })

  test('word nest generation mock is working', () => {
    expect(master.children[1].top()).toBe(10)
    expect(master.children[3].top()).toBe(10)
    expect(master.children[7].top()).not.toBe(10)
    expect(master.children[8].top()).not.toBe(10)
  })
  test('word same_line is working', () => {
    setup()
    expect(master.children[0].same_line(8)).toBe(false)
    expect(master.children[0].same_line(1)).toBe(true)
    // expect(master.children[7].sibling(-3)).toBe(master.children[4])
    // expect(master.children[0].sibling(-9)).toBe(undefined)
  })
})