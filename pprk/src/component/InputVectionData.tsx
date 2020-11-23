import React, { useContext, createContext }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {ListIdContext} from './CreateListId';
import {ControlIdContext, 
    VectionDownListContext, 
    VectionUpListContext,
    DurationSecondsContext} from './Player';
import {SliderValueContext} from './VectionSlider';

import ExportData from './ExportData';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stdButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }),
);

interface ITiming {
    id: number;//1試行内のid
    cid: number; //試行番号
    lid: number; //条件番号
    timing: number;
}

interface IDuration {
    cid: number;//試行番号
    lid: number;//条件番号
    value: number;
}

interface ISlider {
    cid: number; //試行番号
    lid: number; //条件番号
    // id: number;  //主観強度の種類
    label: string; //スライダーの名前
    value: number; //主観強度の値
}

export const VectionDurationListContext = createContext([] as IDuration[]);
export const VectionSliderValueListContext = createContext([] as ISlider[]);
export const VectionUpList_modContext = createContext([] as ITiming[]);
export const VectionDownList_modContext = createContext([] as ITiming[]);

const InputVectionData: React.FC = () =>
{
    const classes = useStyles();
    
    const listId: number[] = useContext(ListIdContext);
    const controlId: number = useContext(ControlIdContext);
    const vectionDownList: ITiming[] = useContext(VectionDownListContext);
    const vectionUpList: ITiming[] = useContext(VectionUpListContext);
    const durationSeconds: number = useContext(DurationSecondsContext);
    const sliderValue: number = useContext(SliderValueContext);

    const [vectionDurationList, setVectionDurationList] = React.useState<IDuration[]>([]);
    const [vectionSliderValueList, setVectionSliderValueList] = React.useState<ISlider[]>([]);

    const [vectionDownList_mod, setVectionDown_mod] = React.useState<ITiming[]>([]);
    const [vectionUpList_mod, setVectionUp_mod] = React.useState<ITiming[]>([]);

    const calcVectionDuration = () =>
    {
        // e.preventDefault();
        let sumkeyDownTime: number = 0;
        let coid: number = controlId-1;
        console.log("coid:"+coid);

        console.dir("downlist"+vectionDownList.length);
        console.dir("uplist"+vectionUpList.length);

        //-----最後keyupなかったときの調整 動画の最後にkeyupを打つ

        let vectionDownList_mod: ITiming[] = vectionDownList;
        let vectionUpList_mod: ITiming[] = vectionUpList;

        if(vectionDownList_mod.length > vectionUpList_mod.length)
        {
            let upValue_end: number = Number(durationSeconds);

            // let uid = vectionUpList.length + 1;
            let uid = vectionUpList_mod.length +1;

            // setVectionUp([...vectionUpList, {lid: listId[controlId], cid: controlId, id: uid, timing: upValue_end }]);
            vectionUpList_mod.push({lid: listId[coid], cid: coid, id: uid, timing: upValue_end });

            // let downList: ITiming[] = vectionDownList.filter((v) => v.id <= uid);//keydownの連続分を削除したリストを作成
            let downList: ITiming[] = vectionDownList_mod.filter((v) => v.id <= uid);

            // setVectionDown(downList);
            vectionDownList_mod = downList;
        }
        
        setVectionDown_mod(vectionDownList_mod);
        setVectionUp_mod(vectionUpList_mod);

        console.log("down_mod"+vectionDownList_mod.length);
        console.log("up_mod"+vectionUpList_mod.length);

        //-------

        let cidKeyDownList: ITiming[] = vectionDownList_mod.filter((v) => v.cid >= coid);
        let cidKeyUpList: ITiming[] = vectionUpList_mod.filter((v) => v.cid >= coid);//coid番目の試行のkeydownuplistだけ抽出

        console.log("ciddownlist"+cidKeyDownList.length);
        console.log("ciduplist"+cidKeyUpList.length);

        let preUpLength: number = 0;
        if(coid > 0)
        {
            preUpLength = vectionUpList_mod.filter((v) => v.cid < coid).length;//coid番目試行以前の配列の長さを取得
        }
        


        for(let i=0; i < cidKeyUpList.length; i++)
        {
            let vd: any = cidKeyDownList.find(({id}) => id == i+1+preUpLength)?.timing;//cidが2以降のやつのidは1からじゃない.上でfilterしてもそのidはかわらない
            let vu: any = cidKeyUpList.find(({id}) => id == i+1+preUpLength)?.timing;
            // let vd: any = vectionDownList.find(({id}) => id === i+1)?.timing;
            // let vu: any = vectionUpList.find(({id}) => id === i+1)?.timing;
            console.log("vd:"+vd);
            console.log("vu:"+vu);

            let span: number = vu-vd;
            // let span: number = 1;
            sumkeyDownTime += span;
            // console.log("span:"+span);
        }
        console.log("sumkeydowntime:"+sumkeyDownTime);//押した時間の合計
        setVectionDurationList([...vectionDurationList, { lid: listId[coid], cid: coid, value: sumkeyDownTime}]);
        //controlId-1はさきにincrementIDがはしっちゃっててその調整あとでちゃんとシュッとするように
    }

    const addSliderValueToList = () =>
    {
        let coid: number = controlId-1;
        let sliderLabel: string = "test(notState)";
        setVectionSliderValueList([...vectionSliderValueList, {
                cid: coid, lid: listId[coid], label: sliderLabel, value: sliderValue}]);
        // console.log(sliderValue);
    }

    const handleContinue = (e: React.FormEvent<HTMLButtonElement>) =>
    {
        e.preventDefault();
        calcVectionDuration();
        addSliderValueToList();
        
        alert("潜時と主観強度が入力されました。")//次の動画があるときはplayおしてねも追加する、ifで分岐してalert
    }

    return(
        <div>
            <div className={classes.stdButton}>
                <Button variant="contained" color="primary" onClick={handleContinue}>
                    input
                </Button>
            </div>

            <VectionDurationListContext.Provider value={vectionDurationList}>
            <VectionSliderValueListContext.Provider value={vectionSliderValueList}>
            <VectionDownList_modContext.Provider value={vectionDownList_mod}>
            <VectionUpList_modContext.Provider value={vectionUpList_mod}>
                <ExportData />
            </VectionUpList_modContext.Provider>
            </VectionDownList_modContext.Provider>
            </VectionSliderValueListContext.Provider>
            </VectionDurationListContext.Provider>

        </div>
    )
}

export default InputVectionData;