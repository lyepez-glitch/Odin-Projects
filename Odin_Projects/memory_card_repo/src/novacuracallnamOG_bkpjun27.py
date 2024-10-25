from BasicAuth_Service import BasicAuth_Service
from Scripting.Quote import MessageLevel

class NovacuraIntegration:

    dict_apicall = {

        "overview": {
            "prop_number": "",
            "prop_id": "",
            "prop_rev": "",
            "terms": "",
            "expire_date": "",
            "user_name": "",
		    "user_email": "",
            "status": "",
            "date_created": "",
            "date_modified": "",
            "date_effective": "",
            "currency": "",
            "submitter_name": "",
            "submitter_id": "",
            "estimated_value":"",
            "type":""
        },
	    "bfu": {
            "total_sales": "",
            "total_cost": "",
            "margin": "",
            "summary_phases": [],
            "summary_subsection": []
        },

        "opportunity": {
            "opportunity_name": "",
            "opportunity_id": "",
            "sales_team": "",
            "sales_region": "",
            "sales_sub_region": "",
            "opportunity_subvertical_1": "",
            "scope_options": "",
            "opportunity_country": "",
            "est_project_start": "",
            "quoting_country":""
        },
        "rfq": {
            "name": "",
            "sfdc_rfq_no": "",
            "revision_no": "",
            "client_ref_no": "",
            "year": "",
            "assigned_to": "",
            "assigned_to_email": "",
            "sales_person": "",
            "sales_person_email": "",
            "sales_person_mobile": "",
            "pe_team": "",
            "date_requested": "",
            "date_scheduled_completion": "",
            "type": "",
            "stage": "",
            "swimlane": "",
            "scope": "",
            "salesforce_url":"",
            "bid_type":""
        },
        "customer": {
            "account_name": "",
            "official_name": "",
            "contact_name": "",
            "contact_salutation": "",
            "contact_title": "",
            "contact_mobile": "",
            "contact_email": "",
            "contact_company_name": ""
        },
        "doa": {
            "status": "",
            "approval_level": "",
            "scope_options": "",
            "application": "",
            "executive_summary": "",
            "pricing_summary": "",
		    "rpsm_approval": "",
		    "terms_conditions": "",
		    "provisions": "",
		    "project_type": "",
		    "terms": "",
		    "non_standard_terms": "",
		    "liquidatedDamages": "",
            "special_note": "",
            "bank_instruments": "",
            "smart_margins": "",
            "terms_doc_link": "",
            "proposal_link": "",
            "cashflow_sheet": "",
            "qra_sheet": "",
            "doc_link": [{
                        "provisions": "No Waiver of Consequential Damages",
                        "url": "https://services.dou.bet"
                    }],
            "contract_type": "",
            "sharepoint_url": ""
        },
        "proposal": {
            "currency": "",
            "total_amount": "",
            "amount": "",
            "usd_value": "",
            "payment_terms": "",
            "terms_conditions": "",
            "contractual_entity": "",
            "selling_entity": "",
            "scope": "",
            "bom_priced": "",
            "engineering_hours": [],
	    	"cumulativeHours": "",
            "lcs": "",
            "labor_type":"",
            "payment_terms_allowed":"",
            "project_duration":"",
            "validity":"",
            "tax_classificiation":"",
            "tax_options":"",
            "tax_jurisdiction":"",
            "freight_term":"",
            "freight_cost":"",
            "mod_yard":"",
            "insurance":"",
            "damage_terms":"",
            "indemnity_terms":"",
            "surety_bonds":"",
            "contractual_entity":"",
            "est_project_end":""
        }
        ,
        "partner": {
            "exists": "true",
            "sold_to": "123456789",
            "sold_to_name": "Dow Chemical - Seadrift",
            "sold_to_address": "1234 nVent Drive Clevland, Ohio 55423",
            "sold_rps": "1",
            "ship_to": "123456789",
            "ship_to_name": "Dow Chemical - Seadrift",
            "ship_to_address": "1234 nVent Drive Clevland, Ohio 55423",
            "ship_rps": "1",
            "bill_to": "123456789",
            "bill_to_name": "Dow Chemical - Seadrift",
            "bill_to_address": "1234 nVent Drive Clevland, Ohio 55423",
            "bill_rps": "1"
        },
        "award": {
            "pricing_basis": "Dropdown",
            "pricing_agreement": "dropdown from nVent",
            "customer_credit": "200000.00",
            "available_credit": "300000.00",
            "po_number": "",
            "po_date": "",
            "po_url": "",
            "cost_type": "Standard Cost",
            "eng_date": "",
            "material_date": "",
            "mobilization_date": ""
        }
    }

    __failed = False
    __url = 'https://nvent-server.dev.novacuracloud.net/rpc/json2/ejy-Fz7Qyk6rLkw2t60P1A'
    __username = ''
    __password = ''
    __new_hash = ''
    __quoteNum = ''
    __quoteId = ''
    __run_error = ''
    __api_response = ''
    __first_name = ''
    __last_name = ''
    __user_id = ''
    __type = ''
    __statusname = ''
    currentQuote = ''

    #takes in a quote instance object (context.Quote)
    def __init__(self, quoteObj, first_name='first', last_name='last', user_id='000', calltype = ''):
        self.__username = 'INTEGRATION_USER'
        self.__password = '9yCwoQ$%1O@mI^'
        self.__quoteNum = quoteObj.QuoteNumber
        self.__first_name = first_name
        self.__last_name = last_name
        self.__user_id = user_id
        Log.Info("__statusname---->"+str(self.__statusname))
        if str(calltype) == "pne":
            self.__type = "PRE"
            self.__statusname = "pne"
            Log.Info("__statusname---->"+str(self.__statusname))
        else:
            self.__type = calltype

        self.currentQuote = quoteObj
    ################ end constructor ##################

    def run(self):
        fail_flag = True
        #process workflow
        try:
            self.hash_auth()
            self.package_data()
            self.print_package()
            self.api_call()
        except Exception as e:
            self.__run_error = "ERROR, contact CPQ system admin"
            Trace.Write('Novacura_Call: ' + str(e))
            Log.Info('Novacura_Call: ' + str(e))
            fail_flag = False
        finally:
            return fail_flag

    def hash_auth(self):
        hashService = BasicAuth_Service(self.__username, self.__password)
        self.__new_hash = hashService.hash()

    def package_data(self):
        symbol = str(self.currentQuote['CF_Quoted_Currency'])

    #overview
        #prop_rev
        self.dict_apicall['overview']['prop_rev'] = str(SqlHelper.GetFirst("Select REVISION_ID from sys_QuoteRevisions where CART_ID = {}".format(self.currentQuote.Id)).REVISION_ID)
        #quote_id
        self.dict_apicall['overview']['prop_id'] = str(self.currentQuote.Id)
        #quote_no
        self.dict_apicall['overview']['prop_number'] = str(self.currentQuote.QuoteNumber)
        #status
        if self.__statusname == "pne":
            self.dict_apicall['overview']['status'] = "pne"
        else:
            self.dict_apicall['overview']['status'] = str(self.currentQuote.StatusName)
        #date_created
        self.dict_apicall['overview']['date_created'] = self.__strdData(self.currentQuote.DateCreated)
        #date_modified
        self.dict_apicall['overview']['date_modified'] = self.__strdData(self.currentQuote.DateModified)
        #date_effective
        self.dict_apicall['overview']['date_effective'] = self.__strdData(self.currentQuote.EffectiveDate)
        #currency
        self.dict_apicall['overview']['currency'] = str(self.currentQuote['CF_Quoted_Currency'])
        "submitter_name"
        self.dict_apicall['overview']['submitter_name'] = self.__last_name + ", " +  self.__first_name
        "submitter_id"
        self.dict_apicall['overview']['submitter_id'] = self.__user_id
        #estimated value
        self.dict_apicall['overview']['estimated_value'] = 	str(self.currentQuote['CF_OpportunityAmount'])
        self.dict_apicall['overview']['type'] = self.__type

    #### below for testing only
        Log.Info('id:' +str(self.dict_apicall['overview']['prop_id']) +' num:' + str(self.dict_apicall['overview']['prop_number']) + ' rev:' + str(self.dict_apicall['overview']['prop_rev']))
        #terms
        self.dict_apicall['overview']['terms'] = str(self.currentQuote['CF_Payment_Terms'])
        #estimated_value
        #self.dict_apicall['overview']['estimated_value'] = 50000.00
        #expire_date
        self.dict_apicall['overview']['expire_date'] = self.__strdData(self.currentQuote['Quote Expiration Date'])
        #quote_owner
        sql_return = SqlHelper.GetFirst('SELECT first_name, last_name, Id FROM USERS WHERE Id = {id}'.format(id = self.currentQuote.OwnerId))
        self.dict_apicall['overview']['user_name'] = str(sql_return.first_name + ' ' + sql_return.last_name)
        #user_email
        self.dict_apicall['overview']['user_email'] = str(SqlHelper.GetFirst('SELECT EMAIL FROM USERS WHERE Id = {id}'.format(id = self.currentQuote.OwnerId)).EMAIL)

    #bfu
        #total_sales
        #try:
        self.dict_apicall['bfu']['total_sales'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')
        #total_cost
        self.dict_apicall['bfu']['total_cost'] = self.currentQuote.GetAllItems()[0]['Total_Cost_Str'][3:].replace(',','')
        #margin
        self.dict_apicall['bfu']['margin'] = str(self.currentQuote.GetAllItems()[0]['GM'].replace('%',''))
        """except:
            self.dict_apicall['bfu']['total_sales'] = 1
            #total_cost
            self.dict_apicall['bfu']['total_cost'] = 1
            #margin
            self.dict_apicall['bfu']['margin'] = 1"""
        #summary_phases
        """self.dict_apicall['bfu']['summary_phases'] = [{
            "phase_title": "PM & Coordination HRS",
            "total_cost": "25000.00",
            "total_sales": "50000.00",
            "gm": "50.00"
        }]"""
        del self.dict_apicall['bfu']['summary_phases'][:]
        for table_row in self.currentQuote.QuoteTables['NAM_DOA_Summary'].Rows:
            if 'TOTALS' not in table_row['ITEM'] and 'Totals' not in table_row['ITEM']:
                self.dict_apicall['bfu']['summary_phases'].append({'phase_title': table_row['ITEM'].replace('\n',''),
                                              "total_cost": self.__strpSymbl(table_row['COST']),
                                              "total_sales": self.__strpSymbl(table_row['SELL']),
                                              "gm": str(table_row['GM_'].replace('%', ''))})

        #summary_subsection
        self.dict_apicall['bfu']['summary_subsection'] = []
        """del self.dict_apicall['bfu']['summary_subsection'][:]
        for table_row in self.currentQuote.QuoteTables['QT_LI_Summary_T_Subsection'].Rows:
            if 'Total' not in table_row['phase_title'] and 'Totals' not in table_row['phase_title']:
                self.dict_apicall['bfu']['summary_subsection'].append({'phase_title': table_row['phase_title'].replace('\n',''),
                                              "subsection": str(table_row['subsection']),
                                              "total_cost": self.__strpSymbl(table_row['total_cost']),
                                              "total_sales": self.__strpSymbl(table_row['total_sales']),
                                              "gm": str(table_row['gm'].replace('%', ''))})"""

    #opportunity
        #opportinuity_name
        self.dict_apicall['opportunity']['opportunity_name'] = self.currentQuote['CF_Opportunity_Name']
        #opportunity_id
        self.dict_apicall['opportunity']['opportunity_id'] = str(self.currentQuote['CF_SFDC_Opportunity_Number'])
        #sales_team
        self.dict_apicall['opportunity']['sales_team'] = self.currentQuote['CF_Profit_Center']
        #sales_region
        self.dict_apicall['opportunity']['sales_region'] = str(self.currentQuote['CF_Business_Area'])
        #sales_sub_region
        self.dict_apicall['opportunity']['sales_sub_region'] = str(self.currentQuote['CF_Sub_Region'])
        #opportunity_vertical_1
        self.dict_apicall['opportunity']['opportunity_subvertical_1'] = str(self.currentQuote['CF_Verticals'])
        #scope_options
        self.dict_apicall['opportunity']['scope_options'] = str(self.currentQuote['CF_Primary_Need'])
        #opportunity_country
        self.dict_apicall['opportunity']['opportunity_country'] = str(self.currentQuote['CF_End_User_Location'])
        #est_project_start
        self.dict_apicall['opportunity']['est_project_start'] = self.__strdData(self.currentQuote['CF_Estimated_Project_Start_Date_Dup'])

    #rfq
        #name
        #"assigned_to": "Derek Spaulding",
        #"assigned_to_email": "derek.spaulding@nvent.com.invalid",
        #"sales_person": "Daniel Doubet",
        #"sales_person_email": "f.andre@geral.com.invalid",
        #"sales_person_mobile": "16122704704",
        self.dict_apicall['rfq']['name'] = self.currentQuote['CF_SFDC_RFQ_Name']
        #sfdc_rfq_no
        self.dict_apicall['rfq']['sfdc_rfq_no'] = str(self.currentQuote['CF_SFDC_RFQ_Number'])
        #revision_no
        self.dict_apicall['rfq']['revision_no'] = str(self.currentQuote['CF_Revision_Number'])
        #client_ref_no
        self.dict_apicall['rfq']['client_ref_no'] = str(self.currentQuote['CF_RFQ_REF_NUM'])
        #year
        self.dict_apicall['rfq']['year'] = str(self.currentQuote['CF_Year'])
        #assigned_to
        self.dict_apicall['rfq']['assigned_to'] = self.currentQuote['CF_Assigned_to']
        #assigned_to_email
        self.dict_apicall['rfq']['assigned_to_email'] = str(self.currentQuote['CF_PROPOSAL_ENG_EMAIL'])
        #sales_person
        self.dict_apicall['rfq']['sales_person'] = self.currentQuote['CF_Sales_Person']
        #sales_person_email
        self.dict_apicall['rfq']['sales_person_email'] = str(self.currentQuote['CF_SALES_ENG_EMAIL'])
        #sales_person_mobile
        self.dict_apicall['rfq']['sales_person_mobile'] = str(self.currentQuote['CF_SALES_ENG_MOBILE'])
        #pe_team
        self.dict_apicall['rfq']['pe_team'] = self.currentQuote['CF_Owner']
        #date_requested
        self.dict_apicall['rfq']['date_requested'] = self.__strdData(self.currentQuote['CF_RFQ_Received'])
        #date_scheduled_completion
        self.dict_apicall['rfq']['date_scheduled_completion'] = self.__strdData(self.currentQuote['CF_Scheduled_Completion'])
        #type
        self.dict_apicall['rfq']['type'] = str(self.currentQuote['CF_RFQ_Type'])
        #stage
        self.dict_apicall['rfq']['stage'] = str(self.currentQuote['CF_RFQ_Status'])
        #swimlane
        self.dict_apicall['rfq']['swimlane'] = str(self.currentQuote['CF_Swimlane'])
        #scope
        self.dict_apicall['rfq']['scope'] = str(self.currentQuote['CF_Scope_RFQ'])
        #url
        self.dict_apicall['rfq']['salesforce_url'] = str(self.currentQuote['CF_RFQ_URL'])

    #customer
        #account_name
        self.dict_apicall['customer']['account_name'] = self.currentQuote['CF_Account_Official_Name']
        #official_name
        self.dict_apicall['customer']['official_name'] = self.currentQuote['CF_Customer_Name']
        #contact_name
        self.dict_apicall['customer']['contact_name'] = self.currentQuote['CF_Customer_Contact_Name']
        #contact_salutation
        self.dict_apicall['customer']['contact_salutation'] = str(self.currentQuote['CF_Salutation'])
        #contact_title
        self.dict_apicall['customer']['contact_title'] = self.currentQuote['CF_Customer_Contact_Title']
        #contact_mobile
        self.dict_apicall['customer']['contact_mobile'] = str(self.currentQuote['CF_Customer_Contact_Phone'])
        #contact_email
        self.dict_apicall['customer']['contact_email'] = str(self.currentQuote['CF_Customer_Contact_Email'])
        #contact_company_name
        self.dict_apicall['customer']['contact_company_name'] = str(self.currentQuote['CF_Customer_Contact_Company_Name'])

    #doa
        #status
        self.dict_apicall['doa']['status'] = str(self.currentQuote['CF_DOA_Status'])
        #approval_level
        self.dict_apicall['doa']['approval_level'] = str(self.currentQuote['CF_DOA_Status'])
        #scope_options
        self.dict_apicall['doa']['scope_options'] = str(self.currentQuote['CF_Primary_Need'])
        #application
        self.dict_apicall['doa']['application'] = str(self.currentQuote['CF_Primary_Technology'])
        #executive_summary
        self.dict_apicall['doa']['executive_summary'] = str(self.currentQuote['CF_DOA_Executive_Summary'])
        #pricing_summary
        self.dict_apicall['doa']['pricing_summary'] = str(self.currentQuote['CF_DOA_Pricing_Summary'])
        #rpsm_approval
        self.dict_apicall['doa']['rpsm_approval'] = str(self.currentQuote['CF_RPSM_Approval'])
        #terms_conditions
        self.dict_apicall['doa']['terms_conditions'] = "Standard Terms"#str(self.currentQuote['CF_Terms_and_Conditions'])
        #provisions
        self.dict_apicall['doa']['provisions'] = str(self.currentQuote['CF_Provisions'])
        #project_type
        self.dict_apicall['doa']['project_type'] = str(self.currentQuote['CF_Project_Type'])
        #terms
        self.dict_apicall['doa']['terms'] = "Standard Terms"#str(self.currentQuote['CF_Terms_and_Conditions'])
        #non_standard_terms
        self.dict_apicall['doa']['non_standard_terms'] = str(self.currentQuote['CF_Non _Standard _Term _Description'])
        #liquidatedDamages
        self.dict_apicall['doa']['liquidatedDamages'] = str(self.currentQuote['CF_Liquidated_Damages'])
        #special_note
        self.dict_apicall['doa']['special_note'] = str(self.currentQuote['CF_Special_Note_Condition'])
        #bank_instruments
        self.dict_apicall['doa']['bank_instruments'] = str(self.currentQuote['CF_Bank_Instruments_Required'])
        #smart_margins
        self.dict_apicall['doa']['smart_margins'] = str(self.currentQuote['CF_Smart_Margins_Reference'])
        #terms_doc_link
        self.dict_apicall['doa']['terms_doc_link'] = str(self.currentQuote['CF_T&C_Document_Link'])
        #proposal_link
        self.dict_apicall['doa']['proposal_link'] = str(self.currentQuote['CF_Proposal'])
        #cashflow_sheet
        self.dict_apicall['doa']['cashflow_sheet'] = str(self.currentQuote['CF_Cashflow_Sheet'])
        #qra_sheet
        self.dict_apicall['doa']['qra_sheet'] = str(self.currentQuote['CF_QRA_Sheet'])
        #doc_link[]
        #del self.dict_apicall['doa']['doc_link'][:]
        #for table_row in self.currentQuote.QuoteTables['Document_Link'].Rows:
            #self.dict_apicall['doa']['doc_link'].append({'provisions': table_row['Provisions'], 'url': table_row['File_Link_Url']})
        #contract_type
        self.dict_apicall['doa']['contract_type'] = str(self.currentQuote['CF_Contract_Type'])
        #sharepoint_url
        self.dict_apicall['doa']['sharepoint_url'] = str(self.currentQuote['CF_OneDrive_Folder_Link'])


    #proposal
        #currency
        self.dict_apicall['proposal']['currency'] = str(self.currentQuote['CF_Quoted_Currency'])
        #total_amount
        #try:
        self.dict_apicall['proposal']['total_amount'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')#str(self.currentQuote['CF_Total_Amount'])
        #amount
        self.dict_apicall['proposal']['amount'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')#str(self.currentQuote['CF_Value_In_Local_Currency'])###total_amount without symbol
        #usd_value
        self.dict_apicall['proposal']['usd_value'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')#str(self.currentQuote['CF_Value_in_USD'])
        """except:
            self.dict_apicall['proposal']['total_amount'] = 1
            #amount
            self.dict_apicall['proposal']['amount'] = 1
            #usd_value
            self.dict_apicall['proposal']['usd_value'] = 1"""
        #payment_terms
        self.dict_apicall['proposal']['payment_terms'] = str(self.currentQuote['CF_Payment_Terms'])
        #terms_conditions
        self.dict_apicall['proposal']['terms_conditions'] = str(self.currentQuote['CF_T_C'])
        #contractual_entity
        self.dict_apicall['proposal']['contractual_entity'] = str(self.currentQuote['CF_Contractual_Entity'])
        #selling_entity
        self.dict_apicall['proposal']['selling_entity'] = str(self.currentQuote['CF_Selling_Entity'])
        #scope
        self.dict_apicall['proposal']['scope'] = str(self.currentQuote['CF_Scope_RFQ'])
        #bom_priced
        self.dict_apicall['proposal']['bom_priced'] = str(self.currentQuote['CF_BOM_Priced_or_Unpriced'])
        #validity
        self.dict_apicall['proposal']['validity'] = str(self.currentQuote['CF_Proposal_Validity'])
        #project_duration
        self.dict_apicall['proposal']['project_duration'] = str(self.currentQuote['CF_Project Duration in Weeks'])
        #freight_term
        self.dict_apicall['proposal']['freight_term'] = str(self.currentQuote['CF_Freight_INCOTERM'])
        #freight_cost
        self.dict_apicall['proposal']['freight_cost'] = str(self.currentQuote['CF_Freight_Cost_Structure'])
        #mod_yard
        self.dict_apicall['proposal']['bom_priced'] = str(self.currentQuote['CF_Tax_Datails'])
        #tax_classification ,tax_options
        self.dict_apicall['proposal']['tax_classification'] = str(self.currentQuote['CF_Tax_Classification'])
        self.dict_apicall['proposal']['tax_options'] = str(self.currentQuote['CF_Tax_Options'])
        #engineering_hours
        """self.dict_apicall['proposal']['engineering_hours'] = [{
			"position": "Project Engineer WE",
			"hours": "230"
		}]"""
        del self.dict_apicall['proposal']['engineering_hours'][:]
        for table_row in self.currentQuote.QuoteTables['NAM_DOA_Summary'].Rows:
            if table_row['MH'] != "0" and int(table_row['MH']) > 0:
                self.dict_apicall['proposal']['engineering_hours'].append({'position': table_row['ITEM'].replace('\n',''),
                                              "hours": str(table_row['MH'])})
        """del self.dict_apicall['proposal']['engineering_hours'][:]
        for table_row in self.currentQuote.QuoteTables['QT_LI_ENGINEERING_HOURS'].Rows:
            self.dict_apicall['proposal']['engineering_hours'].append({'position': table_row['position'].replace('\n',''),
                                              "hours": str(table_row['hours'])})"""

        #cumulativeHours
        self.dict_apicall['proposal']['cumulativeHours'] = self.currentQuote['CF_Cumulative_Hours']
        #lcs
        self.dict_apicall['proposal']['lcs'] = str(self.currentQuote['CF_LCS'])
        #laborType
        self.dict_apicall['proposal']['labor_type'] = str(self.currentQuote['CF_Labor_Type'])
        self.dict_apicall['proposal']['est_project_end'] = str(self.currentQuote['CF_Project Completion Date'])
    #award
        self.dict_apicall['award']['eng_date'] = self.currentQuote['CF_Engineering Completion Date']
        self.dict_apicall['award']['material_date'] = self.currentQuote['CF_Material Due at Site Date']
        self.dict_apicall['award']['mobilization_date'] = self.currentQuote['CF_Mobilization Date']

## End Packaging
##########################################
    def print_package(self):
    #### below for testing only
        Log.Info(str(self.dict_apicall))

    def api_call(self):
        auth = BasicAuth_Service(self.__username, self.__password)
        basic = 'Basic ' + auth.hash()
        headers = {'Authorization': basic, 'ContentType':'Application/json'}
        Log.Info("dict_apicall---->"+str(self.dict_apicall))
        response = RestClient.Post(self.__url, self.dict_apicall, headers)
    #### below for testing only
        Log.Write(str(response))
        if(response.IsSuccess != 'true'):
            self.__api_response = "Failure: ERROR, contact NovaCura system admin"
            self.currentQuote.AddMessage("DOA Request Failed", MessageLevel.Error, True)
            raise Exception("Failure: " + str(response.Error))
        else:
            if(response.Results.error == '0'):
                self.__api_response = "DOA Delivered"
                Log.Write("__type--->"+str(self.__type))
                if str(self.__type) == "PRE":
                    self.currentQuote.AddMessage("Initial Legal Review Request Successful", MessageLevel.Success, True)
                elif str(self.__type) == "POST":
                    self.currentQuote.AddMessage("POST Awarding Request Successful", MessageLevel.Success, True)
                else:
                    self.currentQuote["CF_DOA_URL"] = "<a href='"+str(response.Results.url)+"' target=_blank>"+str(response.Results.url)+"</a>"
                    self.currentQuote.AddMessage("DOA Request Successful", MessageLevel.Success, True)
            else:
                self.__api_response = "Failure: ERROR, contact NovaCura system admin"
                self.currentQuote.AddMessage("DOA Request Failed", MessageLevel.Error, True)
                raise Exception("Failed:  " +  str(response.Results.error_message))




    def update_register(self, data_dict):
        if(self.__api_response != ''):
            data_dict['data'] = self.__api_response
        elif(self.__run_error != ''):
            data_dict['data'] = "Failure: " + self.__run_error
            self.currentQuote.AddMessage("DOA Request Failed", MessageLevel.Error, True)
        else:
            data_dict['data'] = 'Unknown'
            self.currentQuote.AddMessage("DOA Status Unknown", MessageLevel.Warning, True)
        try:
            register_table = self.currentQuote.QuoteTables['DOA_status_register']
            newRow = register_table.AddNewRow()
            newRow['doa_timestamp'] = data_dict['datetime']
            newRow['doa_user'] = data_dict['user']
            newRow['doa_type'] = data_dict['type']
            newRow['doa_data'] = data_dict['data']
        except Exception as e:
            Trace.Write(str(e))
            #Log.Info(str(e))


    def __strpSymbl(self, num):
        test_num = num
        sym_flag = True
        while(sym_flag):
            try:
                test_num = str(test_num)
                sym_flag = False
            except:
                test_num = test_num[1:]
        return test_num

    def __strdData(self, input_date):
        if input_date == None or input_date == '':
            input_date = ''
        elif isinstance(input_date, str):
            input_date = UserPersonalizationHelper.CovertToDate(input_date)
            input_date = input_date.ToString("dd/MM/yy")
        else:
            input_date = input_date.ToString("dd/MM/yy")
        return input_date
