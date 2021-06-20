
var id = url.templateArgs["id"];

var user = people.getPerson(id);

if (user === null) {
	status.code = 404;
	status.message = "Resource not found";
} else {

	var result = {
		"id": user.properties["cm:userName"],
		"userName": user.properties["cm:userName"],
		"active": (user.hasAspect("cm:personDisabled") ? false : true),
		"familyName": user.properties["cm:lastName"],
		"givenName": user.properties["cm:firstName"],
		"email": user.properties["cm:email"]
	};

	model.result = result;

}