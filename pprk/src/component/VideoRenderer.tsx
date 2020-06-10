import React from 'react'
import ReactPlayer from 'react-player'

const VideoRenderer: React.FC = () =>
{
    const [repeatNum, setRepeatNum] = React.useState<string>("https://youtu.be/Kpm1l0HfkV0");
    const [playBool, setPlayBool] = React.useState<boolean>(true);

    const handlePauseBool = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        setPlayBool(false);
    }

    const handlePlayBool = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        setPlayBool(true);
    }

    return(
        <div>
            <ReactPlayer url={repeatNum} playing={playBool} />
            <button onClick={handlePauseBool}>pause</button>
            <button onClick={handlePlayBool}>play</button>
        </div>
    )
}

export default VideoRenderer;