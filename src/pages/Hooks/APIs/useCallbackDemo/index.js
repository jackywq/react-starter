// import React, { useState, useEffect, useCallback } from 'react';

// // 用于记录 getData 调用次数
// let count = 0;

// export default function Parent() {
//   const [val, setVal] = useState('');

//   /**
//     * 不使用useCallback
//     * 1. getData执行时，调用setVal, 导致Parent重新渲染
//     * 2. Parent重新渲染后，生成新的getData方法传给Child
//     * 3. Child发现getData的引用变了，又会执行getData
//     * 1 --> 3,就会产生一个死循环
//   */
//   // const getData = () => {
//   //   setTimeout(() => {
//   //     count++;
//   //     setVal(`new data ${count}`);
//   //   }, 500);
//   // }

//   /**
//    * 使用useCallback, 设为[]后，只执行一次
//    *
//   */
//   const getData = useCallback(() => {
//     setTimeout(() => {
//       count++;
//       setVal(`new data ${count}`);
//     }, 500);
//   }, [])

//   return (
//     <div>
//       <h3 style={{ marginTop: 40 }}>useCallBack测试：</h3>
//       <Child val={val} getData={getData} />
//     </div>
//   );
// }

// function Child({ val, getData }) {
//   useEffect(() => {
//     getData();
//   }, [getData]);

//   return <div>{val}</div>;
// }

import React, { useState, memo, useCallback } from 'react';
import { Input } from 'antd';

/* eslint-disable */
const Child = memo((props) => {
  console.log(props);

  return (
    <div>
      <Input style={{ width: 200 }} type="text" onChange={props.onChange} />
    </div>
  )
})

const Parent = () => {
  const [text, setText] = useState('')

  // 使用useCallback不会触发子组件渲染，减少不必要的更新
  const handleOnChange = useCallback((e) => {
    setText(e.target.value)
  },[])

  return (
    <div>
      <h3 style={{ marginTop: 40 }}>useCallBack测试：</h3>
      <div>text: {text}</div>
      <p />
      <Child onChange={handleOnChange} />
    </div>
  )
}

export default Parent
