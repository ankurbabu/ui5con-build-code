sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'custloyalab/Customers/test/integration/FirstJourney',
		'custloyalab/Customers/test/integration/pages/CustomersList',
		'custloyalab/Customers/test/integration/pages/CustomersObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomersList, CustomersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('custloyalab/Customers') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomersList: CustomersList,
					onTheCustomersObjectPage: CustomersObjectPage
                }
            },
            opaJourney.run
        );
    }
);