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
            To-Do List
          </h2>
          <AddText />
          {this.renderTasks()}
        </div>
      </div>
    },

    renderTasks(){
      return this.data.tasks;
    }
});

if(Meteor.isClient){
  Meteor.startup(function(){
    var element = React.createElement(App, {});
    React.render(element, document.querySelector('.container'));
  });
}
