/*! Wulf Elementor Kit: cinematic film (3D). Built from cinematic-home/src/wp.js; do not edit by hand.
 * Includes three.js 0.183.2 (MIT), postprocessing 6.39.5 (Zlib), three-mesh-bvh 0.9.16 (MIT),
 * and GSAP 3.15.0 with ScrollTrigger and SplitText (GSAP standard no-charge license, gsap.com/standard-license). */
(()=>{var BA=Object.defineProperty;var UA=(i,e)=>{for(var t in e)BA(i,t,{get:e[t],enumerable:!0})};function $r(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function tv(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}var Ui={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Yl={duration:.5,overwrite:!1,delay:0},wp,Vn,en,sr=1e8,Yt=1/sr,gp=Math.PI*2,LA=gp/4,FA=0,nv=Math.sqrt,NA=Math.cos,OA=Math.sin,Cn=function(e){return typeof e=="string"},cn=function(e){return typeof e=="function"},ts=function(e){return typeof e=="number"},Yu=function(e){return typeof e>"u"},Lr=function(e){return typeof e=="object"},Bi=function(e){return e!==!1},bp=function(){return typeof window<"u"},Nu=function(e){return cn(e)||Cn(e)},iv=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ti=Array.isArray,zA=/random\([^)]+\)/g,kA=/,\s*/g,q0=/(?:-?\.?\d|\.)+/gi,Cp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Aa=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,cp=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Rp=/[+-]=-?[.\d]+/,HA=/[^,'"\[\]\s]+/gi,GA=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,sn,Br,vp,Dp,Vi={},Hu={},rv,sv=function(e){return(Hu=uo(e,Vi))&&ni},qu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ql=function(e,t){return!t&&console.warn(e)},av=function(e,t){return e&&(Vi[e]=t)&&Hu&&(Hu[e]=t)||Vi},Ql=function(){return 0},VA={suppressEvents:!0,isStart:!0,kill:!1},Ou={suppressEvents:!0,kill:!1},WA={suppressEvents:!0},Pp={},Ds=[],xp={},ov,Pi={},up={},Q0=30,zu=[],Ip="",Bp=function(e){var t=e[0],n,r;if(Lr(t)||cn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=zu.length;r--&&!zu[r].targetTest(t););n=zu[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Np(e[r],n)))||e.splice(r,1);return e},Ps=function(e){return e._gsap||Bp(ar(e))[0]._gsap},Up=function(e,t,n){return(n=e[t])&&cn(n)?e[t]():Yu(n)&&e.getAttribute&&e.getAttribute(t)||n},mi=function(e,t){return(e=e.split(",")).forEach(t)||e},un=function(e){return Math.round(e*1e5)/1e5||0},rn=function(e){return Math.round(e*1e7)/1e7||0},Sa=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},XA=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Gu=function(){var e=Ds.length,t=Ds.slice(0),n,r;for(xp={},Ds.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Lp=function(e){return!!(e._initted||e._startAt||e.add)},lv=function(e,t,n,r){Ds.length&&!Vn&&Gu(),e.render(t,n,r||!!(Vn&&t<0&&Lp(e))),Ds.length&&!Vn&&Gu()},cv=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(HA).length<2?t:Cn(e)?e.trim():e},uv=function(e){return e},Wi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},YA=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},uo=function(e,t){for(var n in t)e[n]=t[n];return e},Z0=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Lr(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Vu=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Vl=function(e){var t=e.parent||sn,n=e.keyframes?YA(ti(e.keyframes)):Wi;if(Bi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},qA=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},hv=function(e,t,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var a=e[r],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Qu=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Is=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},xa=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},QA=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},_p=function(e,t,n,r){return e._startAt&&(Vn?e._startAt.revert(Ou):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},ZA=function i(e){return!e||e._ts&&i(e.parent)},K0=function(e){return e._repeat?ho(e._tTime,e=e.duration()+e._rDelay)*e:0},ho=function(e,t){var n=Math.floor(e=rn(e/t));return e&&n===e?n-1:n},Wu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Zu=function(e){return e._end=rn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Yt)||0))},Ku=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=rn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Zu(e),n._dirty||xa(n,e)),e},fv=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Wu(e.rawTime(),t),(!t._dur||Jl(0,t.totalDuration(),n)-t._tTime>Yt)&&t.render(n,!0)),xa(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Yt}},Ur=function(e,t,n,r){return t.parent&&Is(t),t._start=rn((ts(n)?n:n||e!==sn?rr(e,n,t):e._time)+t._delay),t._end=rn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),hv(e,t,"_first","_last",e._sort?"_start":0),yp(t)||(e._recent=t),r||fv(e,t),e._ts<0&&Ku(e,e._tTime),e},dv=function(e,t){return(Vi.ScrollTrigger||qu("scrollTrigger",t))&&Vi.ScrollTrigger.create(t,e)},pv=function(e,t,n,r,s){if(kp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Vn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ov!==Ii.frame)return Ds.push(e),e._lazy=[s,r],1},KA=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},yp=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},JA=function(e,t,n,r){var s=e.ratio,a=t<0||!t&&(!e._start&&KA(e)&&!(!e._initted&&yp(e))||(e._ts<0||e._dp._ts<0)&&!yp(e))?0:1,o=e._rDelay,l=0,c,u,f;if(o&&e._repeat&&(l=Jl(0,e._tDur,t),u=ho(l,o),e._yoyo&&u&1&&(a=1-a),u!==ho(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||Vn||r||e._zTime===Yt||!t&&e._zTime){if(!e._initted&&pv(e,t,r,n,l))return;for(f=e._zTime,e._zTime=t||(n?Yt:0),n||(n=t&&!f),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&_p(e,t,n,!0),e._onUpdate&&!n&&Gi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Gi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Is(e,1),!n&&!Vn&&(Gi(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},jA=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},fo=function(e,t,n,r){var s=e._repeat,a=rn(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:rn(a*(s+1)+e._rDelay*s):a,o>0&&!r&&Ku(e,e._tTime=e._tDur*o),e.parent&&Zu(e),n||xa(e.parent,e),e},J0=function(e){return e instanceof ei?xa(e):fo(e,e._dur)},$A={_start:0,endTime:Ql,totalDuration:Ql},rr=function i(e,t,n){var r=e.labels,s=e._recent||$A,a=e.duration()>=sr?s.endTime(!1):e._dur,o,l,c;return Cn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in r||(r[t]=a),r[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(ti(n)?n[0]:n).totalDuration()),o>1?i(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Wl=function(e,t,n){var r=ts(t[1]),s=(r?2:1)+(e<2?0:1),a=t[s],o,l;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Bi(l.vars.inherit)&&l.parent;a.immediateRender=Bi(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new gn(t[0],a,t[s+1])},Bs=function(e,t){return e||e===0?t(e):t},Jl=function(e,t,n){return n<e?e:n>t?t:n},Wn=function(e,t){return!Cn(e)||!(t=GA.exec(e))?"":t[1]},eS=function(e,t,n){return Bs(n,function(r){return Jl(e,t,r)})},Ap=[].slice,mv=function(e,t){return e&&Lr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Lr(e[0]))&&!e.nodeType&&e!==Br},tS=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return Cn(r)&&!t||mv(r,1)?(s=n).push.apply(s,ar(r)):n.push(r)})||n},ar=function(e,t,n){return en&&!t&&en.selector?en.selector(e):Cn(e)&&!n&&(vp||!po())?Ap.call((t||Dp).querySelectorAll(e),0):ti(e)?tS(e,n):mv(e)?Ap.call(e,0):e?[e]:[]},Sp=function(e){return e=ar(e)[0]||ql("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return ar(t,n.querySelectorAll?n:n===e?ql("Invalid scope")||Dp.createElement("div"):e)}},gv=function(e){return e.sort(function(){return .5-Math.random()})},vv=function(e){if(cn(e))return e;var t=Lr(e)?e:{each:e},n=_a(t.ease),r=t.from||0,s=parseFloat(t.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=t.axis,u=r,f=r;return Cn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],f=r[1]),function(h,d,p){var v=(p||t).length,g=a[v],m,x,_,y,S,T,E,A,M;if(!g){if(M=t.grid==="auto"?0:(t.grid||[1,sr])[1],!M){for(E=-sr;E<(E=p[M++].getBoundingClientRect().left)&&M<v;);M<v&&M--}for(g=a[v]=[],m=l?Math.min(M,v)*u-.5:r%M,x=M===sr?0:l?v*f/M-.5:r/M|0,E=0,A=sr,T=0;T<v;T++)_=T%M-m,y=x-(T/M|0),g[T]=S=c?Math.abs(c==="y"?y:_):nv(_*_+y*y),S>E&&(E=S),S<A&&(A=S);r==="random"&&gv(g),g.max=E-A,g.min=A,g.v=v=(parseFloat(t.amount)||parseFloat(t.each)*(M>v?v-1:c?c==="y"?v/M:M:Math.max(M,v/M))||0)*(r==="edges"?-1:1),g.b=v<0?s-v:s,g.u=Wn(t.amount||t.each)||0,n=n&&v<0?pS(n):n}return v=(g[h]-g.min)/g.max||0,rn(g.b+(n?n(v):v)*g.v)+g.u}},Mp=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=rn(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(ts(n)?0:Wn(n))}},xv=function(e,t){var n=ti(e),r,s;return!n&&Lr(e)&&(r=n=e.radius||sr,e.values?(e=ar(e.values),(s=!ts(e[0]))&&(r*=r)):e=Mp(e.increment)),Bs(t,n?cn(e)?function(a){return s=e(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=sr,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-o,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-o),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:a,s||u===a||ts(a)?u:u+Wn(a)}:Mp(e))},_v=function(e,t,n,r){return Bs(ti(e)?!t:n===!0?!!(n=0):!r,function(){return ti(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},nS=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,a){return a(s)},r)}},iS=function(e,t){return function(n){return e(parseFloat(n))+(t||Wn(n))}},rS=function(e,t,n){return Av(e,t,0,1,n)},yv=function(e,t,n){return Bs(n,function(r){return e[~~t(r)]})},sS=function i(e,t,n){var r=t-e;return ti(e)?yv(e,i(0,e.length),t):Bs(n,function(s){return(r+(s-e)%r)%r+e})},aS=function i(e,t,n){var r=t-e,s=r*2;return ti(e)?yv(e,i(0,e.length-1),t):Bs(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>r?s-a:a)})},mo=function(e){return e.replace(zA,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(kA);return _v(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},Av=function(e,t,n,r,s){var a=t-e,o=r-n;return Bs(s,function(l){return n+((l-e)/a*o||0)})},oS=function i(e,t,n,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=Cn(e),o={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),a)e={p:e},t={p:t};else if(ti(e)&&!ti(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(p){p*=f;var v=Math.min(h,~~p);return u[v](p-v)},n=t}else r||(e=uo(ti(e)?[]:{},e));if(!u){for(l in t)Op.call(o,e,l,"get",t[l]);s=function(p){return Vp(p,o)||(a?e.p:e)}}}return Bs(n,s)},j0=function(e,t,n){var r=e.labels,s=sr,a,o,l;for(a in r)o=r[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Gi=function(e,t,n){var r=e.vars,s=r[t],a=en,o=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&Ds.length&&Gu(),o&&(en=o),u=l?s.apply(c,l):s.call(c),en=a,u},Hl=function(e){return Is(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Vn),e.progress()<1&&Gi(e,"onInterrupt"),e},co,Sv=[],Mv=function(e){if(e)if(e=!e.name&&e.default||e,bp()||e.headless){var t=e.name,n=cn(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ql,render:Vp,add:Op,kill:TS,modifier:MS,rawVars:0},a={targetTest:0,get:0,getSetter:Ju,aliases:{},register:0};if(po(),e!==r){if(Pi[t])return;Wi(r,Wi(Vu(e,s),a)),uo(r.prototype,uo(s,Vu(e,a))),Pi[r.prop=t]=r,e.targetTest&&(zu.push(r),Pp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}av(t,r),e.register&&e.register(ni,r,gi)}else Sv.push(e)},Xt=255,Gl={aqua:[0,Xt,Xt],lime:[0,Xt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Xt],navy:[0,0,128],white:[Xt,Xt,Xt],olive:[128,128,0],yellow:[Xt,Xt,0],orange:[Xt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Xt,0,0],pink:[Xt,192,203],cyan:[0,Xt,Xt],transparent:[Xt,Xt,Xt,0]},hp=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Xt+.5|0},Tv=function(e,t,n){var r=e?ts(e)?[e>>16,e>>8&Xt,e&Xt]:0:Gl.black,s,a,o,l,c,u,f,h,d,p;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Gl[e])r=Gl[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Xt,r&Xt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Xt,e&Xt]}else if(e.substr(0,3)==="hsl"){if(r=p=e.match(q0),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=hp(l+1/3,s,a),r[1]=hp(l,s,a),r[2]=hp(l-1/3,s,a);else if(~e.indexOf("="))return r=e.match(Cp),n&&r.length<4&&(r[3]=1),r}else r=e.match(q0)||Gl.transparent;r=r.map(Number)}return t&&!p&&(s=r[0]/Xt,a=r[1]/Xt,o=r[2]/Xt,f=Math.max(s,a,o),h=Math.min(s,a,o),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(a-o)/d+(a<o?6:0):f===a?(o-s)/d+2:(s-a)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Ev=function(e){var t=[],n=[],r=-1;return e.split(es).forEach(function(s){var a=s.match(Aa)||[];t.push.apply(t,a),n.push(r+=a.length+1)}),t.c=n,t},$0=function(e,t,n){var r="",s=(e+r).match(es),a=t?"hsla(":"rgba(",o=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=Tv(h,t,1))&&a+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=Ev(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(es,"1").split(Aa),f=c.length-1;o<f;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(es),f=c.length-1;o<f;o++)r+=c[o]+s[o];return r+c[f]},es=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Gl)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),lS=/hsl[a]?\(/,Fp=function(e){var t=e.join(" "),n;if(es.lastIndex=0,es.test(t))return n=lS.test(t),e[1]=$0(e[1],n),e[0]=$0(e[0],n,Ev(e[1])),!0},Zl,Ii=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,f,h,d,p=function v(g){var m=i()-r,x=g===!0,_,y,S,T;if((m>e||m<0)&&(n+=m-t),r+=m,S=r-n,_=S-a,(_>0||x)&&(T=++f.frame,h=S-f.time*1e3,f.time=S=S/1e3,a+=_+(_>=s?4:s-_),y=1),x||(l=c(v)),y)for(d=0;d<o.length;d++)o[d](S,h,T,g)};return f={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(g){return h/(1e3/(g||60))},wake:function(){rv&&(!vp&&bp()&&(Br=vp=window,Dp=Br.document||{},Vi.gsap=ni,(Br.gsapVersions||(Br.gsapVersions=[])).push(ni.version),sv(Hu||Br.GreenSockGlobals||!Br.gsap&&Br||{}),Sv.forEach(Mv)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(g){return setTimeout(g,a-f.time*1e3+1|0)},Zl=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Zl=0,c=Ql},lagSmoothing:function(g,m){e=g||1/0,t=Math.min(m||33,e)},fps:function(g){s=1e3/(g||240),a=f.time*1e3+s},add:function(g,m,x){var _=m?function(y,S,T,E){g(y,S,T,E),f.remove(_)}:g;return f.remove(g),o[x?"unshift":"push"](_),po(),_},remove:function(g,m){~(m=o.indexOf(g))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},f}(),po=function(){return!Zl&&Ii.wake()},yt={},cS=/^[\d.\-M][\d.\-,\s]/,uS=/["']/g,hS=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[r]=isNaN(c)?c.replace(uS,"").trim():+c,r=l.substr(o+1).trim();return t},fS=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},dS=function(e){var t=(e+"").split("("),n=yt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[hS(t[1])]:fS(e).split(",").map(cv)):yt._CE&&cS.test(e)?yt._CE("",e):n},pS=function(e){return function(t){return 1-e(1-t)}},_a=function(e,t){return e&&(cn(e)?e:yt[e]||dS(e))||t},Ma=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},a;return mi(e,function(o){yt[o]=Vi[o]=s,yt[a=o.toLowerCase()]=n;for(var l in s)yt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=yt[o+"."+l]=s[l]}),s},wv=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},fp=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/gp*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*OA((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:wv(o);return s=gp/s,l.config=function(c,u){return i(e,c,u)},l},dp=function i(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:wv(n);return r.config=function(s){return i(e,s)},r};mi("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;Ma(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});yt.Linear.easeNone=yt.none=yt.Linear.easeIn;Ma("Elastic",fp("in"),fp("out"),fp());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(o){return o<t?i*o*o:o<n?i*Math.pow(o-1.5/e,2)+.75:o<r?i*(o-=2.25/e)*o+.9375:i*Math.pow(o-2.625/e,2)+.984375};Ma("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);Ma("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Ma("Circ",function(i){return-(nv(1-i*i)-1)});Ma("Sine",function(i){return i===1?1:-NA(i*LA)+1});Ma("Back",dp("in"),dp("out"),dp());yt.SteppedEase=yt.steps=Vi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,a=1-Yt;return function(o){return((r*Jl(0,a,o)|0)+s)*n}}};Yl.ease=yt["quad.out"];mi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Ip+=i+","+i+"Params,"});var Np=function(e,t){this.id=FA++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Up,this.set=t?t.getSetter:Ju},Kl=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,fo(this,+t.duration,1,1),this.data=t.data,en&&(this._ctx=en,en.data.push(this)),Zl||Ii.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,fo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(po(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Ku(this,n),!s._dp||s.parent||fv(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ur(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Yt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),lv(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+K0(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+K0(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?ho(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Yt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Wu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Yt?0:this._rts,this.totalTime(Jl(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Zu(this),QA(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(po(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Yt&&(this._tTime-=Yt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=rn(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Ur(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Bi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Wu(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=WA);var r=Vn;return Vn=n,Lp(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Vn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,J0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,J0(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(rr(this,n),Bi(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,Bi(r)),this._dur||(this._zTime=-Yt),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Yt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Yt,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Yt)},e.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(a){var o=cn(n)?n:uv,l=function(){var u=r.then;r.then=null,s&&s(),cn(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=u),a(o),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Hl(this)},i}();Wi(Kl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Yt,_prom:0,_ps:!1,_rts:1});var ei=function(i){tv(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Bi(n.sortChildren),sn&&Ur(n.parent||sn,$r(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&dv($r(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,a){return Wl(0,arguments,this),this},t.from=function(r,s,a){return Wl(1,arguments,this),this},t.fromTo=function(r,s,a,o){return Wl(2,arguments,this),this},t.set=function(r,s,a){return s.duration=0,s.parent=this,Vl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new gn(r,s,rr(this,a),1),this},t.call=function(r,s,a){return Ur(this,gn.delayedCall(0,r,s),a)},t.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new gn(r,a,rr(this,l)),this},t.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,Vl(a).immediateRender=Bi(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},t.staggerFromTo=function(r,s,a,o,l,c,u,f){return o.startAt=a,Vl(o).immediateRender=Bi(o.immediateRender),this.staggerTo(r,s,o,l,c,u,f)},t.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:rn(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,p,v,g,m,x,_,y,S,T,E;if(this!==sn&&u>l&&r>=0&&(u=l),u!==this._tTime||a||f){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),h=u,y=this._start,_=this._ts,m=!_,f&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,g=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(g*100+r,s,a);if(h=rn(u%g),u===l?(v=this._repeat,h=c):(S=rn(u/g),v=~~S,v&&v===S&&(h=c,v--),h>c&&(h=c)),S=ho(this._tTime,g),!o&&this._tTime&&S!==v&&this._tTime-S*g-this._dur<=0&&(S=v),T&&v&1&&(h=c-h,E=1),v!==S&&!this._lock){var A=T&&S&1,M=A===(T&&v&1);if(v<S&&(A=!A),o=A?0:u%c?c:u,this._lock=1,this.render(o||(E?0:rn(v*g)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Gi(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,S=v),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,o=A?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=jA(this,rn(o),rn(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!!_,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&u&&c&&!s&&!S&&(Gi(this,"onStart"),this._tTime!==u))return this;if(h>=o&&r>=0)for(d=this._first;d;){if(p=d._next,(d._act||h>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,a),h!==this._time||!this._ts&&!m){x=0,p&&(u+=this._zTime=-Yt);break}}d=p}else{d=this._last;for(var C=r<0?r:h;d;){if(p=d._prev,(d._act||C<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,s,a||Vn&&Lp(d)),h!==this._time||!this._ts&&!m){x=0,p&&(u+=this._zTime=C?-Yt:Yt);break}}d=p}}if(x&&!s&&(this.pause(),x.render(h>=o?0:-Yt)._zTime=h>=o?1:-1,this._ts))return this._start=y,Zu(this),this.render(r,s,a);this._onUpdate&&!s&&Gi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(y===this._start||Math.abs(_)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Is(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(Gi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var a=this;if(ts(s)||(s=rr(this,s,r)),!(r instanceof Kl)){if(ti(r))return r.forEach(function(o){return a.add(o,s)}),this;if(Cn(r))return this.addLabel(r,s);if(cn(r))r=gn.delayedCall(0,r);else return this}return this!==r?Ur(this,r,s):this},t.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-sr);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof gn?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},t.remove=function(r){return Cn(r)?this.removeLabel(r):cn(r)?this.killTweensOf(r):(r.parent===this&&Qu(this,r),r===this._recent&&(this._recent=this._last),xa(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=rn(Ii.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=rr(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,a){var o=gn.delayedCall(0,s||Ql,a);return o.data="isPause",this._hasPause=1,Ur(this,o,rr(this,r))},t.removePause=function(r){var s=this._first;for(r=rr(this,r);s;)s._start===r&&s.data==="isPause"&&Is(s),s=s._next},t.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)Rs!==o[l]&&o[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var a=[],o=ar(r),l=this._first,c=ts(s),u;l;)l instanceof gn?XA(l._targets,o)&&(c?(!Rs||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(r,s){s=s||{};var a=this,o=rr(a,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,p=gn.to(a,Wi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Yt,onStart:function(){if(a.pause(),!d){var g=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());p._dur!==g&&fo(p,g,0,1).render(p._time,!0,!0),d=1}u&&u.apply(p,f||[])}},s));return h?p.render(0):p},t.tweenFromTo=function(r,s,a){return this.tweenTo(s,Wi({startAt:{time:rr(this,r)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),j0(this,rr(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),j0(this,rr(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Yt)},t.shiftChildren=function(r,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(r=rn(r);o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return xa(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),xa(this)},t.totalDuration=function(r){var s=0,a=this,o=a._last,l=sr,c,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Ur(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=rn(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;fo(a,a===sn&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(r){if(sn._ts&&(lv(sn,Wu(r,sn)),ov=Ii.frame),Ii.frame>=Q0){Q0+=Ui.autoSleep||120;var s=sn._first;if((!s||!s._ts)&&Ui.autoSleep&&Ii._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Ii.sleep()}}},e}(Kl);Wi(ei.prototype,{_lock:0,_hasPause:0,_forcing:0});var mS=function(e,t,n,r,s,a,o){var l=new gi(this._pt,e,t,0,1,Gp,null,s),c=0,u=0,f,h,d,p,v,g,m,x;for(l.b=n,l.e=r,n+="",r+="",(m=~r.indexOf("random("))&&(r=mo(r)),a&&(x=[n,r],a(x,e,t),n=x[0],r=x[1]),h=n.match(cp)||[];f=cp.exec(r);)p=f[0],v=r.substring(c,f.index),d?d=(d+1)%5:v.substr(-5)==="rgba("&&(d=1),p!==h[u++]&&(g=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:v||u===1?v:",",s:g,c:p.charAt(1)==="="?Sa(g,p)-g:parseFloat(p)-g,m:d&&d<4?Math.round:0},c=cp.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(Rp.test(r)||m)&&(l.e=0),this._pt=l,l},Op=function(e,t,n,r,s,a,o,l,c,u){cn(r)&&(r=r(s||0,e,a));var f=e[t],h=n!=="get"?n:cn(f)?c?e[t.indexOf("set")||!cn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=cn(f)?c?yS:Rv:Hp,p;if(Cn(r)&&(~r.indexOf("random(")&&(r=mo(r)),r.charAt(1)==="="&&(p=Sa(h,r)+(Wn(h)||0),(p||p===0)&&(r=p))),!u||h!==r||Tp)return!isNaN(h*r)&&r!==""?(p=new gi(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?SS:Dv,0,d),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!f&&!(t in e)&&qu(t,r),mS.call(this,e,t,h,r,d,l||Ui.stringFilter,c))},gS=function(e,t,n,r,s){if(cn(e)&&(e=Xl(e,s,t,n,r)),!Lr(e)||e.style&&e.nodeType||ti(e)||iv(e))return Cn(e)?Xl(e,s,t,n,r):e;var a={},o;for(o in e)a[o]=Xl(e[o],s,t,n,r);return a},zp=function(e,t,n,r,s,a){var o,l,c,u;if(Pi[e]&&(o=new Pi[e]).init(s,o.rawVars?t[e]:gS(t[e],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new gi(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==co))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Rs,Tp,kp=function i(e,t,n){var r=e.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,p=e._dur,v=e._startAt,g=e._targets,m=e.parent,x=m&&m.data==="nested"?m.vars.targets:g,_=e._overwrite==="auto"&&!wp,y=e.timeline,S=r.easeReverse||f,T,E,A,M,C,R,w,P,U,N,H,k,te;if(y&&(!h||!s)&&(s="none"),e._ease=_a(s,Yl.ease),e._rEase=S&&(_a(S)||e._ease),e._from=!y&&!!r.runBackwards,e._from&&(e.ratio=1),!y||h&&!r.stagger){if(P=g[0]?Ps(g[0]).harness:0,k=P&&r[P.prop],T=Vu(r,Pp),v&&(v._zTime<0&&v.progress(1),t<0&&u&&o&&!d?v.render(-1,!0):v.revert(u&&p?Ou:VA),v._lazy=0),a){if(Is(e._startAt=gn.set(g,Wi({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!v&&Bi(l),startAt:null,delay:0,onUpdate:c&&function(){return Gi(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Vn||!o&&!d)&&e._startAt.revert(Ou),o&&p&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&p&&!v){if(t&&(o=!1),A=Wi({overwrite:!1,data:"isFromStart",lazy:o&&!v&&Bi(l),immediateRender:o,stagger:0,parent:m},T),k&&(A[P.prop]=k),Is(e._startAt=gn.set(g,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Vn?e._startAt.revert(Ou):e._startAt.render(-1,!0)),e._zTime=t,!o)i(e._startAt,Yt,Yt);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&Bi(l)||l&&!p,E=0;E<g.length;E++){if(C=g[E],w=C._gsap||Bp(g)[E]._gsap,e._ptLookup[E]=N={},xp[w.id]&&Ds.length&&Gu(),H=x===g?E:x.indexOf(C),P&&(U=new P).init(C,k||T,e,H,x)!==!1&&(e._pt=M=new gi(e._pt,C,U.name,0,1,U.render,U,0,U.priority),U._props.forEach(function(K){N[K]=M}),U.priority&&(R=1)),!P||k)for(A in T)Pi[A]&&(U=zp(A,T,e,H,C,x))?U.priority&&(R=1):N[A]=M=Op.call(e,C,A,"get",T[A],H,x,0,r.stringFilter);e._op&&e._op[E]&&e.kill(C,e._op[E]),_&&e._pt&&(Rs=e,sn.killTweensOf(C,N,e.globalTime(t)),te=!e.parent,Rs=0),e._pt&&l&&(xp[w.id]=1)}R&&Wp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!te,h&&t<=0&&y.render(sr,!0,!0)},vS=function(e,t,n,r,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Tp=1,e.vars[t]="+=0",kp(e,o),Tp=0,l?ql(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,f.e&&(f.e=un(n)+Wn(f.e)),f.b&&(f.b=u.s+Wn(f.b))},xS=function(e,t){var n=e[0]?Ps(e[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return t;s=uo({},t);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},_S=function(e,t,n,r){var s=t.ease||r||"power1.inOut",a,o;if(ti(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},Xl=function(e,t,n,r,s){return cn(e)?e.call(t,n,r,s):Cn(e)&&~e.indexOf("random(")?mo(e):e},bv=Ip+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Cv={};mi(bv+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Cv[i]=1});var gn=function(i){tv(e,i);function e(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:Vl(r))||this;var l=o.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,p=l.keyframes,v=l.defaults,g=l.scrollTrigger,m=r.parent||sn,x=(ti(n)||iv(n)?ts(n[0]):"length"in r)?[n]:ar(n),_,y,S,T,E,A,M,C;if(o._targets=x.length?Bp(x):ql("GSAP target "+n+" not found. https://gsap.com",!Ui.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,p||h||Nu(c)||Nu(u)){r=o.vars;var R=r.easeReverse||r.yoyoEase;if(_=o.timeline=new ei({data:"nested",defaults:v||{},targets:m&&m.data==="nested"?m.vars.targets:x}),_.kill(),_.parent=_._dp=$r(o),_._start=0,h||Nu(c)||Nu(u)){if(T=x.length,M=h&&vv(h),Lr(h))for(E in h)~bv.indexOf(E)&&(C||(C={}),C[E]=h[E]);for(y=0;y<T;y++)S=Vu(r,Cv),S.stagger=0,R&&(S.easeReverse=R),C&&uo(S,C),A=x[y],S.duration=+Xl(c,$r(o),y,A,x),S.delay=(+Xl(u,$r(o),y,A,x)||0)-o._delay,!h&&T===1&&S.delay&&(o._delay=u=S.delay,o._start+=u,S.delay=0),_.to(A,S,M?M(y,A,x):0),_._ease=yt.none;_.duration()?c=u=0:o.timeline=0}else if(p){Vl(Wi(_.vars.defaults,{ease:"none"})),_._ease=_a(p.ease||r.ease||"none");var w=0,P,U,N;if(ti(p))p.forEach(function(H){return _.to(x,H,">")}),_.duration();else{S={};for(E in p)E==="ease"||E==="easeEach"||_S(E,p[E],S,p.easeEach);for(E in S)for(P=S[E].sort(function(H,k){return H.t-k.t}),w=0,y=0;y<P.length;y++)U=P[y],N={ease:U.e,duration:(U.t-(y?P[y-1].t:0))/100*c},N[E]=U.v,_.to(x,N,w),w+=N.duration;_.duration()<c&&_.to({},{duration:c-_.duration()})}}c||o.duration(c=_.duration())}else o.timeline=0;return d===!0&&!wp&&(Rs=$r(o),sn.killTweensOf(x),Rs=0),Ur(m,$r(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(f||!c&&!p&&o._start===rn(m._time)&&Bi(f)&&ZA($r(o))&&m.data!=="nested")&&(o._tTime=-Yt,o.render(Math.max(0,-u)||0)),g&&dv($r(o),g),o}var t=e.prototype;return t.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Yt&&!u?l:r<Yt?0:r,h,d,p,v,g,m,x,_;if(!c)JA(this,r,s,a);else if(f!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,_=this.timeline,this._repeat){if(v=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(v*100+r,s,a);if(h=rn(f%v),f===l?(p=this._repeat,h=c):(g=rn(f/v),p=~~g,p&&p===g?(h=c,p--):h>c&&(h=c)),m=this._yoyo&&p&1,m&&(h=c-h),g=ho(this._tTime,v),h===o&&!a&&this._initted&&p===g)return this._tTime=f,this;p!==g&&this.vars.repeatRefresh&&!m&&!this._lock&&h!==v&&this._initted&&(this._lock=a=1,this.render(rn(v*p),!0).invalidate()._lock=0)}if(!this._initted){if(pv(this,u?r:h,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&p!==g))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._rEase){var y=h<o;if(y!==this._inv){var S=y?o:c-o;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=S?(y?-1:1)/S:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(h/c);if(this._from&&(this.ratio=x=1-x),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!s&&!g&&(Gi(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;_&&_.render(r<0?r:_._dur*_._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&_p(this,r,s,a),Gi(this,"onUpdate")),this._repeat&&p!==g&&this.vars.onRepeat&&!s&&this.parent&&Gi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&_p(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Is(this,1),!s&&!(u&&!o)&&(f||o||m)&&(Gi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,a,o,l){Zl||Ii.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||kp(this,c),u=this._ease(c/this._dur),vS(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(Ku(this,0),this.parent||hv(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Hl(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Vn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Rs&&Rs.vars.overwrite!==!0)._first||Hl(this),this.parent&&a!==this.timeline.totalDuration()&&fo(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?ar(r):o,c=this._ptLookup,u=this._pt,f,h,d,p,v,g,m;if((!s||s==="all")&&qA(o,l))return s==="all"&&(this._pt=0),Hl(this);for(f=this._op=this._op||[],s!=="all"&&(Cn(s)&&(v={},mi(s,function(x){return v[x]=1}),s=v),s=xS(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){h=c[m],s==="all"?(f[m]=s,p=h,d={}):(d=f[m]=f[m]||{},p=s);for(v in p)g=h&&h[v],g&&((!("kill"in g.d)||g.d.kill(v)===!0)&&Qu(this,g,"_pt"),delete h[v]),d!=="all"&&(d[v]=1)}return this._initted&&!this._pt&&u&&Hl(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Wl(1,arguments)},e.delayedCall=function(r,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(r,s,a){return Wl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,a){return sn.killTweensOf(r,s,a)},e}(Kl);Wi(gn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});mi("staggerTo,staggerFrom,staggerFromTo",function(i){gn[i]=function(){var e=new ei,t=Ap.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Hp=function(e,t,n){return e[t]=n},Rv=function(e,t,n){return e[t](n)},yS=function(e,t,n,r){return e[t](r.fp,n)},AS=function(e,t,n){return e.setAttribute(t,n)},Ju=function(e,t){return cn(e[t])?Rv:Yu(e[t])&&e.setAttribute?AS:Hp},Dv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},SS=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Gp=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Vp=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},MS=function(e,t,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(e,t,n),s=a},TS=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Qu(this,t,"_pt"):t.dep||(n=1),t=r;return!n},ES=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Wp=function(e){for(var t=e._pt,n,r,s,a;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=s},gi=function(){function i(t,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||Dv,this.d=l||this,this.set=c||Hp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=ES,this.m=n,this.mt=s,this.tween=r},i}();mi(Ip+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return Pp[i]=1});Vi.TweenMax=Vi.TweenLite=gn;Vi.TimelineLite=Vi.TimelineMax=ei;sn=new ei({sortChildren:!1,defaults:Yl,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Ui.stringFilter=Fp;var ya=[],ku={},wS=[],ev=0,bS=0,pp=function(e){return(ku[e]||wS).map(function(t){return t()})},Ep=function(){var e=Date.now(),t=[];e-ev>2&&(pp("matchMediaInit"),ya.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=Br.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),pp("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),ev=e,pp("matchMedia"))},Pv=function(){function i(t,n){this.selector=n&&Sp(n),this.data=[],this._r=[],this.isReverted=!1,this.id=bS++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){cn(n)&&(s=r,r=n,n=cn);var a=this,o=function(){var c=en,u=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=Sp(s)),en=a,f=r.apply(a,arguments),cn(f)&&a._r.push(f),en=c,a.selector=u,a.isReverted=!1,f};return a.last=o,n===cn?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var r=en;en=null,n(this),en=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof gn&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof ei?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof gn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=ya.length;a--;)ya[a].id===this.id&&ya.splice(a,1)},e.revert=function(n){this.kill(n||{})},i}(),CS=function(){function i(t){this.contexts=[],this.scope=t,en&&en.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){Lr(n)||(n={matches:n});var a=new Pv(0,s||this.scope),o=a.conditions={},l,c,u;en&&!a.selector&&(a.selector=en.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=Br.matchMedia(n[c]),l&&(ya.indexOf(a)<0&&ya.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(Ep):l.addEventListener("change",Ep)));return u&&r(a,function(f){return a.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),Xu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return Mv(r)})},timeline:function(e){return new ei(e)},getTweensOf:function(e,t){return sn.getTweensOf(e,t)},getProperty:function(e,t,n,r){Cn(e)&&(e=ar(e)[0]);var s=Ps(e||{}).get,a=n?uv:cv;return n==="native"&&(n=""),e&&(t?a((Pi[t]&&Pi[t].get||s)(e,t,n,r)):function(o,l,c){return a((Pi[o]&&Pi[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=ar(e),e.length>1){var r=e.map(function(u){return ni.quickSetter(u,t,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var a=Pi[t],o=Ps(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var f=new a;co._pt=0,f.init(e,n?u+n:u,co,0,[e]),f.render(1,f),co._pt&&Vp(1,co)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var r,s=ni.to(e,Wi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return sn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=_a(e.ease,Yl.ease)),Z0(Yl,e||{})},config:function(e){return Z0(Ui,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,a=e.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!Pi[o]&&!Vi[o]&&ql(t+" effect requires "+o+" plugin.")}),up[t]=function(o,l,c){return n(ar(o),Wi(l||{},s),c)},a&&(ei.prototype[t]=function(o,l,c){return this.add(up[t](o,Lr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){yt[e]=_a(t)},parseEase:function(e,t){return arguments.length?_a(e,t):yt},getById:function(e){return sn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new ei(e),r,s;for(n.smoothChildTiming=Bi(e.smoothChildTiming),sn.remove(n),n._dp=0,n._time=n._tTime=sn._time,r=sn._first;r;)s=r._next,(t||!(!r._dur&&r instanceof gn&&r.vars.onComplete===r._targets[0]))&&Ur(n,r,r._start-r._delay),r=s;return Ur(sn,n,0),n},context:function(e,t){return e?new Pv(e,t):en},matchMedia:function(e){return new CS(e)},matchMediaRefresh:function(){return ya.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Ep()},addEventListener:function(e,t){var n=ku[e]||(ku[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=ku[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:sS,wrapYoyo:aS,distribute:vv,random:_v,snap:xv,normalize:rS,getUnit:Wn,clamp:eS,splitColor:Tv,toArray:ar,selector:Sp,mapRange:Av,pipe:nS,unitize:iS,interpolate:oS,shuffle:gv},install:sv,effects:up,ticker:Ii,updateRoot:ei.updateRoot,plugins:Pi,globalTimeline:sn,core:{PropTween:gi,globals:av,Tween:gn,Timeline:ei,Animation:Kl,getCache:Ps,_removeLinkedListItem:Qu,reverting:function(){return Vn},context:function(e){return e&&en&&(en.data.push(e),e._ctx=en),en},suppressOverwrites:function(e){return wp=e}}};mi("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Xu[i]=gn[i]});Ii.add(ei.updateRoot);co=Xu.to({},{duration:0});var RS=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},DS=function(e,t){var n=e._targets,r,s,a;for(r in t)for(s=n.length;s--;)a=e._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=RS(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[s],r))},mp=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(Cn(s)&&(l={},mi(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}DS(o,s)}}}},ni=Xu.registerPlugin({name:"attr",init:function(e,t,n,r,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Vn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},mp("roundProps",Mp),mp("modifiers"),mp("snap",xv))||Xu;gn.version=ei.version=ni.version="3.15.0";rv=1;bp()&&po();var PS=yt.Power0,IS=yt.Power1,BS=yt.Power2,US=yt.Power3,LS=yt.Power4,FS=yt.Linear,NS=yt.Quad,OS=yt.Cubic,zS=yt.Quart,kS=yt.Quint,HS=yt.Strong,GS=yt.Elastic,VS=yt.Back,WS=yt.SteppedEase,XS=yt.Bounce,YS=yt.Sine,qS=yt.Expo,QS=yt.Circ;var Iv,Us,vo,Kp,ba,ZS,Bv,Jp,KS=function(){return typeof window<"u"},is={},wa=180/Math.PI,xo=Math.PI/180,go=Math.atan2,Uv=1e8,jp=/([A-Z])/g,JS=/(left|right|width|margin|padding|x)/i,jS=/[\s,\(]\S/,Fr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Yp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},$S=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},eM=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},tM=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},nM=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Gv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Vv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},iM=function(e,t,n){return e.style[t]=n},rM=function(e,t,n){return e.style.setProperty(t,n)},sM=function(e,t,n){return e._gsap[t]=n},aM=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},oM=function(e,t,n,r,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},lM=function(e,t,n,r,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},an="transform",Li=an+"Origin",cM=function i(e,t){var n=this,r=this.target,s=r.style,a=r._gsap;if(e in is&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Fr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=ns(r,o)}):this.tfm[e]=a.x?a[e]:ns(r,e),e===Li&&(this.tfm.zOrigin=a.zOrigin);else return Fr.transform.split(",").forEach(function(o){return i.call(n,o,t)});if(this.props.indexOf(an)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Li,t,"")),e=an}(s||t)&&this.props.push(e,t,s[e])},Wv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},uM=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(jp,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Jp(),(!s||!s.isStart)&&!n[an]&&(Wv(n),r.zOrigin&&n[Li]&&(n[Li]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Xv=function(e,t){var n={target:e,props:[],revert:uM,save:cM};return e._gsap||ni.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},Yv,qp=function(e,t){var n=Us.createElementNS?Us.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Us.createElement(e);return n&&n.style?n:Us.createElement(e)},Xi=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(jp,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,_o(t)||t,1)||""},Lv="O,Moz,ms,Ms,Webkit".split(","),_o=function(e,t,n){var r=t||ba,s=r.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Lv[a]+e in s););return a<0?null:(a===3?"ms":a>=0?Lv[a]:"")+e},Qp=function(){KS()&&window.document&&(Iv=window,Us=Iv.document,vo=Us.documentElement,ba=qp("div")||{style:{}},ZS=qp("div"),an=_o(an),Li=an+"Origin",ba.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Yv=!!_o("perspective"),Jp=ni.core.reverting,Kp=1)},Fv=function(e){var t=e.ownerSVGElement,n=qp("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),vo.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),vo.removeChild(n),s},Nv=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},qv=function(e){var t,n;try{t=e.getBBox()}catch{t=Fv(e),n=1}return t&&(t.width||t.height)||n||(t=Fv(e)),t&&!t.width&&!t.x&&!t.y?{x:+Nv(e,["x","cx","x1"])||0,y:+Nv(e,["y","cy","y1"])||0,width:0,height:0}:t},Qv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&qv(e))},Fs=function(e,t){if(t){var n=e.style,r;t in is&&t!==Li&&(t=an),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(jp,"-$1").toLowerCase())):n.removeAttribute(t)}},Ls=function(e,t,n,r,s,a){var o=new gi(e._pt,t,n,0,1,a?Vv:Gv);return e._pt=o,o.b=r,o.e=s,e._props.push(n),o},Ov={deg:1,rad:1,turn:1},hM={grid:1,flex:1},Ns=function i(e,t,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=ba.style,l=JS.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",p,v,g,m;if(r===a||!s||Ov[r]||Ov[a])return s;if(a!=="px"&&!h&&(s=i(e,t,n,"px")),m=e.getCTM&&Qv(e),(d||a==="%")&&(is[t]||~t.indexOf("adius")))return p=m?e.getBBox()[l?"width":"height"]:e[u],un(d?s/p*f:s/100*p);if(o[l?"width":"height"]=f+(h?a:r),v=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===Us||!v.appendChild)&&(v=Us.body),g=v._gsap,g&&d&&g.width&&l&&g.time===Ii.time&&!g.uncache)return un(s/g.width*f);if(d&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=f+r,p=e[u],x?e.style[t]=x:Fs(e,t)}else(d||a==="%")&&!hM[Xi(v,"display")]&&(o.position=Xi(e,"position")),v===e&&(o.position="static"),v.appendChild(ba),p=ba[u],v.removeChild(ba),o.position="absolute";return l&&d&&(g=Ps(v),g.time=Ii.time,g.width=v[u]),un(h?p*s/f:p&&s?f/p*s:0)},ns=function(e,t,n,r){var s;return Kp||Qp(),t in Fr&&t!=="transform"&&(t=Fr[t],~t.indexOf(",")&&(t=t.split(",")[0])),is[t]&&t!=="transform"?(s=ec(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:$u(Xi(e,Li))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=ju[t]&&ju[t](e,t,n)||Xi(e,t)||Up(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ns(e,t,s,n)+n:s},fM=function(e,t,n,r){if(!n||n==="none"){var s=_o(t,e,1),a=s&&Xi(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=Xi(e,"borderTopColor"))}var o=new gi(this._pt,e.style,t,0,1,Gp),l=0,c=0,u,f,h,d,p,v,g,m,x,_,y,S;if(o.b=n,o.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=Xi(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(v=e.style[t],e.style[t]=r,r=Xi(e,t)||r,v?e.style[t]=v:Fs(e,t)),u=[n,r],Fp(u),n=u[0],r=u[1],h=n.match(Aa)||[],S=r.match(Aa)||[],S.length){for(;f=Aa.exec(r);)g=f[0],x=r.substring(l,f.index),p?p=(p+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(p=1),g!==(v=h[c++]||"")&&(d=parseFloat(v)||0,y=v.substr((d+"").length),g.charAt(1)==="="&&(g=Sa(d,g)+y),m=parseFloat(g),_=g.substr((m+"").length),l=Aa.lastIndex-_.length,_||(_=_||Ui.units[t]||y,l===r.length&&(r+=_,o.e+=_)),y!==_&&(d=Ns(e,t,v,_)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:d,c:m-d,m:p&&p<4||t==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=t==="display"&&r==="none"?Vv:Gv;return Rp.test(r)&&(o.e=0),this._pt=o,o},zv={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},dM=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=zv[n]||n,t[1]=zv[r]||r,t.join(" ")},pM=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],is[o]&&(l=1,o=o==="transformOrigin"?Li:an),Fs(n,o);l&&(Fs(n,an),a&&(a.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",ec(n,1),a.uncache=1,Wv(r)))}},ju={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var a=e._pt=new gi(e._pt,t,n,0,0,pM);return a.u=r,a.pr=-10,a.tween=s,e._props.push(n),1}}},$l=[1,0,0,1,0,0],Zv={},Kv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},kv=function(e){var t=Xi(e,an);return Kv(t)?$l:t.substr(7).match(Cp).map(un)},$p=function(e,t){var n=e._gsap||Ps(e),r=e.style,s=kv(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?$l:s):(s===$l&&!e.offsetParent&&e!==vo&&!n.svg&&(l=r.display,r.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,vo.appendChild(e)),s=kv(e),l?r.display=l:Fs(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):vo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Zp=function(e,t,n,r,s,a){var o=e._gsap,l=s||$p(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,d=l[0],p=l[1],v=l[2],g=l[3],m=l[4],x=l[5],_=t.split(" "),y=parseFloat(_[0])||0,S=parseFloat(_[1])||0,T,E,A,M;n?l!==$l&&(E=d*g-p*v)&&(A=y*(g/E)+S*(-v/E)+(v*x-g*m)/E,M=y*(-p/E)+S*(d/E)-(d*x-p*m)/E,y=A,S=M):(T=qv(e),y=T.x+(~_[0].indexOf("%")?y/100*T.width:y),S=T.y+(~(_[1]||_[0]).indexOf("%")?S/100*T.height:S)),r||r!==!1&&o.smooth?(m=y-c,x=S-u,o.xOffset=f+(m*d+x*v)-m,o.yOffset=h+(m*p+x*g)-x):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=S,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Li]="0px 0px",a&&(Ls(a,o,"xOrigin",c,y),Ls(a,o,"yOrigin",u,S),Ls(a,o,"xOffset",f,o.xOffset),Ls(a,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",y+" "+S)},ec=function(e,t){var n=e._gsap||new Np(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Xi(e,Li)||"0",u,f,h,d,p,v,g,m,x,_,y,S,T,E,A,M,C,R,w,P,U,N,H,k,te,K,L,oe,ce,Ie,pe,be;return u=f=h=v=g=m=x=_=y=0,d=p=1,n.svg=!!(e.getCTM&&Qv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[an]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[an]!=="none"?l[an]:"")),r.scale=r.rotate=r.translate="none"),E=$p(e,n.svg),n.svg&&(n.uncache?(te=e.getBBox(),c=n.xOrigin-te.x+"px "+(n.yOrigin-te.y)+"px",k=""):k=!t&&e.getAttribute("data-svg-origin"),Zp(e,k||c,!!k||n.originIsAbsolute,n.smooth!==!1,E)),S=n.xOrigin||0,T=n.yOrigin||0,E!==$l&&(R=E[0],w=E[1],P=E[2],U=E[3],u=N=E[4],f=H=E[5],E.length===6?(d=Math.sqrt(R*R+w*w),p=Math.sqrt(U*U+P*P),v=R||w?go(w,R)*wa:0,x=P||U?go(P,U)*wa+v:0,x&&(p*=Math.abs(Math.cos(x*xo))),n.svg&&(u-=S-(S*R+T*P),f-=T-(S*w+T*U))):(be=E[6],Ie=E[7],L=E[8],oe=E[9],ce=E[10],pe=E[11],u=E[12],f=E[13],h=E[14],A=go(be,ce),g=A*wa,A&&(M=Math.cos(-A),C=Math.sin(-A),k=N*M+L*C,te=H*M+oe*C,K=be*M+ce*C,L=N*-C+L*M,oe=H*-C+oe*M,ce=be*-C+ce*M,pe=Ie*-C+pe*M,N=k,H=te,be=K),A=go(-P,ce),m=A*wa,A&&(M=Math.cos(-A),C=Math.sin(-A),k=R*M-L*C,te=w*M-oe*C,K=P*M-ce*C,pe=U*C+pe*M,R=k,w=te,P=K),A=go(w,R),v=A*wa,A&&(M=Math.cos(A),C=Math.sin(A),k=R*M+w*C,te=N*M+H*C,w=w*M-R*C,H=H*M-N*C,R=k,N=te),g&&Math.abs(g)+Math.abs(v)>359.9&&(g=v=0,m=180-m),d=un(Math.sqrt(R*R+w*w+P*P)),p=un(Math.sqrt(H*H+be*be)),A=go(N,H),x=Math.abs(A)>2e-4?A*wa:0,y=pe?1/(pe<0?-pe:pe):0),n.svg&&(k=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Kv(Xi(e,an)),k&&e.setAttribute("transform",k))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(d*=-1,x+=v<=0?180:-180,v+=v<=0?180:-180):(p*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=un(d),n.scaleY=un(p),n.rotation=un(v)+o,n.rotationX=un(g)+o,n.rotationY=un(m)+o,n.skewX=x+o,n.skewY=_+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Li]=$u(c)),n.xOffset=n.yOffset=0,n.force3D=Ui.force3D,n.renderTransform=n.svg?gM:Yv?Jv:mM,n.uncache=0,n},$u=function(e){return(e=e.split(" "))[0]+" "+e[1]},Xp=function(e,t,n){var r=Wn(t);return un(parseFloat(t)+parseFloat(Ns(e,"x",n+"px",r)))+r},mM=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Jv(e,t)},Ta="0deg",jl="0px",Ea=") ",Jv=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,p=n.scaleX,v=n.scaleY,g=n.transformPerspective,m=n.force3D,x=n.target,_=n.zOrigin,y="",S=m==="auto"&&e&&e!==1||m===!0;if(_&&(f!==Ta||u!==Ta)){var T=parseFloat(u)*xo,E=Math.sin(T),A=Math.cos(T),M;T=parseFloat(f)*xo,M=Math.cos(T),a=Xp(x,a,E*M*-_),o=Xp(x,o,-Math.sin(T)*-_),l=Xp(x,l,A*M*-_+_)}g!==jl&&(y+="perspective("+g+Ea),(r||s)&&(y+="translate("+r+"%, "+s+"%) "),(S||a!==jl||o!==jl||l!==jl)&&(y+=l!==jl||S?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Ea),c!==Ta&&(y+="rotate("+c+Ea),u!==Ta&&(y+="rotateY("+u+Ea),f!==Ta&&(y+="rotateX("+f+Ea),(h!==Ta||d!==Ta)&&(y+="skew("+h+", "+d+Ea),(p!==1||v!==1)&&(y+="scale("+p+", "+v+Ea),x.style[an]=y||"translate(0, 0)"},gM=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,p=n.xOrigin,v=n.yOrigin,g=n.xOffset,m=n.yOffset,x=n.forceCSS,_=parseFloat(a),y=parseFloat(o),S,T,E,A,M;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=xo,c*=xo,S=Math.cos(l)*f,T=Math.sin(l)*f,E=Math.sin(l-c)*-h,A=Math.cos(l-c)*h,c&&(u*=xo,M=Math.tan(c-u),M=Math.sqrt(1+M*M),E*=M,A*=M,u&&(M=Math.tan(u),M=Math.sqrt(1+M*M),S*=M,T*=M)),S=un(S),T=un(T),E=un(E),A=un(A)):(S=f,A=h,T=E=0),(_&&!~(a+"").indexOf("px")||y&&!~(o+"").indexOf("px"))&&(_=Ns(d,"x",a,"px"),y=Ns(d,"y",o,"px")),(p||v||g||m)&&(_=un(_+p-(p*S+v*E)+g),y=un(y+v-(p*T+v*A)+m)),(r||s)&&(M=d.getBBox(),_=un(_+r/100*M.width),y=un(y+s/100*M.height)),M="matrix("+S+","+T+","+E+","+A+","+_+","+y+")",d.setAttribute("transform",M),x&&(d.style[an]=M)},vM=function(e,t,n,r,s){var a=360,o=Cn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?wa:1),c=l-r,u=r+c+"deg",f,h;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*Uv)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*Uv)%a-~~(c/a)*a)),e._pt=h=new gi(e._pt,t,n,r,c,$S),h.e=u,h.u="deg",e._props.push(n),h},Hv=function(e,t){for(var n in t)e[n]=t[n];return e},xM=function(e,t,n){var r=Hv({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,f,h,d,p;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[an]=t,o=ec(n,1),Fs(n,an),n.setAttribute("transform",c)):(c=getComputedStyle(n)[an],a[an]=t,o=ec(n,1),a[an]=c);for(l in is)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(d=Wn(c),p=Wn(u),f=d!==p?Ns(n,l,c,p):parseFloat(c),h=parseFloat(u),e._pt=new gi(e._pt,o,l,f,h-f,Yp),e._pt.u=p||0,e._props.push(l));Hv(o,r)};mi("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",a=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(o){return e<2?i+o:"border"+o+i});ju[e>1?"border"+i:i]=function(o,l,c,u,f){var h,d;if(arguments.length<4)return h=a.map(function(p){return ns(o,p,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},a.forEach(function(p,v){return d[p]=h[v]=h[v]||h[(v-1)/2|0]}),o.init(l,d,f)}});var em={name:"css",register:Qp,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,f,h,d,p,v,g,m,x,_,y,S,T,E,A,M;Kp||Qp(),this.styles=this.styles||Xv(e),A=this.styles.props,this.tween=n;for(v in t)if(v!=="autoRound"&&(u=t[v],!(Pi[v]&&zp(v,t,n,r,e,s)))){if(d=typeof u,p=ju[v],d==="function"&&(u=u.call(n,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=mo(u)),p)p(this,e,v,u,n)&&(E=1);else if(v.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(v)+"").trim(),u+="",es.lastIndex=0,es.test(c)||(g=Wn(c),m=Wn(u),m?g!==m&&(c=Ns(e,v,c,m)+m):g&&(u+=g)),this.add(o,"setProperty",c,u,r,s,0,0,v),a.push(v),A.push(v,0,o[v]);else if(d!=="undefined"){if(l&&v in l?(c=typeof l[v]=="function"?l[v].call(n,r,e,s):l[v],Cn(c)&&~c.indexOf("random(")&&(c=mo(c)),Wn(c+"")||c==="auto"||(c+=Ui.units[v]||Wn(ns(e,v))||""),(c+"").charAt(1)==="="&&(c=ns(e,v))):c=ns(e,v),h=parseFloat(c),x=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),f=parseFloat(u),v in Fr&&(v==="autoAlpha"&&(h===1&&ns(e,"visibility")==="hidden"&&f&&(h=0),A.push("visibility",0,o.visibility),Ls(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),v!=="scale"&&v!=="transform"&&(v=Fr[v],~v.indexOf(",")&&(v=v.split(",")[0]))),_=v in is,_){if(this.styles.save(v),M=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Xi(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=u,u=Xi(e,"perspective"),C?e.style.perspective=C:Fs(e,"perspective")}f=parseFloat(u)}if(y||(S=e._gsap,S.renderTransform&&!t.parseTransform||ec(e,t.parseTransform),T=t.smoothOrigin!==!1&&S.smooth,y=this._pt=new gi(this._pt,o,an,0,1,S.renderTransform,S,0,-1),y.dep=1),v==="scale")this._pt=new gi(this._pt,S,"scaleY",S.scaleY,(x?Sa(S.scaleY,x+f):f)-S.scaleY||0,Yp),this._pt.u=0,a.push("scaleY",v),v+="X";else if(v==="transformOrigin"){A.push(Li,0,o[Li]),u=dM(u),S.svg?Zp(e,u,0,T,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==S.zOrigin&&Ls(this,S,"zOrigin",S.zOrigin,m),Ls(this,o,v,$u(c),$u(u)));continue}else if(v==="svgOrigin"){Zp(e,u,1,T,0,this);continue}else if(v in Zv){vM(this,S,v,h,x?Sa(h,x+u):u);continue}else if(v==="smoothOrigin"){Ls(this,S,"smooth",S.smooth,u);continue}else if(v==="force3D"){S[v]=u;continue}else if(v==="transform"){xM(this,u,e);continue}}else v in o||(v=_o(v)||v);if(_||(f||f===0)&&(h||h===0)&&!jS.test(u)&&v in o)g=(c+"").substr((h+"").length),f||(f=0),m=Wn(u)||(v in Ui.units?Ui.units[v]:g),g!==m&&(h=Ns(e,v,c,m)),this._pt=new gi(this._pt,_?S:o,v,h,(x?Sa(h,x+f):f)-h,!_&&(m==="px"||v==="zIndex")&&t.autoRound!==!1?nM:Yp),this._pt.u=m||0,_&&M!==u?(this._pt.b=c,this._pt.e=M,this._pt.r=tM):g!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=eM);else if(v in o)fM.call(this,e,v,c,x?x+u:u);else if(v in e)this.add(e,v,c||e[v],x?x+u:u,r,s);else if(v!=="parseTransform"){qu(v,u);continue}_||(v in o?A.push(v,0,o[v]):typeof e[v]=="function"?A.push(v,2,e[v]()):A.push(v,1,c||e[v])),a.push(v)}}E&&Wp(this)},render:function(e,t){if(t.tween._time||!Jp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:ns,aliases:Fr,getSetter:function(e,t,n){var r=Fr[t];return r&&r.indexOf(",")<0&&(t=r),t in is&&t!==Li&&(e._gsap.x||ns(e,"x"))?n&&Bv===n?t==="scale"?aM:sM:(Bv=n||{})&&(t==="scale"?oM:lM):e.style&&!Yu(e.style[t])?iM:~t.indexOf("-")?rM:Ju(e,t)},core:{_removeProperty:Fs,_getMatrix:$p}};ni.utils.checkPrefix=_o;ni.core.getStyleSaver=Xv;(function(i,e,t,n){var r=mi(i+","+e+","+t,function(s){is[s]=1});mi(e,function(s){Ui.units[s]="deg",Zv[s]=1}),Fr[r[13]]=i+","+e,mi(n,function(s){var a=s.split(":");Fr[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");mi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){Ui.units[i]="px"});ni.registerPlugin(em);var xr=ni.registerPlugin(em)||ni,oP=xr.core.Tween;function jv(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function _M(i,e,t){return e&&jv(i.prototype,e),t&&jv(i,t),i}var Xn,nh,yM,Yi,Os,zs,Ao,ex,Ca,So,tx,rs,_r,nx,ix=function(){return Xn||typeof window<"u"&&(Xn=window.gsap)&&Xn.registerPlugin&&Xn},rx=1,yo=[],pt=[],yr=[],nc=Date.now,tm=function(e,t){return t},AM=function(){var e=So.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,pt),r.push.apply(r,yr),pt=n,yr=r,tm=function(a,o){return t[a](o)}},as=function(e,t){return~yr.indexOf(e)&&yr[yr.indexOf(e)+1][t]},ic=function(e){return!!~tx.indexOf(e)},xi=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},vi=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},eh="scrollLeft",th="scrollTop",nm=function(){return rs&&rs.isPressed||pt.cache++},ih=function(e,t){var n=function r(s){if(s||s===0){rx&&(Yi.history.scrollRestoration="manual");var a=rs&&rs.isPressed;s=r.v=Math.round(s)||(rs&&rs.iOS?1:0),e(s),r.cacheID=pt.cache,a&&tm("ss",s)}else(t||pt.cache!==r.cacheID||tm("ref"))&&(r.cacheID=pt.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},ii={s:eh,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ih(function(i){return arguments.length?Yi.scrollTo(i,xn.sc()):Yi.pageXOffset||Os[eh]||zs[eh]||Ao[eh]||0})},xn={s:th,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:ii,sc:ih(function(i){return arguments.length?Yi.scrollTo(ii.sc(),i):Yi.pageYOffset||Os[th]||zs[th]||Ao[th]||0})},_i=function(e,t){return(t&&t._ctx&&t._ctx.selector||Xn.utils.toArray)(e)[0]||(typeof e=="string"&&Xn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},SM=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},ss=function(e,t){var n=t.s,r=t.sc;ic(e)&&(e=Os.scrollingElement||zs);var s=pt.indexOf(e),a=r===xn.sc?1:2;!~s&&(s=pt.push(e)-1),pt[s+a]||xi(e,"scroll",nm);var o=pt[s+a],l=o||(pt[s+a]=ih(as(e,n),!0)||(ic(e)?r:ih(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Xn.getProperty(e,"scrollBehavior")==="smooth"),l},rh=function(e,t,n){var r=e,s=e,a=nc(),o=a,l=t||50,c=Math.max(500,l*3),u=function(p,v){var g=nc();v||g-a>l?(s=r,r=p,o=a,a=g):n?r+=p:r=s+(p-s)/(g-o)*(a-o)},f=function(){s=r=n?0:r,o=a=0},h=function(p){var v=o,g=s,m=nc();return(p||p===0)&&p!==r&&u(p),a===o||m-o>c?0:(r+(n?g:-g))/((n?m:a)-v)*1e3};return{update:u,reset:f,getVelocity:h}},tc=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},$v=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},sx=function(){So=Xn.core.globals().ScrollTrigger,So&&So.core&&AM()},ax=function(e){return Xn=e||ix(),!nh&&Xn&&typeof document<"u"&&document.body&&(Yi=window,Os=document,zs=Os.documentElement,Ao=Os.body,tx=[Yi,Os,zs,Ao],yM=Xn.utils.clamp,nx=Xn.core.context||function(){},Ca="onpointerenter"in Ao?"pointer":"mouse",ex=hn.isTouch=Yi.matchMedia&&Yi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Yi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,_r=hn.eventTypes=("ontouchstart"in zs?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in zs?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return rx=0},500),nh=1),So||sx(),nh};ii.op=xn;pt.cache=0;var hn=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){nh||ax(Xn)||console.warn("Please gsap.registerPlugin(Observer)"),So||sx();var r=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,p=n.wheelSpeed,v=n.event,g=n.onDragStart,m=n.onDragEnd,x=n.onDrag,_=n.onPress,y=n.onRelease,S=n.onRight,T=n.onLeft,E=n.onUp,A=n.onDown,M=n.onChangeX,C=n.onChangeY,R=n.onChange,w=n.onToggleX,P=n.onToggleY,U=n.onHover,N=n.onHoverEnd,H=n.onMove,k=n.ignoreCheck,te=n.isNormalizer,K=n.onGestureStart,L=n.onGestureEnd,oe=n.onWheel,ce=n.onEnable,Ie=n.onDisable,pe=n.onClick,be=n.scrollSpeed,Z=n.capture,le=n.allowClicks,G=n.lockAxis,ue=n.onLockAxis;this.target=o=_i(o)||zs,this.vars=n,d&&(d=Xn.utils.toArray(d)),r=r||1e-9,s=s||0,p=p||1,be=be||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Yi.getComputedStyle(Ao).lineHeight)||22);var Q,de,Se,ae,_e,ye,Ae,W=this,z=0,We=0,ke=n.passive||!u&&n.passive!==!1,Le=ss(o,ii),xe=ss(o,xn),B=Le(),b=xe(),V=~a.indexOf("touch")&&!~a.indexOf("pointer")&&_r[0]==="pointerdown",$=ic(o),ie=o.ownerDocument||Os,ne=[0,0,0],Me=[0,0,0],ve=0,Pe=function(){return ve=nc()},Be=function(Xe,ct){return(W.event=Xe)&&d&&SM(Xe.target,d)||ct&&V&&Xe.pointerType!=="touch"||k&&k(Xe,ct)},me=function(){W._vx.reset(),W._vy.reset(),de.pause(),f&&f(W)},O=function(){var Xe=W.deltaX=$v(ne),ct=W.deltaY=$v(Me),Fe=Math.abs(Xe)>=r,tt=Math.abs(ct)>=r;R&&(Fe||tt)&&R(W,Xe,ct,ne,Me),Fe&&(S&&W.deltaX>0&&S(W),T&&W.deltaX<0&&T(W),M&&M(W),w&&W.deltaX<0!=z<0&&w(W),z=W.deltaX,ne[0]=ne[1]=ne[2]=0),tt&&(A&&W.deltaY>0&&A(W),E&&W.deltaY<0&&E(W),C&&C(W),P&&W.deltaY<0!=We<0&&P(W),We=W.deltaY,Me[0]=Me[1]=Me[2]=0),(ae||Se)&&(H&&H(W),Se&&(g&&Se===1&&g(W),x&&x(W),Se=0),ae=!1),ye&&!(ye=!1)&&ue&&ue(W),_e&&(oe(W),_e=!1),Q=0},Y=function(Xe,ct,Fe){ne[Fe]+=Xe,Me[Fe]+=ct,W._vx.update(Xe),W._vy.update(ct),c?Q||(Q=requestAnimationFrame(O)):O()},q=function(Xe,ct){G&&!Ae&&(W.axis=Ae=Math.abs(Xe)>Math.abs(ct)?"x":"y",ye=!0),Ae!=="y"&&(ne[2]+=Xe,W._vx.update(Xe,!0)),Ae!=="x"&&(Me[2]+=ct,W._vy.update(ct,!0)),c?Q||(Q=requestAnimationFrame(O)):O()},re=function(Xe){if(!Be(Xe,1)){Xe=tc(Xe,u);var ct=Xe.clientX,Fe=Xe.clientY,tt=ct-W.x,Ke=Fe-W.y,nt=W.isDragging;W.x=ct,W.y=Fe,(nt||(tt||Ke)&&(Math.abs(W.startX-ct)>=s||Math.abs(W.startY-Fe)>=s))&&(Se||(Se=nt?2:1),nt||(W.isDragging=!0),q(tt,Ke))}},Te=W.onPress=function(Oe){Be(Oe,1)||Oe&&Oe.button||(W.axis=Ae=null,de.pause(),W.isPressed=!0,Oe=tc(Oe),z=We=0,W.startX=W.x=Oe.clientX,W.startY=W.y=Oe.clientY,W._vx.reset(),W._vy.reset(),xi(te?o:ie,_r[1],re,ke,!0),W.deltaX=W.deltaY=0,_&&_(W))},F=W.onRelease=function(Oe){if(!Be(Oe,1)){vi(te?o:ie,_r[1],re,!0);var Xe=!isNaN(W.y-W.startY),ct=W.isDragging,Fe=ct&&(Math.abs(W.x-W.startX)>3||Math.abs(W.y-W.startY)>3),tt=tc(Oe);!Fe&&Xe&&(W._vx.reset(),W._vy.reset(),u&&le&&Xn.delayedCall(.08,function(){if(nc()-ve>300&&!Oe.defaultPrevented){if(Oe.target.click)Oe.target.click();else if(ie.createEvent){var Ke=ie.createEvent("MouseEvents");Ke.initMouseEvent("click",!0,!0,Yi,1,tt.screenX,tt.screenY,tt.clientX,tt.clientY,!1,!1,!1,!1,0,null),Oe.target.dispatchEvent(Ke)}}})),W.isDragging=W.isGesturing=W.isPressed=!1,f&&ct&&!te&&de.restart(!0),Se&&O(),m&&ct&&m(W),y&&y(W,Fe)}},ge=function(Xe){return Xe.touches&&Xe.touches.length>1&&(W.isGesturing=!0)&&K(Xe,W.isDragging)},he=function(){return(W.isGesturing=!1)||L(W)},Ee=function(Xe){if(!Be(Xe)){var ct=Le(),Fe=xe();Y((ct-B)*be,(Fe-b)*be,1),B=ct,b=Fe,f&&de.restart(!0)}},fe=function(Xe){if(!Be(Xe)){Xe=tc(Xe,u),oe&&(_e=!0);var ct=(Xe.deltaMode===1?l:Xe.deltaMode===2?Yi.innerHeight:1)*p;Y(Xe.deltaX*ct,Xe.deltaY*ct,0),f&&!te&&de.restart(!0)}},se=function(Xe){if(!Be(Xe)){var ct=Xe.clientX,Fe=Xe.clientY,tt=ct-W.x,Ke=Fe-W.y;W.x=ct,W.y=Fe,ae=!0,f&&de.restart(!0),(tt||Ke)&&q(tt,Ke)}},ze=function(Xe){W.event=Xe,U(W)},Ze=function(Xe){W.event=Xe,N(W)},Tt=function(Xe){return Be(Xe)||tc(Xe,u)&&pe(W)};de=W._dc=Xn.delayedCall(h||.25,me).pause(),W.deltaX=W.deltaY=0,W._vx=rh(0,50,!0),W._vy=rh(0,50,!0),W.scrollX=Le,W.scrollY=xe,W.isDragging=W.isGesturing=W.isPressed=!1,nx(this),W.enable=function(Oe){return W.isEnabled||(xi($?ie:o,"scroll",nm),a.indexOf("scroll")>=0&&xi($?ie:o,"scroll",Ee,ke,Z),a.indexOf("wheel")>=0&&xi(o,"wheel",fe,ke,Z),(a.indexOf("touch")>=0&&ex||a.indexOf("pointer")>=0)&&(xi(o,_r[0],Te,ke,Z),xi(ie,_r[2],F),xi(ie,_r[3],F),le&&xi(o,"click",Pe,!0,!0),pe&&xi(o,"click",Tt),K&&xi(ie,"gesturestart",ge),L&&xi(ie,"gestureend",he),U&&xi(o,Ca+"enter",ze),N&&xi(o,Ca+"leave",Ze),H&&xi(o,Ca+"move",se)),W.isEnabled=!0,W.isDragging=W.isGesturing=W.isPressed=ae=Se=!1,W._vx.reset(),W._vy.reset(),B=Le(),b=xe(),Oe&&Oe.type&&Te(Oe),ce&&ce(W)),W},W.disable=function(){W.isEnabled&&(yo.filter(function(Oe){return Oe!==W&&ic(Oe.target)}).length||vi($?ie:o,"scroll",nm),W.isPressed&&(W._vx.reset(),W._vy.reset(),vi(te?o:ie,_r[1],re,!0)),vi($?ie:o,"scroll",Ee,Z),vi(o,"wheel",fe,Z),vi(o,_r[0],Te,Z),vi(ie,_r[2],F),vi(ie,_r[3],F),vi(o,"click",Pe,!0),vi(o,"click",Tt),vi(ie,"gesturestart",ge),vi(ie,"gestureend",he),vi(o,Ca+"enter",ze),vi(o,Ca+"leave",Ze),vi(o,Ca+"move",se),W.isEnabled=W.isPressed=W.isDragging=!1,Ie&&Ie(W))},W.kill=W.revert=function(){W.disable();var Oe=yo.indexOf(W);Oe>=0&&yo.splice(Oe,1),rs===W&&(rs=0)},yo.push(W),te&&ic(o)&&(rs=W),W.enable(v)},_M(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();hn.version="3.15.0";hn.create=function(i){return new hn(i)};hn.register=ax;hn.getAll=function(){return yo.slice()};hn.getById=function(i){return yo.filter(function(e){return e.vars.id===i})[0]};ix()&&Xn.registerPlugin(hn);var Ve,wo,gt,zt,Zi,Bt,gm,yh,vc,uc,sc,sh,ri,Mh,cm,Ai,ox,lx,bo,Tx,im,Ex,yi,um,wx,bx,ks,hm,vm,Co,xm,hc,fm,rm,ah=1,si=Date.now,sm=si(),cr=0,ac=0,cx=function(e,t,n){var r=Qi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},ux=function(e,t){return t&&(!Qi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},MM=function i(){return ac&&requestAnimationFrame(i)},hx=function(){return Mh=1},fx=function(){return Mh=0},Nr=function(e){return e},oc=function(e){return Math.round(e*1e5)/1e5||0},Cx=function(){return typeof window<"u"},Rx=function(){return Ve||Cx()&&(Ve=window.gsap)&&Ve.registerPlugin&&Ve},Ua=function(e){return!!~gm.indexOf(e)},Dx=function(e){return(e==="Height"?xm:gt["inner"+e])||Zi["client"+e]||Bt["client"+e]},Px=function(e){return as(e,"getBoundingClientRect")||(Ua(e)?function(){return _h.width=gt.innerWidth,_h.height=xm,_h}:function(){return os(e)})},TM=function(e,t,n){var r=n.d,s=n.d2,a=n.a;return(a=as(e,"getBoundingClientRect"))?function(){return a()[r]}:function(){return(t?Dx(s):e["client"+s])||0}},EM=function(e,t){return!t||~yr.indexOf(e)?Px(e):function(){return _h}},Or=function(e,t){var n=t.s,r=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+r)&&(a=as(e,n))?a()-Px(e)()[s]:Ua(e)?(Zi[n]||Bt[n])-Dx(r):e[n]-e["offset"+r])},oh=function(e,t){for(var n=0;n<bo.length;n+=3)(!t||~t.indexOf(bo[n+1]))&&e(bo[n],bo[n+1],bo[n+2])},Qi=function(e){return typeof e=="string"},ai=function(e){return typeof e=="function"},lc=function(e){return typeof e=="number"},Ra=function(e){return typeof e=="object"},rc=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Mo=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},To=Math.abs,Ix="left",Bx="top",_m="right",ym="bottom",Pa="width",Ia="height",fc="Right",dc="Left",pc="Top",mc="Bottom",_n="padding",or="margin",Do="Width",Am="Height",Rn="px",lr=function(e){return gt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},wM=function(e){var t=lr(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},dx=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},os=function(e,t){var n=t&&lr(e)[cm]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ve.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},Ah=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Ux=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},bM=function(e){return function(t){return Ve.utils.snap(Ux(e),t)}},Sm=function(e){var t=Ve.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,a){a===void 0&&(a=.001);var o;if(!s)return t(r);if(s>0){for(r-=a,o=0;o<n.length;o++)if(n[o]>=r)return n[o];return n[o-1]}else for(o=n.length,r+=a;o--;)if(n[o]<=r)return n[o];return n[0]}:function(r,s,a){a===void 0&&(a=.001);var o=t(r);return!s||Math.abs(o-r)<a||o-r<0==s<0?o:t(s<0?r-e:r+e)}},CM=function(e){return function(t,n){return Sm(Ux(e))(t,n.direction)}},lh=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},Nn=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},Fn=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},ch=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},px={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},uh={toggleActions:"play",anticipatePin:0},Sh={top:0,left:0,center:.5,bottom:1,right:1},mh=function(e,t){if(Qi(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in Sh?Sh[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},hh=function(e,t,n,r,s,a,o,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,p=zt.createElement("div"),v=Ua(n)||as(n,"pinType")==="fixed",g=e.indexOf("scroller")!==-1,m=v?Bt:n.tagName==="IFRAME"?n.contentDocument.body:n,x=e.indexOf("start")!==-1,_=x?c:u,y="border-color:"+_+";font-size:"+f+";color:"+_+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((g||l)&&v?"fixed;":"absolute;"),(g||l||!v)&&(y+=(r===xn?_m:ym)+":"+(a+parseFloat(h))+"px;"),o&&(y+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),p._isStart=x,p.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),p.style.cssText=y,p.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(p,m.children[0]):m.appendChild(p),p._offset=p["offset"+r.op.d2],gh(p,0,r,x),p},gh=function(e,t,n,r){var s={display:"block"},a=n[r?"os2":"p2"],o=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+a+Do]=1,s["border"+o+Do]=0,s[n.p]=t+"px",Ve.set(e,s)},mt=[],dm={},xc,mx=function(){return si()-cr>34&&(xc||(xc=requestAnimationFrame(ls)))},Eo=function(){(!yi||!yi.isPressed||yi.startX>Bt.clientWidth)&&(pt.cache++,yi?xc||(xc=requestAnimationFrame(ls)):ls(),cr||Fa("scrollStart"),cr=si())},am=function(){bx=gt.innerWidth,wx=gt.innerHeight},cc=function(e){pt.cache++,(e===!0||!ri&&!Ex&&!zt.fullscreenElement&&!zt.webkitFullscreenElement&&(!um||bx!==gt.innerWidth||Math.abs(gt.innerHeight-wx)>gt.innerHeight*.25))&&yh.restart(!0)},La={},RM=[],Lx=function i(){return Fn(ot,"scrollEnd",i)||Da(!0)},Fa=function(e){return La[e]&&La[e].map(function(t){return t()})||RM},qi=[],Fx=function(e){for(var t=0;t<qi.length;t+=5)(!e||qi[t+4]&&qi[t+4].query===e)&&(qi[t].style.cssText=qi[t+1],qi[t].getBBox&&qi[t].setAttribute("transform",qi[t+2]||""),qi[t+3].uncache=1)},Nx=function(){return pt.forEach(function(e){return ai(e)&&++e.cacheID&&(e.rec=e())})},Mm=function(e,t){var n;for(Ai=0;Ai<mt.length;Ai++)n=mt[Ai],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));hc=!0,t&&Fx(t),t||Fa("revert")},Ox=function(e,t){pt.cache++,(t||!Si)&&pt.forEach(function(n){return ai(n)&&n.cacheID++&&(n.rec=0)}),Qi(e)&&(gt.history.scrollRestoration=vm=e)},Si,Ba=0,gx,DM=function(){if(gx!==Ba){var e=gx=Ba;requestAnimationFrame(function(){return e===Ba&&Da(!0)})}},zx=function(){Bt.appendChild(Co),xm=!yi&&Co.offsetHeight||gt.innerHeight,Bt.removeChild(Co)},vx=function(e){return vc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Da=function(e,t){if(Zi=zt.documentElement,Bt=zt.body,gm=[gt,zt,Zi,Bt],cr&&!e&&!hc){Nn(ot,"scrollEnd",Lx);return}zx(),Si=ot.isRefreshing=!0,hc||Nx();var n=Fa("refreshInit");Tx&&ot.sort(),t||Mm(),pt.forEach(function(r){ai(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),mt.slice(0).forEach(function(r){return r.refresh()}),hc=!1,mt.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",a=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-a),r.refresh()}}),fm=1,vx(!0),mt.forEach(function(r){var s=Or(r.scroller,r._dir),a=r.vars.end==="max"||r._endClamp&&r.end>s,o=r._startClamp&&r.start>=s;(a||o)&&r.setPositions(o?s-1:r.start,a?Math.max(o?s:r.start+1,s):r.end,!0)}),vx(!1),fm=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),pt.forEach(function(r){ai(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Ox(vm,1),yh.pause(),Ba++,Si=2,ls(2),mt.forEach(function(r){return ai(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Si=ot.isRefreshing=!1,Fa("refresh")},pm=0,vh=1,gc,ls=function(e){if(e===2||!Si&&!hc){ot.isUpdating=!0,gc&&gc.update(0);var t=mt.length,n=si(),r=n-sm>=50,s=t&&mt[0].scroll();if(vh=pm>s?-1:1,Si||(pm=s),r&&(cr&&!Mh&&n-cr>200&&(cr=0,Fa("scrollEnd")),sc=sm,sm=n),vh<0){for(Ai=t;Ai-- >0;)mt[Ai]&&mt[Ai].update(0,r);vh=1}else for(Ai=0;Ai<t;Ai++)mt[Ai]&&mt[Ai].update(0,r);ot.isUpdating=!1}xc=0},mm=[Ix,Bx,ym,_m,or+mc,or+fc,or+pc,or+dc,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],xh=mm.concat([Pa,Ia,"boxSizing","max"+Do,"max"+Am,"position",or,_n,_n+pc,_n+fc,_n+mc,_n+dc]),PM=function(e,t,n){Ro(n);var r=e._gsap;if(r.spacerIsNative)Ro(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},om=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=mm.length,a=t.style,o=e.style,l;s--;)l=mm[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[ym]=o[_m]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Pa]=Ah(e,ii)+Rn,a[Ia]=Ah(e,xn)+Rn,a[_n]=o[or]=o[Bx]=o[Ix]="0",Ro(r),o[Pa]=o["max"+Do]=n[Pa],o[Ia]=o["max"+Am]=n[Ia],o[_n]=n[_n],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},IM=/([A-Z])/g,Ro=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,a;for((e.t._gsap||Ve.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],s=e[r],a?t[s]=a:t[s]&&t.removeProperty(s.replace(IM,"-$1").toLowerCase())}},fh=function(e){for(var t=xh.length,n=e.style,r=[],s=0;s<t;s++)r.push(xh[s],n[xh[s]]);return r.t=e,r},BM=function(e,t,n){for(var r=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},_h={left:0,top:0},xx=function(e,t,n,r,s,a,o,l,c,u,f,h,d,p){ai(e)&&(e=e(l)),Qi(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?mh("0"+e.substr(3),n):0));var v=d?d.time():0,g,m,x;if(d&&d.seek(0),isNaN(e)||(e=+e),lc(e))d&&(e=Ve.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),o&&gh(o,n,r,!0);else{ai(t)&&(t=t(l));var _=(e||"0").split(" "),y,S,T,E;x=_i(t,l)||Bt,y=os(x)||{},(!y||!y.left&&!y.top)&&lr(x).display==="none"&&(E=x.style.display,x.style.display="block",y=os(x),E?x.style.display=E:x.style.removeProperty("display")),S=mh(_[0],y[r.d]),T=mh(_[1]||"0",n),e=y[r.p]-c[r.p]-u+S+s-T,o&&gh(o,T,r,n-T<20||o._isStart&&T>20),n-=n-T}if(p&&(l[p]=e||-.001,e<0&&(e=0)),a){var A=e+n,M=a._isStart;g="scroll"+r.d2,gh(a,A,r,M&&A>20||!M&&(f?Math.max(Bt[g],Zi[g]):a.parentNode[g])<=A+1),f&&(c=os(o),f&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+Rn))}return d&&x&&(g=os(x),d.seek(h),m=os(x),d._caScrollDist=g[r.p]-m[r.p],e=e/d._caScrollDist*h),d&&d.seek(v),d?e:Math.round(e)},UM=/(webkit|moz|length|cssText|inset)/i,_x=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,a,o;if(t===Bt){e._stOrig=s.cssText,o=lr(e);for(a in o)!+a&&!UM.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=r}else s.cssText=e._stOrig;Ve.core.getCache(e).uncache=1,t.appendChild(e)}},kx=function(e,t,n){var r=t,s=r;return function(a){var o=Math.round(e());return o!==r&&o!==s&&Math.abs(o-r)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=r,r=Math.round(a),r}},dh=function(e,t,n){var r={};r[t.p]="+="+n,Ve.set(e,r)},yx=function(e,t){var n=ss(e,t),r="_scroll"+t.p2,s=function a(o,l,c,u,f){var h=a.tween,d=l.onComplete,p={};c=c||n();var v=kx(n,c,function(){h.kill(),a.tween=0});return f=u&&f||0,u=u||o-c,h&&h.kill(),l[r]=o,l.inherit=!1,l.modifiers=p,p[r]=function(){return v(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){pt.cache++,a.tween&&ls()},l.onComplete=function(){a.tween=0,d&&d.call(h)},h=a.tween=Ve.to(e,l),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Nn(e,"wheel",n.wheelHandler),ot.isTouch&&Nn(e,"touchmove",n.wheelHandler),s},ot=function(){function i(t,n){wo||i.register(Ve)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),hm(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ac){this.update=this.refresh=this.kill=Nr;return}n=dx(Qi(n)||lc(n)||n.nodeType?{trigger:n}:n,uh);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,p=s.pinSpacing,v=s.invalidateOnRefresh,g=s.anticipatePin,m=s.onScrubComplete,x=s.onSnapComplete,_=s.once,y=s.snap,S=s.pinReparent,T=s.pinSpacer,E=s.containerAnimation,A=s.fastScrollEnd,M=s.preventOverlaps,C=n.horizontal||n.containerAnimation&&n.horizontal!==!1?ii:xn,R=!f&&f!==0,w=_i(n.scroller||gt),P=Ve.core.getCache(w),U=Ua(w),N=("pinType"in n?n.pinType:as(w,"pinType")||U&&"fixed")==="fixed",H=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],k=R&&n.toggleActions.split(" "),te="markers"in n?n.markers:uh.markers,K=U?0:parseFloat(lr(w)["border"+C.p2+Do])||0,L=this,oe=n.onRefreshInit&&function(){return n.onRefreshInit(L)},ce=TM(w,U,C),Ie=EM(w,U),pe=0,be=0,Z=0,le=ss(w,C),G,ue,Q,de,Se,ae,_e,ye,Ae,W,z,We,ke,Le,xe,B,b,V,$,ie,ne,Me,ve,Pe,Be,me,O,Y,q,re,Te,F,ge,he,Ee,fe,se,ze,Ze;if(L._startClamp=L._endClamp=!1,L._dir=C,g*=45,L.scroller=w,L.scroll=E?E.time.bind(E):le,de=le(),L.vars=n,r=r||n.animation,"refreshPriority"in n&&(Tx=1,n.refreshPriority===-9999&&(gc=L)),P.tweenScroll=P.tweenScroll||{top:yx(w,xn),left:yx(w,ii)},L.tweenTo=G=P.tweenScroll[C.p],L.scrubDuration=function(Fe){ge=lc(Fe)&&Fe,ge?F?F.duration(Fe):F=Ve.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ge,paused:!0,onComplete:function(){return m&&m(L)}}):(F&&F.progress(1).kill(),F=0)},r&&(r.vars.lazy=!1,r._initted&&!L.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),L.animation=r.pause(),r.scrollTrigger=L,L.scrubDuration(f),re=0,l||(l=r.vars.id)),y&&((!Ra(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in Bt.style&&Ve.set(U?[Bt,Zi]:w,{scrollBehavior:"auto"}),pt.forEach(function(Fe){return ai(Fe)&&Fe.target===(U?zt.scrollingElement||Zi:w)&&(Fe.smooth=!1)}),Q=ai(y.snapTo)?y.snapTo:y.snapTo==="labels"?bM(r):y.snapTo==="labelsDirectional"?CM(r):y.directional!==!1?function(Fe,tt){return Sm(y.snapTo)(Fe,si()-be<500?0:tt.direction)}:Ve.utils.snap(y.snapTo),he=y.duration||{min:.1,max:2},he=Ra(he)?uc(he.min,he.max):uc(he,he),Ee=Ve.delayedCall(y.delay||ge/2||.1,function(){var Fe=le(),tt=si()-be<500,Ke=G.tween;if((tt||Math.abs(L.getVelocity())<10)&&!Ke&&!Mh&&pe!==Fe){var nt=(Fe-ae)/Le,pn=r&&!R?r.totalProgress():nt,at=tt?0:(pn-Te)/(si()-sc)*1e3||0,Jt=Ve.utils.clamp(-nt,1-nt,To(at/2)*at/.185),En=nt+(y.inertia===!1?0:Jt),jt,Ot,It=y,Jn=It.onStart,Zt=It.onInterrupt,jn=It.onComplete;if(jt=Q(En,L),lc(jt)||(jt=En),Ot=Math.max(0,Math.round(ae+jt*Le)),Fe<=_e&&Fe>=ae&&Ot!==Fe){if(Ke&&!Ke._initted&&Ke.data<=To(Ot-Fe))return;y.inertia===!1&&(Jt=jt-nt),G(Ot,{duration:he(To(Math.max(To(En-pn),To(jt-pn))*.185/at/.05||0)),ease:y.ease||"power3",data:To(Ot-Fe),onInterrupt:function(){return Ee.restart(!0)&&Zt&&Mo(L,Zt)},onComplete:function(){L.update(),pe=le(),r&&!R&&(F?F.resetTo("totalProgress",jt,r._tTime/r._tDur):r.progress(jt)),re=Te=r&&!R?r.totalProgress():L.progress,x&&x(L),jn&&Mo(L,jn)}},Fe,Jt*Le,Ot-Fe-Jt*Le),Jn&&Mo(L,Jn,G.tween)}}else L.isActive&&pe!==Fe&&Ee.restart(!0)}).pause()),l&&(dm[l]=L),h=L.trigger=_i(h||d!==!0&&d),Ze=h&&h._gsap&&h._gsap.stRevert,Ze&&(Ze=Ze(L)),d=d===!0?h:_i(d),Qi(o)&&(o={targets:h,className:o}),d&&(p===!1||p===or||(p=!p&&d.parentNode&&d.parentNode.style&&lr(d.parentNode).display==="flex"?!1:_n),L.pin=d,ue=Ve.core.getCache(d),ue.spacer?xe=ue.pinState:(T&&(T=_i(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),ue.spacerIsNative=!!T,T&&(ue.spacerState=fh(T))),ue.spacer=V=T||zt.createElement("div"),V.classList.add("pin-spacer"),l&&V.classList.add("pin-spacer-"+l),ue.pinState=xe=fh(d)),n.force3D!==!1&&Ve.set(d,{force3D:!0}),L.spacer=V=ue.spacer,q=lr(d),Pe=q[p+C.os2],ie=Ve.getProperty(d),ne=Ve.quickSetter(d,C.a,Rn),om(d,V,q),b=fh(d)),te){We=Ra(te)?dx(te,px):px,W=hh("scroller-start",l,w,C,We,0),z=hh("scroller-end",l,w,C,We,0,W),$=W["offset"+C.op.d2];var Tt=_i(as(w,"content")||w);ye=this.markerStart=hh("start",l,Tt,C,We,$,0,E),Ae=this.markerEnd=hh("end",l,Tt,C,We,$,0,E),E&&(ze=Ve.quickSetter([ye,Ae],C.a,Rn)),!N&&!(yr.length&&as(w,"fixedMarkers")===!0)&&(wM(U?Bt:w),Ve.set([W,z],{force3D:!0}),me=Ve.quickSetter(W,C.a,Rn),Y=Ve.quickSetter(z,C.a,Rn))}if(E){var Oe=E.vars.onUpdate,Xe=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){L.update(0,0,1),Oe&&Oe.apply(E,Xe||[])})}if(L.previous=function(){return mt[mt.indexOf(L)-1]},L.next=function(){return mt[mt.indexOf(L)+1]},L.revert=function(Fe,tt){if(!tt)return L.kill(!0);var Ke=Fe!==!1||!L.enabled,nt=ri;Ke!==L.isReverted&&(Ke&&(fe=Math.max(le(),L.scroll.rec||0),Z=L.progress,se=r&&r.progress()),ye&&[ye,Ae,W,z].forEach(function(pn){return pn.style.display=Ke?"none":"block"}),Ke&&(ri=L,L.update(Ke)),d&&(!S||!L.isActive)&&(Ke?PM(d,V,xe):om(d,V,lr(d),Be)),Ke||L.update(Ke),ri=nt,L.isReverted=Ke)},L.refresh=function(Fe,tt,Ke,nt){if(!((ri||!L.enabled)&&!tt)){if(d&&Fe&&cr){Nn(i,"scrollEnd",Lx);return}!Si&&oe&&oe(L),ri=L,G.tween&&!Ke&&(G.tween.kill(),G.tween=0),F&&F.pause(),v&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(He){return He.vars.immediateRender&&He.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),L.isReverted||L.revert(!0,!0),L._subPinOffset=!1;var pn=ce(),at=Ie(),Jt=E?E.duration():Or(w,C),En=Le<=.01||!Le,jt=0,Ot=nt||0,It=Ra(Ke)?Ke.end:n.end,Jn=n.endTrigger||h,Zt=Ra(Ke)?Ke.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),jn=L.pinnedContainer=n.pinnedContainer&&_i(n.pinnedContainer,L),ir=h&&Math.max(0,mt.indexOf(L))||0,wn=ir,bn,Un,jr,ao,D,X,ee,j,J,Re,Ue,De,Ge;for(te&&Ra(Ke)&&(De=Ve.getProperty(W,C.p),Ge=Ve.getProperty(z,C.p));wn-- >0;)X=mt[wn],X.end||X.refresh(0,1)||(ri=L),ee=X.pin,ee&&(ee===h||ee===d||ee===jn)&&!X.isReverted&&(Re||(Re=[]),Re.unshift(X),X.revert(!0,!0)),X!==mt[wn]&&(ir--,wn--);for(ai(Zt)&&(Zt=Zt(L)),Zt=cx(Zt,"start",L),ae=xx(Zt,h,pn,C,le(),ye,W,L,at,K,N,Jt,E,L._startClamp&&"_startClamp")||(d?-.001:0),ai(It)&&(It=It(L)),Qi(It)&&!It.indexOf("+=")&&(~It.indexOf(" ")?It=(Qi(Zt)?Zt.split(" ")[0]:"")+It:(jt=mh(It.substr(2),pn),It=Qi(Zt)?Zt:(E?Ve.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,ae):ae)+jt,Jn=h)),It=cx(It,"end",L),_e=Math.max(ae,xx(It||(Jn?"100% 0":Jt),Jn,pn,C,le()+jt,Ae,z,L,at,K,N,Jt,E,L._endClamp&&"_endClamp"))||-.001,jt=0,wn=ir;wn--;)X=mt[wn]||{},ee=X.pin,ee&&X.start-X._pinPush<=ae&&!E&&X.end>0&&(bn=X.end-(L._startClamp?Math.max(0,X.start):X.start),(ee===h&&X.start-X._pinPush<ae||ee===jn)&&isNaN(Zt)&&(jt+=bn*(1-X.progress)),ee===d&&(Ot+=bn));if(ae+=jt,_e+=jt,L._startClamp&&(L._startClamp+=jt),L._endClamp&&!Si&&(L._endClamp=_e||-.001,_e=Math.min(_e,Or(w,C))),Le=_e-ae||(ae-=.01)&&.001,En&&(Z=Ve.utils.clamp(0,1,Ve.utils.normalize(ae,_e,fe))),L._pinPush=Ot,ye&&jt&&(bn={},bn[C.a]="+="+jt,jn&&(bn[C.p]="-="+le()),Ve.set([ye,Ae],bn)),d&&!(fm&&L.end>=Or(w,C)))bn=lr(d),ao=C===xn,jr=le(),Me=parseFloat(ie(C.a))+Ot,!Jt&&_e>1&&(Ue=(U?zt.scrollingElement||Zi:w).style,Ue={style:Ue,value:Ue["overflow"+C.a.toUpperCase()]},U&&lr(Bt)["overflow"+C.a.toUpperCase()]!=="scroll"&&(Ue.style["overflow"+C.a.toUpperCase()]="scroll")),om(d,V,bn),b=fh(d),Un=os(d,!0),j=N&&ss(w,ao?ii:xn)(),p?(Be=[p+C.os2,Le+Ot+Rn],Be.t=V,wn=p===_n?Ah(d,C)+Le+Ot:0,wn&&(Be.push(C.d,wn+Rn),V.style.flexBasis!=="auto"&&(V.style.flexBasis=wn+Rn)),Ro(Be),jn&&mt.forEach(function(He){He.pin===jn&&He.vars.pinSpacing!==!1&&(He._subPinOffset=!0)}),N&&le(fe)):(wn=Ah(d,C),wn&&V.style.flexBasis!=="auto"&&(V.style.flexBasis=wn+Rn)),N&&(D={top:Un.top+(ao?jr-ae:j)+Rn,left:Un.left+(ao?j:jr-ae)+Rn,boxSizing:"border-box",position:"fixed"},D[Pa]=D["max"+Do]=Math.ceil(Un.width)+Rn,D[Ia]=D["max"+Am]=Math.ceil(Un.height)+Rn,D[or]=D[or+pc]=D[or+fc]=D[or+mc]=D[or+dc]="0",D[_n]=bn[_n],D[_n+pc]=bn[_n+pc],D[_n+fc]=bn[_n+fc],D[_n+mc]=bn[_n+mc],D[_n+dc]=bn[_n+dc],B=BM(xe,D,S),Si&&le(0)),r?(J=r._initted,im(1),r.render(r.duration(),!0,!0),ve=ie(C.a)-Me+Le+Ot,O=Math.abs(Le-ve)>1,N&&O&&B.splice(B.length-2,2),r.render(0,!0,!0),J||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),im(0)):ve=Le,Ue&&(Ue.value?Ue.style["overflow"+C.a.toUpperCase()]=Ue.value:Ue.style.removeProperty("overflow-"+C.a));else if(h&&le()&&!E)for(Un=h.parentNode;Un&&Un!==Bt;)Un._pinOffset&&(ae-=Un._pinOffset,_e-=Un._pinOffset),Un=Un.parentNode;Re&&Re.forEach(function(He){return He.revert(!1,!0)}),L.start=ae,L.end=_e,de=Se=Si?fe:le(),!E&&!Si&&(de<fe&&le(fe),L.scroll.rec=0),L.revert(!1,!0),be=si(),Ee&&(pe=-1,Ee.restart(!0)),ri=0,r&&R&&(r._initted||se)&&r.progress()!==se&&r.progress(se||0,!0).render(r.time(),!0,!0),(En||Z!==L.progress||E||v||r&&!r._initted)&&(r&&!R&&(r._initted||Z||r.vars.immediateRender!==!1)&&r.totalProgress(E&&ae<-.001&&!Z?Ve.utils.normalize(ae,_e,0):Z,!0),L.progress=En||(de-ae)/Le===Z?0:Z),d&&p&&(V._pinOffset=Math.round(L.progress*ve)),F&&F.invalidate(),isNaN(De)||(De-=Ve.getProperty(W,C.p),Ge-=Ve.getProperty(z,C.p),dh(W,C,De),dh(ye,C,De-(nt||0)),dh(z,C,Ge),dh(Ae,C,Ge-(nt||0))),En&&!Si&&L.update(),u&&!Si&&!ke&&(ke=!0,u(L),ke=!1)}},L.getVelocity=function(){return(le()-Se)/(si()-sc)*1e3||0},L.endAnimation=function(){rc(L.callbackAnimation),r&&(F?F.progress(1):r.paused()?R||rc(r,L.direction<0,1):rc(r,r.reversed()))},L.labelToScroll=function(Fe){return r&&r.labels&&(ae||L.refresh()||ae)+r.labels[Fe]/r.duration()*Le||0},L.getTrailing=function(Fe){var tt=mt.indexOf(L),Ke=L.direction>0?mt.slice(0,tt).reverse():mt.slice(tt+1);return(Qi(Fe)?Ke.filter(function(nt){return nt.vars.preventOverlaps===Fe}):Ke).filter(function(nt){return L.direction>0?nt.end<=ae:nt.start>=_e})},L.update=function(Fe,tt,Ke){if(!(E&&!Ke&&!Fe)){var nt=Si===!0?fe:L.scroll(),pn=Fe?0:(nt-ae)/Le,at=pn<0?0:pn>1?1:pn||0,Jt=L.progress,En,jt,Ot,It,Jn,Zt,jn,ir;if(tt&&(Se=de,de=E?le():nt,y&&(Te=re,re=r&&!R?r.totalProgress():at)),g&&d&&!ri&&!ah&&cr&&(!at&&ae<nt+(nt-Se)/(si()-sc)*g?at=1e-4:at===1&&_e>nt+(nt-Se)/(si()-sc)*g&&(at=.9999)),at!==Jt&&L.enabled){if(En=L.isActive=!!at&&at<1,jt=!!Jt&&Jt<1,Zt=En!==jt,Jn=Zt||!!at!=!!Jt,L.direction=at>Jt?1:-1,L.progress=at,Jn&&!ri&&(Ot=at&&!Jt?0:at===1?1:Jt===1?2:3,R&&(It=!Zt&&k[Ot+1]!=="none"&&k[Ot+1]||k[Ot],ir=r&&(It==="complete"||It==="reset"||It in r))),M&&(Zt||ir)&&(ir||f||!r)&&(ai(M)?M(L):L.getTrailing(M).forEach(function(jr){return jr.endAnimation()})),R||(F&&!ri&&!ah?(F._dp._time-F._start!==F._time&&F.render(F._dp._time-F._start),F.resetTo?F.resetTo("totalProgress",at,r._tTime/r._tDur):(F.vars.totalProgress=at,F.invalidate().restart())):r&&r.totalProgress(at,!!(ri&&(be||Fe)))),d){if(Fe&&p&&(V.style[p+C.os2]=Pe),!N)ne(oc(Me+ve*at));else if(Jn){if(jn=!Fe&&at>Jt&&_e+1>nt&&nt+1>=Or(w,C),S)if(!Fe&&(En||jn)){var wn=os(d,!0),bn=nt-ae;_x(d,Bt,wn.top+(C===xn?bn:0)+Rn,wn.left+(C===xn?0:bn)+Rn)}else _x(d,V);Ro(En||jn?B:b),O&&at<1&&En||ne(Me+(at===1&&!jn?ve:0))}}y&&!G.tween&&!ri&&!ah&&Ee.restart(!0),o&&(Zt||_&&at&&(at<1||!rm))&&vc(o.targets).forEach(function(jr){return jr.classList[En||_?"add":"remove"](o.className)}),a&&!R&&!Fe&&a(L),Jn&&!ri?(R&&(ir&&(It==="complete"?r.pause().totalProgress(1):It==="reset"?r.restart(!0).pause():It==="restart"?r.restart(!0):r[It]()),a&&a(L)),(Zt||!rm)&&(c&&Zt&&Mo(L,c),H[Ot]&&Mo(L,H[Ot]),_&&(at===1?L.kill(!1,1):H[Ot]=0),Zt||(Ot=at===1?1:3,H[Ot]&&Mo(L,H[Ot]))),A&&!En&&Math.abs(L.getVelocity())>(lc(A)?A:2500)&&(rc(L.callbackAnimation),F?F.progress(1):rc(r,It==="reverse"?1:!at,1))):R&&a&&!ri&&a(L)}if(Y){var Un=E?nt/E.duration()*(E._caScrollDist||0):nt;me(Un+(W._isFlipped?1:0)),Y(Un)}ze&&ze(-nt/E.duration()*(E._caScrollDist||0))}},L.enable=function(Fe,tt){L.enabled||(L.enabled=!0,Nn(w,"resize",cc),U||Nn(w,"scroll",Eo),oe&&Nn(i,"refreshInit",oe),Fe!==!1&&(L.progress=Z=0,de=Se=pe=le()),tt!==!1&&L.refresh())},L.getTween=function(Fe){return Fe&&G?G.tween:F},L.setPositions=function(Fe,tt,Ke,nt){if(E){var pn=E.scrollTrigger,at=E.duration(),Jt=pn.end-pn.start;Fe=pn.start+Jt*Fe/at,tt=pn.start+Jt*tt/at}L.refresh(!1,!1,{start:ux(Fe,Ke&&!!L._startClamp),end:ux(tt,Ke&&!!L._endClamp)},nt),L.update()},L.adjustPinSpacing=function(Fe){if(Be&&Fe){var tt=Be.indexOf(C.d)+1;Be[tt]=parseFloat(Be[tt])+Fe+Rn,Be[1]=parseFloat(Be[1])+Fe+Rn,Ro(Be)}},L.disable=function(Fe,tt){if(Fe!==!1&&L.revert(!0,!0),L.enabled&&(L.enabled=L.isActive=!1,tt||F&&F.pause(),fe=0,ue&&(ue.uncache=1),oe&&Fn(i,"refreshInit",oe),Ee&&(Ee.pause(),G.tween&&G.tween.kill()&&(G.tween=0)),!U)){for(var Ke=mt.length;Ke--;)if(mt[Ke].scroller===w&&mt[Ke]!==L)return;Fn(w,"resize",cc),U||Fn(w,"scroll",Eo)}},L.kill=function(Fe,tt){L.disable(Fe,tt),F&&!tt&&F.kill(),l&&delete dm[l];var Ke=mt.indexOf(L);Ke>=0&&mt.splice(Ke,1),Ke===Ai&&vh>0&&Ai--,Ke=0,mt.forEach(function(nt){return nt.scroller===L.scroller&&(Ke=1)}),Ke||Si||(L.scroll.rec=0),r&&(r.scrollTrigger=null,Fe&&r.revert({kill:!1}),tt||r.kill()),ye&&[ye,Ae,W,z].forEach(function(nt){return nt.parentNode&&nt.parentNode.removeChild(nt)}),gc===L&&(gc=0),d&&(ue&&(ue.uncache=1),Ke=0,mt.forEach(function(nt){return nt.pin===d&&Ke++}),Ke||(ue.spacer=0)),n.onKill&&n.onKill(L)},mt.push(L),L.enable(!1,!1),Ze&&Ze(L),r&&r.add&&!Le){var ct=L.update;L.update=function(){L.update=ct,pt.cache++,ae||_e||L.refresh()},Ve.delayedCall(.01,L.update),Le=.01,ae=_e=0}else L.refresh();d&&DM()},i.register=function(n){return wo||(Ve=n||Rx(),Cx()&&window.document&&i.enable(),wo=ac),wo},i.defaults=function(n){if(n)for(var r in n)uh[r]=n[r];return uh},i.disable=function(n,r){ac=0,mt.forEach(function(a){return a[r?"kill":"disable"](n)}),Fn(gt,"wheel",Eo),Fn(zt,"scroll",Eo),clearInterval(sh),Fn(zt,"touchcancel",Nr),Fn(Bt,"touchstart",Nr),lh(Fn,zt,"pointerdown,touchstart,mousedown",hx),lh(Fn,zt,"pointerup,touchend,mouseup",fx),yh.kill(),oh(Fn);for(var s=0;s<pt.length;s+=3)ch(Fn,pt[s],pt[s+1]),ch(Fn,pt[s],pt[s+2])},i.enable=function(){if(gt=window,zt=document,Zi=zt.documentElement,Bt=zt.body,Ve){if(vc=Ve.utils.toArray,uc=Ve.utils.clamp,hm=Ve.core.context||Nr,im=Ve.core.suppressOverwrites||Nr,vm=gt.history.scrollRestoration||"auto",pm=gt.pageYOffset||0,Ve.core.globals("ScrollTrigger",i),Bt){ac=1,Co=document.createElement("div"),Co.style.height="100vh",Co.style.position="absolute",zx(),MM(),hn.register(Ve),i.isTouch=hn.isTouch,ks=hn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),um=hn.isTouch===1,Nn(gt,"wheel",Eo),gm=[gt,zt,Zi,Bt],Ve.matchMedia?(i.matchMedia=function(u){var f=Ve.matchMedia(),h;for(h in u)f.add(h,u[h]);return f},Ve.addEventListener("matchMediaInit",function(){Nx(),Mm()}),Ve.addEventListener("matchMediaRevert",function(){return Fx()}),Ve.addEventListener("matchMedia",function(){Da(0,1),Fa("matchMedia")}),Ve.matchMedia().add("(orientation: portrait)",function(){return am(),am})):console.warn("Requires GSAP 3.11.0 or later"),am(),Nn(zt,"scroll",Eo);var n=Bt.hasAttribute("style"),r=Bt.style,s=r.borderTopStyle,a=Ve.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",o=os(Bt),xn.m=Math.round(o.top+xn.sc())||0,ii.m=Math.round(o.left+ii.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(Bt.setAttribute("style",""),Bt.removeAttribute("style")),sh=setInterval(mx,250),Ve.delayedCall(.5,function(){return ah=0}),Nn(zt,"touchcancel",Nr),Nn(Bt,"touchstart",Nr),lh(Nn,zt,"pointerdown,touchstart,mousedown",hx),lh(Nn,zt,"pointerup,touchend,mouseup",fx),cm=Ve.utils.checkPrefix("transform"),xh.push(cm),wo=si(),yh=Ve.delayedCall(.2,Da).pause(),bo=[zt,"visibilitychange",function(){var u=gt.innerWidth,f=gt.innerHeight;zt.hidden?(ox=u,lx=f):(ox!==u||lx!==f)&&cc()},zt,"DOMContentLoaded",Da,gt,"load",Da,gt,"resize",cc],oh(Nn),mt.forEach(function(u){return u.enable(0,1)}),l=0;l<pt.length;l+=3)ch(Fn,pt[l],pt[l+1]),ch(Fn,pt[l],pt[l+2])}else if(zt){var c=function u(){i.enable(),zt.removeEventListener("DOMContentLoaded",u)};zt.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(rm=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(sh)||(sh=r)&&setInterval(mx,r),"ignoreMobileResize"in n&&(um=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(oh(Fn)||oh(Nn,n.autoRefreshEvents||"none"),Ex=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=_i(n),a=pt.indexOf(s),o=Ua(s);~a&&pt.splice(a,o?6:2),r&&(o?yr.unshift(gt,r,Bt,r,Zi,r):yr.unshift(s,r))},i.clearMatchMedia=function(n){mt.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var a=(Qi(n)?_i(n):n).getBoundingClientRect(),o=a[s?Pa:Ia]*r||0;return s?a.right-o>0&&a.left+o<gt.innerWidth:a.bottom-o>0&&a.top+o<gt.innerHeight},i.positionInViewport=function(n,r,s){Qi(n)&&(n=_i(n));var a=n.getBoundingClientRect(),o=a[s?Pa:Ia],l=r==null?o/2:r in Sh?Sh[r]*o:~r.indexOf("%")?parseFloat(r)*o/100:parseFloat(r)||0;return s?(a.left+l)/gt.innerWidth:(a.top+l)/gt.innerHeight},i.killAll=function(n){if(mt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=La.killAll||[];La={},r.forEach(function(s){return s()})}},i}();ot.version="3.15.0";ot.saveStyles=function(i){return i?vc(i).forEach(function(e){if(e&&e.style){var t=qi.indexOf(e);t>=0&&qi.splice(t,5),qi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ve.core.getCache(e),hm())}}):qi};ot.revert=function(i,e){return Mm(!i,e)};ot.create=function(i,e){return new ot(i,e)};ot.refresh=function(i){return i?cc(!0):(wo||ot.register())&&Da(!0)};ot.update=function(i){return++pt.cache&&ls(i===!0?2:0)};ot.clearScrollMemory=Ox;ot.maxScroll=function(i,e){return Or(i,e?ii:xn)};ot.getScrollFunc=function(i,e){return ss(_i(i),e?ii:xn)};ot.getById=function(i){return dm[i]};ot.getAll=function(){return mt.filter(function(i){return i.vars.id!=="ScrollSmoother"})};ot.isScrolling=function(){return!!cr};ot.snapDirectional=Sm;ot.addEventListener=function(i,e){var t=La[i]||(La[i]=[]);~t.indexOf(e)||t.push(e)};ot.removeEventListener=function(i,e){var t=La[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ot.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var f=[],h=[],d=Ve.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(p){f.length||d.restart(!0),f.push(p.trigger),h.push(p),s<=f.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&ai(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return ai(s)&&(s=s(),Nn(ot,"refresh",function(){return s=e.batchMax()})),vc(i).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(ot.create(c))}),t};var Ax=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},lm=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(hn.isTouch?" pinch-zoom":""):"none",e===Zi&&i(Bt,t)},ph={auto:1,scroll:1},LM=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Ve.core.getCache(s),o=si(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==Bt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ph[(l=lr(s)).overflowY]||ph[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Ua(s)&&(ph[(l=lr(s)).overflowY]||ph[l.overflowX]),a._isScrollT=o}(a._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Hx=function(e,t,n,r){return hn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&LM,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&Nn(zt,hn.eventTypes[0],Mx,!1,!0)},onDisable:function(){return Fn(zt,hn.eventTypes[0],Mx,!0)}})},FM=/(input|label|select|textarea)/i,Sx,Mx=function(e){var t=FM.test(e.target.tagName);(t||Sx)&&(e._gsapAllow=!0,Sx=t)},NM=function(e){Ra(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=_i(e.target)||Zi,u=Ve.core.globals().ScrollSmoother,f=u&&u.get(),h=ks&&(e.content&&_i(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=ss(c,xn),p=ss(c,ii),v=1,g=(hn.isTouch&&gt.visualViewport?gt.visualViewport.scale*gt.visualViewport.width:gt.outerWidth)/gt.innerWidth,m=0,x=ai(r)?function(){return r(o)}:function(){return r||2.8},_,y,S=Hx(c,e.type,!0,s),T=function(){return y=!1},E=Nr,A=Nr,M=function(){l=Or(c,xn),A=uc(ks?1:0,l),n&&(E=uc(0,Or(c,ii))),_=Ba},C=function(){h._gsap.y=oc(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},R=function(){if(y){requestAnimationFrame(T);var te=oc(o.deltaY/2),K=A(d.v-te);if(h&&K!==d.v+d.offset){d.offset=K-d.v;var L=oc((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+L+", 0, 1)",h._gsap.y=L+"px",d.cacheID=pt.cache,ls()}return!0}d.offset&&C(),y=!0},w,P,U,N,H=function(){M(),w.isActive()&&w.vars.scrollY>l&&(d()>l?w.progress(1)&&d(l):w.resetTo("scrollY",l))};return h&&Ve.set(h,{y:"+=0"}),e.ignoreCheck=function(k){return ks&&k.type==="touchmove"&&R(k)||v>1.05&&k.type!=="touchstart"||o.isGesturing||k.touches&&k.touches.length>1},e.onPress=function(){y=!1;var k=v;v=oc((gt.visualViewport&&gt.visualViewport.scale||1)/g),w.pause(),k!==v&&lm(c,v>1.01?!0:n?!1:"x"),P=p(),U=d(),M(),_=Ba},e.onRelease=e.onGestureStart=function(k,te){if(d.offset&&C(),!te)N.restart(!0);else{pt.cache++;var K=x(),L,oe;n&&(L=p(),oe=L+K*.05*-k.velocityX/.227,K*=Ax(p,L,oe,Or(c,ii)),w.vars.scrollX=E(oe)),L=d(),oe=L+K*.05*-k.velocityY/.227,K*=Ax(d,L,oe,Or(c,xn)),w.vars.scrollY=A(oe),w.invalidate().duration(K).play(.01),(ks&&w.vars.scrollY>=l||L>=l-1)&&Ve.to({},{onUpdate:H,duration:K})}a&&a(k)},e.onWheel=function(){w._ts&&w.pause(),si()-m>1e3&&(_=0,m=si())},e.onChange=function(k,te,K,L,oe){if(Ba!==_&&M(),te&&n&&p(E(L[2]===te?P+(k.startX-k.x):p()+te-L[1])),K){d.offset&&C();var ce=oe[2]===K,Ie=ce?U+k.startY-k.y:d()+K-oe[1],pe=A(Ie);ce&&Ie!==pe&&(U+=pe-Ie),d(pe)}(K||te)&&ls()},e.onEnable=function(){lm(c,n?!1:"x"),ot.addEventListener("refresh",H),Nn(gt,"resize",H),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=p.smooth=!1),S.enable()},e.onDisable=function(){lm(c,!0),Fn(gt,"resize",H),ot.removeEventListener("refresh",H),S.kill()},e.lockAxis=e.lockAxis!==!1,o=new hn(e),o.iOS=ks,ks&&!d()&&d(1),ks&&Ve.ticker.add(Nr),N=o._dc,w=Ve.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:kx(d,d(),function(){return w.pause()})},onUpdate:ls,onComplete:N.vars.onComplete}),o};ot.sort=function(i){if(ai(i))return mt.sort(i);var e=gt.pageYOffset||0;return ot.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+gt.innerHeight}),mt.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ot.observe=function(i){return new hn(i)};ot.normalizeScroll=function(i){if(typeof i>"u")return yi;if(i===!0&&yi)return yi.enable();if(i===!1){yi&&yi.kill(),yi=i;return}var e=i instanceof hn?i:NM(i);return yi&&yi.target===e.target&&yi.kill(),Ua(e.target)&&(yi=e),e};ot.core={_getVelocityProp:rh,_inputObserver:Hx,_scrollers:pt,_proxies:yr,bridge:{ss:function(){cr||Fa("scrollStart"),cr=si()},ref:function(){return ri}}};Rx()&&Ve.registerPlugin(ot);var _c,yc,Gx=typeof Symbol=="function"?Symbol():"_split",Em,OM=()=>Em||Eh.register(window.gsap),Vx=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter:0,Ac=i=>i?typeof i=="string"?Ac(document.querySelectorAll(i)):"length"in i?Array.from(i).reduce((e,t)=>(typeof t=="string"?e.push(...Ac(t)):e.push(t),e),[]):[i]:[],Wx=i=>Ac(i).filter(e=>e&&e.nodeType===1),wm=[],Tm=function(){},zM={add:i=>i()},kM=/\s+/g,Xx=new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.","gu"),Th={left:0,top:0,width:0,height:0},HM=(i,e)=>{for(;++e<i.length&&i[e]===Th;);return i[e]||Th},Yx=({element:i,html:e,ariaL:t,ariaH:n})=>{i.innerHTML=e,t?i.setAttribute("aria-label",t):i.removeAttribute("aria-label"),n?i.setAttribute("aria-hidden",n):i.removeAttribute("aria-hidden")},qx=(i,e)=>{if(e){let t=new Set(i.join("").match(e)||wm),n=i.length,r,s,a,o;if(t.size)for(;--n>-1;){s=i[n];for(a of t)if(a.startsWith(s)&&a.length>s.length){for(r=0,o=s;a.startsWith(o+=i[n+ ++r])&&o.length<a.length;);if(r&&o.length===a.length){i[n]=a,i.splice(n+1,r);break}}}}return i},Qx=i=>window.getComputedStyle(i).display==="inline"&&(i.style.display="inline-block"),Po=(i,e,t)=>e.insertBefore(typeof i=="string"?document.createTextNode(i):i,t),bm=(i,e,t)=>{let n=e[i+"sClass"]||"",{tag:r="div",aria:s="auto",propIndex:a=!1}=e,o=i==="line"?"block":"inline-block",l=n.indexOf("++")>-1,c=u=>{let f=document.createElement(r),h=t.length+1;return n&&(f.className=n+(l?" "+n+h:"")),a&&f.style.setProperty("--"+i,h+""),s!=="none"&&f.setAttribute("aria-hidden","true"),r!=="span"&&(f.style.position="relative",f.style.display=o),f.textContent=u,t.push(f),f};return l&&(n=n.replace("++","")),c.collection=t,c},GM=(i,e,t,n)=>{let r=bm("line",t,n),s=window.getComputedStyle(i).textAlign||"left";return(a,o)=>{let l=r("");for(l.style.textAlign=s,i.insertBefore(l,e[a]);a<o;a++)l.appendChild(e[a]);l.normalize()}},Zx=(i,e,t,n,r,s,a,o,l,c)=>{var u;let f=Array.from(i.childNodes),h=0,{wordDelimiter:d,reduceWhiteSpace:p=!0,prepareText:v}=e,g=i.getBoundingClientRect(),m=g,x=!p&&window.getComputedStyle(i).whiteSpace.substring(0,3)==="pre",_=0,y=t.collection,S,T,E,A,M,C,R,w,P,U,N,H,k,te,K,L,oe,ce;for(typeof d=="object"?(E=d.delimiter||d,T=d.replaceWith||""):T=d===""?"":d||" ",S=T!==" ";h<f.length;h++)if(A=f[h],A.nodeType===3){for(K=A.textContent||"",p?K=K.replace(kM," "):x&&(K=K.replace(/\n/g,T+`
`)),v&&(K=v(K,i)),A.textContent=K,M=T||E?K.split(E||T):K.match(o)||wm,oe=M[M.length-1],w=S?oe.slice(-1)===" ":!oe,oe||M.pop(),m=g,R=S?M[0].charAt(0)===" ":!M[0],R&&Po(" ",i,A),M[0]||M.shift(),qx(M,l),s&&c||(A.textContent=""),P=1;P<=M.length;P++)if(L=M[P-1],!p&&x&&L.charAt(0)===`
`&&((u=A.previousSibling)==null||u.remove(),Po(document.createElement("br"),i,A),L=L.slice(1)),!p&&L==="")Po(T,i,A);else if(L===" ")i.insertBefore(document.createTextNode(" "),A);else{if(S&&L.charAt(0)===" "&&Po(" ",i,A),_&&P===1&&!R&&y.indexOf(_.parentNode)>-1?(C=y[y.length-1],C.appendChild(document.createTextNode(n?"":L))):(C=t(n?"":L),Po(C,i,A),_&&P===1&&!R&&C.insertBefore(_,C.firstChild)),n)for(N=Vx?qx([...Vx.segment(L)].map(Ie=>Ie.segment),l):L.match(o)||wm,ce=0;ce<N.length;ce++)C.appendChild(N[ce]===" "?document.createTextNode(" "):n(N[ce]));if(s&&c){if(K=A.textContent=K.substring(L.length+1,K.length),U=C.getBoundingClientRect(),U.top>m.top&&U.left<=m.left){for(H=i.cloneNode(),k=i.childNodes[0];k&&k!==C;)te=k,k=k.nextSibling,H.appendChild(te);i.parentNode.insertBefore(H,i),r&&Qx(H)}m=U}(P<M.length||w)&&Po(P>=M.length?" ":S&&L.slice(-1)===" "?" "+T:T,i,A)}i.removeChild(A),_=0}else A.nodeType===1&&(a&&a.indexOf(A)>-1?(y.indexOf(A.previousSibling)>-1&&y[y.length-1].appendChild(A),_=A):(Zx(A,e,t,n,r,s,a,o,l,!0),_=0),r&&Qx(A))},Kx=class Jx{constructor(e,t){this.isSplit=!1,OM(),this.elements=Wx(e),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=t,this.elements.forEach(a=>{var o;t.overwrite!==!1&&((o=a[Gx])==null||o._data.orig.filter(({element:l})=>l===a).forEach(Yx)),a[Gx]=this}),this._split=()=>this.isSplit&&this.split(this.vars);let n=[],r,s=()=>{let a=n.length,o;for(;a--;){o=n[a];let l=o.element.offsetWidth;if(l!==o.width){o.width=l,this._split();return}}};this._data={orig:n,obs:typeof ResizeObserver<"u"&&new ResizeObserver(()=>{clearTimeout(r),r=setTimeout(s,200)})},Tm(this),this.split(t)}split(e){return(this._ctx||zM).add(()=>{this.isSplit&&this.revert(),this.vars=e=e||this.vars||{};let{type:t="chars,words,lines",aria:n="auto",deepSlice:r=!0,smartWrap:s,onSplit:a,autoSplit:o=!1,specialChars:l,mask:c}=this.vars,u=t.indexOf("lines")>-1,f=t.indexOf("chars")>-1,h=t.indexOf("words")>-1,d=f&&!h&&!u,p=l&&("push"in l?new RegExp("(?:"+l.join("|")+")","gu"):l),v=p?new RegExp(p.source+"|"+Xx.source,"gu"):Xx,g=!!e.ignore&&Wx(e.ignore),{orig:m,animTime:x,obs:_}=this._data,y;(f||h||u)&&(this.elements.forEach((S,T)=>{m[T]={element:S,html:S.innerHTML,ariaL:S.getAttribute("aria-label"),ariaH:S.getAttribute("aria-hidden")},n==="auto"?S.setAttribute("aria-label",(S.textContent||"").trim()):n==="hidden"&&S.setAttribute("aria-hidden","true");let E=[],A=[],M=[],C=f?bm("char",e,E):null,R=bm("word",e,A),w,P,U,N;if(Zx(S,e,R,C,d,r&&(u||d),g,v,p,!1),u){let H=Ac(S.childNodes),k=GM(S,H,e,M),te,K=[],L=0,oe=H.map(pe=>pe.nodeType===1?pe.getBoundingClientRect():Th),ce=Th,Ie;for(w=0;w<H.length;w++)te=H[w],te.nodeType===1&&(te.nodeName==="BR"?((!w||H[w-1].nodeName!=="BR")&&(K.push(te),k(L,w+1)),L=w+1,ce=HM(oe,w)):(Ie=oe[w],w&&Ie.top>ce.top&&Ie.left<ce.left+ce.width-1&&(k(L,w),L=w),ce=Ie));L<w&&k(L,w),K.forEach(pe=>{var be;return(be=pe.parentNode)==null?void 0:be.removeChild(pe)})}if(!h){for(w=0;w<A.length;w++)if(P=A[w],f||!P.nextSibling||P.nextSibling.nodeType!==3)if(s&&!u){for(U=document.createElement("span"),U.style.whiteSpace="nowrap";P.firstChild;)U.appendChild(P.firstChild);P.replaceWith(U)}else P.replaceWith(...P.childNodes);else N=P.nextSibling,N&&N.nodeType===3&&(N.textContent=(P.textContent||"")+(N.textContent||""),P.remove());A.length=0,S.normalize()}this.lines.push(...M),this.words.push(...A),this.chars.push(...E)}),c&&this[c]&&this.masks.push(...this[c].map(S=>{let T=S.cloneNode();return S.replaceWith(T),T.appendChild(S),S.className&&(T.className=S.className.trim().split(" ").map(E=>E+"-mask").join(" ")),T.style.overflow="clip",T}))),this.isSplit=!0,yc&&u&&o&&yc.addEventListener("loadingdone",this._split),(y=a&&a(this))&&y.totalTime&&(this._data.anim=x?y.totalTime(x):y),u&&o&&this.elements.forEach((S,T)=>{m[T].width=S.offsetWidth,_&&_.observe(S)})}),this}kill(){let{obs:e}=this._data;e&&e.disconnect(),yc?.removeEventListener("loadingdone",this._split)}revert(){var e,t;if(this.isSplit){let{orig:n,anim:r}=this._data;this.kill(),n.forEach(Yx),this.chars.length=this.words.length=this.lines.length=n.length=this.masks.length=0,this.isSplit=!1,r&&(this._data.animTime=r.totalTime(),r.revert()),(t=(e=this.vars).onRevert)==null||t.call(e,this)}return this}static create(e,t){return new Jx(e,t)}static register(e){_c=_c||e||window.gsap,_c&&(Ac=_c.utils.toArray,Tm=_c.core.context||Tm),!Em&&window.innerWidth>0&&(yc=document.fonts,Em=!0)}};Kx.version="3.15.0";var Eh=Kx;var Qn="183";var M_=0,og=1,T_=2;var nu=1,E_=2,ll=3,ci=0,tn=1,vn=2,Ft=0,Ga=1,Js=2,lg=3,cg=4,w_=5;var qs=100,b_=101,C_=102,R_=103,D_=104,P_=200,I_=201,B_=202,U_=203,tf=204,nf=205,L_=206,F_=207,N_=208,O_=209,z_=210,k_=211,H_=212,G_=213,V_=214,rf=0,jo=1,sf=2,Va=3,af=4,of=5,lf=6,cf=7,ug=0,W_=1,X_=2,$i=0,hg=1,fg=2,dg=3,pg=4,mg=5,gg=6,vg=7;var xg=300,js=301,Qa=302,Uf=303,Lf=304,iu=306,$o=1e3,kr=1001,uf=1002,Ct=1003,Y_=1004;var ru=1005;var Vt=1006,Ff=1007;var Gr=1008;var xt=1009,cl=1010,su=1011,$s=1012,ea=1013,Sn=1014,nn=1015,hi=1016,Nf=1017,Of=1018,Vr=1020,_g=35902,yg=35899,Ag=1021,Sg=1022,Mn=1023,hr=1026,dr=1027,ta=1028,ul=1029,xs=1030,na=1031;var ia=1033,au=33776,ou=33777,lu=33778,cu=33779,zf=35840,kf=35841,Hf=35842,Gf=35843,Vf=36196,Wf=37492,Xf=37496,Yf=37488,qf=37489,Qf=37490,Zf=37491,Kf=37808,Jf=37809,jf=37810,$f=37811,ed=37812,td=37813,nd=37814,id=37815,rd=37816,sd=37817,ad=37818,od=37819,ld=37820,cd=37821,ud=36492,hd=36494,fd=36495,dd=36283,pd=36284,md=36285,gd=36286;var Bc=2300,hf=2301,ef=2302,eg=2303,tg=2400,ng=2401,ig=2402;var wi=3200;var Mg=0,q_=1,bi="",it="srgb",Ni="srgb-linear",Uc="linear",Ut="srgb";var Ha=7680;var rg=519,Q_=512,Z_=513,K_=514,vd=515,J_=516,j_=517,xd=518,$_=519,ff=35044,Wr=35048;var uu="300 es",Er=2e3,Lc=2001;function VM(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function WM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Fc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ey(){let i=Fc("canvas");return i.style.display="block",i}var jx={},el=null;function Nc(...i){let e="THREE."+i.shift();el?el("log",e,...i):console.log(e,...i)}function ty(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function $e(...i){i=ty(i);let e="THREE."+i.shift();if(el)el("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function je(...i){i=ty(i);let e="THREE."+i.shift();if(el)el("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Oc(...i){let e=i.join(" ");e in jx||(jx[e]=!0,$e(...i))}function ny(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var iy={[rf]:jo,[sf]:lf,[af]:cf,[Va]:of,[jo]:rf,[lf]:sf,[cf]:af,[of]:Va},Ti=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},oi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$x=1234567,Pc=Math.PI/180,tl=180/Math.PI;function ps(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(oi[i&255]+oi[i>>8&255]+oi[i>>16&255]+oi[i>>24&255]+"-"+oi[e&255]+oi[e>>8&255]+"-"+oi[e>>16&15|64]+oi[e>>24&255]+"-"+oi[t&63|128]+oi[t>>8&255]+"-"+oi[t>>16&255]+oi[t>>24&255]+oi[n&255]+oi[n>>8&255]+oi[n>>16&255]+oi[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function Tg(i,e){return(i%e+e)%e}function XM(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function YM(i,e,t){return i!==e?(t-i)/(e-i):0}function Ic(i,e,t){return(1-t)*i+t*e}function qM(i,e,t,n){return Ic(i,e,1-Math.exp(-t*n))}function QM(i,e=1){return e-Math.abs(Tg(i,e*2)-e)}function ZM(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function KM(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function JM(i,e){return i+Math.floor(Math.random()*(e-i+1))}function jM(i,e){return i+Math.random()*(e-i)}function $M(i){return i*(.5-Math.random())}function eT(i){i!==void 0&&($x=i);let e=$x+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function tT(i){return i*Pc}function nT(i){return i*tl}function iT(i){return(i&i-1)===0&&i!==0}function rT(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function sT(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function aT(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),f=s((e-n)/2),h=a((e-n)/2),d=s((n-e)/2),p=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*u,o*c);break;default:$e("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Tr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var fn={DEG2RAD:Pc,RAD2DEG:tl,generateUUID:ps,clamp:st,euclideanModulo:Tg,mapLinear:XM,inverseLerp:YM,lerp:Ic,damp:qM,pingpong:QM,smoothstep:ZM,smootherstep:KM,randInt:JM,randFloat:jM,randFloatSpread:$M,seededRandom:eT,degToRad:tT,radToDeg:nT,isPowerOfTwo:iT,ceilPowerOfTwo:rT,floorPowerOfTwo:sT,setQuaternionFromProperEuler:aT,normalize:kt,denormalize:Tr},Ce=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3],h=s[a+0],d=s[a+1],p=s[a+2],v=s[a+3];if(f!==v||l!==h||c!==d||u!==p){let g=l*h+c*d+u*p+f*v;g<0&&(h=-h,d=-d,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){let x=Math.acos(g),_=Math.sin(x);m=Math.sin(m*x)/_,o=Math.sin(o*x)/_,l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+v*o}else{l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+v*o;let x=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=x,c*=x,u*=x,f*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],h=s[a+1],d=s[a+2],p=s[a+3];return e[t]=o*p+u*f+l*d-c*h,e[t+1]=l*p+u*h+c*f-o*d,e[t+2]=c*p+u*d+o*h-l*f,e[t+3]=u*p-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),h=l(n/2),d=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:$e("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(e_.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(e_.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Cm.copy(this).projectOnVector(e),this.sub(Cm)}reflect(e){return this.sub(Cm.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Cm=new I,e_=new qn,et=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],p=n[8],v=r[0],g=r[3],m=r[6],x=r[1],_=r[4],y=r[7],S=r[2],T=r[5],E=r[8];return s[0]=a*v+o*x+l*S,s[3]=a*g+o*_+l*T,s[6]=a*m+o*y+l*E,s[1]=c*v+u*x+f*S,s[4]=c*g+u*_+f*T,s[7]=c*m+u*y+f*E,s[2]=h*v+d*x+p*S,s[5]=h*g+d*_+p*T,s[8]=h*m+d*y+p*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,p=t*f+n*h+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return e[0]=f*v,e[1]=(r*c-u*n)*v,e[2]=(o*n-r*a)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Rm.makeScale(e,t)),this}rotate(e){return this.premultiply(Rm.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Rm=new et,t_=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),n_=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function oT(){let i={enabled:!0,workingColorSpace:Ni,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ut&&(r.r=ms(r.r),r.g=ms(r.g),r.b=ms(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(r.r=Jo(r.r),r.g=Jo(r.g),r.b=Jo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===bi?Uc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Oc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Oc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ni]:{primaries:e,whitePoint:n,transfer:Uc,toXYZ:t_,fromXYZ:n_,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:it},outputColorSpaceConfig:{drawingBufferColorSpace:it}},[it]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:t_,fromXYZ:n_,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:it}}}),i}var St=oT();function ms(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Jo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Io,df=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Io===void 0&&(Io=Fc("canvas")),Io.width=e.width,Io.height=e.height;let r=Io.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Io}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Fc("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ms(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ms(t[n]/255)*255):t[n]=ms(t[n]);return{data:t,width:e.width,height:e.height}}else return $e("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},lT=0,nl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lT++}),this.uuid=ps(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Dm(r[a].image)):s.push(Dm(r[a]))}else s=Dm(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Dm(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?df.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:($e("Texture: Unable to serialize Texture."),{})}var cT=0,Pm=new I,Dn=class i extends Ti{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=kr,r=kr,s=Vt,a=Gr,o=Mn,l=xt,c=i.DEFAULT_ANISOTROPY,u=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cT++}),this.uuid=ps(),this.name="",this.source=new nl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Pm).x}get height(){return this.source.getSize(Pm).y}get depth(){return this.source.getSize(Pm).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){$e(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){$e(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $o:e.x=e.x-Math.floor(e.x);break;case kr:e.x=e.x<0?0:1;break;case uf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $o:e.y=e.y-Math.floor(e.y);break;case kr:e.y=e.y<0?0:1;break;case uf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Dn.DEFAULT_IMAGE=null;Dn.DEFAULT_MAPPING=xg;Dn.DEFAULT_ANISOTROPY=1;var At=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,y=(d+1)/2,S=(m+1)/2,T=(u+h)/4,E=(f+v)/4,A=(p+g)/4;return _>y&&_>S?_<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(_),r=T/n,s=E/n):y>S?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=T/r,s=A/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=E/s,r=A/s),this.set(n,r,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(f-v)/x,this.z=(h-u)/x,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pf=class extends Ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Dn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new nl(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vt=class extends pf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},zc=class extends Dn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var mf=class extends Dn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Je=class i{constructor(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,g)}set(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Bo.setFromMatrixColumn(e,0).length(),s=1/Bo.setFromMatrixColumn(e,1).length(),a=1/Bo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h+v*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h-v*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=p*c-d,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=p*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+p,t[10]=h-v*f}else if(e.order==="XZY"){let h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=a*u,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uT,e,hT)}lookAt(e,t,n){let r=this.elements;return Ki.subVectors(e,t),Ki.lengthSq()===0&&(Ki.z=1),Ki.normalize(),Hs.crossVectors(n,Ki),Hs.lengthSq()===0&&(Math.abs(n.z)===1?Ki.x+=1e-4:Ki.z+=1e-4,Ki.normalize(),Hs.crossVectors(n,Ki)),Hs.normalize(),wh.crossVectors(Ki,Hs),r[0]=Hs.x,r[4]=wh.x,r[8]=Ki.x,r[1]=Hs.y,r[5]=wh.y,r[9]=Ki.y,r[2]=Hs.z,r[6]=wh.z,r[10]=Ki.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],_=n[7],y=n[11],S=n[15],T=r[0],E=r[4],A=r[8],M=r[12],C=r[1],R=r[5],w=r[9],P=r[13],U=r[2],N=r[6],H=r[10],k=r[14],te=r[3],K=r[7],L=r[11],oe=r[15];return s[0]=a*T+o*C+l*U+c*te,s[4]=a*E+o*R+l*N+c*K,s[8]=a*A+o*w+l*H+c*L,s[12]=a*M+o*P+l*k+c*oe,s[1]=u*T+f*C+h*U+d*te,s[5]=u*E+f*R+h*N+d*K,s[9]=u*A+f*w+h*H+d*L,s[13]=u*M+f*P+h*k+d*oe,s[2]=p*T+v*C+g*U+m*te,s[6]=p*E+v*R+g*N+m*K,s[10]=p*A+v*w+g*H+m*L,s[14]=p*M+v*P+g*k+m*oe,s[3]=x*T+_*C+y*U+S*te,s[7]=x*E+_*R+y*N+S*K,s[11]=x*A+_*w+y*H+S*L,s[15]=x*M+_*P+y*k+S*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],p=e[3],v=e[7],g=e[11],m=e[15],x=l*d-c*h,_=o*d-c*f,y=o*h-l*f,S=a*d-c*u,T=a*h-l*u,E=a*f-o*u;return t*(v*x-g*_+m*y)-n*(p*x-g*S+m*T)+r*(p*_-v*S+m*E)-s*(p*y-v*T+g*E)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],p=e[12],v=e[13],g=e[14],m=e[15],x=t*o-n*a,_=t*l-r*a,y=t*c-s*a,S=n*l-r*o,T=n*c-s*o,E=r*c-s*l,A=u*v-f*p,M=u*g-h*p,C=u*m-d*p,R=f*g-h*v,w=f*m-d*v,P=h*m-d*g,U=x*P-_*w+y*R+S*C-T*M+E*A;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/U;return e[0]=(o*P-l*w+c*R)*N,e[1]=(r*w-n*P-s*R)*N,e[2]=(v*E-g*T+m*S)*N,e[3]=(h*T-f*E-d*S)*N,e[4]=(l*C-a*P-c*M)*N,e[5]=(t*P-r*C+s*M)*N,e[6]=(g*y-p*E-m*_)*N,e[7]=(u*E-h*y+d*_)*N,e[8]=(a*w-o*C+c*A)*N,e[9]=(n*C-t*w-s*A)*N,e[10]=(p*T-v*y+m*x)*N,e[11]=(f*y-u*T-d*x)*N,e[12]=(o*M-a*R-l*A)*N,e[13]=(t*R-n*M+r*A)*N,e[14]=(v*_-p*S-g*x)*N,e[15]=(u*S-f*_+h*x)*N,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,p=s*f,v=a*u,g=a*f,m=o*f,x=l*c,_=l*u,y=l*f,S=n.x,T=n.y,E=n.z;return r[0]=(1-(v+m))*S,r[1]=(d+y)*S,r[2]=(p-_)*S,r[3]=0,r[4]=(d-y)*T,r[5]=(1-(h+m))*T,r[6]=(g+x)*T,r[7]=0,r[8]=(p+_)*E,r[9]=(g-x)*E,r[10]=(1-(h+v))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Bo.set(r[0],r[1],r[2]).length(),o=Bo.set(r[4],r[5],r[6]).length(),l=Bo.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ar.copy(this);let c=1/a,u=1/o,f=1/l;return Ar.elements[0]*=c,Ar.elements[1]*=c,Ar.elements[2]*=c,Ar.elements[4]*=u,Ar.elements[5]*=u,Ar.elements[6]*=u,Ar.elements[8]*=f,Ar.elements[9]*=f,Ar.elements[10]*=f,t.setFromRotationMatrix(Ar),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=Er,l=!1){let c=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r),p,v;if(l)p=s/(a-s),v=a*s/(a-s);else if(o===Er)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Lc)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Er,l=!1){let c=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r),p,v;if(l)p=1/(a-s),v=a/(a-s);else if(o===Er)p=-2/(a-s),v=-(a+s)/(a-s);else if(o===Lc)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Bo=new I,Ar=new Je,uT=new I(0,0,0),hT=new I(1,1,1),Hs=new I,wh=new I,Ki=new I,i_=new Je,r_=new qn,wr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:$e("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return i_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(i_,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return r_.setFromEuler(this),this.setFromQuaternion(r_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wr.DEFAULT_ORDER="XYZ";var kc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fT=0,s_=new I,Uo=new qn,cs=new Je,bh=new I,Sc=new I,dT=new I,pT=new qn,a_=new I(1,0,0),o_=new I(0,1,0),l_=new I(0,0,1),c_={type:"added"},mT={type:"removed"},Lo={type:"childadded",child:null},Im={type:"childremoved",child:null},ui=class i extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fT++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new wr,n=new qn,r=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Je},normalMatrix:{value:new et}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Uo.setFromAxisAngle(e,t),this.quaternion.multiply(Uo),this}rotateOnWorldAxis(e,t){return Uo.setFromAxisAngle(e,t),this.quaternion.premultiply(Uo),this}rotateX(e){return this.rotateOnAxis(a_,e)}rotateY(e){return this.rotateOnAxis(o_,e)}rotateZ(e){return this.rotateOnAxis(l_,e)}translateOnAxis(e,t){return s_.copy(e).applyQuaternion(this.quaternion),this.position.add(s_.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(a_,e)}translateY(e){return this.translateOnAxis(o_,e)}translateZ(e){return this.translateOnAxis(l_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cs.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bh.copy(e):bh.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Sc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cs.lookAt(Sc,bh,this.up):cs.lookAt(bh,Sc,this.up),this.quaternion.setFromRotationMatrix(cs),r&&(cs.extractRotation(r.matrixWorld),Uo.setFromRotationMatrix(cs),this.quaternion.premultiply(Uo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(c_),Lo.child=e,this.dispatchEvent(Lo),Lo.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mT),Im.child=e,this.dispatchEvent(Im),Im.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cs.multiply(e.parent.matrixWorld)),e.applyMatrix4(cs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(c_),Lo.child=e,this.dispatchEvent(Lo),Lo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sc,e,dT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sc,pT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};ui.DEFAULT_UP=new I(0,1,0);ui.DEFAULT_MATRIX_AUTO_UPDATE=!0;ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Hr=class extends ui{constructor(){super(),this.isGroup=!0,this.type="Group"}},gT={type:"move"},il=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gT)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Hr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ry={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gs={h:0,s:0,l:0},Ch={h:0,s:0,l:0};function Bm(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=it){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=St.workingColorSpace){return this.r=e,this.g=t,this.b=n,St.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=St.workingColorSpace){if(e=Tg(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Bm(a,s,e+1/3),this.g=Bm(a,s,e),this.b=Bm(a,s,e-1/3)}return St.colorSpaceToWorking(this,r),this}setStyle(e,t=it){function n(s){s!==void 0&&parseFloat(s)<1&&$e("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:$e("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);$e("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=it){let n=ry[e.toLowerCase()];return n!==void 0?this.setHex(n,t):$e("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ms(e.r),this.g=ms(e.g),this.b=ms(e.b),this}copyLinearToSRGB(e){return this.r=Jo(e.r),this.g=Jo(e.g),this.b=Jo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=it){return St.workingToColorSpace(li.copy(this),e),Math.round(st(li.r*255,0,255))*65536+Math.round(st(li.g*255,0,255))*256+Math.round(st(li.b*255,0,255))}getHexString(e=it){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.workingToColorSpace(li.copy(this),t);let n=li.r,r=li.g,s=li.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=St.workingColorSpace){return St.workingToColorSpace(li.copy(this),t),e.r=li.r,e.g=li.g,e.b=li.b,e}getStyle(e=it){St.workingToColorSpace(li.copy(this),e);let t=li.r,n=li.g,r=li.b;return e!==it?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Gs),this.setHSL(Gs.h+e,Gs.s+t,Gs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gs),e.getHSL(Ch);let n=Ic(Gs.h,Ch.h,t),r=Ic(Gs.s,Ch.s,t),s=Ic(Gs.l,Ch.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},li=new qe;qe.NAMES=ry;var br=class extends ui{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wr,this.environmentIntensity=1,this.environmentRotation=new wr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Sr=new I,us=new I,Um=new I,hs=new I,Fo=new I,No=new I,u_=new I,Lm=new I,Fm=new I,Nm=new I,Om=new At,zm=new At,km=new At,Yn=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Sr.subVectors(e,t),r.cross(Sr);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Sr.subVectors(r,t),us.subVectors(n,t),Um.subVectors(e,t);let a=Sr.dot(Sr),o=Sr.dot(us),l=Sr.dot(Um),c=us.dot(us),u=us.dot(Um),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;let h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-d-p,p,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,hs)===null?!1:hs.x>=0&&hs.y>=0&&hs.x+hs.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,hs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,hs.x),l.addScaledVector(a,hs.y),l.addScaledVector(o,hs.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Om.setScalar(0),zm.setScalar(0),km.setScalar(0),Om.fromBufferAttribute(e,t),zm.fromBufferAttribute(e,n),km.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Om,s.x),a.addScaledVector(zm,s.y),a.addScaledVector(km,s.z),a}static isFrontFacing(e,t,n,r){return Sr.subVectors(n,t),us.subVectors(e,t),Sr.cross(us).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sr.subVectors(this.c,this.b),us.subVectors(this.a,this.b),Sr.cross(us).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Fo.subVectors(r,n),No.subVectors(s,n),Lm.subVectors(e,n);let l=Fo.dot(Lm),c=No.dot(Lm);if(l<=0&&c<=0)return t.copy(n);Fm.subVectors(e,r);let u=Fo.dot(Fm),f=No.dot(Fm);if(u>=0&&f<=u)return t.copy(r);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Fo,a);Nm.subVectors(e,s);let d=Fo.dot(Nm),p=No.dot(Nm);if(p>=0&&d<=p)return t.copy(s);let v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(No,o);let g=u*p-d*f;if(g<=0&&f-u>=0&&d-p>=0)return u_.subVectors(s,r),o=(f-u)/(f-u+(d-p)),t.copy(r).addScaledVector(u_,o);let m=1/(g+v+h);return a=v*m,o=h*m,t.copy(n).addScaledVector(Fo,a).addScaledVector(No,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kt=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mr):Mr.fromBufferAttribute(s,a),Mr.applyMatrix4(e.matrixWorld),this.expandByPoint(Mr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rh.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rh.copy(n.boundingBox)),Rh.applyMatrix4(e.matrixWorld),this.union(Rh)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mr),Mr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mc),Dh.subVectors(this.max,Mc),Oo.subVectors(e.a,Mc),zo.subVectors(e.b,Mc),ko.subVectors(e.c,Mc),Vs.subVectors(zo,Oo),Ws.subVectors(ko,zo),Na.subVectors(Oo,ko);let t=[0,-Vs.z,Vs.y,0,-Ws.z,Ws.y,0,-Na.z,Na.y,Vs.z,0,-Vs.x,Ws.z,0,-Ws.x,Na.z,0,-Na.x,-Vs.y,Vs.x,0,-Ws.y,Ws.x,0,-Na.y,Na.x,0];return!Hm(t,Oo,zo,ko,Dh)||(t=[1,0,0,0,1,0,0,0,1],!Hm(t,Oo,zo,ko,Dh))?!1:(Ph.crossVectors(Vs,Ws),t=[Ph.x,Ph.y,Ph.z],Hm(t,Oo,zo,ko,Dh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fs=[new I,new I,new I,new I,new I,new I,new I,new I],Mr=new I,Rh=new Kt,Oo=new I,zo=new I,ko=new I,Vs=new I,Ws=new I,Na=new I,Mc=new I,Dh=new I,Ph=new I,Oa=new I;function Hm(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Oa.fromArray(i,s);let o=r.x*Math.abs(Oa.x)+r.y*Math.abs(Oa.y)+r.z*Math.abs(Oa.z),l=e.dot(Oa),c=t.dot(Oa),u=n.dot(Oa);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var yn=new I,Ih=new Ce,vT=0,ut=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vT++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ff,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ih.fromBufferAttribute(this,t),Ih.applyMatrix3(e),this.setXY(t,Ih.x,Ih.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix3(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix4(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyNormalMatrix(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.transformDirection(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ff&&(e.usage=this.usage),e}};var Hc=class extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Gc=class extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var on=class extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}},xT=new Kt,Tc=new I,Gm=new I,Cr=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):xT.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tc.subVectors(e,this.center);let t=Tc.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Tc,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gm.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tc.copy(e.center).add(Gm)),this.expandByPoint(Tc.copy(e.center).sub(Gm))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},_T=0,ur=new Je,Vm=new ui,Ho=new I,Ji=new Kt,Ec=new Kt,On=new I,Lt=class i extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_T++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(VM(e)?Gc:Hc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new et().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ur.makeRotationFromQuaternion(e),this.applyMatrix4(ur),this}rotateX(e){return ur.makeRotationX(e),this.applyMatrix4(ur),this}rotateY(e){return ur.makeRotationY(e),this.applyMatrix4(ur),this}rotateZ(e){return ur.makeRotationZ(e),this.applyMatrix4(ur),this}translate(e,t,n){return ur.makeTranslation(e,t,n),this.applyMatrix4(ur),this}scale(e,t,n){return ur.makeScale(e,t,n),this.applyMatrix4(ur),this}lookAt(e){return Vm.lookAt(e),Vm.updateMatrix(),this.applyMatrix4(Vm.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ho).negate(),this.translate(Ho.x,Ho.y,Ho.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new on(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&$e("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Ji.setFromBufferAttribute(s),this.morphTargetsRelative?(On.addVectors(this.boundingBox.min,Ji.min),this.boundingBox.expandByPoint(On),On.addVectors(this.boundingBox.max,Ji.max),this.boundingBox.expandByPoint(On)):(this.boundingBox.expandByPoint(Ji.min),this.boundingBox.expandByPoint(Ji.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(Ji.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Ec.setFromBufferAttribute(o),this.morphTargetsRelative?(On.addVectors(Ji.min,Ec.min),Ji.expandByPoint(On),On.addVectors(Ji.max,Ec.max),Ji.expandByPoint(On)):(Ji.expandByPoint(Ec.min),Ji.expandByPoint(Ec.max))}Ji.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)On.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(On));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)On.fromBufferAttribute(o,c),l&&(Ho.fromBufferAttribute(e,c),On.add(Ho)),r=Math.max(r,n.distanceToSquared(On))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<n.count;A++)o[A]=new I,l[A]=new I;let c=new I,u=new I,f=new I,h=new Ce,d=new Ce,p=new Ce,v=new I,g=new I;function m(A,M,C){c.fromBufferAttribute(n,A),u.fromBufferAttribute(n,M),f.fromBufferAttribute(n,C),h.fromBufferAttribute(s,A),d.fromBufferAttribute(s,M),p.fromBufferAttribute(s,C),u.sub(c),f.sub(c),d.sub(h),p.sub(h);let R=1/(d.x*p.y-p.x*d.y);isFinite(R)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(R),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(R),o[A].add(v),o[M].add(v),o[C].add(v),l[A].add(g),l[M].add(g),l[C].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let A=0,M=x.length;A<M;++A){let C=x[A],R=C.start,w=C.count;for(let P=R,U=R+w;P<U;P+=3)m(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let _=new I,y=new I,S=new I,T=new I;function E(A){S.fromBufferAttribute(r,A),T.copy(S);let M=o[A];_.copy(M),_.sub(S.multiplyScalar(S.dot(M))).normalize(),y.crossVectors(T,M);let R=y.dot(l[A])<0?-1:1;a.setXYZW(A,_.x,_.y,_.z,R)}for(let A=0,M=x.length;A<M;++A){let C=x[A],R=C.start,w=C.count;for(let P=R,U=R+w;P<U;P+=3)E(e.getX(P+0)),E(e.getX(P+1)),E(e.getX(P+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I,f=new I;if(e)for(let h=0,d=e.count;h<d;h+=3){let p=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)On.fromBufferAttribute(e,t),On.normalize(),e.setXYZ(t,On.x,On.y,On.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u),d=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let m=0;m<u;m++)h[p++]=c[d++]}return new ut(h,u,f)}if(this.index===null)return $e("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){let h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},gf=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ff,this.updateRanges=[],this.version=0,this.uuid=ps()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ps()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ps()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Mi=new I,Vc=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mi.fromBufferAttribute(this,t),Mi.applyMatrix4(e),this.setXYZ(t,Mi.x,Mi.y,Mi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mi.fromBufferAttribute(this,t),Mi.applyNormalMatrix(e),this.setXYZ(t,Mi.x,Mi.y,Mi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mi.fromBufferAttribute(this,t),Mi.transformDirection(e),this.setXYZ(t,Mi.x,Mi.y,Mi.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Tr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Tr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Tr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Tr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Tr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Nc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Nc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yT=0,Oi=class extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yT++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=Ga,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tf,this.blendDst=nf,this.blendEquation=qs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Va,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ha,this.stencilZFail=Ha,this.stencilZPass=Ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){$e(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){$e(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ga&&(n.blending=this.blending),this.side!==ci&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tf&&(n.blendSrc=this.blendSrc),this.blendDst!==nf&&(n.blendDst=this.blendDst),this.blendEquation!==qs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Va&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rg&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ha&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ha&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ha&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},rl=class extends Oi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Go,wc=new I,Vo=new I,Wo=new I,Xo=new Ce,bc=new Ce,sy=new Je,Bh=new I,Cc=new I,Uh=new I,h_=new Ce,Wm=new Ce,f_=new Ce,Wc=class extends ui{constructor(e=new rl){if(super(),this.isSprite=!0,this.type="Sprite",Go===void 0){Go=new Lt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new gf(t,5);Go.setIndex([0,1,2,0,2,3]),Go.setAttribute("position",new Vc(n,3,0,!1)),Go.setAttribute("uv",new Vc(n,2,3,!1))}this.geometry=Go,this.material=e,this.center=new Ce(.5,.5),this.count=1}raycast(e,t){e.camera===null&&je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vo.setFromMatrixScale(this.matrixWorld),sy.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wo.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vo.multiplyScalar(-Wo.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Lh(Bh.set(-.5,-.5,0),Wo,a,Vo,r,s),Lh(Cc.set(.5,-.5,0),Wo,a,Vo,r,s),Lh(Uh.set(.5,.5,0),Wo,a,Vo,r,s),h_.set(0,0),Wm.set(1,0),f_.set(1,1);let o=e.ray.intersectTriangle(Bh,Cc,Uh,!1,wc);if(o===null&&(Lh(Cc.set(-.5,.5,0),Wo,a,Vo,r,s),Wm.set(0,1),o=e.ray.intersectTriangle(Bh,Uh,Cc,!1,wc),o===null))return;let l=e.ray.origin.distanceTo(wc);l<e.near||l>e.far||t.push({distance:l,point:wc.clone(),uv:Yn.getInterpolation(wc,Bh,Cc,Uh,h_,Wm,f_,new Ce),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Lh(i,e,t,n,r,s){Xo.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(bc.x=s*Xo.x-r*Xo.y,bc.y=r*Xo.x+s*Xo.y):bc.copy(Xo),i.copy(e),i.x+=bc.x,i.y+=bc.y,i.applyMatrix4(sy)}var ds=new I,Xm=new I,Fh=new I,Xs=new I,Ym=new I,Nh=new I,qm=new I,Wa=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ds)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ds.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ds.copy(this.origin).addScaledVector(this.direction,t),ds.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Xm.copy(e).add(t).multiplyScalar(.5),Fh.copy(t).sub(e).normalize(),Xs.copy(this.origin).sub(Xm);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Fh),o=Xs.dot(this.direction),l=-Xs.dot(Fh),c=Xs.lengthSq(),u=Math.abs(1-a*a),f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=s*u,f>=0)if(h>=-p)if(h<=p){let v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Xm).addScaledVector(Fh,h),d}intersectSphere(e,t){ds.subVectors(e.center,this.origin);let n=ds.dot(this.direction),r=ds.dot(ds)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ds)!==null}intersectTriangle(e,t,n,r,s){Ym.subVectors(t,e),Nh.subVectors(n,e),qm.crossVectors(Ym,Nh);let a=this.direction.dot(qm),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xs.subVectors(this.origin,e);let l=o*this.direction.dot(Nh.crossVectors(Xs,Nh));if(l<0)return null;let c=o*this.direction.dot(Ym.cross(Xs));if(c<0||l+c>a)return null;let u=-o*Xs.dot(qm);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xa=class extends Oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wr,this.combine=ug,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},d_=new Je,za=new Wa,Oh=new Cr,p_=new I,zh=new I,kh=new I,Hh=new I,Qm=new I,Gh=new I,m_=new I,Vh=new I,Rt=class extends ui{constructor(e=new Lt,t=new Xa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Gh.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],f=s[l];u!==0&&(Qm.fromBufferAttribute(f,e),a?Gh.addScaledVector(Qm,u):Gh.addScaledVector(Qm.sub(t),u))}t.add(Gh)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oh.copy(n.boundingSphere),Oh.applyMatrix4(s),za.copy(e.ray).recast(e.near),!(Oh.containsPoint(za.origin)===!1&&(za.intersectSphere(Oh,p_)===null||za.origin.distanceToSquared(p_)>(e.far-e.near)**2))&&(d_.copy(s).invert(),za.copy(e.ray).applyMatrix4(d_),!(n.boundingBox!==null&&za.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,za)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){let g=h[p],m=a[g.materialIndex],x=Math.max(g.start,d.start),_=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let y=x,S=_;y<S;y+=3){let T=o.getX(y),E=o.getX(y+1),A=o.getX(y+2);r=Wh(this,m,e,n,c,u,f,T,E,A),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){let x=o.getX(g),_=o.getX(g+1),y=o.getX(g+2);r=Wh(this,a,e,n,c,u,f,x,_,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){let g=h[p],m=a[g.materialIndex],x=Math.max(g.start,d.start),_=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let y=x,S=_;y<S;y+=3){let T=y,E=y+1,A=y+2;r=Wh(this,m,e,n,c,u,f,T,E,A),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){let x=g,_=g+1,y=g+2;r=Wh(this,a,e,n,c,u,f,x,_,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function AT(i,e,t,n,r,s,a,o){let l;if(e.side===tn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===ci,o),l===null)return null;Vh.copy(o),Vh.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Vh);return c<t.near||c>t.far?null:{distance:c,point:Vh.clone(),object:i}}function Wh(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,zh),i.getVertexPosition(l,kh),i.getVertexPosition(c,Hh);let u=AT(i,e,t,n,zh,kh,Hh,m_);if(u){let f=new I;Yn.getBarycoord(m_,zh,kh,Hh,f),r&&(u.uv=Yn.getInterpolatedAttribute(r,o,l,c,f,new Ce)),s&&(u.uv1=Yn.getInterpolatedAttribute(s,o,l,c,f,new Ce)),a&&(u.normal=Yn.getInterpolatedAttribute(a,o,l,c,f,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new I,materialIndex:0};Yn.getNormal(zh,kh,Hh,h.normal),u.face=h,u.barycoord=f}return u}var fr=class extends Dn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ct,u=Ct,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xc=class extends ut{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Yo=new Je,g_=new Je,Xh=[],v_=new Kt,ST=new Je,Rc=new Rt,Dc=new Cr,Ya=class extends Rt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xc(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,ST)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),v_.copy(e.boundingBox).applyMatrix4(Yo),this.boundingBox.union(v_)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Cr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),Dc.copy(e.boundingSphere).applyMatrix4(Yo),this.boundingSphere.union(Dc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Rc.geometry=this.geometry,Rc.material=this.material,Rc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Dc.copy(this.boundingSphere),Dc.applyMatrix4(n),e.ray.intersectsSphere(Dc)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Yo),g_.multiplyMatrices(n,Yo),Rc.matrixWorld=g_,Rc.raycast(e,Xh);for(let a=0,o=Xh.length;a<o;a++){let l=Xh[a];l.instanceId=s,l.object=this,t.push(l)}Xh.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new fr(new Float32Array(r*this.count),r,this.count,ta,nn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Zm=new I,MT=new I,TT=new et,Fi=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Zm.subVectors(n,t).cross(MT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Zm),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||TT.getNormalMatrix(e),r=this.coplanarPoint(Zm).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ka=new Cr,ET=new Ce(.5,.5),Yh=new I,Yc=class{constructor(e=new Fi,t=new Fi,n=new Fi,r=new Fi,s=new Fi,a=new Fi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Er,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],p=s[8],v=s[9],g=s[10],m=s[11],x=s[12],_=s[13],y=s[14],S=s[15];if(r[0].setComponents(c-a,d-u,m-p,S-x).normalize(),r[1].setComponents(c+a,d+u,m+p,S+x).normalize(),r[2].setComponents(c+o,d+f,m+v,S+_).normalize(),r[3].setComponents(c-o,d-f,m-v,S-_).normalize(),n)r[4].setComponents(l,h,g,y).normalize(),r[5].setComponents(c-l,d-h,m-g,S-y).normalize();else if(r[4].setComponents(c-l,d-h,m-g,S-y).normalize(),t===Er)r[5].setComponents(c+l,d+h,m+g,S+y).normalize();else if(t===Lc)r[5].setComponents(l,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ka.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ka.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ka)}intersectsSprite(e){ka.center.set(0,0,0);let t=ET.distanceTo(e.center);return ka.radius=.7071067811865476+t,ka.applyMatrix4(e.matrixWorld),this.intersectsSphere(ka)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Yh.x=r.normal.x>0?e.max.x:e.min.x,Yh.y=r.normal.y>0?e.max.y:e.min.y,Yh.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Yh)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var vf=class extends Oi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},x_=new Je,sg=new Wa,qh=new Cr,Qh=new I,qc=class extends ui{constructor(e=new Lt,t=new vf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qh.copy(n.boundingSphere),qh.applyMatrix4(r),qh.radius+=s,e.ray.intersectsSphere(qh)===!1)return;x_.copy(r).invert(),sg.copy(e.ray).applyMatrix4(x_);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=h,v=d;p<v;p++){let g=c.getX(p);Qh.fromBufferAttribute(f,g),__(Qh,g,l,r,e,t,this)}}else{let h=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=h,v=d;p<v;p++)Qh.fromBufferAttribute(f,p),__(Qh,p,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function __(i,e,t,n,r,s,a){let o=sg.distanceSqToPoint(i);if(o<t){let l=new I;sg.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Qc=class extends Dn{constructor(e=[],t=js,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},sl=class extends Dn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},zi=class extends Dn{constructor(e,t,n=Sn,r,s,a,o=Ct,l=Ct,c,u=hr,f=1){if(u!==hr&&u!==dr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new nl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},xf=class extends zi{constructor(e,t=Sn,n=js,r,s,a=Ct,o=Ct,l,c=hr){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Zc=class extends Dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},al=class i extends Lt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],f=[],h=0,d=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,r,a,2),p("x","z","y",1,-1,e,n,-t,r,a,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new on(c,3)),this.setAttribute("normal",new on(u,3)),this.setAttribute("uv",new on(f,2));function p(v,g,m,x,_,y,S,T,E,A,M){let C=y/E,R=S/A,w=y/2,P=S/2,U=T/2,N=E+1,H=A+1,k=0,te=0,K=new I;for(let L=0;L<H;L++){let oe=L*R-P;for(let ce=0;ce<N;ce++){let Ie=ce*C-w;K[v]=Ie*x,K[g]=oe*_,K[m]=U,c.push(K.x,K.y,K.z),K[v]=0,K[g]=0,K[m]=T>0?1:-1,u.push(K.x,K.y,K.z),f.push(ce/E),f.push(1-L/A),k+=1}}for(let L=0;L<A;L++)for(let oe=0;oe<E;oe++){let ce=h+oe+N*L,Ie=h+oe+N*(L+1),pe=h+(oe+1)+N*(L+1),be=h+(oe+1)+N*L;l.push(ce,Ie,be),l.push(Ie,pe,be),te+=6}o.addGroup(d,te,M),d+=te,h+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Kc=class i extends Lt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new I,u=new Ce;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){let d=n+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new on(a,3)),this.setAttribute("normal",new on(o,3)),this.setAttribute("uv",new on(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Jc=class i extends Lt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],f=[],h=[],d=[],p=0,v=[],g=n/2,m=0;x(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new on(f,3)),this.setAttribute("normal",new on(h,3)),this.setAttribute("uv",new on(d,2));function x(){let y=new I,S=new I,T=0,E=(t-e)/n;for(let A=0;A<=s;A++){let M=[],C=A/s,R=C*(t-e)+e;for(let w=0;w<=r;w++){let P=w/r,U=P*l+o,N=Math.sin(U),H=Math.cos(U);S.x=R*N,S.y=-C*n+g,S.z=R*H,f.push(S.x,S.y,S.z),y.set(N,E,H).normalize(),h.push(y.x,y.y,y.z),d.push(P,1-C),M.push(p++)}v.push(M)}for(let A=0;A<r;A++)for(let M=0;M<s;M++){let C=v[M][A],R=v[M+1][A],w=v[M+1][A+1],P=v[M][A+1];(e>0||M!==0)&&(u.push(C,R,P),T+=3),(t>0||M!==s-1)&&(u.push(R,w,P),T+=3)}c.addGroup(m,T,0),m+=T}function _(y){let S=p,T=new Ce,E=new I,A=0,M=y===!0?e:t,C=y===!0?1:-1;for(let w=1;w<=r;w++)f.push(0,g*C,0),h.push(0,C,0),d.push(.5,.5),p++;let R=p;for(let w=0;w<=r;w++){let U=w/r*l+o,N=Math.cos(U),H=Math.sin(U);E.x=M*H,E.y=g*C,E.z=M*N,f.push(E.x,E.y,E.z),h.push(0,C,0),T.x=N*.5+.5,T.y=H*.5*C+.5,d.push(T.x,T.y),p++}for(let w=0;w<r;w++){let P=S+w,U=R+w;y===!0?u.push(U,U+1,P):u.push(U+1,U,P),A+=3}c.addGroup(m,A,y===!0?1:2),m+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var _f=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$e("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let u=n[r],h=n[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Ce:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new I,r=[],s=[],a=[],o=new I,l=new Je;for(let d=0;d<=e;d++){let p=d/e;r[d]=this.getTangentAt(p,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(st(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(st(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],d*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function Eg(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var Zh=new I,Km=new Eg,Jm=new Eg,jm=new Eg,jc=class extends _f{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new I){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Zh.subVectors(r[0],r[1]).add(r[0]),c=Zh);let f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Zh.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Zh),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Km.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,p,v,g),Jm.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,p,v,g),jm.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(Km.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Jm.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),jm.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return n.set(Km.calc(l),Jm.calc(l),jm.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};var gs=class i extends Lt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],p=[],v=[],g=[];for(let m=0;m<u;m++){let x=m*h-a;for(let _=0;_<c;_++){let y=_*f-s;p.push(y,-x,0),v.push(0,0,1),g.push(_/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){let _=x+c*m,y=x+c*(m+1),S=x+1+c*(m+1),T=x+1+c*m;d.push(_,y,T),d.push(y,S,T)}this.setIndex(d),this.setAttribute("position",new on(p,3)),this.setAttribute("normal",new on(v,3)),this.setAttribute("uv",new on(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var qa=class i extends Lt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],f=new I,h=new I,d=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){let x=[],_=m/n,y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let S=0;S<=t;S++){let T=S/t;f.x=-e*Math.cos(r+T*s)*Math.sin(a+_*o),f.y=e*Math.cos(a+_*o),f.z=e*Math.sin(r+T*s)*Math.sin(a+_*o),p.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),g.push(T+y,1-_),x.push(c++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){let _=u[m][x+1],y=u[m][x],S=u[m+1][x],T=u[m+1][x+1];(m!==0||a>0)&&d.push(_,y,T),(m!==n-1||l<Math.PI)&&d.push(y,S,T)}this.setIndex(d),this.setAttribute("position",new on(p,3)),this.setAttribute("normal",new on(v,3)),this.setAttribute("uv",new on(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Za(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?($e("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function fi(i){let e={};for(let t=0;t<i.length;t++){let n=Za(i[t]);for(let r in n)e[r]=n[r]}return e}function wT(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function wg(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:St.workingColorSpace}var ay={clone:Za,merge:fi},bT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,CT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rt=class extends Oi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bT,this.fragmentShader=CT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Za(e.uniforms),this.uniformsGroups=wT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},yf=class extends rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},$c=class extends Oi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mg,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Af=class extends Oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wi,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Sf=class extends Oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Kh(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Qs=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Mf=class extends Qs{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tg,endingEnd:tg}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case ng:s=e,o=2*t-n;break;case ig:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ng:a=e,l=2*n-t;break;case ig:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,p=(n-t)/(r-t),v=p*p,g=v*p,m=-h*g+2*h*v-h*p,x=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*p+1,_=(-1-d)*g+(1.5+d)*v+.5*p,y=d*g-d*v;for(let S=0;S!==o;++S)s[S]=m*a[u+S]+x*a[c+S]+_*a[l+S]+y*a[f+S];return s}},Tf=class extends Qs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*f+a[l+h]*u;return s}},Ef=class extends Qs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},wf=class extends Qs{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,f=u.inTangents,h=u.outTangents;if(!f||!h){let v=(n-t)/(r-t),g=1-v;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*v;return s}let d=o*2,p=e-1;for(let v=0;v!==o;++v){let g=a[c+v],m=a[l+v],x=p*d+v*2,_=h[x],y=h[x+1],S=e*d+v*2,T=f[S],E=f[S+1],A=(n-t)/(r-t),M,C,R,w,P;for(let U=0;U<8;U++){M=A*A,C=M*A,R=1-A,w=R*R,P=w*R;let H=P*t+3*w*A*_+3*R*M*T+C*r-n;if(Math.abs(H)<1e-10)break;let k=3*w*(_-t)+6*R*A*(T-_)+3*M*(r-T);if(Math.abs(k)<1e-10)break;A=A-H/k,A=Math.max(0,Math.min(1,A))}s[v]=P*g+3*w*A*y+3*R*M*E+C*m}return s}},ji=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Kh(t,this.TimeBufferType),this.values=Kh(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Kh(e.times,Array),values:Kh(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ef(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Tf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new wf(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Bc:t=this.InterpolantFactoryMethodDiscrete;break;case hf:t=this.InterpolantFactoryMethodLinear;break;case ef:t=this.InterpolantFactoryMethodSmooth;break;case eg:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return $e("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bc;case this.InterpolantFactoryMethodLinear:return hf;case this.InterpolantFactoryMethodSmooth:return ef;case this.InterpolantFactoryMethodBezier:return eg}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){je("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){je("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&WM(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){je("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ef,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let f=o*n,h=f-n,d=f+n;for(let p=0;p!==n;++p){let v=t[f+p];if(v!==t[h+p]||v!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,h=a*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ji.prototype.ValueTypeName="";ji.prototype.TimeBufferType=Float32Array;ji.prototype.ValueBufferType=Float32Array;ji.prototype.DefaultInterpolation=hf;var Zs=class extends ji{constructor(e,t,n){super(e,t,n)}};Zs.prototype.ValueTypeName="bool";Zs.prototype.ValueBufferType=Array;Zs.prototype.DefaultInterpolation=Bc;Zs.prototype.InterpolantFactoryMethodLinear=void 0;Zs.prototype.InterpolantFactoryMethodSmooth=void 0;var bf=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}};bf.prototype.ValueTypeName="color";var Cf=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}};Cf.prototype.ValueTypeName="number";var Rf=class extends Qs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)qn.slerpFlat(s,0,a,c-o,a,c,l);return s}},eu=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Rf(this.times,this.values,this.getValueSize(),e)}};eu.prototype.ValueTypeName="quaternion";eu.prototype.InterpolantFactoryMethodSmooth=void 0;var Ks=class extends ji{constructor(e,t,n){super(e,t,n)}};Ks.prototype.ValueTypeName="string";Ks.prototype.ValueBufferType=Array;Ks.prototype.DefaultInterpolation=Bc;Ks.prototype.InterpolantFactoryMethodLinear=void 0;Ks.prototype.InterpolantFactoryMethodSmooth=void 0;var Df=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}};Df.prototype.ValueTypeName="vector";var Pf=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},oy=new Pf,If=class{constructor(e){this.manager=e!==void 0?e:oy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};If.DEFAULT_MATERIAL_NAME="__DEFAULT";var Jh=new I,jh=new qn,zr=new I,tu=class extends ui{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=Er,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Jh,jh,zr),zr.x===1&&zr.y===1&&zr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jh,jh,zr.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Jh,jh,zr),zr.x===1&&zr.y===1&&zr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jh,jh,zr.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ys=new I,y_=new Ce,A_=new Ce,An=class extends tu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=tl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Pc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return tl*2*Math.atan(Math.tan(Pc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ys.x,Ys.y).multiplyScalar(-e/Ys.z),Ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ys.x,Ys.y).multiplyScalar(-e/Ys.z)}getViewSize(e,t){return this.getViewBounds(e,y_,A_),t.subVectors(A_,y_)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Pc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var vs=class extends tu{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var qo=-90,Qo=1,ol=class extends ui{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new An(qo,Qo,e,t);r.layers=this.layers,this.add(r);let s=new An(qo,Qo,e,t);s.layers=this.layers,this.add(s);let a=new An(qo,Qo,e,t);a.layers=this.layers,this.add(a);let o=new An(qo,Qo,e,t);o.layers=this.layers,this.add(o);let l=new An(qo,Qo,e,t);l.layers=this.layers,this.add(l);let c=new An(qo,Qo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Er)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Bf=class extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var bg="\\[\\]\\.:\\/",RT=new RegExp("["+bg+"]","g"),Cg="[^"+bg+"]",DT="[^"+bg.replace("\\.","")+"]",PT=/((?:WC+[\/:])*)/.source.replace("WC",Cg),IT=/(WCOD+)?/.source.replace("WCOD",DT),BT=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Cg),UT=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Cg),LT=new RegExp("^"+PT+IT+BT+UT+"$"),FT=["material","materials","bones","map"],ag=class{constructor(e,t,n){let r=n||$t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},$t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(RT,"")}static parseTrackName(e){let t=LT.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);FT.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){$e("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;je("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};$t.Composite=ag;$t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$t.prototype.GetterByBindingType=[$t.prototype._getValue_direct,$t.prototype._getValue_array,$t.prototype._getValue_arrayElement,$t.prototype._getValue_toArray];$t.prototype.SetterByBindingTypeAndVersioning=[[$t.prototype._setValue_direct,$t.prototype._setValue_direct_setNeedsUpdate,$t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_array,$t.prototype._setValue_array_setNeedsUpdate,$t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_arrayElement,$t.prototype._setValue_arrayElement_setNeedsUpdate,$t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_fromArray,$t.prototype._setValue_fromArray_setNeedsUpdate,$t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var dP=new Float32Array(1);var we=class i{constructor(e){this.value=e}clone(){return new i(this.value.clone===void 0?this.value:this.value.clone())}};var S_=new I,$h=new I,Zo=new I,Ko=new I,$m=new I,NT=new I,OT=new I,Ei=class{constructor(e=new I,t=new I){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){S_.subVectors(e,this.start),$h.subVectors(this.end,this.start);let n=$h.dot($h),s=$h.dot(S_)/n;return t&&(s=st(s,0,1)),s}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=NT,n=OT){let r=10000000000000001e-32,s,a,o=this.start,l=e.start,c=this.end,u=e.end;Zo.subVectors(c,o),Ko.subVectors(u,l),$m.subVectors(o,l);let f=Zo.dot(Zo),h=Ko.dot(Ko),d=Ko.dot($m);if(f<=r&&h<=r)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(f<=r)s=0,a=d/h,a=st(a,0,1);else{let p=Zo.dot($m);if(h<=r)a=0,s=st(-p/f,0,1);else{let v=Zo.dot(Ko),g=f*h-v*v;g!==0?s=st((v*d-p*h)/g,0,1):s=0,a=(v*s+d)/h,a<0?(a=0,s=st(-p/f,0,1)):a>1&&(a=1,s=st((v-p)/f,0,1))}}return t.copy(o).addScaledVector(Zo,s),n.copy(l).addScaledVector(Ko,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function Rg(i,e,t,n){let r=zT(n);switch(t){case Ag:return i*e;case ta:return i*e/r.components*r.byteLength;case ul:return i*e/r.components*r.byteLength;case xs:return i*e*2/r.components*r.byteLength;case na:return i*e*2/r.components*r.byteLength;case Sg:return i*e*3/r.components*r.byteLength;case Mn:return i*e*4/r.components*r.byteLength;case ia:return i*e*4/r.components*r.byteLength;case au:case ou:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lu:case cu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kf:case Gf:return Math.max(i,16)*Math.max(e,8)/4;case zf:case Hf:return Math.max(i,8)*Math.max(e,8)/2;case Vf:case Wf:case Yf:case qf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xf:case Qf:case Zf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Kf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Jf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case jf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case $f:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ed:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case td:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case nd:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case id:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case rd:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sd:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ad:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case od:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ld:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case cd:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ud:case hd:case fd:return Math.ceil(i/4)*Math.ceil(e/4)*16;case dd:case pd:return Math.ceil(i/4)*Math.ceil(e/4)*8;case md:case gd:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zT(i){switch(i){case xt:case cl:return{byteLength:1,components:1};case $s:case su:case hi:return{byteLength:2,components:1};case Nf:case Of:return{byteLength:2,components:4};case Sn:case ea:case nn:return{byteLength:4,components:1};case _g:case yg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qn}}));typeof window<"u"&&(window.__THREE__?$e("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qn);function Dy(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function HT(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){let p=f[h],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){let v=f[d];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var GT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,VT=`#ifdef USE_ALPHAHASH
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
#endif`,WT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,XT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,YT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,QT=`#ifdef USE_AOMAP
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
#endif`,ZT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,KT=`#ifdef USE_BATCHING
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
#endif`,JT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$T=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tE=`#ifdef USE_IRIDESCENCE
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
#endif`,nE=`#ifdef USE_BUMPMAP
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
#endif`,iE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,aE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,oE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,lE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,uE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hE=`#define PI 3.141592653589793
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
} // validated`,fE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dE=`vec3 transformedNormal = objectNormal;
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
#endif`,pE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xE="gl_FragColor = linearToOutputTexel( gl_FragColor );",_E=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yE=`#ifdef USE_ENVMAP
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
#endif`,AE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,SE=`#ifdef USE_ENVMAP
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
#endif`,ME=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,TE=`#ifdef USE_ENVMAP
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
#endif`,EE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,CE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RE=`#ifdef USE_GRADIENTMAP
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
}`,DE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,IE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,BE=`uniform bool receiveShadow;
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
#endif`,UE=`#ifdef USE_ENVMAP
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
#endif`,LE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,FE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,NE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,OE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zE=`PhysicalMaterial material;
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
#endif`,kE=`uniform sampler2D dfgLUT;
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
}`,HE=`
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
#endif`,GE=`#if defined( RE_IndirectDiffuse )
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
#endif`,VE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,WE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,XE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,QE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ZE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,KE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,JE=`#if defined( USE_POINTS_UV )
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
#endif`,jE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$E=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ew=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iw=`#ifdef USE_MORPHTARGETS
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
#endif`,rw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,aw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ow=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uw=`#ifdef USE_NORMALMAP
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
#endif`,hw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_w=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Aw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ew=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ww=`float getShadowMask() {
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
}`,bw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cw=`#ifdef USE_SKINNING
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
#endif`,Rw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dw=`#ifdef USE_SKINNING
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
#endif`,Pw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Iw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lw=`#ifdef USE_TRANSMISSION
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
#endif`,Fw=`#ifdef USE_TRANSMISSION
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
#endif`,Nw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ow=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Hw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gw=`uniform sampler2D t2D;
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
}`,Vw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ww=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qw=`#include <common>
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
}`,Qw=`#if DEPTH_PACKING == 3200
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
}`,Zw=`#define DISTANCE
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
}`,Kw=`#define DISTANCE
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
}`,Jw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$w=`uniform float scale;
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
}`,eb=`uniform vec3 diffuse;
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
}`,tb=`#include <common>
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
}`,nb=`uniform vec3 diffuse;
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
}`,ib=`#define LAMBERT
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
}`,rb=`#define LAMBERT
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
}`,sb=`#define MATCAP
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
}`,ab=`#define MATCAP
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
}`,ob=`#define NORMAL
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
}`,lb=`#define NORMAL
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
}`,cb=`#define PHONG
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
}`,ub=`#define PHONG
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
}`,hb=`#define STANDARD
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
}`,fb=`#define STANDARD
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
}`,db=`#define TOON
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
}`,pb=`#define TOON
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
}`,mb=`uniform float size;
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
}`,gb=`uniform vec3 diffuse;
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
}`,vb=`#include <common>
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
}`,xb=`uniform vec3 color;
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
}`,_b=`uniform float rotation;
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
}`,yb=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:GT,alphahash_pars_fragment:VT,alphamap_fragment:WT,alphamap_pars_fragment:XT,alphatest_fragment:YT,alphatest_pars_fragment:qT,aomap_fragment:QT,aomap_pars_fragment:ZT,batching_pars_vertex:KT,batching_vertex:JT,begin_vertex:jT,beginnormal_vertex:$T,bsdfs:eE,iridescence_fragment:tE,bumpmap_pars_fragment:nE,clipping_planes_fragment:iE,clipping_planes_pars_fragment:rE,clipping_planes_pars_vertex:sE,clipping_planes_vertex:aE,color_fragment:oE,color_pars_fragment:lE,color_pars_vertex:cE,color_vertex:uE,common:hE,cube_uv_reflection_fragment:fE,defaultnormal_vertex:dE,displacementmap_pars_vertex:pE,displacementmap_vertex:mE,emissivemap_fragment:gE,emissivemap_pars_fragment:vE,colorspace_fragment:xE,colorspace_pars_fragment:_E,envmap_fragment:yE,envmap_common_pars_fragment:AE,envmap_pars_fragment:SE,envmap_pars_vertex:ME,envmap_physical_pars_fragment:UE,envmap_vertex:TE,fog_vertex:EE,fog_pars_vertex:wE,fog_fragment:bE,fog_pars_fragment:CE,gradientmap_pars_fragment:RE,lightmap_pars_fragment:DE,lights_lambert_fragment:PE,lights_lambert_pars_fragment:IE,lights_pars_begin:BE,lights_toon_fragment:LE,lights_toon_pars_fragment:FE,lights_phong_fragment:NE,lights_phong_pars_fragment:OE,lights_physical_fragment:zE,lights_physical_pars_fragment:kE,lights_fragment_begin:HE,lights_fragment_maps:GE,lights_fragment_end:VE,logdepthbuf_fragment:WE,logdepthbuf_pars_fragment:XE,logdepthbuf_pars_vertex:YE,logdepthbuf_vertex:qE,map_fragment:QE,map_pars_fragment:ZE,map_particle_fragment:KE,map_particle_pars_fragment:JE,metalnessmap_fragment:jE,metalnessmap_pars_fragment:$E,morphinstance_vertex:ew,morphcolor_vertex:tw,morphnormal_vertex:nw,morphtarget_pars_vertex:iw,morphtarget_vertex:rw,normal_fragment_begin:sw,normal_fragment_maps:aw,normal_pars_fragment:ow,normal_pars_vertex:lw,normal_vertex:cw,normalmap_pars_fragment:uw,clearcoat_normal_fragment_begin:hw,clearcoat_normal_fragment_maps:fw,clearcoat_pars_fragment:dw,iridescence_pars_fragment:pw,opaque_fragment:mw,packing:gw,premultiplied_alpha_fragment:vw,project_vertex:xw,dithering_fragment:_w,dithering_pars_fragment:yw,roughnessmap_fragment:Aw,roughnessmap_pars_fragment:Sw,shadowmap_pars_fragment:Mw,shadowmap_pars_vertex:Tw,shadowmap_vertex:Ew,shadowmask_pars_fragment:ww,skinbase_vertex:bw,skinning_pars_vertex:Cw,skinning_vertex:Rw,skinnormal_vertex:Dw,specularmap_fragment:Pw,specularmap_pars_fragment:Iw,tonemapping_fragment:Bw,tonemapping_pars_fragment:Uw,transmission_fragment:Lw,transmission_pars_fragment:Fw,uv_pars_fragment:Nw,uv_pars_vertex:Ow,uv_vertex:zw,worldpos_vertex:kw,background_vert:Hw,background_frag:Gw,backgroundCube_vert:Vw,backgroundCube_frag:Ww,cube_vert:Xw,cube_frag:Yw,depth_vert:qw,depth_frag:Qw,distance_vert:Zw,distance_frag:Kw,equirect_vert:Jw,equirect_frag:jw,linedashed_vert:$w,linedashed_frag:eb,meshbasic_vert:tb,meshbasic_frag:nb,meshlambert_vert:ib,meshlambert_frag:rb,meshmatcap_vert:sb,meshmatcap_frag:ab,meshnormal_vert:ob,meshnormal_frag:lb,meshphong_vert:cb,meshphong_frag:ub,meshphysical_vert:hb,meshphysical_frag:fb,meshtoon_vert:db,meshtoon_frag:pb,points_vert:mb,points_frag:gb,shadow_vert:vb,shadow_frag:xb,sprite_vert:_b,sprite_frag:yb},Ne={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Yr={basic:{uniforms:fi([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:fi([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:fi([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:fi([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:fi([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new qe(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:fi([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:fi([Ne.points,Ne.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:fi([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:fi([Ne.common,Ne.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:fi([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:fi([Ne.sprite,Ne.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distance:{uniforms:fi([Ne.common,Ne.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distance_vert,fragmentShader:ht.distance_frag},shadow:{uniforms:fi([Ne.lights,Ne.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Yr.physical={uniforms:fi([Yr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var _d={r:0,b:0,g:0},Ka=new wr,Ab=new Je;function Sb(i,e,t,n,r,s){let a=new qe(0),o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(x){let _=x.isScene===!0?x.background:null;if(_&&_.isTexture){let y=x.backgroundBlurriness>0;_=e.get(_,y)}return _}function p(x){let _=!1,y=d(x);y===null?g(a,o):y&&y.isColor&&(g(y,1),_=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,_){let y=d(_);y&&(y.isCubeTexture||y.mapping===iu)?(c===void 0&&(c=new Rt(new al(1,1,1),new rt({name:"BackgroundCubeMaterial",uniforms:Za(Yr.backgroundCube.uniforms),vertexShader:Yr.backgroundCube.vertexShader,fragmentShader:Yr.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),Ka.copy(_.backgroundRotation),Ka.x*=-1,Ka.y*=-1,Ka.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ka.y*=-1,Ka.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ab.makeRotationFromEuler(Ka)),c.material.toneMapped=St.getTransfer(y.colorSpace)!==Ut,(u!==y||f!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Rt(new gs(2,2),new rt({name:"BackgroundMaterial",uniforms:Za(Yr.background.uniforms),vertexShader:Yr.background.vertexShader,fragmentShader:Yr.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=St.getTransfer(y.colorSpace)!==Ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,_){x.getRGB(_d,wg(i)),t.buffers.color.setClear(_d.r,_d.g,_d.b,_,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),o=_,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,g(a,o)},render:p,addToRenderList:v,dispose:m}}function Mb(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,a=!1;function o(R,w,P,U,N){let H=!1,k=f(R,U,P,w);s!==k&&(s=k,c(s.object)),H=d(R,U,P,N),H&&p(R,U,P,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(R,w,P,U),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function f(R,w,P,U){let N=U.wireframe===!0,H=n[w.id];H===void 0&&(H={},n[w.id]=H);let k=R.isInstancedMesh===!0?R.id:0,te=H[k];te===void 0&&(te={},H[k]=te);let K=te[P.id];K===void 0&&(K={},te[P.id]=K);let L=K[N];return L===void 0&&(L=h(l()),K[N]=L),L}function h(R){let w=[],P=[],U=[];for(let N=0;N<t;N++)w[N]=0,P[N]=0,U[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:P,attributeDivisors:U,object:R,attributes:{},index:null}}function d(R,w,P,U){let N=s.attributes,H=w.attributes,k=0,te=P.getAttributes();for(let K in te)if(te[K].location>=0){let oe=N[K],ce=H[K];if(ce===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(ce=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(ce=R.instanceColor)),oe===void 0||oe.attribute!==ce||ce&&oe.data!==ce.data)return!0;k++}return s.attributesNum!==k||s.index!==U}function p(R,w,P,U){let N={},H=w.attributes,k=0,te=P.getAttributes();for(let K in te)if(te[K].location>=0){let oe=H[K];oe===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(oe=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(oe=R.instanceColor));let ce={};ce.attribute=oe,oe&&oe.data&&(ce.data=oe.data),N[K]=ce,k++}s.attributes=N,s.attributesNum=k,s.index=U}function v(){let R=s.newAttributes;for(let w=0,P=R.length;w<P;w++)R[w]=0}function g(R){m(R,0)}function m(R,w){let P=s.newAttributes,U=s.enabledAttributes,N=s.attributeDivisors;P[R]=1,U[R]===0&&(i.enableVertexAttribArray(R),U[R]=1),N[R]!==w&&(i.vertexAttribDivisor(R,w),N[R]=w)}function x(){let R=s.newAttributes,w=s.enabledAttributes;for(let P=0,U=w.length;P<U;P++)w[P]!==R[P]&&(i.disableVertexAttribArray(P),w[P]=0)}function _(R,w,P,U,N,H,k){k===!0?i.vertexAttribIPointer(R,w,P,N,H):i.vertexAttribPointer(R,w,P,U,N,H)}function y(R,w,P,U){v();let N=U.attributes,H=P.getAttributes(),k=w.defaultAttributeValues;for(let te in H){let K=H[te];if(K.location>=0){let L=N[te];if(L===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(L=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(L=R.instanceColor)),L!==void 0){let oe=L.normalized,ce=L.itemSize,Ie=e.get(L);if(Ie===void 0)continue;let pe=Ie.buffer,be=Ie.type,Z=Ie.bytesPerElement,le=be===i.INT||be===i.UNSIGNED_INT||L.gpuType===ea;if(L.isInterleavedBufferAttribute){let G=L.data,ue=G.stride,Q=L.offset;if(G.isInstancedInterleavedBuffer){for(let de=0;de<K.locationSize;de++)m(K.location+de,G.meshPerAttribute);R.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let de=0;de<K.locationSize;de++)g(K.location+de);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let de=0;de<K.locationSize;de++)_(K.location+de,ce/K.locationSize,be,oe,ue*Z,(Q+ce/K.locationSize*de)*Z,le)}else{if(L.isInstancedBufferAttribute){for(let G=0;G<K.locationSize;G++)m(K.location+G,L.meshPerAttribute);R.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let G=0;G<K.locationSize;G++)g(K.location+G);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let G=0;G<K.locationSize;G++)_(K.location+G,ce/K.locationSize,be,oe,ce*Z,ce/K.locationSize*G*Z,le)}}else if(k!==void 0){let oe=k[te];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(K.location,oe);break;case 3:i.vertexAttrib3fv(K.location,oe);break;case 4:i.vertexAttrib4fv(K.location,oe);break;default:i.vertexAttrib1fv(K.location,oe)}}}}x()}function S(){M();for(let R in n){let w=n[R];for(let P in w){let U=w[P];for(let N in U){let H=U[N];for(let k in H)u(H[k].object),delete H[k];delete U[N]}}delete n[R]}}function T(R){if(n[R.id]===void 0)return;let w=n[R.id];for(let P in w){let U=w[P];for(let N in U){let H=U[N];for(let k in H)u(H[k].object),delete H[k];delete U[N]}}delete n[R.id]}function E(R){for(let w in n){let P=n[w];for(let U in P){let N=P[U];if(N[R.id]===void 0)continue;let H=N[R.id];for(let k in H)u(H[k].object),delete H[k];delete N[R.id]}}}function A(R){for(let w in n){let P=n[w],U=R.isInstancedMesh===!0?R.id:0,N=P[U];if(N!==void 0){for(let H in N){let k=N[H];for(let te in k)u(k[te].object),delete k[te];delete N[H]}delete P[U],Object.keys(P).length===0&&delete n[w]}}}function M(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:M,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfObject:A,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function Tb(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),t.update(u,n,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let p=0;p<f;p++)d+=u[p];t.update(d,n,1)}function l(c,u,f,h){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)a(c[p],u[p],h[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v]*h[v];t.update(p,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Eb(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){return!(E!==Mn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let A=E===hi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==xt&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==nn&&!A)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&($e("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:y,maxSamples:S,samples:T}}function wb(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Fi,o=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){let p=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,m=i.get(f);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{let x=s?0:n,_=x*4,y=m.clippingState||null;l.value=y,y=u(p,h,_,d);for(let S=0;S!==_;++S)y[S]=t[S];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,p){let v=f!==null?f.length:0,g=null;if(v!==0){if(g=l.value,p!==!0||g===null){let m=d+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let _=0,y=d;_!==v;++_,y+=4)a.copy(f[_]).applyMatrix4(x,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var ra=4,ly=[.125,.215,.35,.446,.526,.582],ja=20,bb=256,hu=new vs,cy=new qe,Dg=null,Pg=0,Ig=0,Bg=!1,Cb=new I,dl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=Cb}=s;Dg=this._renderer.getRenderTarget(),Pg=this._renderer.getActiveCubeFace(),Ig=this._renderer.getActiveMipmapLevel(),Bg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fy(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hy(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Dg,Pg,Ig),this._renderer.xr.enabled=Bg,e.scissorTest=!1,hl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===Qa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Dg=this._renderer.getRenderTarget(),Pg=this._renderer.getActiveCubeFace(),Ig=this._renderer.getActiveMipmapLevel(),Bg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:hi,format:Mn,colorSpace:Ni,depthBuffer:!1},r=uy(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uy(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Rb(s)),this._blurMaterial=Pb(s,e,t),this._ggxMaterial=Db(s,e,t)}return r}_compileMaterial(e){let t=new Rt(new Lt,e);this._renderer.compile(t,hu)}_sceneToCubeUV(e,t,n,r,s){let l=new An(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(cy),f.toneMapping=$i,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Rt(new al,new Xa({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,m=!1,x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,m=!0):(g.color.copy(cy),m=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[_],s.y,s.z)):y===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[_]));let S=this._cubeSize;hl(r,y*S,_>2?S:0,S,S),f.setRenderTarget(r),m&&f.render(v,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=x}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===js||e.mapping===Qa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fy()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hy());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;hl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,hu)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-ra?n-p+ra:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,hl(s,g,m,3*v,2*v),r.setRenderTarget(s),r.render(o,hu),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,hl(e,g,m,3*v,2*v),r.setRenderTarget(e),r.render(o,hu)}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&je("blur direction must be either latitudinal or longitudinal!");let u=3,f=this._lodMeshes[r];f.material=c;let h=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ja-1),v=s/p,g=isFinite(s)?1+Math.floor(u*v):ja;g>ja&&$e(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ja}`);let m=[],x=0;for(let E=0;E<ja;++E){let A=E/v,M=Math.exp(-A*A/2);m.push(M),E===0?x+=M:E<g&&(x+=2*M)}for(let E=0;E<m.length;E++)m[E]=m[E]/x;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:_}=this;h.dTheta.value=p,h.mipInt.value=_-n;let y=this._sizeLods[r],S=3*y*(r>_-ra?r-_+ra:0),T=4*(this._cubeSize-y);hl(t,S,T,3*y,2*y),l.setRenderTarget(t),l.render(f,hu)}};function Rb(i){let e=[],t=[],n=[],r=i,s=i-ra+1+ly.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>i-ra?l=ly[a-i+ra-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*d),_=new Float32Array(g*p*d),y=new Float32Array(m*p*d);for(let T=0;T<d;T++){let E=T%3*2/3-1,A=T>2?0:-1,M=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];x.set(M,v*p*T),_.set(h,g*p*T);let C=[T,T,T,T,T,T];y.set(C,m*p*T)}let S=new Lt;S.setAttribute("position",new ut(x,v)),S.setAttribute("uv",new ut(_,g)),S.setAttribute("faceIndex",new ut(y,m)),n.push(new Rt(S,null)),r>ra&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function uy(i,e,t){let n=new vt(i,e,t);return n.texture.mapping=iu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hl(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Db(i,e,t){return new rt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sd(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function Pb(i,e,t){let n=new Float32Array(ja),r=new I(0,1,0);return new rt({name:"SphericalGaussianBlur",defines:{n:ja,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Sd(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function hy(){return new rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sd(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function fy(){return new rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function Sd(){return`

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
	`}var pl=class extends vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Qc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new al(5,5,5),s=new rt({name:"CubemapFromEquirect",uniforms:Za(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Ft});s.uniforms.tEquirect.value=t;let a=new Rt(r,s),o=t.minFilter;return t.minFilter===Gr&&(t.minFilter=Vt),new ol(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Ib(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){let d=h.mapping;if(d===Uf||d===Lf)if(e.has(h)){let p=e.get(h).texture;return o(p,h.mapping)}else{let p=h.image;if(p&&p.height>0){let v=new pl(p.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let d=h.mapping,p=d===Uf||d===Lf,v=d===js||d===Qa;if(p||v){let g=t.get(h),m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new dl(i)),g=p?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let x=h.image;return p&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new dl(i)),g=p?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,d){return d===Uf?h.mapping=js:d===Lf&&(h.mapping=Qa),h}function l(h){let d=0,p=6;for(let v=0;v<p;v++)h[v]!==void 0&&d++;return d===p}function c(h){let d=h.target;d.removeEventListener("dispose",c);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function Bb(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Oc("WebGLRenderer: "+n+" extension not supported."),r}}}function Ub(i,e,t,n){let r={},s=new WeakMap;function a(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete r[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){let h=f.attributes;for(let d in h)e.update(h[d],i.ARRAY_BUFFER)}function c(f){let h=[],d=f.index,p=f.attributes.position,v=0;if(p===void 0)return;if(d!==null){let x=d.array;v=d.version;for(let _=0,y=x.length;_<y;_+=3){let S=x[_+0],T=x[_+1],E=x[_+2];h.push(S,T,T,E,E,S)}}else{let x=p.array;v=p.version;for(let _=0,y=x.length/3-1;_<y;_+=3){let S=_+0,T=_+1,E=_+2;h.push(S,T,T,E,E,S)}}let g=new(p.count>=65535?Gc:Hc)(h,1);g.version=v;let m=s.get(f);m&&e.remove(m),s.set(f,g)}function u(f){let h=s.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Lb(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,p){p!==0&&(i.drawElementsInstanced(n,d,s,h*a,p),t.update(d,n,p))}function u(h,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function f(h,d,p,v){if(p===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<h.length;m++)c(h[m]/a,d[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,v,0,p);let m=0;for(let x=0;x<p;x++)m+=d[x]*v[x];t.update(m,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Fb(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Nb(i,e,t){let n=new WeakMap,r=new At;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let M=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],_=0;d===!0&&(_=1),p===!0&&(_=2),v===!0&&(_=3);let y=o.attributes.position.count*_,S=1;y>e.maxTextureSize&&(S=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*S*4*f),E=new zc(T,y,S,f);E.type=nn,E.needsUpdate=!0;let A=_*4;for(let C=0;C<f;C++){let R=g[C],w=m[C],P=x[C],U=y*S*4*C;for(let N=0;N<R.count;N++){let H=N*A;d===!0&&(r.fromBufferAttribute(R,N),T[U+H+0]=r.x,T[U+H+1]=r.y,T[U+H+2]=r.z,T[U+H+3]=0),p===!0&&(r.fromBufferAttribute(w,N),T[U+H+4]=r.x,T[U+H+5]=r.y,T[U+H+6]=r.z,T[U+H+7]=0),v===!0&&(r.fromBufferAttribute(P,N),T[U+H+8]=r.x,T[U+H+9]=r.y,T[U+H+10]=r.z,T[U+H+11]=P.itemSize===4?r.w:1)}}h={count:f,texture:E,size:new Ce(y,S)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function Ob(i,e,t,n,r){let s=new WeakMap;function a(c){let u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var zb={[hg]:"LINEAR_TONE_MAPPING",[fg]:"REINHARD_TONE_MAPPING",[dg]:"CINEON_TONE_MAPPING",[pg]:"ACES_FILMIC_TONE_MAPPING",[gg]:"AGX_TONE_MAPPING",[vg]:"NEUTRAL_TONE_MAPPING",[mg]:"CUSTOM_TONE_MAPPING"};function kb(i,e,t,n,r){let s=new vt(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),a=new vt(e,t,{type:hi,depthBuffer:!1,stencilBuffer:!1}),o=new Lt;o.setAttribute("position",new on([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new on([0,2,0,0,2,0],2));let l=new yf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Rt(o,l),u=new vs(-1,1,1,-1,0,1),f=null,h=null,d=!1,p,v=null,g=[],m=!1;this.setSize=function(x,_){s.setSize(x,_),a.setSize(x,_);for(let y=0;y<g.length;y++){let S=g[y];S.setSize&&S.setSize(x,_)}},this.setEffects=function(x){g=x,m=g.length>0&&g[0].isRenderPass===!0;let _=s.width,y=s.height;for(let S=0;S<g.length;S++){let T=g[S];T.setSize&&T.setSize(_,y)}},this.begin=function(x,_){if(d||x.toneMapping===$i&&g.length===0)return!1;if(v=_,_!==null){let y=_.width,S=_.height;(s.width!==y||s.height!==S)&&this.setSize(y,S)}return m===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=$i,!0},this.hasRenderPass=function(){return m},this.end=function(x,_){x.toneMapping=p,d=!0;let y=s,S=a;for(let T=0;T<g.length;T++){let E=g[T];if(E.enabled!==!1&&(E.render(x,S,y,_),E.needsSwap!==!1)){let A=y;y=S,S=A}}if(f!==x.outputColorSpace||h!==x.toneMapping){f=x.outputColorSpace,h=x.toneMapping,l.defines={},St.getTransfer(f)===Ut&&(l.defines.SRGB_TRANSFER="");let T=zb[h];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(v),x.render(c,u),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),l.dispose()}}var Py=new Dn,Fg=new zi(1,1),Iy=new zc,By=new mf,Uy=new Qc,dy=[],py=[],my=new Float32Array(16),gy=new Float32Array(9),vy=new Float32Array(4);function ml(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=dy[r];if(s===void 0&&(s=new Float32Array(r),dy[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Pn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function In(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Md(i,e){let t=py[e];t===void 0&&(t=new Int32Array(e),py[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Hb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Gb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2fv(this.addr,e),In(t,e)}}function Vb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pn(t,e))return;i.uniform3fv(this.addr,e),In(t,e)}}function Wb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4fv(this.addr,e),In(t,e)}}function Xb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),In(t,e)}else{if(Pn(t,n))return;vy.set(n),i.uniformMatrix2fv(this.addr,!1,vy),In(t,n)}}function Yb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),In(t,e)}else{if(Pn(t,n))return;gy.set(n),i.uniformMatrix3fv(this.addr,!1,gy),In(t,n)}}function qb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),In(t,e)}else{if(Pn(t,n))return;my.set(n),i.uniformMatrix4fv(this.addr,!1,my),In(t,n)}}function Qb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Zb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2iv(this.addr,e),In(t,e)}}function Kb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3iv(this.addr,e),In(t,e)}}function Jb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4iv(this.addr,e),In(t,e)}}function jb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function $b(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;i.uniform2uiv(this.addr,e),In(t,e)}}function eC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;i.uniform3uiv(this.addr,e),In(t,e)}}function tC(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;i.uniform4uiv(this.addr,e),In(t,e)}}function nC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Fg.compareFunction=t.isReversedDepthBuffer()?xd:vd,s=Fg):s=Py,t.setTexture2D(e||s,r)}function iC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||By,r)}function rC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Uy,r)}function sC(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Iy,r)}function aC(i){switch(i){case 5126:return Hb;case 35664:return Gb;case 35665:return Vb;case 35666:return Wb;case 35674:return Xb;case 35675:return Yb;case 35676:return qb;case 5124:case 35670:return Qb;case 35667:case 35671:return Zb;case 35668:case 35672:return Kb;case 35669:case 35673:return Jb;case 5125:return jb;case 36294:return $b;case 36295:return eC;case 36296:return tC;case 35678:case 36198:case 36298:case 36306:case 35682:return nC;case 35679:case 36299:case 36307:return iC;case 35680:case 36300:case 36308:case 36293:return rC;case 36289:case 36303:case 36311:case 36292:return sC}}function oC(i,e){i.uniform1fv(this.addr,e)}function lC(i,e){let t=ml(e,this.size,2);i.uniform2fv(this.addr,t)}function cC(i,e){let t=ml(e,this.size,3);i.uniform3fv(this.addr,t)}function uC(i,e){let t=ml(e,this.size,4);i.uniform4fv(this.addr,t)}function hC(i,e){let t=ml(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function fC(i,e){let t=ml(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function dC(i,e){let t=ml(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function pC(i,e){i.uniform1iv(this.addr,e)}function mC(i,e){i.uniform2iv(this.addr,e)}function gC(i,e){i.uniform3iv(this.addr,e)}function vC(i,e){i.uniform4iv(this.addr,e)}function xC(i,e){i.uniform1uiv(this.addr,e)}function _C(i,e){i.uniform2uiv(this.addr,e)}function yC(i,e){i.uniform3uiv(this.addr,e)}function AC(i,e){i.uniform4uiv(this.addr,e)}function SC(i,e,t){let n=this.cache,r=e.length,s=Md(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Fg:a=Py;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function MC(i,e,t){let n=this.cache,r=e.length,s=Md(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||By,s[a])}function TC(i,e,t){let n=this.cache,r=e.length,s=Md(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Uy,s[a])}function EC(i,e,t){let n=this.cache,r=e.length,s=Md(t,r);Pn(n,s)||(i.uniform1iv(this.addr,s),In(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Iy,s[a])}function wC(i){switch(i){case 5126:return oC;case 35664:return lC;case 35665:return cC;case 35666:return uC;case 35674:return hC;case 35675:return fC;case 35676:return dC;case 5124:case 35670:return pC;case 35667:case 35671:return mC;case 35668:case 35672:return gC;case 35669:case 35673:return vC;case 5125:return xC;case 36294:return _C;case 36295:return yC;case 36296:return AC;case 35678:case 36198:case 36298:case 36306:case 35682:return SC;case 35679:case 36299:case 36307:return MC;case 35680:case 36300:case 36308:case 36293:return TC;case 36289:case 36303:case 36311:case 36292:return EC}}var Ng=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=aC(t.type)}},Og=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wC(t.type)}},zg=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Ug=/(\w+)(\])?(\[|\.)?/g;function xy(i,e){i.seq.push(e),i.map[e.id]=e}function bC(i,e,t){let n=i.name,r=n.length;for(Ug.lastIndex=0;;){let s=Ug.exec(n),a=Ug.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){xy(t,c===void 0?new Ng(o,i,e):new Og(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new zg(o),xy(t,f)),t=f}}}var fl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);bC(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function _y(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var CC=37297,RC=0;function DC(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var yy=new et;function PC(i){St._getMatrix(yy,St.workingColorSpace,i);let e=`mat3( ${yy.elements.map(t=>t.toFixed(4))} )`;switch(St.getTransfer(i)){case Uc:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return $e("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ay(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+DC(i.getShaderSource(e),o)}else return s}function IC(i,e){let t=PC(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var BC={[hg]:"Linear",[fg]:"Reinhard",[dg]:"Cineon",[pg]:"ACESFilmic",[gg]:"AgX",[vg]:"Neutral",[mg]:"Custom"};function UC(i,e){let t=BC[e];return t===void 0?($e("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var yd=new I;function LC(){St.getLuminanceCoefficients(yd);let i=yd.x.toFixed(4),e=yd.y.toFixed(4),t=yd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function FC(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(du).join(`
`)}function NC(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function OC(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function du(i){return i!==""}function Sy(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function My(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var zC=/^[ \t]*#include +<([\w\d./]+)>/gm;function kg(i){return i.replace(zC,HC)}var kC=new Map;function HC(i,e){let t=ht[e];if(t===void 0){let n=kC.get(e);if(n!==void 0)t=ht[n],$e('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return kg(t)}var GC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ty(i){return i.replace(GC,VC)}function VC(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ey(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var WC={[nu]:"SHADOWMAP_TYPE_PCF",[ll]:"SHADOWMAP_TYPE_VSM"};function XC(i){return WC[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var YC={[js]:"ENVMAP_TYPE_CUBE",[Qa]:"ENVMAP_TYPE_CUBE",[iu]:"ENVMAP_TYPE_CUBE_UV"};function qC(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":YC[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var QC={[Qa]:"ENVMAP_MODE_REFRACTION"};function ZC(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":QC[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var KC={[ug]:"ENVMAP_BLENDING_MULTIPLY",[W_]:"ENVMAP_BLENDING_MIX",[X_]:"ENVMAP_BLENDING_ADD"};function JC(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":KC[i.combine]||"ENVMAP_BLENDING_NONE"}function jC(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function $C(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=XC(t),c=qC(t),u=ZC(t),f=JC(t),h=jC(t),d=FC(t),p=NC(s),v=r.createProgram(),g,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(du).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(du).join(`
`),m.length>0&&(m+=`
`)):(g=[Ey(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(du).join(`
`),m=[Ey(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?ht.tonemapping_pars_fragment:"",t.toneMapping!==$i?UC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,IC("linearToOutputTexel",t.outputColorSpace),LC(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(du).join(`
`)),a=kg(a),a=Sy(a,t),a=My(a,t),o=kg(o),o=Sy(o,t),o=My(o,t),a=Ty(a),o=Ty(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let _=x+g+a,y=x+m+o,S=_y(r,r.VERTEX_SHADER,_),T=_y(r,r.FRAGMENT_SHADER,y);r.attachShader(v,S),r.attachShader(v,T),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function E(R){if(i.debug.checkShaderErrors){let w=r.getProgramInfoLog(v)||"",P=r.getShaderInfoLog(S)||"",U=r.getShaderInfoLog(T)||"",N=w.trim(),H=P.trim(),k=U.trim(),te=!0,K=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,S,T);else{let L=Ay(r,S,"vertex"),oe=Ay(r,T,"fragment");je("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+L+`
`+oe)}else N!==""?$e("WebGLProgram: Program Info Log:",N):(H===""||k==="")&&(K=!1);K&&(R.diagnostics={runnable:te,programLog:N,vertexShader:{log:H,prefix:g},fragmentShader:{log:k,prefix:m}})}r.deleteShader(S),r.deleteShader(T),A=new fl(r,v),M=OC(r,v)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(v,CC)),C},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=RC++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=T,this}var e2=0,Hg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Gg(e),t.set(e,n)),n}},Gg=class{constructor(e){this.id=e2++,this.code=e,this.usedTimes=0}};function t2(i,e,t,n,r,s){let a=new kc,o=new Hg,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(A){return l.add(A),A===0?"uv":`uv${A}`}function v(A,M,C,R,w){let P=R.fog,U=w.geometry,N=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?R.environment:null,H=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,k=e.get(A.envMap||N,H),te=k&&k.mapping===iu?k.image.height:null,K=d[A.type];A.precision!==null&&(h=n.getMaxPrecision(A.precision),h!==A.precision&&$e("WebGLProgram.getParameters:",A.precision,"not supported, using",h,"instead."));let L=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,oe=L!==void 0?L.length:0,ce=0;U.morphAttributes.position!==void 0&&(ce=1),U.morphAttributes.normal!==void 0&&(ce=2),U.morphAttributes.color!==void 0&&(ce=3);let Ie,pe,be,Z;if(K){let Oe=Yr[K];Ie=Oe.vertexShader,pe=Oe.fragmentShader}else Ie=A.vertexShader,pe=A.fragmentShader,o.update(A),be=o.getVertexShaderID(A),Z=o.getFragmentShaderID(A);let le=i.getRenderTarget(),G=i.state.buffers.depth.getReversed(),ue=w.isInstancedMesh===!0,Q=w.isBatchedMesh===!0,de=!!A.map,Se=!!A.matcap,ae=!!k,_e=!!A.aoMap,ye=!!A.lightMap,Ae=!!A.bumpMap,W=!!A.normalMap,z=!!A.displacementMap,We=!!A.emissiveMap,ke=!!A.metalnessMap,Le=!!A.roughnessMap,xe=A.anisotropy>0,B=A.clearcoat>0,b=A.dispersion>0,V=A.iridescence>0,$=A.sheen>0,ie=A.transmission>0,ne=xe&&!!A.anisotropyMap,Me=B&&!!A.clearcoatMap,ve=B&&!!A.clearcoatNormalMap,Pe=B&&!!A.clearcoatRoughnessMap,Be=V&&!!A.iridescenceMap,me=V&&!!A.iridescenceThicknessMap,O=$&&!!A.sheenColorMap,Y=$&&!!A.sheenRoughnessMap,q=!!A.specularMap,re=!!A.specularColorMap,Te=!!A.specularIntensityMap,F=ie&&!!A.transmissionMap,ge=ie&&!!A.thicknessMap,he=!!A.gradientMap,Ee=!!A.alphaMap,fe=A.alphaTest>0,se=!!A.alphaHash,ze=!!A.extensions,Ze=$i;A.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Ze=i.toneMapping);let Tt={shaderID:K,shaderType:A.type,shaderName:A.name,vertexShader:Ie,fragmentShader:pe,defines:A.defines,customVertexShaderID:be,customFragmentShaderID:Z,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:h,batching:Q,batchingColor:Q&&w._colorsTexture!==null,instancing:ue,instancingColor:ue&&w.instanceColor!==null,instancingMorph:ue&&w.morphTexture!==null,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Ni,alphaToCoverage:!!A.alphaToCoverage,map:de,matcap:Se,envMap:ae,envMapMode:ae&&k.mapping,envMapCubeUVHeight:te,aoMap:_e,lightMap:ye,bumpMap:Ae,normalMap:W,displacementMap:z,emissiveMap:We,normalMapObjectSpace:W&&A.normalMapType===q_,normalMapTangentSpace:W&&A.normalMapType===Mg,metalnessMap:ke,roughnessMap:Le,anisotropy:xe,anisotropyMap:ne,clearcoat:B,clearcoatMap:Me,clearcoatNormalMap:ve,clearcoatRoughnessMap:Pe,dispersion:b,iridescence:V,iridescenceMap:Be,iridescenceThicknessMap:me,sheen:$,sheenColorMap:O,sheenRoughnessMap:Y,specularMap:q,specularColorMap:re,specularIntensityMap:Te,transmission:ie,transmissionMap:F,thicknessMap:ge,gradientMap:he,opaque:A.transparent===!1&&A.blending===Ga&&A.alphaToCoverage===!1,alphaMap:Ee,alphaTest:fe,alphaHash:se,combine:A.combine,mapUv:de&&p(A.map.channel),aoMapUv:_e&&p(A.aoMap.channel),lightMapUv:ye&&p(A.lightMap.channel),bumpMapUv:Ae&&p(A.bumpMap.channel),normalMapUv:W&&p(A.normalMap.channel),displacementMapUv:z&&p(A.displacementMap.channel),emissiveMapUv:We&&p(A.emissiveMap.channel),metalnessMapUv:ke&&p(A.metalnessMap.channel),roughnessMapUv:Le&&p(A.roughnessMap.channel),anisotropyMapUv:ne&&p(A.anisotropyMap.channel),clearcoatMapUv:Me&&p(A.clearcoatMap.channel),clearcoatNormalMapUv:ve&&p(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&p(A.clearcoatRoughnessMap.channel),iridescenceMapUv:Be&&p(A.iridescenceMap.channel),iridescenceThicknessMapUv:me&&p(A.iridescenceThicknessMap.channel),sheenColorMapUv:O&&p(A.sheenColorMap.channel),sheenRoughnessMapUv:Y&&p(A.sheenRoughnessMap.channel),specularMapUv:q&&p(A.specularMap.channel),specularColorMapUv:re&&p(A.specularColorMap.channel),specularIntensityMapUv:Te&&p(A.specularIntensityMap.channel),transmissionMapUv:F&&p(A.transmissionMap.channel),thicknessMapUv:ge&&p(A.thicknessMap.channel),alphaMapUv:Ee&&p(A.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(W||xe),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!U.attributes.uv&&(de||Ee),fog:!!P,useFog:A.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||U.attributes.normal===void 0&&W===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:G,skinning:w.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ce,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:A.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ze,decodeVideoTexture:de&&A.map.isVideoTexture===!0&&St.getTransfer(A.map.colorSpace)===Ut,decodeVideoTextureEmissive:We&&A.emissiveMap.isVideoTexture===!0&&St.getTransfer(A.emissiveMap.colorSpace)===Ut,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===vn,flipSided:A.side===tn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:ze&&A.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&A.extensions.multiDraw===!0||Q)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function g(A){let M=[];if(A.shaderID?M.push(A.shaderID):(M.push(A.customVertexShaderID),M.push(A.customFragmentShaderID)),A.defines!==void 0)for(let C in A.defines)M.push(C),M.push(A.defines[C]);return A.isRawShaderMaterial===!1&&(m(M,A),x(M,A),M.push(i.outputColorSpace)),M.push(A.customProgramCacheKey),M.join()}function m(A,M){A.push(M.precision),A.push(M.outputColorSpace),A.push(M.envMapMode),A.push(M.envMapCubeUVHeight),A.push(M.mapUv),A.push(M.alphaMapUv),A.push(M.lightMapUv),A.push(M.aoMapUv),A.push(M.bumpMapUv),A.push(M.normalMapUv),A.push(M.displacementMapUv),A.push(M.emissiveMapUv),A.push(M.metalnessMapUv),A.push(M.roughnessMapUv),A.push(M.anisotropyMapUv),A.push(M.clearcoatMapUv),A.push(M.clearcoatNormalMapUv),A.push(M.clearcoatRoughnessMapUv),A.push(M.iridescenceMapUv),A.push(M.iridescenceThicknessMapUv),A.push(M.sheenColorMapUv),A.push(M.sheenRoughnessMapUv),A.push(M.specularMapUv),A.push(M.specularColorMapUv),A.push(M.specularIntensityMapUv),A.push(M.transmissionMapUv),A.push(M.thicknessMapUv),A.push(M.combine),A.push(M.fogExp2),A.push(M.sizeAttenuation),A.push(M.morphTargetsCount),A.push(M.morphAttributeCount),A.push(M.numDirLights),A.push(M.numPointLights),A.push(M.numSpotLights),A.push(M.numSpotLightMaps),A.push(M.numHemiLights),A.push(M.numRectAreaLights),A.push(M.numDirLightShadows),A.push(M.numPointLightShadows),A.push(M.numSpotLightShadows),A.push(M.numSpotLightShadowsWithMaps),A.push(M.numLightProbes),A.push(M.shadowMapType),A.push(M.toneMapping),A.push(M.numClippingPlanes),A.push(M.numClipIntersection),A.push(M.depthPacking)}function x(A,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),A.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),A.push(a.mask)}function _(A){let M=d[A.type],C;if(M){let R=Yr[M];C=ay.clone(R.uniforms)}else C=A.uniforms;return C}function y(A,M){let C=u.get(M);return C!==void 0?++C.usedTimes:(C=new $C(i,M,A,r),c.push(C),u.set(M,C)),C}function S(A){if(--A.usedTimes===0){let M=c.indexOf(A);c[M]=c[c.length-1],c.pop(),u.delete(A.cacheKey),A.destroy()}}function T(A){o.remove(A)}function E(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:_,acquireProgram:y,releaseProgram:S,releaseShaderCache:T,programs:c,dispose:E}}function n2(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function i2(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function wy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function by(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,v,g,m){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},i[e]=x):(x.id=h.id,x.object=h,x.geometry=d,x.material=p,x.materialVariant=a(h),x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=g,x.group=m),e++,x}function l(h,d,p,v,g,m){let x=o(h,d,p,v,g,m);p.transmission>0?n.push(x):p.transparent===!0?r.push(x):t.push(x)}function c(h,d,p,v,g,m){let x=o(h,d,p,v,g,m);p.transmission>0?n.unshift(x):p.transparent===!0?r.unshift(x):t.unshift(x)}function u(h,d){t.length>1&&t.sort(h||i2),n.length>1&&n.sort(d||wy),r.length>1&&r.sort(d||wy)}function f(){for(let h=e,d=i.length;h<d;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function r2(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new by,i.set(n,[a])):r>=s.length?(a=new by,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function s2(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new qe};break;case"SpotLight":t={position:new I,direction:new I,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function a2(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var o2=0;function l2(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function c2(i){let e=new s2,t=a2(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let r=new I,s=new Je,a=new Je;function o(c){let u=0,f=0,h=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,x=0,_=0,y=0,S=0,T=0,E=0;c.sort(l2);for(let M=0,C=c.length;M<C;M++){let R=c[M],w=R.color,P=R.intensity,U=R.distance,N=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===xs?N=R.shadow.map.texture:N=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=w.r*P,f+=w.g*P,h+=w.b*P;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],P);E++}else if(R.isDirectionalLight){let H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let k=R.shadow,te=t.get(R);te.shadowIntensity=k.intensity,te.shadowBias=k.bias,te.shadowNormalBias=k.normalBias,te.shadowRadius=k.radius,te.shadowMapSize=k.mapSize,n.directionalShadow[d]=te,n.directionalShadowMap[d]=N,n.directionalShadowMatrix[d]=R.shadow.matrix,x++}n.directional[d]=H,d++}else if(R.isSpotLight){let H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(w).multiplyScalar(P),H.distance=U,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[v]=H;let k=R.shadow;if(R.map&&(n.spotLightMap[S]=R.map,S++,k.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[v]=k.matrix,R.castShadow){let te=t.get(R);te.shadowIntensity=k.intensity,te.shadowBias=k.bias,te.shadowNormalBias=k.normalBias,te.shadowRadius=k.radius,te.shadowMapSize=k.mapSize,n.spotShadow[v]=te,n.spotShadowMap[v]=N,y++}v++}else if(R.isRectAreaLight){let H=e.get(R);H.color.copy(w).multiplyScalar(P),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=H,g++}else if(R.isPointLight){let H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){let k=R.shadow,te=t.get(R);te.shadowIntensity=k.intensity,te.shadowBias=k.bias,te.shadowNormalBias=k.normalBias,te.shadowRadius=k.radius,te.shadowMapSize=k.mapSize,te.shadowCameraNear=k.camera.near,te.shadowCameraFar=k.camera.far,n.pointShadow[p]=te,n.pointShadowMap[p]=N,n.pointShadowMatrix[p]=R.shadow.matrix,_++}n.point[p]=H,p++}else if(R.isHemisphereLight){let H=e.get(R);H.skyColor.copy(R.color).multiplyScalar(P),H.groundColor.copy(R.groundColor).multiplyScalar(P),n.hemi[m]=H,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let A=n.hash;(A.directionalLength!==d||A.pointLength!==p||A.spotLength!==v||A.rectAreaLength!==g||A.hemiLength!==m||A.numDirectionalShadows!==x||A.numPointShadows!==_||A.numSpotShadows!==y||A.numSpotMaps!==S||A.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+S-T,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,A.directionalLength=d,A.pointLength=p,A.spotLength=v,A.rectAreaLength=g,A.hemiLength=m,A.numDirectionalShadows=x,A.numPointShadows=_,A.numSpotShadows=y,A.numSpotMaps=S,A.numLightProbes=E,n.version=o2++)}function l(c,u){let f=0,h=0,d=0,p=0,v=0,g=u.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){let _=c[m];if(_.isDirectionalLight){let y=n.directional[f];y.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),f++}else if(_.isSpotLight){let y=n.spot[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),d++}else if(_.isRectAreaLight){let y=n.rectArea[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(_.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),h++}else if(_.isHemisphereLight){let y=n.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Cy(i){let e=new c2(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function u2(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new Cy(i),e.set(r,[o])):s>=a.length?(o=new Cy(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var h2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f2=`uniform sampler2D shadow_pass;
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
}`,d2=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],p2=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Ry=new Je,fu=new I,Lg=new I;function m2(i,e,t){let n=new Yc,r=new Ce,s=new Ce,a=new At,o=new Af,l=new Sf,c={},u=t.maxTextureSize,f={[ci]:tn,[tn]:ci,[vn]:vn},h=new rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:h2,fragmentShader:f2}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let p=new Lt;p.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Rt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nu;let m=this.type;this.render=function(T,E,A){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===E_&&($e("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=nu);let M=i.getRenderTarget(),C=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),w=i.state;w.setBlending(Ft),w.buffers.depth.getReversed()===!0?w.buffers.color.setClear(0,0,0,0):w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);let P=m!==this.type;P&&E.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(N=>N.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,N=T.length;U<N;U++){let H=T[U],k=H.shadow;if(k===void 0){$e("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);let te=k.getFrameExtents();r.multiply(te),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,k.mapSize.y=s.y));let K=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=K,k.map===null||P===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ll){if(H.isPointLight){$e("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new vt(r.x,r.y,{format:xs,type:hi,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new zi(r.x,r.y,nn),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=hr,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ct,k.map.depthTexture.magFilter=Ct}else H.isPointLight?(k.map=new pl(r.x),k.map.depthTexture=new xf(r.x,Sn)):(k.map=new vt(r.x,r.y),k.map.depthTexture=new zi(r.x,r.y,Sn)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=hr,this.type===nu?(k.map.depthTexture.compareFunction=K?xd:vd,k.map.depthTexture.minFilter=Vt,k.map.depthTexture.magFilter=Vt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ct,k.map.depthTexture.magFilter=Ct);k.camera.updateProjectionMatrix()}let L=k.map.isWebGLCubeRenderTarget?6:1;for(let oe=0;oe<L;oe++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,oe),i.clear();else{oe===0&&(i.setRenderTarget(k.map),i.clear());let ce=k.getViewport(oe);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),w.viewport(a)}if(H.isPointLight){let ce=k.camera,Ie=k.matrix,pe=H.distance||ce.far;pe!==ce.far&&(ce.far=pe,ce.updateProjectionMatrix()),fu.setFromMatrixPosition(H.matrixWorld),ce.position.copy(fu),Lg.copy(ce.position),Lg.add(d2[oe]),ce.up.copy(p2[oe]),ce.lookAt(Lg),ce.updateMatrixWorld(),Ie.makeTranslation(-fu.x,-fu.y,-fu.z),Ry.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Ry,ce.coordinateSystem,ce.reversedDepth)}else k.updateMatrices(H);n=k.getFrustum(),y(E,A,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===ll&&x(k,A),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(M,C,R)};function x(T,E){let A=e.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new vt(r.x,r.y,{format:xs,type:hi})),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(E,null,A,h,v,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(E,null,A,d,v,null)}function _(T,E,A,M){let C=null,R=A.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)C=R;else if(C=A.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let w=C.uuid,P=E.uuid,U=c[w];U===void 0&&(U={},c[w]=U);let N=U[P];N===void 0&&(N=C.clone(),U[P]=N,E.addEventListener("dispose",S)),C=N}if(C.visible=E.visible,C.wireframe=E.wireframe,M===ll?C.side=E.shadowSide!==null?E.shadowSide:E.side:C.side=E.shadowSide!==null?E.shadowSide:f[E.side],C.alphaMap=E.alphaMap,C.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,C.map=E.map,C.clipShadows=E.clipShadows,C.clippingPlanes=E.clippingPlanes,C.clipIntersection=E.clipIntersection,C.displacementMap=E.displacementMap,C.displacementScale=E.displacementScale,C.displacementBias=E.displacementBias,C.wireframeLinewidth=E.wireframeLinewidth,C.linewidth=E.linewidth,A.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let w=i.properties.get(C);w.light=A}return C}function y(T,E,A,M,C){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&C===ll)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,T.matrixWorld);let P=e.update(T),U=T.material;if(Array.isArray(U)){let N=P.groups;for(let H=0,k=N.length;H<k;H++){let te=N[H],K=U[te.materialIndex];if(K&&K.visible){let L=_(T,K,M,C);T.onBeforeShadow(i,T,E,A,P,L,te),i.renderBufferDirect(A,null,P,L,T,te),T.onAfterShadow(i,T,E,A,P,L,te)}}}else if(U.visible){let N=_(T,U,M,C);T.onBeforeShadow(i,T,E,A,P,N,null),i.renderBufferDirect(A,null,P,N,T,null),T.onAfterShadow(i,T,E,A,P,N,null)}}let w=T.children;for(let P=0,U=w.length;P<U;P++)y(w[P],E,A,M,C)}function S(T){T.target.removeEventListener("dispose",S);for(let A in c){let M=c[A],C=T.target.uuid;C in M&&(M[C].dispose(),delete M[C])}}}function g2(i,e){function t(){let F=!1,ge=new At,he=null,Ee=new At(0,0,0,0);return{setMask:function(fe){he!==fe&&!F&&(i.colorMask(fe,fe,fe,fe),he=fe)},setLocked:function(fe){F=fe},setClear:function(fe,se,ze,Ze,Tt){Tt===!0&&(fe*=Ze,se*=Ze,ze*=Ze),ge.set(fe,se,ze,Ze),Ee.equals(ge)===!1&&(i.clearColor(fe,se,ze,Ze),Ee.copy(ge))},reset:function(){F=!1,he=null,Ee.set(-1,0,0,0)}}}function n(){let F=!1,ge=!1,he=null,Ee=null,fe=null;return{setReversed:function(se){if(ge!==se){let ze=e.get("EXT_clip_control");se?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),ge=se;let Ze=fe;fe=null,this.setClear(Ze)}},getReversed:function(){return ge},setTest:function(se){se?le(i.DEPTH_TEST):G(i.DEPTH_TEST)},setMask:function(se){he!==se&&!F&&(i.depthMask(se),he=se)},setFunc:function(se){if(ge&&(se=iy[se]),Ee!==se){switch(se){case rf:i.depthFunc(i.NEVER);break;case jo:i.depthFunc(i.ALWAYS);break;case sf:i.depthFunc(i.LESS);break;case Va:i.depthFunc(i.LEQUAL);break;case af:i.depthFunc(i.EQUAL);break;case of:i.depthFunc(i.GEQUAL);break;case lf:i.depthFunc(i.GREATER);break;case cf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=se}},setLocked:function(se){F=se},setClear:function(se){fe!==se&&(fe=se,ge&&(se=1-se),i.clearDepth(se))},reset:function(){F=!1,he=null,Ee=null,fe=null,ge=!1}}}function r(){let F=!1,ge=null,he=null,Ee=null,fe=null,se=null,ze=null,Ze=null,Tt=null;return{setTest:function(Oe){F||(Oe?le(i.STENCIL_TEST):G(i.STENCIL_TEST))},setMask:function(Oe){ge!==Oe&&!F&&(i.stencilMask(Oe),ge=Oe)},setFunc:function(Oe,Xe,ct){(he!==Oe||Ee!==Xe||fe!==ct)&&(i.stencilFunc(Oe,Xe,ct),he=Oe,Ee=Xe,fe=ct)},setOp:function(Oe,Xe,ct){(se!==Oe||ze!==Xe||Ze!==ct)&&(i.stencilOp(Oe,Xe,ct),se=Oe,ze=Xe,Ze=ct)},setLocked:function(Oe){F=Oe},setClear:function(Oe){Tt!==Oe&&(i.clearStencil(Oe),Tt=Oe)},reset:function(){F=!1,ge=null,he=null,Ee=null,fe=null,se=null,ze=null,Ze=null,Tt=null}}}let s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap,u={},f={},h=new WeakMap,d=[],p=null,v=!1,g=null,m=null,x=null,_=null,y=null,S=null,T=null,E=new qe(0,0,0),A=0,M=!1,C=null,R=null,w=null,P=null,U=null,N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,k=0,te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(te)[1]),H=k>=1):te.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),H=k>=2);let K=null,L={},oe=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),Ie=new At().fromArray(oe),pe=new At().fromArray(ce);function be(F,ge,he,Ee){let fe=new Uint8Array(4),se=i.createTexture();i.bindTexture(F,se),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<he;ze++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ge+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return se}let Z={};Z[i.TEXTURE_2D]=be(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=be(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=be(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=be(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),le(i.DEPTH_TEST),a.setFunc(Va),Ae(!1),W(og),le(i.CULL_FACE),_e(Ft);function le(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function G(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function ue(F,ge){return f[F]!==ge?(i.bindFramebuffer(F,ge),f[F]=ge,F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ge),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Q(F,ge){let he=d,Ee=!1;if(F){he=h.get(ge),he===void 0&&(he=[],h.set(ge,he));let fe=F.textures;if(he.length!==fe.length||he[0]!==i.COLOR_ATTACHMENT0){for(let se=0,ze=fe.length;se<ze;se++)he[se]=i.COLOR_ATTACHMENT0+se;he.length=fe.length,Ee=!0}}else he[0]!==i.BACK&&(he[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(he)}function de(F){return p!==F?(i.useProgram(F),p=F,!0):!1}let Se={[qs]:i.FUNC_ADD,[b_]:i.FUNC_SUBTRACT,[C_]:i.FUNC_REVERSE_SUBTRACT};Se[R_]=i.MIN,Se[D_]=i.MAX;let ae={[P_]:i.ZERO,[I_]:i.ONE,[B_]:i.SRC_COLOR,[tf]:i.SRC_ALPHA,[z_]:i.SRC_ALPHA_SATURATE,[N_]:i.DST_COLOR,[L_]:i.DST_ALPHA,[U_]:i.ONE_MINUS_SRC_COLOR,[nf]:i.ONE_MINUS_SRC_ALPHA,[O_]:i.ONE_MINUS_DST_COLOR,[F_]:i.ONE_MINUS_DST_ALPHA,[k_]:i.CONSTANT_COLOR,[H_]:i.ONE_MINUS_CONSTANT_COLOR,[G_]:i.CONSTANT_ALPHA,[V_]:i.ONE_MINUS_CONSTANT_ALPHA};function _e(F,ge,he,Ee,fe,se,ze,Ze,Tt,Oe){if(F===Ft){v===!0&&(G(i.BLEND),v=!1);return}if(v===!1&&(le(i.BLEND),v=!0),F!==w_){if(F!==g||Oe!==M){if((m!==qs||y!==qs)&&(i.blendEquation(i.FUNC_ADD),m=qs,y=qs),Oe)switch(F){case Ga:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Js:i.blendFunc(i.ONE,i.ONE);break;case lg:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cg:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:je("WebGLState: Invalid blending: ",F);break}else switch(F){case Ga:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Js:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case lg:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case cg:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",F);break}x=null,_=null,S=null,T=null,E.set(0,0,0),A=0,g=F,M=Oe}return}fe=fe||ge,se=se||he,ze=ze||Ee,(ge!==m||fe!==y)&&(i.blendEquationSeparate(Se[ge],Se[fe]),m=ge,y=fe),(he!==x||Ee!==_||se!==S||ze!==T)&&(i.blendFuncSeparate(ae[he],ae[Ee],ae[se],ae[ze]),x=he,_=Ee,S=se,T=ze),(Ze.equals(E)===!1||Tt!==A)&&(i.blendColor(Ze.r,Ze.g,Ze.b,Tt),E.copy(Ze),A=Tt),g=F,M=!1}function ye(F,ge){F.side===vn?G(i.CULL_FACE):le(i.CULL_FACE);let he=F.side===tn;ge&&(he=!he),Ae(he),F.blending===Ga&&F.transparent===!1?_e(Ft):_e(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);let Ee=F.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),We(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?le(i.SAMPLE_ALPHA_TO_COVERAGE):G(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(F){C!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),C=F)}function W(F){F!==M_?(le(i.CULL_FACE),F!==R&&(F===og?i.cullFace(i.BACK):F===T_?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):G(i.CULL_FACE),R=F}function z(F){F!==w&&(H&&i.lineWidth(F),w=F)}function We(F,ge,he){F?(le(i.POLYGON_OFFSET_FILL),(P!==ge||U!==he)&&(P=ge,U=he,a.getReversed()&&(ge=-ge),i.polygonOffset(ge,he))):G(i.POLYGON_OFFSET_FILL)}function ke(F){F?le(i.SCISSOR_TEST):G(i.SCISSOR_TEST)}function Le(F){F===void 0&&(F=i.TEXTURE0+N-1),K!==F&&(i.activeTexture(F),K=F)}function xe(F,ge,he){he===void 0&&(K===null?he=i.TEXTURE0+N-1:he=K);let Ee=L[he];Ee===void 0&&(Ee={type:void 0,texture:void 0},L[he]=Ee),(Ee.type!==F||Ee.texture!==ge)&&(K!==he&&(i.activeTexture(he),K=he),i.bindTexture(F,ge||Z[F]),Ee.type=F,Ee.texture=ge)}function B(){let F=L[K];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(F){je("WebGLState:",F)}}function V(){try{i.compressedTexImage3D(...arguments)}catch(F){je("WebGLState:",F)}}function $(){try{i.texSubImage2D(...arguments)}catch(F){je("WebGLState:",F)}}function ie(){try{i.texSubImage3D(...arguments)}catch(F){je("WebGLState:",F)}}function ne(){try{i.compressedTexSubImage2D(...arguments)}catch(F){je("WebGLState:",F)}}function Me(){try{i.compressedTexSubImage3D(...arguments)}catch(F){je("WebGLState:",F)}}function ve(){try{i.texStorage2D(...arguments)}catch(F){je("WebGLState:",F)}}function Pe(){try{i.texStorage3D(...arguments)}catch(F){je("WebGLState:",F)}}function Be(){try{i.texImage2D(...arguments)}catch(F){je("WebGLState:",F)}}function me(){try{i.texImage3D(...arguments)}catch(F){je("WebGLState:",F)}}function O(F){Ie.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Ie.copy(F))}function Y(F){pe.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),pe.copy(F))}function q(F,ge){let he=c.get(ge);he===void 0&&(he=new WeakMap,c.set(ge,he));let Ee=he.get(F);Ee===void 0&&(Ee=i.getUniformBlockIndex(ge,F.name),he.set(F,Ee))}function re(F,ge){let Ee=c.get(ge).get(F);l.get(ge)!==Ee&&(i.uniformBlockBinding(ge,Ee,F.__bindingPointIndex),l.set(ge,Ee))}function Te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},K=null,L={},f={},h=new WeakMap,d=[],p=null,v=!1,g=null,m=null,x=null,_=null,y=null,S=null,T=null,E=new qe(0,0,0),A=0,M=!1,C=null,R=null,w=null,P=null,U=null,Ie.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:le,disable:G,bindFramebuffer:ue,drawBuffers:Q,useProgram:de,setBlending:_e,setMaterial:ye,setFlipSided:Ae,setCullFace:W,setLineWidth:z,setPolygonOffset:We,setScissorTest:ke,activeTexture:Le,bindTexture:xe,unbindTexture:B,compressedTexImage2D:b,compressedTexImage3D:V,texImage2D:Be,texImage3D:me,updateUBOMapping:q,uniformBlockBinding:re,texStorage2D:ve,texStorage3D:Pe,texSubImage2D:$,texSubImage3D:ie,compressedTexSubImage2D:ne,compressedTexSubImage3D:Me,scissor:O,viewport:Y,reset:Te}}function v2(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,u=new WeakMap,f,h=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(B,b){return d?new OffscreenCanvas(B,b):Fc("canvas")}function v(B,b,V){let $=1,ie=xe(B);if((ie.width>V||ie.height>V)&&($=V/Math.max(ie.width,ie.height)),$<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){let ne=Math.floor($*ie.width),Me=Math.floor($*ie.height);f===void 0&&(f=p(ne,Me));let ve=b?p(ne,Me):f;return ve.width=ne,ve.height=Me,ve.getContext("2d").drawImage(B,0,0,ne,Me),$e("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+ne+"x"+Me+")."),ve}else return"data"in B&&$e("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),B;return B}function g(B){return B.generateMipmaps}function m(B){i.generateMipmap(B)}function x(B){return B.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?i.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(B,b,V,$,ie=!1){if(B!==null){if(i[B]!==void 0)return i[B];$e("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let ne=b;if(b===i.RED&&(V===i.FLOAT&&(ne=i.R32F),V===i.HALF_FLOAT&&(ne=i.R16F),V===i.UNSIGNED_BYTE&&(ne=i.R8)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.R8UI),V===i.UNSIGNED_SHORT&&(ne=i.R16UI),V===i.UNSIGNED_INT&&(ne=i.R32UI),V===i.BYTE&&(ne=i.R8I),V===i.SHORT&&(ne=i.R16I),V===i.INT&&(ne=i.R32I)),b===i.RG&&(V===i.FLOAT&&(ne=i.RG32F),V===i.HALF_FLOAT&&(ne=i.RG16F),V===i.UNSIGNED_BYTE&&(ne=i.RG8)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.RG8UI),V===i.UNSIGNED_SHORT&&(ne=i.RG16UI),V===i.UNSIGNED_INT&&(ne=i.RG32UI),V===i.BYTE&&(ne=i.RG8I),V===i.SHORT&&(ne=i.RG16I),V===i.INT&&(ne=i.RG32I)),b===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),V===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),V===i.UNSIGNED_INT&&(ne=i.RGB32UI),V===i.BYTE&&(ne=i.RGB8I),V===i.SHORT&&(ne=i.RGB16I),V===i.INT&&(ne=i.RGB32I)),b===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),V===i.UNSIGNED_INT&&(ne=i.RGBA32UI),V===i.BYTE&&(ne=i.RGBA8I),V===i.SHORT&&(ne=i.RGBA16I),V===i.INT&&(ne=i.RGBA32I)),b===i.RGB&&(V===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(ne=i.R11F_G11F_B10F)),b===i.RGBA){let Me=ie?Uc:St.getTransfer($);V===i.FLOAT&&(ne=i.RGBA32F),V===i.HALF_FLOAT&&(ne=i.RGBA16F),V===i.UNSIGNED_BYTE&&(ne=Me===Ut?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function y(B,b){let V;return B?b===null||b===Sn||b===Vr?V=i.DEPTH24_STENCIL8:b===nn?V=i.DEPTH32F_STENCIL8:b===$s&&(V=i.DEPTH24_STENCIL8,$e("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Sn||b===Vr?V=i.DEPTH_COMPONENT24:b===nn?V=i.DEPTH_COMPONENT32F:b===$s&&(V=i.DEPTH_COMPONENT16),V}function S(B,b){return g(B)===!0||B.isFramebufferTexture&&B.minFilter!==Ct&&B.minFilter!==Vt?Math.log2(Math.max(b.width,b.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?b.mipmaps.length:1}function T(B){let b=B.target;b.removeEventListener("dispose",T),A(b),b.isVideoTexture&&u.delete(b)}function E(B){let b=B.target;b.removeEventListener("dispose",E),C(b)}function A(B){let b=n.get(B);if(b.__webglInit===void 0)return;let V=B.source,$=h.get(V);if($){let ie=$[b.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&M(B),Object.keys($).length===0&&h.delete(V)}n.remove(B)}function M(B){let b=n.get(B);i.deleteTexture(b.__webglTexture);let V=B.source,$=h.get(V);delete $[b.__cacheKey],a.memory.textures--}function C(B){let b=n.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),n.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(b.__webglFramebuffer[$]))for(let ie=0;ie<b.__webglFramebuffer[$].length;ie++)i.deleteFramebuffer(b.__webglFramebuffer[$][ie]);else i.deleteFramebuffer(b.__webglFramebuffer[$]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[$])}else{if(Array.isArray(b.__webglFramebuffer))for(let $=0;$<b.__webglFramebuffer.length;$++)i.deleteFramebuffer(b.__webglFramebuffer[$]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let $=0;$<b.__webglColorRenderbuffer.length;$++)b.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[$]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let V=B.textures;for(let $=0,ie=V.length;$<ie;$++){let ne=n.get(V[$]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(V[$])}n.remove(B)}let R=0;function w(){R=0}function P(){let B=R;return B>=r.maxTextures&&$e("WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+r.maxTextures),R+=1,B}function U(B){let b=[];return b.push(B.wrapS),b.push(B.wrapT),b.push(B.wrapR||0),b.push(B.magFilter),b.push(B.minFilter),b.push(B.anisotropy),b.push(B.internalFormat),b.push(B.format),b.push(B.type),b.push(B.generateMipmaps),b.push(B.premultiplyAlpha),b.push(B.flipY),b.push(B.unpackAlignment),b.push(B.colorSpace),b.join()}function N(B,b){let V=n.get(B);if(B.isVideoTexture&&ke(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&V.__version!==B.version){let $=B.image;if($===null)$e("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)$e("WebGLRenderer: Texture marked for update but image is incomplete");else{Z(V,B,b);return}}else B.isExternalTexture&&(V.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function H(B,b){let V=n.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&V.__version!==B.version){Z(V,B,b);return}else B.isExternalTexture&&(V.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function k(B,b){let V=n.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&V.__version!==B.version){Z(V,B,b);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function te(B,b){let V=n.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&V.__version!==B.version){le(V,B,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}let K={[$o]:i.REPEAT,[kr]:i.CLAMP_TO_EDGE,[uf]:i.MIRRORED_REPEAT},L={[Ct]:i.NEAREST,[Y_]:i.NEAREST_MIPMAP_NEAREST,[ru]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[Ff]:i.LINEAR_MIPMAP_NEAREST,[Gr]:i.LINEAR_MIPMAP_LINEAR},oe={[Q_]:i.NEVER,[$_]:i.ALWAYS,[Z_]:i.LESS,[vd]:i.LEQUAL,[K_]:i.EQUAL,[xd]:i.GEQUAL,[J_]:i.GREATER,[j_]:i.NOTEQUAL};function ce(B,b){if(b.type===nn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Vt||b.magFilter===Ff||b.magFilter===ru||b.magFilter===Gr||b.minFilter===Vt||b.minFilter===Ff||b.minFilter===ru||b.minFilter===Gr)&&$e("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(B,i.TEXTURE_WRAP_S,K[b.wrapS]),i.texParameteri(B,i.TEXTURE_WRAP_T,K[b.wrapT]),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,K[b.wrapR]),i.texParameteri(B,i.TEXTURE_MAG_FILTER,L[b.magFilter]),i.texParameteri(B,i.TEXTURE_MIN_FILTER,L[b.minFilter]),b.compareFunction&&(i.texParameteri(B,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(B,i.TEXTURE_COMPARE_FUNC,oe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ct||b.minFilter!==ru&&b.minFilter!==Gr||b.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(B,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ie(B,b){let V=!1;B.__webglInit===void 0&&(B.__webglInit=!0,b.addEventListener("dispose",T));let $=b.source,ie=h.get($);ie===void 0&&(ie={},h.set($,ie));let ne=U(b);if(ne!==B.__cacheKey){ie[ne]===void 0&&(ie[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ie[ne].usedTimes++;let Me=ie[B.__cacheKey];Me!==void 0&&(ie[B.__cacheKey].usedTimes--,Me.usedTimes===0&&M(b)),B.__cacheKey=ne,B.__webglTexture=ie[ne].texture}return V}function pe(B,b,V){return Math.floor(Math.floor(B/V)/b)}function be(B,b,V,$){let ne=B.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,V,$,b.data);else{ne.sort((me,O)=>me.start-O.start);let Me=0;for(let me=1;me<ne.length;me++){let O=ne[Me],Y=ne[me],q=O.start+O.count,re=pe(Y.start,b.width,4),Te=pe(O.start,b.width,4);Y.start<=q+1&&re===Te&&pe(Y.start+Y.count-1,b.width,4)===re?O.count=Math.max(O.count,Y.start+Y.count-O.start):(++Me,ne[Me]=Y)}ne.length=Me+1;let ve=i.getParameter(i.UNPACK_ROW_LENGTH),Pe=i.getParameter(i.UNPACK_SKIP_PIXELS),Be=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let me=0,O=ne.length;me<O;me++){let Y=ne[me],q=Math.floor(Y.start/4),re=Math.ceil(Y.count/4),Te=q%b.width,F=Math.floor(q/b.width),ge=re,he=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Te),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,Te,F,ge,he,V,$,b.data)}B.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ve),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Pe),i.pixelStorei(i.UNPACK_SKIP_ROWS,Be)}}function Z(B,b,V){let $=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&($=i.TEXTURE_3D);let ie=Ie(B,b),ne=b.source;t.bindTexture($,B.__webglTexture,i.TEXTURE0+V);let Me=n.get(ne);if(ne.version!==Me.__version||ie===!0){t.activeTexture(i.TEXTURE0+V);let ve=St.getPrimaries(St.workingColorSpace),Pe=b.colorSpace===bi?null:St.getPrimaries(b.colorSpace),Be=b.colorSpace===bi||ve===Pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);let me=v(b.image,!1,r.maxTextureSize);me=Le(b,me);let O=s.convert(b.format,b.colorSpace),Y=s.convert(b.type),q=_(b.internalFormat,O,Y,b.colorSpace,b.isVideoTexture);ce($,b);let re,Te=b.mipmaps,F=b.isVideoTexture!==!0,ge=Me.__version===void 0||ie===!0,he=ne.dataReady,Ee=S(b,me);if(b.isDepthTexture)q=y(b.format===dr,b.type),ge&&(F?t.texStorage2D(i.TEXTURE_2D,1,q,me.width,me.height):t.texImage2D(i.TEXTURE_2D,0,q,me.width,me.height,0,O,Y,null));else if(b.isDataTexture)if(Te.length>0){F&&ge&&t.texStorage2D(i.TEXTURE_2D,Ee,q,Te[0].width,Te[0].height);for(let fe=0,se=Te.length;fe<se;fe++)re=Te[fe],F?he&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,re.width,re.height,O,Y,re.data):t.texImage2D(i.TEXTURE_2D,fe,q,re.width,re.height,0,O,Y,re.data);b.generateMipmaps=!1}else F?(ge&&t.texStorage2D(i.TEXTURE_2D,Ee,q,me.width,me.height),he&&be(b,me,O,Y)):t.texImage2D(i.TEXTURE_2D,0,q,me.width,me.height,0,O,Y,me.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){F&&ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,q,Te[0].width,Te[0].height,me.depth);for(let fe=0,se=Te.length;fe<se;fe++)if(re=Te[fe],b.format!==Mn)if(O!==null)if(F){if(he)if(b.layerUpdates.size>0){let ze=Rg(re.width,re.height,b.format,b.type);for(let Ze of b.layerUpdates){let Tt=re.data.subarray(Ze*ze/re.data.BYTES_PER_ELEMENT,(Ze+1)*ze/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,Ze,re.width,re.height,1,O,Tt)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,re.width,re.height,me.depth,O,re.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,q,re.width,re.height,me.depth,0,re.data,0,0);else $e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?he&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,re.width,re.height,me.depth,O,Y,re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,q,re.width,re.height,me.depth,0,O,Y,re.data)}else{F&&ge&&t.texStorage2D(i.TEXTURE_2D,Ee,q,Te[0].width,Te[0].height);for(let fe=0,se=Te.length;fe<se;fe++)re=Te[fe],b.format!==Mn?O!==null?F?he&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,re.width,re.height,O,re.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,q,re.width,re.height,0,re.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?he&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,re.width,re.height,O,Y,re.data):t.texImage2D(i.TEXTURE_2D,fe,q,re.width,re.height,0,O,Y,re.data)}else if(b.isDataArrayTexture)if(F){if(ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,q,me.width,me.height,me.depth),he)if(b.layerUpdates.size>0){let fe=Rg(me.width,me.height,b.format,b.type);for(let se of b.layerUpdates){let ze=me.data.subarray(se*fe/me.data.BYTES_PER_ELEMENT,(se+1)*fe/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,se,me.width,me.height,1,O,Y,ze)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,O,Y,me.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,q,me.width,me.height,me.depth,0,O,Y,me.data);else if(b.isData3DTexture)F?(ge&&t.texStorage3D(i.TEXTURE_3D,Ee,q,me.width,me.height,me.depth),he&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,O,Y,me.data)):t.texImage3D(i.TEXTURE_3D,0,q,me.width,me.height,me.depth,0,O,Y,me.data);else if(b.isFramebufferTexture){if(ge)if(F)t.texStorage2D(i.TEXTURE_2D,Ee,q,me.width,me.height);else{let fe=me.width,se=me.height;for(let ze=0;ze<Ee;ze++)t.texImage2D(i.TEXTURE_2D,ze,q,fe,se,0,O,Y,null),fe>>=1,se>>=1}}else if(Te.length>0){if(F&&ge){let fe=xe(Te[0]);t.texStorage2D(i.TEXTURE_2D,Ee,q,fe.width,fe.height)}for(let fe=0,se=Te.length;fe<se;fe++)re=Te[fe],F?he&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,O,Y,re):t.texImage2D(i.TEXTURE_2D,fe,q,O,Y,re);b.generateMipmaps=!1}else if(F){if(ge){let fe=xe(me);t.texStorage2D(i.TEXTURE_2D,Ee,q,fe.width,fe.height)}he&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,O,Y,me)}else t.texImage2D(i.TEXTURE_2D,0,q,O,Y,me);g(b)&&m($),Me.__version=ne.version,b.onUpdate&&b.onUpdate(b)}B.__version=b.version}function le(B,b,V){if(b.image.length!==6)return;let $=Ie(B,b),ie=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+V);let ne=n.get(ie);if(ie.version!==ne.__version||$===!0){t.activeTexture(i.TEXTURE0+V);let Me=St.getPrimaries(St.workingColorSpace),ve=b.colorSpace===bi?null:St.getPrimaries(b.colorSpace),Pe=b.colorSpace===bi||Me===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let Be=b.isCompressedTexture||b.image[0].isCompressedTexture,me=b.image[0]&&b.image[0].isDataTexture,O=[];for(let se=0;se<6;se++)!Be&&!me?O[se]=v(b.image[se],!0,r.maxCubemapSize):O[se]=me?b.image[se].image:b.image[se],O[se]=Le(b,O[se]);let Y=O[0],q=s.convert(b.format,b.colorSpace),re=s.convert(b.type),Te=_(b.internalFormat,q,re,b.colorSpace),F=b.isVideoTexture!==!0,ge=ne.__version===void 0||$===!0,he=ie.dataReady,Ee=S(b,Y);ce(i.TEXTURE_CUBE_MAP,b);let fe;if(Be){F&&ge&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,Te,Y.width,Y.height);for(let se=0;se<6;se++){fe=O[se].mipmaps;for(let ze=0;ze<fe.length;ze++){let Ze=fe[ze];b.format!==Mn?q!==null?F?he&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze,0,0,Ze.width,Ze.height,q,Ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze,Te,Ze.width,Ze.height,0,Ze.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze,0,0,Ze.width,Ze.height,q,re,Ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze,Te,Ze.width,Ze.height,0,q,re,Ze.data)}}}else{if(fe=b.mipmaps,F&&ge){fe.length>0&&Ee++;let se=xe(O[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,Te,se.width,se.height)}for(let se=0;se<6;se++)if(me){F?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,O[se].width,O[se].height,q,re,O[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Te,O[se].width,O[se].height,0,q,re,O[se].data);for(let ze=0;ze<fe.length;ze++){let Tt=fe[ze].image[se].image;F?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze+1,0,0,Tt.width,Tt.height,q,re,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze+1,Te,Tt.width,Tt.height,0,q,re,Tt.data)}}else{F?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,q,re,O[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Te,q,re,O[se]);for(let ze=0;ze<fe.length;ze++){let Ze=fe[ze];F?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze+1,0,0,q,re,Ze.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ze+1,Te,q,re,Ze.image[se])}}}g(b)&&m(i.TEXTURE_CUBE_MAP),ne.__version=ie.version,b.onUpdate&&b.onUpdate(b)}B.__version=b.version}function G(B,b,V,$,ie,ne){let Me=s.convert(V.format,V.colorSpace),ve=s.convert(V.type),Pe=_(V.internalFormat,Me,ve,V.colorSpace),Be=n.get(b),me=n.get(V);if(me.__renderTarget=b,!Be.__hasExternalTextures){let O=Math.max(1,b.width>>ne),Y=Math.max(1,b.height>>ne);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,ne,Pe,O,Y,b.depth,0,Me,ve,null):t.texImage2D(ie,ne,Pe,O,Y,0,Me,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,B),We(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,ie,me.__webglTexture,0,z(b)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,ie,me.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(B,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,B),b.depthBuffer){let $=b.depthTexture,ie=$&&$.isDepthTexture?$.type:null,ne=y(b.stencilBuffer,ie),Me=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;We(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,z(b),ne,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,z(b),ne,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ne,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,B)}else{let $=b.textures;for(let ie=0;ie<$.length;ie++){let ne=$[ie],Me=s.convert(ne.format,ne.colorSpace),ve=s.convert(ne.type),Pe=_(ne.internalFormat,Me,ve,ne.colorSpace);We(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,z(b),Pe,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,z(b),Pe,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Pe,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Q(B,b,V){let $=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,B),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ie=n.get(b.depthTexture);if(ie.__renderTarget=b,(!ie.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),$){if(ie.__webglInit===void 0&&(ie.__webglInit=!0,b.depthTexture.addEventListener("dispose",T)),ie.__webglTexture===void 0){ie.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),ce(i.TEXTURE_CUBE_MAP,b.depthTexture);let Be=s.convert(b.depthTexture.format),me=s.convert(b.depthTexture.type),O;b.depthTexture.format===hr?O=i.DEPTH_COMPONENT24:b.depthTexture.format===dr&&(O=i.DEPTH24_STENCIL8);for(let Y=0;Y<6;Y++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,O,b.width,b.height,0,Be,me,null)}}else N(b.depthTexture,0);let ne=ie.__webglTexture,Me=z(b),ve=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,Pe=b.depthTexture.format===dr?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===hr)We(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Pe,ve,ne,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,Pe,ve,ne,0);else if(b.depthTexture.format===dr)We(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Pe,ve,ne,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,Pe,ve,ne,0);else throw new Error("Unknown depthTexture format")}function de(B){let b=n.get(B),V=B.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==B.depthTexture){let $=B.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),$){let ie=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,$.removeEventListener("dispose",ie)};$.addEventListener("dispose",ie),b.__depthDisposeCallback=ie}b.__boundDepthTexture=$}if(B.depthTexture&&!b.__autoAllocateDepthBuffer)if(V)for(let $=0;$<6;$++)Q(b.__webglFramebuffer[$],B,$);else{let $=B.texture.mipmaps;$&&$.length>0?Q(b.__webglFramebuffer[0],B,0):Q(b.__webglFramebuffer,B,0)}else if(V){b.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[$]),b.__webglDepthbuffer[$]===void 0)b.__webglDepthbuffer[$]=i.createRenderbuffer(),ue(b.__webglDepthbuffer[$],B,!1);else{let ie=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=b.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,ne)}}else{let $=B.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ue(b.__webglDepthbuffer,B,!1);else{let ie=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Se(B,b,V){let $=n.get(B);b!==void 0&&G($.__webglFramebuffer,B,B.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&de(B)}function ae(B){let b=B.texture,V=n.get(B),$=n.get(b);B.addEventListener("dispose",E);let ie=B.textures,ne=B.isWebGLCubeRenderTarget===!0,Me=ie.length>1;if(Me||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=b.version,a.memory.textures++),ne){V.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[ve]=[];for(let Pe=0;Pe<b.mipmaps.length;Pe++)V.__webglFramebuffer[ve][Pe]=i.createFramebuffer()}else V.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let ve=0;ve<b.mipmaps.length;ve++)V.__webglFramebuffer[ve]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Me)for(let ve=0,Pe=ie.length;ve<Pe;ve++){let Be=n.get(ie[ve]);Be.__webglTexture===void 0&&(Be.__webglTexture=i.createTexture(),a.memory.textures++)}if(B.samples>0&&We(B)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ve=0;ve<ie.length;ve++){let Pe=ie[ve];V.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ve]);let Be=s.convert(Pe.format,Pe.colorSpace),me=s.convert(Pe.type),O=_(Pe.internalFormat,Be,me,Pe.colorSpace,B.isXRRenderTarget===!0),Y=z(B);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,O,B.width,B.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,V.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),B.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(V.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),ce(i.TEXTURE_CUBE_MAP,b);for(let ve=0;ve<6;ve++)if(b.mipmaps&&b.mipmaps.length>0)for(let Pe=0;Pe<b.mipmaps.length;Pe++)G(V.__webglFramebuffer[ve][Pe],B,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Pe);else G(V.__webglFramebuffer[ve],B,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);g(b)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ve=0,Pe=ie.length;ve<Pe;ve++){let Be=ie[ve],me=n.get(Be),O=i.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(O=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(O,me.__webglTexture),ce(O,Be),G(V.__webglFramebuffer,B,Be,i.COLOR_ATTACHMENT0+ve,O,0),g(Be)&&m(O)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(ve=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,$.__webglTexture),ce(ve,b),b.mipmaps&&b.mipmaps.length>0)for(let Pe=0;Pe<b.mipmaps.length;Pe++)G(V.__webglFramebuffer[Pe],B,b,i.COLOR_ATTACHMENT0,ve,Pe);else G(V.__webglFramebuffer,B,b,i.COLOR_ATTACHMENT0,ve,0);g(b)&&m(ve),t.unbindTexture()}B.depthBuffer&&de(B)}function _e(B){let b=B.textures;for(let V=0,$=b.length;V<$;V++){let ie=b[V];if(g(ie)){let ne=x(B),Me=n.get(ie).__webglTexture;t.bindTexture(ne,Me),m(ne),t.unbindTexture()}}}let ye=[],Ae=[];function W(B){if(B.samples>0){if(We(B)===!1){let b=B.textures,V=B.width,$=B.height,ie=i.COLOR_BUFFER_BIT,ne=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(B),ve=b.length>1;if(ve)for(let Be=0;Be<b.length;Be++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);let Pe=B.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Be=0;Be<b.length;Be++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Be]);let me=n.get(b[Be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,me,0)}i.blitFramebuffer(0,0,V,$,0,0,V,$,ie,i.NEAREST),l===!0&&(ye.length=0,Ae.length=0,ye.push(i.COLOR_ATTACHMENT0+Be),B.depthBuffer&&B.resolveDepthBuffer===!1&&(ye.push(ne),Ae.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ye))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let Be=0;Be<b.length;Be++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Be,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Be]);let me=n.get(b[Be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Be,i.TEXTURE_2D,me,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.resolveDepthBuffer===!1&&l){let b=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function z(B){return Math.min(r.maxSamples,B.samples)}function We(B){let b=n.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ke(B){let b=a.render.frame;u.get(B)!==b&&(u.set(B,b),B.update())}function Le(B,b){let V=B.colorSpace,$=B.format,ie=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||V!==Ni&&V!==bi&&(St.getTransfer(V)===Ut?($!==Mn||ie!==xt)&&$e("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",V)),b}function xe(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(c.width=B.naturalWidth||B.width,c.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(c.width=B.displayWidth,c.height=B.displayHeight):(c.width=B.width,c.height=B.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=w,this.setTexture2D=N,this.setTexture2DArray=H,this.setTexture3D=k,this.setTextureCube=te,this.rebindTextures=Se,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=_e,this.updateMultisampleRenderTarget=W,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=G,this.useMultisampledRTT=We,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function x2(i,e){function t(n,r=bi){let s,a=St.getTransfer(r);if(n===xt)return i.UNSIGNED_BYTE;if(n===Nf)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Of)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_g)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yg)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===cl)return i.BYTE;if(n===su)return i.SHORT;if(n===$s)return i.UNSIGNED_SHORT;if(n===ea)return i.INT;if(n===Sn)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===hi)return i.HALF_FLOAT;if(n===Ag)return i.ALPHA;if(n===Sg)return i.RGB;if(n===Mn)return i.RGBA;if(n===hr)return i.DEPTH_COMPONENT;if(n===dr)return i.DEPTH_STENCIL;if(n===ta)return i.RED;if(n===ul)return i.RED_INTEGER;if(n===xs)return i.RG;if(n===na)return i.RG_INTEGER;if(n===ia)return i.RGBA_INTEGER;if(n===au||n===ou||n===lu||n===cu)if(a===Ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===au)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ou)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===lu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===cu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===au)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ou)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===lu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===cu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zf||n===kf||n===Hf||n===Gf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===zf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vf||n===Wf||n===Xf||n===Yf||n===qf||n===Qf||n===Zf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Vf||n===Wf)return a===Ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Xf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Yf)return s.COMPRESSED_R11_EAC;if(n===qf)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Qf)return s.COMPRESSED_RG11_EAC;if(n===Zf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Kf||n===Jf||n===jf||n===$f||n===ed||n===td||n===nd||n===id||n===rd||n===sd||n===ad||n===od||n===ld||n===cd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Kf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Jf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$f)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ed)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===td)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nd)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===id)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===rd)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sd)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ad)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===od)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ld)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cd)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ud||n===hd||n===fd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ud)return a===Ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dd||n===pd||n===md||n===gd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===dd)return s.COMPRESSED_RED_RGTC1_EXT;if(n===pd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===md)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var _2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y2=`
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

}`,Vg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Zc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new rt({vertexShader:_2,fragmentShader:y2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wg=class extends Ti{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null,v=typeof XRWebGLBinding<"u",g=new Vg,m={},x=t.getContextAttributes(),_=null,y=null,S=[],T=[],E=new Ce,A=null,M=new An;M.viewport=new At;let C=new An;C.viewport=new At;let R=[M,C],w=new Bf,P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let le=S[Z];return le===void 0&&(le=new il,S[Z]=le),le.getTargetRaySpace()},this.getControllerGrip=function(Z){let le=S[Z];return le===void 0&&(le=new il,S[Z]=le),le.getGripSpace()},this.getHand=function(Z){let le=S[Z];return le===void 0&&(le=new il,S[Z]=le),le.getHandSpace()};function N(Z){let le=T.indexOf(Z.inputSource);if(le===-1)return;let G=S[le];G!==void 0&&(G.update(Z.inputSource,Z.frame,c||a),G.dispatchEvent({type:Z.type,data:Z.inputSource}))}function H(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",k);for(let Z=0;Z<S.length;Z++){let le=T[Z];le!==null&&(T[Z]=null,S[Z].disconnect(le))}P=null,U=null,g.reset();for(let Z in m)delete m[Z];e.setRenderTarget(_),d=null,h=null,f=null,r=null,y=null,be.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&$e("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&$e("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",H),r.addEventListener("inputsourceschange",k),x.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,ue=null,Q=null;x.depth&&(Q=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=x.stencil?dr:hr,ue=x.stencil?Vr:Sn);let de={colorFormat:t.RGBA8,depthFormat:Q,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(de),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new vt(h.textureWidth,h.textureHeight,{format:Mn,type:xt,depthTexture:new zi(h.textureWidth,h.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let G={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,G),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vt(d.framebufferWidth,d.framebufferHeight,{format:Mn,type:xt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),be.setContext(r),be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function k(Z){for(let le=0;le<Z.removed.length;le++){let G=Z.removed[le],ue=T.indexOf(G);ue>=0&&(T[ue]=null,S[ue].disconnect(G))}for(let le=0;le<Z.added.length;le++){let G=Z.added[le],ue=T.indexOf(G);if(ue===-1){for(let de=0;de<S.length;de++)if(de>=T.length){T.push(G),ue=de;break}else if(T[de]===null){T[de]=G,ue=de;break}if(ue===-1)break}let Q=S[ue];Q&&Q.connect(G)}}let te=new I,K=new I;function L(Z,le,G){te.setFromMatrixPosition(le.matrixWorld),K.setFromMatrixPosition(G.matrixWorld);let ue=te.distanceTo(K),Q=le.projectionMatrix.elements,de=G.projectionMatrix.elements,Se=Q[14]/(Q[10]-1),ae=Q[14]/(Q[10]+1),_e=(Q[9]+1)/Q[5],ye=(Q[9]-1)/Q[5],Ae=(Q[8]-1)/Q[0],W=(de[8]+1)/de[0],z=Se*Ae,We=Se*W,ke=ue/(-Ae+W),Le=ke*-Ae;if(le.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Le),Z.translateZ(ke),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Q[10]===-1)Z.projectionMatrix.copy(le.projectionMatrix),Z.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{let xe=Se+ke,B=ae+ke,b=z-Le,V=We+(ue-Le),$=_e*ae/B*xe,ie=ye*ae/B*xe;Z.projectionMatrix.makePerspective(b,V,$,ie,xe,B),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function oe(Z,le){le===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(le.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let le=Z.near,G=Z.far;g.texture!==null&&(g.depthNear>0&&(le=g.depthNear),g.depthFar>0&&(G=g.depthFar)),w.near=C.near=M.near=le,w.far=C.far=M.far=G,(P!==w.near||U!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),P=w.near,U=w.far),w.layers.mask=Z.layers.mask|6,M.layers.mask=w.layers.mask&-5,C.layers.mask=w.layers.mask&-3;let ue=Z.parent,Q=w.cameras;oe(w,ue);for(let de=0;de<Q.length;de++)oe(Q[de],ue);Q.length===2?L(w,M,C):w.projectionMatrix.copy(M.projectionMatrix),ce(Z,w,ue)};function ce(Z,le,G){G===null?Z.matrix.copy(le.matrixWorld):(Z.matrix.copy(G.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(le.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(le.projectionMatrix),Z.projectionMatrixInverse.copy(le.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=tl*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(w)},this.getCameraTexture=function(Z){return m[Z]};let Ie=null;function pe(Z,le){if(u=le.getViewerPose(c||a),p=le,u!==null){let G=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let ue=!1;G.length!==w.cameras.length&&(w.cameras.length=0,ue=!0);for(let ae=0;ae<G.length;ae++){let _e=G[ae],ye=null;if(d!==null)ye=d.getViewport(_e);else{let W=f.getViewSubImage(h,_e);ye=W.viewport,ae===0&&(e.setRenderTargetTextures(y,W.colorTexture,W.depthStencilTexture),e.setRenderTarget(y))}let Ae=R[ae];Ae===void 0&&(Ae=new An,Ae.layers.enable(ae),Ae.viewport=new At,R[ae]=Ae),Ae.matrix.fromArray(_e.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(_e.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(ye.x,ye.y,ye.width,ye.height),ae===0&&(w.matrix.copy(Ae.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),ue===!0&&w.cameras.push(Ae)}let Q=r.enabledFeatures;if(Q&&Q.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let ae=f.getDepthInformation(G[0]);ae&&ae.isValid&&ae.texture&&g.init(ae,r.renderState)}if(Q&&Q.includes("camera-access")&&v){e.state.unbindTexture(),f=n.getBinding();for(let ae=0;ae<G.length;ae++){let _e=G[ae].camera;if(_e){let ye=m[_e];ye||(ye=new Zc,m[_e]=ye);let Ae=f.getCameraImage(_e);ye.sourceTexture=Ae}}}}for(let G=0;G<S.length;G++){let ue=T[G],Q=S[G];ue!==null&&Q!==void 0&&Q.update(ue,le,c||a)}Ie&&Ie(Z,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),p=null}let be=new Dy;be.setAnimationLoop(pe),this.setAnimationLoop=function(Z){Ie=Z},this.dispose=function(){}}},Ja=new wr,A2=new Je;function S2(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,wg(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,x,_,y){m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),f(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),h(g,m),m.isMeshPhysicalMaterial&&d(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,x,_):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===tn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===tn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let x=e.get(m),_=x.envMap,y=x.envMapRotation;_&&(g.envMap.value=_,Ja.copy(y),Ja.x*=-1,Ja.y*=-1,Ja.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ja.y*=-1,Ja.z*=-1),g.envMapRotation.value.setFromMatrix4(A2.makeRotationFromEuler(Ja)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,_){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=_*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===tn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){let x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function M2(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){let y=_.program;n.uniformBlockBinding(x,y)}function c(x,_){let y=r[x.id];y===void 0&&(p(x),y=u(x),r[x.id]=y,x.addEventListener("dispose",g));let S=_.program;n.updateUBOMapping(x,S);let T=e.render.frame;s[x.id]!==T&&(h(x),s[x.id]=T)}function u(x){let _=f();x.__bindingPointIndex=_;let y=i.createBuffer(),S=x.__size,T=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,S,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,y),y}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){let _=r[x.id],y=x.uniforms,S=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let T=0,E=y.length;T<E;T++){let A=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,C=A.length;M<C;M++){let R=A[M];if(d(R,T,M,S)===!0){let w=R.__offset,P=Array.isArray(R.value)?R.value:[R.value],U=0;for(let N=0;N<P.length;N++){let H=P[N],k=v(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,w+U,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):(H.toArray(R.__data,U),U+=k.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,w,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,_,y,S){let T=x.value,E=_+"_"+y;if(S[E]===void 0)return typeof T=="number"||typeof T=="boolean"?S[E]=T:S[E]=T.clone(),!0;{let A=S[E];if(typeof T=="number"||typeof T=="boolean"){if(A!==T)return S[E]=T,!0}else if(A.equals(T)===!1)return A.copy(T),!0}return!1}function p(x){let _=x.uniforms,y=0,S=16;for(let E=0,A=_.length;E<A;E++){let M=Array.isArray(_[E])?_[E]:[_[E]];for(let C=0,R=M.length;C<R;C++){let w=M[C],P=Array.isArray(w.value)?w.value:[w.value];for(let U=0,N=P.length;U<N;U++){let H=P[U],k=v(H),te=y%S,K=te%k.boundary,L=te+K;y+=K,L!==0&&S-L<k.storage&&(y+=S-L),w.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=y,y+=k.storage}}}let T=y%S;return T>0&&(y+=S-T),x.__size=y,x.__cache={},this}function v(x){let _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?$e("WebGLRenderer: Texture samplers can not be part of an uniforms group."):$e("WebGLRenderer: Unsupported uniform value type.",x),_}function g(x){let _=x.target;_.removeEventListener("dispose",g);let y=a.indexOf(_.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function m(){for(let x in r)i.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var T2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Xr=null;function E2(){return Xr===null&&(Xr=new fr(T2,16,16,xs,hi),Xr.name="DFG_LUT",Xr.minFilter=Vt,Xr.magFilter=Vt,Xr.wrapS=kr,Xr.wrapT=kr,Xr.generateMipmaps=!1,Xr.needsUpdate=!0),Xr}var Ad=class{constructor(e={}){let{canvas:t=ey(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=xt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let v=d,g=new Set([ia,na,ul]),m=new Set([xt,Sn,$s,Vr,Nf,Of]),x=new Uint32Array(4),_=new Int32Array(4),y=null,S=null,T=[],E=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,C=!1;this._outputColorSpace=it;let R=0,w=0,P=null,U=-1,N=null,H=new At,k=new At,te=null,K=new qe(0),L=0,oe=t.width,ce=t.height,Ie=1,pe=null,be=null,Z=new At(0,0,oe,ce),le=new At(0,0,oe,ce),G=!1,ue=new Yc,Q=!1,de=!1,Se=new Je,ae=new I,_e=new At,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function W(){return P===null?Ie:1}let z=n;function We(D,X){return t.getContext(D,X)}try{let D={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Qn}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",Tt,!1),z===null){let X="webgl2";if(z=We(X,D),z===null)throw We(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw je("WebGLRenderer: "+D.message),D}let ke,Le,xe,B,b,V,$,ie,ne,Me,ve,Pe,Be,me,O,Y,q,re,Te,F,ge,he,Ee;function fe(){ke=new Bb(z),ke.init(),ge=new x2(z,ke),Le=new Eb(z,ke,e,ge),xe=new g2(z,ke),Le.reversedDepthBuffer&&h&&xe.buffers.depth.setReversed(!0),B=new Fb(z),b=new n2,V=new v2(z,ke,xe,b,Le,ge,B),$=new Ib(M),ie=new HT(z),he=new Mb(z,ie),ne=new Ub(z,ie,B,he),Me=new Ob(z,ne,ie,he,B),re=new Nb(z,Le,V),O=new wb(b),ve=new t2(M,$,ke,Le,he,O),Pe=new S2(M,b),Be=new r2,me=new u2(ke),q=new Sb(M,$,xe,Me,p,l),Y=new m2(M,Me,Le),Ee=new M2(z,B,Le,xe),Te=new Tb(z,ke,B),F=new Lb(z,ke,B),B.programs=ve.programs,M.capabilities=Le,M.extensions=ke,M.properties=b,M.renderLists=Be,M.shadowMap=Y,M.state=xe,M.info=B}fe(),v!==xt&&(A=new kb(v,t.width,t.height,r,s));let se=new Wg(M,z);this.xr=se,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let D=ke.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=ke.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(D){D!==void 0&&(Ie=D,this.setSize(oe,ce,!1))},this.getSize=function(D){return D.set(oe,ce)},this.setSize=function(D,X,ee=!0){if(se.isPresenting){$e("WebGLRenderer: Can't change size while VR device is presenting.");return}oe=D,ce=X,t.width=Math.floor(D*Ie),t.height=Math.floor(X*Ie),ee===!0&&(t.style.width=D+"px",t.style.height=X+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,D,X)},this.getDrawingBufferSize=function(D){return D.set(oe*Ie,ce*Ie).floor()},this.setDrawingBufferSize=function(D,X,ee){oe=D,ce=X,Ie=ee,t.width=Math.floor(D*ee),t.height=Math.floor(X*ee),this.setViewport(0,0,D,X)},this.setEffects=function(D){if(v===xt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let X=0;X<D.length;X++)if(D[X].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(H)},this.getViewport=function(D){return D.copy(Z)},this.setViewport=function(D,X,ee,j){D.isVector4?Z.set(D.x,D.y,D.z,D.w):Z.set(D,X,ee,j),xe.viewport(H.copy(Z).multiplyScalar(Ie).round())},this.getScissor=function(D){return D.copy(le)},this.setScissor=function(D,X,ee,j){D.isVector4?le.set(D.x,D.y,D.z,D.w):le.set(D,X,ee,j),xe.scissor(k.copy(le).multiplyScalar(Ie).round())},this.getScissorTest=function(){return G},this.setScissorTest=function(D){xe.setScissorTest(G=D)},this.setOpaqueSort=function(D){pe=D},this.setTransparentSort=function(D){be=D},this.getClearColor=function(D){return D.copy(q.getClearColor())},this.setClearColor=function(){q.setClearColor(...arguments)},this.getClearAlpha=function(){return q.getClearAlpha()},this.setClearAlpha=function(){q.setClearAlpha(...arguments)},this.clear=function(D=!0,X=!0,ee=!0){let j=0;if(D){let J=!1;if(P!==null){let Re=P.texture.format;J=g.has(Re)}if(J){let Re=P.texture.type,Ue=m.has(Re),De=q.getClearColor(),Ge=q.getClearAlpha(),He=De.r,lt=De.g,dt=De.b;Ue?(x[0]=He,x[1]=lt,x[2]=dt,x[3]=Ge,z.clearBufferuiv(z.COLOR,0,x)):(_[0]=He,_[1]=lt,_[2]=dt,_[3]=Ge,z.clearBufferiv(z.COLOR,0,_))}else j|=z.COLOR_BUFFER_BIT}X&&(j|=z.DEPTH_BUFFER_BIT),ee&&(j|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&z.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",Tt,!1),q.dispose(),Be.dispose(),me.dispose(),b.dispose(),$.dispose(),Me.dispose(),he.dispose(),Ee.dispose(),ve.dispose(),se.dispose(),se.removeEventListener("sessionstart",nt),se.removeEventListener("sessionend",pn),at.stop()};function ze(D){D.preventDefault(),Nc("WebGLRenderer: Context Lost."),C=!0}function Ze(){Nc("WebGLRenderer: Context Restored."),C=!1;let D=B.autoReset,X=Y.enabled,ee=Y.autoUpdate,j=Y.needsUpdate,J=Y.type;fe(),B.autoReset=D,Y.enabled=X,Y.autoUpdate=ee,Y.needsUpdate=j,Y.type=J}function Tt(D){je("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Oe(D){let X=D.target;X.removeEventListener("dispose",Oe),Xe(X)}function Xe(D){ct(D),b.remove(D)}function ct(D){let X=b.get(D).programs;X!==void 0&&(X.forEach(function(ee){ve.releaseProgram(ee)}),D.isShaderMaterial&&ve.releaseShaderCache(D))}this.renderBufferDirect=function(D,X,ee,j,J,Re){X===null&&(X=ye);let Ue=J.isMesh&&J.matrixWorld.determinant()<0,De=ir(D,X,ee,j,J);xe.setMaterial(j,Ue);let Ge=ee.index,He=1;if(j.wireframe===!0){if(Ge=ne.getWireframeAttribute(ee),Ge===void 0)return;He=2}let lt=ee.drawRange,dt=ee.attributes.position,Qe=lt.start*He,Ht=(lt.start+lt.count)*He;Re!==null&&(Qe=Math.max(Qe,Re.start*He),Ht=Math.min(Ht,(Re.start+Re.count)*He)),Ge!==null?(Qe=Math.max(Qe,0),Ht=Math.min(Ht,Ge.count)):dt!=null&&(Qe=Math.max(Qe,0),Ht=Math.min(Ht,dt.count));let mn=Ht-Qe;if(mn<0||mn===1/0)return;he.setup(J,j,De,ee,Ge);let ln,Gt=Te;if(Ge!==null&&(ln=ie.get(Ge),Gt=F,Gt.setIndex(ln)),J.isMesh)j.wireframe===!0?(xe.setLineWidth(j.wireframeLinewidth*W()),Gt.setMode(z.LINES)):Gt.setMode(z.TRIANGLES);else if(J.isLine){let $n=j.linewidth;$n===void 0&&($n=1),xe.setLineWidth($n*W()),J.isLineSegments?Gt.setMode(z.LINES):J.isLineLoop?Gt.setMode(z.LINE_LOOP):Gt.setMode(z.LINE_STRIP)}else J.isPoints?Gt.setMode(z.POINTS):J.isSprite&&Gt.setMode(z.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)Oc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Gt.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))Gt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let $n=J._multiDrawStarts,Ye=J._multiDrawCounts,Hi=J._multiDrawCount,Et=Ge?ie.get(Ge).bytesPerElement:1,vr=b.get(j).currentProgram.getUniforms();for(let Ir=0;Ir<Hi;Ir++)vr.setValue(z,"_gl_DrawID",Ir),Gt.render($n[Ir]/Et,Ye[Ir])}else if(J.isInstancedMesh)Gt.renderInstances(Qe,mn,J.count);else if(ee.isInstancedBufferGeometry){let $n=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Ye=Math.min(ee.instanceCount,$n);Gt.renderInstances(Qe,mn,Ye)}else Gt.render(Qe,mn)};function Fe(D,X,ee){D.transparent===!0&&D.side===vn&&D.forceSinglePass===!1?(D.side=tn,D.needsUpdate=!0,Jn(D,X,ee),D.side=ci,D.needsUpdate=!0,Jn(D,X,ee),D.side=vn):Jn(D,X,ee)}this.compile=function(D,X,ee=null){ee===null&&(ee=D),S=me.get(ee),S.init(X),E.push(S),ee.traverseVisible(function(J){J.isLight&&J.layers.test(X.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),D!==ee&&D.traverseVisible(function(J){J.isLight&&J.layers.test(X.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights();let j=new Set;return D.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let Re=J.material;if(Re)if(Array.isArray(Re))for(let Ue=0;Ue<Re.length;Ue++){let De=Re[Ue];Fe(De,ee,J),j.add(De)}else Fe(Re,ee,J),j.add(Re)}),S=E.pop(),j},this.compileAsync=function(D,X,ee=null){let j=this.compile(D,X,ee);return new Promise(J=>{function Re(){if(j.forEach(function(Ue){b.get(Ue).currentProgram.isReady()&&j.delete(Ue)}),j.size===0){J(D);return}setTimeout(Re,10)}ke.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let tt=null;function Ke(D){tt&&tt(D)}function nt(){at.stop()}function pn(){at.start()}let at=new Dy;at.setAnimationLoop(Ke),typeof self<"u"&&at.setContext(self),this.setAnimationLoop=function(D){tt=D,se.setAnimationLoop(D),D===null?at.stop():at.start()},se.addEventListener("sessionstart",nt),se.addEventListener("sessionend",pn),this.render=function(D,X){if(X!==void 0&&X.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;let ee=se.enabled===!0&&se.isPresenting===!0,j=A!==null&&(P===null||ee)&&A.begin(M,P);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(X),X=se.getCamera()),D.isScene===!0&&D.onBeforeRender(M,D,X,P),S=me.get(D,E.length),S.init(X),E.push(S),Se.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),ue.setFromProjectionMatrix(Se,Er,X.reversedDepth),de=this.localClippingEnabled,Q=O.init(this.clippingPlanes,de),y=Be.get(D,T.length),y.init(),T.push(y),se.enabled===!0&&se.isPresenting===!0){let Ue=M.xr.getDepthSensingMesh();Ue!==null&&Jt(Ue,X,-1/0,M.sortObjects)}Jt(D,X,0,M.sortObjects),y.finish(),M.sortObjects===!0&&y.sort(pe,be),Ae=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ae&&q.addToRenderList(y,D),this.info.render.frame++,Q===!0&&O.beginShadows();let J=S.state.shadowsArray;if(Y.render(J,D,X),Q===!0&&O.endShadows(),this.info.autoReset===!0&&this.info.reset(),(j&&A.hasRenderPass())===!1){let Ue=y.opaque,De=y.transmissive;if(S.setupLights(),X.isArrayCamera){let Ge=X.cameras;if(De.length>0)for(let He=0,lt=Ge.length;He<lt;He++){let dt=Ge[He];jt(Ue,De,D,dt)}Ae&&q.render(D);for(let He=0,lt=Ge.length;He<lt;He++){let dt=Ge[He];En(y,D,dt,dt.viewport)}}else De.length>0&&jt(Ue,De,D,X),Ae&&q.render(D),En(y,D,X)}P!==null&&w===0&&(V.updateMultisampleRenderTarget(P),V.updateRenderTargetMipmap(P)),j&&A.end(M),D.isScene===!0&&D.onAfterRender(M,D,X),he.resetDefaultState(),U=-1,N=null,E.pop(),E.length>0?(S=E[E.length-1],Q===!0&&O.setGlobalState(M.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function Jt(D,X,ee,j){if(D.visible===!1)return;if(D.layers.test(X.layers)){if(D.isGroup)ee=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(X);else if(D.isLight)S.pushLight(D),D.castShadow&&S.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||ue.intersectsSprite(D)){j&&_e.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Se);let Ue=Me.update(D),De=D.material;De.visible&&y.push(D,Ue,De,ee,_e.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||ue.intersectsObject(D))){let Ue=Me.update(D),De=D.material;if(j&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),_e.copy(D.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),_e.copy(Ue.boundingSphere.center)),_e.applyMatrix4(D.matrixWorld).applyMatrix4(Se)),Array.isArray(De)){let Ge=Ue.groups;for(let He=0,lt=Ge.length;He<lt;He++){let dt=Ge[He],Qe=De[dt.materialIndex];Qe&&Qe.visible&&y.push(D,Ue,Qe,ee,_e.z,dt)}}else De.visible&&y.push(D,Ue,De,ee,_e.z,null)}}let Re=D.children;for(let Ue=0,De=Re.length;Ue<De;Ue++)Jt(Re[Ue],X,ee,j)}function En(D,X,ee,j){let{opaque:J,transmissive:Re,transparent:Ue}=D;S.setupLightsView(ee),Q===!0&&O.setGlobalState(M.clippingPlanes,ee),j&&xe.viewport(H.copy(j)),J.length>0&&Ot(J,X,ee),Re.length>0&&Ot(Re,X,ee),Ue.length>0&&Ot(Ue,X,ee),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function jt(D,X,ee,j){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[j.id]===void 0){let Qe=ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[j.id]=new vt(1,1,{generateMipmaps:!0,type:Qe?hi:xt,minFilter:Gr,samples:Math.max(4,Le.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:St.workingColorSpace})}let Re=S.state.transmissionRenderTarget[j.id],Ue=j.viewport||H;Re.setSize(Ue.z*M.transmissionResolutionScale,Ue.w*M.transmissionResolutionScale);let De=M.getRenderTarget(),Ge=M.getActiveCubeFace(),He=M.getActiveMipmapLevel();M.setRenderTarget(Re),M.getClearColor(K),L=M.getClearAlpha(),L<1&&M.setClearColor(16777215,.5),M.clear(),Ae&&q.render(ee);let lt=M.toneMapping;M.toneMapping=$i;let dt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),S.setupLightsView(j),Q===!0&&O.setGlobalState(M.clippingPlanes,j),Ot(D,ee,j),V.updateMultisampleRenderTarget(Re),V.updateRenderTargetMipmap(Re),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Ht=0,mn=X.length;Ht<mn;Ht++){let ln=X[Ht],{object:Gt,geometry:$n,material:Ye,group:Hi}=ln;if(Ye.side===vn&&Gt.layers.test(j.layers)){let Et=Ye.side;Ye.side=tn,Ye.needsUpdate=!0,It(Gt,ee,j,$n,Ye,Hi),Ye.side=Et,Ye.needsUpdate=!0,Qe=!0}}Qe===!0&&(V.updateMultisampleRenderTarget(Re),V.updateRenderTargetMipmap(Re))}M.setRenderTarget(De,Ge,He),M.setClearColor(K,L),dt!==void 0&&(j.viewport=dt),M.toneMapping=lt}function Ot(D,X,ee){let j=X.isScene===!0?X.overrideMaterial:null;for(let J=0,Re=D.length;J<Re;J++){let Ue=D[J],{object:De,geometry:Ge,group:He}=Ue,lt=Ue.material;lt.allowOverride===!0&&j!==null&&(lt=j),De.layers.test(ee.layers)&&It(De,X,ee,Ge,lt,He)}}function It(D,X,ee,j,J,Re){D.onBeforeRender(M,X,ee,j,J,Re),D.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),J.onBeforeRender(M,X,ee,j,D,Re),J.transparent===!0&&J.side===vn&&J.forceSinglePass===!1?(J.side=tn,J.needsUpdate=!0,M.renderBufferDirect(ee,X,j,J,D,Re),J.side=ci,J.needsUpdate=!0,M.renderBufferDirect(ee,X,j,J,D,Re),J.side=vn):M.renderBufferDirect(ee,X,j,J,D,Re),D.onAfterRender(M,X,ee,j,J,Re)}function Jn(D,X,ee){X.isScene!==!0&&(X=ye);let j=b.get(D),J=S.state.lights,Re=S.state.shadowsArray,Ue=J.state.version,De=ve.getParameters(D,J.state,Re,X,ee),Ge=ve.getProgramCacheKey(De),He=j.programs;j.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?X.environment:null,j.fog=X.fog;let lt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;j.envMap=$.get(D.envMap||j.environment,lt),j.envMapRotation=j.environment!==null&&D.envMap===null?X.environmentRotation:D.envMapRotation,He===void 0&&(D.addEventListener("dispose",Oe),He=new Map,j.programs=He);let dt=He.get(Ge);if(dt!==void 0){if(j.currentProgram===dt&&j.lightsStateVersion===Ue)return jn(D,De),dt}else De.uniforms=ve.getUniforms(D),D.onBeforeCompile(De,M),dt=ve.acquireProgram(De,Ge),He.set(Ge,dt),j.uniforms=De.uniforms;let Qe=j.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Qe.clippingPlanes=O.uniform),jn(D,De),j.needsLights=bn(D),j.lightsStateVersion=Ue,j.needsLights&&(Qe.ambientLightColor.value=J.state.ambient,Qe.lightProbe.value=J.state.probe,Qe.directionalLights.value=J.state.directional,Qe.directionalLightShadows.value=J.state.directionalShadow,Qe.spotLights.value=J.state.spot,Qe.spotLightShadows.value=J.state.spotShadow,Qe.rectAreaLights.value=J.state.rectArea,Qe.ltc_1.value=J.state.rectAreaLTC1,Qe.ltc_2.value=J.state.rectAreaLTC2,Qe.pointLights.value=J.state.point,Qe.pointLightShadows.value=J.state.pointShadow,Qe.hemisphereLights.value=J.state.hemi,Qe.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Qe.spotLightMatrix.value=J.state.spotLightMatrix,Qe.spotLightMap.value=J.state.spotLightMap,Qe.pointShadowMatrix.value=J.state.pointShadowMatrix),j.currentProgram=dt,j.uniformsList=null,dt}function Zt(D){if(D.uniformsList===null){let X=D.currentProgram.getUniforms();D.uniformsList=fl.seqWithValue(X.seq,D.uniforms)}return D.uniformsList}function jn(D,X){let ee=b.get(D);ee.outputColorSpace=X.outputColorSpace,ee.batching=X.batching,ee.batchingColor=X.batchingColor,ee.instancing=X.instancing,ee.instancingColor=X.instancingColor,ee.instancingMorph=X.instancingMorph,ee.skinning=X.skinning,ee.morphTargets=X.morphTargets,ee.morphNormals=X.morphNormals,ee.morphColors=X.morphColors,ee.morphTargetsCount=X.morphTargetsCount,ee.numClippingPlanes=X.numClippingPlanes,ee.numIntersection=X.numClipIntersection,ee.vertexAlphas=X.vertexAlphas,ee.vertexTangents=X.vertexTangents,ee.toneMapping=X.toneMapping}function ir(D,X,ee,j,J){X.isScene!==!0&&(X=ye),V.resetTextureUnits();let Re=X.fog,Ue=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?X.environment:null,De=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ni,Ge=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,He=$.get(j.envMap||Ue,Ge),lt=j.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,dt=!!ee.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Qe=!!ee.morphAttributes.position,Ht=!!ee.morphAttributes.normal,mn=!!ee.morphAttributes.color,ln=$i;j.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ln=M.toneMapping);let Gt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,$n=Gt!==void 0?Gt.length:0,Ye=b.get(j),Hi=S.state.lights;if(Q===!0&&(de===!0||D!==N)){let Ln=D===N&&j.id===U;O.setState(j,D,Ln)}let Et=!1;j.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==Hi.state.version||Ye.outputColorSpace!==De||J.isBatchedMesh&&Ye.batching===!1||!J.isBatchedMesh&&Ye.batching===!0||J.isBatchedMesh&&Ye.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Ye.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Ye.instancing===!1||!J.isInstancedMesh&&Ye.instancing===!0||J.isSkinnedMesh&&Ye.skinning===!1||!J.isSkinnedMesh&&Ye.skinning===!0||J.isInstancedMesh&&Ye.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Ye.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Ye.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Ye.instancingMorph===!1&&J.morphTexture!==null||Ye.envMap!==He||j.fog===!0&&Ye.fog!==Re||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==O.numPlanes||Ye.numIntersection!==O.numIntersection)||Ye.vertexAlphas!==lt||Ye.vertexTangents!==dt||Ye.morphTargets!==Qe||Ye.morphNormals!==Ht||Ye.morphColors!==mn||Ye.toneMapping!==ln||Ye.morphTargetsCount!==$n)&&(Et=!0):(Et=!0,Ye.__version=j.version);let vr=Ye.currentProgram;Et===!0&&(vr=Jn(j,X,J));let Ir=!1,va=!1,oo=!1,Wt=vr.getUniforms(),Gn=Ye.uniforms;if(xe.useProgram(vr.program)&&(Ir=!0,va=!0,oo=!0),j.id!==U&&(U=j.id,va=!0),Ir||N!==D){xe.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Wt.setValue(z,"projectionMatrix",D.projectionMatrix),Wt.setValue(z,"viewMatrix",D.matrixWorldInverse);let Cs=Wt.map.cameraPosition;Cs!==void 0&&Cs.setValue(z,ae.setFromMatrixPosition(D.matrixWorld)),Le.logarithmicDepthBuffer&&Wt.setValue(z,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Wt.setValue(z,"isOrthographic",D.isOrthographicCamera===!0),N!==D&&(N=D,va=!0,oo=!0)}if(Ye.needsLights&&(Hi.state.directionalShadowMap.length>0&&Wt.setValue(z,"directionalShadowMap",Hi.state.directionalShadowMap,V),Hi.state.spotShadowMap.length>0&&Wt.setValue(z,"spotShadowMap",Hi.state.spotShadowMap,V),Hi.state.pointShadowMap.length>0&&Wt.setValue(z,"pointShadowMap",Hi.state.pointShadowMap,V)),J.isSkinnedMesh){Wt.setOptional(z,J,"bindMatrix"),Wt.setOptional(z,J,"bindMatrixInverse");let Ln=J.skeleton;Ln&&(Ln.boneTexture===null&&Ln.computeBoneTexture(),Wt.setValue(z,"boneTexture",Ln.boneTexture,V))}J.isBatchedMesh&&(Wt.setOptional(z,J,"batchingTexture"),Wt.setValue(z,"batchingTexture",J._matricesTexture,V),Wt.setOptional(z,J,"batchingIdTexture"),Wt.setValue(z,"batchingIdTexture",J._indirectTexture,V),Wt.setOptional(z,J,"batchingColorTexture"),J._colorsTexture!==null&&Wt.setValue(z,"batchingColorTexture",J._colorsTexture,V));let bs=ee.morphAttributes;if((bs.position!==void 0||bs.normal!==void 0||bs.color!==void 0)&&re.update(J,ee,vr),(va||Ye.receiveShadow!==J.receiveShadow)&&(Ye.receiveShadow=J.receiveShadow,Wt.setValue(z,"receiveShadow",J.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&X.environment!==null&&(Gn.envMapIntensity.value=X.environmentIntensity),Gn.dfgLUT!==void 0&&(Gn.dfgLUT.value=E2()),va&&(Wt.setValue(z,"toneMappingExposure",M.toneMappingExposure),Ye.needsLights&&wn(Gn,oo),Re&&j.fog===!0&&Pe.refreshFogUniforms(Gn,Re),Pe.refreshMaterialUniforms(Gn,j,Ie,ce,S.state.transmissionRenderTarget[D.id]),fl.upload(z,Zt(Ye),Gn,V)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(fl.upload(z,Zt(Ye),Gn,V),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Wt.setValue(z,"center",J.center),Wt.setValue(z,"modelViewMatrix",J.modelViewMatrix),Wt.setValue(z,"normalMatrix",J.normalMatrix),Wt.setValue(z,"modelMatrix",J.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let Ln=j.uniformsGroups;for(let Cs=0,lo=Ln.length;Cs<lo;Cs++){let Y0=Ln[Cs];Ee.update(Y0,vr),Ee.bind(Y0,vr)}}return vr}function wn(D,X){D.ambientLightColor.needsUpdate=X,D.lightProbe.needsUpdate=X,D.directionalLights.needsUpdate=X,D.directionalLightShadows.needsUpdate=X,D.pointLights.needsUpdate=X,D.pointLightShadows.needsUpdate=X,D.spotLights.needsUpdate=X,D.spotLightShadows.needsUpdate=X,D.rectAreaLights.needsUpdate=X,D.hemisphereLights.needsUpdate=X}function bn(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(D,X,ee){let j=b.get(D);j.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),b.get(D.texture).__webglTexture=X,b.get(D.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:ee,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,X){let ee=b.get(D);ee.__webglFramebuffer=X,ee.__useDefaultFramebuffer=X===void 0};let Un=z.createFramebuffer();this.setRenderTarget=function(D,X=0,ee=0){P=D,R=X,w=ee;let j=null,J=!1,Re=!1;if(D){let De=b.get(D);if(De.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(z.FRAMEBUFFER,De.__webglFramebuffer),H.copy(D.viewport),k.copy(D.scissor),te=D.scissorTest,xe.viewport(H),xe.scissor(k),xe.setScissorTest(te),U=-1;return}else if(De.__webglFramebuffer===void 0)V.setupRenderTarget(D);else if(De.__hasExternalTextures)V.rebindTextures(D,b.get(D.texture).__webglTexture,b.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){let lt=D.depthTexture;if(De.__boundDepthTexture!==lt){if(lt!==null&&b.has(lt)&&(D.width!==lt.image.width||D.height!==lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");V.setupDepthRenderbuffer(D)}}let Ge=D.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Re=!0);let He=b.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(He[X])?j=He[X][ee]:j=He[X],J=!0):D.samples>0&&V.useMultisampledRTT(D)===!1?j=b.get(D).__webglMultisampledFramebuffer:Array.isArray(He)?j=He[ee]:j=He,H.copy(D.viewport),k.copy(D.scissor),te=D.scissorTest}else H.copy(Z).multiplyScalar(Ie).floor(),k.copy(le).multiplyScalar(Ie).floor(),te=G;if(ee!==0&&(j=Un),xe.bindFramebuffer(z.FRAMEBUFFER,j)&&xe.drawBuffers(D,j),xe.viewport(H),xe.scissor(k),xe.setScissorTest(te),J){let De=b.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+X,De.__webglTexture,ee)}else if(Re){let De=X;for(let Ge=0;Ge<D.textures.length;Ge++){let He=b.get(D.textures[Ge]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ge,He.__webglTexture,ee,De)}}else if(D!==null&&ee!==0){let De=b.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,De.__webglTexture,ee)}U=-1},this.readRenderTargetPixels=function(D,X,ee,j,J,Re,Ue,De=0){if(!(D&&D.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=b.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ge=Ge[Ue]),Ge){xe.bindFramebuffer(z.FRAMEBUFFER,Ge);try{let He=D.textures[De],lt=He.format,dt=He.type;if(D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+De),!Le.textureFormatReadable(lt)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Le.textureTypeReadable(dt)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=D.width-j&&ee>=0&&ee<=D.height-J&&z.readPixels(X,ee,j,J,ge.convert(lt),ge.convert(dt),Re)}finally{let He=P!==null?b.get(P).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(D,X,ee,j,J,Re,Ue,De=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=b.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ge=Ge[Ue]),Ge)if(X>=0&&X<=D.width-j&&ee>=0&&ee<=D.height-J){xe.bindFramebuffer(z.FRAMEBUFFER,Ge);let He=D.textures[De],lt=He.format,dt=He.type;if(D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+De),!Le.textureFormatReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.bufferData(z.PIXEL_PACK_BUFFER,Re.byteLength,z.STREAM_READ),z.readPixels(X,ee,j,J,ge.convert(lt),ge.convert(dt),0);let Ht=P!==null?b.get(P).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,Ht);let mn=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await ny(z,mn,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Re),z.deleteBuffer(Qe),z.deleteSync(mn),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,X=null,ee=0){let j=Math.pow(2,-ee),J=Math.floor(D.image.width*j),Re=Math.floor(D.image.height*j),Ue=X!==null?X.x:0,De=X!==null?X.y:0;V.setTexture2D(D,0),z.copyTexSubImage2D(z.TEXTURE_2D,ee,0,0,Ue,De,J,Re),xe.unbindTexture()};let jr=z.createFramebuffer(),ao=z.createFramebuffer();this.copyTextureToTexture=function(D,X,ee=null,j=null,J=0,Re=0){let Ue,De,Ge,He,lt,dt,Qe,Ht,mn,ln=D.isCompressedTexture?D.mipmaps[Re]:D.image;if(ee!==null)Ue=ee.max.x-ee.min.x,De=ee.max.y-ee.min.y,Ge=ee.isBox3?ee.max.z-ee.min.z:1,He=ee.min.x,lt=ee.min.y,dt=ee.isBox3?ee.min.z:0;else{let Gn=Math.pow(2,-J);Ue=Math.floor(ln.width*Gn),De=Math.floor(ln.height*Gn),D.isDataArrayTexture?Ge=ln.depth:D.isData3DTexture?Ge=Math.floor(ln.depth*Gn):Ge=1,He=0,lt=0,dt=0}j!==null?(Qe=j.x,Ht=j.y,mn=j.z):(Qe=0,Ht=0,mn=0);let Gt=ge.convert(X.format),$n=ge.convert(X.type),Ye;X.isData3DTexture?(V.setTexture3D(X,0),Ye=z.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(V.setTexture2DArray(X,0),Ye=z.TEXTURE_2D_ARRAY):(V.setTexture2D(X,0),Ye=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,X.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,X.unpackAlignment);let Hi=z.getParameter(z.UNPACK_ROW_LENGTH),Et=z.getParameter(z.UNPACK_IMAGE_HEIGHT),vr=z.getParameter(z.UNPACK_SKIP_PIXELS),Ir=z.getParameter(z.UNPACK_SKIP_ROWS),va=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,ln.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ln.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,He),z.pixelStorei(z.UNPACK_SKIP_ROWS,lt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,dt);let oo=D.isDataArrayTexture||D.isData3DTexture,Wt=X.isDataArrayTexture||X.isData3DTexture;if(D.isDepthTexture){let Gn=b.get(D),bs=b.get(X),Ln=b.get(Gn.__renderTarget),Cs=b.get(bs.__renderTarget);xe.bindFramebuffer(z.READ_FRAMEBUFFER,Ln.__webglFramebuffer),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,Cs.__webglFramebuffer);for(let lo=0;lo<Ge;lo++)oo&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,b.get(D).__webglTexture,J,dt+lo),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,b.get(X).__webglTexture,Re,mn+lo)),z.blitFramebuffer(He,lt,Ue,De,Qe,Ht,Ue,De,z.DEPTH_BUFFER_BIT,z.NEAREST);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(J!==0||D.isRenderTargetTexture||b.has(D)){let Gn=b.get(D),bs=b.get(X);xe.bindFramebuffer(z.READ_FRAMEBUFFER,jr),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,ao);for(let Ln=0;Ln<Ge;Ln++)oo?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Gn.__webglTexture,J,dt+Ln):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Gn.__webglTexture,J),Wt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,bs.__webglTexture,Re,mn+Ln):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,bs.__webglTexture,Re),J!==0?z.blitFramebuffer(He,lt,Ue,De,Qe,Ht,Ue,De,z.COLOR_BUFFER_BIT,z.NEAREST):Wt?z.copyTexSubImage3D(Ye,Re,Qe,Ht,mn+Ln,He,lt,Ue,De):z.copyTexSubImage2D(Ye,Re,Qe,Ht,He,lt,Ue,De);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Wt?D.isDataTexture||D.isData3DTexture?z.texSubImage3D(Ye,Re,Qe,Ht,mn,Ue,De,Ge,Gt,$n,ln.data):X.isCompressedArrayTexture?z.compressedTexSubImage3D(Ye,Re,Qe,Ht,mn,Ue,De,Ge,Gt,ln.data):z.texSubImage3D(Ye,Re,Qe,Ht,mn,Ue,De,Ge,Gt,$n,ln):D.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Re,Qe,Ht,Ue,De,Gt,$n,ln.data):D.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Re,Qe,Ht,ln.width,ln.height,Gt,ln.data):z.texSubImage2D(z.TEXTURE_2D,Re,Qe,Ht,Ue,De,Gt,$n,ln);z.pixelStorei(z.UNPACK_ROW_LENGTH,Hi),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Et),z.pixelStorei(z.UNPACK_SKIP_PIXELS,vr),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ir),z.pixelStorei(z.UNPACK_SKIP_IMAGES,va),Re===0&&X.generateMipmaps&&z.generateMipmap(Ye),xe.unbindTexture()},this.initRenderTarget=function(D){b.get(D).__webglFramebuffer===void 0&&V.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?V.setTextureCube(D,0):D.isData3DTexture?V.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?V.setTexture2DArray(D,0):V.setTexture2D(D,0),xe.unbindTexture()},this.resetState=function(){R=0,w=0,P=null,xe.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Er}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=St._getDrawingBufferColorSpace(e),t.unpackColorSpace=St._getUnpackColorSpace()}};var w2=(()=>{let i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Lt;return t.setAttribute("position",new ut(i,3)),t.setAttribute("uv",new ut(e,2)),t})(),Ri=class Qg{static get fullscreenGeometry(){return w2}constructor(e="Pass",t=new br,n=new vs){this.name=e,this.renderer=null,this.scene=t,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new Rt(Qg.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new br),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=wi){}render(e,t,n,r,s){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,n){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof vt||t instanceof Oi||t instanceof Dn||t instanceof Qg)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},b2=class extends Ri{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(i,e,t,n,r){let s=i.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},C2=`#ifdef COLOR_WRITE
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
}`,vl="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",Oy=class extends rt{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new we(null),depthBuffer:new we(null),channelWeights:new we(null),opacity:new we(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:C2,vertexShader:vl}),this.depthFunc=jo}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(i){let e=i!==null;this.colorWrite!==e&&(e?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=e,this.needsUpdate=!0),this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){let e=i!==null;this.depthWrite!==e&&(e?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=e,this.depthWrite=e,this.needsUpdate=!0),this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(i){this.colorSpaceConversion!==i&&(i?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(i){i!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=i):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},zy=class extends Ri{constructor(i,e=!0){super("CopyPass"),this.fullscreenMaterial=new Oy,this.needsSwap=!1,this.renderTarget=i,i===void 0&&(this.renderTarget=new vt(1,1,{minFilter:Vt,magFilter:Vt,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(i){this.autoResize=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(i){this.autoResize=i}render(i,e,t,n,r){this.fullscreenMaterial.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){this.autoResize&&this.renderTarget.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==xt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}},Ly=new qe,ky=class extends Ri{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,r){let s=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=s!==null,c=a>=0;l?(i.getClearColor(Ly),i.setClearColor(s,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(Ly,o):c&&i.setClearAlpha(o)}},R2=class extends Ri{constructor(i,e){super("MaskPass",i,e),this.needsSwap=!1,this.clearPass=new ky(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,r){let s=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,f=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.stencil.setFunc(s.ALWAYS,u,4294967295),a.stencil.setClear(f),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(s.EQUAL,1,4294967295),a.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.stencil.setLocked(!0)}};function D2(i,e){let t=i.getContext();if(e<=0||typeof t.renderbufferStorageMultisample!="function")return 0;let n=t.getParameter(t.MAX_SAMPLES),r=Math.min(e,n);if(r<=0)return 0;let s=t.getParameter(t.RENDERBUFFER_BINDING),a=t.createRenderbuffer();try{return t.bindRenderbuffer(t.RENDERBUFFER,a),t.renderbufferStorageMultisample(t.RENDERBUFFER,r,t.RGBA8,1,1),r}catch{return 0}finally{t.bindRenderbuffer(t.RENDERBUFFER,s),t.deleteRenderbuffer(a)}}var Xg=1/1e3,P2=1e3,I2=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document<"u"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*Xg}get fixedDelta(){return this._fixedDelta*Xg}set fixedDelta(i){this._fixedDelta=i*P2}get elapsed(){return this._elapsed*Xg}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(i!==void 0?i:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(i){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Hy=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:r=xt}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,r,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new zy,this.depthRenderTarget=null,this.passes=[],this.timer=new I2,this.autoRenderToScreen=!0,this.setRenderer(i)}get stableDepthTexture(){return this.depthRenderTarget===null?null:this.depthRenderTarget.depthTexture}get multisampling(){return this.inputBuffer.samples}set multisampling(i){let e=this.renderer===null?i:D2(this.renderer,i);this.multisampling!==e&&(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){let e=i.getSize(new Ce),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===xt&&i.outputColorSpace===it&&(this.inputBuffer.texture.colorSpace=it,this.outputBuffer.texture.colorSpace=it,this.inputBuffer.dispose(),this.outputBuffer.dispose());let r=this.multisampling;this.multisampling=r,i.autoClear=!1,this.setSize(e.width,e.height);for(let s of this.passes)s.initialize(i,t,n)}}replaceRenderer(i,e=!0){let t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){let i=new zi;i.name="EffectComposer.InputDepth",this.inputBuffer.stencilBuffer?(i.format=dr,i.type=Vr):i.type=nn;let e=new zi;e.format=i.format,e.type=i.type,e.name="EffectComposer.OutputDepth";let t=new zi;t.format=i.format,t.type=i.type,t.name="EffectComposer.StableDepth",this.inputBuffer.depthTexture=i,this.outputBuffer.depthTexture=e,this.inputBuffer.dispose(),this.outputBuffer.dispose();let{width:n,height:r}=this.inputBuffer;this.depthRenderTarget=new vt(n,r,{depthBuffer:!0,stencilBuffer:this.inputBuffer.stencilBuffer,depthTexture:t})}blitDepthBuffer(i){let e=this.renderer,t=this.depthRenderTarget,n=e.properties,r=e.getContext();e.setRenderTarget(t);let s=n.get(i).__webglFramebuffer,a=n.get(t).__webglFramebuffer,o=i.stencilBuffer?r.DEPTH_BUFFER_BIT|r.STENCIL_BUFFER_BIT:r.DEPTH_BUFFER_BIT;r.bindFramebuffer(r.READ_FRAMEBUFFER,s),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,a),r.blitFramebuffer(0,0,i.width,i.height,0,0,t.width,t.height,o,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),e.setRenderTarget(null)}deleteDepthTexture(){let i=this.stableDepthTexture;for(let e of this.passes)e.getDepthTexture()===i&&e.setDepthTexture(null);this.depthRenderTarget!==null&&(this.depthRenderTarget.dispose(),this.depthRenderTarget=null),this.inputBuffer.depthTexture!==null&&(this.inputBuffer.depthTexture.dispose(),this.inputBuffer.depthTexture=null),this.outputBuffer.depthTexture!==null&&(this.outputBuffer.depthTexture.dispose(),this.outputBuffer.depthTexture=null)}createBuffer(i,e,t,n){let r=this.renderer,s=r===null?new Ce:r.getDrawingBufferSize(new Ce),a=new vt(s.width,s.height,{minFilter:Vt,magFilter:Vt,samples:n,stencilBuffer:e,depthBuffer:i,type:t});return t===xt&&r!==null&&r.outputColorSpace===it&&(a.texture.colorSpace=it),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(i){for(let e of this.passes)e.mainScene=i}setMainCamera(i){for(let e of this.passes)e.mainCamera=i}addPass(i,e){let t=this.passes,n=this.renderer,r=n.getDrawingBufferSize(new Ce),s=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.renderer=n,i.setSize(r.width,r.height),i.initialize(n,s,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthRenderTarget!==null)if(this.depthRenderTarget===null){this.createDepthTexture();for(let o of t)o.setDepthTexture(this.stableDepthTexture)}else i.setDepthTexture(this.stableDepthTexture)}removePass(i){let e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){let s=this.stableDepthTexture;if(s!==null){let a=(l,c)=>l||c.needsDepthTexture;e.reduce(a,!1)||(i.getDepthTexture()===s&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){let i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){let e=this.renderer,t=this.copyPass,n=this.inputBuffer,r=this.outputBuffer,s,a=!1;i===void 0&&(this.timer.update(),i=this.timer.getDelta());for(let o of this.passes)if(o.enabled){if(o.render(e,n,r,i,a),o.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(n),o.needsSwap){if(a){t.renderToScreen=o.renderToScreen;let l=e.getContext(),c=e.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),t.render(e,n,r,i,a),c.setFunc(l.EQUAL,1,4294967295)}s=n,n=r,r=s}o instanceof R2?a=!0:o instanceof b2&&(a=!1)}}setSize(i,e,t){let n=this.renderer,r=n.getSize(new Ce);(i===void 0||e===void 0)&&(i=r.width,e=r.height),(r.width!==i||r.height!==e)&&n.setSize(i,e,t);let s=n.getDrawingBufferSize(new Ce);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(s.width,s.height);for(let a of this.passes)a.setSize(s.width,s.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let i of this.passes)i.dispose();this.deleteDepthTexture(),this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.copyPass.dispose(),this.timer.dispose(),this.passes=[],Ri.fullscreenGeometry.dispose()}},oa={NONE:0,DEPTH:1,CONVOLUTION:2},wt={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},B2=class{constructor(){this.shaderParts=new Map([[wt.FRAGMENT_HEAD,null],[wt.FRAGMENT_MAIN_UV,null],[wt.FRAGMENT_MAIN_IMAGE,null],[wt.VERTEX_HEAD,null],[wt.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=oa.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Ni}};var Yg=!1,Fy=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case vn:t=this.materialsFlatShadedDoubleSide;break;case tn:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case vn:t=this.materialsDoubleSide;break;case tn:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(i){if(!(i instanceof rt))return i.clone();let e=i.uniforms,t=new Map;for(let r in e){let s=e[r].value;s.isRenderTargetTexture&&(e[r].value=null,t.set(r,s))}let n=i.clone();for(let r of t)e[r[0]].value=r[1],n.uniforms[r[0]].value=r[1];return n}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){let e=this.materials=[this.cloneMaterial(i),this.cloneMaterial(i),this.cloneMaterial(i)];for(let t of e)t.uniforms=Object.assign({},i.uniforms),t.side=ci;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=tn,n}),this.materialsDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=vn,n}),this.materialsFlatShaded=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=tn,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=vn,n})}}render(i,e,t){let n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,Yg){let r=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(let s of r)s[0].material=s[1];this.meshCount!==r.size&&r.clear()}else{let r=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=r}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){let i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Yg}static set workaroundEnabled(i){Yg=i}};var aa=-1,er=class extends Ti{constructor(i=null,e=aa,t=aa,n=1){super(),i!==null&&this.addEventListener("change",()=>i.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new Ce(1,1),this.preferredSize=new Ce(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new Ce,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==aa?t.width=e.width:e.height!==aa?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==aa?t.height=e.height:e.width!==aa?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(aa),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return aa}};var ft={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},U2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",L2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",F2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",N2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",O2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",z2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",k2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",H2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",G2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",V2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",W2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",X2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Y2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",q2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Q2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Z2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",K2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",J2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",j2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",$2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",eR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",tR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",nR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",iR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",rR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",sR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",aR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",oR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",lR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",cR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",uR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",hR="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",fR=new Map([[ft.ADD,U2],[ft.ALPHA,L2],[ft.AVERAGE,F2],[ft.COLOR,N2],[ft.COLOR_BURN,O2],[ft.COLOR_DODGE,z2],[ft.DARKEN,k2],[ft.DIFFERENCE,H2],[ft.DIVIDE,G2],[ft.DST,null],[ft.EXCLUSION,V2],[ft.HARD_LIGHT,W2],[ft.HARD_MIX,X2],[ft.HUE,Y2],[ft.INVERT,q2],[ft.INVERT_RGB,Q2],[ft.LIGHTEN,Z2],[ft.LINEAR_BURN,K2],[ft.LINEAR_DODGE,J2],[ft.LINEAR_LIGHT,j2],[ft.LUMINOSITY,$2],[ft.MULTIPLY,eR],[ft.NEGATION,tR],[ft.NORMAL,nR],[ft.OVERLAY,iR],[ft.PIN_LIGHT,rR],[ft.REFLECT,sR],[ft.SATURATION,aR],[ft.SCREEN,oR],[ft.SOFT_LIGHT,lR],[ft.SRC,cR],[ft.SUBTRACT,uR],[ft.VIVID_LIGHT,hR]]),dR=class extends Ti{constructor(i,e=1){super(),this._blendFunction=i,this.opacity=new we(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return fR.get(this.blendFunction)}};var eo=class extends Ti{constructor(i,e,{attributes:t=oa.NONE,blendFunction:n=ft.NORMAL,defines:r=new Map,uniforms:s=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=r,this.uniforms=s,this.extensions=a,this.blendMode=new dR(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Ni,this._outputColorSpace=bi}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=wi){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(let i of Object.keys(this)){let e=this[i];(e instanceof vt||e instanceof Oi||e instanceof Dn||e instanceof Ri)&&this[i].dispose()}}};var Ed={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},pR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,mR="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",gR=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],vR=class extends rt{constructor(i=new At){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new we(null),texelSize:new we(new At),scale:new we(1),kernel:new we(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:pR,vertexShader:mR}),this.setTexelSize(i.x,i.y),this.kernelSize=Ed.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return gR[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){let t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},Gy=class extends Ri{constructor({kernelSize:i=Ed.MEDIUM,resolutionScale:e=.5,width:t=er.AUTO_SIZE,height:n=er.AUTO_SIZE,resolutionX:r=t,resolutionY:s=n}={}){super("KawaseBlurPass"),this.renderTargetA=new vt(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let a=this.resolution=new er(this,r,s,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new vR,this._blurMaterial.kernelSize=i,this.copyMaterial=new Oy}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence,f=e;this.fullscreenMaterial=c;for(let h=0,d=u.length;h<d;++h){let p=(h&1)===0?o:l;c.kernel=u[h],c.inputBuffer=f.texture,i.setRenderTarget(p),i.render(s,a),f=p}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=f.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(s,a)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.renderTargetA.setSize(n,r),this.renderTargetB.setSize(n,r),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==xt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i!==null&&i.outputColorSpace===it&&(this.renderTargetA.texture.colorSpace=it,this.renderTargetB.texture.colorSpace=it))}static get AUTO_SIZE(){return er.AUTO_SIZE}},xR=`#include <common>
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
}`,_R=class extends rt{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:Qn.replace(/\D+/g,"")},uniforms:{inputBuffer:new we(null),threshold:new we(0),smoothing:new we(1),range:new we(null)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:xR,vertexShader:vl}),this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},Vy=class extends Ri{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:r=er.AUTO_SIZE,height:s=er.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new _R(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new er(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,r){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},yR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,AR="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",SR=class extends rt{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new we(null),texelSize:new we(new Ce)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:yR,vertexShader:AR})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},MR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,TR="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",ER=class extends rt{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new we(null),supportBuffer:new we(null),texelSize:new we(new Ce),radius:new we(.85)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:MR,vertexShader:TR})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},wR=class extends Ri{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new SR,this.upsamplingMaterial=new ER,this.resolution=new Ce}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){let e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){let n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){let r=e.clone();r.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,r){let{scene:s,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this,f=e;this.fullscreenMaterial=o;for(let h=0,d=c.length;h<d;++h){let p=c[h];o.setSize(f.width,f.height),o.inputBuffer=f.texture,i.setRenderTarget(p),i.render(s,a),f=p}this.fullscreenMaterial=l;for(let h=u.length-1;h>=0;--h){let d=u[h];l.setSize(f.width,f.height),l.inputBuffer=f.texture,l.supportBuffer=c[h].texture,i.setRenderTarget(d),i.render(s,a),f=d}}setSize(i,e){let t=this.resolution;t.set(i,e);let n=t.width,r=t.height;for(let s=0,a=this.downsamplingMipmaps.length;s<a;++s)n=Math.round(n*.5),r=Math.round(r*.5),this.downsamplingMipmaps[s].setSize(n,r),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(n,r)}initialize(i,e,t){if(t!==void 0){let n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let r of n)r.texture.type=t;if(t!==xt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i!==null&&i.outputColorSpace===it)for(let r of n)r.texture.colorSpace=it}}dispose(){super.dispose();for(let i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},bR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,Wy=class extends eo{constructor({blendFunction:i=ft.SCREEN,luminanceThreshold:e=1,luminanceSmoothing:t=.03,mipmapBlur:n=!0,intensity:r=1,radius:s=.85,levels:a=8,kernelSize:o=Ed.LARGE,resolutionScale:l=.5,width:c=er.AUTO_SIZE,height:u=er.AUTO_SIZE,resolutionX:f=c,resolutionY:h=u}={}){super("BloomEffect",bR,{blendFunction:i,uniforms:new Map([["map",new we(null)],["intensity",new we(r)]])}),this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Gy({kernelSize:o}),this.luminancePass=new Vy({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new wR,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;let d=this.resolution=new er(this,f,h,l);d.addEventListener("change",p=>this.setSize(d.baseWidth,d.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){let n=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,r.renderTarget):this.blurPass.render(i,r.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}};var Xy={RED:0,GREEN:1,BLUE:2,ALPHA:3},Yy={DISCARD:0,MULTIPLY:1,MULTIPLY_RGB_SET_ALPHA:2,MULTIPLY_RGB:3},CR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
}}`,Td=class extends rt{constructor(i=!1,e=!1){super({name:"BokehMaterial",defines:{PASS:i?"2":"1"},uniforms:{inputBuffer:new we(null),cocBuffer:new we(null),texelSize:new we(new Ce),kernel64:new we(null),kernel16:new we(null),scale:new we(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:CR,vertexShader:vl}),e&&(this.defines.FOREGROUND="1"),this.generateKernel()}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set cocBuffer(i){this.uniforms.cocBuffer.value=i}setCoCBuffer(i){this.uniforms.cocBuffer.value=i}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(i){return this.scale}setScale(i){this.scale=i}generateKernel(){let i=2.39996323,e=new Float64Array(128),t=new Float64Array(32),n=0,r=0;for(let s=0,a=Math.sqrt(80);s<80;++s){let o=s*i,l=Math.sqrt(s)/a,c=l*Math.cos(o),u=l*Math.sin(o);s%5===0?(t[r++]=c,t[r++]=u):(e[n++]=c,e[n++]=u)}this.uniforms.kernel64.value=e,this.uniforms.kernel16.value=t}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e)}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},RR=`#include <common>
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
void main(){float depth=readDepth(vUv);vec3 viewPosition=getViewPosition(vUv,depth);float distance=getDistance(viewPosition);float signedDistance=distance-focusDistance;float magnitude=smoothstep(0.0,focusRange,abs(signedDistance));gl_FragColor.rg=magnitude*vec2(step(signedDistance,0.0),step(0.0,signedDistance));}`,DR=class extends rt{constructor(i=null){super({name:"CircleOfConfusionMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new we(null),projectionMatrix:new we(null),projectionMatrixInverse:new we(null),cameraNear:new we(.3),cameraFar:new we(1e3),focusDistance:new we(0),focusRange:new we(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:RR,vertexShader:vl}),this.uniforms.focalLength=this.uniforms.focusRange,i!==null&&this.copyCameraSettings(i)}set depthBuffer(i){this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=wi){this.depthBuffer=i,this.depthPacking=e}get focusDistance(){return this.uniforms.focusDistance.value}set focusDistance(i){this.uniforms.focusDistance.value=i}get worldFocusDistance(){return this.focusDistance}set worldFocusDistance(i){this.focusDistance=i}getFocusDistance(i){this.uniforms.focusDistance.value=i}setFocusDistance(i){this.uniforms.focusDistance.value=i}get focalLength(){return this.focusRange}set focalLength(i){this.focusRange=i}get focusRange(){return this.uniforms.focusRange.value}set focusRange(i){this.uniforms.focusRange.value=i}get worldFocusRange(){return this.focusRange}set worldFocusRange(i){this.focusRange=i}getFocalLength(i){return this.focusRange}setFocalLength(i){this.focusRange=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){this.uniforms.projectionMatrix.value=i.projectionMatrix,this.uniforms.projectionMatrixInverse.value=i.projectionMatrixInverse,this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far;let e=this.defines.PERSPECTIVE_CAMERA!==void 0;i instanceof An?e||(this.defines.PERSPECTIVE_CAMERA=!0,this.needsUpdate=!0):e&&(delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},PR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
}`,IR=class extends rt{constructor(i=null){super({name:"MaskMaterial",uniforms:{maskTexture:new we(i),inputBuffer:new we(null),strength:new we(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:PR,vertexShader:vl}),this.colorChannel=Xy.RED,this.maskFunction=Yy.DISCARD}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set maskTexture(i){this.uniforms.maskTexture.value=i,delete this.defines.MASK_PRECISION_HIGH,i.type!==xt&&(this.defines.MASK_PRECISION_HIGH="1"),this.needsUpdate=!0}setMaskTexture(i){this.maskTexture=i}set colorChannel(i){this.defines.COLOR_CHANNEL=i.toFixed(0),this.needsUpdate=!0}setColorChannel(i){this.colorChannel=i}set maskFunction(i){this.defines.MASK_FUNCTION=i.toFixed(0),this.needsUpdate=!0}setMaskFunction(i){this.maskFunction=i}get inverted(){return this.defines.INVERTED!==void 0}set inverted(i){this.inverted&&!i?delete this.defines.INVERTED:i&&(this.defines.INVERTED="1"),this.needsUpdate=!0}isInverted(){return this.inverted}setInverted(i){this.inverted=i}get strength(){return this.uniforms.strength.value}set strength(i){this.uniforms.strength.value=i}getStrength(){return this.strength}setStrength(i){this.strength=i}},gl=class extends Ri{constructor(i,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,r){let s=this.fullscreenMaterial.uniforms;e!==null&&s!==void 0&&s[this.input]!==void 0&&(s[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},BR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
vec4 result=inputColor*(1.0-cocNearFar.y)+colorFar;result=mix(result,colorNear,cocNearFar.x);outputColor=result;}`,UR=new I,qy=class extends eo{constructor(i,{blendFunction:e,worldFocusDistance:t,worldFocusRange:n,focalLength:r,focusDistance:s=t||3,focusRange:a=n||r||2,bokehScale:o=1,resolutionScale:l=.5,width:c,height:u,resolutionX:f=c||er.AUTO_SIZE,resolutionY:h=u||er.AUTO_SIZE}={}){super("DepthOfFieldEffect",BR,{blendFunction:e,attributes:oa.DEPTH,uniforms:new Map([["nearColorBuffer",new we(null)],["farColorBuffer",new we(null)],["nearCoCBuffer",new we(null)],["farCoCBuffer",new we(null)],["scale",new we(1)]])}),this.camera=i,this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="DoF.Intermediate",this.renderTargetMasked=this.renderTarget.clone(),this.renderTargetMasked.texture.name="DoF.Masked.Far",this.renderTargetNear=this.renderTarget.clone(),this.renderTargetNear.texture.name="DoF.Bokeh.Near",this.uniforms.get("nearColorBuffer").value=this.renderTargetNear.texture,this.renderTargetFar=this.renderTarget.clone(),this.renderTargetFar.texture.name="DoF.Bokeh.Far",this.uniforms.get("farColorBuffer").value=this.renderTargetFar.texture,this.renderTargetCoC=this.renderTarget.clone(),this.renderTargetCoC.texture.name="DoF.CoC",this.uniforms.get("farCoCBuffer").value=this.renderTargetCoC.texture,this.renderTargetCoCBlurred=this.renderTargetCoC.clone(),this.renderTargetCoCBlurred.texture.name="DoF.CoC.Blurred",this.uniforms.get("nearCoCBuffer").value=this.renderTargetCoCBlurred.texture,this.cocPass=new gl(new DR(i));let d=this.cocMaterial;d.focusDistance=s,d.focusRange=a,this.blurPass=new Gy({resolutionScale:l,resolutionX:f,resolutionY:h,kernelSize:Ed.MEDIUM}),this.maskPass=new gl(new IR(this.renderTargetCoC.texture));let p=this.maskPass.fullscreenMaterial;p.colorChannel=Xy.GREEN,this.maskFunction=Yy.MULTIPLY_RGB,this.bokehNearBasePass=new gl(new Td(!1,!0)),this.bokehNearBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehNearFillPass=new gl(new Td(!0,!0)),this.bokehNearFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehFarBasePass=new gl(new Td(!1,!1)),this.bokehFarBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.bokehFarFillPass=new gl(new Td(!0,!1)),this.bokehFarFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.target=null;let v=this.resolution=new er(this,f,h,l);v.addEventListener("change",g=>this.setSize(v.baseWidth,v.baseHeight)),this.bokehScale=o}set mainCamera(i){this.camera=i,this.cocMaterial.copyCameraSettings(i)}get cocTexture(){return this.renderTargetCoC.texture}get maskFunction(){return this.maskPass.fullscreenMaterial.maskFunction}set maskFunction(i){this.maskFunction!==i&&(this.defines.set("MASK_FUNCTION",i.toFixed(0)),this.maskPass.fullscreenMaterial.maskFunction=i,this.setChanged())}get cocMaterial(){return this.cocPass.fullscreenMaterial}get circleOfConfusionMaterial(){return this.cocMaterial}getCircleOfConfusionMaterial(){return this.cocMaterial}getBlurPass(){return this.blurPass}getResolution(){return this.resolution}get bokehScale(){return this.uniforms.get("scale").value}set bokehScale(i){this.bokehNearBasePass.fullscreenMaterial.scale=i,this.bokehNearFillPass.fullscreenMaterial.scale=i,this.bokehFarBasePass.fullscreenMaterial.scale=i,this.bokehFarFillPass.fullscreenMaterial.scale=i,this.maskPass.fullscreenMaterial.strength=i,this.uniforms.get("scale").value=i}getBokehScale(){return this.bokehScale}setBokehScale(i){this.bokehScale=i}getTarget(){return this.target}setTarget(i){this.target=i}calculateFocusDistance(i){return this.camera.getWorldPosition(UR).distanceTo(i)}setDepthTexture(i,e=wi){this.cocMaterial.depthBuffer=i,this.cocMaterial.depthPacking=e}update(i,e,t){let n=this.renderTarget,r=this.renderTargetCoC,s=this.renderTargetCoCBlurred,a=this.renderTargetMasked;if(this.target!==null){let o=this.calculateFocusDistance(this.target);this.cocMaterial.focusDistance=o}this.cocPass.render(i,null,r),this.blurPass.render(i,r,s),this.maskPass.render(i,e,a),this.bokehFarBasePass.render(i,a,n),this.bokehFarFillPass.render(i,n,this.renderTargetFar),this.bokehNearBasePass.render(i,e,n),this.bokehNearFillPass.render(i,n,this.renderTargetNear)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.cocPass.setSize(i,e),this.blurPass.setSize(i,e),this.maskPass.setSize(i,e),this.renderTargetFar.setSize(i,e),this.renderTargetCoC.setSize(i,e),this.renderTargetMasked.setSize(i,e),this.renderTarget.setSize(n,r),this.renderTargetNear.setSize(n,r),this.renderTargetCoCBlurred.setSize(n,r),this.bokehNearBasePass.fullscreenMaterial.setSize(i,e),this.bokehNearFillPass.fullscreenMaterial.setSize(i,e),this.bokehFarBasePass.fullscreenMaterial.setSize(i,e),this.bokehFarFillPass.fullscreenMaterial.setSize(i,e)}initialize(i,e,t){this.cocPass.initialize(i,e,t),this.maskPass.initialize(i,e,t),this.bokehNearBasePass.initialize(i,e,t),this.bokehNearFillPass.initialize(i,e,t),this.bokehFarBasePass.initialize(i,e,t),this.bokehFarFillPass.initialize(i,e,t),this.blurPass.initialize(i,e,xt),i.capabilities.logarithmicDepthBuffer&&(this.cocPass.fullscreenMaterial.defines.LOG_DEPTH="1"),t!==void 0&&(this.renderTarget.texture.type=t,this.renderTargetNear.texture.type=t,this.renderTargetFar.texture.type=t,this.renderTargetMasked.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it,this.renderTargetNear.texture.colorSpace=it,this.renderTargetFar.texture.colorSpace=it,this.renderTargetMasked.texture.colorSpace=it))}};var Qy=class extends Ri{constructor(i,e,t=null){super("RenderPass",i,e),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new ky,this.overrideMaterialManager=t===null?null:new Fy(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){let i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){let e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new Fy(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=s.background,u=i.shadowMap.autoUpdate,f=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(f),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,s,a):i.render(s,a),a.layers.mask=l,s.background=c,i.shadowMap.autoUpdate=u}};var Ci={LINEAR:0,REINHARD:1,REINHARD2:2,REINHARD2_ADAPTIVE:3,UNCHARTED2:4,OPTIMIZED_CINEON:5,CINEON:5,ACES_FILMIC:6,AGX:7,NEUTRAL:8},pu={DEFAULT:0,ESKIL:1};var LR=`void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec3 noise=vec3(rand(uv*(1.0+time)));
#ifdef PREMULTIPLY
outputColor=vec4(min(inputColor.rgb*noise,vec3(1.0)),inputColor.a);
#else
outputColor=vec4(noise,inputColor.a);
#endif
}`,Zy=class extends eo{constructor({blendFunction:i=ft.SCREEN,premultiply:e=!1}={}){super("NoiseEffect",LR,{blendFunction:i}),this.premultiply=e}get premultiply(){return this.defines.has("PREMULTIPLY")}set premultiply(i){this.premultiply!==i&&(i?this.defines.set("PREMULTIPLY","1"):this.defines.delete("PREMULTIPLY"),this.setChanged())}isPremultiplied(){return this.premultiply}setPremultiplied(i){this.premultiply=i}};var rU=Math.PI*.5;var FR=`#include <packing>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
uniform lowp sampler2D luminanceBuffer0;uniform lowp sampler2D luminanceBuffer1;uniform float minLuminance;uniform float deltaTime;uniform float tau;varying vec2 vUv;void main(){float l0=unpackRGBAToFloat(texture2D(luminanceBuffer0,vUv));
#if __VERSION__ < 300
float l1=texture2DLodEXT(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#else
float l1=textureLod(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#endif
l0=max(minLuminance,l0);l1=max(minLuminance,l1);float adaptedLum=l0+(l1-l0)*(1.0-exp(-deltaTime*tau));gl_FragColor=(adaptedLum==1.0)?vec4(1.0):packFloatToRGBA(adaptedLum);}`,NR=class extends rt{constructor(){super({name:"AdaptiveLuminanceMaterial",defines:{MIP_LEVEL_1X1:"0.0"},uniforms:{luminanceBuffer0:new we(null),luminanceBuffer1:new we(null),minLuminance:new we(.01),deltaTime:new we(0),tau:new we(1)},extensions:{shaderTextureLOD:!0},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:FR,vertexShader:vl})}set luminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}setLuminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}set luminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}setLuminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}set mipLevel1x1(i){this.defines.MIP_LEVEL_1X1=i.toFixed(1),this.needsUpdate=!0}setMipLevel1x1(i){this.mipLevel1x1=i}set deltaTime(i){this.uniforms.deltaTime.value=i}setDeltaTime(i){this.uniforms.deltaTime.value=i}get minLuminance(){return this.uniforms.minLuminance.value}set minLuminance(i){this.uniforms.minLuminance.value=i}getMinLuminance(){return this.uniforms.minLuminance.value}setMinLuminance(i){this.uniforms.minLuminance.value=i}get adaptationRate(){return this.uniforms.tau.value}set adaptationRate(i){this.uniforms.tau.value=i}getAdaptationRate(){return this.uniforms.tau.value}setAdaptationRate(i){this.uniforms.tau.value=i}},OR=class extends Ri{constructor(i,{minLuminance:e=.01,adaptationRate:t=1}={}){super("AdaptiveLuminancePass"),this.fullscreenMaterial=new NR,this.needsSwap=!1,this.renderTargetPrevious=new vt(1,1,{minFilter:Ct,magFilter:Ct,depthBuffer:!1}),this.renderTargetPrevious.texture.name="Luminance.Previous";let n=this.fullscreenMaterial;n.luminanceBuffer0=this.renderTargetPrevious.texture,n.luminanceBuffer1=i,n.minLuminance=e,n.adaptationRate=t,this.renderTargetAdapted=this.renderTargetPrevious.clone(),this.renderTargetAdapted.texture.name="Luminance.Adapted",this.copyPass=new zy(this.renderTargetPrevious,!1)}get texture(){return this.renderTargetAdapted.texture}getTexture(){return this.renderTargetAdapted.texture}set mipLevel1x1(i){this.fullscreenMaterial.mipLevel1x1=i}get adaptationRate(){return this.fullscreenMaterial.adaptationRate}set adaptationRate(i){this.fullscreenMaterial.adaptationRate=i}render(i,e,t,n,r){this.fullscreenMaterial.deltaTime=n,i.setRenderTarget(this.renderToScreen?null:this.renderTargetAdapted),i.render(this.scene,this.camera),this.copyPass.render(i,this.renderTargetAdapted)}},zR=`#include <tonemapping_pars_fragment>
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
}`,Ky=class extends eo{constructor({blendFunction:i=ft.SRC,adaptive:e=!1,mode:t=e?Ci.REINHARD2_ADAPTIVE:Ci.AGX,resolution:n=256,maxLuminance:r=4,whitePoint:s=r,middleGrey:a=.6,minLuminance:o=.01,averageLuminance:l=1,adaptationRate:c=1}={}){super("ToneMappingEffect",zR,{blendFunction:i,uniforms:new Map([["luminanceBuffer",new we(null)],["maxLuminance",new we(r)],["whitePoint",new we(s)],["middleGrey",new we(a)],["averageLuminance",new we(l)]])}),this.renderTargetLuminance=new vt(1,1,{minFilter:Gr,depthBuffer:!1}),this.renderTargetLuminance.texture.generateMipmaps=!0,this.renderTargetLuminance.texture.name="Luminance",this.luminancePass=new Vy({renderTarget:this.renderTargetLuminance}),this.adaptiveLuminancePass=new OR(this.luminancePass.texture,{minLuminance:o,adaptationRate:c}),this.uniforms.get("luminanceBuffer").value=this.adaptiveLuminancePass.texture,this.resolution=n,this.mode=t}get mode(){return Number(this.defines.get("TONE_MAPPING_MODE"))}set mode(i){if(this.mode===i)return;let t=Qn.replace(/\D+/g,"")>=168?"CineonToneMapping(texel)":"OptimizedCineonToneMapping(texel)";switch(this.defines.clear(),this.defines.set("TONE_MAPPING_MODE",i.toFixed(0)),i){case Ci.LINEAR:this.defines.set("toneMapping(texel)","LinearToneMapping(texel)");break;case Ci.REINHARD:this.defines.set("toneMapping(texel)","ReinhardToneMapping(texel)");break;case Ci.CINEON:case Ci.OPTIMIZED_CINEON:this.defines.set("toneMapping(texel)",t);break;case Ci.ACES_FILMIC:this.defines.set("toneMapping(texel)","ACESFilmicToneMapping(texel)");break;case Ci.AGX:this.defines.set("toneMapping(texel)","AgXToneMapping(texel)");break;case Ci.NEUTRAL:this.defines.set("toneMapping(texel)","NeutralToneMapping(texel)");break;default:this.defines.set("toneMapping(texel)","texel");break}this.adaptiveLuminancePass.enabled=i===Ci.REINHARD2_ADAPTIVE,this.setChanged()}getMode(){return this.mode}setMode(i){this.mode=i}get whitePoint(){return this.uniforms.get("whitePoint").value}set whitePoint(i){this.uniforms.get("whitePoint").value=i}get middleGrey(){return this.uniforms.get("middleGrey").value}set middleGrey(i){this.uniforms.get("middleGrey").value=i}get averageLuminance(){return this.uniforms.get("averageLuminance").value}set averageLuminance(i){this.uniforms.get("averageLuminance").value=i}get adaptiveLuminanceMaterial(){return this.adaptiveLuminancePass.fullscreenMaterial}getAdaptiveLuminanceMaterial(){return this.adaptiveLuminanceMaterial}get resolution(){return this.luminancePass.resolution.width}set resolution(i){let e=Math.max(0,Math.ceil(Math.log2(i))),t=Math.pow(2,e);this.luminancePass.resolution.setPreferredSize(t,t),this.adaptiveLuminanceMaterial.mipLevel1x1=e}getResolution(){return this.resolution}setResolution(i){this.resolution=i}get adaptive(){return this.mode===Ci.REINHARD2_ADAPTIVE}set adaptive(i){this.mode=i?Ci.REINHARD2_ADAPTIVE:Ci.REINHARD2}get adaptationRate(){return this.adaptiveLuminanceMaterial.adaptationRate}set adaptationRate(i){this.adaptiveLuminanceMaterial.adaptationRate=i}get distinction(){return console.warn(this.name,"distinction was removed."),1}set distinction(i){console.warn(this.name,"distinction was removed.")}update(i,e,t){this.adaptiveLuminancePass.enabled&&(this.luminancePass.render(i,e),this.adaptiveLuminancePass.render(i,null,null,t))}initialize(i,e,t){this.adaptiveLuminancePass.initialize(i,e,t)}},kR=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,Jy=class extends eo{constructor({blendFunction:i,eskil:e=!1,technique:t=e?pu.ESKIL:pu.DEFAULT,offset:n=.5,darkness:r=.5}={}){super("VignetteEffect",kR,{blendFunction:i,defines:new Map([["VIGNETTE_TECHNIQUE",t.toFixed(0)]]),uniforms:new Map([["offset",new we(n)],["darkness",new we(r)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(i){this.technique!==i&&(this.defines.set("VIGNETTE_TECHNIQUE",i.toFixed(0)),this.setChanged())}get eskil(){return this.technique===pu.ESKIL}set eskil(i){this.technique=i?pu.ESKIL:pu.DEFAULT}getTechnique(){return this.technique}setTechnique(i){this.technique=i}get offset(){return this.uniforms.get("offset").value}set offset(i){this.uniforms.get("offset").value=i}getOffset(){return this.offset}setOffset(i){this.offset=i}get darkness(){return this.uniforms.get("darkness").value}set darkness(i){this.uniforms.get("darkness").value=i}getDarkness(){return this.darkness}setDarkness(i){this.darkness=i}};var HR=`#include <common>
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
}`,GR="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",VR=class extends rt{constructor(i,e,t,n,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Qn.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new we(null),depthBuffer:new we(null),resolution:new we(new Ce),texelSize:new we(new Ce),cameraNear:new we(.3),cameraFar:new we(1e3),aspect:new we(1),time:new we(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:r}),i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=wi){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){return this.fragmentShader=HR.replace(wt.FRAGMENT_HEAD,i.get(wt.FRAGMENT_HEAD)||"").replace(wt.FRAGMENT_MAIN_UV,i.get(wt.FRAGMENT_MAIN_UV)||"").replace(wt.FRAGMENT_MAIN_IMAGE,i.get(wt.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=GR.replace(wt.VERTEX_HEAD,i.get(wt.VERTEX_HEAD)||"").replace(wt.VERTEX_MAIN_SUPPORT,i.get(wt.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(i){for(let e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(let e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(let e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof An?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){let t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return wt}};var hU=Number(Qn.replace(/\D+/g,"")),$a=255/256,fU=new Float32Array([$a/256**3,$a/256**2,$a/256,$a]),dU=new Float32Array([$a,$a/256,$a/256**2,1/256**3]);function Ny(i,e,t){for(let n of e){let r="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),s=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(let a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(s,r))}}function WR(i,e,t){let n=e.getFragmentShader(),r=e.getVertexShader(),s=n!==void 0&&/mainImage/.test(n),a=n!==void 0&&/mainUv/.test(n);if(t.attributes|=e.getAttributes(),n===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(t.attributes&oa.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!s&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts,c=l.get(wt.FRAGMENT_HEAD)||"",u=l.get(wt.FRAGMENT_MAIN_UV)||"",f=l.get(wt.FRAGMENT_MAIN_IMAGE)||"",h=l.get(wt.VERTEX_HEAD)||"",d=l.get(wt.VERTEX_MAIN_SUPPORT)||"",p=new Set,v=new Set;if(a&&(u+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),r!==null&&/mainSupport/.test(r)){let x=/mainSupport *\([\w\s]*?uv\s*?\)/.test(r);d+=`	${i}MainSupport(`,d+=x?`vUv);
`:`);
`;for(let _ of r.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let y of _[1].split(/\s*,\s*/))t.varyings.add(y),p.add(y),v.add(y);for(let _ of r.matchAll(o))v.add(_[1])}for(let x of n.matchAll(o))v.add(x[1]);for(let x of e.defines.keys())v.add(x.replace(/\([\w\s,]*\)/g,""));for(let x of e.uniforms.keys())v.add(x);v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((x,_)=>t.uniforms.set(i+_.charAt(0).toUpperCase()+_.slice(1),x)),e.defines.forEach((x,_)=>t.defines.set(i+_.charAt(0).toUpperCase()+_.slice(1),x));let g=new Map([["fragment",n],["vertex",r]]);Ny(i,v,t.defines),Ny(i,v,g),n=g.get("fragment"),r=g.get("vertex");let m=e.blendMode;if(t.blendModes.set(m.blendFunction,m),s){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(f+=e.inputColorSpace===it?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==bi?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);let x=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${i}MainImage(color0, UV, `,(t.attributes&oa.DEPTH)!==0&&x.test(n)&&(f+="depth, ",t.readDepth=!0),f+=`color1);
	`;let _=i+"BlendOpacity";t.uniforms.set(_,m.opacity),f+=`color0 = blend${m.blendFunction}(color0, color1, ${_});

	`,c+=`uniform float ${_};

`}if(c+=n+`
`,r!==null&&(h+=r+`
`),l.set(wt.FRAGMENT_HEAD,c),l.set(wt.FRAGMENT_MAIN_UV,u),l.set(wt.FRAGMENT_MAIN_IMAGE,f),l.set(wt.VERTEX_HEAD,h),l.set(wt.VERTEX_MAIN_SUPPORT,d),e.extensions!==null)for(let x of e.extensions)t.extensions.add(x)}}var Zg=class extends Ri{constructor(i,...e){super("EffectPass"),this.fullscreenMaterial=new VR(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(let e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(let e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){let e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let i=new B2,e=0;for(let a of this.effects)if(a.blendMode.blendFunction===ft.DST)i.attributes|=a.getAttributes()&oa.DEPTH;else{if((i.attributes&a.getAttributes()&oa.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);WR("e"+e++,a,i)}let t=i.shaderParts.get(wt.FRAGMENT_HEAD),n=i.shaderParts.get(wt.FRAGMENT_MAIN_IMAGE),r=i.shaderParts.get(wt.FRAGMENT_MAIN_UV),s=/\bblend\b/g;for(let a of i.blendModes.values())t+=a.getShaderCode().replace(s,`blend${a.blendFunction}`)+`
`;(i.attributes&oa.DEPTH)!==0?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===it&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(wt.FRAGMENT_HEAD,t),i.shaderParts.set(wt.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(wt.FRAGMENT_MAIN_UV,r);for(let[a,o]of i.shaderParts)o!==null&&i.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=wi){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(let t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,r){for(let s of this.effects)s.update(i,e,n);if(!this.skipRendering||this.renderToScreen){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(let t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(let n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}};var mU=[new Float32Array(3),new Float32Array(3)],gU=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],vU=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var xU=[new Float32Array(2),new Float32Array(2)];var _U=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),yU=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],AU=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],SU=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var MU=new Map([[di(0,0,0,0),new Float32Array([0,0,0,0])],[di(0,0,0,1),new Float32Array([0,0,0,1])],[di(0,0,1,0),new Float32Array([0,0,1,0])],[di(0,0,1,1),new Float32Array([0,0,1,1])],[di(0,1,0,0),new Float32Array([0,1,0,0])],[di(0,1,0,1),new Float32Array([0,1,0,1])],[di(0,1,1,0),new Float32Array([0,1,1,0])],[di(0,1,1,1),new Float32Array([0,1,1,1])],[di(1,0,0,0),new Float32Array([1,0,0,0])],[di(1,0,0,1),new Float32Array([1,0,0,1])],[di(1,0,1,0),new Float32Array([1,0,1,0])],[di(1,0,1,1),new Float32Array([1,0,1,1])],[di(1,1,0,0),new Float32Array([1,1,0,0])],[di(1,1,0,1),new Float32Array([1,1,0,1])],[di(1,1,1,0),new Float32Array([1,1,1,0])],[di(1,1,1,1),new Float32Array([1,1,1,1])]]);function qg(i,e,t){return i+(e-i)*t}function di(i,e,t,n){let r=qg(i,e,.75),s=qg(t,n,1-.25);return qg(r,s,1-.125)}var XR=`
	varying vec3 vDir;
	void main() {
		vDir = normalize( position );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`,YR=`
	uniform vec3 top;
	uniform vec3 horizon;
	uniform vec3 bottom;
	varying vec3 vDir;
	void main() {
		float y = vDir.y;
		vec3 c = y > 0.0 ? mix( horizon, top, pow( y, 0.7 ) ) : mix( horizon, bottom, pow( - y, 0.45 ) );
		gl_FragColor = vec4( c, 1.0 );
	}
`,bd=[],wd=[1,.965,.92],$y=[.94,.97,1],pr=[1,1,1],to={dome:{top:.6,horizon:.16,bottom:.04},cards:[[20,20,[0,28,0],2.6,pr],[12,26,[-22,8,14],2,$y],[12,26,[22,8,14],2,wd],[28,10,[0,10,-26],1.6,pr],[4,30,[-26,2,-8],2.8,pr],[4,30,[26,2,-8],2.8,pr],[7,44,[Math.cos(.8)*25,0,Math.sin(.8)*25],.02,pr],[7,44,[Math.cos(2.35)*25,0,Math.sin(2.35)*25],.02,pr],[7,44,[Math.cos(3.95)*25,0,Math.sin(3.95)*25],.02,pr],[7,44,[Math.cos(5.5)*25,0,Math.sin(5.5)*25],.02,pr],[9,18,[-25,4,6],.25,pr],[9,18,[25,4,-2],.25,pr],[40,5,[0,2,28],.3,pr]],spot:{dome:{top:.4,horizon:.09,bottom:.02},cards:[[9,9,4.6],[4,14,4.2],[4,14,4.2],[12,4,3.2],[1.6,22,7.5],[1.6,22,7.5],[7,44,.02],[7,44,.02],[7,44,.02],[7,44,.02],[9,18,.08],[9,18,.08],[18,2.5,.8]]}},xl=(i,e,t)=>new qe().setRGB(i,e,t,Ni);function e1(i,e,t,n){i.add(new Rt(new qa(60,64,32),new rt({vertexShader:XR,fragmentShader:YR,side:tn,depthWrite:!1,uniforms:{top:{value:e},horizon:{value:t},bottom:{value:n}}})))}function qr(i,e,t,n,r,s=pr,a=!1){let o=a?new Kc(e/2,64):new gs(e,t),l=new Xa({side:vn});l.color.setRGB(s[0]*r,s[1]*r,s[2]*r,Ni);let c=new Rt(o,l);return c.position.set(n[0],n[1],n[2]),c.lookAt(0,0,0),i.add(c),c}function qR(){let i=new br,e=to.dome;e1(i,xl(e.top,e.top,e.top),xl(e.horizon,e.horizon,e.horizon*1.03),xl(e.bottom,e.bottom,e.bottom*1.05));for(let t of to.cards)qr(i,...t);return i}function t1(i=.22){let e=new ui,t=to.spot,n=to.cards.map(([c,u,f,h,d,p],v)=>{e.position.set(...f),e.lookAt(0,0,0),e.updateMatrixWorld(!0);let g=new I().setFromMatrixColumn(e.matrixWorld,0).normalize(),m=new I().setFromMatrixColumn(e.matrixWorld,1).normalize(),x=new I().setFromMatrixColumn(e.matrixWorld,2).normalize(),_=new I(...f),[y,S,T]=t.cards[v];return{dist:_.length(),au:g,av:m,color:d,from:[c,u,h],to:[y,S,T],dir:_.clone().normalize(),c:new At(_.x,_.y,_.z,p?1:0),u:new At,v:new At,n:new At(x.x,x.y,x.z,_.dot(x)),col:new I}}).sort((c,u)=>u.dist-c.dist),r=to.dome,s=new I,a=(c,u,f)=>c+(u-c)*f,o=-1,l={count:n.length,c:n.map(c=>c.c),u:n.map(c=>c.u),v:n.map(c=>c.v),n:n.map(c=>c.n),col:n.map(c=>c.col),dome:s,mood(c){if(c=Math.max(0,Math.min(1,c)),Math.abs(c-o)<1e-4)return;o=c;let u=(f,h)=>f*Math.pow(h/f,c);for(let f of n){let h=u(f.from[0],f.to[0]),d=u(f.from[1],f.to[1]),p=a(f.from[2],f.to[2],c),v=a(i,.12,c);f.u.set(f.au.x/(h/2),f.au.y/(h/2),f.au.z/(h/2),v/(h/2)),f.v.set(f.av.x/(d/2),f.av.y/(d/2),f.av.z/(d/2),v/(d/2)),f.col.set(f.color[0]*p,f.color[1]*p,f.color[2]*p)}s.set(a(r.top,t.dome.top,c),a(r.horizon,t.dome.horizon,c),a(r.bottom,t.dome.bottom,c)),Kg(c)}};return l.mood(0),l}function Kg(i){if(bd.length=0,i<.05)return;let e=to.spot.cards;to.cards.forEach((t,n)=>{e[n][2]>=4&&bd.push({dir:new I(...t[2]).normalize(),power:i*e[n][2]/7.5})})}function QR(){let i=new br;return e1(i,xl(.85,.85,.86),xl(.5,.5,.51),xl(.26,.26,.27)),qr(i,26,14,[0,26,4],3.2,wd),qr(i,7,32,[-24,4,6],2.8,$y),qr(i,7,32,[24,4,-6],2.8,wd),qr(i,2.2,30,[-16,6,-20],4.5),qr(i,2.2,30,[16,6,20],4,wd),qr(i,12,8,[0,14,-24],2.4),qr(i,8,40,[-20,0,-14],.14),qr(i,8,40,[20,0,14],.14),qr(i,60,8,[0,-8,26],.16),i}function jy(i,e,t){let n=new pl(t,{type:hi,generateMipmaps:!1,minFilter:Vt,magFilter:Vt});return new ol(.1,200,n).update(i,e),n}function n1(i,{size:e=512,metal:t=512}={}){let n=jy(i,qR(),e),r=jy(i,QR(),t),s=new dl(i),a=s.fromCubemap(r.texture);s.dispose();let o=new et,l=new Je;return{cube:n.texture,bright:r.texture,env:a.texture,rotation:o,angle:0,setAngle(c){this.angle=c,o.setFromMatrix4(l.makeRotationY(-c))},dispose(){n.dispose(),r.dispose(),a.dispose()}}}var ZR=`
	uniform float time;
	uniform float scale;
	uniform vec3 centre;
	uniform vec3 lightDir;
	attribute vec4 seed;
	varying float vAlpha;
	void main() {
		// Each mote wanders on its own slow loop and rises, wrapping round the box.
		vec3 p = position;
		p.x += sin( time * ( 0.11 + seed.x * 0.08 ) + seed.y * 6.28 ) * 0.22;
		p.z += cos( time * ( 0.09 + seed.y * 0.07 ) + seed.z * 6.28 ) * 0.22;
		p.y = mod( p.y + time * ( 0.035 + seed.z * 0.05 ) + 2.4, 4.8 ) - 2.4;
		vec3 world = centre + p;
		// Brightest inside the beam (distance from its axis), fading out of it.
		vec3 rel = world - centre;
		float along = dot( rel, - lightDir );
		float off = length( rel + lightDir * along );
		float inBeam = 1.0 - smoothstep( 0.6, 2.6, off );
		float twinkle = 0.55 + 0.45 * sin( time * ( 0.8 + seed.w * 1.6 ) + seed.x * 40.0 );
		vec4 mv = modelViewMatrix * vec4( world, 1.0 );
		gl_Position = projectionMatrix * mv;
		float size = mix( 0.006, 0.022, seed.w * seed.w );
		// Never a blurry blob, even right in front of the lens.
		gl_PointSize = clamp( size * scale / - mv.z, 1.0, 7.0 );
		vAlpha = ( 0.18 + 0.82 * inBeam ) * twinkle * ( 0.35 + 0.65 * seed.w );
	}
`,KR=`
	uniform float strength;
	varying float vAlpha;
	void main() {
		float r = length( gl_PointCoord - 0.5 ) * 2.0;
		float a = smoothstep( 1.0, 0.0, r );
		a *= a;
		gl_FragColor = vec4( vec3( 1.0, 0.93, 0.8 ) * a * vAlpha * strength, 1.0 );
	}
`,JR=`
	varying vec3 vNormalW;
	varying vec3 vWorld;
	varying float vAlong;
	void main() {
		vAlong = uv.y;
		vec4 w = modelMatrix * vec4( position, 1.0 );
		vWorld = w.xyz;
		vNormalW = normalize( mat3( modelMatrix ) * normal );
		gl_Position = projectionMatrix * viewMatrix * w;
	}
`,jR=`
	uniform float strength;
	uniform vec3 tint;
	varying vec3 vNormalW;
	varying vec3 vWorld;
	varying float vAlong;
	void main() {
		// Thickest where the eye looks through the middle of the cone; soft at its edges and ends.
		vec3 v = normalize( cameraPosition - vWorld );
		float face = abs( dot( v, vNormalW ) );
		float a = pow( face, 2.2 );
		a *= smoothstep( 0.0, 0.35, vAlong ) * ( 1.0 - smoothstep( 0.82, 1.0, vAlong ) );
		gl_FragColor = vec4( tint * a * strength, 1.0 );
	}
`;function i1(i,{count:e=150}={}){let t=(()=>{let d=7;return()=>(d=d*16807%2147483647)/2147483647})(),n=new Float32Array(e*3),r=new Float32Array(e*4);for(let d=0;d<e;d++)n[d*3]=(t()-.5)*6.4,n[d*3+1]=(t()-.5)*4.8,n[d*3+2]=(t()-.5)*6.4,r.set([t(),t(),t(),t()],d*4);let s=new Lt;s.setAttribute("position",new ut(n,3)),s.setAttribute("seed",new ut(r,4));let a=new I(-.32,-1,.18).normalize(),o=new rt({vertexShader:ZR,fragmentShader:KR,transparent:!0,depthWrite:!1,blending:Js,uniforms:{time:{value:0},scale:{value:800},centre:{value:new I},lightDir:{value:a},strength:{value:0}}}),l=new qc(s,o);l.frustumCulled=!1,l.renderOrder=5,i.add(l);let c=7.5,u=new Jc(.12,1.15,c,64,1,!0);u.translate(0,c/2,0);let f=new rt({vertexShader:JR,fragmentShader:jR,transparent:!0,depthWrite:!1,blending:Js,side:ci,uniforms:{strength:{value:0},tint:{value:new qe(1,.9,.74).multiplyScalar(.07)}}}),h=new Rt(u,f);return h.frustumCulled=!1,h.renderOrder=4,h.quaternion.setFromUnitVectors(new I(0,1,0),a.clone().negate()),i.add(h),{update({time:d,centre:p,motes:v=0,beam:g=0,pxScale:m=800}){o.uniforms.time.value=d,o.uniforms.strength.value=v,o.uniforms.scale.value=m,o.uniforms.centre.value.copy(p),l.visible=v>.002,f.uniforms.strength.value=g,h.position.copy(p),h.visible=g>.002}}}var _l=Math.pow(2,-24),mu=Symbol("SKIP_GENERATION"),Cd={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[mu]:!1};function qt(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function gu(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let r=i[n+3]-i[n];r>t&&(t=r,e=n)}return e}function Jg(i,e){e.set(i)}function jg(i,e,t){let n,r;for(let s=0;s<3;s++){let a=s+3;n=i[s],r=e[s],t[s]=n<r?n:r,n=i[a],r=e[a],t[a]=n>r?n:r}}function vu(i,e,t){for(let n=0;n<3;n++){let r=e[i+2*n],s=e[i+2*n+1],a=r-s,o=r+s;a<t[n]&&(t[n]=a),o>t[n+3]&&(t[n+3]=o)}}function yl(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}function _t(i,e){return e[i+15]===65535}function bt(i,e){return e[i+6]}function Nt(i,e){return e[i+14]}function Dt(i){return i+8}function Pt(i,e){let t=e[i+6];return i+t*8}function la(i,e){return e[i+7]}function Rd(i,e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0,f=1/0,h=1/0,d=1/0,p=-1/0,v=-1/0,g=-1/0,m=i.offset||0;for(let x=(e-m)*6,_=(e+t-m)*6;x<_;x+=6){let y=i[x+0],S=i[x+1],T=y-S,E=y+S;T<s&&(s=T),E>l&&(l=E),y<f&&(f=y),y>p&&(p=y);let A=i[x+2],M=i[x+3],C=A-M,R=A+M;C<a&&(a=C),R>c&&(c=R),A<h&&(h=A),A>v&&(v=A);let w=i[x+4],P=i[x+5],U=w-P,N=w+P;U<o&&(o=U),N>u&&(u=N),w<d&&(d=w),w>g&&(g=w)}n[0]=s,n[1]=a,n[2]=o,n[3]=l,n[4]=c,n[5]=u,r[0]=f,r[1]=h,r[2]=d,r[3]=p,r[4]=v,r[5]=g}var _s=32,tD=(i,e)=>i.candidate-e.candidate,ca=new Array(_s).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Dd=new Float32Array(6);function s1(i,e,t,n,r,s){let a=-1,o=0;if(s===0)a=gu(e),a!==-1&&(o=(e[a]+e[a+3])/2);else if(s===1)a=gu(i),a!==-1&&(o=nD(t,n,r,a));else if(s===2){let l=yl(i),c=1.25*r,u=t.offset||0,f=(n-u)*6,h=(n+r-u)*6;for(let d=0;d<3;d++){let p=e[d],m=(e[d+3]-p)/_s;if(r<_s/4){let x=[...ca];x.length=r;let _=0;for(let S=f;S<h;S+=6,_++){let T=x[_];T.candidate=t[S+2*d],T.count=0;let{bounds:E,leftCacheBounds:A,rightCacheBounds:M}=T;for(let C=0;C<3;C++)M[C]=1/0,M[C+3]=-1/0,A[C]=1/0,A[C+3]=-1/0,E[C]=1/0,E[C+3]=-1/0;vu(S,t,E)}x.sort(tD);let y=r;for(let S=0;S<y;S++){let T=x[S];for(;S+1<y&&x[S+1].candidate===T.candidate;)x.splice(S+1,1),y--}for(let S=f;S<h;S+=6){let T=t[S+2*d];for(let E=0;E<y;E++){let A=x[E];T>=A.candidate?vu(S,t,A.rightCacheBounds):(vu(S,t,A.leftCacheBounds),A.count++)}}for(let S=0;S<y;S++){let T=x[S],E=T.count,A=r-T.count,M=T.leftCacheBounds,C=T.rightCacheBounds,R=0;E!==0&&(R=yl(M)/l);let w=0;A!==0&&(w=yl(C)/l);let P=1+1.25*(R*E+w*A);P<c&&(a=d,c=P,o=T.candidate)}}else{for(let y=0;y<_s;y++){let S=ca[y];S.count=0,S.candidate=p+m+y*m;let T=S.bounds;for(let E=0;E<3;E++)T[E]=1/0,T[E+3]=-1/0}for(let y=f;y<h;y+=6){let E=~~((t[y+2*d]-p)/m);E>=_s&&(E=_s-1);let A=ca[E];A.count++,vu(y,t,A.bounds)}let x=ca[_s-1];Jg(x.bounds,x.rightCacheBounds);for(let y=_s-2;y>=0;y--){let S=ca[y],T=ca[y+1];jg(S.bounds,T.rightCacheBounds,S.rightCacheBounds)}let _=0;for(let y=0;y<_s-1;y++){let S=ca[y],T=S.count,E=S.bounds,M=ca[y+1].rightCacheBounds;T!==0&&(_===0?Jg(E,Dd):jg(E,Dd,Dd)),_+=T;let C=0,R=0;_!==0&&(C=yl(Dd)/l);let w=r-_;w!==0&&(R=yl(M)/l);let P=1+1.25*(C*_+R*w);P<c&&(a=d,c=P,o=S.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:a,pos:o}}function nD(i,e,t,n){let r=0,s=i.offset;for(let a=e,o=e+t;a<o;a++)r+=i[(a-s)*6+n*2];return r/t}var Al=class{constructor(){this.boundingData=new Float32Array(6)}};function a1(i,e,t,n,r,s){let a=n,o=n+r-1,l=s.pos,c=s.axis*2,u=t.offset||0;for(;;){for(;a<=o&&t[(a-u)*6+c]<l;)a++;for(;a<=o&&t[(o-u)*6+c]>=l;)o--;if(a<o){for(let f=0;f<e;f++){let h=i[a*e+f];i[a*e+f]=i[o*e+f],i[o*e+f]=h}for(let f=0;f<6;f++){let h=a-u,d=o-u,p=t[h*6+f];t[h*6+f]=t[d*6+f],t[d*6+f]=p}a++,o--}else return a}}var o1,Id,$g,l1,iD=Math.pow(2,32);function Bd(i){return"count"in i?1:1+Bd(i.left)+Bd(i.right)}function c1(i,e,t){return o1=new Float32Array(t),Id=new Uint32Array(t),$g=new Uint16Array(t),l1=new Uint8Array(t),e0(i,e)}function e0(i,e){let t=i/4,n=i/2,r="count"in e,s=e.boundingData;for(let a=0;a<6;a++)o1[t+a]=s[a];if(r)return e.buffer?(l1.set(new Uint8Array(e.buffer),i),i+e.buffer.byteLength):(Id[t+6]=e.offset,$g[n+14]=e.count,$g[n+15]=65535,i+32);{let{left:a,right:o,splitAxis:l}=e,c=i+32,u=e0(c,a),f=i/32,d=u/32-f;if(d>iD)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Id[t+6]=d,Id[t+7]=l,e0(u,o)}}function rD(i,e,t,n,r,s){let{maxDepth:a,verbose:o,targetLeafSize:l,_strictLeafSize:c=1/0,strategy:u,onProgress:f}=r,h=i.primitiveBuffer,d=i.primitiveBufferStride,p=new Float32Array(6),v=!1,g=new Al;return Rd(e,t,n,g.boundingData,p),x(g,t,n,p),g;function m(_){f&&f((_-s.offset)/s.count)}function x(_,y,S,T=null,E=0){!v&&E>=a&&(v=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));let A=S>c;if(S<=l&&!A||E>=a)return m(y+S),_.offset=y,_.count=S,_;let M=s1(_.boundingData,T,e,y,S,u),C=M.axis===-1?-1:a1(h,d,e,y,S,M);if(M.axis===-1||C===y||C===y+S){if(!A)return m(y+S),_.offset=y,_.count=S,_;M.axis=Math.max(0,gu(_.boundingData)),C=y+Math.max(1,Math.floor(S/2))}_.splitAxis=M.axis;let R=new Al,w=y,P=C-y;_.left=R,Rd(e,w,P,R.boundingData,p),x(R,w,P,p,E+1);let U=new Al,N=C,H=S-P;return _.right=U,Rd(e,N,H,U.boundingData,p),x(U,N,H,p,E+1),_}}function u1(i,e){let t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(e.range),r=n[0],s=n[n.length-1],a={offset:r.offset,count:s.offset+s.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,i.computePrimitiveBounds(a.offset,a.count,o),i._roots=n.map(l=>{let c=rD(i,o,l.offset,l.count,e,a),u=Bd(c),f=new t(32*u);return c1(0,c,f),f})}var ua=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var t0=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Mt=new t0;var ha,Ml,Sl=[],Ud=new ua(()=>new Kt);function h1(i,e,t,n,r,s){ha=Ud.getPrimitive(),Ml=Ud.getPrimitive(),Sl.push(ha,Ml),Mt.setBuffer(i._roots[e]);let a=n0(0,i.geometry,t,n,r,s);Mt.clearBuffer(),Ud.releasePrimitive(ha),Ud.releasePrimitive(Ml),Sl.pop(),Sl.pop();let o=Sl.length;return o>0&&(Ml=Sl[o-1],ha=Sl[o-2]),a}function n0(i,e,t,n,r=null,s=0,a=0){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=bt(i,c),d=Nt(u,l);return qt(i,o,ha),n(h,d,!1,a,s+i/8,ha)}else{let C=function(w){let{uint16Array:P,uint32Array:U}=Mt,N=w*2;for(;!_t(N,P);)w=Dt(w),N=w*2;return bt(w,U)},R=function(w){let{uint16Array:P,uint32Array:U}=Mt,N=w*2;for(;!_t(N,P);)w=Pt(w,U),N=w*2;return bt(w,U)+Nt(N,P)},h=Dt(i),d=Pt(i,c),p=h,v=d,g,m,x,_;if(r&&(x=ha,_=Ml,qt(p,o,x),qt(v,o,_),g=r(x),m=r(_),m<g)){p=d,v=h;let w=g;g=m,m=w,x=_}x||(x=ha,qt(p,o,x));let y=_t(p*2,l),S=t(x,y,g,a+1,s+p/8),T;if(S===2){let w=C(p),U=R(p)-w;T=n(w,U,!0,a+1,s+p/8,x)}else T=S&&n0(p,e,t,n,r,s,a+1);if(T)return!0;_=Ml,qt(v,o,_);let E=_t(v*2,l),A=t(_,E,m,a+1,s+v/8),M;if(A===2){let w=C(v),U=R(v)-w;M=n(w,U,!0,a+1,s+v/8,_)}else M=A&&n0(v,e,t,n,r,s,a+1);return!!M}}var xu=new Mt.constructor,Fd=new Mt.constructor,fa=new ua(()=>new Kt),Tl=new Kt,El=new Kt,i0=new Kt,r0=new Kt,s0=!1;function f1(i,e,t,n){if(s0)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");s0=!0;let r=i._roots,s=e._roots,a,o=0,l=0,c=new Je().copy(t).invert();for(let u=0,f=r.length;u<f;u++){xu.setBuffer(r[u]),l=0;let h=fa.getPrimitive();qt(0,xu.float32Array,h),h.applyMatrix4(c);for(let d=0,p=s.length;d<p&&(Fd.setBuffer(s[d]),a=Rr(0,0,t,c,n,o,l,0,0,h),Fd.clearBuffer(),l+=s[d].byteLength/32,!a);d++);if(fa.releasePrimitive(h),xu.clearBuffer(),o+=r[u].byteLength/32,a)break}return s0=!1,a}function Rr(i,e,t,n,r,s=0,a=0,o=0,l=0,c=null,u=!1){let f,h;u?(f=Fd,h=xu):(f=xu,h=Fd);let d=f.float32Array,p=f.uint32Array,v=f.uint16Array,g=h.float32Array,m=h.uint32Array,x=h.uint16Array,_=i*2,y=e*2,S=_t(_,v),T=_t(y,x),E=!1;if(T&&S)u?E=r(bt(e,m),Nt(e*2,x),bt(i,p),Nt(i*2,v),l,a+e/8,o,s+i/8):E=r(bt(i,p),Nt(i*2,v),bt(e,m),Nt(e*2,x),o,s+i/8,l,a+e/8);else if(T){let A=fa.getPrimitive();qt(e,g,A),A.applyMatrix4(t);let M=Dt(i),C=Pt(i,p);qt(M,d,Tl),qt(C,d,El);let R=A.intersectsBox(Tl),w=A.intersectsBox(El);E=R&&Rr(e,M,n,t,r,a,s,l,o+1,A,!u)||w&&Rr(e,C,n,t,r,a,s,l,o+1,A,!u),fa.releasePrimitive(A)}else{let A=Dt(e),M=Pt(e,m);qt(A,g,i0),qt(M,g,r0);let C=c.intersectsBox(i0),R=c.intersectsBox(r0);if(C&&R)E=Rr(i,A,t,n,r,s,a,o,l+1,c,u)||Rr(i,M,t,n,r,s,a,o,l+1,c,u);else if(C)if(S)E=Rr(i,A,t,n,r,s,a,o,l+1,c,u);else{let w=fa.getPrimitive();w.copy(i0).applyMatrix4(t);let P=Dt(i),U=Pt(i,p);qt(P,d,Tl),qt(U,d,El);let N=w.intersectsBox(Tl),H=w.intersectsBox(El);E=N&&Rr(A,P,n,t,r,a,s,l,o+1,w,!u)||H&&Rr(A,U,n,t,r,a,s,l,o+1,w,!u),fa.releasePrimitive(w)}else if(R)if(S)E=Rr(i,M,t,n,r,s,a,o,l+1,c,u);else{let w=fa.getPrimitive();w.copy(r0).applyMatrix4(t);let P=Dt(i),U=Pt(i,p);qt(P,d,Tl),qt(U,d,El);let N=w.intersectsBox(Tl),H=w.intersectsBox(El);E=N&&Rr(M,P,n,t,r,a,s,l,o+1,w,!u)||H&&Rr(M,U,n,t,r,a,s,l,o+1,w,!u),fa.releasePrimitive(w)}}return E}var Nd=new class{constructor(){let i=null,e=null,t=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,a)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=i=s._roots[a],this.uint16Array=t=new Uint16Array(i),this.uint32Array=e=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=s=>{let a=s*2;for(;!_t(a,t);)s=Dt(s),a=s*2;return bt(s,e)},this.getRangeEnd=s=>{let a=s*2;for(;!_t(a,t);)s=Pt(s,e),a=s*2;return bt(s,e)+Nt(a,t)};let r=(s,a,o)=>{let l=a*2,c=_t(l,t);if(!s(o,c,a)&&!c){let f=Dt(a),h=Pt(a,e);r(s,f,o+1),r(s,h,o+1)}};this.traverseBuffer=s=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{r(s,0,0)}finally{n=!1}},this.traverse=s=>{this.traverseBuffer((a,o,l)=>{if(o){let c=l*2,u=e[l+6],f=t[c+14];return s(a,o,new Float32Array(i,l*4,6),u,f)}else{let c=la(l,e);return s(a,o,new Float32Array(i,l*4,6),c)}})}}};var d1=new Kt,wl=new Float32Array(6),Od=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Cd,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),u1(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0;for(let f=e,h=e+t;f<h;f++){this.writePrimitiveBounds(f,wl,0);let[d,p,v,g,m,x]=wl;d<s&&(s=d),g>l&&(l=g),p<a&&(a=p),m>c&&(c=m),v<o&&(o=v),x>u&&(u=x)}return n[r+0]=s,n[r+1]=a,n[r+2]=o,n[r+3]=l,n[r+4]=c,n[r+5]=u,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let s=e,a=e+t;s<a;s++){this.writePrimitiveBounds(s,wl,0);let[o,l,c,u,f,h]=wl,d=(o+u)/2,p=(l+f)/2,v=(c+h)/2,g=(u-o)/2,m=(f-l)/2,x=(h-c)/2,_=(s-r)*6;n[_+0]=d,n[_+1]=g+(Math.abs(d)+g)*_l,n[_+2]=p,n[_+3]=m+(Math.abs(p)+m)*_l,n[_+4]=v,n[_+5]=x+(Math.abs(v)+x)*_l}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t)for(let n=0,r=t.length;n<r;n++)t[n]+=e;else{let n=this._roots;for(let r=0;r<n.length;r++){let s=n[r],a=new Uint32Array(s),o=new Uint16Array(s),l=s.byteLength/32;for(let c=0;c<l;c++){let u=8*c,f=2*u;_t(f,o)&&(a[u+6]+=e)}}}}traverse(e,t=0){Nd.setBVH(this,t),Nd.traverse(e),Nd.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let r=e[t],s=new Uint32Array(r),a=new Uint16Array(r),o=new Float32Array(r),l=r.byteLength/32;for(let c=l-1;c>=0;c--){let u=c*8,f=u*2;if(_t(f,a)){let d=bt(u,s),p=Nt(f,a);this.writePrimitiveRangeBounds(d,p,wl,0),o.set(wl,u)}else{let d=Dt(u),p=Pt(u,s);for(let v=0;v<3;v++){let g=o[d+v],m=o[d+v+3],x=o[p+v],_=o[p+v+3];o[u+v]=g<x?g:x,o[u+v+3]=m>_?m:_}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{qt(0,new Float32Array(n),d1),e.union(d1)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:s,scratchPrimitive:a,iterate:o}=e;if(r&&s){let f=r;r=(h,d,p,v,g)=>f(h,d,p,v,g)?!0:o(h,d,this,s,p,v,a)}else r||(s?r=(f,h,d,p)=>o(f,h,this,s,d,p,a):r=(f,h,d)=>d);let l=!1,c=0,u=this._roots;for(let f=0,h=u.length;f<h;f++){let d=u[f];if(l=h1(this,f,n,r,t,c),l)break;c+=d.byteLength/32}return l}bvhcast(e,t,n){let{intersectsRanges:r}=n;return f1(this,e,t,r)}};function p1(){return typeof SharedArrayBuffer<"u"}function _u(i){return i.index?i.index.count:i.attributes.position.count}function da(i){return _u(i)/3}function a0(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function m1(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=a0(t,n);i.setIndex(new ut(r,1));for(let s=0;s<t;s++)r[s]=s}}function aD(i,e,t){let n=_u(i)/t,r=e||i.drawRange,s=r.start/t,a=(r.start+r.count)/t,o=Math.max(0,s),l=Math.min(n,a)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function oD(i,e){return i.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function o0(i,e,t){let n=aD(i,e,t),r=oD(i,t);if(!r.length)return[n];let s=[],a=n.offset,o=n.offset+n.count,l=_u(i)/t,c=[];for(let h of r){let{offset:d,count:p}=h,v=d,g=isFinite(p)?p:l-d,m=d+g;v<o&&m>a&&(c.push({pos:Math.max(a,v),isStart:!0}),c.push({pos:Math.min(o,m),isStart:!1}))}c.sort((h,d)=>h.pos!==d.pos?h.pos-d.pos:h.type==="end"?-1:1);let u=0,f=null;for(let h of c){let d=h.pos;u!==0&&d!==f&&s.push({offset:f,count:d-f}),u+=h.isStart?1:-1,f=d}return s}function lD(i,e){let t=i[i.length-1],n=t.offset+t.count>2**16,r=i.reduce((c,u)=>c+u.count,0),s=n?4:2,a=e?new SharedArrayBuffer(r*s):new ArrayBuffer(r*s),o=n?new Uint32Array(a):new Uint16Array(a),l=0;for(let c=0;c<i.length;c++){let{offset:u,count:f}=i[c];for(let h=0;h<f;h++)o[l+h]=u+h;l+=f}return o}var zd=class extends Od{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!p1())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Cd,...t},t[mu]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=o0(t,e.range,n),s=lD(r,e.useSharedArrayBuffer);this._indirectBuffer=s}else m1(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new Kt))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:o0(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var tr=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let s=0,a=e.length;s<a;s++){let l=e[s][t];n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let s=0,a=t.length;s<a;s++){let o=t[s],l=e.dot(o);n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};tr.prototype.setFromBox=function(){let i=new I;return function(t,n){let r=n.min,s=n.max,a=1/0,o=-1/0;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){i.x=r.x*l+s.x*(1-l),i.y=r.y*c+s.y*(1-c),i.z=r.z*u+s.z*(1-u);let f=t.dot(i);a=Math.min(f,a),o=Math.max(f,o)}this.min=a,this.max=o}}();var cD=function(){let i=new I,e=new I,t=new I;return function(r,s,a){let o=r.start,l=i,c=s.start,u=e;t.subVectors(o,c),i.subVectors(r.end,r.start),e.subVectors(s.end,s.start);let f=t.dot(u),h=u.dot(l),d=u.dot(u),p=t.dot(l),g=l.dot(l)*d-h*h,m,x;g!==0?m=(f*h-p*d)/g:m=0,x=(f+m*h)/d,a.x=m,a.y=x}}(),yu=function(){let i=new Ce,e=new I,t=new I;return function(r,s,a,o){cD(r,s,i);let l=i.x,c=i.y;if(l>=0&&l<=1&&c>=0&&c<=1){r.at(l,a),s.at(c,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else{let u;l<0?u=r.start:u=r.end;let f;c<0?f=s.start:f=s.end;let h=e,d=t;if(r.closestPointToPoint(f,!0,e),s.closestPointToPoint(u,!0,t),h.distanceToSquared(f)<=d.distanceToSquared(u)){a.copy(h),o.copy(f);return}else{a.copy(u),o.copy(d);return}}}}(),g1=function(){let i=new I,e=new I,t=new Fi,n=new Ei;return function(s,a){let{radius:o,center:l}=s,{a:c,b:u,c:f}=a;if(n.start=c,n.end=u,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o||(n.start=c,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o)||(n.start=u,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o))return!0;let v=a.getPlane(t);if(Math.abs(v.distanceToPoint(l))<=o){let m=v.projectPoint(l,e);if(a.containsPoint(m))return!0}return!1}}();var uD=["x","y","z"],ys=1e-15,v1=ys*ys;function mr(i){return Math.abs(i)<ys}var Zn=class extends Yn{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new I),this.satBounds=new Array(4).fill().map(()=>new tr),this.points=[this.a,this.b,this.c],this.plane=new Fi,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Ei,this.needsUpdate=!0}intersectsSphere(e){return g1(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,s=this.satAxes,a=this.satBounds,o=s[0],l=a[0];this.getNormal(o),l.setFromPoints(o,r);let c=s[1],u=a[1];c.subVectors(e,t),u.setFromPoints(c,r);let f=s[2],h=a[2];f.subVectors(t,n),h.setFromPoints(f,r);let d=s[3],p=a[3];d.subVectors(n,e),p.setFromPoints(d,r);let v=c.length(),g=f.length(),m=d.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,v<ys?g<ys||m<ys?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):g<ys?m<ys?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):m<ys&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Zn.prototype.closestPointToSegment=function(){let i=new I,e=new I,t=new Ei;return function(r,s=null,a=null){let{start:o,end:l}=r,c=this.points,u,f=1/0;for(let h=0;h<3;h++){let d=(h+1)%3;t.start.copy(c[h]),t.end.copy(c[d]),yu(t,r,i,e),u=i.distanceToSquared(e),u<f&&(f=u,s&&s.copy(i),a&&a.copy(e))}return this.closestPointToPoint(o,i),u=o.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(o)),this.closestPointToPoint(l,i),u=l.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(l)),Math.sqrt(f)}}();Zn.prototype.intersectsTriangle=function(){let i=new Zn,e=new tr,t=new tr,n=new I,r=new I,s=new I,a=new I,o=new Ei,l=new Ei,c=new I,u=new Ce,f=new Ce;function h(_,y,S,T){let E=n;!_.isDegenerateIntoPoint&&!_.isDegenerateIntoSegment?E.copy(_.plane.normal):E.copy(y.plane.normal);let A=_.satBounds,M=_.satAxes;for(let w=1;w<4;w++){let P=A[w],U=M[w];if(e.setFromPoints(U,y.points),P.isSeparated(e)||(a.copy(E).cross(U),e.setFromPoints(a,_.points),t.setFromPoints(a,y.points),e.isSeparated(t)))return!1}let C=y.satBounds,R=y.satAxes;for(let w=1;w<4;w++){let P=C[w],U=R[w];if(e.setFromPoints(U,_.points),P.isSeparated(e)||(a.crossVectors(E,U),e.setFromPoints(a,_.points),t.setFromPoints(a,y.points),e.isSeparated(t)))return!1}return S&&(T||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),S.start.set(0,0,0),S.end.set(0,0,0)),!0}function d(_,y,S,T,E,A,M,C,R,w,P){let U=M/(M-C);w.x=T+(E-T)*U,P.start.subVectors(y,_).multiplyScalar(U).add(_),U=M/(M-R),w.y=T+(A-T)*U,P.end.subVectors(S,_).multiplyScalar(U).add(_)}function p(_,y,S,T,E,A,M,C,R,w,P){if(E>0)d(_.c,_.a,_.b,T,y,S,R,M,C,w,P);else if(A>0)d(_.b,_.a,_.c,S,y,T,C,M,R,w,P);else if(C*R>0||M!=0)d(_.a,_.b,_.c,y,S,T,M,C,R,w,P);else if(C!=0)d(_.b,_.a,_.c,S,y,T,C,M,R,w,P);else if(R!=0)d(_.c,_.a,_.b,T,y,S,R,M,C,w,P);else return!0;return!1}function v(_,y,S,T){let E=y.degenerateSegment,A=_.plane.distanceToPoint(E.start),M=_.plane.distanceToPoint(E.end);return mr(A)?mr(M)?h(_,y,S,T):(S&&(S.start.copy(E.start),S.end.copy(E.start)),_.containsPoint(E.start)):mr(M)?(S&&(S.start.copy(E.end),S.end.copy(E.end)),_.containsPoint(E.end)):_.plane.intersectLine(E,n)!=null?(S&&(S.start.copy(n),S.end.copy(n)),_.containsPoint(n)):!1}function g(_,y,S){let T=y.a;return mr(_.plane.distanceToPoint(T))&&_.containsPoint(T)?(S&&(S.start.copy(T),S.end.copy(T)),!0):!1}function m(_,y,S){let T=_.degenerateSegment,E=y.a;return T.closestPointToPoint(E,!0,n),E.distanceToSquared(n)<v1?(S&&(S.start.copy(E),S.end.copy(E)),!0):!1}function x(_,y,S,T){if(_.isDegenerateIntoSegment)if(y.isDegenerateIntoSegment){let E=_.degenerateSegment,A=y.degenerateSegment,M=r,C=s;E.delta(M),A.delta(C);let R=n.subVectors(A.start,E.start),w=M.x*C.y-M.y*C.x;if(mr(w))return!1;let P=(R.x*C.y-R.y*C.x)/w,U=-(M.x*R.y-M.y*R.x)/w;if(P<0||P>1||U<0||U>1)return!1;let N=E.start.z+M.z*P,H=A.start.z+C.z*U;return mr(N-H)?(S&&(S.start.copy(E.start).addScaledVector(M,P),S.end.copy(E.start).addScaledVector(M,P)),!0):!1}else return y.isDegenerateIntoPoint?m(_,y,S):v(y,_,S,T);else{if(_.isDegenerateIntoPoint)return y.isDegenerateIntoPoint?y.a.distanceToSquared(_.a)<v1?(S&&(S.start.copy(_.a),S.end.copy(_.a)),!0):!1:y.isDegenerateIntoSegment?m(y,_,S):g(y,_,S);if(y.isDegenerateIntoPoint)return g(_,y,S);if(y.isDegenerateIntoSegment)return v(_,y,S,T)}}return function(y,S=null,T=!1){this.needsUpdate&&this.update(),y.isExtendedTriangle?y.needsUpdate&&y.update():(i.copy(y),i.update(),y=i);let E=x(this,y,S,T);if(E!==void 0)return E;let A=this.plane,M=y.plane,C=M.distanceToPoint(this.a),R=M.distanceToPoint(this.b),w=M.distanceToPoint(this.c);mr(C)&&(C=0),mr(R)&&(R=0),mr(w)&&(w=0);let P=C*R,U=C*w;if(P>0&&U>0)return!1;let N=A.distanceToPoint(y.a),H=A.distanceToPoint(y.b),k=A.distanceToPoint(y.c);mr(N)&&(N=0),mr(H)&&(H=0),mr(k)&&(k=0);let te=N*H,K=N*k;if(te>0&&K>0)return!1;r.copy(A.normal),s.copy(M.normal);let L=r.cross(s),oe=0,ce=Math.abs(L.x),Ie=Math.abs(L.y);Ie>ce&&(ce=Ie,oe=1),Math.abs(L.z)>ce&&(oe=2);let be=uD[oe],Z=this.a[be],le=this.b[be],G=this.c[be],ue=y.a[be],Q=y.b[be],de=y.c[be];if(p(this,Z,le,G,P,U,C,R,w,u,o))return h(this,y,S,T);if(p(y,ue,Q,de,te,K,N,H,k,f,l))return h(this,y,S,T);if(u.y<u.x){let Se=u.y;u.y=u.x,u.x=Se,c.copy(o.start),o.start.copy(o.end),o.end.copy(c)}if(f.y<f.x){let Se=f.y;f.y=f.x,f.x=Se,c.copy(l.start),l.start.copy(l.end),l.end.copy(c)}return u.y<f.x||f.y<u.x?!1:(S&&(f.x>u.x?S.start.copy(l.start):S.start.copy(o.start),f.y<u.y?S.end.copy(l.end):S.end.copy(o.end)),!0)}}();Zn.prototype.distanceToPoint=function(){let i=new I;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();Zn.prototype.distanceToTriangle=function(){let i=new I,e=new I,t=["a","b","c"],n=new Ei,r=new Ei;return function(a,o=null,l=null){let c=o||l?n:null;if(this.intersectsTriangle(a,c,!0))return(o||l)&&(o&&c.getCenter(o),l&&c.getCenter(l)),0;let u=1/0;for(let f=0;f<3;f++){let h,d=t[f],p=a[d];this.closestPointToPoint(p,i),h=p.distanceToSquared(i),h<u&&(u=h,o&&o.copy(i),l&&l.copy(p));let v=this[d];a.closestPointToPoint(v,i),h=v.distanceToSquared(i),h<u&&(u=h,o&&o.copy(v),l&&l.copy(i))}for(let f=0;f<3;f++){let h=t[f],d=t[(f+1)%3];n.set(this[h],this[d]);for(let p=0;p<3;p++){let v=t[p],g=t[(p+1)%3];r.set(a[v],a[g]),yu(n,r,i,e);let m=i.distanceToSquared(e);m<u&&(u=m,o&&o.copy(i),l&&l.copy(e))}}return Math.sqrt(u)}}();var dn=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new I,this.max=new I,this.matrix=new Je,this.invMatrix=new Je,this.points=new Array(8).fill().map(()=>new I),this.satAxes=new Array(3).fill().map(()=>new I),this.satBounds=new Array(3).fill().map(()=>new tr),this.alignedSatBounds=new Array(3).fill().map(()=>new tr),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};dn.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){let h=1*c|2*u|4*f,d=r[h];d.x=c?n.x:t.x,d.y=u?n.y:t.y,d.z=f?n.z:t.z,d.applyMatrix4(e)}let s=this.satBounds,a=this.satAxes,o=r[0];for(let c=0;c<3;c++){let u=a[c],f=s[c],h=1<<c,d=r[h];u.subVectors(o,d),f.setFromPoints(u,r)}let l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();dn.prototype.intersectsBox=function(){let i=new tr;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,s=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(i.min=n.x,i.max=r.x,o[0].isSeparated(i)||(i.min=n.y,i.max=r.y,o[1].isSeparated(i))||(i.min=n.z,i.max=r.z,o[2].isSeparated(i)))return!1;for(let l=0;l<3;l++){let c=a[l],u=s[l];if(i.setFromBox(c,t),u.isSeparated(i))return!1}return!0}}();dn.prototype.intersectsTriangle=function(){let i=new Zn,e=new Array(3),t=new tr,n=new tr,r=new I;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(i.copy(a),i.update(),a=i);let o=this.satBounds,l=this.satAxes;e[0]=a.a,e[1]=a.b,e[2]=a.c;for(let h=0;h<3;h++){let d=o[h],p=l[h];if(t.setFromPoints(p,e),d.isSeparated(t))return!1}let c=a.satBounds,u=a.satAxes,f=this.points;for(let h=0;h<3;h++){let d=c[h],p=u[h];if(t.setFromPoints(p,f),d.isSeparated(t))return!1}for(let h=0;h<3;h++){let d=l[h];for(let p=0;p<4;p++){let v=u[p];if(r.crossVectors(d,v),t.setFromPoints(r,e),n.setFromPoints(r,f),t.isSeparated(n))return!1}}return!0}}();dn.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();dn.prototype.distanceToPoint=function(){let i=new I;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();dn.prototype.distanceToBox=function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new Ei),t=new Array(12).fill().map(()=>new Ei),n=new I,r=new I;return function(a,o=0,l=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(l||c)&&(a.getCenter(r),this.closestPointToPoint(r,n),a.closestPointToPoint(n,r),l&&l.copy(n),c&&c.copy(r)),0;let u=o*o,f=a.min,h=a.max,d=this.points,p=1/0;for(let g=0;g<8;g++){let m=d[g];r.copy(m).clamp(f,h);let x=m.distanceToSquared(r);if(x<p&&(p=x,l&&l.copy(m),c&&c.copy(r),x<u))return Math.sqrt(x)}let v=0;for(let g=0;g<3;g++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){let _=(g+1)%3,y=(g+2)%3,S=m<<_|x<<y,T=1<<g|m<<_|x<<y,E=d[S],A=d[T];e[v].set(E,A);let C=i[g],R=i[_],w=i[y],P=t[v],U=P.start,N=P.end;U[C]=f[C],U[R]=m?f[R]:h[R],U[w]=x?f[w]:h[R],N[C]=h[C],N[R]=m?f[R]:h[R],N[w]=x?f[w]:h[R],v++}for(let g=0;g<=1;g++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){r.x=g?h.x:f.x,r.y=m?h.y:f.y,r.z=x?h.z:f.z,this.closestPointToPoint(r,n);let _=r.distanceToSquared(n);if(_<p&&(p=_,l&&l.copy(n),c&&c.copy(r),_<u))return Math.sqrt(_)}for(let g=0;g<12;g++){let m=e[g];for(let x=0;x<12;x++){let _=t[x];yu(m,_,n,r);let y=n.distanceToSquared(r);if(y<p&&(p=y,l&&l.copy(n),c&&c.copy(r),y<u))return Math.sqrt(y)}}return Math.sqrt(p)}}();var l0=class extends ua{constructor(){super(()=>new Zn)}},Di=new l0;var Au=new I,c0=new I;function x1(i,e,t={},n=0,r=1/0){let s=n*n,a=r*r,o=1/0,l=null;if(i.shapecast({boundsTraverseOrder:u=>(Au.copy(e).clamp(u.min,u.max),Au.distanceToSquared(e)),intersectsBounds:(u,f,h)=>h<o&&h<a,intersectsTriangle:(u,f)=>{u.closestPointToPoint(e,Au);let h=e.distanceToSquared(Au);return h<o&&(c0.copy(Au),o=h,l=f),h<s}}),o===1/0)return null;let c=Math.sqrt(o);return t.point?t.point.copy(c0):t.point=c0.clone(),t.distance=c,t.faceIndex=l,t}var kd=parseInt(Qn)>=169,hD=parseInt(Qn)<=161,no=new I,io=new I,ro=new I,Hd=new Ce,Gd=new Ce,Vd=new Ce,_1=new I,y1=new I,A1=new I,Su=new I;function fD(i,e,t,n,r,s,a,o){let l;if(s===tn?l=i.intersectTriangle(n,t,e,!0,r):l=i.intersectTriangle(e,t,n,s!==vn,r),l===null)return null;let c=i.origin.distanceTo(r);return c<a||c>o?null:{distance:c,point:r.clone()}}function S1(i,e,t,n,r,s,a,o,l,c,u){no.fromBufferAttribute(e,s),io.fromBufferAttribute(e,a),ro.fromBufferAttribute(e,o);let f=fD(i,no,io,ro,Su,l,c,u);if(f){if(n){Hd.fromBufferAttribute(n,s),Gd.fromBufferAttribute(n,a),Vd.fromBufferAttribute(n,o),f.uv=new Ce;let d=Yn.getInterpolation(Su,no,io,ro,Hd,Gd,Vd,f.uv);kd||(f.uv=d)}if(r){Hd.fromBufferAttribute(r,s),Gd.fromBufferAttribute(r,a),Vd.fromBufferAttribute(r,o),f.uv1=new Ce;let d=Yn.getInterpolation(Su,no,io,ro,Hd,Gd,Vd,f.uv1);kd||(f.uv1=d),hD&&(f.uv2=f.uv1)}if(t){_1.fromBufferAttribute(t,s),y1.fromBufferAttribute(t,a),A1.fromBufferAttribute(t,o),f.normal=new I;let d=Yn.getInterpolation(Su,no,io,ro,_1,y1,A1,f.normal);f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1),kd||(f.normal=d)}let h={a:s,b:a,c:o,normal:new I,materialIndex:0};if(Yn.getNormal(no,io,ro,h.normal),f.face=h,f.faceIndex=s,kd){let d=new I;Yn.getBarycoord(Su,no,io,ro,d),f.barycoord=d}}return f}function M1(i){return i&&i.isMaterial?i.side:i}function bl(i,e,t,n,r,s,a){let o=n*3,l=o+0,c=o+1,u=o+2,{index:f,groups:h}=i;i.index&&(l=f.getX(l),c=f.getX(c),u=f.getX(u));let{position:d,normal:p,uv:v,uv1:g}=i.attributes;if(Array.isArray(e)){let m=n*3;for(let x=0,_=h.length;x<_;x++){let{start:y,count:S,materialIndex:T}=h[x];if(m>=y&&m<y+S){let E=M1(e[T]),A=S1(t,d,p,v,g,l,c,u,E,s,a);if(A)if(A.faceIndex=n,A.face.materialIndex=T,r)r.push(A);else return A}}}else{let m=M1(e),x=S1(t,d,p,v,g,l,c,u,m,s,a);if(x)if(x.faceIndex=n,x.face.materialIndex=0,r)r.push(x);else return x}return null}function Qt(i,e,t,n){let r=i.a,s=i.b,a=i.c,o=e,l=e+1,c=e+2;t&&(o=t.getX(o),l=t.getX(l),c=t.getX(c)),r.x=n.getX(o),r.y=n.getY(o),r.z=n.getZ(o),s.x=n.getX(l),s.y=n.getY(l),s.z=n.getZ(l),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c)}function T1(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++)bl(l,e,t,u,s,a,o)}function E1(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=bl(o,e,t,f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function w1(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=u,Qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function b1(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,p=!1){let v=h*2;if(_t(v,o)){let g=bt(h,a),m=Nt(v,o),x=1/0,_=1/0,y=1/0,S=-1/0,T=-1/0,E=-1/0;for(let A=3*g,M=3*(g+m);A<M;A++){let C=n[A],R=r.getX(C),w=r.getY(C),P=r.getZ(C);R<x&&(x=R),R>S&&(S=R),w<_&&(_=w),w>T&&(T=w),P<y&&(y=P),P>E&&(E=P)}return l[h+0]!==x||l[h+1]!==_||l[h+2]!==y||l[h+3]!==S||l[h+4]!==T||l[h+5]!==E?(l[h+0]=x,l[h+1]=_,l[h+2]=y,l[h+3]=S,l[h+4]=T,l[h+5]=E,!0):!1}else{let g=Dt(h),m=Pt(h,a),x=p,_=!1,y=!1;if(e){if(!x){let C=g/8+d/32,R=m/8+d/32;_=e.has(C),y=e.has(R),x=!_&&!y}}else _=!0,y=!0;let S=x||_,T=x||y,E=!1;S&&(E=f(g,d,x));let A=!1;T&&(A=f(m,d,x));let M=E||A;if(M)for(let C=0;C<3;C++){let R=g+C,w=m+C,P=l[R],U=l[R+3],N=l[w],H=l[w+3];l[h+C]=P<N?P:N,l[h+C+3]=U>H?U:H}return M}}}function gr(i,e,t,n,r){let s,a,o,l,c,u,f=1/t.direction.x,h=1/t.direction.y,d=1/t.direction.z,p=t.origin.x,v=t.origin.y,g=t.origin.z,m=e[i],x=e[i+3],_=e[i+1],y=e[i+3+1],S=e[i+2],T=e[i+3+2];return f>=0?(s=(m-p)*f,a=(x-p)*f):(s=(x-p)*f,a=(m-p)*f),h>=0?(o=(_-v)*h,l=(y-v)*h):(o=(y-v)*h,l=(_-v)*h),s>l||o>a||((o>s||isNaN(s))&&(s=o),(l<a||isNaN(a))&&(a=l),d>=0?(c=(S-g)*d,u=(T-g)*d):(c=(T-g)*d,u=(S-g)*d),s>u||c>a)?!1:((c>s||s!==s)&&(s=c),(u<a||a!==a)&&(a=u),s<=r&&a>=n)}function C1(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++){let h=c?c[u]:u;bl(l,e,t,h,s,a,o)}}function R1(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=bl(o,e,t,l?l[f]:f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function D1(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=t.resolveTriangleIndex(u),Qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function P1(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),u0(0,i,t,n,r,s,a),Mt.clearBuffer()}function u0(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=bt(i,c),d=Nt(u,l);T1(e,t,n,h,d,r,s,a)}else{let h=Dt(i);gr(h,o,n,s,a)&&u0(h,e,t,n,r,s,a);let d=Pt(i,c);gr(d,o,n,s,a)&&u0(d,e,t,n,r,s,a)}}var dD=["x","y","z"];function I1(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=h0(0,i,t,n,r,s);return Mt.clearBuffer(),a}function h0(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=bt(i,l),h=Nt(c,o);return E1(e,t,n,f,h,r,s)}else{let f=la(i,l),h=dD[f],p=n.direction[h]>=0,v,g;p?(v=Dt(i),g=Pt(i,l)):(v=Pt(i,l),g=Dt(i));let x=gr(v,a,n,r,s)?h0(v,e,t,n,r,s):null;if(x){let S=x.point[h];if(p?S<=a[g+f]:S>=a[g+f+3])return x}let y=gr(g,a,n,r,s)?h0(g,e,t,n,r,s):null;return x&&y?x.distance<=y.distance?x:y:x||y||null}}var Wd=new Kt,Cl=new Zn,Rl=new Zn,Mu=new Je,B1=new dn,Xd=new dn;function U1(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=f0(0,i,t,n);return Mt.clearBuffer(),r}function f0(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),B1.set(t.boundingBox.min,t.boundingBox.max,n),r=B1),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,p=t.attributes.position,v=bt(i,o),g=Nt(l,a);if(Mu.copy(n).invert(),t.boundsTree)return qt(i,s,Xd),Xd.matrix.copy(Mu),Xd.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Xd.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let _=v*3,y=(g+v)*3;_<y;_+=3)if(Qt(Rl,_,f,h),Rl.needsUpdate=!0,x.intersectsTriangle(Rl))return!0;return!1}});{let m=da(t);for(let x=v*3,_=(g+v)*3;x<_;x+=3){Qt(Cl,x,f,h),Cl.a.applyMatrix4(Mu),Cl.b.applyMatrix4(Mu),Cl.c.applyMatrix4(Mu),Cl.needsUpdate=!0;for(let y=0,S=m*3;y<S;y+=3)if(Qt(Rl,y,d,p),Rl.needsUpdate=!0,Cl.intersectsTriangle(Rl))return!0}}}else{let u=Dt(i),f=Pt(i,o);return qt(u,s,Wd),!!(r.intersectsBox(Wd)&&f0(u,e,t,n,r)||(qt(f,s,Wd),r.intersectsBox(Wd)&&f0(f,e,t,n,r)))}}var Yd=new Je,d0=new dn,Tu=new dn,pD=new I,mD=new I,gD=new I,vD=new I;function L1(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),d0.set(e.boundingBox.min,e.boundingBox.max,t),d0.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=Di.getPrimitive(),d=Di.getPrimitive(),p=pD,v=mD,g=null,m=null;r&&(g=gD,m=vD);let x=1/0,_=null,y=null;return Yd.copy(t).invert(),Tu.matrix.copy(Yd),i.shapecast({boundsTraverseOrder:S=>d0.distanceToBox(S),intersectsBounds:(S,T,E)=>E<x&&E<a?(T&&(Tu.min.copy(S.min),Tu.max.copy(S.max),Tu.needsUpdate=!0),!0):!1,intersectsRange:(S,T)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:A=>Tu.distanceToBox(A),intersectsBounds:(A,M,C)=>C<x&&C<a,intersectsRange:(A,M)=>{for(let C=A,R=A+M;C<R;C++){Qt(d,3*C,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let w=S,P=S+T;w<P;w++){Qt(h,3*w,c,l),h.needsUpdate=!0;let U=h.distanceToTriangle(d,p,g);if(U<x&&(v.copy(p),m&&m.copy(g),x=U,_=w,y=C),U<s)return!0}}}});{let E=da(e);for(let A=0,M=E;A<M;A++){Qt(d,3*A,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=S,R=S+T;C<R;C++){Qt(h,3*C,c,l),h.needsUpdate=!0;let w=h.distanceToTriangle(d,p,g);if(w<x&&(v.copy(p),m&&m.copy(g),x=w,_=C,y=A),w<s)return!0}}}}}),Di.releasePrimitive(h),Di.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=_,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(Yd),v.applyMatrix4(Yd),r.distance=v.sub(r.point).length(),r.faceIndex=y),n)}function F1(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,p=!1){let v=h*2;if(_t(v,o)){let g=bt(h,a),m=Nt(v,o),x=1/0,_=1/0,y=1/0,S=-1/0,T=-1/0,E=-1/0;for(let A=g,M=g+m;A<M;A++){let C=3*i.resolveTriangleIndex(A);for(let R=0;R<3;R++){let w=C+R;w=n?n[w]:w;let P=r.getX(w),U=r.getY(w),N=r.getZ(w);P<x&&(x=P),P>S&&(S=P),U<_&&(_=U),U>T&&(T=U),N<y&&(y=N),N>E&&(E=N)}}return l[h+0]!==x||l[h+1]!==_||l[h+2]!==y||l[h+3]!==S||l[h+4]!==T||l[h+5]!==E?(l[h+0]=x,l[h+1]=_,l[h+2]=y,l[h+3]=S,l[h+4]=T,l[h+5]=E,!0):!1}else{let g=Dt(h),m=Pt(h,a),x=p,_=!1,y=!1;if(e){if(!x){let C=g/8+d/32,R=m/8+d/32;_=e.has(C),y=e.has(R),x=!_&&!y}}else _=!0,y=!0;let S=x||_,T=x||y,E=!1;S&&(E=f(g,d,x));let A=!1;T&&(A=f(m,d,x));let M=E||A;if(M)for(let C=0;C<3;C++){let R=g+C,w=m+C,P=l[R],U=l[R+3],N=l[w],H=l[w+3];l[h+C]=P<N?P:N,l[h+C+3]=U>H?U:H}return M}}}function N1(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),p0(0,i,t,n,r,s,a),Mt.clearBuffer()}function p0(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=bt(i,c),d=Nt(u,l);C1(e,t,n,h,d,r,s,a)}else{let h=Dt(i);gr(h,o,n,s,a)&&p0(h,e,t,n,r,s,a);let d=Pt(i,c);gr(d,o,n,s,a)&&p0(d,e,t,n,r,s,a)}}var xD=["x","y","z"];function O1(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=m0(0,i,t,n,r,s);return Mt.clearBuffer(),a}function m0(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=bt(i,l),h=Nt(c,o);return R1(e,t,n,f,h,r,s)}else{let f=la(i,l),h=xD[f],p=n.direction[h]>=0,v,g;p?(v=Dt(i),g=Pt(i,l)):(v=Pt(i,l),g=Dt(i));let x=gr(v,a,n,r,s)?m0(v,e,t,n,r,s):null;if(x){let S=x.point[h];if(p?S<=a[g+f]:S>=a[g+f+3])return x}let y=gr(g,a,n,r,s)?m0(g,e,t,n,r,s):null;return x&&y?x.distance<=y.distance?x:y:x||y||null}}var qd=new Kt,Dl=new Zn,Pl=new Zn,Eu=new Je,z1=new dn,Qd=new dn;function k1(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=g0(0,i,t,n);return Mt.clearBuffer(),r}function g0(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),z1.set(t.boundingBox.min,t.boundingBox.max,n),r=z1),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,p=t.attributes.position,v=bt(i,o),g=Nt(l,a);if(Eu.copy(n).invert(),t.boundsTree)return qt(i,s,Qd),Qd.matrix.copy(Eu),Qd.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Qd.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let _=v,y=g+v;_<y;_++)if(Qt(Pl,3*e.resolveTriangleIndex(_),f,h),Pl.needsUpdate=!0,x.intersectsTriangle(Pl))return!0;return!1}});{let m=da(t);for(let x=v,_=g+v;x<_;x++){let y=e.resolveTriangleIndex(x);Qt(Dl,3*y,f,h),Dl.a.applyMatrix4(Eu),Dl.b.applyMatrix4(Eu),Dl.c.applyMatrix4(Eu),Dl.needsUpdate=!0;for(let S=0,T=m*3;S<T;S+=3)if(Qt(Pl,S,d,p),Pl.needsUpdate=!0,Dl.intersectsTriangle(Pl))return!0}}}else{let u=Dt(i),f=Pt(i,o);return qt(u,s,qd),!!(r.intersectsBox(qd)&&g0(u,e,t,n,r)||(qt(f,s,qd),r.intersectsBox(qd)&&g0(f,e,t,n,r)))}}var Zd=new Je,v0=new dn,wu=new dn,_D=new I,yD=new I,AD=new I,SD=new I;function H1(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),v0.set(e.boundingBox.min,e.boundingBox.max,t),v0.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=Di.getPrimitive(),d=Di.getPrimitive(),p=_D,v=yD,g=null,m=null;r&&(g=AD,m=SD);let x=1/0,_=null,y=null;return Zd.copy(t).invert(),wu.matrix.copy(Zd),i.shapecast({boundsTraverseOrder:S=>v0.distanceToBox(S),intersectsBounds:(S,T,E)=>E<x&&E<a?(T&&(wu.min.copy(S.min),wu.max.copy(S.max),wu.needsUpdate=!0),!0):!1,intersectsRange:(S,T)=>{if(e.boundsTree){let E=e.boundsTree;return E.shapecast({boundsTraverseOrder:A=>wu.distanceToBox(A),intersectsBounds:(A,M,C)=>C<x&&C<a,intersectsRange:(A,M)=>{for(let C=A,R=A+M;C<R;C++){let w=E.resolveTriangleIndex(C);Qt(d,3*w,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=S,U=S+T;P<U;P++){let N=i.resolveTriangleIndex(P);Qt(h,3*N,c,l),h.needsUpdate=!0;let H=h.distanceToTriangle(d,p,g);if(H<x&&(v.copy(p),m&&m.copy(g),x=H,_=P,y=C),H<s)return!0}}}})}else{let E=da(e);for(let A=0,M=E;A<M;A++){Qt(d,3*A,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=S,R=S+T;C<R;C++){let w=i.resolveTriangleIndex(C);Qt(h,3*w,c,l),h.needsUpdate=!0;let P=h.distanceToTriangle(d,p,g);if(P<x&&(v.copy(p),m&&m.copy(g),x=P,_=C,y=A),P<s)return!0}}}}}),Di.releasePrimitive(h),Di.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=_,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(Zd),v.applyMatrix4(Zd),r.distance=v.sub(r.point).length(),r.faceIndex=y),n)}function x0(i,e,t){return i===null?null:(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i)}var Kd=new dn,Jd=new Wa,G1=new I,V1=new Je,W1=new I,_0=["getX","getY","getZ"],Il=class i extends zd{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,s=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(l=>l.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=s?s.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=s),o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:r,roots:s,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(s));let o=new i(t,{...n,[mu]:!0});if(o._roots=s,o._indirectBuffer=a||null,n.setIndex){let c=t.getIndex();if(c===null){let u=new ut(e.index,1,!1);t.setIndex(u)}else c.array!==r&&(c.array.set(r),c.needsUpdate=!0)}return o;function l(c){for(let u=0;u<c.length;u++){let f=c[u],h=new Uint32Array(f),d=new Uint16Array(f);for(let p=0,v=f.byteLength/32;p<v;p++){let g=8*p,m=2*g;_t(m,d)||(h[g+6]=h[g+6]/8-p)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,c=(s?s[e]:e)*3,u=c+0,f=c+1,h=c+2;o&&(u=o[u],f=o[f],h=o[h]);for(let d=0;d<3;d++){let p=a[_0[d]](u),v=a[_0[d]](f),g=a[_0[d]](h),m=p;v<m&&(m=v),g<m&&(m=g);let x=p;v>x&&(x=v),g>x&&(x=g),t[n+d]=m,t[n+d+3]=x}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,l=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let c=a.array,u=a.offset||0,f=3;a.isInterleavedBufferAttribute&&(f=a.data.stride);let h=["getX","getY","getZ"],d=n.offset;for(let p=e,v=e+t;p<v;p++){let m=(s?s[p]:p)*3,x=(p-d)*6,_=m+0,y=m+1,S=m+2;o&&(_=o[_],y=o[y],S=o[S]),l||(_=_*f+u,y=y*f+u,S=S*f+u);for(let T=0;T<3;T++){let E,A,M;l?(E=a[h[T]](_),A=a[h[T]](y),M=a[h[T]](S)):(E=c[_+T],A=c[y+T],M=c[S+T]);let C=E;A<C&&(C=A),M<C&&(C=M);let R=E;A>R&&(R=A),M>R&&(R=M);let w=(R-C)/2,P=T*2;n[x+P+0]=C+w,n[x+P+1]=w+(Math.abs(C)+w)*_l}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;V1.copy(e.matrixWorld).invert(),Jd.copy(t.ray).applyMatrix4(V1),W1.setFromMatrixScale(e.matrixWorld),G1.copy(Jd.direction).multiply(W1);let s=G1.length(),a=t.near/s,o=t.far/s;if(t.firstHitOnly===!0){let l=this.raycastFirst(Jd,r,a,o);l=x0(l,e,t),l&&n.push(l)}else{let l=this.raycast(Jd,r,a,o);for(let c=0,u=l.length;c<u;c++){let f=x0(l[c],e,t);f&&n.push(f)}}return n}refit(e=null){return(this.indirect?F1:b1)(this,e)}raycast(e,t=ci,n=0,r=1/0){let s=this._roots,a=[],o=this.indirect?N1:P1;for(let l=0,c=s.length;l<c;l++)o(this,l,t,e,a,n,r);return a}raycastFirst(e,t=ci,n=0,r=1/0){let s=this._roots,a=null,o=this.indirect?O1:I1;for(let l=0,c=s.length;l<c;l++){let u=o(this,l,t,e,n,r);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,s=this.indirect?k1:U1;for(let a=0,o=r.length;a<o&&(n=s(this,a,e,t),!n);a++);return n}shapecast(e){let t=Di.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?D1:w1});return Di.releasePrimitive(t),n}bvhcast(e,t,n){let{intersectsRanges:r,intersectsTriangles:s}=n,a=Di.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,c=this.indirect?p=>{let v=this.resolveTriangleIndex(p);Qt(a,v*3,o,l)}:p=>{Qt(a,p*3,o,l)},u=Di.getPrimitive(),f=e.geometry.index,h=e.geometry.attributes.position,d=e.indirect?p=>{let v=e.resolveTriangleIndex(p);Qt(u,v*3,f,h)}:p=>{Qt(u,p*3,f,h)};if(s){if(!(e instanceof i))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let p=(v,g,m,x,_,y,S,T)=>{for(let E=m,A=m+x;E<A;E++){d(E),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let M=v,C=v+g;M<C;M++)if(c(M),a.needsUpdate=!0,s(a,u,M,E,_,y,S,T))return!0}return!1};if(r){let v=r;r=function(g,m,x,_,y,S,T,E){return v(g,m,x,_,y,S,T,E)?!0:p(g,m,x,_,y,S,T,E)}}else r=p}return super.bvhcast(e,t,{intersectsRanges:r})}intersectsBox(e,t){return Kd.set(e.min,e.max,t),Kd.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Kd.intersectsBox(n),intersectsTriangle:n=>Kd.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},s=0,a=1/0){return(this.indirect?H1:L1)(this,e,t,n,r,s,a)}closestPointToPoint(e,t={},n=0,r=1/0){return x1(this,e,t,n,r)}};function MD(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function TD(i){switch(i){case 1:return ta;case 2:return xs;case 3:return Mn;case 4:return Mn}}function X1(i){switch(i){case 1:return ul;case 2:return na;case 3:return ia;case 4:return ia}}var jd=class extends fr{constructor(){super(),this.minFilter=Ct,this.magFilter=Ct,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,r=e.count;if(t!==null){if(n*r%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=r*n/t}let s=e.itemSize,a=e.count,o=e.normalized,l=e.array.constructor,c=l.BYTES_PER_ELEMENT,u=this._forcedType,f=s;if(u===null)switch(l){case Float32Array:u=nn;break;case Uint8Array:case Uint16Array:case Uint32Array:u=Sn;break;case Int8Array:case Int16Array:case Int32Array:u=ea;break}let h,d,p,v,g=MD(s);switch(u){case nn:p=1,d=TD(s),o&&c===1?(v=l,g+="8",l===Uint8Array?h=xt:(h=cl,g+="_SNORM")):(v=Float32Array,g+="32F",h=nn);break;case ea:g+=c*8+"I",p=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=X1(s),c===1?(v=Int8Array,h=cl):c===2?(v=Int16Array,h=su):(v=Int32Array,h=ea);break;case Sn:g+=c*8+"UI",p=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=X1(s),c===1?(v=Uint8Array,h=xt):c===2?(v=Uint16Array,h=$s):(v=Uint32Array,h=Sn);break}f===3&&(d===Mn||d===ia)&&(f=4);let m=Math.ceil(Math.sqrt(a))||1,x=f*m*m,_=new v(x),y=e.normalized;e.normalized=!1;for(let S=0;S<a;S++){let T=f*S;_[T]=e.getX(S)/p,s>=2&&(_[T+1]=e.getY(S)/p),s>=3&&(_[T+2]=e.getZ(S)/p,f===4&&(_[T+3]=1)),s>=4&&(_[T+3]=e.getW(S)/p)}e.normalized=y,this.internalFormat=g,this.format=d,this.type=h,this.image.width=m,this.image.height=m,this.image.data=_,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=r}},$d=class extends jd{constructor(){super(),this._forcedType=Sn}};var ep=class extends jd{constructor(){super(),this._forcedType=nn}};var bu=class{constructor(){this.index=new $d,this.position=new ep,this.bvhBounds=new fr,this.bvhContents=new fr,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(wD(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let n=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let r=a0(_u(t));this._cachedIndexAttr=new ut(r,1,!1)}ED(t,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:r}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),r&&r.dispose()}};function ED(i,e,t){let n=t.array,r=i.index?i.index.array:null;for(let s=0,a=e.length;s<a;s++){let o=3*s,l=3*e[s];for(let c=0;c<3;c++)n[o+c]=r?r[l+c]:l+c}}function wD(i,e,t){let n=i._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let r=n[0],s=new Uint16Array(r),a=new Uint32Array(r),o=new Float32Array(r),l=r.byteLength/32,c=2*Math.ceil(Math.sqrt(l/2)),u=new Float32Array(4*c*c),f=Math.ceil(Math.sqrt(l)),h=new Uint32Array(2*f*f);for(let d=0;d<l;d++){let p=d*32/4,v=p*2,g=p;for(let m=0;m<3;m++)u[8*d+0+m]=o[g+0+m],u[8*d+4+m]=o[g+3+m];if(_t(v,s)){let m=Nt(v,s),x=bt(p,a),_=-65536|m;h[d*2+0]=_,h[d*2+1]=x}else{let m=a[p+6],x=la(p,a);h[d*2+0]=x,h[d*2+1]=m}}e.image.data=u,e.image.width=c,e.image.height=c,e.format=Mn,e.type=nn,e.internalFormat="RGBA32F",e.minFilter=Ct,e.magFilter=Ct,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=h,t.image.width=f,t.image.height=f,t.format=na,t.type=Sn,t.internalFormat="RG32UI",t.minFilter=Ct,t.magFilter=Ct,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}var so={};UA(so,{bvh_distance_functions:()=>Y1,bvh_ray_functions:()=>A0,bvh_struct_definitions:()=>q1,common_functions:()=>y0});var y0=`

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
`;var Y1=`

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
`;var A0=`

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
`;var q1=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var xO=`
	${y0}
	${A0}
`;var Cu=.56,$1=fn.degToRad(34.5),bD=fn.degToRad(40.8),As=.03,CD=.5,RD=.77,ma=.5,Kn=8,Bn=4,Ru=Math.PI*2/Kn,ki=2*Kn*Bn,Q1=(ma-Cu/2)*Math.tan($1),np=ma*Math.tan(bD),Du={tableY:As/2+Q1,girdleTop:As/2,girdleBottom:-As/2,culetY:-As/2-np,crownH:Q1,pavH:np},Pu={L:.58,W:.425,b:.13},DD=[[.045,42],[.05,32],[.055,23]],PD=[[.135,52],[.135,44],[Pu.W-.01-.27,34]];function w0(i){let e=Pu.L-i,t=Math.max(.004,Pu.W-i),n=Pu.b*t/Pu.W;return[[e,t-n],[e-n,t],[-(e-n),t],[-e,t-n],[-e,-(t-n)],[-(e-n),-t],[e-n,-t],[e,-(t-n)]]}function eA(i,e){let t=(e/Ru%Kn+Kn)%Kn,n=Math.min(Kn-1,Math.floor(t)),r=t-n,s=i[n],a=i[(n+1)%Kn];return[s[0]+(a[0]-s[0])*r,s[1]+(a[1]-s[1])*r]}var tp=[],Ul=[];{let i=0,e=As/2;for(let[t,n]of DD)i+=t,e+=t*Math.tan(fn.degToRad(n)),tp.push({d:i,y:e});i=0,e=-As/2;for(let[t,n]of PD)i+=t,e-=t*Math.tan(fn.degToRad(n)),Ul.push({d:i,y:e})}var S0=i=>(e,t)=>{let n=fn.clamp((t-Du.culetY)/np,0,1),r=i(e);return[r[0]*n,r[1]*n]},Z1=i=>[Math.cos(i)*ma,Math.sin(i)*ma],K1=i=>[Math.cos(i)*.6,Math.sin(i)*.6*.69],J1=i=>{let t=((Math.PI-i)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return[-(Math.cos(t)+.3)*.58,Math.sin(t)*Math.sin(t/2)*.84*.58]},ID=w0(0),tA=i=>eA(ID,i),Ll={round:{outline:Z1,step:!1,surface:S0(Z1)},oval:{outline:K1,step:!1,surface:S0(K1)},pear:{outline:J1,step:!1,surface:S0(J1)},emerald:{outline:tA,step:!0,surface(i,e){let t=[-As/2,...Ul.map(s=>s.y)],n=[0,...Ul.map(s=>s.d)],r=n[n.length-1];for(let s=0;s<t.length-1;s++)if(e<=t[s]&&e>=t[s+1]){r=n[s]+(n[s+1]-n[s])*((t[s]-e)/(t[s]-t[s+1]));break}return e>t[0]&&(r=0),eA(w0(r),i)}}},pa=["round","emerald","pear","oval"];function j1(i,e,t,n,r){let s=e[0]-i[0],a=e[1]-i[1],o=e[2]-i[2],l=t[0]-i[0],c=t[1]-i[1],u=t[2]-i[2],f=a*u-o*c,h=o*l-s*u,d=s*c-a*l;return Math.abs(h)<1e-9?i[1]:i[1]-(f*(n-i[0])+d*(r-i[2]))/h}var Bl=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t],E0=i=>i/ki*Math.PI*2,Qr=i=>Array.from({length:Kn},(e,t)=>i(t));function nA(i){let e=(T,E,A)=>{let M=i(T);return[M[0]*E,A,M[1]*E]},t=Du.tableY,n=Du.girdleTop,r=Du.girdleBottom,s=Du.culetY,a=Cu/2/ma,o=(Cu/2+(ma-Cu/2)*CD)/ma,l=1-RD,c=Math.cos(Ru/2),u=t-(o*ma*c-Cu/2)*Math.tan($1),f=s+np*l*c,h=Qr(T=>e(T*Ru,a,t)),d=Qr(T=>e((T+.5)*Ru,o,u)),p=Qr(T=>e((T+.5)*Ru,l,f)),v=T=>e(E0(T),1,n),g=T=>e(E0(T),1,r),m=[],x=[];for(let T=0;T<Kn;T++){let E=T*2*Bn,A=E+Bn,M=(E+2*Bn)%ki,C=[[d[T],v(E),v(A)],[d[T],v(A),v(M)]],R=[[p[T],g(E),g(A)],[p[T],g(A),g(M)]];for(let w=0;w<2*Bn;w++){let P=E+w,U=C[w<Bn?0:1],N=R[w<Bn?0:1],H=v(P);m[P]=w===0||w===Bn?H:[H[0],j1(U[0],U[1],U[2],H[0],H[2]),H[2]];let k=g(P);x[P]=w===0||w===Bn?k:[k[0],j1(N[0],N[1],N[2],k[0],k[2]),k[2]]}}let _=T=>Qr(E=>T[E*2*Bn]),y=T=>E=>T[E*2*Bn+Bn],S=[0,s,0];return{tc:[0,t,0],cul:S,C:[{B:h,M:Qr(T=>Bl(h[T],h[(T+1)%Kn],.5))},{B:Qr(T=>Bl(h[T],m[T*2*Bn],.5)),M:d},{B:_(m),M:Qr(T=>Bl(d[T],y(m)(T),.5))}],P:[{B:Qr(T=>Bl(x[T*2*Bn],S,.5)),M:p},{B:_(x),M:Qr(T=>Bl(p[T],y(x)(T),.33))},{B:_(x),M:Qr(T=>Bl(p[T],y(x)(T),.67))}],gTop:m,gBot:x}}function iA(){let i=(a,o)=>{let l=w0(a);return{B:l.map(c=>[c[0],o,c[1]]),M:l.map((c,u)=>{let f=l[(u+1)%Kn];return[(c[0]+f[0])/2,o,(c[1]+f[1])/2]})}},e=tp.map(a=>i(a.d,a.y)),t=Ul.map(a=>i(a.d,a.y)),n=[],r=[];for(let a=0;a<ki;a++){let o=tA(E0(a));n.push([o[0],As/2,o[1]]),r.push([o[0],-As/2,o[1]])}let s=Ul[Ul.length-1].y;return{tc:[0,tp[tp.length-1].y,0],cul:[0,s,0],C:[e[2],e[1],e[0]],P:[t[2],t[1],t[0]],gTop:n,gBot:r}}function rA(i){let e=[],t=(h,d,p)=>e.push(h,d,p),n=h=>(h+1)%Kn,r=(h,d,p,v)=>{let g=n(p);v?(t(h.B[p],h.M[p],d.M[p]),t(h.B[p],d.M[p],d.B[p]),t(h.M[p],h.B[g],d.M[p]),t(h.B[g],d.B[g],d.M[p])):(t(h.B[p],h.M[p],d.B[p]),t(h.M[p],d.M[p],d.B[p]),t(h.M[p],h.B[g],d.B[g]),t(h.M[p],d.B[g],d.M[p]))},s=(h,d,p)=>{let v=p*2*Bn;t(h.B[p],h.M[p],d[v]);for(let g=0;g<2*Bn;g++)t(h.M[p],d[(v+g)%ki],d[(v+g+1)%ki]);t(h.M[p],d[(v+2*Bn)%ki],h.B[n(p)])},[a,o,l]=i.C,[c,u,f]=i.P;for(let h=0;h<Kn;h++)t(i.tc,a.B[h],a.M[h]),t(i.tc,a.M[h],a.B[n(h)]),r(a,o,h,!0),r(o,l,h,!1),s(l,i.gTop,h),s(f,i.gBot,h),r(u,f,h,!0),r(c,u,h,!1),t(c.B[h],c.M[h],i.cul),t(c.M[h],c.B[n(h)],i.cul);for(let h=0;h<ki;h++){let d=(h+1)%ki;t(i.gTop[h],i.gBot[h],i.gBot[d]),t(i.gTop[h],i.gBot[d],i.gTop[d])}return e}var sA=i=>rA(Ll[i].step?iA():nA(Ll[i].outline));function BD(i){let e=[],t=(a,o,l)=>e.push(a,o,l),n=i.C[0].B,r=i.C[1].M,s=i.P[0].M;for(let a=0;a<Kn;a++){let o=(a+1)%Kn,l=(a+Kn-1)%Kn,c=a*2*Bn;t(i.tc,n[a],n[o]),t(n[a],n[o],r[a]),t(n[a],r[a],i.gTop[c]),t(n[a],i.gTop[c],r[l]);for(let u=0;u<2*Bn;u++)t(r[a],i.gTop[(c+u)%ki],i.gTop[(c+u+1)%ki]),t(s[a],i.gBot[(c+u)%ki],i.gBot[(c+u+1)%ki]);t(i.gBot[c],s[a],i.cul),t(i.gBot[c],i.cul,s[l])}for(let a=0;a<ki;a++){let o=(a+1)%ki;t(i.gTop[a],i.gBot[a],i.gBot[o]),t(i.gTop[a],i.gBot[o],i.gTop[o])}return e}function UD(i){let e=1/0,t=-1/0;for(let l of i)e=Math.min(e,l[1]),t=Math.max(t,l[1]);let n=(e+t)/2,r=[],s=new I,a=new I,o=new I;for(let l=0;l<i.length/3;l++){let[c,u,f]=[i[l*3],i[l*3+1],i[l*3+2]];if(s.set(u[0]-c[0],u[1]-c[1],u[2]-c[2]),a.set(f[0]-c[0],f[1]-c[1],f[2]-c[2]),o.crossVectors(s,a),o.lengthSq()<1e-14)continue;let h=(c[0]+u[0]+f[0])/3,d=(c[1]+u[1]+f[1])/3-n,p=(c[2]+u[2]+f[2])/3;r.push(...o.x*h+o.y*d+o.z*p<0?[c,f,u]:[c,u,f])}return new Float32Array(r.flat())}var M0={};function b0(i){if(!M0[i]){let e=Ll[i];M0[i]=UD(e.step?rA(iA()):BD(nA(e.outline)))}return M0[i]}var aA=[];{let i=new I,e=new I,t=new I,n=new I,r=[];for(let s of Object.keys(Ll)){let a=sA(s),o=1/0,l=-1/0;for(let u of a)o=Math.min(o,u[1]),l=Math.max(l,u[1]);let c=(o+l)/2;for(let u=0;u<a.length/3;u++){let[f,h,d]=[a[u*3],a[u*3+1],a[u*3+2]];i.set(h[0]-f[0],h[1]-f[1],h[2]-f[2]),e.set(d[0]-f[0],d[1]-f[1],d[2]-f[2]),t.crossVectors(i,e);let p=t.length();p>(r[u]||1e-9)&&(r[u]=p,n.set((f[0]+h[0]+d[0])/3,(f[1]+h[1]+d[1])/3-c,(f[2]+h[2]+d[2])/3),aA[u]=t.dot(n)<0)}}}function LD(i){let e=sA(i),t=new Float32Array(e.length*3);for(let n=0;n<e.length/3;n++){let[r,s,a]=[e[n*3],e[n*3+1],e[n*3+2]];aA[n]&&([s,a]=[a,s]),t.set(r,n*9),t.set(s,n*9+3),t.set(a,n*9+6)}return t}var T0={};function ip(i){return T0[i]||(T0[i]=LD(i)),T0[i]}function Iu(i){let e=pa.length,t=(i%e+e)%e,n=Math.floor(t);return[Ll[pa[n]],Ll[pa[(n+1)%e]],t-n,pa[n],pa[(n+1)%e]]}function oA(i,e){let[,,t,n,r]=Iu(i),s=ip(n),a=ip(r);for(let o=0;o<e.length;o++)e[o]=s[o]+(a[o]-s[o])*t;return e}function Bu(i,e){let[t,n,r]=Iu(i),s=t.outline(e),a=n.outline(e);return[s[0]+(a[0]-s[0])*r,s[1]+(a[1]-s[1])*r]}function Fl(i,e,t){let[n,r,s]=Iu(i),a=n.surface(e,t),o=r.surface(e,t);return[a[0]+(o[0]-a[0])*s,a[1]+(o[1]-a[1])*s]}function rp(){let i=new Lt;return i.setAttribute("position",new ut(b0("round").slice(),3)),i.computeVertexNormals(),i}function R0(i){let e=(i/1e3)**2;return Math.sqrt(1+.3306*e/(e-.175**2)+4.3356*e/(e-.106**2))}var FD={430:[.2839,.0116,1.3856],470:[.1954,.091,1.2876],510:[.0093,.503,.1582],550:[.4334,.995,.0087],590:[1.0263,.757,.0011],630:[.6424,.265,5e-5],670:[.0874,.032,0]};function cA(i){if(i===3)return{iors:[640,550,465].map(R0),weights:[[1,0,0],[0,1,0],[0,0,1]]};let e=[430,470,510,550,590,630,670],t=e.map(r=>{let[s,a,o]=FD[r];return[Math.max(0,3.2406*s-1.5372*a-.4986*o),Math.max(0,-.9689*s+1.8758*a+.0415*o),Math.max(0,.0557*s-.204*a+1.057*o)]}),n=[0,1,2].map(r=>t.reduce((s,a)=>s+a[r],0));return{iors:e.map(R0),weights:t.map(r=>r.map((s,a)=>s/n[a]))}}var Ss={axis:{value:new At(1,0,0,.12)},dir:{value:new At(0,0,1,0)}},D0=`
	uniform vec4 sweepAxis;
	uniform vec4 sweepDir;
	vec3 sweepLight( vec3 d ) {
		if ( sweepDir.w <= 0.0 ) return vec3( 0.0 );
		float across = abs( dot( d, sweepAxis.xyz ) );
		float band = 1.0 - smoothstep( sweepAxis.w * 0.5, sweepAxis.w, across );
		float facing = smoothstep( - 0.1, 0.5, dot( d, sweepDir.xyz ) );
		return vec3( 1.0, 0.97, 0.93 ) * ( band * facing * sweepDir.w );
	}
`,Nl=36,ND=`
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
`,OD=`
	#define RAY_OFFSET 1e-4
	${so.common_functions}
	${so.bvh_struct_definitions}
	${so.bvh_ray_functions}

	uniform mat3 envRotation;
	uniform float envIntensity;
	uniform BVH bvh;
	uniform float ior;
	uniform float iors[ WAVES ];
	uniform vec3 weights[ WAVES ];
	uniform int bounces;
	// How much of the light still inside after the last bounce comes out along its last direction.
	// With few bounces that is a lot of light, and one direction makes flat white patches; the light
	// levels turn it down (it would have bounced on and left mostly through the dark pavilion).
	uniform float tail;
	uniform vec3 obstruction; // cos inner, cos outer, how dark
	uniform float frost;
	uniform float opacity;
	uniform float glow;
	${D0}
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
		uniform vec4 capA[ ${Nl} ];
		uniform vec4 capB[ ${Nl} ];
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
		vec3 c = studio( envRotation * dir ) * envIntensity + sweepLight( dir );
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
			for ( int i = 0; i < ${Nl}; i ++ ) {
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
		vec3 last = env( normalize( vToWorld * rd ) ) * tail;
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
`,sp=null;function zD(){if(!sp){let i=rp(),e=new Il(i,{strategy:2,targetLeafSize:4});sp={geometry:i,struct:new bu},sp.struct.updateFrom(e)}return sp}function uA(i,{bounces:e=7,waves:t=7,ss:n=1,bvhStruct:r,studio:s=null,setting:a=null}){let{iors:o,weights:l}=cA(t),c={WAVES:t,SS:n},u={envMap:{value:i},envRotation:{value:new et},envIntensity:{value:1},bvh:{value:r},ior:{value:R0(589)},iors:{value:o},weights:{value:l.map(f=>new I(...f))},bounces:{value:e},tail:{value:1},obstruction:{value:new I(Math.cos(fn.degToRad(21)),Math.cos(fn.degToRad(30)),.03)},frost:{value:.55},opacity:{value:1},glow:{value:0},sweepAxis:Ss.axis,sweepDir:Ss.dir};return s&&(c.ANALYTIC_ENV="",c.CARDS=s.count,Object.assign(u,{cardC:{value:s.c},cardU:{value:s.u},cardV:{value:s.v},cardN:{value:s.n},cardCol:{value:s.col},dome:{value:s.dome}})),a&&(c.SETTING="",Object.assign(u,{capA:{value:Array.from({length:Nl},()=>new At)},capB:{value:Array.from({length:Nl},()=>new At)},capCount:{value:0},metalMap:{value:a},metalTint:{value:new qe(1,1,1)}})),new rt({vertexShader:ND,fragmentShader:OD,defines:c,uniforms:u})}var C0={};function lA(i){if(!C0[i]){let e=new Lt;e.setAttribute("position",new ut(b0(i).slice(),3)),C0[i]=new Il(e,{strategy:2,targetLeafSize:4})}return C0[i]}function hA(i,{bounces:e=7,waves:t=7,ss:n=1,studio:r=null,setting:s=null}={}){let a=new Lt,o=ip("round").slice();a.setAttribute("position",new ut(o,3));let l=null,c=new bu;c.updateFrom(lA("round"));let u=uA(i,{bounces:e,waves:t,ss:n,bvhStruct:c,studio:r,setting:s}),f=new Rt(a,u);f.name="diamond";let h=0;return{mesh:f,material:u,setMorph(d){if(!(Math.abs(d-h)<1e-5)){if(h=d,oA(d,o),a.attributes.position.needsUpdate=!0,a.computeBoundingSphere(),Math.abs(d-Math.round(d))<1e-4){let p=pa.length;c.updateFrom(lA(pa[(Math.round(d)%p+p)%p]));return}l?l.refit():l=new Il(a,{strategy:2,targetLeafSize:4}),c.updateFrom(l)}},setBounces(d){u.uniforms.bounces.value=d},setQuality({bounces:d,ss:p,waves:v,exact:g}){let m=u.defines,x=u.uniforms,_=!1;if(d!==void 0&&(x.bounces.value=d),p!==void 0&&m.SS!==p&&(m.SS=p,_=!0),v!==void 0&&m.WAVES!==v){let y=cA(v);m.WAVES=v,x.iors.value=y.iors,x.weights.value=y.weights.map(S=>new I(...S)),_=!0}g===!1&&"ANALYTIC_ENV"in m&&(delete m.ANALYTIC_ENV,_=!0),_&&(u.needsUpdate=!0)},setSetting(d,p){let v=u.uniforms;if(!v.capA)return;let g=Math.min(Nl,d.length);for(let m=0;m<g;m++){let x=d[m];v.capA.value[m].set(x[0],x[1],x[2],x[3]),v.capB.value[m].set(x[4],x[5],x[6],0)}v.capCount.value=g,p&&v.metalTint.value.copy(p)}}}function fA(i,{bounces:e=4,waves:t=3,studio:n=null}={}){return uA(i,{bounces:e,waves:t,ss:1,bvhStruct:zD().struct,studio:n})}var Ol=class{constructor(e,t,n){this.radial=t,this.maxRings=e;let r=e*(t+1);this.pos=new Float32Array(r*3),this.nrm=new Float32Array(r*3);let s=[];for(let o=0;o<e-1;o++)for(let l=0;l<t;l++){let c=o*(t+1)+l,u=c+t+1;s.push(c,c+1,u,c+1,u+1,u)}let a=new Lt;a.setIndex(s),a.setAttribute("position",new ut(this.pos,3).setUsage(Wr)),a.setAttribute("normal",new ut(this.nrm,3).setUsage(Wr)),a.setDrawRange(0,0),this.geometry=a,this.mesh=new Rt(a,n),this.mesh.frustumCulled=!1,this.rings=0,this._n=new I,this._b=new I,this._t=new I,this._v=new I}begin(){this.rings=0}ring(e,t,n,r,s,a=0){if(this.rings>=this.maxRings)return;let o=this.rings*(this.radial+1),l=Math.cos(a),c=Math.sin(a);for(let u=0;u<=this.radial;u++){let f=u/this.radial*Math.PI*2,h=Math.cos(f),d=Math.sin(f),p=t.x*h+n.x*d,v=t.y*h+n.y*d,g=t.z*h+n.z*d,m=(o+u)*3;this.pos[m]=e.x+p*s,this.pos[m+1]=e.y+v*s,this.pos[m+2]=e.z+g*s,this.nrm[m]=p*l+r.x*c,this.nrm[m+1]=v*l+r.y*c,this.nrm[m+2]=g*l+r.z*c}this.rings++}cap(e,t,n,r,s,a=5,o=!1){let l=this._v,c=[];for(let u=1;u<=a;u++)c.push(u);o&&(c.reverse(),c.push(0));for(let u of c){let f=u/a*(Math.PI/2)*.999;l.copy(e).addScaledVector(r,Math.sin(f)*s),this.ring(l,t,n,r,Math.max(s*Math.cos(f),1e-4),f)}}sweep(e,t,{up:n=null,capStart:r=!1,capEnd:s=!0,closed:a=!1,capSteps:o=6}={}){this.begin();let l=this._n,c=this._b,u=this._t,f=e.length;if(f<2){this.end();return}let h=(m,x)=>{let _=e[Math.max(0,m-1)],y=e[Math.min(f-1,m+1)];if(a){let S=e[(m-1+f)%f],T=e[(m+1)%f];return x.subVectors(T,S).normalize()}return x.subVectors(y,_).normalize()};if(h(0,u),n)c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize();else{let m=Math.abs(u.y)<.9?new I(0,1,0):new I(1,0,0);c.crossVectors(u,m).normalize(),l.crossVectors(c,u).normalize()}let d=m=>typeof t=="function"?t(m/(f-1)):t;r&&!a&&this.cap(e[0],l,c,u.clone().negate(),d(0),o,!0);let p=new I().copy(u),v=new qn,g=a?f+1:f;for(let m=0;m<g;m++){let x=m%f;h(x,u),n?(c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize()):m>0&&(v.setFromUnitVectors(p,u),l.applyQuaternion(v),c.applyQuaternion(v)),p.copy(u),this.ring(e[x],l,c,u,d(x))}s&&!a&&this.cap(e[f-1],l,c,u,d(f-1),o),this.end()}end(){let e=this.geometry;e.setDrawRange(0,Math.max(0,this.rings-1)*this.radial*6),e.attributes.position.needsUpdate=!0,e.attributes.normal.needsUpdate=!0,this.mesh.visible=this.rings>1}};var zl=1.27,P0=1.15,Fu=2.1,Lu=2.4,ap=5,kD=i=>.24+.03*Math.exp(-Math.pow(i/.38,2)),mA=i=>.121+.009*(i/Math.PI),Zr=i=>zl+kD(i),op={white:new qe("#ecebe8"),yellow:new qe("#f0cf92"),rose:new qe("#f0bfae")},dA=[op.white,op.yellow,op.rose],I0={round:[45,135,225,315,180],emerald:[22.5,112.5,202.5,292.5,180],pear:[35,110,250,325,180],oval:[50.6,129.4,230.6,309.4,180]},B0={round:[1,1,1,1,0],emerald:[1,1,1,1,0],pear:[1,1,1,1,1],oval:[1,1,1,1,0]};function pA(i,e){let[,,t,n,r]=Iu(i),s=I0[n][e]+(I0[r][e]-I0[n][e])*t,a=B0[n][e]+(B0[r][e]-B0[n][e])*t;return[fn.degToRad(s),a]}function Uu(i,e,t){let r=Bu(i,e+.001),s=Bu(i,e-.001),a=r[1]-s[1],o=-(r[0]-s[0]),l=Bu(i,e);a*l[0]+o*l[1]<0&&(a=-a,o=-o);let c=Math.hypot(a,o)||1;return t[0]=a/c,t[1]=o/c,t}var Dr={metalA:{value:new qe},metalB:{value:new qe},front:{value:-1},seam:{value:0},ringInv:{value:new Je},forge:{value:new Ce(0,0)}};function HD(i,e=!1){return i.onBeforeCompile=t=>{Object.assign(t.uniforms,Dr,{sweepAxis:Ss.axis,sweepDir:Ss.dir}),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
uniform mat4 ringInv;
varying vec3 vRingPos;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vRingPos = ( ringInv * worldPosition ).xyz;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 metalA;
uniform vec3 metalB;
uniform float front;
uniform float seam;
uniform vec2 forge;
varying vec3 vRingPos;
${D0}`).replace("#include <color_fragment>",`#include <color_fragment>
float ringU = abs( atan( vRingPos.x, vRingPos.y ) );
diffuseColor.rgb = mix( metalB, metalA, smoothstep( front - 0.14, front + 0.14, ringU ) );`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += vec3( 1.0, 0.95, 0.86 ) * seam * exp( - pow( ( ringU - front ) / 0.06, 2.0 ) );
#ifdef FORGE
	float fresh = ringU - forge.x;
	if ( forge.y > 0.0 && fresh > - 0.02 ) {
		float f = max( fresh, 0.0 );
		totalEmissiveRadiance += mix( vec3( 1.0, 0.32, 0.06 ), vec3( 1.0, 0.86, 0.62 ), exp( - f / 0.05 ) ) * forge.y * exp( - f / 0.2 ) * 2.4;
	}
#endif`).replace("#include <lights_fragment_end>",`#if defined( RE_IndirectSpecular )
	radiance += sweepLight( inverseTransformDirection( reflect( - geometryViewDir, geometryNormal ), viewMatrix ) ) * 0.85;
#endif
#include <lights_fragment_end>`)},e&&(i.defines={FORGE:""}),i}var Ms=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},L0=class{constructor(e){this.NT=360,this.NC=40;let t=(this.NT+1)*(this.NC+1),n=2*(this.NC+2);this.pos=new Float32Array((t+n)*3),this.nrm=new Float32Array((t+n)*3);let r=[];for(let a=0;a<this.NT;a++)for(let o=0;o<this.NC;o++){let l=a*(this.NC+1)+o,c=l+this.NC+1;r.push(l,c,l+1,c,c+1,l+1)}this.bodyCount=r.length,this.capBase=t;for(let a=0;a<2;a++){let o=t+a*(this.NC+2);for(let l=0;l<this.NC;l++)a===0?r.push(o,o+1+l,o+2+l):r.push(o,o+2+l,o+1+l)}let s=new Lt;s.setIndex(r),s.setAttribute("position",new ut(this.pos,3).setUsage(Wr)),s.setAttribute("normal",new ut(this.nrm,3).setUsage(Wr)),this.geometry=s,this.mesh=new Rt(s,e),this.mesh.frustumCulled=!1,this.ends=[new I,new I],this.g=-1}set(e){if(e=Math.min(1,Math.max(0,e)),e===this.g||(this.g=e,this.mesh.visible=e>.001,!this.mesh.visible))return;let t=this.NT,n=this.NC,r=Math.PI*(1-e),s=this.pos,a=this.nrm,o=2/Lu;for(let c=0;c<=t;c++){let u=r+(Math.PI*2-2*r)*(c/t),f=Math.min(u,Math.PI*2-u),h=Math.sin(u),d=Math.cos(u),p=Zr(f),v=(zl+p)/2,g=(p-zl)/2,m=mA(f);for(let x=0;x<=n;x++){let _=x/n*Math.PI*2,y=Math.cos(_),S=Math.sin(_),T=Math.sign(y)*Math.pow(Math.abs(y),o),E=Math.sign(S)*Math.pow(Math.abs(S),o),A=T*m,M=E*g,C=Math.sign(T)*Math.pow(Math.abs(T),Lu-1)/m,R=Math.sign(E)*Math.pow(Math.abs(E),Lu-1)/g,w=Math.hypot(C,R)||1;C/=w,R/=w;let P=(c*(n+1)+x)*3;s[P]=h*(v+M),s[P+1]=d*(v+M),s[P+2]=A,a[P]=h*R,a[P+1]=d*R,a[P+2]=C}}let l=e<.999;for(let c=0;c<2;c++){let u=c===0?0:t,f=r+(Math.PI*2-2*r)*(u/t),h=Math.cos(f)*(c===0?-1:1),d=-Math.sin(f)*(c===0?-1:1),p=this.capBase+c*(n+2),v=Math.min(f,Math.PI*2-f),g=(zl+Zr(v))/2;this.ends[c].set(Math.sin(f)*g,Math.cos(f)*g,0);for(let m=-1;m<=n;m++){let x=(m<0?p:p+1+m)*3;if(m<0)s[x]=this.ends[c].x,s[x+1]=this.ends[c].y,s[x+2]=0;else{let _=(u*(n+1)+m)*3;s[x]=s[_],s[x+1]=s[_+1],s[x+2]=s[_+2]}a[x]=h,a[x+1]=d,a[x+2]=0}}this.geometry.setDrawRange(0,l?this.geometry.index.count:this.bodyCount),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.normal.needsUpdate=!0}};function U0(i,e=0){let t=Math.min(Math.abs(i),Math.PI*2-Math.abs(i)),n=Zr(t),r=mA(t),s=(n-zl)/2,a=(zl+n)/2,o=Math.min(.999,Math.abs(e)/r),l=s*Math.pow(1-Math.pow(o,Lu),1/Lu),c=a+l,u=.001,f=Zr(Math.min(Math.abs(i+u),Math.PI*2-Math.abs(i+u))),h=Zr(Math.min(Math.abs(i-u),Math.PI*2-Math.abs(i-u))),d=(f-h)/(2*u),p=new I(Math.sin(i),Math.cos(i),0),v=new I(Math.cos(i),-Math.sin(i),0),g=p.clone().multiplyScalar(n).addScaledVector(v,-d).normalize();return{point:p.multiplyScalar(c).setZ(e),normal:g}}function GD(i,e,t,n,r){let a=[],o=[0,0],l=0,c=null;for(let h=0;h<=192;h++){let d=h/192*Math.PI*2,p=Fl(i,d,e);Uu(i,d,o);let v=[p[0]+o[0]*t,p[1]+o[1]*t];c&&(l+=Math.hypot(v[0]-c[0],v[1]-c[1])),a.push({a:d,x:v[0],z:v[1],nx:o[0],nz:o[1],s:l}),c=v}let u=Math.max(8,Math.floor(l/n));r.length=0;let f=0;for(let h=0;h<u;h++){let d=(h+.5)/u*l;for(;f<191&&a[f+1].s<d;)f++;let p=a[f],v=a[f+1],g=(d-p.s)/Math.max(1e-6,v.s-p.s),m=p.nx+(v.nx-p.nx)*g,x=p.nz+(v.nz-p.nz)*g,_=Math.hypot(m,x)||1;r.push({a:p.a+(v.a-p.a)*g,x:p.x+(v.x-p.x)*g,z:p.z+(v.z-p.z)*g,nx:m/_,nz:x/_,order:h/u})}return r}function gA({cube:i,rotation:e,waves:t=3,studio:n=null}){let r=new Hr;r.name="ring";let s=new Hr;s.position.y=Fu,s.scale.setScalar(P0),r.add(s);let a=(Q=!1)=>HD(new $c({color:op.white.clone(),metalness:1,roughness:.07,envMapIntensity:1}),Q),o=a(!0);o.side=vn;let l=a(),c=a();c.roughness=.1;let u=[o,l,c],f=new L0(o);r.add(f.mesh);let h=[];for(let Q=0;Q<ap;Q++){let de=new Ol(64,24,l);h.push(de),s.add(de.mesh)}let d=new Ol(124,16,l);s.add(d.mesh);let p=new Ol(144,16,c);s.add(p.mesh);let v=rp(),g=fA(i,{bounces:4,waves:t,studio:n});g.uniforms.envRotation.value=e;let m=34,x=new Ya(v,g,m);x.instanceMatrix.setUsage(Wr),x.frustumCulled=!1,s.add(x);let _=[];{let Q=.3,de=1.62;for(;Q<de;){let ae=.205-.02*((Q-.3)/(de-.3));_.push({phi:Q,size:ae}),Q+=(ae+.012)/Zr(Q)}}let y=_.length*2,S=new Ya(v,g,y);S.instanceMatrix.setUsage(Wr),S.frustumCulled=!1,r.add(S);let T=new qa(1,24,16),E=(_.length+1)*2*2,A=a();A.roughness=.17,u.push(A);let M=new Ya(T,A,E);M.instanceMatrix.setUsage(Wr),M.frustumCulled=!1,r.add(M);let C=[],R=[];{let Q=new I(0,1,0),de=new qn;for(let Se of[1,-1])_.forEach((ae,_e)=>{let ye=ae.phi*Se,{point:Ae,normal:W}=U0(ye);de.setFromUnitVectors(Q,W);let z=Ae.clone().addScaledVector(W,-.008);C.push({pos:z,normal:W.clone(),q:de.clone(),size:ae.size,order:_e,side:Se});let We=_e===0?ae.phi-(ae.size+.012)/Zr(ae.phi):_[_e-1].phi,ke=(ae.phi+We)/2*Se;for(let Le of[-1,1]){let xe=U0(ke,Le*ae.size*.36);R.push({pos:xe.point.clone().addScaledVector(xe.normal,.004),size:.03,order:_e,side:Se})}if(_e===_.length-1){let Le=(ae.phi+(ae.size+.012)/2/Zr(ae.phi))*Se;for(let xe of[-1,1]){let B=U0(Le,xe*ae.size*.36);R.push({pos:B.point.clone().addScaledVector(B.normal,.004),size:.028,order:_e+.5,side:Se})}}})}let w={band:-1,prongs:-1,morph:-1,metal:-1,halo:-1,pave:-1},P=new Je,U=new I,N=new I,H=new qn,k=[0,0],te=(Zr(0)-Fu)/P0,K=[],L=[];function oe(Q,de,Se,ae=K){let ye=Q.length;for(let Ae=0;Ae<6;Ae++){let W=Math.round(Ae/6*(Se?ye:ye-1))%ye,z=Math.round((Ae+1)/6*(Se?ye:ye-1))%ye;if(W===z)continue;let We=Q[W],ke=Q[z];ae.push([We.x,We.y,We.z,de,ke.x,ke.y,ke.z])}}let ce=Array.from({length:ap},()=>({pos:new I,closed:0,on:0})),Ie={pave:[],halo:[]},pe=(Q,de,Se,ae)=>{Se>.5&&Se<1&&Q.push({pos:de.clone(),s:Math.sin(Math.PI*(Se-.5)/.5),size:ae})};function be(Q,de){let Se=new jc(Array.from({length:6},()=>new I),!1,"centripetal");K.length=0;let ae=Se.points,_e=Ms(0,1,de);for(let Ae=0;Ae<ap;Ae++){let[W,z]=pA(Q,Ae),We=h[Ae],ke=ce[Ae];ke.on=z;let Le=Ms(.15,.85,z),xe=Ae<4?[0,.16,.08,.24][Ae]*1.4:.1,B=Ms(xe,xe+.62,_e)*Le;if(B<=.001){ke.closed=0,We.begin(),We.end();continue}let b=Bu(Q,W);Uu(Q,W,k);let V=(Pe,Be)=>{let me=Fl(Q,W,Pe);return[me[0]+k[0]*Be,me[1]+k[1]*Be]},$=b[1]*.48;ae[0].set(b[0]*.18,te-.035-$*$*P0/(2*Zr(0)),$);let ie=V(-.3,.064);ae[1].set(ie[0],-.3,ie[1]),ie=V(-.13,.062),ae[2].set(ie[0],-.13,ie[1]),ae[3].set(b[0]+k[0]*.058,-.01,b[1]+k[1]*.058),ae[4].set(b[0]+k[0]*.048,.048,b[1]+k[1]*.048),ae[5].set(b[0]*.965+k[0]*.026,.074,b[1]*.965+k[1]*.026);let ne=48,Me=[];for(let Pe=0;Pe<ne;Pe++)Me.push(Se.getPointAt(Pe/(ne-1)*B));ke.pos.copy(Me[ne-1]),ke.closed=B;let ve=Pe=>(.062-.008*Pe*B)*(.55+.45*Le);We.sweep(Me,ve,{capEnd:!0,capSteps:10});for(let Pe=0;Pe<4;Pe++){let Be=Me[Math.round(Pe/4*(ne-1))],me=Me[Math.round((Pe+1)/4*(ne-1))];K.push([Be.x,Be.y,Be.z,ve((Pe+.5)/4),me.x,me.y,me.z])}}let ye=Ms(.35,1,_e);if(ye<=.001)d.begin(),d.end();else{let Ae=[],W=ye>=.999,z=100,We=W?z:Math.max(2,Math.round(z*ye)+1),ke=-.28;for(let Le=0;Le<We;Le++){let xe=W?Le/z*Math.PI*2:Le/(We-1)*Math.PI*2*ye-Math.PI/2,B=Fl(Q,xe,ke);Uu(Q,xe,k),Ae.push(new I(B[0]+k[0]*.03,ke,B[1]+k[1]*.03))}d.sweep(Ae,.024,{up:new I(0,1,0),closed:W,capStart:!W,capEnd:!W}),oe(Ae,.024,W)}return _e}let Z=[];function le(Q,de){let ae=Ms(0,.55,de);if(L.length=0,Ie.halo.length=0,de<=.001){p.begin(),p.end(),x.count=0,x.visible=!1;return}if(ae<=.001)p.begin(),p.end();else{let W=[],z=ae>=.999,We=120,ke=z?We:Math.max(2,Math.round(We*ae)+1);for(let Le=0;Le<ke;Le++){let xe=z?Le/We*Math.PI*2:Le/(ke-1)*Math.PI*2*ae+Math.PI/2,B=Fl(Q,xe,-.12-.01);Uu(Q,xe,k),W.push(new I(B[0]+k[0]*.036,-.12-.01,B[1]+k[1]*.036))}p.sweep(W,.044,{up:new I(0,1,0),closed:z,capStart:!z,capEnd:!z}),oe(W,.044,z,L)}GD(Q,-.12,.066,.118,Z);let _e=[];for(let W=0;W<ap;W++){let[z,We]=pA(Q,W);if(We>.5){let ke=Fl(Q,z,-.12);Uu(Q,z,k),_e.push([ke[0]+k[0]*.066,ke[1]+k[1]*.066])}}let ye=0,Ae=new I(0,1,0);for(let W of Z){if(ye>=m)break;if(_e.some(B=>Math.hypot(B[0]-W.x,B[1]-W.z)<.1))continue;let z=(W.a/(Math.PI*2)+.75)%1,We=Ms(.3+z*.55,.3+z*.55+.12,de);if(We<=.001)continue;let Le=new I(W.nx,0,W.nz).clone().multiplyScalar(Math.cos(.3)).addScaledVector(Ae,Math.sin(.3)).normalize();U.set(W.x,-.12+.008,W.z).addScaledVector(Le,(1-We)*.22),H.setFromUnitVectors(Ae,Le);let xe=.104*(.7+.3*We);N.set(xe,xe,xe),x.setMatrixAt(ye++,P.compose(U,H,N)),pe(Ie.halo,U.clone().addScaledVector(Le,xe*.3),We,.26)}x.count=ye,x.instanceMatrix.needsUpdate=!0,x.visible=ye>0}function G(Q){let de=0,Se=_.length;Ie.pave.length=0;for(let _e of C){let ye=_e.order/Se*.75,Ae=Ms(ye,ye+.18,Q);if(Ae<=.001)continue;let W=_e.size*(.7+.3*Ae);N.set(W,W,W),U.copy(_e.pos).addScaledVector(_e.normal,(1-Ae)*.3),S.setMatrixAt(de++,P.compose(U,_e.q,N)),pe(Ie.pave,U.clone().addScaledVector(_e.normal,W*.3),Ae,_e.size*2.4)}S.count=de,S.instanceMatrix.needsUpdate=!0,S.visible=de>0;let ae=0;H.identity();for(let _e of R){let ye=_e.order/Se*.75+.1,Ae=Ms(ye,ye+.12,Q);if(Ae<=.001)continue;let W=_e.size*Ae;N.set(W,W,W),M.setMatrixAt(ae++,P.compose(_e.pos,H,N))}M.count=ae,M.instanceMatrix.needsUpdate=!0,M.visible=ae>0}let ue=new qe;return{group:r,head:s,pave:S,halo:x,metals:u,stoneMaterial:g,tips:ce,get setting(){return K.concat(L)},bandEnds:f.ends,get bandGrow(){return f.g},update(Q){Q.band!==w.band&&(f.set(Q.band),w.band=Q.band);let de=Q.morph!==w.morph;if((de||Q.prongs!==w.prongs)&&(be(Q.morph,Q.prongs),w.prongs=Q.prongs),(de||Q.halo!==w.halo)&&(le(Q.morph,Q.halo),w.halo=Q.halo),w.morph=Q.morph,Q.pave!==w.pave&&(G(Q.pave),w.pave=Q.pave),Q.metal!==w.metal){let Se=Math.min(1,Math.floor(Q.metal)),ae=Math.min(1,Math.max(0,Q.metal-Se));Dr.metalA.value.copy(dA[Se]),Dr.metalB.value.copy(dA[Math.min(2,Se+1)]),Dr.front.value=-.3+ae*(Math.PI+.6),Dr.seam.value=Math.sin(Math.PI*ae)*1.4;let _e=Ms(Dr.front.value-.14,Dr.front.value+.14,.14);ue.copy(Dr.metalB.value).lerp(Dr.metalA.value,_e);for(let ye of u)ye.color.copy(ue);w.metal=Q.metal}Dr.forge.value.set(Math.PI*(1-Math.min(1,Math.max(0,Q.band))),Q.forge||0)},syncFlow(){Dr.ringInv.value.copy(r.matrixWorld).invert()},sparks:Ie,setRoughness(Q){o.roughness=Q,l.roughness=Q,c.roughness=Q+.05}}}function VD(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d");t.globalCompositeOperation="lighter";let n=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256*.16);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,250,240,0.55)"),n.addColorStop(1,"rgba(255,245,230,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);let r=(a,o,l,c)=>{t.save(),t.translate(256/2,256/2),t.rotate(a),t.scale(1,l);let u=t.createRadialGradient(0,0,0,0,0,o);u.addColorStop(0,`rgba(255,255,255,${c})`),u.addColorStop(.35,`rgba(255,250,242,${c*.35})`),u.addColorStop(1,"rgba(255,245,235,0)"),t.fillStyle=u,t.beginPath(),t.arc(0,0,o,0,Math.PI*2),t.fill(),t.restore()};r(0,256*.5,.022,.95),r(Math.PI/2,256*.5,.022,.95),r(Math.PI/4,256*.26,.02,.45),r(-Math.PI/4,256*.26,.02,.45);let s=new sl(e);return s.colorSpace=it,s}function WD(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.2,"rgba(255,240,220,0.5)"),n.addColorStop(1,"rgba(255,230,200,0)"),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new sl(e);return r.colorSpace=it,r}var F0=Math.cos(fn.degToRad(4.5));function vA(i,{max:e=3,paveMax:t=3,pingMax:n=6}={}){let r=VD(),s=WD(),a=(C,R=0)=>{let w=new rl({map:C,blending:Js,depthWrite:!1,depthTest:!0,transparent:!0,rotation:R,toneMapped:!1}),P=new Wc(w);return P.visible=!1,P.renderOrder=10,i.add(P),P},o=[];for(let C=0;C<e+t;C++)o.push(a(r,.21));let l=[a(s),a(s)],c=[];for(let C=0;C<n;C++)c.push(a(r,.62));let u=()=>bd,f=new I,h=new I,d=new I,p=new I,v=new I,g=new I,m=new I,x=new I,_=new et,y=new Je,S=new qn,T=new I,E=new I,A=new I(0,1,0);function M(C,R,w,P,U){g.subVectors(R,w.position).normalize(),m.copy(g).reflect(C);let N=0,H=Math.cos(P),k=Math.sin(P);for(let te of u()){x.set(te.dir.x*H+te.dir.z*k,te.dir.y,-te.dir.x*k+te.dir.z*H);let K=m.dot(x);K>F0&&(N+=te.power*Math.pow((K-F0)/(1-F0),U))}return N}return{update(C,{diamond:R,pave:w,envAngle:P,strength:U=1,ends:N=null,endGlow:H=0,size:k=1,pings:te=null}){let K=[];if(R&&R.visible&&U>0){let pe=R.geometry.attributes.position.array,be=new Set;R.updateWorldMatrix(!0,!1),_.getNormalMatrix(R.matrixWorld);let Z=R.matrixWorld.getMaxScaleOnAxis();for(let le=0;le<pe.length/9;le++){let G=le*9;if(f.set(pe[G],pe[G+1],pe[G+2]),h.set(pe[G+3],pe[G+4],pe[G+5]),d.set(pe[G+6],pe[G+7],pe[G+8]),p.subVectors(h,f).cross(v.subVectors(d,f)).normalize(),p.y<.25)continue;let ue=`${Math.round(p.x*40)},${Math.round(p.y*40)},${Math.round(p.z*40)}`;if(be.has(ue))continue;be.add(ue),v.copy(f).add(h).add(d).multiplyScalar(1/3),v.applyMatrix4(R.matrixWorld),p.applyMatrix3(_).normalize();let Q=M(p,v,C,P,2.2);Q>.05&&K.push({pos:v.clone().addScaledVector(p,.03*Z),s:Math.min(1.4,Q)*U,size:.42*Z*k})}}K.sort((pe,be)=>be.s-pe.s);let L=K.slice(0,e),oe=[];if(w&&w.visible&&w.count>0&&U>0){w.updateWorldMatrix(!0,!1);for(let pe=0;pe<w.count;pe++){w.getMatrixAt(pe,y),y.premultiply(w.matrixWorld),y.decompose(T,S,E),p.copy(A).applyQuaternion(S);let be=M(p,T,C,P,1.4);be>.05&&oe.push({pos:T.clone().addScaledVector(p,.02),s:Math.min(1.1,be)*U,size:Math.max(E.x,.05)*2.6*k})}oe.sort((pe,be)=>be.s-pe.s)}let ce=L.concat(oe.slice(0,t));o.forEach((pe,be)=>{let Z=ce[be];if(pe.visible=!!Z,Z){pe.position.copy(Z.pos);let le=Math.min(1,Z.s);pe.scale.setScalar(Z.size*(.45+.55*le)),pe.material.color.setScalar(1.25*Z.s)}}),l.forEach((pe,be)=>{pe.visible=!!N&&H>.01,pe.visible&&(pe.position.copy(N[be]),pe.scale.setScalar(.3),pe.material.color.setScalar(3.2*H))});let Ie=te?te.slice().sort((pe,be)=>be.s-pe.s):[];c.forEach((pe,be)=>{let Z=Ie[be];pe.visible=!!Z,Z&&(pe.position.copy(Z.pos),pe.scale.setScalar(Z.size*(.35+.65*Z.s)),pe.material.color.setScalar(2.2*Z.s))})},hide(){o.forEach(C=>C.visible=!1),l.forEach(C=>C.visible=!1),c.forEach(C=>C.visible=!1)}}}var kn={high:{name:"high",dpr:2,supersample:1.5,msaa:4,bounces:8,waves:7,ss:4,exact:!0,cube:512,metal:512,grain:!0,dof:!0,ao:!0},medium:{name:"medium",dpr:1.5,supersample:1,msaa:2,bounces:6,waves:7,ss:1,exact:!0,cube:512,metal:256,grain:!0,dof:!1,ao:!1},low:{name:"low",dpr:1,supersample:1,msaa:0,bounces:4,tail:.85,waves:3,ss:1,exact:!1,cube:256,metal:256,grain:!1,dof:!1,ao:!1},lite:{name:"lite",dpr:1,supersample:1,msaa:0,bounces:3,tail:.5,waves:3,ss:1,exact:!1,cube:256,metal:256,grain:!1,dof:!1,ao:!1}},XD=[["#221b14","#030304"],["#2e2318","#080605"],["#1a2333","#05070b"],["#ffffff","#ffffff"],["#1f2738","#0b0e14"]];function kl(){return{tx:0,ty:Fu,tz:0,dist:3.6,az:.55,el:.3,fov:24,shift:0,shiftY:0,spin:0,wobble:1,shimmer:1,band:0,prongs:0,morph:0,metal:0,halo:0,pave:0,env:0,exposure:1,bg:0,glint:0,endGlow:1,glow:0,dof:0,focus:0,mood:0,turn:0,motes:0,beam:0,pool:0,bloom:1,spinTall:0,sweep:-2,sweepGain:0,idle:0,forge:0}}var YD=`
	varying vec2 vUv;
	void main() {
		vUv = position.xy * 0.5 + 0.5;
		gl_Position = vec4( position.xy, 0.99999, 1.0 );
	}
`,qD=`
	uniform vec3 inner;
	uniform vec3 outer;
	uniform vec2 centre;
	uniform float aspect;
	uniform float spread;
	varying vec2 vUv;
	void main() {
		vec2 d = ( vUv - centre ) * vec2( aspect, 1.0 );
		float t = smoothstep( 0.0, spread, length( d ) );
		vec3 c = mix( inner, outer, t );
		// A touch of dither so the gradient never bands.
		float n = fract( sin( dot( gl_FragCoord.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
		c += ( n - 0.5 ) / 255.0;
		gl_FragColor = vec4( c, 1.0 );
	}
`,N0=class extends eo{constructor(){super("GradeEffect",`
			uniform float exposure;
			void mainImage( const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
				outputColor = vec4( inputColor.rgb * exposure, inputColor.a );
			}
		`,{uniforms:new Map([["exposure",new we(1)]])})}};function xA(i,{tier:e=kn.high,preserve:t=!1,aoPass:n=null}={}){let r=new Ad({canvas:i,antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",preserveDrawingBuffer:t});r.toneMapping=$i,r.outputColorSpace=it;let s=new br,a=new An(24,1,.05,80),o=n1(r,{size:e.cube,metal:e.metal});s.environment=o.env;let l=e.exact?t1():null,c=gA({cube:o.cube,rotation:o.rotation,studio:l});s.add(c.group),c.head.rotation.y=Math.PI/2;let u=hA(o.cube,{bounces:e.bounces,waves:e.waves,ss:e.ss,studio:l,setting:o.bright});u.material.uniforms.envRotation.value=o.rotation,c.head.add(u.mesh);let f=new rt({vertexShader:YD,fragmentShader:qD,depthWrite:!1,depthTest:!1,uniforms:{inner:{value:new qe},outer:{value:new qe},centre:{value:new Ce(.5,.55)},aspect:{value:1},spread:{value:1.05}}}),h=new Rt(new gs(2,2),f);h.frustumCulled=!1,h.renderOrder=-1e3,s.add(h);let d=vA(s),p=i1(s),v=new I(0,Fu,0),g=new Ce,m=0,x=null,_,y,S,T,E=null,A=null,M=null,C=null,R=n,w={w:1,h:1};function P(G){_&&_.dispose(),_=new Hy(r,{frameBufferType:hi,multisampling:G.msaa}),_.addPass(new Qy(s,a)),C=null,G.ao&&R&&(C=new R(s,a,w.w,w.h),Object.assign(C.configuration,{aoRadius:.09,distanceFalloff:.6,intensity:2.2,aoSamples:16,denoiseSamples:8,denoiseRadius:8,gammaCorrection:!1,halfRes:!1}),_.addPass(C)),A=null,M=null,G.dof&&(A=new qy(a,{focusDistance:3,focusRange:.6,bokehScale:0,resolutionScale:.5}),M=new Zg(a,A),M.enabled=!1,_.addPass(M)),S=new Wy({intensity:.35,luminanceThreshold:1.6,luminanceSmoothing:.4,mipmapBlur:!0,radius:.62,levels:8}),y=new N0;let ue=new Ky({mode:Ci.NEUTRAL});T=new Jy({offset:.3,darkness:.55});let Q=[S,y,ue,T];E=null,G.grain&&(E=new Zy({premultiply:!0,blendFunction:ft.SCREEN}),E.blendMode.opacity.value=.045,Q.push(E)),_.addPass(new Zg(a,...Q))}P(e);function U(G){let ue=c.pave&&c.pave.material.uniforms;ue&&ue.bounces&&(ue.bounces.value=Math.min(4,G.bounces));for(let Q of[u.material.uniforms,ue])Q&&Q.tail&&(Q.tail.value=G.tail===void 0?1:G.tail)}U(e);let N=new qe,H=new qe,k=XD.map((G,ue)=>[new qe(G[0]).multiplyScalar(ue===3?2.2:1),new qe(G[1]).multiplyScalar(ue===3?2.2:1)]),te=[new I,new I],K=new I,L=new I,oe=new I,ce=new I,Ie=[],pe=Array.from({length:24},()=>({pos:new I,s:0,size:0}));function be(G,ue){let Q=G.sweep,de=G.sweepGain;(Math.abs(Q)>=1.4||de<=0)&&(Q=ue/6.5%1*4-1.6,de=G.idle);let Se=1-fn.smoothstep(Math.abs(Q),1,1.4),ae=de*Se;if(ae<=.001){Ss.dir.value.w=0;return}K.copy(a.position).sub(Z).normalize(),L.set(0,1,0).applyQuaternion(a.quaternion),oe.copy(K).applyAxisAngle(L,Q*1.05).addScaledVector(L,.3).normalize(),ce.crossVectors(oe,L).normalize(),Ss.axis.value.set(ce.x,ce.y,ce.z,.085),Ss.dir.value.set(oe.x,oe.y,oe.z,ae)}let Z=new I;function le(G){let ue=Math.max(0,Math.min(k.length-1,Math.floor(G))),Q=Math.min(k.length-1,ue+1),de=Math.min(1,Math.max(0,G-ue));N.copy(k[ue][0]).lerp(k[Q][0],de),H.copy(k[ue][1]).lerp(k[Q][1],de),f.uniforms.inner.value.copy(N),f.uniforms.outer.value.copy(H)}return{renderer:r,scene:s,camera:a,ring:c,diamond:u,studio:o,tier:e,get size(){return w},resize(G,ue,Q){w.w=G,w.h=ue,r.setPixelRatio(Q),r.setSize(G,ue,!1),_.setSize(G,ue),a.aspect=G/ue,f.uniforms.aspect.value=G/ue,a.updateProjectionMatrix()},setTier(G){this.tier=G,u.setQuality({bounces:G.bounces,ss:G.ss,waves:G.waves,exact:G.exact}),U(G),P(G),_.setSize(w.w,w.h)},useAO(G){R=G,this.tier.ao&&(P(this.tier),_.setSize(w.w,w.h))},warm(){let G=r.getRenderTarget();r.setRenderTarget(_.inputBuffer);let ue;try{ue=r.compileAsync(s,a)}finally{r.setRenderTarget(G)}return ue},stoneCoverage(){let G=u.mesh.geometry;G.boundingSphere||G.computeBoundingSphere();let ue=G.boundingSphere.center.clone().applyMatrix4(u.mesh.matrixWorld),Q=G.boundingSphere.radius*u.mesh.matrixWorld.getMaxScaleOnAxis(),de=a.position.distanceTo(ue);if(de<=Q)return 1;let Se=Q/(de*Math.tan(fn.degToRad(a.fov)/2));return Math.min(1,Math.PI*Se*Se/(4*a.aspect))},async bench(G,ue=3){let Q=r.getContext(),de=new Uint8Array(4),Se=[];for(let ae=0;ae<=ue;ae++){let _e=performance.now();this.render(G,ae*.04),r.setRenderTarget(null),Q.readPixels(0,0,1,1,Q.RGBA,Q.UNSIGNED_BYTE,de);let ye=performance.now()-_e;if((ae>0||ye>1500)&&Se.push(ye),ye>(ae?300:1500))break;await new Promise(Ae=>setTimeout(Ae,0))}return Se.sort((ae,_e)=>ae-_e),Se[Math.floor((Se.length-1)/2)]},render(G,ue){let Q=Math.cos(G.el),de=w.w/w.h,Se=w.w,ae=w.h,_e=ae>Se*1.05,ye=_e?0:fn.clamp((1.75-de)/.5,0,1),Ae=de<1.25?Math.min(2.4,Math.pow(1.6/de,.62)):1;Ae*=1+.25*ye;let W=G.fov;Ae!==1&&(W=fn.radToDeg(2*Math.atan(Math.tan(fn.degToRad(W/2))*Ae))),a.fov=W,a.position.set(G.tx+G.dist*Q*Math.sin(G.az),G.ty+G.dist*Math.sin(G.el),G.tz+G.dist*Q*Math.cos(G.az)),a.up.set(0,1,0),Z.set(G.tx,G.ty,G.tz),a.lookAt(Z);let z=_e?0:G.shift*(1+.45*ye),We=_e?G.shiftY:0;z||We?a.setViewOffset(Se,ae,-z*Se*.5,We*ae*.5,Se,ae):a.clearViewOffset(),a.updateProjectionMatrix(),f.uniforms.centre.value.set(.5+z*.5,.53+We*.5),f.uniforms.spread.value=1.05-.38*G.pool;let ke=x===null?0:Math.min(.1,Math.max(0,ue-x));if(x=ue,(G.turn||0)>5e-4)m+=G.turn*ke;else{let $=Math.round(m/(Math.PI*2))*Math.PI*2;m=$+(m-$)*Math.exp(-ke*2.5)}u.mesh.rotation.y=m,c.group.rotation.y=G.spin+(_e?G.spinTall:0)+G.wobble*Math.sin(ue*.32)*.28,l?l.mood(G.mood):Kg(G.mood),c.update(G),u.setMorph(G.morph),u.setSetting(c.setting,c.metals[1].color),u.material.uniforms.glow.value=G.glow;let Le=G.env+G.shimmer*Math.sin(ue*.19+1.3)*.42;o.setAngle(Le),s.environmentRotation.y=Le,le(G.bg),y.uniforms.get("exposure").value=G.exposure;let xe=Math.max(0,1-Math.abs(G.bg-3)*2);T.darkness=.55*(1-xe),S.intensity=.35*G.bloom*(1-xe),S.luminanceMaterial.threshold=Math.max(.9,1.6-.45*(G.bloom-1)),E&&(E.blendMode.opacity.value=.045*(1-xe)),M&&(M.enabled=G.dof>.01,A.bokehScale=G.dof*3.2,A.cocMaterial.focusDistance=G.focus||G.dist,A.cocMaterial.focusRange=.25+G.dist*.12),s.updateMatrixWorld(),c.syncFlow(),be(G,ue);let B=G.band>.001&&G.band<.999;te[0].copy(c.bandEnds[0]).applyMatrix4(c.group.matrixWorld),te[1].copy(c.bandEnds[1]).applyMatrix4(c.group.matrixWorld),r.getDrawingBufferSize(g),p.update({time:ue,centre:v,motes:G.motes*(1-xe),beam:G.beam*(1-xe),pxScale:g.y/(2*Math.tan(fn.degToRad(a.fov)/2))}),Ie.length=0;let b=0,V=($,ie,ne,Me)=>{if(ne>.02&&b<pe.length){let ve=pe[b++];ve.pos.copy($).applyMatrix4(ie.matrixWorld),ve.s=ne,ve.size=Me,Ie.push(ve)}};for(let $ of c.tips)$.on>.5&&V($.pos,c.head,Math.sin(Math.PI*fn.clamp(($.closed-.7)/.3,0,1)),.75);for(let $ of c.sparks.halo)V($.pos,c.head,$.s,$.size);for(let $ of c.sparks.pave)V($.pos,c.group,$.s,$.size);d.update(a,{diamond:u.mesh,pave:c.pave,envAngle:Le,strength:G.glint,ends:te,endGlow:B?G.endGlow*Math.min(1,(1-G.band)*6):0,pings:Ie}),_.render()}}}var QD=18,lp={opening:[0,4.6],shapes:[4.6,11.8],details:[11.8,18]},O0=[{in:-1,out:.3,hold:.01},{in:2.2,out:4.3,hold:4.4},{in:5.3,out:8.4,hold:6.45},{in:9.55,out:11.5,hold:11.6},{in:12.75,out:14.8,hold:14.8},{in:15.7,out:0,hold:17.9}],_A=[5.55,6.4,7.3,8.2],yA=[9.3,10.4,11.4];function z0(){return Object.assign(kl(),{tx:0,ty:2.12,tz:0,dist:4.3,az:.55,el:.72,fov:24,shift:.42,shiftY:.6,spin:.2,wobble:0,shimmer:.6,bg:0,mood:1,turn:.2,glint:.8,motes:.6,pool:1,bloom:1.6,idle:4.5})}function AA(i,e){let t=(r,s,a,o)=>i.to(e,{...s,duration:a,ease:o},r),n=(r,s,a=4)=>{i.fromTo(e,{sweep:-1.4},{sweep:1.4,duration:s,ease:"none",immediateRender:!1},r),i.to(e,{sweepGain:a,duration:.15,ease:"none"},r),i.to(e,{sweepGain:0,duration:.15,ease:"none"},r+s-.15)};return t(0,{el:.84,dist:3.97,idle:0},.6,"power1.in"),t(0,{env:1.3},1.4,"none"),t(.55,{el:1.1,dist:3,az:1.2,shift:.1,shiftY:.36,spin:.95,mood:.85},.85,"power2.out"),t(.9,{glint:1},.5,"none"),n(.5,.95,4.2),t(1.4,{el:.42,dist:9.2,az:.85,ty:.85,shiftY:.3},3.2,"power2.inOut"),t(1.4,{shift:.38},.8,"power2.inOut"),t(1.4,{spin:-.55},.35,"power1.inOut"),t(1.4,{turn:0,mood:.55,glint:.45,motes:.4,bloom:1.25},1.2),t(1.6,{forge:1},.3,"none"),t(1.7,{band:1},1.5,"power1.inOut"),t(3,{forge:0},.7,"power1.in"),t(3,{prongs:1},1.15,"power1.inOut"),t(3.1,{spin:.3},1.5,"power2.inOut"),t(3.2,{env:2.1},1.4,"power1.inOut"),n(3.75,.6,3.2),t(4.6,{ty:2.12,dist:5.2,el:1.38,az:0,shift:.3,shiftY:.27,spin:Math.PI/2,spinTall:-Math.PI/2,mood:.8,glint:.6,dof:.55},1),t(5.7,{morph:1,env:2.6},.6),t(6.6,{morph:2,env:3.1},.6),t(7.5,{morph:3,env:3.6},.6),n(5.6,.8,3.6),n(6.5,.8,3.6),n(7.4,.8,3.6),t(8.6,{ty:.8,dist:10.8,el:.2,az:1.1,shift:-.27,shiftY:.4,dof:0,mood:.45,glint:.4},1.1),t(8.6,{spin:.3,spinTall:0},1.1),t(9.7,{spin:.55},2.1,"none"),t(9.5,{metal:1,env:5.2},.95,"power1.inOut"),t(10.55,{metal:2,env:6.3},.95,"power1.inOut"),n(9.55,.85,2.6),n(10.6,.85,2.6),t(11.8,{tx:0,ty:1.95,dist:4.6,el:.08,az:.3,fov:22,shift:-.47,shiftY:.24,wobble:.15,spin:0,dof:1,mood:.6},1),t(12.5,{halo:1},1,"none"),t(13.5,{tx:.7,ty:1.25,dist:3.7,el:.36,az:.35,shift:-.42},1.2),t(13.7,{pave:1},1,"none"),n(14.1,.65,2.4),t(15,{tx:0,ty:1,dist:7.7,el:1.1,az:.05,fov:24,shift:.4,shiftY:.42,bg:1,exposure:.95,wobble:.5,dof:0,mood:.7,glint:.55,motes:.55,bloom:1.3},1.4),t(15,{spin:-.62},1.4),t(16.4,{spin:-.22},1.6,"none"),n(16.3,1.1,2.6),i.set({},{},QD),i}var SA={el:1.1,dist:3,az:1.2,shift:.1,shiftY:.36,spin:.95,mood:.85,glint:1,motes:.6,turn:.2,sweep:0,sweepGain:5},ga="";function k0(){return ga}function MA(i=ga){return/swiftshader|llvmpipe|softpipe|software|basic render/i.test(i)}function TA(i){if(i&&kn[i])return kn[i];let e=matchMedia("(pointer: coarse)").matches,t=Math.min(screen.width,screen.height)<820,n=navigator.hardwareConcurrency||8,r=navigator.deviceMemory||8,s=ga.toLowerCase();return e&&t?r<=3||n<=2?kn.low:kn.medium:/nvidia|geforce|quadro|rtx|radeon\s?(rx|pro)|arc\s?a\d/.test(s)?kn.high:/intel|iris|uhd|radeon\(tm\) graphics|radeon graphics|vega|mali|adreno|powervr/.test(s)?kn.low:n<=4||r<=4?kn.low:kn.medium}function EA(i=!1){if(i||navigator.connection&&navigator.connection.saveData)return!1;try{let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;if(ga=String(e.getParameter(e.RENDERER)||""),!ga||/^webkit webgl$/i.test(ga)){let n=e.getExtension("WEBGL_debug_renderer_info");ga=String(n&&e.getParameter(n.UNMASKED_RENDERER_WEBGL)||ga)}let t=e.getExtension("WEBGL_lose_context");return t&&t.loseContext(),!0}catch{return!1}}var nr=[["high",1],["medium",1],["medium",.8],["low",1],["low",.8],["low",.65],["lite",.65],["lite",.5]],wA={high:1,medium:.4,low:.22,lite:.17},G0=26;function V0(i){return Math.max(0,nr.findIndex(e=>e[0]===i[0]&&e[1]===i[1]))}function H0(i,e,t){return i*(wA[t[0]]/wA[e[0]])*Math.pow(t[1]/e[1],2)}var bA="wk-film-fit";function CA(){try{let i=JSON.parse(sessionStorage.getItem(bA)||"null");return i==="off"||Array.isArray(i)&&kn[i[0]]&&i[1]>0?i:null}catch{return null}}function Ts(i){try{sessionStorage.setItem(bA,JSON.stringify(i))}catch{}}async function RA(i,e,t,n=G0,r=null){let s=await(r||t)();if(r&&s<=n&&(s=await t()),i[0]==="medium"&&i[1]===1&&H0(s,i,nr[0])<=n*.8){if(await e(nr[0]),await t()<=n)return nr[0];await e(i)}for(let a=0;s>n&&a<4;a++){let o=V0(i);if(o>=nr.length-1)break;if(H0(s,i,nr[nr.length-1])>n*2.2)return null;let l=o+1;for(;l<nr.length-1&&H0(s,i,nr[l])>n;)l++;i=nr[l],await e(i),s=await t()}return s<=n*1.6?i:null}function DA(){let i=0,e=0,t=0,n=12,r=0,s=0;return{reset(a=12){i=0,e=0,t=0,n=a,r=0,s=0},tick(a){let o=i?a-i:0;if(i=a,!o)return"";if(r=r||a,n>0&&a-r<600)return n--,"";if(n=0,e+=Math.min(o,1500),t++,t<20&&e<1e3)return"";let l=e/t;return e=0,t=0,l<=38?(s=0,""):(s++,l>70||s>=2?"down":"")}}}var PA={THREE:{Color:qe,WebGLRenderTarget:vt,LinearFilter:Vt,NearestFilter:Ct,HalfFloatType:hi,RGBAFormat:Mn,DepthTexture:zi,UnsignedInt248Type:Vr,UnsignedIntType:Sn,DepthStencilFormat:dr,DepthFormat:hr,Matrix4:Je,DataTexture:fr,ShaderMaterial:rt,NoColorSpace:bi,RepeatWrapping:$o,Vector2:Ce,REVISION:Qn,RedFormat:ta,FloatType:nn,GLSL3:uu,Vector3:I,Sphere:Cr,BufferAttribute:ut,BufferGeometry:Lt,Float32BufferAttribute:on,OrthographicCamera:vs,Mesh:Rt},PP:{Pass:Ri}};xr.registerPlugin(ot,Eh);var Pr=new URLSearchParams(location.search),Hn=Pr.has("capture"),ws=!!kn[Pr.get("tier")],ZD=!Hn&&(!ws||Pr.has("fit")),KD=Number(Pr.get("fit"))||G0,Es=!Hn&&matchMedia("(prefers-reduced-motion: reduce)").matches,Jr=(i,e=document)=>e.querySelector(i),Kr=(i,e=document)=>[...e.querySelectorAll(i)],pi=document.documentElement,W0=window.wkFilm&&window.wkFilm.ao||"";function JD(){return document.body.classList.contains("elementor-editor-active")||!!(window.elementorFrontend&&window.elementorFrontend.isEditMode&&window.elementorFrontend.isEditMode())}function X0(){let i=Jr(".wk-sticky"),e=i&&Jr(".hd",i);if(!e)return 0;let t=parseFloat(getComputedStyle(pi).getPropertyValue("--wp-admin--admin-bar--height"))||0;return e.offsetHeight+t}function jD(i){return new Promise(e=>window.requestIdleCallback?requestIdleCallback(()=>e(),{timeout:i}):setTimeout(e,1))}async function IA(){let i=Kr(".wk-film .film-act");if(!i.length||pi.classList.contains("film-on"))return;if(JD()){pi.classList.add("film-editor");return}pi.classList.add("film-on"),Hn&&pi.classList.add("film-capture");let e="",t=()=>{let O=X0(),Y=i.find(Te=>Te.dataset.act==="opening"),q=Y?Math.max(0,Math.round(Y.getBoundingClientRect().top+scrollY-O)):0,re=O+"|"+Math.round(Math.min(q,innerHeight*.3));return re===e?!1:(e=re,pi.style.setProperty("--film-top",O+"px"),pi.style.setProperty("--film-lift",re.split("|")[1]+"px"),!0)};t();let n=EA(Pr.has("no3d")),r=n&&(Hn||ws||Pr.has("fit")||!MA()),s="";if(!r){let O=!!(navigator.connection&&navigator.connection.saveData);s=Pr.has("no3d")?"turned off in the address (?no3d)":n?"software graphics (no graphics chip in use)":O?"Data Saver is on":"this browser has 3D graphics (WebGL 2) switched off or unavailable; get.webgl.org/webgl2 shows the same"}r||pi.classList.add("film-no3d"),document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise(O=>setTimeout(O,2500))]),t();let a=z0(),o=AA(xr.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),a),l=i.find(O=>O.dataset.act==="opening");Kr(".film-chap").forEach(O=>{let Y=Number(O.dataset.chapter),q=O0[Y];if(!q)return;if(Y===0){o.to(O,{autoAlpha:0,y:-40,duration:.45,ease:"power2.in"},q.out);return}let re=Jr("[data-split]",O),Te=re?Eh.create(re,{type:"lines",mask:"lines",linesClass:"film-line"}).lines:[],F=Kr(":scope > :not([data-split])",O);o.set(O,{autoAlpha:1},q.in),Te.length&&o.from(Te,{yPercent:115,stagger:.07,duration:.55,ease:"power3.out"},q.in),o.from(F,{opacity:0,y:18,stagger:.06,duration:.5,ease:"power2.out"},q.in+.12),q.out&&o.to(O,{autoAlpha:0,y:-30,duration:.45,ease:"power2.in"},q.out)}),Kr(".film-cue").forEach(O=>o.to(O,{opacity:0,duration:.2},.1)),Kr(".film-year").forEach(O=>o.fromTo(O,{opacity:0,yPercent:8},{opacity:1,yPercent:0,duration:1.2,ease:"power2.out"},15.3)),Kr(".film-shown").forEach(O=>o.fromTo(O,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.5,ease:"power2.out"},16.1)),Kr(".film-scrim.l").forEach(O=>{o.to(O,{opacity:0,duration:.6},8.7),o.to(O,{opacity:1,duration:.6},15)}),Kr(".film-scrim.r").forEach(O=>{o.to(O,{opacity:1,duration:.6},8.9),o.to(O,{opacity:0,duration:.6},14.8)});let c=Kr("[data-film-shape]"),u=Kr("[data-film-metal]"),f="";o.eventCallback("onUpdate",()=>{let O=Math.round(a.morph)%4,Y=Math.round(a.metal),q=O+"|"+Y;q!==f&&(f=q,c.forEach(re=>re.setAttribute("aria-pressed",String(Number(re.dataset.filmShape)===O))),u.forEach(re=>re.setAttribute("aria-pressed",String(Number(re.dataset.filmMetal)===Y))))});let h=null,d=(O,Y)=>{let[q,re]=lp[O.dataset.act],Te=O.getBoundingClientRect().top+scrollY-X0(),F=O.offsetHeight-Jr(".film-stage",O).offsetHeight,ge=Math.round(Te+(Y-q)/(re-q)*F);h=Es?{y:ge,t:Y}:null,window.scrollTo({top:ge,behavior:Es?"auto":"smooth"}),h&&p(Y)};c.forEach(O=>O.addEventListener("click",()=>d(O.closest(".film-act"),_A[Number(O.dataset.filmShape)]))),u.forEach(O=>O.addEventListener("click",()=>d(O.closest(".film-act"),yA[Number(O.dataset.filmMetal)])));let p=O=>{Hn||Es?(xr.killTweensOf(o),o.time(O)):xr.to(o,{time:O,duration:.5,ease:"power3.out",overwrite:!0})},v=(O,Y)=>{let[q,re]=lp[O.dataset.act]||lp.opening;if(h&&Math.abs(scrollY-h.y)<3)return h.t;if(h=null,Es){let Te=O0.filter(F=>F.hold>=q&&F.hold<=re).map(F=>F.hold);return Te[Math.min(Te.length-1,Math.floor(Y*Te.length))]??q}return q+Y*(re-q)},g=i.map(O=>ot.create({trigger:O,start:()=>"top top+="+X0(),end:"bottom bottom",invalidateOnRefresh:!0,onUpdate:Y=>{p(v(O,Y.progress));let q=Jr(".film-bar",O);q&&(q.style.transform=`scaleX(${Y.progress.toFixed(4)})`)}}));ot.config({ignoreMobileResize:!0});let m=()=>{t()&&ot.refresh()};document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",()=>setTimeout(m,0)),addEventListener("load",m);{let O=i.findIndex(Y=>Y.getBoundingClientRect().bottom>0&&Y.getBoundingClientRect().top<innerHeight);O<0&&(O=i.reduce((Y,q,re)=>q.getBoundingClientRect().bottom<=0?re:Y,-1)),xr.killTweensOf(o),o.time(O<0?0:v(i[O],g[O].progress))}let x=null,_=!1,y=document.createElement("canvas");y.className="film-canvas",y.setAttribute("aria-hidden","true");let S=O=>{s=O||s;let Y=x;if(x=null,_=!1,Y)try{Y.renderer.dispose(),Y.renderer.forceContextLoss()}catch{}y.remove(),ue=null,i.forEach(q=>q.classList.remove("is-live")),pi.classList.add("film-no3d")};y.addEventListener("webglcontextlost",O=>{O.preventDefault(),x&&!ws&&!Hn&&Ts("off"),S(x?"the graphics driver dropped the 3D":"")});let T=i.map(O=>Jr(".film-stage",O)),E="",A=0,M=O=>O!=="visible"&&O!=="clip",C=O=>{let Y=[],q=getComputedStyle(pi),re=!M(q.overflowX)&&!M(q.overflowY);for(let Te=O.parentElement;Te&&Te!==pi;Te=Te.parentElement){if(Te===document.body&&re)continue;let F=getComputedStyle(Te);(M(F.overflowX)||M(F.overflowY))&&Y.push(Te)}return Y},R=!!(window.CSS&&CSS.supports&&CSS.supports("overflow","clip")),w=O=>{let Y=getComputedStyle(O);return Y.transform!=="none"||Y.perspective!=="none"||Y.filter!=="none"||!!Y.backdropFilter&&Y.backdropFilter!=="none"||/paint|layout|strict|content/.test(Y.contain||"")||/transform|perspective|filter/.test(Y.willChange||"")},P=new Map,U=O=>{if(!P.has(O)){let Y=null;for(let q=O.parentElement;q&&q!==pi&&!Y;q=q.parentElement)Y=w(q)?q:null;P.set(O,Y)}return P.get(O)},N=O=>{E||(E=O,pi.classList.add("film-pinjs"),P.clear(),ot.refresh())},H=(O,Y,q,re,Te,F)=>{let ge=O.style,he=(Ee,fe)=>{ge.getPropertyValue(Ee)!==fe&&ge.setProperty(Ee,fe,"important")};he("position",Y),he("top",q),he("bottom",re),he("left",Te),he("width",F)},k=()=>parseFloat(pi.style.getPropertyValue("--film-top"))||0,te=()=>{if(!E)return;let O=k();i.forEach((Y,q)=>{let re=T[q],Te=Y.getBoundingClientRect(),F=re.offsetHeight;if(Te.top>O)H(re,"absolute","0px","auto","0px","100%");else if(Te.bottom<O+F)H(re,"absolute","auto","0px","0px","100%");else{let ge=U(re),he=ge?ge.getBoundingClientRect():{left:0,top:0};H(re,"fixed",O-he.top+"px","auto",Te.left-he.left+"px",Te.width+"px")}})},K=()=>{for(let O of T)for(let Y of C(O)){let q=getComputedStyle(Y),re=q.overflowY!=="hidden"&&Y.scrollHeight>Y.clientHeight+1||q.overflowX!=="hidden"&&Y.scrollWidth>Y.clientWidth+1;!R||re||(q.display==="block"&&Y.style.setProperty("display","flow-root"),Y.style.setProperty("overflow-x",q.overflowX==="hidden"?"clip":"visible","important"),Y.style.setProperty("overflow-y",q.overflowY==="hidden"?"clip":"visible","important"),A++)}T.some(O=>C(O).length)&&N("a page wrapper hides its overflow")},L=()=>{if(E||!G)return;let O=k(),Y=G.getBoundingClientRect(),q=Jr(".film-stage",G),re=q.offsetHeight;Y.top<O-40&&Y.bottom>O+re+40&&Math.abs(q.getBoundingClientRect().top-O)>3&&N("the page did not keep the film on screen")};Hn||(K(),addEventListener("load",K),Pr.has("pinjs")&&N("asked for in the address"));let oe=1,ce=()=>[y.clientWidth||innerWidth,y.clientHeight||innerHeight],Ie=()=>{let[O,Y]=ce(),q=Math.min(Math.max(devicePixelRatio||1,x.tier.supersample||1),x.tier.dpr)*oe,re=x.tier.name==="high"?42e5:26e5;return O*Y*q*q>re&&(q=Math.sqrt(re/(O*Y))),Math.max(.5,q)},pe=()=>{if(!x)return;let[O,Y]=ce();x.resize(O,Y,Ie())},be={e:1},Z=!1,le=()=>{Z=!0;let O=l&&Jr(".film-poster img",l),Y=O&&O.getAnimations?O.getAnimations().find(F=>F.playState==="running"):null;if(!Y)return;let q=/brightness\(([\d.]+)\)/.exec(getComputedStyle(O).filter),re=q?Math.min(1,Number(q[1])):1,Te=(Y.effect.getComputedTiming().endTime-Y.currentTime)/1e3;be.e=Math.pow(re,2.2),xr.to(be,{e:1,duration:Math.max(.3,Te),ease:"power2.out"})},G=null,ue=null,Q=!0,de=kl(),Se={x:0,y:0,sx:0,sy:0};!Hn&&!Es&&matchMedia("(pointer: fine)").matches&&addEventListener("pointermove",O=>{Se.x=O.clientX/innerWidth*2-1,Se.y=O.clientY/innerHeight*2-1},{passive:!0});let ae=()=>{let O=null,Y=0;for(let q of i){let re=q.getBoundingClientRect(),Te=Math.min(innerHeight,re.bottom)-Math.max(0,re.top);Te>Y&&(Y=Te,O=q)}if(O!==G&&(G=O,Q=!0,pi.classList.toggle("film-playing",!!G)),x&&G&&ue!==G){ue&&ue.classList.remove("is-live"),ue=G;let q=Jr(".film-stage",G);q.insertBefore(y,q.firstChild),pe(),Q=!0}},_e=DA(),ye=["medium",1],Ae=!1,W=!1,z=.6,We=0,ke=0,Le=[1,.8,.65,.5],xe=(O=!1)=>{if(Hn&&!Pr.has("tune")||!x||ye[1]>=1)return;let Y=Math.max(.02,x.stoneCoverage()),q=performance.now()-ke>400,re=ye[1]*Math.sqrt(z/Y)*(q?1.25:1),Te=Math.max(ye[1],Le.find(ge=>ge<=re+1e-6)||ye[1]);if(Te===oe)return;let F=performance.now();(O||Te<oe||F-We>500)&&(oe=Te,We=F,pe())},B=async O=>{if(!x)return;let Y=x.tier.name!==O[0];if(ye=O,oe=O[1],Y){let q=_;_=!1,x.setTier(kn[O[0]]),pe();try{await x.warm()}catch{}_=q&&!!x}else pe();Q=!0,_e.reset()},b=async()=>{let O=V0(ye);if(O>=nr.length-1){ws||(Ts("off"),S("too slow while playing, even on the lightest level"));return}await B(nr[O+1]),ws||Ts([ye[0],ye[1],z])};document.addEventListener("visibilitychange",()=>_e.reset(4));let V=null,$=O=>{if(!x||!_||!G)return;if(Pe&&!Hn){ws||Ts("off"),S("this graphics chip could not build the 3D (a shader failed)");return}V===null&&(V=O),O-=V,!Z&&G===l&&!Hn&&le();let Y=Object.assign(de,a);Y.exposure=a.exposure*be.e,Hn||(Se.sx+=(Se.x-Se.sx)*.05,Se.sy+=(Se.y-Se.sy)*.035,Y.az+=Se.sx*.06,Y.el+=Se.sy*.035);try{x.render(Y,Es?0:O)}catch(q){if(console.error("Wulf film:",q),W){W=!1;try{x.useAO(null),Q=!0;return}catch{}}ws||Ts("off"),S("error: "+(q&&q.message||q));return}G.classList.add("is-live"),xe()},ie=0;addEventListener("resize",()=>{clearTimeout(ie),ie=setTimeout(()=>{m(),pe(),Q=!0},120)});let ne=null,Me=()=>(!ne&&W0&&(window.__wulfFilmLib=PA,ne=new Promise(O=>{let Y=document.createElement("script");Y.src=W0,Y.async=!0,Y.onload=()=>O(window.WulfFilmAO||null),Y.onerror=()=>O(null),document.head.appendChild(Y)})),ne||Promise.resolve(null)),ve=O=>new Promise(Y=>setTimeout(Y,O)),Pe=!1,me=(async()=>{if(!r)return;Hn||await jD(600);let O=ws||Hn?null:CA();if(O==="off"){S("turned off earlier in this visit (too slow, or it failed)");return}let Y=TA(Pr.get("tier"));O&&(Y=kn[O[0]],oe=O[1],z=O[2]||z);try{x=xA(y,{tier:Y,preserve:Hn})}catch(q){S("the 3D could not start: "+(q&&q.message||q));return}x.renderer.debug.onShaderError=(q,re)=>{Pe=!0,console.error("Wulf film: this graphics chip could not build a shader.",q.getProgramInfoLog(re))},(Y.ao||Y.name==="medium")&&Me(),ye=[Y.name,oe],ae(),pe();try{await x.warm()}catch{}if(x&&ZD&&!O){let q=Object.assign(kl(),z0(),SA),re=0,F=await RA(ye,B,async()=>re=await x.bench(q),KD,async()=>{let[ge,he]=ce(),Ee=.35;x.resize(ge,he,Ie()*Ee);let fe=await x.bench(q,2);return z=Math.max(.05,x.stoneCoverage()),pe(),re=fe/(Ee*Ee)});if(!x)return;if(!F){Ts("off"),S("too slow on this computer (its heaviest frame would take about "+Math.round(re)+" ms)");return}F!==ye&&await B(F),Ts([ye[0],ye[1],z])}if(x&&x.tier.ao&&W0){let q=await(Hn?Me():Promise.race([Me(),ve(2500)]));if(q&&x&&x.tier.ao)try{x.useAO(q),W=!0}catch(re){console.error("Wulf film (contact shadows):",re)}}if(x)try{x.render(Object.assign(kl(),a,x.tier.dof?{dof:.5}:{}),0)}catch(q){S("error: "+(q&&q.message||q));return}if(xe(!0),x&&Pe&&!Hn){ws||Ts("off"),S("this graphics chip could not build the 3D (a shader failed)");return}x&&(_=!0,Q=!0,_e.reset())})();if(!Hn){let O=-1;xr.ticker.add(Y=>{if(te(),ae(),L(),!x||!_||!G){_e.reset(4);return}let q=o.time()!==O||be.e<1;O=o.time(),q&&(ke=performance.now()),!(Es&&!q&&!Q)&&(Q=!1,$(Y),q?!Es&&!Ae&&_e.tick(performance.now())==="down"&&(Ae=!0,b().finally(()=>{Ae=!1})):_e.reset(6))})}if(Pr.has("filmcheck")){let O=document.createElement("div");O.className="film-check",O.setAttribute("role","status"),O.style.cssText="position:fixed;left:12px;bottom:12px;z-index:99999;max-width:min(380px,calc(100vw - 24px));padding:12px 14px;border-radius:10px;background:rgba(5,7,11,.9);color:#fff;font:500 12.5px/1.55 system-ui,sans-serif;white-space:pre-line;pointer-events:none",document.body.appendChild(O);let Y=0,q=performance.now(),re=0;xr.ticker.add(()=>{Y++;let F=performance.now();F-q>=1e3&&(re=Math.round(Y*1e3/(F-q)),Y=0,q=F)});let Te=()=>{let F=x&&_;O.textContent=["Film check (kit "+(window.wkFilm&&window.wkFilm.v||"unknown")+")","Graphics: "+(k0()||"not reported by this browser"),"Stays on screen: "+(E?"pinned by the film, because "+E:A?"yes ("+A+" page wrapper"+(A>1?"s":"")+" adjusted)":"yes"),"3D: "+(F?"on, "+ye[0]+" quality at "+Math.round(ye[1]*100)+"% resolution"+(oe>ye[1]?" ("+Math.round(oe*100)+"% here, the stone is small)":""):s?"off, "+s:"starting"),F?"Frames a second: "+re:"",Es?"Reduce motion is on in this computer's settings, so the film shows calm still frames.":""].filter(Boolean).join(`
`)};Te(),setInterval(Te,500)}window.__film={started:me,live:()=>!!(x&&_),tier:()=>x&&x.tier.name,rung:()=>ye,gpu:()=>k0(),scale:()=>oe,covHeavy(O){return O&&(z=O),z},coverage:()=>x?x.stoneCoverage():0,stone({bounces:O,tail:Y}){let q=[x.diamond.material,x.ring.pave&&x.ring.pave.material].filter(Boolean);for(let re of q)O!==void 0&&(re.uniforms.bounces.value=O),Y!==void 0&&re.uniforms.tail&&(re.uniforms.tail.value=Y)},async useRung(O){await B(O)},programs:()=>x?x.renderer.info.programs.length:0,setTier(O){x&&kn[O]&&(x.setTier(kn[O]),pe())},height:()=>pi.scrollHeight-innerHeight,top:O=>Jr(O).getBoundingClientRect().top+scrollY,frame(O,Y=0){return window.scrollTo(0,O),ot.update(),ae(),$(Y),{act:G&&G.dataset.act,t:o.time(),tier:x&&x.tier.name}},at(O,Y=0){return xr.killTweensOf(o),o.time(O),ae(),V=0,$(Y),{act:G&&G.dataset.act,t:o.time()}},ao:()=>!!window.WulfFilmAO}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",IA):IA();})();
