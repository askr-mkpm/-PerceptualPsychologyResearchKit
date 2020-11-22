import React, { useContext }from 'react';

import {
    VectionDownList_modContext,
    VectionSliderValueListContext ,
    VectionUpList_modContext,
    VectionDurationListContext} from './InputVectionData';

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

const ExportData: React.FC = () =>
{
    const vectionDownList: ITiming[] = useContext(VectionDownList_modContext);
    const vectionUpList: ITiming[] = useContext(VectionUpList_modContext);
    const vectionDurationList: IDuration[] = useContext(VectionDurationListContext);
    const vectionSliderValueList : ISlider[] = useContext(VectionSliderValueListContext);

    return(
        <div>
            <ExcelFile>
                <ExcelSheet data={vectionDownList} name="VectionDownList">
                    <ExcelColumn label="試行番号" value="cid"/>
                    <ExcelColumn label="条件番号" value="lid"/>
                    {/* <ExcelColumn label="id" value="id"/> */}
                    <ExcelColumn label="潜時(down)(sec)" value="timing"/>
                </ExcelSheet>
                <ExcelSheet data={vectionUpList} name="VectionUpList">
                    <ExcelColumn label="試行番号" value="cid"/>
                    <ExcelColumn label="条件番号" value="lid"/>
                    {/* <ExcelColumn label="id" value="id"/> */}
                    <ExcelColumn label="潜時(up)(sec)" value="timing"/>
                </ExcelSheet>
                <ExcelSheet data={vectionDurationList} name="VectionDurationList">
                    <ExcelColumn label="試行番号" value="cid"/>
                    <ExcelColumn label="条件番号" value="lid"/>
                    <ExcelColumn label="持続時間" value="value"/>
                </ExcelSheet>
                <ExcelSheet data={vectionSliderValueList} name="VectionSliderValueList">
                    <ExcelColumn label="試行番号" value="cid"/>
                    <ExcelColumn label="条件番号" value="lid"/>
                    <ExcelColumn label="主観強度名" value="label"/>
                    <ExcelColumn label="主観強度値" value="value"/>
                </ExcelSheet>
            </ExcelFile>
        </div>
    )
}

export default ExportData;