## k2j: A global npm module for converting key=value property to JSON

Install module
```
npm install -g k2j
```

Run
```
k2j -i .\test\data.properties
```

Options
```
-V, --version            output the version number
-i, --input <location>   key-value property file  
-o, --output <location>  Output file
-s, --schema <input>  JSON schema to tranform  
-h, --help               display help for command
```
More examples
```
k2j -i .\test\data.properties -s "{'k':'a','v':'b','c':'c'"

k2j -i .\test\data.properties -s "{'k':'a','v':'b'}"

k2j -i .\test\data.properties

k2j -i .\test\data.properties -o prop.json -s "{'k':'a','v':'b'}"
```