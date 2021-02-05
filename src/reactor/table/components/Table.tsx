import React from 'react';
import { Form } from './../../form';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { Obj } from 'reinforcements';
import { If } from '../../components';
import TableFilter from './TableFilter';
import TableToolBar from './TableToolBar';
import { HiddenInput } from '../../form';
import Paper from '@material-ui/core/Paper';
import TablePagination from './TablePagination';
import { updateQueryString } from './../../router';
import MaterialTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import useLayoutClasses from './../../layout/utils/style';
import { LightBackdrop } from './../../layout/components/Backdrop';
import TableContext, { ITableContext } from '../providers/table-provider';

export default function Table(props: any) {
    let { options, records, pagination: defaultPagination, isLoading: defaultIsLoading, onChange } = props;
    const [tableRecords, setRecords] = React.useState(records);
    const [currentTableInfo, setTableInfo] = React.useState({} as any);
    const [pagination, setPaginationInfo] = React.useState(defaultPagination);
    const [isLoading, loading] = React.useState(defaultIsLoading);

    const formRef = React.useRef() as any;

    const { service } = options;

    const classes: any = useLayoutClasses();

    React.useEffect(() => {
        setRecords(records);
    }, [records]);

    React.useEffect(() => {
        loading(defaultIsLoading);
    }, [defaultIsLoading]);

    React.useEffect(() => {
        setPaginationInfo(defaultPagination);
    }, [defaultPagination]);

    const updateTableInfo = newInfo => {
        const newTableInfo = Obj.merge(currentTableInfo, newInfo);

        setTableInfo(newTableInfo);

        // onChange && onChange(newTableInfo);

        setTimeout(() => {
            formRef.current.submit();
        }, 0);
    };

    const setPageNumber = pageNumber => {
        updateTableInfo({
            page: pageNumber,
        });
    };

    const setItemsPerPage = itemsPerPage => {
        updateTableInfo({
            itemsPerPage,
            page: 1, // reset again page to 1
        });
    };

    const submitFilter = (e, form) => {
        loading(true);

        updateQueryString(form.toQueryString());
        service.list(form.toObject()).then(response => {
            setPaginationInfo(response.data.paginationInfo);
            setRecords(response.data.records);
            form.submitting(false);
            loading(false);
        });
    };

    const tableOptions: ITableContext = {
        options,
        pagination,
        setPageNumber,
        setPaginationInfo,
        setItemsPerPage,
        itemsPerPage: currentTableInfo.itemsPerPage,
        loading,
        records: tableRecords,
        updateRecords: setRecords,
        service: options.service,
    };

    return (
        <TableContext.Provider value={tableOptions}>
            <TableToolBar />

            <Form ref={formRef} className="filterForm" onSubmit={submitFilter}>
                <TableFilter />

                <Paper className={classes.positionRelative}>
                    <LightBackdrop open={isLoading} />
                    <TableContainer>
                        <MaterialTable>
                            <TableHead />
                            <TableBody isLoading={isLoading} />
                        </MaterialTable>
                    </TableContainer>
                    <If condition={Boolean(pagination)}>
                        <HiddenInput name="page" value={currentTableInfo.page || 1} />
                        <HiddenInput name="itemsPerPage" value={currentTableInfo.itemsPerPage} />
                        <TablePagination />
                    </If>
                </Paper>

            </Form>
        </TableContext.Provider>
    );
}