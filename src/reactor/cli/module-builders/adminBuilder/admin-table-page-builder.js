const { fs } = require('@flk/fs');
const { Obj } = require('reinforcements');
const { stringify, tabN, tab } = require('./../helpers');

const formattersList = {
    multiLingual: 'MultiLingualFormatter',
    image: 'ImageFormatter',
    bool: 'BooleanFormatter',
    boolean: 'BooleanFormatter',
    email: 'EmailFormatter',
    number: 'NumberFormatter',
    translator: 'TranslatorFormatter',
    // todo
    badge: 'BadgeFormatter',
    select: 'DropdownFormatter',
    dropdown: 'DropdownFormatter',
    link: 'LinkFormatter',
    imageLink: 'ImageLinkFormatter',
    switch: 'SwitchFormatter',
}

function getColumns(columns, importsList) {
    return columns.map((column, index) => {
        let content = tabN('{', 3);

        content += tabN(`heading: '${column.heading}',`, 4);
        content += tabN(`key: '${column.key}',`, 4);

        if (column.formatter && !importsList.includes(formattersList[column.formatter])) {
            const formatter = formattersList[column.formatter];

            importsList.push(formatter);
            content += tabN(`formatter: ${formatter},`, 4);
        }

        if (index === columns.length - 1) {
            content += tab('},', 3);
        } else {
            content += tabN('},', 3);
        }

        return content;
    }).join('');
}

function withFilter(filters) {
    if (filters.length === 0) return '[]';

    let content = '[\n';

    content += filters.map(filter => {
        return stringify(filter, 3);
    }).join('');

    content += tab(']', 2);

    return content;
}

module.exports = function updatePageData(moduleDirectory, module, table, role) {
    const filePath = moduleDirectory + '/components/module/Page.tsx';

    table.columns.unshift({
        heading: '#',
        key: 'id',
    });

    const importsList = [];

    function getImports() {
        return importsList.map(formatter => {
            return `import {${formatter}} from 'reactor/table';`
        }).join('\n');
    }

    const content = fs.get(filePath)
        .replace('roleName', role)
        .replace('module-name', module)
        .replace('module-single', Obj.get(table, 'formOptions.singleName', module))
        .replace('modalSize', Obj.get(table, 'formOptions.size', 'md'))
        .replace('filterList', withFilter(Obj.get(table, 'filter', [])))
        .replace('headingName', table.heading || module)
        .replace('columnsList', getColumns(table.columns, importsList))
        .replace('// imports', getImports);
    fs.put(filePath, content);
}