import React from 'react';
import './TableFilterForm.scss';
import { Obj } from 'reinforcements';
import useTable from '../hooks/use-table';
import { trans } from '../../localization';
import { Button, styled } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import ColoredIcon from '../../components/ColoredIcon';
import router, { currentRoute, navigateTo } from '../../router';
import { For, GridContainer, GridItem, Tooltip } from './../../components';
import { SubmitButton, AutoComplete, TextInput, SelectInput } from '../../form';

const CircleButton = styled(Button)({});

const GridContainerWrapper = styled(GridContainer)({
    padding: '0.5rem 2.5rem',
});

const availableFilters = {
    search: {
        component: TextInput,
        defaultProps: {
            margin: 'dense',
            style: {
                marginTop: 0
            }
        }
    },
    select: {
        component: SelectInput,
        defaultProps: {
            margin: 'dense',
        }
    },
    autocomplete: {
        component: AutoComplete,
        defaultProps: {
            InputProps: {
                margin: 'dense',
                style: {
                    marginTop: 0
                }
            }
        }
    },
};

export default function TableFilterForm() {
    const { options } = useTable();

    const { filter } = options.table || {};

    const queryString = router.queryString;

    filter.forEach((singleFilter: any) => {
        if (!singleFilter.component && singleFilter.type) {
            singleFilter.component = availableFilters[singleFilter.type].component;
        }

        singleFilter.inputProps = Obj.merge({}, availableFilters[singleFilter.type].defaultProps || {}, singleFilter, singleFilter.inputProps);
        delete singleFilter.inputProps.inputProps;
        delete singleFilter.inputProps.component;
        delete singleFilter.inputProps.col;
        delete singleFilter.inputProps.type;
    });

    const resetForm = () => {
        navigateTo(currentRoute());
    };

    return (
        <>
            <GridContainerWrapper>
                <For array={filter} render={singleFilter => (
                    <GridItem xs={12} sm={singleFilter.col}>
                        <singleFilter.component {...singleFilter.inputProps} value={singleFilter.value || queryString.get(singleFilter.query || singleFilter.name)} />
                    </GridItem>
                )}
                />
                <GridItem sm={2}>
                    <SubmitButton color="primary" variant="contained" >{trans('table.filter')}</SubmitButton>
                    <Tooltip title={trans('table.reset')}>
                        <CircleButton onClick={resetForm}>
                            <ColoredIcon icon={ReplayIcon} color="orange" />
                        </CircleButton>
                    </Tooltip>
                </GridItem>
            </GridContainerWrapper>
        </>
    );
}