import React, { useState }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        urlInput: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        submitButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }),
);

const VideoForm: React.FC<{props: any}> = ({props}) =>{
    const classes = useStyles();
    const [videoUrl, setVideoUrl] = useState<string>("");

    const handleVideoUrl = (e: any) =>
    {
        setVideoUrl(e.target.value);
    }

    const resetField = ()  =>
    {
        setVideoUrl("");
    }

    const callAddVideoUrl = (e: any) =>
    {
        e.preventDefault();
        props.add(videoUrl);
        resetField;
    }

    return (
        <div>
            <form className={classes.urlInput} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic"
                    label="URL"
                    variant="outlined" 
                    value = {videoUrl}
                    onChange = {handleVideoUrl}
                />
            </form>
            <div className={classes.submitButton}>
                <Button 
                    variant="contained"
                    onClick = {callAddVideoUrl}
                    >Add
                </Button>
            </div>
        </div>
    );
}

export default VideoForm;