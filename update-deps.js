const fs = require('fs');
const path = require('path');

// Read the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the required dev dependencies if they don't exist
if (!packageJson.devDependencies) {
  packageJson.devDependencies = {};
}

// Add @types/howler if it doesn't exist
if (!packageJson.devDependencies['@types/howler']) {
  packageJson.devDependencies['@types/howler'] = '^2.2.7';
}

// Add @types/node if it doesn't exist
if (!packageJson.devDependencies['@types/node']) {
  packageJson.devDependencies['@types/node'] = '^18.15.0';
}

// Write the updated package.json file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Updated package.json with @types/howler and @types/node');
console.log('Run npm install to install the new dependencies');
