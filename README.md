# mmdzov-cli
A powerful cli for comfortable development. It is constantly being updated!

FIRST STEP 
```npm
npm i mmdzov-cli
```

## [TEN-Stack-Starter](https://github.com/mytls/ten-stack-starter)

| description         	| command                      	|
|---------------------	|------------------------------	|
| install ten         	| mmdzov i ten                 	|
| update ten          	| mmdzov u ten                 	|
| initial ten project 	| mmdzov use ten project-name  	|
| resource ten        	| mmdzov ten res resource-name 	|


### Description of the above commands


### 1. Install TEN-Stack-Starter

You can install the latest version of ten-stack-starter globally on your system

```npm 
mmdzov i ten
```

### 2. Global Update

You can update your ten-stack-starter version that you installed globally

```npm 
mmdzov u ten
```

### 3. Initialize New Project

Starts a new project under TEN-Stack Starter automatically.

```npm 
mmdzov use ten <project-name>
```
> Like : mmdzov use ten shop

### 4. Resource Generation

Like nest.js generates a new resource that contains a series of files.
Files are stored in the folder in **src/components**, such as
**src/components/home**

 __Note : when using this command, make sure you are in the main project path, ie project-name/__

```npm 
mmdzov ten res <resource-name>
```

> Like : mmdzov use ten transaction
