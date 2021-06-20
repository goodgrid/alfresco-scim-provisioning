var filter = ((args["filter"]!==null)?args["filter"].replace("userName eq ",""):"");
var maxItems = ((args["maxItems"]!==null)?args["maxItems"]:100);
var startIndex = ((args["startIndex"]!==null)?args["startIndex"]:0);

logger.warn("logging staat aan");

var users = people.getPeople(filter,0);

var result = {
	"totalResults": users.length,
	"itemsPerPage": maxItems,
	"startIndex": startIndex+1,
	"resources": []
};

users = users.splice(startIndex-1,maxItems);

for each (var user in users) {
	user = search.findNode(user);
	result.resources.push({
		"id":user.properties["cm:userName"],
		"userName":user.properties["cm:userName"],
		"active":(user.hasAspect("cm:personDisabled")?false:true),
		"familyName":user.properties["cm:lastName"],
		"givenName":user.properties["cm:firstName"],
		"email": user.properties["cm:email"]
	});
}

model.result = result;