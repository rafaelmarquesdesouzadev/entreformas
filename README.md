# Entre Formas — site

Site institucional da **Entre Formas, Arquitetura e Construções Ltda.**
Estático, sem build, sem dependências. Abra `index.html` no navegador para ver local.

Publicado em **https://entreformas.arq.br** via GitHub Pages (branch `main`, pasta raiz).

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home — porta de entrada estática, sem rolagem |
| `obras.html` | Índice das quatro obras, com prévia no hover |
| `obra-escritorio.html` | Comercial Pompéia |
| `obra-apartamento.html` | Apartamento Tito |
| `obra-reforma-completa.html` | Apartamento Sousa Dias |
| `obra-apartamento-compacto.html` | Apartamento Passarelli |
| `empresa.html` | Institucional e comparação entre contrato único e separado |
| `percurso.html` | Cinco etapas da obra, cronograma, planilha e dúvidas |
| `contato.html` | Formulário, canais e faixa de fotos |
| `obrigado.html` | Fora do fluxo — o formulário abre o WhatsApp |

## Assets

```
assets/styles.css      estilos do site inteiro
assets/site.js         navegação, menu, formulário, troca de idioma
assets/i18n.js         dicionário EN, indexado por data-i18n
assets/escultura.js    animação de fundo da home (12 módulos SVG, ciclo de 24s)
img/obra1..obra4/      48 fotos autorais
og.jpg                 imagem de compartilhamento, 1200x630
favicon.svg
CNAME                  entreformas.arq.br
.nojekyll              impede o GitHub de processar o site com Jekyll
robots.txt
```

## PT / EN

O português fica no HTML e o inglês em `assets/i18n.js`, indexado pelos atributos
`data-i18n`. O botão EN troca na hora, guarda a escolha em `localStorage` e atualiza
o atributo `lang` do `<html>`.

**Ao editar um texto em português, atualize a chave correspondente no `i18n.js`.**

## Formulário

Não depende de servidor. Valida nome e telefone, monta a mensagem no idioma em que
o site está e abre o WhatsApp (`wa.me`) já preenchido. Há um link alternativo que
abre o e-mail.

## Publicar uma atualização

Pelo navegador: repositório > **Add file** > **Upload files** > arraste o **conteúdo**
da pasta (não a pasta) > **Commit changes**. Publica em segundos.

> O upload pelo navegador **ignora arquivos ocultos**, então o `.nojekyll` não sobe
> por esse caminho. Se ele sumir, recrie por **Add file > Create new file** com o nome
> `.nojekyll` e conteúdo vazio.

Por linha de comando:

```bash
git clone https://github.com/rafaelmarquesdesouzadev/entreformas.git
# edite os arquivos
git add -A && git commit -m "atualiza site" && git push
```

## Domínio e DNS

`entreformas.arq.br` está registrado no registro.br. A zona aponta para o GitHub Pages:

```
A      (nome vazio)   185.199.108.153
A      (nome vazio)   185.199.109.153
A      (nome vazio)   185.199.110.153
A      (nome vazio)   185.199.111.153
CNAME  www            rafaelmarquesdesouzadev.github.io
```

O certificado HTTPS é emitido pelo próprio GitHub. Quando ficar disponível, marque
**Enforce HTTPS** em Settings > Pages.

## Contato

WhatsApp (11) 96585-7037 · entreformas.contato@gmail.com · Instagram [@entre1formas](https://www.instagram.com/entre1formas)
