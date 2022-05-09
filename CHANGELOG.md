# Changelog

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
