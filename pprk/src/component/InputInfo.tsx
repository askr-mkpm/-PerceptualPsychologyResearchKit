import React, { useState, createContext }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {IList} from '../domain/entity';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
        },
        multilineColor:{
            color:'white'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 180,
          },
          selectEmpty: {
            marginTop: theme.spacing(2),
          },
    }),
);

// export const VideoListContext = createContext([] as IList[]);
// export const RepeatNumContext = createContext(0);

const InputInfo: React.FC = () =>
{
    const classes = useStyles();
    const [subjectName, setSubjectName] = useState<string>("");
    const [expTitleName, setExpTitleName] = useState<string>("");
    const [genderType, setgenderType] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    // const [repeatNum, setRepeatNum] = useState<number>(0);

    const handleSubjectName = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        // e.stopPropagation();
        e.preventDefault();
        setSubjectName(e.target.value)
    }

    const handleExpTitleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        // e.stopPropagation();
        e.preventDefault();
        setExpTitleName(e.target.value)
    }

    const handlegenderType = (e: React.ChangeEvent<{ value: unknown }>) =>
    {
        // e.stopPropagation();
        e.preventDefault();
        setgenderType(e.target.value as string)
    }

    const handleAge = (event: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const value: number = Number(event.target.value);
        setAge(value);
    }

    const cancelReturn = (e: React.FormEvent<HTMLFormElement>): void =>
    {
        e.preventDefault();
    }

    return(
        <div>
            <form className={classes.urlInput} noValidate autoComplete="off" onSubmit={cancelReturn}>
                <TextField 
                    id="outlined-basic"
                    label="Experiment Title"
                    variant="outlined" 
                    value={expTitleName}
                    onChange={handleExpTitleName}
                    inputProps={{className: classes.multilineColor }}
                    InputLabelProps={{ className: classes.multilineColor }}
                />
            </form>

            <form className={classes.urlInput} noValidate autoComplete="off" onSubmit={cancelReturn}>
                <TextField 
                    id="outlined-basic"
                    label="Your Name"
                    variant="outlined" 
                    value={subjectName}
                    onChange={handleSubjectName}
                    inputProps={{className: classes.multilineColor }}
                    InputLabelProps={{ className: classes.multilineColor }}
                />
            </form>
            
            <form className={classes.formControl} noValidate autoComplete="off" onSubmit={cancelReturn}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={genderType}
                        onChange={handlegenderType}
                    >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                    <MenuItem value={"Decline to state"}>Decline to state</MenuItem>
                    </Select>
                </FormControl>
            </form> 

            <form className={classes.repNum} noValidate autoComplete="off" onSubmit={cancelReturn}>
                <TextField
                    id="filled-number"
                    label="Age"
                    type="number"
                    inputProps={{className: classes.multilineColor }}
                    InputLabelProps={{
                        className: classes.multilineColor
                    }}
                    variant="filled"
                    value={age}
                    onChange = {handleAge}
                />
            </form>

        </div>
    )
}

export default InputInfo;