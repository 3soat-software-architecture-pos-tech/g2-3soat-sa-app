import paymentRepositoryMySqlDB from "../db/database/mySql/repositories/paymentRepositoryMySqlDB.js";

//const dbRepository = paymentRepository(paymentRepositoryMongoDB());
export default function paymentGateway() {
    
	const findById = (id) => paymentRepositoryMySqlDB().findById(id);
	const add = (payment) => paymentRepositoryMySqlDB().add(payment);
	const findAll = () => paymentRepositoryMySqlDB().findAll();
	const updateById = (id, payment) => paymentRepositoryMySqlDB().updateById(id, payment);
	//const deleteById = (id) => repository.deleteById(id);

	return {
		findById,
		findAll,
		add,
		updateById,
		//deleteById
	}
}