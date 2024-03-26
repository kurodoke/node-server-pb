export function decrypt(data: Buffer, shift: number) : Buffer{
    let newBuffer = Buffer.copyBytesFrom(data, 0, data.length);
    let lastElement = newBuffer[newBuffer.length - 1];

    for (let index = newBuffer.length - 1; index > 0; index--) {
        newBuffer[index] = (((newBuffer[index - 1] & 255) << (8 - shift)) | ((newBuffer[index] & 255) >> shift));
        newBuffer[0] = ((lastElement << (8 - shift)) | ((newBuffer[0] & 255) >> shift));
    }

    return newBuffer;
}