import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as actions from '../../../store/actions/index';

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
  const dispatch = useDispatch();

  const { paragraphId } = useParams();

  const paragraph = useSelector(state => state.paragraphs.paragraph, shallowEqual);
  const loading = useSelector(state => state.paragraphs.loading, shallowEqual);

  useEffect(() => {
    dispatch(actions.fetchParagraph({ paragraphId }))
  }, [])

  let details = <CircularProgress className={classes.progress} />;
  if (!loading && paragraph) {
    details = (
      <>
        <Typography
          className={classes.h1}
          component="h1"
          variant="h4" >
          {paragraph.title}
        </Typography>
        <Typography
          className={classes.p}
          component="p">
          {paragraph.body}
        </Typography>
        <Button onClick={() => { history.goBack() }}>
          Back
            </Button>
      </>
    )
  }

  return details;
}

export default ParagraphDetails;
