!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).transformCase=t()}(this,(function(){"use strict";const e=e=>Boolean(e&&"string"==typeof e&&1===e.length),t=t=>e(t)&&Boolean(t.match(/[0-9]/)),r=t=>e(t)&&t.toLowerCase()!==t.toUpperCase(),i=t=>e(t)&&t===t.toLowerCase()&&t!==t.toUpperCase(),s=t=>e(t)&&t===t.toUpperCase()&&t!==t.toLowerCase(),o={delimit:[],preserve:[],replace:{},delimitInput:"",delimitLetterNumber:!0,delimitLowerUpper:!0,delimitNumberLetter:!0,delimitUpperLower:!1,delimitUpperUpperLower:!0,delimitOutput:" "},n={postProcess:e=>e,firstWordFirstChar:e=>e,firstWordNextChars:e=>e,nextWordsFirstChar:e=>e,nextWordsNextChars:e=>e},p=e=>(e=>e.replace(/‘’`/g,"'").replace(/“”/g,'"'))(e).replace(/[…,:;[\](){}\-‐–—'".!?]/g,""),l=e=>e.toLowerCase(),u=e=>e.toUpperCase(),a=(e,t)=>{const r=new RegExp("^"+t),i=new RegExp(t+"$"),s=new RegExp(t+t,"g");return e.replace(r,"").replace(i,"").replace(s,t)},d=(e,o,n,p)=>{let l,u,a,d,m;return l=p.delimitLetterNumber&&r(e)&&t(o),u=p.delimitLowerUpper&&i(e)&&s(o),a=p.delimitNumberLetter&&t(e)&&r(o),d=p.delimitUpperLower&&s(e)&&i(o),m=p.delimitUpperUpperLower&&s(e)&&s(o)&&i(n),l||u||a||d||m},m=function(e,i){if(console.log(" line ",e," userOptions ",i),!e)return;let s={};const m=Object.assign({},o,i);s.orgin={input:e},e=e.trim().replace(/\s+/g," "),m.delimitInput?s.orgin.normalised=a(e,m.delimitInput):s.orgin.normalised=e,s.orgin.isPureAlphaNumeric=(e=>e&&e.split&&!e.split("").some(e=>!r(e)&&!t(e)))(s.orgin.normalised);let c,f=s.orgin.normalised;c=m.delimitInput?m.delimitInput:(s.orgin.isPureAlphaNumeric,m.delimitOutput);const g=Object.entries(m.replace);if(m.replace&&g.length)for(let[e,t]of g)f=f.replace(new RegExp(e,"g"),t);const h=[].concat(m.preserve,m.delimit);if(h.length&&(h.forEach(e=>{f=f.replace(new RegExp(e,"g"),c+e+c)}),f=a(f,c)),m.delimitInput)s.phrase=f,s.words=f.split(m.delimitInput);else if(s.orgin.isPureAlphaNumeric){let e=f.split(m.delimitOutput);s.phrase=e.map(e=>m.preserve.includes(e)?e:((e,t)=>{let r=e[0];for(let i=1;i<e.length;i++)d(e[i-1],e[i],e[i+1]||"",t)&&(r+=t.delimitOutput),r+=e[i];return r})(e,m)).join(m.delimitOutput),s.words=s.phrase.split(m.delimitOutput)}else s.phrase=f,s.words=f.split(m.delimitOutput);return Object.assign(s,function(e,t){const r=r=>{let i=e.map((e,i)=>0===i?t.preserve.includes(e)?e:r.firstWordFirstChar(e.substr(0,1))+r.firstWordNextChars(e.substr(1)):t.preserve.includes(e)?e:r.nextWordsFirstChar(e.substr(0,1))+r.nextWordsNextChars(e.substr(1)));return r.postProcess(i.join(r.delimitOutput))};return{camelCase:()=>{const e=Object.assign({},n,{postProcess:p,delimitOutput:"",firstWordFirstChar:l,firstWordNextChars:l,nextWordsFirstChar:u,nextWordsNextChars:l});return r(e)},humanTitle:()=>{const e=Object.assign({},n,{delimitOutput:" ",firstWordFirstChar:u,nextWordsFirstChar:u});return r(e)}}}(s.words,m))};return function(e,t){return t||(t={}),m(e,t)}}));
//# sourceMappingURL=transformCase.js.map
