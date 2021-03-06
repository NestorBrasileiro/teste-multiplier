import { Sequelize } from 'sequelize-typescript';
import { Categoria } from 'src/categorias/model/categoria.entity';
import { Estoque } from 'src/estoques/entities/estoque.entity';
import { Produto } from 'src/produtos/entities/produto.entity';

const postgresSqlPort: number =
  Number.parseInt(process.env.POSTGRES_PORT) || 5432;

export const postgresSqlProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_URL,
        port: postgresSqlPort,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        define: {
          timestamps: true,
        },
      });
      sequelize.addModels([Categoria, Produto, Estoque]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
