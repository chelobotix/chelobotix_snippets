# Debug GO

```json
// launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch API",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "program": "${workspaceFolder}/cmd/api/main.go",
            "env": {
                "GO_ENV": "development"
            },
            "args": [],
            "showLog": true,
            "buildFlags": "-tags=debug",
            "cwd": "${workspaceFolder}",
            "output": "${workspaceFolder}/debug"
        },
        {
            "name": "Debug Test",
            "type": "go",
            "request": "launch",
            "mode": "test",
            "program": "${workspaceFolder}",
            "args": ["-v"],
            "showLog": true,
            "buildFlags": "-tags=debug"
        },
        {
            "name": "Debug Current Test File",
            "type": "go",
            "request": "launch",
            "mode": "test",
            "program": "${fileDirname}",
            "args": ["-v", "-count=1"],
            "showLog": true,
            "buildFlags": "-tags=debug"
        },
        {
            "name": "Debug Current File",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "program": "${file}",
            "showLog": true
        }
    ]
} 
```
