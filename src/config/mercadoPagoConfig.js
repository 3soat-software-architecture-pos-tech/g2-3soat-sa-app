import { MercadoPagoConfig } from 'mercadopago';

export const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_TOKEN });
export const seller = new MercadoPagoConfig({ accessToken: process.env.TOKEN_VENDEDOR_MP });
