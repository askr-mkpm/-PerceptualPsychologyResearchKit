import React, { useState }from 'react';
import { render } from "react-dom";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'

interface IItem {
    id: number;
    name: string;
}

const VideoList: React.FC = () =>
{
    const [inputUrl, setInpurUrl] = React.useState<string>("");
    const [videoList, setVideolist] = React.useState<IItem[]>([]);
    const [repeatNum, setRepeatNum] = React.useState<number>(0);
    const [playBool, setPlayBool] = React.useState<boolean>(false);
    const [videoUrl, setVideoUrl] = React.useState<string>("");
    const [controlId, setControlId] = React.useState<number>(0);
    const [listId, setListId] = React.useState<number[]>([]);

    const handleItems = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setVideolist([...videoList, { id: videoList.length + 1, name: inputUrl }]);
        setInpurUrl("");
    };

    const handleRepeatNum = (event: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const value: number = Number(event.target.value);
        setRepeatNum(value);
    }

    const handleList = (e: React.FormEvent<HTMLButtonElement>) => 
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

    const handlevideoUrl = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        e.preventDefault();
        let cid: number = controlId;
        let inputId: number = listId[cid];
        let value: any = videoList.find(({id}) => id === inputId)?.name;

        console.log("inputid:"+listId[cid]);
        
        console.log(cid);
        setVideoUrl(value);
    }

    const setVideoUrlformList = () =>
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
        setVideoUrlformList();
    }

    // const handleIncreControlId_ended = (e: any) => 
    // {
    //     let cid: number = 0;
    //     cid = cid + 1;
    //     setControlId(cid);
    // }

    const handleDecreControlId = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        let coid: number = controlId-1;
        if(coid <= -1) coid = 0;
        setControlId(coid);

        setVideoUrlformList();
    }

    return (
        <div>
            <ReactPlayer url={videoUrl} playing={playBool} onEnded={handleIncreControlId}/>
            <button onClick={handlevideoUrl}>inputList to player</button>
            <button onClick={handlePauseBool}>pause</button>
            <button onClick={handlePlayBool}>play</button>
            {/* <button onClick={handleIncreControlId}>next</button> */}
            {/* <button onClick={handleDecreControlId}>back</button> */}

            <input value={inputUrl} onChange={e => setInpurUrl(e.target.value)} />
            <button onClick={handleItems}>Add</button>

            {videoList.map((item: IItem) => <p>{item.name}</p>)}

            <input value={repeatNum} onChange = {handleRepeatNum} />
            <button onClick={handleList}>createList</button>
        </div>
    );
};

export default VideoList;