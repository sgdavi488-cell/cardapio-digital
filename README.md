# Maison — Cardápio Digital

Uma experiência de cardápio digital para um restaurante fictício de cozinha contemporânea. O projeto foi pensado como uma vitrine real: navegação simples, fotografia em destaque, texto editorial e um fluxo de pedido direto.

## O que tem por aqui

- Menu dividido em entradas, principais, sobremesas e bebidas.
- Busca por nome e descrição, além de filtros por categoria.
- Sacola com controle de quantidades e total calculado automaticamente.
- Finalização do pedido pelo WhatsApp, com resumo e valores.
- Catálogo carregado por uma requisição `fetch` a um endpoint JSON do próprio projeto.
- Layout adaptável para celular e desktop.

## Tecnologias

HTML, CSS e JavaScript puro. O catálogo fica em `data/menu.json`, servido como recurso JSON estático. Isso funciona como uma API de leitura (GET) para este projeto e pode ser substituído por um backend real no futuro.

## Configurar o WhatsApp

Abra `config.js` e informe o número que receberá os pedidos, com código do país e DDD, apenas números.

```js
window.RESTAURANT_CONFIG = {
  whatsappNumber: "5581999999999"
};
```

O número fica em um arquivo separado para facilitar a configuração. O pedido é aberto no WhatsApp do cliente com os itens, quantidades e total; a confirmação e o pagamento são tratados pela equipe.

## Rodar localmente

Como o catálogo é carregado com `fetch`, abra o projeto por um servidor local (por exemplo, Live Server no VS Code), e não diretamente pelo arquivo `index.html`.

## Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)`, depois salve.
4. Aguarde o deploy. O endereço será:

https://sgdavi488-cell.github.io/cardapio-digital/

## Observação

Maison é uma marca e um restaurante fictícios criados para demonstração de desenvolvimento front-end. Fotos carregadas de imagens remotas dependem de conexão com a internet.
