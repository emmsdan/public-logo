# Public Assets

#### Note: currently supports few nigerian logos, more coming soon


### How to use API

##### Base URL:
```$xslt
https://assets.emmsdan.com.ng/api/
```

##### GET ALL LOGOS

```$xslt
${base_url}/logo
```
##### FIND A LOGO

****Request***
```$xslt
${base_url}/logo/search/:keyword
eg. https://assets.emmsdan.com.ng/api/logo/search/united_bank
eg. https://assets.emmsdan.com.ng/api/logo/search/united%20bank
```
****Success Response****
```javascript
[
    {
        "item": {
            "title": "United Bank for Africa",
            "filename": "united_bank_for_africa",
            "url": "https://www.ubagroup.com/",
            "short_code": "uba",
            "category": [
                "Banking",
                "Financial Services"
            ]
        },
        "refIndex": 13,
        "score": 0.00030151134457776364
    }
]
```

****Failed Response****
```javascript
[
    {
       "item": {
            "title": "No search found for key ('united bank933')"
            "filename": "not_found.png",
            "url": "http://www.emmsdan.com/",
            "category": [
                404,
                "not_found"
            ]
      },
    }
]
```

##### GET A LOGO IMAGE

****Request***
```$xslt
${base_url}/logo/img/:keyword 
${base_url}/logo/img/:keyword/:type 

eg. https://assets.emmsdan.com.ng/api/logo/img/united_bank_for_africa
eg. https://assets.emmsdan.com.ng/api/logo/img/united_bank_for_africa/png
```
****Response***
```
Returns an actual image file.
defaults to svg if type not specified
for keyword use file name returned from the find logo search, 
but can also find and return image with the highest score count.

if search and keyword not found, returns an image placeholder
```

****Supported Types***
```javascript
{
	types: ["svg", "png"]
}
```
### TODOs:
| |                 
|-------------------------|
| More Logos         |
| API references;         |
| Just fun stuffs;         |


### Contributors
| Name                 | Handle/Url                                        |
|-------------------------|--------------------------------------------|
| Emmanuel Danie;         | https://twitter.com/emmsdan|
|-------------------------|--------------------------------------------|
|                         |                                            |

### Third parties Libs;

| Library                 | URL                                        |
|-------------------------|--------------------------------------------|
| FuseJs                  | https://fusejs.io/                         |
| PaystackHQ/nigerialogos | https://github.com/PaystackHQ/nigerialogos |
|-------------------------|--------------------------------------------|
|                         |                                            |