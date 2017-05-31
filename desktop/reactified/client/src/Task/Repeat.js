import React, { Component } from 'react';

import RepeatIcon from 'material-ui/svg-icons/av/repeat';

import { grey500 } from 'material-ui/styles/colors';

class Repeat extends Component {
  render() {
    const style = {
      color: grey500,
    };
    return (
      <small className="Repeat" style={style}><RepeatIcon color={grey500} />{this.props.repeat}</small>
    );
  }
}

export default Repeat;