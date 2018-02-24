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
    let articleObjects = [];
    articles.forEach((article, index) => {
      articles[index] = {
        name: articles[index].getElementsByTagName("title")[0].childNodes[0].nodeValue,
        url: articles[index].getElementsByTagName("link")[0].childNodes[0].nodeValue
      }
    });
    console.log(articles);
  },
  handleError: () => {

  }
}

$(document).ready(rssModel.init);
