/**
 * 
 * @On(event = { "CREATE" }, entity = "custloyal_abSrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const { data } = request;
    
    // Calculate reward points
    data.rewardPoints = Math.floor(data.purchaseValue / 10);

    // Update the related customer
    const customer = await SELECT.one.from('custloyal_abSrv.Customers').where({ ID: data.customer_ID });
    if (customer) {
        customer.totalPurchaseValue += data.purchaseValue;
        customer.totalRewardPoints += data.rewardPoints;
        await UPDATE('custloyal_abSrv.Customers').set({
            totalPurchaseValue: customer.totalPurchaseValue,
            totalRewardPoints: customer.totalRewardPoints
        }).where({ ID: data.customer_ID });
    }
}