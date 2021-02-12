// import './App.css';
import React, {useState} from 'react';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
        primary: {
        main: purple[400],
        },
    },
});

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius:'4px',
        color: 'white',
        height:'400px',
        width:'100%',
        maxWidth: 960,
        margin: '3em 0',
        '& h3':{fontSize:'2.2em', fontWeight:'500'},
        '& h4':{fontSize:'1.6em', fontWeight:'500', margin:'0.5em 0'}
    },
    btn: {
        margin:'0.5em',
        fontSize:'1.2em',
        padding:'0.5em 0'
    },
    btn2:{
        fontSize:'1.3em',
        padding:'0.5em 1em',
        margin:'2em 0',justifyContent:'center'
    },
});

const QuestionComponent = ({questions},props) => {
    
    const classes = useStyles(props);

    const [score, setScore] = useState(0);

    const [showCorrect, setShowCorrect] = useState(false);

    const [currentQ, setCurrentQ] = useState(0);

    const handleAnswer = (correct) => {
        if(correct){
        setScore(score + 1);
        }

        const nextQ = currentQ + 1;
        if(nextQ < questions.length){
        setCurrentQ(nextQ);  
        }  
        else{
        setShowCorrect(true);
        }
    };

    function finalScore () {
        if(score>2){
        return (
            <Typography variant="h2" align='center'> 
            Your score total is {score}<br/>
            <br/>Congratulations!<br/>You passed the quiz!
            </Typography>
        )
        }
        else{
        return (
            <div>
                <Typography variant="h2" align='center'>
                Your score total is {score}<br/><br/>
                Sorry! You did not pass the quiz!
                </Typography>
                <Box textAlign='center'>
                    <Button  variant="contained" color="secondary" onClick={() => window.location.reload(true)} className={classes.btn2}>Try Again</Button>
                </Box>
                
            </div>
            
        )
        }
    }  
    
    return (
        <Container className={classes.root}>
            {showCorrect ? (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                {finalScore()}
                </Grid>
            </Grid>
            ):(
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">Question {currentQ + 1}/{questions.length}</Typography>
                    <Typography variant="h3" component="h3" >{questions[currentQ].titleQuestion}</Typography> 
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <ThemeProvider theme={theme}>
                        {questions[currentQ].answerQuestion.map((item, key)=>(
                            <Grid item xs={6}>
                                <Button className={classes.btn} key={key} variant="contained" fullWidth color="primary" onClick={()=>handleAnswer(item.isCorrect)}>{item.answer}</Button>
                            </Grid>
                        ))}
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Grid>
            )}
        </Container>
    );
}

export default QuestionComponent;
