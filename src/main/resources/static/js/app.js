
var api = apimock;

var app = (function () {
  var author;
  var blueprints = [];

  var getAuthors = function(author){
    api.getBlueprintsByAuthor(author, table);
  }

  var table = function(a, blueprintss) {
    alert(blueprintss);
    $("#blups").append(
    blueprintss.map(function(blueprint){
      return "<tr><td>" + blueprint.name + "</td><td>" + blueprint.points.lenght + "</td><td><input type='checkbox' name='open'></td></tr>"
      })  
    );
    alert("despues");
    var i = 0;
    apimock.getBlueprintsByAuthor(author).map(function(bluep){
      i+= bluep.points.lenght
    })
    $("#total").text(i);
  }

  return{
      get : getAuthors
  };
})();