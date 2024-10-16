import { DataSource, DataSourceOptions } from 'typeorm'
import {withCache} from './orm.config'

const MysqlDataSource = new DataSource({
  ...withCache,
  type: 'mysql',
  port: 3316,
  username: 'nestjsx_crud',
  password: 'nestjsx_crud',
} as DataSourceOptions);
export default MysqlDataSource;
