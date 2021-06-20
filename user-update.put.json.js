
var userName = json.get("userName");
var firstName = jsonUtils.toObject(json.get("name")).givenName;
var lastName = jsonUtils.toObject(json.get("name")).familyName;
var mailAddress = jsonUtils.toObject(json.get("emails"))[0].value;


var user = people.getPerson(userName);

if (!user) {
    try {
        user = people.createPerson(userName);
        user.properties["cm:firstName"] = firstName;
        user.properties["cm:lastName"] = lastName;
        user.properties["cm:mailAddress"] = mailAddress;
        user.save();

        status.code = 201;

        model.user = {
            id: user.properties["cm:userName"],
            userName: user.properties["cm:userName"],
            active: (user.hasAspect("cm:personDisabled") ? false : true),
            givenName: user.properties["cm:firstName"],
            familyName: user.properties["cm:lastName"],
            email: user.properties["cm:mailAddress"]
        };
    } catch(error) {
        status.code = 500;
        status.message = "Error creating user: " + userName;
    }
} else {
    status.code = 409;
    status.message = "A user with that username already exists";

}

logger.warn("SCIM: PUT '/Users' queried with body " + jsonUtils.toJSONString(json) + " and response " + jsonUtils.toJSONString(result) );