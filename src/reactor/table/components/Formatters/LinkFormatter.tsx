import React from 'react';
import { Obj } from 'reinforcements';
import {Link} from './../../../components';
import { styled } from '@material-ui/core';

const ColoredLink = styled(Link)({
    color: '#FFF',
    backgroundColor: '#54545e',
    borderRadius: '5px',
    padding: '0.1rem 0.5rem',
    fontWeight: 'bold',
    // textDecoration: 'none',
});

export default function LinkFormatter({ record, column, children }) {
    let href = Obj.get(column, 'settings.href');

    let value = children || column.value;

    if (!href || !value) return null;

    let linkProps = Obj.get(column, 'settings', {});

    delete linkProps.href;

    return <ColoredLink to={href(record, column)} {...linkProps} children={value} />;
}