import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import Snackbar from 'material-ui/Snackbar';
import {
  red500,
  green500,
  blue500,
  purple500,
} from 'material-ui/styles/colors';

import Task from './Task';
import EditTaskDialog from './EditTaskDialog';
import './TaskList.css';
import classify from '../lib/classify';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      taskDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      index: -1,
    };
  }
  handleRequestTaskDialogClose = () => {
    this.setState({
      taskDialogOpen: false,
    });
  }
  handleRequestTaskDialogOpen = (index) => {
    this.setState({
      taskDialogOpen: true,
      index,
    });
  }
  handleRequestTaskEdit = (taskInfo) => {
    this.props.editTask(this.state.index, {
      task: taskInfo.task,
    });
    this.handleRequestTaskDialogClose();
  }
  handleRequestTaskDelete = (index) => {
    this.props.deleteTask(index);
  }
  handleRequestTaskDo = (index) => {
    this.props.doTask(index);
  }
  handleRequestSnackbarOpen = (message) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
    });
  }
  handleRequestSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
    });
  }
  render() {
    const styles = {
      overdue: {
        color: red500,
        marginTop: 20,
        cursor: 'default',
      },
      open: {
        color: green500,
        marginTop: 20,
        cursor: 'default',
      },
      notYet: {
        color: blue500,
        marginTop: 20,
        cursor: 'default',
      },
      done: {
        color: purple500,
        marginTop: 20,
        cursor: 'default',
      },
    };
    const classifiedTasks = classify(this.props.tasks);
    return (
      <div className="TaskList">
        {classifiedTasks.overdue.length > 0 &&
          <Subheader style={styles.overdue}>Overdue</Subheader>
        }
        {
          classifiedTasks.overdue.map(task => (
            <Task
              color={task.color}
              text={task.task}
              estimation={task.estimation}
              repeat={`${task.repetition} days`}
              key={task.id}
              index={task.index}
              onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
              onRequestDelete={this.handleRequestTaskDelete}
              onRequestDo={this.handleRequestTaskDo}
              onRequestSnackbar={this.handleRequestSnackbarOpen}
            />
          ))
        }
        {classifiedTasks.open.length > 0 &&
          <Subheader style={styles.open}>Open</Subheader>
        }
        {
          classifiedTasks.open.map(task => (
            <Task
              color={task.color}
              text={task.task}
              estimation={task.estimation}
              due={task.due}
              repeat={`${task.repetition} days`}
              key={task.id}
              index={task.index}
              onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
              onRequestDelete={this.handleRequestTaskDelete}
              onRequestDo={this.handleRequestTaskDo}
              onRequestSnackbar={this.handleRequestSnackbarOpen}
            />
          ))
        }
        {classifiedTasks.notYet.length > 0 && this.props.showNotYetTasks &&
          <Subheader style={styles.notYet}>Not Yet</Subheader>
        }
        {this.props.showNotYetTasks &&
          classifiedTasks.notYet.map(task => (
            <Task
              color={task.color}
              text={task.task}
              estimation={task.estimation}
              repeat={`${task.repetition} days`}
              key={task.id}
              index={task.index}
              onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
              onRequestDelete={this.handleRequestTaskDelete}
              onRequestDo={this.handleRequestTaskDo}
              onRequestSnackbar={this.handleRequestSnackbarOpen}
            />
          ))
        }
        {classifiedTasks.done.length > 0 &&
          <Subheader style={styles.done}>Done</Subheader>
        }
        {
          classifiedTasks.done.map(task => (
            <Task
              color={task.color}
              text={task.task}
              estimation={task.estimation}
              repeat={`${task.repetition} days`}
              key={task.id}
              index={task.index}
              onRequestDelete={this.handleRequestTaskDelete}
              onRequestSnackbar={this.handleRequestSnackbarOpen}
              done
            />
          ))
        }
        <EditTaskDialog
          onRequestClose={this.handleRequestTaskDialogClose}
          onRequestEdit={this.handleRequestTaskEdit}
          task={this.props.tasks[this.state.index] ?
            this.props.tasks[this.state.index].task :
            null
          }
          open={this.state.taskDialogOpen}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestSnackbarClose}
        />
      </div>
    );
  }
}

export default TaskList;
