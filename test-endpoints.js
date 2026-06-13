#!/usr/bin/env node

const http = require('http');
const BASE_URL = 'http://localhost:3000/api/v1';

// All endpoints organized by category
const endpoints = [
  // System (10)
  {m:'GET',p:'/system/health'},{m:'GET',p:'/system/ready'},{m:'GET',p:'/system/version'},
  {m:'GET',p:'/system/config'},{m:'GET',p:'/system/metrics'},{m:'POST',p:'/system/metrics/increment'},
  {m:'GET',p:'/system/status'},{m:'GET',p:'/system/env'},{m:'GET',p:'/system/routes'},{m:'DELETE',p:'/system/cache'},

  // Users (15)  
  {m:'GET',p:'/users'},{m:'GET',p:'/users/1'},{m:'GET',p:'/users/search/username/alice'},
  {m:'GET',p:'/users/search/email/example.com'},{m:'GET',p:'/users/count'},{m:'GET',p:'/users/count/by-role'},
  {m:'GET',p:'/users/exists/email/test@test.com'},{m:'GET',p:'/users/roles'},{m:'POST',p:'/users/1/assign-role'},
  {m:'GET',p:'/users/roles/user'},{m:'GET',p:'/users/roles/admin'},{m:'POST',p:'/users/export'},{m:'POST',p:'/users/batch/create'},
  {m:'POST',p:'/users/search/advanced'},{m:'DELETE',p:'/users/batch/delete'},

  // Auth (18)  
  {m:'POST',p:'/auth/login'},{m:'POST',p:'/auth/register'},{m:'POST',p:'/auth/logout'},
  {m:'POST',p:'/auth/refresh'},{m:'POST',p:'/auth/forgot-password'},{m:'POST',p:'/auth/reset-password'},
  {m:'POST',p:'/auth/change-password'},{m:'POST',p:'/auth/verify-email'},{m:'POST',p:'/auth/resend-verification'},
  {m:'GET',p:'/auth/me'},{m:'POST',p:'/auth/sessions'},{m:'DELETE',p:'/auth/sessions/current'},
  {m:'DELETE',p:'/auth/sessions/1'},{m:'GET',p:'/auth/sessions'},{m:'POST',p:'/auth/2fa/enable'},
  {m:'POST',p:'/auth/2fa/disable'},{m:'POST',p:'/auth/2fa/verify'},{m:'POST',p:'/auth/oauth/google'},

  // Profiles (15)  
  {m:'GET',p:'/profiles/1'},{m:'GET',p:'/profiles/1/avatar'},{m:'GET',p:'/profiles/1/bio'},
  {m:'GET',p:'/profiles/1/preferences'},{m:'GET',p:'/profiles/1/notifications'},{m:'GET',p:'/profiles/1/notifications/channels'},
  {m:'GET',p:'/profiles/public/search?query=developer'},{m:'POST',p:'/profiles/1/avatar/generate'},
  {m:'PUT',p:'/profiles/1'},{m:'PATCH',p:'/profiles/1'},{m:'DELETE',p:'/profiles/999'},
  {m:'POST',p:'/profiles/bulk-update'},{m:'POST',p:'/profiles/1/avatar'},{m:'DELETE',p:'/profiles/1/avatar'},
  {m:'PUT',p:'/profiles/1/preferences'},

  // Products (20)  
  {m:'GET',p:'/products'},{m:'GET',p:'/products/1'},{m:'GET',p:'/products/search/suggestions/lapt'},
  {m:'GET',p:'/products/categories'},{m:'GET',p:'/products/categories/electronics'},{m:'GET',p:'/products/search/advanced?minPrice=10&maxPrice=200'},
  {m:'GET',p:'/products/search/bulk?ids=1,2,3'},{m:'GET',p:'/products/1/stock'},{m:'GET',p:'/products/low-stock/10'},
  {m:'GET',p:'/products/out-of-stock'},{m:'GET',p:'/products/1/reviews'},{m:'GET',p:'/products/1/reviews/average'},
  {m:'GET',p:'/products/1/reviews/rating/5'},{m:'GET',p:'/products/1/related'},{m:'GET',p:'/products/export/csv'},
  {m:'POST',p:'/products/batch-price-adjustment'},{m:'PUT',p:'/products/categories/create-cat'},
  
];

let results=[],completed=0;

function test(ep) {
  return new Promise(r=>{
    http.request({hostname:'localhost',port:3000,path:`${BASE_URL}${ep.p}`,method:ep.m},res=>{
      let d='';res.on('data',c=>d+=c);res.on('end',()=>{
        results.push({m:ep.m,p:ep.p.split('?')[0],st:res.statusCode,ok:res.statusCode>=200&&res.statusCode<400});
        completed++;r();
      });
    }).on('error',e=>{
      results.push({m:ep.m,p:ep.p.split('?')[0],st:'ERR',ok:false});
      completed++;r();
    }).end(ep.m==='POST'||ep.m==='PUT'?'{}':'');
  });
}

async function run() {
  console.log('Testing '+endpoints.length+' endpoints...\n'); 
  
  for(let ep of endpoints) await test(ep);
  
  const ok=results.filter(r=>r.ok).length, fail=results.length-ok;
  
  console.log('\n========================================');
  console.log('TOTAL TESTED: '+results.length+' ENDPOINTS');
  console.log('SUCCESSFUL (2xx/3xx): '+ok);
  console.log('FAILED/ERROR: '+fail);
  console.log('========================================\n');
  
  // Group by prefix
  const groups={};
  results.forEach(r=>{
    const parts=r.p.split('/');
    const group=parts[2]||'root';
    if(!groups[group]) groups[group]={ok:0,fail:0,tot:0,res:[]};
    groups[group].tot++;
    groups[group].res.push(r);
    if(r.ok) groups[group].ok++; else groups[group].fail++;
  });
  
  Object.keys(groups).sort().forEach(g=>{
    console.log(g.toUpperCase()+' ('+groups[g].tot+' tested: '+groups[g].ok+'✅'+groups[g].fail+'❌):');
    groups[g].res.forEach(r=>console.log('  '+(r.ok?'✅':'❌')+' '+r.m.padEnd(7)+' '+r.p));
    console.log();
  });
  
  process.exit(fail>0?1:0);
}

run();
