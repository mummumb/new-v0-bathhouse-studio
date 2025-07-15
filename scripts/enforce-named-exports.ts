// scripts/enforce-named-exports.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COMPONENTS_DIR = path.join(__dirname, '../components');

function convertToNamedExport(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');

  const defaultExportRegex = /export\s+default\s+function\s+(\w+)/;
  const match = content.match(defaultExportRegex);

  if (match) {
    const functionName = match[1];
    const updated = content.replace(
      defaultExportRegex,
      `export function ${functionName}`
    );
    fs.writeFileSync(filePath, updated, 'utf-8');
    console.log(`✅ Converted ${functionName} to named export in ${filePath}`);
  }
}

fs.readdirSync(COMPONENTS_DIR).forEach((file) => {
  const fullPath = path.join(COMPONENTS_DIR, file);
  if (fs.statSync(fullPath).isFile() && file.endsWith('.tsx')) {
    convertToNamedExport(fullPath);
  }
});