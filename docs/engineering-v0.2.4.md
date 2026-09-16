# Engineering verification · Showcase v0.2.4

The v0.2.3 contract is the frozen semantic baseline. This release adds repeatable engineering checks without changing files under `protocol/`, `demo/`, `conformance/` or `tests/`.

## Commands

```sh
npm ci
npm test
npm run validate:examples
npm run verify:manifest
```

`npm run verify` runs the last three commands in order. The demo and contract tests still use only Node built-ins. Ajv 8.20.0 is a development dependency, pinned with a committed lockfile, for strict JSON Schema 2020-12 validation.

- `npm test`: the existing six contract cases run against the reference and frozen-output positive control, for 12 executions.
- `validate:examples`: checks the three standalone messages against their schema definitions, checks all ten payloads in the existing exchange trace, rejects the wrapper as a single message, and replays its six steps against the unchanged reference.
- `verify:manifest`: checks the package version, complete distribution file list, byte counts and SHA256 values. It excludes Git metadata and the paths already excluded by `.gitignore`, plus the manifest itself. It also works in a source archive without `.git`.

The manifest checker is read-only. Intentional source changes require a deliberate manifest refresh; validation never updates expected hashes automatically.

Checks were also exercised in a temporary source-archive copy without `.git`. An invalid schema message, a schema-valid but inconsistent trace, a same-length file edit and an unlisted file were each rejected by the corresponding checker; the restored copy passed.

The first Windows CI run exposed checkout line-ending conversion: a 952-byte workflow became 988 bytes through LF-to-CRLF conversion. This was reproduced with `core.autocrlf=true`. The repository's `.gitattributes` now requests LF for text checkouts on every platform, while the manifest checker continues to compare exact file bytes.

## Environments and release gate

Local validation uses official **Node v24.21.0** on macOS arm64. The downloaded archive was checked against the [official SHA256 list](https://nodejs.org/dist/v24.21.0/SHASUMS256.txt). The minimum declared Node major remains 24.

[CI](https://github.com/zhaoxiuyue/pf3-showcase/actions/workflows/ci.yml) runs on main-branch pushes, pull requests and manual dispatches:

| Node major | Linux | macOS | Windows |
|---|---|---|---|
| 24 | ubuntu-latest | macos-latest | windows-latest |
| 26 | ubuntu-latest | macos-latest | windows-latest |

Each of the six jobs installs the lockfile with `npm ci`, records its actual Node/npm versions, and runs contract tests, schema/examples validation and manifest verification as separate steps. The v0.2.4 release is cut only after all six jobs pass for the release commit. The release notes link the successful run.

## Freeze

Protocol behavior, schema shape and identity, reference semantics, the existing tests and product scope remain unchanged. Showcase development pauses after v0.2.4. A future 0.3.x waits for publicly verifiable MountainRS evidence; this release adds no synthetic product claims.

中文摘要：本轮仅补工程卫生。使用 Node 24 实测，并建立 Node 24/26 × Linux/macOS/Windows 的六组 CI；自动执行原有测试、Schema/示例校验与清单哈希核验。六组全部通过后发布 v0.2.4，然后冻结 Showcase，等待 MountainRS 的真实成果证据。
