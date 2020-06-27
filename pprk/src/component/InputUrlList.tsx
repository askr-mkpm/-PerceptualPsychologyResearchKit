import React, { useState, useContext }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
            width: '7ch',
            },
        }
    }),
);

interface IList {
    id: number;
    name: string;
}

const InputUrlList: React.FC = () =>
{
    const classes = useStyles();
    const [inputUrl, setInpurUrl] = useState<string>("");
    const [videoList, setVideolist] = useState<IList[]>([]);
    const [repeatNum, setRepeatNum] = useState<number>(0);

    const handleInputUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        // e.stopPropagation();
        e.preventDefault();
        setInpurUrl(e.target.value)
    }

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

    return(
        <div>
            <form className={classes.urlInput} noValidate autoComplete="off">
                <TextField 
                    id="outlined-basic"
                    label="URL"
                    variant="outlined" 
                    value={inputUrl}
                    onChange={handleInputUrl}
                />
            </form>

            <div className={classes.stdButton}>
                <Button variant="contained" color="secondary" onClick={addUrlToList}>
                    Add Url To List
                </Button>
            </div>

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
        </div>
    )
}

export default InputUrlList;