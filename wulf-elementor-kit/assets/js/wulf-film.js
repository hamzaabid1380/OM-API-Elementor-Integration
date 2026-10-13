/*! Wulf Elementor Kit: cinematic film (3D). Built from cinematic-home/src/wp.js; do not edit by hand.
 * Includes three.js 0.183.2 (MIT), postprocessing 6.39.5 (Zlib), three-mesh-bvh 0.9.16 (MIT),
 * and GSAP 3.15.0 with ScrollTrigger and SplitText (GSAP standard no-charge license, gsap.com/standard-license). */
(()=>{var IA=Object.defineProperty;var BA=(i,e)=>{for(var t in e)IA(i,t,{get:e[t],enumerable:!0})};function Gr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function x0(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}var wi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Pl={duration:.5,overwrite:!1,delay:0},np,kn,en,ji=1e8,Xt=1/ji,Yd=Math.PI*2,UA=Yd/4,LA=0,_0=Math.sqrt,FA=Math.cos,NA=Math.sin,wn=function(e){return typeof e=="string"},ln=function(e){return typeof e=="function"},Wr=function(e){return typeof e=="number"},Tu=function(e){return typeof e>"u"},wr=function(e){return typeof e=="object"},bi=function(e){return e!==!1},ip=function(){return typeof window<"u"},mu=function(e){return ln(e)||wn(e)},y0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Kn=Array.isArray,OA=/random\([^)]+\)/g,kA=/,\s*/g,u0=/(?:-?\.?\d|\.)+/gi,rp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ca=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,kd=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,sp=/[+-]=-?[.\d]+/,zA=/[^,'"\[\]\s]+/gi,HA=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,sn,Er,qd,ap,Li={},_u={},A0,S0=function(e){return(_u=ja(e,Li))&&Jn},Eu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Il=function(e,t){return!t&&console.warn(e)},M0=function(e,t){return e&&(Li[e]=t)&&_u&&(_u[e]=t)||Li},Bl=function(){return 0},GA={suppressEvents:!0,isStart:!0,kill:!1},gu={suppressEvents:!0,kill:!1},VA={suppressEvents:!0},op={},gs=[],Qd={},T0,Ti={},zd={},h0=30,vu=[],lp="",cp=function(e){var t=e[0],n,r;if(wr(t)||ln(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=vu.length;r--&&!vu[r].targetTest(t););n=vu[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new dp(e[r],n)))||e.splice(r,1);return e},vs=function(e){return e._gsap||cp($i(e))[0]._gsap},up=function(e,t,n){return(n=e[t])&&ln(n)?e[t]():Tu(n)&&e.getAttribute&&e.getAttribute(t)||n},oi=function(e,t){return(e=e.split(",")).forEach(t)||e},cn=function(e){return Math.round(e*1e5)/1e5||0},rn=function(e){return Math.round(e*1e7)/1e7||0},ua=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},WA=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},yu=function(){var e=gs.length,t=gs.slice(0),n,r;for(Qd={},gs.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},hp=function(e){return!!(e._initted||e._startAt||e.add)},E0=function(e,t,n,r){gs.length&&!kn&&yu(),e.render(t,n,r||!!(kn&&t<0&&hp(e))),gs.length&&!kn&&yu()},b0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(zA).length<2?t:wn(e)?e.trim():e},w0=function(e){return e},Fi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},XA=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},ja=function(e,t){for(var n in t)e[n]=t[n];return e},f0=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=wr(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Au=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Cl=function(e){var t=e.parent||sn,n=e.keyframes?XA(Kn(e.keyframes)):Fi;if(bi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},YA=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},C0=function(e,t,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var a=e[r],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},bu=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},xs=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},aa=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},qA=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Zd=function(e,t,n,r){return e._startAt&&(kn?e._startAt.revert(gu):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},QA=function i(e){return!e||e._ts&&i(e.parent)},d0=function(e){return e._repeat?$a(e._tTime,e=e.duration()+e._rDelay)*e:0},$a=function(e,t){var n=Math.floor(e=rn(e/t));return e&&n===e?n-1:n},Su=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},wu=function(e){return e._end=rn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Xt)||0))},Cu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=rn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),wu(e),n._dirty||aa(n,e)),e},R0=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Su(e.rawTime(),t),(!t._dur||Fl(0,t.totalDuration(),n)-t._tTime>Xt)&&t.render(n,!0)),aa(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Xt}},br=function(e,t,n,r){return t.parent&&xs(t),t._start=rn((Wr(n)?n:n||e!==sn?Ji(e,n,t):e._time)+t._delay),t._end=rn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),C0(e,t,"_first","_last",e._sort?"_start":0),Kd(t)||(e._recent=t),r||R0(e,t),e._ts<0&&Cu(e,e._tTime),e},D0=function(e,t){return(Li.ScrollTrigger||Eu("scrollTrigger",t))&&Li.ScrollTrigger.create(t,e)},P0=function(e,t,n,r,s){if(gp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!kn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&T0!==Ei.frame)return gs.push(e),e._lazy=[s,r],1},ZA=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},Kd=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},KA=function(e,t,n,r){var s=e.ratio,a=t<0||!t&&(!e._start&&ZA(e)&&!(!e._initted&&Kd(e))||(e._ts<0||e._dp._ts<0)&&!Kd(e))?0:1,o=e._rDelay,l=0,c,u,f;if(o&&e._repeat&&(l=Fl(0,e._tDur,t),u=$a(l,o),e._yoyo&&u&1&&(a=1-a),u!==$a(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||kn||r||e._zTime===Xt||!t&&e._zTime){if(!e._initted&&P0(e,t,r,n,l))return;for(f=e._zTime,e._zTime=t||(n?Xt:0),n||(n=t&&!f),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Zd(e,t,n,!0),e._onUpdate&&!n&&Ui(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Ui(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&xs(e,1),!n&&!kn&&(Ui(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},JA=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},eo=function(e,t,n,r){var s=e._repeat,a=rn(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:rn(a*(s+1)+e._rDelay*s):a,o>0&&!r&&Cu(e,e._tTime=e._tDur*o),e.parent&&wu(e),n||aa(e.parent,e),e},p0=function(e){return e instanceof Zn?aa(e):eo(e,e._dur)},jA={_start:0,endTime:Bl,totalDuration:Bl},Ji=function i(e,t,n){var r=e.labels,s=e._recent||jA,a=e.duration()>=ji?s.endTime(!1):e._dur,o,l,c;return wn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in r||(r[t]=a),r[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(Kn(n)?n[0]:n).totalDuration()),o>1?i(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Rl=function(e,t,n){var r=Wr(t[1]),s=(r?2:1)+(e<2?0:1),a=t[s],o,l;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=bi(l.vars.inherit)&&l.parent;a.immediateRender=bi(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new pn(t[0],a,t[s+1])},_s=function(e,t){return e||e===0?t(e):t},Fl=function(e,t,n){return n<e?e:n>t?t:n},zn=function(e,t){return!wn(e)||!(t=HA.exec(e))?"":t[1]},$A=function(e,t,n){return _s(n,function(r){return Fl(e,t,r)})},Jd=[].slice,I0=function(e,t){return e&&wr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&wr(e[0]))&&!e.nodeType&&e!==Er},eS=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return wn(r)&&!t||I0(r,1)?(s=n).push.apply(s,$i(r)):n.push(r)})||n},$i=function(e,t,n){return en&&!t&&en.selector?en.selector(e):wn(e)&&!n&&(qd||!to())?Jd.call((t||ap).querySelectorAll(e),0):Kn(e)?eS(e,n):I0(e)?Jd.call(e,0):e?[e]:[]},jd=function(e){return e=$i(e)[0]||Il("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return $i(t,n.querySelectorAll?n:n===e?Il("Invalid scope")||ap.createElement("div"):e)}},B0=function(e){return e.sort(function(){return .5-Math.random()})},U0=function(e){if(ln(e))return e;var t=wr(e)?e:{each:e},n=oa(t.ease),r=t.from||0,s=parseFloat(t.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=t.axis,u=r,f=r;return wn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],f=r[1]),function(h,d,g){var v=(g||t).length,p=a[v],m,x,A,_,M,E,T,y,S;if(!p){if(S=t.grid==="auto"?0:(t.grid||[1,ji])[1],!S){for(T=-ji;T<(T=g[S++].getBoundingClientRect().left)&&S<v;);S<v&&S--}for(p=a[v]=[],m=l?Math.min(S,v)*u-.5:r%S,x=S===ji?0:l?v*f/S-.5:r/S|0,T=0,y=ji,E=0;E<v;E++)A=E%S-m,_=x-(E/S|0),p[E]=M=c?Math.abs(c==="y"?_:A):_0(A*A+_*_),M>T&&(T=M),M<y&&(y=M);r==="random"&&B0(p),p.max=T-y,p.min=y,p.v=v=(parseFloat(t.amount)||parseFloat(t.each)*(S>v?v-1:c?c==="y"?v/S:S:Math.max(S,v/S))||0)*(r==="edges"?-1:1),p.b=v<0?s-v:s,p.u=zn(t.amount||t.each)||0,n=n&&v<0?dS(n):n}return v=(p[h]-p.min)/p.max||0,rn(p.b+(n?n(v):v)*p.v)+p.u}},$d=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=rn(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Wr(n)?0:zn(n))}},L0=function(e,t){var n=Kn(e),r,s;return!n&&wr(e)&&(r=n=e.radius||ji,e.values?(e=$i(e.values),(s=!Wr(e[0]))&&(r*=r)):e=$d(e.increment)),_s(t,n?ln(e)?function(a){return s=e(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=ji,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-o,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-o),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:a,s||u===a||Wr(a)?u:u+zn(a)}:$d(e))},F0=function(e,t,n,r){return _s(Kn(e)?!t:n===!0?!!(n=0):!r,function(){return Kn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},tS=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,a){return a(s)},r)}},nS=function(e,t){return function(n){return e(parseFloat(n))+(t||zn(n))}},iS=function(e,t,n){return O0(e,t,0,1,n)},N0=function(e,t,n){return _s(n,function(r){return e[~~t(r)]})},rS=function i(e,t,n){var r=t-e;return Kn(e)?N0(e,i(0,e.length),t):_s(n,function(s){return(r+(s-e)%r)%r+e})},sS=function i(e,t,n){var r=t-e,s=r*2;return Kn(e)?N0(e,i(0,e.length-1),t):_s(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>r?s-a:a)})},no=function(e){return e.replace(OA,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(kA);return F0(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},O0=function(e,t,n,r,s){var a=t-e,o=r-n;return _s(s,function(l){return n+((l-e)/a*o||0)})},aS=function i(e,t,n,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=wn(e),o={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),a)e={p:e},t={p:t};else if(Kn(e)&&!Kn(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(g){g*=f;var v=Math.min(h,~~g);return u[v](g-v)},n=t}else r||(e=ja(Kn(e)?[]:{},e));if(!u){for(l in t)pp.call(o,e,l,"get",t[l]);s=function(g){return _p(g,o)||(a?e.p:e)}}}return _s(n,s)},m0=function(e,t,n){var r=e.labels,s=ji,a,o,l;for(a in r)o=r[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Ui=function(e,t,n){var r=e.vars,s=r[t],a=en,o=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&gs.length&&yu(),o&&(en=o),u=l?s.apply(c,l):s.call(c),en=a,u},bl=function(e){return xs(e),e.scrollTrigger&&e.scrollTrigger.kill(!!kn),e.progress()<1&&Ui(e,"onInterrupt"),e},Ja,k0=[],z0=function(e){if(e)if(e=!e.name&&e.default||e,ip()||e.headless){var t=e.name,n=ln(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Bl,render:_p,add:pp,kill:MS,modifier:SS,rawVars:0},a={targetTest:0,get:0,getSetter:Ru,aliases:{},register:0};if(to(),e!==r){if(Ti[t])return;Fi(r,Fi(Au(e,s),a)),ja(r.prototype,ja(s,Au(e,a))),Ti[r.prop=t]=r,e.targetTest&&(vu.push(r),op[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}M0(t,r),e.register&&e.register(Jn,r,li)}else k0.push(e)},Wt=255,wl={aqua:[0,Wt,Wt],lime:[0,Wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Wt],navy:[0,0,128],white:[Wt,Wt,Wt],olive:[128,128,0],yellow:[Wt,Wt,0],orange:[Wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Wt,0,0],pink:[Wt,192,203],cyan:[0,Wt,Wt],transparent:[Wt,Wt,Wt,0]},Hd=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Wt+.5|0},H0=function(e,t,n){var r=e?Wr(e)?[e>>16,e>>8&Wt,e&Wt]:0:wl.black,s,a,o,l,c,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),wl[e])r=wl[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Wt,r&Wt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Wt,e&Wt]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(u0),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=Hd(l+1/3,s,a),r[1]=Hd(l,s,a),r[2]=Hd(l-1/3,s,a);else if(~e.indexOf("="))return r=e.match(rp),n&&r.length<4&&(r[3]=1),r}else r=e.match(u0)||wl.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/Wt,a=r[1]/Wt,o=r[2]/Wt,f=Math.max(s,a,o),h=Math.min(s,a,o),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(a-o)/d+(a<o?6:0):f===a?(o-s)/d+2:(s-a)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},G0=function(e){var t=[],n=[],r=-1;return e.split(Vr).forEach(function(s){var a=s.match(ca)||[];t.push.apply(t,a),n.push(r+=a.length+1)}),t.c=n,t},g0=function(e,t,n){var r="",s=(e+r).match(Vr),a=t?"hsla(":"rgba(",o=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=H0(h,t,1))&&a+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=G0(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(Vr,"1").split(ca),f=c.length-1;o<f;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Vr),f=c.length-1;o<f;o++)r+=c[o]+s[o];return r+c[f]},Vr=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in wl)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),oS=/hsl[a]?\(/,fp=function(e){var t=e.join(" "),n;if(Vr.lastIndex=0,Vr.test(t))return n=oS.test(t),e[1]=g0(e[1],n),e[0]=g0(e[0],n,G0(e[1])),!0},Ul,Ei=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,f,h,d,g=function v(p){var m=i()-r,x=p===!0,A,_,M,E;if((m>e||m<0)&&(n+=m-t),r+=m,M=r-n,A=M-a,(A>0||x)&&(E=++f.frame,h=M-f.time*1e3,f.time=M=M/1e3,a+=A+(A>=s?4:s-A),_=1),x||(l=c(v)),_)for(d=0;d<o.length;d++)o[d](M,h,E,p)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return h/(1e3/(p||60))},wake:function(){A0&&(!qd&&ip()&&(Er=qd=window,ap=Er.document||{},Li.gsap=Jn,(Er.gsapVersions||(Er.gsapVersions=[])).push(Jn.version),S0(_u||Er.GreenSockGlobals||!Er.gsap&&Er||{}),k0.forEach(z0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(p){return setTimeout(p,a-f.time*1e3+1|0)},Ul=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Ul=0,c=Bl},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),a=f.time*1e3+s},add:function(p,m,x){var A=m?function(_,M,E,T){p(_,M,E,T),f.remove(A)}:p;return f.remove(p),o[x?"unshift":"push"](A),to(),A},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},f}(),to=function(){return!Ul&&Ei.wake()},yt={},lS=/^[\d.\-M][\d.\-,\s]/,cS=/["']/g,uS=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[r]=isNaN(c)?c.replace(cS,"").trim():+c,r=l.substr(o+1).trim();return t},hS=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},fS=function(e){var t=(e+"").split("("),n=yt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[uS(t[1])]:hS(e).split(",").map(b0)):yt._CE&&lS.test(e)?yt._CE("",e):n},dS=function(e){return function(t){return 1-e(1-t)}},oa=function(e,t){return e&&(ln(e)?e:yt[e]||fS(e))||t},ha=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},a;return oi(e,function(o){yt[o]=Li[o]=s,yt[a=o.toLowerCase()]=n;for(var l in s)yt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=yt[o+"."+l]=s[l]}),s},V0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Gd=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Yd*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*NA((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:V0(o);return s=Yd/s,l.config=function(c,u){return i(e,c,u)},l},Vd=function i(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:V0(n);return r.config=function(s){return i(e,s)},r};oi("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;ha(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});yt.Linear.easeNone=yt.none=yt.Linear.easeIn;ha("Elastic",Gd("in"),Gd("out"),Gd());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(o){return o<t?i*o*o:o<n?i*Math.pow(o-1.5/e,2)+.75:o<r?i*(o-=2.25/e)*o+.9375:i*Math.pow(o-2.625/e,2)+.984375};ha("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);ha("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});ha("Circ",function(i){return-(_0(1-i*i)-1)});ha("Sine",function(i){return i===1?1:-FA(i*UA)+1});ha("Back",Vd("in"),Vd("out"),Vd());yt.SteppedEase=yt.steps=Li.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,a=1-Xt;return function(o){return((r*Fl(0,a,o)|0)+s)*n}}};Pl.ease=yt["quad.out"];oi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return lp+=i+","+i+"Params,"});var dp=function(e,t){this.id=LA++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:up,this.set=t?t.getSetter:Ru},Ll=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,eo(this,+t.duration,1,1),this.data=t.data,en&&(this._ctx=en,en.data.push(this)),Ul||Ei.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,eo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(to(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Cu(this,n),!s._dp||s.parent||R0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&br(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Xt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),E0(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+d0(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+d0(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?$a(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Xt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Su(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Xt?0:this._rts,this.totalTime(Fl(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),wu(this),qA(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(to(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Xt&&(this._tTime-=Xt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=rn(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&br(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(bi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Su(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=VA);var r=kn;return kn=n,hp(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),kn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,p0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,p0(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(Ji(this,n),bi(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,bi(r)),this._dur||(this._zTime=-Xt),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Xt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Xt,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Xt)},e.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(a){var o=ln(n)?n:w0,l=function(){var u=r.then;r.then=null,s&&s(),ln(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=u),a(o),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){bl(this)},i}();Fi(Ll.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Xt,_prom:0,_ps:!1,_rts:1});var Zn=function(i){x0(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=bi(n.sortChildren),sn&&br(n.parent||sn,Gr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&D0(Gr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,a){return Rl(0,arguments,this),this},t.from=function(r,s,a){return Rl(1,arguments,this),this},t.fromTo=function(r,s,a,o){return Rl(2,arguments,this),this},t.set=function(r,s,a){return s.duration=0,s.parent=this,Cl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new pn(r,s,Ji(this,a),1),this},t.call=function(r,s,a){return br(this,pn.delayedCall(0,r,s),a)},t.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new pn(r,a,Ji(this,l)),this},t.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,Cl(a).immediateRender=bi(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},t.staggerFromTo=function(r,s,a,o,l,c,u,f){return o.startAt=a,Cl(o).immediateRender=bi(o.immediateRender),this.staggerTo(r,s,o,l,c,u,f)},t.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:rn(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,v,p,m,x,A,_,M,E,T;if(this!==sn&&u>l&&r>=0&&(u=l),u!==this._tTime||a||f){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),h=u,_=this._start,A=this._ts,m=!A,f&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(E=this._yoyo,p=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(p*100+r,s,a);if(h=rn(u%p),u===l?(v=this._repeat,h=c):(M=rn(u/p),v=~~M,v&&v===M&&(h=c,v--),h>c&&(h=c)),M=$a(this._tTime,p),!o&&this._tTime&&M!==v&&this._tTime-M*p-this._dur<=0&&(M=v),E&&v&1&&(h=c-h,T=1),v!==M&&!this._lock){var y=E&&M&1,S=y===(E&&v&1);if(v<M&&(y=!y),o=y?0:u%c?c:u,this._lock=1,this.render(o||(T?0:rn(v*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Ui(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,M=v),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,o=y?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=JA(this,rn(o),rn(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!!A,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&u&&c&&!s&&!M&&(Ui(this,"onStart"),this._tTime!==u))return this;if(h>=o&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,a),h!==this._time||!this._ts&&!m){x=0,g&&(u+=this._zTime=-Xt);break}}d=g}else{d=this._last;for(var C=r<0?r:h;d;){if(g=d._prev,(d._act||C<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,s,a||kn&&hp(d)),h!==this._time||!this._ts&&!m){x=0,g&&(u+=this._zTime=C?-Xt:Xt);break}}d=g}}if(x&&!s&&(this.pause(),x.render(h>=o?0:-Xt)._zTime=h>=o?1:-1,this._ts))return this._start=_,wu(this),this.render(r,s,a);this._onUpdate&&!s&&Ui(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(_===this._start||Math.abs(A)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&xs(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(Ui(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var a=this;if(Wr(s)||(s=Ji(this,s,r)),!(r instanceof Ll)){if(Kn(r))return r.forEach(function(o){return a.add(o,s)}),this;if(wn(r))return this.addLabel(r,s);if(ln(r))r=pn.delayedCall(0,r);else return this}return this!==r?br(this,r,s):this},t.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-ji);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof pn?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},t.remove=function(r){return wn(r)?this.removeLabel(r):ln(r)?this.killTweensOf(r):(r.parent===this&&bu(this,r),r===this._recent&&(this._recent=this._last),aa(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=rn(Ei.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Ji(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,a){var o=pn.delayedCall(0,s||Bl,a);return o.data="isPause",this._hasPause=1,br(this,o,Ji(this,r))},t.removePause=function(r){var s=this._first;for(r=Ji(this,r);s;)s._start===r&&s.data==="isPause"&&xs(s),s=s._next},t.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)ms!==o[l]&&o[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var a=[],o=$i(r),l=this._first,c=Wr(s),u;l;)l instanceof pn?WA(l._targets,o)&&(c?(!ms||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(r,s){s=s||{};var a=this,o=Ji(a,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=pn.to(a,Fi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Xt,onStart:function(){if(a.pause(),!d){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==p&&eo(g,p,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(r,s,a){return this.tweenTo(s,Fi({startAt:{time:Ji(this,r)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),m0(this,Ji(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),m0(this,Ji(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Xt)},t.shiftChildren=function(r,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(r=rn(r);o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return aa(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),aa(this)},t.totalDuration=function(r){var s=0,a=this,o=a._last,l=ji,c,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,br(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=rn(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;eo(a,a===sn&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(r){if(sn._ts&&(E0(sn,Su(r,sn)),T0=Ei.frame),Ei.frame>=h0){h0+=wi.autoSleep||120;var s=sn._first;if((!s||!s._ts)&&wi.autoSleep&&Ei._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Ei.sleep()}}},e}(Ll);Fi(Zn.prototype,{_lock:0,_hasPause:0,_forcing:0});var pS=function(e,t,n,r,s,a,o){var l=new li(this._pt,e,t,0,1,xp,null,s),c=0,u=0,f,h,d,g,v,p,m,x;for(l.b=n,l.e=r,n+="",r+="",(m=~r.indexOf("random("))&&(r=no(r)),a&&(x=[n,r],a(x,e,t),n=x[0],r=x[1]),h=n.match(kd)||[];f=kd.exec(r);)g=f[0],v=r.substring(c,f.index),d?d=(d+1)%5:v.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(p=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:v||u===1?v:",",s:p,c:g.charAt(1)==="="?ua(p,g)-p:parseFloat(g)-p,m:d&&d<4?Math.round:0},c=kd.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(sp.test(r)||m)&&(l.e=0),this._pt=l,l},pp=function(e,t,n,r,s,a,o,l,c,u){ln(r)&&(r=r(s||0,e,a));var f=e[t],h=n!=="get"?n:ln(f)?c?e[t.indexOf("set")||!ln(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=ln(f)?c?_S:Y0:vp,g;if(wn(r)&&(~r.indexOf("random(")&&(r=no(r)),r.charAt(1)==="="&&(g=ua(h,r)+(zn(h)||0),(g||g===0)&&(r=g))),!u||h!==r||ep)return!isNaN(h*r)&&r!==""?(g=new li(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?AS:q0,0,d),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!f&&!(t in e)&&Eu(t,r),pS.call(this,e,t,h,r,d,l||wi.stringFilter,c))},mS=function(e,t,n,r,s){if(ln(e)&&(e=Dl(e,s,t,n,r)),!wr(e)||e.style&&e.nodeType||Kn(e)||y0(e))return wn(e)?Dl(e,s,t,n,r):e;var a={},o;for(o in e)a[o]=Dl(e[o],s,t,n,r);return a},mp=function(e,t,n,r,s,a){var o,l,c,u;if(Ti[e]&&(o=new Ti[e]).init(s,o.rawVars?t[e]:mS(t[e],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new li(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==Ja))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},ms,ep,gp=function i(e,t,n){var r=e.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,v=e._startAt,p=e._targets,m=e.parent,x=m&&m.data==="nested"?m.vars.targets:p,A=e._overwrite==="auto"&&!np,_=e.timeline,M=r.easeReverse||f,E,T,y,S,C,R,w,I,P,F,N,O,K;if(_&&(!h||!s)&&(s="none"),e._ease=oa(s,Pl.ease),e._rEase=M&&(oa(M)||e._ease),e._from=!_&&!!r.runBackwards,e._from&&(e.ratio=1),!_||h&&!r.stagger){if(I=p[0]?vs(p[0]).harness:0,O=I&&r[I.prop],E=Au(r,op),v&&(v._zTime<0&&v.progress(1),t<0&&u&&o&&!d?v.render(-1,!0):v.revert(u&&g?gu:GA),v._lazy=0),a){if(xs(e._startAt=pn.set(p,Fi({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!v&&bi(l),startAt:null,delay:0,onUpdate:c&&function(){return Ui(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(kn||!o&&!d)&&e._startAt.revert(gu),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!v){if(t&&(o=!1),y=Fi({overwrite:!1,data:"isFromStart",lazy:o&&!v&&bi(l),immediateRender:o,stagger:0,parent:m},E),O&&(y[I.prop]=O),xs(e._startAt=pn.set(p,y)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(kn?e._startAt.revert(gu):e._startAt.render(-1,!0)),e._zTime=t,!o)i(e._startAt,Xt,Xt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&bi(l)||l&&!g,T=0;T<p.length;T++){if(C=p[T],w=C._gsap||cp(p)[T]._gsap,e._ptLookup[T]=F={},Qd[w.id]&&gs.length&&yu(),N=x===p?T:x.indexOf(C),I&&(P=new I).init(C,O||E,e,N,x)!==!1&&(e._pt=S=new li(e._pt,C,P.name,0,1,P.render,P,0,P.priority),P._props.forEach(function(X){F[X]=S}),P.priority&&(R=1)),!I||O)for(y in E)Ti[y]&&(P=mp(y,E,e,N,C,x))?P.priority&&(R=1):F[y]=S=pp.call(e,C,y,"get",E[y],N,x,0,r.stringFilter);e._op&&e._op[T]&&e.kill(C,e._op[T]),A&&e._pt&&(ms=e,sn.killTweensOf(C,F,e.globalTime(t)),K=!e.parent,ms=0),e._pt&&l&&(Qd[w.id]=1)}R&&yp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!K,h&&t<=0&&_.render(ji,!0,!0)},gS=function(e,t,n,r,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return ep=1,e.vars[t]="+=0",gp(e,o),ep=0,l?Il(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,f.e&&(f.e=cn(n)+zn(f.e)),f.b&&(f.b=u.s+zn(f.b))},vS=function(e,t){var n=e[0]?vs(e[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return t;s=ja({},t);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},xS=function(e,t,n,r){var s=t.ease||r||"power1.inOut",a,o;if(Kn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},Dl=function(e,t,n,r,s){return ln(e)?e.call(t,n,r,s):wn(e)&&~e.indexOf("random(")?no(e):e},W0=lp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",X0={};oi(W0+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return X0[i]=1});var pn=function(i){x0(e,i);function e(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:Cl(r))||this;var l=o.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,v=l.defaults,p=l.scrollTrigger,m=r.parent||sn,x=(Kn(n)||y0(n)?Wr(n[0]):"length"in r)?[n]:$i(n),A,_,M,E,T,y,S,C;if(o._targets=x.length?cp(x):Il("GSAP target "+n+" not found. https://gsap.com",!wi.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||h||mu(c)||mu(u)){r=o.vars;var R=r.easeReverse||r.yoyoEase;if(A=o.timeline=new Zn({data:"nested",defaults:v||{},targets:m&&m.data==="nested"?m.vars.targets:x}),A.kill(),A.parent=A._dp=Gr(o),A._start=0,h||mu(c)||mu(u)){if(E=x.length,S=h&&U0(h),wr(h))for(T in h)~W0.indexOf(T)&&(C||(C={}),C[T]=h[T]);for(_=0;_<E;_++)M=Au(r,X0),M.stagger=0,R&&(M.easeReverse=R),C&&ja(M,C),y=x[_],M.duration=+Dl(c,Gr(o),_,y,x),M.delay=(+Dl(u,Gr(o),_,y,x)||0)-o._delay,!h&&E===1&&M.delay&&(o._delay=u=M.delay,o._start+=u,M.delay=0),A.to(y,M,S?S(_,y,x):0),A._ease=yt.none;A.duration()?c=u=0:o.timeline=0}else if(g){Cl(Fi(A.vars.defaults,{ease:"none"})),A._ease=oa(g.ease||r.ease||"none");var w=0,I,P,F;if(Kn(g))g.forEach(function(N){return A.to(x,N,">")}),A.duration();else{M={};for(T in g)T==="ease"||T==="easeEach"||xS(T,g[T],M,g.easeEach);for(T in M)for(I=M[T].sort(function(N,O){return N.t-O.t}),w=0,_=0;_<I.length;_++)P=I[_],F={ease:P.e,duration:(P.t-(_?I[_-1].t:0))/100*c},F[T]=P.v,A.to(x,F,w),w+=F.duration;A.duration()<c&&A.to({},{duration:c-A.duration()})}}c||o.duration(c=A.duration())}else o.timeline=0;return d===!0&&!np&&(ms=Gr(o),sn.killTweensOf(x),ms=0),br(m,Gr(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(f||!c&&!g&&o._start===rn(m._time)&&bi(f)&&QA(Gr(o))&&m.data!=="nested")&&(o._tTime=-Xt,o.render(Math.max(0,-u)||0)),p&&D0(Gr(o),p),o}var t=e.prototype;return t.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Xt&&!u?l:r<Xt?0:r,h,d,g,v,p,m,x,A;if(!c)KA(this,r,s,a);else if(f!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,A=this.timeline,this._repeat){if(v=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(v*100+r,s,a);if(h=rn(f%v),f===l?(g=this._repeat,h=c):(p=rn(f/v),g=~~p,g&&g===p?(h=c,g--):h>c&&(h=c)),m=this._yoyo&&g&1,m&&(h=c-h),p=$a(this._tTime,v),h===o&&!a&&this._initted&&g===p)return this._tTime=f,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&h!==v&&this._initted&&(this._lock=a=1,this.render(rn(v*g),!0).invalidate()._lock=0)}if(!this._initted){if(P0(this,u?r:h,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._rEase){var _=h<o;if(_!==this._inv){var M=_?o:c-o;this._inv=_,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=M?(_?-1:1)/M:0,this._invScale=_?-this.ratio:1-this.ratio,this._invEase=_?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(h/c);if(this._from&&(this.ratio=x=1-x),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!s&&!p&&(Ui(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;A&&A.render(r<0?r:A._dur*A._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Zd(this,r,s,a),Ui(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&Ui(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&Zd(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&xs(this,1),!s&&!(u&&!o)&&(f||o||m)&&(Ui(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,a,o,l){Ul||Ei.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||gp(this,c),u=this._ease(c/this._dur),gS(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(Cu(this,0),this.parent||C0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?bl(this):this.scrollTrigger&&this.scrollTrigger.kill(!!kn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,ms&&ms.vars.overwrite!==!0)._first||bl(this),this.parent&&a!==this.timeline.totalDuration()&&eo(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?$i(r):o,c=this._ptLookup,u=this._pt,f,h,d,g,v,p,m;if((!s||s==="all")&&YA(o,l))return s==="all"&&(this._pt=0),bl(this);for(f=this._op=this._op||[],s!=="all"&&(wn(s)&&(v={},oi(s,function(x){return v[x]=1}),s=v),s=vS(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){h=c[m],s==="all"?(f[m]=s,g=h,d={}):(d=f[m]=f[m]||{},g=s);for(v in g)p=h&&h[v],p&&((!("kill"in p.d)||p.d.kill(v)===!0)&&bu(this,p,"_pt"),delete h[v]),d!=="all"&&(d[v]=1)}return this._initted&&!this._pt&&u&&bl(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Rl(1,arguments)},e.delayedCall=function(r,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(r,s,a){return Rl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,a){return sn.killTweensOf(r,s,a)},e}(Ll);Fi(pn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});oi("staggerTo,staggerFrom,staggerFromTo",function(i){pn[i]=function(){var e=new Zn,t=Jd.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var vp=function(e,t,n){return e[t]=n},Y0=function(e,t,n){return e[t](n)},_S=function(e,t,n,r){return e[t](r.fp,n)},yS=function(e,t,n){return e.setAttribute(t,n)},Ru=function(e,t){return ln(e[t])?Y0:Tu(e[t])&&e.setAttribute?yS:vp},q0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},AS=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},xp=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},_p=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},SS=function(e,t,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(e,t,n),s=a},MS=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?bu(this,t,"_pt"):t.dep||(n=1),t=r;return!n},TS=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},yp=function(e){for(var t=e._pt,n,r,s,a;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=s},li=function(){function i(t,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||q0,this.d=l||this,this.set=c||vp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=TS,this.m=n,this.mt=s,this.tween=r},i}();oi(lp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return op[i]=1});Li.TweenMax=Li.TweenLite=pn;Li.TimelineLite=Li.TimelineMax=Zn;sn=new Zn({sortChildren:!1,defaults:Pl,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});wi.stringFilter=fp;var la=[],xu={},ES=[],v0=0,bS=0,Wd=function(e){return(xu[e]||ES).map(function(t){return t()})},tp=function(){var e=Date.now(),t=[];e-v0>2&&(Wd("matchMediaInit"),la.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=Er.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Wd("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),v0=e,Wd("matchMedia"))},Q0=function(){function i(t,n){this.selector=n&&jd(n),this.data=[],this._r=[],this.isReverted=!1,this.id=bS++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){ln(n)&&(s=r,r=n,n=ln);var a=this,o=function(){var c=en,u=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=jd(s)),en=a,f=r.apply(a,arguments),ln(f)&&a._r.push(f),en=c,a.selector=u,a.isReverted=!1,f};return a.last=o,n===ln?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var r=en;en=null,n(this),en=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof pn&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Zn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof pn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=la.length;a--;)la[a].id===this.id&&la.splice(a,1)},e.revert=function(n){this.kill(n||{})},i}(),wS=function(){function i(t){this.contexts=[],this.scope=t,en&&en.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){wr(n)||(n={matches:n});var a=new Q0(0,s||this.scope),o=a.conditions={},l,c,u;en&&!a.selector&&(a.selector=en.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=Er.matchMedia(n[c]),l&&(la.indexOf(a)<0&&la.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(tp):l.addEventListener("change",tp)));return u&&r(a,function(f){return a.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),Mu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return z0(r)})},timeline:function(e){return new Zn(e)},getTweensOf:function(e,t){return sn.getTweensOf(e,t)},getProperty:function(e,t,n,r){wn(e)&&(e=$i(e)[0]);var s=vs(e||{}).get,a=n?w0:b0;return n==="native"&&(n=""),e&&(t?a((Ti[t]&&Ti[t].get||s)(e,t,n,r)):function(o,l,c){return a((Ti[o]&&Ti[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=$i(e),e.length>1){var r=e.map(function(u){return Jn.quickSetter(u,t,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var a=Ti[t],o=vs(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var f=new a;Ja._pt=0,f.init(e,n?u+n:u,Ja,0,[e]),f.render(1,f),Ja._pt&&_p(1,Ja)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var r,s=Jn.to(e,Fi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return sn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=oa(e.ease,Pl.ease)),f0(Pl,e||{})},config:function(e){return f0(wi,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,a=e.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!Ti[o]&&!Li[o]&&Il(t+" effect requires "+o+" plugin.")}),zd[t]=function(o,l,c){return n($i(o),Fi(l||{},s),c)},a&&(Zn.prototype[t]=function(o,l,c){return this.add(zd[t](o,wr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){yt[e]=oa(t)},parseEase:function(e,t){return arguments.length?oa(e,t):yt},getById:function(e){return sn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Zn(e),r,s;for(n.smoothChildTiming=bi(e.smoothChildTiming),sn.remove(n),n._dp=0,n._time=n._tTime=sn._time,r=sn._first;r;)s=r._next,(t||!(!r._dur&&r instanceof pn&&r.vars.onComplete===r._targets[0]))&&br(n,r,r._start-r._delay),r=s;return br(sn,n,0),n},context:function(e,t){return e?new Q0(e,t):en},matchMedia:function(e){return new wS(e)},matchMediaRefresh:function(){return la.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||tp()},addEventListener:function(e,t){var n=xu[e]||(xu[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=xu[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:rS,wrapYoyo:sS,distribute:U0,random:F0,snap:L0,normalize:iS,getUnit:zn,clamp:$A,splitColor:H0,toArray:$i,selector:jd,mapRange:O0,pipe:tS,unitize:nS,interpolate:aS,shuffle:B0},install:S0,effects:zd,ticker:Ei,updateRoot:Zn.updateRoot,plugins:Ti,globalTimeline:sn,core:{PropTween:li,globals:M0,Tween:pn,Timeline:Zn,Animation:Ll,getCache:vs,_removeLinkedListItem:bu,reverting:function(){return kn},context:function(e){return e&&en&&(en.data.push(e),e._ctx=en),en},suppressOverwrites:function(e){return np=e}}};oi("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Mu[i]=pn[i]});Ei.add(Zn.updateRoot);Ja=Mu.to({},{duration:0});var CS=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},RS=function(e,t){var n=e._targets,r,s,a;for(r in t)for(s=n.length;s--;)a=e._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=CS(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[s],r))},Xd=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(wn(s)&&(l={},oi(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}RS(o,s)}}}},Jn=Mu.registerPlugin({name:"attr",init:function(e,t,n,r,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)kn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Xd("roundProps",$d),Xd("modifiers"),Xd("snap",L0))||Mu;pn.version=Zn.version=Jn.version="3.15.0";A0=1;ip()&&to();var DS=yt.Power0,PS=yt.Power1,IS=yt.Power2,BS=yt.Power3,US=yt.Power4,LS=yt.Linear,FS=yt.Quad,NS=yt.Cubic,OS=yt.Quart,kS=yt.Quint,zS=yt.Strong,HS=yt.Elastic,GS=yt.Back,VS=yt.SteppedEase,WS=yt.Bounce,XS=yt.Sine,YS=yt.Expo,qS=yt.Circ;var Z0,ys,ro,bp,ma,QS,K0,wp,ZS=function(){return typeof window<"u"},Yr={},pa=180/Math.PI,so=Math.PI/180,io=Math.atan2,J0=1e8,Cp=/([A-Z])/g,KS=/(left|right|width|margin|padding|x)/i,JS=/[\s,\(]\S/,Cr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Sp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},jS=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},$S=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},e1=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},t1=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},sv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},av=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},n1=function(e,t,n){return e.style[t]=n},i1=function(e,t,n){return e.style.setProperty(t,n)},r1=function(e,t,n){return e._gsap[t]=n},s1=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},a1=function(e,t,n,r,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},o1=function(e,t,n,r,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},an="transform",Ci=an+"Origin",l1=function i(e,t){var n=this,r=this.target,s=r.style,a=r._gsap;if(e in Yr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Cr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Xr(r,o)}):this.tfm[e]=a.x?a[e]:Xr(r,e),e===Ci&&(this.tfm.zOrigin=a.zOrigin);else return Cr.transform.split(",").forEach(function(o){return i.call(n,o,t)});if(this.props.indexOf(an)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ci,t,"")),e=an}(s||t)&&this.props.push(e,t,s[e])},ov=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},c1=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Cp,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=wp(),(!s||!s.isStart)&&!n[an]&&(ov(n),r.zOrigin&&n[Ci]&&(n[Ci]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},lv=function(e,t){var n={target:e,props:[],revert:c1,save:l1};return e._gsap||Jn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},cv,Mp=function(e,t){var n=ys.createElementNS?ys.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ys.createElement(e);return n&&n.style?n:ys.createElement(e)},Ni=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Cp,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,ao(t)||t,1)||""},j0="O,Moz,ms,Ms,Webkit".split(","),ao=function(e,t,n){var r=t||ma,s=r.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(j0[a]+e in s););return a<0?null:(a===3?"ms":a>=0?j0[a]:"")+e},Tp=function(){ZS()&&window.document&&(Z0=window,ys=Z0.document,ro=ys.documentElement,ma=Mp("div")||{style:{}},QS=Mp("div"),an=ao(an),Ci=an+"Origin",ma.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",cv=!!ao("perspective"),wp=Jn.core.reverting,bp=1)},$0=function(e){var t=e.ownerSVGElement,n=Mp("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),ro.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),ro.removeChild(n),s},ev=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},uv=function(e){var t,n;try{t=e.getBBox()}catch{t=$0(e),n=1}return t&&(t.width||t.height)||n||(t=$0(e)),t&&!t.width&&!t.x&&!t.y?{x:+ev(e,["x","cx","x1"])||0,y:+ev(e,["y","cy","y1"])||0,width:0,height:0}:t},hv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&uv(e))},Ss=function(e,t){if(t){var n=e.style,r;t in Yr&&t!==Ci&&(t=an),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(Cp,"-$1").toLowerCase())):n.removeAttribute(t)}},As=function(e,t,n,r,s,a){var o=new li(e._pt,t,n,0,1,a?av:sv);return e._pt=o,o.b=r,o.e=s,e._props.push(n),o},tv={deg:1,rad:1,turn:1},u1={grid:1,flex:1},Ms=function i(e,t,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=ma.style,l=KS.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,v,p,m;if(r===a||!s||tv[r]||tv[a])return s;if(a!=="px"&&!h&&(s=i(e,t,n,"px")),m=e.getCTM&&hv(e),(d||a==="%")&&(Yr[t]||~t.indexOf("adius")))return g=m?e.getBBox()[l?"width":"height"]:e[u],cn(d?s/g*f:s/100*g);if(o[l?"width":"height"]=f+(h?a:r),v=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===ys||!v.appendChild)&&(v=ys.body),p=v._gsap,p&&d&&p.width&&l&&p.time===Ei.time&&!p.uncache)return cn(s/p.width*f);if(d&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=f+r,g=e[u],x?e.style[t]=x:Ss(e,t)}else(d||a==="%")&&!u1[Ni(v,"display")]&&(o.position=Ni(e,"position")),v===e&&(o.position="static"),v.appendChild(ma),g=ma[u],v.removeChild(ma),o.position="absolute";return l&&d&&(p=vs(v),p.time=Ei.time,p.width=v[u]),cn(h?g*s/f:g&&s?f/g*s:0)},Xr=function(e,t,n,r){var s;return bp||Tp(),t in Cr&&t!=="transform"&&(t=Cr[t],~t.indexOf(",")&&(t=t.split(",")[0])),Yr[t]&&t!=="transform"?(s=kl(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Pu(Ni(e,Ci))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Du[t]&&Du[t](e,t,n)||Ni(e,t)||up(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ms(e,t,s,n)+n:s},h1=function(e,t,n,r){if(!n||n==="none"){var s=ao(t,e,1),a=s&&Ni(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=Ni(e,"borderTopColor"))}var o=new li(this._pt,e.style,t,0,1,xp),l=0,c=0,u,f,h,d,g,v,p,m,x,A,_,M;if(o.b=n,o.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=Ni(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(v=e.style[t],e.style[t]=r,r=Ni(e,t)||r,v?e.style[t]=v:Ss(e,t)),u=[n,r],fp(u),n=u[0],r=u[1],h=n.match(ca)||[],M=r.match(ca)||[],M.length){for(;f=ca.exec(r);)p=f[0],x=r.substring(l,f.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),p!==(v=h[c++]||"")&&(d=parseFloat(v)||0,_=v.substr((d+"").length),p.charAt(1)==="="&&(p=ua(d,p)+_),m=parseFloat(p),A=p.substr((m+"").length),l=ca.lastIndex-A.length,A||(A=A||wi.units[t]||_,l===r.length&&(r+=A,o.e+=A)),_!==A&&(d=Ms(e,t,v,A)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:d,c:m-d,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=t==="display"&&r==="none"?av:sv;return sp.test(r)&&(o.e=0),this._pt=o,o},nv={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},f1=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=nv[n]||n,t[1]=nv[r]||r,t.join(" ")},d1=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Yr[o]&&(l=1,o=o==="transformOrigin"?Ci:an),Ss(n,o);l&&(Ss(n,an),a&&(a.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",kl(n,1),a.uncache=1,ov(r)))}},Du={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var a=e._pt=new li(e._pt,t,n,0,0,d1);return a.u=r,a.pr=-10,a.tween=s,e._props.push(n),1}}},Ol=[1,0,0,1,0,0],fv={},dv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},iv=function(e){var t=Ni(e,an);return dv(t)?Ol:t.substr(7).match(rp).map(cn)},Rp=function(e,t){var n=e._gsap||vs(e),r=e.style,s=iv(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ol:s):(s===Ol&&!e.offsetParent&&e!==ro&&!n.svg&&(l=r.display,r.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,ro.appendChild(e)),s=iv(e),l?r.display=l:Ss(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):ro.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Ep=function(e,t,n,r,s,a){var o=e._gsap,l=s||Rp(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,d=l[0],g=l[1],v=l[2],p=l[3],m=l[4],x=l[5],A=t.split(" "),_=parseFloat(A[0])||0,M=parseFloat(A[1])||0,E,T,y,S;n?l!==Ol&&(T=d*p-g*v)&&(y=_*(p/T)+M*(-v/T)+(v*x-p*m)/T,S=_*(-g/T)+M*(d/T)-(d*x-g*m)/T,_=y,M=S):(E=uv(e),_=E.x+(~A[0].indexOf("%")?_/100*E.width:_),M=E.y+(~(A[1]||A[0]).indexOf("%")?M/100*E.height:M)),r||r!==!1&&o.smooth?(m=_-c,x=M-u,o.xOffset=f+(m*d+x*v)-m,o.yOffset=h+(m*g+x*p)-x):o.xOffset=o.yOffset=0,o.xOrigin=_,o.yOrigin=M,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Ci]="0px 0px",a&&(As(a,o,"xOrigin",c,_),As(a,o,"yOrigin",u,M),As(a,o,"xOffset",f,o.xOffset),As(a,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",_+" "+M)},kl=function(e,t){var n=e._gsap||new dp(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Ni(e,Ci)||"0",u,f,h,d,g,v,p,m,x,A,_,M,E,T,y,S,C,R,w,I,P,F,N,O,K,X,B,re,se,Te,Ce,Y;return u=f=h=v=p=m=x=A=_=0,d=g=1,n.svg=!!(e.getCTM&&hv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[an]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[an]!=="none"?l[an]:"")),r.scale=r.rotate=r.translate="none"),T=Rp(e,n.svg),n.svg&&(n.uncache?(K=e.getBBox(),c=n.xOrigin-K.x+"px "+(n.yOrigin-K.y)+"px",O=""):O=!t&&e.getAttribute("data-svg-origin"),Ep(e,O||c,!!O||n.originIsAbsolute,n.smooth!==!1,T)),M=n.xOrigin||0,E=n.yOrigin||0,T!==Ol&&(R=T[0],w=T[1],I=T[2],P=T[3],u=F=T[4],f=N=T[5],T.length===6?(d=Math.sqrt(R*R+w*w),g=Math.sqrt(P*P+I*I),v=R||w?io(w,R)*pa:0,x=I||P?io(I,P)*pa+v:0,x&&(g*=Math.abs(Math.cos(x*so))),n.svg&&(u-=M-(M*R+E*I),f-=E-(M*w+E*P))):(Y=T[6],Te=T[7],B=T[8],re=T[9],se=T[10],Ce=T[11],u=T[12],f=T[13],h=T[14],y=io(Y,se),p=y*pa,y&&(S=Math.cos(-y),C=Math.sin(-y),O=F*S+B*C,K=N*S+re*C,X=Y*S+se*C,B=F*-C+B*S,re=N*-C+re*S,se=Y*-C+se*S,Ce=Te*-C+Ce*S,F=O,N=K,Y=X),y=io(-I,se),m=y*pa,y&&(S=Math.cos(-y),C=Math.sin(-y),O=R*S-B*C,K=w*S-re*C,X=I*S-se*C,Ce=P*C+Ce*S,R=O,w=K,I=X),y=io(w,R),v=y*pa,y&&(S=Math.cos(y),C=Math.sin(y),O=R*S+w*C,K=F*S+N*C,w=w*S-R*C,N=N*S-F*C,R=O,F=K),p&&Math.abs(p)+Math.abs(v)>359.9&&(p=v=0,m=180-m),d=cn(Math.sqrt(R*R+w*w+I*I)),g=cn(Math.sqrt(N*N+Y*Y)),y=io(F,N),x=Math.abs(y)>2e-4?y*pa:0,_=Ce?1/(Ce<0?-Ce:Ce):0),n.svg&&(O=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!dv(Ni(e,an)),O&&e.setAttribute("transform",O))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(d*=-1,x+=v<=0?180:-180,v+=v<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=cn(d),n.scaleY=cn(g),n.rotation=cn(v)+o,n.rotationX=cn(p)+o,n.rotationY=cn(m)+o,n.skewX=x+o,n.skewY=A+o,n.transformPerspective=_+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Ci]=Pu(c)),n.xOffset=n.yOffset=0,n.force3D=wi.force3D,n.renderTransform=n.svg?m1:cv?pv:p1,n.uncache=0,n},Pu=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ap=function(e,t,n){var r=zn(t);return cn(parseFloat(t)+parseFloat(Ms(e,"x",n+"px",r)))+r},p1=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,pv(e,t)},fa="0deg",Nl="0px",da=") ",pv=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,g=n.scaleX,v=n.scaleY,p=n.transformPerspective,m=n.force3D,x=n.target,A=n.zOrigin,_="",M=m==="auto"&&e&&e!==1||m===!0;if(A&&(f!==fa||u!==fa)){var E=parseFloat(u)*so,T=Math.sin(E),y=Math.cos(E),S;E=parseFloat(f)*so,S=Math.cos(E),a=Ap(x,a,T*S*-A),o=Ap(x,o,-Math.sin(E)*-A),l=Ap(x,l,y*S*-A+A)}p!==Nl&&(_+="perspective("+p+da),(r||s)&&(_+="translate("+r+"%, "+s+"%) "),(M||a!==Nl||o!==Nl||l!==Nl)&&(_+=l!==Nl||M?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+da),c!==fa&&(_+="rotate("+c+da),u!==fa&&(_+="rotateY("+u+da),f!==fa&&(_+="rotateX("+f+da),(h!==fa||d!==fa)&&(_+="skew("+h+", "+d+da),(g!==1||v!==1)&&(_+="scale("+g+", "+v+da),x.style[an]=_||"translate(0, 0)"},m1=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,g=n.xOrigin,v=n.yOrigin,p=n.xOffset,m=n.yOffset,x=n.forceCSS,A=parseFloat(a),_=parseFloat(o),M,E,T,y,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=so,c*=so,M=Math.cos(l)*f,E=Math.sin(l)*f,T=Math.sin(l-c)*-h,y=Math.cos(l-c)*h,c&&(u*=so,S=Math.tan(c-u),S=Math.sqrt(1+S*S),T*=S,y*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),M*=S,E*=S)),M=cn(M),E=cn(E),T=cn(T),y=cn(y)):(M=f,y=h,E=T=0),(A&&!~(a+"").indexOf("px")||_&&!~(o+"").indexOf("px"))&&(A=Ms(d,"x",a,"px"),_=Ms(d,"y",o,"px")),(g||v||p||m)&&(A=cn(A+g-(g*M+v*T)+p),_=cn(_+v-(g*E+v*y)+m)),(r||s)&&(S=d.getBBox(),A=cn(A+r/100*S.width),_=cn(_+s/100*S.height)),S="matrix("+M+","+E+","+T+","+y+","+A+","+_+")",d.setAttribute("transform",S),x&&(d.style[an]=S)},g1=function(e,t,n,r,s){var a=360,o=wn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?pa:1),c=l-r,u=r+c+"deg",f,h;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*J0)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*J0)%a-~~(c/a)*a)),e._pt=h=new li(e._pt,t,n,r,c,jS),h.e=u,h.u="deg",e._props.push(n),h},rv=function(e,t){for(var n in t)e[n]=t[n];return e},v1=function(e,t,n){var r=rv({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,f,h,d,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[an]=t,o=kl(n,1),Ss(n,an),n.setAttribute("transform",c)):(c=getComputedStyle(n)[an],a[an]=t,o=kl(n,1),a[an]=c);for(l in Yr)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(d=zn(c),g=zn(u),f=d!==g?Ms(n,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new li(e._pt,o,l,f,h-f,Sp),e._pt.u=g||0,e._props.push(l));rv(o,r)};oi("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",a=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(o){return e<2?i+o:"border"+o+i});Du[e>1?"border"+i:i]=function(o,l,c,u,f){var h,d;if(arguments.length<4)return h=a.map(function(g){return Xr(o,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},a.forEach(function(g,v){return d[g]=h[v]=h[v]||h[(v-1)/2|0]}),o.init(l,d,f)}});var Dp={name:"css",register:Tp,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,f,h,d,g,v,p,m,x,A,_,M,E,T,y,S;bp||Tp(),this.styles=this.styles||lv(e),y=this.styles.props,this.tween=n;for(v in t)if(v!=="autoRound"&&(u=t[v],!(Ti[v]&&mp(v,t,n,r,e,s)))){if(d=typeof u,g=Du[v],d==="function"&&(u=u.call(n,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=no(u)),g)g(this,e,v,u,n)&&(T=1);else if(v.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(v)+"").trim(),u+="",Vr.lastIndex=0,Vr.test(c)||(p=zn(c),m=zn(u),m?p!==m&&(c=Ms(e,v,c,m)+m):p&&(u+=p)),this.add(o,"setProperty",c,u,r,s,0,0,v),a.push(v),y.push(v,0,o[v]);else if(d!=="undefined"){if(l&&v in l?(c=typeof l[v]=="function"?l[v].call(n,r,e,s):l[v],wn(c)&&~c.indexOf("random(")&&(c=no(c)),zn(c+"")||c==="auto"||(c+=wi.units[v]||zn(Xr(e,v))||""),(c+"").charAt(1)==="="&&(c=Xr(e,v))):c=Xr(e,v),h=parseFloat(c),x=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),f=parseFloat(u),v in Cr&&(v==="autoAlpha"&&(h===1&&Xr(e,"visibility")==="hidden"&&f&&(h=0),y.push("visibility",0,o.visibility),As(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),v!=="scale"&&v!=="transform"&&(v=Cr[v],~v.indexOf(",")&&(v=v.split(",")[0]))),A=v in Yr,A){if(this.styles.save(v),S=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Ni(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=u,u=Ni(e,"perspective"),C?e.style.perspective=C:Ss(e,"perspective")}f=parseFloat(u)}if(_||(M=e._gsap,M.renderTransform&&!t.parseTransform||kl(e,t.parseTransform),E=t.smoothOrigin!==!1&&M.smooth,_=this._pt=new li(this._pt,o,an,0,1,M.renderTransform,M,0,-1),_.dep=1),v==="scale")this._pt=new li(this._pt,M,"scaleY",M.scaleY,(x?ua(M.scaleY,x+f):f)-M.scaleY||0,Sp),this._pt.u=0,a.push("scaleY",v),v+="X";else if(v==="transformOrigin"){y.push(Ci,0,o[Ci]),u=f1(u),M.svg?Ep(e,u,0,E,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==M.zOrigin&&As(this,M,"zOrigin",M.zOrigin,m),As(this,o,v,Pu(c),Pu(u)));continue}else if(v==="svgOrigin"){Ep(e,u,1,E,0,this);continue}else if(v in fv){g1(this,M,v,h,x?ua(h,x+u):u);continue}else if(v==="smoothOrigin"){As(this,M,"smooth",M.smooth,u);continue}else if(v==="force3D"){M[v]=u;continue}else if(v==="transform"){v1(this,u,e);continue}}else v in o||(v=ao(v)||v);if(A||(f||f===0)&&(h||h===0)&&!JS.test(u)&&v in o)p=(c+"").substr((h+"").length),f||(f=0),m=zn(u)||(v in wi.units?wi.units[v]:p),p!==m&&(h=Ms(e,v,c,m)),this._pt=new li(this._pt,A?M:o,v,h,(x?ua(h,x+f):f)-h,!A&&(m==="px"||v==="zIndex")&&t.autoRound!==!1?t1:Sp),this._pt.u=m||0,A&&S!==u?(this._pt.b=c,this._pt.e=S,this._pt.r=e1):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=$S);else if(v in o)h1.call(this,e,v,c,x?x+u:u);else if(v in e)this.add(e,v,c||e[v],x?x+u:u,r,s);else if(v!=="parseTransform"){Eu(v,u);continue}A||(v in o?y.push(v,0,o[v]):typeof e[v]=="function"?y.push(v,2,e[v]()):y.push(v,1,c||e[v])),a.push(v)}}T&&yp(this)},render:function(e,t){if(t.tween._time||!wp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Xr,aliases:Cr,getSetter:function(e,t,n){var r=Cr[t];return r&&r.indexOf(",")<0&&(t=r),t in Yr&&t!==Ci&&(e._gsap.x||Xr(e,"x"))?n&&K0===n?t==="scale"?s1:r1:(K0=n||{})&&(t==="scale"?a1:o1):e.style&&!Tu(e.style[t])?n1:~t.indexOf("-")?i1:Ru(e,t)},core:{_removeProperty:Ss,_getMatrix:Rp}};Jn.utils.checkPrefix=ao;Jn.core.getStyleSaver=lv;(function(i,e,t,n){var r=oi(i+","+e+","+t,function(s){Yr[s]=1});oi(e,function(s){wi.units[s]="deg",fv[s]=1}),Cr[r[13]]=i+","+e,oi(n,function(s){var a=s.split(":");Cr[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");oi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){wi.units[i]="px"});Jn.registerPlugin(Dp);var Rr=Jn.registerPlugin(Dp)||Jn,qR=Rr.core.Tween;function mv(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function x1(i,e,t){return e&&mv(i.prototype,e),t&&mv(i,t),i}var Hn,Uu,_1,Oi,Ts,Es,lo,vv,ga,co,xv,qr,dr,_v,yv=function(){return Hn||typeof window<"u"&&(Hn=window.gsap)&&Hn.registerPlugin&&Hn},Av=1,oo=[],dt=[],pr=[],Hl=Date.now,Pp=function(e,t){return t},y1=function(){var e=co.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,dt),r.push.apply(r,pr),dt=n,pr=r,Pp=function(a,o){return t[a](o)}},Zr=function(e,t){return~pr.indexOf(e)&&pr[pr.indexOf(e)+1][t]},Gl=function(e){return!!~xv.indexOf(e)},ui=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},ci=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Iu="scrollLeft",Bu="scrollTop",Ip=function(){return qr&&qr.isPressed||dt.cache++},Lu=function(e,t){var n=function r(s){if(s||s===0){Av&&(Oi.history.scrollRestoration="manual");var a=qr&&qr.isPressed;s=r.v=Math.round(s)||(qr&&qr.iOS?1:0),e(s),r.cacheID=dt.cache,a&&Pp("ss",s)}else(t||dt.cache!==r.cacheID||Pp("ref"))&&(r.cacheID=dt.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},jn={s:Iu,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Lu(function(i){return arguments.length?Oi.scrollTo(i,gn.sc()):Oi.pageXOffset||Ts[Iu]||Es[Iu]||lo[Iu]||0})},gn={s:Bu,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:jn,sc:Lu(function(i){return arguments.length?Oi.scrollTo(jn.sc(),i):Oi.pageYOffset||Ts[Bu]||Es[Bu]||lo[Bu]||0})},hi=function(e,t){return(t&&t._ctx&&t._ctx.selector||Hn.utils.toArray)(e)[0]||(typeof e=="string"&&Hn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},A1=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Qr=function(e,t){var n=t.s,r=t.sc;Gl(e)&&(e=Ts.scrollingElement||Es);var s=dt.indexOf(e),a=r===gn.sc?1:2;!~s&&(s=dt.push(e)-1),dt[s+a]||ui(e,"scroll",Ip);var o=dt[s+a],l=o||(dt[s+a]=Lu(Zr(e,n),!0)||(Gl(e)?r:Lu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Hn.getProperty(e,"scrollBehavior")==="smooth"),l},Fu=function(e,t,n){var r=e,s=e,a=Hl(),o=a,l=t||50,c=Math.max(500,l*3),u=function(g,v){var p=Hl();v||p-a>l?(s=r,r=g,o=a,a=p):n?r+=g:r=s+(g-s)/(p-o)*(a-o)},f=function(){s=r=n?0:r,o=a=0},h=function(g){var v=o,p=s,m=Hl();return(g||g===0)&&g!==r&&u(g),a===o||m-o>c?0:(r+(n?p:-p))/((n?m:a)-v)*1e3};return{update:u,reset:f,getVelocity:h}},zl=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},gv=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Sv=function(){co=Hn.core.globals().ScrollTrigger,co&&co.core&&y1()},Mv=function(e){return Hn=e||yv(),!Uu&&Hn&&typeof document<"u"&&document.body&&(Oi=window,Ts=document,Es=Ts.documentElement,lo=Ts.body,xv=[Oi,Ts,Es,lo],_1=Hn.utils.clamp,_v=Hn.core.context||function(){},ga="onpointerenter"in lo?"pointer":"mouse",vv=un.isTouch=Oi.matchMedia&&Oi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Oi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,dr=un.eventTypes=("ontouchstart"in Es?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Es?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Av=0},500),Uu=1),co||Sv(),Uu};jn.op=gn;dt.cache=0;var un=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){Uu||Mv(Hn)||console.warn("Please gsap.registerPlugin(Observer)"),co||Sv();var r=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,v=n.event,p=n.onDragStart,m=n.onDragEnd,x=n.onDrag,A=n.onPress,_=n.onRelease,M=n.onRight,E=n.onLeft,T=n.onUp,y=n.onDown,S=n.onChangeX,C=n.onChangeY,R=n.onChange,w=n.onToggleX,I=n.onToggleY,P=n.onHover,F=n.onHoverEnd,N=n.onMove,O=n.ignoreCheck,K=n.isNormalizer,X=n.onGestureStart,B=n.onGestureEnd,re=n.onWheel,se=n.onEnable,Te=n.onDisable,Ce=n.onClick,Y=n.scrollSpeed,V=n.capture,Z=n.allowClicks,ie=n.lockAxis,ne=n.onLockAxis;this.target=o=hi(o)||Es,this.vars=n,d&&(d=Hn.utils.toArray(d)),r=r||1e-9,s=s||0,g=g||1,Y=Y||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Oi.getComputedStyle(lo).lineHeight)||22);var he,pe,Re,ce,De,He,ve,W=this,k=0,Ye=0,Ie=n.passive||!u&&n.passive!==!1,Be=Qr(o,jn),me=Qr(o,gn),U=Be(),b=me(),H=~a.indexOf("touch")&&!~a.indexOf("pointer")&&dr[0]==="pointerdown",ee=Gl(o),$=o.ownerDocument||Ts,J=[0,0,0],ye=[0,0,0],fe=0,Ge=function(){return fe=Hl()},Ue=function(Ve,ct){return(W.event=Ve)&&d&&A1(Ve.target,d)||ct&&H&&Ve.pointerType!=="touch"||O&&O(Ve,ct)},oe=function(){W._vx.reset(),W._vy.reset(),pe.pause(),f&&f(W)},ue=function(){var Ve=W.deltaX=gv(J),ct=W.deltaY=gv(ye),Ee=Math.abs(Ve)>=r,tt=Math.abs(ct)>=r;R&&(Ee||tt)&&R(W,Ve,ct,J,ye),Ee&&(M&&W.deltaX>0&&M(W),E&&W.deltaX<0&&E(W),S&&S(W),w&&W.deltaX<0!=k<0&&w(W),k=W.deltaX,J[0]=J[1]=J[2]=0),tt&&(y&&W.deltaY>0&&y(W),T&&W.deltaY<0&&T(W),C&&C(W),I&&W.deltaY<0!=Ye<0&&I(W),Ye=W.deltaY,ye[0]=ye[1]=ye[2]=0),(ce||Re)&&(N&&N(W),Re&&(p&&Re===1&&p(W),x&&x(W),Re=0),ce=!1),He&&!(He=!1)&&ne&&ne(W),De&&(re(W),De=!1),he=0},Le=function(Ve,ct,Ee){J[Ee]+=Ve,ye[Ee]+=ct,W._vx.update(Ve),W._vy.update(ct),c?he||(he=requestAnimationFrame(ue)):ue()},Ne=function(Ve,ct){ie&&!ve&&(W.axis=ve=Math.abs(Ve)>Math.abs(ct)?"x":"y",He=!0),ve!=="y"&&(J[2]+=Ve,W._vx.update(Ve,!0)),ve!=="x"&&(ye[2]+=ct,W._vy.update(ct,!0)),c?he||(he=requestAnimationFrame(ue)):ue()},Ae=function(Ve){if(!Ue(Ve,1)){Ve=zl(Ve,u);var ct=Ve.clientX,Ee=Ve.clientY,tt=ct-W.x,Qe=Ee-W.y,nt=W.isDragging;W.x=ct,W.y=Ee,(nt||(tt||Qe)&&(Math.abs(W.startX-ct)>=s||Math.abs(W.startY-Ee)>=s))&&(Re||(Re=nt?2:1),nt||(W.isDragging=!0),Ne(tt,Qe))}},et=W.onPress=function(Pe){Ue(Pe,1)||Pe&&Pe.button||(W.axis=ve=null,pe.pause(),W.isPressed=!0,Pe=zl(Pe),k=Ye=0,W.startX=W.x=Pe.clientX,W.startY=W.y=Pe.clientY,W._vx.reset(),W._vy.reset(),ui(K?o:$,dr[1],Ae,Ie,!0),W.deltaX=W.deltaY=0,A&&A(W))},z=W.onRelease=function(Pe){if(!Ue(Pe,1)){ci(K?o:$,dr[1],Ae,!0);var Ve=!isNaN(W.y-W.startY),ct=W.isDragging,Ee=ct&&(Math.abs(W.x-W.startX)>3||Math.abs(W.y-W.startY)>3),tt=zl(Pe);!Ee&&Ve&&(W._vx.reset(),W._vy.reset(),u&&Z&&Hn.delayedCall(.08,function(){if(Hl()-fe>300&&!Pe.defaultPrevented){if(Pe.target.click)Pe.target.click();else if($.createEvent){var Qe=$.createEvent("MouseEvents");Qe.initMouseEvent("click",!0,!0,Oi,1,tt.screenX,tt.screenY,tt.clientX,tt.clientY,!1,!1,!1,!1,0,null),Pe.target.dispatchEvent(Qe)}}})),W.isDragging=W.isGesturing=W.isPressed=!1,f&&ct&&!K&&pe.restart(!0),Re&&ue(),m&&ct&&m(W),_&&_(W,Ee)}},de=function(Ve){return Ve.touches&&Ve.touches.length>1&&(W.isGesturing=!0)&&X(Ve,W.isDragging)},le=function(){return(W.isGesturing=!1)||B(W)},Se=function(Ve){if(!Ue(Ve)){var ct=Be(),Ee=me();Le((ct-U)*Y,(Ee-b)*Y,1),U=ct,b=Ee,f&&pe.restart(!0)}},ae=function(Ve){if(!Ue(Ve)){Ve=zl(Ve,u),re&&(De=!0);var ct=(Ve.deltaMode===1?l:Ve.deltaMode===2?Oi.innerHeight:1)*g;Le(Ve.deltaX*ct,Ve.deltaY*ct,0),f&&!K&&pe.restart(!0)}},te=function(Ve){if(!Ue(Ve)){var ct=Ve.clientX,Ee=Ve.clientY,tt=ct-W.x,Qe=Ee-W.y;W.x=ct,W.y=Ee,ce=!0,f&&pe.restart(!0),(tt||Qe)&&Ne(tt,Qe)}},Fe=function(Ve){W.event=Ve,P(W)},qe=function(Ve){W.event=Ve,F(W)},Tt=function(Ve){return Ue(Ve)||zl(Ve,u)&&Ce(W)};pe=W._dc=Hn.delayedCall(h||.25,oe).pause(),W.deltaX=W.deltaY=0,W._vx=Fu(0,50,!0),W._vy=Fu(0,50,!0),W.scrollX=Be,W.scrollY=me,W.isDragging=W.isGesturing=W.isPressed=!1,_v(this),W.enable=function(Pe){return W.isEnabled||(ui(ee?$:o,"scroll",Ip),a.indexOf("scroll")>=0&&ui(ee?$:o,"scroll",Se,Ie,V),a.indexOf("wheel")>=0&&ui(o,"wheel",ae,Ie,V),(a.indexOf("touch")>=0&&vv||a.indexOf("pointer")>=0)&&(ui(o,dr[0],et,Ie,V),ui($,dr[2],z),ui($,dr[3],z),Z&&ui(o,"click",Ge,!0,!0),Ce&&ui(o,"click",Tt),X&&ui($,"gesturestart",de),B&&ui($,"gestureend",le),P&&ui(o,ga+"enter",Fe),F&&ui(o,ga+"leave",qe),N&&ui(o,ga+"move",te)),W.isEnabled=!0,W.isDragging=W.isGesturing=W.isPressed=ce=Re=!1,W._vx.reset(),W._vy.reset(),U=Be(),b=me(),Pe&&Pe.type&&et(Pe),se&&se(W)),W},W.disable=function(){W.isEnabled&&(oo.filter(function(Pe){return Pe!==W&&Gl(Pe.target)}).length||ci(ee?$:o,"scroll",Ip),W.isPressed&&(W._vx.reset(),W._vy.reset(),ci(K?o:$,dr[1],Ae,!0)),ci(ee?$:o,"scroll",Se,V),ci(o,"wheel",ae,V),ci(o,dr[0],et,V),ci($,dr[2],z),ci($,dr[3],z),ci(o,"click",Ge,!0),ci(o,"click",Tt),ci($,"gesturestart",de),ci($,"gestureend",le),ci(o,ga+"enter",Fe),ci(o,ga+"leave",qe),ci(o,ga+"move",te),W.isEnabled=W.isPressed=W.isDragging=!1,Te&&Te(W))},W.kill=W.revert=function(){W.disable();var Pe=oo.indexOf(W);Pe>=0&&oo.splice(Pe,1),qr===W&&(qr=0)},oo.push(W),K&&Gl(o)&&(qr=W),W.enable(v)},x1(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();un.version="3.15.0";un.create=function(i){return new un(i)};un.register=Mv;un.getAll=function(){return oo.slice()};un.getById=function(i){return oo.filter(function(e){return e.vars.id===i})[0]};yv()&&Hn.registerPlugin(un);var ze,po,mt,Nt,Hi,It,Yp,ju,nc,Zl,Wl,Nu,$n,th,kp,di,Tv,Ev,mo,Hv,Bp,Gv,fi,zp,Vv,Wv,bs,Hp,qp,go,Qp,Kl,Gp,Up,Ou=1,ei=Date.now,Lp=ei(),nr=0,Xl=0,bv=function(e,t,n){var r=zi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},wv=function(e,t){return t&&(!zi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},S1=function i(){return Xl&&requestAnimationFrame(i)},Cv=function(){return th=1},Rv=function(){return th=0},Dr=function(e){return e},Yl=function(e){return Math.round(e*1e5)/1e5||0},Xv=function(){return typeof window<"u"},Yv=function(){return ze||Xv()&&(ze=window.gsap)&&ze.registerPlugin&&ze},Sa=function(e){return!!~Yp.indexOf(e)},qv=function(e){return(e==="Height"?Qp:mt["inner"+e])||Hi["client"+e]||It["client"+e]},Qv=function(e){return Zr(e,"getBoundingClientRect")||(Sa(e)?function(){return Ju.width=mt.innerWidth,Ju.height=Qp,Ju}:function(){return Kr(e)})},M1=function(e,t,n){var r=n.d,s=n.d2,a=n.a;return(a=Zr(e,"getBoundingClientRect"))?function(){return a()[r]}:function(){return(t?qv(s):e["client"+s])||0}},T1=function(e,t){return!t||~pr.indexOf(e)?Qv(e):function(){return Ju}},Pr=function(e,t){var n=t.s,r=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+r)&&(a=Zr(e,n))?a()-Qv(e)()[s]:Sa(e)?(Hi[n]||It[n])-qv(r):e[n]-e["offset"+r])},ku=function(e,t){for(var n=0;n<mo.length;n+=3)(!t||~t.indexOf(mo[n+1]))&&e(mo[n],mo[n+1],mo[n+2])},zi=function(e){return typeof e=="string"},ti=function(e){return typeof e=="function"},ql=function(e){return typeof e=="number"},va=function(e){return typeof e=="object"},Vl=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},uo=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},ho=Math.abs,Zv="left",Kv="top",Zp="right",Kp="bottom",_a="width",ya="height",Jl="Right",jl="Left",$l="Top",ec="Bottom",vn="padding",er="margin",xo="Width",Jp="Height",Cn="px",tr=function(e){return mt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},E1=function(e){var t=tr(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Dv=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Kr=function(e,t){var n=t&&tr(e)[kp]!=="matrix(1, 0, 0, 1, 0, 0)"&&ze.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},$u=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Jv=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},b1=function(e){return function(t){return ze.utils.snap(Jv(e),t)}},jp=function(e){var t=ze.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,a){a===void 0&&(a=.001);var o;if(!s)return t(r);if(s>0){for(r-=a,o=0;o<n.length;o++)if(n[o]>=r)return n[o];return n[o-1]}else for(o=n.length,r+=a;o--;)if(n[o]<=r)return n[o];return n[0]}:function(r,s,a){a===void 0&&(a=.001);var o=t(r);return!s||Math.abs(o-r)<a||o-r<0==s<0?o:t(s<0?r-e:r+e)}},w1=function(e){return function(t,n){return jp(Jv(e))(t,n.direction)}},zu=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},Ln=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},Un=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Hu=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Pv={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Gu={toggleActions:"play",anticipatePin:0},eh={top:0,left:0,center:.5,bottom:1,right:1},qu=function(e,t){if(zi(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in eh?eh[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Vu=function(e,t,n,r,s,a,o,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=Nt.createElement("div"),v=Sa(n)||Zr(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=v?It:n.tagName==="IFRAME"?n.contentDocument.body:n,x=e.indexOf("start")!==-1,A=x?c:u,_="border-color:"+A+";font-size:"+f+";color:"+A+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return _+="position:"+((p||l)&&v?"fixed;":"absolute;"),(p||l||!v)&&(_+=(r===gn?Zp:Kp)+":"+(a+parseFloat(h))+"px;"),o&&(_+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=x,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=_,g.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(g,m.children[0]):m.appendChild(g),g._offset=g["offset"+r.op.d2],Qu(g,0,r,x),g},Qu=function(e,t,n,r){var s={display:"block"},a=n[r?"os2":"p2"],o=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+a+xo]=1,s["border"+o+xo]=0,s[n.p]=t+"px",ze.set(e,s)},pt=[],Vp={},ic,Iv=function(){return ei()-nr>34&&(ic||(ic=requestAnimationFrame(Jr)))},fo=function(){(!fi||!fi.isPressed||fi.startX>It.clientWidth)&&(dt.cache++,fi?ic||(ic=requestAnimationFrame(Jr)):Jr(),nr||Ta("scrollStart"),nr=ei())},Fp=function(){Wv=mt.innerWidth,Vv=mt.innerHeight},Ql=function(e){dt.cache++,(e===!0||!$n&&!Gv&&!Nt.fullscreenElement&&!Nt.webkitFullscreenElement&&(!zp||Wv!==mt.innerWidth||Math.abs(mt.innerHeight-Vv)>mt.innerHeight*.25))&&ju.restart(!0)},Ma={},C1=[],jv=function i(){return Un(lt,"scrollEnd",i)||xa(!0)},Ta=function(e){return Ma[e]&&Ma[e].map(function(t){return t()})||C1},ki=[],$v=function(e){for(var t=0;t<ki.length;t+=5)(!e||ki[t+4]&&ki[t+4].query===e)&&(ki[t].style.cssText=ki[t+1],ki[t].getBBox&&ki[t].setAttribute("transform",ki[t+2]||""),ki[t+3].uncache=1)},ex=function(){return dt.forEach(function(e){return ti(e)&&++e.cacheID&&(e.rec=e())})},$p=function(e,t){var n;for(di=0;di<pt.length;di++)n=pt[di],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Kl=!0,t&&$v(t),t||Ta("revert")},tx=function(e,t){dt.cache++,(t||!pi)&&dt.forEach(function(n){return ti(n)&&n.cacheID++&&(n.rec=0)}),zi(e)&&(mt.history.scrollRestoration=qp=e)},pi,Aa=0,Bv,R1=function(){if(Bv!==Aa){var e=Bv=Aa;requestAnimationFrame(function(){return e===Aa&&xa(!0)})}},nx=function(){It.appendChild(go),Qp=!fi&&go.offsetHeight||mt.innerHeight,It.removeChild(go)},Uv=function(e){return nc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},xa=function(e,t){if(Hi=Nt.documentElement,It=Nt.body,Yp=[mt,Nt,Hi,It],nr&&!e&&!Kl){Ln(lt,"scrollEnd",jv);return}nx(),pi=lt.isRefreshing=!0,Kl||ex();var n=Ta("refreshInit");Hv&&lt.sort(),t||$p(),dt.forEach(function(r){ti(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),pt.slice(0).forEach(function(r){return r.refresh()}),Kl=!1,pt.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",a=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-a),r.refresh()}}),Gp=1,Uv(!0),pt.forEach(function(r){var s=Pr(r.scroller,r._dir),a=r.vars.end==="max"||r._endClamp&&r.end>s,o=r._startClamp&&r.start>=s;(a||o)&&r.setPositions(o?s-1:r.start,a?Math.max(o?s:r.start+1,s):r.end,!0)}),Uv(!1),Gp=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),dt.forEach(function(r){ti(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),tx(qp,1),ju.pause(),Aa++,pi=2,Jr(2),pt.forEach(function(r){return ti(r.vars.onRefresh)&&r.vars.onRefresh(r)}),pi=lt.isRefreshing=!1,Ta("refresh")},Wp=0,Zu=1,tc,Jr=function(e){if(e===2||!pi&&!Kl){lt.isUpdating=!0,tc&&tc.update(0);var t=pt.length,n=ei(),r=n-Lp>=50,s=t&&pt[0].scroll();if(Zu=Wp>s?-1:1,pi||(Wp=s),r&&(nr&&!th&&n-nr>200&&(nr=0,Ta("scrollEnd")),Wl=Lp,Lp=n),Zu<0){for(di=t;di-- >0;)pt[di]&&pt[di].update(0,r);Zu=1}else for(di=0;di<t;di++)pt[di]&&pt[di].update(0,r);lt.isUpdating=!1}ic=0},Xp=[Zv,Kv,Kp,Zp,er+ec,er+Jl,er+$l,er+jl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ku=Xp.concat([_a,ya,"boxSizing","max"+xo,"max"+Jp,"position",er,vn,vn+$l,vn+Jl,vn+ec,vn+jl]),D1=function(e,t,n){vo(n);var r=e._gsap;if(r.spacerIsNative)vo(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Np=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Xp.length,a=t.style,o=e.style,l;s--;)l=Xp[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[Kp]=o[Zp]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[_a]=$u(e,jn)+Cn,a[ya]=$u(e,gn)+Cn,a[vn]=o[er]=o[Kv]=o[Zv]="0",vo(r),o[_a]=o["max"+xo]=n[_a],o[ya]=o["max"+Jp]=n[ya],o[vn]=n[vn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},P1=/([A-Z])/g,vo=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,a;for((e.t._gsap||ze.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],s=e[r],a?t[s]=a:t[s]&&t.removeProperty(s.replace(P1,"-$1").toLowerCase())}},Wu=function(e){for(var t=Ku.length,n=e.style,r=[],s=0;s<t;s++)r.push(Ku[s],n[Ku[s]]);return r.t=e,r},I1=function(e,t,n){for(var r=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},Ju={left:0,top:0},Lv=function(e,t,n,r,s,a,o,l,c,u,f,h,d,g){ti(e)&&(e=e(l)),zi(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?qu("0"+e.substr(3),n):0));var v=d?d.time():0,p,m,x;if(d&&d.seek(0),isNaN(e)||(e=+e),ql(e))d&&(e=ze.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),o&&Qu(o,n,r,!0);else{ti(t)&&(t=t(l));var A=(e||"0").split(" "),_,M,E,T;x=hi(t,l)||It,_=Kr(x)||{},(!_||!_.left&&!_.top)&&tr(x).display==="none"&&(T=x.style.display,x.style.display="block",_=Kr(x),T?x.style.display=T:x.style.removeProperty("display")),M=qu(A[0],_[r.d]),E=qu(A[1]||"0",n),e=_[r.p]-c[r.p]-u+M+s-E,o&&Qu(o,E,r,n-E<20||o._isStart&&E>20),n-=n-E}if(g&&(l[g]=e||-.001,e<0&&(e=0)),a){var y=e+n,S=a._isStart;p="scroll"+r.d2,Qu(a,y,r,S&&y>20||!S&&(f?Math.max(It[p],Hi[p]):a.parentNode[p])<=y+1),f&&(c=Kr(o),f&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+Cn))}return d&&x&&(p=Kr(x),d.seek(h),m=Kr(x),d._caScrollDist=p[r.p]-m[r.p],e=e/d._caScrollDist*h),d&&d.seek(v),d?e:Math.round(e)},B1=/(webkit|moz|length|cssText|inset)/i,Fv=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,a,o;if(t===It){e._stOrig=s.cssText,o=tr(e);for(a in o)!+a&&!B1.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=r}else s.cssText=e._stOrig;ze.core.getCache(e).uncache=1,t.appendChild(e)}},ix=function(e,t,n){var r=t,s=r;return function(a){var o=Math.round(e());return o!==r&&o!==s&&Math.abs(o-r)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=r,r=Math.round(a),r}},Xu=function(e,t,n){var r={};r[t.p]="+="+n,ze.set(e,r)},Nv=function(e,t){var n=Qr(e,t),r="_scroll"+t.p2,s=function a(o,l,c,u,f){var h=a.tween,d=l.onComplete,g={};c=c||n();var v=ix(n,c,function(){h.kill(),a.tween=0});return f=u&&f||0,u=u||o-c,h&&h.kill(),l[r]=o,l.inherit=!1,l.modifiers=g,g[r]=function(){return v(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){dt.cache++,a.tween&&Jr()},l.onComplete=function(){a.tween=0,d&&d.call(h)},h=a.tween=ze.to(e,l),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Ln(e,"wheel",n.wheelHandler),lt.isTouch&&Ln(e,"touchmove",n.wheelHandler),s},lt=function(){function i(t,n){po||i.register(ze)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Hp(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Xl){this.update=this.refresh=this.kill=Dr;return}n=Dv(zi(n)||ql(n)||n.nodeType?{trigger:n}:n,Gu);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,v=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,x=s.onSnapComplete,A=s.once,_=s.snap,M=s.pinReparent,E=s.pinSpacer,T=s.containerAnimation,y=s.fastScrollEnd,S=s.preventOverlaps,C=n.horizontal||n.containerAnimation&&n.horizontal!==!1?jn:gn,R=!f&&f!==0,w=hi(n.scroller||mt),I=ze.core.getCache(w),P=Sa(w),F=("pinType"in n?n.pinType:Zr(w,"pinType")||P&&"fixed")==="fixed",N=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],O=R&&n.toggleActions.split(" "),K="markers"in n?n.markers:Gu.markers,X=P?0:parseFloat(tr(w)["border"+C.p2+xo])||0,B=this,re=n.onRefreshInit&&function(){return n.onRefreshInit(B)},se=M1(w,P,C),Te=T1(w,P),Ce=0,Y=0,V=0,Z=Qr(w,C),ie,ne,he,pe,Re,ce,De,He,ve,W,k,Ye,Ie,Be,me,U,b,H,ee,$,J,ye,fe,Ge,Ue,oe,ue,Le,Ne,Ae,et,z,de,le,Se,ae,te,Fe,qe;if(B._startClamp=B._endClamp=!1,B._dir=C,p*=45,B.scroller=w,B.scroll=T?T.time.bind(T):Z,pe=Z(),B.vars=n,r=r||n.animation,"refreshPriority"in n&&(Hv=1,n.refreshPriority===-9999&&(tc=B)),I.tweenScroll=I.tweenScroll||{top:Nv(w,gn),left:Nv(w,jn)},B.tweenTo=ie=I.tweenScroll[C.p],B.scrubDuration=function(Ee){de=ql(Ee)&&Ee,de?z?z.duration(Ee):z=ze.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:de,paused:!0,onComplete:function(){return m&&m(B)}}):(z&&z.progress(1).kill(),z=0)},r&&(r.vars.lazy=!1,r._initted&&!B.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),B.animation=r.pause(),r.scrollTrigger=B,B.scrubDuration(f),Ae=0,l||(l=r.vars.id)),_&&((!va(_)||_.push)&&(_={snapTo:_}),"scrollBehavior"in It.style&&ze.set(P?[It,Hi]:w,{scrollBehavior:"auto"}),dt.forEach(function(Ee){return ti(Ee)&&Ee.target===(P?Nt.scrollingElement||Hi:w)&&(Ee.smooth=!1)}),he=ti(_.snapTo)?_.snapTo:_.snapTo==="labels"?b1(r):_.snapTo==="labelsDirectional"?w1(r):_.directional!==!1?function(Ee,tt){return jp(_.snapTo)(Ee,ei()-Y<500?0:tt.direction)}:ze.utils.snap(_.snapTo),le=_.duration||{min:.1,max:2},le=va(le)?Zl(le.min,le.max):Zl(le,le),Se=ze.delayedCall(_.delay||de/2||.1,function(){var Ee=Z(),tt=ei()-Y<500,Qe=ie.tween;if((tt||Math.abs(B.getVelocity())<10)&&!Qe&&!th&&Ce!==Ee){var nt=(Ee-ce)/Be,fn=r&&!R?r.totalProgress():nt,st=tt?0:(fn-et)/(ei()-Wl)*1e3||0,Jt=ze.utils.clamp(-nt,1-nt,ho(st/2)*st/.185),Tn=nt+(_.inertia===!1?0:Jt),jt,Ft,Pt=_,Yn=Pt.onStart,Qt=Pt.onInterrupt,qn=Pt.onComplete;if(jt=he(Tn,B),ql(jt)||(jt=Tn),Ft=Math.max(0,Math.round(ce+jt*Be)),Ee<=De&&Ee>=ce&&Ft!==Ee){if(Qe&&!Qe._initted&&Qe.data<=ho(Ft-Ee))return;_.inertia===!1&&(Jt=jt-nt),ie(Ft,{duration:le(ho(Math.max(ho(Tn-fn),ho(jt-fn))*.185/st/.05||0)),ease:_.ease||"power3",data:ho(Ft-Ee),onInterrupt:function(){return Se.restart(!0)&&Qt&&uo(B,Qt)},onComplete:function(){B.update(),Ce=Z(),r&&!R&&(z?z.resetTo("totalProgress",jt,r._tTime/r._tDur):r.progress(jt)),Ae=et=r&&!R?r.totalProgress():B.progress,x&&x(B),qn&&uo(B,qn)}},Ee,Jt*Be,Ft-Ee-Jt*Be),Yn&&uo(B,Yn,ie.tween)}}else B.isActive&&Ce!==Ee&&Se.restart(!0)}).pause()),l&&(Vp[l]=B),h=B.trigger=hi(h||d!==!0&&d),qe=h&&h._gsap&&h._gsap.stRevert,qe&&(qe=qe(B)),d=d===!0?h:hi(d),zi(o)&&(o={targets:h,className:o}),d&&(g===!1||g===er||(g=!g&&d.parentNode&&d.parentNode.style&&tr(d.parentNode).display==="flex"?!1:vn),B.pin=d,ne=ze.core.getCache(d),ne.spacer?me=ne.pinState:(E&&(E=hi(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),ne.spacerIsNative=!!E,E&&(ne.spacerState=Wu(E))),ne.spacer=H=E||Nt.createElement("div"),H.classList.add("pin-spacer"),l&&H.classList.add("pin-spacer-"+l),ne.pinState=me=Wu(d)),n.force3D!==!1&&ze.set(d,{force3D:!0}),B.spacer=H=ne.spacer,Ne=tr(d),Ge=Ne[g+C.os2],$=ze.getProperty(d),J=ze.quickSetter(d,C.a,Cn),Np(d,H,Ne),b=Wu(d)),K){Ye=va(K)?Dv(K,Pv):Pv,W=Vu("scroller-start",l,w,C,Ye,0),k=Vu("scroller-end",l,w,C,Ye,0,W),ee=W["offset"+C.op.d2];var Tt=hi(Zr(w,"content")||w);He=this.markerStart=Vu("start",l,Tt,C,Ye,ee,0,T),ve=this.markerEnd=Vu("end",l,Tt,C,Ye,ee,0,T),T&&(Fe=ze.quickSetter([He,ve],C.a,Cn)),!F&&!(pr.length&&Zr(w,"fixedMarkers")===!0)&&(E1(P?It:w),ze.set([W,k],{force3D:!0}),oe=ze.quickSetter(W,C.a,Cn),Le=ze.quickSetter(k,C.a,Cn))}if(T){var Pe=T.vars.onUpdate,Ve=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){B.update(0,0,1),Pe&&Pe.apply(T,Ve||[])})}if(B.previous=function(){return pt[pt.indexOf(B)-1]},B.next=function(){return pt[pt.indexOf(B)+1]},B.revert=function(Ee,tt){if(!tt)return B.kill(!0);var Qe=Ee!==!1||!B.enabled,nt=$n;Qe!==B.isReverted&&(Qe&&(ae=Math.max(Z(),B.scroll.rec||0),V=B.progress,te=r&&r.progress()),He&&[He,ve,W,k].forEach(function(fn){return fn.style.display=Qe?"none":"block"}),Qe&&($n=B,B.update(Qe)),d&&(!M||!B.isActive)&&(Qe?D1(d,H,me):Np(d,H,tr(d),Ue)),Qe||B.update(Qe),$n=nt,B.isReverted=Qe)},B.refresh=function(Ee,tt,Qe,nt){if(!(($n||!B.enabled)&&!tt)){if(d&&Ee&&nr){Ln(i,"scrollEnd",jv);return}!pi&&re&&re(B),$n=B,ie.tween&&!Qe&&(ie.tween.kill(),ie.tween=0),z&&z.pause(),v&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(Oe){return Oe.vars.immediateRender&&Oe.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),B.isReverted||B.revert(!0,!0),B._subPinOffset=!1;var fn=se(),st=Te(),Jt=T?T.duration():Pr(w,C),Tn=Be<=.01||!Be,jt=0,Ft=nt||0,Pt=va(Qe)?Qe.end:n.end,Yn=n.endTrigger||h,Qt=va(Qe)?Qe.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),qn=B.pinnedContainer=n.pinnedContainer&&hi(n.pinnedContainer,B),Ki=h&&Math.max(0,pt.indexOf(B))||0,En=Ki,bn,In,Hr,Qa,D,G,j,Q,q,xe,Me,_e,ke;for(K&&va(Qe)&&(_e=ze.getProperty(W,C.p),ke=ze.getProperty(k,C.p));En-- >0;)G=pt[En],G.end||G.refresh(0,1)||($n=B),j=G.pin,j&&(j===h||j===d||j===qn)&&!G.isReverted&&(xe||(xe=[]),xe.unshift(G),G.revert(!0,!0)),G!==pt[En]&&(Ki--,En--);for(ti(Qt)&&(Qt=Qt(B)),Qt=bv(Qt,"start",B),ce=Lv(Qt,h,fn,C,Z(),He,W,B,st,X,F,Jt,T,B._startClamp&&"_startClamp")||(d?-.001:0),ti(Pt)&&(Pt=Pt(B)),zi(Pt)&&!Pt.indexOf("+=")&&(~Pt.indexOf(" ")?Pt=(zi(Qt)?Qt.split(" ")[0]:"")+Pt:(jt=qu(Pt.substr(2),fn),Pt=zi(Qt)?Qt:(T?ze.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,ce):ce)+jt,Yn=h)),Pt=bv(Pt,"end",B),De=Math.max(ce,Lv(Pt||(Yn?"100% 0":Jt),Yn,fn,C,Z()+jt,ve,k,B,st,X,F,Jt,T,B._endClamp&&"_endClamp"))||-.001,jt=0,En=Ki;En--;)G=pt[En]||{},j=G.pin,j&&G.start-G._pinPush<=ce&&!T&&G.end>0&&(bn=G.end-(B._startClamp?Math.max(0,G.start):G.start),(j===h&&G.start-G._pinPush<ce||j===qn)&&isNaN(Qt)&&(jt+=bn*(1-G.progress)),j===d&&(Ft+=bn));if(ce+=jt,De+=jt,B._startClamp&&(B._startClamp+=jt),B._endClamp&&!pi&&(B._endClamp=De||-.001,De=Math.min(De,Pr(w,C))),Be=De-ce||(ce-=.01)&&.001,Tn&&(V=ze.utils.clamp(0,1,ze.utils.normalize(ce,De,ae))),B._pinPush=Ft,He&&jt&&(bn={},bn[C.a]="+="+jt,qn&&(bn[C.p]="-="+Z()),ze.set([He,ve],bn)),d&&!(Gp&&B.end>=Pr(w,C)))bn=tr(d),Qa=C===gn,Hr=Z(),ye=parseFloat($(C.a))+Ft,!Jt&&De>1&&(Me=(P?Nt.scrollingElement||Hi:w).style,Me={style:Me,value:Me["overflow"+C.a.toUpperCase()]},P&&tr(It)["overflow"+C.a.toUpperCase()]!=="scroll"&&(Me.style["overflow"+C.a.toUpperCase()]="scroll")),Np(d,H,bn),b=Wu(d),In=Kr(d,!0),Q=F&&Qr(w,Qa?jn:gn)(),g?(Ue=[g+C.os2,Be+Ft+Cn],Ue.t=H,En=g===vn?$u(d,C)+Be+Ft:0,En&&(Ue.push(C.d,En+Cn),H.style.flexBasis!=="auto"&&(H.style.flexBasis=En+Cn)),vo(Ue),qn&&pt.forEach(function(Oe){Oe.pin===qn&&Oe.vars.pinSpacing!==!1&&(Oe._subPinOffset=!0)}),F&&Z(ae)):(En=$u(d,C),En&&H.style.flexBasis!=="auto"&&(H.style.flexBasis=En+Cn)),F&&(D={top:In.top+(Qa?Hr-ce:Q)+Cn,left:In.left+(Qa?Q:Hr-ce)+Cn,boxSizing:"border-box",position:"fixed"},D[_a]=D["max"+xo]=Math.ceil(In.width)+Cn,D[ya]=D["max"+Jp]=Math.ceil(In.height)+Cn,D[er]=D[er+$l]=D[er+Jl]=D[er+ec]=D[er+jl]="0",D[vn]=bn[vn],D[vn+$l]=bn[vn+$l],D[vn+Jl]=bn[vn+Jl],D[vn+ec]=bn[vn+ec],D[vn+jl]=bn[vn+jl],U=I1(me,D,M),pi&&Z(0)),r?(q=r._initted,Bp(1),r.render(r.duration(),!0,!0),fe=$(C.a)-ye+Be+Ft,ue=Math.abs(Be-fe)>1,F&&ue&&U.splice(U.length-2,2),r.render(0,!0,!0),q||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),Bp(0)):fe=Be,Me&&(Me.value?Me.style["overflow"+C.a.toUpperCase()]=Me.value:Me.style.removeProperty("overflow-"+C.a));else if(h&&Z()&&!T)for(In=h.parentNode;In&&In!==It;)In._pinOffset&&(ce-=In._pinOffset,De-=In._pinOffset),In=In.parentNode;xe&&xe.forEach(function(Oe){return Oe.revert(!1,!0)}),B.start=ce,B.end=De,pe=Re=pi?ae:Z(),!T&&!pi&&(pe<ae&&Z(ae),B.scroll.rec=0),B.revert(!1,!0),Y=ei(),Se&&(Ce=-1,Se.restart(!0)),$n=0,r&&R&&(r._initted||te)&&r.progress()!==te&&r.progress(te||0,!0).render(r.time(),!0,!0),(Tn||V!==B.progress||T||v||r&&!r._initted)&&(r&&!R&&(r._initted||V||r.vars.immediateRender!==!1)&&r.totalProgress(T&&ce<-.001&&!V?ze.utils.normalize(ce,De,0):V,!0),B.progress=Tn||(pe-ce)/Be===V?0:V),d&&g&&(H._pinOffset=Math.round(B.progress*fe)),z&&z.invalidate(),isNaN(_e)||(_e-=ze.getProperty(W,C.p),ke-=ze.getProperty(k,C.p),Xu(W,C,_e),Xu(He,C,_e-(nt||0)),Xu(k,C,ke),Xu(ve,C,ke-(nt||0))),Tn&&!pi&&B.update(),u&&!pi&&!Ie&&(Ie=!0,u(B),Ie=!1)}},B.getVelocity=function(){return(Z()-Re)/(ei()-Wl)*1e3||0},B.endAnimation=function(){Vl(B.callbackAnimation),r&&(z?z.progress(1):r.paused()?R||Vl(r,B.direction<0,1):Vl(r,r.reversed()))},B.labelToScroll=function(Ee){return r&&r.labels&&(ce||B.refresh()||ce)+r.labels[Ee]/r.duration()*Be||0},B.getTrailing=function(Ee){var tt=pt.indexOf(B),Qe=B.direction>0?pt.slice(0,tt).reverse():pt.slice(tt+1);return(zi(Ee)?Qe.filter(function(nt){return nt.vars.preventOverlaps===Ee}):Qe).filter(function(nt){return B.direction>0?nt.end<=ce:nt.start>=De})},B.update=function(Ee,tt,Qe){if(!(T&&!Qe&&!Ee)){var nt=pi===!0?ae:B.scroll(),fn=Ee?0:(nt-ce)/Be,st=fn<0?0:fn>1?1:fn||0,Jt=B.progress,Tn,jt,Ft,Pt,Yn,Qt,qn,Ki;if(tt&&(Re=pe,pe=T?Z():nt,_&&(et=Ae,Ae=r&&!R?r.totalProgress():st)),p&&d&&!$n&&!Ou&&nr&&(!st&&ce<nt+(nt-Re)/(ei()-Wl)*p?st=1e-4:st===1&&De>nt+(nt-Re)/(ei()-Wl)*p&&(st=.9999)),st!==Jt&&B.enabled){if(Tn=B.isActive=!!st&&st<1,jt=!!Jt&&Jt<1,Qt=Tn!==jt,Yn=Qt||!!st!=!!Jt,B.direction=st>Jt?1:-1,B.progress=st,Yn&&!$n&&(Ft=st&&!Jt?0:st===1?1:Jt===1?2:3,R&&(Pt=!Qt&&O[Ft+1]!=="none"&&O[Ft+1]||O[Ft],Ki=r&&(Pt==="complete"||Pt==="reset"||Pt in r))),S&&(Qt||Ki)&&(Ki||f||!r)&&(ti(S)?S(B):B.getTrailing(S).forEach(function(Hr){return Hr.endAnimation()})),R||(z&&!$n&&!Ou?(z._dp._time-z._start!==z._time&&z.render(z._dp._time-z._start),z.resetTo?z.resetTo("totalProgress",st,r._tTime/r._tDur):(z.vars.totalProgress=st,z.invalidate().restart())):r&&r.totalProgress(st,!!($n&&(Y||Ee)))),d){if(Ee&&g&&(H.style[g+C.os2]=Ge),!F)J(Yl(ye+fe*st));else if(Yn){if(qn=!Ee&&st>Jt&&De+1>nt&&nt+1>=Pr(w,C),M)if(!Ee&&(Tn||qn)){var En=Kr(d,!0),bn=nt-ce;Fv(d,It,En.top+(C===gn?bn:0)+Cn,En.left+(C===gn?0:bn)+Cn)}else Fv(d,H);vo(Tn||qn?U:b),ue&&st<1&&Tn||J(ye+(st===1&&!qn?fe:0))}}_&&!ie.tween&&!$n&&!Ou&&Se.restart(!0),o&&(Qt||A&&st&&(st<1||!Up))&&nc(o.targets).forEach(function(Hr){return Hr.classList[Tn||A?"add":"remove"](o.className)}),a&&!R&&!Ee&&a(B),Yn&&!$n?(R&&(Ki&&(Pt==="complete"?r.pause().totalProgress(1):Pt==="reset"?r.restart(!0).pause():Pt==="restart"?r.restart(!0):r[Pt]()),a&&a(B)),(Qt||!Up)&&(c&&Qt&&uo(B,c),N[Ft]&&uo(B,N[Ft]),A&&(st===1?B.kill(!1,1):N[Ft]=0),Qt||(Ft=st===1?1:3,N[Ft]&&uo(B,N[Ft]))),y&&!Tn&&Math.abs(B.getVelocity())>(ql(y)?y:2500)&&(Vl(B.callbackAnimation),z?z.progress(1):Vl(r,Pt==="reverse"?1:!st,1))):R&&a&&!$n&&a(B)}if(Le){var In=T?nt/T.duration()*(T._caScrollDist||0):nt;oe(In+(W._isFlipped?1:0)),Le(In)}Fe&&Fe(-nt/T.duration()*(T._caScrollDist||0))}},B.enable=function(Ee,tt){B.enabled||(B.enabled=!0,Ln(w,"resize",Ql),P||Ln(w,"scroll",fo),re&&Ln(i,"refreshInit",re),Ee!==!1&&(B.progress=V=0,pe=Re=Ce=Z()),tt!==!1&&B.refresh())},B.getTween=function(Ee){return Ee&&ie?ie.tween:z},B.setPositions=function(Ee,tt,Qe,nt){if(T){var fn=T.scrollTrigger,st=T.duration(),Jt=fn.end-fn.start;Ee=fn.start+Jt*Ee/st,tt=fn.start+Jt*tt/st}B.refresh(!1,!1,{start:wv(Ee,Qe&&!!B._startClamp),end:wv(tt,Qe&&!!B._endClamp)},nt),B.update()},B.adjustPinSpacing=function(Ee){if(Ue&&Ee){var tt=Ue.indexOf(C.d)+1;Ue[tt]=parseFloat(Ue[tt])+Ee+Cn,Ue[1]=parseFloat(Ue[1])+Ee+Cn,vo(Ue)}},B.disable=function(Ee,tt){if(Ee!==!1&&B.revert(!0,!0),B.enabled&&(B.enabled=B.isActive=!1,tt||z&&z.pause(),ae=0,ne&&(ne.uncache=1),re&&Un(i,"refreshInit",re),Se&&(Se.pause(),ie.tween&&ie.tween.kill()&&(ie.tween=0)),!P)){for(var Qe=pt.length;Qe--;)if(pt[Qe].scroller===w&&pt[Qe]!==B)return;Un(w,"resize",Ql),P||Un(w,"scroll",fo)}},B.kill=function(Ee,tt){B.disable(Ee,tt),z&&!tt&&z.kill(),l&&delete Vp[l];var Qe=pt.indexOf(B);Qe>=0&&pt.splice(Qe,1),Qe===di&&Zu>0&&di--,Qe=0,pt.forEach(function(nt){return nt.scroller===B.scroller&&(Qe=1)}),Qe||pi||(B.scroll.rec=0),r&&(r.scrollTrigger=null,Ee&&r.revert({kill:!1}),tt||r.kill()),He&&[He,ve,W,k].forEach(function(nt){return nt.parentNode&&nt.parentNode.removeChild(nt)}),tc===B&&(tc=0),d&&(ne&&(ne.uncache=1),Qe=0,pt.forEach(function(nt){return nt.pin===d&&Qe++}),Qe||(ne.spacer=0)),n.onKill&&n.onKill(B)},pt.push(B),B.enable(!1,!1),qe&&qe(B),r&&r.add&&!Be){var ct=B.update;B.update=function(){B.update=ct,dt.cache++,ce||De||B.refresh()},ze.delayedCall(.01,B.update),Be=.01,ce=De=0}else B.refresh();d&&R1()},i.register=function(n){return po||(ze=n||Yv(),Xv()&&window.document&&i.enable(),po=Xl),po},i.defaults=function(n){if(n)for(var r in n)Gu[r]=n[r];return Gu},i.disable=function(n,r){Xl=0,pt.forEach(function(a){return a[r?"kill":"disable"](n)}),Un(mt,"wheel",fo),Un(Nt,"scroll",fo),clearInterval(Nu),Un(Nt,"touchcancel",Dr),Un(It,"touchstart",Dr),zu(Un,Nt,"pointerdown,touchstart,mousedown",Cv),zu(Un,Nt,"pointerup,touchend,mouseup",Rv),ju.kill(),ku(Un);for(var s=0;s<dt.length;s+=3)Hu(Un,dt[s],dt[s+1]),Hu(Un,dt[s],dt[s+2])},i.enable=function(){if(mt=window,Nt=document,Hi=Nt.documentElement,It=Nt.body,ze){if(nc=ze.utils.toArray,Zl=ze.utils.clamp,Hp=ze.core.context||Dr,Bp=ze.core.suppressOverwrites||Dr,qp=mt.history.scrollRestoration||"auto",Wp=mt.pageYOffset||0,ze.core.globals("ScrollTrigger",i),It){Xl=1,go=document.createElement("div"),go.style.height="100vh",go.style.position="absolute",nx(),S1(),un.register(ze),i.isTouch=un.isTouch,bs=un.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),zp=un.isTouch===1,Ln(mt,"wheel",fo),Yp=[mt,Nt,Hi,It],ze.matchMedia?(i.matchMedia=function(u){var f=ze.matchMedia(),h;for(h in u)f.add(h,u[h]);return f},ze.addEventListener("matchMediaInit",function(){ex(),$p()}),ze.addEventListener("matchMediaRevert",function(){return $v()}),ze.addEventListener("matchMedia",function(){xa(0,1),Ta("matchMedia")}),ze.matchMedia().add("(orientation: portrait)",function(){return Fp(),Fp})):console.warn("Requires GSAP 3.11.0 or later"),Fp(),Ln(Nt,"scroll",fo);var n=It.hasAttribute("style"),r=It.style,s=r.borderTopStyle,a=ze.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",o=Kr(It),gn.m=Math.round(o.top+gn.sc())||0,jn.m=Math.round(o.left+jn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(It.setAttribute("style",""),It.removeAttribute("style")),Nu=setInterval(Iv,250),ze.delayedCall(.5,function(){return Ou=0}),Ln(Nt,"touchcancel",Dr),Ln(It,"touchstart",Dr),zu(Ln,Nt,"pointerdown,touchstart,mousedown",Cv),zu(Ln,Nt,"pointerup,touchend,mouseup",Rv),kp=ze.utils.checkPrefix("transform"),Ku.push(kp),po=ei(),ju=ze.delayedCall(.2,xa).pause(),mo=[Nt,"visibilitychange",function(){var u=mt.innerWidth,f=mt.innerHeight;Nt.hidden?(Tv=u,Ev=f):(Tv!==u||Ev!==f)&&Ql()},Nt,"DOMContentLoaded",xa,mt,"load",xa,mt,"resize",Ql],ku(Ln),pt.forEach(function(u){return u.enable(0,1)}),l=0;l<dt.length;l+=3)Hu(Un,dt[l],dt[l+1]),Hu(Un,dt[l],dt[l+2])}else if(Nt){var c=function u(){i.enable(),Nt.removeEventListener("DOMContentLoaded",u)};Nt.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(Up=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Nu)||(Nu=r)&&setInterval(Iv,r),"ignoreMobileResize"in n&&(zp=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ku(Un)||ku(Ln,n.autoRefreshEvents||"none"),Gv=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=hi(n),a=dt.indexOf(s),o=Sa(s);~a&&dt.splice(a,o?6:2),r&&(o?pr.unshift(mt,r,It,r,Hi,r):pr.unshift(s,r))},i.clearMatchMedia=function(n){pt.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var a=(zi(n)?hi(n):n).getBoundingClientRect(),o=a[s?_a:ya]*r||0;return s?a.right-o>0&&a.left+o<mt.innerWidth:a.bottom-o>0&&a.top+o<mt.innerHeight},i.positionInViewport=function(n,r,s){zi(n)&&(n=hi(n));var a=n.getBoundingClientRect(),o=a[s?_a:ya],l=r==null?o/2:r in eh?eh[r]*o:~r.indexOf("%")?parseFloat(r)*o/100:parseFloat(r)||0;return s?(a.left+l)/mt.innerWidth:(a.top+l)/mt.innerHeight},i.killAll=function(n){if(pt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Ma.killAll||[];Ma={},r.forEach(function(s){return s()})}},i}();lt.version="3.15.0";lt.saveStyles=function(i){return i?nc(i).forEach(function(e){if(e&&e.style){var t=ki.indexOf(e);t>=0&&ki.splice(t,5),ki.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),ze.core.getCache(e),Hp())}}):ki};lt.revert=function(i,e){return $p(!i,e)};lt.create=function(i,e){return new lt(i,e)};lt.refresh=function(i){return i?Ql(!0):(po||lt.register())&&xa(!0)};lt.update=function(i){return++dt.cache&&Jr(i===!0?2:0)};lt.clearScrollMemory=tx;lt.maxScroll=function(i,e){return Pr(i,e?jn:gn)};lt.getScrollFunc=function(i,e){return Qr(hi(i),e?jn:gn)};lt.getById=function(i){return Vp[i]};lt.getAll=function(){return pt.filter(function(i){return i.vars.id!=="ScrollSmoother"})};lt.isScrolling=function(){return!!nr};lt.snapDirectional=jp;lt.addEventListener=function(i,e){var t=Ma[i]||(Ma[i]=[]);~t.indexOf(e)||t.push(e)};lt.removeEventListener=function(i,e){var t=Ma[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};lt.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var f=[],h=[],d=ze.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&ti(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return ti(s)&&(s=s(),Ln(lt,"refresh",function(){return s=e.batchMax()})),nc(i).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(lt.create(c))}),t};var Ov=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Op=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(un.isTouch?" pinch-zoom":""):"none",e===Hi&&i(It,t)},Yu={auto:1,scroll:1},U1=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||ze.core.getCache(s),o=ei(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==It&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Yu[(l=tr(s)).overflowY]||Yu[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Sa(s)&&(Yu[(l=tr(s)).overflowY]||Yu[l.overflowX]),a._isScrollT=o}(a._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},rx=function(e,t,n,r){return un.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&U1,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&Ln(Nt,un.eventTypes[0],zv,!1,!0)},onDisable:function(){return Un(Nt,un.eventTypes[0],zv,!0)}})},L1=/(input|label|select|textarea)/i,kv,zv=function(e){var t=L1.test(e.target.tagName);(t||kv)&&(e._gsapAllow=!0,kv=t)},F1=function(e){va(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=hi(e.target)||Hi,u=ze.core.globals().ScrollSmoother,f=u&&u.get(),h=bs&&(e.content&&hi(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=Qr(c,gn),g=Qr(c,jn),v=1,p=(un.isTouch&&mt.visualViewport?mt.visualViewport.scale*mt.visualViewport.width:mt.outerWidth)/mt.innerWidth,m=0,x=ti(r)?function(){return r(o)}:function(){return r||2.8},A,_,M=rx(c,e.type,!0,s),E=function(){return _=!1},T=Dr,y=Dr,S=function(){l=Pr(c,gn),y=Zl(bs?1:0,l),n&&(T=Zl(0,Pr(c,jn))),A=Aa},C=function(){h._gsap.y=Yl(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},R=function(){if(_){requestAnimationFrame(E);var K=Yl(o.deltaY/2),X=y(d.v-K);if(h&&X!==d.v+d.offset){d.offset=X-d.v;var B=Yl((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+B+", 0, 1)",h._gsap.y=B+"px",d.cacheID=dt.cache,Jr()}return!0}d.offset&&C(),_=!0},w,I,P,F,N=function(){S(),w.isActive()&&w.vars.scrollY>l&&(d()>l?w.progress(1)&&d(l):w.resetTo("scrollY",l))};return h&&ze.set(h,{y:"+=0"}),e.ignoreCheck=function(O){return bs&&O.type==="touchmove"&&R(O)||v>1.05&&O.type!=="touchstart"||o.isGesturing||O.touches&&O.touches.length>1},e.onPress=function(){_=!1;var O=v;v=Yl((mt.visualViewport&&mt.visualViewport.scale||1)/p),w.pause(),O!==v&&Op(c,v>1.01?!0:n?!1:"x"),I=g(),P=d(),S(),A=Aa},e.onRelease=e.onGestureStart=function(O,K){if(d.offset&&C(),!K)F.restart(!0);else{dt.cache++;var X=x(),B,re;n&&(B=g(),re=B+X*.05*-O.velocityX/.227,X*=Ov(g,B,re,Pr(c,jn)),w.vars.scrollX=T(re)),B=d(),re=B+X*.05*-O.velocityY/.227,X*=Ov(d,B,re,Pr(c,gn)),w.vars.scrollY=y(re),w.invalidate().duration(X).play(.01),(bs&&w.vars.scrollY>=l||B>=l-1)&&ze.to({},{onUpdate:N,duration:X})}a&&a(O)},e.onWheel=function(){w._ts&&w.pause(),ei()-m>1e3&&(A=0,m=ei())},e.onChange=function(O,K,X,B,re){if(Aa!==A&&S(),K&&n&&g(T(B[2]===K?I+(O.startX-O.x):g()+K-B[1])),X){d.offset&&C();var se=re[2]===X,Te=se?P+O.startY-O.y:d()+X-re[1],Ce=y(Te);se&&Te!==Ce&&(P+=Ce-Te),d(Ce)}(X||K)&&Jr()},e.onEnable=function(){Op(c,n?!1:"x"),lt.addEventListener("refresh",N),Ln(mt,"resize",N),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),M.enable()},e.onDisable=function(){Op(c,!0),Un(mt,"resize",N),lt.removeEventListener("refresh",N),M.kill()},e.lockAxis=e.lockAxis!==!1,o=new un(e),o.iOS=bs,bs&&!d()&&d(1),bs&&ze.ticker.add(Dr),F=o._dc,w=ze.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:ix(d,d(),function(){return w.pause()})},onUpdate:Jr,onComplete:F.vars.onComplete}),o};lt.sort=function(i){if(ti(i))return pt.sort(i);var e=mt.pageYOffset||0;return lt.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+mt.innerHeight}),pt.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};lt.observe=function(i){return new un(i)};lt.normalizeScroll=function(i){if(typeof i>"u")return fi;if(i===!0&&fi)return fi.enable();if(i===!1){fi&&fi.kill(),fi=i;return}var e=i instanceof un?i:F1(i);return fi&&fi.target===e.target&&fi.kill(),Sa(e.target)&&(fi=e),e};lt.core={_getVelocityProp:Fu,_inputObserver:rx,_scrollers:dt,_proxies:pr,bridge:{ss:function(){nr||Ta("scrollStart"),nr=ei()},ref:function(){return $n}}};Yv()&&ze.registerPlugin(lt);var rc,sc,sx=typeof Symbol=="function"?Symbol():"_split",tm,N1=()=>tm||ih.register(window.gsap),ax=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter:0,ac=i=>i?typeof i=="string"?ac(document.querySelectorAll(i)):"length"in i?Array.from(i).reduce((e,t)=>(typeof t=="string"?e.push(...ac(t)):e.push(t),e),[]):[i]:[],ox=i=>ac(i).filter(e=>e&&e.nodeType===1),nm=[],em=function(){},O1={add:i=>i()},k1=/\s+/g,lx=new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.","gu"),nh={left:0,top:0,width:0,height:0},z1=(i,e)=>{for(;++e<i.length&&i[e]===nh;);return i[e]||nh},cx=({element:i,html:e,ariaL:t,ariaH:n})=>{i.innerHTML=e,t?i.setAttribute("aria-label",t):i.removeAttribute("aria-label"),n?i.setAttribute("aria-hidden",n):i.removeAttribute("aria-hidden")},ux=(i,e)=>{if(e){let t=new Set(i.join("").match(e)||nm),n=i.length,r,s,a,o;if(t.size)for(;--n>-1;){s=i[n];for(a of t)if(a.startsWith(s)&&a.length>s.length){for(r=0,o=s;a.startsWith(o+=i[n+ ++r])&&o.length<a.length;);if(r&&o.length===a.length){i[n]=a,i.splice(n+1,r);break}}}}return i},hx=i=>window.getComputedStyle(i).display==="inline"&&(i.style.display="inline-block"),_o=(i,e,t)=>e.insertBefore(typeof i=="string"?document.createTextNode(i):i,t),im=(i,e,t)=>{let n=e[i+"sClass"]||"",{tag:r="div",aria:s="auto",propIndex:a=!1}=e,o=i==="line"?"block":"inline-block",l=n.indexOf("++")>-1,c=u=>{let f=document.createElement(r),h=t.length+1;return n&&(f.className=n+(l?" "+n+h:"")),a&&f.style.setProperty("--"+i,h+""),s!=="none"&&f.setAttribute("aria-hidden","true"),r!=="span"&&(f.style.position="relative",f.style.display=o),f.textContent=u,t.push(f),f};return l&&(n=n.replace("++","")),c.collection=t,c},H1=(i,e,t,n)=>{let r=im("line",t,n),s=window.getComputedStyle(i).textAlign||"left";return(a,o)=>{let l=r("");for(l.style.textAlign=s,i.insertBefore(l,e[a]);a<o;a++)l.appendChild(e[a]);l.normalize()}},fx=(i,e,t,n,r,s,a,o,l,c)=>{var u;let f=Array.from(i.childNodes),h=0,{wordDelimiter:d,reduceWhiteSpace:g=!0,prepareText:v}=e,p=i.getBoundingClientRect(),m=p,x=!g&&window.getComputedStyle(i).whiteSpace.substring(0,3)==="pre",A=0,_=t.collection,M,E,T,y,S,C,R,w,I,P,F,N,O,K,X,B,re,se;for(typeof d=="object"?(T=d.delimiter||d,E=d.replaceWith||""):E=d===""?"":d||" ",M=E!==" ";h<f.length;h++)if(y=f[h],y.nodeType===3){for(X=y.textContent||"",g?X=X.replace(k1," "):x&&(X=X.replace(/\n/g,E+`
`)),v&&(X=v(X,i)),y.textContent=X,S=E||T?X.split(T||E):X.match(o)||nm,re=S[S.length-1],w=M?re.slice(-1)===" ":!re,re||S.pop(),m=p,R=M?S[0].charAt(0)===" ":!S[0],R&&_o(" ",i,y),S[0]||S.shift(),ux(S,l),s&&c||(y.textContent=""),I=1;I<=S.length;I++)if(B=S[I-1],!g&&x&&B.charAt(0)===`
`&&((u=y.previousSibling)==null||u.remove(),_o(document.createElement("br"),i,y),B=B.slice(1)),!g&&B==="")_o(E,i,y);else if(B===" ")i.insertBefore(document.createTextNode(" "),y);else{if(M&&B.charAt(0)===" "&&_o(" ",i,y),A&&I===1&&!R&&_.indexOf(A.parentNode)>-1?(C=_[_.length-1],C.appendChild(document.createTextNode(n?"":B))):(C=t(n?"":B),_o(C,i,y),A&&I===1&&!R&&C.insertBefore(A,C.firstChild)),n)for(F=ax?ux([...ax.segment(B)].map(Te=>Te.segment),l):B.match(o)||nm,se=0;se<F.length;se++)C.appendChild(F[se]===" "?document.createTextNode(" "):n(F[se]));if(s&&c){if(X=y.textContent=X.substring(B.length+1,X.length),P=C.getBoundingClientRect(),P.top>m.top&&P.left<=m.left){for(N=i.cloneNode(),O=i.childNodes[0];O&&O!==C;)K=O,O=O.nextSibling,N.appendChild(K);i.parentNode.insertBefore(N,i),r&&hx(N)}m=P}(I<S.length||w)&&_o(I>=S.length?" ":M&&B.slice(-1)===" "?" "+E:E,i,y)}i.removeChild(y),A=0}else y.nodeType===1&&(a&&a.indexOf(y)>-1?(_.indexOf(y.previousSibling)>-1&&_[_.length-1].appendChild(y),A=y):(fx(y,e,t,n,r,s,a,o,l,!0),A=0),r&&hx(y))},dx=class px{constructor(e,t){this.isSplit=!1,N1(),this.elements=ox(e),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=t,this.elements.forEach(a=>{var o;t.overwrite!==!1&&((o=a[sx])==null||o._data.orig.filter(({element:l})=>l===a).forEach(cx)),a[sx]=this}),this._split=()=>this.isSplit&&this.split(this.vars);let n=[],r,s=()=>{let a=n.length,o;for(;a--;){o=n[a];let l=o.element.offsetWidth;if(l!==o.width){o.width=l,this._split();return}}};this._data={orig:n,obs:typeof ResizeObserver<"u"&&new ResizeObserver(()=>{clearTimeout(r),r=setTimeout(s,200)})},em(this),this.split(t)}split(e){return(this._ctx||O1).add(()=>{this.isSplit&&this.revert(),this.vars=e=e||this.vars||{};let{type:t="chars,words,lines",aria:n="auto",deepSlice:r=!0,smartWrap:s,onSplit:a,autoSplit:o=!1,specialChars:l,mask:c}=this.vars,u=t.indexOf("lines")>-1,f=t.indexOf("chars")>-1,h=t.indexOf("words")>-1,d=f&&!h&&!u,g=l&&("push"in l?new RegExp("(?:"+l.join("|")+")","gu"):l),v=g?new RegExp(g.source+"|"+lx.source,"gu"):lx,p=!!e.ignore&&ox(e.ignore),{orig:m,animTime:x,obs:A}=this._data,_;(f||h||u)&&(this.elements.forEach((M,E)=>{m[E]={element:M,html:M.innerHTML,ariaL:M.getAttribute("aria-label"),ariaH:M.getAttribute("aria-hidden")},n==="auto"?M.setAttribute("aria-label",(M.textContent||"").trim()):n==="hidden"&&M.setAttribute("aria-hidden","true");let T=[],y=[],S=[],C=f?im("char",e,T):null,R=im("word",e,y),w,I,P,F;if(fx(M,e,R,C,d,r&&(u||d),p,v,g,!1),u){let N=ac(M.childNodes),O=H1(M,N,e,S),K,X=[],B=0,re=N.map(Ce=>Ce.nodeType===1?Ce.getBoundingClientRect():nh),se=nh,Te;for(w=0;w<N.length;w++)K=N[w],K.nodeType===1&&(K.nodeName==="BR"?((!w||N[w-1].nodeName!=="BR")&&(X.push(K),O(B,w+1)),B=w+1,se=z1(re,w)):(Te=re[w],w&&Te.top>se.top&&Te.left<se.left+se.width-1&&(O(B,w),B=w),se=Te));B<w&&O(B,w),X.forEach(Ce=>{var Y;return(Y=Ce.parentNode)==null?void 0:Y.removeChild(Ce)})}if(!h){for(w=0;w<y.length;w++)if(I=y[w],f||!I.nextSibling||I.nextSibling.nodeType!==3)if(s&&!u){for(P=document.createElement("span"),P.style.whiteSpace="nowrap";I.firstChild;)P.appendChild(I.firstChild);I.replaceWith(P)}else I.replaceWith(...I.childNodes);else F=I.nextSibling,F&&F.nodeType===3&&(F.textContent=(I.textContent||"")+(F.textContent||""),I.remove());y.length=0,M.normalize()}this.lines.push(...S),this.words.push(...y),this.chars.push(...T)}),c&&this[c]&&this.masks.push(...this[c].map(M=>{let E=M.cloneNode();return M.replaceWith(E),E.appendChild(M),M.className&&(E.className=M.className.trim().split(" ").map(T=>T+"-mask").join(" ")),E.style.overflow="clip",E}))),this.isSplit=!0,sc&&u&&o&&sc.addEventListener("loadingdone",this._split),(_=a&&a(this))&&_.totalTime&&(this._data.anim=x?_.totalTime(x):_),u&&o&&this.elements.forEach((M,E)=>{m[E].width=M.offsetWidth,A&&A.observe(M)})}),this}kill(){let{obs:e}=this._data;e&&e.disconnect(),sc?.removeEventListener("loadingdone",this._split)}revert(){var e,t;if(this.isSplit){let{orig:n,anim:r}=this._data;this.kill(),n.forEach(cx),this.chars.length=this.words.length=this.lines.length=n.length=this.masks.length=0,this.isSplit=!1,r&&(this._data.animTime=r.totalTime(),r.revert()),(t=(e=this.vars).onRevert)==null||t.call(e,this)}return this}static create(e,t){return new px(e,t)}static register(e){rc=rc||e||window.gsap,rc&&(ac=rc.utils.toArray,em=rc.core.context||em),!tm&&window.innerWidth>0&&(sc=document.fonts,tm=!0)}};dx.version="3.15.0";var ih=dx;var Wn="183";var Ox=0,Fm=1,kx=2;var kc=1,zx=2,Jo=3,Di=0,tn=1,mn=2,Ut=0,Da=1,zc=2,Nm=3,Om=4,Hx=5;var Bs=100,Gx=101,Vx=102,Wx=103,Xx=104,Yx=200,qx=201,Qx=202,Zx=203,Ph=204,Ih=205,Kx=206,Jx=207,jx=208,$x=209,e_=210,t_=211,n_=212,i_=213,r_=214,Bh=0,zo=1,Uh=2,Pa=3,Lh=4,Fh=5,Nh=6,Oh=7,km=0,s_=1,a_=2,Yi=0,zm=1,Hm=2,Gm=3,Vm=4,Wm=5,Xm=6,Ym=7;var qm=300,Ns=301,La=302,cf=303,uf=304,Hc=306,Ho=1e3,Br=1001,kh=1002,Ct=1003,o_=1004;var Gc=1005;var Gt=1006,hf=1007;var Fr=1008;var xt=1009,jo=1010,Vc=1011,Os=1012,ks=1013,An=1014,nn=1015,ri=1016,ff=1017,df=1018,Nr=1020,Qm=35902,Zm=35899,Km=1021,Jm=1022,Sn=1023,rr=1026,ar=1027,zs=1028,$o=1029,os=1030,Hs=1031;var Gs=1033,Wc=33776,Xc=33777,Yc=33778,qc=33779,pf=35840,mf=35841,gf=35842,vf=35843,xf=36196,_f=37492,yf=37496,Af=37488,Sf=37489,Mf=37490,Tf=37491,Ef=37808,bf=37809,wf=37810,Cf=37811,Rf=37812,Df=37813,Pf=37814,If=37815,Bf=37816,Uf=37817,Lf=37818,Ff=37819,Nf=37820,Of=37821,kf=36492,zf=36494,Hf=36495,Gf=36283,Vf=36284,Wf=36285,Xf=36286;var xc=2300,zh=2301,Dh=2302,Dm=2303,Pm=2400,Im=2401,Bm=2402;var _i=3200;var jm=0,l_=1,yi="",it="srgb",Pi="srgb-linear",_c="linear",Bt="srgb";var Ra=7680;var Um=519,c_=512,u_=513,h_=514,Yf=515,f_=516,d_=517,qf=518,p_=519,Hh=35044,Vs=35048;var Qc="300 es",_r=2e3,yc=2001;function G1(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function V1(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ac(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function m_(){let i=Ac("canvas");return i.style.display="block",i}var mx={},Go=null;function Sc(...i){let e="THREE."+i.shift();Go?Go("log",e,...i):console.log(e,...i)}function g_(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Je(...i){i=g_(i);let e="THREE."+i.shift();if(Go)Go("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ke(...i){i=g_(i);let e="THREE."+i.shift();if(Go)Go("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Mc(...i){let e=i.join(" ");e in mx||(mx[e]=!0,Je(...i))}function v_(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var x_={[Bh]:zo,[Uh]:Nh,[Lh]:Oh,[Pa]:Fh,[zo]:Bh,[Nh]:Uh,[Oh]:Lh,[Fh]:Pa},gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},ni=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],gx=1234567,gc=Math.PI/180,Vo=180/Math.PI;function is(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ni[i&255]+ni[i>>8&255]+ni[i>>16&255]+ni[i>>24&255]+"-"+ni[e&255]+ni[e>>8&255]+"-"+ni[e>>16&15|64]+ni[e>>24&255]+"-"+ni[t&63|128]+ni[t>>8&255]+"-"+ni[t>>16&255]+ni[t>>24&255]+ni[n&255]+ni[n>>8&255]+ni[n>>16&255]+ni[n>>24&255]).toLowerCase()}function rt(i,e,t){return Math.max(e,Math.min(t,i))}function $m(i,e){return(i%e+e)%e}function W1(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function X1(i,e,t){return i!==e?(t-i)/(e-i):0}function vc(i,e,t){return(1-t)*i+t*e}function Y1(i,e,t,n){return vc(i,e,1-Math.exp(-t*n))}function q1(i,e=1){return e-Math.abs($m(i,e*2)-e)}function Q1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Z1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function K1(i,e){return i+Math.floor(Math.random()*(e-i+1))}function J1(i,e){return i+Math.random()*(e-i)}function j1(i){return i*(.5-Math.random())}function $1(i){i!==void 0&&(gx=i);let e=gx+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function eM(i){return i*gc}function tM(i){return i*Vo}function nM(i){return(i&i-1)===0&&i!==0}function iM(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function rM(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function sM(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),f=s((e-n)/2),h=a((e-n)/2),d=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*d,o*u,o*c);break;default:Je("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function xr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var or={DEG2RAD:gc,RAD2DEG:Vo,generateUUID:is,clamp:rt,euclideanModulo:$m,mapLinear:W1,inverseLerp:X1,lerp:vc,damp:Y1,pingpong:q1,smoothstep:Q1,smootherstep:Z1,randInt:K1,randFloat:J1,randFloatSpread:j1,seededRandom:$1,degToRad:eM,radToDeg:tM,isPowerOfTwo:nM,ceilPowerOfTwo:iM,floorPowerOfTwo:rM,setQuaternionFromProperEuler:sM,normalize:Ot,denormalize:xr},be=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Vn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3],h=s[a+0],d=s[a+1],g=s[a+2],v=s[a+3];if(f!==v||l!==h||c!==d||u!==g){let p=l*h+c*d+u*g+f*v;p<0&&(h=-h,d=-d,g=-g,v=-v,p=-p);let m=1-o;if(p<.9995){let x=Math.acos(p),A=Math.sin(x);m=Math.sin(m*x)/A,o=Math.sin(o*x)/A,l=l*m+h*o,c=c*m+d*o,u=u*m+g*o,f=f*m+v*o}else{l=l*m+h*o,c=c*m+d*o,u=u*m+g*o,f=f*m+v*o;let x=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=x,c*=x,u*=x,f*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],h=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-o*d,e[t+2]=c*g+u*d+o*h-l*f,e[t+3]=u*g-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),h=l(n/2),d=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:Je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vx.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vx.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return rm.copy(this).projectOnVector(e),this.sub(rm)}reflect(e){return this.sub(rm.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},rm=new L,vx=new Vn,$e=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],v=r[0],p=r[3],m=r[6],x=r[1],A=r[4],_=r[7],M=r[2],E=r[5],T=r[8];return s[0]=a*v+o*x+l*M,s[3]=a*p+o*A+l*E,s[6]=a*m+o*_+l*T,s[1]=c*v+u*x+f*M,s[4]=c*p+u*A+f*E,s[7]=c*m+u*_+f*T,s[2]=h*v+d*x+g*M,s[5]=h*p+d*A+g*E,s[8]=h*m+d*_+g*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,g=t*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=f*v,e[1]=(r*c-u*n)*v,e[2]=(o*n-r*a)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(sm.makeScale(e,t)),this}rotate(e){return this.premultiply(sm.makeRotation(-e)),this}translate(e,t){return this.premultiply(sm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},sm=new $e,xx=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_x=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function aM(){let i={enabled:!0,workingColorSpace:Pi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Bt&&(r.r=rs(r.r),r.g=rs(r.g),r.b=rs(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Bt&&(r.r=ko(r.r),r.g=ko(r.g),r.b=ko(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===yi?_c:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Mc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Mc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Pi]:{primaries:e,whitePoint:n,transfer:_c,toXYZ:xx,fromXYZ:_x,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:it},outputColorSpaceConfig:{drawingBufferColorSpace:it}},[it]:{primaries:e,whitePoint:n,transfer:Bt,toXYZ:xx,fromXYZ:_x,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:it}}}),i}var At=aM();function rs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ko(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var yo,Gh=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{yo===void 0&&(yo=Ac("canvas")),yo.width=e.width,yo.height=e.height;let r=yo.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=yo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ac("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=rs(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(rs(t[n]/255)*255):t[n]=rs(t[n]);return{data:t,width:e.width,height:e.height}}else return Je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},oM=0,Wo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:oM++}),this.uuid=is(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(am(r[a].image)):s.push(am(r[a]))}else s=am(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function am(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Je("Texture: Unable to serialize Texture."),{})}var lM=0,om=new L,Rn=class i extends gi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Br,r=Br,s=Gt,a=Fr,o=Sn,l=xt,c=i.DEFAULT_ANISOTROPY,u=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lM++}),this.uuid=is(),this.name="",this.source=new Wo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(om).x}get height(){return this.source.getSize(om).y}get depth(){return this.source.getSize(om).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Je(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ho:e.x=e.x-Math.floor(e.x);break;case Br:e.x=e.x<0?0:1;break;case kh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ho:e.y=e.y-Math.floor(e.y);break;case Br:e.y=e.y<0?0:1;break;case kh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=qm;Rn.DEFAULT_ANISOTROPY=1;var St=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,_=(d+1)/2,M=(m+1)/2,E=(u+h)/4,T=(f+v)/4,y=(g+p)/4;return A>_&&A>M?A<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(A),r=E/n,s=T/n):_>M?_<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),n=E/r,s=y/r):M<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),n=T/s,r=y/s),this.set(n,r,s,t),this}let x=Math.sqrt((p-g)*(p-g)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(f-v)/x,this.z=(h-u)/x,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Vh=class extends gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Rn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Wo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},gt=class extends Vh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Tc=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wh=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var je=class i{constructor(e,t,n,r,s,a,o,l,c,u,f,h,d,g,v,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,f,h,d,g,v,p)}set(e,t,n,r,s,a,o,l,c,u,f,h,d,g,v,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ao.setFromMatrixColumn(e,0).length(),s=1/Ao.setFromMatrixColumn(e,1).length(),a=1/Ao.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let h=a*u,d=a*f,g=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,d=l*f,g=c*u,v=c*f;t[0]=h+v*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,d=l*f,g=c*u,v=c*f;t[0]=h-v*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,d=a*f,g=o*u,v=o*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,d=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=g*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-v*f}else if(e.order==="XZY"){let h=a*l,d=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=a*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cM,e,uM)}lookAt(e,t,n){let r=this.elements;return Gi.subVectors(e,t),Gi.lengthSq()===0&&(Gi.z=1),Gi.normalize(),ws.crossVectors(n,Gi),ws.lengthSq()===0&&(Math.abs(n.z)===1?Gi.x+=1e-4:Gi.z+=1e-4,Gi.normalize(),ws.crossVectors(n,Gi)),ws.normalize(),rh.crossVectors(Gi,ws),r[0]=ws.x,r[4]=rh.x,r[8]=Gi.x,r[1]=ws.y,r[5]=rh.y,r[9]=Gi.y,r[2]=ws.z,r[6]=rh.z,r[10]=Gi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],v=n[6],p=n[10],m=n[14],x=n[3],A=n[7],_=n[11],M=n[15],E=r[0],T=r[4],y=r[8],S=r[12],C=r[1],R=r[5],w=r[9],I=r[13],P=r[2],F=r[6],N=r[10],O=r[14],K=r[3],X=r[7],B=r[11],re=r[15];return s[0]=a*E+o*C+l*P+c*K,s[4]=a*T+o*R+l*F+c*X,s[8]=a*y+o*w+l*N+c*B,s[12]=a*S+o*I+l*O+c*re,s[1]=u*E+f*C+h*P+d*K,s[5]=u*T+f*R+h*F+d*X,s[9]=u*y+f*w+h*N+d*B,s[13]=u*S+f*I+h*O+d*re,s[2]=g*E+v*C+p*P+m*K,s[6]=g*T+v*R+p*F+m*X,s[10]=g*y+v*w+p*N+m*B,s[14]=g*S+v*I+p*O+m*re,s[3]=x*E+A*C+_*P+M*K,s[7]=x*T+A*R+_*F+M*X,s[11]=x*y+A*w+_*N+M*B,s[15]=x*S+A*I+_*O+M*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],v=e[7],p=e[11],m=e[15],x=l*d-c*h,A=o*d-c*f,_=o*h-l*f,M=a*d-c*u,E=a*h-l*u,T=a*f-o*u;return t*(v*x-p*A+m*_)-n*(g*x-p*M+m*E)+r*(g*A-v*M+m*T)-s*(g*_-v*E+p*T)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],v=e[13],p=e[14],m=e[15],x=t*o-n*a,A=t*l-r*a,_=t*c-s*a,M=n*l-r*o,E=n*c-s*o,T=r*c-s*l,y=u*v-f*g,S=u*p-h*g,C=u*m-d*g,R=f*p-h*v,w=f*m-d*v,I=h*m-d*p,P=x*I-A*w+_*R+M*C-E*S+T*y;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/P;return e[0]=(o*I-l*w+c*R)*F,e[1]=(r*w-n*I-s*R)*F,e[2]=(v*T-p*E+m*M)*F,e[3]=(h*E-f*T-d*M)*F,e[4]=(l*C-a*I-c*S)*F,e[5]=(t*I-r*C+s*S)*F,e[6]=(p*_-g*T-m*A)*F,e[7]=(u*T-h*_+d*A)*F,e[8]=(a*w-o*C+c*y)*F,e[9]=(n*C-t*w-s*y)*F,e[10]=(g*E-v*_+m*x)*F,e[11]=(f*_-u*E-d*x)*F,e[12]=(o*S-a*R-l*y)*F,e[13]=(t*R-n*S+r*y)*F,e[14]=(v*A-g*M-p*x)*F,e[15]=(u*M-f*A+h*x)*F,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,g=s*f,v=a*u,p=a*f,m=o*f,x=l*c,A=l*u,_=l*f,M=n.x,E=n.y,T=n.z;return r[0]=(1-(v+m))*M,r[1]=(d+_)*M,r[2]=(g-A)*M,r[3]=0,r[4]=(d-_)*E,r[5]=(1-(h+m))*E,r[6]=(p+x)*E,r[7]=0,r[8]=(g+A)*T,r[9]=(p-x)*T,r[10]=(1-(h+v))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Ao.set(r[0],r[1],r[2]).length(),o=Ao.set(r[4],r[5],r[6]).length(),l=Ao.set(r[8],r[9],r[10]).length();s<0&&(a=-a),mr.copy(this);let c=1/a,u=1/o,f=1/l;return mr.elements[0]*=c,mr.elements[1]*=c,mr.elements[2]*=c,mr.elements[4]*=u,mr.elements[5]*=u,mr.elements[6]*=u,mr.elements[8]*=f,mr.elements[9]*=f,mr.elements[10]*=f,t.setFromRotationMatrix(mr),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=_r,l=!1){let c=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r),g,v;if(l)g=s/(a-s),v=a*s/(a-s);else if(o===_r)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===yc)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=_r,l=!1){let c=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r),g,v;if(l)g=1/(a-s),v=a/(a-s);else if(o===_r)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===yc)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ao=new L,mr=new je,cM=new L(0,0,0),uM=new L(1,1,1),ws=new L,rh=new L,Gi=new L,yx=new je,Ax=new Vn,yr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yx.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yx,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ax.setFromEuler(this),this.setFromQuaternion(Ax,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yr.DEFAULT_ORDER="XYZ";var Ec=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},hM=0,Sx=new L,So=new Vn,jr=new je,sh=new L,oc=new L,fM=new L,dM=new Vn,Mx=new L(1,0,0),Tx=new L(0,1,0),Ex=new L(0,0,1),bx={type:"added"},pM={type:"removed"},Mo={type:"childadded",child:null},lm={type:"childremoved",child:null},vi=class i extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hM++}),this.uuid=is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new yr,n=new Vn,r=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new je},normalMatrix:{value:new $e}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ec,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return So.setFromAxisAngle(e,t),this.quaternion.multiply(So),this}rotateOnWorldAxis(e,t){return So.setFromAxisAngle(e,t),this.quaternion.premultiply(So),this}rotateX(e){return this.rotateOnAxis(Mx,e)}rotateY(e){return this.rotateOnAxis(Tx,e)}rotateZ(e){return this.rotateOnAxis(Ex,e)}translateOnAxis(e,t){return Sx.copy(e).applyQuaternion(this.quaternion),this.position.add(Sx.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mx,e)}translateY(e){return this.translateOnAxis(Tx,e)}translateZ(e){return this.translateOnAxis(Ex,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sh.copy(e):sh.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),oc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jr.lookAt(oc,sh,this.up):jr.lookAt(sh,oc,this.up),this.quaternion.setFromRotationMatrix(jr),r&&(jr.extractRotation(r.matrixWorld),So.setFromRotationMatrix(jr),this.quaternion.premultiply(So.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bx),Mo.child=e,this.dispatchEvent(Mo),Mo.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pM),lm.child=e,this.dispatchEvent(lm),lm.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jr.multiply(e.parent.matrixWorld)),e.applyMatrix4(jr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bx),Mo.child=e,this.dispatchEvent(Mo),Mo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oc,e,fM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oc,dM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};vi.DEFAULT_UP=new L(0,1,0);vi.DEFAULT_MATRIX_AUTO_UPDATE=!0;vi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ur=class extends vi{constructor(){super(),this.isGroup=!0,this.type="Group"}},mM={type:"move"},Xo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,n),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ur;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},__={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cs={h:0,s:0,l:0},ah={h:0,s:0,l:0};function cm(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=it){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=At.workingColorSpace){return this.r=e,this.g=t,this.b=n,At.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=At.workingColorSpace){if(e=$m(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=cm(a,s,e+1/3),this.g=cm(a,s,e),this.b=cm(a,s,e-1/3)}return At.colorSpaceToWorking(this,r),this}setStyle(e,t=it){function n(s){s!==void 0&&parseFloat(s)<1&&Je("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Je("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=it){let n=__[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}copyLinearToSRGB(e){return this.r=ko(e.r),this.g=ko(e.g),this.b=ko(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=it){return At.workingToColorSpace(ii.copy(this),e),Math.round(rt(ii.r*255,0,255))*65536+Math.round(rt(ii.g*255,0,255))*256+Math.round(rt(ii.b*255,0,255))}getHexString(e=it){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.workingToColorSpace(ii.copy(this),t);let n=ii.r,r=ii.g,s=ii.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=At.workingColorSpace){return At.workingToColorSpace(ii.copy(this),t),e.r=ii.r,e.g=ii.g,e.b=ii.b,e}getStyle(e=it){At.workingToColorSpace(ii.copy(this),e);let t=ii.r,n=ii.g,r=ii.b;return e!==it?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Cs),this.setHSL(Cs.h+e,Cs.s+t,Cs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cs),e.getHSL(ah);let n=vc(Cs.h,ah.h,t),r=vc(Cs.s,ah.s,t),s=vc(Cs.l,ah.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ii=new Ze;Ze.NAMES=__;var Ar=class extends vi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yr,this.environmentIntensity=1,this.environmentRotation=new yr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},gr=new L,$r=new L,um=new L,es=new L,To=new L,Eo=new L,wx=new L,hm=new L,fm=new L,dm=new L,pm=new St,mm=new St,gm=new St,Gn=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),gr.subVectors(e,t),r.cross(gr);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){gr.subVectors(r,t),$r.subVectors(n,t),um.subVectors(e,t);let a=gr.dot(gr),o=gr.dot($r),l=gr.dot(um),c=$r.dot($r),u=$r.dot(um),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;let h=1/f,d=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,es)===null?!1:es.x>=0&&es.y>=0&&es.x+es.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,es)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,es.x),l.addScaledVector(a,es.y),l.addScaledVector(o,es.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return pm.setScalar(0),mm.setScalar(0),gm.setScalar(0),pm.fromBufferAttribute(e,t),mm.fromBufferAttribute(e,n),gm.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(pm,s.x),a.addScaledVector(mm,s.y),a.addScaledVector(gm,s.z),a}static isFrontFacing(e,t,n,r){return gr.subVectors(n,t),$r.subVectors(e,t),gr.cross($r).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gr.subVectors(this.c,this.b),$r.subVectors(this.a,this.b),gr.cross($r).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;To.subVectors(r,n),Eo.subVectors(s,n),hm.subVectors(e,n);let l=To.dot(hm),c=Eo.dot(hm);if(l<=0&&c<=0)return t.copy(n);fm.subVectors(e,r);let u=To.dot(fm),f=Eo.dot(fm);if(u>=0&&f<=u)return t.copy(r);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(To,a);dm.subVectors(e,s);let d=To.dot(dm),g=Eo.dot(dm);if(g>=0&&d<=g)return t.copy(s);let v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Eo,o);let p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return wx.subVectors(s,r),o=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(wx,o);let m=1/(p+v+h);return a=v*m,o=h*m,t.copy(n).addScaledVector(To,a).addScaledVector(Eo,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zt=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=vr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,vr):vr.fromBufferAttribute(s,a),vr.applyMatrix4(e.matrixWorld),this.expandByPoint(vr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oh.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oh.copy(n.boundingBox)),oh.applyMatrix4(e.matrixWorld),this.union(oh)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vr),vr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lc),lh.subVectors(this.max,lc),bo.subVectors(e.a,lc),wo.subVectors(e.b,lc),Co.subVectors(e.c,lc),Rs.subVectors(wo,bo),Ds.subVectors(Co,wo),Ea.subVectors(bo,Co);let t=[0,-Rs.z,Rs.y,0,-Ds.z,Ds.y,0,-Ea.z,Ea.y,Rs.z,0,-Rs.x,Ds.z,0,-Ds.x,Ea.z,0,-Ea.x,-Rs.y,Rs.x,0,-Ds.y,Ds.x,0,-Ea.y,Ea.x,0];return!vm(t,bo,wo,Co,lh)||(t=[1,0,0,0,1,0,0,0,1],!vm(t,bo,wo,Co,lh))?!1:(ch.crossVectors(Rs,Ds),t=[ch.x,ch.y,ch.z],vm(t,bo,wo,Co,lh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ts[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ts[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ts[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ts[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ts[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ts[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ts[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ts[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ts),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ts=[new L,new L,new L,new L,new L,new L,new L,new L],vr=new L,oh=new Zt,bo=new L,wo=new L,Co=new L,Rs=new L,Ds=new L,Ea=new L,lc=new L,lh=new L,ch=new L,ba=new L;function vm(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ba.fromArray(i,s);let o=r.x*Math.abs(ba.x)+r.y*Math.abs(ba.y)+r.z*Math.abs(ba.z),l=e.dot(ba),c=t.dot(ba),u=n.dot(ba);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var xn=new L,uh=new be,gM=0,vt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gM++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hh,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)uh.fromBufferAttribute(this,t),uh.applyMatrix3(e),this.setXY(t,uh.x,uh.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix3(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),s=Ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hh&&(e.usage=this.usage),e}};var bc=class extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var wc=class extends vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var yn=class extends vt{constructor(e,t,n){super(new Float32Array(e),t,n)}},vM=new Zt,cc=new L,xm=new L,Lr=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):vM.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cc.subVectors(e,this.center);let t=cc.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(cc,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xm.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cc.copy(e.center).add(xm)),this.expandByPoint(cc.copy(e.center).sub(xm))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},xM=0,ir=new je,_m=new vi,Ro=new L,Vi=new Zt,uc=new Zt,Fn=new L,Kt=class i extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xM++}),this.uuid=is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(G1(e)?wc:bc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new $e().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ir.makeRotationFromQuaternion(e),this.applyMatrix4(ir),this}rotateX(e){return ir.makeRotationX(e),this.applyMatrix4(ir),this}rotateY(e){return ir.makeRotationY(e),this.applyMatrix4(ir),this}rotateZ(e){return ir.makeRotationZ(e),this.applyMatrix4(ir),this}translate(e,t,n){return ir.makeTranslation(e,t,n),this.applyMatrix4(ir),this}scale(e,t,n){return ir.makeScale(e,t,n),this.applyMatrix4(ir),this}lookAt(e){return _m.lookAt(e),_m.updateMatrix(),this.applyMatrix4(_m.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ro).negate(),this.translate(Ro.x,Ro.y,Ro.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yn(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Vi.setFromBufferAttribute(s),this.morphTargetsRelative?(Fn.addVectors(this.boundingBox.min,Vi.min),this.boundingBox.expandByPoint(Fn),Fn.addVectors(this.boundingBox.max,Vi.max),this.boundingBox.expandByPoint(Fn)):(this.boundingBox.expandByPoint(Vi.min),this.boundingBox.expandByPoint(Vi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(Vi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];uc.setFromBufferAttribute(o),this.morphTargetsRelative?(Fn.addVectors(Vi.min,uc.min),Vi.expandByPoint(Fn),Fn.addVectors(Vi.max,uc.max),Vi.expandByPoint(Fn)):(Vi.expandByPoint(uc.min),Vi.expandByPoint(uc.max))}Vi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Fn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Fn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Fn.fromBufferAttribute(o,c),l&&(Ro.fromBufferAttribute(e,c),Fn.add(Ro)),r=Math.max(r,n.distanceToSquared(Fn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new L,l[y]=new L;let c=new L,u=new L,f=new L,h=new be,d=new be,g=new be,v=new L,p=new L;function m(y,S,C){c.fromBufferAttribute(n,y),u.fromBufferAttribute(n,S),f.fromBufferAttribute(n,C),h.fromBufferAttribute(s,y),d.fromBufferAttribute(s,S),g.fromBufferAttribute(s,C),u.sub(c),f.sub(c),d.sub(h),g.sub(h);let R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(R),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(R),o[y].add(v),o[S].add(v),o[C].add(v),l[y].add(p),l[S].add(p),l[C].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let y=0,S=x.length;y<S;++y){let C=x[y],R=C.start,w=C.count;for(let I=R,P=R+w;I<P;I+=3)m(e.getX(I+0),e.getX(I+1),e.getX(I+2))}let A=new L,_=new L,M=new L,E=new L;function T(y){M.fromBufferAttribute(r,y),E.copy(M);let S=o[y];A.copy(S),A.sub(M.multiplyScalar(M.dot(S))).normalize(),_.crossVectors(E,S);let R=_.dot(l[y])<0?-1:1;a.setXYZW(y,A.x,A.y,A.z,R)}for(let y=0,S=x.length;y<S;++y){let C=x[y],R=C.start,w=C.count;for(let I=R,P=R+w;I<P;I+=3)T(e.getX(I+0)),T(e.getX(I+1)),T(e.getX(I+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let r=new L,s=new L,a=new L,o=new L,l=new L,c=new L,u=new L,f=new L;if(e)for(let h=0,d=e.count;h<d;h+=3){let g=e.getX(h+0),v=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Fn.fromBufferAttribute(e,t),Fn.normalize(),e.setXYZ(t,Fn.x,Fn.y,Fn.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u),d=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let m=0;m<u;m++)h[g++]=c[d++]}return new vt(h,u,f)}if(this.index===null)return Je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){let h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xh=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hh,this.updateRanges=[],this.version=0,this.uuid=is()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=is()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=is()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},mi=new L,Cc=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mi.fromBufferAttribute(this,t),mi.applyMatrix4(e),this.setXYZ(t,mi.x,mi.y,mi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mi.fromBufferAttribute(this,t),mi.applyNormalMatrix(e),this.setXYZ(t,mi.x,mi.y,mi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mi.fromBufferAttribute(this,t),mi.transformDirection(e),this.setXYZ(t,mi.x,mi.y,mi.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),s=Ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Sc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Sc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},_M=0,Wi=class extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_M++}),this.uuid=is(),this.name="",this.type="Material",this.blending=Da,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ph,this.blendDst=Ih,this.blendEquation=Bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=Pa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Um,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ra,this.stencilZFail=Ra,this.stencilZPass=Ra,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Je(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Da&&(n.blending=this.blending),this.side!==Di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ph&&(n.blendSrc=this.blendSrc),this.blendDst!==Ih&&(n.blendDst=this.blendDst),this.blendEquation!==Bs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Um&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ra&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ra&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ra&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Yo=class extends Wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Do,hc=new L,Po=new L,Io=new L,Bo=new be,fc=new be,y_=new je,hh=new L,dc=new L,fh=new L,Cx=new be,ym=new be,Rx=new be,Rc=class extends vi{constructor(e=new Yo){if(super(),this.isSprite=!0,this.type="Sprite",Do===void 0){Do=new Kt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Xh(t,5);Do.setIndex([0,1,2,0,2,3]),Do.setAttribute("position",new Cc(n,3,0,!1)),Do.setAttribute("uv",new Cc(n,2,3,!1))}this.geometry=Do,this.material=e,this.center=new be(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Po.setFromMatrixScale(this.matrixWorld),y_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Io.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Po.multiplyScalar(-Io.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;dh(hh.set(-.5,-.5,0),Io,a,Po,r,s),dh(dc.set(.5,-.5,0),Io,a,Po,r,s),dh(fh.set(.5,.5,0),Io,a,Po,r,s),Cx.set(0,0),ym.set(1,0),Rx.set(1,1);let o=e.ray.intersectTriangle(hh,dc,fh,!1,hc);if(o===null&&(dh(dc.set(-.5,.5,0),Io,a,Po,r,s),ym.set(0,1),o=e.ray.intersectTriangle(hh,fh,dc,!1,hc),o===null))return;let l=e.ray.origin.distanceTo(hc);l<e.near||l>e.far||t.push({distance:l,point:hc.clone(),uv:Gn.getInterpolation(hc,hh,dc,fh,Cx,ym,Rx,new be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function dh(i,e,t,n,r,s){Bo.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(fc.x=s*Bo.x-r*Bo.y,fc.y=r*Bo.x+s*Bo.y):fc.copy(Bo),i.copy(e),i.x+=fc.x,i.y+=fc.y,i.applyMatrix4(y_)}var ns=new L,Am=new L,ph=new L,Ps=new L,Sm=new L,mh=new L,Mm=new L,qo=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ns)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ns.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ns.copy(this.origin).addScaledVector(this.direction,t),ns.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Am.copy(e).add(t).multiplyScalar(.5),ph.copy(t).sub(e).normalize(),Ps.copy(this.origin).sub(Am);let s=e.distanceTo(t)*.5,a=-this.direction.dot(ph),o=Ps.dot(this.direction),l=-Ps.dot(ph),c=Ps.lengthSq(),u=Math.abs(1-a*a),f,h,d,g;if(u>0)if(f=a*l-o,h=a*o-l,g=s*u,f>=0)if(h>=-g)if(h<=g){let v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Am).addScaledVector(ph,h),d}intersectSphere(e,t){ns.subVectors(e.center,this.origin);let n=ns.dot(this.direction),r=ns.dot(ns)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ns)!==null}intersectTriangle(e,t,n,r,s){Sm.subVectors(t,e),mh.subVectors(n,e),Mm.crossVectors(Sm,mh);let a=this.direction.dot(Mm),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ps.subVectors(this.origin,e);let l=o*this.direction.dot(mh.crossVectors(Ps,mh));if(l<0)return null;let c=o*this.direction.dot(Sm.cross(Ps));if(c<0||l+c>a)return null;let u=-o*Ps.dot(Mm);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ia=class extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.combine=km,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Dx=new je,wa=new qo,gh=new Lr,Px=new L,vh=new L,xh=new L,_h=new L,Tm=new L,yh=new L,Ix=new L,Ah=new L,kt=class extends vi{constructor(e=new Kt,t=new Ia){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){yh.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],f=s[l];u!==0&&(Tm.fromBufferAttribute(f,e),a?yh.addScaledVector(Tm,u):yh.addScaledVector(Tm.sub(t),u))}t.add(yh)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gh.copy(n.boundingSphere),gh.applyMatrix4(s),wa.copy(e.ray).recast(e.near),!(gh.containsPoint(wa.origin)===!1&&(wa.intersectSphere(gh,Px)===null||wa.origin.distanceToSquared(Px)>(e.far-e.near)**2))&&(Dx.copy(s).invert(),wa.copy(e.ray).applyMatrix4(Dx),!(n.boundingBox!==null&&wa.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wa)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=a[p.materialIndex],x=Math.max(p.start,d.start),A=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let _=x,M=A;_<M;_+=3){let E=o.getX(_),T=o.getX(_+1),y=o.getX(_+2);r=Sh(this,m,e,n,c,u,f,E,T,y),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){let x=o.getX(p),A=o.getX(p+1),_=o.getX(p+2);r=Sh(this,a,e,n,c,u,f,x,A,_),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){let p=h[g],m=a[p.materialIndex],x=Math.max(p.start,d.start),A=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let _=x,M=A;_<M;_+=3){let E=_,T=_+1,y=_+2;r=Sh(this,m,e,n,c,u,f,E,T,y),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){let x=p,A=p+1,_=p+2;r=Sh(this,a,e,n,c,u,f,x,A,_),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function yM(i,e,t,n,r,s,a,o){let l;if(e.side===tn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Di,o),l===null)return null;Ah.copy(o),Ah.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ah);return c<t.near||c>t.far?null:{distance:c,point:Ah.clone(),object:i}}function Sh(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,vh),i.getVertexPosition(l,xh),i.getVertexPosition(c,_h);let u=yM(i,e,t,n,vh,xh,_h,Ix);if(u){let f=new L;Gn.getBarycoord(Ix,vh,xh,_h,f),r&&(u.uv=Gn.getInterpolatedAttribute(r,o,l,c,f,new be)),s&&(u.uv1=Gn.getInterpolatedAttribute(s,o,l,c,f,new be)),a&&(u.normal=Gn.getInterpolatedAttribute(a,o,l,c,f,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new L,materialIndex:0};Gn.getNormal(vh,xh,_h,h.normal),u.face=h,u.barycoord=f}return u}var sr=class extends Rn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ct,u=Ct,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Dc=class extends vt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Uo=new je,Bx=new je,Mh=[],Ux=new Zt,AM=new je,pc=new kt,mc=new Lr,Ba=class extends kt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Dc(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,AM)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Uo),Ux.copy(e.boundingBox).applyMatrix4(Uo),this.boundingBox.union(Ux)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Lr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Uo),mc.copy(e.boundingSphere).applyMatrix4(Uo),this.boundingSphere.union(mc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(pc.geometry=this.geometry,pc.material=this.material,pc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mc.copy(this.boundingSphere),mc.applyMatrix4(n),e.ray.intersectsSphere(mc)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Uo),Bx.multiplyMatrices(n,Uo),pc.matrixWorld=Bx,pc.raycast(e,Mh);for(let a=0,o=Mh.length;a<o;a++){let l=Mh[a];l.instanceId=s,l.object=this,t.push(l)}Mh.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Dc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new sr(new Float32Array(r*this.count),r,this.count,zs,nn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Em=new L,SM=new L,MM=new $e,Ri=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Em.subVectors(n,t).cross(SM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Em),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||MM.getNormalMatrix(e),r=this.coplanarPoint(Em).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ca=new Lr,TM=new be(.5,.5),Th=new L,Pc=class{constructor(e=new Ri,t=new Ri,n=new Ri,r=new Ri,s=new Ri,a=new Ri){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_r,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],g=s[8],v=s[9],p=s[10],m=s[11],x=s[12],A=s[13],_=s[14],M=s[15];if(r[0].setComponents(c-a,d-u,m-g,M-x).normalize(),r[1].setComponents(c+a,d+u,m+g,M+x).normalize(),r[2].setComponents(c+o,d+f,m+v,M+A).normalize(),r[3].setComponents(c-o,d-f,m-v,M-A).normalize(),n)r[4].setComponents(l,h,p,_).normalize(),r[5].setComponents(c-l,d-h,m-p,M-_).normalize();else if(r[4].setComponents(c-l,d-h,m-p,M-_).normalize(),t===_r)r[5].setComponents(c+l,d+h,m+p,M+_).normalize();else if(t===yc)r[5].setComponents(l,h,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ca.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ca.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ca)}intersectsSprite(e){Ca.center.set(0,0,0);let t=TM.distanceTo(e.center);return Ca.radius=.7071067811865476+t,Ca.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ca)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Th.x=r.normal.x>0?e.max.x:e.min.x,Th.y=r.normal.y>0?e.max.y:e.min.y,Th.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Th)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ic=class extends Rn{constructor(e=[],t=Ns,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Qo=class extends Rn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ii=class extends Rn{constructor(e,t,n=An,r,s,a,o=Ct,l=Ct,c,u=rr,f=1){if(u!==rr&&u!==ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Yh=class extends Ii{constructor(e,t=An,n=Ns,r,s,a=Ct,o=Ct,l,c=rr){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Bc=class extends Rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Zo=class i extends Kt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],f=[],h=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new yn(c,3)),this.setAttribute("normal",new yn(u,3)),this.setAttribute("uv",new yn(f,2));function g(v,p,m,x,A,_,M,E,T,y,S){let C=_/T,R=M/y,w=_/2,I=M/2,P=E/2,F=T+1,N=y+1,O=0,K=0,X=new L;for(let B=0;B<N;B++){let re=B*R-I;for(let se=0;se<F;se++){let Te=se*C-w;X[v]=Te*x,X[p]=re*A,X[m]=P,c.push(X.x,X.y,X.z),X[v]=0,X[p]=0,X[m]=E>0?1:-1,u.push(X.x,X.y,X.z),f.push(se/T),f.push(1-B/y),O+=1}}for(let B=0;B<y;B++)for(let re=0;re<T;re++){let se=h+re+F*B,Te=h+re+F*(B+1),Ce=h+(re+1)+F*(B+1),Y=h+(re+1)+F*B;l.push(se,Te,Y),l.push(Te,Ce,Y),K+=6}o.addGroup(d,K,S),d+=K,h+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Uc=class i extends Kt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new L,u=new be;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){let d=n+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new yn(a,3)),this.setAttribute("normal",new yn(o,3)),this.setAttribute("uv",new yn(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var qh=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Je("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let u=n[r],h=n[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new be:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,r=[],s=[],a=[],o=new L,l=new je;for(let d=0;d<=e;d++){let g=d/e;r[d]=this.getTangentAt(g,new L)}s[0]=new L,a[0]=new L;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(rt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(rt(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function eg(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var Eh=new L,bm=new eg,wm=new eg,Cm=new eg,Lc=class extends qh{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new L){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Eh.subVectors(r[0],r[1]).add(r[0]),c=Eh);let f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Eh.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Eh),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),p=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),bm.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,g,v,p),wm.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,g,v,p),Cm.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,g,v,p)}else this.curveType==="catmullrom"&&(bm.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),wm.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Cm.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return n.set(bm.calc(l),wm.calc(l),Cm.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};var ss=class i extends Kt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],g=[],v=[],p=[];for(let m=0;m<u;m++){let x=m*h-a;for(let A=0;A<c;A++){let _=A*f-s;g.push(_,-x,0),v.push(0,0,1),p.push(A/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){let A=x+c*m,_=x+c*(m+1),M=x+1+c*(m+1),E=x+1+c*m;d.push(A,_,E),d.push(_,M,E)}this.setIndex(d),this.setAttribute("position",new yn(g,3)),this.setAttribute("normal",new yn(v,3)),this.setAttribute("uv",new yn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ua=class i extends Kt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],f=new L,h=new L,d=[],g=[],v=[],p=[];for(let m=0;m<=n;m++){let x=[],A=m/n,_=0;m===0&&a===0?_=.5/t:m===n&&l===Math.PI&&(_=-.5/t);for(let M=0;M<=t;M++){let E=M/t;f.x=-e*Math.cos(r+E*s)*Math.sin(a+A*o),f.y=e*Math.cos(a+A*o),f.z=e*Math.sin(r+E*s)*Math.sin(a+A*o),g.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),p.push(E+_,1-A),x.push(c++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){let A=u[m][x+1],_=u[m][x],M=u[m+1][x],E=u[m+1][x+1];(m!==0||a>0)&&d.push(A,_,E),(m!==n-1||l<Math.PI)&&d.push(_,M,E)}this.setIndex(d),this.setAttribute("position",new yn(g,3)),this.setAttribute("normal",new yn(v,3)),this.setAttribute("uv",new yn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Fa(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function si(i){let e={};for(let t=0;t<i.length;t++){let n=Fa(i[t]);for(let r in n)e[r]=n[r]}return e}function EM(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function tg(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:At.workingColorSpace}var A_={clone:Fa,merge:si},bM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,at=class extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bM,this.fragmentShader=wM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fa(e.uniforms),this.uniformsGroups=EM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Qh=class extends at{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Fc=class extends Wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jm,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Zh=class extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_i,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Kh=class extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function bh(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Us=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jh=class extends Us{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pm,endingEnd:Pm}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Im:s=e,o=2*t-n;break;case Bm:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Im:a=e,l=2*n-t;break;case Bm:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-t)/(r-t),v=g*g,p=v*g,m=-h*p+2*h*v-h*g,x=(1+h)*p+(-1.5-2*h)*v+(-.5+h)*g+1,A=(-1-d)*p+(1.5+d)*v+.5*g,_=d*p-d*v;for(let M=0;M!==o;++M)s[M]=m*a[u+M]+x*a[c+M]+A*a[l+M]+_*a[f+M];return s}},jh=class extends Us{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*f+a[l+h]*u;return s}},$h=class extends Us{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ef=class extends Us{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,f=u.inTangents,h=u.outTangents;if(!f||!h){let v=(n-t)/(r-t),p=1-v;for(let m=0;m!==o;++m)s[m]=a[c+m]*p+a[l+m]*v;return s}let d=o*2,g=e-1;for(let v=0;v!==o;++v){let p=a[c+v],m=a[l+v],x=g*d+v*2,A=h[x],_=h[x+1],M=e*d+v*2,E=f[M],T=f[M+1],y=(n-t)/(r-t),S,C,R,w,I;for(let P=0;P<8;P++){S=y*y,C=S*y,R=1-y,w=R*R,I=w*R;let N=I*t+3*w*y*A+3*R*S*E+C*r-n;if(Math.abs(N)<1e-10)break;let O=3*w*(A-t)+6*R*y*(E-A)+3*S*(r-E);if(Math.abs(O)<1e-10)break;y=y-N/O,y=Math.max(0,Math.min(1,y))}s[v]=I*p+3*w*y*_+3*R*S*T+C*m}return s}},Xi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=bh(t,this.TimeBufferType),this.values=bh(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:bh(e.times,Array),values:bh(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $h(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new jh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ef(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case xc:t=this.InterpolantFactoryMethodDiscrete;break;case zh:t=this.InterpolantFactoryMethodLinear;break;case Dh:t=this.InterpolantFactoryMethodSmooth;break;case Dm:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Je("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xc;case this.InterpolantFactoryMethodLinear:return zh;case this.InterpolantFactoryMethodSmooth:return Dh;case this.InterpolantFactoryMethodBezier:return Dm}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ke("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ke("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&V1(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Ke("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Dh,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let f=o*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){let v=t[f+g];if(v!==t[h+g]||v!==t[d+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,h=a*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Xi.prototype.ValueTypeName="";Xi.prototype.TimeBufferType=Float32Array;Xi.prototype.ValueBufferType=Float32Array;Xi.prototype.DefaultInterpolation=zh;var Ls=class extends Xi{constructor(e,t,n){super(e,t,n)}};Ls.prototype.ValueTypeName="bool";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=xc;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var tf=class extends Xi{constructor(e,t,n,r){super(e,t,n,r)}};tf.prototype.ValueTypeName="color";var nf=class extends Xi{constructor(e,t,n,r){super(e,t,n,r)}};nf.prototype.ValueTypeName="number";var rf=class extends Us{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)Vn.slerpFlat(s,0,a,c-o,a,c,l);return s}},Nc=class extends Xi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new rf(this.times,this.values,this.getValueSize(),e)}};Nc.prototype.ValueTypeName="quaternion";Nc.prototype.InterpolantFactoryMethodSmooth=void 0;var Fs=class extends Xi{constructor(e,t,n){super(e,t,n)}};Fs.prototype.ValueTypeName="string";Fs.prototype.ValueBufferType=Array;Fs.prototype.DefaultInterpolation=xc;Fs.prototype.InterpolantFactoryMethodLinear=void 0;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;var sf=class extends Xi{constructor(e,t,n,r){super(e,t,n,r)}};sf.prototype.ValueTypeName="vector";var af=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},S_=new af,of=class{constructor(e){this.manager=e!==void 0?e:S_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};of.DEFAULT_MATERIAL_NAME="__DEFAULT";var wh=new L,Ch=new Vn,Ir=new L,Oc=class extends vi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=_r,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(wh,Ch,Ir),Ir.x===1&&Ir.y===1&&Ir.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wh,Ch,Ir.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(wh,Ch,Ir),Ir.x===1&&Ir.y===1&&Ir.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wh,Ch,Ir.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Is=new L,Lx=new be,Fx=new be,_n=class extends Oc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(gc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vo*2*Math.atan(Math.tan(gc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Is.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Is.x,Is.y).multiplyScalar(-e/Is.z),Is.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Is.x,Is.y).multiplyScalar(-e/Is.z)}getViewSize(e,t){return this.getViewBounds(e,Lx,Fx),t.subVectors(Fx,Lx)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(gc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var as=class extends Oc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Lo=-90,Fo=1,Ko=class extends vi{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _n(Lo,Fo,e,t);r.layers=this.layers,this.add(r);let s=new _n(Lo,Fo,e,t);s.layers=this.layers,this.add(s);let a=new _n(Lo,Fo,e,t);a.layers=this.layers,this.add(a);let o=new _n(Lo,Fo,e,t);o.layers=this.layers,this.add(o);let l=new _n(Lo,Fo,e,t);l.layers=this.layers,this.add(l);let c=new _n(Lo,Fo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===_r)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===yc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},lf=class extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var ng="\\[\\]\\.:\\/",CM=new RegExp("["+ng+"]","g"),ig="[^"+ng+"]",RM="[^"+ng.replace("\\.","")+"]",DM=/((?:WC+[\/:])*)/.source.replace("WC",ig),PM=/(WCOD+)?/.source.replace("WCOD",RM),IM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ig),BM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ig),UM=new RegExp("^"+DM+PM+IM+BM+"$"),LM=["material","materials","bones","map"],Lm=class{constructor(e,t,n){let r=n||$t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},$t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(CM,"")}static parseTrackName(e){let t=UM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);LM.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Je("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Ke("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};$t.Composite=Lm;$t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$t.prototype.GetterByBindingType=[$t.prototype._getValue_direct,$t.prototype._getValue_array,$t.prototype._getValue_arrayElement,$t.prototype._getValue_toArray];$t.prototype.SetterByBindingTypeAndVersioning=[[$t.prototype._setValue_direct,$t.prototype._setValue_direct_setNeedsUpdate,$t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_array,$t.prototype._setValue_array_setNeedsUpdate,$t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_arrayElement,$t.prototype._setValue_arrayElement_setNeedsUpdate,$t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_fromArray,$t.prototype._setValue_fromArray_setNeedsUpdate,$t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $R=new Float32Array(1);var ge=class i{constructor(e){this.value=e}clone(){return new i(this.value.clone===void 0?this.value:this.value.clone())}};var Nx=new L,Rh=new L,No=new L,Oo=new L,Rm=new L,FM=new L,NM=new L,xi=class{constructor(e=new L,t=new L){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Nx.subVectors(e,this.start),Rh.subVectors(this.end,this.start);let n=Rh.dot(Rh),s=Rh.dot(Nx)/n;return t&&(s=rt(s,0,1)),s}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=FM,n=NM){let r=10000000000000001e-32,s,a,o=this.start,l=e.start,c=this.end,u=e.end;No.subVectors(c,o),Oo.subVectors(u,l),Rm.subVectors(o,l);let f=No.dot(No),h=Oo.dot(Oo),d=Oo.dot(Rm);if(f<=r&&h<=r)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(f<=r)s=0,a=d/h,a=rt(a,0,1);else{let g=No.dot(Rm);if(h<=r)a=0,s=rt(-g/f,0,1);else{let v=No.dot(Oo),p=f*h-v*v;p!==0?s=rt((v*d-g*h)/p,0,1):s=0,a=(v*s+d)/h,a<0?(a=0,s=rt(-g/f,0,1)):a>1&&(a=1,s=rt((v-g)/f,0,1))}}return t.copy(o).addScaledVector(No,s),n.copy(l).addScaledVector(Oo,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function rg(i,e,t,n){let r=OM(n);switch(t){case Km:return i*e;case zs:return i*e/r.components*r.byteLength;case $o:return i*e/r.components*r.byteLength;case os:return i*e*2/r.components*r.byteLength;case Hs:return i*e*2/r.components*r.byteLength;case Jm:return i*e*3/r.components*r.byteLength;case Sn:return i*e*4/r.components*r.byteLength;case Gs:return i*e*4/r.components*r.byteLength;case Wc:case Xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yc:case qc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mf:case vf:return Math.max(i,16)*Math.max(e,8)/4;case pf:case gf:return Math.max(i,8)*Math.max(e,8)/2;case xf:case _f:case Af:case Sf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yf:case Mf:case Tf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ef:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Cf:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Rf:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Df:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pf:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case If:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Bf:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Uf:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Lf:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ff:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Nf:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Of:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case kf:case zf:case Hf:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Gf:case Vf:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Wf:case Xf:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function OM(i){switch(i){case xt:case jo:return{byteLength:1,components:1};case Os:case Vc:case ri:return{byteLength:2,components:1};case ff:case df:return{byteLength:2,components:4};case An:case ks:case nn:return{byteLength:4,components:1};case Qm:case Zm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wn}}));typeof window<"u"&&(window.__THREE__?Je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wn);function X_(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function zM(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){let g=f[h],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){let v=f[d];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var HM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,VM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,WM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,YM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,QM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ZM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,KM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,JM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$M=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,eT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,iT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,oT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,lT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,uT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,dT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vT="gl_FragColor = linearToOutputTexel( gl_FragColor );",xT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_T=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,yT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,AT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ST=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,MT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,TT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ET=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,CT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,RT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,DT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,PT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,IT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,BT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,UT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,FT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,NT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,OT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kT=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,HT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,GT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,VT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,WT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,QT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ZT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,KT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,JT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$T=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,eE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,iE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,aE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,gE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_E=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,AE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,SE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ME=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,TE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,EE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,CE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,RE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,DE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,PE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,IE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,BE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,UE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,LE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,FE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,NE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,zE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,HE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,YE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,QE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ZE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,KE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,JE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$E=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ib=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ab=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ob=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ub=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,db=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_b=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ut={alphahash_fragment:HM,alphahash_pars_fragment:GM,alphamap_fragment:VM,alphamap_pars_fragment:WM,alphatest_fragment:XM,alphatest_pars_fragment:YM,aomap_fragment:qM,aomap_pars_fragment:QM,batching_pars_vertex:ZM,batching_vertex:KM,begin_vertex:JM,beginnormal_vertex:jM,bsdfs:$M,iridescence_fragment:eT,bumpmap_pars_fragment:tT,clipping_planes_fragment:nT,clipping_planes_pars_fragment:iT,clipping_planes_pars_vertex:rT,clipping_planes_vertex:sT,color_fragment:aT,color_pars_fragment:oT,color_pars_vertex:lT,color_vertex:cT,common:uT,cube_uv_reflection_fragment:hT,defaultnormal_vertex:fT,displacementmap_pars_vertex:dT,displacementmap_vertex:pT,emissivemap_fragment:mT,emissivemap_pars_fragment:gT,colorspace_fragment:vT,colorspace_pars_fragment:xT,envmap_fragment:_T,envmap_common_pars_fragment:yT,envmap_pars_fragment:AT,envmap_pars_vertex:ST,envmap_physical_pars_fragment:BT,envmap_vertex:MT,fog_vertex:TT,fog_pars_vertex:ET,fog_fragment:bT,fog_pars_fragment:wT,gradientmap_pars_fragment:CT,lightmap_pars_fragment:RT,lights_lambert_fragment:DT,lights_lambert_pars_fragment:PT,lights_pars_begin:IT,lights_toon_fragment:UT,lights_toon_pars_fragment:LT,lights_phong_fragment:FT,lights_phong_pars_fragment:NT,lights_physical_fragment:OT,lights_physical_pars_fragment:kT,lights_fragment_begin:zT,lights_fragment_maps:HT,lights_fragment_end:GT,logdepthbuf_fragment:VT,logdepthbuf_pars_fragment:WT,logdepthbuf_pars_vertex:XT,logdepthbuf_vertex:YT,map_fragment:qT,map_pars_fragment:QT,map_particle_fragment:ZT,map_particle_pars_fragment:KT,metalnessmap_fragment:JT,metalnessmap_pars_fragment:jT,morphinstance_vertex:$T,morphcolor_vertex:eE,morphnormal_vertex:tE,morphtarget_pars_vertex:nE,morphtarget_vertex:iE,normal_fragment_begin:rE,normal_fragment_maps:sE,normal_pars_fragment:aE,normal_pars_vertex:oE,normal_vertex:lE,normalmap_pars_fragment:cE,clearcoat_normal_fragment_begin:uE,clearcoat_normal_fragment_maps:hE,clearcoat_pars_fragment:fE,iridescence_pars_fragment:dE,opaque_fragment:pE,packing:mE,premultiplied_alpha_fragment:gE,project_vertex:vE,dithering_fragment:xE,dithering_pars_fragment:_E,roughnessmap_fragment:yE,roughnessmap_pars_fragment:AE,shadowmap_pars_fragment:SE,shadowmap_pars_vertex:ME,shadowmap_vertex:TE,shadowmask_pars_fragment:EE,skinbase_vertex:bE,skinning_pars_vertex:wE,skinning_vertex:CE,skinnormal_vertex:RE,specularmap_fragment:DE,specularmap_pars_fragment:PE,tonemapping_fragment:IE,tonemapping_pars_fragment:BE,transmission_fragment:UE,transmission_pars_fragment:LE,uv_pars_fragment:FE,uv_pars_vertex:NE,uv_vertex:OE,worldpos_vertex:kE,background_vert:zE,background_frag:HE,backgroundCube_vert:GE,backgroundCube_frag:VE,cube_vert:WE,cube_frag:XE,depth_vert:YE,depth_frag:qE,distance_vert:QE,distance_frag:ZE,equirect_vert:KE,equirect_frag:JE,linedashed_vert:jE,linedashed_frag:$E,meshbasic_vert:eb,meshbasic_frag:tb,meshlambert_vert:nb,meshlambert_frag:ib,meshmatcap_vert:rb,meshmatcap_frag:sb,meshnormal_vert:ab,meshnormal_frag:ob,meshphong_vert:lb,meshphong_frag:cb,meshphysical_vert:ub,meshphysical_frag:hb,meshtoon_vert:fb,meshtoon_frag:db,points_vert:pb,points_frag:mb,shadow_vert:gb,shadow_frag:vb,sprite_vert:xb,sprite_frag:_b},we={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},kr={basic:{uniforms:si([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:si([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ze(0)},envMapIntensity:{value:1}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:si([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:si([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:si([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Ze(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:si([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:si([we.points,we.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:si([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:si([we.common,we.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:si([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:si([we.sprite,we.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distance:{uniforms:si([we.common,we.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distance_vert,fragmentShader:ut.distance_frag},shadow:{uniforms:si([we.lights,we.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};kr.physical={uniforms:si([kr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};var Qf={r:0,b:0,g:0},Na=new yr,yb=new je;function Ab(i,e,t,n,r,s){let a=new Ze(0),o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(x){let A=x.isScene===!0?x.background:null;if(A&&A.isTexture){let _=x.backgroundBlurriness>0;A=e.get(A,_)}return A}function g(x){let A=!1,_=d(x);_===null?p(a,o):_&&_.isColor&&(p(_,1),A=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,A){let _=d(A);_&&(_.isCubeTexture||_.mapping===Hc)?(c===void 0&&(c=new kt(new Zo(1,1,1),new at({name:"BackgroundCubeMaterial",uniforms:Fa(kr.backgroundCube.uniforms),vertexShader:kr.backgroundCube.vertexShader,fragmentShader:kr.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),Na.copy(A.backgroundRotation),Na.x*=-1,Na.y*=-1,Na.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Na.y*=-1,Na.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(yb.makeRotationFromEuler(Na)),c.material.toneMapped=At.getTransfer(_.colorSpace)!==Bt,(u!==_||f!==_.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new kt(new ss(2,2),new at({name:"BackgroundMaterial",uniforms:Fa(kr.background.uniforms),vertexShader:kr.background.vertexShader,fragmentShader:kr.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=At.getTransfer(_.colorSpace)!==Bt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,f=_.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,A){x.getRGB(Qf,tg(i)),t.buffers.color.setClear(Qf.r,Qf.g,Qf.b,A,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,A=1){a.set(x),o=A,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:g,addToRenderList:v,dispose:m}}function Sb(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,a=!1;function o(R,w,I,P,F){let N=!1,O=f(R,P,I,w);s!==O&&(s=O,c(s.object)),N=d(R,P,I,F),N&&g(R,P,I,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,_(R,w,I,P),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function f(R,w,I,P){let F=P.wireframe===!0,N=n[w.id];N===void 0&&(N={},n[w.id]=N);let O=R.isInstancedMesh===!0?R.id:0,K=N[O];K===void 0&&(K={},N[O]=K);let X=K[I.id];X===void 0&&(X={},K[I.id]=X);let B=X[F];return B===void 0&&(B=h(l()),X[F]=B),B}function h(R){let w=[],I=[],P=[];for(let F=0;F<t;F++)w[F]=0,I[F]=0,P[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:I,attributeDivisors:P,object:R,attributes:{},index:null}}function d(R,w,I,P){let F=s.attributes,N=w.attributes,O=0,K=I.getAttributes();for(let X in K)if(K[X].location>=0){let re=F[X],se=N[X];if(se===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(se=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(se=R.instanceColor)),re===void 0||re.attribute!==se||se&&re.data!==se.data)return!0;O++}return s.attributesNum!==O||s.index!==P}function g(R,w,I,P){let F={},N=w.attributes,O=0,K=I.getAttributes();for(let X in K)if(K[X].location>=0){let re=N[X];re===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(re=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(re=R.instanceColor));let se={};se.attribute=re,re&&re.data&&(se.data=re.data),F[X]=se,O++}s.attributes=F,s.attributesNum=O,s.index=P}function v(){let R=s.newAttributes;for(let w=0,I=R.length;w<I;w++)R[w]=0}function p(R){m(R,0)}function m(R,w){let I=s.newAttributes,P=s.enabledAttributes,F=s.attributeDivisors;I[R]=1,P[R]===0&&(i.enableVertexAttribArray(R),P[R]=1),F[R]!==w&&(i.vertexAttribDivisor(R,w),F[R]=w)}function x(){let R=s.newAttributes,w=s.enabledAttributes;for(let I=0,P=w.length;I<P;I++)w[I]!==R[I]&&(i.disableVertexAttribArray(I),w[I]=0)}function A(R,w,I,P,F,N,O){O===!0?i.vertexAttribIPointer(R,w,I,F,N):i.vertexAttribPointer(R,w,I,P,F,N)}function _(R,w,I,P){v();let F=P.attributes,N=I.getAttributes(),O=w.defaultAttributeValues;for(let K in N){let X=N[K];if(X.location>=0){let B=F[K];if(B===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(B=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(B=R.instanceColor)),B!==void 0){let re=B.normalized,se=B.itemSize,Te=e.get(B);if(Te===void 0)continue;let Ce=Te.buffer,Y=Te.type,V=Te.bytesPerElement,Z=Y===i.INT||Y===i.UNSIGNED_INT||B.gpuType===ks;if(B.isInterleavedBufferAttribute){let ie=B.data,ne=ie.stride,he=B.offset;if(ie.isInstancedInterleavedBuffer){for(let pe=0;pe<X.locationSize;pe++)m(X.location+pe,ie.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let pe=0;pe<X.locationSize;pe++)p(X.location+pe);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let pe=0;pe<X.locationSize;pe++)A(X.location+pe,se/X.locationSize,Y,re,ne*V,(he+se/X.locationSize*pe)*V,Z)}else{if(B.isInstancedBufferAttribute){for(let ie=0;ie<X.locationSize;ie++)m(X.location+ie,B.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let ie=0;ie<X.locationSize;ie++)p(X.location+ie);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let ie=0;ie<X.locationSize;ie++)A(X.location+ie,se/X.locationSize,Y,re,se*V,se/X.locationSize*ie*V,Z)}}else if(O!==void 0){let re=O[K];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(X.location,re);break;case 3:i.vertexAttrib3fv(X.location,re);break;case 4:i.vertexAttrib4fv(X.location,re);break;default:i.vertexAttrib1fv(X.location,re)}}}}x()}function M(){S();for(let R in n){let w=n[R];for(let I in w){let P=w[I];for(let F in P){let N=P[F];for(let O in N)u(N[O].object),delete N[O];delete P[F]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;let w=n[R.id];for(let I in w){let P=w[I];for(let F in P){let N=P[F];for(let O in N)u(N[O].object),delete N[O];delete P[F]}}delete n[R.id]}function T(R){for(let w in n){let I=n[w];for(let P in I){let F=I[P];if(F[R.id]===void 0)continue;let N=F[R.id];for(let O in N)u(N[O].object),delete N[O];delete F[R.id]}}}function y(R){for(let w in n){let I=n[w],P=R.isInstancedMesh===!0?R.id:0,F=I[P];if(F!==void 0){for(let N in F){let O=F[N];for(let K in O)u(O[K].object),delete O[K];delete F[N]}delete I[P],Object.keys(I).length===0&&delete n[w]}}}function S(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:S,resetDefaultState:C,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function Mb(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),t.update(u,n,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function l(c,u,f,h){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let g=0;for(let v=0;v<f;v++)g+=u[v]*h[v];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Tb(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==Sn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let y=T===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==xt&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==nn&&!y)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:A,maxFragmentUniforms:_,maxSamples:M,samples:E}}function Eb(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Ri,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){let g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=i.get(f);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{let x=s?0:n,A=x*4,_=m.clippingState||null;l.value=_,_=u(g,h,A,d);for(let M=0;M!==A;++M)_[M]=t[M];m.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){let v=f!==null?f.length:0,p=null;if(v!==0){if(p=l.value,g!==!0||p===null){let m=d+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let A=0,_=d;A!==v;++A,_+=4)a.copy(f[A]).applyMatrix4(x,o),a.normal.toArray(p,_),p[_+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var Ws=4,M_=[.125,.215,.35,.446,.526,.582],ka=20,bb=256,Zc=new as,T_=new Ze,sg=null,ag=0,og=0,lg=!1,wb=new L,nl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=wb}=s;sg=this._renderer.getRenderTarget(),ag=this._renderer.getActiveCubeFace(),og=this._renderer.getActiveMipmapLevel(),lg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=w_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=b_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(sg,ag,og),this._renderer.xr.enabled=lg,e.scissorTest=!1,el(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ns||e.mapping===La?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sg=this._renderer.getRenderTarget(),ag=this._renderer.getActiveCubeFace(),og=this._renderer.getActiveMipmapLevel(),lg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:ri,format:Sn,colorSpace:Pi,depthBuffer:!1},r=E_(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=E_(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cb(s)),this._blurMaterial=Db(s,e,t),this._ggxMaterial=Rb(s,e,t)}return r}_compileMaterial(e){let t=new kt(new Kt,e);this._renderer.compile(t,Zc)}_sceneToCubeUV(e,t,n,r,s){let l=new _n(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(T_),f.toneMapping=Yi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new kt(new Zo,new Ia({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,m=!1,x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,m=!0):(p.color.copy(T_),m=!0);for(let A=0;A<6;A++){let _=A%3;_===0?(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[A],s.y,s.z)):_===1?(l.up.set(0,0,c[A]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[A],s.z)):(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[A]));let M=this._cubeSize;el(r,_*M,A>2?M:0,M,M),f.setRenderTarget(r),m&&f.render(v,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=x}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Ns||e.mapping===La;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=w_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=b_());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;el(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Zc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-Ws?n-g+Ws:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=g-t,el(s,p,m,3*v,2*v),r.setRenderTarget(s),r.render(o,Zc),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,el(e,p,m,3*v,2*v),r.setRenderTarget(e),r.render(o,Zc)}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ke("blur direction must be either latitudinal or longitudinal!");let u=3,f=this._lodMeshes[r];f.material=c;let h=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ka-1),v=s/g,p=isFinite(s)?1+Math.floor(u*v):ka;p>ka&&Je(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ka}`);let m=[],x=0;for(let T=0;T<ka;++T){let y=T/v,S=Math.exp(-y*y/2);m.push(S),T===0?x+=S:T<p&&(x+=2*S)}for(let T=0;T<m.length;T++)m[T]=m[T]/x;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:A}=this;h.dTheta.value=g,h.mipInt.value=A-n;let _=this._sizeLods[r],M=3*_*(r>A-Ws?r-A+Ws:0),E=4*(this._cubeSize-_);el(t,M,E,3*_,2*_),l.setRenderTarget(t),l.render(f,Zc)}};function Cb(i){let e=[],t=[],n=[],r=i,s=i-Ws+1+M_.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Ws?l=M_[a-i+Ws-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,v=3,p=2,m=1,x=new Float32Array(v*g*d),A=new Float32Array(p*g*d),_=new Float32Array(m*g*d);for(let E=0;E<d;E++){let T=E%3*2/3-1,y=E>2?0:-1,S=[T,y,0,T+2/3,y,0,T+2/3,y+1,0,T,y,0,T+2/3,y+1,0,T,y+1,0];x.set(S,v*g*E),A.set(h,p*g*E);let C=[E,E,E,E,E,E];_.set(C,m*g*E)}let M=new Kt;M.setAttribute("position",new vt(x,v)),M.setAttribute("uv",new vt(A,p)),M.setAttribute("faceIndex",new vt(_,m)),n.push(new kt(M,null)),r>Ws&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function E_(i,e,t){let n=new gt(i,e,t);return n.texture.mapping=Hc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function el(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Rb(i,e,t){return new at({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ut,depthTest:!1,depthWrite:!1})}function Db(i,e,t){let n=new Float32Array(ka),r=new L(0,1,0);return new at({name:"SphericalGaussianBlur",defines:{n:ka,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Jf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ut,depthTest:!1,depthWrite:!1})}function b_(){return new at({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ut,depthTest:!1,depthWrite:!1})}function w_(){return new at({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ut,depthTest:!1,depthWrite:!1})}function Jf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var il=class extends gt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ic(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Zo(5,5,5),s=new at({name:"CubemapFromEquirect",uniforms:Fa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Ut});s.uniforms.tEquirect.value=t;let a=new kt(r,s),o=t.minFilter;return t.minFilter===Fr&&(t.minFilter=Gt),new Ko(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Pb(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){let d=h.mapping;if(d===cf||d===uf)if(e.has(h)){let g=e.get(h).texture;return o(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let v=new il(g.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let d=h.mapping,g=d===cf||d===uf,v=d===Ns||d===La;if(g||v){let p=t.get(h),m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new nl(i)),p=g?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let x=h.image;return g&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new nl(i)),p=g?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,d){return d===cf?h.mapping=Ns:d===uf&&(h.mapping=La),h}function l(h){let d=0,g=6;for(let v=0;v<g;v++)h[v]!==void 0&&d++;return d===g}function c(h){let d=h.target;d.removeEventListener("dispose",c);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function Ib(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Mc("WebGLRenderer: "+n+" extension not supported."),r}}}function Bb(i,e,t,n){let r={},s=new WeakMap;function a(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){let h=f.attributes;for(let d in h)e.update(h[d],i.ARRAY_BUFFER)}function c(f){let h=[],d=f.index,g=f.attributes.position,v=0;if(g===void 0)return;if(d!==null){let x=d.array;v=d.version;for(let A=0,_=x.length;A<_;A+=3){let M=x[A+0],E=x[A+1],T=x[A+2];h.push(M,E,E,T,T,M)}}else{let x=g.array;v=g.version;for(let A=0,_=x.length/3-1;A<_;A+=3){let M=A+0,E=A+1,T=A+2;h.push(M,E,E,T,T,M)}}let p=new(g.count>=65535?wc:bc)(h,1);p.version=v;let m=s.get(f);m&&e.remove(m),s.set(f,p)}function u(f){let h=s.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Ub(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,h*a,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];t.update(p,n,1)}function f(h,d,g,v){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)c(h[m]/a,d[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,v,0,g);let m=0;for(let x=0;x<g;x++)m+=d[x]*v[x];t.update(m,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Lb(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Fb(i,e,t){let n=new WeakMap,r=new St;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let S=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",S)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],A=0;d===!0&&(A=1),g===!0&&(A=2),v===!0&&(A=3);let _=o.attributes.position.count*A,M=1;_>e.maxTextureSize&&(M=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*M*4*f),T=new Tc(E,_,M,f);T.type=nn,T.needsUpdate=!0;let y=A*4;for(let C=0;C<f;C++){let R=p[C],w=m[C],I=x[C],P=_*M*4*C;for(let F=0;F<R.count;F++){let N=F*y;d===!0&&(r.fromBufferAttribute(R,F),E[P+N+0]=r.x,E[P+N+1]=r.y,E[P+N+2]=r.z,E[P+N+3]=0),g===!0&&(r.fromBufferAttribute(w,F),E[P+N+4]=r.x,E[P+N+5]=r.y,E[P+N+6]=r.z,E[P+N+7]=0),v===!0&&(r.fromBufferAttribute(I,F),E[P+N+8]=r.x,E[P+N+9]=r.y,E[P+N+10]=r.z,E[P+N+11]=I.itemSize===4?r.w:1)}}h={count:f,texture:T,size:new be(_,M)},n.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function Nb(i,e,t,n,r){let s=new WeakMap;function a(c){let u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Ob={[zm]:"LINEAR_TONE_MAPPING",[Hm]:"REINHARD_TONE_MAPPING",[Gm]:"CINEON_TONE_MAPPING",[Vm]:"ACES_FILMIC_TONE_MAPPING",[Xm]:"AGX_TONE_MAPPING",[Ym]:"NEUTRAL_TONE_MAPPING",[Wm]:"CUSTOM_TONE_MAPPING"};function kb(i,e,t,n,r){let s=new gt(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),a=new gt(e,t,{type:ri,depthBuffer:!1,stencilBuffer:!1}),o=new Kt;o.setAttribute("position",new yn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new yn([0,2,0,0,2,0],2));let l=new Qh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new kt(o,l),u=new as(-1,1,1,-1,0,1),f=null,h=null,d=!1,g,v=null,p=[],m=!1;this.setSize=function(x,A){s.setSize(x,A),a.setSize(x,A);for(let _=0;_<p.length;_++){let M=p[_];M.setSize&&M.setSize(x,A)}},this.setEffects=function(x){p=x,m=p.length>0&&p[0].isRenderPass===!0;let A=s.width,_=s.height;for(let M=0;M<p.length;M++){let E=p[M];E.setSize&&E.setSize(A,_)}},this.begin=function(x,A){if(d||x.toneMapping===Yi&&p.length===0)return!1;if(v=A,A!==null){let _=A.width,M=A.height;(s.width!==_||s.height!==M)&&this.setSize(_,M)}return m===!1&&x.setRenderTarget(s),g=x.toneMapping,x.toneMapping=Yi,!0},this.hasRenderPass=function(){return m},this.end=function(x,A){x.toneMapping=g,d=!0;let _=s,M=a;for(let E=0;E<p.length;E++){let T=p[E];if(T.enabled!==!1&&(T.render(x,M,_,A),T.needsSwap!==!1)){let y=_;_=M,M=y}}if(f!==x.outputColorSpace||h!==x.toneMapping){f=x.outputColorSpace,h=x.toneMapping,l.defines={},At.getTransfer(f)===Bt&&(l.defines.SRGB_TRANSFER="");let E=Ob[h];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=_.texture,x.setRenderTarget(v),x.render(c,u),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),l.dispose()}}var Y_=new Rn,hg=new Ii(1,1),q_=new Tc,Q_=new Wh,Z_=new Ic,C_=[],R_=[],D_=new Float32Array(16),P_=new Float32Array(9),I_=new Float32Array(4);function rl(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=C_[r];if(s===void 0&&(s=new Float32Array(r),C_[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Dn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jf(i,e){let t=R_[e];t===void 0&&(t=new Int32Array(e),R_[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function zb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Hb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2fv(this.addr,e),Pn(t,e)}}function Gb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dn(t,e))return;i.uniform3fv(this.addr,e),Pn(t,e)}}function Vb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4fv(this.addr,e),Pn(t,e)}}function Wb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;I_.set(n),i.uniformMatrix2fv(this.addr,!1,I_),Pn(t,n)}}function Xb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;P_.set(n),i.uniformMatrix3fv(this.addr,!1,P_),Pn(t,n)}}function Yb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;D_.set(n),i.uniformMatrix4fv(this.addr,!1,D_),Pn(t,n)}}function qb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2iv(this.addr,e),Pn(t,e)}}function Zb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;i.uniform3iv(this.addr,e),Pn(t,e)}}function Kb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4iv(this.addr,e),Pn(t,e)}}function Jb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function jb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2uiv(this.addr,e),Pn(t,e)}}function $b(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;i.uniform3uiv(this.addr,e),Pn(t,e)}}function ew(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4uiv(this.addr,e),Pn(t,e)}}function tw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(hg.compareFunction=t.isReversedDepthBuffer()?qf:Yf,s=hg):s=Y_,t.setTexture2D(e||s,r)}function nw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Q_,r)}function iw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Z_,r)}function rw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||q_,r)}function sw(i){switch(i){case 5126:return zb;case 35664:return Hb;case 35665:return Gb;case 35666:return Vb;case 35674:return Wb;case 35675:return Xb;case 35676:return Yb;case 5124:case 35670:return qb;case 35667:case 35671:return Qb;case 35668:case 35672:return Zb;case 35669:case 35673:return Kb;case 5125:return Jb;case 36294:return jb;case 36295:return $b;case 36296:return ew;case 35678:case 36198:case 36298:case 36306:case 35682:return tw;case 35679:case 36299:case 36307:return nw;case 35680:case 36300:case 36308:case 36293:return iw;case 36289:case 36303:case 36311:case 36292:return rw}}function aw(i,e){i.uniform1fv(this.addr,e)}function ow(i,e){let t=rl(e,this.size,2);i.uniform2fv(this.addr,t)}function lw(i,e){let t=rl(e,this.size,3);i.uniform3fv(this.addr,t)}function cw(i,e){let t=rl(e,this.size,4);i.uniform4fv(this.addr,t)}function uw(i,e){let t=rl(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function hw(i,e){let t=rl(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function fw(i,e){let t=rl(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function dw(i,e){i.uniform1iv(this.addr,e)}function pw(i,e){i.uniform2iv(this.addr,e)}function mw(i,e){i.uniform3iv(this.addr,e)}function gw(i,e){i.uniform4iv(this.addr,e)}function vw(i,e){i.uniform1uiv(this.addr,e)}function xw(i,e){i.uniform2uiv(this.addr,e)}function _w(i,e){i.uniform3uiv(this.addr,e)}function yw(i,e){i.uniform4uiv(this.addr,e)}function Aw(i,e,t){let n=this.cache,r=e.length,s=jf(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=hg:a=Y_;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Sw(i,e,t){let n=this.cache,r=e.length,s=jf(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Q_,s[a])}function Mw(i,e,t){let n=this.cache,r=e.length,s=jf(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Z_,s[a])}function Tw(i,e,t){let n=this.cache,r=e.length,s=jf(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||q_,s[a])}function Ew(i){switch(i){case 5126:return aw;case 35664:return ow;case 35665:return lw;case 35666:return cw;case 35674:return uw;case 35675:return hw;case 35676:return fw;case 5124:case 35670:return dw;case 35667:case 35671:return pw;case 35668:case 35672:return mw;case 35669:case 35673:return gw;case 5125:return vw;case 36294:return xw;case 36295:return _w;case 36296:return yw;case 35678:case 36198:case 36298:case 36306:case 35682:return Aw;case 35679:case 36299:case 36307:return Sw;case 35680:case 36300:case 36308:case 36293:return Mw;case 36289:case 36303:case 36311:case 36292:return Tw}}var fg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=sw(t.type)}},dg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ew(t.type)}},pg=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},cg=/(\w+)(\])?(\[|\.)?/g;function B_(i,e){i.seq.push(e),i.map[e.id]=e}function bw(i,e,t){let n=i.name,r=n.length;for(cg.lastIndex=0;;){let s=cg.exec(n),a=cg.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){B_(t,c===void 0?new fg(o,i,e):new dg(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new pg(o),B_(t,f)),t=f}}}var tl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);bw(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function U_(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var ww=37297,Cw=0;function Rw(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var L_=new $e;function Dw(i){At._getMatrix(L_,At.workingColorSpace,i);let e=`mat3( ${L_.elements.map(t=>t.toFixed(4))} )`;switch(At.getTransfer(i)){case _c:return[e,"LinearTransferOETF"];case Bt:return[e,"sRGBTransferOETF"];default:return Je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function F_(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Rw(i.getShaderSource(e),o)}else return s}function Pw(i,e){let t=Dw(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Iw={[zm]:"Linear",[Hm]:"Reinhard",[Gm]:"Cineon",[Vm]:"ACESFilmic",[Xm]:"AgX",[Ym]:"Neutral",[Wm]:"Custom"};function Bw(i,e){let t=Iw[e];return t===void 0?(Je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Zf=new L;function Uw(){At.getLuminanceCoefficients(Zf);let i=Zf.x.toFixed(4),e=Zf.y.toFixed(4),t=Zf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lw(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jc).join(`
`)}function Fw(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Nw(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Jc(i){return i!==""}function N_(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function O_(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ow=/^[ \t]*#include +<([\w\d./]+)>/gm;function mg(i){return i.replace(Ow,zw)}var kw=new Map;function zw(i,e){let t=ut[e];if(t===void 0){let n=kw.get(e);if(n!==void 0)t=ut[n],Je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return mg(t)}var Hw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function k_(i){return i.replace(Hw,Gw)}function Gw(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function z_(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Vw={[kc]:"SHADOWMAP_TYPE_PCF",[Jo]:"SHADOWMAP_TYPE_VSM"};function Ww(i){return Vw[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Xw={[Ns]:"ENVMAP_TYPE_CUBE",[La]:"ENVMAP_TYPE_CUBE",[Hc]:"ENVMAP_TYPE_CUBE_UV"};function Yw(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Xw[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var qw={[La]:"ENVMAP_MODE_REFRACTION"};function Qw(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":qw[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Zw={[km]:"ENVMAP_BLENDING_MULTIPLY",[s_]:"ENVMAP_BLENDING_MIX",[a_]:"ENVMAP_BLENDING_ADD"};function Kw(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Zw[i.combine]||"ENVMAP_BLENDING_NONE"}function Jw(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function jw(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Ww(t),c=Yw(t),u=Qw(t),f=Kw(t),h=Jw(t),d=Lw(t),g=Fw(s),v=r.createProgram(),p,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jc).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jc).join(`
`),m.length>0&&(m+=`
`)):(p=[z_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jc).join(`
`),m=[z_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yi?"#define TONE_MAPPING":"",t.toneMapping!==Yi?ut.tonemapping_pars_fragment:"",t.toneMapping!==Yi?Bw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,Pw("linearToOutputTexel",t.outputColorSpace),Uw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jc).join(`
`)),a=mg(a),a=N_(a,t),a=O_(a,t),o=mg(o),o=N_(o,t),o=O_(o,t),a=k_(a),o=k_(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let A=x+p+a,_=x+m+o,M=U_(r,r.VERTEX_SHADER,A),E=U_(r,r.FRAGMENT_SHADER,_);r.attachShader(v,M),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function T(R){if(i.debug.checkShaderErrors){let w=r.getProgramInfoLog(v)||"",I=r.getShaderInfoLog(M)||"",P=r.getShaderInfoLog(E)||"",F=w.trim(),N=I.trim(),O=P.trim(),K=!0,X=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,M,E);else{let B=F_(r,M,"vertex"),re=F_(r,E,"fragment");Ke("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+B+`
`+re)}else F!==""?Je("WebGLProgram: Program Info Log:",F):(N===""||O==="")&&(X=!1);X&&(R.diagnostics={runnable:K,programLog:F,vertexShader:{log:N,prefix:p},fragmentShader:{log:O,prefix:m}})}r.deleteShader(M),r.deleteShader(E),y=new tl(r,v),S=Nw(r,v)}let y;this.getUniforms=function(){return y===void 0&&T(this),y};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(v,ww)),C},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cw++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=E,this}var $w=0,gg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new vg(e),t.set(e,n)),n}},vg=class{constructor(e){this.id=$w++,this.code=e,this.usedTimes=0}};function eC(i,e,t,n,r,s){let a=new Ec,o=new gg,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,S,C,R,w){let I=R.fog,P=w.geometry,F=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,N=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,O=e.get(y.envMap||F,N),K=O&&O.mapping===Hc?O.image.height:null,X=d[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&Je("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let B=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,re=B!==void 0?B.length:0,se=0;P.morphAttributes.position!==void 0&&(se=1),P.morphAttributes.normal!==void 0&&(se=2),P.morphAttributes.color!==void 0&&(se=3);let Te,Ce,Y,V;if(X){let Pe=kr[X];Te=Pe.vertexShader,Ce=Pe.fragmentShader}else Te=y.vertexShader,Ce=y.fragmentShader,o.update(y),Y=o.getVertexShaderID(y),V=o.getFragmentShaderID(y);let Z=i.getRenderTarget(),ie=i.state.buffers.depth.getReversed(),ne=w.isInstancedMesh===!0,he=w.isBatchedMesh===!0,pe=!!y.map,Re=!!y.matcap,ce=!!O,De=!!y.aoMap,He=!!y.lightMap,ve=!!y.bumpMap,W=!!y.normalMap,k=!!y.displacementMap,Ye=!!y.emissiveMap,Ie=!!y.metalnessMap,Be=!!y.roughnessMap,me=y.anisotropy>0,U=y.clearcoat>0,b=y.dispersion>0,H=y.iridescence>0,ee=y.sheen>0,$=y.transmission>0,J=me&&!!y.anisotropyMap,ye=U&&!!y.clearcoatMap,fe=U&&!!y.clearcoatNormalMap,Ge=U&&!!y.clearcoatRoughnessMap,Ue=H&&!!y.iridescenceMap,oe=H&&!!y.iridescenceThicknessMap,ue=ee&&!!y.sheenColorMap,Le=ee&&!!y.sheenRoughnessMap,Ne=!!y.specularMap,Ae=!!y.specularColorMap,et=!!y.specularIntensityMap,z=$&&!!y.transmissionMap,de=$&&!!y.thicknessMap,le=!!y.gradientMap,Se=!!y.alphaMap,ae=y.alphaTest>0,te=!!y.alphaHash,Fe=!!y.extensions,qe=Yi;y.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(qe=i.toneMapping);let Tt={shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:Te,fragmentShader:Ce,defines:y.defines,customVertexShaderID:Y,customFragmentShaderID:V,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:he,batchingColor:he&&w._colorsTexture!==null,instancing:ne,instancingColor:ne&&w.instanceColor!==null,instancingMorph:ne&&w.morphTexture!==null,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Pi,alphaToCoverage:!!y.alphaToCoverage,map:pe,matcap:Re,envMap:ce,envMapMode:ce&&O.mapping,envMapCubeUVHeight:K,aoMap:De,lightMap:He,bumpMap:ve,normalMap:W,displacementMap:k,emissiveMap:Ye,normalMapObjectSpace:W&&y.normalMapType===l_,normalMapTangentSpace:W&&y.normalMapType===jm,metalnessMap:Ie,roughnessMap:Be,anisotropy:me,anisotropyMap:J,clearcoat:U,clearcoatMap:ye,clearcoatNormalMap:fe,clearcoatRoughnessMap:Ge,dispersion:b,iridescence:H,iridescenceMap:Ue,iridescenceThicknessMap:oe,sheen:ee,sheenColorMap:ue,sheenRoughnessMap:Le,specularMap:Ne,specularColorMap:Ae,specularIntensityMap:et,transmission:$,transmissionMap:z,thicknessMap:de,gradientMap:le,opaque:y.transparent===!1&&y.blending===Da&&y.alphaToCoverage===!1,alphaMap:Se,alphaTest:ae,alphaHash:te,combine:y.combine,mapUv:pe&&g(y.map.channel),aoMapUv:De&&g(y.aoMap.channel),lightMapUv:He&&g(y.lightMap.channel),bumpMapUv:ve&&g(y.bumpMap.channel),normalMapUv:W&&g(y.normalMap.channel),displacementMapUv:k&&g(y.displacementMap.channel),emissiveMapUv:Ye&&g(y.emissiveMap.channel),metalnessMapUv:Ie&&g(y.metalnessMap.channel),roughnessMapUv:Be&&g(y.roughnessMap.channel),anisotropyMapUv:J&&g(y.anisotropyMap.channel),clearcoatMapUv:ye&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Le&&g(y.sheenRoughnessMap.channel),specularMapUv:Ne&&g(y.specularMap.channel),specularColorMapUv:Ae&&g(y.specularColorMap.channel),specularIntensityMapUv:et&&g(y.specularIntensityMap.channel),transmissionMapUv:z&&g(y.transmissionMap.channel),thicknessMapUv:de&&g(y.thicknessMap.channel),alphaMapUv:Se&&g(y.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(W||me),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!P.attributes.uv&&(pe||Se),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||P.attributes.normal===void 0&&W===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ie,skinning:w.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:se,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:qe,decodeVideoTexture:pe&&y.map.isVideoTexture===!0&&At.getTransfer(y.map.colorSpace)===Bt,decodeVideoTextureEmissive:Ye&&y.emissiveMap.isVideoTexture===!0&&At.getTransfer(y.emissiveMap.colorSpace)===Bt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===mn,flipSided:y.side===tn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Fe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&y.extensions.multiDraw===!0||he)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function p(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let C in y.defines)S.push(C),S.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(m(S,y),x(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function m(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function x(y,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function A(y){let S=d[y.type],C;if(S){let R=kr[S];C=A_.clone(R.uniforms)}else C=y.uniforms;return C}function _(y,S){let C=u.get(S);return C!==void 0?++C.usedTimes:(C=new jw(i,S,y,r),c.push(C),u.set(S,C)),C}function M(y){if(--y.usedTimes===0){let S=c.indexOf(y);c[S]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function T(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:A,acquireProgram:_,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:T}}function tC(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function nC(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function H_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function G_(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,g,v,p,m){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:d,material:g,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:m},i[e]=x):(x.id=h.id,x.object=h,x.geometry=d,x.material=g,x.materialVariant=a(h),x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=p,x.group=m),e++,x}function l(h,d,g,v,p,m){let x=o(h,d,g,v,p,m);g.transmission>0?n.push(x):g.transparent===!0?r.push(x):t.push(x)}function c(h,d,g,v,p,m){let x=o(h,d,g,v,p,m);g.transmission>0?n.unshift(x):g.transparent===!0?r.unshift(x):t.unshift(x)}function u(h,d){t.length>1&&t.sort(h||nC),n.length>1&&n.sort(d||H_),r.length>1&&r.sort(d||H_)}function f(){for(let h=e,d=i.length;h<d;h++){let g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function iC(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new G_,i.set(n,[a])):r>=s.length?(a=new G_,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function rC(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ze};break;case"SpotLight":t={position:new L,direction:new L,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function sC(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var aC=0;function oC(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function lC(i){let e=new rC,t=sC(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let r=new L,s=new je,a=new je;function o(c){let u=0,f=0,h=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,v=0,p=0,m=0,x=0,A=0,_=0,M=0,E=0,T=0;c.sort(oC);for(let S=0,C=c.length;S<C;S++){let R=c[S],w=R.color,I=R.intensity,P=R.distance,F=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===os?F=R.shadow.map.texture:F=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=w.r*I,f+=w.g*I,h+=w.b*I;else if(R.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(R.sh.coefficients[N],I);T++}else if(R.isDirectionalLight){let N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let O=R.shadow,K=t.get(R);K.shadowIntensity=O.intensity,K.shadowBias=O.bias,K.shadowNormalBias=O.normalBias,K.shadowRadius=O.radius,K.shadowMapSize=O.mapSize,n.directionalShadow[d]=K,n.directionalShadowMap[d]=F,n.directionalShadowMatrix[d]=R.shadow.matrix,x++}n.directional[d]=N,d++}else if(R.isSpotLight){let N=e.get(R);N.position.setFromMatrixPosition(R.matrixWorld),N.color.copy(w).multiplyScalar(I),N.distance=P,N.coneCos=Math.cos(R.angle),N.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),N.decay=R.decay,n.spot[v]=N;let O=R.shadow;if(R.map&&(n.spotLightMap[M]=R.map,M++,O.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[v]=O.matrix,R.castShadow){let K=t.get(R);K.shadowIntensity=O.intensity,K.shadowBias=O.bias,K.shadowNormalBias=O.normalBias,K.shadowRadius=O.radius,K.shadowMapSize=O.mapSize,n.spotShadow[v]=K,n.spotShadowMap[v]=F,_++}v++}else if(R.isRectAreaLight){let N=e.get(R);N.color.copy(w).multiplyScalar(I),N.halfWidth.set(R.width*.5,0,0),N.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=N,p++}else if(R.isPointLight){let N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),N.distance=R.distance,N.decay=R.decay,R.castShadow){let O=R.shadow,K=t.get(R);K.shadowIntensity=O.intensity,K.shadowBias=O.bias,K.shadowNormalBias=O.normalBias,K.shadowRadius=O.radius,K.shadowMapSize=O.mapSize,K.shadowCameraNear=O.camera.near,K.shadowCameraFar=O.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=F,n.pointShadowMatrix[g]=R.shadow.matrix,A++}n.point[g]=N,g++}else if(R.isHemisphereLight){let N=e.get(R);N.skyColor.copy(R.color).multiplyScalar(I),N.groundColor.copy(R.groundColor).multiplyScalar(I),n.hemi[m]=N,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let y=n.hash;(y.directionalLength!==d||y.pointLength!==g||y.spotLength!==v||y.rectAreaLength!==p||y.hemiLength!==m||y.numDirectionalShadows!==x||y.numPointShadows!==A||y.numSpotShadows!==_||y.numSpotMaps!==M||y.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=_+M-E,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,y.directionalLength=d,y.pointLength=g,y.spotLength=v,y.rectAreaLength=p,y.hemiLength=m,y.numDirectionalShadows=x,y.numPointShadows=A,y.numSpotShadows=_,y.numSpotMaps=M,y.numLightProbes=T,n.version=aC++)}function l(c,u){let f=0,h=0,d=0,g=0,v=0,p=u.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){let A=c[m];if(A.isDirectionalLight){let _=n.directional[f];_.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),f++}else if(A.isSpotLight){let _=n.spot[d];_.position.setFromMatrixPosition(A.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),d++}else if(A.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(A.matrixWorld),_.position.applyMatrix4(p),a.identity(),s.copy(A.matrixWorld),s.premultiply(p),a.extractRotation(s),_.halfWidth.set(A.width*.5,0,0),_.halfHeight.set(0,A.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(A.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(A.matrixWorld),_.position.applyMatrix4(p),h++}else if(A.isHemisphereLight){let _=n.hemi[v];_.direction.setFromMatrixPosition(A.matrixWorld),_.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:n}}function V_(i){let e=new lC(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function cC(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new V_(i),e.set(r,[o])):s>=a.length?(o=new V_(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var uC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fC=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],dC=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],W_=new je,Kc=new L,ug=new L;function pC(i,e,t){let n=new Pc,r=new be,s=new be,a=new St,o=new Zh,l=new Kh,c={},u=t.maxTextureSize,f={[Di]:tn,[tn]:Di,[mn]:mn},h=new at({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:uC,fragmentShader:hC}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let g=new Kt;g.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new kt(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kc;let m=this.type;this.render=function(E,T,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===zx&&(Je("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=kc);let S=i.getRenderTarget(),C=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),w=i.state;w.setBlending(Ut),w.buffers.depth.getReversed()===!0?w.buffers.color.setClear(0,0,0,0):w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);let I=m!==this.type;I&&T.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(F=>F.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,F=E.length;P<F;P++){let N=E[P],O=N.shadow;if(O===void 0){Je("WebGLShadowMap:",N,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);let K=O.getFrameExtents();r.multiply(K),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/K.x),r.x=s.x*K.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/K.y),r.y=s.y*K.y,O.mapSize.y=s.y));let X=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=X,O.map===null||I===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Jo){if(N.isPointLight){Je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new gt(r.x,r.y,{format:os,type:ri,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),O.map.texture.name=N.name+".shadowMap",O.map.depthTexture=new Ii(r.x,r.y,nn),O.map.depthTexture.name=N.name+".shadowMapDepth",O.map.depthTexture.format=rr,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ct,O.map.depthTexture.magFilter=Ct}else N.isPointLight?(O.map=new il(r.x),O.map.depthTexture=new Yh(r.x,An)):(O.map=new gt(r.x,r.y),O.map.depthTexture=new Ii(r.x,r.y,An)),O.map.depthTexture.name=N.name+".shadowMap",O.map.depthTexture.format=rr,this.type===kc?(O.map.depthTexture.compareFunction=X?qf:Yf,O.map.depthTexture.minFilter=Gt,O.map.depthTexture.magFilter=Gt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ct,O.map.depthTexture.magFilter=Ct);O.camera.updateProjectionMatrix()}let B=O.map.isWebGLCubeRenderTarget?6:1;for(let re=0;re<B;re++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,re),i.clear();else{re===0&&(i.setRenderTarget(O.map),i.clear());let se=O.getViewport(re);a.set(s.x*se.x,s.y*se.y,s.x*se.z,s.y*se.w),w.viewport(a)}if(N.isPointLight){let se=O.camera,Te=O.matrix,Ce=N.distance||se.far;Ce!==se.far&&(se.far=Ce,se.updateProjectionMatrix()),Kc.setFromMatrixPosition(N.matrixWorld),se.position.copy(Kc),ug.copy(se.position),ug.add(fC[re]),se.up.copy(dC[re]),se.lookAt(ug),se.updateMatrixWorld(),Te.makeTranslation(-Kc.x,-Kc.y,-Kc.z),W_.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),O._frustum.setFromProjectionMatrix(W_,se.coordinateSystem,se.reversedDepth)}else O.updateMatrices(N);n=O.getFrustum(),_(T,y,O.camera,N,this.type)}O.isPointLightShadow!==!0&&this.type===Jo&&x(O,y),O.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(S,C,R)};function x(E,T){let y=e.update(v);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new gt(r.x,r.y,{format:os,type:ri})),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(T,null,y,h,v,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(T,null,y,d,v,null)}function A(E,T,y,S){let C=null,R=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)C=R;else if(C=y.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let w=C.uuid,I=T.uuid,P=c[w];P===void 0&&(P={},c[w]=P);let F=P[I];F===void 0&&(F=C.clone(),P[I]=F,T.addEventListener("dispose",M)),C=F}if(C.visible=T.visible,C.wireframe=T.wireframe,S===Jo?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:f[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,y.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let w=i.properties.get(C);w.light=y}return C}function _(E,T,y,S,C){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&C===Jo)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let I=e.update(E),P=E.material;if(Array.isArray(P)){let F=I.groups;for(let N=0,O=F.length;N<O;N++){let K=F[N],X=P[K.materialIndex];if(X&&X.visible){let B=A(E,X,S,C);E.onBeforeShadow(i,E,T,y,I,B,K),i.renderBufferDirect(y,null,I,B,E,K),E.onAfterShadow(i,E,T,y,I,B,K)}}}else if(P.visible){let F=A(E,P,S,C);E.onBeforeShadow(i,E,T,y,I,F,null),i.renderBufferDirect(y,null,I,F,E,null),E.onAfterShadow(i,E,T,y,I,F,null)}}let w=E.children;for(let I=0,P=w.length;I<P;I++)_(w[I],T,y,S,C)}function M(E){E.target.removeEventListener("dispose",M);for(let y in c){let S=c[y],C=E.target.uuid;C in S&&(S[C].dispose(),delete S[C])}}}function mC(i,e){function t(){let z=!1,de=new St,le=null,Se=new St(0,0,0,0);return{setMask:function(ae){le!==ae&&!z&&(i.colorMask(ae,ae,ae,ae),le=ae)},setLocked:function(ae){z=ae},setClear:function(ae,te,Fe,qe,Tt){Tt===!0&&(ae*=qe,te*=qe,Fe*=qe),de.set(ae,te,Fe,qe),Se.equals(de)===!1&&(i.clearColor(ae,te,Fe,qe),Se.copy(de))},reset:function(){z=!1,le=null,Se.set(-1,0,0,0)}}}function n(){let z=!1,de=!1,le=null,Se=null,ae=null;return{setReversed:function(te){if(de!==te){let Fe=e.get("EXT_clip_control");te?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),de=te;let qe=ae;ae=null,this.setClear(qe)}},getReversed:function(){return de},setTest:function(te){te?Z(i.DEPTH_TEST):ie(i.DEPTH_TEST)},setMask:function(te){le!==te&&!z&&(i.depthMask(te),le=te)},setFunc:function(te){if(de&&(te=x_[te]),Se!==te){switch(te){case Bh:i.depthFunc(i.NEVER);break;case zo:i.depthFunc(i.ALWAYS);break;case Uh:i.depthFunc(i.LESS);break;case Pa:i.depthFunc(i.LEQUAL);break;case Lh:i.depthFunc(i.EQUAL);break;case Fh:i.depthFunc(i.GEQUAL);break;case Nh:i.depthFunc(i.GREATER);break;case Oh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=te}},setLocked:function(te){z=te},setClear:function(te){ae!==te&&(ae=te,de&&(te=1-te),i.clearDepth(te))},reset:function(){z=!1,le=null,Se=null,ae=null,de=!1}}}function r(){let z=!1,de=null,le=null,Se=null,ae=null,te=null,Fe=null,qe=null,Tt=null;return{setTest:function(Pe){z||(Pe?Z(i.STENCIL_TEST):ie(i.STENCIL_TEST))},setMask:function(Pe){de!==Pe&&!z&&(i.stencilMask(Pe),de=Pe)},setFunc:function(Pe,Ve,ct){(le!==Pe||Se!==Ve||ae!==ct)&&(i.stencilFunc(Pe,Ve,ct),le=Pe,Se=Ve,ae=ct)},setOp:function(Pe,Ve,ct){(te!==Pe||Fe!==Ve||qe!==ct)&&(i.stencilOp(Pe,Ve,ct),te=Pe,Fe=Ve,qe=ct)},setLocked:function(Pe){z=Pe},setClear:function(Pe){Tt!==Pe&&(i.clearStencil(Pe),Tt=Pe)},reset:function(){z=!1,de=null,le=null,Se=null,ae=null,te=null,Fe=null,qe=null,Tt=null}}}let s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap,u={},f={},h=new WeakMap,d=[],g=null,v=!1,p=null,m=null,x=null,A=null,_=null,M=null,E=null,T=new Ze(0,0,0),y=0,S=!1,C=null,R=null,w=null,I=null,P=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,O=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(K)[1]),N=O>=1):K.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),N=O>=2);let X=null,B={},re=i.getParameter(i.SCISSOR_BOX),se=i.getParameter(i.VIEWPORT),Te=new St().fromArray(re),Ce=new St().fromArray(se);function Y(z,de,le,Se){let ae=new Uint8Array(4),te=i.createTexture();i.bindTexture(z,te),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Fe=0;Fe<le;Fe++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(de+Fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return te}let V={};V[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),V[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),V[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(Pa),ve(!1),W(Fm),Z(i.CULL_FACE),De(Ut);function Z(z){u[z]!==!0&&(i.enable(z),u[z]=!0)}function ie(z){u[z]!==!1&&(i.disable(z),u[z]=!1)}function ne(z,de){return f[z]!==de?(i.bindFramebuffer(z,de),f[z]=de,z===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=de),z===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=de),!0):!1}function he(z,de){let le=d,Se=!1;if(z){le=h.get(de),le===void 0&&(le=[],h.set(de,le));let ae=z.textures;if(le.length!==ae.length||le[0]!==i.COLOR_ATTACHMENT0){for(let te=0,Fe=ae.length;te<Fe;te++)le[te]=i.COLOR_ATTACHMENT0+te;le.length=ae.length,Se=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,Se=!0);Se&&i.drawBuffers(le)}function pe(z){return g!==z?(i.useProgram(z),g=z,!0):!1}let Re={[Bs]:i.FUNC_ADD,[Gx]:i.FUNC_SUBTRACT,[Vx]:i.FUNC_REVERSE_SUBTRACT};Re[Wx]=i.MIN,Re[Xx]=i.MAX;let ce={[Yx]:i.ZERO,[qx]:i.ONE,[Qx]:i.SRC_COLOR,[Ph]:i.SRC_ALPHA,[e_]:i.SRC_ALPHA_SATURATE,[jx]:i.DST_COLOR,[Kx]:i.DST_ALPHA,[Zx]:i.ONE_MINUS_SRC_COLOR,[Ih]:i.ONE_MINUS_SRC_ALPHA,[$x]:i.ONE_MINUS_DST_COLOR,[Jx]:i.ONE_MINUS_DST_ALPHA,[t_]:i.CONSTANT_COLOR,[n_]:i.ONE_MINUS_CONSTANT_COLOR,[i_]:i.CONSTANT_ALPHA,[r_]:i.ONE_MINUS_CONSTANT_ALPHA};function De(z,de,le,Se,ae,te,Fe,qe,Tt,Pe){if(z===Ut){v===!0&&(ie(i.BLEND),v=!1);return}if(v===!1&&(Z(i.BLEND),v=!0),z!==Hx){if(z!==p||Pe!==S){if((m!==Bs||_!==Bs)&&(i.blendEquation(i.FUNC_ADD),m=Bs,_=Bs),Pe)switch(z){case Da:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zc:i.blendFunc(i.ONE,i.ONE);break;case Nm:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Om:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ke("WebGLState: Invalid blending: ",z);break}else switch(z){case Da:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Nm:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Om:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",z);break}x=null,A=null,M=null,E=null,T.set(0,0,0),y=0,p=z,S=Pe}return}ae=ae||de,te=te||le,Fe=Fe||Se,(de!==m||ae!==_)&&(i.blendEquationSeparate(Re[de],Re[ae]),m=de,_=ae),(le!==x||Se!==A||te!==M||Fe!==E)&&(i.blendFuncSeparate(ce[le],ce[Se],ce[te],ce[Fe]),x=le,A=Se,M=te,E=Fe),(qe.equals(T)===!1||Tt!==y)&&(i.blendColor(qe.r,qe.g,qe.b,Tt),T.copy(qe),y=Tt),p=z,S=!1}function He(z,de){z.side===mn?ie(i.CULL_FACE):Z(i.CULL_FACE);let le=z.side===tn;de&&(le=!le),ve(le),z.blending===Da&&z.transparent===!1?De(Ut):De(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);let Se=z.stencilWrite;o.setTest(Se),Se&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Ye(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function ve(z){C!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),C=z)}function W(z){z!==Ox?(Z(i.CULL_FACE),z!==R&&(z===Fm?i.cullFace(i.BACK):z===kx?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ie(i.CULL_FACE),R=z}function k(z){z!==w&&(N&&i.lineWidth(z),w=z)}function Ye(z,de,le){z?(Z(i.POLYGON_OFFSET_FILL),(I!==de||P!==le)&&(I=de,P=le,a.getReversed()&&(de=-de),i.polygonOffset(de,le))):ie(i.POLYGON_OFFSET_FILL)}function Ie(z){z?Z(i.SCISSOR_TEST):ie(i.SCISSOR_TEST)}function Be(z){z===void 0&&(z=i.TEXTURE0+F-1),X!==z&&(i.activeTexture(z),X=z)}function me(z,de,le){le===void 0&&(X===null?le=i.TEXTURE0+F-1:le=X);let Se=B[le];Se===void 0&&(Se={type:void 0,texture:void 0},B[le]=Se),(Se.type!==z||Se.texture!==de)&&(X!==le&&(i.activeTexture(le),X=le),i.bindTexture(z,de||V[z]),Se.type=z,Se.texture=de)}function U(){let z=B[X];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(z){Ke("WebGLState:",z)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(z){Ke("WebGLState:",z)}}function ee(){try{i.texSubImage2D(...arguments)}catch(z){Ke("WebGLState:",z)}}function $(){try{i.texSubImage3D(...arguments)}catch(z){Ke("WebGLState:",z)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(z){Ke("WebGLState:",z)}}function ye(){try{i.compressedTexSubImage3D(...arguments)}catch(z){Ke("WebGLState:",z)}}function fe(){try{i.texStorage2D(...arguments)}catch(z){Ke("WebGLState:",z)}}function Ge(){try{i.texStorage3D(...arguments)}catch(z){Ke("WebGLState:",z)}}function Ue(){try{i.texImage2D(...arguments)}catch(z){Ke("WebGLState:",z)}}function oe(){try{i.texImage3D(...arguments)}catch(z){Ke("WebGLState:",z)}}function ue(z){Te.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),Te.copy(z))}function Le(z){Ce.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),Ce.copy(z))}function Ne(z,de){let le=c.get(de);le===void 0&&(le=new WeakMap,c.set(de,le));let Se=le.get(z);Se===void 0&&(Se=i.getUniformBlockIndex(de,z.name),le.set(z,Se))}function Ae(z,de){let Se=c.get(de).get(z);l.get(de)!==Se&&(i.uniformBlockBinding(de,Se,z.__bindingPointIndex),l.set(de,Se))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},X=null,B={},f={},h=new WeakMap,d=[],g=null,v=!1,p=null,m=null,x=null,A=null,_=null,M=null,E=null,T=new Ze(0,0,0),y=0,S=!1,C=null,R=null,w=null,I=null,P=null,Te.set(0,0,i.canvas.width,i.canvas.height),Ce.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Z,disable:ie,bindFramebuffer:ne,drawBuffers:he,useProgram:pe,setBlending:De,setMaterial:He,setFlipSided:ve,setCullFace:W,setLineWidth:k,setPolygonOffset:Ye,setScissorTest:Ie,activeTexture:Be,bindTexture:me,unbindTexture:U,compressedTexImage2D:b,compressedTexImage3D:H,texImage2D:Ue,texImage3D:oe,updateUBOMapping:Ne,uniformBlockBinding:Ae,texStorage2D:fe,texStorage3D:Ge,texSubImage2D:ee,texSubImage3D:$,compressedTexSubImage2D:J,compressedTexSubImage3D:ye,scissor:ue,viewport:Le,reset:et}}function gC(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,u=new WeakMap,f,h=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(U,b){return d?new OffscreenCanvas(U,b):Ac("canvas")}function v(U,b,H){let ee=1,$=me(U);if(($.width>H||$.height>H)&&(ee=H/Math.max($.width,$.height)),ee<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){let J=Math.floor(ee*$.width),ye=Math.floor(ee*$.height);f===void 0&&(f=g(J,ye));let fe=b?g(J,ye):f;return fe.width=J,fe.height=ye,fe.getContext("2d").drawImage(U,0,0,J,ye),Je("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+J+"x"+ye+")."),fe}else return"data"in U&&Je("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),U;return U}function p(U){return U.generateMipmaps}function m(U){i.generateMipmap(U)}function x(U){return U.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?i.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(U,b,H,ee,$=!1){if(U!==null){if(i[U]!==void 0)return i[U];Je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let J=b;if(b===i.RED&&(H===i.FLOAT&&(J=i.R32F),H===i.HALF_FLOAT&&(J=i.R16F),H===i.UNSIGNED_BYTE&&(J=i.R8)),b===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.R8UI),H===i.UNSIGNED_SHORT&&(J=i.R16UI),H===i.UNSIGNED_INT&&(J=i.R32UI),H===i.BYTE&&(J=i.R8I),H===i.SHORT&&(J=i.R16I),H===i.INT&&(J=i.R32I)),b===i.RG&&(H===i.FLOAT&&(J=i.RG32F),H===i.HALF_FLOAT&&(J=i.RG16F),H===i.UNSIGNED_BYTE&&(J=i.RG8)),b===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RG8UI),H===i.UNSIGNED_SHORT&&(J=i.RG16UI),H===i.UNSIGNED_INT&&(J=i.RG32UI),H===i.BYTE&&(J=i.RG8I),H===i.SHORT&&(J=i.RG16I),H===i.INT&&(J=i.RG32I)),b===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RGB8UI),H===i.UNSIGNED_SHORT&&(J=i.RGB16UI),H===i.UNSIGNED_INT&&(J=i.RGB32UI),H===i.BYTE&&(J=i.RGB8I),H===i.SHORT&&(J=i.RGB16I),H===i.INT&&(J=i.RGB32I)),b===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),H===i.UNSIGNED_INT&&(J=i.RGBA32UI),H===i.BYTE&&(J=i.RGBA8I),H===i.SHORT&&(J=i.RGBA16I),H===i.INT&&(J=i.RGBA32I)),b===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),b===i.RGBA){let ye=$?_c:At.getTransfer(ee);H===i.FLOAT&&(J=i.RGBA32F),H===i.HALF_FLOAT&&(J=i.RGBA16F),H===i.UNSIGNED_BYTE&&(J=ye===Bt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function _(U,b){let H;return U?b===null||b===An||b===Nr?H=i.DEPTH24_STENCIL8:b===nn?H=i.DEPTH32F_STENCIL8:b===Os&&(H=i.DEPTH24_STENCIL8,Je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===An||b===Nr?H=i.DEPTH_COMPONENT24:b===nn?H=i.DEPTH_COMPONENT32F:b===Os&&(H=i.DEPTH_COMPONENT16),H}function M(U,b){return p(U)===!0||U.isFramebufferTexture&&U.minFilter!==Ct&&U.minFilter!==Gt?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function E(U){let b=U.target;b.removeEventListener("dispose",E),y(b),b.isVideoTexture&&u.delete(b)}function T(U){let b=U.target;b.removeEventListener("dispose",T),C(b)}function y(U){let b=n.get(U);if(b.__webglInit===void 0)return;let H=U.source,ee=h.get(H);if(ee){let $=ee[b.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(U),Object.keys(ee).length===0&&h.delete(H)}n.remove(U)}function S(U){let b=n.get(U);i.deleteTexture(b.__webglTexture);let H=U.source,ee=h.get(H);delete ee[b.__cacheKey],a.memory.textures--}function C(U){let b=n.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),n.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(b.__webglFramebuffer[ee]))for(let $=0;$<b.__webglFramebuffer[ee].length;$++)i.deleteFramebuffer(b.__webglFramebuffer[ee][$]);else i.deleteFramebuffer(b.__webglFramebuffer[ee]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[ee])}else{if(Array.isArray(b.__webglFramebuffer))for(let ee=0;ee<b.__webglFramebuffer.length;ee++)i.deleteFramebuffer(b.__webglFramebuffer[ee]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ee=0;ee<b.__webglColorRenderbuffer.length;ee++)b.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[ee]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let H=U.textures;for(let ee=0,$=H.length;ee<$;ee++){let J=n.get(H[ee]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(H[ee])}n.remove(U)}let R=0;function w(){R=0}function I(){let U=R;return U>=r.maxTextures&&Je("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+r.maxTextures),R+=1,U}function P(U){let b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function F(U,b){let H=n.get(U);if(U.isVideoTexture&&Ie(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&H.__version!==U.version){let ee=U.image;if(ee===null)Je("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)Je("WebGLRenderer: Texture marked for update but image is incomplete");else{V(H,U,b);return}}else U.isExternalTexture&&(H.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+b)}function N(U,b){let H=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&H.__version!==U.version){V(H,U,b);return}else U.isExternalTexture&&(H.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+b)}function O(U,b){let H=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&H.__version!==U.version){V(H,U,b);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+b)}function K(U,b){let H=n.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&H.__version!==U.version){Z(H,U,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+b)}let X={[Ho]:i.REPEAT,[Br]:i.CLAMP_TO_EDGE,[kh]:i.MIRRORED_REPEAT},B={[Ct]:i.NEAREST,[o_]:i.NEAREST_MIPMAP_NEAREST,[Gc]:i.NEAREST_MIPMAP_LINEAR,[Gt]:i.LINEAR,[hf]:i.LINEAR_MIPMAP_NEAREST,[Fr]:i.LINEAR_MIPMAP_LINEAR},re={[c_]:i.NEVER,[p_]:i.ALWAYS,[u_]:i.LESS,[Yf]:i.LEQUAL,[h_]:i.EQUAL,[qf]:i.GEQUAL,[f_]:i.GREATER,[d_]:i.NOTEQUAL};function se(U,b){if(b.type===nn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Gt||b.magFilter===hf||b.magFilter===Gc||b.magFilter===Fr||b.minFilter===Gt||b.minFilter===hf||b.minFilter===Gc||b.minFilter===Fr)&&Je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(U,i.TEXTURE_WRAP_S,X[b.wrapS]),i.texParameteri(U,i.TEXTURE_WRAP_T,X[b.wrapT]),(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)&&i.texParameteri(U,i.TEXTURE_WRAP_R,X[b.wrapR]),i.texParameteri(U,i.TEXTURE_MAG_FILTER,B[b.magFilter]),i.texParameteri(U,i.TEXTURE_MIN_FILTER,B[b.minFilter]),b.compareFunction&&(i.texParameteri(U,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(U,i.TEXTURE_COMPARE_FUNC,re[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ct||b.minFilter!==Gc&&b.minFilter!==Fr||b.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(U,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Te(U,b){let H=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",E));let ee=b.source,$=h.get(ee);$===void 0&&($={},h.set(ee,$));let J=P(b);if(J!==U.__cacheKey){$[J]===void 0&&($[J]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),$[J].usedTimes++;let ye=$[U.__cacheKey];ye!==void 0&&($[U.__cacheKey].usedTimes--,ye.usedTimes===0&&S(b)),U.__cacheKey=J,U.__webglTexture=$[J].texture}return H}function Ce(U,b,H){return Math.floor(Math.floor(U/H)/b)}function Y(U,b,H,ee){let J=U.updateRanges;if(J.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,H,ee,b.data);else{J.sort((oe,ue)=>oe.start-ue.start);let ye=0;for(let oe=1;oe<J.length;oe++){let ue=J[ye],Le=J[oe],Ne=ue.start+ue.count,Ae=Ce(Le.start,b.width,4),et=Ce(ue.start,b.width,4);Le.start<=Ne+1&&Ae===et&&Ce(Le.start+Le.count-1,b.width,4)===Ae?ue.count=Math.max(ue.count,Le.start+Le.count-ue.start):(++ye,J[ye]=Le)}J.length=ye+1;let fe=i.getParameter(i.UNPACK_ROW_LENGTH),Ge=i.getParameter(i.UNPACK_SKIP_PIXELS),Ue=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let oe=0,ue=J.length;oe<ue;oe++){let Le=J[oe],Ne=Math.floor(Le.start/4),Ae=Math.ceil(Le.count/4),et=Ne%b.width,z=Math.floor(Ne/b.width),de=Ae,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,et),i.pixelStorei(i.UNPACK_SKIP_ROWS,z),t.texSubImage2D(i.TEXTURE_2D,0,et,z,de,le,H,ee,b.data)}U.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,fe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ue)}}function V(U,b,H){let ee=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ee=i.TEXTURE_3D);let $=Te(U,b),J=b.source;t.bindTexture(ee,U.__webglTexture,i.TEXTURE0+H);let ye=n.get(J);if(J.version!==ye.__version||$===!0){t.activeTexture(i.TEXTURE0+H);let fe=At.getPrimaries(At.workingColorSpace),Ge=b.colorSpace===yi?null:At.getPrimaries(b.colorSpace),Ue=b.colorSpace===yi||fe===Ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let oe=v(b.image,!1,r.maxTextureSize);oe=Be(b,oe);let ue=s.convert(b.format,b.colorSpace),Le=s.convert(b.type),Ne=A(b.internalFormat,ue,Le,b.colorSpace,b.isVideoTexture);se(ee,b);let Ae,et=b.mipmaps,z=b.isVideoTexture!==!0,de=ye.__version===void 0||$===!0,le=J.dataReady,Se=M(b,oe);if(b.isDepthTexture)Ne=_(b.format===ar,b.type),de&&(z?t.texStorage2D(i.TEXTURE_2D,1,Ne,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Ne,oe.width,oe.height,0,ue,Le,null));else if(b.isDataTexture)if(et.length>0){z&&de&&t.texStorage2D(i.TEXTURE_2D,Se,Ne,et[0].width,et[0].height);for(let ae=0,te=et.length;ae<te;ae++)Ae=et[ae],z?le&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ae.width,Ae.height,ue,Le,Ae.data):t.texImage2D(i.TEXTURE_2D,ae,Ne,Ae.width,Ae.height,0,ue,Le,Ae.data);b.generateMipmaps=!1}else z?(de&&t.texStorage2D(i.TEXTURE_2D,Se,Ne,oe.width,oe.height),le&&Y(b,oe,ue,Le)):t.texImage2D(i.TEXTURE_2D,0,Ne,oe.width,oe.height,0,ue,Le,oe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){z&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ne,et[0].width,et[0].height,oe.depth);for(let ae=0,te=et.length;ae<te;ae++)if(Ae=et[ae],b.format!==Sn)if(ue!==null)if(z){if(le)if(b.layerUpdates.size>0){let Fe=rg(Ae.width,Ae.height,b.format,b.type);for(let qe of b.layerUpdates){let Tt=Ae.data.subarray(qe*Fe/Ae.data.BYTES_PER_ELEMENT,(qe+1)*Fe/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,qe,Ae.width,Ae.height,1,ue,Tt)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Ae.width,Ae.height,oe.depth,ue,Ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Ne,Ae.width,Ae.height,oe.depth,0,Ae.data,0,0);else Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Ae.width,Ae.height,oe.depth,ue,Le,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Ne,Ae.width,Ae.height,oe.depth,0,ue,Le,Ae.data)}else{z&&de&&t.texStorage2D(i.TEXTURE_2D,Se,Ne,et[0].width,et[0].height);for(let ae=0,te=et.length;ae<te;ae++)Ae=et[ae],b.format!==Sn?ue!==null?z?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,Ae.width,Ae.height,ue,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Ne,Ae.width,Ae.height,0,Ae.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?le&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ae.width,Ae.height,ue,Le,Ae.data):t.texImage2D(i.TEXTURE_2D,ae,Ne,Ae.width,Ae.height,0,ue,Le,Ae.data)}else if(b.isDataArrayTexture)if(z){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ne,oe.width,oe.height,oe.depth),le)if(b.layerUpdates.size>0){let ae=rg(oe.width,oe.height,b.format,b.type);for(let te of b.layerUpdates){let Fe=oe.data.subarray(te*ae/oe.data.BYTES_PER_ELEMENT,(te+1)*ae/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,te,oe.width,oe.height,1,ue,Le,Fe)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,ue,Le,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ne,oe.width,oe.height,oe.depth,0,ue,Le,oe.data);else if(b.isData3DTexture)z?(de&&t.texStorage3D(i.TEXTURE_3D,Se,Ne,oe.width,oe.height,oe.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,ue,Le,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Ne,oe.width,oe.height,oe.depth,0,ue,Le,oe.data);else if(b.isFramebufferTexture){if(de)if(z)t.texStorage2D(i.TEXTURE_2D,Se,Ne,oe.width,oe.height);else{let ae=oe.width,te=oe.height;for(let Fe=0;Fe<Se;Fe++)t.texImage2D(i.TEXTURE_2D,Fe,Ne,ae,te,0,ue,Le,null),ae>>=1,te>>=1}}else if(et.length>0){if(z&&de){let ae=me(et[0]);t.texStorage2D(i.TEXTURE_2D,Se,Ne,ae.width,ae.height)}for(let ae=0,te=et.length;ae<te;ae++)Ae=et[ae],z?le&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,ue,Le,Ae):t.texImage2D(i.TEXTURE_2D,ae,Ne,ue,Le,Ae);b.generateMipmaps=!1}else if(z){if(de){let ae=me(oe);t.texStorage2D(i.TEXTURE_2D,Se,Ne,ae.width,ae.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Le,oe)}else t.texImage2D(i.TEXTURE_2D,0,Ne,ue,Le,oe);p(b)&&m(ee),ye.__version=J.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function Z(U,b,H){if(b.image.length!==6)return;let ee=Te(U,b),$=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+H);let J=n.get($);if($.version!==J.__version||ee===!0){t.activeTexture(i.TEXTURE0+H);let ye=At.getPrimaries(At.workingColorSpace),fe=b.colorSpace===yi?null:At.getPrimaries(b.colorSpace),Ge=b.colorSpace===yi||ye===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let Ue=b.isCompressedTexture||b.image[0].isCompressedTexture,oe=b.image[0]&&b.image[0].isDataTexture,ue=[];for(let te=0;te<6;te++)!Ue&&!oe?ue[te]=v(b.image[te],!0,r.maxCubemapSize):ue[te]=oe?b.image[te].image:b.image[te],ue[te]=Be(b,ue[te]);let Le=ue[0],Ne=s.convert(b.format,b.colorSpace),Ae=s.convert(b.type),et=A(b.internalFormat,Ne,Ae,b.colorSpace),z=b.isVideoTexture!==!0,de=J.__version===void 0||ee===!0,le=$.dataReady,Se=M(b,Le);se(i.TEXTURE_CUBE_MAP,b);let ae;if(Ue){z&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,et,Le.width,Le.height);for(let te=0;te<6;te++){ae=ue[te].mipmaps;for(let Fe=0;Fe<ae.length;Fe++){let qe=ae[Fe];b.format!==Sn?Ne!==null?z?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe,0,0,qe.width,qe.height,Ne,qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe,et,qe.width,qe.height,0,qe.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe,0,0,qe.width,qe.height,Ne,Ae,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe,et,qe.width,qe.height,0,Ne,Ae,qe.data)}}}else{if(ae=b.mipmaps,z&&de){ae.length>0&&Se++;let te=me(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,et,te.width,te.height)}for(let te=0;te<6;te++)if(oe){z?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ue[te].width,ue[te].height,Ne,Ae,ue[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,et,ue[te].width,ue[te].height,0,Ne,Ae,ue[te].data);for(let Fe=0;Fe<ae.length;Fe++){let Tt=ae[Fe].image[te].image;z?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe+1,0,0,Tt.width,Tt.height,Ne,Ae,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe+1,et,Tt.width,Tt.height,0,Ne,Ae,Tt.data)}}else{z?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ne,Ae,ue[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,et,Ne,Ae,ue[te]);for(let Fe=0;Fe<ae.length;Fe++){let qe=ae[Fe];z?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe+1,0,0,Ne,Ae,qe.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Fe+1,et,Ne,Ae,qe.image[te])}}}p(b)&&m(i.TEXTURE_CUBE_MAP),J.__version=$.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function ie(U,b,H,ee,$,J){let ye=s.convert(H.format,H.colorSpace),fe=s.convert(H.type),Ge=A(H.internalFormat,ye,fe,H.colorSpace),Ue=n.get(b),oe=n.get(H);if(oe.__renderTarget=b,!Ue.__hasExternalTextures){let ue=Math.max(1,b.width>>J),Le=Math.max(1,b.height>>J);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,J,Ge,ue,Le,b.depth,0,ye,fe,null):t.texImage2D($,J,Ge,ue,Le,0,ye,fe,null)}t.bindFramebuffer(i.FRAMEBUFFER,U),Ye(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,$,oe.__webglTexture,0,k(b)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,$,oe.__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(U,b,H){if(i.bindRenderbuffer(i.RENDERBUFFER,U),b.depthBuffer){let ee=b.depthTexture,$=ee&&ee.isDepthTexture?ee.type:null,J=_(b.stencilBuffer,$),ye=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ye(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k(b),J,b.width,b.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,k(b),J,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,J,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,U)}else{let ee=b.textures;for(let $=0;$<ee.length;$++){let J=ee[$],ye=s.convert(J.format,J.colorSpace),fe=s.convert(J.type),Ge=A(J.internalFormat,ye,fe,J.colorSpace);Ye(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k(b),Ge,b.width,b.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,k(b),Ge,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Ge,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(U,b,H){let ee=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(b.depthTexture);if($.__renderTarget=b,(!$.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ee){if($.__webglInit===void 0&&($.__webglInit=!0,b.depthTexture.addEventListener("dispose",E)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),se(i.TEXTURE_CUBE_MAP,b.depthTexture);let Ue=s.convert(b.depthTexture.format),oe=s.convert(b.depthTexture.type),ue;b.depthTexture.format===rr?ue=i.DEPTH_COMPONENT24:b.depthTexture.format===ar&&(ue=i.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,ue,b.width,b.height,0,Ue,oe,null)}}else F(b.depthTexture,0);let J=$.__webglTexture,ye=k(b),fe=ee?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,Ge=b.depthTexture.format===ar?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===rr)Ye(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ge,fe,J,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Ge,fe,J,0);else if(b.depthTexture.format===ar)Ye(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ge,fe,J,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Ge,fe,J,0);else throw new Error("Unknown depthTexture format")}function pe(U){let b=n.get(U),H=U.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==U.depthTexture){let ee=U.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ee){let $=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ee.removeEventListener("dispose",$)};ee.addEventListener("dispose",$),b.__depthDisposeCallback=$}b.__boundDepthTexture=ee}if(U.depthTexture&&!b.__autoAllocateDepthBuffer)if(H)for(let ee=0;ee<6;ee++)he(b.__webglFramebuffer[ee],U,ee);else{let ee=U.texture.mipmaps;ee&&ee.length>0?he(b.__webglFramebuffer[0],U,0):he(b.__webglFramebuffer,U,0)}else if(H){b.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ee]),b.__webglDepthbuffer[ee]===void 0)b.__webglDepthbuffer[ee]=i.createRenderbuffer(),ne(b.__webglDepthbuffer[ee],U,!1);else{let $=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[ee];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,J)}}else{let ee=U.texture.mipmaps;if(ee&&ee.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ne(b.__webglDepthbuffer,U,!1);else{let $=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,J)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Re(U,b,H){let ee=n.get(U);b!==void 0&&ie(ee.__webglFramebuffer,U,U.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&pe(U)}function ce(U){let b=U.texture,H=n.get(U),ee=n.get(b);U.addEventListener("dispose",T);let $=U.textures,J=U.isWebGLCubeRenderTarget===!0,ye=$.length>1;if(ye||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=b.version,a.memory.textures++),J){H.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer[fe]=[];for(let Ge=0;Ge<b.mipmaps.length;Ge++)H.__webglFramebuffer[fe][Ge]=i.createFramebuffer()}else H.__webglFramebuffer[fe]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer=[];for(let fe=0;fe<b.mipmaps.length;fe++)H.__webglFramebuffer[fe]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(ye)for(let fe=0,Ge=$.length;fe<Ge;fe++){let Ue=n.get($[fe]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),a.memory.textures++)}if(U.samples>0&&Ye(U)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let fe=0;fe<$.length;fe++){let Ge=$[fe];H.__webglColorRenderbuffer[fe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[fe]);let Ue=s.convert(Ge.format,Ge.colorSpace),oe=s.convert(Ge.type),ue=A(Ge.internalFormat,Ue,oe,Ge.colorSpace,U.isXRRenderTarget===!0),Le=k(U);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,ue,U.width,U.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,H.__webglColorRenderbuffer[fe])}i.bindRenderbuffer(i.RENDERBUFFER,null),U.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ne(H.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),se(i.TEXTURE_CUBE_MAP,b);for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0)for(let Ge=0;Ge<b.mipmaps.length;Ge++)ie(H.__webglFramebuffer[fe][Ge],U,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge);else ie(H.__webglFramebuffer[fe],U,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);p(b)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let fe=0,Ge=$.length;fe<Ge;fe++){let Ue=$[fe],oe=n.get(Ue),ue=i.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(ue=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,oe.__webglTexture),se(ue,Ue),ie(H.__webglFramebuffer,U,Ue,i.COLOR_ATTACHMENT0+fe,ue,0),p(Ue)&&m(ue)}t.unbindTexture()}else{let fe=i.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(fe=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,ee.__webglTexture),se(fe,b),b.mipmaps&&b.mipmaps.length>0)for(let Ge=0;Ge<b.mipmaps.length;Ge++)ie(H.__webglFramebuffer[Ge],U,b,i.COLOR_ATTACHMENT0,fe,Ge);else ie(H.__webglFramebuffer,U,b,i.COLOR_ATTACHMENT0,fe,0);p(b)&&m(fe),t.unbindTexture()}U.depthBuffer&&pe(U)}function De(U){let b=U.textures;for(let H=0,ee=b.length;H<ee;H++){let $=b[H];if(p($)){let J=x(U),ye=n.get($).__webglTexture;t.bindTexture(J,ye),m(J),t.unbindTexture()}}}let He=[],ve=[];function W(U){if(U.samples>0){if(Ye(U)===!1){let b=U.textures,H=U.width,ee=U.height,$=i.COLOR_BUFFER_BIT,J=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(U),fe=b.length>1;if(fe)for(let Ue=0;Ue<b.length;Ue++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);let Ge=U.texture.mipmaps;Ge&&Ge.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Ue=0;Ue<b.length;Ue++){if(U.resolveDepthBuffer&&(U.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),fe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Ue]);let oe=n.get(b[Ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,oe,0)}i.blitFramebuffer(0,0,H,ee,0,0,H,ee,$,i.NEAREST),l===!0&&(He.length=0,ve.length=0,He.push(i.COLOR_ATTACHMENT0+Ue),U.depthBuffer&&U.resolveDepthBuffer===!1&&(He.push(J),ve.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ve)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),fe)for(let Ue=0;Ue<b.length;Ue++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Ue]);let oe=n.get(b[Ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){let b=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function k(U){return Math.min(r.maxSamples,U.samples)}function Ye(U){let b=n.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ie(U){let b=a.render.frame;u.get(U)!==b&&(u.set(U,b),U.update())}function Be(U,b){let H=U.colorSpace,ee=U.format,$=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||H!==Pi&&H!==yi&&(At.getTransfer(H)===Bt?(ee!==Sn||$!==xt)&&Je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",H)),b}function me(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=w,this.setTexture2D=F,this.setTexture2DArray=N,this.setTexture3D=O,this.setTextureCube=K,this.rebindTextures=Re,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=De,this.updateMultisampleRenderTarget=W,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Ye,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function vC(i,e){function t(n,r=yi){let s,a=At.getTransfer(r);if(n===xt)return i.UNSIGNED_BYTE;if(n===ff)return i.UNSIGNED_SHORT_4_4_4_4;if(n===df)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qm)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zm)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===jo)return i.BYTE;if(n===Vc)return i.SHORT;if(n===Os)return i.UNSIGNED_SHORT;if(n===ks)return i.INT;if(n===An)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===Km)return i.ALPHA;if(n===Jm)return i.RGB;if(n===Sn)return i.RGBA;if(n===rr)return i.DEPTH_COMPONENT;if(n===ar)return i.DEPTH_STENCIL;if(n===zs)return i.RED;if(n===$o)return i.RED_INTEGER;if(n===os)return i.RG;if(n===Hs)return i.RG_INTEGER;if(n===Gs)return i.RGBA_INTEGER;if(n===Wc||n===Xc||n===Yc||n===qc)if(a===Bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Wc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Yc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Wc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Yc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pf||n===mf||n===gf||n===vf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===pf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xf||n===_f||n===yf||n===Af||n===Sf||n===Mf||n===Tf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===xf||n===_f)return a===Bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===yf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Af)return s.COMPRESSED_R11_EAC;if(n===Sf)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Mf)return s.COMPRESSED_RG11_EAC;if(n===Tf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ef||n===bf||n===wf||n===Cf||n===Rf||n===Df||n===Pf||n===If||n===Bf||n===Uf||n===Lf||n===Ff||n===Nf||n===Of)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ef)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Rf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Df)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===If)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Lf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ff)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nf)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Of)return a===Bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===kf||n===zf||n===Hf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===kf)return a===Bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gf||n===Vf||n===Wf||n===Xf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Gf)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Vf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Nr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var xC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_C=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Bc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new at({vertexShader:xC,fragmentShader:_C,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new kt(new ss(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_g=class extends gi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null,v=typeof XRWebGLBinding<"u",p=new xg,m={},x=t.getContextAttributes(),A=null,_=null,M=[],E=[],T=new be,y=null,S=new _n;S.viewport=new St;let C=new _n;C.viewport=new St;let R=[S,C],w=new lf,I=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Z=M[V];return Z===void 0&&(Z=new Xo,M[V]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(V){let Z=M[V];return Z===void 0&&(Z=new Xo,M[V]=Z),Z.getGripSpace()},this.getHand=function(V){let Z=M[V];return Z===void 0&&(Z=new Xo,M[V]=Z),Z.getHandSpace()};function F(V){let Z=E.indexOf(V.inputSource);if(Z===-1)return;let ie=M[Z];ie!==void 0&&(ie.update(V.inputSource,V.frame,c||a),ie.dispatchEvent({type:V.type,data:V.inputSource}))}function N(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",O);for(let V=0;V<M.length;V++){let Z=E[V];Z!==null&&(E[V]=null,M[V].disconnect(Z))}I=null,P=null,p.reset();for(let V in m)delete m[V];e.setRenderTarget(A),d=null,h=null,f=null,r=null,_=null,Y.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,n.isPresenting===!0&&Je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&Je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(A=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",N),r.addEventListener("inputsourceschange",O),x.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,ne=null,he=null;x.depth&&(he=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=x.stencil?ar:rr,ne=x.stencil?Nr:An);let pe={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(pe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new gt(h.textureWidth,h.textureHeight,{format:Sn,type:xt,depthTexture:new Ii(h.textureWidth,h.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let ie={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new gt(d.framebufferWidth,d.framebufferHeight,{format:Sn,type:xt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Y.setContext(r),Y.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function O(V){for(let Z=0;Z<V.removed.length;Z++){let ie=V.removed[Z],ne=E.indexOf(ie);ne>=0&&(E[ne]=null,M[ne].disconnect(ie))}for(let Z=0;Z<V.added.length;Z++){let ie=V.added[Z],ne=E.indexOf(ie);if(ne===-1){for(let pe=0;pe<M.length;pe++)if(pe>=E.length){E.push(ie),ne=pe;break}else if(E[pe]===null){E[pe]=ie,ne=pe;break}if(ne===-1)break}let he=M[ne];he&&he.connect(ie)}}let K=new L,X=new L;function B(V,Z,ie){K.setFromMatrixPosition(Z.matrixWorld),X.setFromMatrixPosition(ie.matrixWorld);let ne=K.distanceTo(X),he=Z.projectionMatrix.elements,pe=ie.projectionMatrix.elements,Re=he[14]/(he[10]-1),ce=he[14]/(he[10]+1),De=(he[9]+1)/he[5],He=(he[9]-1)/he[5],ve=(he[8]-1)/he[0],W=(pe[8]+1)/pe[0],k=Re*ve,Ye=Re*W,Ie=ne/(-ve+W),Be=Ie*-ve;if(Z.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Be),V.translateZ(Ie),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),he[10]===-1)V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let me=Re+Ie,U=ce+Ie,b=k-Be,H=Ye+(ne-Be),ee=De*ce/U*me,$=He*ce/U*me;V.projectionMatrix.makePerspective(b,H,ee,$,me,U),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function re(V,Z){Z===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Z.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;let Z=V.near,ie=V.far;p.texture!==null&&(p.depthNear>0&&(Z=p.depthNear),p.depthFar>0&&(ie=p.depthFar)),w.near=C.near=S.near=Z,w.far=C.far=S.far=ie,(I!==w.near||P!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),I=w.near,P=w.far),w.layers.mask=V.layers.mask|6,S.layers.mask=w.layers.mask&-5,C.layers.mask=w.layers.mask&-3;let ne=V.parent,he=w.cameras;re(w,ne);for(let pe=0;pe<he.length;pe++)re(he[pe],ne);he.length===2?B(w,S,C):w.projectionMatrix.copy(S.projectionMatrix),se(V,w,ne)};function se(V,Z,ie){ie===null?V.matrix.copy(Z.matrixWorld):(V.matrix.copy(ie.matrixWorld),V.matrix.invert(),V.matrix.multiply(Z.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Vo*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(V){l=V,h!==null&&(h.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(w)},this.getCameraTexture=function(V){return m[V]};let Te=null;function Ce(V,Z){if(u=Z.getViewerPose(c||a),g=Z,u!==null){let ie=u.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let ne=!1;ie.length!==w.cameras.length&&(w.cameras.length=0,ne=!0);for(let ce=0;ce<ie.length;ce++){let De=ie[ce],He=null;if(d!==null)He=d.getViewport(De);else{let W=f.getViewSubImage(h,De);He=W.viewport,ce===0&&(e.setRenderTargetTextures(_,W.colorTexture,W.depthStencilTexture),e.setRenderTarget(_))}let ve=R[ce];ve===void 0&&(ve=new _n,ve.layers.enable(ce),ve.viewport=new St,R[ce]=ve),ve.matrix.fromArray(De.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(De.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(He.x,He.y,He.width,He.height),ce===0&&(w.matrix.copy(ve.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),ne===!0&&w.cameras.push(ve)}let he=r.enabledFeatures;if(he&&he.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let ce=f.getDepthInformation(ie[0]);ce&&ce.isValid&&ce.texture&&p.init(ce,r.renderState)}if(he&&he.includes("camera-access")&&v){e.state.unbindTexture(),f=n.getBinding();for(let ce=0;ce<ie.length;ce++){let De=ie[ce].camera;if(De){let He=m[De];He||(He=new Bc,m[De]=He);let ve=f.getCameraImage(De);He.sourceTexture=ve}}}}for(let ie=0;ie<M.length;ie++){let ne=E[ie],he=M[ie];ne!==null&&he!==void 0&&he.update(ne,Z,c||a)}Te&&Te(V,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}let Y=new X_;Y.setAnimationLoop(Ce),this.setAnimationLoop=function(V){Te=V},this.dispose=function(){}}},Oa=new yr,yC=new je;function AC(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,tg(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,x,A,_){m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),f(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,_)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,x,A):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===tn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===tn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let x=e.get(m),A=x.envMap,_=x.envMapRotation;A&&(p.envMap.value=A,Oa.copy(_),Oa.x*=-1,Oa.y*=-1,Oa.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Oa.y*=-1,Oa.z*=-1),p.envMapRotation.value.setFromMatrix4(yC.makeRotationFromEuler(Oa)),p.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,x,A){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=A*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===tn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function SC(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){let _=A.program;n.uniformBlockBinding(x,_)}function c(x,A){let _=r[x.id];_===void 0&&(g(x),_=u(x),r[x.id]=_,x.addEventListener("dispose",p));let M=A.program;n.updateUBOMapping(x,M);let E=e.render.frame;s[x.id]!==E&&(h(x),s[x.id]=E)}function u(x){let A=f();x.__bindingPointIndex=A;let _=i.createBuffer(),M=x.__size,E=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,M,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,_),_}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){let A=r[x.id],_=x.uniforms,M=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let E=0,T=_.length;E<T;E++){let y=Array.isArray(_[E])?_[E]:[_[E]];for(let S=0,C=y.length;S<C;S++){let R=y[S];if(d(R,E,S,M)===!0){let w=R.__offset,I=Array.isArray(R.value)?R.value:[R.value],P=0;for(let F=0;F<I.length;F++){let N=I[F],O=v(N);typeof N=="number"||typeof N=="boolean"?(R.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,w+P,R.__data)):N.isMatrix3?(R.__data[0]=N.elements[0],R.__data[1]=N.elements[1],R.__data[2]=N.elements[2],R.__data[3]=0,R.__data[4]=N.elements[3],R.__data[5]=N.elements[4],R.__data[6]=N.elements[5],R.__data[7]=0,R.__data[8]=N.elements[6],R.__data[9]=N.elements[7],R.__data[10]=N.elements[8],R.__data[11]=0):(N.toArray(R.__data,P),P+=O.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,w,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,A,_,M){let E=x.value,T=A+"_"+_;if(M[T]===void 0)return typeof E=="number"||typeof E=="boolean"?M[T]=E:M[T]=E.clone(),!0;{let y=M[T];if(typeof E=="number"||typeof E=="boolean"){if(y!==E)return M[T]=E,!0}else if(y.equals(E)===!1)return y.copy(E),!0}return!1}function g(x){let A=x.uniforms,_=0,M=16;for(let T=0,y=A.length;T<y;T++){let S=Array.isArray(A[T])?A[T]:[A[T]];for(let C=0,R=S.length;C<R;C++){let w=S[C],I=Array.isArray(w.value)?w.value:[w.value];for(let P=0,F=I.length;P<F;P++){let N=I[P],O=v(N),K=_%M,X=K%O.boundary,B=K+X;_+=X,B!==0&&M-B<O.storage&&(_+=M-B),w.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=_,_+=O.storage}}}let E=_%M;return E>0&&(_+=M-E),x.__size=_,x.__cache={},this}function v(x){let A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Je("WebGLRenderer: Unsupported uniform value type.",x),A}function p(x){let A=x.target;A.removeEventListener("dispose",p);let _=a.indexOf(A.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function m(){for(let x in r)i.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var MC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Or=null;function TC(){return Or===null&&(Or=new sr(MC,16,16,os,ri),Or.name="DFG_LUT",Or.minFilter=Gt,Or.magFilter=Gt,Or.wrapS=Br,Or.wrapT=Br,Or.generateMipmaps=!1,Or.needsUpdate=!0),Or}var Kf=class{constructor(e={}){let{canvas:t=m_(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=xt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let v=d,p=new Set([Gs,Hs,$o]),m=new Set([xt,An,Os,Nr,ff,df]),x=new Uint32Array(4),A=new Int32Array(4),_=null,M=null,E=[],T=[],y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=it;let R=0,w=0,I=null,P=-1,F=null,N=new St,O=new St,K=null,X=new Ze(0),B=0,re=t.width,se=t.height,Te=1,Ce=null,Y=null,V=new St(0,0,re,se),Z=new St(0,0,re,se),ie=!1,ne=new Pc,he=!1,pe=!1,Re=new je,ce=new L,De=new St,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function W(){return I===null?Te:1}let k=n;function Ye(D,G){return t.getContext(D,G)}try{let D={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wn}`),t.addEventListener("webglcontextlost",Fe,!1),t.addEventListener("webglcontextrestored",qe,!1),t.addEventListener("webglcontextcreationerror",Tt,!1),k===null){let G="webgl2";if(k=Ye(G,D),k===null)throw Ye(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw Ke("WebGLRenderer: "+D.message),D}let Ie,Be,me,U,b,H,ee,$,J,ye,fe,Ge,Ue,oe,ue,Le,Ne,Ae,et,z,de,le,Se;function ae(){Ie=new Ib(k),Ie.init(),de=new vC(k,Ie),Be=new Tb(k,Ie,e,de),me=new mC(k,Ie),Be.reversedDepthBuffer&&h&&me.buffers.depth.setReversed(!0),U=new Lb(k),b=new tC,H=new gC(k,Ie,me,b,Be,de,U),ee=new Pb(S),$=new zM(k),le=new Sb(k,$),J=new Bb(k,$,U,le),ye=new Nb(k,J,$,le,U),Ae=new Fb(k,Be,H),ue=new Eb(b),fe=new eC(S,ee,Ie,Be,le,ue),Ge=new AC(S,b),Ue=new iC,oe=new cC(Ie),Ne=new Ab(S,ee,me,ye,g,l),Le=new pC(S,ye,Be),Se=new SC(k,U,Be,me),et=new Mb(k,Ie,U),z=new Ub(k,Ie,U),U.programs=fe.programs,S.capabilities=Be,S.extensions=Ie,S.properties=b,S.renderLists=Ue,S.shadowMap=Le,S.state=me,S.info=U}ae(),v!==xt&&(y=new kb(v,t.width,t.height,r,s));let te=new _g(S,k);this.xr=te,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let D=Ie.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=Ie.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return Te},this.setPixelRatio=function(D){D!==void 0&&(Te=D,this.setSize(re,se,!1))},this.getSize=function(D){return D.set(re,se)},this.setSize=function(D,G,j=!0){if(te.isPresenting){Je("WebGLRenderer: Can't change size while VR device is presenting.");return}re=D,se=G,t.width=Math.floor(D*Te),t.height=Math.floor(G*Te),j===!0&&(t.style.width=D+"px",t.style.height=G+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,D,G)},this.getDrawingBufferSize=function(D){return D.set(re*Te,se*Te).floor()},this.setDrawingBufferSize=function(D,G,j){re=D,se=G,Te=j,t.width=Math.floor(D*j),t.height=Math.floor(G*j),this.setViewport(0,0,D,G)},this.setEffects=function(D){if(v===xt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let G=0;G<D.length;G++)if(D[G].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(N)},this.getViewport=function(D){return D.copy(V)},this.setViewport=function(D,G,j,Q){D.isVector4?V.set(D.x,D.y,D.z,D.w):V.set(D,G,j,Q),me.viewport(N.copy(V).multiplyScalar(Te).round())},this.getScissor=function(D){return D.copy(Z)},this.setScissor=function(D,G,j,Q){D.isVector4?Z.set(D.x,D.y,D.z,D.w):Z.set(D,G,j,Q),me.scissor(O.copy(Z).multiplyScalar(Te).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(D){me.setScissorTest(ie=D)},this.setOpaqueSort=function(D){Ce=D},this.setTransparentSort=function(D){Y=D},this.getClearColor=function(D){return D.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(D=!0,G=!0,j=!0){let Q=0;if(D){let q=!1;if(I!==null){let xe=I.texture.format;q=p.has(xe)}if(q){let xe=I.texture.type,Me=m.has(xe),_e=Ne.getClearColor(),ke=Ne.getClearAlpha(),Oe=_e.r,ot=_e.g,ft=_e.b;Me?(x[0]=Oe,x[1]=ot,x[2]=ft,x[3]=ke,k.clearBufferuiv(k.COLOR,0,x)):(A[0]=Oe,A[1]=ot,A[2]=ft,A[3]=ke,k.clearBufferiv(k.COLOR,0,A))}else Q|=k.COLOR_BUFFER_BIT}G&&(Q|=k.DEPTH_BUFFER_BIT),j&&(Q|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&k.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",Tt,!1),Ne.dispose(),Ue.dispose(),oe.dispose(),b.dispose(),ee.dispose(),ye.dispose(),le.dispose(),Se.dispose(),fe.dispose(),te.dispose(),te.removeEventListener("sessionstart",nt),te.removeEventListener("sessionend",fn),st.stop()};function Fe(D){D.preventDefault(),Sc("WebGLRenderer: Context Lost."),C=!0}function qe(){Sc("WebGLRenderer: Context Restored."),C=!1;let D=U.autoReset,G=Le.enabled,j=Le.autoUpdate,Q=Le.needsUpdate,q=Le.type;ae(),U.autoReset=D,Le.enabled=G,Le.autoUpdate=j,Le.needsUpdate=Q,Le.type=q}function Tt(D){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Pe(D){let G=D.target;G.removeEventListener("dispose",Pe),Ve(G)}function Ve(D){ct(D),b.remove(D)}function ct(D){let G=b.get(D).programs;G!==void 0&&(G.forEach(function(j){fe.releaseProgram(j)}),D.isShaderMaterial&&fe.releaseShaderCache(D))}this.renderBufferDirect=function(D,G,j,Q,q,xe){G===null&&(G=He);let Me=q.isMesh&&q.matrixWorld.determinant()<0,_e=Ki(D,G,j,Q,q);me.setMaterial(Q,Me);let ke=j.index,Oe=1;if(Q.wireframe===!0){if(ke=J.getWireframeAttribute(j),ke===void 0)return;Oe=2}let ot=j.drawRange,ft=j.attributes.position,Xe=ot.start*Oe,zt=(ot.start+ot.count)*Oe;xe!==null&&(Xe=Math.max(Xe,xe.start*Oe),zt=Math.min(zt,(xe.start+xe.count)*Oe)),ke!==null?(Xe=Math.max(Xe,0),zt=Math.min(zt,ke.count)):ft!=null&&(Xe=Math.max(Xe,0),zt=Math.min(zt,ft.count));let dn=zt-Xe;if(dn<0||dn===1/0)return;le.setup(q,Q,_e,j,ke);let on,Ht=et;if(ke!==null&&(on=$.get(ke),Ht=z,Ht.setIndex(on)),q.isMesh)Q.wireframe===!0?(me.setLineWidth(Q.wireframeLinewidth*W()),Ht.setMode(k.LINES)):Ht.setMode(k.TRIANGLES);else if(q.isLine){let Qn=Q.linewidth;Qn===void 0&&(Qn=1),me.setLineWidth(Qn*W()),q.isLineSegments?Ht.setMode(k.LINES):q.isLineLoop?Ht.setMode(k.LINE_LOOP):Ht.setMode(k.LINE_STRIP)}else q.isPoints?Ht.setMode(k.POINTS):q.isSprite&&Ht.setMode(k.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Mc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ht.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))Ht.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Qn=q._multiDrawStarts,We=q._multiDrawCounts,Bi=q._multiDrawCount,Et=ke?$.get(ke).bytesPerElement:1,fr=b.get(Q).currentProgram.getUniforms();for(let Tr=0;Tr<Bi;Tr++)fr.setValue(k,"_gl_DrawID",Tr),Ht.render(Qn[Tr]/Et,We[Tr])}else if(q.isInstancedMesh)Ht.renderInstances(Xe,dn,q.count);else if(j.isInstancedBufferGeometry){let Qn=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,We=Math.min(j.instanceCount,Qn);Ht.renderInstances(Xe,dn,We)}else Ht.render(Xe,dn)};function Ee(D,G,j){D.transparent===!0&&D.side===mn&&D.forceSinglePass===!1?(D.side=tn,D.needsUpdate=!0,Yn(D,G,j),D.side=Di,D.needsUpdate=!0,Yn(D,G,j),D.side=mn):Yn(D,G,j)}this.compile=function(D,G,j=null){j===null&&(j=D),M=oe.get(j),M.init(G),T.push(M),j.traverseVisible(function(q){q.isLight&&q.layers.test(G.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),D!==j&&D.traverseVisible(function(q){q.isLight&&q.layers.test(G.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),M.setupLights();let Q=new Set;return D.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let xe=q.material;if(xe)if(Array.isArray(xe))for(let Me=0;Me<xe.length;Me++){let _e=xe[Me];Ee(_e,j,q),Q.add(_e)}else Ee(xe,j,q),Q.add(xe)}),M=T.pop(),Q},this.compileAsync=function(D,G,j=null){let Q=this.compile(D,G,j);return new Promise(q=>{function xe(){if(Q.forEach(function(Me){b.get(Me).currentProgram.isReady()&&Q.delete(Me)}),Q.size===0){q(D);return}setTimeout(xe,10)}Ie.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let tt=null;function Qe(D){tt&&tt(D)}function nt(){st.stop()}function fn(){st.start()}let st=new X_;st.setAnimationLoop(Qe),typeof self<"u"&&st.setContext(self),this.setAnimationLoop=function(D){tt=D,te.setAnimationLoop(D),D===null?st.stop():st.start()},te.addEventListener("sessionstart",nt),te.addEventListener("sessionend",fn),this.render=function(D,G){if(G!==void 0&&G.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;let j=te.enabled===!0&&te.isPresenting===!0,Q=y!==null&&(I===null||j)&&y.begin(S,I);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(te.cameraAutoUpdate===!0&&te.updateCamera(G),G=te.getCamera()),D.isScene===!0&&D.onBeforeRender(S,D,G,I),M=oe.get(D,T.length),M.init(G),T.push(M),Re.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ne.setFromProjectionMatrix(Re,_r,G.reversedDepth),pe=this.localClippingEnabled,he=ue.init(this.clippingPlanes,pe),_=Ue.get(D,E.length),_.init(),E.push(_),te.enabled===!0&&te.isPresenting===!0){let Me=S.xr.getDepthSensingMesh();Me!==null&&Jt(Me,G,-1/0,S.sortObjects)}Jt(D,G,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(Ce,Y),ve=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,ve&&Ne.addToRenderList(_,D),this.info.render.frame++,he===!0&&ue.beginShadows();let q=M.state.shadowsArray;if(Le.render(q,D,G),he===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Q&&y.hasRenderPass())===!1){let Me=_.opaque,_e=_.transmissive;if(M.setupLights(),G.isArrayCamera){let ke=G.cameras;if(_e.length>0)for(let Oe=0,ot=ke.length;Oe<ot;Oe++){let ft=ke[Oe];jt(Me,_e,D,ft)}ve&&Ne.render(D);for(let Oe=0,ot=ke.length;Oe<ot;Oe++){let ft=ke[Oe];Tn(_,D,ft,ft.viewport)}}else _e.length>0&&jt(Me,_e,D,G),ve&&Ne.render(D),Tn(_,D,G)}I!==null&&w===0&&(H.updateMultisampleRenderTarget(I),H.updateRenderTargetMipmap(I)),Q&&y.end(S),D.isScene===!0&&D.onAfterRender(S,D,G),le.resetDefaultState(),P=-1,F=null,T.pop(),T.length>0?(M=T[T.length-1],he===!0&&ue.setGlobalState(S.clippingPlanes,M.state.camera)):M=null,E.pop(),E.length>0?_=E[E.length-1]:_=null};function Jt(D,G,j,Q){if(D.visible===!1)return;if(D.layers.test(G.layers)){if(D.isGroup)j=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(G);else if(D.isLight)M.pushLight(D),D.castShadow&&M.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||ne.intersectsSprite(D)){Q&&De.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Re);let Me=ye.update(D),_e=D.material;_e.visible&&_.push(D,Me,_e,j,De.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||ne.intersectsObject(D))){let Me=ye.update(D),_e=D.material;if(Q&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),De.copy(D.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),De.copy(Me.boundingSphere.center)),De.applyMatrix4(D.matrixWorld).applyMatrix4(Re)),Array.isArray(_e)){let ke=Me.groups;for(let Oe=0,ot=ke.length;Oe<ot;Oe++){let ft=ke[Oe],Xe=_e[ft.materialIndex];Xe&&Xe.visible&&_.push(D,Me,Xe,j,De.z,ft)}}else _e.visible&&_.push(D,Me,_e,j,De.z,null)}}let xe=D.children;for(let Me=0,_e=xe.length;Me<_e;Me++)Jt(xe[Me],G,j,Q)}function Tn(D,G,j,Q){let{opaque:q,transmissive:xe,transparent:Me}=D;M.setupLightsView(j),he===!0&&ue.setGlobalState(S.clippingPlanes,j),Q&&me.viewport(N.copy(Q)),q.length>0&&Ft(q,G,j),xe.length>0&&Ft(xe,G,j),Me.length>0&&Ft(Me,G,j),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function jt(D,G,j,Q){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[Q.id]===void 0){let Xe=Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[Q.id]=new gt(1,1,{generateMipmaps:!0,type:Xe?ri:xt,minFilter:Fr,samples:Math.max(4,Be.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:At.workingColorSpace})}let xe=M.state.transmissionRenderTarget[Q.id],Me=Q.viewport||N;xe.setSize(Me.z*S.transmissionResolutionScale,Me.w*S.transmissionResolutionScale);let _e=S.getRenderTarget(),ke=S.getActiveCubeFace(),Oe=S.getActiveMipmapLevel();S.setRenderTarget(xe),S.getClearColor(X),B=S.getClearAlpha(),B<1&&S.setClearColor(16777215,.5),S.clear(),ve&&Ne.render(j);let ot=S.toneMapping;S.toneMapping=Yi;let ft=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),M.setupLightsView(Q),he===!0&&ue.setGlobalState(S.clippingPlanes,Q),Ft(D,j,Q),H.updateMultisampleRenderTarget(xe),H.updateRenderTargetMipmap(xe),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let zt=0,dn=G.length;zt<dn;zt++){let on=G[zt],{object:Ht,geometry:Qn,material:We,group:Bi}=on;if(We.side===mn&&Ht.layers.test(Q.layers)){let Et=We.side;We.side=tn,We.needsUpdate=!0,Pt(Ht,j,Q,Qn,We,Bi),We.side=Et,We.needsUpdate=!0,Xe=!0}}Xe===!0&&(H.updateMultisampleRenderTarget(xe),H.updateRenderTargetMipmap(xe))}S.setRenderTarget(_e,ke,Oe),S.setClearColor(X,B),ft!==void 0&&(Q.viewport=ft),S.toneMapping=ot}function Ft(D,G,j){let Q=G.isScene===!0?G.overrideMaterial:null;for(let q=0,xe=D.length;q<xe;q++){let Me=D[q],{object:_e,geometry:ke,group:Oe}=Me,ot=Me.material;ot.allowOverride===!0&&Q!==null&&(ot=Q),_e.layers.test(j.layers)&&Pt(_e,G,j,ke,ot,Oe)}}function Pt(D,G,j,Q,q,xe){D.onBeforeRender(S,G,j,Q,q,xe),D.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),q.onBeforeRender(S,G,j,Q,D,xe),q.transparent===!0&&q.side===mn&&q.forceSinglePass===!1?(q.side=tn,q.needsUpdate=!0,S.renderBufferDirect(j,G,Q,q,D,xe),q.side=Di,q.needsUpdate=!0,S.renderBufferDirect(j,G,Q,q,D,xe),q.side=mn):S.renderBufferDirect(j,G,Q,q,D,xe),D.onAfterRender(S,G,j,Q,q,xe)}function Yn(D,G,j){G.isScene!==!0&&(G=He);let Q=b.get(D),q=M.state.lights,xe=M.state.shadowsArray,Me=q.state.version,_e=fe.getParameters(D,q.state,xe,G,j),ke=fe.getProgramCacheKey(_e),Oe=Q.programs;Q.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?G.environment:null,Q.fog=G.fog;let ot=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;Q.envMap=ee.get(D.envMap||Q.environment,ot),Q.envMapRotation=Q.environment!==null&&D.envMap===null?G.environmentRotation:D.envMapRotation,Oe===void 0&&(D.addEventListener("dispose",Pe),Oe=new Map,Q.programs=Oe);let ft=Oe.get(ke);if(ft!==void 0){if(Q.currentProgram===ft&&Q.lightsStateVersion===Me)return qn(D,_e),ft}else _e.uniforms=fe.getUniforms(D),D.onBeforeCompile(_e,S),ft=fe.acquireProgram(_e,ke),Oe.set(ke,ft),Q.uniforms=_e.uniforms;let Xe=Q.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Xe.clippingPlanes=ue.uniform),qn(D,_e),Q.needsLights=bn(D),Q.lightsStateVersion=Me,Q.needsLights&&(Xe.ambientLightColor.value=q.state.ambient,Xe.lightProbe.value=q.state.probe,Xe.directionalLights.value=q.state.directional,Xe.directionalLightShadows.value=q.state.directionalShadow,Xe.spotLights.value=q.state.spot,Xe.spotLightShadows.value=q.state.spotShadow,Xe.rectAreaLights.value=q.state.rectArea,Xe.ltc_1.value=q.state.rectAreaLTC1,Xe.ltc_2.value=q.state.rectAreaLTC2,Xe.pointLights.value=q.state.point,Xe.pointLightShadows.value=q.state.pointShadow,Xe.hemisphereLights.value=q.state.hemi,Xe.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Xe.spotLightMatrix.value=q.state.spotLightMatrix,Xe.spotLightMap.value=q.state.spotLightMap,Xe.pointShadowMatrix.value=q.state.pointShadowMatrix),Q.currentProgram=ft,Q.uniformsList=null,ft}function Qt(D){if(D.uniformsList===null){let G=D.currentProgram.getUniforms();D.uniformsList=tl.seqWithValue(G.seq,D.uniforms)}return D.uniformsList}function qn(D,G){let j=b.get(D);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.batchingColor=G.batchingColor,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.instancingMorph=G.instancingMorph,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function Ki(D,G,j,Q,q){G.isScene!==!0&&(G=He),H.resetTextureUnits();let xe=G.fog,Me=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?G.environment:null,_e=I===null?S.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Pi,ke=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,Oe=ee.get(Q.envMap||Me,ke),ot=Q.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,ft=!!j.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Xe=!!j.morphAttributes.position,zt=!!j.morphAttributes.normal,dn=!!j.morphAttributes.color,on=Yi;Q.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(on=S.toneMapping);let Ht=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Qn=Ht!==void 0?Ht.length:0,We=b.get(Q),Bi=M.state.lights;if(he===!0&&(pe===!0||D!==F)){let Bn=D===F&&Q.id===P;ue.setState(Q,D,Bn)}let Et=!1;Q.version===We.__version?(We.needsLights&&We.lightsStateVersion!==Bi.state.version||We.outputColorSpace!==_e||q.isBatchedMesh&&We.batching===!1||!q.isBatchedMesh&&We.batching===!0||q.isBatchedMesh&&We.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&We.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&We.instancing===!1||!q.isInstancedMesh&&We.instancing===!0||q.isSkinnedMesh&&We.skinning===!1||!q.isSkinnedMesh&&We.skinning===!0||q.isInstancedMesh&&We.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&We.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&We.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&We.instancingMorph===!1&&q.morphTexture!==null||We.envMap!==Oe||Q.fog===!0&&We.fog!==xe||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==ue.numPlanes||We.numIntersection!==ue.numIntersection)||We.vertexAlphas!==ot||We.vertexTangents!==ft||We.morphTargets!==Xe||We.morphNormals!==zt||We.morphColors!==dn||We.toneMapping!==on||We.morphTargetsCount!==Qn)&&(Et=!0):(Et=!0,We.__version=Q.version);let fr=We.currentProgram;Et===!0&&(fr=Yn(Q,G,q));let Tr=!1,sa=!1,Za=!1,Vt=fr.getUniforms(),On=We.uniforms;if(me.useProgram(fr.program)&&(Tr=!0,sa=!0,Za=!0),Q.id!==P&&(P=Q.id,sa=!0),Tr||F!==D){me.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Vt.setValue(k,"projectionMatrix",D.projectionMatrix),Vt.setValue(k,"viewMatrix",D.matrixWorldInverse);let ps=Vt.map.cameraPosition;ps!==void 0&&ps.setValue(k,ce.setFromMatrixPosition(D.matrixWorld)),Be.logarithmicDepthBuffer&&Vt.setValue(k,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Vt.setValue(k,"isOrthographic",D.isOrthographicCamera===!0),F!==D&&(F=D,sa=!0,Za=!0)}if(We.needsLights&&(Bi.state.directionalShadowMap.length>0&&Vt.setValue(k,"directionalShadowMap",Bi.state.directionalShadowMap,H),Bi.state.spotShadowMap.length>0&&Vt.setValue(k,"spotShadowMap",Bi.state.spotShadowMap,H),Bi.state.pointShadowMap.length>0&&Vt.setValue(k,"pointShadowMap",Bi.state.pointShadowMap,H)),q.isSkinnedMesh){Vt.setOptional(k,q,"bindMatrix"),Vt.setOptional(k,q,"bindMatrixInverse");let Bn=q.skeleton;Bn&&(Bn.boneTexture===null&&Bn.computeBoneTexture(),Vt.setValue(k,"boneTexture",Bn.boneTexture,H))}q.isBatchedMesh&&(Vt.setOptional(k,q,"batchingTexture"),Vt.setValue(k,"batchingTexture",q._matricesTexture,H),Vt.setOptional(k,q,"batchingIdTexture"),Vt.setValue(k,"batchingIdTexture",q._indirectTexture,H),Vt.setOptional(k,q,"batchingColorTexture"),q._colorsTexture!==null&&Vt.setValue(k,"batchingColorTexture",q._colorsTexture,H));let ds=j.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Ae.update(q,j,fr),(sa||We.receiveShadow!==q.receiveShadow)&&(We.receiveShadow=q.receiveShadow,Vt.setValue(k,"receiveShadow",q.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&G.environment!==null&&(On.envMapIntensity.value=G.environmentIntensity),On.dfgLUT!==void 0&&(On.dfgLUT.value=TC()),sa&&(Vt.setValue(k,"toneMappingExposure",S.toneMappingExposure),We.needsLights&&En(On,Za),xe&&Q.fog===!0&&Ge.refreshFogUniforms(On,xe),Ge.refreshMaterialUniforms(On,Q,Te,se,M.state.transmissionRenderTarget[D.id]),tl.upload(k,Qt(We),On,H)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(tl.upload(k,Qt(We),On,H),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Vt.setValue(k,"center",q.center),Vt.setValue(k,"modelViewMatrix",q.modelViewMatrix),Vt.setValue(k,"normalMatrix",q.normalMatrix),Vt.setValue(k,"modelMatrix",q.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let Bn=Q.uniformsGroups;for(let ps=0,Ka=Bn.length;ps<Ka;ps++){let c0=Bn[ps];Se.update(c0,fr),Se.bind(c0,fr)}}return fr}function En(D,G){D.ambientLightColor.needsUpdate=G,D.lightProbe.needsUpdate=G,D.directionalLights.needsUpdate=G,D.directionalLightShadows.needsUpdate=G,D.pointLights.needsUpdate=G,D.pointLightShadows.needsUpdate=G,D.spotLights.needsUpdate=G,D.spotLightShadows.needsUpdate=G,D.rectAreaLights.needsUpdate=G,D.hemisphereLights.needsUpdate=G}function bn(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(D,G,j){let Q=b.get(D);Q.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),b.get(D.texture).__webglTexture=G,b.get(D.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:j,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,G){let j=b.get(D);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0};let In=k.createFramebuffer();this.setRenderTarget=function(D,G=0,j=0){I=D,R=G,w=j;let Q=null,q=!1,xe=!1;if(D){let _e=b.get(D);if(_e.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(k.FRAMEBUFFER,_e.__webglFramebuffer),N.copy(D.viewport),O.copy(D.scissor),K=D.scissorTest,me.viewport(N),me.scissor(O),me.setScissorTest(K),P=-1;return}else if(_e.__webglFramebuffer===void 0)H.setupRenderTarget(D);else if(_e.__hasExternalTextures)H.rebindTextures(D,b.get(D.texture).__webglTexture,b.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){let ot=D.depthTexture;if(_e.__boundDepthTexture!==ot){if(ot!==null&&b.has(ot)&&(D.width!==ot.image.width||D.height!==ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(D)}}let ke=D.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(xe=!0);let Oe=b.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Oe[G])?Q=Oe[G][j]:Q=Oe[G],q=!0):D.samples>0&&H.useMultisampledRTT(D)===!1?Q=b.get(D).__webglMultisampledFramebuffer:Array.isArray(Oe)?Q=Oe[j]:Q=Oe,N.copy(D.viewport),O.copy(D.scissor),K=D.scissorTest}else N.copy(V).multiplyScalar(Te).floor(),O.copy(Z).multiplyScalar(Te).floor(),K=ie;if(j!==0&&(Q=In),me.bindFramebuffer(k.FRAMEBUFFER,Q)&&me.drawBuffers(D,Q),me.viewport(N),me.scissor(O),me.setScissorTest(K),q){let _e=b.get(D.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e.__webglTexture,j)}else if(xe){let _e=G;for(let ke=0;ke<D.textures.length;ke++){let Oe=b.get(D.textures[ke]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+ke,Oe.__webglTexture,j,_e)}}else if(D!==null&&j!==0){let _e=b.get(D.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,_e.__webglTexture,j)}P=-1},this.readRenderTargetPixels=function(D,G,j,Q,q,xe,Me,_e=0){if(!(D&&D.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=b.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Me!==void 0&&(ke=ke[Me]),ke){me.bindFramebuffer(k.FRAMEBUFFER,ke);try{let Oe=D.textures[_e],ot=Oe.format,ft=Oe.type;if(D.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_e),!Be.textureFormatReadable(ot)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(ft)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=D.width-Q&&j>=0&&j<=D.height-q&&k.readPixels(G,j,Q,q,de.convert(ot),de.convert(ft),xe)}finally{let Oe=I!==null?b.get(I).__webglFramebuffer:null;me.bindFramebuffer(k.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(D,G,j,Q,q,xe,Me,_e=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=b.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Me!==void 0&&(ke=ke[Me]),ke)if(G>=0&&G<=D.width-Q&&j>=0&&j<=D.height-q){me.bindFramebuffer(k.FRAMEBUFFER,ke);let Oe=D.textures[_e],ot=Oe.format,ft=Oe.type;if(D.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_e),!Be.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Xe=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Xe),k.bufferData(k.PIXEL_PACK_BUFFER,xe.byteLength,k.STREAM_READ),k.readPixels(G,j,Q,q,de.convert(ot),de.convert(ft),0);let zt=I!==null?b.get(I).__webglFramebuffer:null;me.bindFramebuffer(k.FRAMEBUFFER,zt);let dn=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await v_(k,dn,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Xe),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,xe),k.deleteBuffer(Xe),k.deleteSync(dn),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,G=null,j=0){let Q=Math.pow(2,-j),q=Math.floor(D.image.width*Q),xe=Math.floor(D.image.height*Q),Me=G!==null?G.x:0,_e=G!==null?G.y:0;H.setTexture2D(D,0),k.copyTexSubImage2D(k.TEXTURE_2D,j,0,0,Me,_e,q,xe),me.unbindTexture()};let Hr=k.createFramebuffer(),Qa=k.createFramebuffer();this.copyTextureToTexture=function(D,G,j=null,Q=null,q=0,xe=0){let Me,_e,ke,Oe,ot,ft,Xe,zt,dn,on=D.isCompressedTexture?D.mipmaps[xe]:D.image;if(j!==null)Me=j.max.x-j.min.x,_e=j.max.y-j.min.y,ke=j.isBox3?j.max.z-j.min.z:1,Oe=j.min.x,ot=j.min.y,ft=j.isBox3?j.min.z:0;else{let On=Math.pow(2,-q);Me=Math.floor(on.width*On),_e=Math.floor(on.height*On),D.isDataArrayTexture?ke=on.depth:D.isData3DTexture?ke=Math.floor(on.depth*On):ke=1,Oe=0,ot=0,ft=0}Q!==null?(Xe=Q.x,zt=Q.y,dn=Q.z):(Xe=0,zt=0,dn=0);let Ht=de.convert(G.format),Qn=de.convert(G.type),We;G.isData3DTexture?(H.setTexture3D(G,0),We=k.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(H.setTexture2DArray(G,0),We=k.TEXTURE_2D_ARRAY):(H.setTexture2D(G,0),We=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,G.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,G.unpackAlignment);let Bi=k.getParameter(k.UNPACK_ROW_LENGTH),Et=k.getParameter(k.UNPACK_IMAGE_HEIGHT),fr=k.getParameter(k.UNPACK_SKIP_PIXELS),Tr=k.getParameter(k.UNPACK_SKIP_ROWS),sa=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,on.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,on.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Oe),k.pixelStorei(k.UNPACK_SKIP_ROWS,ot),k.pixelStorei(k.UNPACK_SKIP_IMAGES,ft);let Za=D.isDataArrayTexture||D.isData3DTexture,Vt=G.isDataArrayTexture||G.isData3DTexture;if(D.isDepthTexture){let On=b.get(D),ds=b.get(G),Bn=b.get(On.__renderTarget),ps=b.get(ds.__renderTarget);me.bindFramebuffer(k.READ_FRAMEBUFFER,Bn.__webglFramebuffer),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,ps.__webglFramebuffer);for(let Ka=0;Ka<ke;Ka++)Za&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,b.get(D).__webglTexture,q,ft+Ka),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,b.get(G).__webglTexture,xe,dn+Ka)),k.blitFramebuffer(Oe,ot,Me,_e,Xe,zt,Me,_e,k.DEPTH_BUFFER_BIT,k.NEAREST);me.bindFramebuffer(k.READ_FRAMEBUFFER,null),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(q!==0||D.isRenderTargetTexture||b.has(D)){let On=b.get(D),ds=b.get(G);me.bindFramebuffer(k.READ_FRAMEBUFFER,Hr),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,Qa);for(let Bn=0;Bn<ke;Bn++)Za?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,On.__webglTexture,q,ft+Bn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,On.__webglTexture,q),Vt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ds.__webglTexture,xe,dn+Bn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ds.__webglTexture,xe),q!==0?k.blitFramebuffer(Oe,ot,Me,_e,Xe,zt,Me,_e,k.COLOR_BUFFER_BIT,k.NEAREST):Vt?k.copyTexSubImage3D(We,xe,Xe,zt,dn+Bn,Oe,ot,Me,_e):k.copyTexSubImage2D(We,xe,Xe,zt,Oe,ot,Me,_e);me.bindFramebuffer(k.READ_FRAMEBUFFER,null),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Vt?D.isDataTexture||D.isData3DTexture?k.texSubImage3D(We,xe,Xe,zt,dn,Me,_e,ke,Ht,Qn,on.data):G.isCompressedArrayTexture?k.compressedTexSubImage3D(We,xe,Xe,zt,dn,Me,_e,ke,Ht,on.data):k.texSubImage3D(We,xe,Xe,zt,dn,Me,_e,ke,Ht,Qn,on):D.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,xe,Xe,zt,Me,_e,Ht,Qn,on.data):D.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,xe,Xe,zt,on.width,on.height,Ht,on.data):k.texSubImage2D(k.TEXTURE_2D,xe,Xe,zt,Me,_e,Ht,Qn,on);k.pixelStorei(k.UNPACK_ROW_LENGTH,Bi),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Et),k.pixelStorei(k.UNPACK_SKIP_PIXELS,fr),k.pixelStorei(k.UNPACK_SKIP_ROWS,Tr),k.pixelStorei(k.UNPACK_SKIP_IMAGES,sa),xe===0&&G.generateMipmaps&&k.generateMipmap(We),me.unbindTexture()},this.initRenderTarget=function(D){b.get(D).__webglFramebuffer===void 0&&H.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?H.setTextureCube(D,0):D.isData3DTexture?H.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?H.setTexture2DArray(D,0):H.setTexture2D(D,0),me.unbindTexture()},this.resetState=function(){R=0,w=0,I=null,me.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _r}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=At._getDrawingBufferColorSpace(e),t.unpackColorSpace=At._getUnpackColorSpace()}};var EC=(()=>{let i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Kt;return t.setAttribute("position",new vt(i,3)),t.setAttribute("uv",new vt(e,2)),t})(),Si=class Mg{static get fullscreenGeometry(){return EC}constructor(e="Pass",t=new Ar,n=new as){this.name=e,this.renderer=null,this.scene=t,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new kt(Mg.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new Ar),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=_i){}render(e,t,n,r,s){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,n){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof gt||t instanceof Wi||t instanceof Rn||t instanceof Mg)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},bC=class extends Si{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(i,e,t,n,r){let s=i.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},wC=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,al="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",$_=class extends at{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new ge(null),depthBuffer:new ge(null),channelWeights:new ge(null),opacity:new ge(1)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:wC,vertexShader:al}),this.depthFunc=zo}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(i){let e=i!==null;this.colorWrite!==e&&(e?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=e,this.needsUpdate=!0),this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){let e=i!==null;this.depthWrite!==e&&(e?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=e,this.depthWrite=e,this.needsUpdate=!0),this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(i){this.colorSpaceConversion!==i&&(i?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(i){i!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=i):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},ey=class extends Si{constructor(i,e=!0){super("CopyPass"),this.fullscreenMaterial=new $_,this.needsSwap=!1,this.renderTarget=i,i===void 0&&(this.renderTarget=new gt(1,1,{minFilter:Gt,magFilter:Gt,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(i){this.autoResize=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(i){this.autoResize=i}render(i,e,t,n,r){this.fullscreenMaterial.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){this.autoResize&&this.renderTarget.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==xt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}},K_=new Ze,ty=class extends Si{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,r){let s=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=s!==null,c=a>=0;l?(i.getClearColor(K_),i.setClearColor(s,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(K_,o):c&&i.setClearAlpha(o)}},CC=class extends Si{constructor(i,e){super("MaskPass",i,e),this.needsSwap=!1,this.clearPass=new ty(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,r){let s=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,f=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.stencil.setFunc(s.ALWAYS,u,4294967295),a.stencil.setClear(f),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(s.EQUAL,1,4294967295),a.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.stencil.setLocked(!0)}};function RC(i,e){let t=i.getContext();if(e<=0||typeof t.renderbufferStorageMultisample!="function")return 0;let n=t.getParameter(t.MAX_SAMPLES),r=Math.min(e,n);if(r<=0)return 0;let s=t.getParameter(t.RENDERBUFFER_BINDING),a=t.createRenderbuffer();try{return t.bindRenderbuffer(t.RENDERBUFFER,a),t.renderbufferStorageMultisample(t.RENDERBUFFER,r,t.RGBA8,1,1),r}catch{return 0}finally{t.bindRenderbuffer(t.RENDERBUFFER,s),t.deleteRenderbuffer(a)}}var yg=1/1e3,DC=1e3,PC=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document<"u"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*yg}get fixedDelta(){return this._fixedDelta*yg}set fixedDelta(i){this._fixedDelta=i*DC}get elapsed(){return this._elapsed*yg}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(i!==void 0?i:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(i){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},ny=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:r=xt}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,r,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new ey,this.depthRenderTarget=null,this.passes=[],this.timer=new PC,this.autoRenderToScreen=!0,this.setRenderer(i)}get stableDepthTexture(){return this.depthRenderTarget===null?null:this.depthRenderTarget.depthTexture}get multisampling(){return this.inputBuffer.samples}set multisampling(i){let e=this.renderer===null?i:RC(this.renderer,i);this.multisampling!==e&&(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){let e=i.getSize(new be),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===xt&&i.outputColorSpace===it&&(this.inputBuffer.texture.colorSpace=it,this.outputBuffer.texture.colorSpace=it,this.inputBuffer.dispose(),this.outputBuffer.dispose());let r=this.multisampling;this.multisampling=r,i.autoClear=!1,this.setSize(e.width,e.height);for(let s of this.passes)s.initialize(i,t,n)}}replaceRenderer(i,e=!0){let t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){let i=new Ii;i.name="EffectComposer.InputDepth",this.inputBuffer.stencilBuffer?(i.format=ar,i.type=Nr):i.type=nn;let e=new Ii;e.format=i.format,e.type=i.type,e.name="EffectComposer.OutputDepth";let t=new Ii;t.format=i.format,t.type=i.type,t.name="EffectComposer.StableDepth",this.inputBuffer.depthTexture=i,this.outputBuffer.depthTexture=e,this.inputBuffer.dispose(),this.outputBuffer.dispose();let{width:n,height:r}=this.inputBuffer;this.depthRenderTarget=new gt(n,r,{depthBuffer:!0,stencilBuffer:this.inputBuffer.stencilBuffer,depthTexture:t})}blitDepthBuffer(i){let e=this.renderer,t=this.depthRenderTarget,n=e.properties,r=e.getContext();e.setRenderTarget(t);let s=n.get(i).__webglFramebuffer,a=n.get(t).__webglFramebuffer,o=i.stencilBuffer?r.DEPTH_BUFFER_BIT|r.STENCIL_BUFFER_BIT:r.DEPTH_BUFFER_BIT;r.bindFramebuffer(r.READ_FRAMEBUFFER,s),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,a),r.blitFramebuffer(0,0,i.width,i.height,0,0,t.width,t.height,o,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),e.setRenderTarget(null)}deleteDepthTexture(){let i=this.stableDepthTexture;for(let e of this.passes)e.getDepthTexture()===i&&e.setDepthTexture(null);this.depthRenderTarget!==null&&(this.depthRenderTarget.dispose(),this.depthRenderTarget=null),this.inputBuffer.depthTexture!==null&&(this.inputBuffer.depthTexture.dispose(),this.inputBuffer.depthTexture=null),this.outputBuffer.depthTexture!==null&&(this.outputBuffer.depthTexture.dispose(),this.outputBuffer.depthTexture=null)}createBuffer(i,e,t,n){let r=this.renderer,s=r===null?new be:r.getDrawingBufferSize(new be),a=new gt(s.width,s.height,{minFilter:Gt,magFilter:Gt,samples:n,stencilBuffer:e,depthBuffer:i,type:t});return t===xt&&r!==null&&r.outputColorSpace===it&&(a.texture.colorSpace=it),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(i){for(let e of this.passes)e.mainScene=i}setMainCamera(i){for(let e of this.passes)e.mainCamera=i}addPass(i,e){let t=this.passes,n=this.renderer,r=n.getDrawingBufferSize(new be),s=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.renderer=n,i.setSize(r.width,r.height),i.initialize(n,s,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthRenderTarget!==null)if(this.depthRenderTarget===null){this.createDepthTexture();for(let o of t)o.setDepthTexture(this.stableDepthTexture)}else i.setDepthTexture(this.stableDepthTexture)}removePass(i){let e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){let s=this.stableDepthTexture;if(s!==null){let a=(l,c)=>l||c.needsDepthTexture;e.reduce(a,!1)||(i.getDepthTexture()===s&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){let i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){let e=this.renderer,t=this.copyPass,n=this.inputBuffer,r=this.outputBuffer,s,a=!1;i===void 0&&(this.timer.update(),i=this.timer.getDelta());for(let o of this.passes)if(o.enabled){if(o.render(e,n,r,i,a),o.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(n),o.needsSwap){if(a){t.renderToScreen=o.renderToScreen;let l=e.getContext(),c=e.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),t.render(e,n,r,i,a),c.setFunc(l.EQUAL,1,4294967295)}s=n,n=r,r=s}o instanceof CC?a=!0:o instanceof bC&&(a=!1)}}setSize(i,e,t){let n=this.renderer,r=n.getSize(new be);(i===void 0||e===void 0)&&(i=r.width,e=r.height),(r.width!==i||r.height!==e)&&n.setSize(i,e,t);let s=n.getDrawingBufferSize(new be);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(s.width,s.height);for(let a of this.passes)a.setSize(s.width,s.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let i of this.passes)i.dispose();this.deleteDepthTexture(),this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.copyPass.dispose(),this.timer.dispose(),this.passes=[],Si.fullscreenGeometry.dispose()}},Ys={NONE:0,DEPTH:1,CONVOLUTION:2},bt={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},IC=class{constructor(){this.shaderParts=new Map([[bt.FRAGMENT_HEAD,null],[bt.FRAGMENT_MAIN_UV,null],[bt.FRAGMENT_MAIN_IMAGE,null],[bt.VERTEX_HEAD,null],[bt.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=Ys.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Pi}};var Ag=!1,J_=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case mn:t=this.materialsFlatShadedDoubleSide;break;case tn:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case mn:t=this.materialsDoubleSide;break;case tn:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(i){if(!(i instanceof at))return i.clone();let e=i.uniforms,t=new Map;for(let r in e){let s=e[r].value;s.isRenderTargetTexture&&(e[r].value=null,t.set(r,s))}let n=i.clone();for(let r of t)e[r[0]].value=r[1],n.uniforms[r[0]].value=r[1];return n}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){let e=this.materials=[this.cloneMaterial(i),this.cloneMaterial(i),this.cloneMaterial(i)];for(let t of e)t.uniforms=Object.assign({},i.uniforms),t.side=Di;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=tn,n}),this.materialsDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=mn,n}),this.materialsFlatShaded=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=tn,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=mn,n})}}render(i,e,t){let n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,Ag){let r=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(let s of r)s[0].material=s[1];this.meshCount!==r.size&&r.clear()}else{let r=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=r}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){let i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Ag}static set workaroundEnabled(i){Ag=i}};var Xs=-1,qi=class extends gi{constructor(i=null,e=Xs,t=Xs,n=1){super(),i!==null&&this.addEventListener("change",()=>i.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new be(1,1),this.preferredSize=new be(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new be,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==Xs?t.width=e.width:e.height!==Xs?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==Xs?t.height=e.height:e.width!==Xs?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(Xs),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return Xs}};var ht={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},BC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",UC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",LC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",FC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",NC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",OC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",kC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",zC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",HC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",GC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",VC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",WC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",XC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",YC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",qC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",QC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ZC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",KC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",JC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",jC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",$C="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",e2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",t2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",n2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",i2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",r2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",s2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",a2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",o2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",l2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",c2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",u2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",h2=new Map([[ht.ADD,BC],[ht.ALPHA,UC],[ht.AVERAGE,LC],[ht.COLOR,FC],[ht.COLOR_BURN,NC],[ht.COLOR_DODGE,OC],[ht.DARKEN,kC],[ht.DIFFERENCE,zC],[ht.DIVIDE,HC],[ht.DST,null],[ht.EXCLUSION,GC],[ht.HARD_LIGHT,VC],[ht.HARD_MIX,WC],[ht.HUE,XC],[ht.INVERT,YC],[ht.INVERT_RGB,qC],[ht.LIGHTEN,QC],[ht.LINEAR_BURN,ZC],[ht.LINEAR_DODGE,KC],[ht.LINEAR_LIGHT,JC],[ht.LUMINOSITY,jC],[ht.MULTIPLY,$C],[ht.NEGATION,e2],[ht.NORMAL,t2],[ht.OVERLAY,n2],[ht.PIN_LIGHT,i2],[ht.REFLECT,r2],[ht.SATURATION,s2],[ht.SCREEN,a2],[ht.SOFT_LIGHT,o2],[ht.SRC,l2],[ht.SUBTRACT,c2],[ht.VIVID_LIGHT,u2]]),f2=class extends gi{constructor(i,e=1){super(),this._blendFunction=i,this.opacity=new ge(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return h2.get(this.blendFunction)}};var Ga=class extends gi{constructor(i,e,{attributes:t=Ys.NONE,blendFunction:n=ht.NORMAL,defines:r=new Map,uniforms:s=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=r,this.uniforms=s,this.extensions=a,this.blendMode=new f2(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Pi,this._outputColorSpace=yi}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=_i){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(let i of Object.keys(this)){let e=this[i];(e instanceof gt||e instanceof Wi||e instanceof Rn||e instanceof Si)&&this[i].dispose()}}};var ed={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},d2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,p2="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",m2=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],g2=class extends at{constructor(i=new St){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new ge(null),texelSize:new ge(new St),scale:new ge(1),kernel:new ge(0)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:d2,vertexShader:p2}),this.setTexelSize(i.x,i.y),this.kernelSize=ed.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return m2[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){let t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},iy=class extends Si{constructor({kernelSize:i=ed.MEDIUM,resolutionScale:e=.5,width:t=qi.AUTO_SIZE,height:n=qi.AUTO_SIZE,resolutionX:r=t,resolutionY:s=n}={}){super("KawaseBlurPass"),this.renderTargetA=new gt(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let a=this.resolution=new qi(this,r,s,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new g2,this._blurMaterial.kernelSize=i,this.copyMaterial=new $_}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence,f=e;this.fullscreenMaterial=c;for(let h=0,d=u.length;h<d;++h){let g=(h&1)===0?o:l;c.kernel=u[h],c.inputBuffer=f.texture,i.setRenderTarget(g),i.render(s,a),f=g}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=f.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(s,a)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.renderTargetA.setSize(n,r),this.renderTargetB.setSize(n,r),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==xt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i!==null&&i.outputColorSpace===it&&(this.renderTargetA.texture.colorSpace=it,this.renderTargetB.texture.colorSpace=it))}static get AUTO_SIZE(){return qi.AUTO_SIZE}},v2=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,x2=class extends at{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:Wn.replace(/\D+/g,"")},uniforms:{inputBuffer:new ge(null),threshold:new ge(0),smoothing:new ge(1),range:new ge(null)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:v2,vertexShader:al}),this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},ry=class extends Si{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:r=qi.AUTO_SIZE,height:s=qi.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new x2(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new gt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new qi(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,r){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},_2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,y2="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",A2=class extends at{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new ge(null),texelSize:new ge(new be)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:_2,vertexShader:y2})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},S2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,M2="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",T2=class extends at{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new ge(null),supportBuffer:new ge(null),texelSize:new ge(new be),radius:new ge(.85)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:S2,vertexShader:M2})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},E2=class extends Si{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new gt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new A2,this.upsamplingMaterial=new T2,this.resolution=new be}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){let e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){let n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){let r=e.clone();r.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,r){let{scene:s,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this,f=e;this.fullscreenMaterial=o;for(let h=0,d=c.length;h<d;++h){let g=c[h];o.setSize(f.width,f.height),o.inputBuffer=f.texture,i.setRenderTarget(g),i.render(s,a),f=g}this.fullscreenMaterial=l;for(let h=u.length-1;h>=0;--h){let d=u[h];l.setSize(f.width,f.height),l.inputBuffer=f.texture,l.supportBuffer=c[h].texture,i.setRenderTarget(d),i.render(s,a),f=d}}setSize(i,e){let t=this.resolution;t.set(i,e);let n=t.width,r=t.height;for(let s=0,a=this.downsamplingMipmaps.length;s<a;++s)n=Math.round(n*.5),r=Math.round(r*.5),this.downsamplingMipmaps[s].setSize(n,r),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(n,r)}initialize(i,e,t){if(t!==void 0){let n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let r of n)r.texture.type=t;if(t!==xt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i!==null&&i.outputColorSpace===it)for(let r of n)r.texture.colorSpace=it}}dispose(){super.dispose();for(let i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},b2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,sy=class extends Ga{constructor({blendFunction:i=ht.SCREEN,luminanceThreshold:e=1,luminanceSmoothing:t=.03,mipmapBlur:n=!0,intensity:r=1,radius:s=.85,levels:a=8,kernelSize:o=ed.LARGE,resolutionScale:l=.5,width:c=qi.AUTO_SIZE,height:u=qi.AUTO_SIZE,resolutionX:f=c,resolutionY:h=u}={}){super("BloomEffect",b2,{blendFunction:i,uniforms:new Map([["map",new ge(null)],["intensity",new ge(r)]])}),this.renderTarget=new gt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new iy({kernelSize:o}),this.luminancePass=new ry({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new E2,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;let d=this.resolution=new qi(this,f,h,l);d.addEventListener("change",g=>this.setSize(d.baseWidth,d.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){let n=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,r.renderTarget):this.blurPass.render(i,r.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}};var ay={RED:0,GREEN:1,BLUE:2,ALPHA:3},oy={DISCARD:0,MULTIPLY:1,MULTIPLY_RGB_SET_ALPHA:2,MULTIPLY_RGB:3},w2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if PASS == 1
uniform vec4 kernel64[32];
#else
uniform vec4 kernel16[8];
#endif
uniform lowp sampler2D cocBuffer;uniform vec2 texelSize;uniform float scale;varying vec2 vUv;void main(){
#ifdef FOREGROUND
vec2 cocNearFar=texture2D(cocBuffer,vUv).rg*scale;float coc=cocNearFar.x;
#else
float coc=texture2D(cocBuffer,vUv).g*scale;
#endif
if(coc==0.0){gl_FragColor=texture2D(inputBuffer,vUv);}else{
#ifdef FOREGROUND
vec2 step=texelSize*max(cocNearFar.x,cocNearFar.y);
#else
vec2 step=texelSize*coc;
#endif
#if PASS == 1
vec4 acc=vec4(0.0);for(int i=0;i<32;++i){vec4 kernel=kernel64[i];vec2 uv=step*kernel.xy+vUv;acc+=texture2D(inputBuffer,uv);uv=step*kernel.zw+vUv;acc+=texture2D(inputBuffer,uv);}gl_FragColor=acc/64.0;
#else
vec4 maxValue=texture2D(inputBuffer,vUv);for(int i=0;i<8;++i){vec4 kernel=kernel16[i];vec2 uv=step*kernel.xy+vUv;maxValue=max(texture2D(inputBuffer,uv),maxValue);uv=step*kernel.zw+vUv;maxValue=max(texture2D(inputBuffer,uv),maxValue);}gl_FragColor=maxValue;
#endif
}}`,$f=class extends at{constructor(i=!1,e=!1){super({name:"BokehMaterial",defines:{PASS:i?"2":"1"},uniforms:{inputBuffer:new ge(null),cocBuffer:new ge(null),texelSize:new ge(new be),kernel64:new ge(null),kernel16:new ge(null),scale:new ge(1)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:w2,vertexShader:al}),e&&(this.defines.FOREGROUND="1"),this.generateKernel()}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set cocBuffer(i){this.uniforms.cocBuffer.value=i}setCoCBuffer(i){this.uniforms.cocBuffer.value=i}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(i){return this.scale}setScale(i){this.scale=i}generateKernel(){let i=2.39996323,e=new Float64Array(128),t=new Float64Array(32),n=0,r=0;for(let s=0,a=Math.sqrt(80);s<80;++s){let o=s*i,l=Math.sqrt(s)/a,c=l*Math.cos(o),u=l*Math.sin(o);s%5===0?(t[r++]=c,t[r++]=u):(e[n++]=c,e[n++]=u)}this.uniforms.kernel64.value=e,this.uniforms.kernel16.value=t}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e)}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},C2=`#include <common>
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform mat4 projectionMatrix;uniform mat4 projectionMatrixInverse;uniform float cameraNear;uniform float cameraFar;uniform float focusDistance;uniform float focusRange;varying vec2 vUv;float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}
#ifdef PERSPECTIVE_CAMERA
#define getViewZ(depth) perspectiveDepthToViewZ(depth, cameraNear, cameraFar)
#else
#define getViewZ(depth) orthographicDepthToViewZ(depth, cameraNear, cameraFar)
#endif
vec3 getViewPosition(const in vec2 screenPosition,const in float depth,const in float viewZ){vec4 clipPosition=vec4(vec3(screenPosition,depth)*2.0-1.0,1.0);float clipW=projectionMatrix[2][3]*viewZ+projectionMatrix[3][3];clipPosition*=clipW;return(projectionMatrixInverse*clipPosition).xyz;}vec3 getViewPosition(const in vec2 screenPosition,const in float depth){return getViewPosition(screenPosition,depth,getViewZ(depth));}
#define getDistance(viewPosition) length(viewPosition)
void main(){float depth=readDepth(vUv);vec3 viewPosition=getViewPosition(vUv,depth);float distance=getDistance(viewPosition);float signedDistance=distance-focusDistance;float magnitude=smoothstep(0.0,focusRange,abs(signedDistance));gl_FragColor.rg=magnitude*vec2(step(signedDistance,0.0),step(0.0,signedDistance));}`,R2=class extends at{constructor(i=null){super({name:"CircleOfConfusionMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new ge(null),projectionMatrix:new ge(null),projectionMatrixInverse:new ge(null),cameraNear:new ge(.3),cameraFar:new ge(1e3),focusDistance:new ge(0),focusRange:new ge(0)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:C2,vertexShader:al}),this.uniforms.focalLength=this.uniforms.focusRange,i!==null&&this.copyCameraSettings(i)}set depthBuffer(i){this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=_i){this.depthBuffer=i,this.depthPacking=e}get focusDistance(){return this.uniforms.focusDistance.value}set focusDistance(i){this.uniforms.focusDistance.value=i}get worldFocusDistance(){return this.focusDistance}set worldFocusDistance(i){this.focusDistance=i}getFocusDistance(i){this.uniforms.focusDistance.value=i}setFocusDistance(i){this.uniforms.focusDistance.value=i}get focalLength(){return this.focusRange}set focalLength(i){this.focusRange=i}get focusRange(){return this.uniforms.focusRange.value}set focusRange(i){this.uniforms.focusRange.value=i}get worldFocusRange(){return this.focusRange}set worldFocusRange(i){this.focusRange=i}getFocalLength(i){return this.focusRange}setFocalLength(i){this.focusRange=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){this.uniforms.projectionMatrix.value=i.projectionMatrix,this.uniforms.projectionMatrixInverse.value=i.projectionMatrixInverse,this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far;let e=this.defines.PERSPECTIVE_CAMERA!==void 0;i instanceof _n?e||(this.defines.PERSPECTIVE_CAMERA=!0,this.needsUpdate=!0):e&&(delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},D2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef MASK_PRECISION_HIGH
uniform mediump sampler2D maskTexture;
#else
uniform lowp sampler2D maskTexture;
#endif
#if MASK_FUNCTION != 0
uniform float strength;
#endif
varying vec2 vUv;void main(){
#if COLOR_CHANNEL == 0
float mask=texture2D(maskTexture,vUv).r;
#elif COLOR_CHANNEL == 1
float mask=texture2D(maskTexture,vUv).g;
#elif COLOR_CHANNEL == 2
float mask=texture2D(maskTexture,vUv).b;
#else
float mask=texture2D(maskTexture,vUv).a;
#endif
#if MASK_FUNCTION == 0
#ifdef INVERTED
mask=(mask>0.0)?0.0:1.0;
#else
mask=(mask>0.0)?1.0:0.0;
#endif
#else
mask=clamp(mask*strength,0.0,1.0);
#ifdef INVERTED
mask=1.0-mask;
#endif
#endif
#if MASK_FUNCTION == 3
vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=vec4(mask*texel.rgb,texel.a);
#elif MASK_FUNCTION == 2
gl_FragColor=vec4(mask*texture2D(inputBuffer,vUv).rgb,mask);
#else
gl_FragColor=mask*texture2D(inputBuffer,vUv);
#endif
}`,P2=class extends at{constructor(i=null){super({name:"MaskMaterial",uniforms:{maskTexture:new ge(i),inputBuffer:new ge(null),strength:new ge(1)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:D2,vertexShader:al}),this.colorChannel=ay.RED,this.maskFunction=oy.DISCARD}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set maskTexture(i){this.uniforms.maskTexture.value=i,delete this.defines.MASK_PRECISION_HIGH,i.type!==xt&&(this.defines.MASK_PRECISION_HIGH="1"),this.needsUpdate=!0}setMaskTexture(i){this.maskTexture=i}set colorChannel(i){this.defines.COLOR_CHANNEL=i.toFixed(0),this.needsUpdate=!0}setColorChannel(i){this.colorChannel=i}set maskFunction(i){this.defines.MASK_FUNCTION=i.toFixed(0),this.needsUpdate=!0}setMaskFunction(i){this.maskFunction=i}get inverted(){return this.defines.INVERTED!==void 0}set inverted(i){this.inverted&&!i?delete this.defines.INVERTED:i&&(this.defines.INVERTED="1"),this.needsUpdate=!0}isInverted(){return this.inverted}setInverted(i){this.inverted=i}get strength(){return this.uniforms.strength.value}set strength(i){this.uniforms.strength.value=i}getStrength(){return this.strength}setStrength(i){this.strength=i}},sl=class extends Si{constructor(i,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,r){let s=this.fullscreenMaterial.uniforms;e!==null&&s!==void 0&&s[this.input]!==void 0&&(s[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},I2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D nearColorBuffer;uniform mediump sampler2D farColorBuffer;
#else
uniform lowp sampler2D nearColorBuffer;uniform lowp sampler2D farColorBuffer;
#endif
#if MASK_FUNCTION != 1 && MASK_FUNCTION != 2
uniform lowp sampler2D farCoCBuffer;
#endif
uniform lowp sampler2D nearCoCBuffer;uniform float scale;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 colorNear=texture2D(nearColorBuffer,uv);vec4 colorFar=texture2D(farColorBuffer,uv);
#if MASK_FUNCTION == 1 || MASK_FUNCTION == 2
vec2 cocNearFar=vec2(texture2D(nearCoCBuffer,uv).r,colorFar.a);cocNearFar.x=min(cocNearFar.x*scale,1.0);
#else
vec2 cocNearFar=vec2(texture2D(nearCoCBuffer,uv).r,texture2D(farCoCBuffer,uv).g);cocNearFar=min(cocNearFar*scale,1.0);colorFar.a*=cocNearFar.y;
#endif
vec4 result=inputColor*(1.0-cocNearFar.y)+colorFar;result=mix(result,colorNear,cocNearFar.x);outputColor=result;}`,B2=new L,ly=class extends Ga{constructor(i,{blendFunction:e,worldFocusDistance:t,worldFocusRange:n,focalLength:r,focusDistance:s=t||3,focusRange:a=n||r||2,bokehScale:o=1,resolutionScale:l=.5,width:c,height:u,resolutionX:f=c||qi.AUTO_SIZE,resolutionY:h=u||qi.AUTO_SIZE}={}){super("DepthOfFieldEffect",I2,{blendFunction:e,attributes:Ys.DEPTH,uniforms:new Map([["nearColorBuffer",new ge(null)],["farColorBuffer",new ge(null)],["nearCoCBuffer",new ge(null)],["farCoCBuffer",new ge(null)],["scale",new ge(1)]])}),this.camera=i,this.renderTarget=new gt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="DoF.Intermediate",this.renderTargetMasked=this.renderTarget.clone(),this.renderTargetMasked.texture.name="DoF.Masked.Far",this.renderTargetNear=this.renderTarget.clone(),this.renderTargetNear.texture.name="DoF.Bokeh.Near",this.uniforms.get("nearColorBuffer").value=this.renderTargetNear.texture,this.renderTargetFar=this.renderTarget.clone(),this.renderTargetFar.texture.name="DoF.Bokeh.Far",this.uniforms.get("farColorBuffer").value=this.renderTargetFar.texture,this.renderTargetCoC=this.renderTarget.clone(),this.renderTargetCoC.texture.name="DoF.CoC",this.uniforms.get("farCoCBuffer").value=this.renderTargetCoC.texture,this.renderTargetCoCBlurred=this.renderTargetCoC.clone(),this.renderTargetCoCBlurred.texture.name="DoF.CoC.Blurred",this.uniforms.get("nearCoCBuffer").value=this.renderTargetCoCBlurred.texture,this.cocPass=new sl(new R2(i));let d=this.cocMaterial;d.focusDistance=s,d.focusRange=a,this.blurPass=new iy({resolutionScale:l,resolutionX:f,resolutionY:h,kernelSize:ed.MEDIUM}),this.maskPass=new sl(new P2(this.renderTargetCoC.texture));let g=this.maskPass.fullscreenMaterial;g.colorChannel=ay.GREEN,this.maskFunction=oy.MULTIPLY_RGB,this.bokehNearBasePass=new sl(new $f(!1,!0)),this.bokehNearBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehNearFillPass=new sl(new $f(!0,!0)),this.bokehNearFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehFarBasePass=new sl(new $f(!1,!1)),this.bokehFarBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.bokehFarFillPass=new sl(new $f(!0,!1)),this.bokehFarFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.target=null;let v=this.resolution=new qi(this,f,h,l);v.addEventListener("change",p=>this.setSize(v.baseWidth,v.baseHeight)),this.bokehScale=o}set mainCamera(i){this.camera=i,this.cocMaterial.copyCameraSettings(i)}get cocTexture(){return this.renderTargetCoC.texture}get maskFunction(){return this.maskPass.fullscreenMaterial.maskFunction}set maskFunction(i){this.maskFunction!==i&&(this.defines.set("MASK_FUNCTION",i.toFixed(0)),this.maskPass.fullscreenMaterial.maskFunction=i,this.setChanged())}get cocMaterial(){return this.cocPass.fullscreenMaterial}get circleOfConfusionMaterial(){return this.cocMaterial}getCircleOfConfusionMaterial(){return this.cocMaterial}getBlurPass(){return this.blurPass}getResolution(){return this.resolution}get bokehScale(){return this.uniforms.get("scale").value}set bokehScale(i){this.bokehNearBasePass.fullscreenMaterial.scale=i,this.bokehNearFillPass.fullscreenMaterial.scale=i,this.bokehFarBasePass.fullscreenMaterial.scale=i,this.bokehFarFillPass.fullscreenMaterial.scale=i,this.maskPass.fullscreenMaterial.strength=i,this.uniforms.get("scale").value=i}getBokehScale(){return this.bokehScale}setBokehScale(i){this.bokehScale=i}getTarget(){return this.target}setTarget(i){this.target=i}calculateFocusDistance(i){return this.camera.getWorldPosition(B2).distanceTo(i)}setDepthTexture(i,e=_i){this.cocMaterial.depthBuffer=i,this.cocMaterial.depthPacking=e}update(i,e,t){let n=this.renderTarget,r=this.renderTargetCoC,s=this.renderTargetCoCBlurred,a=this.renderTargetMasked;if(this.target!==null){let o=this.calculateFocusDistance(this.target);this.cocMaterial.focusDistance=o}this.cocPass.render(i,null,r),this.blurPass.render(i,r,s),this.maskPass.render(i,e,a),this.bokehFarBasePass.render(i,a,n),this.bokehFarFillPass.render(i,n,this.renderTargetFar),this.bokehNearBasePass.render(i,e,n),this.bokehNearFillPass.render(i,n,this.renderTargetNear)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.cocPass.setSize(i,e),this.blurPass.setSize(i,e),this.maskPass.setSize(i,e),this.renderTargetFar.setSize(i,e),this.renderTargetCoC.setSize(i,e),this.renderTargetMasked.setSize(i,e),this.renderTarget.setSize(n,r),this.renderTargetNear.setSize(n,r),this.renderTargetCoCBlurred.setSize(n,r),this.bokehNearBasePass.fullscreenMaterial.setSize(i,e),this.bokehNearFillPass.fullscreenMaterial.setSize(i,e),this.bokehFarBasePass.fullscreenMaterial.setSize(i,e),this.bokehFarFillPass.fullscreenMaterial.setSize(i,e)}initialize(i,e,t){this.cocPass.initialize(i,e,t),this.maskPass.initialize(i,e,t),this.bokehNearBasePass.initialize(i,e,t),this.bokehNearFillPass.initialize(i,e,t),this.bokehFarBasePass.initialize(i,e,t),this.bokehFarFillPass.initialize(i,e,t),this.blurPass.initialize(i,e,xt),i.capabilities.logarithmicDepthBuffer&&(this.cocPass.fullscreenMaterial.defines.LOG_DEPTH="1"),t!==void 0&&(this.renderTarget.texture.type=t,this.renderTargetNear.texture.type=t,this.renderTargetFar.texture.type=t,this.renderTargetMasked.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it,this.renderTargetNear.texture.colorSpace=it,this.renderTargetFar.texture.colorSpace=it,this.renderTargetMasked.texture.colorSpace=it))}};var cy=class extends Si{constructor(i,e,t=null){super("RenderPass",i,e),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new ty,this.overrideMaterialManager=t===null?null:new J_(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){let i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){let e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new J_(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=s.background,u=i.shadowMap.autoUpdate,f=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(f),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,s,a):i.render(s,a),a.layers.mask=l,s.background=c,i.shadowMap.autoUpdate=u}};var Ai={LINEAR:0,REINHARD:1,REINHARD2:2,REINHARD2_ADAPTIVE:3,UNCHARTED2:4,OPTIMIZED_CINEON:5,CINEON:5,ACES_FILMIC:6,AGX:7,NEUTRAL:8},jc={DEFAULT:0,ESKIL:1};var U2=`void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec3 noise=vec3(rand(uv*(1.0+time)));
#ifdef PREMULTIPLY
outputColor=vec4(min(inputColor.rgb*noise,vec3(1.0)),inputColor.a);
#else
outputColor=vec4(noise,inputColor.a);
#endif
}`,uy=class extends Ga{constructor({blendFunction:i=ht.SCREEN,premultiply:e=!1}={}){super("NoiseEffect",U2,{blendFunction:i}),this.premultiply=e}get premultiply(){return this.defines.has("PREMULTIPLY")}set premultiply(i){this.premultiply!==i&&(i?this.defines.set("PREMULTIPLY","1"):this.defines.delete("PREMULTIPLY"),this.setChanged())}isPremultiplied(){return this.premultiply}setPremultiplied(i){this.premultiply=i}};var qB=Math.PI*.5;var L2=`#include <packing>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
uniform lowp sampler2D luminanceBuffer0;uniform lowp sampler2D luminanceBuffer1;uniform float minLuminance;uniform float deltaTime;uniform float tau;varying vec2 vUv;void main(){float l0=unpackRGBAToFloat(texture2D(luminanceBuffer0,vUv));
#if __VERSION__ < 300
float l1=texture2DLodEXT(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#else
float l1=textureLod(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#endif
l0=max(minLuminance,l0);l1=max(minLuminance,l1);float adaptedLum=l0+(l1-l0)*(1.0-exp(-deltaTime*tau));gl_FragColor=(adaptedLum==1.0)?vec4(1.0):packFloatToRGBA(adaptedLum);}`,F2=class extends at{constructor(){super({name:"AdaptiveLuminanceMaterial",defines:{MIP_LEVEL_1X1:"0.0"},uniforms:{luminanceBuffer0:new ge(null),luminanceBuffer1:new ge(null),minLuminance:new ge(.01),deltaTime:new ge(0),tau:new ge(1)},extensions:{shaderTextureLOD:!0},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:L2,vertexShader:al})}set luminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}setLuminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}set luminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}setLuminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}set mipLevel1x1(i){this.defines.MIP_LEVEL_1X1=i.toFixed(1),this.needsUpdate=!0}setMipLevel1x1(i){this.mipLevel1x1=i}set deltaTime(i){this.uniforms.deltaTime.value=i}setDeltaTime(i){this.uniforms.deltaTime.value=i}get minLuminance(){return this.uniforms.minLuminance.value}set minLuminance(i){this.uniforms.minLuminance.value=i}getMinLuminance(){return this.uniforms.minLuminance.value}setMinLuminance(i){this.uniforms.minLuminance.value=i}get adaptationRate(){return this.uniforms.tau.value}set adaptationRate(i){this.uniforms.tau.value=i}getAdaptationRate(){return this.uniforms.tau.value}setAdaptationRate(i){this.uniforms.tau.value=i}},N2=class extends Si{constructor(i,{minLuminance:e=.01,adaptationRate:t=1}={}){super("AdaptiveLuminancePass"),this.fullscreenMaterial=new F2,this.needsSwap=!1,this.renderTargetPrevious=new gt(1,1,{minFilter:Ct,magFilter:Ct,depthBuffer:!1}),this.renderTargetPrevious.texture.name="Luminance.Previous";let n=this.fullscreenMaterial;n.luminanceBuffer0=this.renderTargetPrevious.texture,n.luminanceBuffer1=i,n.minLuminance=e,n.adaptationRate=t,this.renderTargetAdapted=this.renderTargetPrevious.clone(),this.renderTargetAdapted.texture.name="Luminance.Adapted",this.copyPass=new ey(this.renderTargetPrevious,!1)}get texture(){return this.renderTargetAdapted.texture}getTexture(){return this.renderTargetAdapted.texture}set mipLevel1x1(i){this.fullscreenMaterial.mipLevel1x1=i}get adaptationRate(){return this.fullscreenMaterial.adaptationRate}set adaptationRate(i){this.fullscreenMaterial.adaptationRate=i}render(i,e,t,n,r){this.fullscreenMaterial.deltaTime=n,i.setRenderTarget(this.renderToScreen?null:this.renderTargetAdapted),i.render(this.scene,this.camera),this.copyPass.render(i,this.renderTargetAdapted)}},O2=`#include <tonemapping_pars_fragment>
uniform float whitePoint;
#if TONE_MAPPING_MODE == 2 || TONE_MAPPING_MODE == 3
uniform float middleGrey;
#if TONE_MAPPING_MODE == 3
uniform lowp sampler2D luminanceBuffer;
#else
uniform float averageLuminance;
#endif
vec3 Reinhard2ToneMapping(vec3 color){color*=toneMappingExposure;float l=luminance(color);
#if TONE_MAPPING_MODE == 3
float lumAvg=unpackRGBAToFloat(texture2D(luminanceBuffer,vec2(0.5)));
#else
float lumAvg=averageLuminance;
#endif
float lumScaled=(l*middleGrey)/max(lumAvg,1e-6);float lumCompressed=lumScaled*(1.0+lumScaled/(whitePoint*whitePoint));lumCompressed/=(1.0+lumScaled);return clamp(lumCompressed*color,0.0,1.0);}
#elif TONE_MAPPING_MODE == 4
#define A 0.15
#define B 0.50
#define C 0.10
#define D 0.20
#define E 0.02
#define F 0.30
vec3 Uncharted2Helper(const in vec3 x){return((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;}vec3 Uncharted2ToneMapping(vec3 color){color*=toneMappingExposure;return clamp(Uncharted2Helper(color)/Uncharted2Helper(vec3(whitePoint)),0.0,1.0);}
#endif
void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){
#if TONE_MAPPING_MODE == 2 || TONE_MAPPING_MODE == 3
outputColor=vec4(Reinhard2ToneMapping(inputColor.rgb),inputColor.a);
#elif TONE_MAPPING_MODE == 4
outputColor=vec4(Uncharted2ToneMapping(inputColor.rgb),inputColor.a);
#else
outputColor=vec4(toneMapping(inputColor.rgb),inputColor.a);
#endif
}`,hy=class extends Ga{constructor({blendFunction:i=ht.SRC,adaptive:e=!1,mode:t=e?Ai.REINHARD2_ADAPTIVE:Ai.AGX,resolution:n=256,maxLuminance:r=4,whitePoint:s=r,middleGrey:a=.6,minLuminance:o=.01,averageLuminance:l=1,adaptationRate:c=1}={}){super("ToneMappingEffect",O2,{blendFunction:i,uniforms:new Map([["luminanceBuffer",new ge(null)],["maxLuminance",new ge(r)],["whitePoint",new ge(s)],["middleGrey",new ge(a)],["averageLuminance",new ge(l)]])}),this.renderTargetLuminance=new gt(1,1,{minFilter:Fr,depthBuffer:!1}),this.renderTargetLuminance.texture.generateMipmaps=!0,this.renderTargetLuminance.texture.name="Luminance",this.luminancePass=new ry({renderTarget:this.renderTargetLuminance}),this.adaptiveLuminancePass=new N2(this.luminancePass.texture,{minLuminance:o,adaptationRate:c}),this.uniforms.get("luminanceBuffer").value=this.adaptiveLuminancePass.texture,this.resolution=n,this.mode=t}get mode(){return Number(this.defines.get("TONE_MAPPING_MODE"))}set mode(i){if(this.mode===i)return;let t=Wn.replace(/\D+/g,"")>=168?"CineonToneMapping(texel)":"OptimizedCineonToneMapping(texel)";switch(this.defines.clear(),this.defines.set("TONE_MAPPING_MODE",i.toFixed(0)),i){case Ai.LINEAR:this.defines.set("toneMapping(texel)","LinearToneMapping(texel)");break;case Ai.REINHARD:this.defines.set("toneMapping(texel)","ReinhardToneMapping(texel)");break;case Ai.CINEON:case Ai.OPTIMIZED_CINEON:this.defines.set("toneMapping(texel)",t);break;case Ai.ACES_FILMIC:this.defines.set("toneMapping(texel)","ACESFilmicToneMapping(texel)");break;case Ai.AGX:this.defines.set("toneMapping(texel)","AgXToneMapping(texel)");break;case Ai.NEUTRAL:this.defines.set("toneMapping(texel)","NeutralToneMapping(texel)");break;default:this.defines.set("toneMapping(texel)","texel");break}this.adaptiveLuminancePass.enabled=i===Ai.REINHARD2_ADAPTIVE,this.setChanged()}getMode(){return this.mode}setMode(i){this.mode=i}get whitePoint(){return this.uniforms.get("whitePoint").value}set whitePoint(i){this.uniforms.get("whitePoint").value=i}get middleGrey(){return this.uniforms.get("middleGrey").value}set middleGrey(i){this.uniforms.get("middleGrey").value=i}get averageLuminance(){return this.uniforms.get("averageLuminance").value}set averageLuminance(i){this.uniforms.get("averageLuminance").value=i}get adaptiveLuminanceMaterial(){return this.adaptiveLuminancePass.fullscreenMaterial}getAdaptiveLuminanceMaterial(){return this.adaptiveLuminanceMaterial}get resolution(){return this.luminancePass.resolution.width}set resolution(i){let e=Math.max(0,Math.ceil(Math.log2(i))),t=Math.pow(2,e);this.luminancePass.resolution.setPreferredSize(t,t),this.adaptiveLuminanceMaterial.mipLevel1x1=e}getResolution(){return this.resolution}setResolution(i){this.resolution=i}get adaptive(){return this.mode===Ai.REINHARD2_ADAPTIVE}set adaptive(i){this.mode=i?Ai.REINHARD2_ADAPTIVE:Ai.REINHARD2}get adaptationRate(){return this.adaptiveLuminanceMaterial.adaptationRate}set adaptationRate(i){this.adaptiveLuminanceMaterial.adaptationRate=i}get distinction(){return console.warn(this.name,"distinction was removed."),1}set distinction(i){console.warn(this.name,"distinction was removed.")}update(i,e,t){this.adaptiveLuminancePass.enabled&&(this.luminancePass.render(i,e),this.adaptiveLuminancePass.render(i,null,null,t))}initialize(i,e,t){this.adaptiveLuminancePass.initialize(i,e,t)}},k2=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,fy=class extends Ga{constructor({blendFunction:i,eskil:e=!1,technique:t=e?jc.ESKIL:jc.DEFAULT,offset:n=.5,darkness:r=.5}={}){super("VignetteEffect",k2,{blendFunction:i,defines:new Map([["VIGNETTE_TECHNIQUE",t.toFixed(0)]]),uniforms:new Map([["offset",new ge(n)],["darkness",new ge(r)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(i){this.technique!==i&&(this.defines.set("VIGNETTE_TECHNIQUE",i.toFixed(0)),this.setChanged())}get eskil(){return this.technique===jc.ESKIL}set eskil(i){this.technique=i?jc.ESKIL:jc.DEFAULT}getTechnique(){return this.technique}setTechnique(i){this.technique=i}get offset(){return this.uniforms.get("offset").value}set offset(i){this.uniforms.get("offset").value=i}getOffset(){return this.offset}setOffset(i){this.offset=i}get darkness(){return this.uniforms.get("darkness").value}set darkness(i){this.uniforms.get("darkness").value=i}getDarkness(){return this.darkness}setDarkness(i){this.darkness=i}};var z2=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,H2="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",G2=class extends at{constructor(i,e,t,n,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Wn.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new ge(null),depthBuffer:new ge(null),resolution:new ge(new be),texelSize:new ge(new be),cameraNear:new ge(.3),cameraFar:new ge(1e3),aspect:new ge(1),time:new ge(0)},blending:Ut,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:r}),i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=_i){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){return this.fragmentShader=z2.replace(bt.FRAGMENT_HEAD,i.get(bt.FRAGMENT_HEAD)||"").replace(bt.FRAGMENT_MAIN_UV,i.get(bt.FRAGMENT_MAIN_UV)||"").replace(bt.FRAGMENT_MAIN_IMAGE,i.get(bt.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=H2.replace(bt.VERTEX_HEAD,i.get(bt.VERTEX_HEAD)||"").replace(bt.VERTEX_MAIN_SUPPORT,i.get(bt.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(i){for(let e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(let e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(let e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof _n?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){let t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return bt}};var e3=Number(Wn.replace(/\D+/g,"")),Ha=255/256,t3=new Float32Array([Ha/256**3,Ha/256**2,Ha/256,Ha]),n3=new Float32Array([Ha,Ha/256,Ha/256**2,1/256**3]);function j_(i,e,t){for(let n of e){let r="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),s=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(let a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(s,r))}}function V2(i,e,t){let n=e.getFragmentShader(),r=e.getVertexShader(),s=n!==void 0&&/mainImage/.test(n),a=n!==void 0&&/mainUv/.test(n);if(t.attributes|=e.getAttributes(),n===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(t.attributes&Ys.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!s&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts,c=l.get(bt.FRAGMENT_HEAD)||"",u=l.get(bt.FRAGMENT_MAIN_UV)||"",f=l.get(bt.FRAGMENT_MAIN_IMAGE)||"",h=l.get(bt.VERTEX_HEAD)||"",d=l.get(bt.VERTEX_MAIN_SUPPORT)||"",g=new Set,v=new Set;if(a&&(u+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),r!==null&&/mainSupport/.test(r)){let x=/mainSupport *\([\w\s]*?uv\s*?\)/.test(r);d+=`	${i}MainSupport(`,d+=x?`vUv);
`:`);
`;for(let A of r.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let _ of A[1].split(/\s*,\s*/))t.varyings.add(_),g.add(_),v.add(_);for(let A of r.matchAll(o))v.add(A[1])}for(let x of n.matchAll(o))v.add(x[1]);for(let x of e.defines.keys())v.add(x.replace(/\([\w\s,]*\)/g,""));for(let x of e.uniforms.keys())v.add(x);v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((x,A)=>t.uniforms.set(i+A.charAt(0).toUpperCase()+A.slice(1),x)),e.defines.forEach((x,A)=>t.defines.set(i+A.charAt(0).toUpperCase()+A.slice(1),x));let p=new Map([["fragment",n],["vertex",r]]);j_(i,v,t.defines),j_(i,v,p),n=p.get("fragment"),r=p.get("vertex");let m=e.blendMode;if(t.blendModes.set(m.blendFunction,m),s){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(f+=e.inputColorSpace===it?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==yi?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);let x=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${i}MainImage(color0, UV, `,(t.attributes&Ys.DEPTH)!==0&&x.test(n)&&(f+="depth, ",t.readDepth=!0),f+=`color1);
	`;let A=i+"BlendOpacity";t.uniforms.set(A,m.opacity),f+=`color0 = blend${m.blendFunction}(color0, color1, ${A});

	`,c+=`uniform float ${A};

`}if(c+=n+`
`,r!==null&&(h+=r+`
`),l.set(bt.FRAGMENT_HEAD,c),l.set(bt.FRAGMENT_MAIN_UV,u),l.set(bt.FRAGMENT_MAIN_IMAGE,f),l.set(bt.VERTEX_HEAD,h),l.set(bt.VERTEX_MAIN_SUPPORT,d),e.extensions!==null)for(let x of e.extensions)t.extensions.add(x)}}var Tg=class extends Si{constructor(i,...e){super("EffectPass"),this.fullscreenMaterial=new G2(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(let e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(let e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){let e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let i=new IC,e=0;for(let a of this.effects)if(a.blendMode.blendFunction===ht.DST)i.attributes|=a.getAttributes()&Ys.DEPTH;else{if((i.attributes&a.getAttributes()&Ys.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);V2("e"+e++,a,i)}let t=i.shaderParts.get(bt.FRAGMENT_HEAD),n=i.shaderParts.get(bt.FRAGMENT_MAIN_IMAGE),r=i.shaderParts.get(bt.FRAGMENT_MAIN_UV),s=/\bblend\b/g;for(let a of i.blendModes.values())t+=a.getShaderCode().replace(s,`blend${a.blendFunction}`)+`
`;(i.attributes&Ys.DEPTH)!==0?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===it&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(bt.FRAGMENT_HEAD,t),i.shaderParts.set(bt.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(bt.FRAGMENT_MAIN_UV,r);for(let[a,o]of i.shaderParts)o!==null&&i.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=_i){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(let t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,r){for(let s of this.effects)s.update(i,e,n);if(!this.skipRendering||this.renderToScreen){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(let t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(let n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}};var r3=[new Float32Array(3),new Float32Array(3)],s3=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],a3=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var o3=[new Float32Array(2),new Float32Array(2)];var l3=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),c3=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],u3=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],h3=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var f3=new Map([[ai(0,0,0,0),new Float32Array([0,0,0,0])],[ai(0,0,0,1),new Float32Array([0,0,0,1])],[ai(0,0,1,0),new Float32Array([0,0,1,0])],[ai(0,0,1,1),new Float32Array([0,0,1,1])],[ai(0,1,0,0),new Float32Array([0,1,0,0])],[ai(0,1,0,1),new Float32Array([0,1,0,1])],[ai(0,1,1,0),new Float32Array([0,1,1,0])],[ai(0,1,1,1),new Float32Array([0,1,1,1])],[ai(1,0,0,0),new Float32Array([1,0,0,0])],[ai(1,0,0,1),new Float32Array([1,0,0,1])],[ai(1,0,1,0),new Float32Array([1,0,1,0])],[ai(1,0,1,1),new Float32Array([1,0,1,1])],[ai(1,1,0,0),new Float32Array([1,1,0,0])],[ai(1,1,0,1),new Float32Array([1,1,0,1])],[ai(1,1,1,0),new Float32Array([1,1,1,0])],[ai(1,1,1,1),new Float32Array([1,1,1,1])]]);function Sg(i,e,t){return i+(e-i)*t}function ai(i,e,t,n){let r=Sg(i,e,.75),s=Sg(t,n,1-.25);return Sg(r,s,1-.125)}var W2=`
	varying vec3 vDir;
	void main() {
		vDir = normalize( position );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`,X2=`
	uniform vec3 top;
	uniform vec3 horizon;
	uniform vec3 bottom;
	varying vec3 vDir;
	void main() {
		float y = vDir.y;
		vec3 c = y > 0.0 ? mix( horizon, top, pow( y, 0.7 ) ) : mix( horizon, bottom, pow( - y, 0.45 ) );
		gl_FragColor = vec4( c, 1.0 );
	}
`,Eg=[],td=[1,.965,.92],py=[.94,.97,1],lr=[1,1,1],nd={dome:{top:.6,horizon:.16,bottom:.04},cards:[[20,20,[0,28,0],2.6,lr],[12,26,[-22,8,14],2,py],[12,26,[22,8,14],2,td],[28,10,[0,10,-26],1.6,lr],[4,30,[-26,2,-8],2.8,lr],[4,30,[26,2,-8],2.8,lr],[7,44,[Math.cos(.8)*25,0,Math.sin(.8)*25],.02,lr],[7,44,[Math.cos(2.35)*25,0,Math.sin(2.35)*25],.02,lr],[7,44,[Math.cos(3.95)*25,0,Math.sin(3.95)*25],.02,lr],[7,44,[Math.cos(5.5)*25,0,Math.sin(5.5)*25],.02,lr],[9,18,[-25,4,6],.25,lr],[9,18,[25,4,-2],.25,lr],[40,5,[0,2,28],.3,lr]]},ol=(i,e,t)=>new Ze().setRGB(i,e,t,Pi);function my(i,e,t,n){i.add(new kt(new Ua(60,64,32),new at({vertexShader:W2,fragmentShader:X2,side:tn,depthWrite:!1,uniforms:{top:{value:e},horizon:{value:t},bottom:{value:n}}})))}function zr(i,e,t,n,r,s=lr,a=!1){let o=a?new Uc(e/2,64):new ss(e,t),l=new Ia({side:mn});l.color.setRGB(s[0]*r,s[1]*r,s[2]*r,Pi);let c=new kt(o,l);return c.position.set(n[0],n[1],n[2]),c.lookAt(0,0,0),i.add(c),c}function Y2(){let i=new Ar,e=nd.dome;my(i,ol(e.top,e.top,e.top),ol(e.horizon,e.horizon,e.horizon*1.03),ol(e.bottom,e.bottom,e.bottom*1.05));for(let t of nd.cards)zr(i,...t);return Eg.length=0,i}function gy(i=.22){let e=new vi,t=nd.cards.map(([r,s,a,o,l,c])=>{e.position.set(...a),e.lookAt(0,0,0),e.updateMatrixWorld(!0);let u=new L().setFromMatrixColumn(e.matrixWorld,0).normalize(),f=new L().setFromMatrixColumn(e.matrixWorld,1).normalize(),h=new L().setFromMatrixColumn(e.matrixWorld,2).normalize(),d=new L(...a);return{dist:d.length(),c:new St(d.x,d.y,d.z,c?1:0),u:new St(u.x/(r/2),u.y/(r/2),u.z/(r/2),i/(r/2)),v:new St(f.x/(s/2),f.y/(s/2),f.z/(s/2),i/(s/2)),n:new St(h.x,h.y,h.z,d.dot(h)),col:new L(l[0]*o,l[1]*o,l[2]*o)}}).sort((r,s)=>s.dist-r.dist),n=nd.dome;return{count:t.length,c:t.map(r=>r.c),u:t.map(r=>r.u),v:t.map(r=>r.v),n:t.map(r=>r.n),col:t.map(r=>r.col),dome:new L(n.top,n.horizon,n.bottom)}}function q2(){let i=new Ar;return my(i,ol(.85,.85,.86),ol(.5,.5,.51),ol(.26,.26,.27)),zr(i,26,14,[0,26,4],3.2,td),zr(i,7,32,[-24,4,6],2.8,py),zr(i,7,32,[24,4,-6],2.8,td),zr(i,2.2,30,[-16,6,-20],4.5),zr(i,2.2,30,[16,6,20],4,td),zr(i,12,8,[0,14,-24],2.4),zr(i,8,40,[-20,0,-14],.14),zr(i,8,40,[20,0,14],.14),zr(i,60,8,[0,-8,26],.16),i}function dy(i,e,t){let n=new il(t,{type:ri,generateMipmaps:!1,minFilter:Gt,magFilter:Gt});return new Ko(.1,200,n).update(i,e),n}function vy(i,{size:e=512,metal:t=512}={}){let n=dy(i,Y2(),e),r=dy(i,q2(),t),s=new nl(i),a=s.fromCubemap(r.texture);s.dispose();let o=new $e,l=new je;return{cube:n.texture,bright:r.texture,env:a.texture,rotation:o,angle:0,setAngle(c){this.angle=c,o.setFromMatrix4(l.makeRotationY(-c))},dispose(){n.dispose(),r.dispose(),a.dispose()}}}var ll=Math.pow(2,-24),$c=Symbol("SKIP_GENERATION"),id={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[$c]:!1};function Yt(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function eu(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let r=i[n+3]-i[n];r>t&&(t=r,e=n)}return e}function bg(i,e){e.set(i)}function wg(i,e,t){let n,r;for(let s=0;s<3;s++){let a=s+3;n=i[s],r=e[s],t[s]=n<r?n:r,n=i[a],r=e[a],t[a]=n>r?n:r}}function tu(i,e,t){for(let n=0;n<3;n++){let r=e[i+2*n],s=e[i+2*n+1],a=r-s,o=r+s;a<t[n]&&(t[n]=a),o>t[n+3]&&(t[n+3]=o)}}function cl(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}function _t(i,e){return e[i+15]===65535}function wt(i,e){return e[i+6]}function Lt(i,e){return e[i+14]}function Rt(i){return i+8}function Dt(i,e){let t=e[i+6];return i+t*8}function qs(i,e){return e[i+7]}function rd(i,e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0,f=1/0,h=1/0,d=1/0,g=-1/0,v=-1/0,p=-1/0,m=i.offset||0;for(let x=(e-m)*6,A=(e+t-m)*6;x<A;x+=6){let _=i[x+0],M=i[x+1],E=_-M,T=_+M;E<s&&(s=E),T>l&&(l=T),_<f&&(f=_),_>g&&(g=_);let y=i[x+2],S=i[x+3],C=y-S,R=y+S;C<a&&(a=C),R>c&&(c=R),y<h&&(h=y),y>v&&(v=y);let w=i[x+4],I=i[x+5],P=w-I,F=w+I;P<o&&(o=P),F>u&&(u=F),w<d&&(d=w),w>p&&(p=w)}n[0]=s,n[1]=a,n[2]=o,n[3]=l,n[4]=c,n[5]=u,r[0]=f,r[1]=h,r[2]=d,r[3]=g,r[4]=v,r[5]=p}var ls=32,K2=(i,e)=>i.candidate-e.candidate,Qs=new Array(ls).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),sd=new Float32Array(6);function _y(i,e,t,n,r,s){let a=-1,o=0;if(s===0)a=eu(e),a!==-1&&(o=(e[a]+e[a+3])/2);else if(s===1)a=eu(i),a!==-1&&(o=J2(t,n,r,a));else if(s===2){let l=cl(i),c=1.25*r,u=t.offset||0,f=(n-u)*6,h=(n+r-u)*6;for(let d=0;d<3;d++){let g=e[d],m=(e[d+3]-g)/ls;if(r<ls/4){let x=[...Qs];x.length=r;let A=0;for(let M=f;M<h;M+=6,A++){let E=x[A];E.candidate=t[M+2*d],E.count=0;let{bounds:T,leftCacheBounds:y,rightCacheBounds:S}=E;for(let C=0;C<3;C++)S[C]=1/0,S[C+3]=-1/0,y[C]=1/0,y[C+3]=-1/0,T[C]=1/0,T[C+3]=-1/0;tu(M,t,T)}x.sort(K2);let _=r;for(let M=0;M<_;M++){let E=x[M];for(;M+1<_&&x[M+1].candidate===E.candidate;)x.splice(M+1,1),_--}for(let M=f;M<h;M+=6){let E=t[M+2*d];for(let T=0;T<_;T++){let y=x[T];E>=y.candidate?tu(M,t,y.rightCacheBounds):(tu(M,t,y.leftCacheBounds),y.count++)}}for(let M=0;M<_;M++){let E=x[M],T=E.count,y=r-E.count,S=E.leftCacheBounds,C=E.rightCacheBounds,R=0;T!==0&&(R=cl(S)/l);let w=0;y!==0&&(w=cl(C)/l);let I=1+1.25*(R*T+w*y);I<c&&(a=d,c=I,o=E.candidate)}}else{for(let _=0;_<ls;_++){let M=Qs[_];M.count=0,M.candidate=g+m+_*m;let E=M.bounds;for(let T=0;T<3;T++)E[T]=1/0,E[T+3]=-1/0}for(let _=f;_<h;_+=6){let T=~~((t[_+2*d]-g)/m);T>=ls&&(T=ls-1);let y=Qs[T];y.count++,tu(_,t,y.bounds)}let x=Qs[ls-1];bg(x.bounds,x.rightCacheBounds);for(let _=ls-2;_>=0;_--){let M=Qs[_],E=Qs[_+1];wg(M.bounds,E.rightCacheBounds,M.rightCacheBounds)}let A=0;for(let _=0;_<ls-1;_++){let M=Qs[_],E=M.count,T=M.bounds,S=Qs[_+1].rightCacheBounds;E!==0&&(A===0?bg(T,sd):wg(T,sd,sd)),A+=E;let C=0,R=0;A!==0&&(C=cl(sd)/l);let w=r-A;w!==0&&(R=cl(S)/l);let I=1+1.25*(C*A+R*w);I<c&&(a=d,c=I,o=M.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:a,pos:o}}function J2(i,e,t,n){let r=0,s=i.offset;for(let a=e,o=e+t;a<o;a++)r+=i[(a-s)*6+n*2];return r/t}var ul=class{constructor(){this.boundingData=new Float32Array(6)}};function yy(i,e,t,n,r,s){let a=n,o=n+r-1,l=s.pos,c=s.axis*2,u=t.offset||0;for(;;){for(;a<=o&&t[(a-u)*6+c]<l;)a++;for(;a<=o&&t[(o-u)*6+c]>=l;)o--;if(a<o){for(let f=0;f<e;f++){let h=i[a*e+f];i[a*e+f]=i[o*e+f],i[o*e+f]=h}for(let f=0;f<6;f++){let h=a-u,d=o-u,g=t[h*6+f];t[h*6+f]=t[d*6+f],t[d*6+f]=g}a++,o--}else return a}}var Ay,ad,Rg,Sy,j2=Math.pow(2,32);function od(i){return"count"in i?1:1+od(i.left)+od(i.right)}function My(i,e,t){return Ay=new Float32Array(t),ad=new Uint32Array(t),Rg=new Uint16Array(t),Sy=new Uint8Array(t),Dg(i,e)}function Dg(i,e){let t=i/4,n=i/2,r="count"in e,s=e.boundingData;for(let a=0;a<6;a++)Ay[t+a]=s[a];if(r)return e.buffer?(Sy.set(new Uint8Array(e.buffer),i),i+e.buffer.byteLength):(ad[t+6]=e.offset,Rg[n+14]=e.count,Rg[n+15]=65535,i+32);{let{left:a,right:o,splitAxis:l}=e,c=i+32,u=Dg(c,a),f=i/32,d=u/32-f;if(d>j2)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return ad[t+6]=d,ad[t+7]=l,Dg(u,o)}}function $2(i,e,t,n,r,s){let{maxDepth:a,verbose:o,targetLeafSize:l,_strictLeafSize:c=1/0,strategy:u,onProgress:f}=r,h=i.primitiveBuffer,d=i.primitiveBufferStride,g=new Float32Array(6),v=!1,p=new ul;return rd(e,t,n,p.boundingData,g),x(p,t,n,g),p;function m(A){f&&f((A-s.offset)/s.count)}function x(A,_,M,E=null,T=0){!v&&T>=a&&(v=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));let y=M>c;if(M<=l&&!y||T>=a)return m(_+M),A.offset=_,A.count=M,A;let S=_y(A.boundingData,E,e,_,M,u),C=S.axis===-1?-1:yy(h,d,e,_,M,S);if(S.axis===-1||C===_||C===_+M){if(!y)return m(_+M),A.offset=_,A.count=M,A;S.axis=Math.max(0,eu(A.boundingData)),C=_+Math.max(1,Math.floor(M/2))}A.splitAxis=S.axis;let R=new ul,w=_,I=C-_;A.left=R,rd(e,w,I,R.boundingData,g),x(R,w,I,g,T+1);let P=new ul,F=C,N=M-I;return A.right=P,rd(e,F,N,P.boundingData,g),x(P,F,N,g,T+1),A}}function Ty(i,e){let t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(e.range),r=n[0],s=n[n.length-1],a={offset:r.offset,count:s.offset+s.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,i.computePrimitiveBounds(a.offset,a.count,o),i._roots=n.map(l=>{let c=$2(i,o,l.offset,l.count,e,a),u=od(c),f=new t(32*u);return My(0,c,f),f})}var Zs=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var Pg=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Mt=new Pg;var Ks,fl,hl=[],ld=new Zs(()=>new Zt);function Ey(i,e,t,n,r,s){Ks=ld.getPrimitive(),fl=ld.getPrimitive(),hl.push(Ks,fl),Mt.setBuffer(i._roots[e]);let a=Ig(0,i.geometry,t,n,r,s);Mt.clearBuffer(),ld.releasePrimitive(Ks),ld.releasePrimitive(fl),hl.pop(),hl.pop();let o=hl.length;return o>0&&(fl=hl[o-1],Ks=hl[o-2]),a}function Ig(i,e,t,n,r=null,s=0,a=0){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=wt(i,c),d=Lt(u,l);return Yt(i,o,Ks),n(h,d,!1,a,s+i/8,Ks)}else{let C=function(w){let{uint16Array:I,uint32Array:P}=Mt,F=w*2;for(;!_t(F,I);)w=Rt(w),F=w*2;return wt(w,P)},R=function(w){let{uint16Array:I,uint32Array:P}=Mt,F=w*2;for(;!_t(F,I);)w=Dt(w,P),F=w*2;return wt(w,P)+Lt(F,I)},h=Rt(i),d=Dt(i,c),g=h,v=d,p,m,x,A;if(r&&(x=Ks,A=fl,Yt(g,o,x),Yt(v,o,A),p=r(x),m=r(A),m<p)){g=d,v=h;let w=p;p=m,m=w,x=A}x||(x=Ks,Yt(g,o,x));let _=_t(g*2,l),M=t(x,_,p,a+1,s+g/8),E;if(M===2){let w=C(g),P=R(g)-w;E=n(w,P,!0,a+1,s+g/8,x)}else E=M&&Ig(g,e,t,n,r,s,a+1);if(E)return!0;A=fl,Yt(v,o,A);let T=_t(v*2,l),y=t(A,T,m,a+1,s+v/8),S;if(y===2){let w=C(v),P=R(v)-w;S=n(w,P,!0,a+1,s+v/8,A)}else S=y&&Ig(v,e,t,n,r,s,a+1);return!!S}}var nu=new Mt.constructor,ud=new Mt.constructor,Js=new Zs(()=>new Zt),dl=new Zt,pl=new Zt,Bg=new Zt,Ug=new Zt,Lg=!1;function by(i,e,t,n){if(Lg)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Lg=!0;let r=i._roots,s=e._roots,a,o=0,l=0,c=new je().copy(t).invert();for(let u=0,f=r.length;u<f;u++){nu.setBuffer(r[u]),l=0;let h=Js.getPrimitive();Yt(0,nu.float32Array,h),h.applyMatrix4(c);for(let d=0,g=s.length;d<g&&(ud.setBuffer(s[d]),a=Sr(0,0,t,c,n,o,l,0,0,h),ud.clearBuffer(),l+=s[d].byteLength/32,!a);d++);if(Js.releasePrimitive(h),nu.clearBuffer(),o+=r[u].byteLength/32,a)break}return Lg=!1,a}function Sr(i,e,t,n,r,s=0,a=0,o=0,l=0,c=null,u=!1){let f,h;u?(f=ud,h=nu):(f=nu,h=ud);let d=f.float32Array,g=f.uint32Array,v=f.uint16Array,p=h.float32Array,m=h.uint32Array,x=h.uint16Array,A=i*2,_=e*2,M=_t(A,v),E=_t(_,x),T=!1;if(E&&M)u?T=r(wt(e,m),Lt(e*2,x),wt(i,g),Lt(i*2,v),l,a+e/8,o,s+i/8):T=r(wt(i,g),Lt(i*2,v),wt(e,m),Lt(e*2,x),o,s+i/8,l,a+e/8);else if(E){let y=Js.getPrimitive();Yt(e,p,y),y.applyMatrix4(t);let S=Rt(i),C=Dt(i,g);Yt(S,d,dl),Yt(C,d,pl);let R=y.intersectsBox(dl),w=y.intersectsBox(pl);T=R&&Sr(e,S,n,t,r,a,s,l,o+1,y,!u)||w&&Sr(e,C,n,t,r,a,s,l,o+1,y,!u),Js.releasePrimitive(y)}else{let y=Rt(e),S=Dt(e,m);Yt(y,p,Bg),Yt(S,p,Ug);let C=c.intersectsBox(Bg),R=c.intersectsBox(Ug);if(C&&R)T=Sr(i,y,t,n,r,s,a,o,l+1,c,u)||Sr(i,S,t,n,r,s,a,o,l+1,c,u);else if(C)if(M)T=Sr(i,y,t,n,r,s,a,o,l+1,c,u);else{let w=Js.getPrimitive();w.copy(Bg).applyMatrix4(t);let I=Rt(i),P=Dt(i,g);Yt(I,d,dl),Yt(P,d,pl);let F=w.intersectsBox(dl),N=w.intersectsBox(pl);T=F&&Sr(y,I,n,t,r,a,s,l,o+1,w,!u)||N&&Sr(y,P,n,t,r,a,s,l,o+1,w,!u),Js.releasePrimitive(w)}else if(R)if(M)T=Sr(i,S,t,n,r,s,a,o,l+1,c,u);else{let w=Js.getPrimitive();w.copy(Ug).applyMatrix4(t);let I=Rt(i),P=Dt(i,g);Yt(I,d,dl),Yt(P,d,pl);let F=w.intersectsBox(dl),N=w.intersectsBox(pl);T=F&&Sr(S,I,n,t,r,a,s,l,o+1,w,!u)||N&&Sr(S,P,n,t,r,a,s,l,o+1,w,!u),Js.releasePrimitive(w)}}return T}var hd=new class{constructor(){let i=null,e=null,t=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,a)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=i=s._roots[a],this.uint16Array=t=new Uint16Array(i),this.uint32Array=e=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=s=>{let a=s*2;for(;!_t(a,t);)s=Rt(s),a=s*2;return wt(s,e)},this.getRangeEnd=s=>{let a=s*2;for(;!_t(a,t);)s=Dt(s,e),a=s*2;return wt(s,e)+Lt(a,t)};let r=(s,a,o)=>{let l=a*2,c=_t(l,t);if(!s(o,c,a)&&!c){let f=Rt(a),h=Dt(a,e);r(s,f,o+1),r(s,h,o+1)}};this.traverseBuffer=s=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{r(s,0,0)}finally{n=!1}},this.traverse=s=>{this.traverseBuffer((a,o,l)=>{if(o){let c=l*2,u=e[l+6],f=t[c+14];return s(a,o,new Float32Array(i,l*4,6),u,f)}else{let c=qs(l,e);return s(a,o,new Float32Array(i,l*4,6),c)}})}}};var wy=new Zt,ml=new Float32Array(6),fd=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...id,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),Ty(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0;for(let f=e,h=e+t;f<h;f++){this.writePrimitiveBounds(f,ml,0);let[d,g,v,p,m,x]=ml;d<s&&(s=d),p>l&&(l=p),g<a&&(a=g),m>c&&(c=m),v<o&&(o=v),x>u&&(u=x)}return n[r+0]=s,n[r+1]=a,n[r+2]=o,n[r+3]=l,n[r+4]=c,n[r+5]=u,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let s=e,a=e+t;s<a;s++){this.writePrimitiveBounds(s,ml,0);let[o,l,c,u,f,h]=ml,d=(o+u)/2,g=(l+f)/2,v=(c+h)/2,p=(u-o)/2,m=(f-l)/2,x=(h-c)/2,A=(s-r)*6;n[A+0]=d,n[A+1]=p+(Math.abs(d)+p)*ll,n[A+2]=g,n[A+3]=m+(Math.abs(g)+m)*ll,n[A+4]=v,n[A+5]=x+(Math.abs(v)+x)*ll}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t)for(let n=0,r=t.length;n<r;n++)t[n]+=e;else{let n=this._roots;for(let r=0;r<n.length;r++){let s=n[r],a=new Uint32Array(s),o=new Uint16Array(s),l=s.byteLength/32;for(let c=0;c<l;c++){let u=8*c,f=2*u;_t(f,o)&&(a[u+6]+=e)}}}}traverse(e,t=0){hd.setBVH(this,t),hd.traverse(e),hd.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let r=e[t],s=new Uint32Array(r),a=new Uint16Array(r),o=new Float32Array(r),l=r.byteLength/32;for(let c=l-1;c>=0;c--){let u=c*8,f=u*2;if(_t(f,a)){let d=wt(u,s),g=Lt(f,a);this.writePrimitiveRangeBounds(d,g,ml,0),o.set(ml,u)}else{let d=Rt(u),g=Dt(u,s);for(let v=0;v<3;v++){let p=o[d+v],m=o[d+v+3],x=o[g+v],A=o[g+v+3];o[u+v]=p<x?p:x,o[u+v+3]=m>A?m:A}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{Yt(0,new Float32Array(n),wy),e.union(wy)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:s,scratchPrimitive:a,iterate:o}=e;if(r&&s){let f=r;r=(h,d,g,v,p)=>f(h,d,g,v,p)?!0:o(h,d,this,s,g,v,a)}else r||(s?r=(f,h,d,g)=>o(f,h,this,s,d,g,a):r=(f,h,d)=>d);let l=!1,c=0,u=this._roots;for(let f=0,h=u.length;f<h;f++){let d=u[f];if(l=Ey(this,f,n,r,t,c),l)break;c+=d.byteLength/32}return l}bvhcast(e,t,n){let{intersectsRanges:r}=n;return by(this,e,t,r)}};function Cy(){return typeof SharedArrayBuffer<"u"}function iu(i){return i.index?i.index.count:i.attributes.position.count}function js(i){return iu(i)/3}function Fg(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function Ry(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=Fg(t,n);i.setIndex(new vt(r,1));for(let s=0;s<t;s++)r[s]=s}}function tR(i,e,t){let n=iu(i)/t,r=e||i.drawRange,s=r.start/t,a=(r.start+r.count)/t,o=Math.max(0,s),l=Math.min(n,a)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function nR(i,e){return i.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Ng(i,e,t){let n=tR(i,e,t),r=nR(i,t);if(!r.length)return[n];let s=[],a=n.offset,o=n.offset+n.count,l=iu(i)/t,c=[];for(let h of r){let{offset:d,count:g}=h,v=d,p=isFinite(g)?g:l-d,m=d+p;v<o&&m>a&&(c.push({pos:Math.max(a,v),isStart:!0}),c.push({pos:Math.min(o,m),isStart:!1}))}c.sort((h,d)=>h.pos!==d.pos?h.pos-d.pos:h.type==="end"?-1:1);let u=0,f=null;for(let h of c){let d=h.pos;u!==0&&d!==f&&s.push({offset:f,count:d-f}),u+=h.isStart?1:-1,f=d}return s}function iR(i,e){let t=i[i.length-1],n=t.offset+t.count>2**16,r=i.reduce((c,u)=>c+u.count,0),s=n?4:2,a=e?new SharedArrayBuffer(r*s):new ArrayBuffer(r*s),o=n?new Uint32Array(a):new Uint16Array(a),l=0;for(let c=0;c<i.length;c++){let{offset:u,count:f}=i[c];for(let h=0;h<f;h++)o[l+h]=u+h;l+=f}return o}var dd=class extends fd{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!Cy())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...id,...t},t[$c]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Ng(t,e.range,n),s=iR(r,e.useSharedArrayBuffer);this._indirectBuffer=s}else Ry(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new Zt))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Ng(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var Qi=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let s=0,a=e.length;s<a;s++){let l=e[s][t];n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let s=0,a=t.length;s<a;s++){let o=t[s],l=e.dot(o);n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Qi.prototype.setFromBox=function(){let i=new L;return function(t,n){let r=n.min,s=n.max,a=1/0,o=-1/0;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){i.x=r.x*l+s.x*(1-l),i.y=r.y*c+s.y*(1-c),i.z=r.z*u+s.z*(1-u);let f=t.dot(i);a=Math.min(f,a),o=Math.max(f,o)}this.min=a,this.max=o}}();var rR=function(){let i=new L,e=new L,t=new L;return function(r,s,a){let o=r.start,l=i,c=s.start,u=e;t.subVectors(o,c),i.subVectors(r.end,r.start),e.subVectors(s.end,s.start);let f=t.dot(u),h=u.dot(l),d=u.dot(u),g=t.dot(l),p=l.dot(l)*d-h*h,m,x;p!==0?m=(f*h-g*d)/p:m=0,x=(f+m*h)/d,a.x=m,a.y=x}}(),ru=function(){let i=new be,e=new L,t=new L;return function(r,s,a,o){rR(r,s,i);let l=i.x,c=i.y;if(l>=0&&l<=1&&c>=0&&c<=1){r.at(l,a),s.at(c,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else{let u;l<0?u=r.start:u=r.end;let f;c<0?f=s.start:f=s.end;let h=e,d=t;if(r.closestPointToPoint(f,!0,e),s.closestPointToPoint(u,!0,t),h.distanceToSquared(f)<=d.distanceToSquared(u)){a.copy(h),o.copy(f);return}else{a.copy(u),o.copy(d);return}}}}(),Dy=function(){let i=new L,e=new L,t=new Ri,n=new xi;return function(s,a){let{radius:o,center:l}=s,{a:c,b:u,c:f}=a;if(n.start=c,n.end=u,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o||(n.start=c,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o)||(n.start=u,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o))return!0;let v=a.getPlane(t);if(Math.abs(v.distanceToPoint(l))<=o){let m=v.projectPoint(l,e);if(a.containsPoint(m))return!0}return!1}}();var sR=["x","y","z"],cs=1e-15,Py=cs*cs;function cr(i){return Math.abs(i)<cs}var Xn=class extends Gn{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new L),this.satBounds=new Array(4).fill().map(()=>new Qi),this.points=[this.a,this.b,this.c],this.plane=new Ri,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new xi,this.needsUpdate=!0}intersectsSphere(e){return Dy(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,s=this.satAxes,a=this.satBounds,o=s[0],l=a[0];this.getNormal(o),l.setFromPoints(o,r);let c=s[1],u=a[1];c.subVectors(e,t),u.setFromPoints(c,r);let f=s[2],h=a[2];f.subVectors(t,n),h.setFromPoints(f,r);let d=s[3],g=a[3];d.subVectors(n,e),g.setFromPoints(d,r);let v=c.length(),p=f.length(),m=d.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,v<cs?p<cs||m<cs?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):p<cs?m<cs?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):m<cs&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Xn.prototype.closestPointToSegment=function(){let i=new L,e=new L,t=new xi;return function(r,s=null,a=null){let{start:o,end:l}=r,c=this.points,u,f=1/0;for(let h=0;h<3;h++){let d=(h+1)%3;t.start.copy(c[h]),t.end.copy(c[d]),ru(t,r,i,e),u=i.distanceToSquared(e),u<f&&(f=u,s&&s.copy(i),a&&a.copy(e))}return this.closestPointToPoint(o,i),u=o.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(o)),this.closestPointToPoint(l,i),u=l.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(l)),Math.sqrt(f)}}();Xn.prototype.intersectsTriangle=function(){let i=new Xn,e=new Qi,t=new Qi,n=new L,r=new L,s=new L,a=new L,o=new xi,l=new xi,c=new L,u=new be,f=new be;function h(A,_,M,E){let T=n;!A.isDegenerateIntoPoint&&!A.isDegenerateIntoSegment?T.copy(A.plane.normal):T.copy(_.plane.normal);let y=A.satBounds,S=A.satAxes;for(let w=1;w<4;w++){let I=y[w],P=S[w];if(e.setFromPoints(P,_.points),I.isSeparated(e)||(a.copy(T).cross(P),e.setFromPoints(a,A.points),t.setFromPoints(a,_.points),e.isSeparated(t)))return!1}let C=_.satBounds,R=_.satAxes;for(let w=1;w<4;w++){let I=C[w],P=R[w];if(e.setFromPoints(P,A.points),I.isSeparated(e)||(a.crossVectors(T,P),e.setFromPoints(a,A.points),t.setFromPoints(a,_.points),e.isSeparated(t)))return!1}return M&&(E||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),M.start.set(0,0,0),M.end.set(0,0,0)),!0}function d(A,_,M,E,T,y,S,C,R,w,I){let P=S/(S-C);w.x=E+(T-E)*P,I.start.subVectors(_,A).multiplyScalar(P).add(A),P=S/(S-R),w.y=E+(y-E)*P,I.end.subVectors(M,A).multiplyScalar(P).add(A)}function g(A,_,M,E,T,y,S,C,R,w,I){if(T>0)d(A.c,A.a,A.b,E,_,M,R,S,C,w,I);else if(y>0)d(A.b,A.a,A.c,M,_,E,C,S,R,w,I);else if(C*R>0||S!=0)d(A.a,A.b,A.c,_,M,E,S,C,R,w,I);else if(C!=0)d(A.b,A.a,A.c,M,_,E,C,S,R,w,I);else if(R!=0)d(A.c,A.a,A.b,E,_,M,R,S,C,w,I);else return!0;return!1}function v(A,_,M,E){let T=_.degenerateSegment,y=A.plane.distanceToPoint(T.start),S=A.plane.distanceToPoint(T.end);return cr(y)?cr(S)?h(A,_,M,E):(M&&(M.start.copy(T.start),M.end.copy(T.start)),A.containsPoint(T.start)):cr(S)?(M&&(M.start.copy(T.end),M.end.copy(T.end)),A.containsPoint(T.end)):A.plane.intersectLine(T,n)!=null?(M&&(M.start.copy(n),M.end.copy(n)),A.containsPoint(n)):!1}function p(A,_,M){let E=_.a;return cr(A.plane.distanceToPoint(E))&&A.containsPoint(E)?(M&&(M.start.copy(E),M.end.copy(E)),!0):!1}function m(A,_,M){let E=A.degenerateSegment,T=_.a;return E.closestPointToPoint(T,!0,n),T.distanceToSquared(n)<Py?(M&&(M.start.copy(T),M.end.copy(T)),!0):!1}function x(A,_,M,E){if(A.isDegenerateIntoSegment)if(_.isDegenerateIntoSegment){let T=A.degenerateSegment,y=_.degenerateSegment,S=r,C=s;T.delta(S),y.delta(C);let R=n.subVectors(y.start,T.start),w=S.x*C.y-S.y*C.x;if(cr(w))return!1;let I=(R.x*C.y-R.y*C.x)/w,P=-(S.x*R.y-S.y*R.x)/w;if(I<0||I>1||P<0||P>1)return!1;let F=T.start.z+S.z*I,N=y.start.z+C.z*P;return cr(F-N)?(M&&(M.start.copy(T.start).addScaledVector(S,I),M.end.copy(T.start).addScaledVector(S,I)),!0):!1}else return _.isDegenerateIntoPoint?m(A,_,M):v(_,A,M,E);else{if(A.isDegenerateIntoPoint)return _.isDegenerateIntoPoint?_.a.distanceToSquared(A.a)<Py?(M&&(M.start.copy(A.a),M.end.copy(A.a)),!0):!1:_.isDegenerateIntoSegment?m(_,A,M):p(_,A,M);if(_.isDegenerateIntoPoint)return p(A,_,M);if(_.isDegenerateIntoSegment)return v(A,_,M,E)}}return function(_,M=null,E=!1){this.needsUpdate&&this.update(),_.isExtendedTriangle?_.needsUpdate&&_.update():(i.copy(_),i.update(),_=i);let T=x(this,_,M,E);if(T!==void 0)return T;let y=this.plane,S=_.plane,C=S.distanceToPoint(this.a),R=S.distanceToPoint(this.b),w=S.distanceToPoint(this.c);cr(C)&&(C=0),cr(R)&&(R=0),cr(w)&&(w=0);let I=C*R,P=C*w;if(I>0&&P>0)return!1;let F=y.distanceToPoint(_.a),N=y.distanceToPoint(_.b),O=y.distanceToPoint(_.c);cr(F)&&(F=0),cr(N)&&(N=0),cr(O)&&(O=0);let K=F*N,X=F*O;if(K>0&&X>0)return!1;r.copy(y.normal),s.copy(S.normal);let B=r.cross(s),re=0,se=Math.abs(B.x),Te=Math.abs(B.y);Te>se&&(se=Te,re=1),Math.abs(B.z)>se&&(re=2);let Y=sR[re],V=this.a[Y],Z=this.b[Y],ie=this.c[Y],ne=_.a[Y],he=_.b[Y],pe=_.c[Y];if(g(this,V,Z,ie,I,P,C,R,w,u,o))return h(this,_,M,E);if(g(_,ne,he,pe,K,X,F,N,O,f,l))return h(this,_,M,E);if(u.y<u.x){let Re=u.y;u.y=u.x,u.x=Re,c.copy(o.start),o.start.copy(o.end),o.end.copy(c)}if(f.y<f.x){let Re=f.y;f.y=f.x,f.x=Re,c.copy(l.start),l.start.copy(l.end),l.end.copy(c)}return u.y<f.x||f.y<u.x?!1:(M&&(f.x>u.x?M.start.copy(l.start):M.start.copy(o.start),f.y<u.y?M.end.copy(l.end):M.end.copy(o.end)),!0)}}();Xn.prototype.distanceToPoint=function(){let i=new L;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();Xn.prototype.distanceToTriangle=function(){let i=new L,e=new L,t=["a","b","c"],n=new xi,r=new xi;return function(a,o=null,l=null){let c=o||l?n:null;if(this.intersectsTriangle(a,c,!0))return(o||l)&&(o&&c.getCenter(o),l&&c.getCenter(l)),0;let u=1/0;for(let f=0;f<3;f++){let h,d=t[f],g=a[d];this.closestPointToPoint(g,i),h=g.distanceToSquared(i),h<u&&(u=h,o&&o.copy(i),l&&l.copy(g));let v=this[d];a.closestPointToPoint(v,i),h=v.distanceToSquared(i),h<u&&(u=h,o&&o.copy(v),l&&l.copy(i))}for(let f=0;f<3;f++){let h=t[f],d=t[(f+1)%3];n.set(this[h],this[d]);for(let g=0;g<3;g++){let v=t[g],p=t[(g+1)%3];r.set(a[v],a[p]),ru(n,r,i,e);let m=i.distanceToSquared(e);m<u&&(u=m,o&&o.copy(i),l&&l.copy(e))}}return Math.sqrt(u)}}();var hn=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new L,this.max=new L,this.matrix=new je,this.invMatrix=new je,this.points=new Array(8).fill().map(()=>new L),this.satAxes=new Array(3).fill().map(()=>new L),this.satBounds=new Array(3).fill().map(()=>new Qi),this.alignedSatBounds=new Array(3).fill().map(()=>new Qi),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};hn.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){let h=1*c|2*u|4*f,d=r[h];d.x=c?n.x:t.x,d.y=u?n.y:t.y,d.z=f?n.z:t.z,d.applyMatrix4(e)}let s=this.satBounds,a=this.satAxes,o=r[0];for(let c=0;c<3;c++){let u=a[c],f=s[c],h=1<<c,d=r[h];u.subVectors(o,d),f.setFromPoints(u,r)}let l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();hn.prototype.intersectsBox=function(){let i=new Qi;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,s=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(i.min=n.x,i.max=r.x,o[0].isSeparated(i)||(i.min=n.y,i.max=r.y,o[1].isSeparated(i))||(i.min=n.z,i.max=r.z,o[2].isSeparated(i)))return!1;for(let l=0;l<3;l++){let c=a[l],u=s[l];if(i.setFromBox(c,t),u.isSeparated(i))return!1}return!0}}();hn.prototype.intersectsTriangle=function(){let i=new Xn,e=new Array(3),t=new Qi,n=new Qi,r=new L;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(i.copy(a),i.update(),a=i);let o=this.satBounds,l=this.satAxes;e[0]=a.a,e[1]=a.b,e[2]=a.c;for(let h=0;h<3;h++){let d=o[h],g=l[h];if(t.setFromPoints(g,e),d.isSeparated(t))return!1}let c=a.satBounds,u=a.satAxes,f=this.points;for(let h=0;h<3;h++){let d=c[h],g=u[h];if(t.setFromPoints(g,f),d.isSeparated(t))return!1}for(let h=0;h<3;h++){let d=l[h];for(let g=0;g<4;g++){let v=u[g];if(r.crossVectors(d,v),t.setFromPoints(r,e),n.setFromPoints(r,f),t.isSeparated(n))return!1}}return!0}}();hn.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();hn.prototype.distanceToPoint=function(){let i=new L;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();hn.prototype.distanceToBox=function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new xi),t=new Array(12).fill().map(()=>new xi),n=new L,r=new L;return function(a,o=0,l=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(l||c)&&(a.getCenter(r),this.closestPointToPoint(r,n),a.closestPointToPoint(n,r),l&&l.copy(n),c&&c.copy(r)),0;let u=o*o,f=a.min,h=a.max,d=this.points,g=1/0;for(let p=0;p<8;p++){let m=d[p];r.copy(m).clamp(f,h);let x=m.distanceToSquared(r);if(x<g&&(g=x,l&&l.copy(m),c&&c.copy(r),x<u))return Math.sqrt(x)}let v=0;for(let p=0;p<3;p++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){let A=(p+1)%3,_=(p+2)%3,M=m<<A|x<<_,E=1<<p|m<<A|x<<_,T=d[M],y=d[E];e[v].set(T,y);let C=i[p],R=i[A],w=i[_],I=t[v],P=I.start,F=I.end;P[C]=f[C],P[R]=m?f[R]:h[R],P[w]=x?f[w]:h[R],F[C]=h[C],F[R]=m?f[R]:h[R],F[w]=x?f[w]:h[R],v++}for(let p=0;p<=1;p++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){r.x=p?h.x:f.x,r.y=m?h.y:f.y,r.z=x?h.z:f.z,this.closestPointToPoint(r,n);let A=r.distanceToSquared(n);if(A<g&&(g=A,l&&l.copy(n),c&&c.copy(r),A<u))return Math.sqrt(A)}for(let p=0;p<12;p++){let m=e[p];for(let x=0;x<12;x++){let A=t[x];ru(m,A,n,r);let _=n.distanceToSquared(r);if(_<g&&(g=_,l&&l.copy(n),c&&c.copy(r),_<u))return Math.sqrt(_)}}return Math.sqrt(g)}}();var Og=class extends Zs{constructor(){super(()=>new Xn)}},Mi=new Og;var su=new L,kg=new L;function Iy(i,e,t={},n=0,r=1/0){let s=n*n,a=r*r,o=1/0,l=null;if(i.shapecast({boundsTraverseOrder:u=>(su.copy(e).clamp(u.min,u.max),su.distanceToSquared(e)),intersectsBounds:(u,f,h)=>h<o&&h<a,intersectsTriangle:(u,f)=>{u.closestPointToPoint(e,su);let h=e.distanceToSquared(su);return h<o&&(kg.copy(su),o=h,l=f),h<s}}),o===1/0)return null;let c=Math.sqrt(o);return t.point?t.point.copy(kg):t.point=kg.clone(),t.distance=c,t.faceIndex=l,t}var pd=parseInt(Wn)>=169,aR=parseInt(Wn)<=161,Va=new L,Wa=new L,Xa=new L,md=new be,gd=new be,vd=new be,By=new L,Uy=new L,Ly=new L,au=new L;function oR(i,e,t,n,r,s,a,o){let l;if(s===tn?l=i.intersectTriangle(n,t,e,!0,r):l=i.intersectTriangle(e,t,n,s!==mn,r),l===null)return null;let c=i.origin.distanceTo(r);return c<a||c>o?null:{distance:c,point:r.clone()}}function Fy(i,e,t,n,r,s,a,o,l,c,u){Va.fromBufferAttribute(e,s),Wa.fromBufferAttribute(e,a),Xa.fromBufferAttribute(e,o);let f=oR(i,Va,Wa,Xa,au,l,c,u);if(f){if(n){md.fromBufferAttribute(n,s),gd.fromBufferAttribute(n,a),vd.fromBufferAttribute(n,o),f.uv=new be;let d=Gn.getInterpolation(au,Va,Wa,Xa,md,gd,vd,f.uv);pd||(f.uv=d)}if(r){md.fromBufferAttribute(r,s),gd.fromBufferAttribute(r,a),vd.fromBufferAttribute(r,o),f.uv1=new be;let d=Gn.getInterpolation(au,Va,Wa,Xa,md,gd,vd,f.uv1);pd||(f.uv1=d),aR&&(f.uv2=f.uv1)}if(t){By.fromBufferAttribute(t,s),Uy.fromBufferAttribute(t,a),Ly.fromBufferAttribute(t,o),f.normal=new L;let d=Gn.getInterpolation(au,Va,Wa,Xa,By,Uy,Ly,f.normal);f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1),pd||(f.normal=d)}let h={a:s,b:a,c:o,normal:new L,materialIndex:0};if(Gn.getNormal(Va,Wa,Xa,h.normal),f.face=h,f.faceIndex=s,pd){let d=new L;Gn.getBarycoord(au,Va,Wa,Xa,d),f.barycoord=d}}return f}function Ny(i){return i&&i.isMaterial?i.side:i}function gl(i,e,t,n,r,s,a){let o=n*3,l=o+0,c=o+1,u=o+2,{index:f,groups:h}=i;i.index&&(l=f.getX(l),c=f.getX(c),u=f.getX(u));let{position:d,normal:g,uv:v,uv1:p}=i.attributes;if(Array.isArray(e)){let m=n*3;for(let x=0,A=h.length;x<A;x++){let{start:_,count:M,materialIndex:E}=h[x];if(m>=_&&m<_+M){let T=Ny(e[E]),y=Fy(t,d,g,v,p,l,c,u,T,s,a);if(y)if(y.faceIndex=n,y.face.materialIndex=E,r)r.push(y);else return y}}}else{let m=Ny(e),x=Fy(t,d,g,v,p,l,c,u,m,s,a);if(x)if(x.faceIndex=n,x.face.materialIndex=0,r)r.push(x);else return x}return null}function qt(i,e,t,n){let r=i.a,s=i.b,a=i.c,o=e,l=e+1,c=e+2;t&&(o=t.getX(o),l=t.getX(l),c=t.getX(c)),r.x=n.getX(o),r.y=n.getY(o),r.z=n.getZ(o),s.x=n.getX(l),s.y=n.getY(l),s.z=n.getZ(l),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c)}function Oy(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++)gl(l,e,t,u,s,a,o)}function ky(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=gl(o,e,t,f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function zy(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=u,qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function Hy(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,g=!1){let v=h*2;if(_t(v,o)){let p=wt(h,a),m=Lt(v,o),x=1/0,A=1/0,_=1/0,M=-1/0,E=-1/0,T=-1/0;for(let y=3*p,S=3*(p+m);y<S;y++){let C=n[y],R=r.getX(C),w=r.getY(C),I=r.getZ(C);R<x&&(x=R),R>M&&(M=R),w<A&&(A=w),w>E&&(E=w),I<_&&(_=I),I>T&&(T=I)}return l[h+0]!==x||l[h+1]!==A||l[h+2]!==_||l[h+3]!==M||l[h+4]!==E||l[h+5]!==T?(l[h+0]=x,l[h+1]=A,l[h+2]=_,l[h+3]=M,l[h+4]=E,l[h+5]=T,!0):!1}else{let p=Rt(h),m=Dt(h,a),x=g,A=!1,_=!1;if(e){if(!x){let C=p/8+d/32,R=m/8+d/32;A=e.has(C),_=e.has(R),x=!A&&!_}}else A=!0,_=!0;let M=x||A,E=x||_,T=!1;M&&(T=f(p,d,x));let y=!1;E&&(y=f(m,d,x));let S=T||y;if(S)for(let C=0;C<3;C++){let R=p+C,w=m+C,I=l[R],P=l[R+3],F=l[w],N=l[w+3];l[h+C]=I<F?I:F,l[h+C+3]=P>N?P:N}return S}}}function ur(i,e,t,n,r){let s,a,o,l,c,u,f=1/t.direction.x,h=1/t.direction.y,d=1/t.direction.z,g=t.origin.x,v=t.origin.y,p=t.origin.z,m=e[i],x=e[i+3],A=e[i+1],_=e[i+3+1],M=e[i+2],E=e[i+3+2];return f>=0?(s=(m-g)*f,a=(x-g)*f):(s=(x-g)*f,a=(m-g)*f),h>=0?(o=(A-v)*h,l=(_-v)*h):(o=(_-v)*h,l=(A-v)*h),s>l||o>a||((o>s||isNaN(s))&&(s=o),(l<a||isNaN(a))&&(a=l),d>=0?(c=(M-p)*d,u=(E-p)*d):(c=(E-p)*d,u=(M-p)*d),s>u||c>a)?!1:((c>s||s!==s)&&(s=c),(u<a||a!==a)&&(a=u),s<=r&&a>=n)}function Gy(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++){let h=c?c[u]:u;gl(l,e,t,h,s,a,o)}}function Vy(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=gl(o,e,t,l?l[f]:f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function Wy(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=t.resolveTriangleIndex(u),qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function Xy(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),zg(0,i,t,n,r,s,a),Mt.clearBuffer()}function zg(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=wt(i,c),d=Lt(u,l);Oy(e,t,n,h,d,r,s,a)}else{let h=Rt(i);ur(h,o,n,s,a)&&zg(h,e,t,n,r,s,a);let d=Dt(i,c);ur(d,o,n,s,a)&&zg(d,e,t,n,r,s,a)}}var lR=["x","y","z"];function Yy(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=Hg(0,i,t,n,r,s);return Mt.clearBuffer(),a}function Hg(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=wt(i,l),h=Lt(c,o);return ky(e,t,n,f,h,r,s)}else{let f=qs(i,l),h=lR[f],g=n.direction[h]>=0,v,p;g?(v=Rt(i),p=Dt(i,l)):(v=Dt(i,l),p=Rt(i));let x=ur(v,a,n,r,s)?Hg(v,e,t,n,r,s):null;if(x){let M=x.point[h];if(g?M<=a[p+f]:M>=a[p+f+3])return x}let _=ur(p,a,n,r,s)?Hg(p,e,t,n,r,s):null;return x&&_?x.distance<=_.distance?x:_:x||_||null}}var xd=new Zt,vl=new Xn,xl=new Xn,ou=new je,qy=new hn,_d=new hn;function Qy(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=Gg(0,i,t,n);return Mt.clearBuffer(),r}function Gg(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),qy.set(t.boundingBox.min,t.boundingBox.max,n),r=qy),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,g=t.attributes.position,v=wt(i,o),p=Lt(l,a);if(ou.copy(n).invert(),t.boundsTree)return Yt(i,s,_d),_d.matrix.copy(ou),_d.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>_d.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let A=v*3,_=(p+v)*3;A<_;A+=3)if(qt(xl,A,f,h),xl.needsUpdate=!0,x.intersectsTriangle(xl))return!0;return!1}});{let m=js(t);for(let x=v*3,A=(p+v)*3;x<A;x+=3){qt(vl,x,f,h),vl.a.applyMatrix4(ou),vl.b.applyMatrix4(ou),vl.c.applyMatrix4(ou),vl.needsUpdate=!0;for(let _=0,M=m*3;_<M;_+=3)if(qt(xl,_,d,g),xl.needsUpdate=!0,vl.intersectsTriangle(xl))return!0}}}else{let u=Rt(i),f=Dt(i,o);return Yt(u,s,xd),!!(r.intersectsBox(xd)&&Gg(u,e,t,n,r)||(Yt(f,s,xd),r.intersectsBox(xd)&&Gg(f,e,t,n,r)))}}var yd=new je,Vg=new hn,lu=new hn,cR=new L,uR=new L,hR=new L,fR=new L;function Zy(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),Vg.set(e.boundingBox.min,e.boundingBox.max,t),Vg.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=Mi.getPrimitive(),d=Mi.getPrimitive(),g=cR,v=uR,p=null,m=null;r&&(p=hR,m=fR);let x=1/0,A=null,_=null;return yd.copy(t).invert(),lu.matrix.copy(yd),i.shapecast({boundsTraverseOrder:M=>Vg.distanceToBox(M),intersectsBounds:(M,E,T)=>T<x&&T<a?(E&&(lu.min.copy(M.min),lu.max.copy(M.max),lu.needsUpdate=!0),!0):!1,intersectsRange:(M,E)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:y=>lu.distanceToBox(y),intersectsBounds:(y,S,C)=>C<x&&C<a,intersectsRange:(y,S)=>{for(let C=y,R=y+S;C<R;C++){qt(d,3*C,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let w=M,I=M+E;w<I;w++){qt(h,3*w,c,l),h.needsUpdate=!0;let P=h.distanceToTriangle(d,g,p);if(P<x&&(v.copy(g),m&&m.copy(p),x=P,A=w,_=C),P<s)return!0}}}});{let T=js(e);for(let y=0,S=T;y<S;y++){qt(d,3*y,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=M,R=M+E;C<R;C++){qt(h,3*C,c,l),h.needsUpdate=!0;let w=h.distanceToTriangle(d,g,p);if(w<x&&(v.copy(g),m&&m.copy(p),x=w,A=C,_=y),w<s)return!0}}}}}),Mi.releasePrimitive(h),Mi.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=A,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(yd),v.applyMatrix4(yd),r.distance=v.sub(r.point).length(),r.faceIndex=_),n)}function Ky(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,g=!1){let v=h*2;if(_t(v,o)){let p=wt(h,a),m=Lt(v,o),x=1/0,A=1/0,_=1/0,M=-1/0,E=-1/0,T=-1/0;for(let y=p,S=p+m;y<S;y++){let C=3*i.resolveTriangleIndex(y);for(let R=0;R<3;R++){let w=C+R;w=n?n[w]:w;let I=r.getX(w),P=r.getY(w),F=r.getZ(w);I<x&&(x=I),I>M&&(M=I),P<A&&(A=P),P>E&&(E=P),F<_&&(_=F),F>T&&(T=F)}}return l[h+0]!==x||l[h+1]!==A||l[h+2]!==_||l[h+3]!==M||l[h+4]!==E||l[h+5]!==T?(l[h+0]=x,l[h+1]=A,l[h+2]=_,l[h+3]=M,l[h+4]=E,l[h+5]=T,!0):!1}else{let p=Rt(h),m=Dt(h,a),x=g,A=!1,_=!1;if(e){if(!x){let C=p/8+d/32,R=m/8+d/32;A=e.has(C),_=e.has(R),x=!A&&!_}}else A=!0,_=!0;let M=x||A,E=x||_,T=!1;M&&(T=f(p,d,x));let y=!1;E&&(y=f(m,d,x));let S=T||y;if(S)for(let C=0;C<3;C++){let R=p+C,w=m+C,I=l[R],P=l[R+3],F=l[w],N=l[w+3];l[h+C]=I<F?I:F,l[h+C+3]=P>N?P:N}return S}}}function Jy(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),Wg(0,i,t,n,r,s,a),Mt.clearBuffer()}function Wg(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=wt(i,c),d=Lt(u,l);Gy(e,t,n,h,d,r,s,a)}else{let h=Rt(i);ur(h,o,n,s,a)&&Wg(h,e,t,n,r,s,a);let d=Dt(i,c);ur(d,o,n,s,a)&&Wg(d,e,t,n,r,s,a)}}var dR=["x","y","z"];function jy(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=Xg(0,i,t,n,r,s);return Mt.clearBuffer(),a}function Xg(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=wt(i,l),h=Lt(c,o);return Vy(e,t,n,f,h,r,s)}else{let f=qs(i,l),h=dR[f],g=n.direction[h]>=0,v,p;g?(v=Rt(i),p=Dt(i,l)):(v=Dt(i,l),p=Rt(i));let x=ur(v,a,n,r,s)?Xg(v,e,t,n,r,s):null;if(x){let M=x.point[h];if(g?M<=a[p+f]:M>=a[p+f+3])return x}let _=ur(p,a,n,r,s)?Xg(p,e,t,n,r,s):null;return x&&_?x.distance<=_.distance?x:_:x||_||null}}var Ad=new Zt,_l=new Xn,yl=new Xn,cu=new je,$y=new hn,Sd=new hn;function eA(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=Yg(0,i,t,n);return Mt.clearBuffer(),r}function Yg(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),$y.set(t.boundingBox.min,t.boundingBox.max,n),r=$y),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,g=t.attributes.position,v=wt(i,o),p=Lt(l,a);if(cu.copy(n).invert(),t.boundsTree)return Yt(i,s,Sd),Sd.matrix.copy(cu),Sd.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Sd.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let A=v,_=p+v;A<_;A++)if(qt(yl,3*e.resolveTriangleIndex(A),f,h),yl.needsUpdate=!0,x.intersectsTriangle(yl))return!0;return!1}});{let m=js(t);for(let x=v,A=p+v;x<A;x++){let _=e.resolveTriangleIndex(x);qt(_l,3*_,f,h),_l.a.applyMatrix4(cu),_l.b.applyMatrix4(cu),_l.c.applyMatrix4(cu),_l.needsUpdate=!0;for(let M=0,E=m*3;M<E;M+=3)if(qt(yl,M,d,g),yl.needsUpdate=!0,_l.intersectsTriangle(yl))return!0}}}else{let u=Rt(i),f=Dt(i,o);return Yt(u,s,Ad),!!(r.intersectsBox(Ad)&&Yg(u,e,t,n,r)||(Yt(f,s,Ad),r.intersectsBox(Ad)&&Yg(f,e,t,n,r)))}}var Md=new je,qg=new hn,uu=new hn,pR=new L,mR=new L,gR=new L,vR=new L;function tA(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),qg.set(e.boundingBox.min,e.boundingBox.max,t),qg.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=Mi.getPrimitive(),d=Mi.getPrimitive(),g=pR,v=mR,p=null,m=null;r&&(p=gR,m=vR);let x=1/0,A=null,_=null;return Md.copy(t).invert(),uu.matrix.copy(Md),i.shapecast({boundsTraverseOrder:M=>qg.distanceToBox(M),intersectsBounds:(M,E,T)=>T<x&&T<a?(E&&(uu.min.copy(M.min),uu.max.copy(M.max),uu.needsUpdate=!0),!0):!1,intersectsRange:(M,E)=>{if(e.boundsTree){let T=e.boundsTree;return T.shapecast({boundsTraverseOrder:y=>uu.distanceToBox(y),intersectsBounds:(y,S,C)=>C<x&&C<a,intersectsRange:(y,S)=>{for(let C=y,R=y+S;C<R;C++){let w=T.resolveTriangleIndex(C);qt(d,3*w,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let I=M,P=M+E;I<P;I++){let F=i.resolveTriangleIndex(I);qt(h,3*F,c,l),h.needsUpdate=!0;let N=h.distanceToTriangle(d,g,p);if(N<x&&(v.copy(g),m&&m.copy(p),x=N,A=I,_=C),N<s)return!0}}}})}else{let T=js(e);for(let y=0,S=T;y<S;y++){qt(d,3*y,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=M,R=M+E;C<R;C++){let w=i.resolveTriangleIndex(C);qt(h,3*w,c,l),h.needsUpdate=!0;let I=h.distanceToTriangle(d,g,p);if(I<x&&(v.copy(g),m&&m.copy(p),x=I,A=C,_=y),I<s)return!0}}}}}),Mi.releasePrimitive(h),Mi.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=A,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(Md),v.applyMatrix4(Md),r.distance=v.sub(r.point).length(),r.faceIndex=_),n)}function Qg(i,e,t){return i===null?null:(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i)}var Td=new hn,Ed=new qo,nA=new L,iA=new je,rA=new L,Zg=["getX","getY","getZ"],hu=class i extends dd{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,s=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(l=>l.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=s?s.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=s),o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:r,roots:s,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(s));let o=new i(t,{...n,[$c]:!0});if(o._roots=s,o._indirectBuffer=a||null,n.setIndex){let c=t.getIndex();if(c===null){let u=new vt(e.index,1,!1);t.setIndex(u)}else c.array!==r&&(c.array.set(r),c.needsUpdate=!0)}return o;function l(c){for(let u=0;u<c.length;u++){let f=c[u],h=new Uint32Array(f),d=new Uint16Array(f);for(let g=0,v=f.byteLength/32;g<v;g++){let p=8*g,m=2*p;_t(m,d)||(h[p+6]=h[p+6]/8-g)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,c=(s?s[e]:e)*3,u=c+0,f=c+1,h=c+2;o&&(u=o[u],f=o[f],h=o[h]);for(let d=0;d<3;d++){let g=a[Zg[d]](u),v=a[Zg[d]](f),p=a[Zg[d]](h),m=g;v<m&&(m=v),p<m&&(m=p);let x=g;v>x&&(x=v),p>x&&(x=p),t[n+d]=m,t[n+d+3]=x}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,l=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let c=a.array,u=a.offset||0,f=3;a.isInterleavedBufferAttribute&&(f=a.data.stride);let h=["getX","getY","getZ"],d=n.offset;for(let g=e,v=e+t;g<v;g++){let m=(s?s[g]:g)*3,x=(g-d)*6,A=m+0,_=m+1,M=m+2;o&&(A=o[A],_=o[_],M=o[M]),l||(A=A*f+u,_=_*f+u,M=M*f+u);for(let E=0;E<3;E++){let T,y,S;l?(T=a[h[E]](A),y=a[h[E]](_),S=a[h[E]](M)):(T=c[A+E],y=c[_+E],S=c[M+E]);let C=T;y<C&&(C=y),S<C&&(C=S);let R=T;y>R&&(R=y),S>R&&(R=S);let w=(R-C)/2,I=E*2;n[x+I+0]=C+w,n[x+I+1]=w+(Math.abs(C)+w)*ll}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;iA.copy(e.matrixWorld).invert(),Ed.copy(t.ray).applyMatrix4(iA),rA.setFromMatrixScale(e.matrixWorld),nA.copy(Ed.direction).multiply(rA);let s=nA.length(),a=t.near/s,o=t.far/s;if(t.firstHitOnly===!0){let l=this.raycastFirst(Ed,r,a,o);l=Qg(l,e,t),l&&n.push(l)}else{let l=this.raycast(Ed,r,a,o);for(let c=0,u=l.length;c<u;c++){let f=Qg(l[c],e,t);f&&n.push(f)}}return n}refit(e=null){return(this.indirect?Ky:Hy)(this,e)}raycast(e,t=Di,n=0,r=1/0){let s=this._roots,a=[],o=this.indirect?Jy:Xy;for(let l=0,c=s.length;l<c;l++)o(this,l,t,e,a,n,r);return a}raycastFirst(e,t=Di,n=0,r=1/0){let s=this._roots,a=null,o=this.indirect?jy:Yy;for(let l=0,c=s.length;l<c;l++){let u=o(this,l,t,e,n,r);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,s=this.indirect?eA:Qy;for(let a=0,o=r.length;a<o&&(n=s(this,a,e,t),!n);a++);return n}shapecast(e){let t=Mi.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Wy:zy});return Mi.releasePrimitive(t),n}bvhcast(e,t,n){let{intersectsRanges:r,intersectsTriangles:s}=n,a=Mi.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,c=this.indirect?g=>{let v=this.resolveTriangleIndex(g);qt(a,v*3,o,l)}:g=>{qt(a,g*3,o,l)},u=Mi.getPrimitive(),f=e.geometry.index,h=e.geometry.attributes.position,d=e.indirect?g=>{let v=e.resolveTriangleIndex(g);qt(u,v*3,f,h)}:g=>{qt(u,g*3,f,h)};if(s){if(!(e instanceof i))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let g=(v,p,m,x,A,_,M,E)=>{for(let T=m,y=m+x;T<y;T++){d(T),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let S=v,C=v+p;S<C;S++)if(c(S),a.needsUpdate=!0,s(a,u,S,T,A,_,M,E))return!0}return!1};if(r){let v=r;r=function(p,m,x,A,_,M,E,T){return v(p,m,x,A,_,M,E,T)?!0:g(p,m,x,A,_,M,E,T)}}else r=g}return super.bvhcast(e,t,{intersectsRanges:r})}intersectsBox(e,t){return Td.set(e.min,e.max,t),Td.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Td.intersectsBox(n),intersectsTriangle:n=>Td.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},s=0,a=1/0){return(this.indirect?tA:Zy)(this,e,t,n,r,s,a)}closestPointToPoint(e,t={},n=0,r=1/0){return Iy(this,e,t,n,r)}};function xR(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function _R(i){switch(i){case 1:return zs;case 2:return os;case 3:return Sn;case 4:return Sn}}function sA(i){switch(i){case 1:return $o;case 2:return Hs;case 3:return Gs;case 4:return Gs}}var bd=class extends sr{constructor(){super(),this.minFilter=Ct,this.magFilter=Ct,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,r=e.count;if(t!==null){if(n*r%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=r*n/t}let s=e.itemSize,a=e.count,o=e.normalized,l=e.array.constructor,c=l.BYTES_PER_ELEMENT,u=this._forcedType,f=s;if(u===null)switch(l){case Float32Array:u=nn;break;case Uint8Array:case Uint16Array:case Uint32Array:u=An;break;case Int8Array:case Int16Array:case Int32Array:u=ks;break}let h,d,g,v,p=xR(s);switch(u){case nn:g=1,d=_R(s),o&&c===1?(v=l,p+="8",l===Uint8Array?h=xt:(h=jo,p+="_SNORM")):(v=Float32Array,p+="32F",h=nn);break;case ks:p+=c*8+"I",g=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=sA(s),c===1?(v=Int8Array,h=jo):c===2?(v=Int16Array,h=Vc):(v=Int32Array,h=ks);break;case An:p+=c*8+"UI",g=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=sA(s),c===1?(v=Uint8Array,h=xt):c===2?(v=Uint16Array,h=Os):(v=Uint32Array,h=An);break}f===3&&(d===Sn||d===Gs)&&(f=4);let m=Math.ceil(Math.sqrt(a))||1,x=f*m*m,A=new v(x),_=e.normalized;e.normalized=!1;for(let M=0;M<a;M++){let E=f*M;A[E]=e.getX(M)/g,s>=2&&(A[E+1]=e.getY(M)/g),s>=3&&(A[E+2]=e.getZ(M)/g,f===4&&(A[E+3]=1)),s>=4&&(A[E+3]=e.getW(M)/g)}e.normalized=_,this.internalFormat=p,this.format=d,this.type=h,this.image.width=m,this.image.height=m,this.image.data=A,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=r}},wd=class extends bd{constructor(){super(),this._forcedType=An}};var Cd=class extends bd{constructor(){super(),this._forcedType=nn}};var fu=class{constructor(){this.index=new wd,this.position=new Cd,this.bvhBounds=new sr,this.bvhContents=new sr,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(AR(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let n=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let r=Fg(iu(t));this._cachedIndexAttr=new vt(r,1,!1)}yR(t,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:r}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),r&&r.dispose()}};function yR(i,e,t){let n=t.array,r=i.index?i.index.array:null;for(let s=0,a=e.length;s<a;s++){let o=3*s,l=3*e[s];for(let c=0;c<3;c++)n[o+c]=r?r[l+c]:l+c}}function AR(i,e,t){let n=i._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let r=n[0],s=new Uint16Array(r),a=new Uint32Array(r),o=new Float32Array(r),l=r.byteLength/32,c=2*Math.ceil(Math.sqrt(l/2)),u=new Float32Array(4*c*c),f=Math.ceil(Math.sqrt(l)),h=new Uint32Array(2*f*f);for(let d=0;d<l;d++){let g=d*32/4,v=g*2,p=g;for(let m=0;m<3;m++)u[8*d+0+m]=o[p+0+m],u[8*d+4+m]=o[p+3+m];if(_t(v,s)){let m=Lt(v,s),x=wt(g,a),A=-65536|m;h[d*2+0]=A,h[d*2+1]=x}else{let m=a[g+6],x=qs(g,a);h[d*2+0]=x,h[d*2+1]=m}}e.image.data=u,e.image.width=c,e.image.height=c,e.format=Sn,e.type=nn,e.internalFormat="RGBA32F",e.minFilter=Ct,e.magFilter=Ct,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=h,t.image.width=f,t.image.height=f,t.format=Hs,t.type=An,t.internalFormat="RG32UI",t.minFilter=Ct,t.magFilter=Ct,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}var Ya={};BA(Ya,{bvh_distance_functions:()=>aA,bvh_ray_functions:()=>Jg,bvh_struct_definitions:()=>oA,common_functions:()=>Kg});var Kg=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;var aA=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// implementation from https://www.shadertoy.com/view/ttfGWl, though method 2 has been removed
// and is now available at this fork: https://www.shadertoy.com/view/WlB3zW
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0 - v;

	}

	// output the barycoord in v0, v1, v2 weight order
	barycoord = vec3( w, u, v );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, maxDistance, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point, float maxDistance,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = maxDistance * maxDistance;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;
			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`;var Jg=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`;var oA=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var aN=`
	${Kg}
	${Jg}
`;var du=.56,uA=or.degToRad(34.5),SR=or.degToRad(40.8),Rd=.03,MR=.5,TR=.77,ea=.5,$s=8,hr=4,Dd=Math.PI*2/$s,lA=(ea-du/2)*Math.tan(uA),e0=ea*Math.tan(SR),us={tableY:Rd/2+lA,girdleTop:Rd/2,girdleBottom:-Rd/2,culetY:-Rd/2-e0,crownH:lA,pavH:e0},Pd={round:i=>[Math.cos(i)*ea,Math.sin(i)*ea],oval:i=>[Math.cos(i)*.6,Math.sin(i)*.6*.69],cushion:i=>{let e=Math.cos(i),t=Math.sin(i),n=3.2,r=Math.pow(Math.pow(Math.abs(e),n)+Math.pow(Math.abs(t),n),-1/n)*.455;return[e*r,t*r]},pear:i=>[(Math.cos(i)+.3)*.58,Math.sin(i)*Math.sin(i/2)*.84*.58]},Al=["round","oval","cushion","pear"];function cA(i,e,t,n,r){let s=e[0]-i[0],a=e[1]-i[1],o=e[2]-i[2],l=t[0]-i[0],c=t[1]-i[1],u=t[2]-i[2],f=a*u-o*c,h=o*l-s*u,d=s*c-a*l;return Math.abs(h)<1e-9?i[1]:i[1]-(f*(n-i[0])+d*(r-i[2]))/h}function ER(i){let e=[],t=(S,C,R)=>e.push(S,C,R),n=(S,C,R)=>{let w=i(S);return[w[0]*C,R,w[1]*C]},r=us.tableY,s=us.girdleTop,a=us.girdleBottom,o=us.culetY,l=du/2/ea,c=(du/2+(ea-du/2)*MR)/ea,u=1-TR,f=Math.cos(Dd/2),h=r-(c*ea*f-du/2)*Math.tan(uA),d=o+e0*u*f,g=[],v=[],p=[];for(let S=0;S<$s;S++)g.push(n(S*Dd,l,r)),v.push(n((S+.5)*Dd,c,h)),p.push(n((S+.5)*Dd,u,d));let m=2*$s*hr,x=S=>S/m*Math.PI*2,A=S=>n(x(S),1,s),_=S=>n(x(S),1,a),M=[0,r,0],E=[0,o,0],T=[],y=[];for(let S=0;S<$s;S++){let C=S*2*hr,R=C+hr,w=(C+2*hr)%m,I=[[v[S],A(C),A(R)],[v[S],A(R),A(w)]],P=[[p[S],_(C),_(R)],[p[S],_(R),_(w)]];for(let F=0;F<2*hr;F++){let N=C+F,O=I[F<hr?0:1],K=P[F<hr?0:1],X=A(N);T[N]=F===0||F===hr?X:[X[0],cA(O[0],O[1],O[2],X[0],X[2]),X[2]];let B=_(N);y[N]=F===0||F===hr?B:[B[0],cA(K[0],K[1],K[2],B[0],B[2]),B[2]]}}for(let S=0;S<$s;S++){let C=(S+1)%$s,R=(S+$s-1)%$s,w=S*2*hr;t(M,g[S],g[C]),t(g[S],g[C],v[S]),t(g[S],v[S],T[w]),t(g[S],T[w],v[R]);for(let I=0;I<2*hr;I++)t(v[S],T[(w+I)%m],T[(w+I+1)%m]);for(let I=0;I<2*hr;I++)t(p[S],y[(w+I)%m],y[(w+I+1)%m]);t(y[w],p[S],E),t(y[w],E,p[R])}for(let S=0;S<m;S++){let C=(S+1)%m;t(T[S],y[S],y[C]),t(T[S],y[C],T[C])}return e}var jg=[];function hA(i){let e=ER(i),t=new Float32Array(e.length*3),n=(us.tableY+us.culetY)/2,r=new L,s=new L,a=new L,o=new L,l=jg.length===0;for(let c=0;c<e.length/3;c++){let[u,f,h]=[e[c*3],e[c*3+1],e[c*3+2]];l&&(r.set(f[0]-u[0],f[1]-u[1],f[2]-u[2]),s.set(h[0]-u[0],h[1]-u[1],h[2]-u[2]),a.crossVectors(r,s),o.set((u[0]+f[0]+h[0])/3,(u[1]+f[1]+h[1])/3-n,(u[2]+f[2]+h[2])/3),jg.push(a.dot(o)<0)),jg[c]&&([f,h]=[h,f]),t.set(u,c*9),t.set(f,c*9+3),t.set(h,c*9+6)}return t}hA(Pd.round);var $g={};function Sl(i){return $g[i]||($g[i]=hA(Pd[i])),$g[i]}function fA(i,e){let t=Al.length,n=(i%t+t)%t,r=Math.floor(n),s=n-r,a=Sl(Al[r]),o=Sl(Al[(r+1)%t]);for(let l=0;l<e.length;l++)e[l]=a[l]+(o[l]-a[l])*s;return e}function ta(i,e){let t=Al.length,n=(i%t+t)%t,r=Math.floor(n),s=n-r,a=Pd[Al[r]](e),o=Pd[Al[(r+1)%t]](e);return[a[0]+(o[0]-a[0])*s,a[1]+(o[1]-a[1])*s]}function dA(){let i=new Kt;return i.setAttribute("position",new vt(Sl("round").slice(),3)),i.computeVertexNormals(),i}function t0(i){let e=(i/1e3)**2;return Math.sqrt(1+.3306*e/(e-.175**2)+4.3356*e/(e-.106**2))}var bR={430:[.2839,.0116,1.3856],470:[.1954,.091,1.2876],510:[.0093,.503,.1582],550:[.4334,.995,.0087],590:[1.0263,.757,.0011],630:[.6424,.265,5e-5],670:[.0874,.032,0]};function pA(i){if(i===3)return{iors:[640,550,465].map(t0),weights:[[1,0,0],[0,1,0],[0,0,1]]};let e=[430,470,510,550,590,630,670],t=e.map(r=>{let[s,a,o]=bR[r];return[Math.max(0,3.2406*s-1.5372*a-.4986*o),Math.max(0,-.9689*s+1.8758*a+.0415*o),Math.max(0,.0557*s-.204*a+1.057*o)]}),n=[0,1,2].map(r=>t.reduce((s,a)=>s+a[r],0));return{iors:e.map(t0),weights:t.map(r=>r.map((s,a)=>s/n[a]))}}var Ml=36,wR=`
	varying vec3 vWorldPosition;
	flat varying mat4 vToLocal;
	flat varying mat3 vToWorld;
	flat varying vec3 vCenter;
	void main() {
		mat4 m = modelMatrix;
		#ifdef USE_INSTANCING
			m = modelMatrix * instanceMatrix;
		#endif
		vToLocal = inverse( m );
		vToWorld = mat3( m );
		vCenter = m[ 3 ].xyz;
		vec4 wp = m * vec4( position, 1.0 );
		vWorldPosition = wp.xyz;
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`,CR=`
	#define RAY_OFFSET 1e-4
	${Ya.common_functions}
	${Ya.bvh_struct_definitions}
	${Ya.bvh_ray_functions}

	uniform mat3 envRotation;
	uniform float envIntensity;
	uniform BVH bvh;
	uniform float ior;
	uniform float iors[ WAVES ];
	uniform vec3 weights[ WAVES ];
	uniform int bounces;
	uniform vec3 obstruction; // cos inner, cos outer, how dark
	uniform float frost;
	uniform float opacity;
	uniform float glow;
	#ifdef ANALYTIC_ENV
		uniform vec4 cardC[ CARDS ];
		uniform vec4 cardU[ CARDS ];
		uniform vec4 cardV[ CARDS ];
		uniform vec4 cardN[ CARDS ];
		uniform vec3 cardCol[ CARDS ];
		uniform vec3 dome;
	#else
		uniform samplerCube envMap;
	#endif
	#ifdef SETTING
		uniform vec4 capA[ ${Ml} ];
		uniform vec4 capB[ ${Ml} ];
		uniform int capCount;
		uniform samplerCube metalMap;
		uniform vec3 metalTint;
	#endif
	varying vec3 vWorldPosition;
	flat varying mat4 vToLocal;
	flat varying mat3 vToWorld;
	flat varying vec3 vCenter;

	vec3 toCamera;

	// The studio, light by light (or from its baked cube map).
	vec3 studio( vec3 d ) {
		#ifdef ANALYTIC_ENV
			float y = d.y;
			float g = y > 0.0 ? mix( dome.y, dome.x, pow( y, 0.7 ) ) : mix( dome.y, dome.z, pow( - y, 0.45 ) );
			vec3 c = vec3( g );
			for ( int i = 0; i < CARDS; i ++ ) {
				float dn = dot( d, cardN[ i ].xyz );
				if ( dn > - 1e-4 ) continue;
				float t = cardN[ i ].w / dn;
				if ( t <= 0.0 ) continue;
				vec3 l = d * t - cardC[ i ].xyz;
				float a = dot( l, cardU[ i ].xyz );
				float b = dot( l, cardV[ i ].xyz );
				float cov;
				if ( cardC[ i ].w > 0.5 ) {
					cov = 1.0 - smoothstep( 1.0 - cardU[ i ].w, 1.0 + cardU[ i ].w, length( vec2( a, b ) ) );
				} else {
					cov = ( 1.0 - smoothstep( 1.0 - cardU[ i ].w, 1.0 + cardU[ i ].w, abs( a ) ) )
						* ( 1.0 - smoothstep( 1.0 - cardV[ i ].w, 1.0 + cardV[ i ].w, abs( b ) ) );
				}
				c = mix( c, cardCol[ i ], cov );
			}
			return c;
		#else
			return texture( envMap, d ).rgb;
		#endif
	}

	// What a ray leaving the stone sees: the studio, with the camera and
	// photographer as a dark patch in front of the stone.
	vec3 env( vec3 dir ) {
		vec3 c = studio( envRotation * dir ) * envIntensity;
		float o = smoothstep( obstruction.y, obstruction.x, dot( dir, toCamera ) );
		return c * mix( 1.0, obstruction.z, o );
	}

	float fresnel( float cosI, float etaI, float etaT ) {
		float sinT = etaI / etaT * sqrt( max( 0.0, 1.0 - cosI * cosI ) );
		if ( sinT >= 1.0 ) return 1.0;
		float cosT = sqrt( max( 0.0, 1.0 - sinT * sinT ) );
		float rs = ( etaT * cosI - etaI * cosT ) / ( etaT * cosI + etaI * cosT );
		float rp = ( etaI * cosI - etaT * cosT ) / ( etaI * cosI + etaT * cosT );
		return 0.5 * ( rs * rs + rp * rp );
	}

	#ifdef SETTING
		// Ray against a capsule (segment a-b, radius r): distance, or -1.
		float capsuleHit( vec3 ro, vec3 rd, vec3 a, vec3 b, float r ) {
			vec3 ba = b - a;
			vec3 oa = ro - a;
			float baba = dot( ba, ba );
			float bard = dot( ba, rd );
			float baoa = dot( ba, oa );
			float rdoa = dot( rd, oa );
			float oaoa = dot( oa, oa );
			float A = baba - bard * bard;
			float B = baba * rdoa - baoa * bard;
			float C = baba * oaoa - baoa * baoa - r * r * baba;
			float h = B * B - A * C;
			if ( h >= 0.0 ) {
				float t = ( - B - sqrt( h ) ) / A;
				float y = baoa + t * bard;
				if ( y > 0.0 && y < baba ) return t;
				vec3 oc = y <= 0.0 ? oa : ro - b;
				B = dot( rd, oc );
				C = dot( oc, oc ) - r * r;
				h = B * B - C;
				if ( h > 0.0 ) return - B - sqrt( h );
			}
			return - 1.0;
		}

		// A ray (stone space) that meets the prongs or rails sees polished metal.
		bool settingHit( vec3 ro, vec3 rd, out vec3 radiance ) {
			float best = 1e9;
			int bi = - 1;
			for ( int i = 0; i < ${Ml}; i ++ ) {
				if ( i >= capCount ) break;
				float t = capsuleHit( ro, rd, capA[ i ].xyz, capB[ i ].xyz, capA[ i ].w );
				if ( t > 1e-4 && t < best ) {
					best = t;
					bi = i;
				}
			}
			if ( bi < 0 ) return false;
			vec3 p = ro + rd * best;
			vec3 a = capA[ bi ].xyz;
			vec3 ba = capB[ bi ].xyz - a;
			float h = clamp( dot( p - a, ba ) / dot( ba, ba ), 0.0, 1.0 );
			vec3 nrm = normalize( p - a - ba * h );
			vec3 rW = normalize( vToWorld * reflect( rd, nrm ) );
			radiance = texture( metalMap, envRotation * rW ).rgb * metalTint * envIntensity * 0.9;
			return true;
		}
	#endif

	// One sample: reflection off the surface plus the light that comes back out.
	vec3 shade( vec3 p, vec3 view, vec3 n, float spread ) {
		float cosV = clamp( - dot( view, n ), 0.0, 1.0 );
		float fIn = fresnel( cosV, 1.0, ior );
		vec3 refl = reflect( view, n );
		vec3 surface;
		vec3 ro = ( vToLocal * vec4( p, 1.0 ) ).xyz;
		#ifdef SETTING
			if ( ! settingHit( ro, normalize( ( vToLocal * vec4( refl, 0.0 ) ).xyz ), surface ) ) surface = env( refl );
		#else
			surface = env( refl );
		#endif

		// Into the stone, in its own space (where the BVH lives).
		vec3 rd = normalize( ( vToLocal * vec4( refract( view, n, 1.0 / ior ), 0.0 ) ).xyz );

		// One path inside; each wavelength keeps its own share of the light.
		float through[ WAVES ];
		for ( int w = 0; w < WAVES; w ++ ) through[ w ] = 1.0;
		vec3 acc = vec3( 0.0 );
		for ( int i = 0; i < 12; i ++ ) {
			if ( i >= bounces ) break;
			uvec4 faceIndices = uvec4( 0u );
			vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
			vec3 barycoord = vec3( 0.0 );
			float side = 1.0;
			float dist = 0.0;
			bool hit = bvhIntersectFirstHit( bvh, ro + rd * RAY_OFFSET, rd, faceIndices, faceNormal, barycoord, side, dist );
			if ( ! hit ) break;
			ro = ro + rd * ( dist + RAY_OFFSET );
			vec3 fn = normalize( faceNormal );
			float cosI = clamp( - dot( rd, fn ), 0.0, 1.0 );
			bool blocked = false;
			vec3 metal = vec3( 0.0 );
			#ifdef SETTING
				vec3 mean = refract( rd, fn, ior );
				if ( dot( mean, mean ) > 0.0 ) blocked = settingHit( ro, normalize( mean ), metal );
			#endif
			float left = 0.0;
			for ( int w = 0; w < WAVES; w ++ ) {
				float eta = ior + ( iors[ w ] - ior ) * spread;
				vec3 o = refract( rd, fn, eta );
				if ( dot( o, o ) > 0.0 ) {
					float f = fresnel( cosI, eta, 1.0 );
					vec3 rad = blocked ? metal : env( normalize( vToWorld * o ) );
					acc += weights[ w ] * ( through[ w ] * ( 1.0 - f ) ) * rad;
					through[ w ] *= f;
				}
				left = max( left, through[ w ] );
			}
			rd = reflect( rd, fn );
			if ( left < 0.02 ) break;
		}
		// Whatever is still inside after the last bounce leaves the way it is heading.
		vec3 last = env( normalize( vToWorld * rd ) );
		for ( int w = 0; w < WAVES; w ++ ) acc += weights[ w ] * through[ w ] * last;
		return surface * fIn + acc * ( 1.0 - fIn );
	}

	void main() {
		toCamera = normalize( cameraPosition - vCenter );
		vec3 dpx = dFdx( vWorldPosition );
		vec3 dpy = dFdy( vWorldPosition );
		vec3 n = normalize( cross( dpx, dpy ) );
		if ( dot( n, vWorldPosition - cameraPosition ) > 0.0 ) n = - n;

		// Several rays per pixel (rotated grid) for clean edges inside the stone.
		#if SS == 4
			const vec2 OFF[ 4 ] = vec2[ 4 ]( vec2( 0.125, 0.375 ), vec2( - 0.375, 0.125 ), vec2( - 0.125, - 0.375 ), vec2( 0.375, - 0.125 ) );
			const float SPREAD[ 4 ] = float[ 4 ]( 0.86, 1.14, 0.95, 1.05 );
		#elif SS == 2
			const vec2 OFF[ 2 ] = vec2[ 2 ]( vec2( 0.25, 0.25 ), vec2( - 0.25, - 0.25 ) );
			const float SPREAD[ 2 ] = float[ 2 ]( 0.93, 1.07 );
		#else
			const vec2 OFF[ 1 ] = vec2[ 1 ]( vec2( 0.0 ) );
			const float SPREAD[ 1 ] = float[ 1 ]( 1.0 );
		#endif
		vec3 col = vec3( 0.0 );
		for ( int s = 0; s < SS; s ++ ) {
			vec3 p = vWorldPosition + dpx * OFF[ s ].x + dpy * OFF[ s ].y;
			col += shade( p, normalize( p - cameraPosition ), n, SPREAD[ s ] );
		}
		col /= float( SS );

		// A polished girdle reads as a thin pale band, not a dark seam.
		vec3 nl = normalize( mat3( vToLocal ) * n );
		float g = 1.0 - smoothstep( 0.04, 0.2, abs( nl.y ) );
		col = mix( col, vec3( 0.5 ) * envIntensity, g * frost );

		col = min( col, vec3( 24.0 ) );
		col += glow * vec3( 1.0, 0.97, 0.92 );
		gl_FragColor = vec4( col, opacity );
	}
`,Id=null;function RR(){if(!Id){let i=new Kt;i.setAttribute("position",new vt(Sl("round").slice(),3));let e=new hu(i,{strategy:2,targetLeafSize:4});Id={geometry:i,struct:new fu},Id.struct.updateFrom(e)}return Id}function mA(i,{bounces:e=7,waves:t=7,ss:n=1,bvhStruct:r,studio:s=null,setting:a=null}){let{iors:o,weights:l}=pA(t),c={WAVES:t,SS:n},u={envMap:{value:i},envRotation:{value:new $e},envIntensity:{value:1},bvh:{value:r},ior:{value:t0(589)},iors:{value:o},weights:{value:l.map(f=>new L(...f))},bounces:{value:e},obstruction:{value:new L(Math.cos(or.degToRad(21)),Math.cos(or.degToRad(30)),.03)},frost:{value:.55},opacity:{value:1},glow:{value:0}};return s&&(c.ANALYTIC_ENV="",c.CARDS=s.count,Object.assign(u,{cardC:{value:s.c},cardU:{value:s.u},cardV:{value:s.v},cardN:{value:s.n},cardCol:{value:s.col},dome:{value:s.dome}})),a&&(c.SETTING="",Object.assign(u,{capA:{value:Array.from({length:Ml},()=>new St)},capB:{value:Array.from({length:Ml},()=>new St)},capCount:{value:0},metalMap:{value:a},metalTint:{value:new Ze(1,1,1)}})),new at({vertexShader:wR,fragmentShader:CR,defines:c,uniforms:u})}function gA(i,{bounces:e=7,waves:t=7,ss:n=1,studio:r=null,setting:s=null}={}){let a=new Kt,o=Sl("round").slice();a.setAttribute("position",new vt(o,3));let l=new hu(a,{strategy:2,targetLeafSize:4});a.boundsTree=l;let c=new fu;c.updateFrom(l);let u=mA(i,{bounces:e,waves:t,ss:n,bvhStruct:c,studio:r,setting:s}),f=new kt(a,u);f.name="diamond";let h=0;return{mesh:f,material:u,setMorph(d){Math.abs(d-h)<1e-5||(h=d,fA(d,o),a.attributes.position.needsUpdate=!0,a.computeBoundingSphere(),l.refit(),c.updateFrom(l))},setBounces(d){u.uniforms.bounces.value=d},setQuality({bounces:d,ss:g,waves:v,exact:p}){let m=u.defines,x=u.uniforms,A=!1;if(d!==void 0&&(x.bounces.value=d),g!==void 0&&m.SS!==g&&(m.SS=g,A=!0),v!==void 0&&m.WAVES!==v){let _=pA(v);m.WAVES=v,x.iors.value=_.iors,x.weights.value=_.weights.map(M=>new L(...M)),A=!0}p===!1&&"ANALYTIC_ENV"in m&&(delete m.ANALYTIC_ENV,A=!0),A&&(u.needsUpdate=!0)},setSetting(d,g){let v=u.uniforms;if(!v.capA)return;let p=Math.min(Ml,d.length);for(let m=0;m<p;m++){let x=d[m];v.capA.value[m].set(x[0],x[1],x[2],x[3]),v.capB.value[m].set(x[4],x[5],x[6],0)}v.capCount.value=p,g&&v.metalTint.value.copy(g)}}}function vA(i,{bounces:e=4,waves:t=3,studio:n=null}={}){return mA(i,{bounces:e,waves:t,ss:1,bvhStruct:RR().struct,studio:n})}var Tl=class{constructor(e,t,n){this.radial=t,this.maxRings=e;let r=e*(t+1);this.pos=new Float32Array(r*3),this.nrm=new Float32Array(r*3);let s=[];for(let o=0;o<e-1;o++)for(let l=0;l<t;l++){let c=o*(t+1)+l,u=c+t+1;s.push(c,c+1,u,c+1,u+1,u)}let a=new Kt;a.setIndex(s),a.setAttribute("position",new vt(this.pos,3).setUsage(Vs)),a.setAttribute("normal",new vt(this.nrm,3).setUsage(Vs)),a.setDrawRange(0,0),this.geometry=a,this.mesh=new kt(a,n),this.mesh.frustumCulled=!1,this.rings=0,this._n=new L,this._b=new L,this._t=new L,this._v=new L}begin(){this.rings=0}ring(e,t,n,r,s,a=0){if(this.rings>=this.maxRings)return;let o=this.rings*(this.radial+1),l=Math.cos(a),c=Math.sin(a);for(let u=0;u<=this.radial;u++){let f=u/this.radial*Math.PI*2,h=Math.cos(f),d=Math.sin(f),g=t.x*h+n.x*d,v=t.y*h+n.y*d,p=t.z*h+n.z*d,m=(o+u)*3;this.pos[m]=e.x+g*s,this.pos[m+1]=e.y+v*s,this.pos[m+2]=e.z+p*s,this.nrm[m]=g*l+r.x*c,this.nrm[m+1]=v*l+r.y*c,this.nrm[m+2]=p*l+r.z*c}this.rings++}cap(e,t,n,r,s,a=5,o=!1){let l=this._v,c=[];for(let u=1;u<=a;u++)c.push(u);o&&(c.reverse(),c.push(0));for(let u of c){let f=u/a*(Math.PI/2)*.999;l.copy(e).addScaledVector(r,Math.sin(f)*s),this.ring(l,t,n,r,Math.max(s*Math.cos(f),1e-4),f)}}sweep(e,t,{up:n=null,capStart:r=!1,capEnd:s=!0,closed:a=!1,capSteps:o=6}={}){this.begin();let l=this._n,c=this._b,u=this._t,f=e.length;if(f<2){this.end();return}let h=(m,x)=>{let A=e[Math.max(0,m-1)],_=e[Math.min(f-1,m+1)];if(a){let M=e[(m-1+f)%f],E=e[(m+1)%f];return x.subVectors(E,M).normalize()}return x.subVectors(_,A).normalize()};if(h(0,u),n)c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize();else{let m=Math.abs(u.y)<.9?new L(0,1,0):new L(1,0,0);c.crossVectors(u,m).normalize(),l.crossVectors(c,u).normalize()}let d=m=>typeof t=="function"?t(m/(f-1)):t;r&&!a&&this.cap(e[0],l,c,u.clone().negate(),d(0),o,!0);let g=new L().copy(u),v=new Vn,p=a?f+1:f;for(let m=0;m<p;m++){let x=m%f;h(x,u),n?(c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize()):m>0&&(v.setFromUnitVectors(g,u),l.applyQuaternion(v),c.applyQuaternion(v)),g.copy(u),this.ring(e[x],l,c,u,d(x))}s&&!a&&this.cap(e[f-1],l,c,u,d(f-1),o),this.end()}end(){let e=this.geometry;e.setDrawRange(0,Math.max(0,this.rings-1)*this.radial*6),e.attributes.position.needsUpdate=!0,e.attributes.normal.needsUpdate=!0,this.mesh.visible=this.rings>1}};var El=1.27,Fd=2.18,Bd=6,pu=4,DR=i=>.19+.17*Math.exp(-Math.pow(i/.42,2)),_A=i=>.13+.02*(i/Math.PI),na=i=>El+DR(i),Ld={white:new Ze("#ecebe8"),yellow:new Ze("#f3c977"),rose:new Ze("#f2b49b")},xA=[Ld.white,Ld.yellow,Ld.rose];function Ud(i,e,t){let r=ta(i,e+.001),s=ta(i,e-.001),a=r[1]-s[1],o=-(r[0]-s[0]),l=ta(i,e);a*l[0]+o*l[1]<0&&(a=-a,o=-o);let c=Math.hypot(a,o)||1;return t[0]=a/c,t[1]=o/c,t}var qa=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},i0=class{constructor(e){this.NT=360,this.NC=48;let t=(this.NT+1)*(this.NC+1),n=2*(this.NC+2);this.pos=new Float32Array((t+n)*3),this.nrm=new Float32Array((t+n)*3);let r=[];for(let a=0;a<this.NT;a++)for(let o=0;o<this.NC;o++){let l=a*(this.NC+1)+o,c=l+this.NC+1;r.push(l,c,l+1,c,c+1,l+1)}this.bodyCount=r.length,this.capBase=t;for(let a=0;a<2;a++){let o=t+a*(this.NC+2);for(let l=0;l<this.NC;l++)a===0?r.push(o,o+1+l,o+2+l):r.push(o,o+2+l,o+1+l)}let s=new Kt;s.setIndex(r),s.setAttribute("position",new vt(this.pos,3).setUsage(Vs)),s.setAttribute("normal",new vt(this.nrm,3).setUsage(Vs)),this.geometry=s,this.mesh=new kt(s,e),this.mesh.frustumCulled=!1,this.ends=[new L,new L],this.g=-1}set(e){if(e=Math.min(1,Math.max(0,e)),e===this.g||(this.g=e,this.mesh.visible=e>.001,!this.mesh.visible))return;let t=this.NT,n=this.NC,r=Math.PI*(1-e),s=this.pos,a=this.nrm,o=2/pu;for(let c=0;c<=t;c++){let u=r+(Math.PI*2-2*r)*(c/t),f=Math.min(u,Math.PI*2-u),h=Math.sin(u),d=Math.cos(u),g=na(f),v=(El+g)/2,p=(g-El)/2,m=_A(f);for(let x=0;x<=n;x++){let A=x/n*Math.PI*2,_=Math.cos(A),M=Math.sin(A),E=Math.sign(_)*Math.pow(Math.abs(_),o),T=Math.sign(M)*Math.pow(Math.abs(M),o),y=E*m,S=T*p,C=Math.sign(E)*Math.pow(Math.abs(E),pu-1)/m,R=Math.sign(T)*Math.pow(Math.abs(T),pu-1)/p,w=Math.hypot(C,R)||1;C/=w,R/=w;let I=(c*(n+1)+x)*3;s[I]=h*(v+S),s[I+1]=d*(v+S),s[I+2]=y,a[I]=h*R,a[I+1]=d*R,a[I+2]=C}}let l=e<.999;for(let c=0;c<2;c++){let u=c===0?0:t,f=r+(Math.PI*2-2*r)*(u/t),h=Math.cos(f)*(c===0?-1:1),d=-Math.sin(f)*(c===0?-1:1),g=this.capBase+c*(n+2),v=Math.min(f,Math.PI*2-f),p=(El+na(v))/2;this.ends[c].set(Math.sin(f)*p,Math.cos(f)*p,0);for(let m=-1;m<=n;m++){let x=(m<0?g:g+1+m)*3;if(m<0)s[x]=this.ends[c].x,s[x+1]=this.ends[c].y,s[x+2]=0;else{let A=(u*(n+1)+m)*3;s[x]=s[A],s[x+1]=s[A+1],s[x+2]=s[A+2]}a[x]=h,a[x+1]=d,a[x+2]=0}}this.geometry.setDrawRange(0,l?this.geometry.index.count:this.bodyCount),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.normal.needsUpdate=!0}};function n0(i,e=0){let t=Math.min(Math.abs(i),Math.PI*2-Math.abs(i)),n=na(t),r=_A(t),s=(n-El)/2,a=(El+n)/2,o=Math.min(.999,Math.abs(e)/r),l=s*Math.pow(1-Math.pow(o,pu),1/pu),c=a+l,u=.001,f=na(Math.min(Math.abs(i+u),Math.PI*2-Math.abs(i+u))),h=na(Math.min(Math.abs(i-u),Math.PI*2-Math.abs(i-u))),d=(f-h)/(2*u),g=new L(Math.sin(i),Math.cos(i),0),v=new L(Math.cos(i),-Math.sin(i),0),p=g.clone().multiplyScalar(n).addScaledVector(v,-d).normalize();return{point:g.multiplyScalar(c).setZ(e),normal:p}}function yA({cube:i,rotation:e,waves:t=3,studio:n=null}){let r=new Ur;r.name="ring";let s=new Ur;s.position.y=Fd,r.add(s);let a=()=>new Fc({color:Ld.white.clone(),metalness:1,roughness:.07,envMapIntensity:1}),o=a();o.side=mn;let l=a(),c=a();c.roughness=.1;let u=[o,l,c],f=new i0(o);r.add(f.mesh);let h=[];for(let ne=0;ne<Bd;ne++){let he=new Tl(64,24,l);h.push(he),s.add(he.mesh)}let d=new Tl(124,18,l);s.add(d.mesh);let g=new Tl(144,18,c);s.add(g.mesh);let v=dA(),p=vA(i,{bounces:4,waves:t,studio:n});p.uniforms.envRotation.value=e;let m=26,x=new Ba(v,p,m);x.instanceMatrix.setUsage(Vs),x.frustumCulled=!1,s.add(x);let A=[];{let ne=.3,he=1.3;for(;ne<he;){let Re=.19-.024*((ne-.3)/(he-.3));A.push({phi:ne,size:Re});let ce=na(ne);ne+=(Re+.01)/ce}}let _=A.length*2,M=new Ba(v,p,_);M.frustumCulled=!1,r.add(M);let E=new Ua(1,32,24),T=(A.length+1)*2*2,y=a();y.roughness=.17,u.push(y);let S=new Ba(E,y,T);S.frustumCulled=!1,r.add(S);let C=[],R=[];{let ne=new L(0,1,0),he=new Vn;for(let pe of[1,-1])A.forEach((Re,ce)=>{let De=Re.phi*pe,{point:He,normal:ve}=n0(De);he.setFromUnitVectors(ne,ve);let W=He.clone().addScaledVector(ve,-.006);C.push({pos:W,q:he.clone(),size:Re.size,order:ce,side:pe});let k=ce===0?Re.phi-(Re.size+.01)/na(Re.phi):A[ce-1].phi,Ye=(Re.phi+k)/2*pe;for(let Ie of[-1,1]){let Be=n0(Ye,Ie*Re.size*.36);R.push({pos:Be.point.clone().addScaledVector(Be.normal,.006),size:.03,order:ce,side:pe})}if(ce===A.length-1){let Ie=(Re.phi+(Re.size+.01)/2/na(Re.phi))*pe;for(let Be of[-1,1]){let me=n0(Ie,Be*Re.size*.36);R.push({pos:me.point.clone().addScaledVector(me.normal,.006),size:.028,order:ce+.5,side:pe})}}})}let w={band:-1,prongs:-1,morph:-1,metal:-1,halo:-1,pave:-1},I=new je,P=new L,F=new L,N=new Vn,O=[0,0],K=us.culetY,X=us.pavH,B=1.6-Fd,re=[],se=[];function Te(ne,he,pe,Re=re){let De=ne.length;for(let He=0;He<6;He++){let ve=Math.round(He/6*(pe?De:De-1))%De,W=Math.round((He+1)/6*(pe?De:De-1))%De;if(ve===W)continue;let k=ne[ve],Ye=ne[W];Re.push([k.x,k.y,k.z,he,Ye.x,Ye.y,Ye.z])}}function Ce(ne){return ne/Bd*Math.PI*2}function Y(ne,he){let pe=new Lc(Array.from({length:6},()=>new L),!1,"centripetal");re.length=0;let Re=pe.points,ce=qa(0,1,he);for(let ve=0;ve<Bd;ve++){let W=Ce(ve),k=ta(ne,W);Ud(ne,W,O);let Ye=($,J)=>[k[0]*$+O[0]*J,k[1]*$+O[1]*J],Ie=Ye(.26,0);Re[0].set(Ie[0],B,Ie[1]),Ie=Ye(.36,.058),Re[1].set(Ie[0],K+.36*X,Ie[1]),Ie=Ye(.72,.056),Re[2].set(Ie[0],K+.72*X,Ie[1]),Ie=Ye(1,.052),Re[3].set(Ie[0],-.01,Ie[1]),Ie=Ye(1,.046),Re[4].set(Ie[0],.045,Ie[1]),Ie=Ye(.975,.03),Re[5].set(Ie[0],.072,Ie[1]);let Be=ve%2*.12,me=qa(Be,Be+.88,ce),U=h[ve];if(me<=.001){U.begin(),U.end();continue}let b=48,H=[];for(let $=0;$<b;$++)H.push(pe.getPointAt($/(b-1)*me));let ee=$=>.052-.011*$*me;U.sweep(H,ee,{capEnd:!0,capSteps:10});for(let $=0;$<4;$++){let J=H[Math.round($/4*(b-1))],ye=H[Math.round(($+1)/4*(b-1))];re.push([J.x,J.y,J.z,ee(($+.5)/4),ye.x,ye.y,ye.z])}}let De=(ve,W,k,Ye,Ie,Be,me)=>{if(Be<=.001){ve.begin(),ve.end();return}let U=[],b=Be>=.999,H=b?me:Math.max(2,Math.round(me*Be)+1);for(let ee=0;ee<H;ee++){let $=b?ee/me*Math.PI*2:ee/(H-1)*Math.PI*2*Be-Math.PI/2,J=ta(ne,$);Ud(ne,$,O),U.push(new L(J[0]*k+O[0]*Ye,W,J[1]*k+O[1]*Ye))}ve.sweep(U,Ie,{up:new L(0,1,0),closed:b,capStart:!b,capEnd:!b}),Te(U,Ie,b)},He=-.27;return De(d,He,(He-K)/X,.036,.03,qa(.35,1,ce),100),ce}function V(ne,he){let Re=(-.115-K)/X,ce=qa(0,.55,he),De=[],He=g;if(se.length=0,ce<=.001)He.begin(),He.end();else{let k=ce>=.999,Ye=120,Ie=k?Ye:Math.max(2,Math.round(Ye*ce)+1);for(let Be=0;Be<Ie;Be++){let me=k?Be/Ye*Math.PI*2:Be/(Ie-1)*Math.PI*2*ce+Math.PI/2,U=ta(ne,me);Ud(ne,me,O),De.push(new L(U[0]*Re+O[0]*.042,-.115,U[1]*Re+O[1]*.042))}He.sweep(De,.03,{up:new L(0,1,0),closed:k,capStart:!k,capEnd:!k}),Te(De,.03,k,se)}let ve=0,W=new L(0,1,0);for(let k=0;k<m;k++){let Ye=(k+.5)/m*Math.PI*2,Ie=!1;for(let $=0;$<Bd;$++){let J=Math.abs(Ye-Ce($));J=Math.min(J,Math.PI*2-J),J<.17&&(Ie=!0)}if(Ie)continue;let Be=(Ye-Math.PI/2+Math.PI*4)%(Math.PI*2)/(Math.PI*2),me=qa(.3+Be*.55,.3+Be*.55+.12,he);if(me<=.001)continue;let U=ta(ne,Ye);Ud(ne,Ye,O);let H=new L(O[0],0,O[1]).clone().multiplyScalar(Math.cos(.42)).addScaledVector(W,Math.sin(.42)).normalize();P.set(U[0]*Re+O[0]*.1,-.115+.012,U[1]*Re+O[1]*.1),N.setFromUnitVectors(W,H);let ee=.118*(.6+.4*me)*me;F.set(ee,ee,ee),x.setMatrixAt(ve++,I.compose(P,N,F))}x.count=ve,x.instanceMatrix.needsUpdate=!0,x.visible=ve>0}function Z(ne){let he=0,pe=A.length;for(let ce of C){let De=ce.order/pe*.75,He=qa(De,De+.18,ne);if(He<=.001)continue;let ve=ce.size*He;F.set(ve,ve,ve),M.setMatrixAt(he++,I.compose(ce.pos,ce.q,F))}M.count=he,M.instanceMatrix.needsUpdate=!0,M.visible=he>0;let Re=0;N.identity();for(let ce of R){let De=ce.order/pe*.75,He=qa(De,De+.18,ne);if(He<=.001)continue;let ve=ce.size*He;F.set(ve,ve,ve),S.setMatrixAt(Re++,I.compose(ce.pos,N,F))}S.count=Re,S.instanceMatrix.needsUpdate=!0,S.visible=Re>0}let ie=new Ze;return{group:r,head:s,pave:M,halo:x,metals:u,stoneMaterial:p,get setting(){return re.concat(se)},bandEnds:f.ends,get bandGrow(){return f.g},update(ne){ne.band!==w.band&&(f.set(ne.band),w.band=ne.band);let he=ne.morph!==w.morph;if((he||ne.prongs!==w.prongs)&&(Y(ne.morph,ne.prongs),w.prongs=ne.prongs),(he||ne.halo!==w.halo)&&(V(ne.morph,ne.halo),w.halo=ne.halo),w.morph=ne.morph,ne.pave!==w.pave&&(Z(ne.pave),w.pave=ne.pave),ne.metal!==w.metal){let pe=Math.min(1,Math.floor(ne.metal));ie.copy(xA[pe]).lerp(xA[Math.min(2,pe+1)],Math.min(1,ne.metal-pe));for(let Re of u)Re.color.copy(ie);w.metal=ne.metal}},setRoughness(ne){o.roughness=ne,l.roughness=ne,c.roughness=ne+.05}}}function PR(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d");t.globalCompositeOperation="lighter";let n=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256*.16);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,250,240,0.55)"),n.addColorStop(1,"rgba(255,245,230,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);let r=(a,o,l,c)=>{t.save(),t.translate(256/2,256/2),t.rotate(a),t.scale(1,l);let u=t.createRadialGradient(0,0,0,0,0,o);u.addColorStop(0,`rgba(255,255,255,${c})`),u.addColorStop(.35,`rgba(255,250,242,${c*.35})`),u.addColorStop(1,"rgba(255,245,235,0)"),t.fillStyle=u,t.beginPath(),t.arc(0,0,o,0,Math.PI*2),t.fill(),t.restore()};r(0,256*.5,.022,.95),r(Math.PI/2,256*.5,.022,.95),r(Math.PI/4,256*.26,.02,.45),r(-Math.PI/4,256*.26,.02,.45);let s=new Qo(e);return s.colorSpace=it,s}function IR(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.2,"rgba(255,240,220,0.5)"),n.addColorStop(1,"rgba(255,230,200,0)"),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new Qo(e);return r.colorSpace=it,r}var r0=Math.cos(or.degToRad(4.5));function AA(i,{max:e=3,paveMax:t=3}={}){let n=PR(),r=IR(),s=(y,S=0)=>{let C=new Yo({map:y,blending:zc,depthWrite:!1,depthTest:!0,transparent:!0,rotation:S,toneMapped:!1}),R=new Rc(C);return R.visible=!1,R.renderOrder=10,i.add(R),R},a=[];for(let y=0;y<e+t;y++)a.push(s(n,.21));let o=[s(r),s(r)],l=()=>Eg,c=new L,u=new L,f=new L,h=new L,d=new L,g=new L,v=new L,p=new L,m=new $e,x=new je,A=new Vn,_=new L,M=new L,E=new L(0,1,0);function T(y,S,C,R,w){g.subVectors(S,C.position).normalize(),v.copy(g).reflect(y);let I=0,P=Math.cos(R),F=Math.sin(R);for(let N of l()){p.set(N.dir.x*P+N.dir.z*F,N.dir.y,-N.dir.x*F+N.dir.z*P);let O=v.dot(p);O>r0&&(I+=N.power*Math.pow((O-r0)/(1-r0),w))}return I}return{update(y,{diamond:S,pave:C,envAngle:R,strength:w=1,ends:I=null,endGlow:P=0,size:F=1}){let N=[];if(S&&S.visible&&w>0){let B=S.geometry.attributes.position.array,re=new Set;S.updateWorldMatrix(!0,!1),m.getNormalMatrix(S.matrixWorld);let se=S.matrixWorld.getMaxScaleOnAxis();for(let Te=0;Te<B.length/9;Te++){let Ce=Te*9;if(c.set(B[Ce],B[Ce+1],B[Ce+2]),u.set(B[Ce+3],B[Ce+4],B[Ce+5]),f.set(B[Ce+6],B[Ce+7],B[Ce+8]),h.subVectors(u,c).cross(d.subVectors(f,c)).normalize(),h.y<.25)continue;let Y=`${Math.round(h.x*40)},${Math.round(h.y*40)},${Math.round(h.z*40)}`;if(re.has(Y))continue;re.add(Y),d.copy(c).add(u).add(f).multiplyScalar(1/3),d.applyMatrix4(S.matrixWorld),h.applyMatrix3(m).normalize();let V=T(h,d,y,R,2.2);V>.05&&N.push({pos:d.clone().addScaledVector(h,.03*se),s:Math.min(1.4,V)*w,size:.42*se*F})}}N.sort((B,re)=>re.s-B.s);let O=N.slice(0,e),K=[];if(C&&C.visible&&C.count>0&&w>0){C.updateWorldMatrix(!0,!1);for(let B=0;B<C.count;B++){C.getMatrixAt(B,x),x.premultiply(C.matrixWorld),x.decompose(_,A,M),h.copy(E).applyQuaternion(A);let re=T(h,_,y,R,1.4);re>.05&&K.push({pos:_.clone().addScaledVector(h,.02),s:Math.min(1.1,re)*w,size:Math.max(M.x,.05)*2.6*F})}K.sort((B,re)=>re.s-B.s)}let X=O.concat(K.slice(0,t));a.forEach((B,re)=>{let se=X[re];if(B.visible=!!se,se){B.position.copy(se.pos);let Te=Math.min(1,se.s);B.scale.setScalar(se.size*(.45+.55*Te)),B.material.color.setScalar(1.25*se.s)}}),o.forEach((B,re)=>{B.visible=!!I&&P>.01,B.visible&&(B.position.copy(I[re]),B.scale.setScalar(.3),B.material.color.setScalar(3.2*P))})},hide(){a.forEach(y=>y.visible=!1),o.forEach(y=>y.visible=!1)}}}var Zi={high:{name:"high",dpr:2,supersample:1.5,msaa:4,bounces:8,waves:7,ss:4,exact:!0,cube:512,metal:512,grain:!0,dof:!0,ao:!0},medium:{name:"medium",dpr:1.5,supersample:1,msaa:2,bounces:6,waves:7,ss:1,exact:!0,cube:512,metal:256,grain:!0,dof:!1,ao:!1},low:{name:"low",dpr:1,supersample:1,msaa:0,bounces:4,waves:3,ss:1,exact:!1,cube:256,metal:256,grain:!1,dof:!1,ao:!1}},BR=[["#1b1712","#030304"],["#1a2333","#05070b"],["#2c2217","#090706"],["#ffffff","#ffffff"],["#1f2738","#0b0e14"]];function Nd(){return{tx:0,ty:Fd,tz:0,dist:3.6,az:.55,el:.3,fov:24,shift:0,shiftY:0,spin:0,wobble:1,shimmer:1,band:0,prongs:0,morph:0,metal:0,halo:0,pave:0,env:0,exposure:1,bg:0,glint:0,endGlow:1,glow:0,dof:0,focus:0}}var UR=`
	varying vec2 vUv;
	void main() {
		vUv = position.xy * 0.5 + 0.5;
		gl_Position = vec4( position.xy, 0.99999, 1.0 );
	}
`,LR=`
	uniform vec3 inner;
	uniform vec3 outer;
	uniform vec2 centre;
	uniform float aspect;
	varying vec2 vUv;
	void main() {
		vec2 d = ( vUv - centre ) * vec2( aspect, 1.0 );
		float t = smoothstep( 0.0, 1.05, length( d ) );
		vec3 c = mix( inner, outer, t );
		// A touch of dither so the gradient never bands.
		float n = fract( sin( dot( gl_FragCoord.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
		c += ( n - 0.5 ) / 255.0;
		gl_FragColor = vec4( c, 1.0 );
	}
`,s0=class extends Ga{constructor(){super("GradeEffect",`
			uniform float exposure;
			void mainImage( const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
				outputColor = vec4( inputColor.rgb * exposure, inputColor.a );
			}
		`,{uniforms:new Map([["exposure",new ge(1)]])})}};function SA(i,{tier:e=Zi.high,preserve:t=!1,aoPass:n=null}={}){let r=new Kf({canvas:i,antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",preserveDrawingBuffer:t});r.toneMapping=Yi,r.outputColorSpace=it;let s=new Ar,a=new _n(24,1,.05,80),o=vy(r,{size:e.cube,metal:e.metal});s.environment=o.env;let l=e.exact?gy():null,c=yA({cube:o.cube,rotation:o.rotation,studio:l});s.add(c.group),c.head.rotation.y=Math.PI/2;let u=gA(o.cube,{bounces:e.bounces,waves:e.waves,ss:e.ss,studio:l,setting:o.bright});u.material.uniforms.envRotation.value=o.rotation,c.head.add(u.mesh);let f=new at({vertexShader:UR,fragmentShader:LR,depthWrite:!1,depthTest:!1,uniforms:{inner:{value:new Ze},outer:{value:new Ze},centre:{value:new be(.5,.55)},aspect:{value:1}}}),h=new kt(new ss(2,2),f);h.frustumCulled=!1,h.renderOrder=-1e3,s.add(h);let d=AA(s),g,v,p,m,x=null,A=null,_=null,M=null,E=n,T={w:1,h:1};function y(P){g&&g.dispose(),g=new ny(r,{frameBufferType:ri,multisampling:P.msaa}),g.addPass(new cy(s,a)),M=null,P.ao&&E&&(M=new E(s,a,T.w,T.h),Object.assign(M.configuration,{aoRadius:.09,distanceFalloff:.6,intensity:2.2,aoSamples:16,denoiseSamples:8,denoiseRadius:8,gammaCorrection:!1,halfRes:!1}),g.addPass(M)),A=null,_=null,P.dof&&(A=new ly(a,{focusDistance:3,focusRange:.6,bokehScale:0,resolutionScale:.5}),_=new Tg(a,A),_.enabled=!1,g.addPass(_)),p=new sy({intensity:.35,luminanceThreshold:1.6,luminanceSmoothing:.4,mipmapBlur:!0,radius:.62,levels:8}),v=new s0;let F=new hy({mode:Ai.NEUTRAL});m=new fy({offset:.3,darkness:.55});let N=[p,v,F,m];x=null,P.grain&&(x=new uy({premultiply:!0,blendFunction:ht.SCREEN}),x.blendMode.opacity.value=.045,N.push(x)),g.addPass(new Tg(a,...N))}y(e);let S=new Ze,C=new Ze,R=BR.map((P,F)=>[new Ze(P[0]).multiplyScalar(F===3?2.2:1),new Ze(P[1]).multiplyScalar(F===3?2.2:1)]),w=[new L,new L];function I(P){let F=Math.max(0,Math.min(R.length-1,Math.floor(P))),N=Math.min(R.length-1,F+1),O=Math.min(1,Math.max(0,P-F));S.copy(R[F][0]).lerp(R[N][0],O),C.copy(R[F][1]).lerp(R[N][1],O),f.uniforms.inner.value.copy(S),f.uniforms.outer.value.copy(C)}return{renderer:r,scene:s,camera:a,ring:c,diamond:u,studio:o,tier:e,get size(){return T},resize(P,F,N){T.w=P,T.h=F,r.setPixelRatio(N),r.setSize(P,F,!1),g.setSize(P,F),a.aspect=P/F,f.uniforms.aspect.value=P/F,a.updateProjectionMatrix()},setTier(P){this.tier=P,u.setQuality({bounces:P.bounces,ss:P.ss,waves:P.waves,exact:P.exact}),y(P),g.setSize(T.w,T.h)},useAO(P){E=P,this.tier.ao&&(y(this.tier),g.setSize(T.w,T.h))},warm(){let P=r.getRenderTarget();r.setRenderTarget(g.inputBuffer);let F;try{F=r.compileAsync(s,a)}finally{r.setRenderTarget(P)}return F},render(P,F){let N=Math.cos(P.el),O=T.w/T.h,K=P.fov;if(O<1.25){let Z=Math.min(2.4,Math.pow(1.6/O,.62));K=or.radToDeg(2*Math.atan(Math.tan(or.degToRad(K/2))*Z))}a.fov=K,a.position.set(P.tx+P.dist*N*Math.sin(P.az),P.ty+P.dist*Math.sin(P.el),P.tz+P.dist*N*Math.cos(P.az)),a.up.set(0,1,0),a.lookAt(P.tx,P.ty,P.tz);let X=T.w,B=T.h,re=B>X*1.05,se=re?0:P.shift,Te=re?P.shiftY:0;se||Te?a.setViewOffset(X,B,-se*X*.5,Te*B*.5,X,B):a.clearViewOffset(),a.updateProjectionMatrix(),c.group.rotation.y=P.spin+P.wobble*Math.sin(F*.32)*.28,c.update(P),u.setMorph(P.morph),u.setSetting(c.setting,c.metals[1].color),u.material.uniforms.glow.value=P.glow;let Ce=P.env+P.shimmer*Math.sin(F*.19+1.3)*.42;o.setAngle(Ce),s.environmentRotation.y=Ce,I(P.bg),v.uniforms.get("exposure").value=P.exposure;let Y=Math.max(0,1-Math.abs(P.bg-3)*2);m.darkness=.55*(1-Y),p.intensity=.35*(1-Y),x&&(x.blendMode.opacity.value=.045*(1-Y)),_&&(_.enabled=P.dof>.01,A.bokehScale=P.dof*3.2,A.cocMaterial.focusDistance=P.focus||P.dist,A.cocMaterial.focusRange=.25+P.dist*.12),s.updateMatrixWorld();let V=P.band>.001&&P.band<.999;w[0].copy(c.bandEnds[0]).applyMatrix4(c.group.matrixWorld),w[1].copy(c.bandEnds[1]).applyMatrix4(c.group.matrixWorld),d.update(a,{diamond:u.mesh,pave:c.pave,envAngle:Ce,strength:P.glint,ends:w,endGlow:V?P.endGlow*Math.min(1,(1-P.band)*6):0}),g.render()}}}var FR=18,Od={opening:[0,4.6],shapes:[4.6,11.8],details:[11.8,18]},a0=[{in:-1,out:.5,hold:.01},{in:2,out:4.3,hold:4.4},{in:5.2,out:8.4,hold:5.9},{in:9.55,out:11.5,hold:11.6},{in:12.75,out:14.8,hold:14.8},{in:15.6,out:0,hold:17.9}],MA=[5.55,6.4,7.3,8.2],TA=[9.3,10.4,11.4];function EA(){return Object.assign(Nd(),{tx:0,ty:2.2,tz:0,dist:3.4,az:.55,el:.3,fov:24,shift:.33,shiftY:.6,wobble:1,shimmer:1,bg:0})}function bA(i,e){let t=(n,r,s,a)=>i.to(e,{...r,duration:s,ease:a},n);return t(0,{dist:3,az:.95,env:.9},1.4,"none"),t(1.4,{tx:0,ty:.85,dist:11,el:.16,az:.42,shift:.3,shiftY:.24,wobble:.5},2),t(1.7,{band:1},1.8),t(3.3,{prongs:1},1,"power2.out"),t(3.4,{dist:10.2,ty:.75,az:.3,env:1.6},1.2,"power1.inOut"),t(4.6,{ty:2.2,dist:4.4,el:1.42,az:0,shift:.3,shiftY:.27,wobble:0,spin:0,dof:.55},1),t(5.7,{morph:1},.55),t(6.6,{morph:2},.55),t(7.5,{morph:3},.55),t(8.35,{morph:4},.45),t(8.6,{ty:.7,dist:9.4,el:.06,az:.95,shift:-.3,shiftY:.4,wobble:.3,dof:0},1.1),t(8.6,{spin:.7},3.2,"none"),t(9.6,{metal:1,env:2.9},.7),t(10.6,{metal:2,env:4.3},.7),t(11.8,{tx:0,ty:2.06,dist:2.7,el:-.04,az:.3,fov:22,shift:-.28,shiftY:.24,wobble:.15,spin:0,dof:1},1),t(12.5,{halo:1},1,"none"),t(13.5,{tx:.7,ty:1.25,dist:3.7,el:.36,az:.35,shift:-.42},1.2),t(13.7,{pave:1},1,"none"),t(15,{tx:0,ty:.55,dist:12.5,el:.2,az:.85,fov:24,shift:.42,shiftY:.3,bg:2,exposure:.92,wobble:.6,dof:0},1.4),t(15,{spin:1.2},3,"none"),i.set({},{},FR),i}function wA(i){if(i&&Zi[i])return Zi[i];let e=matchMedia("(pointer: coarse)").matches,t=Math.min(screen.width,screen.height)<820,n=navigator.hardwareConcurrency||8,r=navigator.deviceMemory||8;return e&&t?r<=3||n<=2?Zi.low:Zi.medium:n<=4||r<=4?Zi.medium:Zi.high}function CA(i=!1){if(i||navigator.connection&&navigator.connection.saveData)return!1;try{let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;let t=e.getExtension("WEBGL_lose_context");return t&&t.loseContext(),!0}catch{return!1}}var RA={THREE:{Color:Ze,WebGLRenderTarget:gt,LinearFilter:Gt,NearestFilter:Ct,HalfFloatType:ri,RGBAFormat:Sn,DepthTexture:Ii,UnsignedInt248Type:Nr,UnsignedIntType:An,DepthStencilFormat:ar,DepthFormat:rr,Matrix4:je,DataTexture:sr,ShaderMaterial:at,NoColorSpace:yi,RepeatWrapping:Ho,Vector2:be,REVISION:Wn,RedFormat:zs,FloatType:nn,GLSL3:Qc,Vector3:L,Sphere:Lr,BufferAttribute:vt,BufferGeometry:Kt,Float32BufferAttribute:yn,OrthographicCamera:as,Mesh:kt},PP:{Pass:Si}};Rr.registerPlugin(lt,ih);var l0=new URLSearchParams(location.search),fs=l0.has("capture"),ia=!fs&&matchMedia("(prefers-reduced-motion: reduce)").matches,ra=(i,e=document)=>e.querySelector(i),hs=(i,e=document)=>[...e.querySelectorAll(i)],Mr=document.documentElement,DA=window.wkFilm&&window.wkFilm.ao||"";function NR(){return document.body.classList.contains("elementor-editor-active")||!!(window.elementorFrontend&&window.elementorFrontend.isEditMode&&window.elementorFrontend.isEditMode())}function o0(){let i=ra(".wk-sticky"),e=i&&ra(".hd",i);if(!e)return 0;let t=parseFloat(getComputedStyle(Mr).getPropertyValue("--wp-admin--admin-bar--height"))||0;return e.offsetHeight+t}function OR(i){return new Promise(e=>window.requestIdleCallback?requestIdleCallback(()=>e(),{timeout:i}):setTimeout(e,1))}async function PA(){let i=hs(".wk-film .film-act");if(!i.length||Mr.classList.contains("film-on"))return;if(NR()){Mr.classList.add("film-editor");return}Mr.classList.add("film-on"),fs&&Mr.classList.add("film-capture");let e="",t=()=>{let Y=o0(),V=i.find(ne=>ne.dataset.act==="opening"),Z=V?Math.max(0,Math.round(V.getBoundingClientRect().top+scrollY-Y)):0,ie=Y+"|"+Math.round(Math.min(Z,innerHeight*.3));return ie===e?!1:(e=ie,Mr.style.setProperty("--film-top",Y+"px"),Mr.style.setProperty("--film-lift",ie.split("|")[1]+"px"),!0)};t();let n=CA(l0.has("no3d"));n||Mr.classList.add("film-no3d"),document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise(Y=>setTimeout(Y,2500))]),t();let r=EA(),s=bA(Rr.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),r),a=i.find(Y=>Y.dataset.act==="opening");hs(".film-chap").forEach(Y=>{let V=Number(Y.dataset.chapter),Z=a0[V];if(!Z)return;if(V===0){s.to(Y,{autoAlpha:0,y:-40,duration:.45,ease:"power2.in"},Z.out);return}let ie=ra("[data-split]",Y),ne=ie?ih.create(ie,{type:"lines",mask:"lines",linesClass:"film-line"}).lines:[],he=hs(":scope > :not([data-split])",Y);s.set(Y,{autoAlpha:1},Z.in),ne.length&&s.from(ne,{yPercent:115,stagger:.07,duration:.55,ease:"power3.out"},Z.in),s.from(he,{opacity:0,y:18,stagger:.06,duration:.5,ease:"power2.out"},Z.in+.12),Z.out&&s.to(Y,{autoAlpha:0,y:-30,duration:.45,ease:"power2.in"},Z.out)}),hs(".film-cue").forEach(Y=>s.to(Y,{opacity:0,duration:.2},.1)),hs(".film-year").forEach(Y=>s.fromTo(Y,{opacity:0,yPercent:8},{opacity:1,yPercent:0,duration:1.2,ease:"power2.out"},15.3)),hs(".film-scrim.l").forEach(Y=>{s.to(Y,{opacity:0,duration:.6},8.7),s.to(Y,{opacity:1,duration:.6},15)}),hs(".film-scrim.r").forEach(Y=>{s.to(Y,{opacity:1,duration:.6},8.9),s.to(Y,{opacity:0,duration:.6},14.8)});let o=hs("[data-film-shape]"),l=hs("[data-film-metal]"),c="";s.eventCallback("onUpdate",()=>{let Y=Math.round(r.morph)%4,V=Math.round(r.metal),Z=Y+"|"+V;Z!==c&&(c=Z,o.forEach(ie=>ie.setAttribute("aria-pressed",String(Number(ie.dataset.filmShape)===Y))),l.forEach(ie=>ie.setAttribute("aria-pressed",String(Number(ie.dataset.filmMetal)===V))))});let u=null,f=(Y,V)=>{let[Z,ie]=Od[Y.dataset.act],ne=Y.getBoundingClientRect().top+scrollY-o0(),he=Y.offsetHeight-ra(".film-stage",Y).offsetHeight,pe=Math.round(ne+(V-Z)/(ie-Z)*he);u=ia?{y:pe,t:V}:null,window.scrollTo({top:pe,behavior:ia?"auto":"smooth"}),u&&h(V)};o.forEach(Y=>Y.addEventListener("click",()=>f(Y.closest(".film-act"),MA[Number(Y.dataset.filmShape)]))),l.forEach(Y=>Y.addEventListener("click",()=>f(Y.closest(".film-act"),TA[Number(Y.dataset.filmMetal)])));let h=Y=>{fs||ia?(Rr.killTweensOf(s),s.time(Y)):Rr.to(s,{time:Y,duration:.5,ease:"power3.out",overwrite:!0})},d=(Y,V)=>{let[Z,ie]=Od[Y.dataset.act]||Od.opening;if(u&&Math.abs(scrollY-u.y)<3)return u.t;if(u=null,ia){let ne=a0.filter(he=>he.hold>=Z&&he.hold<=ie).map(he=>he.hold);return ne[Math.min(ne.length-1,Math.floor(V*ne.length))]??Z}return Z+V*(ie-Z)},g=i.map(Y=>lt.create({trigger:Y,start:()=>"top top+="+o0(),end:"bottom bottom",invalidateOnRefresh:!0,onUpdate:V=>{h(d(Y,V.progress));let Z=ra(".film-bar",Y);Z&&(Z.style.transform=`scaleX(${V.progress.toFixed(4)})`)}}));lt.config({ignoreMobileResize:!0});let v=()=>{t()&&lt.refresh()};document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",()=>setTimeout(v,0)),addEventListener("load",v);{let Y=i.findIndex(V=>V.getBoundingClientRect().bottom>0&&V.getBoundingClientRect().top<innerHeight);Y<0&&(Y=i.reduce((V,Z,ie)=>Z.getBoundingClientRect().bottom<=0?ie:V,-1)),Rr.killTweensOf(s),s.time(Y<0?0:d(i[Y],g[Y].progress))}let p=null,m=!1,x=document.createElement("canvas");x.className="film-canvas",x.setAttribute("aria-hidden","true");let A=()=>{p=null,m=!1,i.forEach(Y=>Y.classList.remove("is-live")),Mr.classList.add("film-no3d")};x.addEventListener("webglcontextlost",Y=>{Y.preventDefault(),A()});let _=1,M=()=>{if(!p)return;let Y=x.clientWidth||innerWidth,V=x.clientHeight||innerHeight,Z=Math.min(Math.max(devicePixelRatio||1,p.tier.supersample||1),p.tier.dpr)*_,ie=p.tier.name==="high"?42e5:26e5;Y*V*Z*Z>ie&&(Z=Math.sqrt(ie/(Y*V))),p.resize(Y,V,Math.max(.6,Z))},E={e:1},T=!1,y=()=>{T=!0;let Y=a&&ra(".film-poster img",a),V=Y&&Y.getAnimations?Y.getAnimations().find(he=>he.playState==="running"):null;if(!V)return;let Z=/brightness\(([\d.]+)\)/.exec(getComputedStyle(Y).filter),ie=Z?Math.min(1,Number(Z[1])):1,ne=(V.effect.getComputedTiming().endTime-V.currentTime)/1e3;E.e=Math.pow(ie,2.2),Rr.to(E,{e:1,duration:Math.max(.3,ne),ease:"power2.out"})},S=null,C=null,R=!0,w=Nd(),I={x:0,y:0,sx:0,sy:0};!fs&&!ia&&matchMedia("(pointer: fine)").matches&&addEventListener("pointermove",Y=>{I.x=Y.clientX/innerWidth*2-1,I.y=Y.clientY/innerHeight*2-1},{passive:!0});let P=()=>{let Y=null,V=0;for(let Z of i){let ie=Z.getBoundingClientRect(),ne=Math.min(innerHeight,ie.bottom)-Math.max(0,ie.top);ne>V&&(V=ne,Y=Z)}if(Y!==S&&(S=Y,R=!0,Mr.classList.toggle("film-playing",!!S)),p&&S&&C!==S){C&&C.classList.remove("is-live"),C=S;let Z=ra(".film-stage",S);Z.insertBefore(x,Z.firstChild),M(),R=!0}},F=0,N=0,O=0,K=Y=>{if(F){let Z=Y-F;Z<250&&(N+=Z,O++)}if(F=Y,O<90)return;let V=N/O;N=0,O=0,!(V<27)&&(p.tier.name==="high"?p.setTier(Zi.medium):p.tier.name==="medium"?p.setTier(Zi.low):_>.7&&(_=Math.max(.7,_-.15)),M())},X=null,B=Y=>{if(!p||!m||!S)return;X===null&&(X=Y),Y-=X,!T&&S===a&&!fs&&y();let V=Object.assign(w,r);V.exposure=r.exposure*E.e,fs||(I.sx+=(I.x-I.sx)*.05,I.sy+=(I.y-I.sy)*.035,V.az+=I.sx*.06,V.el+=I.sy*.035),p.render(V,ia?0:Y),S.classList.add("is-live")},re=0;addEventListener("resize",()=>{clearTimeout(re),re=setTimeout(()=>{v(),M(),R=!0},120)});let se=async()=>{if(n){fs||await OR(600);try{p=SA(x,{tier:wA(l0.get("tier")),preserve:fs})}catch{A();return}P(),M();try{await p.warm()}catch{}p&&(m=!0,R=!0,Te())}},Te=()=>{if(!DA||!p.tier.ao)return;window.__wulfFilmLib=RA;let Y=document.createElement("script");Y.src=DA,Y.async=!0,Y.onload=()=>{p&&p.tier.ao&&window.WulfFilmAO&&(p.useAO(window.WulfFilmAO),R=!0)},document.head.appendChild(Y)},Ce=se();if(!fs){let Y=-1;Rr.ticker.add(V=>{if(P(),!p||!m||!S){F=0;return}let Z=s.time()!==Y||E.e<1;Y=s.time(),!(ia&&!Z&&!R)&&(R=!1,B(V),ia||K(performance.now()))})}window.__film={started:Ce,live:()=>!!(p&&m),tier:()=>p&&p.tier.name,setTier(Y){p&&Zi[Y]&&(p.setTier(Zi[Y]),M())},height:()=>Mr.scrollHeight-innerHeight,top:Y=>ra(Y).getBoundingClientRect().top+scrollY,frame(Y,V=0){return window.scrollTo(0,Y),lt.update(),P(),B(V),{act:S&&S.dataset.act,t:s.time(),tier:p&&p.tier.name}},at(Y,V=0){return Rr.killTweensOf(s),s.time(Y),P(),X=0,B(V),{act:S&&S.dataset.act,t:s.time()}},ao:()=>!!window.WulfFilmAO}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",PA):PA();})();
