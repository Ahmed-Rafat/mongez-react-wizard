import config from "./../config";
import { Obj } from "reinforcements";

/**
 * List of locale code object
 * 
 * @const {object}
 */
const localeCodesList = config.get('locales', []);

/**
 * Get locale codes
 * 
 * @returns {Array}
 */
export function getLocaleCodes() {
    return Object.keys(config.get('locales', []));
}

/**
 * List of locale codes only in an array
 *
 * @const {array}
 */
export const localeCodes = Object.keys(localeCodesList);

/**
 * Current locale code that will be changed later for locale change in the router
 *  
 * @var  {string}
 */
let currentLocaleCode = document.documentElement.lang;

/**
 * Get direction of the given locale code
 * 
 * @param   {string} localeCode 
 * @returns {string}
 */
export function directionOf(localeCode: string) {
    return Obj.get(localeCodesList, localeCode + '.direction');
}

/**
 * Get current direction
 * 
 * @returns  {string}
 */
export function currentDirection() {
    return directionOf(currentLocaleCode);
}

/**
 * Get current locale code
 * 
 * @returns {string}
 */
export function getCurrentLocaleCode() {
    return currentLocaleCode;
}

/**
 * Update current locale code 
 * 
 * @param   {string} localeCode
 * @returns {void} 
 */
export function updateCurrentLocaleCode(localeCode: string) {
    if (localeCode === currentLocaleCode) return;

    document.documentElement.dir = directionOf(localeCode);
    document.documentElement.lang = localeCode;
    currentLocaleCode = localeCode;
}