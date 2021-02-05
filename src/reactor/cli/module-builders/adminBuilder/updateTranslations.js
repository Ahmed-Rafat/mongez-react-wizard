const { default: fs } = require("@flk/fs");
const { root, stringify } = require("./../helpers")

module.exports = function updateTranslations(module, translations) {
    if (translations.shared) {
        for (let localCode in translations.shared) {
            let path = root('src/shared/locales/' + localCode + '.ts');
            let content = fs.get(path).replace('    // translations', `${stringify(translations.shared[localCode], 0, false)}    // translations`)
                fs.put(path, content);
        }
    }
}