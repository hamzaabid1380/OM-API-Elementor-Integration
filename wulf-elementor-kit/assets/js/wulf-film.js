/*! Wulf Elementor Kit: cinematic film (3D). Built from cinematic-home/src/wp.js; do not edit by hand.
 * Includes three.js 0.183.2 (MIT), postprocessing 6.39.5 (Zlib), three-mesh-bvh 0.9.16 (MIT),
 * and GSAP 3.15.0 with ScrollTrigger and SplitText (GSAP standard no-charge license, gsap.com/standard-license). */
(()=>{var iS=Object.defineProperty;var rS=(i,e)=>{for(var t in e)iS(i,t,{get:e[t],enumerable:!0})};function Yr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function L0(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}var Pi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},kl={duration:.5,overwrite:!1,delay:0},dp,zn,en,nr=1e8,Yt=1/nr,ip=Math.PI*2,sS=ip/4,aS=0,F0=Math.sqrt,oS=Math.cos,lS=Math.sin,bn=function(e){return typeof e=="string"},cn=function(e){return typeof e=="function"},Qr=function(e){return typeof e=="number"},Uu=function(e){return typeof e>"u"},Pr=function(e){return typeof e=="object"},Di=function(e){return e!==!1},pp=function(){return typeof window<"u"},Eu=function(e){return cn(e)||bn(e)},N0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},jn=Array.isArray,cS=/random\([^)]+\)/g,uS=/,\s*/g,b0=/(?:-?\.?\d|\.)+/gi,mp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ga=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Kd=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,gp=/[+-]=-?[.\d]+/,hS=/[^,'"\[\]\s]+/gi,fS=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,sn,Rr,rp,vp,zi={},Ru={},O0,k0=function(e){return(Ru=ao(e,zi))&&$n},Lu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},zl=function(e,t){return!t&&console.warn(e)},z0=function(e,t){return e&&(zi[e]=t)&&Ru&&(Ru[e]=t)||zi},Hl=function(){return 0},dS={suppressEvents:!0,isStart:!0,kill:!1},wu={suppressEvents:!0,kill:!1},pS={suppressEvents:!0},xp={},Ss=[],sp={},H0,Ci={},Jd={},C0=30,bu=[],_p="",yp=function(e){var t=e[0],n,r;if(Pr(t)||cn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=bu.length;r--&&!bu[r].targetTest(t););n=bu[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Tp(e[r],n)))||e.splice(r,1);return e},Ms=function(e){return e._gsap||yp(ir(e))[0]._gsap},Ap=function(e,t,n){return(n=e[t])&&cn(n)?e[t]():Uu(n)&&e.getAttribute&&e.getAttribute(t)||n},fi=function(e,t){return(e=e.split(",")).forEach(t)||e},un=function(e){return Math.round(e*1e5)/1e5||0},rn=function(e){return Math.round(e*1e7)/1e7||0},va=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},mS=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Du=function(){var e=Ss.length,t=Ss.slice(0),n,r;for(sp={},Ss.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Sp=function(e){return!!(e._initted||e._startAt||e.add)},G0=function(e,t,n,r){Ss.length&&!zn&&Du(),e.render(t,n,r||!!(zn&&t<0&&Sp(e))),Ss.length&&!zn&&Du()},V0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(hS).length<2?t:bn(e)?e.trim():e},W0=function(e){return e},Hi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},gS=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},ao=function(e,t){for(var n in t)e[n]=t[n];return e},R0=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Pr(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Pu=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Fl=function(e){var t=e.parent||sn,n=e.keyframes?gS(jn(e.keyframes)):Hi;if(Di(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},vS=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},X0=function(e,t,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var a=e[r],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Fu=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Ts=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},da=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},xS=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ap=function(e,t,n,r){return e._startAt&&(zn?e._startAt.revert(wu):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},_S=function i(e){return!e||e._ts&&i(e.parent)},D0=function(e){return e._repeat?oo(e._tTime,e=e.duration()+e._rDelay)*e:0},oo=function(e,t){var n=Math.floor(e=rn(e/t));return e&&n===e?n-1:n},Iu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Nu=function(e){return e._end=rn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Yt)||0))},Ou=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=rn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Nu(e),n._dirty||da(n,e)),e},Y0=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Iu(e.rawTime(),t),(!t._dur||Wl(0,t.totalDuration(),n)-t._tTime>Yt)&&t.render(n,!0)),da(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Yt}},Dr=function(e,t,n,r){return t.parent&&Ts(t),t._start=rn((Qr(n)?n:n||e!==sn?tr(e,n,t):e._time)+t._delay),t._end=rn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),X0(e,t,"_first","_last",e._sort?"_start":0),op(t)||(e._recent=t),r||Y0(e,t),e._ts<0&&Ou(e,e._tTime),e},q0=function(e,t){return(zi.ScrollTrigger||Lu("scrollTrigger",t))&&zi.ScrollTrigger.create(t,e)},Q0=function(e,t,n,r,s){if(bp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!zn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&H0!==Ri.frame)return Ss.push(e),e._lazy=[s,r],1},yS=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},op=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},AS=function(e,t,n,r){var s=e.ratio,a=t<0||!t&&(!e._start&&yS(e)&&!(!e._initted&&op(e))||(e._ts<0||e._dp._ts<0)&&!op(e))?0:1,o=e._rDelay,l=0,c,u,f;if(o&&e._repeat&&(l=Wl(0,e._tDur,t),u=oo(l,o),e._yoyo&&u&1&&(a=1-a),u!==oo(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||zn||r||e._zTime===Yt||!t&&e._zTime){if(!e._initted&&Q0(e,t,r,n,l))return;for(f=e._zTime,e._zTime=t||(n?Yt:0),n||(n=t&&!f),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&ap(e,t,n,!0),e._onUpdate&&!n&&ki(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ki(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Ts(e,1),!n&&!zn&&(ki(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},SS=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},lo=function(e,t,n,r){var s=e._repeat,a=rn(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:rn(a*(s+1)+e._rDelay*s):a,o>0&&!r&&Ou(e,e._tTime=e._tDur*o),e.parent&&Nu(e),n||da(e.parent,e),e},P0=function(e){return e instanceof Jn?da(e):lo(e,e._dur)},MS={_start:0,endTime:Hl,totalDuration:Hl},tr=function i(e,t,n){var r=e.labels,s=e._recent||MS,a=e.duration()>=nr?s.endTime(!1):e._dur,o,l,c;return bn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in r||(r[t]=a),r[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(jn(n)?n[0]:n).totalDuration()),o>1?i(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Nl=function(e,t,n){var r=Qr(t[1]),s=(r?2:1)+(e<2?0:1),a=t[s],o,l;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Di(l.vars.inherit)&&l.parent;a.immediateRender=Di(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new mn(t[0],a,t[s+1])},Es=function(e,t){return e||e===0?t(e):t},Wl=function(e,t,n){return n<e?e:n>t?t:n},Hn=function(e,t){return!bn(e)||!(t=fS.exec(e))?"":t[1]},TS=function(e,t,n){return Es(n,function(r){return Wl(e,t,r)})},lp=[].slice,Z0=function(e,t){return e&&Pr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Pr(e[0]))&&!e.nodeType&&e!==Rr},ES=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return bn(r)&&!t||Z0(r,1)?(s=n).push.apply(s,ir(r)):n.push(r)})||n},ir=function(e,t,n){return en&&!t&&en.selector?en.selector(e):bn(e)&&!n&&(rp||!co())?lp.call((t||vp).querySelectorAll(e),0):jn(e)?ES(e,n):Z0(e)?lp.call(e,0):e?[e]:[]},cp=function(e){return e=ir(e)[0]||zl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return ir(t,n.querySelectorAll?n:n===e?zl("Invalid scope")||vp.createElement("div"):e)}},K0=function(e){return e.sort(function(){return .5-Math.random()})},J0=function(e){if(cn(e))return e;var t=Pr(e)?e:{each:e},n=pa(t.ease),r=t.from||0,s=parseFloat(t.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=t.axis,u=r,f=r;return bn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],f=r[1]),function(h,d,p){var v=(p||t).length,g=a[v],m,x,y,A,S,E,T,_,M;if(!g){if(M=t.grid==="auto"?0:(t.grid||[1,nr])[1],!M){for(T=-nr;T<(T=p[M++].getBoundingClientRect().left)&&M<v;);M<v&&M--}for(g=a[v]=[],m=l?Math.min(M,v)*u-.5:r%M,x=M===nr?0:l?v*f/M-.5:r/M|0,T=0,_=nr,E=0;E<v;E++)y=E%M-m,A=x-(E/M|0),g[E]=S=c?Math.abs(c==="y"?A:y):F0(y*y+A*A),S>T&&(T=S),S<_&&(_=S);r==="random"&&K0(g),g.max=T-_,g.min=_,g.v=v=(parseFloat(t.amount)||parseFloat(t.each)*(M>v?v-1:c?c==="y"?v/M:M:Math.max(M,v/M))||0)*(r==="edges"?-1:1),g.b=v<0?s-v:s,g.u=Hn(t.amount||t.each)||0,n=n&&v<0?OS(n):n}return v=(g[h]-g.min)/g.max||0,rn(g.b+(n?n(v):v)*g.v)+g.u}},up=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=rn(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Qr(n)?0:Hn(n))}},j0=function(e,t){var n=jn(e),r,s;return!n&&Pr(e)&&(r=n=e.radius||nr,e.values?(e=ir(e.values),(s=!Qr(e[0]))&&(r*=r)):e=up(e.increment)),Es(t,n?cn(e)?function(a){return s=e(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=nr,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-o,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-o),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:a,s||u===a||Qr(a)?u:u+Hn(a)}:up(e))},$0=function(e,t,n,r){return Es(jn(e)?!t:n===!0?!!(n=0):!r,function(){return jn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},wS=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,a){return a(s)},r)}},bS=function(e,t){return function(n){return e(parseFloat(n))+(t||Hn(n))}},CS=function(e,t,n){return tv(e,t,0,1,n)},ev=function(e,t,n){return Es(n,function(r){return e[~~t(r)]})},RS=function i(e,t,n){var r=t-e;return jn(e)?ev(e,i(0,e.length),t):Es(n,function(s){return(r+(s-e)%r)%r+e})},DS=function i(e,t,n){var r=t-e,s=r*2;return jn(e)?ev(e,i(0,e.length-1),t):Es(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>r?s-a:a)})},uo=function(e){return e.replace(cS,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(uS);return $0(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},tv=function(e,t,n,r,s){var a=t-e,o=r-n;return Es(s,function(l){return n+((l-e)/a*o||0)})},PS=function i(e,t,n,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=bn(e),o={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),a)e={p:e},t={p:t};else if(jn(e)&&!jn(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(p){p*=f;var v=Math.min(h,~~p);return u[v](p-v)},n=t}else r||(e=ao(jn(e)?[]:{},e));if(!u){for(l in t)Ep.call(o,e,l,"get",t[l]);s=function(p){return Dp(p,o)||(a?e.p:e)}}}return Es(n,s)},I0=function(e,t,n){var r=e.labels,s=nr,a,o,l;for(a in r)o=r[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},ki=function(e,t,n){var r=e.vars,s=r[t],a=en,o=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&Ss.length&&Du(),o&&(en=o),u=l?s.apply(c,l):s.call(c),en=a,u},Ul=function(e){return Ts(e),e.scrollTrigger&&e.scrollTrigger.kill(!!zn),e.progress()<1&&ki(e,"onInterrupt"),e},so,nv=[],iv=function(e){if(e)if(e=!e.name&&e.default||e,pp()||e.headless){var t=e.name,n=cn(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Hl,render:Dp,add:Ep,kill:QS,modifier:qS,rawVars:0},a={targetTest:0,get:0,getSetter:ku,aliases:{},register:0};if(co(),e!==r){if(Ci[t])return;Hi(r,Hi(Pu(e,s),a)),ao(r.prototype,ao(s,Pu(e,a))),Ci[r.prop=t]=r,e.targetTest&&(bu.push(r),xp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}z0(t,r),e.register&&e.register($n,r,di)}else nv.push(e)},Xt=255,Ll={aqua:[0,Xt,Xt],lime:[0,Xt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Xt],navy:[0,0,128],white:[Xt,Xt,Xt],olive:[128,128,0],yellow:[Xt,Xt,0],orange:[Xt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Xt,0,0],pink:[Xt,192,203],cyan:[0,Xt,Xt],transparent:[Xt,Xt,Xt,0]},jd=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Xt+.5|0},rv=function(e,t,n){var r=e?Qr(e)?[e>>16,e>>8&Xt,e&Xt]:0:Ll.black,s,a,o,l,c,u,f,h,d,p;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ll[e])r=Ll[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Xt,r&Xt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Xt,e&Xt]}else if(e.substr(0,3)==="hsl"){if(r=p=e.match(b0),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=jd(l+1/3,s,a),r[1]=jd(l,s,a),r[2]=jd(l-1/3,s,a);else if(~e.indexOf("="))return r=e.match(mp),n&&r.length<4&&(r[3]=1),r}else r=e.match(b0)||Ll.transparent;r=r.map(Number)}return t&&!p&&(s=r[0]/Xt,a=r[1]/Xt,o=r[2]/Xt,f=Math.max(s,a,o),h=Math.min(s,a,o),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(a-o)/d+(a<o?6:0):f===a?(o-s)/d+2:(s-a)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},sv=function(e){var t=[],n=[],r=-1;return e.split(qr).forEach(function(s){var a=s.match(ga)||[];t.push.apply(t,a),n.push(r+=a.length+1)}),t.c=n,t},B0=function(e,t,n){var r="",s=(e+r).match(qr),a=t?"hsla(":"rgba(",o=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=rv(h,t,1))&&a+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=sv(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(qr,"1").split(ga),f=c.length-1;o<f;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(qr),f=c.length-1;o<f;o++)r+=c[o]+s[o];return r+c[f]},qr=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ll)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),IS=/hsl[a]?\(/,Mp=function(e){var t=e.join(" "),n;if(qr.lastIndex=0,qr.test(t))return n=IS.test(t),e[1]=B0(e[1],n),e[0]=B0(e[0],n,sv(e[1])),!0},Gl,Ri=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,f,h,d,p=function v(g){var m=i()-r,x=g===!0,y,A,S,E;if((m>e||m<0)&&(n+=m-t),r+=m,S=r-n,y=S-a,(y>0||x)&&(E=++f.frame,h=S-f.time*1e3,f.time=S=S/1e3,a+=y+(y>=s?4:s-y),A=1),x||(l=c(v)),A)for(d=0;d<o.length;d++)o[d](S,h,E,g)};return f={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(g){return h/(1e3/(g||60))},wake:function(){O0&&(!rp&&pp()&&(Rr=rp=window,vp=Rr.document||{},zi.gsap=$n,(Rr.gsapVersions||(Rr.gsapVersions=[])).push($n.version),k0(Ru||Rr.GreenSockGlobals||!Rr.gsap&&Rr||{}),nv.forEach(iv)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(g){return setTimeout(g,a-f.time*1e3+1|0)},Gl=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Gl=0,c=Hl},lagSmoothing:function(g,m){e=g||1/0,t=Math.min(m||33,e)},fps:function(g){s=1e3/(g||240),a=f.time*1e3+s},add:function(g,m,x){var y=m?function(A,S,E,T){g(A,S,E,T),f.remove(y)}:g;return f.remove(g),o[x?"unshift":"push"](y),co(),y},remove:function(g,m){~(m=o.indexOf(g))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},f}(),co=function(){return!Gl&&Ri.wake()},yt={},BS=/^[\d.\-M][\d.\-,\s]/,US=/["']/g,LS=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[r]=isNaN(c)?c.replace(US,"").trim():+c,r=l.substr(o+1).trim();return t},FS=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},NS=function(e){var t=(e+"").split("("),n=yt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[LS(t[1])]:FS(e).split(",").map(V0)):yt._CE&&BS.test(e)?yt._CE("",e):n},OS=function(e){return function(t){return 1-e(1-t)}},pa=function(e,t){return e&&(cn(e)?e:yt[e]||NS(e))||t},xa=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},a;return fi(e,function(o){yt[o]=zi[o]=s,yt[a=o.toLowerCase()]=n;for(var l in s)yt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=yt[o+"."+l]=s[l]}),s},av=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},$d=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/ip*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*lS((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:av(o);return s=ip/s,l.config=function(c,u){return i(e,c,u)},l},ep=function i(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:av(n);return r.config=function(s){return i(e,s)},r};fi("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;xa(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});yt.Linear.easeNone=yt.none=yt.Linear.easeIn;xa("Elastic",$d("in"),$d("out"),$d());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(o){return o<t?i*o*o:o<n?i*Math.pow(o-1.5/e,2)+.75:o<r?i*(o-=2.25/e)*o+.9375:i*Math.pow(o-2.625/e,2)+.984375};xa("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);xa("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});xa("Circ",function(i){return-(F0(1-i*i)-1)});xa("Sine",function(i){return i===1?1:-oS(i*sS)+1});xa("Back",ep("in"),ep("out"),ep());yt.SteppedEase=yt.steps=zi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,a=1-Yt;return function(o){return((r*Wl(0,a,o)|0)+s)*n}}};kl.ease=yt["quad.out"];fi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return _p+=i+","+i+"Params,"});var Tp=function(e,t){this.id=aS++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ap,this.set=t?t.getSetter:ku},Vl=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,lo(this,+t.duration,1,1),this.data=t.data,en&&(this._ctx=en,en.data.push(this)),Gl||Ri.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,lo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(co(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Ou(this,n),!s._dp||s.parent||Y0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Dr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Yt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),G0(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+D0(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+D0(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?oo(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Yt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Iu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Yt?0:this._rts,this.totalTime(Wl(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Nu(this),xS(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(co(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Yt&&(this._tTime-=Yt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=rn(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Dr(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Di(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Iu(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=pS);var r=zn;return zn=n,Sp(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),zn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,P0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,P0(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(tr(this,n),Di(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,Di(r)),this._dur||(this._zTime=-Yt),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Yt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Yt,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Yt)},e.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(a){var o=cn(n)?n:W0,l=function(){var u=r.then;r.then=null,s&&s(),cn(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=u),a(o),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Ul(this)},i}();Hi(Vl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Yt,_prom:0,_ps:!1,_rts:1});var Jn=function(i){L0(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Di(n.sortChildren),sn&&Dr(n.parent||sn,Yr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&q0(Yr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,a){return Nl(0,arguments,this),this},t.from=function(r,s,a){return Nl(1,arguments,this),this},t.fromTo=function(r,s,a,o){return Nl(2,arguments,this),this},t.set=function(r,s,a){return s.duration=0,s.parent=this,Fl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new mn(r,s,tr(this,a),1),this},t.call=function(r,s,a){return Dr(this,mn.delayedCall(0,r,s),a)},t.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new mn(r,a,tr(this,l)),this},t.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,Fl(a).immediateRender=Di(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},t.staggerFromTo=function(r,s,a,o,l,c,u,f){return o.startAt=a,Fl(o).immediateRender=Di(o.immediateRender),this.staggerTo(r,s,o,l,c,u,f)},t.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:rn(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,p,v,g,m,x,y,A,S,E,T;if(this!==sn&&u>l&&r>=0&&(u=l),u!==this._tTime||a||f){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),h=u,A=this._start,y=this._ts,m=!y,f&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(E=this._yoyo,g=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(g*100+r,s,a);if(h=rn(u%g),u===l?(v=this._repeat,h=c):(S=rn(u/g),v=~~S,v&&v===S&&(h=c,v--),h>c&&(h=c)),S=oo(this._tTime,g),!o&&this._tTime&&S!==v&&this._tTime-S*g-this._dur<=0&&(S=v),E&&v&1&&(h=c-h,T=1),v!==S&&!this._lock){var _=E&&S&1,M=_===(E&&v&1);if(v<S&&(_=!_),o=_?0:u%c?c:u,this._lock=1,this.render(o||(T?0:rn(v*g)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&ki(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,S=v),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,o=_?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=SS(this,rn(o),rn(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&u&&c&&!s&&!S&&(ki(this,"onStart"),this._tTime!==u))return this;if(h>=o&&r>=0)for(d=this._first;d;){if(p=d._next,(d._act||h>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,a),h!==this._time||!this._ts&&!m){x=0,p&&(u+=this._zTime=-Yt);break}}d=p}else{d=this._last;for(var C=r<0?r:h;d;){if(p=d._prev,(d._act||C<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,s,a||zn&&Sp(d)),h!==this._time||!this._ts&&!m){x=0,p&&(u+=this._zTime=C?-Yt:Yt);break}}d=p}}if(x&&!s&&(this.pause(),x.render(h>=o?0:-Yt)._zTime=h>=o?1:-1,this._ts))return this._start=A,Nu(this),this.render(r,s,a);this._onUpdate&&!s&&ki(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(A===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ts(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(ki(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var a=this;if(Qr(s)||(s=tr(this,s,r)),!(r instanceof Vl)){if(jn(r))return r.forEach(function(o){return a.add(o,s)}),this;if(bn(r))return this.addLabel(r,s);if(cn(r))r=mn.delayedCall(0,r);else return this}return this!==r?Dr(this,r,s):this},t.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-nr);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof mn?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},t.remove=function(r){return bn(r)?this.removeLabel(r):cn(r)?this.killTweensOf(r):(r.parent===this&&Fu(this,r),r===this._recent&&(this._recent=this._last),da(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=rn(Ri.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=tr(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,a){var o=mn.delayedCall(0,s||Hl,a);return o.data="isPause",this._hasPause=1,Dr(this,o,tr(this,r))},t.removePause=function(r){var s=this._first;for(r=tr(this,r);s;)s._start===r&&s.data==="isPause"&&Ts(s),s=s._next},t.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)As!==o[l]&&o[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var a=[],o=ir(r),l=this._first,c=Qr(s),u;l;)l instanceof mn?mS(l._targets,o)&&(c?(!As||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(r,s){s=s||{};var a=this,o=tr(a,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,p=mn.to(a,Hi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Yt,onStart:function(){if(a.pause(),!d){var g=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());p._dur!==g&&lo(p,g,0,1).render(p._time,!0,!0),d=1}u&&u.apply(p,f||[])}},s));return h?p.render(0):p},t.tweenFromTo=function(r,s,a){return this.tweenTo(s,Hi({startAt:{time:tr(this,r)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),I0(this,tr(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),I0(this,tr(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Yt)},t.shiftChildren=function(r,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(r=rn(r);o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return da(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),da(this)},t.totalDuration=function(r){var s=0,a=this,o=a._last,l=nr,c,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Dr(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=rn(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;lo(a,a===sn&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(r){if(sn._ts&&(G0(sn,Iu(r,sn)),H0=Ri.frame),Ri.frame>=C0){C0+=Pi.autoSleep||120;var s=sn._first;if((!s||!s._ts)&&Pi.autoSleep&&Ri._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Ri.sleep()}}},e}(Vl);Hi(Jn.prototype,{_lock:0,_hasPause:0,_forcing:0});var kS=function(e,t,n,r,s,a,o){var l=new di(this._pt,e,t,0,1,Rp,null,s),c=0,u=0,f,h,d,p,v,g,m,x;for(l.b=n,l.e=r,n+="",r+="",(m=~r.indexOf("random("))&&(r=uo(r)),a&&(x=[n,r],a(x,e,t),n=x[0],r=x[1]),h=n.match(Kd)||[];f=Kd.exec(r);)p=f[0],v=r.substring(c,f.index),d?d=(d+1)%5:v.substr(-5)==="rgba("&&(d=1),p!==h[u++]&&(g=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:v||u===1?v:",",s:g,c:p.charAt(1)==="="?va(g,p)-g:parseFloat(p)-g,m:d&&d<4?Math.round:0},c=Kd.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(gp.test(r)||m)&&(l.e=0),this._pt=l,l},Ep=function(e,t,n,r,s,a,o,l,c,u){cn(r)&&(r=r(s||0,e,a));var f=e[t],h=n!=="get"?n:cn(f)?c?e[t.indexOf("set")||!cn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=cn(f)?c?WS:cv:Cp,p;if(bn(r)&&(~r.indexOf("random(")&&(r=uo(r)),r.charAt(1)==="="&&(p=va(h,r)+(Hn(h)||0),(p||p===0)&&(r=p))),!u||h!==r||hp)return!isNaN(h*r)&&r!==""?(p=new di(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?YS:uv,0,d),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!f&&!(t in e)&&Lu(t,r),kS.call(this,e,t,h,r,d,l||Pi.stringFilter,c))},zS=function(e,t,n,r,s){if(cn(e)&&(e=Ol(e,s,t,n,r)),!Pr(e)||e.style&&e.nodeType||jn(e)||N0(e))return bn(e)?Ol(e,s,t,n,r):e;var a={},o;for(o in e)a[o]=Ol(e[o],s,t,n,r);return a},wp=function(e,t,n,r,s,a){var o,l,c,u;if(Ci[e]&&(o=new Ci[e]).init(s,o.rawVars?t[e]:zS(t[e],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new di(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==so))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},As,hp,bp=function i(e,t,n){var r=e.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,p=e._dur,v=e._startAt,g=e._targets,m=e.parent,x=m&&m.data==="nested"?m.vars.targets:g,y=e._overwrite==="auto"&&!dp,A=e.timeline,S=r.easeReverse||f,E,T,_,M,C,R,w,P,F,N,O,H,j;if(A&&(!h||!s)&&(s="none"),e._ease=pa(s,kl.ease),e._rEase=S&&(pa(S)||e._ease),e._from=!A&&!!r.runBackwards,e._from&&(e.ratio=1),!A||h&&!r.stagger){if(P=g[0]?Ms(g[0]).harness:0,H=P&&r[P.prop],E=Pu(r,xp),v&&(v._zTime<0&&v.progress(1),t<0&&u&&o&&!d?v.render(-1,!0):v.revert(u&&p?wu:dS),v._lazy=0),a){if(Ts(e._startAt=mn.set(g,Hi({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!v&&Di(l),startAt:null,delay:0,onUpdate:c&&function(){return ki(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(zn||!o&&!d)&&e._startAt.revert(wu),o&&p&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&p&&!v){if(t&&(o=!1),_=Hi({overwrite:!1,data:"isFromStart",lazy:o&&!v&&Di(l),immediateRender:o,stagger:0,parent:m},E),H&&(_[P.prop]=H),Ts(e._startAt=mn.set(g,_)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(zn?e._startAt.revert(wu):e._startAt.render(-1,!0)),e._zTime=t,!o)i(e._startAt,Yt,Yt);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&Di(l)||l&&!p,T=0;T<g.length;T++){if(C=g[T],w=C._gsap||yp(g)[T]._gsap,e._ptLookup[T]=N={},sp[w.id]&&Ss.length&&Du(),O=x===g?T:x.indexOf(C),P&&(F=new P).init(C,H||E,e,O,x)!==!1&&(e._pt=M=new di(e._pt,C,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(G){N[G]=M}),F.priority&&(R=1)),!P||H)for(_ in E)Ci[_]&&(F=wp(_,E,e,O,C,x))?F.priority&&(R=1):N[_]=M=Ep.call(e,C,_,"get",E[_],O,x,0,r.stringFilter);e._op&&e._op[T]&&e.kill(C,e._op[T]),y&&e._pt&&(As=e,sn.killTweensOf(C,N,e.globalTime(t)),j=!e.parent,As=0),e._pt&&l&&(sp[w.id]=1)}R&&Pp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!j,h&&t<=0&&A.render(nr,!0,!0)},HS=function(e,t,n,r,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return hp=1,e.vars[t]="+=0",bp(e,o),hp=0,l?zl(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,f.e&&(f.e=un(n)+Hn(f.e)),f.b&&(f.b=u.s+Hn(f.b))},GS=function(e,t){var n=e[0]?Ms(e[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return t;s=ao({},t);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},VS=function(e,t,n,r){var s=t.ease||r||"power1.inOut",a,o;if(jn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},Ol=function(e,t,n,r,s){return cn(e)?e.call(t,n,r,s):bn(e)&&~e.indexOf("random(")?uo(e):e},ov=_p+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",lv={};fi(ov+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return lv[i]=1});var mn=function(i){L0(e,i);function e(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:Fl(r))||this;var l=o.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,p=l.keyframes,v=l.defaults,g=l.scrollTrigger,m=r.parent||sn,x=(jn(n)||N0(n)?Qr(n[0]):"length"in r)?[n]:ir(n),y,A,S,E,T,_,M,C;if(o._targets=x.length?yp(x):zl("GSAP target "+n+" not found. https://gsap.com",!Pi.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,p||h||Eu(c)||Eu(u)){r=o.vars;var R=r.easeReverse||r.yoyoEase;if(y=o.timeline=new Jn({data:"nested",defaults:v||{},targets:m&&m.data==="nested"?m.vars.targets:x}),y.kill(),y.parent=y._dp=Yr(o),y._start=0,h||Eu(c)||Eu(u)){if(E=x.length,M=h&&J0(h),Pr(h))for(T in h)~ov.indexOf(T)&&(C||(C={}),C[T]=h[T]);for(A=0;A<E;A++)S=Pu(r,lv),S.stagger=0,R&&(S.easeReverse=R),C&&ao(S,C),_=x[A],S.duration=+Ol(c,Yr(o),A,_,x),S.delay=(+Ol(u,Yr(o),A,_,x)||0)-o._delay,!h&&E===1&&S.delay&&(o._delay=u=S.delay,o._start+=u,S.delay=0),y.to(_,S,M?M(A,_,x):0),y._ease=yt.none;y.duration()?c=u=0:o.timeline=0}else if(p){Fl(Hi(y.vars.defaults,{ease:"none"})),y._ease=pa(p.ease||r.ease||"none");var w=0,P,F,N;if(jn(p))p.forEach(function(O){return y.to(x,O,">")}),y.duration();else{S={};for(T in p)T==="ease"||T==="easeEach"||VS(T,p[T],S,p.easeEach);for(T in S)for(P=S[T].sort(function(O,H){return O.t-H.t}),w=0,A=0;A<P.length;A++)F=P[A],N={ease:F.e,duration:(F.t-(A?P[A-1].t:0))/100*c},N[T]=F.v,y.to(x,N,w),w+=N.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||o.duration(c=y.duration())}else o.timeline=0;return d===!0&&!dp&&(As=Yr(o),sn.killTweensOf(x),As=0),Dr(m,Yr(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(f||!c&&!p&&o._start===rn(m._time)&&Di(f)&&_S(Yr(o))&&m.data!=="nested")&&(o._tTime=-Yt,o.render(Math.max(0,-u)||0)),g&&q0(Yr(o),g),o}var t=e.prototype;return t.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Yt&&!u?l:r<Yt?0:r,h,d,p,v,g,m,x,y;if(!c)AS(this,r,s,a);else if(f!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,y=this.timeline,this._repeat){if(v=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(v*100+r,s,a);if(h=rn(f%v),f===l?(p=this._repeat,h=c):(g=rn(f/v),p=~~g,p&&p===g?(h=c,p--):h>c&&(h=c)),m=this._yoyo&&p&1,m&&(h=c-h),g=oo(this._tTime,v),h===o&&!a&&this._initted&&p===g)return this._tTime=f,this;p!==g&&this.vars.repeatRefresh&&!m&&!this._lock&&h!==v&&this._initted&&(this._lock=a=1,this.render(rn(v*p),!0).invalidate()._lock=0)}if(!this._initted){if(Q0(this,u?r:h,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&p!==g))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._rEase){var A=h<o;if(A!==this._inv){var S=A?o:c-o;this._inv=A,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=S?(A?-1:1)/S:0,this._invScale=A?-this.ratio:1-this.ratio,this._invEase=A?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(h/c);if(this._from&&(this.ratio=x=1-x),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!s&&!g&&(ki(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;y&&y.render(r<0?r:y._dur*y._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&ap(this,r,s,a),ki(this,"onUpdate")),this._repeat&&p!==g&&this.vars.onRepeat&&!s&&this.parent&&ki(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&ap(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Ts(this,1),!s&&!(u&&!o)&&(f||o||m)&&(ki(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,a,o,l){Gl||Ri.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||bp(this,c),u=this._ease(c/this._dur),HS(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(Ou(this,0),this.parent||X0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ul(this):this.scrollTrigger&&this.scrollTrigger.kill(!!zn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,As&&As.vars.overwrite!==!0)._first||Ul(this),this.parent&&a!==this.timeline.totalDuration()&&lo(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?ir(r):o,c=this._ptLookup,u=this._pt,f,h,d,p,v,g,m;if((!s||s==="all")&&vS(o,l))return s==="all"&&(this._pt=0),Ul(this);for(f=this._op=this._op||[],s!=="all"&&(bn(s)&&(v={},fi(s,function(x){return v[x]=1}),s=v),s=GS(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){h=c[m],s==="all"?(f[m]=s,p=h,d={}):(d=f[m]=f[m]||{},p=s);for(v in p)g=h&&h[v],g&&((!("kill"in g.d)||g.d.kill(v)===!0)&&Fu(this,g,"_pt"),delete h[v]),d!=="all"&&(d[v]=1)}return this._initted&&!this._pt&&u&&Ul(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Nl(1,arguments)},e.delayedCall=function(r,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(r,s,a){return Nl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,a){return sn.killTweensOf(r,s,a)},e}(Vl);Hi(mn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});fi("staggerTo,staggerFrom,staggerFromTo",function(i){mn[i]=function(){var e=new Jn,t=lp.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Cp=function(e,t,n){return e[t]=n},cv=function(e,t,n){return e[t](n)},WS=function(e,t,n,r){return e[t](r.fp,n)},XS=function(e,t,n){return e.setAttribute(t,n)},ku=function(e,t){return cn(e[t])?cv:Uu(e[t])&&e.setAttribute?XS:Cp},uv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},YS=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Rp=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Dp=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},qS=function(e,t,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(e,t,n),s=a},QS=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Fu(this,t,"_pt"):t.dep||(n=1),t=r;return!n},ZS=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Pp=function(e){for(var t=e._pt,n,r,s,a;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=s},di=function(){function i(t,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||uv,this.d=l||this,this.set=c||Cp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=ZS,this.m=n,this.mt=s,this.tween=r},i}();fi(_p+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return xp[i]=1});zi.TweenMax=zi.TweenLite=mn;zi.TimelineLite=zi.TimelineMax=Jn;sn=new Jn({sortChildren:!1,defaults:kl,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Pi.stringFilter=Mp;var ma=[],Cu={},KS=[],U0=0,JS=0,tp=function(e){return(Cu[e]||KS).map(function(t){return t()})},fp=function(){var e=Date.now(),t=[];e-U0>2&&(tp("matchMediaInit"),ma.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=Rr.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),tp("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),U0=e,tp("matchMedia"))},hv=function(){function i(t,n){this.selector=n&&cp(n),this.data=[],this._r=[],this.isReverted=!1,this.id=JS++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){cn(n)&&(s=r,r=n,n=cn);var a=this,o=function(){var c=en,u=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=cp(s)),en=a,f=r.apply(a,arguments),cn(f)&&a._r.push(f),en=c,a.selector=u,a.isReverted=!1,f};return a.last=o,n===cn?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var r=en;en=null,n(this),en=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof mn&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Jn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof mn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=ma.length;a--;)ma[a].id===this.id&&ma.splice(a,1)},e.revert=function(n){this.kill(n||{})},i}(),jS=function(){function i(t){this.contexts=[],this.scope=t,en&&en.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){Pr(n)||(n={matches:n});var a=new hv(0,s||this.scope),o=a.conditions={},l,c,u;en&&!a.selector&&(a.selector=en.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=Rr.matchMedia(n[c]),l&&(ma.indexOf(a)<0&&ma.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(fp):l.addEventListener("change",fp)));return u&&r(a,function(f){return a.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),Bu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return iv(r)})},timeline:function(e){return new Jn(e)},getTweensOf:function(e,t){return sn.getTweensOf(e,t)},getProperty:function(e,t,n,r){bn(e)&&(e=ir(e)[0]);var s=Ms(e||{}).get,a=n?W0:V0;return n==="native"&&(n=""),e&&(t?a((Ci[t]&&Ci[t].get||s)(e,t,n,r)):function(o,l,c){return a((Ci[o]&&Ci[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=ir(e),e.length>1){var r=e.map(function(u){return $n.quickSetter(u,t,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var a=Ci[t],o=Ms(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var f=new a;so._pt=0,f.init(e,n?u+n:u,so,0,[e]),f.render(1,f),so._pt&&Dp(1,so)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var r,s=$n.to(e,Hi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return sn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=pa(e.ease,kl.ease)),R0(kl,e||{})},config:function(e){return R0(Pi,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,a=e.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!Ci[o]&&!zi[o]&&zl(t+" effect requires "+o+" plugin.")}),Jd[t]=function(o,l,c){return n(ir(o),Hi(l||{},s),c)},a&&(Jn.prototype[t]=function(o,l,c){return this.add(Jd[t](o,Pr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){yt[e]=pa(t)},parseEase:function(e,t){return arguments.length?pa(e,t):yt},getById:function(e){return sn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Jn(e),r,s;for(n.smoothChildTiming=Di(e.smoothChildTiming),sn.remove(n),n._dp=0,n._time=n._tTime=sn._time,r=sn._first;r;)s=r._next,(t||!(!r._dur&&r instanceof mn&&r.vars.onComplete===r._targets[0]))&&Dr(n,r,r._start-r._delay),r=s;return Dr(sn,n,0),n},context:function(e,t){return e?new hv(e,t):en},matchMedia:function(e){return new jS(e)},matchMediaRefresh:function(){return ma.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||fp()},addEventListener:function(e,t){var n=Cu[e]||(Cu[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Cu[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:RS,wrapYoyo:DS,distribute:J0,random:$0,snap:j0,normalize:CS,getUnit:Hn,clamp:TS,splitColor:rv,toArray:ir,selector:cp,mapRange:tv,pipe:wS,unitize:bS,interpolate:PS,shuffle:K0},install:k0,effects:Jd,ticker:Ri,updateRoot:Jn.updateRoot,plugins:Ci,globalTimeline:sn,core:{PropTween:di,globals:z0,Tween:mn,Timeline:Jn,Animation:Vl,getCache:Ms,_removeLinkedListItem:Fu,reverting:function(){return zn},context:function(e){return e&&en&&(en.data.push(e),e._ctx=en),en},suppressOverwrites:function(e){return dp=e}}};fi("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Bu[i]=mn[i]});Ri.add(Jn.updateRoot);so=Bu.to({},{duration:0});var $S=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},e1=function(e,t){var n=e._targets,r,s,a;for(r in t)for(s=n.length;s--;)a=e._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=$S(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[s],r))},np=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(bn(s)&&(l={},fi(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}e1(o,s)}}}},$n=Bu.registerPlugin({name:"attr",init:function(e,t,n,r,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)zn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},np("roundProps",up),np("modifiers"),np("snap",j0))||Bu;mn.version=Jn.version=$n.version="3.15.0";O0=1;pp()&&co();var t1=yt.Power0,n1=yt.Power1,i1=yt.Power2,r1=yt.Power3,s1=yt.Power4,a1=yt.Linear,o1=yt.Quad,l1=yt.Cubic,c1=yt.Quart,u1=yt.Quint,h1=yt.Strong,f1=yt.Elastic,d1=yt.Back,p1=yt.SteppedEase,m1=yt.Bounce,g1=yt.Sine,v1=yt.Expo,x1=yt.Circ;var fv,ws,fo,Np,Sa,_1,dv,Op,y1=function(){return typeof window<"u"},Kr={},Aa=180/Math.PI,po=Math.PI/180,ho=Math.atan2,pv=1e8,kp=/([A-Z])/g,A1=/(left|right|width|margin|padding|x)/i,S1=/[\s,\(]\S/,Ir={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Bp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},M1=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},T1=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},E1=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},w1=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Sv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Mv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},b1=function(e,t,n){return e.style[t]=n},C1=function(e,t,n){return e.style.setProperty(t,n)},R1=function(e,t,n){return e._gsap[t]=n},D1=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},P1=function(e,t,n,r,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},I1=function(e,t,n,r,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},an="transform",Ii=an+"Origin",B1=function i(e,t){var n=this,r=this.target,s=r.style,a=r._gsap;if(e in Kr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Ir[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Zr(r,o)}):this.tfm[e]=a.x?a[e]:Zr(r,e),e===Ii&&(this.tfm.zOrigin=a.zOrigin);else return Ir.transform.split(",").forEach(function(o){return i.call(n,o,t)});if(this.props.indexOf(an)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ii,t,"")),e=an}(s||t)&&this.props.push(e,t,s[e])},Tv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},U1=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(kp,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Op(),(!s||!s.isStart)&&!n[an]&&(Tv(n),r.zOrigin&&n[Ii]&&(n[Ii]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Ev=function(e,t){var n={target:e,props:[],revert:U1,save:B1};return e._gsap||$n.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},wv,Up=function(e,t){var n=ws.createElementNS?ws.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ws.createElement(e);return n&&n.style?n:ws.createElement(e)},Gi=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(kp,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,mo(t)||t,1)||""},mv="O,Moz,ms,Ms,Webkit".split(","),mo=function(e,t,n){var r=t||Sa,s=r.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(mv[a]+e in s););return a<0?null:(a===3?"ms":a>=0?mv[a]:"")+e},Lp=function(){y1()&&window.document&&(fv=window,ws=fv.document,fo=ws.documentElement,Sa=Up("div")||{style:{}},_1=Up("div"),an=mo(an),Ii=an+"Origin",Sa.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",wv=!!mo("perspective"),Op=$n.core.reverting,Np=1)},gv=function(e){var t=e.ownerSVGElement,n=Up("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),fo.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),fo.removeChild(n),s},vv=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},bv=function(e){var t,n;try{t=e.getBBox()}catch{t=gv(e),n=1}return t&&(t.width||t.height)||n||(t=gv(e)),t&&!t.width&&!t.x&&!t.y?{x:+vv(e,["x","cx","x1"])||0,y:+vv(e,["y","cy","y1"])||0,width:0,height:0}:t},Cv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&bv(e))},Cs=function(e,t){if(t){var n=e.style,r;t in Kr&&t!==Ii&&(t=an),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(kp,"-$1").toLowerCase())):n.removeAttribute(t)}},bs=function(e,t,n,r,s,a){var o=new di(e._pt,t,n,0,1,a?Mv:Sv);return e._pt=o,o.b=r,o.e=s,e._props.push(n),o},xv={deg:1,rad:1,turn:1},L1={grid:1,flex:1},Rs=function i(e,t,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Sa.style,l=A1.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",p,v,g,m;if(r===a||!s||xv[r]||xv[a])return s;if(a!=="px"&&!h&&(s=i(e,t,n,"px")),m=e.getCTM&&Cv(e),(d||a==="%")&&(Kr[t]||~t.indexOf("adius")))return p=m?e.getBBox()[l?"width":"height"]:e[u],un(d?s/p*f:s/100*p);if(o[l?"width":"height"]=f+(h?a:r),v=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===ws||!v.appendChild)&&(v=ws.body),g=v._gsap,g&&d&&g.width&&l&&g.time===Ri.time&&!g.uncache)return un(s/g.width*f);if(d&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=f+r,p=e[u],x?e.style[t]=x:Cs(e,t)}else(d||a==="%")&&!L1[Gi(v,"display")]&&(o.position=Gi(e,"position")),v===e&&(o.position="static"),v.appendChild(Sa),p=Sa[u],v.removeChild(Sa),o.position="absolute";return l&&d&&(g=Ms(v),g.time=Ri.time,g.width=v[u]),un(h?p*s/f:p&&s?f/p*s:0)},Zr=function(e,t,n,r){var s;return Np||Lp(),t in Ir&&t!=="transform"&&(t=Ir[t],~t.indexOf(",")&&(t=t.split(",")[0])),Kr[t]&&t!=="transform"?(s=ql(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Hu(Gi(e,Ii))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=zu[t]&&zu[t](e,t,n)||Gi(e,t)||Ap(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Rs(e,t,s,n)+n:s},F1=function(e,t,n,r){if(!n||n==="none"){var s=mo(t,e,1),a=s&&Gi(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=Gi(e,"borderTopColor"))}var o=new di(this._pt,e.style,t,0,1,Rp),l=0,c=0,u,f,h,d,p,v,g,m,x,y,A,S;if(o.b=n,o.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=Gi(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(v=e.style[t],e.style[t]=r,r=Gi(e,t)||r,v?e.style[t]=v:Cs(e,t)),u=[n,r],Mp(u),n=u[0],r=u[1],h=n.match(ga)||[],S=r.match(ga)||[],S.length){for(;f=ga.exec(r);)g=f[0],x=r.substring(l,f.index),p?p=(p+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(p=1),g!==(v=h[c++]||"")&&(d=parseFloat(v)||0,A=v.substr((d+"").length),g.charAt(1)==="="&&(g=va(d,g)+A),m=parseFloat(g),y=g.substr((m+"").length),l=ga.lastIndex-y.length,y||(y=y||Pi.units[t]||A,l===r.length&&(r+=y,o.e+=y)),A!==y&&(d=Rs(e,t,v,y)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:d,c:m-d,m:p&&p<4||t==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=t==="display"&&r==="none"?Mv:Sv;return gp.test(r)&&(o.e=0),this._pt=o,o},_v={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},N1=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=_v[n]||n,t[1]=_v[r]||r,t.join(" ")},O1=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Kr[o]&&(l=1,o=o==="transformOrigin"?Ii:an),Cs(n,o);l&&(Cs(n,an),a&&(a.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",ql(n,1),a.uncache=1,Tv(r)))}},zu={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var a=e._pt=new di(e._pt,t,n,0,0,O1);return a.u=r,a.pr=-10,a.tween=s,e._props.push(n),1}}},Yl=[1,0,0,1,0,0],Rv={},Dv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},yv=function(e){var t=Gi(e,an);return Dv(t)?Yl:t.substr(7).match(mp).map(un)},zp=function(e,t){var n=e._gsap||Ms(e),r=e.style,s=yv(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Yl:s):(s===Yl&&!e.offsetParent&&e!==fo&&!n.svg&&(l=r.display,r.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,fo.appendChild(e)),s=yv(e),l?r.display=l:Cs(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):fo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Fp=function(e,t,n,r,s,a){var o=e._gsap,l=s||zp(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,d=l[0],p=l[1],v=l[2],g=l[3],m=l[4],x=l[5],y=t.split(" "),A=parseFloat(y[0])||0,S=parseFloat(y[1])||0,E,T,_,M;n?l!==Yl&&(T=d*g-p*v)&&(_=A*(g/T)+S*(-v/T)+(v*x-g*m)/T,M=A*(-p/T)+S*(d/T)-(d*x-p*m)/T,A=_,S=M):(E=bv(e),A=E.x+(~y[0].indexOf("%")?A/100*E.width:A),S=E.y+(~(y[1]||y[0]).indexOf("%")?S/100*E.height:S)),r||r!==!1&&o.smooth?(m=A-c,x=S-u,o.xOffset=f+(m*d+x*v)-m,o.yOffset=h+(m*p+x*g)-x):o.xOffset=o.yOffset=0,o.xOrigin=A,o.yOrigin=S,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Ii]="0px 0px",a&&(bs(a,o,"xOrigin",c,A),bs(a,o,"yOrigin",u,S),bs(a,o,"xOffset",f,o.xOffset),bs(a,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",A+" "+S)},ql=function(e,t){var n=e._gsap||new Tp(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Gi(e,Ii)||"0",u,f,h,d,p,v,g,m,x,y,A,S,E,T,_,M,C,R,w,P,F,N,O,H,j,G,I,te,ie,xe,ye,Ne;return u=f=h=v=g=m=x=y=A=0,d=p=1,n.svg=!!(e.getCTM&&Cv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[an]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[an]!=="none"?l[an]:"")),r.scale=r.rotate=r.translate="none"),T=zp(e,n.svg),n.svg&&(n.uncache?(j=e.getBBox(),c=n.xOrigin-j.x+"px "+(n.yOrigin-j.y)+"px",H=""):H=!t&&e.getAttribute("data-svg-origin"),Fp(e,H||c,!!H||n.originIsAbsolute,n.smooth!==!1,T)),S=n.xOrigin||0,E=n.yOrigin||0,T!==Yl&&(R=T[0],w=T[1],P=T[2],F=T[3],u=N=T[4],f=O=T[5],T.length===6?(d=Math.sqrt(R*R+w*w),p=Math.sqrt(F*F+P*P),v=R||w?ho(w,R)*Aa:0,x=P||F?ho(P,F)*Aa+v:0,x&&(p*=Math.abs(Math.cos(x*po))),n.svg&&(u-=S-(S*R+E*P),f-=E-(S*w+E*F))):(Ne=T[6],xe=T[7],I=T[8],te=T[9],ie=T[10],ye=T[11],u=T[12],f=T[13],h=T[14],_=ho(Ne,ie),g=_*Aa,_&&(M=Math.cos(-_),C=Math.sin(-_),H=N*M+I*C,j=O*M+te*C,G=Ne*M+ie*C,I=N*-C+I*M,te=O*-C+te*M,ie=Ne*-C+ie*M,ye=xe*-C+ye*M,N=H,O=j,Ne=G),_=ho(-P,ie),m=_*Aa,_&&(M=Math.cos(-_),C=Math.sin(-_),H=R*M-I*C,j=w*M-te*C,G=P*M-ie*C,ye=F*C+ye*M,R=H,w=j,P=G),_=ho(w,R),v=_*Aa,_&&(M=Math.cos(_),C=Math.sin(_),H=R*M+w*C,j=N*M+O*C,w=w*M-R*C,O=O*M-N*C,R=H,N=j),g&&Math.abs(g)+Math.abs(v)>359.9&&(g=v=0,m=180-m),d=un(Math.sqrt(R*R+w*w+P*P)),p=un(Math.sqrt(O*O+Ne*Ne)),_=ho(N,O),x=Math.abs(_)>2e-4?_*Aa:0,A=ye?1/(ye<0?-ye:ye):0),n.svg&&(H=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Dv(Gi(e,an)),H&&e.setAttribute("transform",H))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(d*=-1,x+=v<=0?180:-180,v+=v<=0?180:-180):(p*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=un(d),n.scaleY=un(p),n.rotation=un(v)+o,n.rotationX=un(g)+o,n.rotationY=un(m)+o,n.skewX=x+o,n.skewY=y+o,n.transformPerspective=A+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Ii]=Hu(c)),n.xOffset=n.yOffset=0,n.force3D=Pi.force3D,n.renderTransform=n.svg?z1:wv?Pv:k1,n.uncache=0,n},Hu=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ip=function(e,t,n){var r=Hn(t);return un(parseFloat(t)+parseFloat(Rs(e,"x",n+"px",r)))+r},k1=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Pv(e,t)},_a="0deg",Xl="0px",ya=") ",Pv=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,p=n.scaleX,v=n.scaleY,g=n.transformPerspective,m=n.force3D,x=n.target,y=n.zOrigin,A="",S=m==="auto"&&e&&e!==1||m===!0;if(y&&(f!==_a||u!==_a)){var E=parseFloat(u)*po,T=Math.sin(E),_=Math.cos(E),M;E=parseFloat(f)*po,M=Math.cos(E),a=Ip(x,a,T*M*-y),o=Ip(x,o,-Math.sin(E)*-y),l=Ip(x,l,_*M*-y+y)}g!==Xl&&(A+="perspective("+g+ya),(r||s)&&(A+="translate("+r+"%, "+s+"%) "),(S||a!==Xl||o!==Xl||l!==Xl)&&(A+=l!==Xl||S?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+ya),c!==_a&&(A+="rotate("+c+ya),u!==_a&&(A+="rotateY("+u+ya),f!==_a&&(A+="rotateX("+f+ya),(h!==_a||d!==_a)&&(A+="skew("+h+", "+d+ya),(p!==1||v!==1)&&(A+="scale("+p+", "+v+ya),x.style[an]=A||"translate(0, 0)"},z1=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,p=n.xOrigin,v=n.yOrigin,g=n.xOffset,m=n.yOffset,x=n.forceCSS,y=parseFloat(a),A=parseFloat(o),S,E,T,_,M;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=po,c*=po,S=Math.cos(l)*f,E=Math.sin(l)*f,T=Math.sin(l-c)*-h,_=Math.cos(l-c)*h,c&&(u*=po,M=Math.tan(c-u),M=Math.sqrt(1+M*M),T*=M,_*=M,u&&(M=Math.tan(u),M=Math.sqrt(1+M*M),S*=M,E*=M)),S=un(S),E=un(E),T=un(T),_=un(_)):(S=f,_=h,E=T=0),(y&&!~(a+"").indexOf("px")||A&&!~(o+"").indexOf("px"))&&(y=Rs(d,"x",a,"px"),A=Rs(d,"y",o,"px")),(p||v||g||m)&&(y=un(y+p-(p*S+v*T)+g),A=un(A+v-(p*E+v*_)+m)),(r||s)&&(M=d.getBBox(),y=un(y+r/100*M.width),A=un(A+s/100*M.height)),M="matrix("+S+","+E+","+T+","+_+","+y+","+A+")",d.setAttribute("transform",M),x&&(d.style[an]=M)},H1=function(e,t,n,r,s){var a=360,o=bn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Aa:1),c=l-r,u=r+c+"deg",f,h;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*pv)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*pv)%a-~~(c/a)*a)),e._pt=h=new di(e._pt,t,n,r,c,M1),h.e=u,h.u="deg",e._props.push(n),h},Av=function(e,t){for(var n in t)e[n]=t[n];return e},G1=function(e,t,n){var r=Av({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,f,h,d,p;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[an]=t,o=ql(n,1),Cs(n,an),n.setAttribute("transform",c)):(c=getComputedStyle(n)[an],a[an]=t,o=ql(n,1),a[an]=c);for(l in Kr)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(d=Hn(c),p=Hn(u),f=d!==p?Rs(n,l,c,p):parseFloat(c),h=parseFloat(u),e._pt=new di(e._pt,o,l,f,h-f,Bp),e._pt.u=p||0,e._props.push(l));Av(o,r)};fi("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",a=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(o){return e<2?i+o:"border"+o+i});zu[e>1?"border"+i:i]=function(o,l,c,u,f){var h,d;if(arguments.length<4)return h=a.map(function(p){return Zr(o,p,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},a.forEach(function(p,v){return d[p]=h[v]=h[v]||h[(v-1)/2|0]}),o.init(l,d,f)}});var Hp={name:"css",register:Lp,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,f,h,d,p,v,g,m,x,y,A,S,E,T,_,M;Np||Lp(),this.styles=this.styles||Ev(e),_=this.styles.props,this.tween=n;for(v in t)if(v!=="autoRound"&&(u=t[v],!(Ci[v]&&wp(v,t,n,r,e,s)))){if(d=typeof u,p=zu[v],d==="function"&&(u=u.call(n,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=uo(u)),p)p(this,e,v,u,n)&&(T=1);else if(v.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(v)+"").trim(),u+="",qr.lastIndex=0,qr.test(c)||(g=Hn(c),m=Hn(u),m?g!==m&&(c=Rs(e,v,c,m)+m):g&&(u+=g)),this.add(o,"setProperty",c,u,r,s,0,0,v),a.push(v),_.push(v,0,o[v]);else if(d!=="undefined"){if(l&&v in l?(c=typeof l[v]=="function"?l[v].call(n,r,e,s):l[v],bn(c)&&~c.indexOf("random(")&&(c=uo(c)),Hn(c+"")||c==="auto"||(c+=Pi.units[v]||Hn(Zr(e,v))||""),(c+"").charAt(1)==="="&&(c=Zr(e,v))):c=Zr(e,v),h=parseFloat(c),x=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),f=parseFloat(u),v in Ir&&(v==="autoAlpha"&&(h===1&&Zr(e,"visibility")==="hidden"&&f&&(h=0),_.push("visibility",0,o.visibility),bs(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),v!=="scale"&&v!=="transform"&&(v=Ir[v],~v.indexOf(",")&&(v=v.split(",")[0]))),y=v in Kr,y){if(this.styles.save(v),M=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Gi(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=u,u=Gi(e,"perspective"),C?e.style.perspective=C:Cs(e,"perspective")}f=parseFloat(u)}if(A||(S=e._gsap,S.renderTransform&&!t.parseTransform||ql(e,t.parseTransform),E=t.smoothOrigin!==!1&&S.smooth,A=this._pt=new di(this._pt,o,an,0,1,S.renderTransform,S,0,-1),A.dep=1),v==="scale")this._pt=new di(this._pt,S,"scaleY",S.scaleY,(x?va(S.scaleY,x+f):f)-S.scaleY||0,Bp),this._pt.u=0,a.push("scaleY",v),v+="X";else if(v==="transformOrigin"){_.push(Ii,0,o[Ii]),u=N1(u),S.svg?Fp(e,u,0,E,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==S.zOrigin&&bs(this,S,"zOrigin",S.zOrigin,m),bs(this,o,v,Hu(c),Hu(u)));continue}else if(v==="svgOrigin"){Fp(e,u,1,E,0,this);continue}else if(v in Rv){H1(this,S,v,h,x?va(h,x+u):u);continue}else if(v==="smoothOrigin"){bs(this,S,"smooth",S.smooth,u);continue}else if(v==="force3D"){S[v]=u;continue}else if(v==="transform"){G1(this,u,e);continue}}else v in o||(v=mo(v)||v);if(y||(f||f===0)&&(h||h===0)&&!S1.test(u)&&v in o)g=(c+"").substr((h+"").length),f||(f=0),m=Hn(u)||(v in Pi.units?Pi.units[v]:g),g!==m&&(h=Rs(e,v,c,m)),this._pt=new di(this._pt,y?S:o,v,h,(x?va(h,x+f):f)-h,!y&&(m==="px"||v==="zIndex")&&t.autoRound!==!1?w1:Bp),this._pt.u=m||0,y&&M!==u?(this._pt.b=c,this._pt.e=M,this._pt.r=E1):g!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=T1);else if(v in o)F1.call(this,e,v,c,x?x+u:u);else if(v in e)this.add(e,v,c||e[v],x?x+u:u,r,s);else if(v!=="parseTransform"){Lu(v,u);continue}y||(v in o?_.push(v,0,o[v]):typeof e[v]=="function"?_.push(v,2,e[v]()):_.push(v,1,c||e[v])),a.push(v)}}T&&Pp(this)},render:function(e,t){if(t.tween._time||!Op())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Zr,aliases:Ir,getSetter:function(e,t,n){var r=Ir[t];return r&&r.indexOf(",")<0&&(t=r),t in Kr&&t!==Ii&&(e._gsap.x||Zr(e,"x"))?n&&dv===n?t==="scale"?D1:R1:(dv=n||{})&&(t==="scale"?P1:I1):e.style&&!Uu(e.style[t])?b1:~t.indexOf("-")?C1:ku(e,t)},core:{_removeProperty:Cs,_getMatrix:zp}};$n.utils.checkPrefix=mo;$n.core.getStyleSaver=Ev;(function(i,e,t,n){var r=fi(i+","+e+","+t,function(s){Kr[s]=1});fi(e,function(s){Pi.units[s]="deg",Rv[s]=1}),Ir[r[13]]=i+","+e,fi(n,function(s){var a=s.split(":");Ir[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");fi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){Pi.units[i]="px"});$n.registerPlugin(Hp);var gr=$n.registerPlugin(Hp)||$n,TD=gr.core.Tween;function Iv(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function V1(i,e,t){return e&&Iv(i.prototype,e),t&&Iv(i,t),i}var Gn,Wu,W1,Vi,Ds,Ps,vo,Uv,Ma,xo,Lv,Jr,vr,Fv,Nv=function(){return Gn||typeof window<"u"&&(Gn=window.gsap)&&Gn.registerPlugin&&Gn},Ov=1,go=[],pt=[],xr=[],Zl=Date.now,Gp=function(e,t){return t},X1=function(){var e=xo.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,pt),r.push.apply(r,xr),pt=n,xr=r,Gp=function(a,o){return t[a](o)}},$r=function(e,t){return~xr.indexOf(e)&&xr[xr.indexOf(e)+1][t]},Kl=function(e){return!!~Lv.indexOf(e)},mi=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},pi=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Gu="scrollLeft",Vu="scrollTop",Vp=function(){return Jr&&Jr.isPressed||pt.cache++},Xu=function(e,t){var n=function r(s){if(s||s===0){Ov&&(Vi.history.scrollRestoration="manual");var a=Jr&&Jr.isPressed;s=r.v=Math.round(s)||(Jr&&Jr.iOS?1:0),e(s),r.cacheID=pt.cache,a&&Gp("ss",s)}else(t||pt.cache!==r.cacheID||Gp("ref"))&&(r.cacheID=pt.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},ei={s:Gu,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Xu(function(i){return arguments.length?Vi.scrollTo(i,vn.sc()):Vi.pageXOffset||Ds[Gu]||Ps[Gu]||vo[Gu]||0})},vn={s:Vu,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:ei,sc:Xu(function(i){return arguments.length?Vi.scrollTo(ei.sc(),i):Vi.pageYOffset||Ds[Vu]||Ps[Vu]||vo[Vu]||0})},gi=function(e,t){return(t&&t._ctx&&t._ctx.selector||Gn.utils.toArray)(e)[0]||(typeof e=="string"&&Gn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Y1=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},jr=function(e,t){var n=t.s,r=t.sc;Kl(e)&&(e=Ds.scrollingElement||Ps);var s=pt.indexOf(e),a=r===vn.sc?1:2;!~s&&(s=pt.push(e)-1),pt[s+a]||mi(e,"scroll",Vp);var o=pt[s+a],l=o||(pt[s+a]=Xu($r(e,n),!0)||(Kl(e)?r:Xu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Gn.getProperty(e,"scrollBehavior")==="smooth"),l},Yu=function(e,t,n){var r=e,s=e,a=Zl(),o=a,l=t||50,c=Math.max(500,l*3),u=function(p,v){var g=Zl();v||g-a>l?(s=r,r=p,o=a,a=g):n?r+=p:r=s+(p-s)/(g-o)*(a-o)},f=function(){s=r=n?0:r,o=a=0},h=function(p){var v=o,g=s,m=Zl();return(p||p===0)&&p!==r&&u(p),a===o||m-o>c?0:(r+(n?g:-g))/((n?m:a)-v)*1e3};return{update:u,reset:f,getVelocity:h}},Ql=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Bv=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},kv=function(){xo=Gn.core.globals().ScrollTrigger,xo&&xo.core&&X1()},zv=function(e){return Gn=e||Nv(),!Wu&&Gn&&typeof document<"u"&&document.body&&(Vi=window,Ds=document,Ps=Ds.documentElement,vo=Ds.body,Lv=[Vi,Ds,Ps,vo],W1=Gn.utils.clamp,Fv=Gn.core.context||function(){},Ma="onpointerenter"in vo?"pointer":"mouse",Uv=hn.isTouch=Vi.matchMedia&&Vi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Vi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,vr=hn.eventTypes=("ontouchstart"in Ps?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Ps?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Ov=0},500),Wu=1),xo||kv(),Wu};ei.op=vn;pt.cache=0;var hn=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){Wu||zv(Gn)||console.warn("Please gsap.registerPlugin(Observer)"),xo||kv();var r=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,p=n.wheelSpeed,v=n.event,g=n.onDragStart,m=n.onDragEnd,x=n.onDrag,y=n.onPress,A=n.onRelease,S=n.onRight,E=n.onLeft,T=n.onUp,_=n.onDown,M=n.onChangeX,C=n.onChangeY,R=n.onChange,w=n.onToggleX,P=n.onToggleY,F=n.onHover,N=n.onHoverEnd,O=n.onMove,H=n.ignoreCheck,j=n.isNormalizer,G=n.onGestureStart,I=n.onGestureEnd,te=n.onWheel,ie=n.onEnable,xe=n.onDisable,ye=n.onClick,Ne=n.scrollSpeed,Q=n.capture,se=n.allowClicks,ae=n.lockAxis,re=n.onLockAxis;this.target=o=gi(o)||Ps,this.vars=n,d&&(d=Gn.utils.toArray(d)),r=r||1e-9,s=s||0,p=p||1,Ne=Ne||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Vi.getComputedStyle(vo).lineHeight)||22);var he,me,Ae,oe,Ee,Oe,_e,q=this,z=0,Ve=0,Be=n.passive||!u&&n.passive!==!1,Ie=jr(o,ei),ge=jr(o,vn),L=Ie(),b=ge(),W=~a.indexOf("touch")&&!~a.indexOf("pointer")&&vr[0]==="pointerdown",ee=Kl(o),U=o.ownerDocument||Ds,k=[0,0,0],Y=[0,0,0],$=0,fe=function(){return $=Zl()},pe=function(We,ct){return(q.event=We)&&d&&Y1(We.target,d)||ct&&W&&We.pointerType!=="touch"||H&&H(We,ct)},le=function(){q._vx.reset(),q._vy.reset(),me.pause(),f&&f(q)},ce=function(){var We=q.deltaX=Bv(k),ct=q.deltaY=Bv(Y),De=Math.abs(We)>=r,tt=Math.abs(ct)>=r;R&&(De||tt)&&R(q,We,ct,k,Y),De&&(S&&q.deltaX>0&&S(q),E&&q.deltaX<0&&E(q),M&&M(q),w&&q.deltaX<0!=z<0&&w(q),z=q.deltaX,k[0]=k[1]=k[2]=0),tt&&(_&&q.deltaY>0&&_(q),T&&q.deltaY<0&&T(q),C&&C(q),P&&q.deltaY<0!=Ve<0&&P(q),Ve=q.deltaY,Y[0]=Y[1]=Y[2]=0),(oe||Ae)&&(O&&O(q),Ae&&(g&&Ae===1&&g(q),x&&x(q),Ae=0),oe=!1),Oe&&!(Oe=!1)&&re&&re(q),Ee&&(te(q),Ee=!1),he=0},Le=function(We,ct,De){k[De]+=We,Y[De]+=ct,q._vx.update(We),q._vy.update(ct),c?he||(he=requestAnimationFrame(ce)):ce()},Fe=function(We,ct){ae&&!_e&&(q.axis=_e=Math.abs(We)>Math.abs(ct)?"x":"y",Oe=!0),_e!=="y"&&(k[2]+=We,q._vx.update(We,!0)),_e!=="x"&&(Y[2]+=ct,q._vy.update(ct,!0)),c?he||(he=requestAnimationFrame(ce)):ce()},be=function(We){if(!pe(We,1)){We=Ql(We,u);var ct=We.clientX,De=We.clientY,tt=ct-q.x,Ze=De-q.y,nt=q.isDragging;q.x=ct,q.y=De,(nt||(tt||Ze)&&(Math.abs(q.startX-ct)>=s||Math.abs(q.startY-De)>=s))&&(Ae||(Ae=nt?2:1),nt||(q.isDragging=!0),Fe(tt,Ze))}},et=q.onPress=function(Ue){pe(Ue,1)||Ue&&Ue.button||(q.axis=_e=null,me.pause(),q.isPressed=!0,Ue=Ql(Ue),z=Ve=0,q.startX=q.x=Ue.clientX,q.startY=q.y=Ue.clientY,q._vx.reset(),q._vy.reset(),mi(j?o:U,vr[1],be,Be,!0),q.deltaX=q.deltaY=0,y&&y(q))},V=q.onRelease=function(Ue){if(!pe(Ue,1)){pi(j?o:U,vr[1],be,!0);var We=!isNaN(q.y-q.startY),ct=q.isDragging,De=ct&&(Math.abs(q.x-q.startX)>3||Math.abs(q.y-q.startY)>3),tt=Ql(Ue);!De&&We&&(q._vx.reset(),q._vy.reset(),u&&se&&Gn.delayedCall(.08,function(){if(Zl()-$>300&&!Ue.defaultPrevented){if(Ue.target.click)Ue.target.click();else if(U.createEvent){var Ze=U.createEvent("MouseEvents");Ze.initMouseEvent("click",!0,!0,Vi,1,tt.screenX,tt.screenY,tt.clientX,tt.clientY,!1,!1,!1,!1,0,null),Ue.target.dispatchEvent(Ze)}}})),q.isDragging=q.isGesturing=q.isPressed=!1,f&&ct&&!j&&me.restart(!0),Ae&&ce(),m&&ct&&m(q),A&&A(q,De)}},ve=function(We){return We.touches&&We.touches.length>1&&(q.isGesturing=!0)&&G(We,q.isDragging)},de=function(){return(q.isGesturing=!1)||I(q)},Ce=function(We){if(!pe(We)){var ct=Ie(),De=ge();Le((ct-L)*Ne,(De-b)*Ne,1),L=ct,b=De,f&&me.restart(!0)}},ue=function(We){if(!pe(We)){We=Ql(We,u),te&&(Ee=!0);var ct=(We.deltaMode===1?l:We.deltaMode===2?Vi.innerHeight:1)*p;Le(We.deltaX*ct,We.deltaY*ct,0),f&&!j&&me.restart(!0)}},ne=function(We){if(!pe(We)){var ct=We.clientX,De=We.clientY,tt=ct-q.x,Ze=De-q.y;q.x=ct,q.y=De,oe=!0,f&&me.restart(!0),(tt||Ze)&&Fe(tt,Ze)}},ke=function(We){q.event=We,F(q)},Qe=function(We){q.event=We,N(q)},Tt=function(We){return pe(We)||Ql(We,u)&&ye(q)};me=q._dc=Gn.delayedCall(h||.25,le).pause(),q.deltaX=q.deltaY=0,q._vx=Yu(0,50,!0),q._vy=Yu(0,50,!0),q.scrollX=Ie,q.scrollY=ge,q.isDragging=q.isGesturing=q.isPressed=!1,Fv(this),q.enable=function(Ue){return q.isEnabled||(mi(ee?U:o,"scroll",Vp),a.indexOf("scroll")>=0&&mi(ee?U:o,"scroll",Ce,Be,Q),a.indexOf("wheel")>=0&&mi(o,"wheel",ue,Be,Q),(a.indexOf("touch")>=0&&Uv||a.indexOf("pointer")>=0)&&(mi(o,vr[0],et,Be,Q),mi(U,vr[2],V),mi(U,vr[3],V),se&&mi(o,"click",fe,!0,!0),ye&&mi(o,"click",Tt),G&&mi(U,"gesturestart",ve),I&&mi(U,"gestureend",de),F&&mi(o,Ma+"enter",ke),N&&mi(o,Ma+"leave",Qe),O&&mi(o,Ma+"move",ne)),q.isEnabled=!0,q.isDragging=q.isGesturing=q.isPressed=oe=Ae=!1,q._vx.reset(),q._vy.reset(),L=Ie(),b=ge(),Ue&&Ue.type&&et(Ue),ie&&ie(q)),q},q.disable=function(){q.isEnabled&&(go.filter(function(Ue){return Ue!==q&&Kl(Ue.target)}).length||pi(ee?U:o,"scroll",Vp),q.isPressed&&(q._vx.reset(),q._vy.reset(),pi(j?o:U,vr[1],be,!0)),pi(ee?U:o,"scroll",Ce,Q),pi(o,"wheel",ue,Q),pi(o,vr[0],et,Q),pi(U,vr[2],V),pi(U,vr[3],V),pi(o,"click",fe,!0),pi(o,"click",Tt),pi(U,"gesturestart",ve),pi(U,"gestureend",de),pi(o,Ma+"enter",ke),pi(o,Ma+"leave",Qe),pi(o,Ma+"move",ne),q.isEnabled=q.isPressed=q.isDragging=!1,xe&&xe(q))},q.kill=q.revert=function(){q.disable();var Ue=go.indexOf(q);Ue>=0&&go.splice(Ue,1),Jr===q&&(Jr=0)},go.push(q),j&&Kl(o)&&(Jr=q),q.enable(v)},V1(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();hn.version="3.15.0";hn.create=function(i){return new hn(i)};hn.register=zv;hn.getAll=function(){return go.slice()};hn.getById=function(i){return go.filter(function(e){return e.vars.id===i})[0]};Nv()&&Gn.registerPlugin(hn);var Ge,So,gt,kt,Yi,Bt,im,lh,uc,ic,jl,qu,ti,hh,Kp,xi,Hv,Gv,Mo,rx,Wp,sx,vi,Jp,ax,ox,Is,jp,rm,To,sm,rc,$p,Xp,Qu=1,ni=Date.now,Yp=ni(),ar=0,$l=0,Vv=function(e,t,n){var r=Xi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},Wv=function(e,t){return t&&(!Xi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},q1=function i(){return $l&&requestAnimationFrame(i)},Xv=function(){return hh=1},Yv=function(){return hh=0},Br=function(e){return e},ec=function(e){return Math.round(e*1e5)/1e5||0},lx=function(){return typeof window<"u"},cx=function(){return Ge||lx()&&(Ge=window.gsap)&&Ge.registerPlugin&&Ge},Ra=function(e){return!!~im.indexOf(e)},ux=function(e){return(e==="Height"?sm:gt["inner"+e])||Yi["client"+e]||Bt["client"+e]},hx=function(e){return $r(e,"getBoundingClientRect")||(Ra(e)?function(){return oh.width=gt.innerWidth,oh.height=sm,oh}:function(){return es(e)})},Q1=function(e,t,n){var r=n.d,s=n.d2,a=n.a;return(a=$r(e,"getBoundingClientRect"))?function(){return a()[r]}:function(){return(t?ux(s):e["client"+s])||0}},Z1=function(e,t){return!t||~xr.indexOf(e)?hx(e):function(){return oh}},Ur=function(e,t){var n=t.s,r=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+r)&&(a=$r(e,n))?a()-hx(e)()[s]:Ra(e)?(Yi[n]||Bt[n])-ux(r):e[n]-e["offset"+r])},Zu=function(e,t){for(var n=0;n<Mo.length;n+=3)(!t||~t.indexOf(Mo[n+1]))&&e(Mo[n],Mo[n+1],Mo[n+2])},Xi=function(e){return typeof e=="string"},ii=function(e){return typeof e=="function"},tc=function(e){return typeof e=="number"},Ta=function(e){return typeof e=="object"},Jl=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},_o=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},yo=Math.abs,fx="left",dx="top",am="right",om="bottom",wa="width",ba="height",sc="Right",ac="Left",oc="Top",lc="Bottom",xn="padding",rr="margin",wo="Width",lm="Height",Cn="px",sr=function(e){return gt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},K1=function(e){var t=sr(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},qv=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},es=function(e,t){var n=t&&sr(e)[Kp]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ge.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},ch=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},px=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},J1=function(e){return function(t){return Ge.utils.snap(px(e),t)}},cm=function(e){var t=Ge.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,a){a===void 0&&(a=.001);var o;if(!s)return t(r);if(s>0){for(r-=a,o=0;o<n.length;o++)if(n[o]>=r)return n[o];return n[o-1]}else for(o=n.length,r+=a;o--;)if(n[o]<=r)return n[o];return n[0]}:function(r,s,a){a===void 0&&(a=.001);var o=t(r);return!s||Math.abs(o-r)<a||o-r<0==s<0?o:t(s<0?r-e:r+e)}},j1=function(e){return function(t,n){return cm(px(e))(t,n.direction)}},Ku=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},Ln=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},Un=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Ju=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Qv={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ju={toggleActions:"play",anticipatePin:0},uh={top:0,left:0,center:.5,bottom:1,right:1},ih=function(e,t){if(Xi(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in uh?uh[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},$u=function(e,t,n,r,s,a,o,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,p=kt.createElement("div"),v=Ra(n)||$r(n,"pinType")==="fixed",g=e.indexOf("scroller")!==-1,m=v?Bt:n.tagName==="IFRAME"?n.contentDocument.body:n,x=e.indexOf("start")!==-1,y=x?c:u,A="border-color:"+y+";font-size:"+f+";color:"+y+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return A+="position:"+((g||l)&&v?"fixed;":"absolute;"),(g||l||!v)&&(A+=(r===vn?am:om)+":"+(a+parseFloat(h))+"px;"),o&&(A+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),p._isStart=x,p.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),p.style.cssText=A,p.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(p,m.children[0]):m.appendChild(p),p._offset=p["offset"+r.op.d2],rh(p,0,r,x),p},rh=function(e,t,n,r){var s={display:"block"},a=n[r?"os2":"p2"],o=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+a+wo]=1,s["border"+o+wo]=0,s[n.p]=t+"px",Ge.set(e,s)},mt=[],em={},hc,Zv=function(){return ni()-ar>34&&(hc||(hc=requestAnimationFrame(ts)))},Ao=function(){(!vi||!vi.isPressed||vi.startX>Bt.clientWidth)&&(pt.cache++,vi?hc||(hc=requestAnimationFrame(ts)):ts(),ar||Pa("scrollStart"),ar=ni())},qp=function(){ox=gt.innerWidth,ax=gt.innerHeight},nc=function(e){pt.cache++,(e===!0||!ti&&!sx&&!kt.fullscreenElement&&!kt.webkitFullscreenElement&&(!Jp||ox!==gt.innerWidth||Math.abs(gt.innerHeight-ax)>gt.innerHeight*.25))&&lh.restart(!0)},Da={},$1=[],mx=function i(){return Un(ot,"scrollEnd",i)||Ea(!0)},Pa=function(e){return Da[e]&&Da[e].map(function(t){return t()})||$1},Wi=[],gx=function(e){for(var t=0;t<Wi.length;t+=5)(!e||Wi[t+4]&&Wi[t+4].query===e)&&(Wi[t].style.cssText=Wi[t+1],Wi[t].getBBox&&Wi[t].setAttribute("transform",Wi[t+2]||""),Wi[t+3].uncache=1)},vx=function(){return pt.forEach(function(e){return ii(e)&&++e.cacheID&&(e.rec=e())})},um=function(e,t){var n;for(xi=0;xi<mt.length;xi++)n=mt[xi],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));rc=!0,t&&gx(t),t||Pa("revert")},xx=function(e,t){pt.cache++,(t||!_i)&&pt.forEach(function(n){return ii(n)&&n.cacheID++&&(n.rec=0)}),Xi(e)&&(gt.history.scrollRestoration=rm=e)},_i,Ca=0,Kv,eM=function(){if(Kv!==Ca){var e=Kv=Ca;requestAnimationFrame(function(){return e===Ca&&Ea(!0)})}},_x=function(){Bt.appendChild(To),sm=!vi&&To.offsetHeight||gt.innerHeight,Bt.removeChild(To)},Jv=function(e){return uc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ea=function(e,t){if(Yi=kt.documentElement,Bt=kt.body,im=[gt,kt,Yi,Bt],ar&&!e&&!rc){Ln(ot,"scrollEnd",mx);return}_x(),_i=ot.isRefreshing=!0,rc||vx();var n=Pa("refreshInit");rx&&ot.sort(),t||um(),pt.forEach(function(r){ii(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),mt.slice(0).forEach(function(r){return r.refresh()}),rc=!1,mt.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",a=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-a),r.refresh()}}),$p=1,Jv(!0),mt.forEach(function(r){var s=Ur(r.scroller,r._dir),a=r.vars.end==="max"||r._endClamp&&r.end>s,o=r._startClamp&&r.start>=s;(a||o)&&r.setPositions(o?s-1:r.start,a?Math.max(o?s:r.start+1,s):r.end,!0)}),Jv(!1),$p=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),pt.forEach(function(r){ii(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),xx(rm,1),lh.pause(),Ca++,_i=2,ts(2),mt.forEach(function(r){return ii(r.vars.onRefresh)&&r.vars.onRefresh(r)}),_i=ot.isRefreshing=!1,Pa("refresh")},tm=0,sh=1,cc,ts=function(e){if(e===2||!_i&&!rc){ot.isUpdating=!0,cc&&cc.update(0);var t=mt.length,n=ni(),r=n-Yp>=50,s=t&&mt[0].scroll();if(sh=tm>s?-1:1,_i||(tm=s),r&&(ar&&!hh&&n-ar>200&&(ar=0,Pa("scrollEnd")),jl=Yp,Yp=n),sh<0){for(xi=t;xi-- >0;)mt[xi]&&mt[xi].update(0,r);sh=1}else for(xi=0;xi<t;xi++)mt[xi]&&mt[xi].update(0,r);ot.isUpdating=!1}hc=0},nm=[fx,dx,om,am,rr+lc,rr+sc,rr+oc,rr+ac,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ah=nm.concat([wa,ba,"boxSizing","max"+wo,"max"+lm,"position",rr,xn,xn+oc,xn+sc,xn+lc,xn+ac]),tM=function(e,t,n){Eo(n);var r=e._gsap;if(r.spacerIsNative)Eo(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Qp=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=nm.length,a=t.style,o=e.style,l;s--;)l=nm[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[om]=o[am]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[wa]=ch(e,ei)+Cn,a[ba]=ch(e,vn)+Cn,a[xn]=o[rr]=o[dx]=o[fx]="0",Eo(r),o[wa]=o["max"+wo]=n[wa],o[ba]=o["max"+lm]=n[ba],o[xn]=n[xn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},nM=/([A-Z])/g,Eo=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,a;for((e.t._gsap||Ge.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],s=e[r],a?t[s]=a:t[s]&&t.removeProperty(s.replace(nM,"-$1").toLowerCase())}},eh=function(e){for(var t=ah.length,n=e.style,r=[],s=0;s<t;s++)r.push(ah[s],n[ah[s]]);return r.t=e,r},iM=function(e,t,n){for(var r=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},oh={left:0,top:0},jv=function(e,t,n,r,s,a,o,l,c,u,f,h,d,p){ii(e)&&(e=e(l)),Xi(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?ih("0"+e.substr(3),n):0));var v=d?d.time():0,g,m,x;if(d&&d.seek(0),isNaN(e)||(e=+e),tc(e))d&&(e=Ge.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),o&&rh(o,n,r,!0);else{ii(t)&&(t=t(l));var y=(e||"0").split(" "),A,S,E,T;x=gi(t,l)||Bt,A=es(x)||{},(!A||!A.left&&!A.top)&&sr(x).display==="none"&&(T=x.style.display,x.style.display="block",A=es(x),T?x.style.display=T:x.style.removeProperty("display")),S=ih(y[0],A[r.d]),E=ih(y[1]||"0",n),e=A[r.p]-c[r.p]-u+S+s-E,o&&rh(o,E,r,n-E<20||o._isStart&&E>20),n-=n-E}if(p&&(l[p]=e||-.001,e<0&&(e=0)),a){var _=e+n,M=a._isStart;g="scroll"+r.d2,rh(a,_,r,M&&_>20||!M&&(f?Math.max(Bt[g],Yi[g]):a.parentNode[g])<=_+1),f&&(c=es(o),f&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+Cn))}return d&&x&&(g=es(x),d.seek(h),m=es(x),d._caScrollDist=g[r.p]-m[r.p],e=e/d._caScrollDist*h),d&&d.seek(v),d?e:Math.round(e)},rM=/(webkit|moz|length|cssText|inset)/i,$v=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,a,o;if(t===Bt){e._stOrig=s.cssText,o=sr(e);for(a in o)!+a&&!rM.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=r}else s.cssText=e._stOrig;Ge.core.getCache(e).uncache=1,t.appendChild(e)}},yx=function(e,t,n){var r=t,s=r;return function(a){var o=Math.round(e());return o!==r&&o!==s&&Math.abs(o-r)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=r,r=Math.round(a),r}},th=function(e,t,n){var r={};r[t.p]="+="+n,Ge.set(e,r)},ex=function(e,t){var n=jr(e,t),r="_scroll"+t.p2,s=function a(o,l,c,u,f){var h=a.tween,d=l.onComplete,p={};c=c||n();var v=yx(n,c,function(){h.kill(),a.tween=0});return f=u&&f||0,u=u||o-c,h&&h.kill(),l[r]=o,l.inherit=!1,l.modifiers=p,p[r]=function(){return v(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){pt.cache++,a.tween&&ts()},l.onComplete=function(){a.tween=0,d&&d.call(h)},h=a.tween=Ge.to(e,l),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Ln(e,"wheel",n.wheelHandler),ot.isTouch&&Ln(e,"touchmove",n.wheelHandler),s},ot=function(){function i(t,n){So||i.register(Ge)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),jp(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!$l){this.update=this.refresh=this.kill=Br;return}n=qv(Xi(n)||tc(n)||n.nodeType?{trigger:n}:n,ju);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,p=s.pinSpacing,v=s.invalidateOnRefresh,g=s.anticipatePin,m=s.onScrubComplete,x=s.onSnapComplete,y=s.once,A=s.snap,S=s.pinReparent,E=s.pinSpacer,T=s.containerAnimation,_=s.fastScrollEnd,M=s.preventOverlaps,C=n.horizontal||n.containerAnimation&&n.horizontal!==!1?ei:vn,R=!f&&f!==0,w=gi(n.scroller||gt),P=Ge.core.getCache(w),F=Ra(w),N=("pinType"in n?n.pinType:$r(w,"pinType")||F&&"fixed")==="fixed",O=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],H=R&&n.toggleActions.split(" "),j="markers"in n?n.markers:ju.markers,G=F?0:parseFloat(sr(w)["border"+C.p2+wo])||0,I=this,te=n.onRefreshInit&&function(){return n.onRefreshInit(I)},ie=Q1(w,F,C),xe=Z1(w,F),ye=0,Ne=0,Q=0,se=jr(w,C),ae,re,he,me,Ae,oe,Ee,Oe,_e,q,z,Ve,Be,Ie,ge,L,b,W,ee,U,k,Y,$,fe,pe,le,ce,Le,Fe,be,et,V,ve,de,Ce,ue,ne,ke,Qe;if(I._startClamp=I._endClamp=!1,I._dir=C,g*=45,I.scroller=w,I.scroll=T?T.time.bind(T):se,me=se(),I.vars=n,r=r||n.animation,"refreshPriority"in n&&(rx=1,n.refreshPriority===-9999&&(cc=I)),P.tweenScroll=P.tweenScroll||{top:ex(w,vn),left:ex(w,ei)},I.tweenTo=ae=P.tweenScroll[C.p],I.scrubDuration=function(De){ve=tc(De)&&De,ve?V?V.duration(De):V=Ge.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ve,paused:!0,onComplete:function(){return m&&m(I)}}):(V&&V.progress(1).kill(),V=0)},r&&(r.vars.lazy=!1,r._initted&&!I.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),I.animation=r.pause(),r.scrollTrigger=I,I.scrubDuration(f),be=0,l||(l=r.vars.id)),A&&((!Ta(A)||A.push)&&(A={snapTo:A}),"scrollBehavior"in Bt.style&&Ge.set(F?[Bt,Yi]:w,{scrollBehavior:"auto"}),pt.forEach(function(De){return ii(De)&&De.target===(F?kt.scrollingElement||Yi:w)&&(De.smooth=!1)}),he=ii(A.snapTo)?A.snapTo:A.snapTo==="labels"?J1(r):A.snapTo==="labelsDirectional"?j1(r):A.directional!==!1?function(De,tt){return cm(A.snapTo)(De,ni()-Ne<500?0:tt.direction)}:Ge.utils.snap(A.snapTo),de=A.duration||{min:.1,max:2},de=Ta(de)?ic(de.min,de.max):ic(de,de),Ce=Ge.delayedCall(A.delay||ve/2||.1,function(){var De=se(),tt=ni()-Ne<500,Ze=ae.tween;if((tt||Math.abs(I.getVelocity())<10)&&!Ze&&!hh&&ye!==De){var nt=(De-oe)/Ie,dn=r&&!R?r.totalProgress():nt,at=tt?0:(dn-et)/(ni()-jl)*1e3||0,Jt=Ge.utils.clamp(-nt,1-nt,yo(at/2)*at/.185),Tn=nt+(A.inertia===!1?0:Jt),jt,Ot,It=A,Qn=It.onStart,Zt=It.onInterrupt,Zn=It.onComplete;if(jt=he(Tn,I),tc(jt)||(jt=Tn),Ot=Math.max(0,Math.round(oe+jt*Ie)),De<=Ee&&De>=oe&&Ot!==De){if(Ze&&!Ze._initted&&Ze.data<=yo(Ot-De))return;A.inertia===!1&&(Jt=jt-nt),ae(Ot,{duration:de(yo(Math.max(yo(Tn-dn),yo(jt-dn))*.185/at/.05||0)),ease:A.ease||"power3",data:yo(Ot-De),onInterrupt:function(){return Ce.restart(!0)&&Zt&&_o(I,Zt)},onComplete:function(){I.update(),ye=se(),r&&!R&&(V?V.resetTo("totalProgress",jt,r._tTime/r._tDur):r.progress(jt)),be=et=r&&!R?r.totalProgress():I.progress,x&&x(I),Zn&&_o(I,Zn)}},De,Jt*Ie,Ot-De-Jt*Ie),Qn&&_o(I,Qn,ae.tween)}}else I.isActive&&ye!==De&&Ce.restart(!0)}).pause()),l&&(em[l]=I),h=I.trigger=gi(h||d!==!0&&d),Qe=h&&h._gsap&&h._gsap.stRevert,Qe&&(Qe=Qe(I)),d=d===!0?h:gi(d),Xi(o)&&(o={targets:h,className:o}),d&&(p===!1||p===rr||(p=!p&&d.parentNode&&d.parentNode.style&&sr(d.parentNode).display==="flex"?!1:xn),I.pin=d,re=Ge.core.getCache(d),re.spacer?ge=re.pinState:(E&&(E=gi(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),re.spacerIsNative=!!E,E&&(re.spacerState=eh(E))),re.spacer=W=E||kt.createElement("div"),W.classList.add("pin-spacer"),l&&W.classList.add("pin-spacer-"+l),re.pinState=ge=eh(d)),n.force3D!==!1&&Ge.set(d,{force3D:!0}),I.spacer=W=re.spacer,Fe=sr(d),fe=Fe[p+C.os2],U=Ge.getProperty(d),k=Ge.quickSetter(d,C.a,Cn),Qp(d,W,Fe),b=eh(d)),j){Ve=Ta(j)?qv(j,Qv):Qv,q=$u("scroller-start",l,w,C,Ve,0),z=$u("scroller-end",l,w,C,Ve,0,q),ee=q["offset"+C.op.d2];var Tt=gi($r(w,"content")||w);Oe=this.markerStart=$u("start",l,Tt,C,Ve,ee,0,T),_e=this.markerEnd=$u("end",l,Tt,C,Ve,ee,0,T),T&&(ke=Ge.quickSetter([Oe,_e],C.a,Cn)),!N&&!(xr.length&&$r(w,"fixedMarkers")===!0)&&(K1(F?Bt:w),Ge.set([q,z],{force3D:!0}),le=Ge.quickSetter(q,C.a,Cn),Le=Ge.quickSetter(z,C.a,Cn))}if(T){var Ue=T.vars.onUpdate,We=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){I.update(0,0,1),Ue&&Ue.apply(T,We||[])})}if(I.previous=function(){return mt[mt.indexOf(I)-1]},I.next=function(){return mt[mt.indexOf(I)+1]},I.revert=function(De,tt){if(!tt)return I.kill(!0);var Ze=De!==!1||!I.enabled,nt=ti;Ze!==I.isReverted&&(Ze&&(ue=Math.max(se(),I.scroll.rec||0),Q=I.progress,ne=r&&r.progress()),Oe&&[Oe,_e,q,z].forEach(function(dn){return dn.style.display=Ze?"none":"block"}),Ze&&(ti=I,I.update(Ze)),d&&(!S||!I.isActive)&&(Ze?tM(d,W,ge):Qp(d,W,sr(d),pe)),Ze||I.update(Ze),ti=nt,I.isReverted=Ze)},I.refresh=function(De,tt,Ze,nt){if(!((ti||!I.enabled)&&!tt)){if(d&&De&&ar){Ln(i,"scrollEnd",mx);return}!_i&&te&&te(I),ti=I,ae.tween&&!Ze&&(ae.tween.kill(),ae.tween=0),V&&V.pause(),v&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(ze){return ze.vars.immediateRender&&ze.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),I.isReverted||I.revert(!0,!0),I._subPinOffset=!1;var dn=ie(),at=xe(),Jt=T?T.duration():Ur(w,C),Tn=Ie<=.01||!Ie,jt=0,Ot=nt||0,It=Ta(Ze)?Ze.end:n.end,Qn=n.endTrigger||h,Zt=Ta(Ze)?Ze.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),Zn=I.pinnedContainer=n.pinnedContainer&&gi(n.pinnedContainer,I),er=h&&Math.max(0,mt.indexOf(I))||0,En=er,wn,In,Xr,no,D,X,J,K,Z,Me,Re,Te,He;for(j&&Ta(Ze)&&(Te=Ge.getProperty(q,C.p),He=Ge.getProperty(z,C.p));En-- >0;)X=mt[En],X.end||X.refresh(0,1)||(ti=I),J=X.pin,J&&(J===h||J===d||J===Zn)&&!X.isReverted&&(Me||(Me=[]),Me.unshift(X),X.revert(!0,!0)),X!==mt[En]&&(er--,En--);for(ii(Zt)&&(Zt=Zt(I)),Zt=Vv(Zt,"start",I),oe=jv(Zt,h,dn,C,se(),Oe,q,I,at,G,N,Jt,T,I._startClamp&&"_startClamp")||(d?-.001:0),ii(It)&&(It=It(I)),Xi(It)&&!It.indexOf("+=")&&(~It.indexOf(" ")?It=(Xi(Zt)?Zt.split(" ")[0]:"")+It:(jt=ih(It.substr(2),dn),It=Xi(Zt)?Zt:(T?Ge.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,oe):oe)+jt,Qn=h)),It=Vv(It,"end",I),Ee=Math.max(oe,jv(It||(Qn?"100% 0":Jt),Qn,dn,C,se()+jt,_e,z,I,at,G,N,Jt,T,I._endClamp&&"_endClamp"))||-.001,jt=0,En=er;En--;)X=mt[En]||{},J=X.pin,J&&X.start-X._pinPush<=oe&&!T&&X.end>0&&(wn=X.end-(I._startClamp?Math.max(0,X.start):X.start),(J===h&&X.start-X._pinPush<oe||J===Zn)&&isNaN(Zt)&&(jt+=wn*(1-X.progress)),J===d&&(Ot+=wn));if(oe+=jt,Ee+=jt,I._startClamp&&(I._startClamp+=jt),I._endClamp&&!_i&&(I._endClamp=Ee||-.001,Ee=Math.min(Ee,Ur(w,C))),Ie=Ee-oe||(oe-=.01)&&.001,Tn&&(Q=Ge.utils.clamp(0,1,Ge.utils.normalize(oe,Ee,ue))),I._pinPush=Ot,Oe&&jt&&(wn={},wn[C.a]="+="+jt,Zn&&(wn[C.p]="-="+se()),Ge.set([Oe,_e],wn)),d&&!($p&&I.end>=Ur(w,C)))wn=sr(d),no=C===vn,Xr=se(),Y=parseFloat(U(C.a))+Ot,!Jt&&Ee>1&&(Re=(F?kt.scrollingElement||Yi:w).style,Re={style:Re,value:Re["overflow"+C.a.toUpperCase()]},F&&sr(Bt)["overflow"+C.a.toUpperCase()]!=="scroll"&&(Re.style["overflow"+C.a.toUpperCase()]="scroll")),Qp(d,W,wn),b=eh(d),In=es(d,!0),K=N&&jr(w,no?ei:vn)(),p?(pe=[p+C.os2,Ie+Ot+Cn],pe.t=W,En=p===xn?ch(d,C)+Ie+Ot:0,En&&(pe.push(C.d,En+Cn),W.style.flexBasis!=="auto"&&(W.style.flexBasis=En+Cn)),Eo(pe),Zn&&mt.forEach(function(ze){ze.pin===Zn&&ze.vars.pinSpacing!==!1&&(ze._subPinOffset=!0)}),N&&se(ue)):(En=ch(d,C),En&&W.style.flexBasis!=="auto"&&(W.style.flexBasis=En+Cn)),N&&(D={top:In.top+(no?Xr-oe:K)+Cn,left:In.left+(no?K:Xr-oe)+Cn,boxSizing:"border-box",position:"fixed"},D[wa]=D["max"+wo]=Math.ceil(In.width)+Cn,D[ba]=D["max"+lm]=Math.ceil(In.height)+Cn,D[rr]=D[rr+oc]=D[rr+sc]=D[rr+lc]=D[rr+ac]="0",D[xn]=wn[xn],D[xn+oc]=wn[xn+oc],D[xn+sc]=wn[xn+sc],D[xn+lc]=wn[xn+lc],D[xn+ac]=wn[xn+ac],L=iM(ge,D,S),_i&&se(0)),r?(Z=r._initted,Wp(1),r.render(r.duration(),!0,!0),$=U(C.a)-Y+Ie+Ot,ce=Math.abs(Ie-$)>1,N&&ce&&L.splice(L.length-2,2),r.render(0,!0,!0),Z||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),Wp(0)):$=Ie,Re&&(Re.value?Re.style["overflow"+C.a.toUpperCase()]=Re.value:Re.style.removeProperty("overflow-"+C.a));else if(h&&se()&&!T)for(In=h.parentNode;In&&In!==Bt;)In._pinOffset&&(oe-=In._pinOffset,Ee-=In._pinOffset),In=In.parentNode;Me&&Me.forEach(function(ze){return ze.revert(!1,!0)}),I.start=oe,I.end=Ee,me=Ae=_i?ue:se(),!T&&!_i&&(me<ue&&se(ue),I.scroll.rec=0),I.revert(!1,!0),Ne=ni(),Ce&&(ye=-1,Ce.restart(!0)),ti=0,r&&R&&(r._initted||ne)&&r.progress()!==ne&&r.progress(ne||0,!0).render(r.time(),!0,!0),(Tn||Q!==I.progress||T||v||r&&!r._initted)&&(r&&!R&&(r._initted||Q||r.vars.immediateRender!==!1)&&r.totalProgress(T&&oe<-.001&&!Q?Ge.utils.normalize(oe,Ee,0):Q,!0),I.progress=Tn||(me-oe)/Ie===Q?0:Q),d&&p&&(W._pinOffset=Math.round(I.progress*$)),V&&V.invalidate(),isNaN(Te)||(Te-=Ge.getProperty(q,C.p),He-=Ge.getProperty(z,C.p),th(q,C,Te),th(Oe,C,Te-(nt||0)),th(z,C,He),th(_e,C,He-(nt||0))),Tn&&!_i&&I.update(),u&&!_i&&!Be&&(Be=!0,u(I),Be=!1)}},I.getVelocity=function(){return(se()-Ae)/(ni()-jl)*1e3||0},I.endAnimation=function(){Jl(I.callbackAnimation),r&&(V?V.progress(1):r.paused()?R||Jl(r,I.direction<0,1):Jl(r,r.reversed()))},I.labelToScroll=function(De){return r&&r.labels&&(oe||I.refresh()||oe)+r.labels[De]/r.duration()*Ie||0},I.getTrailing=function(De){var tt=mt.indexOf(I),Ze=I.direction>0?mt.slice(0,tt).reverse():mt.slice(tt+1);return(Xi(De)?Ze.filter(function(nt){return nt.vars.preventOverlaps===De}):Ze).filter(function(nt){return I.direction>0?nt.end<=oe:nt.start>=Ee})},I.update=function(De,tt,Ze){if(!(T&&!Ze&&!De)){var nt=_i===!0?ue:I.scroll(),dn=De?0:(nt-oe)/Ie,at=dn<0?0:dn>1?1:dn||0,Jt=I.progress,Tn,jt,Ot,It,Qn,Zt,Zn,er;if(tt&&(Ae=me,me=T?se():nt,A&&(et=be,be=r&&!R?r.totalProgress():at)),g&&d&&!ti&&!Qu&&ar&&(!at&&oe<nt+(nt-Ae)/(ni()-jl)*g?at=1e-4:at===1&&Ee>nt+(nt-Ae)/(ni()-jl)*g&&(at=.9999)),at!==Jt&&I.enabled){if(Tn=I.isActive=!!at&&at<1,jt=!!Jt&&Jt<1,Zt=Tn!==jt,Qn=Zt||!!at!=!!Jt,I.direction=at>Jt?1:-1,I.progress=at,Qn&&!ti&&(Ot=at&&!Jt?0:at===1?1:Jt===1?2:3,R&&(It=!Zt&&H[Ot+1]!=="none"&&H[Ot+1]||H[Ot],er=r&&(It==="complete"||It==="reset"||It in r))),M&&(Zt||er)&&(er||f||!r)&&(ii(M)?M(I):I.getTrailing(M).forEach(function(Xr){return Xr.endAnimation()})),R||(V&&!ti&&!Qu?(V._dp._time-V._start!==V._time&&V.render(V._dp._time-V._start),V.resetTo?V.resetTo("totalProgress",at,r._tTime/r._tDur):(V.vars.totalProgress=at,V.invalidate().restart())):r&&r.totalProgress(at,!!(ti&&(Ne||De)))),d){if(De&&p&&(W.style[p+C.os2]=fe),!N)k(ec(Y+$*at));else if(Qn){if(Zn=!De&&at>Jt&&Ee+1>nt&&nt+1>=Ur(w,C),S)if(!De&&(Tn||Zn)){var En=es(d,!0),wn=nt-oe;$v(d,Bt,En.top+(C===vn?wn:0)+Cn,En.left+(C===vn?0:wn)+Cn)}else $v(d,W);Eo(Tn||Zn?L:b),ce&&at<1&&Tn||k(Y+(at===1&&!Zn?$:0))}}A&&!ae.tween&&!ti&&!Qu&&Ce.restart(!0),o&&(Zt||y&&at&&(at<1||!Xp))&&uc(o.targets).forEach(function(Xr){return Xr.classList[Tn||y?"add":"remove"](o.className)}),a&&!R&&!De&&a(I),Qn&&!ti?(R&&(er&&(It==="complete"?r.pause().totalProgress(1):It==="reset"?r.restart(!0).pause():It==="restart"?r.restart(!0):r[It]()),a&&a(I)),(Zt||!Xp)&&(c&&Zt&&_o(I,c),O[Ot]&&_o(I,O[Ot]),y&&(at===1?I.kill(!1,1):O[Ot]=0),Zt||(Ot=at===1?1:3,O[Ot]&&_o(I,O[Ot]))),_&&!Tn&&Math.abs(I.getVelocity())>(tc(_)?_:2500)&&(Jl(I.callbackAnimation),V?V.progress(1):Jl(r,It==="reverse"?1:!at,1))):R&&a&&!ti&&a(I)}if(Le){var In=T?nt/T.duration()*(T._caScrollDist||0):nt;le(In+(q._isFlipped?1:0)),Le(In)}ke&&ke(-nt/T.duration()*(T._caScrollDist||0))}},I.enable=function(De,tt){I.enabled||(I.enabled=!0,Ln(w,"resize",nc),F||Ln(w,"scroll",Ao),te&&Ln(i,"refreshInit",te),De!==!1&&(I.progress=Q=0,me=Ae=ye=se()),tt!==!1&&I.refresh())},I.getTween=function(De){return De&&ae?ae.tween:V},I.setPositions=function(De,tt,Ze,nt){if(T){var dn=T.scrollTrigger,at=T.duration(),Jt=dn.end-dn.start;De=dn.start+Jt*De/at,tt=dn.start+Jt*tt/at}I.refresh(!1,!1,{start:Wv(De,Ze&&!!I._startClamp),end:Wv(tt,Ze&&!!I._endClamp)},nt),I.update()},I.adjustPinSpacing=function(De){if(pe&&De){var tt=pe.indexOf(C.d)+1;pe[tt]=parseFloat(pe[tt])+De+Cn,pe[1]=parseFloat(pe[1])+De+Cn,Eo(pe)}},I.disable=function(De,tt){if(De!==!1&&I.revert(!0,!0),I.enabled&&(I.enabled=I.isActive=!1,tt||V&&V.pause(),ue=0,re&&(re.uncache=1),te&&Un(i,"refreshInit",te),Ce&&(Ce.pause(),ae.tween&&ae.tween.kill()&&(ae.tween=0)),!F)){for(var Ze=mt.length;Ze--;)if(mt[Ze].scroller===w&&mt[Ze]!==I)return;Un(w,"resize",nc),F||Un(w,"scroll",Ao)}},I.kill=function(De,tt){I.disable(De,tt),V&&!tt&&V.kill(),l&&delete em[l];var Ze=mt.indexOf(I);Ze>=0&&mt.splice(Ze,1),Ze===xi&&sh>0&&xi--,Ze=0,mt.forEach(function(nt){return nt.scroller===I.scroller&&(Ze=1)}),Ze||_i||(I.scroll.rec=0),r&&(r.scrollTrigger=null,De&&r.revert({kill:!1}),tt||r.kill()),Oe&&[Oe,_e,q,z].forEach(function(nt){return nt.parentNode&&nt.parentNode.removeChild(nt)}),cc===I&&(cc=0),d&&(re&&(re.uncache=1),Ze=0,mt.forEach(function(nt){return nt.pin===d&&Ze++}),Ze||(re.spacer=0)),n.onKill&&n.onKill(I)},mt.push(I),I.enable(!1,!1),Qe&&Qe(I),r&&r.add&&!Ie){var ct=I.update;I.update=function(){I.update=ct,pt.cache++,oe||Ee||I.refresh()},Ge.delayedCall(.01,I.update),Ie=.01,oe=Ee=0}else I.refresh();d&&eM()},i.register=function(n){return So||(Ge=n||cx(),lx()&&window.document&&i.enable(),So=$l),So},i.defaults=function(n){if(n)for(var r in n)ju[r]=n[r];return ju},i.disable=function(n,r){$l=0,mt.forEach(function(a){return a[r?"kill":"disable"](n)}),Un(gt,"wheel",Ao),Un(kt,"scroll",Ao),clearInterval(qu),Un(kt,"touchcancel",Br),Un(Bt,"touchstart",Br),Ku(Un,kt,"pointerdown,touchstart,mousedown",Xv),Ku(Un,kt,"pointerup,touchend,mouseup",Yv),lh.kill(),Zu(Un);for(var s=0;s<pt.length;s+=3)Ju(Un,pt[s],pt[s+1]),Ju(Un,pt[s],pt[s+2])},i.enable=function(){if(gt=window,kt=document,Yi=kt.documentElement,Bt=kt.body,Ge){if(uc=Ge.utils.toArray,ic=Ge.utils.clamp,jp=Ge.core.context||Br,Wp=Ge.core.suppressOverwrites||Br,rm=gt.history.scrollRestoration||"auto",tm=gt.pageYOffset||0,Ge.core.globals("ScrollTrigger",i),Bt){$l=1,To=document.createElement("div"),To.style.height="100vh",To.style.position="absolute",_x(),q1(),hn.register(Ge),i.isTouch=hn.isTouch,Is=hn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Jp=hn.isTouch===1,Ln(gt,"wheel",Ao),im=[gt,kt,Yi,Bt],Ge.matchMedia?(i.matchMedia=function(u){var f=Ge.matchMedia(),h;for(h in u)f.add(h,u[h]);return f},Ge.addEventListener("matchMediaInit",function(){vx(),um()}),Ge.addEventListener("matchMediaRevert",function(){return gx()}),Ge.addEventListener("matchMedia",function(){Ea(0,1),Pa("matchMedia")}),Ge.matchMedia().add("(orientation: portrait)",function(){return qp(),qp})):console.warn("Requires GSAP 3.11.0 or later"),qp(),Ln(kt,"scroll",Ao);var n=Bt.hasAttribute("style"),r=Bt.style,s=r.borderTopStyle,a=Ge.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",o=es(Bt),vn.m=Math.round(o.top+vn.sc())||0,ei.m=Math.round(o.left+ei.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(Bt.setAttribute("style",""),Bt.removeAttribute("style")),qu=setInterval(Zv,250),Ge.delayedCall(.5,function(){return Qu=0}),Ln(kt,"touchcancel",Br),Ln(Bt,"touchstart",Br),Ku(Ln,kt,"pointerdown,touchstart,mousedown",Xv),Ku(Ln,kt,"pointerup,touchend,mouseup",Yv),Kp=Ge.utils.checkPrefix("transform"),ah.push(Kp),So=ni(),lh=Ge.delayedCall(.2,Ea).pause(),Mo=[kt,"visibilitychange",function(){var u=gt.innerWidth,f=gt.innerHeight;kt.hidden?(Hv=u,Gv=f):(Hv!==u||Gv!==f)&&nc()},kt,"DOMContentLoaded",Ea,gt,"load",Ea,gt,"resize",nc],Zu(Ln),mt.forEach(function(u){return u.enable(0,1)}),l=0;l<pt.length;l+=3)Ju(Un,pt[l],pt[l+1]),Ju(Un,pt[l],pt[l+2])}else if(kt){var c=function u(){i.enable(),kt.removeEventListener("DOMContentLoaded",u)};kt.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(Xp=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(qu)||(qu=r)&&setInterval(Zv,r),"ignoreMobileResize"in n&&(Jp=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Zu(Un)||Zu(Ln,n.autoRefreshEvents||"none"),sx=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=gi(n),a=pt.indexOf(s),o=Ra(s);~a&&pt.splice(a,o?6:2),r&&(o?xr.unshift(gt,r,Bt,r,Yi,r):xr.unshift(s,r))},i.clearMatchMedia=function(n){mt.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var a=(Xi(n)?gi(n):n).getBoundingClientRect(),o=a[s?wa:ba]*r||0;return s?a.right-o>0&&a.left+o<gt.innerWidth:a.bottom-o>0&&a.top+o<gt.innerHeight},i.positionInViewport=function(n,r,s){Xi(n)&&(n=gi(n));var a=n.getBoundingClientRect(),o=a[s?wa:ba],l=r==null?o/2:r in uh?uh[r]*o:~r.indexOf("%")?parseFloat(r)*o/100:parseFloat(r)||0;return s?(a.left+l)/gt.innerWidth:(a.top+l)/gt.innerHeight},i.killAll=function(n){if(mt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Da.killAll||[];Da={},r.forEach(function(s){return s()})}},i}();ot.version="3.15.0";ot.saveStyles=function(i){return i?uc(i).forEach(function(e){if(e&&e.style){var t=Wi.indexOf(e);t>=0&&Wi.splice(t,5),Wi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ge.core.getCache(e),jp())}}):Wi};ot.revert=function(i,e){return um(!i,e)};ot.create=function(i,e){return new ot(i,e)};ot.refresh=function(i){return i?nc(!0):(So||ot.register())&&Ea(!0)};ot.update=function(i){return++pt.cache&&ts(i===!0?2:0)};ot.clearScrollMemory=xx;ot.maxScroll=function(i,e){return Ur(i,e?ei:vn)};ot.getScrollFunc=function(i,e){return jr(gi(i),e?ei:vn)};ot.getById=function(i){return em[i]};ot.getAll=function(){return mt.filter(function(i){return i.vars.id!=="ScrollSmoother"})};ot.isScrolling=function(){return!!ar};ot.snapDirectional=cm;ot.addEventListener=function(i,e){var t=Da[i]||(Da[i]=[]);~t.indexOf(e)||t.push(e)};ot.removeEventListener=function(i,e){var t=Da[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ot.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var f=[],h=[],d=Ge.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(p){f.length||d.restart(!0),f.push(p.trigger),h.push(p),s<=f.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&ii(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return ii(s)&&(s=s(),Ln(ot,"refresh",function(){return s=e.batchMax()})),uc(i).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(ot.create(c))}),t};var tx=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Zp=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(hn.isTouch?" pinch-zoom":""):"none",e===Yi&&i(Bt,t)},nh={auto:1,scroll:1},sM=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Ge.core.getCache(s),o=ni(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==Bt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(nh[(l=sr(s)).overflowY]||nh[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Ra(s)&&(nh[(l=sr(s)).overflowY]||nh[l.overflowX]),a._isScrollT=o}(a._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Ax=function(e,t,n,r){return hn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&sM,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&Ln(kt,hn.eventTypes[0],ix,!1,!0)},onDisable:function(){return Un(kt,hn.eventTypes[0],ix,!0)}})},aM=/(input|label|select|textarea)/i,nx,ix=function(e){var t=aM.test(e.target.tagName);(t||nx)&&(e._gsapAllow=!0,nx=t)},oM=function(e){Ta(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=gi(e.target)||Yi,u=Ge.core.globals().ScrollSmoother,f=u&&u.get(),h=Is&&(e.content&&gi(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=jr(c,vn),p=jr(c,ei),v=1,g=(hn.isTouch&&gt.visualViewport?gt.visualViewport.scale*gt.visualViewport.width:gt.outerWidth)/gt.innerWidth,m=0,x=ii(r)?function(){return r(o)}:function(){return r||2.8},y,A,S=Ax(c,e.type,!0,s),E=function(){return A=!1},T=Br,_=Br,M=function(){l=Ur(c,vn),_=ic(Is?1:0,l),n&&(T=ic(0,Ur(c,ei))),y=Ca},C=function(){h._gsap.y=ec(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},R=function(){if(A){requestAnimationFrame(E);var j=ec(o.deltaY/2),G=_(d.v-j);if(h&&G!==d.v+d.offset){d.offset=G-d.v;var I=ec((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+I+", 0, 1)",h._gsap.y=I+"px",d.cacheID=pt.cache,ts()}return!0}d.offset&&C(),A=!0},w,P,F,N,O=function(){M(),w.isActive()&&w.vars.scrollY>l&&(d()>l?w.progress(1)&&d(l):w.resetTo("scrollY",l))};return h&&Ge.set(h,{y:"+=0"}),e.ignoreCheck=function(H){return Is&&H.type==="touchmove"&&R(H)||v>1.05&&H.type!=="touchstart"||o.isGesturing||H.touches&&H.touches.length>1},e.onPress=function(){A=!1;var H=v;v=ec((gt.visualViewport&&gt.visualViewport.scale||1)/g),w.pause(),H!==v&&Zp(c,v>1.01?!0:n?!1:"x"),P=p(),F=d(),M(),y=Ca},e.onRelease=e.onGestureStart=function(H,j){if(d.offset&&C(),!j)N.restart(!0);else{pt.cache++;var G=x(),I,te;n&&(I=p(),te=I+G*.05*-H.velocityX/.227,G*=tx(p,I,te,Ur(c,ei)),w.vars.scrollX=T(te)),I=d(),te=I+G*.05*-H.velocityY/.227,G*=tx(d,I,te,Ur(c,vn)),w.vars.scrollY=_(te),w.invalidate().duration(G).play(.01),(Is&&w.vars.scrollY>=l||I>=l-1)&&Ge.to({},{onUpdate:O,duration:G})}a&&a(H)},e.onWheel=function(){w._ts&&w.pause(),ni()-m>1e3&&(y=0,m=ni())},e.onChange=function(H,j,G,I,te){if(Ca!==y&&M(),j&&n&&p(T(I[2]===j?P+(H.startX-H.x):p()+j-I[1])),G){d.offset&&C();var ie=te[2]===G,xe=ie?F+H.startY-H.y:d()+G-te[1],ye=_(xe);ie&&xe!==ye&&(F+=ye-xe),d(ye)}(G||j)&&ts()},e.onEnable=function(){Zp(c,n?!1:"x"),ot.addEventListener("refresh",O),Ln(gt,"resize",O),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=p.smooth=!1),S.enable()},e.onDisable=function(){Zp(c,!0),Un(gt,"resize",O),ot.removeEventListener("refresh",O),S.kill()},e.lockAxis=e.lockAxis!==!1,o=new hn(e),o.iOS=Is,Is&&!d()&&d(1),Is&&Ge.ticker.add(Br),N=o._dc,w=Ge.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:yx(d,d(),function(){return w.pause()})},onUpdate:ts,onComplete:N.vars.onComplete}),o};ot.sort=function(i){if(ii(i))return mt.sort(i);var e=gt.pageYOffset||0;return ot.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+gt.innerHeight}),mt.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ot.observe=function(i){return new hn(i)};ot.normalizeScroll=function(i){if(typeof i>"u")return vi;if(i===!0&&vi)return vi.enable();if(i===!1){vi&&vi.kill(),vi=i;return}var e=i instanceof hn?i:oM(i);return vi&&vi.target===e.target&&vi.kill(),Ra(e.target)&&(vi=e),e};ot.core={_getVelocityProp:Yu,_inputObserver:Ax,_scrollers:pt,_proxies:xr,bridge:{ss:function(){ar||Pa("scrollStart"),ar=ni()},ref:function(){return ti}}};cx()&&Ge.registerPlugin(ot);var fc,dc,Sx=typeof Symbol=="function"?Symbol():"_split",fm,lM=()=>fm||dh.register(window.gsap),Mx=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter:0,pc=i=>i?typeof i=="string"?pc(document.querySelectorAll(i)):"length"in i?Array.from(i).reduce((e,t)=>(typeof t=="string"?e.push(...pc(t)):e.push(t),e),[]):[i]:[],Tx=i=>pc(i).filter(e=>e&&e.nodeType===1),dm=[],hm=function(){},cM={add:i=>i()},uM=/\s+/g,Ex=new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.","gu"),fh={left:0,top:0,width:0,height:0},hM=(i,e)=>{for(;++e<i.length&&i[e]===fh;);return i[e]||fh},wx=({element:i,html:e,ariaL:t,ariaH:n})=>{i.innerHTML=e,t?i.setAttribute("aria-label",t):i.removeAttribute("aria-label"),n?i.setAttribute("aria-hidden",n):i.removeAttribute("aria-hidden")},bx=(i,e)=>{if(e){let t=new Set(i.join("").match(e)||dm),n=i.length,r,s,a,o;if(t.size)for(;--n>-1;){s=i[n];for(a of t)if(a.startsWith(s)&&a.length>s.length){for(r=0,o=s;a.startsWith(o+=i[n+ ++r])&&o.length<a.length;);if(r&&o.length===a.length){i[n]=a,i.splice(n+1,r);break}}}}return i},Cx=i=>window.getComputedStyle(i).display==="inline"&&(i.style.display="inline-block"),bo=(i,e,t)=>e.insertBefore(typeof i=="string"?document.createTextNode(i):i,t),pm=(i,e,t)=>{let n=e[i+"sClass"]||"",{tag:r="div",aria:s="auto",propIndex:a=!1}=e,o=i==="line"?"block":"inline-block",l=n.indexOf("++")>-1,c=u=>{let f=document.createElement(r),h=t.length+1;return n&&(f.className=n+(l?" "+n+h:"")),a&&f.style.setProperty("--"+i,h+""),s!=="none"&&f.setAttribute("aria-hidden","true"),r!=="span"&&(f.style.position="relative",f.style.display=o),f.textContent=u,t.push(f),f};return l&&(n=n.replace("++","")),c.collection=t,c},fM=(i,e,t,n)=>{let r=pm("line",t,n),s=window.getComputedStyle(i).textAlign||"left";return(a,o)=>{let l=r("");for(l.style.textAlign=s,i.insertBefore(l,e[a]);a<o;a++)l.appendChild(e[a]);l.normalize()}},Rx=(i,e,t,n,r,s,a,o,l,c)=>{var u;let f=Array.from(i.childNodes),h=0,{wordDelimiter:d,reduceWhiteSpace:p=!0,prepareText:v}=e,g=i.getBoundingClientRect(),m=g,x=!p&&window.getComputedStyle(i).whiteSpace.substring(0,3)==="pre",y=0,A=t.collection,S,E,T,_,M,C,R,w,P,F,N,O,H,j,G,I,te,ie;for(typeof d=="object"?(T=d.delimiter||d,E=d.replaceWith||""):E=d===""?"":d||" ",S=E!==" ";h<f.length;h++)if(_=f[h],_.nodeType===3){for(G=_.textContent||"",p?G=G.replace(uM," "):x&&(G=G.replace(/\n/g,E+`
`)),v&&(G=v(G,i)),_.textContent=G,M=E||T?G.split(T||E):G.match(o)||dm,te=M[M.length-1],w=S?te.slice(-1)===" ":!te,te||M.pop(),m=g,R=S?M[0].charAt(0)===" ":!M[0],R&&bo(" ",i,_),M[0]||M.shift(),bx(M,l),s&&c||(_.textContent=""),P=1;P<=M.length;P++)if(I=M[P-1],!p&&x&&I.charAt(0)===`
`&&((u=_.previousSibling)==null||u.remove(),bo(document.createElement("br"),i,_),I=I.slice(1)),!p&&I==="")bo(E,i,_);else if(I===" ")i.insertBefore(document.createTextNode(" "),_);else{if(S&&I.charAt(0)===" "&&bo(" ",i,_),y&&P===1&&!R&&A.indexOf(y.parentNode)>-1?(C=A[A.length-1],C.appendChild(document.createTextNode(n?"":I))):(C=t(n?"":I),bo(C,i,_),y&&P===1&&!R&&C.insertBefore(y,C.firstChild)),n)for(N=Mx?bx([...Mx.segment(I)].map(xe=>xe.segment),l):I.match(o)||dm,ie=0;ie<N.length;ie++)C.appendChild(N[ie]===" "?document.createTextNode(" "):n(N[ie]));if(s&&c){if(G=_.textContent=G.substring(I.length+1,G.length),F=C.getBoundingClientRect(),F.top>m.top&&F.left<=m.left){for(O=i.cloneNode(),H=i.childNodes[0];H&&H!==C;)j=H,H=H.nextSibling,O.appendChild(j);i.parentNode.insertBefore(O,i),r&&Cx(O)}m=F}(P<M.length||w)&&bo(P>=M.length?" ":S&&I.slice(-1)===" "?" "+E:E,i,_)}i.removeChild(_),y=0}else _.nodeType===1&&(a&&a.indexOf(_)>-1?(A.indexOf(_.previousSibling)>-1&&A[A.length-1].appendChild(_),y=_):(Rx(_,e,t,n,r,s,a,o,l,!0),y=0),r&&Cx(_))},Dx=class Px{constructor(e,t){this.isSplit=!1,lM(),this.elements=Tx(e),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=t,this.elements.forEach(a=>{var o;t.overwrite!==!1&&((o=a[Sx])==null||o._data.orig.filter(({element:l})=>l===a).forEach(wx)),a[Sx]=this}),this._split=()=>this.isSplit&&this.split(this.vars);let n=[],r,s=()=>{let a=n.length,o;for(;a--;){o=n[a];let l=o.element.offsetWidth;if(l!==o.width){o.width=l,this._split();return}}};this._data={orig:n,obs:typeof ResizeObserver<"u"&&new ResizeObserver(()=>{clearTimeout(r),r=setTimeout(s,200)})},hm(this),this.split(t)}split(e){return(this._ctx||cM).add(()=>{this.isSplit&&this.revert(),this.vars=e=e||this.vars||{};let{type:t="chars,words,lines",aria:n="auto",deepSlice:r=!0,smartWrap:s,onSplit:a,autoSplit:o=!1,specialChars:l,mask:c}=this.vars,u=t.indexOf("lines")>-1,f=t.indexOf("chars")>-1,h=t.indexOf("words")>-1,d=f&&!h&&!u,p=l&&("push"in l?new RegExp("(?:"+l.join("|")+")","gu"):l),v=p?new RegExp(p.source+"|"+Ex.source,"gu"):Ex,g=!!e.ignore&&Tx(e.ignore),{orig:m,animTime:x,obs:y}=this._data,A;(f||h||u)&&(this.elements.forEach((S,E)=>{m[E]={element:S,html:S.innerHTML,ariaL:S.getAttribute("aria-label"),ariaH:S.getAttribute("aria-hidden")},n==="auto"?S.setAttribute("aria-label",(S.textContent||"").trim()):n==="hidden"&&S.setAttribute("aria-hidden","true");let T=[],_=[],M=[],C=f?pm("char",e,T):null,R=pm("word",e,_),w,P,F,N;if(Rx(S,e,R,C,d,r&&(u||d),g,v,p,!1),u){let O=pc(S.childNodes),H=fM(S,O,e,M),j,G=[],I=0,te=O.map(ye=>ye.nodeType===1?ye.getBoundingClientRect():fh),ie=fh,xe;for(w=0;w<O.length;w++)j=O[w],j.nodeType===1&&(j.nodeName==="BR"?((!w||O[w-1].nodeName!=="BR")&&(G.push(j),H(I,w+1)),I=w+1,ie=hM(te,w)):(xe=te[w],w&&xe.top>ie.top&&xe.left<ie.left+ie.width-1&&(H(I,w),I=w),ie=xe));I<w&&H(I,w),G.forEach(ye=>{var Ne;return(Ne=ye.parentNode)==null?void 0:Ne.removeChild(ye)})}if(!h){for(w=0;w<_.length;w++)if(P=_[w],f||!P.nextSibling||P.nextSibling.nodeType!==3)if(s&&!u){for(F=document.createElement("span"),F.style.whiteSpace="nowrap";P.firstChild;)F.appendChild(P.firstChild);P.replaceWith(F)}else P.replaceWith(...P.childNodes);else N=P.nextSibling,N&&N.nodeType===3&&(N.textContent=(P.textContent||"")+(N.textContent||""),P.remove());_.length=0,S.normalize()}this.lines.push(...M),this.words.push(..._),this.chars.push(...T)}),c&&this[c]&&this.masks.push(...this[c].map(S=>{let E=S.cloneNode();return S.replaceWith(E),E.appendChild(S),S.className&&(E.className=S.className.trim().split(" ").map(T=>T+"-mask").join(" ")),E.style.overflow="clip",E}))),this.isSplit=!0,dc&&u&&o&&dc.addEventListener("loadingdone",this._split),(A=a&&a(this))&&A.totalTime&&(this._data.anim=x?A.totalTime(x):A),u&&o&&this.elements.forEach((S,E)=>{m[E].width=S.offsetWidth,y&&y.observe(S)})}),this}kill(){let{obs:e}=this._data;e&&e.disconnect(),dc?.removeEventListener("loadingdone",this._split)}revert(){var e,t;if(this.isSplit){let{orig:n,anim:r}=this._data;this.kill(),n.forEach(wx),this.chars.length=this.words.length=this.lines.length=n.length=this.masks.length=0,this.isSplit=!1,r&&(this._data.animTime=r.totalTime(),r.revert()),(t=(e=this.vars).onRevert)==null||t.call(e,this)}return this}static create(e,t){return new Px(e,t)}static register(e){fc=fc||e||window.gsap,fc&&(pc=fc.utils.toArray,hm=fc.core.context||hm),!fm&&window.innerWidth>0&&(dc=document.fonts,fm=!0)}};Dx.version="3.15.0";var dh=Dx;var Xn="183";var i_=0,Qm=1,r_=2;var Zc=1,s_=2,rl=3,ai=0,tn=1,gn=2,Ft=0,Na=1,Vs=2,Zm=3,Km=4,a_=5;var ks=100,o_=101,l_=102,c_=103,u_=104,h_=200,f_=201,d_=202,p_=203,Vh=204,Wh=205,m_=206,g_=207,v_=208,x_=209,__=210,y_=211,A_=212,S_=213,M_=214,Xh=0,Qo=1,Yh=2,Oa=3,qh=4,Qh=5,Zh=6,Kh=7,Jm=0,T_=1,E_=2,Ki=0,jm=1,$m=2,eg=3,tg=4,ng=5,ig=6,rg=7;var sg=300,Ws=301,Va=302,Sf=303,Mf=304,Kc=306,Zo=1e3,Fr=1001,Jh=1002,Ct=1003,w_=1004;var Jc=1005;var Vt=1006,Tf=1007;var Or=1008;var xt=1009,sl=1010,jc=1011,Xs=1012,Ys=1013,An=1014,nn=1015,li=1016,Ef=1017,wf=1018,kr=1020,ag=35902,og=35899,lg=1021,cg=1022,Sn=1023,lr=1026,ur=1027,qs=1028,al=1029,hs=1030,Qs=1031;var Zs=1033,$c=33776,eu=33777,tu=33778,nu=33779,bf=35840,Cf=35841,Rf=35842,Df=35843,Pf=36196,If=37492,Bf=37496,Uf=37488,Lf=37489,Ff=37490,Nf=37491,Of=37808,kf=37809,zf=37810,Hf=37811,Gf=37812,Vf=37813,Wf=37814,Xf=37815,Yf=37816,qf=37817,Qf=37818,Zf=37819,Kf=37820,Jf=37821,jf=36492,$f=36494,ed=36495,td=36283,nd=36284,id=36285,rd=36286;var wc=2300,jh=2301,Gh=2302,Hm=2303,Gm=2400,Vm=2401,Wm=2402;var Mi=3200;var ug=0,b_=1,Ti="",it="srgb",Ui="srgb-linear",bc="linear",Ut="srgb";var Fa=7680;var Xm=519,C_=512,R_=513,D_=514,sd=515,P_=516,I_=517,ad=518,B_=519,$h=35044,Ks=35048;var iu="300 es",Mr=2e3,Cc=2001;function dM(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function pM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Rc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function U_(){let i=Rc("canvas");return i.style.display="block",i}var Ix={},Ko=null;function Dc(...i){let e="THREE."+i.shift();Ko?Ko("log",e,...i):console.log(e,...i)}function L_(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Je(...i){i=L_(i);let e="THREE."+i.shift();if(Ko)Ko("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ke(...i){i=L_(i);let e="THREE."+i.shift();if(Ko)Ko("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Pc(...i){let e=i.join(" ");e in Ix||(Ix[e]=!0,Je(...i))}function F_(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var N_={[Xh]:Qo,[Yh]:Zh,[qh]:Kh,[Oa]:Qh,[Qo]:Xh,[Zh]:Yh,[Kh]:qh,[Qh]:Oa},Ai=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},ri=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bx=1234567,Tc=Math.PI/180,Jo=180/Math.PI;function os(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ri[i&255]+ri[i>>8&255]+ri[i>>16&255]+ri[i>>24&255]+"-"+ri[e&255]+ri[e>>8&255]+"-"+ri[e>>16&15|64]+ri[e>>24&255]+"-"+ri[t&63|128]+ri[t>>8&255]+"-"+ri[t>>16&255]+ri[t>>24&255]+ri[n&255]+ri[n>>8&255]+ri[n>>16&255]+ri[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function hg(i,e){return(i%e+e)%e}function mM(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function gM(i,e,t){return i!==e?(t-i)/(e-i):0}function Ec(i,e,t){return(1-t)*i+t*e}function vM(i,e,t,n){return Ec(i,e,1-Math.exp(-t*n))}function xM(i,e=1){return e-Math.abs(hg(i,e*2)-e)}function _M(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function yM(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function AM(i,e){return i+Math.floor(Math.random()*(e-i+1))}function SM(i,e){return i+Math.random()*(e-i)}function MM(i){return i*(.5-Math.random())}function TM(i){i!==void 0&&(Bx=i);let e=Bx+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function EM(i){return i*Tc}function wM(i){return i*Jo}function bM(i){return(i&i-1)===0&&i!==0}function CM(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function RM(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function DM(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),f=s((e-n)/2),h=a((e-n)/2),d=s((n-e)/2),p=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*u,o*c);break;default:Je("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Sr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ni={DEG2RAD:Tc,RAD2DEG:Jo,generateUUID:os,clamp:st,euclideanModulo:hg,mapLinear:mM,inverseLerp:gM,lerp:Ec,damp:vM,pingpong:xM,smoothstep:_M,smootherstep:yM,randInt:AM,randFloat:SM,randFloatSpread:MM,seededRandom:TM,degToRad:EM,radToDeg:wM,isPowerOfTwo:bM,ceilPowerOfTwo:CM,floorPowerOfTwo:RM,setQuaternionFromProperEuler:DM,normalize:zt,denormalize:Sr},we=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Wn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3],h=s[a+0],d=s[a+1],p=s[a+2],v=s[a+3];if(f!==v||l!==h||c!==d||u!==p){let g=l*h+c*d+u*p+f*v;g<0&&(h=-h,d=-d,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){let x=Math.acos(g),y=Math.sin(x);m=Math.sin(m*x)/y,o=Math.sin(o*x)/y,l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+v*o}else{l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+v*o;let x=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=x,c*=x,u*=x,f*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],h=s[a+1],d=s[a+2],p=s[a+3];return e[t]=o*p+u*f+l*d-c*h,e[t+1]=l*p+u*h+c*f-o*d,e[t+2]=c*p+u*d+o*h-l*f,e[t+3]=u*p-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),h=l(n/2),d=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:Je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ux.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ux.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return mm.copy(this).projectOnVector(e),this.sub(mm)}reflect(e){return this.sub(mm.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},mm=new B,Ux=new Wn,$e=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],p=n[8],v=r[0],g=r[3],m=r[6],x=r[1],y=r[4],A=r[7],S=r[2],E=r[5],T=r[8];return s[0]=a*v+o*x+l*S,s[3]=a*g+o*y+l*E,s[6]=a*m+o*A+l*T,s[1]=c*v+u*x+f*S,s[4]=c*g+u*y+f*E,s[7]=c*m+u*A+f*T,s[2]=h*v+d*x+p*S,s[5]=h*g+d*y+p*E,s[8]=h*m+d*A+p*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,p=t*f+n*h+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return e[0]=f*v,e[1]=(r*c-u*n)*v,e[2]=(o*n-r*a)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(gm.makeScale(e,t)),this}rotate(e){return this.premultiply(gm.makeRotation(-e)),this}translate(e,t){return this.premultiply(gm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},gm=new $e,Lx=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fx=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function PM(){let i={enabled:!0,workingColorSpace:Ui,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ut&&(r.r=ls(r.r),r.g=ls(r.g),r.b=ls(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(r.r=qo(r.r),r.g=qo(r.g),r.b=qo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ti?bc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Pc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Pc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ui]:{primaries:e,whitePoint:n,transfer:bc,toXYZ:Lx,fromXYZ:Fx,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:it},outputColorSpaceConfig:{drawingBufferColorSpace:it}},[it]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:Lx,fromXYZ:Fx,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:it}}}),i}var At=PM();function ls(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Co,ef=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Co===void 0&&(Co=Rc("canvas")),Co.width=e.width,Co.height=e.height;let r=Co.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Co}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Rc("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ls(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ls(t[n]/255)*255):t[n]=ls(t[n]);return{data:t,width:e.width,height:e.height}}else return Je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},IM=0,jo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:IM++}),this.uuid=os(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(vm(r[a].image)):s.push(vm(r[a]))}else s=vm(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function vm(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ef.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Je("Texture: Unable to serialize Texture."),{})}var BM=0,xm=new B,Rn=class i extends Ai{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Fr,r=Fr,s=Vt,a=Or,o=Sn,l=xt,c=i.DEFAULT_ANISOTROPY,u=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BM++}),this.uuid=os(),this.name="",this.source=new jo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(xm).x}get height(){return this.source.getSize(xm).y}get depth(){return this.source.getSize(xm).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Je(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zo:e.x=e.x-Math.floor(e.x);break;case Fr:e.x=e.x<0?0:1;break;case Jh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zo:e.y=e.y-Math.floor(e.y);break;case Fr:e.y=e.y<0?0:1;break;case Jh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=sg;Rn.DEFAULT_ANISOTROPY=1;var St=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,A=(d+1)/2,S=(m+1)/2,E=(u+h)/4,T=(f+v)/4,_=(p+g)/4;return y>A&&y>S?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=E/n,s=T/n):A>S?A<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),n=E/r,s=_/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=T/s,r=_/s),this.set(n,r,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(f-v)/x,this.z=(h-u)/x,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},tf=class extends Ai{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Rn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new jo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vt=class extends tf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ic=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var nf=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var je=class i{constructor(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,g)}set(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ro.setFromMatrixColumn(e,0).length(),s=1/Ro.setFromMatrixColumn(e,1).length(),a=1/Ro.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h+v*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h-v*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=p*c-d,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=p*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+p,t[10]=h-v*f}else if(e.order==="XZY"){let h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=a*u,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(UM,e,LM)}lookAt(e,t,n){let r=this.elements;return qi.subVectors(e,t),qi.lengthSq()===0&&(qi.z=1),qi.normalize(),Bs.crossVectors(n,qi),Bs.lengthSq()===0&&(Math.abs(n.z)===1?qi.x+=1e-4:qi.z+=1e-4,qi.normalize(),Bs.crossVectors(n,qi)),Bs.normalize(),ph.crossVectors(qi,Bs),r[0]=Bs.x,r[4]=ph.x,r[8]=qi.x,r[1]=Bs.y,r[5]=ph.y,r[9]=qi.y,r[2]=Bs.z,r[6]=ph.z,r[10]=qi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],y=n[7],A=n[11],S=n[15],E=r[0],T=r[4],_=r[8],M=r[12],C=r[1],R=r[5],w=r[9],P=r[13],F=r[2],N=r[6],O=r[10],H=r[14],j=r[3],G=r[7],I=r[11],te=r[15];return s[0]=a*E+o*C+l*F+c*j,s[4]=a*T+o*R+l*N+c*G,s[8]=a*_+o*w+l*O+c*I,s[12]=a*M+o*P+l*H+c*te,s[1]=u*E+f*C+h*F+d*j,s[5]=u*T+f*R+h*N+d*G,s[9]=u*_+f*w+h*O+d*I,s[13]=u*M+f*P+h*H+d*te,s[2]=p*E+v*C+g*F+m*j,s[6]=p*T+v*R+g*N+m*G,s[10]=p*_+v*w+g*O+m*I,s[14]=p*M+v*P+g*H+m*te,s[3]=x*E+y*C+A*F+S*j,s[7]=x*T+y*R+A*N+S*G,s[11]=x*_+y*w+A*O+S*I,s[15]=x*M+y*P+A*H+S*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],p=e[3],v=e[7],g=e[11],m=e[15],x=l*d-c*h,y=o*d-c*f,A=o*h-l*f,S=a*d-c*u,E=a*h-l*u,T=a*f-o*u;return t*(v*x-g*y+m*A)-n*(p*x-g*S+m*E)+r*(p*y-v*S+m*T)-s*(p*A-v*E+g*T)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],p=e[12],v=e[13],g=e[14],m=e[15],x=t*o-n*a,y=t*l-r*a,A=t*c-s*a,S=n*l-r*o,E=n*c-s*o,T=r*c-s*l,_=u*v-f*p,M=u*g-h*p,C=u*m-d*p,R=f*g-h*v,w=f*m-d*v,P=h*m-d*g,F=x*P-y*w+A*R+S*C-E*M+T*_;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/F;return e[0]=(o*P-l*w+c*R)*N,e[1]=(r*w-n*P-s*R)*N,e[2]=(v*T-g*E+m*S)*N,e[3]=(h*E-f*T-d*S)*N,e[4]=(l*C-a*P-c*M)*N,e[5]=(t*P-r*C+s*M)*N,e[6]=(g*A-p*T-m*y)*N,e[7]=(u*T-h*A+d*y)*N,e[8]=(a*w-o*C+c*_)*N,e[9]=(n*C-t*w-s*_)*N,e[10]=(p*E-v*A+m*x)*N,e[11]=(f*A-u*E-d*x)*N,e[12]=(o*M-a*R-l*_)*N,e[13]=(t*R-n*M+r*_)*N,e[14]=(v*y-p*S-g*x)*N,e[15]=(u*S-f*y+h*x)*N,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,p=s*f,v=a*u,g=a*f,m=o*f,x=l*c,y=l*u,A=l*f,S=n.x,E=n.y,T=n.z;return r[0]=(1-(v+m))*S,r[1]=(d+A)*S,r[2]=(p-y)*S,r[3]=0,r[4]=(d-A)*E,r[5]=(1-(h+m))*E,r[6]=(g+x)*E,r[7]=0,r[8]=(p+y)*T,r[9]=(g-x)*T,r[10]=(1-(h+v))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Ro.set(r[0],r[1],r[2]).length(),o=Ro.set(r[4],r[5],r[6]).length(),l=Ro.set(r[8],r[9],r[10]).length();s<0&&(a=-a),_r.copy(this);let c=1/a,u=1/o,f=1/l;return _r.elements[0]*=c,_r.elements[1]*=c,_r.elements[2]*=c,_r.elements[4]*=u,_r.elements[5]*=u,_r.elements[6]*=u,_r.elements[8]*=f,_r.elements[9]*=f,_r.elements[10]*=f,t.setFromRotationMatrix(_r),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=Mr,l=!1){let c=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r),p,v;if(l)p=s/(a-s),v=a*s/(a-s);else if(o===Mr)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Cc)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Mr,l=!1){let c=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r),p,v;if(l)p=1/(a-s),v=a/(a-s);else if(o===Mr)p=-2/(a-s),v=-(a+s)/(a-s);else if(o===Cc)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ro=new B,_r=new je,UM=new B(0,0,0),LM=new B(1,1,1),Bs=new B,ph=new B,qi=new B,Nx=new je,Ox=new Wn,Tr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nx.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nx,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ox.setFromEuler(this),this.setFromQuaternion(Ox,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Tr.DEFAULT_ORDER="XYZ";var Bc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},FM=0,kx=new B,Do=new Wn,ns=new je,mh=new B,mc=new B,NM=new B,OM=new Wn,zx=new B(1,0,0),Hx=new B(0,1,0),Gx=new B(0,0,1),Vx={type:"added"},kM={type:"removed"},Po={type:"childadded",child:null},_m={type:"childremoved",child:null},oi=class i extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:FM++}),this.uuid=os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new Tr,n=new Wn,r=new B(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new je},normalMatrix:{value:new $e}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Do.setFromAxisAngle(e,t),this.quaternion.multiply(Do),this}rotateOnWorldAxis(e,t){return Do.setFromAxisAngle(e,t),this.quaternion.premultiply(Do),this}rotateX(e){return this.rotateOnAxis(zx,e)}rotateY(e){return this.rotateOnAxis(Hx,e)}rotateZ(e){return this.rotateOnAxis(Gx,e)}translateOnAxis(e,t){return kx.copy(e).applyQuaternion(this.quaternion),this.position.add(kx.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zx,e)}translateY(e){return this.translateOnAxis(Hx,e)}translateZ(e){return this.translateOnAxis(Gx,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ns.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?mh.copy(e):mh.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),mc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ns.lookAt(mc,mh,this.up):ns.lookAt(mh,mc,this.up),this.quaternion.setFromRotationMatrix(ns),r&&(ns.extractRotation(r.matrixWorld),Do.setFromRotationMatrix(ns),this.quaternion.premultiply(Do.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vx),Po.child=e,this.dispatchEvent(Po),Po.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kM),_m.child=e,this.dispatchEvent(_m),_m.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ns.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ns.multiply(e.parent.matrixWorld)),e.applyMatrix4(ns),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vx),Po.child=e,this.dispatchEvent(Po),Po.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mc,e,NM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mc,OM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};oi.DEFAULT_UP=new B(0,1,0);oi.DEFAULT_MATRIX_AUTO_UPDATE=!0;oi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Nr=class extends oi{constructor(){super(),this.isGroup=!0,this.type="Group"}},zM={type:"move"},$o=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Nr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},O_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Us={h:0,s:0,l:0},gh={h:0,s:0,l:0};function ym(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=it){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=At.workingColorSpace){return this.r=e,this.g=t,this.b=n,At.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=At.workingColorSpace){if(e=hg(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ym(a,s,e+1/3),this.g=ym(a,s,e),this.b=ym(a,s,e-1/3)}return At.colorSpaceToWorking(this,r),this}setStyle(e,t=it){function n(s){s!==void 0&&parseFloat(s)<1&&Je("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Je("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=it){let n=O_[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}copyLinearToSRGB(e){return this.r=qo(e.r),this.g=qo(e.g),this.b=qo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=it){return At.workingToColorSpace(si.copy(this),e),Math.round(st(si.r*255,0,255))*65536+Math.round(st(si.g*255,0,255))*256+Math.round(st(si.b*255,0,255))}getHexString(e=it){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.workingToColorSpace(si.copy(this),t);let n=si.r,r=si.g,s=si.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=At.workingColorSpace){return At.workingToColorSpace(si.copy(this),t),e.r=si.r,e.g=si.g,e.b=si.b,e}getStyle(e=it){At.workingToColorSpace(si.copy(this),e);let t=si.r,n=si.g,r=si.b;return e!==it?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Us),this.setHSL(Us.h+e,Us.s+t,Us.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Us),e.getHSL(gh);let n=Ec(Us.h,gh.h,t),r=Ec(Us.s,gh.s,t),s=Ec(Us.l,gh.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},si=new Ye;Ye.NAMES=O_;var Er=class extends oi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tr,this.environmentIntensity=1,this.environmentRotation=new Tr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},yr=new B,is=new B,Am=new B,rs=new B,Io=new B,Bo=new B,Wx=new B,Sm=new B,Mm=new B,Tm=new B,Em=new St,wm=new St,bm=new St,Vn=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),yr.subVectors(e,t),r.cross(yr);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){yr.subVectors(r,t),is.subVectors(n,t),Am.subVectors(e,t);let a=yr.dot(yr),o=yr.dot(is),l=yr.dot(Am),c=is.dot(is),u=is.dot(Am),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;let h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-d-p,p,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,rs)===null?!1:rs.x>=0&&rs.y>=0&&rs.x+rs.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,rs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,rs.x),l.addScaledVector(a,rs.y),l.addScaledVector(o,rs.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Em.setScalar(0),wm.setScalar(0),bm.setScalar(0),Em.fromBufferAttribute(e,t),wm.fromBufferAttribute(e,n),bm.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Em,s.x),a.addScaledVector(wm,s.y),a.addScaledVector(bm,s.z),a}static isFrontFacing(e,t,n,r){return yr.subVectors(n,t),is.subVectors(e,t),yr.cross(is).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yr.subVectors(this.c,this.b),is.subVectors(this.a,this.b),yr.cross(is).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Io.subVectors(r,n),Bo.subVectors(s,n),Sm.subVectors(e,n);let l=Io.dot(Sm),c=Bo.dot(Sm);if(l<=0&&c<=0)return t.copy(n);Mm.subVectors(e,r);let u=Io.dot(Mm),f=Bo.dot(Mm);if(u>=0&&f<=u)return t.copy(r);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Io,a);Tm.subVectors(e,s);let d=Io.dot(Tm),p=Bo.dot(Tm);if(p>=0&&d<=p)return t.copy(s);let v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Bo,o);let g=u*p-d*f;if(g<=0&&f-u>=0&&d-p>=0)return Wx.subVectors(s,r),o=(f-u)/(f-u+(d-p)),t.copy(r).addScaledVector(Wx,o);let m=1/(g+v+h);return a=v*m,o=h*m,t.copy(n).addScaledVector(Io,a).addScaledVector(Bo,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kt=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ar.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ar.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ar.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ar):Ar.fromBufferAttribute(s,a),Ar.applyMatrix4(e.matrixWorld),this.expandByPoint(Ar);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vh.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vh.copy(n.boundingBox)),vh.applyMatrix4(e.matrixWorld),this.union(vh)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ar),Ar.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gc),xh.subVectors(this.max,gc),Uo.subVectors(e.a,gc),Lo.subVectors(e.b,gc),Fo.subVectors(e.c,gc),Ls.subVectors(Lo,Uo),Fs.subVectors(Fo,Lo),Ia.subVectors(Uo,Fo);let t=[0,-Ls.z,Ls.y,0,-Fs.z,Fs.y,0,-Ia.z,Ia.y,Ls.z,0,-Ls.x,Fs.z,0,-Fs.x,Ia.z,0,-Ia.x,-Ls.y,Ls.x,0,-Fs.y,Fs.x,0,-Ia.y,Ia.x,0];return!Cm(t,Uo,Lo,Fo,xh)||(t=[1,0,0,0,1,0,0,0,1],!Cm(t,Uo,Lo,Fo,xh))?!1:(_h.crossVectors(Ls,Fs),t=[_h.x,_h.y,_h.z],Cm(t,Uo,Lo,Fo,xh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ar).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ar).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ss[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ss[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ss[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ss[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ss[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ss[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ss[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ss[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ss),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ss=[new B,new B,new B,new B,new B,new B,new B,new B],Ar=new B,vh=new Kt,Uo=new B,Lo=new B,Fo=new B,Ls=new B,Fs=new B,Ia=new B,gc=new B,xh=new B,_h=new B,Ba=new B;function Cm(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Ba.fromArray(i,s);let o=r.x*Math.abs(Ba.x)+r.y*Math.abs(Ba.y)+r.z*Math.abs(Ba.z),l=e.dot(Ba),c=t.dot(Ba),u=n.dot(Ba);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var _n=new B,yh=new we,HM=0,ut=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:HM++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$h,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yh.fromBufferAttribute(this,t),yh.applyMatrix3(e),this.setXY(t,yh.x,yh.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix3(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix4(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyNormalMatrix(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.transformDirection(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Sr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sr(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sr(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sr(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$h&&(e.usage=this.usage),e}};var Uc=class extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Lc=class extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var on=class extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}},GM=new Kt,vc=new B,Rm=new B,wr=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):GM.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vc.subVectors(e,this.center);let t=vc.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(vc,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rm.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vc.copy(e.center).add(Rm)),this.expandByPoint(vc.copy(e.center).sub(Rm))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},VM=0,or=new je,Dm=new oi,No=new B,Qi=new Kt,xc=new Kt,Fn=new B,Lt=class i extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:VM++}),this.uuid=os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dM(e)?Lc:Uc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new $e().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return or.makeRotationFromQuaternion(e),this.applyMatrix4(or),this}rotateX(e){return or.makeRotationX(e),this.applyMatrix4(or),this}rotateY(e){return or.makeRotationY(e),this.applyMatrix4(or),this}rotateZ(e){return or.makeRotationZ(e),this.applyMatrix4(or),this}translate(e,t,n){return or.makeTranslation(e,t,n),this.applyMatrix4(or),this}scale(e,t,n){return or.makeScale(e,t,n),this.applyMatrix4(or),this}lookAt(e){return Dm.lookAt(e),Dm.updateMatrix(),this.applyMatrix4(Dm.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(No).negate(),this.translate(No.x,No.y,No.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new on(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Qi.setFromBufferAttribute(s),this.morphTargetsRelative?(Fn.addVectors(this.boundingBox.min,Qi.min),this.boundingBox.expandByPoint(Fn),Fn.addVectors(this.boundingBox.max,Qi.max),this.boundingBox.expandByPoint(Fn)):(this.boundingBox.expandByPoint(Qi.min),this.boundingBox.expandByPoint(Qi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Qi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];xc.setFromBufferAttribute(o),this.morphTargetsRelative?(Fn.addVectors(Qi.min,xc.min),Qi.expandByPoint(Fn),Fn.addVectors(Qi.max,xc.max),Qi.expandByPoint(Fn)):(Qi.expandByPoint(xc.min),Qi.expandByPoint(xc.max))}Qi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Fn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Fn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Fn.fromBufferAttribute(o,c),l&&(No.fromBufferAttribute(e,c),Fn.add(No)),r=Math.max(r,n.distanceToSquared(Fn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new B,l[_]=new B;let c=new B,u=new B,f=new B,h=new we,d=new we,p=new we,v=new B,g=new B;function m(_,M,C){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,M),f.fromBufferAttribute(n,C),h.fromBufferAttribute(s,_),d.fromBufferAttribute(s,M),p.fromBufferAttribute(s,C),u.sub(c),f.sub(c),d.sub(h),p.sub(h);let R=1/(d.x*p.y-p.x*d.y);isFinite(R)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(R),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(R),o[_].add(v),o[M].add(v),o[C].add(v),l[_].add(g),l[M].add(g),l[C].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let _=0,M=x.length;_<M;++_){let C=x[_],R=C.start,w=C.count;for(let P=R,F=R+w;P<F;P+=3)m(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let y=new B,A=new B,S=new B,E=new B;function T(_){S.fromBufferAttribute(r,_),E.copy(S);let M=o[_];y.copy(M),y.sub(S.multiplyScalar(S.dot(M))).normalize(),A.crossVectors(E,M);let R=A.dot(l[_])<0?-1:1;a.setXYZW(_,y.x,y.y,y.z,R)}for(let _=0,M=x.length;_<M;++_){let C=x[_],R=C.start,w=C.count;for(let P=R,F=R+w;P<F;P+=3)T(e.getX(P+0)),T(e.getX(P+1)),T(e.getX(P+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,f=new B;if(e)for(let h=0,d=e.count;h<d;h+=3){let p=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Fn.fromBufferAttribute(e,t),Fn.normalize(),e.setXYZ(t,Fn.x,Fn.y,Fn.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u),d=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let m=0;m<u;m++)h[p++]=c[d++]}return new ut(h,u,f)}if(this.index===null)return Je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){let h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},rf=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$h,this.updateRanges=[],this.version=0,this.uuid=os()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=os()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=os()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},yi=new B,Fc=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)yi.fromBufferAttribute(this,t),yi.applyMatrix4(e),this.setXYZ(t,yi.x,yi.y,yi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yi.fromBufferAttribute(this,t),yi.applyNormalMatrix(e),this.setXYZ(t,yi.x,yi.y,yi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yi.fromBufferAttribute(this,t),yi.transformDirection(e),this.setXYZ(t,yi.x,yi.y,yi.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Sr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Sr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Sr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Sr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Sr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Dc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Dc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},WM=0,Li=class extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:WM++}),this.uuid=os(),this.name="",this.type="Material",this.blending=Na,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vh,this.blendDst=Wh,this.blendEquation=ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Oa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fa,this.stencilZFail=Fa,this.stencilZPass=Fa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Je(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Na&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vh&&(n.blendSrc=this.blendSrc),this.blendDst!==Wh&&(n.blendDst=this.blendDst),this.blendEquation!==ks&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fa&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fa&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fa&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},el=class extends Li{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Oo,_c=new B,ko=new B,zo=new B,Ho=new we,yc=new we,k_=new je,Ah=new B,Ac=new B,Sh=new B,Xx=new we,Pm=new we,Yx=new we,Nc=class extends oi{constructor(e=new el){if(super(),this.isSprite=!0,this.type="Sprite",Oo===void 0){Oo=new Lt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new rf(t,5);Oo.setIndex([0,1,2,0,2,3]),Oo.setAttribute("position",new Fc(n,3,0,!1)),Oo.setAttribute("uv",new Fc(n,2,3,!1))}this.geometry=Oo,this.material=e,this.center=new we(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ko.setFromMatrixScale(this.matrixWorld),k_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),zo.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ko.multiplyScalar(-zo.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Mh(Ah.set(-.5,-.5,0),zo,a,ko,r,s),Mh(Ac.set(.5,-.5,0),zo,a,ko,r,s),Mh(Sh.set(.5,.5,0),zo,a,ko,r,s),Xx.set(0,0),Pm.set(1,0),Yx.set(1,1);let o=e.ray.intersectTriangle(Ah,Ac,Sh,!1,_c);if(o===null&&(Mh(Ac.set(-.5,.5,0),zo,a,ko,r,s),Pm.set(0,1),o=e.ray.intersectTriangle(Ah,Sh,Ac,!1,_c),o===null))return;let l=e.ray.origin.distanceTo(_c);l<e.near||l>e.far||t.push({distance:l,point:_c.clone(),uv:Vn.getInterpolation(_c,Ah,Ac,Sh,Xx,Pm,Yx,new we),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Mh(i,e,t,n,r,s){Ho.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(yc.x=s*Ho.x-r*Ho.y,yc.y=r*Ho.x+s*Ho.y):yc.copy(Ho),i.copy(e),i.x+=yc.x,i.y+=yc.y,i.applyMatrix4(k_)}var as=new B,Im=new B,Th=new B,Ns=new B,Bm=new B,Eh=new B,Um=new B,ka=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,as)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=as.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(as.copy(this.origin).addScaledVector(this.direction,t),as.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Im.copy(e).add(t).multiplyScalar(.5),Th.copy(t).sub(e).normalize(),Ns.copy(this.origin).sub(Im);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Th),o=Ns.dot(this.direction),l=-Ns.dot(Th),c=Ns.lengthSq(),u=Math.abs(1-a*a),f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=s*u,f>=0)if(h>=-p)if(h<=p){let v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Im).addScaledVector(Th,h),d}intersectSphere(e,t){as.subVectors(e.center,this.origin);let n=as.dot(this.direction),r=as.dot(as)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,as)!==null}intersectTriangle(e,t,n,r,s){Bm.subVectors(t,e),Eh.subVectors(n,e),Um.crossVectors(Bm,Eh);let a=this.direction.dot(Um),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ns.subVectors(this.origin,e);let l=o*this.direction.dot(Eh.crossVectors(Ns,Eh));if(l<0)return null;let c=o*this.direction.dot(Bm.cross(Ns));if(c<0||l+c>a)return null;let u=-o*Ns.dot(Um);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},za=class extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tr,this.combine=Jm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},qx=new je,Ua=new ka,wh=new wr,Qx=new B,bh=new B,Ch=new B,Rh=new B,Lm=new B,Dh=new B,Zx=new B,Ph=new B,Rt=class extends oi{constructor(e=new Lt,t=new za){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Dh.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],f=s[l];u!==0&&(Lm.fromBufferAttribute(f,e),a?Dh.addScaledVector(Lm,u):Dh.addScaledVector(Lm.sub(t),u))}t.add(Dh)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wh.copy(n.boundingSphere),wh.applyMatrix4(s),Ua.copy(e.ray).recast(e.near),!(wh.containsPoint(Ua.origin)===!1&&(Ua.intersectSphere(wh,Qx)===null||Ua.origin.distanceToSquared(Qx)>(e.far-e.near)**2))&&(qx.copy(s).invert(),Ua.copy(e.ray).applyMatrix4(qx),!(n.boundingBox!==null&&Ua.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ua)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){let g=h[p],m=a[g.materialIndex],x=Math.max(g.start,d.start),y=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let A=x,S=y;A<S;A+=3){let E=o.getX(A),T=o.getX(A+1),_=o.getX(A+2);r=Ih(this,m,e,n,c,u,f,E,T,_),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){let x=o.getX(g),y=o.getX(g+1),A=o.getX(g+2);r=Ih(this,a,e,n,c,u,f,x,y,A),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){let g=h[p],m=a[g.materialIndex],x=Math.max(g.start,d.start),y=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let A=x,S=y;A<S;A+=3){let E=A,T=A+1,_=A+2;r=Ih(this,m,e,n,c,u,f,E,T,_),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){let x=g,y=g+1,A=g+2;r=Ih(this,a,e,n,c,u,f,x,y,A),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function XM(i,e,t,n,r,s,a,o){let l;if(e.side===tn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===ai,o),l===null)return null;Ph.copy(o),Ph.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ph);return c<t.near||c>t.far?null:{distance:c,point:Ph.clone(),object:i}}function Ih(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,bh),i.getVertexPosition(l,Ch),i.getVertexPosition(c,Rh);let u=XM(i,e,t,n,bh,Ch,Rh,Zx);if(u){let f=new B;Vn.getBarycoord(Zx,bh,Ch,Rh,f),r&&(u.uv=Vn.getInterpolatedAttribute(r,o,l,c,f,new we)),s&&(u.uv1=Vn.getInterpolatedAttribute(s,o,l,c,f,new we)),a&&(u.normal=Vn.getInterpolatedAttribute(a,o,l,c,f,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new B,materialIndex:0};Vn.getNormal(bh,Ch,Rh,h.normal),u.face=h,u.barycoord=f}return u}var cr=class extends Rn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ct,u=Ct,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Oc=class extends ut{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Go=new je,Kx=new je,Bh=[],Jx=new Kt,YM=new je,Sc=new Rt,Mc=new wr,Ha=class extends Rt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Oc(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,YM)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Go),Jx.copy(e.boundingBox).applyMatrix4(Go),this.boundingBox.union(Jx)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Go),Mc.copy(e.boundingSphere).applyMatrix4(Go),this.boundingSphere.union(Mc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Sc.geometry=this.geometry,Sc.material=this.material,Sc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mc.copy(this.boundingSphere),Mc.applyMatrix4(n),e.ray.intersectsSphere(Mc)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Go),Kx.multiplyMatrices(n,Go),Sc.matrixWorld=Kx,Sc.raycast(e,Bh);for(let a=0,o=Bh.length;a<o;a++){let l=Bh[a];l.instanceId=s,l.object=this,t.push(l)}Bh.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Oc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new cr(new Float32Array(r*this.count),r,this.count,qs,nn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Fm=new B,qM=new B,QM=new $e,Bi=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Fm.subVectors(n,t).cross(qM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Fm),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||QM.getNormalMatrix(e),r=this.coplanarPoint(Fm).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},La=new wr,ZM=new we(.5,.5),Uh=new B,kc=class{constructor(e=new Bi,t=new Bi,n=new Bi,r=new Bi,s=new Bi,a=new Bi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mr,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],p=s[8],v=s[9],g=s[10],m=s[11],x=s[12],y=s[13],A=s[14],S=s[15];if(r[0].setComponents(c-a,d-u,m-p,S-x).normalize(),r[1].setComponents(c+a,d+u,m+p,S+x).normalize(),r[2].setComponents(c+o,d+f,m+v,S+y).normalize(),r[3].setComponents(c-o,d-f,m-v,S-y).normalize(),n)r[4].setComponents(l,h,g,A).normalize(),r[5].setComponents(c-l,d-h,m-g,S-A).normalize();else if(r[4].setComponents(c-l,d-h,m-g,S-A).normalize(),t===Mr)r[5].setComponents(c+l,d+h,m+g,S+A).normalize();else if(t===Cc)r[5].setComponents(l,h,g,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),La.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),La.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(La)}intersectsSprite(e){La.center.set(0,0,0);let t=ZM.distanceTo(e.center);return La.radius=.7071067811865476+t,La.applyMatrix4(e.matrixWorld),this.intersectsSphere(La)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Uh.x=r.normal.x>0?e.max.x:e.min.x,Uh.y=r.normal.y>0?e.max.y:e.min.y,Uh.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Uh)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var sf=class extends Li{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},jx=new je,Ym=new ka,Lh=new wr,Fh=new B,zc=class extends oi{constructor(e=new Lt,t=new sf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lh.copy(n.boundingSphere),Lh.applyMatrix4(r),Lh.radius+=s,e.ray.intersectsSphere(Lh)===!1)return;jx.copy(r).invert(),Ym.copy(e.ray).applyMatrix4(jx);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=h,v=d;p<v;p++){let g=c.getX(p);Fh.fromBufferAttribute(f,g),$x(Fh,g,l,r,e,t,this)}}else{let h=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=h,v=d;p<v;p++)Fh.fromBufferAttribute(f,p),$x(Fh,p,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function $x(i,e,t,n,r,s,a){let o=Ym.distanceSqToPoint(i);if(o<t){let l=new B;Ym.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Hc=class extends Rn{constructor(e=[],t=Ws,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},tl=class extends Rn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Fi=class extends Rn{constructor(e,t,n=An,r,s,a,o=Ct,l=Ct,c,u=lr,f=1){if(u!==lr&&u!==ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},af=class extends Fi{constructor(e,t=An,n=Ws,r,s,a=Ct,o=Ct,l,c=lr){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Gc=class extends Rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},nl=class i extends Lt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],f=[],h=0,d=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,r,a,2),p("x","z","y",1,-1,e,n,-t,r,a,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new on(c,3)),this.setAttribute("normal",new on(u,3)),this.setAttribute("uv",new on(f,2));function p(v,g,m,x,y,A,S,E,T,_,M){let C=A/T,R=S/_,w=A/2,P=S/2,F=E/2,N=T+1,O=_+1,H=0,j=0,G=new B;for(let I=0;I<O;I++){let te=I*R-P;for(let ie=0;ie<N;ie++){let xe=ie*C-w;G[v]=xe*x,G[g]=te*y,G[m]=F,c.push(G.x,G.y,G.z),G[v]=0,G[g]=0,G[m]=E>0?1:-1,u.push(G.x,G.y,G.z),f.push(ie/T),f.push(1-I/_),H+=1}}for(let I=0;I<_;I++)for(let te=0;te<T;te++){let ie=h+te+N*I,xe=h+te+N*(I+1),ye=h+(te+1)+N*(I+1),Ne=h+(te+1)+N*I;l.push(ie,xe,Ne),l.push(xe,ye,Ne),j+=6}o.addGroup(d,j,M),d+=j,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Vc=class i extends Lt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new B,u=new we;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){let d=n+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new on(a,3)),this.setAttribute("normal",new on(o,3)),this.setAttribute("uv",new on(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Wc=class i extends Lt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],f=[],h=[],d=[],p=0,v=[],g=n/2,m=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new on(f,3)),this.setAttribute("normal",new on(h,3)),this.setAttribute("uv",new on(d,2));function x(){let A=new B,S=new B,E=0,T=(t-e)/n;for(let _=0;_<=s;_++){let M=[],C=_/s,R=C*(t-e)+e;for(let w=0;w<=r;w++){let P=w/r,F=P*l+o,N=Math.sin(F),O=Math.cos(F);S.x=R*N,S.y=-C*n+g,S.z=R*O,f.push(S.x,S.y,S.z),A.set(N,T,O).normalize(),h.push(A.x,A.y,A.z),d.push(P,1-C),M.push(p++)}v.push(M)}for(let _=0;_<r;_++)for(let M=0;M<s;M++){let C=v[M][_],R=v[M+1][_],w=v[M+1][_+1],P=v[M][_+1];(e>0||M!==0)&&(u.push(C,R,P),E+=3),(t>0||M!==s-1)&&(u.push(R,w,P),E+=3)}c.addGroup(m,E,0),m+=E}function y(A){let S=p,E=new we,T=new B,_=0,M=A===!0?e:t,C=A===!0?1:-1;for(let w=1;w<=r;w++)f.push(0,g*C,0),h.push(0,C,0),d.push(.5,.5),p++;let R=p;for(let w=0;w<=r;w++){let F=w/r*l+o,N=Math.cos(F),O=Math.sin(F);T.x=M*O,T.y=g*C,T.z=M*N,f.push(T.x,T.y,T.z),h.push(0,C,0),E.x=N*.5+.5,E.y=O*.5*C+.5,d.push(E.x,E.y),p++}for(let w=0;w<r;w++){let P=S+w,F=R+w;A===!0?u.push(F,F+1,P):u.push(F+1,F,P),_+=3}c.addGroup(m,_,A===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var of=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Je("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let u=n[r],h=n[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new we:new B);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new B,r=[],s=[],a=[],o=new B,l=new je;for(let d=0;d<=e;d++){let p=d/e;r[d]=this.getTangentAt(p,new B)}s[0]=new B,a[0]=new B;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(st(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(st(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],d*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function fg(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var Nh=new B,Nm=new fg,Om=new fg,km=new fg,Xc=class extends of{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new B){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Nh.subVectors(r[0],r[1]).add(r[0]),c=Nh);let f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Nh.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Nh),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Nm.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,p,v,g),Om.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,p,v,g),km.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(Nm.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Om.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),km.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return n.set(Nm.calc(l),Om.calc(l),km.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new B().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};var cs=class i extends Lt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],p=[],v=[],g=[];for(let m=0;m<u;m++){let x=m*h-a;for(let y=0;y<c;y++){let A=y*f-s;p.push(A,-x,0),v.push(0,0,1),g.push(y/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){let y=x+c*m,A=x+c*(m+1),S=x+1+c*(m+1),E=x+1+c*m;d.push(y,A,E),d.push(A,S,E)}this.setIndex(d),this.setAttribute("position",new on(p,3)),this.setAttribute("normal",new on(v,3)),this.setAttribute("uv",new on(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ga=class i extends Lt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],f=new B,h=new B,d=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){let x=[],y=m/n,A=0;m===0&&a===0?A=.5/t:m===n&&l===Math.PI&&(A=-.5/t);for(let S=0;S<=t;S++){let E=S/t;f.x=-e*Math.cos(r+E*s)*Math.sin(a+y*o),f.y=e*Math.cos(a+y*o),f.z=e*Math.sin(r+E*s)*Math.sin(a+y*o),p.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),g.push(E+A,1-y),x.push(c++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){let y=u[m][x+1],A=u[m][x],S=u[m+1][x],E=u[m+1][x+1];(m!==0||a>0)&&d.push(y,A,E),(m!==n-1||l<Math.PI)&&d.push(A,S,E)}this.setIndex(d),this.setAttribute("position",new on(p,3)),this.setAttribute("normal",new on(v,3)),this.setAttribute("uv",new on(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Wa(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function ci(i){let e={};for(let t=0;t<i.length;t++){let n=Wa(i[t]);for(let r in n)e[r]=n[r]}return e}function KM(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function dg(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:At.workingColorSpace}var z_={clone:Wa,merge:ci},JM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rt=class extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=JM,this.fragmentShader=jM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wa(e.uniforms),this.uniformsGroups=KM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},lf=class extends rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Yc=class extends Li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ug,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var cf=class extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mi,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},uf=class extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Oh(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var zs=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},hf=class extends zs{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gm,endingEnd:Gm}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Vm:s=e,o=2*t-n;break;case Wm:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Vm:a=e,l=2*n-t;break;case Wm:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,p=(n-t)/(r-t),v=p*p,g=v*p,m=-h*g+2*h*v-h*p,x=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*p+1,y=(-1-d)*g+(1.5+d)*v+.5*p,A=d*g-d*v;for(let S=0;S!==o;++S)s[S]=m*a[u+S]+x*a[c+S]+y*a[l+S]+A*a[f+S];return s}},ff=class extends zs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*f+a[l+h]*u;return s}},df=class extends zs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},pf=class extends zs{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,f=u.inTangents,h=u.outTangents;if(!f||!h){let v=(n-t)/(r-t),g=1-v;for(let m=0;m!==o;++m)s[m]=a[c+m]*g+a[l+m]*v;return s}let d=o*2,p=e-1;for(let v=0;v!==o;++v){let g=a[c+v],m=a[l+v],x=p*d+v*2,y=h[x],A=h[x+1],S=e*d+v*2,E=f[S],T=f[S+1],_=(n-t)/(r-t),M,C,R,w,P;for(let F=0;F<8;F++){M=_*_,C=M*_,R=1-_,w=R*R,P=w*R;let O=P*t+3*w*_*y+3*R*M*E+C*r-n;if(Math.abs(O)<1e-10)break;let H=3*w*(y-t)+6*R*_*(E-y)+3*M*(r-E);if(Math.abs(H)<1e-10)break;_=_-O/H,_=Math.max(0,Math.min(1,_))}s[v]=P*g+3*w*_*A+3*R*M*T+C*m}return s}},Zi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Oh(t,this.TimeBufferType),this.values=Oh(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Oh(e.times,Array),values:Oh(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new df(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ff(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new hf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new pf(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case wc:t=this.InterpolantFactoryMethodDiscrete;break;case jh:t=this.InterpolantFactoryMethodLinear;break;case Gh:t=this.InterpolantFactoryMethodSmooth;break;case Hm:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Je("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wc;case this.InterpolantFactoryMethodLinear:return jh;case this.InterpolantFactoryMethodSmooth:return Gh;case this.InterpolantFactoryMethodBezier:return Hm}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ke("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ke("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&pM(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Ke("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Gh,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let f=o*n,h=f-n,d=f+n;for(let p=0;p!==n;++p){let v=t[f+p];if(v!==t[h+p]||v!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,h=a*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Zi.prototype.ValueTypeName="";Zi.prototype.TimeBufferType=Float32Array;Zi.prototype.ValueBufferType=Float32Array;Zi.prototype.DefaultInterpolation=jh;var Hs=class extends Zi{constructor(e,t,n){super(e,t,n)}};Hs.prototype.ValueTypeName="bool";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=wc;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;var mf=class extends Zi{constructor(e,t,n,r){super(e,t,n,r)}};mf.prototype.ValueTypeName="color";var gf=class extends Zi{constructor(e,t,n,r){super(e,t,n,r)}};gf.prototype.ValueTypeName="number";var vf=class extends zs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)Wn.slerpFlat(s,0,a,c-o,a,c,l);return s}},qc=class extends Zi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new vf(this.times,this.values,this.getValueSize(),e)}};qc.prototype.ValueTypeName="quaternion";qc.prototype.InterpolantFactoryMethodSmooth=void 0;var Gs=class extends Zi{constructor(e,t,n){super(e,t,n)}};Gs.prototype.ValueTypeName="string";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=wc;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;var xf=class extends Zi{constructor(e,t,n,r){super(e,t,n,r)}};xf.prototype.ValueTypeName="vector";var _f=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},H_=new _f,yf=class{constructor(e){this.manager=e!==void 0?e:H_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};yf.DEFAULT_MATERIAL_NAME="__DEFAULT";var kh=new B,zh=new Wn,Lr=new B,Qc=class extends oi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=Mr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(kh,zh,Lr),Lr.x===1&&Lr.y===1&&Lr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kh,zh,Lr.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(kh,zh,Lr),Lr.x===1&&Lr.y===1&&Lr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kh,zh,Lr.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Os=new B,e_=new we,t_=new we,yn=class extends Qc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Jo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Tc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jo*2*Math.atan(Math.tan(Tc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Os.x,Os.y).multiplyScalar(-e/Os.z),Os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Os.x,Os.y).multiplyScalar(-e/Os.z)}getViewSize(e,t){return this.getViewBounds(e,e_,t_),t.subVectors(t_,e_)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Tc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var us=class extends Qc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Vo=-90,Wo=1,il=class extends oi{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yn(Vo,Wo,e,t);r.layers=this.layers,this.add(r);let s=new yn(Vo,Wo,e,t);s.layers=this.layers,this.add(s);let a=new yn(Vo,Wo,e,t);a.layers=this.layers,this.add(a);let o=new yn(Vo,Wo,e,t);o.layers=this.layers,this.add(o);let l=new yn(Vo,Wo,e,t);l.layers=this.layers,this.add(l);let c=new yn(Vo,Wo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Mr)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Af=class extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var pg="\\[\\]\\.:\\/",$M=new RegExp("["+pg+"]","g"),mg="[^"+pg+"]",eT="[^"+pg.replace("\\.","")+"]",tT=/((?:WC+[\/:])*)/.source.replace("WC",mg),nT=/(WCOD+)?/.source.replace("WCOD",eT),iT=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mg),rT=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mg),sT=new RegExp("^"+tT+nT+iT+rT+"$"),aT=["material","materials","bones","map"],qm=class{constructor(e,t,n){let r=n||$t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},$t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($M,"")}static parseTrackName(e){let t=sT.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);aT.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Je("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Ke("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};$t.Composite=qm;$t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$t.prototype.GetterByBindingType=[$t.prototype._getValue_direct,$t.prototype._getValue_array,$t.prototype._getValue_arrayElement,$t.prototype._getValue_toArray];$t.prototype.SetterByBindingTypeAndVersioning=[[$t.prototype._setValue_direct,$t.prototype._setValue_direct_setNeedsUpdate,$t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_array,$t.prototype._setValue_array_setNeedsUpdate,$t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_arrayElement,$t.prototype._setValue_arrayElement_setNeedsUpdate,$t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_fromArray,$t.prototype._setValue_fromArray_setNeedsUpdate,$t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var DD=new Float32Array(1);var Se=class i{constructor(e){this.value=e}clone(){return new i(this.value.clone===void 0?this.value:this.value.clone())}};var n_=new B,Hh=new B,Xo=new B,Yo=new B,zm=new B,oT=new B,lT=new B,Si=class{constructor(e=new B,t=new B){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){n_.subVectors(e,this.start),Hh.subVectors(this.end,this.start);let n=Hh.dot(Hh),s=Hh.dot(n_)/n;return t&&(s=st(s,0,1)),s}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=oT,n=lT){let r=10000000000000001e-32,s,a,o=this.start,l=e.start,c=this.end,u=e.end;Xo.subVectors(c,o),Yo.subVectors(u,l),zm.subVectors(o,l);let f=Xo.dot(Xo),h=Yo.dot(Yo),d=Yo.dot(zm);if(f<=r&&h<=r)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(f<=r)s=0,a=d/h,a=st(a,0,1);else{let p=Xo.dot(zm);if(h<=r)a=0,s=st(-p/f,0,1);else{let v=Xo.dot(Yo),g=f*h-v*v;g!==0?s=st((v*d-p*h)/g,0,1):s=0,a=(v*s+d)/h,a<0?(a=0,s=st(-p/f,0,1)):a>1&&(a=1,s=st((v-p)/f,0,1))}}return t.copy(o).addScaledVector(Xo,s),n.copy(l).addScaledVector(Yo,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function gg(i,e,t,n){let r=cT(n);switch(t){case lg:return i*e;case qs:return i*e/r.components*r.byteLength;case al:return i*e/r.components*r.byteLength;case hs:return i*e*2/r.components*r.byteLength;case Qs:return i*e*2/r.components*r.byteLength;case cg:return i*e*3/r.components*r.byteLength;case Sn:return i*e*4/r.components*r.byteLength;case Zs:return i*e*4/r.components*r.byteLength;case $c:case eu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case tu:case nu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Cf:case Df:return Math.max(i,16)*Math.max(e,8)/4;case bf:case Rf:return Math.max(i,8)*Math.max(e,8)/2;case Pf:case If:case Uf:case Lf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Bf:case Ff:case Nf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Of:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case zf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Hf:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Gf:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Vf:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Wf:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Xf:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Yf:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qf:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Qf:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Zf:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Kf:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Jf:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case jf:case $f:case ed:return Math.ceil(i/4)*Math.ceil(e/4)*16;case td:case nd:return Math.ceil(i/4)*Math.ceil(e/4)*8;case id:case rd:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function cT(i){switch(i){case xt:case sl:return{byteLength:1,components:1};case Xs:case jc:case li:return{byteLength:2,components:1};case Ef:case wf:return{byteLength:2,components:4};case An:case Ys:case nn:return{byteLength:4,components:1};case ag:case og:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xn}}));typeof window<"u"&&(window.__THREE__?Je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xn);function uy(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function hT(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){let p=f[h],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){let v=f[d];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var fT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dT=`#ifdef USE_ALPHAHASH
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
#endif`,pT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xT=`#ifdef USE_AOMAP
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
#endif`,_T=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yT=`#ifdef USE_BATCHING
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
#endif`,AT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ST=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,MT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,TT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ET=`#ifdef USE_IRIDESCENCE
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
#endif`,wT=`#ifdef USE_BUMPMAP
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
#endif`,bT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,CT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,RT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,DT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,PT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,IT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,BT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,UT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,LT=`#define PI 3.141592653589793
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
} // validated`,FT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,NT=`vec3 transformedNormal = objectNormal;
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
#endif`,OT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,HT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,GT="gl_FragColor = linearToOutputTexel( gl_FragColor );",VT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,WT=`#ifdef USE_ENVMAP
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
#endif`,XT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,YT=`#ifdef USE_ENVMAP
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
#endif`,qT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QT=`#ifdef USE_ENVMAP
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
#endif`,ZT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,KT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,JT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$T=`#ifdef USE_GRADIENTMAP
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
}`,eE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iE=`uniform bool receiveShadow;
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
#endif`,rE=`#ifdef USE_ENVMAP
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
#endif`,sE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,aE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cE=`PhysicalMaterial material;
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
#endif`,uE=`uniform sampler2D dfgLUT;
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
}`,hE=`
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
#endif`,fE=`#if defined( RE_IndirectDiffuse )
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
#endif`,dE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_E=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,AE=`#if defined( USE_POINTS_UV )
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
#endif`,SE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ME=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,TE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,EE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bE=`#ifdef USE_MORPHTARGETS
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
#endif`,CE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,DE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,PE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,IE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,UE=`#ifdef USE_NORMALMAP
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
#endif`,LE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,FE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,NE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,OE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,HE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,GE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,VE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,WE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,YE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,QE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ZE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,KE=`float getShadowMask() {
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
}`,JE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jE=`#ifdef USE_SKINNING
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
#endif`,$E=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ew=`#ifdef USE_SKINNING
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
#endif`,tw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sw=`#ifdef USE_TRANSMISSION
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
#endif`,aw=`#ifdef USE_TRANSMISSION
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
#endif`,ow=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,hw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fw=`uniform sampler2D t2D;
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
}`,dw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vw=`#include <common>
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
}`,xw=`#if DEPTH_PACKING == 3200
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
}`,_w=`#define DISTANCE
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
}`,yw=`#define DISTANCE
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
}`,Aw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mw=`uniform float scale;
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
}`,Tw=`uniform vec3 diffuse;
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
}`,Ew=`#include <common>
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
}`,ww=`uniform vec3 diffuse;
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
}`,bw=`#define LAMBERT
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
}`,Cw=`#define LAMBERT
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
}`,Rw=`#define MATCAP
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
}`,Dw=`#define MATCAP
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
}`,Pw=`#define NORMAL
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
}`,Iw=`#define NORMAL
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
}`,Bw=`#define PHONG
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
}`,Uw=`#define PHONG
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
}`,Lw=`#define STANDARD
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
}`,Fw=`#define STANDARD
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
}`,Nw=`#define TOON
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
}`,Ow=`#define TOON
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
}`,kw=`uniform float size;
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
}`,zw=`uniform vec3 diffuse;
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
}`,Hw=`#include <common>
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
}`,Gw=`uniform vec3 color;
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
}`,Vw=`uniform float rotation;
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
}`,Ww=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:fT,alphahash_pars_fragment:dT,alphamap_fragment:pT,alphamap_pars_fragment:mT,alphatest_fragment:gT,alphatest_pars_fragment:vT,aomap_fragment:xT,aomap_pars_fragment:_T,batching_pars_vertex:yT,batching_vertex:AT,begin_vertex:ST,beginnormal_vertex:MT,bsdfs:TT,iridescence_fragment:ET,bumpmap_pars_fragment:wT,clipping_planes_fragment:bT,clipping_planes_pars_fragment:CT,clipping_planes_pars_vertex:RT,clipping_planes_vertex:DT,color_fragment:PT,color_pars_fragment:IT,color_pars_vertex:BT,color_vertex:UT,common:LT,cube_uv_reflection_fragment:FT,defaultnormal_vertex:NT,displacementmap_pars_vertex:OT,displacementmap_vertex:kT,emissivemap_fragment:zT,emissivemap_pars_fragment:HT,colorspace_fragment:GT,colorspace_pars_fragment:VT,envmap_fragment:WT,envmap_common_pars_fragment:XT,envmap_pars_fragment:YT,envmap_pars_vertex:qT,envmap_physical_pars_fragment:rE,envmap_vertex:QT,fog_vertex:ZT,fog_pars_vertex:KT,fog_fragment:JT,fog_pars_fragment:jT,gradientmap_pars_fragment:$T,lightmap_pars_fragment:eE,lights_lambert_fragment:tE,lights_lambert_pars_fragment:nE,lights_pars_begin:iE,lights_toon_fragment:sE,lights_toon_pars_fragment:aE,lights_phong_fragment:oE,lights_phong_pars_fragment:lE,lights_physical_fragment:cE,lights_physical_pars_fragment:uE,lights_fragment_begin:hE,lights_fragment_maps:fE,lights_fragment_end:dE,logdepthbuf_fragment:pE,logdepthbuf_pars_fragment:mE,logdepthbuf_pars_vertex:gE,logdepthbuf_vertex:vE,map_fragment:xE,map_pars_fragment:_E,map_particle_fragment:yE,map_particle_pars_fragment:AE,metalnessmap_fragment:SE,metalnessmap_pars_fragment:ME,morphinstance_vertex:TE,morphcolor_vertex:EE,morphnormal_vertex:wE,morphtarget_pars_vertex:bE,morphtarget_vertex:CE,normal_fragment_begin:RE,normal_fragment_maps:DE,normal_pars_fragment:PE,normal_pars_vertex:IE,normal_vertex:BE,normalmap_pars_fragment:UE,clearcoat_normal_fragment_begin:LE,clearcoat_normal_fragment_maps:FE,clearcoat_pars_fragment:NE,iridescence_pars_fragment:OE,opaque_fragment:kE,packing:zE,premultiplied_alpha_fragment:HE,project_vertex:GE,dithering_fragment:VE,dithering_pars_fragment:WE,roughnessmap_fragment:XE,roughnessmap_pars_fragment:YE,shadowmap_pars_fragment:qE,shadowmap_pars_vertex:QE,shadowmap_vertex:ZE,shadowmask_pars_fragment:KE,skinbase_vertex:JE,skinning_pars_vertex:jE,skinning_vertex:$E,skinnormal_vertex:ew,specularmap_fragment:tw,specularmap_pars_fragment:nw,tonemapping_fragment:iw,tonemapping_pars_fragment:rw,transmission_fragment:sw,transmission_pars_fragment:aw,uv_pars_fragment:ow,uv_pars_vertex:lw,uv_vertex:cw,worldpos_vertex:uw,background_vert:hw,background_frag:fw,backgroundCube_vert:dw,backgroundCube_frag:pw,cube_vert:mw,cube_frag:gw,depth_vert:vw,depth_frag:xw,distance_vert:_w,distance_frag:yw,equirect_vert:Aw,equirect_frag:Sw,linedashed_vert:Mw,linedashed_frag:Tw,meshbasic_vert:Ew,meshbasic_frag:ww,meshlambert_vert:bw,meshlambert_frag:Cw,meshmatcap_vert:Rw,meshmatcap_frag:Dw,meshnormal_vert:Pw,meshnormal_frag:Iw,meshphong_vert:Bw,meshphong_frag:Uw,meshphysical_vert:Lw,meshphysical_frag:Fw,meshtoon_vert:Nw,meshtoon_frag:Ow,points_vert:kw,points_frag:zw,shadow_vert:Hw,shadow_frag:Gw,sprite_vert:Vw,sprite_frag:Ww},Pe={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Hr={basic:{uniforms:ci([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:ci([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:ci([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:ci([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:ci([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:ci([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:ci([Pe.points,Pe.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:ci([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:ci([Pe.common,Pe.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:ci([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:ci([Pe.sprite,Pe.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distance:{uniforms:ci([Pe.common,Pe.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distance_vert,fragmentShader:ht.distance_frag},shadow:{uniforms:ci([Pe.lights,Pe.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Hr.physical={uniforms:ci([Hr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var od={r:0,b:0,g:0},Xa=new Tr,Xw=new je;function Yw(i,e,t,n,r,s){let a=new Ye(0),o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(x){let y=x.isScene===!0?x.background:null;if(y&&y.isTexture){let A=x.backgroundBlurriness>0;y=e.get(y,A)}return y}function p(x){let y=!1,A=d(x);A===null?g(a,o):A&&A.isColor&&(g(A,1),y=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,y){let A=d(y);A&&(A.isCubeTexture||A.mapping===Kc)?(c===void 0&&(c=new Rt(new nl(1,1,1),new rt({name:"BackgroundCubeMaterial",uniforms:Wa(Hr.backgroundCube.uniforms),vertexShader:Hr.backgroundCube.vertexShader,fragmentShader:Hr.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),Xa.copy(y.backgroundRotation),Xa.x*=-1,Xa.y*=-1,Xa.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Xa.y*=-1,Xa.z*=-1),c.material.uniforms.envMap.value=A,c.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Xw.makeRotationFromEuler(Xa)),c.material.toneMapped=At.getTransfer(A.colorSpace)!==Ut,(u!==A||f!==A.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,f=A.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Rt(new cs(2,2),new rt({name:"BackgroundMaterial",uniforms:Wa(Hr.background.uniforms),vertexShader:Hr.background.vertexShader,fragmentShader:Hr.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=At.getTransfer(A.colorSpace)!==Ut,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,y){x.getRGB(od,dg(i)),t.buffers.color.setClear(od.r,od.g,od.b,y,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),o=y,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,g(a,o)},render:p,addToRenderList:v,dispose:m}}function qw(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,a=!1;function o(R,w,P,F,N){let O=!1,H=f(R,F,P,w);s!==H&&(s=H,c(s.object)),O=d(R,F,P,N),O&&p(R,F,P,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,A(R,w,P,F),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function f(R,w,P,F){let N=F.wireframe===!0,O=n[w.id];O===void 0&&(O={},n[w.id]=O);let H=R.isInstancedMesh===!0?R.id:0,j=O[H];j===void 0&&(j={},O[H]=j);let G=j[P.id];G===void 0&&(G={},j[P.id]=G);let I=G[N];return I===void 0&&(I=h(l()),G[N]=I),I}function h(R){let w=[],P=[],F=[];for(let N=0;N<t;N++)w[N]=0,P[N]=0,F[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:P,attributeDivisors:F,object:R,attributes:{},index:null}}function d(R,w,P,F){let N=s.attributes,O=w.attributes,H=0,j=P.getAttributes();for(let G in j)if(j[G].location>=0){let te=N[G],ie=O[G];if(ie===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(ie=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(ie=R.instanceColor)),te===void 0||te.attribute!==ie||ie&&te.data!==ie.data)return!0;H++}return s.attributesNum!==H||s.index!==F}function p(R,w,P,F){let N={},O=w.attributes,H=0,j=P.getAttributes();for(let G in j)if(j[G].location>=0){let te=O[G];te===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(te=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(te=R.instanceColor));let ie={};ie.attribute=te,te&&te.data&&(ie.data=te.data),N[G]=ie,H++}s.attributes=N,s.attributesNum=H,s.index=F}function v(){let R=s.newAttributes;for(let w=0,P=R.length;w<P;w++)R[w]=0}function g(R){m(R,0)}function m(R,w){let P=s.newAttributes,F=s.enabledAttributes,N=s.attributeDivisors;P[R]=1,F[R]===0&&(i.enableVertexAttribArray(R),F[R]=1),N[R]!==w&&(i.vertexAttribDivisor(R,w),N[R]=w)}function x(){let R=s.newAttributes,w=s.enabledAttributes;for(let P=0,F=w.length;P<F;P++)w[P]!==R[P]&&(i.disableVertexAttribArray(P),w[P]=0)}function y(R,w,P,F,N,O,H){H===!0?i.vertexAttribIPointer(R,w,P,N,O):i.vertexAttribPointer(R,w,P,F,N,O)}function A(R,w,P,F){v();let N=F.attributes,O=P.getAttributes(),H=w.defaultAttributeValues;for(let j in O){let G=O[j];if(G.location>=0){let I=N[j];if(I===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(I=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(I=R.instanceColor)),I!==void 0){let te=I.normalized,ie=I.itemSize,xe=e.get(I);if(xe===void 0)continue;let ye=xe.buffer,Ne=xe.type,Q=xe.bytesPerElement,se=Ne===i.INT||Ne===i.UNSIGNED_INT||I.gpuType===Ys;if(I.isInterleavedBufferAttribute){let ae=I.data,re=ae.stride,he=I.offset;if(ae.isInstancedInterleavedBuffer){for(let me=0;me<G.locationSize;me++)m(G.location+me,ae.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let me=0;me<G.locationSize;me++)g(G.location+me);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let me=0;me<G.locationSize;me++)y(G.location+me,ie/G.locationSize,Ne,te,re*Q,(he+ie/G.locationSize*me)*Q,se)}else{if(I.isInstancedBufferAttribute){for(let ae=0;ae<G.locationSize;ae++)m(G.location+ae,I.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let ae=0;ae<G.locationSize;ae++)g(G.location+ae);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let ae=0;ae<G.locationSize;ae++)y(G.location+ae,ie/G.locationSize,Ne,te,ie*Q,ie/G.locationSize*ae*Q,se)}}else if(H!==void 0){let te=H[j];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(G.location,te);break;case 3:i.vertexAttrib3fv(G.location,te);break;case 4:i.vertexAttrib4fv(G.location,te);break;default:i.vertexAttrib1fv(G.location,te)}}}}x()}function S(){M();for(let R in n){let w=n[R];for(let P in w){let F=w[P];for(let N in F){let O=F[N];for(let H in O)u(O[H].object),delete O[H];delete F[N]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;let w=n[R.id];for(let P in w){let F=w[P];for(let N in F){let O=F[N];for(let H in O)u(O[H].object),delete O[H];delete F[N]}}delete n[R.id]}function T(R){for(let w in n){let P=n[w];for(let F in P){let N=P[F];if(N[R.id]===void 0)continue;let O=N[R.id];for(let H in O)u(O[H].object),delete O[H];delete N[R.id]}}}function _(R){for(let w in n){let P=n[w],F=R.isInstancedMesh===!0?R.id:0,N=P[F];if(N!==void 0){for(let O in N){let H=N[O];for(let j in H)u(H[j].object),delete H[j];delete N[O]}delete P[F],Object.keys(P).length===0&&delete n[w]}}}function M(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:M,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function Qw(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),t.update(u,n,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let p=0;p<f;p++)d+=u[p];t.update(d,n,1)}function l(c,u,f,h){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)a(c[p],u[p],h[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v]*h[v];t.update(p,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Zw(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==Sn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let _=T===li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==xt&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==nn&&!_)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:A,maxSamples:S,samples:E}}function Kw(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Bi,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){let p=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,m=i.get(f);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{let x=s?0:n,y=x*4,A=m.clippingState||null;l.value=A,A=u(p,h,y,d);for(let S=0;S!==y;++S)A[S]=t[S];m.clippingState=A,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,p){let v=f!==null?f.length:0,g=null;if(v!==0){if(g=l.value,p!==!0||g===null){let m=d+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,A=d;y!==v;++y,A+=4)a.copy(f[y]).applyMatrix4(x,o),a.normal.toArray(g,A),g[A+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var Js=4,G_=[.125,.215,.35,.446,.526,.582],qa=20,Jw=256,ru=new us,V_=new Ye,vg=null,xg=0,_g=0,yg=!1,jw=new B,cl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=jw}=s;vg=this._renderer.getRenderTarget(),xg=this._renderer.getActiveCubeFace(),_g=this._renderer.getActiveMipmapLevel(),yg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Y_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=X_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(vg,xg,_g),this._renderer.xr.enabled=yg,e.scissorTest=!1,ol(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ws||e.mapping===Va?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vg=this._renderer.getRenderTarget(),xg=this._renderer.getActiveCubeFace(),_g=this._renderer.getActiveMipmapLevel(),yg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:li,format:Sn,colorSpace:Ui,depthBuffer:!1},r=W_(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=W_(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=$w(s)),this._blurMaterial=tb(s,e,t),this._ggxMaterial=eb(s,e,t)}return r}_compileMaterial(e){let t=new Rt(new Lt,e);this._renderer.compile(t,ru)}_sceneToCubeUV(e,t,n,r,s){let l=new yn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(V_),f.toneMapping=Ki,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Rt(new nl,new za({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,m=!1,x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,m=!0):(g.color.copy(V_),m=!0);for(let y=0;y<6;y++){let A=y%3;A===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[y],s.y,s.z)):A===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[y]));let S=this._cubeSize;ol(r,A*S,y>2?S:0,S,S),f.setRenderTarget(r),m&&f.render(v,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=x}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Ws||e.mapping===Va;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Y_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=X_());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;ol(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ru)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-Js?n-p+Js:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,ol(s,g,m,3*v,2*v),r.setRenderTarget(s),r.render(o,ru),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,ol(e,g,m,3*v,2*v),r.setRenderTarget(e),r.render(o,ru)}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ke("blur direction must be either latitudinal or longitudinal!");let u=3,f=this._lodMeshes[r];f.material=c;let h=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*qa-1),v=s/p,g=isFinite(s)?1+Math.floor(u*v):qa;g>qa&&Je(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${qa}`);let m=[],x=0;for(let T=0;T<qa;++T){let _=T/v,M=Math.exp(-_*_/2);m.push(M),T===0?x+=M:T<g&&(x+=2*M)}for(let T=0;T<m.length;T++)m[T]=m[T]/x;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:y}=this;h.dTheta.value=p,h.mipInt.value=y-n;let A=this._sizeLods[r],S=3*A*(r>y-Js?r-y+Js:0),E=4*(this._cubeSize-A);ol(t,S,E,3*A,2*A),l.setRenderTarget(t),l.render(f,ru)}};function $w(i){let e=[],t=[],n=[],r=i,s=i-Js+1+G_.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Js?l=G_[a-i+Js-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*d),y=new Float32Array(g*p*d),A=new Float32Array(m*p*d);for(let E=0;E<d;E++){let T=E%3*2/3-1,_=E>2?0:-1,M=[T,_,0,T+2/3,_,0,T+2/3,_+1,0,T,_,0,T+2/3,_+1,0,T,_+1,0];x.set(M,v*p*E),y.set(h,g*p*E);let C=[E,E,E,E,E,E];A.set(C,m*p*E)}let S=new Lt;S.setAttribute("position",new ut(x,v)),S.setAttribute("uv",new ut(y,g)),S.setAttribute("faceIndex",new ut(A,m)),n.push(new Rt(S,null)),r>Js&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function W_(i,e,t){let n=new vt(i,e,t);return n.texture.mapping=Kc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ol(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function eb(i,e,t){return new rt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Jw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ud(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function tb(i,e,t){let n=new Float32Array(qa),r=new B(0,1,0);return new rt({name:"SphericalGaussianBlur",defines:{n:qa,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ud(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function X_(){return new rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ud(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function Y_(){return new rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function ud(){return`

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
	`}var ul=class extends vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Hc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new nl(5,5,5),s=new rt({name:"CubemapFromEquirect",uniforms:Wa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Ft});s.uniforms.tEquirect.value=t;let a=new Rt(r,s),o=t.minFilter;return t.minFilter===Or&&(t.minFilter=Vt),new il(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function nb(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){let d=h.mapping;if(d===Sf||d===Mf)if(e.has(h)){let p=e.get(h).texture;return o(p,h.mapping)}else{let p=h.image;if(p&&p.height>0){let v=new ul(p.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let d=h.mapping,p=d===Sf||d===Mf,v=d===Ws||d===Va;if(p||v){let g=t.get(h),m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new cl(i)),g=p?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let x=h.image;return p&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new cl(i)),g=p?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,d){return d===Sf?h.mapping=Ws:d===Mf&&(h.mapping=Va),h}function l(h){let d=0,p=6;for(let v=0;v<p;v++)h[v]!==void 0&&d++;return d===p}function c(h){let d=h.target;d.removeEventListener("dispose",c);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function ib(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Pc("WebGLRenderer: "+n+" extension not supported."),r}}}function rb(i,e,t,n){let r={},s=new WeakMap;function a(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete r[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){let h=f.attributes;for(let d in h)e.update(h[d],i.ARRAY_BUFFER)}function c(f){let h=[],d=f.index,p=f.attributes.position,v=0;if(p===void 0)return;if(d!==null){let x=d.array;v=d.version;for(let y=0,A=x.length;y<A;y+=3){let S=x[y+0],E=x[y+1],T=x[y+2];h.push(S,E,E,T,T,S)}}else{let x=p.array;v=p.version;for(let y=0,A=x.length/3-1;y<A;y+=3){let S=y+0,E=y+1,T=y+2;h.push(S,E,E,T,T,S)}}let g=new(p.count>=65535?Lc:Uc)(h,1);g.version=v;let m=s.get(f);m&&e.remove(m),s.set(f,g)}function u(f){let h=s.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function sb(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,p){p!==0&&(i.drawElementsInstanced(n,d,s,h*a,p),t.update(d,n,p))}function u(h,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function f(h,d,p,v){if(p===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<h.length;m++)c(h[m]/a,d[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,v,0,p);let m=0;for(let x=0;x<p;x++)m+=d[x]*v[x];t.update(m,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function ab(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function ob(i,e,t){let n=new WeakMap,r=new St;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let M=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),v===!0&&(y=3);let A=o.attributes.position.count*y,S=1;A>e.maxTextureSize&&(S=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);let E=new Float32Array(A*S*4*f),T=new Ic(E,A,S,f);T.type=nn,T.needsUpdate=!0;let _=y*4;for(let C=0;C<f;C++){let R=g[C],w=m[C],P=x[C],F=A*S*4*C;for(let N=0;N<R.count;N++){let O=N*_;d===!0&&(r.fromBufferAttribute(R,N),E[F+O+0]=r.x,E[F+O+1]=r.y,E[F+O+2]=r.z,E[F+O+3]=0),p===!0&&(r.fromBufferAttribute(w,N),E[F+O+4]=r.x,E[F+O+5]=r.y,E[F+O+6]=r.z,E[F+O+7]=0),v===!0&&(r.fromBufferAttribute(P,N),E[F+O+8]=r.x,E[F+O+9]=r.y,E[F+O+10]=r.z,E[F+O+11]=P.itemSize===4?r.w:1)}}h={count:f,texture:T,size:new we(A,S)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function lb(i,e,t,n,r){let s=new WeakMap;function a(c){let u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var cb={[jm]:"LINEAR_TONE_MAPPING",[$m]:"REINHARD_TONE_MAPPING",[eg]:"CINEON_TONE_MAPPING",[tg]:"ACES_FILMIC_TONE_MAPPING",[ig]:"AGX_TONE_MAPPING",[rg]:"NEUTRAL_TONE_MAPPING",[ng]:"CUSTOM_TONE_MAPPING"};function ub(i,e,t,n,r){let s=new vt(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),a=new vt(e,t,{type:li,depthBuffer:!1,stencilBuffer:!1}),o=new Lt;o.setAttribute("position",new on([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new on([0,2,0,0,2,0],2));let l=new lf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Rt(o,l),u=new us(-1,1,1,-1,0,1),f=null,h=null,d=!1,p,v=null,g=[],m=!1;this.setSize=function(x,y){s.setSize(x,y),a.setSize(x,y);for(let A=0;A<g.length;A++){let S=g[A];S.setSize&&S.setSize(x,y)}},this.setEffects=function(x){g=x,m=g.length>0&&g[0].isRenderPass===!0;let y=s.width,A=s.height;for(let S=0;S<g.length;S++){let E=g[S];E.setSize&&E.setSize(y,A)}},this.begin=function(x,y){if(d||x.toneMapping===Ki&&g.length===0)return!1;if(v=y,y!==null){let A=y.width,S=y.height;(s.width!==A||s.height!==S)&&this.setSize(A,S)}return m===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=Ki,!0},this.hasRenderPass=function(){return m},this.end=function(x,y){x.toneMapping=p,d=!0;let A=s,S=a;for(let E=0;E<g.length;E++){let T=g[E];if(T.enabled!==!1&&(T.render(x,S,A,y),T.needsSwap!==!1)){let _=A;A=S,S=_}}if(f!==x.outputColorSpace||h!==x.toneMapping){f=x.outputColorSpace,h=x.toneMapping,l.defines={},At.getTransfer(f)===Ut&&(l.defines.SRGB_TRANSFER="");let E=cb[h];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,x.setRenderTarget(v),x.render(c,u),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),l.dispose()}}var hy=new Rn,Mg=new Fi(1,1),fy=new Ic,dy=new nf,py=new Hc,q_=[],Q_=[],Z_=new Float32Array(16),K_=new Float32Array(9),J_=new Float32Array(4);function hl(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=q_[r];if(s===void 0&&(s=new Float32Array(r),q_[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Dn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hd(i,e){let t=Q_[e];t===void 0&&(t=new Int32Array(e),Q_[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function hb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function fb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2fv(this.addr,e),Pn(t,e)}}function db(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dn(t,e))return;i.uniform3fv(this.addr,e),Pn(t,e)}}function pb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4fv(this.addr,e),Pn(t,e)}}function mb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;J_.set(n),i.uniformMatrix2fv(this.addr,!1,J_),Pn(t,n)}}function gb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;K_.set(n),i.uniformMatrix3fv(this.addr,!1,K_),Pn(t,n)}}function vb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;Z_.set(n),i.uniformMatrix4fv(this.addr,!1,Z_),Pn(t,n)}}function xb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function _b(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2iv(this.addr,e),Pn(t,e)}}function yb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;i.uniform3iv(this.addr,e),Pn(t,e)}}function Ab(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4iv(this.addr,e),Pn(t,e)}}function Sb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Mb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2uiv(this.addr,e),Pn(t,e)}}function Tb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;i.uniform3uiv(this.addr,e),Pn(t,e)}}function Eb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4uiv(this.addr,e),Pn(t,e)}}function wb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Mg.compareFunction=t.isReversedDepthBuffer()?ad:sd,s=Mg):s=hy,t.setTexture2D(e||s,r)}function bb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||dy,r)}function Cb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||py,r)}function Rb(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||fy,r)}function Db(i){switch(i){case 5126:return hb;case 35664:return fb;case 35665:return db;case 35666:return pb;case 35674:return mb;case 35675:return gb;case 35676:return vb;case 5124:case 35670:return xb;case 35667:case 35671:return _b;case 35668:case 35672:return yb;case 35669:case 35673:return Ab;case 5125:return Sb;case 36294:return Mb;case 36295:return Tb;case 36296:return Eb;case 35678:case 36198:case 36298:case 36306:case 35682:return wb;case 35679:case 36299:case 36307:return bb;case 35680:case 36300:case 36308:case 36293:return Cb;case 36289:case 36303:case 36311:case 36292:return Rb}}function Pb(i,e){i.uniform1fv(this.addr,e)}function Ib(i,e){let t=hl(e,this.size,2);i.uniform2fv(this.addr,t)}function Bb(i,e){let t=hl(e,this.size,3);i.uniform3fv(this.addr,t)}function Ub(i,e){let t=hl(e,this.size,4);i.uniform4fv(this.addr,t)}function Lb(i,e){let t=hl(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Fb(i,e){let t=hl(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Nb(i,e){let t=hl(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ob(i,e){i.uniform1iv(this.addr,e)}function kb(i,e){i.uniform2iv(this.addr,e)}function zb(i,e){i.uniform3iv(this.addr,e)}function Hb(i,e){i.uniform4iv(this.addr,e)}function Gb(i,e){i.uniform1uiv(this.addr,e)}function Vb(i,e){i.uniform2uiv(this.addr,e)}function Wb(i,e){i.uniform3uiv(this.addr,e)}function Xb(i,e){i.uniform4uiv(this.addr,e)}function Yb(i,e,t){let n=this.cache,r=e.length,s=hd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Mg:a=hy;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function qb(i,e,t){let n=this.cache,r=e.length,s=hd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||dy,s[a])}function Qb(i,e,t){let n=this.cache,r=e.length,s=hd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||py,s[a])}function Zb(i,e,t){let n=this.cache,r=e.length,s=hd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||fy,s[a])}function Kb(i){switch(i){case 5126:return Pb;case 35664:return Ib;case 35665:return Bb;case 35666:return Ub;case 35674:return Lb;case 35675:return Fb;case 35676:return Nb;case 5124:case 35670:return Ob;case 35667:case 35671:return kb;case 35668:case 35672:return zb;case 35669:case 35673:return Hb;case 5125:return Gb;case 36294:return Vb;case 36295:return Wb;case 36296:return Xb;case 35678:case 36198:case 36298:case 36306:case 35682:return Yb;case 35679:case 36299:case 36307:return qb;case 35680:case 36300:case 36308:case 36293:return Qb;case 36289:case 36303:case 36311:case 36292:return Zb}}var Tg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Db(t.type)}},Eg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kb(t.type)}},wg=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Ag=/(\w+)(\])?(\[|\.)?/g;function j_(i,e){i.seq.push(e),i.map[e.id]=e}function Jb(i,e,t){let n=i.name,r=n.length;for(Ag.lastIndex=0;;){let s=Ag.exec(n),a=Ag.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){j_(t,c===void 0?new Tg(o,i,e):new Eg(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new wg(o),j_(t,f)),t=f}}}var ll=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Jb(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function $_(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var jb=37297,$b=0;function eC(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var ey=new $e;function tC(i){At._getMatrix(ey,At.workingColorSpace,i);let e=`mat3( ${ey.elements.map(t=>t.toFixed(4))} )`;switch(At.getTransfer(i)){case bc:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return Je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ty(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+eC(i.getShaderSource(e),o)}else return s}function nC(i,e){let t=tC(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var iC={[jm]:"Linear",[$m]:"Reinhard",[eg]:"Cineon",[tg]:"ACESFilmic",[ig]:"AgX",[rg]:"Neutral",[ng]:"Custom"};function rC(i,e){let t=iC[e];return t===void 0?(Je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ld=new B;function sC(){At.getLuminanceCoefficients(ld);let i=ld.x.toFixed(4),e=ld.y.toFixed(4),t=ld.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aC(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(au).join(`
`)}function oC(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lC(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function au(i){return i!==""}function ny(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function iy(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var cC=/^[ \t]*#include +<([\w\d./]+)>/gm;function bg(i){return i.replace(cC,hC)}var uC=new Map;function hC(i,e){let t=ht[e];if(t===void 0){let n=uC.get(e);if(n!==void 0)t=ht[n],Je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return bg(t)}var fC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ry(i){return i.replace(fC,dC)}function dC(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function sy(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var pC={[Zc]:"SHADOWMAP_TYPE_PCF",[rl]:"SHADOWMAP_TYPE_VSM"};function mC(i){return pC[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var gC={[Ws]:"ENVMAP_TYPE_CUBE",[Va]:"ENVMAP_TYPE_CUBE",[Kc]:"ENVMAP_TYPE_CUBE_UV"};function vC(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":gC[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var xC={[Va]:"ENVMAP_MODE_REFRACTION"};function _C(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":xC[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var yC={[Jm]:"ENVMAP_BLENDING_MULTIPLY",[T_]:"ENVMAP_BLENDING_MIX",[E_]:"ENVMAP_BLENDING_ADD"};function AC(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":yC[i.combine]||"ENVMAP_BLENDING_NONE"}function SC(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function MC(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=mC(t),c=vC(t),u=_C(t),f=AC(t),h=SC(t),d=aC(t),p=oC(s),v=r.createProgram(),g,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(au).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(au).join(`
`),m.length>0&&(m+=`
`)):(g=[sy(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(au).join(`
`),m=[sy(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ki?"#define TONE_MAPPING":"",t.toneMapping!==Ki?ht.tonemapping_pars_fragment:"",t.toneMapping!==Ki?rC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,nC("linearToOutputTexel",t.outputColorSpace),sC(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(au).join(`
`)),a=bg(a),a=ny(a,t),a=iy(a,t),o=bg(o),o=ny(o,t),o=iy(o,t),a=ry(a),o=ry(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===iu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===iu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let y=x+g+a,A=x+m+o,S=$_(r,r.VERTEX_SHADER,y),E=$_(r,r.FRAGMENT_SHADER,A);r.attachShader(v,S),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function T(R){if(i.debug.checkShaderErrors){let w=r.getProgramInfoLog(v)||"",P=r.getShaderInfoLog(S)||"",F=r.getShaderInfoLog(E)||"",N=w.trim(),O=P.trim(),H=F.trim(),j=!0,G=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,S,E);else{let I=ty(r,S,"vertex"),te=ty(r,E,"fragment");Ke("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+I+`
`+te)}else N!==""?Je("WebGLProgram: Program Info Log:",N):(O===""||H==="")&&(G=!1);G&&(R.diagnostics={runnable:j,programLog:N,vertexShader:{log:O,prefix:g},fragmentShader:{log:H,prefix:m}})}r.deleteShader(S),r.deleteShader(E),_=new ll(r,v),M=lC(r,v)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(v,jb)),C},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$b++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=E,this}var TC=0,Cg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Rg(e),t.set(e,n)),n}},Rg=class{constructor(e){this.id=TC++,this.code=e,this.usedTimes=0}};function EC(i,e,t,n,r,s){let a=new Bc,o=new Cg,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,M,C,R,w){let P=R.fog,F=w.geometry,N=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,O=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,H=e.get(_.envMap||N,O),j=H&&H.mapping===Kc?H.image.height:null,G=d[_.type];_.precision!==null&&(h=n.getMaxPrecision(_.precision),h!==_.precision&&Je("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));let I=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,te=I!==void 0?I.length:0,ie=0;F.morphAttributes.position!==void 0&&(ie=1),F.morphAttributes.normal!==void 0&&(ie=2),F.morphAttributes.color!==void 0&&(ie=3);let xe,ye,Ne,Q;if(G){let Ue=Hr[G];xe=Ue.vertexShader,ye=Ue.fragmentShader}else xe=_.vertexShader,ye=_.fragmentShader,o.update(_),Ne=o.getVertexShaderID(_),Q=o.getFragmentShaderID(_);let se=i.getRenderTarget(),ae=i.state.buffers.depth.getReversed(),re=w.isInstancedMesh===!0,he=w.isBatchedMesh===!0,me=!!_.map,Ae=!!_.matcap,oe=!!H,Ee=!!_.aoMap,Oe=!!_.lightMap,_e=!!_.bumpMap,q=!!_.normalMap,z=!!_.displacementMap,Ve=!!_.emissiveMap,Be=!!_.metalnessMap,Ie=!!_.roughnessMap,ge=_.anisotropy>0,L=_.clearcoat>0,b=_.dispersion>0,W=_.iridescence>0,ee=_.sheen>0,U=_.transmission>0,k=ge&&!!_.anisotropyMap,Y=L&&!!_.clearcoatMap,$=L&&!!_.clearcoatNormalMap,fe=L&&!!_.clearcoatRoughnessMap,pe=W&&!!_.iridescenceMap,le=W&&!!_.iridescenceThicknessMap,ce=ee&&!!_.sheenColorMap,Le=ee&&!!_.sheenRoughnessMap,Fe=!!_.specularMap,be=!!_.specularColorMap,et=!!_.specularIntensityMap,V=U&&!!_.transmissionMap,ve=U&&!!_.thicknessMap,de=!!_.gradientMap,Ce=!!_.alphaMap,ue=_.alphaTest>0,ne=!!_.alphaHash,ke=!!_.extensions,Qe=Ki;_.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Qe=i.toneMapping);let Tt={shaderID:G,shaderType:_.type,shaderName:_.name,vertexShader:xe,fragmentShader:ye,defines:_.defines,customVertexShaderID:Ne,customFragmentShaderID:Q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:he,batchingColor:he&&w._colorsTexture!==null,instancing:re,instancingColor:re&&w.instanceColor!==null,instancingMorph:re&&w.morphTexture!==null,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Ui,alphaToCoverage:!!_.alphaToCoverage,map:me,matcap:Ae,envMap:oe,envMapMode:oe&&H.mapping,envMapCubeUVHeight:j,aoMap:Ee,lightMap:Oe,bumpMap:_e,normalMap:q,displacementMap:z,emissiveMap:Ve,normalMapObjectSpace:q&&_.normalMapType===b_,normalMapTangentSpace:q&&_.normalMapType===ug,metalnessMap:Be,roughnessMap:Ie,anisotropy:ge,anisotropyMap:k,clearcoat:L,clearcoatMap:Y,clearcoatNormalMap:$,clearcoatRoughnessMap:fe,dispersion:b,iridescence:W,iridescenceMap:pe,iridescenceThicknessMap:le,sheen:ee,sheenColorMap:ce,sheenRoughnessMap:Le,specularMap:Fe,specularColorMap:be,specularIntensityMap:et,transmission:U,transmissionMap:V,thicknessMap:ve,gradientMap:de,opaque:_.transparent===!1&&_.blending===Na&&_.alphaToCoverage===!1,alphaMap:Ce,alphaTest:ue,alphaHash:ne,combine:_.combine,mapUv:me&&p(_.map.channel),aoMapUv:Ee&&p(_.aoMap.channel),lightMapUv:Oe&&p(_.lightMap.channel),bumpMapUv:_e&&p(_.bumpMap.channel),normalMapUv:q&&p(_.normalMap.channel),displacementMapUv:z&&p(_.displacementMap.channel),emissiveMapUv:Ve&&p(_.emissiveMap.channel),metalnessMapUv:Be&&p(_.metalnessMap.channel),roughnessMapUv:Ie&&p(_.roughnessMap.channel),anisotropyMapUv:k&&p(_.anisotropyMap.channel),clearcoatMapUv:Y&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:$&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:le&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Le&&p(_.sheenRoughnessMap.channel),specularMapUv:Fe&&p(_.specularMap.channel),specularColorMapUv:be&&p(_.specularColorMap.channel),specularIntensityMapUv:et&&p(_.specularIntensityMap.channel),transmissionMapUv:V&&p(_.transmissionMap.channel),thicknessMapUv:ve&&p(_.thicknessMap.channel),alphaMapUv:Ce&&p(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(q||ge),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!F.attributes.uv&&(me||Ce),fog:!!P,useFog:_.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&q===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ae,skinning:w.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ie,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,decodeVideoTexture:me&&_.map.isVideoTexture===!0&&At.getTransfer(_.map.colorSpace)===Ut,decodeVideoTextureEmissive:Ve&&_.emissiveMap.isVideoTexture===!0&&At.getTransfer(_.emissiveMap.colorSpace)===Ut,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gn,flipSided:_.side===tn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ke&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&_.extensions.multiDraw===!0||he)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function g(_){let M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)M.push(C),M.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(m(M,_),x(M,_),M.push(i.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function m(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function x(_,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),_.push(a.mask)}function y(_){let M=d[_.type],C;if(M){let R=Hr[M];C=z_.clone(R.uniforms)}else C=_.uniforms;return C}function A(_,M){let C=u.get(M);return C!==void 0?++C.usedTimes:(C=new MC(i,M,_,r),c.push(C),u.set(M,C)),C}function S(_){if(--_.usedTimes===0){let M=c.indexOf(_);c[M]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function T(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:y,acquireProgram:A,releaseProgram:S,releaseShaderCache:E,programs:c,dispose:T}}function wC(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function bC(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ay(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function oy(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,v,g,m){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},i[e]=x):(x.id=h.id,x.object=h,x.geometry=d,x.material=p,x.materialVariant=a(h),x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=g,x.group=m),e++,x}function l(h,d,p,v,g,m){let x=o(h,d,p,v,g,m);p.transmission>0?n.push(x):p.transparent===!0?r.push(x):t.push(x)}function c(h,d,p,v,g,m){let x=o(h,d,p,v,g,m);p.transmission>0?n.unshift(x):p.transparent===!0?r.unshift(x):t.unshift(x)}function u(h,d){t.length>1&&t.sort(h||bC),n.length>1&&n.sort(d||ay),r.length>1&&r.sort(d||ay)}function f(){for(let h=e,d=i.length;h<d;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function CC(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new oy,i.set(n,[a])):r>=s.length?(a=new oy,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function RC(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ye};break;case"SpotLight":t={position:new B,direction:new B,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function DC(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var PC=0;function IC(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function BC(i){let e=new RC,t=DC(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);let r=new B,s=new je,a=new je;function o(c){let u=0,f=0,h=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,x=0,y=0,A=0,S=0,E=0,T=0;c.sort(IC);for(let M=0,C=c.length;M<C;M++){let R=c[M],w=R.color,P=R.intensity,F=R.distance,N=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===hs?N=R.shadow.map.texture:N=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=w.r*P,f+=w.g*P,h+=w.b*P;else if(R.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(R.sh.coefficients[O],P);T++}else if(R.isDirectionalLight){let O=e.get(R);if(O.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let H=R.shadow,j=t.get(R);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,n.directionalShadow[d]=j,n.directionalShadowMap[d]=N,n.directionalShadowMatrix[d]=R.shadow.matrix,x++}n.directional[d]=O,d++}else if(R.isSpotLight){let O=e.get(R);O.position.setFromMatrixPosition(R.matrixWorld),O.color.copy(w).multiplyScalar(P),O.distance=F,O.coneCos=Math.cos(R.angle),O.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),O.decay=R.decay,n.spot[v]=O;let H=R.shadow;if(R.map&&(n.spotLightMap[S]=R.map,S++,H.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[v]=H.matrix,R.castShadow){let j=t.get(R);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,n.spotShadow[v]=j,n.spotShadowMap[v]=N,A++}v++}else if(R.isRectAreaLight){let O=e.get(R);O.color.copy(w).multiplyScalar(P),O.halfWidth.set(R.width*.5,0,0),O.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=O,g++}else if(R.isPointLight){let O=e.get(R);if(O.color.copy(R.color).multiplyScalar(R.intensity),O.distance=R.distance,O.decay=R.decay,R.castShadow){let H=R.shadow,j=t.get(R);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,j.shadowCameraNear=H.camera.near,j.shadowCameraFar=H.camera.far,n.pointShadow[p]=j,n.pointShadowMap[p]=N,n.pointShadowMatrix[p]=R.shadow.matrix,y++}n.point[p]=O,p++}else if(R.isHemisphereLight){let O=e.get(R);O.skyColor.copy(R.color).multiplyScalar(P),O.groundColor.copy(R.groundColor).multiplyScalar(P),n.hemi[m]=O,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let _=n.hash;(_.directionalLength!==d||_.pointLength!==p||_.spotLength!==v||_.rectAreaLength!==g||_.hemiLength!==m||_.numDirectionalShadows!==x||_.numPointShadows!==y||_.numSpotShadows!==A||_.numSpotMaps!==S||_.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=A+S-E,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,_.directionalLength=d,_.pointLength=p,_.spotLength=v,_.rectAreaLength=g,_.hemiLength=m,_.numDirectionalShadows=x,_.numPointShadows=y,_.numSpotShadows=A,_.numSpotMaps=S,_.numLightProbes=T,n.version=PC++)}function l(c,u){let f=0,h=0,d=0,p=0,v=0,g=u.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){let y=c[m];if(y.isDirectionalLight){let A=n.directional[f];A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(g),f++}else if(y.isSpotLight){let A=n.spot[d];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(g),d++}else if(y.isRectAreaLight){let A=n.rectArea[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),p++}else if(y.isPointLight){let A=n.point[h];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),h++}else if(y.isHemisphereLight){let A=n.hemi[v];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function ly(i){let e=new BC(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function UC(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new ly(i),e.set(r,[o])):s>=a.length?(o=new ly(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var LC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,FC=`uniform sampler2D shadow_pass;
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
}`,NC=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],OC=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],cy=new je,su=new B,Sg=new B;function kC(i,e,t){let n=new kc,r=new we,s=new we,a=new St,o=new cf,l=new uf,c={},u=t.maxTextureSize,f={[ai]:tn,[tn]:ai,[gn]:gn},h=new rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:LC,fragmentShader:FC}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let p=new Lt;p.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Rt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zc;let m=this.type;this.render=function(E,T,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===s_&&(Je("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Zc);let M=i.getRenderTarget(),C=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),w=i.state;w.setBlending(Ft),w.buffers.depth.getReversed()===!0?w.buffers.color.setClear(0,0,0,0):w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);let P=m!==this.type;P&&T.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(N=>N.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,N=E.length;F<N;F++){let O=E[F],H=O.shadow;if(H===void 0){Je("WebGLShadowMap:",O,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);let j=H.getFrameExtents();r.multiply(j),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,H.mapSize.y=s.y));let G=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=G,H.map===null||P===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===rl){if(O.isPointLight){Je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new vt(r.x,r.y,{format:hs,type:li,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),H.map.texture.name=O.name+".shadowMap",H.map.depthTexture=new Fi(r.x,r.y,nn),H.map.depthTexture.name=O.name+".shadowMapDepth",H.map.depthTexture.format=lr,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Ct,H.map.depthTexture.magFilter=Ct}else O.isPointLight?(H.map=new ul(r.x),H.map.depthTexture=new af(r.x,An)):(H.map=new vt(r.x,r.y),H.map.depthTexture=new Fi(r.x,r.y,An)),H.map.depthTexture.name=O.name+".shadowMap",H.map.depthTexture.format=lr,this.type===Zc?(H.map.depthTexture.compareFunction=G?ad:sd,H.map.depthTexture.minFilter=Vt,H.map.depthTexture.magFilter=Vt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Ct,H.map.depthTexture.magFilter=Ct);H.camera.updateProjectionMatrix()}let I=H.map.isWebGLCubeRenderTarget?6:1;for(let te=0;te<I;te++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,te),i.clear();else{te===0&&(i.setRenderTarget(H.map),i.clear());let ie=H.getViewport(te);a.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),w.viewport(a)}if(O.isPointLight){let ie=H.camera,xe=H.matrix,ye=O.distance||ie.far;ye!==ie.far&&(ie.far=ye,ie.updateProjectionMatrix()),su.setFromMatrixPosition(O.matrixWorld),ie.position.copy(su),Sg.copy(ie.position),Sg.add(NC[te]),ie.up.copy(OC[te]),ie.lookAt(Sg),ie.updateMatrixWorld(),xe.makeTranslation(-su.x,-su.y,-su.z),cy.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),H._frustum.setFromProjectionMatrix(cy,ie.coordinateSystem,ie.reversedDepth)}else H.updateMatrices(O);n=H.getFrustum(),A(T,_,H.camera,O,this.type)}H.isPointLightShadow!==!0&&this.type===rl&&x(H,_),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(M,C,R)};function x(E,T){let _=e.update(v);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new vt(r.x,r.y,{format:hs,type:li})),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(T,null,_,h,v,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(T,null,_,d,v,null)}function y(E,T,_,M){let C=null,R=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)C=R;else if(C=_.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let w=C.uuid,P=T.uuid,F=c[w];F===void 0&&(F={},c[w]=F);let N=F[P];N===void 0&&(N=C.clone(),F[P]=N,T.addEventListener("dispose",S)),C=N}if(C.visible=T.visible,C.wireframe=T.wireframe,M===rl?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:f[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let w=i.properties.get(C);w.light=_}return C}function A(E,T,_,M,C){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&C===rl)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);let P=e.update(E),F=E.material;if(Array.isArray(F)){let N=P.groups;for(let O=0,H=N.length;O<H;O++){let j=N[O],G=F[j.materialIndex];if(G&&G.visible){let I=y(E,G,M,C);E.onBeforeShadow(i,E,T,_,P,I,j),i.renderBufferDirect(_,null,P,I,E,j),E.onAfterShadow(i,E,T,_,P,I,j)}}}else if(F.visible){let N=y(E,F,M,C);E.onBeforeShadow(i,E,T,_,P,N,null),i.renderBufferDirect(_,null,P,N,E,null),E.onAfterShadow(i,E,T,_,P,N,null)}}let w=E.children;for(let P=0,F=w.length;P<F;P++)A(w[P],T,_,M,C)}function S(E){E.target.removeEventListener("dispose",S);for(let _ in c){let M=c[_],C=E.target.uuid;C in M&&(M[C].dispose(),delete M[C])}}}function zC(i,e){function t(){let V=!1,ve=new St,de=null,Ce=new St(0,0,0,0);return{setMask:function(ue){de!==ue&&!V&&(i.colorMask(ue,ue,ue,ue),de=ue)},setLocked:function(ue){V=ue},setClear:function(ue,ne,ke,Qe,Tt){Tt===!0&&(ue*=Qe,ne*=Qe,ke*=Qe),ve.set(ue,ne,ke,Qe),Ce.equals(ve)===!1&&(i.clearColor(ue,ne,ke,Qe),Ce.copy(ve))},reset:function(){V=!1,de=null,Ce.set(-1,0,0,0)}}}function n(){let V=!1,ve=!1,de=null,Ce=null,ue=null;return{setReversed:function(ne){if(ve!==ne){let ke=e.get("EXT_clip_control");ne?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),ve=ne;let Qe=ue;ue=null,this.setClear(Qe)}},getReversed:function(){return ve},setTest:function(ne){ne?se(i.DEPTH_TEST):ae(i.DEPTH_TEST)},setMask:function(ne){de!==ne&&!V&&(i.depthMask(ne),de=ne)},setFunc:function(ne){if(ve&&(ne=N_[ne]),Ce!==ne){switch(ne){case Xh:i.depthFunc(i.NEVER);break;case Qo:i.depthFunc(i.ALWAYS);break;case Yh:i.depthFunc(i.LESS);break;case Oa:i.depthFunc(i.LEQUAL);break;case qh:i.depthFunc(i.EQUAL);break;case Qh:i.depthFunc(i.GEQUAL);break;case Zh:i.depthFunc(i.GREATER);break;case Kh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ce=ne}},setLocked:function(ne){V=ne},setClear:function(ne){ue!==ne&&(ue=ne,ve&&(ne=1-ne),i.clearDepth(ne))},reset:function(){V=!1,de=null,Ce=null,ue=null,ve=!1}}}function r(){let V=!1,ve=null,de=null,Ce=null,ue=null,ne=null,ke=null,Qe=null,Tt=null;return{setTest:function(Ue){V||(Ue?se(i.STENCIL_TEST):ae(i.STENCIL_TEST))},setMask:function(Ue){ve!==Ue&&!V&&(i.stencilMask(Ue),ve=Ue)},setFunc:function(Ue,We,ct){(de!==Ue||Ce!==We||ue!==ct)&&(i.stencilFunc(Ue,We,ct),de=Ue,Ce=We,ue=ct)},setOp:function(Ue,We,ct){(ne!==Ue||ke!==We||Qe!==ct)&&(i.stencilOp(Ue,We,ct),ne=Ue,ke=We,Qe=ct)},setLocked:function(Ue){V=Ue},setClear:function(Ue){Tt!==Ue&&(i.clearStencil(Ue),Tt=Ue)},reset:function(){V=!1,ve=null,de=null,Ce=null,ue=null,ne=null,ke=null,Qe=null,Tt=null}}}let s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap,u={},f={},h=new WeakMap,d=[],p=null,v=!1,g=null,m=null,x=null,y=null,A=null,S=null,E=null,T=new Ye(0,0,0),_=0,M=!1,C=null,R=null,w=null,P=null,F=null,N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,H=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(j)[1]),O=H>=1):j.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),O=H>=2);let G=null,I={},te=i.getParameter(i.SCISSOR_BOX),ie=i.getParameter(i.VIEWPORT),xe=new St().fromArray(te),ye=new St().fromArray(ie);function Ne(V,ve,de,Ce){let ue=new Uint8Array(4),ne=i.createTexture();i.bindTexture(V,ne),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<de;ke++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(ve,0,i.RGBA,1,1,Ce,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(ve+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return ne}let Q={};Q[i.TEXTURE_2D]=Ne(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=Ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=Ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=Ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(i.DEPTH_TEST),a.setFunc(Oa),_e(!1),q(Qm),se(i.CULL_FACE),Ee(Ft);function se(V){u[V]!==!0&&(i.enable(V),u[V]=!0)}function ae(V){u[V]!==!1&&(i.disable(V),u[V]=!1)}function re(V,ve){return f[V]!==ve?(i.bindFramebuffer(V,ve),f[V]=ve,V===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ve),V===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ve),!0):!1}function he(V,ve){let de=d,Ce=!1;if(V){de=h.get(ve),de===void 0&&(de=[],h.set(ve,de));let ue=V.textures;if(de.length!==ue.length||de[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,ke=ue.length;ne<ke;ne++)de[ne]=i.COLOR_ATTACHMENT0+ne;de.length=ue.length,Ce=!0}}else de[0]!==i.BACK&&(de[0]=i.BACK,Ce=!0);Ce&&i.drawBuffers(de)}function me(V){return p!==V?(i.useProgram(V),p=V,!0):!1}let Ae={[ks]:i.FUNC_ADD,[o_]:i.FUNC_SUBTRACT,[l_]:i.FUNC_REVERSE_SUBTRACT};Ae[c_]=i.MIN,Ae[u_]=i.MAX;let oe={[h_]:i.ZERO,[f_]:i.ONE,[d_]:i.SRC_COLOR,[Vh]:i.SRC_ALPHA,[__]:i.SRC_ALPHA_SATURATE,[v_]:i.DST_COLOR,[m_]:i.DST_ALPHA,[p_]:i.ONE_MINUS_SRC_COLOR,[Wh]:i.ONE_MINUS_SRC_ALPHA,[x_]:i.ONE_MINUS_DST_COLOR,[g_]:i.ONE_MINUS_DST_ALPHA,[y_]:i.CONSTANT_COLOR,[A_]:i.ONE_MINUS_CONSTANT_COLOR,[S_]:i.CONSTANT_ALPHA,[M_]:i.ONE_MINUS_CONSTANT_ALPHA};function Ee(V,ve,de,Ce,ue,ne,ke,Qe,Tt,Ue){if(V===Ft){v===!0&&(ae(i.BLEND),v=!1);return}if(v===!1&&(se(i.BLEND),v=!0),V!==a_){if(V!==g||Ue!==M){if((m!==ks||A!==ks)&&(i.blendEquation(i.FUNC_ADD),m=ks,A=ks),Ue)switch(V){case Na:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vs:i.blendFunc(i.ONE,i.ONE);break;case Zm:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Km:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ke("WebGLState: Invalid blending: ",V);break}else switch(V){case Na:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zm:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Km:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",V);break}x=null,y=null,S=null,E=null,T.set(0,0,0),_=0,g=V,M=Ue}return}ue=ue||ve,ne=ne||de,ke=ke||Ce,(ve!==m||ue!==A)&&(i.blendEquationSeparate(Ae[ve],Ae[ue]),m=ve,A=ue),(de!==x||Ce!==y||ne!==S||ke!==E)&&(i.blendFuncSeparate(oe[de],oe[Ce],oe[ne],oe[ke]),x=de,y=Ce,S=ne,E=ke),(Qe.equals(T)===!1||Tt!==_)&&(i.blendColor(Qe.r,Qe.g,Qe.b,Tt),T.copy(Qe),_=Tt),g=V,M=!1}function Oe(V,ve){V.side===gn?ae(i.CULL_FACE):se(i.CULL_FACE);let de=V.side===tn;ve&&(de=!de),_e(de),V.blending===Na&&V.transparent===!1?Ee(Ft):Ee(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),s.setMask(V.colorWrite);let Ce=V.stencilWrite;o.setTest(Ce),Ce&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ve(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function _e(V){C!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),C=V)}function q(V){V!==i_?(se(i.CULL_FACE),V!==R&&(V===Qm?i.cullFace(i.BACK):V===r_?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ae(i.CULL_FACE),R=V}function z(V){V!==w&&(O&&i.lineWidth(V),w=V)}function Ve(V,ve,de){V?(se(i.POLYGON_OFFSET_FILL),(P!==ve||F!==de)&&(P=ve,F=de,a.getReversed()&&(ve=-ve),i.polygonOffset(ve,de))):ae(i.POLYGON_OFFSET_FILL)}function Be(V){V?se(i.SCISSOR_TEST):ae(i.SCISSOR_TEST)}function Ie(V){V===void 0&&(V=i.TEXTURE0+N-1),G!==V&&(i.activeTexture(V),G=V)}function ge(V,ve,de){de===void 0&&(G===null?de=i.TEXTURE0+N-1:de=G);let Ce=I[de];Ce===void 0&&(Ce={type:void 0,texture:void 0},I[de]=Ce),(Ce.type!==V||Ce.texture!==ve)&&(G!==de&&(i.activeTexture(de),G=de),i.bindTexture(V,ve||Q[V]),Ce.type=V,Ce.texture=ve)}function L(){let V=I[G];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(V){Ke("WebGLState:",V)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(V){Ke("WebGLState:",V)}}function ee(){try{i.texSubImage2D(...arguments)}catch(V){Ke("WebGLState:",V)}}function U(){try{i.texSubImage3D(...arguments)}catch(V){Ke("WebGLState:",V)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(V){Ke("WebGLState:",V)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(V){Ke("WebGLState:",V)}}function $(){try{i.texStorage2D(...arguments)}catch(V){Ke("WebGLState:",V)}}function fe(){try{i.texStorage3D(...arguments)}catch(V){Ke("WebGLState:",V)}}function pe(){try{i.texImage2D(...arguments)}catch(V){Ke("WebGLState:",V)}}function le(){try{i.texImage3D(...arguments)}catch(V){Ke("WebGLState:",V)}}function ce(V){xe.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),xe.copy(V))}function Le(V){ye.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),ye.copy(V))}function Fe(V,ve){let de=c.get(ve);de===void 0&&(de=new WeakMap,c.set(ve,de));let Ce=de.get(V);Ce===void 0&&(Ce=i.getUniformBlockIndex(ve,V.name),de.set(V,Ce))}function be(V,ve){let Ce=c.get(ve).get(V);l.get(ve)!==Ce&&(i.uniformBlockBinding(ve,Ce,V.__bindingPointIndex),l.set(ve,Ce))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},G=null,I={},f={},h=new WeakMap,d=[],p=null,v=!1,g=null,m=null,x=null,y=null,A=null,S=null,E=null,T=new Ye(0,0,0),_=0,M=!1,C=null,R=null,w=null,P=null,F=null,xe.set(0,0,i.canvas.width,i.canvas.height),ye.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:ae,bindFramebuffer:re,drawBuffers:he,useProgram:me,setBlending:Ee,setMaterial:Oe,setFlipSided:_e,setCullFace:q,setLineWidth:z,setPolygonOffset:Ve,setScissorTest:Be,activeTexture:Ie,bindTexture:ge,unbindTexture:L,compressedTexImage2D:b,compressedTexImage3D:W,texImage2D:pe,texImage3D:le,updateUBOMapping:Fe,uniformBlockBinding:be,texStorage2D:$,texStorage3D:fe,texSubImage2D:ee,texSubImage3D:U,compressedTexSubImage2D:k,compressedTexSubImage3D:Y,scissor:ce,viewport:Le,reset:et}}function HC(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new we,u=new WeakMap,f,h=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(L,b){return d?new OffscreenCanvas(L,b):Rc("canvas")}function v(L,b,W){let ee=1,U=ge(L);if((U.width>W||U.height>W)&&(ee=W/Math.max(U.width,U.height)),ee<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let k=Math.floor(ee*U.width),Y=Math.floor(ee*U.height);f===void 0&&(f=p(k,Y));let $=b?p(k,Y):f;return $.width=k,$.height=Y,$.getContext("2d").drawImage(L,0,0,k,Y),Je("WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+k+"x"+Y+")."),$}else return"data"in L&&Je("WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),L;return L}function g(L){return L.generateMipmaps}function m(L){i.generateMipmap(L)}function x(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(L,b,W,ee,U=!1){if(L!==null){if(i[L]!==void 0)return i[L];Je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let k=b;if(b===i.RED&&(W===i.FLOAT&&(k=i.R32F),W===i.HALF_FLOAT&&(k=i.R16F),W===i.UNSIGNED_BYTE&&(k=i.R8)),b===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.R8UI),W===i.UNSIGNED_SHORT&&(k=i.R16UI),W===i.UNSIGNED_INT&&(k=i.R32UI),W===i.BYTE&&(k=i.R8I),W===i.SHORT&&(k=i.R16I),W===i.INT&&(k=i.R32I)),b===i.RG&&(W===i.FLOAT&&(k=i.RG32F),W===i.HALF_FLOAT&&(k=i.RG16F),W===i.UNSIGNED_BYTE&&(k=i.RG8)),b===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.RG8UI),W===i.UNSIGNED_SHORT&&(k=i.RG16UI),W===i.UNSIGNED_INT&&(k=i.RG32UI),W===i.BYTE&&(k=i.RG8I),W===i.SHORT&&(k=i.RG16I),W===i.INT&&(k=i.RG32I)),b===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.RGB8UI),W===i.UNSIGNED_SHORT&&(k=i.RGB16UI),W===i.UNSIGNED_INT&&(k=i.RGB32UI),W===i.BYTE&&(k=i.RGB8I),W===i.SHORT&&(k=i.RGB16I),W===i.INT&&(k=i.RGB32I)),b===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(k=i.RGBA16UI),W===i.UNSIGNED_INT&&(k=i.RGBA32UI),W===i.BYTE&&(k=i.RGBA8I),W===i.SHORT&&(k=i.RGBA16I),W===i.INT&&(k=i.RGBA32I)),b===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(k=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(k=i.R11F_G11F_B10F)),b===i.RGBA){let Y=U?bc:At.getTransfer(ee);W===i.FLOAT&&(k=i.RGBA32F),W===i.HALF_FLOAT&&(k=i.RGBA16F),W===i.UNSIGNED_BYTE&&(k=Y===Ut?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(k=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(k=i.RGB5_A1)}return(k===i.R16F||k===i.R32F||k===i.RG16F||k===i.RG32F||k===i.RGBA16F||k===i.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function A(L,b){let W;return L?b===null||b===An||b===kr?W=i.DEPTH24_STENCIL8:b===nn?W=i.DEPTH32F_STENCIL8:b===Xs&&(W=i.DEPTH24_STENCIL8,Je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===An||b===kr?W=i.DEPTH_COMPONENT24:b===nn?W=i.DEPTH_COMPONENT32F:b===Xs&&(W=i.DEPTH_COMPONENT16),W}function S(L,b){return g(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ct&&L.minFilter!==Vt?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function E(L){let b=L.target;b.removeEventListener("dispose",E),_(b),b.isVideoTexture&&u.delete(b)}function T(L){let b=L.target;b.removeEventListener("dispose",T),C(b)}function _(L){let b=n.get(L);if(b.__webglInit===void 0)return;let W=L.source,ee=h.get(W);if(ee){let U=ee[b.__cacheKey];U.usedTimes--,U.usedTimes===0&&M(L),Object.keys(ee).length===0&&h.delete(W)}n.remove(L)}function M(L){let b=n.get(L);i.deleteTexture(b.__webglTexture);let W=L.source,ee=h.get(W);delete ee[b.__cacheKey],a.memory.textures--}function C(L){let b=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(b.__webglFramebuffer[ee]))for(let U=0;U<b.__webglFramebuffer[ee].length;U++)i.deleteFramebuffer(b.__webglFramebuffer[ee][U]);else i.deleteFramebuffer(b.__webglFramebuffer[ee]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[ee])}else{if(Array.isArray(b.__webglFramebuffer))for(let ee=0;ee<b.__webglFramebuffer.length;ee++)i.deleteFramebuffer(b.__webglFramebuffer[ee]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ee=0;ee<b.__webglColorRenderbuffer.length;ee++)b.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[ee]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let W=L.textures;for(let ee=0,U=W.length;ee<U;ee++){let k=n.get(W[ee]);k.__webglTexture&&(i.deleteTexture(k.__webglTexture),a.memory.textures--),n.remove(W[ee])}n.remove(L)}let R=0;function w(){R=0}function P(){let L=R;return L>=r.maxTextures&&Je("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),R+=1,L}function F(L){let b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.colorSpace),b.join()}function N(L,b){let W=n.get(L);if(L.isVideoTexture&&Be(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&W.__version!==L.version){let ee=L.image;if(ee===null)Je("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)Je("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(W,L,b);return}}else L.isExternalTexture&&(W.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+b)}function O(L,b){let W=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){Q(W,L,b);return}else L.isExternalTexture&&(W.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+b)}function H(L,b){let W=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){Q(W,L,b);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+b)}function j(L,b){let W=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&W.__version!==L.version){se(W,L,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+b)}let G={[Zo]:i.REPEAT,[Fr]:i.CLAMP_TO_EDGE,[Jh]:i.MIRRORED_REPEAT},I={[Ct]:i.NEAREST,[w_]:i.NEAREST_MIPMAP_NEAREST,[Jc]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[Tf]:i.LINEAR_MIPMAP_NEAREST,[Or]:i.LINEAR_MIPMAP_LINEAR},te={[C_]:i.NEVER,[B_]:i.ALWAYS,[R_]:i.LESS,[sd]:i.LEQUAL,[D_]:i.EQUAL,[ad]:i.GEQUAL,[P_]:i.GREATER,[I_]:i.NOTEQUAL};function ie(L,b){if(b.type===nn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Vt||b.magFilter===Tf||b.magFilter===Jc||b.magFilter===Or||b.minFilter===Vt||b.minFilter===Tf||b.minFilter===Jc||b.minFilter===Or)&&Je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,G[b.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,G[b.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,G[b.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,I[b.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,I[b.minFilter]),b.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,te[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ct||b.minFilter!==Jc&&b.minFilter!==Or||b.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function xe(L,b){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",E));let ee=b.source,U=h.get(ee);U===void 0&&(U={},h.set(ee,U));let k=F(b);if(k!==L.__cacheKey){U[k]===void 0&&(U[k]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),U[k].usedTimes++;let Y=U[L.__cacheKey];Y!==void 0&&(U[L.__cacheKey].usedTimes--,Y.usedTimes===0&&M(b)),L.__cacheKey=k,L.__webglTexture=U[k].texture}return W}function ye(L,b,W){return Math.floor(Math.floor(L/W)/b)}function Ne(L,b,W,ee){let k=L.updateRanges;if(k.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,W,ee,b.data);else{k.sort((le,ce)=>le.start-ce.start);let Y=0;for(let le=1;le<k.length;le++){let ce=k[Y],Le=k[le],Fe=ce.start+ce.count,be=ye(Le.start,b.width,4),et=ye(ce.start,b.width,4);Le.start<=Fe+1&&be===et&&ye(Le.start+Le.count-1,b.width,4)===be?ce.count=Math.max(ce.count,Le.start+Le.count-ce.start):(++Y,k[Y]=Le)}k.length=Y+1;let $=i.getParameter(i.UNPACK_ROW_LENGTH),fe=i.getParameter(i.UNPACK_SKIP_PIXELS),pe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let le=0,ce=k.length;le<ce;le++){let Le=k[le],Fe=Math.floor(Le.start/4),be=Math.ceil(Le.count/4),et=Fe%b.width,V=Math.floor(Fe/b.width),ve=be,de=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,et),i.pixelStorei(i.UNPACK_SKIP_ROWS,V),t.texSubImage2D(i.TEXTURE_2D,0,et,V,ve,de,W,ee,b.data)}L.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,$),i.pixelStorei(i.UNPACK_SKIP_PIXELS,fe),i.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function Q(L,b,W){let ee=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ee=i.TEXTURE_3D);let U=xe(L,b),k=b.source;t.bindTexture(ee,L.__webglTexture,i.TEXTURE0+W);let Y=n.get(k);if(k.version!==Y.__version||U===!0){t.activeTexture(i.TEXTURE0+W);let $=At.getPrimaries(At.workingColorSpace),fe=b.colorSpace===Ti?null:At.getPrimaries(b.colorSpace),pe=b.colorSpace===Ti||$===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let le=v(b.image,!1,r.maxTextureSize);le=Ie(b,le);let ce=s.convert(b.format,b.colorSpace),Le=s.convert(b.type),Fe=y(b.internalFormat,ce,Le,b.colorSpace,b.isVideoTexture);ie(ee,b);let be,et=b.mipmaps,V=b.isVideoTexture!==!0,ve=Y.__version===void 0||U===!0,de=k.dataReady,Ce=S(b,le);if(b.isDepthTexture)Fe=A(b.format===ur,b.type),ve&&(V?t.texStorage2D(i.TEXTURE_2D,1,Fe,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,Fe,le.width,le.height,0,ce,Le,null));else if(b.isDataTexture)if(et.length>0){V&&ve&&t.texStorage2D(i.TEXTURE_2D,Ce,Fe,et[0].width,et[0].height);for(let ue=0,ne=et.length;ue<ne;ue++)be=et[ue],V?de&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,be.width,be.height,ce,Le,be.data):t.texImage2D(i.TEXTURE_2D,ue,Fe,be.width,be.height,0,ce,Le,be.data);b.generateMipmaps=!1}else V?(ve&&t.texStorage2D(i.TEXTURE_2D,Ce,Fe,le.width,le.height),de&&Ne(b,le,ce,Le)):t.texImage2D(i.TEXTURE_2D,0,Fe,le.width,le.height,0,ce,Le,le.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){V&&ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Fe,et[0].width,et[0].height,le.depth);for(let ue=0,ne=et.length;ue<ne;ue++)if(be=et[ue],b.format!==Sn)if(ce!==null)if(V){if(de)if(b.layerUpdates.size>0){let ke=gg(be.width,be.height,b.format,b.type);for(let Qe of b.layerUpdates){let Tt=be.data.subarray(Qe*ke/be.data.BYTES_PER_ELEMENT,(Qe+1)*ke/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,Qe,be.width,be.height,1,ce,Tt)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,be.width,be.height,le.depth,ce,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,Fe,be.width,be.height,le.depth,0,be.data,0,0);else Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else V?de&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,be.width,be.height,le.depth,ce,Le,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,Fe,be.width,be.height,le.depth,0,ce,Le,be.data)}else{V&&ve&&t.texStorage2D(i.TEXTURE_2D,Ce,Fe,et[0].width,et[0].height);for(let ue=0,ne=et.length;ue<ne;ue++)be=et[ue],b.format!==Sn?ce!==null?V?de&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,be.width,be.height,ce,be.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,Fe,be.width,be.height,0,be.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):V?de&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,be.width,be.height,ce,Le,be.data):t.texImage2D(i.TEXTURE_2D,ue,Fe,be.width,be.height,0,ce,Le,be.data)}else if(b.isDataArrayTexture)if(V){if(ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Fe,le.width,le.height,le.depth),de)if(b.layerUpdates.size>0){let ue=gg(le.width,le.height,b.format,b.type);for(let ne of b.layerUpdates){let ke=le.data.subarray(ne*ue/le.data.BYTES_PER_ELEMENT,(ne+1)*ue/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,le.width,le.height,1,ce,Le,ke)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,ce,Le,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Fe,le.width,le.height,le.depth,0,ce,Le,le.data);else if(b.isData3DTexture)V?(ve&&t.texStorage3D(i.TEXTURE_3D,Ce,Fe,le.width,le.height,le.depth),de&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,ce,Le,le.data)):t.texImage3D(i.TEXTURE_3D,0,Fe,le.width,le.height,le.depth,0,ce,Le,le.data);else if(b.isFramebufferTexture){if(ve)if(V)t.texStorage2D(i.TEXTURE_2D,Ce,Fe,le.width,le.height);else{let ue=le.width,ne=le.height;for(let ke=0;ke<Ce;ke++)t.texImage2D(i.TEXTURE_2D,ke,Fe,ue,ne,0,ce,Le,null),ue>>=1,ne>>=1}}else if(et.length>0){if(V&&ve){let ue=ge(et[0]);t.texStorage2D(i.TEXTURE_2D,Ce,Fe,ue.width,ue.height)}for(let ue=0,ne=et.length;ue<ne;ue++)be=et[ue],V?de&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ce,Le,be):t.texImage2D(i.TEXTURE_2D,ue,Fe,ce,Le,be);b.generateMipmaps=!1}else if(V){if(ve){let ue=ge(le);t.texStorage2D(i.TEXTURE_2D,Ce,Fe,ue.width,ue.height)}de&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,Le,le)}else t.texImage2D(i.TEXTURE_2D,0,Fe,ce,Le,le);g(b)&&m(ee),Y.__version=k.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function se(L,b,W){if(b.image.length!==6)return;let ee=xe(L,b),U=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+W);let k=n.get(U);if(U.version!==k.__version||ee===!0){t.activeTexture(i.TEXTURE0+W);let Y=At.getPrimaries(At.workingColorSpace),$=b.colorSpace===Ti?null:At.getPrimaries(b.colorSpace),fe=b.colorSpace===Ti||Y===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);let pe=b.isCompressedTexture||b.image[0].isCompressedTexture,le=b.image[0]&&b.image[0].isDataTexture,ce=[];for(let ne=0;ne<6;ne++)!pe&&!le?ce[ne]=v(b.image[ne],!0,r.maxCubemapSize):ce[ne]=le?b.image[ne].image:b.image[ne],ce[ne]=Ie(b,ce[ne]);let Le=ce[0],Fe=s.convert(b.format,b.colorSpace),be=s.convert(b.type),et=y(b.internalFormat,Fe,be,b.colorSpace),V=b.isVideoTexture!==!0,ve=k.__version===void 0||ee===!0,de=U.dataReady,Ce=S(b,Le);ie(i.TEXTURE_CUBE_MAP,b);let ue;if(pe){V&&ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,et,Le.width,Le.height);for(let ne=0;ne<6;ne++){ue=ce[ne].mipmaps;for(let ke=0;ke<ue.length;ke++){let Qe=ue[ke];b.format!==Sn?Fe!==null?V?de&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke,0,0,Qe.width,Qe.height,Fe,Qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke,et,Qe.width,Qe.height,0,Qe.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke,0,0,Qe.width,Qe.height,Fe,be,Qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke,et,Qe.width,Qe.height,0,Fe,be,Qe.data)}}}else{if(ue=b.mipmaps,V&&ve){ue.length>0&&Ce++;let ne=ge(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,et,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(le){V?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ce[ne].width,ce[ne].height,Fe,be,ce[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,et,ce[ne].width,ce[ne].height,0,Fe,be,ce[ne].data);for(let ke=0;ke<ue.length;ke++){let Tt=ue[ke].image[ne].image;V?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke+1,0,0,Tt.width,Tt.height,Fe,be,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke+1,et,Tt.width,Tt.height,0,Fe,be,Tt.data)}}else{V?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Fe,be,ce[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,et,Fe,be,ce[ne]);for(let ke=0;ke<ue.length;ke++){let Qe=ue[ke];V?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke+1,0,0,Fe,be,Qe.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ke+1,et,Fe,be,Qe.image[ne])}}}g(b)&&m(i.TEXTURE_CUBE_MAP),k.__version=U.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function ae(L,b,W,ee,U,k){let Y=s.convert(W.format,W.colorSpace),$=s.convert(W.type),fe=y(W.internalFormat,Y,$,W.colorSpace),pe=n.get(b),le=n.get(W);if(le.__renderTarget=b,!pe.__hasExternalTextures){let ce=Math.max(1,b.width>>k),Le=Math.max(1,b.height>>k);U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?t.texImage3D(U,k,fe,ce,Le,b.depth,0,Y,$,null):t.texImage2D(U,k,fe,ce,Le,0,Y,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),Ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,U,le.__webglTexture,0,z(b)):(U===i.TEXTURE_2D||U>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&U<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,U,le.__webglTexture,k),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(L,b,W){if(i.bindRenderbuffer(i.RENDERBUFFER,L),b.depthBuffer){let ee=b.depthTexture,U=ee&&ee.isDepthTexture?ee.type:null,k=A(b.stencilBuffer,U),Y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ve(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,z(b),k,b.width,b.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,z(b),k,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,k,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,L)}else{let ee=b.textures;for(let U=0;U<ee.length;U++){let k=ee[U],Y=s.convert(k.format,k.colorSpace),$=s.convert(k.type),fe=y(k.internalFormat,Y,$,k.colorSpace);Ve(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,z(b),fe,b.width,b.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,z(b),fe,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,fe,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(L,b,W){let ee=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let U=n.get(b.depthTexture);if(U.__renderTarget=b,(!U.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ee){if(U.__webglInit===void 0&&(U.__webglInit=!0,b.depthTexture.addEventListener("dispose",E)),U.__webglTexture===void 0){U.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture),ie(i.TEXTURE_CUBE_MAP,b.depthTexture);let pe=s.convert(b.depthTexture.format),le=s.convert(b.depthTexture.type),ce;b.depthTexture.format===lr?ce=i.DEPTH_COMPONENT24:b.depthTexture.format===ur&&(ce=i.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,ce,b.width,b.height,0,pe,le,null)}}else N(b.depthTexture,0);let k=U.__webglTexture,Y=z(b),$=ee?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,fe=b.depthTexture.format===ur?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===lr)Ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,$,k,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,fe,$,k,0);else if(b.depthTexture.format===ur)Ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,$,k,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,fe,$,k,0);else throw new Error("Unknown depthTexture format")}function me(L){let b=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==L.depthTexture){let ee=L.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ee){let U=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ee.removeEventListener("dispose",U)};ee.addEventListener("dispose",U),b.__depthDisposeCallback=U}b.__boundDepthTexture=ee}if(L.depthTexture&&!b.__autoAllocateDepthBuffer)if(W)for(let ee=0;ee<6;ee++)he(b.__webglFramebuffer[ee],L,ee);else{let ee=L.texture.mipmaps;ee&&ee.length>0?he(b.__webglFramebuffer[0],L,0):he(b.__webglFramebuffer,L,0)}else if(W){b.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ee]),b.__webglDepthbuffer[ee]===void 0)b.__webglDepthbuffer[ee]=i.createRenderbuffer(),re(b.__webglDepthbuffer[ee],L,!1);else{let U=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=b.__webglDepthbuffer[ee];i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,k)}}else{let ee=L.texture.mipmaps;if(ee&&ee.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),re(b.__webglDepthbuffer,L,!1);else{let U=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,k)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ae(L,b,W){let ee=n.get(L);b!==void 0&&ae(ee.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&me(L)}function oe(L){let b=L.texture,W=n.get(L),ee=n.get(b);L.addEventListener("dispose",T);let U=L.textures,k=L.isWebGLCubeRenderTarget===!0,Y=U.length>1;if(Y||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=b.version,a.memory.textures++),k){W.__webglFramebuffer=[];for(let $=0;$<6;$++)if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer[$]=[];for(let fe=0;fe<b.mipmaps.length;fe++)W.__webglFramebuffer[$][fe]=i.createFramebuffer()}else W.__webglFramebuffer[$]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer=[];for(let $=0;$<b.mipmaps.length;$++)W.__webglFramebuffer[$]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Y)for(let $=0,fe=U.length;$<fe;$++){let pe=n.get(U[$]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&Ve(L)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let $=0;$<U.length;$++){let fe=U[$];W.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[$]);let pe=s.convert(fe.format,fe.colorSpace),le=s.convert(fe.type),ce=y(fe.internalFormat,pe,le,fe.colorSpace,L.isXRRenderTarget===!0),Le=z(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,ce,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,W.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),re(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(k){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),ie(i.TEXTURE_CUBE_MAP,b);for(let $=0;$<6;$++)if(b.mipmaps&&b.mipmaps.length>0)for(let fe=0;fe<b.mipmaps.length;fe++)ae(W.__webglFramebuffer[$][fe],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,fe);else ae(W.__webglFramebuffer[$],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);g(b)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Y){for(let $=0,fe=U.length;$<fe;$++){let pe=U[$],le=n.get(pe),ce=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ce=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,le.__webglTexture),ie(ce,pe),ae(W.__webglFramebuffer,L,pe,i.COLOR_ATTACHMENT0+$,ce,0),g(pe)&&m(ce)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&($=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,ee.__webglTexture),ie($,b),b.mipmaps&&b.mipmaps.length>0)for(let fe=0;fe<b.mipmaps.length;fe++)ae(W.__webglFramebuffer[fe],L,b,i.COLOR_ATTACHMENT0,$,fe);else ae(W.__webglFramebuffer,L,b,i.COLOR_ATTACHMENT0,$,0);g(b)&&m($),t.unbindTexture()}L.depthBuffer&&me(L)}function Ee(L){let b=L.textures;for(let W=0,ee=b.length;W<ee;W++){let U=b[W];if(g(U)){let k=x(L),Y=n.get(U).__webglTexture;t.bindTexture(k,Y),m(k),t.unbindTexture()}}}let Oe=[],_e=[];function q(L){if(L.samples>0){if(Ve(L)===!1){let b=L.textures,W=L.width,ee=L.height,U=i.COLOR_BUFFER_BIT,k=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=n.get(L),$=b.length>1;if($)for(let pe=0;pe<b.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Y.__webglMultisampledFramebuffer);let fe=L.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Y.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Y.__webglFramebuffer);for(let pe=0;pe<b.length;pe++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(U|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(U|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Y.__webglColorRenderbuffer[pe]);let le=n.get(b[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,le,0)}i.blitFramebuffer(0,0,W,ee,0,0,W,ee,U,i.NEAREST),l===!0&&(Oe.length=0,_e.length=0,Oe.push(i.COLOR_ATTACHMENT0+pe),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Oe.push(k),_e.push(k),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Oe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let pe=0;pe<b.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,Y.__webglColorRenderbuffer[pe]);let le=n.get(b[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Y.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){let b=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function z(L){return Math.min(r.maxSamples,L.samples)}function Ve(L){let b=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Be(L){let b=a.render.frame;u.get(L)!==b&&(u.set(L,b),L.update())}function Ie(L,b){let W=L.colorSpace,ee=L.format,U=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==Ui&&W!==Ti&&(At.getTransfer(W)===Ut?(ee!==Sn||U!==xt)&&Je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",W)),b}function ge(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=w,this.setTexture2D=N,this.setTexture2DArray=O,this.setTexture3D=H,this.setTextureCube=j,this.rebindTextures=Ae,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function GC(i,e){function t(n,r=Ti){let s,a=At.getTransfer(r);if(n===xt)return i.UNSIGNED_BYTE;if(n===Ef)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wf)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ag)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===og)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===sl)return i.BYTE;if(n===jc)return i.SHORT;if(n===Xs)return i.UNSIGNED_SHORT;if(n===Ys)return i.INT;if(n===An)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===li)return i.HALF_FLOAT;if(n===lg)return i.ALPHA;if(n===cg)return i.RGB;if(n===Sn)return i.RGBA;if(n===lr)return i.DEPTH_COMPONENT;if(n===ur)return i.DEPTH_STENCIL;if(n===qs)return i.RED;if(n===al)return i.RED_INTEGER;if(n===hs)return i.RG;if(n===Qs)return i.RG_INTEGER;if(n===Zs)return i.RGBA_INTEGER;if(n===$c||n===eu||n===tu||n===nu)if(a===Ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===$c)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===eu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===tu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===nu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===$c)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===eu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===tu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===nu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bf||n===Cf||n===Rf||n===Df)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===bf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Cf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Rf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Df)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pf||n===If||n===Bf||n===Uf||n===Lf||n===Ff||n===Nf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Pf||n===If)return a===Ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Bf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Uf)return s.COMPRESSED_R11_EAC;if(n===Lf)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ff)return s.COMPRESSED_RG11_EAC;if(n===Nf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Of||n===kf||n===zf||n===Hf||n===Gf||n===Vf||n===Wf||n===Xf||n===Yf||n===qf||n===Qf||n===Zf||n===Kf||n===Jf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Of)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===kf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===zf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Hf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Gf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Zf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Kf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jf||n===$f||n===ed)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===jf)return a===Ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$f)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ed)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===td||n===nd||n===id||n===rd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===td)return s.COMPRESSED_RED_RGTC1_EXT;if(n===nd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===id)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===kr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var VC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,WC=`
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

}`,Dg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Gc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new rt({vertexShader:VC,fragmentShader:WC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new cs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pg=class extends Ai{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null,v=typeof XRWebGLBinding<"u",g=new Dg,m={},x=t.getContextAttributes(),y=null,A=null,S=[],E=[],T=new we,_=null,M=new yn;M.viewport=new St;let C=new yn;C.viewport=new St;let R=[M,C],w=new Af,P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let se=S[Q];return se===void 0&&(se=new $o,S[Q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Q){let se=S[Q];return se===void 0&&(se=new $o,S[Q]=se),se.getGripSpace()},this.getHand=function(Q){let se=S[Q];return se===void 0&&(se=new $o,S[Q]=se),se.getHandSpace()};function N(Q){let se=E.indexOf(Q.inputSource);if(se===-1)return;let ae=S[se];ae!==void 0&&(ae.update(Q.inputSource,Q.frame,c||a),ae.dispatchEvent({type:Q.type,data:Q.inputSource}))}function O(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",O),r.removeEventListener("inputsourceschange",H);for(let Q=0;Q<S.length;Q++){let se=E[Q];se!==null&&(E[Q]=null,S[Q].disconnect(se))}P=null,F=null,g.reset();for(let Q in m)delete m[Q];e.setRenderTarget(y),d=null,h=null,f=null,r=null,A=null,Ne.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&Je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&Je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",O),r.addEventListener("inputsourceschange",H),x.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,re=null,he=null;x.depth&&(he=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=x.stencil?ur:lr,re=x.stencil?kr:An);let me={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(me),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),A=new vt(h.textureWidth,h.textureHeight,{format:Sn,type:xt,depthTexture:new Fi(h.textureWidth,h.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let ae={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),A=new vt(d.framebufferWidth,d.framebufferHeight,{format:Sn,type:xt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ne.setContext(r),Ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(Q){for(let se=0;se<Q.removed.length;se++){let ae=Q.removed[se],re=E.indexOf(ae);re>=0&&(E[re]=null,S[re].disconnect(ae))}for(let se=0;se<Q.added.length;se++){let ae=Q.added[se],re=E.indexOf(ae);if(re===-1){for(let me=0;me<S.length;me++)if(me>=E.length){E.push(ae),re=me;break}else if(E[me]===null){E[me]=ae,re=me;break}if(re===-1)break}let he=S[re];he&&he.connect(ae)}}let j=new B,G=new B;function I(Q,se,ae){j.setFromMatrixPosition(se.matrixWorld),G.setFromMatrixPosition(ae.matrixWorld);let re=j.distanceTo(G),he=se.projectionMatrix.elements,me=ae.projectionMatrix.elements,Ae=he[14]/(he[10]-1),oe=he[14]/(he[10]+1),Ee=(he[9]+1)/he[5],Oe=(he[9]-1)/he[5],_e=(he[8]-1)/he[0],q=(me[8]+1)/me[0],z=Ae*_e,Ve=Ae*q,Be=re/(-_e+q),Ie=Be*-_e;if(se.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ie),Q.translateZ(Be),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),he[10]===-1)Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{let ge=Ae+Be,L=oe+Be,b=z-Ie,W=Ve+(re-Ie),ee=Ee*oe/L*ge,U=Oe*oe/L*ge;Q.projectionMatrix.makePerspective(b,W,ee,U,ge,L),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function te(Q,se){se===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(se.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let se=Q.near,ae=Q.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(ae=g.depthFar)),w.near=C.near=M.near=se,w.far=C.far=M.far=ae,(P!==w.near||F!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),P=w.near,F=w.far),w.layers.mask=Q.layers.mask|6,M.layers.mask=w.layers.mask&-5,C.layers.mask=w.layers.mask&-3;let re=Q.parent,he=w.cameras;te(w,re);for(let me=0;me<he.length;me++)te(he[me],re);he.length===2?I(w,M,C):w.projectionMatrix.copy(M.projectionMatrix),ie(Q,w,re)};function ie(Q,se,ae){ae===null?Q.matrix.copy(se.matrixWorld):(Q.matrix.copy(ae.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(se.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Jo*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(w)},this.getCameraTexture=function(Q){return m[Q]};let xe=null;function ye(Q,se){if(u=se.getViewerPose(c||a),p=se,u!==null){let ae=u.views;d!==null&&(e.setRenderTargetFramebuffer(A,d.framebuffer),e.setRenderTarget(A));let re=!1;ae.length!==w.cameras.length&&(w.cameras.length=0,re=!0);for(let oe=0;oe<ae.length;oe++){let Ee=ae[oe],Oe=null;if(d!==null)Oe=d.getViewport(Ee);else{let q=f.getViewSubImage(h,Ee);Oe=q.viewport,oe===0&&(e.setRenderTargetTextures(A,q.colorTexture,q.depthStencilTexture),e.setRenderTarget(A))}let _e=R[oe];_e===void 0&&(_e=new yn,_e.layers.enable(oe),_e.viewport=new St,R[oe]=_e),_e.matrix.fromArray(Ee.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(Ee.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),oe===0&&(w.matrix.copy(_e.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),re===!0&&w.cameras.push(_e)}let he=r.enabledFeatures;if(he&&he.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let oe=f.getDepthInformation(ae[0]);oe&&oe.isValid&&oe.texture&&g.init(oe,r.renderState)}if(he&&he.includes("camera-access")&&v){e.state.unbindTexture(),f=n.getBinding();for(let oe=0;oe<ae.length;oe++){let Ee=ae[oe].camera;if(Ee){let Oe=m[Ee];Oe||(Oe=new Gc,m[Ee]=Oe);let _e=f.getCameraImage(Ee);Oe.sourceTexture=_e}}}}for(let ae=0;ae<S.length;ae++){let re=E[ae],he=S[ae];re!==null&&he!==void 0&&he.update(re,se,c||a)}xe&&xe(Q,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),p=null}let Ne=new uy;Ne.setAnimationLoop(ye),this.setAnimationLoop=function(Q){xe=Q},this.dispose=function(){}}},Ya=new Tr,XC=new je;function YC(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,dg(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,x,y,A){m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),f(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),h(g,m),m.isMeshPhysicalMaterial&&d(g,m,A)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,x,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===tn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===tn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let x=e.get(m),y=x.envMap,A=x.envMapRotation;y&&(g.envMap.value=y,Ya.copy(A),Ya.x*=-1,Ya.y*=-1,Ya.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ya.y*=-1,Ya.z*=-1),g.envMapRotation.value.setFromMatrix4(XC.makeRotationFromEuler(Ya)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===tn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){let x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function qC(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){let A=y.program;n.uniformBlockBinding(x,A)}function c(x,y){let A=r[x.id];A===void 0&&(p(x),A=u(x),r[x.id]=A,x.addEventListener("dispose",g));let S=y.program;n.updateUBOMapping(x,S);let E=e.render.frame;s[x.id]!==E&&(h(x),s[x.id]=E)}function u(x){let y=f();x.__bindingPointIndex=y;let A=i.createBuffer(),S=x.__size,E=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,S,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,A),A}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){let y=r[x.id],A=x.uniforms,S=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,T=A.length;E<T;E++){let _=Array.isArray(A[E])?A[E]:[A[E]];for(let M=0,C=_.length;M<C;M++){let R=_[M];if(d(R,E,M,S)===!0){let w=R.__offset,P=Array.isArray(R.value)?R.value:[R.value],F=0;for(let N=0;N<P.length;N++){let O=P[N],H=v(O);typeof O=="number"||typeof O=="boolean"?(R.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,w+F,R.__data)):O.isMatrix3?(R.__data[0]=O.elements[0],R.__data[1]=O.elements[1],R.__data[2]=O.elements[2],R.__data[3]=0,R.__data[4]=O.elements[3],R.__data[5]=O.elements[4],R.__data[6]=O.elements[5],R.__data[7]=0,R.__data[8]=O.elements[6],R.__data[9]=O.elements[7],R.__data[10]=O.elements[8],R.__data[11]=0):(O.toArray(R.__data,F),F+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,w,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,y,A,S){let E=x.value,T=y+"_"+A;if(S[T]===void 0)return typeof E=="number"||typeof E=="boolean"?S[T]=E:S[T]=E.clone(),!0;{let _=S[T];if(typeof E=="number"||typeof E=="boolean"){if(_!==E)return S[T]=E,!0}else if(_.equals(E)===!1)return _.copy(E),!0}return!1}function p(x){let y=x.uniforms,A=0,S=16;for(let T=0,_=y.length;T<_;T++){let M=Array.isArray(y[T])?y[T]:[y[T]];for(let C=0,R=M.length;C<R;C++){let w=M[C],P=Array.isArray(w.value)?w.value:[w.value];for(let F=0,N=P.length;F<N;F++){let O=P[F],H=v(O),j=A%S,G=j%H.boundary,I=j+G;A+=G,I!==0&&S-I<H.storage&&(A+=S-I),w.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=A,A+=H.storage}}}let E=A%S;return E>0&&(A+=S-E),x.__size=A,x.__cache={},this}function v(x){let y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?Je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Je("WebGLRenderer: Unsupported uniform value type.",x),y}function g(x){let y=x.target;y.removeEventListener("dispose",g);let A=a.indexOf(y.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function m(){for(let x in r)i.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:m}}var QC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),zr=null;function ZC(){return zr===null&&(zr=new cr(QC,16,16,hs,li),zr.name="DFG_LUT",zr.minFilter=Vt,zr.magFilter=Vt,zr.wrapS=Fr,zr.wrapT=Fr,zr.generateMipmaps=!1,zr.needsUpdate=!0),zr}var cd=class{constructor(e={}){let{canvas:t=U_(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=xt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let v=d,g=new Set([Zs,Qs,al]),m=new Set([xt,An,Xs,kr,Ef,wf]),x=new Uint32Array(4),y=new Int32Array(4),A=null,S=null,E=[],T=[],_=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,C=!1;this._outputColorSpace=it;let R=0,w=0,P=null,F=-1,N=null,O=new St,H=new St,j=null,G=new Ye(0),I=0,te=t.width,ie=t.height,xe=1,ye=null,Ne=null,Q=new St(0,0,te,ie),se=new St(0,0,te,ie),ae=!1,re=new kc,he=!1,me=!1,Ae=new je,oe=new B,Ee=new St,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_e=!1;function q(){return P===null?xe:1}let z=n;function Ve(D,X){return t.getContext(D,X)}try{let D={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xn}`),t.addEventListener("webglcontextlost",ke,!1),t.addEventListener("webglcontextrestored",Qe,!1),t.addEventListener("webglcontextcreationerror",Tt,!1),z===null){let X="webgl2";if(z=Ve(X,D),z===null)throw Ve(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw Ke("WebGLRenderer: "+D.message),D}let Be,Ie,ge,L,b,W,ee,U,k,Y,$,fe,pe,le,ce,Le,Fe,be,et,V,ve,de,Ce;function ue(){Be=new ib(z),Be.init(),ve=new GC(z,Be),Ie=new Zw(z,Be,e,ve),ge=new zC(z,Be),Ie.reversedDepthBuffer&&h&&ge.buffers.depth.setReversed(!0),L=new ab(z),b=new wC,W=new HC(z,Be,ge,b,Ie,ve,L),ee=new nb(M),U=new hT(z),de=new qw(z,U),k=new rb(z,U,L,de),Y=new lb(z,k,U,de,L),be=new ob(z,Ie,W),ce=new Kw(b),$=new EC(M,ee,Be,Ie,de,ce),fe=new YC(M,b),pe=new CC,le=new UC(Be),Fe=new Yw(M,ee,ge,Y,p,l),Le=new kC(M,Y,Ie),Ce=new qC(z,L,Ie,ge),et=new Qw(z,Be,L),V=new sb(z,Be,L),L.programs=$.programs,M.capabilities=Ie,M.extensions=Be,M.properties=b,M.renderLists=pe,M.shadowMap=Le,M.state=ge,M.info=L}ue(),v!==xt&&(_=new ub(v,t.width,t.height,r,s));let ne=new Pg(M,z);this.xr=ne,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let D=Be.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=Be.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(D){D!==void 0&&(xe=D,this.setSize(te,ie,!1))},this.getSize=function(D){return D.set(te,ie)},this.setSize=function(D,X,J=!0){if(ne.isPresenting){Je("WebGLRenderer: Can't change size while VR device is presenting.");return}te=D,ie=X,t.width=Math.floor(D*xe),t.height=Math.floor(X*xe),J===!0&&(t.style.width=D+"px",t.style.height=X+"px"),_!==null&&_.setSize(t.width,t.height),this.setViewport(0,0,D,X)},this.getDrawingBufferSize=function(D){return D.set(te*xe,ie*xe).floor()},this.setDrawingBufferSize=function(D,X,J){te=D,ie=X,xe=J,t.width=Math.floor(D*J),t.height=Math.floor(X*J),this.setViewport(0,0,D,X)},this.setEffects=function(D){if(v===xt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let X=0;X<D.length;X++)if(D[X].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(O)},this.getViewport=function(D){return D.copy(Q)},this.setViewport=function(D,X,J,K){D.isVector4?Q.set(D.x,D.y,D.z,D.w):Q.set(D,X,J,K),ge.viewport(O.copy(Q).multiplyScalar(xe).round())},this.getScissor=function(D){return D.copy(se)},this.setScissor=function(D,X,J,K){D.isVector4?se.set(D.x,D.y,D.z,D.w):se.set(D,X,J,K),ge.scissor(H.copy(se).multiplyScalar(xe).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(D){ge.setScissorTest(ae=D)},this.setOpaqueSort=function(D){ye=D},this.setTransparentSort=function(D){Ne=D},this.getClearColor=function(D){return D.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(D=!0,X=!0,J=!0){let K=0;if(D){let Z=!1;if(P!==null){let Me=P.texture.format;Z=g.has(Me)}if(Z){let Me=P.texture.type,Re=m.has(Me),Te=Fe.getClearColor(),He=Fe.getClearAlpha(),ze=Te.r,lt=Te.g,dt=Te.b;Re?(x[0]=ze,x[1]=lt,x[2]=dt,x[3]=He,z.clearBufferuiv(z.COLOR,0,x)):(y[0]=ze,y[1]=lt,y[2]=dt,y[3]=He,z.clearBufferiv(z.COLOR,0,y))}else K|=z.COLOR_BUFFER_BIT}X&&(K|=z.DEPTH_BUFFER_BIT),J&&(K|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&z.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ke,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",Tt,!1),Fe.dispose(),pe.dispose(),le.dispose(),b.dispose(),ee.dispose(),Y.dispose(),de.dispose(),Ce.dispose(),$.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",nt),ne.removeEventListener("sessionend",dn),at.stop()};function ke(D){D.preventDefault(),Dc("WebGLRenderer: Context Lost."),C=!0}function Qe(){Dc("WebGLRenderer: Context Restored."),C=!1;let D=L.autoReset,X=Le.enabled,J=Le.autoUpdate,K=Le.needsUpdate,Z=Le.type;ue(),L.autoReset=D,Le.enabled=X,Le.autoUpdate=J,Le.needsUpdate=K,Le.type=Z}function Tt(D){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Ue(D){let X=D.target;X.removeEventListener("dispose",Ue),We(X)}function We(D){ct(D),b.remove(D)}function ct(D){let X=b.get(D).programs;X!==void 0&&(X.forEach(function(J){$.releaseProgram(J)}),D.isShaderMaterial&&$.releaseShaderCache(D))}this.renderBufferDirect=function(D,X,J,K,Z,Me){X===null&&(X=Oe);let Re=Z.isMesh&&Z.matrixWorld.determinant()<0,Te=er(D,X,J,K,Z);ge.setMaterial(K,Re);let He=J.index,ze=1;if(K.wireframe===!0){if(He=k.getWireframeAttribute(J),He===void 0)return;ze=2}let lt=J.drawRange,dt=J.attributes.position,qe=lt.start*ze,Ht=(lt.start+lt.count)*ze;Me!==null&&(qe=Math.max(qe,Me.start*ze),Ht=Math.min(Ht,(Me.start+Me.count)*ze)),He!==null?(qe=Math.max(qe,0),Ht=Math.min(Ht,He.count)):dt!=null&&(qe=Math.max(qe,0),Ht=Math.min(Ht,dt.count));let pn=Ht-qe;if(pn<0||pn===1/0)return;de.setup(Z,K,Te,J,He);let ln,Gt=et;if(He!==null&&(ln=U.get(He),Gt=V,Gt.setIndex(ln)),Z.isMesh)K.wireframe===!0?(ge.setLineWidth(K.wireframeLinewidth*q()),Gt.setMode(z.LINES)):Gt.setMode(z.TRIANGLES);else if(Z.isLine){let Kn=K.linewidth;Kn===void 0&&(Kn=1),ge.setLineWidth(Kn*q()),Z.isLineSegments?Gt.setMode(z.LINES):Z.isLineLoop?Gt.setMode(z.LINE_LOOP):Gt.setMode(z.LINE_STRIP)}else Z.isPoints?Gt.setMode(z.POINTS):Z.isSprite&&Gt.setMode(z.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Pc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Gt.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))Gt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let Kn=Z._multiDrawStarts,Xe=Z._multiDrawCounts,Oi=Z._multiDrawCount,Et=He?U.get(He).bytesPerElement:1,mr=b.get(K).currentProgram.getUniforms();for(let Cr=0;Cr<Oi;Cr++)mr.setValue(z,"_gl_DrawID",Cr),Gt.render(Kn[Cr]/Et,Xe[Cr])}else if(Z.isInstancedMesh)Gt.renderInstances(qe,pn,Z.count);else if(J.isInstancedBufferGeometry){let Kn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Xe=Math.min(J.instanceCount,Kn);Gt.renderInstances(qe,pn,Xe)}else Gt.render(qe,pn)};function De(D,X,J){D.transparent===!0&&D.side===gn&&D.forceSinglePass===!1?(D.side=tn,D.needsUpdate=!0,Qn(D,X,J),D.side=ai,D.needsUpdate=!0,Qn(D,X,J),D.side=gn):Qn(D,X,J)}this.compile=function(D,X,J=null){J===null&&(J=D),S=le.get(J),S.init(X),T.push(S),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(S.pushLight(Z),Z.castShadow&&S.pushShadow(Z))}),D!==J&&D.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(S.pushLight(Z),Z.castShadow&&S.pushShadow(Z))}),S.setupLights();let K=new Set;return D.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Me=Z.material;if(Me)if(Array.isArray(Me))for(let Re=0;Re<Me.length;Re++){let Te=Me[Re];De(Te,J,Z),K.add(Te)}else De(Me,J,Z),K.add(Me)}),S=T.pop(),K},this.compileAsync=function(D,X,J=null){let K=this.compile(D,X,J);return new Promise(Z=>{function Me(){if(K.forEach(function(Re){b.get(Re).currentProgram.isReady()&&K.delete(Re)}),K.size===0){Z(D);return}setTimeout(Me,10)}Be.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let tt=null;function Ze(D){tt&&tt(D)}function nt(){at.stop()}function dn(){at.start()}let at=new uy;at.setAnimationLoop(Ze),typeof self<"u"&&at.setContext(self),this.setAnimationLoop=function(D){tt=D,ne.setAnimationLoop(D),D===null?at.stop():at.start()},ne.addEventListener("sessionstart",nt),ne.addEventListener("sessionend",dn),this.render=function(D,X){if(X!==void 0&&X.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;let J=ne.enabled===!0&&ne.isPresenting===!0,K=_!==null&&(P===null||J)&&_.begin(M,P);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(X),X=ne.getCamera()),D.isScene===!0&&D.onBeforeRender(M,D,X,P),S=le.get(D,T.length),S.init(X),T.push(S),Ae.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),re.setFromProjectionMatrix(Ae,Mr,X.reversedDepth),me=this.localClippingEnabled,he=ce.init(this.clippingPlanes,me),A=pe.get(D,E.length),A.init(),E.push(A),ne.enabled===!0&&ne.isPresenting===!0){let Re=M.xr.getDepthSensingMesh();Re!==null&&Jt(Re,X,-1/0,M.sortObjects)}Jt(D,X,0,M.sortObjects),A.finish(),M.sortObjects===!0&&A.sort(ye,Ne),_e=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,_e&&Fe.addToRenderList(A,D),this.info.render.frame++,he===!0&&ce.beginShadows();let Z=S.state.shadowsArray;if(Le.render(Z,D,X),he===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset(),(K&&_.hasRenderPass())===!1){let Re=A.opaque,Te=A.transmissive;if(S.setupLights(),X.isArrayCamera){let He=X.cameras;if(Te.length>0)for(let ze=0,lt=He.length;ze<lt;ze++){let dt=He[ze];jt(Re,Te,D,dt)}_e&&Fe.render(D);for(let ze=0,lt=He.length;ze<lt;ze++){let dt=He[ze];Tn(A,D,dt,dt.viewport)}}else Te.length>0&&jt(Re,Te,D,X),_e&&Fe.render(D),Tn(A,D,X)}P!==null&&w===0&&(W.updateMultisampleRenderTarget(P),W.updateRenderTargetMipmap(P)),K&&_.end(M),D.isScene===!0&&D.onAfterRender(M,D,X),de.resetDefaultState(),F=-1,N=null,T.pop(),T.length>0?(S=T[T.length-1],he===!0&&ce.setGlobalState(M.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?A=E[E.length-1]:A=null};function Jt(D,X,J,K){if(D.visible===!1)return;if(D.layers.test(X.layers)){if(D.isGroup)J=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(X);else if(D.isLight)S.pushLight(D),D.castShadow&&S.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||re.intersectsSprite(D)){K&&Ee.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Ae);let Re=Y.update(D),Te=D.material;Te.visible&&A.push(D,Re,Te,J,Ee.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||re.intersectsObject(D))){let Re=Y.update(D),Te=D.material;if(K&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ee.copy(D.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Ee.copy(Re.boundingSphere.center)),Ee.applyMatrix4(D.matrixWorld).applyMatrix4(Ae)),Array.isArray(Te)){let He=Re.groups;for(let ze=0,lt=He.length;ze<lt;ze++){let dt=He[ze],qe=Te[dt.materialIndex];qe&&qe.visible&&A.push(D,Re,qe,J,Ee.z,dt)}}else Te.visible&&A.push(D,Re,Te,J,Ee.z,null)}}let Me=D.children;for(let Re=0,Te=Me.length;Re<Te;Re++)Jt(Me[Re],X,J,K)}function Tn(D,X,J,K){let{opaque:Z,transmissive:Me,transparent:Re}=D;S.setupLightsView(J),he===!0&&ce.setGlobalState(M.clippingPlanes,J),K&&ge.viewport(O.copy(K)),Z.length>0&&Ot(Z,X,J),Me.length>0&&Ot(Me,X,J),Re.length>0&&Ot(Re,X,J),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function jt(D,X,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[K.id]===void 0){let qe=Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[K.id]=new vt(1,1,{generateMipmaps:!0,type:qe?li:xt,minFilter:Or,samples:Math.max(4,Ie.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:At.workingColorSpace})}let Me=S.state.transmissionRenderTarget[K.id],Re=K.viewport||O;Me.setSize(Re.z*M.transmissionResolutionScale,Re.w*M.transmissionResolutionScale);let Te=M.getRenderTarget(),He=M.getActiveCubeFace(),ze=M.getActiveMipmapLevel();M.setRenderTarget(Me),M.getClearColor(G),I=M.getClearAlpha(),I<1&&M.setClearColor(16777215,.5),M.clear(),_e&&Fe.render(J);let lt=M.toneMapping;M.toneMapping=Ki;let dt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),S.setupLightsView(K),he===!0&&ce.setGlobalState(M.clippingPlanes,K),Ot(D,J,K),W.updateMultisampleRenderTarget(Me),W.updateRenderTargetMipmap(Me),Be.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Ht=0,pn=X.length;Ht<pn;Ht++){let ln=X[Ht],{object:Gt,geometry:Kn,material:Xe,group:Oi}=ln;if(Xe.side===gn&&Gt.layers.test(K.layers)){let Et=Xe.side;Xe.side=tn,Xe.needsUpdate=!0,It(Gt,J,K,Kn,Xe,Oi),Xe.side=Et,Xe.needsUpdate=!0,qe=!0}}qe===!0&&(W.updateMultisampleRenderTarget(Me),W.updateRenderTargetMipmap(Me))}M.setRenderTarget(Te,He,ze),M.setClearColor(G,I),dt!==void 0&&(K.viewport=dt),M.toneMapping=lt}function Ot(D,X,J){let K=X.isScene===!0?X.overrideMaterial:null;for(let Z=0,Me=D.length;Z<Me;Z++){let Re=D[Z],{object:Te,geometry:He,group:ze}=Re,lt=Re.material;lt.allowOverride===!0&&K!==null&&(lt=K),Te.layers.test(J.layers)&&It(Te,X,J,He,lt,ze)}}function It(D,X,J,K,Z,Me){D.onBeforeRender(M,X,J,K,Z,Me),D.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),Z.onBeforeRender(M,X,J,K,D,Me),Z.transparent===!0&&Z.side===gn&&Z.forceSinglePass===!1?(Z.side=tn,Z.needsUpdate=!0,M.renderBufferDirect(J,X,K,Z,D,Me),Z.side=ai,Z.needsUpdate=!0,M.renderBufferDirect(J,X,K,Z,D,Me),Z.side=gn):M.renderBufferDirect(J,X,K,Z,D,Me),D.onAfterRender(M,X,J,K,Z,Me)}function Qn(D,X,J){X.isScene!==!0&&(X=Oe);let K=b.get(D),Z=S.state.lights,Me=S.state.shadowsArray,Re=Z.state.version,Te=$.getParameters(D,Z.state,Me,X,J),He=$.getProgramCacheKey(Te),ze=K.programs;K.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?X.environment:null,K.fog=X.fog;let lt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;K.envMap=ee.get(D.envMap||K.environment,lt),K.envMapRotation=K.environment!==null&&D.envMap===null?X.environmentRotation:D.envMapRotation,ze===void 0&&(D.addEventListener("dispose",Ue),ze=new Map,K.programs=ze);let dt=ze.get(He);if(dt!==void 0){if(K.currentProgram===dt&&K.lightsStateVersion===Re)return Zn(D,Te),dt}else Te.uniforms=$.getUniforms(D),D.onBeforeCompile(Te,M),dt=$.acquireProgram(Te,He),ze.set(He,dt),K.uniforms=Te.uniforms;let qe=K.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(qe.clippingPlanes=ce.uniform),Zn(D,Te),K.needsLights=wn(D),K.lightsStateVersion=Re,K.needsLights&&(qe.ambientLightColor.value=Z.state.ambient,qe.lightProbe.value=Z.state.probe,qe.directionalLights.value=Z.state.directional,qe.directionalLightShadows.value=Z.state.directionalShadow,qe.spotLights.value=Z.state.spot,qe.spotLightShadows.value=Z.state.spotShadow,qe.rectAreaLights.value=Z.state.rectArea,qe.ltc_1.value=Z.state.rectAreaLTC1,qe.ltc_2.value=Z.state.rectAreaLTC2,qe.pointLights.value=Z.state.point,qe.pointLightShadows.value=Z.state.pointShadow,qe.hemisphereLights.value=Z.state.hemi,qe.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,qe.spotLightMatrix.value=Z.state.spotLightMatrix,qe.spotLightMap.value=Z.state.spotLightMap,qe.pointShadowMatrix.value=Z.state.pointShadowMatrix),K.currentProgram=dt,K.uniformsList=null,dt}function Zt(D){if(D.uniformsList===null){let X=D.currentProgram.getUniforms();D.uniformsList=ll.seqWithValue(X.seq,D.uniforms)}return D.uniformsList}function Zn(D,X){let J=b.get(D);J.outputColorSpace=X.outputColorSpace,J.batching=X.batching,J.batchingColor=X.batchingColor,J.instancing=X.instancing,J.instancingColor=X.instancingColor,J.instancingMorph=X.instancingMorph,J.skinning=X.skinning,J.morphTargets=X.morphTargets,J.morphNormals=X.morphNormals,J.morphColors=X.morphColors,J.morphTargetsCount=X.morphTargetsCount,J.numClippingPlanes=X.numClippingPlanes,J.numIntersection=X.numClipIntersection,J.vertexAlphas=X.vertexAlphas,J.vertexTangents=X.vertexTangents,J.toneMapping=X.toneMapping}function er(D,X,J,K,Z){X.isScene!==!0&&(X=Oe),W.resetTextureUnits();let Me=X.fog,Re=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?X.environment:null,Te=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ui,He=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,ze=ee.get(K.envMap||Re,He),lt=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,dt=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),qe=!!J.morphAttributes.position,Ht=!!J.morphAttributes.normal,pn=!!J.morphAttributes.color,ln=Ki;K.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ln=M.toneMapping);let Gt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Kn=Gt!==void 0?Gt.length:0,Xe=b.get(K),Oi=S.state.lights;if(he===!0&&(me===!0||D!==N)){let Bn=D===N&&K.id===F;ce.setState(K,D,Bn)}let Et=!1;K.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Oi.state.version||Xe.outputColorSpace!==Te||Z.isBatchedMesh&&Xe.batching===!1||!Z.isBatchedMesh&&Xe.batching===!0||Z.isBatchedMesh&&Xe.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Xe.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Xe.instancing===!1||!Z.isInstancedMesh&&Xe.instancing===!0||Z.isSkinnedMesh&&Xe.skinning===!1||!Z.isSkinnedMesh&&Xe.skinning===!0||Z.isInstancedMesh&&Xe.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Xe.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Xe.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Xe.instancingMorph===!1&&Z.morphTexture!==null||Xe.envMap!==ze||K.fog===!0&&Xe.fog!==Me||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==ce.numPlanes||Xe.numIntersection!==ce.numIntersection)||Xe.vertexAlphas!==lt||Xe.vertexTangents!==dt||Xe.morphTargets!==qe||Xe.morphNormals!==Ht||Xe.morphColors!==pn||Xe.toneMapping!==ln||Xe.morphTargetsCount!==Kn)&&(Et=!0):(Et=!0,Xe.__version=K.version);let mr=Xe.currentProgram;Et===!0&&(mr=Qn(K,X,Z));let Cr=!1,fa=!1,io=!1,Wt=mr.getUniforms(),kn=Xe.uniforms;if(ge.useProgram(mr.program)&&(Cr=!0,fa=!0,io=!0),K.id!==F&&(F=K.id,fa=!0),Cr||N!==D){ge.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Wt.setValue(z,"projectionMatrix",D.projectionMatrix),Wt.setValue(z,"viewMatrix",D.matrixWorldInverse);let ys=Wt.map.cameraPosition;ys!==void 0&&ys.setValue(z,oe.setFromMatrixPosition(D.matrixWorld)),Ie.logarithmicDepthBuffer&&Wt.setValue(z,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Wt.setValue(z,"isOrthographic",D.isOrthographicCamera===!0),N!==D&&(N=D,fa=!0,io=!0)}if(Xe.needsLights&&(Oi.state.directionalShadowMap.length>0&&Wt.setValue(z,"directionalShadowMap",Oi.state.directionalShadowMap,W),Oi.state.spotShadowMap.length>0&&Wt.setValue(z,"spotShadowMap",Oi.state.spotShadowMap,W),Oi.state.pointShadowMap.length>0&&Wt.setValue(z,"pointShadowMap",Oi.state.pointShadowMap,W)),Z.isSkinnedMesh){Wt.setOptional(z,Z,"bindMatrix"),Wt.setOptional(z,Z,"bindMatrixInverse");let Bn=Z.skeleton;Bn&&(Bn.boneTexture===null&&Bn.computeBoneTexture(),Wt.setValue(z,"boneTexture",Bn.boneTexture,W))}Z.isBatchedMesh&&(Wt.setOptional(z,Z,"batchingTexture"),Wt.setValue(z,"batchingTexture",Z._matricesTexture,W),Wt.setOptional(z,Z,"batchingIdTexture"),Wt.setValue(z,"batchingIdTexture",Z._indirectTexture,W),Wt.setOptional(z,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Wt.setValue(z,"batchingColorTexture",Z._colorsTexture,W));let _s=J.morphAttributes;if((_s.position!==void 0||_s.normal!==void 0||_s.color!==void 0)&&be.update(Z,J,mr),(fa||Xe.receiveShadow!==Z.receiveShadow)&&(Xe.receiveShadow=Z.receiveShadow,Wt.setValue(z,"receiveShadow",Z.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&X.environment!==null&&(kn.envMapIntensity.value=X.environmentIntensity),kn.dfgLUT!==void 0&&(kn.dfgLUT.value=ZC()),fa&&(Wt.setValue(z,"toneMappingExposure",M.toneMappingExposure),Xe.needsLights&&En(kn,io),Me&&K.fog===!0&&fe.refreshFogUniforms(kn,Me),fe.refreshMaterialUniforms(kn,K,xe,ie,S.state.transmissionRenderTarget[D.id]),ll.upload(z,Zt(Xe),kn,W)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ll.upload(z,Zt(Xe),kn,W),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Wt.setValue(z,"center",Z.center),Wt.setValue(z,"modelViewMatrix",Z.modelViewMatrix),Wt.setValue(z,"normalMatrix",Z.normalMatrix),Wt.setValue(z,"modelMatrix",Z.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){let Bn=K.uniformsGroups;for(let ys=0,ro=Bn.length;ys<ro;ys++){let w0=Bn[ys];Ce.update(w0,mr),Ce.bind(w0,mr)}}return mr}function En(D,X){D.ambientLightColor.needsUpdate=X,D.lightProbe.needsUpdate=X,D.directionalLights.needsUpdate=X,D.directionalLightShadows.needsUpdate=X,D.pointLights.needsUpdate=X,D.pointLightShadows.needsUpdate=X,D.spotLights.needsUpdate=X,D.spotLightShadows.needsUpdate=X,D.rectAreaLights.needsUpdate=X,D.hemisphereLights.needsUpdate=X}function wn(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(D,X,J){let K=b.get(D);K.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),b.get(D.texture).__webglTexture=X,b.get(D.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:J,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,X){let J=b.get(D);J.__webglFramebuffer=X,J.__useDefaultFramebuffer=X===void 0};let In=z.createFramebuffer();this.setRenderTarget=function(D,X=0,J=0){P=D,R=X,w=J;let K=null,Z=!1,Me=!1;if(D){let Te=b.get(D);if(Te.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(z.FRAMEBUFFER,Te.__webglFramebuffer),O.copy(D.viewport),H.copy(D.scissor),j=D.scissorTest,ge.viewport(O),ge.scissor(H),ge.setScissorTest(j),F=-1;return}else if(Te.__webglFramebuffer===void 0)W.setupRenderTarget(D);else if(Te.__hasExternalTextures)W.rebindTextures(D,b.get(D.texture).__webglTexture,b.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){let lt=D.depthTexture;if(Te.__boundDepthTexture!==lt){if(lt!==null&&b.has(lt)&&(D.width!==lt.image.width||D.height!==lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(D)}}let He=D.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Me=!0);let ze=b.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ze[X])?K=ze[X][J]:K=ze[X],Z=!0):D.samples>0&&W.useMultisampledRTT(D)===!1?K=b.get(D).__webglMultisampledFramebuffer:Array.isArray(ze)?K=ze[J]:K=ze,O.copy(D.viewport),H.copy(D.scissor),j=D.scissorTest}else O.copy(Q).multiplyScalar(xe).floor(),H.copy(se).multiplyScalar(xe).floor(),j=ae;if(J!==0&&(K=In),ge.bindFramebuffer(z.FRAMEBUFFER,K)&&ge.drawBuffers(D,K),ge.viewport(O),ge.scissor(H),ge.setScissorTest(j),Z){let Te=b.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+X,Te.__webglTexture,J)}else if(Me){let Te=X;for(let He=0;He<D.textures.length;He++){let ze=b.get(D.textures[He]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+He,ze.__webglTexture,J,Te)}}else if(D!==null&&J!==0){let Te=b.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Te.__webglTexture,J)}F=-1},this.readRenderTargetPixels=function(D,X,J,K,Z,Me,Re,Te=0){if(!(D&&D.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=b.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Re!==void 0&&(He=He[Re]),He){ge.bindFramebuffer(z.FRAMEBUFFER,He);try{let ze=D.textures[Te],lt=ze.format,dt=ze.type;if(D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Te),!Ie.textureFormatReadable(lt)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ie.textureTypeReadable(dt)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=D.width-K&&J>=0&&J<=D.height-Z&&z.readPixels(X,J,K,Z,ve.convert(lt),ve.convert(dt),Me)}finally{let ze=P!==null?b.get(P).__webglFramebuffer:null;ge.bindFramebuffer(z.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(D,X,J,K,Z,Me,Re,Te=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=b.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Re!==void 0&&(He=He[Re]),He)if(X>=0&&X<=D.width-K&&J>=0&&J<=D.height-Z){ge.bindFramebuffer(z.FRAMEBUFFER,He);let ze=D.textures[Te],lt=ze.format,dt=ze.type;if(D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Te),!Ie.textureFormatReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ie.textureTypeReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let qe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,qe),z.bufferData(z.PIXEL_PACK_BUFFER,Me.byteLength,z.STREAM_READ),z.readPixels(X,J,K,Z,ve.convert(lt),ve.convert(dt),0);let Ht=P!==null?b.get(P).__webglFramebuffer:null;ge.bindFramebuffer(z.FRAMEBUFFER,Ht);let pn=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await F_(z,pn,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,qe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Me),z.deleteBuffer(qe),z.deleteSync(pn),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,X=null,J=0){let K=Math.pow(2,-J),Z=Math.floor(D.image.width*K),Me=Math.floor(D.image.height*K),Re=X!==null?X.x:0,Te=X!==null?X.y:0;W.setTexture2D(D,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,Re,Te,Z,Me),ge.unbindTexture()};let Xr=z.createFramebuffer(),no=z.createFramebuffer();this.copyTextureToTexture=function(D,X,J=null,K=null,Z=0,Me=0){let Re,Te,He,ze,lt,dt,qe,Ht,pn,ln=D.isCompressedTexture?D.mipmaps[Me]:D.image;if(J!==null)Re=J.max.x-J.min.x,Te=J.max.y-J.min.y,He=J.isBox3?J.max.z-J.min.z:1,ze=J.min.x,lt=J.min.y,dt=J.isBox3?J.min.z:0;else{let kn=Math.pow(2,-Z);Re=Math.floor(ln.width*kn),Te=Math.floor(ln.height*kn),D.isDataArrayTexture?He=ln.depth:D.isData3DTexture?He=Math.floor(ln.depth*kn):He=1,ze=0,lt=0,dt=0}K!==null?(qe=K.x,Ht=K.y,pn=K.z):(qe=0,Ht=0,pn=0);let Gt=ve.convert(X.format),Kn=ve.convert(X.type),Xe;X.isData3DTexture?(W.setTexture3D(X,0),Xe=z.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(W.setTexture2DArray(X,0),Xe=z.TEXTURE_2D_ARRAY):(W.setTexture2D(X,0),Xe=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,X.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,X.unpackAlignment);let Oi=z.getParameter(z.UNPACK_ROW_LENGTH),Et=z.getParameter(z.UNPACK_IMAGE_HEIGHT),mr=z.getParameter(z.UNPACK_SKIP_PIXELS),Cr=z.getParameter(z.UNPACK_SKIP_ROWS),fa=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,ln.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ln.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,ze),z.pixelStorei(z.UNPACK_SKIP_ROWS,lt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,dt);let io=D.isDataArrayTexture||D.isData3DTexture,Wt=X.isDataArrayTexture||X.isData3DTexture;if(D.isDepthTexture){let kn=b.get(D),_s=b.get(X),Bn=b.get(kn.__renderTarget),ys=b.get(_s.__renderTarget);ge.bindFramebuffer(z.READ_FRAMEBUFFER,Bn.__webglFramebuffer),ge.bindFramebuffer(z.DRAW_FRAMEBUFFER,ys.__webglFramebuffer);for(let ro=0;ro<He;ro++)io&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,b.get(D).__webglTexture,Z,dt+ro),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,b.get(X).__webglTexture,Me,pn+ro)),z.blitFramebuffer(ze,lt,Re,Te,qe,Ht,Re,Te,z.DEPTH_BUFFER_BIT,z.NEAREST);ge.bindFramebuffer(z.READ_FRAMEBUFFER,null),ge.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Z!==0||D.isRenderTargetTexture||b.has(D)){let kn=b.get(D),_s=b.get(X);ge.bindFramebuffer(z.READ_FRAMEBUFFER,Xr),ge.bindFramebuffer(z.DRAW_FRAMEBUFFER,no);for(let Bn=0;Bn<He;Bn++)io?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,kn.__webglTexture,Z,dt+Bn):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,kn.__webglTexture,Z),Wt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,_s.__webglTexture,Me,pn+Bn):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,_s.__webglTexture,Me),Z!==0?z.blitFramebuffer(ze,lt,Re,Te,qe,Ht,Re,Te,z.COLOR_BUFFER_BIT,z.NEAREST):Wt?z.copyTexSubImage3D(Xe,Me,qe,Ht,pn+Bn,ze,lt,Re,Te):z.copyTexSubImage2D(Xe,Me,qe,Ht,ze,lt,Re,Te);ge.bindFramebuffer(z.READ_FRAMEBUFFER,null),ge.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Wt?D.isDataTexture||D.isData3DTexture?z.texSubImage3D(Xe,Me,qe,Ht,pn,Re,Te,He,Gt,Kn,ln.data):X.isCompressedArrayTexture?z.compressedTexSubImage3D(Xe,Me,qe,Ht,pn,Re,Te,He,Gt,ln.data):z.texSubImage3D(Xe,Me,qe,Ht,pn,Re,Te,He,Gt,Kn,ln):D.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Me,qe,Ht,Re,Te,Gt,Kn,ln.data):D.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Me,qe,Ht,ln.width,ln.height,Gt,ln.data):z.texSubImage2D(z.TEXTURE_2D,Me,qe,Ht,Re,Te,Gt,Kn,ln);z.pixelStorei(z.UNPACK_ROW_LENGTH,Oi),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Et),z.pixelStorei(z.UNPACK_SKIP_PIXELS,mr),z.pixelStorei(z.UNPACK_SKIP_ROWS,Cr),z.pixelStorei(z.UNPACK_SKIP_IMAGES,fa),Me===0&&X.generateMipmaps&&z.generateMipmap(Xe),ge.unbindTexture()},this.initRenderTarget=function(D){b.get(D).__webglFramebuffer===void 0&&W.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?W.setTextureCube(D,0):D.isData3DTexture?W.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?W.setTexture2DArray(D,0):W.setTexture2D(D,0),ge.unbindTexture()},this.resetState=function(){R=0,w=0,P=null,ge.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=At._getDrawingBufferColorSpace(e),t.unpackColorSpace=At._getUnpackColorSpace()}};var KC=(()=>{let i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Lt;return t.setAttribute("position",new ut(i,3)),t.setAttribute("uv",new ut(e,2)),t})(),wi=class Lg{static get fullscreenGeometry(){return KC}constructor(e="Pass",t=new Er,n=new us){this.name=e,this.renderer=null,this.scene=t,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new Rt(Lg.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new Er),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=Mi){}render(e,t,n,r,s){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,n){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof vt||t instanceof Li||t instanceof Rn||t instanceof Lg)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},JC=class extends wi{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(i,e,t,n,r){let s=i.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},jC=`#ifdef COLOR_WRITE
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
}`,dl="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",xy=class extends rt{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new Se(null),depthBuffer:new Se(null),channelWeights:new Se(null),opacity:new Se(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:jC,vertexShader:dl}),this.depthFunc=Qo}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(i){let e=i!==null;this.colorWrite!==e&&(e?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=e,this.needsUpdate=!0),this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){let e=i!==null;this.depthWrite!==e&&(e?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=e,this.depthWrite=e,this.needsUpdate=!0),this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(i){this.colorSpaceConversion!==i&&(i?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(i){i!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=i):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},_y=class extends wi{constructor(i,e=!0){super("CopyPass"),this.fullscreenMaterial=new xy,this.needsSwap=!1,this.renderTarget=i,i===void 0&&(this.renderTarget=new vt(1,1,{minFilter:Vt,magFilter:Vt,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(i){this.autoResize=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(i){this.autoResize=i}render(i,e,t,n,r){this.fullscreenMaterial.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){this.autoResize&&this.renderTarget.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==xt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}},my=new Ye,yy=class extends wi{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,r){let s=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=s!==null,c=a>=0;l?(i.getClearColor(my),i.setClearColor(s,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(my,o):c&&i.setClearAlpha(o)}},$C=class extends wi{constructor(i,e){super("MaskPass",i,e),this.needsSwap=!1,this.clearPass=new yy(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,r){let s=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,f=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.stencil.setFunc(s.ALWAYS,u,4294967295),a.stencil.setClear(f),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(s.EQUAL,1,4294967295),a.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.stencil.setLocked(!0)}};function e2(i,e){let t=i.getContext();if(e<=0||typeof t.renderbufferStorageMultisample!="function")return 0;let n=t.getParameter(t.MAX_SAMPLES),r=Math.min(e,n);if(r<=0)return 0;let s=t.getParameter(t.RENDERBUFFER_BINDING),a=t.createRenderbuffer();try{return t.bindRenderbuffer(t.RENDERBUFFER,a),t.renderbufferStorageMultisample(t.RENDERBUFFER,r,t.RGBA8,1,1),r}catch{return 0}finally{t.bindRenderbuffer(t.RENDERBUFFER,s),t.deleteRenderbuffer(a)}}var Ig=1/1e3,t2=1e3,n2=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document<"u"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*Ig}get fixedDelta(){return this._fixedDelta*Ig}set fixedDelta(i){this._fixedDelta=i*t2}get elapsed(){return this._elapsed*Ig}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(i!==void 0?i:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(i){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Ay=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:r=xt}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,r,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new _y,this.depthRenderTarget=null,this.passes=[],this.timer=new n2,this.autoRenderToScreen=!0,this.setRenderer(i)}get stableDepthTexture(){return this.depthRenderTarget===null?null:this.depthRenderTarget.depthTexture}get multisampling(){return this.inputBuffer.samples}set multisampling(i){let e=this.renderer===null?i:e2(this.renderer,i);this.multisampling!==e&&(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){let e=i.getSize(new we),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===xt&&i.outputColorSpace===it&&(this.inputBuffer.texture.colorSpace=it,this.outputBuffer.texture.colorSpace=it,this.inputBuffer.dispose(),this.outputBuffer.dispose());let r=this.multisampling;this.multisampling=r,i.autoClear=!1,this.setSize(e.width,e.height);for(let s of this.passes)s.initialize(i,t,n)}}replaceRenderer(i,e=!0){let t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){let i=new Fi;i.name="EffectComposer.InputDepth",this.inputBuffer.stencilBuffer?(i.format=ur,i.type=kr):i.type=nn;let e=new Fi;e.format=i.format,e.type=i.type,e.name="EffectComposer.OutputDepth";let t=new Fi;t.format=i.format,t.type=i.type,t.name="EffectComposer.StableDepth",this.inputBuffer.depthTexture=i,this.outputBuffer.depthTexture=e,this.inputBuffer.dispose(),this.outputBuffer.dispose();let{width:n,height:r}=this.inputBuffer;this.depthRenderTarget=new vt(n,r,{depthBuffer:!0,stencilBuffer:this.inputBuffer.stencilBuffer,depthTexture:t})}blitDepthBuffer(i){let e=this.renderer,t=this.depthRenderTarget,n=e.properties,r=e.getContext();e.setRenderTarget(t);let s=n.get(i).__webglFramebuffer,a=n.get(t).__webglFramebuffer,o=i.stencilBuffer?r.DEPTH_BUFFER_BIT|r.STENCIL_BUFFER_BIT:r.DEPTH_BUFFER_BIT;r.bindFramebuffer(r.READ_FRAMEBUFFER,s),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,a),r.blitFramebuffer(0,0,i.width,i.height,0,0,t.width,t.height,o,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),e.setRenderTarget(null)}deleteDepthTexture(){let i=this.stableDepthTexture;for(let e of this.passes)e.getDepthTexture()===i&&e.setDepthTexture(null);this.depthRenderTarget!==null&&(this.depthRenderTarget.dispose(),this.depthRenderTarget=null),this.inputBuffer.depthTexture!==null&&(this.inputBuffer.depthTexture.dispose(),this.inputBuffer.depthTexture=null),this.outputBuffer.depthTexture!==null&&(this.outputBuffer.depthTexture.dispose(),this.outputBuffer.depthTexture=null)}createBuffer(i,e,t,n){let r=this.renderer,s=r===null?new we:r.getDrawingBufferSize(new we),a=new vt(s.width,s.height,{minFilter:Vt,magFilter:Vt,samples:n,stencilBuffer:e,depthBuffer:i,type:t});return t===xt&&r!==null&&r.outputColorSpace===it&&(a.texture.colorSpace=it),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(i){for(let e of this.passes)e.mainScene=i}setMainCamera(i){for(let e of this.passes)e.mainCamera=i}addPass(i,e){let t=this.passes,n=this.renderer,r=n.getDrawingBufferSize(new we),s=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.renderer=n,i.setSize(r.width,r.height),i.initialize(n,s,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthRenderTarget!==null)if(this.depthRenderTarget===null){this.createDepthTexture();for(let o of t)o.setDepthTexture(this.stableDepthTexture)}else i.setDepthTexture(this.stableDepthTexture)}removePass(i){let e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){let s=this.stableDepthTexture;if(s!==null){let a=(l,c)=>l||c.needsDepthTexture;e.reduce(a,!1)||(i.getDepthTexture()===s&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){let i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){let e=this.renderer,t=this.copyPass,n=this.inputBuffer,r=this.outputBuffer,s,a=!1;i===void 0&&(this.timer.update(),i=this.timer.getDelta());for(let o of this.passes)if(o.enabled){if(o.render(e,n,r,i,a),o.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(n),o.needsSwap){if(a){t.renderToScreen=o.renderToScreen;let l=e.getContext(),c=e.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),t.render(e,n,r,i,a),c.setFunc(l.EQUAL,1,4294967295)}s=n,n=r,r=s}o instanceof $C?a=!0:o instanceof JC&&(a=!1)}}setSize(i,e,t){let n=this.renderer,r=n.getSize(new we);(i===void 0||e===void 0)&&(i=r.width,e=r.height),(r.width!==i||r.height!==e)&&n.setSize(i,e,t);let s=n.getDrawingBufferSize(new we);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(s.width,s.height);for(let a of this.passes)a.setSize(s.width,s.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let i of this.passes)i.dispose();this.deleteDepthTexture(),this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.copyPass.dispose(),this.timer.dispose(),this.passes=[],wi.fullscreenGeometry.dispose()}},ea={NONE:0,DEPTH:1,CONVOLUTION:2},wt={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},i2=class{constructor(){this.shaderParts=new Map([[wt.FRAGMENT_HEAD,null],[wt.FRAGMENT_MAIN_UV,null],[wt.FRAGMENT_MAIN_IMAGE,null],[wt.VERTEX_HEAD,null],[wt.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=ea.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Ui}};var Bg=!1,gy=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case gn:t=this.materialsFlatShadedDoubleSide;break;case tn:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case gn:t=this.materialsDoubleSide;break;case tn:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(i){if(!(i instanceof rt))return i.clone();let e=i.uniforms,t=new Map;for(let r in e){let s=e[r].value;s.isRenderTargetTexture&&(e[r].value=null,t.set(r,s))}let n=i.clone();for(let r of t)e[r[0]].value=r[1],n.uniforms[r[0]].value=r[1];return n}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){let e=this.materials=[this.cloneMaterial(i),this.cloneMaterial(i),this.cloneMaterial(i)];for(let t of e)t.uniforms=Object.assign({},i.uniforms),t.side=ai;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=tn,n}),this.materialsDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=gn,n}),this.materialsFlatShaded=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=tn,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=gn,n})}}render(i,e,t){let n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,Bg){let r=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(let s of r)s[0].material=s[1];this.meshCount!==r.size&&r.clear()}else{let r=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=r}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){let i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Bg}static set workaroundEnabled(i){Bg=i}};var $s=-1,Ji=class extends Ai{constructor(i=null,e=$s,t=$s,n=1){super(),i!==null&&this.addEventListener("change",()=>i.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new we(1,1),this.preferredSize=new we(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new we,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==$s?t.width=e.width:e.height!==$s?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==$s?t.height=e.height:e.width!==$s?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar($s),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return $s}};var ft={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},r2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",s2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",a2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",o2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",l2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",c2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",u2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",h2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",f2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",d2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",p2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",m2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",g2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",v2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",x2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",_2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",y2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",A2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",S2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",M2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",T2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",E2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",w2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",b2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",C2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",R2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",D2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",P2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",I2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",B2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",U2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",L2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",F2=new Map([[ft.ADD,r2],[ft.ALPHA,s2],[ft.AVERAGE,a2],[ft.COLOR,o2],[ft.COLOR_BURN,l2],[ft.COLOR_DODGE,c2],[ft.DARKEN,u2],[ft.DIFFERENCE,h2],[ft.DIVIDE,f2],[ft.DST,null],[ft.EXCLUSION,d2],[ft.HARD_LIGHT,p2],[ft.HARD_MIX,m2],[ft.HUE,g2],[ft.INVERT,v2],[ft.INVERT_RGB,x2],[ft.LIGHTEN,_2],[ft.LINEAR_BURN,y2],[ft.LINEAR_DODGE,A2],[ft.LINEAR_LIGHT,S2],[ft.LUMINOSITY,M2],[ft.MULTIPLY,T2],[ft.NEGATION,E2],[ft.NORMAL,w2],[ft.OVERLAY,b2],[ft.PIN_LIGHT,C2],[ft.REFLECT,R2],[ft.SATURATION,D2],[ft.SCREEN,P2],[ft.SOFT_LIGHT,I2],[ft.SRC,B2],[ft.SUBTRACT,U2],[ft.VIVID_LIGHT,L2]]),N2=class extends Ai{constructor(i,e=1){super(),this._blendFunction=i,this.opacity=new Se(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return F2.get(this.blendFunction)}};var Za=class extends Ai{constructor(i,e,{attributes:t=ea.NONE,blendFunction:n=ft.NORMAL,defines:r=new Map,uniforms:s=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=r,this.uniforms=s,this.extensions=a,this.blendMode=new N2(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Ui,this._outputColorSpace=Ti}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=Mi){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(let i of Object.keys(this)){let e=this[i];(e instanceof vt||e instanceof Li||e instanceof Rn||e instanceof wi)&&this[i].dispose()}}};var dd={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},O2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,k2="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",z2=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],H2=class extends rt{constructor(i=new St){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new Se(null),texelSize:new Se(new St),scale:new Se(1),kernel:new Se(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:O2,vertexShader:k2}),this.setTexelSize(i.x,i.y),this.kernelSize=dd.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return z2[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){let t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},Sy=class extends wi{constructor({kernelSize:i=dd.MEDIUM,resolutionScale:e=.5,width:t=Ji.AUTO_SIZE,height:n=Ji.AUTO_SIZE,resolutionX:r=t,resolutionY:s=n}={}){super("KawaseBlurPass"),this.renderTargetA=new vt(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let a=this.resolution=new Ji(this,r,s,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new H2,this._blurMaterial.kernelSize=i,this.copyMaterial=new xy}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence,f=e;this.fullscreenMaterial=c;for(let h=0,d=u.length;h<d;++h){let p=(h&1)===0?o:l;c.kernel=u[h],c.inputBuffer=f.texture,i.setRenderTarget(p),i.render(s,a),f=p}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=f.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(s,a)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.renderTargetA.setSize(n,r),this.renderTargetB.setSize(n,r),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==xt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i!==null&&i.outputColorSpace===it&&(this.renderTargetA.texture.colorSpace=it,this.renderTargetB.texture.colorSpace=it))}static get AUTO_SIZE(){return Ji.AUTO_SIZE}},G2=`#include <common>
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
}`,V2=class extends rt{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:Xn.replace(/\D+/g,"")},uniforms:{inputBuffer:new Se(null),threshold:new Se(0),smoothing:new Se(1),range:new Se(null)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:G2,vertexShader:dl}),this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},My=class extends wi{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:r=Ji.AUTO_SIZE,height:s=Ji.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new V2(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new Ji(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,r){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},W2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,X2="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",Y2=class extends rt{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new Se(null),texelSize:new Se(new we)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:W2,vertexShader:X2})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},q2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,Q2="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",Z2=class extends rt{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new Se(null),supportBuffer:new Se(null),texelSize:new Se(new we),radius:new Se(.85)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:q2,vertexShader:Q2})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},K2=class extends wi{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new Y2,this.upsamplingMaterial=new Z2,this.resolution=new we}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){let e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){let n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){let r=e.clone();r.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,r){let{scene:s,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this,f=e;this.fullscreenMaterial=o;for(let h=0,d=c.length;h<d;++h){let p=c[h];o.setSize(f.width,f.height),o.inputBuffer=f.texture,i.setRenderTarget(p),i.render(s,a),f=p}this.fullscreenMaterial=l;for(let h=u.length-1;h>=0;--h){let d=u[h];l.setSize(f.width,f.height),l.inputBuffer=f.texture,l.supportBuffer=c[h].texture,i.setRenderTarget(d),i.render(s,a),f=d}}setSize(i,e){let t=this.resolution;t.set(i,e);let n=t.width,r=t.height;for(let s=0,a=this.downsamplingMipmaps.length;s<a;++s)n=Math.round(n*.5),r=Math.round(r*.5),this.downsamplingMipmaps[s].setSize(n,r),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(n,r)}initialize(i,e,t){if(t!==void 0){let n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let r of n)r.texture.type=t;if(t!==xt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i!==null&&i.outputColorSpace===it)for(let r of n)r.texture.colorSpace=it}}dispose(){super.dispose();for(let i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},J2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,Ty=class extends Za{constructor({blendFunction:i=ft.SCREEN,luminanceThreshold:e=1,luminanceSmoothing:t=.03,mipmapBlur:n=!0,intensity:r=1,radius:s=.85,levels:a=8,kernelSize:o=dd.LARGE,resolutionScale:l=.5,width:c=Ji.AUTO_SIZE,height:u=Ji.AUTO_SIZE,resolutionX:f=c,resolutionY:h=u}={}){super("BloomEffect",J2,{blendFunction:i,uniforms:new Map([["map",new Se(null)],["intensity",new Se(r)]])}),this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Sy({kernelSize:o}),this.luminancePass=new My({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new K2,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;let d=this.resolution=new Ji(this,f,h,l);d.addEventListener("change",p=>this.setSize(d.baseWidth,d.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){let n=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,r.renderTarget):this.blurPass.render(i,r.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}};var Ey={RED:0,GREEN:1,BLUE:2,ALPHA:3},wy={DISCARD:0,MULTIPLY:1,MULTIPLY_RGB_SET_ALPHA:2,MULTIPLY_RGB:3},j2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
}}`,fd=class extends rt{constructor(i=!1,e=!1){super({name:"BokehMaterial",defines:{PASS:i?"2":"1"},uniforms:{inputBuffer:new Se(null),cocBuffer:new Se(null),texelSize:new Se(new we),kernel64:new Se(null),kernel16:new Se(null),scale:new Se(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:j2,vertexShader:dl}),e&&(this.defines.FOREGROUND="1"),this.generateKernel()}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set cocBuffer(i){this.uniforms.cocBuffer.value=i}setCoCBuffer(i){this.uniforms.cocBuffer.value=i}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(i){return this.scale}setScale(i){this.scale=i}generateKernel(){let i=2.39996323,e=new Float64Array(128),t=new Float64Array(32),n=0,r=0;for(let s=0,a=Math.sqrt(80);s<80;++s){let o=s*i,l=Math.sqrt(s)/a,c=l*Math.cos(o),u=l*Math.sin(o);s%5===0?(t[r++]=c,t[r++]=u):(e[n++]=c,e[n++]=u)}this.uniforms.kernel64.value=e,this.uniforms.kernel16.value=t}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e)}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},$2=`#include <common>
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
void main(){float depth=readDepth(vUv);vec3 viewPosition=getViewPosition(vUv,depth);float distance=getDistance(viewPosition);float signedDistance=distance-focusDistance;float magnitude=smoothstep(0.0,focusRange,abs(signedDistance));gl_FragColor.rg=magnitude*vec2(step(signedDistance,0.0),step(0.0,signedDistance));}`,eR=class extends rt{constructor(i=null){super({name:"CircleOfConfusionMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new Se(null),projectionMatrix:new Se(null),projectionMatrixInverse:new Se(null),cameraNear:new Se(.3),cameraFar:new Se(1e3),focusDistance:new Se(0),focusRange:new Se(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:$2,vertexShader:dl}),this.uniforms.focalLength=this.uniforms.focusRange,i!==null&&this.copyCameraSettings(i)}set depthBuffer(i){this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=Mi){this.depthBuffer=i,this.depthPacking=e}get focusDistance(){return this.uniforms.focusDistance.value}set focusDistance(i){this.uniforms.focusDistance.value=i}get worldFocusDistance(){return this.focusDistance}set worldFocusDistance(i){this.focusDistance=i}getFocusDistance(i){this.uniforms.focusDistance.value=i}setFocusDistance(i){this.uniforms.focusDistance.value=i}get focalLength(){return this.focusRange}set focalLength(i){this.focusRange=i}get focusRange(){return this.uniforms.focusRange.value}set focusRange(i){this.uniforms.focusRange.value=i}get worldFocusRange(){return this.focusRange}set worldFocusRange(i){this.focusRange=i}getFocalLength(i){return this.focusRange}setFocalLength(i){this.focusRange=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){this.uniforms.projectionMatrix.value=i.projectionMatrix,this.uniforms.projectionMatrixInverse.value=i.projectionMatrixInverse,this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far;let e=this.defines.PERSPECTIVE_CAMERA!==void 0;i instanceof yn?e||(this.defines.PERSPECTIVE_CAMERA=!0,this.needsUpdate=!0):e&&(delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},tR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
}`,nR=class extends rt{constructor(i=null){super({name:"MaskMaterial",uniforms:{maskTexture:new Se(i),inputBuffer:new Se(null),strength:new Se(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:tR,vertexShader:dl}),this.colorChannel=Ey.RED,this.maskFunction=wy.DISCARD}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set maskTexture(i){this.uniforms.maskTexture.value=i,delete this.defines.MASK_PRECISION_HIGH,i.type!==xt&&(this.defines.MASK_PRECISION_HIGH="1"),this.needsUpdate=!0}setMaskTexture(i){this.maskTexture=i}set colorChannel(i){this.defines.COLOR_CHANNEL=i.toFixed(0),this.needsUpdate=!0}setColorChannel(i){this.colorChannel=i}set maskFunction(i){this.defines.MASK_FUNCTION=i.toFixed(0),this.needsUpdate=!0}setMaskFunction(i){this.maskFunction=i}get inverted(){return this.defines.INVERTED!==void 0}set inverted(i){this.inverted&&!i?delete this.defines.INVERTED:i&&(this.defines.INVERTED="1"),this.needsUpdate=!0}isInverted(){return this.inverted}setInverted(i){this.inverted=i}get strength(){return this.uniforms.strength.value}set strength(i){this.uniforms.strength.value=i}getStrength(){return this.strength}setStrength(i){this.strength=i}},fl=class extends wi{constructor(i,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,r){let s=this.fullscreenMaterial.uniforms;e!==null&&s!==void 0&&s[this.input]!==void 0&&(s[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},iR=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
vec4 result=inputColor*(1.0-cocNearFar.y)+colorFar;result=mix(result,colorNear,cocNearFar.x);outputColor=result;}`,rR=new B,by=class extends Za{constructor(i,{blendFunction:e,worldFocusDistance:t,worldFocusRange:n,focalLength:r,focusDistance:s=t||3,focusRange:a=n||r||2,bokehScale:o=1,resolutionScale:l=.5,width:c,height:u,resolutionX:f=c||Ji.AUTO_SIZE,resolutionY:h=u||Ji.AUTO_SIZE}={}){super("DepthOfFieldEffect",iR,{blendFunction:e,attributes:ea.DEPTH,uniforms:new Map([["nearColorBuffer",new Se(null)],["farColorBuffer",new Se(null)],["nearCoCBuffer",new Se(null)],["farCoCBuffer",new Se(null)],["scale",new Se(1)]])}),this.camera=i,this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="DoF.Intermediate",this.renderTargetMasked=this.renderTarget.clone(),this.renderTargetMasked.texture.name="DoF.Masked.Far",this.renderTargetNear=this.renderTarget.clone(),this.renderTargetNear.texture.name="DoF.Bokeh.Near",this.uniforms.get("nearColorBuffer").value=this.renderTargetNear.texture,this.renderTargetFar=this.renderTarget.clone(),this.renderTargetFar.texture.name="DoF.Bokeh.Far",this.uniforms.get("farColorBuffer").value=this.renderTargetFar.texture,this.renderTargetCoC=this.renderTarget.clone(),this.renderTargetCoC.texture.name="DoF.CoC",this.uniforms.get("farCoCBuffer").value=this.renderTargetCoC.texture,this.renderTargetCoCBlurred=this.renderTargetCoC.clone(),this.renderTargetCoCBlurred.texture.name="DoF.CoC.Blurred",this.uniforms.get("nearCoCBuffer").value=this.renderTargetCoCBlurred.texture,this.cocPass=new fl(new eR(i));let d=this.cocMaterial;d.focusDistance=s,d.focusRange=a,this.blurPass=new Sy({resolutionScale:l,resolutionX:f,resolutionY:h,kernelSize:dd.MEDIUM}),this.maskPass=new fl(new nR(this.renderTargetCoC.texture));let p=this.maskPass.fullscreenMaterial;p.colorChannel=Ey.GREEN,this.maskFunction=wy.MULTIPLY_RGB,this.bokehNearBasePass=new fl(new fd(!1,!0)),this.bokehNearBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehNearFillPass=new fl(new fd(!0,!0)),this.bokehNearFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehFarBasePass=new fl(new fd(!1,!1)),this.bokehFarBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.bokehFarFillPass=new fl(new fd(!0,!1)),this.bokehFarFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.target=null;let v=this.resolution=new Ji(this,f,h,l);v.addEventListener("change",g=>this.setSize(v.baseWidth,v.baseHeight)),this.bokehScale=o}set mainCamera(i){this.camera=i,this.cocMaterial.copyCameraSettings(i)}get cocTexture(){return this.renderTargetCoC.texture}get maskFunction(){return this.maskPass.fullscreenMaterial.maskFunction}set maskFunction(i){this.maskFunction!==i&&(this.defines.set("MASK_FUNCTION",i.toFixed(0)),this.maskPass.fullscreenMaterial.maskFunction=i,this.setChanged())}get cocMaterial(){return this.cocPass.fullscreenMaterial}get circleOfConfusionMaterial(){return this.cocMaterial}getCircleOfConfusionMaterial(){return this.cocMaterial}getBlurPass(){return this.blurPass}getResolution(){return this.resolution}get bokehScale(){return this.uniforms.get("scale").value}set bokehScale(i){this.bokehNearBasePass.fullscreenMaterial.scale=i,this.bokehNearFillPass.fullscreenMaterial.scale=i,this.bokehFarBasePass.fullscreenMaterial.scale=i,this.bokehFarFillPass.fullscreenMaterial.scale=i,this.maskPass.fullscreenMaterial.strength=i,this.uniforms.get("scale").value=i}getBokehScale(){return this.bokehScale}setBokehScale(i){this.bokehScale=i}getTarget(){return this.target}setTarget(i){this.target=i}calculateFocusDistance(i){return this.camera.getWorldPosition(rR).distanceTo(i)}setDepthTexture(i,e=Mi){this.cocMaterial.depthBuffer=i,this.cocMaterial.depthPacking=e}update(i,e,t){let n=this.renderTarget,r=this.renderTargetCoC,s=this.renderTargetCoCBlurred,a=this.renderTargetMasked;if(this.target!==null){let o=this.calculateFocusDistance(this.target);this.cocMaterial.focusDistance=o}this.cocPass.render(i,null,r),this.blurPass.render(i,r,s),this.maskPass.render(i,e,a),this.bokehFarBasePass.render(i,a,n),this.bokehFarFillPass.render(i,n,this.renderTargetFar),this.bokehNearBasePass.render(i,e,n),this.bokehNearFillPass.render(i,n,this.renderTargetNear)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.cocPass.setSize(i,e),this.blurPass.setSize(i,e),this.maskPass.setSize(i,e),this.renderTargetFar.setSize(i,e),this.renderTargetCoC.setSize(i,e),this.renderTargetMasked.setSize(i,e),this.renderTarget.setSize(n,r),this.renderTargetNear.setSize(n,r),this.renderTargetCoCBlurred.setSize(n,r),this.bokehNearBasePass.fullscreenMaterial.setSize(i,e),this.bokehNearFillPass.fullscreenMaterial.setSize(i,e),this.bokehFarBasePass.fullscreenMaterial.setSize(i,e),this.bokehFarFillPass.fullscreenMaterial.setSize(i,e)}initialize(i,e,t){this.cocPass.initialize(i,e,t),this.maskPass.initialize(i,e,t),this.bokehNearBasePass.initialize(i,e,t),this.bokehNearFillPass.initialize(i,e,t),this.bokehFarBasePass.initialize(i,e,t),this.bokehFarFillPass.initialize(i,e,t),this.blurPass.initialize(i,e,xt),i.capabilities.logarithmicDepthBuffer&&(this.cocPass.fullscreenMaterial.defines.LOG_DEPTH="1"),t!==void 0&&(this.renderTarget.texture.type=t,this.renderTargetNear.texture.type=t,this.renderTargetFar.texture.type=t,this.renderTargetMasked.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it,this.renderTargetNear.texture.colorSpace=it,this.renderTargetFar.texture.colorSpace=it,this.renderTargetMasked.texture.colorSpace=it))}};var Cy=class extends wi{constructor(i,e,t=null){super("RenderPass",i,e),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new yy,this.overrideMaterialManager=t===null?null:new gy(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){let i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){let e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new gy(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=s.background,u=i.shadowMap.autoUpdate,f=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(f),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,s,a):i.render(s,a),a.layers.mask=l,s.background=c,i.shadowMap.autoUpdate=u}};var Ei={LINEAR:0,REINHARD:1,REINHARD2:2,REINHARD2_ADAPTIVE:3,UNCHARTED2:4,OPTIMIZED_CINEON:5,CINEON:5,ACES_FILMIC:6,AGX:7,NEUTRAL:8},ou={DEFAULT:0,ESKIL:1};var sR=`void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec3 noise=vec3(rand(uv*(1.0+time)));
#ifdef PREMULTIPLY
outputColor=vec4(min(inputColor.rgb*noise,vec3(1.0)),inputColor.a);
#else
outputColor=vec4(noise,inputColor.a);
#endif
}`,Ry=class extends Za{constructor({blendFunction:i=ft.SCREEN,premultiply:e=!1}={}){super("NoiseEffect",sR,{blendFunction:i}),this.premultiply=e}get premultiply(){return this.defines.has("PREMULTIPLY")}set premultiply(i){this.premultiply!==i&&(i?this.defines.set("PREMULTIPLY","1"):this.defines.delete("PREMULTIPLY"),this.setChanged())}isPremultiplied(){return this.premultiply}setPremultiplied(i){this.premultiply=i}};var A3=Math.PI*.5;var aR=`#include <packing>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
uniform lowp sampler2D luminanceBuffer0;uniform lowp sampler2D luminanceBuffer1;uniform float minLuminance;uniform float deltaTime;uniform float tau;varying vec2 vUv;void main(){float l0=unpackRGBAToFloat(texture2D(luminanceBuffer0,vUv));
#if __VERSION__ < 300
float l1=texture2DLodEXT(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#else
float l1=textureLod(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#endif
l0=max(minLuminance,l0);l1=max(minLuminance,l1);float adaptedLum=l0+(l1-l0)*(1.0-exp(-deltaTime*tau));gl_FragColor=(adaptedLum==1.0)?vec4(1.0):packFloatToRGBA(adaptedLum);}`,oR=class extends rt{constructor(){super({name:"AdaptiveLuminanceMaterial",defines:{MIP_LEVEL_1X1:"0.0"},uniforms:{luminanceBuffer0:new Se(null),luminanceBuffer1:new Se(null),minLuminance:new Se(.01),deltaTime:new Se(0),tau:new Se(1)},extensions:{shaderTextureLOD:!0},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:aR,vertexShader:dl})}set luminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}setLuminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}set luminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}setLuminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}set mipLevel1x1(i){this.defines.MIP_LEVEL_1X1=i.toFixed(1),this.needsUpdate=!0}setMipLevel1x1(i){this.mipLevel1x1=i}set deltaTime(i){this.uniforms.deltaTime.value=i}setDeltaTime(i){this.uniforms.deltaTime.value=i}get minLuminance(){return this.uniforms.minLuminance.value}set minLuminance(i){this.uniforms.minLuminance.value=i}getMinLuminance(){return this.uniforms.minLuminance.value}setMinLuminance(i){this.uniforms.minLuminance.value=i}get adaptationRate(){return this.uniforms.tau.value}set adaptationRate(i){this.uniforms.tau.value=i}getAdaptationRate(){return this.uniforms.tau.value}setAdaptationRate(i){this.uniforms.tau.value=i}},lR=class extends wi{constructor(i,{minLuminance:e=.01,adaptationRate:t=1}={}){super("AdaptiveLuminancePass"),this.fullscreenMaterial=new oR,this.needsSwap=!1,this.renderTargetPrevious=new vt(1,1,{minFilter:Ct,magFilter:Ct,depthBuffer:!1}),this.renderTargetPrevious.texture.name="Luminance.Previous";let n=this.fullscreenMaterial;n.luminanceBuffer0=this.renderTargetPrevious.texture,n.luminanceBuffer1=i,n.minLuminance=e,n.adaptationRate=t,this.renderTargetAdapted=this.renderTargetPrevious.clone(),this.renderTargetAdapted.texture.name="Luminance.Adapted",this.copyPass=new _y(this.renderTargetPrevious,!1)}get texture(){return this.renderTargetAdapted.texture}getTexture(){return this.renderTargetAdapted.texture}set mipLevel1x1(i){this.fullscreenMaterial.mipLevel1x1=i}get adaptationRate(){return this.fullscreenMaterial.adaptationRate}set adaptationRate(i){this.fullscreenMaterial.adaptationRate=i}render(i,e,t,n,r){this.fullscreenMaterial.deltaTime=n,i.setRenderTarget(this.renderToScreen?null:this.renderTargetAdapted),i.render(this.scene,this.camera),this.copyPass.render(i,this.renderTargetAdapted)}},cR=`#include <tonemapping_pars_fragment>
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
}`,Dy=class extends Za{constructor({blendFunction:i=ft.SRC,adaptive:e=!1,mode:t=e?Ei.REINHARD2_ADAPTIVE:Ei.AGX,resolution:n=256,maxLuminance:r=4,whitePoint:s=r,middleGrey:a=.6,minLuminance:o=.01,averageLuminance:l=1,adaptationRate:c=1}={}){super("ToneMappingEffect",cR,{blendFunction:i,uniforms:new Map([["luminanceBuffer",new Se(null)],["maxLuminance",new Se(r)],["whitePoint",new Se(s)],["middleGrey",new Se(a)],["averageLuminance",new Se(l)]])}),this.renderTargetLuminance=new vt(1,1,{minFilter:Or,depthBuffer:!1}),this.renderTargetLuminance.texture.generateMipmaps=!0,this.renderTargetLuminance.texture.name="Luminance",this.luminancePass=new My({renderTarget:this.renderTargetLuminance}),this.adaptiveLuminancePass=new lR(this.luminancePass.texture,{minLuminance:o,adaptationRate:c}),this.uniforms.get("luminanceBuffer").value=this.adaptiveLuminancePass.texture,this.resolution=n,this.mode=t}get mode(){return Number(this.defines.get("TONE_MAPPING_MODE"))}set mode(i){if(this.mode===i)return;let t=Xn.replace(/\D+/g,"")>=168?"CineonToneMapping(texel)":"OptimizedCineonToneMapping(texel)";switch(this.defines.clear(),this.defines.set("TONE_MAPPING_MODE",i.toFixed(0)),i){case Ei.LINEAR:this.defines.set("toneMapping(texel)","LinearToneMapping(texel)");break;case Ei.REINHARD:this.defines.set("toneMapping(texel)","ReinhardToneMapping(texel)");break;case Ei.CINEON:case Ei.OPTIMIZED_CINEON:this.defines.set("toneMapping(texel)",t);break;case Ei.ACES_FILMIC:this.defines.set("toneMapping(texel)","ACESFilmicToneMapping(texel)");break;case Ei.AGX:this.defines.set("toneMapping(texel)","AgXToneMapping(texel)");break;case Ei.NEUTRAL:this.defines.set("toneMapping(texel)","NeutralToneMapping(texel)");break;default:this.defines.set("toneMapping(texel)","texel");break}this.adaptiveLuminancePass.enabled=i===Ei.REINHARD2_ADAPTIVE,this.setChanged()}getMode(){return this.mode}setMode(i){this.mode=i}get whitePoint(){return this.uniforms.get("whitePoint").value}set whitePoint(i){this.uniforms.get("whitePoint").value=i}get middleGrey(){return this.uniforms.get("middleGrey").value}set middleGrey(i){this.uniforms.get("middleGrey").value=i}get averageLuminance(){return this.uniforms.get("averageLuminance").value}set averageLuminance(i){this.uniforms.get("averageLuminance").value=i}get adaptiveLuminanceMaterial(){return this.adaptiveLuminancePass.fullscreenMaterial}getAdaptiveLuminanceMaterial(){return this.adaptiveLuminanceMaterial}get resolution(){return this.luminancePass.resolution.width}set resolution(i){let e=Math.max(0,Math.ceil(Math.log2(i))),t=Math.pow(2,e);this.luminancePass.resolution.setPreferredSize(t,t),this.adaptiveLuminanceMaterial.mipLevel1x1=e}getResolution(){return this.resolution}setResolution(i){this.resolution=i}get adaptive(){return this.mode===Ei.REINHARD2_ADAPTIVE}set adaptive(i){this.mode=i?Ei.REINHARD2_ADAPTIVE:Ei.REINHARD2}get adaptationRate(){return this.adaptiveLuminanceMaterial.adaptationRate}set adaptationRate(i){this.adaptiveLuminanceMaterial.adaptationRate=i}get distinction(){return console.warn(this.name,"distinction was removed."),1}set distinction(i){console.warn(this.name,"distinction was removed.")}update(i,e,t){this.adaptiveLuminancePass.enabled&&(this.luminancePass.render(i,e),this.adaptiveLuminancePass.render(i,null,null,t))}initialize(i,e,t){this.adaptiveLuminancePass.initialize(i,e,t)}},uR=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,Py=class extends Za{constructor({blendFunction:i,eskil:e=!1,technique:t=e?ou.ESKIL:ou.DEFAULT,offset:n=.5,darkness:r=.5}={}){super("VignetteEffect",uR,{blendFunction:i,defines:new Map([["VIGNETTE_TECHNIQUE",t.toFixed(0)]]),uniforms:new Map([["offset",new Se(n)],["darkness",new Se(r)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(i){this.technique!==i&&(this.defines.set("VIGNETTE_TECHNIQUE",i.toFixed(0)),this.setChanged())}get eskil(){return this.technique===ou.ESKIL}set eskil(i){this.technique=i?ou.ESKIL:ou.DEFAULT}getTechnique(){return this.technique}setTechnique(i){this.technique=i}get offset(){return this.uniforms.get("offset").value}set offset(i){this.uniforms.get("offset").value=i}getOffset(){return this.offset}setOffset(i){this.offset=i}get darkness(){return this.uniforms.get("darkness").value}set darkness(i){this.uniforms.get("darkness").value=i}getDarkness(){return this.darkness}setDarkness(i){this.darkness=i}};var hR=`#include <common>
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
}`,fR="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",dR=class extends rt{constructor(i,e,t,n,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Xn.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new Se(null),depthBuffer:new Se(null),resolution:new Se(new we),texelSize:new Se(new we),cameraNear:new Se(.3),cameraFar:new Se(1e3),aspect:new Se(1),time:new Se(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:r}),i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=Mi){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){return this.fragmentShader=hR.replace(wt.FRAGMENT_HEAD,i.get(wt.FRAGMENT_HEAD)||"").replace(wt.FRAGMENT_MAIN_UV,i.get(wt.FRAGMENT_MAIN_UV)||"").replace(wt.FRAGMENT_MAIN_IMAGE,i.get(wt.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=fR.replace(wt.VERTEX_HEAD,i.get(wt.VERTEX_HEAD)||"").replace(wt.VERTEX_MAIN_SUPPORT,i.get(wt.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(i){for(let e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(let e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(let e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof yn?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){let t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return wt}};var C3=Number(Xn.replace(/\D+/g,"")),Qa=255/256,R3=new Float32Array([Qa/256**3,Qa/256**2,Qa/256,Qa]),D3=new Float32Array([Qa,Qa/256,Qa/256**2,1/256**3]);function vy(i,e,t){for(let n of e){let r="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),s=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(let a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(s,r))}}function pR(i,e,t){let n=e.getFragmentShader(),r=e.getVertexShader(),s=n!==void 0&&/mainImage/.test(n),a=n!==void 0&&/mainUv/.test(n);if(t.attributes|=e.getAttributes(),n===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(t.attributes&ea.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!s&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts,c=l.get(wt.FRAGMENT_HEAD)||"",u=l.get(wt.FRAGMENT_MAIN_UV)||"",f=l.get(wt.FRAGMENT_MAIN_IMAGE)||"",h=l.get(wt.VERTEX_HEAD)||"",d=l.get(wt.VERTEX_MAIN_SUPPORT)||"",p=new Set,v=new Set;if(a&&(u+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),r!==null&&/mainSupport/.test(r)){let x=/mainSupport *\([\w\s]*?uv\s*?\)/.test(r);d+=`	${i}MainSupport(`,d+=x?`vUv);
`:`);
`;for(let y of r.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let A of y[1].split(/\s*,\s*/))t.varyings.add(A),p.add(A),v.add(A);for(let y of r.matchAll(o))v.add(y[1])}for(let x of n.matchAll(o))v.add(x[1]);for(let x of e.defines.keys())v.add(x.replace(/\([\w\s,]*\)/g,""));for(let x of e.uniforms.keys())v.add(x);v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((x,y)=>t.uniforms.set(i+y.charAt(0).toUpperCase()+y.slice(1),x)),e.defines.forEach((x,y)=>t.defines.set(i+y.charAt(0).toUpperCase()+y.slice(1),x));let g=new Map([["fragment",n],["vertex",r]]);vy(i,v,t.defines),vy(i,v,g),n=g.get("fragment"),r=g.get("vertex");let m=e.blendMode;if(t.blendModes.set(m.blendFunction,m),s){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(f+=e.inputColorSpace===it?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==Ti?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);let x=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${i}MainImage(color0, UV, `,(t.attributes&ea.DEPTH)!==0&&x.test(n)&&(f+="depth, ",t.readDepth=!0),f+=`color1);
	`;let y=i+"BlendOpacity";t.uniforms.set(y,m.opacity),f+=`color0 = blend${m.blendFunction}(color0, color1, ${y});

	`,c+=`uniform float ${y};

`}if(c+=n+`
`,r!==null&&(h+=r+`
`),l.set(wt.FRAGMENT_HEAD,c),l.set(wt.FRAGMENT_MAIN_UV,u),l.set(wt.FRAGMENT_MAIN_IMAGE,f),l.set(wt.VERTEX_HEAD,h),l.set(wt.VERTEX_MAIN_SUPPORT,d),e.extensions!==null)for(let x of e.extensions)t.extensions.add(x)}}var Fg=class extends wi{constructor(i,...e){super("EffectPass"),this.fullscreenMaterial=new dR(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(let e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(let e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){let e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let i=new i2,e=0;for(let a of this.effects)if(a.blendMode.blendFunction===ft.DST)i.attributes|=a.getAttributes()&ea.DEPTH;else{if((i.attributes&a.getAttributes()&ea.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);pR("e"+e++,a,i)}let t=i.shaderParts.get(wt.FRAGMENT_HEAD),n=i.shaderParts.get(wt.FRAGMENT_MAIN_IMAGE),r=i.shaderParts.get(wt.FRAGMENT_MAIN_UV),s=/\bblend\b/g;for(let a of i.blendModes.values())t+=a.getShaderCode().replace(s,`blend${a.blendFunction}`)+`
`;(i.attributes&ea.DEPTH)!==0?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===it&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(wt.FRAGMENT_HEAD,t),i.shaderParts.set(wt.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(wt.FRAGMENT_MAIN_UV,r);for(let[a,o]of i.shaderParts)o!==null&&i.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=Mi){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(let t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,r){for(let s of this.effects)s.update(i,e,n);if(!this.skipRendering||this.renderToScreen){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(let t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(let n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}};var I3=[new Float32Array(3),new Float32Array(3)],B3=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],U3=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var L3=[new Float32Array(2),new Float32Array(2)];var F3=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),N3=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],O3=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],k3=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var z3=new Map([[ui(0,0,0,0),new Float32Array([0,0,0,0])],[ui(0,0,0,1),new Float32Array([0,0,0,1])],[ui(0,0,1,0),new Float32Array([0,0,1,0])],[ui(0,0,1,1),new Float32Array([0,0,1,1])],[ui(0,1,0,0),new Float32Array([0,1,0,0])],[ui(0,1,0,1),new Float32Array([0,1,0,1])],[ui(0,1,1,0),new Float32Array([0,1,1,0])],[ui(0,1,1,1),new Float32Array([0,1,1,1])],[ui(1,0,0,0),new Float32Array([1,0,0,0])],[ui(1,0,0,1),new Float32Array([1,0,0,1])],[ui(1,0,1,0),new Float32Array([1,0,1,0])],[ui(1,0,1,1),new Float32Array([1,0,1,1])],[ui(1,1,0,0),new Float32Array([1,1,0,0])],[ui(1,1,0,1),new Float32Array([1,1,0,1])],[ui(1,1,1,0),new Float32Array([1,1,1,0])],[ui(1,1,1,1),new Float32Array([1,1,1,1])]]);function Ug(i,e,t){return i+(e-i)*t}function ui(i,e,t,n){let r=Ug(i,e,.75),s=Ug(t,n,1-.25);return Ug(r,s,1-.125)}var mR=`
	varying vec3 vDir;
	void main() {
		vDir = normalize( position );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`,gR=`
	uniform vec3 top;
	uniform vec3 horizon;
	uniform vec3 bottom;
	varying vec3 vDir;
	void main() {
		float y = vDir.y;
		vec3 c = y > 0.0 ? mix( horizon, top, pow( y, 0.7 ) ) : mix( horizon, bottom, pow( - y, 0.45 ) );
		gl_FragColor = vec4( c, 1.0 );
	}
`,md=[],pd=[1,.965,.92],By=[.94,.97,1],hr=[1,1,1],Ka={dome:{top:.6,horizon:.16,bottom:.04},cards:[[20,20,[0,28,0],2.6,hr],[12,26,[-22,8,14],2,By],[12,26,[22,8,14],2,pd],[28,10,[0,10,-26],1.6,hr],[4,30,[-26,2,-8],2.8,hr],[4,30,[26,2,-8],2.8,hr],[7,44,[Math.cos(.8)*25,0,Math.sin(.8)*25],.02,hr],[7,44,[Math.cos(2.35)*25,0,Math.sin(2.35)*25],.02,hr],[7,44,[Math.cos(3.95)*25,0,Math.sin(3.95)*25],.02,hr],[7,44,[Math.cos(5.5)*25,0,Math.sin(5.5)*25],.02,hr],[9,18,[-25,4,6],.25,hr],[9,18,[25,4,-2],.25,hr],[40,5,[0,2,28],.3,hr]],spot:{dome:{top:.4,horizon:.09,bottom:.02},cards:[[9,9,4.6],[4,14,4.2],[4,14,4.2],[12,4,3.2],[1.6,22,7.5],[1.6,22,7.5],[7,44,.02],[7,44,.02],[7,44,.02],[7,44,.02],[9,18,.08],[9,18,.08],[18,2.5,.8]]}},pl=(i,e,t)=>new Ye().setRGB(i,e,t,Ui);function Uy(i,e,t,n){i.add(new Rt(new Ga(60,64,32),new rt({vertexShader:mR,fragmentShader:gR,side:tn,depthWrite:!1,uniforms:{top:{value:e},horizon:{value:t},bottom:{value:n}}})))}function Gr(i,e,t,n,r,s=hr,a=!1){let o=a?new Vc(e/2,64):new cs(e,t),l=new za({side:gn});l.color.setRGB(s[0]*r,s[1]*r,s[2]*r,Ui);let c=new Rt(o,l);return c.position.set(n[0],n[1],n[2]),c.lookAt(0,0,0),i.add(c),c}function vR(){let i=new Er,e=Ka.dome;Uy(i,pl(e.top,e.top,e.top),pl(e.horizon,e.horizon,e.horizon*1.03),pl(e.bottom,e.bottom,e.bottom*1.05));for(let t of Ka.cards)Gr(i,...t);return i}function Ly(i=.22){let e=new oi,t=Ka.spot,n=Ka.cards.map(([c,u,f,h,d,p],v)=>{e.position.set(...f),e.lookAt(0,0,0),e.updateMatrixWorld(!0);let g=new B().setFromMatrixColumn(e.matrixWorld,0).normalize(),m=new B().setFromMatrixColumn(e.matrixWorld,1).normalize(),x=new B().setFromMatrixColumn(e.matrixWorld,2).normalize(),y=new B(...f),[A,S,E]=t.cards[v];return{dist:y.length(),au:g,av:m,color:d,from:[c,u,h],to:[A,S,E],dir:y.clone().normalize(),c:new St(y.x,y.y,y.z,p?1:0),u:new St,v:new St,n:new St(x.x,x.y,x.z,y.dot(x)),col:new B}}).sort((c,u)=>u.dist-c.dist),r=Ka.dome,s=new B,a=(c,u,f)=>c+(u-c)*f,o=-1,l={count:n.length,c:n.map(c=>c.c),u:n.map(c=>c.u),v:n.map(c=>c.v),n:n.map(c=>c.n),col:n.map(c=>c.col),dome:s,mood(c){if(c=Math.max(0,Math.min(1,c)),Math.abs(c-o)<1e-4)return;o=c;let u=(f,h)=>f*Math.pow(h/f,c);for(let f of n){let h=u(f.from[0],f.to[0]),d=u(f.from[1],f.to[1]),p=a(f.from[2],f.to[2],c),v=a(i,.12,c);f.u.set(f.au.x/(h/2),f.au.y/(h/2),f.au.z/(h/2),v/(h/2)),f.v.set(f.av.x/(d/2),f.av.y/(d/2),f.av.z/(d/2),v/(d/2)),f.col.set(f.color[0]*p,f.color[1]*p,f.color[2]*p)}s.set(a(r.top,t.dome.top,c),a(r.horizon,t.dome.horizon,c),a(r.bottom,t.dome.bottom,c)),Ng(c)}};return l.mood(0),l}function Ng(i){if(md.length=0,i<.05)return;let e=Ka.spot.cards;Ka.cards.forEach((t,n)=>{e[n][2]>=4&&md.push({dir:new B(...t[2]).normalize(),power:i*e[n][2]/7.5})})}function xR(){let i=new Er;return Uy(i,pl(.85,.85,.86),pl(.5,.5,.51),pl(.26,.26,.27)),Gr(i,26,14,[0,26,4],3.2,pd),Gr(i,7,32,[-24,4,6],2.8,By),Gr(i,7,32,[24,4,-6],2.8,pd),Gr(i,2.2,30,[-16,6,-20],4.5),Gr(i,2.2,30,[16,6,20],4,pd),Gr(i,12,8,[0,14,-24],2.4),Gr(i,8,40,[-20,0,-14],.14),Gr(i,8,40,[20,0,14],.14),Gr(i,60,8,[0,-8,26],.16),i}function Iy(i,e,t){let n=new ul(t,{type:li,generateMipmaps:!1,minFilter:Vt,magFilter:Vt});return new il(.1,200,n).update(i,e),n}function Fy(i,{size:e=512,metal:t=512}={}){let n=Iy(i,vR(),e),r=Iy(i,xR(),t),s=new cl(i),a=s.fromCubemap(r.texture);s.dispose();let o=new $e,l=new je;return{cube:n.texture,bright:r.texture,env:a.texture,rotation:o,angle:0,setAngle(c){this.angle=c,o.setFromMatrix4(l.makeRotationY(-c))},dispose(){n.dispose(),r.dispose(),a.dispose()}}}var _R=`
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
`,yR=`
	uniform float strength;
	varying float vAlpha;
	void main() {
		float r = length( gl_PointCoord - 0.5 ) * 2.0;
		float a = smoothstep( 1.0, 0.0, r );
		a *= a;
		gl_FragColor = vec4( vec3( 1.0, 0.93, 0.8 ) * a * vAlpha * strength, 1.0 );
	}
`,AR=`
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
`,SR=`
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
`;function Ny(i,{count:e=150}={}){let t=(()=>{let d=7;return()=>(d=d*16807%2147483647)/2147483647})(),n=new Float32Array(e*3),r=new Float32Array(e*4);for(let d=0;d<e;d++)n[d*3]=(t()-.5)*6.4,n[d*3+1]=(t()-.5)*4.8,n[d*3+2]=(t()-.5)*6.4,r.set([t(),t(),t(),t()],d*4);let s=new Lt;s.setAttribute("position",new ut(n,3)),s.setAttribute("seed",new ut(r,4));let a=new B(-.32,-1,.18).normalize(),o=new rt({vertexShader:_R,fragmentShader:yR,transparent:!0,depthWrite:!1,blending:Vs,uniforms:{time:{value:0},scale:{value:800},centre:{value:new B},lightDir:{value:a},strength:{value:0}}}),l=new zc(s,o);l.frustumCulled=!1,l.renderOrder=5,i.add(l);let c=7.5,u=new Wc(.12,1.15,c,64,1,!0);u.translate(0,c/2,0);let f=new rt({vertexShader:AR,fragmentShader:SR,transparent:!0,depthWrite:!1,blending:Vs,side:ai,uniforms:{strength:{value:0},tint:{value:new Ye(1,.9,.74).multiplyScalar(.07)}}}),h=new Rt(u,f);return h.frustumCulled=!1,h.renderOrder=4,h.quaternion.setFromUnitVectors(new B(0,1,0),a.clone().negate()),i.add(h),{update({time:d,centre:p,motes:v=0,beam:g=0,pxScale:m=800}){o.uniforms.time.value=d,o.uniforms.strength.value=v,o.uniforms.scale.value=m,o.uniforms.centre.value.copy(p),l.visible=v>.002,f.uniforms.strength.value=g,h.position.copy(p),h.visible=g>.002}}}var ml=Math.pow(2,-24),lu=Symbol("SKIP_GENERATION"),gd={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[lu]:!1};function qt(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function cu(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let r=i[n+3]-i[n];r>t&&(t=r,e=n)}return e}function Og(i,e){e.set(i)}function kg(i,e,t){let n,r;for(let s=0;s<3;s++){let a=s+3;n=i[s],r=e[s],t[s]=n<r?n:r,n=i[a],r=e[a],t[a]=n>r?n:r}}function uu(i,e,t){for(let n=0;n<3;n++){let r=e[i+2*n],s=e[i+2*n+1],a=r-s,o=r+s;a<t[n]&&(t[n]=a),o>t[n+3]&&(t[n+3]=o)}}function gl(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}function _t(i,e){return e[i+15]===65535}function bt(i,e){return e[i+6]}function Nt(i,e){return e[i+14]}function Dt(i){return i+8}function Pt(i,e){let t=e[i+6];return i+t*8}function ta(i,e){return e[i+7]}function vd(i,e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0,f=1/0,h=1/0,d=1/0,p=-1/0,v=-1/0,g=-1/0,m=i.offset||0;for(let x=(e-m)*6,y=(e+t-m)*6;x<y;x+=6){let A=i[x+0],S=i[x+1],E=A-S,T=A+S;E<s&&(s=E),T>l&&(l=T),A<f&&(f=A),A>p&&(p=A);let _=i[x+2],M=i[x+3],C=_-M,R=_+M;C<a&&(a=C),R>c&&(c=R),_<h&&(h=_),_>v&&(v=_);let w=i[x+4],P=i[x+5],F=w-P,N=w+P;F<o&&(o=F),N>u&&(u=N),w<d&&(d=w),w>g&&(g=w)}n[0]=s,n[1]=a,n[2]=o,n[3]=l,n[4]=c,n[5]=u,r[0]=f,r[1]=h,r[2]=d,r[3]=p,r[4]=v,r[5]=g}var fs=32,ER=(i,e)=>i.candidate-e.candidate,na=new Array(fs).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),xd=new Float32Array(6);function ky(i,e,t,n,r,s){let a=-1,o=0;if(s===0)a=cu(e),a!==-1&&(o=(e[a]+e[a+3])/2);else if(s===1)a=cu(i),a!==-1&&(o=wR(t,n,r,a));else if(s===2){let l=gl(i),c=1.25*r,u=t.offset||0,f=(n-u)*6,h=(n+r-u)*6;for(let d=0;d<3;d++){let p=e[d],m=(e[d+3]-p)/fs;if(r<fs/4){let x=[...na];x.length=r;let y=0;for(let S=f;S<h;S+=6,y++){let E=x[y];E.candidate=t[S+2*d],E.count=0;let{bounds:T,leftCacheBounds:_,rightCacheBounds:M}=E;for(let C=0;C<3;C++)M[C]=1/0,M[C+3]=-1/0,_[C]=1/0,_[C+3]=-1/0,T[C]=1/0,T[C+3]=-1/0;uu(S,t,T)}x.sort(ER);let A=r;for(let S=0;S<A;S++){let E=x[S];for(;S+1<A&&x[S+1].candidate===E.candidate;)x.splice(S+1,1),A--}for(let S=f;S<h;S+=6){let E=t[S+2*d];for(let T=0;T<A;T++){let _=x[T];E>=_.candidate?uu(S,t,_.rightCacheBounds):(uu(S,t,_.leftCacheBounds),_.count++)}}for(let S=0;S<A;S++){let E=x[S],T=E.count,_=r-E.count,M=E.leftCacheBounds,C=E.rightCacheBounds,R=0;T!==0&&(R=gl(M)/l);let w=0;_!==0&&(w=gl(C)/l);let P=1+1.25*(R*T+w*_);P<c&&(a=d,c=P,o=E.candidate)}}else{for(let A=0;A<fs;A++){let S=na[A];S.count=0,S.candidate=p+m+A*m;let E=S.bounds;for(let T=0;T<3;T++)E[T]=1/0,E[T+3]=-1/0}for(let A=f;A<h;A+=6){let T=~~((t[A+2*d]-p)/m);T>=fs&&(T=fs-1);let _=na[T];_.count++,uu(A,t,_.bounds)}let x=na[fs-1];Og(x.bounds,x.rightCacheBounds);for(let A=fs-2;A>=0;A--){let S=na[A],E=na[A+1];kg(S.bounds,E.rightCacheBounds,S.rightCacheBounds)}let y=0;for(let A=0;A<fs-1;A++){let S=na[A],E=S.count,T=S.bounds,M=na[A+1].rightCacheBounds;E!==0&&(y===0?Og(T,xd):kg(T,xd,xd)),y+=E;let C=0,R=0;y!==0&&(C=gl(xd)/l);let w=r-y;w!==0&&(R=gl(M)/l);let P=1+1.25*(C*y+R*w);P<c&&(a=d,c=P,o=S.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:a,pos:o}}function wR(i,e,t,n){let r=0,s=i.offset;for(let a=e,o=e+t;a<o;a++)r+=i[(a-s)*6+n*2];return r/t}var vl=class{constructor(){this.boundingData=new Float32Array(6)}};function zy(i,e,t,n,r,s){let a=n,o=n+r-1,l=s.pos,c=s.axis*2,u=t.offset||0;for(;;){for(;a<=o&&t[(a-u)*6+c]<l;)a++;for(;a<=o&&t[(o-u)*6+c]>=l;)o--;if(a<o){for(let f=0;f<e;f++){let h=i[a*e+f];i[a*e+f]=i[o*e+f],i[o*e+f]=h}for(let f=0;f<6;f++){let h=a-u,d=o-u,p=t[h*6+f];t[h*6+f]=t[d*6+f],t[d*6+f]=p}a++,o--}else return a}}var Hy,_d,Hg,Gy,bR=Math.pow(2,32);function yd(i){return"count"in i?1:1+yd(i.left)+yd(i.right)}function Vy(i,e,t){return Hy=new Float32Array(t),_d=new Uint32Array(t),Hg=new Uint16Array(t),Gy=new Uint8Array(t),Gg(i,e)}function Gg(i,e){let t=i/4,n=i/2,r="count"in e,s=e.boundingData;for(let a=0;a<6;a++)Hy[t+a]=s[a];if(r)return e.buffer?(Gy.set(new Uint8Array(e.buffer),i),i+e.buffer.byteLength):(_d[t+6]=e.offset,Hg[n+14]=e.count,Hg[n+15]=65535,i+32);{let{left:a,right:o,splitAxis:l}=e,c=i+32,u=Gg(c,a),f=i/32,d=u/32-f;if(d>bR)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return _d[t+6]=d,_d[t+7]=l,Gg(u,o)}}function CR(i,e,t,n,r,s){let{maxDepth:a,verbose:o,targetLeafSize:l,_strictLeafSize:c=1/0,strategy:u,onProgress:f}=r,h=i.primitiveBuffer,d=i.primitiveBufferStride,p=new Float32Array(6),v=!1,g=new vl;return vd(e,t,n,g.boundingData,p),x(g,t,n,p),g;function m(y){f&&f((y-s.offset)/s.count)}function x(y,A,S,E=null,T=0){!v&&T>=a&&(v=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));let _=S>c;if(S<=l&&!_||T>=a)return m(A+S),y.offset=A,y.count=S,y;let M=ky(y.boundingData,E,e,A,S,u),C=M.axis===-1?-1:zy(h,d,e,A,S,M);if(M.axis===-1||C===A||C===A+S){if(!_)return m(A+S),y.offset=A,y.count=S,y;M.axis=Math.max(0,cu(y.boundingData)),C=A+Math.max(1,Math.floor(S/2))}y.splitAxis=M.axis;let R=new vl,w=A,P=C-A;y.left=R,vd(e,w,P,R.boundingData,p),x(R,w,P,p,T+1);let F=new vl,N=C,O=S-P;return y.right=F,vd(e,N,O,F.boundingData,p),x(F,N,O,p,T+1),y}}function Wy(i,e){let t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(e.range),r=n[0],s=n[n.length-1],a={offset:r.offset,count:s.offset+s.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,i.computePrimitiveBounds(a.offset,a.count,o),i._roots=n.map(l=>{let c=CR(i,o,l.offset,l.count,e,a),u=yd(c),f=new t(32*u);return Vy(0,c,f),f})}var ia=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var Vg=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Mt=new Vg;var ra,_l,xl=[],Ad=new ia(()=>new Kt);function Xy(i,e,t,n,r,s){ra=Ad.getPrimitive(),_l=Ad.getPrimitive(),xl.push(ra,_l),Mt.setBuffer(i._roots[e]);let a=Wg(0,i.geometry,t,n,r,s);Mt.clearBuffer(),Ad.releasePrimitive(ra),Ad.releasePrimitive(_l),xl.pop(),xl.pop();let o=xl.length;return o>0&&(_l=xl[o-1],ra=xl[o-2]),a}function Wg(i,e,t,n,r=null,s=0,a=0){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=bt(i,c),d=Nt(u,l);return qt(i,o,ra),n(h,d,!1,a,s+i/8,ra)}else{let C=function(w){let{uint16Array:P,uint32Array:F}=Mt,N=w*2;for(;!_t(N,P);)w=Dt(w),N=w*2;return bt(w,F)},R=function(w){let{uint16Array:P,uint32Array:F}=Mt,N=w*2;for(;!_t(N,P);)w=Pt(w,F),N=w*2;return bt(w,F)+Nt(N,P)},h=Dt(i),d=Pt(i,c),p=h,v=d,g,m,x,y;if(r&&(x=ra,y=_l,qt(p,o,x),qt(v,o,y),g=r(x),m=r(y),m<g)){p=d,v=h;let w=g;g=m,m=w,x=y}x||(x=ra,qt(p,o,x));let A=_t(p*2,l),S=t(x,A,g,a+1,s+p/8),E;if(S===2){let w=C(p),F=R(p)-w;E=n(w,F,!0,a+1,s+p/8,x)}else E=S&&Wg(p,e,t,n,r,s,a+1);if(E)return!0;y=_l,qt(v,o,y);let T=_t(v*2,l),_=t(y,T,m,a+1,s+v/8),M;if(_===2){let w=C(v),F=R(v)-w;M=n(w,F,!0,a+1,s+v/8,y)}else M=_&&Wg(v,e,t,n,r,s,a+1);return!!M}}var hu=new Mt.constructor,Md=new Mt.constructor,sa=new ia(()=>new Kt),yl=new Kt,Al=new Kt,Xg=new Kt,Yg=new Kt,qg=!1;function Yy(i,e,t,n){if(qg)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");qg=!0;let r=i._roots,s=e._roots,a,o=0,l=0,c=new je().copy(t).invert();for(let u=0,f=r.length;u<f;u++){hu.setBuffer(r[u]),l=0;let h=sa.getPrimitive();qt(0,hu.float32Array,h),h.applyMatrix4(c);for(let d=0,p=s.length;d<p&&(Md.setBuffer(s[d]),a=br(0,0,t,c,n,o,l,0,0,h),Md.clearBuffer(),l+=s[d].byteLength/32,!a);d++);if(sa.releasePrimitive(h),hu.clearBuffer(),o+=r[u].byteLength/32,a)break}return qg=!1,a}function br(i,e,t,n,r,s=0,a=0,o=0,l=0,c=null,u=!1){let f,h;u?(f=Md,h=hu):(f=hu,h=Md);let d=f.float32Array,p=f.uint32Array,v=f.uint16Array,g=h.float32Array,m=h.uint32Array,x=h.uint16Array,y=i*2,A=e*2,S=_t(y,v),E=_t(A,x),T=!1;if(E&&S)u?T=r(bt(e,m),Nt(e*2,x),bt(i,p),Nt(i*2,v),l,a+e/8,o,s+i/8):T=r(bt(i,p),Nt(i*2,v),bt(e,m),Nt(e*2,x),o,s+i/8,l,a+e/8);else if(E){let _=sa.getPrimitive();qt(e,g,_),_.applyMatrix4(t);let M=Dt(i),C=Pt(i,p);qt(M,d,yl),qt(C,d,Al);let R=_.intersectsBox(yl),w=_.intersectsBox(Al);T=R&&br(e,M,n,t,r,a,s,l,o+1,_,!u)||w&&br(e,C,n,t,r,a,s,l,o+1,_,!u),sa.releasePrimitive(_)}else{let _=Dt(e),M=Pt(e,m);qt(_,g,Xg),qt(M,g,Yg);let C=c.intersectsBox(Xg),R=c.intersectsBox(Yg);if(C&&R)T=br(i,_,t,n,r,s,a,o,l+1,c,u)||br(i,M,t,n,r,s,a,o,l+1,c,u);else if(C)if(S)T=br(i,_,t,n,r,s,a,o,l+1,c,u);else{let w=sa.getPrimitive();w.copy(Xg).applyMatrix4(t);let P=Dt(i),F=Pt(i,p);qt(P,d,yl),qt(F,d,Al);let N=w.intersectsBox(yl),O=w.intersectsBox(Al);T=N&&br(_,P,n,t,r,a,s,l,o+1,w,!u)||O&&br(_,F,n,t,r,a,s,l,o+1,w,!u),sa.releasePrimitive(w)}else if(R)if(S)T=br(i,M,t,n,r,s,a,o,l+1,c,u);else{let w=sa.getPrimitive();w.copy(Yg).applyMatrix4(t);let P=Dt(i),F=Pt(i,p);qt(P,d,yl),qt(F,d,Al);let N=w.intersectsBox(yl),O=w.intersectsBox(Al);T=N&&br(M,P,n,t,r,a,s,l,o+1,w,!u)||O&&br(M,F,n,t,r,a,s,l,o+1,w,!u),sa.releasePrimitive(w)}}return T}var Td=new class{constructor(){let i=null,e=null,t=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,a)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=i=s._roots[a],this.uint16Array=t=new Uint16Array(i),this.uint32Array=e=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=s=>{let a=s*2;for(;!_t(a,t);)s=Dt(s),a=s*2;return bt(s,e)},this.getRangeEnd=s=>{let a=s*2;for(;!_t(a,t);)s=Pt(s,e),a=s*2;return bt(s,e)+Nt(a,t)};let r=(s,a,o)=>{let l=a*2,c=_t(l,t);if(!s(o,c,a)&&!c){let f=Dt(a),h=Pt(a,e);r(s,f,o+1),r(s,h,o+1)}};this.traverseBuffer=s=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{r(s,0,0)}finally{n=!1}},this.traverse=s=>{this.traverseBuffer((a,o,l)=>{if(o){let c=l*2,u=e[l+6],f=t[c+14];return s(a,o,new Float32Array(i,l*4,6),u,f)}else{let c=ta(l,e);return s(a,o,new Float32Array(i,l*4,6),c)}})}}};var qy=new Kt,Sl=new Float32Array(6),Ed=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...gd,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),Wy(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0;for(let f=e,h=e+t;f<h;f++){this.writePrimitiveBounds(f,Sl,0);let[d,p,v,g,m,x]=Sl;d<s&&(s=d),g>l&&(l=g),p<a&&(a=p),m>c&&(c=m),v<o&&(o=v),x>u&&(u=x)}return n[r+0]=s,n[r+1]=a,n[r+2]=o,n[r+3]=l,n[r+4]=c,n[r+5]=u,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let s=e,a=e+t;s<a;s++){this.writePrimitiveBounds(s,Sl,0);let[o,l,c,u,f,h]=Sl,d=(o+u)/2,p=(l+f)/2,v=(c+h)/2,g=(u-o)/2,m=(f-l)/2,x=(h-c)/2,y=(s-r)*6;n[y+0]=d,n[y+1]=g+(Math.abs(d)+g)*ml,n[y+2]=p,n[y+3]=m+(Math.abs(p)+m)*ml,n[y+4]=v,n[y+5]=x+(Math.abs(v)+x)*ml}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t)for(let n=0,r=t.length;n<r;n++)t[n]+=e;else{let n=this._roots;for(let r=0;r<n.length;r++){let s=n[r],a=new Uint32Array(s),o=new Uint16Array(s),l=s.byteLength/32;for(let c=0;c<l;c++){let u=8*c,f=2*u;_t(f,o)&&(a[u+6]+=e)}}}}traverse(e,t=0){Td.setBVH(this,t),Td.traverse(e),Td.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let r=e[t],s=new Uint32Array(r),a=new Uint16Array(r),o=new Float32Array(r),l=r.byteLength/32;for(let c=l-1;c>=0;c--){let u=c*8,f=u*2;if(_t(f,a)){let d=bt(u,s),p=Nt(f,a);this.writePrimitiveRangeBounds(d,p,Sl,0),o.set(Sl,u)}else{let d=Dt(u),p=Pt(u,s);for(let v=0;v<3;v++){let g=o[d+v],m=o[d+v+3],x=o[p+v],y=o[p+v+3];o[u+v]=g<x?g:x,o[u+v+3]=m>y?m:y}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{qt(0,new Float32Array(n),qy),e.union(qy)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:s,scratchPrimitive:a,iterate:o}=e;if(r&&s){let f=r;r=(h,d,p,v,g)=>f(h,d,p,v,g)?!0:o(h,d,this,s,p,v,a)}else r||(s?r=(f,h,d,p)=>o(f,h,this,s,d,p,a):r=(f,h,d)=>d);let l=!1,c=0,u=this._roots;for(let f=0,h=u.length;f<h;f++){let d=u[f];if(l=Xy(this,f,n,r,t,c),l)break;c+=d.byteLength/32}return l}bvhcast(e,t,n){let{intersectsRanges:r}=n;return Yy(this,e,t,r)}};function Qy(){return typeof SharedArrayBuffer<"u"}function fu(i){return i.index?i.index.count:i.attributes.position.count}function aa(i){return fu(i)/3}function Qg(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function Zy(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=Qg(t,n);i.setIndex(new ut(r,1));for(let s=0;s<t;s++)r[s]=s}}function DR(i,e,t){let n=fu(i)/t,r=e||i.drawRange,s=r.start/t,a=(r.start+r.count)/t,o=Math.max(0,s),l=Math.min(n,a)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function PR(i,e){return i.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Zg(i,e,t){let n=DR(i,e,t),r=PR(i,t);if(!r.length)return[n];let s=[],a=n.offset,o=n.offset+n.count,l=fu(i)/t,c=[];for(let h of r){let{offset:d,count:p}=h,v=d,g=isFinite(p)?p:l-d,m=d+g;v<o&&m>a&&(c.push({pos:Math.max(a,v),isStart:!0}),c.push({pos:Math.min(o,m),isStart:!1}))}c.sort((h,d)=>h.pos!==d.pos?h.pos-d.pos:h.type==="end"?-1:1);let u=0,f=null;for(let h of c){let d=h.pos;u!==0&&d!==f&&s.push({offset:f,count:d-f}),u+=h.isStart?1:-1,f=d}return s}function IR(i,e){let t=i[i.length-1],n=t.offset+t.count>2**16,r=i.reduce((c,u)=>c+u.count,0),s=n?4:2,a=e?new SharedArrayBuffer(r*s):new ArrayBuffer(r*s),o=n?new Uint32Array(a):new Uint16Array(a),l=0;for(let c=0;c<i.length;c++){let{offset:u,count:f}=i[c];for(let h=0;h<f;h++)o[l+h]=u+h;l+=f}return o}var wd=class extends Ed{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!Qy())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...gd,...t},t[lu]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Zg(t,e.range,n),s=IR(r,e.useSharedArrayBuffer);this._indirectBuffer=s}else Zy(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new Kt))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Zg(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var ji=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let s=0,a=e.length;s<a;s++){let l=e[s][t];n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let s=0,a=t.length;s<a;s++){let o=t[s],l=e.dot(o);n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};ji.prototype.setFromBox=function(){let i=new B;return function(t,n){let r=n.min,s=n.max,a=1/0,o=-1/0;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){i.x=r.x*l+s.x*(1-l),i.y=r.y*c+s.y*(1-c),i.z=r.z*u+s.z*(1-u);let f=t.dot(i);a=Math.min(f,a),o=Math.max(f,o)}this.min=a,this.max=o}}();var BR=function(){let i=new B,e=new B,t=new B;return function(r,s,a){let o=r.start,l=i,c=s.start,u=e;t.subVectors(o,c),i.subVectors(r.end,r.start),e.subVectors(s.end,s.start);let f=t.dot(u),h=u.dot(l),d=u.dot(u),p=t.dot(l),g=l.dot(l)*d-h*h,m,x;g!==0?m=(f*h-p*d)/g:m=0,x=(f+m*h)/d,a.x=m,a.y=x}}(),du=function(){let i=new we,e=new B,t=new B;return function(r,s,a,o){BR(r,s,i);let l=i.x,c=i.y;if(l>=0&&l<=1&&c>=0&&c<=1){r.at(l,a),s.at(c,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else{let u;l<0?u=r.start:u=r.end;let f;c<0?f=s.start:f=s.end;let h=e,d=t;if(r.closestPointToPoint(f,!0,e),s.closestPointToPoint(u,!0,t),h.distanceToSquared(f)<=d.distanceToSquared(u)){a.copy(h),o.copy(f);return}else{a.copy(u),o.copy(d);return}}}}(),Ky=function(){let i=new B,e=new B,t=new Bi,n=new Si;return function(s,a){let{radius:o,center:l}=s,{a:c,b:u,c:f}=a;if(n.start=c,n.end=u,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o||(n.start=c,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o)||(n.start=u,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o))return!0;let v=a.getPlane(t);if(Math.abs(v.distanceToPoint(l))<=o){let m=v.projectPoint(l,e);if(a.containsPoint(m))return!0}return!1}}();var UR=["x","y","z"],ds=1e-15,Jy=ds*ds;function fr(i){return Math.abs(i)<ds}var Yn=class extends Vn{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new B),this.satBounds=new Array(4).fill().map(()=>new ji),this.points=[this.a,this.b,this.c],this.plane=new Bi,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Si,this.needsUpdate=!0}intersectsSphere(e){return Ky(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,s=this.satAxes,a=this.satBounds,o=s[0],l=a[0];this.getNormal(o),l.setFromPoints(o,r);let c=s[1],u=a[1];c.subVectors(e,t),u.setFromPoints(c,r);let f=s[2],h=a[2];f.subVectors(t,n),h.setFromPoints(f,r);let d=s[3],p=a[3];d.subVectors(n,e),p.setFromPoints(d,r);let v=c.length(),g=f.length(),m=d.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,v<ds?g<ds||m<ds?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):g<ds?m<ds?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):m<ds&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Yn.prototype.closestPointToSegment=function(){let i=new B,e=new B,t=new Si;return function(r,s=null,a=null){let{start:o,end:l}=r,c=this.points,u,f=1/0;for(let h=0;h<3;h++){let d=(h+1)%3;t.start.copy(c[h]),t.end.copy(c[d]),du(t,r,i,e),u=i.distanceToSquared(e),u<f&&(f=u,s&&s.copy(i),a&&a.copy(e))}return this.closestPointToPoint(o,i),u=o.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(o)),this.closestPointToPoint(l,i),u=l.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(l)),Math.sqrt(f)}}();Yn.prototype.intersectsTriangle=function(){let i=new Yn,e=new ji,t=new ji,n=new B,r=new B,s=new B,a=new B,o=new Si,l=new Si,c=new B,u=new we,f=new we;function h(y,A,S,E){let T=n;!y.isDegenerateIntoPoint&&!y.isDegenerateIntoSegment?T.copy(y.plane.normal):T.copy(A.plane.normal);let _=y.satBounds,M=y.satAxes;for(let w=1;w<4;w++){let P=_[w],F=M[w];if(e.setFromPoints(F,A.points),P.isSeparated(e)||(a.copy(T).cross(F),e.setFromPoints(a,y.points),t.setFromPoints(a,A.points),e.isSeparated(t)))return!1}let C=A.satBounds,R=A.satAxes;for(let w=1;w<4;w++){let P=C[w],F=R[w];if(e.setFromPoints(F,y.points),P.isSeparated(e)||(a.crossVectors(T,F),e.setFromPoints(a,y.points),t.setFromPoints(a,A.points),e.isSeparated(t)))return!1}return S&&(E||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),S.start.set(0,0,0),S.end.set(0,0,0)),!0}function d(y,A,S,E,T,_,M,C,R,w,P){let F=M/(M-C);w.x=E+(T-E)*F,P.start.subVectors(A,y).multiplyScalar(F).add(y),F=M/(M-R),w.y=E+(_-E)*F,P.end.subVectors(S,y).multiplyScalar(F).add(y)}function p(y,A,S,E,T,_,M,C,R,w,P){if(T>0)d(y.c,y.a,y.b,E,A,S,R,M,C,w,P);else if(_>0)d(y.b,y.a,y.c,S,A,E,C,M,R,w,P);else if(C*R>0||M!=0)d(y.a,y.b,y.c,A,S,E,M,C,R,w,P);else if(C!=0)d(y.b,y.a,y.c,S,A,E,C,M,R,w,P);else if(R!=0)d(y.c,y.a,y.b,E,A,S,R,M,C,w,P);else return!0;return!1}function v(y,A,S,E){let T=A.degenerateSegment,_=y.plane.distanceToPoint(T.start),M=y.plane.distanceToPoint(T.end);return fr(_)?fr(M)?h(y,A,S,E):(S&&(S.start.copy(T.start),S.end.copy(T.start)),y.containsPoint(T.start)):fr(M)?(S&&(S.start.copy(T.end),S.end.copy(T.end)),y.containsPoint(T.end)):y.plane.intersectLine(T,n)!=null?(S&&(S.start.copy(n),S.end.copy(n)),y.containsPoint(n)):!1}function g(y,A,S){let E=A.a;return fr(y.plane.distanceToPoint(E))&&y.containsPoint(E)?(S&&(S.start.copy(E),S.end.copy(E)),!0):!1}function m(y,A,S){let E=y.degenerateSegment,T=A.a;return E.closestPointToPoint(T,!0,n),T.distanceToSquared(n)<Jy?(S&&(S.start.copy(T),S.end.copy(T)),!0):!1}function x(y,A,S,E){if(y.isDegenerateIntoSegment)if(A.isDegenerateIntoSegment){let T=y.degenerateSegment,_=A.degenerateSegment,M=r,C=s;T.delta(M),_.delta(C);let R=n.subVectors(_.start,T.start),w=M.x*C.y-M.y*C.x;if(fr(w))return!1;let P=(R.x*C.y-R.y*C.x)/w,F=-(M.x*R.y-M.y*R.x)/w;if(P<0||P>1||F<0||F>1)return!1;let N=T.start.z+M.z*P,O=_.start.z+C.z*F;return fr(N-O)?(S&&(S.start.copy(T.start).addScaledVector(M,P),S.end.copy(T.start).addScaledVector(M,P)),!0):!1}else return A.isDegenerateIntoPoint?m(y,A,S):v(A,y,S,E);else{if(y.isDegenerateIntoPoint)return A.isDegenerateIntoPoint?A.a.distanceToSquared(y.a)<Jy?(S&&(S.start.copy(y.a),S.end.copy(y.a)),!0):!1:A.isDegenerateIntoSegment?m(A,y,S):g(A,y,S);if(A.isDegenerateIntoPoint)return g(y,A,S);if(A.isDegenerateIntoSegment)return v(y,A,S,E)}}return function(A,S=null,E=!1){this.needsUpdate&&this.update(),A.isExtendedTriangle?A.needsUpdate&&A.update():(i.copy(A),i.update(),A=i);let T=x(this,A,S,E);if(T!==void 0)return T;let _=this.plane,M=A.plane,C=M.distanceToPoint(this.a),R=M.distanceToPoint(this.b),w=M.distanceToPoint(this.c);fr(C)&&(C=0),fr(R)&&(R=0),fr(w)&&(w=0);let P=C*R,F=C*w;if(P>0&&F>0)return!1;let N=_.distanceToPoint(A.a),O=_.distanceToPoint(A.b),H=_.distanceToPoint(A.c);fr(N)&&(N=0),fr(O)&&(O=0),fr(H)&&(H=0);let j=N*O,G=N*H;if(j>0&&G>0)return!1;r.copy(_.normal),s.copy(M.normal);let I=r.cross(s),te=0,ie=Math.abs(I.x),xe=Math.abs(I.y);xe>ie&&(ie=xe,te=1),Math.abs(I.z)>ie&&(te=2);let Ne=UR[te],Q=this.a[Ne],se=this.b[Ne],ae=this.c[Ne],re=A.a[Ne],he=A.b[Ne],me=A.c[Ne];if(p(this,Q,se,ae,P,F,C,R,w,u,o))return h(this,A,S,E);if(p(A,re,he,me,j,G,N,O,H,f,l))return h(this,A,S,E);if(u.y<u.x){let Ae=u.y;u.y=u.x,u.x=Ae,c.copy(o.start),o.start.copy(o.end),o.end.copy(c)}if(f.y<f.x){let Ae=f.y;f.y=f.x,f.x=Ae,c.copy(l.start),l.start.copy(l.end),l.end.copy(c)}return u.y<f.x||f.y<u.x?!1:(S&&(f.x>u.x?S.start.copy(l.start):S.start.copy(o.start),f.y<u.y?S.end.copy(l.end):S.end.copy(o.end)),!0)}}();Yn.prototype.distanceToPoint=function(){let i=new B;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();Yn.prototype.distanceToTriangle=function(){let i=new B,e=new B,t=["a","b","c"],n=new Si,r=new Si;return function(a,o=null,l=null){let c=o||l?n:null;if(this.intersectsTriangle(a,c,!0))return(o||l)&&(o&&c.getCenter(o),l&&c.getCenter(l)),0;let u=1/0;for(let f=0;f<3;f++){let h,d=t[f],p=a[d];this.closestPointToPoint(p,i),h=p.distanceToSquared(i),h<u&&(u=h,o&&o.copy(i),l&&l.copy(p));let v=this[d];a.closestPointToPoint(v,i),h=v.distanceToSquared(i),h<u&&(u=h,o&&o.copy(v),l&&l.copy(i))}for(let f=0;f<3;f++){let h=t[f],d=t[(f+1)%3];n.set(this[h],this[d]);for(let p=0;p<3;p++){let v=t[p],g=t[(p+1)%3];r.set(a[v],a[g]),du(n,r,i,e);let m=i.distanceToSquared(e);m<u&&(u=m,o&&o.copy(i),l&&l.copy(e))}}return Math.sqrt(u)}}();var fn=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new B,this.max=new B,this.matrix=new je,this.invMatrix=new je,this.points=new Array(8).fill().map(()=>new B),this.satAxes=new Array(3).fill().map(()=>new B),this.satBounds=new Array(3).fill().map(()=>new ji),this.alignedSatBounds=new Array(3).fill().map(()=>new ji),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};fn.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){let h=1*c|2*u|4*f,d=r[h];d.x=c?n.x:t.x,d.y=u?n.y:t.y,d.z=f?n.z:t.z,d.applyMatrix4(e)}let s=this.satBounds,a=this.satAxes,o=r[0];for(let c=0;c<3;c++){let u=a[c],f=s[c],h=1<<c,d=r[h];u.subVectors(o,d),f.setFromPoints(u,r)}let l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();fn.prototype.intersectsBox=function(){let i=new ji;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,s=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(i.min=n.x,i.max=r.x,o[0].isSeparated(i)||(i.min=n.y,i.max=r.y,o[1].isSeparated(i))||(i.min=n.z,i.max=r.z,o[2].isSeparated(i)))return!1;for(let l=0;l<3;l++){let c=a[l],u=s[l];if(i.setFromBox(c,t),u.isSeparated(i))return!1}return!0}}();fn.prototype.intersectsTriangle=function(){let i=new Yn,e=new Array(3),t=new ji,n=new ji,r=new B;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(i.copy(a),i.update(),a=i);let o=this.satBounds,l=this.satAxes;e[0]=a.a,e[1]=a.b,e[2]=a.c;for(let h=0;h<3;h++){let d=o[h],p=l[h];if(t.setFromPoints(p,e),d.isSeparated(t))return!1}let c=a.satBounds,u=a.satAxes,f=this.points;for(let h=0;h<3;h++){let d=c[h],p=u[h];if(t.setFromPoints(p,f),d.isSeparated(t))return!1}for(let h=0;h<3;h++){let d=l[h];for(let p=0;p<4;p++){let v=u[p];if(r.crossVectors(d,v),t.setFromPoints(r,e),n.setFromPoints(r,f),t.isSeparated(n))return!1}}return!0}}();fn.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();fn.prototype.distanceToPoint=function(){let i=new B;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();fn.prototype.distanceToBox=function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new Si),t=new Array(12).fill().map(()=>new Si),n=new B,r=new B;return function(a,o=0,l=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(l||c)&&(a.getCenter(r),this.closestPointToPoint(r,n),a.closestPointToPoint(n,r),l&&l.copy(n),c&&c.copy(r)),0;let u=o*o,f=a.min,h=a.max,d=this.points,p=1/0;for(let g=0;g<8;g++){let m=d[g];r.copy(m).clamp(f,h);let x=m.distanceToSquared(r);if(x<p&&(p=x,l&&l.copy(m),c&&c.copy(r),x<u))return Math.sqrt(x)}let v=0;for(let g=0;g<3;g++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){let y=(g+1)%3,A=(g+2)%3,S=m<<y|x<<A,E=1<<g|m<<y|x<<A,T=d[S],_=d[E];e[v].set(T,_);let C=i[g],R=i[y],w=i[A],P=t[v],F=P.start,N=P.end;F[C]=f[C],F[R]=m?f[R]:h[R],F[w]=x?f[w]:h[R],N[C]=h[C],N[R]=m?f[R]:h[R],N[w]=x?f[w]:h[R],v++}for(let g=0;g<=1;g++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){r.x=g?h.x:f.x,r.y=m?h.y:f.y,r.z=x?h.z:f.z,this.closestPointToPoint(r,n);let y=r.distanceToSquared(n);if(y<p&&(p=y,l&&l.copy(n),c&&c.copy(r),y<u))return Math.sqrt(y)}for(let g=0;g<12;g++){let m=e[g];for(let x=0;x<12;x++){let y=t[x];du(m,y,n,r);let A=n.distanceToSquared(r);if(A<p&&(p=A,l&&l.copy(n),c&&c.copy(r),A<u))return Math.sqrt(A)}}return Math.sqrt(p)}}();var Kg=class extends ia{constructor(){super(()=>new Yn)}},bi=new Kg;var pu=new B,Jg=new B;function jy(i,e,t={},n=0,r=1/0){let s=n*n,a=r*r,o=1/0,l=null;if(i.shapecast({boundsTraverseOrder:u=>(pu.copy(e).clamp(u.min,u.max),pu.distanceToSquared(e)),intersectsBounds:(u,f,h)=>h<o&&h<a,intersectsTriangle:(u,f)=>{u.closestPointToPoint(e,pu);let h=e.distanceToSquared(pu);return h<o&&(Jg.copy(pu),o=h,l=f),h<s}}),o===1/0)return null;let c=Math.sqrt(o);return t.point?t.point.copy(Jg):t.point=Jg.clone(),t.distance=c,t.faceIndex=l,t}var bd=parseInt(Xn)>=169,LR=parseInt(Xn)<=161,Ja=new B,ja=new B,$a=new B,Cd=new we,Rd=new we,Dd=new we,$y=new B,eA=new B,tA=new B,mu=new B;function FR(i,e,t,n,r,s,a,o){let l;if(s===tn?l=i.intersectTriangle(n,t,e,!0,r):l=i.intersectTriangle(e,t,n,s!==gn,r),l===null)return null;let c=i.origin.distanceTo(r);return c<a||c>o?null:{distance:c,point:r.clone()}}function nA(i,e,t,n,r,s,a,o,l,c,u){Ja.fromBufferAttribute(e,s),ja.fromBufferAttribute(e,a),$a.fromBufferAttribute(e,o);let f=FR(i,Ja,ja,$a,mu,l,c,u);if(f){if(n){Cd.fromBufferAttribute(n,s),Rd.fromBufferAttribute(n,a),Dd.fromBufferAttribute(n,o),f.uv=new we;let d=Vn.getInterpolation(mu,Ja,ja,$a,Cd,Rd,Dd,f.uv);bd||(f.uv=d)}if(r){Cd.fromBufferAttribute(r,s),Rd.fromBufferAttribute(r,a),Dd.fromBufferAttribute(r,o),f.uv1=new we;let d=Vn.getInterpolation(mu,Ja,ja,$a,Cd,Rd,Dd,f.uv1);bd||(f.uv1=d),LR&&(f.uv2=f.uv1)}if(t){$y.fromBufferAttribute(t,s),eA.fromBufferAttribute(t,a),tA.fromBufferAttribute(t,o),f.normal=new B;let d=Vn.getInterpolation(mu,Ja,ja,$a,$y,eA,tA,f.normal);f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1),bd||(f.normal=d)}let h={a:s,b:a,c:o,normal:new B,materialIndex:0};if(Vn.getNormal(Ja,ja,$a,h.normal),f.face=h,f.faceIndex=s,bd){let d=new B;Vn.getBarycoord(mu,Ja,ja,$a,d),f.barycoord=d}}return f}function iA(i){return i&&i.isMaterial?i.side:i}function Ml(i,e,t,n,r,s,a){let o=n*3,l=o+0,c=o+1,u=o+2,{index:f,groups:h}=i;i.index&&(l=f.getX(l),c=f.getX(c),u=f.getX(u));let{position:d,normal:p,uv:v,uv1:g}=i.attributes;if(Array.isArray(e)){let m=n*3;for(let x=0,y=h.length;x<y;x++){let{start:A,count:S,materialIndex:E}=h[x];if(m>=A&&m<A+S){let T=iA(e[E]),_=nA(t,d,p,v,g,l,c,u,T,s,a);if(_)if(_.faceIndex=n,_.face.materialIndex=E,r)r.push(_);else return _}}}else{let m=iA(e),x=nA(t,d,p,v,g,l,c,u,m,s,a);if(x)if(x.faceIndex=n,x.face.materialIndex=0,r)r.push(x);else return x}return null}function Qt(i,e,t,n){let r=i.a,s=i.b,a=i.c,o=e,l=e+1,c=e+2;t&&(o=t.getX(o),l=t.getX(l),c=t.getX(c)),r.x=n.getX(o),r.y=n.getY(o),r.z=n.getZ(o),s.x=n.getX(l),s.y=n.getY(l),s.z=n.getZ(l),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c)}function rA(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++)Ml(l,e,t,u,s,a,o)}function sA(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=Ml(o,e,t,f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function aA(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=u,Qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function oA(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,p=!1){let v=h*2;if(_t(v,o)){let g=bt(h,a),m=Nt(v,o),x=1/0,y=1/0,A=1/0,S=-1/0,E=-1/0,T=-1/0;for(let _=3*g,M=3*(g+m);_<M;_++){let C=n[_],R=r.getX(C),w=r.getY(C),P=r.getZ(C);R<x&&(x=R),R>S&&(S=R),w<y&&(y=w),w>E&&(E=w),P<A&&(A=P),P>T&&(T=P)}return l[h+0]!==x||l[h+1]!==y||l[h+2]!==A||l[h+3]!==S||l[h+4]!==E||l[h+5]!==T?(l[h+0]=x,l[h+1]=y,l[h+2]=A,l[h+3]=S,l[h+4]=E,l[h+5]=T,!0):!1}else{let g=Dt(h),m=Pt(h,a),x=p,y=!1,A=!1;if(e){if(!x){let C=g/8+d/32,R=m/8+d/32;y=e.has(C),A=e.has(R),x=!y&&!A}}else y=!0,A=!0;let S=x||y,E=x||A,T=!1;S&&(T=f(g,d,x));let _=!1;E&&(_=f(m,d,x));let M=T||_;if(M)for(let C=0;C<3;C++){let R=g+C,w=m+C,P=l[R],F=l[R+3],N=l[w],O=l[w+3];l[h+C]=P<N?P:N,l[h+C+3]=F>O?F:O}return M}}}function dr(i,e,t,n,r){let s,a,o,l,c,u,f=1/t.direction.x,h=1/t.direction.y,d=1/t.direction.z,p=t.origin.x,v=t.origin.y,g=t.origin.z,m=e[i],x=e[i+3],y=e[i+1],A=e[i+3+1],S=e[i+2],E=e[i+3+2];return f>=0?(s=(m-p)*f,a=(x-p)*f):(s=(x-p)*f,a=(m-p)*f),h>=0?(o=(y-v)*h,l=(A-v)*h):(o=(A-v)*h,l=(y-v)*h),s>l||o>a||((o>s||isNaN(s))&&(s=o),(l<a||isNaN(a))&&(a=l),d>=0?(c=(S-g)*d,u=(E-g)*d):(c=(E-g)*d,u=(S-g)*d),s>u||c>a)?!1:((c>s||s!==s)&&(s=c),(u<a||a!==a)&&(a=u),s<=r&&a>=n)}function lA(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++){let h=c?c[u]:u;Ml(l,e,t,h,s,a,o)}}function cA(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=Ml(o,e,t,l?l[f]:f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function uA(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=t.resolveTriangleIndex(u),Qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function hA(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),jg(0,i,t,n,r,s,a),Mt.clearBuffer()}function jg(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=bt(i,c),d=Nt(u,l);rA(e,t,n,h,d,r,s,a)}else{let h=Dt(i);dr(h,o,n,s,a)&&jg(h,e,t,n,r,s,a);let d=Pt(i,c);dr(d,o,n,s,a)&&jg(d,e,t,n,r,s,a)}}var NR=["x","y","z"];function fA(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=$g(0,i,t,n,r,s);return Mt.clearBuffer(),a}function $g(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=bt(i,l),h=Nt(c,o);return sA(e,t,n,f,h,r,s)}else{let f=ta(i,l),h=NR[f],p=n.direction[h]>=0,v,g;p?(v=Dt(i),g=Pt(i,l)):(v=Pt(i,l),g=Dt(i));let x=dr(v,a,n,r,s)?$g(v,e,t,n,r,s):null;if(x){let S=x.point[h];if(p?S<=a[g+f]:S>=a[g+f+3])return x}let A=dr(g,a,n,r,s)?$g(g,e,t,n,r,s):null;return x&&A?x.distance<=A.distance?x:A:x||A||null}}var Pd=new Kt,Tl=new Yn,El=new Yn,gu=new je,dA=new fn,Id=new fn;function pA(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=e0(0,i,t,n);return Mt.clearBuffer(),r}function e0(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),dA.set(t.boundingBox.min,t.boundingBox.max,n),r=dA),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,p=t.attributes.position,v=bt(i,o),g=Nt(l,a);if(gu.copy(n).invert(),t.boundsTree)return qt(i,s,Id),Id.matrix.copy(gu),Id.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Id.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let y=v*3,A=(g+v)*3;y<A;y+=3)if(Qt(El,y,f,h),El.needsUpdate=!0,x.intersectsTriangle(El))return!0;return!1}});{let m=aa(t);for(let x=v*3,y=(g+v)*3;x<y;x+=3){Qt(Tl,x,f,h),Tl.a.applyMatrix4(gu),Tl.b.applyMatrix4(gu),Tl.c.applyMatrix4(gu),Tl.needsUpdate=!0;for(let A=0,S=m*3;A<S;A+=3)if(Qt(El,A,d,p),El.needsUpdate=!0,Tl.intersectsTriangle(El))return!0}}}else{let u=Dt(i),f=Pt(i,o);return qt(u,s,Pd),!!(r.intersectsBox(Pd)&&e0(u,e,t,n,r)||(qt(f,s,Pd),r.intersectsBox(Pd)&&e0(f,e,t,n,r)))}}var Bd=new je,t0=new fn,vu=new fn,OR=new B,kR=new B,zR=new B,HR=new B;function mA(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),t0.set(e.boundingBox.min,e.boundingBox.max,t),t0.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=bi.getPrimitive(),d=bi.getPrimitive(),p=OR,v=kR,g=null,m=null;r&&(g=zR,m=HR);let x=1/0,y=null,A=null;return Bd.copy(t).invert(),vu.matrix.copy(Bd),i.shapecast({boundsTraverseOrder:S=>t0.distanceToBox(S),intersectsBounds:(S,E,T)=>T<x&&T<a?(E&&(vu.min.copy(S.min),vu.max.copy(S.max),vu.needsUpdate=!0),!0):!1,intersectsRange:(S,E)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:_=>vu.distanceToBox(_),intersectsBounds:(_,M,C)=>C<x&&C<a,intersectsRange:(_,M)=>{for(let C=_,R=_+M;C<R;C++){Qt(d,3*C,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let w=S,P=S+E;w<P;w++){Qt(h,3*w,c,l),h.needsUpdate=!0;let F=h.distanceToTriangle(d,p,g);if(F<x&&(v.copy(p),m&&m.copy(g),x=F,y=w,A=C),F<s)return!0}}}});{let T=aa(e);for(let _=0,M=T;_<M;_++){Qt(d,3*_,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=S,R=S+E;C<R;C++){Qt(h,3*C,c,l),h.needsUpdate=!0;let w=h.distanceToTriangle(d,p,g);if(w<x&&(v.copy(p),m&&m.copy(g),x=w,y=C,A=_),w<s)return!0}}}}}),bi.releasePrimitive(h),bi.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=y,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(Bd),v.applyMatrix4(Bd),r.distance=v.sub(r.point).length(),r.faceIndex=A),n)}function gA(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,p=!1){let v=h*2;if(_t(v,o)){let g=bt(h,a),m=Nt(v,o),x=1/0,y=1/0,A=1/0,S=-1/0,E=-1/0,T=-1/0;for(let _=g,M=g+m;_<M;_++){let C=3*i.resolveTriangleIndex(_);for(let R=0;R<3;R++){let w=C+R;w=n?n[w]:w;let P=r.getX(w),F=r.getY(w),N=r.getZ(w);P<x&&(x=P),P>S&&(S=P),F<y&&(y=F),F>E&&(E=F),N<A&&(A=N),N>T&&(T=N)}}return l[h+0]!==x||l[h+1]!==y||l[h+2]!==A||l[h+3]!==S||l[h+4]!==E||l[h+5]!==T?(l[h+0]=x,l[h+1]=y,l[h+2]=A,l[h+3]=S,l[h+4]=E,l[h+5]=T,!0):!1}else{let g=Dt(h),m=Pt(h,a),x=p,y=!1,A=!1;if(e){if(!x){let C=g/8+d/32,R=m/8+d/32;y=e.has(C),A=e.has(R),x=!y&&!A}}else y=!0,A=!0;let S=x||y,E=x||A,T=!1;S&&(T=f(g,d,x));let _=!1;E&&(_=f(m,d,x));let M=T||_;if(M)for(let C=0;C<3;C++){let R=g+C,w=m+C,P=l[R],F=l[R+3],N=l[w],O=l[w+3];l[h+C]=P<N?P:N,l[h+C+3]=F>O?F:O}return M}}}function vA(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),n0(0,i,t,n,r,s,a),Mt.clearBuffer()}function n0(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=bt(i,c),d=Nt(u,l);lA(e,t,n,h,d,r,s,a)}else{let h=Dt(i);dr(h,o,n,s,a)&&n0(h,e,t,n,r,s,a);let d=Pt(i,c);dr(d,o,n,s,a)&&n0(d,e,t,n,r,s,a)}}var GR=["x","y","z"];function xA(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=i0(0,i,t,n,r,s);return Mt.clearBuffer(),a}function i0(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=bt(i,l),h=Nt(c,o);return cA(e,t,n,f,h,r,s)}else{let f=ta(i,l),h=GR[f],p=n.direction[h]>=0,v,g;p?(v=Dt(i),g=Pt(i,l)):(v=Pt(i,l),g=Dt(i));let x=dr(v,a,n,r,s)?i0(v,e,t,n,r,s):null;if(x){let S=x.point[h];if(p?S<=a[g+f]:S>=a[g+f+3])return x}let A=dr(g,a,n,r,s)?i0(g,e,t,n,r,s):null;return x&&A?x.distance<=A.distance?x:A:x||A||null}}var Ud=new Kt,wl=new Yn,bl=new Yn,xu=new je,_A=new fn,Ld=new fn;function yA(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=r0(0,i,t,n);return Mt.clearBuffer(),r}function r0(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),_A.set(t.boundingBox.min,t.boundingBox.max,n),r=_A),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,p=t.attributes.position,v=bt(i,o),g=Nt(l,a);if(xu.copy(n).invert(),t.boundsTree)return qt(i,s,Ld),Ld.matrix.copy(xu),Ld.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Ld.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let y=v,A=g+v;y<A;y++)if(Qt(bl,3*e.resolveTriangleIndex(y),f,h),bl.needsUpdate=!0,x.intersectsTriangle(bl))return!0;return!1}});{let m=aa(t);for(let x=v,y=g+v;x<y;x++){let A=e.resolveTriangleIndex(x);Qt(wl,3*A,f,h),wl.a.applyMatrix4(xu),wl.b.applyMatrix4(xu),wl.c.applyMatrix4(xu),wl.needsUpdate=!0;for(let S=0,E=m*3;S<E;S+=3)if(Qt(bl,S,d,p),bl.needsUpdate=!0,wl.intersectsTriangle(bl))return!0}}}else{let u=Dt(i),f=Pt(i,o);return qt(u,s,Ud),!!(r.intersectsBox(Ud)&&r0(u,e,t,n,r)||(qt(f,s,Ud),r.intersectsBox(Ud)&&r0(f,e,t,n,r)))}}var Fd=new je,s0=new fn,_u=new fn,VR=new B,WR=new B,XR=new B,YR=new B;function AA(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),s0.set(e.boundingBox.min,e.boundingBox.max,t),s0.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=bi.getPrimitive(),d=bi.getPrimitive(),p=VR,v=WR,g=null,m=null;r&&(g=XR,m=YR);let x=1/0,y=null,A=null;return Fd.copy(t).invert(),_u.matrix.copy(Fd),i.shapecast({boundsTraverseOrder:S=>s0.distanceToBox(S),intersectsBounds:(S,E,T)=>T<x&&T<a?(E&&(_u.min.copy(S.min),_u.max.copy(S.max),_u.needsUpdate=!0),!0):!1,intersectsRange:(S,E)=>{if(e.boundsTree){let T=e.boundsTree;return T.shapecast({boundsTraverseOrder:_=>_u.distanceToBox(_),intersectsBounds:(_,M,C)=>C<x&&C<a,intersectsRange:(_,M)=>{for(let C=_,R=_+M;C<R;C++){let w=T.resolveTriangleIndex(C);Qt(d,3*w,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=S,F=S+E;P<F;P++){let N=i.resolveTriangleIndex(P);Qt(h,3*N,c,l),h.needsUpdate=!0;let O=h.distanceToTriangle(d,p,g);if(O<x&&(v.copy(p),m&&m.copy(g),x=O,y=P,A=C),O<s)return!0}}}})}else{let T=aa(e);for(let _=0,M=T;_<M;_++){Qt(d,3*_,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=S,R=S+E;C<R;C++){let w=i.resolveTriangleIndex(C);Qt(h,3*w,c,l),h.needsUpdate=!0;let P=h.distanceToTriangle(d,p,g);if(P<x&&(v.copy(p),m&&m.copy(g),x=P,y=C,A=_),P<s)return!0}}}}}),bi.releasePrimitive(h),bi.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=y,r&&(r.point?r.point.copy(m):r.point=m.clone(),r.point.applyMatrix4(Fd),v.applyMatrix4(Fd),r.distance=v.sub(r.point).length(),r.faceIndex=A),n)}function a0(i,e,t){return i===null?null:(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i)}var Nd=new fn,Od=new ka,SA=new B,MA=new je,TA=new B,o0=["getX","getY","getZ"],yu=class i extends wd{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,s=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(l=>l.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=s?s.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=s),o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:r,roots:s,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(s));let o=new i(t,{...n,[lu]:!0});if(o._roots=s,o._indirectBuffer=a||null,n.setIndex){let c=t.getIndex();if(c===null){let u=new ut(e.index,1,!1);t.setIndex(u)}else c.array!==r&&(c.array.set(r),c.needsUpdate=!0)}return o;function l(c){for(let u=0;u<c.length;u++){let f=c[u],h=new Uint32Array(f),d=new Uint16Array(f);for(let p=0,v=f.byteLength/32;p<v;p++){let g=8*p,m=2*g;_t(m,d)||(h[g+6]=h[g+6]/8-p)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,c=(s?s[e]:e)*3,u=c+0,f=c+1,h=c+2;o&&(u=o[u],f=o[f],h=o[h]);for(let d=0;d<3;d++){let p=a[o0[d]](u),v=a[o0[d]](f),g=a[o0[d]](h),m=p;v<m&&(m=v),g<m&&(m=g);let x=p;v>x&&(x=v),g>x&&(x=g),t[n+d]=m,t[n+d+3]=x}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,l=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let c=a.array,u=a.offset||0,f=3;a.isInterleavedBufferAttribute&&(f=a.data.stride);let h=["getX","getY","getZ"],d=n.offset;for(let p=e,v=e+t;p<v;p++){let m=(s?s[p]:p)*3,x=(p-d)*6,y=m+0,A=m+1,S=m+2;o&&(y=o[y],A=o[A],S=o[S]),l||(y=y*f+u,A=A*f+u,S=S*f+u);for(let E=0;E<3;E++){let T,_,M;l?(T=a[h[E]](y),_=a[h[E]](A),M=a[h[E]](S)):(T=c[y+E],_=c[A+E],M=c[S+E]);let C=T;_<C&&(C=_),M<C&&(C=M);let R=T;_>R&&(R=_),M>R&&(R=M);let w=(R-C)/2,P=E*2;n[x+P+0]=C+w,n[x+P+1]=w+(Math.abs(C)+w)*ml}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;MA.copy(e.matrixWorld).invert(),Od.copy(t.ray).applyMatrix4(MA),TA.setFromMatrixScale(e.matrixWorld),SA.copy(Od.direction).multiply(TA);let s=SA.length(),a=t.near/s,o=t.far/s;if(t.firstHitOnly===!0){let l=this.raycastFirst(Od,r,a,o);l=a0(l,e,t),l&&n.push(l)}else{let l=this.raycast(Od,r,a,o);for(let c=0,u=l.length;c<u;c++){let f=a0(l[c],e,t);f&&n.push(f)}}return n}refit(e=null){return(this.indirect?gA:oA)(this,e)}raycast(e,t=ai,n=0,r=1/0){let s=this._roots,a=[],o=this.indirect?vA:hA;for(let l=0,c=s.length;l<c;l++)o(this,l,t,e,a,n,r);return a}raycastFirst(e,t=ai,n=0,r=1/0){let s=this._roots,a=null,o=this.indirect?xA:fA;for(let l=0,c=s.length;l<c;l++){let u=o(this,l,t,e,n,r);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,s=this.indirect?yA:pA;for(let a=0,o=r.length;a<o&&(n=s(this,a,e,t),!n);a++);return n}shapecast(e){let t=bi.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?uA:aA});return bi.releasePrimitive(t),n}bvhcast(e,t,n){let{intersectsRanges:r,intersectsTriangles:s}=n,a=bi.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,c=this.indirect?p=>{let v=this.resolveTriangleIndex(p);Qt(a,v*3,o,l)}:p=>{Qt(a,p*3,o,l)},u=bi.getPrimitive(),f=e.geometry.index,h=e.geometry.attributes.position,d=e.indirect?p=>{let v=e.resolveTriangleIndex(p);Qt(u,v*3,f,h)}:p=>{Qt(u,p*3,f,h)};if(s){if(!(e instanceof i))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let p=(v,g,m,x,y,A,S,E)=>{for(let T=m,_=m+x;T<_;T++){d(T),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let M=v,C=v+g;M<C;M++)if(c(M),a.needsUpdate=!0,s(a,u,M,T,y,A,S,E))return!0}return!1};if(r){let v=r;r=function(g,m,x,y,A,S,E,T){return v(g,m,x,y,A,S,E,T)?!0:p(g,m,x,y,A,S,E,T)}}else r=p}return super.bvhcast(e,t,{intersectsRanges:r})}intersectsBox(e,t){return Nd.set(e.min,e.max,t),Nd.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Nd.intersectsBox(n),intersectsTriangle:n=>Nd.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},s=0,a=1/0){return(this.indirect?AA:mA)(this,e,t,n,r,s,a)}closestPointToPoint(e,t={},n=0,r=1/0){return jy(this,e,t,n,r)}};function qR(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function QR(i){switch(i){case 1:return qs;case 2:return hs;case 3:return Sn;case 4:return Sn}}function EA(i){switch(i){case 1:return al;case 2:return Qs;case 3:return Zs;case 4:return Zs}}var kd=class extends cr{constructor(){super(),this.minFilter=Ct,this.magFilter=Ct,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,r=e.count;if(t!==null){if(n*r%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=r*n/t}let s=e.itemSize,a=e.count,o=e.normalized,l=e.array.constructor,c=l.BYTES_PER_ELEMENT,u=this._forcedType,f=s;if(u===null)switch(l){case Float32Array:u=nn;break;case Uint8Array:case Uint16Array:case Uint32Array:u=An;break;case Int8Array:case Int16Array:case Int32Array:u=Ys;break}let h,d,p,v,g=qR(s);switch(u){case nn:p=1,d=QR(s),o&&c===1?(v=l,g+="8",l===Uint8Array?h=xt:(h=sl,g+="_SNORM")):(v=Float32Array,g+="32F",h=nn);break;case Ys:g+=c*8+"I",p=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=EA(s),c===1?(v=Int8Array,h=sl):c===2?(v=Int16Array,h=jc):(v=Int32Array,h=Ys);break;case An:g+=c*8+"UI",p=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=EA(s),c===1?(v=Uint8Array,h=xt):c===2?(v=Uint16Array,h=Xs):(v=Uint32Array,h=An);break}f===3&&(d===Sn||d===Zs)&&(f=4);let m=Math.ceil(Math.sqrt(a))||1,x=f*m*m,y=new v(x),A=e.normalized;e.normalized=!1;for(let S=0;S<a;S++){let E=f*S;y[E]=e.getX(S)/p,s>=2&&(y[E+1]=e.getY(S)/p),s>=3&&(y[E+2]=e.getZ(S)/p,f===4&&(y[E+3]=1)),s>=4&&(y[E+3]=e.getW(S)/p)}e.normalized=A,this.internalFormat=g,this.format=d,this.type=h,this.image.width=m,this.image.height=m,this.image.data=y,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=r}},zd=class extends kd{constructor(){super(),this._forcedType=An}};var Hd=class extends kd{constructor(){super(),this._forcedType=nn}};var Au=class{constructor(){this.index=new zd,this.position=new Hd,this.bvhBounds=new cr,this.bvhContents=new cr,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(KR(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let n=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let r=Qg(fu(t));this._cachedIndexAttr=new ut(r,1,!1)}ZR(t,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:r}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),r&&r.dispose()}};function ZR(i,e,t){let n=t.array,r=i.index?i.index.array:null;for(let s=0,a=e.length;s<a;s++){let o=3*s,l=3*e[s];for(let c=0;c<3;c++)n[o+c]=r?r[l+c]:l+c}}function KR(i,e,t){let n=i._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let r=n[0],s=new Uint16Array(r),a=new Uint32Array(r),o=new Float32Array(r),l=r.byteLength/32,c=2*Math.ceil(Math.sqrt(l/2)),u=new Float32Array(4*c*c),f=Math.ceil(Math.sqrt(l)),h=new Uint32Array(2*f*f);for(let d=0;d<l;d++){let p=d*32/4,v=p*2,g=p;for(let m=0;m<3;m++)u[8*d+0+m]=o[g+0+m],u[8*d+4+m]=o[g+3+m];if(_t(v,s)){let m=Nt(v,s),x=bt(p,a),y=-65536|m;h[d*2+0]=y,h[d*2+1]=x}else{let m=a[p+6],x=ta(p,a);h[d*2+0]=x,h[d*2+1]=m}}e.image.data=u,e.image.width=c,e.image.height=c,e.format=Sn,e.type=nn,e.internalFormat="RGBA32F",e.minFilter=Ct,e.magFilter=Ct,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=h,t.image.width=f,t.image.height=f,t.format=Qs,t.type=An,t.internalFormat="RG32UI",t.minFilter=Ct,t.magFilter=Ct,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}var eo={};rS(eo,{bvh_distance_functions:()=>wA,bvh_ray_functions:()=>c0,bvh_struct_definitions:()=>bA,common_functions:()=>l0});var l0=`

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
`;var wA=`

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
`;var c0=`

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
`;var bA=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var LN=`
	${l0}
	${c0}
`;var Su=.56,DA=Ni.degToRad(34.5),JR=Ni.degToRad(40.8),Gd=.03,jR=.5,$R=.77,la=.5,oa=8,pr=4,Vd=Math.PI*2/oa,CA=(la-Su/2)*Math.tan(DA),f0=la*Math.tan(JR),ps={tableY:Gd/2+CA,girdleTop:Gd/2,girdleBottom:-Gd/2,culetY:-Gd/2-f0,crownH:CA,pavH:f0},Wd={round:i=>[Math.cos(i)*la,Math.sin(i)*la],oval:i=>[Math.cos(i)*.6,Math.sin(i)*.6*.69],cushion:i=>{let e=Math.cos(i),t=Math.sin(i),n=3.2,r=Math.pow(Math.pow(Math.abs(e),n)+Math.pow(Math.abs(t),n),-1/n)*.455;return[e*r,t*r]},pear:i=>{let t=((Math.PI-i)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return[-(Math.cos(t)+.3)*.58,Math.sin(t)*Math.sin(t/2)*.84*.58]}},Cl=["round","oval","cushion","pear"];function RA(i,e,t,n,r){let s=e[0]-i[0],a=e[1]-i[1],o=e[2]-i[2],l=t[0]-i[0],c=t[1]-i[1],u=t[2]-i[2],f=a*u-o*c,h=o*l-s*u,d=s*c-a*l;return Math.abs(h)<1e-9?i[1]:i[1]-(f*(n-i[0])+d*(r-i[2]))/h}function eD(i){let e=[],t=(M,C,R)=>e.push(M,C,R),n=(M,C,R)=>{let w=i(M);return[w[0]*C,R,w[1]*C]},r=ps.tableY,s=ps.girdleTop,a=ps.girdleBottom,o=ps.culetY,l=Su/2/la,c=(Su/2+(la-Su/2)*jR)/la,u=1-$R,f=Math.cos(Vd/2),h=r-(c*la*f-Su/2)*Math.tan(DA),d=o+f0*u*f,p=[],v=[],g=[];for(let M=0;M<oa;M++)p.push(n(M*Vd,l,r)),v.push(n((M+.5)*Vd,c,h)),g.push(n((M+.5)*Vd,u,d));let m=2*oa*pr,x=M=>M/m*Math.PI*2,y=M=>n(x(M),1,s),A=M=>n(x(M),1,a),S=[0,r,0],E=[0,o,0],T=[],_=[];for(let M=0;M<oa;M++){let C=M*2*pr,R=C+pr,w=(C+2*pr)%m,P=[[v[M],y(C),y(R)],[v[M],y(R),y(w)]],F=[[g[M],A(C),A(R)],[g[M],A(R),A(w)]];for(let N=0;N<2*pr;N++){let O=C+N,H=P[N<pr?0:1],j=F[N<pr?0:1],G=y(O);T[O]=N===0||N===pr?G:[G[0],RA(H[0],H[1],H[2],G[0],G[2]),G[2]];let I=A(O);_[O]=N===0||N===pr?I:[I[0],RA(j[0],j[1],j[2],I[0],I[2]),I[2]]}}for(let M=0;M<oa;M++){let C=(M+1)%oa,R=(M+oa-1)%oa,w=M*2*pr;t(S,p[M],p[C]),t(p[M],p[C],v[M]),t(p[M],v[M],T[w]),t(p[M],T[w],v[R]);for(let P=0;P<2*pr;P++)t(v[M],T[(w+P)%m],T[(w+P+1)%m]);for(let P=0;P<2*pr;P++)t(g[M],_[(w+P)%m],_[(w+P+1)%m]);t(_[w],g[M],E),t(_[w],E,g[R])}for(let M=0;M<m;M++){let C=(M+1)%m;t(T[M],_[M],_[C]),t(T[M],_[C],T[C])}return e}var u0=[];function PA(i){let e=eD(i),t=new Float32Array(e.length*3),n=(ps.tableY+ps.culetY)/2,r=new B,s=new B,a=new B,o=new B,l=u0.length===0;for(let c=0;c<e.length/3;c++){let[u,f,h]=[e[c*3],e[c*3+1],e[c*3+2]];l&&(r.set(f[0]-u[0],f[1]-u[1],f[2]-u[2]),s.set(h[0]-u[0],h[1]-u[1],h[2]-u[2]),a.crossVectors(r,s),o.set((u[0]+f[0]+h[0])/3,(u[1]+f[1]+h[1])/3-n,(u[2]+f[2]+h[2])/3),u0.push(a.dot(o)<0)),u0[c]&&([f,h]=[h,f]),t.set(u,c*9),t.set(f,c*9+3),t.set(h,c*9+6)}return t}PA(Wd.round);var h0={};function Rl(i){return h0[i]||(h0[i]=PA(Wd[i])),h0[i]}function IA(i,e){let t=Cl.length,n=(i%t+t)%t,r=Math.floor(n),s=n-r,a=Rl(Cl[r]),o=Rl(Cl[(r+1)%t]);for(let l=0;l<e.length;l++)e[l]=a[l]+(o[l]-a[l])*s;return e}function ca(i,e){let t=Cl.length,n=(i%t+t)%t,r=Math.floor(n),s=n-r,a=Wd[Cl[r]](e),o=Wd[Cl[(r+1)%t]](e);return[a[0]+(o[0]-a[0])*s,a[1]+(o[1]-a[1])*s]}function BA(){let i=new Lt;return i.setAttribute("position",new ut(Rl("round").slice(),3)),i.computeVertexNormals(),i}function d0(i){let e=(i/1e3)**2;return Math.sqrt(1+.3306*e/(e-.175**2)+4.3356*e/(e-.106**2))}var tD={430:[.2839,.0116,1.3856],470:[.1954,.091,1.2876],510:[.0093,.503,.1582],550:[.4334,.995,.0087],590:[1.0263,.757,.0011],630:[.6424,.265,5e-5],670:[.0874,.032,0]};function UA(i){if(i===3)return{iors:[640,550,465].map(d0),weights:[[1,0,0],[0,1,0],[0,0,1]]};let e=[430,470,510,550,590,630,670],t=e.map(r=>{let[s,a,o]=tD[r];return[Math.max(0,3.2406*s-1.5372*a-.4986*o),Math.max(0,-.9689*s+1.8758*a+.0415*o),Math.max(0,.0557*s-.204*a+1.057*o)]}),n=[0,1,2].map(r=>t.reduce((s,a)=>s+a[r],0));return{iors:e.map(d0),weights:t.map(r=>r.map((s,a)=>s/n[a]))}}var Dl=36,nD=`
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
`,iD=`
	#define RAY_OFFSET 1e-4
	${eo.common_functions}
	${eo.bvh_struct_definitions}
	${eo.bvh_ray_functions}

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
		uniform vec4 capA[ ${Dl} ];
		uniform vec4 capB[ ${Dl} ];
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
			for ( int i = 0; i < ${Dl}; i ++ ) {
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
`,Xd=null;function rD(){if(!Xd){let i=new Lt;i.setAttribute("position",new ut(Rl("round").slice(),3));let e=new yu(i,{strategy:2,targetLeafSize:4});Xd={geometry:i,struct:new Au},Xd.struct.updateFrom(e)}return Xd}function LA(i,{bounces:e=7,waves:t=7,ss:n=1,bvhStruct:r,studio:s=null,setting:a=null}){let{iors:o,weights:l}=UA(t),c={WAVES:t,SS:n},u={envMap:{value:i},envRotation:{value:new $e},envIntensity:{value:1},bvh:{value:r},ior:{value:d0(589)},iors:{value:o},weights:{value:l.map(f=>new B(...f))},bounces:{value:e},obstruction:{value:new B(Math.cos(Ni.degToRad(21)),Math.cos(Ni.degToRad(30)),.03)},frost:{value:.55},opacity:{value:1},glow:{value:0}};return s&&(c.ANALYTIC_ENV="",c.CARDS=s.count,Object.assign(u,{cardC:{value:s.c},cardU:{value:s.u},cardV:{value:s.v},cardN:{value:s.n},cardCol:{value:s.col},dome:{value:s.dome}})),a&&(c.SETTING="",Object.assign(u,{capA:{value:Array.from({length:Dl},()=>new St)},capB:{value:Array.from({length:Dl},()=>new St)},capCount:{value:0},metalMap:{value:a},metalTint:{value:new Ye(1,1,1)}})),new rt({vertexShader:nD,fragmentShader:iD,defines:c,uniforms:u})}function FA(i,{bounces:e=7,waves:t=7,ss:n=1,studio:r=null,setting:s=null}={}){let a=new Lt,o=Rl("round").slice();a.setAttribute("position",new ut(o,3));let l=new yu(a,{strategy:2,targetLeafSize:4});a.boundsTree=l;let c=new Au;c.updateFrom(l);let u=LA(i,{bounces:e,waves:t,ss:n,bvhStruct:c,studio:r,setting:s}),f=new Rt(a,u);f.name="diamond";let h=0;return{mesh:f,material:u,setMorph(d){Math.abs(d-h)<1e-5||(h=d,IA(d,o),a.attributes.position.needsUpdate=!0,a.computeBoundingSphere(),l.refit(),c.updateFrom(l))},setBounces(d){u.uniforms.bounces.value=d},setQuality({bounces:d,ss:p,waves:v,exact:g}){let m=u.defines,x=u.uniforms,y=!1;if(d!==void 0&&(x.bounces.value=d),p!==void 0&&m.SS!==p&&(m.SS=p,y=!0),v!==void 0&&m.WAVES!==v){let A=UA(v);m.WAVES=v,x.iors.value=A.iors,x.weights.value=A.weights.map(S=>new B(...S)),y=!0}g===!1&&"ANALYTIC_ENV"in m&&(delete m.ANALYTIC_ENV,y=!0),y&&(u.needsUpdate=!0)},setSetting(d,p){let v=u.uniforms;if(!v.capA)return;let g=Math.min(Dl,d.length);for(let m=0;m<g;m++){let x=d[m];v.capA.value[m].set(x[0],x[1],x[2],x[3]),v.capB.value[m].set(x[4],x[5],x[6],0)}v.capCount.value=g,p&&v.metalTint.value.copy(p)}}}function NA(i,{bounces:e=4,waves:t=3,studio:n=null}={}){return LA(i,{bounces:e,waves:t,ss:1,bvhStruct:rD().struct,studio:n})}var Pl=class{constructor(e,t,n){this.radial=t,this.maxRings=e;let r=e*(t+1);this.pos=new Float32Array(r*3),this.nrm=new Float32Array(r*3);let s=[];for(let o=0;o<e-1;o++)for(let l=0;l<t;l++){let c=o*(t+1)+l,u=c+t+1;s.push(c,c+1,u,c+1,u+1,u)}let a=new Lt;a.setIndex(s),a.setAttribute("position",new ut(this.pos,3).setUsage(Ks)),a.setAttribute("normal",new ut(this.nrm,3).setUsage(Ks)),a.setDrawRange(0,0),this.geometry=a,this.mesh=new Rt(a,n),this.mesh.frustumCulled=!1,this.rings=0,this._n=new B,this._b=new B,this._t=new B,this._v=new B}begin(){this.rings=0}ring(e,t,n,r,s,a=0){if(this.rings>=this.maxRings)return;let o=this.rings*(this.radial+1),l=Math.cos(a),c=Math.sin(a);for(let u=0;u<=this.radial;u++){let f=u/this.radial*Math.PI*2,h=Math.cos(f),d=Math.sin(f),p=t.x*h+n.x*d,v=t.y*h+n.y*d,g=t.z*h+n.z*d,m=(o+u)*3;this.pos[m]=e.x+p*s,this.pos[m+1]=e.y+v*s,this.pos[m+2]=e.z+g*s,this.nrm[m]=p*l+r.x*c,this.nrm[m+1]=v*l+r.y*c,this.nrm[m+2]=g*l+r.z*c}this.rings++}cap(e,t,n,r,s,a=5,o=!1){let l=this._v,c=[];for(let u=1;u<=a;u++)c.push(u);o&&(c.reverse(),c.push(0));for(let u of c){let f=u/a*(Math.PI/2)*.999;l.copy(e).addScaledVector(r,Math.sin(f)*s),this.ring(l,t,n,r,Math.max(s*Math.cos(f),1e-4),f)}}sweep(e,t,{up:n=null,capStart:r=!1,capEnd:s=!0,closed:a=!1,capSteps:o=6}={}){this.begin();let l=this._n,c=this._b,u=this._t,f=e.length;if(f<2){this.end();return}let h=(m,x)=>{let y=e[Math.max(0,m-1)],A=e[Math.min(f-1,m+1)];if(a){let S=e[(m-1+f)%f],E=e[(m+1)%f];return x.subVectors(E,S).normalize()}return x.subVectors(A,y).normalize()};if(h(0,u),n)c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize();else{let m=Math.abs(u.y)<.9?new B(0,1,0):new B(1,0,0);c.crossVectors(u,m).normalize(),l.crossVectors(c,u).normalize()}let d=m=>typeof t=="function"?t(m/(f-1)):t;r&&!a&&this.cap(e[0],l,c,u.clone().negate(),d(0),o,!0);let p=new B().copy(u),v=new Wn,g=a?f+1:f;for(let m=0;m<g;m++){let x=m%f;h(x,u),n?(c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize()):m>0&&(v.setFromUnitVectors(p,u),l.applyQuaternion(v),c.applyQuaternion(v)),p.copy(u),this.ring(e[x],l,c,u,d(x))}s&&!a&&this.cap(e[f-1],l,c,u,d(f-1),o),this.end()}end(){let e=this.geometry;e.setDrawRange(0,Math.max(0,this.rings-1)*this.radial*6),e.attributes.position.needsUpdate=!0,e.attributes.normal.needsUpdate=!0,this.mesh.visible=this.rings>1}};var Il=1.27,Tu=2.18,Yd=6,Mu=4,sD=i=>.19+.17*Math.exp(-Math.pow(i/.42,2)),kA=i=>.13+.02*(i/Math.PI),ua=i=>Il+sD(i),Qd={white:new Ye("#ecebe8"),yellow:new Ye("#f3c977"),rose:new Ye("#f2b49b")},OA=[Qd.white,Qd.yellow,Qd.rose];function qd(i,e,t){let r=ca(i,e+.001),s=ca(i,e-.001),a=r[1]-s[1],o=-(r[0]-s[0]),l=ca(i,e);a*l[0]+o*l[1]<0&&(a=-a,o=-o);let c=Math.hypot(a,o)||1;return t[0]=a/c,t[1]=o/c,t}var to=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},m0=class{constructor(e){this.NT=360,this.NC=48;let t=(this.NT+1)*(this.NC+1),n=2*(this.NC+2);this.pos=new Float32Array((t+n)*3),this.nrm=new Float32Array((t+n)*3);let r=[];for(let a=0;a<this.NT;a++)for(let o=0;o<this.NC;o++){let l=a*(this.NC+1)+o,c=l+this.NC+1;r.push(l,c,l+1,c,c+1,l+1)}this.bodyCount=r.length,this.capBase=t;for(let a=0;a<2;a++){let o=t+a*(this.NC+2);for(let l=0;l<this.NC;l++)a===0?r.push(o,o+1+l,o+2+l):r.push(o,o+2+l,o+1+l)}let s=new Lt;s.setIndex(r),s.setAttribute("position",new ut(this.pos,3).setUsage(Ks)),s.setAttribute("normal",new ut(this.nrm,3).setUsage(Ks)),this.geometry=s,this.mesh=new Rt(s,e),this.mesh.frustumCulled=!1,this.ends=[new B,new B],this.g=-1}set(e){if(e=Math.min(1,Math.max(0,e)),e===this.g||(this.g=e,this.mesh.visible=e>.001,!this.mesh.visible))return;let t=this.NT,n=this.NC,r=Math.PI*(1-e),s=this.pos,a=this.nrm,o=2/Mu;for(let c=0;c<=t;c++){let u=r+(Math.PI*2-2*r)*(c/t),f=Math.min(u,Math.PI*2-u),h=Math.sin(u),d=Math.cos(u),p=ua(f),v=(Il+p)/2,g=(p-Il)/2,m=kA(f);for(let x=0;x<=n;x++){let y=x/n*Math.PI*2,A=Math.cos(y),S=Math.sin(y),E=Math.sign(A)*Math.pow(Math.abs(A),o),T=Math.sign(S)*Math.pow(Math.abs(S),o),_=E*m,M=T*g,C=Math.sign(E)*Math.pow(Math.abs(E),Mu-1)/m,R=Math.sign(T)*Math.pow(Math.abs(T),Mu-1)/g,w=Math.hypot(C,R)||1;C/=w,R/=w;let P=(c*(n+1)+x)*3;s[P]=h*(v+M),s[P+1]=d*(v+M),s[P+2]=_,a[P]=h*R,a[P+1]=d*R,a[P+2]=C}}let l=e<.999;for(let c=0;c<2;c++){let u=c===0?0:t,f=r+(Math.PI*2-2*r)*(u/t),h=Math.cos(f)*(c===0?-1:1),d=-Math.sin(f)*(c===0?-1:1),p=this.capBase+c*(n+2),v=Math.min(f,Math.PI*2-f),g=(Il+ua(v))/2;this.ends[c].set(Math.sin(f)*g,Math.cos(f)*g,0);for(let m=-1;m<=n;m++){let x=(m<0?p:p+1+m)*3;if(m<0)s[x]=this.ends[c].x,s[x+1]=this.ends[c].y,s[x+2]=0;else{let y=(u*(n+1)+m)*3;s[x]=s[y],s[x+1]=s[y+1],s[x+2]=s[y+2]}a[x]=h,a[x+1]=d,a[x+2]=0}}this.geometry.setDrawRange(0,l?this.geometry.index.count:this.bodyCount),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.normal.needsUpdate=!0}};function p0(i,e=0){let t=Math.min(Math.abs(i),Math.PI*2-Math.abs(i)),n=ua(t),r=kA(t),s=(n-Il)/2,a=(Il+n)/2,o=Math.min(.999,Math.abs(e)/r),l=s*Math.pow(1-Math.pow(o,Mu),1/Mu),c=a+l,u=.001,f=ua(Math.min(Math.abs(i+u),Math.PI*2-Math.abs(i+u))),h=ua(Math.min(Math.abs(i-u),Math.PI*2-Math.abs(i-u))),d=(f-h)/(2*u),p=new B(Math.sin(i),Math.cos(i),0),v=new B(Math.cos(i),-Math.sin(i),0),g=p.clone().multiplyScalar(n).addScaledVector(v,-d).normalize();return{point:p.multiplyScalar(c).setZ(e),normal:g}}function zA({cube:i,rotation:e,waves:t=3,studio:n=null}){let r=new Nr;r.name="ring";let s=new Nr;s.position.y=Tu,r.add(s);let a=()=>new Yc({color:Qd.white.clone(),metalness:1,roughness:.07,envMapIntensity:1}),o=a();o.side=gn;let l=a(),c=a();c.roughness=.1;let u=[o,l,c],f=new m0(o);r.add(f.mesh);let h=[];for(let re=0;re<Yd;re++){let he=new Pl(64,24,l);h.push(he),s.add(he.mesh)}let d=new Pl(124,18,l);s.add(d.mesh);let p=new Pl(144,18,c);s.add(p.mesh);let v=BA(),g=NA(i,{bounces:4,waves:t,studio:n});g.uniforms.envRotation.value=e;let m=26,x=new Ha(v,g,m);x.instanceMatrix.setUsage(Ks),x.frustumCulled=!1,s.add(x);let y=[];{let re=.3,he=1.3;for(;re<he;){let Ae=.19-.024*((re-.3)/(he-.3));y.push({phi:re,size:Ae});let oe=ua(re);re+=(Ae+.01)/oe}}let A=y.length*2,S=new Ha(v,g,A);S.frustumCulled=!1,r.add(S);let E=new Ga(1,32,24),T=(y.length+1)*2*2,_=a();_.roughness=.17,u.push(_);let M=new Ha(E,_,T);M.frustumCulled=!1,r.add(M);let C=[],R=[];{let re=new B(0,1,0),he=new Wn;for(let me of[1,-1])y.forEach((Ae,oe)=>{let Ee=Ae.phi*me,{point:Oe,normal:_e}=p0(Ee);he.setFromUnitVectors(re,_e);let q=Oe.clone().addScaledVector(_e,-.006);C.push({pos:q,q:he.clone(),size:Ae.size,order:oe,side:me});let z=oe===0?Ae.phi-(Ae.size+.01)/ua(Ae.phi):y[oe-1].phi,Ve=(Ae.phi+z)/2*me;for(let Be of[-1,1]){let Ie=p0(Ve,Be*Ae.size*.36);R.push({pos:Ie.point.clone().addScaledVector(Ie.normal,.006),size:.03,order:oe,side:me})}if(oe===y.length-1){let Be=(Ae.phi+(Ae.size+.01)/2/ua(Ae.phi))*me;for(let Ie of[-1,1]){let ge=p0(Be,Ie*Ae.size*.36);R.push({pos:ge.point.clone().addScaledVector(ge.normal,.006),size:.028,order:oe+.5,side:me})}}})}let w={band:-1,prongs:-1,morph:-1,metal:-1,halo:-1,pave:-1},P=new je,F=new B,N=new B,O=new Wn,H=[0,0],j=ps.culetY,G=ps.pavH,I=1.6-Tu,te=[],ie=[];function xe(re,he,me,Ae=te){let Ee=re.length;for(let Oe=0;Oe<6;Oe++){let _e=Math.round(Oe/6*(me?Ee:Ee-1))%Ee,q=Math.round((Oe+1)/6*(me?Ee:Ee-1))%Ee;if(_e===q)continue;let z=re[_e],Ve=re[q];Ae.push([z.x,z.y,z.z,he,Ve.x,Ve.y,Ve.z])}}function ye(re){return re/Yd*Math.PI*2}function Ne(re,he){let me=new Xc(Array.from({length:6},()=>new B),!1,"centripetal");te.length=0;let Ae=me.points,oe=to(0,1,he);for(let _e=0;_e<Yd;_e++){let q=ye(_e),z=ca(re,q);qd(re,q,H);let Ve=(U,k)=>[z[0]*U+H[0]*k,z[1]*U+H[1]*k],Be=Ve(.26,0);Ae[0].set(Be[0],I,Be[1]),Be=Ve(.36,.058),Ae[1].set(Be[0],j+.36*G,Be[1]),Be=Ve(.72,.056),Ae[2].set(Be[0],j+.72*G,Be[1]),Be=Ve(1,.052),Ae[3].set(Be[0],-.01,Be[1]),Be=Ve(1,.046),Ae[4].set(Be[0],.045,Be[1]),Be=Ve(.975,.03),Ae[5].set(Be[0],.072,Be[1]);let Ie=_e%2*.12,ge=to(Ie,Ie+.88,oe),L=h[_e];if(ge<=.001){L.begin(),L.end();continue}let b=48,W=[];for(let U=0;U<b;U++)W.push(me.getPointAt(U/(b-1)*ge));let ee=U=>.052-.011*U*ge;L.sweep(W,ee,{capEnd:!0,capSteps:10});for(let U=0;U<4;U++){let k=W[Math.round(U/4*(b-1))],Y=W[Math.round((U+1)/4*(b-1))];te.push([k.x,k.y,k.z,ee((U+.5)/4),Y.x,Y.y,Y.z])}}let Ee=(_e,q,z,Ve,Be,Ie,ge)=>{if(Ie<=.001){_e.begin(),_e.end();return}let L=[],b=Ie>=.999,W=b?ge:Math.max(2,Math.round(ge*Ie)+1);for(let ee=0;ee<W;ee++){let U=b?ee/ge*Math.PI*2:ee/(W-1)*Math.PI*2*Ie-Math.PI/2,k=ca(re,U);qd(re,U,H),L.push(new B(k[0]*z+H[0]*Ve,q,k[1]*z+H[1]*Ve))}_e.sweep(L,Be,{up:new B(0,1,0),closed:b,capStart:!b,capEnd:!b}),xe(L,Be,b)},Oe=-.27;return Ee(d,Oe,(Oe-j)/G,.036,.03,to(.35,1,oe),100),oe}function Q(re,he){let Ae=(-.115-j)/G,oe=to(0,.55,he),Ee=[],Oe=p;if(ie.length=0,oe<=.001)Oe.begin(),Oe.end();else{let z=oe>=.999,Ve=120,Be=z?Ve:Math.max(2,Math.round(Ve*oe)+1);for(let Ie=0;Ie<Be;Ie++){let ge=z?Ie/Ve*Math.PI*2:Ie/(Be-1)*Math.PI*2*oe+Math.PI/2,L=ca(re,ge);qd(re,ge,H),Ee.push(new B(L[0]*Ae+H[0]*.042,-.115,L[1]*Ae+H[1]*.042))}Oe.sweep(Ee,.03,{up:new B(0,1,0),closed:z,capStart:!z,capEnd:!z}),xe(Ee,.03,z,ie)}let _e=0,q=new B(0,1,0);for(let z=0;z<m;z++){let Ve=(z+.5)/m*Math.PI*2,Be=!1;for(let U=0;U<Yd;U++){let k=Math.abs(Ve-ye(U));k=Math.min(k,Math.PI*2-k),k<.17&&(Be=!0)}if(Be)continue;let Ie=(Ve-Math.PI/2+Math.PI*4)%(Math.PI*2)/(Math.PI*2),ge=to(.3+Ie*.55,.3+Ie*.55+.12,he);if(ge<=.001)continue;let L=ca(re,Ve);qd(re,Ve,H);let W=new B(H[0],0,H[1]).clone().multiplyScalar(Math.cos(.42)).addScaledVector(q,Math.sin(.42)).normalize();F.set(L[0]*Ae+H[0]*.1,-.115+.012,L[1]*Ae+H[1]*.1),O.setFromUnitVectors(q,W);let ee=.118*(.6+.4*ge)*ge;N.set(ee,ee,ee),x.setMatrixAt(_e++,P.compose(F,O,N))}x.count=_e,x.instanceMatrix.needsUpdate=!0,x.visible=_e>0}function se(re){let he=0,me=y.length;for(let oe of C){let Ee=oe.order/me*.75,Oe=to(Ee,Ee+.18,re);if(Oe<=.001)continue;let _e=oe.size*Oe;N.set(_e,_e,_e),S.setMatrixAt(he++,P.compose(oe.pos,oe.q,N))}S.count=he,S.instanceMatrix.needsUpdate=!0,S.visible=he>0;let Ae=0;O.identity();for(let oe of R){let Ee=oe.order/me*.75,Oe=to(Ee,Ee+.18,re);if(Oe<=.001)continue;let _e=oe.size*Oe;N.set(_e,_e,_e),M.setMatrixAt(Ae++,P.compose(oe.pos,O,N))}M.count=Ae,M.instanceMatrix.needsUpdate=!0,M.visible=Ae>0}let ae=new Ye;return{group:r,head:s,pave:S,halo:x,metals:u,stoneMaterial:g,get setting(){return te.concat(ie)},bandEnds:f.ends,get bandGrow(){return f.g},update(re){re.band!==w.band&&(f.set(re.band),w.band=re.band);let he=re.morph!==w.morph;if((he||re.prongs!==w.prongs)&&(Ne(re.morph,re.prongs),w.prongs=re.prongs),(he||re.halo!==w.halo)&&(Q(re.morph,re.halo),w.halo=re.halo),w.morph=re.morph,re.pave!==w.pave&&(se(re.pave),w.pave=re.pave),re.metal!==w.metal){let me=Math.min(1,Math.floor(re.metal));ae.copy(OA[me]).lerp(OA[Math.min(2,me+1)],Math.min(1,re.metal-me));for(let Ae of u)Ae.color.copy(ae);w.metal=re.metal}},setRoughness(re){o.roughness=re,l.roughness=re,c.roughness=re+.05}}}function aD(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d");t.globalCompositeOperation="lighter";let n=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256*.16);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,250,240,0.55)"),n.addColorStop(1,"rgba(255,245,230,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);let r=(a,o,l,c)=>{t.save(),t.translate(256/2,256/2),t.rotate(a),t.scale(1,l);let u=t.createRadialGradient(0,0,0,0,0,o);u.addColorStop(0,`rgba(255,255,255,${c})`),u.addColorStop(.35,`rgba(255,250,242,${c*.35})`),u.addColorStop(1,"rgba(255,245,235,0)"),t.fillStyle=u,t.beginPath(),t.arc(0,0,o,0,Math.PI*2),t.fill(),t.restore()};r(0,256*.5,.022,.95),r(Math.PI/2,256*.5,.022,.95),r(Math.PI/4,256*.26,.02,.45),r(-Math.PI/4,256*.26,.02,.45);let s=new tl(e);return s.colorSpace=it,s}function oD(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.2,"rgba(255,240,220,0.5)"),n.addColorStop(1,"rgba(255,230,200,0)"),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new tl(e);return r.colorSpace=it,r}var g0=Math.cos(Ni.degToRad(4.5));function HA(i,{max:e=3,paveMax:t=3}={}){let n=aD(),r=oD(),s=(_,M=0)=>{let C=new el({map:_,blending:Vs,depthWrite:!1,depthTest:!0,transparent:!0,rotation:M,toneMapped:!1}),R=new Nc(C);return R.visible=!1,R.renderOrder=10,i.add(R),R},a=[];for(let _=0;_<e+t;_++)a.push(s(n,.21));let o=[s(r),s(r)],l=()=>md,c=new B,u=new B,f=new B,h=new B,d=new B,p=new B,v=new B,g=new B,m=new $e,x=new je,y=new Wn,A=new B,S=new B,E=new B(0,1,0);function T(_,M,C,R,w){p.subVectors(M,C.position).normalize(),v.copy(p).reflect(_);let P=0,F=Math.cos(R),N=Math.sin(R);for(let O of l()){g.set(O.dir.x*F+O.dir.z*N,O.dir.y,-O.dir.x*N+O.dir.z*F);let H=v.dot(g);H>g0&&(P+=O.power*Math.pow((H-g0)/(1-g0),w))}return P}return{update(_,{diamond:M,pave:C,envAngle:R,strength:w=1,ends:P=null,endGlow:F=0,size:N=1}){let O=[];if(M&&M.visible&&w>0){let I=M.geometry.attributes.position.array,te=new Set;M.updateWorldMatrix(!0,!1),m.getNormalMatrix(M.matrixWorld);let ie=M.matrixWorld.getMaxScaleOnAxis();for(let xe=0;xe<I.length/9;xe++){let ye=xe*9;if(c.set(I[ye],I[ye+1],I[ye+2]),u.set(I[ye+3],I[ye+4],I[ye+5]),f.set(I[ye+6],I[ye+7],I[ye+8]),h.subVectors(u,c).cross(d.subVectors(f,c)).normalize(),h.y<.25)continue;let Ne=`${Math.round(h.x*40)},${Math.round(h.y*40)},${Math.round(h.z*40)}`;if(te.has(Ne))continue;te.add(Ne),d.copy(c).add(u).add(f).multiplyScalar(1/3),d.applyMatrix4(M.matrixWorld),h.applyMatrix3(m).normalize();let Q=T(h,d,_,R,2.2);Q>.05&&O.push({pos:d.clone().addScaledVector(h,.03*ie),s:Math.min(1.4,Q)*w,size:.42*ie*N})}}O.sort((I,te)=>te.s-I.s);let H=O.slice(0,e),j=[];if(C&&C.visible&&C.count>0&&w>0){C.updateWorldMatrix(!0,!1);for(let I=0;I<C.count;I++){C.getMatrixAt(I,x),x.premultiply(C.matrixWorld),x.decompose(A,y,S),h.copy(E).applyQuaternion(y);let te=T(h,A,_,R,1.4);te>.05&&j.push({pos:A.clone().addScaledVector(h,.02),s:Math.min(1.1,te)*w,size:Math.max(S.x,.05)*2.6*N})}j.sort((I,te)=>te.s-I.s)}let G=H.concat(j.slice(0,t));a.forEach((I,te)=>{let ie=G[te];if(I.visible=!!ie,ie){I.position.copy(ie.pos);let xe=Math.min(1,ie.s);I.scale.setScalar(ie.size*(.45+.55*xe)),I.material.color.setScalar(1.25*ie.s)}}),o.forEach((I,te)=>{I.visible=!!P&&F>.01,I.visible&&(I.position.copy(P[te]),I.scale.setScalar(.3),I.material.color.setScalar(3.2*F))})},hide(){a.forEach(_=>_.visible=!1),o.forEach(_=>_.visible=!1)}}}var On={high:{name:"high",dpr:2,supersample:1.5,msaa:4,bounces:8,waves:7,ss:4,exact:!0,cube:512,metal:512,grain:!0,dof:!0,ao:!0},medium:{name:"medium",dpr:1.5,supersample:1,msaa:2,bounces:6,waves:7,ss:1,exact:!0,cube:512,metal:256,grain:!0,dof:!1,ao:!1},low:{name:"low",dpr:1,supersample:1,msaa:0,bounces:4,waves:3,ss:1,exact:!1,cube:256,metal:256,grain:!1,dof:!1,ao:!1},lite:{name:"lite",dpr:1,supersample:1,msaa:0,bounces:2,waves:3,ss:1,exact:!1,cube:256,metal:256,grain:!1,dof:!1,ao:!1}},lD=[["#221b14","#030304"],["#2e2318","#080605"],["#1a2333","#05070b"],["#ffffff","#ffffff"],["#1f2738","#0b0e14"]];function Bl(){return{tx:0,ty:Tu,tz:0,dist:3.6,az:.55,el:.3,fov:24,shift:0,shiftY:0,spin:0,wobble:1,shimmer:1,band:0,prongs:0,morph:0,metal:0,halo:0,pave:0,env:0,exposure:1,bg:0,glint:0,endGlow:1,glow:0,dof:0,focus:0,mood:0,turn:0,motes:0,beam:0,pool:0,bloom:1,spinTall:0}}var cD=`
	varying vec2 vUv;
	void main() {
		vUv = position.xy * 0.5 + 0.5;
		gl_Position = vec4( position.xy, 0.99999, 1.0 );
	}
`,uD=`
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
`,v0=class extends Za{constructor(){super("GradeEffect",`
			uniform float exposure;
			void mainImage( const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
				outputColor = vec4( inputColor.rgb * exposure, inputColor.a );
			}
		`,{uniforms:new Map([["exposure",new Se(1)]])})}};function GA(i,{tier:e=On.high,preserve:t=!1,aoPass:n=null}={}){let r=new cd({canvas:i,antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",preserveDrawingBuffer:t});r.toneMapping=Ki,r.outputColorSpace=it;let s=new Er,a=new yn(24,1,.05,80),o=Fy(r,{size:e.cube,metal:e.metal});s.environment=o.env;let l=e.exact?Ly():null,c=zA({cube:o.cube,rotation:o.rotation,studio:l});s.add(c.group),c.head.rotation.y=Math.PI/2;let u=FA(o.cube,{bounces:e.bounces,waves:e.waves,ss:e.ss,studio:l,setting:o.bright});u.material.uniforms.envRotation.value=o.rotation,c.head.add(u.mesh);let f=new rt({vertexShader:cD,fragmentShader:uD,depthWrite:!1,depthTest:!1,uniforms:{inner:{value:new Ye},outer:{value:new Ye},centre:{value:new we(.5,.55)},aspect:{value:1},spread:{value:1.05}}}),h=new Rt(new cs(2,2),f);h.frustumCulled=!1,h.renderOrder=-1e3,s.add(h);let d=HA(s),p=Ny(s),v=new B(0,Tu,0),g=new we,m=0,x=null,y,A,S,E,T=null,_=null,M=null,C=null,R=n,w={w:1,h:1};function P(G){y&&y.dispose(),y=new Ay(r,{frameBufferType:li,multisampling:G.msaa}),y.addPass(new Cy(s,a)),C=null,G.ao&&R&&(C=new R(s,a,w.w,w.h),Object.assign(C.configuration,{aoRadius:.09,distanceFalloff:.6,intensity:2.2,aoSamples:16,denoiseSamples:8,denoiseRadius:8,gammaCorrection:!1,halfRes:!1}),y.addPass(C)),_=null,M=null,G.dof&&(_=new by(a,{focusDistance:3,focusRange:.6,bokehScale:0,resolutionScale:.5}),M=new Fg(a,_),M.enabled=!1,y.addPass(M)),S=new Ty({intensity:.35,luminanceThreshold:1.6,luminanceSmoothing:.4,mipmapBlur:!0,radius:.62,levels:8}),A=new v0;let I=new Dy({mode:Ei.NEUTRAL});E=new Py({offset:.3,darkness:.55});let te=[S,A,I,E];T=null,G.grain&&(T=new Ry({premultiply:!0,blendFunction:ft.SCREEN}),T.blendMode.opacity.value=.045,te.push(T)),y.addPass(new Fg(a,...te))}P(e);let F=new Ye,N=new Ye,O=lD.map((G,I)=>[new Ye(G[0]).multiplyScalar(I===3?2.2:1),new Ye(G[1]).multiplyScalar(I===3?2.2:1)]),H=[new B,new B];function j(G){let I=Math.max(0,Math.min(O.length-1,Math.floor(G))),te=Math.min(O.length-1,I+1),ie=Math.min(1,Math.max(0,G-I));F.copy(O[I][0]).lerp(O[te][0],ie),N.copy(O[I][1]).lerp(O[te][1],ie),f.uniforms.inner.value.copy(F),f.uniforms.outer.value.copy(N)}return{renderer:r,scene:s,camera:a,ring:c,diamond:u,studio:o,tier:e,get size(){return w},resize(G,I,te){w.w=G,w.h=I,r.setPixelRatio(te),r.setSize(G,I,!1),y.setSize(G,I),a.aspect=G/I,f.uniforms.aspect.value=G/I,a.updateProjectionMatrix()},setTier(G){this.tier=G,u.setQuality({bounces:G.bounces,ss:G.ss,waves:G.waves,exact:G.exact});let I=c.pave&&c.pave.material.uniforms&&c.pave.material.uniforms.bounces;I&&(I.value=Math.min(4,G.bounces)),P(G),y.setSize(w.w,w.h)},useAO(G){R=G,this.tier.ao&&(P(this.tier),y.setSize(w.w,w.h))},warm(){let G=r.getRenderTarget();r.setRenderTarget(y.inputBuffer);let I;try{I=r.compileAsync(s,a)}finally{r.setRenderTarget(G)}return I},async bench(G,I=3){let te=r.getContext(),ie=new Uint8Array(4),xe=[];for(let ye=0;ye<=I;ye++){let Ne=performance.now();this.render(G,ye*.04),r.setRenderTarget(null),te.readPixels(0,0,1,1,te.RGBA,te.UNSIGNED_BYTE,ie);let Q=performance.now()-Ne;if((ye>0||Q>1500)&&xe.push(Q),Q>(ye?300:1500))break;await new Promise(se=>setTimeout(se,0))}return xe.sort((ye,Ne)=>ye-Ne),xe[Math.floor((xe.length-1)/2)]},render(G,I){let te=Math.cos(G.el),ie=w.w/w.h,xe=w.w,ye=w.h,Ne=ye>xe*1.05,Q=Ne?0:Ni.clamp((1.75-ie)/.5,0,1),se=ie<1.25?Math.min(2.4,Math.pow(1.6/ie,.62)):1;se*=1+.25*Q;let ae=G.fov;se!==1&&(ae=Ni.radToDeg(2*Math.atan(Math.tan(Ni.degToRad(ae/2))*se))),a.fov=ae,a.position.set(G.tx+G.dist*te*Math.sin(G.az),G.ty+G.dist*Math.sin(G.el),G.tz+G.dist*te*Math.cos(G.az)),a.up.set(0,1,0),a.lookAt(G.tx,G.ty,G.tz);let re=Ne?0:G.shift*(1+.45*Q),he=Ne?G.shiftY:0;re||he?a.setViewOffset(xe,ye,-re*xe*.5,he*ye*.5,xe,ye):a.clearViewOffset(),a.updateProjectionMatrix(),f.uniforms.centre.value.set(.5+re*.5,.53+he*.5),f.uniforms.spread.value=1.05-.38*G.pool;let me=x===null?0:Math.min(.1,Math.max(0,I-x));if(x=I,(G.turn||0)>5e-4)m+=G.turn*me;else{let Oe=Math.round(m/(Math.PI*2))*Math.PI*2;m=Oe+(m-Oe)*Math.exp(-me*2.5)}u.mesh.rotation.y=m,c.group.rotation.y=G.spin+(Ne?G.spinTall:0)+G.wobble*Math.sin(I*.32)*.28,l?l.mood(G.mood):Ng(G.mood),c.update(G),u.setMorph(G.morph),u.setSetting(c.setting,c.metals[1].color),u.material.uniforms.glow.value=G.glow;let Ae=G.env+G.shimmer*Math.sin(I*.19+1.3)*.42;o.setAngle(Ae),s.environmentRotation.y=Ae,j(G.bg),A.uniforms.get("exposure").value=G.exposure;let oe=Math.max(0,1-Math.abs(G.bg-3)*2);E.darkness=.55*(1-oe),S.intensity=.35*G.bloom*(1-oe),S.luminanceMaterial.threshold=Math.max(.9,1.6-.45*(G.bloom-1)),T&&(T.blendMode.opacity.value=.045*(1-oe)),M&&(M.enabled=G.dof>.01,_.bokehScale=G.dof*3.2,_.cocMaterial.focusDistance=G.focus||G.dist,_.cocMaterial.focusRange=.25+G.dist*.12),s.updateMatrixWorld();let Ee=G.band>.001&&G.band<.999;H[0].copy(c.bandEnds[0]).applyMatrix4(c.group.matrixWorld),H[1].copy(c.bandEnds[1]).applyMatrix4(c.group.matrixWorld),r.getDrawingBufferSize(g),p.update({time:I,centre:v,motes:G.motes*(1-oe),beam:G.beam*(1-oe),pxScale:g.y/(2*Math.tan(Ni.degToRad(a.fov)/2))}),d.update(a,{diamond:u.mesh,pave:c.pave,envAngle:Ae,strength:G.glint,ends:H,endGlow:Ee?G.endGlow*Math.min(1,(1-G.band)*6):0}),y.render()}}}var hD=18,Zd={opening:[0,4.6],shapes:[4.6,11.8],details:[11.8,18]},x0=[{in:-1,out:.3,hold:.01},{in:2.2,out:4.3,hold:4.4},{in:5.3,out:8.4,hold:5.9},{in:9.55,out:11.5,hold:11.6},{in:12.75,out:14.8,hold:14.8},{in:15.7,out:0,hold:17.9}],VA=[5.55,6.4,7.3,8.2],WA=[9.3,10.4,11.4];function _0(){return Object.assign(Bl(),{tx:0,ty:2.2,tz:0,dist:3.75,az:.55,el:.72,fov:24,shift:.42,shiftY:.6,spin:.2,wobble:0,shimmer:.6,bg:0,mood:1,turn:.2,glint:.8,motes:.6,pool:1,bloom:1.6})}function XA(i,e){let t=(n,r,s,a)=>i.to(e,{...r,duration:s,ease:a},n);return t(0,{el:.84,dist:3.45},.6,"power1.in"),t(0,{env:1.3},1.4,"none"),t(.55,{el:1.1,dist:2.6,az:1.2,shift:.1,shiftY:.36,spin:.95,mood:.85},.85,"power2.out"),t(.9,{glint:1},.5,"none"),t(1.4,{el:.42,dist:9.2,az:.85,ty:.85,shiftY:.3},3.2,"power2.inOut"),t(1.4,{shift:.38},.8,"power2.inOut"),t(1.4,{spin:-.55},.35,"power1.inOut"),t(1.4,{turn:0,mood:.55,glint:.45,motes:.4,bloom:1.25},1.2),t(1.7,{band:1},1.5,"power1.inOut"),t(3,{prongs:1},.95,"power2.out"),t(3.1,{spin:.3},1.5,"power2.inOut"),t(3.2,{env:2.1},1.4,"power1.inOut"),t(4.6,{ty:2.2,dist:4.5,el:1.38,az:0,shift:.3,shiftY:.27,spin:Math.PI/2,spinTall:-Math.PI/2,mood:.8,glint:.6,dof:.55},1),t(5.7,{morph:1,env:2.6},.55),t(6.6,{morph:2,env:3.1},.55),t(7.5,{morph:3,env:3.6},.55),t(8.35,{morph:4,env:4},.45),t(8.6,{ty:.8,dist:10.8,el:.2,az:1.1,shift:-.27,shiftY:.4,dof:0,mood:.45,glint:.4},1.1),t(8.6,{spin:.3,spinTall:0},1.1),t(9.7,{spin:.55},2.1,"none"),t(9.6,{metal:1,env:5.2},.7),t(10.6,{metal:2,env:6.3},.7),t(11.8,{tx:0,ty:2.06,dist:3.2,el:-.04,az:.3,fov:22,shift:-.47,shiftY:.24,wobble:.15,spin:0,dof:1,mood:.6},1),t(12.5,{halo:1},1,"none"),t(13.5,{tx:.7,ty:1.25,dist:3.7,el:.36,az:.35,shift:-.42},1.2),t(13.7,{pave:1},1,"none"),t(15,{tx:0,ty:.8,dist:10.6,el:.34,az:1.05,fov:24,shift:.34,shiftY:.42,bg:1,exposure:.95,wobble:.5,dof:0,mood:.7,glint:.55,motes:.55,bloom:1.3},1.4),t(15,{spin:.2},1.4),t(16.4,{spin:.7},1.6,"none"),i.set({},{},hD),i}var YA={el:1.1,dist:2.6,az:1.2,shift:.1,shiftY:.36,spin:.95,mood:.85,glint:1,motes:.6,turn:.2},ha="";function y0(){return ha}function qA(i=ha){return/swiftshader|llvmpipe|softpipe|software|basic render/i.test(i)}function QA(i){if(i&&On[i])return On[i];let e=matchMedia("(pointer: coarse)").matches,t=Math.min(screen.width,screen.height)<820,n=navigator.hardwareConcurrency||8,r=navigator.deviceMemory||8,s=ha.toLowerCase();return e&&t?r<=3||n<=2?On.low:On.medium:/nvidia|geforce|quadro|rtx|radeon\s?(rx|pro)|arc\s?a\d/.test(s)?On.high:/intel|iris|uhd|radeon\(tm\) graphics|radeon graphics|vega|mali|adreno|powervr/.test(s)?On.low:n<=4||r<=4?On.low:On.medium}function ZA(i=!1){if(i||navigator.connection&&navigator.connection.saveData)return!1;try{let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;if(ha=String(e.getParameter(e.RENDERER)||""),!ha||/^webkit webgl$/i.test(ha)){let n=e.getExtension("WEBGL_debug_renderer_info");ha=String(n&&e.getParameter(n.UNMASKED_RENDERER_WEBGL)||ha)}let t=e.getExtension("WEBGL_lose_context");return t&&t.loseContext(),!0}catch{return!1}}var $i=[["high",1],["medium",1],["medium",.8],["low",1],["low",.8],["low",.65],["lite",.65],["lite",.5]],KA={high:1,medium:.4,low:.22,lite:.13},S0=26;function M0(i){return Math.max(0,$i.findIndex(e=>e[0]===i[0]&&e[1]===i[1]))}function A0(i,e,t){return i*(KA[t[0]]/KA[e[0]])*Math.pow(t[1]/e[1],2)}var JA="wk-film-fit";function jA(){try{let i=JSON.parse(sessionStorage.getItem(JA)||"null");return i==="off"||Array.isArray(i)&&On[i[0]]&&i[1]>0?i:null}catch{return null}}function ms(i){try{sessionStorage.setItem(JA,JSON.stringify(i))}catch{}}async function $A(i,e,t,n=S0){let r=await t();if(i[0]==="medium"&&i[1]===1&&A0(r,i,$i[0])<=n*.8){if(await e($i[0]),await t()<=n)return $i[0];await e(i)}for(let s=0;r>n&&s<4;s++){let a=M0(i);if(a>=$i.length-1)break;if(A0(r,i,$i[$i.length-1])>n*2.2)return null;let o=a+1;for(;o<$i.length-1&&A0(r,i,$i[o])>n;)o++;i=$i[o],await e(i),r=await t()}return r<=n*1.6?i:null}function eS(){let i=0,e=0,t=0,n=12,r=0,s=0;return{reset(a=12){i=0,e=0,t=0,n=a,r=0,s=0},tick(a){let o=i?a-i:0;if(i=a,!o)return"";if(r=r||a,n>0&&a-r<600)return n--,"";if(n=0,e+=Math.min(o,1500),t++,t<20&&e<1e3)return"";let l=e/t;return e=0,t=0,l<=38?(s=0,""):(s++,l>70||s>=2?"down":"")}}}var tS={THREE:{Color:Ye,WebGLRenderTarget:vt,LinearFilter:Vt,NearestFilter:Ct,HalfFloatType:li,RGBAFormat:Sn,DepthTexture:Fi,UnsignedInt248Type:kr,UnsignedIntType:An,DepthStencilFormat:ur,DepthFormat:lr,Matrix4:je,DataTexture:cr,ShaderMaterial:rt,NoColorSpace:Ti,RepeatWrapping:Zo,Vector2:we,REVISION:Xn,RedFormat:qs,FloatType:nn,GLSL3:iu,Vector3:B,Sphere:wr,BufferAttribute:ut,BufferGeometry:Lt,Float32BufferAttribute:on,OrthographicCamera:us,Mesh:Rt},PP:{Pass:wi}};gr.registerPlugin(ot,dh);var Wr=new URLSearchParams(location.search),qn=Wr.has("capture"),xs=!!On[Wr.get("tier")],fD=!qn&&(!xs||Wr.has("fit")),dD=Number(Wr.get("fit"))||S0,gs=!qn&&matchMedia("(prefers-reduced-motion: reduce)").matches,Vr=(i,e=document)=>e.querySelector(i),vs=(i,e=document)=>[...e.querySelectorAll(i)],hi=document.documentElement,T0=window.wkFilm&&window.wkFilm.ao||"";function pD(){return document.body.classList.contains("elementor-editor-active")||!!(window.elementorFrontend&&window.elementorFrontend.isEditMode&&window.elementorFrontend.isEditMode())}function E0(){let i=Vr(".wk-sticky"),e=i&&Vr(".hd",i);if(!e)return 0;let t=parseFloat(getComputedStyle(hi).getPropertyValue("--wp-admin--admin-bar--height"))||0;return e.offsetHeight+t}function mD(i){return new Promise(e=>window.requestIdleCallback?requestIdleCallback(()=>e(),{timeout:i}):setTimeout(e,1))}async function nS(){let i=vs(".wk-film .film-act");if(!i.length||hi.classList.contains("film-on"))return;if(pD()){hi.classList.add("film-editor");return}hi.classList.add("film-on"),qn&&hi.classList.add("film-capture");let e="",t=()=>{let U=E0(),k=i.find(fe=>fe.dataset.act==="opening"),Y=k?Math.max(0,Math.round(k.getBoundingClientRect().top+scrollY-U)):0,$=U+"|"+Math.round(Math.min(Y,innerHeight*.3));return $===e?!1:(e=$,hi.style.setProperty("--film-top",U+"px"),hi.style.setProperty("--film-lift",$.split("|")[1]+"px"),!0)};t();let n=ZA(Wr.has("no3d")),r=n&&(qn||xs||Wr.has("fit")||!qA()),s="";r||(s=Wr.has("no3d")?"turned off in the address (?no3d)":n?"software graphics (no graphics chip in use)":"this browser has no WebGL 2, or Data Saver is on"),r||hi.classList.add("film-no3d"),document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise(U=>setTimeout(U,2500))]),t();let a=_0(),o=XA(gr.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),a),l=i.find(U=>U.dataset.act==="opening");vs(".film-chap").forEach(U=>{let k=Number(U.dataset.chapter),Y=x0[k];if(!Y)return;if(k===0){o.to(U,{autoAlpha:0,y:-40,duration:.45,ease:"power2.in"},Y.out);return}let $=Vr("[data-split]",U),fe=$?dh.create($,{type:"lines",mask:"lines",linesClass:"film-line"}).lines:[],pe=vs(":scope > :not([data-split])",U);o.set(U,{autoAlpha:1},Y.in),fe.length&&o.from(fe,{yPercent:115,stagger:.07,duration:.55,ease:"power3.out"},Y.in),o.from(pe,{opacity:0,y:18,stagger:.06,duration:.5,ease:"power2.out"},Y.in+.12),Y.out&&o.to(U,{autoAlpha:0,y:-30,duration:.45,ease:"power2.in"},Y.out)}),vs(".film-cue").forEach(U=>o.to(U,{opacity:0,duration:.2},.1)),vs(".film-year").forEach(U=>o.fromTo(U,{opacity:0,yPercent:8},{opacity:1,yPercent:0,duration:1.2,ease:"power2.out"},15.3)),vs(".film-scrim.l").forEach(U=>{o.to(U,{opacity:0,duration:.6},8.7),o.to(U,{opacity:1,duration:.6},15)}),vs(".film-scrim.r").forEach(U=>{o.to(U,{opacity:1,duration:.6},8.9),o.to(U,{opacity:0,duration:.6},14.8)});let c=vs("[data-film-shape]"),u=vs("[data-film-metal]"),f="";o.eventCallback("onUpdate",()=>{let U=Math.round(a.morph)%4,k=Math.round(a.metal),Y=U+"|"+k;Y!==f&&(f=Y,c.forEach($=>$.setAttribute("aria-pressed",String(Number($.dataset.filmShape)===U))),u.forEach($=>$.setAttribute("aria-pressed",String(Number($.dataset.filmMetal)===k))))});let h=null,d=(U,k)=>{let[Y,$]=Zd[U.dataset.act],fe=U.getBoundingClientRect().top+scrollY-E0(),pe=U.offsetHeight-Vr(".film-stage",U).offsetHeight,le=Math.round(fe+(k-Y)/($-Y)*pe);h=gs?{y:le,t:k}:null,window.scrollTo({top:le,behavior:gs?"auto":"smooth"}),h&&p(k)};c.forEach(U=>U.addEventListener("click",()=>d(U.closest(".film-act"),VA[Number(U.dataset.filmShape)]))),u.forEach(U=>U.addEventListener("click",()=>d(U.closest(".film-act"),WA[Number(U.dataset.filmMetal)])));let p=U=>{qn||gs?(gr.killTweensOf(o),o.time(U)):gr.to(o,{time:U,duration:.5,ease:"power3.out",overwrite:!0})},v=(U,k)=>{let[Y,$]=Zd[U.dataset.act]||Zd.opening;if(h&&Math.abs(scrollY-h.y)<3)return h.t;if(h=null,gs){let fe=x0.filter(pe=>pe.hold>=Y&&pe.hold<=$).map(pe=>pe.hold);return fe[Math.min(fe.length-1,Math.floor(k*fe.length))]??Y}return Y+k*($-Y)},g=i.map(U=>ot.create({trigger:U,start:()=>"top top+="+E0(),end:"bottom bottom",invalidateOnRefresh:!0,onUpdate:k=>{p(v(U,k.progress));let Y=Vr(".film-bar",U);Y&&(Y.style.transform=`scaleX(${k.progress.toFixed(4)})`)}}));ot.config({ignoreMobileResize:!0});let m=()=>{t()&&ot.refresh()};document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",()=>setTimeout(m,0)),addEventListener("load",m);{let U=i.findIndex(k=>k.getBoundingClientRect().bottom>0&&k.getBoundingClientRect().top<innerHeight);U<0&&(U=i.reduce((k,Y,$)=>Y.getBoundingClientRect().bottom<=0?$:k,-1)),gr.killTweensOf(o),o.time(U<0?0:v(i[U],g[U].progress))}let x=null,y=!1,A=document.createElement("canvas");A.className="film-canvas",A.setAttribute("aria-hidden","true");let S=U=>{s=U||s;let k=x;if(x=null,y=!1,k)try{k.renderer.dispose(),k.renderer.forceContextLoss()}catch{}A.remove(),se=null,i.forEach(Y=>Y.classList.remove("is-live")),hi.classList.add("film-no3d")};A.addEventListener("webglcontextlost",U=>{U.preventDefault(),x&&!xs&&!qn&&ms("off"),S(x?"the graphics driver dropped the 3D":"")});let E=i.map(U=>Vr(".film-stage",U)),T="",_=0,M=U=>U!=="visible"&&U!=="clip",C=U=>{let k=[],Y=getComputedStyle(hi),$=!M(Y.overflowX)&&!M(Y.overflowY);for(let fe=U.parentElement;fe&&fe!==hi;fe=fe.parentElement){if(fe===document.body&&$)continue;let pe=getComputedStyle(fe);(M(pe.overflowX)||M(pe.overflowY))&&k.push(fe)}return k},R=!!(window.CSS&&CSS.supports&&CSS.supports("overflow","clip")),w=U=>{let k=getComputedStyle(U);return k.transform!=="none"||k.perspective!=="none"||k.filter!=="none"||!!k.backdropFilter&&k.backdropFilter!=="none"||/paint|layout|strict|content/.test(k.contain||"")||/transform|perspective|filter/.test(k.willChange||"")},P=new Map,F=U=>{if(!P.has(U)){let k=null;for(let Y=U.parentElement;Y&&Y!==hi&&!k;Y=Y.parentElement)k=w(Y)?Y:null;P.set(U,k)}return P.get(U)},N=U=>{T||(T=U,hi.classList.add("film-pinjs"),P.clear(),ot.refresh())},O=(U,k,Y,$,fe,pe)=>{let le=U.style,ce=(Le,Fe)=>{le.getPropertyValue(Le)!==Fe&&le.setProperty(Le,Fe,"important")};ce("position",k),ce("top",Y),ce("bottom",$),ce("left",fe),ce("width",pe)},H=()=>parseFloat(hi.style.getPropertyValue("--film-top"))||0,j=()=>{if(!T)return;let U=H();i.forEach((k,Y)=>{let $=E[Y],fe=k.getBoundingClientRect(),pe=$.offsetHeight;if(fe.top>U)O($,"absolute","0px","auto","0px","100%");else if(fe.bottom<U+pe)O($,"absolute","auto","0px","0px","100%");else{let le=F($),ce=le?le.getBoundingClientRect():{left:0,top:0};O($,"fixed",U-ce.top+"px","auto",fe.left-ce.left+"px",fe.width+"px")}})},G=()=>{for(let U of E)for(let k of C(U)){let Y=getComputedStyle(k),$=Y.overflowY!=="hidden"&&k.scrollHeight>k.clientHeight+1||Y.overflowX!=="hidden"&&k.scrollWidth>k.clientWidth+1;!R||$||(Y.display==="block"&&k.style.setProperty("display","flow-root"),k.style.setProperty("overflow-x",Y.overflowX==="hidden"?"clip":"visible","important"),k.style.setProperty("overflow-y",Y.overflowY==="hidden"?"clip":"visible","important"),_++)}E.some(U=>C(U).length)&&N("a page wrapper hides its overflow")},I=()=>{if(T||!Q)return;let U=H(),k=Q.getBoundingClientRect(),Y=Vr(".film-stage",Q),$=Y.offsetHeight;k.top<U-40&&k.bottom>U+$+40&&Math.abs(Y.getBoundingClientRect().top-U)>3&&N("the page did not keep the film on screen")};qn||(G(),addEventListener("load",G),Wr.has("pinjs")&&N("asked for in the address"));let te=1,ie=()=>{if(!x)return;let U=A.clientWidth||innerWidth,k=A.clientHeight||innerHeight,Y=Math.min(Math.max(devicePixelRatio||1,x.tier.supersample||1),x.tier.dpr)*te,$=x.tier.name==="high"?42e5:26e5;U*k*Y*Y>$&&(Y=Math.sqrt($/(U*k))),x.resize(U,k,Math.max(.5,Y))},xe={e:1},ye=!1,Ne=()=>{ye=!0;let U=l&&Vr(".film-poster img",l),k=U&&U.getAnimations?U.getAnimations().find(pe=>pe.playState==="running"):null;if(!k)return;let Y=/brightness\(([\d.]+)\)/.exec(getComputedStyle(U).filter),$=Y?Math.min(1,Number(Y[1])):1,fe=(k.effect.getComputedTiming().endTime-k.currentTime)/1e3;xe.e=Math.pow($,2.2),gr.to(xe,{e:1,duration:Math.max(.3,fe),ease:"power2.out"})},Q=null,se=null,ae=!0,re=Bl(),he={x:0,y:0,sx:0,sy:0};!qn&&!gs&&matchMedia("(pointer: fine)").matches&&addEventListener("pointermove",U=>{he.x=U.clientX/innerWidth*2-1,he.y=U.clientY/innerHeight*2-1},{passive:!0});let me=()=>{let U=null,k=0;for(let Y of i){let $=Y.getBoundingClientRect(),fe=Math.min(innerHeight,$.bottom)-Math.max(0,$.top);fe>k&&(k=fe,U=Y)}if(U!==Q&&(Q=U,ae=!0,hi.classList.toggle("film-playing",!!Q)),x&&Q&&se!==Q){se&&se.classList.remove("is-live"),se=Q;let Y=Vr(".film-stage",Q);Y.insertBefore(A,Y.firstChild),ie(),ae=!0}},Ae=eS(),oe=["medium",1],Ee=!1,Oe=!1,_e=async U=>{if(!x)return;let k=x.tier.name!==U[0];if(oe=U,te=U[1],k){let Y=y;y=!1,x.setTier(On[U[0]]),ie();try{await x.warm()}catch{}y=Y&&!!x}else ie();ae=!0,Ae.reset()},q=async()=>{let U=M0(oe);if(U>=$i.length-1){xs||(ms("off"),S("too slow while playing, even on the lightest level"));return}await _e($i[U+1]),xs||ms(oe)};document.addEventListener("visibilitychange",()=>Ae.reset(4));let z=null,Ve=U=>{if(!x||!y||!Q)return;if(b&&!qn){xs||ms("off"),S("this graphics chip could not build the 3D (a shader failed)");return}z===null&&(z=U),U-=z,!ye&&Q===l&&!qn&&Ne();let k=Object.assign(re,a);k.exposure=a.exposure*xe.e,qn||(he.sx+=(he.x-he.sx)*.05,he.sy+=(he.y-he.sy)*.035,k.az+=he.sx*.06,k.el+=he.sy*.035);try{x.render(k,gs?0:U)}catch(Y){if(console.error("Wulf film:",Y),Oe){Oe=!1;try{x.useAO(null),ae=!0;return}catch{}}xs||ms("off"),S("error: "+(Y&&Y.message||Y));return}Q.classList.add("is-live")},Be=0;addEventListener("resize",()=>{clearTimeout(Be),Be=setTimeout(()=>{m(),ie(),ae=!0},120)});let Ie=null,ge=()=>(!Ie&&T0&&(window.__wulfFilmLib=tS,Ie=new Promise(U=>{let k=document.createElement("script");k.src=T0,k.async=!0,k.onload=()=>U(window.WulfFilmAO||null),k.onerror=()=>U(null),document.head.appendChild(k)})),Ie||Promise.resolve(null)),L=U=>new Promise(k=>setTimeout(k,U)),b=!1,ee=(async()=>{if(!r)return;qn||await mD(600);let U=xs||qn?null:jA();if(U==="off"){S("turned off earlier in this visit (too slow, or it failed)");return}let k=QA(Wr.get("tier"));U&&(k=On[U[0]],te=U[1]);try{x=GA(A,{tier:k,preserve:qn})}catch(Y){S("the 3D could not start: "+(Y&&Y.message||Y));return}x.renderer.debug.onShaderError=(Y,$)=>{b=!0,console.error("Wulf film: this graphics chip could not build a shader.",Y.getProgramInfoLog($))},(k.ao||k.name==="medium")&&ge(),oe=[k.name,te],me(),ie();try{await x.warm()}catch{}if(x&&fD&&!U){let Y=Object.assign(Bl(),_0(),YA),$=0,fe=await $A(oe,_e,async()=>$=await x.bench(Y),dD);if(!x)return;if(!fe){ms("off"),S("too slow on this computer (the heaviest frame took "+Math.round($)+" ms)");return}fe!==oe&&await _e(fe),ms(oe)}if(x&&x.tier.ao&&T0){let Y=await(qn?ge():Promise.race([ge(),L(2500)]));if(Y&&x&&x.tier.ao)try{x.useAO(Y),Oe=!0}catch($){console.error("Wulf film (contact shadows):",$)}}if(x)try{x.render(Object.assign(Bl(),a,x.tier.dof?{dof:.5}:{}),0)}catch(Y){S("error: "+(Y&&Y.message||Y));return}if(x&&b&&!qn){xs||ms("off"),S("this graphics chip could not build the 3D (a shader failed)");return}x&&(y=!0,ae=!0,Ae.reset())})();if(!qn){let U=-1;gr.ticker.add(k=>{if(j(),me(),I(),!x||!y||!Q){Ae.reset(4);return}let Y=o.time()!==U||xe.e<1;U=o.time(),!(gs&&!Y&&!ae)&&(ae=!1,Ve(k),!gs&&!Ee&&Ae.tick(performance.now())==="down"&&(Ee=!0,q().finally(()=>{Ee=!1})))})}if(Wr.has("filmcheck")){let U=document.createElement("div");U.className="film-check",U.setAttribute("role","status"),U.style.cssText="position:fixed;left:12px;bottom:12px;z-index:99999;max-width:min(380px,calc(100vw - 24px));padding:12px 14px;border-radius:10px;background:rgba(5,7,11,.9);color:#fff;font:500 12.5px/1.55 system-ui,sans-serif;white-space:pre-line;pointer-events:none",document.body.appendChild(U);let k=0,Y=performance.now(),$=0;gr.ticker.add(()=>{k++;let pe=performance.now();pe-Y>=1e3&&($=Math.round(k*1e3/(pe-Y)),k=0,Y=pe)});let fe=()=>{let pe=x&&y;U.textContent=["Film check (kit "+(window.wkFilm&&window.wkFilm.v||"unknown")+")","Graphics: "+(y0()||"not reported by this browser"),"Stays on screen: "+(T?"pinned by the film, because "+T:_?"yes ("+_+" page wrapper"+(_>1?"s":"")+" adjusted)":"yes"),"3D: "+(pe?"on, "+oe[0]+" quality at "+Math.round(oe[1]*100)+"% resolution":s?"off, "+s:"starting"),pe?"Frames a second: "+$:"",gs?"Reduce motion is on in this computer's settings, so the film shows calm still frames.":""].filter(Boolean).join(`
`)};fe(),setInterval(fe,500)}window.__film={started:ee,live:()=>!!(x&&y),tier:()=>x&&x.tier.name,rung:()=>oe,gpu:()=>y0(),programs:()=>x?x.renderer.info.programs.length:0,setTier(U){x&&On[U]&&(x.setTier(On[U]),ie())},height:()=>hi.scrollHeight-innerHeight,top:U=>Vr(U).getBoundingClientRect().top+scrollY,frame(U,k=0){return window.scrollTo(0,U),ot.update(),me(),Ve(k),{act:Q&&Q.dataset.act,t:o.time(),tier:x&&x.tier.name}},at(U,k=0){return gr.killTweensOf(o),o.time(U),me(),z=0,Ve(k),{act:Q&&Q.dataset.act,t:o.time()}},ao:()=>!!window.WulfFilmAO}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",nS):nS();})();
