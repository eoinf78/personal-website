import { Slot, type AsChildProps } from './Slot';
import { ButtonHTMLAttributes } from 'react';
import { ICON_MAP, Icon } from './icon';

type ButtonProps = AsChildProps<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: 'primary' | 'text' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  icon?:  keyof typeof ICON_MAP;
}

export const Button = ({ 
  asChild = false,
  icon,
  size = 'medium',
  variant = 'primary',
  ...props 
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button"
  

  if (asChild) {
    console.log(props);
    return <Slot {...props}>
      {props.children}
    </Slot>
  }

  return <button {...props} className={`Button --${variant} --${size}`} type='button'>
    <span className="Button__label">
      {icon && <Icon name={icon} size="small"/>}
      {props.children}
    </span>
  </button>
};