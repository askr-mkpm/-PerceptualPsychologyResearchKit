import React from 'react'
import ReactPlayer from 'react-player'

const VideoRenderer: React.FC = () =>
{
    return(
        <ReactPlayer url='https://youtu.be/Kpm1l0HfkV0' playing />
    )
}

export default VideoRenderer;