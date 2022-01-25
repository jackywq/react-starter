/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useLayoutEffect, useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  /*
   * 1. 在useEffect的情况下，不断点击触发更新，偶尔会显示0
   * 2. 在useLayoutEffect的情况下，会阻塞页面渲染，不断点击触发更新，不会偶现0
   * 参考：https://juejin.cn/post/7041703907982049294
   */
  useLayoutEffect(() => {
    if (count === 0) {
      const randomNum = Math.random() * 100; // 随机生成一个数字

      const now = performance.now();

      while (performance.now() - now < 100) {
        console.log('blocking...');
      }

      setCount(randomNum); // 重新设置状态，设置成随机数
    }
  }, [count]);

  return <div onClick={() => setCount(0)}>{count}</div>;
}
