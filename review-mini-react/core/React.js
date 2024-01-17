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
// 创建dom
function createDom(type){
    return type === 'TEXT_NODE'?document.createTextNode(''):document.createElement(type);
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
// 渲染函数
function render(el,container){
    // 接收需要渲染的元素数据和根节点
    // 创建元素
    const dom = createDom(el.type)
    // 处理props
    Object.keys(el.props).map(prop => {
        if(prop !=='children'){
            dom[prop] = el['props'][prop]
        }
    })
    // 处理children
    const children = el.props.children
    children.map(child => {
        render(child,dom)
    })
    // 处理完后插入容器
    container.append(dom)
}

const React = {
    render,
    createElement
}
export default React