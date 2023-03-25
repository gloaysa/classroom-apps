import mongoose, { Document } from 'mongoose';

const exampleSchema = new mongoose.Schema({
	value: {
		type: String,
		required: true,
		lowercase: true,
		index: {
			unique: true,
		},
	},
	_id: {
		type: String,
		required: true,
	},
});

exampleSchema.index({ value: 'text' });

export const ExampleDocument = mongoose.model('Word', exampleSchema);

const ExampleModel = (word: any): Document<any> => {
	return new ExampleDocument(word);
};

export default ExampleModel;
