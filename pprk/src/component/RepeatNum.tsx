//https://material-ui.com/components/text-fields/

import React, { useState }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        repNum: {
            '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '7ch',
            },
        },
    }),
);

const RepeatNum: React.FC = () =>
{
    const classes = useStyles();
    const [repeatNum, setRepeatNum] = useState<number>(0);

    const handleRepeatNum = (event: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const value: number = Number(event.target.value);
        setRepeatNum(value);
    }

    return (
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
    );
}

export default RepeatNum;