import React from 'react';
import { styled } from '@material-ui/core';
import { RequiredSpan } from './FormHelpers';
import { trans } from './../../localization';

const FormLabel = styled('span')({
    display: 'inline-block',
})

export default function Label(props: any) {
    let { label, children, component: Component, required, ...otherProps } = props;
    label = label || children;

    if (! label) return null;

    return (
        <Component {...otherProps}>
            {trans(label)}
            <RequiredSpan required={required} />
        </Component>
    )
}

Label.defaultProps = {
    component: FormLabel,
}