import React from 'react';
import PropTypes from 'prop-types';
import Is from '@flk/supportive-is';
import Globals from '../../globals';
import Alert from '@material-ui/lab/Alert';
import { styled } from '@material-ui/core';
import { trans } from '../../localization';

const ErrorsList = styled('ul')({
    padding: 0,
});

export default function FormError({ error, heading = trans('validation.errorsHeading') }) {
    if (Is.empty(error)) return null;

    let errorText = error;

    if (Is.plainObject(error)) {
        errorText = [];

        for (let key in error) {
            errorText.push(error[key]);
        }
    }

    if (Is.array(errorText)) {
        const style: any = { textAlign: Globals.left };
        errorText = (
            <div style={style}>
                <strong>{heading}:</strong>
                <ErrorsList>
                    {errorText.map((error, key) => {
                        if (Is.plainObject(error)) {
                            error = error.error || error.message || error.text || error.label;
                        }

                        return (
                            <li key={key}>{error}</li>
                        )
                    })}
                </ErrorsList>
            </div>
        )
    }

    return (
        <Alert severity="error">
            {errorText}
        </Alert>
    )
}

FormError.propTypes = {
    heading: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
}