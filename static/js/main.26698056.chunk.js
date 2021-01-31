(this["webpackJsonpmy-usa-gymnast"]=this["webpackJsonpmy-usa-gymnast"]||[]).push([[0],{30:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n(0),a=n.n(c),r=n(18),i=n.n(r),o=n(10),l=n(7),d={Women:{aa:{shortName:"AA",name:"AA",longName:"All Around"},1:{shortName:"VT",name:"Vault",longName:"Vault"},2:{shortName:"UB",name:"Bars",longName:"Bars"},3:{shortName:"BB",name:"Beam",longName:"Beam"},4:{shortName:"FX",name:"Floor",longName:"Floor"}},Men:{aa:{shortName:"AA",name:"AA",longName:"All Around"},1:{shortName:"FX",name:"Floor",longName:"Floor"},2:{shortName:"PH",name:"Pommel",longName:"Pommel"},3:{shortName:"SR",name:"Rings",longName:"Rings"},4:{shortName:"VT",name:"Vault",longName:"Vault"},5:{shortName:"PB",name:"P Bars",longName:"P Bars"},6:{shortName:"HB",name:"H Bar",longName:"H Bar"}}};function m(e){var t=e.match(/(\d\d):(\d\d):(\d\d)/);return t?"".concat(t[1].replace(/^0/,""),":").concat(t[2]):e}function u(e){return e.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)?j(e).toLocaleDateString():e}function j(e){var t=new Date(e);return t.setUTCHours(t.getHours()),t}function h(e){var t=e.person,n=e.id,a=Object(c.useState)(!1),r=Object(l.a)(a,2),i=r[0],h=r[1],b=Object(o.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/".concat(n),{headers:{accept:"application/json"}},{defer:!0}),f=b.data,O=b.error,x=b.isPending,N=b.run,v=t.sanctions[n];if(Object(c.useEffect)((function(){(function(e,t){if(j(e).getTime()<Date.now()){var n=new Date(t);return n.setDate(n.getDate()+2),n.getTime()>Date.now()}return!1})(v.startDate,v.endDate)&&(h(!0),N())}),[h,N,v]),!i)return Object(s.jsx)("li",{children:Object(s.jsxs)("button",{onClick:function(){h(!0),N()},children:["Load ",v.name," ",u(v.startDate),"-",u(v.endDate)]})});if(x)return Object(s.jsxs)("li",{children:["Loading ",v.name,"..."]});if(O)return Object(s.jsxs)("li",{className:"error",children:[O.message,Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:N,children:"Refresh"})]});if(!f)return Object(s.jsxs)("li",{className:"error",children:["No data",Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:N,children:"Refresh"})]});var p=t.sanctionPeople.find((function(e){return e.sanctionId===n}));if(!p)return Object(s.jsx)("li",{className:"error",children:"Cannot find sanctionPeople"});var g=Object.values(f.sanctionPeople).filter((function(e){return e.sessionId===p.sessionId&&e.level===p.level&&e.division===p.division})).length,y=f.sessions.find((function(e){return e.sessionId===p.sessionId}));if(!y)return Object(s.jsxs)("li",{className:"error",children:["Cannot find session",Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:N,children:"Refresh"})]});for(var I=f.sessionResultSets.find((function(e){return e.sessionId===p.sessionId&&e.level===p.level&&e.division===p.division})),A="squad".concat(p.squad),B=y[A]||"",D=Array.from(B).reduce((function(e,t,n){return e[t]=n+1,e}),{}),S=t.scores.filter((function(e){return e.sanctionId===n})),P=function(){var e=L[k];S.some((function(t){return t.eventId===e}))||S.push({eventId:e,program:y.program})},k=0,L=Array.from(B);k<L.length;k++)P();S.sort((function(e,t){return e.eventId in D&&t.eventId in D?D[e.eventId]-D[t.eventId]:e.eventId in D?-1:t.eventId in D?1:0}));var C,F=S.some((function(e){return e.difficulty})),R=S.some((function(e){return e.execution})),w=S.some((function(e){return e.deductions})),H=S.some((function(e){return e.finalScore})),V=S.some((function(e){return e.place}));return Object(s.jsxs)("li",{className:"sanction",children:[Object(s.jsx)("h3",{className:"sanctionName",children:Object(s.jsx)("a",{href:"https://myusagym.com/meets/live/".concat(n,"/"),children:v.name})}),Object(s.jsxs)("h5",{className:"site",children:[Object(s.jsx)("a",{className:"siteName",href:v.siteLink,children:v.siteName}),Object(s.jsx)("br",{}),Object(s.jsxs)("a",{className:"siteAddress",href:"https://maps.google.com?q=".concat(encodeURIComponent("".concat(v.address1,", ").concat(v.city,", ").concat(v.state," ").concat(v.zip))),children:[v.address1,", ",v.city,", ",v.state," ",v.zip]})]}),Object(s.jsx)("h3",{className:"level",children:Object(s.jsxs)("a",{href:I?"https://myusagym.com/meets/live/".concat(n,"/results/").concat(I.resultSetId,"/"):"https://myusagym.com/meets/live/".concat(n,"/"),children:["Level ",p.level," ",p.division," ",p.program," Session ",p.sessionId," Squad ",p.squad," Flight ",p.flight]})}),Object(s.jsxs)("h5",{className:"date",children:[(C=y.date,C.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)?j(C).toDateString():C),Object(s.jsx)("br",{}),v.time1,": ",m(y.time1),"; ",v.time2,": ",m(y.time2),"; ",v.time3,": ",m(y.time3),"; ",v.time4,": ",m(y.time4)]}),Object(s.jsx)("a",{className:"startList",href:"https://myusagym.com/meets/live/".concat(n,"/session/").concat(p.sessionId,"/startList/"),children:"Start List"}),Object(s.jsx)("div",{className:"scores",children:Object(s.jsxs)("table",{children:[Object(s.jsx)("thead",{children:Object(s.jsxs)("tr",{children:[Object(s.jsx)("th",{}),F?Object(s.jsx)("th",{children:"Difficulty"}):null,R?Object(s.jsx)("th",{children:"Execution"}):null,w?Object(s.jsx)("th",{children:"Deduction"}):null,H?Object(s.jsx)("th",{children:"Final"}):null,V?Object(s.jsx)("th",{children:"Place"}):null]})}),Object(s.jsx)("tbody",{children:S.map((function(e){var t,n,c=null===(t=d[e.program])||void 0===t||null===(n=t[e.eventId])||void 0===n?void 0:n.longName;return Object(s.jsxs)("tr",{children:[Object(s.jsxs)("th",{className:"event",children:[e.eventId in D?"".concat(D[e.eventId],". "):"",c||"Unknown Event ".concat(e.eventId)]}),F?Object(s.jsx)("td",{className:"difficulty",children:e.difficulty||""}):null,R?Object(s.jsx)("td",{className:"execution",children:e.execution||""}):null,w?Object(s.jsx)("td",{className:"deductions",children:e.deductions||""}):null,H?Object(s.jsx)("td",{className:"finalScore",children:e.finalScore||""}):null,V?Object(s.jsx)("td",{className:"place",children:e.place?"".concat(e.place," of ").concat(g):""}):null]},e.eventId)}))})]})})]})}function b(e){var t=e.id,n=Object(o.a)("https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/people/".concat(t),{headers:{accept:"application/json"}}),c=n.data,a=n.error;return n.isPending?Object(s.jsx)("li",{children:"Loading..."}):a?Object(s.jsx)("li",{className:"error",children:a.message}):c?Object(s.jsxs)("li",{className:"person",children:[Object(s.jsxs)("h1",{className:"name",children:[c.person.firstName," ",c.person.lastName]}),Object(s.jsx)("h2",{className:"club",children:c.club.name}),Object(s.jsx)("ul",{children:Object.keys(c.sanctions).map((function(e){return Object(s.jsx)(h,{person:c,id:+e},e)}))})]}):Object(s.jsx)("li",{className:"error",children:"No data"})}var f="1913246";function O(){return Object(s.jsx)("ul",{children:Object(s.jsx)(b,{id:f},f)})}i.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(O,{})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.26698056.chunk.js.map