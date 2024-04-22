class Convert {
    static intToUint16LE(value) {
        return value & 0xffff;
    }

    static intToUint32LE(value) {
        return value & 0xffffffff;
    }

    static ipToString(value: Uint8Array) {
        return Array.from(value)
            .map((byte) => byte.toString())
            .join(".");
    }

    static macToString(value: Uint8Array) {
        return Array.from(value)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join(":")
            .toUpperCase();
    }

    static bufferToString(value: Buffer) {
        return Array.prototype.map
            .call(new Uint8Array(value), (x) =>
                ("00" + x.toString(16)).slice(-2).toUpperCase()
            )
            .join("")
            .match(/[a-fA-F0-9]{2}/g)
            .reverse()
            .join(" ");
    }
}

export { Convert };
