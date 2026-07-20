(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function dl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const xt={},Lr=[],zn=()=>{},id=()=>!1,Fo=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),pl=n=>n.startsWith("onUpdate:"),tn=Object.assign,ml=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},rd=Object.prototype.hasOwnProperty,ut=(n,e)=>rd.call(n,e),Ke=Array.isArray,Dr=n=>Oo(n)==="[object Map]",df=n=>Oo(n)==="[object Set]",tt=n=>typeof n=="function",Ut=n=>typeof n=="string",wi=n=>typeof n=="symbol",At=n=>n!==null&&typeof n=="object",pf=n=>(At(n)||tt(n))&&tt(n.then)&&tt(n.catch),mf=Object.prototype.toString,Oo=n=>mf.call(n),sd=n=>Oo(n).slice(8,-1),gf=n=>Oo(n)==="[object Object]",gl=n=>Ut(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,ls=dl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Bo=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},od=/-(\w)/g,Ei=Bo(n=>n.replace(od,(e,t)=>t?t.toUpperCase():"")),ad=/\B([A-Z])/g,qi=Bo(n=>n.replace(ad,"-$1").toLowerCase()),_f=Bo(n=>n.charAt(0).toUpperCase()+n.slice(1)),Jo=Bo(n=>n?`on${_f(n)}`:""),Mi=(n,e)=>!Object.is(n,e),Qo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},ka=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},ld=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Wl;const zo=()=>Wl||(Wl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function _l(n){if(Ke(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=Ut(i)?hd(i):_l(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Ut(n)||At(n))return n}const cd=/;(?![^(]*\))/g,ud=/:([^]+)/,fd=/\/\*[^]*?\*\//g;function hd(n){const e={};return n.replace(fd,"").split(cd).forEach(t=>{if(t){const i=t.split(ud);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function vl(n){let e="";if(Ut(n))e=n;else if(Ke(n))for(let t=0;t<n.length;t++){const i=vl(n[t]);i&&(e+=i+" ")}else if(At(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const dd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",pd=dl(dd);function vf(n){return!!n||n===""}const xf=n=>!!(n&&n.__v_isRef===!0),xn=n=>Ut(n)?n:n==null?"":Ke(n)||At(n)&&(n.toString===mf||!tt(n.toString))?xf(n)?xn(n.value):JSON.stringify(n,Mf,2):String(n),Mf=(n,e)=>xf(e)?Mf(n,e.value):Dr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[ea(i,s)+" =>"]=r,t),{})}:df(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ea(t))}:wi(e)?ea(e):At(e)&&!Ke(e)&&!gf(e)?String(e):e,ea=(n,e="")=>{var t;return wi(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let sn;class md{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=sn,!e&&sn&&(this.index=(sn.scopes||(sn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=sn;try{return sn=this,e()}finally{sn=t}}}on(){++this._on===1&&(this.prevScope=sn,sn=this)}off(){this._on>0&&--this._on===0&&(sn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function gd(){return sn}let vt;const ta=new WeakSet;class yf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,sn&&sn.active&&sn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ta.has(this)&&(ta.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ef(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Xl(this),bf(this);const e=vt,t=Rn;vt=this,Rn=!0;try{return this.fn()}finally{Tf(this),vt=e,Rn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)yl(e);this.deps=this.depsTail=void 0,Xl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ta.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Wa(this)&&this.run()}get dirty(){return Wa(this)}}let Sf=0,cs,us;function Ef(n,e=!1){if(n.flags|=8,e){n.next=us,us=n;return}n.next=cs,cs=n}function xl(){Sf++}function Ml(){if(--Sf>0)return;if(us){let e=us;for(us=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;cs;){let e=cs;for(cs=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function bf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Tf(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),yl(i),_d(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function Wa(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Af(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Af(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===xs)||(n.globalVersion=xs,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Wa(n))))return;n.flags|=2;const e=n.dep,t=vt,i=Rn;vt=n,Rn=!0;try{bf(n);const r=n.fn(n._value);(e.version===0||Mi(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{vt=t,Rn=i,Tf(n),n.flags&=-3}}function yl(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)yl(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function _d(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Rn=!0;const wf=[];function ti(){wf.push(Rn),Rn=!1}function ni(){const n=wf.pop();Rn=n===void 0?!0:n}function Xl(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=vt;vt=void 0;try{e()}finally{vt=t}}}let xs=0;class vd{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Sl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!vt||!Rn||vt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==vt)t=this.activeLink=new vd(vt,this),vt.deps?(t.prevDep=vt.depsTail,vt.depsTail.nextDep=t,vt.depsTail=t):vt.deps=vt.depsTail=t,Cf(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=vt.depsTail,t.nextDep=void 0,vt.depsTail.nextDep=t,vt.depsTail=t,vt.deps===t&&(vt.deps=i)}return t}trigger(e){this.version++,xs++,this.notify(e)}notify(e){xl();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Ml()}}}function Cf(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Cf(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Xa=new WeakMap,Gi=Symbol(""),qa=Symbol(""),Ms=Symbol("");function Wt(n,e,t){if(Rn&&vt){let i=Xa.get(n);i||Xa.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new Sl),r.map=i,r.key=t),r.track()}}function $n(n,e,t,i,r,s){const a=Xa.get(n);if(!a){xs++;return}const o=l=>{l&&l.trigger()};if(xl(),e==="clear")a.forEach(o);else{const l=Ke(n),c=l&&gl(t);if(l&&t==="length"){const u=Number(i);a.forEach((f,d)=>{(d==="length"||d===Ms||!wi(d)&&d>=u)&&o(f)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(Ms)),e){case"add":l?c&&o(a.get("length")):(o(a.get(Gi)),Dr(n)&&o(a.get(qa)));break;case"delete":l||(o(a.get(Gi)),Dr(n)&&o(a.get(qa)));break;case"set":Dr(n)&&o(a.get(Gi));break}}Ml()}function nr(n){const e=ct(n);return e===n?e:(Wt(e,"iterate",Ms),yn(n)?e:e.map(Ht))}function Ho(n){return Wt(n=ct(n),"iterate",Ms),n}const xd={__proto__:null,[Symbol.iterator](){return na(this,Symbol.iterator,Ht)},concat(...n){return nr(this).concat(...n.map(e=>Ke(e)?nr(e):e))},entries(){return na(this,"entries",n=>(n[1]=Ht(n[1]),n))},every(n,e){return Vn(this,"every",n,e,void 0,arguments)},filter(n,e){return Vn(this,"filter",n,e,t=>t.map(Ht),arguments)},find(n,e){return Vn(this,"find",n,e,Ht,arguments)},findIndex(n,e){return Vn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Vn(this,"findLast",n,e,Ht,arguments)},findLastIndex(n,e){return Vn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Vn(this,"forEach",n,e,void 0,arguments)},includes(...n){return ia(this,"includes",n)},indexOf(...n){return ia(this,"indexOf",n)},join(n){return nr(this).join(n)},lastIndexOf(...n){return ia(this,"lastIndexOf",n)},map(n,e){return Vn(this,"map",n,e,void 0,arguments)},pop(){return jr(this,"pop")},push(...n){return jr(this,"push",n)},reduce(n,...e){return ql(this,"reduce",n,e)},reduceRight(n,...e){return ql(this,"reduceRight",n,e)},shift(){return jr(this,"shift")},some(n,e){return Vn(this,"some",n,e,void 0,arguments)},splice(...n){return jr(this,"splice",n)},toReversed(){return nr(this).toReversed()},toSorted(n){return nr(this).toSorted(n)},toSpliced(...n){return nr(this).toSpliced(...n)},unshift(...n){return jr(this,"unshift",n)},values(){return na(this,"values",Ht)}};function na(n,e,t){const i=Ho(n),r=i[e]();return i!==n&&!yn(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.value&&(s.value=t(s.value)),s}),r}const Md=Array.prototype;function Vn(n,e,t,i,r,s){const a=Ho(n),o=a!==n&&!yn(n),l=a[e];if(l!==Md[e]){const f=l.apply(n,s);return o?Ht(f):f}let c=t;a!==n&&(o?c=function(f,d){return t.call(this,Ht(f),d,n)}:t.length>2&&(c=function(f,d){return t.call(this,f,d,n)}));const u=l.call(a,c,i);return o&&r?r(u):u}function ql(n,e,t,i){const r=Ho(n);let s=t;return r!==n&&(yn(n)?t.length>3&&(s=function(a,o,l){return t.call(this,a,o,l,n)}):s=function(a,o,l){return t.call(this,a,Ht(o),l,n)}),r[e](s,...i)}function ia(n,e,t){const i=ct(n);Wt(i,"iterate",Ms);const r=i[e](...t);return(r===-1||r===!1)&&Al(t[0])?(t[0]=ct(t[0]),i[e](...t)):r}function jr(n,e,t=[]){ti(),xl();const i=ct(n)[e].apply(n,t);return Ml(),ni(),i}const yd=dl("__proto__,__v_isRef,__isVue"),Rf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(wi));function Sd(n){wi(n)||(n=String(n));const e=ct(this);return Wt(e,"has",n),e.hasOwnProperty(n)}class Pf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?Dd:If:s?Uf:Df).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Ke(e);if(!r){let l;if(a&&(l=xd[t]))return l;if(t==="hasOwnProperty")return Sd}const o=Reflect.get(e,t,qt(e)?e:i);return(wi(t)?Rf.has(t):yd(t))||(r||Wt(e,"get",t),s)?o:qt(o)?a&&gl(t)?o:o.value:At(o)?r?Nf(o):bl(o):o}}class Lf extends Pf{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];if(!this._isShallow){const l=bi(s);if(!yn(i)&&!bi(i)&&(s=ct(s),i=ct(i)),!Ke(e)&&qt(s)&&!qt(i))return l?!1:(s.value=i,!0)}const a=Ke(e)&&gl(t)?Number(t)<e.length:ut(e,t),o=Reflect.set(e,t,i,qt(e)?e:r);return e===ct(r)&&(a?Mi(i,s)&&$n(e,"set",t,i):$n(e,"add",t,i)),o}deleteProperty(e,t){const i=ut(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&$n(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!wi(t)||!Rf.has(t))&&Wt(e,"has",t),i}ownKeys(e){return Wt(e,"iterate",Ke(e)?"length":Gi),Reflect.ownKeys(e)}}class Ed extends Pf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const bd=new Lf,Td=new Ed,Ad=new Lf(!0);const ja=n=>n,Fs=n=>Reflect.getPrototypeOf(n);function wd(n,e,t){return function(...i){const r=this.__v_raw,s=ct(r),a=Dr(s),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=r[n](...i),u=t?ja:e?yo:Ht;return!e&&Wt(s,"iterate",l?qa:Gi),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:o?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function Os(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Cd(n,e){const t={get(r){const s=this.__v_raw,a=ct(s),o=ct(r);n||(Mi(r,o)&&Wt(a,"get",r),Wt(a,"get",o));const{has:l}=Fs(a),c=e?ja:n?yo:Ht;if(l.call(a,r))return c(s.get(r));if(l.call(a,o))return c(s.get(o));s!==a&&s.get(r)},get size(){const r=this.__v_raw;return!n&&Wt(ct(r),"iterate",Gi),Reflect.get(r,"size",r)},has(r){const s=this.__v_raw,a=ct(s),o=ct(r);return n||(Mi(r,o)&&Wt(a,"has",r),Wt(a,"has",o)),r===o?s.has(r):s.has(r)||s.has(o)},forEach(r,s){const a=this,o=a.__v_raw,l=ct(o),c=e?ja:n?yo:Ht;return!n&&Wt(l,"iterate",Gi),o.forEach((u,f)=>r.call(s,c(u),c(f),a))}};return tn(t,n?{add:Os("add"),set:Os("set"),delete:Os("delete"),clear:Os("clear")}:{add(r){!e&&!yn(r)&&!bi(r)&&(r=ct(r));const s=ct(this);return Fs(s).has.call(s,r)||(s.add(r),$n(s,"add",r,r)),this},set(r,s){!e&&!yn(s)&&!bi(s)&&(s=ct(s));const a=ct(this),{has:o,get:l}=Fs(a);let c=o.call(a,r);c||(r=ct(r),c=o.call(a,r));const u=l.call(a,r);return a.set(r,s),c?Mi(s,u)&&$n(a,"set",r,s):$n(a,"add",r,s),this},delete(r){const s=ct(this),{has:a,get:o}=Fs(s);let l=a.call(s,r);l||(r=ct(r),l=a.call(s,r)),o&&o.call(s,r);const c=s.delete(r);return l&&$n(s,"delete",r,void 0),c},clear(){const r=ct(this),s=r.size!==0,a=r.clear();return s&&$n(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=wd(r,n,e)}),t}function El(n,e){const t=Cd(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(ut(t,r)&&r in i?t:i,r,s)}const Rd={get:El(!1,!1)},Pd={get:El(!1,!0)},Ld={get:El(!0,!1)};const Df=new WeakMap,Uf=new WeakMap,If=new WeakMap,Dd=new WeakMap;function Ud(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Id(n){return n.__v_skip||!Object.isExtensible(n)?0:Ud(sd(n))}function bl(n){return bi(n)?n:Tl(n,!1,bd,Rd,Df)}function Nd(n){return Tl(n,!1,Ad,Pd,Uf)}function Nf(n){return Tl(n,!0,Td,Ld,If)}function Tl(n,e,t,i,r){if(!At(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=Id(n);if(s===0)return n;const a=r.get(n);if(a)return a;const o=new Proxy(n,s===2?i:t);return r.set(n,o),o}function Ur(n){return bi(n)?Ur(n.__v_raw):!!(n&&n.__v_isReactive)}function bi(n){return!!(n&&n.__v_isReadonly)}function yn(n){return!!(n&&n.__v_isShallow)}function Al(n){return n?!!n.__v_raw:!1}function ct(n){const e=n&&n.__v_raw;return e?ct(e):n}function Fd(n){return!ut(n,"__v_skip")&&Object.isExtensible(n)&&ka(n,"__v_skip",!0),n}const Ht=n=>At(n)?bl(n):n,yo=n=>At(n)?Nf(n):n;function qt(n){return n?n.__v_isRef===!0:!1}function jl(n){return Od(n,!1)}function Od(n,e){return qt(n)?n:new Bd(n,e)}class Bd{constructor(e,t){this.dep=new Sl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:ct(e),this._value=t?e:Ht(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||yn(e)||bi(e);e=i?e:ct(e),Mi(e,t)&&(this._rawValue=e,this._value=i?e:Ht(e),this.dep.trigger())}}function zd(n){return qt(n)?n.value:n}const Hd={get:(n,e,t)=>e==="__v_raw"?n:zd(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return qt(r)&&!qt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function Ff(n){return Ur(n)?n:new Proxy(n,Hd)}class Gd{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Sl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=xs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&vt!==this)return Ef(this,!0),!0}get value(){const e=this.dep.track();return Af(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Vd(n,e,t=!1){let i,r;return tt(n)?i=n:(i=n.get,r=n.set),new Gd(i,r,t)}const Bs={},So=new WeakMap;let Fi;function kd(n,e=!1,t=Fi){if(t){let i=So.get(t);i||So.set(t,i=[]),i.push(n)}}function Wd(n,e,t=xt){const{immediate:i,deep:r,once:s,scheduler:a,augmentJob:o,call:l}=t,c=b=>r?b:yn(b)||r===!1||r===0?gi(b,1):gi(b);let u,f,d,p,_=!1,v=!1;if(qt(n)?(f=()=>n.value,_=yn(n)):Ur(n)?(f=()=>c(n),_=!0):Ke(n)?(v=!0,_=n.some(b=>Ur(b)||yn(b)),f=()=>n.map(b=>{if(qt(b))return b.value;if(Ur(b))return c(b);if(tt(b))return l?l(b,2):b()})):tt(n)?e?f=l?()=>l(n,2):n:f=()=>{if(d){ti();try{d()}finally{ni()}}const b=Fi;Fi=u;try{return l?l(n,3,[p]):n(p)}finally{Fi=b}}:f=zn,e&&r){const b=f,N=r===!0?1/0:r;f=()=>gi(b(),N)}const m=gd(),h=()=>{u.stop(),m&&m.active&&ml(m.effects,u)};if(s&&e){const b=e;e=(...N)=>{b(...N),h()}}let E=v?new Array(n.length).fill(Bs):Bs;const S=b=>{if(!(!(u.flags&1)||!u.dirty&&!b))if(e){const N=u.run();if(r||_||(v?N.some((D,R)=>Mi(D,E[R])):Mi(N,E))){d&&d();const D=Fi;Fi=u;try{const R=[N,E===Bs?void 0:v&&E[0]===Bs?[]:E,p];E=N,l?l(e,3,R):e(...R)}finally{Fi=D}}}else u.run()};return o&&o(S),u=new yf(f),u.scheduler=a?()=>a(S,!1):S,p=b=>kd(b,!1,u),d=u.onStop=()=>{const b=So.get(u);if(b){if(l)l(b,4);else for(const N of b)N();So.delete(u)}},e?i?S(!0):E=u.run():a?a(S.bind(null,!0),!0):u.run(),h.pause=u.pause.bind(u),h.resume=u.resume.bind(u),h.stop=h,h}function gi(n,e=1/0,t){if(e<=0||!At(n)||n.__v_skip||(t=t||new Set,t.has(n)))return n;if(t.add(n),e--,qt(n))gi(n.value,e,t);else if(Ke(n))for(let i=0;i<n.length;i++)gi(n[i],e,t);else if(df(n)||Dr(n))n.forEach(i=>{gi(i,e,t)});else if(gf(n)){for(const i in n)gi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&gi(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function As(n,e,t,i){try{return i?n(...i):n()}catch(r){Go(r,e,t)}}function Hn(n,e,t,i){if(tt(n)){const r=As(n,e,t,i);return r&&pf(r)&&r.catch(s=>{Go(s,e,t)}),r}if(Ke(n)){const r=[];for(let s=0;s<n.length;s++)r.push(Hn(n[s],e,t,i));return r}}function Go(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||xt;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}o=o.parent}if(s){ti(),As(s,null,10,[n,l,c]),ni();return}}Xd(n,t,r,i,a)}function Xd(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const Zt=[];let In=-1;const Ir=[];let hi=null,wr=0;const Of=Promise.resolve();let Eo=null;function qd(n){const e=Eo||Of;return n?e.then(this?n.bind(this):n):e}function jd(n){let e=In+1,t=Zt.length;for(;e<t;){const i=e+t>>>1,r=Zt[i],s=ys(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function wl(n){if(!(n.flags&1)){const e=ys(n),t=Zt[Zt.length-1];!t||!(n.flags&2)&&e>=ys(t)?Zt.push(n):Zt.splice(jd(e),0,n),n.flags|=1,Bf()}}function Bf(){Eo||(Eo=Of.then(Hf))}function Yd(n){Ke(n)?Ir.push(...n):hi&&n.id===-1?hi.splice(wr+1,0,n):n.flags&1||(Ir.push(n),n.flags|=1),Bf()}function Yl(n,e,t=In+1){for(;t<Zt.length;t++){const i=Zt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Zt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function zf(n){if(Ir.length){const e=[...new Set(Ir)].sort((t,i)=>ys(t)-ys(i));if(Ir.length=0,hi){hi.push(...e);return}for(hi=e,wr=0;wr<hi.length;wr++){const t=hi[wr];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}hi=null,wr=0}}const ys=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Hf(n){try{for(In=0;In<Zt.length;In++){const e=Zt[In];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),As(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;In<Zt.length;In++){const e=Zt[In];e&&(e.flags&=-2)}In=-1,Zt.length=0,zf(),Eo=null,(Zt.length||Ir.length)&&Hf()}}let Bn=null,Gf=null;function bo(n){const e=Bn;return Bn=n,Gf=n&&n.type.__scopeId||null,e}function Kd(n,e=Bn,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&ic(-1);const s=bo(e);let a;try{a=n(...r)}finally{bo(s),i._d&&ic(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Pi(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[i];l&&(ti(),Hn(l,t,8,[n.el,o,n,e]),ni())}}const $d=Symbol("_vte"),Zd=n=>n.__isTeleport;function Cl(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Cl(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Vf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function fs(n,e,t,i,r=!1){if(Ke(n)){n.forEach((_,v)=>fs(_,e&&(Ke(e)?e[v]:e),t,i,r));return}if(hs(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&fs(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?Dl(i.component):i.el,a=r?null:s,{i:o,r:l}=n,c=e&&e.r,u=o.refs===xt?o.refs={}:o.refs,f=o.setupState,d=ct(f),p=f===xt?()=>!1:_=>ut(d,_);if(c!=null&&c!==l&&(Ut(c)?(u[c]=null,p(c)&&(f[c]=null)):qt(c)&&(c.value=null)),tt(l))As(l,o,12,[a,u]);else{const _=Ut(l),v=qt(l);if(_||v){const m=()=>{if(n.f){const h=_?p(l)?f[l]:u[l]:l.value;r?Ke(h)&&ml(h,s):Ke(h)?h.includes(s)||h.push(s):_?(u[l]=[s],p(l)&&(f[l]=u[l])):(l.value=[s],n.k&&(u[n.k]=l.value))}else _?(u[l]=a,p(l)&&(f[l]=a)):v&&(l.value=a,n.k&&(u[n.k]=a))};a?(m.id=-1,un(m,t)):m()}}}zo().requestIdleCallback;zo().cancelIdleCallback;const hs=n=>!!n.type.__asyncLoader,kf=n=>n.type.__isKeepAlive;function Jd(n,e){Wf(n,"a",e)}function Qd(n,e){Wf(n,"da",e)}function Wf(n,e,t=Qt){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(Vo(e,i,t),t){let r=t.parent;for(;r&&r.parent;)kf(r.parent.vnode)&&ep(i,e,t,r),r=r.parent}}function ep(n,e,t,i){const r=Vo(e,n,i,!0);jf(()=>{ml(i[e],r)},t)}function Vo(n,e,t=Qt,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...a)=>{ti();const o=ws(t),l=Hn(e,t,n,a);return o(),ni(),l});return i?r.unshift(s):r.push(s),s}}const ri=n=>(e,t=Qt)=>{(!Es||n==="sp")&&Vo(n,(...i)=>e(...i),t)},tp=ri("bm"),Xf=ri("m"),np=ri("bu"),ip=ri("u"),qf=ri("bum"),jf=ri("um"),rp=ri("sp"),sp=ri("rtg"),op=ri("rtc");function ap(n,e=Qt){Vo("ec",n,e)}const lp=Symbol.for("v-ndc");function ko(n,e,t,i){let r;const s=t,a=Ke(n);if(a||Ut(n)){const o=a&&Ur(n);let l=!1,c=!1;o&&(l=!yn(n),c=bi(n),n=Ho(n)),r=new Array(n.length);for(let u=0,f=n.length;u<f;u++)r[u]=e(l?c?yo(Ht(n[u])):Ht(n[u]):n[u],u,void 0,s)}else if(typeof n=="number"){r=new Array(n);for(let o=0;o<n;o++)r[o]=e(o+1,o,void 0,s)}else if(At(n))if(n[Symbol.iterator])r=Array.from(n,(o,l)=>e(o,l,void 0,s));else{const o=Object.keys(n);r=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];r[l]=e(n[u],u,l,s)}}else r=[];return r}const Ya=n=>n?mh(n)?Dl(n):Ya(n.parent):null,ds=tn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ya(n.parent),$root:n=>Ya(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Kf(n),$forceUpdate:n=>n.f||(n.f=()=>{wl(n.update)}),$nextTick:n=>n.n||(n.n=qd.bind(n.proxy)),$watch:n=>Pp.bind(n)}),ra=(n,e)=>n!==xt&&!n.__isScriptSetup&&ut(n,e),cp={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:a,type:o,appContext:l}=n;let c;if(e[0]!=="$"){const p=a[e];if(p!==void 0)switch(p){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(ra(i,e))return a[e]=1,i[e];if(r!==xt&&ut(r,e))return a[e]=2,r[e];if((c=n.propsOptions[0])&&ut(c,e))return a[e]=3,s[e];if(t!==xt&&ut(t,e))return a[e]=4,t[e];Ka&&(a[e]=0)}}const u=ds[e];let f,d;if(u)return e==="$attrs"&&Wt(n.attrs,"get",""),u(n);if((f=o.__cssModules)&&(f=f[e]))return f;if(t!==xt&&ut(t,e))return a[e]=4,t[e];if(d=l.config.globalProperties,ut(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return ra(r,e)?(r[e]=t,!0):i!==xt&&ut(i,e)?(i[e]=t,!0):ut(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s}},a){let o;return!!t[a]||n!==xt&&ut(n,a)||ra(e,a)||(o=s[0])&&ut(o,a)||ut(i,a)||ut(ds,a)||ut(r.config.globalProperties,a)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ut(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Kl(n){return Ke(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Ka=!0;function up(n){const e=Kf(n),t=n.proxy,i=n.ctx;Ka=!1,e.beforeCreate&&$l(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:p,updated:_,activated:v,deactivated:m,beforeDestroy:h,beforeUnmount:E,destroyed:S,unmounted:b,render:N,renderTracked:D,renderTriggered:R,errorCaptured:j,serverPrefetch:T,expose:w,inheritAttrs:K,components:re,directives:xe,filters:B}=e;if(c&&fp(c,i,null),a)for(const ne in a){const Q=a[ne];tt(Q)&&(i[ne]=Q.bind(t))}if(r){const ne=r.call(t,t);At(ne)&&(n.data=bl(ne))}if(Ka=!0,s)for(const ne in s){const Q=s[ne],ae=tt(Q)?Q.bind(t,t):tt(Q.get)?Q.get.bind(t,t):zn,fe=!tt(Q)&&tt(Q.set)?Q.set.bind(t):zn,_e=Jp({get:ae,set:fe});Object.defineProperty(i,ne,{enumerable:!0,configurable:!0,get:()=>_e.value,set:ge=>_e.value=ge})}if(o)for(const ne in o)Yf(o[ne],i,t,ne);if(l){const ne=tt(l)?l.call(t):l;Reflect.ownKeys(ne).forEach(Q=>{_p(Q,ne[Q])})}u&&$l(u,n,"c");function J(ne,Q){Ke(Q)?Q.forEach(ae=>ne(ae.bind(t))):Q&&ne(Q.bind(t))}if(J(tp,f),J(Xf,d),J(np,p),J(ip,_),J(Jd,v),J(Qd,m),J(ap,j),J(op,D),J(sp,R),J(qf,E),J(jf,b),J(rp,T),Ke(w))if(w.length){const ne=n.exposed||(n.exposed={});w.forEach(Q=>{Object.defineProperty(ne,Q,{get:()=>t[Q],set:ae=>t[Q]=ae,enumerable:!0})})}else n.exposed||(n.exposed={});N&&n.render===zn&&(n.render=N),K!=null&&(n.inheritAttrs=K),re&&(n.components=re),xe&&(n.directives=xe),T&&Vf(n)}function fp(n,e,t=zn){Ke(n)&&(n=$a(n));for(const i in n){const r=n[i];let s;At(r)?"default"in r?s=go(r.from||i,r.default,!0):s=go(r.from||i):s=go(r),qt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):e[i]=s}}function $l(n,e,t){Hn(Ke(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Yf(n,e,t,i){let r=i.includes(".")?lh(t,i):()=>t[i];if(Ut(n)){const s=e[n];tt(s)&&oa(r,s)}else if(tt(n))oa(r,n.bind(t));else if(At(n))if(Ke(n))n.forEach(s=>Yf(s,e,t,i));else{const s=tt(n.handler)?n.handler.bind(t):e[n.handler];tt(s)&&oa(r,s,n)}}function Kf(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=n.appContext,o=s.get(e);let l;return o?l=o:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>To(l,c,a,!0)),To(l,e,a)),At(e)&&s.set(e,l),l}function To(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&To(n,s,t,!0),r&&r.forEach(a=>To(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=hp[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const hp={data:Zl,props:Jl,emits:Jl,methods:os,computed:os,beforeCreate:Yt,created:Yt,beforeMount:Yt,mounted:Yt,beforeUpdate:Yt,updated:Yt,beforeDestroy:Yt,beforeUnmount:Yt,destroyed:Yt,unmounted:Yt,activated:Yt,deactivated:Yt,errorCaptured:Yt,serverPrefetch:Yt,components:os,directives:os,watch:pp,provide:Zl,inject:dp};function Zl(n,e){return e?n?function(){return tn(tt(n)?n.call(this,this):n,tt(e)?e.call(this,this):e)}:e:n}function dp(n,e){return os($a(n),$a(e))}function $a(n){if(Ke(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Yt(n,e){return n?[...new Set([].concat(n,e))]:e}function os(n,e){return n?tn(Object.create(null),n,e):e}function Jl(n,e){return n?Ke(n)&&Ke(e)?[...new Set([...n,...e])]:tn(Object.create(null),Kl(n),Kl(e??{})):e}function pp(n,e){if(!n)return e;if(!e)return n;const t=tn(Object.create(null),n);for(const i in e)t[i]=Yt(n[i],e[i]);return t}function $f(){return{app:null,config:{isNativeTag:id,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let mp=0;function gp(n,e){return function(i,r=null){tt(i)||(i=tn({},i)),r!=null&&!At(r)&&(r=null);const s=$f(),a=new WeakSet,o=[];let l=!1;const c=s.app={_uid:mp++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:Qp,get config(){return s.config},set config(u){},use(u,...f){return a.has(u)||(u&&tt(u.install)?(a.add(u),u.install(c,...f)):tt(u)&&(a.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!l){const p=c._ceVNode||on(i,r);return p.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),n(p,u,d),l=!0,c._container=u,u.__vue_app__=c,Dl(p.component)}},onUnmount(u){o.push(u)},unmount(){l&&(Hn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Nr;Nr=c;try{return u()}finally{Nr=f}}};return c}}let Nr=null;function _p(n,e){if(Qt){let t=Qt.provides;const i=Qt.parent&&Qt.parent.provides;i===t&&(t=Qt.provides=Object.create(i)),t[n]=e}}function go(n,e,t=!1){const i=qp();if(i||Nr){let r=Nr?Nr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&tt(e)?e.call(i&&i.proxy):e}}const Zf={},Jf=()=>Object.create(Zf),Qf=n=>Object.getPrototypeOf(n)===Zf;function vp(n,e,t,i=!1){const r={},s=Jf();n.propsDefaults=Object.create(null),eh(n,e,r,s);for(const a in n.propsOptions[0])a in r||(r[a]=void 0);t?n.props=i?r:Nd(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function xp(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:a}}=n,o=ct(r),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Wo(n.emitsOptions,d))continue;const p=e[d];if(l)if(ut(s,d))p!==s[d]&&(s[d]=p,c=!0);else{const _=Ei(d);r[_]=Za(l,o,_,p,n,!1)}else p!==s[d]&&(s[d]=p,c=!0)}}}else{eh(n,e,r,s)&&(c=!0);let u;for(const f in o)(!e||!ut(e,f)&&((u=qi(f))===f||!ut(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Za(l,o,f,void 0,n,!0)):delete r[f]);if(s!==o)for(const f in s)(!e||!ut(e,f))&&(delete s[f],c=!0)}c&&$n(n.attrs,"set","")}function eh(n,e,t,i){const[r,s]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(ls(l))continue;const c=e[l];let u;r&&ut(r,u=Ei(l))?!s||!s.includes(u)?t[u]=c:(o||(o={}))[u]=c:Wo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(s){const l=ct(t),c=o||xt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Za(r,l,f,c[f],n,!ut(c,f))}}return a}function Za(n,e,t,i,r,s){const a=n[t];if(a!=null){const o=ut(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&tt(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=ws(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===qi(t))&&(i=!0))}return i}const Mp=new WeakMap;function th(n,e,t=!1){const i=t?Mp:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,a={},o=[];let l=!1;if(!tt(n)){const u=f=>{l=!0;const[d,p]=th(f,e,!0);tn(a,d),p&&o.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return At(n)&&i.set(n,Lr),Lr;if(Ke(s))for(let u=0;u<s.length;u++){const f=Ei(s[u]);Ql(f)&&(a[f]=xt)}else if(s)for(const u in s){const f=Ei(u);if(Ql(f)){const d=s[u],p=a[f]=Ke(d)||tt(d)?{type:d}:tn({},d),_=p.type;let v=!1,m=!0;if(Ke(_))for(let h=0;h<_.length;++h){const E=_[h],S=tt(E)&&E.name;if(S==="Boolean"){v=!0;break}else S==="String"&&(m=!1)}else v=tt(_)&&_.name==="Boolean";p[0]=v,p[1]=m,(v||ut(p,"default"))&&o.push(f)}}const c=[a,o];return At(n)&&i.set(n,c),c}function Ql(n){return n[0]!=="$"&&!ls(n)}const Rl=n=>n==="_"||n==="__"||n==="_ctx"||n==="$stable",Pl=n=>Ke(n)?n.map(Nn):[Nn(n)],yp=(n,e,t)=>{if(e._n)return e;const i=Kd((...r)=>Pl(e(...r)),t);return i._c=!1,i},nh=(n,e,t)=>{const i=n._ctx;for(const r in n){if(Rl(r))continue;const s=n[r];if(tt(s))e[r]=yp(r,s,i);else if(s!=null){const a=Pl(s);e[r]=()=>a}}},ih=(n,e)=>{const t=Pl(e);n.slots.default=()=>t},rh=(n,e,t)=>{for(const i in e)(t||!Rl(i))&&(n[i]=e[i])},Sp=(n,e,t)=>{const i=n.slots=Jf();if(n.vnode.shapeFlag&32){const r=e.__;r&&ka(i,"__",r,!0);const s=e._;s?(rh(i,e,t),t&&ka(i,"_",s,!0)):nh(e,i)}else e&&ih(n,e)},Ep=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,a=xt;if(i.shapeFlag&32){const o=e._;o?t&&o===1?s=!1:rh(r,e,t):(s=!e.$stable,nh(e,r)),a=e}else e&&(ih(n,e),a={default:1});if(s)for(const o in r)!Rl(o)&&a[o]==null&&delete r[o]},un=Op;function bp(n){return Tp(n)}function Tp(n,e){const t=zo();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:p=zn,insertStaticContent:_}=n,v=(x,I,O,q=null,V=null,ie=null,se=void 0,y=null,g=!!I.dynamicChildren)=>{if(x===I)return;x&&!Yr(x,I)&&(q=Le(x),ge(x,V,ie,!0),x=null),I.patchFlag===-2&&(g=!1,I.dynamicChildren=null);const{type:L,ref:k,shapeFlag:z}=I;switch(L){case Xo:m(x,I,O,q);break;case Or:h(x,I,O,q);break;case _o:x==null&&E(I,O,q,se);break;case Jt:re(x,I,O,q,V,ie,se,y,g);break;default:z&1?N(x,I,O,q,V,ie,se,y,g):z&6?xe(x,I,O,q,V,ie,se,y,g):(z&64||z&128)&&L.process(x,I,O,q,V,ie,se,y,g,Fe)}k!=null&&V?fs(k,x&&x.ref,ie,I||x,!I):k==null&&x&&x.ref!=null&&fs(x.ref,null,ie,x,!0)},m=(x,I,O,q)=>{if(x==null)i(I.el=o(I.children),O,q);else{const V=I.el=x.el;I.children!==x.children&&c(V,I.children)}},h=(x,I,O,q)=>{x==null?i(I.el=l(I.children||""),O,q):I.el=x.el},E=(x,I,O,q)=>{[x.el,x.anchor]=_(x.children,I,O,q,x.el,x.anchor)},S=({el:x,anchor:I},O,q)=>{let V;for(;x&&x!==I;)V=d(x),i(x,O,q),x=V;i(I,O,q)},b=({el:x,anchor:I})=>{let O;for(;x&&x!==I;)O=d(x),r(x),x=O;r(I)},N=(x,I,O,q,V,ie,se,y,g)=>{I.type==="svg"?se="svg":I.type==="math"&&(se="mathml"),x==null?D(I,O,q,V,ie,se,y,g):T(x,I,V,ie,se,y,g)},D=(x,I,O,q,V,ie,se,y)=>{let g,L;const{props:k,shapeFlag:z,transition:W,dirs:he}=x;if(g=x.el=a(x.type,ie,k&&k.is,k),z&8?u(g,x.children):z&16&&j(x.children,g,null,q,V,sa(x,ie),se,y),he&&Pi(x,null,q,"created"),R(g,x,x.scopeId,se,q),k){for(const ve in k)ve!=="value"&&!ls(ve)&&s(g,ve,null,k[ve],ie,q);"value"in k&&s(g,"value",null,k.value,ie),(L=k.onVnodeBeforeMount)&&Un(L,q,x)}he&&Pi(x,null,q,"beforeMount");const le=Ap(V,W);le&&W.beforeEnter(g),i(g,I,O),((L=k&&k.onVnodeMounted)||le||he)&&un(()=>{L&&Un(L,q,x),le&&W.enter(g),he&&Pi(x,null,q,"mounted")},V)},R=(x,I,O,q,V)=>{if(O&&p(x,O),q)for(let ie=0;ie<q.length;ie++)p(x,q[ie]);if(V){let ie=V.subTree;if(I===ie||uh(ie.type)&&(ie.ssContent===I||ie.ssFallback===I)){const se=V.vnode;R(x,se,se.scopeId,se.slotScopeIds,V.parent)}}},j=(x,I,O,q,V,ie,se,y,g=0)=>{for(let L=g;L<x.length;L++){const k=x[L]=y?di(x[L]):Nn(x[L]);v(null,k,I,O,q,V,ie,se,y)}},T=(x,I,O,q,V,ie,se)=>{const y=I.el=x.el;let{patchFlag:g,dynamicChildren:L,dirs:k}=I;g|=x.patchFlag&16;const z=x.props||xt,W=I.props||xt;let he;if(O&&Li(O,!1),(he=W.onVnodeBeforeUpdate)&&Un(he,O,I,x),k&&Pi(I,x,O,"beforeUpdate"),O&&Li(O,!0),(z.innerHTML&&W.innerHTML==null||z.textContent&&W.textContent==null)&&u(y,""),L?w(x.dynamicChildren,L,y,O,q,sa(I,V),ie):se||Q(x,I,y,null,O,q,sa(I,V),ie,!1),g>0){if(g&16)K(y,z,W,O,V);else if(g&2&&z.class!==W.class&&s(y,"class",null,W.class,V),g&4&&s(y,"style",z.style,W.style,V),g&8){const le=I.dynamicProps;for(let ve=0;ve<le.length;ve++){const Ae=le[ve],ye=z[Ae],oe=W[Ae];(oe!==ye||Ae==="value")&&s(y,Ae,ye,oe,V,O)}}g&1&&x.children!==I.children&&u(y,I.children)}else!se&&L==null&&K(y,z,W,O,V);((he=W.onVnodeUpdated)||k)&&un(()=>{he&&Un(he,O,I,x),k&&Pi(I,x,O,"updated")},q)},w=(x,I,O,q,V,ie,se)=>{for(let y=0;y<I.length;y++){const g=x[y],L=I[y],k=g.el&&(g.type===Jt||!Yr(g,L)||g.shapeFlag&198)?f(g.el):O;v(g,L,k,null,q,V,ie,se,!0)}},K=(x,I,O,q,V)=>{if(I!==O){if(I!==xt)for(const ie in I)!ls(ie)&&!(ie in O)&&s(x,ie,I[ie],null,V,q);for(const ie in O){if(ls(ie))continue;const se=O[ie],y=I[ie];se!==y&&ie!=="value"&&s(x,ie,y,se,V,q)}"value"in O&&s(x,"value",I.value,O.value,V)}},re=(x,I,O,q,V,ie,se,y,g)=>{const L=I.el=x?x.el:o(""),k=I.anchor=x?x.anchor:o("");let{patchFlag:z,dynamicChildren:W,slotScopeIds:he}=I;he&&(y=y?y.concat(he):he),x==null?(i(L,O,q),i(k,O,q),j(I.children||[],O,k,V,ie,se,y,g)):z>0&&z&64&&W&&x.dynamicChildren?(w(x.dynamicChildren,W,O,V,ie,se,y),(I.key!=null||V&&I===V.subTree)&&sh(x,I,!0)):Q(x,I,O,k,V,ie,se,y,g)},xe=(x,I,O,q,V,ie,se,y,g)=>{I.slotScopeIds=y,x==null?I.shapeFlag&512?V.ctx.activate(I,O,q,se,g):B(I,O,q,V,ie,se,g):X(x,I,g)},B=(x,I,O,q,V,ie,se)=>{const y=x.component=Xp(x,q,V);if(kf(x)&&(y.ctx.renderer=Fe),jp(y,!1,se),y.asyncDep){if(V&&V.registerDep(y,J,se),!x.el){const g=y.subTree=on(Or);h(null,g,I,O),x.placeholder=g.el}}else J(y,x,I,O,V,ie,se)},X=(x,I,O)=>{const q=I.component=x.component;if(Np(x,I,O))if(q.asyncDep&&!q.asyncResolved){ne(q,I,O);return}else q.next=I,q.update();else I.el=x.el,q.vnode=I},J=(x,I,O,q,V,ie,se)=>{const y=()=>{if(x.isMounted){let{next:z,bu:W,u:he,parent:le,vnode:ve}=x;{const P=oh(x);if(P){z&&(z.el=ve.el,ne(x,z,se)),P.asyncDep.then(()=>{x.isUnmounted||y()});return}}let Ae=z,ye;Li(x,!1),z?(z.el=ve.el,ne(x,z,se)):z=ve,W&&Qo(W),(ye=z.props&&z.props.onVnodeBeforeUpdate)&&Un(ye,le,z,ve),Li(x,!0);const oe=tc(x),ze=x.subTree;x.subTree=oe,v(ze,oe,f(ze.el),Le(ze),x,V,ie),z.el=oe.el,Ae===null&&Fp(x,oe.el),he&&un(he,V),(ye=z.props&&z.props.onVnodeUpdated)&&un(()=>Un(ye,le,z,ve),V)}else{let z;const{el:W,props:he}=I,{bm:le,m:ve,parent:Ae,root:ye,type:oe}=x,ze=hs(I);Li(x,!1),le&&Qo(le),!ze&&(z=he&&he.onVnodeBeforeMount)&&Un(z,Ae,I),Li(x,!0);{ye.ce&&ye.ce._def.shadowRoot!==!1&&ye.ce._injectChildStyle(oe);const P=x.subTree=tc(x);v(null,P,O,q,x,V,ie),I.el=P.el}if(ve&&un(ve,V),!ze&&(z=he&&he.onVnodeMounted)){const P=I;un(()=>Un(z,Ae,P),V)}(I.shapeFlag&256||Ae&&hs(Ae.vnode)&&Ae.vnode.shapeFlag&256)&&x.a&&un(x.a,V),x.isMounted=!0,I=O=q=null}};x.scope.on();const g=x.effect=new yf(y);x.scope.off();const L=x.update=g.run.bind(g),k=x.job=g.runIfDirty.bind(g);k.i=x,k.id=x.uid,g.scheduler=()=>wl(k),Li(x,!0),L()},ne=(x,I,O)=>{I.component=x;const q=x.vnode.props;x.vnode=I,x.next=null,xp(x,I.props,q,O),Ep(x,I.children,O),ti(),Yl(x),ni()},Q=(x,I,O,q,V,ie,se,y,g=!1)=>{const L=x&&x.children,k=x?x.shapeFlag:0,z=I.children,{patchFlag:W,shapeFlag:he}=I;if(W>0){if(W&128){fe(L,z,O,q,V,ie,se,y,g);return}else if(W&256){ae(L,z,O,q,V,ie,se,y,g);return}}he&8?(k&16&&Ue(L,V,ie),z!==L&&u(O,z)):k&16?he&16?fe(L,z,O,q,V,ie,se,y,g):Ue(L,V,ie,!0):(k&8&&u(O,""),he&16&&j(z,O,q,V,ie,se,y,g))},ae=(x,I,O,q,V,ie,se,y,g)=>{x=x||Lr,I=I||Lr;const L=x.length,k=I.length,z=Math.min(L,k);let W;for(W=0;W<z;W++){const he=I[W]=g?di(I[W]):Nn(I[W]);v(x[W],he,O,null,V,ie,se,y,g)}L>k?Ue(x,V,ie,!0,!1,z):j(I,O,q,V,ie,se,y,g,z)},fe=(x,I,O,q,V,ie,se,y,g)=>{let L=0;const k=I.length;let z=x.length-1,W=k-1;for(;L<=z&&L<=W;){const he=x[L],le=I[L]=g?di(I[L]):Nn(I[L]);if(Yr(he,le))v(he,le,O,null,V,ie,se,y,g);else break;L++}for(;L<=z&&L<=W;){const he=x[z],le=I[W]=g?di(I[W]):Nn(I[W]);if(Yr(he,le))v(he,le,O,null,V,ie,se,y,g);else break;z--,W--}if(L>z){if(L<=W){const he=W+1,le=he<k?I[he].el:q;for(;L<=W;)v(null,I[L]=g?di(I[L]):Nn(I[L]),O,le,V,ie,se,y,g),L++}}else if(L>W)for(;L<=z;)ge(x[L],V,ie,!0),L++;else{const he=L,le=L,ve=new Map;for(L=le;L<=W;L++){const ce=I[L]=g?di(I[L]):Nn(I[L]);ce.key!=null&&ve.set(ce.key,L)}let Ae,ye=0;const oe=W-le+1;let ze=!1,P=0;const ue=new Array(oe);for(L=0;L<oe;L++)ue[L]=0;for(L=he;L<=z;L++){const ce=x[L];if(ye>=oe){ge(ce,V,ie,!0);continue}let Re;if(ce.key!=null)Re=ve.get(ce.key);else for(Ae=le;Ae<=W;Ae++)if(ue[Ae-le]===0&&Yr(ce,I[Ae])){Re=Ae;break}Re===void 0?ge(ce,V,ie,!0):(ue[Re-le]=L+1,Re>=P?P=Re:ze=!0,v(ce,I[Re],O,null,V,ie,se,y,g),ye++)}const pe=ze?wp(ue):Lr;for(Ae=pe.length-1,L=oe-1;L>=0;L--){const ce=le+L,Re=I[ce],je=I[ce+1],We=ce+1<k?je.el||je.placeholder:q;ue[L]===0?v(null,Re,O,We,V,ie,se,y,g):ze&&(Ae<0||L!==pe[Ae]?_e(Re,O,We,2):Ae--)}}},_e=(x,I,O,q,V=null)=>{const{el:ie,type:se,transition:y,children:g,shapeFlag:L}=x;if(L&6){_e(x.component.subTree,I,O,q);return}if(L&128){x.suspense.move(I,O,q);return}if(L&64){se.move(x,I,O,Fe);return}if(se===Jt){i(ie,I,O);for(let z=0;z<g.length;z++)_e(g[z],I,O,q);i(x.anchor,I,O);return}if(se===_o){S(x,I,O);return}if(q!==2&&L&1&&y)if(q===0)y.beforeEnter(ie),i(ie,I,O),un(()=>y.enter(ie),V);else{const{leave:z,delayLeave:W,afterLeave:he}=y,le=()=>{x.ctx.isUnmounted?r(ie):i(ie,I,O)},ve=()=>{z(ie,()=>{le(),he&&he()})};W?W(ie,le,ve):ve()}else i(ie,I,O)},ge=(x,I,O,q=!1,V=!1)=>{const{type:ie,props:se,ref:y,children:g,dynamicChildren:L,shapeFlag:k,patchFlag:z,dirs:W,cacheIndex:he}=x;if(z===-2&&(V=!1),y!=null&&(ti(),fs(y,null,O,x,!0),ni()),he!=null&&(I.renderCache[he]=void 0),k&256){I.ctx.deactivate(x);return}const le=k&1&&W,ve=!hs(x);let Ae;if(ve&&(Ae=se&&se.onVnodeBeforeUnmount)&&Un(Ae,I,x),k&6)Ce(x.component,O,q);else{if(k&128){x.suspense.unmount(O,q);return}le&&Pi(x,null,I,"beforeUnmount"),k&64?x.type.remove(x,I,O,Fe,q):L&&!L.hasOnce&&(ie!==Jt||z>0&&z&64)?Ue(L,I,O,!1,!0):(ie===Jt&&z&384||!V&&k&16)&&Ue(g,I,O),q&&te(x)}(ve&&(Ae=se&&se.onVnodeUnmounted)||le)&&un(()=>{Ae&&Un(Ae,I,x),le&&Pi(x,null,I,"unmounted")},O)},te=x=>{const{type:I,el:O,anchor:q,transition:V}=x;if(I===Jt){de(O,q);return}if(I===_o){b(x);return}const ie=()=>{r(O),V&&!V.persisted&&V.afterLeave&&V.afterLeave()};if(x.shapeFlag&1&&V&&!V.persisted){const{leave:se,delayLeave:y}=V,g=()=>se(O,ie);y?y(x.el,ie,g):g()}else ie()},de=(x,I)=>{let O;for(;x!==I;)O=d(x),r(x),x=O;r(I)},Ce=(x,I,O)=>{const{bum:q,scope:V,job:ie,subTree:se,um:y,m:g,a:L,parent:k,slots:{__:z}}=x;ec(g),ec(L),q&&Qo(q),k&&Ke(z)&&z.forEach(W=>{k.renderCache[W]=void 0}),V.stop(),ie&&(ie.flags|=8,ge(se,x,I,O)),y&&un(y,I),un(()=>{x.isUnmounted=!0},I),I&&I.pendingBranch&&!I.isUnmounted&&x.asyncDep&&!x.asyncResolved&&x.suspenseId===I.pendingId&&(I.deps--,I.deps===0&&I.resolve())},Ue=(x,I,O,q=!1,V=!1,ie=0)=>{for(let se=ie;se<x.length;se++)ge(x[se],I,O,q,V)},Le=x=>{if(x.shapeFlag&6)return Le(x.component.subTree);if(x.shapeFlag&128)return x.suspense.next();const I=d(x.anchor||x.el),O=I&&I[$d];return O?d(O):I};let He=!1;const Ve=(x,I,O)=>{x==null?I._vnode&&ge(I._vnode,null,null,!0):v(I._vnode||null,x,I,null,null,null,O),I._vnode=x,He||(He=!0,Yl(),zf(),He=!1)},Fe={p:v,um:ge,m:_e,r:te,mt:B,mc:j,pc:Q,pbc:w,n:Le,o:n};return{render:Ve,hydrate:void 0,createApp:gp(Ve)}}function sa({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Li({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Ap(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function sh(n,e,t=!1){const i=n.children,r=e.children;if(Ke(i)&&Ke(r))for(let s=0;s<i.length;s++){const a=i[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=di(r[s]),o.el=a.el),!t&&o.patchFlag!==-2&&sh(a,o)),o.type===Xo&&(o.el=a.el),o.type===Or&&!o.el&&(o.el=a.el)}}function wp(n){const e=n.slice(),t=[0];let i,r,s,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,a=t.length-1;s<a;)o=s+a>>1,n[t[o]]<c?s=o+1:a=o;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,a=t[s-1];s-- >0;)t[s]=a,a=e[a];return t}function oh(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:oh(e)}function ec(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Cp=Symbol.for("v-scx"),Rp=()=>go(Cp);function oa(n,e,t){return ah(n,e,t)}function ah(n,e,t=xt){const{immediate:i,deep:r,flush:s,once:a}=t,o=tn({},t),l=e&&i||!e&&s!=="post";let c;if(Es){if(s==="sync"){const p=Rp();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=zn,p.resume=zn,p.pause=zn,p}}const u=Qt;o.call=(p,_,v)=>Hn(p,u,_,v);let f=!1;s==="post"?o.scheduler=p=>{un(p,u&&u.suspense)}:s!=="sync"&&(f=!0,o.scheduler=(p,_)=>{_?p():wl(p)}),o.augmentJob=p=>{e&&(p.flags|=4),f&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const d=Wd(n,e,o);return Es&&(c?c.push(d):l&&d()),d}function Pp(n,e,t){const i=this.proxy,r=Ut(n)?n.includes(".")?lh(i,n):()=>i[n]:n.bind(i,i);let s;tt(e)?s=e:(s=e.handler,t=e);const a=ws(this),o=ah(r,s.bind(i),t);return a(),o}function lh(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const Lp=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Ei(e)}Modifiers`]||n[`${qi(e)}Modifiers`];function Dp(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||xt;let r=t;const s=e.startsWith("update:"),a=s&&Lp(i,e.slice(7));a&&(a.trim&&(r=t.map(u=>Ut(u)?u.trim():u)),a.number&&(r=t.map(ld)));let o,l=i[o=Jo(e)]||i[o=Jo(Ei(e))];!l&&s&&(l=i[o=Jo(qi(e))]),l&&Hn(l,n,6,r);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,Hn(c,n,6,r)}}function ch(n,e,t=!1){const i=e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let a={},o=!1;if(!tt(n)){const l=c=>{const u=ch(c,e,!0);u&&(o=!0,tn(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!o?(At(n)&&i.set(n,null),null):(Ke(s)?s.forEach(l=>a[l]=null):tn(a,s),At(n)&&i.set(n,a),a)}function Wo(n,e){return!n||!Fo(e)?!1:(e=e.slice(2).replace(/Once$/,""),ut(n,e[0].toLowerCase()+e.slice(1))||ut(n,qi(e))||ut(n,e))}function tc(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:d,setupState:p,ctx:_,inheritAttrs:v}=n,m=bo(n);let h,E;try{if(t.shapeFlag&4){const b=r||i,N=b;h=Nn(c.call(N,b,u,f,p,d,_)),E=o}else{const b=e;h=Nn(b.length>1?b(f,{attrs:o,slots:a,emit:l}):b(f,null)),E=e.props?o:Up(o)}}catch(b){ps.length=0,Go(b,n,1),h=on(Or)}let S=h;if(E&&v!==!1){const b=Object.keys(E),{shapeFlag:N}=S;b.length&&N&7&&(s&&b.some(pl)&&(E=Ip(E,s)),S=Br(S,E,!1,!0))}return t.dirs&&(S=Br(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(t.dirs):t.dirs),t.transition&&Cl(S,t.transition),h=S,bo(m),h}const Up=n=>{let e;for(const t in n)(t==="class"||t==="style"||Fo(t))&&((e||(e={}))[t]=n[t]);return e},Ip=(n,e)=>{const t={};for(const i in n)(!pl(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Np(n,e,t){const{props:i,children:r,component:s}=n,{props:a,children:o,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?nc(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(a[d]!==i[d]&&!Wo(c,d))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?nc(i,a,c):!0:!!a;return!1}function nc(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!Wo(t,s))return!0}return!1}function Fp({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const uh=n=>n.__isSuspense;function Op(n,e){e&&e.pendingBranch?Ke(n)?e.effects.push(...n):e.effects.push(n):Yd(n)}const Jt=Symbol.for("v-fgt"),Xo=Symbol.for("v-txt"),Or=Symbol.for("v-cmt"),_o=Symbol.for("v-stc"),ps=[];let dn=null;function Ln(n=!1){ps.push(dn=n?null:[])}function Bp(){ps.pop(),dn=ps[ps.length-1]||null}let Ss=1;function ic(n,e=!1){Ss+=n,n<0&&dn&&e&&(dn.hasOnce=!0)}function zp(n){return n.dynamicChildren=Ss>0?dn||Lr:null,Bp(),Ss>0&&dn&&dn.push(n),n}function Dn(n,e,t,i,r,s){return zp(at(n,e,t,i,r,s,!0))}function fh(n){return n?n.__v_isVNode===!0:!1}function Yr(n,e){return n.type===e.type&&n.key===e.key}const hh=({key:n})=>n??null,vo=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Ut(n)||qt(n)||tt(n)?{i:Bn,r:n,k:e,f:!!t}:n:null);function at(n,e=null,t=null,i=0,r=null,s=n===Jt?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&hh(e),ref:e&&vo(e),scopeId:Gf,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Bn};return o?(Ll(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Ut(t)?8:16),Ss>0&&!a&&dn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&dn.push(l),l}const on=Hp;function Hp(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===lp)&&(n=Or),fh(n)){const o=Br(n,e,!0);return t&&Ll(o,t),Ss>0&&!s&&dn&&(o.shapeFlag&6?dn[dn.indexOf(n)]=o:dn.push(o)),o.patchFlag=-2,o}if(Zp(n)&&(n=n.__vccOpts),e){e=Gp(e);let{class:o,style:l}=e;o&&!Ut(o)&&(e.class=vl(o)),At(l)&&(Al(l)&&!Ke(l)&&(l=tn({},l)),e.style=_l(l))}const a=Ut(n)?1:uh(n)?128:Zd(n)?64:At(n)?4:tt(n)?2:0;return at(n,e,t,i,r,a,s,!0)}function Gp(n){return n?Al(n)||Qf(n)?tn({},n):n:null}function Br(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=n,c=e?Vp(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&hh(c),ref:e&&e.ref?t&&s?Ke(s)?s.concat(vo(e)):[s,vo(e)]:vo(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Jt?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Br(n.ssContent),ssFallback:n.ssFallback&&Br(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Cl(u,l.clone(u)),u}function dh(n=" ",e=0){return on(Xo,null,n,e)}function ph(n,e){const t=on(_o,null,n);return t.staticCount=e,t}function Nn(n){return n==null||typeof n=="boolean"?on(Or):Ke(n)?on(Jt,null,n.slice()):fh(n)?di(n):on(Xo,null,String(n))}function di(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Br(n)}function Ll(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ke(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Ll(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Qf(e)?e._ctx=Bn:r===3&&Bn&&(Bn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else tt(e)?(e={default:e,_ctx:Bn},t=32):(e=String(e),i&64?(t=16,e=[dh(e)]):t=8);n.children=e,n.shapeFlag|=t}function Vp(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=vl([e.class,i.class]));else if(r==="style")e.style=_l([e.style,i.style]);else if(Fo(r)){const s=e[r],a=i[r];a&&s!==a&&!(Ke(s)&&s.includes(a))&&(e[r]=s?[].concat(s,a):a)}else r!==""&&(e[r]=i[r])}return e}function Un(n,e,t,i=null){Hn(n,e,7,[t,i])}const kp=$f();let Wp=0;function Xp(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||kp,s={uid:Wp++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new md(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:th(i,r),emitsOptions:ch(i,r),emit:null,emitted:null,propsDefaults:xt,inheritAttrs:i.inheritAttrs,ctx:xt,data:xt,props:xt,attrs:xt,slots:xt,refs:xt,setupState:xt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=Dp.bind(null,s),n.ce&&n.ce(s),s}let Qt=null;const qp=()=>Qt||Bn;let Ao,Ja;{const n=zo(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};Ao=e("__VUE_INSTANCE_SETTERS__",t=>Qt=t),Ja=e("__VUE_SSR_SETTERS__",t=>Es=t)}const ws=n=>{const e=Qt;return Ao(n),n.scope.on(),()=>{n.scope.off(),Ao(e)}},rc=()=>{Qt&&Qt.scope.off(),Ao(null)};function mh(n){return n.vnode.shapeFlag&4}let Es=!1;function jp(n,e=!1,t=!1){e&&Ja(e);const{props:i,children:r}=n.vnode,s=mh(n);vp(n,i,s,e),Sp(n,r,t||e);const a=s?Yp(n,e):void 0;return e&&Ja(!1),a}function Yp(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,cp);const{setup:i}=t;if(i){ti();const r=n.setupContext=i.length>1?$p(n):null,s=ws(n),a=As(i,n,0,[n.props,r]),o=pf(a);if(ni(),s(),(o||n.sp)&&!hs(n)&&Vf(n),o){if(a.then(rc,rc),e)return a.then(l=>{sc(n,l)}).catch(l=>{Go(l,n,0)});n.asyncDep=a}else sc(n,a)}else gh(n)}function sc(n,e,t){tt(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:At(e)&&(n.setupState=Ff(e)),gh(n)}function gh(n,e,t){const i=n.type;n.render||(n.render=i.render||zn);{const r=ws(n);ti();try{up(n)}finally{ni(),r()}}}const Kp={get(n,e){return Wt(n,"get",""),n[e]}};function $p(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Kp),slots:n.slots,emit:n.emit,expose:e}}function Dl(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Ff(Fd(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in ds)return ds[t](n)},has(e,t){return t in e||t in ds}})):n.proxy}function Zp(n){return tt(n)&&"__vccOpts"in n}const Jp=(n,e)=>Vd(n,e,Es),Qp="3.5.18";/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Qa;const oc=typeof window<"u"&&window.trustedTypes;if(oc)try{Qa=oc.createPolicy("vue",{createHTML:n=>n})}catch{}const _h=Qa?n=>Qa.createHTML(n):n=>n,em="http://www.w3.org/2000/svg",tm="http://www.w3.org/1998/Math/MathML",Kn=typeof document<"u"?document:null,ac=Kn&&Kn.createElement("template"),nm={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?Kn.createElementNS(em,n):e==="mathml"?Kn.createElementNS(tm,n):t?Kn.createElement(n,{is:t}):Kn.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>Kn.createTextNode(n),createComment:n=>Kn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Kn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const a=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{ac.innerHTML=_h(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=ac.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},im=Symbol("_vtc");function rm(n,e,t){const i=n[im];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const lc=Symbol("_vod"),sm=Symbol("_vsh"),om=Symbol(""),am=/(^|;)\s*display\s*:/;function lm(n,e,t){const i=n.style,r=Ut(t);let s=!1;if(t&&!r){if(e)if(Ut(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&xo(i,o,"")}else for(const a in e)t[a]==null&&xo(i,a,"");for(const a in t)a==="display"&&(s=!0),xo(i,a,t[a])}else if(r){if(e!==t){const a=i[om];a&&(t+=";"+a),i.cssText=t,s=am.test(t)}}else e&&n.removeAttribute("style");lc in n&&(n[lc]=s?i.display:"",n[sm]&&(i.display="none"))}const cc=/\s*!important$/;function xo(n,e,t){if(Ke(t))t.forEach(i=>xo(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=cm(n,e);cc.test(t)?n.setProperty(qi(i),t.replace(cc,""),"important"):n[i]=t}}const uc=["Webkit","Moz","ms"],aa={};function cm(n,e){const t=aa[e];if(t)return t;let i=Ei(e);if(i!=="filter"&&i in n)return aa[e]=i;i=_f(i);for(let r=0;r<uc.length;r++){const s=uc[r]+i;if(s in n)return aa[e]=s}return e}const fc="http://www.w3.org/1999/xlink";function hc(n,e,t,i,r,s=pd(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(fc,e.slice(6,e.length)):n.setAttributeNS(fc,e,t):t==null||s&&!vf(t)?n.removeAttribute(e):n.setAttribute(e,s?"":wi(t)?String(t):t)}function dc(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?_h(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=vf(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(r||e)}function um(n,e,t,i){n.addEventListener(e,t,i)}function fm(n,e,t,i){n.removeEventListener(e,t,i)}const pc=Symbol("_vei");function hm(n,e,t,i,r=null){const s=n[pc]||(n[pc]={}),a=s[e];if(i&&a)a.value=i;else{const[o,l]=dm(e);if(i){const c=s[e]=gm(i,r);um(n,o,c,l)}else a&&(fm(n,o,a,l),s[e]=void 0)}}const mc=/(?:Once|Passive|Capture)$/;function dm(n){let e;if(mc.test(n)){e={};let i;for(;i=n.match(mc);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):qi(n.slice(2)),e]}let la=0;const pm=Promise.resolve(),mm=()=>la||(pm.then(()=>la=0),la=Date.now());function gm(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Hn(_m(i,t.value),e,5,[i])};return t.value=n,t.attached=mm(),t}function _m(n,e){if(Ke(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const gc=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,vm=(n,e,t,i,r,s)=>{const a=r==="svg";e==="class"?rm(n,i,a):e==="style"?lm(n,t,i):Fo(e)?pl(e)||hm(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):xm(n,e,i,a))?(dc(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&hc(n,e,i,a,s,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Ut(i))?dc(n,Ei(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),hc(n,e,i,a))};function xm(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&gc(e)&&tt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return gc(e)&&Ut(t)?!1:e in n}const Mm=tn({patchProp:vm},nm);let _c;function ym(){return _c||(_c=bp(Mm))}const Sm=(...n)=>{const e=ym().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=bm(i);if(!r)return;const s=e._component;!tt(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=t(r,!1,Em(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e};function Em(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function bm(n){return Ut(n)?document.querySelector(n):n}const Tm={id:"right",class:"glass"},Am={class:"switch"},wm=["id","checked"],Cm={class:"micro-grid"},Rm=["data-jump"],Pm=["data-jump"],Lm=["data-jump"],Dm=["data-jump"],Um={__name:"ControlPanel",setup(n){const e=[["t-asteroid","小行星带",!0],["t-kuiper","柯伊伯带",!0],["t-orbits","轨道线",!0],["t-labels","天体标签",!0],["t-atmo","大气外壳",!0],["t-science","宜居带 / 黄道层",!1],["t-cinema","电影色彩分级",!0],["t-adaptive","自适应画质",!0]],t=[[-365,"−1年"],[-30,"−30日"],[30,"+30日"],[365,"+1年"]];return(i,r)=>(Ln(),Dn("aside",Tm,[r[3]||(r[3]=at("div",{class:"panel-title"},"SYSTEM CONTROL",-1)),(Ln(),Dn(Jt,null,ko(e,([s,a,o])=>at("div",{key:s,class:"toggle"},[dh(xn(a)+" ",1),at("label",Am,[at("input",{id:s,type:"checkbox",checked:o},null,8,wm),r[0]||(r[0]=at("i",null,null,-1))])])),64)),r[4]||(r[4]=ph('<div class="range-row"><header><span>时间倍率</span><output id="time-out">20×</output></header><input id="time-scale" type="range" min="0" max="1000" step="1" value="20"></div><button id="direction">公转方向 · 顺行</button><div class="range-row"><header><span>亮度 / Bloom</span><output id="bright-out">1.25</output></header><input id="brightness" type="range" min="0.3" max="2.5" step="0.05" value="1.25"></div><div class="range-row"><header><span>星空密度</span><output id="stars-out">100%</output></header><input id="star-density" type="range" min="15" max="100" step="1" value="100"></div><div class="section-rule"></div><div class="panel-title">CHRONO NAVIGATOR</div>',6)),at("div",Cm,[at("button",{"data-jump":t[0][0]},xn(t[0][1]),9,Rm),at("button",{"data-jump":t[1][0]},xn(t[1][1]),9,Pm),r[1]||(r[1]=at("button",{id:"pause"},"暂停",-1)),at("button",{"data-jump":t[2][0]},xn(t[2][1]),9,Lm),at("button",{"data-jump":t[3][0]},xn(t[3][1]),9,Dm),r[2]||(r[2]=at("button",{id:"today"},"归零",-1))]),r[5]||(r[5]=at("button",{id:"reset"},"重置史诗视角",-1))]))}},Im={id:"info",class:"glass"},Nm=["id"],Fm={__name:"InfoPanel",setup(n){const e=[["m-type","天体类型","行星系统"],["m-diameter","直径","—"],["m-axis","轨道半长轴","—"],["m-rotation","自转周期","—"],["m-orbit","公转周期","—"],["m-temp","表面温度","—"],["m-moons","已知卫星","—"]];return(t,i)=>(Ln(),Dn("aside",Im,[i[0]||(i[0]=at("div",{class:"eyebrow"},"CELESTIAL DATABASE",-1)),i[1]||(i[1]=at("h1",{id:"info-name"},"太阳系",-1)),i[2]||(i[2]=at("div",{id:"info-en"},"SOLAR SYSTEM",-1)),i[3]||(i[3]=at("div",{id:"info-desc"},"一座以实时轨道动力学驱动的程序化太阳系。双击任意天体进入近地观察。",-1)),(Ln(),Dn(Jt,null,ko(e,([r,s,a])=>at("div",{key:r,class:"metric"},[at("label",null,xn(s),1),at("b",{id:r},xn(a),9,Nm)])),64))]))}},Om="拖拽旋转 · 滚轮缩放 · 右键平移 · 单击查看 · 双击聚焦",Bm={__name:"TelemetryOverlay",setup(n){return(e,t)=>(Ln(),Dn(Jt,null,[t[0]||(t[0]=ph('<div id="science-hud" class="glass">选择天体以读取轨道遥测 · SHIFT+单击两颗天体可直接测距</div><div id="tour-card" class="glass"><b></b><span></span></div><div id="scale-ruler"><i></i><span>1 AU</span></div><div id="toast" class="glass"></div><div id="fps">FPS 60</div><div id="count">CELESTIAL OBJECTS 000</div>',6)),at("div",{id:"hint"},xn(Om))],64))}},zm={id:"tool-dock",class:"glass"},Hm=["id"],Gm={__name:"ToolDock",setup(n){const e=[["measure","测距"],["tour","自动导览"],["follow","锁定跟随"]];return(t,i)=>(Ln(),Dn("div",zm,[(Ln(),Dn(Jt,null,ko(e,([r,s])=>at("button",{id:r,key:r},xn(s),9,Hm)),64))]))}},Vm={id:"topbar",class:"glass"},km="2046 · 01 · 01  00:00:00 UTC",Wm={__name:"TopBar",setup(n){return(e,t)=>(Ln(),Dn("header",Vm,[t[0]||(t[0]=at("div",{class:"searchbox"},[at("input",{id:"search",autocomplete:"off",placeholder:"搜索天体 / Search"}),at("div",{id:"search-results",class:"glass"})],-1)),at("div",{id:"date"},xn(km))]))}},Xm={id:"presets",class:"glass","aria-label":"预设视角"},qm=["data-view"],jm={__name:"ViewPresets",setup(n){const e=[["overview","太阳系全景"],["inner","内太阳系"],["jupiter","木星系统"],["saturn","土星系统"],["pluto","冥王星特写"],["distant","远日天体"]];return(t,i)=>(Ln(),Dn("nav",Xm,[(Ln(),Dn(Jt,null,ko(e,([r,s])=>at("button",{key:r,"data-view":r},xn(s),9,qm)),64))]))}};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ul="160",ir={ROTATE:0,DOLLY:1,PAN:2},rr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ym=0,vc=1,Km=2,vh=1,$m=2,Yn=3,Ti=0,en=1,hn=2,Jn=0,Vi=1,rn=2,xc=3,Mc=4,Zm=5,Bi=100,Jm=101,Qm=102,yc=103,Sc=104,eg=200,tg=201,ng=202,ig=203,el=204,tl=205,rg=206,sg=207,og=208,ag=209,lg=210,cg=211,ug=212,fg=213,hg=214,dg=0,pg=1,mg=2,wo=3,gg=4,_g=5,vg=6,xg=7,xh=0,Mg=1,yg=2,yi=0,Sg=1,Eg=2,bg=3,Mh=4,Tg=5,Ag=6,yh=300,zr=301,Hr=302,nl=303,il=304,qo=306,rl=1e3,wn=1001,sl=1002,$t=1003,Ec=1004,ca=1005,_n=1006,wg=1007,bs=1008,Si=1009,Cg=1010,Rg=1011,Il=1012,Sh=1013,_i=1014,vi=1015,Qn=1016,Eh=1017,bh=1018,ki=1020,Pg=1021,Cn=1023,Lg=1024,Dg=1025,Wi=1026,Gr=1027,Ug=1028,Th=1029,Ig=1030,Ah=1031,wh=1033,ua=33776,fa=33777,ha=33778,da=33779,bc=35840,Tc=35841,Ac=35842,wc=35843,Ch=36196,Cc=37492,Rc=37496,Pc=37808,Lc=37809,Dc=37810,Uc=37811,Ic=37812,Nc=37813,Fc=37814,Oc=37815,Bc=37816,zc=37817,Hc=37818,Gc=37819,Vc=37820,kc=37821,pa=36492,Wc=36494,Xc=36495,Ng=36283,qc=36284,jc=36285,Yc=36286,Rh=3e3,Xi=3001,Fg=3200,Og=3201,Ph=0,Bg=1,Mn="",zt="srgb",ii="srgb-linear",Nl="display-p3",jo="display-p3-linear",Co="linear",yt="srgb",Ro="rec709",Po="p3",sr=7680,Kc=519,zg=512,Hg=513,Gg=514,Lh=515,Vg=516,kg=517,Wg=518,Xg=519,ol=35044,$c="300 es",al=1035,Zn=2e3,Lo=2001;class ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zc=1234567;const ms=Math.PI/180,Ts=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function Xt(n,e,t){return Math.max(e,Math.min(t,n))}function Fl(n,e){return(n%e+e)%e}function qg(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function jg(n,e,t){return n!==e?(t-n)/(e-n):0}function gs(n,e,t){return(1-t)*n+t*e}function Yg(n,e,t,i){return gs(n,e,1-Math.exp(-t*i))}function Kg(n,e=1){return e-Math.abs(Fl(n,e*2)-e)}function $g(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Zg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Jg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Qg(n,e){return n+Math.random()*(e-n)}function e_(n){return n*(.5-Math.random())}function t_(n){n!==void 0&&(Zc=n);let e=Zc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function n_(n){return n*ms}function i_(n){return n*Ts}function ll(n){return(n&n-1)===0&&n!==0}function r_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Do(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function s_(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),u=a((e+i)/2),f=s((e-i)/2),d=a((e-i)/2),p=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*u,l*f,l*d,o*c);break;case"YZY":n.set(l*d,o*u,l*f,o*c);break;case"ZXZ":n.set(l*f,l*d,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function On(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ht(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Cr={DEG2RAD:ms,RAD2DEG:Ts,generateUUID:ei,clamp:Xt,euclideanModulo:Fl,mapLinear:qg,inverseLerp:jg,lerp:gs,damp:Yg,pingpong:Kg,smoothstep:$g,smootherstep:Zg,randInt:Jg,randFloat:Qg,randFloatSpread:e_,seededRandom:t_,degToRad:n_,radToDeg:i_,isPowerOfTwo:ll,ceilPowerOfTwo:r_,floorPowerOfTwo:Do,setQuaternionFromProperEuler:s_,normalize:ht,denormalize:On};class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,i,r,s,a,o,l,c){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],p=i[5],_=i[8],v=r[0],m=r[3],h=r[6],E=r[1],S=r[4],b=r[7],N=r[2],D=r[5],R=r[8];return s[0]=a*v+o*E+l*N,s[3]=a*m+o*S+l*D,s[6]=a*h+o*b+l*R,s[1]=c*v+u*E+f*N,s[4]=c*m+u*S+f*D,s[7]=c*h+u*b+f*R,s[2]=d*v+p*E+_*N,s[5]=d*m+p*S+_*D,s[8]=d*h+p*b+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,p=c*s-a*l,_=t*f+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=f*v,e[1]=(r*c-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=d*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ma.makeScale(e,t)),this}rotate(e){return this.premultiply(ma.makeRotation(-e)),this}translate(e,t){return this.premultiply(ma.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new nt;function Dh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Uo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function o_(){const n=Uo("canvas");return n.style.display="block",n}const Jc={};function _s(n){n in Jc||(Jc[n]=!0,console.warn(n))}const Qc=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),eu=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),zs={[ii]:{transfer:Co,primaries:Ro,toReference:n=>n,fromReference:n=>n},[zt]:{transfer:yt,primaries:Ro,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[jo]:{transfer:Co,primaries:Po,toReference:n=>n.applyMatrix3(eu),fromReference:n=>n.applyMatrix3(Qc)},[Nl]:{transfer:yt,primaries:Po,toReference:n=>n.convertSRGBToLinear().applyMatrix3(eu),fromReference:n=>n.applyMatrix3(Qc).convertLinearToSRGB()}},a_=new Set([ii,jo]),dt={enabled:!0,_workingColorSpace:ii,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!a_.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=zs[e].toReference,r=zs[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return zs[n].primaries},getTransfer:function(n){return n===Mn?Co:zs[n].transfer}};function Fr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ga(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let or;class Uh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{or===void 0&&(or=Uo("canvas")),or.width=e.width,or.height=e.height;const i=or.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=or}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Uo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Fr(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Fr(t[i]/255)*255):t[i]=Fr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let l_=0;class Ih{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=ei(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(_a(r[a].image)):s.push(_a(r[a]))}else s=_a(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function _a(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Uh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let c_=0;class an extends ji{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,i=wn,r=wn,s=_n,a=bs,o=Cn,l=Si,c=an.DEFAULT_ANISOTROPY,u=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:c_++}),this.uuid=ei(),this.name="",this.source=new Ih(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(_s("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Xi?zt:Mn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rl:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case sl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rl:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case sl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return _s("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===zt?Xi:Rh}set encoding(e){_s("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Xi?zt:Mn}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=yh;an.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,r=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],_=l[9],v=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,b=(p+1)/2,N=(h+1)/2,D=(u+d)/4,R=(f+v)/4,j=(_+m)/4;return S>b&&S>N?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=D/i,s=R/i):b>N?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=D/r,s=j/r):N<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(N),i=R/s,r=j/s),this.set(i,r,s,t),this}let E=Math.sqrt((m-_)*(m-_)+(f-v)*(f-v)+(d-u)*(d-u));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(f-v)/E,this.z=(d-u)/E,this.w=Math.acos((c+p+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class u_ extends ji{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(_s("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Xi?zt:Mn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new an(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ih(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends u_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Nh extends an{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class f_ extends an{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ai{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const d=s[a+0],p=s[a+1],_=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=_,e[t+3]=v;return}if(f!==v||l!==d||c!==p||u!==_){let m=1-o;const h=l*d+c*p+u*_+f*v,E=h>=0?1:-1,S=1-h*h;if(S>Number.EPSILON){const N=Math.sqrt(S),D=Math.atan2(N,h*E);m=Math.sin(m*D)/N,o=Math.sin(o*D)/N}const b=o*E;if(l=l*m+d*b,c=c*m+p*b,u=u*m+_*b,f=f*m+v*b,m===1-o){const N=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=N,c*=N,u*=N,f*=N}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],d=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+u*f+l*p-c*d,e[t+1]=l*_+u*d+c*f-o*p,e[t+2]=c*_+u*p+o*d-l*f,e[t+3]=u*_-o*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),d=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*p*_,this._y=c*p*f-d*u*_,this._z=c*u*_+d*p*f,this._w=c*u*f-d*p*_;break;case"YXZ":this._x=d*u*f+c*p*_,this._y=c*p*f-d*u*_,this._z=c*u*_-d*p*f,this._w=c*u*f+d*p*_;break;case"ZXY":this._x=d*u*f-c*p*_,this._y=c*p*f+d*u*_,this._z=c*u*_+d*p*f,this._w=c*u*f-d*p*_;break;case"ZYX":this._x=d*u*f-c*p*_,this._y=c*p*f+d*u*_,this._z=c*u*_-d*p*f,this._w=c*u*f+d*p*_;break;case"YZX":this._x=d*u*f+c*p*_,this._y=c*p*f+d*u*_,this._z=c*u*_-d*p*f,this._w=c*u*f-d*p*_;break;case"XZY":this._x=d*u*f-c*p*_,this._y=c*p*f-d*u*_,this._z=c*u*_+d*p*f,this._w=c*u*f+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return va.copy(this).projectOnVector(e),this.sub(va)}reflect(e){return this.sub(va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new U,tu=new Ai;class Yi{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(s,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Hs.copy(i.boundingBox)),Hs.applyMatrix4(e.matrixWorld),this.union(Hs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Kr),Gs.subVectors(this.max,Kr),ar.subVectors(e.a,Kr),lr.subVectors(e.b,Kr),cr.subVectors(e.c,Kr),ai.subVectors(lr,ar),li.subVectors(cr,lr),Di.subVectors(ar,cr);let t=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Di.z,Di.y,ai.z,0,-ai.x,li.z,0,-li.x,Di.z,0,-Di.x,-ai.y,ai.x,0,-li.y,li.x,0,-Di.y,Di.x,0];return!xa(t,ar,lr,cr,Gs)||(t=[1,0,0,0,1,0,0,0,1],!xa(t,ar,lr,cr,Gs))?!1:(Vs.crossVectors(ai,li),t=[Vs.x,Vs.y,Vs.z],xa(t,ar,lr,cr,Gs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new U,new U,new U,new U,new U,new U,new U,new U],bn=new U,Hs=new Yi,ar=new U,lr=new U,cr=new U,ai=new U,li=new U,Di=new U,Kr=new U,Gs=new U,Vs=new U,Ui=new U;function xa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Ui.fromArray(n,s);const o=r.x*Math.abs(Ui.x)+r.y*Math.abs(Ui.y)+r.z*Math.abs(Ui.z),l=e.dot(Ui),c=t.dot(Ui),u=i.dot(Ui);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const h_=new Yi,$r=new U,Ma=new U;class Ki{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):h_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$r.subVectors(e,this.center);const t=$r.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector($r,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($r.copy(e.center).add(Ma)),this.expandByPoint($r.copy(e.center).sub(Ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Wn=new U,ya=new U,ks=new U,ci=new U,Sa=new U,Ws=new U,Ea=new U;class Cs{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ya.copy(e).add(t).multiplyScalar(.5),ks.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(ya);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ks),o=ci.dot(this.direction),l=-ci.dot(ks),c=ci.lengthSq(),u=Math.abs(1-a*a);let f,d,p,_;if(u>0)if(f=a*l-o,d=a*o-l,_=s*u,f>=0)if(d>=-_)if(d<=_){const v=1/u;f*=v,d*=v,p=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c):d<=_?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ya).addScaledVector(ks,d),p}intersectSphere(e,t){Wn.subVectors(e.center,this.origin);const i=Wn.dot(this.direction),r=Wn.dot(Wn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,i,r,s){Sa.subVectors(t,e),Ws.subVectors(i,e),Ea.crossVectors(Sa,Ws);let a=this.direction.dot(Ea),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ci.subVectors(this.origin,e);const l=o*this.direction.dot(Ws.crossVectors(ci,Ws));if(l<0)return null;const c=o*this.direction.dot(Sa.cross(ci));if(c<0||l+c>a)return null;const u=-o*ci.dot(Ea);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,t,i,r,s,a,o,l,c,u,f,d,p,_,v,m){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,d,p,_,v,m)}set(e,t,i,r,s,a,o,l,c,u,f,d,p,_,v,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=_,h[11]=v,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ur.setFromMatrixColumn(e,0).length(),s=1/ur.setFromMatrixColumn(e,1).length(),a=1/ur.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*f,_=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+_*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*f,_=c*u,v=c*f;t[0]=d+v*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*f,_=c*u,v=c*f;t[0]=d-v*o,t[4]=-a*f,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*f,_=o*u,v=o*f;t[0]=l*u,t[4]=_*c-p,t[8]=d*c+v,t[1]=l*f,t[5]=v*c+d,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=v-d*f,t[8]=_*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+_,t[10]=d-v*f}else if(e.order==="XZY"){const d=a*l,p=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+v,t[5]=a*u,t[9]=p*f-_,t[2]=_*f-p,t[6]=o*u,t[10]=v*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(d_,e,p_)}lookAt(e,t,i){const r=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),ui.crossVectors(i,ln),ui.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),ui.crossVectors(i,ln)),ui.normalize(),Xs.crossVectors(ln,ui),r[0]=ui.x,r[4]=Xs.x,r[8]=ln.x,r[1]=ui.y,r[5]=Xs.y,r[9]=ln.y,r[2]=ui.z,r[6]=Xs.z,r[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],p=i[13],_=i[2],v=i[6],m=i[10],h=i[14],E=i[3],S=i[7],b=i[11],N=i[15],D=r[0],R=r[4],j=r[8],T=r[12],w=r[1],K=r[5],re=r[9],xe=r[13],B=r[2],X=r[6],J=r[10],ne=r[14],Q=r[3],ae=r[7],fe=r[11],_e=r[15];return s[0]=a*D+o*w+l*B+c*Q,s[4]=a*R+o*K+l*X+c*ae,s[8]=a*j+o*re+l*J+c*fe,s[12]=a*T+o*xe+l*ne+c*_e,s[1]=u*D+f*w+d*B+p*Q,s[5]=u*R+f*K+d*X+p*ae,s[9]=u*j+f*re+d*J+p*fe,s[13]=u*T+f*xe+d*ne+p*_e,s[2]=_*D+v*w+m*B+h*Q,s[6]=_*R+v*K+m*X+h*ae,s[10]=_*j+v*re+m*J+h*fe,s[14]=_*T+v*xe+m*ne+h*_e,s[3]=E*D+S*w+b*B+N*Q,s[7]=E*R+S*K+b*X+N*ae,s[11]=E*j+S*re+b*J+N*fe,s[15]=E*T+S*xe+b*ne+N*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],p=e[14],_=e[3],v=e[7],m=e[11],h=e[15];return _*(+s*l*f-r*c*f-s*o*d+i*c*d+r*o*p-i*l*p)+v*(+t*l*p-t*c*d+s*a*d-r*a*p+r*c*u-s*l*u)+m*(+t*c*f-t*o*p-s*a*f+i*a*p+s*o*u-i*c*u)+h*(-r*o*u-t*l*f+t*o*d+r*a*f-i*a*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],p=e[11],_=e[12],v=e[13],m=e[14],h=e[15],E=f*m*c-v*d*c+v*l*p-o*m*p-f*l*h+o*d*h,S=_*d*c-u*m*c-_*l*p+a*m*p+u*l*h-a*d*h,b=u*v*c-_*f*c+_*o*p-a*v*p-u*o*h+a*f*h,N=_*f*l-u*v*l-_*o*d+a*v*d+u*o*m-a*f*m,D=t*E+i*S+r*b+s*N;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/D;return e[0]=E*R,e[1]=(v*d*s-f*m*s-v*r*p+i*m*p+f*r*h-i*d*h)*R,e[2]=(o*m*s-v*l*s+v*r*c-i*m*c-o*r*h+i*l*h)*R,e[3]=(f*l*s-o*d*s-f*r*c+i*d*c+o*r*p-i*l*p)*R,e[4]=S*R,e[5]=(u*m*s-_*d*s+_*r*p-t*m*p-u*r*h+t*d*h)*R,e[6]=(_*l*s-a*m*s-_*r*c+t*m*c+a*r*h-t*l*h)*R,e[7]=(a*d*s-u*l*s+u*r*c-t*d*c-a*r*p+t*l*p)*R,e[8]=b*R,e[9]=(_*f*s-u*v*s-_*i*p+t*v*p+u*i*h-t*f*h)*R,e[10]=(a*v*s-_*o*s+_*i*c-t*v*c-a*i*h+t*o*h)*R,e[11]=(u*o*s-a*f*s-u*i*c+t*f*c+a*i*p-t*o*p)*R,e[12]=N*R,e[13]=(u*v*r-_*f*r+_*i*d-t*v*d-u*i*m+t*f*m)*R,e[14]=(_*o*r-a*v*r-_*i*l+t*v*l+a*i*m-t*o*m)*R,e[15]=(a*f*r-u*o*r+u*i*l-t*f*l-a*i*d+t*o*d)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,p=s*u,_=s*f,v=a*u,m=a*f,h=o*f,E=l*c,S=l*u,b=l*f,N=i.x,D=i.y,R=i.z;return r[0]=(1-(v+h))*N,r[1]=(p+b)*N,r[2]=(_-S)*N,r[3]=0,r[4]=(p-b)*D,r[5]=(1-(d+h))*D,r[6]=(m+E)*D,r[7]=0,r[8]=(_+S)*R,r[9]=(m-E)*R,r[10]=(1-(d+v))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ur.set(r[0],r[1],r[2]).length();const a=ur.set(r[4],r[5],r[6]).length(),o=ur.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Tn.copy(this);const c=1/s,u=1/a,f=1/o;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=f,Tn.elements[9]*=f,Tn.elements[10]*=f,t.setFromRotationMatrix(Tn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Zn){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let p,_;if(o===Zn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Lo)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Zn){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(a-s),d=(t+e)*c,p=(i+r)*u;let _,v;if(o===Zn)_=(a+s)*f,v=-2*f;else if(o===Lo)_=s*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ur=new U,Tn=new pt,d_=new U(0,0,0),p_=new U(1,1,1),ui=new U,Xs=new U,ln=new U,nu=new pt,iu=new Ai;class Yo{constructor(e=0,t=0,i=0,r=Yo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return nu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return iu.setFromEuler(this),this.setFromQuaternion(iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yo.DEFAULT_ORDER="XYZ";class Ol{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let m_=0;const ru=new U,fr=new Ai,Xn=new pt,qs=new U,Zr=new U,g_=new U,__=new Ai,su=new U(1,0,0),ou=new U(0,1,0),au=new U(0,0,1),v_={type:"added"},x_={type:"removed"};class Nt extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:m_++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new U,t=new Yo,i=new Ai,r=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new nt}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ol,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.multiply(fr),this}rotateOnWorldAxis(e,t){return fr.setFromAxisAngle(e,t),this.quaternion.premultiply(fr),this}rotateX(e){return this.rotateOnAxis(su,e)}rotateY(e){return this.rotateOnAxis(ou,e)}rotateZ(e){return this.rotateOnAxis(au,e)}translateOnAxis(e,t){return ru.copy(e).applyQuaternion(this.quaternion),this.position.add(ru.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(su,e)}translateY(e){return this.translateOnAxis(ou,e)}translateZ(e){return this.translateOnAxis(au,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qs.copy(e):qs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Zr,qs,this.up):Xn.lookAt(qs,Zr,this.up),this.quaternion.setFromRotationMatrix(Xn),r&&(Xn.extractRotation(r.matrixWorld),fr.setFromRotationMatrix(Xn),this.quaternion.premultiply(fr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(v_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(x_)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,e,g_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,__,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Nt.DEFAULT_UP=new U(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new U,qn=new U,ba=new U,jn=new U,hr=new U,dr=new U,lu=new U,Ta=new U,Aa=new U,wa=new U;let js=!1;class vn{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),An.subVectors(e,t),r.cross(An);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){An.subVectors(r,t),qn.subVectors(i,t),ba.subVectors(e,t);const a=An.dot(An),o=An.dot(qn),l=An.dot(ba),c=qn.dot(qn),u=qn.dot(ba),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(c*l-o*u)*d,_=(a*u-o*l)*d;return s.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getUV(e,t,i,r,s,a,o,l){return js===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),js=!0),this.getInterpolation(e,t,i,r,s,a,o,l)}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,jn.x),l.addScaledVector(a,jn.y),l.addScaledVector(o,jn.z),l)}static isFrontFacing(e,t,i,r){return An.subVectors(i,t),qn.subVectors(e,t),An.cross(qn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),An.cross(qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return js===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),js=!0),vn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return vn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;hr.subVectors(r,i),dr.subVectors(s,i),Ta.subVectors(e,i);const l=hr.dot(Ta),c=dr.dot(Ta);if(l<=0&&c<=0)return t.copy(i);Aa.subVectors(e,r);const u=hr.dot(Aa),f=dr.dot(Aa);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(hr,a);wa.subVectors(e,s);const p=hr.dot(wa),_=dr.dot(wa);if(_>=0&&p<=_)return t.copy(s);const v=p*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(dr,o);const m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return lu.subVectors(s,r),o=(f-u)/(f-u+(p-_)),t.copy(r).addScaledVector(lu,o);const h=1/(m+v+d);return a=v*h,o=d*h,t.copy(i).addScaledVector(hr,a).addScaledVector(dr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function Ca(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=dt.workingColorSpace){if(e=Fl(e,1),t=Xt(t,0,1),i=Xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Ca(a,s,e+1/3),this.g=Ca(a,s,e),this.b=Ca(a,s,e-1/3)}return dt.toWorkingColorSpace(this,r),this}setStyle(e,t=zt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const i=Fh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fr(e.r),this.g=Fr(e.g),this.b=Fr(e.b),this}copyLinearToSRGB(e){return this.r=ga(e.r),this.g=ga(e.g),this.b=ga(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return dt.fromWorkingColorSpace(kt.copy(this),e),Math.round(Xt(kt.r*255,0,255))*65536+Math.round(Xt(kt.g*255,0,255))*256+Math.round(Xt(kt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(kt.copy(this),t);const i=kt.r,r=kt.g,s=kt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=zt){dt.fromWorkingColorSpace(kt.copy(this),e);const t=kt.r,i=kt.g,r=kt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(Ys);const i=gs(fi.h,Ys.h,t),r=gs(fi.s,Ys.s,t),s=gs(fi.l,Ys.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new Ye;Ye.NAMES=Fh;let M_=0;class Ci extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:M_++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Vi,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=tl,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=wo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(i.blending=this.blending),this.side!==Ti&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==el&&(i.blendSrc=this.blendSrc),this.blendDst!==tl&&(i.blendDst=this.blendDst),this.blendEquation!==Bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Hi extends Ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=xh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new U,Ks=new De;class Ct{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ol,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ks.fromBufferAttribute(this,t),Ks.applyMatrix3(e),this.setXY(t,Ks.x,Ks.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=On(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=On(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=On(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=On(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=On(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),r=ht(r,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ol&&(e.usage=this.usage),e}}class Oh extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Bh extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Mt extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}}let y_=0;const gn=new pt,Ra=new Nt,pr=new U,cn=new Yi,Jr=new Yi,Bt=new U;class St extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:y_++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dh(e)?Bh:Oh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new nt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,i){return gn.makeTranslation(e,t,i),this.applyMatrix4(gn),this}scale(e,t,i){return gn.makeScale(e,t,i),this.applyMatrix4(gn),this}lookAt(e){return Ra.lookAt(e),Ra.updateMatrix(),this.applyMatrix4(Ra.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Mt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Jr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(cn.min,Jr.min),cn.expandByPoint(Bt),Bt.addVectors(cn.max,Jr.max),cn.expandByPoint(Bt)):(cn.expandByPoint(Jr.min),cn.expandByPoint(Jr.max))}cn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Bt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Bt.fromBufferAttribute(o,c),l&&(pr.fromBufferAttribute(e,c),Bt.add(pr)),r=Math.max(r,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<o;w++)c[w]=new U,u[w]=new U;const f=new U,d=new U,p=new U,_=new De,v=new De,m=new De,h=new U,E=new U;function S(w,K,re){f.fromArray(r,w*3),d.fromArray(r,K*3),p.fromArray(r,re*3),_.fromArray(a,w*2),v.fromArray(a,K*2),m.fromArray(a,re*2),d.sub(f),p.sub(f),v.sub(_),m.sub(_);const xe=1/(v.x*m.y-m.x*v.y);isFinite(xe)&&(h.copy(d).multiplyScalar(m.y).addScaledVector(p,-v.y).multiplyScalar(xe),E.copy(p).multiplyScalar(v.x).addScaledVector(d,-m.x).multiplyScalar(xe),c[w].add(h),c[K].add(h),c[re].add(h),u[w].add(E),u[K].add(E),u[re].add(E))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let w=0,K=b.length;w<K;++w){const re=b[w],xe=re.start,B=re.count;for(let X=xe,J=xe+B;X<J;X+=3)S(i[X+0],i[X+1],i[X+2])}const N=new U,D=new U,R=new U,j=new U;function T(w){R.fromArray(s,w*3),j.copy(R);const K=c[w];N.copy(K),N.sub(R.multiplyScalar(R.dot(K))).normalize(),D.crossVectors(j,K);const xe=D.dot(u[w])<0?-1:1;l[w*4]=N.x,l[w*4+1]=N.y,l[w*4+2]=N.z,l[w*4+3]=xe}for(let w=0,K=b.length;w<K;++w){const re=b[w],xe=re.start,B=re.count;for(let X=xe,J=xe+B;X<J;X+=3)T(i[X+0]),T(i[X+1]),T(i[X+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,l=new U,c=new U,u=new U,f=new U;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let p=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let h=0;h<u;h++)d[_++]=c[p++]}return new Ct(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cu=new pt,Ii=new Cs,$s=new Ki,uu=new U,mr=new U,gr=new U,_r=new U,Pa=new U,Zs=new U,Js=new De,Qs=new De,eo=new De,fu=new U,hu=new U,du=new U,to=new U,no=new U;class wt extends Nt{constructor(e=new St,t=new Hi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Zs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Pa.fromBufferAttribute(f,e),a?Zs.addScaledVector(Pa,u):Zs.addScaledVector(Pa.sub(t),u))}t.add(Zs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$s.copy(i.boundingSphere),$s.applyMatrix4(s),Ii.copy(e.ray).recast(e.near),!($s.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere($s,uu)===null||Ii.origin.distanceToSquared(uu)>(e.far-e.near)**2))&&(cu.copy(s).invert(),Ii.copy(e.ray).applyMatrix4(cu),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],h=a[m.materialIndex],E=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=E,N=S;b<N;b+=3){const D=o.getX(b),R=o.getX(b+1),j=o.getX(b+2);r=io(this,h,e,i,c,u,f,D,R,j),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=_,h=v;m<h;m+=3){const E=o.getX(m),S=o.getX(m+1),b=o.getX(m+2);r=io(this,a,e,i,c,u,f,E,S,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],h=a[m.materialIndex],E=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=E,N=S;b<N;b+=3){const D=b,R=b+1,j=b+2;r=io(this,h,e,i,c,u,f,D,R,j),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=_,h=v;m<h;m+=3){const E=m,S=m+1,b=m+2;r=io(this,a,e,i,c,u,f,E,S,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function S_(n,e,t,i,r,s,a,o){let l;if(e.side===en?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Ti,o),l===null)return null;no.copy(o),no.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(no);return c<t.near||c>t.far?null:{distance:c,point:no.clone(),object:n}}function io(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,mr),n.getVertexPosition(l,gr),n.getVertexPosition(c,_r);const u=S_(n,e,t,i,mr,gr,_r,to);if(u){r&&(Js.fromBufferAttribute(r,o),Qs.fromBufferAttribute(r,l),eo.fromBufferAttribute(r,c),u.uv=vn.getInterpolation(to,mr,gr,_r,Js,Qs,eo,new De)),s&&(Js.fromBufferAttribute(s,o),Qs.fromBufferAttribute(s,l),eo.fromBufferAttribute(s,c),u.uv1=vn.getInterpolation(to,mr,gr,_r,Js,Qs,eo,new De),u.uv2=u.uv1),a&&(fu.fromBufferAttribute(a,o),hu.fromBufferAttribute(a,l),du.fromBufferAttribute(a,c),u.normal=vn.getInterpolation(to,mr,gr,_r,fu,hu,du,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new U,materialIndex:0};vn.getNormal(mr,gr,_r,f.normal),u.face=f}return u}class Rs extends St{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,p=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(f,2));function _(v,m,h,E,S,b,N,D,R,j,T){const w=b/R,K=N/j,re=b/2,xe=N/2,B=D/2,X=R+1,J=j+1;let ne=0,Q=0;const ae=new U;for(let fe=0;fe<J;fe++){const _e=fe*K-xe;for(let ge=0;ge<X;ge++){const te=ge*w-re;ae[v]=te*E,ae[m]=_e*S,ae[h]=B,c.push(ae.x,ae.y,ae.z),ae[v]=0,ae[m]=0,ae[h]=D>0?1:-1,u.push(ae.x,ae.y,ae.z),f.push(ge/R),f.push(1-fe/j),ne+=1}}for(let fe=0;fe<j;fe++)for(let _e=0;_e<R;_e++){const ge=d+_e+X*fe,te=d+_e+X*(fe+1),de=d+(_e+1)+X*(fe+1),Ce=d+(_e+1)+X*fe;l.push(ge,te,Ce),l.push(te,de,Ce),Q+=6}o.addGroup(p,Q,T),p+=Q,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=Vr(n[t]);for(const r in i)e[r]=i[r]}return e}function E_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function zh(n){return n.getRenderTarget()===null?n.outputColorSpace:dt.workingColorSpace}const Io={clone:Vr,merge:Kt};var b_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rt extends Ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=b_,this.fragmentShader=T_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vr(e.uniforms),this.uniformsGroups=E_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Hh extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class fn extends Hh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ts*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ms*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vr=-90,xr=1;class A_ extends Nt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new fn(vr,xr,e,t);r.layers=this.layers,this.add(r);const s=new fn(vr,xr,e,t);s.layers=this.layers,this.add(s);const a=new fn(vr,xr,e,t);a.layers=this.layers,this.add(a);const o=new fn(vr,xr,e,t);o.layers=this.layers,this.add(o);const l=new fn(vr,xr,e,t);l.layers=this.layers,this.add(l);const c=new fn(vr,xr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Gh extends an{constructor(e,t,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:zr,super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class w_ extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(_s("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Xi?zt:Mn),this.texture=new Gh(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:_n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Rs(5,5,5),s=new Rt({name:"CubemapFromEquirect",uniforms:Vr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:Jn});s.uniforms.tEquirect.value=t;const a=new wt(r,s),o=t.minFilter;return t.minFilter===bs&&(t.minFilter=_n),new A_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const La=new U,C_=new U,R_=new nt;class pi{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=La.subVectors(i,t).cross(C_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(La),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||R_.getNormalMatrix(e),r=this.coplanarPoint(La).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new Ki,ro=new U;class Bl{constructor(e=new pi,t=new pi,i=new pi,r=new pi,s=new pi,a=new pi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Zn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],d=r[7],p=r[8],_=r[9],v=r[10],m=r[11],h=r[12],E=r[13],S=r[14],b=r[15];if(i[0].setComponents(l-s,d-c,m-p,b-h).normalize(),i[1].setComponents(l+s,d+c,m+p,b+h).normalize(),i[2].setComponents(l+a,d+u,m+_,b+E).normalize(),i[3].setComponents(l-a,d-u,m-_,b-E).normalize(),i[4].setComponents(l-o,d-f,m-v,b-S).normalize(),t===Zn)i[5].setComponents(l+o,d+f,m+v,b+S).normalize();else if(t===Lo)i[5].setComponents(o,f,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ro.x=r.normal.x>0?e.max.x:e.min.x,ro.y=r.normal.y>0?e.max.y:e.min.y,ro.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ro)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Vh(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function P_(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,d=c.usage,p=f.byteLength,_=n.createBuffer();n.bindBuffer(u,_),n.bufferData(u,f,d),c.onUploadCallback();let v;if(f instanceof Float32Array)v=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)v=n.SHORT;else if(f instanceof Uint32Array)v=n.UNSIGNED_INT;else if(f instanceof Int32Array)v=n.INT;else if(f instanceof Int8Array)v=n.BYTE;else if(f instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:v,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,f){const d=u.array,p=u._updateRange,_=u.updateRanges;if(n.bindBuffer(f,c),p.count===-1&&_.length===0&&n.bufferSubData(f,0,d),_.length!==0){for(let v=0,m=_.length;v<m;v++){const h=_[v];t?n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d,h.start,h.count):n.bufferSubData(f,h.start*d.BYTES_PER_ELEMENT,d.subarray(h.start,h.start+h.count))}u.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):n.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:a,remove:o,update:l}}class zl extends St{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,p=[],_=[],v=[],m=[];for(let h=0;h<u;h++){const E=h*d-a;for(let S=0;S<c;S++){const b=S*f-s;_.push(b,-E,0),v.push(0,0,1),m.push(S/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let E=0;E<o;E++){const S=E+c*h,b=E+c*(h+1),N=E+1+c*(h+1),D=E+1+c*h;p.push(S,b,D),p.push(b,N,D)}this.setIndex(p),this.setAttribute("position",new Mt(_,3)),this.setAttribute("normal",new Mt(v,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.width,e.height,e.widthSegments,e.heightSegments)}}var L_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,D_=`#ifdef USE_ALPHAHASH
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
#endif`,U_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,I_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,F_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,O_=`#ifdef USE_AOMAP
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
#endif`,B_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,z_=`#ifdef USE_BATCHING
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
#endif`,H_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,G_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,V_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,k_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,W_=`#ifdef USE_IRIDESCENCE
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
#endif`,X_=`#ifdef USE_BUMPMAP
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
#endif`,q_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,j_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Y_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,K_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Z_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,J_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Q_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,e0=`#define PI 3.141592653589793
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
} // validated`,t0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,n0=`vec3 transformedNormal = objectNormal;
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
#endif`,i0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,r0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,s0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,a0="gl_FragColor = linearToOutputTexel( gl_FragColor );",l0=`
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
}`,c0=`#ifdef USE_ENVMAP
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
#endif`,u0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,f0=`#ifdef USE_ENVMAP
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
#endif`,h0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,d0=`#ifdef USE_ENVMAP
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
#endif`,p0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,m0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,g0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,v0=`#ifdef USE_GRADIENTMAP
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
}`,x0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,M0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,y0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,E0=`uniform bool receiveShadow;
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
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,T0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,w0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,R0=`PhysicalMaterial material;
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
#endif`,P0=`struct PhysicalMaterial {
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
}`,L0=`
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
#endif`,D0=`#if defined( RE_IndirectDiffuse )
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
#endif`,U0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,N0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,O0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,B0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,H0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,G0=`#if defined( USE_POINTS_UV )
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
#endif`,V0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,k0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,W0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,X0=`#ifdef USE_MORPHNORMALS
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
#endif`,q0=`#ifdef USE_MORPHTARGETS
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
#endif`,j0=`#ifdef USE_MORPHTARGETS
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
#endif`,Y0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,K0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Q0=`#ifdef USE_NORMALMAP
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
#endif`,ev=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ov=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,av=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mv=`float getShadowMask() {
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
}`,gv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_v=`#ifdef USE_SKINNING
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
#endif`,vv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xv=`#ifdef USE_SKINNING
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
#endif`,Mv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ev=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bv=`#ifdef USE_TRANSMISSION
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
#endif`,Tv=`#ifdef USE_TRANSMISSION
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
#endif`,Av=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lv=`uniform sampler2D t2D;
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
}`,Dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fv=`#include <common>
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
}`,Ov=`#if DEPTH_PACKING == 3200
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
}`,Bv=`#define DISTANCE
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
}`,zv=`#define DISTANCE
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
}`,Hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vv=`uniform float scale;
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
}`,kv=`uniform vec3 diffuse;
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
}`,Wv=`#include <common>
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
}`,Xv=`uniform vec3 diffuse;
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
}`,qv=`#define LAMBERT
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
}`,jv=`#define LAMBERT
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
}`,Yv=`#define MATCAP
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
}`,Kv=`#define MATCAP
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
}`,$v=`#define NORMAL
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
}`,Zv=`#define NORMAL
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
}`,Jv=`#define PHONG
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
}`,Qv=`#define PHONG
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
}`,ex=`#define STANDARD
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
}`,tx=`#define STANDARD
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
}`,nx=`#define TOON
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
}`,ix=`#define TOON
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
}`,rx=`uniform float size;
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
}`,sx=`uniform vec3 diffuse;
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
}`,ox=`#include <common>
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
}`,ax=`uniform vec3 color;
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
}`,lx=`uniform float rotation;
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
}`,cx=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:L_,alphahash_pars_fragment:D_,alphamap_fragment:U_,alphamap_pars_fragment:I_,alphatest_fragment:N_,alphatest_pars_fragment:F_,aomap_fragment:O_,aomap_pars_fragment:B_,batching_pars_vertex:z_,batching_vertex:H_,begin_vertex:G_,beginnormal_vertex:V_,bsdfs:k_,iridescence_fragment:W_,bumpmap_pars_fragment:X_,clipping_planes_fragment:q_,clipping_planes_pars_fragment:j_,clipping_planes_pars_vertex:Y_,clipping_planes_vertex:K_,color_fragment:$_,color_pars_fragment:Z_,color_pars_vertex:J_,color_vertex:Q_,common:e0,cube_uv_reflection_fragment:t0,defaultnormal_vertex:n0,displacementmap_pars_vertex:i0,displacementmap_vertex:r0,emissivemap_fragment:s0,emissivemap_pars_fragment:o0,colorspace_fragment:a0,colorspace_pars_fragment:l0,envmap_fragment:c0,envmap_common_pars_fragment:u0,envmap_pars_fragment:f0,envmap_pars_vertex:h0,envmap_physical_pars_fragment:b0,envmap_vertex:d0,fog_vertex:p0,fog_pars_vertex:m0,fog_fragment:g0,fog_pars_fragment:_0,gradientmap_pars_fragment:v0,lightmap_fragment:x0,lightmap_pars_fragment:M0,lights_lambert_fragment:y0,lights_lambert_pars_fragment:S0,lights_pars_begin:E0,lights_toon_fragment:T0,lights_toon_pars_fragment:A0,lights_phong_fragment:w0,lights_phong_pars_fragment:C0,lights_physical_fragment:R0,lights_physical_pars_fragment:P0,lights_fragment_begin:L0,lights_fragment_maps:D0,lights_fragment_end:U0,logdepthbuf_fragment:I0,logdepthbuf_pars_fragment:N0,logdepthbuf_pars_vertex:F0,logdepthbuf_vertex:O0,map_fragment:B0,map_pars_fragment:z0,map_particle_fragment:H0,map_particle_pars_fragment:G0,metalnessmap_fragment:V0,metalnessmap_pars_fragment:k0,morphcolor_vertex:W0,morphnormal_vertex:X0,morphtarget_pars_vertex:q0,morphtarget_vertex:j0,normal_fragment_begin:Y0,normal_fragment_maps:K0,normal_pars_fragment:$0,normal_pars_vertex:Z0,normal_vertex:J0,normalmap_pars_fragment:Q0,clearcoat_normal_fragment_begin:ev,clearcoat_normal_fragment_maps:tv,clearcoat_pars_fragment:nv,iridescence_pars_fragment:iv,opaque_fragment:rv,packing:sv,premultiplied_alpha_fragment:ov,project_vertex:av,dithering_fragment:lv,dithering_pars_fragment:cv,roughnessmap_fragment:uv,roughnessmap_pars_fragment:fv,shadowmap_pars_fragment:hv,shadowmap_pars_vertex:dv,shadowmap_vertex:pv,shadowmask_pars_fragment:mv,skinbase_vertex:gv,skinning_pars_vertex:_v,skinning_vertex:vv,skinnormal_vertex:xv,specularmap_fragment:Mv,specularmap_pars_fragment:yv,tonemapping_fragment:Sv,tonemapping_pars_fragment:Ev,transmission_fragment:bv,transmission_pars_fragment:Tv,uv_pars_fragment:Av,uv_pars_vertex:wv,uv_vertex:Cv,worldpos_vertex:Rv,background_vert:Pv,background_frag:Lv,backgroundCube_vert:Dv,backgroundCube_frag:Uv,cube_vert:Iv,cube_frag:Nv,depth_vert:Fv,depth_frag:Ov,distanceRGBA_vert:Bv,distanceRGBA_frag:zv,equirect_vert:Hv,equirect_frag:Gv,linedashed_vert:Vv,linedashed_frag:kv,meshbasic_vert:Wv,meshbasic_frag:Xv,meshlambert_vert:qv,meshlambert_frag:jv,meshmatcap_vert:Yv,meshmatcap_frag:Kv,meshnormal_vert:$v,meshnormal_frag:Zv,meshphong_vert:Jv,meshphong_frag:Qv,meshphysical_vert:ex,meshphysical_frag:tx,meshtoon_vert:nx,meshtoon_frag:ix,points_vert:rx,points_frag:sx,shadow_vert:ox,shadow_frag:ax,sprite_vert:lx,sprite_frag:cx},we={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},Fn={basic:{uniforms:Kt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Kt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ye(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Kt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Kt([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Kt([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Ye(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Kt([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Kt([we.points,we.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Kt([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Kt([we.common,we.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Kt([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Kt([we.sprite,we.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:Kt([we.common,we.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:Kt([we.lights,we.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Fn.physical={uniforms:Kt([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const so={r:0,b:0,g:0};function ux(n,e,t,i,r,s,a){const o=new Ye(0);let l=s===!0?0:1,c,u,f=null,d=0,p=null;function _(m,h){let E=!1,S=h.isScene===!0?h.background:null;S&&S.isTexture&&(S=(h.backgroundBlurriness>0?t:e).get(S)),S===null?v(o,l):S&&S.isColor&&(v(S,1),E=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),S&&(S.isCubeTexture||S.mapping===qo)?(u===void 0&&(u=new wt(new Rs(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Vr(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(N,D,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=dt.getTransfer(S.colorSpace)!==yt,(f!==S||d!==S.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=S,d=S.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new wt(new zl(2,2),new Rt({name:"BackgroundMaterial",uniforms:Vr(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,c.material.toneMapped=dt.getTransfer(S.colorSpace)!==yt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||d!==S.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=S,d=S.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,h){m.getRGB(so,zh(n)),i.buffers.color.setClear(so.r,so.g,so.b,h,a)}return{getClearColor:function(){return o},setClearColor:function(m,h=1){o.set(m),l=h,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:_}}function fx(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=m(null);let c=l,u=!1;function f(B,X,J,ne,Q){let ae=!1;if(a){const fe=v(ne,J,X);c!==fe&&(c=fe,p(c.object)),ae=h(B,ne,J,Q),ae&&E(B,ne,J,Q)}else{const fe=X.wireframe===!0;(c.geometry!==ne.id||c.program!==J.id||c.wireframe!==fe)&&(c.geometry=ne.id,c.program=J.id,c.wireframe=fe,ae=!0)}Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(ae||u)&&(u=!1,j(B,X,J,ne),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(B){return i.isWebGL2?n.bindVertexArray(B):s.bindVertexArrayOES(B)}function _(B){return i.isWebGL2?n.deleteVertexArray(B):s.deleteVertexArrayOES(B)}function v(B,X,J){const ne=J.wireframe===!0;let Q=o[B.id];Q===void 0&&(Q={},o[B.id]=Q);let ae=Q[X.id];ae===void 0&&(ae={},Q[X.id]=ae);let fe=ae[ne];return fe===void 0&&(fe=m(d()),ae[ne]=fe),fe}function m(B){const X=[],J=[],ne=[];for(let Q=0;Q<r;Q++)X[Q]=0,J[Q]=0,ne[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:J,attributeDivisors:ne,object:B,attributes:{},index:null}}function h(B,X,J,ne){const Q=c.attributes,ae=X.attributes;let fe=0;const _e=J.getAttributes();for(const ge in _e)if(_e[ge].location>=0){const de=Q[ge];let Ce=ae[ge];if(Ce===void 0&&(ge==="instanceMatrix"&&B.instanceMatrix&&(Ce=B.instanceMatrix),ge==="instanceColor"&&B.instanceColor&&(Ce=B.instanceColor)),de===void 0||de.attribute!==Ce||Ce&&de.data!==Ce.data)return!0;fe++}return c.attributesNum!==fe||c.index!==ne}function E(B,X,J,ne){const Q={},ae=X.attributes;let fe=0;const _e=J.getAttributes();for(const ge in _e)if(_e[ge].location>=0){let de=ae[ge];de===void 0&&(ge==="instanceMatrix"&&B.instanceMatrix&&(de=B.instanceMatrix),ge==="instanceColor"&&B.instanceColor&&(de=B.instanceColor));const Ce={};Ce.attribute=de,de&&de.data&&(Ce.data=de.data),Q[ge]=Ce,fe++}c.attributes=Q,c.attributesNum=fe,c.index=ne}function S(){const B=c.newAttributes;for(let X=0,J=B.length;X<J;X++)B[X]=0}function b(B){N(B,0)}function N(B,X){const J=c.newAttributes,ne=c.enabledAttributes,Q=c.attributeDivisors;J[B]=1,ne[B]===0&&(n.enableVertexAttribArray(B),ne[B]=1),Q[B]!==X&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,X),Q[B]=X)}function D(){const B=c.newAttributes,X=c.enabledAttributes;for(let J=0,ne=X.length;J<ne;J++)X[J]!==B[J]&&(n.disableVertexAttribArray(J),X[J]=0)}function R(B,X,J,ne,Q,ae,fe){fe===!0?n.vertexAttribIPointer(B,X,J,Q,ae):n.vertexAttribPointer(B,X,J,ne,Q,ae)}function j(B,X,J,ne){if(i.isWebGL2===!1&&(B.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;S();const Q=ne.attributes,ae=J.getAttributes(),fe=X.defaultAttributeValues;for(const _e in ae){const ge=ae[_e];if(ge.location>=0){let te=Q[_e];if(te===void 0&&(_e==="instanceMatrix"&&B.instanceMatrix&&(te=B.instanceMatrix),_e==="instanceColor"&&B.instanceColor&&(te=B.instanceColor)),te!==void 0){const de=te.normalized,Ce=te.itemSize,Ue=t.get(te);if(Ue===void 0)continue;const Le=Ue.buffer,He=Ue.type,Ve=Ue.bytesPerElement,Fe=i.isWebGL2===!0&&(He===n.INT||He===n.UNSIGNED_INT||te.gpuType===Sh);if(te.isInterleavedBufferAttribute){const Qe=te.data,x=Qe.stride,I=te.offset;if(Qe.isInstancedInterleavedBuffer){for(let O=0;O<ge.locationSize;O++)N(ge.location+O,Qe.meshPerAttribute);B.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=Qe.meshPerAttribute*Qe.count)}else for(let O=0;O<ge.locationSize;O++)b(ge.location+O);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let O=0;O<ge.locationSize;O++)R(ge.location+O,Ce/ge.locationSize,He,de,x*Ve,(I+Ce/ge.locationSize*O)*Ve,Fe)}else{if(te.isInstancedBufferAttribute){for(let Qe=0;Qe<ge.locationSize;Qe++)N(ge.location+Qe,te.meshPerAttribute);B.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Qe=0;Qe<ge.locationSize;Qe++)b(ge.location+Qe);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let Qe=0;Qe<ge.locationSize;Qe++)R(ge.location+Qe,Ce/ge.locationSize,He,de,Ce*Ve,Ce/ge.locationSize*Qe*Ve,Fe)}}else if(fe!==void 0){const de=fe[_e];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(ge.location,de);break;case 3:n.vertexAttrib3fv(ge.location,de);break;case 4:n.vertexAttrib4fv(ge.location,de);break;default:n.vertexAttrib1fv(ge.location,de)}}}}D()}function T(){re();for(const B in o){const X=o[B];for(const J in X){const ne=X[J];for(const Q in ne)_(ne[Q].object),delete ne[Q];delete X[J]}delete o[B]}}function w(B){if(o[B.id]===void 0)return;const X=o[B.id];for(const J in X){const ne=X[J];for(const Q in ne)_(ne[Q].object),delete ne[Q];delete X[J]}delete o[B.id]}function K(B){for(const X in o){const J=o[X];if(J[B.id]===void 0)continue;const ne=J[B.id];for(const Q in ne)_(ne[Q].object),delete ne[Q];delete J[B.id]}}function re(){xe(),u=!0,c!==l&&(c=l,p(c.object))}function xe(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:re,resetDefaultState:xe,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:K,initAttributes:S,enableAttribute:b,disableUnusedAttributes:D}}function hx(n,e,t,i){const r=i.isWebGL2;let s;function a(u){s=u}function o(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function l(u,f,d){if(d===0)return;let p,_;if(r)p=n,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,u,f,d),t.update(f,s,d)}function c(u,f,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<d;_++)this.render(u[_],f[_]);else{p.multiDrawArraysWEBGL(s,u,0,f,0,d);let _=0;for(let v=0;v<d;v++)_+=f[v];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function dx(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),v=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=d>0,b=a||e.has("OES_texture_float"),N=S&&b,D=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:m,maxVaryings:h,maxFragmentUniforms:E,vertexTextures:S,floatFragmentTextures:b,floatVertexTextures:N,maxSamples:D}}function px(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new pi,o=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const _=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const E=s?0:i,S=E*4;let b=h.clippingState||null;l.value=b,b=u(_,d,S,p);for(let N=0;N!==S;++N)b[N]=t[N];h.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,_){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const h=p+v*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<h)&&(m=new Float32Array(h));for(let S=0,b=p;S!==v;++S,b+=4)a.copy(f[S]).applyMatrix4(E,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function mx(n){let e=new WeakMap;function t(a,o){return o===nl?a.mapping=zr:o===il&&(a.mapping=Hr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===nl||o===il)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new w_(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class kh extends Hh{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Rr=4,pu=[.125,.215,.35,.446,.526,.582],zi=20,Da=new kh,mu=new Ye;let Ua=null,Ia=0,Na=0;const Oi=(1+Math.sqrt(5))/2,Mr=1/Oi,gu=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Oi,Mr),new U(0,Oi,-Mr),new U(Mr,0,Oi),new U(-Mr,0,Oi),new U(Oi,Mr,0),new U(-Oi,Mr,0)];class _u{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ua=this._renderer.getRenderTarget(),Ia=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ua,Ia,Na),e.scissorTest=!1,oo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zr||e.mapping===Hr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ua=this._renderer.getRenderTarget(),Ia=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Qn,format:Cn,colorSpace:ii,depthBuffer:!1},r=vu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vu(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gx(s)),this._blurMaterial=_x(s,e,t)}return r}_compileMaterial(e){const t=new wt(this._lodPlanes[0],e);this._renderer.compile(t,Da)}_sceneToCubeUV(e,t,i,r){const o=new fn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(mu),u.toneMapping=yi,u.autoClear=!1;const p=new Hi({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),_=new wt(new Rs,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(mu),v=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):E===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const S=this._cubeSize;oo(r,E*S,h>2?S:0,S,S),u.setRenderTarget(r),v&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===zr||e.mapping===Hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xu());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new wt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;oo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Da)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gu[(r-1)%gu.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new wt(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*zi-1),v=s/_,m=isFinite(s)?1+Math.floor(u*v):zi;m>zi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zi}`);const h=[];let E=0;for(let R=0;R<zi;++R){const j=R/v,T=Math.exp(-j*j/2);h.push(T),R===0?E+=T:R<m&&(E+=2*T)}for(let R=0;R<h.length;R++)h[R]=h[R]/E;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=_,d.mipInt.value=S-i;const b=this._sizeLods[r],N=3*b*(r>S-Rr?r-S+Rr:0),D=4*(this._cubeSize-b);oo(t,N,D,3*b,2*b),l.setRenderTarget(t),l.render(f,Da)}}function gx(n){const e=[],t=[],i=[];let r=n;const s=n-Rr+1+pu.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-Rr?l=pu[a-n+Rr-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,_=6,v=3,m=2,h=1,E=new Float32Array(v*_*p),S=new Float32Array(m*_*p),b=new Float32Array(h*_*p);for(let D=0;D<p;D++){const R=D%3*2/3-1,j=D>2?0:-1,T=[R,j,0,R+2/3,j,0,R+2/3,j+1,0,R,j,0,R+2/3,j+1,0,R,j+1,0];E.set(T,v*_*D),S.set(d,m*_*D);const w=[D,D,D,D,D,D];b.set(w,h*_*D)}const N=new St;N.setAttribute("position",new Ct(E,v)),N.setAttribute("uv",new Ct(S,m)),N.setAttribute("faceIndex",new Ct(b,h)),e.push(N),r>Rr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function vu(n,e,t){const i=new Pn(n,e,t);return i.texture.mapping=qo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function oo(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function _x(n,e,t){const i=new Float32Array(zi),r=new U(0,1,0);return new Rt({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function xu(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Mu(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Hl(){return`

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
	`}function vx(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===nl||l===il,u=l===zr||l===Hr;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new _u(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new _u(n));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function xx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Mx(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const v=d.morphAttributes[_];for(let m=0,h=v.length;m<h;m++)e.remove(v[m])}d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const _ in d)e.update(d[_],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const _ in p){const v=p[_];for(let m=0,h=v.length;m<h;m++)e.update(v[m],n.ARRAY_BUFFER)}}function c(f){const d=[],p=f.index,_=f.attributes.position;let v=0;if(p!==null){const E=p.array;v=p.version;for(let S=0,b=E.length;S<b;S+=3){const N=E[S+0],D=E[S+1],R=E[S+2];d.push(N,D,D,R,R,N)}}else if(_!==void 0){const E=_.array;v=_.version;for(let S=0,b=E.length/3-1;S<b;S+=3){const N=S+0,D=S+1,R=S+2;d.push(N,D,D,R,R,N)}}else return;const m=new(Dh(d)?Bh:Oh)(d,1);m.version=v;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function yx(n,e,t,i){const r=i.isWebGL2;let s;function a(p){s=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,_){n.drawElements(s,_,o,p*l),t.update(_,s,1)}function f(p,_,v){if(v===0)return;let m,h;if(r)m=n,h="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),h="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[h](s,_,o,p*l,v),t.update(_,s,v)}function d(p,_,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<v;h++)this.render(p[h]/l,_[h]);else{m.multiDrawElementsWEBGL(s,_,0,o,p,0,v);let h=0;for(let E=0;E<v;E++)h+=_[E];t.update(h,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=d}function Sx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Ex(n,e){return n[0]-e[0]}function bx(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Tx(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new Tt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,f){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=_!==void 0?_.length:0;let m=s.get(u);if(m===void 0||m.count!==v){let X=function(){xe.dispose(),s.delete(u),u.removeEventListener("dispose",X)};var p=X;m!==void 0&&m.texture.dispose();const S=u.morphAttributes.position!==void 0,b=u.morphAttributes.normal!==void 0,N=u.morphAttributes.color!==void 0,D=u.morphAttributes.position||[],R=u.morphAttributes.normal||[],j=u.morphAttributes.color||[];let T=0;S===!0&&(T=1),b===!0&&(T=2),N===!0&&(T=3);let w=u.attributes.position.count*T,K=1;w>e.maxTextureSize&&(K=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const re=new Float32Array(w*K*4*v),xe=new Nh(re,w,K,v);xe.type=vi,xe.needsUpdate=!0;const B=T*4;for(let J=0;J<v;J++){const ne=D[J],Q=R[J],ae=j[J],fe=w*K*4*J;for(let _e=0;_e<ne.count;_e++){const ge=_e*B;S===!0&&(a.fromBufferAttribute(ne,_e),re[fe+ge+0]=a.x,re[fe+ge+1]=a.y,re[fe+ge+2]=a.z,re[fe+ge+3]=0),b===!0&&(a.fromBufferAttribute(Q,_e),re[fe+ge+4]=a.x,re[fe+ge+5]=a.y,re[fe+ge+6]=a.z,re[fe+ge+7]=0),N===!0&&(a.fromBufferAttribute(ae,_e),re[fe+ge+8]=a.x,re[fe+ge+9]=a.y,re[fe+ge+10]=a.z,re[fe+ge+11]=ae.itemSize===4?a.w:1)}}m={count:v,texture:xe,size:new De(w,K)},s.set(u,m),u.addEventListener("dispose",X)}let h=0;for(let S=0;S<d.length;S++)h+=d[S];const E=u.morphTargetsRelative?1:1-h;f.getUniforms().setValue(n,"morphTargetBaseInfluence",E),f.getUniforms().setValue(n,"morphTargetInfluences",d),f.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const _=d===void 0?0:d.length;let v=i[u.id];if(v===void 0||v.length!==_){v=[];for(let b=0;b<_;b++)v[b]=[b,0];i[u.id]=v}for(let b=0;b<_;b++){const N=v[b];N[0]=b,N[1]=d[b]}v.sort(bx);for(let b=0;b<8;b++)b<_&&v[b][1]?(o[b][0]=v[b][0],o[b][1]=v[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(Ex);const m=u.morphAttributes.position,h=u.morphAttributes.normal;let E=0;for(let b=0;b<8;b++){const N=o[b],D=N[0],R=N[1];D!==Number.MAX_SAFE_INTEGER&&R?(m&&u.getAttribute("morphTarget"+b)!==m[D]&&u.setAttribute("morphTarget"+b,m[D]),h&&u.getAttribute("morphNormal"+b)!==h[D]&&u.setAttribute("morphNormal"+b,h[D]),r[b]=R,E+=R):(m&&u.hasAttribute("morphTarget"+b)===!0&&u.deleteAttribute("morphTarget"+b),h&&u.hasAttribute("morphNormal"+b)===!0&&u.deleteAttribute("morphNormal"+b),r[b]=0)}const S=u.morphTargetsRelative?1:1-E;f.getUniforms().setValue(n,"morphTargetBaseInfluence",S),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function Ax(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class Wh extends an{constructor(e,t,i,r,s,a,o,l,c,u){if(u=u!==void 0?u:Wi,u!==Wi&&u!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Wi&&(i=_i),i===void 0&&u===Gr&&(i=ki),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:$t,this.minFilter=l!==void 0?l:$t,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Xh=new an,qh=new Wh(1,1);qh.compareFunction=Lh;const jh=new Nh,Yh=new f_,Kh=new Gh,yu=[],Su=[],Eu=new Float32Array(16),bu=new Float32Array(9),Tu=new Float32Array(4);function Wr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=yu[r];if(s===void 0&&(s=new Float32Array(r),yu[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ko(n,e){let t=Su[e];t===void 0&&(t=new Int32Array(e),Su[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function wx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Cx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function Rx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function Px(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function Lx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;Tu.set(i),n.uniformMatrix2fv(this.addr,!1,Tu),Ot(t,i)}}function Dx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;bu.set(i),n.uniformMatrix3fv(this.addr,!1,bu),Ot(t,i)}}function Ux(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;Eu.set(i),n.uniformMatrix4fv(this.addr,!1,Eu),Ot(t,i)}}function Ix(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Nx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function Fx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function Ox(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function Bx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function zx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function Hx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function Gx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function Vx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?qh:Xh;t.setTexture2D(e||s,r)}function kx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Yh,r)}function Wx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Kh,r)}function Xx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||jh,r)}function qx(n){switch(n){case 5126:return wx;case 35664:return Cx;case 35665:return Rx;case 35666:return Px;case 35674:return Lx;case 35675:return Dx;case 35676:return Ux;case 5124:case 35670:return Ix;case 35667:case 35671:return Nx;case 35668:case 35672:return Fx;case 35669:case 35673:return Ox;case 5125:return Bx;case 36294:return zx;case 36295:return Hx;case 36296:return Gx;case 35678:case 36198:case 36298:case 36306:case 35682:return Vx;case 35679:case 36299:case 36307:return kx;case 35680:case 36300:case 36308:case 36293:return Wx;case 36289:case 36303:case 36311:case 36292:return Xx}}function jx(n,e){n.uniform1fv(this.addr,e)}function Yx(n,e){const t=Wr(e,this.size,2);n.uniform2fv(this.addr,t)}function Kx(n,e){const t=Wr(e,this.size,3);n.uniform3fv(this.addr,t)}function $x(n,e){const t=Wr(e,this.size,4);n.uniform4fv(this.addr,t)}function Zx(n,e){const t=Wr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Jx(n,e){const t=Wr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Qx(n,e){const t=Wr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function eM(n,e){n.uniform1iv(this.addr,e)}function tM(n,e){n.uniform2iv(this.addr,e)}function nM(n,e){n.uniform3iv(this.addr,e)}function iM(n,e){n.uniform4iv(this.addr,e)}function rM(n,e){n.uniform1uiv(this.addr,e)}function sM(n,e){n.uniform2uiv(this.addr,e)}function oM(n,e){n.uniform3uiv(this.addr,e)}function aM(n,e){n.uniform4uiv(this.addr,e)}function lM(n,e,t){const i=this.cache,r=e.length,s=Ko(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Xh,s[a])}function cM(n,e,t){const i=this.cache,r=e.length,s=Ko(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Yh,s[a])}function uM(n,e,t){const i=this.cache,r=e.length,s=Ko(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Kh,s[a])}function fM(n,e,t){const i=this.cache,r=e.length,s=Ko(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||jh,s[a])}function hM(n){switch(n){case 5126:return jx;case 35664:return Yx;case 35665:return Kx;case 35666:return $x;case 35674:return Zx;case 35675:return Jx;case 35676:return Qx;case 5124:case 35670:return eM;case 35667:case 35671:return tM;case 35668:case 35672:return nM;case 35669:case 35673:return iM;case 5125:return rM;case 36294:return sM;case 36295:return oM;case 36296:return aM;case 35678:case 36198:case 36298:case 36306:case 35682:return lM;case 35679:case 36299:case 36307:return cM;case 35680:case 36300:case 36308:case 36293:return uM;case 36289:case 36303:case 36311:case 36292:return fM}}class dM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=qx(t.type)}}class pM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hM(t.type)}}class mM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Fa=/(\w+)(\])?(\[|\.)?/g;function Au(n,e){n.seq.push(e),n.map[e.id]=e}function gM(n,e,t){const i=n.name,r=i.length;for(Fa.lastIndex=0;;){const s=Fa.exec(i),a=Fa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Au(t,c===void 0?new dM(o,n,e):new pM(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new mM(o),Au(t,f)),t=f}}}class Mo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);gM(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function wu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const _M=37297;let vM=0;function xM(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function MM(n){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(n);let i;switch(e===t?i="":e===Po&&t===Ro?i="LinearDisplayP3ToLinearSRGB":e===Ro&&t===Po&&(i="LinearSRGBToLinearDisplayP3"),n){case ii:case jo:return[i,"LinearTransferOETF"];case zt:case Nl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Cu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+xM(n.getShaderSource(e),a)}else return r}function yM(n,e){const t=MM(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function SM(n,e){let t;switch(e){case Sg:t="Linear";break;case Eg:t="Reinhard";break;case bg:t="OptimizedCineon";break;case Mh:t="ACESFilmic";break;case Ag:t="AgX";break;case Tg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function EM(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pr).join(`
`)}function bM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Pr).join(`
`)}function TM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function AM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Pr(n){return n!==""}function Ru(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wM=/^[ \t]*#include +<([\w\d./]+)>/gm;function cl(n){return n.replace(wM,RM)}const CM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function RM(n,e){let t=et[e];if(t===void 0){const i=CM.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return cl(t)}const PM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lu(n){return n.replace(PM,LM)}function LM(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Du(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function DM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===$m?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function UM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case zr:case Hr:e="ENVMAP_TYPE_CUBE";break;case qo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function IM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Hr:e="ENVMAP_MODE_REFRACTION";break}return e}function NM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case xh:e="ENVMAP_BLENDING_MULTIPLY";break;case Mg:e="ENVMAP_BLENDING_MIX";break;case yg:e="ENVMAP_BLENDING_ADD";break}return e}function FM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function OM(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=DM(t),c=UM(t),u=IM(t),f=NM(t),d=FM(t),p=t.isWebGL2?"":EM(t),_=bM(t),v=TM(s),m=r.createProgram();let h,E,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Pr).join(`
`),h.length>0&&(h+=`
`),E=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Pr).join(`
`),E.length>0&&(E+=`
`)):(h=[Du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),E=[p,Du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?et.tonemapping_pars_fragment:"",t.toneMapping!==yi?SM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,yM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pr).join(`
`)),a=cl(a),a=Ru(a,t),a=Pu(a,t),o=cl(o),o=Ru(o,t),o=Pu(o,t),a=Lu(a),o=Lu(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,h=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===$c?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const b=S+h+a,N=S+E+o,D=wu(r,r.VERTEX_SHADER,b),R=wu(r,r.FRAGMENT_SHADER,N);r.attachShader(m,D),r.attachShader(m,R),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function j(re){if(n.debug.checkShaderErrors){const xe=r.getProgramInfoLog(m).trim(),B=r.getShaderInfoLog(D).trim(),X=r.getShaderInfoLog(R).trim();let J=!0,ne=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,D,R);else{const Q=Cu(r,D,"vertex"),ae=Cu(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+xe+`
`+Q+`
`+ae)}else xe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",xe):(B===""||X==="")&&(ne=!1);ne&&(re.diagnostics={runnable:J,programLog:xe,vertexShader:{log:B,prefix:h},fragmentShader:{log:X,prefix:E}})}r.deleteShader(D),r.deleteShader(R),T=new Mo(r,m),w=AM(r,m)}let T;this.getUniforms=function(){return T===void 0&&j(this),T};let w;this.getAttributes=function(){return w===void 0&&j(this),w};let K=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return K===!1&&(K=r.getProgramParameter(m,_M)),K},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=D,this.fragmentShader=R,this}let BM=0;class zM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new HM(e),t.set(e,i)),i}}class HM{constructor(e){this.id=BM++,this.code=e,this.usedTimes=0}}function GM(n,e,t,i,r,s,a){const o=new Ol,l=new zM,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return T===0?"uv":`uv${T}`}function m(T,w,K,re,xe){const B=re.fog,X=xe.geometry,J=T.isMeshStandardMaterial?re.environment:null,ne=(T.isMeshStandardMaterial?t:e).get(T.envMap||J),Q=ne&&ne.mapping===qo?ne.image.height:null,ae=_[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const fe=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,_e=fe!==void 0?fe.length:0;let ge=0;X.morphAttributes.position!==void 0&&(ge=1),X.morphAttributes.normal!==void 0&&(ge=2),X.morphAttributes.color!==void 0&&(ge=3);let te,de,Ce,Ue;if(ae){const It=Fn[ae];te=It.vertexShader,de=It.fragmentShader}else te=T.vertexShader,de=T.fragmentShader,l.update(T),Ce=l.getVertexShaderID(T),Ue=l.getFragmentShaderID(T);const Le=n.getRenderTarget(),He=xe.isInstancedMesh===!0,Ve=xe.isBatchedMesh===!0,Fe=!!T.map,Qe=!!T.matcap,x=!!ne,I=!!T.aoMap,O=!!T.lightMap,q=!!T.bumpMap,V=!!T.normalMap,ie=!!T.displacementMap,se=!!T.emissiveMap,y=!!T.metalnessMap,g=!!T.roughnessMap,L=T.anisotropy>0,k=T.clearcoat>0,z=T.iridescence>0,W=T.sheen>0,he=T.transmission>0,le=L&&!!T.anisotropyMap,ve=k&&!!T.clearcoatMap,Ae=k&&!!T.clearcoatNormalMap,ye=k&&!!T.clearcoatRoughnessMap,oe=z&&!!T.iridescenceMap,ze=z&&!!T.iridescenceThicknessMap,P=W&&!!T.sheenColorMap,ue=W&&!!T.sheenRoughnessMap,pe=!!T.specularMap,ce=!!T.specularColorMap,Re=!!T.specularIntensityMap,je=he&&!!T.transmissionMap,We=he&&!!T.thicknessMap,$e=!!T.gradientMap,be=!!T.alphaMap,F=T.alphaTest>0,Se=!!T.alphaHash,Ee=!!T.extensions,Oe=!!X.attributes.uv1,Me=!!X.attributes.uv2,it=!!X.attributes.uv3;let rt=yi;return T.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(rt=n.toneMapping),{isWebGL2:u,shaderID:ae,shaderType:T.type,shaderName:T.name,vertexShader:te,fragmentShader:de,defines:T.defines,customVertexShaderID:Ce,customFragmentShaderID:Ue,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Ve,instancing:He,instancingColor:He&&xe.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Le===null?n.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:ii,map:Fe,matcap:Qe,envMap:x,envMapMode:x&&ne.mapping,envMapCubeUVHeight:Q,aoMap:I,lightMap:O,bumpMap:q,normalMap:V,displacementMap:d&&ie,emissiveMap:se,normalMapObjectSpace:V&&T.normalMapType===Bg,normalMapTangentSpace:V&&T.normalMapType===Ph,metalnessMap:y,roughnessMap:g,anisotropy:L,anisotropyMap:le,clearcoat:k,clearcoatMap:ve,clearcoatNormalMap:Ae,clearcoatRoughnessMap:ye,iridescence:z,iridescenceMap:oe,iridescenceThicknessMap:ze,sheen:W,sheenColorMap:P,sheenRoughnessMap:ue,specularMap:pe,specularColorMap:ce,specularIntensityMap:Re,transmission:he,transmissionMap:je,thicknessMap:We,gradientMap:$e,opaque:T.transparent===!1&&T.blending===Vi,alphaMap:be,alphaTest:F,alphaHash:Se,combine:T.combine,mapUv:Fe&&v(T.map.channel),aoMapUv:I&&v(T.aoMap.channel),lightMapUv:O&&v(T.lightMap.channel),bumpMapUv:q&&v(T.bumpMap.channel),normalMapUv:V&&v(T.normalMap.channel),displacementMapUv:ie&&v(T.displacementMap.channel),emissiveMapUv:se&&v(T.emissiveMap.channel),metalnessMapUv:y&&v(T.metalnessMap.channel),roughnessMapUv:g&&v(T.roughnessMap.channel),anisotropyMapUv:le&&v(T.anisotropyMap.channel),clearcoatMapUv:ve&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:P&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:ue&&v(T.sheenRoughnessMap.channel),specularMapUv:pe&&v(T.specularMap.channel),specularColorMapUv:ce&&v(T.specularColorMap.channel),specularIntensityMapUv:Re&&v(T.specularIntensityMap.channel),transmissionMapUv:je&&v(T.transmissionMap.channel),thicknessMapUv:We&&v(T.thicknessMap.channel),alphaMapUv:be&&v(T.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(V||L),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,vertexUv1s:Oe,vertexUv2s:Me,vertexUv3s:it,pointsUvs:xe.isPoints===!0&&!!X.attributes.uv&&(Fe||be),fog:!!B,useFog:T.fog===!0,fogExp2:B&&B.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:xe.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:ge,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&K.length>0,shadowMapType:n.shadowMap.type,toneMapping:rt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Fe&&T.map.isVideoTexture===!0&&dt.getTransfer(T.map.colorSpace)===yt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===hn,flipSided:T.side===en,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionDerivatives:Ee&&T.extensions.derivatives===!0,extensionFragDepth:Ee&&T.extensions.fragDepth===!0,extensionDrawBuffers:Ee&&T.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ee&&T.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ee&&T.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()}}function h(T){const w=[];if(T.shaderID?w.push(T.shaderID):(w.push(T.customVertexShaderID),w.push(T.customFragmentShaderID)),T.defines!==void 0)for(const K in T.defines)w.push(K),w.push(T.defines[K]);return T.isRawShaderMaterial===!1&&(E(w,T),S(w,T),w.push(n.outputColorSpace)),w.push(T.customProgramCacheKey),w.join()}function E(T,w){T.push(w.precision),T.push(w.outputColorSpace),T.push(w.envMapMode),T.push(w.envMapCubeUVHeight),T.push(w.mapUv),T.push(w.alphaMapUv),T.push(w.lightMapUv),T.push(w.aoMapUv),T.push(w.bumpMapUv),T.push(w.normalMapUv),T.push(w.displacementMapUv),T.push(w.emissiveMapUv),T.push(w.metalnessMapUv),T.push(w.roughnessMapUv),T.push(w.anisotropyMapUv),T.push(w.clearcoatMapUv),T.push(w.clearcoatNormalMapUv),T.push(w.clearcoatRoughnessMapUv),T.push(w.iridescenceMapUv),T.push(w.iridescenceThicknessMapUv),T.push(w.sheenColorMapUv),T.push(w.sheenRoughnessMapUv),T.push(w.specularMapUv),T.push(w.specularColorMapUv),T.push(w.specularIntensityMapUv),T.push(w.transmissionMapUv),T.push(w.thicknessMapUv),T.push(w.combine),T.push(w.fogExp2),T.push(w.sizeAttenuation),T.push(w.morphTargetsCount),T.push(w.morphAttributeCount),T.push(w.numDirLights),T.push(w.numPointLights),T.push(w.numSpotLights),T.push(w.numSpotLightMaps),T.push(w.numHemiLights),T.push(w.numRectAreaLights),T.push(w.numDirLightShadows),T.push(w.numPointLightShadows),T.push(w.numSpotLightShadows),T.push(w.numSpotLightShadowsWithMaps),T.push(w.numLightProbes),T.push(w.shadowMapType),T.push(w.toneMapping),T.push(w.numClippingPlanes),T.push(w.numClipIntersection),T.push(w.depthPacking)}function S(T,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),T.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),T.push(o.mask)}function b(T){const w=_[T.type];let K;if(w){const re=Fn[w];K=Io.clone(re.uniforms)}else K=T.uniforms;return K}function N(T,w){let K;for(let re=0,xe=c.length;re<xe;re++){const B=c[re];if(B.cacheKey===w){K=B,++K.usedTimes;break}}return K===void 0&&(K=new OM(n,w,T,s),c.push(K)),K}function D(T){if(--T.usedTimes===0){const w=c.indexOf(T);c[w]=c[c.length-1],c.pop(),T.destroy()}}function R(T){l.remove(T)}function j(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:b,acquireProgram:N,releaseProgram:D,releaseShaderCache:R,programs:c,dispose:j}}function VM(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function kM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Uu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Iu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,p,_,v,m){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:p,groupOrder:_,renderOrder:f.renderOrder,z:v,group:m},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=p,h.groupOrder=_,h.renderOrder=f.renderOrder,h.z=v,h.group=m),e++,h}function o(f,d,p,_,v,m){const h=a(f,d,p,_,v,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):t.push(h)}function l(f,d,p,_,v,m){const h=a(f,d,p,_,v,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function c(f,d){t.length>1&&t.sort(f||kM),i.length>1&&i.sort(d||Uu),r.length>1&&r.sort(d||Uu)}function u(){for(let f=e,d=n.length;f<d;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function WM(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Iu,n.set(i,[a])):r>=s.length?(a=new Iu,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function XM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ye};break;case"SpotLight":t={position:new U,direction:new U,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function qM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let jM=0;function YM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function KM(n,e){const t=new XM,i=qM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new U);const s=new U,a=new pt,o=new pt;function l(u,f){let d=0,p=0,_=0;for(let re=0;re<9;re++)r.probe[re].set(0,0,0);let v=0,m=0,h=0,E=0,S=0,b=0,N=0,D=0,R=0,j=0,T=0;u.sort(YM);const w=f===!0?Math.PI:1;for(let re=0,xe=u.length;re<xe;re++){const B=u[re],X=B.color,J=B.intensity,ne=B.distance,Q=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)d+=X.r*J*w,p+=X.g*J*w,_+=X.b*J*w;else if(B.isLightProbe){for(let ae=0;ae<9;ae++)r.probe[ae].addScaledVector(B.sh.coefficients[ae],J);T++}else if(B.isDirectionalLight){const ae=t.get(B);if(ae.color.copy(B.color).multiplyScalar(B.intensity*w),B.castShadow){const fe=B.shadow,_e=i.get(B);_e.shadowBias=fe.bias,_e.shadowNormalBias=fe.normalBias,_e.shadowRadius=fe.radius,_e.shadowMapSize=fe.mapSize,r.directionalShadow[v]=_e,r.directionalShadowMap[v]=Q,r.directionalShadowMatrix[v]=B.shadow.matrix,b++}r.directional[v]=ae,v++}else if(B.isSpotLight){const ae=t.get(B);ae.position.setFromMatrixPosition(B.matrixWorld),ae.color.copy(X).multiplyScalar(J*w),ae.distance=ne,ae.coneCos=Math.cos(B.angle),ae.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),ae.decay=B.decay,r.spot[h]=ae;const fe=B.shadow;if(B.map&&(r.spotLightMap[R]=B.map,R++,fe.updateMatrices(B),B.castShadow&&j++),r.spotLightMatrix[h]=fe.matrix,B.castShadow){const _e=i.get(B);_e.shadowBias=fe.bias,_e.shadowNormalBias=fe.normalBias,_e.shadowRadius=fe.radius,_e.shadowMapSize=fe.mapSize,r.spotShadow[h]=_e,r.spotShadowMap[h]=Q,D++}h++}else if(B.isRectAreaLight){const ae=t.get(B);ae.color.copy(X).multiplyScalar(J),ae.halfWidth.set(B.width*.5,0,0),ae.halfHeight.set(0,B.height*.5,0),r.rectArea[E]=ae,E++}else if(B.isPointLight){const ae=t.get(B);if(ae.color.copy(B.color).multiplyScalar(B.intensity*w),ae.distance=B.distance,ae.decay=B.decay,B.castShadow){const fe=B.shadow,_e=i.get(B);_e.shadowBias=fe.bias,_e.shadowNormalBias=fe.normalBias,_e.shadowRadius=fe.radius,_e.shadowMapSize=fe.mapSize,_e.shadowCameraNear=fe.camera.near,_e.shadowCameraFar=fe.camera.far,r.pointShadow[m]=_e,r.pointShadowMap[m]=Q,r.pointShadowMatrix[m]=B.shadow.matrix,N++}r.point[m]=ae,m++}else if(B.isHemisphereLight){const ae=t.get(B);ae.skyColor.copy(B.color).multiplyScalar(J*w),ae.groundColor.copy(B.groundColor).multiplyScalar(J*w),r.hemi[S]=ae,S++}}E>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=we.LTC_FLOAT_1,r.rectAreaLTC2=we.LTC_FLOAT_2):(r.rectAreaLTC1=we.LTC_HALF_1,r.rectAreaLTC2=we.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=we.LTC_FLOAT_1,r.rectAreaLTC2=we.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=we.LTC_HALF_1,r.rectAreaLTC2=we.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=_;const K=r.hash;(K.directionalLength!==v||K.pointLength!==m||K.spotLength!==h||K.rectAreaLength!==E||K.hemiLength!==S||K.numDirectionalShadows!==b||K.numPointShadows!==N||K.numSpotShadows!==D||K.numSpotMaps!==R||K.numLightProbes!==T)&&(r.directional.length=v,r.spot.length=h,r.rectArea.length=E,r.point.length=m,r.hemi.length=S,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=N,r.pointShadowMap.length=N,r.spotShadow.length=D,r.spotShadowMap.length=D,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=N,r.spotLightMatrix.length=D+R-j,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=j,r.numLightProbes=T,K.directionalLength=v,K.pointLength=m,K.spotLength=h,K.rectAreaLength=E,K.hemiLength=S,K.numDirectionalShadows=b,K.numPointShadows=N,K.numSpotShadows=D,K.numSpotMaps=R,K.numLightProbes=T,r.version=jM++)}function c(u,f){let d=0,p=0,_=0,v=0,m=0;const h=f.matrixWorldInverse;for(let E=0,S=u.length;E<S;E++){const b=u[E];if(b.isDirectionalLight){const N=r.directional[d];N.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),N.direction.sub(s),N.direction.transformDirection(h),d++}else if(b.isSpotLight){const N=r.spot[_];N.position.setFromMatrixPosition(b.matrixWorld),N.position.applyMatrix4(h),N.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),N.direction.sub(s),N.direction.transformDirection(h),_++}else if(b.isRectAreaLight){const N=r.rectArea[v];N.position.setFromMatrixPosition(b.matrixWorld),N.position.applyMatrix4(h),o.identity(),a.copy(b.matrixWorld),a.premultiply(h),o.extractRotation(a),N.halfWidth.set(b.width*.5,0,0),N.halfHeight.set(0,b.height*.5,0),N.halfWidth.applyMatrix4(o),N.halfHeight.applyMatrix4(o),v++}else if(b.isPointLight){const N=r.point[p];N.position.setFromMatrixPosition(b.matrixWorld),N.position.applyMatrix4(h),p++}else if(b.isHemisphereLight){const N=r.hemi[m];N.direction.setFromMatrixPosition(b.matrixWorld),N.direction.transformDirection(h),m++}}}return{setup:l,setupView:c,state:r}}function Nu(n,e){const t=new KM(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function $M(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Nu(n,e),t.set(s,[l])):a>=o.length?(l=new Nu(n,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class ZM extends Ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class JM extends Ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const QM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ey=`uniform sampler2D shadow_pass;
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
}`;function ty(n,e,t){let i=new Bl;const r=new De,s=new De,a=new Tt,o=new ZM({depthPacking:Og}),l=new JM,c={},u=t.maxTextureSize,f={[Ti]:en,[en]:Ti,[hn]:hn},d=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:QM,fragmentShader:ey}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new St;_.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new wt(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vh;let h=this.type;this.render=function(D,R,j){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;const T=n.getRenderTarget(),w=n.getActiveCubeFace(),K=n.getActiveMipmapLevel(),re=n.state;re.setBlending(Jn),re.buffers.color.setClear(1,1,1,1),re.buffers.depth.setTest(!0),re.setScissorTest(!1);const xe=h!==Yn&&this.type===Yn,B=h===Yn&&this.type!==Yn;for(let X=0,J=D.length;X<J;X++){const ne=D[X],Q=ne.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;r.copy(Q.mapSize);const ae=Q.getFrameExtents();if(r.multiply(ae),s.copy(Q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,Q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,Q.mapSize.y=s.y)),Q.map===null||xe===!0||B===!0){const _e=this.type!==Yn?{minFilter:$t,magFilter:$t}:{};Q.map!==null&&Q.map.dispose(),Q.map=new Pn(r.x,r.y,_e),Q.map.texture.name=ne.name+".shadowMap",Q.camera.updateProjectionMatrix()}n.setRenderTarget(Q.map),n.clear();const fe=Q.getViewportCount();for(let _e=0;_e<fe;_e++){const ge=Q.getViewport(_e);a.set(s.x*ge.x,s.y*ge.y,s.x*ge.z,s.y*ge.w),re.viewport(a),Q.updateMatrices(ne,_e),i=Q.getFrustum(),b(R,j,Q.camera,ne,this.type)}Q.isPointLightShadow!==!0&&this.type===Yn&&E(Q,j),Q.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(T,w,K)};function E(D,R){const j=e.update(v);d.defines.VSM_SAMPLES!==D.blurSamples&&(d.defines.VSM_SAMPLES=D.blurSamples,p.defines.VSM_SAMPLES=D.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Pn(r.x,r.y)),d.uniforms.shadow_pass.value=D.map.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,n.setRenderTarget(D.mapPass),n.clear(),n.renderBufferDirect(R,null,j,d,v,null),p.uniforms.shadow_pass.value=D.mapPass.texture,p.uniforms.resolution.value=D.mapSize,p.uniforms.radius.value=D.radius,n.setRenderTarget(D.map),n.clear(),n.renderBufferDirect(R,null,j,p,v,null)}function S(D,R,j,T){let w=null;const K=j.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(K!==void 0)w=K;else if(w=j.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const re=w.uuid,xe=R.uuid;let B=c[re];B===void 0&&(B={},c[re]=B);let X=B[xe];X===void 0&&(X=w.clone(),B[xe]=X,R.addEventListener("dispose",N)),w=X}if(w.visible=R.visible,w.wireframe=R.wireframe,T===Yn?w.side=R.shadowSide!==null?R.shadowSide:R.side:w.side=R.shadowSide!==null?R.shadowSide:f[R.side],w.alphaMap=R.alphaMap,w.alphaTest=R.alphaTest,w.map=R.map,w.clipShadows=R.clipShadows,w.clippingPlanes=R.clippingPlanes,w.clipIntersection=R.clipIntersection,w.displacementMap=R.displacementMap,w.displacementScale=R.displacementScale,w.displacementBias=R.displacementBias,w.wireframeLinewidth=R.wireframeLinewidth,w.linewidth=R.linewidth,j.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const re=n.properties.get(w);re.light=j}return w}function b(D,R,j,T,w){if(D.visible===!1)return;if(D.layers.test(R.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&w===Yn)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,D.matrixWorld);const xe=e.update(D),B=D.material;if(Array.isArray(B)){const X=xe.groups;for(let J=0,ne=X.length;J<ne;J++){const Q=X[J],ae=B[Q.materialIndex];if(ae&&ae.visible){const fe=S(D,ae,T,w);D.onBeforeShadow(n,D,R,j,xe,fe,Q),n.renderBufferDirect(j,null,xe,fe,D,Q),D.onAfterShadow(n,D,R,j,xe,fe,Q)}}}else if(B.visible){const X=S(D,B,T,w);D.onBeforeShadow(n,D,R,j,xe,X,null),n.renderBufferDirect(j,null,xe,X,D,null),D.onAfterShadow(n,D,R,j,xe,X,null)}}const re=D.children;for(let xe=0,B=re.length;xe<B;xe++)b(re[xe],R,j,T,w)}function N(D){D.target.removeEventListener("dispose",N);for(const j in c){const T=c[j],w=D.target.uuid;w in T&&(T[w].dispose(),delete T[w])}}}function ny(n,e,t){const i=t.isWebGL2;function r(){let F=!1;const Se=new Tt;let Ee=null;const Oe=new Tt(0,0,0,0);return{setMask:function(Me){Ee!==Me&&!F&&(n.colorMask(Me,Me,Me,Me),Ee=Me)},setLocked:function(Me){F=Me},setClear:function(Me,it,rt,mt,It){It===!0&&(Me*=mt,it*=mt,rt*=mt),Se.set(Me,it,rt,mt),Oe.equals(Se)===!1&&(n.clearColor(Me,it,rt,mt),Oe.copy(Se))},reset:function(){F=!1,Ee=null,Oe.set(-1,0,0,0)}}}function s(){let F=!1,Se=null,Ee=null,Oe=null;return{setTest:function(Me){Me?Ve(n.DEPTH_TEST):Fe(n.DEPTH_TEST)},setMask:function(Me){Se!==Me&&!F&&(n.depthMask(Me),Se=Me)},setFunc:function(Me){if(Ee!==Me){switch(Me){case dg:n.depthFunc(n.NEVER);break;case pg:n.depthFunc(n.ALWAYS);break;case mg:n.depthFunc(n.LESS);break;case wo:n.depthFunc(n.LEQUAL);break;case gg:n.depthFunc(n.EQUAL);break;case _g:n.depthFunc(n.GEQUAL);break;case vg:n.depthFunc(n.GREATER);break;case xg:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=Me}},setLocked:function(Me){F=Me},setClear:function(Me){Oe!==Me&&(n.clearDepth(Me),Oe=Me)},reset:function(){F=!1,Se=null,Ee=null,Oe=null}}}function a(){let F=!1,Se=null,Ee=null,Oe=null,Me=null,it=null,rt=null,mt=null,It=null;return{setTest:function(st){F||(st?Ve(n.STENCIL_TEST):Fe(n.STENCIL_TEST))},setMask:function(st){Se!==st&&!F&&(n.stencilMask(st),Se=st)},setFunc:function(st,Et,Lt){(Ee!==st||Oe!==Et||Me!==Lt)&&(n.stencilFunc(st,Et,Lt),Ee=st,Oe=Et,Me=Lt)},setOp:function(st,Et,Lt){(it!==st||rt!==Et||mt!==Lt)&&(n.stencilOp(st,Et,Lt),it=st,rt=Et,mt=Lt)},setLocked:function(st){F=st},setClear:function(st){It!==st&&(n.clearStencil(st),It=st)},reset:function(){F=!1,Se=null,Ee=null,Oe=null,Me=null,it=null,rt=null,mt=null,It=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,f=new WeakMap;let d={},p={},_=new WeakMap,v=[],m=null,h=!1,E=null,S=null,b=null,N=null,D=null,R=null,j=null,T=new Ye(0,0,0),w=0,K=!1,re=null,xe=null,B=null,X=null,J=null;const ne=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,ae=0;const fe=n.getParameter(n.VERSION);fe.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(fe)[1]),Q=ae>=1):fe.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(fe)[1]),Q=ae>=2);let _e=null,ge={};const te=n.getParameter(n.SCISSOR_BOX),de=n.getParameter(n.VIEWPORT),Ce=new Tt().fromArray(te),Ue=new Tt().fromArray(de);function Le(F,Se,Ee,Oe){const Me=new Uint8Array(4),it=n.createTexture();n.bindTexture(F,it),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let rt=0;rt<Ee;rt++)i&&(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)?n.texImage3D(Se,0,n.RGBA,1,1,Oe,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(Se+rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return it}const He={};He[n.TEXTURE_2D]=Le(n.TEXTURE_2D,n.TEXTURE_2D,1),He[n.TEXTURE_CUBE_MAP]=Le(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(He[n.TEXTURE_2D_ARRAY]=Le(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),He[n.TEXTURE_3D]=Le(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ve(n.DEPTH_TEST),l.setFunc(wo),se(!1),y(vc),Ve(n.CULL_FACE),V(Jn);function Ve(F){d[F]!==!0&&(n.enable(F),d[F]=!0)}function Fe(F){d[F]!==!1&&(n.disable(F),d[F]=!1)}function Qe(F,Se){return p[F]!==Se?(n.bindFramebuffer(F,Se),p[F]=Se,i&&(F===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=Se),F===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=Se)),!0):!1}function x(F,Se){let Ee=v,Oe=!1;if(F)if(Ee=_.get(Se),Ee===void 0&&(Ee=[],_.set(Se,Ee)),F.isWebGLMultipleRenderTargets){const Me=F.texture;if(Ee.length!==Me.length||Ee[0]!==n.COLOR_ATTACHMENT0){for(let it=0,rt=Me.length;it<rt;it++)Ee[it]=n.COLOR_ATTACHMENT0+it;Ee.length=Me.length,Oe=!0}}else Ee[0]!==n.COLOR_ATTACHMENT0&&(Ee[0]=n.COLOR_ATTACHMENT0,Oe=!0);else Ee[0]!==n.BACK&&(Ee[0]=n.BACK,Oe=!0);Oe&&(t.isWebGL2?n.drawBuffers(Ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ee))}function I(F){return m!==F?(n.useProgram(F),m=F,!0):!1}const O={[Bi]:n.FUNC_ADD,[Jm]:n.FUNC_SUBTRACT,[Qm]:n.FUNC_REVERSE_SUBTRACT};if(i)O[yc]=n.MIN,O[Sc]=n.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(O[yc]=F.MIN_EXT,O[Sc]=F.MAX_EXT)}const q={[eg]:n.ZERO,[tg]:n.ONE,[ng]:n.SRC_COLOR,[el]:n.SRC_ALPHA,[lg]:n.SRC_ALPHA_SATURATE,[og]:n.DST_COLOR,[rg]:n.DST_ALPHA,[ig]:n.ONE_MINUS_SRC_COLOR,[tl]:n.ONE_MINUS_SRC_ALPHA,[ag]:n.ONE_MINUS_DST_COLOR,[sg]:n.ONE_MINUS_DST_ALPHA,[cg]:n.CONSTANT_COLOR,[ug]:n.ONE_MINUS_CONSTANT_COLOR,[fg]:n.CONSTANT_ALPHA,[hg]:n.ONE_MINUS_CONSTANT_ALPHA};function V(F,Se,Ee,Oe,Me,it,rt,mt,It,st){if(F===Jn){h===!0&&(Fe(n.BLEND),h=!1);return}if(h===!1&&(Ve(n.BLEND),h=!0),F!==Zm){if(F!==E||st!==K){if((S!==Bi||D!==Bi)&&(n.blendEquation(n.FUNC_ADD),S=Bi,D=Bi),st)switch(F){case Vi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rn:n.blendFunc(n.ONE,n.ONE);break;case xc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case xc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}b=null,N=null,R=null,j=null,T.set(0,0,0),w=0,E=F,K=st}return}Me=Me||Se,it=it||Ee,rt=rt||Oe,(Se!==S||Me!==D)&&(n.blendEquationSeparate(O[Se],O[Me]),S=Se,D=Me),(Ee!==b||Oe!==N||it!==R||rt!==j)&&(n.blendFuncSeparate(q[Ee],q[Oe],q[it],q[rt]),b=Ee,N=Oe,R=it,j=rt),(mt.equals(T)===!1||It!==w)&&(n.blendColor(mt.r,mt.g,mt.b,It),T.copy(mt),w=It),E=F,K=!1}function ie(F,Se){F.side===hn?Fe(n.CULL_FACE):Ve(n.CULL_FACE);let Ee=F.side===en;Se&&(Ee=!Ee),se(Ee),F.blending===Vi&&F.transparent===!1?V(Jn):V(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),o.setMask(F.colorWrite);const Oe=F.stencilWrite;c.setTest(Oe),Oe&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),L(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Ve(n.SAMPLE_ALPHA_TO_COVERAGE):Fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function se(F){re!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),re=F)}function y(F){F!==Ym?(Ve(n.CULL_FACE),F!==xe&&(F===vc?n.cullFace(n.BACK):F===Km?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Fe(n.CULL_FACE),xe=F}function g(F){F!==B&&(Q&&n.lineWidth(F),B=F)}function L(F,Se,Ee){F?(Ve(n.POLYGON_OFFSET_FILL),(X!==Se||J!==Ee)&&(n.polygonOffset(Se,Ee),X=Se,J=Ee)):Fe(n.POLYGON_OFFSET_FILL)}function k(F){F?Ve(n.SCISSOR_TEST):Fe(n.SCISSOR_TEST)}function z(F){F===void 0&&(F=n.TEXTURE0+ne-1),_e!==F&&(n.activeTexture(F),_e=F)}function W(F,Se,Ee){Ee===void 0&&(_e===null?Ee=n.TEXTURE0+ne-1:Ee=_e);let Oe=ge[Ee];Oe===void 0&&(Oe={type:void 0,texture:void 0},ge[Ee]=Oe),(Oe.type!==F||Oe.texture!==Se)&&(_e!==Ee&&(n.activeTexture(Ee),_e=Ee),n.bindTexture(F,Se||He[F]),Oe.type=F,Oe.texture=Se)}function he(){const F=ge[_e];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function le(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function P(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ue(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pe(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(F){Ce.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Ce.copy(F))}function je(F){Ue.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Ue.copy(F))}function We(F,Se){let Ee=f.get(Se);Ee===void 0&&(Ee=new WeakMap,f.set(Se,Ee));let Oe=Ee.get(F);Oe===void 0&&(Oe=n.getUniformBlockIndex(Se,F.name),Ee.set(F,Oe))}function $e(F,Se){const Oe=f.get(Se).get(F);u.get(Se)!==Oe&&(n.uniformBlockBinding(Se,Oe,F.__bindingPointIndex),u.set(Se,Oe))}function be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},_e=null,ge={},p={},_=new WeakMap,v=[],m=null,h=!1,E=null,S=null,b=null,N=null,D=null,R=null,j=null,T=new Ye(0,0,0),w=0,K=!1,re=null,xe=null,B=null,X=null,J=null,Ce.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ve,disable:Fe,bindFramebuffer:Qe,drawBuffers:x,useProgram:I,setBlending:V,setMaterial:ie,setFlipSided:se,setCullFace:y,setLineWidth:g,setPolygonOffset:L,setScissorTest:k,activeTexture:z,bindTexture:W,unbindTexture:he,compressedTexImage2D:le,compressedTexImage3D:ve,texImage2D:pe,texImage3D:ce,updateUBOMapping:We,uniformBlockBinding:$e,texStorage2D:P,texStorage3D:ue,texSubImage2D:Ae,texSubImage3D:ye,compressedTexSubImage2D:oe,compressedTexSubImage3D:ze,scissor:Re,viewport:je,reset:be}}function iy(n,e,t,i,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(y,g){return p?new OffscreenCanvas(y,g):Uo("canvas")}function v(y,g,L,k){let z=1;if((y.width>k||y.height>k)&&(z=k/Math.max(y.width,y.height)),z<1||g===!0)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap){const W=g?Do:Math.floor,he=W(z*y.width),le=W(z*y.height);f===void 0&&(f=_(he,le));const ve=L?_(he,le):f;return ve.width=he,ve.height=le,ve.getContext("2d").drawImage(y,0,0,he,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+he+"x"+le+")."),ve}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),y;return y}function m(y){return ll(y.width)&&ll(y.height)}function h(y){return o?!1:y.wrapS!==wn||y.wrapT!==wn||y.minFilter!==$t&&y.minFilter!==_n}function E(y,g){return y.generateMipmaps&&g&&y.minFilter!==$t&&y.minFilter!==_n}function S(y){n.generateMipmap(y)}function b(y,g,L,k,z=!1){if(o===!1)return g;if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let W=g;if(g===n.RED&&(L===n.FLOAT&&(W=n.R32F),L===n.HALF_FLOAT&&(W=n.R16F),L===n.UNSIGNED_BYTE&&(W=n.R8)),g===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(W=n.R8UI),L===n.UNSIGNED_SHORT&&(W=n.R16UI),L===n.UNSIGNED_INT&&(W=n.R32UI),L===n.BYTE&&(W=n.R8I),L===n.SHORT&&(W=n.R16I),L===n.INT&&(W=n.R32I)),g===n.RG&&(L===n.FLOAT&&(W=n.RG32F),L===n.HALF_FLOAT&&(W=n.RG16F),L===n.UNSIGNED_BYTE&&(W=n.RG8)),g===n.RGBA){const he=z?Co:dt.getTransfer(k);L===n.FLOAT&&(W=n.RGBA32F),L===n.HALF_FLOAT&&(W=n.RGBA16F),L===n.UNSIGNED_BYTE&&(W=he===yt?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function N(y,g,L){return E(y,L)===!0||y.isFramebufferTexture&&y.minFilter!==$t&&y.minFilter!==_n?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function D(y){return y===$t||y===Ec||y===ca?n.NEAREST:n.LINEAR}function R(y){const g=y.target;g.removeEventListener("dispose",R),T(g),g.isVideoTexture&&u.delete(g)}function j(y){const g=y.target;g.removeEventListener("dispose",j),K(g)}function T(y){const g=i.get(y);if(g.__webglInit===void 0)return;const L=y.source,k=d.get(L);if(k){const z=k[g.__cacheKey];z.usedTimes--,z.usedTimes===0&&w(y),Object.keys(k).length===0&&d.delete(L)}i.remove(y)}function w(y){const g=i.get(y);n.deleteTexture(g.__webglTexture);const L=y.source,k=d.get(L);delete k[g.__cacheKey],a.memory.textures--}function K(y){const g=y.texture,L=i.get(y),k=i.get(g);if(k.__webglTexture!==void 0&&(n.deleteTexture(k.__webglTexture),a.memory.textures--),y.depthTexture&&y.depthTexture.dispose(),y.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(L.__webglFramebuffer[z]))for(let W=0;W<L.__webglFramebuffer[z].length;W++)n.deleteFramebuffer(L.__webglFramebuffer[z][W]);else n.deleteFramebuffer(L.__webglFramebuffer[z]);L.__webglDepthbuffer&&n.deleteRenderbuffer(L.__webglDepthbuffer[z])}else{if(Array.isArray(L.__webglFramebuffer))for(let z=0;z<L.__webglFramebuffer.length;z++)n.deleteFramebuffer(L.__webglFramebuffer[z]);else n.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&n.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&n.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let z=0;z<L.__webglColorRenderbuffer.length;z++)L.__webglColorRenderbuffer[z]&&n.deleteRenderbuffer(L.__webglColorRenderbuffer[z]);L.__webglDepthRenderbuffer&&n.deleteRenderbuffer(L.__webglDepthRenderbuffer)}if(y.isWebGLMultipleRenderTargets)for(let z=0,W=g.length;z<W;z++){const he=i.get(g[z]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),a.memory.textures--),i.remove(g[z])}i.remove(g),i.remove(y)}let re=0;function xe(){re=0}function B(){const y=re;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),re+=1,y}function X(y){const g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function J(y,g){const L=i.get(y);if(y.isVideoTexture&&ie(y),y.isRenderTargetTexture===!1&&y.version>0&&L.__version!==y.version){const k=y.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(L,y,g);return}}t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+g)}function ne(y,g){const L=i.get(y);if(y.version>0&&L.__version!==y.version){Ce(L,y,g);return}t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+g)}function Q(y,g){const L=i.get(y);if(y.version>0&&L.__version!==y.version){Ce(L,y,g);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+g)}function ae(y,g){const L=i.get(y);if(y.version>0&&L.__version!==y.version){Ue(L,y,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+g)}const fe={[rl]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[sl]:n.MIRRORED_REPEAT},_e={[$t]:n.NEAREST,[Ec]:n.NEAREST_MIPMAP_NEAREST,[ca]:n.NEAREST_MIPMAP_LINEAR,[_n]:n.LINEAR,[wg]:n.LINEAR_MIPMAP_NEAREST,[bs]:n.LINEAR_MIPMAP_LINEAR},ge={[zg]:n.NEVER,[Xg]:n.ALWAYS,[Hg]:n.LESS,[Lh]:n.LEQUAL,[Gg]:n.EQUAL,[Wg]:n.GEQUAL,[Vg]:n.GREATER,[kg]:n.NOTEQUAL};function te(y,g,L){if(L?(n.texParameteri(y,n.TEXTURE_WRAP_S,fe[g.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,fe[g.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,fe[g.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,_e[g.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,_e[g.minFilter])):(n.texParameteri(y,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(y,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(g.wrapS!==wn||g.wrapT!==wn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(y,n.TEXTURE_MAG_FILTER,D(g.magFilter)),n.texParameteri(y,n.TEXTURE_MIN_FILTER,D(g.minFilter)),g.minFilter!==$t&&g.minFilter!==_n&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),g.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,ge[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");if(g.magFilter===$t||g.minFilter!==ca&&g.minFilter!==bs||g.type===vi&&e.has("OES_texture_float_linear")===!1||o===!1&&g.type===Qn&&e.has("OES_texture_half_float_linear")===!1)return;(g.anisotropy>1||i.get(g).__currentAnisotropy)&&(n.texParameterf(y,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy)}}function de(y,g){let L=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",R));const k=g.source;let z=d.get(k);z===void 0&&(z={},d.set(k,z));const W=X(g);if(W!==y.__cacheKey){z[W]===void 0&&(z[W]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),z[W].usedTimes++;const he=z[y.__cacheKey];he!==void 0&&(z[y.__cacheKey].usedTimes--,he.usedTimes===0&&w(g)),y.__cacheKey=W,y.__webglTexture=z[W].texture}return L}function Ce(y,g,L){let k=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=n.TEXTURE_3D);const z=de(y,g),W=g.source;t.bindTexture(k,y.__webglTexture,n.TEXTURE0+L);const he=i.get(W);if(W.version!==he.__version||z===!0){t.activeTexture(n.TEXTURE0+L);const le=dt.getPrimaries(dt.workingColorSpace),ve=g.colorSpace===Mn?null:dt.getPrimaries(g.colorSpace),Ae=g.colorSpace===Mn||le===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const ye=h(g)&&m(g.image)===!1;let oe=v(g.image,ye,!1,r.maxTextureSize);oe=se(g,oe);const ze=m(oe)||o,P=s.convert(g.format,g.colorSpace);let ue=s.convert(g.type),pe=b(g.internalFormat,P,ue,g.colorSpace,g.isVideoTexture);te(k,g,ze);let ce;const Re=g.mipmaps,je=o&&g.isVideoTexture!==!0&&pe!==Ch,We=he.__version===void 0||z===!0,$e=N(g,oe,ze);if(g.isDepthTexture)pe=n.DEPTH_COMPONENT,o?g.type===vi?pe=n.DEPTH_COMPONENT32F:g.type===_i?pe=n.DEPTH_COMPONENT24:g.type===ki?pe=n.DEPTH24_STENCIL8:pe=n.DEPTH_COMPONENT16:g.type===vi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),g.format===Wi&&pe===n.DEPTH_COMPONENT&&g.type!==Il&&g.type!==_i&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),g.type=_i,ue=s.convert(g.type)),g.format===Gr&&pe===n.DEPTH_COMPONENT&&(pe=n.DEPTH_STENCIL,g.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),g.type=ki,ue=s.convert(g.type))),We&&(je?t.texStorage2D(n.TEXTURE_2D,1,pe,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,pe,oe.width,oe.height,0,P,ue,null));else if(g.isDataTexture)if(Re.length>0&&ze){je&&We&&t.texStorage2D(n.TEXTURE_2D,$e,pe,Re[0].width,Re[0].height);for(let be=0,F=Re.length;be<F;be++)ce=Re[be],je?t.texSubImage2D(n.TEXTURE_2D,be,0,0,ce.width,ce.height,P,ue,ce.data):t.texImage2D(n.TEXTURE_2D,be,pe,ce.width,ce.height,0,P,ue,ce.data);g.generateMipmaps=!1}else je?(We&&t.texStorage2D(n.TEXTURE_2D,$e,pe,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe.width,oe.height,P,ue,oe.data)):t.texImage2D(n.TEXTURE_2D,0,pe,oe.width,oe.height,0,P,ue,oe.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){je&&We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,$e,pe,Re[0].width,Re[0].height,oe.depth);for(let be=0,F=Re.length;be<F;be++)ce=Re[be],g.format!==Cn?P!==null?je?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,ce.width,ce.height,oe.depth,P,ce.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,be,pe,ce.width,ce.height,oe.depth,0,ce.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,ce.width,ce.height,oe.depth,P,ue,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,be,pe,ce.width,ce.height,oe.depth,0,P,ue,ce.data)}else{je&&We&&t.texStorage2D(n.TEXTURE_2D,$e,pe,Re[0].width,Re[0].height);for(let be=0,F=Re.length;be<F;be++)ce=Re[be],g.format!==Cn?P!==null?je?t.compressedTexSubImage2D(n.TEXTURE_2D,be,0,0,ce.width,ce.height,P,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,be,pe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage2D(n.TEXTURE_2D,be,0,0,ce.width,ce.height,P,ue,ce.data):t.texImage2D(n.TEXTURE_2D,be,pe,ce.width,ce.height,0,P,ue,ce.data)}else if(g.isDataArrayTexture)je?(We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,$e,pe,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,P,ue,oe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,pe,oe.width,oe.height,oe.depth,0,P,ue,oe.data);else if(g.isData3DTexture)je?(We&&t.texStorage3D(n.TEXTURE_3D,$e,pe,oe.width,oe.height,oe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,P,ue,oe.data)):t.texImage3D(n.TEXTURE_3D,0,pe,oe.width,oe.height,oe.depth,0,P,ue,oe.data);else if(g.isFramebufferTexture){if(We)if(je)t.texStorage2D(n.TEXTURE_2D,$e,pe,oe.width,oe.height);else{let be=oe.width,F=oe.height;for(let Se=0;Se<$e;Se++)t.texImage2D(n.TEXTURE_2D,Se,pe,be,F,0,P,ue,null),be>>=1,F>>=1}}else if(Re.length>0&&ze){je&&We&&t.texStorage2D(n.TEXTURE_2D,$e,pe,Re[0].width,Re[0].height);for(let be=0,F=Re.length;be<F;be++)ce=Re[be],je?t.texSubImage2D(n.TEXTURE_2D,be,0,0,P,ue,ce):t.texImage2D(n.TEXTURE_2D,be,pe,P,ue,ce);g.generateMipmaps=!1}else je?(We&&t.texStorage2D(n.TEXTURE_2D,$e,pe,oe.width,oe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,P,ue,oe)):t.texImage2D(n.TEXTURE_2D,0,pe,P,ue,oe);E(g,ze)&&S(k),he.__version=W.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function Ue(y,g,L){if(g.image.length!==6)return;const k=de(y,g),z=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+L);const W=i.get(z);if(z.version!==W.__version||k===!0){t.activeTexture(n.TEXTURE0+L);const he=dt.getPrimaries(dt.workingColorSpace),le=g.colorSpace===Mn?null:dt.getPrimaries(g.colorSpace),ve=g.colorSpace===Mn||he===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ae=g.isCompressedTexture||g.image[0].isCompressedTexture,ye=g.image[0]&&g.image[0].isDataTexture,oe=[];for(let be=0;be<6;be++)!Ae&&!ye?oe[be]=v(g.image[be],!1,!0,r.maxCubemapSize):oe[be]=ye?g.image[be].image:g.image[be],oe[be]=se(g,oe[be]);const ze=oe[0],P=m(ze)||o,ue=s.convert(g.format,g.colorSpace),pe=s.convert(g.type),ce=b(g.internalFormat,ue,pe,g.colorSpace),Re=o&&g.isVideoTexture!==!0,je=W.__version===void 0||k===!0;let We=N(g,ze,P);te(n.TEXTURE_CUBE_MAP,g,P);let $e;if(Ae){Re&&je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,We,ce,ze.width,ze.height);for(let be=0;be<6;be++){$e=oe[be].mipmaps;for(let F=0;F<$e.length;F++){const Se=$e[F];g.format!==Cn?ue!==null?Re?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F,0,0,Se.width,Se.height,ue,Se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F,ce,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F,0,0,Se.width,Se.height,ue,pe,Se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F,ce,Se.width,Se.height,0,ue,pe,Se.data)}}}else{$e=g.mipmaps,Re&&je&&($e.length>0&&We++,t.texStorage2D(n.TEXTURE_CUBE_MAP,We,ce,oe[0].width,oe[0].height));for(let be=0;be<6;be++)if(ye){Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,oe[be].width,oe[be].height,ue,pe,oe[be].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,ce,oe[be].width,oe[be].height,0,ue,pe,oe[be].data);for(let F=0;F<$e.length;F++){const Ee=$e[F].image[be].image;Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F+1,0,0,Ee.width,Ee.height,ue,pe,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F+1,ce,Ee.width,Ee.height,0,ue,pe,Ee.data)}}else{Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,ue,pe,oe[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,ce,ue,pe,oe[be]);for(let F=0;F<$e.length;F++){const Se=$e[F];Re?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F+1,0,0,ue,pe,Se.image[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,F+1,ce,ue,pe,Se.image[be])}}}E(g,P)&&S(n.TEXTURE_CUBE_MAP),W.__version=z.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function Le(y,g,L,k,z,W){const he=s.convert(L.format,L.colorSpace),le=s.convert(L.type),ve=b(L.internalFormat,he,le,L.colorSpace);if(!i.get(g).__hasExternalTextures){const ye=Math.max(1,g.width>>W),oe=Math.max(1,g.height>>W);z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?t.texImage3D(z,W,ve,ye,oe,g.depth,0,he,le,null):t.texImage2D(z,W,ve,ye,oe,0,he,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),V(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,z,i.get(L).__webglTexture,0,q(g)):(z===n.TEXTURE_2D||z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,z,i.get(L).__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function He(y,g,L){if(n.bindRenderbuffer(n.RENDERBUFFER,y),g.depthBuffer&&!g.stencilBuffer){let k=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(L||V(g)){const z=g.depthTexture;z&&z.isDepthTexture&&(z.type===vi?k=n.DEPTH_COMPONENT32F:z.type===_i&&(k=n.DEPTH_COMPONENT24));const W=q(g);V(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,W,k,g.width,g.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,W,k,g.width,g.height)}else n.renderbufferStorage(n.RENDERBUFFER,k,g.width,g.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,y)}else if(g.depthBuffer&&g.stencilBuffer){const k=q(g);L&&V(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,k,n.DEPTH24_STENCIL8,g.width,g.height):V(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,k,n.DEPTH24_STENCIL8,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,y)}else{const k=g.isWebGLMultipleRenderTargets===!0?g.texture:[g.texture];for(let z=0;z<k.length;z++){const W=k[z],he=s.convert(W.format,W.colorSpace),le=s.convert(W.type),ve=b(W.internalFormat,he,le,W.colorSpace),Ae=q(g);L&&V(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,ve,g.width,g.height):V(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae,ve,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ve,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ve(y,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(g.depthTexture).__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),J(g.depthTexture,0);const k=i.get(g.depthTexture).__webglTexture,z=q(g);if(g.depthTexture.format===Wi)V(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0,z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0);else if(g.depthTexture.format===Gr)V(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0,z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function Fe(y){const g=i.get(y),L=y.isWebGLCubeRenderTarget===!0;if(y.depthTexture&&!g.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");Ve(g.__webglFramebuffer,y)}else if(L){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]=n.createRenderbuffer(),He(g.__webglDepthbuffer[k],y,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer=n.createRenderbuffer(),He(g.__webglDepthbuffer,y,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Qe(y,g,L){const k=i.get(y);g!==void 0&&Le(k.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&Fe(y)}function x(y){const g=y.texture,L=i.get(y),k=i.get(g);y.addEventListener("dispose",j),y.isWebGLMultipleRenderTargets!==!0&&(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=g.version,a.memory.textures++);const z=y.isWebGLCubeRenderTarget===!0,W=y.isWebGLMultipleRenderTargets===!0,he=m(y)||o;if(z){L.__webglFramebuffer=[];for(let le=0;le<6;le++)if(o&&g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer[le]=[];for(let ve=0;ve<g.mipmaps.length;ve++)L.__webglFramebuffer[le][ve]=n.createFramebuffer()}else L.__webglFramebuffer[le]=n.createFramebuffer()}else{if(o&&g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer=[];for(let le=0;le<g.mipmaps.length;le++)L.__webglFramebuffer[le]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(W)if(r.drawBuffers){const le=y.texture;for(let ve=0,Ae=le.length;ve<Ae;ve++){const ye=i.get(le[ve]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&y.samples>0&&V(y)===!1){const le=W?g:[g];L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let ve=0;ve<le.length;ve++){const Ae=le[ve];L.__webglColorRenderbuffer[ve]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[ve]);const ye=s.convert(Ae.format,Ae.colorSpace),oe=s.convert(Ae.type),ze=b(Ae.internalFormat,ye,oe,Ae.colorSpace,y.isXRRenderTarget===!0),P=q(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,P,ze,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,L.__webglColorRenderbuffer[ve])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),He(L.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(z){t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),te(n.TEXTURE_CUBE_MAP,g,he);for(let le=0;le<6;le++)if(o&&g.mipmaps&&g.mipmaps.length>0)for(let ve=0;ve<g.mipmaps.length;ve++)Le(L.__webglFramebuffer[le][ve],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,ve);else Le(L.__webglFramebuffer[le],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);E(g,he)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(W){const le=y.texture;for(let ve=0,Ae=le.length;ve<Ae;ve++){const ye=le[ve],oe=i.get(ye);t.bindTexture(n.TEXTURE_2D,oe.__webglTexture),te(n.TEXTURE_2D,ye,he),Le(L.__webglFramebuffer,y,ye,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,0),E(ye,he)&&S(n.TEXTURE_2D)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(o?le=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,k.__webglTexture),te(le,g,he),o&&g.mipmaps&&g.mipmaps.length>0)for(let ve=0;ve<g.mipmaps.length;ve++)Le(L.__webglFramebuffer[ve],y,g,n.COLOR_ATTACHMENT0,le,ve);else Le(L.__webglFramebuffer,y,g,n.COLOR_ATTACHMENT0,le,0);E(g,he)&&S(le),t.unbindTexture()}y.depthBuffer&&Fe(y)}function I(y){const g=m(y)||o,L=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let k=0,z=L.length;k<z;k++){const W=L[k];if(E(W,g)){const he=y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,le=i.get(W).__webglTexture;t.bindTexture(he,le),S(he),t.unbindTexture()}}}function O(y){if(o&&y.samples>0&&V(y)===!1){const g=y.isWebGLMultipleRenderTargets?y.texture:[y.texture],L=y.width,k=y.height;let z=n.COLOR_BUFFER_BIT;const W=[],he=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=i.get(y),ve=y.isWebGLMultipleRenderTargets===!0;if(ve)for(let Ae=0;Ae<g.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Ae=0;Ae<g.length;Ae++){W.push(n.COLOR_ATTACHMENT0+Ae),y.depthBuffer&&W.push(he);const ye=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(ye===!1&&(y.depthBuffer&&(z|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&(z|=n.STENCIL_BUFFER_BIT)),ve&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,le.__webglColorRenderbuffer[Ae]),ye===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[he]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[he])),ve){const oe=i.get(g[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,L,k,0,0,L,k,z,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,W)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ve)for(let Ae=0;Ae<g.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,le.__webglColorRenderbuffer[Ae]);const ye=i.get(g[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function q(y){return Math.min(r.maxSamples,y.samples)}function V(y){const g=i.get(y);return o&&y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function ie(y){const g=a.render.frame;u.get(y)!==g&&(u.set(y,g),y.update())}function se(y,g){const L=y.colorSpace,k=y.format,z=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||y.format===al||L!==ii&&L!==Mn&&(dt.getTransfer(L)===yt?o===!1?e.has("EXT_sRGB")===!0&&k===Cn?(y.format=al,y.minFilter=_n,y.generateMipmaps=!1):g=Uh.sRGBToLinear(g):(k!==Cn||z!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),g}this.allocateTextureUnit=B,this.resetTextureUnits=xe,this.setTexture2D=J,this.setTexture2DArray=ne,this.setTexture3D=Q,this.setTextureCube=ae,this.rebindTextures=Qe,this.setupRenderTarget=x,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=V}function ry(n,e,t){const i=t.isWebGL2;function r(s,a=Mn){let o;const l=dt.getTransfer(a);if(s===Si)return n.UNSIGNED_BYTE;if(s===Eh)return n.UNSIGNED_SHORT_4_4_4_4;if(s===bh)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Cg)return n.BYTE;if(s===Rg)return n.SHORT;if(s===Il)return n.UNSIGNED_SHORT;if(s===Sh)return n.INT;if(s===_i)return n.UNSIGNED_INT;if(s===vi)return n.FLOAT;if(s===Qn)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Pg)return n.ALPHA;if(s===Cn)return n.RGBA;if(s===Lg)return n.LUMINANCE;if(s===Dg)return n.LUMINANCE_ALPHA;if(s===Wi)return n.DEPTH_COMPONENT;if(s===Gr)return n.DEPTH_STENCIL;if(s===al)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Ug)return n.RED;if(s===Th)return n.RED_INTEGER;if(s===Ig)return n.RG;if(s===Ah)return n.RG_INTEGER;if(s===wh)return n.RGBA_INTEGER;if(s===ua||s===fa||s===ha||s===da)if(l===yt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===ua)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===fa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ha)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===da)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===ua)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===fa)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ha)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===da)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===bc||s===Tc||s===Ac||s===wc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===bc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Tc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ac)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===wc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ch)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Cc||s===Rc)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Cc)return l===yt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Rc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Pc||s===Lc||s===Dc||s===Uc||s===Ic||s===Nc||s===Fc||s===Oc||s===Bc||s===zc||s===Hc||s===Gc||s===Vc||s===kc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Pc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Lc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Dc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Uc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ic)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Nc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Fc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Oc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Bc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===zc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Hc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Gc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Vc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===kc)return l===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===pa||s===Wc||s===Xc)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===pa)return l===yt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Xc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Ng||s===qc||s===jc||s===Yc)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===pa)return o.COMPRESSED_RED_RGTC1_EXT;if(s===qc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Yc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ki?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class sy extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class xi extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const oy={type:"move"};class Oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),h=this._getHandJoint(c,v);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&d>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(oy)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new xi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class ay extends ji{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,_=null;const v=t.getContextAttributes();let m=null,h=null;const E=[],S=[],b=new De;let N=null;const D=new fn;D.layers.enable(1),D.viewport=new Tt;const R=new fn;R.layers.enable(2),R.viewport=new Tt;const j=[D,R],T=new sy;T.layers.enable(1),T.layers.enable(2);let w=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let de=E[te];return de===void 0&&(de=new Oa,E[te]=de),de.getTargetRaySpace()},this.getControllerGrip=function(te){let de=E[te];return de===void 0&&(de=new Oa,E[te]=de),de.getGripSpace()},this.getHand=function(te){let de=E[te];return de===void 0&&(de=new Oa,E[te]=de),de.getHandSpace()};function re(te){const de=S.indexOf(te.inputSource);if(de===-1)return;const Ce=E[de];Ce!==void 0&&(Ce.update(te.inputSource,te.frame,c||a),Ce.dispatchEvent({type:te.type,data:te.inputSource}))}function xe(){r.removeEventListener("select",re),r.removeEventListener("selectstart",re),r.removeEventListener("selectend",re),r.removeEventListener("squeeze",re),r.removeEventListener("squeezestart",re),r.removeEventListener("squeezeend",re),r.removeEventListener("end",xe),r.removeEventListener("inputsourceschange",B);for(let te=0;te<E.length;te++){const de=S[te];de!==null&&(S[te]=null,E[te].disconnect(de))}w=null,K=null,e.setRenderTarget(m),p=null,d=null,f=null,r=null,h=null,ge.stop(),i.isPresenting=!1,e.setPixelRatio(N),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",re),r.addEventListener("selectstart",re),r.addEventListener("selectend",re),r.addEventListener("squeeze",re),r.addEventListener("squeezestart",re),r.addEventListener("squeezeend",re),r.addEventListener("end",xe),r.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const de={antialias:r.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,de),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),h=new Pn(p.framebufferWidth,p.framebufferHeight,{format:Cn,type:Si,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let de=null,Ce=null,Ue=null;v.depth&&(Ue=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=v.stencil?Gr:Wi,Ce=v.stencil?ki:_i);const Le={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(Le),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),h=new Pn(d.textureWidth,d.textureHeight,{format:Cn,type:Si,depthTexture:new Wh(d.textureWidth,d.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const He=e.properties.get(h);He.__ignoreDepthValues=d.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ge.setContext(r),ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function B(te){for(let de=0;de<te.removed.length;de++){const Ce=te.removed[de],Ue=S.indexOf(Ce);Ue>=0&&(S[Ue]=null,E[Ue].disconnect(Ce))}for(let de=0;de<te.added.length;de++){const Ce=te.added[de];let Ue=S.indexOf(Ce);if(Ue===-1){for(let He=0;He<E.length;He++)if(He>=S.length){S.push(Ce),Ue=He;break}else if(S[He]===null){S[He]=Ce,Ue=He;break}if(Ue===-1)break}const Le=E[Ue];Le&&Le.connect(Ce)}}const X=new U,J=new U;function ne(te,de,Ce){X.setFromMatrixPosition(de.matrixWorld),J.setFromMatrixPosition(Ce.matrixWorld);const Ue=X.distanceTo(J),Le=de.projectionMatrix.elements,He=Ce.projectionMatrix.elements,Ve=Le[14]/(Le[10]-1),Fe=Le[14]/(Le[10]+1),Qe=(Le[9]+1)/Le[5],x=(Le[9]-1)/Le[5],I=(Le[8]-1)/Le[0],O=(He[8]+1)/He[0],q=Ve*I,V=Ve*O,ie=Ue/(-I+O),se=ie*-I;de.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(se),te.translateZ(ie),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert();const y=Ve+ie,g=Fe+ie,L=q-se,k=V+(Ue-se),z=Qe*Fe/g*y,W=x*Fe/g*y;te.projectionMatrix.makePerspective(L,k,z,W,y,g),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}function Q(te,de){de===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(de.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;T.near=R.near=D.near=te.near,T.far=R.far=D.far=te.far,(w!==T.near||K!==T.far)&&(r.updateRenderState({depthNear:T.near,depthFar:T.far}),w=T.near,K=T.far);const de=te.parent,Ce=T.cameras;Q(T,de);for(let Ue=0;Ue<Ce.length;Ue++)Q(Ce[Ue],de);Ce.length===2?ne(T,D,R):T.projectionMatrix.copy(D.projectionMatrix),ae(te,T,de)};function ae(te,de,Ce){Ce===null?te.matrix.copy(de.matrixWorld):(te.matrix.copy(Ce.matrixWorld),te.matrix.invert(),te.matrix.multiply(de.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(de.projectionMatrix),te.projectionMatrixInverse.copy(de.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Ts*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(te){l=te,d!==null&&(d.fixedFoveation=te),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=te)};let fe=null;function _e(te,de){if(u=de.getViewerPose(c||a),_=de,u!==null){const Ce=u.views;p!==null&&(e.setRenderTargetFramebuffer(h,p.framebuffer),e.setRenderTarget(h));let Ue=!1;Ce.length!==T.cameras.length&&(T.cameras.length=0,Ue=!0);for(let Le=0;Le<Ce.length;Le++){const He=Ce[Le];let Ve=null;if(p!==null)Ve=p.getViewport(He);else{const Qe=f.getViewSubImage(d,He);Ve=Qe.viewport,Le===0&&(e.setRenderTargetTextures(h,Qe.colorTexture,d.ignoreDepthValues?void 0:Qe.depthStencilTexture),e.setRenderTarget(h))}let Fe=j[Le];Fe===void 0&&(Fe=new fn,Fe.layers.enable(Le),Fe.viewport=new Tt,j[Le]=Fe),Fe.matrix.fromArray(He.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(He.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Le===0&&(T.matrix.copy(Fe.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),Ue===!0&&T.cameras.push(Fe)}}for(let Ce=0;Ce<E.length;Ce++){const Ue=S[Ce],Le=E[Ce];Ue!==null&&Le!==void 0&&Le.update(Ue,de,c||a)}fe&&fe(te,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),_=null}const ge=new Vh;ge.setAnimationLoop(_e),this.setAnimationLoop=function(te){fe=te},this.dispose=function(){}}}function ly(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,zh(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,E,S,b){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,b)):h.isMeshMatcapMaterial?(s(m,h),_(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),v(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,E,S):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===en&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===en&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const E=e.get(h).envMap;if(E&&(m.envMap.value=E,m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap){m.lightMap.value=h.lightMap;const S=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=h.lightMapIntensity*S,t(h.lightMap,m.lightMapTransform)}h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,E,S){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*E,m.scale.value=S*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),e.get(h).envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,E){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===en&&m.clearcoatNormalScale.value.negate())),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,h){h.matcap&&(m.matcap.value=h.matcap)}function v(m,h){const E=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function cy(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,S){const b=S.program;i.uniformBlockBinding(E,b)}function c(E,S){let b=r[E.id];b===void 0&&(_(E),b=u(E),r[E.id]=b,E.addEventListener("dispose",m));const N=S.program;i.updateUBOMapping(E,N);const D=e.render.frame;s[E.id]!==D&&(d(E),s[E.id]=D)}function u(E){const S=f();E.__bindingPointIndex=S;const b=n.createBuffer(),N=E.__size,D=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,N,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,b),b}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const S=r[E.id],b=E.uniforms,N=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let D=0,R=b.length;D<R;D++){const j=Array.isArray(b[D])?b[D]:[b[D]];for(let T=0,w=j.length;T<w;T++){const K=j[T];if(p(K,D,T,N)===!0){const re=K.__offset,xe=Array.isArray(K.value)?K.value:[K.value];let B=0;for(let X=0;X<xe.length;X++){const J=xe[X],ne=v(J);typeof J=="number"||typeof J=="boolean"?(K.__data[0]=J,n.bufferSubData(n.UNIFORM_BUFFER,re+B,K.__data)):J.isMatrix3?(K.__data[0]=J.elements[0],K.__data[1]=J.elements[1],K.__data[2]=J.elements[2],K.__data[3]=0,K.__data[4]=J.elements[3],K.__data[5]=J.elements[4],K.__data[6]=J.elements[5],K.__data[7]=0,K.__data[8]=J.elements[6],K.__data[9]=J.elements[7],K.__data[10]=J.elements[8],K.__data[11]=0):(J.toArray(K.__data,B),B+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,re,K.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,S,b,N){const D=E.value,R=S+"_"+b;if(N[R]===void 0)return typeof D=="number"||typeof D=="boolean"?N[R]=D:N[R]=D.clone(),!0;{const j=N[R];if(typeof D=="number"||typeof D=="boolean"){if(j!==D)return N[R]=D,!0}else if(j.equals(D)===!1)return j.copy(D),!0}return!1}function _(E){const S=E.uniforms;let b=0;const N=16;for(let R=0,j=S.length;R<j;R++){const T=Array.isArray(S[R])?S[R]:[S[R]];for(let w=0,K=T.length;w<K;w++){const re=T[w],xe=Array.isArray(re.value)?re.value:[re.value];for(let B=0,X=xe.length;B<X;B++){const J=xe[B],ne=v(J),Q=b%N;Q!==0&&N-Q<ne.boundary&&(b+=N-Q),re.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),re.__offset=b,b+=ne.storage}}}const D=b%N;return D>0&&(b+=N-D),E.__size=b,E.__cache={},this}function v(E){const S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){const S=E.target;S.removeEventListener("dispose",m);const b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function h(){for(const E in r)n.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class $h{constructor(e={}){const{canvas:t=o_(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const p=new Uint32Array(4),_=new Int32Array(4);let v=null,m=null;const h=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this._useLegacyLights=!1,this.toneMapping=yi,this.toneMappingExposure=1;const S=this;let b=!1,N=0,D=0,R=null,j=-1,T=null;const w=new Tt,K=new Tt;let re=null;const xe=new Ye(0);let B=0,X=t.width,J=t.height,ne=1,Q=null,ae=null;const fe=new Tt(0,0,X,J),_e=new Tt(0,0,X,J);let ge=!1;const te=new Bl;let de=!1,Ce=!1,Ue=null;const Le=new pt,He=new De,Ve=new U,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Qe(){return R===null?ne:1}let x=i;function I(A,G){for(let $=0;$<A.length;$++){const ee=A[$],Y=t.getContext(ee,G);if(Y!==null)return Y}return null}try{const A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ul}`),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",Se,!1),x===null){const G=["webgl2","webgl","experimental-webgl"];if(S.isWebGL1Renderer===!0&&G.shift(),x=I(G,A),x===null)throw I(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&x instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),x.getShaderPrecisionFormat===void 0&&(x.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let O,q,V,ie,se,y,g,L,k,z,W,he,le,ve,Ae,ye,oe,ze,P,ue,pe,ce,Re,je;function We(){O=new xx(x),q=new dx(x,O,e),O.init(q),ce=new ry(x,O,q),V=new ny(x,O,q),ie=new Sx(x),se=new VM,y=new iy(x,O,V,se,q,ce,ie),g=new mx(S),L=new vx(S),k=new P_(x,q),Re=new fx(x,O,k,q),z=new Mx(x,k,ie,Re),W=new Ax(x,z,k,ie),P=new Tx(x,q,y),ye=new px(se),he=new GM(S,g,L,O,q,Re,ye),le=new ly(S,se),ve=new WM,Ae=new $M(O,q),ze=new ux(S,g,L,V,W,d,l),oe=new ty(S,W,q),je=new cy(x,ie,q,V),ue=new hx(x,O,ie,q),pe=new yx(x,O,ie,q),ie.programs=he.programs,S.capabilities=q,S.extensions=O,S.properties=se,S.renderLists=ve,S.shadowMap=oe,S.state=V,S.info=ie}We();const $e=new ay(S,x);this.xr=$e,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){const A=O.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=O.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(A){A!==void 0&&(ne=A,this.setSize(X,J,!1))},this.getSize=function(A){return A.set(X,J)},this.setSize=function(A,G,$=!0){if($e.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=A,J=G,t.width=Math.floor(A*ne),t.height=Math.floor(G*ne),$===!0&&(t.style.width=A+"px",t.style.height=G+"px"),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(X*ne,J*ne).floor()},this.setDrawingBufferSize=function(A,G,$){X=A,J=G,ne=$,t.width=Math.floor(A*$),t.height=Math.floor(G*$),this.setViewport(0,0,A,G)},this.getCurrentViewport=function(A){return A.copy(w)},this.getViewport=function(A){return A.copy(fe)},this.setViewport=function(A,G,$,ee){A.isVector4?fe.set(A.x,A.y,A.z,A.w):fe.set(A,G,$,ee),V.viewport(w.copy(fe).multiplyScalar(ne).floor())},this.getScissor=function(A){return A.copy(_e)},this.setScissor=function(A,G,$,ee){A.isVector4?_e.set(A.x,A.y,A.z,A.w):_e.set(A,G,$,ee),V.scissor(K.copy(_e).multiplyScalar(ne).floor())},this.getScissorTest=function(){return ge},this.setScissorTest=function(A){V.setScissorTest(ge=A)},this.setOpaqueSort=function(A){Q=A},this.setTransparentSort=function(A){ae=A},this.getClearColor=function(A){return A.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(A=!0,G=!0,$=!0){let ee=0;if(A){let Y=!1;if(R!==null){const Pe=R.texture.format;Y=Pe===wh||Pe===Ah||Pe===Th}if(Y){const Pe=R.texture.type,Ne=Pe===Si||Pe===_i||Pe===Il||Pe===ki||Pe===Eh||Pe===bh,Ge=ze.getClearColor(),Xe=ze.getClearAlpha(),Je=Ge.r,qe=Ge.g,ke=Ge.b;Ne?(p[0]=Je,p[1]=qe,p[2]=ke,p[3]=Xe,x.clearBufferuiv(x.COLOR,0,p)):(_[0]=Je,_[1]=qe,_[2]=ke,_[3]=Xe,x.clearBufferiv(x.COLOR,0,_))}else ee|=x.COLOR_BUFFER_BIT}G&&(ee|=x.DEPTH_BUFFER_BIT),$&&(ee|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),x.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),ve.dispose(),Ae.dispose(),se.dispose(),g.dispose(),L.dispose(),W.dispose(),Re.dispose(),je.dispose(),he.dispose(),$e.dispose(),$e.removeEventListener("sessionstart",It),$e.removeEventListener("sessionend",st),Ue&&(Ue.dispose(),Ue=null),Et.stop()};function be(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const A=ie.autoReset,G=oe.enabled,$=oe.autoUpdate,ee=oe.needsUpdate,Y=oe.type;We(),ie.autoReset=A,oe.enabled=G,oe.autoUpdate=$,oe.needsUpdate=ee,oe.type=Y}function Se(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ee(A){const G=A.target;G.removeEventListener("dispose",Ee),Oe(G)}function Oe(A){Me(A),se.remove(A)}function Me(A){const G=se.get(A).programs;G!==void 0&&(G.forEach(function($){he.releaseProgram($)}),A.isShaderMaterial&&he.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,$,ee,Y,Pe){G===null&&(G=Fe);const Ne=Y.isMesh&&Y.matrixWorld.determinant()<0,Ge=Us(A,G,$,ee,Y);V.setMaterial(ee,Ne);let Xe=$.index,Je=1;if(ee.wireframe===!0){if(Xe=z.getWireframeAttribute($),Xe===void 0)return;Je=2}const qe=$.drawRange,ke=$.attributes.position;let lt=qe.start*Je,Gt=(qe.start+qe.count)*Je;Pe!==null&&(lt=Math.max(lt,Pe.start*Je),Gt=Math.min(Gt,(Pe.start+Pe.count)*Je)),Xe!==null?(lt=Math.max(lt,0),Gt=Math.min(Gt,Xe.count)):ke!=null&&(lt=Math.max(lt,0),Gt=Math.min(Gt,ke.count));const ft=Gt-lt;if(ft<0||ft===1/0)return;Re.setup(Y,ee,Ge,$,Xe);let mn,gt=ue;if(Xe!==null&&(mn=k.get(Xe),gt=pe,gt.setIndex(mn)),Y.isMesh)ee.wireframe===!0?(V.setLineWidth(ee.wireframeLinewidth*Qe()),gt.setMode(x.LINES)):gt.setMode(x.TRIANGLES);else if(Y.isLine){let Ze=ee.linewidth;Ze===void 0&&(Ze=1),V.setLineWidth(Ze*Qe()),Y.isLineSegments?gt.setMode(x.LINES):Y.isLineLoop?gt.setMode(x.LINE_LOOP):gt.setMode(x.LINE_STRIP)}else Y.isPoints?gt.setMode(x.POINTS):Y.isSprite&&gt.setMode(x.TRIANGLES);if(Y.isBatchedMesh)gt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else if(Y.isInstancedMesh)gt.renderInstances(lt,ft,Y.count);else if($.isInstancedBufferGeometry){const Ze=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Zi=Math.min($.instanceCount,Ze);gt.renderInstances(lt,ft,Zi)}else gt.render(lt,ft)};function it(A,G,$){A.transparent===!0&&A.side===hn&&A.forceSinglePass===!1?(A.side=en,A.needsUpdate=!0,Ri(A,G,$),A.side=Ti,A.needsUpdate=!0,Ri(A,G,$),A.side=hn):Ri(A,G,$)}this.compile=function(A,G,$=null){$===null&&($=A),m=Ae.get($),m.init(),E.push(m),$.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),A!==$&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),m.setupLights(S._useLegacyLights);const ee=new Set;return A.traverse(function(Y){const Pe=Y.material;if(Pe)if(Array.isArray(Pe))for(let Ne=0;Ne<Pe.length;Ne++){const Ge=Pe[Ne];it(Ge,$,Y),ee.add(Ge)}else it(Pe,$,Y),ee.add(Pe)}),E.pop(),m=null,ee},this.compileAsync=function(A,G,$=null){const ee=this.compile(A,G,$);return new Promise(Y=>{function Pe(){if(ee.forEach(function(Ne){se.get(Ne).currentProgram.isReady()&&ee.delete(Ne)}),ee.size===0){Y(A);return}setTimeout(Pe,10)}O.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let rt=null;function mt(A){rt&&rt(A)}function It(){Et.stop()}function st(){Et.start()}const Et=new Vh;Et.setAnimationLoop(mt),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(A){rt=A,$e.setAnimationLoop(A),A===null?Et.stop():Et.start()},$e.addEventListener("sessionstart",It),$e.addEventListener("sessionend",st),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),$e.enabled===!0&&$e.isPresenting===!0&&($e.cameraAutoUpdate===!0&&$e.updateCamera(G),G=$e.getCamera()),A.isScene===!0&&A.onBeforeRender(S,A,G,R),m=Ae.get(A,E.length),m.init(),E.push(m),Le.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),te.setFromProjectionMatrix(Le),Ce=this.localClippingEnabled,de=ye.init(this.clippingPlanes,Ce),v=ve.get(A,h.length),v.init(),h.push(v),Lt(A,G,0,S.sortObjects),v.finish(),S.sortObjects===!0&&v.sort(Q,ae),this.info.render.frame++,de===!0&&ye.beginShadows();const $=m.state.shadowsArray;if(oe.render($,A,G),de===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),ze.render(v,A),m.setupLights(S._useLegacyLights),G.isArrayCamera){const ee=G.cameras;for(let Y=0,Pe=ee.length;Y<Pe;Y++){const Ne=ee[Y];Xr(v,A,Ne,Ne.viewport)}}else Xr(v,A,G);R!==null&&(y.updateMultisampleRenderTarget(R),y.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(S,A,G),Re.resetDefaultState(),j=-1,T=null,E.pop(),E.length>0?m=E[E.length-1]:m=null,h.pop(),h.length>0?v=h[h.length-1]:v=null};function Lt(A,G,$,ee){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||te.intersectsSprite(A)){ee&&Ve.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Le);const Ne=W.update(A),Ge=A.material;Ge.visible&&v.push(A,Ne,Ge,$,Ve.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||te.intersectsObject(A))){const Ne=W.update(A),Ge=A.material;if(ee&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ve.copy(A.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Ve.copy(Ne.boundingSphere.center)),Ve.applyMatrix4(A.matrixWorld).applyMatrix4(Le)),Array.isArray(Ge)){const Xe=Ne.groups;for(let Je=0,qe=Xe.length;Je<qe;Je++){const ke=Xe[Je],lt=Ge[ke.materialIndex];lt&&lt.visible&&v.push(A,Ne,lt,$,Ve.z,ke)}}else Ge.visible&&v.push(A,Ne,Ge,$,Ve.z,null)}}const Pe=A.children;for(let Ne=0,Ge=Pe.length;Ne<Ge;Ne++)Lt(Pe[Ne],G,$,ee)}function Xr(A,G,$,ee){const Y=A.opaque,Pe=A.transmissive,Ne=A.transparent;m.setupLightsView($),de===!0&&ye.setGlobalState(S.clippingPlanes,$),Pe.length>0&&Zo(Y,Pe,G,$),ee&&V.viewport(w.copy(ee)),Y.length>0&&si(Y,G,$),Pe.length>0&&si(Pe,G,$),Ne.length>0&&si(Ne,G,$),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function Zo(A,G,$,ee){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;const Pe=q.isWebGL2;Ue===null&&(Ue=new Pn(1,1,{generateMipmaps:!0,type:O.has("EXT_color_buffer_half_float")?Qn:Si,minFilter:bs,samples:Pe?4:0})),S.getDrawingBufferSize(He),Pe?Ue.setSize(He.x,He.y):Ue.setSize(Do(He.x),Do(He.y));const Ne=S.getRenderTarget();S.setRenderTarget(Ue),S.getClearColor(xe),B=S.getClearAlpha(),B<1&&S.setClearColor(16777215,.5),S.clear();const Ge=S.toneMapping;S.toneMapping=yi,si(A,$,ee),y.updateMultisampleRenderTarget(Ue),y.updateRenderTargetMipmap(Ue);let Xe=!1;for(let Je=0,qe=G.length;Je<qe;Je++){const ke=G[Je],lt=ke.object,Gt=ke.geometry,ft=ke.material,mn=ke.group;if(ft.side===hn&&lt.layers.test(ee.layers)){const gt=ft.side;ft.side=en,ft.needsUpdate=!0,Ls(lt,$,ee,Gt,ft,mn),ft.side=gt,ft.needsUpdate=!0,Xe=!0}}Xe===!0&&(y.updateMultisampleRenderTarget(Ue),y.updateRenderTargetMipmap(Ue)),S.setRenderTarget(Ne),S.setClearColor(xe,B),S.toneMapping=Ge}function si(A,G,$){const ee=G.isScene===!0?G.overrideMaterial:null;for(let Y=0,Pe=A.length;Y<Pe;Y++){const Ne=A[Y],Ge=Ne.object,Xe=Ne.geometry,Je=ee===null?Ne.material:ee,qe=Ne.group;Ge.layers.test($.layers)&&Ls(Ge,G,$,Xe,Je,qe)}}function Ls(A,G,$,ee,Y,Pe){A.onBeforeRender(S,G,$,ee,Y,Pe),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(S,G,$,ee,A,Pe),Y.transparent===!0&&Y.side===hn&&Y.forceSinglePass===!1?(Y.side=en,Y.needsUpdate=!0,S.renderBufferDirect($,G,ee,Y,A,Pe),Y.side=Ti,Y.needsUpdate=!0,S.renderBufferDirect($,G,ee,Y,A,Pe),Y.side=hn):S.renderBufferDirect($,G,ee,Y,A,Pe),A.onAfterRender(S,G,$,ee,Y,Pe)}function Ri(A,G,$){G.isScene!==!0&&(G=Fe);const ee=se.get(A),Y=m.state.lights,Pe=m.state.shadowsArray,Ne=Y.state.version,Ge=he.getParameters(A,Y.state,Pe,G,$),Xe=he.getProgramCacheKey(Ge);let Je=ee.programs;ee.environment=A.isMeshStandardMaterial?G.environment:null,ee.fog=G.fog,ee.envMap=(A.isMeshStandardMaterial?L:g).get(A.envMap||ee.environment),Je===void 0&&(A.addEventListener("dispose",Ee),Je=new Map,ee.programs=Je);let qe=Je.get(Xe);if(qe!==void 0){if(ee.currentProgram===qe&&ee.lightsStateVersion===Ne)return $i(A,Ge),qe}else Ge.uniforms=he.getUniforms(A),A.onBuild($,Ge,S),A.onBeforeCompile(Ge,S),qe=he.acquireProgram(Ge,Xe),Je.set(Xe,qe),ee.uniforms=Ge.uniforms;const ke=ee.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ke.clippingPlanes=ye.uniform),$i(A,Ge),ee.needsLights=pn(A),ee.lightsStateVersion=Ne,ee.needsLights&&(ke.ambientLightColor.value=Y.state.ambient,ke.lightProbe.value=Y.state.probe,ke.directionalLights.value=Y.state.directional,ke.directionalLightShadows.value=Y.state.directionalShadow,ke.spotLights.value=Y.state.spot,ke.spotLightShadows.value=Y.state.spotShadow,ke.rectAreaLights.value=Y.state.rectArea,ke.ltc_1.value=Y.state.rectAreaLTC1,ke.ltc_2.value=Y.state.rectAreaLTC2,ke.pointLights.value=Y.state.point,ke.pointLightShadows.value=Y.state.pointShadow,ke.hemisphereLights.value=Y.state.hemi,ke.directionalShadowMap.value=Y.state.directionalShadowMap,ke.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,ke.spotShadowMap.value=Y.state.spotShadowMap,ke.spotLightMatrix.value=Y.state.spotLightMatrix,ke.spotLightMap.value=Y.state.spotLightMap,ke.pointShadowMap.value=Y.state.pointShadowMap,ke.pointShadowMatrix.value=Y.state.pointShadowMatrix),ee.currentProgram=qe,ee.uniformsList=null,qe}function Ds(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=Mo.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function $i(A,G){const $=se.get(A);$.outputColorSpace=G.outputColorSpace,$.batching=G.batching,$.instancing=G.instancing,$.instancingColor=G.instancingColor,$.skinning=G.skinning,$.morphTargets=G.morphTargets,$.morphNormals=G.morphNormals,$.morphColors=G.morphColors,$.morphTargetsCount=G.morphTargetsCount,$.numClippingPlanes=G.numClippingPlanes,$.numIntersection=G.numClipIntersection,$.vertexAlphas=G.vertexAlphas,$.vertexTangents=G.vertexTangents,$.toneMapping=G.toneMapping}function Us(A,G,$,ee,Y){G.isScene!==!0&&(G=Fe),y.resetTextureUnits();const Pe=G.fog,Ne=ee.isMeshStandardMaterial?G.environment:null,Ge=R===null?S.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ii,Xe=(ee.isMeshStandardMaterial?L:g).get(ee.envMap||Ne),Je=ee.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,qe=!!$.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),ke=!!$.morphAttributes.position,lt=!!$.morphAttributes.normal,Gt=!!$.morphAttributes.color;let ft=yi;ee.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ft=S.toneMapping);const mn=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,gt=mn!==void 0?mn.length:0,Ze=se.get(ee),Zi=m.state.lights;if(de===!0&&(Ce===!0||A!==T)){const nn=A===T&&ee.id===j;ye.setState(ee,A,nn)}let _t=!1;ee.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==Zi.state.version||Ze.outputColorSpace!==Ge||Y.isBatchedMesh&&Ze.batching===!1||!Y.isBatchedMesh&&Ze.batching===!0||Y.isInstancedMesh&&Ze.instancing===!1||!Y.isInstancedMesh&&Ze.instancing===!0||Y.isSkinnedMesh&&Ze.skinning===!1||!Y.isSkinnedMesh&&Ze.skinning===!0||Y.isInstancedMesh&&Ze.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ze.instancingColor===!1&&Y.instanceColor!==null||Ze.envMap!==Xe||ee.fog===!0&&Ze.fog!==Pe||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==ye.numPlanes||Ze.numIntersection!==ye.numIntersection)||Ze.vertexAlphas!==Je||Ze.vertexTangents!==qe||Ze.morphTargets!==ke||Ze.morphNormals!==lt||Ze.morphColors!==Gt||Ze.toneMapping!==ft||q.isWebGL2===!0&&Ze.morphTargetsCount!==gt)&&(_t=!0):(_t=!0,Ze.__version=ee.version);let Sn=Ze.currentProgram;_t===!0&&(Sn=Ri(ee,G,Y));let Ji=!1,oi=!1,Qi=!1;const Pt=Sn.getUniforms(),Gn=Ze.uniforms;if(V.useProgram(Sn.program)&&(Ji=!0,oi=!0,Qi=!0),ee.id!==j&&(j=ee.id,oi=!0),Ji||T!==A){Pt.setValue(x,"projectionMatrix",A.projectionMatrix),Pt.setValue(x,"viewMatrix",A.matrixWorldInverse);const nn=Pt.map.cameraPosition;nn!==void 0&&nn.setValue(x,Ve.setFromMatrixPosition(A.matrixWorld)),q.logarithmicDepthBuffer&&Pt.setValue(x,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Pt.setValue(x,"isOrthographic",A.isOrthographicCamera===!0),T!==A&&(T=A,oi=!0,Qi=!0)}if(Y.isSkinnedMesh){Pt.setOptional(x,Y,"bindMatrix"),Pt.setOptional(x,Y,"bindMatrixInverse");const nn=Y.skeleton;nn&&(q.floatVertexTextures?(nn.boneTexture===null&&nn.computeBoneTexture(),Pt.setValue(x,"boneTexture",nn.boneTexture,y)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Y.isBatchedMesh&&(Pt.setOptional(x,Y,"batchingTexture"),Pt.setValue(x,"batchingTexture",Y._matricesTexture,y));const qr=$.morphAttributes;if((qr.position!==void 0||qr.normal!==void 0||qr.color!==void 0&&q.isWebGL2===!0)&&P.update(Y,$,Sn),(oi||Ze.receiveShadow!==Y.receiveShadow)&&(Ze.receiveShadow=Y.receiveShadow,Pt.setValue(x,"receiveShadow",Y.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(Gn.envMap.value=Xe,Gn.flipEnvMap.value=Xe.isCubeTexture&&Xe.isRenderTargetTexture===!1?-1:1),oi&&(Pt.setValue(x,"toneMappingExposure",S.toneMappingExposure),Ze.needsLights&&Is(Gn,Qi),Pe&&ee.fog===!0&&le.refreshFogUniforms(Gn,Pe),le.refreshMaterialUniforms(Gn,ee,ne,J,Ue),Mo.upload(x,Ds(Ze),Gn,y)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Mo.upload(x,Ds(Ze),Gn,y),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Pt.setValue(x,"center",Y.center),Pt.setValue(x,"modelViewMatrix",Y.modelViewMatrix),Pt.setValue(x,"normalMatrix",Y.normalMatrix),Pt.setValue(x,"modelMatrix",Y.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const nn=ee.uniformsGroups;for(let er=0,Ns=nn.length;er<Ns;er++)if(q.isWebGL2){const M=nn[er];je.update(M,Sn),je.bind(M,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function Is(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function pn(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,G,$){se.get(A.texture).__webglTexture=G,se.get(A.depthTexture).__webglTexture=$;const ee=se.get(A);ee.__hasExternalTextures=!0,ee.__hasExternalTextures&&(ee.__autoAllocateDepthBuffer=$===void 0,ee.__autoAllocateDepthBuffer||O.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,G){const $=se.get(A);$.__webglFramebuffer=G,$.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(A,G=0,$=0){R=A,N=G,D=$;let ee=!0,Y=null,Pe=!1,Ne=!1;if(A){const Xe=se.get(A);Xe.__useDefaultFramebuffer!==void 0?(V.bindFramebuffer(x.FRAMEBUFFER,null),ee=!1):Xe.__webglFramebuffer===void 0?y.setupRenderTarget(A):Xe.__hasExternalTextures&&y.rebindTextures(A,se.get(A.texture).__webglTexture,se.get(A.depthTexture).__webglTexture);const Je=A.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Ne=!0);const qe=se.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(qe[G])?Y=qe[G][$]:Y=qe[G],Pe=!0):q.isWebGL2&&A.samples>0&&y.useMultisampledRTT(A)===!1?Y=se.get(A).__webglMultisampledFramebuffer:Array.isArray(qe)?Y=qe[$]:Y=qe,w.copy(A.viewport),K.copy(A.scissor),re=A.scissorTest}else w.copy(fe).multiplyScalar(ne).floor(),K.copy(_e).multiplyScalar(ne).floor(),re=ge;if(V.bindFramebuffer(x.FRAMEBUFFER,Y)&&q.drawBuffers&&ee&&V.drawBuffers(A,Y),V.viewport(w),V.scissor(K),V.setScissorTest(re),Pe){const Xe=se.get(A.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+G,Xe.__webglTexture,$)}else if(Ne){const Xe=se.get(A.texture),Je=G||0;x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,Xe.__webglTexture,$||0,Je)}j=-1},this.readRenderTargetPixels=function(A,G,$,ee,Y,Pe,Ne){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=se.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ne!==void 0&&(Ge=Ge[Ne]),Ge){V.bindFramebuffer(x.FRAMEBUFFER,Ge);try{const Xe=A.texture,Je=Xe.format,qe=Xe.type;if(Je!==Cn&&ce.convert(Je)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ke=qe===Qn&&(O.has("EXT_color_buffer_half_float")||q.isWebGL2&&O.has("EXT_color_buffer_float"));if(qe!==Si&&ce.convert(qe)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_TYPE)&&!(qe===vi&&(q.isWebGL2||O.has("OES_texture_float")||O.has("WEBGL_color_buffer_float")))&&!ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-ee&&$>=0&&$<=A.height-Y&&x.readPixels(G,$,ee,Y,ce.convert(Je),ce.convert(qe),Pe)}finally{const Xe=R!==null?se.get(R).__webglFramebuffer:null;V.bindFramebuffer(x.FRAMEBUFFER,Xe)}}},this.copyFramebufferToTexture=function(A,G,$=0){const ee=Math.pow(2,-$),Y=Math.floor(G.image.width*ee),Pe=Math.floor(G.image.height*ee);y.setTexture2D(G,0),x.copyTexSubImage2D(x.TEXTURE_2D,$,0,0,A.x,A.y,Y,Pe),V.unbindTexture()},this.copyTextureToTexture=function(A,G,$,ee=0){const Y=G.image.width,Pe=G.image.height,Ne=ce.convert($.format),Ge=ce.convert($.type);y.setTexture2D($,0),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,$.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,$.unpackAlignment),G.isDataTexture?x.texSubImage2D(x.TEXTURE_2D,ee,A.x,A.y,Y,Pe,Ne,Ge,G.image.data):G.isCompressedTexture?x.compressedTexSubImage2D(x.TEXTURE_2D,ee,A.x,A.y,G.mipmaps[0].width,G.mipmaps[0].height,Ne,G.mipmaps[0].data):x.texSubImage2D(x.TEXTURE_2D,ee,A.x,A.y,Ne,Ge,G.image),ee===0&&$.generateMipmaps&&x.generateMipmap(x.TEXTURE_2D),V.unbindTexture()},this.copyTextureToTexture3D=function(A,G,$,ee,Y=0){if(S.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Pe=A.max.x-A.min.x+1,Ne=A.max.y-A.min.y+1,Ge=A.max.z-A.min.z+1,Xe=ce.convert(ee.format),Je=ce.convert(ee.type);let qe;if(ee.isData3DTexture)y.setTexture3D(ee,0),qe=x.TEXTURE_3D;else if(ee.isDataArrayTexture||ee.isCompressedArrayTexture)y.setTexture2DArray(ee,0),qe=x.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,ee.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,ee.unpackAlignment);const ke=x.getParameter(x.UNPACK_ROW_LENGTH),lt=x.getParameter(x.UNPACK_IMAGE_HEIGHT),Gt=x.getParameter(x.UNPACK_SKIP_PIXELS),ft=x.getParameter(x.UNPACK_SKIP_ROWS),mn=x.getParameter(x.UNPACK_SKIP_IMAGES),gt=$.isCompressedTexture?$.mipmaps[Y]:$.image;x.pixelStorei(x.UNPACK_ROW_LENGTH,gt.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,gt.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,A.min.x),x.pixelStorei(x.UNPACK_SKIP_ROWS,A.min.y),x.pixelStorei(x.UNPACK_SKIP_IMAGES,A.min.z),$.isDataTexture||$.isData3DTexture?x.texSubImage3D(qe,Y,G.x,G.y,G.z,Pe,Ne,Ge,Xe,Je,gt.data):$.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),x.compressedTexSubImage3D(qe,Y,G.x,G.y,G.z,Pe,Ne,Ge,Xe,gt.data)):x.texSubImage3D(qe,Y,G.x,G.y,G.z,Pe,Ne,Ge,Xe,Je,gt),x.pixelStorei(x.UNPACK_ROW_LENGTH,ke),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,lt),x.pixelStorei(x.UNPACK_SKIP_PIXELS,Gt),x.pixelStorei(x.UNPACK_SKIP_ROWS,ft),x.pixelStorei(x.UNPACK_SKIP_IMAGES,mn),Y===0&&ee.generateMipmaps&&x.generateMipmap(qe),V.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?y.setTextureCube(A,0):A.isData3DTexture?y.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?y.setTexture2DArray(A,0):y.setTexture2D(A,0),V.unbindTexture()},this.resetState=function(){N=0,D=0,R=null,V.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Nl?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===jo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===zt?Xi:Rh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Xi?zt:ii}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class uy extends $h{}uy.prototype.isWebGL1Renderer=!0;class fy extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class hy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ol,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new U;class No{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=On(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=On(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=On(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=On(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),r=ht(r,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new No(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ul extends Ci{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let yr;const Qr=new U,Sr=new U,Er=new U,br=new De,es=new De,Zh=new pt,ao=new U,ts=new U,lo=new U,Fu=new De,Ba=new De,Ou=new De;class Bu extends Nt{constructor(e=new ul){if(super(),this.isSprite=!0,this.type="Sprite",yr===void 0){yr=new St;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new hy(t,5);yr.setIndex([0,1,2,0,2,3]),yr.setAttribute("position",new No(i,3,0,!1)),yr.setAttribute("uv",new No(i,2,3,!1))}this.geometry=yr,this.material=e,this.center=new De(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Sr.setFromMatrixScale(this.matrixWorld),Zh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Er.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Sr.multiplyScalar(-Er.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;co(ao.set(-.5,-.5,0),Er,a,Sr,r,s),co(ts.set(.5,-.5,0),Er,a,Sr,r,s),co(lo.set(.5,.5,0),Er,a,Sr,r,s),Fu.set(0,0),Ba.set(1,0),Ou.set(1,1);let o=e.ray.intersectTriangle(ao,ts,lo,!1,Qr);if(o===null&&(co(ts.set(-.5,.5,0),Er,a,Sr,r,s),Ba.set(0,1),o=e.ray.intersectTriangle(ao,lo,ts,!1,Qr),o===null))return;const l=e.ray.origin.distanceTo(Qr);l<e.near||l>e.far||t.push({distance:l,point:Qr.clone(),uv:vn.getInterpolation(Qr,ao,ts,lo,Fu,Ba,Ou,new De),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function co(n,e,t,i,r,s){br.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(es.x=s*br.x-r*br.y,es.y=r*br.x+s*br.y):es.copy(br),n.copy(e),n.x+=es.x,n.y+=es.y,n.applyMatrix4(Zh)}class zu extends Ct{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Tr=new pt,Hu=new pt,uo=[],Gu=new Yi,dy=new pt,ns=new wt,is=new Ki;class py extends wt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new zu(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,dy)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Tr),Gu.copy(e.boundingBox).applyMatrix4(Tr),this.boundingBox.union(Gu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Tr),is.copy(e.boundingSphere).applyMatrix4(Tr),this.boundingSphere.union(is)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(ns.geometry=this.geometry,ns.material=this.material,ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),is.copy(this.boundingSphere),is.applyMatrix4(i),e.ray.intersectsSphere(is)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Tr),Hu.multiplyMatrices(i,Tr),ns.matrixWorld=Hu,ns.raycast(e,uo);for(let a=0,o=uo.length;a<o;a++){const l=uo[a];l.instanceId=s,l.object=this,t.push(l)}uo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new zu(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class $o extends Ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Vu=new U,ku=new U,Wu=new pt,za=new Cs,fo=new Ki;class as extends Nt{constructor(e=new St,t=new $o){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Vu.fromBufferAttribute(t,r-1),ku.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Vu.distanceTo(ku);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fo.copy(i.boundingSphere),fo.applyMatrix4(r),fo.radius+=s,e.ray.intersectsSphere(fo)===!1)return;Wu.copy(r).invert(),za.copy(e.ray).applyMatrix4(Wu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new U,u=new U,f=new U,d=new U,p=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){const h=Math.max(0,a.start),E=Math.min(_.count,a.start+a.count);for(let S=h,b=E-1;S<b;S+=p){const N=_.getX(S),D=_.getX(S+1);if(c.fromBufferAttribute(m,N),u.fromBufferAttribute(m,D),za.distanceSqToSegment(c,u,d,f)>l)continue;d.applyMatrix4(this.matrixWorld);const j=e.ray.origin.distanceTo(d);j<e.near||j>e.far||t.push({distance:j,point:f.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}else{const h=Math.max(0,a.start),E=Math.min(m.count,a.start+a.count);for(let S=h,b=E-1;S<b;S+=p){if(c.fromBufferAttribute(m,S),u.fromBufferAttribute(m,S+1),za.distanceSqToSegment(c,u,d,f)>l)continue;d.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(d);D<e.near||D>e.far||t.push({distance:D,point:f.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Xu=new U,qu=new U;class my extends as{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Xu.fromBufferAttribute(t,r),qu.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Xu.distanceTo(qu);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jh extends Ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ju=new pt,fl=new Cs,ho=new Ki,po=new U;class rs extends Nt{constructor(e=new St,t=new Jh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ho.copy(i.boundingSphere),ho.applyMatrix4(r),ho.radius+=s,e.ray.intersectsSphere(ho)===!1)return;ju.copy(r).invert(),fl.copy(e.ray).applyMatrix4(ju);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=d,v=p;_<v;_++){const m=c.getX(_);po.fromBufferAttribute(f,m),Yu(po,m,l,r,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let _=d,v=p;_<v;_++)po.fromBufferAttribute(f,_),Yu(po,_,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Yu(n,e,t,i,r,s,a){const o=fl.distanceSqToPoint(n);if(o<t){const l=new U;fl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Ku extends an{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gl extends St{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),c(i),u(),this.setAttribute("position",new Mt(s,3)),this.setAttribute("normal",new Mt(s.slice(),3)),this.setAttribute("uv",new Mt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(E){const S=new U,b=new U,N=new U;for(let D=0;D<t.length;D+=3)p(t[D+0],S),p(t[D+1],b),p(t[D+2],N),l(S,b,N,E)}function l(E,S,b,N){const D=N+1,R=[];for(let j=0;j<=D;j++){R[j]=[];const T=E.clone().lerp(b,j/D),w=S.clone().lerp(b,j/D),K=D-j;for(let re=0;re<=K;re++)re===0&&j===D?R[j][re]=T:R[j][re]=T.clone().lerp(w,re/K)}for(let j=0;j<D;j++)for(let T=0;T<2*(D-j)-1;T++){const w=Math.floor(T/2);T%2===0?(d(R[j][w+1]),d(R[j+1][w]),d(R[j][w])):(d(R[j][w+1]),d(R[j+1][w+1]),d(R[j+1][w]))}}function c(E){const S=new U;for(let b=0;b<s.length;b+=3)S.x=s[b+0],S.y=s[b+1],S.z=s[b+2],S.normalize().multiplyScalar(E),s[b+0]=S.x,s[b+1]=S.y,s[b+2]=S.z}function u(){const E=new U;for(let S=0;S<s.length;S+=3){E.x=s[S+0],E.y=s[S+1],E.z=s[S+2];const b=m(E)/2/Math.PI+.5,N=h(E)/Math.PI+.5;a.push(b,1-N)}_(),f()}function f(){for(let E=0;E<a.length;E+=6){const S=a[E+0],b=a[E+2],N=a[E+4],D=Math.max(S,b,N),R=Math.min(S,b,N);D>.9&&R<.1&&(S<.2&&(a[E+0]+=1),b<.2&&(a[E+2]+=1),N<.2&&(a[E+4]+=1))}}function d(E){s.push(E.x,E.y,E.z)}function p(E,S){const b=E*3;S.x=e[b+0],S.y=e[b+1],S.z=e[b+2]}function _(){const E=new U,S=new U,b=new U,N=new U,D=new De,R=new De,j=new De;for(let T=0,w=0;T<s.length;T+=9,w+=6){E.set(s[T+0],s[T+1],s[T+2]),S.set(s[T+3],s[T+4],s[T+5]),b.set(s[T+6],s[T+7],s[T+8]),D.set(a[w+0],a[w+1]),R.set(a[w+2],a[w+3]),j.set(a[w+4],a[w+5]),N.copy(E).add(S).add(b).divideScalar(3);const K=m(N);v(D,w+0,E,K),v(R,w+2,S,K),v(j,w+4,b,K)}}function v(E,S,b,N){N<0&&E.x===1&&(a[S]=E.x-1),b.x===0&&b.z===0&&(a[S]=N/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function h(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gl(e.vertices,e.indices,e.radius,e.details)}}class Vl extends Gl{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vl(e.radius,e.detail)}}class vs extends St{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let f=e;const d=(t-e)/r,p=new U,_=new De;for(let v=0;v<=r;v++){for(let m=0;m<=i;m++){const h=s+m/i*a;p.x=f*Math.cos(h),p.y=f*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,u.push(_.x,_.y)}f+=d}for(let v=0;v<r;v++){const m=v*(i+1);for(let h=0;h<i;h++){const E=h+m,S=E,b=E+i+1,N=E+i+2,D=E+1;o.push(S,b,D),o.push(b,N,D)}}this.setIndex(o),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class mi extends St{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new U,d=new U,p=[],_=[],v=[],m=[];for(let h=0;h<=i;h++){const E=[],S=h/i;let b=0;h===0&&a===0?b=.5/t:h===i&&l===Math.PI&&(b=-.5/t);for(let N=0;N<=t;N++){const D=N/t;f.x=-e*Math.cos(r+D*s)*Math.sin(a+S*o),f.y=e*Math.cos(a+S*o),f.z=e*Math.sin(r+D*s)*Math.sin(a+S*o),_.push(f.x,f.y,f.z),d.copy(f).normalize(),v.push(d.x,d.y,d.z),m.push(D+b,1-S),E.push(c++)}u.push(E)}for(let h=0;h<i;h++)for(let E=0;E<t;E++){const S=u[h][E+1],b=u[h][E],N=u[h+1][E],D=u[h+1][E+1];(h!==0||a>0)&&p.push(S,b,D),(h!==i-1||l<Math.PI)&&p.push(b,N,D)}this.setIndex(p),this.setAttribute("position",new Mt(_,3)),this.setAttribute("normal",new Mt(v,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class gy extends Ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ph,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $u extends $o{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Qh extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Ha=new pt,Zu=new U,Ju=new U;class _y{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bl,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Zu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zu),Ju.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ju),t.updateMatrixWorld(),Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ha),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Qu=new pt,ss=new U,Ga=new U;class vy extends _y{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new De(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),ss.setFromMatrixPosition(e.matrixWorld),i.position.copy(ss),Ga.copy(i.position),Ga.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ga),i.updateMatrixWorld(),r.makeTranslation(-ss.x,-ss.y,-ss.z),Qu.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qu)}}class xy extends Qh{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new vy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class My extends Qh{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class yy{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ef(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ef();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ef(){return(typeof performance>"u"?Date:performance).now()}class Sy{constructor(e,t,i=0,r=1/0){this.ray=new Cs(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ol,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return hl(e,this,i,t),i.sort(tf),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)hl(e[r],this,i,t);return i.sort(tf),i}}function tf(n,e){return n.distance-e.distance}function hl(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)hl(r[s],e,t,!0)}}class nf{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ey extends my{constructor(e=10,t=10,i=4473924,r=8947848){i=new Ye(i),r=new Ye(r);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,p=0,_=-o;d<=t;d++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const v=d===s?i:r;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const u=new St;u.setAttribute("position",new Mt(l,3)),u.setAttribute("color",new Mt(c,3));const f=new $o({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ul}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ul);const rf={type:"change"},Va={type:"start"},sf={type:"end"},mo=new Cs,of=new pi,by=Math.cos(70*Cr.DEG2RAD);class Ty extends ji{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ir.ROTATE,MIDDLE:ir.DOLLY,RIGHT:ir.PAN},this.touches={ONE:rr.ROTATE,TWO:rr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(P){P.addEventListener("keydown",W),this._domElementKeyEvents=P},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",W),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(rf),i.update(),s=r.NONE},this.update=function(){const P=new U,ue=new Ai().setFromUnitVectors(e.up,new U(0,1,0)),pe=ue.clone().invert(),ce=new U,Re=new Ai,je=new U,We=2*Math.PI;return function(be=null){const F=i.object.position;P.copy(F).sub(i.target),P.applyQuaternion(ue),o.setFromVector3(P),i.autoRotate&&s===r.NONE&&K(T(be)),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Se=i.minAzimuthAngle,Ee=i.maxAzimuthAngle;isFinite(Se)&&isFinite(Ee)&&(Se<-Math.PI?Se+=We:Se>Math.PI&&(Se-=We),Ee<-Math.PI?Ee+=We:Ee>Math.PI&&(Ee-=We),Se<=Ee?o.theta=Math.max(Se,Math.min(Ee,o.theta)):o.theta=o.theta>(Se+Ee)/2?Math.max(Se,o.theta):Math.min(Ee,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&D||i.object.isOrthographicCamera?o.radius=ae(o.radius):o.radius=ae(o.radius*c),P.setFromSpherical(o),P.applyQuaternion(pe),F.copy(i.target).add(P),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let Oe=!1;if(i.zoomToCursor&&D){let Me=null;if(i.object.isPerspectiveCamera){const it=P.length();Me=ae(it*c);const rt=it-Me;i.object.position.addScaledVector(b,rt),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const it=new U(N.x,N.y,0);it.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Oe=!0;const rt=new U(N.x,N.y,0);rt.unproject(i.object),i.object.position.sub(rt).add(it),i.object.updateMatrixWorld(),Me=P.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Me!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Me).add(i.object.position):(mo.origin.copy(i.object.position),mo.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(mo.direction))<by?e.lookAt(i.target):(of.setFromNormalAndCoplanarPoint(i.object.up,i.target),mo.intersectPlane(of,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Oe=!0);return c=1,D=!1,Oe||ce.distanceToSquared(i.object.position)>a||8*(1-Re.dot(i.object.quaternion))>a||je.distanceToSquared(i.target)>0?(i.dispatchEvent(rf),ce.copy(i.object.position),Re.copy(i.object.quaternion),je.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",ve),i.domElement.removeEventListener("pointerdown",se),i.domElement.removeEventListener("pointercancel",g),i.domElement.removeEventListener("wheel",z),i.domElement.removeEventListener("pointermove",y),i.domElement.removeEventListener("pointerup",g),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",W),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new nf,l=new nf;let c=1;const u=new U,f=new De,d=new De,p=new De,_=new De,v=new De,m=new De,h=new De,E=new De,S=new De,b=new U,N=new De;let D=!1;const R=[],j={};function T(P){return P!==null?2*Math.PI/60*i.autoRotateSpeed*P:2*Math.PI/60/60*i.autoRotateSpeed}function w(P){const ue=Math.abs(P)/(100*(window.devicePixelRatio|0));return Math.pow(.95,i.zoomSpeed*ue)}function K(P){l.theta-=P}function re(P){l.phi-=P}const xe=function(){const P=new U;return function(pe,ce){P.setFromMatrixColumn(ce,0),P.multiplyScalar(-pe),u.add(P)}}(),B=function(){const P=new U;return function(pe,ce){i.screenSpacePanning===!0?P.setFromMatrixColumn(ce,1):(P.setFromMatrixColumn(ce,0),P.crossVectors(i.object.up,P)),P.multiplyScalar(pe),u.add(P)}}(),X=function(){const P=new U;return function(pe,ce){const Re=i.domElement;if(i.object.isPerspectiveCamera){const je=i.object.position;P.copy(je).sub(i.target);let We=P.length();We*=Math.tan(i.object.fov/2*Math.PI/180),xe(2*pe*We/Re.clientHeight,i.object.matrix),B(2*ce*We/Re.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(xe(pe*(i.object.right-i.object.left)/i.object.zoom/Re.clientWidth,i.object.matrix),B(ce*(i.object.top-i.object.bottom)/i.object.zoom/Re.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function J(P){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ne(P){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function Q(P,ue){if(!i.zoomToCursor)return;D=!0;const pe=i.domElement.getBoundingClientRect(),ce=P-pe.left,Re=ue-pe.top,je=pe.width,We=pe.height;N.x=ce/je*2-1,N.y=-(Re/We)*2+1,b.set(N.x,N.y,1).unproject(i.object).sub(i.object.position).normalize()}function ae(P){return Math.max(i.minDistance,Math.min(i.maxDistance,P))}function fe(P){f.set(P.clientX,P.clientY)}function _e(P){Q(P.clientX,P.clientX),h.set(P.clientX,P.clientY)}function ge(P){_.set(P.clientX,P.clientY)}function te(P){d.set(P.clientX,P.clientY),p.subVectors(d,f).multiplyScalar(i.rotateSpeed);const ue=i.domElement;K(2*Math.PI*p.x/ue.clientHeight),re(2*Math.PI*p.y/ue.clientHeight),f.copy(d),i.update()}function de(P){E.set(P.clientX,P.clientY),S.subVectors(E,h),S.y>0?J(w(S.y)):S.y<0&&ne(w(S.y)),h.copy(E),i.update()}function Ce(P){v.set(P.clientX,P.clientY),m.subVectors(v,_).multiplyScalar(i.panSpeed),X(m.x,m.y),_.copy(v),i.update()}function Ue(P){Q(P.clientX,P.clientY),P.deltaY<0?ne(w(P.deltaY)):P.deltaY>0&&J(w(P.deltaY)),i.update()}function Le(P){let ue=!1;switch(P.code){case i.keys.UP:P.ctrlKey||P.metaKey||P.shiftKey?re(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(0,i.keyPanSpeed),ue=!0;break;case i.keys.BOTTOM:P.ctrlKey||P.metaKey||P.shiftKey?re(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(0,-i.keyPanSpeed),ue=!0;break;case i.keys.LEFT:P.ctrlKey||P.metaKey||P.shiftKey?K(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(i.keyPanSpeed,0),ue=!0;break;case i.keys.RIGHT:P.ctrlKey||P.metaKey||P.shiftKey?K(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(-i.keyPanSpeed,0),ue=!0;break}ue&&(P.preventDefault(),i.update())}function He(P){if(R.length===1)f.set(P.pageX,P.pageY);else{const ue=ze(P),pe=.5*(P.pageX+ue.x),ce=.5*(P.pageY+ue.y);f.set(pe,ce)}}function Ve(P){if(R.length===1)_.set(P.pageX,P.pageY);else{const ue=ze(P),pe=.5*(P.pageX+ue.x),ce=.5*(P.pageY+ue.y);_.set(pe,ce)}}function Fe(P){const ue=ze(P),pe=P.pageX-ue.x,ce=P.pageY-ue.y,Re=Math.sqrt(pe*pe+ce*ce);h.set(0,Re)}function Qe(P){i.enableZoom&&Fe(P),i.enablePan&&Ve(P)}function x(P){i.enableZoom&&Fe(P),i.enableRotate&&He(P)}function I(P){if(R.length==1)d.set(P.pageX,P.pageY);else{const pe=ze(P),ce=.5*(P.pageX+pe.x),Re=.5*(P.pageY+pe.y);d.set(ce,Re)}p.subVectors(d,f).multiplyScalar(i.rotateSpeed);const ue=i.domElement;K(2*Math.PI*p.x/ue.clientHeight),re(2*Math.PI*p.y/ue.clientHeight),f.copy(d)}function O(P){if(R.length===1)v.set(P.pageX,P.pageY);else{const ue=ze(P),pe=.5*(P.pageX+ue.x),ce=.5*(P.pageY+ue.y);v.set(pe,ce)}m.subVectors(v,_).multiplyScalar(i.panSpeed),X(m.x,m.y),_.copy(v)}function q(P){const ue=ze(P),pe=P.pageX-ue.x,ce=P.pageY-ue.y,Re=Math.sqrt(pe*pe+ce*ce);E.set(0,Re),S.set(0,Math.pow(E.y/h.y,i.zoomSpeed)),J(S.y),h.copy(E);const je=(P.pageX+ue.x)*.5,We=(P.pageY+ue.y)*.5;Q(je,We)}function V(P){i.enableZoom&&q(P),i.enablePan&&O(P)}function ie(P){i.enableZoom&&q(P),i.enableRotate&&I(P)}function se(P){i.enabled!==!1&&(R.length===0&&(i.domElement.setPointerCapture(P.pointerId),i.domElement.addEventListener("pointermove",y),i.domElement.addEventListener("pointerup",g)),Ae(P),P.pointerType==="touch"?he(P):L(P))}function y(P){i.enabled!==!1&&(P.pointerType==="touch"?le(P):k(P))}function g(P){ye(P),R.length===0&&(i.domElement.releasePointerCapture(P.pointerId),i.domElement.removeEventListener("pointermove",y),i.domElement.removeEventListener("pointerup",g)),i.dispatchEvent(sf),s=r.NONE}function L(P){let ue;switch(P.button){case 0:ue=i.mouseButtons.LEFT;break;case 1:ue=i.mouseButtons.MIDDLE;break;case 2:ue=i.mouseButtons.RIGHT;break;default:ue=-1}switch(ue){case ir.DOLLY:if(i.enableZoom===!1)return;_e(P),s=r.DOLLY;break;case ir.ROTATE:if(P.ctrlKey||P.metaKey||P.shiftKey){if(i.enablePan===!1)return;ge(P),s=r.PAN}else{if(i.enableRotate===!1)return;fe(P),s=r.ROTATE}break;case ir.PAN:if(P.ctrlKey||P.metaKey||P.shiftKey){if(i.enableRotate===!1)return;fe(P),s=r.ROTATE}else{if(i.enablePan===!1)return;ge(P),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Va)}function k(P){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;te(P);break;case r.DOLLY:if(i.enableZoom===!1)return;de(P);break;case r.PAN:if(i.enablePan===!1)return;Ce(P);break}}function z(P){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(P.preventDefault(),i.dispatchEvent(Va),Ue(P),i.dispatchEvent(sf))}function W(P){i.enabled===!1||i.enablePan===!1||Le(P)}function he(P){switch(oe(P),R.length){case 1:switch(i.touches.ONE){case rr.ROTATE:if(i.enableRotate===!1)return;He(P),s=r.TOUCH_ROTATE;break;case rr.PAN:if(i.enablePan===!1)return;Ve(P),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case rr.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Qe(P),s=r.TOUCH_DOLLY_PAN;break;case rr.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;x(P),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Va)}function le(P){switch(oe(P),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;I(P),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;O(P),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;V(P),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;ie(P),i.update();break;default:s=r.NONE}}function ve(P){i.enabled!==!1&&P.preventDefault()}function Ae(P){R.push(P.pointerId)}function ye(P){delete j[P.pointerId];for(let ue=0;ue<R.length;ue++)if(R[ue]==P.pointerId){R.splice(ue,1);return}}function oe(P){let ue=j[P.pointerId];ue===void 0&&(ue=new De,j[P.pointerId]=ue),ue.set(P.pageX,P.pageY)}function ze(P){const ue=P.pointerId===R[0]?R[1]:R[0];return j[ue]}i.domElement.addEventListener("contextmenu",ve),i.domElement.addEventListener("pointerdown",se),i.domElement.addEventListener("pointercancel",g),i.domElement.addEventListener("wheel",z,{passive:!1}),this.update()}}const ed={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ps{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ay=new kh(-1,1,1,-1,0,1);class wy extends St{constructor(){super(),this.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Mt([0,2,0,0,2,0],2))}}const Cy=new wy;class td{constructor(e){this._mesh=new wt(Cy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ay)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class nd extends Ps{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Rt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Io.clone(e.uniforms),this.material=new Rt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new td(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class af extends Ps{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class Ry extends Ps{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Py{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new De);this._width=i.width,this._height=i.height,t=new Pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Qn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new nd(ed),this.copyPass.material.blending=Jn,this.clock=new yy}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}af!==void 0&&(a instanceof af?i=!0:a instanceof Ry&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new De);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ly extends Ps{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ye}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}const Dy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ye(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class kr extends Ps{constructor(e,t,i,r){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new De(e.x,e.y):new De(256,256),this.clearColor=new Ye(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Pn(s,a,{type:Qn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const d=new Pn(s,a,{type:Qn});d.texture.name="UnrealBloomPass.h"+f,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const p=new Pn(s,a,{type:Qn});p.texture.name="UnrealBloomPass.v"+f,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),a=Math.round(a/2)}const o=Dy;this.highPassUniforms=Io.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Rt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new De(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=ed;this.copyUniforms=Io.clone(u.uniforms),this.blendMaterial=new Rt({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:rn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ye,this.oldClearAlpha=1,this.basic=new Hi,this.fsQuad=new td(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new De(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=kr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=kr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new Rt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new De(.5,.5)},direction:{value:new De(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new Rt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}kr.BlurDirectionX=new De(1,0);kr.BlurDirectionY=new De(0,1);class lf extends Nt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new De(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const Ar=new U,cf=new pt,uf=new pt,ff=new U,hf=new U;class Uy{constructor(e={}){const t=this;let i,r,s,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:r}},this.render=function(p,_){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),cf.copy(_.matrixWorldInverse),uf.multiplyMatrices(_.projectionMatrix,cf),c(p,p,_),d(p)},this.setSize=function(p,_){i=p,r=_,s=i/2,a=r/2,l.style.width=p+"px",l.style.height=_+"px"};function c(p,_,v){if(p.isCSS2DObject){Ar.setFromMatrixPosition(p.matrixWorld),Ar.applyMatrix4(uf);const m=p.visible===!0&&Ar.z>=-1&&Ar.z<=1&&p.layers.test(v.layers)===!0;if(p.element.style.display=m===!0?"":"none",m===!0){p.onBeforeRender(t,_,v);const E=p.element;E.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(Ar.x*s+s)+"px,"+(-Ar.y*a+a)+"px)",E.parentNode!==l&&l.appendChild(E),p.onAfterRender(t,_,v)}const h={distanceToCameraSquared:u(v,p)};o.objects.set(p,h)}for(let m=0,h=p.children.length;m<h;m++)c(p.children[m],_,v)}function u(p,_){return ff.setFromMatrixPosition(p.matrixWorld),hf.setFromMatrixPosition(_.matrixWorld),ff.distanceToSquared(hf)}function f(p){const _=[];return p.traverse(function(v){v.isCSS2DObject&&_.push(v)}),_}function d(p){const _=f(p).sort(function(m,h){if(m.renderOrder!==h.renderOrder)return h.renderOrder-m.renderOrder;const E=o.objects.get(m).distanceToCameraSquared,S=o.objects.get(h).distanceToCameraSquared;return E-S}),v=_.length;for(let m=0,h=_.length;m<h;m++)_[m].element.style.zIndex=v-m}}}function Iy({canvasWrap:n,labelsHost:e}){if(!n||!e)throw new Error("Solaris requires mounted canvas and label hosts.");const t=Math.PI*2,i=10,r=.04,s=Math.PI/180,a=new fy,o=new fn(48,innerWidth/innerHeight,.002,5e4);o.position.set(38,46,74);const l=new $h({antialias:!0,powerPreference:"high-performance",alpha:!1});l.setPixelRatio(Math.min(devicePixelRatio,1.6)),l.setSize(innerWidth,innerHeight),l.outputColorSpace=zt,l.toneMapping=Mh,l.toneMappingExposure=1.05,n.appendChild(l.domElement);const c=new Uy;c.setSize(innerWidth,innerHeight),c.domElement.id="labels",e.appendChild(c.domElement);const u=new Ty(o,l.domElement);u.enableDamping=!0,u.dampingFactor=.055,u.minDistance=.015,u.maxDistance=24e3,u.target.set(0,0,0),u.screenSpacePanning=!0;const f=new Py(l);f.addPass(new Ly(a,o));const d=new kr(new De(innerWidth,innerHeight),1.25,.82,.16);f.addPass(d);const p=new nd({uniforms:{tDiffuse:{value:null},time:{value:0},enabled:{value:1}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform sampler2D tDiffuse;uniform float time,enabled;varying vec2 vUv;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))+time)*43758.5453);}void main(){vec2 d=vUv-.5;float ca=.00125*dot(d,d)*enabled;vec3 c;c.r=texture2D(tDiffuse,vUv+d*ca).r;c.g=texture2D(tDiffuse,vUv).g;c.b=texture2D(tDiffuse,vUv-d*ca).b;float lum=dot(c,vec3(.299,.587,.114));vec3 graded=mix(c,vec3(c.r*1.035,c.g*.995,c.b*1.06),.72*enabled);graded+=vec3(-.012,-.006,.018)*(1.-smoothstep(.04,.55,lum))*enabled;graded+=mix(vec3(.008,.002,.012),vec3(.001,.008,.022),vUv.y)*(1.-smoothstep(.005,.08,lum))*.45*enabled;graded*=1.-dot(d,d)*.28*enabled;graded+=(h(gl_FragCoord.xy)-.5)/255.*enabled;gl_FragColor=vec4(graded,1.);}"});f.addPass(p);const _=new My(1384504,.18);a.add(_);const v=new xy(16769198,780,0,1.78);a.add(v);const m=`
      float hash11(float p){p=fract(p*.1031);p*=p+33.33;p*=p+p;return fract(p);}
      float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
      vec3 hash33(vec3 p){p=fract(p*vec3(.1031,.103,.0973));p+=dot(p,p.yxz+33.33);return fract((p.xxy+p.yxx)*p.zyx);}
      float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(dot(hash33(i+vec3(0,0,0))-.5,f-vec3(0,0,0)),dot(hash33(i+vec3(1,0,0))-.5,f-vec3(1,0,0)),f.x),mix(dot(hash33(i+vec3(0,1,0))-.5,f-vec3(0,1,0)),dot(hash33(i+vec3(1,1,0))-.5,f-vec3(1,1,0)),f.x),f.y),mix(mix(dot(hash33(i+vec3(0,0,1))-.5,f-vec3(0,0,1)),dot(hash33(i+vec3(1,0,1))-.5,f-vec3(1,0,1)),f.x),mix(dot(hash33(i+vec3(0,1,1))-.5,f-vec3(0,1,1)),dot(hash33(i+vec3(1,1,1))-.5,f-vec3(1,1,1)),f.x),f.y),f.z)*1.8+.5;}
      float fbm(vec3 p){float f=0.,a=.52;mat3 m=mat3(.00,.80,.60,-.80,.36,-.48,-.60,-.48,.64);for(int i=0;i<6;i++){f+=a*noise3(p);p=m*p*2.03+vec3(7.1,1.7,3.4);a*=.5;}return f;}
      float turb(vec3 p){float f=0.,a=.55;for(int i=0;i<6;i++){f+=a*abs(noise3(p)*2.-1.);p=p*2.08+vec3(2.3,4.1,1.7);a*=.5;}return f;}
      float cells(vec2 P){vec2 I=floor(P),F=fract(P);float d=9.;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 r=o+vec2(hash21(I+o),hash21(I+o+17.4))-F;d=min(d,dot(r,r));}return sqrt(d);}
      mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
      float oval(vec2 p,vec2 c,vec2 s){vec2 d=p-c;d.x=atan(sin(d.x),cos(d.x));return length(d/s);}
    `,h=`
      varying vec3 vPos; varying vec3 vWorld; varying vec3 vNormal;
      void main(){vPos=normalize(position);vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;vNormal=normalize(transpose(inverse(mat3(modelMatrix)))*normal);gl_Position=projectionMatrix*viewMatrix*w;}
    `,E=`
      precision highp float; uniform float uTime,uSeed;uniform int uType;uniform vec3 uTint;uniform vec3 uSun;varying vec3 vPos,vWorld,vNormal;
      ${m}
      vec3 ramp(float x,vec3 a,vec3 b,vec3 c){return mix(mix(a,b,smoothstep(0.,.52,x)),c,smoothstep(.55,1.,x));}
      float spot(vec3 p,vec3 d,float r){return 1.-smoothstep(r,r*1.35,length(p-d));}
      void main(){
        vec3 p=normalize(vPos),N=normalize(vNormal),L=normalize(uSun-vWorld),V=normalize(cameraPosition-vWorld);float lit=max(dot(N,L),0.);float rim=pow(1.-max(dot(N,V),0.),3.);float lon=atan(p.z,p.x),lat=asin(clamp(p.y,-1.,1.));vec2 q=vec2(lon,lat);vec3 col=uTint;float emit=0.;float spec=0.;
        if(uType==0){
          vec3 wp=p*3.8+vec3(uTime*.045,-uTime*.028,uTime*.021);float w=fbm(wp+fbm(wp*1.8)*1.7);float cell=cells(vec2(lon*5.+uTime*.03,lat*9.));float gran=pow(1.-smoothstep(.10,.48,cell),2.);col=ramp(clamp(w*.78+gran*.24,0.,1.),vec3(.58,.035,.004),vec3(1.,.23,.015),vec3(1.,.86,.32));
          vec3 d1=normalize(vec3(cos(uTime*.035),.28,sin(uTime*.035)));vec3 d2=normalize(vec3(-.48,-.16,.86));vec3 d3=normalize(vec3(.18,.62,-.76));float sp=spot(p,d1,.14)+spot(p,d2,.105)+spot(p,d3,.08);col*=1.-clamp(sp,0.,.82)*.78;col+=vec3(1.,.18,.015)*pow(gran,4.)*.7;emit=1.55;
        } else if(uType==1){
          float c1=cells(q*vec2(18.,28.)),c2=cells(q*vec2(43.,68.)+9.);float rims=exp(-pow((c1-.20)*22.,2.))*.55+exp(-pow((c2-.10)*48.,2.))*.26;float pits=(1.-smoothstep(.08,.23,c1))*.55+(1.-smoothstep(.045,.11,c2))*.28;float rock=fbm(p*9.);col=vec3(.43,.42,.40)+rock*.18+rims-pits*.42;
        } else if(uType==2){
          vec3 w=p*vec3(3.,15.,3.);w.xz=rot(lat*4.+uTime*.018)*w.xz;float cloud=fbm(w+vec3(uTime*.028,0.,-uTime*.014));float wh=turb(w*1.8+uTime*.02);col=ramp(cloud*.75+wh*.25,vec3(.43,.24,.06),vec3(.84,.58,.20),vec3(1.,.88,.53));col+=vec3(1.,.65,.22)*rim*.3;
        } else if(uType==3){
          float continental=fbm(p*2.8+fbm(p*6.)*.8);float edge=fbm(p*17.);float land=smoothstep(.50+.10*(edge-.5),.59,continental);float dry=smoothstep(.55,.78,fbm(p*5.+4.));vec3 sea=mix(vec3(.004,.035,.12),vec3(.015,.20,.37),fbm(p*7.));vec3 earth=mix(vec3(.035,.25,.09),vec3(.36,.23,.08),dry);col=mix(sea,earth,land);float cloud=fbm(p*9.+vec3(uTime*.012,0,uTime*.02)+fbm(p*4.)*.9);cloud=smoothstep(.59,.78,cloud);col=mix(col,vec3(.88,.96,1.),cloud*.78);float cities=step(.91,hash21(floor(q*vec2(180.,110.))))*land*(1.-cloud);col+=vec3(1.,.45,.07)*cities*pow(1.-lit,4.)*1.7;spec=pow(max(dot(reflect(-L,N),V),0.),80.)*(1.-land)*(1.-cloud)*.8;
        } else if(uType==4){
          float maria=smoothstep(.54,.7,fbm(p*2.4+4.));float c1=cells(q*vec2(21.,34.)),c2=cells(q*vec2(58.,88.)+2.);float ring=exp(-pow((c1-.18)*27.,2.))*.4+exp(-pow((c2-.08)*55.,2.))*.2;float pit=(1.-smoothstep(.055,.2,c1))*.28;col=mix(vec3(.47),vec3(.20,.22,.22),maria)+ring-pit;
        } else if(uType==5){
          float land=fbm(p*3.4),detail=turb(p*14.);float canyon=pow(1.-abs(noise3(vec3(lon*2.,lat*20.,2.))*2.-1.),11.);col=ramp(land*.75+detail*.2,vec3(.20,.045,.018),vec3(.57,.16,.055),vec3(.78,.34,.16));col*=1.-canyon*.5;float polar=smoothstep(.77,.94,abs(p.y)+fbm(p*12.)*.06);col=mix(col,vec3(.92,.90,.82),polar);
        } else if(uType==6){
          float y=lat/1.5708;vec3 sw=p*vec3(2.,28.,2.);sw.xz=rot(noise3(vec3(lat*8.,0.,uTime*.025))*2.5)*sw.xz;float band=sin(lat*38.+fbm(sw)*5.+sin(lat*9.)*2.);float fine=fbm(sw*vec3(1.,1.7,1.)+vec3(uTime*.018,0.,-uTime*.012));float t=clamp(band*.32+fine*.68+.36,0.,1.);col=ramp(t,vec3(.27,.07,.025),vec3(.82,.39,.13),vec3(.96,.83,.62));
          vec2 rc=vec2(.33,-.17);vec2 d=vec2(atan(sin(lon-rc.x),cos(lon-rc.x))/1.75,(lat-rc.y)*4.2);float rr=length(d)*(1.+.14*fbm(vec3(d*7.,uTime*.01)));float ang=atan(d.y,d.x);float red=1.-smoothstep(.72,.98,rr);float spiral=.5+.5*sin(ang*6.-rr*15.+fbm(vec3(d*12.,uTime*.02))*5.);vec3 rcol=mix(vec3(.45,.035,.02),vec3(1.,.36,.28),spiral*.65+rr*.25);col=mix(col,rcol,red*.96);
          float s1=1.-smoothstep(.78,1.,oval(q,vec2(-1.6,.25),vec2(.21,.07))*(1.+.18*noise3(vec3(q*9.,uTime*.02))));float s2=1.-smoothstep(.78,1.,oval(q,vec2(2.15,-.42),vec2(.16,.06)));float s3=1.-smoothstep(.78,1.,oval(q,vec2(-.55,.52),vec2(.12,.045)));col=mix(col,vec3(.94,.88,.72),s1*.8+s3*.7);col=mix(col,vec3(.42,.14,.055),s2*.75);
        } else if(uType==7){
          float bands=.5+.5*sin(lat*34.+fbm(p*vec3(3.,22.,3.))*3.+uTime*.004);col=mix(vec3(.50,.34,.14),vec3(.94,.78,.47),bands*.7+fbm(p*9.)*.2);
        } else if(uType==8){
          float bands=sin(lat*42.+fbm(p*vec3(2.,20.,2.))*2.)*.5+.5;col=mix(vec3(.20,.61,.63),vec3(.58,.91,.84),bands*.12+fbm(p*5.)*.15+.45);
        } else if(uType==9){
          float cloud=fbm(p*vec3(3.,18.,3.)+vec3(uTime*.018,0,0));col=mix(vec3(.006,.055,.31),vec3(.06,.27,.70),cloud);float storm=1.-smoothstep(.72,1.,oval(q,vec2(-.55,.19),vec2(.34,.12))*(1.+.12*fbm(vec3(q*8.,uTime*.02))));col=mix(col,vec3(.005,.012,.09),storm*.85);
        } else if(uType==10){
          float n=fbm(p*4.),patchNoise=fbm(p*9.);col=ramp(n*.7+patchNoise*.25,vec3(.16,.07,.035),vec3(.48,.26,.14),vec3(.82,.69,.50));vec2 hp=vec2(atan(sin(lon-.15),cos(lon-.15))*2.35,(lat+.03)*3.5);hp.y-=.18;float hx=hp.x,hy=hp.y;float heart=pow(hx*hx+hy*hy-1.,3.)-hx*hx*hy*hy*hy;float hm=1.-smoothstep(-.22+.10*fbm(vec3(hp*4.,2.)),-.01,heart);hm*=1.-smoothstep(1.1,1.55,length(hp));col=mix(col,vec3(.93,.91,.79),hm*.92);
        } else if(uType==20){float n=fbm(p*5.);col=ramp(n,vec3(.19,.11,.015),vec3(.92,.42,.035),vec3(1.,.81,.17));float volc=smoothstep(.72,.82,fbm(p*13.));col=mix(col,vec3(.025),volc);float sulph=smoothstep(.74,.86,noise3(p*18.+8.));col=mix(col,vec3(.38,.56,.05),sulph*.8);
        } else if(uType==21){float n=fbm(p*5.);col=mix(vec3(.55,.60,.58),vec3(.94,.91,.77),n);float crack=cells(q*vec2(18.,28.));float line=1.-smoothstep(.025,.065,crack);col=mix(col,vec3(.15,.055,.035),line*.9);
        } else if(uType==22){float grooves=sin(lat*80.+fbm(p*8.)*9.)*.5+.5;col=mix(vec3(.23,.20,.17),vec3(.58,.51,.40),grooves*.55+fbm(p*4.)*.35);
        } else if(uType==23){float n=fbm(p*5.);col=mix(vec3(.06,.065,.06),vec3(.25,.24,.21),n);float impacts=step(.91,hash21(floor(q*vec2(90.,130.))));col+=vec3(.68)*impacts;
        } else if(uType==24){float n=fbm(p*6.);col=mix(vec3(.18,.075,.018),vec3(.85,.40,.10),n);col+=vec3(.3,.12,.02)*rim;
        } else if(uType==25){col=mix(vec3(.65,.70,.73),vec3(.97),fbm(p*8.));float south=smoothstep(.45,.9,-p.y);float tiger=pow(.5+.5*sin(lon*24.+lat*5.),18.)*south;col=mix(col,vec3(.05,.35,.78),tiger*.75);
        } else if(uType==26){col=mix(vec3(.25),vec3(.57),fbm(p*9.));vec3 cd=normalize(vec3(.72,.25,.64));float cr=spot(p,cd,.34);float edge=exp(-pow((length(p-cd)-.34)*22.,2.));col-=cr*.22;col+=edge*.32;
        } else if(uType==27){float side=smoothstep(-.12,.12,p.x+fbm(p*5.)*.13);col=mix(vec3(.055,.03,.018),vec3(.78,.75,.64),side);
        } else if(uType==30){col=mix(vec3(.08,.085,.09),vec3(.32,.32,.30),fbm(p*6.));float salt=step(.91,noise3(p*32.))*smoothstep(.15,.8,p.y+.2);col+=vec3(1.,.95,.75)*salt*1.7;
        } else if(uType==31){col=mix(vec3(.62),vec3(.96),fbm(p*4.));
        } else if(uType==32){col=mix(vec3(.23,.075,.045),vec3(.68,.31,.20),fbm(p*5.));
        } else if(uType==33){col=mix(vec3(.48),vec3(.82),fbm(p*6.));
        } else if(uType==34){col=mix(vec3(.27,.035,.025),vec3(.54,.13,.08),fbm(p*5.));
        } else if(uType==35){col=mix(vec3(.20,.075,.045),vec3(.60,.25,.15),fbm(p*5.));
        } else if(uType==36){col=mix(vec3(.36),vec3(.78),fbm(p*5.));
        } else if(uType==37){col=mix(vec3(.19,.045,.025),vec3(.47,.13,.07),fbm(p*6.));
        } else if(uType==40){float cr=cells(q*vec2(25.,38.));float rimC=exp(-pow((cr-.17)*30.,2.));float pit=1.-smoothstep(.05,.18,cr);col=mix(uTint*.24,uTint*1.45,fbm(p*7.));col+=rimC*.22;col-=pit*.18;
        } else if(uType==41){float grooves=turb(p*13.);float dark=smoothstep(.57,.78,fbm(p*4.));col=mix(vec3(.035,.028,.025),vec3(.25,.20,.17),grooves);col=mix(col,vec3(.015),dark*.65);
        } else if(uType==42){float ice=fbm(p*7.),scar=pow(abs(noise3(p*18.)*2.-1.),8.);col=mix(vec3(.28,.34,.38),vec3(.86,.91,.92),ice);col=mix(col,vec3(.10,.17,.22),scar*.55);
        } else if(uType==43){float n=fbm(p*6.);col=mix(vec3(.42,.30,.25),vec3(.82,.72,.59),n);float cap=smoothstep(.58,.91,p.y+fbm(p*14.)*.12);col=mix(col,vec3(.93,.78,.72),cap*.72);
        } else if(uType==44){float n=fbm(p*5.);col=mix(vec3(.15,.13,.12),vec3(.67,.61,.54),n);float canyon=pow(abs(noise3(p*21.)*2.-1.),14.);col*=1.-canyon*.42;
        } else if(uType==45){float n=fbm(p*5.),red=fbm(p*11.+4.);col=mix(vec3(.075,.025,.018),vec3(.55,.19,.10),n*.72+red*.2);
        } else if(uType==46){float metal=fbm(p*10.);col=mix(vec3(.08,.09,.10),vec3(.60,.54,.46),metal);spec=pow(max(dot(reflect(-L,N),V),0.),32.)*.55;
        } else if(uType==47){float soot=fbm(p*8.),ice=smoothstep(.69,.84,noise3(p*17.));col=mix(vec3(.018,.014,.012),vec3(.17,.14,.12),soot);col=mix(col,vec3(.62,.73,.78),ice*.55);
        } else if(uType==48){float tholin=fbm(p*5.+fbm(p*13.));col=mix(vec3(.10,.025,.012),vec3(.66,.20,.085),tholin);
        } else if(uType==49){float ice=fbm(p*6.);col=mix(vec3(.11,.12,.13),vec3(.53,.61,.65),ice);float stain=smoothstep(.57,.74,fbm(p*3.+7.));col=mix(col,vec3(.24,.15,.12),stain*.65);
        } else {col=mix(uTint*.35,uTint*1.25,fbm(p*6.));}
        if(uType==0){gl_FragColor=vec4(col*emit,1.);}else{float shade=.035+lit*.98;float back=pow(1.-lit,8.)*.018;col=col*shade+col*back+vec3(spec);gl_FragColor=vec4(col,1.);} }
    `;function S(M,C=16777215){return new Rt({vertexShader:h,fragmentShader:E,uniforms:{uTime:{value:0},uSeed:{value:Math.random()*100},uType:{value:M},uTint:{value:new Ye(C)},uSun:{value:new U}},extensions:{derivatives:!0}})}const b=(M,C=3,H=1)=>new Rt({transparent:!0,depthWrite:!1,blending:rn,side:en,vertexShader:"varying vec3 n,w;void main(){n=normalize(transpose(inverse(mat3(modelMatrix)))*normal);w=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);}",fragmentShader:"uniform vec3 c;uniform float power,intensity;varying vec3 n,w;void main(){vec3 v=normalize(cameraPosition-w);float f=pow(1.-abs(dot(normalize(n),v)),power);gl_FragColor=vec4(c*f*intensity,f*.62);}",uniforms:{c:{value:new Ye(M)},power:{value:C},intensity:{value:H}}}),N=[{id:"sun",cn:"太阳",en:"Sun",type:"恒星",shader:0,r:109.1,diameter:1392700,a:0,rot:25.38,period:0,temp:"约 5,500°C（光球层）",moons:"8 颗行星",desc:"炽热的G型主序星，动态磁场持续塑造日冕、太阳风与整个行星际空间。"},{id:"mercury",cn:"水星",en:"Mercury",type:"行星",shader:1,r:.383,diameter:4879,a:.387,e:.2056,inc:7,rot:58.65,period:.2408,temp:"−173°C — 427°C",moons:0,color:11184291},{id:"venus",cn:"金星",en:"Venus",type:"行星",shader:2,r:.949,diameter:12104,a:.723,e:.0068,inc:3.39,rot:-243,period:.6152,temp:"约 462°C",moons:0,color:15251549,atmo:[16765034,1.045,2.6,1]},{id:"earth",cn:"地球",en:"Earth",type:"行星",shader:3,r:1,diameter:12742,a:1,e:.0167,inc:0,tilt:23.44,rot:.997,period:1,temp:"−89°C — 58°C",moons:1,color:5154303,atmo:[5029119,1.055,3.2,1.25]},{id:"mars",cn:"火星",en:"Mars",type:"行星",shader:5,r:.532,diameter:6779,a:1.524,e:.0934,inc:1.85,tilt:25.19,rot:1.026,period:1.881,temp:"−125°C — 20°C",moons:2,color:13129259,atmo:[13990231,1.035,2.5,.35]},{id:"jupiter",cn:"木星",en:"Jupiter",type:"行星",shader:6,r:11.21,diameter:139820,a:5.204,e:.0489,inc:1.3,tilt:3.13,rot:.414,period:11.862,temp:"约 −145°C（云顶）",moons:95,color:14259803,desc:"太阳系最大行星。高速纬向急流围绕大红斑与众多次级涡旋持续翻卷。"},{id:"saturn",cn:"土星",en:"Saturn",type:"行星",shader:7,r:9.45,diameter:116460,a:9.583,e:.0565,inc:2.49,tilt:26.73,rot:.444,period:29.457,temp:"约 −178°C（云顶）",moons:146,color:15255938},{id:"uranus",cn:"天王星",en:"Uranus",type:"行星",shader:8,r:4.01,diameter:50724,a:19.191,e:.0472,inc:.77,tilt:97.77,rot:-.718,period:84.01,temp:"约 −224°C",moons:28,color:8575190,atmo:[6543323,1.035,3,.35]},{id:"neptune",cn:"海王星",en:"Neptune",type:"行星",shader:9,r:3.88,diameter:49244,a:30.07,e:.0086,inc:1.77,tilt:28.32,rot:.671,period:164.8,temp:"约 −214°C",moons:16,color:2383336,atmo:[2580457,1.035,3,.38]},{id:"ceres",cn:"谷神星",en:"Ceres",type:"矮行星",shader:30,r:.074,display:.095,diameter:940,a:2.767,e:.0758,inc:10.59,rot:.378,period:4.61,temp:"约 −105°C",moons:0,color:7829367},{id:"pluto",cn:"冥王星",en:"Pluto",type:"矮行星",shader:10,r:.186,display:.26,diameter:2377,a:39.482,e:.2488,inc:17.16,tilt:119.6,rot:-6.387,period:248,temp:"−240°C — −218°C",moons:5,color:13150855,desc:"冰岩矮行星。赤道附近巨大的心形汤博区由挥发性氮冰平原构成。"},{id:"eris",cn:"阋神星",en:"Eris",type:"矮行星",shader:31,r:.182,display:.23,diameter:2326,a:67.78,e:.4407,inc:44.04,rot:1.08,period:559,temp:"约 −243°C",moons:1,color:16053492},{id:"makemake",cn:"鸟神星",en:"Makemake",type:"矮行星",shader:32,r:.112,display:.19,diameter:1430,a:45.79,e:.1613,inc:28.98,rot:.951,period:306,temp:"约 −239°C",moons:1,color:11163452},{id:"haumea",cn:"妊神星",en:"Haumea",type:"矮行星",shader:33,r:.128,display:.19,diameter:1632,a:43.13,e:.1913,inc:28.19,rot:.163,period:284,temp:"约 −241°C",moons:2,color:12303291,scale:[1.75,.73,.72]},{id:"gonggong",cn:"共工星",en:"Gonggong",type:"矮行星候选体",shader:34,r:.097,display:.17,diameter:1230,a:67.49,e:.503,inc:30.74,rot:.93,period:554,temp:"约 −240°C",moons:1,color:8530204},{id:"quaoar",cn:"创神星",en:"Quaoar",type:"矮行星候选体",shader:35,r:.087,display:.16,diameter:1110,a:43.69,e:.039,inc:7.99,rot:.737,period:289,temp:"约 −235°C",moons:1,color:10309685},{id:"orcus",cn:"亡神星",en:"Orcus",type:"矮行星候选体",shader:36,r:.072,display:.15,diameter:910,a:39.17,e:.227,inc:20.59,rot:.433,period:245,temp:"约 −230°C",moons:1,color:12369084},{id:"ixion",cn:"厄耳枯斯",en:"Ixion",type:"矮行星候选体",shader:37,r:.055,display:.14,diameter:710,a:39.67,e:.244,inc:19.62,rot:"未知",period:250,temp:"约 −230°C",moons:0,color:7418658},{id:"sedna",cn:"塞德娜",en:"Sedna",type:"远日矮行星候选体",shader:48,r:.078,display:.18,diameter:995,a:506.8,e:.8496,inc:11.93,rot:.42,period:11390,temp:"约 −261°C",moons:0,color:10170135,desc:"目前已知近日点最遥远的太阳系天体之一，暗红表面可能富含托林有机物。"},{id:"ms4",cn:"2002 MS₄",en:"2002 MS4",aliases:"MS4",type:"矮行星候选体",shader:42,r:.063,display:.145,diameter:800,a:41.8,e:.141,inc:17.7,rot:.33,period:270,temp:"约 −235°C",moons:0,color:10201258},{id:"salacia",cn:"潫神星",en:"Salacia",type:"矮行星候选体",shader:45,r:.067,display:.15,diameter:846,a:42.18,e:.106,inc:23.9,rot:.25,period:274,temp:"约 −236°C",moons:1,color:7418913},{id:"varda",cn:"瓦尔妲星",en:"Varda",type:"矮行星候选体",shader:42,r:.058,display:.14,diameter:740,a:46.1,e:.14,inc:21.5,rot:.245,period:313,temp:"约 −238°C",moons:1,color:11971232},{id:"varuna",cn:"伐楼拿星",en:"Varuna",type:"海王星外天体",shader:48,r:.052,display:.135,diameter:668,a:43.2,e:.051,inc:17.2,rot:.264,period:284,temp:"约 −236°C",moons:0,color:9978409,scale:[1.35,.88,.88]},{id:"arrokoth",cn:"天涯海角",en:"Arrokoth",aliases:"阿罗科斯 2014 MU69",type:"柯伊伯带小天体",shader:48,r:.003,display:.085,diameter:36,a:44.58,e:.041,inc:2.45,rot:.663,period:298,temp:"约 −230°C",moons:0,color:9186584,bilobed:!0,irregular:!0,desc:"新视野号飞掠的接触双星，两个原始小天体以极低速柔和结合。"},{id:"juno",cn:"婚神星",en:"Juno",type:"小行星",shader:40,r:.018,display:.085,diameter:234,a:2.67,e:.257,inc:12.99,rot:.3,period:4.36,temp:"约 −110°C",moons:0,color:9142647,irregular:!0},{id:"hebe",cn:"韶神星",en:"6 Hebe",aliases:"青春女神星",type:"小行星",shader:40,r:.015,display:.08,diameter:186,a:2.426,e:.202,inc:14.75,rot:.303,period:3.78,temp:"约 −118°C",moons:0,color:9075307,irregular:!0},{id:"hygiea",cn:"健神星",en:"Hygiea",type:"小行星",shader:41,r:.034,display:.092,diameter:434,a:3.14,e:.112,inc:3.84,rot:.575,period:5.56,temp:"约 −160°C",moons:0,color:5130564,irregular:!0},{id:"psyche",cn:"灵神星",en:"16 Psyche",aliases:"普绪克",type:"金属小行星",shader:46,r:.017,display:.082,diameter:226,a:2.92,e:.134,inc:3.1,rot:.174,period:4.99,temp:"约 −170°C — 40°C",moons:0,color:10258029,irregular:!0},{id:"eros",cn:"爱神星",en:"Eros",type:"近地小行星",shader:40,r:.0013,display:.07,diameter:16.8,a:1.458,e:.223,inc:10.83,rot:.219,period:1.76,temp:"约 −150°C — 100°C",moons:0,color:9335645,irregular:!0,scale:[1.7,.68,.65]},{id:"bennu",cn:"贝努",en:"Bennu",type:"近地小行星",shader:41,r:39e-6,display:.062,diameter:.492,a:1.126,e:.204,inc:6.03,rot:.179,period:1.195,temp:"约 −37°C — 127°C",moons:0,color:4209978,irregular:!0},{id:"hektor",cn:"赫克托",en:"624 Hektor",type:"木星特洛伊小行星",shader:45,r:.018,display:.09,diameter:225,a:5.22,e:.024,inc:18.2,rot:.288,period:11.94,temp:"约 −150°C",moons:1,color:7881261,irregular:!0,bilobed:!0},{id:"phaethon",cn:"法厄同",en:"Phaethon",type:"活跃小行星",shader:47,r:46e-5,display:.068,diameter:5.8,a:1.271,e:.89,inc:22.26,rot:.15,period:1.433,temp:"近日点约 750°C",moons:0,color:4866104,irregular:!0},{id:"chiron",cn:"喀戎",en:"Chiron",type:"半人马小行星",shader:47,r:.017,display:.082,diameter:218,a:13.64,e:.383,inc:6.93,rot:.246,period:50.3,temp:"约 −185°C",moons:0,color:5918792,irregular:!0},{id:"chariklo",cn:"女凯龙星",en:"Chariklo",type:"半人马小行星",shader:41,r:.02,display:.086,diameter:258,a:15.8,e:.172,inc:23.4,rot:.292,period:62.8,temp:"约 −198°C",moons:0,color:6445908,irregular:!0,hasRing:!0},{id:"pholus",cn:"人龙星",en:"Pholus",type:"半人马小行星",shader:48,r:.015,display:.078,diameter:190,a:20.3,e:.571,inc:24.7,rot:.416,period:91.5,temp:"约 −210°C",moons:0,color:10305313,irregular:!0},{id:"halley",cn:"哈雷彗星",en:"1P/Halley",aliases:"Halley",type:"周期彗星",shader:47,r:86e-5,display:.072,diameter:11,a:17.834,e:.9671,inc:162.26,rot:2.2,period:75.3,temp:"随日距剧烈变化",moons:0,color:5591115,irregular:!0,comet:!0,retro:!0},{id:"encke",cn:"恩克彗星",en:"2P/Encke",type:"周期彗星",shader:47,r:37e-5,display:.064,diameter:4.8,a:2.215,e:.848,inc:11.8,rot:.47,period:3.3,temp:"随日距剧烈变化",moons:0,color:4735807,irregular:!0,comet:!0},{id:"churyumov",cn:"丘留莫夫－格拉西缅科",en:"67P/Churyumov–Gerasimenko",aliases:"67P 罗塞塔",type:"周期彗星",shader:47,r:32e-5,display:.064,diameter:4.1,a:3.463,e:.641,inc:7.04,rot:.517,period:6.45,temp:"随日距剧烈变化",moons:0,color:4604478,irregular:!0,comet:!0,bilobed:!0},{id:"halebopp",cn:"海尔－波普彗星",en:"C/1995 O1 Hale–Bopp",aliases:"Hale-Bopp",type:"长周期彗星",shader:47,r:.0047,display:.078,diameter:60,a:186,e:.995,inc:89.4,rot:.49,period:2533,temp:"随日距剧烈变化",moons:0,color:6117200,irregular:!0,comet:!0}],D=[{id:"moon",parent:"earth",cn:"月球",en:"Moon",type:"卫星",shader:4,r:.273,display:.035,diameter:3475,aMoon:.19,rot:27.32,periodDays:27.32,temp:"−173°C — 127°C",moons:0,color:11184810},{id:"io",parent:"jupiter",cn:"木卫一",en:"Io",aliases:"伊奥",type:"卫星",shader:20,r:.286,display:.075,diameter:3643,aMoon:.78,rot:1.769,periodDays:1.769,temp:"约 −143°C",moons:0,color:15308584},{id:"europa",parent:"jupiter",cn:"木卫二",en:"Europa",aliases:"欧罗巴",type:"卫星",shader:21,r:.245,display:.065,diameter:3122,aMoon:1.08,rot:3.551,periodDays:3.551,temp:"约 −160°C",moons:0,color:14999498},{id:"ganymede",parent:"jupiter",cn:"木卫三",en:"Ganymede",aliases:"盖尼米得",type:"卫星",shader:22,r:.413,display:.095,diameter:5268,aMoon:1.48,rot:7.155,periodDays:7.155,temp:"约 −163°C",moons:0,color:8615528},{id:"callisto",parent:"jupiter",cn:"木卫四",en:"Callisto",aliases:"卡里斯托",type:"卫星",shader:23,r:.378,display:.087,diameter:4821,aMoon:2,rot:16.69,periodDays:16.69,temp:"约 −139°C",moons:0,color:4999490},{id:"titan",parent:"saturn",cn:"土卫六",en:"Titan",aliases:"泰坦",type:"卫星",shader:24,r:.404,display:.1,diameter:5150,aMoon:1.75,rot:15.95,periodDays:15.95,temp:"约 −179°C",moons:0,color:13136676,atmo:[15764015,1.11,2.2,.8]},{id:"enceladus",parent:"saturn",cn:"土卫二",en:"Enceladus",aliases:"恩克拉多斯",type:"卫星",shader:25,r:.0395,display:.052,diameter:504,aMoon:.95,rot:1.37,periodDays:1.37,temp:"约 −201°C",moons:0,color:15399167},{id:"mimas",parent:"saturn",cn:"土卫一",en:"Mimas",aliases:"弥玛斯",type:"卫星",shader:26,r:.031,display:.048,diameter:396,aMoon:.67,rot:.942,periodDays:.942,temp:"约 −209°C",moons:0,color:9605778},{id:"iapetus",parent:"saturn",cn:"土卫八",en:"Iapetus",aliases:"伊阿珀托斯",type:"卫星",shader:27,r:.115,display:.07,diameter:1469,aMoon:2.7,distanceKm:3560820,rot:79.32,periodDays:79.32,temp:"约 −143°C",moons:0,color:10063992},{id:"phobos",parent:"mars",cn:"火卫一",en:"Phobos",type:"卫星",shader:41,r:.0018,display:.042,diameter:22.5,aMoon:.13,distanceKm:9376,rot:.319,periodDays:.319,temp:"约 −112°C",moons:0,color:5326911,irregular:!0},{id:"deimos",parent:"mars",cn:"火卫二",en:"Deimos",type:"卫星",shader:41,r:.001,display:.034,diameter:12.4,aMoon:.205,distanceKm:23463,rot:1.263,periodDays:1.263,temp:"约 −40°C",moons:0,color:7102547,irregular:!0},{id:"amalthea",parent:"jupiter",cn:"木卫五",en:"Amalthea",type:"卫星",shader:45,r:.013,display:.048,diameter:167,aMoon:.55,distanceKm:181366,rot:.498,periodDays:.498,temp:"约 −148°C",moons:0,color:8202265,scale:[1.55,.8,.75]},{id:"tethys",parent:"saturn",cn:"土卫三",en:"Tethys",type:"卫星",shader:42,r:.083,display:.058,diameter:1062,aMoon:.84,distanceKm:294619,rot:1.888,periodDays:1.888,temp:"约 −187°C",moons:0,color:14476774},{id:"dione",parent:"saturn",cn:"土卫四",en:"Dione",type:"卫星",shader:42,r:.088,display:.061,diameter:1123,aMoon:1.1,distanceKm:377396,rot:2.737,periodDays:2.737,temp:"约 −186°C",moons:0,color:13621466},{id:"rhea",parent:"saturn",cn:"土卫五",en:"Rhea",type:"卫星",shader:42,r:.12,display:.068,diameter:1528,aMoon:1.38,distanceKm:527108,rot:4.518,periodDays:4.518,temp:"约 −174°C",moons:0,color:13160658},{id:"hyperion",parent:"saturn",cn:"土卫七",en:"Hyperion",type:"卫星",shader:40,r:.021,display:.05,diameter:270,aMoon:2.16,distanceKm:1481009,rot:13,periodDays:21.28,temp:"约 −180°C",moons:0,color:8285528,irregular:!0,scale:[1.35,.9,.78]},{id:"miranda",parent:"uranus",cn:"天卫五",en:"Miranda",type:"卫星",shader:44,r:.037,display:.05,diameter:472,aMoon:.49,distanceKm:129390,rot:1.413,periodDays:1.413,temp:"约 −213°C",moons:0,color:11185840},{id:"ariel",parent:"uranus",cn:"天卫一",en:"Ariel",type:"卫星",shader:42,r:.091,display:.06,diameter:1158,aMoon:.67,distanceKm:190900,rot:2.52,periodDays:2.52,temp:"约 −213°C",moons:0,color:12963536},{id:"umbriel",parent:"uranus",cn:"天卫二",en:"Umbriel",type:"卫星",shader:49,r:.092,display:.06,diameter:1169,aMoon:.84,distanceKm:266e3,rot:4.144,periodDays:4.144,temp:"约 −198°C",moons:0,color:5461849},{id:"titania",parent:"uranus",cn:"天卫三",en:"Titania",type:"卫星",shader:42,r:.124,display:.068,diameter:1578,aMoon:1.05,distanceKm:436300,rot:8.706,periodDays:8.706,temp:"约 −203°C",moons:0,color:12108227},{id:"oberon",parent:"uranus",cn:"天卫四",en:"Oberon",type:"卫星",shader:49,r:.119,display:.067,diameter:1523,aMoon:1.28,distanceKm:583500,rot:13.46,periodDays:13.46,temp:"约 −198°C",moons:0,color:7830396},{id:"proteus",parent:"neptune",cn:"海卫八",en:"Proteus",type:"卫星",shader:41,r:.033,display:.049,diameter:420,aMoon:.5,distanceKm:117647,rot:1.122,periodDays:1.122,temp:"约 −222°C",moons:0,color:5132112,irregular:!0},{id:"triton",parent:"neptune",cn:"海卫一",en:"Triton",aliases:"崔顿 催顿",type:"卫星",shader:43,r:.212,display:.082,diameter:2707,aMoon:.78,distanceKm:354759,incMoon:157.3,retro:!0,rot:-5.877,periodDays:5.877,temp:"约 −235°C",moons:0,color:14268076,desc:"逆行轨道揭示它很可能是被海王星俘获的柯伊伯带天体，表面存在氮冰喷泉。"},{id:"nereid",parent:"neptune",cn:"海卫二",en:"Nereid",type:"卫星",shader:42,r:.027,display:.046,diameter:340,aMoon:1.32,eMoon:.751,distanceKm:5513818,incMoon:7.2,rot:11.6,periodDays:360.1,temp:"约 −220°C",moons:0,color:11450298},{id:"charon",parent:"pluto",cn:"冥卫一",en:"Charon",aliases:"卡戎",type:"卫星",shader:49,r:.095,display:.09,diameter:1212,aMoon:.48,distanceKm:19596,incMoon:0,rot:6.387,periodDays:6.387,temp:"约 −220°C",moons:0,color:9081492,desc:"相对冥王星异常巨大的伴星，两者围绕位于冥王星外部的共同质心旋转。"},{id:"dysnomia",parent:"eris",cn:"阋卫一",en:"Dysnomia",type:"卫星",shader:41,r:.055,display:.048,diameter:700,aMoon:.43,distanceKm:37350,rot:15.8,periodDays:15.8,temp:"约 −243°C",moons:0,color:7829367},{id:"hiiaka",parent:"haumea",cn:"妊卫一",en:"Hiʻiaka",type:"卫星",shader:42,r:.025,display:.045,diameter:320,aMoon:.48,distanceKm:49880,rot:49.5,periodDays:49.5,temp:"约 −240°C",moons:0,color:14081248},{id:"namaka",parent:"haumea",cn:"妊卫二",en:"Namaka",type:"卫星",shader:42,r:.013,display:.038,diameter:170,aMoon:.31,distanceKm:25657,incMoon:13,rot:18.3,periodDays:18.3,temp:"约 −240°C",moons:0,color:12831696},{id:"mk2",parent:"makemake",cn:"鸟卫一",en:"S/2015 (136472) 1",aliases:"MK2",type:"卫星",shader:41,r:.014,display:.04,diameter:175,aMoon:.37,distanceKm:21e3,rot:12.4,periodDays:12.4,temp:"约 −239°C",moons:0,color:4473150},{id:"weywot",parent:"quaoar",cn:"创卫一",en:"Weywot",type:"卫星",shader:45,r:.013,display:.04,diameter:170,aMoon:.34,eMoon:.14,distanceKm:14500,rot:12.4,periodDays:12.4,temp:"约 −235°C",moons:0,color:6959142},{id:"vanth",parent:"orcus",cn:"亡卫一",en:"Vanth",type:"卫星",shader:49,r:.035,display:.047,diameter:440,aMoon:.34,distanceKm:9e3,rot:9.54,periodDays:9.54,temp:"约 −230°C",moons:0,color:8550254},{id:"xiangliu",parent:"gonggong",cn:"相柳",en:"Xiangliu",type:"卫星",shader:45,r:.008,display:.037,diameter:100,aMoon:.38,eMoon:.29,distanceKm:24e3,rot:25.2,periodDays:25.2,temp:"约 −240°C",moons:0,color:6500385}],R=[...N,...D],j=new Map,T=[],w=[];let K=[];function re(M,C){const H=M.a*i,Z=M.e||0,me=H*Math.sqrt(1-Z*Z),Te=H*(Math.cos(C)-Z),Be=me*Math.sin(C),Ie=(M.inc||0)*s;return new U(Te,-Be*Math.sin(Ie),Be*Math.cos(Ie))}function xe(M,C){M=(M%t+t)%t;let H=C<.8?M:Math.PI;for(let Z=0;Z<6;Z++)H-=(H-C*Math.sin(H)-M)/(1-C*Math.cos(H));return H}function B(M,C){const H=M.eMoon||0,Z=M.aMoon,me=Z*Math.sqrt(1-H*H),Te=Z*(Math.cos(C)-H),Be=me*Math.sin(C),Ie=(M.incMoon||0)*s;return new U(Te,-Be*Math.sin(Ie),Be*Math.cos(Ie))}function X(M,C=!1,H=null){const Z=[];for(let ot=0;ot<=256;ot++){let bt=t*ot/256;C?Z.push(B(M,bt)):Z.push(re(M,bt))}const me=new St().setFromPoints(Z),Te=M.type.includes("矮")||M.type.includes("彗星")||M.type.includes("小行星")||M.type.includes("海王星外"),Be=new $u({color:M.color||5400444,transparent:!0,opacity:Te?.15:.34,dashSize:C?.05:Te?.3:.18,gapSize:C?.035:Te?.25:.12,depthWrite:!1}),Ie=new as(me,Be);return Ie.computeLineDistances(),Ie.userData.owner=M.id,Ie.userData.baseOpacity=Be.opacity,(H||a).add(Ie),w.push(Ie),Ie}function J(M,C,H=""){const Z=document.createElement("div");Z.className="celestial-label "+H,Z.textContent=C.cn+" · "+C.en;const me=new lf(Z);return me.position.set(0,(C.display||C.r*r)+.12,0),M.add(me),M.userData.label=me,me}function ne(M,C,H=.16){const Z=M.attributes.position;for(let me=0;me<Z.count;me++){const Te=.5+.5*Math.sin(me*91.73+C*17.1)*Math.sin(me*17.31+C),Be=new U().fromBufferAttribute(Z,me).multiplyScalar(1+(Te-.5)*H);Z.setXYZ(me,Be.x,Be.y,Be.z)}Z.needsUpdate=!0,M.computeVertexNormals()}function Q(M){const C=M.display||M.r*r,H=M.shader===0?96:C<.07?28:Math.min(64,36+Math.floor(C*18)),Z=new mi(C,H,Math.max(18,H/2));M.irregular&&ne(Z,ze(M.id),.28);const me=new wt(Z,S(M.shader,M.color));me.name=M.cn,me.userData.body=M,me.renderOrder=M.shader===0?2:1;const Te=new xi;if(Te.userData.body=M,Te.add(me),Te.rotation.z=(M.tilt||0)*s,M.scale&&me.scale.set(...M.scale),M.bilobed){me.scale.set(.68,.64,.62),me.position.x=-C*.34;const Ie=new wt(Z.clone(),me.material);Ie.scale.set(.47,.52,.49),Ie.position.x=C*.72,Ie.userData.body=M,me.add(Ie),K.push(Ie)}a.add(Te),M.node=Te,M.mesh=me,j.set(M.id,M),K.push(me);const Be=Math.max(C,C<.12?.12:C*1.06);if(Be>C*1.2){const Ie=new wt(new mi(Be,12,8),new Hi({transparent:!0,opacity:0,depthWrite:!1}));Ie.userData.body=M,Te.add(Ie),K.push(Ie)}if(J(Te,M,M.type.includes("矮")||M.a>30?"dwarf":""),M.a>0&&(M.orbitLine=X(M)),M.atmo){const Ie=new wt(new mi(C*M.atmo[1],48,32),b(M.atmo[0],M.atmo[2],M.atmo[3]));Te.add(Ie),T.push(Ie),M.atmosphere=Ie}return M}N.forEach(Q);function ae(M){const C=j.get(M.parent),H=M.display||M.r*r,Z=new mi(H,H<.05?24:36,20);M.irregular&&ne(Z,ze(M.id),.3);const me=new wt(Z,S(M.shader,M.color));me.userData.body=M,me.name=M.cn,M.scale&&me.scale.set(...M.scale);const Te=new xi;Te.add(me),C.node.add(Te),M.node=Te,M.mesh=me,j.set(M.id,M),K.push(me);const Be=new wt(new mi(Math.max(H,.055),10,8),new Hi({transparent:!0,opacity:0,depthWrite:!1}));if(Be.userData.body=M,Te.add(Be),K.push(Be),J(Te,M,"moon"),M.orbitLine=X(M,!0,C.node),M.atmo){const Ie=new wt(new mi(H*M.atmo[1],36,22),b(M.atmo[0],M.atmo[2],M.atmo[3]));Te.add(Ie),T.push(Ie),M.atmosphere=Ie}return M}D.forEach(ae);const fe="varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",_e=`precision highp float;varying vec3 p;uniform float time;${m}void main(){float r=length(p.xy);float t=clamp((r-0.52)/(1.-.52),0.,1.);float cass=1.-smoothstep(.012,.026,abs(t-.57));float bands=.48+.42*sin(t*210.)+.18*sin(t*731.);float grain=hash21(floor(vec2(atan(p.y,p.x)*900.,r*1700.)));if(grain<.15+sin(t*60.)*.05)discard;vec3 col=mix(vec3(.92,.78,.48),vec3(.58,.64,.69),smoothstep(.42,1.,t));col=mix(col,vec3(.67,.43,.24),smoothstep(.2,.65,t)*(1.-smoothstep(.65,.92,t)));float edge=smoothstep(.0,.035,t)*(1.-smoothstep(.95,1.,t));float a=(.22+.34*bands)*cass*edge;gl_FragColor=vec4(col*a,a);}`,ge=j.get("saturn"),te=ge.r*r,de=new vs(te*1.18,te*2.36,320,5),Ce=new Rt({vertexShader:fe,fragmentShader:_e,transparent:!0,side:hn,depthWrite:!1,blending:Vi,uniforms:{time:{value:0}}}),Ue=new wt(de,Ce);Ue.rotation.x=Math.PI/2,ge.node.add(Ue),ge.ring=Ue;function Le(M,C,H,Z,me=.13){const Te=j.get(M),Be=Te.display||Te.r*r,Ie=new vs(Be*C,Be*H,160,2),ot=new Hi({color:Z,transparent:!0,opacity:me,side:hn,depthWrite:!1}),bt=new wt(Ie,ot);return bt.rotation.x=Math.PI/2,Te.node.add(bt),bt}Le("uranus",1.55,2.05,7576219),Le("neptune",1.55,1.85,3231873),Le("chariklo",1.45,1.82,13152135,.32),Le("haumea",1.72,2.05,11058122,.2),Le("quaoar",2.1,2.35,12029557,.17);function He(M=256){const C=document.createElement("canvas");C.width=C.height=M;const H=C.getContext("2d"),Z=H.createRadialGradient(M/2,M/2,0,M/2,M/2,M/2);return Z.addColorStop(0,"rgba(255,255,255,1)"),Z.addColorStop(.08,"rgba(255,255,255,.9)"),Z.addColorStop(.28,"rgba(255,255,255,.28)"),Z.addColorStop(.65,"rgba(255,255,255,.055)"),Z.addColorStop(1,"rgba(255,255,255,0)"),H.fillStyle=Z,H.fillRect(0,0,M,M),new Ku(C)}const Ve=He();[[16743193,13,.46],[16758843,21,.21],[6127359,34,.075]].forEach(([M,C,H],Z)=>{const me=new Bu(new ul({map:Ve,color:M,transparent:!0,opacity:H,blending:rn,depthWrite:!1,depthTest:Z===0}));me.scale.setScalar(C),me.renderOrder=-Z,a.add(me)});function Fe(){const M=document.createElement("canvas");M.width=M.height=512;const C=M.getContext("2d");C.translate(256,256);for(let H=0;H<180;H++){const Z=H*2.39996,me=55+210*Math.pow(Math.sin(H*91.17)*.5+.5,3),Te=.012+.04*(H%7===0);C.strokeStyle=`rgba(255,188,88,${Te})`,C.lineWidth=H%13===0?1.5:.5,C.beginPath(),C.moveTo(Math.cos(Z)*26,Math.sin(Z)*26),C.lineTo(Math.cos(Z)*me,Math.sin(Z)*me),C.stroke()}return new Ku(M)}const Qe=new Bu(new ul({map:Fe(),color:16753980,transparent:!0,opacity:.34,alphaTest:.008,blending:rn,depthWrite:!1}));Qe.scale.setScalar(34),a.add(Qe);{const C=new Float32Array(2850),H=new Float32Array(950);for(let Be=0;Be<950;Be++){const Ie=new U().randomDirection();C.set([Ie.x,Ie.y,Ie.z],Be*3),H[Be]=Math.random()}const Z=new St;Z.setAttribute("position",new Ct(C,3)),Z.setAttribute("seed",new Ct(H,1));const me=new Rt({transparent:!0,depthWrite:!1,blending:rn,uniforms:{time:{value:0}},vertexShader:"attribute float seed;uniform float time;varying float a;void main(){float life=fract(seed+time*(.018+seed*.025));vec3 p=normalize(position)*(2.5+life*14.);p+=normalize(vec3(position.z,-position.x,position.y))*sin(life*18.+seed*44.)*.16*life;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.2+seed*2.2)*(230./-mv.z);a=(1.-life)*smoothstep(0.,.1,life);}",fragmentShader:"varying float a;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.38,.08,(1.-d*2.)*a*.65);}"}),Te=new rs(Z,me);Te.userData.solarWind=!0,a.add(Te)}a.background=new Ye(66316);const x=12e3;let I;{const M=new Float32Array(x*3),C=new Float32Array(x),H=new Float32Array(x);for(let Te=0;Te<x;Te++){const Be=new U().randomDirection().multiplyScalar(18e3+Math.random()*8e3);M.set([Be.x,Be.y,Be.z],Te*3),C[Te]=.5+Math.pow(Math.random(),7)*5,H[Te]=Math.random()}const Z=new St;Z.setAttribute("position",new Ct(M,3)),Z.setAttribute("size",new Ct(C,1)),Z.setAttribute("seed",new Ct(H,1));const me=new Rt({transparent:!0,depthWrite:!1,blending:rn,uniforms:{time:{value:0}},vertexShader:"attribute float size,seed;uniform float time;varying float vSeed,vTwinkle;void main(){vSeed=seed;vTwinkle=.68+.32*sin(time*(.5+seed*2.)+seed*91.);vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=size*(9000./-mv.z);}",fragmentShader:"varying float vSeed,vTwinkle;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 a=vec3(.52,.66,1.),b=vec3(1.,.78,.55);vec3 c=mix(a,b,smoothstep(.68,.9,vSeed));gl_FragColor=vec4(c,vTwinkle*(1.-d*2.));}"});I=new rs(Z,me),I.renderOrder=-4,a.add(I)}let O;{const C=new Float32Array(11400),H=new Float32Array(3800);for(let Te=0;Te<3800;Te++){const Be=(.22+Math.pow(Math.random(),1.7)*4.1)*i,Ie=Math.random()*t,ot=(Math.random()-.5)*Be*.055;C.set([Math.cos(Ie)*Be,ot,Math.sin(Ie)*Be],Te*3),H[Te]=Math.random()}const Z=new St;Z.setAttribute("position",new Ct(C,3)),Z.setAttribute("seed",new Ct(H,1));const me=new Rt({transparent:!0,depthWrite:!1,blending:rn,vertexShader:"attribute float seed;varying float a;void main(){a=seed;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(.35+seed*.75)*(260./-mv.z);}",fragmentShader:"varying float a;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.38+.25*a,.12,(1.-d*2.)*.18);}"});O=new rs(Z,me),a.add(O)}const q=new xi,V=new wt(new vs(.95*i,1.67*i,192,1),new Hi({color:4774304,transparent:!0,opacity:.055,side:hn,depthWrite:!1,blending:rn}));V.rotation.x=-Math.PI/2,q.add(V);const ie=new Ey(1200,60,5023687,1653332);ie.material.transparent=!0,ie.material.opacity=.12,ie.material.depthWrite=!1,q.add(ie),q.visible=!1,a.add(q);const se=new xi;a.add(se);const y=440;function g(M){const C=new Vl(.055,1),H=C.attributes.position;for(let Z=0;Z<H.count;Z++){const me=Math.sin(Z*12.9898+M*7.31)*43758.5453%1,Te=.62+Math.abs(me)*.56;H.setXYZ(Z,H.getX(Z)*Te,H.getY(Z)*Te,H.getZ(Z)*Te)}return C.computeVertexNormals(),C}for(let M=0;M<4;M++){const C=y/4,H=new py(g(M+2),new gy({color:new Ye().setHSL(.08,.08,.25+M*.025),roughness:1,metalness:0}),C),Z=new Nt;for(let me=0;me<C;me++){const Te=(2.12+Math.random()*1.22)*i,Be=.02+Math.random()*.22,Ie=Math.random()*t,ot=Te*Math.sqrt(1-Be*Be),bt=(Math.random()-.5)*.28;Z.position.set(Te*(Math.cos(Ie)-Be),Math.sin(Ie)*ot*Math.sin(bt),Math.sin(Ie)*ot*Math.cos(bt)),Z.rotation.set(Math.random()*t,Math.random()*t,Math.random()*t);const En=.45+Math.random()*1.9;Z.scale.set(En*(.7+Math.random()*.5),En*(.65+Math.random()*.55),En*(.65+Math.random()*.5)),Z.updateMatrix(),H.setMatrixAt(me,Z.matrix)}H.instanceMatrix.needsUpdate=!0,se.add(H)}function L(M,C,H,Z,me,Te,Be,Ie){const ot={id:M,cn:C,en:H,type:"小行星",shader:Be,r:Ie/r,display:Ie,diameter:M==="vesta"?525:513,a:Z,e:me,inc:Te,rot:M==="vesta"?.222:.325,period:M==="vesta"?3.63:4.62,temp:"约 −188°C — −3°C",moons:0,color:M==="vesta"?11184288:6907748,desc:"小行星带中的大型原行星残骸，表面保留着早期太阳系的碰撞历史。"};return R.push(ot),Q(ot),ot.mesh.geometry=g(Math.random()*9),ot.mesh.scale.setScalar(Ie/.055),ot.mesh.material=S(Be,ot.color),ot}L("vesta","灶神星","Vesta",2.362,.089,7.14,40,.09),L("pallas","智神星","Pallas",2.773,.231,34.84,40,.085);let k;{const C=new Float32Array(19500),H=new Float32Array(6500);for(let Te=0;Te<6500;Te++){const Be=(34+Math.random()*26)*i,Ie=Math.random()*.24,ot=Math.random()*t,bt=Be*Math.sqrt(1-Ie*Ie),En=(Math.random()-.5)*.42;C.set([Be*(Math.cos(ot)-Ie),Math.sin(ot)*bt*Math.sin(En),Math.sin(ot)*bt*Math.cos(En)],Te*3),H[Te]=Math.random()}const Z=new St;Z.setAttribute("position",new Ct(C,3)),Z.setAttribute("seed",new Ct(H,1));const me=new Rt({transparent:!0,depthWrite:!1,blending:rn,vertexShader:"attribute float seed;varying float s;void main(){s=seed;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(.5+seed*1.25)*(500./-mv.z);}",fragmentShader:"varying float s;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(.44+.4*s,.68+.25*s,1.,(1.-d*2.)*.42);}"});k=new rs(Z,me),a.add(k)}{const C=new Float32Array(7800);for(let me=0;me<2600;me++){const Te=new U().randomDirection().multiplyScalar(13e3+Math.random()*9e3);C.set([Te.x,Te.y,Te.z],me*3)}const H=new St;H.setAttribute("position",new Ct(C,3));const Z=new Jh({size:3.2,color:7573674,transparent:!0,opacity:.18,depthWrite:!1});a.add(new rs(H,Z))}const z=[];function W(M,C,H=0){const me=[],Te=[],Be=[];for(let ot=0;ot<=18;ot++){const bt=ot/18,En=C*(.18+Math.pow(bt,.72)),kl=H*bt*bt;if(me.push(kl-En,0,bt*M,kl+En,0,bt*M),Te.push(0,bt,1,bt),ot<18){const tr=ot*2;Be.push(tr,tr+1,tr+2,tr+1,tr+3,tr+2)}}const Ie=new St;return Ie.setAttribute("position",new Mt(me,3)),Ie.setAttribute("uv",new Mt(Te,2)),Ie.setIndex(Be),Ie}function he(M){const C=me=>new wt(W(me?28:19,me?.42:.72,me?0:.85),new Rt({transparent:!0,depthWrite:!1,side:hn,blending:rn,uniforms:{activity:{value:0},ion:{value:me?1:0}},vertexShader:"varying vec2 u;void main(){u=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform float activity,ion;varying vec2 u;void main(){float edge=pow(sin(u.x*3.14159),.7);float fade=pow(1.-u.y,.8)*edge*activity;vec3 c=mix(vec3(1.,.48,.16),vec3(.22,.64,1.),ion);gl_FragColor=vec4(c*fade,fade*.62);}"})),H=C(!0),Z=C(!1);a.add(H,Z),M.tails=[H,Z],z.push(M)}N.filter(M=>M.comet).forEach(he);const le=[],ve=new Rt({transparent:!0,depthWrite:!1,blending:rn,vertexColors:!0,uniforms:{life:{value:0}},vertexShader:"attribute float fade;varying float v;void main(){v=fade;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform float life;varying float v;void main(){gl_FragColor=vec4(mix(vec3(1.,.38,.05),vec3(1.),v),v*(1.-life));}"});function Ae(){const M=new U((Math.random()-.5)*240,50+Math.random()*90,(Math.random()-.5)*180),C=new U(-.7-Math.random(),-.2-Math.random()*.35,.2*(Math.random()-.5)).normalize(),H=[],Z=[];for(let Be=0;Be<18;Be++){const Ie=Be/17;H.push(...M.clone().addScaledVector(C,Ie*22).toArray()),Z.push(Ie)}const me=new St;me.setAttribute("position",new Mt(H,3)),me.setAttribute("fade",new Mt(Z,1));const Te=new as(me,ve.clone());a.add(Te),le.push({line:Te,life:0,duration:.55+Math.random()*.35,vel:C.multiplyScalar(52)})}const ye={days:0,speed:20,direction:1,date:new Date("2046-01-01T00:00:00Z")};function oe(){for(const M of N.concat(R.filter(C=>C.id==="vesta"||C.id==="pallas"))){if(M.a){const C=ze(M.id)%1e3/1e3*t,H=M.period*365.25,Z=M.retro?-1:1,me=C+ye.direction*Z*ye.days/H*t,Te=xe(me,M.e||0);M.node.position.copy(re(M,Te))}typeof M.rot=="number"&&(M.mesh.rotation.y=ye.direction*ye.days/M.rot*t),M.mesh.material.uniforms.uTime.value=ye.days*.12}for(const M of D){const C=ze(M.id)%1e3/1e3*t,H=M.retro?-1:1,Z=C+ye.direction*H*ye.days/M.periodDays*t,me=xe(Z,M.eMoon||0);M.node.position.copy(B(M,me)),M.mesh.rotation.y=ye.direction*ye.days/M.rot*t,M.mesh.material.uniforms.uTime.value=ye.days*.12}for(const M of z){const C=M.node.position.length()/i,H=1-Cr.smoothstep(C,2.2,7.2),Z=M.node.position.clone().normalize();for(const[me,Te]of M.tails.entries())Te.position.copy(M.node.position),Te.quaternion.setFromUnitVectors(new U(0,0,1),Z),me===1&&Te.rotateY(.06),Te.material.uniforms.activity.value=H,Te.visible=H>.008}Ce.uniforms.time.value=ye.days*.02,se.rotation.y=ye.direction*ye.days/1680*t}function ze(M){let C=0;for(let H=0;H<M.length;H++)C=C*31+M.charCodeAt(H)|0;return Math.abs(C)}oe();const P=new Sy,ue=new De;let pe=null,ce=null,Re={x:0,y:0},je=0,We=null,$e=null,be=!1,F=0,Se=0;const Ee=new St().setFromPoints([new U,new U(1,0,0)]),Oe=new as(Ee,new $o({color:6160336,transparent:!0,opacity:.8,depthWrite:!1,blending:rn}));Oe.visible=!1,a.add(Oe);const Me={active:!1,picks:[],line:null,label:null};function it(M){const C=l.domElement.getBoundingClientRect();ue.x=(M.clientX-C.left)/C.width*2-1,ue.y=-(M.clientY-C.top)/C.height*2+1}function rt(M){it(M),P.setFromCamera(ue,o);const C=P.intersectObjects(K,!1)[0];return(C==null?void 0:C.object.userData.body)||null}l.domElement.addEventListener("pointerdown",M=>Re={x:M.clientX,y:M.clientY}),l.domElement.addEventListener("click",M=>{if(Math.hypot(M.clientX-Re.x,M.clientY-Re.y)>5)return;const C=rt(M);if((M.shiftKey||Me.active)&&C){Ls(C);return}mt(C)}),l.domElement.addEventListener("dblclick",M=>{if(Me.active)return;const C=rt(M);C&&(mt(C),Pe(C))});function mt(M){var C;if(pe=M,document.querySelectorAll(".celestial-label").forEach(H=>H.classList.remove("selected")),w.forEach(H=>{var Z;H.material.opacity=H.userData.baseOpacity,H.material.color.set(((Z=j.get(H.userData.owner))==null?void 0:Z.color)||5400444)}),!M){It(null),Oe.visible=!1,$i();return}(C=M.node.userData.label)==null||C.element.classList.add("selected"),M.orbitLine&&(M.orbitLine.material.opacity=.92,M.orbitLine.material.color.set(12382207)),It(M),$i()}function It(M){const C=M||{cn:"太阳系",en:"Solar System",type:"行星系统",desc:"一座以实时轨道动力学驱动的程序化太阳系。双击任意天体进入近地观察。"};document.querySelector("#info-name").textContent=C.cn,document.querySelector("#info-en").textContent=C.en.toUpperCase(),document.querySelector("#info-desc").textContent=C.desc||`${C.cn}是一颗以程序化分形纹理重建的${C.type}，其轨道由真实半长轴、偏心率与周期驱动。`,st("m-type",C.type),st("m-diameter",C.diameter?C.diameter.toLocaleString()+" km":"—");const H=C.distanceKm?C.distanceKm.toLocaleString()+" km":C.a!==void 0?C.a?C.a.toFixed(C.a<10?3:2)+" AU":"0 AU":"—";st("m-axis",H),st("m-rotation",typeof C.rot=="number"?`${Math.abs(C.rot).toLocaleString()} 地球日${C.rot<0?" · 逆行":""}`:C.rot||"—"),st("m-orbit",C.periodDays?C.periodDays+" 地球日":C.period?C.period+" 地球年":"—"),st("m-temp",C.temp||"—"),st("m-moons",C.moons!==void 0?String(C.moons):"—")}function st(M,C){const H=document.getElementById(M);H.animate([{opacity:.1,transform:"translateY(5px)"},{opacity:1,transform:"none"}],{duration:330,easing:"ease-out"}),H.textContent=C}const Et=1495978707e-1;function Lt(M){const C=new U;return M.node.getWorldPosition(C),C}function Xr(M){if(!M.parent)return Lt(M).multiplyScalar(Et/i);const C=j.get(M.parent),H=Lt(C).multiplyScalar(Et/i),Z=M.node.position.clone().normalize().multiplyScalar(M.distanceKm||0),me=new Ai;return C.node.getWorldQuaternion(me),H.add(Z.applyQuaternion(me))}function Zo(M){return M>Et*.02?`${(M/Et).toFixed(M>Et?3:5)} AU · ${(M/Et*499.0048/60).toFixed(1)} 光分`:M>1e5?`${Math.round(M).toLocaleString()} km · ${(M/299792.458).toFixed(2)} 光秒`:`${M.toFixed(M<100?1:0)} km`}function si(){Me.picks=[],Me.line&&(a.remove(Me.line),Me.line.geometry.dispose(),Me.line.material.dispose(),Me.line=null),Me.label&&(a.remove(Me.label),Me.label=null)}function Ls(M){if(Me.picks.length>=2&&si(),Me.picks.push(M),mt(M),Me.picks.length===1){pn(`测距起点：${M.cn} · 请选择终点`);return}const C=new St().setFromPoints([new U,new U]),H=new $u({color:7205631,transparent:!0,opacity:.85,dashSize:.25,gapSize:.14,depthWrite:!1});Me.line=new as(C,H),a.add(Me.line);const Z=document.createElement("div");Z.className="measure-label",Me.label=new lf(Z),a.add(Me.label),Ri(),pn(`${Me.picks[0].cn} ↔ ${Me.picks[1].cn}`)}function Ri(){if(Me.picks.length!==2||!Me.line)return;const[M,C]=Me.picks,H=Lt(M),Z=Lt(C),me=Me.line.geometry.attributes.position;me.setXYZ(0,H.x,H.y,H.z),me.setXYZ(1,Z.x,Z.y,Z.z),me.needsUpdate=!0,Me.line.computeLineDistances(),Me.label.position.copy(H).lerp(Z,.5),Me.label.element.textContent=Zo(Xr(M).distanceTo(Xr(C)))}function Ds(M){if(!M)return null;if(M.parent){const Z=M.distanceKm&&M.periodDays?t*M.distanceKm/(M.periodDays*86400):0;return{r:(M.distanceKm||0)/Et,v:Z,light:(M.distanceKm||0)/299792.458,inc:M.incMoon||0}}if(!M.a)return{r:0,v:0,light:0,inc:0};const C=Math.max(1e-4,Lt(M).length()/i),H=29.7847*Math.sqrt(Math.max(0,2/C-1/M.a));return{r:C,v:H,light:C*499.0048,inc:M.inc||0}}function $i(){const M=document.querySelector("#science-hud");if(!pe){M.textContent="选择天体以读取轨道遥测 · SHIFT+单击两颗天体可直接测距";return}const C=Ds(pe),H=pe.parent?`${(pe.distanceKm||0).toLocaleString()} km`:`${C.r.toFixed(C.r<10?3:1)} AU`;M.textContent=`${pe.cn}  |  日心/母体距离 ${H}  |  轨道速度 ${C.v.toFixed(2)} km/s  |  光行时 ${C.light<60?C.light.toFixed(2)+" s":(C.light/60).toFixed(1)+" min"}  |  倾角 ${C.inc.toFixed(2)}°`}function Us(){if(!q.visible||!pe){Oe.visible=!1;return}const M=Lt(pe),C=pe.parent?Lt(j.get(pe.parent)):new U,H=M.clone().sub(C),Z=new U(0,1,0),me=new U().crossVectors(Z,H).normalize().multiplyScalar((pe.retro?-1:1)*Math.max((pe.display||pe.r*r)*5,o.position.distanceTo(M)*.025)),Te=Ee.attributes.position;Te.setXYZ(0,M.x,M.y,M.z),Te.setXYZ(1,M.x+me.x,M.y+me.y,M.z+me.z),Te.needsUpdate=!0,Oe.visible=!0}let Is;function pn(M){const C=document.querySelector("#toast");C.textContent=M,C.classList.add("show"),clearTimeout(Is),Is=setTimeout(()=>C.classList.remove("show"),2200)}const A=["sun","earth","jupiter","io","saturn","titan","uranus","triton","pluto","charon","arrokoth","sedna","halley"];function G(M){be=M,document.querySelector("#tour").classList.toggle("active",M),document.querySelector("#tour").textContent=M?"停止导览":"自动导览",document.querySelector("#tour-card").classList.toggle("show",M),Se=0,M&&pn("电影导览已启动 · 交互不会被锁定")}function $(M){if(!be||M<Se)return;const C=j.get(A[F++%A.length]);mt(C),Pe(C);const H=document.querySelector("#tour-card");H.querySelector("b").textContent=`${C.cn} · ${C.en}`,H.querySelector("span").textContent=C.desc||`${C.type}，直径约 ${Number(C.diameter).toLocaleString()} 千米；轨道与表面纹理由实时程序化系统重建。`,Se=M+7600}function ee(M){if(M&&!pe){pn("请先选择一个天体");return}We=M?pe:null,$e=We?Lt(We):null,document.querySelector("#follow").classList.toggle("active",!!We),document.querySelector("#follow").textContent=We?"解除跟随":"锁定跟随"}function Y(){if(!We)return;const M=Lt(We),C=M.clone().sub($e);ce||(o.position.add(C),u.target.add(C)),$e.copy(M)}function Pe(M){const C=new U;M.node.getWorldPosition(C);const H=(M.display||M.r*r)*(M.scale?Math.max(...M.scale):1),Z=Math.max(H*7,.22),me=o.position.clone().sub(u.target).normalize();Ne(C.clone().add(me.multiplyScalar(Z)).add(new U(0,H*1.8,0)),C,1500)}function Ne(M,C,H=1800){ce={fromP:o.position.clone(),fromT:u.target.clone(),toP:M.clone(),toT:C.clone(),start:performance.now(),duration:H}}function Ge(M){if(!ce)return;let C=Math.min(1,(M-ce.start)/ce.duration);C=C<.5?4*C*C*C:1-Math.pow(-2*C+2,3)/2,o.position.lerpVectors(ce.fromP,ce.toP,C),u.target.lerpVectors(ce.fromT,ce.toT,C),C>=1&&(ce=null)}const Xe={overview:{p:[150,260,510],t:[0,0,0]},inner:{p:[34,42,78],t:[0,0,0]},jupiter:{id:"jupiter",offset:[4.7,2.8,5.6]},saturn:{id:"saturn",offset:[5.1,3.7,6.2]},pluto:{id:"pluto",offset:[1.2,.75,1.45]},distant:{id:"sedna",offset:[1.4,.9,1.7]}};function Je(M){const C=Xe[M];if(C.id){const H=j.get(C.id),Z=new U;H.node.getWorldPosition(Z),mt(H),Ne(Z.clone().add(new U(...C.offset)),Z,1900)}else Ne(new U(...C.p),new U(...C.t),1900)}document.querySelectorAll("#presets button").forEach(M=>M.onclick=()=>Je(M.dataset.view)),document.querySelector("#reset").onclick=()=>{mt(null),Ne(new U(38,46,74),new U,1700)};const qe=document.querySelector("#search"),ke=document.querySelector("#search-results");qe.addEventListener("input",()=>{const M=qe.value.trim().toLowerCase();if(!M){ke.style.display="none";return}const C=R.filter(H=>(H.cn+H.en+(H.aliases||"")).toLowerCase().includes(M)).slice(0,9);ke.innerHTML=C.map(H=>`<div class="result" data-id="${H.id}">${H.cn} · ${H.en}<span>${H.type}</span></div>`).join("")||'<div class="result">未找到匹配天体</div>',ke.style.display="block"}),ke.addEventListener("click",M=>{var Z;const C=(Z=M.target.closest("[data-id]"))==null?void 0:Z.dataset.id;if(!C)return;const H=j.get(C);mt(H),Pe(H),qe.value=`${H.cn} · ${H.en}`,ke.style.display="none"}),document.addEventListener("pointerdown",M=>{M.target.closest(".searchbox")||(ke.style.display="none")});function lt(M,C){document.getElementById(M).addEventListener("change",H=>C(H.target.checked))}lt("t-asteroid",M=>{se.visible=M,["ceres","vesta","pallas","juno","hebe","hygiea","psyche"].forEach(C=>j.get(C).node.visible=M)}),lt("t-kuiper",M=>k.visible=M),lt("t-orbits",M=>w.forEach(C=>C.visible=M)),lt("t-labels",M=>c.domElement.style.display=M?"block":"none"),lt("t-atmo",M=>T.forEach(C=>C.visible=M)),lt("t-science",M=>{q.visible=M,Us(),pn(M?"宜居带与黄道参考层已开启":"科学参考层已关闭")}),lt("t-cinema",M=>p.enabled=M);let Gt=!0,ft=2,mn=performance.now();lt("t-adaptive",M=>{Gt=M,pn(M?"自适应画质已启用":"已锁定当前画质")}),document.querySelector("#time-scale").oninput=M=>{ye.speed=+M.target.value,document.querySelector("#time-out").textContent=ye.speed+"×"},document.querySelector("#direction").onclick=M=>{ye.direction*=-1,M.target.textContent="公转方向 · "+(ye.direction>0?"顺行":"逆行")},document.querySelector("#brightness").oninput=M=>{const C=+M.target.value;d.strength=C,l.toneMappingExposure=.72+C*.27,_.intensity=.08+C*.08,document.querySelector("#bright-out").textContent=C.toFixed(2)},document.querySelector("#star-density").oninput=M=>{const C=+M.target.value;Pt(ft,!0),document.querySelector("#stars-out").textContent=C+"%"},document.querySelectorAll("[data-jump]").forEach(M=>M.onclick=()=>{ye.days+=+M.dataset.jump,oe(),pn(`模拟时间已跳转 ${M.dataset.jump>0?"+":""}${M.dataset.jump} 日`)});let gt=20;document.querySelector("#pause").onclick=M=>{ye.speed?(gt=ye.speed,ye.speed=0,M.currentTarget.textContent="继续"):(ye.speed=gt,M.currentTarget.textContent="暂停"),document.querySelector("#time-scale").value=ye.speed,document.querySelector("#time-out").textContent=ye.speed+"×"},document.querySelector("#today").onclick=()=>{ye.days=0,oe(),pn("已返回 2046-01-01 初始历元")},document.querySelector("#measure").onclick=M=>{Me.active=!Me.active,M.currentTarget.classList.toggle("active",Me.active),Me.active||si(),pn(Me.active?"测距模式：依次点击两颗天体":"测距模式已关闭")},document.querySelector("#tour").onclick=()=>G(!be),document.querySelector("#follow").onclick=()=>ee(!We);let Ze=0,Zi=!1,_t=performance.now(),Sn=_t,Ji=0,oi=0,Qi=0;function Pt(M,C=!1){ft=Cr.clamp(M,0,2);const H=[.52,.76,1][ft],Z=[1,1.25,Math.min(devicePixelRatio,1.6)][ft];l.setPixelRatio(Z),l.setSize(innerWidth,innerHeight,!1),f.setPixelRatio(Z),f.setSize(innerWidth,innerHeight);const me=+document.querySelector("#star-density").value/100;I.geometry.setDrawRange(0,Math.floor(x*me*H)),k.geometry.setDrawRange(0,Math.floor(6500*H)),O.geometry.setDrawRange(0,Math.floor(3800*H)),d.radius=[.42,.64,.82][ft],C||pn(`自适应画质：${["性能","平衡","电影"][ft]}档`)}function Gn(M,C){!Gt||C-mn<4200||(mn=C,M<28&&ft>0?Pt(ft-1):M>52&&ft<2&&Pt(ft+1))}function qr(){const M=o.position.distanceTo(u.target),C=2*Math.tan(o.fov*s/2)*M/innerHeight*100,H=C/i,Z=document.querySelector("#scale-ruler span");Z.textContent=H>=.01?`${H<10?H.toFixed(2):H.toFixed(0)} AU`:`${Math.max(1,H*Et).toLocaleString(void 0,{maximumFractionDigits:0})} km`}function nn(){var C;const M=document.querySelector("#t-labels").checked;for(const H of R){if(!((C=H.node)!=null&&C.userData.label))continue;const Z=new U;H.node.getWorldPosition(Z);const me=o.position.distanceTo(Z),Be=(H.display||H.r*r)/me,Ie=H===pe;let ot=Ie?1:Cr.smoothstep(Be,1e-4,.004);H.type==="卫星"&&!Ie&&(ot*=Cr.smoothstep(Be,8e-4,.006));const bt=H.node.userData.label.element;bt.style.opacity=M?String(ot):"0",bt.style.display=ot<.035?"none":"block";const En=Ie?1:Cr.clamp(.55+Be*90,.55,1);bt.style.fontSize=`${10*En}px`}}function er(M){if(Zi)return;Ze=requestAnimationFrame(er);const C=Math.min(.05,(M-_t)/1e3);_t=M,ye.days+=C*ye.speed,ye.date=new Date(Date.parse("2046-01-01T00:00:00Z")+ye.days*864e5),oe(),$(M),Ge(M),Y(),u.update(),Ri(),Us(),I.material.uniforms.time.value=M*.001,p.uniforms.time.value=M*.001,Qe.material.rotation=M*18e-6,a.traverse(H=>{H.userData.solarWind&&(H.material.uniforms.time.value=M*.001)}),M-je>3500+Math.random()*6500&&(Ae(),je=M);for(let H=le.length-1;H>=0;H--){const Z=le[H];Z.life+=C,Z.line.position.addScaledVector(Z.vel,C),Z.line.material.uniforms.life.value=Z.life/Z.duration,Z.life>Z.duration&&(a.remove(Z.line),Z.line.geometry.dispose(),Z.line.material.dispose(),le.splice(H,1))}if(nn(),f.render(),c.render(a,o),Ji++,M-Sn>700){const H=Math.round(Ji*1e3/(M-Sn));document.querySelector("#fps").textContent="FPS "+H,Gn(H,M),Sn=M,Ji=0}M-oi>180&&(document.querySelector("#date").textContent=ye.date.toLocaleString("zh-CN",{timeZone:"UTC",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).replaceAll("/"," · ")+" UTC",$i(),oi=M),M-Qi>450&&(qr(),Qi=M)}document.querySelector("#count").textContent=`CELESTIAL OBJECTS ${String(R.length+y).padStart(3,"0")}`;function Ns(){o.aspect=innerWidth/innerHeight,o.updateProjectionMatrix(),l.setSize(innerWidth,innerHeight),f.setSize(innerWidth,innerHeight),c.setSize(innerWidth,innerHeight)}return addEventListener("resize",Ns),It(null),Pt(2,!0),Ze=requestAnimationFrame(er),{destroy(){var M;Zi=!0,cancelAnimationFrame(Ze),removeEventListener("resize",Ns),u.dispose(),si(),l.domElement.remove(),c.domElement.remove(),(M=f.dispose)==null||M.call(f),l.dispose()}}}const Ny={__name:"App",setup(n){const e=jl(null),t=jl(null);let i;return Xf(()=>{i=Iy({canvasWrap:e.value,labelsHost:t.value})}),qf(()=>i==null?void 0:i.destroy()),(r,s)=>(Ln(),Dn(Jt,null,[at("div",{ref_key:"labelsHost",ref:t,class:"scene-root","aria-hidden":"true"},[at("div",{id:"canvas-wrap",ref_key:"canvasWrap",ref:e},null,512),s[0]||(s[0]=at("div",{id:"vignette"},null,-1))],512),on(Wm),on(Fm),on(Um),on(jm),on(Gm),on(Bm)],64))}};Sm(Ny).mount("#app");
