import customerController from "../controllers/customerController.js";


export default function customerRoutes(express) {
	const router = express.Router();
	const controller = customerController();

  
  /*router.route('/:id').get(controller.fetchCustomerById,
    // swagger.tags = ['Customer']
    // swagger.description = 'Endpoint to get customer by ID.'

    );*/
    router.route('/:cpf').get(controller.fetchCustomerByCPF,
      // #swagger.tags = ['Customer']
      // #swagger.description = 'Endpoint to get customer by CPF.'

      );
  //GET ENDPOINTS
  router.route('/').get(controller.fetchAllCustomer,
    // #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint to get all customers.'
  /* #swagger.responses[404] = { 
     schema: { msg: "Customers not found." } 
  } */
  );
  
    
  //POST ENDPOINTS
  router.route('/').post(controller.addNewCustomer,
    // #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint to add a customer.'

		/* #swagger.parameters['newCustomer'] = {
               in: 'body',
               description: 'Information customer.',
               required: true,
               schema: { $ref: "#/definitions/AddCustomer" }
        } */
		//schema: { $ref: "#/definitions/AddCustomer" }
    );

		router.route('/confirmationCode').post(controller.confirmUser,
			// #swagger.tags = ['Customer']
			// #swagger.description = 'Endpoint to validate a customer on cognito.'
	
			/* #swagger.parameters['validateCustomer'] = {
								 in: 'body',
								 description: 'Information customer cognito.',
								 required: true,
								 schema: { $ref: "#/definitions/ValidateCustomer" }
					} */
			//schema: { $ref: "#/definitions/ValidateCustomer" }
		);

		router.route('/authenticateUser').post(controller.authenticateUser,
			// #swagger.tags = ['Customer']
			// #swagger.description = 'Endpoint to authenticate a customer on cognito.'
	
			/* #swagger.parameters['validateCustomer'] = {
								 in: 'body',
								 description: 'Information customer cognito.',
								 required: true,
								 schema: { $ref: "#/definitions/AuthenticateCustomer" }
					} */
			//schema: { $ref: "#/definitions/AuthenticateCustomer" }
		);

  //PUT ENDPOINTS
  router.route('/:id').put(controller.updateCustomerById,
    // #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint to update customer by ID.'

		/* #swagger.parameters['updateCustomer'] = {
               in: 'body',
               description: 'Information customer.',
			   required: true,
               schema: { $ref: "#/definitions/AddCustomer" }
        } */
    );

  //DELETE ENDPOINTS
  router.route('/:id').delete(controller.deleteCustomerById,
    // #swagger.tags = ['Customer']
		// #swagger.description = 'Endpoint to delete customer by ID.'
    );

	return router;
}

//busca por cpf