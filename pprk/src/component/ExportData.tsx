import React, { useContext }from 'react';
import {ITiming, IDuration, ISlider} from '../domain/entity';

import {
    VectionDownList_modContext,
    VectionSliderValueListContext ,
    VectionUpList_modContext,
    VectionDurationListContext} from './InputVectionData';

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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