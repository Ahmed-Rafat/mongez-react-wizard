import React from 'react';
import { For } from './../../components';
import { rtrim } from 'reinforcements';
import HiddenInput from './HiddenInput';
import { trans } from './../../localization';
import BaseChipInput from 'material-ui-chip-input';

interface ChipProps {
    value?: string[];
    onChange?: Function;
    name?: string;
    placeholder?: string;
    label?: string;
}

export default function ChipInput(props: ChipProps) {
    const [values, setValue] = React.useState(props.value || []);

    const handleAddChip = chip => {
        const newValues = [...values, chip];
        setValue(newValues);

        props.onChange && props.onChange(newValues);
    };

    const handleDeleteChip = (chip, index) => {
        values.splice(index, 1);
        const newValues = [...values];
        setValue(newValues);

        props.onChange(newValues);
    };

    return (
        <>
            <For array={values} render={value => (
                <HiddenInput name={rtrim(props.name, '[]') + '[]'} value={value} />
            )} />
            <BaseChipInput
                fullWidth
                newChipKeys={['Enter', ',']}
                variant="outlined"
                alwaysShowPlaceholder
                placeholder={props.placeholder ? trans(props.placeholder) : ''}
                value={values}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
            />
        </>
    )
}