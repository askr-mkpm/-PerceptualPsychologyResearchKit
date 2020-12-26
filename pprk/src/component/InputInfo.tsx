import React, { useState, createContext }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {IInfo} from '../domain/entity';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputList from './InputList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        urlInput: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        stdButton: {
            marginBottom: theme.spacing(5),
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

export const ExpInfoContext = createContext([] as IInfo[]);

const InputInfo: React.FC = () =>
{
    const classes = useStyles();
    const [subjectName, setSubjectName] = useState<string>("");
    const [expTitleName, setExpTitleName] = useState<string>("");
    const [genderType, setgenderType] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [expInfo, setExpInfo] = useState<IInfo[]>([]);

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

    const addInfo = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        e.preventDefault();

        let _date: string = new Date().toString();

        setExpInfo([...expInfo,{
            title: expTitleName, name: subjectName, age: age,
            gender: genderType, date: _date }]);

        alert("実験タイトル, 被験者情報が入力されました。\n"
        +"入力された情報がサーバへ送信されることはありません。")
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

                <FormControl　className={classes.formControl}>
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

            <div className={classes.stdButton}>
                <Button variant="contained" color="secondary" onClick={addInfo}>
                    Set Experiment Infomation
                </Button>
            </div>

            <ExpInfoContext.Provider value={expInfo}>
                <InputList />
            </ExpInfoContext.Provider>
        </div>
    )
}

export default InputInfo;