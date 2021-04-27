import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Child extends Component {
  static propTypes = {
    parentNum: PropTypes.number.isRequired,
  };

  state = {
    num: 1,
  };

  componentDidMount() {
    // setState传入一个对象时，由于父组件传下来parentNum也是经过setState的，所以 this.props 和 this.state 都可能是异步更新, 不会放到状态队列里，无法取到最终的值
    // 参考: https://www.jianshu.com/p/a883552c67de

    // this.setState({ num: this.state.num + this.props.parentNum });

    // setState传入一个函数时，会放到一个状态队列里面，不会异步更新，然后按照函数的顺序依次调用
    // 参考： https://blog.csdn.net/sysuzhyupeng/article/details/63250741
    this.setState((prevState, props) => {
      return {
        num: prevState.num + props.parentNum,
      };
    });
  }

  render() {
    const { num } = this.state;

    return (
      <div>
        子组件num:<span>{num}</span>
      </div>
    );
  }
}
