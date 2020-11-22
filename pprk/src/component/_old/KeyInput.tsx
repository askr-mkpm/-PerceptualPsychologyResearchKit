import React, { useContext }from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {ListIdContext} from '../CreateListId';
import {ControlIdContext, PlayedSecondsContext} from '../Player';

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

const KeyInput: React.FC = () =>
{
    const classes = useStyles();
    const [vectionDownList, setVectionDown] = React.useState<ITiming[]>([]);
    const [vectionUpList, setVectionUp] = React.useState<ITiming[]>([]);
    const [vectionDurationList, setVectionDurationList] = React.useState<IDuration[]>([]);

    const listId :number[] = useContext(ListIdContext);
    const controlId :number = useContext(ControlIdContext);
    const playedSeconds :number = useContext(PlayedSecondsContext);

    const handleVectionButtonDown_key =  (e: React.KeyboardEvent) =>
    {
        // e.preventDefault();
        e.stopPropagation();
        const KEY_CODE = 13;
        let downValue: number = Number(playedSeconds);
        if(e.keyCode == KEY_CODE)
        {
            let did = vectionDownList.length + 1
            setVectionDown([...vectionDownList, {lid: listId[controlId] ,cid: controlId, id: did, timing: downValue }]);
            // console.log("keydown"+downValue);
        }
    }

    const handleVectionButtonUp_key =  (e: React.KeyboardEvent) =>
    {
        // e.preventDefault();
        e.stopPropagation();
        const KEY_CODE = 13;
        let upValue: number = Number(playedSeconds);
        if(e.keyCode == KEY_CODE)
        {
            let uid = vectionUpList.length + 1;
            setVectionUp([...vectionUpList, {lid: listId[controlId], cid: controlId, id: uid, timing: upValue }]);
            let downList: ITiming[] = vectionDownList.filter((v) => v.id <= uid);//keydownの連続分を削除したリストを作成
            setVectionDown(downList);
            // console.log("keyup"+upValue);
        }
    }

    const calcVectionDuration = () =>
    {
        // e.preventDefault();
        let sumkeyDownTime: number = 0;
        let coid: number = controlId-1;
        console.log("coid:"+coid);

        console.dir("downlist"+vectionDownList.length);
        console.dir("uplist"+vectionUpList.length);

        let cidKeyDownList: ITiming[] = vectionDownList.filter((v) => v.cid >= coid);
        let cidKeyUpList: ITiming[] = vectionUpList.filter((v) => v.cid >= coid);//coid番目の試行のkeydownuplistだけ抽出

        let preUpLength: number = 0;
        if(coid > 0)
        {
            preUpLength = vectionUpList.filter((v) => v.cid < coid).length;//coid番目試行以前の配列の長さを取得
        }
        
        console.log("ciddownlist"+cidKeyDownList);
        console.log("ciduplist"+cidKeyUpList);

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

    const handleContinue = (e: React.FormEvent<HTMLButtonElement>) =>
    {
        e.preventDefault();
        calcVectionDuration();
    }
    
    return (
        <div>
            <div onKeyDown={handleVectionButtonDown_key} onKeyUp={handleVectionButtonUp_key}>
            </div>
            {/* こいつにfocusさせるようにする！！！！！ */}

            <div className={classes.stdButton}>
                <Button variant="contained" color="primary" onClick={handleContinue}>
                    input
                </Button>
            </div>
        </div>
    )
}

export default KeyInput;