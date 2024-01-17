import React from './React'
function createRoot(container) {
    return {
        render(dom){
            React.render(dom,container)
        }
    }
}
const ReactDom = { createRoot }
export default ReactDom