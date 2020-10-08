const braintree = require('braintree')

const geteway = new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId:"",
    publicKey:"",
    privateKey:""
})

geteway.clientToken.generate({
    customerId:""
},(err,res) =>{
    const clientToken = res.clientToken
});