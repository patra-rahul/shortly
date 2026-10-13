# Auth System

RS256 uses a key pair so the backend can sign tokens and Envoy can verify them without receiving the signing secret.

| Comparison | Private key | Public key |
| --- | --- | --- |
| Purpose | Signs access and refresh tokens | Verifies token signatures |
| Location | Backend (`private.pem`); kept secret | Envoy receives it in JWKS format |
| Reuse | Same key signs tokens for all users | Corresponding key verifies those tokens |

Signing proves authenticity; it does not encrypt the token payload.

- **jose** for JWT signing and JWKS.
- **argon2** for hashing passwords.
- **mongoose** for storing users and refresh sessions.
- **cookie-parser** for reading refresh-token cookies.
