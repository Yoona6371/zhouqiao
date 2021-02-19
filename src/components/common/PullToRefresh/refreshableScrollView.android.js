import React, { Component } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { deviceWidthDp } from '../../../utils/pxToDp';

const { width, height } = deviceWidthDp;
const RefreshStatus = {
  pullToRefresh: 0,
  releaseToRefresh: 1,
  refreshing: 2,
};
const PaginationStatus = {
  firstLoad: 0,
  waiting: 1,
  allLoaded: 2,
};

export default class RefreshableScrollView extends ScrollView {
  constructor(props) {
    super(props);
    this.state = {
      arrowAngle: new Animated.Value(0),
      refreshStatus: RefreshStatus.pullToRefresh,
      refreshTitle: this.props.refreshableTitlePull,
    };
    this._offsetY = 0;
    this._isRefreshing = false;
    this._dragFlag = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshing !== this.props.refreshing) {
      if (nextProps.refreshing) {
        if (this._isRefreshing) {
          return;
        }
        this._isRefreshing = true;
        this._scrollview &&
          this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({
          refreshStatus: RefreshStatus.refreshing,
          refreshTitle: nextProps.refreshableTitleRefreshing,
        });
      } else {
        if (!this._isRefreshing) {
          return;
        }
        this._isRefreshing = false;
        this._scrollview &&
          this._scrollview.scrollTo({
            x: 0,
            y: nextProps.refreshViewHeight,
            animated: true,
          });
        this.setState({
          refreshStatus: RefreshStatus.pullToRefresh,
          refreshTitle: nextProps.refreshableTitlePull,
        });
      }
    }
  }

  onScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    const { refreshViewHeight } = this.props;
    if (y <= refreshViewHeight) {
      this._offsetY = y - refreshViewHeight;
    }
    if (this._dragFlag) {
      if (!this._isRefreshing) {
        if (y <= 10) {
          if (this.state.refreshStatus !== RefreshStatus.releaseToRefresh) {
            this.setState({
              refreshStatus: RefreshStatus.releaseToRefresh,
              refreshTitle: this.props.refreshableTitleRelease,
            });
          }
        } else if (this.state.refreshStatus !== RefreshStatus.pullToRefresh) {
          this.setState({
            refreshStatus: RefreshStatus.pullToRefresh,
            refreshTitle: this.props.refreshableTitlePull,
          });
        }
      }
    } else if (y <= refreshViewHeight) {
      setTimeout(
        () =>
          this._scrollview.scrollTo({
            x: 0,
            y: refreshViewHeight,
            animated: true,
          }),
        100,
      );
    }
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }
  };

  onScrollBeginDrag = (event) => {
    this._dragFlag = true;
    const { refreshViewHeight } = this.props;
    this._offsetY = event.nativeEvent.contentOffset.y - refreshViewHeight;
    if (this.props.onScrollBeginDrag) {
      this.props.onScrollBeginDrag(event);
    }
  };

  onScrollEndDrag = (event) => {
    this._dragFlag = false;
    const { y } = event.nativeEvent.contentOffset;
    const { refreshViewHeight } = this.props;
    this._offsetY = y - refreshViewHeight;
    if (!this._isRefreshing) {
      if (this.state.refreshStatus === RefreshStatus.releaseToRefresh) {
        this._isRefreshing = true;
        this.setState({
          refreshStatus: RefreshStatus.refreshing,
          refreshTitle: this.props.refreshableTitleRefreshing,
        });
        this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
        this.props.onRefresh(() => {
          this.onRefreshEnd();
        });
      } else if (y <= refreshViewHeight) {
        this._scrollview.scrollTo({
          x: 0,
          y: refreshViewHeight,
          animated: true,
        });
      }
    } else if (y <= refreshViewHeight) {
      this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
    }
    if (this.props.onScrollEndDrag) {
      this.props.onScrollEndDrag(event);
    }
  };

  scrollTo = (option) => {
    this._scrollview.scrollTo(option);
  };

  scrollToEnd = (option) => {
    this._scrollview.scrollToEnd(option);
  };

  onRefreshEnd = () => {
    if (this.state.refreshStatus === RefreshStatus.refreshing) {
      this._isRefreshing = false;
      setTimeout(() => {
        if (this._scrollview) {
          this._scrollview.scrollTo({
            x: 0,
            y: this.props.refreshViewHeight,
            animated: true,
          });
        }
        this.setState({
          refreshStatus: RefreshStatus.pullToRefresh,
          refreshTitle: this.props.refreshableTitlePull,
        });
      }, 1000);
    }
  };

  renderRefreshHeader() {
    if (this.props.customRefreshView) {
      return (
        <View style={[defaultHeaderStyles.header, this.props.refreshViewStyle]}>
          {this.props.customRefreshView(
            this.state.refreshStatus,
            this._offsetY,
          )}
        </View>
      );
    }

    return (
      <View
        style={[
          defaultHeaderStyles.header,
          this.props.refreshViewStyle,
          { height: this.props.refreshViewHeight },
        ]}
      >
        <View style={defaultHeaderStyles.status}>
          {this.renderSpinner()}
          <Text style={defaultHeaderStyles.statusTitle}>
            {this.state.refreshTitle}
          </Text>
        </View>
      </View>
    );
  }

  renderSpinner() {
    if (this.state.refreshStatus === RefreshStatus.refreshing) {
      this.state.arrowAngle.setValue(0);
      Animated.loop(
        Animated.timing(this.state.arrowAngle, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
          isInteraction: false,
        }),
      ).start();
      return <Text>loading</Text>;
    }
    return null;
  }

  render() {
    return (
      <ScrollView
        ref={(c) => (this._scrollview = c)}
        {...this.props}
        scrollEventThrottle={16}
        onScroll={this.onScroll}
        contentContainerStyle={{ minHeight: height + 50 }}
        onScrollEndDrag={this.onScrollEndDrag}
        onScrollBeginDrag={this.onScrollBeginDrag}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
      >
        {this.renderRefreshHeader()}
        {this.props.children}
      </ScrollView>
    );
  }
}

RefreshableScrollView.defaultProps = {
  horizontal: false,
  scrollEnabled: true,
  header: null,
  refreshable: true,
  refreshableTitlePull: '下拉更新',
  refreshableTitleRefreshing: '',
  refreshableTitleRelease: '松开更新',
  customRefreshView: null,
  arrowImageStyle: undefined,
  refreshViewStyle: undefined,
  refreshViewHeight: 50,
  insideOfUltimateListView: false,
};

const defaultHeaderStyles = StyleSheet.create({
  header: {
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 22,
    height: 22,
  },
  statusTitle: {
    fontSize: 11,
    lineHeight: 16,
  },
});
