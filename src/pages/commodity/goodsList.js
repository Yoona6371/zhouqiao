import React, { PureComponent } from 'react';
import { View, ScrollView, InteractionManager } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import HomeTabShop from '../home/HomeTabShop';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import BlankPage from '../../utils/blankPage';
import { deviceWidthDp } from '../../utils/pxToDp';

class GoodsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true, //交互管理器延时控制标识
      pages: [
        {
          key: '全部',
          title: '全部',
          component: HomeTabShop,
        },
        {
          key: 'Ps',
          title: 'Ps',
          component: HomeTabShop,
        },
        {
          key: 'AI',
          title: 'AI',
          component: HomeTabShop,
        },
        {
          key: 'CAD',
          title: 'CAD',
          component: HomeTabShop,
        },
        {
          key: 'UI设计',
          title: 'UI设计',
          component: HomeTabShop,
        },
        {
          key: '工业设计',
          title: '工业设计',
          component: HomeTabShop,
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
        <TopTitle title="周边产品" showBtn={false} />
        <HomeTabShop />
      </View>
    );
  }
}

export default GoodsList;
