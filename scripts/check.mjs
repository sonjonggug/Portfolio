import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const failures=[];
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)failures.push('Duplicate HTML ids');
if((html.match(/<h1\b/g)||[]).length!==1)failures.push('Expected one h1');
const references=[...html.matchAll(/\b(?:src|href|data-src)="([^"]+)"/g)].map(m=>m[1]);
for(const reference of new Set(references)){
  if(reference.startsWith('#')){if(!ids.includes(reference.slice(1)))failures.push(`Missing anchor: ${reference}`);continue;}
  if(/^(?:https?:|mailto:)/.test(reference))continue;
  try{await access(path.join(root,reference));}catch{failures.push(`Missing file: ${reference}`);}
}
for(const image of html.matchAll(/<img\b[^>]*>/g))if(!/\balt="[^"]*"/.test(image[0]))failures.push('Image without alt');
if((html.match(/data-gallery="book"/g)||[]).length!==7)failures.push('Book gallery must preserve all 7 original images');
if(/injected-|tailwindcss\.com|generativelanguage|IMG_SEARCH_REPLACE_MAP/.test(html))failures.push('Unexpected injected/runtime code');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log(`PASS: ${ids.length} unique IDs, ${new Set(references).size} references, 7 book images, local assets and gallery links.`);
