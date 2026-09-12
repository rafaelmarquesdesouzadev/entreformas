(function(){
  var doc=document.documentElement, nav=document.querySelector('nav'),
      abertura=document.querySelector('.abertura'),
      escura=document.body.dataset.navEscura==='1';

  function navEstado(){
    if(!nav)return;                       // a home não tem barra fixa
    var y=window.pageYOffset;
    if(escura){nav.classList.add('escura');nav.classList.toggle('solida',y>40);return}
    var lim=abertura?abertura.offsetHeight-70:80;
    nav.classList.toggle('solida',y>lim);
  }

  var pedido=false;
  function quadro(){ pedido=false; navEstado(); }
  function medir(){ navEstado(); }
  addEventListener('scroll',function(){
    if(!pedido){pedido=true;requestAnimationFrame(quadro)}
  },{passive:true});
  addEventListener('resize',medir);
  navEstado();

  // ---- menu no celular
  var btnMenu=nav?nav.querySelector('.menu'):null,
      lista=nav?nav.querySelector('ul'):null;
  if(btnMenu&&lista){
    btnMenu.addEventListener('click',function(){
      var aberto=lista.classList.toggle('aberto');
      btnMenu.setAttribute('aria-expanded',aberto?'true':'false');
    });
    lista.addEventListener('click',function(){
      lista.classList.remove('aberto');
      btnMenu.setAttribute('aria-expanded','false');
    });
    addEventListener('keydown',function(e){
      if(e.key==='Escape'){lista.classList.remove('aberto');
        btnMenu.setAttribute('aria-expanded','false')}
    });
  }

  // ---- reveal discreto
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
    },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
    document.querySelectorAll('.rv').forEach(function(el,i){
      el.style.setProperty('--d',((i%5)*0.06).toFixed(2)+'s'); io.observe(el);
    });
  }else{document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')})}


  // ---- carrossel da obra em destaque
  var car=document.getElementById('carrossel');
  if(car){
    var slides=car.querySelectorAll('.slide'),
        pontos=document.querySelectorAll('.pontos .pt'),
        atualS=0, timer=null,
        parado=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    function mostrar(n){
      atualS=(n+slides.length)%slides.length;
      slides.forEach(function(s,i){s.classList.toggle('on',i===atualS)});
      pontos.forEach(function(p,i){p.classList.toggle('on',i===atualS)});
    }
    function rodar(){ if(parado)return; clearInterval(timer);
      timer=setInterval(function(){mostrar(atualS+1)},4000); }
    pontos.forEach(function(p){
      p.addEventListener('click',function(){mostrar(+p.dataset.i);rodar()});
    });
    car.addEventListener('mouseenter',function(){clearInterval(timer)});
    car.addEventListener('mouseleave',rodar);
    document.addEventListener('visibilitychange',function(){
      document.hidden?clearInterval(timer):rodar();
    });
    rodar();
  }


  // ---- entrada do portal: marca primeiro, menu em seguida
  var menuP=document.getElementById('menuPortal');
  if(menuP){
    var reduz=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches),
        revelado=false, t=null;
    menuP.querySelectorAll('a').forEach(function(a,i){
      a.style.setProperty('--d',(i*0.18).toFixed(2)+'s');
    });
    function revelar(){
      if(revelado)return; revelado=true; clearTimeout(t);
      menuP.classList.add('revelado');
      ['wheel','touchmove','keydown','click'].forEach(function(ev){
        removeEventListener(ev,revelar);
      });
    }
    if(reduz){revelar();}
    else{
      t=setTimeout(revelar,4600);
      ['wheel','touchmove','keydown','click'].forEach(function(ev){
        addEventListener(ev,revelar,{passive:true});
      });
    }
  }


  // ---- envio do formulário pelo WhatsApp ou e-mail, sem servidor
  var fc=document.getElementById('formContato');
  if(fc){
    var ZAP='5511965857037', MAIL='entreformas.contato@gmail.com',
        retorno=document.getElementById('retornoEnvio');
    function valor(n){var e=fc.querySelector('[name="'+n+'"]');return e?e.value.trim():''}
    function en(){return document.documentElement.lang==='en'}
    function faltando(){
      var tel=valor('telefone').replace(/\D/g,'');
      if(!valor('nome')) return en()?'Please enter your name.':'Informe seu nome.';
      if(tel.length<10) return en()?'Enter a phone number with area code.'
                                  :'Informe um telefone com DDD.';
      return '';
    }
    function mensagem(){
      var L=en()
        ? {t:'Quote request — Entre Formas website',n:'Name',f:'Phone',e:'E-mail',o:'Type of work',m:'Details'}
        : {t:'Pedido de orçamento — site Entre Formas',n:'Nome',f:'Telefone',e:'E-mail',o:'Tipo de obra',m:'Descrição'};
      var l=[L.t,'',L.n+': '+valor('nome'),L.f+': '+valor('telefone')];
      if(valor('email')) l.push(L.e+': '+valor('email'));
      l.push(L.o+': '+valor('tipo'));
      if(valor('mensagem')) l.push('',L.m+': '+valor('mensagem'));
      return {titulo:L.t, corpo:l.join('\n')};
    }
    function avisar(txt,erro){
      if(!retorno)return;
      retorno.textContent=txt;
      retorno.className='retorno-envio'+(erro?' erro-envio':'');
    }
    function enviar(canal){
      var f=faltando();
      if(f){avisar(f,true);
        var alvo=fc.querySelector(valor('nome')?'[name="telefone"]':'[name="nome"]');
        if(alvo)alvo.focus();
        return;}
      var m=mensagem();
      if(canal==='email'){
        location.href='mailto:'+MAIL+'?subject='+encodeURIComponent(m.titulo)+
                      '&body='+encodeURIComponent(m.corpo);
        avisar(en()?'We opened your e-mail app with the message ready.'
                  :'Abrimos seu aplicativo de e-mail com a mensagem pronta.');
      }else{
        window.open('https://wa.me/'+ZAP+'?text='+encodeURIComponent(m.corpo),'_blank','noopener');
        avisar(en()?'We opened WhatsApp with your request. Just hit send.'
                  :'Abrimos o WhatsApp com seu pedido. Basta tocar em enviar.');
      }
    }
    fc.addEventListener('submit',function(e){e.preventDefault();enviar('whatsapp')});
    var bmail=fc.querySelector('.por-email');
    if(bmail)bmail.addEventListener('click',function(){enviar('email')});
    fc.addEventListener('input',function(){avisar('')});
  }


  // ---- ampliar foto ao clicar
  if(document.querySelector('.fotos-obra')){
    var lupa=document.createElement('div'); lupa.id='lupa';
    lupa.innerHTML='<span class="fechar" aria-hidden="true">✕</span><img alt="">';
    document.body.appendChild(lupa);
    var grande=lupa.querySelector('img');
    document.addEventListener('click',function(e){
      var img=e.target.closest?e.target.closest('.fotos-obra img'):null;
      if(img){ grande.src=img.src; grande.alt=img.alt||''; lupa.classList.add('on'); }
      else if(lupa.classList.contains('on')) lupa.classList.remove('on');
    });
    addEventListener('keydown',function(e){
      if(e.key==='Escape') lupa.classList.remove('on');
    });
  }

  // ---- formulário
  var form=document.querySelector('form[data-valida]');
  if(form){
    form.addEventListener('submit',function(e){
      var tel=form.querySelector('[name="telefone"]'), erro=form.querySelector('.erro');
      if((tel.value||'').replace(/\D/g,'').length<10){
        e.preventDefault(); tel.focus();
        if(erro)erro.textContent=(doc.lang==='en'
          ? 'Enter a phone number with area code.'
          : 'Informe um telefone com DDD.');
      }
    });
    form.addEventListener('input',function(){
      var erro=form.querySelector('.erro'); if(erro)erro.textContent='';
    });
  }

  // ---- PT / EN
  var btn=document.querySelector('.idioma');
  if(btn && window.EN){
    var pt={};
    function coletar(){
      document.querySelectorAll('[data-i18n]').forEach(function(el){
        pt[el.dataset.i18n]=el.innerHTML;
      });
      document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
        pt['ph:'+el.dataset.i18nPh]=el.getAttribute('placeholder')||'';
      });
    }
    function aplicar(idioma){
      var d=idioma==='en'?window.EN:pt;
      document.querySelectorAll('[data-i18n]').forEach(function(el){
        var v=d[el.dataset.i18n]; if(v)el.innerHTML=v;
      });
      document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
        var v=d[idioma==='en'?'ph:'+el.dataset.i18nPh:'ph:'+el.dataset.i18nPh];
        if(v)el.setAttribute('placeholder',v);
      });
      doc.lang=idioma==='en'?'en':'pt-BR';
      btn.textContent=idioma==='en'?'PT':'EN';
      try{localStorage.setItem('ef_idioma',idioma)}catch(x){}
      medir();
    }
    coletar();
    var salvo='pt';
    try{salvo=localStorage.getItem('ef_idioma')||'pt'}catch(x){}
    if(salvo==='en')aplicar('en');
    btn.addEventListener('click',function(){
      aplicar(doc.lang==='en'?'pt':'en');
    });
  }
})();
