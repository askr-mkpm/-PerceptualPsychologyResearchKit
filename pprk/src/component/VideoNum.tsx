//https://material-ui.com/components/text-fields/

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
        // submitButton: {
        //     '& > *': {
        //         margin: theme.spacing(1),
        //     },
        // }
    }),
);

const VideoNum: React.FC = () =>
{
    const classes = useStyles();
    // const [videoLists, setVideoList] = useState<string[]>(["test"]);
    // const [videoElement, setVideoElement] = useState<String>();

    // const handleVideoElement = (event: React.ChangeEvent<HTMLInputElement>): void =>
    // {
    //     const value: string = String(event.target.value);
    //     setVideoElement(value);
    //     console.log(value);
    // }

    // const handleVideoList = (): void =>
    // {
    //     // let valuete = videoElement;
    //     // event.preventDefault();
    //     // // setVideoList([...videoLists, valuete]);
    //     setVideoElement("");
    // }

    return (
        <div>
            <form className={classes.urlInput} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic"
                    label="URL"
                    variant="outlined" 
                    // value = {videoElement}
                    // onChange = {handleVideoElement}
                />
            </form>

            {/* <List>
                {videoLists.map(videoList => (
                    <ListItem key={videoList}>{videoList}</ListItem>
                ))}
            </List>

            <div className={classes.submitButton}>
                <Button 
                    variant="contained"
                    // onClick = {handleVideoList}
                    //videoelementをlistにいれたい
                    >submit
                </Button>
            </div> */}
        </div>
    );
}

export default VideoNum;