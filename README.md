# Prueba Daniel Ledezma
Este stacks para la prueba tecnica.

## Requerimientos
[NodeJS 20.x](https://nodejs.org/)

[Serverless Framework](https://www.serverless.com/)

[Serverless Compose](https://www.serverless.com/)


## Stacks

| Stacks |
| :-------- |
| `auth` |
| `dates` |
| `user` |
| `vehicle` |

## Instalación

Gobal

```bash
  npm i - g serverless serverless-compose
  npm i
```


## Variables de entorno

`example.env` > `.env`

## Despliegue

Serverless compose: despliega todos los microservicios estando en la raiz del proyecto

```bash
  serverless deploy
```

Por defecto el stage es "dev" para desplegar a un stage especifico

```bash
  serverless deploy --stage prod
```

Serverless: Despliegue un solo stacks
```bash
  cd auth
  serverless deploy
```

Por defecto el stage es "dev" para desplegar a un stage especifico

```bash
  cd src/auth
  serverless deploy --stage prod
```

## Pruebas en local

```bash
 npm run offline:all
```

## Pruebas en local por stack

```bash
  cd src/vehicles
  serverless offline
```

## Pruebas
```bash
  1.- Crear Usuario
  2.- Crear Vehiculo
  3.- Crear Date
  De esta manera ya podemos empezar a probar los endpoints
```
