import React, { useContext, createContext }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import * as Scroll from 'react-scroll';
import {IList, ITiming} from '../domain/entity';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import {VideoListContext} from './InputList';
import {ListIdContext} from './CreateListId';

import VectionSlider from './VectionSlider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stdButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    }),
);

export const ControlIdContext = createContext(0);
export const PlayedSecondsContext = createContext(0);
export const VectionDownListContext = createContext([] as ITiming[]);
export const VectionUpListContext = createContext([] as ITiming[]);
export const DurationSecondsContext = createContext(0);
export const VideoUrlContext = createContext("");

const Player: React.FC = () =>
{
    const classes = useStyles();
    const [playBool, setPlayBool] = React.useState<boolean>(false);
    const [videoUrl, setVideoUrl] = React.useState<string>("");
    const [controlId, setControlId] = React.useState<number>(0);
    const [playedSeconds, setPlayedSeconds] = React.useState<number>(0);
    const [durationSeconds, setDurationSeconds] = React.useState<number>(0);
    const [pauseBool, setPauseBool] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);

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

        if(listId.length <= 0)
        {
            alert("[CREATELIST]してください。");
            return
        }

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
        if(listId.length <= 0)
        {
            alert("[CREATELIST]してください。");
            return;
        }
        Scroll.scroller.scrollTo('player', {
            duration: 500,
            smooth: true
        })
        setPlayBool(true);
        setPauseBool(false);
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

        if(cid == listId.length)
        {
            console.log("動画の再生が終了しました。[Download]を押してデータをダウンロードしてください。");
        }
    }

    const handleIncreControlId = () => 
    {
        // e.preventDefault();

        // handlePlayFlagFalse();

        let coid: number = controlId+1;
        setControlId(coid);
        console.log(coid);

        setDurationSeconds(playedSeconds); //終了段階のplayedsecondsをdurationにいれる
        
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
        if(pauseBool == false)//一時停止でplayboolがfalseになったときにps=0の処理をさせない
        {
            if(playBool == false)
            {
                ps = 0;
            }
        }
        setPlayedSeconds(ps);
        // console.log("seconds:"+playedSeconds);
    } 

    const handleVectionButtonDown_key =  (e: React.KeyboardEvent) =>
    {
        // e.preventDefault();
        e.stopPropagation();
        const KEY_CODE_D = 68;//d
        const KEY_CODE_ESC = 27;//esc

        let downValue: number = Number(playedSeconds);

        //潜時入力
        if(e.keyCode == KEY_CODE_D && playBool == true) //playboolの分岐: 動画再生されていないときのkeydownをふせぐ 
        {
            let did = vectionDownList.length + 1
            setVectionDown([...vectionDownList, {lid: listId[controlId] ,cid: controlId, id: did, timing: downValue }]);
            console.log("keydown"+downValue);
            console.log("keydown_cid"+controlId);
        }

        //一時停止
        if(e.keyCode == KEY_CODE_ESC ) //playboolの分岐: 動画再生されていないときのkeydownをふせぐ 
        {
            console.log("pause");
            setPauseBool(true);
            setPlayBool(false);
            handleOpen();
            // alert("一時停止しました。再開する際は[PLAY]ボタンを押してください。")
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

    const handleOpen = () => 
    {
        setOpen(true);
    };
    
    const handleClose = () => 
    {
        setOpen(false);
    };

    return (
        <div onKeyDown={handleVectionButtonDown_key} onKeyUp={handleVectionButtonUp_key}>

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
                    // onDuration={handleDurationLog}
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

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">一時停止しました。</h2>
            <p id="transition-modal-description">再開する際は[PLAY]ボタンを押してください。</p>
                </div>
                </Fade>
            </Modal>

            <ControlIdContext.Provider value={controlId}>
            <PlayedSecondsContext.Provider value={playedSeconds}>
            <VectionDownListContext.Provider value={vectionDownList}>
            <VectionUpListContext.Provider value={vectionUpList}>
            <DurationSecondsContext.Provider value={durationSeconds}>
            <VideoUrlContext.Provider value={videoUrl}>
                <VectionSlider 
                    setVectionDownProp = {setVectionDown}
                    setVectionUpProp = {setVectionUp} />
            </VideoUrlContext.Provider>
            </DurationSecondsContext.Provider>
            </VectionUpListContext.Provider>
            </VectionDownListContext.Provider>
            </PlayedSecondsContext.Provider>
            </ControlIdContext.Provider>

        </div>
    )
}

export default Player;