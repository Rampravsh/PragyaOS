# ADR-002: Identity & Credential Architecture

## Status
Proposed (Approved)

## Context
PragyaOS requires a secure, extensible, and tamper-proof architecture for issuing and verifying academic credentials (certificates, badges, achievements). The system must scale, remain storage-agnostic, and facilitate easy integration with future W3C Verifiable Credentials and Open Badge standards without ongoing schema updates.

## Decision Drivers
* Extensibility to support verification pages, PDF prints, and third-party credential integrations.
* Historical consistency: Student name or course title changes must not alter previously issued credentials (historic snapshots).
* Tamper-proof design: The record must be cryptographically verifiable.
* Security: Prevent brute-force verification token scanning by storing cryptographic hashes.

## Decisions

### 1. Immutable Credential Records
Credentials are treated as immutable business facts. Once issued, a `Credential` record cannot be updated except for revoking its validity (which updates `status` to `REVOKED` and creates an audit trail in `CredentialRevocation`). 

### 2. Historic Snapshotting
To prevent profile changes (e.g. user changing display name) or course updates (e.g. course title renaming) from corrupting the historic truth of a certificate, every `Credential` holds a snapshot of critical data inside its JSON `metadata`:
```json
{
  "recipientName": "Jane Doe",
  "courseTitle": "Advanced Node.js Architecture",
  "instructorName": "Staff Instructor",
  "issuedAt": "2026-07-04T12:00:00Z"
}
```

### 3. Template Versioning
`CredentialTemplate` versions are immutable once active templates have issued credentials. If changes are requested to an active layout, the system creates a new template version record rather than editing the existing record in-place.

### 4. Hash-Based Verification & Secure Tokens
* Verification relies on a random, cryptographically secure `verificationToken` (generated with `crypto.randomUUID()`).
* To prevent token enumeration attacks, only the SHA-256 hash of this token is stored in the database (`verificationHash`).
* The raw token is shared with the client via a verification URL and verified by hashing the incoming URL parameter and matching it against `verificationHash`.

### 5. Verification Logging & Auditing
Every verification query (successful or failed) is stored in the `CredentialVerification` log table with the timestamp, client IP, source (public page, API, admin), and client user-agent. This serves as an abuse detection audit trail.

### 6. W3C & Open Badges Future Compatibility
The `metadata` JSONB schema is structured following the draft properties of Open Badges 3.0 and W3C Verifiable Credentials. Properties like `issuer`, `credentialSubject`, and `proof` can easily map inside the JSON record without requiring DDL schema updates.

## Consequences
* **Positive**: 100% historic consistency, resilient to brute-force verification scanning, future-proof structures.
* **Negative**: Slightly larger storage requirements due to metadata snapshotting, but this is negligible relative to the integrity benefits.
