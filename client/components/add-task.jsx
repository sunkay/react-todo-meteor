
AddTask = React.createClass({
  getInitialState: function(){
      return {
        text: ''
      }
  },

  render: function(){
    return <div className="input-group">
      <input
        type="text"
        placeholder="Type to add new tasks"
        className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}
        >
      </input>
      <span className="input-group-btn">
        <button
          type="button"
          className="btn btn-default"
          onClick={this.handleAddClick}
        >
          Add
        </button>
      </span>
    </div>
  },

  handleAddClick: function(){
    console.log(this.state.text);
    this.setState({
      text: ''
    });
    Tasks.insert({
      text: this.state.text,
      done: false,
      archive: false,
      createdAt: new Date()
    });
  },

  handleTextChange: function(event){
    //var text = event.target.value;
    this.setState({text: event.target.value});
  }

});
