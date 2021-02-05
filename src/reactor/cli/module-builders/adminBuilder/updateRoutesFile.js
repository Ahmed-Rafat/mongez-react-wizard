const { fs } = require('@flk/fs');

module.exports = function updateRoutesFile(moduleDirectory, route, component) {
    const filePath = moduleDirectory + '/routes.ts';

    const content = fs.get(filePath)
                      .replace('// module-imports', 
`import ${component} from './components/${component}/Page';
// module-imports`).replace('/route-path', route)
                   .replace('        // module-routes', `        {
            path: '/',
            component: ${component}
        },
        // module-routes`);
    fs.put(filePath, content);
}