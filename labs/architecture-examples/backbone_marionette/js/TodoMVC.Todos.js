TodoMVC.module('Todos', function(Todos, App, Backbone, Marionette, $, _) {
  
  // Local Variables
  // ---------------

  var localStorageKey = 'todos-backbone-marionettejs';

	// Todo Model
	// ----------

	Todos.Todo = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage(localStorageKey),

		defaults: {
			title: '',
			completed: false,
			created: 0
		},

		initialize: function() {
			this.child_collection = {};
			this.children_stats = {
				tasks_count: 0,
				// tasks_completed, pending, etc
			};

			this.syncChildren();
			if (this.isNew()) {
				this.set('created', Date.now());
			}
		},

		syncChildren: function(){
			this.child_collection = new App.Tasks.TaskList([], {todo_id: this.id});

			this.child_collection.on("all", function(a,b,c){
				this.children_stats.tasks_count = b.models.length
			}, this);

			this.child_collection.fetch();

		},


		toggle: function() {
			return this.set('completed', !this.isCompleted());
		},

		isCompleted: function() {
			return this.get('completed');
		}
	});

	// Todo Collection
	// ---------------

	Todos.TodoList = Backbone.Collection.extend({
		model: Todos.Todo,

		localStorage: new Backbone.LocalStorage(localStorageKey),

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
