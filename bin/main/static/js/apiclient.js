var apiclient = (function () {
    return {
        getBlueprintsByAuthor: function(author, callback) {
			$.get('http://localhost:8080/blueprints/' + author, function(blueprint){
				callback(null, blueprint)
			});
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
			$.get('http://localhost:8080/blueprints/' + author + '/' + name, function(blueprint){
				callback(null, blueprint)
			});
        }
    }

})();