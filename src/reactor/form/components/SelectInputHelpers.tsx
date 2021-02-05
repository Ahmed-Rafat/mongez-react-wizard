import React from 'react';
import Is from '@flk/supportive-is';
import { Avatar } from '../../components';
import { trans } from './../../localization';
import { getItem, getItems } from '../utils/select-items';
import { makeStyles, MenuItem, Chip, styled } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    avatarSize: {
        width: '20px',
        height: '20px',
    },
    chip: {
        margin: 2,
    },
    smallText: {
        fontSize: theme.spacing(1.5)
    }
}));

const AvatarWrapper = styled('div')({
    marginRight: '0.4rem',
    display: 'inline-block',
    verticalAlign: 'middle',
});

const MenuItemGroup = React.forwardRef((props: any, ref: any) => {
    const { group } = props;
    return <MenuItem disabled ref={ref}>{group}</MenuItem>
});

const renderItems = (items, imagable) => {
    if (imagable && imagable === true) {
        imagable = 'image';
    }
    return items.map((item, index) => {
        return <MenuItem disabled={item.disabled === true} key={index} value={item.value}>
            {imagable &&
                <AvatarWrapper>
                    <Avatar src={item[imagable]} />
                </AvatarWrapper>
            }
            {item.label}
        </MenuItem>
    });
};

export const selectItems = (items, grouped, isLoading, imagable) => {
    if (isLoading) {
        items = [{
            label: trans('loading'),
            value: '',
            disabled: true,
        }];
    }

    if (grouped) {
        return items.map((item, index) => {
            return [<MenuItemGroup imagable={imagable} key={index} group={item.group} />, ...renderItems(item.items, imagable)];
        });
    }

    return renderItems(items, imagable);
};

export const RenderSelectedItem = ({ item, imagable }) => {
    const classes = useStyles();
    if (!item) return null;

    if (imagable && imagable === true) {
        imagable = 'image';
    }

    return (
        <>
            {imagable &&
                <AvatarWrapper>
                    <Avatar classes={{ root: classes.avatarSize }} src={item[imagable]} />
                </AvatarWrapper>
            }
            {item.label}
        </>
    );
};

const RenderMultipleSelectedItems = ({ selectedItems }) => {
    const classes = useStyles();

    return (
        <div className={classes.chips}>
            {selectedItems.map(item => (
                <Chip key={item.value} className={classes.chip} label={item.label} />
            ))}
        </div>
    )
};

export function RenderSelectedValues({ items, selected, opened, grouped, label, placeholder, imagable }): any {
    // Render Placeholder On Empty Selection as a text 

    if (Is.empty(selected) || Is.empty(items)) {
        if (label && !opened) return null;

        return placeholder ? trans(placeholder) : null;
        // return <MenuItem className={classes.smallText}>{placeholder}</MenuItem>
    }

    // if the selected is an array 
    // then render the selected items in chips for now
    if (Is.array(selected)) {
        return <RenderMultipleSelectedItems selectedItems={getItems(items, selected, grouped)} />
    }

    // render single selection
    return <RenderSelectedItem imagable={imagable} item={getItem(items, selected, grouped)} />
}