TodoMVC.module('TaskList', function(TaskList, App, Backbone, Marionette, $, _) {

  TaskList.Controller = function(options) {
    this.todo_id = options.todo_id;
    this.region = options.region;
    this.tasklist = options.tasks;

  };

  _.extend(TaskList.Controller.prototype, {

    showTaskList: function() {
      collection = this.tasklist;
      view = new TaskList.Views.ListView({ collection : collection });
      this.region.show(view);
    }

  });

});
