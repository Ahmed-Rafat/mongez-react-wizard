import Form from './Form';
import service from 'modules/app/module-name/services/service';
import {crudPage, CrudOptions, tableActions } from 'reactor/layout';
// imports

const options: CrudOptions = {
    service,
    role: 'roleName',
    formOptions: {
        form: Form,
        singleName: 'module-single',
        modalOptions: {
            size: 'modalSize',
        }
    },
    table: {
        heading: 'headingName',
        filter: filterList,
        columns: [
columnsList
            tableActions,
        ],
    }
};

export default crudPage(options);