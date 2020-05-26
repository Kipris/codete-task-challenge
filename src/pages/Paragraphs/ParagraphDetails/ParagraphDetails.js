import React, { useState, useEffect } from "react";
import {  useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    h1: {
      marginBottom: theme.spacing(1),
      textTransform: 'capitalize'
    },
    p: {
      marginBottom: theme.spacing(2)
    },
    progress: {
        position: 'relative',
        marginTop: '30px',
        marginBottom: '30px',
        left: '50%',
        marginLeft: '-20px'
    }
  }));

const ParagraphDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const { paragraphId } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);

    async function fetchParagraph() {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${paragraphId}`);
        response
          .json()
          .then(res => {
            setTitle(res.title);
            setBody(res.body);
            setLoading(false);
          });
    }

    useEffect(() => {
        fetchParagraph();
    }, [])

    return (
        loading 
        ? <CircularProgress className={classes.progress} />
        : <>
            <Typography 
                className={classes.h1}
                component="h1" 
                variant="h4" >
                {title}
            </Typography>
            <Typography 
                className={classes.p}
                component="p">
                {body}
            </Typography>
            <Button onClick={() => { history.goBack() }}>
                Back
            </Button>
        </>
    );
}
 
export default ParagraphDetails;
