import React, { useContext, createContext }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import * as Scroll from 'react-scroll';

import {VideoListContext} from './InputList';
import {ListIdContext} from './CreateListId';

import KeyInput from './KeyInput';

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

export const ControlIdContext = createContext(0);
export const PlayedSecondsContext = createContext(0);

const Player: React.FC = () =>
{
    const classes = useStyles();
    const [playBool, setPlayBool] = React.useState<boolean>(false);
    const [videoUrl, setVideoUrl] = React.useState<string>("");
    const [controlId, setControlId] = React.useState<number>(0);
    const [playedSeconds, setPlayedSeconds] = React.useState<number>(0);

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

            <ControlIdContext.Provider value={controlId}>
            <PlayedSecondsContext.Provider value={playedSeconds}>
                <KeyInput />
            </PlayedSecondsContext.Provider>
            </ControlIdContext.Provider>
        </div>
    )
}

export default Player;