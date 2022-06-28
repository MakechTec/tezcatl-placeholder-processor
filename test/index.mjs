import {Reader} from "@makechtec/tezcatl-cli";
import {PlaceholderProcessor} from "../index.js";

const processor = new PlaceholderProcessor;
let content = Reader.read("./test/test1.tzl");
let newContent = processor.parse(content);

console.log(newContent);