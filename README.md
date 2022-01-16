## k2j: A global npm module for converting key-value property to JSON

Install global module
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

Sample input data

*key=valuea   
key1=value1*

More examples
```
k2j -i .\test\data.properties -s "{'k':'a','v':'b','c':'c'}"
```
Output
```
[
   {
      "a": "key",
      "b": "valuea",
      "c": "c"
   },
   {
      "a": "key1",
      "b": "value1",
      "c": "c"
   }
]
```
```
k2j -i .\test\data.properties -s "{'k':'a','v':'b'}"
```
Output
```
[
   {
      "a": "key",
      "b": "valuea"
   },
   {
      "a": "key1",
      "b": "value1"
   }
]
```
```
k2j -i .\test\data.properties
```
Output
```
[
   {
      "key": "valuea"
   },
   {
      "key1": "value1"
   }
]
```
```
k2j -i .\test\data.properties -o prop.json -s "{'k':'a','v':'b'}"
```
Output written in json file
```
prop.json
```