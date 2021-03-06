import React from 'react';
import { Button, Form } from 'antd';
import GrandSon from './grandSon';
import MyContext from './context';

const FormItem = Form.Item;

export default class ChildTheme extends React.Component {
  handleClick = (theme, toggleTheme) => {
    const newTheme = theme === 'black' ? 'red' : 'black';
    toggleTheme(newTheme);
  };

  render() {
    return (
      <div>
        <MyContext.Consumer>
          {({ theme, toggleTheme }) => {
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
                  label="子组件主题色"
                >
                  <div style={childStyle} />
                  <Button
                    type="primary"
                    onClick={() => this.handleClick(theme, toggleTheme)}
                  >
                    切换主题
                  </Button>
                </FormItem>
              </div>
            );
          }}
        </MyContext.Consumer>
        <GrandSon />
      </div>
    );
  }
}
