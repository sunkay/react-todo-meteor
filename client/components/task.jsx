Task = React.createClass({
  getInitialState: function(){
      return {
        text: this.props.task.text,
        done: this.props.task.done,
        textChanged: false
      }
  },

  render: function(){
    if(!this.props.task.archive){
      return <div className="input-group">
          <span className="input-group-addon">
            <input
              type="checkbox"
              checked={this.state.done}
              onChange={this.handleDoneChange}
              />
          </span>
          <input type="text"
            disabled={this.state.done}
            className="form-control"
            onChange={this.handleTextChange}
            value={this.state.text}
            />
          <span className="input-group-btn">
            {this.changesButtons()}
            <button
              className="btn btn-default"
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
          </span>
        </div>
    } else {
      return <div>
        
      </div>
    }
  },
  // adds Undo & Save buttons only during modifying text
  changesButtons(){
    if(!this.state.textChanged){
      return null;
    } else {
      return [
        <button
          type="button"
          className="btn btn-default"
          onClick={this.handleUndoClick}
        >
        Undo
        </button>,
        <button
          type="button"
          className="btn btn-default"
          onClick={this.handleSaveClick}
        >
        Save
        </button>
      ]
    }
  },

  handleDoneChange: function(event){
    var update = event.target.checked;
    this.setState({
      done: update
    });
    Tasks.update(this.props.task._id, {
        $set: {done: update}
    });
    return
  },
  handleTextChange: function(event){
    this.setState({
      text: event.target.value,
      textChanged: true
    });
    return
  },
  handleDeleteClick: function(){
    Tasks.remove(this.props.task._id);
  },
  handleUndoClick: function(){
    this.setState({
      text: this.props.task.text
    });
  },
  handleSaveClick: function(){
    this.setState({
      textChanged: false
    });
    Tasks.update(this.props.task._id, {
      $set: {text: this.state.text}
    });
  }
});
