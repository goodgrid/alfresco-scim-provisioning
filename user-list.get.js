

var filter = ((args["filter"]!==null)?args["filter"].replace("userName eq ",""):"");
var count = Number(((args["count"]!==null)?args["count"]:100));
var startIndex = Number(((args["startIndex"]!==null)?args["startIndex"]:1));

var users = people.getPeople(filter,1000);

users = users.splice(startIndex-1,count);

var resources = [] 

for each (var user in users) {
	user = search.findNode(user);
	resources.push({
		"id":user.properties["cm:userName"],
		"userName":user.properties["cm:userName"],
		"active":people.isAccountEnabled(user.properties["cm:userName"]),
		"familyName":user.properties["cm:lastName"],
		"givenName":user.properties["cm:firstName"],
		"email": user.properties["cm:email"]
	});
}

var result = {
	"totalResults": users.length,
	"startIndex": startIndex,
	"itemsPerPage": ((users.length<count)?users.length:count),
	"resources": resources
};


model.result = result;


logger.warn("SCIM: GET '/Users' queried with args " + args + " and response " + jsonUtils.toJSONString(result) );