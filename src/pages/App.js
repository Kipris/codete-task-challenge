import React, { useState, useEffect} from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useDebounce } from 'use-debounce';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchForm from './SearchForm/SearchForm';
import Paragraphs from './Paragraphs/Paragraphs';
import ParagraphPagination from './ParagraphPagination/ParagraphPagination';
import ParagraphsRoute from './Paragraphs/ParagraphsRoute';
import ParagraphDetailsRoute from './Paragraphs/ParagraphDetails/ParagraphDetailsRoute';
import ParagraphDetails from './Paragraphs/ParagraphDetails/ParagraphDetails';

import reducer from '../store/reducers/reducer';
import * as actions from '../store/actions/index';

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

  const [currentPage, setCurrentPage] = useState(page);
  const [searchString, setSearchString] = useState(search);
  const [paragraphsPerPage, setParagraphsPerPage] = useState(5);

  const [debouncedPage] = useDebounce(currentPage, 500);
  const [debouncedSearchString] = useDebounce(searchString, 500);

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
    dispatch(actions.fetchParagraphs({
      page: debouncedPage,
      searchString: debouncedSearchString,
      paragraphsPerPage,
    }));
    let searchParam = debouncedPage === 1 
      ? ''
      : `page=${debouncedPage}`;
    if (debouncedSearchString.trim().length) {
      searchParam = debouncedPage === 1 
        ? `search=${debouncedSearchString}` 
        : `page=${debouncedPage}&search=${debouncedSearchString}`;
    };
    history.push({
        pathname: '/paragraphs/',
        search: searchParam
    })
  }, [debouncedPage, debouncedSearchString])

  let main = <CircularProgress className={classes.progress} />;
    if (paragraphs && !loading) {
        main = (
            <>
                <Paragraphs 
                    paragraphs={Object.values(paragraphs)} /> 
                <ParagraphPagination 
                    count={Math.ceil(paragraphsCount / paragraphsPerPage)}
                    page={debouncedPage}
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
              <ParagraphDetails />
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
            {/* <ParagraphsRoute 
              paragraphs={paragraphs}
              loading={loading}
              paragraphsCount={paragraphsCount}
              paragraphsPerPage={paragraphsPerPage}
              page={page}
              handlePaginate={handlePaginate}
              handleSearch={handleSearch} /> */}
            <Redirect to='/paragraphs' />
          </Switch> 
        </Paper>
      </Container>
    </>
  );
}

export default App;
