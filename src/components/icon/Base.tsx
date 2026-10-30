import DownloadIcon from '@/components/icon/assets/download.svg';
import {FC} from 'react';

export const ICON_MAP = {
  'download': DownloadIcon,
}

interface BaseIconProps {
  name: keyof typeof ICON_MAP
}

export const BaseIcon: FC<BaseIconProps> = ({name}: {name:  keyof typeof ICON_MAP}) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) return null;

  return <>
    <IconComponent />
  </>
}