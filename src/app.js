/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var mainMenu = new UI.Menu({
  title: 'the Airshow Zone',
  sections: [{
    items: [
      {
        title: 'Events'
      },
      {
        title: 'News'
      }
    ]
  }]
});

mainMenu.on('select', function(e) {
  if(e.itemIndex == 0) {
    showEvents();
  } else if(e.itemIndex == 1) {
    showNews();
  }
});

mainMenu.show();

function showEvents() {
  ajax(
    {
      url: 'http://api.airshow.zone/event',
      type: 'json',
      method: 'get'
    },
    function (data) {
      console.log(data.results.length);
      if(data.results) {
        var items = [];
        
        for(var i in data.results) {
          items.push({
            title:    data.results[i].name,
            subtitle: data.results[i].startDate + ': ' + data.results[i].location.name,
            content:  data.results[i].description
          });
        }
        
        var menu = new UI.Menu({
          sections: [{
            title: 'Events',
            items: items
          }]
        });
        
        menu.on('select', function(e) {
          showItem(e.item);
        });
        
        menu.show();
      } 
    },
    function (err) {
      console.log(err);      
    }
  );
}

function showItem(item) {
  var itemCard = new UI.Card({
    title: item.title,
    body: item.content,
    scrollable: true
  });

  itemCard.show();
}

function showNews() {
  ajax(
    {
      url: 'http://api.airshow.zone/news',
      type: 'json',
      method: 'get'
    },
    function (data) {
      if(data.results) {
        var items = [];
        
        for(var i in data.results) {
          items.push({
            title:    data.results[i].title,
            subtitle: data.results[i].date,
            content:  data.results[i].content
          });
        }
        
        var menu = new UI.Menu({
          sections: [{
            title: 'News',
            items: items
          }]
        });
        
        menu.on('select', function (e) {
          showItem(e.item);
        });
        
        menu.show();
      } 
    },
    function (err) {
      console.log(err);      
    }
  );
}
