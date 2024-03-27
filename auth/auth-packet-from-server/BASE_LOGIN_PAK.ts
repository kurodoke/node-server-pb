import { IPacket, Packet } from "../../core-network/packet";

interface IBASE_LOGIN_PAK extends IPacket{
    login: number;
    zero: number;
    user: string;
}

class BASE_LOGIN_PAK extends Packet{
    login: number;
    zero: number; //allow
    user: string;

    constructor(opcode: number, login: number ,zero: number, user:string){
        super("write", opcode);
        this.login = login;
        this.zero = zero;
        this.user = user; 
    }

    write() {
        this.writeD(this.login);
        this.writeC(0);
        this.writeQ(1);
        this.writeC(this.user.length);
        this.writeS(this.user);
        this.writeH(this.zero);
    }

}

export {BASE_LOGIN_PAK, IBASE_LOGIN_PAK};