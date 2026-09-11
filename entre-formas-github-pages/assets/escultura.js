/* Entre Formas — grid que vira módulos, parede, maquete e logo.
   Roda apenas na home; cada módulo é um grupo persistente com três faces. */
(function(){
  var svg=document.getElementById('escultura');
  if(!svg) return;
  var reduz=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var DADOS = [{"A": {"x": 64, "y": 92, "w": 56, "h": 56, "d": 0}, "B": {"x": 20, "y": 82, "w": 118, "h": 52, "d": 0}, "C": {"x": 66, "y": 336, "w": 150, "h": 54, "d": 10}, "D": {"x": 89.6, "y": 353.8, "w": 168.7, "h": 27.7, "d": 50.8}, "E": {"x": 145.8, "y": 80.8, "w": 77.0, "h": 77.0, "d": 0}, "cor": "claro", "z": 0}, {"A": {"x": 184, "y": 92, "w": 56, "h": 56, "d": 0}, "B": {"x": 140, "y": 82, "w": 118, "h": 52, "d": 0}, "C": {"x": 221, "y": 336, "w": 150, "h": 54, "d": 10}, "D": {"x": 286.1, "y": 353.8, "w": 154.9, "h": 27.7, "d": 50.8}, "E": {"x": 218.8, "y": 80.8, "w": 77.0, "h": 77.0, "d": 0}, "cor": "claro", "z": 0}, {"A": {"x": 304, "y": 92, "w": 56, "h": 56, "d": 0}, "B": {"x": 260, "y": 82, "w": 118, "h": 52, "d": 0}, "C": {"x": 376, "y": 336, "w": 150, "h": 54, "d": 10}, "D": {"x": 122.0, "y": 326.0, "w": 127.1, "h": 27.7, "d": 46.2}, "E": {"x": 145.8, "y": 153.8, "w": 77.0, "h": 77.0, "d": 0}, "cor": "claro", "z": 0}, {"A": {"x": 424, "y": 92, "w": 56, "h": 56, "d": 0}, "B": {"x": 380, "y": 82, "w": 118, "h": 52, "d": 0}, "C": {"x": 14.999999999999993, "y": 277, "w": 150, "h": 54, "d": 10}, "D": {"x": 103.5, "y": 272.9, "w": 83.2, "h": 53.2, "d": 46.2}, "E": {"x": 218.8, "y": 153.8, "w": 77.0, "h": 77.0, "d": 0}, "cor": "claro", "z": 0}, {"A": {"x": 64, "y": 197, "w": 56, "h": 56, "d": 0}, "B": {"x": 68, "y": 197, "w": 118, "h": 52, "d": 0}, "C": {"x": 170.0, "y": 277, "w": 150, "h": 54, "d": 10}, "D": {"x": 198.2, "y": 282.1, "w": 64.7, "h": 43.9, "d": 41.6}, "E": {"x": 225.2, "y": 160.2, "w": 96.5, "h": 96.5, "d": 0}, "cor": "medio", "z": 1}, {"A": {"x": 184, "y": 197, "w": 56, "h": 56, "d": 0}, "B": {"x": 188, "y": 197, "w": 118, "h": 52, "d": 0}, "C": {"x": 325.0, "y": 277, "w": 150, "h": 54, "d": 10}, "D": {"x": 299.9, "y": 305.2, "w": 76.3, "h": 48.5, "d": 46.2}, "E": {"x": 317.8, "y": 160.2, "w": 96.5, "h": 96.5, "d": 0}, "cor": "medio", "z": 1}, {"A": {"x": 304, "y": 197, "w": 56, "h": 56, "d": 0}, "B": {"x": 308, "y": 197, "w": 118, "h": 52, "d": 0}, "C": {"x": 66, "y": 218, "w": 150, "h": 54, "d": 10}, "D": {"x": 122.0, "y": 224.3, "w": 87.8, "h": 76.3, "d": 48.5}, "E": {"x": 225.2, "y": 252.8, "w": 96.5, "h": 96.5, "d": 0}, "cor": "medio", "z": 1}, {"A": {"x": 424, "y": 197, "w": 56, "h": 56, "d": 0}, "B": {"x": 428, "y": 197, "w": 118, "h": 52, "d": 0}, "C": {"x": 221, "y": 218, "w": 150, "h": 54, "d": 10}, "D": {"x": 223.7, "y": 233.6, "w": 80.9, "h": 76.3, "d": 43.9}, "E": {"x": 317.8, "y": 252.8, "w": 96.5, "h": 96.5, "d": 0}, "cor": "medio", "z": 1}, {"A": {"x": 64, "y": 302, "w": 56, "h": 56, "d": 0}, "B": {"x": 20, "y": 312, "w": 118, "h": 52, "d": 0}, "C": {"x": 376, "y": 218, "w": 150, "h": 54, "d": 10}, "D": {"x": 325.3, "y": 222.0, "w": 83.2, "h": 83.2, "d": 48.5}, "E": {"x": 225.2, "y": 160.2, "w": 70.5, "h": 37.2, "d": 0}, "cor": "branco", "z": 2}, {"A": {"x": 184, "y": 302, "w": 56, "h": 56, "d": 0}, "B": {"x": 140, "y": 312, "w": 118, "h": 52, "d": 0}, "C": {"x": 14.999999999999993, "y": 159, "w": 150, "h": 54, "d": 10}, "D": {"x": 175.1, "y": 131.9, "w": 74.0, "h": 101.7, "d": 50.8}, "E": {"x": 225.2, "y": 193.5, "w": 70.5, "h": 37.2, "d": 0}, "cor": "branco", "z": 2}, {"A": {"x": 304, "y": 302, "w": 56, "h": 56, "d": 0}, "B": {"x": 260, "y": 312, "w": 118, "h": 52, "d": 0}, "C": {"x": 170.0, "y": 159, "w": 150, "h": 54, "d": 10}, "D": {"x": 262.9, "y": 155.0, "w": 67.0, "h": 78.6, "d": 46.2}, "E": {"x": 225.2, "y": 252.8, "w": 96.5, "h": 96.5, "d": 0}, "cor": "medio", "z": 1}, {"A": {"x": 424, "y": 302, "w": 56, "h": 56, "d": 0}, "B": {"x": 380, "y": 312, "w": 118, "h": 52, "d": 0}, "C": {"x": 325.0, "y": 159, "w": 150, "h": 54, "d": 10}, "D": {"x": 122.0, "y": 194.3, "w": 182.6, "h": 30.0, "d": 41.6}, "E": {"x": 218.8, "y": 153.8, "w": 77.0, "h": 77.0, "d": 0}, "cor": "claro", "z": 0}];
  var NS='http://www.w3.org/2000/svg', OX=0.58, OY=0.46, CICLO=24000,
      CORE={claro:'#4D9AC4', medio:'#1F5F8B', branco:'#FFFFFF'},
      OPAC={A:.34,B:.46,C:.62,D:.92,E:1.00},
      PAUSA=0.095, TR=(1-PAUSA)/8,
      ROTEIRO=[[0,'A'],[TR,'B'],[2*TR,'C'],[3*TR,'D'],[4*TR,'E'],
               [4*TR+PAUSA,'E'],[5*TR+PAUSA,'D'],[6*TR+PAUSA,'C'],
               [7*TR+PAUSA,'B'],[1,'A']],
      t0=performance.now(), rodando=true, ultimaOrdem='', ultimoQuadro=0;

  var pecas=DADOS.map(function(d,i){
    var g=document.createElementNS(NS,'g');
    function face(cor){var p=document.createElementNS(NS,'polygon');
      p.setAttribute('fill',cor); g.appendChild(p); return p;}
    var lado=face('#1A5078'), topo=face('#5DA8CE'), frente=face('#2C6E9E');
    svg.appendChild(g);
    return {d:d,g:g,frente:frente,topo:topo,lado:lado,i:i,pesoAnterior:-1,
            atraso:(i%4)*0.014+Math.floor(i/4)*0.012};
  });

  function bezier(p1x,p1y,p2x,p2y){
    function A(a,b){return 1-3*b+3*a} function B(a,b){return 3*b-6*a} function C(a){return 3*a}
    function calc(t,a,b){return ((A(a,b)*t+B(a,b))*t+C(a))*t}
    function der(t,a,b){return 3*A(a,b)*t*t+2*B(a,b)*t+C(a)}
    return function(x){var t=x;for(var i=0;i<5;i++){var d=der(t,p1x,p2x);if(!d)break;
      t-=(calc(t,p1x,p2x)-x)/d;} return calc(t,p1y,p2y);};
  }
  var suave=bezier(.76,0,.24,1);

  function trecho(p){
    for(var i=0;i<ROTEIRO.length-1;i++)
      if(p>=ROTEIRO[i][0]&&p<=ROTEIRO[i+1][0])
        return {de:ROTEIRO[i][1],para:ROTEIRO[i+1][1],
                t:(p-ROTEIRO[i][0])/((ROTEIRO[i+1][0]-ROTEIRO[i][0])||1)};
    return {de:'A',para:'A',t:0};
  }
  function pts(a){return a.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ')}
  function hex(c){return [parseInt(c.substr(1,2),16),parseInt(c.substr(3,2),16),
                          parseInt(c.substr(5,2),16)]}
  function mistura(a,b,t){
    if(t<=0)return a; if(t>=1)return b;
    var A=hex(a),B=hex(b),o='#';
    for(var i=0;i<3;i++){var v=Math.round(A[i]+(B[i]-A[i])*t).toString(16);
      o+=(v.length<2?'0':'')+v;}
    return o;
  }

  function desenhar(p){
    var s=trecho(p), ordem=[];
    pecas.forEach(function(pc){
      var t=suave(Math.min(1,Math.max(0,(s.t-pc.atraso)/(1-pc.atraso))));
      var a=pc.d[s.de], b=pc.d[s.para];
      var x=a.x+(b.x-a.x)*t, y=a.y+(b.y-a.y)*t,
          w=a.w+(b.w-a.w)*t, h=a.h+(b.h-a.h)*t, d=a.d+(b.d-a.d)*t;
      var ox=d*OX, oy=d*OY;
      pc.frente.setAttribute('points',pts([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]));
      pc.topo.setAttribute('points',  pts([[x,y],[x+ox,y-oy],[x+w+ox,y-oy],[x+w,y]]));
      pc.lado.setAttribute('points',  pts([[x+w,y],[x+w+ox,y-oy],[x+w+ox,y+h-oy],[x+w,y+h]]));
      pc.g.setAttribute('opacity',(OPAC[s.de]+(OPAC[s.para]-OPAC[s.de])*t).toFixed(3));
      var peso=(s.de==='E'?1-t:0)+(s.para==='E'?t:0), alvo=CORE[pc.d.cor];
      var pesoArred=Math.round(peso*20)/20;       // 20 degraus bastam para o olho
      if(pesoArred!==pc.pesoAnterior){
        pc.pesoAnterior=pesoArred;
        pc.frente.setAttribute('fill',mistura('#2C6E9E',alvo,pesoArred));
        pc.topo.setAttribute('fill',  mistura('#5DA8CE',alvo,pesoArred));
        pc.lado.setAttribute('fill',  mistura('#1A5078',alvo,pesoArred));
      }
      ordem.push({g:pc.g, i:pc.i, ordem:(peso>0.5?pc.d.z:0)*1e6+(y+h)*1000-x});
    });
    ordem.sort(function(a,b){return a.ordem-b.ordem});
    var assinatura=ordem.map(function(e){return e.i}).join(',');
    if(assinatura!==ultimaOrdem){                 // reempilhar custa caro: só quando muda
      ultimaOrdem=assinatura;
      ordem.forEach(function(e){svg.appendChild(e.g)});
    }
  }

  function quadro(agora){
    if(rodando) requestAnimationFrame(quadro);
    if(agora-ultimoQuadro < 33) return;          // ~30 fps bastam para um movimento lento
    ultimoQuadro=agora;
    desenhar(((agora-t0)%CICLO)/CICLO);
  }
  document.addEventListener('visibilitychange',function(){   // poupa bateria em aba oculta
    if(document.hidden){rodando=false;}
    else if(!reduz){rodando=true; t0=performance.now(); requestAnimationFrame(quadro);}
  });

  var estreito=!!(window.matchMedia&&window.matchMedia('(max-width:820px)').matches);
  if(reduz||estreito){ desenhar(0); }       // movimento reduzido ou celular: fica no grid
  else requestAnimationFrame(quadro);
})();
