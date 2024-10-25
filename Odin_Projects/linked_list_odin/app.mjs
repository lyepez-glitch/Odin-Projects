import { Node } from './Node.mjs';
import { LinkedList } from './LinkedList.mjs';

const list = new LinkedList();
list.append(5);
list.prepend(3);
console.log('test', list.test())
console.log('list size', list.size())
console.log('head', list.getHead()); //3
console.log('tail', list.getTail()); //5

console.log('at', list.at(0)) //3
console.log('pop', list.pop()) //5

console.log('contains', list.contains(3)) //true

console.log('find', list.find(3)) //0
list.append(4);
list.append(7);
console.log('toString', list.toString()); //3,7s