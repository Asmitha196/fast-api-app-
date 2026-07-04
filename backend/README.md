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

# hashing algorithm

argon2
bcrypt

python-jose[cryptography] - used to create JWT tokens

JWT Tokens
- Used to authenticate and authorize users.
- Format: xxxx.yyyy.zzzz (3 parts)

1. Header
   - Algorithm + Token Type
   - Example:
     {
       alg: HS256,
       typ: JWT
     }

2. Payload
   - Contains data
   - Example:
     {
       user_id: 1,
       role: "admin"
     }

3. Signature
   - Used to verify the token.
   - Signature = hash(header + payload + secretKey)

Access Token
- Used to access protected resources.

Refresh Token
- Used to refresh the access token.

Installation:
pip install python-multipart

RBAC
Role based access contrll
used to give different permissions to different roles
eg admin can do anything user can do only specific things
use oauth2 module to implement RBAC
get_current_user()-for authenticated user
role_required-for role based acess controll
create_access_token()-for creating access token with (secret_key ,algorith,payload )-token created then verify_access_token()-for decoding access token with (secret_key,algorithm,token)-token decoded then 

Architecture
backend/
  app/
   main.py
   database.py
   models/
    users.py
    company.py
    job.py
   schemaas
    users.py
    company.py
    job.py
  routers/
  users.py
  company.py
  job.py
 utils/
  token.py
  security.py
  oauth2.py
alembic.ini
alembic/env.py
SSE-Server sent events it is used to send the response from server client in the form of chunks of text so taht we can response in form of chumks of text like chatbot ui

RAG retreival augmented generation
it is used to incerese the accuracy of llm by providing relevant information to llm 

context window -it is the amximum number of words that the llm can process at a time 

langchain-its a framework to build llms it is use to connect llm to external sources of information like database,files,websites, it is used to create complex workflows of llm like cahtbot that can answer questions about specifuc documents

llm-large language model 