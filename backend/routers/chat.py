from fastapi import APIRouter
from schemas.chat import ChatRequest
from Services.langchain_services import ask_ai

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

@router.post("/")
def chat(request: ChatRequest):

    response = ask_ai(request.query)

    return {
        "response": response
    }