import { Packet } from "../../core-network/packet";

let user ={
    user: "abc",
    password: "abc",
}


class BASE_LOGIN_PAK extends Packet{
    public client_version: string;
    public user_length: number;
    public password_length: number;
    public user: string;
    public password: string;
    public mac: Uint8Array | number;
    public zero: number;
    public connection: number;
    public ip: Uint8Array | number;
    public launcher_key: bigint;
    public userfilelist: string;
    public HWID: string;

    private login: boolean;

    constructor(opcode: number, data: Buffer){
        super("read", opcode, data);
    }

    read(){
        // this.offset = 2;
        // let opcode = this.readH();
        // this.offset = this.offset + 2; //skip 2 bytes
        this.client_version = this.readC() + "." + this.readH() + "." + this.readH() + "." + this.readC();
        this.user_length = this.readC();
        this.password_length = this.readC();
        this.user = this.readS(this.user_length).trim();
        this.password = this.readS(this.password_length).trim();
        this.mac = this.readBs(6);
        this.zero = this.readH();
        this.connection = this.readC();
        this.ip = this.readBs(4);
        this.launcher_key = this.readQ();
        this.userfilelist = this.readS(32);
        this.readD();
        this.HWID = this.readS(32);
        this.readC();

    }

    write(){
        let value = this.checkLogin()

        this.writeD(value);
        this.writeC(0);
        this.writeQ(1);
        this.writeC(this.user_length);
        this.writeS(this.user);
        this.writeH(this.zero);

        console.log("val:");
        console.log(value);
        console.log("buf:");
        console.log(this.buf);
        
    }

    checkLogin(): number{
        let success_opcode = 1;
        let invalid_opcode = 0x80000102;
        if(this.user.slice(0, this.user.length - 1) && this.password.slice(0, this.password.length - 1) == user.password){
            return success_opcode;
        } 
        return invalid_opcode;
    }
}

export {BASE_LOGIN_PAK}