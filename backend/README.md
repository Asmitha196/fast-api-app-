# fast-api-app-

## creating fastapi application

## crud operations
-create
-read
-update
-delete

## rest api
-get
-post

## status code
-200 ok
-201 created
-204 no content
-400 bad request
-401 unauthorized access
-403 forbidden
-404 fage not found
-405 method not allowed
-409 conflict
-500 Internal server error 

## Architecture of fastapi application
-Model--tables creation
-Router--routes request to controllers
-Controller--controller logic
-Service--business logic
-Repository--data acess layer
-Middleware--request procesing pipeline 

# datbase
## relational database
-mysql
-postdresql
-sql
-sqlite

## non relational database 
-dynamodb
-redis
-cassandra
-mongodb

## constraints in database
-primary key--eg-student_id
-foreign key--eg-department_id in student table
-unique --eg-email,phonenumber
-not null --eg-name
-check --eg-salary > 0
-default --eg-timestamp:func.now()

# modules
-sqlalchemy -- orm(object relational mapping)
-uvicorn -- server for running fastapi
-application --> 'uvicorn app.main:app --reload'
-fastapi -- web framework
-psycopg2 -- postgresql drivers
-pydantic -- data validation 
-typing-extensions -- type hints
-alembic --database migration 
## concepts
-ORM 
-Object relational mapping --> to convert the python code to the sql code  without writting the sql commands 
-Depends 
-Dependency injection --> to inject dependencies into route handlers
-Sessionmaker
-To craete a session with the database
-SessionLocal
-To create a session with the dtabase for a single request
-declarative_base
-to create a base class for all the models 

# alembic
pip install alembic
alembic init alembic
alembic -> env.py -> from imported model -> metadata data
alembic.ini -> sqlalchemy.url to postgresql database url
postgresql://user:password@host:port/database_name
alembic revision --autogenerate -m "initial migration"
alembic upgrade head

nmp install vite@latest
cd talentspark
npm run dev
javascript -> ES^ -> arrow function,rest and spread,tempelate literals,destructuring,promises,async/await 
dom(document object manipulation)-> react 
virtual dom->copy of original dom that willl update the react dom and then the updated dom will be updated in real dom 
components -which are different section of the web pages 

npm install axios
ui>axios->localhost:8000->fastapi->db->useeffect->setstate->render->rerender->ui

useeffect-which is used to call the api or which is used to fetch the data from the api automatically when the page is loaded 

useState -which is used to store the data in the component and which will update te component when the data is updated or changed 

promise- handles asynchronous operations 
asynchronous-handle concurrent requests 