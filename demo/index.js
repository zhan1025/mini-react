let task =1
function workLoop(deadLine){
    task+=1
    // dead line 有一个函数，用来表示当前闲置周期的预估剩余毫秒
    let sholdyield = false;
    while(!sholdyield){
        console.log(deadLine.timeRemaining(),'task',task);
        // 执行vdom解析渲染等工作
        if(deadLine.timeRemaining()<1){
            sholdyield = true;
        }
    }
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)
// requestIdleCallback 传入一个函数，函数 在浏览器空闲时调用
// 期望通过利用浏览器空闲时间来分割渲染进程，避免一次性渲染带来的卡顿