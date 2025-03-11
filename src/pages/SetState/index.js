import React, { Component } from 'react';
import { Button } from 'antd';
import ReactDOM from 'react-dom';

import styles from './index.module.less';

export default class SetState extends Component {
  state = {
    parentNum: 1,
  };

  componentDidMount() {
    this.setState(prevState => {
      return {
        parentNum: prevState.parentNum + 1,
      };
    });

    // eslint-disable-next-line react/no-find-dom-node
    const buttonDom = ReactDOM.findDOMNode(document.getElementById('button'));
    buttonDom.addEventListener('click', () => {
      this.setState(prevState => {
        return {
          parentNum: prevState.parentNum + 1,
        };
      });
      // eslint-disable-next-line react/destructuring-assignment
      console.log('this.state.parentNum :>> ', this.state.parentNum);
    });
  }

  render() {
    const { parentNum } = this.state;

    return (
      <div className={styles.setState}>
        <h3>setState同异步测试:</h3>
        <p>Num个数：{parentNum}</p>
        {/* <Child parentNum={parentNum} /> */}
        <Button
          onClick={() => {
            this.setState(prevState => {
              return {
                parentNum: prevState.parentNum + 1,
              };
            });
            // eslint-disable-next-line react/destructuring-assignment
            console.log('this.state.parentNum :>> ', this.state.parentNum);
          }}
        >
          触发合成事件按钮+1
        </Button>
        <br />
        <br />
        <Button id="button">触发原生事件按钮+1</Button>
      </div>
    );
  }
}
