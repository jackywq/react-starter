import React, { Component } from 'react';
import { Form } from 'antd';
import MyContext from './context';
import Son from './son';

const FormItem = Form.Item;
class Parent extends Component {
  state = {
    theme: 'black',
  };

  render() {
    const { theme } = this.state;
    const divStyle = {
      width: 100,
      height: 100,
      background: theme,
    };
    return (
      <div>
        <MyContext.Provider
          value={{
            theme,
            toggleTheme: t => {
              this.setState({ theme: t });
            },
          }}
        >
          <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            label="父组件主题色"
          >
            <div style={divStyle} />
          </FormItem>
          <Son />
        </MyContext.Provider>
      </div>
    );
  }
}

export default Parent;
