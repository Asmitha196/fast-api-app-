import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

from Services.qdrant_service import search_jobs

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)

rag_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a helpful job recommendation assistant.

Use ONLY the retrieved job descriptions to answer the user's question.

If no relevant information is available, reply:
"I don't know based on the available job descriptions."

Retrieved Jobs:
{context}
        """,
    ),
    ("human", "{question}")
])

rag_chain = rag_prompt | llm


def rag_job_search(question: str) -> str:
    results = search_jobs(question, top_k=5)

    if not results:
        return (
            "No jobs found in the database. "
            "Please run /rag/embed-jobs first."
        )

    context = "\n".join(
        [
            f"Title: {r['title']}\n"
            f"Description: {r['description']}\n"
            f"Salary: {r['salary']}\n"
            f"Company: {r.get('company', 'N/A')}\n"
            f"Match Score: {r['score']}\n"
            for r in results
        ]
    )

    response = rag_chain.invoke(
        {
            "context": context,
            "question": question,
        }
    )

    return response.content