import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import RankCardTop3 from '../../components/bussiness/rankCard/rankCardTop3';
import RankCard from '../../components/bussiness/rankCard/rankCard';
import { pxToDp } from '../../utils/pxToDp';
export class index extends Component {
  state = {
    top3: [
      {
        champion_name: '新新',
        champion_hot: '9999',
        champion_photo:
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2346571852,1188167565&fm=26&gp=0.jpg',
      },
      {
        runner_up_name: '宝儿',
        runner_up_hot: '4563',
        runner_up_photo:
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2134570287,410543358&fm=26&gp=0.jpg',
      },
      {
        third_place_name: '臭臭',
        third_place_hot: '1344',
        third_place_photo:
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2756218779,3874031744&fm=26&gp=0.jpg',
      },
    ],
  };
  render() {
    const { top3 } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: 0, zIndex: 999 }}>
          <TopTitle title="设计师榜" showBtn={false} color="#FFF" bgColor="" />
        </View>
        <RankCardTop3
          onPressChampion={() => alert(1111)}
          onPressRunner_up={() => alert(222)}
          onPressThird_place={() => alert(333)}
          top3={top3}
        >
          {' '}
        </RankCardTop3>
        <ScrollView>
          <View style={{ paddingBottom: pxToDp(20) }}>
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default index;
