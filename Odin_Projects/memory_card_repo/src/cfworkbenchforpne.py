quote = context.Quote
estVal = quote.GetCustomField('CF_OpportunityAmount')
estVal.Value = 5
oppName = quote.GetCustomField('CF_Opportunity_Name')
oppName.Value = "test"
rfqUrl = quote.GetCustomField('CF_RFQ_URL')
rfqUrl.Value = "http"
app = quote.GetCustomField('CF_Primary_Technology')
app.Value = "test"

thmRegion = quote.GetCustomField('CF_Business_Area')
thmRegion.Value = "AMERICAS"

subvertical = quote.GetCustomField('CF_Verticals')
subvertical.Value = "test"

subregion = quote.GetCustomField('CF_Sub_Region')
subregion.Value = "NAM"
salesteam = quote.GetCustomField('CF_Profit_Center')
salesteam.Value = "test"
salesperson = quote.GetCustomField('CF_Sales_Person')
salesperson.Value = "test"


