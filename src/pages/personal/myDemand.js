import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import { ScrollView } from 'react-native-gesture-handler';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import DemandList from '../../components/bussiness/DemandList';
import { pxToDp } from '../../utils/pxToDp';

class all extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
        </ScrollView>
      </View>
    )
  }
}
class wait extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
        </ScrollView>
      </View>
    )
  }
}
class already extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
        </ScrollView>
      </View>
    )
  }
}
class done extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
          <DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03"></DemandList>
        </ScrollView>
      </View>
    )
  }
}
export class detail extends Component {
  state = {
    pages: [
      {
        key: '全部',
        title: '全部',
        component: all,
      },
      {
        key: '待接取',
        title: '待接取',
        component: wait,
      },
      {
        key: '已选定',
        title: '已选定',
        component: already,
      },
      {
        key: '已完结',
        title: '已完结',
        component: done,
      }
    ],
  }
  MyTabs = () => {
    const widthPhone = Dimensions.get('window').width
    let { pages } = this.state;
    return (
      <TopTabNavigator
        ifScrollEnabled={true}
        type={1}
        itemWidth={widthPhone / 4}
        routes={pages}
      />
    );
  }
  render() {
    const width = Dimensions.get('window').width;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <TopTitle
          title="我的需求"
          showBtn={false}
          returnBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{ flex: 1 }}>
          {this.MyTabs()}
          {/* <TopTabNavigator
            itemWidth={width / 4}
            ifScrollEnabled={false}
            type={1}
            name={['全部', '带接取', '已选定', '已完结']}
          >
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
          </TopTabNavigator> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default detail;
