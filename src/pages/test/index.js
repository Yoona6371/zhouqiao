import React, { Component } from 'react';
import Video from 'react-native-video';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import { onDoublePress } from '../../utils/onDoublePress';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoRate: 1,
    };
  }
  paused = () => {
    if (onDoublePress()) {
      this.setState({ videoRate: 1 ^ this.state.videoRate });
    }
  };
  render() {
    let { videoRate } = this.state;
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.paused} style={{ flex: 1 }}>
          <Video
            source={require('./test.mp4')} // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            rate={videoRate}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  backgroundVideo: {
    width: pxToDp(250),
    height: pxToDp(250),
  },
});

export default Index;
