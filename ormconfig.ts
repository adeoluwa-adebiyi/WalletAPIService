import config  from "./src/config";

export default {
   "type": config.DB_TYPE,
   "host": config.DB_HOST,
   "port": 5432,
   "username": config.DB_USER,
   "password": config.DB_PASSWORD,
   "database": config.DB_NAME,
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
      // __dirname + "/../**/*.entity{.ts,.js}"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}