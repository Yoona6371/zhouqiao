import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { fontStyle, padding } from '../../utils/StyleUtils';
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
      ungent: false,
    };
  }
  // type
  // 0 数字
  // 1 选择类别
  // 2 上传附件
  // 3 其他（文字）
  // 4 按钮
  // 5 容器
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
    let { title, tips, type, hint, last } = this.props;
    let { input, ungent } = this.state;
    let input_category = '';
    return (
      <View
        style={
          last
            ? styles.demand_title__wrap
            : {
                ...styles.demand_title__wrap,
                ...styles.demand_title__wrap_line,
              }
        }
      >
        <Text style={styles.demand_title}>
          {title}
          <Text style={styles.demand_hint}>{hint}</Text>
        </Text>
        {type === 4 ? (
          <View style={styles.demand_button}>
            <TouchableOpacity
              style={{ alignSelf: 'center', marginRight: pxToDp(28) }}
              onPress={() => {
                this.setState({ ungent: true });
              }}
            >
              <Text
                style={ungent ? styles.button_checked : styles.button_unchecked}
              >
                加急
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => {
                this.setState({ ungent: false });
              }}
            >
              <Text
                style={ungent ? styles.button_unchecked : styles.button_checked}
              >
                普通
              </Text>
            </TouchableOpacity>
          </View>
        ) : type === 1 || type === 2 ? (
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
                        pxToDp(232) -
                        styles.demand_category.marginRight,
                    }
                  : { width: deviceWidthDp - pxToDp(186 + 182 + 60) }
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
    height: pxToDp(320 / 3),
    marginLeft: pxToDp(30),
  },
  demand_title__wrap_line: {
    borderBottomWidth: pxToDp(1),
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
  demand_button: {
    flexDirection: 'row',
  },
  button_checked: {
    width: pxToDp(81),
    backgroundColor: '#fffaf3',
    ...padding(15, 9, 15, 9),
    textAlign: 'center',
    borderWidth: pxToDp(2),
    borderColor: '#fe9e0e',
    borderRadius: pxToDp(6),
    ...fontStyle(24, 42, 26, 'bold', '#fe9e0e'),
  },
  button_unchecked: {
    width: pxToDp(80),
    backgroundColor: '#f0f0f0',
    ...padding(15, 9, 15, 9),
    textAlign: 'center',
    borderWidth: pxToDp(2),
    borderColor: '#f0f0f0',
    borderRadius: pxToDp(6),
    ...fontStyle(24, 42, 26, 'bold', '#999'),
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
