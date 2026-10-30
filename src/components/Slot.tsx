import { Children, cloneElement, HTMLAttributes, isValidElement } from "react";

import type { CSSProperties, ReactNode } from 'react';

export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: ReactNode }


export function Slot({
  children,
  ...props
}: HTMLAttributes<HTMLElement> & {
  children?: ReactNode
}) {
  if (isValidElement<Record<string, unknown>>(children)) {
    const childProps = children.props as Record<string, unknown>;
    return cloneElement(children, {
      ...props,
      ...childProps,
      style: {
        ...props.style,
        ...(childProps.style as CSSProperties),
      },
      className: props.className
    })
  }
  if (Children.count(children) > 1) {
    Children.only(null)
  }
  return null
}