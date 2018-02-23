'use strict';

var rssModel = {
  init: function init() {
    var MAX_ARTICLES = 2;
    var articles = [];
    $.when(rssModel.oshaCall(), rssModel.sunCall()).done(function (firstCall, secondCall) {
      for (var i = 0; i < MAX_ARTICLES; i++) {
        articles.push(firstCall[0].getElementsByTagName('item')[i]);
        articles.push(secondCall[0].getElementsByTagName('item')[i]);
      }
      console.log(articles[0]);
    }).fail(function () {
      console.log("This didn't work");
    });
  },

  oshaCall: function oshaCall() {
    return $.ajax({
      method: "GET",
      dataType: "XML",
      url: "https://cors-anywhere.herokuapp.com/https://www.osha.gov/news/newsreleases.xml"
    });
  },

  sunCall: function sunCall() {
    return $.ajax({
      method: "GET",
      dataType: "XML",
      url: "https://cors-anywhere.herokuapp.com/http://sunnewsreport.com/feed/"
    });
  }
};

$(document).ready(rssModel.init);

/*articles.push({
"src": "hello" + url,
"name": xml.getElementsByTagName('item')[i].children.title,
"url": xml.getElementsByTagName('item')[i].children.link
});*/
//console.log(xml.getElementsByTagName('item')[0].children);