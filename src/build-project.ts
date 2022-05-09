import { run } from '@tauri-apps/cli'
import {join, resolve} from 'path'
import glob from 'tiny-glob'
import * as core from '@actions/core'
import { spawn } from 'child_process'

interface BuildOptions {
  runner?: string
  projectPath?: string
  configPath?: string
  debug?: boolean
  args?: string[]
  target?: string
}

export async function buildProject(options: BuildOptions): Promise<string[]> {
  let args: string[] = options.args || []

  if (options.configPath) {
    args.push('--config', options.configPath)
  }

  if (options.target) {
    args.push('--target', options.target)
  }

  if (options.projectPath) {
    const newCwd = resolve(process.cwd(), options.projectPath)
    core.debug(`changing working directory: ${process.cwd()} -> ${newCwd}`)
    process.chdir(newCwd)
  }

  if (options.runner) {
    core.info(`running ${options.runner} with args: build ${args.join(' ')}`)
    await execRunnerCmd(options.runner, ['build', ...args])
  } else {
    core.info(`running builtin runner with args: build ${args.join(' ')}`)
    await run(['build', ...args], '')
  }

  const profile = options.debug ? 'debug' : 'release'
  const outDir = options.target
    ? `./target/${options.target}/${profile}/bundle`
    : `./target/${profile}/bundle`

  const macOSExts = ['app', 'app.tar.gz', 'app.tar.gz.sig', 'dmg']
  const linuxExts = [
    'AppImage',
    'AppImage.tar.gz',
    'AppImage.tar.gz.sig',
    'deb'
  ]
  const windowsExts = ['msi', 'msi.zip', 'msi.zip.sig']

  const artifactsLookupPattern = join(outDir, `*/*.{${[...macOSExts, linuxExts, windowsExts].join(',')}}`)

  core.debug(`Looking for artifacts using this pattern: ${artifactsLookupPattern}`)

  return glob(artifactsLookupPattern)
}

async function execRunnerCmd(runner: string, args: string[]) {
  return new Promise((resolve, reject) => {
    const child = spawn(runner, args, { stdio: 'inherit', shell: true })

    child.on('exit', (exitCode, signal) => {
      resolve({exitCode, signal});
    });
  
    child.on('error', error => {
      reject(error);
    });
  
    if (child.stdin) {
      child.stdin.on('error', error => {
        reject(error);
      });
    }
  })
}