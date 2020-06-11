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
    let listId: number[] = [];

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

        for(let i = 0; i < videoList.length; i++)
        {
            for(let j = 0; j < repeatNum; j++)
            {
                listId.push(i+1);
            }
        }
        listId = shuffleArray(listId);
        console.log(listId);//再生リストをidで指定してランダム順にしている
        console.log(videoList);
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
        let inputId: number = listId[0];
        let value: any = videoList.find(({id}) => id === inputId)?.name;
        //stateでidかえれば順番に再生できる callbackとあわせて
        setVideoUrl(value);
    }
    return (
        <div>
            <ReactPlayer url={videoUrl} playing={playBool} />
            <button onClick={handlevideoUrl}>inputList to player</button>
            <button onClick={handlePauseBool}>pause</button>
            <button onClick={handlePlayBool}>play</button>

            <input value={inputUrl} onChange={e => setInpurUrl(e.target.value)} />
            <button onClick={handleItems}>Add</button>

            {videoList.map((item: IItem) => <p>{item.name}</p>)}

            <input value={repeatNum} onChange = {handleRepeatNum} />
            <button onClick={handleList}>createList</button>
        </div>
    );
};

export default VideoList;