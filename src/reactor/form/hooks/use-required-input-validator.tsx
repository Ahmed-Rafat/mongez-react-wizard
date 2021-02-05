import React from 'react';
import Is from '@flk/supportive-is';
import { trans } from '../../localization';
import FormContext from '../providers/form-provider';

export default function useRequiredInputValidator(isRequired, componentRef, value, setError) {    
    const { form } = React.useContext(FormContext);

    if (! isRequired || ! componentRef.current) return () => {};

    if (componentRef.current && ! componentRef.current.uid) {
        componentRef.current.uid = Math.random();
    }

    const validator = {
        id: componentRef.current.uid,
        validate() {
            // reset the error if exists
            this.hasError = null;

            // now check if the value is empty
            if (Is.empty(value)) {
                // the required error
                const errorMessage = trans('validation.required');

                // set the error to the form
                this.hasError = errorMessage;

                // also update the file input error
                setError(errorMessage);
                
                form.dirtyInput(componentRef);
            }
        }
    };

    form.setInput(validator);

    return (terminate = false) => {
        setError(null);

        if (terminate) {
            form.removeInput(validator);
        }

        form.cleanInput(componentRef);
    };
}