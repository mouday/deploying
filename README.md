# Deploying

deploy code by ssh command

install
```
npm i deploying -g
```

using 
```
$ deploying init
$ cat deploying.json

{
    "test": {
        "host": "localhost",
        "port": 22,
        "username": "root",
        "password": "",
        "privateKey": "",
        "commands": [
            "pwd"
        ],
        "stdout": true,
        "stderr": true
    }
}

$ deploying run test

```