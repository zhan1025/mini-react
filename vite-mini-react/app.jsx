// js pragma

/** */
// `@jsx` MyReact.createElement 
import React from "./core/React.js";
// const App = React.createElement('div',{id:'app'},'helloword');
let count = 1
let showBar = false
// function Counter({num}){
//     const foo = <div>foo</div>
//     const bar = <p>bar</p>
//     function add(){
//         count++
//         React.update()
//     }
//     function change(){
//         showBar = !showBar
//         React.update()
//     }
//     return <div>counter{num}
//     <button onClick={add}>+1</button>
//     {count}
//     <div>{showBar?bar:foo}</div>
//     <button onClick={change}>showBar</button>
//     </div>
// }
// function Counter(){
//     const foo = (
//         <div>
//             foo
//             <div>child</div>
//         </div>
//     );
//     const bar = <div>bar</div>;
// function handleShowBar(){
//     showBar = !showBar;
//     React.update();
// }
// return (
//     <div>
//         Counter{showBar&&bar}
//         <button onClick={handleShowBar}>showBar</button>
//         {/* <div>{showBar?bar:foo}</div> */}
        
//     </div>
// )
// }
// const App = (<div>
//                 <h1>mini react</h1>hello world 123
//                 <Counter num={123}></Counter>
//                 {/* <Counter num={345}></Counter> */}
//             </div>)
// function App() {
//     return <div>123</div>
// }
// console.log(App)
let barCount = 1
let fooCount = 2
function Bar() {
    function handleBar(){
        barCount++;
        React.update()
    }
    return (
        <div>
            <h1>Bar {barCount}</h1>
            <button onClick={handleBar}>count +1</button>
        </div>
    )
}
function Foo() {
    function handleFoo(){
        fooCount++;
        React.update()
    }
    return (
        <div>
            <h1>Foo {fooCount}</h1>
            <button onClick={handleFoo}>count +1</button>
        </div>
    )
}
let rootCount = 1;
function App() {
    function handleRoot(){
        rootCount++
        React.update()
    }
    return (
        <div>
            hello world  mini react
            <button onClick={handleRoot}>rootCount +1</button>
        <p>rootCount:{rootCount}</p>
        <Foo></Foo>
        <Bar></Bar>
        </div>
    )
}
export default App