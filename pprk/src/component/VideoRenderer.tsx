import React from 'react'
import ReactPlayer from 'react-player'

const VideoRenderer: React.FC = () =>
{
    const [repeatNum, setRepeatNum] = React.useState<string>("https://youtu.be/Kpm1l0HfkV0");

    return(
        <ReactPlayer url={repeatNum} playing />
    )
}

export default VideoRenderer;