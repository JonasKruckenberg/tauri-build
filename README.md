<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

## Usage

## Inputs

| Name          | Type    | Description                                                 | Default           |
|---------------|---------|-------------------------------------------------------------|-------------------|
| `runner`      | String  | Binary to use to build the application                      |                   |
| `args`        | String  | Additional arguments for the build command                  |                   |
| `projectPath` | String  | Path to the root of the Tauri project                       | .                 |
| `configPath`  | String  | Path to the tauri.conf.json file, relative to `projectPath` | `tauri.conf.json` |
| `target`      | String  | Rust target triple to build against                         |                   |
| `debug`       | Boolean | Wether to build *debug* or *release* binaries               | false             |

## Outputs

| Name        | Type   | Description                                                |
|-------------|--------|------------------------------------------------------------|
| `artifacts` | String | JSON array of artifact paths produced by the build command |

## Permissions

This Action requires the following permissions on the GitHub integration token:

```yaml
permissions:
  contents: write
```