(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function wl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const at={},Cs=[],Fn=()=>{},Uh=()=>!1,No=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Fo=n=>n.startsWith("onUpdate:"),Ht=Object.assign,Cl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Qd=Object.prototype.hasOwnProperty,tt=(n,e)=>Qd.call(n,e),Oe=Array.isArray,Rs=n=>Er(n)==="[object Map]",Ih=n=>Er(n)==="[object Set]",rc=n=>Er(n)==="[object Date]",ke=n=>typeof n=="function",xt=n=>typeof n=="string",pn=n=>typeof n=="symbol",ot=n=>n!==null&&typeof n=="object",Nh=n=>(ot(n)||ke(n))&&ke(n.then)&&ke(n.catch),Fh=Object.prototype.toString,Er=n=>Fh.call(n),ep=n=>Er(n).slice(8,-1),Oh=n=>Er(n)==="[object Object]",Oo=n=>xt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,ir=wl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Bo=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},tp=/-\w/g,Sn=Bo(n=>n.replace(tp,e=>e.slice(1).toUpperCase())),np=/\B([A-Z])/g,ji=Bo(n=>n.replace(np,"-$1").toLowerCase()),Bh=Bo(n=>n.charAt(0).toUpperCase()+n.slice(1)),la=Bo(n=>n?`on${Bh(n)}`:""),In=(n,e)=>!Object.is(n,e),fo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},zh=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Rl=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let oc;const zo=()=>oc||(oc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ho(n){if(Oe(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=xt(i)?op(i):Ho(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(xt(n)||ot(n))return n}const ip=/;(?![^(]*\))/g,sp=/:([^]+)/,rp=/\/\*[^]*?\*\//g;function op(n){const e={};return n.replace(rp,"").split(ip).forEach(t=>{if(t){const i=t.split(sp);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function xi(n){let e="";if(xt(n))e=n;else if(Oe(n))for(let t=0;t<n.length;t++){const i=xi(n[t]);i&&(e+=i+" ")}else if(ot(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const ap="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",lp=wl(ap);function Hh(n){return!!n||n===""}function cp(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=Pl(n[i],e[i]);return t}function Pl(n,e){if(n===e)return!0;let t=rc(n),i=rc(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=pn(n),i=pn(e),t||i)return n===e;if(t=Oe(n),i=Oe(e),t||i)return t&&i?cp(n,e):!1;if(t=ot(n),i=ot(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const a in n){const o=n.hasOwnProperty(a),l=e.hasOwnProperty(a);if(o&&!l||!o&&l||!Pl(n[a],e[a]))return!1}}return String(n)===String(e)}const Vh=n=>!!(n&&n.__v_isRef===!0),pt=n=>xt(n)?n:n==null?"":Oe(n)||ot(n)&&(n.toString===Fh||!ke(n.toString))?Vh(n)?pt(n.value):JSON.stringify(n,Gh,2):String(n),Gh=(n,e)=>Vh(e)?Gh(n,e.value):Rs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[ca(i,r)+" =>"]=s,t),{})}:Ih(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ca(t))}:pn(e)?ca(e):ot(e)&&!Oe(e)&&!Oh(e)?String(e):e,ca=(n,e="")=>{var t;return pn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Et;class kh{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Et&&(Et.active?(this.parent=Et,this.index=(Et.scopes||(Et.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){const i=this.scopes.slice();for(e=0,t=i.length;e<t;e++)i[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){const s=this.scopes.slice();for(e=0,t=s.length;e<t;e++)s[e].resume()}const i=this.effects.slice();for(e=0,t=i.length;e<t;e++)i[e].resume()}}run(e){if(this._active){const t=Et;try{return Et=this,e()}finally{Et=t}}}on(){++this._on===1&&(this.prevScope=Et,Et=this)}off(){if(this._on>0&&--this._on===0){if(Et===this)Et=this.prevScope;else{let e=Et;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(t=0,i=s.length;t<i;t++)s[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Wh(n){return new kh(n)}function Xh(){return Et}function up(n,e=!1){Et&&Et.cleanups.push(n)}let ct;const ua=new WeakSet;class jh{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Et&&(Et.active?Et.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ua.has(this)&&(ua.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Yh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ac(this),Kh(this);const e=ct,t=bn;ct=this,bn=!0;try{return this.fn()}finally{$h(this),ct=e,bn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ul(e);this.deps=this.depsTail=void 0,ac(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ua.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){tl(this)&&this.run()}get dirty(){return tl(this)}}let qh=0,sr,rr;function Yh(n,e=!1){if(n.flags|=8,e){n.next=rr,rr=n;return}n.next=sr,sr=n}function Ll(){qh++}function Dl(){if(--qh>0)return;if(rr){let e=rr;for(rr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;sr;){let e=sr;for(sr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Kh(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function $h(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),Ul(i),hp(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function tl(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Zh(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Zh(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===mr)||(n.globalVersion=mr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!tl(n))))return;n.flags|=2;const e=n.dep,t=ct,i=bn;ct=n,bn=!0;try{Kh(n);const s=n.fn(n._value);(e.version===0||In(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{ct=t,bn=i,$h(n),n.flags&=-3}}function Ul(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)Ul(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function hp(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let bn=!0;const Jh=[];function ni(){Jh.push(bn),bn=!1}function ii(){const n=Jh.pop();bn=n===void 0?!0:n}function ac(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=ct;ct=void 0;try{e()}finally{ct=t}}}let mr=0;class fp{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Il{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ct||!bn||ct===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==ct)t=this.activeLink=new fp(ct,this),ct.deps?(t.prevDep=ct.depsTail,ct.depsTail.nextDep=t,ct.depsTail=t):ct.deps=ct.depsTail=t,Qh(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=ct.depsTail,t.nextDep=void 0,ct.depsTail.nextDep=t,ct.depsTail=t,ct.deps===t&&(ct.deps=i)}return t}trigger(e){this.version++,mr++,this.notify(e)}notify(e){Ll();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Dl()}}}function Qh(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Qh(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const go=new WeakMap,zi=Symbol(""),nl=Symbol(""),gr=Symbol("");function Bt(n,e,t){if(bn&&ct){let i=go.get(n);i||go.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new Il),s.map=i,s.key=t),s.track()}}function Yn(n,e,t,i,s,r){const a=go.get(n);if(!a){mr++;return}const o=l=>{l&&l.trigger()};if(Ll(),e==="clear")a.forEach(o);else{const l=Oe(n),c=l&&Oo(t);if(l&&t==="length"){const u=Number(i);a.forEach((h,f)=>{(f==="length"||f===gr||!pn(f)&&f>=u)&&o(h)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(gr)),e){case"add":l?c&&o(a.get("length")):(o(a.get(zi)),Rs(n)&&o(a.get(nl)));break;case"delete":l||(o(a.get(zi)),Rs(n)&&o(a.get(nl)));break;case"set":Rs(n)&&o(a.get(zi));break}}Dl()}function dp(n,e){const t=go.get(n);return t&&t.get(e)}function Zi(n){const e=Qe(n);return e===n?e:(Bt(e,"iterate",gr),on(n)?e:e.map(Tn))}function Vo(n){return Bt(n=Qe(n),"iterate",gr),n}function Ln(n,e){return si(n)?Ds(Zn(n)?Tn(e):e):Tn(e)}const pp={__proto__:null,[Symbol.iterator](){return ha(this,Symbol.iterator,n=>Ln(this,n))},concat(...n){return Zi(this).concat(...n.map(e=>Oe(e)?Zi(e):e))},entries(){return ha(this,"entries",n=>(n[1]=Ln(this,n[1]),n))},every(n,e){return Bn(this,"every",n,e,void 0,arguments)},filter(n,e){return Bn(this,"filter",n,e,t=>t.map(i=>Ln(this,i)),arguments)},find(n,e){return Bn(this,"find",n,e,t=>Ln(this,t),arguments)},findIndex(n,e){return Bn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Bn(this,"findLast",n,e,t=>Ln(this,t),arguments)},findLastIndex(n,e){return Bn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Bn(this,"forEach",n,e,void 0,arguments)},includes(...n){return fa(this,"includes",n)},indexOf(...n){return fa(this,"indexOf",n)},join(n){return Zi(this).join(n)},lastIndexOf(...n){return fa(this,"lastIndexOf",n)},map(n,e){return Bn(this,"map",n,e,void 0,arguments)},pop(){return Gs(this,"pop")},push(...n){return Gs(this,"push",n)},reduce(n,...e){return lc(this,"reduce",n,e)},reduceRight(n,...e){return lc(this,"reduceRight",n,e)},shift(){return Gs(this,"shift")},some(n,e){return Bn(this,"some",n,e,void 0,arguments)},splice(...n){return Gs(this,"splice",n)},toReversed(){return Zi(this).toReversed()},toSorted(n){return Zi(this).toSorted(n)},toSpliced(...n){return Zi(this).toSpliced(...n)},unshift(...n){return Gs(this,"unshift",n)},values(){return ha(this,"values",n=>Ln(this,n))}};function ha(n,e,t){const i=Vo(n),s=i[e]();return i!==n&&!on(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const mp=Array.prototype;function Bn(n,e,t,i,s,r){const a=Vo(n),o=a!==n&&!on(n),l=a[e];if(l!==mp[e]){const h=l.apply(n,r);return o?Tn(h):h}let c=t;a!==n&&(o?c=function(h,f){return t.call(this,Ln(n,h),f,n)}:t.length>2&&(c=function(h,f){return t.call(this,h,f,n)}));const u=l.call(a,c,i);return o&&s?s(u):u}function lc(n,e,t,i){const s=Vo(n),r=s!==n&&!on(n);let a=t,o=!1;s!==n&&(r?(o=i.length===0,a=function(c,u,h){return o&&(o=!1,c=Ln(n,c)),t.call(this,c,Ln(n,u),h,n)}):t.length>3&&(a=function(c,u,h){return t.call(this,c,u,h,n)}));const l=s[e](a,...i);return o?Ln(n,l):l}function fa(n,e,t){const i=Qe(n);Bt(i,"iterate",gr);const s=i[e](...t);return(s===-1||s===!1)&&ko(t[0])?(t[0]=Qe(t[0]),i[e](...t)):s}function Gs(n,e,t=[]){ni(),Ll();const i=Qe(n)[e].apply(n,t);return Dl(),ii(),i}const gp=wl("__proto__,__v_isRef,__isVue"),ef=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(pn));function _p(n){pn(n)||(n=String(n));const e=Qe(this);return Bt(e,"has",n),e.hasOwnProperty(n)}class tf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?wp:of:r?rf:sf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Oe(e);if(!s){let l;if(a&&(l=pp[t]))return l;if(t==="hasOwnProperty")return _p}const o=Reflect.get(e,t,Mt(e)?e:i);if((pn(t)?ef.has(t):gp(t))||(s||Bt(e,"get",t),r))return o;if(Mt(o)){const l=a&&Oo(t)?o:o.value;return s&&ot(l)?sl(l):l}return ot(o)?s?sl(o):Go(o):o}}class nf extends tf{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const a=Oe(e)&&Oo(t);if(!this._isShallow){const c=si(r);if(!on(i)&&!si(i)&&(r=Qe(r),i=Qe(i)),!a&&Mt(r)&&!Mt(i))return c||(r.value=i),!0}const o=a?Number(t)<e.length:tt(e,t),l=Reflect.set(e,t,i,Mt(e)?e:s);return e===Qe(s)&&l&&(o?In(i,r)&&Yn(e,"set",t,i):Yn(e,"add",t,i)),l}deleteProperty(e,t){const i=tt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Yn(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!pn(t)||!ef.has(t))&&Bt(e,"has",t),i}ownKeys(e){return Bt(e,"iterate",Oe(e)?"length":zi),Reflect.ownKeys(e)}}class vp extends tf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const xp=new nf,Mp=new vp,yp=new nf(!0);const il=n=>n,Ur=n=>Reflect.getPrototypeOf(n);function Sp(n,e,t){return function(...i){const s=this.__v_raw,r=Qe(s),a=Rs(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),u=t?il:e?Ds:Tn;return!e&&Bt(r,"iterate",l?nl:zi),Ht(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:o?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function Ir(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function bp(n,e){const t={get(s){const r=this.__v_raw,a=Qe(r),o=Qe(s);n||(In(s,o)&&Bt(a,"get",s),Bt(a,"get",o));const{has:l}=Ur(a),c=e?il:n?Ds:Tn;if(l.call(a,s))return c(r.get(s));if(l.call(a,o))return c(r.get(o));r!==a&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Bt(Qe(s),"iterate",zi),s.size},has(s){const r=this.__v_raw,a=Qe(r),o=Qe(s);return n||(In(s,o)&&Bt(a,"has",s),Bt(a,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const a=this,o=a.__v_raw,l=Qe(o),c=e?il:n?Ds:Tn;return!n&&Bt(l,"iterate",zi),o.forEach((u,h)=>s.call(r,c(u),c(h),a))}};return Ht(t,n?{add:Ir("add"),set:Ir("set"),delete:Ir("delete"),clear:Ir("clear")}:{add(s){const r=Qe(this),a=Ur(r),o=Qe(s),l=!e&&!on(s)&&!si(s)?o:s;return a.has.call(r,l)||In(s,l)&&a.has.call(r,s)||In(o,l)&&a.has.call(r,o)||(r.add(l),Yn(r,"add",l,l)),this},set(s,r){!e&&!on(r)&&!si(r)&&(r=Qe(r));const a=Qe(this),{has:o,get:l}=Ur(a);let c=o.call(a,s);c||(s=Qe(s),c=o.call(a,s));const u=l.call(a,s);return a.set(s,r),c?In(r,u)&&Yn(a,"set",s,r):Yn(a,"add",s,r),this},delete(s){const r=Qe(this),{has:a,get:o}=Ur(r);let l=a.call(r,s);l||(s=Qe(s),l=a.call(r,s)),o&&o.call(r,s);const c=r.delete(s);return l&&Yn(r,"delete",s,void 0),c},clear(){const s=Qe(this),r=s.size!==0,a=s.clear();return r&&Yn(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Sp(s,n,e)}),t}function Nl(n,e){const t=bp(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(tt(t,s)&&s in i?t:i,s,r)}const Ep={get:Nl(!1,!1)},Tp={get:Nl(!1,!0)},Ap={get:Nl(!0,!1)};const sf=new WeakMap,rf=new WeakMap,of=new WeakMap,wp=new WeakMap;function Cp(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Go(n){return si(n)?n:Fl(n,!1,xp,Ep,sf)}function Rp(n){return Fl(n,!1,yp,Tp,rf)}function sl(n){return Fl(n,!0,Mp,Ap,of)}function Fl(n,e,t,i,s){if(!ot(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const a=Cp(ep(n));if(a===0)return n;const o=new Proxy(n,a===2?i:t);return s.set(n,o),o}function Zn(n){return si(n)?Zn(n.__v_raw):!!(n&&n.__v_isReactive)}function si(n){return!!(n&&n.__v_isReadonly)}function on(n){return!!(n&&n.__v_isShallow)}function ko(n){return n?!!n.__v_raw:!1}function Qe(n){const e=n&&n.__v_raw;return e?Qe(e):n}function Wo(n){return!tt(n,"__v_skip")&&Object.isExtensible(n)&&zh(n,"__v_skip",!0),n}const Tn=n=>ot(n)?Go(n):n,Ds=n=>ot(n)?sl(n):n;function Mt(n){return n?n.__v_isRef===!0:!1}function Ze(n){return Pp(n,!1)}function Pp(n,e){return Mt(n)?n:new Lp(n,e)}class Lp{constructor(e,t){this.dep=new Il,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Qe(e),this._value=t?e:Tn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||on(e)||si(e);e=i?e:Qe(e),In(e,t)&&(this._rawValue=e,this._value=i?e:Tn(e),this.dep.trigger())}}function Re(n){return Mt(n)?n.value:n}const Dp={get:(n,e,t)=>e==="__v_raw"?n:Re(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return Mt(s)&&!Mt(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function af(n){return Zn(n)?n:new Proxy(n,Dp)}function Up(n){const e=Oe(n)?new Array(n.length):{};for(const t in n)e[t]=Np(n,t);return e}class Ip{constructor(e,t,i){this._object=e,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0,this._key=pn(t)?t:String(t),this._raw=Qe(e);let s=!0,r=e;if(!Oe(e)||pn(this._key)||!Oo(this._key))do s=!ko(r)||on(r);while(s&&(r=r.__v_raw));this._shallow=s}get value(){let e=this._object[this._key];return this._shallow&&(e=Re(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&Mt(this._raw[this._key])){const t=this._object[this._key];if(Mt(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return dp(this._raw,this._key)}}function Np(n,e,t){return new Ip(n,e,t)}class Fp{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Il(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=mr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ct!==this)return Yh(this,!0),!0}get value(){const e=this.dep.track();return Zh(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Op(n,e,t=!1){let i,s;return ke(n)?i=n:(i=n.get,s=n.set),new Fp(i,s,t)}const Nr={},_o=new WeakMap;let Ni;function Bp(n,e=!1,t=Ni){if(t){let i=_o.get(t);i||_o.set(t,i=[]),i.push(n)}}function zp(n,e,t=at){const{immediate:i,deep:s,once:r,scheduler:a,augmentJob:o,call:l}=t,c=E=>s?E:on(E)||s===!1||s===0?Kn(E,1):Kn(E);let u,h,f,p,_=!1,v=!1;if(Mt(n)?(h=()=>n.value,_=on(n)):Zn(n)?(h=()=>c(n),_=!0):Oe(n)?(v=!0,_=n.some(E=>Zn(E)||on(E)),h=()=>n.map(E=>{if(Mt(E))return E.value;if(Zn(E))return c(E);if(ke(E))return l?l(E,2):E()})):ke(n)?e?h=l?()=>l(n,2):n:h=()=>{if(f){ni();try{f()}finally{ii()}}const E=Ni;Ni=u;try{return l?l(n,3,[p]):n(p)}finally{Ni=E}}:h=Fn,e&&s){const E=h,D=s===!0?1/0:s;h=()=>Kn(E(),D)}const m=Xh(),d=()=>{u.stop(),m&&m.active&&Cl(m.effects,u)};if(r&&e){const E=e;e=(...D)=>{const P=E(...D);return d(),P}}let b=v?new Array(n.length).fill(Nr):Nr;const y=E=>{if(!(!(u.flags&1)||!u.dirty&&!E))if(e){const D=u.run();if(E||s||_||(v?D.some((P,w)=>In(P,b[w])):In(D,b))){f&&f();const P=Ni;Ni=u;try{const w=[D,b===Nr?void 0:v&&b[0]===Nr?[]:b,p];b=D,l?l(e,3,w):e(...w)}finally{Ni=P}}}else u.run()};return o&&o(y),u=new jh(h),u.scheduler=a?()=>a(y,!1):y,p=E=>Bp(E,!1,u),f=u.onStop=()=>{const E=_o.get(u);if(E){if(l)l(E,4);else for(const D of E)D();_o.delete(u)}},e?i?y(!0):b=u.run():a?a(y.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function Kn(n,e=1/0,t){if(e<=0||!ot(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,Mt(n))Kn(n.value,e,t);else if(Oe(n))for(let i=0;i<n.length;i++)Kn(n[i],e,t);else if(Ih(n)||Rs(n))n.forEach(i=>{Kn(i,e,t)});else if(Oh(n)){for(const i in n)Kn(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Kn(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Tr(n,e,t,i){try{return i?n(...i):n()}catch(s){Xo(s,e,t)}}function An(n,e,t,i){if(ke(n)){const s=Tr(n,e,t,i);return s&&Nh(s)&&s.catch(r=>{Xo(r,e,t)}),s}if(Oe(n)){const s=[];for(let r=0;r<n.length;r++)s.push(An(n[r],e,t,i));return s}}function Xo(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||at;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}o=o.parent}if(r){ni(),Tr(r,null,10,[n,l,c]),ii();return}}Hp(n,t,s,i,a)}function Hp(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const qt=[];let Rn=-1;const Ps=[];let di=null,bs=0;const lf=Promise.resolve();let vo=null;function cf(n){const e=vo||lf;return n?e.then(this?n.bind(this):n):e}function Vp(n){let e=Rn+1,t=qt.length;for(;e<t;){const i=e+t>>>1,s=qt[i],r=_r(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function Ol(n){if(!(n.flags&1)){const e=_r(n),t=qt[qt.length-1];!t||!(n.flags&2)&&e>=_r(t)?qt.push(n):qt.splice(Vp(e),0,n),n.flags|=1,uf()}}function uf(){vo||(vo=lf.then(ff))}function Gp(n){Oe(n)?Ps.push(...n):di&&n.id===-1?di.splice(bs+1,0,n):n.flags&1||(Ps.push(n),n.flags|=1),uf()}function cc(n,e,t=Rn+1){for(;t<qt.length;t++){const i=qt[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;qt.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function hf(n){if(Ps.length){const e=[...new Set(Ps)].sort((t,i)=>_r(t)-_r(i));if(Ps.length=0,di){di.push(...e);return}for(di=e,bs=0;bs<di.length;bs++){const t=di[bs];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}di=null,bs=0}}const _r=n=>n.id==null?n.flags&2?-1:1/0:n.id;function ff(n){try{for(Rn=0;Rn<qt.length;Rn++){const e=qt[Rn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Tr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Rn<qt.length;Rn++){const e=qt[Rn];e&&(e.flags&=-2)}Rn=-1,qt.length=0,hf(),vo=null,(qt.length||Ps.length)&&ff()}}let dn=null,df=null;function xo(n){const e=dn;return dn=n,df=n&&n.type.__scopeId||null,e}function kp(n,e=dn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Mc(-1);const r=xo(e),a=Vi.length;let o;try{o=n(...s)}finally{for(let l=Vi.length;l>a;l--)Of();xo(r),i._d&&Mc(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Wp(n,e){if(dn===null)return n;const t=$o(dn),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,a,o,l=at]=e[s];r&&(ke(r)&&(r={mounted:r,updated:r}),r.deep&&Kn(a),i.push({dir:r,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function Ci(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(ni(),An(l,t,8,[n.el,o,n,e]),ii())}}function Xp(n,e){if(Yt){let t=Yt.provides;const i=Yt.parent&&Yt.parent.provides;i===t&&(t=Yt.provides=Object.create(i)),t[n]=e}}function or(n,e,t=!1){const i=Hf();if(i||Hi){let s=Hi?Hi._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&ke(e)?e.call(i&&i.proxy):e}}function jp(){return!!(Hf()||Hi)}const qp=Symbol.for("v-scx"),Yp=()=>or(qp);function ar(n,e,t){return pf(n,e,t)}function pf(n,e,t=at){const{immediate:i,deep:s,flush:r,once:a}=t,o=Ht({},t),l=e&&i||!e&&r!=="post";let c;if(xr){if(r==="sync"){const p=Yp();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Fn,p.resume=Fn,p.pause=Fn,p}}const u=Yt;o.call=(p,_,v)=>An(p,u,_,v);let h=!1;r==="post"?o.scheduler=p=>{$t(p,u&&u.suspense)}:r!=="sync"&&(h=!0,o.scheduler=(p,_)=>{_?p():Ol(p)}),o.augmentJob=p=>{e&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=zp(n,e,o);return xr&&(c?c.push(f):l&&f()),f}function Kp(n,e,t){const i=this.proxy,s=xt(n)?n.includes(".")?mf(i,n):()=>i[n]:n.bind(i,i);let r;ke(e)?r=e:(r=e.handler,t=e);const a=Ar(this),o=pf(s,r.bind(i),t);return a(),o}function mf(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const $p=Symbol("_vte"),Zp=n=>n.__isTeleport,da=Symbol("_leaveCb");function Bl(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Bl(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function gf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function uc(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Mo=new WeakMap;function lr(n,e,t,i,s=!1){if(Oe(n)){n.forEach((v,m)=>lr(v,e&&(Oe(e)?e[m]:e),t,i,s));return}if(cr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&lr(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?$o(i.component):i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,u=o.refs===at?o.refs={}:o.refs,h=o.setupState,f=Qe(h),p=h===at?Uh:v=>uc(u,v)?!1:tt(f,v),_=(v,m)=>!(m&&uc(u,m));if(c!=null&&c!==l){if(hc(e),xt(c))u[c]=null,p(c)&&(h[c]=null);else if(Mt(c)){const v=e;_(c,v.k)&&(c.value=null),v.k&&(u[v.k]=null)}}if(ke(l))Tr(l,o,12,[a,u]);else{const v=xt(l),m=Mt(l);if(v||m){const d=()=>{if(n.f){const b=v?p(l)?h[l]:u[l]:_()||!n.k?l.value:u[n.k];if(s)Oe(b)&&Cl(b,r);else if(Oe(b))b.includes(r)||b.push(r);else if(v)u[l]=[r],p(l)&&(h[l]=u[l]);else{const y=[r];_(l,n.k)&&(l.value=y),n.k&&(u[n.k]=y)}}else v?(u[l]=a,p(l)&&(h[l]=a)):m&&(_(l,n.k)&&(l.value=a),n.k&&(u[n.k]=a))};if(a){const b=()=>{d(),Mo.delete(n)};b.id=-1,Mo.set(n,b),$t(b,t)}else hc(n),d()}}}function hc(n){const e=Mo.get(n);e&&(e.flags|=8,Mo.delete(n))}zo().requestIdleCallback;zo().cancelIdleCallback;const cr=n=>!!n.type.__asyncLoader,_f=n=>n.type.__isKeepAlive;function Jp(n,e){vf(n,"a",e)}function Qp(n,e){vf(n,"da",e)}function vf(n,e,t=Yt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(jo(e,i,t),t){let s=t.parent;for(;s&&s.parent;)_f(s.parent.vnode)&&em(i,e,t,s),s=s.parent}}function em(n,e,t,i){const s=jo(e,n,i,!0);xf(()=>{Cl(i[e],s)},t)}function jo(n,e,t=Yt,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{ni();const o=Ar(t),l=An(e,t,n,a);return o(),ii(),l});return i?s.unshift(r):s.push(r),r}}const oi=n=>(e,t=Yt)=>{(!xr||n==="sp")&&jo(n,(...i)=>e(...i),t)},tm=oi("bm"),qo=oi("m"),nm=oi("bu"),im=oi("u"),zl=oi("bum"),xf=oi("um"),sm=oi("sp"),rm=oi("rtg"),om=oi("rtc");function am(n,e=Yt){jo("ec",n,e)}const lm=Symbol.for("v-ndc");function cm(n,e,t,i){let s;const r=t,a=Oe(n);if(a||xt(n)){const o=a&&Zn(n);let l=!1,c=!1;o&&(l=!on(n),c=si(n),n=Vo(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=e(l?c?Ds(Tn(n[u])):Tn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let o=0;o<n;o++)s[o]=e(o+1,o,void 0,r)}else if(ot(n))if(n[Symbol.iterator])s=Array.from(n,(o,l)=>e(o,l,void 0,r));else{const o=Object.keys(n);s=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const rl=n=>n?Vf(n)?$o(n):rl(n.parent):null,ur=Ht(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>rl(n.parent),$root:n=>rl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>yf(n),$forceUpdate:n=>n.f||(n.f=()=>{Ol(n.update)}),$nextTick:n=>n.n||(n.n=cf.bind(n.proxy)),$watch:n=>Kp.bind(n)}),pa=(n,e)=>n!==at&&!n.__isScriptSetup&&tt(n,e),um={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const f=a[e];if(f!==void 0)switch(f){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(pa(i,e))return a[e]=1,i[e];if(s!==at&&tt(s,e))return a[e]=2,s[e];if(tt(r,e))return a[e]=3,r[e];if(t!==at&&tt(t,e))return a[e]=4,t[e];ol&&(a[e]=0)}}const c=ur[e];let u,h;if(c)return e==="$attrs"&&Bt(n.attrs,"get",""),c(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==at&&tt(t,e))return a[e]=4,t[e];if(h=l.config.globalProperties,tt(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return pa(s,e)?(s[e]=t,!0):i!==at&&tt(i,e)?(i[e]=t,!0):tt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:a}},o){let l;return!!(t[o]||n!==at&&o[0]!=="$"&&tt(n,o)||pa(e,o)||tt(r,o)||tt(i,o)||tt(ur,o)||tt(s.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:tt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function fc(n){return Oe(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let ol=!0;function hm(n){const e=yf(n),t=n.proxy,i=n.ctx;ol=!1,e.beforeCreate&&dc(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:_,activated:v,deactivated:m,beforeDestroy:d,beforeUnmount:b,destroyed:y,unmounted:E,render:D,renderTracked:P,renderTriggered:w,errorCaptured:H,serverPrefetch:S,expose:A,inheritAttrs:X,components:ee,directives:pe,filters:N}=e;if(c&&fm(c,i,null),a)for(const q in a){const $=a[q];ke($)&&(i[q]=$.bind(t))}if(s){const q=s.call(t,t);ot(q)&&(n.data=Go(q))}if(ol=!0,r)for(const q in r){const $=r[q],ie=ke($)?$.bind(t,t):ke($.get)?$.get.bind(t,t):Fn,oe=!ke($)&&ke($.set)?$.set.bind(t):Fn,fe=qn({get:ie,set:oe});Object.defineProperty(i,q,{enumerable:!0,configurable:!0,get:()=>fe.value,set:he=>fe.value=he})}if(o)for(const q in o)Mf(o[q],i,t,q);if(l){const q=ke(l)?l.call(t):l;Reflect.ownKeys(q).forEach($=>{Xp($,q[$])})}u&&dc(u,n,"c");function W(q,$){Oe($)?$.forEach(ie=>q(ie.bind(t))):$&&q($.bind(t))}if(W(tm,h),W(qo,f),W(nm,p),W(im,_),W(Jp,v),W(Qp,m),W(am,H),W(om,P),W(rm,w),W(zl,b),W(xf,E),W(sm,S),Oe(A))if(A.length){const q=n.exposed||(n.exposed={});A.forEach($=>{Object.defineProperty(q,$,{get:()=>t[$],set:ie=>t[$]=ie,enumerable:!0})})}else n.exposed||(n.exposed={});D&&n.render===Fn&&(n.render=D),X!=null&&(n.inheritAttrs=X),ee&&(n.components=ee),pe&&(n.directives=pe),S&&gf(n)}function fm(n,e,t=Fn){Oe(n)&&(n=al(n));for(const i in n){const s=n[i];let r;ot(s)?"default"in s?r=or(s.from||i,s.default,!0):r=or(s.from||i):r=or(s),Mt(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function dc(n,e,t){An(Oe(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Mf(n,e,t,i){let s=i.includes(".")?mf(t,i):()=>t[i];if(xt(n)){const r=e[n];ke(r)&&ar(s,r)}else if(ke(n))ar(s,n.bind(t));else if(ot(n))if(Oe(n))n.forEach(r=>Mf(r,e,t,i));else{const r=ke(n.handler)?n.handler.bind(t):e[n.handler];ke(r)&&ar(s,r,n)}}function yf(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>yo(l,c,a,!0)),yo(l,e,a)),ot(e)&&r.set(e,l),l}function yo(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&yo(n,r,t,!0),s&&s.forEach(a=>yo(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=dm[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const dm={data:pc,props:mc,emits:mc,methods:er,computed:er,beforeCreate:Wt,created:Wt,beforeMount:Wt,mounted:Wt,beforeUpdate:Wt,updated:Wt,beforeDestroy:Wt,beforeUnmount:Wt,destroyed:Wt,unmounted:Wt,activated:Wt,deactivated:Wt,errorCaptured:Wt,serverPrefetch:Wt,components:er,directives:er,watch:mm,provide:pc,inject:pm};function pc(n,e){return e?n?function(){return Ht(ke(n)?n.call(this,this):n,ke(e)?e.call(this,this):e)}:e:n}function pm(n,e){return er(al(n),al(e))}function al(n){if(Oe(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Wt(n,e){return n?[...new Set([].concat(n,e))]:e}function er(n,e){return n?Ht(Object.create(null),n,e):e}function mc(n,e){return n?Oe(n)&&Oe(e)?[...new Set([...n,...e])]:Ht(Object.create(null),fc(n),fc(e??{})):e}function mm(n,e){if(!n)return e;if(!e)return n;const t=Ht(Object.create(null),n);for(const i in e)t[i]=Wt(n[i],e[i]);return t}function Sf(){return{app:null,config:{isNativeTag:Uh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let gm=0;function _m(n,e){return function(i,s=null){ke(i)||(i=Ht({},i)),s!=null&&!ot(s)&&(s=null);const r=Sf(),a=new WeakSet,o=[];let l=!1;const c=r.app={_uid:gm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Ym,get config(){return r.config},set config(u){},use(u,...h){return a.has(u)||(u&&ke(u.install)?(a.add(u),u.install(c,...h)):ke(u)&&(a.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||it(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,$o(p.component)}},onUnmount(u){o.push(u)},unmount(){l&&(An(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Hi;Hi=c;try{return u()}finally{Hi=h}}};return c}}let Hi=null;const vm=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Sn(e)}Modifiers`]||n[`${ji(e)}Modifiers`];function xm(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||at;let s=t;const r=e.startsWith("update:"),a=r&&vm(i,e.slice(7));a&&(a.trim&&(s=t.map(u=>xt(u)?u.trim():u)),a.number&&(s=t.map(Rl)));let o,l=i[o=la(e)]||i[o=la(Sn(e))];!l&&r&&(l=i[o=la(ji(e))]),l&&An(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,An(c,n,6,s)}}const Mm=new WeakMap;function bf(n,e,t=!1){const i=t?Mm:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!ke(n)){const l=c=>{const u=bf(c,e,!0);u&&(o=!0,Ht(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(ot(n)&&i.set(n,null),null):(Oe(r)?r.forEach(l=>a[l]=null):Ht(a,r),ot(n)&&i.set(n,a),a)}function Yo(n,e){return!n||!No(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),tt(n,e[0].toLowerCase()+e.slice(1))||tt(n,ji(e))||tt(n,e))}function gc(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:_,inheritAttrs:v}=n,m=xo(n);let d,b;try{if(t.shapeFlag&4){const E=s||i,D=E;d=Dn(c.call(D,E,u,h,p,f,_)),b=o}else{const E=e;d=Dn(E.length>1?E(h,{attrs:o,slots:a,emit:l}):E(h,null)),b=e.props?o:ym(o)}}catch(E){Vi.length=0,Xo(E,n,1),d=it(Us)}let y=d;if(b&&v!==!1){const E=Object.keys(b),{shapeFlag:D}=y;E.length&&D&7&&(r&&E.some(Fo)&&(b=Sm(b,r)),y=Is(y,b,!1,!0))}return t.dirs&&(y=Is(y,null,!1,!0),y.dirs=y.dirs?y.dirs.concat(t.dirs):t.dirs),t.transition&&Bl(y,t.transition),d=y,xo(m),d}const ym=n=>{let e;for(const t in n)(t==="class"||t==="style"||No(t))&&((e||(e={}))[t]=n[t]);return e},Sm=(n,e)=>{const t={};for(const i in n)(!Fo(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function bm(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?_c(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(Ef(a,i,f)&&!Yo(c,f))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?_c(i,a,c):!0:!!a;return!1}function _c(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Ef(e,n,r)&&!Yo(t,r))return!0}return!1}function Ef(n,e,t){const i=n[t],s=e[t];return t==="style"&&ot(i)&&ot(s)?!Pl(i,s):i!==s}function Em({vnode:n,parent:e,suspense:t},i){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const Tf={},Af=()=>Object.create(Tf),wf=n=>Object.getPrototypeOf(n)===Tf;function Tm(n,e,t,i=!1){const s={},r=Af();n.propsDefaults=Object.create(null),Cf(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:Rp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Am(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=Qe(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Yo(n.emitsOptions,f))continue;const p=e[f];if(l)if(tt(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const _=Sn(f);s[_]=ll(l,o,_,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{Cf(n,e,s,r)&&(c=!0);let u;for(const h in o)(!e||!tt(e,h)&&((u=ji(h))===h||!tt(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=ll(l,o,h,void 0,n,!0)):delete s[h]);if(r!==o)for(const h in r)(!e||!tt(e,h))&&(delete r[h],c=!0)}c&&Yn(n.attrs,"set","")}function Cf(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(ir(l))continue;const c=e[l];let u;s&&tt(s,u=Sn(l))?!r||!r.includes(u)?t[u]=c:(o||(o={}))[u]=c:Yo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=Qe(t),c=o||at;for(let u=0;u<r.length;u++){const h=r[u];t[h]=ll(s,l,h,c[h],n,!tt(c,h))}}return a}function ll(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=tt(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&ke(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Ar(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===ji(t))&&(i=!0))}return i}const wm=new WeakMap;function Rf(n,e,t=!1){const i=t?wm:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!ke(n)){const u=h=>{l=!0;const[f,p]=Rf(h,e,!0);Ht(a,f),p&&o.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ot(n)&&i.set(n,Cs),Cs;if(Oe(r))for(let u=0;u<r.length;u++){const h=Sn(r[u]);vc(h)&&(a[h]=at)}else if(r)for(const u in r){const h=Sn(u);if(vc(h)){const f=r[u],p=a[h]=Oe(f)||ke(f)?{type:f}:Ht({},f),_=p.type;let v=!1,m=!0;if(Oe(_))for(let d=0;d<_.length;++d){const b=_[d],y=ke(b)&&b.name;if(y==="Boolean"){v=!0;break}else y==="String"&&(m=!1)}else v=ke(_)&&_.name==="Boolean";p[0]=v,p[1]=m,(v||tt(p,"default"))&&o.push(h)}}const c=[a,o];return ot(n)&&i.set(n,c),c}function vc(n){return n[0]!=="$"&&!ir(n)}const Hl=n=>n==="_"||n==="_ctx"||n==="$stable",Vl=n=>Oe(n)?n.map(Dn):[Dn(n)],Cm=(n,e,t)=>{if(e._n)return e;const i=kp((...s)=>Vl(e(...s)),t);return i._c=!1,i},Pf=(n,e,t)=>{const i=n._ctx;for(const s in n){if(Hl(s))continue;const r=n[s];if(ke(r))e[s]=Cm(s,r,i);else if(r!=null){const a=Vl(r);e[s]=()=>a}}},Lf=(n,e)=>{const t=Vl(e);n.slots.default=()=>t},Df=(n,e,t)=>{for(const i in e)(t||!Hl(i))&&(n[i]=e[i])},Rm=(n,e,t)=>{const i=n.slots=Af();if(n.vnode.shapeFlag&32){const s=e._;s?(Df(i,e,t),t&&zh(i,"_",s,!0)):Pf(e,i)}else e&&Lf(n,e)},Pm=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=at;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:Df(s,e,t):(r=!e.$stable,Pf(e,s)),a=e}else e&&(Lf(n,e),a={default:1});if(r)for(const o in s)!Hl(o)&&a[o]==null&&delete s[o]},$t=Nm;function Lm(n){return Dm(n)}function Dm(n,e){const t=zo();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=Fn,insertStaticContent:_}=n,v=(x,U,F,j=null,B=null,Q=null,te=void 0,M=null,g=!!U.dynamicChildren)=>{if(x===U)return;x&&!ks(x,U)&&(j=Ce(x),he(x,B,Q,!0),x=null),U.patchFlag===-2&&(g=!1,U.dynamicChildren=null);const{type:C,ref:k,shapeFlag:O}=U;switch(C){case Ko:m(x,U,F,j);break;case Us:d(x,U,F,j);break;case ga:x==null&&b(U,F,j,te);break;case vn:ee(x,U,F,j,B,Q,te,M,g);break;default:O&1?D(x,U,F,j,B,Q,te,M,g):O&6?pe(x,U,F,j,B,Q,te,M,g):(O&64||O&128)&&C.process(x,U,F,j,B,Q,te,M,g,Pe)}k!=null&&B?lr(k,x&&x.ref,Q,U||x,!U):k==null&&x&&x.ref!=null&&lr(x.ref,null,Q,x,!0)},m=(x,U,F,j)=>{if(x==null)i(U.el=o(U.children),F,j);else{const B=U.el=x.el;U.children!==x.children&&c(B,U.children)}},d=(x,U,F,j)=>{x==null?i(U.el=l(U.children||""),F,j):U.el=x.el},b=(x,U,F,j)=>{[x.el,x.anchor]=_(x.children,U,F,j,x.el,x.anchor)},y=({el:x,anchor:U},F,j)=>{let B;for(;x&&x!==U;)B=f(x),i(x,F,j),x=B;i(U,F,j)},E=({el:x,anchor:U})=>{let F;for(;x&&x!==U;)F=f(x),s(x),x=F;s(U)},D=(x,U,F,j,B,Q,te,M,g)=>{if(U.type==="svg"?te="svg":U.type==="math"&&(te="mathml"),x==null)P(U,F,j,B,Q,te,M,g);else{const C=x.el&&x.el._isVueCE?x.el:null;try{C&&C._beginPatch(),S(x,U,B,Q,te,M,g)}finally{C&&C._endPatch()}}},P=(x,U,F,j,B,Q,te,M)=>{let g,C;const{props:k,shapeFlag:O,transition:V,dirs:ae}=x;if(g=x.el=a(x.type,Q,k&&k.is,k),O&8?u(g,x.children):O&16&&H(x.children,g,null,j,B,ma(x,Q),te,M),ae&&Ci(x,null,j,"created"),w(g,x,x.scopeId,te,j),k){for(const de in k)de!=="value"&&!ir(de)&&r(g,de,null,k[de],Q,j);"value"in k&&r(g,"value",null,k.value,Q),(C=k.onVnodeBeforeMount)&&Cn(C,j,x)}ae&&Ci(x,null,j,"beforeMount");const re=Um(B,V);re&&V.beforeEnter(g),i(g,U,F),((C=k&&k.onVnodeMounted)||re||ae)&&$t(()=>{try{C&&Cn(C,j,x),re&&V.enter(g),ae&&Ci(x,null,j,"mounted")}finally{}},B)},w=(x,U,F,j,B)=>{if(F&&p(x,F),j)for(let Q=0;Q<j.length;Q++)p(x,j[Q]);if(B){let Q=B.subTree;if(U===Q||Ff(Q.type)&&(Q.ssContent===U||Q.ssFallback===U)){const te=B.vnode;w(x,te,te.scopeId,te.slotScopeIds,B.parent)}}},H=(x,U,F,j,B,Q,te,M,g=0)=>{for(let C=g;C<x.length;C++){const k=x[C]=M?jn(x[C]):Dn(x[C]);v(null,k,U,F,j,B,Q,te,M)}},S=(x,U,F,j,B,Q,te)=>{const M=U.el=x.el;let{patchFlag:g,dynamicChildren:C,dirs:k}=U;g|=x.patchFlag&16;const O=x.props||at,V=U.props||at;let ae;if(F&&Ri(F,!1),(ae=V.onVnodeBeforeUpdate)&&Cn(ae,F,U,x),k&&Ci(U,x,F,"beforeUpdate"),F&&Ri(F,!0),C&&(!x.dynamicChildren||x.dynamicChildren.length!==C.length)&&(g=0,te=!1,C=null),(O.innerHTML&&V.innerHTML==null||O.textContent&&V.textContent==null)&&u(M,""),C?A(x.dynamicChildren,C,M,F,j,ma(U,B),Q):te||$(x,U,M,null,F,j,ma(U,B),Q,!1),g>0){if(g&16)X(M,O,V,F,B);else if(g&2&&O.class!==V.class&&r(M,"class",null,V.class,B),g&4&&r(M,"style",O.style,V.style,B),g&8){const re=U.dynamicProps;for(let de=0;de<re.length;de++){const Me=re[de],Ae=O[Me],ne=V[Me];(ne!==Ae||Me==="value")&&r(M,Me,Ae,ne,B,F)}}g&1&&x.children!==U.children&&u(M,U.children)}else!te&&C==null&&X(M,O,V,F,B);((ae=V.onVnodeUpdated)||k)&&$t(()=>{ae&&Cn(ae,F,U,x),k&&Ci(U,x,F,"updated")},j)},A=(x,U,F,j,B,Q,te)=>{for(let M=0;M<U.length;M++){const g=x[M],C=U[M],k=g.el&&(g.type===vn||!ks(g,C)||g.shapeFlag&198)?h(g.el):F;v(g,C,k,null,j,B,Q,te,!0)}},X=(x,U,F,j,B)=>{if(U!==F){if(U!==at)for(const Q in U)!ir(Q)&&!(Q in F)&&r(x,Q,U[Q],null,B,j);for(const Q in F){if(ir(Q))continue;const te=F[Q],M=U[Q];te!==M&&Q!=="value"&&r(x,Q,M,te,B,j)}"value"in F&&r(x,"value",U.value,F.value,B)}},ee=(x,U,F,j,B,Q,te,M,g)=>{const C=U.el=x?x.el:o(""),k=U.anchor=x?x.anchor:o("");let{patchFlag:O,dynamicChildren:V,slotScopeIds:ae}=U;ae&&(M=M?M.concat(ae):ae),x==null?(i(C,F,j),i(k,F,j),H(U.children||[],F,k,B,Q,te,M,g)):O>0&&O&64&&V&&x.dynamicChildren&&x.dynamicChildren.length===V.length?(A(x.dynamicChildren,V,F,B,Q,te,M),(U.key!=null||B&&U===B.subTree)&&Uf(x,U,!0)):$(x,U,F,k,B,Q,te,M,g)},pe=(x,U,F,j,B,Q,te,M,g)=>{U.slotScopeIds=M,x==null?U.shapeFlag&512?B.ctx.activate(U,F,j,te,g):N(U,F,j,B,Q,te,g):G(x,U,g)},N=(x,U,F,j,B,Q,te)=>{const M=x.component=Gm(x,j,B);if(_f(x)&&(M.ctx.renderer=Pe),km(M,!1,te),M.asyncDep){if(B&&B.registerDep(M,W,te),!x.el){const g=M.subTree=it(Us);d(null,g,U,F),x.placeholder=g.el}}else W(M,x,U,F,B,Q,te)},G=(x,U,F)=>{const j=U.component=x.component;if(bm(x,U,F))if(j.asyncDep&&!j.asyncResolved){q(j,U,F);return}else j.next=U,j.update();else U.el=x.el,j.vnode=U},W=(x,U,F,j,B,Q,te)=>{const M=()=>{if(x.isMounted){let{next:O,bu:V,u:ae,parent:re,vnode:de}=x;{const R=If(x);if(R){O&&(O.el=de.el,q(x,O,te)),R.asyncDep.then(()=>{$t(()=>{x.isUnmounted||C()},B)});return}}let Me=O,Ae;Ri(x,!1),O?(O.el=de.el,q(x,O,te)):O=de,V&&fo(V),(Ae=O.props&&O.props.onVnodeBeforeUpdate)&&Cn(Ae,re,O,de),Ri(x,!0);const ne=gc(x),se=x.subTree;x.subTree=ne,v(se,ne,h(se.el),Ce(se),x,B,Q),O.el=ne.el,Me===null&&Em(x,ne.el),ae&&$t(ae,B),(Ae=O.props&&O.props.onVnodeUpdated)&&$t(()=>Cn(Ae,re,O,de),B)}else{let O;const{el:V,props:ae}=U,{bm:re,m:de,parent:Me,root:Ae,type:ne}=x,se=cr(U);Ri(x,!1),re&&fo(re),!se&&(O=ae&&ae.onVnodeBeforeMount)&&Cn(O,Me,U),Ri(x,!0);{Ae.ce&&Ae.ce._hasShadowRoot()&&Ae.ce._injectChildStyle(ne,x.parent?x.parent.type:void 0);const R=x.subTree=gc(x);v(null,R,F,j,x,B,Q),U.el=R.el}if(de&&$t(de,B),!se&&(O=ae&&ae.onVnodeMounted)){const R=U;$t(()=>Cn(O,Me,R),B)}(U.shapeFlag&256||Me&&cr(Me.vnode)&&Me.vnode.shapeFlag&256)&&x.a&&$t(x.a,B),x.isMounted=!0,U=F=j=null}};x.scope.on();const g=x.effect=new jh(M);x.scope.off();const C=x.update=g.run.bind(g),k=x.job=g.runIfDirty.bind(g);k.i=x,k.id=x.uid,g.scheduler=()=>Ol(k),Ri(x,!0),C()},q=(x,U,F)=>{U.component=x;const j=x.vnode.props;x.vnode=U,x.next=null,Am(x,U.props,j,F),Pm(x,U.children,F),ni(),cc(x),ii()},$=(x,U,F,j,B,Q,te,M,g=!1)=>{const C=x&&x.children,k=x?x.shapeFlag:0,O=U.children,{patchFlag:V,shapeFlag:ae}=U;if(V>0){if(V&128){oe(C,O,F,j,B,Q,te,M,g);return}else if(V&256){ie(C,O,F,j,B,Q,te,M,g);return}}ae&8?(k&16&&we(C,B,Q),O!==C&&u(F,O)):k&16?ae&16?oe(C,O,F,j,B,Q,te,M,g):we(C,B,Q,!0):(k&8&&u(F,""),ae&16&&H(O,F,j,B,Q,te,M,g))},ie=(x,U,F,j,B,Q,te,M,g)=>{x=x||Cs,U=U||Cs;const C=x.length,k=U.length,O=Math.min(C,k);let V;for(V=0;V<O;V++){const ae=U[V]=g?jn(U[V]):Dn(U[V]);v(x[V],ae,F,null,B,Q,te,M,g)}C>k?we(x,B,Q,!0,!1,O):H(U,F,j,B,Q,te,M,g,O)},oe=(x,U,F,j,B,Q,te,M,g)=>{let C=0;const k=U.length;let O=x.length-1,V=k-1;for(;C<=O&&C<=V;){const ae=x[C],re=U[C]=g?jn(U[C]):Dn(U[C]);if(ks(ae,re))v(ae,re,F,null,B,Q,te,M,g);else break;C++}for(;C<=O&&C<=V;){const ae=x[O],re=U[V]=g?jn(U[V]):Dn(U[V]);if(ks(ae,re))v(ae,re,F,null,B,Q,te,M,g);else break;O--,V--}if(C>O){if(C<=V){const ae=V+1,re=ae<k?U[ae].el:j;for(;C<=V;)v(null,U[C]=g?jn(U[C]):Dn(U[C]),F,re,B,Q,te,M,g),C++}}else if(C>V)for(;C<=O;)he(x[C],B,Q,!0),C++;else{const ae=C,re=C,de=new Map;for(C=re;C<=V;C++){const ce=U[C]=g?jn(U[C]):Dn(U[C]);ce.key!=null&&de.set(ce.key,C)}let Me,Ae=0;const ne=V-re+1;let se=!1,R=0;const le=new Array(ne);for(C=0;C<ne;C++)le[C]=0;for(C=ae;C<=O;C++){const ce=x[C];if(Ae>=ne){he(ce,B,Q,!0);continue}let be;if(ce.key!=null)be=de.get(ce.key);else for(Me=re;Me<=V;Me++)if(le[Me-re]===0&&ks(ce,U[Me])){be=Me;break}be===void 0?he(ce,B,Q,!0):(le[be-re]=C+1,be>=R?R=be:se=!0,v(ce,U[be],F,null,B,Q,te,M,g),Ae++)}const ge=se?Im(le):Cs;for(Me=ge.length-1,C=ne-1;C>=0;C--){const ce=re+C,be=U[ce],Ve=U[ce+1],Ye=ce+1<k?Ve.el||Nf(Ve):j;le[C]===0?v(null,be,F,Ye,B,Q,te,M,g):se&&(Me<0||C!==ge[Me]?fe(be,F,Ye,2):Me--)}}},fe=(x,U,F,j,B=null)=>{const{el:Q,type:te,transition:M,children:g,shapeFlag:C}=x;if(C&6){fe(x.component.subTree,U,F,j);return}if(C&128){x.suspense.move(U,F,j);return}if(C&64){te.move(x,U,F,Pe);return}if(te===vn){i(Q,U,F);for(let O=0;O<g.length;O++)fe(g[O],U,F,j);i(x.anchor,U,F);return}if(te===ga){y(x,U,F);return}if(j!==2&&C&1&&M)if(j===0)M.persisted&&!Q[da]?i(Q,U,F):(M.beforeEnter(Q),i(Q,U,F),$t(()=>M.enter(Q),B));else{const{leave:O,delayLeave:V,afterLeave:ae}=M,re=()=>{x.ctx.isUnmounted?s(Q):i(Q,U,F)},de=()=>{const Me=Q._isLeaving||!!Q[da];Q._isLeaving&&Q[da](!0),M.persisted&&!Me?re():O(Q,()=>{re(),ae&&ae()})};V?V(Q,re,de):de()}else i(Q,U,F)},he=(x,U,F,j=!1,B=!1)=>{const{type:Q,props:te,ref:M,children:g,dynamicChildren:C,shapeFlag:k,patchFlag:O,dirs:V,cacheIndex:ae,memo:re}=x;if(O===-2&&(B=!1),M!=null&&(ni(),lr(M,null,F,x,!0),ii()),ae!=null&&(U.renderCache[ae]=void 0),k&256){U.ctx.deactivate(x);return}const de=k&1&&V,Me=!cr(x);let Ae;if(Me&&(Ae=te&&te.onVnodeBeforeUnmount)&&Cn(Ae,U,x),k&6)Se(x.component,F,j);else{if(k&128){x.suspense.unmount(F,j);return}de&&Ci(x,null,U,"beforeUnmount"),k&64?x.type.remove(x,U,F,Pe,j):C&&!C.hasOnce&&(Q!==vn||O>0&&O&64)?we(C,U,F,!1,!0):(Q===vn&&O&384||!B&&k&16)&&we(g,U,F),j&&J(x)}const ne=re!=null&&ae==null;(Me&&(Ae=te&&te.onVnodeUnmounted)||de||ne)&&$t(()=>{Ae&&Cn(Ae,U,x),de&&Ci(x,null,U,"unmounted"),ne&&(x.el=null)},F)},J=x=>{const{type:U,el:F,anchor:j,transition:B}=x;if(U===vn){ue(F,j);return}if(U===ga){E(x);return}const Q=()=>{s(F),B&&!B.persisted&&B.afterLeave&&B.afterLeave()};if(x.shapeFlag&1&&B&&!B.persisted){const{leave:te,delayLeave:M}=B,g=()=>te(F,Q);M?M(x.el,Q,g):g()}else Q()},ue=(x,U)=>{let F;for(;x!==U;)F=f(x),s(x),x=F;s(U)},Se=(x,U,F)=>{const{bum:j,scope:B,job:Q,subTree:te,um:M,m:g,a:C}=x;xc(g),xc(C),j&&fo(j),B.stop(),Q&&(Q.flags|=8,he(te,x,U,F)),M&&$t(M,U),$t(()=>{x.isUnmounted=!0},U)},we=(x,U,F,j=!1,B=!1,Q=0)=>{for(let te=Q;te<x.length;te++)he(x[te],U,F,j,B)},Ce=x=>{if(x.shapeFlag&6)return Ce(x.component.subTree);if(x.shapeFlag&128)return x.suspense.next();const U=f(x.anchor||x.el),F=U&&U[$p];return F?f(F):U};let Ue=!1;const Ne=(x,U,F)=>{let j;x==null?U._vnode&&(he(U._vnode,null,null,!0),j=U._vnode.component):v(U._vnode||null,x,U,null,null,null,F),U._vnode=x,Ue||(Ue=!0,cc(j),hf(),Ue=!1)},Pe={p:v,um:he,m:fe,r:J,mt:N,mc:H,pc:$,pbc:A,n:Ce,o:n};return{render:Ne,hydrate:void 0,createApp:_m(Ne)}}function ma({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ri({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Um(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Uf(n,e,t=!1){const i=n.children,s=e.children;if(Oe(i)&&Oe(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=jn(s[r]),o.el=a.el),!t&&o.patchFlag!==-2&&Uf(a,o)),o.type===Ko&&(o.patchFlag===-1&&(o=s[r]=jn(o)),o.el=a.el),o.type===Us&&!o.el&&(o.el=a.el)}}function Im(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function If(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:If(e)}function xc(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Nf(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Nf(e.subTree):null}const Ff=n=>n.__isSuspense;function Nm(n,e){e&&e.pendingBranch?Oe(n)?e.effects.push(...n):e.effects.push(n):Gp(n)}const vn=Symbol.for("v-fgt"),Ko=Symbol.for("v-txt"),Us=Symbol.for("v-cmt"),ga=Symbol.for("v-stc"),Vi=[];let rn=null;function Tt(n=!1){Vi.push(rn=n?null:[])}function Of(){Vi.pop(),rn=Vi[Vi.length-1]||null}let vr=1;function Mc(n,e=!1){vr+=n,n<0&&rn&&e&&(rn.hasOnce=!0)}function Fm(n){return n.dynamicChildren=vr>0?rn||Cs:null,Of(),vr>0&&rn&&rn.push(n),n}function At(n,e,t,i,s,r){return Fm(me(n,e,t,i,s,r,!0))}function Bf(n){return n?n.__v_isVNode===!0:!1}function ks(n,e){return n.type===e.type&&n.key===e.key}const zf=({key:n})=>n??null,po=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?xt(n)||Mt(n)||ke(n)?{i:dn,r:n,k:e,f:!!t}:n:null);function me(n,e=null,t=null,i=0,s=null,r=n===vn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&zf(e),ref:e&&po(e),scopeId:df,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:dn};return o?(So(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=xt(t)?8:16),vr>0&&!a&&rn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&rn.push(l),l}const it=Om;function Om(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===lm)&&(n=Us),Bf(n)){const o=Is(n,e,!0);return t&&So(o,t),vr>0&&!r&&rn&&(o.shapeFlag&6?rn[rn.indexOf(n)]=o:rn.push(o)),o.patchFlag=-2,o}if(qm(n)&&(n=n.__vccOpts),e){e=Bm(e);let{class:o,style:l}=e;o&&!xt(o)&&(e.class=xi(o)),ot(l)&&(ko(l)&&!Oe(l)&&(l=Ht({},l)),e.style=Ho(l))}const a=xt(n)?1:Ff(n)?128:Zp(n)?64:ot(n)?4:ke(n)?2:0;return me(n,e,t,i,s,a,r,!0)}function Bm(n){return n?ko(n)||wf(n)?Ht({},n):n:null}function Is(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:a,children:o,transition:l}=n,c=e?zm(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&zf(c),ref:e&&e.ref?t&&r?Oe(r)?r.concat(po(e)):[r,po(e)]:po(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==vn?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Is(n.ssContent),ssFallback:n.ssFallback&&Is(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Bl(u,l.clone(u)),u}function Pn(n=" ",e=0){return it(Ko,null,n,e)}function Dn(n){return n==null||typeof n=="boolean"?it(Us):Oe(n)?it(vn,null,n.slice()):Bf(n)?jn(n):it(Ko,null,String(n))}function jn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Is(n)}function So(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Oe(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),So(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!wf(e)?e._ctx=dn:s===3&&dn&&(dn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(ke(e)){if(i&65){So(n,{default:e});return}e={default:e,_ctx:dn},t=32}else e=String(e),i&64?(t=16,e=[Pn(e)]):t=8;n.children=e,n.shapeFlag|=t}function zm(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=xi([e.class,i.class]));else if(s==="style")e.style=Ho([e.style,i.style]);else if(No(s)){const r=e[s],a=i[s];a&&r!==a&&!(Oe(r)&&r.includes(a))?e[s]=r?[].concat(r,a):a:a==null&&r==null&&!Fo(s)&&(e[s]=a)}else s!==""&&(e[s]=i[s])}return e}function Cn(n,e,t,i=null){An(n,e,7,[t,i])}const Hm=Sf();let Vm=0;function Gm(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||Hm,r={uid:Vm++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new kh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Rf(i,s),emitsOptions:bf(i,s),emit:null,emitted:null,propsDefaults:at,inheritAttrs:i.inheritAttrs,ctx:at,data:at,props:at,attrs:at,slots:at,refs:at,setupState:at,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=xm.bind(null,r),n.ce&&n.ce(r),r}let Yt=null;const Hf=()=>Yt||dn;let bo,cl;{const n=zo(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};bo=e("__VUE_INSTANCE_SETTERS__",t=>Yt=t),cl=e("__VUE_SSR_SETTERS__",t=>xr=t)}const Ar=n=>{const e=Yt;return bo(n),n.scope.on(),()=>{n.scope.off(),bo(e)}},yc=()=>{Yt&&Yt.scope.off(),bo(null)};function Vf(n){return n.vnode.shapeFlag&4}let xr=!1;function km(n,e=!1,t=!1){e&&cl(e);const{props:i,children:s}=n.vnode,r=Vf(n);Tm(n,i,r,e),Rm(n,s,t||e);const a=r?Wm(n,e):void 0;return e&&cl(!1),a}function Wm(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,um);const{setup:i}=t;if(i){ni();const s=n.setupContext=i.length>1?jm(n):null,r=Ar(n),a=Tr(i,n,0,[n.props,s]),o=Nh(a);if(ii(),r(),(o||n.sp)&&!cr(n)&&gf(n),o){if(a.then(yc,yc),e)return a.then(l=>{Sc(n,l)}).catch(l=>{Xo(l,n,0)});n.asyncDep=a}else Sc(n,a)}else Gf(n)}function Sc(n,e,t){ke(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:ot(e)&&(n.setupState=af(e)),Gf(n)}function Gf(n,e,t){const i=n.type;n.render||(n.render=i.render||Fn);{const s=Ar(n);ni();try{hm(n)}finally{ii(),s()}}}const Xm={get(n,e){return Bt(n,"get",""),n[e]}};function jm(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Xm),slots:n.slots,emit:n.emit,expose:e}}function $o(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(af(Wo(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in ur)return ur[t](n)},has(e,t){return t in e||t in ur}})):n.proxy}function qm(n){return ke(n)&&"__vccOpts"in n}const qn=(n,e)=>Op(n,e,xr),Ym="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ul;const bc=typeof window<"u"&&window.trustedTypes;if(bc)try{ul=bc.createPolicy("vue",{createHTML:n=>n})}catch{}const kf=ul?n=>ul.createHTML(n):n=>n,Km="http://www.w3.org/2000/svg",$m="http://www.w3.org/1998/Math/MathML",Xn=typeof document<"u"?document:null,Ec=Xn&&Xn.createElement("template"),Zm={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?Xn.createElementNS(Km,n):e==="mathml"?Xn.createElementNS($m,n):t?Xn.createElement(n,{is:t}):Xn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Xn.createTextNode(n),createComment:n=>Xn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Xn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Ec.innerHTML=kf(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Ec.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Jm=Symbol("_vtc");function Qm(n,e,t){const i=n[Jm];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Tc=Symbol("_vod"),eg=Symbol("_vsh"),tg=Symbol(""),ng=/(?:^|;)\s*display\s*:/;function ig(n,e,t){const i=n.style,s=xt(t);let r=!1;if(t&&!s){if(e)if(xt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&tr(i,o,"")}else for(const a in e)t[a]==null&&tr(i,a,"");for(const a in t){a==="display"&&(r=!0);const o=t[a];o!=null?rg(n,a,!xt(e)&&e?e[a]:void 0,o)||tr(i,a,o):tr(i,a,"")}}else if(s){if(e!==t){const a=i[tg];a&&(t+=";"+a),i.cssText=t,r=ng.test(t)}}else e&&n.removeAttribute("style");Tc in n&&(n[Tc]=r?i.display:"",n[eg]&&(i.display="none"))}const Ac=/\s*!important$/;function tr(n,e,t){if(Oe(t))t.forEach(i=>tr(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=sg(n,e);Ac.test(t)?n.setProperty(ji(i),t.replace(Ac,""),"important"):n[i]=t}}const wc=["Webkit","Moz","ms"],_a={};function sg(n,e){const t=_a[e];if(t)return t;let i=Sn(e);if(i!=="filter"&&i in n)return _a[e]=i;i=Bh(i);for(let s=0;s<wc.length;s++){const r=wc[s]+i;if(r in n)return _a[e]=r}return e}function rg(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&xt(i)&&t===i}const Cc="http://www.w3.org/1999/xlink";function Rc(n,e,t,i,s,r=lp(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Cc,e.slice(6,e.length)):n.setAttributeNS(Cc,e,t):t==null||r&&!Hh(t)?n.removeAttribute(e):n.setAttribute(e,r?"":pn(t)?String(t):t)}function Pc(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?kf(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=Hh(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function Es(n,e,t,i){n.addEventListener(e,t,i)}function og(n,e,t,i){n.removeEventListener(e,t,i)}const Lc=Symbol("_vei");function ag(n,e,t,i,s=null){const r=n[Lc]||(n[Lc]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=ug(e);if(i){const c=r[e]=dg(i,s);Es(n,o,c,l)}else a&&(og(n,o,a,l),r[e]=void 0)}}const lg=/(Once|Passive|Capture)$/,cg=/^on:?(?:Once|Passive|Capture)$/;function ug(n){let e,t;for(;(t=n.match(lg))&&!cg.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):ji(n.slice(2)),e]}let va=0;const hg=Promise.resolve(),fg=()=>va||(hg.then(()=>va=0),va=Date.now());function dg(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;const s=t.value;if(Oe(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const a=s.slice(),o=[i];for(let l=0;l<a.length&&!i._stopped;l++){const c=a[l];c&&An(c,e,5,o)}}else An(s,e,5,[i])};return t.value=n,t.attached=fg(),t}const Dc=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,pg=(n,e,t,i,s,r)=>{const a=s==="svg";e==="class"?Qm(n,i,a):e==="style"?ig(n,t,i):No(e)?Fo(e)||ag(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):mg(n,e,i,a))?(Pc(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Rc(n,e,i,a,r,e!=="value")):n._isVueCE&&(gg(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!xt(i)))?Pc(n,Sn(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Rc(n,e,i,a))};function mg(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Dc(e)&&ke(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Dc(e)&&xt(t)?!1:e in n}function gg(n,e){const t=n._def.props;if(!t)return!1;const i=Sn(e);return Array.isArray(t)?t.some(s=>Sn(s)===i):Object.keys(t).some(s=>Sn(s)===i)}const Uc=n=>{const e=n.props["onUpdate:modelValue"]||!1;return Oe(e)?t=>fo(e,t):e};function _g(n){n.target.composing=!0}function Ic(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const xa=Symbol("_assign");function Nc(n,e,t){return e&&(n=n.trim()),t&&(n=Rl(n)),n}const vg={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[xa]=Uc(s);const r=i||s.props&&s.props.type==="number";Es(n,e?"change":"input",a=>{a.target.composing||n[xa](Nc(n.value,t,r))}),(t||r)&&Es(n,"change",()=>{n.value=Nc(n.value,t,r)}),e||(Es(n,"compositionstart",_g),Es(n,"compositionend",Ic),Es(n,"change",Ic))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},a){if(n[xa]=Uc(a),n.composing)return;const o=(r||n.type==="number")&&!/^0\d/.test(n.value)?Rl(n.value):n.value,l=e??"";if(o===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l)}},xg=Ht({patchProp:pg},Zm);let Fc;function Mg(){return Fc||(Fc=Lm(xg))}const yg=(...n)=>{const e=Mg().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=bg(i);if(!s)return;const r=e._component;!ke(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,Sg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function Sg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function bg(n){return xt(n)?document.querySelector(n):n}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Wf;const Zo=n=>Wf=n,Xf=Symbol();function hl(n){return n&&typeof n=="object"&&Object.prototype.toString.call(n)==="[object Object]"&&typeof n.toJSON!="function"}var hr;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(hr||(hr={}));function Eg(){const n=Wh(!0),e=n.run(()=>Ze({}));let t=[],i=[];const s=Wo({install(r){Zo(s),s._a=r,r.provide(Xf,s),r.config.globalProperties.$pinia=s,i.forEach(a=>t.push(a)),i=[]},use(r){return this._a?t.push(r):i.push(r),this},_p:t,_a:null,_e:n,_s:new Map,state:e});return s}const jf=()=>{};function Oc(n,e,t,i=jf){n.push(e);const s=()=>{const r=n.indexOf(e);r>-1&&(n.splice(r,1),i())};return!t&&Xh()&&up(s),s}function Ji(n,...e){n.slice().forEach(t=>{t(...e)})}const Tg=n=>n(),Bc=Symbol(),Ma=Symbol();function fl(n,e){n instanceof Map&&e instanceof Map?e.forEach((t,i)=>n.set(i,t)):n instanceof Set&&e instanceof Set&&e.forEach(n.add,n);for(const t in e){if(!e.hasOwnProperty(t))continue;const i=e[t],s=n[t];hl(s)&&hl(i)&&n.hasOwnProperty(t)&&!Mt(i)&&!Zn(i)?n[t]=fl(s,i):n[t]=i}return n}const Ag=Symbol();function wg(n){return!hl(n)||!n.hasOwnProperty(Ag)}const{assign:fi}=Object;function Cg(n){return!!(Mt(n)&&n.effect)}function Rg(n,e,t,i){const{state:s,actions:r,getters:a}=e,o=t.state.value[n];let l;function c(){o||(t.state.value[n]=s?s():{});const u=Up(t.state.value[n]);return fi(u,r,Object.keys(a||{}).reduce((h,f)=>(h[f]=Wo(qn(()=>{Zo(t);const p=t._s.get(n);return a[f].call(p,p)})),h),{}))}return l=qf(n,c,e,t,i,!0),l}function qf(n,e,t={},i,s,r){let a;const o=fi({actions:{}},t),l={deep:!0};let c,u,h=[],f=[],p;const _=i.state.value[n];!r&&!_&&(i.state.value[n]={});let v;function m(H){let S;c=u=!1,typeof H=="function"?(H(i.state.value[n]),S={type:hr.patchFunction,storeId:n,events:p}):(fl(i.state.value[n],H),S={type:hr.patchObject,payload:H,storeId:n,events:p});const A=v=Symbol();cf().then(()=>{v===A&&(c=!0)}),u=!0,Ji(h,S,i.state.value[n])}const d=r?function(){const{state:S}=t,A=S?S():{};this.$patch(X=>{fi(X,A)})}:jf;function b(){a.stop(),h=[],f=[],i._s.delete(n)}const y=(H,S="")=>{if(Bc in H)return H[Ma]=S,H;const A=function(){Zo(i);const X=Array.from(arguments),ee=[],pe=[];function N(q){ee.push(q)}function G(q){pe.push(q)}Ji(f,{args:X,name:A[Ma],store:D,after:N,onError:G});let W;try{W=H.apply(this&&this.$id===n?this:D,X)}catch(q){throw Ji(pe,q),q}return W instanceof Promise?W.then(q=>(Ji(ee,q),q)).catch(q=>(Ji(pe,q),Promise.reject(q))):(Ji(ee,W),W)};return A[Bc]=!0,A[Ma]=S,A},E={_p:i,$id:n,$onAction:Oc.bind(null,f),$patch:m,$reset:d,$subscribe(H,S={}){const A=Oc(h,H,S.detached,()=>X()),X=a.run(()=>ar(()=>i.state.value[n],ee=>{(S.flush==="sync"?u:c)&&H({storeId:n,type:hr.direct,events:p},ee)},fi({},l,S)));return A},$dispose:b},D=Go(E);i._s.set(n,D);const w=(i._a&&i._a.runWithContext||Tg)(()=>i._e.run(()=>(a=Wh()).run(()=>e({action:y}))));for(const H in w){const S=w[H];if(Mt(S)&&!Cg(S)||Zn(S))r||(_&&wg(S)&&(Mt(S)?S.value=_[H]:fl(S,_[H])),i.state.value[n][H]=S);else if(typeof S=="function"){const A=y(S,H);w[H]=A,o.actions[H]=S}}return fi(D,w),fi(Qe(D),w),Object.defineProperty(D,"$state",{get:()=>i.state.value[n],set:H=>{m(S=>{fi(S,H)})}}),i._p.forEach(H=>{fi(D,a.run(()=>H({store:D,app:i._a,pinia:i,options:o})))}),_&&r&&t.hydrate&&t.hydrate(D.$state,_),c=!0,u=!0,D}/*! #__NO_SIDE_EFFECTS__ */function Pg(n,e,t){let i,s;const r=typeof e=="function";i=n,s=r?t:e;function a(o,l){const c=jp();return o=o||(c?or(Xf,null):null),o&&Zo(o),o=Wf,o._s.has(i)||(r?qf(i,e,s,o):Rg(i,s,o)),o._s.get(i)}return a.$id=i,a}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gl="160",Qi={ROTATE:0,DOLLY:1,PAN:2},es={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Lg=0,zc=1,Dg=2,Yf=1,Ug=2,Wn=3,bi=0,Kt=1,sn=2,Jn=0,Gi=1,Zt=2,Hc=3,Vc=4,Ig=5,Oi=100,Ng=101,Fg=102,Gc=103,kc=104,Og=200,Bg=201,zg=202,Hg=203,dl=204,pl=205,Vg=206,Gg=207,kg=208,Wg=209,Xg=210,jg=211,qg=212,Yg=213,Kg=214,$g=0,Zg=1,Jg=2,Eo=3,Qg=4,e_=5,t_=6,n_=7,Kf=0,i_=1,s_=2,Mi=0,r_=1,o_=2,a_=3,$f=4,l_=5,c_=6,Zf=300,Ns=301,Fs=302,ml=303,gl=304,Jo=306,_l=1e3,xn=1001,vl=1002,jt=1003,Wc=1004,ya=1005,un=1006,u_=1007,Mr=1008,yi=1009,h_=1010,f_=1011,kl=1012,Jf=1013,mi=1014,gi=1015,Qn=1016,Qf=1017,ed=1018,ki=1020,d_=1021,Mn=1023,p_=1024,m_=1025,Wi=1026,Os=1027,g_=1028,td=1029,__=1030,nd=1031,id=1033,Sa=33776,ba=33777,Ea=33778,Ta=33779,Xc=35840,jc=35841,qc=35842,Yc=35843,sd=36196,Kc=37492,$c=37496,Zc=37808,Jc=37809,Qc=37810,eu=37811,tu=37812,nu=37813,iu=37814,su=37815,ru=37816,ou=37817,au=37818,lu=37819,cu=37820,uu=37821,Aa=36492,hu=36494,fu=36495,v_=36283,du=36284,pu=36285,mu=36286,rd=3e3,Xi=3001,x_=3200,M_=3201,od=0,y_=1,fn="",It="srgb",ri="srgb-linear",Wl="display-p3",Qo="display-p3-linear",To="linear",ht="srgb",Ao="rec709",wo="p3",ts=7680,gu=519,S_=512,b_=513,E_=514,ad=515,T_=516,A_=517,w_=518,C_=519,xl=35044,_u="300 es",Ml=1035,$n=2e3,Co=2001;class qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vu=1234567;const fr=Math.PI/180,yr=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function zt(n,e,t){return Math.max(e,Math.min(t,n))}function Xl(n,e){return(n%e+e)%e}function R_(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function P_(n,e,t){return n!==e?(t-n)/(e-n):0}function dr(n,e,t){return(1-t)*n+t*e}function L_(n,e,t,i){return dr(n,e,1-Math.exp(-t*i))}function D_(n,e=1){return e-Math.abs(Xl(n,e*2)-e)}function U_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function I_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function N_(n,e){return n+Math.floor(Math.random()*(e-n+1))}function F_(n,e){return n+Math.random()*(e-n)}function O_(n){return n*(.5-Math.random())}function B_(n){n!==void 0&&(vu=n);let e=vu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function z_(n){return n*fr}function H_(n){return n*yr}function yl(n){return(n&n-1)===0&&n!==0}function V_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ro(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function G_(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),h=r((e-i)/2),f=a((e-i)/2),p=r((i-e)/2),_=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*h,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Nn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ts={DEG2RAD:fr,RAD2DEG:yr,generateUUID:ei,clamp:zt,euclideanModulo:Xl,mapLinear:R_,inverseLerp:P_,lerp:dr,damp:L_,pingpong:D_,smoothstep:U_,smootherstep:I_,randInt:N_,randFloat:F_,randFloatSpread:O_,seededRandom:B_,degToRad:z_,radToDeg:H_,isPowerOfTwo:yl,ceilPowerOfTwo:V_,floorPowerOfTwo:Ro,setQuaternionFromProperEuler:G_,normalize:nt,denormalize:Nn};class Te{constructor(e=0,t=0){Te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $e{constructor(e,t,i,s,r,a,o,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],_=i[8],v=s[0],m=s[3],d=s[6],b=s[1],y=s[4],E=s[7],D=s[2],P=s[5],w=s[8];return r[0]=a*v+o*b+l*D,r[3]=a*m+o*y+l*P,r[6]=a*d+o*E+l*w,r[1]=c*v+u*b+h*D,r[4]=c*m+u*y+h*P,r[7]=c*d+u*E+h*w,r[2]=f*v+p*b+_*D,r[5]=f*m+p*y+_*P,r[8]=f*d+p*E+_*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*r,p=c*r-a*l,_=t*h+i*f+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=h*v,e[1]=(s*c-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=f*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(wa.makeScale(e,t)),this}rotate(e){return this.premultiply(wa.makeRotation(-e)),this}translate(e,t){return this.premultiply(wa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wa=new $e;function ld(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Po(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function k_(){const n=Po("canvas");return n.style.display="block",n}const xu={};function pr(n){n in xu||(xu[n]=!0,console.warn(n))}const Mu=new $e().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),yu=new $e().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Fr={[ri]:{transfer:To,primaries:Ao,toReference:n=>n,fromReference:n=>n},[It]:{transfer:ht,primaries:Ao,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Qo]:{transfer:To,primaries:wo,toReference:n=>n.applyMatrix3(yu),fromReference:n=>n.applyMatrix3(Mu)},[Wl]:{transfer:ht,primaries:wo,toReference:n=>n.convertSRGBToLinear().applyMatrix3(yu),fromReference:n=>n.applyMatrix3(Mu).convertLinearToSRGB()}},W_=new Set([ri,Qo]),st={enabled:!0,_workingColorSpace:ri,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!W_.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Fr[e].toReference,s=Fr[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Fr[n].primaries},getTransfer:function(n){return n===fn?To:Fr[n].transfer}};function Ls(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ca(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ns;class cd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ns===void 0&&(ns=Po("canvas")),ns.width=e.width,ns.height=e.height;const i=ns.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Po("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ls(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ls(t[i]/255)*255):t[i]=Ls(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let X_=0;class ud{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=ei(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ra(s[a].image)):r.push(Ra(s[a]))}else r=Ra(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ra(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?cd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let j_=0;class Jt extends qi{constructor(e=Jt.DEFAULT_IMAGE,t=Jt.DEFAULT_MAPPING,i=xn,s=xn,r=un,a=Mr,o=Mn,l=yi,c=Jt.DEFAULT_ANISOTROPY,u=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=ei(),this.name="",this.source=new ud(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(pr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Xi?It:fn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _l:e.x=e.x-Math.floor(e.x);break;case xn:e.x=e.x<0?0:1;break;case vl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _l:e.y=e.y-Math.floor(e.y);break;case xn:e.y=e.y<0?0:1;break;case vl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return pr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===It?Xi:rd}set encoding(e){pr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Xi?It:fn}}Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=Zf;Jt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,i=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],_=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,E=(p+1)/2,D=(d+1)/2,P=(u+f)/4,w=(h+v)/4,H=(_+m)/4;return y>E&&y>D?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=P/i,r=w/i):E>D?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=P/s,r=H/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=w/r,s=H/r),this.set(i,s,r,t),this}let b=Math.sqrt((m-_)*(m-_)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(h-v)/b,this.z=(f-u)/b,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class q_ extends qi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(pr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Xi?It:fn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Jt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ud(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends q_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class hd extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Y_ extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ei{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[a+0],p=r[a+1],_=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=_,e[t+3]=v;return}if(h!==v||l!==f||c!==p||u!==_){let m=1-o;const d=l*f+c*p+u*_+h*v,b=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const D=Math.sqrt(y),P=Math.atan2(D,d*b);m=Math.sin(m*P)/D,o=Math.sin(o*P)/D}const E=o*b;if(l=l*m+f*E,c=c*m+p*E,u=u*m+_*E,h=h*m+v*E,m===1-o){const D=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=D,c*=D,u*=D,h*=D}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[a],f=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+u*h+l*p-c*f,e[t+1]=l*_+u*f+c*h-o*p,e[t+2]=c*_+u*p+o*f-l*h,e[t+3]=u*_-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(r/2),f=l(i/2),p=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"YXZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"ZXY":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"ZYX":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"YZX":this._x=f*u*h+c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h-f*p*_;break;case"XZY":this._x=f*u*h-c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Su.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Su.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Pa.copy(this).projectOnVector(e),this.sub(Pa)}reflect(e){return this.sub(Pa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pa=new L,Su=new Ei;class Yi{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(r,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Or.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Or.copy(i.boundingBox)),Or.applyMatrix4(e.matrixWorld),this.union(Or)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),Br.subVectors(this.max,Ws),is.subVectors(e.a,Ws),ss.subVectors(e.b,Ws),rs.subVectors(e.c,Ws),ai.subVectors(ss,is),li.subVectors(rs,ss),Pi.subVectors(is,rs);let t=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Pi.z,Pi.y,ai.z,0,-ai.x,li.z,0,-li.x,Pi.z,0,-Pi.x,-ai.y,ai.x,0,-li.y,li.x,0,-Pi.y,Pi.x,0];return!La(t,is,ss,rs,Br)||(t=[1,0,0,0,1,0,0,0,1],!La(t,is,ss,rs,Br))?!1:(zr.crossVectors(ai,li),t=[zr.x,zr.y,zr.z],La(t,is,ss,rs,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const zn=[new L,new L,new L,new L,new L,new L,new L,new L],mn=new L,Or=new Yi,is=new L,ss=new L,rs=new L,ai=new L,li=new L,Pi=new L,Ws=new L,Br=new L,zr=new L,Li=new L;function La(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Li.fromArray(n,r);const o=s.x*Math.abs(Li.x)+s.y*Math.abs(Li.y)+s.z*Math.abs(Li.z),l=e.dot(Li),c=t.dot(Li),u=i.dot(Li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const K_=new Yi,Xs=new L,Da=new L;class Ki{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):K_.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);const t=Xs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Da.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(Da)),this.expandByPoint(Xs.copy(e.center).sub(Da))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hn=new L,Ua=new L,Hr=new L,ci=new L,Ia=new L,Vr=new L,Na=new L;class wr{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.origin).addScaledVector(this.direction,t),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ua.copy(e).add(t).multiplyScalar(.5),Hr.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(Ua);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Hr),o=ci.dot(this.direction),l=-ci.dot(Hr),c=ci.lengthSq(),u=Math.abs(1-a*a);let h,f,p,_;if(u>0)if(h=a*l-o,f=a*o-l,_=r*u,h>=0)if(f>=-_)if(f<=_){const v=1/u;h*=v,f*=v,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ua).addScaledVector(Hr,f),p}intersectSphere(e,t){Hn.subVectors(e.center,this.origin);const i=Hn.dot(this.direction),s=Hn.dot(Hn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,i,s,r){Ia.subVectors(t,e),Vr.subVectors(i,e),Na.crossVectors(Ia,Vr);let a=this.direction.dot(Na),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ci.subVectors(this.origin,e);const l=o*this.direction.dot(Vr.crossVectors(ci,Vr));if(l<0)return null;const c=o*this.direction.dot(Ia.cross(ci));if(c<0||l+c>a)return null;const u=-o*ci.dot(Na);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,i,s,r,a,o,l,c,u,h,f,p,_,v,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,h,f,p,_,v,m)}set(e,t,i,s,r,a,o,l,c,u,h,f,p,_,v,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=_,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*u,p=a*h,_=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+_*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,_=c*u,v=c*h;t[0]=f+v*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,_=c*u,v=c*h;t[0]=f-v*o,t[4]=-a*h,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,p=a*h,_=o*u,v=o*h;t[0]=l*u,t[4]=_*c-p,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=v-f*h,t[8]=_*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+_,t[10]=f-v*h}else if(e.order==="XZY"){const f=a*l,p=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+v,t[5]=a*u,t[9]=p*h-_,t[2]=_*h-p,t[6]=o*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($_,e,Z_)}lookAt(e,t,i){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),ui.crossVectors(i,en),ui.lengthSq()===0&&(Math.abs(i.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ui.crossVectors(i,en)),ui.normalize(),Gr.crossVectors(en,ui),s[0]=ui.x,s[4]=Gr.x,s[8]=en.x,s[1]=ui.y,s[5]=Gr.y,s[9]=en.y,s[2]=ui.z,s[6]=Gr.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],_=i[2],v=i[6],m=i[10],d=i[14],b=i[3],y=i[7],E=i[11],D=i[15],P=s[0],w=s[4],H=s[8],S=s[12],A=s[1],X=s[5],ee=s[9],pe=s[13],N=s[2],G=s[6],W=s[10],q=s[14],$=s[3],ie=s[7],oe=s[11],fe=s[15];return r[0]=a*P+o*A+l*N+c*$,r[4]=a*w+o*X+l*G+c*ie,r[8]=a*H+o*ee+l*W+c*oe,r[12]=a*S+o*pe+l*q+c*fe,r[1]=u*P+h*A+f*N+p*$,r[5]=u*w+h*X+f*G+p*ie,r[9]=u*H+h*ee+f*W+p*oe,r[13]=u*S+h*pe+f*q+p*fe,r[2]=_*P+v*A+m*N+d*$,r[6]=_*w+v*X+m*G+d*ie,r[10]=_*H+v*ee+m*W+d*oe,r[14]=_*S+v*pe+m*q+d*fe,r[3]=b*P+y*A+E*N+D*$,r[7]=b*w+y*X+E*G+D*ie,r[11]=b*H+y*ee+E*W+D*oe,r[15]=b*S+y*pe+E*q+D*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],_=e[3],v=e[7],m=e[11],d=e[15];return _*(+r*l*h-s*c*h-r*o*f+i*c*f+s*o*p-i*l*p)+v*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*u-r*l*u)+m*(+t*c*h-t*o*p-r*a*h+i*a*p+r*o*u-i*c*u)+d*(-s*o*u-t*l*h+t*o*f+s*a*h-i*a*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],_=e[12],v=e[13],m=e[14],d=e[15],b=h*m*c-v*f*c+v*l*p-o*m*p-h*l*d+o*f*d,y=_*f*c-u*m*c-_*l*p+a*m*p+u*l*d-a*f*d,E=u*v*c-_*h*c+_*o*p-a*v*p-u*o*d+a*h*d,D=_*h*l-u*v*l-_*o*f+a*v*f+u*o*m-a*h*m,P=t*b+i*y+s*E+r*D;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/P;return e[0]=b*w,e[1]=(v*f*r-h*m*r-v*s*p+i*m*p+h*s*d-i*f*d)*w,e[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*d+i*l*d)*w,e[3]=(h*l*r-o*f*r-h*s*c+i*f*c+o*s*p-i*l*p)*w,e[4]=y*w,e[5]=(u*m*r-_*f*r+_*s*p-t*m*p-u*s*d+t*f*d)*w,e[6]=(_*l*r-a*m*r-_*s*c+t*m*c+a*s*d-t*l*d)*w,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*p+t*l*p)*w,e[8]=E*w,e[9]=(_*h*r-u*v*r-_*i*p+t*v*p+u*i*d-t*h*d)*w,e[10]=(a*v*r-_*o*r+_*i*c-t*v*c-a*i*d+t*o*d)*w,e[11]=(u*o*r-a*h*r-u*i*c+t*h*c+a*i*p-t*o*p)*w,e[12]=D*w,e[13]=(u*v*s-_*h*s+_*i*f-t*v*f-u*i*m+t*h*m)*w,e[14]=(_*o*s-a*v*s-_*i*l+t*v*l+a*i*m-t*o*m)*w,e[15]=(a*h*s-u*o*s+u*i*l-t*h*l-a*i*f+t*o*f)*w,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,f=r*c,p=r*u,_=r*h,v=a*u,m=a*h,d=o*h,b=l*c,y=l*u,E=l*h,D=i.x,P=i.y,w=i.z;return s[0]=(1-(v+d))*D,s[1]=(p+E)*D,s[2]=(_-y)*D,s[3]=0,s[4]=(p-E)*P,s[5]=(1-(f+d))*P,s[6]=(m+b)*P,s[7]=0,s[8]=(_+y)*w,s[9]=(m-b)*w,s[10]=(1-(f+v))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=os.set(s[0],s[1],s[2]).length();const a=os.set(s[4],s[5],s[6]).length(),o=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],gn.copy(this);const c=1/r,u=1/a,h=1/o;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=u,gn.elements[5]*=u,gn.elements[6]*=u,gn.elements[8]*=h,gn.elements[9]*=h,gn.elements[10]*=h,t.setFromRotationMatrix(gn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=$n){const l=this.elements,c=2*r/(t-e),u=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s);let p,_;if(o===$n)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Co)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=$n){const l=this.elements,c=1/(t-e),u=1/(i-s),h=1/(a-r),f=(t+e)*c,p=(i+s)*u;let _,v;if(o===$n)_=(a+r)*h,v=-2*h;else if(o===Co)_=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const os=new L,gn=new rt,$_=new L(0,0,0),Z_=new L(1,1,1),ui=new L,Gr=new L,en=new L,bu=new rt,Eu=new Ei;class ea{constructor(e=0,t=0,i=0,s=ea.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return bu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Eu.setFromEuler(this),this.setFromQuaternion(Eu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ea.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let J_=0;const Tu=new L,as=new Ei,Vn=new rt,kr=new L,js=new L,Q_=new L,e0=new Ei,Au=new L(1,0,0),wu=new L(0,1,0),Cu=new L(0,0,1),t0={type:"added"},n0={type:"removed"};class wt extends qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new L,t=new ea,i=new Ei,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new $e}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(Au,e)}rotateY(e){return this.rotateOnAxis(wu,e)}rotateZ(e){return this.rotateOnAxis(Cu,e)}translateOnAxis(e,t){return Tu.copy(e).applyQuaternion(this.quaternion),this.position.add(Tu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Au,e)}translateY(e){return this.translateOnAxis(wu,e)}translateZ(e){return this.translateOnAxis(Cu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?kr.copy(e):kr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(js,kr,this.up):Vn.lookAt(kr,js,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),as.setFromRotationMatrix(Vn),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(t0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(n0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,Q_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}wt.DEFAULT_UP=new L(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new L,Gn=new L,Fa=new L,kn=new L,ls=new L,cs=new L,Ru=new L,Oa=new L,Ba=new L,za=new L;let Wr=!1;class hn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),_n.subVectors(e,t),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){_n.subVectors(s,t),Gn.subVectors(i,t),Fa.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(Gn),l=_n.dot(Fa),c=Gn.dot(Gn),u=Gn.dot(Fa),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-o*u)*f,_=(a*u-o*l)*f;return r.set(1-p-_,_,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getUV(e,t,i,s,r,a,o,l){return Wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Wr=!0),this.getInterpolation(e,t,i,s,r,a,o,l)}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,kn.x),l.addScaledVector(a,kn.y),l.addScaledVector(o,kn.z),l)}static isFrontFacing(e,t,i,s){return _n.subVectors(i,t),Gn.subVectors(e,t),_n.cross(Gn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),_n.cross(Gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return Wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Wr=!0),hn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return hn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ls.subVectors(s,i),cs.subVectors(r,i),Oa.subVectors(e,i);const l=ls.dot(Oa),c=cs.dot(Oa);if(l<=0&&c<=0)return t.copy(i);Ba.subVectors(e,s);const u=ls.dot(Ba),h=cs.dot(Ba);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(ls,a);za.subVectors(e,r);const p=ls.dot(za),_=cs.dot(za);if(_>=0&&p<=_)return t.copy(r);const v=p*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(cs,o);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return Ru.subVectors(r,s),o=(h-u)/(h-u+(p-_)),t.copy(s).addScaledVector(Ru,o);const d=1/(m+v+f);return a=v*d,o=f*d,t.copy(i).addScaledVector(ls,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Xr={h:0,s:0,l:0};function Ha(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=st.workingColorSpace){if(e=Xl(e,1),t=zt(t,0,1),i=zt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ha(a,r,e+1/3),this.g=Ha(a,r,e),this.b=Ha(a,r,e-1/3)}return st.toWorkingColorSpace(this,s),this}setStyle(e,t=It){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=fd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}copyLinearToSRGB(e){return this.r=Ca(e.r),this.g=Ca(e.g),this.b=Ca(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return st.fromWorkingColorSpace(Ot.copy(this),e),Math.round(zt(Ot.r*255,0,255))*65536+Math.round(zt(Ot.g*255,0,255))*256+Math.round(zt(Ot.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(Ot.copy(this),t);const i=Ot.r,s=Ot.g,r=Ot.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=It){st.fromWorkingColorSpace(Ot.copy(this),e);const t=Ot.r,i=Ot.g,s=Ot.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(Xr);const i=dr(hi.h,Xr.h,t),s=dr(hi.s,Xr.s,t),r=dr(hi.l,Xr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new ze;ze.NAMES=fd;let i0=0;class Ti extends qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:i0++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Gi,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=pl,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Eo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(i.blending=this.blending),this.side!==bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==dl&&(i.blendSrc=this.blendSrc),this.blendDst!==pl&&(i.blendDst=this.blendDst),this.blendEquation!==Oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Eo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $i extends Ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Kf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new L,jr=new Te;class yt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=xl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=gi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)jr.fromBufferAttribute(this,t),jr.applyMatrix3(e),this.setXY(t,jr.x,jr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Nn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xl&&(e.usage=this.usage),e}}class dd extends yt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class pd extends yt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ut extends yt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let s0=0;const cn=new rt,Va=new wt,us=new L,tn=new Yi,qs=new Yi,Dt=new L;class ft extends qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ld(e)?pd:dd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $e().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,i){return cn.makeTranslation(e,t,i),this.applyMatrix4(cn),this}scale(e,t,i){return cn.makeScale(e,t,i),this.applyMatrix4(cn),this}lookAt(e){return Va.lookAt(e),Va.updateMatrix(),this.applyMatrix4(Va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];qs.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(tn.min,qs.min),tn.expandByPoint(Dt),Dt.addVectors(tn.max,qs.max),tn.expandByPoint(Dt)):(tn.expandByPoint(qs.min),tn.expandByPoint(qs.max))}tn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(us.fromBufferAttribute(e,c),Dt.add(us)),s=Math.max(s,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let A=0;A<o;A++)c[A]=new L,u[A]=new L;const h=new L,f=new L,p=new L,_=new Te,v=new Te,m=new Te,d=new L,b=new L;function y(A,X,ee){h.fromArray(s,A*3),f.fromArray(s,X*3),p.fromArray(s,ee*3),_.fromArray(a,A*2),v.fromArray(a,X*2),m.fromArray(a,ee*2),f.sub(h),p.sub(h),v.sub(_),m.sub(_);const pe=1/(v.x*m.y-m.x*v.y);isFinite(pe)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-v.y).multiplyScalar(pe),b.copy(p).multiplyScalar(v.x).addScaledVector(f,-m.x).multiplyScalar(pe),c[A].add(d),c[X].add(d),c[ee].add(d),u[A].add(b),u[X].add(b),u[ee].add(b))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let A=0,X=E.length;A<X;++A){const ee=E[A],pe=ee.start,N=ee.count;for(let G=pe,W=pe+N;G<W;G+=3)y(i[G+0],i[G+1],i[G+2])}const D=new L,P=new L,w=new L,H=new L;function S(A){w.fromArray(r,A*3),H.copy(w);const X=c[A];D.copy(X),D.sub(w.multiplyScalar(w.dot(X))).normalize(),P.crossVectors(H,X);const pe=P.dot(u[A])<0?-1:1;l[A*4]=D.x,l[A*4+1]=D.y,l[A*4+2]=D.z,l[A*4+3]=pe}for(let A=0,X=E.length;A<X;++A){const ee=E[A],pe=ee.start,N=ee.count;for(let G=pe,W=pe+N;G<W;G+=3)S(i[G+0]),S(i[G+1]),S(i[G+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new yt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let d=0;d<u;d++)f[_++]=c[p++]}return new yt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ft,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pu=new rt,Di=new wr,qr=new Ki,Lu=new L,hs=new L,fs=new L,ds=new L,Ga=new L,Yr=new L,Kr=new Te,$r=new Te,Zr=new Te,Du=new L,Uu=new L,Iu=new L,Jr=new L,Qr=new L;class _t extends wt{constructor(e=new ft,t=new $i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Yr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(Ga.fromBufferAttribute(h,e),a?Yr.addScaledVector(Ga,u):Yr.addScaledVector(Ga.sub(t),u))}t.add(Yr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qr.copy(i.boundingSphere),qr.applyMatrix4(r),Di.copy(e.ray).recast(e.near),!(qr.containsPoint(Di.origin)===!1&&(Di.intersectSphere(qr,Lu)===null||Di.origin.distanceToSquared(Lu)>(e.far-e.near)**2))&&(Pu.copy(r).invert(),Di.copy(e.ray).applyMatrix4(Pu),!(i.boundingBox!==null&&Di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Di)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=f.length;_<v;_++){const m=f[_],d=a[m.materialIndex],b=Math.max(m.start,p.start),y=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=b,D=y;E<D;E+=3){const P=o.getX(E),w=o.getX(E+1),H=o.getX(E+2);s=eo(this,d,e,i,c,u,h,P,w,H),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=_,d=v;m<d;m+=3){const b=o.getX(m),y=o.getX(m+1),E=o.getX(m+2);s=eo(this,a,e,i,c,u,h,b,y,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=f.length;_<v;_++){const m=f[_],d=a[m.materialIndex],b=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let E=b,D=y;E<D;E+=3){const P=E,w=E+1,H=E+2;s=eo(this,d,e,i,c,u,h,P,w,H),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=_,d=v;m<d;m+=3){const b=m,y=m+1,E=m+2;s=eo(this,a,e,i,c,u,h,b,y,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function r0(n,e,t,i,s,r,a,o){let l;if(e.side===Kt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===bi,o),l===null)return null;Qr.copy(o),Qr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Qr);return c<t.near||c>t.far?null:{distance:c,point:Qr.clone(),object:n}}function eo(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,hs),n.getVertexPosition(l,fs),n.getVertexPosition(c,ds);const u=r0(n,e,t,i,hs,fs,ds,Jr);if(u){s&&(Kr.fromBufferAttribute(s,o),$r.fromBufferAttribute(s,l),Zr.fromBufferAttribute(s,c),u.uv=hn.getInterpolation(Jr,hs,fs,ds,Kr,$r,Zr,new Te)),r&&(Kr.fromBufferAttribute(r,o),$r.fromBufferAttribute(r,l),Zr.fromBufferAttribute(r,c),u.uv1=hn.getInterpolation(Jr,hs,fs,ds,Kr,$r,Zr,new Te),u.uv2=u.uv1),a&&(Du.fromBufferAttribute(a,o),Uu.fromBufferAttribute(a,l),Iu.fromBufferAttribute(a,c),u.normal=hn.getInterpolation(Jr,hs,fs,ds,Du,Uu,Iu,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};hn.getNormal(hs,fs,ds,h.normal),u.face=h}return u}class Cr extends ft{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(u,3)),this.setAttribute("uv",new ut(h,2));function _(v,m,d,b,y,E,D,P,w,H,S){const A=E/w,X=D/H,ee=E/2,pe=D/2,N=P/2,G=w+1,W=H+1;let q=0,$=0;const ie=new L;for(let oe=0;oe<W;oe++){const fe=oe*X-pe;for(let he=0;he<G;he++){const J=he*A-ee;ie[v]=J*b,ie[m]=fe*y,ie[d]=N,c.push(ie.x,ie.y,ie.z),ie[v]=0,ie[m]=0,ie[d]=P>0?1:-1,u.push(ie.x,ie.y,ie.z),h.push(he/w),h.push(1-oe/H),q+=1}}for(let oe=0;oe<H;oe++)for(let fe=0;fe<w;fe++){const he=f+fe+G*oe,J=f+fe+G*(oe+1),ue=f+(fe+1)+G*(oe+1),Se=f+(fe+1)+G*oe;l.push(he,J,Se),l.push(J,ue,Se),$+=6}o.addGroup(p,$,S),p+=$,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Xt(n){const e={};for(let t=0;t<n.length;t++){const i=Bs(n[t]);for(const s in i)e[s]=i[s]}return e}function o0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function md(n){return n.getRenderTarget()===null?n.outputColorSpace:st.workingColorSpace}const Lo={clone:Bs,merge:Xt};var a0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,l0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vt extends Ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=a0,this.fragmentShader=l0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bs(e.uniforms),this.uniformsGroups=o0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class gd extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=$n}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class nn extends gd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yr*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ps=-90,ms=1;class c0 extends wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(ps,ms,e,t);s.layers=this.layers,this.add(s);const r=new nn(ps,ms,e,t);r.layers=this.layers,this.add(r);const a=new nn(ps,ms,e,t);a.layers=this.layers,this.add(a);const o=new nn(ps,ms,e,t);o.layers=this.layers,this.add(o);const l=new nn(ps,ms,e,t);l.layers=this.layers,this.add(l);const c=new nn(ps,ms,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===$n)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Co)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class _d extends Jt{constructor(e,t,i,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ns,super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class u0 extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(pr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Xi?It:fn),this.texture=new _d(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:un}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Cr(5,5,5),r=new vt({name:"CubemapFromEquirect",uniforms:Bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:Jn});r.uniforms.tEquirect.value=t;const a=new _t(s,r),o=t.minFilter;return t.minFilter===Mr&&(t.minFilter=un),new c0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const ka=new L,h0=new L,f0=new $e;class pi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ka.subVectors(i,t).cross(h0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ka),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||f0.getNormalMatrix(e),s=this.coplanarPoint(ka).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ui=new Ki,to=new L;class ql{constructor(e=new pi,t=new pi,i=new pi,s=new pi,r=new pi,a=new pi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=$n){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],p=s[8],_=s[9],v=s[10],m=s[11],d=s[12],b=s[13],y=s[14],E=s[15];if(i[0].setComponents(l-r,f-c,m-p,E-d).normalize(),i[1].setComponents(l+r,f+c,m+p,E+d).normalize(),i[2].setComponents(l+a,f+u,m+_,E+b).normalize(),i[3].setComponents(l-a,f-u,m-_,E-b).normalize(),i[4].setComponents(l-o,f-h,m-v,E-y).normalize(),t===$n)i[5].setComponents(l+o,f+h,m+v,E+y).normalize();else if(t===Co)i[5].setComponents(o,h,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){return Ui.center.set(0,0,0),Ui.radius=.7071067811865476,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(to.x=s.normal.x>0?e.max.x:e.min.x,to.y=s.normal.y>0?e.max.y:e.min.y,to.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function vd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function d0(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,u){const h=c.array,f=c.usage,p=h.byteLength,_=n.createBuffer();n.bindBuffer(u,_),n.bufferData(u,h,f),c.onUploadCallback();let v;if(h instanceof Float32Array)v=n.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)v=n.SHORT;else if(h instanceof Uint32Array)v=n.UNSIGNED_INT;else if(h instanceof Int32Array)v=n.INT;else if(h instanceof Int8Array)v=n.BYTE;else if(h instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,u,h){const f=u.array,p=u._updateRange,_=u.updateRanges;if(n.bindBuffer(h,c),p.count===-1&&_.length===0&&n.bufferSubData(h,0,f),_.length!==0){for(let v=0,m=_.length;v<m;v++){const d=_[v];t?n.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):n.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):n.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);if(h===void 0)i.set(c,s(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,u),h.version=c.version}}return{get:a,remove:o,update:l}}class Yl extends ft{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=e/o,f=t/l,p=[],_=[],v=[],m=[];for(let d=0;d<u;d++){const b=d*f-a;for(let y=0;y<c;y++){const E=y*h-r;_.push(E,-b,0),v.push(0,0,1),m.push(y/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<o;b++){const y=b+c*d,E=b+c*(d+1),D=b+1+c*(d+1),P=b+1+c*d;p.push(y,E,P),p.push(E,D,P)}this.setIndex(p),this.setAttribute("position",new ut(_,3)),this.setAttribute("normal",new ut(v,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yl(e.width,e.height,e.widthSegments,e.heightSegments)}}var p0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,m0=`#ifdef USE_ALPHAHASH
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
#endif`,g0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,v0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,x0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,M0=`#ifdef USE_AOMAP
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
#endif`,y0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,S0=`#ifdef USE_BATCHING
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
#endif`,b0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,E0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,T0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,A0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,w0=`#ifdef USE_IRIDESCENCE
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
#endif`,C0=`#ifdef USE_BUMPMAP
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
#endif`,R0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,U0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,I0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,N0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,F0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,O0=`#define PI 3.141592653589793
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
} // validated`,B0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,z0=`vec3 transformedNormal = objectNormal;
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
#endif`,H0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,G0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,k0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,W0="gl_FragColor = linearToOutputTexel( gl_FragColor );",X0=`
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
}`,j0=`#ifdef USE_ENVMAP
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
#endif`,q0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Y0=`#ifdef USE_ENVMAP
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
#endif`,K0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,J0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Q0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ev=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tv=`#ifdef USE_GRADIENTMAP
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
}`,nv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,iv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ov=`uniform bool receiveShadow;
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
#endif`,av=`#ifdef USE_ENVMAP
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
#endif`,lv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fv=`PhysicalMaterial material;
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
#endif`,dv=`struct PhysicalMaterial {
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
}`,pv=`
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
#endif`,mv=`#if defined( RE_IndirectDiffuse )
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
#endif`,gv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_v=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Mv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,yv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ev=`#if defined( USE_POINTS_UV )
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
#endif`,Tv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Av=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cv=`#ifdef USE_MORPHNORMALS
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
#endif`,Rv=`#ifdef USE_MORPHTARGETS
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
#endif`,Pv=`#ifdef USE_MORPHTARGETS
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
#endif`,Lv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Uv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Iv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fv=`#ifdef USE_NORMALMAP
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
#endif`,Ov=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$v=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jv=`float getShadowMask() {
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
}`,Qv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ex=`#ifdef USE_SKINNING
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
#endif`,tx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nx=`#ifdef USE_SKINNING
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
#endif`,ix=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ox=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ax=`#ifdef USE_TRANSMISSION
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
#endif`,lx=`#ifdef USE_TRANSMISSION
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
#endif`,cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,px=`uniform sampler2D t2D;
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
}`,mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`#include <common>
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
}`,Mx=`#if DEPTH_PACKING == 3200
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
}`,yx=`#define DISTANCE
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
}`,Sx=`#define DISTANCE
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
}`,bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ex=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`uniform float scale;
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
}`,Ax=`uniform vec3 diffuse;
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
}`,wx=`#include <common>
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
}`,Cx=`uniform vec3 diffuse;
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
}`,Rx=`#define LAMBERT
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
}`,Px=`#define LAMBERT
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
}`,Lx=`#define MATCAP
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
}`,Dx=`#define MATCAP
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
}`,Ux=`#define NORMAL
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
}`,Ix=`#define NORMAL
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
}`,Nx=`#define PHONG
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
}`,Fx=`#define PHONG
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
}`,Ox=`#define STANDARD
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
}`,Bx=`#define STANDARD
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
}`,zx=`#define TOON
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
}`,Hx=`#define TOON
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
}`,Vx=`uniform float size;
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
}`,Gx=`uniform vec3 diffuse;
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
}`,kx=`#include <common>
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
}`,Wx=`uniform vec3 color;
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
}`,Xx=`uniform float rotation;
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
}`,jx=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:p0,alphahash_pars_fragment:m0,alphamap_fragment:g0,alphamap_pars_fragment:_0,alphatest_fragment:v0,alphatest_pars_fragment:x0,aomap_fragment:M0,aomap_pars_fragment:y0,batching_pars_vertex:S0,batching_vertex:b0,begin_vertex:E0,beginnormal_vertex:T0,bsdfs:A0,iridescence_fragment:w0,bumpmap_pars_fragment:C0,clipping_planes_fragment:R0,clipping_planes_pars_fragment:P0,clipping_planes_pars_vertex:L0,clipping_planes_vertex:D0,color_fragment:U0,color_pars_fragment:I0,color_pars_vertex:N0,color_vertex:F0,common:O0,cube_uv_reflection_fragment:B0,defaultnormal_vertex:z0,displacementmap_pars_vertex:H0,displacementmap_vertex:V0,emissivemap_fragment:G0,emissivemap_pars_fragment:k0,colorspace_fragment:W0,colorspace_pars_fragment:X0,envmap_fragment:j0,envmap_common_pars_fragment:q0,envmap_pars_fragment:Y0,envmap_pars_vertex:K0,envmap_physical_pars_fragment:av,envmap_vertex:$0,fog_vertex:Z0,fog_pars_vertex:J0,fog_fragment:Q0,fog_pars_fragment:ev,gradientmap_pars_fragment:tv,lightmap_fragment:nv,lightmap_pars_fragment:iv,lights_lambert_fragment:sv,lights_lambert_pars_fragment:rv,lights_pars_begin:ov,lights_toon_fragment:lv,lights_toon_pars_fragment:cv,lights_phong_fragment:uv,lights_phong_pars_fragment:hv,lights_physical_fragment:fv,lights_physical_pars_fragment:dv,lights_fragment_begin:pv,lights_fragment_maps:mv,lights_fragment_end:gv,logdepthbuf_fragment:_v,logdepthbuf_pars_fragment:vv,logdepthbuf_pars_vertex:xv,logdepthbuf_vertex:Mv,map_fragment:yv,map_pars_fragment:Sv,map_particle_fragment:bv,map_particle_pars_fragment:Ev,metalnessmap_fragment:Tv,metalnessmap_pars_fragment:Av,morphcolor_vertex:wv,morphnormal_vertex:Cv,morphtarget_pars_vertex:Rv,morphtarget_vertex:Pv,normal_fragment_begin:Lv,normal_fragment_maps:Dv,normal_pars_fragment:Uv,normal_pars_vertex:Iv,normal_vertex:Nv,normalmap_pars_fragment:Fv,clearcoat_normal_fragment_begin:Ov,clearcoat_normal_fragment_maps:Bv,clearcoat_pars_fragment:zv,iridescence_pars_fragment:Hv,opaque_fragment:Vv,packing:Gv,premultiplied_alpha_fragment:kv,project_vertex:Wv,dithering_fragment:Xv,dithering_pars_fragment:jv,roughnessmap_fragment:qv,roughnessmap_pars_fragment:Yv,shadowmap_pars_fragment:Kv,shadowmap_pars_vertex:$v,shadowmap_vertex:Zv,shadowmask_pars_fragment:Jv,skinbase_vertex:Qv,skinning_pars_vertex:ex,skinning_vertex:tx,skinnormal_vertex:nx,specularmap_fragment:ix,specularmap_pars_fragment:sx,tonemapping_fragment:rx,tonemapping_pars_fragment:ox,transmission_fragment:ax,transmission_pars_fragment:lx,uv_pars_fragment:cx,uv_pars_vertex:ux,uv_vertex:hx,worldpos_vertex:fx,background_vert:dx,background_frag:px,backgroundCube_vert:mx,backgroundCube_frag:gx,cube_vert:_x,cube_frag:vx,depth_vert:xx,depth_frag:Mx,distanceRGBA_vert:yx,distanceRGBA_frag:Sx,equirect_vert:bx,equirect_frag:Ex,linedashed_vert:Tx,linedashed_frag:Ax,meshbasic_vert:wx,meshbasic_frag:Cx,meshlambert_vert:Rx,meshlambert_frag:Px,meshmatcap_vert:Lx,meshmatcap_frag:Dx,meshnormal_vert:Ux,meshnormal_frag:Ix,meshphong_vert:Nx,meshphong_frag:Fx,meshphysical_vert:Ox,meshphysical_frag:Bx,meshtoon_vert:zx,meshtoon_frag:Hx,points_vert:Vx,points_frag:Gx,shadow_vert:kx,shadow_frag:Wx,sprite_vert:Xx,sprite_frag:jx},ye={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Un={basic:{uniforms:Xt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Xt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new ze(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Xt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Xt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Xt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new ze(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Xt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Xt([ye.points,ye.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Xt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Xt([ye.common,ye.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Xt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Xt([ye.sprite,ye.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Xt([ye.common,ye.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Xt([ye.lights,ye.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Un.physical={uniforms:Xt([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const no={r:0,b:0,g:0};function qx(n,e,t,i,s,r,a){const o=new ze(0);let l=r===!0?0:1,c,u,h=null,f=0,p=null;function _(m,d){let b=!1,y=d.isScene===!0?d.background:null;y&&y.isTexture&&(y=(d.backgroundBlurriness>0?t:e).get(y)),y===null?v(o,l):y&&y.isColor&&(v(y,1),b=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||b)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Jo)?(u===void 0&&(u=new _t(new Cr(1,1,1),new vt({name:"BackgroundCubeMaterial",uniforms:Bs(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,P,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=st.getTransfer(y.colorSpace)!==ht,(h!==y||f!==y.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=y,f=y.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new _t(new Yl(2,2),new vt({name:"BackgroundMaterial",uniforms:Bs(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=st.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,d){m.getRGB(no,md(n)),i.buffers.color.setClear(no.r,no.g,no.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:_}}function Yx(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null);let c=l,u=!1;function h(N,G,W,q,$){let ie=!1;if(a){const oe=v(q,W,G);c!==oe&&(c=oe,p(c.object)),ie=d(N,q,W,$),ie&&b(N,q,W,$)}else{const oe=G.wireframe===!0;(c.geometry!==q.id||c.program!==W.id||c.wireframe!==oe)&&(c.geometry=q.id,c.program=W.id,c.wireframe=oe,ie=!0)}$!==null&&t.update($,n.ELEMENT_ARRAY_BUFFER),(ie||u)&&(u=!1,H(N,G,W,q),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(N){return i.isWebGL2?n.bindVertexArray(N):r.bindVertexArrayOES(N)}function _(N){return i.isWebGL2?n.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function v(N,G,W){const q=W.wireframe===!0;let $=o[N.id];$===void 0&&($={},o[N.id]=$);let ie=$[G.id];ie===void 0&&(ie={},$[G.id]=ie);let oe=ie[q];return oe===void 0&&(oe=m(f()),ie[q]=oe),oe}function m(N){const G=[],W=[],q=[];for(let $=0;$<s;$++)G[$]=0,W[$]=0,q[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:W,attributeDivisors:q,object:N,attributes:{},index:null}}function d(N,G,W,q){const $=c.attributes,ie=G.attributes;let oe=0;const fe=W.getAttributes();for(const he in fe)if(fe[he].location>=0){const ue=$[he];let Se=ie[he];if(Se===void 0&&(he==="instanceMatrix"&&N.instanceMatrix&&(Se=N.instanceMatrix),he==="instanceColor"&&N.instanceColor&&(Se=N.instanceColor)),ue===void 0||ue.attribute!==Se||Se&&ue.data!==Se.data)return!0;oe++}return c.attributesNum!==oe||c.index!==q}function b(N,G,W,q){const $={},ie=G.attributes;let oe=0;const fe=W.getAttributes();for(const he in fe)if(fe[he].location>=0){let ue=ie[he];ue===void 0&&(he==="instanceMatrix"&&N.instanceMatrix&&(ue=N.instanceMatrix),he==="instanceColor"&&N.instanceColor&&(ue=N.instanceColor));const Se={};Se.attribute=ue,ue&&ue.data&&(Se.data=ue.data),$[he]=Se,oe++}c.attributes=$,c.attributesNum=oe,c.index=q}function y(){const N=c.newAttributes;for(let G=0,W=N.length;G<W;G++)N[G]=0}function E(N){D(N,0)}function D(N,G){const W=c.newAttributes,q=c.enabledAttributes,$=c.attributeDivisors;W[N]=1,q[N]===0&&(n.enableVertexAttribArray(N),q[N]=1),$[N]!==G&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,G),$[N]=G)}function P(){const N=c.newAttributes,G=c.enabledAttributes;for(let W=0,q=G.length;W<q;W++)G[W]!==N[W]&&(n.disableVertexAttribArray(W),G[W]=0)}function w(N,G,W,q,$,ie,oe){oe===!0?n.vertexAttribIPointer(N,G,W,$,ie):n.vertexAttribPointer(N,G,W,q,$,ie)}function H(N,G,W,q){if(i.isWebGL2===!1&&(N.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const $=q.attributes,ie=W.getAttributes(),oe=G.defaultAttributeValues;for(const fe in ie){const he=ie[fe];if(he.location>=0){let J=$[fe];if(J===void 0&&(fe==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),fe==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),J!==void 0){const ue=J.normalized,Se=J.itemSize,we=t.get(J);if(we===void 0)continue;const Ce=we.buffer,Ue=we.type,Ne=we.bytesPerElement,Pe=i.isWebGL2===!0&&(Ue===n.INT||Ue===n.UNSIGNED_INT||J.gpuType===Jf);if(J.isInterleavedBufferAttribute){const qe=J.data,x=qe.stride,U=J.offset;if(qe.isInstancedInterleavedBuffer){for(let F=0;F<he.locationSize;F++)D(he.location+F,qe.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=qe.meshPerAttribute*qe.count)}else for(let F=0;F<he.locationSize;F++)E(he.location+F);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let F=0;F<he.locationSize;F++)w(he.location+F,Se/he.locationSize,Ue,ue,x*Ne,(U+Se/he.locationSize*F)*Ne,Pe)}else{if(J.isInstancedBufferAttribute){for(let qe=0;qe<he.locationSize;qe++)D(he.location+qe,J.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let qe=0;qe<he.locationSize;qe++)E(he.location+qe);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let qe=0;qe<he.locationSize;qe++)w(he.location+qe,Se/he.locationSize,Ue,ue,Se*Ne,Se/he.locationSize*qe*Ne,Pe)}}else if(oe!==void 0){const ue=oe[fe];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(he.location,ue);break;case 3:n.vertexAttrib3fv(he.location,ue);break;case 4:n.vertexAttrib4fv(he.location,ue);break;default:n.vertexAttrib1fv(he.location,ue)}}}}P()}function S(){ee();for(const N in o){const G=o[N];for(const W in G){const q=G[W];for(const $ in q)_(q[$].object),delete q[$];delete G[W]}delete o[N]}}function A(N){if(o[N.id]===void 0)return;const G=o[N.id];for(const W in G){const q=G[W];for(const $ in q)_(q[$].object),delete q[$];delete G[W]}delete o[N.id]}function X(N){for(const G in o){const W=o[G];if(W[N.id]===void 0)continue;const q=W[N.id];for(const $ in q)_(q[$].object),delete q[$];delete W[N.id]}}function ee(){pe(),u=!0,c!==l&&(c=l,p(c.object))}function pe(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:ee,resetDefaultState:pe,dispose:S,releaseStatesOfGeometry:A,releaseStatesOfProgram:X,initAttributes:y,enableAttribute:E,disableUnusedAttributes:P}}function Kx(n,e,t,i){const s=i.isWebGL2;let r;function a(u){r=u}function o(u,h){n.drawArrays(r,u,h),t.update(h,r,1)}function l(u,h,f){if(f===0)return;let p,_;if(s)p=n,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](r,u,h,f),t.update(h,r,f)}function c(u,h,f){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f;_++)this.render(u[_],h[_]);else{p.multiDrawArraysWEBGL(r,u,0,h,0,f);let _=0;for(let v=0;v<f;v++)_+=h[v];t.update(_,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function $x(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),v=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,E=a||e.has("OES_texture_float"),D=y&&E,P=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:b,vertexTextures:y,floatFragmentTextures:E,floatVertexTextures:D,maxSamples:P}}function Zx(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new pi,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const _=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{const b=r?0:i,y=b*4;let E=d.clippingState||null;l.value=E,E=u(_,f,y,p);for(let D=0;D!==y;++D)E[D]=t[D];d.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,_){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const d=p+v*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,E=p;y!==v;++y,E+=4)a.copy(h[y]).applyMatrix4(b,o),a.normal.toArray(m,E),m[E+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Jx(n){let e=new WeakMap;function t(a,o){return o===ml?a.mapping=Ns:o===gl&&(a.mapping=Fs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ml||o===gl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new u0(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class xd extends gd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const As=4,Nu=[.125,.215,.35,.446,.526,.582],Bi=20,Wa=new xd,Fu=new ze;let Xa=null,ja=0,qa=0;const Fi=(1+Math.sqrt(5))/2,gs=1/Fi,Ou=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Fi,gs),new L(0,Fi,-gs),new L(gs,0,Fi),new L(-gs,0,Fi),new L(Fi,gs,0),new L(-Fi,gs,0)];class Bu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Xa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Xa,ja,qa),e.scissorTest=!1,io(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ns||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:un,minFilter:un,generateMipmaps:!1,type:Qn,format:Mn,colorSpace:ri,depthBuffer:!1},s=zu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zu(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qx(r)),this._blurMaterial=eM(r,e,t)}return s}_compileMaterial(e){const t=new _t(this._lodPlanes[0],e);this._renderer.compile(t,Wa)}_sceneToCubeUV(e,t,i,s){const o=new nn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Fu),u.toneMapping=Mi,u.autoClear=!1;const p=new $i({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),_=new _t(new Cr,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Fu),v=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):b===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const y=this._cubeSize;io(s,b*y,d>2?y:0,y,y),u.setRenderTarget(s),v&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ns||e.mapping===Fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new _t(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;io(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Wa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ou[(s-1)%Ou.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new _t(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Bi-1),v=r/_,m=isFinite(r)?1+Math.floor(u*v):Bi;m>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);const d=[];let b=0;for(let w=0;w<Bi;++w){const H=w/v,S=Math.exp(-H*H/2);d.push(S),w===0?b+=S:w<m&&(b+=2*S)}for(let w=0;w<d.length;w++)d[w]=d[w]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:y}=this;f.dTheta.value=_,f.mipInt.value=y-i;const E=this._sizeLods[s],D=3*E*(s>y-As?s-y+As:0),P=4*(this._cubeSize-E);io(t,D,P,3*E,2*E),l.setRenderTarget(t),l.render(h,Wa)}}function Qx(n){const e=[],t=[],i=[];let s=n;const r=n-As+1+Nu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-As?l=Nu[a-n+As-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,v=3,m=2,d=1,b=new Float32Array(v*_*p),y=new Float32Array(m*_*p),E=new Float32Array(d*_*p);for(let P=0;P<p;P++){const w=P%3*2/3-1,H=P>2?0:-1,S=[w,H,0,w+2/3,H,0,w+2/3,H+1,0,w,H,0,w+2/3,H+1,0,w,H+1,0];b.set(S,v*_*P),y.set(f,m*_*P);const A=[P,P,P,P,P,P];E.set(A,d*_*P)}const D=new ft;D.setAttribute("position",new yt(b,v)),D.setAttribute("uv",new yt(y,m)),D.setAttribute("faceIndex",new yt(E,d)),e.push(D),s>As&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function zu(n,e,t){const i=new En(n,e,t);return i.texture.mapping=Jo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function io(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function eM(n,e,t){const i=new Float32Array(Bi),s=new L(0,1,0);return new vt({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Kl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Hu(){return new vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kl(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Vu(){return new vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Kl(){return`

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
	`}function tM(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ml||l===gl,u=l===Ns||l===Fs;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Bu(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new Bu(n));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function nM(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function iM(n,e,t,i){const s={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const v=f.morphAttributes[_];for(let m=0,d=v.length;m<d;m++)e.remove(v[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)e.update(f[_],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const v=p[_];for(let m=0,d=v.length;m<d;m++)e.update(v[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,_=h.attributes.position;let v=0;if(p!==null){const b=p.array;v=p.version;for(let y=0,E=b.length;y<E;y+=3){const D=b[y+0],P=b[y+1],w=b[y+2];f.push(D,P,P,w,w,D)}}else if(_!==void 0){const b=_.array;v=_.version;for(let y=0,E=b.length/3-1;y<E;y+=3){const D=y+0,P=y+1,w=y+2;f.push(D,P,P,w,w,D)}}else return;const m=new(ld(f)?pd:dd)(f,1);m.version=v;const d=r.get(h);d&&e.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function sM(n,e,t,i){const s=i.isWebGL2;let r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,_){n.drawElements(r,_,o,p*l),t.update(_,r,1)}function h(p,_,v){if(v===0)return;let m,d;if(s)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,_,o,p*l,v),t.update(_,r,v)}function f(p,_,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<v;d++)this.render(p[d]/l,_[d]);else{m.multiDrawElementsWEBGL(r,_,0,o,p,0,v);let d=0;for(let b=0;b<v;b++)d+=_[b];t.update(d,r,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function rM(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function oM(n,e){return n[0]-e[0]}function aM(n,e){return Math.abs(e[1])-Math.abs(n[1])}function lM(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new dt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=_!==void 0?_.length:0;let m=r.get(u);if(m===void 0||m.count!==v){let G=function(){pe.dispose(),r.delete(u),u.removeEventListener("dispose",G)};var p=G;m!==void 0&&m.texture.dispose();const y=u.morphAttributes.position!==void 0,E=u.morphAttributes.normal!==void 0,D=u.morphAttributes.color!==void 0,P=u.morphAttributes.position||[],w=u.morphAttributes.normal||[],H=u.morphAttributes.color||[];let S=0;y===!0&&(S=1),E===!0&&(S=2),D===!0&&(S=3);let A=u.attributes.position.count*S,X=1;A>e.maxTextureSize&&(X=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const ee=new Float32Array(A*X*4*v),pe=new hd(ee,A,X,v);pe.type=gi,pe.needsUpdate=!0;const N=S*4;for(let W=0;W<v;W++){const q=P[W],$=w[W],ie=H[W],oe=A*X*4*W;for(let fe=0;fe<q.count;fe++){const he=fe*N;y===!0&&(a.fromBufferAttribute(q,fe),ee[oe+he+0]=a.x,ee[oe+he+1]=a.y,ee[oe+he+2]=a.z,ee[oe+he+3]=0),E===!0&&(a.fromBufferAttribute($,fe),ee[oe+he+4]=a.x,ee[oe+he+5]=a.y,ee[oe+he+6]=a.z,ee[oe+he+7]=0),D===!0&&(a.fromBufferAttribute(ie,fe),ee[oe+he+8]=a.x,ee[oe+he+9]=a.y,ee[oe+he+10]=a.z,ee[oe+he+11]=ie.itemSize===4?a.w:1)}}m={count:v,texture:pe,size:new Te(A,X)},r.set(u,m),u.addEventListener("dispose",G)}let d=0;for(let y=0;y<f.length;y++)d+=f[y];const b=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(n,"morphTargetBaseInfluence",b),h.getUniforms().setValue(n,"morphTargetInfluences",f),h.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const _=f===void 0?0:f.length;let v=i[u.id];if(v===void 0||v.length!==_){v=[];for(let E=0;E<_;E++)v[E]=[E,0];i[u.id]=v}for(let E=0;E<_;E++){const D=v[E];D[0]=E,D[1]=f[E]}v.sort(aM);for(let E=0;E<8;E++)E<_&&v[E][1]?(o[E][0]=v[E][0],o[E][1]=v[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(oM);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let b=0;for(let E=0;E<8;E++){const D=o[E],P=D[0],w=D[1];P!==Number.MAX_SAFE_INTEGER&&w?(m&&u.getAttribute("morphTarget"+E)!==m[P]&&u.setAttribute("morphTarget"+E,m[P]),d&&u.getAttribute("morphNormal"+E)!==d[P]&&u.setAttribute("morphNormal"+E,d[P]),s[E]=w,b+=w):(m&&u.hasAttribute("morphTarget"+E)===!0&&u.deleteAttribute("morphTarget"+E),d&&u.hasAttribute("morphNormal"+E)===!0&&u.deleteAttribute("morphNormal"+E),s[E]=0)}const y=u.morphTargetsRelative?1:1-b;h.getUniforms().setValue(n,"morphTargetBaseInfluence",y),h.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function cM(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Md extends Jt{constructor(e,t,i,s,r,a,o,l,c,u){if(u=u!==void 0?u:Wi,u!==Wi&&u!==Os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Wi&&(i=mi),i===void 0&&u===Os&&(i=ki),super(null,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:jt,this.minFilter=l!==void 0?l:jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const yd=new Jt,Sd=new Md(1,1);Sd.compareFunction=ad;const bd=new hd,Ed=new Y_,Td=new _d,Gu=[],ku=[],Wu=new Float32Array(16),Xu=new Float32Array(9),ju=new Float32Array(4);function Hs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Gu[s];if(r===void 0&&(r=new Float32Array(s),Gu[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ct(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ta(n,e){let t=ku[e];t===void 0&&(t=new Int32Array(e),ku[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function uM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function hM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function fM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function dM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function pM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;ju.set(i),n.uniformMatrix2fv(this.addr,!1,ju),Rt(t,i)}}function mM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;Xu.set(i),n.uniformMatrix3fv(this.addr,!1,Xu),Rt(t,i)}}function gM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;Wu.set(i),n.uniformMatrix4fv(this.addr,!1,Wu),Rt(t,i)}}function _M(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function vM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function xM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function MM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function yM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function SM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function bM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function EM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function TM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Sd:yd;t.setTexture2D(e||r,s)}function AM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ed,s)}function wM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Td,s)}function CM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||bd,s)}function RM(n){switch(n){case 5126:return uM;case 35664:return hM;case 35665:return fM;case 35666:return dM;case 35674:return pM;case 35675:return mM;case 35676:return gM;case 5124:case 35670:return _M;case 35667:case 35671:return vM;case 35668:case 35672:return xM;case 35669:case 35673:return MM;case 5125:return yM;case 36294:return SM;case 36295:return bM;case 36296:return EM;case 35678:case 36198:case 36298:case 36306:case 35682:return TM;case 35679:case 36299:case 36307:return AM;case 35680:case 36300:case 36308:case 36293:return wM;case 36289:case 36303:case 36311:case 36292:return CM}}function PM(n,e){n.uniform1fv(this.addr,e)}function LM(n,e){const t=Hs(e,this.size,2);n.uniform2fv(this.addr,t)}function DM(n,e){const t=Hs(e,this.size,3);n.uniform3fv(this.addr,t)}function UM(n,e){const t=Hs(e,this.size,4);n.uniform4fv(this.addr,t)}function IM(n,e){const t=Hs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function NM(n,e){const t=Hs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function FM(n,e){const t=Hs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function OM(n,e){n.uniform1iv(this.addr,e)}function BM(n,e){n.uniform2iv(this.addr,e)}function zM(n,e){n.uniform3iv(this.addr,e)}function HM(n,e){n.uniform4iv(this.addr,e)}function VM(n,e){n.uniform1uiv(this.addr,e)}function GM(n,e){n.uniform2uiv(this.addr,e)}function kM(n,e){n.uniform3uiv(this.addr,e)}function WM(n,e){n.uniform4uiv(this.addr,e)}function XM(n,e,t){const i=this.cache,s=e.length,r=ta(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||yd,r[a])}function jM(n,e,t){const i=this.cache,s=e.length,r=ta(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ed,r[a])}function qM(n,e,t){const i=this.cache,s=e.length,r=ta(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Td,r[a])}function YM(n,e,t){const i=this.cache,s=e.length,r=ta(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||bd,r[a])}function KM(n){switch(n){case 5126:return PM;case 35664:return LM;case 35665:return DM;case 35666:return UM;case 35674:return IM;case 35675:return NM;case 35676:return FM;case 5124:case 35670:return OM;case 35667:case 35671:return BM;case 35668:case 35672:return zM;case 35669:case 35673:return HM;case 5125:return VM;case 36294:return GM;case 36295:return kM;case 36296:return WM;case 35678:case 36198:case 36298:case 36306:case 35682:return XM;case 35679:case 36299:case 36307:return jM;case 35680:case 36300:case 36308:case 36293:return qM;case 36289:case 36303:case 36311:case 36292:return YM}}class $M{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=RM(t.type)}}class ZM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=KM(t.type)}}class JM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Ya=/(\w+)(\])?(\[|\.)?/g;function qu(n,e){n.seq.push(e),n.map[e.id]=e}function QM(n,e,t){const i=n.name,s=i.length;for(Ya.lastIndex=0;;){const r=Ya.exec(i),a=Ya.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){qu(t,c===void 0?new $M(o,n,e):new ZM(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new JM(o),qu(t,h)),t=h}}}class mo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);QM(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Yu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ey=37297;let ty=0;function ny(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function iy(n){const e=st.getPrimaries(st.workingColorSpace),t=st.getPrimaries(n);let i;switch(e===t?i="":e===wo&&t===Ao?i="LinearDisplayP3ToLinearSRGB":e===Ao&&t===wo&&(i="LinearSRGBToLinearDisplayP3"),n){case ri:case Qo:return[i,"LinearTransferOETF"];case It:case Wl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ku(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+ny(n.getShaderSource(e),a)}else return s}function sy(n,e){const t=iy(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ry(n,e){let t;switch(e){case r_:t="Linear";break;case o_:t="Reinhard";break;case a_:t="OptimizedCineon";break;case $f:t="ACESFilmic";break;case c_:t="AgX";break;case l_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function oy(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ws).join(`
`)}function ay(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ws).join(`
`)}function ly(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function cy(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ws(n){return n!==""}function $u(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sl(n){return n.replace(uy,fy)}const hy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function fy(n,e){let t=We[e];if(t===void 0){const i=hy.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Sl(t)}const dy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ju(n){return n.replace(dy,py)}function py(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qu(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function my(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Yf?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ug?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Wn&&(e="SHADOWMAP_TYPE_VSM"),e}function gy(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ns:case Fs:e="ENVMAP_TYPE_CUBE";break;case Jo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _y(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Fs:e="ENVMAP_MODE_REFRACTION";break}return e}function vy(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Kf:e="ENVMAP_BLENDING_MULTIPLY";break;case i_:e="ENVMAP_BLENDING_MIX";break;case s_:e="ENVMAP_BLENDING_ADD";break}return e}function xy(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function My(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=my(t),c=gy(t),u=_y(t),h=vy(t),f=xy(t),p=t.isWebGL2?"":oy(t),_=ay(t),v=ly(r),m=s.createProgram();let d,b,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ws).join(`
`),d.length>0&&(d+=`
`),b=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ws).join(`
`),b.length>0&&(b+=`
`)):(d=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),b=[p,Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mi?"#define TONE_MAPPING":"",t.toneMapping!==Mi?We.tonemapping_pars_fragment:"",t.toneMapping!==Mi?ry("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,sy("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ws).join(`
`)),a=Sl(a),a=$u(a,t),a=Zu(a,t),o=Sl(o),o=$u(o,t),o=Zu(o,t),a=Ju(a),o=Ju(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===_u?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_u?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const E=y+d+a,D=y+b+o,P=Yu(s,s.VERTEX_SHADER,E),w=Yu(s,s.FRAGMENT_SHADER,D);s.attachShader(m,P),s.attachShader(m,w),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function H(ee){if(n.debug.checkShaderErrors){const pe=s.getProgramInfoLog(m).trim(),N=s.getShaderInfoLog(P).trim(),G=s.getShaderInfoLog(w).trim();let W=!0,q=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,P,w);else{const $=Ku(s,P,"vertex"),ie=Ku(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+pe+`
`+$+`
`+ie)}else pe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pe):(N===""||G==="")&&(q=!1);q&&(ee.diagnostics={runnable:W,programLog:pe,vertexShader:{log:N,prefix:d},fragmentShader:{log:G,prefix:b}})}s.deleteShader(P),s.deleteShader(w),S=new mo(s,m),A=cy(s,m)}let S;this.getUniforms=function(){return S===void 0&&H(this),S};let A;this.getAttributes=function(){return A===void 0&&H(this),A};let X=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=s.getProgramParameter(m,ey)),X},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ty++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=P,this.fragmentShader=w,this}let yy=0;class Sy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new by(e),t.set(e,i)),i}}class by{constructor(e){this.id=yy++,this.code=e,this.usedTimes=0}}function Ey(n,e,t,i,s,r,a){const o=new jl,l=new Sy,c=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return S===0?"uv":`uv${S}`}function m(S,A,X,ee,pe){const N=ee.fog,G=pe.geometry,W=S.isMeshStandardMaterial?ee.environment:null,q=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),$=q&&q.mapping===Jo?q.image.height:null,ie=_[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const oe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,fe=oe!==void 0?oe.length:0;let he=0;G.morphAttributes.position!==void 0&&(he=1),G.morphAttributes.normal!==void 0&&(he=2),G.morphAttributes.color!==void 0&&(he=3);let J,ue,Se,we;if(ie){const Vt=Un[ie];J=Vt.vertexShader,ue=Vt.fragmentShader}else J=S.vertexShader,ue=S.fragmentShader,l.update(S),Se=l.getVertexShaderID(S),we=l.getFragmentShaderID(S);const Ce=n.getRenderTarget(),Ue=pe.isInstancedMesh===!0,Ne=pe.isBatchedMesh===!0,Pe=!!S.map,qe=!!S.matcap,x=!!q,U=!!S.aoMap,F=!!S.lightMap,j=!!S.bumpMap,B=!!S.normalMap,Q=!!S.displacementMap,te=!!S.emissiveMap,M=!!S.metalnessMap,g=!!S.roughnessMap,C=S.anisotropy>0,k=S.clearcoat>0,O=S.iridescence>0,V=S.sheen>0,ae=S.transmission>0,re=C&&!!S.anisotropyMap,de=k&&!!S.clearcoatMap,Me=k&&!!S.clearcoatNormalMap,Ae=k&&!!S.clearcoatRoughnessMap,ne=O&&!!S.iridescenceMap,se=O&&!!S.iridescenceThicknessMap,R=V&&!!S.sheenColorMap,le=V&&!!S.sheenRoughnessMap,ge=!!S.specularMap,ce=!!S.specularColorMap,be=!!S.specularIntensityMap,Ve=ae&&!!S.transmissionMap,Ye=ae&&!!S.thicknessMap,Xe=!!S.gradientMap,xe=!!S.alphaMap,I=S.alphaTest>0,_e=!!S.alphaHash,ve=!!S.extensions,Ie=!!G.attributes.uv1,Le=!!G.attributes.uv2,Je=!!G.attributes.uv3;let et=Mi;return S.toneMapped&&(Ce===null||Ce.isXRRenderTarget===!0)&&(et=n.toneMapping),{isWebGL2:u,shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:J,fragmentShader:ue,defines:S.defines,customVertexShaderID:Se,customFragmentShaderID:we,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Ne,instancing:Ue,instancingColor:Ue&&pe.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:Ce===null?n.outputColorSpace:Ce.isXRRenderTarget===!0?Ce.texture.colorSpace:ri,map:Pe,matcap:qe,envMap:x,envMapMode:x&&q.mapping,envMapCubeUVHeight:$,aoMap:U,lightMap:F,bumpMap:j,normalMap:B,displacementMap:f&&Q,emissiveMap:te,normalMapObjectSpace:B&&S.normalMapType===y_,normalMapTangentSpace:B&&S.normalMapType===od,metalnessMap:M,roughnessMap:g,anisotropy:C,anisotropyMap:re,clearcoat:k,clearcoatMap:de,clearcoatNormalMap:Me,clearcoatRoughnessMap:Ae,iridescence:O,iridescenceMap:ne,iridescenceThicknessMap:se,sheen:V,sheenColorMap:R,sheenRoughnessMap:le,specularMap:ge,specularColorMap:ce,specularIntensityMap:be,transmission:ae,transmissionMap:Ve,thicknessMap:Ye,gradientMap:Xe,opaque:S.transparent===!1&&S.blending===Gi,alphaMap:xe,alphaTest:I,alphaHash:_e,combine:S.combine,mapUv:Pe&&v(S.map.channel),aoMapUv:U&&v(S.aoMap.channel),lightMapUv:F&&v(S.lightMap.channel),bumpMapUv:j&&v(S.bumpMap.channel),normalMapUv:B&&v(S.normalMap.channel),displacementMapUv:Q&&v(S.displacementMap.channel),emissiveMapUv:te&&v(S.emissiveMap.channel),metalnessMapUv:M&&v(S.metalnessMap.channel),roughnessMapUv:g&&v(S.roughnessMap.channel),anisotropyMapUv:re&&v(S.anisotropyMap.channel),clearcoatMapUv:de&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Me&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:se&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:R&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:le&&v(S.sheenRoughnessMap.channel),specularMapUv:ge&&v(S.specularMap.channel),specularColorMapUv:ce&&v(S.specularColorMap.channel),specularIntensityMapUv:be&&v(S.specularIntensityMap.channel),transmissionMapUv:Ve&&v(S.transmissionMap.channel),thicknessMapUv:Ye&&v(S.thicknessMap.channel),alphaMapUv:xe&&v(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(B||C),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,vertexUv1s:Ie,vertexUv2s:Le,vertexUv3s:Je,pointsUvs:pe.isPoints===!0&&!!G.attributes.uv&&(Pe||xe),fog:!!N,useFog:S.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:pe.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:he,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&X.length>0,shadowMapType:n.shadowMap.type,toneMapping:et,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Pe&&S.map.isVideoTexture===!0&&st.getTransfer(S.map.colorSpace)===ht,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===sn,flipSided:S.side===Kt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ve&&S.extensions.derivatives===!0,extensionFragDepth:ve&&S.extensions.fragDepth===!0,extensionDrawBuffers:ve&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ve&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function d(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const X in S.defines)A.push(X),A.push(S.defines[X]);return S.isRawShaderMaterial===!1&&(b(A,S),y(A,S),A.push(n.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function b(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function y(S,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),S.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function E(S){const A=_[S.type];let X;if(A){const ee=Un[A];X=Lo.clone(ee.uniforms)}else X=S.uniforms;return X}function D(S,A){let X;for(let ee=0,pe=c.length;ee<pe;ee++){const N=c[ee];if(N.cacheKey===A){X=N,++X.usedTimes;break}}return X===void 0&&(X=new My(n,A,S,r),c.push(X)),X}function P(S){if(--S.usedTimes===0){const A=c.indexOf(S);c[A]=c[c.length-1],c.pop(),S.destroy()}}function w(S){l.remove(S)}function H(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:E,acquireProgram:D,releaseProgram:P,releaseShaderCache:w,programs:c,dispose:H}}function Ty(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function Ay(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function eh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function th(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h,f,p,_,v,m){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:_,renderOrder:h.renderOrder,z:v,group:m},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=_,d.renderOrder=h.renderOrder,d.z=v,d.group=m),e++,d}function o(h,f,p,_,v,m){const d=a(h,f,p,_,v,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):t.push(d)}function l(h,f,p,_,v,m){const d=a(h,f,p,_,v,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||Ay),i.length>1&&i.sort(f||eh),s.length>1&&s.sort(f||eh)}function u(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function wy(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new th,n.set(i,[a])):s>=r.length?(a=new th,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Cy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ze};break;case"SpotLight":t={position:new L,direction:new L,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function Ry(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Py=0;function Ly(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Dy(n,e){const t=new Cy,i=Ry(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new L);const r=new L,a=new rt,o=new rt;function l(u,h){let f=0,p=0,_=0;for(let ee=0;ee<9;ee++)s.probe[ee].set(0,0,0);let v=0,m=0,d=0,b=0,y=0,E=0,D=0,P=0,w=0,H=0,S=0;u.sort(Ly);const A=h===!0?Math.PI:1;for(let ee=0,pe=u.length;ee<pe;ee++){const N=u[ee],G=N.color,W=N.intensity,q=N.distance,$=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=G.r*W*A,p+=G.g*W*A,_+=G.b*W*A;else if(N.isLightProbe){for(let ie=0;ie<9;ie++)s.probe[ie].addScaledVector(N.sh.coefficients[ie],W);S++}else if(N.isDirectionalLight){const ie=t.get(N);if(ie.color.copy(N.color).multiplyScalar(N.intensity*A),N.castShadow){const oe=N.shadow,fe=i.get(N);fe.shadowBias=oe.bias,fe.shadowNormalBias=oe.normalBias,fe.shadowRadius=oe.radius,fe.shadowMapSize=oe.mapSize,s.directionalShadow[v]=fe,s.directionalShadowMap[v]=$,s.directionalShadowMatrix[v]=N.shadow.matrix,E++}s.directional[v]=ie,v++}else if(N.isSpotLight){const ie=t.get(N);ie.position.setFromMatrixPosition(N.matrixWorld),ie.color.copy(G).multiplyScalar(W*A),ie.distance=q,ie.coneCos=Math.cos(N.angle),ie.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),ie.decay=N.decay,s.spot[d]=ie;const oe=N.shadow;if(N.map&&(s.spotLightMap[w]=N.map,w++,oe.updateMatrices(N),N.castShadow&&H++),s.spotLightMatrix[d]=oe.matrix,N.castShadow){const fe=i.get(N);fe.shadowBias=oe.bias,fe.shadowNormalBias=oe.normalBias,fe.shadowRadius=oe.radius,fe.shadowMapSize=oe.mapSize,s.spotShadow[d]=fe,s.spotShadowMap[d]=$,P++}d++}else if(N.isRectAreaLight){const ie=t.get(N);ie.color.copy(G).multiplyScalar(W),ie.halfWidth.set(N.width*.5,0,0),ie.halfHeight.set(0,N.height*.5,0),s.rectArea[b]=ie,b++}else if(N.isPointLight){const ie=t.get(N);if(ie.color.copy(N.color).multiplyScalar(N.intensity*A),ie.distance=N.distance,ie.decay=N.decay,N.castShadow){const oe=N.shadow,fe=i.get(N);fe.shadowBias=oe.bias,fe.shadowNormalBias=oe.normalBias,fe.shadowRadius=oe.radius,fe.shadowMapSize=oe.mapSize,fe.shadowCameraNear=oe.camera.near,fe.shadowCameraFar=oe.camera.far,s.pointShadow[m]=fe,s.pointShadowMap[m]=$,s.pointShadowMatrix[m]=N.shadow.matrix,D++}s.point[m]=ie,m++}else if(N.isHemisphereLight){const ie=t.get(N);ie.skyColor.copy(N.color).multiplyScalar(W*A),ie.groundColor.copy(N.groundColor).multiplyScalar(W*A),s.hemi[y]=ie,y++}}b>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ye.LTC_FLOAT_1,s.rectAreaLTC2=ye.LTC_FLOAT_2):(s.rectAreaLTC1=ye.LTC_HALF_1,s.rectAreaLTC2=ye.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ye.LTC_FLOAT_1,s.rectAreaLTC2=ye.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ye.LTC_HALF_1,s.rectAreaLTC2=ye.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=p,s.ambient[2]=_;const X=s.hash;(X.directionalLength!==v||X.pointLength!==m||X.spotLength!==d||X.rectAreaLength!==b||X.hemiLength!==y||X.numDirectionalShadows!==E||X.numPointShadows!==D||X.numSpotShadows!==P||X.numSpotMaps!==w||X.numLightProbes!==S)&&(s.directional.length=v,s.spot.length=d,s.rectArea.length=b,s.point.length=m,s.hemi.length=y,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=D,s.pointShadowMap.length=D,s.spotShadow.length=P,s.spotShadowMap.length=P,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=D,s.spotLightMatrix.length=P+w-H,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=S,X.directionalLength=v,X.pointLength=m,X.spotLength=d,X.rectAreaLength=b,X.hemiLength=y,X.numDirectionalShadows=E,X.numPointShadows=D,X.numSpotShadows=P,X.numSpotMaps=w,X.numLightProbes=S,s.version=Py++)}function c(u,h){let f=0,p=0,_=0,v=0,m=0;const d=h.matrixWorldInverse;for(let b=0,y=u.length;b<y;b++){const E=u[b];if(E.isDirectionalLight){const D=s.directional[f];D.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(d),f++}else if(E.isSpotLight){const D=s.spot[_];D.position.setFromMatrixPosition(E.matrixWorld),D.position.applyMatrix4(d),D.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),D.direction.sub(r),D.direction.transformDirection(d),_++}else if(E.isRectAreaLight){const D=s.rectArea[v];D.position.setFromMatrixPosition(E.matrixWorld),D.position.applyMatrix4(d),o.identity(),a.copy(E.matrixWorld),a.premultiply(d),o.extractRotation(a),D.halfWidth.set(E.width*.5,0,0),D.halfHeight.set(0,E.height*.5,0),D.halfWidth.applyMatrix4(o),D.halfHeight.applyMatrix4(o),v++}else if(E.isPointLight){const D=s.point[p];D.position.setFromMatrixPosition(E.matrixWorld),D.position.applyMatrix4(d),p++}else if(E.isHemisphereLight){const D=s.hemi[m];D.direction.setFromMatrixPosition(E.matrixWorld),D.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:s}}function nh(n,e){const t=new Dy(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(h){i.push(h)}function o(h){s.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Uy(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new nh(n,e),t.set(r,[l])):a>=o.length?(l=new nh(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class Iy extends Ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=x_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ny extends Ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Fy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Oy=`uniform sampler2D shadow_pass;
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
}`;function By(n,e,t){let i=new ql;const s=new Te,r=new Te,a=new dt,o=new Iy({depthPacking:M_}),l=new Ny,c={},u=t.maxTextureSize,h={[bi]:Kt,[Kt]:bi,[sn]:sn},f=new vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:Fy,fragmentShader:Oy}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new ft;_.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new _t(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yf;let d=this.type;this.render=function(P,w,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const S=n.getRenderTarget(),A=n.getActiveCubeFace(),X=n.getActiveMipmapLevel(),ee=n.state;ee.setBlending(Jn),ee.buffers.color.setClear(1,1,1,1),ee.buffers.depth.setTest(!0),ee.setScissorTest(!1);const pe=d!==Wn&&this.type===Wn,N=d===Wn&&this.type!==Wn;for(let G=0,W=P.length;G<W;G++){const q=P[G],$=q.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ie=$.getFrameExtents();if(s.multiply(ie),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,$.mapSize.y=r.y)),$.map===null||pe===!0||N===!0){const fe=this.type!==Wn?{minFilter:jt,magFilter:jt}:{};$.map!==null&&$.map.dispose(),$.map=new En(s.x,s.y,fe),$.map.texture.name=q.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();const oe=$.getViewportCount();for(let fe=0;fe<oe;fe++){const he=$.getViewport(fe);a.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),ee.viewport(a),$.updateMatrices(q,fe),i=$.getFrustum(),E(w,H,$.camera,q,this.type)}$.isPointLightShadow!==!0&&this.type===Wn&&b($,H),$.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(S,A,X)};function b(P,w){const H=e.update(v);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new En(s.x,s.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(w,null,H,f,v,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(w,null,H,p,v,null)}function y(P,w,H,S){let A=null;const X=H.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(X!==void 0)A=X;else if(A=H.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const ee=A.uuid,pe=w.uuid;let N=c[ee];N===void 0&&(N={},c[ee]=N);let G=N[pe];G===void 0&&(G=A.clone(),N[pe]=G,w.addEventListener("dispose",D)),A=G}if(A.visible=w.visible,A.wireframe=w.wireframe,S===Wn?A.side=w.shadowSide!==null?w.shadowSide:w.side:A.side=w.shadowSide!==null?w.shadowSide:h[w.side],A.alphaMap=w.alphaMap,A.alphaTest=w.alphaTest,A.map=w.map,A.clipShadows=w.clipShadows,A.clippingPlanes=w.clippingPlanes,A.clipIntersection=w.clipIntersection,A.displacementMap=w.displacementMap,A.displacementScale=w.displacementScale,A.displacementBias=w.displacementBias,A.wireframeLinewidth=w.wireframeLinewidth,A.linewidth=w.linewidth,H.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const ee=n.properties.get(A);ee.light=H}return A}function E(P,w,H,S,A){if(P.visible===!1)return;if(P.layers.test(w.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&A===Wn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,P.matrixWorld);const pe=e.update(P),N=P.material;if(Array.isArray(N)){const G=pe.groups;for(let W=0,q=G.length;W<q;W++){const $=G[W],ie=N[$.materialIndex];if(ie&&ie.visible){const oe=y(P,ie,S,A);P.onBeforeShadow(n,P,w,H,pe,oe,$),n.renderBufferDirect(H,null,pe,oe,P,$),P.onAfterShadow(n,P,w,H,pe,oe,$)}}}else if(N.visible){const G=y(P,N,S,A);P.onBeforeShadow(n,P,w,H,pe,G,null),n.renderBufferDirect(H,null,pe,G,P,null),P.onAfterShadow(n,P,w,H,pe,G,null)}}const ee=P.children;for(let pe=0,N=ee.length;pe<N;pe++)E(ee[pe],w,H,S,A)}function D(P){P.target.removeEventListener("dispose",D);for(const H in c){const S=c[H],A=P.target.uuid;A in S&&(S[A].dispose(),delete S[A])}}}function zy(n,e,t){const i=t.isWebGL2;function s(){let I=!1;const _e=new dt;let ve=null;const Ie=new dt(0,0,0,0);return{setMask:function(Le){ve!==Le&&!I&&(n.colorMask(Le,Le,Le,Le),ve=Le)},setLocked:function(Le){I=Le},setClear:function(Le,Je,et,Pt,Vt){Vt===!0&&(Le*=Pt,Je*=Pt,et*=Pt),_e.set(Le,Je,et,Pt),Ie.equals(_e)===!1&&(n.clearColor(Le,Je,et,Pt),Ie.copy(_e))},reset:function(){I=!1,ve=null,Ie.set(-1,0,0,0)}}}function r(){let I=!1,_e=null,ve=null,Ie=null;return{setTest:function(Le){Le?Ne(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(Le){_e!==Le&&!I&&(n.depthMask(Le),_e=Le)},setFunc:function(Le){if(ve!==Le){switch(Le){case $g:n.depthFunc(n.NEVER);break;case Zg:n.depthFunc(n.ALWAYS);break;case Jg:n.depthFunc(n.LESS);break;case Eo:n.depthFunc(n.LEQUAL);break;case Qg:n.depthFunc(n.EQUAL);break;case e_:n.depthFunc(n.GEQUAL);break;case t_:n.depthFunc(n.GREATER);break;case n_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=Le}},setLocked:function(Le){I=Le},setClear:function(Le){Ie!==Le&&(n.clearDepth(Le),Ie=Le)},reset:function(){I=!1,_e=null,ve=null,Ie=null}}}function a(){let I=!1,_e=null,ve=null,Ie=null,Le=null,Je=null,et=null,Pt=null,Vt=null;return{setTest:function(lt){I||(lt?Ne(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(lt){_e!==lt&&!I&&(n.stencilMask(lt),_e=lt)},setFunc:function(lt,Gt,wn){(ve!==lt||Ie!==Gt||Le!==wn)&&(n.stencilFunc(lt,Gt,wn),ve=lt,Ie=Gt,Le=wn)},setOp:function(lt,Gt,wn){(Je!==lt||et!==Gt||Pt!==wn)&&(n.stencilOp(lt,Gt,wn),Je=lt,et=Gt,Pt=wn)},setLocked:function(lt){I=lt},setClear:function(lt){Vt!==lt&&(n.clearStencil(lt),Vt=lt)},reset:function(){I=!1,_e=null,ve=null,Ie=null,Le=null,Je=null,et=null,Pt=null,Vt=null}}}const o=new s,l=new r,c=new a,u=new WeakMap,h=new WeakMap;let f={},p={},_=new WeakMap,v=[],m=null,d=!1,b=null,y=null,E=null,D=null,P=null,w=null,H=null,S=new ze(0,0,0),A=0,X=!1,ee=null,pe=null,N=null,G=null,W=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ie=0;const oe=n.getParameter(n.VERSION);oe.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(oe)[1]),$=ie>=1):oe.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),$=ie>=2);let fe=null,he={};const J=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Se=new dt().fromArray(J),we=new dt().fromArray(ue);function Ce(I,_e,ve,Ie){const Le=new Uint8Array(4),Je=n.createTexture();n.bindTexture(I,Je),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let et=0;et<ve;et++)i&&(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)?n.texImage3D(_e,0,n.RGBA,1,1,Ie,0,n.RGBA,n.UNSIGNED_BYTE,Le):n.texImage2D(_e+et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Le);return Je}const Ue={};Ue[n.TEXTURE_2D]=Ce(n.TEXTURE_2D,n.TEXTURE_2D,1),Ue[n.TEXTURE_CUBE_MAP]=Ce(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ue[n.TEXTURE_2D_ARRAY]=Ce(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ue[n.TEXTURE_3D]=Ce(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ne(n.DEPTH_TEST),l.setFunc(Eo),te(!1),M(zc),Ne(n.CULL_FACE),B(Jn);function Ne(I){f[I]!==!0&&(n.enable(I),f[I]=!0)}function Pe(I){f[I]!==!1&&(n.disable(I),f[I]=!1)}function qe(I,_e){return p[I]!==_e?(n.bindFramebuffer(I,_e),p[I]=_e,i&&(I===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=_e),I===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=_e)),!0):!1}function x(I,_e){let ve=v,Ie=!1;if(I)if(ve=_.get(_e),ve===void 0&&(ve=[],_.set(_e,ve)),I.isWebGLMultipleRenderTargets){const Le=I.texture;if(ve.length!==Le.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let Je=0,et=Le.length;Je<et;Je++)ve[Je]=n.COLOR_ATTACHMENT0+Je;ve.length=Le.length,Ie=!0}}else ve[0]!==n.COLOR_ATTACHMENT0&&(ve[0]=n.COLOR_ATTACHMENT0,Ie=!0);else ve[0]!==n.BACK&&(ve[0]=n.BACK,Ie=!0);Ie&&(t.isWebGL2?n.drawBuffers(ve):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ve))}function U(I){return m!==I?(n.useProgram(I),m=I,!0):!1}const F={[Oi]:n.FUNC_ADD,[Ng]:n.FUNC_SUBTRACT,[Fg]:n.FUNC_REVERSE_SUBTRACT};if(i)F[Gc]=n.MIN,F[kc]=n.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(F[Gc]=I.MIN_EXT,F[kc]=I.MAX_EXT)}const j={[Og]:n.ZERO,[Bg]:n.ONE,[zg]:n.SRC_COLOR,[dl]:n.SRC_ALPHA,[Xg]:n.SRC_ALPHA_SATURATE,[kg]:n.DST_COLOR,[Vg]:n.DST_ALPHA,[Hg]:n.ONE_MINUS_SRC_COLOR,[pl]:n.ONE_MINUS_SRC_ALPHA,[Wg]:n.ONE_MINUS_DST_COLOR,[Gg]:n.ONE_MINUS_DST_ALPHA,[jg]:n.CONSTANT_COLOR,[qg]:n.ONE_MINUS_CONSTANT_COLOR,[Yg]:n.CONSTANT_ALPHA,[Kg]:n.ONE_MINUS_CONSTANT_ALPHA};function B(I,_e,ve,Ie,Le,Je,et,Pt,Vt,lt){if(I===Jn){d===!0&&(Pe(n.BLEND),d=!1);return}if(d===!1&&(Ne(n.BLEND),d=!0),I!==Ig){if(I!==b||lt!==X){if((y!==Oi||P!==Oi)&&(n.blendEquation(n.FUNC_ADD),y=Oi,P=Oi),lt)switch(I){case Gi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zt:n.blendFunc(n.ONE,n.ONE);break;case Hc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Gi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zt:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Hc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,D=null,w=null,H=null,S.set(0,0,0),A=0,b=I,X=lt}return}Le=Le||_e,Je=Je||ve,et=et||Ie,(_e!==y||Le!==P)&&(n.blendEquationSeparate(F[_e],F[Le]),y=_e,P=Le),(ve!==E||Ie!==D||Je!==w||et!==H)&&(n.blendFuncSeparate(j[ve],j[Ie],j[Je],j[et]),E=ve,D=Ie,w=Je,H=et),(Pt.equals(S)===!1||Vt!==A)&&(n.blendColor(Pt.r,Pt.g,Pt.b,Vt),S.copy(Pt),A=Vt),b=I,X=!1}function Q(I,_e){I.side===sn?Pe(n.CULL_FACE):Ne(n.CULL_FACE);let ve=I.side===Kt;_e&&(ve=!ve),te(ve),I.blending===Gi&&I.transparent===!1?B(Jn):B(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),o.setMask(I.colorWrite);const Ie=I.stencilWrite;c.setTest(Ie),Ie&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),C(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Ne(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(I){ee!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),ee=I)}function M(I){I!==Lg?(Ne(n.CULL_FACE),I!==pe&&(I===zc?n.cullFace(n.BACK):I===Dg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),pe=I}function g(I){I!==N&&($&&n.lineWidth(I),N=I)}function C(I,_e,ve){I?(Ne(n.POLYGON_OFFSET_FILL),(G!==_e||W!==ve)&&(n.polygonOffset(_e,ve),G=_e,W=ve)):Pe(n.POLYGON_OFFSET_FILL)}function k(I){I?Ne(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function O(I){I===void 0&&(I=n.TEXTURE0+q-1),fe!==I&&(n.activeTexture(I),fe=I)}function V(I,_e,ve){ve===void 0&&(fe===null?ve=n.TEXTURE0+q-1:ve=fe);let Ie=he[ve];Ie===void 0&&(Ie={type:void 0,texture:void 0},he[ve]=Ie),(Ie.type!==I||Ie.texture!==_e)&&(fe!==ve&&(n.activeTexture(ve),fe=ve),n.bindTexture(I,_e||Ue[I]),Ie.type=I,Ie.texture=_e)}function ae(){const I=he[fe];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function re(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function de(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function se(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function R(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(I){Se.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Se.copy(I))}function Ve(I){we.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),we.copy(I))}function Ye(I,_e){let ve=h.get(_e);ve===void 0&&(ve=new WeakMap,h.set(_e,ve));let Ie=ve.get(I);Ie===void 0&&(Ie=n.getUniformBlockIndex(_e,I.name),ve.set(I,Ie))}function Xe(I,_e){const Ie=h.get(_e).get(I);u.get(_e)!==Ie&&(n.uniformBlockBinding(_e,Ie,I.__bindingPointIndex),u.set(_e,Ie))}function xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},fe=null,he={},p={},_=new WeakMap,v=[],m=null,d=!1,b=null,y=null,E=null,D=null,P=null,w=null,H=null,S=new ze(0,0,0),A=0,X=!1,ee=null,pe=null,N=null,G=null,W=null,Se.set(0,0,n.canvas.width,n.canvas.height),we.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ne,disable:Pe,bindFramebuffer:qe,drawBuffers:x,useProgram:U,setBlending:B,setMaterial:Q,setFlipSided:te,setCullFace:M,setLineWidth:g,setPolygonOffset:C,setScissorTest:k,activeTexture:O,bindTexture:V,unbindTexture:ae,compressedTexImage2D:re,compressedTexImage3D:de,texImage2D:ge,texImage3D:ce,updateUBOMapping:Ye,uniformBlockBinding:Xe,texStorage2D:R,texStorage3D:le,texSubImage2D:Me,texSubImage3D:Ae,compressedTexSubImage2D:ne,compressedTexSubImage3D:se,scissor:be,viewport:Ve,reset:xe}}function Hy(n,e,t,i,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(M,g){return p?new OffscreenCanvas(M,g):Po("canvas")}function v(M,g,C,k){let O=1;if((M.width>k||M.height>k)&&(O=k/Math.max(M.width,M.height)),O<1||g===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const V=g?Ro:Math.floor,ae=V(O*M.width),re=V(O*M.height);h===void 0&&(h=_(ae,re));const de=C?_(ae,re):h;return de.width=ae,de.height=re,de.getContext("2d").drawImage(M,0,0,ae,re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+ae+"x"+re+")."),de}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function m(M){return yl(M.width)&&yl(M.height)}function d(M){return o?!1:M.wrapS!==xn||M.wrapT!==xn||M.minFilter!==jt&&M.minFilter!==un}function b(M,g){return M.generateMipmaps&&g&&M.minFilter!==jt&&M.minFilter!==un}function y(M){n.generateMipmap(M)}function E(M,g,C,k,O=!1){if(o===!1)return g;if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let V=g;if(g===n.RED&&(C===n.FLOAT&&(V=n.R32F),C===n.HALF_FLOAT&&(V=n.R16F),C===n.UNSIGNED_BYTE&&(V=n.R8)),g===n.RED_INTEGER&&(C===n.UNSIGNED_BYTE&&(V=n.R8UI),C===n.UNSIGNED_SHORT&&(V=n.R16UI),C===n.UNSIGNED_INT&&(V=n.R32UI),C===n.BYTE&&(V=n.R8I),C===n.SHORT&&(V=n.R16I),C===n.INT&&(V=n.R32I)),g===n.RG&&(C===n.FLOAT&&(V=n.RG32F),C===n.HALF_FLOAT&&(V=n.RG16F),C===n.UNSIGNED_BYTE&&(V=n.RG8)),g===n.RGBA){const ae=O?To:st.getTransfer(k);C===n.FLOAT&&(V=n.RGBA32F),C===n.HALF_FLOAT&&(V=n.RGBA16F),C===n.UNSIGNED_BYTE&&(V=ae===ht?n.SRGB8_ALPHA8:n.RGBA8),C===n.UNSIGNED_SHORT_4_4_4_4&&(V=n.RGBA4),C===n.UNSIGNED_SHORT_5_5_5_1&&(V=n.RGB5_A1)}return(V===n.R16F||V===n.R32F||V===n.RG16F||V===n.RG32F||V===n.RGBA16F||V===n.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function D(M,g,C){return b(M,C)===!0||M.isFramebufferTexture&&M.minFilter!==jt&&M.minFilter!==un?Math.log2(Math.max(g.width,g.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?g.mipmaps.length:1}function P(M){return M===jt||M===Wc||M===ya?n.NEAREST:n.LINEAR}function w(M){const g=M.target;g.removeEventListener("dispose",w),S(g),g.isVideoTexture&&u.delete(g)}function H(M){const g=M.target;g.removeEventListener("dispose",H),X(g)}function S(M){const g=i.get(M);if(g.__webglInit===void 0)return;const C=M.source,k=f.get(C);if(k){const O=k[g.__cacheKey];O.usedTimes--,O.usedTimes===0&&A(M),Object.keys(k).length===0&&f.delete(C)}i.remove(M)}function A(M){const g=i.get(M);n.deleteTexture(g.__webglTexture);const C=M.source,k=f.get(C);delete k[g.__cacheKey],a.memory.textures--}function X(M){const g=M.texture,C=i.get(M),k=i.get(g);if(k.__webglTexture!==void 0&&(n.deleteTexture(k.__webglTexture),a.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(C.__webglFramebuffer[O]))for(let V=0;V<C.__webglFramebuffer[O].length;V++)n.deleteFramebuffer(C.__webglFramebuffer[O][V]);else n.deleteFramebuffer(C.__webglFramebuffer[O]);C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer[O])}else{if(Array.isArray(C.__webglFramebuffer))for(let O=0;O<C.__webglFramebuffer.length;O++)n.deleteFramebuffer(C.__webglFramebuffer[O]);else n.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&n.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let O=0;O<C.__webglColorRenderbuffer.length;O++)C.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(C.__webglColorRenderbuffer[O]);C.__webglDepthRenderbuffer&&n.deleteRenderbuffer(C.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let O=0,V=g.length;O<V;O++){const ae=i.get(g[O]);ae.__webglTexture&&(n.deleteTexture(ae.__webglTexture),a.memory.textures--),i.remove(g[O])}i.remove(g),i.remove(M)}let ee=0;function pe(){ee=0}function N(){const M=ee;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),ee+=1,M}function G(M){const g=[];return g.push(M.wrapS),g.push(M.wrapT),g.push(M.wrapR||0),g.push(M.magFilter),g.push(M.minFilter),g.push(M.anisotropy),g.push(M.internalFormat),g.push(M.format),g.push(M.type),g.push(M.generateMipmaps),g.push(M.premultiplyAlpha),g.push(M.flipY),g.push(M.unpackAlignment),g.push(M.colorSpace),g.join()}function W(M,g){const C=i.get(M);if(M.isVideoTexture&&Q(M),M.isRenderTargetTexture===!1&&M.version>0&&C.__version!==M.version){const k=M.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(C,M,g);return}}t.bindTexture(n.TEXTURE_2D,C.__webglTexture,n.TEXTURE0+g)}function q(M,g){const C=i.get(M);if(M.version>0&&C.__version!==M.version){Se(C,M,g);return}t.bindTexture(n.TEXTURE_2D_ARRAY,C.__webglTexture,n.TEXTURE0+g)}function $(M,g){const C=i.get(M);if(M.version>0&&C.__version!==M.version){Se(C,M,g);return}t.bindTexture(n.TEXTURE_3D,C.__webglTexture,n.TEXTURE0+g)}function ie(M,g){const C=i.get(M);if(M.version>0&&C.__version!==M.version){we(C,M,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+g)}const oe={[_l]:n.REPEAT,[xn]:n.CLAMP_TO_EDGE,[vl]:n.MIRRORED_REPEAT},fe={[jt]:n.NEAREST,[Wc]:n.NEAREST_MIPMAP_NEAREST,[ya]:n.NEAREST_MIPMAP_LINEAR,[un]:n.LINEAR,[u_]:n.LINEAR_MIPMAP_NEAREST,[Mr]:n.LINEAR_MIPMAP_LINEAR},he={[S_]:n.NEVER,[C_]:n.ALWAYS,[b_]:n.LESS,[ad]:n.LEQUAL,[E_]:n.EQUAL,[w_]:n.GEQUAL,[T_]:n.GREATER,[A_]:n.NOTEQUAL};function J(M,g,C){if(C?(n.texParameteri(M,n.TEXTURE_WRAP_S,oe[g.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,oe[g.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,oe[g.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,fe[g.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,fe[g.minFilter])):(n.texParameteri(M,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(M,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(g.wrapS!==xn||g.wrapT!==xn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(M,n.TEXTURE_MAG_FILTER,P(g.magFilter)),n.texParameteri(M,n.TEXTURE_MIN_FILTER,P(g.minFilter)),g.minFilter!==jt&&g.minFilter!==un&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),g.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,he[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");if(g.magFilter===jt||g.minFilter!==ya&&g.minFilter!==Mr||g.type===gi&&e.has("OES_texture_float_linear")===!1||o===!1&&g.type===Qn&&e.has("OES_texture_half_float_linear")===!1)return;(g.anisotropy>1||i.get(g).__currentAnisotropy)&&(n.texParameterf(M,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy)}}function ue(M,g){let C=!1;M.__webglInit===void 0&&(M.__webglInit=!0,g.addEventListener("dispose",w));const k=g.source;let O=f.get(k);O===void 0&&(O={},f.set(k,O));const V=G(g);if(V!==M.__cacheKey){O[V]===void 0&&(O[V]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,C=!0),O[V].usedTimes++;const ae=O[M.__cacheKey];ae!==void 0&&(O[M.__cacheKey].usedTimes--,ae.usedTimes===0&&A(g)),M.__cacheKey=V,M.__webglTexture=O[V].texture}return C}function Se(M,g,C){let k=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=n.TEXTURE_3D);const O=ue(M,g),V=g.source;t.bindTexture(k,M.__webglTexture,n.TEXTURE0+C);const ae=i.get(V);if(V.version!==ae.__version||O===!0){t.activeTexture(n.TEXTURE0+C);const re=st.getPrimaries(st.workingColorSpace),de=g.colorSpace===fn?null:st.getPrimaries(g.colorSpace),Me=g.colorSpace===fn||re===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ae=d(g)&&m(g.image)===!1;let ne=v(g.image,Ae,!1,s.maxTextureSize);ne=te(g,ne);const se=m(ne)||o,R=r.convert(g.format,g.colorSpace);let le=r.convert(g.type),ge=E(g.internalFormat,R,le,g.colorSpace,g.isVideoTexture);J(k,g,se);let ce;const be=g.mipmaps,Ve=o&&g.isVideoTexture!==!0&&ge!==sd,Ye=ae.__version===void 0||O===!0,Xe=D(g,ne,se);if(g.isDepthTexture)ge=n.DEPTH_COMPONENT,o?g.type===gi?ge=n.DEPTH_COMPONENT32F:g.type===mi?ge=n.DEPTH_COMPONENT24:g.type===ki?ge=n.DEPTH24_STENCIL8:ge=n.DEPTH_COMPONENT16:g.type===gi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),g.format===Wi&&ge===n.DEPTH_COMPONENT&&g.type!==kl&&g.type!==mi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),g.type=mi,le=r.convert(g.type)),g.format===Os&&ge===n.DEPTH_COMPONENT&&(ge=n.DEPTH_STENCIL,g.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),g.type=ki,le=r.convert(g.type))),Ye&&(Ve?t.texStorage2D(n.TEXTURE_2D,1,ge,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,ge,ne.width,ne.height,0,R,le,null));else if(g.isDataTexture)if(be.length>0&&se){Ve&&Ye&&t.texStorage2D(n.TEXTURE_2D,Xe,ge,be[0].width,be[0].height);for(let xe=0,I=be.length;xe<I;xe++)ce=be[xe],Ve?t.texSubImage2D(n.TEXTURE_2D,xe,0,0,ce.width,ce.height,R,le,ce.data):t.texImage2D(n.TEXTURE_2D,xe,ge,ce.width,ce.height,0,R,le,ce.data);g.generateMipmaps=!1}else Ve?(Ye&&t.texStorage2D(n.TEXTURE_2D,Xe,ge,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,R,le,ne.data)):t.texImage2D(n.TEXTURE_2D,0,ge,ne.width,ne.height,0,R,le,ne.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ve&&Ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Xe,ge,be[0].width,be[0].height,ne.depth);for(let xe=0,I=be.length;xe<I;xe++)ce=be[xe],g.format!==Mn?R!==null?Ve?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,xe,0,0,0,ce.width,ce.height,ne.depth,R,ce.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,xe,ge,ce.width,ce.height,ne.depth,0,ce.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage3D(n.TEXTURE_2D_ARRAY,xe,0,0,0,ce.width,ce.height,ne.depth,R,le,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,xe,ge,ce.width,ce.height,ne.depth,0,R,le,ce.data)}else{Ve&&Ye&&t.texStorage2D(n.TEXTURE_2D,Xe,ge,be[0].width,be[0].height);for(let xe=0,I=be.length;xe<I;xe++)ce=be[xe],g.format!==Mn?R!==null?Ve?t.compressedTexSubImage2D(n.TEXTURE_2D,xe,0,0,ce.width,ce.height,R,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,xe,ge,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage2D(n.TEXTURE_2D,xe,0,0,ce.width,ce.height,R,le,ce.data):t.texImage2D(n.TEXTURE_2D,xe,ge,ce.width,ce.height,0,R,le,ce.data)}else if(g.isDataArrayTexture)Ve?(Ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Xe,ge,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,R,le,ne.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,ne.width,ne.height,ne.depth,0,R,le,ne.data);else if(g.isData3DTexture)Ve?(Ye&&t.texStorage3D(n.TEXTURE_3D,Xe,ge,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,R,le,ne.data)):t.texImage3D(n.TEXTURE_3D,0,ge,ne.width,ne.height,ne.depth,0,R,le,ne.data);else if(g.isFramebufferTexture){if(Ye)if(Ve)t.texStorage2D(n.TEXTURE_2D,Xe,ge,ne.width,ne.height);else{let xe=ne.width,I=ne.height;for(let _e=0;_e<Xe;_e++)t.texImage2D(n.TEXTURE_2D,_e,ge,xe,I,0,R,le,null),xe>>=1,I>>=1}}else if(be.length>0&&se){Ve&&Ye&&t.texStorage2D(n.TEXTURE_2D,Xe,ge,be[0].width,be[0].height);for(let xe=0,I=be.length;xe<I;xe++)ce=be[xe],Ve?t.texSubImage2D(n.TEXTURE_2D,xe,0,0,R,le,ce):t.texImage2D(n.TEXTURE_2D,xe,ge,R,le,ce);g.generateMipmaps=!1}else Ve?(Ye&&t.texStorage2D(n.TEXTURE_2D,Xe,ge,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,R,le,ne)):t.texImage2D(n.TEXTURE_2D,0,ge,R,le,ne);b(g,se)&&y(k),ae.__version=V.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function we(M,g,C){if(g.image.length!==6)return;const k=ue(M,g),O=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+C);const V=i.get(O);if(O.version!==V.__version||k===!0){t.activeTexture(n.TEXTURE0+C);const ae=st.getPrimaries(st.workingColorSpace),re=g.colorSpace===fn?null:st.getPrimaries(g.colorSpace),de=g.colorSpace===fn||ae===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Me=g.isCompressedTexture||g.image[0].isCompressedTexture,Ae=g.image[0]&&g.image[0].isDataTexture,ne=[];for(let xe=0;xe<6;xe++)!Me&&!Ae?ne[xe]=v(g.image[xe],!1,!0,s.maxCubemapSize):ne[xe]=Ae?g.image[xe].image:g.image[xe],ne[xe]=te(g,ne[xe]);const se=ne[0],R=m(se)||o,le=r.convert(g.format,g.colorSpace),ge=r.convert(g.type),ce=E(g.internalFormat,le,ge,g.colorSpace),be=o&&g.isVideoTexture!==!0,Ve=V.__version===void 0||k===!0;let Ye=D(g,se,R);J(n.TEXTURE_CUBE_MAP,g,R);let Xe;if(Me){be&&Ve&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ye,ce,se.width,se.height);for(let xe=0;xe<6;xe++){Xe=ne[xe].mipmaps;for(let I=0;I<Xe.length;I++){const _e=Xe[I];g.format!==Mn?le!==null?be?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I,0,0,_e.width,_e.height,le,_e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I,ce,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I,0,0,_e.width,_e.height,le,ge,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I,ce,_e.width,_e.height,0,le,ge,_e.data)}}}else{Xe=g.mipmaps,be&&Ve&&(Xe.length>0&&Ye++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Ye,ce,ne[0].width,ne[0].height));for(let xe=0;xe<6;xe++)if(Ae){be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,ne[xe].width,ne[xe].height,le,ge,ne[xe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,ce,ne[xe].width,ne[xe].height,0,le,ge,ne[xe].data);for(let I=0;I<Xe.length;I++){const ve=Xe[I].image[xe].image;be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I+1,0,0,ve.width,ve.height,le,ge,ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I+1,ce,ve.width,ve.height,0,le,ge,ve.data)}}else{be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,le,ge,ne[xe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,ce,le,ge,ne[xe]);for(let I=0;I<Xe.length;I++){const _e=Xe[I];be?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I+1,0,0,le,ge,_e.image[xe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,I+1,ce,le,ge,_e.image[xe])}}}b(g,R)&&y(n.TEXTURE_CUBE_MAP),V.__version=O.version,g.onUpdate&&g.onUpdate(g)}M.__version=g.version}function Ce(M,g,C,k,O,V){const ae=r.convert(C.format,C.colorSpace),re=r.convert(C.type),de=E(C.internalFormat,ae,re,C.colorSpace);if(!i.get(g).__hasExternalTextures){const Ae=Math.max(1,g.width>>V),ne=Math.max(1,g.height>>V);O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?t.texImage3D(O,V,de,Ae,ne,g.depth,0,ae,re,null):t.texImage2D(O,V,de,Ae,ne,0,ae,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),B(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,O,i.get(C).__webglTexture,0,j(g)):(O===n.TEXTURE_2D||O>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&O<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,O,i.get(C).__webglTexture,V),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ue(M,g,C){if(n.bindRenderbuffer(n.RENDERBUFFER,M),g.depthBuffer&&!g.stencilBuffer){let k=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(C||B(g)){const O=g.depthTexture;O&&O.isDepthTexture&&(O.type===gi?k=n.DEPTH_COMPONENT32F:O.type===mi&&(k=n.DEPTH_COMPONENT24));const V=j(g);B(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,V,k,g.width,g.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,V,k,g.width,g.height)}else n.renderbufferStorage(n.RENDERBUFFER,k,g.width,g.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,M)}else if(g.depthBuffer&&g.stencilBuffer){const k=j(g);C&&B(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,k,n.DEPTH24_STENCIL8,g.width,g.height):B(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,k,n.DEPTH24_STENCIL8,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,M)}else{const k=g.isWebGLMultipleRenderTargets===!0?g.texture:[g.texture];for(let O=0;O<k.length;O++){const V=k[O],ae=r.convert(V.format,V.colorSpace),re=r.convert(V.type),de=E(V.internalFormat,ae,re,V.colorSpace),Me=j(g);C&&B(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,de,g.width,g.height):B(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Me,de,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,de,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ne(M,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(g.depthTexture).__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),W(g.depthTexture,0);const k=i.get(g.depthTexture).__webglTexture,O=j(g);if(g.depthTexture.format===Wi)B(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0,O):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0);else if(g.depthTexture.format===Os)B(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0,O):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function Pe(M){const g=i.get(M),C=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!g.__autoAllocateDepthBuffer){if(C)throw new Error("target.depthTexture not supported in Cube render targets");Ne(g.__webglFramebuffer,M)}else if(C){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]=n.createRenderbuffer(),Ue(g.__webglDepthbuffer[k],M,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer=n.createRenderbuffer(),Ue(g.__webglDepthbuffer,M,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(M,g,C){const k=i.get(M);g!==void 0&&Ce(k.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),C!==void 0&&Pe(M)}function x(M){const g=M.texture,C=i.get(M),k=i.get(g);M.addEventListener("dispose",H),M.isWebGLMultipleRenderTargets!==!0&&(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=g.version,a.memory.textures++);const O=M.isWebGLCubeRenderTarget===!0,V=M.isWebGLMultipleRenderTargets===!0,ae=m(M)||o;if(O){C.__webglFramebuffer=[];for(let re=0;re<6;re++)if(o&&g.mipmaps&&g.mipmaps.length>0){C.__webglFramebuffer[re]=[];for(let de=0;de<g.mipmaps.length;de++)C.__webglFramebuffer[re][de]=n.createFramebuffer()}else C.__webglFramebuffer[re]=n.createFramebuffer()}else{if(o&&g.mipmaps&&g.mipmaps.length>0){C.__webglFramebuffer=[];for(let re=0;re<g.mipmaps.length;re++)C.__webglFramebuffer[re]=n.createFramebuffer()}else C.__webglFramebuffer=n.createFramebuffer();if(V)if(s.drawBuffers){const re=M.texture;for(let de=0,Me=re.length;de<Me;de++){const Ae=i.get(re[de]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&M.samples>0&&B(M)===!1){const re=V?g:[g];C.__webglMultisampledFramebuffer=n.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let de=0;de<re.length;de++){const Me=re[de];C.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,C.__webglColorRenderbuffer[de]);const Ae=r.convert(Me.format,Me.colorSpace),ne=r.convert(Me.type),se=E(Me.internalFormat,Ae,ne,Me.colorSpace,M.isXRRenderTarget===!0),R=j(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,R,se,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,C.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(C.__webglDepthRenderbuffer=n.createRenderbuffer(),Ue(C.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(O){t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),J(n.TEXTURE_CUBE_MAP,g,ae);for(let re=0;re<6;re++)if(o&&g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)Ce(C.__webglFramebuffer[re][de],M,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,de);else Ce(C.__webglFramebuffer[re],M,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);b(g,ae)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(V){const re=M.texture;for(let de=0,Me=re.length;de<Me;de++){const Ae=re[de],ne=i.get(Ae);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),J(n.TEXTURE_2D,Ae,ae),Ce(C.__webglFramebuffer,M,Ae,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),b(Ae,ae)&&y(n.TEXTURE_2D)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(o?re=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(re,k.__webglTexture),J(re,g,ae),o&&g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)Ce(C.__webglFramebuffer[de],M,g,n.COLOR_ATTACHMENT0,re,de);else Ce(C.__webglFramebuffer,M,g,n.COLOR_ATTACHMENT0,re,0);b(g,ae)&&y(re),t.unbindTexture()}M.depthBuffer&&Pe(M)}function U(M){const g=m(M)||o,C=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let k=0,O=C.length;k<O;k++){const V=C[k];if(b(V,g)){const ae=M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,re=i.get(V).__webglTexture;t.bindTexture(ae,re),y(ae),t.unbindTexture()}}}function F(M){if(o&&M.samples>0&&B(M)===!1){const g=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],C=M.width,k=M.height;let O=n.COLOR_BUFFER_BIT;const V=[],ae=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=i.get(M),de=M.isWebGLMultipleRenderTargets===!0;if(de)for(let Me=0;Me<g.length;Me++)t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let Me=0;Me<g.length;Me++){V.push(n.COLOR_ATTACHMENT0+Me),M.depthBuffer&&V.push(ae);const Ae=re.__ignoreDepthValues!==void 0?re.__ignoreDepthValues:!1;if(Ae===!1&&(M.depthBuffer&&(O|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&(O|=n.STENCIL_BUFFER_BIT)),de&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,re.__webglColorRenderbuffer[Me]),Ae===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ae]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ae])),de){const ne=i.get(g[Me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,C,k,0,0,C,k,O,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,V)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let Me=0;Me<g.length;Me++){t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,re.__webglColorRenderbuffer[Me]);const Ae=i.get(g[Me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}}function j(M){return Math.min(s.maxSamples,M.samples)}function B(M){const g=i.get(M);return o&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Q(M){const g=a.render.frame;u.get(M)!==g&&(u.set(M,g),M.update())}function te(M,g){const C=M.colorSpace,k=M.format,O=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===Ml||C!==ri&&C!==fn&&(st.getTransfer(C)===ht?o===!1?e.has("EXT_sRGB")===!0&&k===Mn?(M.format=Ml,M.minFilter=un,M.generateMipmaps=!1):g=cd.sRGBToLinear(g):(k!==Mn||O!==yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",C)),g}this.allocateTextureUnit=N,this.resetTextureUnits=pe,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=ie,this.rebindTextures=qe,this.setupRenderTarget=x,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=B}function Vy(n,e,t){const i=t.isWebGL2;function s(r,a=fn){let o;const l=st.getTransfer(a);if(r===yi)return n.UNSIGNED_BYTE;if(r===Qf)return n.UNSIGNED_SHORT_4_4_4_4;if(r===ed)return n.UNSIGNED_SHORT_5_5_5_1;if(r===h_)return n.BYTE;if(r===f_)return n.SHORT;if(r===kl)return n.UNSIGNED_SHORT;if(r===Jf)return n.INT;if(r===mi)return n.UNSIGNED_INT;if(r===gi)return n.FLOAT;if(r===Qn)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===d_)return n.ALPHA;if(r===Mn)return n.RGBA;if(r===p_)return n.LUMINANCE;if(r===m_)return n.LUMINANCE_ALPHA;if(r===Wi)return n.DEPTH_COMPONENT;if(r===Os)return n.DEPTH_STENCIL;if(r===Ml)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===g_)return n.RED;if(r===td)return n.RED_INTEGER;if(r===__)return n.RG;if(r===nd)return n.RG_INTEGER;if(r===id)return n.RGBA_INTEGER;if(r===Sa||r===ba||r===Ea||r===Ta)if(l===ht)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Sa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ba)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ea)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ta)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Sa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ba)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ea)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ta)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Xc||r===jc||r===qc||r===Yc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Xc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===jc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===qc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Yc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===sd)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Kc||r===$c)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Kc)return l===ht?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===$c)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Zc||r===Jc||r===Qc||r===eu||r===tu||r===nu||r===iu||r===su||r===ru||r===ou||r===au||r===lu||r===cu||r===uu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Zc)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Jc)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Qc)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===eu)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===tu)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===nu)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===iu)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===su)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ru)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ou)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===au)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===lu)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===cu)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===uu)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Aa||r===hu||r===fu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Aa)return l===ht?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===hu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===fu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===v_||r===du||r===pu||r===mu)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Aa)return o.COMPRESSED_RED_RGTC1_EXT;if(r===du)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===pu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===mu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ki?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class Gy extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _i extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ky={type:"move"};class Ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _i,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _i,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _i,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ky)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _i;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Wy extends qi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,_=null;const v=t.getContextAttributes();let m=null,d=null;const b=[],y=[],E=new Te;let D=null;const P=new nn;P.layers.enable(1),P.viewport=new dt;const w=new nn;w.layers.enable(2),w.viewport=new dt;const H=[P,w],S=new Gy;S.layers.enable(1),S.layers.enable(2);let A=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ue=b[J];return ue===void 0&&(ue=new Ka,b[J]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(J){let ue=b[J];return ue===void 0&&(ue=new Ka,b[J]=ue),ue.getGripSpace()},this.getHand=function(J){let ue=b[J];return ue===void 0&&(ue=new Ka,b[J]=ue),ue.getHandSpace()};function ee(J){const ue=y.indexOf(J.inputSource);if(ue===-1)return;const Se=b[ue];Se!==void 0&&(Se.update(J.inputSource,J.frame,c||a),Se.dispatchEvent({type:J.type,data:J.inputSource}))}function pe(){s.removeEventListener("select",ee),s.removeEventListener("selectstart",ee),s.removeEventListener("selectend",ee),s.removeEventListener("squeeze",ee),s.removeEventListener("squeezestart",ee),s.removeEventListener("squeezeend",ee),s.removeEventListener("end",pe),s.removeEventListener("inputsourceschange",N);for(let J=0;J<b.length;J++){const ue=y[J];ue!==null&&(y[J]=null,b[J].disconnect(ue))}A=null,X=null,e.setRenderTarget(m),p=null,f=null,h=null,s=null,d=null,he.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",ee),s.addEventListener("selectstart",ee),s.addEventListener("selectend",ee),s.addEventListener("squeeze",ee),s.addEventListener("squeezestart",ee),s.addEventListener("squeezeend",ee),s.addEventListener("end",pe),s.addEventListener("inputsourceschange",N),v.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(E),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ue={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new En(p.framebufferWidth,p.framebufferHeight,{format:Mn,type:yi,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let ue=null,Se=null,we=null;v.depth&&(we=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=v.stencil?Os:Wi,Se=v.stencil?ki:mi);const Ce={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(Ce),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new En(f.textureWidth,f.textureHeight,{format:Mn,type:yi,depthTexture:new Md(f.textureWidth,f.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Ue=e.properties.get(d);Ue.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),he.setContext(s),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function N(J){for(let ue=0;ue<J.removed.length;ue++){const Se=J.removed[ue],we=y.indexOf(Se);we>=0&&(y[we]=null,b[we].disconnect(Se))}for(let ue=0;ue<J.added.length;ue++){const Se=J.added[ue];let we=y.indexOf(Se);if(we===-1){for(let Ue=0;Ue<b.length;Ue++)if(Ue>=y.length){y.push(Se),we=Ue;break}else if(y[Ue]===null){y[Ue]=Se,we=Ue;break}if(we===-1)break}const Ce=b[we];Ce&&Ce.connect(Se)}}const G=new L,W=new L;function q(J,ue,Se){G.setFromMatrixPosition(ue.matrixWorld),W.setFromMatrixPosition(Se.matrixWorld);const we=G.distanceTo(W),Ce=ue.projectionMatrix.elements,Ue=Se.projectionMatrix.elements,Ne=Ce[14]/(Ce[10]-1),Pe=Ce[14]/(Ce[10]+1),qe=(Ce[9]+1)/Ce[5],x=(Ce[9]-1)/Ce[5],U=(Ce[8]-1)/Ce[0],F=(Ue[8]+1)/Ue[0],j=Ne*U,B=Ne*F,Q=we/(-U+F),te=Q*-U;ue.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(te),J.translateZ(Q),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const M=Ne+Q,g=Pe+Q,C=j-te,k=B+(we-te),O=qe*Pe/g*M,V=x*Pe/g*M;J.projectionMatrix.makePerspective(C,k,O,V,M,g),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function $(J,ue){ue===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ue.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;S.near=w.near=P.near=J.near,S.far=w.far=P.far=J.far,(A!==S.near||X!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),A=S.near,X=S.far);const ue=J.parent,Se=S.cameras;$(S,ue);for(let we=0;we<Se.length;we++)$(Se[we],ue);Se.length===2?q(S,P,w):S.projectionMatrix.copy(P.projectionMatrix),ie(J,S,ue)};function ie(J,ue,Se){Se===null?J.matrix.copy(ue.matrixWorld):(J.matrix.copy(Se.matrixWorld),J.matrix.invert(),J.matrix.multiply(ue.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ue.projectionMatrix),J.projectionMatrixInverse.copy(ue.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=yr*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)};let oe=null;function fe(J,ue){if(u=ue.getViewerPose(c||a),_=ue,u!==null){const Se=u.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let we=!1;Se.length!==S.cameras.length&&(S.cameras.length=0,we=!0);for(let Ce=0;Ce<Se.length;Ce++){const Ue=Se[Ce];let Ne=null;if(p!==null)Ne=p.getViewport(Ue);else{const qe=h.getViewSubImage(f,Ue);Ne=qe.viewport,Ce===0&&(e.setRenderTargetTextures(d,qe.colorTexture,f.ignoreDepthValues?void 0:qe.depthStencilTexture),e.setRenderTarget(d))}let Pe=H[Ce];Pe===void 0&&(Pe=new nn,Pe.layers.enable(Ce),Pe.viewport=new dt,H[Ce]=Pe),Pe.matrix.fromArray(Ue.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Ue.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),Ce===0&&(S.matrix.copy(Pe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),we===!0&&S.cameras.push(Pe)}}for(let Se=0;Se<b.length;Se++){const we=y[Se],Ce=b[Se];we!==null&&Ce!==void 0&&Ce.update(we,ue,c||a)}oe&&oe(J,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),_=null}const he=new vd;he.setAnimationLoop(fe),this.setAnimationLoop=function(J){oe=J},this.dispose=function(){}}}function Xy(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,md(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,b,y,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,E)):d.isMeshMatcapMaterial?(r(m,d),_(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),v(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,b,y):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Kt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Kt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=e.get(d).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const y=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*y,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,b,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=y*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Kt&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const b=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function jy(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,y){const E=y.program;i.uniformBlockBinding(b,E)}function c(b,y){let E=s[b.id];E===void 0&&(_(b),E=u(b),s[b.id]=E,b.addEventListener("dispose",m));const D=y.program;i.updateUBOMapping(b,D);const P=e.render.frame;r[b.id]!==P&&(f(b),r[b.id]=P)}function u(b){const y=h();b.__bindingPointIndex=y;const E=n.createBuffer(),D=b.__size,P=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,D,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,E),E}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const y=s[b.id],E=b.uniforms,D=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let P=0,w=E.length;P<w;P++){const H=Array.isArray(E[P])?E[P]:[E[P]];for(let S=0,A=H.length;S<A;S++){const X=H[S];if(p(X,P,S,D)===!0){const ee=X.__offset,pe=Array.isArray(X.value)?X.value:[X.value];let N=0;for(let G=0;G<pe.length;G++){const W=pe[G],q=v(W);typeof W=="number"||typeof W=="boolean"?(X.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,ee+N,X.__data)):W.isMatrix3?(X.__data[0]=W.elements[0],X.__data[1]=W.elements[1],X.__data[2]=W.elements[2],X.__data[3]=0,X.__data[4]=W.elements[3],X.__data[5]=W.elements[4],X.__data[6]=W.elements[5],X.__data[7]=0,X.__data[8]=W.elements[6],X.__data[9]=W.elements[7],X.__data[10]=W.elements[8],X.__data[11]=0):(W.toArray(X.__data,N),N+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,ee,X.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,y,E,D){const P=b.value,w=y+"_"+E;if(D[w]===void 0)return typeof P=="number"||typeof P=="boolean"?D[w]=P:D[w]=P.clone(),!0;{const H=D[w];if(typeof P=="number"||typeof P=="boolean"){if(H!==P)return D[w]=P,!0}else if(H.equals(P)===!1)return H.copy(P),!0}return!1}function _(b){const y=b.uniforms;let E=0;const D=16;for(let w=0,H=y.length;w<H;w++){const S=Array.isArray(y[w])?y[w]:[y[w]];for(let A=0,X=S.length;A<X;A++){const ee=S[A],pe=Array.isArray(ee.value)?ee.value:[ee.value];for(let N=0,G=pe.length;N<G;N++){const W=pe[N],q=v(W),$=E%D;$!==0&&D-$<q.boundary&&(E+=D-$),ee.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=E,E+=q.storage}}}const P=E%D;return P>0&&(E+=D-P),b.__size=E,b.__cache={},this}function v(b){const y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){const y=b.target;y.removeEventListener("dispose",m);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(const b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class Ad{constructor(e={}){const{canvas:t=k_(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;const p=new Uint32Array(4),_=new Int32Array(4);let v=null,m=null;const d=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=It,this._useLegacyLights=!1,this.toneMapping=Mi,this.toneMappingExposure=1;const y=this;let E=!1,D=0,P=0,w=null,H=-1,S=null;const A=new dt,X=new dt;let ee=null;const pe=new ze(0);let N=0,G=t.width,W=t.height,q=1,$=null,ie=null;const oe=new dt(0,0,G,W),fe=new dt(0,0,G,W);let he=!1;const J=new ql;let ue=!1,Se=!1,we=null;const Ce=new rt,Ue=new Te,Ne=new L,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return w===null?q:1}let x=i;function U(T,z){for(let K=0;K<T.length;K++){const Z=T[K],Y=t.getContext(Z,z);if(Y!==null)return Y}return null}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gl}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",_e,!1),x===null){const z=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&z.shift(),x=U(z,T),x===null)throw U(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&x instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),x.getShaderPrecisionFormat===void 0&&(x.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let F,j,B,Q,te,M,g,C,k,O,V,ae,re,de,Me,Ae,ne,se,R,le,ge,ce,be,Ve;function Ye(){F=new nM(x),j=new $x(x,F,e),F.init(j),ce=new Vy(x,F,j),B=new zy(x,F,j),Q=new rM(x),te=new Ty,M=new Hy(x,F,B,te,j,ce,Q),g=new Jx(y),C=new tM(y),k=new d0(x,j),be=new Yx(x,F,k,j),O=new iM(x,k,Q,be),V=new cM(x,O,k,Q),R=new lM(x,j,M),Ae=new Zx(te),ae=new Ey(y,g,C,F,j,be,Ae),re=new Xy(y,te),de=new wy,Me=new Uy(F,j),se=new qx(y,g,C,B,V,f,l),ne=new By(y,V,j),Ve=new jy(x,Q,j,B),le=new Kx(x,F,Q,j),ge=new sM(x,F,Q,j),Q.programs=ae.programs,y.capabilities=j,y.extensions=F,y.properties=te,y.renderLists=de,y.shadowMap=ne,y.state=B,y.info=Q}Ye();const Xe=new Wy(y,x);this.xr=Xe,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){const T=F.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=F.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(T){T!==void 0&&(q=T,this.setSize(G,W,!1))},this.getSize=function(T){return T.set(G,W)},this.setSize=function(T,z,K=!0){if(Xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=T,W=z,t.width=Math.floor(T*q),t.height=Math.floor(z*q),K===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(G*q,W*q).floor()},this.setDrawingBufferSize=function(T,z,K){G=T,W=z,q=K,t.width=Math.floor(T*K),t.height=Math.floor(z*K),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(A)},this.getViewport=function(T){return T.copy(oe)},this.setViewport=function(T,z,K,Z){T.isVector4?oe.set(T.x,T.y,T.z,T.w):oe.set(T,z,K,Z),B.viewport(A.copy(oe).multiplyScalar(q).floor())},this.getScissor=function(T){return T.copy(fe)},this.setScissor=function(T,z,K,Z){T.isVector4?fe.set(T.x,T.y,T.z,T.w):fe.set(T,z,K,Z),B.scissor(X.copy(fe).multiplyScalar(q).floor())},this.getScissorTest=function(){return he},this.setScissorTest=function(T){B.setScissorTest(he=T)},this.setOpaqueSort=function(T){$=T},this.setTransparentSort=function(T){ie=T},this.getClearColor=function(T){return T.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(T=!0,z=!0,K=!0){let Z=0;if(T){let Y=!1;if(w!==null){const Ee=w.texture.format;Y=Ee===id||Ee===nd||Ee===td}if(Y){const Ee=w.texture.type,De=Ee===yi||Ee===mi||Ee===kl||Ee===ki||Ee===Qf||Ee===ed,Fe=se.getClearColor(),Be=se.getClearAlpha(),je=Fe.r,He=Fe.g,Ge=Fe.b;De?(p[0]=je,p[1]=He,p[2]=Ge,p[3]=Be,x.clearBufferuiv(x.COLOR,0,p)):(_[0]=je,_[1]=He,_[2]=Ge,_[3]=Be,x.clearBufferiv(x.COLOR,0,_))}else Z|=x.COLOR_BUFFER_BIT}z&&(Z|=x.DEPTH_BUFFER_BIT),K&&(Z|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),x.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),de.dispose(),Me.dispose(),te.dispose(),g.dispose(),C.dispose(),V.dispose(),be.dispose(),Ve.dispose(),ae.dispose(),Xe.dispose(),Xe.removeEventListener("sessionstart",Vt),Xe.removeEventListener("sessionend",lt),we&&(we.dispose(),we=null),Gt.stop()};function xe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Q.autoReset,z=ne.enabled,K=ne.autoUpdate,Z=ne.needsUpdate,Y=ne.type;Ye(),Q.autoReset=T,ne.enabled=z,ne.autoUpdate=K,ne.needsUpdate=Z,ne.type=Y}function _e(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ve(T){const z=T.target;z.removeEventListener("dispose",ve),Ie(z)}function Ie(T){Le(T),te.remove(T)}function Le(T){const z=te.get(T).programs;z!==void 0&&(z.forEach(function(K){ae.releaseProgram(K)}),T.isShaderMaterial&&ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,K,Z,Y,Ee){z===null&&(z=Pe);const De=Y.isMesh&&Y.matrixWorld.determinant()<0,Fe=Kd(T,z,K,Z,Y);B.setMaterial(Z,De);let Be=K.index,je=1;if(Z.wireframe===!0){if(Be=O.getWireframeAttribute(K),Be===void 0)return;je=2}const He=K.drawRange,Ge=K.attributes.position;let St=He.start*je,Qt=(He.start+He.count)*je;Ee!==null&&(St=Math.max(St,Ee.start*je),Qt=Math.min(Qt,(Ee.start+Ee.count)*je)),Be!==null?(St=Math.max(St,0),Qt=Math.min(Qt,Be.count)):Ge!=null&&(St=Math.max(St,0),Qt=Math.min(Qt,Ge.count));const Lt=Qt-St;if(Lt<0||Lt===1/0)return;be.setup(Y,Z,Fe,K,Be);let On,mt=le;if(Be!==null&&(On=k.get(Be),mt=ge,mt.setIndex(On)),Y.isMesh)Z.wireframe===!0?(B.setLineWidth(Z.wireframeLinewidth*qe()),mt.setMode(x.LINES)):mt.setMode(x.TRIANGLES);else if(Y.isLine){let Ke=Z.linewidth;Ke===void 0&&(Ke=1),B.setLineWidth(Ke*qe()),Y.isLineSegments?mt.setMode(x.LINES):Y.isLineLoop?mt.setMode(x.LINE_LOOP):mt.setMode(x.LINE_STRIP)}else Y.isPoints?mt.setMode(x.POINTS):Y.isSprite&&mt.setMode(x.TRIANGLES);if(Y.isBatchedMesh)mt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else if(Y.isInstancedMesh)mt.renderInstances(St,Lt,Y.count);else if(K.isInstancedBufferGeometry){const Ke=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,sa=Math.min(K.instanceCount,Ke);mt.renderInstances(St,Lt,sa)}else mt.render(St,Lt)};function Je(T,z,K){T.transparent===!0&&T.side===sn&&T.forceSinglePass===!1?(T.side=Kt,T.needsUpdate=!0,Dr(T,z,K),T.side=bi,T.needsUpdate=!0,Dr(T,z,K),T.side=sn):Dr(T,z,K)}this.compile=function(T,z,K=null){K===null&&(K=T),m=Me.get(K),m.init(),b.push(m),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),T!==K&&T.traverseVisible(function(Y){Y.isLight&&Y.layers.test(z.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),m.setupLights(y._useLegacyLights);const Z=new Set;return T.traverse(function(Y){const Ee=Y.material;if(Ee)if(Array.isArray(Ee))for(let De=0;De<Ee.length;De++){const Fe=Ee[De];Je(Fe,K,Y),Z.add(Fe)}else Je(Ee,K,Y),Z.add(Ee)}),b.pop(),m=null,Z},this.compileAsync=function(T,z,K=null){const Z=this.compile(T,z,K);return new Promise(Y=>{function Ee(){if(Z.forEach(function(De){te.get(De).currentProgram.isReady()&&Z.delete(De)}),Z.size===0){Y(T);return}setTimeout(Ee,10)}F.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let et=null;function Pt(T){et&&et(T)}function Vt(){Gt.stop()}function lt(){Gt.start()}const Gt=new vd;Gt.setAnimationLoop(Pt),typeof self<"u"&&Gt.setContext(self),this.setAnimationLoop=function(T){et=T,Xe.setAnimationLoop(T),T===null?Gt.stop():Gt.start()},Xe.addEventListener("sessionstart",Vt),Xe.addEventListener("sessionend",lt),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(z),z=Xe.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,z,w),m=Me.get(T,b.length),m.init(),b.push(m),Ce.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),J.setFromProjectionMatrix(Ce),Se=this.localClippingEnabled,ue=Ae.init(this.clippingPlanes,Se),v=de.get(T,d.length),v.init(),d.push(v),wn(T,z,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort($,ie),this.info.render.frame++,ue===!0&&Ae.beginShadows();const K=m.state.shadowsArray;if(ne.render(K,T,z),ue===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),se.render(v,T),m.setupLights(y._useLegacyLights),z.isArrayCamera){const Z=z.cameras;for(let Y=0,Ee=Z.length;Y<Ee;Y++){const De=Z[Y];Ql(v,T,De,De.viewport)}}else Ql(v,T,z);w!==null&&(M.updateMultisampleRenderTarget(w),M.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(y,T,z),be.resetDefaultState(),H=-1,S=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,d.pop(),d.length>0?v=d[d.length-1]:v=null};function wn(T,z,K,Z){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){Z&&Ne.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ce);const De=V.update(T),Fe=T.material;Fe.visible&&v.push(T,De,Fe,K,Ne.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const De=V.update(T),Fe=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ne.copy(T.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Ne.copy(De.boundingSphere.center)),Ne.applyMatrix4(T.matrixWorld).applyMatrix4(Ce)),Array.isArray(Fe)){const Be=De.groups;for(let je=0,He=Be.length;je<He;je++){const Ge=Be[je],St=Fe[Ge.materialIndex];St&&St.visible&&v.push(T,De,St,K,Ne.z,Ge)}}else Fe.visible&&v.push(T,De,Fe,K,Ne.z,null)}}const Ee=T.children;for(let De=0,Fe=Ee.length;De<Fe;De++)wn(Ee[De],z,K,Z)}function Ql(T,z,K,Z){const Y=T.opaque,Ee=T.transmissive,De=T.transparent;m.setupLightsView(K),ue===!0&&Ae.setGlobalState(y.clippingPlanes,K),Ee.length>0&&Yd(Y,Ee,z,K),Z&&B.viewport(A.copy(Z)),Y.length>0&&Lr(Y,z,K),Ee.length>0&&Lr(Ee,z,K),De.length>0&&Lr(De,z,K),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function Yd(T,z,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const Ee=j.isWebGL2;we===null&&(we=new En(1,1,{generateMipmaps:!0,type:F.has("EXT_color_buffer_half_float")?Qn:yi,minFilter:Mr,samples:Ee?4:0})),y.getDrawingBufferSize(Ue),Ee?we.setSize(Ue.x,Ue.y):we.setSize(Ro(Ue.x),Ro(Ue.y));const De=y.getRenderTarget();y.setRenderTarget(we),y.getClearColor(pe),N=y.getClearAlpha(),N<1&&y.setClearColor(16777215,.5),y.clear();const Fe=y.toneMapping;y.toneMapping=Mi,Lr(T,K,Z),M.updateMultisampleRenderTarget(we),M.updateRenderTargetMipmap(we);let Be=!1;for(let je=0,He=z.length;je<He;je++){const Ge=z[je],St=Ge.object,Qt=Ge.geometry,Lt=Ge.material,On=Ge.group;if(Lt.side===sn&&St.layers.test(Z.layers)){const mt=Lt.side;Lt.side=Kt,Lt.needsUpdate=!0,ec(St,K,Z,Qt,Lt,On),Lt.side=mt,Lt.needsUpdate=!0,Be=!0}}Be===!0&&(M.updateMultisampleRenderTarget(we),M.updateRenderTargetMipmap(we)),y.setRenderTarget(De),y.setClearColor(pe,N),y.toneMapping=Fe}function Lr(T,z,K){const Z=z.isScene===!0?z.overrideMaterial:null;for(let Y=0,Ee=T.length;Y<Ee;Y++){const De=T[Y],Fe=De.object,Be=De.geometry,je=Z===null?De.material:Z,He=De.group;Fe.layers.test(K.layers)&&ec(Fe,z,K,Be,je,He)}}function ec(T,z,K,Z,Y,Ee){T.onBeforeRender(y,z,K,Z,Y,Ee),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Y.onBeforeRender(y,z,K,Z,T,Ee),Y.transparent===!0&&Y.side===sn&&Y.forceSinglePass===!1?(Y.side=Kt,Y.needsUpdate=!0,y.renderBufferDirect(K,z,Z,Y,T,Ee),Y.side=bi,Y.needsUpdate=!0,y.renderBufferDirect(K,z,Z,Y,T,Ee),Y.side=sn):y.renderBufferDirect(K,z,Z,Y,T,Ee),T.onAfterRender(y,z,K,Z,Y,Ee)}function Dr(T,z,K){z.isScene!==!0&&(z=Pe);const Z=te.get(T),Y=m.state.lights,Ee=m.state.shadowsArray,De=Y.state.version,Fe=ae.getParameters(T,Y.state,Ee,z,K),Be=ae.getProgramCacheKey(Fe);let je=Z.programs;Z.environment=T.isMeshStandardMaterial?z.environment:null,Z.fog=z.fog,Z.envMap=(T.isMeshStandardMaterial?C:g).get(T.envMap||Z.environment),je===void 0&&(T.addEventListener("dispose",ve),je=new Map,Z.programs=je);let He=je.get(Be);if(He!==void 0){if(Z.currentProgram===He&&Z.lightsStateVersion===De)return nc(T,Fe),He}else Fe.uniforms=ae.getUniforms(T),T.onBuild(K,Fe,y),T.onBeforeCompile(Fe,y),He=ae.acquireProgram(Fe,Be),je.set(Be,He),Z.uniforms=Fe.uniforms;const Ge=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ge.clippingPlanes=Ae.uniform),nc(T,Fe),Z.needsLights=Zd(T),Z.lightsStateVersion=De,Z.needsLights&&(Ge.ambientLightColor.value=Y.state.ambient,Ge.lightProbe.value=Y.state.probe,Ge.directionalLights.value=Y.state.directional,Ge.directionalLightShadows.value=Y.state.directionalShadow,Ge.spotLights.value=Y.state.spot,Ge.spotLightShadows.value=Y.state.spotShadow,Ge.rectAreaLights.value=Y.state.rectArea,Ge.ltc_1.value=Y.state.rectAreaLTC1,Ge.ltc_2.value=Y.state.rectAreaLTC2,Ge.pointLights.value=Y.state.point,Ge.pointLightShadows.value=Y.state.pointShadow,Ge.hemisphereLights.value=Y.state.hemi,Ge.directionalShadowMap.value=Y.state.directionalShadowMap,Ge.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ge.spotShadowMap.value=Y.state.spotShadowMap,Ge.spotLightMatrix.value=Y.state.spotLightMatrix,Ge.spotLightMap.value=Y.state.spotLightMap,Ge.pointShadowMap.value=Y.state.pointShadowMap,Ge.pointShadowMatrix.value=Y.state.pointShadowMatrix),Z.currentProgram=He,Z.uniformsList=null,He}function tc(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=mo.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function nc(T,z){const K=te.get(T);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function Kd(T,z,K,Z,Y){z.isScene!==!0&&(z=Pe),M.resetTextureUnits();const Ee=z.fog,De=Z.isMeshStandardMaterial?z.environment:null,Fe=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:ri,Be=(Z.isMeshStandardMaterial?C:g).get(Z.envMap||De),je=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,He=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ge=!!K.morphAttributes.position,St=!!K.morphAttributes.normal,Qt=!!K.morphAttributes.color;let Lt=Mi;Z.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Lt=y.toneMapping);const On=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,mt=On!==void 0?On.length:0,Ke=te.get(Z),sa=m.state.lights;if(ue===!0&&(Se===!0||T!==S)){const ln=T===S&&Z.id===H;Ae.setState(Z,T,ln)}let gt=!1;Z.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==sa.state.version||Ke.outputColorSpace!==Fe||Y.isBatchedMesh&&Ke.batching===!1||!Y.isBatchedMesh&&Ke.batching===!0||Y.isInstancedMesh&&Ke.instancing===!1||!Y.isInstancedMesh&&Ke.instancing===!0||Y.isSkinnedMesh&&Ke.skinning===!1||!Y.isSkinnedMesh&&Ke.skinning===!0||Y.isInstancedMesh&&Ke.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ke.instancingColor===!1&&Y.instanceColor!==null||Ke.envMap!==Be||Z.fog===!0&&Ke.fog!==Ee||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==Ae.numPlanes||Ke.numIntersection!==Ae.numIntersection)||Ke.vertexAlphas!==je||Ke.vertexTangents!==He||Ke.morphTargets!==Ge||Ke.morphNormals!==St||Ke.morphColors!==Qt||Ke.toneMapping!==Lt||j.isWebGL2===!0&&Ke.morphTargetsCount!==mt)&&(gt=!0):(gt=!0,Ke.__version=Z.version);let Ai=Ke.currentProgram;gt===!0&&(Ai=Dr(Z,z,Y));let ic=!1,Vs=!1,ra=!1;const Nt=Ai.getUniforms(),wi=Ke.uniforms;if(B.useProgram(Ai.program)&&(ic=!0,Vs=!0,ra=!0),Z.id!==H&&(H=Z.id,Vs=!0),ic||S!==T){Nt.setValue(x,"projectionMatrix",T.projectionMatrix),Nt.setValue(x,"viewMatrix",T.matrixWorldInverse);const ln=Nt.map.cameraPosition;ln!==void 0&&ln.setValue(x,Ne.setFromMatrixPosition(T.matrixWorld)),j.logarithmicDepthBuffer&&Nt.setValue(x,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Nt.setValue(x,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,Vs=!0,ra=!0)}if(Y.isSkinnedMesh){Nt.setOptional(x,Y,"bindMatrix"),Nt.setOptional(x,Y,"bindMatrixInverse");const ln=Y.skeleton;ln&&(j.floatVertexTextures?(ln.boneTexture===null&&ln.computeBoneTexture(),Nt.setValue(x,"boneTexture",ln.boneTexture,M)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Y.isBatchedMesh&&(Nt.setOptional(x,Y,"batchingTexture"),Nt.setValue(x,"batchingTexture",Y._matricesTexture,M));const oa=K.morphAttributes;if((oa.position!==void 0||oa.normal!==void 0||oa.color!==void 0&&j.isWebGL2===!0)&&R.update(Y,K,Ai),(Vs||Ke.receiveShadow!==Y.receiveShadow)&&(Ke.receiveShadow=Y.receiveShadow,Nt.setValue(x,"receiveShadow",Y.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(wi.envMap.value=Be,wi.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Vs&&(Nt.setValue(x,"toneMappingExposure",y.toneMappingExposure),Ke.needsLights&&$d(wi,ra),Ee&&Z.fog===!0&&re.refreshFogUniforms(wi,Ee),re.refreshMaterialUniforms(wi,Z,q,W,we),mo.upload(x,tc(Ke),wi,M)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(mo.upload(x,tc(Ke),wi,M),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Nt.setValue(x,"center",Y.center),Nt.setValue(x,"modelViewMatrix",Y.modelViewMatrix),Nt.setValue(x,"normalMatrix",Y.normalMatrix),Nt.setValue(x,"modelMatrix",Y.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const ln=Z.uniformsGroups;for(let aa=0,Jd=ln.length;aa<Jd;aa++)if(j.isWebGL2){const sc=ln[aa];Ve.update(sc,Ai),Ve.bind(sc,Ai)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ai}function $d(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function Zd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,z,K){te.get(T.texture).__webglTexture=z,te.get(T.depthTexture).__webglTexture=K;const Z=te.get(T);Z.__hasExternalTextures=!0,Z.__hasExternalTextures&&(Z.__autoAllocateDepthBuffer=K===void 0,Z.__autoAllocateDepthBuffer||F.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,z){const K=te.get(T);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,K=0){w=T,D=z,P=K;let Z=!0,Y=null,Ee=!1,De=!1;if(T){const Be=te.get(T);Be.__useDefaultFramebuffer!==void 0?(B.bindFramebuffer(x.FRAMEBUFFER,null),Z=!1):Be.__webglFramebuffer===void 0?M.setupRenderTarget(T):Be.__hasExternalTextures&&M.rebindTextures(T,te.get(T.texture).__webglTexture,te.get(T.depthTexture).__webglTexture);const je=T.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(De=!0);const He=te.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[z])?Y=He[z][K]:Y=He[z],Ee=!0):j.isWebGL2&&T.samples>0&&M.useMultisampledRTT(T)===!1?Y=te.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?Y=He[K]:Y=He,A.copy(T.viewport),X.copy(T.scissor),ee=T.scissorTest}else A.copy(oe).multiplyScalar(q).floor(),X.copy(fe).multiplyScalar(q).floor(),ee=he;if(B.bindFramebuffer(x.FRAMEBUFFER,Y)&&j.drawBuffers&&Z&&B.drawBuffers(T,Y),B.viewport(A),B.scissor(X),B.setScissorTest(ee),Ee){const Be=te.get(T.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+z,Be.__webglTexture,K)}else if(De){const Be=te.get(T.texture),je=z||0;x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,Be.__webglTexture,K||0,je)}H=-1},this.readRenderTargetPixels=function(T,z,K,Z,Y,Ee,De){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Fe=Fe[De]),Fe){B.bindFramebuffer(x.FRAMEBUFFER,Fe);try{const Be=T.texture,je=Be.format,He=Be.type;if(je!==Mn&&ce.convert(je)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ge=He===Qn&&(F.has("EXT_color_buffer_half_float")||j.isWebGL2&&F.has("EXT_color_buffer_float"));if(He!==yi&&ce.convert(He)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_TYPE)&&!(He===gi&&(j.isWebGL2||F.has("OES_texture_float")||F.has("WEBGL_color_buffer_float")))&&!Ge){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-Z&&K>=0&&K<=T.height-Y&&x.readPixels(z,K,Z,Y,ce.convert(je),ce.convert(He),Ee)}finally{const Be=w!==null?te.get(w).__webglFramebuffer:null;B.bindFramebuffer(x.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(T,z,K=0){const Z=Math.pow(2,-K),Y=Math.floor(z.image.width*Z),Ee=Math.floor(z.image.height*Z);M.setTexture2D(z,0),x.copyTexSubImage2D(x.TEXTURE_2D,K,0,0,T.x,T.y,Y,Ee),B.unbindTexture()},this.copyTextureToTexture=function(T,z,K,Z=0){const Y=z.image.width,Ee=z.image.height,De=ce.convert(K.format),Fe=ce.convert(K.type);M.setTexture2D(K,0),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,K.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,K.unpackAlignment),z.isDataTexture?x.texSubImage2D(x.TEXTURE_2D,Z,T.x,T.y,Y,Ee,De,Fe,z.image.data):z.isCompressedTexture?x.compressedTexSubImage2D(x.TEXTURE_2D,Z,T.x,T.y,z.mipmaps[0].width,z.mipmaps[0].height,De,z.mipmaps[0].data):x.texSubImage2D(x.TEXTURE_2D,Z,T.x,T.y,De,Fe,z.image),Z===0&&K.generateMipmaps&&x.generateMipmap(x.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(T,z,K,Z,Y=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ee=T.max.x-T.min.x+1,De=T.max.y-T.min.y+1,Fe=T.max.z-T.min.z+1,Be=ce.convert(Z.format),je=ce.convert(Z.type);let He;if(Z.isData3DTexture)M.setTexture3D(Z,0),He=x.TEXTURE_3D;else if(Z.isDataArrayTexture||Z.isCompressedArrayTexture)M.setTexture2DArray(Z,0),He=x.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,Z.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,Z.unpackAlignment);const Ge=x.getParameter(x.UNPACK_ROW_LENGTH),St=x.getParameter(x.UNPACK_IMAGE_HEIGHT),Qt=x.getParameter(x.UNPACK_SKIP_PIXELS),Lt=x.getParameter(x.UNPACK_SKIP_ROWS),On=x.getParameter(x.UNPACK_SKIP_IMAGES),mt=K.isCompressedTexture?K.mipmaps[Y]:K.image;x.pixelStorei(x.UNPACK_ROW_LENGTH,mt.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,mt.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,T.min.x),x.pixelStorei(x.UNPACK_SKIP_ROWS,T.min.y),x.pixelStorei(x.UNPACK_SKIP_IMAGES,T.min.z),K.isDataTexture||K.isData3DTexture?x.texSubImage3D(He,Y,z.x,z.y,z.z,Ee,De,Fe,Be,je,mt.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),x.compressedTexSubImage3D(He,Y,z.x,z.y,z.z,Ee,De,Fe,Be,mt.data)):x.texSubImage3D(He,Y,z.x,z.y,z.z,Ee,De,Fe,Be,je,mt),x.pixelStorei(x.UNPACK_ROW_LENGTH,Ge),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,St),x.pixelStorei(x.UNPACK_SKIP_PIXELS,Qt),x.pixelStorei(x.UNPACK_SKIP_ROWS,Lt),x.pixelStorei(x.UNPACK_SKIP_IMAGES,On),Y===0&&Z.generateMipmaps&&x.generateMipmap(He),B.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?M.setTextureCube(T,0):T.isData3DTexture?M.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?M.setTexture2DArray(T,0):M.setTexture2D(T,0),B.unbindTexture()},this.resetState=function(){D=0,P=0,w=null,B.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Wl?"display-p3":"srgb",t.unpackColorSpace=st.workingColorSpace===Qo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===It?Xi:rd}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Xi?It:ri}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class qy extends Ad{}qy.prototype.isWebGL1Renderer=!0;class Yy extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Ky{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const kt=new L;class Do{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Nn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Do(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bl extends Ti{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let _s;const Ys=new L,vs=new L,xs=new L,Ms=new Te,Ks=new Te,wd=new rt,so=new L,$s=new L,ro=new L,ih=new Te,$a=new Te,sh=new Te;class rh extends wt{constructor(e=new bl){if(super(),this.isSprite=!0,this.type="Sprite",_s===void 0){_s=new ft;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ky(t,5);_s.setIndex([0,1,2,0,2,3]),_s.setAttribute("position",new Do(i,3,0,!1)),_s.setAttribute("uv",new Do(i,2,3,!1))}this.geometry=_s,this.material=e,this.center=new Te(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vs.setFromMatrixScale(this.matrixWorld),wd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),xs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vs.multiplyScalar(-xs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;oo(so.set(-.5,-.5,0),xs,a,vs,s,r),oo($s.set(.5,-.5,0),xs,a,vs,s,r),oo(ro.set(.5,.5,0),xs,a,vs,s,r),ih.set(0,0),$a.set(1,0),sh.set(1,1);let o=e.ray.intersectTriangle(so,$s,ro,!1,Ys);if(o===null&&(oo($s.set(-.5,.5,0),xs,a,vs,s,r),$a.set(0,1),o=e.ray.intersectTriangle(so,ro,$s,!1,Ys),o===null))return;const l=e.ray.origin.distanceTo(Ys);l<e.near||l>e.far||t.push({distance:l,point:Ys.clone(),uv:hn.getInterpolation(Ys,so,$s,ro,ih,$a,sh,new Te),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function oo(n,e,t,i,s,r){Ms.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Ks.x=r*Ms.x-s*Ms.y,Ks.y=s*Ms.x+r*Ms.y):Ks.copy(Ms),n.copy(e),n.x+=Ks.x,n.y+=Ks.y,n.applyMatrix4(wd)}class oh extends yt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ys=new rt,ah=new rt,ao=[],lh=new Yi,$y=new rt,Zs=new _t,Js=new Ki;class Zy extends _t{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new oh(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,$y)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ys),lh.copy(e.boundingBox).applyMatrix4(ys),this.boundingBox.union(lh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ys),Js.copy(e.boundingSphere).applyMatrix4(ys),this.boundingSphere.union(Js)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Zs.geometry=this.geometry,Zs.material=this.material,Zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Js.copy(this.boundingSphere),Js.applyMatrix4(i),e.ray.intersectsSphere(Js)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ys),ah.multiplyMatrices(i,ys),Zs.matrixWorld=ah,Zs.raycast(e,ao);for(let a=0,o=ao.length;a<o;a++){const l=ao[a];l.instanceId=r,l.object=this,t.push(l)}ao.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new oh(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class na extends Ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ch=new L,uh=new L,hh=new rt,Za=new wr,lo=new Ki;class Sr extends wt{constructor(e=new ft,t=new na){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ch.fromBufferAttribute(t,s-1),uh.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ch.distanceTo(uh);e.setAttribute("lineDistance",new ut(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),lo.copy(i.boundingSphere),lo.applyMatrix4(s),lo.radius+=r,e.ray.intersectsSphere(lo)===!1)return;hh.copy(s).invert(),Za.copy(e.ray).applyMatrix4(hh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new L,u=new L,h=new L,f=new L,p=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){const d=Math.max(0,a.start),b=Math.min(_.count,a.start+a.count);for(let y=d,E=b-1;y<E;y+=p){const D=_.getX(y),P=_.getX(y+1);if(c.fromBufferAttribute(m,D),u.fromBufferAttribute(m,P),Za.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const H=e.ray.origin.distanceTo(f);H<e.near||H>e.far||t.push({distance:H,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,a.start),b=Math.min(m.count,a.start+a.count);for(let y=d,E=b-1;y<E;y+=p){if(c.fromBufferAttribute(m,y),u.fromBufferAttribute(m,y+1),Za.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(f);P<e.near||P>e.far||t.push({distance:P,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const fh=new L,dh=new L;class Jy extends Sr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)fh.fromBufferAttribute(t,s),dh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+fh.distanceTo(dh);e.setAttribute("lineDistance",new ut(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Cd extends Ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ph=new rt,El=new wr,co=new Ki,uo=new L;class Rr extends wt{constructor(e=new ft,t=new Cd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),co.copy(i.boundingSphere),co.applyMatrix4(s),co.radius+=r,e.ray.intersectsSphere(co)===!1)return;ph.copy(s).invert(),El.copy(e.ray).applyMatrix4(ph);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=f,v=p;_<v;_++){const m=c.getX(_);uo.fromBufferAttribute(h,m),mh(uo,m,l,s,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,v=p;_<v;_++)uo.fromBufferAttribute(h,_),mh(uo,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mh(n,e,t,i,s,r,a){const o=El.distanceSqToPoint(n);if(o<t){const l=new L;El.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Rd extends Jt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $l extends ft{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new ut(r,3)),this.setAttribute("normal",new ut(r.slice(),3)),this.setAttribute("uv",new ut(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const y=new L,E=new L,D=new L;for(let P=0;P<t.length;P+=3)p(t[P+0],y),p(t[P+1],E),p(t[P+2],D),l(y,E,D,b)}function l(b,y,E,D){const P=D+1,w=[];for(let H=0;H<=P;H++){w[H]=[];const S=b.clone().lerp(E,H/P),A=y.clone().lerp(E,H/P),X=P-H;for(let ee=0;ee<=X;ee++)ee===0&&H===P?w[H][ee]=S:w[H][ee]=S.clone().lerp(A,ee/X)}for(let H=0;H<P;H++)for(let S=0;S<2*(P-H)-1;S++){const A=Math.floor(S/2);S%2===0?(f(w[H][A+1]),f(w[H+1][A]),f(w[H][A])):(f(w[H][A+1]),f(w[H+1][A+1]),f(w[H+1][A]))}}function c(b){const y=new L;for(let E=0;E<r.length;E+=3)y.x=r[E+0],y.y=r[E+1],y.z=r[E+2],y.normalize().multiplyScalar(b),r[E+0]=y.x,r[E+1]=y.y,r[E+2]=y.z}function u(){const b=new L;for(let y=0;y<r.length;y+=3){b.x=r[y+0],b.y=r[y+1],b.z=r[y+2];const E=m(b)/2/Math.PI+.5,D=d(b)/Math.PI+.5;a.push(E,1-D)}_(),h()}function h(){for(let b=0;b<a.length;b+=6){const y=a[b+0],E=a[b+2],D=a[b+4],P=Math.max(y,E,D),w=Math.min(y,E,D);P>.9&&w<.1&&(y<.2&&(a[b+0]+=1),E<.2&&(a[b+2]+=1),D<.2&&(a[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function p(b,y){const E=b*3;y.x=e[E+0],y.y=e[E+1],y.z=e[E+2]}function _(){const b=new L,y=new L,E=new L,D=new L,P=new Te,w=new Te,H=new Te;for(let S=0,A=0;S<r.length;S+=9,A+=6){b.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),E.set(r[S+6],r[S+7],r[S+8]),P.set(a[A+0],a[A+1]),w.set(a[A+2],a[A+3]),H.set(a[A+4],a[A+5]),D.copy(b).add(y).add(E).divideScalar(3);const X=m(D);v(P,A+0,b,X),v(w,A+2,y,X),v(H,A+4,E,X)}}function v(b,y,E,D){D<0&&b.x===1&&(a[y]=b.x-1),E.x===0&&E.z===0&&(a[y]=D/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.vertices,e.indices,e.radius,e.details)}}class Zl extends $l{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zl(e.radius,e.detail)}}class br extends ft{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let h=e;const f=(t-e)/s,p=new L,_=new Te;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const d=r+m/i*a;p.x=h*Math.cos(d),p.y=h*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,u.push(_.x,_.y)}h+=f}for(let v=0;v<s;v++){const m=v*(i+1);for(let d=0;d<i;d++){const b=d+m,y=b,E=b+i+1,D=b+i+2,P=b+1;o.push(y,E,P),o.push(E,D,P)}}this.setIndex(o),this.setAttribute("position",new ut(l,3)),this.setAttribute("normal",new ut(c,3)),this.setAttribute("uv",new ut(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new br(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Si extends ft{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new L,f=new L,p=[],_=[],v=[],m=[];for(let d=0;d<=i;d++){const b=[],y=d/i;let E=0;d===0&&a===0?E=.5/t:d===i&&l===Math.PI&&(E=-.5/t);for(let D=0;D<=t;D++){const P=D/t;h.x=-e*Math.cos(s+P*r)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(s+P*r)*Math.sin(a+y*o),_.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(P+E,1-y),b.push(c++)}u.push(b)}for(let d=0;d<i;d++)for(let b=0;b<t;b++){const y=u[d][b+1],E=u[d][b],D=u[d+1][b],P=u[d+1][b+1];(d!==0||a>0)&&p.push(y,E,P),(d!==i-1||l<Math.PI)&&p.push(E,D,P)}this.setIndex(p),this.setAttribute("position",new ut(_,3)),this.setAttribute("normal",new ut(v,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Qy extends Ti{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=od,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Pd extends na{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Ld extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Ja=new rt,gh=new L,_h=new L;class eS{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ql,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;gh.setFromMatrixPosition(e.matrixWorld),t.position.copy(gh),_h.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_h),t.updateMatrixWorld(),Ja.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ja)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const vh=new rt,Qs=new L,Qa=new L;class tS extends eS{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Te(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Qs.setFromMatrixPosition(e.matrixWorld),i.position.copy(Qs),Qa.copy(i.position),Qa.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Qa),i.updateMatrixWorld(),s.makeTranslation(-Qs.x,-Qs.y,-Qs.z),vh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vh)}}class nS extends Ld{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new tS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class iS extends Ld{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class sS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=xh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=xh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function xh(){return(typeof performance>"u"?Date:performance).now()}class rS{constructor(e,t,i=0,s=1/0){this.ray=new wr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new jl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Tl(e,this,i,t),i.sort(Mh),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Tl(e[s],this,i,t);return i.sort(Mh),i}}function Mh(n,e){return n.distance-e.distance}function Tl(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const s=n.children;for(let r=0,a=s.length;r<a;r++)Tl(s[r],e,t,!0)}}class yh{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(zt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class oS extends Jy{constructor(e=10,t=10,i=4473924,s=8947848){i=new ze(i),s=new ze(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let f=0,p=0,_=-o;f<=t;f++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const v=f===r?i:s;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const u=new ft;u.setAttribute("position",new ut(l,3)),u.setAttribute("color",new ut(c,3));const h=new na({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gl);const Sh={type:"change"},el={type:"start"},bh={type:"end"},ho=new wr,Eh=new pi,aS=Math.cos(70*Ts.DEG2RAD);class lS extends qi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qi.ROTATE,MIDDLE:Qi.DOLLY,RIGHT:Qi.PAN},this.touches={ONE:es.ROTATE,TWO:es.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",V),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",V),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Sh),i.update(),r=s.NONE},this.update=function(){const R=new L,le=new Ei().setFromUnitVectors(e.up,new L(0,1,0)),ge=le.clone().invert(),ce=new L,be=new Ei,Ve=new L,Ye=2*Math.PI;return function(xe=null){const I=i.object.position;R.copy(I).sub(i.target),R.applyQuaternion(le),o.setFromVector3(R),i.autoRotate&&r===s.NONE&&X(S(xe)),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let _e=i.minAzimuthAngle,ve=i.maxAzimuthAngle;isFinite(_e)&&isFinite(ve)&&(_e<-Math.PI?_e+=Ye:_e>Math.PI&&(_e-=Ye),ve<-Math.PI?ve+=Ye:ve>Math.PI&&(ve-=Ye),_e<=ve?o.theta=Math.max(_e,Math.min(ve,o.theta)):o.theta=o.theta>(_e+ve)/2?Math.max(_e,o.theta):Math.min(ve,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&P||i.object.isOrthographicCamera?o.radius=ie(o.radius):o.radius=ie(o.radius*c),R.setFromSpherical(o),R.applyQuaternion(ge),I.copy(i.target).add(R),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let Ie=!1;if(i.zoomToCursor&&P){let Le=null;if(i.object.isPerspectiveCamera){const Je=R.length();Le=ie(Je*c);const et=Je-Le;i.object.position.addScaledVector(E,et),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Je=new L(D.x,D.y,0);Je.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Ie=!0;const et=new L(D.x,D.y,0);et.unproject(i.object),i.object.position.sub(et).add(Je),i.object.updateMatrixWorld(),Le=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Le!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Le).add(i.object.position):(ho.origin.copy(i.object.position),ho.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(ho.direction))<aS?e.lookAt(i.target):(Eh.setFromNormalAndCoplanarPoint(i.object.up,i.target),ho.intersectPlane(Eh,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Ie=!0);return c=1,P=!1,Ie||ce.distanceToSquared(i.object.position)>a||8*(1-be.dot(i.object.quaternion))>a||Ve.distanceToSquared(i.target)>0?(i.dispatchEvent(Sh),ce.copy(i.object.position),be.copy(i.object.quaternion),Ve.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",de),i.domElement.removeEventListener("pointerdown",te),i.domElement.removeEventListener("pointercancel",g),i.domElement.removeEventListener("wheel",O),i.domElement.removeEventListener("pointermove",M),i.domElement.removeEventListener("pointerup",g),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",V),i._domElementKeyEvents=null)};const i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new yh,l=new yh;let c=1;const u=new L,h=new Te,f=new Te,p=new Te,_=new Te,v=new Te,m=new Te,d=new Te,b=new Te,y=new Te,E=new L,D=new Te;let P=!1;const w=[],H={};function S(R){return R!==null?2*Math.PI/60*i.autoRotateSpeed*R:2*Math.PI/60/60*i.autoRotateSpeed}function A(R){const le=Math.abs(R)/(100*(window.devicePixelRatio|0));return Math.pow(.95,i.zoomSpeed*le)}function X(R){l.theta-=R}function ee(R){l.phi-=R}const pe=function(){const R=new L;return function(ge,ce){R.setFromMatrixColumn(ce,0),R.multiplyScalar(-ge),u.add(R)}}(),N=function(){const R=new L;return function(ge,ce){i.screenSpacePanning===!0?R.setFromMatrixColumn(ce,1):(R.setFromMatrixColumn(ce,0),R.crossVectors(i.object.up,R)),R.multiplyScalar(ge),u.add(R)}}(),G=function(){const R=new L;return function(ge,ce){const be=i.domElement;if(i.object.isPerspectiveCamera){const Ve=i.object.position;R.copy(Ve).sub(i.target);let Ye=R.length();Ye*=Math.tan(i.object.fov/2*Math.PI/180),pe(2*ge*Ye/be.clientHeight,i.object.matrix),N(2*ce*Ye/be.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(pe(ge*(i.object.right-i.object.left)/i.object.zoom/be.clientWidth,i.object.matrix),N(ce*(i.object.top-i.object.bottom)/i.object.zoom/be.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function W(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function q(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function $(R,le){if(!i.zoomToCursor)return;P=!0;const ge=i.domElement.getBoundingClientRect(),ce=R-ge.left,be=le-ge.top,Ve=ge.width,Ye=ge.height;D.x=ce/Ve*2-1,D.y=-(be/Ye)*2+1,E.set(D.x,D.y,1).unproject(i.object).sub(i.object.position).normalize()}function ie(R){return Math.max(i.minDistance,Math.min(i.maxDistance,R))}function oe(R){h.set(R.clientX,R.clientY)}function fe(R){$(R.clientX,R.clientX),d.set(R.clientX,R.clientY)}function he(R){_.set(R.clientX,R.clientY)}function J(R){f.set(R.clientX,R.clientY),p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const le=i.domElement;X(2*Math.PI*p.x/le.clientHeight),ee(2*Math.PI*p.y/le.clientHeight),h.copy(f),i.update()}function ue(R){b.set(R.clientX,R.clientY),y.subVectors(b,d),y.y>0?W(A(y.y)):y.y<0&&q(A(y.y)),d.copy(b),i.update()}function Se(R){v.set(R.clientX,R.clientY),m.subVectors(v,_).multiplyScalar(i.panSpeed),G(m.x,m.y),_.copy(v),i.update()}function we(R){$(R.clientX,R.clientY),R.deltaY<0?q(A(R.deltaY)):R.deltaY>0&&W(A(R.deltaY)),i.update()}function Ce(R){let le=!1;switch(R.code){case i.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?ee(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,i.keyPanSpeed),le=!0;break;case i.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?ee(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,-i.keyPanSpeed),le=!0;break;case i.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?X(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(i.keyPanSpeed,0),le=!0;break;case i.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?X(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(-i.keyPanSpeed,0),le=!0;break}le&&(R.preventDefault(),i.update())}function Ue(R){if(w.length===1)h.set(R.pageX,R.pageY);else{const le=se(R),ge=.5*(R.pageX+le.x),ce=.5*(R.pageY+le.y);h.set(ge,ce)}}function Ne(R){if(w.length===1)_.set(R.pageX,R.pageY);else{const le=se(R),ge=.5*(R.pageX+le.x),ce=.5*(R.pageY+le.y);_.set(ge,ce)}}function Pe(R){const le=se(R),ge=R.pageX-le.x,ce=R.pageY-le.y,be=Math.sqrt(ge*ge+ce*ce);d.set(0,be)}function qe(R){i.enableZoom&&Pe(R),i.enablePan&&Ne(R)}function x(R){i.enableZoom&&Pe(R),i.enableRotate&&Ue(R)}function U(R){if(w.length==1)f.set(R.pageX,R.pageY);else{const ge=se(R),ce=.5*(R.pageX+ge.x),be=.5*(R.pageY+ge.y);f.set(ce,be)}p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const le=i.domElement;X(2*Math.PI*p.x/le.clientHeight),ee(2*Math.PI*p.y/le.clientHeight),h.copy(f)}function F(R){if(w.length===1)v.set(R.pageX,R.pageY);else{const le=se(R),ge=.5*(R.pageX+le.x),ce=.5*(R.pageY+le.y);v.set(ge,ce)}m.subVectors(v,_).multiplyScalar(i.panSpeed),G(m.x,m.y),_.copy(v)}function j(R){const le=se(R),ge=R.pageX-le.x,ce=R.pageY-le.y,be=Math.sqrt(ge*ge+ce*ce);b.set(0,be),y.set(0,Math.pow(b.y/d.y,i.zoomSpeed)),W(y.y),d.copy(b);const Ve=(R.pageX+le.x)*.5,Ye=(R.pageY+le.y)*.5;$(Ve,Ye)}function B(R){i.enableZoom&&j(R),i.enablePan&&F(R)}function Q(R){i.enableZoom&&j(R),i.enableRotate&&U(R)}function te(R){i.enabled!==!1&&(w.length===0&&(i.domElement.setPointerCapture(R.pointerId),i.domElement.addEventListener("pointermove",M),i.domElement.addEventListener("pointerup",g)),Me(R),R.pointerType==="touch"?ae(R):C(R))}function M(R){i.enabled!==!1&&(R.pointerType==="touch"?re(R):k(R))}function g(R){Ae(R),w.length===0&&(i.domElement.releasePointerCapture(R.pointerId),i.domElement.removeEventListener("pointermove",M),i.domElement.removeEventListener("pointerup",g)),i.dispatchEvent(bh),r=s.NONE}function C(R){let le;switch(R.button){case 0:le=i.mouseButtons.LEFT;break;case 1:le=i.mouseButtons.MIDDLE;break;case 2:le=i.mouseButtons.RIGHT;break;default:le=-1}switch(le){case Qi.DOLLY:if(i.enableZoom===!1)return;fe(R),r=s.DOLLY;break;case Qi.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enablePan===!1)return;he(R),r=s.PAN}else{if(i.enableRotate===!1)return;oe(R),r=s.ROTATE}break;case Qi.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enableRotate===!1)return;oe(R),r=s.ROTATE}else{if(i.enablePan===!1)return;he(R),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(el)}function k(R){switch(r){case s.ROTATE:if(i.enableRotate===!1)return;J(R);break;case s.DOLLY:if(i.enableZoom===!1)return;ue(R);break;case s.PAN:if(i.enablePan===!1)return;Se(R);break}}function O(R){i.enabled===!1||i.enableZoom===!1||r!==s.NONE||(R.preventDefault(),i.dispatchEvent(el),we(R),i.dispatchEvent(bh))}function V(R){i.enabled===!1||i.enablePan===!1||Ce(R)}function ae(R){switch(ne(R),w.length){case 1:switch(i.touches.ONE){case es.ROTATE:if(i.enableRotate===!1)return;Ue(R),r=s.TOUCH_ROTATE;break;case es.PAN:if(i.enablePan===!1)return;Ne(R),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(i.touches.TWO){case es.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;qe(R),r=s.TOUCH_DOLLY_PAN;break;case es.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;x(R),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(el)}function re(R){switch(ne(R),r){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;U(R),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;F(R),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;B(R),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Q(R),i.update();break;default:r=s.NONE}}function de(R){i.enabled!==!1&&R.preventDefault()}function Me(R){w.push(R.pointerId)}function Ae(R){delete H[R.pointerId];for(let le=0;le<w.length;le++)if(w[le]==R.pointerId){w.splice(le,1);return}}function ne(R){let le=H[R.pointerId];le===void 0&&(le=new Te,H[R.pointerId]=le),le.set(R.pageX,R.pageY)}function se(R){const le=R.pointerId===w[0]?w[1]:w[0];return H[le]}i.domElement.addEventListener("contextmenu",de),i.domElement.addEventListener("pointerdown",te),i.domElement.addEventListener("pointercancel",g),i.domElement.addEventListener("wheel",O,{passive:!1}),this.update()}}const Dd={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Pr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cS=new xd(-1,1,1,-1,0,1);class uS extends ft{constructor(){super(),this.setAttribute("position",new ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ut([0,2,0,0,2,0],2))}}const hS=new uS;class Ud{constructor(e){this._mesh=new _t(hS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Id extends Pr{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof vt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Lo.clone(e.uniforms),this.material=new vt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ud(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Th extends Pr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class fS extends Pr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class dS{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Te);this._width=i.width,this._height=i.height,t=new En(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Qn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Id(Dd),this.copyPass.material.blending=Jn,this.clock=new sS}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Th!==void 0&&(a instanceof Th?i=!0:a instanceof fS&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class pS extends Pr{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ze}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const mS={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ze(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class zs extends Pr{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new Te(e.x,e.y):new Te(256,256),this.clearColor=new ze(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new En(r,a,{type:Qn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new En(r,a,{type:Qn});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new En(r,a,{type:Qn});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}const o=mS;this.highPassUniforms=Lo.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new vt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Te(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Dd;this.copyUniforms=Lo.clone(u.uniforms),this.blendMaterial=new vt({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Zt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ze,this.oldClearAlpha=1,this.basic=new $i,this.fsQuad=new Ud(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Te(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=zs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=zs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new vt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Te(.5,.5)},direction:{value:new Te(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new vt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}zs.BlurDirectionX=new Te(1,0);zs.BlurDirectionY=new Te(0,1);class Nd extends wt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Te(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const Ss=new L,Ah=new rt,wh=new rt,Ch=new L,Rh=new L;class gS{constructor(e={}){const t=this;let i,s,r,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(p,_){p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Ah.copy(_.matrixWorldInverse),wh.multiplyMatrices(_.projectionMatrix,Ah),c(p,p,_),f(p)},this.setSize=function(p,_){i=p,s=_,r=i/2,a=s/2,l.style.width=p+"px",l.style.height=_+"px"};function c(p,_,v){if(p.isCSS2DObject){Ss.setFromMatrixPosition(p.matrixWorld),Ss.applyMatrix4(wh);const m=p.visible===!0&&Ss.z>=-1&&Ss.z<=1&&p.layers.test(v.layers)===!0;if(p.element.style.display=m===!0?"":"none",m===!0){p.onBeforeRender(t,_,v);const b=p.element;b.style.transform="translate("+-100*p.center.x+"%,"+-100*p.center.y+"%)translate("+(Ss.x*r+r)+"px,"+(-Ss.y*a+a)+"px)",b.parentNode!==l&&l.appendChild(b),p.onAfterRender(t,_,v)}const d={distanceToCameraSquared:u(v,p)};o.objects.set(p,d)}for(let m=0,d=p.children.length;m<d;m++)c(p.children[m],_,v)}function u(p,_){return Ch.setFromMatrixPosition(p.matrixWorld),Rh.setFromMatrixPosition(_.matrixWorld),Ch.distanceToSquared(Rh)}function h(p){const _=[];return p.traverse(function(v){v.isCSS2DObject&&_.push(v)}),_}function f(p){const _=h(p).sort(function(m,d){if(m.renderOrder!==d.renderOrder)return d.renderOrder-m.renderOrder;const b=o.objects.get(m).distanceToCameraSquared,y=o.objects.get(d).distanceToCameraSquared;return b-y}),v=_.length;for(let m=0,d=_.length;m<d;m++)_[m].element.style.zIndex=v-m}}}const Ut=Math.PI*2,yn=10,ti=.04,ia=Math.PI/180,vi=1495978707e-1;function Fd(n,e){const t=n.a*yn,i=n.e||0,s=t*Math.sqrt(1-i*i),r=t*(Math.cos(e)-i),a=s*Math.sin(e),o=(n.inc||0)*ia;return new L(r,-a*Math.sin(o),a*Math.cos(o))}function Ph(n,e){n=(n%Ut+Ut)%Ut;let t=e<.8?n:Math.PI;for(let i=0;i<6;i++)t-=(t-e*Math.sin(t)-n)/(1-e*Math.cos(t));return t}function Od(n,e){const t=n.eMoon||0,i=n.aMoon,s=i*Math.sqrt(1-t*t),r=i*(Math.cos(e)-t),a=s*Math.sin(e),o=(n.incMoon||0)*ia;return new L(r,-a*Math.sin(o),a*Math.cos(o))}function Uo(n){let e=0;for(let t=0;t<n.length;t++)e=e*31+n.charCodeAt(t)|0;return Math.abs(e)}function _S(n){return n>vi*.02?`${(n/vi).toFixed(n>vi?3:5)} AU · ${(n/vi*499.0048/60).toFixed(1)} 光分`:n>1e5?`${Math.round(n).toLocaleString()} km · ${(n/299792.458).toFixed(2)} 光秒`:`${n.toFixed(n<100?1:0)} km`}const Bd=`
      float hash11(float p){p=fract(p*.1031);p*=p+33.33;p*=p+p;return fract(p);}
      float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
      vec3 hash33(vec3 p){p=fract(p*vec3(.1031,.103,.0973));p+=dot(p,p.yxz+33.33);return fract((p.xxy+p.yxx)*p.zyx);}
      float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(dot(hash33(i+vec3(0,0,0))-.5,f-vec3(0,0,0)),dot(hash33(i+vec3(1,0,0))-.5,f-vec3(1,0,0)),f.x),mix(dot(hash33(i+vec3(0,1,0))-.5,f-vec3(0,1,0)),dot(hash33(i+vec3(1,1,0))-.5,f-vec3(1,1,0)),f.x),f.y),mix(mix(dot(hash33(i+vec3(0,0,1))-.5,f-vec3(0,0,1)),dot(hash33(i+vec3(1,0,1))-.5,f-vec3(1,0,1)),f.x),mix(dot(hash33(i+vec3(0,1,1))-.5,f-vec3(0,1,1)),dot(hash33(i+vec3(1,1,1))-.5,f-vec3(1,1,1)),f.x),f.y),f.z)*1.8+.5;}
      float fbm(vec3 p){float f=0.,a=.52;mat3 m=mat3(.00,.80,.60,-.80,.36,-.48,-.60,-.48,.64);for(int i=0;i<6;i++){f+=a*noise3(p);p=m*p*2.03+vec3(7.1,1.7,3.4);a*=.5;}return f;}
      float turb(vec3 p){float f=0.,a=.55;for(int i=0;i<6;i++){f+=a*abs(noise3(p)*2.-1.);p=p*2.08+vec3(2.3,4.1,1.7);a*=.5;}return f;}
      float cells(vec2 P){vec2 I=floor(P),F=fract(P);float d=9.;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 r=o+vec2(hash21(I+o),hash21(I+o+17.4))-F;d=min(d,dot(r,r));}return sqrt(d);}
      mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
      float oval(vec2 p,vec2 c,vec2 s){vec2 d=p-c;d.x=atan(sin(d.x),cos(d.x));return length(d/s);}
    `,vS=`
      varying vec3 vPos; varying vec3 vWorld; varying vec3 vNormal;
      void main(){vPos=normalize(position);vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;vNormal=normalize(transpose(inverse(mat3(modelMatrix)))*normal);gl_Position=projectionMatrix*viewMatrix*w;}
    `,xS=`
      precision highp float; uniform float uTime,uSeed;uniform int uType;uniform vec3 uTint;uniform vec3 uSun;varying vec3 vPos,vWorld,vNormal;
      ${Bd}
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
    `,MS="varying vec3 n,w;void main(){n=normalize(transpose(inverse(mat3(modelMatrix)))*normal);w=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);}",yS="uniform vec3 c;uniform float power,intensity;varying vec3 n,w;void main(){vec3 v=normalize(cameraPosition-w);float f=pow(1.-abs(dot(normalize(n),v)),power);gl_FragColor=vec4(c*f*intensity,f*.62);}",SS={uniforms:{tDiffuse:{value:null},time:{value:0},enabled:{value:1}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform sampler2D tDiffuse;uniform float time,enabled;varying vec2 vUv;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))+time)*43758.5453);}void main(){vec2 d=vUv-.5;float ca=.00125*dot(d,d)*enabled;vec3 c;c.r=texture2D(tDiffuse,vUv+d*ca).r;c.g=texture2D(tDiffuse,vUv).g;c.b=texture2D(tDiffuse,vUv-d*ca).b;float lum=dot(c,vec3(.299,.587,.114));vec3 graded=mix(c,vec3(c.r*1.035,c.g*.995,c.b*1.06),.72*enabled);graded+=vec3(-.012,-.006,.018)*(1.-smoothstep(.04,.55,lum))*enabled;graded+=mix(vec3(.008,.002,.012),vec3(.001,.008,.022),vUv.y)*(1.-smoothstep(.005,.08,lum))*.45*enabled;graded*=1.-dot(d,d)*.28*enabled;graded+=(h(gl_FragCoord.xy)-.5)/255.*enabled;gl_FragColor=vec4(graded,1.);}"},Io=[{id:"sun",cn:"太阳",en:"Sun",type:"恒星",shader:0,r:109.1,diameter:1392700,a:0,rot:25.38,period:0,temp:"约 5,500°C（光球层）",moons:"8 颗行星",desc:"炽热的G型主序星，动态磁场持续塑造日冕、太阳风与整个行星际空间。"},{id:"mercury",cn:"水星",en:"Mercury",type:"行星",shader:1,r:.383,diameter:4879,a:.387,e:.2056,inc:7,rot:58.65,period:.2408,temp:"−173°C — 427°C",moons:0,color:11184291},{id:"venus",cn:"金星",en:"Venus",type:"行星",shader:2,r:.949,diameter:12104,a:.723,e:.0068,inc:3.39,rot:-243,period:.6152,temp:"约 462°C",moons:0,color:15251549,atmo:[16765034,1.045,2.6,1]},{id:"earth",cn:"地球",en:"Earth",type:"行星",shader:3,r:1,diameter:12742,a:1,e:.0167,inc:0,tilt:23.44,rot:.997,period:1,temp:"−89°C — 58°C",moons:1,color:5154303,atmo:[5029119,1.055,3.2,1.25]},{id:"mars",cn:"火星",en:"Mars",type:"行星",shader:5,r:.532,diameter:6779,a:1.524,e:.0934,inc:1.85,tilt:25.19,rot:1.026,period:1.881,temp:"−125°C — 20°C",moons:2,color:13129259,atmo:[13990231,1.035,2.5,.35]},{id:"jupiter",cn:"木星",en:"Jupiter",type:"行星",shader:6,r:11.21,diameter:139820,a:5.204,e:.0489,inc:1.3,tilt:3.13,rot:.414,period:11.862,temp:"约 −145°C（云顶）",moons:95,color:14259803,desc:"太阳系最大行星。高速纬向急流围绕大红斑与众多次级涡旋持续翻卷。"},{id:"saturn",cn:"土星",en:"Saturn",type:"行星",shader:7,r:9.45,diameter:116460,a:9.583,e:.0565,inc:2.49,tilt:26.73,rot:.444,period:29.457,temp:"约 −178°C（云顶）",moons:146,color:15255938},{id:"uranus",cn:"天王星",en:"Uranus",type:"行星",shader:8,r:4.01,diameter:50724,a:19.191,e:.0472,inc:.77,tilt:97.77,rot:-.718,period:84.01,temp:"约 −224°C",moons:28,color:8575190,atmo:[6543323,1.035,3,.35]},{id:"neptune",cn:"海王星",en:"Neptune",type:"行星",shader:9,r:3.88,diameter:49244,a:30.07,e:.0086,inc:1.77,tilt:28.32,rot:.671,period:164.8,temp:"约 −214°C",moons:16,color:2383336,atmo:[2580457,1.035,3,.38]},{id:"ceres",cn:"谷神星",en:"Ceres",type:"矮行星",shader:30,r:.074,display:.095,diameter:940,a:2.767,e:.0758,inc:10.59,rot:.378,period:4.61,temp:"约 −105°C",moons:0,color:7829367},{id:"pluto",cn:"冥王星",en:"Pluto",type:"矮行星",shader:10,r:.186,display:.26,diameter:2377,a:39.482,e:.2488,inc:17.16,tilt:119.6,rot:-6.387,period:248,temp:"−240°C — −218°C",moons:5,color:13150855,desc:"冰岩矮行星。赤道附近巨大的心形汤博区由挥发性氮冰平原构成。"},{id:"eris",cn:"阋神星",en:"Eris",type:"矮行星",shader:31,r:.182,display:.23,diameter:2326,a:67.78,e:.4407,inc:44.04,rot:1.08,period:559,temp:"约 −243°C",moons:1,color:16053492},{id:"makemake",cn:"鸟神星",en:"Makemake",type:"矮行星",shader:32,r:.112,display:.19,diameter:1430,a:45.79,e:.1613,inc:28.98,rot:.951,period:306,temp:"约 −239°C",moons:1,color:11163452},{id:"haumea",cn:"妊神星",en:"Haumea",type:"矮行星",shader:33,r:.128,display:.19,diameter:1632,a:43.13,e:.1913,inc:28.19,rot:.163,period:284,temp:"约 −241°C",moons:2,color:12303291,scale:[1.75,.73,.72]},{id:"gonggong",cn:"共工星",en:"Gonggong",type:"矮行星候选体",shader:34,r:.097,display:.17,diameter:1230,a:67.49,e:.503,inc:30.74,rot:.93,period:554,temp:"约 −240°C",moons:1,color:8530204},{id:"quaoar",cn:"创神星",en:"Quaoar",type:"矮行星候选体",shader:35,r:.087,display:.16,diameter:1110,a:43.69,e:.039,inc:7.99,rot:.737,period:289,temp:"约 −235°C",moons:1,color:10309685},{id:"orcus",cn:"亡神星",en:"Orcus",type:"矮行星候选体",shader:36,r:.072,display:.15,diameter:910,a:39.17,e:.227,inc:20.59,rot:.433,period:245,temp:"约 −230°C",moons:1,color:12369084},{id:"ixion",cn:"厄耳枯斯",en:"Ixion",type:"矮行星候选体",shader:37,r:.055,display:.14,diameter:710,a:39.67,e:.244,inc:19.62,rot:"未知",period:250,temp:"约 −230°C",moons:0,color:7418658},{id:"sedna",cn:"塞德娜",en:"Sedna",type:"远日矮行星候选体",shader:48,r:.078,display:.18,diameter:995,a:506.8,e:.8496,inc:11.93,rot:.42,period:11390,temp:"约 −261°C",moons:0,color:10170135,desc:"目前已知近日点最遥远的太阳系天体之一，暗红表面可能富含托林有机物。"},{id:"ms4",cn:"2002 MS₄",en:"2002 MS4",aliases:"MS4",type:"矮行星候选体",shader:42,r:.063,display:.145,diameter:800,a:41.8,e:.141,inc:17.7,rot:.33,period:270,temp:"约 −235°C",moons:0,color:10201258},{id:"salacia",cn:"潫神星",en:"Salacia",type:"矮行星候选体",shader:45,r:.067,display:.15,diameter:846,a:42.18,e:.106,inc:23.9,rot:.25,period:274,temp:"约 −236°C",moons:1,color:7418913},{id:"varda",cn:"瓦尔妲星",en:"Varda",type:"矮行星候选体",shader:42,r:.058,display:.14,diameter:740,a:46.1,e:.14,inc:21.5,rot:.245,period:313,temp:"约 −238°C",moons:1,color:11971232},{id:"varuna",cn:"伐楼拿星",en:"Varuna",type:"海王星外天体",shader:48,r:.052,display:.135,diameter:668,a:43.2,e:.051,inc:17.2,rot:.264,period:284,temp:"约 −236°C",moons:0,color:9978409,scale:[1.35,.88,.88]},{id:"arrokoth",cn:"天涯海角",en:"Arrokoth",aliases:"阿罗科斯 2014 MU69",type:"柯伊伯带小天体",shader:48,r:.003,display:.085,diameter:36,a:44.58,e:.041,inc:2.45,rot:.663,period:298,temp:"约 −230°C",moons:0,color:9186584,bilobed:!0,irregular:!0,desc:"新视野号飞掠的接触双星，两个原始小天体以极低速柔和结合。"},{id:"juno",cn:"婚神星",en:"Juno",type:"小行星",shader:40,r:.018,display:.085,diameter:234,a:2.67,e:.257,inc:12.99,rot:.3,period:4.36,temp:"约 −110°C",moons:0,color:9142647,irregular:!0},{id:"hebe",cn:"韶神星",en:"6 Hebe",aliases:"青春女神星",type:"小行星",shader:40,r:.015,display:.08,diameter:186,a:2.426,e:.202,inc:14.75,rot:.303,period:3.78,temp:"约 −118°C",moons:0,color:9075307,irregular:!0},{id:"hygiea",cn:"健神星",en:"Hygiea",type:"小行星",shader:41,r:.034,display:.092,diameter:434,a:3.14,e:.112,inc:3.84,rot:.575,period:5.56,temp:"约 −160°C",moons:0,color:5130564,irregular:!0},{id:"psyche",cn:"灵神星",en:"16 Psyche",aliases:"普绪克",type:"金属小行星",shader:46,r:.017,display:.082,diameter:226,a:2.92,e:.134,inc:3.1,rot:.174,period:4.99,temp:"约 −170°C — 40°C",moons:0,color:10258029,irregular:!0},{id:"eros",cn:"爱神星",en:"Eros",type:"近地小行星",shader:40,r:.0013,display:.07,diameter:16.8,a:1.458,e:.223,inc:10.83,rot:.219,period:1.76,temp:"约 −150°C — 100°C",moons:0,color:9335645,irregular:!0,scale:[1.7,.68,.65]},{id:"bennu",cn:"贝努",en:"Bennu",type:"近地小行星",shader:41,r:39e-6,display:.062,diameter:.492,a:1.126,e:.204,inc:6.03,rot:.179,period:1.195,temp:"约 −37°C — 127°C",moons:0,color:4209978,irregular:!0},{id:"hektor",cn:"赫克托",en:"624 Hektor",type:"木星特洛伊小行星",shader:45,r:.018,display:.09,diameter:225,a:5.22,e:.024,inc:18.2,rot:.288,period:11.94,temp:"约 −150°C",moons:1,color:7881261,irregular:!0,bilobed:!0},{id:"phaethon",cn:"法厄同",en:"Phaethon",type:"活跃小行星",shader:47,r:46e-5,display:.068,diameter:5.8,a:1.271,e:.89,inc:22.26,rot:.15,period:1.433,temp:"近日点约 750°C",moons:0,color:4866104,irregular:!0},{id:"chiron",cn:"喀戎",en:"Chiron",type:"半人马小行星",shader:47,r:.017,display:.082,diameter:218,a:13.64,e:.383,inc:6.93,rot:.246,period:50.3,temp:"约 −185°C",moons:0,color:5918792,irregular:!0},{id:"chariklo",cn:"女凯龙星",en:"Chariklo",type:"半人马小行星",shader:41,r:.02,display:.086,diameter:258,a:15.8,e:.172,inc:23.4,rot:.292,period:62.8,temp:"约 −198°C",moons:0,color:6445908,irregular:!0,hasRing:!0},{id:"pholus",cn:"人龙星",en:"Pholus",type:"半人马小行星",shader:48,r:.015,display:.078,diameter:190,a:20.3,e:.571,inc:24.7,rot:.416,period:91.5,temp:"约 −210°C",moons:0,color:10305313,irregular:!0},{id:"halley",cn:"哈雷彗星",en:"1P/Halley",aliases:"Halley",type:"周期彗星",shader:47,r:86e-5,display:.072,diameter:11,a:17.834,e:.9671,inc:162.26,rot:2.2,period:75.3,temp:"随日距剧烈变化",moons:0,color:5591115,irregular:!0,comet:!0,retro:!0},{id:"encke",cn:"恩克彗星",en:"2P/Encke",type:"周期彗星",shader:47,r:37e-5,display:.064,diameter:4.8,a:2.215,e:.848,inc:11.8,rot:.47,period:3.3,temp:"随日距剧烈变化",moons:0,color:4735807,irregular:!0,comet:!0},{id:"churyumov",cn:"丘留莫夫－格拉西缅科",en:"67P/Churyumov–Gerasimenko",aliases:"67P 罗塞塔",type:"周期彗星",shader:47,r:32e-5,display:.064,diameter:4.1,a:3.463,e:.641,inc:7.04,rot:.517,period:6.45,temp:"随日距剧烈变化",moons:0,color:4604478,irregular:!0,comet:!0,bilobed:!0},{id:"halebopp",cn:"海尔－波普彗星",en:"C/1995 O1 Hale–Bopp",aliases:"Hale-Bopp",type:"长周期彗星",shader:47,r:.0047,display:.078,diameter:60,a:186,e:.995,inc:89.4,rot:.49,period:2533,temp:"随日距剧烈变化",moons:0,color:6117200,irregular:!0,comet:!0}],Al=[{id:"moon",parent:"earth",cn:"月球",en:"Moon",type:"卫星",shader:4,r:.273,display:.035,diameter:3475,aMoon:.19,rot:27.32,periodDays:27.32,temp:"−173°C — 127°C",moons:0,color:11184810},{id:"io",parent:"jupiter",cn:"木卫一",en:"Io",aliases:"伊奥",type:"卫星",shader:20,r:.286,display:.075,diameter:3643,aMoon:.78,rot:1.769,periodDays:1.769,temp:"约 −143°C",moons:0,color:15308584},{id:"europa",parent:"jupiter",cn:"木卫二",en:"Europa",aliases:"欧罗巴",type:"卫星",shader:21,r:.245,display:.065,diameter:3122,aMoon:1.08,rot:3.551,periodDays:3.551,temp:"约 −160°C",moons:0,color:14999498},{id:"ganymede",parent:"jupiter",cn:"木卫三",en:"Ganymede",aliases:"盖尼米得",type:"卫星",shader:22,r:.413,display:.095,diameter:5268,aMoon:1.48,rot:7.155,periodDays:7.155,temp:"约 −163°C",moons:0,color:8615528},{id:"callisto",parent:"jupiter",cn:"木卫四",en:"Callisto",aliases:"卡里斯托",type:"卫星",shader:23,r:.378,display:.087,diameter:4821,aMoon:2,rot:16.69,periodDays:16.69,temp:"约 −139°C",moons:0,color:4999490},{id:"titan",parent:"saturn",cn:"土卫六",en:"Titan",aliases:"泰坦",type:"卫星",shader:24,r:.404,display:.1,diameter:5150,aMoon:1.75,rot:15.95,periodDays:15.95,temp:"约 −179°C",moons:0,color:13136676,atmo:[15764015,1.11,2.2,.8]},{id:"enceladus",parent:"saturn",cn:"土卫二",en:"Enceladus",aliases:"恩克拉多斯",type:"卫星",shader:25,r:.0395,display:.052,diameter:504,aMoon:.95,rot:1.37,periodDays:1.37,temp:"约 −201°C",moons:0,color:15399167},{id:"mimas",parent:"saturn",cn:"土卫一",en:"Mimas",aliases:"弥玛斯",type:"卫星",shader:26,r:.031,display:.048,diameter:396,aMoon:.67,rot:.942,periodDays:.942,temp:"约 −209°C",moons:0,color:9605778},{id:"iapetus",parent:"saturn",cn:"土卫八",en:"Iapetus",aliases:"伊阿珀托斯",type:"卫星",shader:27,r:.115,display:.07,diameter:1469,aMoon:2.7,distanceKm:3560820,rot:79.32,periodDays:79.32,temp:"约 −143°C",moons:0,color:10063992},{id:"phobos",parent:"mars",cn:"火卫一",en:"Phobos",type:"卫星",shader:41,r:.0018,display:.042,diameter:22.5,aMoon:.13,distanceKm:9376,rot:.319,periodDays:.319,temp:"约 −112°C",moons:0,color:5326911,irregular:!0},{id:"deimos",parent:"mars",cn:"火卫二",en:"Deimos",type:"卫星",shader:41,r:.001,display:.034,diameter:12.4,aMoon:.205,distanceKm:23463,rot:1.263,periodDays:1.263,temp:"约 −40°C",moons:0,color:7102547,irregular:!0},{id:"amalthea",parent:"jupiter",cn:"木卫五",en:"Amalthea",type:"卫星",shader:45,r:.013,display:.048,diameter:167,aMoon:.55,distanceKm:181366,rot:.498,periodDays:.498,temp:"约 −148°C",moons:0,color:8202265,scale:[1.55,.8,.75]},{id:"tethys",parent:"saturn",cn:"土卫三",en:"Tethys",type:"卫星",shader:42,r:.083,display:.058,diameter:1062,aMoon:.84,distanceKm:294619,rot:1.888,periodDays:1.888,temp:"约 −187°C",moons:0,color:14476774},{id:"dione",parent:"saturn",cn:"土卫四",en:"Dione",type:"卫星",shader:42,r:.088,display:.061,diameter:1123,aMoon:1.1,distanceKm:377396,rot:2.737,periodDays:2.737,temp:"约 −186°C",moons:0,color:13621466},{id:"rhea",parent:"saturn",cn:"土卫五",en:"Rhea",type:"卫星",shader:42,r:.12,display:.068,diameter:1528,aMoon:1.38,distanceKm:527108,rot:4.518,periodDays:4.518,temp:"约 −174°C",moons:0,color:13160658},{id:"hyperion",parent:"saturn",cn:"土卫七",en:"Hyperion",type:"卫星",shader:40,r:.021,display:.05,diameter:270,aMoon:2.16,distanceKm:1481009,rot:13,periodDays:21.28,temp:"约 −180°C",moons:0,color:8285528,irregular:!0,scale:[1.35,.9,.78]},{id:"miranda",parent:"uranus",cn:"天卫五",en:"Miranda",type:"卫星",shader:44,r:.037,display:.05,diameter:472,aMoon:.49,distanceKm:129390,rot:1.413,periodDays:1.413,temp:"约 −213°C",moons:0,color:11185840},{id:"ariel",parent:"uranus",cn:"天卫一",en:"Ariel",type:"卫星",shader:42,r:.091,display:.06,diameter:1158,aMoon:.67,distanceKm:190900,rot:2.52,periodDays:2.52,temp:"约 −213°C",moons:0,color:12963536},{id:"umbriel",parent:"uranus",cn:"天卫二",en:"Umbriel",type:"卫星",shader:49,r:.092,display:.06,diameter:1169,aMoon:.84,distanceKm:266e3,rot:4.144,periodDays:4.144,temp:"约 −198°C",moons:0,color:5461849},{id:"titania",parent:"uranus",cn:"天卫三",en:"Titania",type:"卫星",shader:42,r:.124,display:.068,diameter:1578,aMoon:1.05,distanceKm:436300,rot:8.706,periodDays:8.706,temp:"约 −203°C",moons:0,color:12108227},{id:"oberon",parent:"uranus",cn:"天卫四",en:"Oberon",type:"卫星",shader:49,r:.119,display:.067,diameter:1523,aMoon:1.28,distanceKm:583500,rot:13.46,periodDays:13.46,temp:"约 −198°C",moons:0,color:7830396},{id:"proteus",parent:"neptune",cn:"海卫八",en:"Proteus",type:"卫星",shader:41,r:.033,display:.049,diameter:420,aMoon:.5,distanceKm:117647,rot:1.122,periodDays:1.122,temp:"约 −222°C",moons:0,color:5132112,irregular:!0},{id:"triton",parent:"neptune",cn:"海卫一",en:"Triton",aliases:"崔顿 催顿",type:"卫星",shader:43,r:.212,display:.082,diameter:2707,aMoon:.78,distanceKm:354759,incMoon:157.3,retro:!0,rot:-5.877,periodDays:5.877,temp:"约 −235°C",moons:0,color:14268076,desc:"逆行轨道揭示它很可能是被海王星俘获的柯伊伯带天体，表面存在氮冰喷泉。"},{id:"nereid",parent:"neptune",cn:"海卫二",en:"Nereid",type:"卫星",shader:42,r:.027,display:.046,diameter:340,aMoon:1.32,eMoon:.751,distanceKm:5513818,incMoon:7.2,rot:11.6,periodDays:360.1,temp:"约 −220°C",moons:0,color:11450298},{id:"charon",parent:"pluto",cn:"冥卫一",en:"Charon",aliases:"卡戎",type:"卫星",shader:49,r:.095,display:.09,diameter:1212,aMoon:.48,distanceKm:19596,incMoon:0,rot:6.387,periodDays:6.387,temp:"约 −220°C",moons:0,color:9081492,desc:"相对冥王星异常巨大的伴星，两者围绕位于冥王星外部的共同质心旋转。"},{id:"dysnomia",parent:"eris",cn:"阋卫一",en:"Dysnomia",type:"卫星",shader:41,r:.055,display:.048,diameter:700,aMoon:.43,distanceKm:37350,rot:15.8,periodDays:15.8,temp:"约 −243°C",moons:0,color:7829367},{id:"hiiaka",parent:"haumea",cn:"妊卫一",en:"Hiʻiaka",type:"卫星",shader:42,r:.025,display:.045,diameter:320,aMoon:.48,distanceKm:49880,rot:49.5,periodDays:49.5,temp:"约 −240°C",moons:0,color:14081248},{id:"namaka",parent:"haumea",cn:"妊卫二",en:"Namaka",type:"卫星",shader:42,r:.013,display:.038,diameter:170,aMoon:.31,distanceKm:25657,incMoon:13,rot:18.3,periodDays:18.3,temp:"约 −240°C",moons:0,color:12831696},{id:"mk2",parent:"makemake",cn:"鸟卫一",en:"S/2015 (136472) 1",aliases:"MK2",type:"卫星",shader:41,r:.014,display:.04,diameter:175,aMoon:.37,distanceKm:21e3,rot:12.4,periodDays:12.4,temp:"约 −239°C",moons:0,color:4473150},{id:"weywot",parent:"quaoar",cn:"创卫一",en:"Weywot",type:"卫星",shader:45,r:.013,display:.04,diameter:170,aMoon:.34,eMoon:.14,distanceKm:14500,rot:12.4,periodDays:12.4,temp:"约 −235°C",moons:0,color:6959142},{id:"vanth",parent:"orcus",cn:"亡卫一",en:"Vanth",type:"卫星",shader:49,r:.035,display:.047,diameter:440,aMoon:.34,distanceKm:9e3,rot:9.54,periodDays:9.54,temp:"约 −230°C",moons:0,color:8550254},{id:"xiangliu",parent:"gonggong",cn:"相柳",en:"Xiangliu",type:"卫星",shader:45,r:.008,display:.037,diameter:100,aMoon:.38,eMoon:.29,distanceKm:24e3,rot:25.2,periodDays:25.2,temp:"约 −240°C",moons:0,color:6500385}];function Jl(n,e=16777215){return new vt({vertexShader:vS,fragmentShader:xS,uniforms:{uTime:{value:0},uSeed:{value:Math.random()*100},uType:{value:n},uTint:{value:new ze(e)},uSun:{value:new L}},extensions:{derivatives:!0}})}const zd=(n,e=3,t=1)=>new vt({transparent:!0,depthWrite:!1,blending:Zt,side:Kt,vertexShader:MS,fragmentShader:yS,uniforms:{c:{value:new ze(n)},power:{value:e},intensity:{value:t}}});function Hd(n,e,t=!1,i=null){const s=[];for(let c=0;c<=256;c++){let u=Ut*c/256;t?s.push(Od(e,u)):s.push(Fd(e,u))}const r=new ft().setFromPoints(s),a=e.type.includes("矮")||e.type.includes("彗星")||e.type.includes("小行星")||e.type.includes("海王星外"),o=new Pd({color:e.color||5400444,transparent:!0,opacity:a?.15:.34,dashSize:t?.05:a?.3:.18,gapSize:t?.035:a?.25:.12,depthWrite:!1}),l=new Sr(r,o);return l.computeLineDistances(),l.userData.owner=e.id,l.userData.baseOpacity=o.opacity,(i||n.scene).add(l),n.orbitLines.push(l),l}function Vd(n,e,t=""){const i=document.createElement("div");i.className="celestial-label "+t,i.textContent=e.cn+" · "+e.en;const s=new Nd(i);return s.position.set(0,(e.display||e.r*ti)+.12,0),n.add(s),n.userData.label=s,s}function Gd(n,e,t=.16){const i=n.attributes.position;for(let s=0;s<i.count;s++){const r=.5+.5*Math.sin(s*91.73+e*17.1)*Math.sin(s*17.31+e),a=new L().fromBufferAttribute(i,s).multiplyScalar(1+(r-.5)*t);i.setXYZ(s,a.x,a.y,a.z)}i.needsUpdate=!0,n.computeVertexNormals()}function kd(n){const e=new Zl(.055,1),t=e.attributes.position;for(let i=0;i<t.count;i++){const s=Math.sin(i*12.9898+n*7.31)*43758.5453%1,r=.62+Math.abs(s)*.56;t.setXYZ(i,t.getX(i)*r,t.getY(i)*r,t.getZ(i)*r)}return e.computeVertexNormals(),e}function Wd(n,e){const t=e.display||e.r*ti,i=e.shader===0?96:t<.07?28:Math.min(64,36+Math.floor(t*18)),s=new Si(t,i,Math.max(18,i/2));e.irregular&&Gd(s,Uo(e.id),.28);const r=new _t(s,Jl(e.shader,e.color));r.name=e.cn,r.userData.body=e,r.renderOrder=e.shader===0?2:1;const a=new _i;if(a.userData.body=e,a.add(r),a.rotation.z=(e.tilt||0)*ia,e.scale&&r.scale.set(...e.scale),e.bilobed){r.scale.set(.68,.64,.62),r.position.x=-t*.34;const l=new _t(s.clone(),r.material);l.scale.set(.47,.52,.49),l.position.x=t*.72,l.userData.body=e,r.add(l),n.selectable.push(l)}n.scene.add(a),e.node=a,e.mesh=r,n.objects.set(e.id,e),n.selectable.push(r);const o=Math.max(t,t<.12?.12:t*1.06);if(o>t*1.2){const l=new _t(new Si(o,12,8),new $i({transparent:!0,opacity:0,depthWrite:!1}));l.userData.body=e,a.add(l),n.selectable.push(l)}if(Vd(a,e,e.type.includes("矮")||e.a>30?"dwarf":""),e.a>0&&(e.orbitLine=Hd(n,e)),e.atmo){const l=new _t(new Si(t*e.atmo[1],48,32),zd(e.atmo[0],e.atmo[2],e.atmo[3]));a.add(l),n.atmospheres.push(l),e.atmosphere=l}return e}function bS(n,e){const t=n.objects.get(e.parent),i=e.display||e.r*ti,s=new Si(i,i<.05?24:36,20);e.irregular&&Gd(s,Uo(e.id),.3);const r=new _t(s,Jl(e.shader,e.color));r.userData.body=e,r.name=e.cn,e.scale&&r.scale.set(...e.scale);const a=new _i;a.add(r),t.node.add(a),e.node=a,e.mesh=r,n.objects.set(e.id,e),n.selectable.push(r);const o=new _t(new Si(Math.max(i,.055),10,8),new $i({transparent:!0,opacity:0,depthWrite:!1}));if(o.userData.body=e,a.add(o),n.selectable.push(o),Vd(a,e,"moon"),e.orbitLine=Hd(n,e,!0,t.node),e.atmo){const l=new _t(new Si(i*e.atmo[1],36,22),zd(e.atmo[0],e.atmo[2],e.atmo[3]));a.add(l),n.atmospheres.push(l),e.atmosphere=l}return e}function ES(n){Io.forEach(e=>Wd(n,e)),Al.forEach(e=>bS(n,e))}function Lh(n,e,t,i,s,r,a,o,l){const c={id:e,cn:t,en:i,type:"小行星",shader:o,r:l/ti,display:l,diameter:e==="vesta"?525:513,a:s,e:r,inc:a,rot:e==="vesta"?.222:.325,period:e==="vesta"?3.63:4.62,temp:"约 −188°C — −3°C",moons:0,color:e==="vesta"?11184288:6907748,desc:"小行星带中的大型原行星残骸，表面保留着早期太阳系的碰撞历史。"};return n.allData.push(c),Wd(n,c),c.mesh.geometry=kd(Math.random()*9),c.mesh.scale.setScalar(l/.055),c.mesh.material=Jl(o,c.color),c}const TS="varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",AS=`precision highp float;varying vec3 p;uniform float time;${Bd}void main(){float r=length(p.xy);float t=clamp((r-0.52)/(1.-.52),0.,1.);float cass=1.-smoothstep(.012,.026,abs(t-.57));float bands=.48+.42*sin(t*210.)+.18*sin(t*731.);float grain=hash21(floor(vec2(atan(p.y,p.x)*900.,r*1700.)));if(grain<.15+sin(t*60.)*.05)discard;vec3 col=mix(vec3(.92,.78,.48),vec3(.58,.64,.69),smoothstep(.42,1.,t));col=mix(col,vec3(.67,.43,.24),smoothstep(.2,.65,t)*(1.-smoothstep(.65,.92,t)));float edge=smoothstep(.0,.035,t)*(1.-smoothstep(.95,1.,t));float a=(.22+.34*bands)*cass*edge;gl_FragColor=vec4(col*a,a);}`;function wS(n){const e=n.objects.get("saturn"),t=e.r*ti,i=new br(t*1.18,t*2.36,320,5),s=new vt({vertexShader:TS,fragmentShader:AS,transparent:!0,side:sn,depthWrite:!1,blending:Gi,uniforms:{time:{value:0}}}),r=new _t(i,s);r.rotation.x=Math.PI/2,e.node.add(r),e.ring=r,n.ringMat=s;function a(o,l,c,u,h=.13){const f=n.objects.get(o),p=f.display||f.r*ti,_=new br(p*l,p*c,160,2),v=new $i({color:u,transparent:!0,opacity:h,side:sn,depthWrite:!1}),m=new _t(_,v);return m.rotation.x=Math.PI/2,f.node.add(m),m}a("uranus",1.55,2.05,7576219),a("neptune",1.55,1.85,3231873),a("chariklo",1.45,1.82,13152135,.32),a("haumea",1.72,2.05,11058122,.2),a("quaoar",2.1,2.35,12029557,.17)}function CS(n=256){const e=document.createElement("canvas");e.width=e.height=n;const t=e.getContext("2d"),i=t.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.08,"rgba(255,255,255,.9)"),i.addColorStop(.28,"rgba(255,255,255,.28)"),i.addColorStop(.65,"rgba(255,255,255,.055)"),i.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=i,t.fillRect(0,0,n,n),new Rd(e)}function RS(){const n=document.createElement("canvas");n.width=n.height=512;const e=n.getContext("2d");e.translate(256,256);for(let t=0;t<180;t++){const i=t*2.39996,s=55+210*Math.pow(Math.sin(t*91.17)*.5+.5,3),r=.012+.04*(t%7===0);e.strokeStyle=`rgba(255,188,88,${r})`,e.lineWidth=t%13===0?1.5:.5,e.beginPath(),e.moveTo(Math.cos(i)*26,Math.sin(i)*26),e.lineTo(Math.cos(i)*s,Math.sin(i)*s),e.stroke()}return new Rd(n)}function PS(n){const e=CS();[[16743193,13,.46],[16758843,21,.21],[6127359,34,.075]].forEach(([c,u,h],f)=>{const p=new rh(new bl({map:e,color:c,transparent:!0,opacity:h,blending:Zt,depthWrite:!1,depthTest:f===0}));p.scale.setScalar(u),p.renderOrder=-f,n.scene.add(p)});const t=new rh(new bl({map:RS(),color:16753980,transparent:!0,opacity:.34,alphaTest:.008,blending:Zt,depthWrite:!1}));t.scale.setScalar(34),n.scene.add(t),n.coronaRays=t;const i=950,s=new Float32Array(i*3),r=new Float32Array(i);for(let c=0;c<i;c++){const u=new L().randomDirection();s.set([u.x,u.y,u.z],c*3),r[c]=Math.random()}const a=new ft;a.setAttribute("position",new yt(s,3)),a.setAttribute("seed",new yt(r,1));const o=new vt({transparent:!0,depthWrite:!1,blending:Zt,uniforms:{time:{value:0}},vertexShader:"attribute float seed;uniform float time;varying float a;void main(){float life=fract(seed+time*(.018+seed*.025));vec3 p=normalize(position)*(2.5+life*14.);p+=normalize(vec3(position.z,-position.x,position.y))*sin(life*18.+seed*44.)*.16*life;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.2+seed*2.2)*(230./-mv.z);a=(1.-life)*smoothstep(0.,.1,life);}",fragmentShader:"varying float a;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.38,.08,(1.-d*2.)*a*.65);}"}),l=new Rr(a,o);l.userData.solarWind=!0,n.scene.add(l),n.solarWindMat=o}const nr=12e3,Xd=6500,jd=3800;function LS(n){const e=new Float32Array(nr*3),t=new Float32Array(nr),i=new Float32Array(nr);for(let o=0;o<nr;o++){const l=new L().randomDirection().multiplyScalar(18e3+Math.random()*8e3);e.set([l.x,l.y,l.z],o*3),t[o]=.5+Math.pow(Math.random(),7)*5,i[o]=Math.random()}const s=new ft;s.setAttribute("position",new yt(e,3)),s.setAttribute("size",new yt(t,1)),s.setAttribute("seed",new yt(i,1));const r=new vt({transparent:!0,depthWrite:!1,blending:Zt,uniforms:{time:{value:0}},vertexShader:"attribute float size,seed;uniform float time;varying float vSeed,vTwinkle;void main(){vSeed=seed;vTwinkle=.68+.32*sin(time*(.5+seed*2.)+seed*91.);vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=size*(9000./-mv.z);}",fragmentShader:"varying float vSeed,vTwinkle;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 a=vec3(.52,.66,1.),b=vec3(1.,.78,.55);vec3 c=mix(a,b,smoothstep(.68,.9,vSeed));gl_FragColor=vec4(c,vTwinkle*(1.-d*2.));}"}),a=new Rr(s,r);a.renderOrder=-4,n.scene.add(a),n.starField=a}function DS(n){const e=jd,t=new Float32Array(e*3),i=new Float32Array(e);for(let o=0;o<e;o++){const l=(.22+Math.pow(Math.random(),1.7)*4.1)*yn,c=Math.random()*Ut,u=(Math.random()-.5)*l*.055;t.set([Math.cos(c)*l,u,Math.sin(c)*l],o*3),i[o]=Math.random()}const s=new ft;s.setAttribute("position",new yt(t,3)),s.setAttribute("seed",new yt(i,1));const r=new vt({transparent:!0,depthWrite:!1,blending:Zt,vertexShader:"attribute float seed;varying float a;void main(){a=seed;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(.35+seed*.75)*(260./-mv.z);}",fragmentShader:"varying float a;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.38+.25*a,.12,(1.-d*2.)*.18);}"}),a=new Rr(s,r);n.scene.add(a),n.zodiacalDust=a}function US(n){const e=Xd,t=new Float32Array(e*3),i=new Float32Array(e);for(let o=0;o<e;o++){const l=(34+Math.random()*26)*yn,c=Math.random()*.24,u=Math.random()*Ut,h=l*Math.sqrt(1-c*c),f=(Math.random()-.5)*.42;t.set([l*(Math.cos(u)-c),Math.sin(u)*h*Math.sin(f),Math.sin(u)*h*Math.cos(f)],o*3),i[o]=Math.random()}const s=new ft;s.setAttribute("position",new yt(t,3)),s.setAttribute("seed",new yt(i,1));const r=new vt({transparent:!0,depthWrite:!1,blending:Zt,vertexShader:"attribute float seed;varying float s;void main(){s=seed;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(.5+seed*1.25)*(500./-mv.z);}",fragmentShader:"varying float s;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(.44+.4*s,.68+.25*s,1.,(1.-d*2.)*.42);}"}),a=new Rr(s,r);n.scene.add(a),n.kuiper=a}function IS(n){const t=new Float32Array(7800);for(let r=0;r<2600;r++){const a=new L().randomDirection().multiplyScalar(13e3+Math.random()*9e3);t.set([a.x,a.y,a.z],r*3)}const i=new ft;i.setAttribute("position",new yt(t,3));const s=new Cd({size:3.2,color:7573674,transparent:!0,opacity:.18,depthWrite:!1});n.scene.add(new Rr(i,s))}function NS(n){const e=new _i,t=new _t(new br(.95*yn,1.67*yn,192,1),new $i({color:4774304,transparent:!0,opacity:.055,side:sn,depthWrite:!1,blending:Zt}));t.rotation.x=-Math.PI/2,e.add(t);const i=new oS(1200,60,5023687,1653332);i.material.transparent=!0,i.material.opacity=.12,i.material.depthWrite=!1,e.add(i),e.visible=!1,n.scene.add(e),n.scienceLayer=e}const qd=440;function FS(n){const e=new _i;n.scene.add(e);for(let t=0;t<4;t++){const i=qd/4,s=new Zy(kd(t+2),new Qy({color:new ze().setHSL(.08,.08,.25+t*.025),roughness:1,metalness:0}),i),r=new wt;for(let a=0;a<i;a++){const o=(2.12+Math.random()*1.22)*yn,l=.02+Math.random()*.22,c=Math.random()*Ut,u=o*Math.sqrt(1-l*l),h=(Math.random()-.5)*.28;r.position.set(o*(Math.cos(c)-l),Math.sin(c)*u*Math.sin(h),Math.sin(c)*u*Math.cos(h)),r.rotation.set(Math.random()*Ut,Math.random()*Ut,Math.random()*Ut);const f=.45+Math.random()*1.9;r.scale.set(f*(.7+Math.random()*.5),f*(.65+Math.random()*.55),f*(.65+Math.random()*.5)),r.updateMatrix(),s.setMatrixAt(a,r.matrix)}s.instanceMatrix.needsUpdate=!0,e.add(s)}n.asteroidGroup=e}function OS(n,e,t=0){const s=[],r=[],a=[];for(let l=0;l<=18;l++){const c=l/18,u=e*(.18+Math.pow(c,.72)),h=t*c*c;if(s.push(h-u,0,c*n,h+u,0,c*n),r.push(0,c,1,c),l<18){const f=l*2;a.push(f,f+1,f+2,f+1,f+3,f+2)}}const o=new ft;return o.setAttribute("position",new ut(s,3)),o.setAttribute("uv",new ut(r,2)),o.setIndex(a),o}function BS(n,e){const t=r=>new _t(OS(r?28:19,r?.42:.72,r?0:.85),new vt({transparent:!0,depthWrite:!1,side:sn,blending:Zt,uniforms:{activity:{value:0},ion:{value:r?1:0}},vertexShader:"varying vec2 u;void main(){u=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform float activity,ion;varying vec2 u;void main(){float edge=pow(sin(u.x*3.14159),.7);float fade=pow(1.-u.y,.8)*edge*activity;vec3 c=mix(vec3(1.,.48,.16),vec3(.22,.64,1.),ion);gl_FragColor=vec4(c*fade,fade*.62);}"})),i=t(!0),s=t(!1);n.scene.add(i,s),e.tails=[i,s],n.cometTails.push(e)}function zS(n){n.cometTails=[],Io.filter(e=>e.comet).forEach(e=>BS(n,e))}function HS(n){n.meteors=[],n.lastMeteor=0,n.meteorMat=new vt({transparent:!0,depthWrite:!1,blending:Zt,vertexColors:!0,uniforms:{life:{value:0}},vertexShader:"attribute float fade;varying float v;void main(){v=fade;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform float life;varying float v;void main(){gl_FragColor=vec4(mix(vec3(1.,.38,.05),vec3(1.),v),v*(1.-life));}"})}function VS(n){const e=new L((Math.random()-.5)*240,50+Math.random()*90,(Math.random()-.5)*180),t=new L(-.7-Math.random(),-.2-Math.random()*.35,.2*(Math.random()-.5)).normalize(),i=[],s=[];for(let o=0;o<18;o++){const l=o/17;i.push(...e.clone().addScaledVector(t,l*22).toArray()),s.push(l)}const r=new ft;r.setAttribute("position",new ut(i,3)),r.setAttribute("fade",new ut(s,1));const a=new Sr(r,n.meteorMat.clone());n.scene.add(a),n.meteors.push({line:a,life:0,duration:.55+Math.random()*.35,vel:t.multiplyScalar(52)})}function GS(n,e,t){t-n.lastMeteor>3500+Math.random()*6500&&(VS(n),n.lastMeteor=t);for(let i=n.meteors.length-1;i>=0;i--){const s=n.meteors[i];s.life+=e,s.line.position.addScaledVector(s.vel,e),s.line.material.uniforms.life.value=s.life/s.duration,s.life>s.duration&&(n.scene.remove(s.line),s.line.geometry.dispose(),s.line.material.dispose(),n.meteors.splice(i,1))}}const kS=Date.parse("2046-01-01T00:00:00Z"),Dh=["sun","earth","jupiter","io","saturn","titan","uranus","triton","pluto","charon","arrokoth","sedna","halley"],WS={overview:{p:[150,260,510],t:[0,0,0]},inner:{p:[34,42,78],t:[0,0,0]},jupiter:{id:"jupiter",offset:[4.7,2.8,5.6]},saturn:{id:"saturn",offset:[5.1,3.7,6.2]},pluto:{id:"pluto",offset:[1.2,.75,1.45]},distant:{id:"sedna",offset:[1.4,.9,1.7]}};class XS{constructor({canvasWrap:e,labelsHost:t,hooks:i={}}){var l,c;this.canvasWrap=e,this.labelsHost=t,this.hooks=i;const s=this.scene=new Yy,r=this.camera=new nn(48,innerWidth/innerHeight,.002,5e4);r.position.set(38,46,74);const a=this.renderer=new Ad({antialias:!0,powerPreference:"high-performance",alpha:!1});a.setPixelRatio(Math.min(devicePixelRatio,1.6)),a.setSize(innerWidth,innerHeight),a.outputColorSpace=It,a.toneMapping=$f,a.toneMappingExposure=1.05,e.appendChild(a.domElement),this.labelRenderer=new gS,this.labelRenderer.setSize(innerWidth,innerHeight),this.labelRenderer.domElement.id="labels",t.appendChild(this.labelRenderer.domElement);const o=this.controls=new lS(r,a.domElement);o.enableDamping=!0,o.dampingFactor=.055,o.minDistance=.015,o.maxDistance=24e3,o.target.set(0,0,0),o.screenSpacePanning=!0,this.composer=new dS(a),this.composer.addPass(new pS(s,r)),this.bloom=new zs(new Te(innerWidth,innerHeight),1.25,.82,.16),this.composer.addPass(this.bloom),this.cinemaPass=new Id(SS),this.composer.addPass(this.cinemaPass),this.ambient=new iS(1384504,.18),s.add(this.ambient),this.sunLight=new nS(16769198,780,0,1.78),s.add(this.sunLight),this.ctx={scene:s,objects:new Map,allData:[...Io,...Al],atmospheres:[],orbitLines:[],selectable:[]},ES(this.ctx),wS(this.ctx),PS(this.ctx),s.background=new ze(66316),LS(this.ctx),DS(this.ctx),NS(this.ctx),FS(this.ctx),Lh(this.ctx,"vesta","灶神星","Vesta",2.362,.089,7.14,40,.09),Lh(this.ctx,"pallas","智神星","Pallas",2.773,.231,34.84,40,.085),US(this.ctx),IS(this.ctx),zS(this.ctx),HS(this.ctx),this.ctx.primaryBodies=Io.concat(this.ctx.allData.filter(u=>u.id==="vesta"||u.id==="pallas")),this.sim={days:0,speed:20,direction:1,date:new Date("2046-01-01T00:00:00Z")},this.updateBodies(),this.raycaster=new rS,this.pointer=new Te,this.selected=null,this.flight=null,this.dragStart={x:0,y:0},this.followTarget=null,this.lastFollowPos=null,this.tourActive=!1,this.tourIndex=0,this.nextTour=0,this.labelsOn=!0,this.starDensity=100,this.resumeSpeed=20,this.adaptiveEnabled=!0,this.adaptiveTier=2,this.lastAdaptive=performance.now(),this.velocityGeo=new ft().setFromPoints([new L,new L(1,0,0)]),this.velocityLine=new Sr(this.velocityGeo,new na({color:6160336,transparent:!0,opacity:.8,depthWrite:!1,blending:Zt})),this.velocityLine.visible=!1,s.add(this.velocityLine),this.measureState={active:!1,picks:[],line:null,label:null},this._bindPointer(),this.last=performance.now(),this.fpsLast=this.last,this.frames=0,this.lastUI=0,this.lastScale=0,this._raf=0,this._onResize=this._handleResize.bind(this),addEventListener("resize",this._onResize),(c=(l=this.hooks).onCount)==null||c.call(l,`CELESTIAL OBJECTS ${String(this.ctx.allData.length+qd).padStart(3,"0")}`),this._showInfo(null),this._updateScienceHUD(),this.applyQuality(2,!0)}updateBodies(){const e=this.sim;for(const t of this.ctx.primaryBodies){if(t.a){const i=Uo(t.id)%1e3/1e3*Ut,s=t.period*365.25,r=t.retro?-1:1,a=i+e.direction*r*e.days/s*Ut,o=Ph(a,t.e||0);t.node.position.copy(Fd(t,o))}typeof t.rot=="number"&&(t.mesh.rotation.y=e.direction*e.days/t.rot*Ut),t.mesh.material.uniforms.uTime.value=e.days*.12}for(const t of Al){const i=Uo(t.id)%1e3/1e3*Ut,s=t.retro?-1:1,r=i+e.direction*s*e.days/t.periodDays*Ut,a=Ph(r,t.eMoon||0);t.node.position.copy(Od(t,a)),t.mesh.rotation.y=e.direction*e.days/t.rot*Ut,t.mesh.material.uniforms.uTime.value=e.days*.12}for(const t of this.ctx.cometTails){const i=t.node.position.length()/yn,s=1-Ts.smoothstep(i,2.2,7.2),r=t.node.position.clone().normalize();for(const[a,o]of t.tails.entries())o.position.copy(t.node.position),o.quaternion.setFromUnitVectors(new L(0,0,1),r),a===1&&o.rotateY(.06),o.material.uniforms.activity.value=s,o.visible=s>.008}this.ctx.ringMat.uniforms.time.value=e.days*.02,this.ctx.asteroidGroup.rotation.y=e.direction*e.days/1680*Ut}_bindPointer(){const e=this.renderer.domElement;this._onPointerDown=t=>{this.dragStart={x:t.clientX,y:t.clientY}},this._onClick=t=>{if(Math.hypot(t.clientX-this.dragStart.x,t.clientY-this.dragStart.y)>5)return;const i=this._pick(t);if((t.shiftKey||this.measureState.active)&&i){this._measurePick(i);return}this.selectBody(i)},this._onDblClick=t=>{if(this.measureState.active)return;const i=this._pick(t);i&&(this.selectBody(i),this.focusBody(i))},e.addEventListener("pointerdown",this._onPointerDown),e.addEventListener("click",this._onClick),e.addEventListener("dblclick",this._onDblClick)}_pick(e){const t=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-(e.clientY-t.top)/t.height*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const i=this.raycaster.intersectObjects(this.ctx.selectable,!1)[0];return(i==null?void 0:i.object.userData.body)||null}selectBody(e){var t;if(this.selected=e,document.querySelectorAll(".celestial-label").forEach(i=>i.classList.remove("selected")),this.ctx.orbitLines.forEach(i=>{var s;i.material.opacity=i.userData.baseOpacity,i.material.color.set(((s=this.ctx.objects.get(i.userData.owner))==null?void 0:s.color)||5400444)}),!e){this._showInfo(null),this.velocityLine.visible=!1,this._updateScienceHUD();return}(t=e.node.userData.label)==null||t.element.classList.add("selected"),e.orbitLine&&(e.orbitLine.material.opacity=.92,e.orbitLine.material.color.set(12382207)),this._showInfo(e),this._updateScienceHUD()}_showInfo(e){var t,i;(i=(t=this.hooks).onSelect)==null||i.call(t,e||null)}flyTo(e,t,i=1800){this.flight={fromP:this.camera.position.clone(),fromT:this.controls.target.clone(),toP:e.clone(),toT:t.clone(),start:performance.now(),duration:i}}_updateFlight(e){if(!this.flight)return;let t=Math.min(1,(e-this.flight.start)/this.flight.duration);t=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,this.camera.position.lerpVectors(this.flight.fromP,this.flight.toP,t),this.controls.target.lerpVectors(this.flight.fromT,this.flight.toT,t),t>=1&&(this.flight=null)}focusBody(e){const t=new L;e.node.getWorldPosition(t);const i=(e.display||e.r*ti)*(e.scale?Math.max(...e.scale):1),s=Math.max(i*7,.22),r=this.camera.position.clone().sub(this.controls.target).normalize();this.flyTo(t.clone().add(r.multiplyScalar(s)).add(new L(0,i*1.8,0)),t,1500)}goView(e){const t=WS[e];if(t)if(t.id){const i=this.ctx.objects.get(t.id),s=new L;i.node.getWorldPosition(s),this.selectBody(i),this.flyTo(s.clone().add(new L(...t.offset)),s,1900)}else this.flyTo(new L(...t.p),new L(...t.t),1900)}reset(){this.selectBody(null),this.flyTo(new L(38,46,74),new L,1700)}setFollow(e){var t,i;if(e&&!this.selected){this._toast("请先选择一个天体");return}this.followTarget=e?this.selected:null,this.lastFollowPos=this.followTarget?this._worldOf(this.followTarget):null,(i=(t=this.hooks).onFollowActive)==null||i.call(t,!!this.followTarget)}toggleFollow(){this.setFollow(!this.followTarget)}_updateFollow(){if(!this.followTarget)return;const e=this._worldOf(this.followTarget),t=e.clone().sub(this.lastFollowPos);this.flight||(this.camera.position.add(t),this.controls.target.add(t)),this.lastFollowPos.copy(e)}setTour(e){var t,i;this.tourActive=e,(i=(t=this.hooks).onTourActive)==null||i.call(t,e),this.nextTour=0,e&&this._toast("电影导览已启动 · 交互不会被锁定")}toggleTour(){this.setTour(!this.tourActive)}_updateTour(e){var i,s;if(!this.tourActive||e<this.nextTour)return;const t=this.ctx.objects.get(Dh[this.tourIndex++%Dh.length]);this.selectBody(t),this.focusBody(t),(s=(i=this.hooks).onTourCard)==null||s.call(i,{title:`${t.cn} · ${t.en}`,text:t.desc||`${t.type}，直径约 ${Number(t.diameter).toLocaleString()} 千米；轨道与表面纹理由实时程序化系统重建。`}),this.nextTour=e+7600}_worldOf(e){const t=new L;return e.node.getWorldPosition(t),t}_physicalPositionKm(e){if(!e.parent)return this._worldOf(e).multiplyScalar(vi/yn);const t=this.ctx.objects.get(e.parent),i=this._worldOf(t).multiplyScalar(vi/yn),s=e.node.position.clone().normalize().multiplyScalar(e.distanceKm||0),r=new Ei;return t.node.getWorldQuaternion(r),i.add(s.applyQuaternion(r))}_clearMeasure(){this.measureState.picks=[],this.measureState.line&&(this.scene.remove(this.measureState.line),this.measureState.line.geometry.dispose(),this.measureState.line.material.dispose(),this.measureState.line=null),this.measureState.label&&(this.scene.remove(this.measureState.label),this.measureState.label=null)}_measurePick(e){if(this.measureState.picks.length>=2&&this._clearMeasure(),this.measureState.picks.push(e),this.selectBody(e),this.measureState.picks.length===1){this._toast(`测距起点：${e.cn} · 请选择终点`);return}const t=new ft().setFromPoints([new L,new L]),i=new Pd({color:7205631,transparent:!0,opacity:.85,dashSize:.25,gapSize:.14,depthWrite:!1});this.measureState.line=new Sr(t,i),this.scene.add(this.measureState.line);const s=document.createElement("div");s.className="measure-label",this.measureState.label=new Nd(s),this.scene.add(this.measureState.label),this._updateMeasure(),this._toast(`${this.measureState.picks[0].cn} ↔ ${this.measureState.picks[1].cn}`)}_updateMeasure(){if(this.measureState.picks.length!==2||!this.measureState.line)return;const[e,t]=this.measureState.picks,i=this._worldOf(e),s=this._worldOf(t),r=this.measureState.line.geometry.attributes.position;r.setXYZ(0,i.x,i.y,i.z),r.setXYZ(1,s.x,s.y,s.z),r.needsUpdate=!0,this.measureState.line.computeLineDistances(),this.measureState.label.position.copy(i).lerp(s,.5),this.measureState.label.element.textContent=_S(this._physicalPositionKm(e).distanceTo(this._physicalPositionKm(t)))}toggleMeasure(){var e,t;this.measureState.active=!this.measureState.active,(t=(e=this.hooks).onMeasureActive)==null||t.call(e,this.measureState.active),this.measureState.active||this._clearMeasure(),this._toast(this.measureState.active?"测距模式：依次点击两颗天体":"测距模式已关闭")}_orbitalTelemetry(e){if(!e)return null;if(e.parent){const s=e.distanceKm&&e.periodDays?Ut*e.distanceKm/(e.periodDays*86400):0;return{r:(e.distanceKm||0)/vi,v:s,light:(e.distanceKm||0)/299792.458,inc:e.incMoon||0}}if(!e.a)return{r:0,v:0,light:0,inc:0};const t=Math.max(1e-4,this._worldOf(e).length()/yn),i=29.7847*Math.sqrt(Math.max(0,2/t-1/e.a));return{r:t,v:i,light:t*499.0048,inc:e.inc||0}}_updateScienceHUD(){var i,s,r,a;if(!this.selected){(s=(i=this.hooks).onScienceHud)==null||s.call(i,"选择天体以读取轨道遥测 · SHIFT+单击两颗天体可直接测距");return}const e=this._orbitalTelemetry(this.selected),t=this.selected.parent?`${(this.selected.distanceKm||0).toLocaleString()} km`:`${e.r.toFixed(e.r<10?3:1)} AU`;(a=(r=this.hooks).onScienceHud)==null||a.call(r,`${this.selected.cn}  |  日心/母体距离 ${t}  |  轨道速度 ${e.v.toFixed(2)} km/s  |  光行时 ${e.light<60?e.light.toFixed(2)+" s":(e.light/60).toFixed(1)+" min"}  |  倾角 ${e.inc.toFixed(2)}°`)}_updateVelocityVector(){if(!this.ctx.scienceLayer.visible||!this.selected){this.velocityLine.visible=!1;return}const e=this._worldOf(this.selected),t=this.selected.parent?this._worldOf(this.ctx.objects.get(this.selected.parent)):new L,i=e.clone().sub(t),s=new L(0,1,0),r=new L().crossVectors(s,i).normalize().multiplyScalar((this.selected.retro?-1:1)*Math.max((this.selected.display||this.selected.r*ti)*5,this.camera.position.distanceTo(e)*.025)),a=this.velocityGeo.attributes.position;a.setXYZ(0,e.x,e.y,e.z),a.setXYZ(1,e.x+r.x,e.y+r.y,e.z+r.z),a.needsUpdate=!0,this.velocityLine.visible=!0}_updateScaleRuler(){var s,r;const e=this.camera.position.distanceTo(this.controls.target),i=2*Math.tan(this.camera.fov*ia/2)*e/innerHeight*100/yn;(r=(s=this.hooks).onScaleRuler)==null||r.call(s,i>=.01?`${i<10?i.toFixed(2):i.toFixed(0)} AU`:`${Math.max(1,i*vi).toLocaleString(void 0,{maximumFractionDigits:0})} km`)}_updateLabels(){var t;const e=this.labelsOn;for(const i of this.ctx.allData){if(!((t=i.node)!=null&&t.userData.label))continue;const s=new L;i.node.getWorldPosition(s);const r=this.camera.position.distanceTo(s),o=(i.display||i.r*ti)/r,l=i===this.selected;let c=l?1:Ts.smoothstep(o,1e-4,.004);i.type==="卫星"&&!l&&(c*=Ts.smoothstep(o,8e-4,.006));const u=i.node.userData.label.element;u.style.opacity=e?String(c):"0",u.style.display=c<.035?"none":"block";const h=l?1:Ts.clamp(.55+o*90,.55,1);u.style.fontSize=`${10*h}px`}}applyQuality(e,t=!1){this.adaptiveTier=Ts.clamp(e,0,2);const i=[.52,.76,1][this.adaptiveTier],s=[1,1.25,Math.min(devicePixelRatio,1.6)][this.adaptiveTier];this.renderer.setPixelRatio(s),this.renderer.setSize(innerWidth,innerHeight,!1),this.composer.setPixelRatio(s),this.composer.setSize(innerWidth,innerHeight);const r=this.starDensity/100;this.ctx.starField.geometry.setDrawRange(0,Math.floor(nr*r*i)),this.ctx.kuiper.geometry.setDrawRange(0,Math.floor(Xd*i)),this.ctx.zodiacalDust.geometry.setDrawRange(0,Math.floor(jd*i)),this.bloom.radius=[.42,.64,.82][this.adaptiveTier],t||this._toast(`自适应画质：${["性能","平衡","电影"][this.adaptiveTier]}档`)}_adaptiveCheck(e,t){!this.adaptiveEnabled||t-this.lastAdaptive<4200||(this.lastAdaptive=t,e<28&&this.adaptiveTier>0?this.applyQuality(this.adaptiveTier-1):e>52&&this.adaptiveTier<2&&this.applyQuality(this.adaptiveTier+1))}_toast(e){var t,i;(i=(t=this.hooks).onToast)==null||i.call(t,e)}search(e){return e=e.trim().toLowerCase(),e?this.ctx.allData.filter(t=>(t.cn+t.en+(t.aliases||"")).toLowerCase().includes(e)).slice(0,9).map(t=>({id:t.id,cn:t.cn,en:t.en,type:t.type})):[]}selectAndFocus(e){const t=this.ctx.objects.get(e);t&&(this.selectBody(t),this.focusBody(t))}setAsteroidVisible(e){this.ctx.asteroidGroup.visible=e,["ceres","vesta","pallas","juno","hebe","hygiea","psyche"].forEach(t=>this.ctx.objects.get(t).node.visible=e)}setKuiperVisible(e){this.ctx.kuiper.visible=e}setOrbitsVisible(e){this.ctx.orbitLines.forEach(t=>t.visible=e)}setLabelsVisible(e){this.labelsOn=e,this.labelRenderer.domElement.style.display=e?"block":"none"}setAtmoVisible(e){this.ctx.atmospheres.forEach(t=>t.visible=e)}setScienceVisible(e){this.ctx.scienceLayer.visible=e,this._updateVelocityVector(),this._toast(e?"宜居带与黄道参考层已开启":"科学参考层已关闭")}setCinema(e){this.cinemaPass.enabled=e}setAdaptive(e){this.adaptiveEnabled=e,this._toast(e?"自适应画质已启用":"已锁定当前画质")}setTimeSpeed(e){this.sim.speed=e}toggleDirection(){var e,t;this.sim.direction*=-1,(t=(e=this.hooks).onDirection)==null||t.call(e,this.sim.direction)}setBrightness(e){this.bloom.strength=e,this.renderer.toneMappingExposure=.72+e*.27,this.ambient.intensity=.08+e*.08}setStarDensity(e){this.starDensity=e,this.applyQuality(this.adaptiveTier,!0)}jumpDays(e){this.sim.days+=e,this.updateBodies(),this._toast(`模拟时间已跳转 ${e>0?"+":""}${e} 日`)}togglePause(){var e,t;this.sim.speed?(this.resumeSpeed=this.sim.speed,this.sim.speed=0):this.sim.speed=this.resumeSpeed,(t=(e=this.hooks).onSpeed)==null||t.call(e,this.sim.speed)}goToday(){this.sim.days=0,this.updateBodies(),this._toast("已返回 2046-01-01 初始历元")}_handleResize(){this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight),this.composer.setSize(innerWidth,innerHeight),this.labelRenderer.setSize(innerWidth,innerHeight)}start(){const e=t=>{this._raf=requestAnimationFrame(e),this._animate(t)};this._raf=requestAnimationFrame(e)}_animate(e){var i,s,r,a;const t=Math.min(.05,(e-this.last)/1e3);if(this.last=e,this.sim.days+=t*this.sim.speed,this.sim.date=new Date(kS+this.sim.days*864e5),this.updateBodies(),this._updateTour(e),this._updateFlight(e),this._updateFollow(),this.controls.update(),this._updateMeasure(),this._updateVelocityVector(),this.ctx.starField.material.uniforms.time.value=e*.001,this.cinemaPass.uniforms.time.value=e*.001,this.ctx.coronaRays.material.rotation=e*18e-6,this.ctx.solarWindMat.uniforms.time.value=e*.001,GS(this.ctx,t,e),this._updateLabels(),this.composer.render(),this.labelRenderer.render(this.scene,this.camera),this.frames++,e-this.fpsLast>700){const o=Math.round(this.frames*1e3/(e-this.fpsLast));(s=(i=this.hooks).onFps)==null||s.call(i,o),this._adaptiveCheck(o,e),this.fpsLast=e,this.frames=0}e-this.lastUI>180&&((a=(r=this.hooks).onDate)==null||a.call(r,this.sim.date.toLocaleString("zh-CN",{timeZone:"UTC",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).replaceAll("/"," · ")+" UTC"),this._updateScienceHUD(),this.lastUI=e),e-this.lastScale>450&&(this._updateScaleRuler(),this.lastScale=e)}dispose(){cancelAnimationFrame(this._raf),removeEventListener("resize",this._onResize);const e=this.renderer.domElement;e.removeEventListener("pointerdown",this._onPointerDown),e.removeEventListener("click",this._onClick),e.removeEventListener("dblclick",this._onDblClick),this.controls.dispose(),this.scene.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material)for(const i of Array.isArray(t.material)?t.material:[t.material])i.map&&i.map.dispose(),i.dispose()}),this.composer.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),e.remove(),this.labelRenderer.domElement.remove()}}const an=Pg("solaris",()=>{let n=null;function e(se){n=se?Wo(se):null}const t=Ze("FPS 60"),i=Ze("CELESTIAL OBJECTS 000"),s=Ze("2046 · 01 · 01  00:00:00 UTC"),r=Ze(null),a=Ze("选择天体以读取轨道遥测 · SHIFT+单击两颗天体可直接测距"),o=Ze(""),l=Ze(!1),c=Ze(!1),u=Ze(""),h=Ze(""),f=Ze(!1),p=Ze(!1),_=Ze(20),v=Ze(1),m=Ze("1 AU"),d=Ze(!0),b=Ze(!0),y=Ze(!0),E=Ze(!0),D=Ze(!0),P=Ze(!1),w=Ze(!0),H=Ze(!0),S=Ze(1.25),A=Ze(100);function X(se){t.value="FPS "+se}function ee(se){i.value=se}function pe(se){s.value=se}function N(se){r.value=se}function G(se){a.value=se}function W(se){c.value=se}function q({title:se,text:R}){u.value=se,h.value=R}function $(se){f.value=se}function ie(se){p.value=se}function oe(se){m.value=se}let fe=null;function he(se){o.value=se,l.value=!0,clearTimeout(fe),fe=setTimeout(()=>{l.value=!1},2200)}const J=qn(()=>"公转方向 · "+(v.value>0?"顺行":"逆行")),ue=qn(()=>S.value.toFixed(2)),Se=qn(()=>A.value+"%"),we=qn(()=>_.value?"暂停":"继续"),Ce=qn(()=>c.value?"停止导览":"自动导览"),Ue=qn(()=>f.value?"解除跟随":"锁定跟随");function Ne(se){d.value=se,n==null||n.setAsteroidVisible(se)}function Pe(se){b.value=se,n==null||n.setKuiperVisible(se)}function qe(se){y.value=se,n==null||n.setOrbitsVisible(se)}function x(se){E.value=se,n==null||n.setLabelsVisible(se)}function U(se){D.value=se,n==null||n.setAtmoVisible(se)}function F(se){P.value=se,n==null||n.setScienceVisible(se)}function j(se){w.value=se,n==null||n.setCinema(se)}function B(se){H.value=se,n==null||n.setAdaptive(se)}function Q(se){_.value=se,n==null||n.setTimeSpeed(se)}function te(){n==null||n.toggleDirection()}function M(se){S.value=se,n==null||n.setBrightness(se)}function g(se){A.value=se,n==null||n.setStarDensity(se)}function C(se){n==null||n.jumpDays(se)}function k(){n==null||n.togglePause()}function O(){n==null||n.goToday()}function V(){n==null||n.toggleMeasure()}function ae(){n==null||n.toggleTour()}function re(){n==null||n.toggleFollow()}function de(){n==null||n.reset()}function Me(se){n==null||n.goView(se)}function Ae(se){return n?n.search(se):[]}function ne(se){n==null||n.selectAndFocus(se)}return{bindEngine:e,fpsText:t,countText:i,dateText:s,selectedDef:r,scienceHud:a,toastText:o,toastShow:l,tourActive:c,tourTitle:u,tourText:h,followActive:f,measureActive:p,timeSpeed:_,dirSign:v,scaleRuler:m,showAsteroid:d,showKuiper:b,showOrbits:y,showLabels:E,showAtmo:D,showScience:P,showCinema:w,showAdaptive:H,brightness:S,starDensity:A,setFps:X,setCount:ee,setDate:pe,setSelected:N,setScienceHud:G,setTourActive:W,setTourCard:q,setFollowActive:$,setMeasureActive:ie,setScaleRuler:oe,toast:he,directionText:J,brightText:ue,starsText:Se,pauseText:we,tourBtnText:Ce,followBtnText:Ue,setAsteroid:Ne,setKuiper:Pe,setOrbits:qe,setLabels:x,setAtmo:U,setScience:F,setCinema:j,setAdaptive:B,setTimeSpeed:Q,toggleDirection:te,setBrightness:M,setStarDensity:g,jumpDays:C,togglePause:k,goToday:O,toggleMeasure:V,toggleTour:ae,toggleFollow:re,reset:de,goView:Me,search:Ae,selectAndFocus:ne}}),jS={__name:"SceneView",setup(n){const e=Ze(null),t=Ze(null),i=an();let s=null;return qo(()=>{s=new XS({canvasWrap:t.value,labelsHost:e.value,hooks:{onFps:r=>i.setFps(r),onDate:r=>i.setDate(r),onCount:r=>i.setCount(r),onSelect:r=>i.setSelected(r),onScienceHud:r=>i.setScienceHud(r),onToast:r=>i.toast(r),onTourActive:r=>i.setTourActive(r),onTourCard:r=>i.setTourCard(r),onFollowActive:r=>i.setFollowActive(r),onMeasureActive:r=>i.setMeasureActive(r),onSpeed:r=>{i.timeSpeed=r},onDirection:r=>{i.dirSign=r},onScaleRuler:r=>i.setScaleRuler(r)}}),i.bindEngine(s),s.start()}),zl(()=>{i.bindEngine(null),s==null||s.dispose(),s=null}),(r,a)=>(Tt(),At("div",{id:"scene-root",ref_key:"rootEl",ref:e},[me("div",{id:"canvas-wrap",ref_key:"canvasWrap",ref:t},null,512),a[0]||(a[0]=me("div",{id:"vignette"},null,-1))],512))}},qS=["onClick"],YS={key:1,class:"result"},KS={__name:"SearchBox",setup(n){const e=an(),t=Ze(null),i=Ze(""),s=Ze([]),r=Ze(!1);function a(){if(!i.value.trim()){r.value=!1;return}s.value=e.search(i.value),r.value=!0}function o(c){e.selectAndFocus(c.id),i.value=`${c.cn} · ${c.en}`,r.value=!1}function l(c){t.value&&!t.value.contains(c.target)&&(r.value=!1)}return qo(()=>document.addEventListener("pointerdown",l)),zl(()=>document.removeEventListener("pointerdown",l)),(c,u)=>(Tt(),At("div",{class:"searchbox",ref_key:"rootEl",ref:t},[Wp(me("input",{id:"search",autocomplete:"off",placeholder:"搜索天体 / Search","onUpdate:modelValue":u[0]||(u[0]=h=>i.value=h),onInput:a},null,544),[[vg,i.value]]),me("div",{id:"search-results",class:"glass",style:Ho({display:r.value?"block":"none"})},[s.value.length?(Tt(!0),At(vn,{key:0},cm(s.value,h=>(Tt(),At("div",{key:h.id,class:"result",onClick:f=>o(h)},[Pn(pt(h.cn)+" · "+pt(h.en),1),me("span",null,pt(h.type),1)],8,qS))),128)):(Tt(),At("div",YS,"未找到匹配天体"))],4)],512))}},$S={id:"topbar",class:"glass"},ZS={id:"date"},JS={__name:"TopBar",setup(n){const e=an();return(t,i)=>(Tt(),At("div",$S,[it(KS),me("div",ZS,pt(Re(e).dateText),1)]))}};function QS(n){const e=n||{cn:"太阳系",en:"Solar System",type:"行星系统",desc:"一座以实时轨道动力学驱动的程序化太阳系。双击任意天体进入近地观察。"};return{cn:e.cn,en:e.en.toUpperCase(),desc:e.desc||`${e.cn}是一颗以程序化分形纹理重建的${e.type}，其轨道由真实半长轴、偏心率与周期驱动。`,type:e.type,diameter:e.diameter?e.diameter.toLocaleString()+" km":"—",axis:e.distanceKm?e.distanceKm.toLocaleString()+" km":e.a!==void 0?e.a?e.a.toFixed(e.a<10?3:2)+" AU":"0 AU":"—",rotation:typeof e.rot=="number"?`${Math.abs(e.rot).toLocaleString()} 地球日${e.rot<0?" · 逆行":""}`:e.rot||"—",orbit:e.periodDays?e.periodDays+" 地球日":e.period?e.period+" 地球年":"—",temp:e.temp||"—",moons:e.moons!==void 0?String(e.moons):"—"}}const eb={class:"metric"},tb=["id"],Ii={__name:"MetricRow",props:{id:{type:String,required:!0},label:{type:String,required:!0},value:{type:String,default:"—"}},setup(n){const e=n,t=Ze(null);function i(){var s;(s=t.value)==null||s.animate([{opacity:.1,transform:"translateY(5px)"},{opacity:1,transform:"none"}],{duration:330,easing:"ease-out"})}return qo(i),ar(()=>e.value,i),(s,r)=>(Tt(),At("div",eb,[me("label",null,pt(n.label),1),me("b",{id:n.id,ref_key:"bEl",ref:t},pt(n.value),9,tb)]))}},nb={id:"info",class:"glass"},ib={id:"info-name"},sb={id:"info-en"},rb={id:"info-desc"},ob={__name:"InfoPanel",setup(n){const e=an(),t=qn(()=>QS(e.selectedDef));return(i,s)=>(Tt(),At("aside",nb,[s[0]||(s[0]=me("div",{class:"eyebrow"},"CELESTIAL DATABASE",-1)),me("h1",ib,pt(t.value.cn),1),me("div",sb,pt(t.value.en),1),me("div",rb,pt(t.value.desc),1),it(Ii,{id:"m-type",label:"天体类型",value:t.value.type},null,8,["value"]),it(Ii,{id:"m-diameter",label:"直径",value:t.value.diameter},null,8,["value"]),it(Ii,{id:"m-axis",label:"轨道半长轴",value:t.value.axis},null,8,["value"]),it(Ii,{id:"m-rotation",label:"自转周期",value:t.value.rotation},null,8,["value"]),it(Ii,{id:"m-orbit",label:"公转周期",value:t.value.orbit},null,8,["value"]),it(Ii,{id:"m-temp",label:"表面温度",value:t.value.temp},null,8,["value"]),it(Ii,{id:"m-moons",label:"已知卫星",value:t.value.moons},null,8,["value"])]))}},ab={id:"right",class:"glass"},lb={class:"toggle"},cb={class:"switch"},ub=["checked"],hb={class:"toggle"},fb={class:"switch"},db=["checked"],pb={class:"toggle"},mb={class:"switch"},gb=["checked"],_b={class:"toggle"},vb={class:"switch"},xb=["checked"],Mb={class:"toggle"},yb={class:"switch"},Sb=["checked"],bb={class:"toggle"},Eb={class:"switch"},Tb=["checked"],Ab={class:"toggle"},wb={class:"switch"},Cb=["checked"],Rb={class:"toggle"},Pb={class:"switch"},Lb=["checked"],Db={class:"range-row"},Ub={id:"time-out"},Ib=["value"],Nb={class:"range-row"},Fb={id:"bright-out"},Ob=["value"],Bb={class:"range-row"},zb={id:"stars-out"},Hb=["value"],Vb={class:"micro-grid"},Gb={__name:"ControlPanel",setup(n){const e=an();return(t,i)=>(Tt(),At("aside",ab,[i[38]||(i[38]=me("div",{class:"panel-title"},"SYSTEM CONTROL",-1)),me("div",lb,[i[20]||(i[20]=Pn("小行星带",-1)),me("label",cb,[me("input",{id:"t-asteroid",type:"checkbox",checked:Re(e).showAsteroid,onChange:i[0]||(i[0]=s=>Re(e).setAsteroid(s.target.checked))},null,40,ub),i[19]||(i[19]=me("i",null,null,-1))])]),me("div",hb,[i[22]||(i[22]=Pn("柯伊伯带",-1)),me("label",fb,[me("input",{id:"t-kuiper",type:"checkbox",checked:Re(e).showKuiper,onChange:i[1]||(i[1]=s=>Re(e).setKuiper(s.target.checked))},null,40,db),i[21]||(i[21]=me("i",null,null,-1))])]),me("div",pb,[i[24]||(i[24]=Pn("轨道线",-1)),me("label",mb,[me("input",{id:"t-orbits",type:"checkbox",checked:Re(e).showOrbits,onChange:i[2]||(i[2]=s=>Re(e).setOrbits(s.target.checked))},null,40,gb),i[23]||(i[23]=me("i",null,null,-1))])]),me("div",_b,[i[26]||(i[26]=Pn("天体标签",-1)),me("label",vb,[me("input",{id:"t-labels",type:"checkbox",checked:Re(e).showLabels,onChange:i[3]||(i[3]=s=>Re(e).setLabels(s.target.checked))},null,40,xb),i[25]||(i[25]=me("i",null,null,-1))])]),me("div",Mb,[i[28]||(i[28]=Pn("大气外壳",-1)),me("label",yb,[me("input",{id:"t-atmo",type:"checkbox",checked:Re(e).showAtmo,onChange:i[4]||(i[4]=s=>Re(e).setAtmo(s.target.checked))},null,40,Sb),i[27]||(i[27]=me("i",null,null,-1))])]),me("div",bb,[i[30]||(i[30]=Pn("宜居带 / 黄道层",-1)),me("label",Eb,[me("input",{id:"t-science",type:"checkbox",checked:Re(e).showScience,onChange:i[5]||(i[5]=s=>Re(e).setScience(s.target.checked))},null,40,Tb),i[29]||(i[29]=me("i",null,null,-1))])]),me("div",Ab,[i[32]||(i[32]=Pn("电影色彩分级",-1)),me("label",wb,[me("input",{id:"t-cinema",type:"checkbox",checked:Re(e).showCinema,onChange:i[6]||(i[6]=s=>Re(e).setCinema(s.target.checked))},null,40,Cb),i[31]||(i[31]=me("i",null,null,-1))])]),me("div",Rb,[i[34]||(i[34]=Pn("自适应画质",-1)),me("label",Pb,[me("input",{id:"t-adaptive",type:"checkbox",checked:Re(e).showAdaptive,onChange:i[7]||(i[7]=s=>Re(e).setAdaptive(s.target.checked))},null,40,Lb),i[33]||(i[33]=me("i",null,null,-1))])]),me("div",Db,[me("header",null,[i[35]||(i[35]=me("span",null,"时间倍率",-1)),me("output",Ub,pt(Re(e).timeSpeed)+"×",1)]),me("input",{id:"time-scale",type:"range",min:"0",max:"1000",step:"1",value:Re(e).timeSpeed,onInput:i[8]||(i[8]=s=>Re(e).setTimeSpeed(+s.target.value))},null,40,Ib)]),me("button",{id:"direction",onClick:i[9]||(i[9]=s=>Re(e).toggleDirection())},pt(Re(e).directionText),1),me("div",Nb,[me("header",null,[i[36]||(i[36]=me("span",null,"亮度 / Bloom",-1)),me("output",Fb,pt(Re(e).brightText),1)]),me("input",{id:"brightness",type:"range",min:"0.3",max:"2.5",step:"0.05",value:Re(e).brightness,onInput:i[10]||(i[10]=s=>Re(e).setBrightness(+s.target.value))},null,40,Ob)]),me("div",Bb,[me("header",null,[i[37]||(i[37]=me("span",null,"星空密度",-1)),me("output",zb,pt(Re(e).starsText),1)]),me("input",{id:"star-density",type:"range",min:"15",max:"100",step:"1",value:Re(e).starDensity,onInput:i[11]||(i[11]=s=>Re(e).setStarDensity(+s.target.value))},null,40,Hb)]),i[39]||(i[39]=me("div",{class:"section-rule"},null,-1)),i[40]||(i[40]=me("div",{class:"panel-title"},"CHRONO NAVIGATOR",-1)),me("div",Vb,[me("button",{onClick:i[12]||(i[12]=s=>Re(e).jumpDays(-365))},"−1年"),me("button",{onClick:i[13]||(i[13]=s=>Re(e).jumpDays(-30))},"−30日"),me("button",{id:"pause",onClick:i[14]||(i[14]=s=>Re(e).togglePause())},pt(Re(e).pauseText),1),me("button",{onClick:i[15]||(i[15]=s=>Re(e).jumpDays(30))},"+30日"),me("button",{onClick:i[16]||(i[16]=s=>Re(e).jumpDays(365))},"+1年"),me("button",{id:"today",onClick:i[17]||(i[17]=s=>Re(e).goToday())},"归零")]),me("button",{id:"reset",onClick:i[18]||(i[18]=s=>Re(e).reset())},"重置史诗视角")]))}},kb={id:"presets",class:"glass"},Wb={__name:"PresetBar",setup(n){const e=an();return(t,i)=>(Tt(),At("nav",kb,[me("button",{onClick:i[0]||(i[0]=s=>Re(e).goView("overview"))},"太阳系全景"),me("button",{onClick:i[1]||(i[1]=s=>Re(e).goView("inner"))},"内太阳系"),me("button",{onClick:i[2]||(i[2]=s=>Re(e).goView("jupiter"))},"木星系统"),me("button",{onClick:i[3]||(i[3]=s=>Re(e).goView("saturn"))},"土星系统"),me("button",{onClick:i[4]||(i[4]=s=>Re(e).goView("pluto"))},"冥王星特写"),me("button",{onClick:i[5]||(i[5]=s=>Re(e).goView("distant"))},"远日天体")]))}},Xb={id:"tool-dock",class:"glass"},jb={__name:"ToolDock",setup(n){const e=an();return(t,i)=>(Tt(),At("div",Xb,[me("button",{id:"measure",class:xi({active:Re(e).measureActive}),onClick:i[0]||(i[0]=s=>Re(e).toggleMeasure())},"测距",2),me("button",{id:"tour",class:xi({active:Re(e).tourActive}),onClick:i[1]||(i[1]=s=>Re(e).toggleTour())},pt(Re(e).tourBtnText),3),me("button",{id:"follow",class:xi({active:Re(e).followActive}),onClick:i[2]||(i[2]=s=>Re(e).toggleFollow())},pt(Re(e).followBtnText),3)]))}},qb={id:"science-hud",class:"glass"},Yb={__name:"ScienceHud",setup(n){const e=an();return(t,i)=>(Tt(),At("div",qb,pt(Re(e).scienceHud),1))}},Kb={__name:"TourCard",setup(n){const e=an();return(t,i)=>(Tt(),At("div",{id:"tour-card",class:xi(["glass",{show:Re(e).tourActive}])},[me("b",null,pt(Re(e).tourTitle),1),me("span",null,pt(Re(e).tourText),1)],2))}},$b={id:"scale-ruler"},Zb={__name:"ScaleRuler",setup(n){const e=an();return(t,i)=>(Tt(),At("div",$b,[i[0]||(i[0]=me("i",null,null,-1)),me("span",null,pt(Re(e).scaleRuler),1)]))}},Jb={__name:"ToastMessage",setup(n){const e=an();return(t,i)=>(Tt(),At("div",{id:"toast",class:xi(["glass",{show:Re(e).toastShow}])},pt(Re(e).toastText),3))}},Qb={id:"fps"},eE={__name:"FpsCounter",setup(n){const e=an();return(t,i)=>(Tt(),At("div",Qb,pt(Re(e).fpsText),1))}},tE={id:"count"},nE={__name:"BodyCounter",setup(n){const e=an();return(t,i)=>(Tt(),At("div",tE,pt(Re(e).countText),1))}},iE=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},sE={},rE={id:"hint"};function oE(n,e){return Tt(),At("div",rE,"拖拽旋转 · 滚轮缩放 · 右键平移 · 单击查看 · 双击聚焦")}const aE=iE(sE,[["render",oE]]),lE={__name:"App",setup(n){return(e,t)=>(Tt(),At(vn,null,[it(jS),it(JS),it(ob),it(Gb),it(Wb),it(jb),it(Yb),it(Kb),it(Zb),it(Jb),it(eE),it(nE),it(aE)],64))}};yg(lE).use(Eg()).mount("#app");
