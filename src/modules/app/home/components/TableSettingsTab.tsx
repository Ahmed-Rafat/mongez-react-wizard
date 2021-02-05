import React from 'react'
import TableColumns from './TableColumns'
import TableFilter from './TableFilter'

export default function TableSettingsTab({ appSettings }) {
    return (
        <>
            <TableFilter />
            <TableColumns />
        </>
    )
};