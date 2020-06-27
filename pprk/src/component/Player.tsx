import React, { useState, useContext }from 'react';
import { render } from "react-dom";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ReactExport from "react-data-export";
import * as Scroll from 'react-scroll';

import {VideoListContext} from './InputList';
import {ListIdContext} from './CreateListId';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stdButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }),
);

interface IList {
    id: number;
    name: string;
}

const Player: React.FC = () =>
{
    const classes = useStyles();
    const [playBool, setPlayBool] = React.useState<boolean>(false);
    const [videoUrl, setVideoUrl] = React.useState<string>("");
    const [controlId, setControlId] = React.useState<number>(0);
    const [playedSeconds, setPlayedSeconds] = React.useState<number>();

    const listId: number[] = useContext(ListIdContext);
    const videoList: IList[] = useContext(VideoListContext);

    const initialSetUrlToRender = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        e.preventDefault();
        let cid: number = controlId;
        let inputId: number = listId[cid];
        let value: any = videoList.find(({id}) => id === inputId)?.name;

        console.log("inputid:"+listId[cid]);
        
        console.log(cid);
        setVideoUrl(value);
    }

    const handlePlayBool = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        Scroll.scroller.scrollTo('player', {
            duration: 500,
            smooth: true
        })
        setPlayBool(true);
    }

    const setVideoUrlFromList = () =>
    {
        let cid: number = controlId+1;
        let inputId: number = listId[cid];
        let value: any = videoList.find(({id}) => id === inputId)?.name;
        
        console.log("inputid:"+listId[cid]);

        //リストが終了したらurlを空にする
        if(cid == listId.length)
        {
            value = "";
        }

        setPlayBool(false);
        setVideoUrl(value);
    }

    const handleIncreControlId = () => 
    {
        // e.preventDefault();

        let coid: number = controlId+1;
        setControlId(coid);
        console.log(coid);
        
        setVideoUrlFromList();
        alertInputInfomation();
    }

    const alertInputInfomation = () =>
    {
        alert("Please enter a subjective intensity");
    }

    const handlePlayedSeconds = (state: any) =>
    {
        setPlayedSeconds(state.playedSeconds);
        // console.log("seconds:"+playedSeconds);
    } 

    return (
        <div>
            <div className={classes.stdButton}>
                <Button variant="contained" color="primary" onClick={initialSetUrlToRender}>
                    LaunchPlayer
                </Button>
            </div>

            <div className='player-wrapper'>
                <ReactPlayer 
                    className='react-player'
                    name="player"
                    url={videoUrl} 
                    // url='https://youtu.be/3Dr91z1-Iug'
                    playing={playBool} 
                    onEnded={handleIncreControlId} 
                    onProgress={handlePlayedSeconds}
                    width='100%'
                    height='100%'
                />
            </div>

            <div className={classes.stdButton}>
                <Button variant="contained" color="primary" onClick={handlePlayBool}>
                    play
                </Button>
            </div>
        </div>
    )
}

export default Player;