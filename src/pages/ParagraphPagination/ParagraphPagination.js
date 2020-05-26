import React from 'react';
import { Route } from 'react-router';
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

const ParagraphPagination = ({ count, page, handlePaginate }) => {
  const classes = useStyles();
  return (
    <Route>
      {() => {
        return (
          <Pagination
            className={classes.pagination}
            page={page}
            count={count}
            onChange={handlePaginate}
            renderItem={(item) => {
              return (
                <PaginationItem {...item} />
              );
            }}
          />
        );
      }}
    </Route>
  )
}

export default ParagraphPagination;
