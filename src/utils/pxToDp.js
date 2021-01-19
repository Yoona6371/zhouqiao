/**
 * Created by wangdi on 5/11/16.
 */
'use strict';

import { Dimensions } from 'react-native';

export const deviceHeightDp = Dimensions.get('window').height;
export const deviceWidthDp = Dimensions.get('window').width;

const uiHeightPx = 640;

export function pxToDp(uiElementPx) {
  return (uiElementPx * deviceHeightDp) / uiHeightPx;
}
