import axios from "axios";
import type { ChatRequest, ChatResponse } from "../types/chat";

const API_URL = "http://localhost:8001/chat";

export const sendMessage = async (
  data: ChatRequest
): Promise<ChatResponse> => {
  const response = await axios.post<ChatResponse>(
    `${API_URL}/`,
    data
  );

  return response.data;
};