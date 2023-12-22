export interface SearchResult {
    content: string;
    disabled: boolean;
    name: string;
    object_type: "record" | "zone" | "comment";
    zone_id: string;
    zone: string;
    type: string;
    ttl: number;
}
