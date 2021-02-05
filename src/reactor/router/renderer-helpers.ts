import config from './../config';
import modulesList, { ModuleInfo } from "./modules-list";
import concatRoute from './concat-route';
import appsList, { setCurrentBseAppPath } from "./apps-list";

const localeCodes = config.get('locales', []);

/**
 * Check if the given firstSegment is part of modules list
 * 
 * @param   {object} firstSegment
 * @returns   
 */
export function isPartOfLazyModules(firstSegment: string): ModuleInfo {
    return modulesList[firstSegment];
}

/**
 * Get first segment of the given location data
 * 
 * @param   {object} location
 * @returns {string}   
 */
export function firstSegmentOfRoute(location: Location): string {
    let [firstSegment, secondSegment, thirdSegment] = location.pathname.replace(/^\//, '').split('/');
    let segment = firstSegment;

    // if first segment is locale code, then take the second

    // en
    if (localeCodes[firstSegment]) {
        // if there is no second segment
        // then return empty not undefined
        if (appsList.includes('/' + secondSegment)) {
            setCurrentBseAppPath(secondSegment);
            segment = thirdSegment || '';
        } else {
            segment = secondSegment || '';
        }
    } else if (appsList.includes('/' + segment)) {
        segment = secondSegment;
        setCurrentBseAppPath(firstSegment);
    }

    // check the third

    return concatRoute(segment);
}
