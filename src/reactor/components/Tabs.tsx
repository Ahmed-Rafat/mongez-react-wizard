import React from 'react';
import PropTypes from 'prop-types';
import Is from '@flk/supportive-is';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import MaterialTab from '@material-ui/core/Tab';
import MaterialTabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles, styled } from '@material-ui/core/styles';

export { MaterialTab as TabHead, TabPanel as TabBody };

interface ITabPanel {
  children: any;
  value?: any;
  lazy?: boolean;
  index?: any;
}

function TabPanel(props: ITabPanel) {
  const { children, value, lazy, index, ...other } = props;

  let tabContent;

  if (lazy) {
    tabContent = value === index && (<Typography component="div">{children}</Typography>);
  } else {
    tabContent = <Box p={3} children={children} />
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabContent}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      // flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: (props: any) => {
      return props.appBar;
    }
  };
});

interface TabProps {
  label: string,
  children: any;
  index?: any;
  value?: any;
  icon?: any;
  lazy?: boolean;
}

export function Tab(props: TabProps) {
  return <React.Fragment {...props} />;
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  index: PropTypes.any,
  value: PropTypes.any
};

const IconWrapper = styled('span')({
  // verticalAlign: 'middle',
  marginRight: '0.5rem',
});

const MaterialLabelWrapper = styled('span')({
  verticalAlign: 'top',
});

function MaterialIcon(props: any) {
  if (!props.icon) return null;

  return (
    <IconWrapper>{<props.icon />}</IconWrapper>
  )
}

function MaterialTabLabel(props: any) {
  return (
    <span>
      <MaterialIcon {...props} />
      <MaterialLabelWrapper>{props.label}</MaterialLabelWrapper>
    </span>
  )
}

export default function Tabs(props) {
  let { value: defaultValue = 0, barBackground = 'secondary', barTextColor, onChange, lazy, children } = props;
  const styleSettings: any = {
    appBar: {},
  };

  if (!['primary', 'secondary'].includes(barBackground)) {
    styleSettings.appBar.background = barBackground;
    barBackground = undefined; // disable the coloring
  }

  if (barTextColor) {
    styleSettings.appBar.color = barTextColor;
  }

  const classes = useStyles(styleSettings);
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    onChange && onChange(newValue);
  };

  if (!Is.array(children)) {
    children = [children];
  }

  return (
    <div className={classes.root}>
      <AppBar classes={{ root: classes.appBar }} color={barBackground} position="static">
        <MaterialTabs value={value} onChange={handleChange}>
          {children.map((tab, index) => (
            <MaterialTab value={tab.props.index || tab.props.value || index} key={index} label={<MaterialTabLabel {...tab.props} />} />
          ))}
        </MaterialTabs>
      </AppBar>
      {children.map((tab, index) => (
        <TabPanel key={index} lazy={tab.props.lazy !== undefined ? tab.props.lazy : lazy} value={value} index={tab.props.index || tab.props.value || index} children={tab.props.children} />
      ))}
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.any.isRequired,
  value: PropTypes.any,
  barBackground: PropTypes.string,
  barTextColor: PropTypes.string,
  onChange: PropTypes.func,
  lazy: PropTypes.bool,
};