<#escape x as jsonUtils.encodeJSONString(x)>
    <#if status.code = 404>
        {
        "schemas":  [
        "urn:ietf:params:scim:api:messages:2.0:Error"
        ],
        "detail":"${status.message!}"
        }
    <#else>
        {
        "schemas":  [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "totalResults": ${result.totalResults!0},
        "itemsPerPage": ${result.itemsPerPage!0},
        "startIndex": ${result.startIndex!0},
        "Resources":  [
        <#list result.resources as resource>
            {
            "name": {
            "givenName":"${resource.givenName!"no value"}",
            "familyName":"${resource.familyName!"no value"}"
            },
            "emails": [{
            "type":"work",
            "primary":true,
            "value":"${resource.email!"no value"}"
            }],
            "id":"${resource.id}",
            "userName":"${resource.userName!}",
            "active":${resource.active?c}
            }<#if resource_has_next>,</#if>
        </#list>
        ]
        }
    </#if>
</#escape>

