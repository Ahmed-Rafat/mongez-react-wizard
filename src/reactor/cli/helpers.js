const BASE_ROOT = process.cwd();

function root(path) {
    return BASE_ROOT + '/' + path;
}

function modules(path) {
    return root('src/modules/' + path);
}

function currentModule(path) {
    return modules(global.app + '/' + path);
}

function currentAppName() {
    return global.app;
}

function frontModules(path) {
    return modules('front-office/' + path);
}

function tab(text, numberOfTabs) {
    return '\t'.repeat(numberOfTabs) + text;
};

function tabN(text, numberOfTabs) {
    return tab(text, numberOfTabs) + '\n';
};


function stringify(object, indent, withBraces = true, skips = []) {
    let data = withBraces ? tabN('{', indent) : '';
    for (let key in object) {
        let value = object[key];
        if (typeof value === 'string' && !skips.includes(key)) {
            value = `'${value}'`;
        } else if (typeof value === 'object') {
            value = stringify(value, indent + 1, withBraces);
        }
        data += tabN(`${key}: ${value},`, indent + 1);
    }

    if (withBraces) {
        data += tabN('},', indent);
    }

    return data;
}


module.exports = {
    root,
    modules,
    currentModule,
    currentAppName,
    frontModules,
    tab,
    tabN,
    stringify,
}
