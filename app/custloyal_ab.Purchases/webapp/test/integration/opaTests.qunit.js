sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'custloyalab/Purchases/test/integration/FirstJourney',
		'custloyalab/Purchases/test/integration/pages/PurchasesList',
		'custloyalab/Purchases/test/integration/pages/PurchasesObjectPage'
    ],
    function(JourneyRunner, opaJourney, PurchasesList, PurchasesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('custloyalab/Purchases') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePurchasesList: PurchasesList,
					onThePurchasesObjectPage: PurchasesObjectPage
                }
            },
            opaJourney.run
        );
    }
);