/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import IconToolsedit from './IconToolsedit';
import IconToolsdeleteFilling from './IconToolsdeleteFilling';
import IconToolsaddCircle from './IconToolsaddCircle';
export { default as IconToolsedit } from './IconToolsedit';
export { default as IconToolsdeleteFilling } from './IconToolsdeleteFilling';
export { default as IconToolsaddCircle } from './IconToolsaddCircle';

export type IconNames = 'toolsedit' | 'toolsdelete-filling' | 'toolsadd-circle';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'toolsedit':
      return <IconToolsedit {...rest} />;
    case 'toolsdelete-filling':
      return <IconToolsdeleteFilling {...rest} />;
    case 'toolsadd-circle':
      return <IconToolsaddCircle {...rest} />;

  }

  return null;
};

export default IconFont;
