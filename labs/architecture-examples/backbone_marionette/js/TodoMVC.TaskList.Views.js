TodoMVC.module('TaskList.Views', function(Views, App, Backbone, Marionette, $, _) {

  // Task List Item View
  // -------------------
  //
  // Display an individual task item, and respond to changes
  // that are made to the item, including marking completed.

  Views.ItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#template-taskItemView'
  });

  // Item List View
  // --------------
  //
  // Controls the rendering of the list of items, including the
  // filtering of activs vs completed items for display.

  Views.ListView = Backbone.Marionette.CompositeView.extend({
    template: '#template-taskListCompositeView',
    itemView: Views.ItemView,
    itemViewContainer: '#task-list',
  });


});