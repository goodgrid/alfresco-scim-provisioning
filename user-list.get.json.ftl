<#escape x as jsonUtils.encodeJSONString(x)>
    <#if status.code = 200>
        {
        "schemas":  [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "itemsPerPage":${result.itemsPerPage?c},
        "totalResults":${result.totalResults?c},
        "startIndex":${result.startIndex?c},
        "Resources":  [
        <#list result.resources as user>
            {
            "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
            "id":"${user.id}",
            "externalId":"00ut3zrnaO5PUSRlq416",
            "userName":"${user.userName!}",
            "displayName": "${user.givenName!""} ${user.familyName!""}",            
            "active":${user.active?c},
            "name": {
                "givenName":"${user.givenName!"no value"}",
                "familyName":"${user.familyName!"no value"}",
                "formatted": "Mr. Dwight K Schrute, III",
                "middleName": "Kurt",
                "honorificPrefix": "Mr.",
                "honorificSuffix": "III"                
            },
            "emails": [{
                "type":"work",
                "primary":true,
                "value":"${user.email!"no value"}"
            }],
            "phoneNumbers":[{
                  "value":"555-555-8377",
                  "type":"work"
            }],            
            "groups": [],
            "meta":{
                "resourceType": "User",
                "created":"2011-08-01T18:29:49.793Z",
                "lastModified":"2011-08-01T18:29:49.793Z",
                "location": "https://docs.notarisid.nl/alfresco/service/scim/v2/Users/${user.userName!}",
                "version":"W\/\"f250dd84f0671c3\""
            }
            }<#if user_has_next>,</#if>
        </#list>
        ]
        }
        
    <#else>        
        {
        "schemas":  [
        "urn:ietf:params:scim:api:messages:2.0:Error"
        ],
        "detail":"${status.message!}"
        }
    </#if>
</#escape>