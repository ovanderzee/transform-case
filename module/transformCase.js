const e=e=>Boolean(e&&"string"==typeof e&&1===e.length),t=t=>e(t)&&Boolean(t.match(/[0-9]/)),r=t=>e(t)&&t.toLowerCase()!==t.toUpperCase(),i=t=>e(t)&&t===t.toLowerCase()&&t!==t.toUpperCase(),s=t=>e(t)&&t===t.toUpperCase()&&t!==t.toLowerCase(),p={preserve:[],replace:{},delimitInput:"",delimitLetterNumber:!0,delimitLowerUpper:!0,delimitNumberLetter:!1,delimitUpperLower:!1,delimitOutput:" "},o={postProcess:e=>e,firstWordFirstChar:e=>e,firstWordNextChars:e=>e,nextWordsFirstChar:e=>e,nextWordsNextChars:e=>e},l=(e,t)=>{const r=new RegExp("^"+t),i=new RegExp(t+"$"),s=new RegExp(t+t,"g");return e.replace(r,"").replace(i,"").replace(s,t)},n=(e,p,o)=>{let l,n,a,u;return l=o.delimitLetterNumber&&r(e)&&t(p),n=o.delimitLowerUpper&&i(e)&&s(p),a=o.delimitNumberLetter&&t(e)&&r(p),u=o.delimitUpperLower&&s(e)&&i(p),l||n||a||u},a=e=>(e=>e.replace(/‘’`/g,"'").replace(/“”/g,'"'))(e).replace(/[…,:;[\](){}\-‐–—'".!?]/g,""),u=function(e,i){if(!e)return;const s=Object.assign({},p,i);this.orgin={input:e},e=e.trim().replace(/\s+/g," "),s.delimitInput?this.orgin.normalised=l(e,s.delimitInput):this.orgin.normalised=e,this.orgin.isPureAlphaNumeric=(e=>e&&e.split&&!e.split("").some(e=>!r(e)&&!t(e)))(this.orgin.normalised);let u,d=this.orgin.normalised;u=s.delimitInput?s.delimitInput:(this.orgin.isPureAlphaNumeric,s.delimitOutput);const h=Object.entries(s.replace);if(s.replace&&h.length)for(let[e,t]of h)d=d.replace(new RegExp(e,"g"),t);if(s.preserve.length&&(s.preserve.forEach(e=>{d=d.replace(new RegExp(e,"g"),u+e+u)}),d=l(d,u)),s.delimitInput)this.phrase=d,this.words=d.split(s.delimitInput);else if(this.orgin.isPureAlphaNumeric){let e=d.split(s.delimitOutput);this.phrase=e.map(e=>s.preserve.includes(e)?e:((e,t)=>{let r=e[0];for(let i=1;i<e.length;i++)n(e[i-1],e[i],t)&&(r+=t.delimitOutput),r+=e[i];return r})(e,s)).join(s.delimitOutput),this.words=this.phrase.split(s.delimitOutput)}else this.phrase=d,this.words=d.split(s.delimitOutput);const m=e=>e.toLowerCase(),c=e=>e.toUpperCase(),g=e=>{let t=this.words.map((t,r)=>0===r?s.preserve.includes(t)?t:e.firstWordFirstChar(t.substr(0,1))+e.firstWordNextChars(t.substr(1)):s.preserve.includes(t)?t:e.nextWordsFirstChar(t.substr(0,1))+e.nextWordsNextChars(t.substr(1)));return e.postProcess(t.join(e.delimitOutput))};this.camelCase=()=>{const e=Object.assign({},o,{postProcess:a,delimitOutput:"",firstWordFirstChar:m,firstWordNextChars:m,nextWordsFirstChar:c,nextWordsNextChars:m});return g(e)},this.humanTitle=()=>{const e=Object.assign({},o,{delimitOutput:" ",firstWordFirstChar:c,nextWordsFirstChar:c});return g(e)}};export default function(e,t){return t||(t={}),new u(e,t)}
//# sourceMappingURL=transformCase.js.map
