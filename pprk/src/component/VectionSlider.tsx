import React, { useContext, createContext,  Dispatch, SetStateAction }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactPlayer from 'react-player'
import * as Scroll from 'react-scroll';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import {VideoListContext} from './InputList';
import {ListIdContext} from './CreateListId';
import {ControlIdContext} from './Player';

import KeyInput from './_old/KeyInput';

import InputVectionData from './InputVectionData';

import ReactExport from "react-data-export";
import { Label } from '@material-ui/icons';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stdButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        sliderInput: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        vectionSlider: {
            '& > *': {
                margin: theme.spacing(1),
                width: 300,
            },
        },
        multilineColor:{
            color:'white'
        }
    }),
);

function valuetext(value: number) {
    return `${value}°C`;
}

interface ISliderName
{
    label: string;
    id: number;
}

interface ISlider {
    cid: number; //試行番号
    lid: number; //条件番号
    // id: number;  //主観強度の種類
    label: string; //スライダーの名前
    value: number; //主観強度の値
}

interface ITiming {
    id: number;//1試行内のid
    cid: number; //試行番号
    lid: number; //条件番号
    timing: number;
}　

interface ISliderValue {
    label: string;
    value: number;
}


export const SliderValueContext = createContext([] as ISliderValue[]);
export const SliderNameContext = createContext([] as ISliderName[]);

const VectionSlider: React.FC<{ 
    setVectionDownProp: Dispatch<SetStateAction<ITiming[]>> 
    setVectionUpProp: Dispatch<SetStateAction<ITiming[]>> 
}> = ({setVectionDownProp, setVectionUpProp }) =>
{
    const classes = useStyles();
    const [inputSlider, setInputSlider] = React.useState<string>("");
    const [vectionSliderList, setVectionSliderList] = React.useState<ISliderName[]>([]);
    const [sliderValue, setSliderValue] = React.useState<number>(50);
    const [sliderValueList, setSliderValueList] = React.useState<ISliderValue[]>([]);

    const listId: number[] = useContext(ListIdContext);
    const controlId: number = useContext(ControlIdContext);

    const handleInputSlider = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        // e.stopPropagation();
        e.preventDefault();
        setInputSlider(e.target.value);
    }

    const addInputSliderToList = (e: React.FormEvent<HTMLButtonElement>) => 
    {
        e.preventDefault();

        setVectionSliderList([...vectionSliderList, {label: inputSlider , id: vectionSliderList.length + 1 }]);
        setInputSlider("");
    }

    const handleSliderValue = (event: any, newValue: number | number[]) =>
    {
        setSliderValue(newValue as number);
    }

    const handleSliderLabel = (label: string) =>
    {
        setSliderValueList([...sliderValueList,{label: label, value: sliderValue}])
        console.log(sliderValueList);
    }

    const cancelReturn = (e: React.FormEvent<HTMLFormElement>): void =>
    {
        e.preventDefault();
    }

    return(
        <div>
            <form className={classes.sliderInput} noValidate autoComplete="off" onSubmit={cancelReturn}>
                <TextField 
                    id="outlined-basic"
                    label="Subjective Intensity Label"
                    variant="outlined" 
                    value={inputSlider}
                    onChange={handleInputSlider}
                    inputProps={{className: classes.multilineColor }}
                    InputLabelProps={{ className: classes.multilineColor }}
                />
            </form>

            <div className={classes.stdButton}>
                <Button variant="contained" color="secondary" onClick={addInputSliderToList}>
                    Add Subjective Intensity To List
                </Button>
            </div>
            
            {vectionSliderList.map((label: ISliderName) => 
                <p>{label.label}</p>
            )}

            {vectionSliderList.map((label: ISliderName) => 
                <div className={classes.vectionSlider}>
                    <Typography id="vectionSlider" gutterBottom>
                        {label.label}
                    </Typography>
                    <Slider
                    defaultValue={50}
                    getAriaValueText={valuetext}
                    aria-labelledby="vectionSlider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={100}
                    value={sliderValue}
                    onChange={handleSliderValue}
                    onChangeCommitted={()=>handleSliderLabel(label.label)}
                    />
                </div>
            )}

        <SliderValueContext.Provider value={sliderValueList}>
        <SliderNameContext.Provider value={vectionSliderList}>
            <InputVectionData 
                setVectionDownProp={setVectionDownProp}
                setVectionUpProp={setVectionUpProp}/>
        </SliderNameContext.Provider>
        </SliderValueContext.Provider>

        </div>
    )
}

export default VectionSlider;