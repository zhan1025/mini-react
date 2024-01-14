
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
const React = {
    render: myRender,
    createElement
}
export default React