const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const github = require('@actions/github');

try {
    const version = core.getInput('version');
    let paths = core.getInput('version');
    if (paths && typeof paths === 'string') paths = [paths];

    console.log({
        version,
        paths,
    });

    if (paths && typeof paths === 'object' && Array.isArray(paths)) {
        paths.forEach((packagePath) => {
            const packageFilePath = path.join(github.workspace, packagePath);
            const packageFileData = fs.readFileSync(packageFilePath);
            const package = JSON.parse(packageFileData);
            const newPackage = {
                ...package,
                version,
            }
            fs.writeFileSync(packageFilePath, JSON.stringify(newPackage, null, 2));
            console.log(fs.readFileSync(packageFilePath));
        })
    }

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
