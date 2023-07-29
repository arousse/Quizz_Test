# eala-project

## Getting started

Make sure you have installed:

- MongoDB (min. version 6.0.6 )
- Node (min. version 16.17.1)
- NPM (min version 9.6.7)
  To setup this project run:

```
git clone git@gitlab2.cip.ifi.lmu.de:liesfeld/eala-project.git
cd eala-project
npm i
npm run prepare
npm i --prefix client
npm i --prefix api
```

## Usage (Development)

### Server

```
npm start --prefix api
```

### request to api
you can request the api by the following url schema

```
http//localhost:8080/api/question?type=<item_type>&domain=<domain_of_the_question>
```

### response from the api
You can validate a question by using the question id and answer:

- answer: An array that contains all answers. The api will validate the answer array. If the answer is right it return {result 'correct'} if
the answer is false it return {result: 'incorrect} 



### Client

```
npm start --prefix client
```

### Connect client with api
The App.jsx contains <Play> Component. This component has tree parameters requestString, type and domain.
- requestString: string to build the url string for the connection to the api
- type: a query that contains the item type e.g. multipleChoice
- domain: a query that contains the question domain e.g. potato

```javaScript
<Play requestString="api/question" domain="nature" type="multipleChoice" />
```
It will give you all question they match the domain and type. The response has the following format
```
[
  _id, 
  question,
  questionType,
  answers: []
]
The entries in the answer array are different, depend on the item type (questionType)


## TODO Backend
- User management mit Scorning System, Learn analytics management 
- mehrere Items Typs: am besten Bilder
- Dashboard (Wie viel Online time, wie viel Zeit geübt, Anzahl der Bearbeiteten Fragen)


