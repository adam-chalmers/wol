import wol from "wol";
import { WOL } from "../src";
import { Host } from "../src/types/host";

describe("@adam-chalmers/wol @unit index.ts", () => {
    const instance: WOL = new WOL("");
    const host: Host = {
        mac: "01:23:45:67:89:AB",
        port: 9
    };

    it("Should return true if the packet is successfully sent", () => {
        wol.wake = jest.fn().mockImplementation(async () => true);
        expect(instance.sendPacket(host)).resolves.toBe(true);
    });

    it("Should throw an error if the packet is not successfully sent", () => {
        wol.wake = jest.fn().mockImplementation(async () => false);
        expect(instance.sendPacket(host)).rejects.toThrowError();
    });

    it("Should throw an error if the wol lib throws an error", () => {
        wol.wake = jest.fn().mockImplementation(() => Promise.reject(new Error("")));
        expect(instance.sendPacket(host)).rejects.toThrowError();
    });
});
