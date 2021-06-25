logger.warn("SCIM: PATCH '/Users' Request with templateArgs " + url.templateArgs + " and body " + jsonUtils.toJSONString(json);

var id = url.templateArgs["id"];
var userName = json.get("userName");
var firstName = jsonUtils.toObject(json.get("name")).givenName;
var lastName = jsonUtils.toObject(json.get("name")).familyName;
var mailAddress = jsonUtils.toObject(json.get("emails"))[0].value;


var user = people.getPerson(id);

if (user) {
    try {

        status.code = 200;

        model.user = {
            id: user.properties["cm:userName"],
            userName: user.properties["cm:userName"],
            active: (user.hasAspect("cm:personDisabled") ? false : true),
            givenName: user.properties["cm:firstName"],
            familyName: user.properties["cm:lastName"],
            email: user.properties["cm:email"]
        };
    } catch(error) {
        status.code = 500;
        status.message = "Error creating user: " + userName;
    }
} else {
    status.code = 404;
    status.message = "User not found";

}

logger.warn("SCIM: PATCH '/Users' Request had response " + jsonUtils.toJSONString(model.user) );