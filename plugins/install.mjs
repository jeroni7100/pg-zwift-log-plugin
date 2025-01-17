// Install script for the plugin package

// To run this script, use the following command:
// node install.mjs


// Reads manifest.json in the same folder as this script to get the bundle name.
// Determine user homedir.
// Create <homedir>/pedal-games/plugins/<bundle name> if necessary.
// Copy all .json and .json5 files in the plugin package to the plugin directory recursively.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { copyFile, mkdir, readdir } from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(__dirname, 'manifest.json');

// console.log(manifestPath);

const manifestExists = fs.existsSync(manifestPath);
if (!manifestExists) {
    console.error('manifest.json not found');
    process.exit(1);
}

const manifestContent = fs.readFileSync(manifestPath, 'utf8');
// console.log(manifestContent);
const manifest = JSON.parse(manifestContent);
// console.log(manifest);
if (!manifest.bundle) {
    console.error('bundle not found in manifest.json');
    process.exit(1);
}

const bundleName = manifest.bundle;

console.log(`Installing ${bundleName}...`);

const pluginDir = path.join(homedir(), 'pedal-games', 'plugins', bundleName);

async function copyFiles(srcDir, destDir) {
    const files = await readdir(srcDir);
    for (const file of files) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        const stats = fs.statSync(srcPath);
        if (stats.isDirectory()) {
        await mkdir(destPath, { recursive: true });
        await copyFiles(srcPath, destPath);
        } else if (stats.isFile() && (file.endsWith('.json') || file.endsWith('.json5'))) {
        await copyFile(srcPath, destPath);
        }
    }
}
    
async function install() {
    try {
        await mkdir(pluginDir, { recursive: true });
        await copyFiles(__dirname, pluginDir);
        console.log(`Installed ${bundleName} to ${pluginDir}`);
    } catch (err) {
        console.error(err);
    }
}

install();
