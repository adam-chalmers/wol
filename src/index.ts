import wol from "wol";
import { Host } from "./types/host";

export class WOL {
    private readonly broadcastAddress: string;

    constructor(broadcastAddress: string) {
        this.broadcastAddress = broadcastAddress;
    }

    public async sendPacket(host: Host): Promise<boolean> {
        try {
            const result = await wol.wake(host.mac, { address: this.broadcastAddress, port: host.port });
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
}
