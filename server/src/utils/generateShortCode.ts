import crypto from "node:crypto";

const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const length = 7;

export function generateShortCode(): string {
    const bytes = crypto.randomBytes(length);
    let code = "";
    for (const byte of bytes){
        code += characters[byte % characters.length];
    }

    return code;
}