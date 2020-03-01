import React, { PureComponent } from 'react';

interface AsyncBoundaryProps<T = unknown> {
  /**
   * 表示异步状态是否在加载中
   */
  loading?: boolean;
  /**
   * 表示异步状态失败的错误
   */
  error?: Error;
  /**
   * 表示异步状态成功时的数据
   */
  data: T;
  /**
   * 表示异步状态时展示的组件样式，默认为 `false`
   */
  inline?: boolean;
  /**
   * 表示是否需要忽略 `data` 有值时（比如刷新数据）的默认 loading 渲染，默认为 `false`
   */
  ignoreContentfulLoading?: boolean;
  /**
   * 表示加载状态时延迟显示加载效果的时间（防止闪烁）
   */
  loadingDelay: number | undefined;
  /**
   * 表示 loading 状态的渲染方法
   */
  onLoading: (loadingProps: {
    inline: boolean;
    delay: number;
  }) => React.ReactChild;
  /**
   * 表示 error 状态的渲染方法
   */
  onError: (
    error: Error,
    errorInfo: React.ErrorInfo | null,
    errorProps: { inline?: boolean }
  ) => React.ReactChild;
  /**
   * 表示数据获取成功时，渲染组件的 `renderProps`
   */
  children(data: NonNullable<T>, options: { loading: boolean }): any;
}

interface AsyncBoundaryState {
  reactError?: { error: Error; errorInfo: React.ErrorInfo } | null;
}

const DEFAULT_ON_LOADING: AsyncBoundaryProps['onLoading'] = ({
  delay,
  inline
}) => {
  return 'Loading';
};

const DEFAULT_ON_ERROR: AsyncBoundaryProps['onError'] = (
  error,
  errorInfo,
  { inline }
) => {
  return <div />;
};

/**
 * 处理异步状态（loading, error）的组件。使用示例：
 *
 * ```
 * <AsyncBoundary loading={loading} error={error} data={data}>
 *   {data => (
 *      <View />
 *   )}
 * </AsyncBoundary>
 * ```
 */
export class AsyncBoundary<T = unknown> extends PureComponent<
  AsyncBoundaryProps<T>,
  AsyncBoundaryState
> {
  static defaultProps = {
    loading: false,
    error: undefined,
    data: null,
    inline: false,
    ignoreContentfulLoading: false,
    loadingDelay: 300,
    onLoading: DEFAULT_ON_LOADING,
    onError: DEFAULT_ON_ERROR
  };

  state: AsyncBoundaryState = {
    reactError: null
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ reactError: { error, errorInfo } });
  }

  render() {
    const {
      children,
      loading,
      error,
      data,
      inline,
      loadingDelay,
      ignoreContentfulLoading,
      onLoading,
      onError
    } = this.props;
    const { reactError } = this.state;

    if (reactError != null) {
      return onError(reactError.error, reactError.errorInfo, { inline });
    }

    if (ignoreContentfulLoading ? data == null && loading : loading) {
      return onLoading({
        delay: loadingDelay,
        inline
      });
    }

    if (error) {
      return onError(error, null, { inline });
    }

    if (data == null) {
      return null;
    }

    return children(data as NonNullable<T>, { loading: false });
  }
}
