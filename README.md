
npm install --global gulp-cli

node ./node_modules/nightwatch/bin/runner.js --test artifacts\\build\\tests\\Authentication\\LogInLogOut.js --env ofunk-chrome-selenium-grid

## How to debug?

```
{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node",
            "request": "launch",
            "name": "Launch",
            "program": "${workspaceRoot}/node_modules/nightwatch/bin/runner.js",
            "cwd": "${workspaceRoot}",
            "stopOnEntry": false,
            "args": [
                "--test", "artifacts\\build\\tests\\Authentication\\LogInLogOut.js",
                "--env", "ofunk-chrome-selenium-grid"
            ]
        }
    ]
}
```