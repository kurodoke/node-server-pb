import { readFileSync } from 'fs';
import * as windows1251 from 'windows-1251';
import * as windows1252 from 'windows-1252';

export class PbParser {
    public buf: Buffer;
    public offset: number = 0;
    public max_offset: number;



    /**
     * method to target the the current index the buffer focused on
     * @param size size of offset to be increased
     */
    private incrementOffset(size: number) {
        this.offset = this.offset + size;

        if (this.offset > this.max_offset) {
            throw new Error("Offset exceed from the max offset!");
        }
    }

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

    public loadFile(path: string): PbParser {
        this.buf = readFileSync(path);
        this.max_offset = this.buf.byteLength;

        return this
    }
}
