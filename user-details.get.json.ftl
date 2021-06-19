

<#if status.code = 200>

{
    "schemas":  [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "id":"${result.id}",
    "userName":"${result.userName!}",
    "active":"${result.active?c}",
    "name": {
    "familyName":"${result.familyName!"no value"}",
    "givenName":"${result.givenName!"no value"}"
    },
    "emails": [{
    "value":"${result.email!"no value"}"
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