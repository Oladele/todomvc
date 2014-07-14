TodoMVC.module('Tasks', function(Tasks, App, Backbone, Marionette, $, _) {

  // Local Variables
  // ---------------

  var localStorageKey = 'tasks-backbone-marionettejs';

  // Task Model
  // ----------

  Tasks.Task = Backbone.Model.extend({

    defaults: {
      todo_id: null,
      title: '',
      completed: false,
      created: 0
    },

    initialize: function(attributes, options) {
      this.todo_id = attributes.todo_id || options.todo_id || options.collection.todo_id;
      
      this.localStorage = new Backbone.LocalStorage(this.todo_id);

      this.set({todo_id: this.todo_id})
      if (this.isNew()) {
        this.set('created', Date.now());
      }
    },

    toggle: function() {
      return this.set('completed', !this.isCompleted());
    },

    isCompleted: function() {
      return this.get('completed');
    }
  });

    // Task Collection
  // ---------------

  Tasks.TaskList = Backbone.Collection.extend({
    model: Tasks.Task,

    initialize: function(models_arr, options) {
      if (options && options.todo_id) {
        this.todo_id = options.todo_id;
      };
      
      this.localStorage = new Backbone.LocalStorage(this.todo_id);

      this.fetch();
    },

    getCompleted: function() {
      return this.filter(this._isCompleted);
    },

    getActive: function() {
      return this.reject(this._isCompleted);
    },

    comparator: function(todo) {
      return todo.get('created');
    },

    _isCompleted: function(todo){
      return todo.isCompleted();
    }
  });
});