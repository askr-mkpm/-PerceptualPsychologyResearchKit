import React, { useState }from 'react';
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
        }
    }),
);

interface IItem {
    id: number;
    name: string;
}

const InputUrlList: React.FC = () =>
{
    const classes = useStyles();
    const [inputUrl, setInpurUrl] = useState<string>("");
    const [videoList, setVideolist] = useState<IItem[]>([]);

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
        </div>
    )
}

export default InputUrlList;