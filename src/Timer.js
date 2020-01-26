/*import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

function fancyTimeFormat(time) {
  var out = '';
  var minutes = Math.floor((time % 3600) / 60);
  var seconds = Math.floor(time % 60);

  out += '' + minutes + ':' + (seconds < 10 ? '0' : '');
  out += '' + seconds;
  return out;
}

function Timer(props) {
  const [time, setTime] = useState(60);

  const endTimer = () => {
    props.onTimerEnd();
  };

  useEffect(() => {
    let interval = setInterval(() => {
      let newTime = time - 2;
      if (props.gameState === 'active') setTime(newTime);
      console.log(newTime);
      if (newTime < 0) endTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [props]);

  return <Typography>{fancyTimeFormat(time)}</Typography>;
}

export default Timer;
*/

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

function fancyTimeFormat(time) {
  var out = '';
  var minutes = Math.floor((time % 3600) / 60);
  var seconds = Math.floor(time % 60);

  out += '' + minutes + ':' + (seconds < 10 ? '0' : '');
  out += '' + seconds;
  return out;
}

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 60,
    };
  }

  render() {
    const { time } = this.state;
    return <Typography align="center">{fancyTimeFormat(time)}</Typography>;
  }

  componentDidMount() {
    const { startTime } = this.props;
    this.setState({
      time: startTime,
    });
    this.doIntervalChange();
  }

  doIntervalChange = () => {
    this.myInterval = setInterval(() => {
      if (this.state.time <= 0) this.props.onTimerEnd();
      if (this.props.gameState === 'active')
        this.setState(prevState => ({
          time: prevState.time - 1,
        }));
      else {
        this.setState(() => ({
          time: this.props.startTime,
        }));
      }
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}

export default Timer;
