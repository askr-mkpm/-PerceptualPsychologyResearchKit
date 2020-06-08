import React, { useState }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submitButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }),
);

const VideoListRenderer: React.FC = (props: any) =>{
    const classes = useStyles();

    const videoListItems = props.list.map(
        (item: any, i: number) => {
            return (
                <div key={i}>
                    <div>
                        {item}
                        <div className={classes.submitButton}>
                            <Button 
                                variant="contained"
                                onClick = {()=>props.delete(i)}
                                >Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    );

    return(
        <div>
            {videoListItems}
        </div>
    );
}

export default VideoListRenderer;