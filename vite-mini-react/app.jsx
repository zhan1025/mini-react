// js pragma

/** */
// `@jsx` MyReact.createElement 
import React from "./core/React.js";
// const App = React.createElement('div',{id:'app'},'helloword');
function Counter(){
    return <div>counter</div>
}
const App = (<div>hello world 123
                <Counter></Counter>
            </div>)
// function App() {
//     return <div>123</div>
// }
// console.log(App)
export default App