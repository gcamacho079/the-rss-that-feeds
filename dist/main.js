"use strict";

var rssModel = {
  init: function init() {
    var MAX_ARTICLES = 2;
    var CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
    var articles = [];
    $.when(rssModel.ajaxCall(CORS_HEADER + "https://www.osha.gov/news/newsreleases.xml"), rssModel.ajaxCall(CORS_HEADER + "http://sunnewsreport.com/feed/")).done(function (firstCall, secondCall) {
      for (var i = 0; i < MAX_ARTICLES; i++) {
        articles.push(firstCall[0].getElementsByTagName('item')[i]);
        articles.push(secondCall[0].getElementsByTagName('item')[i]);
      }
      rssController.init(articles);
    }).fail(function () {
      rssController.handleError;
    });
  },

  ajaxCall: function ajaxCall(url) {
    return $.ajax({
      method: "GET",
      dataType: "XML",
      url: url
    });
  }
};

var rssController = {
  init: function init(articles) {
    console.log(articles[0].title);
  },
  handleError: function handleError() {}
};

$(document).ready(rssModel.init);

/*articles.push({
"src": "hello" + url,
"name": xml.getElementsByTagName('item')[i].children.title,
"url": xml.getElementsByTagName('item')[i].children.link
});*/
//console.log(xml.getElementsByTagName('item')[0].children);