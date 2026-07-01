import type { Job } from "./job";

export type Company = {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    jobs: Job[];
};