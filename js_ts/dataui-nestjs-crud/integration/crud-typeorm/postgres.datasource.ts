import { DataSource } from 'typeorm'
import {withCache} from './orm.config'

const PostgresDataSource = new DataSource(withCache);
export default PostgresDataSource;
