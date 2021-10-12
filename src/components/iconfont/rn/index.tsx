/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconToolsedit from './IconToolsedit';
import IconToolsdeleteFilling from './IconToolsdeleteFilling';
import IconToolsaddCircle from './IconToolsaddCircle';
export { default as IconToolsedit } from './IconToolsedit';
export { default as IconToolsdeleteFilling } from './IconToolsdeleteFilling';
export { default as IconToolsaddCircle } from './IconToolsaddCircle';

export type IconNames = 'toolsedit' | 'toolsdelete-filling' | 'toolsadd-circle';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'toolsedit':
      return <IconToolsedit key="1" {...rest} />;
    case 'toolsdelete-filling':
      return <IconToolsdeleteFilling key="2" {...rest} />;
    case 'toolsadd-circle':
      return <IconToolsaddCircle key="3" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
