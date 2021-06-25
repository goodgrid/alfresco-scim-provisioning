logger.warn("SCIM: PUT '/Users' Request with templateArgs " + url.templateArgs + " and body " + jsonUtils.toJSONString(json));


var id = url.templateArgs["id"];
//var userName = json.get("userName");
var firstName = jsonUtils.toObject(json.get("name")).givenName;
var lastName = jsonUtils.toObject(json.get("name")).familyName;
var mailAddress = jsonUtils.toObject(json.get("emails"))[0].value;
var active = jsonUtils.toObject(json.get("active"));


var user = people.getPerson(id);

if (user) {
    try {

        user.properties["cm:firstName"] = firstName;
        user.properties["cm:lastName"] = lastName;
        user.properties["cm:email"] = mailAddress;
        user.save();

        (active)?people.enableAccount(id):people.disableAccount(id);

        status.code = 200;

        model.user = {
            "id": user.properties["cm:userName"],
            "userName": user.properties["cm:userName"],
            "active":(people.isAccountDisabled(id))?false:true,
            "givenName": user.properties["cm:firstName"],
            "familyName": user.properties["cm:lastName"],
            "email": user.properties["cm:email"]
        };
    } catch(error) {
        status.code = 500;
        status.message = "Error updating user: " + id;
    }
} else {
    status.code = 404;
    status.message = "User not found";

}


logger.warn("SCIM: PUT '/Users' Request had response " + jsonUtils.toJSONString(model.user) );

