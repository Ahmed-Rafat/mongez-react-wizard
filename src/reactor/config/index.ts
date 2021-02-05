import { Obj } from 'reinforcements';

interface NormalObject {
    [key: string]: any;
}

let configurationsList: NormalObject = {};

const config = {
    /**
     * Set the given key/value in our configurations list
     * 
     * @param   {string | NormalObject} key
     * @param   {any} value
     * @returns void
     */
    set(key: string | NormalObject, value: any = null) {
        // case one one argument only is passed and is object
        if (arguments.length === 1) {
            let data = key;
            configurationsList = Obj.merge(configurationsList, data);
        } else {
            configurationsList[key as string] = value;
        }
    },
    /**
     * Get the value for the given key, otherwise return the given default value
     * P.S data will be grabbed using dot notation
     * i.e name.first
     * @param   {string} key
     * @param   {any} defaultValue
     * @returns any
     */
    get(key: string, defaultValue: any = null) {
        return Obj.get(configurationsList, key, defaultValue);
    },
    /**
     * Get all configurations 
     */
    list() {
        return configurationsList;
    },
};

export default config;