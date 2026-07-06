import os 
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
load_dotenv()
llm=ChatGroq(
    model="llama3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)
resume_prompt=ChatPromptTemplate.from_messages([
    ('system', """You are a professional resume assistant .analyse the given resume analyser.Analyse the given resume text and provide :
     1.key skills found
     2 Experience level (Junior/mid/senior)
     3 strengths
     4 areas to improve
     5 suggest job roles
     keep the analysis concise and to the point"""),
    ("human", "{resume_text}")  
])
resume_chain=resume_prompt|llm

def analyse_resume(resume_text:str)->str:
    response=resume_chain.invoke({"resume_text":resume_text})
    return response.content 