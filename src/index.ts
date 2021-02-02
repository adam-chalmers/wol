import wol from "wol";
import { Host } from "./types/host";

export async function wakeHost(host: Host, broadcastAddress: string): Promise<boolean> {
    try {
        const result = await wol.wake(host.mac, { address: broadcastAddress, port: host.port });
        if (result) {
            return true;
        } else {
            throw new Error(`Failed to wake host using MAC ${host.mac} and port ${host.port}`);
        }
    } catch (err) {
        let message = `Failed to wake host using MAC ${host.mac} and port ${host.port}`;
        if (err.message != null) {
            message += `\n${err.message}`;
        }
        throw new Error(message);
    }
}

export { Host } from "./types/host";
