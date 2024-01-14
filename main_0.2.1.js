// mini react
// v0.1
/***
 * 初步实现页面content渲染功能
 */
// const root = document.querySelector('#root')
// const dom = document.createElement('div')
// dom.id = 'app'
// const text = document.createTextNode('hello world')

// dom.appendChild(text)
// root.appendChild(dom)

/***
 * v0.2 vdom js object
 * 
 * 目标：动态生成vdom
 */

// const dom = document.createElement('div')
// dom.id = 'app'
// const text = document.createTextNode('hello world')
// dom.appendChild(text)

// vdom:  el type \ props \children
// const textEl = {
//     type: 'TEXT_ELEMENT',
//     props: {
//         nodeValue: 'hello word1',
//         children: []
//     }
// }
// const el = {
//     type: 'div',
//     props: {
//         id: 'app',
//         children: [
//             textEl
//         ]
//     }
// }
// 1.手动创建
// const dom = document.createElement(el.type)
// dom.id = el.props.id
// const textNode = document.createTextNode(textEl.props.nodeValue)
// // const textNode = document.createTextNode('')
// // textNode.nodeValue = textEl.props.nodeValue
// dom.appendChild(textNode)

// 2.动态创建 vdom

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
    // 创建元素
    const dom = el.type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(el.type)
    // 处理props
    Object.keys(el.props).map(key =>{
        if(key !== 'children'){
            // 属性赋值
            dom[key] = el['props'][key]
        }
    })
        // 处理children
        el['props']['children'].map(child =>{
            // 插入父节点
            myRender(child, dom)
        })
    container.appendChild(dom)
}

const root = document.querySelector('#root')
// root.appendChild(dom)

// const App = createElement('div',{id:'app'},createTextNode('test 01'))
// ?1 优化
const App = createElement('div',{id:'app'},'test 03')
// myRender(App,root)

const ReactDOM = {
    createRoot(container){
        return {
            render(el){
                myRender(el,container)
            }
        }
    }
}

ReactDOM.createRoot(root).render(App)