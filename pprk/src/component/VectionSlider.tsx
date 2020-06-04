//https://material-ui.com/components/slider/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value: number) {
  return `${value}°C`;
}

const VectionSlider: React.FC = () => 
{
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Typography id="vectionSlider" gutterBottom>
          主観強度
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
        />
      </div>
    )
}

export default VectionSlider;