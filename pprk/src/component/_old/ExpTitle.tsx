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
        },
        multilineColor:{
            color:'white'
        },
    }),
    
);

const ExpTitle: React.FC = () =>
{
    const classes = useStyles();

    const cancelReturn = (e: React.FormEvent<HTMLFormElement>): void =>
    {
        e.preventDefault();
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={cancelReturn}>
            <TextField 
                id="standard-basic" 
                label="ExperimentTitle" 
                variant="outlined" 
                inputProps={{className: classes.multilineColor }}
                InputLabelProps={{ className: classes.multilineColor }}
                />
        </form>
    )
}

export default ExpTitle;