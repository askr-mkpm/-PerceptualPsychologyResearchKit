//https://material-ui.com/components/text-fields/

import React, { useState }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        videoNum: {
            '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        urlInput: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        }
    }),
);

const VideoNum: React.FC = () =>
{
    const classes = useStyles();
    const [numValue, setNumValue] = useState(0)

    const handleNumValue = (event: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const value: number = Number(event.target.value);
        setNumValue(value);
        console.log(value);
    }

    return (
        <form className={classes.videoNum} noValidate autoComplete="off">
        <div>
            <TextField
                id="filled-number"
                label="VideoNum"
                type="number"
                value = {numValue}
                onChange = {handleNumValue}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
            />
            <form className={classes.urlInput} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic"
                    label="URL"
                    variant="outlined" 
                    // multiLine={true}
                    rows={2}
                />
            </form>
        </div>
        </form>
    );
}

export default VideoNum;