// js pragma

/** */
// `@jsx` MyReact.createElement 
import React from "./core/React.js";
// const App = React.createElement('div',{id:'app'},'helloword');
function Counter({num}){
    return <div>counter{num}</div>
}
const App = (<div>hello world 123
                <Counter num={123}></Counter>
                <Counter num={345}></Counter>
            </div>)
// function App() {
//     return <div>123</div>
// }
// console.log(App)
export default App