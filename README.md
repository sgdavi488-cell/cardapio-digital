# Maison — Cardápio Digital

O Maison é um cardápio digital criado para um restaurante fictício. A ideia nasceu de uma atividade do curso de programação: depois de desenvolver uma primeira versão durante o curso, decidi refazer o projeto e explorar melhor a interface, a organização dos produtos e o fluxo de pedidos.

**[Acessar o projeto online](https://sgdavi488-cell.github.io/cardapio-digital/)**

## O que o projeto faz

- Exibe pratos separados em entradas, principais, sobremesas e bebidas.
- Permite buscar itens pelo nome ou pela descrição.
- Filtra o cardápio por categoria.
- Adiciona produtos à sacola e permite ajustar as quantidades.
- Calcula o total do pedido automaticamente.
- Prepara uma mensagem com os itens e o total para continuar o pedido pelo WhatsApp.
- Adapta a interface para celular e computador.

## Como os dados são organizados

O catálogo fica em `data/menu.json`. A aplicação carrega esse arquivo usando `fetch`, separando os dados dos produtos da parte visual.

As configurações do fluxo de pedidos ficam em `config.js`. Para habilitar o envio ao WhatsApp, é necessário preencher `whatsappNumber` com o número que receberá os pedidos, incluindo DDI e DDD e usando somente números:

```js
window.RESTAURANT_CONFIG = {
  whatsappNumber: "55DDDNÚMERO"
};
```

O valor acima é apenas um modelo. O repositório não inclui um número real. Enquanto essa configuração estiver vazia, o botão informa que falta configurar o WhatsApp.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- JSON para os dados do cardápio
- LocalStorage não é necessário: a sacola é mantida durante a sessão atual da página

## Estrutura principal

```text
cardapio-digital/
├── data/
│   └── menu.json
├── config.js
├── app.js
├── index.html
└── styles.css
```

## Executar localmente

Como o cardápio é carregado com `fetch`, abra o projeto por meio de um servidor local. No VS Code, você pode usar a extensão Live Server.

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto no VS Code.
3. Inicie o `index.html` com o Live Server.
4. Acesse o endereço local exibido pela extensão.

Abrir o arquivo HTML diretamente pelo gerenciador de arquivos pode impedir o carregamento de `data/menu.json`.

## Observações

- Maison é uma marca fictícia criada para o projeto.
- As imagens do cardápio vêm de serviços externos; por isso, precisam de conexão com a internet.
- O WhatsApp apenas recebe a mensagem preparada pelo site. A confirmação do pedido acontece fora da aplicação.
- O catálogo atual é de demonstração e pode ser alterado em `data/menu.json`.

---

Projeto desenvolvido por Davi como parte dos estudos de desenvolvimento web.
