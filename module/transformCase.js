const e=e=>Boolean(e&&"string"==typeof e&&1===e.length),t=t=>e(t)&&Boolean(t.match(/[0-9]/)),s=t=>e(t)&&t.toLowerCase()!==t.toUpperCase(),r=t=>e(t)&&t===t.toLowerCase()&&t!==t.toUpperCase(),a=t=>e(t)&&t===t.toUpperCase()&&t!==t.toLowerCase(),l=(e,t)=>{const s=e.match(t);return s&&s[0]===e},i={delimit:[],preserve:[],replace:{},delimitInput:"",delimitLetterNumber:!0,delimitLowerUpper:!0,delimitNumberLetter:!0,delimitUpperLower:!1,delimitUpperUpperLower:!0,delimitOutput:" "},o={preprocess:e=>e,postProcess:e=>e,firstWordFirstChar:e=>e,firstWordNextChars:e=>e,nextWordsFirstChar:e=>e,nextWordsNextChars:e=>e};var p=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e){const t={};[{base:"A",letters:"AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"},{base:"AA",letters:"Ꜳ"},{base:"AE",letters:"ÆǼǢ"},{base:"AO",letters:"Ꜵ"},{base:"AU",letters:"Ꜷ"},{base:"AV",letters:"ꜸꜺ"},{base:"AY",letters:"Ꜽ"},{base:"B",letters:"BⒷＢḂḄḆɃƂƁ"},{base:"C",letters:"CⒸＣĆĈĊČÇḈƇȻꜾ"},{base:"D",letters:"DⒹＤḊĎḌḐḒḎĐƋƊƉꝹÐ"},{base:"DZ",letters:"ǱǄ"},{base:"Dz",letters:"ǲǅ"},{base:"E",letters:"EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"},{base:"F",letters:"FⒻＦḞƑꝻ"},{base:"G",letters:"GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"},{base:"H",letters:"HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"},{base:"I",letters:"IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"},{base:"J",letters:"JⒿＪĴɈ"},{base:"K",letters:"KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"},{base:"L",letters:"LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"},{base:"LJ",letters:"Ǉ"},{base:"Lj",letters:"ǈ"},{base:"M",letters:"MⓂＭḾṀṂⱮƜ"},{base:"N",letters:"NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"},{base:"NJ",letters:"Ǌ"},{base:"Nj",letters:"ǋ"},{base:"O",letters:"OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"},{base:"OI",letters:"Ƣ"},{base:"OO",letters:"Ꝏ"},{base:"OU",letters:"Ȣ"},{base:"OE",letters:"Œ"},{base:"oe",letters:"œ"},{base:"P",letters:"PⓅＰṔṖƤⱣꝐꝒꝔ"},{base:"Q",letters:"QⓆＱꝖꝘɊ"},{base:"R",letters:"RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"},{base:"S",letters:"SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",letters:"TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"TZ",letters:"Ꜩ"},{base:"U",letters:"UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",letters:"VⓋＶṼṾƲꝞɅ"},{base:"VY",letters:"Ꝡ"},{base:"W",letters:"WⓌＷẀẂŴẆẄẈⱲ"},{base:"X",letters:"XⓍＸẊẌ"},{base:"Y",letters:"YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",letters:"ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"},{base:"a",letters:"aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"},{base:"aa",letters:"ꜳ"},{base:"ae",letters:"æǽǣ"},{base:"ao",letters:"ꜵ"},{base:"au",letters:"ꜷ"},{base:"av",letters:"ꜹꜻ"},{base:"ay",letters:"ꜽ"},{base:"b",letters:"bⓑｂḃḅḇƀƃɓ"},{base:"c",letters:"cⓒｃćĉċčçḉƈȼꜿↄ"},{base:"d",letters:"dⓓｄḋďḍḑḓḏđƌɖɗꝺ"},{base:"dz",letters:"ǳǆ"},{base:"e",letters:"eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"},{base:"f",letters:"fⓕｆḟƒꝼ"},{base:"g",letters:"gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"},{base:"h",letters:"hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",letters:"ƕ"},{base:"i",letters:"iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"},{base:"j",letters:"jⓙｊĵǰɉ"},{base:"k",letters:"kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"},{base:"l",letters:"lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"},{base:"lj",letters:"ǉ"},{base:"m",letters:"mⓜｍḿṁṃɱɯ"},{base:"n",letters:"nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"},{base:"nj",letters:"ǌ"},{base:"o",letters:"oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"},{base:"oi",letters:"ƣ"},{base:"ou",letters:"ȣ"},{base:"oo",letters:"ꝏ"},{base:"p",letters:"pⓟｐṕṗƥᵽꝑꝓꝕ"},{base:"q",letters:"qⓠｑɋꝗꝙ"},{base:"r",letters:"rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"},{base:"s",letters:"sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"},{base:"t",letters:"tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"tz",letters:"ꜩ"},{base:"u",letters:"uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",letters:"vⓥｖṽṿʋꝟʌ"},{base:"vy",letters:"ꝡ"},{base:"w",letters:"wⓦｗẁẃŵẇẅẘẉⱳ"},{base:"x",letters:"xⓧｘẋẍ"},{base:"y",letters:"yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"},{base:"z",letters:"zⓩｚźẑżžẓẕƶȥɀⱬꝣ"}].forEach(e=>[...e.letters].forEach(s=>t[s]=e.base));const s={_slower:e=>e.replace(/[\u0300-\u036F]|[\u1AB0-\u1AFF]|[\u1DC0-\u1DFF]|[\u20D0-\u20FF]|[\uFE20-\uFE2F]/g,"").replace(/[^\u0000-\u007E]/g,e=>t[e]||e),_faster:e=>e.replace(/[^\u0000-\u007E]/g,e=>t[e]||e),precomposed:e=>(s.remove_diacritics=e=>s._faster(e))&&e&&s._faster(e),combining:e=>(s.remove_diacritics=e=>s._slower(e))&&e&&s._slower(e),remove_diacritics:e=>s._slower(e),letters:t=>e.exports.remove_diacritics(t).replace(/[^a-z ]/gi,""),packed:t=>e.exports.remove_diacritics(t).replace(/[^a-z]/gi,""),alphanum:t=>e.exports.remove_diacritics(t).replace(/[^a-z0-9 ]/gi,""),packed_alphanum:t=>e.exports.remove_diacritics(t).replace(/[^a-z0-9]/gi,"")};e.exports=s}));const b=(e,t)=>{const s=/(\d)[-:,./](\d)/g;let r=t||"_";return e.map(e=>e.match(s)?e.replace(s,`$1${r}$2`).replace(s,`$1${r}$2`):e)},n=e=>e.toLowerCase(),c=e=>e.toUpperCase(),u=function(e,t){const s=s=>{const r=s.preprocess(e,s.delimitOutput).map((e,r)=>0===r?t.preserve.some(t=>l(e,t))?e:s.firstWordFirstChar(e.substr(0,1))+s.firstWordNextChars(e.substr(1)):t.preserve.some(t=>l(e,t))?e:s.nextWordsFirstChar(e.substr(0,1))+s.nextWordsNextChars(e.substr(1)));return s.postProcess(r.join(s.delimitOutput))},r={preprocess:b,postProcess:function(e){return e=(e=>p.combining(e))(e=(e=>(e=>e.replace(/‘’`/g,"'").replace(/“”/g,'"'))(e).replace(/[…,:;[\](){}\-‐–—'".!?]/g,""))(e))}};return{camelCase:()=>{const e=Object.assign({},o,r,{delimitOutput:"",firstWordFirstChar:n,firstWordNextChars:n,nextWordsFirstChar:c,nextWordsNextChars:n});return s(e)},humanTitle:()=>{const e=Object.assign({},o,{delimitOutput:" ",firstWordFirstChar:c,nextWordsFirstChar:c});return s(e)},snakeCase:()=>{const e=Object.assign({},o,r,{delimitOutput:"_",firstWordFirstChar:n,firstWordNextChars:n,nextWordsFirstChar:n,nextWordsNextChars:n});return s(e)}}},d=(e,t)=>{const s=new RegExp("^"+t),r=new RegExp(t+"$"),a=new RegExp(t+t,"g");return e.replace(a,t).replace(a,t).replace(a,t).replace(s,"").replace(r,"")},m=e=>{const t=new RegExp("[\0-,-]");return e.trim().replace(/\s+/g," ").replace(t,"")},g=(e,l,i,o)=>{let p,b,n,c,u;return p=o.delimitLetterNumber&&s(e)&&t(l),b=o.delimitLowerUpper&&r(e)&&a(l),n=o.delimitNumberLetter&&t(e)&&s(l),c=o.delimitUpperLower&&a(e)&&r(l),u=o.delimitUpperUpperLower&&a(e)&&a(l)&&r(i),p||b||n||c||u},h=function(e,r){if(!e)return;let a={};const o=Object.assign({},i,r);a.orgin={input:e},o.delimitInput?a.orgin.standardised=d(m(e),o.delimitInput):a.orgin.standardised=m(e),a.orgin.isPureAlphaNumeric=(e=>e&&e.split&&!e.split("").some(e=>!(s(e)||t(e))))(a.orgin.standardised);let p,b=a.orgin.standardised;p=a.orgin.isPureAlphaNumeric?o.delimitOutput:o.delimitInput||o.delimitOutput;const n=Object.entries(o.replace);if(o.replace&&n.length)for(let[e,t]of n)b=b.replace(new RegExp(e,"g"),t);const c=[].concat(o.preserve,o.delimit);if(c.length&&(c.forEach(e=>{b=b.replace(e,p+"$&"+p)}),b=d(b,p)),a.orgin.isPureAlphaNumeric){let e=b.split(p);a.phrase=e.map(e=>o.preserve.some(t=>l(e,t))?e:((e,t)=>{let s=e[0];for(let r=1;r<e.length;r++)g(e[r-1],e[r],e[r+1]||"",t)&&(s+=t.delimitOutput),s+=e[r];return s})(e,o)).join(p),a.words=a.phrase.split(p)}else a.phrase=b,a.words=b.split(p);return Object.assign(a,u(a.words,o))};export default function(e,t){return t||(t={}),h(e,t)}
//# sourceMappingURL=transformCase.js.map
