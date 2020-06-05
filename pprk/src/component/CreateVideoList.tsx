//https://material-ui.com/components/buttons/

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        },
    }),
);

const CreateVideoList: React.FC = () =>
{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained">CreateList</Button>
        </div>
    );
}

export default CreateVideoList;