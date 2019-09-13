import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BasicMapExample } from "./basic";
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import 'ol/ol.css'
import { MultipleMapsExample } from './multipleMaps';
import { ChangeMapOnInteractExample } from './changeMapOnInteract';
import { ControlsOutsideMapExample } from './controlsOutsideMap';
import { CustomControlsExample } from './customControls';
import { NonOlControlExample } from './nonOlControlExample';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }

    clearError() {
        this.setState(() => {
            return { hasError: false };
        });
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div>
                <h3>Something went wrong.</h3>
                <button onClick={() => { this.clearError(); }}>Try again</button>
            </div>
        );
      }
  
      return this.props.children; 
    }
}
  
  
const history = createBrowserHistory();

enum ExampleType {
    Basic,
    ControlOutsideMap,
    ModifyMap,
    MultipleMaps,
    CustomControls,
    NonOlControlExample,
}
  
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

function RootComponent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(ExampleType.Basic);

    function handleChange(event: ChangeEvent<{}>, newValue: ExampleType) {
        setValue(newValue);
    }

    let TabPanel;
    switch (value) {
        case ExampleType.Basic:
            TabPanel = <BasicMapExample />;
            break;
        case ExampleType.ControlOutsideMap:
            TabPanel = <ControlsOutsideMapExample />;
            break;
        case ExampleType.CustomControls:
            TabPanel = <CustomControlsExample />;
            break;
        case ExampleType.ModifyMap:
            TabPanel = <ChangeMapOnInteractExample />;
            break;
        case ExampleType.MultipleMaps:
            TabPanel = <MultipleMapsExample />;
            break;
        case ExampleType.NonOlControlExample:
            TabPanel = <NonOlControlExample />;
            break;
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Basic demo" value={ExampleType.Basic} />
                    <Tab label="Modify map demo" value={ExampleType.ModifyMap} />
                    <Tab label="Controls outside map demo" value={ExampleType.ControlOutsideMap} />
                    <Tab label="Custom Controls demo" value={ExampleType.CustomControls} />
                    <Tab label="Non-Ol control demo" value={ExampleType.NonOlControlExample} />
                    <Tab label="Multiple maps demo" value={ExampleType.MultipleMaps} />
                </Tabs>
            </AppBar>
            <ErrorBoundary>
                {TabPanel}
            </ErrorBoundary>
        </div>
    )
}

ReactDOM.render(<RootComponent />, document.getElementById('appTarget'));