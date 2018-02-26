"use strict";

var rssModel = {
  init: function init() {
    var MAX_ARTICLES = 2;
    var CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
    var articles = [];
    $.when(rssModel.ajaxCall(CORS_HEADER + "https://www.osha.gov/news/newsreleases.xml"), rssModel.ajaxCall(CORS_HEADER + "http://sunnewsreport.com/feed/")).done(function (firstCall, secondCall) {
      for (var i = 0; i < MAX_ARTICLES; i++) {
        articles.push(firstCall[0].getElementsByTagName("item")[i]);
        articles.push(secondCall[0].getElementsByTagName("item")[i]);
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
    var articleObjects = [];
    articles.forEach(function (article, index) {
      articles[index] = {
        name: articles[index].getElementsByTagName("title")[0].childNodes[0].nodeValue,
        url: articles[index].getElementsByTagName("link")[0].childNodes[0].nodeValue
      };
    });
    rssView.showFeed(articles);
  },
  handleError: function handleError() {
    rssView.handleError();
  }
};

var rssView = {
  showFeed: function showFeed(articles) {
    $(".rssLoader").hide();
    articles.forEach(function (article) {
      $("#rssNewsFeedTable").append("<tr><td><a href='" + article.url + "' target='_blank'>" + article.name + "</a></td><td><a href='" + article.url + "' target='_blank'><i class='fa fa-external-link'></i></a></tr>");
    });
  },

  handleError: function handleError() {
    $(".rssLoader").hide();
    $("#rssNewsFeedTable").append("<p>Sorry, something went wrong! Please contact a site administrator.</p>");
  }
};

$(document).ready(rssModel.init);