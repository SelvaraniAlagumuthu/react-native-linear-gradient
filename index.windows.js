/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component } from 'react';
import { processColor, View } from 'react-native';
import NativeLinearGradient,{ type Props } from './common';
const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.warn(
      `LinearGradient '${name}' property should be an object with fields 'x' and 'y', ` +
      'Array type is deprecated.'
    );
  }
  // TODO: Update Android native code to receive a {x, y} object, not an array
  console.log("point.x======>"+point.x);
  console.log("point.y======>"+point.y);
  return {
    x: point[0],
    y: point[1]
  };
  return point;
};
// TODO: Update Windows native code + update Props to share the same API with iOS/android
// type Props = {
//   start?: number[];
//   end?: number[];
//   colors: string[];
//   locations?: number[];
// } & typeof(View);
export default class LinearGradient extends Component<Props> {
  props: Props;
  gradientRef: any;
  static defaultProps = {
    start: { x: 0.5, y: 0.0 },
    end: { x: 0.5, y: 1.0 },
  };
  setNativeProps(props: Props) {
    this.gradientRef.setNativeProps(props);
  }
  render() {
   
    const {
      colors,
      locations,
      start,
      end,
      useAngle,
      angleCenter,
      angle,
      ...otherProps
    } = this.props;
    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }
   
    
    return (
      <NativeLinearGradient
        ref={(component) => { this.gradientRef = component; }}
        {...otherProps}
        startPoint={start}
        endPoint={ end}
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
       
      />
    );
  }
}
