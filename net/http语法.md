.http 简易的REST客户端，现在的语法支持有点不一致



## VS

`{{<request name>.(response|request).(body|headers).(*|JSONPath|XPath|<header name>)}}.`

```
@host=http://127.0.0.1:19001

###

# @name login
POST {{host}}/api/system/account/debugging
Content-Type: application/json

###

GET {{host}}/api/system/account
Content-Type: application/json
Authorization: Bearer {{login.response.body.$.token}}

###
```

## RIDER

```rider
@host=http://127.0.0.1:19001

###

POST {{host}}/api/system/account/debugging
Content-Type: application/json

> {% client.global.set("auth_token", response.body.token); %}

###

GET {{host}}/api/system/account
Content-Type: application/json
Authorization: Bearer {{auth_token}}

###
```

