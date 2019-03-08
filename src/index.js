import { $ } from "@dekproject/scope";
import Keycloak from "keycloak-connect";
import session from "express-session";

export default async () => {
    try{
        var memoryStore = new session.MemoryStore();
        let keycloak = new Keycloak({ store: memoryStore });
        $.set("keycloak", keycloak);
        $.set("memoryStore", memoryStore);
    }
    catch (e) {
        console.log(`[ Keycloak ] - ${e.message}`);
    }
}
