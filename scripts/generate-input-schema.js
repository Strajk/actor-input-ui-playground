const fs = require("fs")
const res = {}

// Helper
let obj
function x(input) {
  return Object.assign({}, obj, input) // Ugly, but allows very short calls
}


// Enum
// ---
obj = {type: "string", editor: "select"}
const _enum = ["one", "two", "three"]; // enum is reserved word
res.enumBasic = x({enum: _enum})
res.enumDefault = x({enum: _enum, default: "three"})
res.enumPrefill = x({enum: _enum, prefill: "three"})
res.enumExample = x({enum: _enum, example: "three"})
res.enumNullable = x({enum: _enum, nullable: true})
res.enumNullableNot = x({enum: _enum, nullable: false})
res.enumTitles = x({enum: _enum, enumTitles: ["One", "Two", "Three"]})
// res.sectionCaption = x({enum: _enum, sectionCaption: "Test sectionCaption"})
// res.sectionDescription = x({enum: _enum, sectionDescription: "Test sectionDescription"})
// res.sectionCaptionAndDescription = x({enum: _enum, sectionCaption: "Test sectionCaption", sectionDescription: "Test sectionCaption sectionDescription"})

// String
// ---
obj = {type: "string", editor: "textfield"}
res.stringBasic = x({})
res.stringDefault = x({default: "default value"})
res.stringPrefill = x({prefill: "prefill value"})
res.stringExample = x({example: "example value"})
res.stringMin = x({minLength: 3})
res.stringMax = x({maxLength: 8})
res.stringMinMax = x({minLength: 3, maxLength: 8})
res.stringEditorJavascript = x({editor: "javascript"})
res.stringEditorPython = x({editor: "python"})
res.stringEditorTextarea = x({editor: "textarea"})

// Array
// ---
obj = {type: "array"}
// Array: stringList
obj.editor = "stringList"
res.arrayStringListBasic = x({})
res.arrayStringListNullable = x({nullable: true})
res.arrayStringListDefault = x({default: ["default"]})
res.arrayStringListPrefill = x({prefill: ["prefill"]})
res.arrayStringListExample = x({example: ["example"]})
res.arrayStringListMinMax = x({minItems: 3, maxItems: 5})
res.arrayStringListUnique = x({uniqueItems: true})
const pattern = "/^a.*z$/";
res.arrayStringListPatternKey = x({patternKey: pattern})
res.arrayStringListPatternValue = x({patternValue: pattern})
res.arrayStringListPatternKeyValue = x({patternKey: pattern, patternValue: pattern})
// Array: json
obj.editor = "json"
res.arrayJsonBasic = x({})
// Array: requestListSources
obj.editor = "requestListSources"
res.arrayRequestListSourcesListBasic = x({})
// Array: pseudoUrls
obj.editor = "pseudoUrls"
res.arrayPseudoUrlsBasic = x({})
// Array: keyValue
obj.editor = "keyValue"
res.arrayKeyValueBasic = x({})
res.arrayKeyValuePlacehoder = x({placeholderKey: "some key",  placeholderValue: "some value"})
res.arrayKeyValuePatternKey = x({patternKey: pattern})
res.arrayKeyValuePatternValue = x({patternValue: pattern})
res.arrayKeyValuePatternKeyValue = x({patternKey: pattern, patternValue: pattern})

// Object
// ---
obj = {type: "object"}
// Object: json
obj.editor = "json"
res.objectJsonBasic = x({})
res.objectJsonPatternKey = x({patternKey: pattern})
res.objectJsonPatternValue = x({patternValue: pattern})
res.objectJsonPatternKeyValue = x({patternKey: pattern, patternValue: pattern})
res.objectJsonMinMax = x({minProperties: 2, maxProperties: 5})
// Object: proxy
obj.editor = "proxy"
res.objectProxyBasic = x({})

// Integer
// ---
obj = {type: "integer"}
res.integerBasic = x({})
res.integerDefault = x({default: 7})
res.integerPrefill = x({prefill: 7})
res.integerExample = x({example: 7})
res.integerMin = x({minimum: 3})
res.integerMax = x({maximum: 10})
res.integerMinMax = x({minimum: 3, maximum: 10})
res.integerUnit = x({unit: "KB"})

// Boolean
// ---
obj = {type: "boolean"}
res.booleanBasic = x({})
res.booleanDefault = x({default: true})
res.booleanExample = x({example: true}) // ?
res.booleanGroup = x({groupCaption: "test group caption"}) // ?

// Any
// ---
// TODO


// ===
// Generate
// ===
for (const [key, value] of Object.entries(res)) {
  res[key] = { // Re-assign for nicer order
    title: key,
    description: key,
    ...value
  }
}

fs.writeFileSync("./INPUT_SCHEMA.json", JSON.stringify({
  "title": "Inspector input",
  "type": "object",
  "schemaVersion": 1,
  "properties": res
}, null, 2))


