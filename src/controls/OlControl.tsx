import React from 'react';

export const OlControl = () => {
    const divEle = React.createRef<HTMLDivElement>();
    return (
        <div ref={divEle}>
            Control
        </div>
    );
};