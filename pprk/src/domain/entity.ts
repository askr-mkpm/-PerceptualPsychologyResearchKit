export interface ISliderName
{
    label: string;
    id: number;
}

export interface ISlider {
    cid: number; //試行番号
    lid: number; //条件番号
    // id: number;  //主観強度の種類
    label: string; //スライダーの名前
    value: number; //主観強度の値
}

export interface ITiming {
    id: number;//1試行内のid
    cid: number; //試行番号
    lid: number; //条件番号
    timing: number;
}　

export interface ISliderValue {
    label: string;
    value: number;
}

export interface IList {
    id: number;
    name: string;
}

export interface IDuration {
    cid: number;//試行番号
    lid: number;//条件番号
    value: number;
}