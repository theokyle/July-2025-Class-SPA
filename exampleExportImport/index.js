import {hello, world} from "./featureOne.js";
import {default as printHelloWorld} from './featureTwo.js';

console.log(hello, world);
printHelloWorld(hello, world);