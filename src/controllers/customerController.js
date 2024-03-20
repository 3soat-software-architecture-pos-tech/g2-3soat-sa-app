import useCaseCreate from '../use_cases/customer/add.js'
import useCaseGetAll from '../use_cases/customer/getAll.js'
import useCasefindById from '../use_cases/customer/findById.js';
import useCasedelete from '../use_cases/customer/deleteById.js'
import useCaseupdateById from '../use_cases/customer/updateById.js';
import useCasefindByCPF from '../use_cases/customer/findByCPF.js';
import useCaseConfirmationCode from '../use_cases/customer/validateUser.js';
import useCaseAuthenticateUser from '../use_cases/customer/authenticateUser.js';
import { testAuthenticateUser, testRegisterUser } from '../api/services/cognito.js';

export default function customerController() {
  
  const fetchAllCustomer = (req, res, next) => {
    useCaseGetAll()
      .then((customer) => {
        if (!customer) {
          //throw new Error(`No customers found with id: ${req.params.id}`);
          res.json(`No customer found`);
        }
        res.json(customer);
      })
      .catch((error) => next(error));
  };

	const addNewCustomer = (req, res, next) => {
		console.log('controler customer');
    const { name, cpf, email, phone, skype } = req.body;

    useCaseCreate(
			name,
      cpf,
      email,
      phone,
      Date(),
      Date()
    )
    .then((customer) => {
			console.log('controler customer ->',customer);
			const email = customer.email;
			if(email) {
				testRegisterUser(email).then((response) => {
					console.log(response);
				}).catch((error) => {
					console.error(error);
				});
			}
			res.json(customer)
		})
    .catch((error) => res.json(next(`${error.message} - Customer creation failed`)));
  };

	const confirmUser = async (req, res, next) => {
		const { confirmationCode, email } = req.body;
		
		await useCaseConfirmationCode(confirmationCode, email)
			.then((response) => {
				return res.json(response.data.message);
			})
			.catch((error) => {
				return res.json(error.response.data.message);
			});
	};

	const authenticateUser = async (req, res, next) => {
		const { email } = req.body;
		await useCaseAuthenticateUser(email)
		.then((response) => {
			console.log(response);
			return res.json(response.data);
		})
		.catch((error) => {
			return res.json({status: error.response.status, message: error.response.data.message});
		});
	}

  const fetchCustomerById = (req, res, next) => {
    useCasefindById(req.params.id)
      .then((customer) => {
        if (!customer) {
          //throw new Error(`No customer found with id: ${req.params.id}`);
          res.json(`No customer found with id: ${req.params.id}`);
        }
        res.json(customer);
      })
      .catch((error) => next(error));
  };

  const fetchCustomerByCPF = (req, res, next) => {
    useCasefindByCPF(req.params.cpf)
      .then(async(customer) => {
        if (!customer) {
          res.json(`No customer found with cpf: ${req.params.cpf}`);
        }
				const email = customer[0].email;
				let authResponse;
				if(email) {
					authResponse = await testAuthenticateUser(email).then((response) => {
						return response.data;
					}).catch((error) => {
						console.error('error authenticate user ->',{status: error.response.status, message: error.response.data.message});
						return {status: error.response.status, message: error.response.data.message};
					});
				}
				const customerData = customer[0]
        res.json({...customerData, ...authResponse});
      })
      .catch((error) => next(res.json(error)));
  };


  const deleteCustomerById = (req, res, next) => {
    useCasedelete(req.params.id)
      .then(() => res.json('Customer sucessfully deleted!'))
      .catch((error) => next(error));
  };
  
  const updateCustomerById = (req, res, next) => {
    const {name, cpf, email, phone, skype } = req.body;

    //console.log('controller update by id->',dbRepository);
    useCaseupdateById(
      req.params.id,
      name,
      cpf,
      email,
      phone,
			skype,
      Date()
    )
      .then((message) => res.json(message))
      .catch((error) => next(error));
      
  };
  return {
		addNewCustomer,
    fetchAllCustomer,
    fetchCustomerById,
    updateCustomerById,
    deleteCustomerById,
    fetchCustomerByCPF,
		confirmUser,
		authenticateUser
  };
}