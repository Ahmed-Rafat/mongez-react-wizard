import events from './../events';
import Is from '@flk/supportive-is';
import { ltrim } from "reinforcements";
import concatRoute from './concat-route';
import { getCurrentBseAppPath } from "./apps-list";
import history, { BASE_URL } from "./router-history";
import { SWITCHING_LOCALE_CODE_EVENT } from "./../events";
import { queryString as objectToQueryString } from 'object-query-string';
import { getLocaleCodes, updateCurrentLocaleCode, getCurrentLocaleCode } from "./..//localization";

let currentFullRoute: string, fullRouteWithoutLocaleCode: string;

let previousRoute = '/';

/**
 * General full url for the given route
 *  
 * @param {string} route 
 * @returns {string}
 */
export function url(path: string) {
    return BASE_URL + path;
}

/**
 * Navigate back to the previous route
 * @returns {string} 
 */
export function navigateBack(defaultRoute: string = '') {
    if (!previousRoute) {
        return navigateTo(defaultRoute);
    }

    goTo(previousRoute);
}

/**
 * Set the full current route and the current route without the locale code
 * 
 * @param   {string} route
 * @returns {void} 
 */
function updateFullRoute(route: string) {
    previousRoute = currentFullRoute;
    // /en/users
    currentFullRoute = route;

    // remove any possible locale code
    let regex = new RegExp(`^/(${getLocaleCodes().join('|')})`);
    // let regex = new RegExp('^/(en|ar)')

    fullRouteWithoutLocaleCode = currentFullRoute.replace(regex, function (_matched, localeCode): string {
        updateCurrentLocaleCode(localeCode);
        return '';
    });
}

/**
 * Replace the query string of current route
 * This method will not trigger router change
 * 
 * @param {string|object} queryString 
 * @returns {void}
 */
export function updateQueryString(queryString: string) {
    if (Is.object(queryString)) {
        queryString = objectToQueryString(queryString);
    }

    const [fullUrl] = window.location.href.split('?');

    window.history.replaceState(null, '', fullUrl + '?' + ltrim(queryString, '?'));
}

/**
 * navigate to the given path
 * 
 * @param  {string} path 
 */
export function navigateTo(path: string, localeCode: string | null = null) {
    // login >> valid
    // /login >> valid

    path = concatRoute(getCurrentBseAppPath(), path);

    // /users
    // if current initial locale code
    // /en/users   
    if (localeCode === null && hasInitialLocaleCode()) {
        localeCode = getCurrentLocaleCode();
    }

    if (localeCode) {
        path = concatRoute(localeCode, path);
    }

    goTo(path);
}

/**
 * Go to the given full path
 * 
 * @param  {string} path
 */
function goTo(path: string) {
    // stackBuilder.add();
    history.push(path);
}

/**
 * Get current route 
 * 
 * @returns {string}
 */
export function fullRoute() {
    return history.location.pathname;
}

/**
 * Get the route without the locale code
 * 
 * @returns  {string}
 */
export function currentRoute() {
    let route = ltrim(fullRoute(), '/' + getCurrentLocaleCode()) || '/';

    route = ltrim(route, getCurrentBseAppPath());

    return concatRoute(route);
}

/**
 * Force reload current route content
 * 
 * @returns {void} 
 */
export function refresh() {
    // stackBuilder.remove(currentRoute());
    goTo(fullRoute());
}

/**
 * Navigate to current location and switch language
 * 
 * @param  {string} localeCode
 */
export function switchLang(localeCode: string) {
    let route = currentRoute();
    events.trigger(SWITCHING_LOCALE_CODE_EVENT, localeCode);

    navigateTo('/' + route, localeCode);
}

/**
 * Initialize Navigator
 */
export default function initiateNavigator() {
    /**
     * Listen to any router navigation to update current full route 
     * and current route without locale codes
     */
    history.listen((location: Location) => {
        updateFullRoute(location.pathname);
    });

    updateFullRoute(history.location.pathname || '/');
}

/**
 * Check if current route has a locale code
 * By comparing the currentFullRoute with fullRouteWithoutLocaleCode
 * 
 * @returns  {boolean} 
 */
export function hasInitialLocaleCode() {
    return currentFullRoute !== fullRouteWithoutLocaleCode;
}