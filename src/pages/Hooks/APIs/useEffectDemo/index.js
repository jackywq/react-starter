import React, { useState, useEffect } from 'react';

function UseEffectDemo() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount(x => x + 1);
    }, 1000);
  }, [Math.min(count, 4)]);

  return (
    <div>
      <h3 style={{ marginTop: 40 }}>useEffect测试：</h3>
      <p>当前最新的count值：{count}</p>
    </div>
  );
}

export default UseEffectDemo;
