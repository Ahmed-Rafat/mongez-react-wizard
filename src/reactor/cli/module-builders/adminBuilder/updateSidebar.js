const { default: fs } = require("@flk/fs");
const { currentModule, stringify } = require("./../helpers");

module.exports = function updateSidebar(module, sidebar, route, role) {
    if (! sidebar || ! sidebar.icon) return;

    let path = currentModule('helpers/sidebar-items-list.ts');
    let content = fs.get(path);

    if (! content.includes(sidebar.icon.as)) {
        content = content.replace('// icons-list', 
        `import ${sidebar.icon.as} from '${sidebar.icon.path}';
// icons-list`);
    }

const routeSettings = {
    text: `trans('${module}')`,
    route,
    icon: sidebar.icon.as,
    role: `${role}.list`,
};

    content = content.replace('    // sidebar-items', 
`${stringify(routeSettings, 1, true, ['text', 'icon'])}    // sidebar-items`);

    fs.put(path, content);
}