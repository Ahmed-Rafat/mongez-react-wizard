import React from 'react';
import Label from './Label';
import './RichTextInput.scss';
import { InputProps } from './FormInput';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { trans } from './../../localization';
import { Editor } from 'react-draft-wysiwyg';
import { toInputName } from 'reinforcements';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FormControl, styled, FormHelperText } from '@material-ui/core';
import useRequiredInputValidator from '../hooks/use-required-input-validator';

// When the editor is empty, it returns the following html text
// in that case we'll compare the value with the following constant
// If it equals it, then we'll consider the value is empty
// const emptyValueString = '<p><br></p>';

const InputWrapper = styled(FormControl)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
}));

const InputLabel = styled(Label)(({ theme }) => ({
    marginBottom: theme.spacing(1.5),
}));

export default function RichTextInput(props: InputProps) {
    let { required, name, defaultValue, style = { height: '200px', direction: 'rtl' }, placeholder, value, onChange, label, ...otherProps } = props;
    const contentBlock = htmlToDraft(defaultValue || value || '');

    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

    const [editorState, setEditorState] = React.useState(EditorState.createWithContent(contentState));
    const [inputValue, setValue] = React.useState(() => {
        if (defaultValue || value) return defaultValue || value;

        return null;
    });

    const onContentStateChange = contentState => {
        const value = draftToHtml(contentState);
        setValue(value);

        if (onChange) {
            onChange(value);
        }

        if (!value) {
            setError(trans('validation.required'));
        } else {
            clearRequiredValidation();
        }
    };

    const [error, setError] = React.useState(null);

    const hasError = Boolean(error);

    const componentRef = React.useRef();

    const clearRequiredValidation = useRequiredInputValidator(required, componentRef, inputValue, setError);

    if (placeholder) {
        placeholder = trans(placeholder);
    }

    return (
        <InputWrapper error={hasError} fullWidth>
            <InputLabel label={trans(label)} required={required} />

            <Editor
                onContentStateChange={onContentStateChange}
                editorState={editorState}
                textAlignment="right"
                onEditorStateChange={setEditorState}
            />

            <FormHelperText error={hasError}>{error}</FormHelperText>

            {name &&
                <input type="hidden" name={toInputName(name)} value={inputValue as string} />
            }
        </InputWrapper>
    );
}