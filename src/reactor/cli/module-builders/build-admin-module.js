const { fs } = require('@flk/fs');
const prompts = require('prompts');
const { modules } = require('./../helpers');
const updateModules = require('./updateModules');
const { toStudlyCase } = require('reinforcements');
const updateSidebar = require('./adminBuilder/updateSidebar');
const updateRoutesFile = require('./adminBuilder/updateRoutesFile');
const updateForm = require('./adminBuilder/admin-form-page-builder');
const updatePermissions = require('./adminBuilder/updatePermissions');
const updateServiceFile = require('./adminBuilder/updateServiceFile');
const updateTranslations = require('./adminBuilder/updateTranslations');
const updatePageData = require('./adminBuilder/admin-table-page-builder');

module.exports = async function (command) {
    const ADMIN_MODULE_FILES_DIRECTORY = __dirname + '/admin-module/';
    const app = command.app || 'admin';
    global.app = app;
    const ADMIN_MODULE_DIRECTORY = modules(`${app}/`);

    function copyFiles(modulePath) {
        fs.copy(ADMIN_MODULE_FILES_DIRECTORY, modulePath);
    }

    const { module, route, serviceRoute, serviceClassName, sidebar, translations, role = '', component = toStudlyCase(module), table, form } = command.data;

    const moduleDirectory = ADMIN_MODULE_DIRECTORY + module;

    if (fs.exists(moduleDirectory)) {
        const response = await prompts({
            type: 'text',
            name: 'exists',
            message: 'Module exists, override it? [n/Y]',
        });

        if (response.exists !== 'Y') return;
    }

    fs.makeDirectory(moduleDirectory);

    copyFiles(moduleDirectory);

    updateRoutesFile(moduleDirectory, route, component);

    updateServiceFile(moduleDirectory, serviceRoute || route, serviceClassName || module);

    updatePageData(moduleDirectory, module, table, role);
    updateForm(moduleDirectory, module, form);
    updatePermissions(module, table.formOptions.singleName);
    updateSidebar(module, sidebar, route, role);
    updateTranslations(module, translations);
    updateModules(module, route, '// admin-modules');

    fs.rename(moduleDirectory + '/components/module', moduleDirectory + '/components/' + component);
};