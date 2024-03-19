import { testConfirmUser } from "../../api/services/cognito.js";

export default async function confirmCustomer(
	confirmationCode,
	email,
){ 
	return await testConfirmUser(email, confirmationCode);
}