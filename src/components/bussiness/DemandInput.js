import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { fontStyle } from '../../utils/StyleUtils';
import { pxToDp, deviceWidthDp } from '../../utils/pxToDp';
import Icon from '../common/Icon';
import Overlay from '../common/Overlay/Overlay';

// render() {
//   let input = '';
//   let hint = '(非必须)';
//   return (
//       <View style={{ flex: 1 }}>
//         <DemandInput
//             type={0}
//             title="类萨asdasdasdasd"
//             tips="请选择类别asdas"
//             input={input}
//             hint=""
//             inputUpdate={(data) => {
//               console.log(data);
//             }}
//         />
//       </View>
//   );
// }

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.input,
    };
  }
  // type
  // 0 数字
  // 1 选择类别
  // 2 上传附件
  // 3 其他（文字）
  static propTypes = {
    type: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    tips: PropTypes.string,
    input: PropTypes.string,
    hint: PropTypes.string,
  };
  setCategory = () => {
    let overlayView = (
      <Overlay.PullView side="bottom" modal={false}>
        <View
          style={{
            backgroundColor: '#fff',
            minWidth: 300,
            minHeight: 260,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  };
  render() {
    let { title, tips, type, hint } = this.props;
    let { input } = this.state;
    let input_category = '';
    return (
      <View style={styles.demand_title__wrap}>
        <Text style={styles.demand_title}>
          {title}
          <Text style={styles.demand_hint}>{hint}</Text>
        </Text>
        {type === 1 || type === 2 ? (
          <TouchableOpacity
            style={styles.demand_category}
            onPress={this.setCategory}
          >
            <TextInput
              disabled={true}
              placeholder={tips}
              onsubmitEditing={this.props.inputUpdate}
              editable={false}
              value={input_category}
              style={
                type === 1
                  ? {
                      width:
                        deviceWidthDp -
                        pxToDp(172) -
                        styles.demand_category.marginRight,
                    }
                  : { width: deviceWidthDp - pxToDp(186 + 182) }
              }
            />
            {type === 2 ? (
              <View style={styles.demand_file}>
                <Text style={styles.demand_file_text}>添加附件</Text>
                <Icon
                  name="add_file"
                  width={pxToDp(18)}
                  height={pxToDp(22)}
                  style={{
                    color: '#fe9e0e',
                    lineHeight: pxToDp(320 / 3),
                  }}
                />
              </View>
            ) : (
              <Icon
                name="drop_down"
                width={pxToDp(16)}
                height={pxToDp(9)}
                style={{
                  color: '#b2b2b2',
                  lineHeight: pxToDp(320 / 3),
                }}
              />
            )}
          </TouchableOpacity>
        ) : (
          <TextInput
            placeholder={tips}
            value={input}
            keyboardType={type === 0 ? 'number-pad' : 'default'}
            onChangeText={(e) => {
              this.setState({ input: e });
            }}
            onSubmitEditing={this.props.inputUpdate}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  demand_title__wrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '100%',
    height: pxToDp(320 / 3),
    borderBottomWidth: pxToDp(1),
    marginLeft: pxToDp(30),
    borderBottomColor: '#aaa',
  },
  demand_title: {
    ...fontStyle(28, 30, 30, '800', '#1c223a', 'left'),
    alignSelf: 'center',
    width: pxToDp(156),
  },
  demand_hint: {
    fontSize: pxToDp(24),
    color: '#6e7079',
  },
  demand_input: {
    // maxWidth: pxToDp(200),
  },
  demand_category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: pxToDp(66),
  },
  demand_file: {
    flexDirection: 'row',
  },
  demand_file_text: {
    alignSelf: 'center',
    marginRight: pxToDp(12),
  },
});

export default Index;
