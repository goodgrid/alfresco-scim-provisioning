logger.warn("SCIM: GET '/Users/ queried with templateArgs " + url.templateArgs + "' queried with args " + args);

var id = url.templateArgs["id"];

var user = people.getPerson(id);

if (user === null) {
	status.code = 404;
	status.message = "Resource not found";
} else {

	model.user = {
		"id": user.properties["cm:userName"],
		"userName": user.properties["cm:userName"],
		"active":((people.isAccountDisabled(user.properties["cm:userName"])?false:true),
		"familyName": user.properties["cm:lastName"],
		"givenName": user.properties["cm:firstName"],
		"email": user.properties["cm:email"]		
	};

}

logger.warn("SCIM: GET '/Users/" + id + "; request had response " + jsonUtils.toJSONString(model.user) );