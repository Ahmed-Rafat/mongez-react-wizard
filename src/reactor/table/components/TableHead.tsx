import React from 'react';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import { TableCell, TableRow } from '@material-ui/core';
import useLayoutClasses from '../../layout/utils/style';
import MaterialTableHead from '@material-ui/core/TableHead';

export default function TableHead() {
    const { options } = useTable();

    const classes: any = useLayoutClasses();

    const columns = options.table.columns.map((column, index) => {
        return <TableCell align="center" className={classes.bold} key={index}>{trans(column.heading)}</TableCell>;
    });

    return (
        <MaterialTableHead>
            <TableRow>
                {columns}
            </TableRow>
        </MaterialTableHead>
    )
}