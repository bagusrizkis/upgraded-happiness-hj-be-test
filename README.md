# upgraded-happiness-hj-be-test

1. Tes api in Postman: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/12708314-af6572be-1cd2-4a88-8a88-59fe4f9d39ff?action=collection%2Ffork&collection-url=entityId%3D12708314-af6572be-1cd2-4a88-8a88-59fe4f9d39ff%26entityType%3Dcollection%26workspaceId%3D1bf15dac-5044-4c1b-9fe3-c2fbe360cd2b)

2. Run using docker:

```sh
docker-compose up -d
```

modify `/commands/entry-point.sh` if you want another command to run

3. Test
   If you want to test locally

-   run `npm run setup:test`
-   run `npm run test`

4. ENV:

```sh
NODE_ENV           # production, development, test
DB_USERNAME_DEV
DB_PASSWORD_DEV
DB_DATABASE_DEV
DB_HOST_DEV
DB_USERNAME_TEST
DB_PASSWORD_TEST
DB_DATABASE_TEST
DB_USERNAME_PROD
DB_PASSWORD_PROD
DB_DATABASE_PROD
DB_HOST_PROD
```
