import React from 'react';

export default ( { children, className, color = 'black', type = 'button', ...props } ) => (
    <button
        className={ `${ className } Button Button_${ color }` } type={ type } { ...props }>
        {children }
    </button>
)
