import React, { useState }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button';

import VideoForm from './VideoForm';
import VideoListRenderer from './VideoListRenderer';

type VideoListProps = Partial<{
    add: string
    list: string[]
}>

const VideoList: React.FC<VideoListProps> = props =>
{
    const [videoList, setVideoList] = useState([]);

    const addVideoList = (url: any) =>
    {
        setVideoList(videoList.concat(url));
    }

    const deleteVideoList = (index: any) =>
    {
        setVideoList(videoList.filter(item => videoList[index] !== item));
    } 

    return(
        <div>
            <VideoForm add={addVideoList}/>
            <VideoListRenderer list={videoList} delete={deleteVideoList}/>
        </div>
    );
}