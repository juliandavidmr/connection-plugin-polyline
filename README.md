# Rete connection plugin

Plugin to create connections with polylines in Rete.

<center>
    <img src="./demo.png" width="400" />
</center>

## Install

- NPM:

```bash
npm i -S rete-connection-plugin-polyline
```

- Yarn:

```bash
yarn add rete-connection-plugin-polyline
```

## Use

```ts
import * as ConnectionPlugin from 'rete-connection-plugin-polyline'

const editor = new NodeEditor(/* ... */)
editor.use(ConnectionPlugin)
```

_<small>Created to be used in a [rete fork](https://github.com/juliandavidmr/rete), it is fully compatible with Rete.</small>_