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
        articles.push(firstCall[0].getElementsByTagName("item")[i]);
        articles.push(secondCall[0].getElementsByTagName("item")[i]);
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
    articles.forEach( (article, index) => {
      articles[index] = {
        name: articles[index].getElementsByTagName("title")[0].childNodes[0].nodeValue,
        url: articles[index].getElementsByTagName("link")[0].childNodes[0].nodeValue
      }
    });
    rssView.showFeed(articles);
  },
  handleError: () => {
    rssView.handleError();
  }
}

var rssView = {
  showFeed: (articles) => {
    $(".rssLoader").hide();
    articles.forEach( (article) => {
      $("#rssNewsFeedTable").append("<tr><td><a href='" + article.url + "' target='_blank'>" + article.name + "</a></td><td><a href='" + article.url + "' target='_blank'><i class='fa fa-external-link'></i></a></tr>");
    });
  },

  handleError: () => {
    $(".rssLoader").hide();
    $("#rssNewsFeedTable").append("<p>Sorry, something went wrong! Please contact a site administrator.</p>");
  }
}

$(document).ready(rssModel.init);
