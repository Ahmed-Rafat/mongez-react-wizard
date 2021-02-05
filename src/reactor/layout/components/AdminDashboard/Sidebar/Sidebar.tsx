import React from 'react';
import config from './../../../../config';
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SidebarContext from './SidebarContext';
import Divider from '@material-ui/core/Divider';
import SidebarListItem from './SidebarListItem';
import { trans } from './../../../../localization';
import { currentRoute } from './../../../../router';
import { useTheme } from '@material-ui/core/styles';
import useLayoutClasses from './../../../utils/style';
import IconButton from '@material-ui/core/IconButton';
import SidebarListItemGroup from './SidebarListItemGroup';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import sidebarItems from './../../../utils/admin/sidebar-items-list';
import permissionsObserver from './../../../utils/admin/permissionsObserver';

export default function Sidebar(props) {
    let { onClose, open } = props;
    const theme = useTheme();
    const classes: any = useLayoutClasses();
    const route = currentRoute();

    const Heading = config.get('dashboard.sidebar.heading', props => <h1 {...props}>{trans('appName')}</h1>);

    const sidebarContextValue = {
        currentRoute: route,
    };

    let itemsList = sidebarItems.getItems().filter(item => {
        if (item.role) {
            return permissionsObserver.isGranted(item.role);
        }

        if (item.items) {
            item.items = item.items.filter(item => {
                if (item.role) {
                    return permissionsObserver.isGranted(item.role);
                }

                return true;
            });

            return item.items.length > 0;
        }

        return true;
    }).map((item: any, index) => {
        // in this case, we'll return itemGroup
        if (item.items) {
            return <SidebarListItemGroup
                key={index}
                text={item.text}
                onClick={onClose}
                icon={item.icon}
                items={item.items}
            />;
        }

        // otherwise, we'll just return a list item
        return <SidebarListItem
            key={index}
            text={item.text}
            icon={item.icon}
            onClick={onClose}
            route={item.route} />;
    });
    return (
        <SidebarContext.Provider value={sidebarContextValue}>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={open}
                onClose={onClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Box flexGrow={1}>
                        <Heading onClick={onClose} />
                    </Box>
                    <Box>
                        <IconButton onClick={onClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </Box>
                </div>
                <Divider />

                <List
                    component="nav"
                    className={classes.sidebar}
                >
                    {itemsList}
                </List>
            </Drawer>
        </SidebarContext.Provider>
    );
}