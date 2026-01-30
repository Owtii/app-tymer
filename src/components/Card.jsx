import React from 'react';
import './Card.css';

const Card = ({
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    ...props
}) => {
    const classes = [
        'card',
        `card--${variant}`,
        `card--padding-${padding}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

export default Card;
