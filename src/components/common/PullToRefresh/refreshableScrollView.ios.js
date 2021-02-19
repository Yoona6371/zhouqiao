// import React from 'react';
// import {
//   Animated,
//   Easing,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
//
// const RefreshStatus = {
//   pullToRefresh: 0,
//   releaseToRefresh: 1,
//   refreshing: 2,
// };
// const PaginationStatus = {
//   firstLoad: 0,
//   waiting: 1,
//   allLoaded: 2,
// };
//
// export default class RefreshableScrollView extends ScrollView {
//   constructor(props) {
//     super(props);
//     this.state = {
//       arrowAngle: new Animated.Value(0),
//       refreshStatus: RefreshStatus.pullToRefresh,
//       refreshTitle: this.props.refreshableTitlePull,
//     };
//     this._offsetY = 0;
//     this._isRefreshing = false;
//     this._dragFlag = false;
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.refreshing !== this.props.refreshing) {
//       if (nextProps.refreshing) {
//         if (this._isRefreshing) {
//           return null;
//         }
//         const height = nextProps.refreshViewHeight;
//         this._isRefreshing = true;
//         this._scrollview &&
//           this._scrollview.scrollTo({ x: 0, y: -height, animated: true });
//         this.setState({
//           refreshStatus: RefreshStatus.refreshing,
//           refreshTitle: nextProps.refreshableTitleRefreshing,
//         });
//       } else {
//         if (!this._isRefreshing) {
//           return;
//         }
//         this._isRefreshing = false;
//         this._scrollview &&
//           this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
//         this.setState({
//           refreshStatus: RefreshStatus.pullToRefresh,
//           refreshTitle: nextProps.refreshableTitlePull,
//         });
//       }
//     }
//   }
//
//   onScroll = (event) => {
//     // console.log('onScroll()');
//     const { y } = event.nativeEvent.contentOffset;
//     this._offsetY = y;
//     if (this._dragFlag) {
//       if (!this._isRefreshing) {
//         const height = this.props.refreshViewHeight;
//         if (y <= -height) {
//           this.setState({
//             refreshStatus: RefreshStatus.releaseToRefresh,
//             refreshTitle: this.props.refreshableTitleRelease,
//           });
//         } else {
//           this.setState({
//             refreshStatus: RefreshStatus.pullToRefresh,
//             refreshTitle: this.props.refreshableTitlePull,
//           });
//         }
//       }
//     }
//     if (this.props.onScroll) {
//       this.props.onScroll(event);
//     }
//   };
//
//   onScrollBeginDrag = (event) => {
//     // console.log('onScrollBeginDrag()');
//     this._dragFlag = true;
//     this._offsetY = event.nativeEvent.contentOffset.y;
//     if (this.props.onScrollBeginDrag) {
//       this.props.onScrollBeginDrag(event);
//     }
//   };
//
//   onScrollEndDrag = (event) => {
//     // console.log('onScrollEndDrag()');
//     this._dragFlag = false;
//     const { y } = event.nativeEvent.contentOffset;
//     this._offsetY = y;
//     const height = this.props.refreshViewHeight;
//     if (!this._isRefreshing) {
//       if (this.state.refreshStatus === RefreshStatus.releaseToRefresh) {
//         this._isRefreshing = true;
//         this.setState({
//           refreshStatus: RefreshStatus.refreshing,
//           refreshTitle: this.props.refreshableTitleRefreshing,
//         });
//         this._scrollview.scrollTo({ x: 0, y: -height, animated: true });
//         this.props.onRefresh(() => {
//           this.onRefreshEnd();
//         });
//       }
//     } else if (y <= 0) {
//       this._scrollview.scrollTo({ x: 0, y: -height, animated: true });
//     }
//     if (this.props.onScrollEndDrag) {
//       this.props.onScrollEndDrag(event);
//     }
//   };
//
//   scrollTo = (option) => {
//     this._scrollview.scrollTo(option);
//   };
//
//   scrollToEnd = (option) => {
//     this._scrollview.scrollToEnd(option);
//   };
//
//   onRefreshEnd = () => {
//     // console.log('onRefreshEnd()');
//     if (this.state.refreshStatus === RefreshStatus.refreshing) {
//       this._isRefreshing = false;
//       this.setState({
//         refreshStatus: RefreshStatus.pullToRefresh,
//         refreshTitle: this.props.refreshableTitlePull,
//       });
//       this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
//     }
//   };
//
//   renderRefreshHeader() {
//     if (this.props.customRefreshView) {
//       return (
//         <View style={[defaultHeaderStyles.header, this.props.refreshViewStyle]}>
//           {this.props.customRefreshView(
//             this.state.refreshStatus,
//             this._offsetY,
//           )}
//         </View>
//       );
//     }
//
//     return (
//       <View style={[defaultHeaderStyles.header, this.props.refreshViewStyle]}>
//         <View style={defaultHeaderStyles.status}>
//           {this.renderSpinner()}
//           <Text style={defaultHeaderStyles.statusTitle}>
//             {this.state.refreshTitle}
//           </Text>
//         </View>
//       </View>
//     );
//   }
//
//   renderSpinner() {
//     if (this.state.refreshStatus === RefreshStatus.refreshing) {
//       this.state.arrowAngle.setValue(0);
//       Animated.loop(
//         Animated.timing(this.state.arrowAngle, {
//           toValue: 1,
//           duration: 500,
//           easing: Easing.linear,
//           useNativeDriver: true,
//           isInteraction: false,
//         }),
//       ).start();
//       return <Text>loading</Text>;
//     }
//     return null;
//   }
//
//   render() {
//     return (
//       <ScrollView
//         ref={(c) => (this._scrollview = c)}
//         {...this.props}
//         scrollEventThrottle={16}
//         onScroll={this.onScroll}
//         onScrollEndDrag={this.onScrollEndDrag}
//         onScrollBeginDrag={this.onScrollBeginDrag}
//         scrollToOverflowEnabled={true}
//         showsVerticalScrollIndicator={false}
//       >
//         {this.renderRefreshHeader()}
//         {this.props.children}
//       </ScrollView>
//     );
//   }
// }
//
// RefreshableScrollView.defaultProps = {
//   horizontal: false,
//   scrollEnabled: true,
//   header: null,
//   refreshable: true,
//   refreshableTitlePull: '下拉更新',
//   refreshableTitleRefreshing: '',
//   refreshableTitleRelease: '松开更新',
//   customRefreshView: null,
//   arrowImageStyle: undefined,
//   refreshViewStyle: undefined,
//   refreshViewHeight: 50,
//   insideOfUltimateListView: false,
// };
//
// const defaultHeaderStyles = StyleSheet.create({
//   header: {
//     position: 'absolute',
//     top: -50,
//     left: 0,
//     right: 0,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   status: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   arrow: {
//     width: 22,
//     height: 22,
//   },
//   statusTitle: {
//     fontSize: 11,
//     lineHeight: 16,
//   },
// });
