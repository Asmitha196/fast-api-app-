import os

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory

# =========================
# LLM
# =========================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    groq_api_key=GROQ_API_KEY
)

# =========================
# Prompt
# =========================

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI career assistant."),
    ("human", "{user_query}")
])

chain = prompt | llm

# =========================
# Memory Store
# =========================

store = {}

def get_history(session_id: str):
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

chat_with_memory = RunnableWithMessageHistory(
    runnable=chain,
    get_session_history=get_history,
    input_messages_key="user_query"
)

# =========================
# Functions
# =========================

def ask_ai(query: str):

    response = chain.invoke({
        "user_query": query
    })

    return response.content


def ask_ai_with_memory(query: str, session_id: str):

    response = chat_with_memory.invoke(
        {"user_query": query},
        config={
            "configurable": {
                "session_id": session_id
            }
        }
    )

    return response.content