import React, { FC } from 'react';
import router from './../../../router';
import { RestfulService } from './../../..//http';
import permissionsObserver from './permissionsObserver';
import { translatedTitle } from './../../../utils/metadata';
import LazyTable from '././../../../table/components/LazyTable';
import { FormProps } from '././../../../table/components/TableForm';
import AccessDenied from '../../components/AdminDashboard/AccessDenied';
import TableAddButton from './../../../table/components/Actions/TableAddButton';

interface PermissionInterface {
    [type: string]: boolean
};

const defaultRoles: PermissionInterface = {
    list: true,
    edit: true,
    add: true,
    delete: true,
    view: true,
};

export interface TableColumn {
    heading: string;
    key?: string;
    formatter?: Function;
    buttons?: any[];
    settings?: any;
    tooltip?: Function;
}

export interface FilterOption {
    type: 'search' | 'select' | 'autocomplete';
    placeholder?: string;
    name: string,
    col: number;
    inputProps?: any;
}

export interface CrudOptions {
    role?: string,
    title?: string,
    permissions?: object,
    haveAccessTo?: Function,
    service?: RestfulService,
    table: {
        heading: string;
        addButtons?: any[];
        columns: TableColumn[];
        filter?: FilterOption[];
        query?: string;
        inputProps?: any;
    },
    formOptions?: {
        form: FC<FormProps>,
        singleName?: string;
        onSave?: Function;
        defaultData?: object;
        modalOptions?: {
            size?: string;
            fullScreen?: boolean;
        }
    }
}

export default function crudPage(options: CrudOptions) {
    const { role, permissions = defaultRoles } = options;
    const haveAccessTo = (permission: string) => {
        if (!role) return true;

        return permissions[permission] && permissionsObserver.isGranted(role + '.' + permission);
    };

    return function ({ props }) {
        translatedTitle(options.title || options.table.heading);

        if (!haveAccessTo('list')) return <AccessDenied />

        const sendRequest = params => {
            return options.service.list(params);
        };

        const mapResponse = (response) => {
            const { records, paginationInfo } = response.data;

            return {
                records,
                pagination: paginationInfo,
            };
        };

        options.haveAccessTo = haveAccessTo;

        if (!options.table.addButtons) {
            options.table.addButtons = [TableAddButton];
        }

        return <LazyTable {...props} options={options} defaultRequestParams={router.queryString.all()} request={sendRequest} mapResponse={mapResponse} />
    }
}