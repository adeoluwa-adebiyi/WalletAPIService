export interface Message{

    entityId: String;

    version: String;

    name: String;

    getVersion(): String;

    getKey(): String;

}