import wol from "wol";
import { wakeHost } from "../src";
import { Host } from "../src/types/host";

describe("@adam-chalmers/wol @unit index.ts", () => {
    const broadcastAddress = "192.168.1.1";
    const host: Host = {
        mac: "01:23:45:67:89:AB",
        port: 9
    };

    it("Should only call the wol lib once", async () => {
        const wakeMock = jest.fn();
        wol.wake = wakeMock.mockImplementation(async () => true);
        await wakeHost(host, broadcastAddress);
        expect(wakeMock.mock.calls.length).toEqual(1);
    });

    it("Should call the wol lib with the given values", async () => {
        const wakeMock = jest.fn();
        wol.wake = wakeMock.mockImplementation(async () => true);
        await wakeHost(host, broadcastAddress);
        expect(wakeMock.mock.calls[0]).toEqual([host.mac, { address: broadcastAddress, port: host.port }]);
    });

    it("Should return true if the packet is successfully sent", async () => {
        wol.wake = jest.fn().mockImplementation(async () => true);
        await expect(wakeHost(host, broadcastAddress)).resolves.toEqual(true);
    });

    it("Should throw an error if the packet is not successfully sent", async () => {
        wol.wake = jest.fn().mockImplementation(async () => false);
        await expect(wakeHost(host, broadcastAddress)).rejects.toThrowError();
    });

    it("Should throw an error if the wol lib throws an error", async () => {
        wol.wake = jest.fn().mockImplementation(() => Promise.reject(new Error("")));
        await expect(wakeHost(host, broadcastAddress)).rejects.toThrowError();
    });
});
