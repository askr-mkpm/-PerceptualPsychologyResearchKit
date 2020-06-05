//https://material-ui.com/components/text-fields/

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        }
    }),
);

const ExpTitle: React.FC = () =>
{
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="ExperimentTitle" variant="outlined" />
        </form>
    )
}

export default ExpTitle;