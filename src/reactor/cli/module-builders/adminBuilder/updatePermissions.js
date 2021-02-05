const { default: fs } = require("@flk/fs");
const { currentModule } = require("./../helpers")

module.exports = function updatePermissions(module, singleName) {
    let path = currentModule('helpers/permissions.ts');
    let content = fs.get(path).replace('    // permissions-list', 
`    crud('${module}', '${singleName}'),
    // permissions-list`);

    fs.put(path, content);
}