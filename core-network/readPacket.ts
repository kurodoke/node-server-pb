import * as windows1251 from 'windows-1251';
import * as windows1252 from 'windows-1252';


class readPacket{
    public buf: Buffer;
    public offset: number;
    public max_offset: number;

    readB(length: number) : number{
        let res = this.buf.readUintLE(this.offset, length);
        this.incrementOffset(length);
        return res;
    }

    readC() : number{
        let res = this.buf.readUint8(this.offset);
        this.incrementOffset(2);
        return res;
    }

    readH(): number{
        let res = this.buf.readInt16BE(this.offset);
        this.incrementOffset(2);
        return res;
    }

    readQ(): number{
        let res = this.buf.readInt16BE(this.offset);
        this.incrementOffset(2);
        return res;
    }

    readS(size: number): string{
        let textBuf = Buffer.alloc(size)
        this.buf.copy(textBuf, 0, this.offset, this.offset + size);
        return windows1251.decode(textBuf);
    }

    readT(size: number): string{
        let textBuf = Buffer.alloc(size)
        this.buf.copy(textBuf, 0, this.offset, this.offset + size);
        return windows1252.decode(textBuf);
    }

    private incrementOffset(size: number){
        this.offset = this.offset + size

        if (this.offset > this.max_offset) {
            throw new Error("Offset exceed of the max offset!");
        }
    }
}