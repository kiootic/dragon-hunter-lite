import * as pako from 'pako';

export function compress(data: ArrayBuffer) {
 return pako.deflate(new Uint8Array(data)).buffer;
}

export function decompress(data: ArrayBuffer) {
 return pako.inflate(new Uint8Array(data)).buffer;
}
