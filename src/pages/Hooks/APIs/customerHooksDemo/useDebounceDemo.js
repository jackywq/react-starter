import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
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

  return (
    <Input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      style={{ width: 200 }}
    />
  );
}

export default SearchInput;
