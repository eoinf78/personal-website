import DownloadIcon from './assets/download.svg';
import EmailIcon from './assets/email.svg';
import GithubIcon from './assets/github.svg';
import LinkedInIcon from './assets/linkedin.svg';
import {FC} from 'react';

export const ICON_MAP = {
  'download': DownloadIcon,
  'email': EmailIcon,
  'github': GithubIcon,
  'linkedin': LinkedInIcon
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