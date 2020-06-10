import React from 'react'
import ReactPlayer from 'react-player'

const VideoRenderer: React.FC = () =>
{
    const [inputUrl, setinputUrl] = React.useState<string>("https://youtu.be/Kpm1l0HfkV0");
    const [videoList, setVideoList] = React.useState<string[]>(["https://youtu.be/nO9aot9RgQc"])
    const [playBool, setPlayBool] = React.useState<boolean>(true);

    const handlePauseBool = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        setPlayBool(false);
    }

    const handlePlayBool = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        setPlayBool(true);
    }

    const handleInputUrl = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        setinputUrl("https://youtu.be/nO9aot9RgQc");
    }

    // https://youtu.be/nO9aot9RgQc
    return(
        <div>
            <ReactPlayer url={inputUrl} playing={playBool} />
            <button onClick={handleInputUrl}>test</button>
            <button onClick={handlePauseBool}>pause</button>
            <button onClick={handlePlayBool}>play</button>
        </div>
    )
}

export default VideoRenderer;