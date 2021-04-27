import React, { Component } from 'react';

import Child from './child';
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
  }

  render() {
    const { parentNum } = this.state;

    return (
      <div className={styles.setState}>
        <h3>setState同异步测试:</h3>
        <Child parentNum={parentNum} />
      </div>
    );
  }
}
