/* ============ 全部 GLSL 着色器源码（逐字移植自原单文件版） ============ */

export const commonGLSL = `
      float hash11(float p){p=fract(p*.1031);p*=p+33.33;p*=p+p;return fract(p);}
      float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
      vec3 hash33(vec3 p){p=fract(p*vec3(.1031,.103,.0973));p+=dot(p,p.yxz+33.33);return fract((p.xxy+p.yxx)*p.zyx);}
      float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(dot(hash33(i+vec3(0,0,0))-.5,f-vec3(0,0,0)),dot(hash33(i+vec3(1,0,0))-.5,f-vec3(1,0,0)),f.x),mix(dot(hash33(i+vec3(0,1,0))-.5,f-vec3(0,1,0)),dot(hash33(i+vec3(1,1,0))-.5,f-vec3(1,1,0)),f.x),f.y),mix(mix(dot(hash33(i+vec3(0,0,1))-.5,f-vec3(0,0,1)),dot(hash33(i+vec3(1,0,1))-.5,f-vec3(1,0,1)),f.x),mix(dot(hash33(i+vec3(0,1,1))-.5,f-vec3(0,1,1)),dot(hash33(i+vec3(1,1,1))-.5,f-vec3(1,1,1)),f.x),f.y),f.z)*1.8+.5;}
      float fbm(vec3 p){float f=0.,a=.52;mat3 m=mat3(.00,.80,.60,-.80,.36,-.48,-.60,-.48,.64);for(int i=0;i<6;i++){f+=a*noise3(p);p=m*p*2.03+vec3(7.1,1.7,3.4);a*=.5;}return f;}
      float turb(vec3 p){float f=0.,a=.55;for(int i=0;i<6;i++){f+=a*abs(noise3(p)*2.-1.);p=p*2.08+vec3(2.3,4.1,1.7);a*=.5;}return f;}
      float cells(vec2 P){vec2 I=floor(P),F=fract(P);float d=9.;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 r=o+vec2(hash21(I+o),hash21(I+o+17.4))-F;d=min(d,dot(r,r));}return sqrt(d);}
      mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
      float oval(vec2 p,vec2 c,vec2 s){vec2 d=p-c;d.x=atan(sin(d.x),cos(d.x));return length(d/s);}
    `;

export const bodyVertex = `
      varying vec3 vPos; varying vec3 vWorld; varying vec3 vNormal;
      void main(){vPos=normalize(position);vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;vNormal=normalize(transpose(inverse(mat3(modelMatrix)))*normal);gl_Position=projectionMatrix*viewMatrix*w;}
    `;

export const bodyFragment = `
      precision highp float; uniform float uTime,uSeed;uniform int uType;uniform vec3 uTint;uniform vec3 uSun;varying vec3 vPos,vWorld,vNormal;
      ${commonGLSL}
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
    `;

/* ============ 大气菲涅尔外壳 ============ */
export const ATMO_VERT = `varying vec3 n,w;void main(){n=normalize(transpose(inverse(mat3(modelMatrix)))*normal);w=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);}`;
export const ATMO_FRAG = `uniform vec3 c;uniform float power,intensity;varying vec3 n,w;void main(){vec3 v=normalize(cameraPosition-w);float f=pow(1.-abs(dot(normalize(n),v)),power);gl_FragColor=vec4(c*f*intensity,f*.62);}`;

/* ============ 电影色彩分级（色差 + 蓝阴影/琥珀高光 + 暗角 + 胶片颗粒） ============ */
// A single lightweight grading pass replaces several expensive cinematic passes:
// subtle chromatic dispersion, blue-shadow/amber-highlight grading, vignette and film grain.
export const CINEMA_SHADER = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, enabled: { value: 1 } },
  vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader: `uniform sampler2D tDiffuse;uniform float time,enabled;varying vec2 vUv;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))+time)*43758.5453);}void main(){vec2 d=vUv-.5;float ca=.00125*dot(d,d)*enabled;vec3 c;c.r=texture2D(tDiffuse,vUv+d*ca).r;c.g=texture2D(tDiffuse,vUv).g;c.b=texture2D(tDiffuse,vUv-d*ca).b;float lum=dot(c,vec3(.299,.587,.114));vec3 graded=mix(c,vec3(c.r*1.035,c.g*.995,c.b*1.06),.72*enabled);graded+=vec3(-.012,-.006,.018)*(1.-smoothstep(.04,.55,lum))*enabled;graded+=mix(vec3(.008,.002,.012),vec3(.001,.008,.022),vUv.y)*(1.-smoothstep(.005,.08,lum))*.45*enabled;graded*=1.-dot(d,d)*.28*enabled;graded+=(h(gl_FragCoord.xy)-.5)/255.*enabled;gl_FragColor=vec4(graded,1.);}`,
};
