# Defi Staking App (forked and updated)

This repository started from the Packt Publishing sample project:

https://github.com/PacktPublishing/Complete-DApp---Solidity-React---Blockchain-Development

This copy has been extended and updated locally with:

- Modificaciones y validaciones propias en la UI y lógica (por ejemplo: mejora del `Navbar`, manejo seguro de cuentas Web3, validaciones al cargar contratos).
- Actualizaciones de dependencias (Truffle, solc, Web3, react-scripts y otras) para que el proyecto compile y se ejecute en entornos modernos.
- Cambios en scripts de npm para mitigar problemas con OpenSSL/Node (ej. `NODE_OPTIONS=--openssl-legacy-provider` cuando es necesario).

Si usas este repositorio, ten en cuenta que es una derivación del proyecto original y contiene trabajo adicional del mantenedor actual.

## Estado

Versión adaptada para desarrollo local con Ganache y Truffle (solc 0.5.17). Comprueba los archivos `truffle-config.js` y `migrations/` para detalles de despliegue.

## Requisitos

- Node.js (se recomienda Node 18 LTS para compatibilidad con Truffle y evitar problemas con OpenSSL 3)
- npm o yarn
- Ganache (GUI o CLI) escuchando en 127.0.0.1:7545 por defecto
- Truffle (localmente instalado o usar `npx truffle`)

## Instalación y ejecución rápida (zsh)

```zsh
# instalar dependencias
npm install

# arrancar Ganache (si usas GUI ábrelo; si usas CLI: ganache --port 7545)

# compilar y migrar contratos
npx truffle migrate --network development --reset

# arrancar la app React
npm run start
```

Notas:
- Si obtienes un error relacionado con OpenSSL al ejecutar `npm start` (por ejemplo `ERR_OSSL_EVP_UNSUPPORTED`), puedes usar temporalmente:

```zsh
NODE_OPTIONS=--openssl-legacy-provider npm run start
```

o instalar/usar Node 18 LTS.

## Cambios relevantes en esta fork

- `src/components/Navbar.js`: Navbar responsive y colapsable; truncamiento de dirección de cuenta.
- `src/components/App.js`: Documentación y manejo más robusto de `loadWeb3` y `loadBlockchainData` (validación de cuentas, uso de variables locales antes de llamadas a contratos).
- `truffle-config.js`: compilador fijado a `0.5.17` para evitar problemas de resolución remota.
- `package.json`: scripts ajustados para compatibilidad con OpenSSL cuando aplica.

## Licencia y atribución

El código original proviene del repositorio de Packt (enlace más arriba). Esta versión contiene modificaciones y mejoras realizadas por el autor de esta fork.

Este repositorio se publica bajo la Licencia MIT. Consulta el archivo `LICENSE` para el texto completo.

Si eres el autor original y tienes preocupaciones sobre la licencia o atribución, contacta al mantenedor de este fork.

## Contacto

Si necesitas que deje el repositorio en un estado distinto (por ejemplo, vacío) o que realice alguna operación git adicional, indícalo y preparo los comandos seguros.
# Repo vacío
```markdown
# Defi Staking App (forked and updated)

This repository started from the Packt Publishing sample project:

https://github.com/PacktPublishing/Complete-DApp---Solidity-React---Blockchain-Development

This copy has been extended and updated locally with:

- Modificaciones y validaciones propias en la UI y lógica (por ejemplo: mejora del `Navbar`, manejo seguro de cuentas Web3, validaciones al cargar contratos).
- Actualizaciones de dependencias (Truffle, solc, Web3, react-scripts y otras) para que el proyecto compile y se ejecute en entornos modernos.
- Cambios en scripts de npm para mitigar problemas con OpenSSL/Node (ej. `NODE_OPTIONS=--openssl-legacy-provider` cuando es necesario).

Si usas este repositorio, ten en cuenta que es una derivación del proyecto original y contiene trabajo adicional del mantenedor actual.

## Estado

Versión adaptada para desarrollo local con Ganache y Truffle (solc 0.5.17). Comprueba los archivos `truffle-config.js` y `migrations/` para detalles de despliegue.

## Requisitos

- Node.js (se recomienda Node 18 LTS para compatibilidad con Truffle y evitar problemas con OpenSSL 3)
- npm o yarn
- Ganache (GUI o CLI) escuchando en 127.0.0.1:7545 por defecto
- Truffle (localmente instalado o usar `npx truffle`)

## Instalación y ejecución rápida (zsh)

```zsh
# instalar dependencias
npm install

# arrancar Ganache (si usas GUI ábrelo; si usas CLI: ganache --port 7545)

# compilar y migrar contratos
npx truffle migrate --network development --reset

# arrancar la app React
npm run start
```

Notas:
- Si obtienes un error relacionado con OpenSSL al ejecutar `npm start` (por ejemplo `ERR_OSSL_EVP_UNSUPPORTED`), puedes usar temporalmente:

```zsh
NODE_OPTIONS=--openssl-legacy-provider npm run start
```

o instalar/usar Node 18 LTS.

## Cambios relevantes en esta fork

- `src/components/Navbar.js`: Navbar responsive y colapsable; truncamiento de dirección de cuenta.
- `src/components/App.js`: Documentación y manejo más robusto de `loadWeb3` y `loadBlockchainData` (validación de cuentas, uso de variables locales antes de llamadas a contratos).
- `truffle-config.js`: compilador fijado a `0.5.17` para evitar problemas de resolución remota.
- `package.json`: scripts ajustados para compatibilidad con OpenSSL cuando aplica.

## Licencia y atribución

El código original proviene del repositorio de Packt (enlace más arriba). Esta versión contiene modificaciones y mejoras realizadas por el autor de esta fork.

Este repositorio se publica bajo la Licencia MIT. Consulta el archivo `LICENSE` para el texto completo.

Si eres el autor original y tienes preocupaciones sobre la licencia o atribución, contacta al mantenedor de este fork.

## Contacto

Si necesitas que deje el repositorio en un estado distinto (por ejemplo, vacío) o que realice alguna operación git adicional, indícalo y preparo los comandos seguros.

# Repo vacío
