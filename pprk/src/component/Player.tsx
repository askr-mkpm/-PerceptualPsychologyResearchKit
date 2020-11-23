import React, { useContext, createContext }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import * as Scroll from 'react-scroll';

import {VideoListContext} from './InputList';
import {ListIdContext} from './CreateListId';

import VectionSlider from './VectionSlider';

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

interface ITiming {
    id: number;//1試行内のid
    cid: number; //試行番号
    lid: number; //条件番号
    timing: number;
}

export const ControlIdContext = createContext(0);
export const PlayedSecondsContext = createContext(0);
export const VectionDownListContext = createContext([] as ITiming[]);
export const VectionUpListContext = createContext([] as ITiming[]);
export const DurationSecondsContext = createContext(0);

const Player: React.FC = () =>
{
    const classes = useStyles();
    const [playBool, setPlayBool] = React.useState<boolean>(false);
    const [videoUrl, setVideoUrl] = React.useState<string>("");
    const [controlId, setControlId] = React.useState<number>(0);
    const [playedSeconds, setPlayedSeconds] = React.useState<number>(0);
    const [durationSeconds, setDurationSeconds] = React.useState<number>(0);

    const [vectionDownList, setVectionDown] = React.useState<ITiming[]>([]);
    const [vectionUpList, setVectionUp] = React.useState<ITiming[]>([]);

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
        alertPlayButton();
    }

    const alertPlayButton = () =>
    {
        alert("動画プレイヤーが起動します。 \n \n " 
        +"再生の際はプレイヤー内の再生ボタンではなく、プレイヤー下の、青い[PLAY]ボタンをおしてください。\n \n "
        +"誤ってプレイヤー内の再生ボタンを押してしまった場合、お手数ですが動画プレイヤーを起動しなおしてください。");
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
        
        console.log("inputid:"+listId[cid]);//最後はundifinedになる（リストがないので）

        //リストが終了したらurlを空にする
        if(cid == listId.length)
        {
            value = "";
        }

        setPlayBool(false);
        setPlayedSeconds(0);

        setVideoUrl(value);
    }

    const handleIncreControlId = () => 
    {
        // e.preventDefault();

        // handlePlayFlagFalse();

        let coid: number = controlId+1;
        setControlId(coid);
        console.log(coid);
        
        setVideoUrlFromList();

        alertInputInfomation();
    }

    const alertInputInfomation = () =>
    {
        alert("主観強度を入力して、青い[INPUT]ボタンをおしてください。");
    }

    const handlePlayedSeconds = (state: any) =>
    {
        let ps: number = state.playedSeconds
        if(playBool == false)
        {
            ps = 0;
        }
        setPlayedSeconds(ps);
        // console.log("seconds:"+playedSeconds);
    } 

    const handleVectionButtonDown_key =  (e: React.KeyboardEvent) =>
    {
        // e.preventDefault();
        e.stopPropagation();
        const KEY_CODE = 68;//d
        let downValue: number = Number(playedSeconds);
        if(e.keyCode == KEY_CODE && playBool == true) //playboolの分岐: 動画再生されていないときのkeydownをふせぐ 
        {
            let did = vectionDownList.length + 1
            setVectionDown([...vectionDownList, {lid: listId[controlId] ,cid: controlId, id: did, timing: downValue }]);
            console.log("keydown"+downValue);
            console.log("keydown_cid"+controlId);
        }
    }

    const handleVectionButtonUp_key =  (e: React.KeyboardEvent) =>
    {
        // e.preventDefault();
        e.stopPropagation();
        const KEY_CODE = 68;//d
        let upValue: number = Number(playedSeconds);
        if(e.keyCode == KEY_CODE && playBool == true)
        {
            let uid = vectionUpList.length + 1;
            setVectionUp([...vectionUpList, {lid: listId[controlId], cid: controlId, id: uid, timing: upValue }]);
            let downList: ITiming[] = vectionDownList.filter((v) => v.id <= uid);//keydownの連続分を削除したリストを作成
            setVectionDown(downList);
            console.log("keyup"+upValue);
        }
    }

    const handleDurationLog =  (durationSeconds: any) =>
    {

        setDurationSeconds(durationSeconds);

        //初回で1秒おおくなってしまうので調整、ただし二回目以降は正確になる（謎の誤差がある）
        // const duration: number = durationSeconds-1;
        const duration: number = durationSeconds;
        
         console.log("duration_log:"+ duration);
    }

    return (
        <div onKeyDown={handleVectionButtonDown_key} onKeyUp={handleVectionButtonUp_key}>

            <ControlIdContext.Provider value={controlId}>
            <PlayedSecondsContext.Provider value={playedSeconds}>
            <VectionDownListContext.Provider value={vectionDownList}>
            <VectionUpListContext.Provider value={vectionUpList}>
            <DurationSecondsContext.Provider value={durationSeconds}>
                <VectionSlider />
            </DurationSecondsContext.Provider>
            </VectionUpListContext.Provider>
            </VectionDownListContext.Provider>
            </PlayedSecondsContext.Provider>
            </ControlIdContext.Provider>

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
                    onDuration={handleDurationLog}
                    width='100%'
                    height='100%'
                    config={{
                        youtube:{
                            playerVars:{
                                controls: 0,
                                disablekb: 1,
                                fs: 0,
                                modestbranding: 1,
                                rel: 0
                            }
                        }
                    }}
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