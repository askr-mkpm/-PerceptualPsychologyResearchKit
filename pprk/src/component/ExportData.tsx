import React, { useContext }from 'react';
import {ITiming, IDuration, ISlider, IInfo, IList} from '../domain/entity';

import {
    VectionDownList_modContext,
    VectionSliderValueListContext ,
    VectionUpList_modContext,
    VectionDurationListContext} from './InputVectionData';
import {ExpInfoContext} from './InputInfo';
import {VideoListContext} from './InputList';

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
    const expInfo: IInfo[] = useContext(ExpInfoContext);
    const videoList: IList[] = useContext(VideoListContext);

    return(
        <div>
            <ExcelFile>
                <ExcelSheet data={expInfo} name="ExperimentInfo">
                    <ExcelColumn label="実験タイトル" value="title"/>
                    <ExcelColumn label="被験者名" value="name"/>
                    <ExcelColumn label="年齢" value="age"/>
                    <ExcelColumn label="性別" value="gender"/>
                    <ExcelColumn label="日付と時刻" value="date"/>
                </ExcelSheet>
                <ExcelSheet data={videoList} name="VideoList(id, link)">
                    <ExcelColumn label="条件番号" value="id"/>
                    <ExcelColumn label="URL" value="name"/>
                </ExcelSheet>
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