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
        "id":"${resource.id}",
        "userName":"${resource.userName!}",
        "active":"${resource.active?c}",
        "name": {
            "familyName":"${resource.familyName!"no value"}",
            "givenName":"${resource.givenName!"no value"}"
        },
        "emails": [{
            "value":"${resource.email!"no value"}"
        }]
        }<#if resource_has_next>,</#if>
    </#list>
    ]
}

