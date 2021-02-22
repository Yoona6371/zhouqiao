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
import Picker from 'react-native-picker';
import DocumentPicker from 'react-native-document-picker';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      urgent: false,
      data: {},
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

  setCategory = async () => {
    Picker.hide();
    if (this.props.category === 3) {
      // Pick a single file
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.docx],
        });
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        console.log(
          11111111111,
          await Http.fileUpdate(
            {
              file: {
                uri: res.uri,
                type: 'multipart/form-data',
                name: res.name,
                size: res.size,
              },
            },
            true,
            {
              type: 5,
            },
          ),
        ),
          console.log('success');
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('cancleErr', err);
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    } else {
      let list = [];
      if (this.props.category === 1) {
        list = ['新手', '老手'];
      } else {
        let res = await Http.requirementCategories();
        res.data.data.map((v, i) => {
          list.push(v.category);
        });
      }
      Picker.init({
        pickerData: list,
        selectedValue: [0],
        pickerConfirmBtnText: '确定',
        pickerConfirmBtnColor: [254, 158, 14, 1],
        pickerCancelBtnColor: [254, 158, 14, 1],
        pickerCancelBtnText: '取消',
        pickerTitleText: '选择类别',
        pickerToolBarBg: [255, 255, 255, 1], // ps ai 室内设计 室外设计 插画 平滑 cad
        pickerBg: [255, 255, 255, 1],
        onPickerConfirm: (data) => {
          this.props.inputUpdate(this.listBind(data[0]));
        },
      });
      Picker.show();
    }
  };

  listBind = (data) => {
    switch (data) {
      case '新手':
        return 1;
      case '老手':
        return 2;
      case '全部':
        return 1;
      case 'ps':
        return 2;
      case 'AI':
        return 3;
      case '室内设计':
        return 4;
      case '户外设计':
        return 5;
      case '插画':
        return 6;
      case '平画':
        return 7;
      case 'CAD':
        return 8;
    }
  };

  render() {
    let { title, tips, type, hint, last } = this.props;
    let { input, urgent } = this.state;
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
                this.setState({ urgent: true });
                this.props.inputUpdate(this.state.urgent);
              }}
            >
              <Text
                style={urgent ? styles.button_checked : styles.button_unchecked}
              >
                加急
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => {
                this.setState({ urgent: false });
                this.props.inputUpdate(this.state.urgent);
              }}
            >
              <Text
                style={urgent ? styles.button_unchecked : styles.button_checked}
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
              this.props.inputUpdate(e);
            }}
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
