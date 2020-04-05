# Deploying

a simple way to deploy code by ssh command

## using 
### way 1: global env
1、install deploying in global env
```bash
$ npm i deploying -g
```

2、init and modify config deploying.json, using your config
```bash
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
```
commands is a list about shell command

3、run command to deploy your commands
```bash
$ deploying run test

```

### way 2: local env
1、local install
```bash
$ npm i deploying -D
```

2、create config file deploying.json and copy this content:
```json
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
```

3、config your package.json
```js
"scripts": {
    "dep": "deploying run pro"
  }
```

4、run command 
```bash
$ npm run dep
```

join it
