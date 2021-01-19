import React, { Component } from 'react';
import { Text } from 'react-native';

const Icon = (props) => (
  <Text style={{ fontFamily: 'iconfont', ...props.style }}>{'\ue634'}</Text>
);

export default Icon;
