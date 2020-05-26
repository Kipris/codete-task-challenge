import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Paragraphs from './Paragraphs';
import ParagraphPagination from './../ParagraphPagination/ParagraphPagination';
import SearchForm from './../SearchForm/SearchForm';

const useStyles = makeStyles((theme) => ({
    progress: {
      position: 'relative',
      marginTop: '30px',
      marginBottom: '30px',
      left: '50%',
      marginLeft: '-20px'
    }
}));

const ParagraphsRoute = (props) => {
    const classes = useStyles();

    let main = <CircularProgress className={classes.progress} />;
    if (props.paragraphs && !props.loading) {
        main = (
            <>
                <Paragraphs 
                    paragraphs={Object.values(props.paragraphs)} /> 
                <ParagraphPagination 
                    count={Math.ceil(props.paragraphsCount / props.paragraphsPerPage)}
                    page={props.page}
                    handlePaginate={props.handlePaginate} />  
            </>
        )
    }

    return (
        <Route path='/paragraphs'>
            <>
            <Typography 
                className={classes.h1}
                component="h1" 
                variant="h4" 
                align="center">
                Paragraphs
            </Typography>
            <SearchForm 
                searchString={props.searchString}
                handleSearch={props.handleSearch} />
            {main}
            </>
        </Route>
    );
}
 
export default ParagraphsRoute;