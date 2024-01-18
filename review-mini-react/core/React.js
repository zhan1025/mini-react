// vdom 创建
function createTextNode(text){
    return {
        type: 'TEXT_NODE',
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

function createElement(type,props,...children){
    return {
        type,
        props: {
            ...props,
            children: children.map(el => typeof el === 'string'||typeof el === 'number'?createTextNode(el):el)
        }
    }
}
// 创建dom
function createDom(type){
    return type === 'TEXT_NODE'?document.createTextNode(''):document.createElement(type);
}
// 更新，处理dom props
function updateDomProps(dom,props){
    Object.keys(props).map(prop => {
        if(prop !=='children'){
            dom[prop] = props[prop]
        }
    })
}
let root = null;
let nextFiber = null;
// 渲染函数
function render(el,container){
    // 接收需要渲染的元素数据和根节点
    // let node = typeof el === 'function'?el():el
    nextFiber = {
        type: el.type,
        props:{
            children: [el],
        },
        dom: container
    }
}

function initChildren(children,fiber){
    let prevChild = null
    children.map((child,i) =>{
        const newFiber = {
            type: child.type,
            props: child.props,
            parent: fiber,
            child: null,
            sibling: null,
            dom: null
        }
        if(i===0){
            fiber.child = newFiber
        }else{
            // 上一个节点的兄弟
            prevChild.sibling = newFiber
        }
        prevChild = newFiber
    })
}
// 使用requestIdleCallBack实现任务调度
// 任务调度需要将dom树转成链表方便调度
function runUnitOfwork(fiber) {
    // 当数据结构中不存在dom时，需要创建dom
    // 函数组件判断，对每一个fiber做判断格式化
    let isFunctionComponent = typeof fiber.type === 'function'
    // 非函数组件直接进入dom格式化生成
    if(!isFunctionComponent){
        if(!fiber.dom){
            const dom = fiber.dom = createDom(fiber.type);
            // 处理props
            updateDomProps(dom,fiber.props)
            let fiberParent = fiber.parent
            while(!fiberParent.dom){
                fiberParent = fiberParent.parent
            }
            fiberParent.dom.append(dom)
        }
    }
    
    // 一边创建dom一边处理链表
    // 处理children
    isFunctionComponent?console.log(fiber.type(fiber.props)):''
    let children = isFunctionComponent?[fiber.type(fiber.props)]:fiber.props.children
    // 链表转换,深度优先
    initChildren(children,fiber)
    if(isFunctionComponent){
       console.log( fiber )
    }
    // 返回下一个fiber
    if(fiber.child){
        return fiber.child
    }
    // 一直向上取parent sibling直至根
    let next = fiber
    while(next){
        if(next.sibling)return next.sibling
        next = next.parent
    }
}
function workLoop(idleDeadline){
    // 是否等待下一个空闲 idle 时间
    let shouldYield = false
    // 在空闲时间内一直工作
    while(!shouldYield&&nextFiber){
        nextFiber = runUnitOfwork(nextFiber);
        shouldYield = idleDeadline.timeRemaining()<1;
    }
    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
const React = {
    render,
    createElement
}
export default React