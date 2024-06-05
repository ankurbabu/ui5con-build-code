/**
 * 
 * @On(event = { "CREATE" }, entity = "custloyal_abSrv.Redemptions")
 * @param {Object} req - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(req) {
    const { redeemedAmount, customer_ID } = req.data;
    const tx = cds.transaction(req);
    const customer = await tx.run(SELECT.one.from('custloyal_abSrv.Customers').where({ ID: customer_ID }));

    if (customer.totalRewardPoints < redeemedAmount) {
        req.error(400, 'Insufficient reward points');
        return;
    }

    customer.totalRewardPoints -= redeemedAmount;
    customer.totalRedeemedRewardPoints += redeemedAmount;

    await tx.run(UPDATE('custloyal_abSrv.Customers').set({
        totalRewardPoints: customer.totalRewardPoints,
        totalRedeemedRewardPoints: customer.totalRedeemedRewardPoints
    }).where({ ID: customer_ID }));
};