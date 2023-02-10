# Backend boilerplate

## Deployable to AppSync

## Instructions:

1. aws configure con las credenciales de la cuenta de aws donde se quiera desplegar el backend
2. modificar en bin/back.ts el nombre de la app, el id de la cuenta y la región
3. modificar en lib/athena-back-stack el nombre del cliente
4. agregar schema de prisma en /api/prisma
5. ejecutar yarn cosmo en /api
6. agregar resolvers personalizados e incrementar el esquema de graphql
7. configurar el string de conexión a la BD en el archivo api/src/db.ts

## Commands

- main repo packages
  `yarn add @aws-cdk/aws-appsync-alpha aws-cdk-lib aws-sdk constructs source-map-support`
  `yarn add -D @types/node aws-cdk copyfiles rimraf ts-node typescript`
- api repo packages
  `yarn add @prisma/client aws-sdk`
  `yarn add -D @apollo/server @prevalentware/prisma-cosmo @types/node esbuild fs graphql prisma ts-node typescript`
- back deployment
  `cdk bootstrap` (sólo hay que ejecutarlo en el despliegue inicial)
  `yarn deploy`
- local testing
  `cd api`
  `yarn start`
- testing del contenedor de Docker
  `docker container rm -f back && docker build -t back . && docker run -p 9000:8080 --name back -e TEST=true back`
