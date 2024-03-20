import axiosClient from "../apiClient.js";

const baseURL = `https://api.mercadopago.com/`;
const headers = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${process.env.TOKEN_VENDEDOR_MP}`
}

const sellerId = process.env.SELLER_ID;
const external_pos_id = process.env.EXTERNAL_POS_ID;

export default function createNewPayment(data) {
	return axiosClient(baseURL, headers).post(`instore/orders/qr/seller/collectors/${sellerId}/pos/${external_pos_id}/qrs`, JSON.stringify(data));
}
