var rssModel = {
  init: () => {
    const MAX_ARTICLES = 2;
    const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
    let articles = [];
    $.when(
      rssModel.ajaxCall(CORS_HEADER + "https://www.osha.gov/news/newsreleases.xml"),
      rssModel.ajaxCall(CORS_HEADER + "http://sunnewsreport.com/feed/")
    ).done(function(firstCall, secondCall) {
      for (let i = 0; i < MAX_ARTICLES; i ++) {
        articles.push(firstCall[0].getElementsByTagName('item')[i]);
        articles.push(secondCall[0].getElementsByTagName('item')[i]);
      }
      rssController.init(articles);
    }).fail(function() {
      rssController.handleError;
    });
  },

  ajaxCall: (url) => {
    return $.ajax({
      method: "GET",
      dataType: "XML",
      url: url
    });
  }
}

var rssController = {
  init: (articles) => {
    console.log(articles[0].title);
  },
  handleError: () => {

  }
}

$(document).ready(rssModel.init);
