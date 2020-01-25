import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    marginTop: 12,
    marginBottom: 42,
    margin: '0 auto',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function SizeSelector(props) {
  const defaultValue = 4;
  const [gridSize, setGridSize] = useState(4);
  const classes = useStyles();

  const sendGridSize = size => {
    console.log('sending grid size', size);
    props.parentCallback(size);
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin}>
        <Typography id="discrete-slider-small-steps" gutterBottom>
          Grid Size
        </Typography>
        <Slider
          defaultValue={defaultValue}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          onChange={(event, value) => {
            if (value !== gridSize) {
              console.log('value', value);
              setGridSize(value);
              console.log('gridsize', gridSize);
              sendGridSize(value);
            }
          }}
        />
      </div>
    </div>
  );
}

/*
class SizeSelector extends React.Component {
  useStyles() {
    return makeStyles(theme => ({
      root: {
        width: 250,
        marginTop: 12,
        marginBottom: 42,
        margin: '0 auto',
      },
      margin: {
        height: theme.spacing(3),
      },
    }));
  }

  state = { gridSize: 4 };

  sendGridSize = () => {
    this.props.parentCallback(this.state.gridSize);
  };

  render(props) {
    const classes = this.useStyles();
    let defaultValue = 4;

    return (
      <div className={classes.root}>
        <div className={classes.margin}>
          <Typography id="discrete-slider-small-steps" gutterBottom>
            Grid Size
          </Typography>
          <Slider
            defaultValue={defaultValue}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            onChange={(event, value) => {
              if (value !== this.state.gridSize) {
                console.log(value);
                this.setState({ gridSize: value });
                this.sendGridSize();
              }
            }}
          />
        </div>
      </div>
    );
  }
}
*/
export default SizeSelector;
