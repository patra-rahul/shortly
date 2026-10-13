import { readFileSync } from "node:fs";
import { createPrivateKey, createPublicKey } from "node:crypto";
import { SignJWT, exportJWK } from "jose";

const privateKey = createPrivateKey(
    readFileSync("keys/private.pem")
)

