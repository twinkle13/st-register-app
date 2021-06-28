module.exports = async function (context, req) {
    context.log('POST REQUEST');

        let text = '{' +
        ' "ID":"1" ' +
        ' "salutation":"'+ req.body.salutation + '" ,' + 
        ' "firstName":"'+ req.body.firstName + '" ' +
        ' "lastName":"'+ req.body.lastName + '" ,' + 
        ' "email":"'+ req.body.email + '" ' +
        ' "companyUniversity":"'+ req.body.companyUniversity + '" ,' + 
        ' "functionName":"'+ req.body.functionName + '" ' +
        ' "industry":"'+ req.body.industry + '" ,' + 
        ' "country":"'+ req.body.country + '" ' +
        ' "state":"'+ req.body.state + '" ,' + 
        ' "phoneNumber":"'+ req.body.phoneNumber + '" ' +
        ' "zipcode":"'+ req.body.zipcode + '" ' +
        ' "confirm":"'+ req.body.confirm + '" ,' + 
        ' "confirmSubscribe":"'+ req.body.confirmSubscribe + '" ' +
        ', "" }';

        const obj = JSON.parse(text);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: obj
    };
}