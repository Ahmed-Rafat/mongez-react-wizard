import React from 'react';
import TableRowContext, { RecordData } from '../providers/table-row-provider';

export default function useTableRow(): RecordData {
    return React.useContext(TableRowContext);
}