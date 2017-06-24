import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { green600, grey50 } from 'material-ui/styles/colors';

class EditTaskDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { task: this.props.task };
  }
  handleTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  }
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  handleRequestEdit = () => {
    this.props.onRequestEdit(this.state);
  }
  handleRequestTaskEdit = (taskInfo) => {
    this.props.editTask(this.state.index, {
      task: taskInfo.task,
    });
    this.handleRequestTaskDialogClose();
  }
  render() {
    const actions = [
      <FlatButton
        label="Edit"
        primary={true}
        disabled={!Boolean(this.state.task)}
        onTouchTap={this.handleRequestEdit}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
    ];
    const dialogTitleStyle = {
      backgroundColor: green600,
      color: grey50,
    };
    const textFieldStyles = {
      underlineFocusStyle: {
        borderColor: green600,
      },
      floatingLabelFocusStyle: {
        color: green600,
      },
    };
    return (
      <div className="EditTaskDialog">
        <Dialog
          title="Edit task"
          actions={actions}
          titleStyle={dialogTitleStyle}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          <br />
          Edit your task
          <br />
          <TextField
            floatingLabelText="Task title"
            fullWidth={true}
            underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
            defaultValue={this.props.task}
            onChange={this.handleTaskChange}
            autoFocus
          />
        </Dialog>
      </div>
    );
  }
}

export default EditTaskDialog;