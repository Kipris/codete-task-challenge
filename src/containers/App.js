import React, { useState, useEffect, useReducer } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchForm from '../components/SearchForm/SearchForm';
import Paragraphs from '../components/Paragraphs/Paragraphs';
import ParagraphPagination from '../components/ParagraphPagination/ParagraphPagination';
import FullParagraph from '../components/Paragraphs/FullParagraph';

import reducer from './../store/reducers/reducer';
import * as actions from './../store/actions/index';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  },
  h1: {
    marginBottom: theme.spacing(3)
  },
  progress: {
    position: 'relative',
    marginTop: '30px',
    marginBottom: '30px',
    left: '50%',
    marginLeft: '-20px'
  }
}));

const App = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const query = new URLSearchParams(history.location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const search = query.get('search') || '';

  // const [paragraphs, setParagraphs] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);

  const [searchString, setSearchString] = useState(search);
  // const [searchResults, setSearchResults] = useState([]);
  const [paragraphsPerPage, setParagraphsPerPage] = useState(5);
  // const [paragraphsCount, setParagraphsCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);

  const loading = useSelector(state => state.paragraph.loading, shallowEqual);
  const paragraphs = useSelector(state => state.paragraph.paragraphs, shallowEqual);
  const paragraphsCount = useSelector(state => state.paragraph.pagination.totalCount, shallowEqual);

  const handleSearch = (event, value) => {
    setSearchString(value);
  }

  const handlePaginate = (event, value) => {
    setCurrentPage(value);
  }

  useEffect(() => {
    // if (currentPageIsFetched) {
    //   const fetchedPages = useSelector(state => state.paragraph.pagination.pages, shallowEqual);
    //   const currentPageFirstId = currentPage * paragraphsPerPage - paragraphsPerPage + 1;
    //   let currentPageIsFetched = null;
    //   for (let page of fetchedPages) {
    //     currentPageIsFetched = page.ids.includes(currentPageFirstId)
    //   }
    //   const startPosition = currentPage * paragraphsPerPage - paragraphsPerPage;
    //   const count = paragraphsPerPage;
    //   paragraphs = Object.assign({}, Object.values({...paragraphs}).splice(startPosition, count));
    // } else {
      dispatch(actions.fetchParagraphs({
        page: currentPage,
        searchString,
        paragraphsPerPage,
      }));
    // }
  }, [currentPage])

  let main = <CircularProgress className={classes.progress} />;
  if (paragraphs && !loading) {
    main = (
      <>
        <Paragraphs 
          paragraphs={Object.values(paragraphs)} /> 
        <ParagraphPagination 
          count={Math.ceil(paragraphsCount / paragraphsPerPage)}
          page={page}
          handlePaginate={handlePaginate} />  
      </>
    )
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper elevation={1} className={classes.paper}>
          <Switch>
            <Route path='/paragraphs/:paragraphId'>
              <FullParagraph />
            </Route>
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
                  searchString={searchString}
                  handleSearch={handleSearch} />
                {main}
              </>
            </Route>
            <Redirect to='/paragraphs' />
          </Switch> 
        </Paper>
      </Container>
    </>
  );
}

export default App;
