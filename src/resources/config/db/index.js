const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect(
			'mongodb+srv://tranvanconkg:Anhnam9ce@cluster0.xcfj7kg.mongodb.net/?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			}
		);
		console.log('Successful Connection!');
	} catch (error) {
		console.log('Fail Connection!');
	}
}

module.exports = { connect };
