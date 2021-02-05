import { TableColumn } from './crudPage';
import TableViewButton from './../../../table/components/Actions/TableViewButton';
import TableEditButton from './../../../table/components/Actions/TableEditButton';
import TableDeleteButton from './../../../table/components/Actions/TableDeleteButton';
import ButtonsFormatter from './../../../table/components/Formatters/ButtonsFormatter';
import navigateableButton from './../../../table/components/Actions/navigateableButton';

const tableActions: TableColumn = {
    heading: 'actions',
    formatter: ButtonsFormatter,
    buttons: [TableViewButton, TableEditButton, TableDeleteButton]
};

export { navigateableButton };

export default tableActions;