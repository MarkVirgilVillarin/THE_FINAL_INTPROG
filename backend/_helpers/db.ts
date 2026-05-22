import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
  const host     = process.env.DB_HOST     || 'localhost';
  const port     = parseInt(process.env.DB_PORT || '3306', 10);
  const user     = process.env.DB_USER     || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME     || 'node_mysql_api';

  // Create DB if it doesn't exist
  const connection = await mysql.createConnection({ 
  host, port, user, password,
  ssl: { rejectUnauthorized: false }
});
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
await connection.end();

  // Connect via Sequelize
  const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

  // Init models
  db.Account      = accountModel(sequelize);
  db.RefreshToken = refreshTokenModel(sequelize);

  // Relationships
  db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.Account);

  // Sync (creates tables if missing)
  await sequelize.sync();
  console.log('Database connected and synced');
}
