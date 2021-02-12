import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Paper, Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import QuestionComponent from './components/question_component';
import {historyQuestions, MathQuestions, ScienceQuestions, TechnologyQuestions} from './questions/questions_list';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
        <Box p={3}>
            <Typography>{children}</Typography>
        </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        height:"550px",
        width:'100%',
        maxWidth:'1000px',
        margin: '5em auto',
        border:'1px solid silver'
    },
    style: {
        "& .tab": {
            fontSize:'1.2em'
        },
    }
});

export default function App() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <React.Fragment>
        <Paper className={classes.root}>
            <Tabs aria-label="simple tabs example" className={classes.style}
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered>
                <Tab className="tab" label="History" {...a11yProps(0)} />
                <Tab className="tab" label="Mathematics" {...a11yProps(1)} />
                <Tab className="tab" label="Science" {...a11yProps(2)} />
                <Tab className="tab" label="Technology" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <QuestionComponent questions={historyQuestions} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <QuestionComponent questions={MathQuestions} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <QuestionComponent questions={ScienceQuestions} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <QuestionComponent questions={TechnologyQuestions} />
            </TabPanel>
        </Paper>
    </React.Fragment>
    );
}
