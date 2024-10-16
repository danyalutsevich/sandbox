const { exec } = require('child_process');
const { readdir, lstatSync, existsSync } = require('fs');
const { join } = require('path');

const pluginsDir = join(__dirname, 'plugins/plugins');

readdir(pluginsDir, (err, files) => {
  if (err) {
    console.error('Error reading plugins directory:', err);
    return;
  }

  files.forEach(file => {
    const pluginPath = join(pluginsDir, file);
    if (lstatSync(pluginPath).isDirectory()) {
      const packageJsonPath = join(pluginPath, 'package.json');
      if (existsSync(packageJsonPath)) {
        const packageJson = require(packageJsonPath);
        if (packageJson.scripts && packageJson.scripts.build) {
          exec(`cd ${pluginPath} && npm install && npm run build`, (err, stdout, stderr) => {
            if (err) {
              console.error(`Error building plugin ${file}:`, err);
              return;
            }
            console.log(`Successfully built plugin ${file}`);
            console.log(stdout);
            console.error(stderr);
          });
        } else {
          console.error(`Missing build script in plugin ${file}`);
        }
      } else {
        console.error(`Missing package.json in plugin ${file}`);
      }
    }
  });
});