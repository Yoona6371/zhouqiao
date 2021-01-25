import { pxToDp } from './pxToDp';

export const padding = function (
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
) {
  return {
    paddingTop: pxToDp(paddingTop),
    paddingLeft: pxToDp(paddingLeft),
    paddingRight: pxToDp(paddingRight),
    paddingBottom: pxToDp(paddingBottom),
  };
};

export const margin = (
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
) => {
  return {
    marginTop: pxToDp(paddingTop),
    marginLeft: pxToDp(paddingLeft),
    marginRight: pxToDp(paddingRight),
    marginBottom: pxToDp(paddingBottom),
  };
};

export const fontStyle = (
  fontSize,
  height,
  lineHeight,
  fontWeight,
  color,
  textAlign,
) => {
  return {
    fontSize: pxToDp(fontSize),
    height: pxToDp(height),
    lineHeight: pxToDp(lineHeight),
    fontWeight: fontWeight,
    color: color,
    textAlign: textAlign,
  };
};

export const flexColumnCenter = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
export const flexColumnSpb = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};
export const flexRowCenter = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
export const flexRowSpb = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
