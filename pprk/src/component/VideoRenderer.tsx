import React from 'react'
import ReactPlayer from 'react-player'

interface IItem {
    id: number;
    name: string;
}

const VideoRenderer: React.FC = () =>
{
    const [inputUrl, setinputUrl] = React.useState<string>("https://youtu.be/nO9aot9RgQc");
    const [videoList, setVideoList] = React.useState<IItem[]>([{id: 1, name: "https://youtu.be/Kpm1l0HfkV0"},{id: 2, name: "https://youtu.be/nO9aot9RgQc"}])
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
        let value: any = videoList.find(({id}) => id === 1)?.name;
        setinputUrl(value);
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