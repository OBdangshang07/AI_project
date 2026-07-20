(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ul(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const lt={},Rs=[],Fn=()=>{},$f=()=>!1,Ho=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Go=n=>n.startsWith("onUpdate:"),Gt=Object.assign,Il=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},cp=Object.prototype.hasOwnProperty,nt=(n,e)=>cp.call(n,e),Fe=Array.isArray,Cs=n=>Rr(n)==="[object Map]",Zf=n=>Rr(n)==="[object Set]",vc=n=>Rr(n)==="[object Date]",We=n=>typeof n=="function",gt=n=>typeof n=="string",_n=n=>typeof n=="symbol",ot=n=>n!==null&&typeof n=="object",Jf=n=>(ot(n)||We(n))&&We(n.then)&&We(n.catch),Qf=Object.prototype.toString,Rr=n=>Qf.call(n),up=n=>Rr(n).slice(8,-1),eh=n=>Rr(n)==="[object Object]",ko=n=>gt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,lr=Ul(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Vo=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},fp=/-\w/g,En=Vo(n=>n.replace(fp,e=>e.slice(1).toUpperCase())),hp=/\B([A-Z])/g,ji=Vo(n=>n.replace(hp,"-$1").toLowerCase()),th=Vo(n=>n.charAt(0).toUpperCase()+n.slice(1)),da=Vo(n=>n?`on${th(n)}`:""),Nn=(n,e)=>!Object.is(n,e),xo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},nh=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Nl=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let xc;const Wo=()=>xc||(xc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function qi(n){if(Fe(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=gt(i)?gp(i):qi(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(gt(n)||ot(n))return n}const dp=/;(?![^(]*\))/g,pp=/:([^]+)/,mp=/\/\*[^]*?\*\//g;function gp(n){const e={};return n.replace(mp,"").split(dp).forEach(t=>{if(t){const i=t.split(pp);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Ps(n){let e="";if(gt(n))e=n;else if(Fe(n))for(let t=0;t<n.length;t++){const i=Ps(n[t]);i&&(e+=i+" ")}else if(ot(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const _p="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",vp=Ul(_p);function ih(n){return!!n||n===""}function xp(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=Fl(n[i],e[i]);return t}function Fl(n,e){if(n===e)return!0;let t=vc(n),i=vc(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=_n(n),i=_n(e),t||i)return n===e;if(t=Fe(n),i=Fe(e),t||i)return t&&i?xp(n,e):!1;if(t=ot(n),i=ot(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const a in n){const o=n.hasOwnProperty(a),l=e.hasOwnProperty(a);if(o&&!l||!o&&l||!Fl(n[a],e[a]))return!1}}return String(n)===String(e)}const sh=n=>!!(n&&n.__v_isRef===!0),ht=n=>gt(n)?n:n==null?"":Fe(n)||ot(n)&&(n.toString===Qf||!We(n.toString))?sh(n)?ht(n.value):JSON.stringify(n,rh,2):String(n),rh=(n,e)=>sh(e)?rh(n,e.value):Cs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[pa(i,r)+" =>"]=s,t),{})}:Zf(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>pa(t))}:_n(e)?pa(e):ot(e)&&!Fe(e)&&!eh(e)?String(e):e,pa=(n,e="")=>{var t;return _n(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Et;class oh{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Et&&(Et.active?(this.parent=Et,this.index=(Et.scopes||(Et.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){const i=this.scopes.slice();for(e=0,t=i.length;e<t;e++)i[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){const s=this.scopes.slice();for(e=0,t=s.length;e<t;e++)s[e].resume()}const i=this.effects.slice();for(e=0,t=i.length;e<t;e++)i[e].resume()}}run(e){if(this._active){const t=Et;try{return Et=this,e()}finally{Et=t}}}on(){++this._on===1&&(this.prevScope=Et,Et=this)}off(){if(this._on>0&&--this._on===0){if(Et===this)Et=this.prevScope;else{let e=Et;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(t=0,i=s.length;t<i;t++)s[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function ah(n){return new oh(n)}function lh(){return Et}function Mp(n,e=!1){Et&&Et.cleanups.push(n)}let ft;const ma=new WeakSet;class ch{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Et&&(Et.active?Et.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ma.has(this)&&(ma.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||fh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Mc(this),hh(this);const e=ft,t=Tn;ft=this,Tn=!0;try{return this.fn()}finally{dh(this),ft=e,Tn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)zl(e);this.deps=this.depsTail=void 0,Mc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ma.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ll(this)&&this.run()}get dirty(){return ll(this)}}let uh=0,cr,ur;function fh(n,e=!1){if(n.flags|=8,e){n.next=ur,ur=n;return}n.next=cr,cr=n}function Ol(){uh++}function Bl(){if(--uh>0)return;if(ur){let e=ur;for(ur=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;cr;){let e=cr;for(cr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function hh(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function dh(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),zl(i),Sp(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function ll(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(ph(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function ph(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===xr)||(n.globalVersion=xr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!ll(n))))return;n.flags|=2;const e=n.dep,t=ft,i=Tn;ft=n,Tn=!0;try{hh(n);const s=n.fn(n._value);(e.version===0||Nn(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{ft=t,Tn=i,dh(n),n.flags&=-3}}function zl(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)zl(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Sp(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Tn=!0;const mh=[];function ni(){mh.push(Tn),Tn=!1}function ii(){const n=mh.pop();Tn=n===void 0?!0:n}function Mc(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=ft;ft=void 0;try{e()}finally{ft=t}}}let xr=0;class yp{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Hl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ft||!Tn||ft===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==ft)t=this.activeLink=new yp(ft,this),ft.deps?(t.prevDep=ft.depsTail,ft.depsTail.nextDep=t,ft.depsTail=t):ft.deps=ft.depsTail=t,gh(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=ft.depsTail,t.nextDep=void 0,ft.depsTail.nextDep=t,ft.depsTail=t,ft.deps===t&&(ft.deps=i)}return t}trigger(e){this.version++,xr++,this.notify(e)}notify(e){Ol();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Bl()}}}function gh(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)gh(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const bo=new WeakMap,Hi=Symbol(""),cl=Symbol(""),Mr=Symbol("");function Ft(n,e,t){if(Tn&&ft){let i=bo.get(n);i||bo.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new Hl),s.map=i,s.key=t),s.track()}}function Kn(n,e,t,i,s,r){const a=bo.get(n);if(!a){xr++;return}const o=l=>{l&&l.trigger()};if(Ol(),e==="clear")a.forEach(o);else{const l=Fe(n),c=l&&ko(t);if(l&&t==="length"){const u=Number(i);a.forEach((f,h)=>{(h==="length"||h===Mr||!_n(h)&&h>=u)&&o(f)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(Mr)),e){case"add":l?c&&o(a.get("length")):(o(a.get(Hi)),Cs(n)&&o(a.get(cl)));break;case"delete":l||(o(a.get(Hi)),Cs(n)&&o(a.get(cl)));break;case"set":Cs(n)&&o(a.get(Hi));break}}Bl()}function bp(n,e){const t=bo.get(n);return t&&t.get(e)}function Zi(n){const e=Qe(n);return e===n?e:(Ft(e,"iterate",Mr),on(n)?e:e.map(An))}function Xo(n){return Ft(n=Qe(n),"iterate",Mr),n}function Dn(n,e){return si(n)?Ns(Qn(n)?An(e):e):An(e)}const Ep={__proto__:null,[Symbol.iterator](){return ga(this,Symbol.iterator,n=>Dn(this,n))},concat(...n){return Zi(this).concat(...n.map(e=>Fe(e)?Zi(e):e))},entries(){return ga(this,"entries",n=>(n[1]=Dn(this,n[1]),n))},every(n,e){return zn(this,"every",n,e,void 0,arguments)},filter(n,e){return zn(this,"filter",n,e,t=>t.map(i=>Dn(this,i)),arguments)},find(n,e){return zn(this,"find",n,e,t=>Dn(this,t),arguments)},findIndex(n,e){return zn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return zn(this,"findLast",n,e,t=>Dn(this,t),arguments)},findLastIndex(n,e){return zn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return zn(this,"forEach",n,e,void 0,arguments)},includes(...n){return _a(this,"includes",n)},indexOf(...n){return _a(this,"indexOf",n)},join(n){return Zi(this).join(n)},lastIndexOf(...n){return _a(this,"lastIndexOf",n)},map(n,e){return zn(this,"map",n,e,void 0,arguments)},pop(){return Ys(this,"pop")},push(...n){return Ys(this,"push",n)},reduce(n,...e){return Sc(this,"reduce",n,e)},reduceRight(n,...e){return Sc(this,"reduceRight",n,e)},shift(){return Ys(this,"shift")},some(n,e){return zn(this,"some",n,e,void 0,arguments)},splice(...n){return Ys(this,"splice",n)},toReversed(){return Zi(this).toReversed()},toSorted(n){return Zi(this).toSorted(n)},toSpliced(...n){return Zi(this).toSpliced(...n)},unshift(...n){return Ys(this,"unshift",n)},values(){return ga(this,"values",n=>Dn(this,n))}};function ga(n,e,t){const i=Xo(n),s=i[e]();return i!==n&&!on(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const Tp=Array.prototype;function zn(n,e,t,i,s,r){const a=Xo(n),o=a!==n&&!on(n),l=a[e];if(l!==Tp[e]){const f=l.apply(n,r);return o?An(f):f}let c=t;a!==n&&(o?c=function(f,h){return t.call(this,Dn(n,f),h,n)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,n)}));const u=l.call(a,c,i);return o&&s?s(u):u}function Sc(n,e,t,i){const s=Xo(n),r=s!==n&&!on(n);let a=t,o=!1;s!==n&&(r?(o=i.length===0,a=function(c,u,f){return o&&(o=!1,c=Dn(n,c)),t.call(this,c,Dn(n,u),f,n)}):t.length>3&&(a=function(c,u,f){return t.call(this,c,u,f,n)}));const l=s[e](a,...i);return o?Dn(n,l):l}function _a(n,e,t){const i=Qe(n);Ft(i,"iterate",Mr);const s=i[e](...t);return(s===-1||s===!1)&&qo(t[0])?(t[0]=Qe(t[0]),i[e](...t)):s}function Ys(n,e,t=[]){ni(),Ol();const i=Qe(n)[e].apply(n,t);return Bl(),ii(),i}const wp=Ul("__proto__,__v_isRef,__isVue"),_h=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(_n));function Ap(n){_n(n)||(n=String(n));const e=Qe(this);return Ft(e,"has",n),e.hasOwnProperty(n)}class vh{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?Op:yh:r?Sh:Mh).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Fe(e);if(!s){let l;if(a&&(l=Ep[t]))return l;if(t==="hasOwnProperty")return Ap}const o=Reflect.get(e,t,_t(e)?e:i);if((_n(t)?_h.has(t):wp(t))||(s||Ft(e,"get",t),r))return o;if(_t(o)){const l=a&&ko(t)?o:o.value;return s&&ot(l)?fl(l):l}return ot(o)?s?fl(o):jo(o):o}}class xh extends vh{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const a=Fe(e)&&ko(t);if(!this._isShallow){const c=si(r);if(!on(i)&&!si(i)&&(r=Qe(r),i=Qe(i)),!a&&_t(r)&&!_t(i))return c||(r.value=i),!0}const o=a?Number(t)<e.length:nt(e,t),l=Reflect.set(e,t,i,_t(e)?e:s);return e===Qe(s)&&l&&(o?Nn(i,r)&&Kn(e,"set",t,i):Kn(e,"add",t,i)),l}deleteProperty(e,t){const i=nt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Kn(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!_n(t)||!_h.has(t))&&Ft(e,"has",t),i}ownKeys(e){return Ft(e,"iterate",Fe(e)?"length":Hi),Reflect.ownKeys(e)}}class Rp extends vh{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Cp=new xh,Pp=new Rp,Lp=new xh(!0);const ul=n=>n,Nr=n=>Reflect.getPrototypeOf(n);function Dp(n,e,t){return function(...i){const s=this.__v_raw,r=Qe(s),a=Cs(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),u=t?ul:e?Ns:An;return!e&&Ft(r,"iterate",l?cl:Hi),Gt(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:o?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function Fr(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Up(n,e){const t={get(s){const r=this.__v_raw,a=Qe(r),o=Qe(s);n||(Nn(s,o)&&Ft(a,"get",s),Ft(a,"get",o));const{has:l}=Nr(a),c=e?ul:n?Ns:An;if(l.call(a,s))return c(r.get(s));if(l.call(a,o))return c(r.get(o));r!==a&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Ft(Qe(s),"iterate",Hi),s.size},has(s){const r=this.__v_raw,a=Qe(r),o=Qe(s);return n||(Nn(s,o)&&Ft(a,"has",s),Ft(a,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const a=this,o=a.__v_raw,l=Qe(o),c=e?ul:n?Ns:An;return!n&&Ft(l,"iterate",Hi),o.forEach((u,f)=>s.call(r,c(u),c(f),a))}};return Gt(t,n?{add:Fr("add"),set:Fr("set"),delete:Fr("delete"),clear:Fr("clear")}:{add(s){const r=Qe(this),a=Nr(r),o=Qe(s),l=!e&&!on(s)&&!si(s)?o:s;return a.has.call(r,l)||Nn(s,l)&&a.has.call(r,s)||Nn(o,l)&&a.has.call(r,o)||(r.add(l),Kn(r,"add",l,l)),this},set(s,r){!e&&!on(r)&&!si(r)&&(r=Qe(r));const a=Qe(this),{has:o,get:l}=Nr(a);let c=o.call(a,s);c||(s=Qe(s),c=o.call(a,s));const u=l.call(a,s);return a.set(s,r),c?Nn(r,u)&&Kn(a,"set",s,r):Kn(a,"add",s,r),this},delete(s){const r=Qe(this),{has:a,get:o}=Nr(r);let l=a.call(r,s);l||(s=Qe(s),l=a.call(r,s)),o&&o.call(r,s);const c=r.delete(s);return l&&Kn(r,"delete",s,void 0),c},clear(){const s=Qe(this),r=s.size!==0,a=s.clear();return r&&Kn(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Dp(s,n,e)}),t}function Gl(n,e){const t=Up(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(nt(t,s)&&s in i?t:i,s,r)}const Ip={get:Gl(!1,!1)},Np={get:Gl(!1,!0)},Fp={get:Gl(!0,!1)};const Mh=new WeakMap,Sh=new WeakMap,yh=new WeakMap,Op=new WeakMap;function Bp(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function jo(n){return si(n)?n:kl(n,!1,Cp,Ip,Mh)}function zp(n){return kl(n,!1,Lp,Np,Sh)}function fl(n){return kl(n,!0,Pp,Fp,yh)}function kl(n,e,t,i,s){if(!ot(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const a=Bp(up(n));if(a===0)return n;const o=new Proxy(n,a===2?i:t);return s.set(n,o),o}function Qn(n){return si(n)?Qn(n.__v_raw):!!(n&&n.__v_isReactive)}function si(n){return!!(n&&n.__v_isReadonly)}function on(n){return!!(n&&n.__v_isShallow)}function qo(n){return n?!!n.__v_raw:!1}function Qe(n){const e=n&&n.__v_raw;return e?Qe(e):n}function Yo(n){return!nt(n,"__v_skip")&&Object.isExtensible(n)&&nh(n,"__v_skip",!0),n}const An=n=>ot(n)?jo(n):n,Ns=n=>ot(n)?fl(n):n;function _t(n){return n?n.__v_isRef===!0:!1}function tt(n){return Hp(n,!1)}function Hp(n,e){return _t(n)?n:new Gp(n,e)}class Gp{constructor(e,t){this.dep=new Hl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Qe(e),this._value=t?e:An(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||on(e)||si(e);e=i?e:Qe(e),Nn(e,t)&&(this._rawValue=e,this._value=i?e:An(e),this.dep.trigger())}}function Le(n){return _t(n)?n.value:n}const kp={get:(n,e,t)=>e==="__v_raw"?n:Le(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return _t(s)&&!_t(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function bh(n){return Qn(n)?n:new Proxy(n,kp)}function Vp(n){const e=Fe(n)?new Array(n.length):{};for(const t in n)e[t]=Xp(n,t);return e}class Wp{constructor(e,t,i){this._object=e,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0,this._key=_n(t)?t:String(t),this._raw=Qe(e);let s=!0,r=e;if(!Fe(e)||_n(this._key)||!ko(this._key))do s=!qo(r)||on(r);while(s&&(r=r.__v_raw));this._shallow=s}get value(){let e=this._object[this._key];return this._shallow&&(e=Le(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&_t(this._raw[this._key])){const t=this._object[this._key];if(_t(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return bp(this._raw,this._key)}}function Xp(n,e,t){return new Wp(n,e,t)}class jp{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Hl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=xr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ft!==this)return fh(this,!0),!0}get value(){const e=this.dep.track();return ph(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function qp(n,e,t=!1){let i,s;return We(n)?i=n:(i=n.get,s=n.set),new jp(i,s,t)}const Or={},Eo=new WeakMap;let Ni;function Yp(n,e=!1,t=Ni){if(t){let i=Eo.get(t);i||Eo.set(t,i=[]),i.push(n)}}function Kp(n,e,t=lt){const{immediate:i,deep:s,once:r,scheduler:a,augmentJob:o,call:l}=t,c=E=>s?E:on(E)||s===!1||s===0?$n(E,1):$n(E);let u,f,h,p,v=!1,x=!1;if(_t(n)?(f=()=>n.value,v=on(n)):Qn(n)?(f=()=>c(n),v=!0):Fe(n)?(x=!0,v=n.some(E=>Qn(E)||on(E)),f=()=>n.map(E=>{if(_t(E))return E.value;if(Qn(E))return c(E);if(We(E))return l?l(E,2):E()})):We(n)?e?f=l?()=>l(n,2):n:f=()=>{if(h){ni();try{h()}finally{ii()}}const E=Ni;Ni=u;try{return l?l(n,3,[p]):n(p)}finally{Ni=E}}:f=Fn,e&&s){const E=f,D=s===!0?1/0:s;f=()=>$n(E(),D)}const m=lh(),d=()=>{u.stop(),m&&m.active&&Il(m.effects,u)};if(r&&e){const E=e;e=(...D)=>{const C=E(...D);return d(),C}}let y=x?new Array(n.length).fill(Or):Or;const S=E=>{if(!(!(u.flags&1)||!u.dirty&&!E))if(e){const D=u.run();if(E||s||v||(x?D.some((C,A)=>Nn(C,y[A])):Nn(D,y))){h&&h();const C=Ni;Ni=u;try{const A=[D,y===Or?void 0:x&&y[0]===Or?[]:y,p];y=D,l?l(e,3,A):e(...A)}finally{Ni=C}}}else u.run()};return o&&o(S),u=new ch(f),u.scheduler=a?()=>a(S,!1):S,p=E=>Yp(E,!1,u),h=u.onStop=()=>{const E=Eo.get(u);if(E){if(l)l(E,4);else for(const D of E)D();Eo.delete(u)}},e?i?S(!0):y=u.run():a?a(S.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function $n(n,e=1/0,t){if(e<=0||!ot(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,_t(n))$n(n.value,e,t);else if(Fe(n))for(let i=0;i<n.length;i++)$n(n[i],e,t);else if(Zf(n)||Cs(n))n.forEach(i=>{$n(i,e,t)});else if(eh(n)){for(const i in n)$n(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&$n(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Cr(n,e,t,i){try{return i?n(...i):n()}catch(s){Ko(s,e,t)}}function Rn(n,e,t,i){if(We(n)){const s=Cr(n,e,t,i);return s&&Jf(s)&&s.catch(r=>{Ko(r,e,t)}),s}if(Fe(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Rn(n[r],e,t,i));return s}}function Ko(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||lt;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}o=o.parent}if(r){ni(),Cr(r,null,10,[n,l,c]),ii();return}}$p(n,t,s,i,a)}function $p(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const Yt=[];let Ln=-1;const Ls=[];let mi=null,ys=0;const Eh=Promise.resolve();let To=null;function Th(n){const e=To||Eh;return n?e.then(this?n.bind(this):n):e}function Zp(n){let e=Ln+1,t=Yt.length;for(;e<t;){const i=e+t>>>1,s=Yt[i],r=Sr(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function Vl(n){if(!(n.flags&1)){const e=Sr(n),t=Yt[Yt.length-1];!t||!(n.flags&2)&&e>=Sr(t)?Yt.push(n):Yt.splice(Zp(e),0,n),n.flags|=1,wh()}}function wh(){To||(To=Eh.then(Rh))}function Jp(n){Fe(n)?Ls.push(...n):mi&&n.id===-1?mi.splice(ys+1,0,n):n.flags&1||(Ls.push(n),n.flags|=1),wh()}function yc(n,e,t=Ln+1){for(;t<Yt.length;t++){const i=Yt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Yt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Ah(n){if(Ls.length){const e=[...new Set(Ls)].sort((t,i)=>Sr(t)-Sr(i));if(Ls.length=0,mi){mi.push(...e);return}for(mi=e,ys=0;ys<mi.length;ys++){const t=mi[ys];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}mi=null,ys=0}}const Sr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Rh(n){try{for(Ln=0;Ln<Yt.length;Ln++){const e=Yt[Ln];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Cr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ln<Yt.length;Ln++){const e=Yt[Ln];e&&(e.flags&=-2)}Ln=-1,Yt.length=0,Ah(),To=null,(Yt.length||Ls.length)&&Rh()}}let mn=null,Ch=null;function wo(n){const e=mn;return mn=n,Ch=n&&n.type.__scopeId||null,e}function Qp(n,e=mn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Uc(-1);const r=wo(e),a=ki.length;let o;try{o=n(...s)}finally{for(let l=ki.length;l>a;l--)ed();wo(r),i._d&&Uc(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Ph(n,e){if(mn===null)return n;const t=ea(mn),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,a,o,l=lt]=e[s];r&&(We(r)&&(r={mounted:r,updated:r}),r.deep&&$n(a),i.push({dir:r,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function Ri(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(ni(),Rn(l,t,8,[n.el,o,n,e]),ii())}}function em(n,e){if($t){let t=$t.provides;const i=$t.parent&&$t.parent.provides;i===t&&(t=$t.provides=Object.create(i)),t[n]=e}}function fr(n,e,t=!1){const i=id();if(i||Gi){let s=Gi?Gi._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&We(e)?e.call(i&&i.proxy):e}}function tm(){return!!(id()||Gi)}const nm=Symbol.for("v-scx"),im=()=>fr(nm);function hr(n,e,t){return Lh(n,e,t)}function Lh(n,e,t=lt){const{immediate:i,deep:s,flush:r,once:a}=t,o=Gt({},t),l=e&&i||!e&&r!=="post";let c;if(br){if(r==="sync"){const p=im();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Fn,p.resume=Fn,p.pause=Fn,p}}const u=$t;o.call=(p,v,x)=>Rn(p,u,v,x);let f=!1;r==="post"?o.scheduler=p=>{Zt(p,u&&u.suspense)}:r!=="sync"&&(f=!0,o.scheduler=(p,v)=>{v?p():Vl(p)}),o.augmentJob=p=>{e&&(p.flags|=4),f&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const h=Kp(n,e,o);return br&&(c?c.push(h):l&&h()),h}function sm(n,e,t){const i=this.proxy,s=gt(n)?n.includes(".")?Dh(i,n):()=>i[n]:n.bind(i,i);let r;We(e)?r=e:(r=e.handler,t=e);const a=Pr(this),o=Lh(s,r.bind(i),t);return a(),o}function Dh(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const rm=Symbol("_vte"),om=n=>n.__isTeleport,va=Symbol("_leaveCb");function Wl(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Wl(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Uh(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function bc(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Ao=new WeakMap;function dr(n,e,t,i,s=!1){if(Fe(n)){n.forEach((x,m)=>dr(x,e&&(Fe(e)?e[m]:e),t,i,s));return}if(pr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&dr(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?ea(i.component):i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,u=o.refs===lt?o.refs={}:o.refs,f=o.setupState,h=Qe(f),p=f===lt?$f:x=>bc(u,x)?!1:nt(h,x),v=(x,m)=>!(m&&bc(u,m));if(c!=null&&c!==l){if(Ec(e),gt(c))u[c]=null,p(c)&&(f[c]=null);else if(_t(c)){const x=e;v(c,x.k)&&(c.value=null),x.k&&(u[x.k]=null)}}if(We(l))Cr(l,o,12,[a,u]);else{const x=gt(l),m=_t(l);if(x||m){const d=()=>{if(n.f){const y=x?p(l)?f[l]:u[l]:v()||!n.k?l.value:u[n.k];if(s)Fe(y)&&Il(y,r);else if(Fe(y))y.includes(r)||y.push(r);else if(x)u[l]=[r],p(l)&&(f[l]=u[l]);else{const S=[r];v(l,n.k)&&(l.value=S),n.k&&(u[n.k]=S)}}else x?(u[l]=a,p(l)&&(f[l]=a)):m&&(v(l,n.k)&&(l.value=a),n.k&&(u[n.k]=a))};if(a){const y=()=>{d(),Ao.delete(n)};y.id=-1,Ao.set(n,y),Zt(y,t)}else Ec(n),d()}}}function Ec(n){const e=Ao.get(n);e&&(e.flags|=8,Ao.delete(n))}Wo().requestIdleCallback;Wo().cancelIdleCallback;const pr=n=>!!n.type.__asyncLoader,Ih=n=>n.type.__isKeepAlive;function am(n,e){Nh(n,"a",e)}function lm(n,e){Nh(n,"da",e)}function Nh(n,e,t=$t){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if($o(e,i,t),t){let s=t.parent;for(;s&&s.parent;)Ih(s.parent.vnode)&&cm(i,e,t,s),s=s.parent}}function cm(n,e,t,i){const s=$o(e,n,i,!0);Fh(()=>{Il(i[e],s)},t)}function $o(n,e,t=$t,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{ni();const o=Pr(t),l=Rn(e,t,n,a);return o(),ii(),l});return i?s.unshift(r):s.push(r),r}}const oi=n=>(e,t=$t)=>{(!br||n==="sp")&&$o(n,(...i)=>e(...i),t)},um=oi("bm"),Xl=oi("m"),fm=oi("bu"),hm=oi("u"),Zo=oi("bum"),Fh=oi("um"),dm=oi("sp"),pm=oi("rtg"),mm=oi("rtc");function gm(n,e=$t){$o("ec",n,e)}const _m=Symbol.for("v-ndc");function vm(n,e,t,i){let s;const r=t,a=Fe(n);if(a||gt(n)){const o=a&&Qn(n);let l=!1,c=!1;o&&(l=!on(n),c=si(n),n=Xo(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=e(l?c?Ns(An(n[u])):An(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let o=0;o<n;o++)s[o]=e(o+1,o,void 0,r)}else if(ot(n))if(n[Symbol.iterator])s=Array.from(n,(o,l)=>e(o,l,void 0,r));else{const o=Object.keys(n);s=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const hl=n=>n?sd(n)?ea(n):hl(n.parent):null,mr=Gt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>hl(n.parent),$root:n=>hl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Bh(n),$forceUpdate:n=>n.f||(n.f=()=>{Vl(n.update)}),$nextTick:n=>n.n||(n.n=Th.bind(n.proxy)),$watch:n=>sm.bind(n)}),xa=(n,e)=>n!==lt&&!n.__isScriptSetup&&nt(n,e),xm={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const h=a[e];if(h!==void 0)switch(h){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(xa(i,e))return a[e]=1,i[e];if(s!==lt&&nt(s,e))return a[e]=2,s[e];if(nt(r,e))return a[e]=3,r[e];if(t!==lt&&nt(t,e))return a[e]=4,t[e];dl&&(a[e]=0)}}const c=mr[e];let u,f;if(c)return e==="$attrs"&&Ft(n.attrs,"get",""),c(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==lt&&nt(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,nt(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return xa(s,e)?(s[e]=t,!0):i!==lt&&nt(i,e)?(i[e]=t,!0):nt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:a}},o){let l;return!!(t[o]||n!==lt&&o[0]!=="$"&&nt(n,o)||xa(e,o)||nt(r,o)||nt(i,o)||nt(mr,o)||nt(s.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:nt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Tc(n){return Fe(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let dl=!0;function Mm(n){const e=Bh(n),t=n.proxy,i=n.ctx;dl=!1,e.beforeCreate&&wc(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:p,updated:v,activated:x,deactivated:m,beforeDestroy:d,beforeUnmount:y,destroyed:S,unmounted:E,render:D,renderTracked:C,renderTriggered:A,errorCaptured:H,serverPrefetch:b,expose:w,inheritAttrs:W,components:ee,directives:de,filters:N}=e;if(c&&Sm(c,i,null),a)for(const q in a){const $=a[q];We($)&&(i[q]=$.bind(t))}if(s){const q=s.call(t,t);ot(q)&&(n.data=jo(q))}if(dl=!0,r)for(const q in r){const $=r[q],ie=We($)?$.bind(t,t):We($.get)?$.get.bind(t,t):Fn,se=!We($)&&We($.set)?$.set.bind(t):Fn,fe=nn({get:ie,set:se});Object.defineProperty(i,q,{enumerable:!0,configurable:!0,get:()=>fe.value,set:ue=>fe.value=ue})}if(o)for(const q in o)Oh(o[q],i,t,q);if(l){const q=We(l)?l.call(t):l;Reflect.ownKeys(q).forEach($=>{em($,q[$])})}u&&wc(u,n,"c");function V(q,$){Fe($)?$.forEach(ie=>q(ie.bind(t))):$&&q($.bind(t))}if(V(um,f),V(Xl,h),V(fm,p),V(hm,v),V(am,x),V(lm,m),V(gm,H),V(mm,C),V(pm,A),V(Zo,y),V(Fh,E),V(dm,b),Fe(w))if(w.length){const q=n.exposed||(n.exposed={});w.forEach($=>{Object.defineProperty(q,$,{get:()=>t[$],set:ie=>t[$]=ie,enumerable:!0})})}else n.exposed||(n.exposed={});D&&n.render===Fn&&(n.render=D),W!=null&&(n.inheritAttrs=W),ee&&(n.components=ee),de&&(n.directives=de),b&&Uh(n)}function Sm(n,e,t=Fn){Fe(n)&&(n=pl(n));for(const i in n){const s=n[i];let r;ot(s)?"default"in s?r=fr(s.from||i,s.default,!0):r=fr(s.from||i):r=fr(s),_t(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function wc(n,e,t){Rn(Fe(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Oh(n,e,t,i){let s=i.includes(".")?Dh(t,i):()=>t[i];if(gt(n)){const r=e[n];We(r)&&hr(s,r)}else if(We(n))hr(s,n.bind(t));else if(ot(n))if(Fe(n))n.forEach(r=>Oh(r,e,t,i));else{const r=We(n.handler)?n.handler.bind(t):e[n.handler];We(r)&&hr(s,r,n)}}function Bh(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>Ro(l,c,a,!0)),Ro(l,e,a)),ot(e)&&r.set(e,l),l}function Ro(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&Ro(n,r,t,!0),s&&s.forEach(a=>Ro(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=ym[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const ym={data:Ac,props:Rc,emits:Rc,methods:or,computed:or,beforeCreate:Xt,created:Xt,beforeMount:Xt,mounted:Xt,beforeUpdate:Xt,updated:Xt,beforeDestroy:Xt,beforeUnmount:Xt,destroyed:Xt,unmounted:Xt,activated:Xt,deactivated:Xt,errorCaptured:Xt,serverPrefetch:Xt,components:or,directives:or,watch:Em,provide:Ac,inject:bm};function Ac(n,e){return e?n?function(){return Gt(We(n)?n.call(this,this):n,We(e)?e.call(this,this):e)}:e:n}function bm(n,e){return or(pl(n),pl(e))}function pl(n){if(Fe(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Xt(n,e){return n?[...new Set([].concat(n,e))]:e}function or(n,e){return n?Gt(Object.create(null),n,e):e}function Rc(n,e){return n?Fe(n)&&Fe(e)?[...new Set([...n,...e])]:Gt(Object.create(null),Tc(n),Tc(e??{})):e}function Em(n,e){if(!n)return e;if(!e)return n;const t=Gt(Object.create(null),n);for(const i in e)t[i]=Xt(n[i],e[i]);return t}function zh(){return{app:null,config:{isNativeTag:$f,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Tm=0;function wm(n,e){return function(i,s=null){We(i)||(i=Gt({},i)),s!=null&&!ot(s)&&(s=null);const r=zh(),a=new WeakSet,o=[];let l=!1;const c=r.app={_uid:Tm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:i0,get config(){return r.config},set config(u){},use(u,...f){return a.has(u)||(u&&We(u.install)?(a.add(u),u.install(c,...f)):We(u)&&(a.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const p=c._ceVNode||Mt(i,s);return p.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(p,u,h),l=!0,c._container=u,u.__vue_app__=c,ea(p.component)}},onUnmount(u){o.push(u)},unmount(){l&&(Rn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=Gi;Gi=c;try{return u()}finally{Gi=f}}};return c}}let Gi=null;const Am=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${En(e)}Modifiers`]||n[`${ji(e)}Modifiers`];function Rm(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||lt;let s=t;const r=e.startsWith("update:"),a=r&&Am(i,e.slice(7));a&&(a.trim&&(s=t.map(u=>gt(u)?u.trim():u)),a.number&&(s=t.map(Nl)));let o,l=i[o=da(e)]||i[o=da(En(e))];!l&&r&&(l=i[o=da(ji(e))]),l&&Rn(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,Rn(c,n,6,s)}}const Cm=new WeakMap;function Hh(n,e,t=!1){const i=t?Cm:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!We(n)){const l=c=>{const u=Hh(c,e,!0);u&&(o=!0,Gt(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(ot(n)&&i.set(n,null),null):(Fe(r)?r.forEach(l=>a[l]=null):Gt(a,r),ot(n)&&i.set(n,a),a)}function Jo(n,e){return!n||!Ho(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),nt(n,e[0].toLowerCase()+e.slice(1))||nt(n,ji(e))||nt(n,e))}function Cc(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:h,setupState:p,ctx:v,inheritAttrs:x}=n,m=wo(n);let d,y;try{if(t.shapeFlag&4){const E=s||i,D=E;d=Un(c.call(D,E,u,f,p,h,v)),y=o}else{const E=e;d=Un(E.length>1?E(f,{attrs:o,slots:a,emit:l}):E(f,null)),y=e.props?o:Pm(o)}}catch(E){ki.length=0,Ko(E,n,1),d=Mt(Fs)}let S=d;if(y&&x!==!1){const E=Object.keys(y),{shapeFlag:D}=S;E.length&&D&7&&(r&&E.some(Go)&&(y=Lm(y,r)),S=Os(S,y,!1,!0))}return t.dirs&&(S=Os(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(t.dirs):t.dirs),t.transition&&Wl(S,t.transition),d=S,wo(m),d}const Pm=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ho(t))&&((e||(e={}))[t]=n[t]);return e},Lm=(n,e)=>{const t={};for(const i in n)(!Go(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Dm(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Pc(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(Gh(a,i,h)&&!Jo(c,h))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Pc(i,a,c):!0:!!a;return!1}function Pc(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Gh(e,n,r)&&!Jo(t,r))return!0}return!1}function Gh(n,e,t){const i=n[t],s=e[t];return t==="style"&&ot(i)&&ot(s)?!Fl(i,s):i!==s}function Um({vnode:n,parent:e,suspense:t},i){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const kh={},Vh=()=>Object.create(kh),Wh=n=>Object.getPrototypeOf(n)===kh;function Im(n,e,t,i=!1){const s={},r=Vh();n.propsDefaults=Object.create(null),Xh(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:zp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Nm(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=Qe(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Jo(n.emitsOptions,h))continue;const p=e[h];if(l)if(nt(r,h))p!==r[h]&&(r[h]=p,c=!0);else{const v=En(h);s[v]=ml(l,o,v,p,n,!1)}else p!==r[h]&&(r[h]=p,c=!0)}}}else{Xh(n,e,s,r)&&(c=!0);let u;for(const f in o)(!e||!nt(e,f)&&((u=ji(f))===f||!nt(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(s[f]=ml(l,o,f,void 0,n,!0)):delete s[f]);if(r!==o)for(const f in r)(!e||!nt(e,f))&&(delete r[f],c=!0)}c&&Kn(n.attrs,"set","")}function Xh(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(lr(l))continue;const c=e[l];let u;s&&nt(s,u=En(l))?!r||!r.includes(u)?t[u]=c:(o||(o={}))[u]=c:Jo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=Qe(t),c=o||lt;for(let u=0;u<r.length;u++){const f=r[u];t[f]=ml(s,l,f,c[f],n,!nt(c,f))}}return a}function ml(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=nt(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&We(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Pr(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===ji(t))&&(i=!0))}return i}const Fm=new WeakMap;function jh(n,e,t=!1){const i=t?Fm:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!We(n)){const u=f=>{l=!0;const[h,p]=jh(f,e,!0);Gt(a,h),p&&o.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ot(n)&&i.set(n,Rs),Rs;if(Fe(r))for(let u=0;u<r.length;u++){const f=En(r[u]);Lc(f)&&(a[f]=lt)}else if(r)for(const u in r){const f=En(u);if(Lc(f)){const h=r[u],p=a[f]=Fe(h)||We(h)?{type:h}:Gt({},h),v=p.type;let x=!1,m=!0;if(Fe(v))for(let d=0;d<v.length;++d){const y=v[d],S=We(y)&&y.name;if(S==="Boolean"){x=!0;break}else S==="String"&&(m=!1)}else x=We(v)&&v.name==="Boolean";p[0]=x,p[1]=m,(x||nt(p,"default"))&&o.push(f)}}const c=[a,o];return ot(n)&&i.set(n,c),c}function Lc(n){return n[0]!=="$"&&!lr(n)}const jl=n=>n==="_"||n==="_ctx"||n==="$stable",ql=n=>Fe(n)?n.map(Un):[Un(n)],Om=(n,e,t)=>{if(e._n)return e;const i=Qp((...s)=>ql(e(...s)),t);return i._c=!1,i},qh=(n,e,t)=>{const i=n._ctx;for(const s in n){if(jl(s))continue;const r=n[s];if(We(r))e[s]=Om(s,r,i);else if(r!=null){const a=ql(r);e[s]=()=>a}}},Yh=(n,e)=>{const t=ql(e);n.slots.default=()=>t},Kh=(n,e,t)=>{for(const i in e)(t||!jl(i))&&(n[i]=e[i])},Bm=(n,e,t)=>{const i=n.slots=Vh();if(n.vnode.shapeFlag&32){const s=e._;s?(Kh(i,e,t),t&&nh(i,"_",s,!0)):qh(e,i)}else e&&Yh(n,e)},zm=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=lt;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:Kh(s,e,t):(r=!e.$stable,qh(e,s)),a=e}else e&&(Yh(n,e),a={default:1});if(r)for(const o in s)!jl(o)&&a[o]==null&&delete s[o]},Zt=Wm;function Hm(n){return Gm(n)}function Gm(n,e){const t=Wo();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:p=Fn,insertStaticContent:v}=n,x=(M,U,F,X=null,B=null,Q=null,te=void 0,g=null,_=!!U.dynamicChildren)=>{if(M===U)return;M&&!Ks(M,U)&&(X=we(M),ue(M,B,Q,!0),M=null),U.patchFlag===-2&&(_=!1,U.dynamicChildren=null);const{type:R,ref:j,shapeFlag:O}=U;switch(R){case Qo:m(M,U,F,X);break;case Fs:d(M,U,F,X);break;case Sa:M==null&&y(U,F,X,te);break;case fn:ee(M,U,F,X,B,Q,te,g,_);break;default:O&1?D(M,U,F,X,B,Q,te,g,_):O&6?de(M,U,F,X,B,Q,te,g,_):(O&64||O&128)&&R.process(M,U,F,X,B,Q,te,g,_,Re)}j!=null&&B?dr(j,M&&M.ref,Q,U||M,!U):j==null&&M&&M.ref!=null&&dr(M.ref,null,Q,M,!0)},m=(M,U,F,X)=>{if(M==null)i(U.el=o(U.children),F,X);else{const B=U.el=M.el;U.children!==M.children&&c(B,U.children)}},d=(M,U,F,X)=>{M==null?i(U.el=l(U.children||""),F,X):U.el=M.el},y=(M,U,F,X)=>{[M.el,M.anchor]=v(M.children,U,F,X,M.el,M.anchor)},S=({el:M,anchor:U},F,X)=>{let B;for(;M&&M!==U;)B=h(M),i(M,F,X),M=B;i(U,F,X)},E=({el:M,anchor:U})=>{let F;for(;M&&M!==U;)F=h(M),s(M),M=F;s(U)},D=(M,U,F,X,B,Q,te,g,_)=>{if(U.type==="svg"?te="svg":U.type==="math"&&(te="mathml"),M==null)C(U,F,X,B,Q,te,g,_);else{const R=M.el&&M.el._isVueCE?M.el:null;try{R&&R._beginPatch(),b(M,U,B,Q,te,g,_)}finally{R&&R._endPatch()}}},C=(M,U,F,X,B,Q,te,g)=>{let _,R;const{props:j,shapeFlag:O,transition:G,dirs:ae}=M;if(_=M.el=a(M.type,Q,j&&j.is,j),O&8?u(_,M.children):O&16&&H(M.children,_,null,X,B,Ma(M,Q),te,g),ae&&Ri(M,null,X,"created"),A(_,M,M.scopeId,te,X),j){for(const he in j)he!=="value"&&!lr(he)&&r(_,he,null,j[he],Q,X);"value"in j&&r(_,"value",null,j.value,Q),(R=j.onVnodeBeforeMount)&&Pn(R,X,M)}ae&&Ri(M,null,X,"beforeMount");const re=km(B,G);re&&G.beforeEnter(_),i(_,U,F),((R=j&&j.onVnodeMounted)||re||ae)&&Zt(()=>{try{R&&Pn(R,X,M),re&&G.enter(_),ae&&Ri(M,null,X,"mounted")}finally{}},B)},A=(M,U,F,X,B)=>{if(F&&p(M,F),X)for(let Q=0;Q<X.length;Q++)p(M,X[Q]);if(B){let Q=B.subTree;if(U===Q||Qh(Q.type)&&(Q.ssContent===U||Q.ssFallback===U)){const te=B.vnode;A(M,te,te.scopeId,te.slotScopeIds,B.parent)}}},H=(M,U,F,X,B,Q,te,g,_=0)=>{for(let R=_;R<M.length;R++){const j=M[R]=g?qn(M[R]):Un(M[R]);x(null,j,U,F,X,B,Q,te,g)}},b=(M,U,F,X,B,Q,te)=>{const g=U.el=M.el;let{patchFlag:_,dynamicChildren:R,dirs:j}=U;_|=M.patchFlag&16;const O=M.props||lt,G=U.props||lt;let ae;if(F&&Ci(F,!1),(ae=G.onVnodeBeforeUpdate)&&Pn(ae,F,U,M),j&&Ri(U,M,F,"beforeUpdate"),F&&Ci(F,!0),R&&(!M.dynamicChildren||M.dynamicChildren.length!==R.length)&&(_=0,te=!1,R=null),(O.innerHTML&&G.innerHTML==null||O.textContent&&G.textContent==null)&&u(g,""),R?w(M.dynamicChildren,R,g,F,X,Ma(U,B),Q):te||$(M,U,g,null,F,X,Ma(U,B),Q,!1),_>0){if(_&16)W(g,O,G,F,B);else if(_&2&&O.class!==G.class&&r(g,"class",null,G.class,B),_&4&&r(g,"style",O.style,G.style,B),_&8){const re=U.dynamicProps;for(let he=0;he<re.length;he++){const Me=re[he],Ae=O[Me],ne=G[Me];(ne!==Ae||Me==="value")&&r(g,Me,Ae,ne,B,F)}}_&1&&M.children!==U.children&&u(g,U.children)}else!te&&R==null&&W(g,O,G,F,B);((ae=G.onVnodeUpdated)||j)&&Zt(()=>{ae&&Pn(ae,F,U,M),j&&Ri(U,M,F,"updated")},X)},w=(M,U,F,X,B,Q,te)=>{for(let g=0;g<U.length;g++){const _=M[g],R=U[g],j=_.el&&(_.type===fn||!Ks(_,R)||_.shapeFlag&198)?f(_.el):F;x(_,R,j,null,X,B,Q,te,!0)}},W=(M,U,F,X,B)=>{if(U!==F){if(U!==lt)for(const Q in U)!lr(Q)&&!(Q in F)&&r(M,Q,U[Q],null,B,X);for(const Q in F){if(lr(Q))continue;const te=F[Q],g=U[Q];te!==g&&Q!=="value"&&r(M,Q,g,te,B,X)}"value"in F&&r(M,"value",U.value,F.value,B)}},ee=(M,U,F,X,B,Q,te,g,_)=>{const R=U.el=M?M.el:o(""),j=U.anchor=M?M.anchor:o("");let{patchFlag:O,dynamicChildren:G,slotScopeIds:ae}=U;ae&&(g=g?g.concat(ae):ae),M==null?(i(R,F,X),i(j,F,X),H(U.children||[],F,j,B,Q,te,g,_)):O>0&&O&64&&G&&M.dynamicChildren&&M.dynamicChildren.length===G.length?(w(M.dynamicChildren,G,F,B,Q,te,g),(U.key!=null||B&&U===B.subTree)&&$h(M,U,!0)):$(M,U,F,j,B,Q,te,g,_)},de=(M,U,F,X,B,Q,te,g,_)=>{U.slotScopeIds=g,M==null?U.shapeFlag&512?B.ctx.activate(U,F,X,te,_):N(U,F,X,B,Q,te,_):k(M,U,_)},N=(M,U,F,X,B,Q,te)=>{const g=M.component=Zm(M,X,B);if(Ih(M)&&(g.ctx.renderer=Re),Jm(g,!1,te),g.asyncDep){if(B&&B.registerDep(g,V,te),!M.el){const _=g.subTree=Mt(Fs);d(null,_,U,F),M.placeholder=_.el}}else V(g,M,U,F,B,Q,te)},k=(M,U,F)=>{const X=U.component=M.component;if(Dm(M,U,F))if(X.asyncDep&&!X.asyncResolved){q(X,U,F);return}else X.next=U,X.update();else U.el=M.el,X.vnode=U},V=(M,U,F,X,B,Q,te)=>{const g=()=>{if(M.isMounted){let{next:O,bu:G,u:ae,parent:re,vnode:he}=M;{const P=Zh(M);if(P){O&&(O.el=he.el,q(M,O,te)),P.asyncDep.then(()=>{Zt(()=>{M.isUnmounted||R()},B)});return}}let Me=O,Ae;Ci(M,!1),O?(O.el=he.el,q(M,O,te)):O=he,G&&xo(G),(Ae=O.props&&O.props.onVnodeBeforeUpdate)&&Pn(Ae,re,O,he),Ci(M,!0);const ne=Cc(M),Oe=M.subTree;M.subTree=ne,x(Oe,ne,f(Oe.el),we(Oe),M,B,Q),O.el=ne.el,Me===null&&Um(M,ne.el),ae&&Zt(ae,B),(Ae=O.props&&O.props.onVnodeUpdated)&&Zt(()=>Pn(Ae,re,O,he),B)}else{let O;const{el:G,props:ae}=U,{bm:re,m:he,parent:Me,root:Ae,type:ne}=M,Oe=pr(U);Ci(M,!1),re&&xo(re),!Oe&&(O=ae&&ae.onVnodeBeforeMount)&&Pn(O,Me,U),Ci(M,!0);{Ae.ce&&Ae.ce._hasShadowRoot()&&Ae.ce._injectChildStyle(ne,M.parent?M.parent.type:void 0);const P=M.subTree=Cc(M);x(null,P,F,X,M,B,Q),U.el=P.el}if(he&&Zt(he,B),!Oe&&(O=ae&&ae.onVnodeMounted)){const P=U;Zt(()=>Pn(O,Me,P),B)}(U.shapeFlag&256||Me&&pr(Me.vnode)&&Me.vnode.shapeFlag&256)&&M.a&&Zt(M.a,B),M.isMounted=!0,U=F=X=null}};M.scope.on();const _=M.effect=new ch(g);M.scope.off();const R=M.update=_.run.bind(_),j=M.job=_.runIfDirty.bind(_);j.i=M,j.id=M.uid,_.scheduler=()=>Vl(j),Ci(M,!0),R()},q=(M,U,F)=>{U.component=M;const X=M.vnode.props;M.vnode=U,M.next=null,Nm(M,U.props,X,F),zm(M,U.children,F),ni(),yc(M),ii()},$=(M,U,F,X,B,Q,te,g,_=!1)=>{const R=M&&M.children,j=M?M.shapeFlag:0,O=U.children,{patchFlag:G,shapeFlag:ae}=U;if(G>0){if(G&128){se(R,O,F,X,B,Q,te,g,_);return}else if(G&256){ie(R,O,F,X,B,Q,te,g,_);return}}ae&8?(j&16&&Te(R,B,Q),O!==R&&u(F,O)):j&16?ae&16?se(R,O,F,X,B,Q,te,g,_):Te(R,B,Q,!0):(j&8&&u(F,""),ae&16&&H(O,F,X,B,Q,te,g,_))},ie=(M,U,F,X,B,Q,te,g,_)=>{M=M||Rs,U=U||Rs;const R=M.length,j=U.length,O=Math.min(R,j);let G;for(G=0;G<O;G++){const ae=U[G]=_?qn(U[G]):Un(U[G]);x(M[G],ae,F,null,B,Q,te,g,_)}R>j?Te(M,B,Q,!0,!1,O):H(U,F,X,B,Q,te,g,_,O)},se=(M,U,F,X,B,Q,te,g,_)=>{let R=0;const j=U.length;let O=M.length-1,G=j-1;for(;R<=O&&R<=G;){const ae=M[R],re=U[R]=_?qn(U[R]):Un(U[R]);if(Ks(ae,re))x(ae,re,F,null,B,Q,te,g,_);else break;R++}for(;R<=O&&R<=G;){const ae=M[O],re=U[G]=_?qn(U[G]):Un(U[G]);if(Ks(ae,re))x(ae,re,F,null,B,Q,te,g,_);else break;O--,G--}if(R>O){if(R<=G){const ae=G+1,re=ae<j?U[ae].el:X;for(;R<=G;)x(null,U[R]=_?qn(U[R]):Un(U[R]),F,re,B,Q,te,g,_),R++}}else if(R>G)for(;R<=O;)ue(M[R],B,Q,!0),R++;else{const ae=R,re=R,he=new Map;for(R=re;R<=G;R++){const le=U[R]=_?qn(U[R]):Un(U[R]);le.key!=null&&he.set(le.key,R)}let Me,Ae=0;const ne=G-re+1;let Oe=!1,P=0;const oe=new Array(ne);for(R=0;R<ne;R++)oe[R]=0;for(R=ae;R<=O;R++){const le=M[R];if(Ae>=ne){ue(le,B,Q,!0);continue}let ye;if(le.key!=null)ye=he.get(le.key);else for(Me=re;Me<=G;Me++)if(oe[Me-re]===0&&Ks(le,U[Me])){ye=Me;break}ye===void 0?ue(le,B,Q,!0):(oe[ye-re]=R+1,ye>=P?P=ye:Oe=!0,x(le,U[ye],F,null,B,Q,te,g,_),Ae++)}const me=Oe?Vm(oe):Rs;for(Me=me.length-1,R=ne-1;R>=0;R--){const le=re+R,ye=U[le],ke=U[le+1],Ke=le+1<j?ke.el||Jh(ke):X;oe[R]===0?x(null,ye,F,Ke,B,Q,te,g,_):Oe&&(Me<0||R!==me[Me]?fe(ye,F,Ke,2):Me--)}}},fe=(M,U,F,X,B=null)=>{const{el:Q,type:te,transition:g,children:_,shapeFlag:R}=M;if(R&6){fe(M.component.subTree,U,F,X);return}if(R&128){M.suspense.move(U,F,X);return}if(R&64){te.move(M,U,F,Re);return}if(te===fn){i(Q,U,F);for(let O=0;O<_.length;O++)fe(_[O],U,F,X);i(M.anchor,U,F);return}if(te===Sa){S(M,U,F);return}if(X!==2&&R&1&&g)if(X===0)g.persisted&&!Q[va]?i(Q,U,F):(g.beforeEnter(Q),i(Q,U,F),Zt(()=>g.enter(Q),B));else{const{leave:O,delayLeave:G,afterLeave:ae}=g,re=()=>{M.ctx.isUnmounted?s(Q):i(Q,U,F)},he=()=>{const Me=Q._isLeaving||!!Q[va];Q._isLeaving&&Q[va](!0),g.persisted&&!Me?re():O(Q,()=>{re(),ae&&ae()})};G?G(Q,re,he):he()}else i(Q,U,F)},ue=(M,U,F,X=!1,B=!1)=>{const{type:Q,props:te,ref:g,children:_,dynamicChildren:R,shapeFlag:j,patchFlag:O,dirs:G,cacheIndex:ae,memo:re}=M;if(O===-2&&(B=!1),g!=null&&(ni(),dr(g,null,F,M,!0),ii()),ae!=null&&(U.renderCache[ae]=void 0),j&256){U.ctx.deactivate(M);return}const he=j&1&&G,Me=!pr(M);let Ae;if(Me&&(Ae=te&&te.onVnodeBeforeUnmount)&&Pn(Ae,U,M),j&6)Se(M.component,F,X);else{if(j&128){M.suspense.unmount(F,X);return}he&&Ri(M,null,U,"beforeUnmount"),j&64?M.type.remove(M,U,F,Re,X):R&&!R.hasOnce&&(Q!==fn||O>0&&O&64)?Te(R,U,F,!1,!0):(Q===fn&&O&384||!B&&j&16)&&Te(_,U,F),X&&J(M)}const ne=re!=null&&ae==null;(Me&&(Ae=te&&te.onVnodeUnmounted)||he||ne)&&Zt(()=>{Ae&&Pn(Ae,U,M),he&&Ri(M,null,U,"unmounted"),ne&&(M.el=null)},F)},J=M=>{const{type:U,el:F,anchor:X,transition:B}=M;if(U===fn){ce(F,X);return}if(U===Sa){E(M);return}const Q=()=>{s(F),B&&!B.persisted&&B.afterLeave&&B.afterLeave()};if(M.shapeFlag&1&&B&&!B.persisted){const{leave:te,delayLeave:g}=B,_=()=>te(F,Q);g?g(M.el,Q,_):_()}else Q()},ce=(M,U)=>{let F;for(;M!==U;)F=h(M),s(M),M=F;s(U)},Se=(M,U,F)=>{const{bum:X,scope:B,job:Q,subTree:te,um:g,m:_,a:R}=M;Dc(_),Dc(R),X&&xo(X),B.stop(),Q&&(Q.flags|=8,ue(te,M,U,F)),g&&Zt(g,U),Zt(()=>{M.isUnmounted=!0},U)},Te=(M,U,F,X=!1,B=!1,Q=0)=>{for(let te=Q;te<M.length;te++)ue(M[te],U,F,X,B)},we=M=>{if(M.shapeFlag&6)return we(M.component.subTree);if(M.shapeFlag&128)return M.suspense.next();const U=h(M.anchor||M.el),F=U&&U[rm];return F?h(F):U};let De=!1;const Ie=(M,U,F)=>{let X;M==null?U._vnode&&(ue(U._vnode,null,null,!0),X=U._vnode.component):x(U._vnode||null,M,U,null,null,null,F),U._vnode=M,De||(De=!0,yc(X),Ah(),De=!1)},Re={p:x,um:ue,m:fe,r:J,mt:N,mc:H,pc:$,pbc:w,n:we,o:n};return{render:Ie,hydrate:void 0,createApp:wm(Ie)}}function Ma({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ci({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function km(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function $h(n,e,t=!1){const i=n.children,s=e.children;if(Fe(i)&&Fe(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=qn(s[r]),o.el=a.el),!t&&o.patchFlag!==-2&&$h(a,o)),o.type===Qo&&(o.patchFlag===-1&&(o=s[r]=qn(o)),o.el=a.el),o.type===Fs&&!o.el&&(o.el=a.el)}}function Vm(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function Zh(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Zh(e)}function Dc(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Jh(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Jh(e.subTree):null}const Qh=n=>n.__isSuspense;function Wm(n,e){e&&e.pendingBranch?Fe(n)?e.effects.push(...n):e.effects.push(n):Jp(n)}const fn=Symbol.for("v-fgt"),Qo=Symbol.for("v-txt"),Fs=Symbol.for("v-cmt"),Sa=Symbol.for("v-stc"),ki=[];let rn=null;function Bt(n=!1){ki.push(rn=n?null:[])}function ed(){ki.pop(),rn=ki[ki.length-1]||null}let yr=1;function Uc(n,e=!1){yr+=n,n<0&&rn&&e&&(rn.hasOnce=!0)}function Xm(n){return n.dynamicChildren=yr>0?rn||Rs:null,ed(),yr>0&&rn&&rn.push(n),n}function zt(n,e,t,i,s,r){return Xm(pe(n,e,t,i,s,r,!0))}function td(n){return n?n.__v_isVNode===!0:!1}function Ks(n,e){return n.type===e.type&&n.key===e.key}const nd=({key:n})=>n??null,Mo=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?gt(n)||_t(n)||We(n)?{i:mn,r:n,k:e,f:!!t}:n:null);function pe(n,e=null,t=null,i=0,s=null,r=n===fn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&nd(e),ref:e&&Mo(e),scopeId:Ch,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:mn};return o?(Co(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=gt(t)?8:16),yr>0&&!a&&rn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&rn.push(l),l}const Mt=jm;function jm(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===_m)&&(n=Fs),td(n)){const o=Os(n,e,!0);return t&&Co(o,t),yr>0&&!r&&rn&&(o.shapeFlag&6?rn[rn.indexOf(n)]=o:rn.push(o)),o.patchFlag=-2,o}if(n0(n)&&(n=n.__vccOpts),e){e=qm(e);let{class:o,style:l}=e;o&&!gt(o)&&(e.class=Ps(o)),ot(l)&&(qo(l)&&!Fe(l)&&(l=Gt({},l)),e.style=qi(l))}const a=gt(n)?1:Qh(n)?128:om(n)?64:ot(n)?4:We(n)?2:0;return pe(n,e,t,i,s,a,r,!0)}function qm(n){return n?qo(n)||Wh(n)?Gt({},n):n:null}function Os(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:a,children:o,transition:l}=n,c=e?Ym(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&nd(c),ref:e&&e.ref?t&&r?Fe(r)?r.concat(Mo(e)):[r,Mo(e)]:Mo(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==fn?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Os(n.ssContent),ssFallback:n.ssFallback&&Os(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Wl(u,l.clone(u)),u}function gi(n=" ",e=0){return Mt(Qo,null,n,e)}function Un(n){return n==null||typeof n=="boolean"?Mt(Fs):Fe(n)?Mt(fn,null,n.slice()):td(n)?qn(n):Mt(Qo,null,String(n))}function qn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Os(n)}function Co(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Fe(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Co(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!Wh(e)?e._ctx=mn:s===3&&mn&&(mn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(We(e)){if(i&65){Co(n,{default:e});return}e={default:e,_ctx:mn},t=32}else e=String(e),i&64?(t=16,e=[gi(e)]):t=8;n.children=e,n.shapeFlag|=t}function Ym(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Ps([e.class,i.class]));else if(s==="style")e.style=qi([e.style,i.style]);else if(Ho(s)){const r=e[s],a=i[s];a&&r!==a&&!(Fe(r)&&r.includes(a))?e[s]=r?[].concat(r,a):a:a==null&&r==null&&!Go(s)&&(e[s]=a)}else s!==""&&(e[s]=i[s])}return e}function Pn(n,e,t,i=null){Rn(n,e,7,[t,i])}const Km=zh();let $m=0;function Zm(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||Km,r={uid:$m++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new oh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:jh(i,s),emitsOptions:Hh(i,s),emit:null,emitted:null,propsDefaults:lt,inheritAttrs:i.inheritAttrs,ctx:lt,data:lt,props:lt,attrs:lt,slots:lt,refs:lt,setupState:lt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Rm.bind(null,r),n.ce&&n.ce(r),r}let $t=null;const id=()=>$t||mn;let Po,gl;{const n=Wo(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};Po=e("__VUE_INSTANCE_SETTERS__",t=>$t=t),gl=e("__VUE_SSR_SETTERS__",t=>br=t)}const Pr=n=>{const e=$t;return Po(n),n.scope.on(),()=>{n.scope.off(),Po(e)}},Ic=()=>{$t&&$t.scope.off(),Po(null)};function sd(n){return n.vnode.shapeFlag&4}let br=!1;function Jm(n,e=!1,t=!1){e&&gl(e);const{props:i,children:s}=n.vnode,r=sd(n);Im(n,i,r,e),Bm(n,s,t||e);const a=r?Qm(n,e):void 0;return e&&gl(!1),a}function Qm(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,xm);const{setup:i}=t;if(i){ni();const s=n.setupContext=i.length>1?t0(n):null,r=Pr(n),a=Cr(i,n,0,[n.props,s]),o=Jf(a);if(ii(),r(),(o||n.sp)&&!pr(n)&&Uh(n),o){if(a.then(Ic,Ic),e)return a.then(l=>{Nc(n,l)}).catch(l=>{Ko(l,n,0)});n.asyncDep=a}else Nc(n,a)}else rd(n)}function Nc(n,e,t){We(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:ot(e)&&(n.setupState=bh(e)),rd(n)}function rd(n,e,t){const i=n.type;n.render||(n.render=i.render||Fn);{const s=Pr(n);ni();try{Mm(n)}finally{ii(),s()}}}const e0={get(n,e){return Ft(n,"get",""),n[e]}};function t0(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,e0),slots:n.slots,emit:n.emit,expose:e}}function ea(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(bh(Yo(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in mr)return mr[t](n)},has(e,t){return t in e||t in mr}})):n.proxy}function n0(n){return We(n)&&"__vccOpts"in n}const nn=(n,e)=>qp(n,e,br),i0="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _l;const Fc=typeof window<"u"&&window.trustedTypes;if(Fc)try{_l=Fc.createPolicy("vue",{createHTML:n=>n})}catch{}const od=_l?n=>_l.createHTML(n):n=>n,s0="http://www.w3.org/2000/svg",r0="http://www.w3.org/1998/Math/MathML",jn=typeof document<"u"?document:null,Oc=jn&&jn.createElement("template"),o0={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?jn.createElementNS(s0,n):e==="mathml"?jn.createElementNS(r0,n):t?jn.createElement(n,{is:t}):jn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>jn.createTextNode(n),createComment:n=>jn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>jn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Oc.innerHTML=od(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Oc.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},a0=Symbol("_vtc");function l0(n,e,t){const i=n[a0];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Bc=Symbol("_vod"),c0=Symbol("_vsh"),u0=Symbol(""),f0=/(?:^|;)\s*display\s*:/;function h0(n,e,t){const i=n.style,s=gt(t);let r=!1;if(t&&!s){if(e)if(gt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&ar(i,o,"")}else for(const a in e)t[a]==null&&ar(i,a,"");for(const a in t){a==="display"&&(r=!0);const o=t[a];o!=null?p0(n,a,!gt(e)&&e?e[a]:void 0,o)||ar(i,a,o):ar(i,a,"")}}else if(s){if(e!==t){const a=i[u0];a&&(t+=";"+a),i.cssText=t,r=f0.test(t)}}else e&&n.removeAttribute("style");Bc in n&&(n[Bc]=r?i.display:"",n[c0]&&(i.display="none"))}const zc=/\s*!important$/;function ar(n,e,t){if(Fe(t))t.forEach(i=>ar(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=d0(n,e);zc.test(t)?n.setProperty(ji(i),t.replace(zc,""),"important"):n[i]=t}}const Hc=["Webkit","Moz","ms"],ya={};function d0(n,e){const t=ya[e];if(t)return t;let i=En(e);if(i!=="filter"&&i in n)return ya[e]=i;i=th(i);for(let s=0;s<Hc.length;s++){const r=Hc[s]+i;if(r in n)return ya[e]=r}return e}function p0(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&gt(i)&&t===i}const Gc="http://www.w3.org/1999/xlink";function kc(n,e,t,i,s,r=vp(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Gc,e.slice(6,e.length)):n.setAttributeNS(Gc,e,t):t==null||r&&!ih(t)?n.removeAttribute(e):n.setAttribute(e,r?"":_n(t)?String(t):t)}function Vc(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?od(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=ih(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function bs(n,e,t,i){n.addEventListener(e,t,i)}function m0(n,e,t,i){n.removeEventListener(e,t,i)}const Wc=Symbol("_vei");function g0(n,e,t,i,s=null){const r=n[Wc]||(n[Wc]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=x0(e);if(i){const c=r[e]=y0(i,s);bs(n,o,c,l)}else a&&(m0(n,o,a,l),r[e]=void 0)}}const _0=/(Once|Passive|Capture)$/,v0=/^on:?(?:Once|Passive|Capture)$/;function x0(n){let e,t;for(;(t=n.match(_0))&&!v0.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):ji(n.slice(2)),e]}let ba=0;const M0=Promise.resolve(),S0=()=>ba||(M0.then(()=>ba=0),ba=Date.now());function y0(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;const s=t.value;if(Fe(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const a=s.slice(),o=[i];for(let l=0;l<a.length&&!i._stopped;l++){const c=a[l];c&&Rn(c,e,5,o)}}else Rn(s,e,5,[i])};return t.value=n,t.attached=S0(),t}const Xc=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,b0=(n,e,t,i,s,r)=>{const a=s==="svg";e==="class"?l0(n,i,a):e==="style"?h0(n,t,i):Ho(e)?Go(e)||g0(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):E0(n,e,i,a))?(Vc(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&kc(n,e,i,a,r,e!=="value")):n._isVueCE&&(T0(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!gt(i)))?Vc(n,En(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),kc(n,e,i,a))};function E0(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Xc(e)&&We(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Xc(e)&&gt(t)?!1:e in n}function T0(n,e){const t=n._def.props;if(!t)return!1;const i=En(e);return Array.isArray(t)?t.some(s=>En(s)===i):Object.keys(t).some(s=>En(s)===i)}const jc=n=>{const e=n.props["onUpdate:modelValue"]||!1;return Fe(e)?t=>xo(e,t):e};function w0(n){n.target.composing=!0}function qc(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Ea=Symbol("_assign");function Yc(n,e,t){return e&&(n=n.trim()),t&&(n=Nl(n)),n}const ad={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[Ea]=jc(s);const r=i||s.props&&s.props.type==="number";bs(n,e?"change":"input",a=>{a.target.composing||n[Ea](Yc(n.value,t,r))}),(t||r)&&bs(n,"change",()=>{n.value=Yc(n.value,t,r)}),e||(bs(n,"compositionstart",w0),bs(n,"compositionend",qc),bs(n,"change",qc))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},a){if(n[Ea]=jc(a),n.composing)return;const o=(r||n.type==="number")&&!/^0\d/.test(n.value)?Nl(n.value):n.value,l=e??"";if(o===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l)}},A0=["ctrl","shift","alt","meta"],R0={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>A0.some(t=>n[`${t}Key`]&&!e.includes(t))},C0=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=(s,...r)=>{for(let a=0;a<e.length;a++){const o=R0[e[a]];if(o&&o(s,e))return}return n(s,...r)})},P0=Gt({patchProp:b0},o0);let Kc;function L0(){return Kc||(Kc=Hm(P0))}const D0=(...n)=>{const e=L0().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=I0(i);if(!s)return;const r=e._component;!We(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,U0(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function U0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function I0(n){return gt(n)?document.querySelector(n):n}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let ld;const ta=n=>ld=n,cd=Symbol();function vl(n){return n&&typeof n=="object"&&Object.prototype.toString.call(n)==="[object Object]"&&typeof n.toJSON!="function"}var gr;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(gr||(gr={}));function N0(){const n=ah(!0),e=n.run(()=>tt({}));let t=[],i=[];const s=Yo({install(r){ta(s),s._a=r,r.provide(cd,s),r.config.globalProperties.$pinia=s,i.forEach(a=>t.push(a)),i=[]},use(r){return this._a?t.push(r):i.push(r),this},_p:t,_a:null,_e:n,_s:new Map,state:e});return s}const ud=()=>{};function $c(n,e,t,i=ud){n.push(e);const s=()=>{const r=n.indexOf(e);r>-1&&(n.splice(r,1),i())};return!t&&lh()&&Mp(s),s}function Ji(n,...e){n.slice().forEach(t=>{t(...e)})}const F0=n=>n(),Zc=Symbol(),Ta=Symbol();function xl(n,e){n instanceof Map&&e instanceof Map?e.forEach((t,i)=>n.set(i,t)):n instanceof Set&&e instanceof Set&&e.forEach(n.add,n);for(const t in e){if(!e.hasOwnProperty(t))continue;const i=e[t],s=n[t];vl(s)&&vl(i)&&n.hasOwnProperty(t)&&!_t(i)&&!Qn(i)?n[t]=xl(s,i):n[t]=i}return n}const O0=Symbol();function B0(n){return!vl(n)||!n.hasOwnProperty(O0)}const{assign:pi}=Object;function z0(n){return!!(_t(n)&&n.effect)}function H0(n,e,t,i){const{state:s,actions:r,getters:a}=e,o=t.state.value[n];let l;function c(){o||(t.state.value[n]=s?s():{});const u=Vp(t.state.value[n]);return pi(u,r,Object.keys(a||{}).reduce((f,h)=>(f[h]=Yo(nn(()=>{ta(t);const p=t._s.get(n);return a[h].call(p,p)})),f),{}))}return l=fd(n,c,e,t,i,!0),l}function fd(n,e,t={},i,s,r){let a;const o=pi({actions:{}},t),l={deep:!0};let c,u,f=[],h=[],p;const v=i.state.value[n];!r&&!v&&(i.state.value[n]={});let x;function m(H){let b;c=u=!1,typeof H=="function"?(H(i.state.value[n]),b={type:gr.patchFunction,storeId:n,events:p}):(xl(i.state.value[n],H),b={type:gr.patchObject,payload:H,storeId:n,events:p});const w=x=Symbol();Th().then(()=>{x===w&&(c=!0)}),u=!0,Ji(f,b,i.state.value[n])}const d=r?function(){const{state:b}=t,w=b?b():{};this.$patch(W=>{pi(W,w)})}:ud;function y(){a.stop(),f=[],h=[],i._s.delete(n)}const S=(H,b="")=>{if(Zc in H)return H[Ta]=b,H;const w=function(){ta(i);const W=Array.from(arguments),ee=[],de=[];function N(q){ee.push(q)}function k(q){de.push(q)}Ji(h,{args:W,name:w[Ta],store:D,after:N,onError:k});let V;try{V=H.apply(this&&this.$id===n?this:D,W)}catch(q){throw Ji(de,q),q}return V instanceof Promise?V.then(q=>(Ji(ee,q),q)).catch(q=>(Ji(de,q),Promise.reject(q))):(Ji(ee,V),V)};return w[Zc]=!0,w[Ta]=b,w},E={_p:i,$id:n,$onAction:$c.bind(null,h),$patch:m,$reset:d,$subscribe(H,b={}){const w=$c(f,H,b.detached,()=>W()),W=a.run(()=>hr(()=>i.state.value[n],ee=>{(b.flush==="sync"?u:c)&&H({storeId:n,type:gr.direct,events:p},ee)},pi({},l,b)));return w},$dispose:y},D=jo(E);i._s.set(n,D);const A=(i._a&&i._a.runWithContext||F0)(()=>i._e.run(()=>(a=ah()).run(()=>e({action:S}))));for(const H in A){const b=A[H];if(_t(b)&&!z0(b)||Qn(b))r||(v&&B0(b)&&(_t(b)?b.value=v[H]:xl(b,v[H])),i.state.value[n][H]=b);else if(typeof b=="function"){const w=S(b,H);A[H]=w,o.actions[H]=b}}return pi(D,A),pi(Qe(D),A),Object.defineProperty(D,"$state",{get:()=>i.state.value[n],set:H=>{m(b=>{pi(b,H)})}}),i._p.forEach(H=>{pi(D,a.run(()=>H({store:D,app:i._a,pinia:i,options:o})))}),v&&r&&t.hydrate&&t.hydrate(D.$state,v),c=!0,u=!0,D}/*! #__NO_SIDE_EFFECTS__ */function G0(n,e,t){let i,s;const r=typeof e=="function";i=n,s=r?t:e;function a(o,l){const c=tm();return o=o||(c?fr(cd,null):null),o&&ta(o),o=ld,o._s.has(i)||(r?fd(i,e,s,o):H0(i,s,o)),o._s.get(i)}return a.$id=i,a}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yl="160",Yn={ROTATE:0,DOLLY:1,PAN:2},Qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},k0=0,Jc=1,V0=2,hd=1,W0=2,Xn=3,bi=0,Ht=1,Sn=2,ei=0,Ds=1,an=2,Qc=3,eu=4,X0=5,Oi=100,j0=101,q0=102,tu=103,nu=104,Y0=200,K0=201,$0=202,Z0=203,Ml=204,Sl=205,J0=206,Q0=207,eg=208,tg=209,ng=210,ig=211,sg=212,rg=213,og=214,ag=0,lg=1,cg=2,Lo=3,ug=4,fg=5,hg=6,dg=7,Kl=0,pg=1,mg=2,Mi=0,dd=1,pd=2,md=3,$l=4,gg=5,gd=6,_d=300,Bs=301,zs=302,yl=303,bl=304,na=306,El=1e3,yn=1001,Tl=1002,qt=1003,iu=1004,wa=1005,hn=1006,_g=1007,Er=1008,Si=1009,vg=1010,xg=1011,Zl=1012,vd=1013,vi=1014,xi=1015,ti=1016,xd=1017,Md=1018,Vi=1020,Mg=1021,bn=1023,Sg=1024,yg=1025,Wi=1026,Hs=1027,bg=1028,Sd=1029,Eg=1030,yd=1031,bd=1033,Aa=33776,Ra=33777,Ca=33778,Pa=33779,su=35840,ru=35841,ou=35842,au=35843,Ed=36196,lu=37492,cu=37496,uu=37808,fu=37809,hu=37810,du=37811,pu=37812,mu=37813,gu=37814,_u=37815,vu=37816,xu=37817,Mu=37818,Su=37819,yu=37820,bu=37821,La=36492,Eu=36494,Tu=36495,Tg=36283,wu=36284,Au=36285,Ru=36286,Td=3e3,Xi=3001,wg=3200,Ag=3201,wd=0,Rg=1,pn="",bt="srgb",ri="srgb-linear",Jl="display-p3",ia="display-p3-linear",Do="linear",ut="srgb",Uo="rec709",Io="p3",es=7680,Cu=519,Cg=512,Pg=513,Lg=514,Ad=515,Dg=516,Ug=517,Ig=518,Ng=519,wl=35044,Fg=35048,Pu="300 es",Al=1035,Jn=2e3,No=2001;class Yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],So=Math.PI/180,Rl=180/Math.PI;function yi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function Kt(n,e,t){return Math.max(e,Math.min(t,n))}function Og(n,e){return(n%e+e)%e}function Da(n,e,t){return(1-t)*n+t*e}function Lu(n){return(n&n-1)===0&&n!==0}function Cl(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function at(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Bg={DEG2RAD:So};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Kt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,i,s,r,a,o,l,c){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],v=i[8],x=s[0],m=s[3],d=s[6],y=s[1],S=s[4],E=s[7],D=s[2],C=s[5],A=s[8];return r[0]=a*x+o*y+l*D,r[3]=a*m+o*S+l*C,r[6]=a*d+o*E+l*A,r[1]=c*x+u*y+f*D,r[4]=c*m+u*S+f*C,r[7]=c*d+u*E+f*A,r[2]=h*x+p*y+v*D,r[5]=h*m+p*S+v*C,r[8]=h*d+p*E+v*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*r,p=c*r-a*l,v=t*f+i*h+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=f*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=h*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ua.makeScale(e,t)),this}rotate(e){return this.premultiply(Ua.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ua.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ua=new Ze;function Rd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Fo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zg(){const n=Fo("canvas");return n.style.display="block",n}const Du={};function _r(n){n in Du||(Du[n]=!0,console.warn(n))}const Uu=new Ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Iu=new Ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Br={[ri]:{transfer:Do,primaries:Uo,toReference:n=>n,fromReference:n=>n},[bt]:{transfer:ut,primaries:Uo,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ia]:{transfer:Do,primaries:Io,toReference:n=>n.applyMatrix3(Iu),fromReference:n=>n.applyMatrix3(Uu)},[Jl]:{transfer:ut,primaries:Io,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Iu),fromReference:n=>n.applyMatrix3(Uu).convertLinearToSRGB()}},Hg=new Set([ri,ia]),st={enabled:!0,_workingColorSpace:ri,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Hg.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Br[e].toReference,s=Br[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Br[n].primaries},getTransfer:function(n){return n===pn?Do:Br[n].transfer}};function Us(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ia(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ts;class Cd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ts===void 0&&(ts=Fo("canvas")),ts.width=e.width,ts.height=e.height;const i=ts.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ts}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Us(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Us(t[i]/255)*255):t[i]=Us(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gg=0;class Pd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=yi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Na(s[a].image)):r.push(Na(s[a]))}else r=Na(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Na(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Cd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let kg=0;class Jt extends Yi{constructor(e=Jt.DEFAULT_IMAGE,t=Jt.DEFAULT_MAPPING,i=yn,s=yn,r=hn,a=Er,o=bn,l=Si,c=Jt.DEFAULT_ANISOTROPY,u=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=yi(),this.name="",this.source=new Pd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(_r("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Xi?bt:pn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_d)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case El:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Tl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case El:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Tl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return _r("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===bt?Xi:Td}set encoding(e){_r("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Xi?bt:pn}}Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=_d;Jt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,i=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],v=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,E=(p+1)/2,D=(d+1)/2,C=(u+h)/4,A=(f+x)/4,H=(v+m)/4;return S>E&&S>D?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=C/i,r=A/i):E>D?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=C/s,r=H/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=A/r,s=H/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-v)*(m-v)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-v)/y,this.y=(f-x)/y,this.z=(h-u)/y,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vg extends Yi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(_r("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Xi?bt:pn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Jt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Pd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends Vg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ld extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wg extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ei{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const h=r[a+0],p=r[a+1],v=r[a+2],x=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=h,e[t+1]=p,e[t+2]=v,e[t+3]=x;return}if(f!==x||l!==h||c!==p||u!==v){let m=1-o;const d=l*h+c*p+u*v+f*x,y=d>=0?1:-1,S=1-d*d;if(S>Number.EPSILON){const D=Math.sqrt(S),C=Math.atan2(D,d*y);m=Math.sin(m*C)/D,o=Math.sin(o*C)/D}const E=o*y;if(l=l*m+h*E,c=c*m+p*E,u=u*m+v*E,f=f*m+x*E,m===1-o){const D=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=D,c*=D,u*=D,f*=D}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],h=r[a+1],p=r[a+2],v=r[a+3];return e[t]=o*v+u*f+l*p-c*h,e[t+1]=l*v+u*h+c*f-o*p,e[t+2]=c*v+u*p+o*h-l*f,e[t+3]=u*v-o*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),h=l(i/2),p=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"YXZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"ZXY":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"ZYX":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"YZX":this._x=h*u*f+c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f-h*p*v;break;case"XZY":this._x=h*u*f-c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f+h*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Kt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*f+this._w*h,this._x=i*f+this._x*h,this._y=s*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Fa.copy(this).projectOnVector(e),this.sub(Fa)}reflect(e){return this.sub(Fa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Kt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fa=new L,Nu=new Ei;class Ki{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,vn):vn.fromBufferAttribute(r,a),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),zr.copy(i.boundingBox)),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($s),Hr.subVectors(this.max,$s),ns.subVectors(e.a,$s),is.subVectors(e.b,$s),ss.subVectors(e.c,$s),ai.subVectors(is,ns),li.subVectors(ss,is),Pi.subVectors(ns,ss);let t=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Pi.z,Pi.y,ai.z,0,-ai.x,li.z,0,-li.x,Pi.z,0,-Pi.x,-ai.y,ai.x,0,-li.y,li.x,0,-Pi.y,Pi.x,0];return!Oa(t,ns,is,ss,Hr)||(t=[1,0,0,0,1,0,0,0,1],!Oa(t,ns,is,ss,Hr))?!1:(Gr.crossVectors(ai,li),t=[Gr.x,Gr.y,Gr.z],Oa(t,ns,is,ss,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Hn=[new L,new L,new L,new L,new L,new L,new L,new L],vn=new L,zr=new Ki,ns=new L,is=new L,ss=new L,ai=new L,li=new L,Pi=new L,$s=new L,Hr=new L,Gr=new L,Li=new L;function Oa(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Li.fromArray(n,r);const o=s.x*Math.abs(Li.x)+s.y*Math.abs(Li.y)+s.z*Math.abs(Li.z),l=e.dot(Li),c=t.dot(Li),u=i.dot(Li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Xg=new Ki,Zs=new L,Ba=new L;class $i{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Xg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zs.subVectors(e,this.center);const t=Zs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Zs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ba.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zs.copy(e.center).add(Ba)),this.expandByPoint(Zs.copy(e.center).sub(Ba))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new L,za=new L,kr=new L,ci=new L,Ha=new L,Vr=new L,Ga=new L;class Lr{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){za.copy(e).add(t).multiplyScalar(.5),kr.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(za);const r=e.distanceTo(t)*.5,a=-this.direction.dot(kr),o=ci.dot(this.direction),l=-ci.dot(kr),c=ci.lengthSq(),u=Math.abs(1-a*a);let f,h,p,v;if(u>0)if(f=a*l-o,h=a*o-l,v=r*u,f>=0)if(h>=-v)if(h<=v){const x=1/u;f*=x,h*=x,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-v?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=v?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(za).addScaledVector(kr,h),p}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);const i=Gn.dot(this.direction),s=Gn.dot(Gn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,i,s,r){Ha.subVectors(t,e),Vr.subVectors(i,e),Ga.crossVectors(Ha,Vr);let a=this.direction.dot(Ga),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ci.subVectors(this.origin,e);const l=o*this.direction.dot(Vr.crossVectors(ci,Vr));if(l<0)return null;const c=o*this.direction.dot(Ha.cross(ci));if(c<0||l+c>a)return null;const u=-o*ci.dot(Ga);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class it{constructor(e,t,i,s,r,a,o,l,c,u,f,h,p,v,x,m){it.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,f,h,p,v,x,m)}set(e,t,i,s,r,a,o,l,c,u,f,h,p,v,x,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=v,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/rs.setFromMatrixColumn(e,0).length(),r=1/rs.setFromMatrixColumn(e,1).length(),a=1/rs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,p=a*f,v=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+v*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,v=c*u,x=c*f;t[0]=h+x*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,v=c*u,x=c*f;t[0]=h-x*o,t[4]=-a*f,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*f,v=o*u,x=o*f;t[0]=l*u,t[4]=v*c-p,t[8]=h*c+x,t[1]=l*f,t[5]=x*c+h,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,v=o*l,x=o*c;t[0]=l*u,t[4]=x-h*f,t[8]=v*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+v,t[10]=h-x*f}else if(e.order==="XZY"){const h=a*l,p=a*c,v=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+x,t[5]=a*u,t[9]=p*f-v,t[2]=v*f-p,t[6]=o*u,t[10]=x*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jg,e,qg)}lookAt(e,t,i){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),ui.crossVectors(i,en),ui.lengthSq()===0&&(Math.abs(i.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ui.crossVectors(i,en)),ui.normalize(),Wr.crossVectors(en,ui),s[0]=ui.x,s[4]=Wr.x,s[8]=en.x,s[1]=ui.y,s[5]=Wr.y,s[9]=en.y,s[2]=ui.z,s[6]=Wr.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],v=i[2],x=i[6],m=i[10],d=i[14],y=i[3],S=i[7],E=i[11],D=i[15],C=s[0],A=s[4],H=s[8],b=s[12],w=s[1],W=s[5],ee=s[9],de=s[13],N=s[2],k=s[6],V=s[10],q=s[14],$=s[3],ie=s[7],se=s[11],fe=s[15];return r[0]=a*C+o*w+l*N+c*$,r[4]=a*A+o*W+l*k+c*ie,r[8]=a*H+o*ee+l*V+c*se,r[12]=a*b+o*de+l*q+c*fe,r[1]=u*C+f*w+h*N+p*$,r[5]=u*A+f*W+h*k+p*ie,r[9]=u*H+f*ee+h*V+p*se,r[13]=u*b+f*de+h*q+p*fe,r[2]=v*C+x*w+m*N+d*$,r[6]=v*A+x*W+m*k+d*ie,r[10]=v*H+x*ee+m*V+d*se,r[14]=v*b+x*de+m*q+d*fe,r[3]=y*C+S*w+E*N+D*$,r[7]=y*A+S*W+E*k+D*ie,r[11]=y*H+S*ee+E*V+D*se,r[15]=y*b+S*de+E*q+D*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],v=e[3],x=e[7],m=e[11],d=e[15];return v*(+r*l*f-s*c*f-r*o*h+i*c*h+s*o*p-i*l*p)+x*(+t*l*p-t*c*h+r*a*h-s*a*p+s*c*u-r*l*u)+m*(+t*c*f-t*o*p-r*a*f+i*a*p+r*o*u-i*c*u)+d*(-s*o*u-t*l*f+t*o*h+s*a*f-i*a*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],v=e[12],x=e[13],m=e[14],d=e[15],y=f*m*c-x*h*c+x*l*p-o*m*p-f*l*d+o*h*d,S=v*h*c-u*m*c-v*l*p+a*m*p+u*l*d-a*h*d,E=u*x*c-v*f*c+v*o*p-a*x*p-u*o*d+a*f*d,D=v*f*l-u*x*l-v*o*h+a*x*h+u*o*m-a*f*m,C=t*y+i*S+s*E+r*D;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=y*A,e[1]=(x*h*r-f*m*r-x*s*p+i*m*p+f*s*d-i*h*d)*A,e[2]=(o*m*r-x*l*r+x*s*c-i*m*c-o*s*d+i*l*d)*A,e[3]=(f*l*r-o*h*r-f*s*c+i*h*c+o*s*p-i*l*p)*A,e[4]=S*A,e[5]=(u*m*r-v*h*r+v*s*p-t*m*p-u*s*d+t*h*d)*A,e[6]=(v*l*r-a*m*r-v*s*c+t*m*c+a*s*d-t*l*d)*A,e[7]=(a*h*r-u*l*r+u*s*c-t*h*c-a*s*p+t*l*p)*A,e[8]=E*A,e[9]=(v*f*r-u*x*r-v*i*p+t*x*p+u*i*d-t*f*d)*A,e[10]=(a*x*r-v*o*r+v*i*c-t*x*c-a*i*d+t*o*d)*A,e[11]=(u*o*r-a*f*r-u*i*c+t*f*c+a*i*p-t*o*p)*A,e[12]=D*A,e[13]=(u*x*s-v*f*s+v*i*h-t*x*h-u*i*m+t*f*m)*A,e[14]=(v*o*s-a*x*s-v*i*l+t*x*l+a*i*m-t*o*m)*A,e[15]=(a*f*s-u*o*s+u*i*l-t*f*l-a*i*h+t*o*h)*A,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,h=r*c,p=r*u,v=r*f,x=a*u,m=a*f,d=o*f,y=l*c,S=l*u,E=l*f,D=i.x,C=i.y,A=i.z;return s[0]=(1-(x+d))*D,s[1]=(p+E)*D,s[2]=(v-S)*D,s[3]=0,s[4]=(p-E)*C,s[5]=(1-(h+d))*C,s[6]=(m+y)*C,s[7]=0,s[8]=(v+S)*A,s[9]=(m-y)*A,s[10]=(1-(h+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=rs.set(s[0],s[1],s[2]).length();const a=rs.set(s[4],s[5],s[6]).length(),o=rs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],xn.copy(this);const c=1/r,u=1/a,f=1/o;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=u,xn.elements[5]*=u,xn.elements[6]*=u,xn.elements[8]*=f,xn.elements[9]*=f,xn.elements[10]*=f,t.setFromRotationMatrix(xn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Jn){const l=this.elements,c=2*r/(t-e),u=2*r/(i-s),f=(t+e)/(t-e),h=(i+s)/(i-s);let p,v;if(o===Jn)p=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===No)p=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Jn){const l=this.elements,c=1/(t-e),u=1/(i-s),f=1/(a-r),h=(t+e)*c,p=(i+s)*u;let v,x;if(o===Jn)v=(a+r)*f,x=-2*f;else if(o===No)v=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const rs=new L,xn=new it,jg=new L(0,0,0),qg=new L(1,1,1),ui=new L,Wr=new L,en=new L,Fu=new it,Ou=new Ei;class sa{constructor(e=0,t=0,i=0,s=sa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Fu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ou.setFromEuler(this),this.setFromQuaternion(Ou,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sa.DEFAULT_ORDER="XYZ";class Ql{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yg=0;const Bu=new L,os=new Ei,kn=new it,Xr=new L,Js=new L,Kg=new L,$g=new Ei,zu=new L(1,0,0),Hu=new L(0,1,0),Gu=new L(0,0,1),Zg={type:"added"},Jg={type:"removed"};class Lt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new L,t=new sa,i=new Ei,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new Ze}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ql,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.multiply(os),this}rotateOnWorldAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.premultiply(os),this}rotateX(e){return this.rotateOnAxis(zu,e)}rotateY(e){return this.rotateOnAxis(Hu,e)}rotateZ(e){return this.rotateOnAxis(Gu,e)}translateOnAxis(e,t){return Bu.copy(e).applyQuaternion(this.quaternion),this.position.add(Bu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zu,e)}translateY(e){return this.translateOnAxis(Hu,e)}translateZ(e){return this.translateOnAxis(Gu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Xr.copy(e):Xr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Js,Xr,this.up):kn.lookAt(Xr,Js,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(kn),this.quaternion.premultiply(os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Zg)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jg)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,e,Kg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,$g,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new L(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new L,Vn=new L,ka=new L,Wn=new L,as=new L,ls=new L,ku=new L,Va=new L,Wa=new L,Xa=new L;let jr=!1;class dn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Mn.subVectors(e,t),s.cross(Mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Mn.subVectors(s,t),Vn.subVectors(i,t),ka.subVectors(e,t);const a=Mn.dot(Mn),o=Mn.dot(Vn),l=Mn.dot(ka),c=Vn.dot(Vn),u=Vn.dot(ka),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,v=(a*u-o*l)*h;return r.set(1-p-v,v,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getUV(e,t,i,s,r,a,o,l){return jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jr=!0),this.getInterpolation(e,t,i,s,r,a,o,l)}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static isFrontFacing(e,t,i,s){return Mn.subVectors(i,t),Vn.subVectors(e,t),Mn.cross(Vn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Mn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return jr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jr=!0),dn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;as.subVectors(s,i),ls.subVectors(r,i),Va.subVectors(e,i);const l=as.dot(Va),c=ls.dot(Va);if(l<=0&&c<=0)return t.copy(i);Wa.subVectors(e,s);const u=as.dot(Wa),f=ls.dot(Wa);if(u>=0&&f<=u)return t.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(as,a);Xa.subVectors(e,r);const p=as.dot(Xa),v=ls.dot(Xa);if(v>=0&&p<=v)return t.copy(r);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(ls,o);const m=u*v-p*f;if(m<=0&&f-u>=0&&p-v>=0)return ku.subVectors(r,s),o=(f-u)/(f-u+(p-v)),t.copy(s).addScaledVector(ku,o);const d=1/(m+x+h);return a=x*d,o=h*d,t.copy(i).addScaledVector(as,a).addScaledVector(ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Dd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},qr={h:0,s:0,l:0};function ja(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class He{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=st.workingColorSpace){if(e=Og(e,1),t=Kt(t,0,1),i=Kt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=ja(a,r,e+1/3),this.g=ja(a,r,e),this.b=ja(a,r,e-1/3)}return st.toWorkingColorSpace(this,s),this}setStyle(e,t=bt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const i=Dd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Us(e.r),this.g=Us(e.g),this.b=Us(e.b),this}copyLinearToSRGB(e){return this.r=Ia(e.r),this.g=Ia(e.g),this.b=Ia(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return st.fromWorkingColorSpace(Nt.copy(this),e),Math.round(Kt(Nt.r*255,0,255))*65536+Math.round(Kt(Nt.g*255,0,255))*256+Math.round(Kt(Nt.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(Nt.copy(this),t);const i=Nt.r,s=Nt.g,r=Nt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=bt){st.fromWorkingColorSpace(Nt.copy(this),e);const t=Nt.r,i=Nt.g,s=Nt.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(qr);const i=Da(fi.h,qr.h,t),s=Da(fi.s,qr.s,t),r=Da(fi.l,qr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new He;He.NAMES=Dd;let Qg=0;class Ti extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=yi(),this.name="",this.type="Material",this.blending=Ds,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ml,this.blendDst=Sl,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(i.blending=this.blending),this.side!==bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ml&&(i.blendSrc=this.blendSrc),this.blendDst!==Sl&&(i.blendDst=this.blendDst),this.blendEquation!==Oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Lo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(i.stencilFail=this.stencilFail),this.stencilZFail!==es&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ra extends Ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new L,Yr=new Ee;class rt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=wl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Yr.fromBufferAttribute(this,t),Yr.applyMatrix3(e),this.setXY(t,Yr.x,Yr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wl&&(e.usage=this.usage),e}}class Ud extends rt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Id extends rt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Tt extends rt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let e_=0;const cn=new it,qa=new Lt,cs=new L,tn=new Ki,Qs=new Ki,Pt=new L;class vt extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rd(e)?Id:Ud)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,i){return cn.makeTranslation(e,t,i),this.applyMatrix4(cn),this}scale(e,t,i){return cn.makeScale(e,t,i),this.applyMatrix4(cn),this}lookAt(e){return qa.lookAt(e),qa.updateMatrix(),this.applyMatrix4(qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Tt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Qs.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(tn.min,Qs.min),tn.expandByPoint(Pt),Pt.addVectors(tn.max,Qs.max),tn.expandByPoint(Pt)):(tn.expandByPoint(Qs.min),tn.expandByPoint(Qs.max))}tn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Pt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Pt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Pt.fromBufferAttribute(o,c),l&&(cs.fromBufferAttribute(e,c),Pt.add(cs)),s=Math.max(s,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<o;w++)c[w]=new L,u[w]=new L;const f=new L,h=new L,p=new L,v=new Ee,x=new Ee,m=new Ee,d=new L,y=new L;function S(w,W,ee){f.fromArray(s,w*3),h.fromArray(s,W*3),p.fromArray(s,ee*3),v.fromArray(a,w*2),x.fromArray(a,W*2),m.fromArray(a,ee*2),h.sub(f),p.sub(f),x.sub(v),m.sub(v);const de=1/(x.x*m.y-m.x*x.y);isFinite(de)&&(d.copy(h).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(de),y.copy(p).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar(de),c[w].add(d),c[W].add(d),c[ee].add(d),u[w].add(y),u[W].add(y),u[ee].add(y))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let w=0,W=E.length;w<W;++w){const ee=E[w],de=ee.start,N=ee.count;for(let k=de,V=de+N;k<V;k+=3)S(i[k+0],i[k+1],i[k+2])}const D=new L,C=new L,A=new L,H=new L;function b(w){A.fromArray(r,w*3),H.copy(A);const W=c[w];D.copy(W),D.sub(A.multiplyScalar(A.dot(W))).normalize(),C.crossVectors(H,W);const de=C.dot(u[w])<0?-1:1;l[w*4]=D.x,l[w*4+1]=D.y,l[w*4+2]=D.z,l[w*4+3]=de}for(let w=0,W=E.length;w<W;++w){const ee=E[w],de=ee.start,N=ee.count;for(let k=de,V=de+N;k<V;k+=3)b(i[k+0]),b(i[k+1]),b(i[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new rt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,f=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){const v=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,v=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let d=0;d<u;d++)h[v++]=c[p++]}return new rt(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vu=new it,Di=new Lr,Kr=new $i,Wu=new L,us=new L,fs=new L,hs=new L,Ya=new L,$r=new L,Zr=new Ee,Jr=new Ee,Qr=new Ee,Xu=new L,ju=new L,qu=new L,eo=new L,to=new L;class Dt extends Lt{constructor(e=new vt,t=new ra){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){$r.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(Ya.fromBufferAttribute(f,e),a?$r.addScaledVector(Ya,u):$r.addScaledVector(Ya.sub(t),u))}t.add($r)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Kr.copy(i.boundingSphere),Kr.applyMatrix4(r),Di.copy(e.ray).recast(e.near),!(Kr.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Kr,Wu)===null||Di.origin.distanceToSquared(Wu)>(e.far-e.near)**2))&&(Vu.copy(r).invert(),Di.copy(e.ray).applyMatrix4(Vu),!(i.boundingBox!==null&&Di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Di)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,x=h.length;v<x;v++){const m=h[v],d=a[m.materialIndex],y=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=y,D=S;E<D;E+=3){const C=o.getX(E),A=o.getX(E+1),H=o.getX(E+2);s=no(this,d,e,i,c,u,f,C,A,H),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=v,d=x;m<d;m+=3){const y=o.getX(m),S=o.getX(m+1),E=o.getX(m+2);s=no(this,a,e,i,c,u,f,y,S,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,x=h.length;v<x;v++){const m=h[v],d=a[m.materialIndex],y=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let E=y,D=S;E<D;E+=3){const C=E,A=E+1,H=E+2;s=no(this,d,e,i,c,u,f,C,A,H),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=v,d=x;m<d;m+=3){const y=m,S=m+1,E=m+2;s=no(this,a,e,i,c,u,f,y,S,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function t_(n,e,t,i,s,r,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===bi,o),l===null)return null;to.copy(o),to.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(to);return c<t.near||c>t.far?null:{distance:c,point:to.clone(),object:n}}function no(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,us),n.getVertexPosition(l,fs),n.getVertexPosition(c,hs);const u=t_(n,e,t,i,us,fs,hs,eo);if(u){s&&(Zr.fromBufferAttribute(s,o),Jr.fromBufferAttribute(s,l),Qr.fromBufferAttribute(s,c),u.uv=dn.getInterpolation(eo,us,fs,hs,Zr,Jr,Qr,new Ee)),r&&(Zr.fromBufferAttribute(r,o),Jr.fromBufferAttribute(r,l),Qr.fromBufferAttribute(r,c),u.uv1=dn.getInterpolation(eo,us,fs,hs,Zr,Jr,Qr,new Ee),u.uv2=u.uv1),a&&(Xu.fromBufferAttribute(a,o),ju.fromBufferAttribute(a,l),qu.fromBufferAttribute(a,c),u.normal=dn.getInterpolation(eo,us,fs,hs,Xu,ju,qu,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};dn.getNormal(us,fs,hs,f.normal),u.face=f}return u}class Dr extends vt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(f,2));function v(x,m,d,y,S,E,D,C,A,H,b){const w=E/A,W=D/H,ee=E/2,de=D/2,N=C/2,k=A+1,V=H+1;let q=0,$=0;const ie=new L;for(let se=0;se<V;se++){const fe=se*W-de;for(let ue=0;ue<k;ue++){const J=ue*w-ee;ie[x]=J*y,ie[m]=fe*S,ie[d]=N,c.push(ie.x,ie.y,ie.z),ie[x]=0,ie[m]=0,ie[d]=C>0?1:-1,u.push(ie.x,ie.y,ie.z),f.push(ue/A),f.push(1-se/H),q+=1}}for(let se=0;se<H;se++)for(let fe=0;fe<A;fe++){const ue=h+fe+k*se,J=h+fe+k*(se+1),ce=h+(fe+1)+k*(se+1),Se=h+(fe+1)+k*se;l.push(ue,J,Se),l.push(J,ce,Se),$+=6}o.addGroup(p,$,b),p+=$,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Gs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function jt(n){const e={};for(let t=0;t<n.length;t++){const i=Gs(n[t]);for(const s in i)e[s]=i[s]}return e}function n_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Nd(n){return n.getRenderTarget()===null?n.outputColorSpace:st.workingColorSpace}const Tr={clone:Gs,merge:jt};var i_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,s_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class St extends Ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=i_,this.fragmentShader=s_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gs(e.uniforms),this.uniformsGroups=n_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Fd extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=Jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class sn extends Fd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rl*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(So*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ds=-90,ps=1;class r_ extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new sn(ds,ps,e,t);s.layers=this.layers,this.add(s);const r=new sn(ds,ps,e,t);r.layers=this.layers,this.add(r);const a=new sn(ds,ps,e,t);a.layers=this.layers,this.add(a);const o=new sn(ds,ps,e,t);o.layers=this.layers,this.add(o);const l=new sn(ds,ps,e,t);l.layers=this.layers,this.add(l);const c=new sn(ds,ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Jn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===No)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Od extends Jt{constructor(e,t,i,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Bs,super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class o_ extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(_r("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Xi?bt:pn),this.texture=new Od(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:hn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Dr(5,5,5),r=new St({name:"CubemapFromEquirect",uniforms:Gs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:ei});r.uniforms.tEquirect.value=t;const a=new Dt(s,r),o=t.minFilter;return t.minFilter===Er&&(t.minFilter=hn),new r_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const Ka=new L,a_=new L,l_=new Ze;class _i{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ka.subVectors(i,t).cross(a_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ka),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||l_.getNormalMatrix(e),s=this.coplanarPoint(Ka).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ui=new $i,io=new L;class ec{constructor(e=new _i,t=new _i,i=new _i,s=new _i,r=new _i,a=new _i){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Jn){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],f=s[6],h=s[7],p=s[8],v=s[9],x=s[10],m=s[11],d=s[12],y=s[13],S=s[14],E=s[15];if(i[0].setComponents(l-r,h-c,m-p,E-d).normalize(),i[1].setComponents(l+r,h+c,m+p,E+d).normalize(),i[2].setComponents(l+a,h+u,m+v,E+y).normalize(),i[3].setComponents(l-a,h-u,m-v,E-y).normalize(),i[4].setComponents(l-o,h-f,m-x,E-S).normalize(),t===Jn)i[5].setComponents(l+o,h+f,m+x,E+S).normalize();else if(t===No)i[5].setComponents(o,f,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){return Ui.center.set(0,0,0),Ui.radius=.7071067811865476,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(io.x=s.normal.x>0?e.max.x:e.min.x,io.y=s.normal.y>0?e.max.y:e.min.y,io.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(io)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function c_(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,u){const f=c.array,h=c.usage,p=f.byteLength,v=n.createBuffer();n.bindBuffer(u,v),n.bufferData(u,f,h),c.onUploadCallback();let x;if(f instanceof Float32Array)x=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)x=n.SHORT;else if(f instanceof Uint32Array)x=n.UNSIGNED_INT;else if(f instanceof Int32Array)x=n.INT;else if(f instanceof Int8Array)x=n.BYTE;else if(f instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:v,type:x,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,u,f){const h=u.array,p=u._updateRange,v=u.updateRanges;if(n.bindBuffer(f,c),p.count===-1&&v.length===0&&n.bufferSubData(f,0,h),v.length!==0){for(let x=0,m=v.length;x<m;x++){const d=v[x];t?n.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h,d.start,d.count):n.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,s(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(f.buffer,c,u),f.version=c.version}}return{get:a,remove:o,update:l}}class oa extends vt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=e/o,h=t/l,p=[],v=[],x=[],m=[];for(let d=0;d<u;d++){const y=d*h-a;for(let S=0;S<c;S++){const E=S*f-r;v.push(E,-y,0),x.push(0,0,1),m.push(S/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){const S=y+c*d,E=y+c*(d+1),D=y+1+c*(d+1),C=y+1+c*d;p.push(S,E,C),p.push(E,D,C)}this.setIndex(p),this.setAttribute("position",new Tt(v,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oa(e.width,e.height,e.widthSegments,e.heightSegments)}}var u_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,f_=`#ifdef USE_ALPHAHASH
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
#endif`,h_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,m_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,g_=`#ifdef USE_AOMAP
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
#endif`,__=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,v_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,x_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,M_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,S_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,y_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,b_=`#ifdef USE_IRIDESCENCE
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
#endif`,E_=`#ifdef USE_BUMPMAP
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
#endif`,T_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,w_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,A_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,R_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,C_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,P_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,L_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,D_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,U_=`#define PI 3.141592653589793
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
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,I_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,N_=`vec3 transformedNormal = objectNormal;
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
#endif`,F_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,O_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,B_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,H_="gl_FragColor = linearToOutputTexel( gl_FragColor );",G_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,k_=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,V_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,W_=`#ifdef USE_ENVMAP
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
#endif`,X_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j_=`#ifdef USE_ENVMAP
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
#endif`,q_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Y_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,K_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Z_=`#ifdef USE_GRADIENTMAP
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
}`,J_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Q_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ev=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nv=`uniform bool receiveShadow;
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
#endif`,iv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
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
#endif`,sv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ov=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,av=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,cv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,uv=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,fv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
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
#endif`,hv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,gv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,_v=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mv=`#if defined( USE_POINTS_UV )
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
#endif`,Sv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ev=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Tv=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,wv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Av=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dv=`#ifdef USE_NORMALMAP
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
#endif`,Uv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Iv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ov=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Bv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,zv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,jv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Kv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$v=`#ifdef USE_SKINNING
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
#endif`,Zv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jv=`#ifdef USE_SKINNING
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
#endif`,Qv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ex=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nx=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ix=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sx=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ux=`uniform sampler2D t2D;
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
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,px=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mx=`#include <common>
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
}`,gx=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,_x=`#define DISTANCE
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
}`,vx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sx=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yx=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bx=`#include <common>
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
}`,Ex=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Tx=`#define LAMBERT
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
}`,wx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ax=`#define MATCAP
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
}`,Rx=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Cx=`#define NORMAL
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
}`,Px=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lx=`#define PHONG
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
}`,Dx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ux=`#define STANDARD
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
}`,Ix=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,Nx=`#define TOON
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
}`,Fx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ox=`uniform float size;
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
}`,Bx=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,zx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,Hx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Gx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,kx=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Xe={alphahash_fragment:u_,alphahash_pars_fragment:f_,alphamap_fragment:h_,alphamap_pars_fragment:d_,alphatest_fragment:p_,alphatest_pars_fragment:m_,aomap_fragment:g_,aomap_pars_fragment:__,batching_pars_vertex:v_,batching_vertex:x_,begin_vertex:M_,beginnormal_vertex:S_,bsdfs:y_,iridescence_fragment:b_,bumpmap_pars_fragment:E_,clipping_planes_fragment:T_,clipping_planes_pars_fragment:w_,clipping_planes_pars_vertex:A_,clipping_planes_vertex:R_,color_fragment:C_,color_pars_fragment:P_,color_pars_vertex:L_,color_vertex:D_,common:U_,cube_uv_reflection_fragment:I_,defaultnormal_vertex:N_,displacementmap_pars_vertex:F_,displacementmap_vertex:O_,emissivemap_fragment:B_,emissivemap_pars_fragment:z_,colorspace_fragment:H_,colorspace_pars_fragment:G_,envmap_fragment:k_,envmap_common_pars_fragment:V_,envmap_pars_fragment:W_,envmap_pars_vertex:X_,envmap_physical_pars_fragment:iv,envmap_vertex:j_,fog_vertex:q_,fog_pars_vertex:Y_,fog_fragment:K_,fog_pars_fragment:$_,gradientmap_pars_fragment:Z_,lightmap_fragment:J_,lightmap_pars_fragment:Q_,lights_lambert_fragment:ev,lights_lambert_pars_fragment:tv,lights_pars_begin:nv,lights_toon_fragment:sv,lights_toon_pars_fragment:rv,lights_phong_fragment:ov,lights_phong_pars_fragment:av,lights_physical_fragment:lv,lights_physical_pars_fragment:cv,lights_fragment_begin:uv,lights_fragment_maps:fv,lights_fragment_end:hv,logdepthbuf_fragment:dv,logdepthbuf_pars_fragment:pv,logdepthbuf_pars_vertex:mv,logdepthbuf_vertex:gv,map_fragment:_v,map_pars_fragment:vv,map_particle_fragment:xv,map_particle_pars_fragment:Mv,metalnessmap_fragment:Sv,metalnessmap_pars_fragment:yv,morphcolor_vertex:bv,morphnormal_vertex:Ev,morphtarget_pars_vertex:Tv,morphtarget_vertex:wv,normal_fragment_begin:Av,normal_fragment_maps:Rv,normal_pars_fragment:Cv,normal_pars_vertex:Pv,normal_vertex:Lv,normalmap_pars_fragment:Dv,clearcoat_normal_fragment_begin:Uv,clearcoat_normal_fragment_maps:Iv,clearcoat_pars_fragment:Nv,iridescence_pars_fragment:Fv,opaque_fragment:Ov,packing:Bv,premultiplied_alpha_fragment:zv,project_vertex:Hv,dithering_fragment:Gv,dithering_pars_fragment:kv,roughnessmap_fragment:Vv,roughnessmap_pars_fragment:Wv,shadowmap_pars_fragment:Xv,shadowmap_pars_vertex:jv,shadowmap_vertex:qv,shadowmask_pars_fragment:Yv,skinbase_vertex:Kv,skinning_pars_vertex:$v,skinning_vertex:Zv,skinnormal_vertex:Jv,specularmap_fragment:Qv,specularmap_pars_fragment:ex,tonemapping_fragment:tx,tonemapping_pars_fragment:nx,transmission_fragment:ix,transmission_pars_fragment:sx,uv_pars_fragment:rx,uv_pars_vertex:ox,uv_vertex:ax,worldpos_vertex:lx,background_vert:cx,background_frag:ux,backgroundCube_vert:fx,backgroundCube_frag:hx,cube_vert:dx,cube_frag:px,depth_vert:mx,depth_frag:gx,distanceRGBA_vert:_x,distanceRGBA_frag:vx,equirect_vert:xx,equirect_frag:Mx,linedashed_vert:Sx,linedashed_frag:yx,meshbasic_vert:bx,meshbasic_frag:Ex,meshlambert_vert:Tx,meshlambert_frag:wx,meshmatcap_vert:Ax,meshmatcap_frag:Rx,meshnormal_vert:Cx,meshnormal_frag:Px,meshphong_vert:Lx,meshphong_frag:Dx,meshphysical_vert:Ux,meshphysical_frag:Ix,meshtoon_vert:Nx,meshtoon_frag:Fx,points_vert:Ox,points_frag:Bx,shadow_vert:zx,shadow_frag:Hx,sprite_vert:Gx,sprite_frag:kx},xe={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},In={basic:{uniforms:jt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:jt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new He(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:jt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:jt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:jt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new He(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:jt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:jt([xe.points,xe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:jt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:jt([xe.common,xe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:jt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:jt([xe.sprite,xe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:jt([xe.common,xe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:jt([xe.lights,xe.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};In.physical={uniforms:jt([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const so={r:0,b:0,g:0};function Vx(n,e,t,i,s,r,a){const o=new He(0);let l=r===!0?0:1,c,u,f=null,h=0,p=null;function v(m,d){let y=!1,S=d.isScene===!0?d.background:null;S&&S.isTexture&&(S=(d.backgroundBlurriness>0?t:e).get(S)),S===null?x(o,l):S&&S.isColor&&(x(S,1),y=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),S&&(S.isCubeTexture||S.mapping===na)?(u===void 0&&(u=new Dt(new Dr(1,1,1),new St({name:"BackgroundCubeMaterial",uniforms:Gs(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=st.getTransfer(S.colorSpace)!==ut,(f!==S||h!==S.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=S,h=S.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Dt(new oa(2,2),new St({name:"BackgroundMaterial",uniforms:Gs(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=st.getTransfer(S.colorSpace)!==ut,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||h!==S.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=S,h=S.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,d){m.getRGB(so,Nd(n)),i.buffers.color.setClear(so.r,so.g,so.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(o,l)},render:v}}function Wx(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null);let c=l,u=!1;function f(N,k,V,q,$){let ie=!1;if(a){const se=x(q,V,k);c!==se&&(c=se,p(c.object)),ie=d(N,q,V,$),ie&&y(N,q,V,$)}else{const se=k.wireframe===!0;(c.geometry!==q.id||c.program!==V.id||c.wireframe!==se)&&(c.geometry=q.id,c.program=V.id,c.wireframe=se,ie=!0)}$!==null&&t.update($,n.ELEMENT_ARRAY_BUFFER),(ie||u)&&(u=!1,H(N,k,V,q),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function h(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(N){return i.isWebGL2?n.bindVertexArray(N):r.bindVertexArrayOES(N)}function v(N){return i.isWebGL2?n.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function x(N,k,V){const q=V.wireframe===!0;let $=o[N.id];$===void 0&&($={},o[N.id]=$);let ie=$[k.id];ie===void 0&&(ie={},$[k.id]=ie);let se=ie[q];return se===void 0&&(se=m(h()),ie[q]=se),se}function m(N){const k=[],V=[],q=[];for(let $=0;$<s;$++)k[$]=0,V[$]=0,q[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:q,object:N,attributes:{},index:null}}function d(N,k,V,q){const $=c.attributes,ie=k.attributes;let se=0;const fe=V.getAttributes();for(const ue in fe)if(fe[ue].location>=0){const ce=$[ue];let Se=ie[ue];if(Se===void 0&&(ue==="instanceMatrix"&&N.instanceMatrix&&(Se=N.instanceMatrix),ue==="instanceColor"&&N.instanceColor&&(Se=N.instanceColor)),ce===void 0||ce.attribute!==Se||Se&&ce.data!==Se.data)return!0;se++}return c.attributesNum!==se||c.index!==q}function y(N,k,V,q){const $={},ie=k.attributes;let se=0;const fe=V.getAttributes();for(const ue in fe)if(fe[ue].location>=0){let ce=ie[ue];ce===void 0&&(ue==="instanceMatrix"&&N.instanceMatrix&&(ce=N.instanceMatrix),ue==="instanceColor"&&N.instanceColor&&(ce=N.instanceColor));const Se={};Se.attribute=ce,ce&&ce.data&&(Se.data=ce.data),$[ue]=Se,se++}c.attributes=$,c.attributesNum=se,c.index=q}function S(){const N=c.newAttributes;for(let k=0,V=N.length;k<V;k++)N[k]=0}function E(N){D(N,0)}function D(N,k){const V=c.newAttributes,q=c.enabledAttributes,$=c.attributeDivisors;V[N]=1,q[N]===0&&(n.enableVertexAttribArray(N),q[N]=1),$[N]!==k&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,k),$[N]=k)}function C(){const N=c.newAttributes,k=c.enabledAttributes;for(let V=0,q=k.length;V<q;V++)k[V]!==N[V]&&(n.disableVertexAttribArray(V),k[V]=0)}function A(N,k,V,q,$,ie,se){se===!0?n.vertexAttribIPointer(N,k,V,$,ie):n.vertexAttribPointer(N,k,V,q,$,ie)}function H(N,k,V,q){if(i.isWebGL2===!1&&(N.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;S();const $=q.attributes,ie=V.getAttributes(),se=k.defaultAttributeValues;for(const fe in ie){const ue=ie[fe];if(ue.location>=0){let J=$[fe];if(J===void 0&&(fe==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),fe==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),J!==void 0){const ce=J.normalized,Se=J.itemSize,Te=t.get(J);if(Te===void 0)continue;const we=Te.buffer,De=Te.type,Ie=Te.bytesPerElement,Re=i.isWebGL2===!0&&(De===n.INT||De===n.UNSIGNED_INT||J.gpuType===vd);if(J.isInterleavedBufferAttribute){const Ye=J.data,M=Ye.stride,U=J.offset;if(Ye.isInstancedInterleavedBuffer){for(let F=0;F<ue.locationSize;F++)D(ue.location+F,Ye.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Ye.meshPerAttribute*Ye.count)}else for(let F=0;F<ue.locationSize;F++)E(ue.location+F);n.bindBuffer(n.ARRAY_BUFFER,we);for(let F=0;F<ue.locationSize;F++)A(ue.location+F,Se/ue.locationSize,De,ce,M*Ie,(U+Se/ue.locationSize*F)*Ie,Re)}else{if(J.isInstancedBufferAttribute){for(let Ye=0;Ye<ue.locationSize;Ye++)D(ue.location+Ye,J.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Ye=0;Ye<ue.locationSize;Ye++)E(ue.location+Ye);n.bindBuffer(n.ARRAY_BUFFER,we);for(let Ye=0;Ye<ue.locationSize;Ye++)A(ue.location+Ye,Se/ue.locationSize,De,ce,Se*Ie,Se/ue.locationSize*Ye*Ie,Re)}}else if(se!==void 0){const ce=se[fe];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(ue.location,ce);break;case 3:n.vertexAttrib3fv(ue.location,ce);break;case 4:n.vertexAttrib4fv(ue.location,ce);break;default:n.vertexAttrib1fv(ue.location,ce)}}}}C()}function b(){ee();for(const N in o){const k=o[N];for(const V in k){const q=k[V];for(const $ in q)v(q[$].object),delete q[$];delete k[V]}delete o[N]}}function w(N){if(o[N.id]===void 0)return;const k=o[N.id];for(const V in k){const q=k[V];for(const $ in q)v(q[$].object),delete q[$];delete k[V]}delete o[N.id]}function W(N){for(const k in o){const V=o[k];if(V[N.id]===void 0)continue;const q=V[N.id];for(const $ in q)v(q[$].object),delete q[$];delete V[N.id]}}function ee(){de(),u=!0,c!==l&&(c=l,p(c.object))}function de(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:ee,resetDefaultState:de,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:W,initAttributes:S,enableAttribute:E,disableUnusedAttributes:C}}function Xx(n,e,t,i){const s=i.isWebGL2;let r;function a(u){r=u}function o(u,f){n.drawArrays(r,u,f),t.update(f,r,1)}function l(u,f,h){if(h===0)return;let p,v;if(s)p=n,v="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[v](r,u,f,h),t.update(f,r,h)}function c(u,f,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<h;v++)this.render(u[v],f[v]);else{p.multiDrawArraysWEBGL(r,u,0,f,0,h);let v=0;for(let x=0;x<h;x++)v+=f[x];t.update(v,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function jx(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=h>0,E=a||e.has("OES_texture_float"),D=S&&E,C=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:y,vertexTextures:S,floatFragmentTextures:E,floatVertexTextures:D,maxSamples:C}}function qx(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new _i,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const v=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!s||v===null||v.length===0||r&&!m)r?u(null):c();else{const y=r?0:i,S=y*4;let E=d.clippingState||null;l.value=E,E=u(v,h,S,p);for(let D=0;D!==S;++D)E[D]=t[D];d.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,v){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const d=p+x*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let S=0,E=p;S!==x;++S,E+=4)a.copy(f[S]).applyMatrix4(y,o),a.normal.toArray(m,E),m[E+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Yx(n){let e=new WeakMap;function t(a,o){return o===yl?a.mapping=Bs:o===bl&&(a.mapping=zs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===yl||o===bl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new o_(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class zd extends Fd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ts=4,Yu=[.125,.215,.35,.446,.526,.582],Bi=20,$a=new zd,Ku=new He;let Za=null,Ja=0,Qa=0;const Fi=(1+Math.sqrt(5))/2,ms=1/Fi,$u=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Fi,ms),new L(0,Fi,-ms),new L(ms,0,Fi),new L(-ms,0,Fi),new L(Fi,ms,0),new L(-Fi,ms,0)];class Zu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Za=this._renderer.getRenderTarget(),Ja=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ef(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Za,Ja,Qa),e.scissorTest=!1,ro(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bs||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Za=this._renderer.getRenderTarget(),Ja=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:ti,format:bn,colorSpace:ri,depthBuffer:!1},s=Ju(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ju(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Kx(r)),this._blurMaterial=$x(r,e,t)}return s}_compileMaterial(e){const t=new Dt(this._lodPlanes[0],e);this._renderer.compile(t,$a)}_sceneToCubeUV(e,t,i,s){const o=new sn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Ku),u.toneMapping=Mi,u.autoClear=!1;const p=new ra({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),v=new Dt(new Dr,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Ku),x=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):y===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const S=this._cubeSize;ro(s,y*S,d>2?S:0,S,S),u.setRenderTarget(s),x&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Bs||e.mapping===zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ef()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ro(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,$a)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=$u[(s-1)%$u.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Dt(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Bi-1),x=r/v,m=isFinite(r)?1+Math.floor(u*x):Bi;m>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);const d=[];let y=0;for(let A=0;A<Bi;++A){const H=A/x,b=Math.exp(-H*H/2);d.push(b),A===0?y+=b:A<m&&(y+=2*b)}for(let A=0;A<d.length;A++)d[A]=d[A]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:S}=this;h.dTheta.value=v,h.mipInt.value=S-i;const E=this._sizeLods[s],D=3*E*(s>S-Ts?s-S+Ts:0),C=4*(this._cubeSize-E);ro(t,D,C,3*E,2*E),l.setRenderTarget(t),l.render(f,$a)}}function Kx(n){const e=[],t=[],i=[];let s=n;const r=n-Ts+1+Yu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Ts?l=Yu[a-n+Ts-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,v=6,x=3,m=2,d=1,y=new Float32Array(x*v*p),S=new Float32Array(m*v*p),E=new Float32Array(d*v*p);for(let C=0;C<p;C++){const A=C%3*2/3-1,H=C>2?0:-1,b=[A,H,0,A+2/3,H,0,A+2/3,H+1,0,A,H,0,A+2/3,H+1,0,A,H+1,0];y.set(b,x*v*C),S.set(h,m*v*C);const w=[C,C,C,C,C,C];E.set(w,d*v*C)}const D=new vt;D.setAttribute("position",new rt(y,x)),D.setAttribute("uv",new rt(S,m)),D.setAttribute("faceIndex",new rt(E,d)),e.push(D),s>Ts&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Ju(n,e,t){const i=new wn(n,e,t);return i.texture.mapping=na,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ro(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function $x(n,e,t){const i=new Float32Array(Bi),s=new L(0,1,0);return new St({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:tc(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Qu(){return new St({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function ef(){return new St({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function tc(){return`

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
	`}function Zx(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===yl||l===bl,u=l===Bs||l===zs;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new Zu(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||u&&f&&s(f)){t===null&&(t=new Zu(n));const h=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,h),o.addEventListener("dispose",r),h.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Jx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Qx(n,e,t,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const v in h.attributes)e.remove(h.attributes[v]);for(const v in h.morphAttributes){const x=h.morphAttributes[v];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const v in h)e.update(h[v],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const v in p){const x=p[v];for(let m=0,d=x.length;m<d;m++)e.update(x[m],n.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,v=f.attributes.position;let x=0;if(p!==null){const y=p.array;x=p.version;for(let S=0,E=y.length;S<E;S+=3){const D=y[S+0],C=y[S+1],A=y[S+2];h.push(D,C,C,A,A,D)}}else if(v!==void 0){const y=v.array;x=v.version;for(let S=0,E=y.length/3-1;S<E;S+=3){const D=S+0,C=S+1,A=S+2;h.push(D,C,C,A,A,D)}}else return;const m=new(Rd(h)?Id:Ud)(h,1);m.version=x;const d=r.get(f);d&&e.remove(d),r.set(f,m)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function eM(n,e,t,i){const s=i.isWebGL2;let r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,v){n.drawElements(r,v,o,p*l),t.update(v,r,1)}function f(p,v,x){if(x===0)return;let m,d;if(s)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,v,o,p*l,x),t.update(v,r,x)}function h(p,v,x){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<x;d++)this.render(p[d]/l,v[d]);else{m.multiDrawElementsWEBGL(r,v,0,o,p,0,x);let d=0;for(let y=0;y<x;y++)d+=v[y];t.update(d,r,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function tM(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function nM(n,e){return n[0]-e[0]}function iM(n,e){return Math.abs(e[1])-Math.abs(n[1])}function sM(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new dt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const v=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,x=v!==void 0?v.length:0;let m=r.get(u);if(m===void 0||m.count!==x){let k=function(){de.dispose(),r.delete(u),u.removeEventListener("dispose",k)};var p=k;m!==void 0&&m.texture.dispose();const S=u.morphAttributes.position!==void 0,E=u.morphAttributes.normal!==void 0,D=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],H=u.morphAttributes.color||[];let b=0;S===!0&&(b=1),E===!0&&(b=2),D===!0&&(b=3);let w=u.attributes.position.count*b,W=1;w>e.maxTextureSize&&(W=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const ee=new Float32Array(w*W*4*x),de=new Ld(ee,w,W,x);de.type=xi,de.needsUpdate=!0;const N=b*4;for(let V=0;V<x;V++){const q=C[V],$=A[V],ie=H[V],se=w*W*4*V;for(let fe=0;fe<q.count;fe++){const ue=fe*N;S===!0&&(a.fromBufferAttribute(q,fe),ee[se+ue+0]=a.x,ee[se+ue+1]=a.y,ee[se+ue+2]=a.z,ee[se+ue+3]=0),E===!0&&(a.fromBufferAttribute($,fe),ee[se+ue+4]=a.x,ee[se+ue+5]=a.y,ee[se+ue+6]=a.z,ee[se+ue+7]=0),D===!0&&(a.fromBufferAttribute(ie,fe),ee[se+ue+8]=a.x,ee[se+ue+9]=a.y,ee[se+ue+10]=a.z,ee[se+ue+11]=ie.itemSize===4?a.w:1)}}m={count:x,texture:de,size:new Ee(w,W)},r.set(u,m),u.addEventListener("dispose",k)}let d=0;for(let S=0;S<h.length;S++)d+=h[S];const y=u.morphTargetsRelative?1:1-d;f.getUniforms().setValue(n,"morphTargetBaseInfluence",y),f.getUniforms().setValue(n,"morphTargetInfluences",h),f.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const v=h===void 0?0:h.length;let x=i[u.id];if(x===void 0||x.length!==v){x=[];for(let E=0;E<v;E++)x[E]=[E,0];i[u.id]=x}for(let E=0;E<v;E++){const D=x[E];D[0]=E,D[1]=h[E]}x.sort(iM);for(let E=0;E<8;E++)E<v&&x[E][1]?(o[E][0]=x[E][0],o[E][1]=x[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(nM);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let y=0;for(let E=0;E<8;E++){const D=o[E],C=D[0],A=D[1];C!==Number.MAX_SAFE_INTEGER&&A?(m&&u.getAttribute("morphTarget"+E)!==m[C]&&u.setAttribute("morphTarget"+E,m[C]),d&&u.getAttribute("morphNormal"+E)!==d[C]&&u.setAttribute("morphNormal"+E,d[C]),s[E]=A,y+=A):(m&&u.hasAttribute("morphTarget"+E)===!0&&u.deleteAttribute("morphTarget"+E),d&&u.hasAttribute("morphNormal"+E)===!0&&u.deleteAttribute("morphNormal"+E),s[E]=0)}const S=u.morphTargetsRelative?1:1-y;f.getUniforms().setValue(n,"morphTargetBaseInfluence",S),f.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function rM(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(s.get(f)!==c&&(e.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return f}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Hd extends Jt{constructor(e,t,i,s,r,a,o,l,c,u){if(u=u!==void 0?u:Wi,u!==Wi&&u!==Hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Wi&&(i=vi),i===void 0&&u===Hs&&(i=Vi),super(null,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:qt,this.minFilter=l!==void 0?l:qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Gd=new Jt,kd=new Hd(1,1);kd.compareFunction=Ad;const Vd=new Ld,Wd=new Wg,Xd=new Od,tf=[],nf=[],sf=new Float32Array(16),rf=new Float32Array(9),of=new Float32Array(4);function Xs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=tf[s];if(r===void 0&&(r=new Float32Array(s),tf[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function wt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function At(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function aa(n,e){let t=nf[e];t===void 0&&(t=new Int32Array(e),nf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function oM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function aM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2fv(this.addr,e),At(t,e)}}function lM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;n.uniform3fv(this.addr,e),At(t,e)}}function cM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4fv(this.addr,e),At(t,e)}}function uM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(wt(t,i))return;of.set(i),n.uniformMatrix2fv(this.addr,!1,of),At(t,i)}}function fM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(wt(t,i))return;rf.set(i),n.uniformMatrix3fv(this.addr,!1,rf),At(t,i)}}function hM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(wt(t,i))return;sf.set(i),n.uniformMatrix4fv(this.addr,!1,sf),At(t,i)}}function dM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function pM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2iv(this.addr,e),At(t,e)}}function mM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3iv(this.addr,e),At(t,e)}}function gM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4iv(this.addr,e),At(t,e)}}function _M(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function vM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2uiv(this.addr,e),At(t,e)}}function xM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3uiv(this.addr,e),At(t,e)}}function MM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4uiv(this.addr,e),At(t,e)}}function SM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?kd:Gd;t.setTexture2D(e||r,s)}function yM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Wd,s)}function bM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Xd,s)}function EM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Vd,s)}function TM(n){switch(n){case 5126:return oM;case 35664:return aM;case 35665:return lM;case 35666:return cM;case 35674:return uM;case 35675:return fM;case 35676:return hM;case 5124:case 35670:return dM;case 35667:case 35671:return pM;case 35668:case 35672:return mM;case 35669:case 35673:return gM;case 5125:return _M;case 36294:return vM;case 36295:return xM;case 36296:return MM;case 35678:case 36198:case 36298:case 36306:case 35682:return SM;case 35679:case 36299:case 36307:return yM;case 35680:case 36300:case 36308:case 36293:return bM;case 36289:case 36303:case 36311:case 36292:return EM}}function wM(n,e){n.uniform1fv(this.addr,e)}function AM(n,e){const t=Xs(e,this.size,2);n.uniform2fv(this.addr,t)}function RM(n,e){const t=Xs(e,this.size,3);n.uniform3fv(this.addr,t)}function CM(n,e){const t=Xs(e,this.size,4);n.uniform4fv(this.addr,t)}function PM(n,e){const t=Xs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function LM(n,e){const t=Xs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function DM(n,e){const t=Xs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function UM(n,e){n.uniform1iv(this.addr,e)}function IM(n,e){n.uniform2iv(this.addr,e)}function NM(n,e){n.uniform3iv(this.addr,e)}function FM(n,e){n.uniform4iv(this.addr,e)}function OM(n,e){n.uniform1uiv(this.addr,e)}function BM(n,e){n.uniform2uiv(this.addr,e)}function zM(n,e){n.uniform3uiv(this.addr,e)}function HM(n,e){n.uniform4uiv(this.addr,e)}function GM(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Gd,r[a])}function kM(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Wd,r[a])}function VM(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Xd,r[a])}function WM(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),At(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Vd,r[a])}function XM(n){switch(n){case 5126:return wM;case 35664:return AM;case 35665:return RM;case 35666:return CM;case 35674:return PM;case 35675:return LM;case 35676:return DM;case 5124:case 35670:return UM;case 35667:case 35671:return IM;case 35668:case 35672:return NM;case 35669:case 35673:return FM;case 5125:return OM;case 36294:return BM;case 36295:return zM;case 36296:return HM;case 35678:case 36198:case 36298:case 36306:case 35682:return GM;case 35679:case 36299:case 36307:return kM;case 35680:case 36300:case 36308:case 36293:return VM;case 36289:case 36303:case 36311:case 36292:return WM}}class jM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=TM(t.type)}}class qM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=XM(t.type)}}class YM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const el=/(\w+)(\])?(\[|\.)?/g;function af(n,e){n.seq.push(e),n.map[e.id]=e}function KM(n,e,t){const i=n.name,s=i.length;for(el.lastIndex=0;;){const r=el.exec(i),a=el.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){af(t,c===void 0?new jM(o,n,e):new qM(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new YM(o),af(t,f)),t=f}}}class yo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);KM(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function lf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const $M=37297;let ZM=0;function JM(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function QM(n){const e=st.getPrimaries(st.workingColorSpace),t=st.getPrimaries(n);let i;switch(e===t?i="":e===Io&&t===Uo?i="LinearDisplayP3ToLinearSRGB":e===Uo&&t===Io&&(i="LinearSRGBToLinearDisplayP3"),n){case ri:case ia:return[i,"LinearTransferOETF"];case bt:case Jl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function cf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+JM(n.getShaderSource(e),a)}else return s}function eS(n,e){const t=QM(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function tS(n,e){let t;switch(e){case dd:t="Linear";break;case pd:t="Reinhard";break;case md:t="OptimizedCineon";break;case $l:t="ACESFilmic";break;case gd:t="AgX";break;case gg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function nS(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ws).join(`
`)}function iS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ws).join(`
`)}function sS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function rS(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ws(n){return n!==""}function uf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ff(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const oS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pl(n){return n.replace(oS,lS)}const aS=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function lS(n,e){let t=Xe[e];if(t===void 0){const i=aS.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Pl(t)}const cS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hf(n){return n.replace(cS,uS)}function uS(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function df(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function fS(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hd?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===W0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Xn&&(e="SHADOWMAP_TYPE_VSM"),e}function hS(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Bs:case zs:e="ENVMAP_TYPE_CUBE";break;case na:e="ENVMAP_TYPE_CUBE_UV";break}return e}function dS(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case zs:e="ENVMAP_MODE_REFRACTION";break}return e}function pS(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Kl:e="ENVMAP_BLENDING_MULTIPLY";break;case pg:e="ENVMAP_BLENDING_MIX";break;case mg:e="ENVMAP_BLENDING_ADD";break}return e}function mS(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function gS(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=fS(t),c=hS(t),u=dS(t),f=pS(t),h=mS(t),p=t.isWebGL2?"":nS(t),v=iS(t),x=sS(r),m=s.createProgram();let d,y,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ws).join(`
`),d.length>0&&(d+=`
`),y=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ws).join(`
`),y.length>0&&(y+=`
`)):(d=[df(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),y=[p,df(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mi?"#define TONE_MAPPING":"",t.toneMapping!==Mi?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Mi?tS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,eS("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ws).join(`
`)),a=Pl(a),a=uf(a,t),a=ff(a,t),o=Pl(o),o=uf(o,t),o=ff(o,t),a=hf(a),o=hf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,d=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Pu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const E=S+d+a,D=S+y+o,C=lf(s,s.VERTEX_SHADER,E),A=lf(s,s.FRAGMENT_SHADER,D);s.attachShader(m,C),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function H(ee){if(n.debug.checkShaderErrors){const de=s.getProgramInfoLog(m).trim(),N=s.getShaderInfoLog(C).trim(),k=s.getShaderInfoLog(A).trim();let V=!0,q=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,C,A);else{const $=cf(s,C,"vertex"),ie=cf(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+de+`
`+$+`
`+ie)}else de!==""?console.warn("THREE.WebGLProgram: Program Info Log:",de):(N===""||k==="")&&(q=!1);q&&(ee.diagnostics={runnable:V,programLog:de,vertexShader:{log:N,prefix:d},fragmentShader:{log:k,prefix:y}})}s.deleteShader(C),s.deleteShader(A),b=new yo(s,m),w=rS(s,m)}let b;this.getUniforms=function(){return b===void 0&&H(this),b};let w;this.getAttributes=function(){return w===void 0&&H(this),w};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=s.getProgramParameter(m,$M)),W},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ZM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=A,this}let _S=0;class vS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new xS(e),t.set(e,i)),i}}class xS{constructor(e){this.id=_S++,this.code=e,this.usedTimes=0}}function MS(n,e,t,i,s,r,a){const o=new Ql,l=new vS,c=[],u=s.isWebGL2,f=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return b===0?"uv":`uv${b}`}function m(b,w,W,ee,de){const N=ee.fog,k=de.geometry,V=b.isMeshStandardMaterial?ee.environment:null,q=(b.isMeshStandardMaterial?t:e).get(b.envMap||V),$=q&&q.mapping===na?q.image.height:null,ie=v[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const se=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,fe=se!==void 0?se.length:0;let ue=0;k.morphAttributes.position!==void 0&&(ue=1),k.morphAttributes.normal!==void 0&&(ue=2),k.morphAttributes.color!==void 0&&(ue=3);let J,ce,Se,Te;if(ie){const kt=In[ie];J=kt.vertexShader,ce=kt.fragmentShader}else J=b.vertexShader,ce=b.fragmentShader,l.update(b),Se=l.getVertexShaderID(b),Te=l.getFragmentShaderID(b);const we=n.getRenderTarget(),De=de.isInstancedMesh===!0,Ie=de.isBatchedMesh===!0,Re=!!b.map,Ye=!!b.matcap,M=!!q,U=!!b.aoMap,F=!!b.lightMap,X=!!b.bumpMap,B=!!b.normalMap,Q=!!b.displacementMap,te=!!b.emissiveMap,g=!!b.metalnessMap,_=!!b.roughnessMap,R=b.anisotropy>0,j=b.clearcoat>0,O=b.iridescence>0,G=b.sheen>0,ae=b.transmission>0,re=R&&!!b.anisotropyMap,he=j&&!!b.clearcoatMap,Me=j&&!!b.clearcoatNormalMap,Ae=j&&!!b.clearcoatRoughnessMap,ne=O&&!!b.iridescenceMap,Oe=O&&!!b.iridescenceThicknessMap,P=G&&!!b.sheenColorMap,oe=G&&!!b.sheenRoughnessMap,me=!!b.specularMap,le=!!b.specularColorMap,ye=!!b.specularIntensityMap,ke=ae&&!!b.transmissionMap,Ke=ae&&!!b.thicknessMap,je=!!b.gradientMap,ve=!!b.alphaMap,I=b.alphaTest>0,ge=!!b.alphaHash,_e=!!b.extensions,Ue=!!k.attributes.uv1,Ce=!!k.attributes.uv2,Je=!!k.attributes.uv3;let et=Mi;return b.toneMapped&&(we===null||we.isXRRenderTarget===!0)&&(et=n.toneMapping),{isWebGL2:u,shaderID:ie,shaderType:b.type,shaderName:b.name,vertexShader:J,fragmentShader:ce,defines:b.defines,customVertexShaderID:Se,customFragmentShaderID:Te,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Ie,instancing:De,instancingColor:De&&de.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:we===null?n.outputColorSpace:we.isXRRenderTarget===!0?we.texture.colorSpace:ri,map:Re,matcap:Ye,envMap:M,envMapMode:M&&q.mapping,envMapCubeUVHeight:$,aoMap:U,lightMap:F,bumpMap:X,normalMap:B,displacementMap:h&&Q,emissiveMap:te,normalMapObjectSpace:B&&b.normalMapType===Rg,normalMapTangentSpace:B&&b.normalMapType===wd,metalnessMap:g,roughnessMap:_,anisotropy:R,anisotropyMap:re,clearcoat:j,clearcoatMap:he,clearcoatNormalMap:Me,clearcoatRoughnessMap:Ae,iridescence:O,iridescenceMap:ne,iridescenceThicknessMap:Oe,sheen:G,sheenColorMap:P,sheenRoughnessMap:oe,specularMap:me,specularColorMap:le,specularIntensityMap:ye,transmission:ae,transmissionMap:ke,thicknessMap:Ke,gradientMap:je,opaque:b.transparent===!1&&b.blending===Ds,alphaMap:ve,alphaTest:I,alphaHash:ge,combine:b.combine,mapUv:Re&&x(b.map.channel),aoMapUv:U&&x(b.aoMap.channel),lightMapUv:F&&x(b.lightMap.channel),bumpMapUv:X&&x(b.bumpMap.channel),normalMapUv:B&&x(b.normalMap.channel),displacementMapUv:Q&&x(b.displacementMap.channel),emissiveMapUv:te&&x(b.emissiveMap.channel),metalnessMapUv:g&&x(b.metalnessMap.channel),roughnessMapUv:_&&x(b.roughnessMap.channel),anisotropyMapUv:re&&x(b.anisotropyMap.channel),clearcoatMapUv:he&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Me&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Oe&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:P&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:oe&&x(b.sheenRoughnessMap.channel),specularMapUv:me&&x(b.specularMap.channel),specularColorMapUv:le&&x(b.specularColorMap.channel),specularIntensityMapUv:ye&&x(b.specularIntensityMap.channel),transmissionMapUv:ke&&x(b.transmissionMap.channel),thicknessMapUv:Ke&&x(b.thicknessMap.channel),alphaMapUv:ve&&x(b.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(B||R),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Ce,vertexUv3s:Je,pointsUvs:de.isPoints===!0&&!!k.attributes.uv&&(Re||ve),fog:!!N,useFog:b.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:de.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:ue,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&W.length>0,shadowMapType:n.shadowMap.type,toneMapping:et,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Re&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===ut,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Sn,flipSided:b.side===Ht,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:_e&&b.extensions.derivatives===!0,extensionFragDepth:_e&&b.extensions.fragDepth===!0,extensionDrawBuffers:_e&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:_e&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_e&&b.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function d(b){const w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(const W in b.defines)w.push(W),w.push(b.defines[W]);return b.isRawShaderMaterial===!1&&(y(w,b),S(w,b),w.push(n.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function y(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function S(b,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),b.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),b.push(o.mask)}function E(b){const w=v[b.type];let W;if(w){const ee=In[w];W=Tr.clone(ee.uniforms)}else W=b.uniforms;return W}function D(b,w){let W;for(let ee=0,de=c.length;ee<de;ee++){const N=c[ee];if(N.cacheKey===w){W=N,++W.usedTimes;break}}return W===void 0&&(W=new gS(n,w,b,r),c.push(W)),W}function C(b){if(--b.usedTimes===0){const w=c.indexOf(b);c[w]=c[c.length-1],c.pop(),b.destroy()}}function A(b){l.remove(b)}function H(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:E,acquireProgram:D,releaseProgram:C,releaseShaderCache:A,programs:c,dispose:H}}function SS(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function yS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function pf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function mf(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(f,h,p,v,x,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:v,renderOrder:f.renderOrder,z:x,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=v,d.renderOrder=f.renderOrder,d.z=x,d.group=m),e++,d}function o(f,h,p,v,x,m){const d=a(f,h,p,v,x,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):t.push(d)}function l(f,h,p,v,x,m){const d=a(f,h,p,v,x,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function c(f,h){t.length>1&&t.sort(f||yS),i.length>1&&i.sort(h||pf),s.length>1&&s.sort(h||pf)}function u(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function bS(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new mf,n.set(i,[a])):s>=r.length?(a=new mf,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function ES(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new He};break;case"SpotLight":t={position:new L,direction:new L,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function TS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let wS=0;function AS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function RS(n,e){const t=new ES,i=TS(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new L);const r=new L,a=new it,o=new it;function l(u,f){let h=0,p=0,v=0;for(let ee=0;ee<9;ee++)s.probe[ee].set(0,0,0);let x=0,m=0,d=0,y=0,S=0,E=0,D=0,C=0,A=0,H=0,b=0;u.sort(AS);const w=f===!0?Math.PI:1;for(let ee=0,de=u.length;ee<de;ee++){const N=u[ee],k=N.color,V=N.intensity,q=N.distance,$=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=k.r*V*w,p+=k.g*V*w,v+=k.b*V*w;else if(N.isLightProbe){for(let ie=0;ie<9;ie++)s.probe[ie].addScaledVector(N.sh.coefficients[ie],V);b++}else if(N.isDirectionalLight){const ie=t.get(N);if(ie.color.copy(N.color).multiplyScalar(N.intensity*w),N.castShadow){const se=N.shadow,fe=i.get(N);fe.shadowBias=se.bias,fe.shadowNormalBias=se.normalBias,fe.shadowRadius=se.radius,fe.shadowMapSize=se.mapSize,s.directionalShadow[x]=fe,s.directionalShadowMap[x]=$,s.directionalShadowMatrix[x]=N.shadow.matrix,E++}s.directional[x]=ie,x++}else if(N.isSpotLight){const ie=t.get(N);ie.position.setFromMatrixPosition(N.matrixWorld),ie.color.copy(k).multiplyScalar(V*w),ie.distance=q,ie.coneCos=Math.cos(N.angle),ie.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),ie.decay=N.decay,s.spot[d]=ie;const se=N.shadow;if(N.map&&(s.spotLightMap[A]=N.map,A++,se.updateMatrices(N),N.castShadow&&H++),s.spotLightMatrix[d]=se.matrix,N.castShadow){const fe=i.get(N);fe.shadowBias=se.bias,fe.shadowNormalBias=se.normalBias,fe.shadowRadius=se.radius,fe.shadowMapSize=se.mapSize,s.spotShadow[d]=fe,s.spotShadowMap[d]=$,C++}d++}else if(N.isRectAreaLight){const ie=t.get(N);ie.color.copy(k).multiplyScalar(V),ie.halfWidth.set(N.width*.5,0,0),ie.halfHeight.set(0,N.height*.5,0),s.rectArea[y]=ie,y++}else if(N.isPointLight){const ie=t.get(N);if(ie.color.copy(N.color).multiplyScalar(N.intensity*w),ie.distance=N.distance,ie.decay=N.decay,N.castShadow){const se=N.shadow,fe=i.get(N);fe.shadowBias=se.bias,fe.shadowNormalBias=se.normalBias,fe.shadowRadius=se.radius,fe.shadowMapSize=se.mapSize,fe.shadowCameraNear=se.camera.near,fe.shadowCameraFar=se.camera.far,s.pointShadow[m]=fe,s.pointShadowMap[m]=$,s.pointShadowMatrix[m]=N.shadow.matrix,D++}s.point[m]=ie,m++}else if(N.isHemisphereLight){const ie=t.get(N);ie.skyColor.copy(N.color).multiplyScalar(V*w),ie.groundColor.copy(N.groundColor).multiplyScalar(V*w),s.hemi[S]=ie,S++}}y>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=xe.LTC_FLOAT_1,s.rectAreaLTC2=xe.LTC_FLOAT_2):(s.rectAreaLTC1=xe.LTC_HALF_1,s.rectAreaLTC2=xe.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=xe.LTC_FLOAT_1,s.rectAreaLTC2=xe.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=xe.LTC_HALF_1,s.rectAreaLTC2=xe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=h,s.ambient[1]=p,s.ambient[2]=v;const W=s.hash;(W.directionalLength!==x||W.pointLength!==m||W.spotLength!==d||W.rectAreaLength!==y||W.hemiLength!==S||W.numDirectionalShadows!==E||W.numPointShadows!==D||W.numSpotShadows!==C||W.numSpotMaps!==A||W.numLightProbes!==b)&&(s.directional.length=x,s.spot.length=d,s.rectArea.length=y,s.point.length=m,s.hemi.length=S,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=D,s.pointShadowMap.length=D,s.spotShadow.length=C,s.spotShadowMap.length=C,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=D,s.spotLightMatrix.length=C+A-H,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=b,W.directionalLength=x,W.pointLength=m,W.spotLength=d,W.rectAreaLength=y,W.hemiLength=S,W.numDirectionalShadows=E,W.numPointShadows=D,W.numSpotShadows=C,W.numSpotMaps=A,W.numLightProbes=b,s.version=wS++)}function c(u,f){let h=0,p=0,v=0,x=0,m=0;const d=f.matrixWorldInverse;for(let y=0,S=u.length;y<S;y++){const E=u[y];if(E.isDirectionalLight){const D=s.directional[h];D.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(d),h++}else if(E.isSpotLight){const D=s.spot[v];D.position.setFromMatrixPosition(E.matrixWorld),D.position.applyMatrix4(d),D.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(d),v++}else if(E.isRectAreaLight){const D=s.rectArea[x];D.position.setFromMatrixPosition(E.matrixWorld),D.position.applyMatrix4(d),o.identity(),a.copy(E.matrixWorld),a.premultiply(d),o.extractRotation(a),D.halfWidth.set(E.width*.5,0,0),D.halfHeight.set(0,E.height*.5,0),D.halfWidth.applyMatrix4(o),D.halfHeight.applyMatrix4(o),x++}else if(E.isPointLight){const D=s.point[p];D.position.setFromMatrixPosition(E.matrixWorld),D.position.applyMatrix4(d),p++}else if(E.isHemisphereLight){const D=s.hemi[m];D.direction.setFromMatrixPosition(E.matrixWorld),D.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:s}}function gf(n,e){const t=new RS(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(f){i.push(f)}function o(f){s.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function CS(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new gf(n,e),t.set(r,[l])):a>=o.length?(l=new gf(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class PS extends Ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class LS extends Ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const DS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,US=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function IS(n,e,t){let i=new ec;const s=new Ee,r=new Ee,a=new dt,o=new PS({depthPacking:Ag}),l=new LS,c={},u=t.maxTextureSize,f={[bi]:Ht,[Ht]:bi,[Sn]:Sn},h=new St({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:DS,fragmentShader:US}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const v=new vt;v.setAttribute("position",new rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Dt(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hd;let d=this.type;this.render=function(C,A,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const b=n.getRenderTarget(),w=n.getActiveCubeFace(),W=n.getActiveMipmapLevel(),ee=n.state;ee.setBlending(ei),ee.buffers.color.setClear(1,1,1,1),ee.buffers.depth.setTest(!0),ee.setScissorTest(!1);const de=d!==Xn&&this.type===Xn,N=d===Xn&&this.type!==Xn;for(let k=0,V=C.length;k<V;k++){const q=C[k],$=q.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ie=$.getFrameExtents();if(s.multiply(ie),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,$.mapSize.y=r.y)),$.map===null||de===!0||N===!0){const fe=this.type!==Xn?{minFilter:qt,magFilter:qt}:{};$.map!==null&&$.map.dispose(),$.map=new wn(s.x,s.y,fe),$.map.texture.name=q.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();const se=$.getViewportCount();for(let fe=0;fe<se;fe++){const ue=$.getViewport(fe);a.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),ee.viewport(a),$.updateMatrices(q,fe),i=$.getFrustum(),E(A,H,$.camera,q,this.type)}$.isPointLightShadow!==!0&&this.type===Xn&&y($,H),$.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(b,w,W)};function y(C,A){const H=e.update(x);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new wn(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,H,h,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,H,p,x,null)}function S(C,A,H,b){let w=null;const W=H.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(W!==void 0)w=W;else if(w=H.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const ee=w.uuid,de=A.uuid;let N=c[ee];N===void 0&&(N={},c[ee]=N);let k=N[de];k===void 0&&(k=w.clone(),N[de]=k,A.addEventListener("dispose",D)),w=k}if(w.visible=A.visible,w.wireframe=A.wireframe,b===Xn?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:f[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,H.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const ee=n.properties.get(w);ee.light=H}return w}function E(C,A,H,b,w){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&w===Xn)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,C.matrixWorld);const de=e.update(C),N=C.material;if(Array.isArray(N)){const k=de.groups;for(let V=0,q=k.length;V<q;V++){const $=k[V],ie=N[$.materialIndex];if(ie&&ie.visible){const se=S(C,ie,b,w);C.onBeforeShadow(n,C,A,H,de,se,$),n.renderBufferDirect(H,null,de,se,C,$),C.onAfterShadow(n,C,A,H,de,se,$)}}}else if(N.visible){const k=S(C,N,b,w);C.onBeforeShadow(n,C,A,H,de,k,null),n.renderBufferDirect(H,null,de,k,C,null),C.onAfterShadow(n,C,A,H,de,k,null)}}const ee=C.children;for(let de=0,N=ee.length;de<N;de++)E(ee[de],A,H,b,w)}function D(C){C.target.removeEventListener("dispose",D);for(const H in c){const b=c[H],w=C.target.uuid;w in b&&(b[w].dispose(),delete b[w])}}}function NS(n,e,t){const i=t.isWebGL2;function s(){let I=!1;const ge=new dt;let _e=null;const Ue=new dt(0,0,0,0);return{setMask:function(Ce){_e!==Ce&&!I&&(n.colorMask(Ce,Ce,Ce,Ce),_e=Ce)},setLocked:function(Ce){I=Ce},setClear:function(Ce,Je,et,Rt,kt){kt===!0&&(Ce*=Rt,Je*=Rt,et*=Rt),ge.set(Ce,Je,et,Rt),Ue.equals(ge)===!1&&(n.clearColor(Ce,Je,et,Rt),Ue.copy(ge))},reset:function(){I=!1,_e=null,Ue.set(-1,0,0,0)}}}function r(){let I=!1,ge=null,_e=null,Ue=null;return{setTest:function(Ce){Ce?Ie(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(Ce){ge!==Ce&&!I&&(n.depthMask(Ce),ge=Ce)},setFunc:function(Ce){if(_e!==Ce){switch(Ce){case ag:n.depthFunc(n.NEVER);break;case lg:n.depthFunc(n.ALWAYS);break;case cg:n.depthFunc(n.LESS);break;case Lo:n.depthFunc(n.LEQUAL);break;case ug:n.depthFunc(n.EQUAL);break;case fg:n.depthFunc(n.GEQUAL);break;case hg:n.depthFunc(n.GREATER);break;case dg:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=Ce}},setLocked:function(Ce){I=Ce},setClear:function(Ce){Ue!==Ce&&(n.clearDepth(Ce),Ue=Ce)},reset:function(){I=!1,ge=null,_e=null,Ue=null}}}function a(){let I=!1,ge=null,_e=null,Ue=null,Ce=null,Je=null,et=null,Rt=null,kt=null;return{setTest:function(ct){I||(ct?Ie(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(ct){ge!==ct&&!I&&(n.stencilMask(ct),ge=ct)},setFunc:function(ct,Vt,Cn){(_e!==ct||Ue!==Vt||Ce!==Cn)&&(n.stencilFunc(ct,Vt,Cn),_e=ct,Ue=Vt,Ce=Cn)},setOp:function(ct,Vt,Cn){(Je!==ct||et!==Vt||Rt!==Cn)&&(n.stencilOp(ct,Vt,Cn),Je=ct,et=Vt,Rt=Cn)},setLocked:function(ct){I=ct},setClear:function(ct){kt!==ct&&(n.clearStencil(ct),kt=ct)},reset:function(){I=!1,ge=null,_e=null,Ue=null,Ce=null,Je=null,et=null,Rt=null,kt=null}}}const o=new s,l=new r,c=new a,u=new WeakMap,f=new WeakMap;let h={},p={},v=new WeakMap,x=[],m=null,d=!1,y=null,S=null,E=null,D=null,C=null,A=null,H=null,b=new He(0,0,0),w=0,W=!1,ee=null,de=null,N=null,k=null,V=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ie=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(se)[1]),$=ie>=1):se.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),$=ie>=2);let fe=null,ue={};const J=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),Se=new dt().fromArray(J),Te=new dt().fromArray(ce);function we(I,ge,_e,Ue){const Ce=new Uint8Array(4),Je=n.createTexture();n.bindTexture(I,Je),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let et=0;et<_e;et++)i&&(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)?n.texImage3D(ge,0,n.RGBA,1,1,Ue,0,n.RGBA,n.UNSIGNED_BYTE,Ce):n.texImage2D(ge+et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ce);return Je}const De={};De[n.TEXTURE_2D]=we(n.TEXTURE_2D,n.TEXTURE_2D,1),De[n.TEXTURE_CUBE_MAP]=we(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(De[n.TEXTURE_2D_ARRAY]=we(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),De[n.TEXTURE_3D]=we(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ie(n.DEPTH_TEST),l.setFunc(Lo),te(!1),g(Jc),Ie(n.CULL_FACE),B(ei);function Ie(I){h[I]!==!0&&(n.enable(I),h[I]=!0)}function Re(I){h[I]!==!1&&(n.disable(I),h[I]=!1)}function Ye(I,ge){return p[I]!==ge?(n.bindFramebuffer(I,ge),p[I]=ge,i&&(I===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ge),I===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ge)),!0):!1}function M(I,ge){let _e=x,Ue=!1;if(I)if(_e=v.get(ge),_e===void 0&&(_e=[],v.set(ge,_e)),I.isWebGLMultipleRenderTargets){const Ce=I.texture;if(_e.length!==Ce.length||_e[0]!==n.COLOR_ATTACHMENT0){for(let Je=0,et=Ce.length;Je<et;Je++)_e[Je]=n.COLOR_ATTACHMENT0+Je;_e.length=Ce.length,Ue=!0}}else _e[0]!==n.COLOR_ATTACHMENT0&&(_e[0]=n.COLOR_ATTACHMENT0,Ue=!0);else _e[0]!==n.BACK&&(_e[0]=n.BACK,Ue=!0);Ue&&(t.isWebGL2?n.drawBuffers(_e):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(_e))}function U(I){return m!==I?(n.useProgram(I),m=I,!0):!1}const F={[Oi]:n.FUNC_ADD,[j0]:n.FUNC_SUBTRACT,[q0]:n.FUNC_REVERSE_SUBTRACT};if(i)F[tu]=n.MIN,F[nu]=n.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(F[tu]=I.MIN_EXT,F[nu]=I.MAX_EXT)}const X={[Y0]:n.ZERO,[K0]:n.ONE,[$0]:n.SRC_COLOR,[Ml]:n.SRC_ALPHA,[ng]:n.SRC_ALPHA_SATURATE,[eg]:n.DST_COLOR,[J0]:n.DST_ALPHA,[Z0]:n.ONE_MINUS_SRC_COLOR,[Sl]:n.ONE_MINUS_SRC_ALPHA,[tg]:n.ONE_MINUS_DST_COLOR,[Q0]:n.ONE_MINUS_DST_ALPHA,[ig]:n.CONSTANT_COLOR,[sg]:n.ONE_MINUS_CONSTANT_COLOR,[rg]:n.CONSTANT_ALPHA,[og]:n.ONE_MINUS_CONSTANT_ALPHA};function B(I,ge,_e,Ue,Ce,Je,et,Rt,kt,ct){if(I===ei){d===!0&&(Re(n.BLEND),d=!1);return}if(d===!1&&(Ie(n.BLEND),d=!0),I!==X0){if(I!==y||ct!==W){if((S!==Oi||C!==Oi)&&(n.blendEquation(n.FUNC_ADD),S=Oi,C=Oi),ct)switch(I){case Ds:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case an:n.blendFunc(n.ONE,n.ONE);break;case Qc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case eu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ds:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case an:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Qc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case eu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,D=null,A=null,H=null,b.set(0,0,0),w=0,y=I,W=ct}return}Ce=Ce||ge,Je=Je||_e,et=et||Ue,(ge!==S||Ce!==C)&&(n.blendEquationSeparate(F[ge],F[Ce]),S=ge,C=Ce),(_e!==E||Ue!==D||Je!==A||et!==H)&&(n.blendFuncSeparate(X[_e],X[Ue],X[Je],X[et]),E=_e,D=Ue,A=Je,H=et),(Rt.equals(b)===!1||kt!==w)&&(n.blendColor(Rt.r,Rt.g,Rt.b,kt),b.copy(Rt),w=kt),y=I,W=!1}function Q(I,ge){I.side===Sn?Re(n.CULL_FACE):Ie(n.CULL_FACE);let _e=I.side===Ht;ge&&(_e=!_e),te(_e),I.blending===Ds&&I.transparent===!1?B(ei):B(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),o.setMask(I.colorWrite);const Ue=I.stencilWrite;c.setTest(Ue),Ue&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),R(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Ie(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(I){ee!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),ee=I)}function g(I){I!==k0?(Ie(n.CULL_FACE),I!==de&&(I===Jc?n.cullFace(n.BACK):I===V0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),de=I}function _(I){I!==N&&($&&n.lineWidth(I),N=I)}function R(I,ge,_e){I?(Ie(n.POLYGON_OFFSET_FILL),(k!==ge||V!==_e)&&(n.polygonOffset(ge,_e),k=ge,V=_e)):Re(n.POLYGON_OFFSET_FILL)}function j(I){I?Ie(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function O(I){I===void 0&&(I=n.TEXTURE0+q-1),fe!==I&&(n.activeTexture(I),fe=I)}function G(I,ge,_e){_e===void 0&&(fe===null?_e=n.TEXTURE0+q-1:_e=fe);let Ue=ue[_e];Ue===void 0&&(Ue={type:void 0,texture:void 0},ue[_e]=Ue),(Ue.type!==I||Ue.texture!==ge)&&(fe!==_e&&(n.activeTexture(_e),fe=_e),n.bindTexture(I,ge||De[I]),Ue.type=I,Ue.texture=ge)}function ae(){const I=ue[fe];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function re(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function he(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Oe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function P(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ye(I){Se.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Se.copy(I))}function ke(I){Te.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Te.copy(I))}function Ke(I,ge){let _e=f.get(ge);_e===void 0&&(_e=new WeakMap,f.set(ge,_e));let Ue=_e.get(I);Ue===void 0&&(Ue=n.getUniformBlockIndex(ge,I.name),_e.set(I,Ue))}function je(I,ge){const Ue=f.get(ge).get(I);u.get(ge)!==Ue&&(n.uniformBlockBinding(ge,Ue,I.__bindingPointIndex),u.set(ge,Ue))}function ve(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},fe=null,ue={},p={},v=new WeakMap,x=[],m=null,d=!1,y=null,S=null,E=null,D=null,C=null,A=null,H=null,b=new He(0,0,0),w=0,W=!1,ee=null,de=null,N=null,k=null,V=null,Se.set(0,0,n.canvas.width,n.canvas.height),Te.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ie,disable:Re,bindFramebuffer:Ye,drawBuffers:M,useProgram:U,setBlending:B,setMaterial:Q,setFlipSided:te,setCullFace:g,setLineWidth:_,setPolygonOffset:R,setScissorTest:j,activeTexture:O,bindTexture:G,unbindTexture:ae,compressedTexImage2D:re,compressedTexImage3D:he,texImage2D:me,texImage3D:le,updateUBOMapping:Ke,uniformBlockBinding:je,texStorage2D:P,texStorage3D:oe,texSubImage2D:Me,texSubImage3D:Ae,compressedTexSubImage2D:ne,compressedTexSubImage3D:Oe,scissor:ye,viewport:ke,reset:ve}}function FS(n,e,t,i,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(g,_){return p?new OffscreenCanvas(g,_):Fo("canvas")}function x(g,_,R,j){let O=1;if((g.width>j||g.height>j)&&(O=j/Math.max(g.width,g.height)),O<1||_===!0)if(typeof HTMLImageElement<"u"&&g instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&g instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&g instanceof ImageBitmap){const G=_?Cl:Math.floor,ae=G(O*g.width),re=G(O*g.height);f===void 0&&(f=v(ae,re));const he=R?v(ae,re):f;return he.width=ae,he.height=re,he.getContext("2d").drawImage(g,0,0,ae,re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+g.width+"x"+g.height+") to ("+ae+"x"+re+")."),he}else return"data"in g&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+g.width+"x"+g.height+")."),g;return g}function m(g){return Lu(g.width)&&Lu(g.height)}function d(g){return o?!1:g.wrapS!==yn||g.wrapT!==yn||g.minFilter!==qt&&g.minFilter!==hn}function y(g,_){return g.generateMipmaps&&_&&g.minFilter!==qt&&g.minFilter!==hn}function S(g){n.generateMipmap(g)}function E(g,_,R,j,O=!1){if(o===!1)return _;if(g!==null){if(n[g]!==void 0)return n[g];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+g+"'")}let G=_;if(_===n.RED&&(R===n.FLOAT&&(G=n.R32F),R===n.HALF_FLOAT&&(G=n.R16F),R===n.UNSIGNED_BYTE&&(G=n.R8)),_===n.RED_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.R8UI),R===n.UNSIGNED_SHORT&&(G=n.R16UI),R===n.UNSIGNED_INT&&(G=n.R32UI),R===n.BYTE&&(G=n.R8I),R===n.SHORT&&(G=n.R16I),R===n.INT&&(G=n.R32I)),_===n.RG&&(R===n.FLOAT&&(G=n.RG32F),R===n.HALF_FLOAT&&(G=n.RG16F),R===n.UNSIGNED_BYTE&&(G=n.RG8)),_===n.RGBA){const ae=O?Do:st.getTransfer(j);R===n.FLOAT&&(G=n.RGBA32F),R===n.HALF_FLOAT&&(G=n.RGBA16F),R===n.UNSIGNED_BYTE&&(G=ae===ut?n.SRGB8_ALPHA8:n.RGBA8),R===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),R===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function D(g,_,R){return y(g,R)===!0||g.isFramebufferTexture&&g.minFilter!==qt&&g.minFilter!==hn?Math.log2(Math.max(_.width,_.height))+1:g.mipmaps!==void 0&&g.mipmaps.length>0?g.mipmaps.length:g.isCompressedTexture&&Array.isArray(g.image)?_.mipmaps.length:1}function C(g){return g===qt||g===iu||g===wa?n.NEAREST:n.LINEAR}function A(g){const _=g.target;_.removeEventListener("dispose",A),b(_),_.isVideoTexture&&u.delete(_)}function H(g){const _=g.target;_.removeEventListener("dispose",H),W(_)}function b(g){const _=i.get(g);if(_.__webglInit===void 0)return;const R=g.source,j=h.get(R);if(j){const O=j[_.__cacheKey];O.usedTimes--,O.usedTimes===0&&w(g),Object.keys(j).length===0&&h.delete(R)}i.remove(g)}function w(g){const _=i.get(g);n.deleteTexture(_.__webglTexture);const R=g.source,j=h.get(R);delete j[_.__cacheKey],a.memory.textures--}function W(g){const _=g.texture,R=i.get(g),j=i.get(_);if(j.__webglTexture!==void 0&&(n.deleteTexture(j.__webglTexture),a.memory.textures--),g.depthTexture&&g.depthTexture.dispose(),g.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(R.__webglFramebuffer[O]))for(let G=0;G<R.__webglFramebuffer[O].length;G++)n.deleteFramebuffer(R.__webglFramebuffer[O][G]);else n.deleteFramebuffer(R.__webglFramebuffer[O]);R.__webglDepthbuffer&&n.deleteRenderbuffer(R.__webglDepthbuffer[O])}else{if(Array.isArray(R.__webglFramebuffer))for(let O=0;O<R.__webglFramebuffer.length;O++)n.deleteFramebuffer(R.__webglFramebuffer[O]);else n.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&n.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&n.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let O=0;O<R.__webglColorRenderbuffer.length;O++)R.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(R.__webglColorRenderbuffer[O]);R.__webglDepthRenderbuffer&&n.deleteRenderbuffer(R.__webglDepthRenderbuffer)}if(g.isWebGLMultipleRenderTargets)for(let O=0,G=_.length;O<G;O++){const ae=i.get(_[O]);ae.__webglTexture&&(n.deleteTexture(ae.__webglTexture),a.memory.textures--),i.remove(_[O])}i.remove(_),i.remove(g)}let ee=0;function de(){ee=0}function N(){const g=ee;return g>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+g+" texture units while this GPU supports only "+s.maxTextures),ee+=1,g}function k(g){const _=[];return _.push(g.wrapS),_.push(g.wrapT),_.push(g.wrapR||0),_.push(g.magFilter),_.push(g.minFilter),_.push(g.anisotropy),_.push(g.internalFormat),_.push(g.format),_.push(g.type),_.push(g.generateMipmaps),_.push(g.premultiplyAlpha),_.push(g.flipY),_.push(g.unpackAlignment),_.push(g.colorSpace),_.join()}function V(g,_){const R=i.get(g);if(g.isVideoTexture&&Q(g),g.isRenderTargetTexture===!1&&g.version>0&&R.__version!==g.version){const j=g.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(R,g,_);return}}t.bindTexture(n.TEXTURE_2D,R.__webglTexture,n.TEXTURE0+_)}function q(g,_){const R=i.get(g);if(g.version>0&&R.__version!==g.version){Se(R,g,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,R.__webglTexture,n.TEXTURE0+_)}function $(g,_){const R=i.get(g);if(g.version>0&&R.__version!==g.version){Se(R,g,_);return}t.bindTexture(n.TEXTURE_3D,R.__webglTexture,n.TEXTURE0+_)}function ie(g,_){const R=i.get(g);if(g.version>0&&R.__version!==g.version){Te(R,g,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+_)}const se={[El]:n.REPEAT,[yn]:n.CLAMP_TO_EDGE,[Tl]:n.MIRRORED_REPEAT},fe={[qt]:n.NEAREST,[iu]:n.NEAREST_MIPMAP_NEAREST,[wa]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[_g]:n.LINEAR_MIPMAP_NEAREST,[Er]:n.LINEAR_MIPMAP_LINEAR},ue={[Cg]:n.NEVER,[Ng]:n.ALWAYS,[Pg]:n.LESS,[Ad]:n.LEQUAL,[Lg]:n.EQUAL,[Ig]:n.GEQUAL,[Dg]:n.GREATER,[Ug]:n.NOTEQUAL};function J(g,_,R){if(R?(n.texParameteri(g,n.TEXTURE_WRAP_S,se[_.wrapS]),n.texParameteri(g,n.TEXTURE_WRAP_T,se[_.wrapT]),(g===n.TEXTURE_3D||g===n.TEXTURE_2D_ARRAY)&&n.texParameteri(g,n.TEXTURE_WRAP_R,se[_.wrapR]),n.texParameteri(g,n.TEXTURE_MAG_FILTER,fe[_.magFilter]),n.texParameteri(g,n.TEXTURE_MIN_FILTER,fe[_.minFilter])):(n.texParameteri(g,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(g,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(g===n.TEXTURE_3D||g===n.TEXTURE_2D_ARRAY)&&n.texParameteri(g,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(_.wrapS!==yn||_.wrapT!==yn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(g,n.TEXTURE_MAG_FILTER,C(_.magFilter)),n.texParameteri(g,n.TEXTURE_MIN_FILTER,C(_.minFilter)),_.minFilter!==qt&&_.minFilter!==hn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(n.texParameteri(g,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(g,n.TEXTURE_COMPARE_FUNC,ue[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const j=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===qt||_.minFilter!==wa&&_.minFilter!==Er||_.type===xi&&e.has("OES_texture_float_linear")===!1||o===!1&&_.type===ti&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||i.get(_).__currentAnisotropy)&&(n.texParameterf(g,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy)}}function ce(g,_){let R=!1;g.__webglInit===void 0&&(g.__webglInit=!0,_.addEventListener("dispose",A));const j=_.source;let O=h.get(j);O===void 0&&(O={},h.set(j,O));const G=k(_);if(G!==g.__cacheKey){O[G]===void 0&&(O[G]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,R=!0),O[G].usedTimes++;const ae=O[g.__cacheKey];ae!==void 0&&(O[g.__cacheKey].usedTimes--,ae.usedTimes===0&&w(_)),g.__cacheKey=G,g.__webglTexture=O[G].texture}return R}function Se(g,_,R){let j=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(j=n.TEXTURE_3D);const O=ce(g,_),G=_.source;t.bindTexture(j,g.__webglTexture,n.TEXTURE0+R);const ae=i.get(G);if(G.version!==ae.__version||O===!0){t.activeTexture(n.TEXTURE0+R);const re=st.getPrimaries(st.workingColorSpace),he=_.colorSpace===pn?null:st.getPrimaries(_.colorSpace),Me=_.colorSpace===pn||re===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ae=d(_)&&m(_.image)===!1;let ne=x(_.image,Ae,!1,s.maxTextureSize);ne=te(_,ne);const Oe=m(ne)||o,P=r.convert(_.format,_.colorSpace);let oe=r.convert(_.type),me=E(_.internalFormat,P,oe,_.colorSpace,_.isVideoTexture);J(j,_,Oe);let le;const ye=_.mipmaps,ke=o&&_.isVideoTexture!==!0&&me!==Ed,Ke=ae.__version===void 0||O===!0,je=D(_,ne,Oe);if(_.isDepthTexture)me=n.DEPTH_COMPONENT,o?_.type===xi?me=n.DEPTH_COMPONENT32F:_.type===vi?me=n.DEPTH_COMPONENT24:_.type===Vi?me=n.DEPTH24_STENCIL8:me=n.DEPTH_COMPONENT16:_.type===xi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===Wi&&me===n.DEPTH_COMPONENT&&_.type!==Zl&&_.type!==vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=vi,oe=r.convert(_.type)),_.format===Hs&&me===n.DEPTH_COMPONENT&&(me=n.DEPTH_STENCIL,_.type!==Vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=Vi,oe=r.convert(_.type))),Ke&&(ke?t.texStorage2D(n.TEXTURE_2D,1,me,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,me,ne.width,ne.height,0,P,oe,null));else if(_.isDataTexture)if(ye.length>0&&Oe){ke&&Ke&&t.texStorage2D(n.TEXTURE_2D,je,me,ye[0].width,ye[0].height);for(let ve=0,I=ye.length;ve<I;ve++)le=ye[ve],ke?t.texSubImage2D(n.TEXTURE_2D,ve,0,0,le.width,le.height,P,oe,le.data):t.texImage2D(n.TEXTURE_2D,ve,me,le.width,le.height,0,P,oe,le.data);_.generateMipmaps=!1}else ke?(Ke&&t.texStorage2D(n.TEXTURE_2D,je,me,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,P,oe,ne.data)):t.texImage2D(n.TEXTURE_2D,0,me,ne.width,ne.height,0,P,oe,ne.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){ke&&Ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,je,me,ye[0].width,ye[0].height,ne.depth);for(let ve=0,I=ye.length;ve<I;ve++)le=ye[ve],_.format!==bn?P!==null?ke?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,le.width,le.height,ne.depth,P,le.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ve,me,le.width,le.height,ne.depth,0,le.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,le.width,le.height,ne.depth,P,oe,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ve,me,le.width,le.height,ne.depth,0,P,oe,le.data)}else{ke&&Ke&&t.texStorage2D(n.TEXTURE_2D,je,me,ye[0].width,ye[0].height);for(let ve=0,I=ye.length;ve<I;ve++)le=ye[ve],_.format!==bn?P!==null?ke?t.compressedTexSubImage2D(n.TEXTURE_2D,ve,0,0,le.width,le.height,P,le.data):t.compressedTexImage2D(n.TEXTURE_2D,ve,me,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?t.texSubImage2D(n.TEXTURE_2D,ve,0,0,le.width,le.height,P,oe,le.data):t.texImage2D(n.TEXTURE_2D,ve,me,le.width,le.height,0,P,oe,le.data)}else if(_.isDataArrayTexture)ke?(Ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,je,me,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,P,oe,ne.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,ne.width,ne.height,ne.depth,0,P,oe,ne.data);else if(_.isData3DTexture)ke?(Ke&&t.texStorage3D(n.TEXTURE_3D,je,me,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,P,oe,ne.data)):t.texImage3D(n.TEXTURE_3D,0,me,ne.width,ne.height,ne.depth,0,P,oe,ne.data);else if(_.isFramebufferTexture){if(Ke)if(ke)t.texStorage2D(n.TEXTURE_2D,je,me,ne.width,ne.height);else{let ve=ne.width,I=ne.height;for(let ge=0;ge<je;ge++)t.texImage2D(n.TEXTURE_2D,ge,me,ve,I,0,P,oe,null),ve>>=1,I>>=1}}else if(ye.length>0&&Oe){ke&&Ke&&t.texStorage2D(n.TEXTURE_2D,je,me,ye[0].width,ye[0].height);for(let ve=0,I=ye.length;ve<I;ve++)le=ye[ve],ke?t.texSubImage2D(n.TEXTURE_2D,ve,0,0,P,oe,le):t.texImage2D(n.TEXTURE_2D,ve,me,P,oe,le);_.generateMipmaps=!1}else ke?(Ke&&t.texStorage2D(n.TEXTURE_2D,je,me,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,P,oe,ne)):t.texImage2D(n.TEXTURE_2D,0,me,P,oe,ne);y(_,Oe)&&S(j),ae.__version=G.version,_.onUpdate&&_.onUpdate(_)}g.__version=_.version}function Te(g,_,R){if(_.image.length!==6)return;const j=ce(g,_),O=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,g.__webglTexture,n.TEXTURE0+R);const G=i.get(O);if(O.version!==G.__version||j===!0){t.activeTexture(n.TEXTURE0+R);const ae=st.getPrimaries(st.workingColorSpace),re=_.colorSpace===pn?null:st.getPrimaries(_.colorSpace),he=_.colorSpace===pn||ae===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Me=_.isCompressedTexture||_.image[0].isCompressedTexture,Ae=_.image[0]&&_.image[0].isDataTexture,ne=[];for(let ve=0;ve<6;ve++)!Me&&!Ae?ne[ve]=x(_.image[ve],!1,!0,s.maxCubemapSize):ne[ve]=Ae?_.image[ve].image:_.image[ve],ne[ve]=te(_,ne[ve]);const Oe=ne[0],P=m(Oe)||o,oe=r.convert(_.format,_.colorSpace),me=r.convert(_.type),le=E(_.internalFormat,oe,me,_.colorSpace),ye=o&&_.isVideoTexture!==!0,ke=G.__version===void 0||j===!0;let Ke=D(_,Oe,P);J(n.TEXTURE_CUBE_MAP,_,P);let je;if(Me){ye&&ke&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ke,le,Oe.width,Oe.height);for(let ve=0;ve<6;ve++){je=ne[ve].mipmaps;for(let I=0;I<je.length;I++){const ge=je[I];_.format!==bn?oe!==null?ye?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I,0,0,ge.width,ge.height,oe,ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I,le,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I,0,0,ge.width,ge.height,oe,me,ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I,le,ge.width,ge.height,0,oe,me,ge.data)}}}else{je=_.mipmaps,ye&&ke&&(je.length>0&&Ke++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Ke,le,ne[0].width,ne[0].height));for(let ve=0;ve<6;ve++)if(Ae){ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ne[ve].width,ne[ve].height,oe,me,ne[ve].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,le,ne[ve].width,ne[ve].height,0,oe,me,ne[ve].data);for(let I=0;I<je.length;I++){const _e=je[I].image[ve].image;ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I+1,0,0,_e.width,_e.height,oe,me,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I+1,le,_e.width,_e.height,0,oe,me,_e.data)}}else{ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,oe,me,ne[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,le,oe,me,ne[ve]);for(let I=0;I<je.length;I++){const ge=je[I];ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I+1,0,0,oe,me,ge.image[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,I+1,le,oe,me,ge.image[ve])}}}y(_,P)&&S(n.TEXTURE_CUBE_MAP),G.__version=O.version,_.onUpdate&&_.onUpdate(_)}g.__version=_.version}function we(g,_,R,j,O,G){const ae=r.convert(R.format,R.colorSpace),re=r.convert(R.type),he=E(R.internalFormat,ae,re,R.colorSpace);if(!i.get(_).__hasExternalTextures){const Ae=Math.max(1,_.width>>G),ne=Math.max(1,_.height>>G);O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?t.texImage3D(O,G,he,Ae,ne,_.depth,0,ae,re,null):t.texImage2D(O,G,he,Ae,ne,0,ae,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,g),B(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,O,i.get(R).__webglTexture,0,X(_)):(O===n.TEXTURE_2D||O>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&O<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,O,i.get(R).__webglTexture,G),t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(g,_,R){if(n.bindRenderbuffer(n.RENDERBUFFER,g),_.depthBuffer&&!_.stencilBuffer){let j=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(R||B(_)){const O=_.depthTexture;O&&O.isDepthTexture&&(O.type===xi?j=n.DEPTH_COMPONENT32F:O.type===vi&&(j=n.DEPTH_COMPONENT24));const G=X(_);B(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,G,j,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,G,j,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,j,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,g)}else if(_.depthBuffer&&_.stencilBuffer){const j=X(_);R&&B(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,j,n.DEPTH24_STENCIL8,_.width,_.height):B(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,j,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,g)}else{const j=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let O=0;O<j.length;O++){const G=j[O],ae=r.convert(G.format,G.colorSpace),re=r.convert(G.type),he=E(G.internalFormat,ae,re,G.colorSpace),Me=X(_);R&&B(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,he,_.width,_.height):B(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Me,he,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,he,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ie(g,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,g),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V(_.depthTexture,0);const j=i.get(_.depthTexture).__webglTexture,O=X(_);if(_.depthTexture.format===Wi)B(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,O):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(_.depthTexture.format===Hs)B(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,O):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Re(g){const _=i.get(g),R=g.isWebGLCubeRenderTarget===!0;if(g.depthTexture&&!_.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");Ie(_.__webglFramebuffer,g)}else if(R){_.__webglDepthbuffer=[];for(let j=0;j<6;j++)t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[j]),_.__webglDepthbuffer[j]=n.createRenderbuffer(),De(_.__webglDepthbuffer[j],g,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),De(_.__webglDepthbuffer,g,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(g,_,R){const j=i.get(g);_!==void 0&&we(j.__webglFramebuffer,g,g.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),R!==void 0&&Re(g)}function M(g){const _=g.texture,R=i.get(g),j=i.get(_);g.addEventListener("dispose",H),g.isWebGLMultipleRenderTargets!==!0&&(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=_.version,a.memory.textures++);const O=g.isWebGLCubeRenderTarget===!0,G=g.isWebGLMultipleRenderTargets===!0,ae=m(g)||o;if(O){R.__webglFramebuffer=[];for(let re=0;re<6;re++)if(o&&_.mipmaps&&_.mipmaps.length>0){R.__webglFramebuffer[re]=[];for(let he=0;he<_.mipmaps.length;he++)R.__webglFramebuffer[re][he]=n.createFramebuffer()}else R.__webglFramebuffer[re]=n.createFramebuffer()}else{if(o&&_.mipmaps&&_.mipmaps.length>0){R.__webglFramebuffer=[];for(let re=0;re<_.mipmaps.length;re++)R.__webglFramebuffer[re]=n.createFramebuffer()}else R.__webglFramebuffer=n.createFramebuffer();if(G)if(s.drawBuffers){const re=g.texture;for(let he=0,Me=re.length;he<Me;he++){const Ae=i.get(re[he]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&g.samples>0&&B(g)===!1){const re=G?_:[_];R.__webglMultisampledFramebuffer=n.createFramebuffer(),R.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let he=0;he<re.length;he++){const Me=re[he];R.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,R.__webglColorRenderbuffer[he]);const Ae=r.convert(Me.format,Me.colorSpace),ne=r.convert(Me.type),Oe=E(Me.internalFormat,Ae,ne,Me.colorSpace,g.isXRRenderTarget===!0),P=X(g);n.renderbufferStorageMultisample(n.RENDERBUFFER,P,Oe,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,R.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),g.depthBuffer&&(R.__webglDepthRenderbuffer=n.createRenderbuffer(),De(R.__webglDepthRenderbuffer,g,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(O){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),J(n.TEXTURE_CUBE_MAP,_,ae);for(let re=0;re<6;re++)if(o&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)we(R.__webglFramebuffer[re][he],g,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,he);else we(R.__webglFramebuffer[re],g,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);y(_,ae)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){const re=g.texture;for(let he=0,Me=re.length;he<Me;he++){const Ae=re[he],ne=i.get(Ae);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),J(n.TEXTURE_2D,Ae,ae),we(R.__webglFramebuffer,g,Ae,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),y(Ae,ae)&&S(n.TEXTURE_2D)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((g.isWebGL3DRenderTarget||g.isWebGLArrayRenderTarget)&&(o?re=g.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(re,j.__webglTexture),J(re,_,ae),o&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)we(R.__webglFramebuffer[he],g,_,n.COLOR_ATTACHMENT0,re,he);else we(R.__webglFramebuffer,g,_,n.COLOR_ATTACHMENT0,re,0);y(_,ae)&&S(re),t.unbindTexture()}g.depthBuffer&&Re(g)}function U(g){const _=m(g)||o,R=g.isWebGLMultipleRenderTargets===!0?g.texture:[g.texture];for(let j=0,O=R.length;j<O;j++){const G=R[j];if(y(G,_)){const ae=g.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,re=i.get(G).__webglTexture;t.bindTexture(ae,re),S(ae),t.unbindTexture()}}}function F(g){if(o&&g.samples>0&&B(g)===!1){const _=g.isWebGLMultipleRenderTargets?g.texture:[g.texture],R=g.width,j=g.height;let O=n.COLOR_BUFFER_BIT;const G=[],ae=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=i.get(g),he=g.isWebGLMultipleRenderTargets===!0;if(he)for(let Me=0;Me<_.length;Me++)t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let Me=0;Me<_.length;Me++){G.push(n.COLOR_ATTACHMENT0+Me),g.depthBuffer&&G.push(ae);const Ae=re.__ignoreDepthValues!==void 0?re.__ignoreDepthValues:!1;if(Ae===!1&&(g.depthBuffer&&(O|=n.DEPTH_BUFFER_BIT),g.stencilBuffer&&(O|=n.STENCIL_BUFFER_BIT)),he&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,re.__webglColorRenderbuffer[Me]),Ae===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ae]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ae])),he){const ne=i.get(_[Me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,R,j,0,0,R,j,O,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,G)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let Me=0;Me<_.length;Me++){t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,re.__webglColorRenderbuffer[Me]);const Ae=i.get(_[Me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}}function X(g){return Math.min(s.maxSamples,g.samples)}function B(g){const _=i.get(g);return o&&g.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Q(g){const _=a.render.frame;u.get(g)!==_&&(u.set(g,_),g.update())}function te(g,_){const R=g.colorSpace,j=g.format,O=g.type;return g.isCompressedTexture===!0||g.isVideoTexture===!0||g.format===Al||R!==ri&&R!==pn&&(st.getTransfer(R)===ut?o===!1?e.has("EXT_sRGB")===!0&&j===bn?(g.format=Al,g.minFilter=hn,g.generateMipmaps=!1):_=Cd.sRGBToLinear(_):(j!==bn||O!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),_}this.allocateTextureUnit=N,this.resetTextureUnits=de,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=ie,this.rebindTextures=Ye,this.setupRenderTarget=M,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=Re,this.setupFrameBufferTexture=we,this.useMultisampledRTT=B}function OS(n,e,t){const i=t.isWebGL2;function s(r,a=pn){let o;const l=st.getTransfer(a);if(r===Si)return n.UNSIGNED_BYTE;if(r===xd)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Md)return n.UNSIGNED_SHORT_5_5_5_1;if(r===vg)return n.BYTE;if(r===xg)return n.SHORT;if(r===Zl)return n.UNSIGNED_SHORT;if(r===vd)return n.INT;if(r===vi)return n.UNSIGNED_INT;if(r===xi)return n.FLOAT;if(r===ti)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Mg)return n.ALPHA;if(r===bn)return n.RGBA;if(r===Sg)return n.LUMINANCE;if(r===yg)return n.LUMINANCE_ALPHA;if(r===Wi)return n.DEPTH_COMPONENT;if(r===Hs)return n.DEPTH_STENCIL;if(r===Al)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===bg)return n.RED;if(r===Sd)return n.RED_INTEGER;if(r===Eg)return n.RG;if(r===yd)return n.RG_INTEGER;if(r===bd)return n.RGBA_INTEGER;if(r===Aa||r===Ra||r===Ca||r===Pa)if(l===ut)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Aa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ra)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ca)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Pa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Aa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ra)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ca)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Pa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===su||r===ru||r===ou||r===au)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===su)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ru)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ou)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===au)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ed)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===lu||r===cu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===lu)return l===ut?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===cu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===uu||r===fu||r===hu||r===du||r===pu||r===mu||r===gu||r===_u||r===vu||r===xu||r===Mu||r===Su||r===yu||r===bu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===uu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===fu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===hu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===du)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===pu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===mu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===gu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===_u)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===vu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===xu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Mu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Su)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===yu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===bu)return l===ut?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===La||r===Eu||r===Tu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===La)return l===ut?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Eu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Tu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Tg||r===wu||r===Au||r===Ru)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===La)return o.COMPRESSED_RED_RGTC1_EXT;if(r===wu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Au)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ru)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Vi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class BS extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class gn extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zS={type:"move"};class tl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),d=this._getHandJoint(c,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zS)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new gn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class HS extends Yi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,v=null;const x=t.getContextAttributes();let m=null,d=null;const y=[],S=[],E=new Ee;let D=null;const C=new sn;C.layers.enable(1),C.viewport=new dt;const A=new sn;A.layers.enable(2),A.viewport=new dt;const H=[C,A],b=new BS;b.layers.enable(1),b.layers.enable(2);let w=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ce=y[J];return ce===void 0&&(ce=new tl,y[J]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(J){let ce=y[J];return ce===void 0&&(ce=new tl,y[J]=ce),ce.getGripSpace()},this.getHand=function(J){let ce=y[J];return ce===void 0&&(ce=new tl,y[J]=ce),ce.getHandSpace()};function ee(J){const ce=S.indexOf(J.inputSource);if(ce===-1)return;const Se=y[ce];Se!==void 0&&(Se.update(J.inputSource,J.frame,c||a),Se.dispatchEvent({type:J.type,data:J.inputSource}))}function de(){s.removeEventListener("select",ee),s.removeEventListener("selectstart",ee),s.removeEventListener("selectend",ee),s.removeEventListener("squeeze",ee),s.removeEventListener("squeezestart",ee),s.removeEventListener("squeezeend",ee),s.removeEventListener("end",de),s.removeEventListener("inputsourceschange",N);for(let J=0;J<y.length;J++){const ce=S[J];ce!==null&&(S[J]=null,y[J].disconnect(ce))}w=null,W=null,e.setRenderTarget(m),p=null,h=null,f=null,s=null,d=null,ue.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",ee),s.addEventListener("selectstart",ee),s.addEventListener("selectend",ee),s.addEventListener("squeeze",ee),s.addEventListener("squeezestart",ee),s.addEventListener("squeezeend",ee),s.addEventListener("end",de),s.addEventListener("inputsourceschange",N),x.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(E),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ce={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new wn(p.framebufferWidth,p.framebufferHeight,{format:bn,type:Si,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let ce=null,Se=null,Te=null;x.depth&&(Te=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=x.stencil?Hs:Wi,Se=x.stencil?Vi:vi);const we={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:r};f=new XRWebGLBinding(s,t),h=f.createProjectionLayer(we),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),d=new wn(h.textureWidth,h.textureHeight,{format:bn,type:Si,depthTexture:new Hd(h.textureWidth,h.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const De=e.properties.get(d);De.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ue.setContext(s),ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function N(J){for(let ce=0;ce<J.removed.length;ce++){const Se=J.removed[ce],Te=S.indexOf(Se);Te>=0&&(S[Te]=null,y[Te].disconnect(Se))}for(let ce=0;ce<J.added.length;ce++){const Se=J.added[ce];let Te=S.indexOf(Se);if(Te===-1){for(let De=0;De<y.length;De++)if(De>=S.length){S.push(Se),Te=De;break}else if(S[De]===null){S[De]=Se,Te=De;break}if(Te===-1)break}const we=y[Te];we&&we.connect(Se)}}const k=new L,V=new L;function q(J,ce,Se){k.setFromMatrixPosition(ce.matrixWorld),V.setFromMatrixPosition(Se.matrixWorld);const Te=k.distanceTo(V),we=ce.projectionMatrix.elements,De=Se.projectionMatrix.elements,Ie=we[14]/(we[10]-1),Re=we[14]/(we[10]+1),Ye=(we[9]+1)/we[5],M=(we[9]-1)/we[5],U=(we[8]-1)/we[0],F=(De[8]+1)/De[0],X=Ie*U,B=Ie*F,Q=Te/(-U+F),te=Q*-U;ce.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(te),J.translateZ(Q),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const g=Ie+Q,_=Re+Q,R=X-te,j=B+(Te-te),O=Ye*Re/_*g,G=M*Re/_*g;J.projectionMatrix.makePerspective(R,j,O,G,g,_),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function $(J,ce){ce===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ce.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;b.near=A.near=C.near=J.near,b.far=A.far=C.far=J.far,(w!==b.near||W!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),w=b.near,W=b.far);const ce=J.parent,Se=b.cameras;$(b,ce);for(let Te=0;Te<Se.length;Te++)$(Se[Te],ce);Se.length===2?q(b,C,A):b.projectionMatrix.copy(C.projectionMatrix),ie(J,b,ce)};function ie(J,ce,Se){Se===null?J.matrix.copy(ce.matrixWorld):(J.matrix.copy(Se.matrixWorld),J.matrix.invert(),J.matrix.multiply(ce.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Rl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(J){l=J,h!==null&&(h.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)};let se=null;function fe(J,ce){if(u=ce.getViewerPose(c||a),v=ce,u!==null){const Se=u.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let Te=!1;Se.length!==b.cameras.length&&(b.cameras.length=0,Te=!0);for(let we=0;we<Se.length;we++){const De=Se[we];let Ie=null;if(p!==null)Ie=p.getViewport(De);else{const Ye=f.getViewSubImage(h,De);Ie=Ye.viewport,we===0&&(e.setRenderTargetTextures(d,Ye.colorTexture,h.ignoreDepthValues?void 0:Ye.depthStencilTexture),e.setRenderTarget(d))}let Re=H[we];Re===void 0&&(Re=new sn,Re.layers.enable(we),Re.viewport=new dt,H[we]=Re),Re.matrix.fromArray(De.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(De.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),we===0&&(b.matrix.copy(Re.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),Te===!0&&b.cameras.push(Re)}}for(let Se=0;Se<y.length;Se++){const Te=S[Se],we=y[Se];Te!==null&&we!==void 0&&we.update(Te,ce,c||a)}se&&se(J,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),v=null}const ue=new Bd;ue.setAnimationLoop(fe),this.setAnimationLoop=function(J){se=J},this.dispose=function(){}}}function GS(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Nd(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,y,S,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,E)):d.isMeshMatcapMaterial?(r(m,d),v(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,y,S):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ht&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ht&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=e.get(d).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const S=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*S,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,S){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=S*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ht&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const y=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function kS(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,S){const E=S.program;i.uniformBlockBinding(y,E)}function c(y,S){let E=s[y.id];E===void 0&&(v(y),E=u(y),s[y.id]=E,y.addEventListener("dispose",m));const D=S.program;i.updateUBOMapping(y,D);const C=e.render.frame;r[y.id]!==C&&(h(y),r[y.id]=C)}function u(y){const S=f();y.__bindingPointIndex=S;const E=n.createBuffer(),D=y.__size,C=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,D,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,E),E}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const S=s[y.id],E=y.uniforms,D=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let C=0,A=E.length;C<A;C++){const H=Array.isArray(E[C])?E[C]:[E[C]];for(let b=0,w=H.length;b<w;b++){const W=H[b];if(p(W,C,b,D)===!0){const ee=W.__offset,de=Array.isArray(W.value)?W.value:[W.value];let N=0;for(let k=0;k<de.length;k++){const V=de[k],q=x(V);typeof V=="number"||typeof V=="boolean"?(W.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,ee+N,W.__data)):V.isMatrix3?(W.__data[0]=V.elements[0],W.__data[1]=V.elements[1],W.__data[2]=V.elements[2],W.__data[3]=0,W.__data[4]=V.elements[3],W.__data[5]=V.elements[4],W.__data[6]=V.elements[5],W.__data[7]=0,W.__data[8]=V.elements[6],W.__data[9]=V.elements[7],W.__data[10]=V.elements[8],W.__data[11]=0):(V.toArray(W.__data,N),N+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,ee,W.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,S,E,D){const C=y.value,A=S+"_"+E;if(D[A]===void 0)return typeof C=="number"||typeof C=="boolean"?D[A]=C:D[A]=C.clone(),!0;{const H=D[A];if(typeof C=="number"||typeof C=="boolean"){if(H!==C)return D[A]=C,!0}else if(H.equals(C)===!1)return H.copy(C),!0}return!1}function v(y){const S=y.uniforms;let E=0;const D=16;for(let A=0,H=S.length;A<H;A++){const b=Array.isArray(S[A])?S[A]:[S[A]];for(let w=0,W=b.length;w<W;w++){const ee=b[w],de=Array.isArray(ee.value)?ee.value:[ee.value];for(let N=0,k=de.length;N<k;N++){const V=de[N],q=x(V),$=E%D;$!==0&&D-$<q.boundary&&(E+=D-$),ee.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=E,E+=q.storage}}}const C=E%D;return C>0&&(E+=D-C),y.__size=E,y.__cache={},this}function x(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function m(y){const S=y.target;S.removeEventListener("dispose",m);const E=a.indexOf(S.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function d(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class jd{constructor(e={}){const{canvas:t=zg(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=a;const p=new Uint32Array(4),v=new Int32Array(4);let x=null,m=null;const d=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this._useLegacyLights=!1,this.toneMapping=Mi,this.toneMappingExposure=1;const S=this;let E=!1,D=0,C=0,A=null,H=-1,b=null;const w=new dt,W=new dt;let ee=null;const de=new He(0);let N=0,k=t.width,V=t.height,q=1,$=null,ie=null;const se=new dt(0,0,k,V),fe=new dt(0,0,k,V);let ue=!1;const J=new ec;let ce=!1,Se=!1,Te=null;const we=new it,De=new Ee,Ie=new L,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ye(){return A===null?q:1}let M=i;function U(T,z){for(let K=0;K<T.length;K++){const Z=T[K],Y=t.getContext(Z,z);if(Y!==null)return Y}return null}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yl}`),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",ge,!1),M===null){const z=["webgl2","webgl","experimental-webgl"];if(S.isWebGL1Renderer===!0&&z.shift(),M=U(z,T),M===null)throw U(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&M instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),M.getShaderPrecisionFormat===void 0&&(M.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let F,X,B,Q,te,g,_,R,j,O,G,ae,re,he,Me,Ae,ne,Oe,P,oe,me,le,ye,ke;function Ke(){F=new Jx(M),X=new jx(M,F,e),F.init(X),le=new OS(M,F,X),B=new NS(M,F,X),Q=new tM(M),te=new SS,g=new FS(M,F,B,te,X,le,Q),_=new Yx(S),R=new Zx(S),j=new c_(M,X),ye=new Wx(M,F,j,X),O=new Qx(M,j,Q,ye),G=new rM(M,O,j,Q),P=new sM(M,X,g),Ae=new qx(te),ae=new MS(S,_,R,F,X,ye,Ae),re=new GS(S,te),he=new bS,Me=new CS(F,X),Oe=new Vx(S,_,R,B,G,h,l),ne=new IS(S,G,X),ke=new kS(M,Q,X,B),oe=new Xx(M,F,Q,X),me=new eM(M,F,Q,X),Q.programs=ae.programs,S.capabilities=X,S.extensions=F,S.properties=te,S.renderLists=he,S.shadowMap=ne,S.state=B,S.info=Q}Ke();const je=new HS(S,M);this.xr=je,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){const T=F.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=F.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(T){T!==void 0&&(q=T,this.setSize(k,V,!1))},this.getSize=function(T){return T.set(k,V)},this.setSize=function(T,z,K=!0){if(je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=T,V=z,t.width=Math.floor(T*q),t.height=Math.floor(z*q),K===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(k*q,V*q).floor()},this.setDrawingBufferSize=function(T,z,K){k=T,V=z,q=K,t.width=Math.floor(T*K),t.height=Math.floor(z*K),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(w)},this.getViewport=function(T){return T.copy(se)},this.setViewport=function(T,z,K,Z){T.isVector4?se.set(T.x,T.y,T.z,T.w):se.set(T,z,K,Z),B.viewport(w.copy(se).multiplyScalar(q).floor())},this.getScissor=function(T){return T.copy(fe)},this.setScissor=function(T,z,K,Z){T.isVector4?fe.set(T.x,T.y,T.z,T.w):fe.set(T,z,K,Z),B.scissor(W.copy(fe).multiplyScalar(q).floor())},this.getScissorTest=function(){return ue},this.setScissorTest=function(T){B.setScissorTest(ue=T)},this.setOpaqueSort=function(T){$=T},this.setTransparentSort=function(T){ie=T},this.getClearColor=function(T){return T.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor.apply(Oe,arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha.apply(Oe,arguments)},this.clear=function(T=!0,z=!0,K=!0){let Z=0;if(T){let Y=!1;if(A!==null){const be=A.texture.format;Y=be===bd||be===yd||be===Sd}if(Y){const be=A.texture.type,Pe=be===Si||be===vi||be===Zl||be===Vi||be===xd||be===Md,Ne=Oe.getClearColor(),Be=Oe.getClearAlpha(),qe=Ne.r,Ge=Ne.g,Ve=Ne.b;Pe?(p[0]=qe,p[1]=Ge,p[2]=Ve,p[3]=Be,M.clearBufferuiv(M.COLOR,0,p)):(v[0]=qe,v[1]=Ge,v[2]=Ve,v[3]=Be,M.clearBufferiv(M.COLOR,0,v))}else Z|=M.COLOR_BUFFER_BIT}z&&(Z|=M.DEPTH_BUFFER_BIT),K&&(Z|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),M.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),he.dispose(),Me.dispose(),te.dispose(),_.dispose(),R.dispose(),G.dispose(),ye.dispose(),ke.dispose(),ae.dispose(),je.dispose(),je.removeEventListener("sessionstart",kt),je.removeEventListener("sessionend",ct),Te&&(Te.dispose(),Te=null),Vt.stop()};function ve(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Q.autoReset,z=ne.enabled,K=ne.autoUpdate,Z=ne.needsUpdate,Y=ne.type;Ke(),Q.autoReset=T,ne.enabled=z,ne.autoUpdate=K,ne.needsUpdate=Z,ne.type=Y}function ge(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function _e(T){const z=T.target;z.removeEventListener("dispose",_e),Ue(z)}function Ue(T){Ce(T),te.remove(T)}function Ce(T){const z=te.get(T).programs;z!==void 0&&(z.forEach(function(K){ae.releaseProgram(K)}),T.isShaderMaterial&&ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,K,Z,Y,be){z===null&&(z=Re);const Pe=Y.isMesh&&Y.matrixWorld.determinant()<0,Ne=rp(T,z,K,Z,Y);B.setMaterial(Z,Pe);let Be=K.index,qe=1;if(Z.wireframe===!0){if(Be=O.getWireframeAttribute(K),Be===void 0)return;qe=2}const Ge=K.drawRange,Ve=K.attributes.position;let xt=Ge.start*qe,Qt=(Ge.start+Ge.count)*qe;be!==null&&(xt=Math.max(xt,be.start*qe),Qt=Math.min(Qt,(be.start+be.count)*qe)),Be!==null?(xt=Math.max(xt,0),Qt=Math.min(Qt,Be.count)):Ve!=null&&(xt=Math.max(xt,0),Qt=Math.min(Qt,Ve.count));const Ct=Qt-xt;if(Ct<0||Ct===1/0)return;ye.setup(Y,Z,Ne,K,Be);let Bn,pt=oe;if(Be!==null&&(Bn=j.get(Be),pt=me,pt.setIndex(Bn)),Y.isMesh)Z.wireframe===!0?(B.setLineWidth(Z.wireframeLinewidth*Ye()),pt.setMode(M.LINES)):pt.setMode(M.TRIANGLES);else if(Y.isLine){let $e=Z.linewidth;$e===void 0&&($e=1),B.setLineWidth($e*Ye()),Y.isLineSegments?pt.setMode(M.LINES):Y.isLineLoop?pt.setMode(M.LINE_LOOP):pt.setMode(M.LINE_STRIP)}else Y.isPoints?pt.setMode(M.POINTS):Y.isSprite&&pt.setMode(M.TRIANGLES);if(Y.isBatchedMesh)pt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else if(Y.isInstancedMesh)pt.renderInstances(xt,Ct,Y.count);else if(K.isInstancedBufferGeometry){const $e=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ca=Math.min(K.instanceCount,$e);pt.renderInstances(xt,Ct,ca)}else pt.render(xt,Ct)};function Je(T,z,K){T.transparent===!0&&T.side===Sn&&T.forceSinglePass===!1?(T.side=Ht,T.needsUpdate=!0,Ir(T,z,K),T.side=bi,T.needsUpdate=!0,Ir(T,z,K),T.side=Sn):Ir(T,z,K)}this.compile=function(T,z,K=null){K===null&&(K=T),m=Me.get(K),m.init(),y.push(m),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),T!==K&&T.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),m.setupLights(S._useLegacyLights);const Z=new Set;return T.traverse(function(Y){const be=Y.material;if(be)if(Array.isArray(be))for(let Pe=0;Pe<be.length;Pe++){const Ne=be[Pe];Je(Ne,K,Y),Z.add(Ne)}else Je(be,K,Y),Z.add(be)}),y.pop(),m=null,Z},this.compileAsync=function(T,z,K=null){const Z=this.compile(T,z,K);return new Promise(Y=>{function be(){if(Z.forEach(function(Pe){te.get(Pe).currentProgram.isReady()&&Z.delete(Pe)}),Z.size===0){Y(T);return}setTimeout(be,10)}F.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let et=null;function Rt(T){et&&et(T)}function kt(){Vt.stop()}function ct(){Vt.start()}const Vt=new Bd;Vt.setAnimationLoop(Rt),typeof self<"u"&&Vt.setContext(self),this.setAnimationLoop=function(T){et=T,je.setAnimationLoop(T),T===null?Vt.stop():Vt.start()},je.addEventListener("sessionstart",kt),je.addEventListener("sessionend",ct),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),je.enabled===!0&&je.isPresenting===!0&&(je.cameraAutoUpdate===!0&&je.updateCamera(z),z=je.getCamera()),T.isScene===!0&&T.onBeforeRender(S,T,z,A),m=Me.get(T,y.length),m.init(),y.push(m),we.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),J.setFromProjectionMatrix(we),Se=this.localClippingEnabled,ce=Ae.init(this.clippingPlanes,Se),x=he.get(T,d.length),x.init(),d.push(x),Cn(T,z,0,S.sortObjects),x.finish(),S.sortObjects===!0&&x.sort($,ie),this.info.render.frame++,ce===!0&&Ae.beginShadows();const K=m.state.shadowsArray;if(ne.render(K,T,z),ce===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),Oe.render(x,T),m.setupLights(S._useLegacyLights),z.isArrayCamera){const Z=z.cameras;for(let Y=0,be=Z.length;Y<be;Y++){const Pe=Z[Y];hc(x,T,Pe,Pe.viewport)}}else hc(x,T,z);A!==null&&(g.updateMultisampleRenderTarget(A),g.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(S,T,z),ye.resetDefaultState(),H=-1,b=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function Cn(T,z,K,Z){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){Z&&Ie.setFromMatrixPosition(T.matrixWorld).applyMatrix4(we);const Pe=G.update(T),Ne=T.material;Ne.visible&&x.push(T,Pe,Ne,K,Ie.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const Pe=G.update(T),Ne=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ie.copy(T.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),Ie.copy(Pe.boundingSphere.center)),Ie.applyMatrix4(T.matrixWorld).applyMatrix4(we)),Array.isArray(Ne)){const Be=Pe.groups;for(let qe=0,Ge=Be.length;qe<Ge;qe++){const Ve=Be[qe],xt=Ne[Ve.materialIndex];xt&&xt.visible&&x.push(T,Pe,xt,K,Ie.z,Ve)}}else Ne.visible&&x.push(T,Pe,Ne,K,Ie.z,null)}}const be=T.children;for(let Pe=0,Ne=be.length;Pe<Ne;Pe++)Cn(be[Pe],z,K,Z)}function hc(T,z,K,Z){const Y=T.opaque,be=T.transmissive,Pe=T.transparent;m.setupLightsView(K),ce===!0&&Ae.setGlobalState(S.clippingPlanes,K),be.length>0&&sp(Y,be,z,K),Z&&B.viewport(w.copy(Z)),Y.length>0&&Ur(Y,z,K),be.length>0&&Ur(be,z,K),Pe.length>0&&Ur(Pe,z,K),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function sp(T,z,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const be=X.isWebGL2;Te===null&&(Te=new wn(1,1,{generateMipmaps:!0,type:F.has("EXT_color_buffer_half_float")?ti:Si,minFilter:Er,samples:be?4:0})),S.getDrawingBufferSize(De),be?Te.setSize(De.x,De.y):Te.setSize(Cl(De.x),Cl(De.y));const Pe=S.getRenderTarget();S.setRenderTarget(Te),S.getClearColor(de),N=S.getClearAlpha(),N<1&&S.setClearColor(16777215,.5),S.clear();const Ne=S.toneMapping;S.toneMapping=Mi,Ur(T,K,Z),g.updateMultisampleRenderTarget(Te),g.updateRenderTargetMipmap(Te);let Be=!1;for(let qe=0,Ge=z.length;qe<Ge;qe++){const Ve=z[qe],xt=Ve.object,Qt=Ve.geometry,Ct=Ve.material,Bn=Ve.group;if(Ct.side===Sn&&xt.layers.test(Z.layers)){const pt=Ct.side;Ct.side=Ht,Ct.needsUpdate=!0,dc(xt,K,Z,Qt,Ct,Bn),Ct.side=pt,Ct.needsUpdate=!0,Be=!0}}Be===!0&&(g.updateMultisampleRenderTarget(Te),g.updateRenderTargetMipmap(Te)),S.setRenderTarget(Pe),S.setClearColor(de,N),S.toneMapping=Ne}function Ur(T,z,K){const Z=z.isScene===!0?z.overrideMaterial:null;for(let Y=0,be=T.length;Y<be;Y++){const Pe=T[Y],Ne=Pe.object,Be=Pe.geometry,qe=Z===null?Pe.material:Z,Ge=Pe.group;Ne.layers.test(K.layers)&&dc(Ne,z,K,Be,qe,Ge)}}function dc(T,z,K,Z,Y,be){T.onBeforeRender(S,z,K,Z,Y,be),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Y.onBeforeRender(S,z,K,Z,T,be),Y.transparent===!0&&Y.side===Sn&&Y.forceSinglePass===!1?(Y.side=Ht,Y.needsUpdate=!0,S.renderBufferDirect(K,z,Z,Y,T,be),Y.side=bi,Y.needsUpdate=!0,S.renderBufferDirect(K,z,Z,Y,T,be),Y.side=Sn):S.renderBufferDirect(K,z,Z,Y,T,be),T.onAfterRender(S,z,K,Z,Y,be)}function Ir(T,z,K){z.isScene!==!0&&(z=Re);const Z=te.get(T),Y=m.state.lights,be=m.state.shadowsArray,Pe=Y.state.version,Ne=ae.getParameters(T,Y.state,be,z,K),Be=ae.getProgramCacheKey(Ne);let qe=Z.programs;Z.environment=T.isMeshStandardMaterial?z.environment:null,Z.fog=z.fog,Z.envMap=(T.isMeshStandardMaterial?R:_).get(T.envMap||Z.environment),qe===void 0&&(T.addEventListener("dispose",_e),qe=new Map,Z.programs=qe);let Ge=qe.get(Be);if(Ge!==void 0){if(Z.currentProgram===Ge&&Z.lightsStateVersion===Pe)return mc(T,Ne),Ge}else Ne.uniforms=ae.getUniforms(T),T.onBuild(K,Ne,S),T.onBeforeCompile(Ne,S),Ge=ae.acquireProgram(Ne,Be),qe.set(Be,Ge),Z.uniforms=Ne.uniforms;const Ve=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ve.clippingPlanes=Ae.uniform),mc(T,Ne),Z.needsLights=ap(T),Z.lightsStateVersion=Pe,Z.needsLights&&(Ve.ambientLightColor.value=Y.state.ambient,Ve.lightProbe.value=Y.state.probe,Ve.directionalLights.value=Y.state.directional,Ve.directionalLightShadows.value=Y.state.directionalShadow,Ve.spotLights.value=Y.state.spot,Ve.spotLightShadows.value=Y.state.spotShadow,Ve.rectAreaLights.value=Y.state.rectArea,Ve.ltc_1.value=Y.state.rectAreaLTC1,Ve.ltc_2.value=Y.state.rectAreaLTC2,Ve.pointLights.value=Y.state.point,Ve.pointLightShadows.value=Y.state.pointShadow,Ve.hemisphereLights.value=Y.state.hemi,Ve.directionalShadowMap.value=Y.state.directionalShadowMap,Ve.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ve.spotShadowMap.value=Y.state.spotShadowMap,Ve.spotLightMatrix.value=Y.state.spotLightMatrix,Ve.spotLightMap.value=Y.state.spotLightMap,Ve.pointShadowMap.value=Y.state.pointShadowMap,Ve.pointShadowMatrix.value=Y.state.pointShadowMatrix),Z.currentProgram=Ge,Z.uniformsList=null,Ge}function pc(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=yo.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function mc(T,z){const K=te.get(T);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function rp(T,z,K,Z,Y){z.isScene!==!0&&(z=Re),g.resetTextureUnits();const be=z.fog,Pe=Z.isMeshStandardMaterial?z.environment:null,Ne=A===null?S.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ri,Be=(Z.isMeshStandardMaterial?R:_).get(Z.envMap||Pe),qe=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ge=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ve=!!K.morphAttributes.position,xt=!!K.morphAttributes.normal,Qt=!!K.morphAttributes.color;let Ct=Mi;Z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ct=S.toneMapping);const Bn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pt=Bn!==void 0?Bn.length:0,$e=te.get(Z),ca=m.state.lights;if(ce===!0&&(Se===!0||T!==b)){const ln=T===b&&Z.id===H;Ae.setState(Z,T,ln)}let mt=!1;Z.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==ca.state.version||$e.outputColorSpace!==Ne||Y.isBatchedMesh&&$e.batching===!1||!Y.isBatchedMesh&&$e.batching===!0||Y.isInstancedMesh&&$e.instancing===!1||!Y.isInstancedMesh&&$e.instancing===!0||Y.isSkinnedMesh&&$e.skinning===!1||!Y.isSkinnedMesh&&$e.skinning===!0||Y.isInstancedMesh&&$e.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&$e.instancingColor===!1&&Y.instanceColor!==null||$e.envMap!==Be||Z.fog===!0&&$e.fog!==be||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==Ae.numPlanes||$e.numIntersection!==Ae.numIntersection)||$e.vertexAlphas!==qe||$e.vertexTangents!==Ge||$e.morphTargets!==Ve||$e.morphNormals!==xt||$e.morphColors!==Qt||$e.toneMapping!==Ct||X.isWebGL2===!0&&$e.morphTargetsCount!==pt)&&(mt=!0):(mt=!0,$e.__version=Z.version);let wi=$e.currentProgram;mt===!0&&(wi=Ir(Z,z,Y));let gc=!1,qs=!1,ua=!1;const Ut=wi.getUniforms(),Ai=$e.uniforms;if(B.useProgram(wi.program)&&(gc=!0,qs=!0,ua=!0),Z.id!==H&&(H=Z.id,qs=!0),gc||b!==T){Ut.setValue(M,"projectionMatrix",T.projectionMatrix),Ut.setValue(M,"viewMatrix",T.matrixWorldInverse);const ln=Ut.map.cameraPosition;ln!==void 0&&ln.setValue(M,Ie.setFromMatrixPosition(T.matrixWorld)),X.logarithmicDepthBuffer&&Ut.setValue(M,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ut.setValue(M,"isOrthographic",T.isOrthographicCamera===!0),b!==T&&(b=T,qs=!0,ua=!0)}if(Y.isSkinnedMesh){Ut.setOptional(M,Y,"bindMatrix"),Ut.setOptional(M,Y,"bindMatrixInverse");const ln=Y.skeleton;ln&&(X.floatVertexTextures?(ln.boneTexture===null&&ln.computeBoneTexture(),Ut.setValue(M,"boneTexture",ln.boneTexture,g)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Y.isBatchedMesh&&(Ut.setOptional(M,Y,"batchingTexture"),Ut.setValue(M,"batchingTexture",Y._matricesTexture,g));const fa=K.morphAttributes;if((fa.position!==void 0||fa.normal!==void 0||fa.color!==void 0&&X.isWebGL2===!0)&&P.update(Y,K,wi),(qs||$e.receiveShadow!==Y.receiveShadow)&&($e.receiveShadow=Y.receiveShadow,Ut.setValue(M,"receiveShadow",Y.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Ai.envMap.value=Be,Ai.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),qs&&(Ut.setValue(M,"toneMappingExposure",S.toneMappingExposure),$e.needsLights&&op(Ai,ua),be&&Z.fog===!0&&re.refreshFogUniforms(Ai,be),re.refreshMaterialUniforms(Ai,Z,q,V,Te),yo.upload(M,pc($e),Ai,g)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(yo.upload(M,pc($e),Ai,g),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ut.setValue(M,"center",Y.center),Ut.setValue(M,"modelViewMatrix",Y.modelViewMatrix),Ut.setValue(M,"normalMatrix",Y.normalMatrix),Ut.setValue(M,"modelMatrix",Y.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const ln=Z.uniformsGroups;for(let ha=0,lp=ln.length;ha<lp;ha++)if(X.isWebGL2){const _c=ln[ha];ke.update(_c,wi),ke.bind(_c,wi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return wi}function op(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function ap(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,z,K){te.get(T.texture).__webglTexture=z,te.get(T.depthTexture).__webglTexture=K;const Z=te.get(T);Z.__hasExternalTextures=!0,Z.__hasExternalTextures&&(Z.__autoAllocateDepthBuffer=K===void 0,Z.__autoAllocateDepthBuffer||F.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,z){const K=te.get(T);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,K=0){A=T,D=z,C=K;let Z=!0,Y=null,be=!1,Pe=!1;if(T){const Be=te.get(T);Be.__useDefaultFramebuffer!==void 0?(B.bindFramebuffer(M.FRAMEBUFFER,null),Z=!1):Be.__webglFramebuffer===void 0?g.setupRenderTarget(T):Be.__hasExternalTextures&&g.rebindTextures(T,te.get(T.texture).__webglTexture,te.get(T.depthTexture).__webglTexture);const qe=T.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Pe=!0);const Ge=te.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[z])?Y=Ge[z][K]:Y=Ge[z],be=!0):X.isWebGL2&&T.samples>0&&g.useMultisampledRTT(T)===!1?Y=te.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?Y=Ge[K]:Y=Ge,w.copy(T.viewport),W.copy(T.scissor),ee=T.scissorTest}else w.copy(se).multiplyScalar(q).floor(),W.copy(fe).multiplyScalar(q).floor(),ee=ue;if(B.bindFramebuffer(M.FRAMEBUFFER,Y)&&X.drawBuffers&&Z&&B.drawBuffers(T,Y),B.viewport(w),B.scissor(W),B.setScissorTest(ee),be){const Be=te.get(T.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+z,Be.__webglTexture,K)}else if(Pe){const Be=te.get(T.texture),qe=z||0;M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,Be.__webglTexture,K||0,qe)}H=-1},this.readRenderTargetPixels=function(T,z,K,Z,Y,be,Pe){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ne=Ne[Pe]),Ne){B.bindFramebuffer(M.FRAMEBUFFER,Ne);try{const Be=T.texture,qe=Be.format,Ge=Be.type;if(qe!==bn&&le.convert(qe)!==M.getParameter(M.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=Ge===ti&&(F.has("EXT_color_buffer_half_float")||X.isWebGL2&&F.has("EXT_color_buffer_float"));if(Ge!==Si&&le.convert(Ge)!==M.getParameter(M.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ge===xi&&(X.isWebGL2||F.has("OES_texture_float")||F.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-Z&&K>=0&&K<=T.height-Y&&M.readPixels(z,K,Z,Y,le.convert(qe),le.convert(Ge),be)}finally{const Be=A!==null?te.get(A).__webglFramebuffer:null;B.bindFramebuffer(M.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(T,z,K=0){const Z=Math.pow(2,-K),Y=Math.floor(z.image.width*Z),be=Math.floor(z.image.height*Z);g.setTexture2D(z,0),M.copyTexSubImage2D(M.TEXTURE_2D,K,0,0,T.x,T.y,Y,be),B.unbindTexture()},this.copyTextureToTexture=function(T,z,K,Z=0){const Y=z.image.width,be=z.image.height,Pe=le.convert(K.format),Ne=le.convert(K.type);g.setTexture2D(K,0),M.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,K.flipY),M.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),M.pixelStorei(M.UNPACK_ALIGNMENT,K.unpackAlignment),z.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,Z,T.x,T.y,Y,be,Pe,Ne,z.image.data):z.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,Z,T.x,T.y,z.mipmaps[0].width,z.mipmaps[0].height,Pe,z.mipmaps[0].data):M.texSubImage2D(M.TEXTURE_2D,Z,T.x,T.y,Pe,Ne,z.image),Z===0&&K.generateMipmaps&&M.generateMipmap(M.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(T,z,K,Z,Y=0){if(S.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const be=T.max.x-T.min.x+1,Pe=T.max.y-T.min.y+1,Ne=T.max.z-T.min.z+1,Be=le.convert(Z.format),qe=le.convert(Z.type);let Ge;if(Z.isData3DTexture)g.setTexture3D(Z,0),Ge=M.TEXTURE_3D;else if(Z.isDataArrayTexture||Z.isCompressedArrayTexture)g.setTexture2DArray(Z,0),Ge=M.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}M.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,Z.flipY),M.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),M.pixelStorei(M.UNPACK_ALIGNMENT,Z.unpackAlignment);const Ve=M.getParameter(M.UNPACK_ROW_LENGTH),xt=M.getParameter(M.UNPACK_IMAGE_HEIGHT),Qt=M.getParameter(M.UNPACK_SKIP_PIXELS),Ct=M.getParameter(M.UNPACK_SKIP_ROWS),Bn=M.getParameter(M.UNPACK_SKIP_IMAGES),pt=K.isCompressedTexture?K.mipmaps[Y]:K.image;M.pixelStorei(M.UNPACK_ROW_LENGTH,pt.width),M.pixelStorei(M.UNPACK_IMAGE_HEIGHT,pt.height),M.pixelStorei(M.UNPACK_SKIP_PIXELS,T.min.x),M.pixelStorei(M.UNPACK_SKIP_ROWS,T.min.y),M.pixelStorei(M.UNPACK_SKIP_IMAGES,T.min.z),K.isDataTexture||K.isData3DTexture?M.texSubImage3D(Ge,Y,z.x,z.y,z.z,be,Pe,Ne,Be,qe,pt.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),M.compressedTexSubImage3D(Ge,Y,z.x,z.y,z.z,be,Pe,Ne,Be,pt.data)):M.texSubImage3D(Ge,Y,z.x,z.y,z.z,be,Pe,Ne,Be,qe,pt),M.pixelStorei(M.UNPACK_ROW_LENGTH,Ve),M.pixelStorei(M.UNPACK_IMAGE_HEIGHT,xt),M.pixelStorei(M.UNPACK_SKIP_PIXELS,Qt),M.pixelStorei(M.UNPACK_SKIP_ROWS,Ct),M.pixelStorei(M.UNPACK_SKIP_IMAGES,Bn),Y===0&&Z.generateMipmaps&&M.generateMipmap(Ge),B.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?g.setTextureCube(T,0):T.isData3DTexture?g.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?g.setTexture2DArray(T,0):g.setTexture2D(T,0),B.unbindTexture()},this.resetState=function(){D=0,C=0,A=null,B.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Jl?"display-p3":"srgb",t.unpackColorSpace=st.workingColorSpace===ia?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===bt?Xi:Td}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Xi?bt:ri}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class VS extends jd{}VS.prototype.isWebGL1Renderer=!0;class WS extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class XS{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=wl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=yi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Wt=new L;class Oo{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Oo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ks extends Ti{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let gs;const er=new L,_s=new L,vs=new L,xs=new Ee,tr=new Ee,qd=new it,oo=new L,nr=new L,ao=new L,_f=new Ee,nl=new Ee,vf=new Ee;class wr extends Lt{constructor(e=new ks){if(super(),this.isSprite=!0,this.type="Sprite",gs===void 0){gs=new vt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new XS(t,5);gs.setIndex([0,1,2,0,2,3]),gs.setAttribute("position",new Oo(i,3,0,!1)),gs.setAttribute("uv",new Oo(i,2,3,!1))}this.geometry=gs,this.material=e,this.center=new Ee(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_s.setFromMatrixScale(this.matrixWorld),qd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),vs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_s.multiplyScalar(-vs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;lo(oo.set(-.5,-.5,0),vs,a,_s,s,r),lo(nr.set(.5,-.5,0),vs,a,_s,s,r),lo(ao.set(.5,.5,0),vs,a,_s,s,r),_f.set(0,0),nl.set(1,0),vf.set(1,1);let o=e.ray.intersectTriangle(oo,nr,ao,!1,er);if(o===null&&(lo(nr.set(-.5,.5,0),vs,a,_s,s,r),nl.set(0,1),o=e.ray.intersectTriangle(oo,ao,nr,!1,er),o===null))return;const l=e.ray.origin.distanceTo(er);l<e.near||l>e.far||t.push({distance:l,point:er.clone(),uv:dn.getInterpolation(er,oo,nr,ao,_f,nl,vf,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function lo(n,e,t,i,s,r){xs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(tr.x=r*xs.x-s*xs.y,tr.y=s*xs.x+r*xs.y):tr.copy(xs),n.copy(e),n.x+=tr.x,n.y+=tr.y,n.applyMatrix4(qd)}class xf extends rt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ms=new it,Mf=new it,co=[],Sf=new Ki,jS=new it,ir=new Dt,sr=new $i;class qS extends Dt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xf(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,jS)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ki),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ms),Sf.copy(e.boundingBox).applyMatrix4(Ms),this.boundingBox.union(Sf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new $i),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ms),sr.copy(e.boundingSphere).applyMatrix4(Ms),this.boundingSphere.union(sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(i),e.ray.intersectsSphere(sr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ms),Mf.multiplyMatrices(i,Ms),ir.matrixWorld=Mf,ir.raycast(e,co);for(let a=0,o=co.length;a<o;a++){const l=co[a];l.instanceId=r,l.object=this,t.push(l)}co.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new xf(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class la extends Ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yf=new L,bf=new L,Ef=new it,il=new Lr,uo=new $i;class nc extends Lt{constructor(e=new vt,t=new la){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)yf.fromBufferAttribute(t,s-1),bf.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=yf.distanceTo(bf);e.setAttribute("lineDistance",new Tt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),uo.copy(i.boundingSphere),uo.applyMatrix4(s),uo.radius+=r,e.ray.intersectsSphere(uo)===!1)return;Ef.copy(s).invert(),il.copy(e.ray).applyMatrix4(Ef);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new L,u=new L,f=new L,h=new L,p=this.isLineSegments?2:1,v=i.index,m=i.attributes.position;if(v!==null){const d=Math.max(0,a.start),y=Math.min(v.count,a.start+a.count);for(let S=d,E=y-1;S<E;S+=p){const D=v.getX(S),C=v.getX(S+1);if(c.fromBufferAttribute(m,D),u.fromBufferAttribute(m,C),il.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const H=e.ray.origin.distanceTo(h);H<e.near||H>e.far||t.push({distance:H,point:f.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,a.start),y=Math.min(m.count,a.start+a.count);for(let S=d,E=y-1;S<E;S+=p){if(c.fromBufferAttribute(m,S),u.fromBufferAttribute(m,S+1),il.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(h);C<e.near||C>e.far||t.push({distance:C,point:f.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class Bo extends Ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Tf=new it,Ll=new Lr,fo=new $i,ho=new L;class Ar extends Lt{constructor(e=new vt,t=new Bo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fo.copy(i.boundingSphere),fo.applyMatrix4(s),fo.radius+=r,e.ray.intersectsSphere(fo)===!1)return;Tf.copy(s).invert(),Ll.copy(e.ray).applyMatrix4(Tf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let v=h,x=p;v<x;v++){const m=c.getX(v);ho.fromBufferAttribute(f,m),wf(ho,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let v=h,x=p;v<x;v++)ho.fromBufferAttribute(f,v),wf(ho,v,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function wf(n,e,t,i,s,r,a){const o=Ll.distanceSqToPoint(n);if(o<t){const l=new L;Ll.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class ic extends Jt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class sc extends vt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new Tt(r,3)),this.setAttribute("normal",new Tt(r.slice(),3)),this.setAttribute("uv",new Tt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const S=new L,E=new L,D=new L;for(let C=0;C<t.length;C+=3)p(t[C+0],S),p(t[C+1],E),p(t[C+2],D),l(S,E,D,y)}function l(y,S,E,D){const C=D+1,A=[];for(let H=0;H<=C;H++){A[H]=[];const b=y.clone().lerp(E,H/C),w=S.clone().lerp(E,H/C),W=C-H;for(let ee=0;ee<=W;ee++)ee===0&&H===C?A[H][ee]=b:A[H][ee]=b.clone().lerp(w,ee/W)}for(let H=0;H<C;H++)for(let b=0;b<2*(C-H)-1;b++){const w=Math.floor(b/2);b%2===0?(h(A[H][w+1]),h(A[H+1][w]),h(A[H][w])):(h(A[H][w+1]),h(A[H+1][w+1]),h(A[H+1][w]))}}function c(y){const S=new L;for(let E=0;E<r.length;E+=3)S.x=r[E+0],S.y=r[E+1],S.z=r[E+2],S.normalize().multiplyScalar(y),r[E+0]=S.x,r[E+1]=S.y,r[E+2]=S.z}function u(){const y=new L;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const E=m(y)/2/Math.PI+.5,D=d(y)/Math.PI+.5;a.push(E,1-D)}v(),f()}function f(){for(let y=0;y<a.length;y+=6){const S=a[y+0],E=a[y+2],D=a[y+4],C=Math.max(S,E,D),A=Math.min(S,E,D);C>.9&&A<.1&&(S<.2&&(a[y+0]+=1),E<.2&&(a[y+2]+=1),D<.2&&(a[y+4]+=1))}}function h(y){r.push(y.x,y.y,y.z)}function p(y,S){const E=y*3;S.x=e[E+0],S.y=e[E+1],S.z=e[E+2]}function v(){const y=new L,S=new L,E=new L,D=new L,C=new Ee,A=new Ee,H=new Ee;for(let b=0,w=0;b<r.length;b+=9,w+=6){y.set(r[b+0],r[b+1],r[b+2]),S.set(r[b+3],r[b+4],r[b+5]),E.set(r[b+6],r[b+7],r[b+8]),C.set(a[w+0],a[w+1]),A.set(a[w+2],a[w+3]),H.set(a[w+4],a[w+5]),D.copy(y).add(S).add(E).divideScalar(3);const W=m(D);x(C,w+0,y,W),x(A,w+2,S,W),x(H,w+4,E,W)}}function x(y,S,E,D){D<0&&y.x===1&&(a[S]=y.x-1),E.x===0&&E.z===0&&(a[S]=D/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function d(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sc(e.vertices,e.indices,e.radius,e.details)}}class rc extends sc{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new rc(e.radius,e.detail)}}class oc extends vt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let f=e;const h=(t-e)/s,p=new L,v=new Ee;for(let x=0;x<=s;x++){for(let m=0;m<=i;m++){const d=r+m/i*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,u.push(v.x,v.y)}f+=h}for(let x=0;x<s;x++){const m=x*(i+1);for(let d=0;d<i;d++){const y=d+m,S=y,E=y+i+1,D=y+i+2,C=y+1;o.push(S,E,C),o.push(E,D,C)}}this.setIndex(o),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Vs extends vt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new L,h=new L,p=[],v=[],x=[],m=[];for(let d=0;d<=i;d++){const y=[],S=d/i;let E=0;d===0&&a===0?E=.5/t:d===i&&l===Math.PI&&(E=-.5/t);for(let D=0;D<=t;D++){const C=D/t;f.x=-e*Math.cos(s+C*r)*Math.sin(a+S*o),f.y=e*Math.cos(a+S*o),f.z=e*Math.sin(s+C*r)*Math.sin(a+S*o),v.push(f.x,f.y,f.z),h.copy(f).normalize(),x.push(h.x,h.y,h.z),m.push(C+E,1-S),y.push(c++)}u.push(y)}for(let d=0;d<i;d++)for(let y=0;y<t;y++){const S=u[d][y+1],E=u[d][y],D=u[d+1][y],C=u[d+1][y+1];(d!==0||a>0)&&p.push(S,E,C),(d!==i-1||l<Math.PI)&&p.push(E,D,C)}this.setIndex(p),this.setAttribute("position",new Tt(v,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class YS extends St{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class KS extends Ti{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wd,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yd extends la{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Kd extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const sl=new it,Af=new L,Rf=new L;class $S{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ec,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Af.setFromMatrixPosition(e.matrixWorld),t.position.copy(Af),Rf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rf),t.updateMatrixWorld(),sl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Cf=new it,rr=new L,rl=new L;class ZS extends $S{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),rr.setFromMatrixPosition(e.matrixWorld),i.position.copy(rr),rl.copy(i.position),rl.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(rl),i.updateMatrixWorld(),s.makeTranslation(-rr.x,-rr.y,-rr.z),Cf.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cf)}}class JS extends Kd{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ZS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class QS extends Kd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ey{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Pf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Pf();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Pf(){return(typeof performance>"u"?Date:performance).now()}class ty{constructor(e,t,i=0,s=1/0){this.ray=new Lr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Ql,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Dl(e,this,i,t),i.sort(Lf),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Dl(e[s],this,i,t);return i.sort(Lf),i}}function Lf(n,e){return n.distance-e.distance}function Dl(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const s=n.children;for(let r=0,a=s.length;r<a;r++)Dl(s[r],e,t,!0)}}class Df{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Kt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yl);const Uf={type:"change"},ol={type:"start"},If={type:"end"},po=new Lr,Nf=new _i,ny=Math.cos(70*Bg.DEG2RAD);class iy extends Yi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yn.ROTATE,MIDDLE:Yn.DOLLY,RIGHT:Yn.PAN},this.touches={ONE:Qi.ROTATE,TWO:Qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(P){P.addEventListener("keydown",G),this._domElementKeyEvents=P},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",G),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Uf),i.update(),r=s.NONE},this.update=function(){const P=new L,oe=new Ei().setFromUnitVectors(e.up,new L(0,1,0)),me=oe.clone().invert(),le=new L,ye=new Ei,ke=new L,Ke=2*Math.PI;return function(ve=null){const I=i.object.position;P.copy(I).sub(i.target),P.applyQuaternion(oe),o.setFromVector3(P),i.autoRotate&&r===s.NONE&&W(b(ve)),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let ge=i.minAzimuthAngle,_e=i.maxAzimuthAngle;isFinite(ge)&&isFinite(_e)&&(ge<-Math.PI?ge+=Ke:ge>Math.PI&&(ge-=Ke),_e<-Math.PI?_e+=Ke:_e>Math.PI&&(_e-=Ke),ge<=_e?o.theta=Math.max(ge,Math.min(_e,o.theta)):o.theta=o.theta>(ge+_e)/2?Math.max(ge,o.theta):Math.min(_e,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&C||i.object.isOrthographicCamera?o.radius=ie(o.radius):o.radius=ie(o.radius*c),P.setFromSpherical(o),P.applyQuaternion(me),I.copy(i.target).add(P),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let Ue=!1;if(i.zoomToCursor&&C){let Ce=null;if(i.object.isPerspectiveCamera){const Je=P.length();Ce=ie(Je*c);const et=Je-Ce;i.object.position.addScaledVector(E,et),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Je=new L(D.x,D.y,0);Je.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Ue=!0;const et=new L(D.x,D.y,0);et.unproject(i.object),i.object.position.sub(et).add(Je),i.object.updateMatrixWorld(),Ce=P.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Ce!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Ce).add(i.object.position):(po.origin.copy(i.object.position),po.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(po.direction))<ny?e.lookAt(i.target):(Nf.setFromNormalAndCoplanarPoint(i.object.up,i.target),po.intersectPlane(Nf,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Ue=!0);return c=1,C=!1,Ue||le.distanceToSquared(i.object.position)>a||8*(1-ye.dot(i.object.quaternion))>a||ke.distanceToSquared(i.target)>0?(i.dispatchEvent(Uf),le.copy(i.object.position),ye.copy(i.object.quaternion),ke.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",he),i.domElement.removeEventListener("pointerdown",te),i.domElement.removeEventListener("pointercancel",_),i.domElement.removeEventListener("wheel",O),i.domElement.removeEventListener("pointermove",g),i.domElement.removeEventListener("pointerup",_),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",G),i._domElementKeyEvents=null)};const i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new Df,l=new Df;let c=1;const u=new L,f=new Ee,h=new Ee,p=new Ee,v=new Ee,x=new Ee,m=new Ee,d=new Ee,y=new Ee,S=new Ee,E=new L,D=new Ee;let C=!1;const A=[],H={};function b(P){return P!==null?2*Math.PI/60*i.autoRotateSpeed*P:2*Math.PI/60/60*i.autoRotateSpeed}function w(P){const oe=Math.abs(P)/(100*(window.devicePixelRatio|0));return Math.pow(.95,i.zoomSpeed*oe)}function W(P){l.theta-=P}function ee(P){l.phi-=P}const de=function(){const P=new L;return function(me,le){P.setFromMatrixColumn(le,0),P.multiplyScalar(-me),u.add(P)}}(),N=function(){const P=new L;return function(me,le){i.screenSpacePanning===!0?P.setFromMatrixColumn(le,1):(P.setFromMatrixColumn(le,0),P.crossVectors(i.object.up,P)),P.multiplyScalar(me),u.add(P)}}(),k=function(){const P=new L;return function(me,le){const ye=i.domElement;if(i.object.isPerspectiveCamera){const ke=i.object.position;P.copy(ke).sub(i.target);let Ke=P.length();Ke*=Math.tan(i.object.fov/2*Math.PI/180),de(2*me*Ke/ye.clientHeight,i.object.matrix),N(2*le*Ke/ye.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(de(me*(i.object.right-i.object.left)/i.object.zoom/ye.clientWidth,i.object.matrix),N(le*(i.object.top-i.object.bottom)/i.object.zoom/ye.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function V(P){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function q(P){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function $(P,oe){if(!i.zoomToCursor)return;C=!0;const me=i.domElement.getBoundingClientRect(),le=P-me.left,ye=oe-me.top,ke=me.width,Ke=me.height;D.x=le/ke*2-1,D.y=-(ye/Ke)*2+1,E.set(D.x,D.y,1).unproject(i.object).sub(i.object.position).normalize()}function ie(P){return Math.max(i.minDistance,Math.min(i.maxDistance,P))}function se(P){f.set(P.clientX,P.clientY)}function fe(P){$(P.clientX,P.clientX),d.set(P.clientX,P.clientY)}function ue(P){v.set(P.clientX,P.clientY)}function J(P){h.set(P.clientX,P.clientY),p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const oe=i.domElement;W(2*Math.PI*p.x/oe.clientHeight),ee(2*Math.PI*p.y/oe.clientHeight),f.copy(h),i.update()}function ce(P){y.set(P.clientX,P.clientY),S.subVectors(y,d),S.y>0?V(w(S.y)):S.y<0&&q(w(S.y)),d.copy(y),i.update()}function Se(P){x.set(P.clientX,P.clientY),m.subVectors(x,v).multiplyScalar(i.panSpeed),k(m.x,m.y),v.copy(x),i.update()}function Te(P){$(P.clientX,P.clientY),P.deltaY<0?q(w(P.deltaY)):P.deltaY>0&&V(w(P.deltaY)),i.update()}function we(P){let oe=!1;switch(P.code){case i.keys.UP:P.ctrlKey||P.metaKey||P.shiftKey?ee(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,i.keyPanSpeed),oe=!0;break;case i.keys.BOTTOM:P.ctrlKey||P.metaKey||P.shiftKey?ee(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,-i.keyPanSpeed),oe=!0;break;case i.keys.LEFT:P.ctrlKey||P.metaKey||P.shiftKey?W(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(i.keyPanSpeed,0),oe=!0;break;case i.keys.RIGHT:P.ctrlKey||P.metaKey||P.shiftKey?W(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(-i.keyPanSpeed,0),oe=!0;break}oe&&(P.preventDefault(),i.update())}function De(P){if(A.length===1)f.set(P.pageX,P.pageY);else{const oe=Oe(P),me=.5*(P.pageX+oe.x),le=.5*(P.pageY+oe.y);f.set(me,le)}}function Ie(P){if(A.length===1)v.set(P.pageX,P.pageY);else{const oe=Oe(P),me=.5*(P.pageX+oe.x),le=.5*(P.pageY+oe.y);v.set(me,le)}}function Re(P){const oe=Oe(P),me=P.pageX-oe.x,le=P.pageY-oe.y,ye=Math.sqrt(me*me+le*le);d.set(0,ye)}function Ye(P){i.enableZoom&&Re(P),i.enablePan&&Ie(P)}function M(P){i.enableZoom&&Re(P),i.enableRotate&&De(P)}function U(P){if(A.length==1)h.set(P.pageX,P.pageY);else{const me=Oe(P),le=.5*(P.pageX+me.x),ye=.5*(P.pageY+me.y);h.set(le,ye)}p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const oe=i.domElement;W(2*Math.PI*p.x/oe.clientHeight),ee(2*Math.PI*p.y/oe.clientHeight),f.copy(h)}function F(P){if(A.length===1)x.set(P.pageX,P.pageY);else{const oe=Oe(P),me=.5*(P.pageX+oe.x),le=.5*(P.pageY+oe.y);x.set(me,le)}m.subVectors(x,v).multiplyScalar(i.panSpeed),k(m.x,m.y),v.copy(x)}function X(P){const oe=Oe(P),me=P.pageX-oe.x,le=P.pageY-oe.y,ye=Math.sqrt(me*me+le*le);y.set(0,ye),S.set(0,Math.pow(y.y/d.y,i.zoomSpeed)),V(S.y),d.copy(y);const ke=(P.pageX+oe.x)*.5,Ke=(P.pageY+oe.y)*.5;$(ke,Ke)}function B(P){i.enableZoom&&X(P),i.enablePan&&F(P)}function Q(P){i.enableZoom&&X(P),i.enableRotate&&U(P)}function te(P){i.enabled!==!1&&(A.length===0&&(i.domElement.setPointerCapture(P.pointerId),i.domElement.addEventListener("pointermove",g),i.domElement.addEventListener("pointerup",_)),Me(P),P.pointerType==="touch"?ae(P):R(P))}function g(P){i.enabled!==!1&&(P.pointerType==="touch"?re(P):j(P))}function _(P){Ae(P),A.length===0&&(i.domElement.releasePointerCapture(P.pointerId),i.domElement.removeEventListener("pointermove",g),i.domElement.removeEventListener("pointerup",_)),i.dispatchEvent(If),r=s.NONE}function R(P){let oe;switch(P.button){case 0:oe=i.mouseButtons.LEFT;break;case 1:oe=i.mouseButtons.MIDDLE;break;case 2:oe=i.mouseButtons.RIGHT;break;default:oe=-1}switch(oe){case Yn.DOLLY:if(i.enableZoom===!1)return;fe(P),r=s.DOLLY;break;case Yn.ROTATE:if(P.ctrlKey||P.metaKey||P.shiftKey){if(i.enablePan===!1)return;ue(P),r=s.PAN}else{if(i.enableRotate===!1)return;se(P),r=s.ROTATE}break;case Yn.PAN:if(P.ctrlKey||P.metaKey||P.shiftKey){if(i.enableRotate===!1)return;se(P),r=s.ROTATE}else{if(i.enablePan===!1)return;ue(P),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(ol)}function j(P){switch(r){case s.ROTATE:if(i.enableRotate===!1)return;J(P);break;case s.DOLLY:if(i.enableZoom===!1)return;ce(P);break;case s.PAN:if(i.enablePan===!1)return;Se(P);break}}function O(P){i.enabled===!1||i.enableZoom===!1||r!==s.NONE||(P.preventDefault(),i.dispatchEvent(ol),Te(P),i.dispatchEvent(If))}function G(P){i.enabled===!1||i.enablePan===!1||we(P)}function ae(P){switch(ne(P),A.length){case 1:switch(i.touches.ONE){case Qi.ROTATE:if(i.enableRotate===!1)return;De(P),r=s.TOUCH_ROTATE;break;case Qi.PAN:if(i.enablePan===!1)return;Ie(P),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(i.touches.TWO){case Qi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ye(P),r=s.TOUCH_DOLLY_PAN;break;case Qi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;M(P),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(ol)}function re(P){switch(ne(P),r){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;U(P),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;F(P),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;B(P),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Q(P),i.update();break;default:r=s.NONE}}function he(P){i.enabled!==!1&&P.preventDefault()}function Me(P){A.push(P.pointerId)}function Ae(P){delete H[P.pointerId];for(let oe=0;oe<A.length;oe++)if(A[oe]==P.pointerId){A.splice(oe,1);return}}function ne(P){let oe=H[P.pointerId];oe===void 0&&(oe=new Ee,H[P.pointerId]=oe),oe.set(P.pageX,P.pageY)}function Oe(P){const oe=P.pointerId===A[0]?A[1]:A[0];return H[oe]}i.domElement.addEventListener("contextmenu",he),i.domElement.addEventListener("pointerdown",te),i.domElement.addEventListener("pointercancel",_),i.domElement.addEventListener("wheel",O,{passive:!1}),this.update()}}const $d={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class js{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const sy=new zd(-1,1,1,-1,0,1);class ry extends vt{constructor(){super(),this.setAttribute("position",new Tt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Tt([0,2,0,0,2,0],2))}}const oy=new ry;class ac{constructor(e){this._mesh=new Dt(oy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,sy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Zd extends js{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof St?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Tr.clone(e.uniforms),this.material=new St({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ac(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ff extends js{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class ay extends js{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ly{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Ee);this._width=i.width,this._height=i.height,t=new wn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ti}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zd($d),this.copyPass.material.blending=ei,this.clock=new ey}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ff!==void 0&&(a instanceof Ff?i=!0:a instanceof ay&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class cy extends js{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new He}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const uy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new He(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ws extends js{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new Ee(e.x,e.y):new Ee(256,256),this.clearColor=new He(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new wn(r,a,{type:ti}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const h=new wn(r,a,{type:ti});h.texture.name="UnrealBloomPass.h"+f,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const p=new wn(r,a,{type:ti});p.texture.name="UnrealBloomPass.v"+f,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}const o=uy;this.highPassUniforms=Tr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new St({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new Ee(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=$d;this.copyUniforms=Tr.clone(u.uniforms),this.blendMaterial=new St({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:an,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new He,this.oldClearAlpha=1,this.basic=new ra,this.fsQuad=new ac(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ee(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ws.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ws.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new St({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ee(.5,.5)},direction:{value:new Ee(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new St({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ws.BlurDirectionX=new Ee(1,0);Ws.BlurDirectionY=new Ee(0,1);const fy={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class hy extends js{constructor(){super();const e=fy;this.uniforms=Tr.clone(e.uniforms),this.material=new YS({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ac(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},st.getTransfer(this._outputColorSpace)===ut&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===dd?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===pd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===md?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===$l?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===gd&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Jd extends Lt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ee(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const Ss=new L,Of=new it,Bf=new it,zf=new L,Hf=new L;class dy{constructor(e={}){const t=this;let i,s,r,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(p,v){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),Of.copy(v.matrixWorldInverse),Bf.multiplyMatrices(v.projectionMatrix,Of),c(p,p,v),h(p)},this.setSize=function(p,v){i=p,s=v,r=i/2,a=s/2,l.style.width=p+"px",l.style.height=v+"px"};function c(p,v,x){if(p.isCSS2DObject){Ss.setFromMatrixPosition(p.matrixWorld),Ss.applyMatrix4(Bf);const m=p.visible===!0&&Ss.z>=-1&&Ss.z<=1&&p.layers.test(x.layers)===!0;if(p.element.style.display=m===!0?"":"none",m===!0){p.onBeforeRender(t,v,x);const y=p.element;y.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(Ss.x*r+r)+"px,"+(-Ss.y*a+a)+"px)",y.parentNode!==l&&l.appendChild(y),p.onAfterRender(t,v,x)}const d={distanceToCameraSquared:u(x,p)};o.objects.set(p,d)}for(let m=0,d=p.children.length;m<d;m++)c(p.children[m],v,x)}function u(p,v){return zf.setFromMatrixPosition(p.matrixWorld),Hf.setFromMatrixPosition(v.matrixWorld),zf.distanceToSquared(Hf)}function f(p){const v=[];return p.traverse(function(x){x.isCSS2DObject&&v.push(x)}),v}function h(p){const v=f(p).sort(function(m,d){if(m.renderOrder!==d.renderOrder)return d.renderOrder-m.renderOrder;const y=o.objects.get(m).distanceToCameraSquared,S=o.objects.get(d).distanceToCameraSquared;return y-S}),x=v.length;for(let m=0,d=v.length;m<d;m++)v[m].element.style.zIndex=x-m}}}const Ot=Math.PI*2,zo=Math.PI/180,hi=(n,e,t)=>new L(n,e,t),py=(n,e,t)=>Math.max(e,Math.min(t,n)),Qd=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2,lc=n=>Math.round(n).toLocaleString("en-US"),ze=(n,e)=>n+Math.random()*(e-n),vr=n=>30*Math.pow(n,.8),my=n=>Math.max(.32,1.6*Math.pow(n/12742,.55));function As(n,e,t){const i=Math.sin(n*127.1+e*311.7+t*74.7)*43758.5453;return i-Math.floor(i)}const ep=n=>n<=0?0:Math.pow(10,n*.03)-1;function gy(n,e){let t=n+e*Math.sin(n);for(let i=0;i<4;i++)t-=(t-e*Math.sin(t)-n)/(1-e*Math.cos(t));return t}const _y=new L(1,0,0),Gf=new L(0,1,0);function tp(n,e,t){const i=gy(e,n.e),s=n.a*(Math.cos(i)-n.e),r=n.a*Math.sqrt(1-n.e*n.e)*Math.sin(i);return t.set(s,0,r),t.applyAxisAngle(Gf,n.peri),t.applyAxisAngle(_y,n.i),t.applyAxisAngle(Gf,n.node),t}function cc(n,e,t){return tp(n,n.M0+Ot/n.period*e,t)}const uc=`
float hash13(vec3 p3){ p3 = fract(p3*0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y)*p3.z); }
vec3 hash33(vec3 p3){ p3 = fract(p3*vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx)*p3.zyx); }
float noise3(vec3 p){
  vec3 i = floor(p); vec3 f = fract(p);
  f = f*f*(3.0 - 2.0*f);
  return mix(mix(mix(hash13(i+vec3(0.0,0.0,0.0)), hash13(i+vec3(1.0,0.0,0.0)), f.x),
                 mix(hash13(i+vec3(0.0,1.0,0.0)), hash13(i+vec3(1.0,1.0,0.0)), f.x), f.y),
             mix(mix(hash13(i+vec3(0.0,0.0,1.0)), hash13(i+vec3(1.0,0.0,1.0)), f.x),
                 mix(hash13(i+vec3(0.0,1.0,1.0)), hash13(i+vec3(1.0,1.0,1.0)), f.x), f.y), f.z);
}
float fbm(vec3 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<4;i++){ v += a*noise3(p); p = p*2.03 + vec3(1.7, 9.2, 3.1); a *= 0.5; }
  return v;
}
float voro(vec3 p, float j, out vec3 id){
  vec3 ip = floor(p); vec3 fp = fract(p);
  float f1 = 8.0; vec3 mg = vec3(0.0);
  for(int x=-1;x<=1;x++) for(int y=-1;y<=1;y++) for(int z=-1;z<=1;z++){
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 o = hash33(ip + g)*j;
    vec3 r = g + o - fp;
    float d = dot(r, r);
    if(d < f1){ f1 = d; mg = ip + g; }
  }
  id = mg;
  return sqrt(f1);
}
float wlon(float x){ return mod(x + 3.14159265, 6.2831853) - 3.14159265; }
`,vy=`
varying vec3 vObjN;
varying vec3 vWorldPos;
varying vec3 vWorldN;
void main(){
  vObjN = normal;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vWorldN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,xy=`
uniform float uTime;
uniform int uType;
uniform vec3 uSunPos;
uniform vec3 uTint; // 升级：逐天体色调微调（默认白）
varying vec3 vObjN;
varying vec3 vWorldPos;
varying vec3 vWorldN;
`+uc+`
float earthCont(vec3 p){
  return fbm(p*1.9 + vec3(31.7)) - 0.52 + 0.36*(fbm(p*5.5 + vec3(7.3)) - 0.5);
}
float earthCloud(vec3 p, float T){
  vec3 q = p*2.5;
  q += 0.45*vec3(fbm(q + vec3(T*0.015)), fbm(q + vec3(5.2,1.3,2.8) + vec3(T*0.012)), fbm(q + vec3(9.7,3.5,6.1)));
  float c = fbm(q*1.6 + vec3(T*0.02, 0.0, T*0.008));
  return smoothstep(0.47, 0.72, c);
}
float craterField(vec3 p, float scale, float density){
  vec3 id; float d = voro(p*scale, 1.0, id);
  float h = hash13(id);
  if(h >= density) return 0.0;
  float bowl = 1.0 - smoothstep(0.1, 0.55, d);
  float rim = 1.0 - smoothstep(0.02, 0.14, abs(d - 0.5));
  return rim*0.3 - bowl*0.38;
}
vec3 ovalSpot(vec3 base, vec3 p, float lon, float lat, float slon, float slat,
              float sx, float sy, vec3 cCore, vec3 cEdge, float irr, float swirlAmt, float T){
  float du = wlon(lon - slon)/sx;
  float dv = (lat - slat)/sy;
  float r = length(vec2(du, dv)) + (fbm(p*6.0 + vec3(7.0)) - 0.5)*irr;
  if(r >= 1.0) return base;
  float ang = atan(dv, du) + swirlAmt*(1.0 - r) + T*0.1;
  float rings = 0.5 + 0.5*sin(r*12.0 - T*0.5 + ang*2.0);
  vec3 sc = mix(cCore, cEdge, smoothstep(0.0, 0.9, r));
  sc = mix(sc, cEdge*1.1, rings*0.25*(1.0 - r));
  float m = 1.0 - smoothstep(0.72, 1.0, r);
  return mix(base, sc, m);
}
vec3 sunColor(vec3 p, float T){
  float n1 = fbm(p*3.0 + vec3(0.0, 0.0, T*0.05));
  float n2 = fbm(p*7.0 - vec3(T*0.08, T*0.03, 0.0));
  float n3 = fbm(p*16.0 + vec3(0.0, T*0.12, T*0.06));
  float plasma = n1*0.55 + n2*0.3 + n3*0.15;
  vec3 col = mix(vec3(0.80, 0.18, 0.01), vec3(1.0, 0.52, 0.07), smoothstep(0.24, 0.52, plasma));
  col = mix(col, vec3(1.0, 0.90, 0.58), smoothstep(0.62, 0.90, plasma));
  vec3 id; float d = voro(p*14.0 + vec3(0.0, 0.0, T*0.04), 1.0, id);
  col *= 0.88 + 0.24*(1.0 - d);
  vec3 id2; float d2 = voro(p*2.5 + vec3(T*0.005, 0.0, T*0.003), 0.85, id2);
  float spot = (1.0 - smoothstep(0.08, 0.4, d2))*step(0.6, hash13(id2));
  col = mix(col, vec3(0.22, 0.07, 0.01), spot*0.85);
  return col;
}
vec3 planetColor(int t, vec3 p, float T){
  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);
  vec3 col = vec3(0.5);
  if(t == 1){ // 水星：灰白 + 细胞噪声环形山
    col = mix(vec3(0.34,0.32,0.31), vec3(0.62,0.60,0.57), fbm(p*5.0)*0.7 + fbm(p*16.0)*0.3);
    col += craterField(p, 9.0, 0.6);
    col += craterField(p, 22.0, 0.5)*0.6;
    col *= 0.9 + 0.2*fbm(p*40.0);
  }
  else if(t == 2){ // 金星：湍流云层
    vec3 q = p*2.2;
    vec3 r = p + 0.55*vec3(fbm(q*1.5 + vec3(3.1,0.0,0.0) + vec3(0.0,0.0,T*0.01)),
                           fbm(q*1.5 + vec3(9.2,4.0,1.0)),
                           fbm(q*1.5 + vec3(5.5,7.0,2.0)));
    float cl = fbm(r*3.0 + vec3(0.0, T*0.02, T*0.008));
    float bands = sin(p.y*7.0 + cl*5.0)*0.5 + 0.5;
    col = mix(vec3(0.84,0.70,0.44), vec3(0.96,0.90,0.72), cl);
    col = mix(col, vec3(0.90,0.78,0.54), bands*0.3);
  }
  else if(t == 3){ // 地球：海洋/大陆/云/冰盖
    float cont = earthCont(p);
    vec3 ocean = mix(vec3(0.10,0.42,0.50), vec3(0.02,0.10,0.30), smoothstep(0.0, 0.3, -cont));
    ocean = mix(ocean, vec3(0.01,0.05,0.18), smoothstep(0.2, 0.6, -cont));
    float moist = fbm(p*4.0 + vec3(11.0));
    vec3 land = mix(vec3(0.12,0.34,0.11), vec3(0.45,0.34,0.18), smoothstep(0.3, 0.75, moist));
    land = mix(land, vec3(0.52,0.46,0.38), smoothstep(0.55, 0.9, fbm(p*7.0 + vec3(5.0)))*0.6);
    land *= 0.85 + 0.3*fbm(p*14.0);
    vec3 surf = cont > 0.0 ? land : ocean;
    float ice = smoothstep(1.02, 1.22, abs(lat) + (fbm(p*6.0) - 0.5)*0.35);
    surf = mix(surf, vec3(0.90,0.93,0.96), ice);
    float cl = earthCloud(p, T);
    col = mix(surf, vec3(0.96,0.97,0.99), cl*0.92);
  }
  else if(t == 4){ // 月球：月海 + 环形山
    col = mix(vec3(0.42,0.41,0.40), vec3(0.66,0.65,0.63), fbm(p*5.0)*0.7 + fbm(p*18.0)*0.3);
    float maria = smoothstep(0.55, 0.72, fbm(p*1.6 + vec3(3.0)));
    col = mix(col, vec3(0.26,0.25,0.25), maria*0.7);
    col += craterField(p, 8.0, 0.6);
    col += craterField(p, 20.0, 0.55)*0.7;
  }
  else if(t == 5){ // 火星：玄武岩暗区/峡谷/极冠
    col = mix(vec3(0.52,0.24,0.11), vec3(0.76,0.42,0.20), fbm(p*3.5));
    float dark = smoothstep(0.55, 0.78, fbm(p*1.8 + vec3(7.0)));
    col = mix(col, vec3(0.28,0.14,0.09), dark*0.65);
    float rid = 1.0 - abs(2.0*fbm(p*vec3(4.0,2.0,4.0) + vec3(3.0)) - 1.0);
    float canyon = smoothstep(0.86, 0.98, rid)*(1.0 - smoothstep(0.15, 0.55, abs(p.y)));
    col = mix(col, vec3(0.24,0.10,0.06), canyon*0.55);
    col += craterField(p, 12.0, 0.45)*0.6;
    float cap = smoothstep(1.12, 1.3, abs(lat) + (fbm(p*8.0) - 0.5)*0.2);
    col = mix(col, vec3(0.95,0.93,0.90), cap);
    col *= 0.88 + 0.24*fbm(p*22.0);
  }
  else if(t == 6){ // 木星：拉伸湍流条带 + 大红斑 + 小涡旋
    float zone = p.y;
    float turb = fbm(vec3(p.x*3.0, p.y*10.0, p.z*3.0) + vec3(T*0.02, 0.0, 0.0));
    float bands = sin(zone*9.5 + turb*5.0 + sin(zone*3.0)*1.5);
    col = mix(vec3(0.76,0.48,0.25), vec3(0.90,0.82,0.68), smoothstep(-0.7, 0.7, bands));
    col = mix(col, vec3(0.55,0.32,0.17), smoothstep(0.55, 0.95, sin(zone*9.5 + 1.7 + turb*5.0))*0.6);
    col = mix(col, vec3(0.82,0.42,0.28), smoothstep(0.6, 1.0, sin(zone*4.0 - 0.5 + turb*2.5))*0.35);
    float streak = fbm(vec3(p.x*8.0, p.y*30.0, p.z*8.0) + vec3(T*0.03, 0.0, 0.0));
    col *= 0.9 + 0.2*streak;
    col = mix(col, vec3(0.42,0.36,0.30), smoothstep(0.72, 0.95, abs(zone))*0.55);
    col = ovalSpot(col, p, lon, lat, 1.1 + T*0.004, -0.38, 0.55, 0.17,
                   vec3(0.75,0.20,0.12), vec3(0.92,0.55,0.45), 0.4, 5.0, T);
    col = ovalSpot(col, p, lon, lat, 2.6 + T*0.003, 0.32, 0.20, 0.09,
                   vec3(0.96,0.94,0.90), vec3(0.85,0.80,0.72), 0.35, 3.0, T);
    col = ovalSpot(col, p, lon, lat, -0.7 - T*0.005, -0.05, 0.15, 0.07,
                   vec3(0.90,0.85,0.75), vec3(0.70,0.55,0.40), 0.3, 3.0, T);
    col = ovalSpot(col, p, lon, lat, -2.2 + T*0.006, 0.14, 0.12, 0.06,
                   vec3(0.72,0.50,0.35), vec3(0.55,0.35,0.22), 0.3, 2.5, T);
  }
  else if(t == 7){ // 土星：淡金条带
    float zone = p.y;
    float turb = fbm(vec3(p.x*2.5, p.y*8.0, p.z*2.5));
    float bands = sin(zone*8.0 + turb*2.5);
    col = mix(vec3(0.85,0.74,0.52), vec3(0.94,0.87,0.70), smoothstep(-0.7, 0.7, bands));
    col = mix(col, vec3(0.78,0.66,0.45), smoothstep(0.5, 0.95, sin(zone*6.0 + 1.0 + turb*3.0))*0.3);
    float streak = fbm(vec3(p.x*6.0, p.y*24.0, p.z*6.0));
    col *= 0.94 + 0.12*streak;
    col = mix(col, vec3(0.60,0.52,0.40), smoothstep(0.75, 0.95, abs(zone))*0.4);
  }
  else if(t == 8){ // 天王星：青绿均匀大气
    float n = fbm(p*3.0);
    col = mix(vec3(0.48,0.76,0.78), vec3(0.60,0.84,0.85), n);
    float bands = sin(p.y*5.0 + fbm(p*2.0)*1.5)*0.5 + 0.5;
    col *= 0.97 + 0.06*bands;
    col = mix(col, vec3(0.72,0.90,0.90), smoothstep(0.6, 0.95, p.y)*0.35);
  }
  else if(t == 9){ // 海王星：深蓝 + 大暗斑 + 卷云
    float n = fbm(p*3.5 + vec3(0.0, 0.0, T*0.01));
    col = mix(vec3(0.10,0.22,0.60), vec3(0.22,0.40,0.80), n);
    float streak = fbm(vec3(p.x*6.0, p.y*20.0, p.z*6.0) + vec3(T*0.02, 0.0, 0.0));
    col *= 0.9 + 0.2*streak;
    col = ovalSpot(col, p, lon, lat, 0.8 + T*0.005, -0.28, 0.32, 0.16,
                   vec3(0.04,0.08,0.30), vec3(0.10,0.16,0.42), 0.35, 3.0, T);
    float cirrus = smoothstep(0.88, 0.99, 1.0 - abs(2.0*fbm(p*vec3(5.0,9.0,5.0) + vec3(4.0)) - 1.0));
    col = mix(col, vec3(0.85,0.90,1.0), cirrus*0.5);
  }
  else if(t == 10){ // 冥王星：汤博区（爱心）
    col = mix(vec3(0.50,0.38,0.27), vec3(0.74,0.60,0.45), fbm(p*3.0 + vec3(2.0)));
    float dark = smoothstep(0.55, 0.8, fbm(p*2.0 + vec3(8.0)));
    col = mix(col, vec3(0.28,0.18,0.12), dark*0.6);
    col += craterField(p, 10.0, 0.4)*0.4;
    float hx = wlon(lon - 0.6)/0.85*1.05;
    float hy = (lat - 0.02)/0.72*1.05 - 0.12;
    float hb = hx*hx + hy*hy - 1.0;
    float hy2 = hy*hy;
    float h = hb*hb*hb - hx*hx*hy2*hy2*hy;
    h += (fbm(p*7.0) - 0.5)*0.5;
    float heart = 1.0 - smoothstep(-0.12, 0.18, h);
    col = mix(col, vec3(0.91,0.89,0.85), heart*0.95);
    col = mix(col, vec3(0.82,0.86,0.92), heart*0.25*fbm(p*12.0));
  }
  else if(t == 11){ // 木卫一：火山 + 硫磺
    col = mix(vec3(0.85,0.62,0.18), vec3(0.96,0.80,0.36), fbm(p*4.0));
    float g = smoothstep(0.58, 0.8, fbm(p*3.0 + vec3(5.0)));
    col = mix(col, vec3(0.52,0.62,0.22), g*0.65);
    vec3 id; float d = voro(p*7.0, 1.0, id);
    if(hash13(id) < 0.35){
      col = mix(col, vec3(0.12,0.09,0.05), (1.0 - smoothstep(0.06, 0.3, d))*0.9);
      col += vec3(0.45,0.16,0.0)*(1.0 - smoothstep(0.0, 0.12, abs(d - 0.34)));
    }
  }
  else if(t == 12){ // 木卫二：冰壳裂纹
    col = vec3(0.88,0.87,0.84)*(0.9 + 0.2*fbm(p*6.0));
    float r1 = 1.0 - abs(2.0*fbm(p*5.0 + vec3(1.0)) - 1.0);
    float r2 = 1.0 - abs(2.0*fbm(p*9.0 + vec3(4.0)) - 1.0);
    col = mix(col, vec3(0.55,0.28,0.18), smoothstep(0.90, 1.0, r1)*0.75);
    col = mix(col, vec3(0.66,0.42,0.30), smoothstep(0.88, 1.0, r2)*0.5);
  }
  else if(t == 13){ // 木卫三/天卫三：明暗槽沟
    float terr = smoothstep(0.4, 0.6, fbm(p*2.5));
    col = mix(vec3(0.42,0.37,0.32), vec3(0.62,0.60,0.56), terr);
    float grooves = smoothstep(0.85, 1.0, 1.0 - abs(2.0*fbm(p*6.0 + vec3(2.0)) - 1.0));
    col *= 1.0 - grooves*0.25;
    col += craterField(p, 11.0, 0.45)*0.5;
  }
  else if(t == 14){ // 木卫四/天卫四：密集撞击点
    col = vec3(0.30,0.28,0.26)*(0.8 + 0.4*fbm(p*4.0));
    vec3 id; float d = voro(p*12.0, 1.0, id);
    if(hash13(id) < 0.55) col += vec3(0.55,0.54,0.50)*(1.0 - smoothstep(0.05, 0.4, d))*0.7;
  }
  else if(t == 15){ // 土卫六：橘色霾层
    col = mix(vec3(0.84,0.58,0.24), vec3(0.90,0.68,0.34), fbm(p*2.5));
    float dk = smoothstep(0.55, 0.72, fbm(p*1.5 + vec3(3.0)))*(1.0 - smoothstep(0.2, 0.7, abs(p.y)));
    col = mix(col, vec3(0.48,0.32,0.14), dk*0.6);
    col = mix(col, vec3(0.88,0.64,0.30), 0.35);
  }
  else if(t == 16){ // 土卫二：南极蓝色虎纹
    col = vec3(0.93,0.95,0.97)*(0.92 + 0.16*fbm(p*8.0));
    float sband = (1.0 - smoothstep(-1.12, -0.85, lat))*smoothstep(-1.5, -1.18, lat);
    float s = sin(lon*7.0 + fbm(p*4.0)*3.0);
    float stripe = smoothstep(0.55, 0.9, s)*sband;
    col = mix(col, vec3(0.40,0.65,0.82), stripe*0.75);
  }
  else if(t == 17){ // 土卫一：赫歇尔陨石坑
    col = mix(vec3(0.45,0.44,0.43), vec3(0.66,0.65,0.63), fbm(p*5.0));
    col += craterField(p, 9.0, 0.5)*0.8;
    vec3 hc = normalize(vec3(0.8, 0.25, 0.5));
    float dd = distance(p, hc);
    col *= 1.0 - (1.0 - smoothstep(0.15, 0.6, dd))*0.45;
    col += (1.0 - smoothstep(0.0, 0.14, abs(dd - 0.58)))*0.28;
    col += (1.0 - smoothstep(0.0, 0.12, dd))*0.22;
  }
  else if(t == 18){ // 土卫八：双色表面
    float side = dot(p, normalize(vec3(1.0, 0.12, 0.3)));
    float m = smoothstep(-0.18, 0.18, side + (fbm(p*5.0) - 0.5)*0.5);
    vec3 dk2 = vec3(0.16,0.10,0.07)*(0.8 + 0.4*fbm(p*7.0));
    vec3 br = vec3(0.85,0.84,0.80)*(0.85 + 0.3*fbm(p*7.0));
    col = mix(br, dk2, m);
  }
  else if(t == 19){ col = vec3(0.92,0.93,0.95)*(0.88 + 0.24*fbm(p*5.0)); } // 阋神星
  else if(t == 20){ col = mix(vec3(0.58,0.34,0.24), vec3(0.74,0.48,0.34), fbm(p*4.0)); } // 鸟神星
  else if(t == 21){ // 妊神星
    col = mix(vec3(0.70,0.68,0.66), vec3(0.84,0.82,0.80), fbm(p*4.0));
    float rp = 1.0 - smoothstep(0.1, 0.5, distance(p, normalize(vec3(0.4,0.5,0.75))));
    col = mix(col, vec3(0.62,0.34,0.26), rp*0.6);
  }
  else if(t == 22){ col = mix(vec3(0.38,0.11,0.07), vec3(0.58,0.19,0.11), fbm(p*4.0)); } // 共工星/塞德娜（深红）
  else if(t == 23){ // 谷神星：白色盐斑
    col = vec3(0.26,0.25,0.24)*(0.8 + 0.4*fbm(p*5.0));
    col += craterField(p, 10.0, 0.5)*0.5;
    vec3 id; float d = voro(p*6.0, 1.0, id);
    if(hash13(id) < 0.12) col += vec3(0.9,0.92,0.95)*(1.0 - smoothstep(0.02, 0.3, d));
  }
  else if(t == 24){ col = mix(vec3(0.48,0.24,0.17), vec3(0.62,0.34,0.24), fbm(p*4.0)); } // 创神星/伐楼那
  else if(t == 25){ col = mix(vec3(0.62,0.60,0.58), vec3(0.78,0.76,0.74), fbm(p*4.0)); } // 亡神星
  else if(t == 26){ col = mix(vec3(0.32,0.13,0.09), vec3(0.46,0.20,0.13), fbm(p*4.0)); } // 伊克西翁
  else if(t == 27){ // 灶神星/爱神星
    col = mix(vec3(0.52,0.50,0.47), vec3(0.72,0.68,0.62), fbm(p*4.5));
    col += craterField(p, 9.0, 0.55)*0.7;
  }
  else if(t == 28){ // 智神星/暗色小天体/彗核
    col = mix(vec3(0.30,0.29,0.28), vec3(0.44,0.42,0.40), fbm(p*4.0));
    col += craterField(p, 10.0, 0.5)*0.6;
  }
  // ===== 升级：新增着色器类型 =====
  else if(t == 29){ // 海卫一：粉白氮冰 + 哈密瓜地形 + 黑色喷发条纹
    col = mix(vec3(0.80,0.72,0.68), vec3(0.88,0.83,0.79), fbm(p*3.0));
    vec3 idc; float dc = voro(p*14.0, 1.0, idc);
    col *= 0.90 + 0.20*dc;
    float cap = 1.0 - smoothstep(-0.9, -0.45, lat);
    col = mix(col, vec3(0.93,0.90,0.87), cap*0.65);
    float gey = smoothstep(0.72, 0.95, sin(lon*9.0 + fbm(p*5.0)*2.0))*cap;
    col = mix(col, vec3(0.24,0.19,0.17), gey*0.5);
  }
  else if(t == 30){ // 冥卫一：灰褐 + 峡谷 + 北极红帽（魔多）
    col = mix(vec3(0.48,0.45,0.42), vec3(0.62,0.60,0.57), fbm(p*4.0));
    col += craterField(p, 9.0, 0.5)*0.6;
    float ch = 1.0 - abs(2.0*fbm(p*3.0 + vec3(5.0)) - 1.0);
    col *= 1.0 - smoothstep(0.9, 1.0, ch)*0.3;
    float cap = smoothstep(0.85, 1.2, lat + (fbm(p*6.0) - 0.5)*0.2);
    col = mix(col, vec3(0.48,0.26,0.18), cap*0.75);
  }
  else if(t == 31){ // 冰质卫星通用：亮冰 + 冰晶条纹（土卫三/四/五、天卫一）
    col = mix(vec3(0.78,0.79,0.82), vec3(0.90,0.91,0.93), fbm(p*5.0));
    col += craterField(p, 10.0, 0.5)*0.5;
    float w = 1.0 - abs(2.0*fbm(p*4.0 + vec3(9.0)) - 1.0);
    col += vec3(0.22,0.23,0.25)*smoothstep(0.88, 1.0, w);
  }
  else if(t == 32){ // 天卫五：拼接冕状物
    vec3 idp; voro(p*2.5, 0.9, idp);
    float hp = hash13(idp);
    col = mix(vec3(0.40,0.40,0.43), vec3(0.62,0.60,0.58), hp);
    float gg = smoothstep(0.8, 1.0, 1.0 - abs(2.0*fbm(p*7.0 + idp) - 1.0));
    col *= 1.0 - gg*0.25*step(0.5, hp);
    col *= 0.9 + 0.2*fbm(p*12.0);
  }
  return max(col * uTint, vec3(0.0));
}
void main(){
  vec3 p = normalize(vObjN);
  float T = uTime;
  vec3 Vv = normalize(cameraPosition - vWorldPos);
  if(uType == 0){ // 太阳：发光体 + 临边昏暗
    vec3 sc = sunColor(p, T);
    float mu = max(dot(normalize(vWorldN), Vv), 0.0);
    sc *= 0.55 + 0.45*mu;
    gl_FragColor = vec4(sc*1.25, 1.0);
    return;
  }
  vec3 col = planetColor(uType, p, T);
  vec3 N = normalize(vWorldN);
  vec3 L = normalize(uSunPos - vWorldPos);
  float ndl = dot(N, L);
  float diff = max(ndl, 0.0);
  float day = smoothstep(-0.10, 0.16, ndl);
  vec3 lit = col*(0.03 + 1.15*diff);
  // 升级：大气行星晨昏线边缘散射（伪瑞利 rim）
  float rim = pow(1.0 - max(dot(N, Vv), 0.0), 3.0)*day;
  if(uType == 2) lit += vec3(0.95,0.85,0.60)*rim*0.25;
  else if(uType == 3){
    lit += vec3(0.35,0.55,1.00)*rim*0.28;
    // 地球夜景灯光 + 海面镜面高光
    float cont = earthCont(p);
    vec3 cid; float vd = voro(p*40.0, 1.0, cid);
    float city = step(0.78, hash13(cid))*(1.0 - smoothstep(0.2, 0.5, vd));
    city *= smoothstep(0.02, 0.1, cont);
    city *= 0.4 + 0.6*fbm(p*10.0 + vec3(2.0));
    lit += vec3(1.0, 0.72, 0.38)*city*(1.0 - day)*1.8;
    if(cont < -0.01){
      vec3 H = normalize(L + Vv);
      float spec = pow(max(dot(N, H), 0.0), 52.0);
      lit += vec3(1.0, 0.95, 0.85)*spec*0.7*day*(1.0 - earthCloud(p, T));
    }
  }
  else if(uType == 5) lit += vec3(0.90,0.50,0.35)*rim*0.16;
  else if(uType == 15) lit += vec3(1.00,0.65,0.30)*rim*0.40;
  gl_FragColor = vec4(lit, 1.0);
}
`,My=`
varying vec3 vWN; varying vec3 vWP;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  vWN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Sy=`
uniform vec3 uColor; uniform float uPow; uniform float uInt;
varying vec3 vWN; varying vec3 vWP;
void main(){
  vec3 Vv = normalize(cameraPosition - vWP);
  vec3 N = normalize(vWN);
  float f = pow(clamp(1.0 - dot(Vv, N), 0.0, 1.0), uPow);
  gl_FragColor = vec4(uColor*f*uInt, f*uInt);
}`,yy=`
varying vec3 vPos;
void main(){
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,by=uc+`
uniform float uInner; uniform float uOuter; uniform float uAlpha;
uniform vec3 uSunLocal; uniform float uPlanetR; // 升级：环上行星阴影
varying vec3 vPos;
void main(){
  float r = length(vPos.xy);
  float t = (r - uInner)/(uOuter - uInner);
  float n = noise3(vec3(t*55.0, 0.0, 0.0))*0.6 + noise3(vec3(t*14.0, 3.7, 0.0))*0.4;
  float alpha = 0.22 + 0.72*n;
  float cass = smoothstep(0.012, 0.045, abs(t - 0.68));
  alpha *= 0.06 + 0.94*cass;
  alpha *= smoothstep(0.0, 0.06, t)*(1.0 - smoothstep(0.85, 1.0, t));
  vec3 c = mix(vec3(0.86,0.79,0.61), vec3(0.70,0.57,0.42), smoothstep(0.0, 0.55, t));
  c = mix(c, vec3(0.60,0.65,0.73), smoothstep(0.6, 1.0, t));
  vec2 cell = vec2(floor(t*700.0), floor((atan(vPos.y, vPos.x)/6.2831853 + 0.5)*256.0));
  if(hash13(vec3(cell, 7.0)) < 0.22) discard;
  alpha *= 0.65 + 0.35*hash13(vec3(cell, 3.0));
  // 行星本影：向太阳方向的射线若撞到行星球体则衰减
  float sd = dot(vPos, uSunLocal);
  if(sd < 0.0){
    vec3 perp = vPos - sd*uSunLocal;
    if(dot(perp, perp) < uPlanetR*uPlanetR) alpha *= 0.12;
  }
  gl_FragColor = vec4(c, alpha*uAlpha);
}`,Ey=`
attribute float aSize; attribute float aPhase; attribute vec3 aColor;
varying vec3 vC; varying float vP;
void main(){
  vC = aColor; vP = aPhase;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (1600.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`,Ty=`
uniform float uTime; uniform float uOpacity;
varying vec3 vC; varying float vP;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = (1.0 - smoothstep(0.08, 0.5, d));
  float tw = 0.72 + 0.28*sin(uTime*2.2 + vP*40.0);
  gl_FragColor = vec4(vC, a*tw*uOpacity);
}`,wy=`
uniform float uTime; uniform float uR;
attribute vec3 aDir; attribute float aSeed;
varying float vLife;
void main(){
  float life = fract(uTime*0.06*(0.4 + aSeed) + aSeed*11.0);
  vLife = life;
  float dist = uR*(1.02 + life*1.4);
  vec4 mv = modelViewMatrix * vec4(aDir*dist, 1.0);
  gl_PointSize = min((1.0 - life)*(1.2 + aSeed*1.2)*(420.0 / -mv.z), 6.0); // 封顶，防止近景糊成大团块
  gl_Position = projectionMatrix * mv;
}`,Ay=`
varying float vLife;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = (1.0 - smoothstep(0.1, 0.5, d))*(1.0 - vLife)*smoothstep(0.0, 0.12, vLife)*0.22;
  gl_FragColor = vec4(vec3(1.0, 0.75, 0.4)*1.5, a);
}`,Ry=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.0); }`,Cy=`
uniform float uOpacity;
varying vec2 vUv;
void main(){
  float x = vUv.x;
  float a = pow(x, 2.4)*(1.0 - abs(vUv.y*2.0 - 1.0));
  vec3 col = mix(vec3(1.0, 0.75, 0.4), vec3(1.0), pow(x, 3.0));
  gl_FragColor = vec4(col*1.8, a*uOpacity);
}`,Py=`
varying vec3 vWP;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Ly=uc+`
varying vec3 vWP;
void main(){
  vec3 d = normalize(vWP);
  vec3 col = mix(vec3(0.016,0.018,0.045), vec3(0.030,0.014,0.060), smoothstep(-1.0, 1.0, d.y));
  float n = fbm(d*3.5);
  col += vec3(0.035,0.030,0.075)*smoothstep(0.45, 0.8, n)*0.8;
  col += vec3(0.050,0.020,0.050)*smoothstep(0.6, 0.9, fbm(d*2.0 + vec3(7.0)))*0.5;
  // 升级：程序化银河带（亮星云絮 + 尘埃暗带）
  vec3 gn = normalize(vec3(0.42, 0.86, 0.28));
  float gd = dot(d, gn);
  float band = exp(-gd*gd*14.0);
  float wisp = fbm(d*5.0 + vec3(3.0));
  float lane = fbm(d*7.0 + vec3(11.0));
  vec3 mw = vec3(0.55, 0.60, 0.78)*band*(0.30 + 0.70*wisp);
  mw *= 1.0 - 0.55*smoothstep(0.45, 0.75, lane)*band;
  col += mw*0.38;
  gl_FragColor = vec4(col, 1.0);
}`,Dy={uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l0 = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c += vec3(-0.004, 0.002, 0.020)*(1.0 - l0);
      c = (c - 0.5)*1.055 + 0.5;
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l), c, 1.10);
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    }`};function Uy(n,e){return new St({uniforms:{uTime:{value:0},uType:{value:n},uSunPos:{value:new L},uTint:{value:e?new L(e[0],e[1],e[2]):new L(1,1,1)}},vertexShader:vy,fragmentShader:xy})}function Iy(n,e,t,i){return{mat:new St({uniforms:{uColor:{value:new He(n)},uPow:{value:t},uInt:{value:i}},vertexShader:My,fragmentShader:Sy,transparent:!0,blending:an,side:Ht,depthWrite:!1}),scale:e}}function Ny(n,e,t,i){const s=new oc(n*e,n*t,160,1);s.rotateX(-Math.PI/2);const r=new St({uniforms:{uInner:{value:n*e},uOuter:{value:n*t},uAlpha:{value:i},uSunLocal:{value:new L(1,0,0)},uPlanetR:{value:n}},vertexShader:yy,fragmentShader:by,transparent:!0,side:Sn,depthWrite:!1});return new Dt(s,r)}const Fy=[{id:"sun",name:"太阳",en:"Sun",cat:"恒星",sh:0,km:695700,fixedR:10,color:16765562,rotH:609.1,tilt:7.25,temp:"表面约 5,505°C",moons:"—",labelMax:1e9},{id:"mercury",name:"水星",en:"Mercury",cat:"行星",sh:1,km:4879,color:11049612,au:.387,e:.206,i:7,per:87.97,rotH:1407.6,tilt:.03,temp:"-173 ~ 427°C",moons:"0",labelMax:130},{id:"venus",name:"金星",en:"Venus",cat:"行星",sh:2,km:12104,color:15255672,au:.723,e:.007,i:3.39,per:224.7,rotH:-5832.5,tilt:177.4,temp:"约 464°C",moons:"0",labelMax:200,atmo:{c:15255672,s:1.05,p:2.4,i:.55}},{id:"earth",name:"地球",en:"Earth",cat:"行星",sh:3,km:12742,color:5609983,au:1,e:.017,i:0,per:365.25,rotH:23.93,tilt:23.44,temp:"-88 ~ 58°C",moons:"1",labelMax:220,atmo:{c:6725887,s:1.035,p:3,i:.85}},{id:"moon",name:"月球",en:"Moon",cat:"卫星",sh:4,km:3475,color:11184810,parent:"earth",orbitR:4.4,e:.055,i:5.14,per:27.32,smaKm:384400,temp:"-173 ~ 127°C",moons:"—",labelMax:60},{id:"mars",name:"火星",en:"Mars",cat:"行星",sh:5,km:6779,color:13657146,au:1.524,e:.093,i:1.85,per:686.98,rotH:24.62,tilt:25.19,temp:"-153 ~ 20°C",moons:"2",labelMax:220,atmo:{c:14191194,s:1.03,p:3.2,i:.32}},{id:"phobos",name:"火卫一",en:"Phobos",cat:"卫星",sh:28,km:22.5,color:9076596,parent:"mars",orbitR:2.3,e:.0151,i:1.09,per:.319,rotH:7.65,smaKm:9376,temp:"约 -40°C",moons:"—",labelMax:22,irregular:.28},{id:"deimos",name:"火卫二",en:"Deimos",cat:"卫星",sh:28,km:12.4,color:10129284,parent:"mars",orbitR:3.2,e:2e-4,i:1.79,per:1.263,rotH:30.3,smaKm:23463,temp:"约 -40°C",moons:"—",labelMax:22,irregular:.24},{id:"jupiter",name:"木星",en:"Jupiter",cat:"行星",sh:6,km:69911,color:14196832,au:5.203,e:.049,i:1.3,per:4332.6,rotH:9.93,tilt:3.13,temp:"约 -108°C",moons:"95",labelMax:700},{id:"io",name:"木卫一 · 伊奥",en:"Io",cat:"卫星",sh:11,km:3643,color:15253568,parent:"jupiter",orbitR:8.4,e:.004,i:.05,per:1.769,smaKm:421700,temp:"约 -143°C",moons:"—",labelMax:70},{id:"europa",name:"木卫二 · 欧罗巴",en:"Europa",cat:"卫星",sh:12,km:3122,color:14208960,parent:"jupiter",orbitR:10.6,e:.009,i:.47,per:3.551,smaKm:670900,temp:"约 -171°C",moons:"—",labelMax:70},{id:"ganymede",name:"木卫三 · 盖尼米得",en:"Ganymede",cat:"卫星",sh:13,km:5268,color:10129280,parent:"jupiter",orbitR:13.2,e:.001,i:.2,per:7.155,smaKm:1070400,temp:"约 -163°C",moons:"—",labelMax:80},{id:"callisto",name:"木卫四 · 卡里斯托",en:"Callisto",cat:"卫星",sh:14,km:4821,color:6972766,parent:"jupiter",orbitR:16.8,e:.007,i:.19,per:16.689,smaKm:1882700,temp:"约 -139°C",moons:"—",labelMax:80},{id:"saturn",name:"土星",en:"Saturn",cat:"行星",sh:7,km:58232,color:14731408,au:9.537,e:.057,i:2.49,per:10759.2,rotH:10.66,tilt:26.73,temp:"约 -139°C",moons:"146",labelMax:900,tint:[.9,.87,.82],ring:{inner:1.24,outer:2.32,alpha:.95}},{id:"mimas",name:"土卫一 · 弥玛斯",en:"Mimas",cat:"卫星",sh:17,km:396,color:10132120,parent:"saturn",orbitR:11.8,e:.02,i:1.57,per:.942,smaKm:185540,temp:"约 -209°C",moons:"—",labelMax:55},{id:"enceladus",name:"土卫二 · 恩克拉多斯",en:"Enceladus",cat:"卫星",sh:16,km:504,color:15266036,parent:"saturn",orbitR:13.5,e:.005,i:.02,per:1.37,smaKm:237950,temp:"约 -201°C",moons:"—",labelMax:55},{id:"tethys",name:"土卫三 · 忒堤斯",en:"Tethys",cat:"卫星",sh:31,km:1062,color:13685978,parent:"saturn",orbitR:15.2,e:0,i:1.12,per:1.888,smaKm:294670,temp:"约 -187°C",moons:"—",labelMax:60},{id:"dione",name:"土卫四 · 狄俄涅",en:"Dione",cat:"卫星",sh:31,km:1123,color:13159634,parent:"saturn",orbitR:16.1,e:.002,i:.02,per:2.737,smaKm:377420,temp:"约 -186°C",moons:"—",labelMax:60},{id:"rhea",name:"土卫五 · 瑞亚",en:"Rhea",cat:"卫星",sh:31,km:1530,color:13949148,parent:"saturn",orbitR:17.2,e:.001,i:.35,per:4.518,smaKm:527070,temp:"约 -174°C",moons:"—",labelMax:65},{id:"titan",name:"土卫六 · 泰坦",en:"Titan",cat:"卫星",sh:15,km:5150,color:14721104,parent:"saturn",orbitR:19.2,e:.029,i:.35,per:15.945,smaKm:1221870,temp:"约 -179°C",moons:"—",labelMax:100,atmo:{c:14719040,s:1.1,p:2.2,i:.65}},{id:"iapetus",name:"土卫八 · 伊阿珀托斯",en:"Iapetus",cat:"卫星",sh:18,km:1469,color:11577496,parent:"saturn",orbitR:24.2,e:.028,i:15.5,per:79.322,smaKm:3560820,temp:"约 -143°C",moons:"—",labelMax:90},{id:"uranus",name:"天王星",en:"Uranus",cat:"行星",sh:8,km:25362,color:8968408,au:19.19,e:.046,i:.77,per:30688.5,rotH:-17.24,tilt:97.77,temp:"约 -197°C",moons:"28",labelMax:600,ring:{inner:1.85,outer:2,alpha:.28}},{id:"miranda",name:"天卫五 · 米兰达",en:"Miranda",cat:"卫星",sh:32,km:472,color:11053232,parent:"uranus",orbitR:7.2,e:.001,i:4.34,per:1.413,smaKm:129390,temp:"约 -187°C",moons:"—",labelMax:45},{id:"ariel",name:"天卫一 · 艾瑞尔",en:"Ariel",cat:"卫星",sh:31,km:1158,color:12633290,parent:"uranus",orbitR:8.4,e:.001,i:.04,per:2.52,smaKm:190900,temp:"约 -213°C",moons:"—",labelMax:50},{id:"umbriel",name:"天卫二 · 乌姆柏里厄尔",en:"Umbriel",cat:"卫星",sh:28,km:1169,color:6974066,parent:"uranus",orbitR:9.7,e:.004,i:.13,per:4.144,smaKm:266e3,temp:"约 -198°C",moons:"—",labelMax:50},{id:"titania",name:"天卫三 · 泰坦妮亚",en:"Titania",cat:"卫星",sh:13,km:1578,color:10524816,parent:"uranus",orbitR:11.4,e:.001,i:.08,per:8.706,smaKm:435910,temp:"约 -203°C",moons:"—",labelMax:55},{id:"oberon",name:"天卫四 · 奥伯龙",en:"Oberon",cat:"卫星",sh:14,km:1523,color:9076600,parent:"uranus",orbitR:13.6,e:.001,i:.07,per:13.463,smaKm:583520,temp:"约 -193°C",moons:"—",labelMax:55},{id:"neptune",name:"海王星",en:"Neptune",cat:"行星",sh:9,km:24622,color:4485344,au:30.07,e:.01,i:1.77,per:60182,rotH:16.11,tilt:28.32,temp:"约 -201°C",moons:"16",labelMax:600,ring:{inner:2.05,outer:2.15,alpha:.16}},{id:"proteus",name:"海卫八 · 普罗透斯",en:"Proteus",cat:"卫星",sh:28,km:420,color:6974064,parent:"neptune",orbitR:5.3,e:0,i:.52,per:1.122,smaKm:117647,temp:"约 -220°C",moons:"—",labelMax:40,irregular:.22},{id:"triton",name:"海卫一 · 特里同",en:"Triton",cat:"卫星",sh:29,km:2707,color:14207168,parent:"neptune",orbitR:7.1,e:0,i:156.9,per:5.877,rotH:-141.1,smaKm:354760,temp:"约 -235°C",moons:"—",labelMax:90},{id:"nereid",name:"海卫二 · 涅瑞伊得",en:"Nereid",cat:"卫星",sh:28,km:340,color:10132128,parent:"neptune",orbitR:16,e:.75,i:7.23,per:360.13,rotH:11.6,smaKm:5513818,temp:"约 -220°C",moons:"—",labelMax:70},{id:"pluto",name:"冥王星",en:"Pluto",cat:"矮行星",sh:10,km:2377,color:13150336,au:39.48,e:.249,i:17.14,per:90560,rotH:-153.3,tilt:122.5,temp:"-233 ~ -223°C",moons:"5",labelMax:500},{id:"charon",name:"冥卫一 · 卡戎",en:"Charon",cat:"卫星",sh:30,km:1212,color:10129288,parent:"pluto",orbitR:2.3,e:0,i:.08,per:6.387,smaKm:19591,temp:"约 -220°C",moons:"—",labelMax:40},{id:"eris",name:"阋神星",en:"Eris",cat:"矮行星",sh:19,km:2326,color:15265008,au:67.67,e:.436,i:44.04,per:203600,rotH:25.9,temp:"-243 ~ -217°C",moons:"1",labelMax:800},{id:"makemake",name:"鸟神星",en:"Makemake",cat:"矮行星",sh:20,km:1430,color:12613712,au:45.43,e:.161,i:29,per:111800,rotH:22.8,temp:"约 -239°C",moons:"1",labelMax:650},{id:"haumea",name:"妊神星",en:"Haumea",cat:"矮行星",sh:21,km:1632,color:13683912,au:43.22,e:.195,i:28.22,per:103300,rotH:3.92,temp:"约 -241°C",moons:"2",labelMax:650,elongate:[1.55,.78,.8]},{id:"gonggong",name:"共工星",en:"Gonggong",cat:"矮行星",sh:22,km:1230,color:10500136,au:67.3,e:.5,i:30.7,per:202e3,rotH:44.8,temp:"约 -240°C",moons:"1",labelMax:750},{id:"ceres",name:"谷神星",en:"Ceres",cat:"矮行星",sh:23,km:940,color:9078400,au:2.767,e:.079,i:10.59,per:1680.5,rotH:9.07,temp:"约 -105°C",moons:"0",labelMax:150},{id:"quaoar",name:"创神星",en:"Quaoar",cat:"矮行星",sh:24,km:1110,color:10510400,au:43.69,e:.039,i:7.99,per:105300,rotH:17.68,temp:"约 -230°C",moons:"1",labelMax:650},{id:"orcus",name:"亡神星",en:"Orcus",cat:"矮行星",sh:25,km:910,color:12104880,au:39.17,e:.226,i:20.6,per:89800,rotH:13.2,temp:"约 -238°C",moons:"1",labelMax:600},{id:"ixion",name:"伊克西翁",en:"Ixion",cat:"矮行星",sh:26,km:620,color:8011824,au:39.65,e:.243,i:19.6,per:91400,rotH:12.4,temp:"约 -235°C",moons:"—",labelMax:600},{id:"sedna",name:"塞德娜",en:"Sedna",cat:"矮行星",sh:22,km:995,color:11552816,au:506.8,e:.841,i:11.93,per:4159500,rotH:10.3,temp:"约 -240°C",moons:"0",labelMax:1100,M0fix:.02},{id:"varuna",name:"伐楼那",en:"Varuna",cat:"矮行星",sh:24,km:668,color:10115648,au:43,e:.051,i:17.2,per:102900,rotH:6.34,temp:"约 -232°C",moons:"—",labelMax:640},{id:"vesta",name:"灶神星",en:"Vesta",cat:"小行星",sh:27,km:525,color:11577498,au:2.362,e:.089,i:7.14,per:1325.4,rotH:5.34,temp:"-188 ~ -18°C",moons:"0",labelMax:130},{id:"pallas",name:"智神星",en:"Pallas",cat:"小行星",sh:28,km:512,color:9079434,au:2.773,e:.231,i:34.84,per:1686,rotH:7.81,temp:"约 -118°C",moons:"0",labelMax:130,irregular:.18},{id:"juno",name:"婚神星",en:"Juno",cat:"小行星",sh:28,km:234,color:10130058,au:2.669,e:.255,i:12.97,per:1593.7,rotH:7.21,temp:"约 -112°C",moons:"0",labelMax:120,irregular:.26},{id:"hygiea",name:"健神星",en:"Hygiea",cat:"小行星",sh:28,km:434,color:8354420,au:3.142,e:.112,i:3.84,per:2033.5,rotH:27.6,temp:"约 -123°C",moons:"0",labelMax:125},{id:"eros",name:"爱神星",en:"Eros",cat:"小行星",sh:27,km:16.8,color:12624e3,au:1.458,e:.223,i:10.83,per:643.2,rotH:5.27,temp:"-150 ~ 100°C",moons:"0",labelMax:110,elongate:[2.1,.8,.7],tint:[1,.88,.72]},{id:"halley",name:"哈雷彗星",en:"Halley",cat:"彗星",sh:28,km:11,fixedR:.3,color:11195647,au:17.83,e:.967,i:162.26,per:27508,rotH:52.8,temp:"彗核约 -70°C",moons:"—",labelMax:500,M0fix:3.28}],di=new L;function Oy(n,e){const t=new Float32Array((e+1)*3),i=new L;for(let s=0;s<=e;s++)tp(n,Ot*s/e,i),t[s*3]=i.x,t[s*3+1]=i.y,t[s*3+2]=i.z;return t}function np(n,e,t){const i=new vt;i.setAttribute("position",new rt(Oy(n,256),3));const s=e.cat==="矮行星"||e.cat==="彗星",r=s?new Yd({color:e.color,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:t?.1:.22}):new la({color:e.color,transparent:!0,opacity:t?.1:.32}),a=new nc(i,r);return s&&a.computeLineDistances(),a.frustumCulled=!1,a}function By(n,e,t){const i=e.fixedR||my(e.km),s={def:e,r:i,baseR:i,mat:null,mesh:null,holder:new gn,tiltG:new gn,sizeG:new gn,orbit:null,orbitLine:null,label:null,atmoMesh:null,ringMesh:null,spin:0};s.holder.add(s.tiltG),s.tiltG.rotation.z=(e.tilt||0)*zo,s.tiltG.add(s.sizeG);const r=i>3?[64,44]:i>1?[48,32]:[28,20],a=new Vs(i,r[0],r[1]);if(e.elongate&&a.scale(e.elongate[0],e.elongate[1],e.elongate[2]),e.irregular){const l=a.attributes.position;for(let c=0;c<l.count;c++){di.fromBufferAttribute(l,c);const u=1+e.irregular*(As(di.x*3.1,di.y*3.7,di.z*4.3)-.5)*2;di.multiplyScalar(u),l.setXYZ(c,di.x,di.y,di.z)}a.computeVertexNormals()}if(s.mat=Uy(e.sh,e.tint),s.mesh=new Dt(a,s.mat),s.mesh.userData.body=s,s.sizeG.add(s.mesh),n.pickables.push(s.mesh),e.atmo){const l=Iy(e.atmo.c,e.atmo.s,e.atmo.p,e.atmo.i);s.atmoMesh=new Dt(new Vs(i*l.scale,40,28),l.mat),s.sizeG.add(s.atmoMesh)}e.ring&&(s.ringMesh=Ny(i,e.ring.inner,e.ring.outer,e.ring.alpha),s.sizeG.add(s.ringMesh));const o=document.createElement("div");if(o.className="lbl",o.textContent=e.name,s.label=new Jd(o),s.label.position.set(0,i*1.7+.6,0),s.holder.add(s.label),e.parent||e.au){const l=!!e.parent;s.orbit={a:l?e.orbitR:vr(e.au),e:e.e||0,i:(e.i||0)*zo,peri:As(t,3,7)*Ot,node:As(t,11,5)*Ot,period:e.per,M0:e.M0fix!==void 0?e.M0fix:As(t,17,23)*Ot},s.orbitLine=np(s.orbit,e,l),n.orbitLines.push({line:s.orbitLine,body:s})}return s.spin=e.rotH?Ot/(e.rotH/24):e.per?Ot/e.per:0,n.bodies.push(s),n.bodyById[e.id]=s,s}function zy(n){Fy.forEach((e,t)=>By(n,e,t));for(const e of n.bodies){const t=e.def.parent;if(t){const i=n.bodyById[t];i.holder.add(e.holder),e.orbitLine&&i.holder.add(e.orbitLine)}else e.def.id!=="sun"?(n.scene.add(e.holder),e.orbitLine&&n.scene.add(e.orbitLine)):n.scene.add(e.holder)}n.sunBody=n.bodyById.sun}const Is={};function fc(n){const e=n.map(a=>a[0]+":"+a[1]).join("|");if(Is[e])return Is[e];const t=document.createElement("canvas");t.width=t.height=128;const i=t.getContext("2d"),s=i.createRadialGradient(64,64,0,64,64,64);for(const a of n)s.addColorStop(a[0],a[1]);i.fillStyle=s,i.fillRect(0,0,128,128);const r=new ic(t);return r.colorSpace=bt,Is[e]=r,r}function Hy(){if(Is.streak)return Is.streak;const n=document.createElement("canvas");n.width=512,n.height=64;const e=n.getContext("2d"),t=e.createLinearGradient(0,0,512,0);t.addColorStop(0,"rgba(255,240,200,0)"),t.addColorStop(.5,"rgba(255,220,150,0.85)"),t.addColorStop(1,"rgba(255,180,80,0)"),e.fillStyle=t,e.fillRect(0,0,512,64),e.globalCompositeOperation="destination-in";const i=e.createLinearGradient(0,0,0,64);i.addColorStop(0,"rgba(255,255,255,0)"),i.addColorStop(.5,"rgba(255,255,255,1)"),i.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=i,e.fillRect(0,0,512,64);const s=new ic(n);return s.colorSpace=bt,Is.streak=s,s}function Gy(n){const e=n.sunBody,t=e.r,i=[{s:t*3,stops:[[0,"rgba(255,250,230,1)"],[.25,"rgba(255,210,120,0.85)"],[.6,"rgba(255,150,40,0.28)"],[1,"rgba(255,120,20,0)"]],o:.95},{s:t*6.5,stops:[[0,"rgba(255,200,110,0.55)"],[.4,"rgba(255,160,60,0.20)"],[1,"rgba(255,120,30,0)"]],o:.6},{s:t*9,stops:[[0,"rgba(255,170,80,0.13)"],[.5,"rgba(255,140,50,0.05)"],[1,"rgba(255,120,30,0)"]],o:.38}];for(const h of i){const p=new ks({map:fc(h.stops),transparent:!0,opacity:h.o,blending:an,depthWrite:!1}),v=new wr(p);v.scale.set(h.s,h.s,1),e.holder.add(v)}const s=new wr(new ks({map:Hy(),transparent:!0,opacity:.7,blending:an,depthWrite:!1,rotation:.35}));s.scale.set(t*13,t*1.8,1),e.holder.add(s),e.flare=s;const r=900,a=new vt,o=new Float32Array(r*3),l=new Float32Array(r),c=new L;for(let h=0;h<r;h++)c.set(ze(-1,1),ze(-1,1),ze(-1,1)).normalize(),o[h*3]=c.x,o[h*3+1]=c.y,o[h*3+2]=c.z,l[h]=Math.random();a.setAttribute("position",new rt(new Float32Array(r*3),3)),a.setAttribute("aDir",new rt(o,3)),a.setAttribute("aSeed",new rt(l,1));const u=new St({uniforms:{uTime:{value:0},uR:{value:t}},vertexShader:wy,fragmentShader:Ay,transparent:!0,blending:an,depthWrite:!1}),f=new Ar(a,u);f.frustumCulled=!1,e.holder.add(f),e.windMat=u}function ky(n){const e=n.bodyById.halley,t=new ks({map:fc([[0,"rgba(220,235,255,0.95)"],[.3,"rgba(170,205,255,0.45)"],[1,"rgba(120,170,255,0)"]]),transparent:!0,opacity:0,blending:an,depthWrite:!1});e.coma=new wr(t),e.coma.scale.set(2.2,2.2,1),e.holder.add(e.coma);const i=220;e.tails=[];for(const s of["ion","dust"]){const r=new vt;r.setAttribute("position",new rt(new Float32Array(i*3),3));const a=new Float32Array(i*3);for(let u=0;u<i;u++){const f=u/(i-1),h=1-f;s==="ion"?(a[u*3]=.45*h+.05,a[u*3+1]=.65*h+.08,a[u*3+2]=1*h+.15):(a[u*3]=1*h+.06,a[u*3+1]=.85*h+.05,a[u*3+2]=.55*h+.03)}r.setAttribute("color",new rt(a,3));const o=new Bo({size:s==="ion"?.32:.5,vertexColors:!0,transparent:!0,opacity:0,blending:an,depthWrite:!1,sizeAttenuation:!0}),l=new Ar(r,o);l.frustumCulled=!1,n.scene.add(l);const c=new Float32Array(i*2);for(let u=0;u<i*2;u++)c[u]=ze(-1,1);e.tails.push({pts:l,m:o,g:r,kind:s,spread:c})}e.velPrev=new L,e.hasVelPrev=!1,n.comet=e}const mo=new L,Ii=new L,Vy=new L;function Wy(n){const e=n.comet,t=e.holder.position.length(),i=py((150-t)/90,0,1);e.coma.material.opacity=i*.5;const s=2+i*19,r=1.5+i*10;mo.copy(e.holder.position).normalize(),e.hasVelPrev?Ii.copy(e.holder.position).sub(e.velPrev):Ii.set(0,0,0),e.velPrev.copy(e.holder.position),e.hasVelPrev=!0;const a=Ii.length();a>1e-6&&Ii.divideScalar(a);for(const o of e.tails){const l=o.g.attributes.position,c=o.kind==="ion"?s:r;if(o.m.opacity=i<.02?0:i*(o.kind==="ion"?.42:.28),o.pts.visible=i>=.02,!o.pts.visible)continue;const u=e.holder.getWorldPosition(Vy);for(let f=0;f<220;f++){const h=f/219;let p=u.x+mo.x*h*c,v=u.y+mo.y*h*c,x=u.z+mo.z*h*c;if(o.kind==="dust"){const d=h*h*r*.6;p-=Ii.x*d,v-=Ii.y*d,x-=Ii.z*d}const m=(o.kind==="ion"?.1:.35)*h*c*.15;p+=o.spread[f*2]*m,v+=o.spread[f*2+1]*m*.6,x+=o.spread[(f*2+37)%440]*m,l.setXYZ(f,p,v,x)}l.needsUpdate=!0}}function go(n,e){const t={def:e,r:.24,baseR:.24,holder:new gn,orbit:null,orbitLine:null,spin:0},i=new Dt(new Vs(.24,10,8),new ra({color:16771488}));i.userData.body=t,t.mesh=i,t.holder.add(i),n.pickables.push(i);const s=new wr(new ks({map:fc([[0,"rgba(255,240,200,0.9)"],[1,"rgba(255,220,140,0)"]]),transparent:!0,opacity:.8,blending:an,depthWrite:!1}));s.scale.set(2.4,2.4,1),t.holder.add(s);const r=document.createElement("div");if(r.className="lbl",r.textContent=e.name,t.label=new Jd(r),t.label.position.set(0,1.2,0),t.holder.add(t.label),e.parent){t.orbit={a:e.orbitR,e:e.e,i:e.i*zo,peri:0,node:As(9,1,4)*Ot,period:e.per,M0:ze(0,Ot)},t.orbitLine=np(t.orbit,{color:16771488,cat:"探测器"},!0);const a=n.bodyById[e.parent];a.tiltG.add(t.holder),a.tiltG.add(t.orbitLine)}else t.holder.position.set(e.dir[0],e.dir[1],e.dir[2]).normalize().multiplyScalar(vr(e.auDist)),n.scene.add(t.holder);return n.bodies.push(t),n.bodyById[e.id]=t,t}function Xy(n){go(n,{id:"voyager1",name:"旅行者1号",en:"Voyager 1",cat:"探测器",auDist:162,dir:[.72,.58,-.38],smaText:"约 162 AU · 星际空间",temp:"—",moons:"—",km:"—",labelMax:2200}),go(n,{id:"voyager2",name:"旅行者2号",en:"Voyager 2",cat:"探测器",auDist:136,dir:[-.62,-.55,.56],smaText:"约 136 AU · 日鞘",temp:"—",moons:"—",km:"—",labelMax:2200}),go(n,{id:"newhorizons",name:"新视野号",en:"New Horizons",cat:"探测器",auDist:58,dir:[.82,-.05,.58],smaText:"约 58 AU · 柯伊伯带",temp:"—",moons:"—",km:"—",labelMax:1600}),go(n,{id:"junoProbe",name:"朱诺号",en:"Juno (spacecraft)",cat:"探测器",parent:"jupiter",orbitR:8.6,e:.45,i:90,per:43,smaKm:816e3,temp:"—",moons:"—",km:"—",labelMax:70})}const Es=200,_o=new L;function jy(n){const e=new gn;n.scene.add(e),n.trailGroup=e,n.trails=[];for(const t of["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"]){const i=n.bodyById[t],s=new vt;s.setAttribute("position",new rt(new Float32Array(Es*3),3));const r=new Float32Array(Es*3),a=new He(i.def.color);for(let l=0;l<Es;l++){const c=1-l/(Es-1);r[l*3]=a.r*c*c,r[l*3+1]=a.g*c*c,r[l*3+2]=a.b*c*c}s.setAttribute("color",new rt(r,3));const o=new nc(s,new la({vertexColors:!0,transparent:!0,opacity:.55,blending:an,depthWrite:!1}));o.frustumCulled=!1,e.add(o),n.trails.push({b:i,g:s,dt:i.orbit.period/Es})}}function qy(n){for(const e of n.trails){const t=e.g.attributes.position;for(let i=0;i<Es;i++)cc(e.b.orbit,n.sim.motionDays-i*e.dt,_o),t.setXYZ(i,_o.x,_o.y,_o.z);t.needsUpdate=!0}}const un=new L,kf=new L,Vf=new Ei,Wf=new L,Xf=new it;function Yy(n){const e=new gn;n.scene.add(e),n.beltGroup=e,n.beltData=[];{const a=new KS({color:10129280});for(let o=0;o<3;o++){const l=new rc(1,1),c=l.attributes.position,u=o*13.7;for(let h=0;h<c.count;h++){un.fromBufferAttribute(c,h);const p=1+.38*(As(un.x*2.1+u,un.y*2.7,un.z*3.3)-.5)*2;un.multiplyScalar(p),c.setXYZ(h,un.x,un.y,un.z)}l.computeVertexNormals();const f=new qS(l,a,220);f.instanceMatrix.setUsage(Fg),f.frustumCulled=!1,e.add(f);for(let h=0;h<220;h++){const p=ze(2.06,3.27);n.beltData.push({im:f,idx:h,orbit:{a:vr(p),e:ze(0,.22),i:ze(0,11)*zo,peri:ze(0,Ot),node:ze(0,Ot),period:365.25*Math.pow(p,1.5),M0:ze(0,Ot)},s:ze(.05,.3)*(o===0?1.3:1),rot:ze(0,Ot),rotSpd:ze(-1.5,1.5),ax:new L(ze(-1,1),ze(-1,1),ze(-1,1)).normalize()}),f.setColorAt(h,new He().setHSL(.08+Math.random()*.04,ze(.05,.2),ze(.35,.62)))}f.instanceColor.needsUpdate=!0}}const t=new gn;n.scene.add(t),n.kuiperGroup=t;{const r=new Float32Array(5400),a=new Float32Array(1800*3);for(let c=0;c<1800;c++){const u=ze(vr(30.5),vr(55)),f=ze(0,Ot),h=ze(-1,1)*22*(u/500);r[c*3]=Math.cos(f)*u,r[c*3+1]=h,r[c*3+2]=Math.sin(f)*u;const p=new He().setHSL(ze(.55,.65),ze(.1,.4),ze(.55,.85));a[c*3]=p.r,a[c*3+1]=p.g,a[c*3+2]=p.b}const o=new vt;o.setAttribute("position",new rt(r,3)),o.setAttribute("color",new rt(a,3));const l=new Ar(o,new Bo({size:.9,vertexColors:!0,transparent:!0,opacity:.75,depthWrite:!1,sizeAttenuation:!0}));l.frustumCulled=!1,t.add(l)}const i=new gn;n.scene.add(i),n.oortGroup=i;{const r=new Float32Array(1350);for(let l=0;l<450;l++)un.set(ze(-1,1),ze(-1,1),ze(-1,1)).normalize().multiplyScalar(ze(1500,2400)),r[l*3]=un.x,r[l*3+1]=un.y,r[l*3+2]=un.z;const a=new vt;a.setAttribute("position",new rt(r,3));const o=new Ar(a,new Bo({color:12571903,size:1.1,transparent:!0,opacity:.45,depthWrite:!1}));o.frustumCulled=!1,i.add(o)}}function Ky(n){for(const e of n.beltData)cc(e.orbit,n.sim.motionDays,kf),Vf.setFromAxisAngle(e.ax,e.rot+n.sim.motionDays*e.rotSpd),Wf.setScalar(e.s),Xf.compose(kf,Vf,Wf),e.im.setMatrixAt(e.idx,Xf);for(const e of n.beltGroup.children)e.instanceMatrix.needsUpdate=!0}const zi=8500,vo=new L;function $y(n){const e=new Float32Array(zi*3),t=new Float32Array(zi),i=new Float32Array(zi),s=new Float32Array(zi*3),r=[[.72,.8,1],[1,1,1],[1,.95,.85],[1,.85,.65],[1,.7,.5],[.9,.92,1]];for(let c=0;c<zi;c++){vo.set(ze(-1,1),ze(-1,1),ze(-1,1)).normalize().multiplyScalar(ze(4200,8500)),e[c*3]=vo.x,e[c*3+1]=vo.y,e[c*3+2]=vo.z,t[c]=ze(.8,2.6),i[c]=Math.random();const u=r[Math.random()*r.length|0],f=ze(.45,1);s[c*3]=u[0]*f,s[c*3+1]=u[1]*f,s[c*3+2]=u[2]*f}const a=new vt;a.setAttribute("position",new rt(e,3)),a.setAttribute("aSize",new rt(t,1)),a.setAttribute("aPhase",new rt(i,1)),a.setAttribute("aColor",new rt(s,3));const o=new St({uniforms:{uTime:{value:0},uOpacity:{value:1}},vertexShader:Ey,fragmentShader:Ty,transparent:!0,blending:an,depthWrite:!1}),l=new Ar(a,o);l.frustumCulled=!1,n.scene.add(l),n.starGeo=a,n.starMat=o}function Zy(n){const e=new Dt(new Vs(11500,48,32),new St({vertexShader:Py,fragmentShader:Ly,side:Ht,depthWrite:!1}));e.frustumCulled=!1,n.scene.add(e)}const jf=new L,qf=new L,Jy=new L(1,0,0);function Qy(n){n.meteors=[];const e=new oa(1,1);for(let t=0;t<6;t++){const i=new Dt(e,new St({uniforms:{uOpacity:{value:0}},vertexShader:Ry,fragmentShader:Cy,transparent:!0,blending:an,depthWrite:!1,side:Sn}));i.visible=!1,i.frustumCulled=!1,n.scene.add(i),n.meteors.push({m:i,life:0,dur:1,vel:new L,active:!1})}}function eb(n,e){if(Math.random()<e*.25){const t=n.meteors.find(i=>!i.active);t&&(t.active=!0,t.life=0,t.dur=ze(.6,1.3),jf.set(ze(-1,1),ze(-.4,.8),ze(-1,1)).normalize().multiplyScalar(ze(1400,2400)),t.m.position.copy(jf),t.vel.set(ze(-1,1),ze(-1,1),ze(-1,1)).normalize().multiplyScalar(ze(700,1300)),qf.copy(t.vel).normalize(),t.m.quaternion.setFromUnitVectors(Jy,qf),t.m.scale.set(ze(140,300),2.2,1),t.m.visible=!0)}for(const t of n.meteors){if(!t.active)continue;t.life+=e;const i=t.life/t.dur;if(i>=1){t.active=!1,t.m.visible=!1;continue}t.m.position.addScaledVector(t.vel,e),t.m.material.uniforms.uOpacity.value=Math.sin(Math.PI*i)*.9}}const Yf=Date.UTC(2024,0,1),al=[{id:"sun",m:4.5},{id:"mercury",m:7},{id:"venus",m:6},{id:"earth",m:6},{id:"moon",m:8},{id:"mars",m:6},{id:"jupiter",m:5},{id:"saturn",m:8},{id:"uranus",m:6},{id:"neptune",m:6},{id:"pluto",m:12},{id:"halley",m:10,min:16}];class tb{constructor({container:e,labelLayer:t,hooks:i={}}){var l,c;this.container=e,this.labelLayer=t,this.hooks=i;const s=this.renderer=new jd({antialias:!0,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio,1.75)),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=$l,s.toneMappingExposure=1.12,e.appendChild(s.domElement);const r=this.scene=new WS;r.background=new He(263695);const a=this.camera=new sn(52,window.innerWidth/window.innerHeight,.1,3e4);a.position.set(0,155,400);const o=this.controls=new iy(a,s.domElement);o.enableDamping=!0,o.dampingFactor=.06,o.rotateSpeed=.55,o.panSpeed=.8,o.minDistance=.4,o.maxDistance=2600,o.mouseButtons={LEFT:Yn.ROTATE,MIDDLE:Yn.DOLLY,RIGHT:Yn.PAN},this._onContextMenu=u=>u.preventDefault(),s.domElement.addEventListener("contextmenu",this._onContextMenu),this.labelRenderer=new dy,this.labelRenderer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.inset="0",this.labelRenderer.domElement.style.pointerEvents="none",t.appendChild(this.labelRenderer.domElement),this.sunLight=new JS(16773853,2.2,0,0),r.add(this.sunLight),this.ambient=new QS(8952251,.14),r.add(this.ambient),this.composer=new ly(s),this.composer.addPass(new cy(r,a)),this.bloomPass=new Ws(new Ee(window.innerWidth,window.innerHeight),.95,.7,.85),this.composer.addPass(this.bloomPass),this.composer.addPass(new hy),this.composer.addPass(new Zd(Dy)),this.sim={motionDays:0,clockDays:0},this.ctx={scene:r,sim:this.sim,bodies:[],bodyById:{},pickables:[],orbitLines:[],sunPos:new L(0,0,0)},zy(this.ctx),Gy(this.ctx),ky(this.ctx),Xy(this.ctx),this._createMarker(),jy(this.ctx),Yy(this.ctx),$y(this.ctx),Zy(this.ctx),Qy(this.ctx),(c=(l=this.hooks).onCount)==null||c.call(l,this.ctx.bodies.length+660+1800+450+zi),this.tween={active:!1,t0:0,dur:1.6,fromPos:new L,toPos:new L,fromTg:new L,toTg:new L,onDone:null},this.selected=null,this.focused=null,this.followPrev=new L,this.followPrevValid=!1,this._onControlStart=()=>{this.tween.active=!1,this.focused=null,this.stopTour()},o.addEventListener("start",this._onControlStart),this.paused=!1,this.dirSign=1,this.timeSlider=67,this.labelsOn=!0,this.realScale=!1,this.measureMode=!1,this.measurePair=[],this.tourIdx=-1,this.tourTimer=null,this.raycaster=new ty,this.ndc=new Ee,this.downX=0,this.downY=0,this._bindPointer(),this._createMeasureLine(),this._onKeyDown=this._handleKeyDown.bind(this),window.addEventListener("keydown",this._onKeyDown),this._onResize=this._handleResize.bind(this),window.addEventListener("resize",this._onResize),this._lw=new L,this._sd=new L,this._sm=new it,this._au1=new L,this._au2=new L,this._wp1=new L,this._wp2=new L,this.lastT=performance.now(),this.fpsAcc=0,this.fpsN=0,this.dtTick=0,this._raf=0,this.select(null)}_createMarker(){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d");t.strokeStyle="rgba(160,200,255,1)",t.lineWidth=5,t.shadowColor="rgba(120,170,255,0.9)",t.shadowBlur=10,t.beginPath(),t.arc(64,64,50,0,Ot),t.stroke();const i=new ic(e);i.colorSpace=bt,this.marker=new wr(new ks({map:i,transparent:!0,opacity:0,depthWrite:!1,depthTest:!0})),this.marker.visible=!1,this.scene.add(this.marker)}_createMeasureLine(){this.measureLine=new nc(new vt().setAttribute("position",new rt(new Float32Array(6),3)),new Yd({color:16769162,dashSize:2.2,gapSize:1.6,transparent:!0,opacity:.9})),this.measureLine.frustumCulled=!1,this.measureLine.visible=!1,this.scene.add(this.measureLine)}startTween(e,t,i,s){this.tween.active=!0,this.tween.t0=performance.now(),this.tween.dur=i||1.6,this.tween.fromPos.copy(this.camera.position),this.tween.toPos.copy(e),this.tween.fromTg.copy(this.controls.target),this.tween.toTg.copy(t),this.tween.onDone=s||null,this.followPrevValid=!1}_updateTween(e){if(!this.tween.active)return;const t=Math.min(1,(e-this.tween.t0)/(this.tween.dur*1e3)),i=Qd(t);if(this.camera.position.lerpVectors(this.tween.fromPos,this.tween.toPos,i),this.controls.target.lerpVectors(this.tween.fromTg,this.tween.toTg,i),t>=1&&(this.tween.active=!1,this.tween.onDone)){const s=this.tween.onDone;this.tween.onDone=null,s()}}focusBody(e){const t=e.holder.getWorldPosition(new L),i=this.camera.position.clone().sub(t);i.lengthSq()<1e-6&&i.set(1,.6,1),i.normalize();const s=Math.max(e.r*6,e.r+2),r=t.clone().addScaledVector(i,s);this.focused=null,this.startTween(r,t,1.8,()=>{this.focused=e,this.followPrevValid=!1})}focusById(e){const t=this.ctx.bodyById[e];t&&this.focusBody(t)}select(e){var t,i;this.selected=e,(i=(t=this.hooks).onSelect)==null||i.call(t,e?e.def:null),this.marker.visible=!!e;for(const s of this.ctx.orbitLines){const r=s.body.def.parent?.1:s.body.def.cat==="矮行星"||s.body.def.cat==="彗星"?.22:.32;s.line.material.opacity=e&&s.body===e?.85:r}}selectById(e){this.select(this.ctx.bodyById[e]||null)}searchBodies(e){return e=e.trim().toLowerCase(),e?this.ctx.bodies.filter(t=>t.def.name.toLowerCase().includes(e)||t.def.en.toLowerCase().includes(e)).slice(0,8).map(t=>({id:t.def.id,name:t.def.name,en:t.def.en,cat:t.def.cat})):[]}preset(e){var i;const t={overview:()=>{this.focused=null,this.startTween(hi(0,165,420),hi(0,0,0),2)},inner:()=>{this.focused=null,this.startTween(hi(0,62,140),hi(0,0,0),2)},jupiter:()=>this._presetBody("jupiter",hi(18,10,34)),saturn:()=>this._presetBody("saturn",hi(26,14,48)),pluto:()=>this._presetBody("pluto",hi(6,4,11))};(i=t[e])==null||i.call(t)}_presetBody(e,t){const i=this.ctx.bodyById[e];this.select(i);const s=i.holder.getWorldPosition(new L);this.startTween(s.clone().add(t),s,2,()=>{this.focused=i,this.followPrevValid=!1})}setBeltVisible(e){this.ctx.beltGroup.visible=e}setKuiperVisible(e){this.ctx.kuiperGroup.visible=this.ctx.oortGroup.visible=e}setOrbitsVisible(e){for(const t of this.ctx.orbitLines)t.line.visible=e}setTrailsVisible(e){this.ctx.trailGroup.visible=e}setLabelsVisible(e){this.labelsOn=e}setAtmosVisible(e){for(const t of this.ctx.bodies)t.atmoMesh&&(t.atmoMesh.visible=e)}setTimeSlider(e){var t,i;this.timeSlider=e,this.paused&&(this.paused=!1,(i=(t=this.hooks).onPaused)==null||i.call(t,!1))}togglePause(){var e,t;this.paused=!this.paused,(t=(e=this.hooks).onPaused)==null||t.call(e,this.paused)}toggleDirection(){var e,t;this.dirSign*=-1,(t=(e=this.hooks).onDir)==null||t.call(e,this.dirSign)}jumpToDate(e){if(!e)return;const t=Date.parse(e+"T00:00:00Z");isNaN(t)||(this.sim.motionDays=this.sim.clockDays=(t-Yf)/864e5,this.followPrevValid=!1)}setBrightness(e){const t=e/100;this.ambient.intensity=.14*t,this.bloomPass.strength=.95*t,this.renderer.toneMappingExposure=1.12*(.7+.3*t)}setStarDensity(e){this.ctx.starGeo.setDrawRange(0,Math.floor(zi*e/100))}resetView(){this.focused=null,this.select(null),this.preset("overview")}_applyScaleMode(){for(const e of this.ctx.bodies){if(!e.sizeG||e.def.id==="sun"||typeof e.def.km!="number")continue;const t=this.realScale?Math.max(.05,12*e.def.km/695700):e.baseR;e.sizeG.scale.setScalar(t/e.baseR)}}toggleRealScale(){var e,t;this.realScale=!this.realScale,this._applyScaleMode(),(t=(e=this.hooks).onRealScale)==null||t.call(e,this.realScale)}screenshot(){this.composer.render(),this.renderer.domElement.toBlob(e=>{if(!e)return;const t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="solar-system-"+Date.now()+".png",t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),5e3)})}stopTour(){var e,t,i,s;this.tourTimer&&(clearTimeout(this.tourTimer),this.tourTimer=null),this.tourIdx=-1,(t=(e=this.hooks).onTourBar)==null||t.call(e,null),(s=(i=this.hooks).onTourActive)==null||s.call(i,!1)}tourGo(e){var o,l;if(e>=al.length){this.stopTour();return}this.tourIdx=e;const t=al[e],i=this.ctx.bodyById[t.id];this.select(i);const s=i.holder.getWorldPosition(new L),r=Math.max(i.r*t.m,i.r+2,t.min||0),a=hi(.8,.45,1).normalize();this.focused=null,this.startTween(s.clone().addScaledVector(a,r),s,2,()=>{this.focused=i,this.followPrevValid=!1}),(l=(o=this.hooks).onTourBar)==null||l.call(o,"星际导览 · "+(e+1)+"/"+al.length+"　"+i.def.name+"（"+i.def.en+"）　—　点击画面或 Esc 停止"),this.tourTimer=setTimeout(()=>this.tourGo(e+1),7e3)}toggleTour(){var e,t;this.tourIdx>=0?this.stopTour():((t=(e=this.hooks).onTourActive)==null||t.call(e,!0),this.tourGo(0))}_truePosAU(e,t){t.set(0,0,0);let i=e;for(;i;){const s=i.def;if(s.au!==void 0){const r=i.holder.position,a=r.length();a>1e-6&&t.addScaledVector(r,Math.pow(a/30,1.25)/a)}else s.auDist!==void 0?t.set(s.dir[0],s.dir[1],s.dir[2]).normalize().multiplyScalar(s.auDist):s.orbitR&&s.smaKm&&t.addScaledVector(i.holder.position,s.smaKm/1495978707e-1/s.orbitR);i=s.parent?this.ctx.bodyById[s.parent]:null}return t}updateMeasure(){var a,o;if(this.measurePair.length!==2){this.measureLine.visible=!1;return}const[e,t]=this.measurePair;e.holder.getWorldPosition(this._wp1),t.holder.getWorldPosition(this._wp2);const i=this.measureLine.geometry.attributes.position;i.setXYZ(0,this._wp1.x,this._wp1.y,this._wp1.z),i.setXYZ(1,this._wp2.x,this._wp2.y,this._wp2.z),i.needsUpdate=!0,this.measureLine.computeLineDistances(),this.measureLine.visible=!0;const s=this._truePosAU(e,this._au1).distanceTo(this._truePosAU(t,this._au2)),r=s*1495978707e-1;(o=(a=this.hooks).onMeasureBox)==null||o.call(a,"测距 · "+e.def.name+" ↔ "+t.def.name+"："+s.toFixed(4)+" AU ≈ "+lc(r)+" km（近似）· 点击第 3 个天体重选")}setMeasure(e){var t,i,s,r,a,o;this.measureMode=e,(i=(t=this.hooks).onMeasureMode)==null||i.call(t,e),e?(this.stopTour(),(o=(a=this.hooks).onMeasureBox)==null||o.call(a,"测距：点击第一个天体")):(this.measurePair.length=0,this.measureLine.visible=!1,(r=(s=this.hooks).onMeasureBox)==null||r.call(s,null))}toggleMeasure(){this.setMeasure(!this.measureMode)}castBodies(e){this.ndc.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera);const t=this.raycaster.intersectObjects(this.ctx.pickables,!1);return t.length?t[0].object.userData.body:null}_bindPointer(){const e=this.renderer.domElement;this._onPointerDown=t=>{this.downX=t.clientX,this.downY=t.clientY},this._onPointerUp=t=>{var s,r;if(Math.hypot(t.clientX-this.downX,t.clientY-this.downY)>5)return;const i=this.castBodies(t);if(this.measureMode){i&&(this.measurePair.length>=2&&(this.measurePair.length=0),this.measurePair.push(i),this.measurePair.length===1&&((r=(s=this.hooks).onMeasureBox)==null||r.call(s,"测距：已选「"+i.def.name+"」，再点击第二个天体")),this.updateMeasure());return}this.select(i)},this._onDblClick=t=>{const i=this.castBodies(t);i&&(this.select(i),this.focusBody(i))},e.addEventListener("pointerdown",this._onPointerDown),e.addEventListener("pointerup",this._onPointerUp),e.addEventListener("dblclick",this._onDblClick)}_handleKeyDown(e){var t,i,s,r,a,o;e.target&&e.target.id==="searchInput"||(e.code==="Space"?(e.preventDefault(),this.togglePause()):e.key==="Escape"?(this.focused=null,this.stopTour(),this.measureMode&&this.setMeasure(!1)):e.key==="r"||e.key==="R"?this.resetView():e.key==="+"||e.key==="="?(this.timeSlider=Math.min(100,this.timeSlider+8),this.paused=!1,(i=(t=this.hooks).onTimeSlider)==null||i.call(t,this.timeSlider),(r=(s=this.hooks).onPaused)==null||r.call(s,!1)):e.key==="-"&&(this.timeSlider=Math.max(0,this.timeSlider-8),(o=(a=this.hooks).onTimeSlider)==null||o.call(a,this.timeSlider)))}_handleResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.composer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.setSize(window.innerWidth,window.innerHeight)}start(){const e=t=>{this._raf=requestAnimationFrame(e),this._animate(t)};this._raf=requestAnimationFrame(e)}_animate(e){var o,l,c,u;const t=Math.min(.1,(e-this.lastT)/1e3);this.lastT=e;const i=this.paused?0:ep(this.timeSlider);this.sim.motionDays+=t*i*this.dirSign,this.sim.clockDays+=t*i;const{bodies:s}=this.ctx;for(const f of s)f.orbit&&cc(f.orbit,this.sim.motionDays,f.holder.position),f.spin&&f.mesh&&(f.mesh.rotation.y=this.sim.motionDays*f.spin),f.mat&&(f.mat.uniforms.uTime.value=this.sim.motionDays);const r=this.ctx.sunBody;if(r.windMat&&(r.windMat.uniforms.uTime.value=this.sim.motionDays),r.flare&&(r.flare.material.rotation+=t*.02,r.flare.material.opacity=.5+.18*Math.sin(e*7e-4)+.08*Math.sin(e*.0031)),this._updateTween(e),this.focused&&(this.focused.holder.getWorldPosition(this._lw),this.followPrevValid||(this.followPrev.copy(this._lw),this.followPrevValid=!0),this.camera.position.add(this._lw.clone().sub(this.followPrev)),this.controls.target.copy(this._lw),this.followPrev.copy(this._lw)),this.controls.update(),this.selected){this.selected.holder.getWorldPosition(this._lw),this.marker.position.copy(this._lw);const h=this.selected.baseR*(this.selected.sizeG?this.selected.sizeG.scale.x:1)*2.6*(1+.06*Math.sin(e*.005));this.marker.scale.set(h,h,1),this.marker.material.opacity=.55+.2*Math.sin(e*.005)}for(const f of s)f.label&&(f.label.visible=this.labelsOn&&this.camera.position.distanceTo(f.holder.getWorldPosition(this._lw))<(f.def.labelMax||300));const a=this.ctx.bodyById.saturn;if(a.ringMesh&&(a.ringMesh.getWorldPosition(this._sd).negate().normalize(),this._sm.copy(a.ringMesh.matrixWorld).invert(),this._sd.transformDirection(this._sm),a.ringMesh.material.uniforms.uSunLocal.value.copy(this._sd)),this.ctx.beltGroup.visible&&Ky(this.ctx),this.ctx.trailGroup.visible&&qy(this.ctx),this.ctx.kuiperGroup.rotation.y=this.sim.motionDays*Ot/2e5,Wy(this.ctx),eb(this.ctx,t),this.updateMeasure(),this.ctx.starMat.uniforms.uTime.value=e*.001,++this.dtTick%6===0){const f=new Date(Yf+this.sim.clockDays*864e5),h=p=>String(p).padStart(2,"0");(l=(o=this.hooks).onDatetime)==null||l.call(o,f.getUTCFullYear()+"-"+h(f.getUTCMonth()+1)+"-"+h(f.getUTCDate())+" "+h(f.getUTCHours())+":"+h(f.getUTCMinutes())+" UTC")}this.fpsAcc+=t,this.fpsN++,this.fpsAcc>=.5&&((u=(c=this.hooks).onFps)==null||u.call(c,Math.round(this.fpsN/this.fpsAcc)),this.fpsAcc=0,this.fpsN=0),this.composer.render(),this.labelRenderer.render(this.scene,this.camera)}dispose(){cancelAnimationFrame(this._raf),this.tourTimer&&(clearTimeout(this.tourTimer),this.tourTimer=null),window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("resize",this._onResize);const e=this.renderer.domElement;e.removeEventListener("contextmenu",this._onContextMenu),e.removeEventListener("pointerdown",this._onPointerDown),e.removeEventListener("pointerup",this._onPointerUp),e.removeEventListener("dblclick",this._onDblClick),this.controls.removeEventListener("start",this._onControlStart),this.controls.dispose(),this.scene.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material)for(const i of Array.isArray(t.material)?t.material:[t.material])i.map&&i.map.dispose(),i.dispose()}),this.composer.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),e.remove(),this.labelRenderer.domElement.remove()}}const On=G0("solar",()=>{let n=null;function e(g){n=g?Yo(g):null}const t=tt("FPS --"),i=tt("#9fe8b0"),s=tt("2024-01-01 00:00 UTC"),r=tt("天体总数 --"),a=tt(null),o=tt(null),l=tt(null),c=tt(!1),u=tt(67),f=tt(1),h=tt(!1),p=tt(!1),v=tt(!1),x=tt(!0),m=tt(!0),d=tt(!0),y=tt(!0),S=tt(!0),E=tt(!0),D=tt(100),C=tt(100);function A(g){t.value="FPS "+g,i.value=g>=30?"#9fe8b0":"#ffb38a"}function H(g){s.value=g}function b(g){a.value=g}function w(g){o.value=g}function W(g){l.value=g}function ee(g){r.value="天体总数 "+lc(g)}const de=nn(()=>{if(c.value)return"0x（暂停）";const g=ep(u.value);return g>=10?Math.round(g)+"x":g.toFixed(1)+"x"}),N=nn(()=>f.value>0?"公转方向：顺行":"公转方向：逆行"),k=nn(()=>(D.value/100).toFixed(1)),V=nn(()=>C.value+"%"),q=nn(()=>h.value?"真实比例：开":"真实比例：关"),$=nn(()=>v.value?"■ 停止导览":"▶ 星际导览"),ie=nn(()=>p.value?"⇔ 测距中…（点击天体）":"⇔ 测距工具");function se(g){x.value=g,n==null||n.setBeltVisible(g)}function fe(g){m.value=g,n==null||n.setKuiperVisible(g)}function ue(g){d.value=g,n==null||n.setOrbitsVisible(g)}function J(g){y.value=g,n==null||n.setTrailsVisible(g)}function ce(g){S.value=g,n==null||n.setLabelsVisible(g)}function Se(g){E.value=g,n==null||n.setAtmosVisible(g)}function Te(g){u.value=g,n==null||n.setTimeSlider(g)}function we(){n==null||n.toggleDirection()}function De(g){n==null||n.jumpToDate(g)}function Ie(g){D.value=g,n==null||n.setBrightness(g)}function Re(g){C.value=g,n==null||n.setStarDensity(g)}function Ye(){n==null||n.toggleTour()}function M(){n==null||n.toggleMeasure()}function U(){n==null||n.toggleRealScale()}function F(){n==null||n.screenshot()}function X(){n==null||n.resetView()}function B(g){n==null||n.preset(g)}function Q(g){return n?n.searchBodies(g):[]}function te(g){n&&(n.selectById(g),n.focusById(g))}return{bindEngine:e,fpsText:t,fpsColor:i,datetime:s,bodyCountText:r,selectedDef:a,tourText:o,measureText:l,paused:c,timeSlider:u,dirSign:f,realScale:h,measureActive:p,tourActive:v,showBelt:x,showKuiper:m,showOrbits:d,showTrails:y,showLabels:S,showAtmos:E,brightness:D,starDensity:C,setFps:A,setDatetime:H,setSelected:b,setTourText:w,setMeasureText:W,setBodyCount:ee,timeLabel:de,dirText:N,brightText:k,starsText:V,scaleText:q,tourBtnText:$,measureBtnText:ie,setBelt:se,setKuiper:fe,setOrbits:ue,setTrails:J,setLabels:ce,setAtmos:Se,setTimeSlider:Te,toggleDirection:we,jumpToDate:De,setBrightness:Ie,setStarDensity:Re,toggleTour:Ye,toggleMeasure:M,toggleRealScale:U,screenshot:F,resetView:X,preset:B,search:Q,selectAndFocus:te}}),nb={__name:"SceneView",setup(n){const e=tt(null),t=tt(null),i=On();let s=null;return Xl(()=>{s=new tb({container:e.value,labelLayer:t.value,hooks:{onFps:r=>i.setFps(r),onDatetime:r=>i.setDatetime(r),onSelect:r=>i.setSelected(r),onTourBar:r=>i.setTourText(r),onMeasureBox:r=>i.setMeasureText(r),onCount:r=>i.setBodyCount(r),onPaused:r=>{i.paused=r},onTimeSlider:r=>{i.timeSlider=r},onDir:r=>{i.dirSign=r},onRealScale:r=>{i.realScale=r},onMeasureMode:r=>{i.measureActive=r},onTourActive:r=>{i.tourActive=r}}}),i.bindEngine(s),s.start()}),Zo(()=>{i.bindEngine(null),s==null||s.dispose(),s=null}),(r,a)=>(Bt(),zt(fn,null,[pe("div",{id:"scene",ref_key:"sceneEl",ref:e},null,512),pe("div",{id:"labelLayer",ref_key:"labelEl",ref:t},null,512)],64))}},ip=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},ib={},sb={id:"title",class:"glass"};function rb(n,e){return Bt(),zt("div",sb,[...e[0]||(e[0]=[pe("b",null,"太阳系模拟器",-1),gi(" · SOLAR SYSTEM",-1)])])}const ob=ip(ib,[["render",rb]]),ab={__name:"FpsCounter",setup(n){const e=On();return(t,i)=>(Bt(),zt("div",{id:"fps",class:"glass",style:qi({color:Le(e).fpsColor})},ht(Le(e).fpsText),5))}},lb={id:"count",class:"glass"},cb={__name:"BodyCounter",setup(n){const e=On();return(t,i)=>(Bt(),zt("div",lb,ht(Le(e).bodyCountText),1))}},ub=["onPointerdown"],fb={class:"en"},hb={__name:"SearchBox",setup(n){const e=On(),t=tt(null),i=tt(""),s=tt([]),r=tt(!1);function a(){if(!i.value.trim()){r.value=!1;return}s.value=e.search(i.value),r.value=s.value.length>0}function o(f){r.value=!1,i.value=f.name,e.selectAndFocus(f.id)}function l(f){f.key==="Enter"&&s.value.length&&o(s.value[0])}function c(f){t.value&&!t.value.contains(f.target)&&(r.value=!1)}function u(f){f.key==="Escape"&&(r.value=!1)}return Xl(()=>{window.addEventListener("pointerdown",c),window.addEventListener("keydown",u)}),Zo(()=>{window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",u)}),(f,h)=>(Bt(),zt("div",{id:"searchWrap",class:"glass",ref_key:"rootEl",ref:t},[Ph(pe("input",{id:"searchInput",type:"text",placeholder:"搜索天体（中文 / English）…",autocomplete:"off","onUpdate:modelValue":h[0]||(h[0]=p=>i.value=p),onInput:a,onKeydown:l},null,544),[[ad,i.value]]),pe("div",{id:"searchResults",style:qi({display:r.value?"block":"none"})},[(Bt(!0),zt(fn,null,vm(s.value,p=>(Bt(),zt("div",{key:p.id,class:"sr",onPointerdown:C0(v=>o(p),["prevent"])},[pe("span",null,ht(p.name),1),pe("span",fb,ht(p.en)+" · "+ht(p.cat),1)],40,ub))),128))],4)],512))}},db={id:"topbar"},pb={id:"datetime",class:"glass"},mb={__name:"TopBar",setup(n){const e=On();return(t,i)=>(Bt(),zt("div",db,[pe("div",pb,ht(Le(e).datetime),1),Mt(hb)]))}},gb={__name:"TourBar",setup(n){const e=On();return(t,i)=>(Bt(),zt("div",{id:"tourBar",class:"glass",style:qi({display:Le(e).tourText?"block":"none"})},ht(Le(e).tourText),5))}},_b={__name:"MeasureBox",setup(n){const e=On();return(t,i)=>(Bt(),zt("div",{id:"measureBox",class:"glass",style:qi({display:Le(e).measureText?"block":"none"})},ht(Le(e).measureText),5))}};function vb(n){if(n===void 0)return"—";const e=n<0?"（逆行）":"",t=Math.abs(n);return t>=730?(t/365.25).toFixed(1)+" 地球年"+e:t.toFixed(1)+" 天"+e}function xb(n){const e=n.rotH;if(e==null)return n.parent&&n.per?Math.abs(n.per).toFixed(1)+" 天（潮汐锁定）":"—";const t=e<0?"（逆行）":"",i=Math.abs(e);return i>=48?(i/24).toFixed(1)+" 地球日"+t:i.toFixed(1)+" 小时"+t}const Kf={__name:"RollingNumber",props:{value:{type:[Number,String],default:null},suffix:{type:String,default:""}},setup(n){const e=n,t=tt("—");let i=0,s=0;return hr(()=>[e.value,e.suffix],()=>{cancelAnimationFrame(s);const r=e.value;if(typeof r!="number"){t.value=r??"—";return}const a=i;i=r;const o=performance.now(),l=c=>{const u=Math.min(1,(c-o)/450);t.value=lc(a+(r-a)*Qd(u))+e.suffix,u<1&&(s=requestAnimationFrame(l))};s=requestAnimationFrame(l)},{immediate:!0}),Zo(()=>cancelAnimationFrame(s)),(r,a)=>(Bt(),zt("span",null,ht(t.value),1))}},Mb={id:"infoPanel",class:"glass"},Sb={id:"infoName"},yb={id:"infoSub"},bb={id:"infoRows"},Eb={class:"irow"},Tb={id:"iv_type"},wb={class:"irow"},Ab={id:"iv_dia"},Rb={class:"irow"},Cb={id:"iv_sma"},Pb={class:"irow"},Lb={id:"iv_rot"},Db={class:"irow"},Ub={id:"iv_per"},Ib={class:"irow"},Nb={id:"iv_tmp"},Fb={class:"irow"},Ob={id:"iv_moon"},Bb={__name:"InfoPanel",setup(n){const e=On(),t=nn(()=>e.selectedDef),i=nn(()=>t.value?typeof t.value.km=="number"?t.value.km:t.value.km??"—":null),s=nn(()=>t.value?t.value.au!==void 0?t.value.au:t.value.smaKm!==void 0?t.value.smaKm:t.value.smaText??"—":null),r=nn(()=>t.value?t.value.au!==void 0?" AU":t.value.smaKm!==void 0?" km":"":"");return(a,o)=>(Bt(),zt("div",Mb,[pe("h3",Sb,ht(t.value?t.value.name:"太阳系"),1),pe("div",yb,ht(t.value?t.value.en+" · "+t.value.cat:"单击任意天体查看详情 · 双击聚焦"),1),pe("div",bb,[pe("div",Eb,[o[0]||(o[0]=pe("span",null,"类型",-1)),pe("b",Tb,ht(t.value?t.value.cat:"—"),1)]),pe("div",wb,[o[1]||(o[1]=pe("span",null,"直径",-1)),pe("b",Ab,[Mt(Kf,{value:i.value,suffix:" km"},null,8,["value"])])]),pe("div",Rb,[o[2]||(o[2]=pe("span",null,"轨道半长轴",-1)),pe("b",Cb,[Mt(Kf,{value:s.value,suffix:r.value},null,8,["value","suffix"])])]),pe("div",Pb,[o[3]||(o[3]=pe("span",null,"自转周期",-1)),pe("b",Lb,ht(t.value?Le(xb)(t.value):"—"),1)]),pe("div",Db,[o[4]||(o[4]=pe("span",null,"公转周期",-1)),pe("b",Ub,ht(t.value?Le(vb)(t.value.per):"—"),1)]),pe("div",Ib,[o[5]||(o[5]=pe("span",null,"表面温度",-1)),pe("b",Nb,ht(t.value&&t.value.temp?t.value.temp:"—"),1)]),pe("div",Fb,[o[6]||(o[6]=pe("span",null,"已知卫星",-1)),pe("b",Ob,ht(t.value&&t.value.moons!==void 0?String(t.value.moons):"—"),1)])])]))}},zb={id:"ctrlPanel",class:"glass"},Hb={class:"row"},Gb=["checked"],kb={class:"row"},Vb=["checked"],Wb={class:"row"},Xb=["checked"],jb={class:"row"},qb=["checked"],Yb={class:"row"},Kb=["checked"],$b={class:"row"},Zb=["checked"],Jb={class:"row sliderRow"},Qb=["value"],eE={id:"timeVal"},tE={class:"row"},nE={class:"row rowFlex"},iE={class:"row sliderRow"},sE=["value"],rE={id:"brightVal"},oE={class:"row sliderRow"},aE=["value"],lE={id:"starsVal"},cE={class:"row"},uE={class:"row"},fE={class:"row"},hE={class:"row"},dE={class:"row"},pE={__name:"ControlPanel",setup(n){const e=On(),t=tt("2024-01-01");return(i,s)=>(Bt(),zt("div",zb,[s[26]||(s[26]=pe("h3",null,"控制面板",-1)),s[27]||(s[27]=pe("h4",null,"显示",-1)),pe("div",Hb,[pe("label",null,[pe("input",{type:"checkbox",id:"ckBelt",checked:Le(e).showBelt,onChange:s[0]||(s[0]=r=>Le(e).setBelt(r.target.checked))},null,40,Gb),s[17]||(s[17]=gi(" 小行星带",-1))])]),pe("div",kb,[pe("label",null,[pe("input",{type:"checkbox",id:"ckKuiper",checked:Le(e).showKuiper,onChange:s[1]||(s[1]=r=>Le(e).setKuiper(r.target.checked))},null,40,Vb),s[18]||(s[18]=gi(" 柯伊伯带 + 奥尔特云",-1))])]),pe("div",Wb,[pe("label",null,[pe("input",{type:"checkbox",id:"ckOrbits",checked:Le(e).showOrbits,onChange:s[2]||(s[2]=r=>Le(e).setOrbits(r.target.checked))},null,40,Xb),s[19]||(s[19]=gi(" 轨道线",-1))])]),pe("div",jb,[pe("label",null,[pe("input",{type:"checkbox",id:"ckTrails",checked:Le(e).showTrails,onChange:s[3]||(s[3]=r=>Le(e).setTrails(r.target.checked))},null,40,qb),s[20]||(s[20]=gi(" 行星轨迹拖尾",-1))])]),pe("div",Yb,[pe("label",null,[pe("input",{type:"checkbox",id:"ckLabels",checked:Le(e).showLabels,onChange:s[4]||(s[4]=r=>Le(e).setLabels(r.target.checked))},null,40,Kb),s[21]||(s[21]=gi(" 天体标签",-1))])]),pe("div",$b,[pe("label",null,[pe("input",{type:"checkbox",id:"ckAtmos",checked:Le(e).showAtmos,onChange:s[5]||(s[5]=r=>Le(e).setAtmos(r.target.checked))},null,40,Zb),s[22]||(s[22]=gi(" 大气外壳",-1))])]),s[28]||(s[28]=pe("h4",null,"时间与运动",-1)),pe("div",Jb,[s[23]||(s[23]=pe("span",null,"时间倍率",-1)),pe("input",{type:"range",id:"slTime",min:"0",max:"100",value:Le(e).timeSlider,onInput:s[6]||(s[6]=r=>Le(e).setTimeSlider(+r.target.value))},null,40,Qb),pe("b",eE,ht(Le(e).timeLabel),1)]),pe("div",tE,[pe("button",{id:"btnDir",onClick:s[7]||(s[7]=r=>Le(e).toggleDirection())},ht(Le(e).dirText),1)]),pe("div",nE,[Ph(pe("input",{type:"date",id:"dateInput","onUpdate:modelValue":s[8]||(s[8]=r=>t.value=r)},null,512),[[ad,t.value]]),pe("button",{id:"btnDate",onClick:s[9]||(s[9]=r=>Le(e).jumpToDate(t.value))},"跳转")]),s[29]||(s[29]=pe("h4",null,"画面",-1)),pe("div",iE,[s[24]||(s[24]=pe("span",null,"亮度",-1)),pe("input",{type:"range",id:"slBright",min:"20",max:"200",value:Le(e).brightness,onInput:s[10]||(s[10]=r=>Le(e).setBrightness(+r.target.value))},null,40,sE),pe("b",rE,ht(Le(e).brightText),1)]),pe("div",oE,[s[25]||(s[25]=pe("span",null,"星空密度",-1)),pe("input",{type:"range",id:"slStars",min:"5",max:"100",value:Le(e).starDensity,onInput:s[11]||(s[11]=r=>Le(e).setStarDensity(+r.target.value))},null,40,aE),pe("b",lE,ht(Le(e).starsText),1)]),s[30]||(s[30]=pe("h4",null,"工具",-1)),pe("div",cE,[pe("button",{id:"btnTour",class:Ps({on:Le(e).tourActive}),onClick:s[12]||(s[12]=r=>Le(e).toggleTour())},ht(Le(e).tourBtnText),3)]),pe("div",uE,[pe("button",{id:"btnMeasure",class:Ps({on:Le(e).measureActive}),onClick:s[13]||(s[13]=r=>Le(e).toggleMeasure())},ht(Le(e).measureBtnText),3)]),pe("div",fE,[pe("button",{id:"btnScale",class:Ps({on:Le(e).realScale}),onClick:s[14]||(s[14]=r=>Le(e).toggleRealScale())},ht(Le(e).scaleText),3)]),pe("div",hE,[pe("button",{id:"btnShot",onClick:s[15]||(s[15]=r=>Le(e).screenshot())},"📷 截图保存")]),pe("div",dE,[pe("button",{id:"btnReset",onClick:s[16]||(s[16]=r=>Le(e).resetView())},"重置视角")])]))}},mE={id:"presets"},gE={__name:"PresetBar",setup(n){const e=On();return(t,i)=>(Bt(),zt("div",mE,[pe("button",{onClick:i[0]||(i[0]=s=>Le(e).preset("overview"))},"太阳系全景"),pe("button",{onClick:i[1]||(i[1]=s=>Le(e).preset("inner"))},"内太阳系"),pe("button",{onClick:i[2]||(i[2]=s=>Le(e).preset("jupiter"))},"木星系统"),pe("button",{onClick:i[3]||(i[3]=s=>Le(e).preset("saturn"))},"土星系统"),pe("button",{onClick:i[4]||(i[4]=s=>Le(e).preset("pluto"))},"冥王星特写")]))}},_E={},vE={id:"hint",class:"glass"};function xE(n,e){return Bt(),zt("div",vE,"左键旋转 · 右键平移 · 滚轮缩放 · 单击选中 · 双击聚焦 · 空格暂停 · R 重置")}const ME=ip(_E,[["render",xE]]),SE={__name:"App",setup(n){return(e,t)=>(Bt(),zt(fn,null,[Mt(nb),t[0]||(t[0]=pe("div",{id:"vignette"},null,-1)),Mt(ob),Mt(ab),Mt(cb),Mt(mb),Mt(gb),Mt(_b),Mt(Bb),Mt(pE),Mt(gE),Mt(ME)],64))}};D0(SE).use(N0()).mount("#app");
