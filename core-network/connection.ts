const { ByteToMessageDecoder } = require("net");
const NetworkUtil = require("./core.utils");
const Logger = require("./core.log");
const IDFactory = require("./core.utils");

class Connection extends ByteToMessageDecoder {
    constructor(socket, serverIndex) {
        super();
        this.id = IDFactory.gI().nextId(); // 5404
        this.SECURITY_KEY = 29890;
        this.CRYPT_KEY = ((this.id + this.SECURITY_KEY) % 7) + 1;
        this.HASHCODE = 32759;
        this.LENGTH = 0;
        this.LEAVEP2P = 0;
        this.serverIndex = serverIndex;
        this.shieldProtection = null;
        this.antiCheaterVerific = false;
        this.readHeader = true;
        this.decrypt = false;
        this.hasUnregistered = false;
        this.forceClose = false;
        this.channel = null;
        this.ip = null;
        this.mac = null;
        this.socket = socket;
        this.address = socket.remoteAddress();
    }

    channelActive(ctx) {
        this.channel = ctx.channel();
        const remote = this.channel.remoteAddress();
        if (remote != null) this.ip = NetworkUtil.parseIp(remote.toString());
    }

    decode(ctx, inBuffer, out) {
        // SocketChannel channel = (SocketChannel) ctx.channel();
        // if (channel.isActive() && socket.isActive() && channel.isOpen() && socket.isOpen())
        //     return;
        // close(null);
    }

    channelReadComplete(ctx) {
        ctx.flush();
    }

    channelUnregistered(ctx) {
        if (ctx != null) super.channelUnregistered(ctx);
        if (ctx != null || this.forceClose) {
            IDFactory.gI().releaseId(this.id);
            this.finalize();
        }
        this.hasUnregistered = true;
    }

    exceptionCaught(ctx, cause) {
        if (cause.message === "blockbot") return;
        if (cause instanceof Error) {
            // ctx.pipeline().remove(this);
            // ctx.pipeline().fireChannelRegistered();
            this.channel.flush();
            this.channel.close();
            ctx.channel().flush();
            ctx.channel().close();
            ctx.close();
        } else {
            this.excp(cause);
        }
    }

    getIPBytes() {
        try {
            return NetworkUtil.parseIpToBytes(this.ip);
        } catch (e) {
            return [1, 0, 0, 127];
        }
    }

    close(packet) {
        try {
            if (packet != null) this.sendPacket(packet);
            if (this.channel != null) {
                this.channel.flush();
                this.channel.close();
            }
            this.forceClose = true;
        } catch (e) {
            // handle error
        }
    }

    toString() {
        return `Client [id:${this.id}, ip: ${this.ip}]`;
    }

    excp(e) {
        Logger.gI().info("error", e, "", this.constructor);
    }

    sendPacket(packet) {
        
    }

    start(){
        
    }
}

export { Connection };
