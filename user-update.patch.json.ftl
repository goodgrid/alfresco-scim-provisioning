<#if status.code = 200>
{


    
}

<#else>
    {
    "schemas":  [
    "urn:ietf:params:scim:api:messages:2.0:Error"
    ],
    "detail":"${status.message!}"
    }

</#if>