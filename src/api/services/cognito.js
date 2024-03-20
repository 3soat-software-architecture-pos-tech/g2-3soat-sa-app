import axiosClient from "../apiClient.js";

const API_URL = 'https://5encpyxick.execute-api.us-east-2.amazonaws.com/prod/';

/**
 * Register a new user.
 * 
 * @param {string} email - The email of the user to register.
 */
async function testRegisterUser(email) {
	const url = `/register-user`;
	const headers = { 'Content-Type': 'application/json' };
	const data = { email };

	try {
		const response = await axiosClient(API_URL, headers).post(url, data);
		return response;
	} catch (error) {
		return error.response;
	}
}

/**
 * Confirm the registration of a user.
 * 
 * @param {string} email - The email of the user.
 * @param {string} confirmationCode - The confirmation code received by the user.
 */
async function testConfirmUser(email, confirmationCode) {
    const url = `/confirm-user`;
    const headers = { 'Content-Type': 'application/json' };
    const data = { email, confirmationCode };

		return axiosClient(API_URL, headers).post(url, data);
}

/**
 * Authenticate a user.
 * 
 * @param {string} email - The email of the user to authenticate.
 */
async function testAuthenticateUser(email) {
    const url = `/authenticate-user`;
    const headers = { 'Content-Type': 'application/json' };
    const data = { email };

		const resp = await axiosClient(API_URL, headers).post(url, data);
		return resp;
}

export {testRegisterUser, testConfirmUser, testAuthenticateUser}
