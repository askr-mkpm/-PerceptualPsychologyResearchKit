import React, { useContext, createContext,Dispatch, SetStateAction }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ISliderName, ITiming, IDuration, ISlider, ISliderValue} from '../domain/entity';

import {ListIdContext} from './CreateListId';
import {ControlIdContext, 
    VectionDownListContext, 
    VectionUpListContext,
    DurationSecondsContext,
    VideoUrlContext} from './Player';
import {SliderValueContext, SliderNameContext} from './VectionSlider';

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

export const VectionDurationListContext = createContext([] as IDuration[]);
export const VectionSliderValueListContext = createContext([] as ISlider[]);
export const VectionUpList_modContext = createContext([] as ITiming[]);
export const VectionDownList_modContext = createContext([] as ITiming[]);

const InputVectionData: React.FC<{ 
    setVectionDownProp: Dispatch<SetStateAction<ITiming[]>> 
    setVectionUpProp: Dispatch<SetStateAction<ITiming[]>> 
}> = ({setVectionDownProp, setVectionUpProp }) =>
{
    const classes = useStyles();
    
    const listId: number[] = useContext(ListIdContext);
    const controlId: number = useContext(ControlIdContext);
    const vectionDownList: ITiming[] = useContext(VectionDownListContext);
    const vectionUpList: ITiming[] = useContext(VectionUpListContext);
    const durationSeconds: number = useContext(DurationSecondsContext);
    const sliderValueList: ISliderValue[] = useContext(SliderValueContext);
    const sliderNameList: ISliderName[] = useContext(SliderNameContext);
    const videoUrl: string = useContext(VideoUrlContext);

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

        setVectionDownProp(vectionDownList_mod);
        setVectionUpProp(vectionUpList_mod);

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
        console.log(sliderValueList);
        console.log(sliderNameList);

        let _sliderList: ISlider[] = vectionSliderValueList;
        let sliderValueList_raw = sliderValueList;

        for(let i =0; i<sliderNameList.length;i++)
        {
            let _label = sliderNameList[i];
            let _sliderLocalLabelList = sliderValueList_raw.filter((v) => v.label == _label.label);
            let _sliderValue: ISliderValue = _sliderLocalLabelList[_sliderLocalLabelList.length-1]; 
            _sliderList.push({cid: coid, lid: listId[coid], label: _sliderValue.label, value: _sliderValue.value});
        }
        console.log(_sliderList);
        
        setVectionSliderValueList(_sliderList);

    }

    const handleContinue = (e: React.FormEvent<HTMLButtonElement>) =>
    {
        e.preventDefault();

        if(controlId == 0 || sliderNameList.length == 0)
        {
            alert("無効な入力です")
            return;
        }

        calcVectionDuration();
        addSliderValueToList();

        if(videoUrl == "" && controlId > 0){
            alert("最後の動画の潜時と主観強度が入力されました。[Download]を押して実験データを書き出しましょう。これにて実験は終了です。")
        }else{
            alert("潜時と主観強度が入力されました。[PLAY]を押して次の動画に進みましょう。")
        }
        
        
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