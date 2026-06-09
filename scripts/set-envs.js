const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const environmentPath = path.join(rootDir, 'src', 'environments', 'environment.development.ts');

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .reduce((values, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return values;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        return values;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();
      values[key] = value;

      return values;
    }, {});
}

function buildEnvironmentFile(mapboxKey) {
  return `export const environment = {
	mapboxKey: '${mapboxKey}',
};
`;
}

const env = readEnvFile(envPath);
const mapboxKey = env.MAPBOX_KEY || '';

fs.writeFileSync(environmentPath, buildEnvironmentFile(mapboxKey), 'utf8');

console.log('Updated src/environments/environment.development.ts from .env');
