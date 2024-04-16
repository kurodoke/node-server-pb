import * as windows1251 from 'windows-1251';
import * as windows1252 from 'windows-1252';

interface IPacket {
    opcode: number;
    buf: Buffer;
    offset: number;
    max_offset: number;


    read();
    write();
    proc(): Promise<Packet[]>;
}

type TPacket = "read" | "write";

class Packet implements IPacket{
    public opcode: number;
    public buf: Buffer;
    public offset: number;
    public max_offset: number;

    constructor(type: TPacket, opcode: number, data: Buffer = null){
        /**
         * if the type is read then assign data to buffer
         * if not then allocate a new buffer
         */
        if(type === "read"){
            this.buf = data;
            this.offset = 0; // we read the packet start from 0 (the first)
            this.max_offset = data.length;
        } else {
            this.buf = Buffer.alloc(0);
        }
        this.opcode = opcode;
    }

    /**
     * method to target the the current index the buffer focused on
     * @param size size of offset to be increased
     */
    private incrementOffset(size: number){
        this.offset = this.offset + size

        if (this.offset > this.max_offset) {
            throw new Error("Offset exceed from the max offset!");
        }
    }

    /**
     * method to write an IP into buffer
     * @param string an ip address that joined with '.' for example "127.0.0.1"
     */
    writeIP(address: string) {
        this.writeB(Buffer.from(address.split(".").map(Number)));
    }

    /**
     * method to write an array of byte -`UInt8` into buffer
     * @param Uint8Array an array of byte
     */
    writeB(value: Uint8Array) {
        this.buf = Buffer.concat(
            [this.buf, value],
            this.buf.length + value.length
        );
    }

    /**
     * method to write a 4 byte of number or boolean into buffer
     * @param value it can be number or boolean 
     */
    writeD(value: number | boolean) {
        if(typeof value == "boolean"){
            value = value ? 1 : 0;
        } 
        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(value, 0);
        this.writeB(buffer);

    }

    /**
     * method to write a 2 byte of number into buffer
     * @param value number
     */
    writeH(value: number) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(value, 0);
        this.writeB(buffer);
    }

    /**
     * method to write a 1 byte of number into buffer
     * @param value number or boolean
     */
    writeC(value: number | boolean) {
        if (typeof value == "number"){
            const buffer: ArrayBuffer = new ArrayBuffer(1);
            const view: Int8Array = new Int8Array(buffer);
    
            view[0] = value;
    
            this.buf = Buffer.concat([this.buf, Buffer.from(buffer, 0, 1)]);
        } else {
            let temp : number = value ? 1 : 0;

            const buffer = Buffer.alloc(1);
            buffer.writeUInt8(temp, 0);
            this.buf = Buffer.concat([this.buf, buffer]);
        }
    }

    /**
     * method to write a 8 byte of number into buffer
     * @param value number
     */
    writeQ(value: number) {
        const buffer = Buffer.alloc(8);
        buffer.writeBigUInt64LE(BigInt(value), 0);
        this.writeB(buffer);
    }

    /**
     * method to write a string with utf-16le format into buffer
     * @param value string
     */
    writeS(value: string) {
        if (value != null) {
            const buffer = Buffer.from(windows1251.encode(value));
            this.writeB(buffer);
        }
    }

    // writeT(value: number) {
    //     const buffer = Buffer.alloc(4);
    //     buffer.writeFloatLE(value, 0);
    //     this.writeB(buffer);
    // }

    // writeF(value: number) {
    //     const buffer = Buffer.alloc(8);
    //     buffer.writeDoubleLE(value, 0);
    //     this.writeB(buffer);
    // }

    // writeEN(){
    //     const buffer = Buffer.alloc(1);
    //     buffer.writeUInt8(204, 0); //cc
    //     this.buf = Buffer.concat([this.buf, buffer]); 
    // }


    /**
     * method to read and return value from the packet in array of byte
     * @param length the length of byte to be read from buffer
     * @returns array of byte
     */
    readBs(length: number): Uint8Array{
        let res = new Uint8Array(length);
        this.buf.copy(res, 0, this.offset, this.offset + length);
        this.incrementOffset(length);
        return res;
    }

    /**
     * method to read and return value from the packet in one type of number
     * @param length the length of byte to be read from buffer
     * @returns number
     */
    readB(length: number) : number{
        let res = this.buf.readUintLE(this.offset, length);
        this.incrementOffset(length);
        return res;
    }

    /**
     * method that read 1 byte from buffer then return it as number
     * @returns number
     */
    readC() : number{
        let res = this.buf.readUint8(this.offset);
        this.incrementOffset(1);
        return res;
    }

    /**
     * method that read 4 byte (integer) from buffer then return it as number
     * @returns number
     */
    readD() : number{
        let res = this.buf.readUInt32LE(this.offset);
        this.incrementOffset(4);
        return res;
    }

    /**
     * method that read 2 byte (short) from buffer then return it as number
     * @returns number
     */
    readH(): number{
        let res = this.buf.readInt16LE(this.offset);
        this.incrementOffset(2);
        return res;
    }

    /**
     * method that read 8 byte (long) from buffer then return it as bigint
     * @returns bigint
     */
    readQ(): bigint{
        let res = this.buf.readBigUint64LE(this.offset);
        this.incrementOffset(8);
        return res;
    }

    /**
     * method that read some of byte from buffer then format the byte to string with windows1251 encoding
     * @returns string
     */
    readS(size: number): string{
        let textBuf = Buffer.alloc(size)
        this.buf.copy(textBuf, 0, this.offset, this.offset + size);
        this.incrementOffset(size);
        return windows1251.decode(textBuf);
    }

    /**
     * method that read some of byte from buffer then format the byte to string with windows1252 encoding
     * @returns string
     */
    readT(size: number): string{
        let textBuf = Buffer.alloc(size)
        this.buf.copy(textBuf, 0, this.offset, this.offset + size);
        this.incrementOffset(size);
        return windows1252.decode(textBuf);
    }
    

    write(){}
    read(){}
    async init(): Promise<void>{return;}
    async proc(): Promise<Packet[]>{return [this];}
}

export { Packet, IPacket }