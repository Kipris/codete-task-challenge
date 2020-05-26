import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import {
  Switch,
  Redirect,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const useStyles = makeStyles((theme) => ({
    pagination: {
      '& > ul': {
        justifyContent: 'center'
      }
    }
}));

const ParagraphPagination = ({count, page, handlePaginate}) => {
  const classes = useStyles();
  const {url} = useRouteMatch();
  return (
    <Route>
      {() => {
        return (
          <Pagination
            className={classes.pagination}
            page={page}
            count={count}
            onChange={handlePaginate}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/paragraphs${item.page === 1 ? '' : `/?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        );
      }}
    </Route>
  )
}
 
export default ParagraphPagination;