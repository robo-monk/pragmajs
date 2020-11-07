class Lector {
  constructor(target){
    this.target = $(target)
    this.turnRed()
  }
  turnRed(){
    this.target.css({"background":"red"})
  }
}


module.exports = Lector;