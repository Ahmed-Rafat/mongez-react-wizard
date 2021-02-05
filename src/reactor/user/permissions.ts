import Is from '@flk/supportive-is';
import { trans } from './../localization';

/**
 * Ignore from the given permissions the given roles
 * 
 * @param {object} permission 
 * @param {array}  
 */
export function ignoreRolesFromCrud(permission: any, ignoredRoles: string[]) {
    permission.roles = permission.roles.filter((permissionRole: any) => !ignoredRoles.includes(permissionRole.name));
    return permission;
}

/**
 * Get full roles for basic crud operations  
 * 
 * @param {string} permission 
 */
export function crud(permission: string, singularName: string, rolesTypes: any = {}) {
    singularName = trans(singularName);

    const roles = [
        {
            text: trans('listItems', trans(permission)),
            name: 'list',
        },
        {
            text: trans('addItem', singularName),
            name: 'add',
        },
        {
            text: trans('editItem', singularName),
            name: 'edit',
        },
        {
            text: trans('removeItem', singularName),
            name: 'delete',
        },
    ];

    if (Is.array(rolesTypes)) {
        roles.push(...rolesTypes);
    } else {
        for (let key in rolesTypes) {
            roles.push({
                text: trans(key + 'Item', singularName),
                name: key,
            });
        }
    }

    return {
        text: trans(permission),
        name: permission,
        roles
    };
}
