# Changelog

## \[0.1.2-beta.11]

- Update to latest Tauri version
  - [9f533f3](https://github.com/JonasKruckenberg/tauri-build/commit/9f533f359c472a37212a33431f0c1c9905e2d58c) Create chore-update-tauri2.md on 2022-06-15

## \[0.1.2-beta.10]

- Update dependencies.
  - [0ab72e4](https://github.com/JonasKruckenberg/tauri-build/commit/0ab72e4401f708b71b4556fa678ae644bfd164cb) Create chore-update-deps.md on 2022-05-18

## \[0.1.2-beta.9]

- Correctly compress .app files or omit them.
  - [c9676c7](https://github.com/JonasKruckenberg/tauri-build/commit/c9676c7bb66d2fb0da128dc28a86bdca541e3cc5) fix: correctly handle .app files on 2022-05-10
- Remove default `configPath`
  - [3708b7d](https://github.com/JonasKruckenberg/tauri-build/commit/3708b7de55753331b93547c98ab47f70a1d2be2b) fix: remove default configPath on 2022-05-10

## \[0.1.2-beta.8]

- Ignore the linuxdelpoy.AppImage artifact
  - [af44d01](https://github.com/JonasKruckenberg/tauri-build/commit/af44d01e2641bd82acc2c45f9b9ac8cb887a6577) fix: ignore linuxdeploy on 2022-05-09

## \[0.1.2-beta.7]

- Fix globbing for artifacts on windows.
  - [4728478](https://github.com/JonasKruckenberg/tauri-build/commit/4728478711cb3d8373d20dd2246f44bacbd51f3b) fix: globbing for artifacts on windows on 2022-05-09

## \[0.1.2-beta.6]

- Correctly encode the output as JSON
  - [86b50e9](https://github.com/JonasKruckenberg/tauri-build/commit/86b50e91f77b9e0b951b4d7a02bf8c969caa9c15) fix: correctly encode output as json on 2022-05-09

## \[0.1.2-beta.5]

- Use proper cargo command to detect the artifact directory.
  - [e21d218](https://github.com/JonasKruckenberg/tauri-build/commit/e21d218be11a5009285f6bb6b1cee5a214cec470) fix: proper target dir detection using cargo on 2022-05-09

## \[0.1.2-beta.4]

- Replace execa with standard NodeJS exec.
  - [9c72264](https://github.com/JonasKruckenberg/tauri-build/commit/9c722640b5343e17d4e870945a5ab8bab093a782) add changefile on 2022-05-09

## \[0.1.2-beta.3]

- Only change working directory when projectPath is given.
  - [5fa2b7e](https://github.com/JonasKruckenberg/tauri-build/commit/5fa2b7e361e1a40748f9373544d42ae2d287e260) only change dir optionally on 2022-05-08

## \[0.1.2-beta.2]

- Call the correct tauri subcommand
  - [f593898](https://github.com/JonasKruckenberg/tauri-build/commit/f593898d4994e9ab7130631432cffbbde4ec74ba) fix: call the correct tauri subcommand on 2022-05-08

## \[0.1.2-beta.1]

- Update Tauri CLI to version `1.0.0-rc.10`
  - [f83afa4](https://github.com/JonasKruckenberg/tauri-build/commit/f83afa4608fbec046f5b1015d2129e36c6de7c2f) Create chore-update-tauri.md on 2022-05-08
- Correctly change working dir to projectPath when configured.
  - [8864b18](https://github.com/JonasKruckenberg/tauri-build/commit/8864b1892897635a72de9bfce95f395c39c35eb1) fix: correctly change working dir to projectPath on 2022-05-08

## \[0.1.2-beta.0]

- Include Tauri CLI binaries for all supported platforms.
  - [59ffbba](https://github.com/JonasKruckenberg/tauri-build/commit/59ffbba21ce2ad94621365ddf2f848c908e4e2ec) fix. use only deps supported on gh actions on 2022-05-08
