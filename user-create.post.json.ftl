<#if status.code == 201>
    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id":"${user.id}",
        "userName":"${user.userName!}",
        "displayName": "${user.givenName!""} ${user.familyName!""}",            
        "active":${user.active?c},
        "name": {
            "givenName":"${user.givenName!"no value"}",
            "familyName":"${user.familyName!"no value"}"
        },
        "emails": [{
            "type":"work",
            "primary":true,
            "value":"${user.email!"no value"}"
        }],            
        "groups": [],
        "meta":{
            "location": "https://docs.notarisid.nl/alfresco/service/scim/v2/Users/${user.id!}"
        }
    }

<#else>
    {
    "schemas":  [
        "urn:ietf:params:scim:api:messages:2.0:Error"
    ],
    "detail" : "Error occured while creating user: ${status.code} ${status.message!}"
    }

</#if>