//https://material-ui.com/components/text-fields/

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//             },
//         }
//     }),
// );

type Props = {
    sampleNumber: number;
}

const SampleProp: React.FC<Props> = props =>
{
    // const classes = useStyles();

    return (
        <div>
            {props.sampleNumber}
        </div>
    )
}

export default SampleProp;