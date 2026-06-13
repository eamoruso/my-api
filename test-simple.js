#!/usr/bin/env node

const http = require('http');
const BASE_URL = 'http://localhost:3000/api/v1';

const endpoints = [
  // System (10)
  {m:'GET',p:'/system/health'},{m:'GET',p:'/system/ready'},{m:'GET',p:'/system/version'},
  {m:'GET',p:'/system/config'},{m:'GET',p:'/system/metrics'},{m:'POST',p:'/system/metrics/increment'},
  {m:'GET',p:'/system/status'},{m:'GET',p:'/system/env'},{m:'GET',p:'/system/routes'},{m:'DELETE',p:'/system/cache'},

  // Users (20)  
  {m:'GET',p:'/users'},{m:'GET',p:'/users/1'},{m:'POST',p:'/users-create'},
  {m:'PUT',p:'/users/1'},{m:'PATCH',p:'/users/1'},{m:'DELETE',p:'/users/999'},
  {m:'GET',p:'/users/search/username/alice'},{m:'GET',p:'/users/search/email/example.com'},
  {m:'POST',p:'/users-search-advanced-body'},{m:'GET',p:'/users/count'},{m:'GET',p:'/users/count/by-role'},
  {m:'GET',p:'/users/exists/email/test@test.com'},{m:'GET',p:'/users/roles'},{m:'POST',p:'/users/1-assignrole'},
  {m:'GET',p:'/users/roles/user'},{m:'GET',p:'/users/roles/admin'},{m:'POST',p:'/users-export'},
  {m:'POST',p:'/users-batchcreate'},{m:'GET',p:'/users-batchupdate'},{m:'DELETE',p:'/users-batchdelete'},

  // Auth (20)  
  {m:'POST',p:'/auth-login-body'},{m:'POST',p:'/auth-register-body'},{m:'POST',p:'/auth/logout'},
  {m:'POST',p:'/auth-refresh-body'}, {m:'POST',p:'/auth-forgotpassword'}, {m:'POST',p:'/auth-resetpass'},
  {m:'POST',p:'/auth-changepass'},{m:'POST',p:'/auth-verifyemail'},{m:'POST',p:'/auth-resendverification'},
  {m:'GET',p:'/auth/me'},{m:'GET',p:'/auth/sessions'},{m:'POST',p:'/auth-sessions-create'},
  {m:'DELETE',p:'/auth-sessions-current'},{m:'DELETE',p:'/auth-sessions/1'},{m:'POST',p:'/auth-2fa-enable'},
  {m:'POST',p:'/auth-2fa-disable'},      {m:'GET',p:'/auth/providers'},{m:'POST',p:'/auth-github'},    // OAuth providers +2
  {m:'GET',p:'/auth-sessions'} ,
];

let results=[],completed=0;

function test(ep){return new Promise(r=>{
  http.request({hostname:'localhost',port:3000,path:`${BASE_URL}${ep.p}`,method:ep.m},res=>{
    let d='';res.on('data',c=>d+=c);res.on('end',()=>{
      results.push({m:ep.m,p:ep.p.split('?')[0],st:res.statusCode,ok:res.statusCode>=200&&res.statusCode<400});completed++;r();
    });
  }).on('error',e=>{results.push({m:ep.m,p:ep.p,st:'ERR',ok:false});completed++;r();}).end(ep.m==='POST'||ep.m==='PUT'?'{}':'');
})};

async function run(){console.log('Testing endpoints...\\n');await Promise.all(endpoints.map(test));const ok=results.filter(r=>r.ok).length;console.log(`Total: ${results.length} | OK: ${ok} (${Math.round(ok/results.length*100)}% success)`);}
run();
