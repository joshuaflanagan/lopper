(function($){

// This is the main application logic
//  authenticatedUser: Should have a token property with
//                     a valid GitHub OAuth access token.
//  page: css selector for the DOM element used to render the app
//
var repoView = function(authenticatedUser, ownerAndRepo, page){
  var self = this;
  page = $(page);
  this.el = page;

  var templ = function(view){
    return $('#view-' + view).html();
  };

  var bind_templ = function(view, model){
    return Mustache.to_html(templ(view), model);
  };

  var github = function(resource, callback){
    var github_url = 'https://api.github.com';
    var url = resource.slice(0, 4) == 'http' ? resource : github_url + resource;
    var headers = {
      'Authorization' : 'token ' + authenticatedUser.token
    };
    return $.ajax({
      url: url,
      dataType: 'json',
      success: callback,
      headers: headers
    });
  };

  // main entry point
  this.loadBranches = function(){
    github('/repos/' + ownerAndRepo + '/git/refs/heads', function(data){
      self.showBranches(data);
    });
  };

  this.showBranches = function(data){
    //TODO: filter down to just the orgs the auth user is an owner
    var html = bind_templ('branch-list', {branches: data});
    page.html(html);
    _.each(data, function(branch){
      updateBranch(branch, $('[data-url="' + branch.url + '"]'));
    });
  };

  var updateBranch = function(branch, el){
    console.log('fetching ' + branch.ref);
    github('/repos/' + ownerAndRepo + '/compare/master...' + branch.ref, function(data){
      $(".status", el).text(data.status).addClass("state-" + data.status);
    });
  };
};

window.RepoView = repoView;

})(jQuery);

