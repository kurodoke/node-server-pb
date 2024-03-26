class Convert{
    static intToUint16LE(value) {
        return value & 0xFFFF;
    }

    static intToUint32LE(value) {
        return value & 0xFFFFFFFF;
    }
}

export {Convert};