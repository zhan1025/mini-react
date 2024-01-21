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
    console.log('bar')
    const update = React.update()
    function handleBar(){
        barCount++;
        update()
    }
    return (
        <div>
            <h1>Bar {barCount}</h1>
            <button onClick={handleBar}>count +1</button>
        </div>
    )
}
function Foo() {
    console.log('foo')
    // const update = React.update()
    const [count,setCount] = React.useState(10)
    const [str,setStr] = React.useState('c')
    function handleFoo(){
         setCount((c) => c+1)
        // update()
    }
    function handleStr(){
        setStr(`12text`)
        // update()
    }
    return (
        <div>
            <h1>Foo {count}</h1>
            <h1>Str {str}</h1>
            <button onClick={handleFoo}>count +1</button>
            <button onClick={handleStr}>str</button>
        </div>
    )
}
let rootCount = 1;
function App() {
    console.log('app')
    const update = React.update()
    function handleRoot(){
        rootCount++
        update()
    }
    return (
        <div>
            hello world  mini react rootCount:{rootCount}
            <button onClick={handleRoot}>rootCount +1</button>
        <Foo></Foo>
        {/* <Bar></Bar> */}
        </div>
    )
}
export default App