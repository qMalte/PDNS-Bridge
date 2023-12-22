import { Record } from "./Record";

export interface RRSet {
    name: string;
    type: string;
    ttl?: number;
    changetype?: "REPLACE" | "DELETE";
    records?: Record[];
    comments?: Comment[];
}