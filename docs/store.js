pragma.globalify()
pragmaSpace.dev = true


function bench(cb, times=1) {
    let start = performance.now()
    for (let i=0; i<times; i++) cb()
    let time = (performance.now()-start)
    console.log(cb.name, "took", time/times, "ms", `\n[performed`, times, "times, took", time, "ms]")
    return time/times
}



class ReactTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return React.createElement(
            'div',
            null,
            'Seconds: ',
            this.state.seconds
        );
    }
}


const _yeet = () => _p()
                .as(yeetTemplate.element.cloneNode(true)) 

let timerElement = html`
<div>
    <span id='value'></span> <span>seconds</span>
</div>`

class Timer extends Pragma {
    init() {
        this.as(timerElement.clone())
            .createWire('seconds')
            .on('secondsChange', s => this.element.find("#value").html(s))
            .on('render', () => setInterval(() => this.tick(), 1000))
            .setSeconds(0)
    }

    tick() {
        this.seconds+=1
    }
}

let _timer = () => new Timer

// console.time('pragma way')
// _yeet()
//     .appendTo("#catalog")
// console.timeEnd('pragma way')

let times = 200

bench(function react(){
    ReactDOM.render(
    React.createElement(ReactTimer, null),
        document.getElementById('catalog'));
}, times)

bench(function pragma(){
    _timer()
        .renderTo("#catalog")
    //  .appendTo("#catalog")
}, times)

// bench(function unefficient(){
//     // _yeet()
//     yeetTemplate2().appendTo("#catalog")
//     //  .appendTo("#catalog")
// }, times)
// console.time('that way')
//     _timer()
//         .appendTo("#catalog")
// console.timeEnd('that way')

// html`
//     <div> test </div>
// `.appendTo('#catalog')
// .listenTo('click', () => {
//     util.redirectTo('https://www.google.com')
// })

