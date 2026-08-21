const https=require('https'),fs=require('fs');
function get(url,depth=0){return new Promise((res,rej)=>{if(depth>5)return rej(new Error('too many redirects'));https.get(url,{headers:{'user-agent':'node'}},r=>{if(r.statusCode>=300&&r.statusCode<400&&r.headers.location){r.resume();return get(r.headers.location,depth+1).then(res,rej);}if(r.statusCode!==200){r.resume();return rej(new Error('HTTP '+r.statusCode+' '+url));}const c=[];r.on('data',d=>c.push(d));r.on('end',()=>res(Buffer.concat(c)));}).on('error',rej);});}
(async()=>{
  const targets=[['https://cdn.jsdelivr.net/npm/three@0.148.0/build/three.min.js','three.min.js']];
  for(const [url,name] of targets){
    try{const buf=await get(url);fs.writeFileSync(process.argv[2]+'/'+name,buf);console.log('OK',name,buf.length);}catch(e){console.log('FAIL',name,e.message);}
  }
})();
