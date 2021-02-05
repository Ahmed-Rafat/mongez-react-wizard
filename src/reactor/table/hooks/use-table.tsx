import React from 'react';
import TableContext, { ITableContext } from '../providers/table-provider';

export default function useTable(): ITableContext {
    return React.useContext(TableContext);
}