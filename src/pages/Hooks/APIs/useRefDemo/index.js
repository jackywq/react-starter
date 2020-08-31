import React, { useRef } from 'react';
import { Button, Input } from 'antd';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <h3 style={{ marginTop: 40 }}>useRef测试：</h3>
      <Input ref={inputEl} type="text" style={{ width: '200px' }} />
      <Button type="primary" onClick={onButtonClick}>
        Focus the input
      </Button>
    </>
  );
}

export default TextInputWithFocusButton;
