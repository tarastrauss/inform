#Inform
### An app for informing US voters

[trello](https://trello.com/b/MR9HrXhq/inform)

“Democracy cannot succeed unless those who express their choice are prepared to choose wisely. The real safeguard of democracy, therefore, is education.” 
― Franklin D. Roosevelt

####Technologies

The following technologies were used to create Inform

* Javascript
* jQuery
* HTML5
* CSS
* Angular
* MongoDB & Mongoose
* Express
* Node.js
* Bootstrap
* Angular-Bootstrap
* Moment
* Ng-Animate
* Animate.css

The following API's were used to create Inform 

* IBM Watson Alchemy API (for search queries)
* Google Civics API (for polling information)


## Data Models

####User Model Schema

Key|Value Type|Description|Example|
----------|-----|-----------|-------|
`firstName`|String|*added by user during sign up*
`lastName`|String|*added by user during sign up*
`email`|String|added by user during sign up*
`dob`|Date|*added by user during sign up*
`queries`|[query schema]|*added by user during news search*
`friends`|[friend schema]|*added by user during friend search*
`voteInfo`|voteSchema|*added by user during polling location search*
`address`|String|*added by user during polling location search*

`created`|String|*captured when New User is created*
