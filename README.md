## ptoj: A global npm module for converting key=value property to JSON

Install module
```
npm install -g ptoj
```

Run
```
ptoj -i .\test\data.properties
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
ptoj -i .\test\data.properties -s "{'k':'a','v':'b','c':'c'"

ptoj -i .\test\data.properties -s "{'k':'a','v':'b'}"

ptoj -i .\test\data.properties

ptoj -i .\test\data.properties -o prop.json -s "{'k':'a','v':'b'}"
```