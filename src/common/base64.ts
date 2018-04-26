import { fromByteArray, toByteArray } from 'base64-js';

export function toBase64(buf: ArrayBuffer) {
  return fromByteArray(new Uint8Array(buf));
}

export function fromBase64(data: string) {
  return toByteArray(data).buffer;
}
