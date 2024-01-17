import React from "./core/React"
// const App = React.createElement('div',{id: 'app'}, 'review mini react')
// const App = (<div>适配jsx 语法<div>123</div></div>)
// const App = (<div>
//             实现任务调度，避免大数据量渲染卡顿
//                 <div>123</div>
//             </div>)
function Num({num}) {
    return (<h2>+{num}</h2>)
}
const App = (
        <div id="app" >
            <h1>支持function component</h1>
            <div>支持props绑定
                <Num num={123}></Num>
            </div>
            hello mini react
        </div>
    )

export default App