
function createTextNode(text){
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}
// jsx转换时会调用
function createElement(type, props, ...children){
    return {
        type,
        props: {
            ...props,
            children: children.map(el =>  {
                return typeof el === 'string'||typeof el === 'number'?createTextNode(el):el})
        }
    }
}
/**
 * 
 * @param {创建元素} el 
 * @param {容器元素} container 
 */
function myRender(el,container) {
    nextFiber = {
        type: el.type,
        props: {children:[el]},
        dom: container
    }
    root = nextFiber
}
function createDom(type){
    return  type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(type)
}
function dealWithDomProps(dom,newProps,oldProps){
/**
 * 1.
 */
    Object.keys(oldProps).map(key=>{
        if(key!=='children'){
            if(!(key in newProps)){
                dom.removeAttribute(key)
            }
        }
    })
    // 新有旧没有 旧有， 修改 增加
    Object.keys(newProps).map(key =>{
        if(key !== 'children'){
            if(newProps[key] !== oldProps[key]){
            if(key.startsWith('on')){
                let type = key.slice(2).toLowerCase()
                dom.removeEventListener(type,oldProps[key])
                dom.addEventListener(type,newProps[key])
            }else{
                // 属性赋值
                dom[key] = newProps[key]
            }
            }
            
            
        }
    })
}

let shouldDelete = []
function transDataType(fiber,children){
    let prevChild = null;
    let oldFiber = fiber.alternate?.child
    children.map((child,i)=>{   
        // 暂时考虑props更新
        let sameType = oldFiber&&oldFiber.type===child.type
        let newFiber = null;
        if(sameType){
            // 认为props更新
            newFiber = {
                type: child.type,
                props: child.props,
                dom: oldFiber.dom,
                parent: fiber,
                child: null,
                sibling: null,
                effecttag: 'update',
                alternate: oldFiber
            }
        }else{
            if(child){newFiber = {
                type: child.type,
                props: child.props,
                dom: null,
                parent: fiber,
                child: null,
                sibling: null,
                effecttag: 'placement'
            }}
            if(oldFiber){
                shouldDelete.push(oldFiber)
            }
        }
        if(oldFiber){
            oldFiber = oldFiber.sibling
        }
        if(i===0){
            // 子节点中的第一位
            fiber.child = newFiber 
        }else{
            // 属于上一个子节点兄弟节点
            prevChild.sibling = newFiber 
        }
        if(newFiber){
            prevChild = newFiber
        }
        
    })

    // 当新dom比旧dom少时，移除多余child
    while(oldFiber){
        shouldDelete.push(oldFiber)
        oldFiber = oldFiber.sibling
    }
}

let root = null;
let nextFiber = null;
let currentRoot = null;
let wipFiber = null;
function commitRoot(){
    shouldDelete.forEach(commitDeletion);
    commitWork(root.child)
    currentRoot = root
    shouldDelete = []
    root = null
}
function commitDeletion(fiber){
    if(fiber.dom){
        let fiberParent = fiber.parent
        while(!fiberParent.dom){
            fiberParent = fiberParent.parent
        }
        fiberParent.dom.removeChild(fiber.dom)
    }else{
    commitDeletion(fiber.child)
    }
}
function commitWork(fiber){
    if(!fiber)return;
    // 提交遍历完的dom树
    // 向父级插入当前dom
    let fiberParent = fiber.parent
    while(!fiberParent.dom){
        fiberParent = fiberParent.parent
    }
    if(fiber.effecttag === 'update'){
        dealWithDomProps(fiber.dom,fiber.props,fiber.alternate?.props)
    }
    else if(fiber.effecttag === 'placement'){
        if(fiber.dom){
            fiberParent.dom.append(fiber.dom)
        }
    }
    
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}


function updateFuncComponents(fiber) {
    wipFiber = fiber
    console.log(fiber)
    let children = [fiber.type(fiber.props)]
    transDataType(fiber,children)
}
function updateHostComponents(fiber) {
    if(!fiber.dom){
        const dom = (fiber.dom = createDom(fiber.type))
        // 处理props
        dealWithDomProps(dom,fiber.props,{})
    }
    let children = fiber.props.children
    transDataType(fiber,children)
}
function runUnitWork(fiber){
    // 1.创建元素,有且只在不存在dom时
    let isFuncComponent = typeof fiber.type === 'function'
    // if(isFuncComponent){console.log(fiber.type())}
    // 2. 数据类型转换，记录父子兄弟指针
    // function component 支持使用props变量 
        isFuncComponent?updateFuncComponents(fiber):updateHostComponents(fiber)
    // 3. 返回下一个任务
    // 深度优先
    if(fiber.child){
        return fiber.child;
    }
    if(fiber.sibling){
        return fiber.sibling;
    }
    let next = fiber
    while(next){
        if(next.sibling)return next.sibling
        next = next.parent
    }
     return next
}


function workLoop(deadLine){
    let sholdyield = false;
    while(!sholdyield&&nextFiber){
        nextFiber = runUnitWork(nextFiber);
        sholdyield = deadLine.timeRemaining()<1;
    }
    // 树完全生成后提交到根节点
    if(root&&!nextFiber){
        commitRoot()
    }
    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function update() {
    let currentFiber = wipFiber
    return () => {
    console.log(currentFiber)
        nextFiber = {
            ...currentFiber,
            alternate: currentRoot
        }
        root = nextFiber
    }
}
const React = {
    update,
    render: myRender,
    createElement
}
export default React