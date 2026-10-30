import {createElement} from 'react';

import type {ReactElement} from 'react';


export type HeadingProps = {
    className?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: 'hero' | 'display' | 'section' | 'card';
    text?: string;
};

export const Heading = ({className, level, size, text}: HeadingProps): ReactElement => {
    return createElement(`h${level}`, {className: `Heading --size-${size}${className ? `${className}` : ''}`}, text ? text : null);
};