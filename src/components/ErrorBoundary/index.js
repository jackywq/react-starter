import React, { PureComponent, Fragment } from 'react';
import { notification } from 'antd';

const BoundaryHOC = WrappedComponent => {
  return class ErrorBoundary extends PureComponent {
    state = { hasError: false };

    static getDerivedStateFromError() {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }

    componentDidCatch() {
      this.setState({ hasError: true });
      const className = WrappedComponent.toString().match(
        /function\s*([^(]*)\(/
      )[1];
      const description = (
        <Fragment>
          <strong>&lt;{className}&gt; </strong>
          组件发生未知错误，请进行代码检查
        </Fragment>
      );
      notification.error({
        duration: null,
        message: '组件异常',
        description,
      });
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      return this.state.hasError ? (
        <div>组件异常时,你可以在此处自定义降级后的 UI 并渲染</div>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};

export default BoundaryHOC;
