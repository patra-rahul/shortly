# Auth System
- **RS256 Asymmetric** has two keys ( private and public ),
the private key will be used to sign JWTs, while the public key will be used to verify and authorize the user. **HS256 Symmetric** is a single-shared key which compromises security.

- **jose** for JWT signing and JWKS.
- **argon2** for hashing passwords.
- **mongoose** for storing users and refresh sessions.
- **cookie-parser** for reading refresh-token cookies.