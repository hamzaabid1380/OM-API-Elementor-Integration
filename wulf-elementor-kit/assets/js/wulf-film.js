/*! Wulf Elementor Kit: cinematic film (3D). Built from cinematic-home/src/wp.js; do not edit by hand.
 * Includes three.js 0.183.2 (MIT), postprocessing 6.39.5 (Zlib), three-mesh-bvh 0.9.16 (MIT),
 * and GSAP 3.15.0 with ScrollTrigger and SplitText (GSAP standard no-charge license, gsap.com/standard-license). */
(()=>{var GA=Object.defineProperty;var VA=(i,e)=>{for(var t in e)GA(i,t,{get:e[t],enumerable:!0})};function Gr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function E0(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}var Ci={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Bl={duration:.5,overwrite:!1,delay:0},lp,kn,en,$i=1e8,Yt=1/$i,jd=Math.PI*2,WA=jd/4,XA=0,b0=Math.sqrt,YA=Math.cos,qA=Math.sin,wn=function(e){return typeof e=="string"},cn=function(e){return typeof e=="function"},Wr=function(e){return typeof e=="number"},Cu=function(e){return typeof e>"u"},Cr=function(e){return typeof e=="object"},wi=function(e){return e!==!1},cp=function(){return typeof window<"u"},_u=function(e){return cn(e)||wn(e)},w0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Kn=Array.isArray,QA=/random\([^)]+\)/g,ZA=/,\s*/g,v0=/(?:-?\.?\d|\.)+/gi,up=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ha=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Xd=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,hp=/[+-]=-?[.\d]+/,KA=/[^,'"\[\]\s]+/gi,JA=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,sn,br,$d,fp,Ni={},Mu={},C0,R0=function(e){return(Mu=to(e,Ni))&&Jn},Ru=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ul=function(e,t){return!t&&console.warn(e)},D0=function(e,t){return e&&(Ni[e]=t)&&Mu&&(Mu[e]=t)||Ni},Ll=function(){return 0},jA={suppressEvents:!0,isStart:!0,kill:!1},yu={suppressEvents:!0,kill:!1},$A={suppressEvents:!0},dp={},gs=[],ep={},P0,Ei={},Yd={},x0=30,Au=[],pp="",mp=function(e){var t=e[0],n,r;if(Cr(t)||cn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Au.length;r--&&!Au[r].targetTest(t););n=Au[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new _p(e[r],n)))||e.splice(r,1);return e},vs=function(e){return e._gsap||mp(er(e))[0]._gsap},gp=function(e,t,n){return(n=e[t])&&cn(n)?e[t]():Cu(n)&&e.getAttribute&&e.getAttribute(t)||n},ci=function(e,t){return(e=e.split(",")).forEach(t)||e},un=function(e){return Math.round(e*1e5)/1e5||0},rn=function(e){return Math.round(e*1e7)/1e7||0},fa=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},eS=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Tu=function(){var e=gs.length,t=gs.slice(0),n,r;for(ep={},gs.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},vp=function(e){return!!(e._initted||e._startAt||e.add)},I0=function(e,t,n,r){gs.length&&!kn&&Tu(),e.render(t,n,r||!!(kn&&t<0&&vp(e))),gs.length&&!kn&&Tu()},B0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(KA).length<2?t:wn(e)?e.trim():e},U0=function(e){return e},Oi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},tS=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},to=function(e,t){for(var n in t)e[n]=t[n];return e},_0=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Cr(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Eu=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Dl=function(e){var t=e.parent||sn,n=e.keyframes?tS(Kn(e.keyframes)):Oi;if(wi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},nS=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},L0=function(e,t,n,r,s){n===void 0&&(n="_first"),r===void 0&&(r="_last");var a=e[r],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Du=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},xs=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},la=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},iS=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},tp=function(e,t,n,r){return e._startAt&&(kn?e._startAt.revert(yu):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},rS=function i(e){return!e||e._ts&&i(e.parent)},y0=function(e){return e._repeat?no(e._tTime,e=e.duration()+e._rDelay)*e:0},no=function(e,t){var n=Math.floor(e=rn(e/t));return e&&n===e?n-1:n},bu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Pu=function(e){return e._end=rn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Yt)||0))},Iu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=rn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Pu(e),n._dirty||la(n,e)),e},F0=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=bu(e.rawTime(),t),(!t._dur||Ol(0,t.totalDuration(),n)-t._tTime>Yt)&&t.render(n,!0)),la(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Yt}},wr=function(e,t,n,r){return t.parent&&xs(t),t._start=rn((Wr(n)?n:n||e!==sn?ji(e,n,t):e._time)+t._delay),t._end=rn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),L0(e,t,"_first","_last",e._sort?"_start":0),np(t)||(e._recent=t),r||F0(e,t),e._ts<0&&Iu(e,e._tTime),e},N0=function(e,t){return(Ni.ScrollTrigger||Ru("scrollTrigger",t))&&Ni.ScrollTrigger.create(t,e)},O0=function(e,t,n,r,s){if(Sp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!kn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&P0!==bi.frame)return gs.push(e),e._lazy=[s,r],1},sS=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},np=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},aS=function(e,t,n,r){var s=e.ratio,a=t<0||!t&&(!e._start&&sS(e)&&!(!e._initted&&np(e))||(e._ts<0||e._dp._ts<0)&&!np(e))?0:1,o=e._rDelay,l=0,c,u,f;if(o&&e._repeat&&(l=Ol(0,e._tDur,t),u=no(l,o),e._yoyo&&u&1&&(a=1-a),u!==no(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||kn||r||e._zTime===Yt||!t&&e._zTime){if(!e._initted&&O0(e,t,r,n,l))return;for(f=e._zTime,e._zTime=t||(n?Yt:0),n||(n=t&&!f),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&tp(e,t,n,!0),e._onUpdate&&!n&&Fi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Fi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&xs(e,1),!n&&!kn&&(Fi(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},oS=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},io=function(e,t,n,r){var s=e._repeat,a=rn(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:rn(a*(s+1)+e._rDelay*s):a,o>0&&!r&&Iu(e,e._tTime=e._tDur*o),e.parent&&Pu(e),n||la(e.parent,e),e},A0=function(e){return e instanceof Zn?la(e):io(e,e._dur)},lS={_start:0,endTime:Ll,totalDuration:Ll},ji=function i(e,t,n){var r=e.labels,s=e._recent||lS,a=e.duration()>=$i?s.endTime(!1):e._dur,o,l,c;return wn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in r||(r[t]=a),r[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(Kn(n)?n[0]:n).totalDuration()),o>1?i(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Pl=function(e,t,n){var r=Wr(t[1]),s=(r?2:1)+(e<2?0:1),a=t[s],o,l;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=wi(l.vars.inherit)&&l.parent;a.immediateRender=wi(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new mn(t[0],a,t[s+1])},_s=function(e,t){return e||e===0?t(e):t},Ol=function(e,t,n){return n<e?e:n>t?t:n},zn=function(e,t){return!wn(e)||!(t=JA.exec(e))?"":t[1]},cS=function(e,t,n){return _s(n,function(r){return Ol(e,t,r)})},ip=[].slice,k0=function(e,t){return e&&Cr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Cr(e[0]))&&!e.nodeType&&e!==br},uS=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return wn(r)&&!t||k0(r,1)?(s=n).push.apply(s,er(r)):n.push(r)})||n},er=function(e,t,n){return en&&!t&&en.selector?en.selector(e):wn(e)&&!n&&($d||!ro())?ip.call((t||fp).querySelectorAll(e),0):Kn(e)?uS(e,n):k0(e)?ip.call(e,0):e?[e]:[]},rp=function(e){return e=er(e)[0]||Ul("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return er(t,n.querySelectorAll?n:n===e?Ul("Invalid scope")||fp.createElement("div"):e)}},z0=function(e){return e.sort(function(){return .5-Math.random()})},H0=function(e){if(cn(e))return e;var t=Cr(e)?e:{each:e},n=ca(t.ease),r=t.from||0,s=parseFloat(t.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=t.axis,u=r,f=r;return wn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],f=r[1]),function(h,d,p){var v=(p||t).length,m=a[v],g,x,A,y,M,E,T,_,S;if(!m){if(S=t.grid==="auto"?0:(t.grid||[1,$i])[1],!S){for(T=-$i;T<(T=p[S++].getBoundingClientRect().left)&&S<v;);S<v&&S--}for(m=a[v]=[],g=l?Math.min(S,v)*u-.5:r%S,x=S===$i?0:l?v*f/S-.5:r/S|0,T=0,_=$i,E=0;E<v;E++)A=E%S-g,y=x-(E/S|0),m[E]=M=c?Math.abs(c==="y"?y:A):b0(A*A+y*y),M>T&&(T=M),M<_&&(_=M);r==="random"&&z0(m),m.max=T-_,m.min=_,m.v=v=(parseFloat(t.amount)||parseFloat(t.each)*(S>v?v-1:c?c==="y"?v/S:S:Math.max(S,v/S))||0)*(r==="edges"?-1:1),m.b=v<0?s-v:s,m.u=zn(t.amount||t.each)||0,n=n&&v<0?MS(n):n}return v=(m[h]-m.min)/m.max||0,rn(m.b+(n?n(v):v)*m.v)+m.u}},sp=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=rn(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Wr(n)?0:zn(n))}},G0=function(e,t){var n=Kn(e),r,s;return!n&&Cr(e)&&(r=n=e.radius||$i,e.values?(e=er(e.values),(s=!Wr(e[0]))&&(r*=r)):e=sp(e.increment)),_s(t,n?cn(e)?function(a){return s=e(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=$i,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-o,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-o),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:a,s||u===a||Wr(a)?u:u+zn(a)}:sp(e))},V0=function(e,t,n,r){return _s(Kn(e)?!t:n===!0?!!(n=0):!r,function(){return Kn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},hS=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,a){return a(s)},r)}},fS=function(e,t){return function(n){return e(parseFloat(n))+(t||zn(n))}},dS=function(e,t,n){return X0(e,t,0,1,n)},W0=function(e,t,n){return _s(n,function(r){return e[~~t(r)]})},pS=function i(e,t,n){var r=t-e;return Kn(e)?W0(e,i(0,e.length),t):_s(n,function(s){return(r+(s-e)%r)%r+e})},mS=function i(e,t,n){var r=t-e,s=r*2;return Kn(e)?W0(e,i(0,e.length-1),t):_s(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>r?s-a:a)})},so=function(e){return e.replace(QA,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(ZA);return V0(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},X0=function(e,t,n,r,s){var a=t-e,o=r-n;return _s(s,function(l){return n+((l-e)/a*o||0)})},gS=function i(e,t,n,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=wn(e),o={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),a)e={p:e},t={p:t};else if(Kn(e)&&!Kn(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(p){p*=f;var v=Math.min(h,~~p);return u[v](p-v)},n=t}else r||(e=to(Kn(e)?[]:{},e));if(!u){for(l in t)yp.call(o,e,l,"get",t[l]);s=function(p){return Ep(p,o)||(a?e.p:e)}}}return _s(n,s)},S0=function(e,t,n){var r=e.labels,s=$i,a,o,l;for(a in r)o=r[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Fi=function(e,t,n){var r=e.vars,s=r[t],a=en,o=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&gs.length&&Tu(),o&&(en=o),u=l?s.apply(c,l):s.call(c),en=a,u},Cl=function(e){return xs(e),e.scrollTrigger&&e.scrollTrigger.kill(!!kn),e.progress()<1&&Fi(e,"onInterrupt"),e},eo,Y0=[],q0=function(e){if(e)if(e=!e.name&&e.default||e,cp()||e.headless){var t=e.name,n=cn(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ll,render:Ep,add:yp,kill:BS,modifier:IS,rawVars:0},a={targetTest:0,get:0,getSetter:Bu,aliases:{},register:0};if(ro(),e!==r){if(Ei[t])return;Oi(r,Oi(Eu(e,s),a)),to(r.prototype,to(s,Eu(e,a))),Ei[r.prop=t]=r,e.targetTest&&(Au.push(r),dp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}D0(t,r),e.register&&e.register(Jn,r,ui)}else Y0.push(e)},Xt=255,Rl={aqua:[0,Xt,Xt],lime:[0,Xt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Xt],navy:[0,0,128],white:[Xt,Xt,Xt],olive:[128,128,0],yellow:[Xt,Xt,0],orange:[Xt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Xt,0,0],pink:[Xt,192,203],cyan:[0,Xt,Xt],transparent:[Xt,Xt,Xt,0]},qd=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Xt+.5|0},Q0=function(e,t,n){var r=e?Wr(e)?[e>>16,e>>8&Xt,e&Xt]:0:Rl.black,s,a,o,l,c,u,f,h,d,p;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Rl[e])r=Rl[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Xt,r&Xt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Xt,e&Xt]}else if(e.substr(0,3)==="hsl"){if(r=p=e.match(v0),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=qd(l+1/3,s,a),r[1]=qd(l,s,a),r[2]=qd(l-1/3,s,a);else if(~e.indexOf("="))return r=e.match(up),n&&r.length<4&&(r[3]=1),r}else r=e.match(v0)||Rl.transparent;r=r.map(Number)}return t&&!p&&(s=r[0]/Xt,a=r[1]/Xt,o=r[2]/Xt,f=Math.max(s,a,o),h=Math.min(s,a,o),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(a-o)/d+(a<o?6:0):f===a?(o-s)/d+2:(s-a)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Z0=function(e){var t=[],n=[],r=-1;return e.split(Vr).forEach(function(s){var a=s.match(ha)||[];t.push.apply(t,a),n.push(r+=a.length+1)}),t.c=n,t},M0=function(e,t,n){var r="",s=(e+r).match(Vr),a=t?"hsla(":"rgba(",o=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=Q0(h,t,1))&&a+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=Z0(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(Vr,"1").split(ha),f=c.length-1;o<f;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Vr),f=c.length-1;o<f;o++)r+=c[o]+s[o];return r+c[f]},Vr=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Rl)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),vS=/hsl[a]?\(/,xp=function(e){var t=e.join(" "),n;if(Vr.lastIndex=0,Vr.test(t))return n=vS.test(t),e[1]=M0(e[1],n),e[0]=M0(e[0],n,Z0(e[1])),!0},Fl,bi=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,f,h,d,p=function v(m){var g=i()-r,x=m===!0,A,y,M,E;if((g>e||g<0)&&(n+=g-t),r+=g,M=r-n,A=M-a,(A>0||x)&&(E=++f.frame,h=M-f.time*1e3,f.time=M=M/1e3,a+=A+(A>=s?4:s-A),y=1),x||(l=c(v)),y)for(d=0;d<o.length;d++)o[d](M,h,E,m)};return f={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){C0&&(!$d&&cp()&&(br=$d=window,fp=br.document||{},Ni.gsap=Jn,(br.gsapVersions||(br.gsapVersions=[])).push(Jn.version),R0(Mu||br.GreenSockGlobals||!br.gsap&&br||{}),Y0.forEach(q0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,a-f.time*1e3+1|0)},Fl=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Fl=0,c=Ll},lagSmoothing:function(m,g){e=m||1/0,t=Math.min(g||33,e)},fps:function(m){s=1e3/(m||240),a=f.time*1e3+s},add:function(m,g,x){var A=g?function(y,M,E,T){m(y,M,E,T),f.remove(A)}:m;return f.remove(m),o[x?"unshift":"push"](A),ro(),A},remove:function(m,g){~(g=o.indexOf(m))&&o.splice(g,1)&&d>=g&&d--},_listeners:o},f}(),ro=function(){return!Fl&&bi.wake()},yt={},xS=/^[\d.\-M][\d.\-,\s]/,_S=/["']/g,yS=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[r]=isNaN(c)?c.replace(_S,"").trim():+c,r=l.substr(o+1).trim();return t},AS=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},SS=function(e){var t=(e+"").split("("),n=yt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[yS(t[1])]:AS(e).split(",").map(B0)):yt._CE&&xS.test(e)?yt._CE("",e):n},MS=function(e){return function(t){return 1-e(1-t)}},ca=function(e,t){return e&&(cn(e)?e:yt[e]||SS(e))||t},da=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},a;return ci(e,function(o){yt[o]=Ni[o]=s,yt[a=o.toLowerCase()]=n;for(var l in s)yt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=yt[o+"."+l]=s[l]}),s},K0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Qd=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/jd*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*qA((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:K0(o);return s=jd/s,l.config=function(c,u){return i(e,c,u)},l},Zd=function i(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:K0(n);return r.config=function(s){return i(e,s)},r};ci("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;da(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});yt.Linear.easeNone=yt.none=yt.Linear.easeIn;da("Elastic",Qd("in"),Qd("out"),Qd());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(o){return o<t?i*o*o:o<n?i*Math.pow(o-1.5/e,2)+.75:o<r?i*(o-=2.25/e)*o+.9375:i*Math.pow(o-2.625/e,2)+.984375};da("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);da("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});da("Circ",function(i){return-(b0(1-i*i)-1)});da("Sine",function(i){return i===1?1:-YA(i*WA)+1});da("Back",Zd("in"),Zd("out"),Zd());yt.SteppedEase=yt.steps=Ni.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,a=1-Yt;return function(o){return((r*Ol(0,a,o)|0)+s)*n}}};Bl.ease=yt["quad.out"];ci("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return pp+=i+","+i+"Params,"});var _p=function(e,t){this.id=XA++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:gp,this.set=t?t.getSetter:Bu},Nl=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,io(this,+t.duration,1,1),this.data=t.data,en&&(this._ctx=en,en.data.push(this)),Fl||bi.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,io(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(ro(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Iu(this,n),!s._dp||s.parent||F0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&wr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Yt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),I0(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+y0(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+y0(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?no(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Yt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?bu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Yt?0:this._rts,this.totalTime(Ol(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Pu(this),iS(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ro(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Yt&&(this._tTime-=Yt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=rn(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&wr(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(wi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?bu(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=$A);var r=kn;return kn=n,vp(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),kn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,A0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,A0(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(ji(this,n),wi(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,wi(r)),this._dur||(this._zTime=-Yt),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Yt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Yt,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Yt)},e.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(a){var o=cn(n)?n:U0,l=function(){var u=r.then;r.then=null,s&&s(),cn(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=u),a(o),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Cl(this)},i}();Oi(Nl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Yt,_prom:0,_ps:!1,_rts:1});var Zn=function(i){E0(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=wi(n.sortChildren),sn&&wr(n.parent||sn,Gr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&N0(Gr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,a){return Pl(0,arguments,this),this},t.from=function(r,s,a){return Pl(1,arguments,this),this},t.fromTo=function(r,s,a,o){return Pl(2,arguments,this),this},t.set=function(r,s,a){return s.duration=0,s.parent=this,Dl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new mn(r,s,ji(this,a),1),this},t.call=function(r,s,a){return wr(this,mn.delayedCall(0,r,s),a)},t.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new mn(r,a,ji(this,l)),this},t.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,Dl(a).immediateRender=wi(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},t.staggerFromTo=function(r,s,a,o,l,c,u,f){return o.startAt=a,Dl(o).immediateRender=wi(o.immediateRender),this.staggerTo(r,s,o,l,c,u,f)},t.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:rn(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,p,v,m,g,x,A,y,M,E,T;if(this!==sn&&u>l&&r>=0&&(u=l),u!==this._tTime||a||f){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),h=u,y=this._start,A=this._ts,g=!A,f&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,a);if(h=rn(u%m),u===l?(v=this._repeat,h=c):(M=rn(u/m),v=~~M,v&&v===M&&(h=c,v--),h>c&&(h=c)),M=no(this._tTime,m),!o&&this._tTime&&M!==v&&this._tTime-M*m-this._dur<=0&&(M=v),E&&v&1&&(h=c-h,T=1),v!==M&&!this._lock){var _=E&&M&1,S=_===(E&&v&1);if(v<M&&(_=!_),o=_?0:u%c?c:u,this._lock=1,this.render(o||(T?0:rn(v*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Fi(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,M=v),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,o=_?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=oS(this,rn(o),rn(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!!A,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&u&&c&&!s&&!M&&(Fi(this,"onStart"),this._tTime!==u))return this;if(h>=o&&r>=0)for(d=this._first;d;){if(p=d._next,(d._act||h>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,a),h!==this._time||!this._ts&&!g){x=0,p&&(u+=this._zTime=-Yt);break}}d=p}else{d=this._last;for(var C=r<0?r:h;d;){if(p=d._prev,(d._act||C<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(r,s,a);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,s,a||kn&&vp(d)),h!==this._time||!this._ts&&!g){x=0,p&&(u+=this._zTime=C?-Yt:Yt);break}}d=p}}if(x&&!s&&(this.pause(),x.render(h>=o?0:-Yt)._zTime=h>=o?1:-1,this._ts))return this._start=y,Pu(this),this.render(r,s,a);this._onUpdate&&!s&&Fi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(y===this._start||Math.abs(A)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&xs(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(Fi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var a=this;if(Wr(s)||(s=ji(this,s,r)),!(r instanceof Nl)){if(Kn(r))return r.forEach(function(o){return a.add(o,s)}),this;if(wn(r))return this.addLabel(r,s);if(cn(r))r=mn.delayedCall(0,r);else return this}return this!==r?wr(this,r,s):this},t.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-$i);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof mn?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},t.remove=function(r){return wn(r)?this.removeLabel(r):cn(r)?this.killTweensOf(r):(r.parent===this&&Du(this,r),r===this._recent&&(this._recent=this._last),la(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=rn(bi.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=ji(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,a){var o=mn.delayedCall(0,s||Ll,a);return o.data="isPause",this._hasPause=1,wr(this,o,ji(this,r))},t.removePause=function(r){var s=this._first;for(r=ji(this,r);s;)s._start===r&&s.data==="isPause"&&xs(s),s=s._next},t.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)ms!==o[l]&&o[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var a=[],o=er(r),l=this._first,c=Wr(s),u;l;)l instanceof mn?eS(l._targets,o)&&(c?(!ms||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(r,s){s=s||{};var a=this,o=ji(a,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,p=mn.to(a,Oi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Yt,onStart:function(){if(a.pause(),!d){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());p._dur!==m&&io(p,m,0,1).render(p._time,!0,!0),d=1}u&&u.apply(p,f||[])}},s));return h?p.render(0):p},t.tweenFromTo=function(r,s,a){return this.tweenTo(s,Oi({startAt:{time:ji(this,r)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),S0(this,ji(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),S0(this,ji(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Yt)},t.shiftChildren=function(r,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(r=rn(r);o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return la(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),la(this)},t.totalDuration=function(r){var s=0,a=this,o=a._last,l=$i,c,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,wr(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=rn(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;io(a,a===sn&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(r){if(sn._ts&&(I0(sn,bu(r,sn)),P0=bi.frame),bi.frame>=x0){x0+=Ci.autoSleep||120;var s=sn._first;if((!s||!s._ts)&&Ci.autoSleep&&bi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||bi.sleep()}}},e}(Nl);Oi(Zn.prototype,{_lock:0,_hasPause:0,_forcing:0});var TS=function(e,t,n,r,s,a,o){var l=new ui(this._pt,e,t,0,1,Tp,null,s),c=0,u=0,f,h,d,p,v,m,g,x;for(l.b=n,l.e=r,n+="",r+="",(g=~r.indexOf("random("))&&(r=so(r)),a&&(x=[n,r],a(x,e,t),n=x[0],r=x[1]),h=n.match(Xd)||[];f=Xd.exec(r);)p=f[0],v=r.substring(c,f.index),d?d=(d+1)%5:v.substr(-5)==="rgba("&&(d=1),p!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:v||u===1?v:",",s:m,c:p.charAt(1)==="="?fa(m,p)-m:parseFloat(p)-m,m:d&&d<4?Math.round:0},c=Xd.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(hp.test(r)||g)&&(l.e=0),this._pt=l,l},yp=function(e,t,n,r,s,a,o,l,c,u){cn(r)&&(r=r(s||0,e,a));var f=e[t],h=n!=="get"?n:cn(f)?c?e[t.indexOf("set")||!cn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=cn(f)?c?RS:$0:Mp,p;if(wn(r)&&(~r.indexOf("random(")&&(r=so(r)),r.charAt(1)==="="&&(p=fa(h,r)+(zn(h)||0),(p||p===0)&&(r=p))),!u||h!==r||ap)return!isNaN(h*r)&&r!==""?(p=new ui(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?PS:ev,0,d),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!f&&!(t in e)&&Ru(t,r),TS.call(this,e,t,h,r,d,l||Ci.stringFilter,c))},ES=function(e,t,n,r,s){if(cn(e)&&(e=Il(e,s,t,n,r)),!Cr(e)||e.style&&e.nodeType||Kn(e)||w0(e))return wn(e)?Il(e,s,t,n,r):e;var a={},o;for(o in e)a[o]=Il(e[o],s,t,n,r);return a},Ap=function(e,t,n,r,s,a){var o,l,c,u;if(Ei[e]&&(o=new Ei[e]).init(s,o.rawVars?t[e]:ES(t[e],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new ui(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==eo))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},ms,ap,Sp=function i(e,t,n){var r=e.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,p=e._dur,v=e._startAt,m=e._targets,g=e.parent,x=g&&g.data==="nested"?g.vars.targets:m,A=e._overwrite==="auto"&&!lp,y=e.timeline,M=r.easeReverse||f,E,T,_,S,C,R,b,P,L,F,N,O,j;if(y&&(!h||!s)&&(s="none"),e._ease=ca(s,Bl.ease),e._rEase=M&&(ca(M)||e._ease),e._from=!y&&!!r.runBackwards,e._from&&(e.ratio=1),!y||h&&!r.stagger){if(P=m[0]?vs(m[0]).harness:0,O=P&&r[P.prop],E=Eu(r,dp),v&&(v._zTime<0&&v.progress(1),t<0&&u&&o&&!d?v.render(-1,!0):v.revert(u&&p?yu:jA),v._lazy=0),a){if(xs(e._startAt=mn.set(m,Oi({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!v&&wi(l),startAt:null,delay:0,onUpdate:c&&function(){return Fi(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(kn||!o&&!d)&&e._startAt.revert(yu),o&&p&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&p&&!v){if(t&&(o=!1),_=Oi({overwrite:!1,data:"isFromStart",lazy:o&&!v&&wi(l),immediateRender:o,stagger:0,parent:g},E),O&&(_[P.prop]=O),xs(e._startAt=mn.set(m,_)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(kn?e._startAt.revert(yu):e._startAt.render(-1,!0)),e._zTime=t,!o)i(e._startAt,Yt,Yt);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&wi(l)||l&&!p,T=0;T<m.length;T++){if(C=m[T],b=C._gsap||mp(m)[T]._gsap,e._ptLookup[T]=F={},ep[b.id]&&gs.length&&Tu(),N=x===m?T:x.indexOf(C),P&&(L=new P).init(C,O||E,e,N,x)!==!1&&(e._pt=S=new ui(e._pt,C,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(z){F[z]=S}),L.priority&&(R=1)),!P||O)for(_ in E)Ei[_]&&(L=Ap(_,E,e,N,C,x))?L.priority&&(R=1):F[_]=S=yp.call(e,C,_,"get",E[_],N,x,0,r.stringFilter);e._op&&e._op[T]&&e.kill(C,e._op[T]),A&&e._pt&&(ms=e,sn.killTweensOf(C,F,e.globalTime(t)),j=!e.parent,ms=0),e._pt&&l&&(ep[b.id]=1)}R&&bp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!j,h&&t<=0&&y.render($i,!0,!0)},bS=function(e,t,n,r,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return ap=1,e.vars[t]="+=0",Sp(e,o),ap=0,l?Ul(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,f.e&&(f.e=un(n)+zn(f.e)),f.b&&(f.b=u.s+zn(f.b))},wS=function(e,t){var n=e[0]?vs(e[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return t;s=to({},t);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},CS=function(e,t,n,r){var s=t.ease||r||"power1.inOut",a,o;if(Kn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},Il=function(e,t,n,r,s){return cn(e)?e.call(t,n,r,s):wn(e)&&~e.indexOf("random(")?so(e):e},J0=pp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",j0={};ci(J0+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return j0[i]=1});var mn=function(i){E0(e,i);function e(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:Dl(r))||this;var l=o.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,p=l.keyframes,v=l.defaults,m=l.scrollTrigger,g=r.parent||sn,x=(Kn(n)||w0(n)?Wr(n[0]):"length"in r)?[n]:er(n),A,y,M,E,T,_,S,C;if(o._targets=x.length?mp(x):Ul("GSAP target "+n+" not found. https://gsap.com",!Ci.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,p||h||_u(c)||_u(u)){r=o.vars;var R=r.easeReverse||r.yoyoEase;if(A=o.timeline=new Zn({data:"nested",defaults:v||{},targets:g&&g.data==="nested"?g.vars.targets:x}),A.kill(),A.parent=A._dp=Gr(o),A._start=0,h||_u(c)||_u(u)){if(E=x.length,S=h&&H0(h),Cr(h))for(T in h)~J0.indexOf(T)&&(C||(C={}),C[T]=h[T]);for(y=0;y<E;y++)M=Eu(r,j0),M.stagger=0,R&&(M.easeReverse=R),C&&to(M,C),_=x[y],M.duration=+Il(c,Gr(o),y,_,x),M.delay=(+Il(u,Gr(o),y,_,x)||0)-o._delay,!h&&E===1&&M.delay&&(o._delay=u=M.delay,o._start+=u,M.delay=0),A.to(_,M,S?S(y,_,x):0),A._ease=yt.none;A.duration()?c=u=0:o.timeline=0}else if(p){Dl(Oi(A.vars.defaults,{ease:"none"})),A._ease=ca(p.ease||r.ease||"none");var b=0,P,L,F;if(Kn(p))p.forEach(function(N){return A.to(x,N,">")}),A.duration();else{M={};for(T in p)T==="ease"||T==="easeEach"||CS(T,p[T],M,p.easeEach);for(T in M)for(P=M[T].sort(function(N,O){return N.t-O.t}),b=0,y=0;y<P.length;y++)L=P[y],F={ease:L.e,duration:(L.t-(y?P[y-1].t:0))/100*c},F[T]=L.v,A.to(x,F,b),b+=F.duration;A.duration()<c&&A.to({},{duration:c-A.duration()})}}c||o.duration(c=A.duration())}else o.timeline=0;return d===!0&&!lp&&(ms=Gr(o),sn.killTweensOf(x),ms=0),wr(g,Gr(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(f||!c&&!p&&o._start===rn(g._time)&&wi(f)&&rS(Gr(o))&&g.data!=="nested")&&(o._tTime=-Yt,o.render(Math.max(0,-u)||0)),m&&N0(Gr(o),m),o}var t=e.prototype;return t.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Yt&&!u?l:r<Yt?0:r,h,d,p,v,m,g,x,A;if(!c)aS(this,r,s,a);else if(f!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,A=this.timeline,this._repeat){if(v=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(v*100+r,s,a);if(h=rn(f%v),f===l?(p=this._repeat,h=c):(m=rn(f/v),p=~~m,p&&p===m?(h=c,p--):h>c&&(h=c)),g=this._yoyo&&p&1,g&&(h=c-h),m=no(this._tTime,v),h===o&&!a&&this._initted&&p===m)return this._tTime=f,this;p!==m&&this.vars.repeatRefresh&&!g&&!this._lock&&h!==v&&this._initted&&(this._lock=a=1,this.render(rn(v*p),!0).invalidate()._lock=0)}if(!this._initted){if(O0(this,u?r:h,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._rEase){var y=h<o;if(y!==this._inv){var M=y?o:c-o;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=M?(y?-1:1)/M:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(h/c);if(this._from&&(this.ratio=x=1-x),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!s&&!m&&(Fi(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;A&&A.render(r<0?r:A._dur*A._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&tp(this,r,s,a),Fi(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!s&&this.parent&&Fi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&tp(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&xs(this,1),!s&&!(u&&!o)&&(f||o||g)&&(Fi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,a,o,l){Fl||bi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Sp(this,c),u=this._ease(c/this._dur),bS(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(Iu(this,0),this.parent||L0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Cl(this):this.scrollTrigger&&this.scrollTrigger.kill(!!kn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,ms&&ms.vars.overwrite!==!0)._first||Cl(this),this.parent&&a!==this.timeline.totalDuration()&&io(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?er(r):o,c=this._ptLookup,u=this._pt,f,h,d,p,v,m,g;if((!s||s==="all")&&nS(o,l))return s==="all"&&(this._pt=0),Cl(this);for(f=this._op=this._op||[],s!=="all"&&(wn(s)&&(v={},ci(s,function(x){return v[x]=1}),s=v),s=wS(o,s)),g=o.length;g--;)if(~l.indexOf(o[g])){h=c[g],s==="all"?(f[g]=s,p=h,d={}):(d=f[g]=f[g]||{},p=s);for(v in p)m=h&&h[v],m&&((!("kill"in m.d)||m.d.kill(v)===!0)&&Du(this,m,"_pt"),delete h[v]),d!=="all"&&(d[v]=1)}return this._initted&&!this._pt&&u&&Cl(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Pl(1,arguments)},e.delayedCall=function(r,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(r,s,a){return Pl(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,a){return sn.killTweensOf(r,s,a)},e}(Nl);Oi(mn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ci("staggerTo,staggerFrom,staggerFromTo",function(i){mn[i]=function(){var e=new Zn,t=ip.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Mp=function(e,t,n){return e[t]=n},$0=function(e,t,n){return e[t](n)},RS=function(e,t,n,r){return e[t](r.fp,n)},DS=function(e,t,n){return e.setAttribute(t,n)},Bu=function(e,t){return cn(e[t])?$0:Cu(e[t])&&e.setAttribute?DS:Mp},ev=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},PS=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Tp=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Ep=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},IS=function(e,t,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(e,t,n),s=a},BS=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Du(this,t,"_pt"):t.dep||(n=1),t=r;return!n},US=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},bp=function(e){for(var t=e._pt,n,r,s,a;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=s},ui=function(){function i(t,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||ev,this.d=l||this,this.set=c||Mp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=US,this.m=n,this.mt=s,this.tween=r},i}();ci(pp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return dp[i]=1});Ni.TweenMax=Ni.TweenLite=mn;Ni.TimelineLite=Ni.TimelineMax=Zn;sn=new Zn({sortChildren:!1,defaults:Bl,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Ci.stringFilter=xp;var ua=[],Su={},LS=[],T0=0,FS=0,Kd=function(e){return(Su[e]||LS).map(function(t){return t()})},op=function(){var e=Date.now(),t=[];e-T0>2&&(Kd("matchMediaInit"),ua.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=br.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Kd("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),T0=e,Kd("matchMedia"))},tv=function(){function i(t,n){this.selector=n&&rp(n),this.data=[],this._r=[],this.isReverted=!1,this.id=FS++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){cn(n)&&(s=r,r=n,n=cn);var a=this,o=function(){var c=en,u=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=rp(s)),en=a,f=r.apply(a,arguments),cn(f)&&a._r.push(f),en=c,a.selector=u,a.isReverted=!1,f};return a.last=o,n===cn?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var r=en;en=null,n(this),en=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof mn&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Zn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof mn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=ua.length;a--;)ua[a].id===this.id&&ua.splice(a,1)},e.revert=function(n){this.kill(n||{})},i}(),NS=function(){function i(t){this.contexts=[],this.scope=t,en&&en.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){Cr(n)||(n={matches:n});var a=new tv(0,s||this.scope),o=a.conditions={},l,c,u;en&&!a.selector&&(a.selector=en.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=br.matchMedia(n[c]),l&&(ua.indexOf(a)<0&&ua.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(op):l.addEventListener("change",op)));return u&&r(a,function(f){return a.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),wu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return q0(r)})},timeline:function(e){return new Zn(e)},getTweensOf:function(e,t){return sn.getTweensOf(e,t)},getProperty:function(e,t,n,r){wn(e)&&(e=er(e)[0]);var s=vs(e||{}).get,a=n?U0:B0;return n==="native"&&(n=""),e&&(t?a((Ei[t]&&Ei[t].get||s)(e,t,n,r)):function(o,l,c){return a((Ei[o]&&Ei[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=er(e),e.length>1){var r=e.map(function(u){return Jn.quickSetter(u,t,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var a=Ei[t],o=vs(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var f=new a;eo._pt=0,f.init(e,n?u+n:u,eo,0,[e]),f.render(1,f),eo._pt&&Ep(1,eo)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var r,s=Jn.to(e,Oi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return sn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ca(e.ease,Bl.ease)),_0(Bl,e||{})},config:function(e){return _0(Ci,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,a=e.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!Ei[o]&&!Ni[o]&&Ul(t+" effect requires "+o+" plugin.")}),Yd[t]=function(o,l,c){return n(er(o),Oi(l||{},s),c)},a&&(Zn.prototype[t]=function(o,l,c){return this.add(Yd[t](o,Cr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){yt[e]=ca(t)},parseEase:function(e,t){return arguments.length?ca(e,t):yt},getById:function(e){return sn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Zn(e),r,s;for(n.smoothChildTiming=wi(e.smoothChildTiming),sn.remove(n),n._dp=0,n._time=n._tTime=sn._time,r=sn._first;r;)s=r._next,(t||!(!r._dur&&r instanceof mn&&r.vars.onComplete===r._targets[0]))&&wr(n,r,r._start-r._delay),r=s;return wr(sn,n,0),n},context:function(e,t){return e?new tv(e,t):en},matchMedia:function(e){return new NS(e)},matchMediaRefresh:function(){return ua.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||op()},addEventListener:function(e,t){var n=Su[e]||(Su[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Su[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:pS,wrapYoyo:mS,distribute:H0,random:V0,snap:G0,normalize:dS,getUnit:zn,clamp:cS,splitColor:Q0,toArray:er,selector:rp,mapRange:X0,pipe:hS,unitize:fS,interpolate:gS,shuffle:z0},install:R0,effects:Yd,ticker:bi,updateRoot:Zn.updateRoot,plugins:Ei,globalTimeline:sn,core:{PropTween:ui,globals:D0,Tween:mn,Timeline:Zn,Animation:Nl,getCache:vs,_removeLinkedListItem:Du,reverting:function(){return kn},context:function(e){return e&&en&&(en.data.push(e),e._ctx=en),en},suppressOverwrites:function(e){return lp=e}}};ci("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return wu[i]=mn[i]});bi.add(Zn.updateRoot);eo=wu.to({},{duration:0});var OS=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},kS=function(e,t){var n=e._targets,r,s,a;for(r in t)for(s=n.length;s--;)a=e._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=OS(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[s],r))},Jd=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(wn(s)&&(l={},ci(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}kS(o,s)}}}},Jn=wu.registerPlugin({name:"attr",init:function(e,t,n,r,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)kn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Jd("roundProps",sp),Jd("modifiers"),Jd("snap",G0))||wu;mn.version=Zn.version=Jn.version="3.15.0";C0=1;cp()&&ro();var zS=yt.Power0,HS=yt.Power1,GS=yt.Power2,VS=yt.Power3,WS=yt.Power4,XS=yt.Linear,YS=yt.Quad,qS=yt.Cubic,QS=yt.Quart,ZS=yt.Quint,KS=yt.Strong,JS=yt.Elastic,jS=yt.Back,$S=yt.SteppedEase,e1=yt.Bounce,t1=yt.Sine,n1=yt.Expo,i1=yt.Circ;var nv,ys,oo,Ip,va,r1,iv,Bp,s1=function(){return typeof window<"u"},Yr={},ga=180/Math.PI,lo=Math.PI/180,ao=Math.atan2,rv=1e8,Up=/([A-Z])/g,a1=/(left|right|width|margin|padding|x)/i,o1=/[\s,\(]\S/,Rr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Cp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},l1=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},c1=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},u1=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},h1=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},fv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},dv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},f1=function(e,t,n){return e.style[t]=n},d1=function(e,t,n){return e.style.setProperty(t,n)},p1=function(e,t,n){return e._gsap[t]=n},m1=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},g1=function(e,t,n,r,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},v1=function(e,t,n,r,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},an="transform",Ri=an+"Origin",x1=function i(e,t){var n=this,r=this.target,s=r.style,a=r._gsap;if(e in Yr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Rr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Xr(r,o)}):this.tfm[e]=a.x?a[e]:Xr(r,e),e===Ri&&(this.tfm.zOrigin=a.zOrigin);else return Rr.transform.split(",").forEach(function(o){return i.call(n,o,t)});if(this.props.indexOf(an)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ri,t,"")),e=an}(s||t)&&this.props.push(e,t,s[e])},pv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},_1=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Up,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Bp(),(!s||!s.isStart)&&!n[an]&&(pv(n),r.zOrigin&&n[Ri]&&(n[Ri]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},mv=function(e,t){var n={target:e,props:[],revert:_1,save:x1};return e._gsap||Jn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},gv,Rp=function(e,t){var n=ys.createElementNS?ys.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ys.createElement(e);return n&&n.style?n:ys.createElement(e)},ki=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Up,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,co(t)||t,1)||""},sv="O,Moz,ms,Ms,Webkit".split(","),co=function(e,t,n){var r=t||va,s=r.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(sv[a]+e in s););return a<0?null:(a===3?"ms":a>=0?sv[a]:"")+e},Dp=function(){s1()&&window.document&&(nv=window,ys=nv.document,oo=ys.documentElement,va=Rp("div")||{style:{}},r1=Rp("div"),an=co(an),Ri=an+"Origin",va.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",gv=!!co("perspective"),Bp=Jn.core.reverting,Ip=1)},av=function(e){var t=e.ownerSVGElement,n=Rp("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),oo.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),oo.removeChild(n),s},ov=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},vv=function(e){var t,n;try{t=e.getBBox()}catch{t=av(e),n=1}return t&&(t.width||t.height)||n||(t=av(e)),t&&!t.width&&!t.x&&!t.y?{x:+ov(e,["x","cx","x1"])||0,y:+ov(e,["y","cy","y1"])||0,width:0,height:0}:t},xv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&vv(e))},Ss=function(e,t){if(t){var n=e.style,r;t in Yr&&t!==Ri&&(t=an),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(Up,"-$1").toLowerCase())):n.removeAttribute(t)}},As=function(e,t,n,r,s,a){var o=new ui(e._pt,t,n,0,1,a?dv:fv);return e._pt=o,o.b=r,o.e=s,e._props.push(n),o},lv={deg:1,rad:1,turn:1},y1={grid:1,flex:1},Ms=function i(e,t,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=va.style,l=a1.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",p,v,m,g;if(r===a||!s||lv[r]||lv[a])return s;if(a!=="px"&&!h&&(s=i(e,t,n,"px")),g=e.getCTM&&xv(e),(d||a==="%")&&(Yr[t]||~t.indexOf("adius")))return p=g?e.getBBox()[l?"width":"height"]:e[u],un(d?s/p*f:s/100*p);if(o[l?"width":"height"]=f+(h?a:r),v=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,g&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===ys||!v.appendChild)&&(v=ys.body),m=v._gsap,m&&d&&m.width&&l&&m.time===bi.time&&!m.uncache)return un(s/m.width*f);if(d&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=f+r,p=e[u],x?e.style[t]=x:Ss(e,t)}else(d||a==="%")&&!y1[ki(v,"display")]&&(o.position=ki(e,"position")),v===e&&(o.position="static"),v.appendChild(va),p=va[u],v.removeChild(va),o.position="absolute";return l&&d&&(m=vs(v),m.time=bi.time,m.width=v[u]),un(h?p*s/f:p&&s?f/p*s:0)},Xr=function(e,t,n,r){var s;return Ip||Dp(),t in Rr&&t!=="transform"&&(t=Rr[t],~t.indexOf(",")&&(t=t.split(",")[0])),Yr[t]&&t!=="transform"?(s=Hl(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Lu(ki(e,Ri))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Uu[t]&&Uu[t](e,t,n)||ki(e,t)||gp(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ms(e,t,s,n)+n:s},A1=function(e,t,n,r){if(!n||n==="none"){var s=co(t,e,1),a=s&&ki(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=ki(e,"borderTopColor"))}var o=new ui(this._pt,e.style,t,0,1,Tp),l=0,c=0,u,f,h,d,p,v,m,g,x,A,y,M;if(o.b=n,o.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=ki(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(v=e.style[t],e.style[t]=r,r=ki(e,t)||r,v?e.style[t]=v:Ss(e,t)),u=[n,r],xp(u),n=u[0],r=u[1],h=n.match(ha)||[],M=r.match(ha)||[],M.length){for(;f=ha.exec(r);)m=f[0],x=r.substring(l,f.index),p?p=(p+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(p=1),m!==(v=h[c++]||"")&&(d=parseFloat(v)||0,y=v.substr((d+"").length),m.charAt(1)==="="&&(m=fa(d,m)+y),g=parseFloat(m),A=m.substr((g+"").length),l=ha.lastIndex-A.length,A||(A=A||Ci.units[t]||y,l===r.length&&(r+=A,o.e+=A)),y!==A&&(d=Ms(e,t,v,A)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:d,c:g-d,m:p&&p<4||t==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=t==="display"&&r==="none"?dv:fv;return hp.test(r)&&(o.e=0),this._pt=o,o},cv={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},S1=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=cv[n]||n,t[1]=cv[r]||r,t.join(" ")},M1=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Yr[o]&&(l=1,o=o==="transformOrigin"?Ri:an),Ss(n,o);l&&(Ss(n,an),a&&(a.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Hl(n,1),a.uncache=1,pv(r)))}},Uu={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var a=e._pt=new ui(e._pt,t,n,0,0,M1);return a.u=r,a.pr=-10,a.tween=s,e._props.push(n),1}}},zl=[1,0,0,1,0,0],_v={},yv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},uv=function(e){var t=ki(e,an);return yv(t)?zl:t.substr(7).match(up).map(un)},Lp=function(e,t){var n=e._gsap||vs(e),r=e.style,s=uv(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?zl:s):(s===zl&&!e.offsetParent&&e!==oo&&!n.svg&&(l=r.display,r.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,oo.appendChild(e)),s=uv(e),l?r.display=l:Ss(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):oo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Pp=function(e,t,n,r,s,a){var o=e._gsap,l=s||Lp(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,d=l[0],p=l[1],v=l[2],m=l[3],g=l[4],x=l[5],A=t.split(" "),y=parseFloat(A[0])||0,M=parseFloat(A[1])||0,E,T,_,S;n?l!==zl&&(T=d*m-p*v)&&(_=y*(m/T)+M*(-v/T)+(v*x-m*g)/T,S=y*(-p/T)+M*(d/T)-(d*x-p*g)/T,y=_,M=S):(E=vv(e),y=E.x+(~A[0].indexOf("%")?y/100*E.width:y),M=E.y+(~(A[1]||A[0]).indexOf("%")?M/100*E.height:M)),r||r!==!1&&o.smooth?(g=y-c,x=M-u,o.xOffset=f+(g*d+x*v)-g,o.yOffset=h+(g*p+x*m)-x):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=M,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Ri]="0px 0px",a&&(As(a,o,"xOrigin",c,y),As(a,o,"yOrigin",u,M),As(a,o,"xOffset",f,o.xOffset),As(a,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",y+" "+M)},Hl=function(e,t){var n=e._gsap||new _p(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=ki(e,Ri)||"0",u,f,h,d,p,v,m,g,x,A,y,M,E,T,_,S,C,R,b,P,L,F,N,O,j,z,I,ie,se,ye,Re,Y;return u=f=h=v=m=g=x=A=y=0,d=p=1,n.svg=!!(e.getCTM&&xv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[an]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[an]!=="none"?l[an]:"")),r.scale=r.rotate=r.translate="none"),T=Lp(e,n.svg),n.svg&&(n.uncache?(j=e.getBBox(),c=n.xOrigin-j.x+"px "+(n.yOrigin-j.y)+"px",O=""):O=!t&&e.getAttribute("data-svg-origin"),Pp(e,O||c,!!O||n.originIsAbsolute,n.smooth!==!1,T)),M=n.xOrigin||0,E=n.yOrigin||0,T!==zl&&(R=T[0],b=T[1],P=T[2],L=T[3],u=F=T[4],f=N=T[5],T.length===6?(d=Math.sqrt(R*R+b*b),p=Math.sqrt(L*L+P*P),v=R||b?ao(b,R)*ga:0,x=P||L?ao(P,L)*ga+v:0,x&&(p*=Math.abs(Math.cos(x*lo))),n.svg&&(u-=M-(M*R+E*P),f-=E-(M*b+E*L))):(Y=T[6],ye=T[7],I=T[8],ie=T[9],se=T[10],Re=T[11],u=T[12],f=T[13],h=T[14],_=ao(Y,se),m=_*ga,_&&(S=Math.cos(-_),C=Math.sin(-_),O=F*S+I*C,j=N*S+ie*C,z=Y*S+se*C,I=F*-C+I*S,ie=N*-C+ie*S,se=Y*-C+se*S,Re=ye*-C+Re*S,F=O,N=j,Y=z),_=ao(-P,se),g=_*ga,_&&(S=Math.cos(-_),C=Math.sin(-_),O=R*S-I*C,j=b*S-ie*C,z=P*S-se*C,Re=L*C+Re*S,R=O,b=j,P=z),_=ao(b,R),v=_*ga,_&&(S=Math.cos(_),C=Math.sin(_),O=R*S+b*C,j=F*S+N*C,b=b*S-R*C,N=N*S-F*C,R=O,F=j),m&&Math.abs(m)+Math.abs(v)>359.9&&(m=v=0,g=180-g),d=un(Math.sqrt(R*R+b*b+P*P)),p=un(Math.sqrt(N*N+Y*Y)),_=ao(F,N),x=Math.abs(_)>2e-4?_*ga:0,y=Re?1/(Re<0?-Re:Re):0),n.svg&&(O=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!yv(ki(e,an)),O&&e.setAttribute("transform",O))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(d*=-1,x+=v<=0?180:-180,v+=v<=0?180:-180):(p*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=un(d),n.scaleY=un(p),n.rotation=un(v)+o,n.rotationX=un(m)+o,n.rotationY=un(g)+o,n.skewX=x+o,n.skewY=A+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Ri]=Lu(c)),n.xOffset=n.yOffset=0,n.force3D=Ci.force3D,n.renderTransform=n.svg?E1:gv?Av:T1,n.uncache=0,n},Lu=function(e){return(e=e.split(" "))[0]+" "+e[1]},wp=function(e,t,n){var r=zn(t);return un(parseFloat(t)+parseFloat(Ms(e,"x",n+"px",r)))+r},T1=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Av(e,t)},pa="0deg",kl="0px",ma=") ",Av=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,p=n.scaleX,v=n.scaleY,m=n.transformPerspective,g=n.force3D,x=n.target,A=n.zOrigin,y="",M=g==="auto"&&e&&e!==1||g===!0;if(A&&(f!==pa||u!==pa)){var E=parseFloat(u)*lo,T=Math.sin(E),_=Math.cos(E),S;E=parseFloat(f)*lo,S=Math.cos(E),a=wp(x,a,T*S*-A),o=wp(x,o,-Math.sin(E)*-A),l=wp(x,l,_*S*-A+A)}m!==kl&&(y+="perspective("+m+ma),(r||s)&&(y+="translate("+r+"%, "+s+"%) "),(M||a!==kl||o!==kl||l!==kl)&&(y+=l!==kl||M?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+ma),c!==pa&&(y+="rotate("+c+ma),u!==pa&&(y+="rotateY("+u+ma),f!==pa&&(y+="rotateX("+f+ma),(h!==pa||d!==pa)&&(y+="skew("+h+", "+d+ma),(p!==1||v!==1)&&(y+="scale("+p+", "+v+ma),x.style[an]=y||"translate(0, 0)"},E1=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,p=n.xOrigin,v=n.yOrigin,m=n.xOffset,g=n.yOffset,x=n.forceCSS,A=parseFloat(a),y=parseFloat(o),M,E,T,_,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=lo,c*=lo,M=Math.cos(l)*f,E=Math.sin(l)*f,T=Math.sin(l-c)*-h,_=Math.cos(l-c)*h,c&&(u*=lo,S=Math.tan(c-u),S=Math.sqrt(1+S*S),T*=S,_*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),M*=S,E*=S)),M=un(M),E=un(E),T=un(T),_=un(_)):(M=f,_=h,E=T=0),(A&&!~(a+"").indexOf("px")||y&&!~(o+"").indexOf("px"))&&(A=Ms(d,"x",a,"px"),y=Ms(d,"y",o,"px")),(p||v||m||g)&&(A=un(A+p-(p*M+v*T)+m),y=un(y+v-(p*E+v*_)+g)),(r||s)&&(S=d.getBBox(),A=un(A+r/100*S.width),y=un(y+s/100*S.height)),S="matrix("+M+","+E+","+T+","+_+","+A+","+y+")",d.setAttribute("transform",S),x&&(d.style[an]=S)},b1=function(e,t,n,r,s){var a=360,o=wn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?ga:1),c=l-r,u=r+c+"deg",f,h;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*rv)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*rv)%a-~~(c/a)*a)),e._pt=h=new ui(e._pt,t,n,r,c,l1),h.e=u,h.u="deg",e._props.push(n),h},hv=function(e,t){for(var n in t)e[n]=t[n];return e},w1=function(e,t,n){var r=hv({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,f,h,d,p;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[an]=t,o=Hl(n,1),Ss(n,an),n.setAttribute("transform",c)):(c=getComputedStyle(n)[an],a[an]=t,o=Hl(n,1),a[an]=c);for(l in Yr)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(d=zn(c),p=zn(u),f=d!==p?Ms(n,l,c,p):parseFloat(c),h=parseFloat(u),e._pt=new ui(e._pt,o,l,f,h-f,Cp),e._pt.u=p||0,e._props.push(l));hv(o,r)};ci("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",a=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(o){return e<2?i+o:"border"+o+i});Uu[e>1?"border"+i:i]=function(o,l,c,u,f){var h,d;if(arguments.length<4)return h=a.map(function(p){return Xr(o,p,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},a.forEach(function(p,v){return d[p]=h[v]=h[v]||h[(v-1)/2|0]}),o.init(l,d,f)}});var Fp={name:"css",register:Dp,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,f,h,d,p,v,m,g,x,A,y,M,E,T,_,S;Ip||Dp(),this.styles=this.styles||mv(e),_=this.styles.props,this.tween=n;for(v in t)if(v!=="autoRound"&&(u=t[v],!(Ei[v]&&Ap(v,t,n,r,e,s)))){if(d=typeof u,p=Uu[v],d==="function"&&(u=u.call(n,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=so(u)),p)p(this,e,v,u,n)&&(T=1);else if(v.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(v)+"").trim(),u+="",Vr.lastIndex=0,Vr.test(c)||(m=zn(c),g=zn(u),g?m!==g&&(c=Ms(e,v,c,g)+g):m&&(u+=m)),this.add(o,"setProperty",c,u,r,s,0,0,v),a.push(v),_.push(v,0,o[v]);else if(d!=="undefined"){if(l&&v in l?(c=typeof l[v]=="function"?l[v].call(n,r,e,s):l[v],wn(c)&&~c.indexOf("random(")&&(c=so(c)),zn(c+"")||c==="auto"||(c+=Ci.units[v]||zn(Xr(e,v))||""),(c+"").charAt(1)==="="&&(c=Xr(e,v))):c=Xr(e,v),h=parseFloat(c),x=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),f=parseFloat(u),v in Rr&&(v==="autoAlpha"&&(h===1&&Xr(e,"visibility")==="hidden"&&f&&(h=0),_.push("visibility",0,o.visibility),As(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),v!=="scale"&&v!=="transform"&&(v=Rr[v],~v.indexOf(",")&&(v=v.split(",")[0]))),A=v in Yr,A){if(this.styles.save(v),S=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=ki(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=u,u=ki(e,"perspective"),C?e.style.perspective=C:Ss(e,"perspective")}f=parseFloat(u)}if(y||(M=e._gsap,M.renderTransform&&!t.parseTransform||Hl(e,t.parseTransform),E=t.smoothOrigin!==!1&&M.smooth,y=this._pt=new ui(this._pt,o,an,0,1,M.renderTransform,M,0,-1),y.dep=1),v==="scale")this._pt=new ui(this._pt,M,"scaleY",M.scaleY,(x?fa(M.scaleY,x+f):f)-M.scaleY||0,Cp),this._pt.u=0,a.push("scaleY",v),v+="X";else if(v==="transformOrigin"){_.push(Ri,0,o[Ri]),u=S1(u),M.svg?Pp(e,u,0,E,0,this):(g=parseFloat(u.split(" ")[2])||0,g!==M.zOrigin&&As(this,M,"zOrigin",M.zOrigin,g),As(this,o,v,Lu(c),Lu(u)));continue}else if(v==="svgOrigin"){Pp(e,u,1,E,0,this);continue}else if(v in _v){b1(this,M,v,h,x?fa(h,x+u):u);continue}else if(v==="smoothOrigin"){As(this,M,"smooth",M.smooth,u);continue}else if(v==="force3D"){M[v]=u;continue}else if(v==="transform"){w1(this,u,e);continue}}else v in o||(v=co(v)||v);if(A||(f||f===0)&&(h||h===0)&&!o1.test(u)&&v in o)m=(c+"").substr((h+"").length),f||(f=0),g=zn(u)||(v in Ci.units?Ci.units[v]:m),m!==g&&(h=Ms(e,v,c,g)),this._pt=new ui(this._pt,A?M:o,v,h,(x?fa(h,x+f):f)-h,!A&&(g==="px"||v==="zIndex")&&t.autoRound!==!1?h1:Cp),this._pt.u=g||0,A&&S!==u?(this._pt.b=c,this._pt.e=S,this._pt.r=u1):m!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=c1);else if(v in o)A1.call(this,e,v,c,x?x+u:u);else if(v in e)this.add(e,v,c||e[v],x?x+u:u,r,s);else if(v!=="parseTransform"){Ru(v,u);continue}A||(v in o?_.push(v,0,o[v]):typeof e[v]=="function"?_.push(v,2,e[v]()):_.push(v,1,c||e[v])),a.push(v)}}T&&bp(this)},render:function(e,t){if(t.tween._time||!Bp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Xr,aliases:Rr,getSetter:function(e,t,n){var r=Rr[t];return r&&r.indexOf(",")<0&&(t=r),t in Yr&&t!==Ri&&(e._gsap.x||Xr(e,"x"))?n&&iv===n?t==="scale"?m1:p1:(iv=n||{})&&(t==="scale"?g1:v1):e.style&&!Cu(e.style[t])?f1:~t.indexOf("-")?d1:Bu(e,t)},core:{_removeProperty:Ss,_getMatrix:Lp}};Jn.utils.checkPrefix=co;Jn.core.getStyleSaver=mv;(function(i,e,t,n){var r=ci(i+","+e+","+t,function(s){Yr[s]=1});ci(e,function(s){Ci.units[s]="deg",_v[s]=1}),Rr[r[13]]=i+","+e,ci(n,function(s){var a=s.split(":");Rr[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ci("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){Ci.units[i]="px"});Jn.registerPlugin(Fp);var Dr=Jn.registerPlugin(Fp)||Jn,oD=Dr.core.Tween;function Sv(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function C1(i,e,t){return e&&Sv(i.prototype,e),t&&Sv(i,t),i}var Hn,Ou,R1,zi,Ts,Es,ho,Tv,xa,fo,Ev,qr,dr,bv,wv=function(){return Hn||typeof window<"u"&&(Hn=window.gsap)&&Hn.registerPlugin&&Hn},Cv=1,uo=[],pt=[],pr=[],Vl=Date.now,Np=function(e,t){return t},D1=function(){var e=fo.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,pt),r.push.apply(r,pr),pt=n,pr=r,Np=function(a,o){return t[a](o)}},Zr=function(e,t){return~pr.indexOf(e)&&pr[pr.indexOf(e)+1][t]},Wl=function(e){return!!~Ev.indexOf(e)},fi=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},hi=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Fu="scrollLeft",Nu="scrollTop",Op=function(){return qr&&qr.isPressed||pt.cache++},ku=function(e,t){var n=function r(s){if(s||s===0){Cv&&(zi.history.scrollRestoration="manual");var a=qr&&qr.isPressed;s=r.v=Math.round(s)||(qr&&qr.iOS?1:0),e(s),r.cacheID=pt.cache,a&&Np("ss",s)}else(t||pt.cache!==r.cacheID||Np("ref"))&&(r.cacheID=pt.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},jn={s:Fu,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ku(function(i){return arguments.length?zi.scrollTo(i,vn.sc()):zi.pageXOffset||Ts[Fu]||Es[Fu]||ho[Fu]||0})},vn={s:Nu,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:jn,sc:ku(function(i){return arguments.length?zi.scrollTo(jn.sc(),i):zi.pageYOffset||Ts[Nu]||Es[Nu]||ho[Nu]||0})},di=function(e,t){return(t&&t._ctx&&t._ctx.selector||Hn.utils.toArray)(e)[0]||(typeof e=="string"&&Hn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},P1=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Qr=function(e,t){var n=t.s,r=t.sc;Wl(e)&&(e=Ts.scrollingElement||Es);var s=pt.indexOf(e),a=r===vn.sc?1:2;!~s&&(s=pt.push(e)-1),pt[s+a]||fi(e,"scroll",Op);var o=pt[s+a],l=o||(pt[s+a]=ku(Zr(e,n),!0)||(Wl(e)?r:ku(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=Hn.getProperty(e,"scrollBehavior")==="smooth"),l},zu=function(e,t,n){var r=e,s=e,a=Vl(),o=a,l=t||50,c=Math.max(500,l*3),u=function(p,v){var m=Vl();v||m-a>l?(s=r,r=p,o=a,a=m):n?r+=p:r=s+(p-s)/(m-o)*(a-o)},f=function(){s=r=n?0:r,o=a=0},h=function(p){var v=o,m=s,g=Vl();return(p||p===0)&&p!==r&&u(p),a===o||g-o>c?0:(r+(n?m:-m))/((n?g:a)-v)*1e3};return{update:u,reset:f,getVelocity:h}},Gl=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Mv=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Rv=function(){fo=Hn.core.globals().ScrollTrigger,fo&&fo.core&&D1()},Dv=function(e){return Hn=e||wv(),!Ou&&Hn&&typeof document<"u"&&document.body&&(zi=window,Ts=document,Es=Ts.documentElement,ho=Ts.body,Ev=[zi,Ts,Es,ho],R1=Hn.utils.clamp,bv=Hn.core.context||function(){},xa="onpointerenter"in ho?"pointer":"mouse",Tv=hn.isTouch=zi.matchMedia&&zi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in zi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,dr=hn.eventTypes=("ontouchstart"in Es?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Es?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Cv=0},500),Ou=1),fo||Rv(),Ou};jn.op=vn;pt.cache=0;var hn=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){Ou||Dv(Hn)||console.warn("Please gsap.registerPlugin(Observer)"),fo||Rv();var r=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,p=n.wheelSpeed,v=n.event,m=n.onDragStart,g=n.onDragEnd,x=n.onDrag,A=n.onPress,y=n.onRelease,M=n.onRight,E=n.onLeft,T=n.onUp,_=n.onDown,S=n.onChangeX,C=n.onChangeY,R=n.onChange,b=n.onToggleX,P=n.onToggleY,L=n.onHover,F=n.onHoverEnd,N=n.onMove,O=n.ignoreCheck,j=n.isNormalizer,z=n.onGestureStart,I=n.onGestureEnd,ie=n.onWheel,se=n.onEnable,ye=n.onDisable,Re=n.onClick,Y=n.scrollSpeed,W=n.capture,Q=n.allowClicks,re=n.lockAxis,te=n.onLockAxis;this.target=o=di(o)||Es,this.vars=n,d&&(d=Hn.utils.toArray(d)),r=r||1e-9,s=s||0,p=p||1,Y=Y||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(zi.getComputedStyle(ho).lineHeight)||22);var le,fe,Me,oe,De,ke,ve,X=this,k=0,qe=0,Ie=n.passive||!u&&n.passive!==!1,Be=Qr(o,jn),me=Qr(o,vn),U=Be(),w=me(),G=~a.indexOf("touch")&&!~a.indexOf("pointer")&&dr[0]==="pointerdown",ee=Wl(o),$=o.ownerDocument||Ts,K=[0,0,0],Ae=[0,0,0],de=0,Ge=function(){return de=Vl()},Ue=function(Ve,ct){return(X.event=Ve)&&d&&P1(Ve.target,d)||ct&&G&&Ve.pointerType!=="touch"||O&&O(Ve,ct)},ce=function(){X._vx.reset(),X._vy.reset(),fe.pause(),f&&f(X)},he=function(){var Ve=X.deltaX=Mv(K),ct=X.deltaY=Mv(Ae),we=Math.abs(Ve)>=r,tt=Math.abs(ct)>=r;R&&(we||tt)&&R(X,Ve,ct,K,Ae),we&&(M&&X.deltaX>0&&M(X),E&&X.deltaX<0&&E(X),S&&S(X),b&&X.deltaX<0!=k<0&&b(X),k=X.deltaX,K[0]=K[1]=K[2]=0),tt&&(_&&X.deltaY>0&&_(X),T&&X.deltaY<0&&T(X),C&&C(X),P&&X.deltaY<0!=qe<0&&P(X),qe=X.deltaY,Ae[0]=Ae[1]=Ae[2]=0),(oe||Me)&&(N&&N(X),Me&&(m&&Me===1&&m(X),x&&x(X),Me=0),oe=!1),ke&&!(ke=!1)&&te&&te(X),De&&(ie(X),De=!1),le=0},Le=function(Ve,ct,we){K[we]+=Ve,Ae[we]+=ct,X._vx.update(Ve),X._vy.update(ct),c?le||(le=requestAnimationFrame(he)):he()},Ne=function(Ve,ct){re&&!ve&&(X.axis=ve=Math.abs(Ve)>Math.abs(ct)?"x":"y",ke=!0),ve!=="y"&&(K[2]+=Ve,X._vx.update(Ve,!0)),ve!=="x"&&(Ae[2]+=ct,X._vy.update(ct,!0)),c?le||(le=requestAnimationFrame(he)):he()},Te=function(Ve){if(!Ue(Ve,1)){Ve=Gl(Ve,u);var ct=Ve.clientX,we=Ve.clientY,tt=ct-X.x,Ze=we-X.y,nt=X.isDragging;X.x=ct,X.y=we,(nt||(tt||Ze)&&(Math.abs(X.startX-ct)>=s||Math.abs(X.startY-we)>=s))&&(Me||(Me=nt?2:1),nt||(X.isDragging=!0),Ne(tt,Ze))}},et=X.onPress=function(Pe){Ue(Pe,1)||Pe&&Pe.button||(X.axis=ve=null,fe.pause(),X.isPressed=!0,Pe=Gl(Pe),k=qe=0,X.startX=X.x=Pe.clientX,X.startY=X.y=Pe.clientY,X._vx.reset(),X._vy.reset(),fi(j?o:$,dr[1],Te,Ie,!0),X.deltaX=X.deltaY=0,A&&A(X))},H=X.onRelease=function(Pe){if(!Ue(Pe,1)){hi(j?o:$,dr[1],Te,!0);var Ve=!isNaN(X.y-X.startY),ct=X.isDragging,we=ct&&(Math.abs(X.x-X.startX)>3||Math.abs(X.y-X.startY)>3),tt=Gl(Pe);!we&&Ve&&(X._vx.reset(),X._vy.reset(),u&&Q&&Hn.delayedCall(.08,function(){if(Vl()-de>300&&!Pe.defaultPrevented){if(Pe.target.click)Pe.target.click();else if($.createEvent){var Ze=$.createEvent("MouseEvents");Ze.initMouseEvent("click",!0,!0,zi,1,tt.screenX,tt.screenY,tt.clientX,tt.clientY,!1,!1,!1,!1,0,null),Pe.target.dispatchEvent(Ze)}}})),X.isDragging=X.isGesturing=X.isPressed=!1,f&&ct&&!j&&fe.restart(!0),Me&&he(),g&&ct&&g(X),y&&y(X,we)}},pe=function(Ve){return Ve.touches&&Ve.touches.length>1&&(X.isGesturing=!0)&&z(Ve,X.isDragging)},ue=function(){return(X.isGesturing=!1)||I(X)},Ee=function(Ve){if(!Ue(Ve)){var ct=Be(),we=me();Le((ct-U)*Y,(we-w)*Y,1),U=ct,w=we,f&&fe.restart(!0)}},ae=function(Ve){if(!Ue(Ve)){Ve=Gl(Ve,u),ie&&(De=!0);var ct=(Ve.deltaMode===1?l:Ve.deltaMode===2?zi.innerHeight:1)*p;Le(Ve.deltaX*ct,Ve.deltaY*ct,0),f&&!j&&fe.restart(!0)}},ne=function(Ve){if(!Ue(Ve)){var ct=Ve.clientX,we=Ve.clientY,tt=ct-X.x,Ze=we-X.y;X.x=ct,X.y=we,oe=!0,f&&fe.restart(!0),(tt||Ze)&&Ne(tt,Ze)}},Fe=function(Ve){X.event=Ve,L(X)},Qe=function(Ve){X.event=Ve,F(X)},Tt=function(Ve){return Ue(Ve)||Gl(Ve,u)&&Re(X)};fe=X._dc=Hn.delayedCall(h||.25,ce).pause(),X.deltaX=X.deltaY=0,X._vx=zu(0,50,!0),X._vy=zu(0,50,!0),X.scrollX=Be,X.scrollY=me,X.isDragging=X.isGesturing=X.isPressed=!1,bv(this),X.enable=function(Pe){return X.isEnabled||(fi(ee?$:o,"scroll",Op),a.indexOf("scroll")>=0&&fi(ee?$:o,"scroll",Ee,Ie,W),a.indexOf("wheel")>=0&&fi(o,"wheel",ae,Ie,W),(a.indexOf("touch")>=0&&Tv||a.indexOf("pointer")>=0)&&(fi(o,dr[0],et,Ie,W),fi($,dr[2],H),fi($,dr[3],H),Q&&fi(o,"click",Ge,!0,!0),Re&&fi(o,"click",Tt),z&&fi($,"gesturestart",pe),I&&fi($,"gestureend",ue),L&&fi(o,xa+"enter",Fe),F&&fi(o,xa+"leave",Qe),N&&fi(o,xa+"move",ne)),X.isEnabled=!0,X.isDragging=X.isGesturing=X.isPressed=oe=Me=!1,X._vx.reset(),X._vy.reset(),U=Be(),w=me(),Pe&&Pe.type&&et(Pe),se&&se(X)),X},X.disable=function(){X.isEnabled&&(uo.filter(function(Pe){return Pe!==X&&Wl(Pe.target)}).length||hi(ee?$:o,"scroll",Op),X.isPressed&&(X._vx.reset(),X._vy.reset(),hi(j?o:$,dr[1],Te,!0)),hi(ee?$:o,"scroll",Ee,W),hi(o,"wheel",ae,W),hi(o,dr[0],et,W),hi($,dr[2],H),hi($,dr[3],H),hi(o,"click",Ge,!0),hi(o,"click",Tt),hi($,"gesturestart",pe),hi($,"gestureend",ue),hi(o,xa+"enter",Fe),hi(o,xa+"leave",Qe),hi(o,xa+"move",ne),X.isEnabled=X.isPressed=X.isDragging=!1,ye&&ye(X))},X.kill=X.revert=function(){X.disable();var Pe=uo.indexOf(X);Pe>=0&&uo.splice(Pe,1),qr===X&&(qr=0)},uo.push(X),j&&Wl(o)&&(qr=X),X.enable(v)},C1(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();hn.version="3.15.0";hn.create=function(i){return new hn(i)};hn.register=Dv;hn.getAll=function(){return uo.slice()};hn.getById=function(i){return uo.filter(function(e){return e.vars.id===i})[0]};wv()&&Hn.registerPlugin(hn);var He,vo,gt,kt,Vi,Bt,jp,nh,rc,Jl,Yl,Hu,$n,sh,Xp,mi,Pv,Iv,xo,Qv,kp,Zv,pi,Yp,Kv,Jv,bs,qp,$p,_o,em,jl,Qp,zp,Gu=1,ei=Date.now,Hp=ei(),ir=0,ql=0,Bv=function(e,t,n){var r=Gi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},Uv=function(e,t){return t&&(!Gi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},I1=function i(){return ql&&requestAnimationFrame(i)},Lv=function(){return sh=1},Fv=function(){return sh=0},Pr=function(e){return e},Ql=function(e){return Math.round(e*1e5)/1e5||0},jv=function(){return typeof window<"u"},$v=function(){return He||jv()&&(He=window.gsap)&&He.registerPlugin&&He},Ta=function(e){return!!~jp.indexOf(e)},ex=function(e){return(e==="Height"?em:gt["inner"+e])||Vi["client"+e]||Bt["client"+e]},tx=function(e){return Zr(e,"getBoundingClientRect")||(Ta(e)?function(){return th.width=gt.innerWidth,th.height=em,th}:function(){return Kr(e)})},B1=function(e,t,n){var r=n.d,s=n.d2,a=n.a;return(a=Zr(e,"getBoundingClientRect"))?function(){return a()[r]}:function(){return(t?ex(s):e["client"+s])||0}},U1=function(e,t){return!t||~pr.indexOf(e)?tx(e):function(){return th}},Ir=function(e,t){var n=t.s,r=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+r)&&(a=Zr(e,n))?a()-tx(e)()[s]:Ta(e)?(Vi[n]||Bt[n])-ex(r):e[n]-e["offset"+r])},Vu=function(e,t){for(var n=0;n<xo.length;n+=3)(!t||~t.indexOf(xo[n+1]))&&e(xo[n],xo[n+1],xo[n+2])},Gi=function(e){return typeof e=="string"},ti=function(e){return typeof e=="function"},Zl=function(e){return typeof e=="number"},_a=function(e){return typeof e=="object"},Xl=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},po=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},mo=Math.abs,nx="left",ix="top",tm="right",nm="bottom",Aa="width",Sa="height",$l="Right",ec="Left",tc="Top",nc="Bottom",xn="padding",tr="margin",Ao="Width",im="Height",Cn="px",nr=function(e){return gt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},L1=function(e){var t=nr(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Nv=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Kr=function(e,t){var n=t&&nr(e)[Xp]!=="matrix(1, 0, 0, 1, 0, 0)"&&He.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},ih=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},rx=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},F1=function(e){return function(t){return He.utils.snap(rx(e),t)}},rm=function(e){var t=He.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,a){a===void 0&&(a=.001);var o;if(!s)return t(r);if(s>0){for(r-=a,o=0;o<n.length;o++)if(n[o]>=r)return n[o];return n[o-1]}else for(o=n.length,r+=a;o--;)if(n[o]<=r)return n[o];return n[0]}:function(r,s,a){a===void 0&&(a=.001);var o=t(r);return!s||Math.abs(o-r)<a||o-r<0==s<0?o:t(s<0?r-e:r+e)}},N1=function(e){return function(t,n){return rm(rx(e))(t,n.direction)}},Wu=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},Ln=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},Un=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Xu=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Ov={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Yu={toggleActions:"play",anticipatePin:0},rh={top:0,left:0,center:.5,bottom:1,right:1},Ju=function(e,t){if(Gi(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in rh?rh[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},qu=function(e,t,n,r,s,a,o,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,p=kt.createElement("div"),v=Ta(n)||Zr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,g=v?Bt:n.tagName==="IFRAME"?n.contentDocument.body:n,x=e.indexOf("start")!==-1,A=x?c:u,y="border-color:"+A+";font-size:"+f+";color:"+A+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((m||l)&&v?"fixed;":"absolute;"),(m||l||!v)&&(y+=(r===vn?tm:nm)+":"+(a+parseFloat(h))+"px;"),o&&(y+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),p._isStart=x,p.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),p.style.cssText=y,p.innerText=t||t===0?e+"-"+t:e,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p["offset"+r.op.d2],ju(p,0,r,x),p},ju=function(e,t,n,r){var s={display:"block"},a=n[r?"os2":"p2"],o=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+a+Ao]=1,s["border"+o+Ao]=0,s[n.p]=t+"px",He.set(e,s)},mt=[],Zp={},sc,kv=function(){return ei()-ir>34&&(sc||(sc=requestAnimationFrame(Jr)))},go=function(){(!pi||!pi.isPressed||pi.startX>Bt.clientWidth)&&(pt.cache++,pi?sc||(sc=requestAnimationFrame(Jr)):Jr(),ir||ba("scrollStart"),ir=ei())},Gp=function(){Jv=gt.innerWidth,Kv=gt.innerHeight},Kl=function(e){pt.cache++,(e===!0||!$n&&!Zv&&!kt.fullscreenElement&&!kt.webkitFullscreenElement&&(!Yp||Jv!==gt.innerWidth||Math.abs(gt.innerHeight-Kv)>gt.innerHeight*.25))&&nh.restart(!0)},Ea={},O1=[],sx=function i(){return Un(lt,"scrollEnd",i)||ya(!0)},ba=function(e){return Ea[e]&&Ea[e].map(function(t){return t()})||O1},Hi=[],ax=function(e){for(var t=0;t<Hi.length;t+=5)(!e||Hi[t+4]&&Hi[t+4].query===e)&&(Hi[t].style.cssText=Hi[t+1],Hi[t].getBBox&&Hi[t].setAttribute("transform",Hi[t+2]||""),Hi[t+3].uncache=1)},ox=function(){return pt.forEach(function(e){return ti(e)&&++e.cacheID&&(e.rec=e())})},sm=function(e,t){var n;for(mi=0;mi<mt.length;mi++)n=mt[mi],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));jl=!0,t&&ax(t),t||ba("revert")},lx=function(e,t){pt.cache++,(t||!gi)&&pt.forEach(function(n){return ti(n)&&n.cacheID++&&(n.rec=0)}),Gi(e)&&(gt.history.scrollRestoration=$p=e)},gi,Ma=0,zv,k1=function(){if(zv!==Ma){var e=zv=Ma;requestAnimationFrame(function(){return e===Ma&&ya(!0)})}},cx=function(){Bt.appendChild(_o),em=!pi&&_o.offsetHeight||gt.innerHeight,Bt.removeChild(_o)},Hv=function(e){return rc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},ya=function(e,t){if(Vi=kt.documentElement,Bt=kt.body,jp=[gt,kt,Vi,Bt],ir&&!e&&!jl){Ln(lt,"scrollEnd",sx);return}cx(),gi=lt.isRefreshing=!0,jl||ox();var n=ba("refreshInit");Qv&&lt.sort(),t||sm(),pt.forEach(function(r){ti(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),mt.slice(0).forEach(function(r){return r.refresh()}),jl=!1,mt.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",a=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-a),r.refresh()}}),Qp=1,Hv(!0),mt.forEach(function(r){var s=Ir(r.scroller,r._dir),a=r.vars.end==="max"||r._endClamp&&r.end>s,o=r._startClamp&&r.start>=s;(a||o)&&r.setPositions(o?s-1:r.start,a?Math.max(o?s:r.start+1,s):r.end,!0)}),Hv(!1),Qp=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),pt.forEach(function(r){ti(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),lx($p,1),nh.pause(),Ma++,gi=2,Jr(2),mt.forEach(function(r){return ti(r.vars.onRefresh)&&r.vars.onRefresh(r)}),gi=lt.isRefreshing=!1,ba("refresh")},Kp=0,$u=1,ic,Jr=function(e){if(e===2||!gi&&!jl){lt.isUpdating=!0,ic&&ic.update(0);var t=mt.length,n=ei(),r=n-Hp>=50,s=t&&mt[0].scroll();if($u=Kp>s?-1:1,gi||(Kp=s),r&&(ir&&!sh&&n-ir>200&&(ir=0,ba("scrollEnd")),Yl=Hp,Hp=n),$u<0){for(mi=t;mi-- >0;)mt[mi]&&mt[mi].update(0,r);$u=1}else for(mi=0;mi<t;mi++)mt[mi]&&mt[mi].update(0,r);lt.isUpdating=!1}sc=0},Jp=[nx,ix,nm,tm,tr+nc,tr+$l,tr+tc,tr+ec,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],eh=Jp.concat([Aa,Sa,"boxSizing","max"+Ao,"max"+im,"position",tr,xn,xn+tc,xn+$l,xn+nc,xn+ec]),z1=function(e,t,n){yo(n);var r=e._gsap;if(r.spacerIsNative)yo(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Vp=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Jp.length,a=t.style,o=e.style,l;s--;)l=Jp[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[nm]=o[tm]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Aa]=ih(e,jn)+Cn,a[Sa]=ih(e,vn)+Cn,a[xn]=o[tr]=o[ix]=o[nx]="0",yo(r),o[Aa]=o["max"+Ao]=n[Aa],o[Sa]=o["max"+im]=n[Sa],o[xn]=n[xn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},H1=/([A-Z])/g,yo=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,a;for((e.t._gsap||He.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],s=e[r],a?t[s]=a:t[s]&&t.removeProperty(s.replace(H1,"-$1").toLowerCase())}},Qu=function(e){for(var t=eh.length,n=e.style,r=[],s=0;s<t;s++)r.push(eh[s],n[eh[s]]);return r.t=e,r},G1=function(e,t,n){for(var r=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},th={left:0,top:0},Gv=function(e,t,n,r,s,a,o,l,c,u,f,h,d,p){ti(e)&&(e=e(l)),Gi(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?Ju("0"+e.substr(3),n):0));var v=d?d.time():0,m,g,x;if(d&&d.seek(0),isNaN(e)||(e=+e),Zl(e))d&&(e=He.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),o&&ju(o,n,r,!0);else{ti(t)&&(t=t(l));var A=(e||"0").split(" "),y,M,E,T;x=di(t,l)||Bt,y=Kr(x)||{},(!y||!y.left&&!y.top)&&nr(x).display==="none"&&(T=x.style.display,x.style.display="block",y=Kr(x),T?x.style.display=T:x.style.removeProperty("display")),M=Ju(A[0],y[r.d]),E=Ju(A[1]||"0",n),e=y[r.p]-c[r.p]-u+M+s-E,o&&ju(o,E,r,n-E<20||o._isStart&&E>20),n-=n-E}if(p&&(l[p]=e||-.001,e<0&&(e=0)),a){var _=e+n,S=a._isStart;m="scroll"+r.d2,ju(a,_,r,S&&_>20||!S&&(f?Math.max(Bt[m],Vi[m]):a.parentNode[m])<=_+1),f&&(c=Kr(o),f&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+Cn))}return d&&x&&(m=Kr(x),d.seek(h),g=Kr(x),d._caScrollDist=m[r.p]-g[r.p],e=e/d._caScrollDist*h),d&&d.seek(v),d?e:Math.round(e)},V1=/(webkit|moz|length|cssText|inset)/i,Vv=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,a,o;if(t===Bt){e._stOrig=s.cssText,o=nr(e);for(a in o)!+a&&!V1.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=r}else s.cssText=e._stOrig;He.core.getCache(e).uncache=1,t.appendChild(e)}},ux=function(e,t,n){var r=t,s=r;return function(a){var o=Math.round(e());return o!==r&&o!==s&&Math.abs(o-r)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=r,r=Math.round(a),r}},Zu=function(e,t,n){var r={};r[t.p]="+="+n,He.set(e,r)},Wv=function(e,t){var n=Qr(e,t),r="_scroll"+t.p2,s=function a(o,l,c,u,f){var h=a.tween,d=l.onComplete,p={};c=c||n();var v=ux(n,c,function(){h.kill(),a.tween=0});return f=u&&f||0,u=u||o-c,h&&h.kill(),l[r]=o,l.inherit=!1,l.modifiers=p,p[r]=function(){return v(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){pt.cache++,a.tween&&Jr()},l.onComplete=function(){a.tween=0,d&&d.call(h)},h=a.tween=He.to(e,l),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Ln(e,"wheel",n.wheelHandler),lt.isTouch&&Ln(e,"touchmove",n.wheelHandler),s},lt=function(){function i(t,n){vo||i.register(He)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),qp(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ql){this.update=this.refresh=this.kill=Pr;return}n=Nv(Gi(n)||Zl(n)||n.nodeType?{trigger:n}:n,Yu);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,p=s.pinSpacing,v=s.invalidateOnRefresh,m=s.anticipatePin,g=s.onScrubComplete,x=s.onSnapComplete,A=s.once,y=s.snap,M=s.pinReparent,E=s.pinSpacer,T=s.containerAnimation,_=s.fastScrollEnd,S=s.preventOverlaps,C=n.horizontal||n.containerAnimation&&n.horizontal!==!1?jn:vn,R=!f&&f!==0,b=di(n.scroller||gt),P=He.core.getCache(b),L=Ta(b),F=("pinType"in n?n.pinType:Zr(b,"pinType")||L&&"fixed")==="fixed",N=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],O=R&&n.toggleActions.split(" "),j="markers"in n?n.markers:Yu.markers,z=L?0:parseFloat(nr(b)["border"+C.p2+Ao])||0,I=this,ie=n.onRefreshInit&&function(){return n.onRefreshInit(I)},se=B1(b,L,C),ye=U1(b,L),Re=0,Y=0,W=0,Q=Qr(b,C),re,te,le,fe,Me,oe,De,ke,ve,X,k,qe,Ie,Be,me,U,w,G,ee,$,K,Ae,de,Ge,Ue,ce,he,Le,Ne,Te,et,H,pe,ue,Ee,ae,ne,Fe,Qe;if(I._startClamp=I._endClamp=!1,I._dir=C,m*=45,I.scroller=b,I.scroll=T?T.time.bind(T):Q,fe=Q(),I.vars=n,r=r||n.animation,"refreshPriority"in n&&(Qv=1,n.refreshPriority===-9999&&(ic=I)),P.tweenScroll=P.tweenScroll||{top:Wv(b,vn),left:Wv(b,jn)},I.tweenTo=re=P.tweenScroll[C.p],I.scrubDuration=function(we){pe=Zl(we)&&we,pe?H?H.duration(we):H=He.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:pe,paused:!0,onComplete:function(){return g&&g(I)}}):(H&&H.progress(1).kill(),H=0)},r&&(r.vars.lazy=!1,r._initted&&!I.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),I.animation=r.pause(),r.scrollTrigger=I,I.scrubDuration(f),Te=0,l||(l=r.vars.id)),y&&((!_a(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in Bt.style&&He.set(L?[Bt,Vi]:b,{scrollBehavior:"auto"}),pt.forEach(function(we){return ti(we)&&we.target===(L?kt.scrollingElement||Vi:b)&&(we.smooth=!1)}),le=ti(y.snapTo)?y.snapTo:y.snapTo==="labels"?F1(r):y.snapTo==="labelsDirectional"?N1(r):y.directional!==!1?function(we,tt){return rm(y.snapTo)(we,ei()-Y<500?0:tt.direction)}:He.utils.snap(y.snapTo),ue=y.duration||{min:.1,max:2},ue=_a(ue)?Jl(ue.min,ue.max):Jl(ue,ue),Ee=He.delayedCall(y.delay||pe/2||.1,function(){var we=Q(),tt=ei()-Y<500,Ze=re.tween;if((tt||Math.abs(I.getVelocity())<10)&&!Ze&&!sh&&Re!==we){var nt=(we-oe)/Be,dn=r&&!R?r.totalProgress():nt,at=tt?0:(dn-et)/(ei()-Yl)*1e3||0,Jt=He.utils.clamp(-nt,1-nt,mo(at/2)*at/.185),Tn=nt+(y.inertia===!1?0:Jt),jt,Ot,It=y,Yn=It.onStart,Zt=It.onInterrupt,qn=It.onComplete;if(jt=le(Tn,I),Zl(jt)||(jt=Tn),Ot=Math.max(0,Math.round(oe+jt*Be)),we<=De&&we>=oe&&Ot!==we){if(Ze&&!Ze._initted&&Ze.data<=mo(Ot-we))return;y.inertia===!1&&(Jt=jt-nt),re(Ot,{duration:ue(mo(Math.max(mo(Tn-dn),mo(jt-dn))*.185/at/.05||0)),ease:y.ease||"power3",data:mo(Ot-we),onInterrupt:function(){return Ee.restart(!0)&&Zt&&po(I,Zt)},onComplete:function(){I.update(),Re=Q(),r&&!R&&(H?H.resetTo("totalProgress",jt,r._tTime/r._tDur):r.progress(jt)),Te=et=r&&!R?r.totalProgress():I.progress,x&&x(I),qn&&po(I,qn)}},we,Jt*Be,Ot-we-Jt*Be),Yn&&po(I,Yn,re.tween)}}else I.isActive&&Re!==we&&Ee.restart(!0)}).pause()),l&&(Zp[l]=I),h=I.trigger=di(h||d!==!0&&d),Qe=h&&h._gsap&&h._gsap.stRevert,Qe&&(Qe=Qe(I)),d=d===!0?h:di(d),Gi(o)&&(o={targets:h,className:o}),d&&(p===!1||p===tr||(p=!p&&d.parentNode&&d.parentNode.style&&nr(d.parentNode).display==="flex"?!1:xn),I.pin=d,te=He.core.getCache(d),te.spacer?me=te.pinState:(E&&(E=di(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),te.spacerIsNative=!!E,E&&(te.spacerState=Qu(E))),te.spacer=G=E||kt.createElement("div"),G.classList.add("pin-spacer"),l&&G.classList.add("pin-spacer-"+l),te.pinState=me=Qu(d)),n.force3D!==!1&&He.set(d,{force3D:!0}),I.spacer=G=te.spacer,Ne=nr(d),Ge=Ne[p+C.os2],$=He.getProperty(d),K=He.quickSetter(d,C.a,Cn),Vp(d,G,Ne),w=Qu(d)),j){qe=_a(j)?Nv(j,Ov):Ov,X=qu("scroller-start",l,b,C,qe,0),k=qu("scroller-end",l,b,C,qe,0,X),ee=X["offset"+C.op.d2];var Tt=di(Zr(b,"content")||b);ke=this.markerStart=qu("start",l,Tt,C,qe,ee,0,T),ve=this.markerEnd=qu("end",l,Tt,C,qe,ee,0,T),T&&(Fe=He.quickSetter([ke,ve],C.a,Cn)),!F&&!(pr.length&&Zr(b,"fixedMarkers")===!0)&&(L1(L?Bt:b),He.set([X,k],{force3D:!0}),ce=He.quickSetter(X,C.a,Cn),Le=He.quickSetter(k,C.a,Cn))}if(T){var Pe=T.vars.onUpdate,Ve=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){I.update(0,0,1),Pe&&Pe.apply(T,Ve||[])})}if(I.previous=function(){return mt[mt.indexOf(I)-1]},I.next=function(){return mt[mt.indexOf(I)+1]},I.revert=function(we,tt){if(!tt)return I.kill(!0);var Ze=we!==!1||!I.enabled,nt=$n;Ze!==I.isReverted&&(Ze&&(ae=Math.max(Q(),I.scroll.rec||0),W=I.progress,ne=r&&r.progress()),ke&&[ke,ve,X,k].forEach(function(dn){return dn.style.display=Ze?"none":"block"}),Ze&&($n=I,I.update(Ze)),d&&(!M||!I.isActive)&&(Ze?z1(d,G,me):Vp(d,G,nr(d),Ue)),Ze||I.update(Ze),$n=nt,I.isReverted=Ze)},I.refresh=function(we,tt,Ze,nt){if(!(($n||!I.enabled)&&!tt)){if(d&&we&&ir){Ln(i,"scrollEnd",sx);return}!gi&&ie&&ie(I),$n=I,re.tween&&!Ze&&(re.tween.kill(),re.tween=0),H&&H.pause(),v&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(Oe){return Oe.vars.immediateRender&&Oe.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),I.isReverted||I.revert(!0,!0),I._subPinOffset=!1;var dn=se(),at=ye(),Jt=T?T.duration():Ir(b,C),Tn=Be<=.01||!Be,jt=0,Ot=nt||0,It=_a(Ze)?Ze.end:n.end,Yn=n.endTrigger||h,Zt=_a(Ze)?Ze.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),qn=I.pinnedContainer=n.pinnedContainer&&di(n.pinnedContainer,I),Ji=h&&Math.max(0,mt.indexOf(I))||0,En=Ji,bn,In,Hr,Ja,D,V,J,Z,q,xe,be,_e,ze;for(j&&_a(Ze)&&(_e=He.getProperty(X,C.p),ze=He.getProperty(k,C.p));En-- >0;)V=mt[En],V.end||V.refresh(0,1)||($n=I),J=V.pin,J&&(J===h||J===d||J===qn)&&!V.isReverted&&(xe||(xe=[]),xe.unshift(V),V.revert(!0,!0)),V!==mt[En]&&(Ji--,En--);for(ti(Zt)&&(Zt=Zt(I)),Zt=Bv(Zt,"start",I),oe=Gv(Zt,h,dn,C,Q(),ke,X,I,at,z,F,Jt,T,I._startClamp&&"_startClamp")||(d?-.001:0),ti(It)&&(It=It(I)),Gi(It)&&!It.indexOf("+=")&&(~It.indexOf(" ")?It=(Gi(Zt)?Zt.split(" ")[0]:"")+It:(jt=Ju(It.substr(2),dn),It=Gi(Zt)?Zt:(T?He.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,oe):oe)+jt,Yn=h)),It=Bv(It,"end",I),De=Math.max(oe,Gv(It||(Yn?"100% 0":Jt),Yn,dn,C,Q()+jt,ve,k,I,at,z,F,Jt,T,I._endClamp&&"_endClamp"))||-.001,jt=0,En=Ji;En--;)V=mt[En]||{},J=V.pin,J&&V.start-V._pinPush<=oe&&!T&&V.end>0&&(bn=V.end-(I._startClamp?Math.max(0,V.start):V.start),(J===h&&V.start-V._pinPush<oe||J===qn)&&isNaN(Zt)&&(jt+=bn*(1-V.progress)),J===d&&(Ot+=bn));if(oe+=jt,De+=jt,I._startClamp&&(I._startClamp+=jt),I._endClamp&&!gi&&(I._endClamp=De||-.001,De=Math.min(De,Ir(b,C))),Be=De-oe||(oe-=.01)&&.001,Tn&&(W=He.utils.clamp(0,1,He.utils.normalize(oe,De,ae))),I._pinPush=Ot,ke&&jt&&(bn={},bn[C.a]="+="+jt,qn&&(bn[C.p]="-="+Q()),He.set([ke,ve],bn)),d&&!(Qp&&I.end>=Ir(b,C)))bn=nr(d),Ja=C===vn,Hr=Q(),Ae=parseFloat($(C.a))+Ot,!Jt&&De>1&&(be=(L?kt.scrollingElement||Vi:b).style,be={style:be,value:be["overflow"+C.a.toUpperCase()]},L&&nr(Bt)["overflow"+C.a.toUpperCase()]!=="scroll"&&(be.style["overflow"+C.a.toUpperCase()]="scroll")),Vp(d,G,bn),w=Qu(d),In=Kr(d,!0),Z=F&&Qr(b,Ja?jn:vn)(),p?(Ue=[p+C.os2,Be+Ot+Cn],Ue.t=G,En=p===xn?ih(d,C)+Be+Ot:0,En&&(Ue.push(C.d,En+Cn),G.style.flexBasis!=="auto"&&(G.style.flexBasis=En+Cn)),yo(Ue),qn&&mt.forEach(function(Oe){Oe.pin===qn&&Oe.vars.pinSpacing!==!1&&(Oe._subPinOffset=!0)}),F&&Q(ae)):(En=ih(d,C),En&&G.style.flexBasis!=="auto"&&(G.style.flexBasis=En+Cn)),F&&(D={top:In.top+(Ja?Hr-oe:Z)+Cn,left:In.left+(Ja?Z:Hr-oe)+Cn,boxSizing:"border-box",position:"fixed"},D[Aa]=D["max"+Ao]=Math.ceil(In.width)+Cn,D[Sa]=D["max"+im]=Math.ceil(In.height)+Cn,D[tr]=D[tr+tc]=D[tr+$l]=D[tr+nc]=D[tr+ec]="0",D[xn]=bn[xn],D[xn+tc]=bn[xn+tc],D[xn+$l]=bn[xn+$l],D[xn+nc]=bn[xn+nc],D[xn+ec]=bn[xn+ec],U=G1(me,D,M),gi&&Q(0)),r?(q=r._initted,kp(1),r.render(r.duration(),!0,!0),de=$(C.a)-Ae+Be+Ot,he=Math.abs(Be-de)>1,F&&he&&U.splice(U.length-2,2),r.render(0,!0,!0),q||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),kp(0)):de=Be,be&&(be.value?be.style["overflow"+C.a.toUpperCase()]=be.value:be.style.removeProperty("overflow-"+C.a));else if(h&&Q()&&!T)for(In=h.parentNode;In&&In!==Bt;)In._pinOffset&&(oe-=In._pinOffset,De-=In._pinOffset),In=In.parentNode;xe&&xe.forEach(function(Oe){return Oe.revert(!1,!0)}),I.start=oe,I.end=De,fe=Me=gi?ae:Q(),!T&&!gi&&(fe<ae&&Q(ae),I.scroll.rec=0),I.revert(!1,!0),Y=ei(),Ee&&(Re=-1,Ee.restart(!0)),$n=0,r&&R&&(r._initted||ne)&&r.progress()!==ne&&r.progress(ne||0,!0).render(r.time(),!0,!0),(Tn||W!==I.progress||T||v||r&&!r._initted)&&(r&&!R&&(r._initted||W||r.vars.immediateRender!==!1)&&r.totalProgress(T&&oe<-.001&&!W?He.utils.normalize(oe,De,0):W,!0),I.progress=Tn||(fe-oe)/Be===W?0:W),d&&p&&(G._pinOffset=Math.round(I.progress*de)),H&&H.invalidate(),isNaN(_e)||(_e-=He.getProperty(X,C.p),ze-=He.getProperty(k,C.p),Zu(X,C,_e),Zu(ke,C,_e-(nt||0)),Zu(k,C,ze),Zu(ve,C,ze-(nt||0))),Tn&&!gi&&I.update(),u&&!gi&&!Ie&&(Ie=!0,u(I),Ie=!1)}},I.getVelocity=function(){return(Q()-Me)/(ei()-Yl)*1e3||0},I.endAnimation=function(){Xl(I.callbackAnimation),r&&(H?H.progress(1):r.paused()?R||Xl(r,I.direction<0,1):Xl(r,r.reversed()))},I.labelToScroll=function(we){return r&&r.labels&&(oe||I.refresh()||oe)+r.labels[we]/r.duration()*Be||0},I.getTrailing=function(we){var tt=mt.indexOf(I),Ze=I.direction>0?mt.slice(0,tt).reverse():mt.slice(tt+1);return(Gi(we)?Ze.filter(function(nt){return nt.vars.preventOverlaps===we}):Ze).filter(function(nt){return I.direction>0?nt.end<=oe:nt.start>=De})},I.update=function(we,tt,Ze){if(!(T&&!Ze&&!we)){var nt=gi===!0?ae:I.scroll(),dn=we?0:(nt-oe)/Be,at=dn<0?0:dn>1?1:dn||0,Jt=I.progress,Tn,jt,Ot,It,Yn,Zt,qn,Ji;if(tt&&(Me=fe,fe=T?Q():nt,y&&(et=Te,Te=r&&!R?r.totalProgress():at)),m&&d&&!$n&&!Gu&&ir&&(!at&&oe<nt+(nt-Me)/(ei()-Yl)*m?at=1e-4:at===1&&De>nt+(nt-Me)/(ei()-Yl)*m&&(at=.9999)),at!==Jt&&I.enabled){if(Tn=I.isActive=!!at&&at<1,jt=!!Jt&&Jt<1,Zt=Tn!==jt,Yn=Zt||!!at!=!!Jt,I.direction=at>Jt?1:-1,I.progress=at,Yn&&!$n&&(Ot=at&&!Jt?0:at===1?1:Jt===1?2:3,R&&(It=!Zt&&O[Ot+1]!=="none"&&O[Ot+1]||O[Ot],Ji=r&&(It==="complete"||It==="reset"||It in r))),S&&(Zt||Ji)&&(Ji||f||!r)&&(ti(S)?S(I):I.getTrailing(S).forEach(function(Hr){return Hr.endAnimation()})),R||(H&&!$n&&!Gu?(H._dp._time-H._start!==H._time&&H.render(H._dp._time-H._start),H.resetTo?H.resetTo("totalProgress",at,r._tTime/r._tDur):(H.vars.totalProgress=at,H.invalidate().restart())):r&&r.totalProgress(at,!!($n&&(Y||we)))),d){if(we&&p&&(G.style[p+C.os2]=Ge),!F)K(Ql(Ae+de*at));else if(Yn){if(qn=!we&&at>Jt&&De+1>nt&&nt+1>=Ir(b,C),M)if(!we&&(Tn||qn)){var En=Kr(d,!0),bn=nt-oe;Vv(d,Bt,En.top+(C===vn?bn:0)+Cn,En.left+(C===vn?0:bn)+Cn)}else Vv(d,G);yo(Tn||qn?U:w),he&&at<1&&Tn||K(Ae+(at===1&&!qn?de:0))}}y&&!re.tween&&!$n&&!Gu&&Ee.restart(!0),o&&(Zt||A&&at&&(at<1||!zp))&&rc(o.targets).forEach(function(Hr){return Hr.classList[Tn||A?"add":"remove"](o.className)}),a&&!R&&!we&&a(I),Yn&&!$n?(R&&(Ji&&(It==="complete"?r.pause().totalProgress(1):It==="reset"?r.restart(!0).pause():It==="restart"?r.restart(!0):r[It]()),a&&a(I)),(Zt||!zp)&&(c&&Zt&&po(I,c),N[Ot]&&po(I,N[Ot]),A&&(at===1?I.kill(!1,1):N[Ot]=0),Zt||(Ot=at===1?1:3,N[Ot]&&po(I,N[Ot]))),_&&!Tn&&Math.abs(I.getVelocity())>(Zl(_)?_:2500)&&(Xl(I.callbackAnimation),H?H.progress(1):Xl(r,It==="reverse"?1:!at,1))):R&&a&&!$n&&a(I)}if(Le){var In=T?nt/T.duration()*(T._caScrollDist||0):nt;ce(In+(X._isFlipped?1:0)),Le(In)}Fe&&Fe(-nt/T.duration()*(T._caScrollDist||0))}},I.enable=function(we,tt){I.enabled||(I.enabled=!0,Ln(b,"resize",Kl),L||Ln(b,"scroll",go),ie&&Ln(i,"refreshInit",ie),we!==!1&&(I.progress=W=0,fe=Me=Re=Q()),tt!==!1&&I.refresh())},I.getTween=function(we){return we&&re?re.tween:H},I.setPositions=function(we,tt,Ze,nt){if(T){var dn=T.scrollTrigger,at=T.duration(),Jt=dn.end-dn.start;we=dn.start+Jt*we/at,tt=dn.start+Jt*tt/at}I.refresh(!1,!1,{start:Uv(we,Ze&&!!I._startClamp),end:Uv(tt,Ze&&!!I._endClamp)},nt),I.update()},I.adjustPinSpacing=function(we){if(Ue&&we){var tt=Ue.indexOf(C.d)+1;Ue[tt]=parseFloat(Ue[tt])+we+Cn,Ue[1]=parseFloat(Ue[1])+we+Cn,yo(Ue)}},I.disable=function(we,tt){if(we!==!1&&I.revert(!0,!0),I.enabled&&(I.enabled=I.isActive=!1,tt||H&&H.pause(),ae=0,te&&(te.uncache=1),ie&&Un(i,"refreshInit",ie),Ee&&(Ee.pause(),re.tween&&re.tween.kill()&&(re.tween=0)),!L)){for(var Ze=mt.length;Ze--;)if(mt[Ze].scroller===b&&mt[Ze]!==I)return;Un(b,"resize",Kl),L||Un(b,"scroll",go)}},I.kill=function(we,tt){I.disable(we,tt),H&&!tt&&H.kill(),l&&delete Zp[l];var Ze=mt.indexOf(I);Ze>=0&&mt.splice(Ze,1),Ze===mi&&$u>0&&mi--,Ze=0,mt.forEach(function(nt){return nt.scroller===I.scroller&&(Ze=1)}),Ze||gi||(I.scroll.rec=0),r&&(r.scrollTrigger=null,we&&r.revert({kill:!1}),tt||r.kill()),ke&&[ke,ve,X,k].forEach(function(nt){return nt.parentNode&&nt.parentNode.removeChild(nt)}),ic===I&&(ic=0),d&&(te&&(te.uncache=1),Ze=0,mt.forEach(function(nt){return nt.pin===d&&Ze++}),Ze||(te.spacer=0)),n.onKill&&n.onKill(I)},mt.push(I),I.enable(!1,!1),Qe&&Qe(I),r&&r.add&&!Be){var ct=I.update;I.update=function(){I.update=ct,pt.cache++,oe||De||I.refresh()},He.delayedCall(.01,I.update),Be=.01,oe=De=0}else I.refresh();d&&k1()},i.register=function(n){return vo||(He=n||$v(),jv()&&window.document&&i.enable(),vo=ql),vo},i.defaults=function(n){if(n)for(var r in n)Yu[r]=n[r];return Yu},i.disable=function(n,r){ql=0,mt.forEach(function(a){return a[r?"kill":"disable"](n)}),Un(gt,"wheel",go),Un(kt,"scroll",go),clearInterval(Hu),Un(kt,"touchcancel",Pr),Un(Bt,"touchstart",Pr),Wu(Un,kt,"pointerdown,touchstart,mousedown",Lv),Wu(Un,kt,"pointerup,touchend,mouseup",Fv),nh.kill(),Vu(Un);for(var s=0;s<pt.length;s+=3)Xu(Un,pt[s],pt[s+1]),Xu(Un,pt[s],pt[s+2])},i.enable=function(){if(gt=window,kt=document,Vi=kt.documentElement,Bt=kt.body,He){if(rc=He.utils.toArray,Jl=He.utils.clamp,qp=He.core.context||Pr,kp=He.core.suppressOverwrites||Pr,$p=gt.history.scrollRestoration||"auto",Kp=gt.pageYOffset||0,He.core.globals("ScrollTrigger",i),Bt){ql=1,_o=document.createElement("div"),_o.style.height="100vh",_o.style.position="absolute",cx(),I1(),hn.register(He),i.isTouch=hn.isTouch,bs=hn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Yp=hn.isTouch===1,Ln(gt,"wheel",go),jp=[gt,kt,Vi,Bt],He.matchMedia?(i.matchMedia=function(u){var f=He.matchMedia(),h;for(h in u)f.add(h,u[h]);return f},He.addEventListener("matchMediaInit",function(){ox(),sm()}),He.addEventListener("matchMediaRevert",function(){return ax()}),He.addEventListener("matchMedia",function(){ya(0,1),ba("matchMedia")}),He.matchMedia().add("(orientation: portrait)",function(){return Gp(),Gp})):console.warn("Requires GSAP 3.11.0 or later"),Gp(),Ln(kt,"scroll",go);var n=Bt.hasAttribute("style"),r=Bt.style,s=r.borderTopStyle,a=He.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",o=Kr(Bt),vn.m=Math.round(o.top+vn.sc())||0,jn.m=Math.round(o.left+jn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(Bt.setAttribute("style",""),Bt.removeAttribute("style")),Hu=setInterval(kv,250),He.delayedCall(.5,function(){return Gu=0}),Ln(kt,"touchcancel",Pr),Ln(Bt,"touchstart",Pr),Wu(Ln,kt,"pointerdown,touchstart,mousedown",Lv),Wu(Ln,kt,"pointerup,touchend,mouseup",Fv),Xp=He.utils.checkPrefix("transform"),eh.push(Xp),vo=ei(),nh=He.delayedCall(.2,ya).pause(),xo=[kt,"visibilitychange",function(){var u=gt.innerWidth,f=gt.innerHeight;kt.hidden?(Pv=u,Iv=f):(Pv!==u||Iv!==f)&&Kl()},kt,"DOMContentLoaded",ya,gt,"load",ya,gt,"resize",Kl],Vu(Ln),mt.forEach(function(u){return u.enable(0,1)}),l=0;l<pt.length;l+=3)Xu(Un,pt[l],pt[l+1]),Xu(Un,pt[l],pt[l+2])}else if(kt){var c=function u(){i.enable(),kt.removeEventListener("DOMContentLoaded",u)};kt.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(zp=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Hu)||(Hu=r)&&setInterval(kv,r),"ignoreMobileResize"in n&&(Yp=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Vu(Un)||Vu(Ln,n.autoRefreshEvents||"none"),Zv=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=di(n),a=pt.indexOf(s),o=Ta(s);~a&&pt.splice(a,o?6:2),r&&(o?pr.unshift(gt,r,Bt,r,Vi,r):pr.unshift(s,r))},i.clearMatchMedia=function(n){mt.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var a=(Gi(n)?di(n):n).getBoundingClientRect(),o=a[s?Aa:Sa]*r||0;return s?a.right-o>0&&a.left+o<gt.innerWidth:a.bottom-o>0&&a.top+o<gt.innerHeight},i.positionInViewport=function(n,r,s){Gi(n)&&(n=di(n));var a=n.getBoundingClientRect(),o=a[s?Aa:Sa],l=r==null?o/2:r in rh?rh[r]*o:~r.indexOf("%")?parseFloat(r)*o/100:parseFloat(r)||0;return s?(a.left+l)/gt.innerWidth:(a.top+l)/gt.innerHeight},i.killAll=function(n){if(mt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Ea.killAll||[];Ea={},r.forEach(function(s){return s()})}},i}();lt.version="3.15.0";lt.saveStyles=function(i){return i?rc(i).forEach(function(e){if(e&&e.style){var t=Hi.indexOf(e);t>=0&&Hi.splice(t,5),Hi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),He.core.getCache(e),qp())}}):Hi};lt.revert=function(i,e){return sm(!i,e)};lt.create=function(i,e){return new lt(i,e)};lt.refresh=function(i){return i?Kl(!0):(vo||lt.register())&&ya(!0)};lt.update=function(i){return++pt.cache&&Jr(i===!0?2:0)};lt.clearScrollMemory=lx;lt.maxScroll=function(i,e){return Ir(i,e?jn:vn)};lt.getScrollFunc=function(i,e){return Qr(di(i),e?jn:vn)};lt.getById=function(i){return Zp[i]};lt.getAll=function(){return mt.filter(function(i){return i.vars.id!=="ScrollSmoother"})};lt.isScrolling=function(){return!!ir};lt.snapDirectional=rm;lt.addEventListener=function(i,e){var t=Ea[i]||(Ea[i]=[]);~t.indexOf(e)||t.push(e)};lt.removeEventListener=function(i,e){var t=Ea[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};lt.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var f=[],h=[],d=He.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(p){f.length||d.restart(!0),f.push(p.trigger),h.push(p),s<=f.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&ti(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return ti(s)&&(s=s(),Ln(lt,"refresh",function(){return s=e.batchMax()})),rc(i).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(lt.create(c))}),t};var Xv=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Wp=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(hn.isTouch?" pinch-zoom":""):"none",e===Vi&&i(Bt,t)},Ku={auto:1,scroll:1},W1=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||He.core.getCache(s),o=ei(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==Bt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Ku[(l=nr(s)).overflowY]||Ku[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Ta(s)&&(Ku[(l=nr(s)).overflowY]||Ku[l.overflowX]),a._isScrollT=o}(a._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},hx=function(e,t,n,r){return hn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&W1,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&Ln(kt,hn.eventTypes[0],qv,!1,!0)},onDisable:function(){return Un(kt,hn.eventTypes[0],qv,!0)}})},X1=/(input|label|select|textarea)/i,Yv,qv=function(e){var t=X1.test(e.target.tagName);(t||Yv)&&(e._gsapAllow=!0,Yv=t)},Y1=function(e){_a(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=di(e.target)||Vi,u=He.core.globals().ScrollSmoother,f=u&&u.get(),h=bs&&(e.content&&di(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=Qr(c,vn),p=Qr(c,jn),v=1,m=(hn.isTouch&&gt.visualViewport?gt.visualViewport.scale*gt.visualViewport.width:gt.outerWidth)/gt.innerWidth,g=0,x=ti(r)?function(){return r(o)}:function(){return r||2.8},A,y,M=hx(c,e.type,!0,s),E=function(){return y=!1},T=Pr,_=Pr,S=function(){l=Ir(c,vn),_=Jl(bs?1:0,l),n&&(T=Jl(0,Ir(c,jn))),A=Ma},C=function(){h._gsap.y=Ql(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},R=function(){if(y){requestAnimationFrame(E);var j=Ql(o.deltaY/2),z=_(d.v-j);if(h&&z!==d.v+d.offset){d.offset=z-d.v;var I=Ql((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+I+", 0, 1)",h._gsap.y=I+"px",d.cacheID=pt.cache,Jr()}return!0}d.offset&&C(),y=!0},b,P,L,F,N=function(){S(),b.isActive()&&b.vars.scrollY>l&&(d()>l?b.progress(1)&&d(l):b.resetTo("scrollY",l))};return h&&He.set(h,{y:"+=0"}),e.ignoreCheck=function(O){return bs&&O.type==="touchmove"&&R(O)||v>1.05&&O.type!=="touchstart"||o.isGesturing||O.touches&&O.touches.length>1},e.onPress=function(){y=!1;var O=v;v=Ql((gt.visualViewport&&gt.visualViewport.scale||1)/m),b.pause(),O!==v&&Wp(c,v>1.01?!0:n?!1:"x"),P=p(),L=d(),S(),A=Ma},e.onRelease=e.onGestureStart=function(O,j){if(d.offset&&C(),!j)F.restart(!0);else{pt.cache++;var z=x(),I,ie;n&&(I=p(),ie=I+z*.05*-O.velocityX/.227,z*=Xv(p,I,ie,Ir(c,jn)),b.vars.scrollX=T(ie)),I=d(),ie=I+z*.05*-O.velocityY/.227,z*=Xv(d,I,ie,Ir(c,vn)),b.vars.scrollY=_(ie),b.invalidate().duration(z).play(.01),(bs&&b.vars.scrollY>=l||I>=l-1)&&He.to({},{onUpdate:N,duration:z})}a&&a(O)},e.onWheel=function(){b._ts&&b.pause(),ei()-g>1e3&&(A=0,g=ei())},e.onChange=function(O,j,z,I,ie){if(Ma!==A&&S(),j&&n&&p(T(I[2]===j?P+(O.startX-O.x):p()+j-I[1])),z){d.offset&&C();var se=ie[2]===z,ye=se?L+O.startY-O.y:d()+z-ie[1],Re=_(ye);se&&ye!==Re&&(L+=Re-ye),d(Re)}(z||j)&&Jr()},e.onEnable=function(){Wp(c,n?!1:"x"),lt.addEventListener("refresh",N),Ln(gt,"resize",N),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=p.smooth=!1),M.enable()},e.onDisable=function(){Wp(c,!0),Un(gt,"resize",N),lt.removeEventListener("refresh",N),M.kill()},e.lockAxis=e.lockAxis!==!1,o=new hn(e),o.iOS=bs,bs&&!d()&&d(1),bs&&He.ticker.add(Pr),F=o._dc,b=He.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:ux(d,d(),function(){return b.pause()})},onUpdate:Jr,onComplete:F.vars.onComplete}),o};lt.sort=function(i){if(ti(i))return mt.sort(i);var e=gt.pageYOffset||0;return lt.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+gt.innerHeight}),mt.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};lt.observe=function(i){return new hn(i)};lt.normalizeScroll=function(i){if(typeof i>"u")return pi;if(i===!0&&pi)return pi.enable();if(i===!1){pi&&pi.kill(),pi=i;return}var e=i instanceof hn?i:Y1(i);return pi&&pi.target===e.target&&pi.kill(),Ta(e.target)&&(pi=e),e};lt.core={_getVelocityProp:zu,_inputObserver:hx,_scrollers:pt,_proxies:pr,bridge:{ss:function(){ir||ba("scrollStart"),ir=ei()},ref:function(){return $n}}};$v()&&He.registerPlugin(lt);var ac,oc,fx=typeof Symbol=="function"?Symbol():"_split",om,q1=()=>om||oh.register(window.gsap),dx=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter:0,lc=i=>i?typeof i=="string"?lc(document.querySelectorAll(i)):"length"in i?Array.from(i).reduce((e,t)=>(typeof t=="string"?e.push(...lc(t)):e.push(t),e),[]):[i]:[],px=i=>lc(i).filter(e=>e&&e.nodeType===1),lm=[],am=function(){},Q1={add:i=>i()},Z1=/\s+/g,mx=new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.","gu"),ah={left:0,top:0,width:0,height:0},K1=(i,e)=>{for(;++e<i.length&&i[e]===ah;);return i[e]||ah},gx=({element:i,html:e,ariaL:t,ariaH:n})=>{i.innerHTML=e,t?i.setAttribute("aria-label",t):i.removeAttribute("aria-label"),n?i.setAttribute("aria-hidden",n):i.removeAttribute("aria-hidden")},vx=(i,e)=>{if(e){let t=new Set(i.join("").match(e)||lm),n=i.length,r,s,a,o;if(t.size)for(;--n>-1;){s=i[n];for(a of t)if(a.startsWith(s)&&a.length>s.length){for(r=0,o=s;a.startsWith(o+=i[n+ ++r])&&o.length<a.length;);if(r&&o.length===a.length){i[n]=a,i.splice(n+1,r);break}}}}return i},xx=i=>window.getComputedStyle(i).display==="inline"&&(i.style.display="inline-block"),So=(i,e,t)=>e.insertBefore(typeof i=="string"?document.createTextNode(i):i,t),cm=(i,e,t)=>{let n=e[i+"sClass"]||"",{tag:r="div",aria:s="auto",propIndex:a=!1}=e,o=i==="line"?"block":"inline-block",l=n.indexOf("++")>-1,c=u=>{let f=document.createElement(r),h=t.length+1;return n&&(f.className=n+(l?" "+n+h:"")),a&&f.style.setProperty("--"+i,h+""),s!=="none"&&f.setAttribute("aria-hidden","true"),r!=="span"&&(f.style.position="relative",f.style.display=o),f.textContent=u,t.push(f),f};return l&&(n=n.replace("++","")),c.collection=t,c},J1=(i,e,t,n)=>{let r=cm("line",t,n),s=window.getComputedStyle(i).textAlign||"left";return(a,o)=>{let l=r("");for(l.style.textAlign=s,i.insertBefore(l,e[a]);a<o;a++)l.appendChild(e[a]);l.normalize()}},_x=(i,e,t,n,r,s,a,o,l,c)=>{var u;let f=Array.from(i.childNodes),h=0,{wordDelimiter:d,reduceWhiteSpace:p=!0,prepareText:v}=e,m=i.getBoundingClientRect(),g=m,x=!p&&window.getComputedStyle(i).whiteSpace.substring(0,3)==="pre",A=0,y=t.collection,M,E,T,_,S,C,R,b,P,L,F,N,O,j,z,I,ie,se;for(typeof d=="object"?(T=d.delimiter||d,E=d.replaceWith||""):E=d===""?"":d||" ",M=E!==" ";h<f.length;h++)if(_=f[h],_.nodeType===3){for(z=_.textContent||"",p?z=z.replace(Z1," "):x&&(z=z.replace(/\n/g,E+`
`)),v&&(z=v(z,i)),_.textContent=z,S=E||T?z.split(T||E):z.match(o)||lm,ie=S[S.length-1],b=M?ie.slice(-1)===" ":!ie,ie||S.pop(),g=m,R=M?S[0].charAt(0)===" ":!S[0],R&&So(" ",i,_),S[0]||S.shift(),vx(S,l),s&&c||(_.textContent=""),P=1;P<=S.length;P++)if(I=S[P-1],!p&&x&&I.charAt(0)===`
`&&((u=_.previousSibling)==null||u.remove(),So(document.createElement("br"),i,_),I=I.slice(1)),!p&&I==="")So(E,i,_);else if(I===" ")i.insertBefore(document.createTextNode(" "),_);else{if(M&&I.charAt(0)===" "&&So(" ",i,_),A&&P===1&&!R&&y.indexOf(A.parentNode)>-1?(C=y[y.length-1],C.appendChild(document.createTextNode(n?"":I))):(C=t(n?"":I),So(C,i,_),A&&P===1&&!R&&C.insertBefore(A,C.firstChild)),n)for(F=dx?vx([...dx.segment(I)].map(ye=>ye.segment),l):I.match(o)||lm,se=0;se<F.length;se++)C.appendChild(F[se]===" "?document.createTextNode(" "):n(F[se]));if(s&&c){if(z=_.textContent=z.substring(I.length+1,z.length),L=C.getBoundingClientRect(),L.top>g.top&&L.left<=g.left){for(N=i.cloneNode(),O=i.childNodes[0];O&&O!==C;)j=O,O=O.nextSibling,N.appendChild(j);i.parentNode.insertBefore(N,i),r&&xx(N)}g=L}(P<S.length||b)&&So(P>=S.length?" ":M&&I.slice(-1)===" "?" "+E:E,i,_)}i.removeChild(_),A=0}else _.nodeType===1&&(a&&a.indexOf(_)>-1?(y.indexOf(_.previousSibling)>-1&&y[y.length-1].appendChild(_),A=_):(_x(_,e,t,n,r,s,a,o,l,!0),A=0),r&&xx(_))},yx=class Ax{constructor(e,t){this.isSplit=!1,q1(),this.elements=px(e),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=t,this.elements.forEach(a=>{var o;t.overwrite!==!1&&((o=a[fx])==null||o._data.orig.filter(({element:l})=>l===a).forEach(gx)),a[fx]=this}),this._split=()=>this.isSplit&&this.split(this.vars);let n=[],r,s=()=>{let a=n.length,o;for(;a--;){o=n[a];let l=o.element.offsetWidth;if(l!==o.width){o.width=l,this._split();return}}};this._data={orig:n,obs:typeof ResizeObserver<"u"&&new ResizeObserver(()=>{clearTimeout(r),r=setTimeout(s,200)})},am(this),this.split(t)}split(e){return(this._ctx||Q1).add(()=>{this.isSplit&&this.revert(),this.vars=e=e||this.vars||{};let{type:t="chars,words,lines",aria:n="auto",deepSlice:r=!0,smartWrap:s,onSplit:a,autoSplit:o=!1,specialChars:l,mask:c}=this.vars,u=t.indexOf("lines")>-1,f=t.indexOf("chars")>-1,h=t.indexOf("words")>-1,d=f&&!h&&!u,p=l&&("push"in l?new RegExp("(?:"+l.join("|")+")","gu"):l),v=p?new RegExp(p.source+"|"+mx.source,"gu"):mx,m=!!e.ignore&&px(e.ignore),{orig:g,animTime:x,obs:A}=this._data,y;(f||h||u)&&(this.elements.forEach((M,E)=>{g[E]={element:M,html:M.innerHTML,ariaL:M.getAttribute("aria-label"),ariaH:M.getAttribute("aria-hidden")},n==="auto"?M.setAttribute("aria-label",(M.textContent||"").trim()):n==="hidden"&&M.setAttribute("aria-hidden","true");let T=[],_=[],S=[],C=f?cm("char",e,T):null,R=cm("word",e,_),b,P,L,F;if(_x(M,e,R,C,d,r&&(u||d),m,v,p,!1),u){let N=lc(M.childNodes),O=J1(M,N,e,S),j,z=[],I=0,ie=N.map(Re=>Re.nodeType===1?Re.getBoundingClientRect():ah),se=ah,ye;for(b=0;b<N.length;b++)j=N[b],j.nodeType===1&&(j.nodeName==="BR"?((!b||N[b-1].nodeName!=="BR")&&(z.push(j),O(I,b+1)),I=b+1,se=K1(ie,b)):(ye=ie[b],b&&ye.top>se.top&&ye.left<se.left+se.width-1&&(O(I,b),I=b),se=ye));I<b&&O(I,b),z.forEach(Re=>{var Y;return(Y=Re.parentNode)==null?void 0:Y.removeChild(Re)})}if(!h){for(b=0;b<_.length;b++)if(P=_[b],f||!P.nextSibling||P.nextSibling.nodeType!==3)if(s&&!u){for(L=document.createElement("span"),L.style.whiteSpace="nowrap";P.firstChild;)L.appendChild(P.firstChild);P.replaceWith(L)}else P.replaceWith(...P.childNodes);else F=P.nextSibling,F&&F.nodeType===3&&(F.textContent=(P.textContent||"")+(F.textContent||""),P.remove());_.length=0,M.normalize()}this.lines.push(...S),this.words.push(..._),this.chars.push(...T)}),c&&this[c]&&this.masks.push(...this[c].map(M=>{let E=M.cloneNode();return M.replaceWith(E),E.appendChild(M),M.className&&(E.className=M.className.trim().split(" ").map(T=>T+"-mask").join(" ")),E.style.overflow="clip",E}))),this.isSplit=!0,oc&&u&&o&&oc.addEventListener("loadingdone",this._split),(y=a&&a(this))&&y.totalTime&&(this._data.anim=x?y.totalTime(x):y),u&&o&&this.elements.forEach((M,E)=>{g[E].width=M.offsetWidth,A&&A.observe(M)})}),this}kill(){let{obs:e}=this._data;e&&e.disconnect(),oc?.removeEventListener("loadingdone",this._split)}revert(){var e,t;if(this.isSplit){let{orig:n,anim:r}=this._data;this.kill(),n.forEach(gx),this.chars.length=this.words.length=this.lines.length=n.length=this.masks.length=0,this.isSplit=!1,r&&(this._data.animTime=r.totalTime(),r.revert()),(t=(e=this.vars).onRevert)==null||t.call(e,this)}return this}static create(e,t){return new Ax(e,t)}static register(e){ac=ac||e||window.gsap,ac&&(lc=ac.utils.toArray,am=ac.core.context||am),!om&&window.innerWidth>0&&(oc=document.fonts,om=!0)}};yx.version="3.15.0";var oh=yx;var Wn="183";var qx=0,Vm=1,Qx=2;var Vc=1,Zx=2,$o=3,ri=0,tn=1,gn=2,Ft=0,Ia=1,Ns=2,Wm=3,Xm=4,Kx=5;var Bs=100,Jx=101,jx=102,$x=103,e_=104,t_=200,n_=201,i_=202,r_=203,Nh=204,Oh=205,s_=206,a_=207,o_=208,l_=209,c_=210,u_=211,h_=212,f_=213,d_=214,kh=0,Vo=1,zh=2,Ba=3,Hh=4,Gh=5,Vh=6,Wh=7,Ym=0,p_=1,m_=2,qi=0,qm=1,Qm=2,Zm=3,Km=4,Jm=5,jm=6,$m=7;var eg=300,Os=301,Oa=302,gf=303,vf=304,Wc=306,Wo=1e3,Ur=1001,Xh=1002,Ct=1003,g_=1004;var Xc=1005;var Vt=1006,xf=1007;var Fr=1008;var xt=1009,el=1010,Yc=1011,ks=1012,zs=1013,An=1014,nn=1015,ai=1016,_f=1017,yf=1018,Nr=1020,tg=35902,ng=35899,ig=1021,rg=1022,Sn=1023,sr=1026,or=1027,Hs=1028,tl=1029,os=1030,Gs=1031;var Vs=1033,qc=33776,Qc=33777,Zc=33778,Kc=33779,Af=35840,Sf=35841,Mf=35842,Tf=35843,Ef=36196,bf=37492,wf=37496,Cf=37488,Rf=37489,Df=37490,Pf=37491,If=37808,Bf=37809,Uf=37810,Lf=37811,Ff=37812,Nf=37813,Of=37814,kf=37815,zf=37816,Hf=37817,Gf=37818,Vf=37819,Wf=37820,Xf=37821,Yf=36492,qf=36494,Qf=36495,Zf=36283,Kf=36284,Jf=36285,jf=36286;var yc=2300,Yh=2301,Fh=2302,Fm=2303,Nm=2400,Om=2401,km=2402;var yi=3200;var sg=0,v_=1,Ai="",it="srgb",Pi="srgb-linear",Ac="linear",Ut="srgb";var Pa=7680;var zm=519,x_=512,__=513,y_=514,$f=515,A_=516,S_=517,ed=518,M_=519,qh=35044,Ws=35048;var Jc="300 es",_r=2e3,Sc=2001;function j1(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function $1(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Mc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function T_(){let i=Mc("canvas");return i.style.display="block",i}var Sx={},Xo=null;function Tc(...i){let e="THREE."+i.shift();Xo?Xo("log",e,...i):console.log(e,...i)}function E_(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Je(...i){i=E_(i);let e="THREE."+i.shift();if(Xo)Xo("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ke(...i){i=E_(i);let e="THREE."+i.shift();if(Xo)Xo("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ec(...i){let e=i.join(" ");e in Sx||(Sx[e]=!0,Je(...i))}function b_(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var w_={[kh]:Vo,[zh]:Vh,[Hh]:Wh,[Ba]:Gh,[Vo]:kh,[Vh]:zh,[Wh]:Hh,[Gh]:Ba},xi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},ni=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mx=1234567,xc=Math.PI/180,Yo=180/Math.PI;function is(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ni[i&255]+ni[i>>8&255]+ni[i>>16&255]+ni[i>>24&255]+"-"+ni[e&255]+ni[e>>8&255]+"-"+ni[e>>16&15|64]+ni[e>>24&255]+"-"+ni[t&63|128]+ni[t>>8&255]+"-"+ni[t>>16&255]+ni[t>>24&255]+ni[n&255]+ni[n>>8&255]+ni[n>>16&255]+ni[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function ag(i,e){return(i%e+e)%e}function eM(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function tM(i,e,t){return i!==e?(t-i)/(e-i):0}function _c(i,e,t){return(1-t)*i+t*e}function nM(i,e,t,n){return _c(i,e,1-Math.exp(-t*n))}function iM(i,e=1){return e-Math.abs(ag(i,e*2)-e)}function rM(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function sM(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function aM(i,e){return i+Math.floor(Math.random()*(e-i+1))}function oM(i,e){return i+Math.random()*(e-i)}function lM(i){return i*(.5-Math.random())}function cM(i){i!==void 0&&(Mx=i);let e=Mx+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function uM(i){return i*xc}function hM(i){return i*Yo}function fM(i){return(i&i-1)===0&&i!==0}function dM(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function pM(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function mM(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),f=s((e-n)/2),h=a((e-n)/2),d=s((n-e)/2),p=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*u,o*c);break;default:Je("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function xr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ui={DEG2RAD:xc,RAD2DEG:Yo,generateUUID:is,clamp:st,euclideanModulo:ag,mapLinear:eM,inverseLerp:tM,lerp:_c,damp:nM,pingpong:iM,smoothstep:rM,smootherstep:sM,randInt:aM,randFloat:oM,randFloatSpread:lM,seededRandom:cM,degToRad:uM,radToDeg:hM,isPowerOfTwo:fM,ceilPowerOfTwo:dM,floorPowerOfTwo:pM,setQuaternionFromProperEuler:mM,normalize:zt,denormalize:xr},Se=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Vn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3],h=s[a+0],d=s[a+1],p=s[a+2],v=s[a+3];if(f!==v||l!==h||c!==d||u!==p){let m=l*h+c*d+u*p+f*v;m<0&&(h=-h,d=-d,p=-p,v=-v,m=-m);let g=1-o;if(m<.9995){let x=Math.acos(m),A=Math.sin(x);g=Math.sin(g*x)/A,o=Math.sin(o*x)/A,l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+v*o}else{l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+v*o;let x=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=x,c*=x,u*=x,f*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],h=s[a+1],d=s[a+2],p=s[a+3];return e[t]=o*p+u*f+l*d-c*h,e[t+1]=l*p+u*h+c*f-o*d,e[t+2]=c*p+u*d+o*h-l*f,e[t+3]=u*p-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),h=l(n/2),d=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:Je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tx.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tx.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return um.copy(this).projectOnVector(e),this.sub(um)}reflect(e){return this.sub(um.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},um=new B,Tx=new Vn,$e=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],p=n[8],v=r[0],m=r[3],g=r[6],x=r[1],A=r[4],y=r[7],M=r[2],E=r[5],T=r[8];return s[0]=a*v+o*x+l*M,s[3]=a*m+o*A+l*E,s[6]=a*g+o*y+l*T,s[1]=c*v+u*x+f*M,s[4]=c*m+u*A+f*E,s[7]=c*g+u*y+f*T,s[2]=h*v+d*x+p*M,s[5]=h*m+d*A+p*E,s[8]=h*g+d*y+p*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,p=t*f+n*h+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return e[0]=f*v,e[1]=(r*c-u*n)*v,e[2]=(o*n-r*a)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(hm.makeScale(e,t)),this}rotate(e){return this.premultiply(hm.makeRotation(-e)),this}translate(e,t){return this.premultiply(hm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},hm=new $e,Ex=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bx=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gM(){let i={enabled:!0,workingColorSpace:Pi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ut&&(r.r=rs(r.r),r.g=rs(r.g),r.b=rs(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(r.r=Go(r.r),r.g=Go(r.g),r.b=Go(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ai?Ac:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ec("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ec("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Pi]:{primaries:e,whitePoint:n,transfer:Ac,toXYZ:Ex,fromXYZ:bx,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:it},outputColorSpaceConfig:{drawingBufferColorSpace:it}},[it]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:Ex,fromXYZ:bx,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:it}}}),i}var At=gM();function rs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Go(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Mo,Qh=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Mo===void 0&&(Mo=Mc("canvas")),Mo.width=e.width,Mo.height=e.height;let r=Mo.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Mo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Mc("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=rs(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(rs(t[n]/255)*255):t[n]=rs(t[n]);return{data:t,width:e.width,height:e.height}}else return Je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},vM=0,qo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vM++}),this.uuid=is(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(fm(r[a].image)):s.push(fm(r[a]))}else s=fm(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function fm(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Qh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Je("Texture: Unable to serialize Texture."),{})}var xM=0,dm=new B,Rn=class i extends xi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ur,r=Ur,s=Vt,a=Fr,o=Sn,l=xt,c=i.DEFAULT_ANISOTROPY,u=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xM++}),this.uuid=is(),this.name="",this.source=new qo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(dm).x}get height(){return this.source.getSize(dm).y}get depth(){return this.source.getSize(dm).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Je(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wo:e.x=e.x-Math.floor(e.x);break;case Ur:e.x=e.x<0?0:1;break;case Xh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wo:e.y=e.y-Math.floor(e.y);break;case Ur:e.y=e.y<0?0:1;break;case Xh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=eg;Rn.DEFAULT_ANISOTROPY=1;var St=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,y=(d+1)/2,M=(g+1)/2,E=(u+h)/4,T=(f+v)/4,_=(p+m)/4;return A>y&&A>M?A<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(A),r=E/n,s=T/n):y>M?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=E/r,s=_/r):M<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),n=T/s,r=_/s),this.set(n,r,s,t),this}let x=Math.sqrt((m-p)*(m-p)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(m-p)/x,this.y=(f-v)/x,this.z=(h-u)/x,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zh=class extends xi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Rn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new qo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vt=class extends Zh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},bc=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kh=class extends Rn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var je=class i{constructor(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,m)}set(e,t,n,r,s,a,o,l,c,u,f,h,d,p,v,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=h,g[3]=d,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/To.setFromMatrixColumn(e,0).length(),s=1/To.setFromMatrixColumn(e,1).length(),a=1/To.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h+v*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h-v*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=p*c-d,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=p*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+p,t[10]=h-v*f}else if(e.order==="XZY"){let h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=a*u,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_M,e,yM)}lookAt(e,t,n){let r=this.elements;return Wi.subVectors(e,t),Wi.lengthSq()===0&&(Wi.z=1),Wi.normalize(),ws.crossVectors(n,Wi),ws.lengthSq()===0&&(Math.abs(n.z)===1?Wi.x+=1e-4:Wi.z+=1e-4,Wi.normalize(),ws.crossVectors(n,Wi)),ws.normalize(),lh.crossVectors(Wi,ws),r[0]=ws.x,r[4]=lh.x,r[8]=Wi.x,r[1]=ws.y,r[5]=lh.y,r[9]=Wi.y,r[2]=ws.z,r[6]=lh.z,r[10]=Wi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],p=n[2],v=n[6],m=n[10],g=n[14],x=n[3],A=n[7],y=n[11],M=n[15],E=r[0],T=r[4],_=r[8],S=r[12],C=r[1],R=r[5],b=r[9],P=r[13],L=r[2],F=r[6],N=r[10],O=r[14],j=r[3],z=r[7],I=r[11],ie=r[15];return s[0]=a*E+o*C+l*L+c*j,s[4]=a*T+o*R+l*F+c*z,s[8]=a*_+o*b+l*N+c*I,s[12]=a*S+o*P+l*O+c*ie,s[1]=u*E+f*C+h*L+d*j,s[5]=u*T+f*R+h*F+d*z,s[9]=u*_+f*b+h*N+d*I,s[13]=u*S+f*P+h*O+d*ie,s[2]=p*E+v*C+m*L+g*j,s[6]=p*T+v*R+m*F+g*z,s[10]=p*_+v*b+m*N+g*I,s[14]=p*S+v*P+m*O+g*ie,s[3]=x*E+A*C+y*L+M*j,s[7]=x*T+A*R+y*F+M*z,s[11]=x*_+A*b+y*N+M*I,s[15]=x*S+A*P+y*O+M*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],p=e[3],v=e[7],m=e[11],g=e[15],x=l*d-c*h,A=o*d-c*f,y=o*h-l*f,M=a*d-c*u,E=a*h-l*u,T=a*f-o*u;return t*(v*x-m*A+g*y)-n*(p*x-m*M+g*E)+r*(p*A-v*M+g*T)-s*(p*y-v*E+m*T)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],p=e[12],v=e[13],m=e[14],g=e[15],x=t*o-n*a,A=t*l-r*a,y=t*c-s*a,M=n*l-r*o,E=n*c-s*o,T=r*c-s*l,_=u*v-f*p,S=u*m-h*p,C=u*g-d*p,R=f*m-h*v,b=f*g-d*v,P=h*g-d*m,L=x*P-A*b+y*R+M*C-E*S+T*_;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/L;return e[0]=(o*P-l*b+c*R)*F,e[1]=(r*b-n*P-s*R)*F,e[2]=(v*T-m*E+g*M)*F,e[3]=(h*E-f*T-d*M)*F,e[4]=(l*C-a*P-c*S)*F,e[5]=(t*P-r*C+s*S)*F,e[6]=(m*y-p*T-g*A)*F,e[7]=(u*T-h*y+d*A)*F,e[8]=(a*b-o*C+c*_)*F,e[9]=(n*C-t*b-s*_)*F,e[10]=(p*E-v*y+g*x)*F,e[11]=(f*y-u*E-d*x)*F,e[12]=(o*S-a*R-l*_)*F,e[13]=(t*R-n*S+r*_)*F,e[14]=(v*A-p*M-m*x)*F,e[15]=(u*M-f*A+h*x)*F,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,p=s*f,v=a*u,m=a*f,g=o*f,x=l*c,A=l*u,y=l*f,M=n.x,E=n.y,T=n.z;return r[0]=(1-(v+g))*M,r[1]=(d+y)*M,r[2]=(p-A)*M,r[3]=0,r[4]=(d-y)*E,r[5]=(1-(h+g))*E,r[6]=(m+x)*E,r[7]=0,r[8]=(p+A)*T,r[9]=(m-x)*T,r[10]=(1-(h+v))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=To.set(r[0],r[1],r[2]).length(),o=To.set(r[4],r[5],r[6]).length(),l=To.set(r[8],r[9],r[10]).length();s<0&&(a=-a),mr.copy(this);let c=1/a,u=1/o,f=1/l;return mr.elements[0]*=c,mr.elements[1]*=c,mr.elements[2]*=c,mr.elements[4]*=u,mr.elements[5]*=u,mr.elements[6]*=u,mr.elements[8]*=f,mr.elements[9]*=f,mr.elements[10]*=f,t.setFromRotationMatrix(mr),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=_r,l=!1){let c=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r),p,v;if(l)p=s/(a-s),v=a*s/(a-s);else if(o===_r)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Sc)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=_r,l=!1){let c=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r),p,v;if(l)p=1/(a-s),v=a/(a-s);else if(o===_r)p=-2/(a-s),v=-(a+s)/(a-s);else if(o===Sc)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},To=new B,mr=new je,_M=new B(0,0,0),yM=new B(1,1,1),ws=new B,lh=new B,Wi=new B,wx=new je,Cx=new Vn,yr=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wx.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wx,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cx.setFromEuler(this),this.setFromQuaternion(Cx,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yr.DEFAULT_ORDER="XYZ";var wc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},AM=0,Rx=new B,Eo=new Vn,jr=new je,ch=new B,cc=new B,SM=new B,MM=new Vn,Dx=new B(1,0,0),Px=new B(0,1,0),Ix=new B(0,0,1),Bx={type:"added"},TM={type:"removed"},bo={type:"childadded",child:null},pm={type:"childremoved",child:null},si=class i extends xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:AM++}),this.uuid=is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new yr,n=new Vn,r=new B(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new je},normalMatrix:{value:new $e}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Eo.setFromAxisAngle(e,t),this.quaternion.multiply(Eo),this}rotateOnWorldAxis(e,t){return Eo.setFromAxisAngle(e,t),this.quaternion.premultiply(Eo),this}rotateX(e){return this.rotateOnAxis(Dx,e)}rotateY(e){return this.rotateOnAxis(Px,e)}rotateZ(e){return this.rotateOnAxis(Ix,e)}translateOnAxis(e,t){return Rx.copy(e).applyQuaternion(this.quaternion),this.position.add(Rx.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dx,e)}translateY(e){return this.translateOnAxis(Px,e)}translateZ(e){return this.translateOnAxis(Ix,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ch.copy(e):ch.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),cc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jr.lookAt(cc,ch,this.up):jr.lookAt(ch,cc,this.up),this.quaternion.setFromRotationMatrix(jr),r&&(jr.extractRotation(r.matrixWorld),Eo.setFromRotationMatrix(jr),this.quaternion.premultiply(Eo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bx),bo.child=e,this.dispatchEvent(bo),bo.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(TM),pm.child=e,this.dispatchEvent(pm),pm.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jr.multiply(e.parent.matrixWorld)),e.applyMatrix4(jr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bx),bo.child=e,this.dispatchEvent(bo),bo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cc,e,SM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cc,MM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};si.DEFAULT_UP=new B(0,1,0);si.DEFAULT_MATRIX_AUTO_UPDATE=!0;si.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Lr=class extends si{constructor(){super(),this.isGroup=!0,this.type="Group"}},EM={type:"move"},Qo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),g=this._getHandJoint(c,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(EM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Lr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},C_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cs={h:0,s:0,l:0},uh={h:0,s:0,l:0};function mm(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Xe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=it){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=At.workingColorSpace){return this.r=e,this.g=t,this.b=n,At.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=At.workingColorSpace){if(e=ag(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=mm(a,s,e+1/3),this.g=mm(a,s,e),this.b=mm(a,s,e-1/3)}return At.colorSpaceToWorking(this,r),this}setStyle(e,t=it){function n(s){s!==void 0&&parseFloat(s)<1&&Je("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Je("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=it){let n=C_[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}copyLinearToSRGB(e){return this.r=Go(e.r),this.g=Go(e.g),this.b=Go(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=it){return At.workingToColorSpace(ii.copy(this),e),Math.round(st(ii.r*255,0,255))*65536+Math.round(st(ii.g*255,0,255))*256+Math.round(st(ii.b*255,0,255))}getHexString(e=it){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.workingToColorSpace(ii.copy(this),t);let n=ii.r,r=ii.g,s=ii.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=At.workingColorSpace){return At.workingToColorSpace(ii.copy(this),t),e.r=ii.r,e.g=ii.g,e.b=ii.b,e}getStyle(e=it){At.workingToColorSpace(ii.copy(this),e);let t=ii.r,n=ii.g,r=ii.b;return e!==it?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Cs),this.setHSL(Cs.h+e,Cs.s+t,Cs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cs),e.getHSL(uh);let n=_c(Cs.h,uh.h,t),r=_c(Cs.s,uh.s,t),s=_c(Cs.l,uh.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ii=new Xe;Xe.NAMES=C_;var Ar=class extends si{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yr,this.environmentIntensity=1,this.environmentRotation=new yr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},gr=new B,$r=new B,gm=new B,es=new B,wo=new B,Co=new B,Ux=new B,vm=new B,xm=new B,_m=new B,ym=new St,Am=new St,Sm=new St,Gn=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),gr.subVectors(e,t),r.cross(gr);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){gr.subVectors(r,t),$r.subVectors(n,t),gm.subVectors(e,t);let a=gr.dot(gr),o=gr.dot($r),l=gr.dot(gm),c=$r.dot($r),u=$r.dot(gm),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;let h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-d-p,p,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,es)===null?!1:es.x>=0&&es.y>=0&&es.x+es.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,es)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,es.x),l.addScaledVector(a,es.y),l.addScaledVector(o,es.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return ym.setScalar(0),Am.setScalar(0),Sm.setScalar(0),ym.fromBufferAttribute(e,t),Am.fromBufferAttribute(e,n),Sm.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ym,s.x),a.addScaledVector(Am,s.y),a.addScaledVector(Sm,s.z),a}static isFrontFacing(e,t,n,r){return gr.subVectors(n,t),$r.subVectors(e,t),gr.cross($r).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gr.subVectors(this.c,this.b),$r.subVectors(this.a,this.b),gr.cross($r).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;wo.subVectors(r,n),Co.subVectors(s,n),vm.subVectors(e,n);let l=wo.dot(vm),c=Co.dot(vm);if(l<=0&&c<=0)return t.copy(n);xm.subVectors(e,r);let u=wo.dot(xm),f=Co.dot(xm);if(u>=0&&f<=u)return t.copy(r);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(wo,a);_m.subVectors(e,s);let d=wo.dot(_m),p=Co.dot(_m);if(p>=0&&d<=p)return t.copy(s);let v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Co,o);let m=u*p-d*f;if(m<=0&&f-u>=0&&d-p>=0)return Ux.subVectors(s,r),o=(f-u)/(f-u+(d-p)),t.copy(r).addScaledVector(Ux,o);let g=1/(m+v+h);return a=v*g,o=h*g,t.copy(n).addScaledVector(wo,a).addScaledVector(Co,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kt=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=vr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,vr):vr.fromBufferAttribute(s,a),vr.applyMatrix4(e.matrixWorld),this.expandByPoint(vr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hh.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hh.copy(n.boundingBox)),hh.applyMatrix4(e.matrixWorld),this.union(hh)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vr),vr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(uc),fh.subVectors(this.max,uc),Ro.subVectors(e.a,uc),Do.subVectors(e.b,uc),Po.subVectors(e.c,uc),Rs.subVectors(Do,Ro),Ds.subVectors(Po,Do),wa.subVectors(Ro,Po);let t=[0,-Rs.z,Rs.y,0,-Ds.z,Ds.y,0,-wa.z,wa.y,Rs.z,0,-Rs.x,Ds.z,0,-Ds.x,wa.z,0,-wa.x,-Rs.y,Rs.x,0,-Ds.y,Ds.x,0,-wa.y,wa.x,0];return!Mm(t,Ro,Do,Po,fh)||(t=[1,0,0,0,1,0,0,0,1],!Mm(t,Ro,Do,Po,fh))?!1:(dh.crossVectors(Rs,Ds),t=[dh.x,dh.y,dh.z],Mm(t,Ro,Do,Po,fh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ts[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ts[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ts[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ts[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ts[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ts[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ts[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ts[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ts),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ts=[new B,new B,new B,new B,new B,new B,new B,new B],vr=new B,hh=new Kt,Ro=new B,Do=new B,Po=new B,Rs=new B,Ds=new B,wa=new B,uc=new B,fh=new B,dh=new B,Ca=new B;function Mm(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Ca.fromArray(i,s);let o=r.x*Math.abs(Ca.x)+r.y*Math.abs(Ca.y)+r.z*Math.abs(Ca.z),l=e.dot(Ca),c=t.dot(Ca),u=n.dot(Ca);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var _n=new B,ph=new Se,bM=0,ut=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bM++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qh,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ph.fromBufferAttribute(this,t),ph.applyMatrix3(e),this.setXY(t,ph.x,ph.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix3(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyMatrix4(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.applyNormalMatrix(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_n.fromBufferAttribute(this,t),_n.transformDirection(e),this.setXYZ(t,_n.x,_n.y,_n.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xr(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xr(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xr(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qh&&(e.usage=this.usage),e}};var Cc=class extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Rc=class extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var on=class extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}},wM=new Kt,hc=new B,Tm=new B,Sr=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):wM.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;hc.subVectors(e,this.center);let t=hc.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(hc,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tm.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(hc.copy(e.center).add(Tm)),this.expandByPoint(hc.copy(e.center).sub(Tm))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},CM=0,rr=new je,Em=new si,Io=new B,Xi=new Kt,fc=new Kt,Fn=new B,Lt=class i extends xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:CM++}),this.uuid=is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(j1(e)?Rc:Cc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new $e().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rr.makeRotationFromQuaternion(e),this.applyMatrix4(rr),this}rotateX(e){return rr.makeRotationX(e),this.applyMatrix4(rr),this}rotateY(e){return rr.makeRotationY(e),this.applyMatrix4(rr),this}rotateZ(e){return rr.makeRotationZ(e),this.applyMatrix4(rr),this}translate(e,t,n){return rr.makeTranslation(e,t,n),this.applyMatrix4(rr),this}scale(e,t,n){return rr.makeScale(e,t,n),this.applyMatrix4(rr),this}lookAt(e){return Em.lookAt(e),Em.updateMatrix(),this.applyMatrix4(Em.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Io).negate(),this.translate(Io.x,Io.y,Io.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new on(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Xi.setFromBufferAttribute(s),this.morphTargetsRelative?(Fn.addVectors(this.boundingBox.min,Xi.min),this.boundingBox.expandByPoint(Fn),Fn.addVectors(this.boundingBox.max,Xi.max),this.boundingBox.expandByPoint(Fn)):(this.boundingBox.expandByPoint(Xi.min),this.boundingBox.expandByPoint(Xi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Xi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];fc.setFromBufferAttribute(o),this.morphTargetsRelative?(Fn.addVectors(Xi.min,fc.min),Xi.expandByPoint(Fn),Fn.addVectors(Xi.max,fc.max),Xi.expandByPoint(Fn)):(Xi.expandByPoint(fc.min),Xi.expandByPoint(fc.max))}Xi.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Fn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Fn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Fn.fromBufferAttribute(o,c),l&&(Io.fromBufferAttribute(e,c),Fn.add(Io)),r=Math.max(r,n.distanceToSquared(Fn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new B,l[_]=new B;let c=new B,u=new B,f=new B,h=new Se,d=new Se,p=new Se,v=new B,m=new B;function g(_,S,C){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,S),f.fromBufferAttribute(n,C),h.fromBufferAttribute(s,_),d.fromBufferAttribute(s,S),p.fromBufferAttribute(s,C),u.sub(c),f.sub(c),d.sub(h),p.sub(h);let R=1/(d.x*p.y-p.x*d.y);isFinite(R)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(R),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(R),o[_].add(v),o[S].add(v),o[C].add(v),l[_].add(m),l[S].add(m),l[C].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let _=0,S=x.length;_<S;++_){let C=x[_],R=C.start,b=C.count;for(let P=R,L=R+b;P<L;P+=3)g(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let A=new B,y=new B,M=new B,E=new B;function T(_){M.fromBufferAttribute(r,_),E.copy(M);let S=o[_];A.copy(S),A.sub(M.multiplyScalar(M.dot(S))).normalize(),y.crossVectors(E,S);let R=y.dot(l[_])<0?-1:1;a.setXYZW(_,A.x,A.y,A.z,R)}for(let _=0,S=x.length;_<S;++_){let C=x[_],R=C.start,b=C.count;for(let P=R,L=R+b;P<L;P+=3)T(e.getX(P+0)),T(e.getX(P+1)),T(e.getX(P+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,f=new B;if(e)for(let h=0,d=e.count;h<d;h+=3){let p=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Fn.fromBufferAttribute(e,t),Fn.normalize(),e.setXYZ(t,Fn.x,Fn.y,Fn.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u),d=0,p=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let g=0;g<u;g++)h[p++]=c[d++]}return new ut(h,u,f)}if(this.index===null)return Je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){let h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jh=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qh,this.updateRanges=[],this.version=0,this.uuid=is()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=is()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=is()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},vi=new B,Dc=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)vi.fromBufferAttribute(this,t),vi.applyMatrix4(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vi.fromBufferAttribute(this,t),vi.applyNormalMatrix(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vi.fromBufferAttribute(this,t),vi.transformDirection(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Tc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Tc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},RM=0,Ii=class extends xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:RM++}),this.uuid=is(),this.name="",this.type="Material",this.blending=Ia,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nh,this.blendDst=Oh,this.blendEquation=Bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Ba,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pa,this.stencilZFail=Pa,this.stencilZPass=Pa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Je(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ia&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Nh&&(n.blendSrc=this.blendSrc),this.blendDst!==Oh&&(n.blendDst=this.blendDst),this.blendEquation!==Bs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ba&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pa&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pa&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pa&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Zo=class extends Ii{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Bo,dc=new B,Uo=new B,Lo=new B,Fo=new Se,pc=new Se,R_=new je,mh=new B,mc=new B,gh=new B,Lx=new Se,bm=new Se,Fx=new Se,Pc=class extends si{constructor(e=new Zo){if(super(),this.isSprite=!0,this.type="Sprite",Bo===void 0){Bo=new Lt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Jh(t,5);Bo.setIndex([0,1,2,0,2,3]),Bo.setAttribute("position",new Dc(n,3,0,!1)),Bo.setAttribute("uv",new Dc(n,2,3,!1))}this.geometry=Bo,this.material=e,this.center=new Se(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Uo.setFromMatrixScale(this.matrixWorld),R_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Lo.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Uo.multiplyScalar(-Lo.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;vh(mh.set(-.5,-.5,0),Lo,a,Uo,r,s),vh(mc.set(.5,-.5,0),Lo,a,Uo,r,s),vh(gh.set(.5,.5,0),Lo,a,Uo,r,s),Lx.set(0,0),bm.set(1,0),Fx.set(1,1);let o=e.ray.intersectTriangle(mh,mc,gh,!1,dc);if(o===null&&(vh(mc.set(-.5,.5,0),Lo,a,Uo,r,s),bm.set(0,1),o=e.ray.intersectTriangle(mh,gh,mc,!1,dc),o===null))return;let l=e.ray.origin.distanceTo(dc);l<e.near||l>e.far||t.push({distance:l,point:dc.clone(),uv:Gn.getInterpolation(dc,mh,mc,gh,Lx,bm,Fx,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function vh(i,e,t,n,r,s){Fo.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(pc.x=s*Fo.x-r*Fo.y,pc.y=r*Fo.x+s*Fo.y):pc.copy(Fo),i.copy(e),i.x+=pc.x,i.y+=pc.y,i.applyMatrix4(R_)}var ns=new B,wm=new B,xh=new B,Ps=new B,Cm=new B,_h=new B,Rm=new B,Ua=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ns)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ns.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ns.copy(this.origin).addScaledVector(this.direction,t),ns.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){wm.copy(e).add(t).multiplyScalar(.5),xh.copy(t).sub(e).normalize(),Ps.copy(this.origin).sub(wm);let s=e.distanceTo(t)*.5,a=-this.direction.dot(xh),o=Ps.dot(this.direction),l=-Ps.dot(xh),c=Ps.lengthSq(),u=Math.abs(1-a*a),f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=s*u,f>=0)if(h>=-p)if(h<=p){let v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(wm).addScaledVector(xh,h),d}intersectSphere(e,t){ns.subVectors(e.center,this.origin);let n=ns.dot(this.direction),r=ns.dot(ns)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ns)!==null}intersectTriangle(e,t,n,r,s){Cm.subVectors(t,e),_h.subVectors(n,e),Rm.crossVectors(Cm,_h);let a=this.direction.dot(Rm),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ps.subVectors(this.origin,e);let l=o*this.direction.dot(_h.crossVectors(Ps,_h));if(l<0)return null;let c=o*this.direction.dot(Cm.cross(Ps));if(c<0||l+c>a)return null;let u=-o*Ps.dot(Rm);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},La=class extends Ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.combine=Ym,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Nx=new je,Ra=new Ua,yh=new Sr,Ox=new B,Ah=new B,Sh=new B,Mh=new B,Dm=new B,Th=new B,kx=new B,Eh=new B,Rt=class extends si{constructor(e=new Lt,t=new La){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Th.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],f=s[l];u!==0&&(Dm.fromBufferAttribute(f,e),a?Th.addScaledVector(Dm,u):Th.addScaledVector(Dm.sub(t),u))}t.add(Th)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yh.copy(n.boundingSphere),yh.applyMatrix4(s),Ra.copy(e.ray).recast(e.near),!(yh.containsPoint(Ra.origin)===!1&&(Ra.intersectSphere(yh,Ox)===null||Ra.origin.distanceToSquared(Ox)>(e.far-e.near)**2))&&(Nx.copy(s).invert(),Ra.copy(e.ray).applyMatrix4(Nx),!(n.boundingBox!==null&&Ra.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ra)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){let m=h[p],g=a[m.materialIndex],x=Math.max(m.start,d.start),A=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=x,M=A;y<M;y+=3){let E=o.getX(y),T=o.getX(y+1),_=o.getX(y+2);r=bh(this,g,e,n,c,u,f,E,T,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let p=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let x=o.getX(m),A=o.getX(m+1),y=o.getX(m+2);r=bh(this,a,e,n,c,u,f,x,A,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){let m=h[p],g=a[m.materialIndex],x=Math.max(m.start,d.start),A=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=x,M=A;y<M;y+=3){let E=y,T=y+1,_=y+2;r=bh(this,g,e,n,c,u,f,E,T,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let x=m,A=m+1,y=m+2;r=bh(this,a,e,n,c,u,f,x,A,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function DM(i,e,t,n,r,s,a,o){let l;if(e.side===tn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===ri,o),l===null)return null;Eh.copy(o),Eh.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Eh);return c<t.near||c>t.far?null:{distance:c,point:Eh.clone(),object:i}}function bh(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Ah),i.getVertexPosition(l,Sh),i.getVertexPosition(c,Mh);let u=DM(i,e,t,n,Ah,Sh,Mh,kx);if(u){let f=new B;Gn.getBarycoord(kx,Ah,Sh,Mh,f),r&&(u.uv=Gn.getInterpolatedAttribute(r,o,l,c,f,new Se)),s&&(u.uv1=Gn.getInterpolatedAttribute(s,o,l,c,f,new Se)),a&&(u.normal=Gn.getInterpolatedAttribute(a,o,l,c,f,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new B,materialIndex:0};Gn.getNormal(Ah,Sh,Mh,h.normal),u.face=h,u.barycoord=f}return u}var ar=class extends Rn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ct,u=Ct,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ic=class extends ut{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},No=new je,zx=new je,wh=[],Hx=new Kt,PM=new je,gc=new Rt,vc=new Sr,Fa=class extends Rt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ic(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,PM)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,No),Hx.copy(e.boundingBox).applyMatrix4(No),this.boundingBox.union(Hx)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,No),vc.copy(e.boundingSphere).applyMatrix4(No),this.boundingSphere.union(vc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(gc.geometry=this.geometry,gc.material=this.material,gc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vc.copy(this.boundingSphere),vc.applyMatrix4(n),e.ray.intersectsSphere(vc)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,No),zx.multiplyMatrices(n,No),gc.matrixWorld=zx,gc.raycast(e,wh);for(let a=0,o=wh.length;a<o;a++){let l=wh[a];l.instanceId=s,l.object=this,t.push(l)}wh.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ic(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ar(new Float32Array(r*this.count),r,this.count,Hs,nn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Pm=new B,IM=new B,BM=new $e,Di=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Pm.subVectors(n,t).cross(IM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Pm),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||BM.getNormalMatrix(e),r=this.coplanarPoint(Pm).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Da=new Sr,UM=new Se(.5,.5),Ch=new B,Bc=class{constructor(e=new Di,t=new Di,n=new Di,r=new Di,s=new Di,a=new Di){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_r,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],p=s[8],v=s[9],m=s[10],g=s[11],x=s[12],A=s[13],y=s[14],M=s[15];if(r[0].setComponents(c-a,d-u,g-p,M-x).normalize(),r[1].setComponents(c+a,d+u,g+p,M+x).normalize(),r[2].setComponents(c+o,d+f,g+v,M+A).normalize(),r[3].setComponents(c-o,d-f,g-v,M-A).normalize(),n)r[4].setComponents(l,h,m,y).normalize(),r[5].setComponents(c-l,d-h,g-m,M-y).normalize();else if(r[4].setComponents(c-l,d-h,g-m,M-y).normalize(),t===_r)r[5].setComponents(c+l,d+h,g+m,M+y).normalize();else if(t===Sc)r[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Da.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Da.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Da)}intersectsSprite(e){Da.center.set(0,0,0);let t=UM.distanceTo(e.center);return Da.radius=.7071067811865476+t,Da.applyMatrix4(e.matrixWorld),this.intersectsSphere(Da)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ch.x=r.normal.x>0?e.max.x:e.min.x,Ch.y=r.normal.y>0?e.max.y:e.min.y,Ch.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ch)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var jh=class extends Ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gx=new je,Hm=new Ua,Rh=new Sr,Dh=new B,Uc=class extends si{constructor(e=new Lt,t=new jh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rh.copy(n.boundingSphere),Rh.applyMatrix4(r),Rh.radius+=s,e.ray.intersectsSphere(Rh)===!1)return;Gx.copy(r).invert(),Hm.copy(e.ray).applyMatrix4(Gx);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=h,v=d;p<v;p++){let m=c.getX(p);Dh.fromBufferAttribute(f,m),Vx(Dh,m,l,r,e,t,this)}}else{let h=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=h,v=d;p<v;p++)Dh.fromBufferAttribute(f,p),Vx(Dh,p,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Vx(i,e,t,n,r,s,a){let o=Hm.distanceSqToPoint(i);if(o<t){let l=new B;Hm.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Lc=class extends Rn{constructor(e=[],t=Os,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ko=class extends Rn{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Bi=class extends Rn{constructor(e,t,n=An,r,s,a,o=Ct,l=Ct,c,u=sr,f=1){if(u!==sr&&u!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},$h=class extends Bi{constructor(e,t=An,n=Os,r,s,a=Ct,o=Ct,l,c=sr){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Fc=class extends Rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Jo=class i extends Lt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],f=[],h=0,d=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,r,a,2),p("x","z","y",1,-1,e,n,-t,r,a,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new on(c,3)),this.setAttribute("normal",new on(u,3)),this.setAttribute("uv",new on(f,2));function p(v,m,g,x,A,y,M,E,T,_,S){let C=y/T,R=M/_,b=y/2,P=M/2,L=E/2,F=T+1,N=_+1,O=0,j=0,z=new B;for(let I=0;I<N;I++){let ie=I*R-P;for(let se=0;se<F;se++){let ye=se*C-b;z[v]=ye*x,z[m]=ie*A,z[g]=L,c.push(z.x,z.y,z.z),z[v]=0,z[m]=0,z[g]=E>0?1:-1,u.push(z.x,z.y,z.z),f.push(se/T),f.push(1-I/_),O+=1}}for(let I=0;I<_;I++)for(let ie=0;ie<T;ie++){let se=h+ie+F*I,ye=h+ie+F*(I+1),Re=h+(ie+1)+F*(I+1),Y=h+(ie+1)+F*I;l.push(se,ye,Y),l.push(ye,Re,Y),j+=6}o.addGroup(d,j,S),d+=j,h+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Nc=class i extends Lt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new B,u=new Se;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){let d=n+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new on(a,3)),this.setAttribute("normal",new on(o,3)),this.setAttribute("uv",new on(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Oc=class i extends Lt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],f=[],h=[],d=[],p=0,v=[],m=n/2,g=0;x(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new on(f,3)),this.setAttribute("normal",new on(h,3)),this.setAttribute("uv",new on(d,2));function x(){let y=new B,M=new B,E=0,T=(t-e)/n;for(let _=0;_<=s;_++){let S=[],C=_/s,R=C*(t-e)+e;for(let b=0;b<=r;b++){let P=b/r,L=P*l+o,F=Math.sin(L),N=Math.cos(L);M.x=R*F,M.y=-C*n+m,M.z=R*N,f.push(M.x,M.y,M.z),y.set(F,T,N).normalize(),h.push(y.x,y.y,y.z),d.push(P,1-C),S.push(p++)}v.push(S)}for(let _=0;_<r;_++)for(let S=0;S<s;S++){let C=v[S][_],R=v[S+1][_],b=v[S+1][_+1],P=v[S][_+1];(e>0||S!==0)&&(u.push(C,R,P),E+=3),(t>0||S!==s-1)&&(u.push(R,b,P),E+=3)}c.addGroup(g,E,0),g+=E}function A(y){let M=p,E=new Se,T=new B,_=0,S=y===!0?e:t,C=y===!0?1:-1;for(let b=1;b<=r;b++)f.push(0,m*C,0),h.push(0,C,0),d.push(.5,.5),p++;let R=p;for(let b=0;b<=r;b++){let L=b/r*l+o,F=Math.cos(L),N=Math.sin(L);T.x=S*N,T.y=m*C,T.z=S*F,f.push(T.x,T.y,T.z),h.push(0,C,0),E.x=F*.5+.5,E.y=N*.5*C+.5,d.push(E.x,E.y),p++}for(let b=0;b<r;b++){let P=M+b,L=R+b;y===!0?u.push(L,L+1,P):u.push(L+1,L,P),_+=3}c.addGroup(g,_,y===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ef=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Je("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let u=n[r],h=n[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Se:new B);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new B,r=[],s=[],a=[],o=new B,l=new je;for(let d=0;d<=e;d++){let p=d/e;r[d]=this.getTangentAt(p,new B)}s[0]=new B,a[0]=new B;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(st(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(st(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],d*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function og(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var Ph=new B,Im=new og,Bm=new og,Um=new og,kc=class extends ef{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new B){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Ph.subVectors(r[0],r[1]).add(r[0]),c=Ph);let f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Ph.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Ph),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Im.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,p,v,m),Bm.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,p,v,m),Um.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,p,v,m)}else this.curveType==="catmullrom"&&(Im.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Bm.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Um.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return n.set(Im.calc(l),Bm.calc(l),Um.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new B().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};var ss=class i extends Lt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],p=[],v=[],m=[];for(let g=0;g<u;g++){let x=g*h-a;for(let A=0;A<c;A++){let y=A*f-s;p.push(y,-x,0),v.push(0,0,1),m.push(A/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<o;x++){let A=x+c*g,y=x+c*(g+1),M=x+1+c*(g+1),E=x+1+c*g;d.push(A,y,E),d.push(y,M,E)}this.setIndex(d),this.setAttribute("position",new on(p,3)),this.setAttribute("normal",new on(v,3)),this.setAttribute("uv",new on(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Na=class i extends Lt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],f=new B,h=new B,d=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){let x=[],A=g/n,y=0;g===0&&a===0?y=.5/t:g===n&&l===Math.PI&&(y=-.5/t);for(let M=0;M<=t;M++){let E=M/t;f.x=-e*Math.cos(r+E*s)*Math.sin(a+A*o),f.y=e*Math.cos(a+A*o),f.z=e*Math.sin(r+E*s)*Math.sin(a+A*o),p.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),m.push(E+y,1-A),x.push(c++)}u.push(x)}for(let g=0;g<n;g++)for(let x=0;x<t;x++){let A=u[g][x+1],y=u[g][x],M=u[g+1][x],E=u[g+1][x+1];(g!==0||a>0)&&d.push(A,y,E),(g!==n-1||l<Math.PI)&&d.push(y,M,E)}this.setIndex(d),this.setAttribute("position",new on(p,3)),this.setAttribute("normal",new on(v,3)),this.setAttribute("uv",new on(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function ka(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function oi(i){let e={};for(let t=0;t<i.length;t++){let n=ka(i[t]);for(let r in n)e[r]=n[r]}return e}function LM(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function lg(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:At.workingColorSpace}var D_={clone:ka,merge:oi},FM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,NM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rt=class extends Ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=FM,this.fragmentShader=NM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ka(e.uniforms),this.uniformsGroups=LM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},tf=class extends rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},zc=class extends Ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sg,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var nf=class extends Ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yi,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},rf=class extends Ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ih(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var Us=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},sf=class extends Us{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nm,endingEnd:Nm}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Om:s=e,o=2*t-n;break;case km:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Om:a=e,l=2*n-t;break;case km:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,p=(n-t)/(r-t),v=p*p,m=v*p,g=-h*m+2*h*v-h*p,x=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*p+1,A=(-1-d)*m+(1.5+d)*v+.5*p,y=d*m-d*v;for(let M=0;M!==o;++M)s[M]=g*a[u+M]+x*a[c+M]+A*a[l+M]+y*a[f+M];return s}},af=class extends Us{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*f+a[l+h]*u;return s}},of=class extends Us{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},lf=class extends Us{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.settings||this.DefaultSettings_,f=u.inTangents,h=u.outTangents;if(!f||!h){let v=(n-t)/(r-t),m=1-v;for(let g=0;g!==o;++g)s[g]=a[c+g]*m+a[l+g]*v;return s}let d=o*2,p=e-1;for(let v=0;v!==o;++v){let m=a[c+v],g=a[l+v],x=p*d+v*2,A=h[x],y=h[x+1],M=e*d+v*2,E=f[M],T=f[M+1],_=(n-t)/(r-t),S,C,R,b,P;for(let L=0;L<8;L++){S=_*_,C=S*_,R=1-_,b=R*R,P=b*R;let N=P*t+3*b*_*A+3*R*S*E+C*r-n;if(Math.abs(N)<1e-10)break;let O=3*b*(A-t)+6*R*_*(E-A)+3*S*(r-E);if(Math.abs(O)<1e-10)break;_=_-N/O,_=Math.max(0,Math.min(1,_))}s[v]=P*m+3*b*_*y+3*R*S*T+C*g}return s}},Yi=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ih(t,this.TimeBufferType),this.values=Ih(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ih(e.times,Array),values:Ih(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new of(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new af(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new lf(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case yc:t=this.InterpolantFactoryMethodDiscrete;break;case Yh:t=this.InterpolantFactoryMethodLinear;break;case Fh:t=this.InterpolantFactoryMethodSmooth;break;case Fm:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Je("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return yc;case this.InterpolantFactoryMethodLinear:return Yh;case this.InterpolantFactoryMethodSmooth:return Fh;case this.InterpolantFactoryMethodBezier:return Fm}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ke("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ke("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&$1(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Ke("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Fh,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let f=o*n,h=f-n,d=f+n;for(let p=0;p!==n;++p){let v=t[f+p];if(v!==t[h+p]||v!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,h=a*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Yi.prototype.ValueTypeName="";Yi.prototype.TimeBufferType=Float32Array;Yi.prototype.ValueBufferType=Float32Array;Yi.prototype.DefaultInterpolation=Yh;var Ls=class extends Yi{constructor(e,t,n){super(e,t,n)}};Ls.prototype.ValueTypeName="bool";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=yc;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var cf=class extends Yi{constructor(e,t,n,r){super(e,t,n,r)}};cf.prototype.ValueTypeName="color";var uf=class extends Yi{constructor(e,t,n,r){super(e,t,n,r)}};uf.prototype.ValueTypeName="number";var hf=class extends Us{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)Vn.slerpFlat(s,0,a,c-o,a,c,l);return s}},Hc=class extends Yi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new hf(this.times,this.values,this.getValueSize(),e)}};Hc.prototype.ValueTypeName="quaternion";Hc.prototype.InterpolantFactoryMethodSmooth=void 0;var Fs=class extends Yi{constructor(e,t,n){super(e,t,n)}};Fs.prototype.ValueTypeName="string";Fs.prototype.ValueBufferType=Array;Fs.prototype.DefaultInterpolation=yc;Fs.prototype.InterpolantFactoryMethodLinear=void 0;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;var ff=class extends Yi{constructor(e,t,n,r){super(e,t,n,r)}};ff.prototype.ValueTypeName="vector";var df=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},P_=new df,pf=class{constructor(e){this.manager=e!==void 0?e:P_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};pf.DEFAULT_MATERIAL_NAME="__DEFAULT";var Bh=new B,Uh=new Vn,Br=new B,Gc=class extends si{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=_r,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Bh,Uh,Br),Br.x===1&&Br.y===1&&Br.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bh,Uh,Br.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Bh,Uh,Br),Br.x===1&&Br.y===1&&Br.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bh,Uh,Br.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Is=new B,Wx=new Se,Xx=new Se,yn=class extends Gc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(xc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yo*2*Math.atan(Math.tan(xc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Is.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Is.x,Is.y).multiplyScalar(-e/Is.z),Is.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Is.x,Is.y).multiplyScalar(-e/Is.z)}getViewSize(e,t){return this.getViewBounds(e,Wx,Xx),t.subVectors(Xx,Wx)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(xc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var as=class extends Gc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Oo=-90,ko=1,jo=class extends si{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yn(Oo,ko,e,t);r.layers=this.layers,this.add(r);let s=new yn(Oo,ko,e,t);s.layers=this.layers,this.add(s);let a=new yn(Oo,ko,e,t);a.layers=this.layers,this.add(a);let o=new yn(Oo,ko,e,t);o.layers=this.layers,this.add(o);let l=new yn(Oo,ko,e,t);l.layers=this.layers,this.add(l);let c=new yn(Oo,ko,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===_r)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Sc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},mf=class extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var cg="\\[\\]\\.:\\/",OM=new RegExp("["+cg+"]","g"),ug="[^"+cg+"]",kM="[^"+cg.replace("\\.","")+"]",zM=/((?:WC+[\/:])*)/.source.replace("WC",ug),HM=/(WCOD+)?/.source.replace("WCOD",kM),GM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ug),VM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ug),WM=new RegExp("^"+zM+HM+GM+VM+"$"),XM=["material","materials","bones","map"],Gm=class{constructor(e,t,n){let r=n||$t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},$t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(OM,"")}static parseTrackName(e){let t=WM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);XM.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Je("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Ke("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};$t.Composite=Gm;$t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$t.prototype.GetterByBindingType=[$t.prototype._getValue_direct,$t.prototype._getValue_array,$t.prototype._getValue_arrayElement,$t.prototype._getValue_toArray];$t.prototype.SetterByBindingTypeAndVersioning=[[$t.prototype._setValue_direct,$t.prototype._setValue_direct_setNeedsUpdate,$t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_array,$t.prototype._setValue_array_setNeedsUpdate,$t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_arrayElement,$t.prototype._setValue_arrayElement_setNeedsUpdate,$t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_fromArray,$t.prototype._setValue_fromArray_setNeedsUpdate,$t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var dD=new Float32Array(1);var ge=class i{constructor(e){this.value=e}clone(){return new i(this.value.clone===void 0?this.value:this.value.clone())}};var Yx=new B,Lh=new B,zo=new B,Ho=new B,Lm=new B,YM=new B,qM=new B,_i=class{constructor(e=new B,t=new B){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Yx.subVectors(e,this.start),Lh.subVectors(this.end,this.start);let n=Lh.dot(Lh),s=Lh.dot(Yx)/n;return t&&(s=st(s,0,1)),s}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=YM,n=qM){let r=10000000000000001e-32,s,a,o=this.start,l=e.start,c=this.end,u=e.end;zo.subVectors(c,o),Ho.subVectors(u,l),Lm.subVectors(o,l);let f=zo.dot(zo),h=Ho.dot(Ho),d=Ho.dot(Lm);if(f<=r&&h<=r)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(f<=r)s=0,a=d/h,a=st(a,0,1);else{let p=zo.dot(Lm);if(h<=r)a=0,s=st(-p/f,0,1);else{let v=zo.dot(Ho),m=f*h-v*v;m!==0?s=st((v*d-p*h)/m,0,1):s=0,a=(v*s+d)/h,a<0?(a=0,s=st(-p/f,0,1)):a>1&&(a=1,s=st((v-p)/f,0,1))}}return t.copy(o).addScaledVector(zo,s),n.copy(l).addScaledVector(Ho,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function hg(i,e,t,n){let r=QM(n);switch(t){case ig:return i*e;case Hs:return i*e/r.components*r.byteLength;case tl:return i*e/r.components*r.byteLength;case os:return i*e*2/r.components*r.byteLength;case Gs:return i*e*2/r.components*r.byteLength;case rg:return i*e*3/r.components*r.byteLength;case Sn:return i*e*4/r.components*r.byteLength;case Vs:return i*e*4/r.components*r.byteLength;case qc:case Qc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Zc:case Kc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sf:case Tf:return Math.max(i,16)*Math.max(e,8)/4;case Af:case Mf:return Math.max(i,8)*Math.max(e,8)/2;case Ef:case bf:case Cf:case Rf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wf:case Df:case Pf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case If:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Uf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Lf:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ff:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Nf:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Of:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case kf:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case zf:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Hf:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Gf:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Vf:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wf:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xf:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Yf:case qf:case Qf:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Zf:case Kf:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Jf:case jf:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function QM(i){switch(i){case xt:case el:return{byteLength:1,components:1};case ks:case Yc:case ai:return{byteLength:2,components:1};case _f:case yf:return{byteLength:2,components:4};case An:case zs:case nn:return{byteLength:4,components:1};case tg:case ng:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wn}}));typeof window<"u"&&(window.__THREE__?Je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wn);function ey(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function KM(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){let p=f[h],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){let v=f[d];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var JM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jM=`#ifdef USE_ALPHAHASH
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
#endif`,$M=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,iT=`#ifdef USE_AOMAP
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
#endif`,rT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sT=`#ifdef USE_BATCHING
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
#endif`,aT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,oT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uT=`#ifdef USE_IRIDESCENCE
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
#endif`,hT=`#ifdef USE_BUMPMAP
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
#endif`,fT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_T=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,yT=`#define PI 3.141592653589793
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
} // validated`,AT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ST=`vec3 transformedNormal = objectNormal;
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
#endif`,MT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,TT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ET=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wT="gl_FragColor = linearToOutputTexel( gl_FragColor );",CT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,RT=`#ifdef USE_ENVMAP
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
#endif`,DT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,PT=`#ifdef USE_ENVMAP
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
#endif`,IT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BT=`#ifdef USE_ENVMAP
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
#endif`,UT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,LT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,FT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,NT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,OT=`#ifdef USE_GRADIENTMAP
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
}`,kT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,HT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,GT=`uniform bool receiveShadow;
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
#endif`,VT=`#ifdef USE_ENVMAP
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
#endif`,WT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,XT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,YT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,QT=`PhysicalMaterial material;
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
#endif`,ZT=`uniform sampler2D dfgLUT;
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
}`,KT=`
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
#endif`,JT=`#if defined( RE_IndirectDiffuse )
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
#endif`,jT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$T=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,eE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,aE=`#if defined( USE_POINTS_UV )
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
#endif`,oE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,uE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fE=`#ifdef USE_MORPHTARGETS
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
#endif`,dE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,mE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_E=`#ifdef USE_NORMALMAP
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
#endif`,yE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,AE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,SE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ME=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,TE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,EE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,CE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,RE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,DE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,PE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,IE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,BE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,UE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,LE=`float getShadowMask() {
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
}`,FE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,NE=`#ifdef USE_SKINNING
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
#endif`,OE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kE=`#ifdef USE_SKINNING
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
#endif`,zE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,HE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,GE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,VE=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,WE=`#ifdef USE_TRANSMISSION
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
#endif`,XE=`#ifdef USE_TRANSMISSION
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
#endif`,YE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ZE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,KE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,JE=`uniform sampler2D t2D;
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
}`,jE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$E=`#ifdef ENVMAP_TYPE_CUBE
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
}`,eb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nb=`#include <common>
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
}`,ib=`#if DEPTH_PACKING == 3200
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
}`,rb=`#define DISTANCE
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
}`,sb=`#define DISTANCE
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
}`,ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ob=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lb=`uniform float scale;
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
}`,cb=`uniform vec3 diffuse;
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
}`,ub=`#include <common>
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
}`,hb=`uniform vec3 diffuse;
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
}`,fb=`#define LAMBERT
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
}`,db=`#define LAMBERT
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
}`,pb=`#define MATCAP
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
}`,mb=`#define MATCAP
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
}`,gb=`#define NORMAL
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
}`,vb=`#define NORMAL
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
}`,xb=`#define PHONG
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
}`,_b=`#define PHONG
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
}`,yb=`#define STANDARD
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
}`,Ab=`#define STANDARD
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
}`,Sb=`#define TOON
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
}`,Mb=`#define TOON
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
}`,Tb=`uniform float size;
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
}`,Eb=`uniform vec3 diffuse;
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
}`,bb=`#include <common>
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
}`,wb=`uniform vec3 color;
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
}`,Cb=`uniform float rotation;
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
}`,Rb=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:JM,alphahash_pars_fragment:jM,alphamap_fragment:$M,alphamap_pars_fragment:eT,alphatest_fragment:tT,alphatest_pars_fragment:nT,aomap_fragment:iT,aomap_pars_fragment:rT,batching_pars_vertex:sT,batching_vertex:aT,begin_vertex:oT,beginnormal_vertex:lT,bsdfs:cT,iridescence_fragment:uT,bumpmap_pars_fragment:hT,clipping_planes_fragment:fT,clipping_planes_pars_fragment:dT,clipping_planes_pars_vertex:pT,clipping_planes_vertex:mT,color_fragment:gT,color_pars_fragment:vT,color_pars_vertex:xT,color_vertex:_T,common:yT,cube_uv_reflection_fragment:AT,defaultnormal_vertex:ST,displacementmap_pars_vertex:MT,displacementmap_vertex:TT,emissivemap_fragment:ET,emissivemap_pars_fragment:bT,colorspace_fragment:wT,colorspace_pars_fragment:CT,envmap_fragment:RT,envmap_common_pars_fragment:DT,envmap_pars_fragment:PT,envmap_pars_vertex:IT,envmap_physical_pars_fragment:VT,envmap_vertex:BT,fog_vertex:UT,fog_pars_vertex:LT,fog_fragment:FT,fog_pars_fragment:NT,gradientmap_pars_fragment:OT,lightmap_pars_fragment:kT,lights_lambert_fragment:zT,lights_lambert_pars_fragment:HT,lights_pars_begin:GT,lights_toon_fragment:WT,lights_toon_pars_fragment:XT,lights_phong_fragment:YT,lights_phong_pars_fragment:qT,lights_physical_fragment:QT,lights_physical_pars_fragment:ZT,lights_fragment_begin:KT,lights_fragment_maps:JT,lights_fragment_end:jT,logdepthbuf_fragment:$T,logdepthbuf_pars_fragment:eE,logdepthbuf_pars_vertex:tE,logdepthbuf_vertex:nE,map_fragment:iE,map_pars_fragment:rE,map_particle_fragment:sE,map_particle_pars_fragment:aE,metalnessmap_fragment:oE,metalnessmap_pars_fragment:lE,morphinstance_vertex:cE,morphcolor_vertex:uE,morphnormal_vertex:hE,morphtarget_pars_vertex:fE,morphtarget_vertex:dE,normal_fragment_begin:pE,normal_fragment_maps:mE,normal_pars_fragment:gE,normal_pars_vertex:vE,normal_vertex:xE,normalmap_pars_fragment:_E,clearcoat_normal_fragment_begin:yE,clearcoat_normal_fragment_maps:AE,clearcoat_pars_fragment:SE,iridescence_pars_fragment:ME,opaque_fragment:TE,packing:EE,premultiplied_alpha_fragment:bE,project_vertex:wE,dithering_fragment:CE,dithering_pars_fragment:RE,roughnessmap_fragment:DE,roughnessmap_pars_fragment:PE,shadowmap_pars_fragment:IE,shadowmap_pars_vertex:BE,shadowmap_vertex:UE,shadowmask_pars_fragment:LE,skinbase_vertex:FE,skinning_pars_vertex:NE,skinning_vertex:OE,skinnormal_vertex:kE,specularmap_fragment:zE,specularmap_pars_fragment:HE,tonemapping_fragment:GE,tonemapping_pars_fragment:VE,transmission_fragment:WE,transmission_pars_fragment:XE,uv_pars_fragment:YE,uv_pars_vertex:qE,uv_vertex:QE,worldpos_vertex:ZE,background_vert:KE,background_frag:JE,backgroundCube_vert:jE,backgroundCube_frag:$E,cube_vert:eb,cube_frag:tb,depth_vert:nb,depth_frag:ib,distance_vert:rb,distance_frag:sb,equirect_vert:ab,equirect_frag:ob,linedashed_vert:lb,linedashed_frag:cb,meshbasic_vert:ub,meshbasic_frag:hb,meshlambert_vert:fb,meshlambert_frag:db,meshmatcap_vert:pb,meshmatcap_frag:mb,meshnormal_vert:gb,meshnormal_frag:vb,meshphong_vert:xb,meshphong_frag:_b,meshphysical_vert:yb,meshphysical_frag:Ab,meshtoon_vert:Sb,meshtoon_frag:Mb,points_vert:Tb,points_frag:Eb,shadow_vert:bb,shadow_frag:wb,sprite_vert:Cb,sprite_frag:Rb},Ce={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},kr={basic:{uniforms:oi([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:oi([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:oi([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:oi([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:oi([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Xe(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:oi([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:oi([Ce.points,Ce.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:oi([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:oi([Ce.common,Ce.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:oi([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:oi([Ce.sprite,Ce.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distance:{uniforms:oi([Ce.common,Ce.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distance_vert,fragmentShader:ht.distance_frag},shadow:{uniforms:oi([Ce.lights,Ce.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};kr.physical={uniforms:oi([kr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var td={r:0,b:0,g:0},za=new yr,Db=new je;function Pb(i,e,t,n,r,s){let a=new Xe(0),o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(x){let A=x.isScene===!0?x.background:null;if(A&&A.isTexture){let y=x.backgroundBlurriness>0;A=e.get(A,y)}return A}function p(x){let A=!1,y=d(x);y===null?m(a,o):y&&y.isColor&&(m(y,1),A=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,A){let y=d(A);y&&(y.isCubeTexture||y.mapping===Wc)?(c===void 0&&(c=new Rt(new Jo(1,1,1),new rt({name:"BackgroundCubeMaterial",uniforms:ka(kr.backgroundCube.uniforms),vertexShader:kr.backgroundCube.vertexShader,fragmentShader:kr.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),za.copy(A.backgroundRotation),za.x*=-1,za.y*=-1,za.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(za.y*=-1,za.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Db.makeRotationFromEuler(za)),c.material.toneMapped=At.getTransfer(y.colorSpace)!==Ut,(u!==y||f!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Rt(new ss(2,2),new rt({name:"BackgroundMaterial",uniforms:ka(kr.background.uniforms),vertexShader:kr.background.vertexShader,fragmentShader:kr.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=At.getTransfer(y.colorSpace)!==Ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,A){x.getRGB(td,lg(i)),t.buffers.color.setClear(td.r,td.g,td.b,A,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,A=1){a.set(x),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:p,addToRenderList:v,dispose:g}}function Ib(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null),s=r,a=!1;function o(R,b,P,L,F){let N=!1,O=f(R,L,P,b);s!==O&&(s=O,c(s.object)),N=d(R,L,P,F),N&&p(R,L,P,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(N||a)&&(a=!1,y(R,b,P,L),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function f(R,b,P,L){let F=L.wireframe===!0,N=n[b.id];N===void 0&&(N={},n[b.id]=N);let O=R.isInstancedMesh===!0?R.id:0,j=N[O];j===void 0&&(j={},N[O]=j);let z=j[P.id];z===void 0&&(z={},j[P.id]=z);let I=z[F];return I===void 0&&(I=h(l()),z[F]=I),I}function h(R){let b=[],P=[],L=[];for(let F=0;F<t;F++)b[F]=0,P[F]=0,L[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:P,attributeDivisors:L,object:R,attributes:{},index:null}}function d(R,b,P,L){let F=s.attributes,N=b.attributes,O=0,j=P.getAttributes();for(let z in j)if(j[z].location>=0){let ie=F[z],se=N[z];if(se===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(se=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(se=R.instanceColor)),ie===void 0||ie.attribute!==se||se&&ie.data!==se.data)return!0;O++}return s.attributesNum!==O||s.index!==L}function p(R,b,P,L){let F={},N=b.attributes,O=0,j=P.getAttributes();for(let z in j)if(j[z].location>=0){let ie=N[z];ie===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(ie=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(ie=R.instanceColor));let se={};se.attribute=ie,ie&&ie.data&&(se.data=ie.data),F[z]=se,O++}s.attributes=F,s.attributesNum=O,s.index=L}function v(){let R=s.newAttributes;for(let b=0,P=R.length;b<P;b++)R[b]=0}function m(R){g(R,0)}function g(R,b){let P=s.newAttributes,L=s.enabledAttributes,F=s.attributeDivisors;P[R]=1,L[R]===0&&(i.enableVertexAttribArray(R),L[R]=1),F[R]!==b&&(i.vertexAttribDivisor(R,b),F[R]=b)}function x(){let R=s.newAttributes,b=s.enabledAttributes;for(let P=0,L=b.length;P<L;P++)b[P]!==R[P]&&(i.disableVertexAttribArray(P),b[P]=0)}function A(R,b,P,L,F,N,O){O===!0?i.vertexAttribIPointer(R,b,P,F,N):i.vertexAttribPointer(R,b,P,L,F,N)}function y(R,b,P,L){v();let F=L.attributes,N=P.getAttributes(),O=b.defaultAttributeValues;for(let j in N){let z=N[j];if(z.location>=0){let I=F[j];if(I===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(I=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(I=R.instanceColor)),I!==void 0){let ie=I.normalized,se=I.itemSize,ye=e.get(I);if(ye===void 0)continue;let Re=ye.buffer,Y=ye.type,W=ye.bytesPerElement,Q=Y===i.INT||Y===i.UNSIGNED_INT||I.gpuType===zs;if(I.isInterleavedBufferAttribute){let re=I.data,te=re.stride,le=I.offset;if(re.isInstancedInterleavedBuffer){for(let fe=0;fe<z.locationSize;fe++)g(z.location+fe,re.meshPerAttribute);R.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let fe=0;fe<z.locationSize;fe++)m(z.location+fe);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let fe=0;fe<z.locationSize;fe++)A(z.location+fe,se/z.locationSize,Y,ie,te*W,(le+se/z.locationSize*fe)*W,Q)}else{if(I.isInstancedBufferAttribute){for(let re=0;re<z.locationSize;re++)g(z.location+re,I.meshPerAttribute);R.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let re=0;re<z.locationSize;re++)m(z.location+re);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let re=0;re<z.locationSize;re++)A(z.location+re,se/z.locationSize,Y,ie,se*W,se/z.locationSize*re*W,Q)}}else if(O!==void 0){let ie=O[j];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(z.location,ie);break;case 3:i.vertexAttrib3fv(z.location,ie);break;case 4:i.vertexAttrib4fv(z.location,ie);break;default:i.vertexAttrib1fv(z.location,ie)}}}}x()}function M(){S();for(let R in n){let b=n[R];for(let P in b){let L=b[P];for(let F in L){let N=L[F];for(let O in N)u(N[O].object),delete N[O];delete L[F]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;let b=n[R.id];for(let P in b){let L=b[P];for(let F in L){let N=L[F];for(let O in N)u(N[O].object),delete N[O];delete L[F]}}delete n[R.id]}function T(R){for(let b in n){let P=n[b];for(let L in P){let F=P[L];if(F[R.id]===void 0)continue;let N=F[R.id];for(let O in N)u(N[O].object),delete N[O];delete F[R.id]}}}function _(R){for(let b in n){let P=n[b],L=R.isInstancedMesh===!0?R.id:0,F=P[L];if(F!==void 0){for(let N in F){let O=F[N];for(let j in O)u(O[j].object),delete O[j];delete F[N]}delete P[L],Object.keys(P).length===0&&delete n[b]}}}function S(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:S,resetDefaultState:C,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function Bb(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),t.update(u,n,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let p=0;p<f;p++)d+=u[p];t.update(d,n,1)}function l(c,u,f,h){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)a(c[p],u[p],h[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v]*h[v];t.update(p,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ub(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==Sn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let _=T===ai&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==xt&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==nn&&!_)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:x,maxVaryings:A,maxFragmentUniforms:y,maxSamples:M,samples:E}}function Lb(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Di,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){let p=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,g=i.get(f);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{let x=s?0:n,A=x*4,y=g.clippingState||null;l.value=y,y=u(p,h,A,d);for(let M=0;M!==A;++M)y[M]=t[M];g.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,p){let v=f!==null?f.length:0,m=null;if(v!==0){if(m=l.value,p!==!0||m===null){let g=d+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<g)&&(m=new Float32Array(g));for(let A=0,y=d;A!==v;++A,y+=4)a.copy(f[A]).applyMatrix4(x,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var Xs=4,I_=[.125,.215,.35,.446,.526,.582],Ga=20,Fb=256,jc=new as,B_=new Xe,fg=null,dg=0,pg=0,mg=!1,Nb=new B,rl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=Nb}=s;fg=this._renderer.getRenderTarget(),dg=this._renderer.getActiveCubeFace(),pg=this._renderer.getActiveMipmapLevel(),mg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=F_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=L_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fg,dg,pg),this._renderer.xr.enabled=mg,e.scissorTest=!1,nl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Os||e.mapping===Oa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fg=this._renderer.getRenderTarget(),dg=this._renderer.getActiveCubeFace(),pg=this._renderer.getActiveMipmapLevel(),mg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:ai,format:Sn,colorSpace:Pi,depthBuffer:!1},r=U_(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=U_(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ob(s)),this._blurMaterial=zb(s,e,t),this._ggxMaterial=kb(s,e,t)}return r}_compileMaterial(e){let t=new Rt(new Lt,e);this._renderer.compile(t,jc)}_sceneToCubeUV(e,t,n,r,s){let l=new yn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(B_),f.toneMapping=qi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Rt(new Jo,new La({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,g=!1,x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,g=!0):(m.color.copy(B_),g=!0);for(let A=0;A<6;A++){let y=A%3;y===0?(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[A],s.y,s.z)):y===1?(l.up.set(0,0,c[A]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[A],s.z)):(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[A]));let M=this._cubeSize;nl(r,y*M,A>2?M:0,M,M),f.setRenderTarget(r),g&&f.render(v,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=x}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Os||e.mapping===Oa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=F_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=L_());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;nl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,jc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:p}=this,v=this._sizeLods[n],m=3*v*(n>p-Xs?n-p+Xs:0),g=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,nl(s,m,g,3*v,2*v),r.setRenderTarget(s),r.render(o,jc),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,nl(e,m,g,3*v,2*v),r.setRenderTarget(e),r.render(o,jc)}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ke("blur direction must be either latitudinal or longitudinal!");let u=3,f=this._lodMeshes[r];f.material=c;let h=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ga-1),v=s/p,m=isFinite(s)?1+Math.floor(u*v):Ga;m>Ga&&Je(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ga}`);let g=[],x=0;for(let T=0;T<Ga;++T){let _=T/v,S=Math.exp(-_*_/2);g.push(S),T===0?x+=S:T<m&&(x+=2*S)}for(let T=0;T<g.length;T++)g[T]=g[T]/x;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=g,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:A}=this;h.dTheta.value=p,h.mipInt.value=A-n;let y=this._sizeLods[r],M=3*y*(r>A-Xs?r-A+Xs:0),E=4*(this._cubeSize-y);nl(t,M,E,3*y,2*y),l.setRenderTarget(t),l.render(f,jc)}};function Ob(i){let e=[],t=[],n=[],r=i,s=i-Xs+1+I_.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Xs?l=I_[a-i+Xs-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,p=6,v=3,m=2,g=1,x=new Float32Array(v*p*d),A=new Float32Array(m*p*d),y=new Float32Array(g*p*d);for(let E=0;E<d;E++){let T=E%3*2/3-1,_=E>2?0:-1,S=[T,_,0,T+2/3,_,0,T+2/3,_+1,0,T,_,0,T+2/3,_+1,0,T,_+1,0];x.set(S,v*p*E),A.set(h,m*p*E);let C=[E,E,E,E,E,E];y.set(C,g*p*E)}let M=new Lt;M.setAttribute("position",new ut(x,v)),M.setAttribute("uv",new ut(A,m)),M.setAttribute("faceIndex",new ut(y,g)),n.push(new Rt(M,null)),r>Xs&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function U_(i,e,t){let n=new vt(i,e,t);return n.texture.mapping=Wc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function nl(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function kb(i,e,t){return new rt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rd(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function zb(i,e,t){let n=new Float32Array(Ga),r=new B(0,1,0);return new rt({name:"SphericalGaussianBlur",defines:{n:Ga,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:rd(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function L_(){return new rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rd(),fragmentShader:`

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
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function F_(){return new rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ft,depthTest:!1,depthWrite:!1})}function rd(){return`

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
	`}var sl=class extends vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Lc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Jo(5,5,5),s=new rt({name:"CubemapFromEquirect",uniforms:ka(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Ft});s.uniforms.tEquirect.value=t;let a=new Rt(r,s),o=t.minFilter;return t.minFilter===Fr&&(t.minFilter=Vt),new jo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Hb(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){let d=h.mapping;if(d===gf||d===vf)if(e.has(h)){let p=e.get(h).texture;return o(p,h.mapping)}else{let p=h.image;if(p&&p.height>0){let v=new sl(p.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let d=h.mapping,p=d===gf||d===vf,v=d===Os||d===Oa;if(p||v){let m=t.get(h),g=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return n===null&&(n=new rl(i)),m=p?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let x=h.image;return p&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new rl(i)),m=p?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,d){return d===gf?h.mapping=Os:d===vf&&(h.mapping=Oa),h}function l(h){let d=0,p=6;for(let v=0;v<p;v++)h[v]!==void 0&&d++;return d===p}function c(h){let d=h.target;d.removeEventListener("dispose",c);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function Gb(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Ec("WebGLRenderer: "+n+" extension not supported."),r}}}function Vb(i,e,t,n){let r={},s=new WeakMap;function a(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete r[h.id];let d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){let h=f.attributes;for(let d in h)e.update(h[d],i.ARRAY_BUFFER)}function c(f){let h=[],d=f.index,p=f.attributes.position,v=0;if(p===void 0)return;if(d!==null){let x=d.array;v=d.version;for(let A=0,y=x.length;A<y;A+=3){let M=x[A+0],E=x[A+1],T=x[A+2];h.push(M,E,E,T,T,M)}}else{let x=p.array;v=p.version;for(let A=0,y=x.length/3-1;A<y;A+=3){let M=A+0,E=A+1,T=A+2;h.push(M,E,E,T,T,M)}}let m=new(p.count>=65535?Rc:Cc)(h,1);m.version=v;let g=s.get(f);g&&e.remove(g),s.set(f,m)}function u(f){let h=s.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Wb(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*a),t.update(d,n,1)}function c(h,d,p){p!==0&&(i.drawElementsInstanced(n,d,s,h*a,p),t.update(d,n,p))}function u(h,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,p);let m=0;for(let g=0;g<p;g++)m+=d[g];t.update(m,n,1)}function f(h,d,p,v){if(p===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<h.length;g++)c(h[g]/a,d[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,v,0,p);let g=0;for(let x=0;x<p;x++)g+=d[x]*v[x];t.update(g,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Xb(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Yb(i,e,t){let n=new WeakMap,r=new St;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let S=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",S)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],A=0;d===!0&&(A=1),p===!0&&(A=2),v===!0&&(A=3);let y=o.attributes.position.count*A,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let E=new Float32Array(y*M*4*f),T=new bc(E,y,M,f);T.type=nn,T.needsUpdate=!0;let _=A*4;for(let C=0;C<f;C++){let R=m[C],b=g[C],P=x[C],L=y*M*4*C;for(let F=0;F<R.count;F++){let N=F*_;d===!0&&(r.fromBufferAttribute(R,F),E[L+N+0]=r.x,E[L+N+1]=r.y,E[L+N+2]=r.z,E[L+N+3]=0),p===!0&&(r.fromBufferAttribute(b,F),E[L+N+4]=r.x,E[L+N+5]=r.y,E[L+N+6]=r.z,E[L+N+7]=0),v===!0&&(r.fromBufferAttribute(P,F),E[L+N+8]=r.x,E[L+N+9]=r.y,E[L+N+10]=r.z,E[L+N+11]=P.itemSize===4?r.w:1)}}h={count:f,texture:T,size:new Se(y,M)},n.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function qb(i,e,t,n,r){let s=new WeakMap;function a(c){let u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Qb={[qm]:"LINEAR_TONE_MAPPING",[Qm]:"REINHARD_TONE_MAPPING",[Zm]:"CINEON_TONE_MAPPING",[Km]:"ACES_FILMIC_TONE_MAPPING",[jm]:"AGX_TONE_MAPPING",[$m]:"NEUTRAL_TONE_MAPPING",[Jm]:"CUSTOM_TONE_MAPPING"};function Zb(i,e,t,n,r){let s=new vt(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),a=new vt(e,t,{type:ai,depthBuffer:!1,stencilBuffer:!1}),o=new Lt;o.setAttribute("position",new on([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new on([0,2,0,0,2,0],2));let l=new tf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Rt(o,l),u=new as(-1,1,1,-1,0,1),f=null,h=null,d=!1,p,v=null,m=[],g=!1;this.setSize=function(x,A){s.setSize(x,A),a.setSize(x,A);for(let y=0;y<m.length;y++){let M=m[y];M.setSize&&M.setSize(x,A)}},this.setEffects=function(x){m=x,g=m.length>0&&m[0].isRenderPass===!0;let A=s.width,y=s.height;for(let M=0;M<m.length;M++){let E=m[M];E.setSize&&E.setSize(A,y)}},this.begin=function(x,A){if(d||x.toneMapping===qi&&m.length===0)return!1;if(v=A,A!==null){let y=A.width,M=A.height;(s.width!==y||s.height!==M)&&this.setSize(y,M)}return g===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=qi,!0},this.hasRenderPass=function(){return g},this.end=function(x,A){x.toneMapping=p,d=!0;let y=s,M=a;for(let E=0;E<m.length;E++){let T=m[E];if(T.enabled!==!1&&(T.render(x,M,y,A),T.needsSwap!==!1)){let _=y;y=M,M=_}}if(f!==x.outputColorSpace||h!==x.toneMapping){f=x.outputColorSpace,h=x.toneMapping,l.defines={},At.getTransfer(f)===Ut&&(l.defines.SRGB_TRANSFER="");let E=Qb[h];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(v),x.render(c,u),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),l.dispose()}}var ty=new Rn,xg=new Bi(1,1),ny=new bc,iy=new Kh,ry=new Lc,N_=[],O_=[],k_=new Float32Array(16),z_=new Float32Array(9),H_=new Float32Array(4);function al(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=N_[r];if(s===void 0&&(s=new Float32Array(r),N_[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Dn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function sd(i,e){let t=O_[e];t===void 0&&(t=new Int32Array(e),O_[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Kb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Jb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2fv(this.addr,e),Pn(t,e)}}function jb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dn(t,e))return;i.uniform3fv(this.addr,e),Pn(t,e)}}function $b(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4fv(this.addr,e),Pn(t,e)}}function ew(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;H_.set(n),i.uniformMatrix2fv(this.addr,!1,H_),Pn(t,n)}}function tw(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;z_.set(n),i.uniformMatrix3fv(this.addr,!1,z_),Pn(t,n)}}function nw(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pn(t,e)}else{if(Dn(t,n))return;k_.set(n),i.uniformMatrix4fv(this.addr,!1,k_),Pn(t,n)}}function iw(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function rw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2iv(this.addr,e),Pn(t,e)}}function sw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;i.uniform3iv(this.addr,e),Pn(t,e)}}function aw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4iv(this.addr,e),Pn(t,e)}}function ow(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function lw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;i.uniform2uiv(this.addr,e),Pn(t,e)}}function cw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;i.uniform3uiv(this.addr,e),Pn(t,e)}}function uw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;i.uniform4uiv(this.addr,e),Pn(t,e)}}function hw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(xg.compareFunction=t.isReversedDepthBuffer()?ed:$f,s=xg):s=ty,t.setTexture2D(e||s,r)}function fw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||iy,r)}function dw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ry,r)}function pw(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ny,r)}function mw(i){switch(i){case 5126:return Kb;case 35664:return Jb;case 35665:return jb;case 35666:return $b;case 35674:return ew;case 35675:return tw;case 35676:return nw;case 5124:case 35670:return iw;case 35667:case 35671:return rw;case 35668:case 35672:return sw;case 35669:case 35673:return aw;case 5125:return ow;case 36294:return lw;case 36295:return cw;case 36296:return uw;case 35678:case 36198:case 36298:case 36306:case 35682:return hw;case 35679:case 36299:case 36307:return fw;case 35680:case 36300:case 36308:case 36293:return dw;case 36289:case 36303:case 36311:case 36292:return pw}}function gw(i,e){i.uniform1fv(this.addr,e)}function vw(i,e){let t=al(e,this.size,2);i.uniform2fv(this.addr,t)}function xw(i,e){let t=al(e,this.size,3);i.uniform3fv(this.addr,t)}function _w(i,e){let t=al(e,this.size,4);i.uniform4fv(this.addr,t)}function yw(i,e){let t=al(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Aw(i,e){let t=al(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Sw(i,e){let t=al(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Mw(i,e){i.uniform1iv(this.addr,e)}function Tw(i,e){i.uniform2iv(this.addr,e)}function Ew(i,e){i.uniform3iv(this.addr,e)}function bw(i,e){i.uniform4iv(this.addr,e)}function ww(i,e){i.uniform1uiv(this.addr,e)}function Cw(i,e){i.uniform2uiv(this.addr,e)}function Rw(i,e){i.uniform3uiv(this.addr,e)}function Dw(i,e){i.uniform4uiv(this.addr,e)}function Pw(i,e,t){let n=this.cache,r=e.length,s=sd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=xg:a=ty;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Iw(i,e,t){let n=this.cache,r=e.length,s=sd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||iy,s[a])}function Bw(i,e,t){let n=this.cache,r=e.length,s=sd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ry,s[a])}function Uw(i,e,t){let n=this.cache,r=e.length,s=sd(t,r);Dn(n,s)||(i.uniform1iv(this.addr,s),Pn(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||ny,s[a])}function Lw(i){switch(i){case 5126:return gw;case 35664:return vw;case 35665:return xw;case 35666:return _w;case 35674:return yw;case 35675:return Aw;case 35676:return Sw;case 5124:case 35670:return Mw;case 35667:case 35671:return Tw;case 35668:case 35672:return Ew;case 35669:case 35673:return bw;case 5125:return ww;case 36294:return Cw;case 36295:return Rw;case 36296:return Dw;case 35678:case 36198:case 36298:case 36306:case 35682:return Pw;case 35679:case 36299:case 36307:return Iw;case 35680:case 36300:case 36308:case 36293:return Bw;case 36289:case 36303:case 36311:case 36292:return Uw}}var _g=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=mw(t.type)}},yg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lw(t.type)}},Ag=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},gg=/(\w+)(\])?(\[|\.)?/g;function G_(i,e){i.seq.push(e),i.map[e.id]=e}function Fw(i,e,t){let n=i.name,r=n.length;for(gg.lastIndex=0;;){let s=gg.exec(n),a=gg.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){G_(t,c===void 0?new _g(o,i,e):new yg(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Ag(o),G_(t,f)),t=f}}}var il=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Fw(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function V_(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Nw=37297,Ow=0;function kw(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var W_=new $e;function zw(i){At._getMatrix(W_,At.workingColorSpace,i);let e=`mat3( ${W_.elements.map(t=>t.toFixed(4))} )`;switch(At.getTransfer(i)){case Ac:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return Je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function X_(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+kw(i.getShaderSource(e),o)}else return s}function Hw(i,e){let t=zw(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Gw={[qm]:"Linear",[Qm]:"Reinhard",[Zm]:"Cineon",[Km]:"ACESFilmic",[jm]:"AgX",[$m]:"Neutral",[Jm]:"Custom"};function Vw(i,e){let t=Gw[e];return t===void 0?(Je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var nd=new B;function Ww(){At.getLuminanceCoefficients(nd);let i=nd.x.toFixed(4),e=nd.y.toFixed(4),t=nd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xw(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eu).join(`
`)}function Yw(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qw(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function eu(i){return i!==""}function Y_(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function q_(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Qw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sg(i){return i.replace(Qw,Kw)}var Zw=new Map;function Kw(i,e){let t=ht[e];if(t===void 0){let n=Zw.get(e);if(n!==void 0)t=ht[n],Je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Sg(t)}var Jw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Q_(i){return i.replace(Jw,jw)}function jw(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Z_(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var $w={[Vc]:"SHADOWMAP_TYPE_PCF",[$o]:"SHADOWMAP_TYPE_VSM"};function eC(i){return $w[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var tC={[Os]:"ENVMAP_TYPE_CUBE",[Oa]:"ENVMAP_TYPE_CUBE",[Wc]:"ENVMAP_TYPE_CUBE_UV"};function nC(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":tC[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var iC={[Oa]:"ENVMAP_MODE_REFRACTION"};function rC(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":iC[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var sC={[Ym]:"ENVMAP_BLENDING_MULTIPLY",[p_]:"ENVMAP_BLENDING_MIX",[m_]:"ENVMAP_BLENDING_ADD"};function aC(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":sC[i.combine]||"ENVMAP_BLENDING_NONE"}function oC(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function lC(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=eC(t),c=nC(t),u=rC(t),f=aC(t),h=oC(t),d=Xw(t),p=Yw(s),v=r.createProgram(),m,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(eu).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(eu).join(`
`),g.length>0&&(g+=`
`)):(m=[Z_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eu).join(`
`),g=[Z_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qi?"#define TONE_MAPPING":"",t.toneMapping!==qi?ht.tonemapping_pars_fragment:"",t.toneMapping!==qi?Vw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Hw("linearToOutputTexel",t.outputColorSpace),Ww(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(eu).join(`
`)),a=Sg(a),a=Y_(a,t),a=q_(a,t),o=Sg(o),o=Y_(o,t),o=q_(o,t),a=Q_(a),o=Q_(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let A=x+m+a,y=x+g+o,M=V_(r,r.VERTEX_SHADER,A),E=V_(r,r.FRAGMENT_SHADER,y);r.attachShader(v,M),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function T(R){if(i.debug.checkShaderErrors){let b=r.getProgramInfoLog(v)||"",P=r.getShaderInfoLog(M)||"",L=r.getShaderInfoLog(E)||"",F=b.trim(),N=P.trim(),O=L.trim(),j=!0,z=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,M,E);else{let I=X_(r,M,"vertex"),ie=X_(r,E,"fragment");Ke("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+I+`
`+ie)}else F!==""?Je("WebGLProgram: Program Info Log:",F):(N===""||O==="")&&(z=!1);z&&(R.diagnostics={runnable:j,programLog:F,vertexShader:{log:N,prefix:m},fragmentShader:{log:O,prefix:g}})}r.deleteShader(M),r.deleteShader(E),_=new il(r,v),S=qw(r,v)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(v,Nw)),C},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ow++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=E,this}var cC=0,Mg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Tg(e),t.set(e,n)),n}},Tg=class{constructor(e){this.id=cC++,this.code=e,this.usedTimes=0}};function uC(i,e,t,n,r,s){let a=new wc,o=new Mg,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,S,C,R,b){let P=R.fog,L=b.geometry,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,N=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,O=e.get(_.envMap||F,N),j=O&&O.mapping===Wc?O.image.height:null,z=d[_.type];_.precision!==null&&(h=n.getMaxPrecision(_.precision),h!==_.precision&&Je("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));let I=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ie=I!==void 0?I.length:0,se=0;L.morphAttributes.position!==void 0&&(se=1),L.morphAttributes.normal!==void 0&&(se=2),L.morphAttributes.color!==void 0&&(se=3);let ye,Re,Y,W;if(z){let Pe=kr[z];ye=Pe.vertexShader,Re=Pe.fragmentShader}else ye=_.vertexShader,Re=_.fragmentShader,o.update(_),Y=o.getVertexShaderID(_),W=o.getFragmentShaderID(_);let Q=i.getRenderTarget(),re=i.state.buffers.depth.getReversed(),te=b.isInstancedMesh===!0,le=b.isBatchedMesh===!0,fe=!!_.map,Me=!!_.matcap,oe=!!O,De=!!_.aoMap,ke=!!_.lightMap,ve=!!_.bumpMap,X=!!_.normalMap,k=!!_.displacementMap,qe=!!_.emissiveMap,Ie=!!_.metalnessMap,Be=!!_.roughnessMap,me=_.anisotropy>0,U=_.clearcoat>0,w=_.dispersion>0,G=_.iridescence>0,ee=_.sheen>0,$=_.transmission>0,K=me&&!!_.anisotropyMap,Ae=U&&!!_.clearcoatMap,de=U&&!!_.clearcoatNormalMap,Ge=U&&!!_.clearcoatRoughnessMap,Ue=G&&!!_.iridescenceMap,ce=G&&!!_.iridescenceThicknessMap,he=ee&&!!_.sheenColorMap,Le=ee&&!!_.sheenRoughnessMap,Ne=!!_.specularMap,Te=!!_.specularColorMap,et=!!_.specularIntensityMap,H=$&&!!_.transmissionMap,pe=$&&!!_.thicknessMap,ue=!!_.gradientMap,Ee=!!_.alphaMap,ae=_.alphaTest>0,ne=!!_.alphaHash,Fe=!!_.extensions,Qe=qi;_.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Qe=i.toneMapping);let Tt={shaderID:z,shaderType:_.type,shaderName:_.name,vertexShader:ye,fragmentShader:Re,defines:_.defines,customVertexShaderID:Y,customFragmentShaderID:W,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:le,batchingColor:le&&b._colorsTexture!==null,instancing:te,instancingColor:te&&b.instanceColor!==null,instancingMorph:te&&b.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Pi,alphaToCoverage:!!_.alphaToCoverage,map:fe,matcap:Me,envMap:oe,envMapMode:oe&&O.mapping,envMapCubeUVHeight:j,aoMap:De,lightMap:ke,bumpMap:ve,normalMap:X,displacementMap:k,emissiveMap:qe,normalMapObjectSpace:X&&_.normalMapType===v_,normalMapTangentSpace:X&&_.normalMapType===sg,metalnessMap:Ie,roughnessMap:Be,anisotropy:me,anisotropyMap:K,clearcoat:U,clearcoatMap:Ae,clearcoatNormalMap:de,clearcoatRoughnessMap:Ge,dispersion:w,iridescence:G,iridescenceMap:Ue,iridescenceThicknessMap:ce,sheen:ee,sheenColorMap:he,sheenRoughnessMap:Le,specularMap:Ne,specularColorMap:Te,specularIntensityMap:et,transmission:$,transmissionMap:H,thicknessMap:pe,gradientMap:ue,opaque:_.transparent===!1&&_.blending===Ia&&_.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ae,alphaHash:ne,combine:_.combine,mapUv:fe&&p(_.map.channel),aoMapUv:De&&p(_.aoMap.channel),lightMapUv:ke&&p(_.lightMap.channel),bumpMapUv:ve&&p(_.bumpMap.channel),normalMapUv:X&&p(_.normalMap.channel),displacementMapUv:k&&p(_.displacementMap.channel),emissiveMapUv:qe&&p(_.emissiveMap.channel),metalnessMapUv:Ie&&p(_.metalnessMap.channel),roughnessMapUv:Be&&p(_.roughnessMap.channel),anisotropyMapUv:K&&p(_.anisotropyMap.channel),clearcoatMapUv:Ae&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:de&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:he&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Le&&p(_.sheenRoughnessMap.channel),specularMapUv:Ne&&p(_.specularMap.channel),specularColorMapUv:Te&&p(_.specularColorMap.channel),specularIntensityMapUv:et&&p(_.specularIntensityMap.channel),transmissionMapUv:H&&p(_.transmissionMap.channel),thicknessMapUv:pe&&p(_.thicknessMap.channel),alphaMapUv:Ee&&p(_.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(X||me),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!L.attributes.uv&&(fe||Ee),fog:!!P,useFog:_.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||L.attributes.normal===void 0&&X===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:re,skinning:b.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:se,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,decodeVideoTexture:fe&&_.map.isVideoTexture===!0&&At.getTransfer(_.map.colorSpace)===Ut,decodeVideoTextureEmissive:qe&&_.emissiveMap.isVideoTexture===!0&&At.getTransfer(_.emissiveMap.colorSpace)===Ut,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gn,flipSided:_.side===tn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Fe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&_.extensions.multiDraw===!0||le)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function m(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)S.push(C),S.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(g(S,_),x(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function g(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function x(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),_.push(a.mask)}function A(_){let S=d[_.type],C;if(S){let R=kr[S];C=D_.clone(R.uniforms)}else C=_.uniforms;return C}function y(_,S){let C=u.get(S);return C!==void 0?++C.usedTimes:(C=new lC(i,S,_,r),c.push(C),u.set(S,C)),C}function M(_){if(--_.usedTimes===0){let S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function T(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:A,acquireProgram:y,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:T}}function hC(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function fC(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function K_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function J_(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,v,m,g){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:m,group:g},i[e]=x):(x.id=h.id,x.object=h,x.geometry=d,x.material=p,x.materialVariant=a(h),x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=m,x.group=g),e++,x}function l(h,d,p,v,m,g){let x=o(h,d,p,v,m,g);p.transmission>0?n.push(x):p.transparent===!0?r.push(x):t.push(x)}function c(h,d,p,v,m,g){let x=o(h,d,p,v,m,g);p.transmission>0?n.unshift(x):p.transparent===!0?r.unshift(x):t.unshift(x)}function u(h,d){t.length>1&&t.sort(h||fC),n.length>1&&n.sort(d||K_),r.length>1&&r.sort(d||K_)}function f(){for(let h=e,d=i.length;h<d;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function dC(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new J_,i.set(n,[a])):r>=s.length?(a=new J_,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function pC(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Xe};break;case"SpotLight":t={position:new B,direction:new B,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function mC(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var gC=0;function vC(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function xC(i){let e=new pC,t=mC(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);let r=new B,s=new je,a=new je;function o(c){let u=0,f=0,h=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,p=0,v=0,m=0,g=0,x=0,A=0,y=0,M=0,E=0,T=0;c.sort(vC);for(let S=0,C=c.length;S<C;S++){let R=c[S],b=R.color,P=R.intensity,L=R.distance,F=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===os?F=R.shadow.map.texture:F=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=b.r*P,f+=b.g*P,h+=b.b*P;else if(R.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(R.sh.coefficients[N],P);T++}else if(R.isDirectionalLight){let N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let O=R.shadow,j=t.get(R);j.shadowIntensity=O.intensity,j.shadowBias=O.bias,j.shadowNormalBias=O.normalBias,j.shadowRadius=O.radius,j.shadowMapSize=O.mapSize,n.directionalShadow[d]=j,n.directionalShadowMap[d]=F,n.directionalShadowMatrix[d]=R.shadow.matrix,x++}n.directional[d]=N,d++}else if(R.isSpotLight){let N=e.get(R);N.position.setFromMatrixPosition(R.matrixWorld),N.color.copy(b).multiplyScalar(P),N.distance=L,N.coneCos=Math.cos(R.angle),N.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),N.decay=R.decay,n.spot[v]=N;let O=R.shadow;if(R.map&&(n.spotLightMap[M]=R.map,M++,O.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[v]=O.matrix,R.castShadow){let j=t.get(R);j.shadowIntensity=O.intensity,j.shadowBias=O.bias,j.shadowNormalBias=O.normalBias,j.shadowRadius=O.radius,j.shadowMapSize=O.mapSize,n.spotShadow[v]=j,n.spotShadowMap[v]=F,y++}v++}else if(R.isRectAreaLight){let N=e.get(R);N.color.copy(b).multiplyScalar(P),N.halfWidth.set(R.width*.5,0,0),N.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=N,m++}else if(R.isPointLight){let N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),N.distance=R.distance,N.decay=R.decay,R.castShadow){let O=R.shadow,j=t.get(R);j.shadowIntensity=O.intensity,j.shadowBias=O.bias,j.shadowNormalBias=O.normalBias,j.shadowRadius=O.radius,j.shadowMapSize=O.mapSize,j.shadowCameraNear=O.camera.near,j.shadowCameraFar=O.camera.far,n.pointShadow[p]=j,n.pointShadowMap[p]=F,n.pointShadowMatrix[p]=R.shadow.matrix,A++}n.point[p]=N,p++}else if(R.isHemisphereLight){let N=e.get(R);N.skyColor.copy(R.color).multiplyScalar(P),N.groundColor.copy(R.groundColor).multiplyScalar(P),n.hemi[g]=N,g++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let _=n.hash;(_.directionalLength!==d||_.pointLength!==p||_.spotLength!==v||_.rectAreaLength!==m||_.hemiLength!==g||_.numDirectionalShadows!==x||_.numPointShadows!==A||_.numSpotShadows!==y||_.numSpotMaps!==M||_.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=y+M-E,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,_.directionalLength=d,_.pointLength=p,_.spotLength=v,_.rectAreaLength=m,_.hemiLength=g,_.numDirectionalShadows=x,_.numPointShadows=A,_.numSpotShadows=y,_.numSpotMaps=M,_.numLightProbes=T,n.version=gC++)}function l(c,u){let f=0,h=0,d=0,p=0,v=0,m=u.matrixWorldInverse;for(let g=0,x=c.length;g<x;g++){let A=c[g];if(A.isDirectionalLight){let y=n.directional[f];y.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(A.isSpotLight){let y=n.spot[d];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),d++}else if(A.isRectAreaLight){let y=n.rectArea[p];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(A.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(A.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),h++}else if(A.isHemisphereLight){let y=n.hemi[v];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function j_(i){let e=new xC(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function _C(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new j_(i),e.set(r,[o])):s>=a.length?(o=new j_(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var yC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AC=`uniform sampler2D shadow_pass;
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
}`,SC=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],MC=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],$_=new je,$c=new B,vg=new B;function TC(i,e,t){let n=new Bc,r=new Se,s=new Se,a=new St,o=new nf,l=new rf,c={},u=t.maxTextureSize,f={[ri]:tn,[tn]:ri,[gn]:gn},h=new rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:yC,fragmentShader:AC}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let p=new Lt;p.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Rt(p,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vc;let g=this.type;this.render=function(E,T,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Zx&&(Je("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Vc);let S=i.getRenderTarget(),C=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),b=i.state;b.setBlending(Ft),b.buffers.depth.getReversed()===!0?b.buffers.color.setClear(0,0,0,0):b.buffers.color.setClear(1,1,1,1),b.buffers.depth.setTest(!0),b.setScissorTest(!1);let P=g!==this.type;P&&T.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(F=>F.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,F=E.length;L<F;L++){let N=E[L],O=N.shadow;if(O===void 0){Je("WebGLShadowMap:",N,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);let j=O.getFrameExtents();r.multiply(j),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,O.mapSize.y=s.y));let z=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=z,O.map===null||P===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===$o){if(N.isPointLight){Je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new vt(r.x,r.y,{format:os,type:ai,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),O.map.texture.name=N.name+".shadowMap",O.map.depthTexture=new Bi(r.x,r.y,nn),O.map.depthTexture.name=N.name+".shadowMapDepth",O.map.depthTexture.format=sr,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ct,O.map.depthTexture.magFilter=Ct}else N.isPointLight?(O.map=new sl(r.x),O.map.depthTexture=new $h(r.x,An)):(O.map=new vt(r.x,r.y),O.map.depthTexture=new Bi(r.x,r.y,An)),O.map.depthTexture.name=N.name+".shadowMap",O.map.depthTexture.format=sr,this.type===Vc?(O.map.depthTexture.compareFunction=z?ed:$f,O.map.depthTexture.minFilter=Vt,O.map.depthTexture.magFilter=Vt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ct,O.map.depthTexture.magFilter=Ct);O.camera.updateProjectionMatrix()}let I=O.map.isWebGLCubeRenderTarget?6:1;for(let ie=0;ie<I;ie++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(O.map),i.clear());let se=O.getViewport(ie);a.set(s.x*se.x,s.y*se.y,s.x*se.z,s.y*se.w),b.viewport(a)}if(N.isPointLight){let se=O.camera,ye=O.matrix,Re=N.distance||se.far;Re!==se.far&&(se.far=Re,se.updateProjectionMatrix()),$c.setFromMatrixPosition(N.matrixWorld),se.position.copy($c),vg.copy(se.position),vg.add(SC[ie]),se.up.copy(MC[ie]),se.lookAt(vg),se.updateMatrixWorld(),ye.makeTranslation(-$c.x,-$c.y,-$c.z),$_.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),O._frustum.setFromProjectionMatrix($_,se.coordinateSystem,se.reversedDepth)}else O.updateMatrices(N);n=O.getFrustum(),y(T,_,O.camera,N,this.type)}O.isPointLightShadow!==!0&&this.type===$o&&x(O,_),O.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(S,C,R)};function x(E,T){let _=e.update(v);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new vt(r.x,r.y,{format:os,type:ai})),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(T,null,_,h,v,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(T,null,_,d,v,null)}function A(E,T,_,S){let C=null,R=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)C=R;else if(C=_.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let b=C.uuid,P=T.uuid,L=c[b];L===void 0&&(L={},c[b]=L);let F=L[P];F===void 0&&(F=C.clone(),L[P]=F,T.addEventListener("dispose",M)),C=F}if(C.visible=T.visible,C.wireframe=T.wireframe,S===$o?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:f[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let b=i.properties.get(C);b.light=_}return C}function y(E,T,_,S,C){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&C===$o)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);let P=e.update(E),L=E.material;if(Array.isArray(L)){let F=P.groups;for(let N=0,O=F.length;N<O;N++){let j=F[N],z=L[j.materialIndex];if(z&&z.visible){let I=A(E,z,S,C);E.onBeforeShadow(i,E,T,_,P,I,j),i.renderBufferDirect(_,null,P,I,E,j),E.onAfterShadow(i,E,T,_,P,I,j)}}}else if(L.visible){let F=A(E,L,S,C);E.onBeforeShadow(i,E,T,_,P,F,null),i.renderBufferDirect(_,null,P,F,E,null),E.onAfterShadow(i,E,T,_,P,F,null)}}let b=E.children;for(let P=0,L=b.length;P<L;P++)y(b[P],T,_,S,C)}function M(E){E.target.removeEventListener("dispose",M);for(let _ in c){let S=c[_],C=E.target.uuid;C in S&&(S[C].dispose(),delete S[C])}}}function EC(i,e){function t(){let H=!1,pe=new St,ue=null,Ee=new St(0,0,0,0);return{setMask:function(ae){ue!==ae&&!H&&(i.colorMask(ae,ae,ae,ae),ue=ae)},setLocked:function(ae){H=ae},setClear:function(ae,ne,Fe,Qe,Tt){Tt===!0&&(ae*=Qe,ne*=Qe,Fe*=Qe),pe.set(ae,ne,Fe,Qe),Ee.equals(pe)===!1&&(i.clearColor(ae,ne,Fe,Qe),Ee.copy(pe))},reset:function(){H=!1,ue=null,Ee.set(-1,0,0,0)}}}function n(){let H=!1,pe=!1,ue=null,Ee=null,ae=null;return{setReversed:function(ne){if(pe!==ne){let Fe=e.get("EXT_clip_control");ne?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT),pe=ne;let Qe=ae;ae=null,this.setClear(Qe)}},getReversed:function(){return pe},setTest:function(ne){ne?Q(i.DEPTH_TEST):re(i.DEPTH_TEST)},setMask:function(ne){ue!==ne&&!H&&(i.depthMask(ne),ue=ne)},setFunc:function(ne){if(pe&&(ne=w_[ne]),Ee!==ne){switch(ne){case kh:i.depthFunc(i.NEVER);break;case Vo:i.depthFunc(i.ALWAYS);break;case zh:i.depthFunc(i.LESS);break;case Ba:i.depthFunc(i.LEQUAL);break;case Hh:i.depthFunc(i.EQUAL);break;case Gh:i.depthFunc(i.GEQUAL);break;case Vh:i.depthFunc(i.GREATER);break;case Wh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=ne}},setLocked:function(ne){H=ne},setClear:function(ne){ae!==ne&&(ae=ne,pe&&(ne=1-ne),i.clearDepth(ne))},reset:function(){H=!1,ue=null,Ee=null,ae=null,pe=!1}}}function r(){let H=!1,pe=null,ue=null,Ee=null,ae=null,ne=null,Fe=null,Qe=null,Tt=null;return{setTest:function(Pe){H||(Pe?Q(i.STENCIL_TEST):re(i.STENCIL_TEST))},setMask:function(Pe){pe!==Pe&&!H&&(i.stencilMask(Pe),pe=Pe)},setFunc:function(Pe,Ve,ct){(ue!==Pe||Ee!==Ve||ae!==ct)&&(i.stencilFunc(Pe,Ve,ct),ue=Pe,Ee=Ve,ae=ct)},setOp:function(Pe,Ve,ct){(ne!==Pe||Fe!==Ve||Qe!==ct)&&(i.stencilOp(Pe,Ve,ct),ne=Pe,Fe=Ve,Qe=ct)},setLocked:function(Pe){H=Pe},setClear:function(Pe){Tt!==Pe&&(i.clearStencil(Pe),Tt=Pe)},reset:function(){H=!1,pe=null,ue=null,Ee=null,ae=null,ne=null,Fe=null,Qe=null,Tt=null}}}let s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap,u={},f={},h=new WeakMap,d=[],p=null,v=!1,m=null,g=null,x=null,A=null,y=null,M=null,E=null,T=new Xe(0,0,0),_=0,S=!1,C=null,R=null,b=null,P=null,L=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,O=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(j)[1]),N=O>=1):j.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),N=O>=2);let z=null,I={},ie=i.getParameter(i.SCISSOR_BOX),se=i.getParameter(i.VIEWPORT),ye=new St().fromArray(ie),Re=new St().fromArray(se);function Y(H,pe,ue,Ee){let ae=new Uint8Array(4),ne=i.createTexture();i.bindTexture(H,ne),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Fe=0;Fe<ue;Fe++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(pe+Fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return ne}let W={};W[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),W[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),W[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(Ba),ve(!1),X(Vm),Q(i.CULL_FACE),De(Ft);function Q(H){u[H]!==!0&&(i.enable(H),u[H]=!0)}function re(H){u[H]!==!1&&(i.disable(H),u[H]=!1)}function te(H,pe){return f[H]!==pe?(i.bindFramebuffer(H,pe),f[H]=pe,H===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=pe),H===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function le(H,pe){let ue=d,Ee=!1;if(H){ue=h.get(pe),ue===void 0&&(ue=[],h.set(pe,ue));let ae=H.textures;if(ue.length!==ae.length||ue[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,Fe=ae.length;ne<Fe;ne++)ue[ne]=i.COLOR_ATTACHMENT0+ne;ue.length=ae.length,Ee=!0}}else ue[0]!==i.BACK&&(ue[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(ue)}function fe(H){return p!==H?(i.useProgram(H),p=H,!0):!1}let Me={[Bs]:i.FUNC_ADD,[Jx]:i.FUNC_SUBTRACT,[jx]:i.FUNC_REVERSE_SUBTRACT};Me[$x]=i.MIN,Me[e_]=i.MAX;let oe={[t_]:i.ZERO,[n_]:i.ONE,[i_]:i.SRC_COLOR,[Nh]:i.SRC_ALPHA,[c_]:i.SRC_ALPHA_SATURATE,[o_]:i.DST_COLOR,[s_]:i.DST_ALPHA,[r_]:i.ONE_MINUS_SRC_COLOR,[Oh]:i.ONE_MINUS_SRC_ALPHA,[l_]:i.ONE_MINUS_DST_COLOR,[a_]:i.ONE_MINUS_DST_ALPHA,[u_]:i.CONSTANT_COLOR,[h_]:i.ONE_MINUS_CONSTANT_COLOR,[f_]:i.CONSTANT_ALPHA,[d_]:i.ONE_MINUS_CONSTANT_ALPHA};function De(H,pe,ue,Ee,ae,ne,Fe,Qe,Tt,Pe){if(H===Ft){v===!0&&(re(i.BLEND),v=!1);return}if(v===!1&&(Q(i.BLEND),v=!0),H!==Kx){if(H!==m||Pe!==S){if((g!==Bs||y!==Bs)&&(i.blendEquation(i.FUNC_ADD),g=Bs,y=Bs),Pe)switch(H){case Ia:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ns:i.blendFunc(i.ONE,i.ONE);break;case Wm:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xm:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ke("WebGLState: Invalid blending: ",H);break}else switch(H){case Ia:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wm:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xm:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",H);break}x=null,A=null,M=null,E=null,T.set(0,0,0),_=0,m=H,S=Pe}return}ae=ae||pe,ne=ne||ue,Fe=Fe||Ee,(pe!==g||ae!==y)&&(i.blendEquationSeparate(Me[pe],Me[ae]),g=pe,y=ae),(ue!==x||Ee!==A||ne!==M||Fe!==E)&&(i.blendFuncSeparate(oe[ue],oe[Ee],oe[ne],oe[Fe]),x=ue,A=Ee,M=ne,E=Fe),(Qe.equals(T)===!1||Tt!==_)&&(i.blendColor(Qe.r,Qe.g,Qe.b,Tt),T.copy(Qe),_=Tt),m=H,S=!1}function ke(H,pe){H.side===gn?re(i.CULL_FACE):Q(i.CULL_FACE);let ue=H.side===tn;pe&&(ue=!ue),ve(ue),H.blending===Ia&&H.transparent===!1?De(Ft):De(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);let Ee=H.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),qe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):re(i.SAMPLE_ALPHA_TO_COVERAGE)}function ve(H){C!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),C=H)}function X(H){H!==qx?(Q(i.CULL_FACE),H!==R&&(H===Vm?i.cullFace(i.BACK):H===Qx?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):re(i.CULL_FACE),R=H}function k(H){H!==b&&(N&&i.lineWidth(H),b=H)}function qe(H,pe,ue){H?(Q(i.POLYGON_OFFSET_FILL),(P!==pe||L!==ue)&&(P=pe,L=ue,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,ue))):re(i.POLYGON_OFFSET_FILL)}function Ie(H){H?Q(i.SCISSOR_TEST):re(i.SCISSOR_TEST)}function Be(H){H===void 0&&(H=i.TEXTURE0+F-1),z!==H&&(i.activeTexture(H),z=H)}function me(H,pe,ue){ue===void 0&&(z===null?ue=i.TEXTURE0+F-1:ue=z);let Ee=I[ue];Ee===void 0&&(Ee={type:void 0,texture:void 0},I[ue]=Ee),(Ee.type!==H||Ee.texture!==pe)&&(z!==ue&&(i.activeTexture(ue),z=ue),i.bindTexture(H,pe||W[H]),Ee.type=H,Ee.texture=pe)}function U(){let H=I[z];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(H){Ke("WebGLState:",H)}}function G(){try{i.compressedTexImage3D(...arguments)}catch(H){Ke("WebGLState:",H)}}function ee(){try{i.texSubImage2D(...arguments)}catch(H){Ke("WebGLState:",H)}}function $(){try{i.texSubImage3D(...arguments)}catch(H){Ke("WebGLState:",H)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(H){Ke("WebGLState:",H)}}function Ae(){try{i.compressedTexSubImage3D(...arguments)}catch(H){Ke("WebGLState:",H)}}function de(){try{i.texStorage2D(...arguments)}catch(H){Ke("WebGLState:",H)}}function Ge(){try{i.texStorage3D(...arguments)}catch(H){Ke("WebGLState:",H)}}function Ue(){try{i.texImage2D(...arguments)}catch(H){Ke("WebGLState:",H)}}function ce(){try{i.texImage3D(...arguments)}catch(H){Ke("WebGLState:",H)}}function he(H){ye.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),ye.copy(H))}function Le(H){Re.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Re.copy(H))}function Ne(H,pe){let ue=c.get(pe);ue===void 0&&(ue=new WeakMap,c.set(pe,ue));let Ee=ue.get(H);Ee===void 0&&(Ee=i.getUniformBlockIndex(pe,H.name),ue.set(H,Ee))}function Te(H,pe){let Ee=c.get(pe).get(H);l.get(pe)!==Ee&&(i.uniformBlockBinding(pe,Ee,H.__bindingPointIndex),l.set(pe,Ee))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},z=null,I={},f={},h=new WeakMap,d=[],p=null,v=!1,m=null,g=null,x=null,A=null,y=null,M=null,E=null,T=new Xe(0,0,0),_=0,S=!1,C=null,R=null,b=null,P=null,L=null,ye.set(0,0,i.canvas.width,i.canvas.height),Re.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Q,disable:re,bindFramebuffer:te,drawBuffers:le,useProgram:fe,setBlending:De,setMaterial:ke,setFlipSided:ve,setCullFace:X,setLineWidth:k,setPolygonOffset:qe,setScissorTest:Ie,activeTexture:Be,bindTexture:me,unbindTexture:U,compressedTexImage2D:w,compressedTexImage3D:G,texImage2D:Ue,texImage3D:ce,updateUBOMapping:Ne,uniformBlockBinding:Te,texStorage2D:de,texStorage3D:Ge,texSubImage2D:ee,texSubImage3D:$,compressedTexSubImage2D:K,compressedTexSubImage3D:Ae,scissor:he,viewport:Le,reset:et}}function bC(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,u=new WeakMap,f,h=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(U,w){return d?new OffscreenCanvas(U,w):Mc("canvas")}function v(U,w,G){let ee=1,$=me(U);if(($.width>G||$.height>G)&&(ee=G/Math.max($.width,$.height)),ee<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){let K=Math.floor(ee*$.width),Ae=Math.floor(ee*$.height);f===void 0&&(f=p(K,Ae));let de=w?p(K,Ae):f;return de.width=K,de.height=Ae,de.getContext("2d").drawImage(U,0,0,K,Ae),Je("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+K+"x"+Ae+")."),de}else return"data"in U&&Je("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),U;return U}function m(U){return U.generateMipmaps}function g(U){i.generateMipmap(U)}function x(U){return U.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?i.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(U,w,G,ee,$=!1){if(U!==null){if(i[U]!==void 0)return i[U];Je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let K=w;if(w===i.RED&&(G===i.FLOAT&&(K=i.R32F),G===i.HALF_FLOAT&&(K=i.R16F),G===i.UNSIGNED_BYTE&&(K=i.R8)),w===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.R8UI),G===i.UNSIGNED_SHORT&&(K=i.R16UI),G===i.UNSIGNED_INT&&(K=i.R32UI),G===i.BYTE&&(K=i.R8I),G===i.SHORT&&(K=i.R16I),G===i.INT&&(K=i.R32I)),w===i.RG&&(G===i.FLOAT&&(K=i.RG32F),G===i.HALF_FLOAT&&(K=i.RG16F),G===i.UNSIGNED_BYTE&&(K=i.RG8)),w===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RG8UI),G===i.UNSIGNED_SHORT&&(K=i.RG16UI),G===i.UNSIGNED_INT&&(K=i.RG32UI),G===i.BYTE&&(K=i.RG8I),G===i.SHORT&&(K=i.RG16I),G===i.INT&&(K=i.RG32I)),w===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGB8UI),G===i.UNSIGNED_SHORT&&(K=i.RGB16UI),G===i.UNSIGNED_INT&&(K=i.RGB32UI),G===i.BYTE&&(K=i.RGB8I),G===i.SHORT&&(K=i.RGB16I),G===i.INT&&(K=i.RGB32I)),w===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),G===i.UNSIGNED_INT&&(K=i.RGBA32UI),G===i.BYTE&&(K=i.RGBA8I),G===i.SHORT&&(K=i.RGBA16I),G===i.INT&&(K=i.RGBA32I)),w===i.RGB&&(G===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),w===i.RGBA){let Ae=$?Ac:At.getTransfer(ee);G===i.FLOAT&&(K=i.RGBA32F),G===i.HALF_FLOAT&&(K=i.RGBA16F),G===i.UNSIGNED_BYTE&&(K=Ae===Ut?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function y(U,w){let G;return U?w===null||w===An||w===Nr?G=i.DEPTH24_STENCIL8:w===nn?G=i.DEPTH32F_STENCIL8:w===ks&&(G=i.DEPTH24_STENCIL8,Je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===An||w===Nr?G=i.DEPTH_COMPONENT24:w===nn?G=i.DEPTH_COMPONENT32F:w===ks&&(G=i.DEPTH_COMPONENT16),G}function M(U,w){return m(U)===!0||U.isFramebufferTexture&&U.minFilter!==Ct&&U.minFilter!==Vt?Math.log2(Math.max(w.width,w.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?w.mipmaps.length:1}function E(U){let w=U.target;w.removeEventListener("dispose",E),_(w),w.isVideoTexture&&u.delete(w)}function T(U){let w=U.target;w.removeEventListener("dispose",T),C(w)}function _(U){let w=n.get(U);if(w.__webglInit===void 0)return;let G=U.source,ee=h.get(G);if(ee){let $=ee[w.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(U),Object.keys(ee).length===0&&h.delete(G)}n.remove(U)}function S(U){let w=n.get(U);i.deleteTexture(w.__webglTexture);let G=U.source,ee=h.get(G);delete ee[w.__cacheKey],a.memory.textures--}function C(U){let w=n.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),n.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(w.__webglFramebuffer[ee]))for(let $=0;$<w.__webglFramebuffer[ee].length;$++)i.deleteFramebuffer(w.__webglFramebuffer[ee][$]);else i.deleteFramebuffer(w.__webglFramebuffer[ee]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[ee])}else{if(Array.isArray(w.__webglFramebuffer))for(let ee=0;ee<w.__webglFramebuffer.length;ee++)i.deleteFramebuffer(w.__webglFramebuffer[ee]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ee=0;ee<w.__webglColorRenderbuffer.length;ee++)w.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[ee]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let G=U.textures;for(let ee=0,$=G.length;ee<$;ee++){let K=n.get(G[ee]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(G[ee])}n.remove(U)}let R=0;function b(){R=0}function P(){let U=R;return U>=r.maxTextures&&Je("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+r.maxTextures),R+=1,U}function L(U){let w=[];return w.push(U.wrapS),w.push(U.wrapT),w.push(U.wrapR||0),w.push(U.magFilter),w.push(U.minFilter),w.push(U.anisotropy),w.push(U.internalFormat),w.push(U.format),w.push(U.type),w.push(U.generateMipmaps),w.push(U.premultiplyAlpha),w.push(U.flipY),w.push(U.unpackAlignment),w.push(U.colorSpace),w.join()}function F(U,w){let G=n.get(U);if(U.isVideoTexture&&Ie(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&G.__version!==U.version){let ee=U.image;if(ee===null)Je("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)Je("WebGLRenderer: Texture marked for update but image is incomplete");else{W(G,U,w);return}}else U.isExternalTexture&&(G.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+w)}function N(U,w){let G=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&G.__version!==U.version){W(G,U,w);return}else U.isExternalTexture&&(G.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+w)}function O(U,w){let G=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&G.__version!==U.version){W(G,U,w);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+w)}function j(U,w){let G=n.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&G.__version!==U.version){Q(G,U,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+w)}let z={[Wo]:i.REPEAT,[Ur]:i.CLAMP_TO_EDGE,[Xh]:i.MIRRORED_REPEAT},I={[Ct]:i.NEAREST,[g_]:i.NEAREST_MIPMAP_NEAREST,[Xc]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[xf]:i.LINEAR_MIPMAP_NEAREST,[Fr]:i.LINEAR_MIPMAP_LINEAR},ie={[x_]:i.NEVER,[M_]:i.ALWAYS,[__]:i.LESS,[$f]:i.LEQUAL,[y_]:i.EQUAL,[ed]:i.GEQUAL,[A_]:i.GREATER,[S_]:i.NOTEQUAL};function se(U,w){if(w.type===nn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Vt||w.magFilter===xf||w.magFilter===Xc||w.magFilter===Fr||w.minFilter===Vt||w.minFilter===xf||w.minFilter===Xc||w.minFilter===Fr)&&Je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(U,i.TEXTURE_WRAP_S,z[w.wrapS]),i.texParameteri(U,i.TEXTURE_WRAP_T,z[w.wrapT]),(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)&&i.texParameteri(U,i.TEXTURE_WRAP_R,z[w.wrapR]),i.texParameteri(U,i.TEXTURE_MAG_FILTER,I[w.magFilter]),i.texParameteri(U,i.TEXTURE_MIN_FILTER,I[w.minFilter]),w.compareFunction&&(i.texParameteri(U,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(U,i.TEXTURE_COMPARE_FUNC,ie[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ct||w.minFilter!==Xc&&w.minFilter!==Fr||w.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(U,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ye(U,w){let G=!1;U.__webglInit===void 0&&(U.__webglInit=!0,w.addEventListener("dispose",E));let ee=w.source,$=h.get(ee);$===void 0&&($={},h.set(ee,$));let K=L(w);if(K!==U.__cacheKey){$[K]===void 0&&($[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),$[K].usedTimes++;let Ae=$[U.__cacheKey];Ae!==void 0&&($[U.__cacheKey].usedTimes--,Ae.usedTimes===0&&S(w)),U.__cacheKey=K,U.__webglTexture=$[K].texture}return G}function Re(U,w,G){return Math.floor(Math.floor(U/G)/w)}function Y(U,w,G,ee){let K=U.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,G,ee,w.data);else{K.sort((ce,he)=>ce.start-he.start);let Ae=0;for(let ce=1;ce<K.length;ce++){let he=K[Ae],Le=K[ce],Ne=he.start+he.count,Te=Re(Le.start,w.width,4),et=Re(he.start,w.width,4);Le.start<=Ne+1&&Te===et&&Re(Le.start+Le.count-1,w.width,4)===Te?he.count=Math.max(he.count,Le.start+Le.count-he.start):(++Ae,K[Ae]=Le)}K.length=Ae+1;let de=i.getParameter(i.UNPACK_ROW_LENGTH),Ge=i.getParameter(i.UNPACK_SKIP_PIXELS),Ue=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let ce=0,he=K.length;ce<he;ce++){let Le=K[ce],Ne=Math.floor(Le.start/4),Te=Math.ceil(Le.count/4),et=Ne%w.width,H=Math.floor(Ne/w.width),pe=Te,ue=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,et),i.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,et,H,pe,ue,G,ee,w.data)}U.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,de),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ue)}}function W(U,w,G){let ee=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ee=i.TEXTURE_3D);let $=ye(U,w),K=w.source;t.bindTexture(ee,U.__webglTexture,i.TEXTURE0+G);let Ae=n.get(K);if(K.version!==Ae.__version||$===!0){t.activeTexture(i.TEXTURE0+G);let de=At.getPrimaries(At.workingColorSpace),Ge=w.colorSpace===Ai?null:At.getPrimaries(w.colorSpace),Ue=w.colorSpace===Ai||de===Ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let ce=v(w.image,!1,r.maxTextureSize);ce=Be(w,ce);let he=s.convert(w.format,w.colorSpace),Le=s.convert(w.type),Ne=A(w.internalFormat,he,Le,w.colorSpace,w.isVideoTexture);se(ee,w);let Te,et=w.mipmaps,H=w.isVideoTexture!==!0,pe=Ae.__version===void 0||$===!0,ue=K.dataReady,Ee=M(w,ce);if(w.isDepthTexture)Ne=y(w.format===or,w.type),pe&&(H?t.texStorage2D(i.TEXTURE_2D,1,Ne,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,Ne,ce.width,ce.height,0,he,Le,null));else if(w.isDataTexture)if(et.length>0){H&&pe&&t.texStorage2D(i.TEXTURE_2D,Ee,Ne,et[0].width,et[0].height);for(let ae=0,ne=et.length;ae<ne;ae++)Te=et[ae],H?ue&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Te.width,Te.height,he,Le,Te.data):t.texImage2D(i.TEXTURE_2D,ae,Ne,Te.width,Te.height,0,he,Le,Te.data);w.generateMipmaps=!1}else H?(pe&&t.texStorage2D(i.TEXTURE_2D,Ee,Ne,ce.width,ce.height),ue&&Y(w,ce,he,Le)):t.texImage2D(i.TEXTURE_2D,0,Ne,ce.width,ce.height,0,he,Le,ce.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){H&&pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Ne,et[0].width,et[0].height,ce.depth);for(let ae=0,ne=et.length;ae<ne;ae++)if(Te=et[ae],w.format!==Sn)if(he!==null)if(H){if(ue)if(w.layerUpdates.size>0){let Fe=hg(Te.width,Te.height,w.format,w.type);for(let Qe of w.layerUpdates){let Tt=Te.data.subarray(Qe*Fe/Te.data.BYTES_PER_ELEMENT,(Qe+1)*Fe/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,Qe,Te.width,Te.height,1,he,Tt)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Te.width,Te.height,ce.depth,he,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Ne,Te.width,Te.height,ce.depth,0,Te.data,0,0);else Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else H?ue&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Te.width,Te.height,ce.depth,he,Le,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Ne,Te.width,Te.height,ce.depth,0,he,Le,Te.data)}else{H&&pe&&t.texStorage2D(i.TEXTURE_2D,Ee,Ne,et[0].width,et[0].height);for(let ae=0,ne=et.length;ae<ne;ae++)Te=et[ae],w.format!==Sn?he!==null?H?ue&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,Te.width,Te.height,he,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Ne,Te.width,Te.height,0,Te.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):H?ue&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Te.width,Te.height,he,Le,Te.data):t.texImage2D(i.TEXTURE_2D,ae,Ne,Te.width,Te.height,0,he,Le,Te.data)}else if(w.isDataArrayTexture)if(H){if(pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Ne,ce.width,ce.height,ce.depth),ue)if(w.layerUpdates.size>0){let ae=hg(ce.width,ce.height,w.format,w.type);for(let ne of w.layerUpdates){let Fe=ce.data.subarray(ne*ae/ce.data.BYTES_PER_ELEMENT,(ne+1)*ae/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,ce.width,ce.height,1,he,Le,Fe)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,he,Le,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ne,ce.width,ce.height,ce.depth,0,he,Le,ce.data);else if(w.isData3DTexture)H?(pe&&t.texStorage3D(i.TEXTURE_3D,Ee,Ne,ce.width,ce.height,ce.depth),ue&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,he,Le,ce.data)):t.texImage3D(i.TEXTURE_3D,0,Ne,ce.width,ce.height,ce.depth,0,he,Le,ce.data);else if(w.isFramebufferTexture){if(pe)if(H)t.texStorage2D(i.TEXTURE_2D,Ee,Ne,ce.width,ce.height);else{let ae=ce.width,ne=ce.height;for(let Fe=0;Fe<Ee;Fe++)t.texImage2D(i.TEXTURE_2D,Fe,Ne,ae,ne,0,he,Le,null),ae>>=1,ne>>=1}}else if(et.length>0){if(H&&pe){let ae=me(et[0]);t.texStorage2D(i.TEXTURE_2D,Ee,Ne,ae.width,ae.height)}for(let ae=0,ne=et.length;ae<ne;ae++)Te=et[ae],H?ue&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,he,Le,Te):t.texImage2D(i.TEXTURE_2D,ae,Ne,he,Le,Te);w.generateMipmaps=!1}else if(H){if(pe){let ae=me(ce);t.texStorage2D(i.TEXTURE_2D,Ee,Ne,ae.width,ae.height)}ue&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Le,ce)}else t.texImage2D(i.TEXTURE_2D,0,Ne,he,Le,ce);m(w)&&g(ee),Ae.__version=K.version,w.onUpdate&&w.onUpdate(w)}U.__version=w.version}function Q(U,w,G){if(w.image.length!==6)return;let ee=ye(U,w),$=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+G);let K=n.get($);if($.version!==K.__version||ee===!0){t.activeTexture(i.TEXTURE0+G);let Ae=At.getPrimaries(At.workingColorSpace),de=w.colorSpace===Ai?null:At.getPrimaries(w.colorSpace),Ge=w.colorSpace===Ai||Ae===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let Ue=w.isCompressedTexture||w.image[0].isCompressedTexture,ce=w.image[0]&&w.image[0].isDataTexture,he=[];for(let ne=0;ne<6;ne++)!Ue&&!ce?he[ne]=v(w.image[ne],!0,r.maxCubemapSize):he[ne]=ce?w.image[ne].image:w.image[ne],he[ne]=Be(w,he[ne]);let Le=he[0],Ne=s.convert(w.format,w.colorSpace),Te=s.convert(w.type),et=A(w.internalFormat,Ne,Te,w.colorSpace),H=w.isVideoTexture!==!0,pe=K.__version===void 0||ee===!0,ue=$.dataReady,Ee=M(w,Le);se(i.TEXTURE_CUBE_MAP,w);let ae;if(Ue){H&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,et,Le.width,Le.height);for(let ne=0;ne<6;ne++){ae=he[ne].mipmaps;for(let Fe=0;Fe<ae.length;Fe++){let Qe=ae[Fe];w.format!==Sn?Ne!==null?H?ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,0,0,Qe.width,Qe.height,Ne,Qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,et,Qe.width,Qe.height,0,Qe.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,0,0,Qe.width,Qe.height,Ne,Te,Qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe,et,Qe.width,Qe.height,0,Ne,Te,Qe.data)}}}else{if(ae=w.mipmaps,H&&pe){ae.length>0&&Ee++;let ne=me(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,et,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(ce){H?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,he[ne].width,he[ne].height,Ne,Te,he[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,et,he[ne].width,he[ne].height,0,Ne,Te,he[ne].data);for(let Fe=0;Fe<ae.length;Fe++){let Tt=ae[Fe].image[ne].image;H?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,0,0,Tt.width,Tt.height,Ne,Te,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,et,Tt.width,Tt.height,0,Ne,Te,Tt.data)}}else{H?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ne,Te,he[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,et,Ne,Te,he[ne]);for(let Fe=0;Fe<ae.length;Fe++){let Qe=ae[Fe];H?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,0,0,Ne,Te,Qe.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Fe+1,et,Ne,Te,Qe.image[ne])}}}m(w)&&g(i.TEXTURE_CUBE_MAP),K.__version=$.version,w.onUpdate&&w.onUpdate(w)}U.__version=w.version}function re(U,w,G,ee,$,K){let Ae=s.convert(G.format,G.colorSpace),de=s.convert(G.type),Ge=A(G.internalFormat,Ae,de,G.colorSpace),Ue=n.get(w),ce=n.get(G);if(ce.__renderTarget=w,!Ue.__hasExternalTextures){let he=Math.max(1,w.width>>K),Le=Math.max(1,w.height>>K);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,K,Ge,he,Le,w.depth,0,Ae,de,null):t.texImage2D($,K,Ge,he,Le,0,Ae,de,null)}t.bindFramebuffer(i.FRAMEBUFFER,U),qe(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,$,ce.__webglTexture,0,k(w)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,$,ce.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function te(U,w,G){if(i.bindRenderbuffer(i.RENDERBUFFER,U),w.depthBuffer){let ee=w.depthTexture,$=ee&&ee.isDepthTexture?ee.type:null,K=y(w.stencilBuffer,$),Ae=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;qe(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k(w),K,w.width,w.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,k(w),K,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,K,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,U)}else{let ee=w.textures;for(let $=0;$<ee.length;$++){let K=ee[$],Ae=s.convert(K.format,K.colorSpace),de=s.convert(K.type),Ge=A(K.internalFormat,Ae,de,K.colorSpace);qe(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k(w),Ge,w.width,w.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,k(w),Ge,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Ge,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function le(U,w,G){let ee=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,U),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(w.depthTexture);if($.__renderTarget=w,(!$.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ee){if($.__webglInit===void 0&&($.__webglInit=!0,w.depthTexture.addEventListener("dispose",E)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),se(i.TEXTURE_CUBE_MAP,w.depthTexture);let Ue=s.convert(w.depthTexture.format),ce=s.convert(w.depthTexture.type),he;w.depthTexture.format===sr?he=i.DEPTH_COMPONENT24:w.depthTexture.format===or&&(he=i.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,he,w.width,w.height,0,Ue,ce,null)}}else F(w.depthTexture,0);let K=$.__webglTexture,Ae=k(w),de=ee?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,Ge=w.depthTexture.format===or?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===sr)qe(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ge,de,K,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,Ge,de,K,0);else if(w.depthTexture.format===or)qe(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ge,de,K,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,Ge,de,K,0);else throw new Error("Unknown depthTexture format")}function fe(U){let w=n.get(U),G=U.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==U.depthTexture){let ee=U.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ee){let $=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ee.removeEventListener("dispose",$)};ee.addEventListener("dispose",$),w.__depthDisposeCallback=$}w.__boundDepthTexture=ee}if(U.depthTexture&&!w.__autoAllocateDepthBuffer)if(G)for(let ee=0;ee<6;ee++)le(w.__webglFramebuffer[ee],U,ee);else{let ee=U.texture.mipmaps;ee&&ee.length>0?le(w.__webglFramebuffer[0],U,0):le(w.__webglFramebuffer,U,0)}else if(G){w.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[ee]),w.__webglDepthbuffer[ee]===void 0)w.__webglDepthbuffer[ee]=i.createRenderbuffer(),te(w.__webglDepthbuffer[ee],U,!1);else{let $=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer[ee];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,K)}}else{let ee=U.texture.mipmaps;if(ee&&ee.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),te(w.__webglDepthbuffer,U,!1);else{let $=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Me(U,w,G){let ee=n.get(U);w!==void 0&&re(ee.__webglFramebuffer,U,U.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&fe(U)}function oe(U){let w=U.texture,G=n.get(U),ee=n.get(w);U.addEventListener("dispose",T);let $=U.textures,K=U.isWebGLCubeRenderTarget===!0,Ae=$.length>1;if(Ae||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=w.version,a.memory.textures++),K){G.__webglFramebuffer=[];for(let de=0;de<6;de++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[de]=[];for(let Ge=0;Ge<w.mipmaps.length;Ge++)G.__webglFramebuffer[de][Ge]=i.createFramebuffer()}else G.__webglFramebuffer[de]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let de=0;de<w.mipmaps.length;de++)G.__webglFramebuffer[de]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let de=0,Ge=$.length;de<Ge;de++){let Ue=n.get($[de]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),a.memory.textures++)}if(U.samples>0&&qe(U)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let de=0;de<$.length;de++){let Ge=$[de];G.__webglColorRenderbuffer[de]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[de]);let Ue=s.convert(Ge.format,Ge.colorSpace),ce=s.convert(Ge.type),he=A(Ge.internalFormat,Ue,ce,Ge.colorSpace,U.isXRRenderTarget===!0),Le=k(U);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,he,U.width,U.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,G.__webglColorRenderbuffer[de])}i.bindRenderbuffer(i.RENDERBUFFER,null),U.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),te(G.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),se(i.TEXTURE_CUBE_MAP,w);for(let de=0;de<6;de++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ge=0;Ge<w.mipmaps.length;Ge++)re(G.__webglFramebuffer[de][Ge],U,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ge);else re(G.__webglFramebuffer[de],U,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(w)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let de=0,Ge=$.length;de<Ge;de++){let Ue=$[de],ce=n.get(Ue),he=i.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(he=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,ce.__webglTexture),se(he,Ue),re(G.__webglFramebuffer,U,Ue,i.COLOR_ATTACHMENT0+de,he,0),m(Ue)&&g(he)}t.unbindTexture()}else{let de=i.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(de=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,ee.__webglTexture),se(de,w),w.mipmaps&&w.mipmaps.length>0)for(let Ge=0;Ge<w.mipmaps.length;Ge++)re(G.__webglFramebuffer[Ge],U,w,i.COLOR_ATTACHMENT0,de,Ge);else re(G.__webglFramebuffer,U,w,i.COLOR_ATTACHMENT0,de,0);m(w)&&g(de),t.unbindTexture()}U.depthBuffer&&fe(U)}function De(U){let w=U.textures;for(let G=0,ee=w.length;G<ee;G++){let $=w[G];if(m($)){let K=x(U),Ae=n.get($).__webglTexture;t.bindTexture(K,Ae),g(K),t.unbindTexture()}}}let ke=[],ve=[];function X(U){if(U.samples>0){if(qe(U)===!1){let w=U.textures,G=U.width,ee=U.height,$=i.COLOR_BUFFER_BIT,K=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(U),de=w.length>1;if(de)for(let Ue=0;Ue<w.length;Ue++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);let Ge=U.texture.mipmaps;Ge&&Ge.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ue=0;Ue<w.length;Ue++){if(U.resolveDepthBuffer&&(U.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),de){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ue]);let ce=n.get(w[Ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ce,0)}i.blitFramebuffer(0,0,G,ee,0,0,G,ee,$,i.NEAREST),l===!0&&(ke.length=0,ve.length=0,ke.push(i.COLOR_ATTACHMENT0+Ue),U.depthBuffer&&U.resolveDepthBuffer===!1&&(ke.push(K),ve.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ve)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ke))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),de)for(let Ue=0;Ue<w.length;Ue++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ue]);let ce=n.get(w[Ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,ce,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){let w=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function k(U){return Math.min(r.maxSamples,U.samples)}function qe(U){let w=n.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ie(U){let w=a.render.frame;u.get(U)!==w&&(u.set(U,w),U.update())}function Be(U,w){let G=U.colorSpace,ee=U.format,$=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||G!==Pi&&G!==Ai&&(At.getTransfer(G)===Ut?(ee!==Sn||$!==xt)&&Je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",G)),w}function me(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=b,this.setTexture2D=F,this.setTexture2DArray=N,this.setTexture3D=O,this.setTextureCube=j,this.rebindTextures=Me,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=De,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=re,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function wC(i,e){function t(n,r=Ai){let s,a=At.getTransfer(r);if(n===xt)return i.UNSIGNED_BYTE;if(n===_f)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yf)return i.UNSIGNED_SHORT_5_5_5_1;if(n===tg)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ng)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===el)return i.BYTE;if(n===Yc)return i.SHORT;if(n===ks)return i.UNSIGNED_SHORT;if(n===zs)return i.INT;if(n===An)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===ai)return i.HALF_FLOAT;if(n===ig)return i.ALPHA;if(n===rg)return i.RGB;if(n===Sn)return i.RGBA;if(n===sr)return i.DEPTH_COMPONENT;if(n===or)return i.DEPTH_STENCIL;if(n===Hs)return i.RED;if(n===tl)return i.RED_INTEGER;if(n===os)return i.RG;if(n===Gs)return i.RG_INTEGER;if(n===Vs)return i.RGBA_INTEGER;if(n===qc||n===Qc||n===Zc||n===Kc)if(a===Ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===qc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===qc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Kc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Af||n===Sf||n===Mf||n===Tf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Af)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Tf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ef||n===bf||n===wf||n===Cf||n===Rf||n===Df||n===Pf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ef||n===bf)return a===Ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===wf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Cf)return s.COMPRESSED_R11_EAC;if(n===Rf)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Df)return s.COMPRESSED_RG11_EAC;if(n===Pf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===If||n===Bf||n===Uf||n===Lf||n===Ff||n===Nf||n===Of||n===kf||n===zf||n===Hf||n===Gf||n===Vf||n===Wf||n===Xf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===If)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Uf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Lf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ff)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Nf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Of)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===kf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Hf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xf)return a===Ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Yf||n===qf||n===Qf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Yf)return a===Ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zf||n===Kf||n===Jf||n===jf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Zf)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Kf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Nr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var CC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,RC=`
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

}`,Eg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Fc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new rt({vertexShader:CC,fragmentShader:RC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new ss(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bg=class extends xi{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null,v=typeof XRWebGLBinding<"u",m=new Eg,g={},x=t.getContextAttributes(),A=null,y=null,M=[],E=[],T=new Se,_=null,S=new yn;S.viewport=new St;let C=new yn;C.viewport=new St;let R=[S,C],b=new mf,P=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Q=M[W];return Q===void 0&&(Q=new Qo,M[W]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(W){let Q=M[W];return Q===void 0&&(Q=new Qo,M[W]=Q),Q.getGripSpace()},this.getHand=function(W){let Q=M[W];return Q===void 0&&(Q=new Qo,M[W]=Q),Q.getHandSpace()};function F(W){let Q=E.indexOf(W.inputSource);if(Q===-1)return;let re=M[Q];re!==void 0&&(re.update(W.inputSource,W.frame,c||a),re.dispatchEvent({type:W.type,data:W.inputSource}))}function N(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",O);for(let W=0;W<M.length;W++){let Q=E[W];Q!==null&&(E[W]=null,M[W].disconnect(Q))}P=null,L=null,m.reset();for(let W in g)delete g[W];e.setRenderTarget(A),d=null,h=null,f=null,r=null,y=null,Y.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&Je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&Je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(A=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",N),r.addEventListener("inputsourceschange",O),x.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,te=null,le=null;x.depth&&(le=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=x.stencil?or:sr,te=x.stencil?Nr:An);let fe={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(fe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new vt(h.textureWidth,h.textureHeight,{format:Sn,type:xt,depthTexture:new Bi(h.textureWidth,h.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let re={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vt(d.framebufferWidth,d.framebufferHeight,{format:Sn,type:xt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Y.setContext(r),Y.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function O(W){for(let Q=0;Q<W.removed.length;Q++){let re=W.removed[Q],te=E.indexOf(re);te>=0&&(E[te]=null,M[te].disconnect(re))}for(let Q=0;Q<W.added.length;Q++){let re=W.added[Q],te=E.indexOf(re);if(te===-1){for(let fe=0;fe<M.length;fe++)if(fe>=E.length){E.push(re),te=fe;break}else if(E[fe]===null){E[fe]=re,te=fe;break}if(te===-1)break}let le=M[te];le&&le.connect(re)}}let j=new B,z=new B;function I(W,Q,re){j.setFromMatrixPosition(Q.matrixWorld),z.setFromMatrixPosition(re.matrixWorld);let te=j.distanceTo(z),le=Q.projectionMatrix.elements,fe=re.projectionMatrix.elements,Me=le[14]/(le[10]-1),oe=le[14]/(le[10]+1),De=(le[9]+1)/le[5],ke=(le[9]-1)/le[5],ve=(le[8]-1)/le[0],X=(fe[8]+1)/fe[0],k=Me*ve,qe=Me*X,Ie=te/(-ve+X),Be=Ie*-ve;if(Q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Be),W.translateZ(Ie),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),le[10]===-1)W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let me=Me+Ie,U=oe+Ie,w=k-Be,G=qe+(te-Be),ee=De*oe/U*me,$=ke*oe/U*me;W.projectionMatrix.makePerspective(w,G,ee,$,me,U),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ie(W,Q){Q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let Q=W.near,re=W.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(re=m.depthFar)),b.near=C.near=S.near=Q,b.far=C.far=S.far=re,(P!==b.near||L!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),P=b.near,L=b.far),b.layers.mask=W.layers.mask|6,S.layers.mask=b.layers.mask&-5,C.layers.mask=b.layers.mask&-3;let te=W.parent,le=b.cameras;ie(b,te);for(let fe=0;fe<le.length;fe++)ie(le[fe],te);le.length===2?I(b,S,C):b.projectionMatrix.copy(S.projectionMatrix),se(W,b,te)};function se(W,Q,re){re===null?W.matrix.copy(Q.matrixWorld):(W.matrix.copy(re.matrixWorld),W.matrix.invert(),W.matrix.multiply(Q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Yo*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=W)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(b)},this.getCameraTexture=function(W){return g[W]};let ye=null;function Re(W,Q){if(u=Q.getViewerPose(c||a),p=Q,u!==null){let re=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let te=!1;re.length!==b.cameras.length&&(b.cameras.length=0,te=!0);for(let oe=0;oe<re.length;oe++){let De=re[oe],ke=null;if(d!==null)ke=d.getViewport(De);else{let X=f.getViewSubImage(h,De);ke=X.viewport,oe===0&&(e.setRenderTargetTextures(y,X.colorTexture,X.depthStencilTexture),e.setRenderTarget(y))}let ve=R[oe];ve===void 0&&(ve=new yn,ve.layers.enable(oe),ve.viewport=new St,R[oe]=ve),ve.matrix.fromArray(De.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(De.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(ke.x,ke.y,ke.width,ke.height),oe===0&&(b.matrix.copy(ve.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),te===!0&&b.cameras.push(ve)}let le=r.enabledFeatures;if(le&&le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let oe=f.getDepthInformation(re[0]);oe&&oe.isValid&&oe.texture&&m.init(oe,r.renderState)}if(le&&le.includes("camera-access")&&v){e.state.unbindTexture(),f=n.getBinding();for(let oe=0;oe<re.length;oe++){let De=re[oe].camera;if(De){let ke=g[De];ke||(ke=new Fc,g[De]=ke);let ve=f.getCameraImage(De);ke.sourceTexture=ve}}}}for(let re=0;re<M.length;re++){let te=E[re],le=M[re];te!==null&&le!==void 0&&le.update(te,Q,c||a)}ye&&ye(W,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),p=null}let Y=new ey;Y.setAnimationLoop(Re),this.setAnimationLoop=function(W){ye=W},this.dispose=function(){}}},Ha=new yr,DC=new je;function PC(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,lg(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,x,A,y){g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),f(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),h(m,g),g.isMeshPhysicalMaterial&&d(m,g,y)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),v(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,x,A):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===tn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===tn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let x=e.get(g),A=x.envMap,y=x.envMapRotation;A&&(m.envMap.value=A,Ha.copy(y),Ha.x*=-1,Ha.y*=-1,Ha.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ha.y*=-1,Ha.z*=-1),m.envMapRotation.value.setFromMatrix4(DC.makeRotationFromEuler(Ha)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,x,A){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*x,m.scale.value=A*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function h(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,x){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===tn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){let x=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function IC(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){let y=A.program;n.uniformBlockBinding(x,y)}function c(x,A){let y=r[x.id];y===void 0&&(p(x),y=u(x),r[x.id]=y,x.addEventListener("dispose",m));let M=A.program;n.updateUBOMapping(x,M);let E=e.render.frame;s[x.id]!==E&&(h(x),s[x.id]=E)}function u(x){let A=f();x.__bindingPointIndex=A;let y=i.createBuffer(),M=x.__size,E=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,M,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,y),y}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){let A=r[x.id],y=x.uniforms,M=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let E=0,T=y.length;E<T;E++){let _=Array.isArray(y[E])?y[E]:[y[E]];for(let S=0,C=_.length;S<C;S++){let R=_[S];if(d(R,E,S,M)===!0){let b=R.__offset,P=Array.isArray(R.value)?R.value:[R.value],L=0;for(let F=0;F<P.length;F++){let N=P[F],O=v(N);typeof N=="number"||typeof N=="boolean"?(R.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,b+L,R.__data)):N.isMatrix3?(R.__data[0]=N.elements[0],R.__data[1]=N.elements[1],R.__data[2]=N.elements[2],R.__data[3]=0,R.__data[4]=N.elements[3],R.__data[5]=N.elements[4],R.__data[6]=N.elements[5],R.__data[7]=0,R.__data[8]=N.elements[6],R.__data[9]=N.elements[7],R.__data[10]=N.elements[8],R.__data[11]=0):(N.toArray(R.__data,L),L+=O.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,b,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,A,y,M){let E=x.value,T=A+"_"+y;if(M[T]===void 0)return typeof E=="number"||typeof E=="boolean"?M[T]=E:M[T]=E.clone(),!0;{let _=M[T];if(typeof E=="number"||typeof E=="boolean"){if(_!==E)return M[T]=E,!0}else if(_.equals(E)===!1)return _.copy(E),!0}return!1}function p(x){let A=x.uniforms,y=0,M=16;for(let T=0,_=A.length;T<_;T++){let S=Array.isArray(A[T])?A[T]:[A[T]];for(let C=0,R=S.length;C<R;C++){let b=S[C],P=Array.isArray(b.value)?b.value:[b.value];for(let L=0,F=P.length;L<F;L++){let N=P[L],O=v(N),j=y%M,z=j%O.boundary,I=j+z;y+=z,I!==0&&M-I<O.storage&&(y+=M-I),b.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=y,y+=O.storage}}}let E=y%M;return E>0&&(y+=M-E),x.__size=y,x.__cache={},this}function v(x){let A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Je("WebGLRenderer: Unsupported uniform value type.",x),A}function m(x){let A=x.target;A.removeEventListener("dispose",m);let y=a.indexOf(A.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function g(){for(let x in r)i.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:g}}var BC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Or=null;function UC(){return Or===null&&(Or=new ar(BC,16,16,os,ai),Or.name="DFG_LUT",Or.minFilter=Vt,Or.magFilter=Vt,Or.wrapS=Ur,Or.wrapT=Ur,Or.generateMipmaps=!1,Or.needsUpdate=!0),Or}var id=class{constructor(e={}){let{canvas:t=T_(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=xt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let v=d,m=new Set([Vs,Gs,tl]),g=new Set([xt,An,ks,Nr,_f,yf]),x=new Uint32Array(4),A=new Int32Array(4),y=null,M=null,E=[],T=[],_=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=it;let R=0,b=0,P=null,L=-1,F=null,N=new St,O=new St,j=null,z=new Xe(0),I=0,ie=t.width,se=t.height,ye=1,Re=null,Y=null,W=new St(0,0,ie,se),Q=new St(0,0,ie,se),re=!1,te=new Bc,le=!1,fe=!1,Me=new je,oe=new B,De=new St,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function X(){return P===null?ye:1}let k=n;function qe(D,V){return t.getContext(D,V)}try{let D={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wn}`),t.addEventListener("webglcontextlost",Fe,!1),t.addEventListener("webglcontextrestored",Qe,!1),t.addEventListener("webglcontextcreationerror",Tt,!1),k===null){let V="webgl2";if(k=qe(V,D),k===null)throw qe(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw Ke("WebGLRenderer: "+D.message),D}let Ie,Be,me,U,w,G,ee,$,K,Ae,de,Ge,Ue,ce,he,Le,Ne,Te,et,H,pe,ue,Ee;function ae(){Ie=new Gb(k),Ie.init(),pe=new wC(k,Ie),Be=new Ub(k,Ie,e,pe),me=new EC(k,Ie),Be.reversedDepthBuffer&&h&&me.buffers.depth.setReversed(!0),U=new Xb(k),w=new hC,G=new bC(k,Ie,me,w,Be,pe,U),ee=new Hb(S),$=new KM(k),ue=new Ib(k,$),K=new Vb(k,$,U,ue),Ae=new qb(k,K,$,ue,U),Te=new Yb(k,Be,G),he=new Lb(w),de=new uC(S,ee,Ie,Be,ue,he),Ge=new PC(S,w),Ue=new dC,ce=new _C(Ie),Ne=new Pb(S,ee,me,Ae,p,l),Le=new TC(S,Ae,Be),Ee=new IC(k,U,Be,me),et=new Bb(k,Ie,U),H=new Wb(k,Ie,U),U.programs=de.programs,S.capabilities=Be,S.extensions=Ie,S.properties=w,S.renderLists=Ue,S.shadowMap=Le,S.state=me,S.info=U}ae(),v!==xt&&(_=new Zb(v,t.width,t.height,r,s));let ne=new bg(S,k);this.xr=ne,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let D=Ie.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=Ie.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(D){D!==void 0&&(ye=D,this.setSize(ie,se,!1))},this.getSize=function(D){return D.set(ie,se)},this.setSize=function(D,V,J=!0){if(ne.isPresenting){Je("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=D,se=V,t.width=Math.floor(D*ye),t.height=Math.floor(V*ye),J===!0&&(t.style.width=D+"px",t.style.height=V+"px"),_!==null&&_.setSize(t.width,t.height),this.setViewport(0,0,D,V)},this.getDrawingBufferSize=function(D){return D.set(ie*ye,se*ye).floor()},this.setDrawingBufferSize=function(D,V,J){ie=D,se=V,ye=J,t.width=Math.floor(D*J),t.height=Math.floor(V*J),this.setViewport(0,0,D,V)},this.setEffects=function(D){if(v===xt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let V=0;V<D.length;V++)if(D[V].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(N)},this.getViewport=function(D){return D.copy(W)},this.setViewport=function(D,V,J,Z){D.isVector4?W.set(D.x,D.y,D.z,D.w):W.set(D,V,J,Z),me.viewport(N.copy(W).multiplyScalar(ye).round())},this.getScissor=function(D){return D.copy(Q)},this.setScissor=function(D,V,J,Z){D.isVector4?Q.set(D.x,D.y,D.z,D.w):Q.set(D,V,J,Z),me.scissor(O.copy(Q).multiplyScalar(ye).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(D){me.setScissorTest(re=D)},this.setOpaqueSort=function(D){Re=D},this.setTransparentSort=function(D){Y=D},this.getClearColor=function(D){return D.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(D=!0,V=!0,J=!0){let Z=0;if(D){let q=!1;if(P!==null){let xe=P.texture.format;q=m.has(xe)}if(q){let xe=P.texture.type,be=g.has(xe),_e=Ne.getClearColor(),ze=Ne.getClearAlpha(),Oe=_e.r,ot=_e.g,dt=_e.b;be?(x[0]=Oe,x[1]=ot,x[2]=dt,x[3]=ze,k.clearBufferuiv(k.COLOR,0,x)):(A[0]=Oe,A[1]=ot,A[2]=dt,A[3]=ze,k.clearBufferiv(k.COLOR,0,A))}else Z|=k.COLOR_BUFFER_BIT}V&&(Z|=k.DEPTH_BUFFER_BIT),J&&(Z|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&k.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",Tt,!1),Ne.dispose(),Ue.dispose(),ce.dispose(),w.dispose(),ee.dispose(),Ae.dispose(),ue.dispose(),Ee.dispose(),de.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",nt),ne.removeEventListener("sessionend",dn),at.stop()};function Fe(D){D.preventDefault(),Tc("WebGLRenderer: Context Lost."),C=!0}function Qe(){Tc("WebGLRenderer: Context Restored."),C=!1;let D=U.autoReset,V=Le.enabled,J=Le.autoUpdate,Z=Le.needsUpdate,q=Le.type;ae(),U.autoReset=D,Le.enabled=V,Le.autoUpdate=J,Le.needsUpdate=Z,Le.type=q}function Tt(D){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Pe(D){let V=D.target;V.removeEventListener("dispose",Pe),Ve(V)}function Ve(D){ct(D),w.remove(D)}function ct(D){let V=w.get(D).programs;V!==void 0&&(V.forEach(function(J){de.releaseProgram(J)}),D.isShaderMaterial&&de.releaseShaderCache(D))}this.renderBufferDirect=function(D,V,J,Z,q,xe){V===null&&(V=ke);let be=q.isMesh&&q.matrixWorld.determinant()<0,_e=Ji(D,V,J,Z,q);me.setMaterial(Z,be);let ze=J.index,Oe=1;if(Z.wireframe===!0){if(ze=K.getWireframeAttribute(J),ze===void 0)return;Oe=2}let ot=J.drawRange,dt=J.attributes.position,Ye=ot.start*Oe,Ht=(ot.start+ot.count)*Oe;xe!==null&&(Ye=Math.max(Ye,xe.start*Oe),Ht=Math.min(Ht,(xe.start+xe.count)*Oe)),ze!==null?(Ye=Math.max(Ye,0),Ht=Math.min(Ht,ze.count)):dt!=null&&(Ye=Math.max(Ye,0),Ht=Math.min(Ht,dt.count));let pn=Ht-Ye;if(pn<0||pn===1/0)return;ue.setup(q,Z,_e,J,ze);let ln,Gt=et;if(ze!==null&&(ln=$.get(ze),Gt=H,Gt.setIndex(ln)),q.isMesh)Z.wireframe===!0?(me.setLineWidth(Z.wireframeLinewidth*X()),Gt.setMode(k.LINES)):Gt.setMode(k.TRIANGLES);else if(q.isLine){let Qn=Z.linewidth;Qn===void 0&&(Qn=1),me.setLineWidth(Qn*X()),q.isLineSegments?Gt.setMode(k.LINES):q.isLineLoop?Gt.setMode(k.LINE_LOOP):Gt.setMode(k.LINE_STRIP)}else q.isPoints?Gt.setMode(k.POINTS):q.isSprite&&Gt.setMode(k.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Ec("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Gt.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))Gt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Qn=q._multiDrawStarts,We=q._multiDrawCounts,Li=q._multiDrawCount,Et=ze?$.get(ze).bytesPerElement:1,fr=w.get(Z).currentProgram.getUniforms();for(let Er=0;Er<Li;Er++)fr.setValue(k,"_gl_DrawID",Er),Gt.render(Qn[Er]/Et,We[Er])}else if(q.isInstancedMesh)Gt.renderInstances(Ye,pn,q.count);else if(J.isInstancedBufferGeometry){let Qn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,We=Math.min(J.instanceCount,Qn);Gt.renderInstances(Ye,pn,We)}else Gt.render(Ye,pn)};function we(D,V,J){D.transparent===!0&&D.side===gn&&D.forceSinglePass===!1?(D.side=tn,D.needsUpdate=!0,Yn(D,V,J),D.side=ri,D.needsUpdate=!0,Yn(D,V,J),D.side=gn):Yn(D,V,J)}this.compile=function(D,V,J=null){J===null&&(J=D),M=ce.get(J),M.init(V),T.push(M),J.traverseVisible(function(q){q.isLight&&q.layers.test(V.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),D!==J&&D.traverseVisible(function(q){q.isLight&&q.layers.test(V.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),M.setupLights();let Z=new Set;return D.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let xe=q.material;if(xe)if(Array.isArray(xe))for(let be=0;be<xe.length;be++){let _e=xe[be];we(_e,J,q),Z.add(_e)}else we(xe,J,q),Z.add(xe)}),M=T.pop(),Z},this.compileAsync=function(D,V,J=null){let Z=this.compile(D,V,J);return new Promise(q=>{function xe(){if(Z.forEach(function(be){w.get(be).currentProgram.isReady()&&Z.delete(be)}),Z.size===0){q(D);return}setTimeout(xe,10)}Ie.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let tt=null;function Ze(D){tt&&tt(D)}function nt(){at.stop()}function dn(){at.start()}let at=new ey;at.setAnimationLoop(Ze),typeof self<"u"&&at.setContext(self),this.setAnimationLoop=function(D){tt=D,ne.setAnimationLoop(D),D===null?at.stop():at.start()},ne.addEventListener("sessionstart",nt),ne.addEventListener("sessionend",dn),this.render=function(D,V){if(V!==void 0&&V.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;let J=ne.enabled===!0&&ne.isPresenting===!0,Z=_!==null&&(P===null||J)&&_.begin(S,P);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(V),V=ne.getCamera()),D.isScene===!0&&D.onBeforeRender(S,D,V,P),M=ce.get(D,T.length),M.init(V),T.push(M),Me.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),te.setFromProjectionMatrix(Me,_r,V.reversedDepth),fe=this.localClippingEnabled,le=he.init(this.clippingPlanes,fe),y=Ue.get(D,E.length),y.init(),E.push(y),ne.enabled===!0&&ne.isPresenting===!0){let be=S.xr.getDepthSensingMesh();be!==null&&Jt(be,V,-1/0,S.sortObjects)}Jt(D,V,0,S.sortObjects),y.finish(),S.sortObjects===!0&&y.sort(Re,Y),ve=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,ve&&Ne.addToRenderList(y,D),this.info.render.frame++,le===!0&&he.beginShadows();let q=M.state.shadowsArray;if(Le.render(q,D,V),le===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Z&&_.hasRenderPass())===!1){let be=y.opaque,_e=y.transmissive;if(M.setupLights(),V.isArrayCamera){let ze=V.cameras;if(_e.length>0)for(let Oe=0,ot=ze.length;Oe<ot;Oe++){let dt=ze[Oe];jt(be,_e,D,dt)}ve&&Ne.render(D);for(let Oe=0,ot=ze.length;Oe<ot;Oe++){let dt=ze[Oe];Tn(y,D,dt,dt.viewport)}}else _e.length>0&&jt(be,_e,D,V),ve&&Ne.render(D),Tn(y,D,V)}P!==null&&b===0&&(G.updateMultisampleRenderTarget(P),G.updateRenderTargetMipmap(P)),Z&&_.end(S),D.isScene===!0&&D.onAfterRender(S,D,V),ue.resetDefaultState(),L=-1,F=null,T.pop(),T.length>0?(M=T[T.length-1],le===!0&&he.setGlobalState(S.clippingPlanes,M.state.camera)):M=null,E.pop(),E.length>0?y=E[E.length-1]:y=null};function Jt(D,V,J,Z){if(D.visible===!1)return;if(D.layers.test(V.layers)){if(D.isGroup)J=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(V);else if(D.isLight)M.pushLight(D),D.castShadow&&M.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||te.intersectsSprite(D)){Z&&De.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Me);let be=Ae.update(D),_e=D.material;_e.visible&&y.push(D,be,_e,J,De.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||te.intersectsObject(D))){let be=Ae.update(D),_e=D.material;if(Z&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),De.copy(D.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),De.copy(be.boundingSphere.center)),De.applyMatrix4(D.matrixWorld).applyMatrix4(Me)),Array.isArray(_e)){let ze=be.groups;for(let Oe=0,ot=ze.length;Oe<ot;Oe++){let dt=ze[Oe],Ye=_e[dt.materialIndex];Ye&&Ye.visible&&y.push(D,be,Ye,J,De.z,dt)}}else _e.visible&&y.push(D,be,_e,J,De.z,null)}}let xe=D.children;for(let be=0,_e=xe.length;be<_e;be++)Jt(xe[be],V,J,Z)}function Tn(D,V,J,Z){let{opaque:q,transmissive:xe,transparent:be}=D;M.setupLightsView(J),le===!0&&he.setGlobalState(S.clippingPlanes,J),Z&&me.viewport(N.copy(Z)),q.length>0&&Ot(q,V,J),xe.length>0&&Ot(xe,V,J),be.length>0&&Ot(be,V,J),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function jt(D,V,J,Z){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[Z.id]===void 0){let Ye=Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[Z.id]=new vt(1,1,{generateMipmaps:!0,type:Ye?ai:xt,minFilter:Fr,samples:Math.max(4,Be.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:At.workingColorSpace})}let xe=M.state.transmissionRenderTarget[Z.id],be=Z.viewport||N;xe.setSize(be.z*S.transmissionResolutionScale,be.w*S.transmissionResolutionScale);let _e=S.getRenderTarget(),ze=S.getActiveCubeFace(),Oe=S.getActiveMipmapLevel();S.setRenderTarget(xe),S.getClearColor(z),I=S.getClearAlpha(),I<1&&S.setClearColor(16777215,.5),S.clear(),ve&&Ne.render(J);let ot=S.toneMapping;S.toneMapping=qi;let dt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),M.setupLightsView(Z),le===!0&&he.setGlobalState(S.clippingPlanes,Z),Ot(D,J,Z),G.updateMultisampleRenderTarget(xe),G.updateRenderTargetMipmap(xe),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let Ht=0,pn=V.length;Ht<pn;Ht++){let ln=V[Ht],{object:Gt,geometry:Qn,material:We,group:Li}=ln;if(We.side===gn&&Gt.layers.test(Z.layers)){let Et=We.side;We.side=tn,We.needsUpdate=!0,It(Gt,J,Z,Qn,We,Li),We.side=Et,We.needsUpdate=!0,Ye=!0}}Ye===!0&&(G.updateMultisampleRenderTarget(xe),G.updateRenderTargetMipmap(xe))}S.setRenderTarget(_e,ze,Oe),S.setClearColor(z,I),dt!==void 0&&(Z.viewport=dt),S.toneMapping=ot}function Ot(D,V,J){let Z=V.isScene===!0?V.overrideMaterial:null;for(let q=0,xe=D.length;q<xe;q++){let be=D[q],{object:_e,geometry:ze,group:Oe}=be,ot=be.material;ot.allowOverride===!0&&Z!==null&&(ot=Z),_e.layers.test(J.layers)&&It(_e,V,J,ze,ot,Oe)}}function It(D,V,J,Z,q,xe){D.onBeforeRender(S,V,J,Z,q,xe),D.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),q.onBeforeRender(S,V,J,Z,D,xe),q.transparent===!0&&q.side===gn&&q.forceSinglePass===!1?(q.side=tn,q.needsUpdate=!0,S.renderBufferDirect(J,V,Z,q,D,xe),q.side=ri,q.needsUpdate=!0,S.renderBufferDirect(J,V,Z,q,D,xe),q.side=gn):S.renderBufferDirect(J,V,Z,q,D,xe),D.onAfterRender(S,V,J,Z,q,xe)}function Yn(D,V,J){V.isScene!==!0&&(V=ke);let Z=w.get(D),q=M.state.lights,xe=M.state.shadowsArray,be=q.state.version,_e=de.getParameters(D,q.state,xe,V,J),ze=de.getProgramCacheKey(_e),Oe=Z.programs;Z.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?V.environment:null,Z.fog=V.fog;let ot=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;Z.envMap=ee.get(D.envMap||Z.environment,ot),Z.envMapRotation=Z.environment!==null&&D.envMap===null?V.environmentRotation:D.envMapRotation,Oe===void 0&&(D.addEventListener("dispose",Pe),Oe=new Map,Z.programs=Oe);let dt=Oe.get(ze);if(dt!==void 0){if(Z.currentProgram===dt&&Z.lightsStateVersion===be)return qn(D,_e),dt}else _e.uniforms=de.getUniforms(D),D.onBeforeCompile(_e,S),dt=de.acquireProgram(_e,ze),Oe.set(ze,dt),Z.uniforms=_e.uniforms;let Ye=Z.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ye.clippingPlanes=he.uniform),qn(D,_e),Z.needsLights=bn(D),Z.lightsStateVersion=be,Z.needsLights&&(Ye.ambientLightColor.value=q.state.ambient,Ye.lightProbe.value=q.state.probe,Ye.directionalLights.value=q.state.directional,Ye.directionalLightShadows.value=q.state.directionalShadow,Ye.spotLights.value=q.state.spot,Ye.spotLightShadows.value=q.state.spotShadow,Ye.rectAreaLights.value=q.state.rectArea,Ye.ltc_1.value=q.state.rectAreaLTC1,Ye.ltc_2.value=q.state.rectAreaLTC2,Ye.pointLights.value=q.state.point,Ye.pointLightShadows.value=q.state.pointShadow,Ye.hemisphereLights.value=q.state.hemi,Ye.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ye.spotLightMatrix.value=q.state.spotLightMatrix,Ye.spotLightMap.value=q.state.spotLightMap,Ye.pointShadowMatrix.value=q.state.pointShadowMatrix),Z.currentProgram=dt,Z.uniformsList=null,dt}function Zt(D){if(D.uniformsList===null){let V=D.currentProgram.getUniforms();D.uniformsList=il.seqWithValue(V.seq,D.uniforms)}return D.uniformsList}function qn(D,V){let J=w.get(D);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function Ji(D,V,J,Z,q){V.isScene!==!0&&(V=ke),G.resetTextureUnits();let xe=V.fog,be=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?V.environment:null,_e=P===null?S.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Pi,ze=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Oe=ee.get(Z.envMap||be,ze),ot=Z.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,dt=!!J.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ye=!!J.morphAttributes.position,Ht=!!J.morphAttributes.normal,pn=!!J.morphAttributes.color,ln=qi;Z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ln=S.toneMapping);let Gt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Qn=Gt!==void 0?Gt.length:0,We=w.get(Z),Li=M.state.lights;if(le===!0&&(fe===!0||D!==F)){let Bn=D===F&&Z.id===L;he.setState(Z,D,Bn)}let Et=!1;Z.version===We.__version?(We.needsLights&&We.lightsStateVersion!==Li.state.version||We.outputColorSpace!==_e||q.isBatchedMesh&&We.batching===!1||!q.isBatchedMesh&&We.batching===!0||q.isBatchedMesh&&We.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&We.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&We.instancing===!1||!q.isInstancedMesh&&We.instancing===!0||q.isSkinnedMesh&&We.skinning===!1||!q.isSkinnedMesh&&We.skinning===!0||q.isInstancedMesh&&We.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&We.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&We.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&We.instancingMorph===!1&&q.morphTexture!==null||We.envMap!==Oe||Z.fog===!0&&We.fog!==xe||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==he.numPlanes||We.numIntersection!==he.numIntersection)||We.vertexAlphas!==ot||We.vertexTangents!==dt||We.morphTargets!==Ye||We.morphNormals!==Ht||We.morphColors!==pn||We.toneMapping!==ln||We.morphTargetsCount!==Qn)&&(Et=!0):(Et=!0,We.__version=Z.version);let fr=We.currentProgram;Et===!0&&(fr=Yn(Z,V,q));let Er=!1,oa=!1,ja=!1,Wt=fr.getUniforms(),On=We.uniforms;if(me.useProgram(fr.program)&&(Er=!0,oa=!0,ja=!0),Z.id!==L&&(L=Z.id,oa=!0),Er||F!==D){me.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Wt.setValue(k,"projectionMatrix",D.projectionMatrix),Wt.setValue(k,"viewMatrix",D.matrixWorldInverse);let ps=Wt.map.cameraPosition;ps!==void 0&&ps.setValue(k,oe.setFromMatrixPosition(D.matrixWorld)),Be.logarithmicDepthBuffer&&Wt.setValue(k,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Wt.setValue(k,"isOrthographic",D.isOrthographicCamera===!0),F!==D&&(F=D,oa=!0,ja=!0)}if(We.needsLights&&(Li.state.directionalShadowMap.length>0&&Wt.setValue(k,"directionalShadowMap",Li.state.directionalShadowMap,G),Li.state.spotShadowMap.length>0&&Wt.setValue(k,"spotShadowMap",Li.state.spotShadowMap,G),Li.state.pointShadowMap.length>0&&Wt.setValue(k,"pointShadowMap",Li.state.pointShadowMap,G)),q.isSkinnedMesh){Wt.setOptional(k,q,"bindMatrix"),Wt.setOptional(k,q,"bindMatrixInverse");let Bn=q.skeleton;Bn&&(Bn.boneTexture===null&&Bn.computeBoneTexture(),Wt.setValue(k,"boneTexture",Bn.boneTexture,G))}q.isBatchedMesh&&(Wt.setOptional(k,q,"batchingTexture"),Wt.setValue(k,"batchingTexture",q._matricesTexture,G),Wt.setOptional(k,q,"batchingIdTexture"),Wt.setValue(k,"batchingIdTexture",q._indirectTexture,G),Wt.setOptional(k,q,"batchingColorTexture"),q._colorsTexture!==null&&Wt.setValue(k,"batchingColorTexture",q._colorsTexture,G));let ds=J.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Te.update(q,J,fr),(oa||We.receiveShadow!==q.receiveShadow)&&(We.receiveShadow=q.receiveShadow,Wt.setValue(k,"receiveShadow",q.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&V.environment!==null&&(On.envMapIntensity.value=V.environmentIntensity),On.dfgLUT!==void 0&&(On.dfgLUT.value=UC()),oa&&(Wt.setValue(k,"toneMappingExposure",S.toneMappingExposure),We.needsLights&&En(On,ja),xe&&Z.fog===!0&&Ge.refreshFogUniforms(On,xe),Ge.refreshMaterialUniforms(On,Z,ye,se,M.state.transmissionRenderTarget[D.id]),il.upload(k,Zt(We),On,G)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(il.upload(k,Zt(We),On,G),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Wt.setValue(k,"center",q.center),Wt.setValue(k,"modelViewMatrix",q.modelViewMatrix),Wt.setValue(k,"normalMatrix",q.normalMatrix),Wt.setValue(k,"modelMatrix",q.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){let Bn=Z.uniformsGroups;for(let ps=0,$a=Bn.length;ps<$a;ps++){let g0=Bn[ps];Ee.update(g0,fr),Ee.bind(g0,fr)}}return fr}function En(D,V){D.ambientLightColor.needsUpdate=V,D.lightProbe.needsUpdate=V,D.directionalLights.needsUpdate=V,D.directionalLightShadows.needsUpdate=V,D.pointLights.needsUpdate=V,D.pointLightShadows.needsUpdate=V,D.spotLights.needsUpdate=V,D.spotLightShadows.needsUpdate=V,D.rectAreaLights.needsUpdate=V,D.hemisphereLights.needsUpdate=V}function bn(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(D,V,J){let Z=w.get(D);Z.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),w.get(D.texture).__webglTexture=V,w.get(D.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:J,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,V){let J=w.get(D);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0};let In=k.createFramebuffer();this.setRenderTarget=function(D,V=0,J=0){P=D,R=V,b=J;let Z=null,q=!1,xe=!1;if(D){let _e=w.get(D);if(_e.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(k.FRAMEBUFFER,_e.__webglFramebuffer),N.copy(D.viewport),O.copy(D.scissor),j=D.scissorTest,me.viewport(N),me.scissor(O),me.setScissorTest(j),L=-1;return}else if(_e.__webglFramebuffer===void 0)G.setupRenderTarget(D);else if(_e.__hasExternalTextures)G.rebindTextures(D,w.get(D.texture).__webglTexture,w.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){let ot=D.depthTexture;if(_e.__boundDepthTexture!==ot){if(ot!==null&&w.has(ot)&&(D.width!==ot.image.width||D.height!==ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");G.setupDepthRenderbuffer(D)}}let ze=D.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(xe=!0);let Oe=w.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Oe[V])?Z=Oe[V][J]:Z=Oe[V],q=!0):D.samples>0&&G.useMultisampledRTT(D)===!1?Z=w.get(D).__webglMultisampledFramebuffer:Array.isArray(Oe)?Z=Oe[J]:Z=Oe,N.copy(D.viewport),O.copy(D.scissor),j=D.scissorTest}else N.copy(W).multiplyScalar(ye).floor(),O.copy(Q).multiplyScalar(ye).floor(),j=re;if(J!==0&&(Z=In),me.bindFramebuffer(k.FRAMEBUFFER,Z)&&me.drawBuffers(D,Z),me.viewport(N),me.scissor(O),me.setScissorTest(j),q){let _e=w.get(D.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+V,_e.__webglTexture,J)}else if(xe){let _e=V;for(let ze=0;ze<D.textures.length;ze++){let Oe=w.get(D.textures[ze]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+ze,Oe.__webglTexture,J,_e)}}else if(D!==null&&J!==0){let _e=w.get(D.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,_e.__webglTexture,J)}L=-1},this.readRenderTargetPixels=function(D,V,J,Z,q,xe,be,_e=0){if(!(D&&D.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=w.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&be!==void 0&&(ze=ze[be]),ze){me.bindFramebuffer(k.FRAMEBUFFER,ze);try{let Oe=D.textures[_e],ot=Oe.format,dt=Oe.type;if(D.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_e),!Be.textureFormatReadable(ot)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(dt)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=D.width-Z&&J>=0&&J<=D.height-q&&k.readPixels(V,J,Z,q,pe.convert(ot),pe.convert(dt),xe)}finally{let Oe=P!==null?w.get(P).__webglFramebuffer:null;me.bindFramebuffer(k.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(D,V,J,Z,q,xe,be,_e=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=w.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&be!==void 0&&(ze=ze[be]),ze)if(V>=0&&V<=D.width-Z&&J>=0&&J<=D.height-q){me.bindFramebuffer(k.FRAMEBUFFER,ze);let Oe=D.textures[_e],ot=Oe.format,dt=Oe.type;if(D.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_e),!Be.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ye=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Ye),k.bufferData(k.PIXEL_PACK_BUFFER,xe.byteLength,k.STREAM_READ),k.readPixels(V,J,Z,q,pe.convert(ot),pe.convert(dt),0);let Ht=P!==null?w.get(P).__webglFramebuffer:null;me.bindFramebuffer(k.FRAMEBUFFER,Ht);let pn=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await b_(k,pn,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Ye),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,xe),k.deleteBuffer(Ye),k.deleteSync(pn),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,V=null,J=0){let Z=Math.pow(2,-J),q=Math.floor(D.image.width*Z),xe=Math.floor(D.image.height*Z),be=V!==null?V.x:0,_e=V!==null?V.y:0;G.setTexture2D(D,0),k.copyTexSubImage2D(k.TEXTURE_2D,J,0,0,be,_e,q,xe),me.unbindTexture()};let Hr=k.createFramebuffer(),Ja=k.createFramebuffer();this.copyTextureToTexture=function(D,V,J=null,Z=null,q=0,xe=0){let be,_e,ze,Oe,ot,dt,Ye,Ht,pn,ln=D.isCompressedTexture?D.mipmaps[xe]:D.image;if(J!==null)be=J.max.x-J.min.x,_e=J.max.y-J.min.y,ze=J.isBox3?J.max.z-J.min.z:1,Oe=J.min.x,ot=J.min.y,dt=J.isBox3?J.min.z:0;else{let On=Math.pow(2,-q);be=Math.floor(ln.width*On),_e=Math.floor(ln.height*On),D.isDataArrayTexture?ze=ln.depth:D.isData3DTexture?ze=Math.floor(ln.depth*On):ze=1,Oe=0,ot=0,dt=0}Z!==null?(Ye=Z.x,Ht=Z.y,pn=Z.z):(Ye=0,Ht=0,pn=0);let Gt=pe.convert(V.format),Qn=pe.convert(V.type),We;V.isData3DTexture?(G.setTexture3D(V,0),We=k.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(G.setTexture2DArray(V,0),We=k.TEXTURE_2D_ARRAY):(G.setTexture2D(V,0),We=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,V.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,V.unpackAlignment);let Li=k.getParameter(k.UNPACK_ROW_LENGTH),Et=k.getParameter(k.UNPACK_IMAGE_HEIGHT),fr=k.getParameter(k.UNPACK_SKIP_PIXELS),Er=k.getParameter(k.UNPACK_SKIP_ROWS),oa=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,ln.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ln.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Oe),k.pixelStorei(k.UNPACK_SKIP_ROWS,ot),k.pixelStorei(k.UNPACK_SKIP_IMAGES,dt);let ja=D.isDataArrayTexture||D.isData3DTexture,Wt=V.isDataArrayTexture||V.isData3DTexture;if(D.isDepthTexture){let On=w.get(D),ds=w.get(V),Bn=w.get(On.__renderTarget),ps=w.get(ds.__renderTarget);me.bindFramebuffer(k.READ_FRAMEBUFFER,Bn.__webglFramebuffer),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,ps.__webglFramebuffer);for(let $a=0;$a<ze;$a++)ja&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,w.get(D).__webglTexture,q,dt+$a),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,w.get(V).__webglTexture,xe,pn+$a)),k.blitFramebuffer(Oe,ot,be,_e,Ye,Ht,be,_e,k.DEPTH_BUFFER_BIT,k.NEAREST);me.bindFramebuffer(k.READ_FRAMEBUFFER,null),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(q!==0||D.isRenderTargetTexture||w.has(D)){let On=w.get(D),ds=w.get(V);me.bindFramebuffer(k.READ_FRAMEBUFFER,Hr),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,Ja);for(let Bn=0;Bn<ze;Bn++)ja?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,On.__webglTexture,q,dt+Bn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,On.__webglTexture,q),Wt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ds.__webglTexture,xe,pn+Bn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ds.__webglTexture,xe),q!==0?k.blitFramebuffer(Oe,ot,be,_e,Ye,Ht,be,_e,k.COLOR_BUFFER_BIT,k.NEAREST):Wt?k.copyTexSubImage3D(We,xe,Ye,Ht,pn+Bn,Oe,ot,be,_e):k.copyTexSubImage2D(We,xe,Ye,Ht,Oe,ot,be,_e);me.bindFramebuffer(k.READ_FRAMEBUFFER,null),me.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Wt?D.isDataTexture||D.isData3DTexture?k.texSubImage3D(We,xe,Ye,Ht,pn,be,_e,ze,Gt,Qn,ln.data):V.isCompressedArrayTexture?k.compressedTexSubImage3D(We,xe,Ye,Ht,pn,be,_e,ze,Gt,ln.data):k.texSubImage3D(We,xe,Ye,Ht,pn,be,_e,ze,Gt,Qn,ln):D.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,xe,Ye,Ht,be,_e,Gt,Qn,ln.data):D.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,xe,Ye,Ht,ln.width,ln.height,Gt,ln.data):k.texSubImage2D(k.TEXTURE_2D,xe,Ye,Ht,be,_e,Gt,Qn,ln);k.pixelStorei(k.UNPACK_ROW_LENGTH,Li),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Et),k.pixelStorei(k.UNPACK_SKIP_PIXELS,fr),k.pixelStorei(k.UNPACK_SKIP_ROWS,Er),k.pixelStorei(k.UNPACK_SKIP_IMAGES,oa),xe===0&&V.generateMipmaps&&k.generateMipmap(We),me.unbindTexture()},this.initRenderTarget=function(D){w.get(D).__webglFramebuffer===void 0&&G.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?G.setTextureCube(D,0):D.isData3DTexture?G.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?G.setTexture2DArray(D,0):G.setTexture2D(D,0),me.unbindTexture()},this.resetState=function(){R=0,b=0,P=null,me.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _r}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=At._getDrawingBufferColorSpace(e),t.unpackColorSpace=At._getUnpackColorSpace()}};var LC=(()=>{let i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Lt;return t.setAttribute("position",new ut(i,3)),t.setAttribute("uv",new ut(e,2)),t})(),Mi=class Dg{static get fullscreenGeometry(){return LC}constructor(e="Pass",t=new Ar,n=new as){this.name=e,this.renderer=null,this.scene=t,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new Rt(Dg.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new Ar),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=yi){}render(e,t,n,r,s){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,n){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof vt||t instanceof Ii||t instanceof Rn||t instanceof Dg)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},FC=class extends Mi{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(i,e,t,n,r){let s=i.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},NC=`#ifdef COLOR_WRITE
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
}`,ll="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",ly=class extends rt{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new ge(null),depthBuffer:new ge(null),channelWeights:new ge(null),opacity:new ge(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:NC,vertexShader:ll}),this.depthFunc=Vo}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(i){let e=i!==null;this.colorWrite!==e&&(e?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=e,this.needsUpdate=!0),this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){let e=i!==null;this.depthWrite!==e&&(e?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=e,this.depthWrite=e,this.needsUpdate=!0),this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(i){this.colorSpaceConversion!==i&&(i?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(i){i!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=i):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},cy=class extends Mi{constructor(i,e=!0){super("CopyPass"),this.fullscreenMaterial=new ly,this.needsSwap=!1,this.renderTarget=i,i===void 0&&(this.renderTarget=new vt(1,1,{minFilter:Vt,magFilter:Vt,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(i){this.autoResize=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(i){this.autoResize=i}render(i,e,t,n,r){this.fullscreenMaterial.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){this.autoResize&&this.renderTarget.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==xt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}},sy=new Xe,uy=class extends Mi{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,r){let s=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=s!==null,c=a>=0;l?(i.getClearColor(sy),i.setClearColor(s,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(sy,o):c&&i.setClearAlpha(o)}},OC=class extends Mi{constructor(i,e){super("MaskPass",i,e),this.needsSwap=!1,this.clearPass=new uy(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,r){let s=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,f=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.stencil.setFunc(s.ALWAYS,u,4294967295),a.stencil.setClear(f),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(s.EQUAL,1,4294967295),a.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.stencil.setLocked(!0)}};function kC(i,e){let t=i.getContext();if(e<=0||typeof t.renderbufferStorageMultisample!="function")return 0;let n=t.getParameter(t.MAX_SAMPLES),r=Math.min(e,n);if(r<=0)return 0;let s=t.getParameter(t.RENDERBUFFER_BINDING),a=t.createRenderbuffer();try{return t.bindRenderbuffer(t.RENDERBUFFER,a),t.renderbufferStorageMultisample(t.RENDERBUFFER,r,t.RGBA8,1,1),r}catch{return 0}finally{t.bindRenderbuffer(t.RENDERBUFFER,s),t.deleteRenderbuffer(a)}}var wg=1/1e3,zC=1e3,HC=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document<"u"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*wg}get fixedDelta(){return this._fixedDelta*wg}set fixedDelta(i){this._fixedDelta=i*zC}get elapsed(){return this._elapsed*wg}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(i!==void 0?i:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(i){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},hy=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:r=xt}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,r,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new cy,this.depthRenderTarget=null,this.passes=[],this.timer=new HC,this.autoRenderToScreen=!0,this.setRenderer(i)}get stableDepthTexture(){return this.depthRenderTarget===null?null:this.depthRenderTarget.depthTexture}get multisampling(){return this.inputBuffer.samples}set multisampling(i){let e=this.renderer===null?i:kC(this.renderer,i);this.multisampling!==e&&(this.inputBuffer.samples=e,this.outputBuffer.samples=e,this.inputBuffer.dispose(),this.outputBuffer.dispose())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){let e=i.getSize(new Se),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===xt&&i.outputColorSpace===it&&(this.inputBuffer.texture.colorSpace=it,this.outputBuffer.texture.colorSpace=it,this.inputBuffer.dispose(),this.outputBuffer.dispose());let r=this.multisampling;this.multisampling=r,i.autoClear=!1,this.setSize(e.width,e.height);for(let s of this.passes)s.initialize(i,t,n)}}replaceRenderer(i,e=!0){let t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){let i=new Bi;i.name="EffectComposer.InputDepth",this.inputBuffer.stencilBuffer?(i.format=or,i.type=Nr):i.type=nn;let e=new Bi;e.format=i.format,e.type=i.type,e.name="EffectComposer.OutputDepth";let t=new Bi;t.format=i.format,t.type=i.type,t.name="EffectComposer.StableDepth",this.inputBuffer.depthTexture=i,this.outputBuffer.depthTexture=e,this.inputBuffer.dispose(),this.outputBuffer.dispose();let{width:n,height:r}=this.inputBuffer;this.depthRenderTarget=new vt(n,r,{depthBuffer:!0,stencilBuffer:this.inputBuffer.stencilBuffer,depthTexture:t})}blitDepthBuffer(i){let e=this.renderer,t=this.depthRenderTarget,n=e.properties,r=e.getContext();e.setRenderTarget(t);let s=n.get(i).__webglFramebuffer,a=n.get(t).__webglFramebuffer,o=i.stencilBuffer?r.DEPTH_BUFFER_BIT|r.STENCIL_BUFFER_BIT:r.DEPTH_BUFFER_BIT;r.bindFramebuffer(r.READ_FRAMEBUFFER,s),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,a),r.blitFramebuffer(0,0,i.width,i.height,0,0,t.width,t.height,o,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),e.setRenderTarget(null)}deleteDepthTexture(){let i=this.stableDepthTexture;for(let e of this.passes)e.getDepthTexture()===i&&e.setDepthTexture(null);this.depthRenderTarget!==null&&(this.depthRenderTarget.dispose(),this.depthRenderTarget=null),this.inputBuffer.depthTexture!==null&&(this.inputBuffer.depthTexture.dispose(),this.inputBuffer.depthTexture=null),this.outputBuffer.depthTexture!==null&&(this.outputBuffer.depthTexture.dispose(),this.outputBuffer.depthTexture=null)}createBuffer(i,e,t,n){let r=this.renderer,s=r===null?new Se:r.getDrawingBufferSize(new Se),a=new vt(s.width,s.height,{minFilter:Vt,magFilter:Vt,samples:n,stencilBuffer:e,depthBuffer:i,type:t});return t===xt&&r!==null&&r.outputColorSpace===it&&(a.texture.colorSpace=it),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(i){for(let e of this.passes)e.mainScene=i}setMainCamera(i){for(let e of this.passes)e.mainCamera=i}addPass(i,e){let t=this.passes,n=this.renderer,r=n.getDrawingBufferSize(new Se),s=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.renderer=n,i.setSize(r.width,r.height),i.initialize(n,s,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthRenderTarget!==null)if(this.depthRenderTarget===null){this.createDepthTexture();for(let o of t)o.setDepthTexture(this.stableDepthTexture)}else i.setDepthTexture(this.stableDepthTexture)}removePass(i){let e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){let s=this.stableDepthTexture;if(s!==null){let a=(l,c)=>l||c.needsDepthTexture;e.reduce(a,!1)||(i.getDepthTexture()===s&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){let i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){let e=this.renderer,t=this.copyPass,n=this.inputBuffer,r=this.outputBuffer,s,a=!1;i===void 0&&(this.timer.update(),i=this.timer.getDelta());for(let o of this.passes)if(o.enabled){if(o.render(e,n,r,i,a),o.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(n),o.needsSwap){if(a){t.renderToScreen=o.renderToScreen;let l=e.getContext(),c=e.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),t.render(e,n,r,i,a),c.setFunc(l.EQUAL,1,4294967295)}s=n,n=r,r=s}o instanceof OC?a=!0:o instanceof FC&&(a=!1)}}setSize(i,e,t){let n=this.renderer,r=n.getSize(new Se);(i===void 0||e===void 0)&&(i=r.width,e=r.height),(r.width!==i||r.height!==e)&&n.setSize(i,e,t);let s=n.getDrawingBufferSize(new Se);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(s.width,s.height);for(let a of this.passes)a.setSize(s.width,s.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let i of this.passes)i.dispose();this.deleteDepthTexture(),this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.copyPass.dispose(),this.timer.dispose(),this.passes=[],Mi.fullscreenGeometry.dispose()}},Qs={NONE:0,DEPTH:1,CONVOLUTION:2},bt={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},GC=class{constructor(){this.shaderParts=new Map([[bt.FRAGMENT_HEAD,null],[bt.FRAGMENT_MAIN_UV,null],[bt.FRAGMENT_MAIN_IMAGE,null],[bt.VERTEX_HEAD,null],[bt.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=Qs.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Pi}};var Cg=!1,ay=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case gn:t=this.materialsFlatShadedDoubleSide;break;case tn:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case gn:t=this.materialsDoubleSide;break;case tn:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(i){if(!(i instanceof rt))return i.clone();let e=i.uniforms,t=new Map;for(let r in e){let s=e[r].value;s.isRenderTargetTexture&&(e[r].value=null,t.set(r,s))}let n=i.clone();for(let r of t)e[r[0]].value=r[1],n.uniforms[r[0]].value=r[1];return n}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){let e=this.materials=[this.cloneMaterial(i),this.cloneMaterial(i),this.cloneMaterial(i)];for(let t of e)t.uniforms=Object.assign({},i.uniforms),t.side=ri;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=tn,n}),this.materialsDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=gn,n}),this.materialsFlatShaded=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=tn,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=gn,n})}}render(i,e,t){let n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,Cg){let r=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(let s of r)s[0].material=s[1];this.meshCount!==r.size&&r.clear()}else{let r=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=r}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){let i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Cg}static set workaroundEnabled(i){Cg=i}};var qs=-1,Qi=class extends xi{constructor(i=null,e=qs,t=qs,n=1){super(),i!==null&&this.addEventListener("change",()=>i.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new Se(1,1),this.preferredSize=new Se(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new Se,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==qs?t.width=e.width:e.height!==qs?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==qs?t.height=e.height:e.width!==qs?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(qs),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return qs}};var ft={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},VC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",WC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",XC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",YC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",qC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",QC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ZC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",KC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",JC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",jC="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",$C="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",e2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",t2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",n2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",i2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",r2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",s2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",a2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",o2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",l2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",c2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",u2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",h2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",f2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",d2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",p2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",m2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",g2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",v2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",x2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",_2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",y2="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",A2=new Map([[ft.ADD,VC],[ft.ALPHA,WC],[ft.AVERAGE,XC],[ft.COLOR,YC],[ft.COLOR_BURN,qC],[ft.COLOR_DODGE,QC],[ft.DARKEN,ZC],[ft.DIFFERENCE,KC],[ft.DIVIDE,JC],[ft.DST,null],[ft.EXCLUSION,jC],[ft.HARD_LIGHT,$C],[ft.HARD_MIX,e2],[ft.HUE,t2],[ft.INVERT,n2],[ft.INVERT_RGB,i2],[ft.LIGHTEN,r2],[ft.LINEAR_BURN,s2],[ft.LINEAR_DODGE,a2],[ft.LINEAR_LIGHT,o2],[ft.LUMINOSITY,l2],[ft.MULTIPLY,c2],[ft.NEGATION,u2],[ft.NORMAL,h2],[ft.OVERLAY,f2],[ft.PIN_LIGHT,d2],[ft.REFLECT,p2],[ft.SATURATION,m2],[ft.SCREEN,g2],[ft.SOFT_LIGHT,v2],[ft.SRC,x2],[ft.SUBTRACT,_2],[ft.VIVID_LIGHT,y2]]),S2=class extends xi{constructor(i,e=1){super(),this._blendFunction=i,this.opacity=new ge(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return A2.get(this.blendFunction)}};var Wa=class extends xi{constructor(i,e,{attributes:t=Qs.NONE,blendFunction:n=ft.NORMAL,defines:r=new Map,uniforms:s=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=r,this.uniforms=s,this.extensions=a,this.blendMode=new S2(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Pi,this._outputColorSpace=Ai}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=yi){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(let i of Object.keys(this)){let e=this[i];(e instanceof vt||e instanceof Ii||e instanceof Rn||e instanceof Mi)&&this[i].dispose()}}};var od={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},M2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,T2="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",E2=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],b2=class extends rt{constructor(i=new St){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new ge(null),texelSize:new ge(new St),scale:new ge(1),kernel:new ge(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:M2,vertexShader:T2}),this.setTexelSize(i.x,i.y),this.kernelSize=od.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return E2[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){let t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},fy=class extends Mi{constructor({kernelSize:i=od.MEDIUM,resolutionScale:e=.5,width:t=Qi.AUTO_SIZE,height:n=Qi.AUTO_SIZE,resolutionX:r=t,resolutionY:s=n}={}){super("KawaseBlurPass"),this.renderTargetA=new vt(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let a=this.resolution=new Qi(this,r,s,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new b2,this._blurMaterial.kernelSize=i,this.copyMaterial=new ly}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence,f=e;this.fullscreenMaterial=c;for(let h=0,d=u.length;h<d;++h){let p=(h&1)===0?o:l;c.kernel=u[h],c.inputBuffer=f.texture,i.setRenderTarget(p),i.render(s,a),f=p}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=f.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(s,a)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.renderTargetA.setSize(n,r),this.renderTargetB.setSize(n,r),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==xt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i!==null&&i.outputColorSpace===it&&(this.renderTargetA.texture.colorSpace=it,this.renderTargetB.texture.colorSpace=it))}static get AUTO_SIZE(){return Qi.AUTO_SIZE}},w2=`#include <common>
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
}`,C2=class extends rt{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:Wn.replace(/\D+/g,"")},uniforms:{inputBuffer:new ge(null),threshold:new ge(0),smoothing:new ge(1),range:new ge(null)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:w2,vertexShader:ll}),this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},dy=class extends Mi{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:r=Qi.AUTO_SIZE,height:s=Qi.AUTO_SIZE,resolutionX:a=r,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new C2(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new Qi(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,r){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},R2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,D2="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",P2=class extends rt{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new ge(null),texelSize:new ge(new Se)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:R2,vertexShader:D2})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},I2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,B2="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",U2=class extends rt{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new ge(null),supportBuffer:new ge(null),texelSize:new ge(new Se),radius:new ge(.85)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:I2,vertexShader:B2})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},L2=class extends Mi{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new P2,this.upsamplingMaterial=new U2,this.resolution=new Se}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){let e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){let n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){let r=e.clone();r.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,r){let{scene:s,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this,f=e;this.fullscreenMaterial=o;for(let h=0,d=c.length;h<d;++h){let p=c[h];o.setSize(f.width,f.height),o.inputBuffer=f.texture,i.setRenderTarget(p),i.render(s,a),f=p}this.fullscreenMaterial=l;for(let h=u.length-1;h>=0;--h){let d=u[h];l.setSize(f.width,f.height),l.inputBuffer=f.texture,l.supportBuffer=c[h].texture,i.setRenderTarget(d),i.render(s,a),f=d}}setSize(i,e){let t=this.resolution;t.set(i,e);let n=t.width,r=t.height;for(let s=0,a=this.downsamplingMipmaps.length;s<a;++s)n=Math.round(n*.5),r=Math.round(r*.5),this.downsamplingMipmaps[s].setSize(n,r),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(n,r)}initialize(i,e,t){if(t!==void 0){let n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let r of n)r.texture.type=t;if(t!==xt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i!==null&&i.outputColorSpace===it)for(let r of n)r.texture.colorSpace=it}}dispose(){super.dispose();for(let i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},F2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,py=class extends Wa{constructor({blendFunction:i=ft.SCREEN,luminanceThreshold:e=1,luminanceSmoothing:t=.03,mipmapBlur:n=!0,intensity:r=1,radius:s=.85,levels:a=8,kernelSize:o=od.LARGE,resolutionScale:l=.5,width:c=Qi.AUTO_SIZE,height:u=Qi.AUTO_SIZE,resolutionX:f=c,resolutionY:h=u}={}){super("BloomEffect",F2,{blendFunction:i,uniforms:new Map([["map",new ge(null)],["intensity",new ge(r)]])}),this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new fy({kernelSize:o}),this.luminancePass=new dy({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new L2,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;let d=this.resolution=new Qi(this,f,h,l);d.addEventListener("change",p=>this.setSize(d.baseWidth,d.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){let n=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,r.renderTarget):this.blurPass.render(i,r.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it))}};var my={RED:0,GREEN:1,BLUE:2,ALPHA:3},gy={DISCARD:0,MULTIPLY:1,MULTIPLY_RGB_SET_ALPHA:2,MULTIPLY_RGB:3},N2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
}}`,ad=class extends rt{constructor(i=!1,e=!1){super({name:"BokehMaterial",defines:{PASS:i?"2":"1"},uniforms:{inputBuffer:new ge(null),cocBuffer:new ge(null),texelSize:new ge(new Se),kernel64:new ge(null),kernel16:new ge(null),scale:new ge(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:N2,vertexShader:ll}),e&&(this.defines.FOREGROUND="1"),this.generateKernel()}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set cocBuffer(i){this.uniforms.cocBuffer.value=i}setCoCBuffer(i){this.uniforms.cocBuffer.value=i}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(i){return this.scale}setScale(i){this.scale=i}generateKernel(){let i=2.39996323,e=new Float64Array(128),t=new Float64Array(32),n=0,r=0;for(let s=0,a=Math.sqrt(80);s<80;++s){let o=s*i,l=Math.sqrt(s)/a,c=l*Math.cos(o),u=l*Math.sin(o);s%5===0?(t[r++]=c,t[r++]=u):(e[n++]=c,e[n++]=u)}this.uniforms.kernel64.value=e,this.uniforms.kernel16.value=t}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e)}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},O2=`#include <common>
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
void main(){float depth=readDepth(vUv);vec3 viewPosition=getViewPosition(vUv,depth);float distance=getDistance(viewPosition);float signedDistance=distance-focusDistance;float magnitude=smoothstep(0.0,focusRange,abs(signedDistance));gl_FragColor.rg=magnitude*vec2(step(signedDistance,0.0),step(0.0,signedDistance));}`,k2=class extends rt{constructor(i=null){super({name:"CircleOfConfusionMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new ge(null),projectionMatrix:new ge(null),projectionMatrixInverse:new ge(null),cameraNear:new ge(.3),cameraFar:new ge(1e3),focusDistance:new ge(0),focusRange:new ge(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:O2,vertexShader:ll}),this.uniforms.focalLength=this.uniforms.focusRange,i!==null&&this.copyCameraSettings(i)}set depthBuffer(i){this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=yi){this.depthBuffer=i,this.depthPacking=e}get focusDistance(){return this.uniforms.focusDistance.value}set focusDistance(i){this.uniforms.focusDistance.value=i}get worldFocusDistance(){return this.focusDistance}set worldFocusDistance(i){this.focusDistance=i}getFocusDistance(i){this.uniforms.focusDistance.value=i}setFocusDistance(i){this.uniforms.focusDistance.value=i}get focalLength(){return this.focusRange}set focalLength(i){this.focusRange=i}get focusRange(){return this.uniforms.focusRange.value}set focusRange(i){this.uniforms.focusRange.value=i}get worldFocusRange(){return this.focusRange}set worldFocusRange(i){this.focusRange=i}getFocalLength(i){return this.focusRange}setFocalLength(i){this.focusRange=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){this.uniforms.projectionMatrix.value=i.projectionMatrix,this.uniforms.projectionMatrixInverse.value=i.projectionMatrixInverse,this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far;let e=this.defines.PERSPECTIVE_CAMERA!==void 0;i instanceof yn?e||(this.defines.PERSPECTIVE_CAMERA=!0,this.needsUpdate=!0):e&&(delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},z2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
}`,H2=class extends rt{constructor(i=null){super({name:"MaskMaterial",uniforms:{maskTexture:new ge(i),inputBuffer:new ge(null),strength:new ge(1)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:z2,vertexShader:ll}),this.colorChannel=my.RED,this.maskFunction=gy.DISCARD}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}set maskTexture(i){this.uniforms.maskTexture.value=i,delete this.defines.MASK_PRECISION_HIGH,i.type!==xt&&(this.defines.MASK_PRECISION_HIGH="1"),this.needsUpdate=!0}setMaskTexture(i){this.maskTexture=i}set colorChannel(i){this.defines.COLOR_CHANNEL=i.toFixed(0),this.needsUpdate=!0}setColorChannel(i){this.colorChannel=i}set maskFunction(i){this.defines.MASK_FUNCTION=i.toFixed(0),this.needsUpdate=!0}setMaskFunction(i){this.maskFunction=i}get inverted(){return this.defines.INVERTED!==void 0}set inverted(i){this.inverted&&!i?delete this.defines.INVERTED:i&&(this.defines.INVERTED="1"),this.needsUpdate=!0}isInverted(){return this.inverted}setInverted(i){this.inverted=i}get strength(){return this.uniforms.strength.value}set strength(i){this.uniforms.strength.value=i}getStrength(){return this.strength}setStrength(i){this.strength=i}},ol=class extends Mi{constructor(i,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,r){let s=this.fullscreenMaterial.uniforms;e!==null&&s!==void 0&&s[this.input]!==void 0&&(s[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},G2=`#ifdef FRAMEBUFFER_PRECISION_HIGH
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
vec4 result=inputColor*(1.0-cocNearFar.y)+colorFar;result=mix(result,colorNear,cocNearFar.x);outputColor=result;}`,V2=new B,vy=class extends Wa{constructor(i,{blendFunction:e,worldFocusDistance:t,worldFocusRange:n,focalLength:r,focusDistance:s=t||3,focusRange:a=n||r||2,bokehScale:o=1,resolutionScale:l=.5,width:c,height:u,resolutionX:f=c||Qi.AUTO_SIZE,resolutionY:h=u||Qi.AUTO_SIZE}={}){super("DepthOfFieldEffect",G2,{blendFunction:e,attributes:Qs.DEPTH,uniforms:new Map([["nearColorBuffer",new ge(null)],["farColorBuffer",new ge(null)],["nearCoCBuffer",new ge(null)],["farCoCBuffer",new ge(null)],["scale",new ge(1)]])}),this.camera=i,this.renderTarget=new vt(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="DoF.Intermediate",this.renderTargetMasked=this.renderTarget.clone(),this.renderTargetMasked.texture.name="DoF.Masked.Far",this.renderTargetNear=this.renderTarget.clone(),this.renderTargetNear.texture.name="DoF.Bokeh.Near",this.uniforms.get("nearColorBuffer").value=this.renderTargetNear.texture,this.renderTargetFar=this.renderTarget.clone(),this.renderTargetFar.texture.name="DoF.Bokeh.Far",this.uniforms.get("farColorBuffer").value=this.renderTargetFar.texture,this.renderTargetCoC=this.renderTarget.clone(),this.renderTargetCoC.texture.name="DoF.CoC",this.uniforms.get("farCoCBuffer").value=this.renderTargetCoC.texture,this.renderTargetCoCBlurred=this.renderTargetCoC.clone(),this.renderTargetCoCBlurred.texture.name="DoF.CoC.Blurred",this.uniforms.get("nearCoCBuffer").value=this.renderTargetCoCBlurred.texture,this.cocPass=new ol(new k2(i));let d=this.cocMaterial;d.focusDistance=s,d.focusRange=a,this.blurPass=new fy({resolutionScale:l,resolutionX:f,resolutionY:h,kernelSize:od.MEDIUM}),this.maskPass=new ol(new H2(this.renderTargetCoC.texture));let p=this.maskPass.fullscreenMaterial;p.colorChannel=my.GREEN,this.maskFunction=gy.MULTIPLY_RGB,this.bokehNearBasePass=new ol(new ad(!1,!0)),this.bokehNearBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehNearFillPass=new ol(new ad(!0,!0)),this.bokehNearFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoCBlurred.texture,this.bokehFarBasePass=new ol(new ad(!1,!1)),this.bokehFarBasePass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.bokehFarFillPass=new ol(new ad(!0,!1)),this.bokehFarFillPass.fullscreenMaterial.cocBuffer=this.renderTargetCoC.texture,this.target=null;let v=this.resolution=new Qi(this,f,h,l);v.addEventListener("change",m=>this.setSize(v.baseWidth,v.baseHeight)),this.bokehScale=o}set mainCamera(i){this.camera=i,this.cocMaterial.copyCameraSettings(i)}get cocTexture(){return this.renderTargetCoC.texture}get maskFunction(){return this.maskPass.fullscreenMaterial.maskFunction}set maskFunction(i){this.maskFunction!==i&&(this.defines.set("MASK_FUNCTION",i.toFixed(0)),this.maskPass.fullscreenMaterial.maskFunction=i,this.setChanged())}get cocMaterial(){return this.cocPass.fullscreenMaterial}get circleOfConfusionMaterial(){return this.cocMaterial}getCircleOfConfusionMaterial(){return this.cocMaterial}getBlurPass(){return this.blurPass}getResolution(){return this.resolution}get bokehScale(){return this.uniforms.get("scale").value}set bokehScale(i){this.bokehNearBasePass.fullscreenMaterial.scale=i,this.bokehNearFillPass.fullscreenMaterial.scale=i,this.bokehFarBasePass.fullscreenMaterial.scale=i,this.bokehFarFillPass.fullscreenMaterial.scale=i,this.maskPass.fullscreenMaterial.strength=i,this.uniforms.get("scale").value=i}getBokehScale(){return this.bokehScale}setBokehScale(i){this.bokehScale=i}getTarget(){return this.target}setTarget(i){this.target=i}calculateFocusDistance(i){return this.camera.getWorldPosition(V2).distanceTo(i)}setDepthTexture(i,e=yi){this.cocMaterial.depthBuffer=i,this.cocMaterial.depthPacking=e}update(i,e,t){let n=this.renderTarget,r=this.renderTargetCoC,s=this.renderTargetCoCBlurred,a=this.renderTargetMasked;if(this.target!==null){let o=this.calculateFocusDistance(this.target);this.cocMaterial.focusDistance=o}this.cocPass.render(i,null,r),this.blurPass.render(i,r,s),this.maskPass.render(i,e,a),this.bokehFarBasePass.render(i,a,n),this.bokehFarFillPass.render(i,n,this.renderTargetFar),this.bokehNearBasePass.render(i,e,n),this.bokehNearFillPass.render(i,n,this.renderTargetNear)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,r=t.height;this.cocPass.setSize(i,e),this.blurPass.setSize(i,e),this.maskPass.setSize(i,e),this.renderTargetFar.setSize(i,e),this.renderTargetCoC.setSize(i,e),this.renderTargetMasked.setSize(i,e),this.renderTarget.setSize(n,r),this.renderTargetNear.setSize(n,r),this.renderTargetCoCBlurred.setSize(n,r),this.bokehNearBasePass.fullscreenMaterial.setSize(i,e),this.bokehNearFillPass.fullscreenMaterial.setSize(i,e),this.bokehFarBasePass.fullscreenMaterial.setSize(i,e),this.bokehFarFillPass.fullscreenMaterial.setSize(i,e)}initialize(i,e,t){this.cocPass.initialize(i,e,t),this.maskPass.initialize(i,e,t),this.bokehNearBasePass.initialize(i,e,t),this.bokehNearFillPass.initialize(i,e,t),this.bokehFarBasePass.initialize(i,e,t),this.bokehFarFillPass.initialize(i,e,t),this.blurPass.initialize(i,e,xt),i.capabilities.logarithmicDepthBuffer&&(this.cocPass.fullscreenMaterial.defines.LOG_DEPTH="1"),t!==void 0&&(this.renderTarget.texture.type=t,this.renderTargetNear.texture.type=t,this.renderTargetFar.texture.type=t,this.renderTargetMasked.texture.type=t,i!==null&&i.outputColorSpace===it&&(this.renderTarget.texture.colorSpace=it,this.renderTargetNear.texture.colorSpace=it,this.renderTargetFar.texture.colorSpace=it,this.renderTargetMasked.texture.colorSpace=it))}};var xy=class extends Mi{constructor(i,e,t=null){super("RenderPass",i,e),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new uy,this.overrideMaterialManager=t===null?null:new ay(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){let i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){let e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new ay(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,r){let s=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=s.background,u=i.shadowMap.autoUpdate,f=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(f),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,s,a):i.render(s,a),a.layers.mask=l,s.background=c,i.shadowMap.autoUpdate=u}};var Si={LINEAR:0,REINHARD:1,REINHARD2:2,REINHARD2_ADAPTIVE:3,UNCHARTED2:4,OPTIMIZED_CINEON:5,CINEON:5,ACES_FILMIC:6,AGX:7,NEUTRAL:8},tu={DEFAULT:0,ESKIL:1};var W2=`void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec3 noise=vec3(rand(uv*(1.0+time)));
#ifdef PREMULTIPLY
outputColor=vec4(min(inputColor.rgb*noise,vec3(1.0)),inputColor.a);
#else
outputColor=vec4(noise,inputColor.a);
#endif
}`,_y=class extends Wa{constructor({blendFunction:i=ft.SCREEN,premultiply:e=!1}={}){super("NoiseEffect",W2,{blendFunction:i}),this.premultiply=e}get premultiply(){return this.defines.has("PREMULTIPLY")}set premultiply(i){this.premultiply!==i&&(i?this.defines.set("PREMULTIPLY","1"):this.defines.delete("PREMULTIPLY"),this.setChanged())}isPremultiplied(){return this.premultiply}setPremultiplied(i){this.premultiply=i}};var r3=Math.PI*.5;var X2=`#include <packing>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
uniform lowp sampler2D luminanceBuffer0;uniform lowp sampler2D luminanceBuffer1;uniform float minLuminance;uniform float deltaTime;uniform float tau;varying vec2 vUv;void main(){float l0=unpackRGBAToFloat(texture2D(luminanceBuffer0,vUv));
#if __VERSION__ < 300
float l1=texture2DLodEXT(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#else
float l1=textureLod(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#endif
l0=max(minLuminance,l0);l1=max(minLuminance,l1);float adaptedLum=l0+(l1-l0)*(1.0-exp(-deltaTime*tau));gl_FragColor=(adaptedLum==1.0)?vec4(1.0):packFloatToRGBA(adaptedLum);}`,Y2=class extends rt{constructor(){super({name:"AdaptiveLuminanceMaterial",defines:{MIP_LEVEL_1X1:"0.0"},uniforms:{luminanceBuffer0:new ge(null),luminanceBuffer1:new ge(null),minLuminance:new ge(.01),deltaTime:new ge(0),tau:new ge(1)},extensions:{shaderTextureLOD:!0},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:X2,vertexShader:ll})}set luminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}setLuminanceBuffer0(i){this.uniforms.luminanceBuffer0.value=i}set luminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}setLuminanceBuffer1(i){this.uniforms.luminanceBuffer1.value=i}set mipLevel1x1(i){this.defines.MIP_LEVEL_1X1=i.toFixed(1),this.needsUpdate=!0}setMipLevel1x1(i){this.mipLevel1x1=i}set deltaTime(i){this.uniforms.deltaTime.value=i}setDeltaTime(i){this.uniforms.deltaTime.value=i}get minLuminance(){return this.uniforms.minLuminance.value}set minLuminance(i){this.uniforms.minLuminance.value=i}getMinLuminance(){return this.uniforms.minLuminance.value}setMinLuminance(i){this.uniforms.minLuminance.value=i}get adaptationRate(){return this.uniforms.tau.value}set adaptationRate(i){this.uniforms.tau.value=i}getAdaptationRate(){return this.uniforms.tau.value}setAdaptationRate(i){this.uniforms.tau.value=i}},q2=class extends Mi{constructor(i,{minLuminance:e=.01,adaptationRate:t=1}={}){super("AdaptiveLuminancePass"),this.fullscreenMaterial=new Y2,this.needsSwap=!1,this.renderTargetPrevious=new vt(1,1,{minFilter:Ct,magFilter:Ct,depthBuffer:!1}),this.renderTargetPrevious.texture.name="Luminance.Previous";let n=this.fullscreenMaterial;n.luminanceBuffer0=this.renderTargetPrevious.texture,n.luminanceBuffer1=i,n.minLuminance=e,n.adaptationRate=t,this.renderTargetAdapted=this.renderTargetPrevious.clone(),this.renderTargetAdapted.texture.name="Luminance.Adapted",this.copyPass=new cy(this.renderTargetPrevious,!1)}get texture(){return this.renderTargetAdapted.texture}getTexture(){return this.renderTargetAdapted.texture}set mipLevel1x1(i){this.fullscreenMaterial.mipLevel1x1=i}get adaptationRate(){return this.fullscreenMaterial.adaptationRate}set adaptationRate(i){this.fullscreenMaterial.adaptationRate=i}render(i,e,t,n,r){this.fullscreenMaterial.deltaTime=n,i.setRenderTarget(this.renderToScreen?null:this.renderTargetAdapted),i.render(this.scene,this.camera),this.copyPass.render(i,this.renderTargetAdapted)}},Q2=`#include <tonemapping_pars_fragment>
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
}`,yy=class extends Wa{constructor({blendFunction:i=ft.SRC,adaptive:e=!1,mode:t=e?Si.REINHARD2_ADAPTIVE:Si.AGX,resolution:n=256,maxLuminance:r=4,whitePoint:s=r,middleGrey:a=.6,minLuminance:o=.01,averageLuminance:l=1,adaptationRate:c=1}={}){super("ToneMappingEffect",Q2,{blendFunction:i,uniforms:new Map([["luminanceBuffer",new ge(null)],["maxLuminance",new ge(r)],["whitePoint",new ge(s)],["middleGrey",new ge(a)],["averageLuminance",new ge(l)]])}),this.renderTargetLuminance=new vt(1,1,{minFilter:Fr,depthBuffer:!1}),this.renderTargetLuminance.texture.generateMipmaps=!0,this.renderTargetLuminance.texture.name="Luminance",this.luminancePass=new dy({renderTarget:this.renderTargetLuminance}),this.adaptiveLuminancePass=new q2(this.luminancePass.texture,{minLuminance:o,adaptationRate:c}),this.uniforms.get("luminanceBuffer").value=this.adaptiveLuminancePass.texture,this.resolution=n,this.mode=t}get mode(){return Number(this.defines.get("TONE_MAPPING_MODE"))}set mode(i){if(this.mode===i)return;let t=Wn.replace(/\D+/g,"")>=168?"CineonToneMapping(texel)":"OptimizedCineonToneMapping(texel)";switch(this.defines.clear(),this.defines.set("TONE_MAPPING_MODE",i.toFixed(0)),i){case Si.LINEAR:this.defines.set("toneMapping(texel)","LinearToneMapping(texel)");break;case Si.REINHARD:this.defines.set("toneMapping(texel)","ReinhardToneMapping(texel)");break;case Si.CINEON:case Si.OPTIMIZED_CINEON:this.defines.set("toneMapping(texel)",t);break;case Si.ACES_FILMIC:this.defines.set("toneMapping(texel)","ACESFilmicToneMapping(texel)");break;case Si.AGX:this.defines.set("toneMapping(texel)","AgXToneMapping(texel)");break;case Si.NEUTRAL:this.defines.set("toneMapping(texel)","NeutralToneMapping(texel)");break;default:this.defines.set("toneMapping(texel)","texel");break}this.adaptiveLuminancePass.enabled=i===Si.REINHARD2_ADAPTIVE,this.setChanged()}getMode(){return this.mode}setMode(i){this.mode=i}get whitePoint(){return this.uniforms.get("whitePoint").value}set whitePoint(i){this.uniforms.get("whitePoint").value=i}get middleGrey(){return this.uniforms.get("middleGrey").value}set middleGrey(i){this.uniforms.get("middleGrey").value=i}get averageLuminance(){return this.uniforms.get("averageLuminance").value}set averageLuminance(i){this.uniforms.get("averageLuminance").value=i}get adaptiveLuminanceMaterial(){return this.adaptiveLuminancePass.fullscreenMaterial}getAdaptiveLuminanceMaterial(){return this.adaptiveLuminanceMaterial}get resolution(){return this.luminancePass.resolution.width}set resolution(i){let e=Math.max(0,Math.ceil(Math.log2(i))),t=Math.pow(2,e);this.luminancePass.resolution.setPreferredSize(t,t),this.adaptiveLuminanceMaterial.mipLevel1x1=e}getResolution(){return this.resolution}setResolution(i){this.resolution=i}get adaptive(){return this.mode===Si.REINHARD2_ADAPTIVE}set adaptive(i){this.mode=i?Si.REINHARD2_ADAPTIVE:Si.REINHARD2}get adaptationRate(){return this.adaptiveLuminanceMaterial.adaptationRate}set adaptationRate(i){this.adaptiveLuminanceMaterial.adaptationRate=i}get distinction(){return console.warn(this.name,"distinction was removed."),1}set distinction(i){console.warn(this.name,"distinction was removed.")}update(i,e,t){this.adaptiveLuminancePass.enabled&&(this.luminancePass.render(i,e),this.adaptiveLuminancePass.render(i,null,null,t))}initialize(i,e,t){this.adaptiveLuminancePass.initialize(i,e,t)}},Z2=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,Ay=class extends Wa{constructor({blendFunction:i,eskil:e=!1,technique:t=e?tu.ESKIL:tu.DEFAULT,offset:n=.5,darkness:r=.5}={}){super("VignetteEffect",Z2,{blendFunction:i,defines:new Map([["VIGNETTE_TECHNIQUE",t.toFixed(0)]]),uniforms:new Map([["offset",new ge(n)],["darkness",new ge(r)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(i){this.technique!==i&&(this.defines.set("VIGNETTE_TECHNIQUE",i.toFixed(0)),this.setChanged())}get eskil(){return this.technique===tu.ESKIL}set eskil(i){this.technique=i?tu.ESKIL:tu.DEFAULT}getTechnique(){return this.technique}setTechnique(i){this.technique=i}get offset(){return this.uniforms.get("offset").value}set offset(i){this.uniforms.get("offset").value=i}getOffset(){return this.offset}setOffset(i){this.offset=i}get darkness(){return this.uniforms.get("darkness").value}set darkness(i){this.uniforms.get("darkness").value=i}getDarkness(){return this.darkness}setDarkness(i){this.darkness=i}};var K2=`#include <common>
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
}`,J2="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",j2=class extends rt{constructor(i,e,t,n,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Wn.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new ge(null),depthBuffer:new ge(null),resolution:new ge(new Se),texelSize:new ge(new Se),cameraNear:new ge(.3),cameraFar:new ge(1e3),aspect:new ge(1),time:new ge(0)},blending:Ft,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:r}),i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=yi){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){return this.fragmentShader=K2.replace(bt.FRAGMENT_HEAD,i.get(bt.FRAGMENT_HEAD)||"").replace(bt.FRAGMENT_MAIN_UV,i.get(bt.FRAGMENT_MAIN_UV)||"").replace(bt.FRAGMENT_MAIN_IMAGE,i.get(bt.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=J2.replace(bt.VERTEX_HEAD,i.get(bt.VERTEX_HEAD)||"").replace(bt.VERTEX_MAIN_SUPPORT,i.get(bt.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(i){for(let e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(let e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(let e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof yn?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){let t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return bt}};var h3=Number(Wn.replace(/\D+/g,"")),Va=255/256,f3=new Float32Array([Va/256**3,Va/256**2,Va/256,Va]),d3=new Float32Array([Va,Va/256,Va/256**2,1/256**3]);function oy(i,e,t){for(let n of e){let r="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),s=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(let a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(s,r))}}function $2(i,e,t){let n=e.getFragmentShader(),r=e.getVertexShader(),s=n!==void 0&&/mainImage/.test(n),a=n!==void 0&&/mainUv/.test(n);if(t.attributes|=e.getAttributes(),n===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(t.attributes&Qs.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!s&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts,c=l.get(bt.FRAGMENT_HEAD)||"",u=l.get(bt.FRAGMENT_MAIN_UV)||"",f=l.get(bt.FRAGMENT_MAIN_IMAGE)||"",h=l.get(bt.VERTEX_HEAD)||"",d=l.get(bt.VERTEX_MAIN_SUPPORT)||"",p=new Set,v=new Set;if(a&&(u+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),r!==null&&/mainSupport/.test(r)){let x=/mainSupport *\([\w\s]*?uv\s*?\)/.test(r);d+=`	${i}MainSupport(`,d+=x?`vUv);
`:`);
`;for(let A of r.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let y of A[1].split(/\s*,\s*/))t.varyings.add(y),p.add(y),v.add(y);for(let A of r.matchAll(o))v.add(A[1])}for(let x of n.matchAll(o))v.add(x[1]);for(let x of e.defines.keys())v.add(x.replace(/\([\w\s,]*\)/g,""));for(let x of e.uniforms.keys())v.add(x);v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((x,A)=>t.uniforms.set(i+A.charAt(0).toUpperCase()+A.slice(1),x)),e.defines.forEach((x,A)=>t.defines.set(i+A.charAt(0).toUpperCase()+A.slice(1),x));let m=new Map([["fragment",n],["vertex",r]]);oy(i,v,t.defines),oy(i,v,m),n=m.get("fragment"),r=m.get("vertex");let g=e.blendMode;if(t.blendModes.set(g.blendFunction,g),s){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(f+=e.inputColorSpace===it?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==Ai?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);let x=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${i}MainImage(color0, UV, `,(t.attributes&Qs.DEPTH)!==0&&x.test(n)&&(f+="depth, ",t.readDepth=!0),f+=`color1);
	`;let A=i+"BlendOpacity";t.uniforms.set(A,g.opacity),f+=`color0 = blend${g.blendFunction}(color0, color1, ${A});

	`,c+=`uniform float ${A};

`}if(c+=n+`
`,r!==null&&(h+=r+`
`),l.set(bt.FRAGMENT_HEAD,c),l.set(bt.FRAGMENT_MAIN_UV,u),l.set(bt.FRAGMENT_MAIN_IMAGE,f),l.set(bt.VERTEX_HEAD,h),l.set(bt.VERTEX_MAIN_SUPPORT,d),e.extensions!==null)for(let x of e.extensions)t.extensions.add(x)}}var Pg=class extends Mi{constructor(i,...e){super("EffectPass"),this.fullscreenMaterial=new j2(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(let e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(let e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){let e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let i=new GC,e=0;for(let a of this.effects)if(a.blendMode.blendFunction===ft.DST)i.attributes|=a.getAttributes()&Qs.DEPTH;else{if((i.attributes&a.getAttributes()&Qs.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);$2("e"+e++,a,i)}let t=i.shaderParts.get(bt.FRAGMENT_HEAD),n=i.shaderParts.get(bt.FRAGMENT_MAIN_IMAGE),r=i.shaderParts.get(bt.FRAGMENT_MAIN_UV),s=/\bblend\b/g;for(let a of i.blendModes.values())t+=a.getShaderCode().replace(s,`blend${a.blendFunction}`)+`
`;(i.attributes&Qs.DEPTH)!==0?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===it&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(bt.FRAGMENT_HEAD,t),i.shaderParts.set(bt.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(bt.FRAGMENT_MAIN_UV,r);for(let[a,o]of i.shaderParts)o!==null&&i.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=yi){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(let t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,r){for(let s of this.effects)s.update(i,e,n);if(!this.skipRendering||this.renderToScreen){let s=this.fullscreenMaterial;s.inputBuffer=e.texture,s.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(let t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(let n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}};var m3=[new Float32Array(3),new Float32Array(3)],g3=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],v3=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var x3=[new Float32Array(2),new Float32Array(2)];var _3=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),y3=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],A3=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],S3=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var M3=new Map([[li(0,0,0,0),new Float32Array([0,0,0,0])],[li(0,0,0,1),new Float32Array([0,0,0,1])],[li(0,0,1,0),new Float32Array([0,0,1,0])],[li(0,0,1,1),new Float32Array([0,0,1,1])],[li(0,1,0,0),new Float32Array([0,1,0,0])],[li(0,1,0,1),new Float32Array([0,1,0,1])],[li(0,1,1,0),new Float32Array([0,1,1,0])],[li(0,1,1,1),new Float32Array([0,1,1,1])],[li(1,0,0,0),new Float32Array([1,0,0,0])],[li(1,0,0,1),new Float32Array([1,0,0,1])],[li(1,0,1,0),new Float32Array([1,0,1,0])],[li(1,0,1,1),new Float32Array([1,0,1,1])],[li(1,1,0,0),new Float32Array([1,1,0,0])],[li(1,1,0,1),new Float32Array([1,1,0,1])],[li(1,1,1,0),new Float32Array([1,1,1,0])],[li(1,1,1,1),new Float32Array([1,1,1,1])]]);function Rg(i,e,t){return i+(e-i)*t}function li(i,e,t,n){let r=Rg(i,e,.75),s=Rg(t,n,1-.25);return Rg(r,s,1-.125)}var eR=`
	varying vec3 vDir;
	void main() {
		vDir = normalize( position );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`,tR=`
	uniform vec3 top;
	uniform vec3 horizon;
	uniform vec3 bottom;
	varying vec3 vDir;
	void main() {
		float y = vDir.y;
		vec3 c = y > 0.0 ? mix( horizon, top, pow( y, 0.7 ) ) : mix( horizon, bottom, pow( - y, 0.45 ) );
		gl_FragColor = vec4( c, 1.0 );
	}
`,cd=[],ld=[1,.965,.92],My=[.94,.97,1],lr=[1,1,1],Xa={dome:{top:.6,horizon:.16,bottom:.04},cards:[[20,20,[0,28,0],2.6,lr],[12,26,[-22,8,14],2,My],[12,26,[22,8,14],2,ld],[28,10,[0,10,-26],1.6,lr],[4,30,[-26,2,-8],2.8,lr],[4,30,[26,2,-8],2.8,lr],[7,44,[Math.cos(.8)*25,0,Math.sin(.8)*25],.02,lr],[7,44,[Math.cos(2.35)*25,0,Math.sin(2.35)*25],.02,lr],[7,44,[Math.cos(3.95)*25,0,Math.sin(3.95)*25],.02,lr],[7,44,[Math.cos(5.5)*25,0,Math.sin(5.5)*25],.02,lr],[9,18,[-25,4,6],.25,lr],[9,18,[25,4,-2],.25,lr],[40,5,[0,2,28],.3,lr]],spot:{dome:{top:.4,horizon:.09,bottom:.02},cards:[[9,9,4.6],[4,14,4.2],[4,14,4.2],[12,4,3.2],[1.6,22,7.5],[1.6,22,7.5],[7,44,.02],[7,44,.02],[7,44,.02],[7,44,.02],[9,18,.08],[9,18,.08],[18,2.5,.8]]}},cl=(i,e,t)=>new Xe().setRGB(i,e,t,Pi);function Ty(i,e,t,n){i.add(new Rt(new Na(60,64,32),new rt({vertexShader:eR,fragmentShader:tR,side:tn,depthWrite:!1,uniforms:{top:{value:e},horizon:{value:t},bottom:{value:n}}})))}function zr(i,e,t,n,r,s=lr,a=!1){let o=a?new Nc(e/2,64):new ss(e,t),l=new La({side:gn});l.color.setRGB(s[0]*r,s[1]*r,s[2]*r,Pi);let c=new Rt(o,l);return c.position.set(n[0],n[1],n[2]),c.lookAt(0,0,0),i.add(c),c}function nR(){let i=new Ar,e=Xa.dome;Ty(i,cl(e.top,e.top,e.top),cl(e.horizon,e.horizon,e.horizon*1.03),cl(e.bottom,e.bottom,e.bottom*1.05));for(let t of Xa.cards)zr(i,...t);return i}function Ey(i=.22){let e=new si,t=Xa.spot,n=Xa.cards.map(([c,u,f,h,d,p],v)=>{e.position.set(...f),e.lookAt(0,0,0),e.updateMatrixWorld(!0);let m=new B().setFromMatrixColumn(e.matrixWorld,0).normalize(),g=new B().setFromMatrixColumn(e.matrixWorld,1).normalize(),x=new B().setFromMatrixColumn(e.matrixWorld,2).normalize(),A=new B(...f),[y,M,E]=t.cards[v];return{dist:A.length(),au:m,av:g,color:d,from:[c,u,h],to:[y,M,E],dir:A.clone().normalize(),c:new St(A.x,A.y,A.z,p?1:0),u:new St,v:new St,n:new St(x.x,x.y,x.z,A.dot(x)),col:new B}}).sort((c,u)=>u.dist-c.dist),r=Xa.dome,s=new B,a=(c,u,f)=>c+(u-c)*f,o=-1,l={count:n.length,c:n.map(c=>c.c),u:n.map(c=>c.u),v:n.map(c=>c.v),n:n.map(c=>c.n),col:n.map(c=>c.col),dome:s,mood(c){if(c=Math.max(0,Math.min(1,c)),Math.abs(c-o)<1e-4)return;o=c;let u=(f,h)=>f*Math.pow(h/f,c);for(let f of n){let h=u(f.from[0],f.to[0]),d=u(f.from[1],f.to[1]),p=a(f.from[2],f.to[2],c),v=a(i,.12,c);f.u.set(f.au.x/(h/2),f.au.y/(h/2),f.au.z/(h/2),v/(h/2)),f.v.set(f.av.x/(d/2),f.av.y/(d/2),f.av.z/(d/2),v/(d/2)),f.col.set(f.color[0]*p,f.color[1]*p,f.color[2]*p)}s.set(a(r.top,t.dome.top,c),a(r.horizon,t.dome.horizon,c),a(r.bottom,t.dome.bottom,c)),Ig(c)}};return l.mood(0),l}function Ig(i){if(cd.length=0,i<.05)return;let e=Xa.spot.cards;Xa.cards.forEach((t,n)=>{e[n][2]>=4&&cd.push({dir:new B(...t[2]).normalize(),power:i*e[n][2]/7.5})})}function iR(){let i=new Ar;return Ty(i,cl(.85,.85,.86),cl(.5,.5,.51),cl(.26,.26,.27)),zr(i,26,14,[0,26,4],3.2,ld),zr(i,7,32,[-24,4,6],2.8,My),zr(i,7,32,[24,4,-6],2.8,ld),zr(i,2.2,30,[-16,6,-20],4.5),zr(i,2.2,30,[16,6,20],4,ld),zr(i,12,8,[0,14,-24],2.4),zr(i,8,40,[-20,0,-14],.14),zr(i,8,40,[20,0,14],.14),zr(i,60,8,[0,-8,26],.16),i}function Sy(i,e,t){let n=new sl(t,{type:ai,generateMipmaps:!1,minFilter:Vt,magFilter:Vt});return new jo(.1,200,n).update(i,e),n}function by(i,{size:e=512,metal:t=512}={}){let n=Sy(i,nR(),e),r=Sy(i,iR(),t),s=new rl(i),a=s.fromCubemap(r.texture);s.dispose();let o=new $e,l=new je;return{cube:n.texture,bright:r.texture,env:a.texture,rotation:o,angle:0,setAngle(c){this.angle=c,o.setFromMatrix4(l.makeRotationY(-c))},dispose(){n.dispose(),r.dispose(),a.dispose()}}}var rR=`
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
`,sR=`
	uniform float strength;
	varying float vAlpha;
	void main() {
		float r = length( gl_PointCoord - 0.5 ) * 2.0;
		float a = smoothstep( 1.0, 0.0, r );
		a *= a;
		gl_FragColor = vec4( vec3( 1.0, 0.93, 0.8 ) * a * vAlpha * strength, 1.0 );
	}
`,aR=`
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
`,oR=`
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
`;function wy(i,{count:e=150}={}){let t=(()=>{let d=7;return()=>(d=d*16807%2147483647)/2147483647})(),n=new Float32Array(e*3),r=new Float32Array(e*4);for(let d=0;d<e;d++)n[d*3]=(t()-.5)*6.4,n[d*3+1]=(t()-.5)*4.8,n[d*3+2]=(t()-.5)*6.4,r.set([t(),t(),t(),t()],d*4);let s=new Lt;s.setAttribute("position",new ut(n,3)),s.setAttribute("seed",new ut(r,4));let a=new B(-.32,-1,.18).normalize(),o=new rt({vertexShader:rR,fragmentShader:sR,transparent:!0,depthWrite:!1,blending:Ns,uniforms:{time:{value:0},scale:{value:800},centre:{value:new B},lightDir:{value:a},strength:{value:0}}}),l=new Uc(s,o);l.frustumCulled=!1,l.renderOrder=5,i.add(l);let c=7.5,u=new Oc(.12,1.15,c,64,1,!0);u.translate(0,c/2,0);let f=new rt({vertexShader:aR,fragmentShader:oR,transparent:!0,depthWrite:!1,blending:Ns,side:ri,uniforms:{strength:{value:0},tint:{value:new Xe(1,.9,.74).multiplyScalar(.07)}}}),h=new Rt(u,f);return h.frustumCulled=!1,h.renderOrder=4,h.quaternion.setFromUnitVectors(new B(0,1,0),a.clone().negate()),i.add(h),{update({time:d,centre:p,motes:v=0,beam:m=0,pxScale:g=800}){o.uniforms.time.value=d,o.uniforms.strength.value=v,o.uniforms.scale.value=g,o.uniforms.centre.value.copy(p),l.visible=v>.002,f.uniforms.strength.value=m,h.position.copy(p),h.visible=m>.002}}}var ul=Math.pow(2,-24),nu=Symbol("SKIP_GENERATION"),ud={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[nu]:!1};function qt(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function iu(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let r=i[n+3]-i[n];r>t&&(t=r,e=n)}return e}function Bg(i,e){e.set(i)}function Ug(i,e,t){let n,r;for(let s=0;s<3;s++){let a=s+3;n=i[s],r=e[s],t[s]=n<r?n:r,n=i[a],r=e[a],t[a]=n>r?n:r}}function ru(i,e,t){for(let n=0;n<3;n++){let r=e[i+2*n],s=e[i+2*n+1],a=r-s,o=r+s;a<t[n]&&(t[n]=a),o>t[n+3]&&(t[n+3]=o)}}function hl(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}function _t(i,e){return e[i+15]===65535}function wt(i,e){return e[i+6]}function Nt(i,e){return e[i+14]}function Dt(i){return i+8}function Pt(i,e){let t=e[i+6];return i+t*8}function Zs(i,e){return e[i+7]}function hd(i,e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0,f=1/0,h=1/0,d=1/0,p=-1/0,v=-1/0,m=-1/0,g=i.offset||0;for(let x=(e-g)*6,A=(e+t-g)*6;x<A;x+=6){let y=i[x+0],M=i[x+1],E=y-M,T=y+M;E<s&&(s=E),T>l&&(l=T),y<f&&(f=y),y>p&&(p=y);let _=i[x+2],S=i[x+3],C=_-S,R=_+S;C<a&&(a=C),R>c&&(c=R),_<h&&(h=_),_>v&&(v=_);let b=i[x+4],P=i[x+5],L=b-P,F=b+P;L<o&&(o=L),F>u&&(u=F),b<d&&(d=b),b>m&&(m=b)}n[0]=s,n[1]=a,n[2]=o,n[3]=l,n[4]=c,n[5]=u,r[0]=f,r[1]=h,r[2]=d,r[3]=p,r[4]=v,r[5]=m}var ls=32,uR=(i,e)=>i.candidate-e.candidate,Ks=new Array(ls).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),fd=new Float32Array(6);function Ry(i,e,t,n,r,s){let a=-1,o=0;if(s===0)a=iu(e),a!==-1&&(o=(e[a]+e[a+3])/2);else if(s===1)a=iu(i),a!==-1&&(o=hR(t,n,r,a));else if(s===2){let l=hl(i),c=1.25*r,u=t.offset||0,f=(n-u)*6,h=(n+r-u)*6;for(let d=0;d<3;d++){let p=e[d],g=(e[d+3]-p)/ls;if(r<ls/4){let x=[...Ks];x.length=r;let A=0;for(let M=f;M<h;M+=6,A++){let E=x[A];E.candidate=t[M+2*d],E.count=0;let{bounds:T,leftCacheBounds:_,rightCacheBounds:S}=E;for(let C=0;C<3;C++)S[C]=1/0,S[C+3]=-1/0,_[C]=1/0,_[C+3]=-1/0,T[C]=1/0,T[C+3]=-1/0;ru(M,t,T)}x.sort(uR);let y=r;for(let M=0;M<y;M++){let E=x[M];for(;M+1<y&&x[M+1].candidate===E.candidate;)x.splice(M+1,1),y--}for(let M=f;M<h;M+=6){let E=t[M+2*d];for(let T=0;T<y;T++){let _=x[T];E>=_.candidate?ru(M,t,_.rightCacheBounds):(ru(M,t,_.leftCacheBounds),_.count++)}}for(let M=0;M<y;M++){let E=x[M],T=E.count,_=r-E.count,S=E.leftCacheBounds,C=E.rightCacheBounds,R=0;T!==0&&(R=hl(S)/l);let b=0;_!==0&&(b=hl(C)/l);let P=1+1.25*(R*T+b*_);P<c&&(a=d,c=P,o=E.candidate)}}else{for(let y=0;y<ls;y++){let M=Ks[y];M.count=0,M.candidate=p+g+y*g;let E=M.bounds;for(let T=0;T<3;T++)E[T]=1/0,E[T+3]=-1/0}for(let y=f;y<h;y+=6){let T=~~((t[y+2*d]-p)/g);T>=ls&&(T=ls-1);let _=Ks[T];_.count++,ru(y,t,_.bounds)}let x=Ks[ls-1];Bg(x.bounds,x.rightCacheBounds);for(let y=ls-2;y>=0;y--){let M=Ks[y],E=Ks[y+1];Ug(M.bounds,E.rightCacheBounds,M.rightCacheBounds)}let A=0;for(let y=0;y<ls-1;y++){let M=Ks[y],E=M.count,T=M.bounds,S=Ks[y+1].rightCacheBounds;E!==0&&(A===0?Bg(T,fd):Ug(T,fd,fd)),A+=E;let C=0,R=0;A!==0&&(C=hl(fd)/l);let b=r-A;b!==0&&(R=hl(S)/l);let P=1+1.25*(C*A+R*b);P<c&&(a=d,c=P,o=M.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:a,pos:o}}function hR(i,e,t,n){let r=0,s=i.offset;for(let a=e,o=e+t;a<o;a++)r+=i[(a-s)*6+n*2];return r/t}var fl=class{constructor(){this.boundingData=new Float32Array(6)}};function Dy(i,e,t,n,r,s){let a=n,o=n+r-1,l=s.pos,c=s.axis*2,u=t.offset||0;for(;;){for(;a<=o&&t[(a-u)*6+c]<l;)a++;for(;a<=o&&t[(o-u)*6+c]>=l;)o--;if(a<o){for(let f=0;f<e;f++){let h=i[a*e+f];i[a*e+f]=i[o*e+f],i[o*e+f]=h}for(let f=0;f<6;f++){let h=a-u,d=o-u,p=t[h*6+f];t[h*6+f]=t[d*6+f],t[d*6+f]=p}a++,o--}else return a}}var Py,dd,Fg,Iy,fR=Math.pow(2,32);function pd(i){return"count"in i?1:1+pd(i.left)+pd(i.right)}function By(i,e,t){return Py=new Float32Array(t),dd=new Uint32Array(t),Fg=new Uint16Array(t),Iy=new Uint8Array(t),Ng(i,e)}function Ng(i,e){let t=i/4,n=i/2,r="count"in e,s=e.boundingData;for(let a=0;a<6;a++)Py[t+a]=s[a];if(r)return e.buffer?(Iy.set(new Uint8Array(e.buffer),i),i+e.buffer.byteLength):(dd[t+6]=e.offset,Fg[n+14]=e.count,Fg[n+15]=65535,i+32);{let{left:a,right:o,splitAxis:l}=e,c=i+32,u=Ng(c,a),f=i/32,d=u/32-f;if(d>fR)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return dd[t+6]=d,dd[t+7]=l,Ng(u,o)}}function dR(i,e,t,n,r,s){let{maxDepth:a,verbose:o,targetLeafSize:l,_strictLeafSize:c=1/0,strategy:u,onProgress:f}=r,h=i.primitiveBuffer,d=i.primitiveBufferStride,p=new Float32Array(6),v=!1,m=new fl;return hd(e,t,n,m.boundingData,p),x(m,t,n,p),m;function g(A){f&&f((A-s.offset)/s.count)}function x(A,y,M,E=null,T=0){!v&&T>=a&&(v=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));let _=M>c;if(M<=l&&!_||T>=a)return g(y+M),A.offset=y,A.count=M,A;let S=Ry(A.boundingData,E,e,y,M,u),C=S.axis===-1?-1:Dy(h,d,e,y,M,S);if(S.axis===-1||C===y||C===y+M){if(!_)return g(y+M),A.offset=y,A.count=M,A;S.axis=Math.max(0,iu(A.boundingData)),C=y+Math.max(1,Math.floor(M/2))}A.splitAxis=S.axis;let R=new fl,b=y,P=C-y;A.left=R,hd(e,b,P,R.boundingData,p),x(R,b,P,p,T+1);let L=new fl,F=C,N=M-P;return A.right=L,hd(e,F,N,L.boundingData,p),x(L,F,N,p,T+1),A}}function Uy(i,e){let t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(e.range),r=n[0],s=n[n.length-1],a={offset:r.offset,count:s.offset+s.count-r.offset},o=new Float32Array(6*a.count);o.offset=a.offset,i.computePrimitiveBounds(a.offset,a.count,o),i._roots=n.map(l=>{let c=dR(i,o,l.offset,l.count,e,a),u=pd(c),f=new t(32*u);return By(0,c,f),f})}var Js=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var Og=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Mt=new Og;var js,pl,dl=[],md=new Js(()=>new Kt);function Ly(i,e,t,n,r,s){js=md.getPrimitive(),pl=md.getPrimitive(),dl.push(js,pl),Mt.setBuffer(i._roots[e]);let a=kg(0,i.geometry,t,n,r,s);Mt.clearBuffer(),md.releasePrimitive(js),md.releasePrimitive(pl),dl.pop(),dl.pop();let o=dl.length;return o>0&&(pl=dl[o-1],js=dl[o-2]),a}function kg(i,e,t,n,r=null,s=0,a=0){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=wt(i,c),d=Nt(u,l);return qt(i,o,js),n(h,d,!1,a,s+i/8,js)}else{let C=function(b){let{uint16Array:P,uint32Array:L}=Mt,F=b*2;for(;!_t(F,P);)b=Dt(b),F=b*2;return wt(b,L)},R=function(b){let{uint16Array:P,uint32Array:L}=Mt,F=b*2;for(;!_t(F,P);)b=Pt(b,L),F=b*2;return wt(b,L)+Nt(F,P)},h=Dt(i),d=Pt(i,c),p=h,v=d,m,g,x,A;if(r&&(x=js,A=pl,qt(p,o,x),qt(v,o,A),m=r(x),g=r(A),g<m)){p=d,v=h;let b=m;m=g,g=b,x=A}x||(x=js,qt(p,o,x));let y=_t(p*2,l),M=t(x,y,m,a+1,s+p/8),E;if(M===2){let b=C(p),L=R(p)-b;E=n(b,L,!0,a+1,s+p/8,x)}else E=M&&kg(p,e,t,n,r,s,a+1);if(E)return!0;A=pl,qt(v,o,A);let T=_t(v*2,l),_=t(A,T,g,a+1,s+v/8),S;if(_===2){let b=C(v),L=R(v)-b;S=n(b,L,!0,a+1,s+v/8,A)}else S=_&&kg(v,e,t,n,r,s,a+1);return!!S}}var su=new Mt.constructor,vd=new Mt.constructor,$s=new Js(()=>new Kt),ml=new Kt,gl=new Kt,zg=new Kt,Hg=new Kt,Gg=!1;function Fy(i,e,t,n){if(Gg)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Gg=!0;let r=i._roots,s=e._roots,a,o=0,l=0,c=new je().copy(t).invert();for(let u=0,f=r.length;u<f;u++){su.setBuffer(r[u]),l=0;let h=$s.getPrimitive();qt(0,su.float32Array,h),h.applyMatrix4(c);for(let d=0,p=s.length;d<p&&(vd.setBuffer(s[d]),a=Mr(0,0,t,c,n,o,l,0,0,h),vd.clearBuffer(),l+=s[d].byteLength/32,!a);d++);if($s.releasePrimitive(h),su.clearBuffer(),o+=r[u].byteLength/32,a)break}return Gg=!1,a}function Mr(i,e,t,n,r,s=0,a=0,o=0,l=0,c=null,u=!1){let f,h;u?(f=vd,h=su):(f=su,h=vd);let d=f.float32Array,p=f.uint32Array,v=f.uint16Array,m=h.float32Array,g=h.uint32Array,x=h.uint16Array,A=i*2,y=e*2,M=_t(A,v),E=_t(y,x),T=!1;if(E&&M)u?T=r(wt(e,g),Nt(e*2,x),wt(i,p),Nt(i*2,v),l,a+e/8,o,s+i/8):T=r(wt(i,p),Nt(i*2,v),wt(e,g),Nt(e*2,x),o,s+i/8,l,a+e/8);else if(E){let _=$s.getPrimitive();qt(e,m,_),_.applyMatrix4(t);let S=Dt(i),C=Pt(i,p);qt(S,d,ml),qt(C,d,gl);let R=_.intersectsBox(ml),b=_.intersectsBox(gl);T=R&&Mr(e,S,n,t,r,a,s,l,o+1,_,!u)||b&&Mr(e,C,n,t,r,a,s,l,o+1,_,!u),$s.releasePrimitive(_)}else{let _=Dt(e),S=Pt(e,g);qt(_,m,zg),qt(S,m,Hg);let C=c.intersectsBox(zg),R=c.intersectsBox(Hg);if(C&&R)T=Mr(i,_,t,n,r,s,a,o,l+1,c,u)||Mr(i,S,t,n,r,s,a,o,l+1,c,u);else if(C)if(M)T=Mr(i,_,t,n,r,s,a,o,l+1,c,u);else{let b=$s.getPrimitive();b.copy(zg).applyMatrix4(t);let P=Dt(i),L=Pt(i,p);qt(P,d,ml),qt(L,d,gl);let F=b.intersectsBox(ml),N=b.intersectsBox(gl);T=F&&Mr(_,P,n,t,r,a,s,l,o+1,b,!u)||N&&Mr(_,L,n,t,r,a,s,l,o+1,b,!u),$s.releasePrimitive(b)}else if(R)if(M)T=Mr(i,S,t,n,r,s,a,o,l+1,c,u);else{let b=$s.getPrimitive();b.copy(Hg).applyMatrix4(t);let P=Dt(i),L=Pt(i,p);qt(P,d,ml),qt(L,d,gl);let F=b.intersectsBox(ml),N=b.intersectsBox(gl);T=F&&Mr(S,P,n,t,r,a,s,l,o+1,b,!u)||N&&Mr(S,L,n,t,r,a,s,l,o+1,b,!u),$s.releasePrimitive(b)}}return T}var xd=new class{constructor(){let i=null,e=null,t=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,a)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=i=s._roots[a],this.uint16Array=t=new Uint16Array(i),this.uint32Array=e=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=s=>{let a=s*2;for(;!_t(a,t);)s=Dt(s),a=s*2;return wt(s,e)},this.getRangeEnd=s=>{let a=s*2;for(;!_t(a,t);)s=Pt(s,e),a=s*2;return wt(s,e)+Nt(a,t)};let r=(s,a,o)=>{let l=a*2,c=_t(l,t);if(!s(o,c,a)&&!c){let f=Dt(a),h=Pt(a,e);r(s,f,o+1),r(s,h,o+1)}};this.traverseBuffer=s=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{r(s,0,0)}finally{n=!1}},this.traverse=s=>{this.traverseBuffer((a,o,l)=>{if(o){let c=l*2,u=e[l+6],f=t[c+14];return s(a,o,new Float32Array(i,l*4,6),u,f)}else{let c=Zs(l,e);return s(a,o,new Float32Array(i,l*4,6),c)}})}}};var Ny=new Kt,vl=new Float32Array(6),_d=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...ud,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),Uy(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0;for(let f=e,h=e+t;f<h;f++){this.writePrimitiveBounds(f,vl,0);let[d,p,v,m,g,x]=vl;d<s&&(s=d),m>l&&(l=m),p<a&&(a=p),g>c&&(c=g),v<o&&(o=v),x>u&&(u=x)}return n[r+0]=s,n[r+1]=a,n[r+2]=o,n[r+3]=l,n[r+4]=c,n[r+5]=u,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let s=e,a=e+t;s<a;s++){this.writePrimitiveBounds(s,vl,0);let[o,l,c,u,f,h]=vl,d=(o+u)/2,p=(l+f)/2,v=(c+h)/2,m=(u-o)/2,g=(f-l)/2,x=(h-c)/2,A=(s-r)*6;n[A+0]=d,n[A+1]=m+(Math.abs(d)+m)*ul,n[A+2]=p,n[A+3]=g+(Math.abs(p)+g)*ul,n[A+4]=v,n[A+5]=x+(Math.abs(v)+x)*ul}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t)for(let n=0,r=t.length;n<r;n++)t[n]+=e;else{let n=this._roots;for(let r=0;r<n.length;r++){let s=n[r],a=new Uint32Array(s),o=new Uint16Array(s),l=s.byteLength/32;for(let c=0;c<l;c++){let u=8*c,f=2*u;_t(f,o)&&(a[u+6]+=e)}}}}traverse(e,t=0){xd.setBVH(this,t),xd.traverse(e),xd.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let r=e[t],s=new Uint32Array(r),a=new Uint16Array(r),o=new Float32Array(r),l=r.byteLength/32;for(let c=l-1;c>=0;c--){let u=c*8,f=u*2;if(_t(f,a)){let d=wt(u,s),p=Nt(f,a);this.writePrimitiveRangeBounds(d,p,vl,0),o.set(vl,u)}else{let d=Dt(u),p=Pt(u,s);for(let v=0;v<3;v++){let m=o[d+v],g=o[d+v+3],x=o[p+v],A=o[p+v+3];o[u+v]=m<x?m:x,o[u+v+3]=g>A?g:A}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{qt(0,new Float32Array(n),Ny),e.union(Ny)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:s,scratchPrimitive:a,iterate:o}=e;if(r&&s){let f=r;r=(h,d,p,v,m)=>f(h,d,p,v,m)?!0:o(h,d,this,s,p,v,a)}else r||(s?r=(f,h,d,p)=>o(f,h,this,s,d,p,a):r=(f,h,d)=>d);let l=!1,c=0,u=this._roots;for(let f=0,h=u.length;f<h;f++){let d=u[f];if(l=Ly(this,f,n,r,t,c),l)break;c+=d.byteLength/32}return l}bvhcast(e,t,n){let{intersectsRanges:r}=n;return Fy(this,e,t,r)}};function Oy(){return typeof SharedArrayBuffer<"u"}function au(i){return i.index?i.index.count:i.attributes.position.count}function ea(i){return au(i)/3}function Vg(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function ky(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=Vg(t,n);i.setIndex(new ut(r,1));for(let s=0;s<t;s++)r[s]=s}}function mR(i,e,t){let n=au(i)/t,r=e||i.drawRange,s=r.start/t,a=(r.start+r.count)/t,o=Math.max(0,s),l=Math.min(n,a)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function gR(i,e){return i.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Wg(i,e,t){let n=mR(i,e,t),r=gR(i,t);if(!r.length)return[n];let s=[],a=n.offset,o=n.offset+n.count,l=au(i)/t,c=[];for(let h of r){let{offset:d,count:p}=h,v=d,m=isFinite(p)?p:l-d,g=d+m;v<o&&g>a&&(c.push({pos:Math.max(a,v),isStart:!0}),c.push({pos:Math.min(o,g),isStart:!1}))}c.sort((h,d)=>h.pos!==d.pos?h.pos-d.pos:h.type==="end"?-1:1);let u=0,f=null;for(let h of c){let d=h.pos;u!==0&&d!==f&&s.push({offset:f,count:d-f}),u+=h.isStart?1:-1,f=d}return s}function vR(i,e){let t=i[i.length-1],n=t.offset+t.count>2**16,r=i.reduce((c,u)=>c+u.count,0),s=n?4:2,a=e?new SharedArrayBuffer(r*s):new ArrayBuffer(r*s),o=n?new Uint32Array(a):new Uint16Array(a),l=0;for(let c=0;c<i.length;c++){let{offset:u,count:f}=i[c];for(let h=0;h<f;h++)o[l+h]=u+h;l+=f}return o}var yd=class extends _d{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!Oy())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...ud,...t},t[nu]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Wg(t,e.range,n),s=vR(r,e.useSharedArrayBuffer);this._indirectBuffer=s}else ky(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new Kt))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Wg(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var Zi=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let s=0,a=e.length;s<a;s++){let l=e[s][t];n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let s=0,a=t.length;s<a;s++){let o=t[s],l=e.dot(o);n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Zi.prototype.setFromBox=function(){let i=new B;return function(t,n){let r=n.min,s=n.max,a=1/0,o=-1/0;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){i.x=r.x*l+s.x*(1-l),i.y=r.y*c+s.y*(1-c),i.z=r.z*u+s.z*(1-u);let f=t.dot(i);a=Math.min(f,a),o=Math.max(f,o)}this.min=a,this.max=o}}();var xR=function(){let i=new B,e=new B,t=new B;return function(r,s,a){let o=r.start,l=i,c=s.start,u=e;t.subVectors(o,c),i.subVectors(r.end,r.start),e.subVectors(s.end,s.start);let f=t.dot(u),h=u.dot(l),d=u.dot(u),p=t.dot(l),m=l.dot(l)*d-h*h,g,x;m!==0?g=(f*h-p*d)/m:g=0,x=(f+g*h)/d,a.x=g,a.y=x}}(),ou=function(){let i=new Se,e=new B,t=new B;return function(r,s,a,o){xR(r,s,i);let l=i.x,c=i.y;if(l>=0&&l<=1&&c>=0&&c<=1){r.at(l,a),s.at(c,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else{let u;l<0?u=r.start:u=r.end;let f;c<0?f=s.start:f=s.end;let h=e,d=t;if(r.closestPointToPoint(f,!0,e),s.closestPointToPoint(u,!0,t),h.distanceToSquared(f)<=d.distanceToSquared(u)){a.copy(h),o.copy(f);return}else{a.copy(u),o.copy(d);return}}}}(),zy=function(){let i=new B,e=new B,t=new Di,n=new _i;return function(s,a){let{radius:o,center:l}=s,{a:c,b:u,c:f}=a;if(n.start=c,n.end=u,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o||(n.start=c,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o)||(n.start=u,n.end=f,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o))return!0;let v=a.getPlane(t);if(Math.abs(v.distanceToPoint(l))<=o){let g=v.projectPoint(l,e);if(a.containsPoint(g))return!0}return!1}}();var _R=["x","y","z"],cs=1e-15,Hy=cs*cs;function cr(i){return Math.abs(i)<cs}var Xn=class extends Gn{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new B),this.satBounds=new Array(4).fill().map(()=>new Zi),this.points=[this.a,this.b,this.c],this.plane=new Di,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new _i,this.needsUpdate=!0}intersectsSphere(e){return zy(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,s=this.satAxes,a=this.satBounds,o=s[0],l=a[0];this.getNormal(o),l.setFromPoints(o,r);let c=s[1],u=a[1];c.subVectors(e,t),u.setFromPoints(c,r);let f=s[2],h=a[2];f.subVectors(t,n),h.setFromPoints(f,r);let d=s[3],p=a[3];d.subVectors(n,e),p.setFromPoints(d,r);let v=c.length(),m=f.length(),g=d.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,v<cs?m<cs||g<cs?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):m<cs?g<cs?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<cs&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};Xn.prototype.closestPointToSegment=function(){let i=new B,e=new B,t=new _i;return function(r,s=null,a=null){let{start:o,end:l}=r,c=this.points,u,f=1/0;for(let h=0;h<3;h++){let d=(h+1)%3;t.start.copy(c[h]),t.end.copy(c[d]),ou(t,r,i,e),u=i.distanceToSquared(e),u<f&&(f=u,s&&s.copy(i),a&&a.copy(e))}return this.closestPointToPoint(o,i),u=o.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(o)),this.closestPointToPoint(l,i),u=l.distanceToSquared(i),u<f&&(f=u,s&&s.copy(i),a&&a.copy(l)),Math.sqrt(f)}}();Xn.prototype.intersectsTriangle=function(){let i=new Xn,e=new Zi,t=new Zi,n=new B,r=new B,s=new B,a=new B,o=new _i,l=new _i,c=new B,u=new Se,f=new Se;function h(A,y,M,E){let T=n;!A.isDegenerateIntoPoint&&!A.isDegenerateIntoSegment?T.copy(A.plane.normal):T.copy(y.plane.normal);let _=A.satBounds,S=A.satAxes;for(let b=1;b<4;b++){let P=_[b],L=S[b];if(e.setFromPoints(L,y.points),P.isSeparated(e)||(a.copy(T).cross(L),e.setFromPoints(a,A.points),t.setFromPoints(a,y.points),e.isSeparated(t)))return!1}let C=y.satBounds,R=y.satAxes;for(let b=1;b<4;b++){let P=C[b],L=R[b];if(e.setFromPoints(L,A.points),P.isSeparated(e)||(a.crossVectors(T,L),e.setFromPoints(a,A.points),t.setFromPoints(a,y.points),e.isSeparated(t)))return!1}return M&&(E||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),M.start.set(0,0,0),M.end.set(0,0,0)),!0}function d(A,y,M,E,T,_,S,C,R,b,P){let L=S/(S-C);b.x=E+(T-E)*L,P.start.subVectors(y,A).multiplyScalar(L).add(A),L=S/(S-R),b.y=E+(_-E)*L,P.end.subVectors(M,A).multiplyScalar(L).add(A)}function p(A,y,M,E,T,_,S,C,R,b,P){if(T>0)d(A.c,A.a,A.b,E,y,M,R,S,C,b,P);else if(_>0)d(A.b,A.a,A.c,M,y,E,C,S,R,b,P);else if(C*R>0||S!=0)d(A.a,A.b,A.c,y,M,E,S,C,R,b,P);else if(C!=0)d(A.b,A.a,A.c,M,y,E,C,S,R,b,P);else if(R!=0)d(A.c,A.a,A.b,E,y,M,R,S,C,b,P);else return!0;return!1}function v(A,y,M,E){let T=y.degenerateSegment,_=A.plane.distanceToPoint(T.start),S=A.plane.distanceToPoint(T.end);return cr(_)?cr(S)?h(A,y,M,E):(M&&(M.start.copy(T.start),M.end.copy(T.start)),A.containsPoint(T.start)):cr(S)?(M&&(M.start.copy(T.end),M.end.copy(T.end)),A.containsPoint(T.end)):A.plane.intersectLine(T,n)!=null?(M&&(M.start.copy(n),M.end.copy(n)),A.containsPoint(n)):!1}function m(A,y,M){let E=y.a;return cr(A.plane.distanceToPoint(E))&&A.containsPoint(E)?(M&&(M.start.copy(E),M.end.copy(E)),!0):!1}function g(A,y,M){let E=A.degenerateSegment,T=y.a;return E.closestPointToPoint(T,!0,n),T.distanceToSquared(n)<Hy?(M&&(M.start.copy(T),M.end.copy(T)),!0):!1}function x(A,y,M,E){if(A.isDegenerateIntoSegment)if(y.isDegenerateIntoSegment){let T=A.degenerateSegment,_=y.degenerateSegment,S=r,C=s;T.delta(S),_.delta(C);let R=n.subVectors(_.start,T.start),b=S.x*C.y-S.y*C.x;if(cr(b))return!1;let P=(R.x*C.y-R.y*C.x)/b,L=-(S.x*R.y-S.y*R.x)/b;if(P<0||P>1||L<0||L>1)return!1;let F=T.start.z+S.z*P,N=_.start.z+C.z*L;return cr(F-N)?(M&&(M.start.copy(T.start).addScaledVector(S,P),M.end.copy(T.start).addScaledVector(S,P)),!0):!1}else return y.isDegenerateIntoPoint?g(A,y,M):v(y,A,M,E);else{if(A.isDegenerateIntoPoint)return y.isDegenerateIntoPoint?y.a.distanceToSquared(A.a)<Hy?(M&&(M.start.copy(A.a),M.end.copy(A.a)),!0):!1:y.isDegenerateIntoSegment?g(y,A,M):m(y,A,M);if(y.isDegenerateIntoPoint)return m(A,y,M);if(y.isDegenerateIntoSegment)return v(A,y,M,E)}}return function(y,M=null,E=!1){this.needsUpdate&&this.update(),y.isExtendedTriangle?y.needsUpdate&&y.update():(i.copy(y),i.update(),y=i);let T=x(this,y,M,E);if(T!==void 0)return T;let _=this.plane,S=y.plane,C=S.distanceToPoint(this.a),R=S.distanceToPoint(this.b),b=S.distanceToPoint(this.c);cr(C)&&(C=0),cr(R)&&(R=0),cr(b)&&(b=0);let P=C*R,L=C*b;if(P>0&&L>0)return!1;let F=_.distanceToPoint(y.a),N=_.distanceToPoint(y.b),O=_.distanceToPoint(y.c);cr(F)&&(F=0),cr(N)&&(N=0),cr(O)&&(O=0);let j=F*N,z=F*O;if(j>0&&z>0)return!1;r.copy(_.normal),s.copy(S.normal);let I=r.cross(s),ie=0,se=Math.abs(I.x),ye=Math.abs(I.y);ye>se&&(se=ye,ie=1),Math.abs(I.z)>se&&(ie=2);let Y=_R[ie],W=this.a[Y],Q=this.b[Y],re=this.c[Y],te=y.a[Y],le=y.b[Y],fe=y.c[Y];if(p(this,W,Q,re,P,L,C,R,b,u,o))return h(this,y,M,E);if(p(y,te,le,fe,j,z,F,N,O,f,l))return h(this,y,M,E);if(u.y<u.x){let Me=u.y;u.y=u.x,u.x=Me,c.copy(o.start),o.start.copy(o.end),o.end.copy(c)}if(f.y<f.x){let Me=f.y;f.y=f.x,f.x=Me,c.copy(l.start),l.start.copy(l.end),l.end.copy(c)}return u.y<f.x||f.y<u.x?!1:(M&&(f.x>u.x?M.start.copy(l.start):M.start.copy(o.start),f.y<u.y?M.end.copy(l.end):M.end.copy(o.end)),!0)}}();Xn.prototype.distanceToPoint=function(){let i=new B;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();Xn.prototype.distanceToTriangle=function(){let i=new B,e=new B,t=["a","b","c"],n=new _i,r=new _i;return function(a,o=null,l=null){let c=o||l?n:null;if(this.intersectsTriangle(a,c,!0))return(o||l)&&(o&&c.getCenter(o),l&&c.getCenter(l)),0;let u=1/0;for(let f=0;f<3;f++){let h,d=t[f],p=a[d];this.closestPointToPoint(p,i),h=p.distanceToSquared(i),h<u&&(u=h,o&&o.copy(i),l&&l.copy(p));let v=this[d];a.closestPointToPoint(v,i),h=v.distanceToSquared(i),h<u&&(u=h,o&&o.copy(v),l&&l.copy(i))}for(let f=0;f<3;f++){let h=t[f],d=t[(f+1)%3];n.set(this[h],this[d]);for(let p=0;p<3;p++){let v=t[p],m=t[(p+1)%3];r.set(a[v],a[m]),ou(n,r,i,e);let g=i.distanceToSquared(e);g<u&&(u=g,o&&o.copy(i),l&&l.copy(e))}}return Math.sqrt(u)}}();var fn=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new B,this.max=new B,this.matrix=new je,this.invMatrix=new je,this.points=new Array(8).fill().map(()=>new B),this.satAxes=new Array(3).fill().map(()=>new B),this.satBounds=new Array(3).fill().map(()=>new Zi),this.alignedSatBounds=new Array(3).fill().map(()=>new Zi),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};fn.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){let h=1*c|2*u|4*f,d=r[h];d.x=c?n.x:t.x,d.y=u?n.y:t.y,d.z=f?n.z:t.z,d.applyMatrix4(e)}let s=this.satBounds,a=this.satAxes,o=r[0];for(let c=0;c<3;c++){let u=a[c],f=s[c],h=1<<c,d=r[h];u.subVectors(o,d),f.setFromPoints(u,r)}let l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();fn.prototype.intersectsBox=function(){let i=new Zi;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,s=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(i.min=n.x,i.max=r.x,o[0].isSeparated(i)||(i.min=n.y,i.max=r.y,o[1].isSeparated(i))||(i.min=n.z,i.max=r.z,o[2].isSeparated(i)))return!1;for(let l=0;l<3;l++){let c=a[l],u=s[l];if(i.setFromBox(c,t),u.isSeparated(i))return!1}return!0}}();fn.prototype.intersectsTriangle=function(){let i=new Xn,e=new Array(3),t=new Zi,n=new Zi,r=new B;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(i.copy(a),i.update(),a=i);let o=this.satBounds,l=this.satAxes;e[0]=a.a,e[1]=a.b,e[2]=a.c;for(let h=0;h<3;h++){let d=o[h],p=l[h];if(t.setFromPoints(p,e),d.isSeparated(t))return!1}let c=a.satBounds,u=a.satAxes,f=this.points;for(let h=0;h<3;h++){let d=c[h],p=u[h];if(t.setFromPoints(p,f),d.isSeparated(t))return!1}for(let h=0;h<3;h++){let d=l[h];for(let p=0;p<4;p++){let v=u[p];if(r.crossVectors(d,v),t.setFromPoints(r,e),n.setFromPoints(r,f),t.isSeparated(n))return!1}}return!0}}();fn.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();fn.prototype.distanceToPoint=function(){let i=new B;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}}();fn.prototype.distanceToBox=function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new _i),t=new Array(12).fill().map(()=>new _i),n=new B,r=new B;return function(a,o=0,l=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(l||c)&&(a.getCenter(r),this.closestPointToPoint(r,n),a.closestPointToPoint(n,r),l&&l.copy(n),c&&c.copy(r)),0;let u=o*o,f=a.min,h=a.max,d=this.points,p=1/0;for(let m=0;m<8;m++){let g=d[m];r.copy(g).clamp(f,h);let x=g.distanceToSquared(r);if(x<p&&(p=x,l&&l.copy(g),c&&c.copy(r),x<u))return Math.sqrt(x)}let v=0;for(let m=0;m<3;m++)for(let g=0;g<=1;g++)for(let x=0;x<=1;x++){let A=(m+1)%3,y=(m+2)%3,M=g<<A|x<<y,E=1<<m|g<<A|x<<y,T=d[M],_=d[E];e[v].set(T,_);let C=i[m],R=i[A],b=i[y],P=t[v],L=P.start,F=P.end;L[C]=f[C],L[R]=g?f[R]:h[R],L[b]=x?f[b]:h[R],F[C]=h[C],F[R]=g?f[R]:h[R],F[b]=x?f[b]:h[R],v++}for(let m=0;m<=1;m++)for(let g=0;g<=1;g++)for(let x=0;x<=1;x++){r.x=m?h.x:f.x,r.y=g?h.y:f.y,r.z=x?h.z:f.z,this.closestPointToPoint(r,n);let A=r.distanceToSquared(n);if(A<p&&(p=A,l&&l.copy(n),c&&c.copy(r),A<u))return Math.sqrt(A)}for(let m=0;m<12;m++){let g=e[m];for(let x=0;x<12;x++){let A=t[x];ou(g,A,n,r);let y=n.distanceToSquared(r);if(y<p&&(p=y,l&&l.copy(n),c&&c.copy(r),y<u))return Math.sqrt(y)}}return Math.sqrt(p)}}();var Xg=class extends Js{constructor(){super(()=>new Xn)}},Ti=new Xg;var lu=new B,Yg=new B;function Gy(i,e,t={},n=0,r=1/0){let s=n*n,a=r*r,o=1/0,l=null;if(i.shapecast({boundsTraverseOrder:u=>(lu.copy(e).clamp(u.min,u.max),lu.distanceToSquared(e)),intersectsBounds:(u,f,h)=>h<o&&h<a,intersectsTriangle:(u,f)=>{u.closestPointToPoint(e,lu);let h=e.distanceToSquared(lu);return h<o&&(Yg.copy(lu),o=h,l=f),h<s}}),o===1/0)return null;let c=Math.sqrt(o);return t.point?t.point.copy(Yg):t.point=Yg.clone(),t.distance=c,t.faceIndex=l,t}var Ad=parseInt(Wn)>=169,yR=parseInt(Wn)<=161,Ya=new B,qa=new B,Qa=new B,Sd=new Se,Md=new Se,Td=new Se,Vy=new B,Wy=new B,Xy=new B,cu=new B;function AR(i,e,t,n,r,s,a,o){let l;if(s===tn?l=i.intersectTriangle(n,t,e,!0,r):l=i.intersectTriangle(e,t,n,s!==gn,r),l===null)return null;let c=i.origin.distanceTo(r);return c<a||c>o?null:{distance:c,point:r.clone()}}function Yy(i,e,t,n,r,s,a,o,l,c,u){Ya.fromBufferAttribute(e,s),qa.fromBufferAttribute(e,a),Qa.fromBufferAttribute(e,o);let f=AR(i,Ya,qa,Qa,cu,l,c,u);if(f){if(n){Sd.fromBufferAttribute(n,s),Md.fromBufferAttribute(n,a),Td.fromBufferAttribute(n,o),f.uv=new Se;let d=Gn.getInterpolation(cu,Ya,qa,Qa,Sd,Md,Td,f.uv);Ad||(f.uv=d)}if(r){Sd.fromBufferAttribute(r,s),Md.fromBufferAttribute(r,a),Td.fromBufferAttribute(r,o),f.uv1=new Se;let d=Gn.getInterpolation(cu,Ya,qa,Qa,Sd,Md,Td,f.uv1);Ad||(f.uv1=d),yR&&(f.uv2=f.uv1)}if(t){Vy.fromBufferAttribute(t,s),Wy.fromBufferAttribute(t,a),Xy.fromBufferAttribute(t,o),f.normal=new B;let d=Gn.getInterpolation(cu,Ya,qa,Qa,Vy,Wy,Xy,f.normal);f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1),Ad||(f.normal=d)}let h={a:s,b:a,c:o,normal:new B,materialIndex:0};if(Gn.getNormal(Ya,qa,Qa,h.normal),f.face=h,f.faceIndex=s,Ad){let d=new B;Gn.getBarycoord(cu,Ya,qa,Qa,d),f.barycoord=d}}return f}function qy(i){return i&&i.isMaterial?i.side:i}function xl(i,e,t,n,r,s,a){let o=n*3,l=o+0,c=o+1,u=o+2,{index:f,groups:h}=i;i.index&&(l=f.getX(l),c=f.getX(c),u=f.getX(u));let{position:d,normal:p,uv:v,uv1:m}=i.attributes;if(Array.isArray(e)){let g=n*3;for(let x=0,A=h.length;x<A;x++){let{start:y,count:M,materialIndex:E}=h[x];if(g>=y&&g<y+M){let T=qy(e[E]),_=Yy(t,d,p,v,m,l,c,u,T,s,a);if(_)if(_.faceIndex=n,_.face.materialIndex=E,r)r.push(_);else return _}}}else{let g=qy(e),x=Yy(t,d,p,v,m,l,c,u,g,s,a);if(x)if(x.faceIndex=n,x.face.materialIndex=0,r)r.push(x);else return x}return null}function Qt(i,e,t,n){let r=i.a,s=i.b,a=i.c,o=e,l=e+1,c=e+2;t&&(o=t.getX(o),l=t.getX(l),c=t.getX(c)),r.x=n.getX(o),r.y=n.getY(o),r.z=n.getZ(o),s.x=n.getX(l),s.y=n.getY(l),s.z=n.getZ(l),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c)}function Qy(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++)xl(l,e,t,u,s,a,o)}function Zy(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=xl(o,e,t,f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function Ky(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=u,Qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function Jy(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,p=!1){let v=h*2;if(_t(v,o)){let m=wt(h,a),g=Nt(v,o),x=1/0,A=1/0,y=1/0,M=-1/0,E=-1/0,T=-1/0;for(let _=3*m,S=3*(m+g);_<S;_++){let C=n[_],R=r.getX(C),b=r.getY(C),P=r.getZ(C);R<x&&(x=R),R>M&&(M=R),b<A&&(A=b),b>E&&(E=b),P<y&&(y=P),P>T&&(T=P)}return l[h+0]!==x||l[h+1]!==A||l[h+2]!==y||l[h+3]!==M||l[h+4]!==E||l[h+5]!==T?(l[h+0]=x,l[h+1]=A,l[h+2]=y,l[h+3]=M,l[h+4]=E,l[h+5]=T,!0):!1}else{let m=Dt(h),g=Pt(h,a),x=p,A=!1,y=!1;if(e){if(!x){let C=m/8+d/32,R=g/8+d/32;A=e.has(C),y=e.has(R),x=!A&&!y}}else A=!0,y=!0;let M=x||A,E=x||y,T=!1;M&&(T=f(m,d,x));let _=!1;E&&(_=f(g,d,x));let S=T||_;if(S)for(let C=0;C<3;C++){let R=m+C,b=g+C,P=l[R],L=l[R+3],F=l[b],N=l[b+3];l[h+C]=P<F?P:F,l[h+C+3]=L>N?L:N}return S}}}function ur(i,e,t,n,r){let s,a,o,l,c,u,f=1/t.direction.x,h=1/t.direction.y,d=1/t.direction.z,p=t.origin.x,v=t.origin.y,m=t.origin.z,g=e[i],x=e[i+3],A=e[i+1],y=e[i+3+1],M=e[i+2],E=e[i+3+2];return f>=0?(s=(g-p)*f,a=(x-p)*f):(s=(x-p)*f,a=(g-p)*f),h>=0?(o=(A-v)*h,l=(y-v)*h):(o=(y-v)*h,l=(A-v)*h),s>l||o>a||((o>s||isNaN(s))&&(s=o),(l<a||isNaN(a))&&(a=l),d>=0?(c=(M-m)*d,u=(E-m)*d):(c=(E-m)*d,u=(M-m)*d),s>u||c>a)?!1:((c>s||s!==s)&&(s=c),(u<a||a!==a)&&(a=u),s<=r&&a>=n)}function jy(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,f=n+r;u<f;u++){let h=c?c[u]:u;xl(l,e,t,h,s,a,o)}}function $y(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let f=n,h=n+r;f<h;f++){let d;d=xl(o,e,t,l?l[f]:f,null,s,a),d&&d.distance<c&&(u=d,c=d.distance)}return u}function eA(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,f=e+i;u<f;u++){let h;if(h=t.resolveTriangleIndex(u),Qt(a,h*3,l,c),a.needsUpdate=!0,n(a,h,r,s))return!0}return!1}function tA(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),qg(0,i,t,n,r,s,a),Mt.clearBuffer()}function qg(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=wt(i,c),d=Nt(u,l);Qy(e,t,n,h,d,r,s,a)}else{let h=Dt(i);ur(h,o,n,s,a)&&qg(h,e,t,n,r,s,a);let d=Pt(i,c);ur(d,o,n,s,a)&&qg(d,e,t,n,r,s,a)}}var SR=["x","y","z"];function nA(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=Qg(0,i,t,n,r,s);return Mt.clearBuffer(),a}function Qg(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=wt(i,l),h=Nt(c,o);return Zy(e,t,n,f,h,r,s)}else{let f=Zs(i,l),h=SR[f],p=n.direction[h]>=0,v,m;p?(v=Dt(i),m=Pt(i,l)):(v=Pt(i,l),m=Dt(i));let x=ur(v,a,n,r,s)?Qg(v,e,t,n,r,s):null;if(x){let M=x.point[h];if(p?M<=a[m+f]:M>=a[m+f+3])return x}let y=ur(m,a,n,r,s)?Qg(m,e,t,n,r,s):null;return x&&y?x.distance<=y.distance?x:y:x||y||null}}var Ed=new Kt,_l=new Xn,yl=new Xn,uu=new je,iA=new fn,bd=new fn;function rA(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=Zg(0,i,t,n);return Mt.clearBuffer(),r}function Zg(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),iA.set(t.boundingBox.min,t.boundingBox.max,n),r=iA),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,p=t.attributes.position,v=wt(i,o),m=Nt(l,a);if(uu.copy(n).invert(),t.boundsTree)return qt(i,s,bd),bd.matrix.copy(uu),bd.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>bd.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let A=v*3,y=(m+v)*3;A<y;A+=3)if(Qt(yl,A,f,h),yl.needsUpdate=!0,x.intersectsTriangle(yl))return!0;return!1}});{let g=ea(t);for(let x=v*3,A=(m+v)*3;x<A;x+=3){Qt(_l,x,f,h),_l.a.applyMatrix4(uu),_l.b.applyMatrix4(uu),_l.c.applyMatrix4(uu),_l.needsUpdate=!0;for(let y=0,M=g*3;y<M;y+=3)if(Qt(yl,y,d,p),yl.needsUpdate=!0,_l.intersectsTriangle(yl))return!0}}}else{let u=Dt(i),f=Pt(i,o);return qt(u,s,Ed),!!(r.intersectsBox(Ed)&&Zg(u,e,t,n,r)||(qt(f,s,Ed),r.intersectsBox(Ed)&&Zg(f,e,t,n,r)))}}var wd=new je,Kg=new fn,hu=new fn,MR=new B,TR=new B,ER=new B,bR=new B;function sA(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),Kg.set(e.boundingBox.min,e.boundingBox.max,t),Kg.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=Ti.getPrimitive(),d=Ti.getPrimitive(),p=MR,v=TR,m=null,g=null;r&&(m=ER,g=bR);let x=1/0,A=null,y=null;return wd.copy(t).invert(),hu.matrix.copy(wd),i.shapecast({boundsTraverseOrder:M=>Kg.distanceToBox(M),intersectsBounds:(M,E,T)=>T<x&&T<a?(E&&(hu.min.copy(M.min),hu.max.copy(M.max),hu.needsUpdate=!0),!0):!1,intersectsRange:(M,E)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:_=>hu.distanceToBox(_),intersectsBounds:(_,S,C)=>C<x&&C<a,intersectsRange:(_,S)=>{for(let C=_,R=_+S;C<R;C++){Qt(d,3*C,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let b=M,P=M+E;b<P;b++){Qt(h,3*b,c,l),h.needsUpdate=!0;let L=h.distanceToTriangle(d,p,m);if(L<x&&(v.copy(p),g&&g.copy(m),x=L,A=b,y=C),L<s)return!0}}}});{let T=ea(e);for(let _=0,S=T;_<S;_++){Qt(d,3*_,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=M,R=M+E;C<R;C++){Qt(h,3*C,c,l),h.needsUpdate=!0;let b=h.distanceToTriangle(d,p,m);if(b<x&&(v.copy(p),g&&g.copy(m),x=b,A=C,y=_),b<s)return!0}}}}}),Ti.releasePrimitive(h),Ti.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=A,r&&(r.point?r.point.copy(g):r.point=g.clone(),r.point.applyMatrix4(wd),v.applyMatrix4(wd),r.distance=v.sub(r.point).length(),r.faceIndex=y),n)}function aA(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let h=0,d=u.length;h<d;h++)s=u[h],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),f(0,c),c+=s.byteLength;function f(h,d,p=!1){let v=h*2;if(_t(v,o)){let m=wt(h,a),g=Nt(v,o),x=1/0,A=1/0,y=1/0,M=-1/0,E=-1/0,T=-1/0;for(let _=m,S=m+g;_<S;_++){let C=3*i.resolveTriangleIndex(_);for(let R=0;R<3;R++){let b=C+R;b=n?n[b]:b;let P=r.getX(b),L=r.getY(b),F=r.getZ(b);P<x&&(x=P),P>M&&(M=P),L<A&&(A=L),L>E&&(E=L),F<y&&(y=F),F>T&&(T=F)}}return l[h+0]!==x||l[h+1]!==A||l[h+2]!==y||l[h+3]!==M||l[h+4]!==E||l[h+5]!==T?(l[h+0]=x,l[h+1]=A,l[h+2]=y,l[h+3]=M,l[h+4]=E,l[h+5]=T,!0):!1}else{let m=Dt(h),g=Pt(h,a),x=p,A=!1,y=!1;if(e){if(!x){let C=m/8+d/32,R=g/8+d/32;A=e.has(C),y=e.has(R),x=!A&&!y}}else A=!0,y=!0;let M=x||A,E=x||y,T=!1;M&&(T=f(m,d,x));let _=!1;E&&(_=f(g,d,x));let S=T||_;if(S)for(let C=0;C<3;C++){let R=m+C,b=g+C,P=l[R],L=l[R+3],F=l[b],N=l[b+3];l[h+C]=P<F?P:F,l[h+C+3]=L>N?L:N}return S}}}function oA(i,e,t,n,r,s,a){Mt.setBuffer(i._roots[e]),Jg(0,i,t,n,r,s,a),Mt.clearBuffer()}function Jg(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Mt,u=i*2;if(_t(u,l)){let h=wt(i,c),d=Nt(u,l);jy(e,t,n,h,d,r,s,a)}else{let h=Dt(i);ur(h,o,n,s,a)&&Jg(h,e,t,n,r,s,a);let d=Pt(i,c);ur(d,o,n,s,a)&&Jg(d,e,t,n,r,s,a)}}var wR=["x","y","z"];function lA(i,e,t,n,r,s){Mt.setBuffer(i._roots[e]);let a=jg(0,i,t,n,r,s);return Mt.clearBuffer(),a}function jg(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Mt,c=i*2;if(_t(c,o)){let f=wt(i,l),h=Nt(c,o);return $y(e,t,n,f,h,r,s)}else{let f=Zs(i,l),h=wR[f],p=n.direction[h]>=0,v,m;p?(v=Dt(i),m=Pt(i,l)):(v=Pt(i,l),m=Dt(i));let x=ur(v,a,n,r,s)?jg(v,e,t,n,r,s):null;if(x){let M=x.point[h];if(p?M<=a[m+f]:M>=a[m+f+3])return x}let y=ur(m,a,n,r,s)?jg(m,e,t,n,r,s):null;return x&&y?x.distance<=y.distance?x:y:x||y||null}}var Cd=new Kt,Al=new Xn,Sl=new Xn,fu=new je,cA=new fn,Rd=new fn;function uA(i,e,t,n){Mt.setBuffer(i._roots[e]);let r=$g(0,i,t,n);return Mt.clearBuffer(),r}function $g(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Mt,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),cA.set(t.boundingBox.min,t.boundingBox.max,n),r=cA),_t(l,a)){let u=e.geometry,f=u.index,h=u.attributes.position,d=t.index,p=t.attributes.position,v=wt(i,o),m=Nt(l,a);if(fu.copy(n).invert(),t.boundsTree)return qt(i,s,Rd),Rd.matrix.copy(fu),Rd.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>Rd.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let A=v,y=m+v;A<y;A++)if(Qt(Sl,3*e.resolveTriangleIndex(A),f,h),Sl.needsUpdate=!0,x.intersectsTriangle(Sl))return!0;return!1}});{let g=ea(t);for(let x=v,A=m+v;x<A;x++){let y=e.resolveTriangleIndex(x);Qt(Al,3*y,f,h),Al.a.applyMatrix4(fu),Al.b.applyMatrix4(fu),Al.c.applyMatrix4(fu),Al.needsUpdate=!0;for(let M=0,E=g*3;M<E;M+=3)if(Qt(Sl,M,d,p),Sl.needsUpdate=!0,Al.intersectsTriangle(Sl))return!0}}}else{let u=Dt(i),f=Pt(i,o);return qt(u,s,Cd),!!(r.intersectsBox(Cd)&&$g(u,e,t,n,r)||(qt(f,s,Cd),r.intersectsBox(Cd)&&$g(f,e,t,n,r)))}}var Dd=new je,e0=new fn,du=new fn,CR=new B,RR=new B,DR=new B,PR=new B;function hA(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),e0.set(e.boundingBox.min,e.boundingBox.max,t),e0.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,f=e.index,h=Ti.getPrimitive(),d=Ti.getPrimitive(),p=CR,v=RR,m=null,g=null;r&&(m=DR,g=PR);let x=1/0,A=null,y=null;return Dd.copy(t).invert(),du.matrix.copy(Dd),i.shapecast({boundsTraverseOrder:M=>e0.distanceToBox(M),intersectsBounds:(M,E,T)=>T<x&&T<a?(E&&(du.min.copy(M.min),du.max.copy(M.max),du.needsUpdate=!0),!0):!1,intersectsRange:(M,E)=>{if(e.boundsTree){let T=e.boundsTree;return T.shapecast({boundsTraverseOrder:_=>du.distanceToBox(_),intersectsBounds:(_,S,C)=>C<x&&C<a,intersectsRange:(_,S)=>{for(let C=_,R=_+S;C<R;C++){let b=T.resolveTriangleIndex(C);Qt(d,3*b,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=M,L=M+E;P<L;P++){let F=i.resolveTriangleIndex(P);Qt(h,3*F,c,l),h.needsUpdate=!0;let N=h.distanceToTriangle(d,p,m);if(N<x&&(v.copy(p),g&&g.copy(m),x=N,A=P,y=C),N<s)return!0}}}})}else{let T=ea(e);for(let _=0,S=T;_<S;_++){Qt(d,3*_,f,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let C=M,R=M+E;C<R;C++){let b=i.resolveTriangleIndex(C);Qt(h,3*b,c,l),h.needsUpdate=!0;let P=h.distanceToTriangle(d,p,m);if(P<x&&(v.copy(p),g&&g.copy(m),x=P,A=C,y=_),P<s)return!0}}}}}),Ti.releasePrimitive(h),Ti.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(v):n.point=v.clone(),n.distance=x,n.faceIndex=A,r&&(r.point?r.point.copy(g):r.point=g.clone(),r.point.applyMatrix4(Dd),v.applyMatrix4(Dd),r.distance=v.sub(r.point).length(),r.faceIndex=y),n)}function t0(i,e,t){return i===null?null:(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i)}var Pd=new fn,Id=new Ua,fA=new B,dA=new je,pA=new B,n0=["getX","getY","getZ"],pu=class i extends yd{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,s=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(l=>l.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=s?s.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=s),o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:r,roots:s,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(s));let o=new i(t,{...n,[nu]:!0});if(o._roots=s,o._indirectBuffer=a||null,n.setIndex){let c=t.getIndex();if(c===null){let u=new ut(e.index,1,!1);t.setIndex(u)}else c.array!==r&&(c.array.set(r),c.needsUpdate=!0)}return o;function l(c){for(let u=0;u<c.length;u++){let f=c[u],h=new Uint32Array(f),d=new Uint16Array(f);for(let p=0,v=f.byteLength/32;p<v;p++){let m=8*p,g=2*m;_t(g,d)||(h[m+6]=h[m+6]/8-p)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,c=(s?s[e]:e)*3,u=c+0,f=c+1,h=c+2;o&&(u=o[u],f=o[f],h=o[h]);for(let d=0;d<3;d++){let p=a[n0[d]](u),v=a[n0[d]](f),m=a[n0[d]](h),g=p;v<g&&(g=v),m<g&&(g=m);let x=p;v>x&&(x=v),m>x&&(x=m),t[n+d]=g,t[n+d+3]=x}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,l=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let c=a.array,u=a.offset||0,f=3;a.isInterleavedBufferAttribute&&(f=a.data.stride);let h=["getX","getY","getZ"],d=n.offset;for(let p=e,v=e+t;p<v;p++){let g=(s?s[p]:p)*3,x=(p-d)*6,A=g+0,y=g+1,M=g+2;o&&(A=o[A],y=o[y],M=o[M]),l||(A=A*f+u,y=y*f+u,M=M*f+u);for(let E=0;E<3;E++){let T,_,S;l?(T=a[h[E]](A),_=a[h[E]](y),S=a[h[E]](M)):(T=c[A+E],_=c[y+E],S=c[M+E]);let C=T;_<C&&(C=_),S<C&&(C=S);let R=T;_>R&&(R=_),S>R&&(R=S);let b=(R-C)/2,P=E*2;n[x+P+0]=C+b,n[x+P+1]=b+(Math.abs(C)+b)*ul}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;dA.copy(e.matrixWorld).invert(),Id.copy(t.ray).applyMatrix4(dA),pA.setFromMatrixScale(e.matrixWorld),fA.copy(Id.direction).multiply(pA);let s=fA.length(),a=t.near/s,o=t.far/s;if(t.firstHitOnly===!0){let l=this.raycastFirst(Id,r,a,o);l=t0(l,e,t),l&&n.push(l)}else{let l=this.raycast(Id,r,a,o);for(let c=0,u=l.length;c<u;c++){let f=t0(l[c],e,t);f&&n.push(f)}}return n}refit(e=null){return(this.indirect?aA:Jy)(this,e)}raycast(e,t=ri,n=0,r=1/0){let s=this._roots,a=[],o=this.indirect?oA:tA;for(let l=0,c=s.length;l<c;l++)o(this,l,t,e,a,n,r);return a}raycastFirst(e,t=ri,n=0,r=1/0){let s=this._roots,a=null,o=this.indirect?lA:nA;for(let l=0,c=s.length;l<c;l++){let u=o(this,l,t,e,n,r);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,s=this.indirect?uA:rA;for(let a=0,o=r.length;a<o&&(n=s(this,a,e,t),!n);a++);return n}shapecast(e){let t=Ti.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?eA:Ky});return Ti.releasePrimitive(t),n}bvhcast(e,t,n){let{intersectsRanges:r,intersectsTriangles:s}=n,a=Ti.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,c=this.indirect?p=>{let v=this.resolveTriangleIndex(p);Qt(a,v*3,o,l)}:p=>{Qt(a,p*3,o,l)},u=Ti.getPrimitive(),f=e.geometry.index,h=e.geometry.attributes.position,d=e.indirect?p=>{let v=e.resolveTriangleIndex(p);Qt(u,v*3,f,h)}:p=>{Qt(u,p*3,f,h)};if(s){if(!(e instanceof i))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let p=(v,m,g,x,A,y,M,E)=>{for(let T=g,_=g+x;T<_;T++){d(T),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let S=v,C=v+m;S<C;S++)if(c(S),a.needsUpdate=!0,s(a,u,S,T,A,y,M,E))return!0}return!1};if(r){let v=r;r=function(m,g,x,A,y,M,E,T){return v(m,g,x,A,y,M,E,T)?!0:p(m,g,x,A,y,M,E,T)}}else r=p}return super.bvhcast(e,t,{intersectsRanges:r})}intersectsBox(e,t){return Pd.set(e.min,e.max,t),Pd.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Pd.intersectsBox(n),intersectsTriangle:n=>Pd.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},s=0,a=1/0){return(this.indirect?hA:sA)(this,e,t,n,r,s,a)}closestPointToPoint(e,t={},n=0,r=1/0){return Gy(this,e,t,n,r)}};function IR(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function BR(i){switch(i){case 1:return Hs;case 2:return os;case 3:return Sn;case 4:return Sn}}function mA(i){switch(i){case 1:return tl;case 2:return Gs;case 3:return Vs;case 4:return Vs}}var Bd=class extends ar{constructor(){super(),this.minFilter=Ct,this.magFilter=Ct,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,r=e.count;if(t!==null){if(n*r%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=r*n/t}let s=e.itemSize,a=e.count,o=e.normalized,l=e.array.constructor,c=l.BYTES_PER_ELEMENT,u=this._forcedType,f=s;if(u===null)switch(l){case Float32Array:u=nn;break;case Uint8Array:case Uint16Array:case Uint32Array:u=An;break;case Int8Array:case Int16Array:case Int32Array:u=zs;break}let h,d,p,v,m=IR(s);switch(u){case nn:p=1,d=BR(s),o&&c===1?(v=l,m+="8",l===Uint8Array?h=xt:(h=el,m+="_SNORM")):(v=Float32Array,m+="32F",h=nn);break;case zs:m+=c*8+"I",p=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=mA(s),c===1?(v=Int8Array,h=el):c===2?(v=Int16Array,h=Yc):(v=Int32Array,h=zs);break;case An:m+=c*8+"UI",p=o?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,d=mA(s),c===1?(v=Uint8Array,h=xt):c===2?(v=Uint16Array,h=ks):(v=Uint32Array,h=An);break}f===3&&(d===Sn||d===Vs)&&(f=4);let g=Math.ceil(Math.sqrt(a))||1,x=f*g*g,A=new v(x),y=e.normalized;e.normalized=!1;for(let M=0;M<a;M++){let E=f*M;A[E]=e.getX(M)/p,s>=2&&(A[E+1]=e.getY(M)/p),s>=3&&(A[E+2]=e.getZ(M)/p,f===4&&(A[E+3]=1)),s>=4&&(A[E+3]=e.getW(M)/p)}e.normalized=y,this.internalFormat=m,this.format=d,this.type=h,this.image.width=g,this.image.height=g,this.image.data=A,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=r}},Ud=class extends Bd{constructor(){super(),this._forcedType=An}};var Ld=class extends Bd{constructor(){super(),this._forcedType=nn}};var mu=class{constructor(){this.index=new Ud,this.position=new Ld,this.bvhBounds=new ar,this.bvhContents=new ar,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(LR(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let n=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let r=Vg(au(t));this._cachedIndexAttr=new ut(r,1,!1)}UR(t,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:r}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),r&&r.dispose()}};function UR(i,e,t){let n=t.array,r=i.index?i.index.array:null;for(let s=0,a=e.length;s<a;s++){let o=3*s,l=3*e[s];for(let c=0;c<3;c++)n[o+c]=r?r[l+c]:l+c}}function LR(i,e,t){let n=i._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let r=n[0],s=new Uint16Array(r),a=new Uint32Array(r),o=new Float32Array(r),l=r.byteLength/32,c=2*Math.ceil(Math.sqrt(l/2)),u=new Float32Array(4*c*c),f=Math.ceil(Math.sqrt(l)),h=new Uint32Array(2*f*f);for(let d=0;d<l;d++){let p=d*32/4,v=p*2,m=p;for(let g=0;g<3;g++)u[8*d+0+g]=o[m+0+g],u[8*d+4+g]=o[m+3+g];if(_t(v,s)){let g=Nt(v,s),x=wt(p,a),A=-65536|g;h[d*2+0]=A,h[d*2+1]=x}else{let g=a[p+6],x=Zs(p,a);h[d*2+0]=x,h[d*2+1]=g}}e.image.data=u,e.image.width=c,e.image.height=c,e.format=Sn,e.type=nn,e.internalFormat="RGBA32F",e.minFilter=Ct,e.magFilter=Ct,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=h,t.image.width=f,t.image.height=f,t.format=Gs,t.type=An,t.internalFormat="RG32UI",t.minFilter=Ct,t.magFilter=Ct,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}var Za={};VA(Za,{bvh_distance_functions:()=>gA,bvh_ray_functions:()=>r0,bvh_struct_definitions:()=>vA,common_functions:()=>i0});var i0=`

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
`;var gA=`

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
`;var r0=`

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
`;var vA=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var xN=`
	${i0}
	${r0}
`;var gu=.56,yA=Ui.degToRad(34.5),FR=Ui.degToRad(40.8),Fd=.03,NR=.5,OR=.77,na=.5,ta=8,hr=4,Nd=Math.PI*2/ta,xA=(na-gu/2)*Math.tan(yA),o0=na*Math.tan(FR),us={tableY:Fd/2+xA,girdleTop:Fd/2,girdleBottom:-Fd/2,culetY:-Fd/2-o0,crownH:xA,pavH:o0},Od={round:i=>[Math.cos(i)*na,Math.sin(i)*na],oval:i=>[Math.cos(i)*.6,Math.sin(i)*.6*.69],cushion:i=>{let e=Math.cos(i),t=Math.sin(i),n=3.2,r=Math.pow(Math.pow(Math.abs(e),n)+Math.pow(Math.abs(t),n),-1/n)*.455;return[e*r,t*r]},pear:i=>{let t=((Math.PI-i)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return[-(Math.cos(t)+.3)*.58,Math.sin(t)*Math.sin(t/2)*.84*.58]}},Ml=["round","oval","cushion","pear"];function _A(i,e,t,n,r){let s=e[0]-i[0],a=e[1]-i[1],o=e[2]-i[2],l=t[0]-i[0],c=t[1]-i[1],u=t[2]-i[2],f=a*u-o*c,h=o*l-s*u,d=s*c-a*l;return Math.abs(h)<1e-9?i[1]:i[1]-(f*(n-i[0])+d*(r-i[2]))/h}function kR(i){let e=[],t=(S,C,R)=>e.push(S,C,R),n=(S,C,R)=>{let b=i(S);return[b[0]*C,R,b[1]*C]},r=us.tableY,s=us.girdleTop,a=us.girdleBottom,o=us.culetY,l=gu/2/na,c=(gu/2+(na-gu/2)*NR)/na,u=1-OR,f=Math.cos(Nd/2),h=r-(c*na*f-gu/2)*Math.tan(yA),d=o+o0*u*f,p=[],v=[],m=[];for(let S=0;S<ta;S++)p.push(n(S*Nd,l,r)),v.push(n((S+.5)*Nd,c,h)),m.push(n((S+.5)*Nd,u,d));let g=2*ta*hr,x=S=>S/g*Math.PI*2,A=S=>n(x(S),1,s),y=S=>n(x(S),1,a),M=[0,r,0],E=[0,o,0],T=[],_=[];for(let S=0;S<ta;S++){let C=S*2*hr,R=C+hr,b=(C+2*hr)%g,P=[[v[S],A(C),A(R)],[v[S],A(R),A(b)]],L=[[m[S],y(C),y(R)],[m[S],y(R),y(b)]];for(let F=0;F<2*hr;F++){let N=C+F,O=P[F<hr?0:1],j=L[F<hr?0:1],z=A(N);T[N]=F===0||F===hr?z:[z[0],_A(O[0],O[1],O[2],z[0],z[2]),z[2]];let I=y(N);_[N]=F===0||F===hr?I:[I[0],_A(j[0],j[1],j[2],I[0],I[2]),I[2]]}}for(let S=0;S<ta;S++){let C=(S+1)%ta,R=(S+ta-1)%ta,b=S*2*hr;t(M,p[S],p[C]),t(p[S],p[C],v[S]),t(p[S],v[S],T[b]),t(p[S],T[b],v[R]);for(let P=0;P<2*hr;P++)t(v[S],T[(b+P)%g],T[(b+P+1)%g]);for(let P=0;P<2*hr;P++)t(m[S],_[(b+P)%g],_[(b+P+1)%g]);t(_[b],m[S],E),t(_[b],E,m[R])}for(let S=0;S<g;S++){let C=(S+1)%g;t(T[S],_[S],_[C]),t(T[S],_[C],T[C])}return e}var s0=[];function AA(i){let e=kR(i),t=new Float32Array(e.length*3),n=(us.tableY+us.culetY)/2,r=new B,s=new B,a=new B,o=new B,l=s0.length===0;for(let c=0;c<e.length/3;c++){let[u,f,h]=[e[c*3],e[c*3+1],e[c*3+2]];l&&(r.set(f[0]-u[0],f[1]-u[1],f[2]-u[2]),s.set(h[0]-u[0],h[1]-u[1],h[2]-u[2]),a.crossVectors(r,s),o.set((u[0]+f[0]+h[0])/3,(u[1]+f[1]+h[1])/3-n,(u[2]+f[2]+h[2])/3),s0.push(a.dot(o)<0)),s0[c]&&([f,h]=[h,f]),t.set(u,c*9),t.set(f,c*9+3),t.set(h,c*9+6)}return t}AA(Od.round);var a0={};function Tl(i){return a0[i]||(a0[i]=AA(Od[i])),a0[i]}function SA(i,e){let t=Ml.length,n=(i%t+t)%t,r=Math.floor(n),s=n-r,a=Tl(Ml[r]),o=Tl(Ml[(r+1)%t]);for(let l=0;l<e.length;l++)e[l]=a[l]+(o[l]-a[l])*s;return e}function ia(i,e){let t=Ml.length,n=(i%t+t)%t,r=Math.floor(n),s=n-r,a=Od[Ml[r]](e),o=Od[Ml[(r+1)%t]](e);return[a[0]+(o[0]-a[0])*s,a[1]+(o[1]-a[1])*s]}function MA(){let i=new Lt;return i.setAttribute("position",new ut(Tl("round").slice(),3)),i.computeVertexNormals(),i}function l0(i){let e=(i/1e3)**2;return Math.sqrt(1+.3306*e/(e-.175**2)+4.3356*e/(e-.106**2))}var zR={430:[.2839,.0116,1.3856],470:[.1954,.091,1.2876],510:[.0093,.503,.1582],550:[.4334,.995,.0087],590:[1.0263,.757,.0011],630:[.6424,.265,5e-5],670:[.0874,.032,0]};function TA(i){if(i===3)return{iors:[640,550,465].map(l0),weights:[[1,0,0],[0,1,0],[0,0,1]]};let e=[430,470,510,550,590,630,670],t=e.map(r=>{let[s,a,o]=zR[r];return[Math.max(0,3.2406*s-1.5372*a-.4986*o),Math.max(0,-.9689*s+1.8758*a+.0415*o),Math.max(0,.0557*s-.204*a+1.057*o)]}),n=[0,1,2].map(r=>t.reduce((s,a)=>s+a[r],0));return{iors:e.map(l0),weights:t.map(r=>r.map((s,a)=>s/n[a]))}}var El=36,HR=`
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
`,GR=`
	#define RAY_OFFSET 1e-4
	${Za.common_functions}
	${Za.bvh_struct_definitions}
	${Za.bvh_ray_functions}

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
		uniform vec4 capA[ ${El} ];
		uniform vec4 capB[ ${El} ];
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
			for ( int i = 0; i < ${El}; i ++ ) {
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
`,kd=null;function VR(){if(!kd){let i=new Lt;i.setAttribute("position",new ut(Tl("round").slice(),3));let e=new pu(i,{strategy:2,targetLeafSize:4});kd={geometry:i,struct:new mu},kd.struct.updateFrom(e)}return kd}function EA(i,{bounces:e=7,waves:t=7,ss:n=1,bvhStruct:r,studio:s=null,setting:a=null}){let{iors:o,weights:l}=TA(t),c={WAVES:t,SS:n},u={envMap:{value:i},envRotation:{value:new $e},envIntensity:{value:1},bvh:{value:r},ior:{value:l0(589)},iors:{value:o},weights:{value:l.map(f=>new B(...f))},bounces:{value:e},obstruction:{value:new B(Math.cos(Ui.degToRad(21)),Math.cos(Ui.degToRad(30)),.03)},frost:{value:.55},opacity:{value:1},glow:{value:0}};return s&&(c.ANALYTIC_ENV="",c.CARDS=s.count,Object.assign(u,{cardC:{value:s.c},cardU:{value:s.u},cardV:{value:s.v},cardN:{value:s.n},cardCol:{value:s.col},dome:{value:s.dome}})),a&&(c.SETTING="",Object.assign(u,{capA:{value:Array.from({length:El},()=>new St)},capB:{value:Array.from({length:El},()=>new St)},capCount:{value:0},metalMap:{value:a},metalTint:{value:new Xe(1,1,1)}})),new rt({vertexShader:HR,fragmentShader:GR,defines:c,uniforms:u})}function bA(i,{bounces:e=7,waves:t=7,ss:n=1,studio:r=null,setting:s=null}={}){let a=new Lt,o=Tl("round").slice();a.setAttribute("position",new ut(o,3));let l=new pu(a,{strategy:2,targetLeafSize:4});a.boundsTree=l;let c=new mu;c.updateFrom(l);let u=EA(i,{bounces:e,waves:t,ss:n,bvhStruct:c,studio:r,setting:s}),f=new Rt(a,u);f.name="diamond";let h=0;return{mesh:f,material:u,setMorph(d){Math.abs(d-h)<1e-5||(h=d,SA(d,o),a.attributes.position.needsUpdate=!0,a.computeBoundingSphere(),l.refit(),c.updateFrom(l))},setBounces(d){u.uniforms.bounces.value=d},setQuality({bounces:d,ss:p,waves:v,exact:m}){let g=u.defines,x=u.uniforms,A=!1;if(d!==void 0&&(x.bounces.value=d),p!==void 0&&g.SS!==p&&(g.SS=p,A=!0),v!==void 0&&g.WAVES!==v){let y=TA(v);g.WAVES=v,x.iors.value=y.iors,x.weights.value=y.weights.map(M=>new B(...M)),A=!0}m===!1&&"ANALYTIC_ENV"in g&&(delete g.ANALYTIC_ENV,A=!0),A&&(u.needsUpdate=!0)},setSetting(d,p){let v=u.uniforms;if(!v.capA)return;let m=Math.min(El,d.length);for(let g=0;g<m;g++){let x=d[g];v.capA.value[g].set(x[0],x[1],x[2],x[3]),v.capB.value[g].set(x[4],x[5],x[6],0)}v.capCount.value=m,p&&v.metalTint.value.copy(p)}}}function wA(i,{bounces:e=4,waves:t=3,studio:n=null}={}){return EA(i,{bounces:e,waves:t,ss:1,bvhStruct:VR().struct,studio:n})}var bl=class{constructor(e,t,n){this.radial=t,this.maxRings=e;let r=e*(t+1);this.pos=new Float32Array(r*3),this.nrm=new Float32Array(r*3);let s=[];for(let o=0;o<e-1;o++)for(let l=0;l<t;l++){let c=o*(t+1)+l,u=c+t+1;s.push(c,c+1,u,c+1,u+1,u)}let a=new Lt;a.setIndex(s),a.setAttribute("position",new ut(this.pos,3).setUsage(Ws)),a.setAttribute("normal",new ut(this.nrm,3).setUsage(Ws)),a.setDrawRange(0,0),this.geometry=a,this.mesh=new Rt(a,n),this.mesh.frustumCulled=!1,this.rings=0,this._n=new B,this._b=new B,this._t=new B,this._v=new B}begin(){this.rings=0}ring(e,t,n,r,s,a=0){if(this.rings>=this.maxRings)return;let o=this.rings*(this.radial+1),l=Math.cos(a),c=Math.sin(a);for(let u=0;u<=this.radial;u++){let f=u/this.radial*Math.PI*2,h=Math.cos(f),d=Math.sin(f),p=t.x*h+n.x*d,v=t.y*h+n.y*d,m=t.z*h+n.z*d,g=(o+u)*3;this.pos[g]=e.x+p*s,this.pos[g+1]=e.y+v*s,this.pos[g+2]=e.z+m*s,this.nrm[g]=p*l+r.x*c,this.nrm[g+1]=v*l+r.y*c,this.nrm[g+2]=m*l+r.z*c}this.rings++}cap(e,t,n,r,s,a=5,o=!1){let l=this._v,c=[];for(let u=1;u<=a;u++)c.push(u);o&&(c.reverse(),c.push(0));for(let u of c){let f=u/a*(Math.PI/2)*.999;l.copy(e).addScaledVector(r,Math.sin(f)*s),this.ring(l,t,n,r,Math.max(s*Math.cos(f),1e-4),f)}}sweep(e,t,{up:n=null,capStart:r=!1,capEnd:s=!0,closed:a=!1,capSteps:o=6}={}){this.begin();let l=this._n,c=this._b,u=this._t,f=e.length;if(f<2){this.end();return}let h=(g,x)=>{let A=e[Math.max(0,g-1)],y=e[Math.min(f-1,g+1)];if(a){let M=e[(g-1+f)%f],E=e[(g+1)%f];return x.subVectors(E,M).normalize()}return x.subVectors(y,A).normalize()};if(h(0,u),n)c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize();else{let g=Math.abs(u.y)<.9?new B(0,1,0):new B(1,0,0);c.crossVectors(u,g).normalize(),l.crossVectors(c,u).normalize()}let d=g=>typeof t=="function"?t(g/(f-1)):t;r&&!a&&this.cap(e[0],l,c,u.clone().negate(),d(0),o,!0);let p=new B().copy(u),v=new Vn,m=a?f+1:f;for(let g=0;g<m;g++){let x=g%f;h(x,u),n?(c.crossVectors(u,n).normalize(),l.crossVectors(c,u).normalize()):g>0&&(v.setFromUnitVectors(p,u),l.applyQuaternion(v),c.applyQuaternion(v)),p.copy(u),this.ring(e[x],l,c,u,d(x))}s&&!a&&this.cap(e[f-1],l,c,u,d(f-1),o),this.end()}end(){let e=this.geometry;e.setDrawRange(0,Math.max(0,this.rings-1)*this.radial*6),e.attributes.position.needsUpdate=!0,e.attributes.normal.needsUpdate=!0,this.mesh.visible=this.rings>1}};var wl=1.27,xu=2.18,zd=6,vu=4,WR=i=>.19+.17*Math.exp(-Math.pow(i/.42,2)),RA=i=>.13+.02*(i/Math.PI),ra=i=>wl+WR(i),Gd={white:new Xe("#ecebe8"),yellow:new Xe("#f3c977"),rose:new Xe("#f2b49b")},CA=[Gd.white,Gd.yellow,Gd.rose];function Hd(i,e,t){let r=ia(i,e+.001),s=ia(i,e-.001),a=r[1]-s[1],o=-(r[0]-s[0]),l=ia(i,e);a*l[0]+o*l[1]<0&&(a=-a,o=-o);let c=Math.hypot(a,o)||1;return t[0]=a/c,t[1]=o/c,t}var Ka=(i,e,t)=>{let n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},u0=class{constructor(e){this.NT=360,this.NC=48;let t=(this.NT+1)*(this.NC+1),n=2*(this.NC+2);this.pos=new Float32Array((t+n)*3),this.nrm=new Float32Array((t+n)*3);let r=[];for(let a=0;a<this.NT;a++)for(let o=0;o<this.NC;o++){let l=a*(this.NC+1)+o,c=l+this.NC+1;r.push(l,c,l+1,c,c+1,l+1)}this.bodyCount=r.length,this.capBase=t;for(let a=0;a<2;a++){let o=t+a*(this.NC+2);for(let l=0;l<this.NC;l++)a===0?r.push(o,o+1+l,o+2+l):r.push(o,o+2+l,o+1+l)}let s=new Lt;s.setIndex(r),s.setAttribute("position",new ut(this.pos,3).setUsage(Ws)),s.setAttribute("normal",new ut(this.nrm,3).setUsage(Ws)),this.geometry=s,this.mesh=new Rt(s,e),this.mesh.frustumCulled=!1,this.ends=[new B,new B],this.g=-1}set(e){if(e=Math.min(1,Math.max(0,e)),e===this.g||(this.g=e,this.mesh.visible=e>.001,!this.mesh.visible))return;let t=this.NT,n=this.NC,r=Math.PI*(1-e),s=this.pos,a=this.nrm,o=2/vu;for(let c=0;c<=t;c++){let u=r+(Math.PI*2-2*r)*(c/t),f=Math.min(u,Math.PI*2-u),h=Math.sin(u),d=Math.cos(u),p=ra(f),v=(wl+p)/2,m=(p-wl)/2,g=RA(f);for(let x=0;x<=n;x++){let A=x/n*Math.PI*2,y=Math.cos(A),M=Math.sin(A),E=Math.sign(y)*Math.pow(Math.abs(y),o),T=Math.sign(M)*Math.pow(Math.abs(M),o),_=E*g,S=T*m,C=Math.sign(E)*Math.pow(Math.abs(E),vu-1)/g,R=Math.sign(T)*Math.pow(Math.abs(T),vu-1)/m,b=Math.hypot(C,R)||1;C/=b,R/=b;let P=(c*(n+1)+x)*3;s[P]=h*(v+S),s[P+1]=d*(v+S),s[P+2]=_,a[P]=h*R,a[P+1]=d*R,a[P+2]=C}}let l=e<.999;for(let c=0;c<2;c++){let u=c===0?0:t,f=r+(Math.PI*2-2*r)*(u/t),h=Math.cos(f)*(c===0?-1:1),d=-Math.sin(f)*(c===0?-1:1),p=this.capBase+c*(n+2),v=Math.min(f,Math.PI*2-f),m=(wl+ra(v))/2;this.ends[c].set(Math.sin(f)*m,Math.cos(f)*m,0);for(let g=-1;g<=n;g++){let x=(g<0?p:p+1+g)*3;if(g<0)s[x]=this.ends[c].x,s[x+1]=this.ends[c].y,s[x+2]=0;else{let A=(u*(n+1)+g)*3;s[x]=s[A],s[x+1]=s[A+1],s[x+2]=s[A+2]}a[x]=h,a[x+1]=d,a[x+2]=0}}this.geometry.setDrawRange(0,l?this.geometry.index.count:this.bodyCount),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.normal.needsUpdate=!0}};function c0(i,e=0){let t=Math.min(Math.abs(i),Math.PI*2-Math.abs(i)),n=ra(t),r=RA(t),s=(n-wl)/2,a=(wl+n)/2,o=Math.min(.999,Math.abs(e)/r),l=s*Math.pow(1-Math.pow(o,vu),1/vu),c=a+l,u=.001,f=ra(Math.min(Math.abs(i+u),Math.PI*2-Math.abs(i+u))),h=ra(Math.min(Math.abs(i-u),Math.PI*2-Math.abs(i-u))),d=(f-h)/(2*u),p=new B(Math.sin(i),Math.cos(i),0),v=new B(Math.cos(i),-Math.sin(i),0),m=p.clone().multiplyScalar(n).addScaledVector(v,-d).normalize();return{point:p.multiplyScalar(c).setZ(e),normal:m}}function DA({cube:i,rotation:e,waves:t=3,studio:n=null}){let r=new Lr;r.name="ring";let s=new Lr;s.position.y=xu,r.add(s);let a=()=>new zc({color:Gd.white.clone(),metalness:1,roughness:.07,envMapIntensity:1}),o=a();o.side=gn;let l=a(),c=a();c.roughness=.1;let u=[o,l,c],f=new u0(o);r.add(f.mesh);let h=[];for(let te=0;te<zd;te++){let le=new bl(64,24,l);h.push(le),s.add(le.mesh)}let d=new bl(124,18,l);s.add(d.mesh);let p=new bl(144,18,c);s.add(p.mesh);let v=MA(),m=wA(i,{bounces:4,waves:t,studio:n});m.uniforms.envRotation.value=e;let g=26,x=new Fa(v,m,g);x.instanceMatrix.setUsage(Ws),x.frustumCulled=!1,s.add(x);let A=[];{let te=.3,le=1.3;for(;te<le;){let Me=.19-.024*((te-.3)/(le-.3));A.push({phi:te,size:Me});let oe=ra(te);te+=(Me+.01)/oe}}let y=A.length*2,M=new Fa(v,m,y);M.frustumCulled=!1,r.add(M);let E=new Na(1,32,24),T=(A.length+1)*2*2,_=a();_.roughness=.17,u.push(_);let S=new Fa(E,_,T);S.frustumCulled=!1,r.add(S);let C=[],R=[];{let te=new B(0,1,0),le=new Vn;for(let fe of[1,-1])A.forEach((Me,oe)=>{let De=Me.phi*fe,{point:ke,normal:ve}=c0(De);le.setFromUnitVectors(te,ve);let X=ke.clone().addScaledVector(ve,-.006);C.push({pos:X,q:le.clone(),size:Me.size,order:oe,side:fe});let k=oe===0?Me.phi-(Me.size+.01)/ra(Me.phi):A[oe-1].phi,qe=(Me.phi+k)/2*fe;for(let Ie of[-1,1]){let Be=c0(qe,Ie*Me.size*.36);R.push({pos:Be.point.clone().addScaledVector(Be.normal,.006),size:.03,order:oe,side:fe})}if(oe===A.length-1){let Ie=(Me.phi+(Me.size+.01)/2/ra(Me.phi))*fe;for(let Be of[-1,1]){let me=c0(Ie,Be*Me.size*.36);R.push({pos:me.point.clone().addScaledVector(me.normal,.006),size:.028,order:oe+.5,side:fe})}}})}let b={band:-1,prongs:-1,morph:-1,metal:-1,halo:-1,pave:-1},P=new je,L=new B,F=new B,N=new Vn,O=[0,0],j=us.culetY,z=us.pavH,I=1.6-xu,ie=[],se=[];function ye(te,le,fe,Me=ie){let De=te.length;for(let ke=0;ke<6;ke++){let ve=Math.round(ke/6*(fe?De:De-1))%De,X=Math.round((ke+1)/6*(fe?De:De-1))%De;if(ve===X)continue;let k=te[ve],qe=te[X];Me.push([k.x,k.y,k.z,le,qe.x,qe.y,qe.z])}}function Re(te){return te/zd*Math.PI*2}function Y(te,le){let fe=new kc(Array.from({length:6},()=>new B),!1,"centripetal");ie.length=0;let Me=fe.points,oe=Ka(0,1,le);for(let ve=0;ve<zd;ve++){let X=Re(ve),k=ia(te,X);Hd(te,X,O);let qe=($,K)=>[k[0]*$+O[0]*K,k[1]*$+O[1]*K],Ie=qe(.26,0);Me[0].set(Ie[0],I,Ie[1]),Ie=qe(.36,.058),Me[1].set(Ie[0],j+.36*z,Ie[1]),Ie=qe(.72,.056),Me[2].set(Ie[0],j+.72*z,Ie[1]),Ie=qe(1,.052),Me[3].set(Ie[0],-.01,Ie[1]),Ie=qe(1,.046),Me[4].set(Ie[0],.045,Ie[1]),Ie=qe(.975,.03),Me[5].set(Ie[0],.072,Ie[1]);let Be=ve%2*.12,me=Ka(Be,Be+.88,oe),U=h[ve];if(me<=.001){U.begin(),U.end();continue}let w=48,G=[];for(let $=0;$<w;$++)G.push(fe.getPointAt($/(w-1)*me));let ee=$=>.052-.011*$*me;U.sweep(G,ee,{capEnd:!0,capSteps:10});for(let $=0;$<4;$++){let K=G[Math.round($/4*(w-1))],Ae=G[Math.round(($+1)/4*(w-1))];ie.push([K.x,K.y,K.z,ee(($+.5)/4),Ae.x,Ae.y,Ae.z])}}let De=(ve,X,k,qe,Ie,Be,me)=>{if(Be<=.001){ve.begin(),ve.end();return}let U=[],w=Be>=.999,G=w?me:Math.max(2,Math.round(me*Be)+1);for(let ee=0;ee<G;ee++){let $=w?ee/me*Math.PI*2:ee/(G-1)*Math.PI*2*Be-Math.PI/2,K=ia(te,$);Hd(te,$,O),U.push(new B(K[0]*k+O[0]*qe,X,K[1]*k+O[1]*qe))}ve.sweep(U,Ie,{up:new B(0,1,0),closed:w,capStart:!w,capEnd:!w}),ye(U,Ie,w)},ke=-.27;return De(d,ke,(ke-j)/z,.036,.03,Ka(.35,1,oe),100),oe}function W(te,le){let Me=(-.115-j)/z,oe=Ka(0,.55,le),De=[],ke=p;if(se.length=0,oe<=.001)ke.begin(),ke.end();else{let k=oe>=.999,qe=120,Ie=k?qe:Math.max(2,Math.round(qe*oe)+1);for(let Be=0;Be<Ie;Be++){let me=k?Be/qe*Math.PI*2:Be/(Ie-1)*Math.PI*2*oe+Math.PI/2,U=ia(te,me);Hd(te,me,O),De.push(new B(U[0]*Me+O[0]*.042,-.115,U[1]*Me+O[1]*.042))}ke.sweep(De,.03,{up:new B(0,1,0),closed:k,capStart:!k,capEnd:!k}),ye(De,.03,k,se)}let ve=0,X=new B(0,1,0);for(let k=0;k<g;k++){let qe=(k+.5)/g*Math.PI*2,Ie=!1;for(let $=0;$<zd;$++){let K=Math.abs(qe-Re($));K=Math.min(K,Math.PI*2-K),K<.17&&(Ie=!0)}if(Ie)continue;let Be=(qe-Math.PI/2+Math.PI*4)%(Math.PI*2)/(Math.PI*2),me=Ka(.3+Be*.55,.3+Be*.55+.12,le);if(me<=.001)continue;let U=ia(te,qe);Hd(te,qe,O);let G=new B(O[0],0,O[1]).clone().multiplyScalar(Math.cos(.42)).addScaledVector(X,Math.sin(.42)).normalize();L.set(U[0]*Me+O[0]*.1,-.115+.012,U[1]*Me+O[1]*.1),N.setFromUnitVectors(X,G);let ee=.118*(.6+.4*me)*me;F.set(ee,ee,ee),x.setMatrixAt(ve++,P.compose(L,N,F))}x.count=ve,x.instanceMatrix.needsUpdate=!0,x.visible=ve>0}function Q(te){let le=0,fe=A.length;for(let oe of C){let De=oe.order/fe*.75,ke=Ka(De,De+.18,te);if(ke<=.001)continue;let ve=oe.size*ke;F.set(ve,ve,ve),M.setMatrixAt(le++,P.compose(oe.pos,oe.q,F))}M.count=le,M.instanceMatrix.needsUpdate=!0,M.visible=le>0;let Me=0;N.identity();for(let oe of R){let De=oe.order/fe*.75,ke=Ka(De,De+.18,te);if(ke<=.001)continue;let ve=oe.size*ke;F.set(ve,ve,ve),S.setMatrixAt(Me++,P.compose(oe.pos,N,F))}S.count=Me,S.instanceMatrix.needsUpdate=!0,S.visible=Me>0}let re=new Xe;return{group:r,head:s,pave:M,halo:x,metals:u,stoneMaterial:m,get setting(){return ie.concat(se)},bandEnds:f.ends,get bandGrow(){return f.g},update(te){te.band!==b.band&&(f.set(te.band),b.band=te.band);let le=te.morph!==b.morph;if((le||te.prongs!==b.prongs)&&(Y(te.morph,te.prongs),b.prongs=te.prongs),(le||te.halo!==b.halo)&&(W(te.morph,te.halo),b.halo=te.halo),b.morph=te.morph,te.pave!==b.pave&&(Q(te.pave),b.pave=te.pave),te.metal!==b.metal){let fe=Math.min(1,Math.floor(te.metal));re.copy(CA[fe]).lerp(CA[Math.min(2,fe+1)],Math.min(1,te.metal-fe));for(let Me of u)Me.color.copy(re);b.metal=te.metal}},setRoughness(te){o.roughness=te,l.roughness=te,c.roughness=te+.05}}}function XR(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d");t.globalCompositeOperation="lighter";let n=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256*.16);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,250,240,0.55)"),n.addColorStop(1,"rgba(255,245,230,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);let r=(a,o,l,c)=>{t.save(),t.translate(256/2,256/2),t.rotate(a),t.scale(1,l);let u=t.createRadialGradient(0,0,0,0,0,o);u.addColorStop(0,`rgba(255,255,255,${c})`),u.addColorStop(.35,`rgba(255,250,242,${c*.35})`),u.addColorStop(1,"rgba(255,245,235,0)"),t.fillStyle=u,t.beginPath(),t.arc(0,0,o,0,Math.PI*2),t.fill(),t.restore()};r(0,256*.5,.022,.95),r(Math.PI/2,256*.5,.022,.95),r(Math.PI/4,256*.26,.02,.45),r(-Math.PI/4,256*.26,.02,.45);let s=new Ko(e);return s.colorSpace=it,s}function YR(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.2,"rgba(255,240,220,0.5)"),n.addColorStop(1,"rgba(255,230,200,0)"),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new Ko(e);return r.colorSpace=it,r}var h0=Math.cos(Ui.degToRad(4.5));function PA(i,{max:e=3,paveMax:t=3}={}){let n=XR(),r=YR(),s=(_,S=0)=>{let C=new Zo({map:_,blending:Ns,depthWrite:!1,depthTest:!0,transparent:!0,rotation:S,toneMapped:!1}),R=new Pc(C);return R.visible=!1,R.renderOrder=10,i.add(R),R},a=[];for(let _=0;_<e+t;_++)a.push(s(n,.21));let o=[s(r),s(r)],l=()=>cd,c=new B,u=new B,f=new B,h=new B,d=new B,p=new B,v=new B,m=new B,g=new $e,x=new je,A=new Vn,y=new B,M=new B,E=new B(0,1,0);function T(_,S,C,R,b){p.subVectors(S,C.position).normalize(),v.copy(p).reflect(_);let P=0,L=Math.cos(R),F=Math.sin(R);for(let N of l()){m.set(N.dir.x*L+N.dir.z*F,N.dir.y,-N.dir.x*F+N.dir.z*L);let O=v.dot(m);O>h0&&(P+=N.power*Math.pow((O-h0)/(1-h0),b))}return P}return{update(_,{diamond:S,pave:C,envAngle:R,strength:b=1,ends:P=null,endGlow:L=0,size:F=1}){let N=[];if(S&&S.visible&&b>0){let I=S.geometry.attributes.position.array,ie=new Set;S.updateWorldMatrix(!0,!1),g.getNormalMatrix(S.matrixWorld);let se=S.matrixWorld.getMaxScaleOnAxis();for(let ye=0;ye<I.length/9;ye++){let Re=ye*9;if(c.set(I[Re],I[Re+1],I[Re+2]),u.set(I[Re+3],I[Re+4],I[Re+5]),f.set(I[Re+6],I[Re+7],I[Re+8]),h.subVectors(u,c).cross(d.subVectors(f,c)).normalize(),h.y<.25)continue;let Y=`${Math.round(h.x*40)},${Math.round(h.y*40)},${Math.round(h.z*40)}`;if(ie.has(Y))continue;ie.add(Y),d.copy(c).add(u).add(f).multiplyScalar(1/3),d.applyMatrix4(S.matrixWorld),h.applyMatrix3(g).normalize();let W=T(h,d,_,R,2.2);W>.05&&N.push({pos:d.clone().addScaledVector(h,.03*se),s:Math.min(1.4,W)*b,size:.42*se*F})}}N.sort((I,ie)=>ie.s-I.s);let O=N.slice(0,e),j=[];if(C&&C.visible&&C.count>0&&b>0){C.updateWorldMatrix(!0,!1);for(let I=0;I<C.count;I++){C.getMatrixAt(I,x),x.premultiply(C.matrixWorld),x.decompose(y,A,M),h.copy(E).applyQuaternion(A);let ie=T(h,y,_,R,1.4);ie>.05&&j.push({pos:y.clone().addScaledVector(h,.02),s:Math.min(1.1,ie)*b,size:Math.max(M.x,.05)*2.6*F})}j.sort((I,ie)=>ie.s-I.s)}let z=O.concat(j.slice(0,t));a.forEach((I,ie)=>{let se=z[ie];if(I.visible=!!se,se){I.position.copy(se.pos);let ye=Math.min(1,se.s);I.scale.setScalar(se.size*(.45+.55*ye)),I.material.color.setScalar(1.25*se.s)}}),o.forEach((I,ie)=>{I.visible=!!P&&L>.01,I.visible&&(I.position.copy(P[ie]),I.scale.setScalar(.3),I.material.color.setScalar(3.2*L))})},hide(){a.forEach(_=>_.visible=!1),o.forEach(_=>_.visible=!1)}}}var Ki={high:{name:"high",dpr:2,supersample:1.5,msaa:4,bounces:8,waves:7,ss:4,exact:!0,cube:512,metal:512,grain:!0,dof:!0,ao:!0},medium:{name:"medium",dpr:1.5,supersample:1,msaa:2,bounces:6,waves:7,ss:1,exact:!0,cube:512,metal:256,grain:!0,dof:!1,ao:!1},low:{name:"low",dpr:1,supersample:1,msaa:0,bounces:4,waves:3,ss:1,exact:!1,cube:256,metal:256,grain:!1,dof:!1,ao:!1}},qR=[["#221b14","#030304"],["#2e2318","#080605"],["#1a2333","#05070b"],["#ffffff","#ffffff"],["#1f2738","#0b0e14"]];function Vd(){return{tx:0,ty:xu,tz:0,dist:3.6,az:.55,el:.3,fov:24,shift:0,shiftY:0,spin:0,wobble:1,shimmer:1,band:0,prongs:0,morph:0,metal:0,halo:0,pave:0,env:0,exposure:1,bg:0,glint:0,endGlow:1,glow:0,dof:0,focus:0,mood:0,turn:0,motes:0,beam:0,pool:0,bloom:1,spinTall:0}}var QR=`
	varying vec2 vUv;
	void main() {
		vUv = position.xy * 0.5 + 0.5;
		gl_Position = vec4( position.xy, 0.99999, 1.0 );
	}
`,ZR=`
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
`,f0=class extends Wa{constructor(){super("GradeEffect",`
			uniform float exposure;
			void mainImage( const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
				outputColor = vec4( inputColor.rgb * exposure, inputColor.a );
			}
		`,{uniforms:new Map([["exposure",new ge(1)]])})}};function IA(i,{tier:e=Ki.high,preserve:t=!1,aoPass:n=null}={}){let r=new id({canvas:i,antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",preserveDrawingBuffer:t});r.toneMapping=qi,r.outputColorSpace=it;let s=new Ar,a=new yn(24,1,.05,80),o=by(r,{size:e.cube,metal:e.metal});s.environment=o.env;let l=e.exact?Ey():null,c=DA({cube:o.cube,rotation:o.rotation,studio:l});s.add(c.group),c.head.rotation.y=Math.PI/2;let u=bA(o.cube,{bounces:e.bounces,waves:e.waves,ss:e.ss,studio:l,setting:o.bright});u.material.uniforms.envRotation.value=o.rotation,c.head.add(u.mesh);let f=new rt({vertexShader:QR,fragmentShader:ZR,depthWrite:!1,depthTest:!1,uniforms:{inner:{value:new Xe},outer:{value:new Xe},centre:{value:new Se(.5,.55)},aspect:{value:1},spread:{value:1.05}}}),h=new Rt(new ss(2,2),f);h.frustumCulled=!1,h.renderOrder=-1e3,s.add(h);let d=PA(s),p=wy(s),v=new B(0,xu,0),m=new Se,g=0,x=null,A,y,M,E,T=null,_=null,S=null,C=null,R=n,b={w:1,h:1};function P(z){A&&A.dispose(),A=new hy(r,{frameBufferType:ai,multisampling:z.msaa}),A.addPass(new xy(s,a)),C=null,z.ao&&R&&(C=new R(s,a,b.w,b.h),Object.assign(C.configuration,{aoRadius:.09,distanceFalloff:.6,intensity:2.2,aoSamples:16,denoiseSamples:8,denoiseRadius:8,gammaCorrection:!1,halfRes:!1}),A.addPass(C)),_=null,S=null,z.dof&&(_=new vy(a,{focusDistance:3,focusRange:.6,bokehScale:0,resolutionScale:.5}),S=new Pg(a,_),S.enabled=!1,A.addPass(S)),M=new py({intensity:.35,luminanceThreshold:1.6,luminanceSmoothing:.4,mipmapBlur:!0,radius:.62,levels:8}),y=new f0;let I=new yy({mode:Si.NEUTRAL});E=new Ay({offset:.3,darkness:.55});let ie=[M,y,I,E];T=null,z.grain&&(T=new _y({premultiply:!0,blendFunction:ft.SCREEN}),T.blendMode.opacity.value=.045,ie.push(T)),A.addPass(new Pg(a,...ie))}P(e);let L=new Xe,F=new Xe,N=qR.map((z,I)=>[new Xe(z[0]).multiplyScalar(I===3?2.2:1),new Xe(z[1]).multiplyScalar(I===3?2.2:1)]),O=[new B,new B];function j(z){let I=Math.max(0,Math.min(N.length-1,Math.floor(z))),ie=Math.min(N.length-1,I+1),se=Math.min(1,Math.max(0,z-I));L.copy(N[I][0]).lerp(N[ie][0],se),F.copy(N[I][1]).lerp(N[ie][1],se),f.uniforms.inner.value.copy(L),f.uniforms.outer.value.copy(F)}return{renderer:r,scene:s,camera:a,ring:c,diamond:u,studio:o,tier:e,get size(){return b},resize(z,I,ie){b.w=z,b.h=I,r.setPixelRatio(ie),r.setSize(z,I,!1),A.setSize(z,I),a.aspect=z/I,f.uniforms.aspect.value=z/I,a.updateProjectionMatrix()},setTier(z){this.tier=z,u.setQuality({bounces:z.bounces,ss:z.ss,waves:z.waves,exact:z.exact}),P(z),A.setSize(b.w,b.h)},useAO(z){R=z,this.tier.ao&&(P(this.tier),A.setSize(b.w,b.h))},warm(){let z=r.getRenderTarget();r.setRenderTarget(A.inputBuffer);let I;try{I=r.compileAsync(s,a)}finally{r.setRenderTarget(z)}return I},render(z,I){let ie=Math.cos(z.el),se=b.w/b.h,ye=b.w,Re=b.h,Y=Re>ye*1.05,W=Y?0:Ui.clamp((1.75-se)/.5,0,1),Q=se<1.25?Math.min(2.4,Math.pow(1.6/se,.62)):1;Q*=1+.25*W;let re=z.fov;Q!==1&&(re=Ui.radToDeg(2*Math.atan(Math.tan(Ui.degToRad(re/2))*Q))),a.fov=re,a.position.set(z.tx+z.dist*ie*Math.sin(z.az),z.ty+z.dist*Math.sin(z.el),z.tz+z.dist*ie*Math.cos(z.az)),a.up.set(0,1,0),a.lookAt(z.tx,z.ty,z.tz);let te=Y?0:z.shift*(1+.45*W),le=Y?z.shiftY:0;te||le?a.setViewOffset(ye,Re,-te*ye*.5,le*Re*.5,ye,Re):a.clearViewOffset(),a.updateProjectionMatrix(),f.uniforms.centre.value.set(.5+te*.5,.53+le*.5),f.uniforms.spread.value=1.05-.38*z.pool;let fe=x===null?0:Math.min(.1,Math.max(0,I-x));if(x=I,(z.turn||0)>5e-4)g+=z.turn*fe;else{let ke=Math.round(g/(Math.PI*2))*Math.PI*2;g=ke+(g-ke)*Math.exp(-fe*2.5)}u.mesh.rotation.y=g,c.group.rotation.y=z.spin+(Y?z.spinTall:0)+z.wobble*Math.sin(I*.32)*.28,l?l.mood(z.mood):Ig(z.mood),c.update(z),u.setMorph(z.morph),u.setSetting(c.setting,c.metals[1].color),u.material.uniforms.glow.value=z.glow;let Me=z.env+z.shimmer*Math.sin(I*.19+1.3)*.42;o.setAngle(Me),s.environmentRotation.y=Me,j(z.bg),y.uniforms.get("exposure").value=z.exposure;let oe=Math.max(0,1-Math.abs(z.bg-3)*2);E.darkness=.55*(1-oe),M.intensity=.35*z.bloom*(1-oe),M.luminanceMaterial.threshold=Math.max(.9,1.6-.45*(z.bloom-1)),T&&(T.blendMode.opacity.value=.045*(1-oe)),S&&(S.enabled=z.dof>.01,_.bokehScale=z.dof*3.2,_.cocMaterial.focusDistance=z.focus||z.dist,_.cocMaterial.focusRange=.25+z.dist*.12),s.updateMatrixWorld();let De=z.band>.001&&z.band<.999;O[0].copy(c.bandEnds[0]).applyMatrix4(c.group.matrixWorld),O[1].copy(c.bandEnds[1]).applyMatrix4(c.group.matrixWorld),r.getDrawingBufferSize(m),p.update({time:I,centre:v,motes:z.motes*(1-oe),beam:z.beam*(1-oe),pxScale:m.y/(2*Math.tan(Ui.degToRad(a.fov)/2))}),d.update(a,{diamond:u.mesh,pave:c.pave,envAngle:Me,strength:z.glint,ends:O,endGlow:De?z.endGlow*Math.min(1,(1-z.band)*6):0}),A.render()}}}var KR=18,Wd={opening:[0,4.6],shapes:[4.6,11.8],details:[11.8,18]},d0=[{in:-1,out:.3,hold:.01},{in:2.2,out:4.3,hold:4.4},{in:5.3,out:8.4,hold:5.9},{in:9.55,out:11.5,hold:11.6},{in:12.75,out:14.8,hold:14.8},{in:15.7,out:0,hold:17.9}],BA=[5.55,6.4,7.3,8.2],UA=[9.3,10.4,11.4];function LA(){return Object.assign(Vd(),{tx:0,ty:2.2,tz:0,dist:3.75,az:.55,el:.72,fov:24,shift:.42,shiftY:.6,spin:.2,wobble:0,shimmer:.6,bg:0,mood:1,turn:.2,glint:.8,motes:.6,pool:1,bloom:1.6})}function FA(i,e){let t=(n,r,s,a)=>i.to(e,{...r,duration:s,ease:a},n);return t(0,{el:.84,dist:3.45},.6,"power1.in"),t(0,{env:1.3},1.4,"none"),t(.55,{el:1.1,dist:2.6,az:1.2,shift:.1,shiftY:.36,spin:.95,mood:.85},.85,"power2.out"),t(.9,{glint:1},.5,"none"),t(1.4,{el:.42,dist:9.2,az:.85,ty:.85,shiftY:.3},3.2,"power2.inOut"),t(1.4,{shift:.38},.8,"power2.inOut"),t(1.4,{spin:-.55},.35,"power1.inOut"),t(1.4,{turn:0,mood:.55,glint:.45,motes:.4,bloom:1.25},1.2),t(1.7,{band:1},1.5,"power1.inOut"),t(3,{prongs:1},.95,"power2.out"),t(3.1,{spin:.3},1.5,"power2.inOut"),t(3.2,{env:2.1},1.4,"power1.inOut"),t(4.6,{ty:2.2,dist:4.5,el:1.38,az:0,shift:.3,shiftY:.27,spin:Math.PI/2,spinTall:-Math.PI/2,mood:.8,glint:.6,dof:.55},1),t(5.7,{morph:1,env:2.6},.55),t(6.6,{morph:2,env:3.1},.55),t(7.5,{morph:3,env:3.6},.55),t(8.35,{morph:4,env:4},.45),t(8.6,{ty:.8,dist:10.8,el:.2,az:1.1,shift:-.27,shiftY:.4,dof:0,mood:.45,glint:.4},1.1),t(8.6,{spin:.3,spinTall:0},1.1),t(9.7,{spin:.55},2.1,"none"),t(9.6,{metal:1,env:5.2},.7),t(10.6,{metal:2,env:6.3},.7),t(11.8,{tx:0,ty:2.06,dist:3.2,el:-.04,az:.3,fov:22,shift:-.47,shiftY:.24,wobble:.15,spin:0,dof:1,mood:.6},1),t(12.5,{halo:1},1,"none"),t(13.5,{tx:.7,ty:1.25,dist:3.7,el:.36,az:.35,shift:-.42},1.2),t(13.7,{pave:1},1,"none"),t(15,{tx:0,ty:.8,dist:10.6,el:.34,az:1.05,fov:24,shift:.34,shiftY:.42,bg:1,exposure:.95,wobble:.5,dof:0,mood:.7,glint:.55,motes:.55,bloom:1.3},1.4),t(15,{spin:.2},1.4),t(16.4,{spin:.7},1.6,"none"),i.set({},{},KR),i}function NA(i){if(i&&Ki[i])return Ki[i];let e=matchMedia("(pointer: coarse)").matches,t=Math.min(screen.width,screen.height)<820,n=navigator.hardwareConcurrency||8,r=navigator.deviceMemory||8;return e&&t?r<=3||n<=2?Ki.low:Ki.medium:n<=4||r<=4?Ki.medium:Ki.high}function OA(i=!1){if(i||navigator.connection&&navigator.connection.saveData)return!1;try{let e=document.createElement("canvas").getContext("webgl2");if(!e)return!1;let t=e.getExtension("WEBGL_lose_context");return t&&t.loseContext(),!0}catch{return!1}}var kA={THREE:{Color:Xe,WebGLRenderTarget:vt,LinearFilter:Vt,NearestFilter:Ct,HalfFloatType:ai,RGBAFormat:Sn,DepthTexture:Bi,UnsignedInt248Type:Nr,UnsignedIntType:An,DepthStencilFormat:or,DepthFormat:sr,Matrix4:je,DataTexture:ar,ShaderMaterial:rt,NoColorSpace:Ai,RepeatWrapping:Wo,Vector2:Se,REVISION:Wn,RedFormat:Hs,FloatType:nn,GLSL3:Jc,Vector3:B,Sphere:Sr,BufferAttribute:ut,BufferGeometry:Lt,Float32BufferAttribute:on,OrthographicCamera:as,Mesh:Rt},PP:{Pass:Mi}};Dr.registerPlugin(lt,oh);var m0=new URLSearchParams(location.search),fs=m0.has("capture"),sa=!fs&&matchMedia("(prefers-reduced-motion: reduce)").matches,aa=(i,e=document)=>e.querySelector(i),hs=(i,e=document)=>[...e.querySelectorAll(i)],Tr=document.documentElement,zA=window.wkFilm&&window.wkFilm.ao||"";function JR(){return document.body.classList.contains("elementor-editor-active")||!!(window.elementorFrontend&&window.elementorFrontend.isEditMode&&window.elementorFrontend.isEditMode())}function p0(){let i=aa(".wk-sticky"),e=i&&aa(".hd",i);if(!e)return 0;let t=parseFloat(getComputedStyle(Tr).getPropertyValue("--wp-admin--admin-bar--height"))||0;return e.offsetHeight+t}function jR(i){return new Promise(e=>window.requestIdleCallback?requestIdleCallback(()=>e(),{timeout:i}):setTimeout(e,1))}async function HA(){let i=hs(".wk-film .film-act");if(!i.length||Tr.classList.contains("film-on"))return;if(JR()){Tr.classList.add("film-editor");return}Tr.classList.add("film-on"),fs&&Tr.classList.add("film-capture");let e="",t=()=>{let Y=p0(),W=i.find(te=>te.dataset.act==="opening"),Q=W?Math.max(0,Math.round(W.getBoundingClientRect().top+scrollY-Y)):0,re=Y+"|"+Math.round(Math.min(Q,innerHeight*.3));return re===e?!1:(e=re,Tr.style.setProperty("--film-top",Y+"px"),Tr.style.setProperty("--film-lift",re.split("|")[1]+"px"),!0)};t();let n=OA(m0.has("no3d"));n||Tr.classList.add("film-no3d"),document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise(Y=>setTimeout(Y,2500))]),t();let r=LA(),s=FA(Dr.timeline({paused:!0,defaults:{ease:"power2.inOut"}}),r),a=i.find(Y=>Y.dataset.act==="opening");hs(".film-chap").forEach(Y=>{let W=Number(Y.dataset.chapter),Q=d0[W];if(!Q)return;if(W===0){s.to(Y,{autoAlpha:0,y:-40,duration:.45,ease:"power2.in"},Q.out);return}let re=aa("[data-split]",Y),te=re?oh.create(re,{type:"lines",mask:"lines",linesClass:"film-line"}).lines:[],le=hs(":scope > :not([data-split])",Y);s.set(Y,{autoAlpha:1},Q.in),te.length&&s.from(te,{yPercent:115,stagger:.07,duration:.55,ease:"power3.out"},Q.in),s.from(le,{opacity:0,y:18,stagger:.06,duration:.5,ease:"power2.out"},Q.in+.12),Q.out&&s.to(Y,{autoAlpha:0,y:-30,duration:.45,ease:"power2.in"},Q.out)}),hs(".film-cue").forEach(Y=>s.to(Y,{opacity:0,duration:.2},.1)),hs(".film-year").forEach(Y=>s.fromTo(Y,{opacity:0,yPercent:8},{opacity:1,yPercent:0,duration:1.2,ease:"power2.out"},15.3)),hs(".film-scrim.l").forEach(Y=>{s.to(Y,{opacity:0,duration:.6},8.7),s.to(Y,{opacity:1,duration:.6},15)}),hs(".film-scrim.r").forEach(Y=>{s.to(Y,{opacity:1,duration:.6},8.9),s.to(Y,{opacity:0,duration:.6},14.8)});let o=hs("[data-film-shape]"),l=hs("[data-film-metal]"),c="";s.eventCallback("onUpdate",()=>{let Y=Math.round(r.morph)%4,W=Math.round(r.metal),Q=Y+"|"+W;Q!==c&&(c=Q,o.forEach(re=>re.setAttribute("aria-pressed",String(Number(re.dataset.filmShape)===Y))),l.forEach(re=>re.setAttribute("aria-pressed",String(Number(re.dataset.filmMetal)===W))))});let u=null,f=(Y,W)=>{let[Q,re]=Wd[Y.dataset.act],te=Y.getBoundingClientRect().top+scrollY-p0(),le=Y.offsetHeight-aa(".film-stage",Y).offsetHeight,fe=Math.round(te+(W-Q)/(re-Q)*le);u=sa?{y:fe,t:W}:null,window.scrollTo({top:fe,behavior:sa?"auto":"smooth"}),u&&h(W)};o.forEach(Y=>Y.addEventListener("click",()=>f(Y.closest(".film-act"),BA[Number(Y.dataset.filmShape)]))),l.forEach(Y=>Y.addEventListener("click",()=>f(Y.closest(".film-act"),UA[Number(Y.dataset.filmMetal)])));let h=Y=>{fs||sa?(Dr.killTweensOf(s),s.time(Y)):Dr.to(s,{time:Y,duration:.5,ease:"power3.out",overwrite:!0})},d=(Y,W)=>{let[Q,re]=Wd[Y.dataset.act]||Wd.opening;if(u&&Math.abs(scrollY-u.y)<3)return u.t;if(u=null,sa){let te=d0.filter(le=>le.hold>=Q&&le.hold<=re).map(le=>le.hold);return te[Math.min(te.length-1,Math.floor(W*te.length))]??Q}return Q+W*(re-Q)},p=i.map(Y=>lt.create({trigger:Y,start:()=>"top top+="+p0(),end:"bottom bottom",invalidateOnRefresh:!0,onUpdate:W=>{h(d(Y,W.progress));let Q=aa(".film-bar",Y);Q&&(Q.style.transform=`scaleX(${W.progress.toFixed(4)})`)}}));lt.config({ignoreMobileResize:!0});let v=()=>{t()&&lt.refresh()};document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",()=>setTimeout(v,0)),addEventListener("load",v);{let Y=i.findIndex(W=>W.getBoundingClientRect().bottom>0&&W.getBoundingClientRect().top<innerHeight);Y<0&&(Y=i.reduce((W,Q,re)=>Q.getBoundingClientRect().bottom<=0?re:W,-1)),Dr.killTweensOf(s),s.time(Y<0?0:d(i[Y],p[Y].progress))}let m=null,g=!1,x=document.createElement("canvas");x.className="film-canvas",x.setAttribute("aria-hidden","true");let A=()=>{m=null,g=!1,i.forEach(Y=>Y.classList.remove("is-live")),Tr.classList.add("film-no3d")};x.addEventListener("webglcontextlost",Y=>{Y.preventDefault(),A()});let y=1,M=()=>{if(!m)return;let Y=x.clientWidth||innerWidth,W=x.clientHeight||innerHeight,Q=Math.min(Math.max(devicePixelRatio||1,m.tier.supersample||1),m.tier.dpr)*y,re=m.tier.name==="high"?42e5:26e5;Y*W*Q*Q>re&&(Q=Math.sqrt(re/(Y*W))),m.resize(Y,W,Math.max(.6,Q))},E={e:1},T=!1,_=()=>{T=!0;let Y=a&&aa(".film-poster img",a),W=Y&&Y.getAnimations?Y.getAnimations().find(le=>le.playState==="running"):null;if(!W)return;let Q=/brightness\(([\d.]+)\)/.exec(getComputedStyle(Y).filter),re=Q?Math.min(1,Number(Q[1])):1,te=(W.effect.getComputedTiming().endTime-W.currentTime)/1e3;E.e=Math.pow(re,2.2),Dr.to(E,{e:1,duration:Math.max(.3,te),ease:"power2.out"})},S=null,C=null,R=!0,b=Vd(),P={x:0,y:0,sx:0,sy:0};!fs&&!sa&&matchMedia("(pointer: fine)").matches&&addEventListener("pointermove",Y=>{P.x=Y.clientX/innerWidth*2-1,P.y=Y.clientY/innerHeight*2-1},{passive:!0});let L=()=>{let Y=null,W=0;for(let Q of i){let re=Q.getBoundingClientRect(),te=Math.min(innerHeight,re.bottom)-Math.max(0,re.top);te>W&&(W=te,Y=Q)}if(Y!==S&&(S=Y,R=!0,Tr.classList.toggle("film-playing",!!S)),m&&S&&C!==S){C&&C.classList.remove("is-live"),C=S;let Q=aa(".film-stage",S);Q.insertBefore(x,Q.firstChild),M(),R=!0}},F=0,N=0,O=0,j=Y=>{if(F){let Q=Y-F;Q<250&&(N+=Q,O++)}if(F=Y,O<90)return;let W=N/O;N=0,O=0,!(W<27)&&(m.tier.name==="high"?m.setTier(Ki.medium):m.tier.name==="medium"?m.setTier(Ki.low):y>.7&&(y=Math.max(.7,y-.15)),M())},z=null,I=Y=>{if(!m||!g||!S)return;z===null&&(z=Y),Y-=z,!T&&S===a&&!fs&&_();let W=Object.assign(b,r);W.exposure=r.exposure*E.e,fs||(P.sx+=(P.x-P.sx)*.05,P.sy+=(P.y-P.sy)*.035,W.az+=P.sx*.06,W.el+=P.sy*.035),m.render(W,sa?0:Y),S.classList.add("is-live")},ie=0;addEventListener("resize",()=>{clearTimeout(ie),ie=setTimeout(()=>{v(),M(),R=!0},120)});let se=async()=>{if(n){fs||await jR(600);try{m=IA(x,{tier:NA(m0.get("tier")),preserve:fs})}catch{A();return}L(),M();try{await m.warm()}catch{}m&&(g=!0,R=!0,ye())}},ye=()=>{if(!zA||!m.tier.ao)return;window.__wulfFilmLib=kA;let Y=document.createElement("script");Y.src=zA,Y.async=!0,Y.onload=()=>{m&&m.tier.ao&&window.WulfFilmAO&&(m.useAO(window.WulfFilmAO),R=!0)},document.head.appendChild(Y)},Re=se();if(!fs){let Y=-1;Dr.ticker.add(W=>{if(L(),!m||!g||!S){F=0;return}let Q=s.time()!==Y||E.e<1;Y=s.time(),!(sa&&!Q&&!R)&&(R=!1,I(W),sa||j(performance.now()))})}window.__film={started:Re,live:()=>!!(m&&g),tier:()=>m&&m.tier.name,setTier(Y){m&&Ki[Y]&&(m.setTier(Ki[Y]),M())},height:()=>Tr.scrollHeight-innerHeight,top:Y=>aa(Y).getBoundingClientRect().top+scrollY,frame(Y,W=0){return window.scrollTo(0,Y),lt.update(),L(),I(W),{act:S&&S.dataset.act,t:s.time(),tier:m&&m.tier.name}},at(Y,W=0){return Dr.killTweensOf(s),s.time(Y),L(),z=0,I(W),{act:S&&S.dataset.act,t:s.time()}},ao:()=>!!window.WulfFilmAO}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",HA):HA();})();
