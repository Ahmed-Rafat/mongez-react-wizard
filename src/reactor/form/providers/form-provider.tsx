import React, { FC } from 'react';

interface FormOptions {
    form?: any,
}

const formOptions: FormOptions = {
    form: null
}

const FormContext = React.createContext(formOptions);

export default FormContext;