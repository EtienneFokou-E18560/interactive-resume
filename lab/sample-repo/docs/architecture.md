# Lab architecture (demo)

Visitor sessions receive an isolated container with a copy of this sample repo.

- `kubectl` and `terraform` are stub CLIs that operate on these files only.
- Outbound network is disabled at the container runtime for the PoC.
- Sessions expire after idle and maximum lifetime limits enforced by the gateway.
