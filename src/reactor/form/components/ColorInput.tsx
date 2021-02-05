import React from 'react';
import Label from './Label';
import HiddenInput from './HiddenInput';
import { ColorPicker } from 'material-ui-color';

export default function ColorInput({ name, label, value, onChange = null }) {
    const [color, setColor] = React.useState(value || '');

    const updateColor = color => {
        setColor(color.css.backgroundColor);

        onChange && onChange(color.css.backgroundColor, color);
    }

    return (
        <>
            <HiddenInput name={name} value={color} />
            <Label>{label}</Label>
            <ColorPicker
                hideTextfield
                value={color}
                onChange={updateColor}
            />
        </>
    )
}
