(this["webpackJsonpmy-usa-gymnast"]=this["webpackJsonpmy-usa-gymnast"]||[]).push([[0],{20:function(e){e.exports=JSON.parse('[{"name":"Lexi Brix","id":1979112},{"name":"Charlotte Ward","id":1985072},{"name":"Cortney Frank","id":1979753},{"name":"Elliana Crowder","id":2002165},{"name":"Logan Brix","id":1913246},{"name":"Gordy Jacques","id":1271797},{"name":"Caleb Skramsted","id":1400313},{"name":"Chase Penny","id":1200719},{"name":"Adrian Ramos","id":1403712},{"name":"Elijah Ramos","id":1405166},{"name":"Cole Quinlan","id":1571232},{"name":"Romello Bell","id":1913253},{"name":"Corbin Meunier","id":1913332},{"name":"Michael Boehmer","id":1918513}]')},31:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(1),r=n.n(s),a=n(18),i=n.n(a),o=n(4),l=n(5),d={Women:{aa:{shortName:"AA",name:"AA",longName:"All Around"},1:{shortName:"VT",name:"Vault",longName:"Vault"},2:{shortName:"UB",name:"Bars",longName:"Bars"},3:{shortName:"BB",name:"Beam",longName:"Beam"},4:{shortName:"FX",name:"Floor",longName:"Floor"}},Men:{aa:{shortName:"AA",name:"AA",longName:"All Around"},1:{shortName:"FX",name:"Floor",longName:"Floor"},2:{shortName:"PH",name:"Pommel",longName:"Pommel"},3:{shortName:"SR",name:"Rings",longName:"Rings"},4:{shortName:"VT",name:"Vault",longName:"Vault"},5:{shortName:"PB",name:"P Bars",longName:"P Bars"},6:{shortName:"HB",name:"H Bar",longName:"H Bar"}}},u=null!==new URLSearchParams(window.location.search).get("detail");function m(e){var t=e.match(/(\d\d):(\d\d)(?::\d\d)?/);return t?"".concat(t[1].replace(/^0/,""),":").concat(t[2]):e}function j(e){return e.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)?h(e).toLocaleDateString():e}function h(e){var t=new Date(e);return t.setHours(t.getUTCHours()),t.setDate(t.getDate()+1),t}function b(e){var t=e.person,n=e.id,r=Object(s.useState)(!1),a=Object(o.a)(r,2),i=a[0],b=a[1],f=Object(l.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/".concat(n),{headers:{accept:"application/json"}},{defer:!0}),O=f.data,x=f.error,p=f.isPending,v=f.run,N=t.sanctions[n];if(Object(s.useEffect)((function(){(function(e,t){var n=h(e);if(n.setDate(n.getDate()-2),n.getTime()<Date.now()){var c=new Date(t);return c.setDate(c.getDate()+2),c.getTime()>Date.now()}return!1})(N.startDate,N.endDate)&&(b(!0),v())}),[b,v,N]),!i)return Object(c.jsx)("li",{className:"sanction sanction-button",children:Object(c.jsxs)("button",{onClick:function(){b(!0),v()},children:["Load ",N.name,Object(c.jsx)("br",{}),j(N.startDate),"-",j(N.endDate)]})});if(p&&!O)return Object(c.jsx)("li",{className:"sanction",children:Object(c.jsxs)("h3",{children:["Loading ",N.name,"..."]})});if(x)return Object(c.jsxs)("li",{className:"sanction error",children:[Object(c.jsx)("h3",{children:x.message}),Object(c.jsx)("button",{onClick:v,children:"Refresh"})]});if(!O)return Object(c.jsxs)("li",{className:"sanction error",children:[Object(c.jsxs)("h3",{children:["No data for ",N.name]}),Object(c.jsx)("button",{onClick:v,children:"Refresh"})]});var g=t.sanctionPeople.find((function(e){return e.sanctionId===n}));if(!g)return Object(c.jsx)("li",{className:"sanction error",children:"Cannot find sanctionPeople"});var y=Object.values(O.sanctionPeople).filter((function(e){return e.sessionId===g.sessionId&&e.level===g.level&&e.division===g.division})).length,I=O.sessions.find((function(e){return e.sessionId===g.sessionId}));if(!I)return Object(c.jsxs)("li",{className:"sanction error",children:["Cannot find session",Object(c.jsx)("br",{}),Object(c.jsx)("button",{onClick:v,children:"Refresh"})]});for(var w=O.sessionResultSets.find((function(e){return e.sessionId===g.sessionId&&e.level===g.level&&e.division===g.division})),S="squad".concat(g.squad),C=I[S]||"",L=Array.from(C).reduce((function(e,t,n){return e[t]=n+1,e}),{}),k=t.scores.filter((function(e){return e.sanctionId===n&&e.resultSetId===(null===w||void 0===w?void 0:w.resultSetId)})),D=function(){var e=B[A];k.some((function(t){return t.eventId===e}))||k.push({eventId:e,program:I.program})},A=0,B=Array.from(C);A<B.length;A++)D();k.sort((function(e,t){return e.resultSetId&&t.resultSetId?e.resultSetId-t.resultSetId:e.eventId in L&&t.eventId in L?L[e.eventId]-L[t.eventId]:e.eventId in L?-1:t.eventId in L?1:0}));var P,R=u&&k.some((function(e){return e.difficulty})),W=u&&k.some((function(e){return e.execution})),E=u&&k.some((function(e){return e.deductions})),F=k.some((function(e){return e.finalScore})),T=k.some((function(e){return e.place}));return Object(c.jsxs)("li",{className:"sanction",children:[Object(c.jsx)("h3",{className:"sanctionName",children:Object(c.jsx)("a",{href:"https://myusagym.com/meets/live/".concat(n,"/"),children:N.name})}),Object(c.jsxs)("h5",{className:"site",children:[Object(c.jsx)("a",{className:"siteName",href:N.siteLink,children:N.siteName}),Object(c.jsx)("br",{}),Object(c.jsxs)("a",{className:"siteAddress",href:"https://maps.google.com?q=".concat(encodeURIComponent("".concat(N.address1,", ").concat(N.city,", ").concat(N.state," ").concat(N.zip))),children:[N.address1,", ",N.city,", ",N.state," ",N.zip]})]}),Object(c.jsxs)("h3",{className:"level",children:["Level ",g.level,Object(c.jsx)("br",{}),g.division]}),Object(c.jsxs)("div",{className:"date",children:[(P=I.date,P.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)?h(P).toDateString():P),Object(c.jsx)("br",{}),m(I.time1)," ",N.time1,Object(c.jsx)("br",{}),m(I.time2)," ",N.time2,Object(c.jsx)("br",{}),m(I.time3)," ",N.time3,Object(c.jsx)("br",{}),m(I.time4)," ",N.time4]}),Object(c.jsx)("br",{}),w?Object(c.jsx)("a",{className:"startList",href:"https://myusagym.com/meets/live/".concat(n,"/results/").concat(w.resultSetId,"/"),children:"All Scores"}):null,Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{className:"scores",children:Object(c.jsxs)("table",{children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:Object(c.jsx)("button",{onClick:v,className:"refresh",disabled:p,children:p?"...":"Refresh"})}),R?Object(c.jsx)("th",{children:"Difficulty"}):null,W?Object(c.jsx)("th",{children:"Execution"}):null,E?Object(c.jsx)("th",{children:"Deduction"}):null,F?Object(c.jsx)("th",{children:u?"Final":"Score"}):null,T?Object(c.jsx)("th",{children:"Place"}):null]})}),Object(c.jsx)("tbody",{children:k.map((function(e){var t,n,s=null===(t=d[e.program])||void 0===t||null===(n=t[e.eventId])||void 0===n?void 0:n.longName;return Object(c.jsxs)("tr",{children:[Object(c.jsxs)("th",{className:"event",children:[e.eventId in L?"".concat(L[e.eventId],". "):"",s||"Unknown Event ".concat(e.eventId)]}),R?Object(c.jsx)("td",{className:"difficulty",children:e.difficulty||""}):null,W?Object(c.jsx)("td",{className:"execution",children:e.execution||""}):null,E?Object(c.jsx)("td",{className:"deductions",children:e.deductions||""}):null,F?Object(c.jsx)("td",{className:"finalScore",children:e.finalScore||""}):null,T?Object(c.jsx)("td",{className:"place",children:e.place?"".concat(e.place," of ").concat(y):""}):null]},"".concat(e.eventId," ").concat(e.resultSetId))}))})]})})]})}function f(e){var t=e.id,n=Object(l.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/people/".concat(t),{headers:{accept:"application/json"}}),s=n.data,r=n.error;return n.isPending?Object(c.jsx)("div",{className:"person",children:"Loading..."}):r?Object(c.jsx)("div",{className:"person error",children:r.message}):s?Object(c.jsxs)("div",{className:"person",children:[Object(c.jsxs)("h1",{className:"name",children:[s.person.firstName," ",s.person.lastName]}),Object(c.jsx)("ul",{className:"sanctions",children:Object.keys(s.sanctions).sort((function(e,t){var n=s.sanctions[e].startDate;return s.sanctions[t].startDate.localeCompare(n)})).map((function(e){return Object(c.jsx)(b,{person:s,id:+e},e)}))})]}):Object(c.jsx)("div",{className:"person error",children:"No data for this person."})}var O=n(7),x=n(20);function p(e){var t,n=e.search,r=e.name,a=Object(s.useState)(),i=Object(o.a)(a,2),d=i[0],u=i[1],m=Object(s.useState)([]),j=Object(o.a)(m,2),h=j[0],b=j[1],f=Object(l.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/".concat(n),{headers:{accept:"application/json"}},{defer:!0}),p=f.data,v=f.error,N=f.isPending,g=f.run;if(Object(s.useEffect)((function(){n?g():u(x)}),[g,u,n]),N)return Object(c.jsx)("div",{children:"Loading..."});if(v)return Object(c.jsx)("div",{className:"error",children:v.message});if(!d&&!p)return Object(c.jsx)("div",{className:"error",children:"No data"});if(!d&&p){var y=(r||"").toLowerCase().split(" ");u(Object.values(p.people).filter((function(e){return y.length>1?e.firstName.toLowerCase().startsWith(y[0])&&e.lastName.toLowerCase().startsWith(y[1]):e.firstName.toLowerCase().startsWith(y[0])||e.lastName.toLowerCase().startsWith(y[0])})).map((function(e){return{id:e.personId,name:"".concat(e.firstName," ").concat(e.lastName)}})))}return Object(c.jsxs)("div",{className:"names",children:[Object(c.jsx)("h2",{children:"Pick your Athletes:"}),Object(c.jsx)("ul",{children:d?d.map((function(e){return Object(c.jsx)("li",{className:"names-checkbox",children:Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"checkbox",checked:h.includes(e.id),onChange:(t=e.id,function(e){e.target.checked?b(Object(O.a)(new Set([].concat(Object(O.a)(h),[t])))):b(h.filter((function(e){return e!==t})))})}),e.name]})},e.name);var t})):null}),Object(c.jsx)("button",{onClick:(t=h,function(){window.location.href="?id=".concat(t.join(","))}),children:"Go"})]})}function v(){var e=Object(s.useState)(!1),t=Object(o.a)(e,2),n=t[0],r=t[1],a=Object(s.useState)(!1),i=Object(o.a)(a,2),l=i[0],d=i[1],u=Object(s.useRef)(null),m=Object(s.useRef)(null),j=Object(s.useRef)(null);function h(){if(u.current){var e=u.current.clientWidth/2;d(u.current.scrollWidth-u.current.scrollLeft-e>=u.current.clientWidth),r(u.current.scrollLeft-e>0)}}function b(){u.current&&m.current&&j.current&&(m.current.style.top="".concat(10-u.current.scrollTop,"px"),j.current.style.top="".concat(10-u.current.scrollTop,"px"))}Object(s.useEffect)((function(){u.current&&(h(),u.current.addEventListener("scroll",function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=!1,c=!1;return function(){for(var s=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];n?c=!0:function r(){n=!0,c=!1,setTimeout((function(){n=!1,c&&r()}),t),e.call.apply(e,[s].concat(a))}()}}(h),{passive:!0}),u.current.addEventListener("scroll",b,{passive:!0}))}),[u]);var O=new URLSearchParams(window.location.search),x=O.get("id");if(x){var v=x.split(",");if(v.length>0)return Object(c.jsxs)("div",{className:"persons",ref:u,children:[Object(c.jsx)("button",{onClick:function(){u.current&&u.current.scroll({left:u.current.scrollLeft-window.innerWidth,behavior:"smooth"})},ref:m,className:"left arrow ".concat(n?"":"hide"),children:"<"}),Object(c.jsx)("button",{onClick:function(){u.current&&u.current.scroll({left:u.current.scrollLeft+window.innerWidth,behavior:"smooth"})},ref:j,className:"right arrow ".concat(l?"":"hide"),children:">"}),v.map((function(e){return Object(c.jsx)(f,{id:e},e)}))]})}var N=O.get("s"),g=null,y=null;if(N){var I=N.split(" ");g=I.shift(),y=I.join(" ")}return Object(c.jsx)(p,{search:g,name:y})}i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(v,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.fe38c255.chunk.js.map