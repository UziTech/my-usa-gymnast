(this["webpackJsonpmy-usa-gymnast"]=this["webpackJsonpmy-usa-gymnast"]||[]).push([[0],{30:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(1),c=n.n(a),r=n(18),i=n.n(r),o=n(4),l=n(8),d={Women:{aa:{shortName:"AA",name:"AA",longName:"All Around"},1:{shortName:"VT",name:"Vault",longName:"Vault"},2:{shortName:"UB",name:"Bars",longName:"Bars"},3:{shortName:"BB",name:"Beam",longName:"Beam"},4:{shortName:"FX",name:"Floor",longName:"Floor"}},Men:{aa:{shortName:"AA",name:"AA",longName:"All Around"},1:{shortName:"FX",name:"Floor",longName:"Floor"},2:{shortName:"PH",name:"Pommel",longName:"Pommel"},3:{shortName:"SR",name:"Rings",longName:"Rings"},4:{shortName:"VT",name:"Vault",longName:"Vault"},5:{shortName:"PB",name:"P Bars",longName:"P Bars"},6:{shortName:"HB",name:"H Bar",longName:"H Bar"}}},m=null!==new URLSearchParams(window.location.search).get("detail");function j(e){var t=e.match(/(\d\d):(\d\d)(?::\d\d)?/);return t?"".concat(t[1].replace(/^0/,""),":").concat(t[2]):e}function u(e){return e.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)?h(e).toLocaleDateString():e}function h(e){var t=new Date(e);return t.setHours(t.getUTCHours()),t.setDate(t.getDate()+1),t}function b(e){var t=e.person,n=e.id,c=Object(a.useState)(!1),r=Object(l.a)(c,2),i=r[0],b=r[1],f=Object(o.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/".concat(n),{headers:{accept:"application/json"}},{defer:!0}),O=f.data,x=f.error,N=f.isPending,v=f.run,p=t.sanctions[n];if(Object(a.useEffect)((function(){(function(e,t){var n=h(e);if(n.setDate(n.getDate()-2),n.getTime()<Date.now()){var s=new Date(t);return s.setDate(s.getDate()+2),s.getTime()>Date.now()}return!1})(p.startDate,p.endDate)&&(b(!0),v())}),[b,v,p]),!i)return Object(s.jsx)("li",{className:"sanction-button",children:Object(s.jsxs)("button",{onClick:v,children:["Load ",p.name," ",u(p.startDate),"-",u(p.endDate)]})});if(N&&!O)return Object(s.jsxs)("li",{children:["Loading ",p.name,"..."]});if(x)return Object(s.jsxs)("li",{className:"error",children:[x.message,Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:v,children:"Refresh"})]});if(!O)return Object(s.jsxs)("li",{className:"error",children:["No data",Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:v,children:"Refresh"})]});var g=t.sanctionPeople.find((function(e){return e.sanctionId===n}));if(!g)return Object(s.jsx)("li",{className:"error",children:"Cannot find sanctionPeople"});var I=Object.values(O.sanctionPeople).filter((function(e){return e.sessionId===g.sessionId&&e.level===g.level&&e.division===g.division})).length,y=O.sessions.find((function(e){return e.sessionId===g.sessionId}));if(!y)return Object(s.jsxs)("li",{className:"error",children:["Cannot find session",Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:v,children:"Refresh"})]});for(var w=O.sessionResultSets.find((function(e){return e.sessionId===g.sessionId&&e.level===g.level&&e.division===g.division})),S="squad".concat(g.squad),D=y[S]||"",A=Array.from(D).reduce((function(e,t,n){return e[t]=n+1,e}),{}),P=t.scores.filter((function(e){return e.sanctionId===n&&e.resultSetId===(null===w||void 0===w?void 0:w.resultSetId)})),C=function(){var e=k[L];P.some((function(t){return t.eventId===e}))||P.push({eventId:e,program:y.program})},L=0,k=Array.from(D);L<k.length;L++)C();P.sort((function(e,t){return e.resultSetId&&t.resultSetId?e.resultSetId-t.resultSetId:e.eventId in A&&t.eventId in A?A[e.eventId]-A[t.eventId]:e.eventId in A?-1:t.eventId in A?1:0}));var B,R=m&&P.some((function(e){return e.difficulty})),F=m&&P.some((function(e){return e.execution})),H=m&&P.some((function(e){return e.deductions})),U=P.some((function(e){return e.finalScore})),V=P.some((function(e){return e.place}));return Object(s.jsxs)("li",{className:"sanction",children:[Object(s.jsx)("h3",{className:"sanctionName",children:Object(s.jsx)("a",{href:"https://myusagym.com/meets/live/".concat(n,"/"),children:p.name})}),Object(s.jsxs)("h5",{className:"site",children:[Object(s.jsx)("a",{className:"siteName",href:p.siteLink,children:p.siteName}),Object(s.jsx)("br",{}),Object(s.jsxs)("a",{className:"siteAddress",href:"https://maps.google.com?q=".concat(encodeURIComponent("".concat(p.address1,", ").concat(p.city,", ").concat(p.state," ").concat(p.zip))),children:[p.address1,", ",p.city,", ",p.state," ",p.zip]})]}),Object(s.jsxs)("h3",{className:"level",children:["Level ",g.level,Object(s.jsx)("br",{}),g.division]}),Object(s.jsxs)("div",{className:"date",children:[(B=y.date,B.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)?h(B).toDateString():B),Object(s.jsx)("br",{}),j(y.time1)," ",p.time1,Object(s.jsx)("br",{}),j(y.time2)," ",p.time2,Object(s.jsx)("br",{}),j(y.time3)," ",p.time3,Object(s.jsx)("br",{}),j(y.time4)," ",p.time4]}),Object(s.jsx)("br",{}),w?Object(s.jsx)("a",{className:"startList",href:"https://myusagym.com/meets/live/".concat(n,"/results/").concat(w.resultSetId,"/"),children:"All Scores"}):null,Object(s.jsx)("br",{}),Object(s.jsx)("br",{}),Object(s.jsx)("div",{className:"scores",children:Object(s.jsxs)("table",{children:[Object(s.jsx)("thead",{children:Object(s.jsxs)("tr",{children:[Object(s.jsx)("th",{children:N?"...":Object(s.jsx)("button",{onClick:v,disabled:N,children:"Refresh"})}),R?Object(s.jsx)("th",{children:"Difficulty"}):null,F?Object(s.jsx)("th",{children:"Execution"}):null,H?Object(s.jsx)("th",{children:"Deduction"}):null,U?Object(s.jsx)("th",{children:m?"Final":"Score"}):null,V?Object(s.jsx)("th",{children:"Place"}):null]})}),Object(s.jsx)("tbody",{children:P.map((function(e){var t,n,a=null===(t=d[e.program])||void 0===t||null===(n=t[e.eventId])||void 0===n?void 0:n.longName;return Object(s.jsxs)("tr",{children:[Object(s.jsxs)("th",{className:"event",children:[e.eventId in A?"".concat(A[e.eventId],". "):"",a||"Unknown Event ".concat(e.eventId)]}),R?Object(s.jsx)("td",{className:"difficulty",children:e.difficulty||""}):null,F?Object(s.jsx)("td",{className:"execution",children:e.execution||""}):null,H?Object(s.jsx)("td",{className:"deductions",children:e.deductions||""}):null,U?Object(s.jsx)("td",{className:"finalScore",children:e.finalScore||""}):null,V?Object(s.jsx)("td",{className:"place",children:e.place?"".concat(e.place," of ").concat(I):""}):null]},"".concat(e.eventId," ").concat(e.resultSetId))}))})]})})]})}function f(e){var t=e.id,n=Object(o.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/people/".concat(t),{headers:{accept:"application/json"}}),a=n.data,c=n.error;return n.isPending?Object(s.jsx)("li",{children:"Loading..."}):c?Object(s.jsx)("li",{className:"error",children:c.message}):a?Object(s.jsxs)("li",{className:"person",children:[Object(s.jsxs)("h1",{className:"name",children:[a.person.firstName," ",a.person.lastName]}),Object(s.jsx)("h2",{className:"club",children:a.club.name}),Object(s.jsx)("ul",{className:"sanctions",children:Object.keys(a.sanctions).sort((function(e,t){var n=a.sanctions[e].startDate;return a.sanctions[t].startDate.localeCompare(n)})).map((function(e){return Object(s.jsx)(b,{person:a,id:+e},e)}))})]}):Object(s.jsx)("li",{className:"error",children:"No data"})}function O(){var e=Object(o.a)("".concat(window.location.href,"/names.json"),{headers:{accept:"application/json"}}),t=e.data,n=e.error;if(e.isPending)return Object(s.jsx)("div",{children:"Loading..."});if(n)return Object(s.jsx)("div",{className:"error",children:n.message});if(!t)return Object(s.jsx)("div",{className:"error",children:"No names"});var a=Object.keys(t).sort();return Object(s.jsxs)("div",{className:"names",children:[Object(s.jsx)("h2",{children:"Pick an Athlete:"}),Object(s.jsx)("ul",{className:"names",children:a.map((function(e){return Object(s.jsx)("li",{className:"names-button",children:Object(s.jsx)("button",{onClick:(n=t[e],function(){window.location.href="?id=".concat(n)}),children:e})},e);var n}))})]})}function x(e){var t=e.search,n=e.name,a=Object(o.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/".concat(t),{headers:{accept:"application/json"}}),c=a.data,r=a.error;if(a.isPending)return Object(s.jsx)("div",{children:"Loading..."});if(r)return Object(s.jsx)("div",{className:"error",children:r.message});if(!c)return Object(s.jsx)("div",{className:"error",children:"No data"});var i=n.toLowerCase().split(" "),l=Object.values(c.people).filter((function(e){return i.length>1?e.firstName.toLowerCase().startsWith(i[0])&&e.lastName.toLowerCase().startsWith(i[1]):e.firstName.toLowerCase().startsWith(i[0])||e.lastName.toLowerCase().startsWith(i[0])})).map((function(e){return{id:e.personId,name:"".concat(e.firstName," ").concat(e.lastName)}}));return Object(s.jsxs)("div",{className:"names",children:[Object(s.jsx)("h2",{children:"Pick an Athlete:"}),Object(s.jsx)("ul",{className:"names",children:l.map((function(e){return Object(s.jsx)("li",{className:"names-button",children:Object(s.jsx)("button",{onClick:(t=e.id,function(){window.location.href="?id=".concat(t)}),children:e.name})},e.name);var t}))})]})}function N(){var e=new URLSearchParams(window.location.search),t=e.get("id");if(t){var n=t.split(",");if(n.length>0)return Object(s.jsx)("ul",{className:"persons",children:n.map((function(e){return Object(s.jsx)(f,{id:e},e)}))})}var a=e.get("search");if(a){var c=e.get("name")||"";return Object(s.jsx)(x,{search:a,name:c})}return Object(s.jsx)(O,{})}i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(N,{})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.a98cb3e8.chunk.js.map