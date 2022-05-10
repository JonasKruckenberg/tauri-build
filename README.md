# tauri-build

A composable action to build your Tauri project.

## Usage

As opposed to the offical [tauri-action](https://github.com/tauri-apps/tauri-action) this action is as minimal as possible. 
Instead of creating a GitHub release and uploading artifacts all-in-one, it provides outputs to conveniently compose together with other actions such as `actions/upload-artifact`, `actions/download-artifact` or `softprops/action-gh-release`.

### Minimal

The following example workflow builds artifacts on all 3 supported platforms (Window, macOS and Linux).

```yaml
name: 'publish'

on:
  push:
    branches:
      - release

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-binaries:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2

      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 16

      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y libgtk-3-dev webkit2gtk-4.0 libappindicator3-dev librsvg2-dev patchelf

      - uses: JonasKruckenberg/tauri-build@v0.1.2-beta.9
        id: tauri_build

    # You can now use the JSON array of artifacts under `steps.tauri_build.outputs.artifacts` to post-process/upload your bundles
```

### Bundling the app and creating a release

Chances are you want to do *something* with the artifacts that you produced. The following action will produce artifacts for Windows, macOS and Linux upload them as workflow artifacts, so that a final job (called `publish`) can create a GitHub release and attach all prouced artifacts to it. This would also be the place where you could upload artifacts to an AWS Bucket or similar.

```yaml
name: 'publish'

on:
  push:
    branches:
      - release

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-binaries:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2

      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 16

      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y libgtk-3-dev webkit2gtk-4.0 libappindicator3-dev librsvg2-dev patchelf

      - uses: JonasKruckenberg/tauri-build@v0.1.2-beta.9
        id: tauri_build

      # The `artifacts` output can now be used by a different action to upload the artifacts
      - uses: actions/upload-artifact@v3
        with:
          name: artifacts
          path: "${{ join(fromJSON(steps.tauri_build.outputs.artifacts), '\n') }}"

  publish:
    needs: build-binaries
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      # Download the previously uploaded artifacts
      - uses: actions/download-artifact@v3
        id: download
        with:
          name: artifacts
          path: artifacts
      # And create a release with the artifacts attached
      - name: 'create release'
        uses: softprops/action-gh-release@master
        env:
          GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
        with:
          draft: false
          files: ./artifacts/**/*
```

### Building for Apple Silicon

This example workflow will run produce binaries for Apple Silicon (aarch64) as well as the previously shown 3 platforms. This leverages the build matrix. This can be expanded to produce binaries for other target combinations too.

```yaml
name: 'publish'

on:
  push:
    branches:
      - release

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-binaries:
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]
        include:
          - os: ubuntu-latest
            rust_target: x86_64-unknown-linux-gnu
          - os: macos-latest
            rust_target: x86_64-apple-darwin
          - os: macos-latest
            rust_target: aarch64-apple-darwin
          - os: windows-latest
            rust_target: x86_64-pc-windows-msvc

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2

      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 16

      - name: install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y libgtk-3-dev webkit2gtk-4.0 libappindicator3-dev librsvg2-dev patchelf

      - uses: JonasKruckenberg/tauri-build@v0.1.2-beta.9
        id: tauri_build
        with:
          target: ${{ matrix.rust_target }}

      # The `artifacts` output can now be used by a different action to upload the artifacts
      - uses: actions/upload-artifact@v3
        with:
          name: artifacts
          path: "${{ join(fromJSON(steps.tauri_build.outputs.artifacts), '\n') }}"

  publish:
    needs: build-binaries
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      # Download the previously uploaded artifacts
      - uses: actions/download-artifact@v3
        id: download
        with:
          name: artifacts
          path: artifacts
      # And create a release with the artifacts attached
      - name: 'create release'
        uses: softprops/action-gh-release@master
        env:
          GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
        with:
          draft: false
          files: ./artifacts/**/*
```

## Inputs

| Name          | Type    | Description                                                 | Default           |
| ------------- | ------- | ----------------------------------------------------------- | ----------------- |
| `runner`      | String  | Binary to use to build the application                      |                   |
| `args`        | String  | Additional arguments for the build command                  |                   |
| `projectPath` | String  | Path to the root of the Tauri project                       | .                 |
| `configPath`  | String  | Path to the tauri.conf.json file, relative to `projectPath` | `tauri.conf.json` |
| `target`      | String  | Rust target triple to build against                         |                   |
| `debug`       | Boolean | Wether to build _debug_ or _release_ binaries               | false             |

## Outputs

| Name        | Type   | Description                                                |
| ----------- | ------ | ---------------------------------------------------------- |
| `artifacts` | String | JSON array of artifact paths produced by the build command |

## Permissions

This Action requires the following permissions on the GitHub integration token:

```yaml
permissions:
  contents: write
```

## License

[MIT © Jonas Kruckenberg](./LICENSE)