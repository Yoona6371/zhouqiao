import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import RankCard from '../../components/bussiness/rankCard/rankCard';
import TopTitle from '../../components/common/TopTitle';
import RankCardTop3 from '../../components/bussiness/rankCard/rankCardTop3';
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  state = {
    top3: [
      {
        champion_name: '迪丽热巴么么哒',
        champion_hot: '9999',
        champion_photo:
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2346571852,1188167565&fm=26&gp=0.jpg',
      },
      {
        runner_up_name: '高浩杰',
        runner_up_hot: '4563',
        runner_up_photo:
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2134570287,410543358&fm=26&gp=0.jpg',
      },
      {
        third_place_name: '高浩杰',
        third_place_hot: '1344',
        third_place_photo:
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2756218779,3874031744&fm=26&gp=0.jpg',
      },
    ],
  };
  render() {
    const { top3 } = this.state;
    return (
      <View>
        <TopTitle
          returnBack={this.sss}
          onPress={this.hello}
          title="购物列表"
          showBtn={true}
        />
        <RankCard
          rankNumber="04"
          userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
          userName="小焦同学"
          hot="6669"
          onPress={() => alert('哎，关注我')}
        />{' '}
        */}
        <RankCardTop3
          onPressChampion={() => alert(1111)}
          onPressRunner_up={() => alert(222)}
          onPressThird_place={() => alert(333)}
          top3={top3}
        />
      </View>
    );
  }
}

export default Test;
