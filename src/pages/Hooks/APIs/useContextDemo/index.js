import React, { useContext } from 'react';
import { Button } from 'antd';

const themes = {
  light: {
    color: '#000000',
    background: '#eeeeee',
  },
  dark: {
    color: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = React.createContext(themes.light);

function UseContextDemo() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <h3 style={{ marginTop: 40 }}>useContext测试：</h3>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // 原先通过： 1. this.context 2. ThemeContext.Consumer 获取
  const theme = useContext(ThemeContext);
  return (
    <Button style={{ background: theme.background, color: theme.color }}>
      I am styled by theme context!
    </Button>
  );
}
export default UseContextDemo;
