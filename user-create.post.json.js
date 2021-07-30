logger.warn("SCIM: POST '/Users' Request with templateArgs " + url.templateArgs + " and body " + jsonUtils.toJSONString(json));

var userName = json.get("userName");
var firstName = jsonUtils.toObject(json.get("name")).givenName;
var lastName = jsonUtils.toObject(json.get("name")).familyName;
var mailAddress = jsonUtils.toObject(json.get("emails"))[0].value;
var active = (json.get("active")===true);
var password = json.get("password");


var user = people.getPerson(userName);

if (!user) {
    try {
        user = people.createPerson(userName, firstName, lastName, mailAddress, password, true, true);
        status.code = 201;

        model.user = {
            "id": user.properties["cm:userName"],
            "userName": user.properties["cm:userName"],
            "active":people.isAccountEnabled(user.properties["cm:userName"]),
            "givenName": user.properties["cm:firstName"],
            "familyName": user.properties["cm:lastName"],
            "email": user.properties["cm:email"]
        };
    } catch(error) {
        status.code = 500;
        status.message = "Error creating user: " + userName + ": " + error;
    }
} else {
    status.code = 409;
    status.message = "A user with that username already exists";

}

logger.warn("SCIM: POST '/Users' Request had response " + jsonUtils.toJSONString(model.user) );