TodoMVC.module('TaskList', function(TaskList, App, Backbone, Marionette, $, _) {

  TaskList.Controller = function(options) {
    var all_tasks = {};
    var tasklist_filter = [];

    this.todo_id = options.todo_id;
    this.region = options.region;
    
    all_tasks = new App.Tasks.TaskList();
    all_tasks.fetch();

    tasklist_filter = all_tasks.where({todo_id: this.todo_id})

    this.tasklist = new App.Tasks.TaskList(tasklist_filter);
  };

  _.extend(TaskList.Controller.prototype, {

    showTaskList: function() {
      collection = this.tasklist;
      view = new TaskList.Views.ListView({ collection : collection });
      this.region.show(view);
    }

  });

});
