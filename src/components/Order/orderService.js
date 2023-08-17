import  api  from "../http-common/http-common";

export const orderService = {
    //getAll,
    //getById,
    create,
    update,
    //delete: _delete
};
async function create(data, token) {
    await api("/customers", 'POST', token, 
    {   id: data.id,
        name: data.name,
        email: customer.email,
        phone: customer.phone, } )
   .then((resp) => {
     console.log(`handleSubmitCustomer Ok: ${JSON.stringify(resp)}`);
    //setSubmitting(false);
    return resp;
  })
  .catch((error) => {
     //setSubmitting(false);
     console.log(`handleSubmitCustomer error: ${JSON.stringify(error)}`);
     return error;
  });
 }

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}
export async function submitCustomer ( customer, token ) {
    //setSubmitting(true);
    await api("/customers", 'POST', token, 
     {   id: customer.id,
         name: customer.name,
         email: customer.email,
         phone: customer.phone, } )
    .then((resp) => {
      console.log(`handleSubmitCustomer Ok: ${JSON.stringify(resp)}`);
     //setSubmitting(false);
     return resp;
   })
   .catch((error) => {
      //setSubmitting(false);
      console.log(`handleSubmitCustomer error: ${JSON.stringify(error)}`);
      return error;
   });
  }