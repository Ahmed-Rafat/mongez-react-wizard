import React from 'react';
import { Obj } from 'reinforcements';
import CancelIcon from '@material-ui/icons/Cancel';
import { ColoredIcon } from './../../../components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function BooleanFormatter({ record, column }) {
    let value = Obj.get(record || {}, column.key, false);

    const { settings } = column;

    if (settings && settings.reversed) {
        value = !value;
    }

    if (value) {
        return <ColoredIcon icon={CheckCircleIcon} color="#47b947" />
    }

    return <ColoredIcon icon={CancelIcon} color="red" />
}