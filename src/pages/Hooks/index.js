import React, { useState } from 'react';
import { Button } from 'antd';
import UseRefDemo from './APIs/useRefDemo';
import UseEffectDemo from './APIs/useEffectDemo';
import UseContextDemo from './APIs/useContextDemo';
import UseCallbackDemo from './APIs/useCallbackDemo';
import styles from './index.module.less';

const Hooks = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.hooks}>
      <p>当前最新count值为{count}</p>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        增加
      </Button>
      <UseRefDemo />
      <UseEffectDemo />
      <UseContextDemo />
      <UseCallbackDemo />
    </div>
  );
};

export default Hooks;
