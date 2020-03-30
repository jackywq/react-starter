import React from 'react';
import { Button, Form } from 'antd';
import MyContext from './context';

const FormItem = Form.Item;

export default class GrandSon extends React.Component {
  handleClick = (theme, toggleTheme) => {
    const newTheme = theme === 'black' ? 'red' : 'black';
    toggleTheme(newTheme);
  };

  static contextType = MyContext;

  render() {
    const { theme, toggleTheme } = this.context;

    const childStyle = {
      width: 100,
      height: 100,
      background: theme,
    };

    return (
      <div>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          label="孙子组件主题色"
        >
          <div style={childStyle} />
          <Button
            type="dashed"
            onClick={() => this.handleClick(theme, toggleTheme)}
          >
            切换主题
          </Button>
        </FormItem>
      </div>
    );
  }
}
