// import React, { useState, useMemo } from 'react';
// import { Button, Input } from 'antd';

/* useMemo单独使用 */
// export default function UseMemoHookds() {
//   const [count, setCount] = useState(1);
//   const [val, setValue] = useState('');

//   // 当依赖项发生改变时，useMemo内部的函数才会被执行，返回被缓存的值
//   // 当input发生改变时，useMemo内部的函数不会被执行
//   // useMemo可以接收多个依赖项
//   const getCount = useMemo(() => {
//     console.log(11111111);
//     return count;
//   }, [count]);

//   return (
//     <div>
//       <h4>当前count：{getCount}</h4>
//       <div style={{ display: 'flex' }}>
//         {/* eslint-disable-next-line react/button-has-type */}
//         <Button type="primary" onClick={() => setCount(count + 1)}>Add</Button>
//         <Input value={val} onChange={event => setValue(event.target.value)} />
//       </div>
//     </div>
//   );
// }

// 参考： https://www.jianshu.com/p/b71e56ea2fda
/* useCallback & useMemo综合使用 */
import React, { useState, useCallback } from 'react';
import { Button, Input } from 'antd';

export default function UseCallbackHooks() {
  const [count, setCount] = useState(1);
  const [val, setValue] = useState('');

  const getCount = useCallback(() => {
    console.log(11111111);
    return count;
  }, [count]);

  return (
    <div>
      <Child getCount={getCount} />
      <div style={{ display: 'flex' }}>
        <Button type="primary" onClick={() => setCount(count + 1)}>
          Add
        </Button>
        <Input value={val} onChange={event => setValue(event.target.value)} />
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const Child = React.memo(({ getCount }) => {
  // 仅当count发生改变时，Child才会被渲染；而val变化时，Child组件是不会重新渲染的
  console.log(22222222);
  return <h4>当前count: {getCount()}</h4>;
});
