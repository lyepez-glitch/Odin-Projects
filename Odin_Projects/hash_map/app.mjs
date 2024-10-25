import { HashMap } from './HashMap.mjs';
const key = 'Dog';
const val = 'Bruno';
const map = new HashMap();
console.log('hash code ', map.hash(key));
map.set(key, val);
console.log('value', map.get(key)); //'Bruno'
console.log('map has key', map.has(key)); //true
console.log('map key removed', map.remove(key)); //true
map.clear();
console.log('keys', map.keys()); // []
console.log('vals', map.values()); // []
map.set('dog', 'herman');
map.set('wolf', 'wolfy');
map.set('wolf', 'updated');
console.log('entries', map.entries());
////////////////////////////

map.set('bat', 'batty')
map.set('tab', 'tabby')
map.set('tab', 'froggy')
console.log('updated bta =>', map.get('tab'));
map.get('tab')
console.log('remove bta', map.remove('tab'));
console.log(' bta should be removed =>', map.get('tab'));