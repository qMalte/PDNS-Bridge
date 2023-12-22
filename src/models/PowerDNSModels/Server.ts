export interface Server {
    type: string;
    id: string;
    daemon_type: "recursor" | "authoritative";
    version: string;
    url: string;
    config_url: string;
    zones_url: string;
}