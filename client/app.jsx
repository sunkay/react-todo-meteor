//var React = require('react');

var App = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData: function(){
      return{
        tasks: Tasks.find({}).fetch()
      }
    },

    render: function(){
      return <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset">
          <h2 className="text-center">
            To-Do List - Deployed to meteor
          </h2>
          <AddTask />
          {this.renderTasks()}
          <div className="text-center">
            <hr />
            <button
              type="button"
              className="btn btn-default "
              onClick={this.handleClearCompleteClick}
              >
              Clear Complete
            </button>
          </div>
        </div>
      </div>
    },
    handleClearCompleteClick: function(event){
      this.data.tasks.map(function(task){
        if(task.done){
          console.log("removing: " + task._id);
          //Tasks.remove(task._id);
          // archive instead of removing
          Tasks.update(task._id, {
            $set: {archive: true}
          });
        }
      });
    },

    renderTasks(){
      return this.data.tasks.map(function(task){
        return <Task
          task={task}
          key={task._id}
        ></Task>
      });
    }
});

if(Meteor.isClient){
  Meteor.startup(function(){
    var element = React.createElement(App, {});
    React.render(element, document.querySelector('.container'));
  });
}
