type byte = number;


class SendPacket {
    buf = Buffer.alloc(0);
    disposed = false;

    dispose() {
        if (!this.disposed) return;
        this.buf.fill(0);
        this.disposed = true;
    }

    writeIP(address: string) {
        this.writeB(Buffer.from(address.split(".").map(Number)));
    }

    writeB(value: Uint8Array) {
        this.buf = Buffer.concat(
            [this.buf, value],
            this.buf.length + value.length
        );
    }

    writeD_bool(bool: boolean) {
        let temp : number = bool ? 1 : 0;
        const buffer = Buffer.alloc(4);
        buffer.writeUInt8(temp, 0);
        this.writeB(buffer);
    }

    writeD(value: number) {
        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(value, 0);
        this.writeB(buffer);
    }

    writeH_u(value: number) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(value, 0);
        this.writeB(buffer);
    }

    writeH(value: number) {
        const buffer = Buffer.alloc(2);
        buffer.writeInt16LE(value, 0);
        this.writeB(buffer);
    }

    writeC(byte: byte) {
        const buffer: ArrayBuffer = new ArrayBuffer(1);
        const view: Int8Array = new Int8Array(buffer);

        view[0] = byte;

        this.buf = Buffer.concat([this.buf, Buffer.from(buffer, 0, 1)]);
    }

    writeC_bool(bool: boolean) {
        let temp : number = bool ? 1 : 0;

        const buffer = Buffer.alloc(1);
        buffer.writeUInt8(temp, 0);
        this.buf = Buffer.concat([this.buf, buffer]);
    }

    writeT(value: number) {
        const buffer = Buffer.alloc(4);
        buffer.writeFloatLE(value, 0);
        this.writeB(buffer);
    }

    writeF(value: number) {
        const buffer = Buffer.alloc(8);
        buffer.writeDoubleLE(value, 0);
        this.writeB(buffer);
    }

    writeQ(value: number) {
        const buffer = Buffer.alloc(8);
        buffer.writeBigInt64LE(BigInt(value), 0);
        this.writeB(buffer);
    }

    writeQ_u(value: number) {
        const buffer = Buffer.alloc(8);
        buffer.writeBigUInt64LE(BigInt(value), 0);
        this.writeB(buffer);
    }

    writeS(value: string) {
        if (value != null) {
            const buffer = Buffer.from(value, "utf-16le");
            this.writeB(buffer);
        }
    }

    writeEN(){
        const buffer = Buffer.alloc(1);
        buffer.writeUInt8(204, 0); //cc
        this.buf = Buffer.concat([this.buf, buffer]); 
    }

    write(){}
}

export {SendPacket};