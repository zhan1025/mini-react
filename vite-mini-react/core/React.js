
function createTextNode(text){
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}
function createElement(type, props, ...children){
    return {
        type,
        props: {
            ...props,
            children: children.map(el => typeof el === 'string'?createTextNode(el):el)
        }
    }
}
/**
 * 
 * @param {创建元素} el 
 * @param {容器元素} container 
 */
function myRender(el,container) {
    nextWork = {
        type: el.type,
        props: {children:[el]},
        dom: container
    }

}
function runUnitWork(work){
    // 1.创建元素,有且只在不存在dom时
    if(!work.dom){
        const dom = (work.dom = work.type === 'TEXT_ELEMENT' 
        ? document.createTextNode('')
        : document.createElement(work.type))

        // 处理props
        Object.keys(work.props).map(key =>{
            if(key !== 'children'){
                // 属性赋值
                dom[key] = work['props'][key]
            }
        })
        //渲染，插入父容器
    work.parent.dom.appendChild(dom)
    }
    
    // 2. 数据类型转换，记录父子兄弟指针
    let prevChild = null;
    work['props']['children'].map((child,i)=>{
        // 链表结构单元
        const newWork = {
            type: child.type,
            props: child.props,
            dom: null,
            parent: work,
            child: null,
            sibling: null
        }
        if(i===0){
            // 子节点中的第一位
            work.child = newWork 
        }else{
            // 属于上一个子节点兄弟节点
            prevChild.sibling = newWork 
        }
        prevChild = newWork
    })
    // 3. 返回下一个任务
    // 深度优先
    if(work.child){
        return work.child;
    }
    if(work.sibling){
        return work.sibling;
    }
    if(work.parent.sibling){
        return work.parent.sibling;
    }
}

let nextWork = null;

function workLoop(deadLine){
    let sholdyield = false;
    while(!sholdyield&&nextWork){
        nextWork = runUnitWork(nextWork);
        sholdyield = deadLine.timeRemaining()<1;
    }
    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
const React = {
    render: myRender,
    createElement
}
export default React