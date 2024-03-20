import orderRepositoryMySqlDB from "../db/database/mySql/repositories/orderRepositoryMySqlDB.js";

export default function orderGateway() {
    
	const findById = (id) => orderRepositoryMySqlDB().findById(id);
	const add = (order) => orderRepositoryMySqlDB().add(order);
	const findAll = () => orderRepositoryMySqlDB().findAll();
	const updateById = (id, order) => orderRepositoryMySqlDB().updateById(id, order);
	const deleteById = (id) => orderRepositoryMySqlDB().deleteById(id);
	const updateStatusById = (id, orderStatus) => orderRepositoryMySqlDB().updateStatusById(id, orderStatus);

	return {
		findById,
		findAll,
		add,
		updateById,
		deleteById,
		updateStatusById	
	}
}