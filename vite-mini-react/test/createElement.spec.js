import React from "../core/React";

import {it,expect,describe,} from 'vitest';

describe("create element test", ()=>{
    it("should create vdom", ()=>{
        let el = React.createElement('div',{id:'app'},'test 03')
        // expect(el).toEqual({
        //     type: 'div',
        //     props: {
        //         id: 'app',
        //         children: [
        //             {
        //                 type: 'TEXT_ELEMENT',
        //                 props: {
        //                     nodeValue: 'test 03',
        //                     children: []
        //                 }
        //             }
        //         ]
        //     }
        // })
        expect(el).toMatchInlineSnapshot(`
          {
            "props": {
              "children": [
                {
                  "props": {
                    "children": [],
                    "nodeValue": "test 03",
                  },
                  "type": "TEXT_ELEMENT",
                },
              ],
              "id": "app",
            },
            "type": "div",
          }
        `);
        
    })
})