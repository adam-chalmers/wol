import wol from "wol";
import { WOL } from "../src";
import { Host } from "../src/types/host";

describe("@adam-chalmers/wol @unit index.ts", () => {
    const broadcastAddress = "192.168.1.1";
    const instance: WOL = new WOL(broadcastAddress);
    const host: Host = {
        mac: "01:23:45:67:89:AB",
        port: 9
    };

    it("Should only call the wol lib once", async () => {
        const wakeMock = jest.fn();
        wol.wake = wakeMock.mockImplementation(async () => true);
        await instance.sendPacket(host);
        expect(wakeMock.mock.calls.length).toEqual(1);
    });

    it("Should call the wol lib with the given values", async () => {
        const wakeMock = jest.fn();
        wol.wake = wakeMock.mockImplementation(async () => true);
        await instance.sendPacket(host);
        expect(wakeMock.mock.calls[0]).toEqual([host.mac, { address: broadcastAddress, port: host.port }]);
    });

    it("Should return true if the packet is successfully sent", () => {
        wol.wake = jest.fn().mockImplementation(async () => true);
        expect(instance.sendPacket(host)).resolves.toEqual(true);
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
