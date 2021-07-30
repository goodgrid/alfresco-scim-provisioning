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
            "phoneNumbers":[{
                  "value":"555-555-8377",
                  "type":"work"
            }],            
            "groups": [],
            "meta":{
                "resourceType": "User",
                "location": "https://docs.notarisid.nl/alfresco/service/scim/v2/Users/${user.id!}",
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