import React, { useState }from 'react';
import { render } from "react-dom";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button';

// import VideoForm from './VideoForm';
// import VideoListRenderer from './VideoListRenderer';

// type VideoListProps = Partial<{
//     add: string
//     list: string[]
//     delete: string
// }>

// const VideoList: React.FC<VideoListProps> = props =>
// {
//     const [videoList, setVideoList] = useState([]);

//     const addVideoList = (url: any) =>
//     {
//         setVideoList(videoList.concat(url));
//     }

//     const deleteVideoList = (index: any) =>
//     {
//         setVideoList(videoList.filter(item => videoList[index] !== item));
//     } 

//     return(
//         <div>
//             <VideoForm add />
//             {/* <VideoListRenderer props={props}/> */}
//         </div>
//     );
// }

interface IItem {
    id: number;
    name: string;
}

const VideoList: React.FC = () =>
{
    const [text, setText] = React.useState<string>("");
    const [items, setItems] = React.useState<IItem[]>([]);
    const [repeatNum, setRepeatNum] = React.useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setItems([...items, { id: items.length + 1, name: text }]);
        setText("");
    };

    const handleRepeatNum = (event: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const value: number = Number(event.target.value);
        setRepeatNum(value);
    }

    const handleList = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        for(let i = 0; i < repeatNum; i++)
        {
            console.log(items);
        }
        //ここからlistをrepeatnumの数ランダムにならびかえたい
    }

    return (
        <form onSubmit={handleSubmit}>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button>Add</button>
        {items.map((item: IItem) => <p>{item.name}</p>)}
        <input value={repeatNum} onChange = {handleRepeatNum} />
        <button onClick={handleList}>createList</button>
        </form>
    );
};

export default VideoList;