import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId:string) => {
    return useTypedSelector((state: any) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id: string | number) => data[id]);
    
        const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
          var show = (value) => {
            if(typeof value === 'object') {
              if(value.$$typeof && value.props) {
                 _ReactDOM.render(value, document.querySelector('#root'))
              }
              else document.querySelector('#root').innerHTML = JSON.stringify(value);
            }
            else document.querySelector('#root').innerHTML = value;
          };
        `;
        const showFuncNoop = "var show = () => {}";
        const cumulativeCode = [];
        for (let c of orderedCells) {
          if (c.type === "code") {
            if (c.id === cellId) {
              cumulativeCode.push(showFunc);
            } else {
              cumulativeCode.push(showFuncNoop);
            }
            cumulativeCode.push(c.content);
          }
          if (c.id === cellId) {
            break;
          }
        }
        return cumulativeCode;
      }).join('\n');
};