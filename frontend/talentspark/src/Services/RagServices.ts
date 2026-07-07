import api from "./api";

type SemanticSearchResponse = {
  results: Array<{
    job_id?: number;
    title: string;
    description: string;
    salary?: number | null;
    score: number;
  }>;
};

type RagAnswerResponse = {
  answer: string;
};

type ResumeAnalysisResponse = {
  analysis: string;
};

type JobMatchResponse = {
  matches: Array<{
    job_id?: number;
    title: string;
    description: string;
    salary?: number | null;
    match_score: number;
  }>;
};

export async function searchJobs(query: string): Promise<SemanticSearchResponse> {
  const response = await api.post<SemanticSearchResponse>("/rag/search", { query });
  return response.data;
}

export async function askRag(question: string): Promise<RagAnswerResponse> {
  const response = await api.post<RagAnswerResponse>("/rag/ask", { question });
  return response.data;
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysisResponse> {
  const response = await api.post<ResumeAnalysisResponse>("/rag/analyse-resume", { resume_text: resumeText });
  return response.data;
}

export async function matchJobs(skills: string, experience: string): Promise<JobMatchResponse> {
  const response = await api.post<JobMatchResponse>("/rag/job-match", { skills, experience });
  return response.data;
}
