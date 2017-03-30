/*! modernizr 3.4.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-flexbox-flexboxlegacy-flexboxtweener-flexwrap-objectfit-setclasses !*/
!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,s,l;for(var a in C)if(C.hasOwnProperty(a)){if(e=[],t=C[a],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],l=s.split("."),1===l.length?Modernizr[l[0]]=i:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=i),w.push((i?"":"no-")+l.join("-"))}}function o(e){var t=b.className,n=Modernizr._config.classPrefix||"";if(_&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?b.className.baseVal=t:b.className=t)}function s(t,n,r){var i;if("getComputedStyle"in e){i=getComputedStyle.call(e,t,n);var o=e.console;if(null!==i)r&&(i=i.getPropertyValue(r));else if(o){var s=o.error?"error":"log";o[s].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else i=!n&&t.currentStyle&&t.currentStyle[r];return i}function l(e,t){return e-1===t||e===t||e+1===t}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function f(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function d(){var e=t.body;return e||(e=f(_?"svg":"body"),e.fake=!0),e}function u(e,n,r,i){var o,s,l,a,u="modernizr",c=f("div"),p=d();if(parseInt(r,10))for(;r--;)l=f("div"),l.id=i?i[r]:u+(r+1),c.appendChild(l);return o=f("style"),o.type="text/css",o.id="s"+u,(p.fake?p:c).appendChild(o),p.appendChild(c),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),c.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",a=b.style.overflow,b.style.overflow="hidden",b.appendChild(p)),s=n(c,e),p.fake?(p.parentNode.removeChild(p),b.style.overflow=a,b.offsetHeight):c.parentNode.removeChild(c),!!s}function c(e,t){return!!~(""+e).indexOf(t)}function p(e,t){return function(){return e.apply(t,arguments)}}function h(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?p(i,n||t):i);return!1}function m(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function v(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(m(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+m(t[i])+":"+r+")");return o=o.join(" or "),u("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==s(e,null,"position")})}return n}function g(e,t,i,o){function s(){d&&(delete j.style,delete j.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var l=v(e,i);if(!r(l,"undefined"))return l}for(var d,u,p,h,m,g=["modernizr","tspan","samp"];!j.style&&g.length;)d=!0,j.modElem=f(g.shift()),j.style=j.modElem.style;for(p=e.length,u=0;p>u;u++)if(h=e[u],m=j.style[h],c(h,"-")&&(h=a(h)),j.style[h]!==n){if(o||r(i,"undefined"))return s(),"pfx"==t?h:!0;try{j.style[h]=i}catch(x){}if(j.style[h]!=m)return s(),"pfx"==t?h:!0}return s(),!1}function x(e,t,n,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+N.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?g(l,t,i,o):(l=(e+" "+E.join(s+" ")+s).split(" "),h(l,t,n))}function y(e,t,r){return x(e,n,n,t,r)}var w=[],C=[],S={_version:"3.4.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var b=t.documentElement,_="svg"===b.nodeName.toLowerCase(),z=S.testStyles=u;z("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),r=parseInt(s(t,null,"height"),10);Modernizr.addTest("cssvhunit",r==n)}),z("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(e){var t=e.childNodes[2],n=e.childNodes[1],r=e.childNodes[0],i=parseInt((n.offsetWidth-n.clientWidth)/2,10),o=r.clientWidth/100,a=r.clientHeight/100,f=parseInt(50*Math.max(o,a),10),d=parseInt(s(t,null,"width"),10);Modernizr.addTest("cssvmaxunit",l(f,d)||l(f,d-i))},3),z("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(e){var t=e.childNodes[2],n=e.childNodes[1],r=e.childNodes[0],i=parseInt((n.offsetWidth-n.clientWidth)/2,10),o=r.clientWidth/100,a=r.clientHeight/100,f=parseInt(50*Math.min(o,a),10),d=parseInt(s(t,null,"width"),10);Modernizr.addTest("cssvminunit",l(f,d)||l(f,d-i))},3),z("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),r=parseInt(s(t,null,"width"),10);Modernizr.addTest("cssvwunit",r==n)});var T="Moz O ms Webkit",N=S._config.usePrefixes?T.split(" "):[];S._cssomPrefixes=N;var I=function(t){var r,i=prefixes.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var s=0;i>s;s++){var l=prefixes[s],a=l.toUpperCase()+"_"+r;if(a in o)return"@-"+l.toLowerCase()+"-"+t}return!1};S.atRule=I;var E=S._config.usePrefixes?T.toLowerCase().split(" "):[];S._domPrefixes=E;var P={elem:f("modernizr")};Modernizr._q.push(function(){delete P.elem});var j={style:P.elem.style};Modernizr._q.unshift(function(){delete j.style}),S.testAllProps=x,S.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),Modernizr.addTest("flexboxlegacy",y("boxDirection","reverse",!0)),Modernizr.addTest("flexboxtweener",y("flexAlign","end",!0)),Modernizr.addTest("flexwrap",y("flexWrap","wrap",!0));var W=S.prefixed=function(e,t,n){return 0===e.indexOf("@")?I(e):(-1!=e.indexOf("-")&&(e=a(e)),t?x(e,t,n):x(e,"pfx"))};Modernizr.addTest("objectfit",!!W("objectFit"),{aliases:["object-fit"]}),i(),o(w),delete S.addTest,delete S.addAsyncTest;for(var A=0;A<Modernizr._q.length;A++)Modernizr._q[A]();e.Modernizr=Modernizr}(window,document);