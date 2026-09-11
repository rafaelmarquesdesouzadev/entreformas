# Entre Formas — site (v3)

Estático, sem build. Abra `index.html` no navegador.

## Páginas
index.html ............ home curta: abertura, obra em destaque, o que somos,
                        quatro portas de navegação
obras.html ............ índice de obras em linhas, com prévia no hover
obra-apartamento.html   modelo de página de obra (duplicar para novas)
obra-casa.html
obra-marcenaria.html
empresa.html .......... a lacuna papel/canteiro, dados institucionais,
                        cinco frentes, contrato único x separado
percurso.html ......... faixa horizontal das 5 etapas, cronograma e planilha
                        desenhados, relatório e vistoria explicados, dúvidas
contato.html .......... formulário, canais, selos e os três passos
obrigado.html ......... pós-envio do formulário

## Dados reais já aplicados
CNPJ 49.900.868/0001-37 · em atividade desde 2020
Responsável técnico: Lucas Dias, arquiteto — CAU A271613-5
WhatsApp (11) 96585-7037 · entreformas.contato@gmail.com
Instagram @entreformas (texto sem link — confirmar se o perfil existe)
Endereço da sede: não divulgado, conforme pedido

## O que ainda falta (procure por class="vazio" no HTML)
Nome, bairro, área, prazo, período e crédito de fotografia de cada obra;
texto de cada obra; fornecedores; RPJ da empresa no CAU, se existir.

## PT / EN
O português está no HTML; o inglês em `assets/i18n.js`, indexado pelos
atributos `data-i18n`. O botão EN no menu troca na hora e guarda a escolha.
Ao editar um texto em português, atualize a chave correspondente no i18n.js.
Páginas de obra ficam só em português, como combinado.

## Publicar na Netlify
Projeto entre-formas > Deploys > arraste esta pasta (ou o .zip).
Depois do primeiro deploy: Forms > Form notifications > notificação por
e-mail para entreformas.contato@gmail.com.
Atenção: a equipe está com "exigir login SSO" ligado — desligue em
Site configuration > Visitor access, ou o site abre pedindo login.

## Domínio
entreformas.arq.br — registrado no registro.br em nome do Lucas (CPF).
Endereço oficial do site: https://www.entreformas.arq.br
Canonical e og:url de todas as páginas já apontam para esse endereço.

Ligar o domínio na Netlify (uma vez):
1. Netlify > projeto entre-formas > Domain management > Add a domain
   > digite entreformas.arq.br (a Netlify adiciona o www junto)
2. No registro.br, em Editar zona / DNS do domínio, crie:
   - A     @ (ou em branco)  ->  75.2.60.5
   - CNAME www               ->  entre-formas.netlify.app
3. Espere a propagação (algumas horas, até 48h no limite) e confirme em
   Domain management. O certificado HTTPS é emitido pela Netlify sozinho.
Alternativa: apontar os nameservers do domínio para a Netlify DNS, que
gerencia os registros automaticamente — só faça isso se não for usar
e-mail no domínio por outro serviço.

## Trocar as fotos
Substitua os arquivos de `img/` mantendo os nomes (obra-01 a obra-12).
JPG, até 1600px no maior lado, ~300KB.

## Percurso horizontal
Seção `#percurso` no percurso.html. A altura é calculada pelo JS: a rolagem
vertical vira movimento lateral. Para mudar o ritmo, altere a largura dos
painéis em `.painel { width: ... }` no styles.css. No celular vira faixa
deslizante com encaixe.
