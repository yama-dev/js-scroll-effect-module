const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const readmePath = path.join(rootDir, 'README.md');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

const readme = fs.readFileSync(readmePath, 'utf8');
const nextReadme = readme.replace(
  /@(\d+\.\d+\.\d+)\//g,
  `@${version}/`
);

if (nextReadme !== readme) {
  fs.writeFileSync(readmePath, nextReadme);
}
