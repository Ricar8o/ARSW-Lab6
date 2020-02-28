
var api = apimock;

var app = (function () {
  var author;
  var blueprints = [];

  var getAuthors = function(author){
	$("#blups").find("tr:gt(0)").remove();
    api.getBlueprintsByAuthor(author, table);
  }

  var table = function(a, blueprintss) {
	var i = 0;
    $("#blups").append(
    blueprintss.map(function(blueprint){
	  i+= blueprint.points.length;
      return "<tr><td>" + blueprint.name + "</td><td>" + blueprint.points.length + "</td><td><input type='checkbox' name='open'></td></tr>"
      })  
    );
    $("#total").text(i);
  }

  return{
      get : getAuthors
  };
})();