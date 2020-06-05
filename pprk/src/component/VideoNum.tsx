//https://material-ui.com/components/text-fields/

import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
    }),
);

const VideoNum: React.FC = () =>
{
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
        <div>
            <TextField
            id="filled-number"
            label="VideoNum"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            />
        </div>
        </form>
    );
}

export default VideoNum;