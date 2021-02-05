import { styled } from '@material-ui/core';
import React from 'react';
import For from '../../components/For';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import config from '../../config';
import { translateFrom } from '../../localization';

interface MultiLingualInputProps {
    component: React.ReactNode;
    name: string;
};

const FlagWrapper = styled('div')({
    marginTop: '0.4rem'
});

const LanguageFlag = styled('img')({
    width: '16px',
    height: '16px',
    marginRight: '0.3rem',
    verticalAlign: 'middle',
});

export default function MultiLingualInput(props: any): React.ReactElement {
    let { component: Component, name, label, value, inline = true, placeholder, autoFocus, ...otherProps } = props;

    let firstLocaleCode;

    return (
        <GridContainer>
            <For object={config.get('locales')} render={(localeCode, localeInfo) => {
                let languageContent = localeInfo.name;
                let inputPlaceholder = placeholder;
                let inputAutoFocus = false;
                let inputValue = value;
                if (localeInfo.flag) {
                    languageContent = (
                        <>
                            <LanguageFlag src={localeInfo.flag} alt={localeInfo.name} title={localeInfo.name} />
                            { localeInfo.name }
                        </>
                    )
                }

                if (inputValue && inputValue[localeCode]) {
                    inputValue = inputValue[localeCode];
                }

                let itemProps = {};

                if (inline) {
                    itemProps['sm'] = 6;
                }

                if (! firstLocaleCode && autoFocus) {
                    inputAutoFocus = true;
                }

                firstLocaleCode = localeCode;

                return (
                    <GridItem {...itemProps}>
                        <FlagWrapper>{languageContent}</FlagWrapper>
                        <Component {...otherProps} value={inputValue} autoFocus={inputAutoFocus} label={translateFrom(localeCode, label)} placeholder={translateFrom(localeCode, inputPlaceholder)} name={name + '.' + localeCode} />
                    </GridItem>
                )

            }} />
        </GridContainer>
    );
}
