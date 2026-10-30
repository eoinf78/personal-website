import { FC } from "react";
import styles from './icon.module.scss';

import { BaseIcon, ICON_MAP } from "./Base";

interface IconProps {
  /** The name of the icon to render. Must match a key in the icon registry. */
  name:  keyof typeof ICON_MAP;
  /** The size of the icon. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** The color variant of the icon. */
  color?: 'primary' | 'secondary';
  /** Setting the stroke or fill of the SVG */
  style?: 'stroke' | 'fill';
}

export const Icon: FC<IconProps> = ({name, size = 'medium', color, style = 'stroke'}) => {
  return <span className={`Icon --${size}${color ? ` --color-${color}` : ''} --${style}`}>
    <BaseIcon name={name} />
  </span>
}