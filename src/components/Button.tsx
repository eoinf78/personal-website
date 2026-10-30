import { Slot, type AsChildProps } from './Slot';
import { ButtonHTMLAttributes } from 'react';
import { ICON_MAP, Icon } from './icon';

type ButtonProps = AsChildProps<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: 'primary' | 'secondary' | 'text' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  icon?:  keyof typeof ICON_MAP;
}

export const Button = ({ 
  asChild = false,
  className,
  icon,
  size = 'medium',
  variant = 'primary',
  ...props 
}: ButtonProps) => {
  const classes = ['Button', `--${variant}`, `--${size}`, className ?? '']
    .filter(Boolean)
    .join(' ');

  if (asChild) {
    return <Slot {...props} className={classes}>
      {props.children}
    </Slot>
  }

  return <button {...props} className={classes} type='button'>
    <span className="Button__label">
      {icon && <Icon name={icon} size="small"/>}
      {props.children}
    </span>
  </button>
};