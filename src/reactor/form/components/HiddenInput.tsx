import React from 'react';
import { toInputName } from 'reinforcements';

export default function HiddenInput({ name, ...props }) {
    return <input type="hidden" name={toInputName(name)} {...props} />
}