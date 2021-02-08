import React, { PureComponent } from 'react';
import { View, InteractionManager } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import HomeTabCase from '../home/HomeTabCase';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import BlankPage from '../../utils/blankPage';
import { deviceWidthDp } from '../../utils/pxToDp';

class CommodityList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true, //交互管理器延时控制标识
      pages: [
        {
          key: '全部',
          title: '全部',
          component: HomeTabCase,
        },
        {
          key: 'Ps',
          title: 'Ps',
          component: HomeTabCase,
        },
        {
          key: 'AI',
          title: 'AI',
          component: HomeTabCase,
        },
        {
          key: 'CAD',
          title: 'CAD',
          component: HomeTabCase,
        },
        {
          key: 'UI设计',
          title: 'UI设计',
          component: HomeTabCase,
        },
        {
          key: '工业设计',
          title: '工业设计',
          component: HomeTabCase,
        },
      ],
      caseData: [],
    };
  }

  componentDidMount() {
    //转场动画完成之后改变标记值，重新渲染dom
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false });
    });
  }

  _render() {
    //首先渲染空视图
    const { renderPlaceholderOnly, pages } = this.state;
    if (renderPlaceholderOnly) {
      return <BlankPage />;
    } else {
      return (
        <TopTabNavigator
          ifScrollEnabled={true}
          type={3}
          itemWidth={deviceWidthDp / 5}
          routes={pages}
        />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopTitle title="设计案例" showBtn={false} />
        {this._render()}
      </View>
    );
  }
}

export default CommodityList;
