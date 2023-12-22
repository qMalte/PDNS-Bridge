export interface TSIGKey {
    name: string;
    id: string;
    algorithm: string;
    key: string; // Base64 encoded secret key
    type: "TSIGKey";
}
