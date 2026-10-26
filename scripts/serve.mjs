import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.avif':'image/avif','.webp':'image/webp'};
const port=Number(process.env.PORT||4173);
http.createServer(async(req,res)=>{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end();}
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const normalized=pathname.replace(/^\/Portfolio(?=\/|$)/,'');
    const target=path.resolve(root,'.'+(normalized==='/'?'/index.html':normalized));
    if(!target.startsWith(root)||target.includes(`${path.sep}.git${path.sep}`)){res.writeHead(403);return res.end();}
    const info=await stat(target);
    if(!info.isFile())throw new Error('not-file');
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:await readFile(target));
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio preview: http://127.0.0.1:${port}/Portfolio/`));
