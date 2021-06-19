
var id = url.templateArgs["id"];

var q = "TYPE:\"cm:person\"" + ((id)?" AND @sys\\:node\\-uuid:\"" + id + "\"":"");

var user = search.query({
	query: q,
})[0];

if (user === undefined) {
	status.code = 404;
	status.message = "SCIM Resource not found";
	//status.redirect = true;
} else {

	var result = {
		"id": user.properties["sys:node-uuid"],
		"userName": user.properties["cm:userName"],
		"active": (user.hasAspect("cm:personDisabled") ? false : true),
		"familyName": user.properties["cm:lastName"],
		"givenName": user.properties["cm:firstName"],
		"email": user.properties["cm:email"]
	}

	model.result = result;

}