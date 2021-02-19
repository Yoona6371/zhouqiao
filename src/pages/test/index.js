import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import RefreshableScrollView from '../../components/common/PullToRefresh/refreshableScrollView.android';

const data = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

export default function App() {
  const [refreshing, setrefreshing] = useState(false);
  const [dataList, setDataList] = useState([]);

  const onRefreshing = () => {
    setrefreshing(true);
    setDataList(data);
    setTimeout(() => {
      setrefreshing(false);
    }, 3000);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemWrap}>
        <Text>{item}</Text>
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    return `$item_${index}`;
  };

  useEffect(() => {
    onRefreshing();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataList}
        renderItem={renderItem}
        renderScrollComponent={(props) => {
          return (
            <RefreshableScrollView
              {...props}
              onRefresh={onRefreshing}
              refreshing={refreshing}
            />
          );
        }}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrap: {
    borderColor: '#000000',
  },
});
