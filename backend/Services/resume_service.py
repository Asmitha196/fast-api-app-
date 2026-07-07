import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)

resume_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a professional resume analysis assistant.

Analyze the given resume and provide:

1. Key skills found
2. Experience level (Junior / Mid-Level / Senior)
3. Strengths
4. Areas for improvement
5. Suggested job roles

Keep the response concise and well-structured.
        """
    ),
    ("human", "{resume_text}")
])

resume_chain = resume_prompt | llm


def analyse_resume(resume_text: str) -> str:
    response = resume_chain.invoke(
        {"resume_text": resume_text}
    )
    return response.content