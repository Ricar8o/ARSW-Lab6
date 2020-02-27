var app= (function () {
  var author;
  var blueprints;

  var authorsBluePrint = function(author) {
    alert(llllll)
    $("table tbody").append(
    apimock.getBlueprintsByAuthor(author).map(function(blueprint){
      return "<tr><td>" + blueprint.name + "</td><td>" + blueprint.points.lenght + "</td><td><input type='checkbox' name='open'></td></tr>"
      })  
    );
    var i = 0;
    apimock.getBlueprintsByAuthor(author).map(function(bluep){
      i+= bluep.points.lenght
    })
    $("#total").text(i);
  }

  return{
    getBlueprints : authorsBluePrint
  };
})();