import { testAuthenticateUser } from "../../api/services/cognito.js";

export default async function authenticateCustomer(
	email,
){ 
	return await testAuthenticateUser(email);
}