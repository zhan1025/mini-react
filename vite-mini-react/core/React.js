
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
    nextFiber = {
        type: el.type,
        props: {children:[el]},
        dom: container
    }
    console.log(nextFiber)
    root = nextFiber
}
function createDom(type){
    return  type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(type)
}
function dealWithDomProps(dom,props){
    Object.keys(props).map(key =>{
        if(key !== 'children'){
            // 属性赋值
            dom[key] = props[key]
        }
    })
}
function transDataType(fiber,children){
    let prevChild = null;
    children.map((child,i)=>{
        // 链表结构单元
        const newFiber = {
            type: child.type,
            props: child.props,
            dom: null,
            parent: fiber,
            child: null,
            sibling: null
        }
        if(i===0){
            // 子节点中的第一位
            fiber.child = newFiber 
        }else{
            // 属于上一个子节点兄弟节点
            prevChild.sibling = newFiber 
        }
        prevChild = newFiber
    })
}

let root = null;
let nextFiber= null;

function commitRoot(){
    commitWork(root.child)
    root = null
}
function commitWork(fiber){
    if(!fiber)return;
    // 提交遍历完的dom树
    // 向父级插入当前dom
    let fiberParent = fiber.parent
    if(!fiberParent.dom){
        fiberParent = fiberParent.parent
    }
    if(fiber.dom){
        fiberParent.dom.append(fiber.dom)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}
function runUnitWork(fiber){
    // 1.创建元素,有且只在不存在dom时
    let isFuncComponent = typeof fiber.type === 'function'
    if(!isFuncComponent){
        if(!fiber.dom){
            const dom = (fiber.dom = createDom(fiber.type))
            // 处理props
            dealWithDomProps(dom,fiber.props)
            //渲染，插入父容器
            // fiber.parent.dom.appendChild(dom)
        }
    }
    if(isFuncComponent){console.log(fiber.type())}
    // 2. 数据类型转换，记录父子兄弟指针
    let children = isFuncComponent?[fiber.type()]:fiber.props.children
    transDataType(fiber,children)
    // 3. 返回下一个任务
    // 深度优先
    if(fiber.child){
        return fiber.child;
    }
    if(fiber.sibling){
        return fiber.sibling;
    }
     return fiber.parent?.sibling;
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
const React = {
    render: myRender,
    createElement
}
export default React