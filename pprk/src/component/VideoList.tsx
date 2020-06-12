import React, { useState }from 'react';
import { render } from "react-dom";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        urlInput: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        stdButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        repNum: {
            '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        vectionButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        vectionSlider: {
            '& > *': {
                margin: theme.spacing(1),
                width: 300,
            },
        },
    }),
);

function valuetext(value: number) {
    return `${value}°C`;
}

interface IItem {
    id: number;
    name: string;
}

const VideoList: React.FC = () =>
{
    const classes = useStyles();
    const [inputUrl, setInpurUrl] = React.useState<string>("");
    const [videoList, setVideolist] = React.useState<IItem[]>([]);
    const [repeatNum, setRepeatNum] = React.useState<number>(0);
    const [playBool, setPlayBool] = React.useState<boolean>(false);
    const [videoUrl, setVideoUrl] = React.useState<string>("");
    const [controlId, setControlId] = React.useState<number>(0);
    const [listId, setListId] = React.useState<number[]>([]);
    const [duration, setDuration] = React.useState<number>();

    const addUrlToList = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setVideolist([...videoList, { id: videoList.length + 1, name: inputUrl }]);
        setInpurUrl("");
    };

    const handleRepeatNum = (event: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const value: number = Number(event.target.value);
        setRepeatNum(value);
    }

    const createList = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        e.preventDefault();

        let _listId: number[] = [];
        for(let i = 0; i < videoList.length; i++)
        {
            for(let j = 0; j < repeatNum; j++)
            {
                _listId.push(i+1);
            }
        }
        _listId = shuffleArray(_listId);
        console.log(_listId);//再生リストをidで指定してランダム順にしている
        console.log(videoList);
        setListId(_listId);
    }

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

    //ref: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    const shuffleArray = (array: number[]) =>
    {
        const outArray = Array.from(array);
        for (let i = outArray.length - 1; i > 0; i--) 
        {
            const r = Math.floor(Math.random() * (i + 1));
            const tmp = outArray[i];
            outArray[i] = outArray[r];
            outArray[r] = tmp;
        }
        return outArray;
    }

    const handlePauseBool = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        setPlayBool(false);
    }

    const handlePlayBool = (e: React.FormEvent<HTMLButtonElement>) => 
    {
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

        setVideoUrl(value);
        setPlayBool(true);
    }

    const handleIncreControlId = () => 
    {
        // e.preventDefault();

        let coid: number = controlId+1;
        setControlId(coid);
        console.log(coid);
        //nextおしただんかいでsetvideourlもするのだよ
        setVideoUrlFromList();
    }

    const handleDuration = (duration: any) =>
    {
        setDuration(duration);
        console.log("duration:" + duration);//動画の長さを秒で返す
    }

    return (
        <div>
            <form className={classes.urlInput} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic"
                    label="URL"
                    variant="outlined" 
                    value={inputUrl}
                    onChange={e => setInpurUrl(e.target.value)}
                />
            </form>

            <div className={classes.stdButton}>
                <Button variant="contained" color="secondary" onClick={addUrlToList}>
                    AddUrlToList
                </Button>
            </div>

            {videoList.map((item: IItem) => <p>{item.name}</p>)}

            <form className={classes.repNum} noValidate autoComplete="off">
                <TextField
                id="filled-number"
                label="RepeatNum"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                value={repeatNum}
                onChange = {handleRepeatNum}
                />
            </form>

            <div className={classes.stdButton}>
                <Button variant="contained" onClick={createList}>
                    CreateList
                </Button>
            </div>

            <div className={classes.stdButton}>
                <Button variant="contained" color="primary" onClick={initialSetUrlToRender}>
                    LaunchPlayer
                </Button>
            </div>

            <ReactPlayer 
                url={videoUrl} 
                playing={playBool} 
                onEnded={handleIncreControlId} 
                onDuration={handleDuration}
            />

            <div className={classes.stdButton}>
                <Button variant="contained" color="primary" onClick={handlePlayBool}>
                    play
                </Button>
            </div>

            <div className={classes.stdButton}>
                <Button variant="contained" color="secondary" onClick={handlePauseBool}>
                    pause
                </Button>
            </div>

            <div className={classes.vectionButton}>
                <Button variant="contained">VectionButton</Button>
            </div>
            
            <div className={classes.vectionSlider}>
                {/* <Typography id="vectionSlider" gutterBottom>
                主観強度
                </Typography> */}
                <Slider
                defaultValue={50}
                getAriaValueText={valuetext}
                aria-labelledby="vectionSlider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
                />
            </div>
            {/* <button onClick={handleIncreControlId}>next</button> */}
            {/* <button onClick={handleDecreControlId}>back</button> */}
        </div>
    );
};

export default VideoList;