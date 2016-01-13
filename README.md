#Inform
### An app for informing US voters

[trello](https://trello.com/b/MR9HrXhq/inform)

“Democracy cannot succeed unless those who express their choice are prepared to choose wisely. The real safeguard of democracy, therefore, is education.” 
― Franklin D. Roosevelt

##Technologies

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

###User Data Model

####User Schema
Key|Value Type|Description|
----------|-----|-----------|
`firstName`|String|*added by user during sign up*
`lastName`|String|*added by user during sign up*
`email`|String|added by user during sign up*
`dob`|Date|*added by user during sign up*
`queries`|[query schema]|*added when user runs news search*
`friends`|[friend schema]|*added by user when following a friend*
`voteInfo`|voteSchema|*added when user runs polling location search*
`points`|Number|*added during user creation, updated constantly*
`address`|String|*added by user during polling place search*
`propsClicked`|[String]|*added by user when proposition links are clicked*

####Vote Schema
Key|Value Type|Description|
----------|-----|-----------|
`hasSearchedd`|Boolean|*added by user runs polling place search*
`myLocationName`|String|*added by user runs polling place search*
`myLocationStreet`|String|*added by user runs polling place search*
`myLocationCity`|String|*added by user runs polling place search*
`myLocationZip`|String|*added by user runs polling place search*
`myLocationState`|String|*added by user runs polling place search*
`myvoteUrl`|String|*added by user during pruns place search*
`elections`|[mixed]|*added by user during pruns place search*
`researchedCandidates`|[candidateSchema]|*added by user runs polling place search*

####Candidate Schema
Key|Value Type|Description|
----------|-----|-----------|
`race`|String|*added by when user clicks candidate link*
`clickedCandidates`|[String]|*added by when user clicks candidate link*
`clickedDem`|[Boolean]|*added by when user clicks candidate link*
`clickedRep`|[Boolean]|*added by when user clicks candidate link*
`clickedIn`|[Boolean]|*added by when user clicks candidate link*

####Friend Schema
Key|Value Type|Description|
----------|-----|-----------|
`firstName`|String|*added when user follows friend*
`lastName`|String|*added when user follows friend*
`userId`|String|*added when user follows friend*
`points`|Number|*added when user follows friend and updated constantly*

####Query Schema
Key|Value Type|Description|
----------|-----|-----------|
`queryInput`|String|*added when user searches for news*
`negativeClick`|Number|*added when user clicks on article*
`positiveClick`|Number|*added when user clicks on article*
`neutralClick`|Number|*added when user clicks on article*


###News Data Model

####News Schema
Key|Value Type|Description|
----------|-----|-----------|
`query`|String|*added when any user searched for news query*
`searchedAt`|String|*added when any user searched for news query, updated when any user searches a day later*
`articles`|[articlesSchema]|*added when any user searched for news query, updated when any user searches a day later*

####Articles Schema
Key|Value Type|Description|
----------|-----|-----------|
`headline`|String|*added when articles schema is updated*
`author`|String|*added when articles schema is updated*
`link`|String|*added when articles schema is updated*
`date`|String|*added when articles schema is updated*
`sentiment`|String|*added when articles schema is updated*

##Routes

####Coming soon!


##Instalation

[click here!](http://inform-yourself.herokuapp.com)

