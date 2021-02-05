const { fs } = require('@flk/fs');
const { default: toCamelCase } = require('reinforcements/src/utilities/str/toCamelCase');
const { default: toStudlyCase } = require('reinforcements/src/utilities/str/toStudlyCase');

module.exports = function updateServiceFile(moduleDirectory, serviceRoute, serviceClassName) {
    const serviceFilePath = moduleDirectory + '/services/service.ts';

    const serviceFile = fs.get(serviceFilePath)
                        .replace(/ServiceClassName/g, toStudlyCase(serviceClassName))
                        .replace(/serviceObject/g, toCamelCase(serviceClassName))
                        .replace('service-route', serviceRoute);

    fs.put(serviceFilePath, serviceFile);
}
