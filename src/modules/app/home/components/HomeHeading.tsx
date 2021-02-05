import React from 'react';
import { Button, styled } from '@material-ui/core';
import { TextCenter } from 'reactor/components';
import { Heading2, HeadingWrapperContent } from './Helpers';

const cloneModulesColor = '#1eb939';
const adminColor = '#ff006f';
const frontOfficeColor = '#2c87de';

const AdminButton = styled(Button)({
    color: '#FFF',
    marginRight: '2rem',
    backgroundColor: adminColor,
    '&:hover': {
        backgroundColor: adminColor,
    }
});

const CloneModulesButton = styled(Button)({
    color: '#FFF',
    marginRight: '2rem',
    backgroundColor: cloneModulesColor,
    '&:hover': {
        backgroundColor: cloneModulesColor,
    }
});

const FrontOfficeButton = styled(Button)({
    color: '#FFF',
    backgroundColor: frontOfficeColor,
    '&:hover': {
        backgroundColor: frontOfficeColor,
    }
});

const Content = styled('div')({
    marginTop: '10%',
});


export default function HomeHeading({ disabled, setModuleType }) {
    return (
        <>
        <HeadingWrapperContent text={'Mongez Wizard'} />

            <Content>
                <Heading2>What Do You Want To Do?</Heading2>

                <TextCenter>
                    <CloneModulesButton disabled={disabled} onClick={() => setModuleType('admin')}>Clone Modules</CloneModulesButton>
                    <AdminButton disabled={disabled} onClick={() => setModuleType('admin')}>Create Admin Module</AdminButton>
                    <FrontOfficeButton disabled={disabled} onClick={() => setModuleType('front-office')}>Create Front Office Module</FrontOfficeButton>
                </TextCenter>
            </Content>
        </>
    )
}
