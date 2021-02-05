import React from 'react';
import { RestfulService } from '../../http/restful-endpoint';
import { CrudOptions } from '../../layout/utils/admin/crudPage';

export interface ITableContext {
    tableInfo?: object;
    page?: number;
    options?: CrudOptions;
    service?: RestfulService;
    itemsPerPage?: number;
    updateRecords?: Function;
    records?: any[],    
    pagination?: any;
    setPageNumber?: Function;
    setPaginationInfo?: Function;
    setItemsPerPage?: Function;
    loading?: Function;
}

const tableOptions: ITableContext = {
    tableInfo: {},
    options: null,
    service: null,
    updateRecords: null,
    records: null,
};

const TableContext = React.createContext(tableOptions);

export default TableContext;