TodoMVC.module('TaskList', function(TaskList, App, Backbone, Marionette, $, _) {

  TaskList.Controller = function(options) {
    this.todo_id = options.todo_id;
    this.region = options.region;
    
    this.tasklist = new App.Tasks.TaskList([],{todo_id: this.todo_id});
    this.tasklist.fetch()

  };

  _.extend(TaskList.Controller.prototype, {

    showTaskList: function() {
      collection = this.tasklist;
      view = new TaskList.Views.ListView({ collection : collection });
      this.region.show(view);
    }

  });

});
