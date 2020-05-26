import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    title: {
        textTransform: 'capitalize'
    }
}));

const Paragraph = ({ id, title, body }) => {
    let { path } = useRouteMatch();
    const classes = useStyles();
    const to = `${path}/${id}`;

    const CustomLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )), [to]
    );

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography
                    className={classes.title}
                    variant="h5"
                    component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={CustomLink}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Paragraph;
