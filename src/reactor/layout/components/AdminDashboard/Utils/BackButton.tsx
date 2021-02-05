import React from 'react';
import Globals from './../../../../globals';
import { Link } from './../../../../components';
import { styled, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Button = styled(Link)({
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.7rem',
    color: '#000',
});

export default function BackButton({ to, children }) {
    return (
        <Button to={to}>
            <IconButton>
                {Globals.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            {children}
        </Button>
    );
}