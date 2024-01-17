// js pragma

/** */
// `@jsx` MyReact.createElement 
import React from "./core/React.js";
// const App = React.createElement('div',{id:'app'},'helloword');
let count = 1
function Counter({num}){
    function add(){
        count++
        React.update()
    }
    return <div>counter{num}
    <button onClick={add}>+1</button>
    {count}
    </div>
}
const App = (<div>
                <h1>mini react</h1>hello world 123
                <Counter num={123}></Counter>
                test
                {/* <Counter num={345}></Counter> */}
            </div>)
// function App() {
//     return <div>123</div>
// }
// console.log(App)
export default App