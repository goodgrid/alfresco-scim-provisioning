<#if status.code = 201>

    {
    "schemas":  [
    "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "id":"${user.id}",
    "userName":"${user.userName!}",
    "active":"${user.active?c}",
    "name": {
    "familyName":"${user.familyName!"no value"}",
    "givenName":"${user.givenName!"no value"}"
    },
    "emails": [{
    "value":"${user.email!"no value"}"
    }]

    }

<#else>
    {
    "schemas":  [
    "urn:ietf:params:scim:api:messages:2.0:Error"
    ],
    "detail":"${status.message!}"
    }

</#if>