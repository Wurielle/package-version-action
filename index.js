const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const github = require('@actions/github');

try {
    const version = core.getInput('version');
    let targets = core.getInput('targets');
    if (targets && typeof targets === 'string') targets = [targets];

    console.log({
        version,
        targets,
    });

    if (targets && typeof targets === 'object' && Array.isArray(targets)) {
        targets.forEach((packagePath) => {
            console.log(github.workspace, packagePath);
            const packageFilePath = path.join(github.workspace, packagePath);
            const packageFileData = fs.readFileSync(packageFilePath);
            const currentPackage = JSON.parse(packageFileData);
            const newPackage = {
                ...currentPackage,
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
