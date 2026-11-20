# Maison — Cardápio Digital

Um cardápio online para um restaurante fictício. A ideia foi montar algo que desse para imaginar em uso de verdade: abrir no celular, encontrar um prato sem ficar caçando informação, colocar na sacola e encaminhar o pedido.

## O que já funciona

- Cardápio separado em entradas, pratos principais, sobremesas e bebidas.
- Busca por nome e descrição.
- Filtros por categoria.
- Sacola com quantidade dos itens e total atualizado.
- Pedido organizado para ser enviado pelo WhatsApp.
- Catálogo carregado de um arquivo JSON.
- Layout que se adapta a celular e computador.

## Um detalhe do projeto

Os pratos ficam em `data/menu.json`. O JavaScript busca esse arquivo com `fetch`, então o catálogo fica separado da interface. É uma forma simples de simular uma API de leitura sem precisar manter um servidor próprio.

## Tecnologias

HTML, CSS e JavaScript puro.

## Configurar o WhatsApp

No arquivo `config.js`, coloque o número que vai receber os pedidos, com código do país e DDD, somente números:

```js
window.RESTAURANT_CONFIG = {
  whatsappNumber: "5581999999999"
};
```

O número acima é apenas um exemplo. Troque pelo número correto antes de usar o fluxo de pedidos.

## Rodar no computador

Como o catálogo é carregado com `fetch`, inicie o projeto com Live Server ou outro servidor local. Abrir o arquivo `index.html` diretamente pode impedir o carregamento do JSON.

## Acessar online

[Ver o Maison no GitHub Pages](https://sgdavi488-cell.github.io/cardapio-digital/)

---

Maison é uma marca fictícia criada para este projeto. As imagens são carregadas de serviços externos e precisam de conexão com a internet.
