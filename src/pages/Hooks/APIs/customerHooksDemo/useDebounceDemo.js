/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';

function useDebounce(value, wait) {
  // 注意：如果 value 是一个函数，useState(value) 会执行该函数并存入结果。
  // 为了把函数本身当做值来存，我们需要通过 () => value 的形式。
  const [debouncedValue, setDebouncedValue] = useState(() => value);

  useEffect(() => {
    // 设置定时器
    const timer = setTimeout(() => {
      // 同样，更新时如果 value 是函数，也需要包装一下，防止 React 执行它
      setDebouncedValue(() => value);
    }, wait);

    // 清理函数：如果 value 或 wait 在 wait 时间内再次改变，清除之前的定时器
    return () => {
      clearTimeout(timer);
    };
  }, [value, wait]);

  return debouncedValue;
}

function useDebounceFn(fn, wait = 500) {
  // ❌ 普通变量：每次组件渲染都会重置为 null
  let timerRef = null;

  const debouncedFn = useCallback(
    (...args) => {
      // 每次触发时，timerRef 都是新的 null，无法清除上一次的定时器
      if (timerRef) {
        clearTimeout(timerRef);
      }
      // 每次都创建新定时器，但旧定时器不会被清除
      timerRef = setTimeout(() => {
        fn(...args);
      }, wait);
    },
    [fn, wait]
  );

  useEffect(() => {
    return () => {
      // 组件卸载时，timerRef 已经是新的 null，无法清除定时器
      if (timerRef) {
        clearTimeout(timerRef);
      }
    };
  }, []);

  return debouncedFn;
}

// 使用示例（搜索框防抖）
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // 执行搜索逻辑
    // fetchData(debouncedSearchTerm);
    console.log('调用接口');
  }, [debouncedSearchTerm]);

  const debouncedFunc = useDebounceFn(() => {
    console.log('执行防抖后的逻辑');
  }, 1000);

  return (
    <>
      <p>
        <label>值防抖</label>
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
      </p>
      <p>
        <label>函数防抖</label>
        <Input onChange={debouncedFunc} style={{ width: 200 }} />
      </p>
    </>
  );
}

export default SearchInput;
