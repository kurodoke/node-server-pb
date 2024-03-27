class Convert{
    static intToUint16LE(value) {
        return value & 0xFFFF;
    }

    static intToUint32LE(value) {
        return value & 0xFFFFFFFF;
    }

    static ipToString(value: Uint8Array){
        return Array.from(value)
        .map(byte => byte.toString())
        .join('.')
    }

    static macToString(value: Uint8Array){
       return  Array.from(value)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join(':')
            .toUpperCase();
    }
}

export {Convert};