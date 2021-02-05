
import history from './router-history';
import concatRoute from './concat-route';
import modulesList, { setModules } from './modules-list';
import { addRouter, FULL_PAGE, partOf, group } from './routes-list';
import { queryString, hash, BASE_NAME, BASE_URL } from './router-history';
import appsList, { addBaseAppPath, setCurrentBseAppPath, getCurrentBseAppPath } from './apps-list';
import { url, navigateTo, navigateBack, updateQueryString, hasInitialLocaleCode, switchLang, refresh, fullRoute, currentRoute } from './navigator';

export type { Module, ModuleInfo, ModulesList } from './modules-list';
export type { Route, Layout, GroupOptions, BasicComponentProps } from './routes-list';

export { FULL_PAGE };
export { BASE_URL, BASE_NAME };
export { setModules, modulesList };
export { default as scan } from './scanner';
export { default as Renderer } from './renderer';
export { concatRoute, history };
export { default as setCurrentLocale } from './update-current-localization';
export { addBaseAppPath, setCurrentBseAppPath, getCurrentBseAppPath, appsList };
export { navigateTo, navigateBack, updateQueryString, refresh, hasInitialLocaleCode, currentRoute, url, switchLang, fullRoute };


export default {
    add: addRouter,
    partOf,
    group,
    hash,
    get queryString() {
        return queryString();
    }
};