import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const DB_URL = process.env.BD_URL;

const connectToDB = (): void => {
	if (DB_URL) {
		mongoose.connect(
			DB_URL,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			(error) => {
				if (error) {
					throw Error(`There was a problem connecting to the DB: ${error}`);
				}
				console.info('Connection to DB successful');
			}
		);
	}
};

export default connectToDB;
