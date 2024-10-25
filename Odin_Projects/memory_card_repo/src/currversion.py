from BasicAuth_Service import BasicAuth_Service
from Scripting.Quote import MessageLevel
from DummyPayload import getDummyPayload,getDefaultPayload
class NovacuraIntegration:

    dict_apicall = getDefaultPayload()


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
    currentQuote = ''

    #takes in a quote instance object (context.Quote)
    def __init__(self, quoteObj, first_name='first', last_name='last', user_id='000', calltype = '',statusName=''):
        self.__username = 'INTEGRATION_USER'
        self.__password = '9yCwoQ$%1O@mI^'
        self.__quoteNum = quoteObj.QuoteNumber
        self.__first_name = first_name
        self.__last_name = last_name
        self.__user_id = user_id
        self.__type = calltype
        self.__statusName = statusName
        self.dummyPayload = getDummyPayload()
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

        try:
            self.dict_apicall['overview']['prop_rev'] = str(SqlHelper.GetFirst("Select REVISION_ID from sys_QuoteRevisions where CART_ID = {}".format(self.currentQuote.Id)).REVISION_ID)
        except:
             self.dict_apicall['overview']['prop_rev'] = self.dummyPayload

        #quote_id
        try:
            self.dict_apicall['overview']['prop_id'] = str(self.currentQuote.Id)
        except:
            self.dict_apicall['overview']['prop_id'] = self.dummyPayload['overview']['prop_id']
        #quote_no
        try:
            self.dict_apicall['overview']['prop_number'] = str(self.currentQuote.QuoteNumber)
        except:
            self.dict_apicall['overview']['prop_number'] = self.dummyPayload['overview']['prop_number']
        #status
        try:
            self.dict_apicall['overview']['status'] = str(self.__statusName)
        except:
            self.dict_apicall['overview']['status'] = self.dummyPayload['overview']['status']
        #date_created
        try:
            self.dict_apicall['overview']['date_created'] = self.__strdData(self.currentQuote.DateCreated)
        except:
            self.dict_apicall['overview']['date_created'] = self.dummyPayload['overview']['date_created']
        #date_modified
        try:
            self.dict_apicall['overview']['date_modified'] = self.__strdData(self.currentQuote.DateModified)
        except:
           	self.dict_apicall['overview']['date_modified'] = self.dummyPayload['overview']['date_modified']
        #date_effective
        try:
            self.dict_apicall['overview']['date_effective'] = self.__strdData(self.currentQuote.EffectiveDate)
        except:
            self.dict_apicall['overview']['date_modified'] = self.dummyPayload['overview']['date_modified']
        #currency
        try:
            self.dict_apicall['overview']['currency'] = str(self.currentQuote['CF_Quoted_Currency'])
        except:
            self.dict_apicall['overview']['currency'] = self.dummyPayload['overview']['currency']
        "submitter_name"
        try:
            self.dict_apicall['overview']['submitter_name'] = self.__last_name + ", " +  self.__first_name
        except:
            self.dict_apicall['overview']['submitter_name'] = self.dummyPayload['overview']['submitter_name']
        "submitter_id"
        try:
            self.dict_apicall['overview']['submitter_id'] = self.__user_id
        except:
             self.dict_apicall['overview']['submitter_id'] =  self.dummyPayload['overview']['submitter_id']
        #estimated value
        try:
            self.dict_apicall['overview']['estimated_value'] = 	str(self.currentQuote['CF_OpportunityAmount'])
        except:
            self.dict_apicall['overview']['estimated_value'] = self.dummyPayload['overview']['estimated_value']
        try:
            self.dict_apicall['overview']['type'] = self.__type
        except:
            self.dict_apicall['overview']['type'] = self.dummyPayload['overview']['type']

    #### below for testing only
        '''Log.Info('id:' +str(self.dict_apicall['overview']['prop_id']) +' num:' + str(self.dict_apicall['overview']['prop_number']) + ' rev:' + str(self.dict_apicall['overview']['prop_rev']))'''
        #terms
        try:
            self.dict_apicall['overview']['terms'] = str(self.currentQuote['Terms'])
        except:
            self.dict_apicall['overview']['terms'] = self.dummyPayload['overview']['terms']
        #estimated_value
        #self.dict_apicall['overview']['estimated_value'] = 50000.00
        #expire_date
        try:
            self.dict_apicall['overview']['expire_date'] = self.__strdData(self.currentQuote['Quote Expiration Date'])
        except:
            self.dict_apicall['overview']['expire_date'] = self.dummyPayload['overview']['expire_date']
        #quote_owner

        try:
            sql_return = SqlHelper.GetFirst('SELECT first_name, last_name, Id FROM USERS WHERE Id = {id}'.format(id = self.currentQuote.OwnerId))
            self.dict_apicall['overview']['user_name'] = str(sql_return.first_name + ' ' + sql_return.last_name)
        except:
            self.dict_apicall['overview']['user_name'] = self.dummyPayload['overview']['user_name']

        #user_email
        try:
            self.dict_apicall['overview']['user_email'] = str(SqlHelper.GetFirst('SELECT EMAIL FROM USERS WHERE Id = {id}'.format(id = self.currentQuote.OwnerId)).EMAIL)
        except:
            self.dict_apicall['overview']['user_email'] = self.dummyPayload['overview']['user_email']


    #bfu
        #total_sales
        try:
            self.dict_apicall['bfu']['total_sales'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')
        except:
            self.dict_apicall['bfu']['total_sales'] = self.dummyPayload['bfu']['total_sales']
        #total_cost
        try:
            self.dict_apicall['bfu']['total_cost'] = self.currentQuote.GetAllItems()[0]['Total_Cost_Str'][3:].replace(',','')
        except:
            self.dict_apicall['bfu']['total_cost'] = self.dummyPayload['bfu']['total_cost']
        #margin
        try:
            self.dict_apicall['bfu']['margin'] = str(self.currentQuote.GetAllItems()[0]['GM'].replace('%',''))
        except:
            self.dict_apicall['bfu']['margin'] = self.dummyPayload['bfu']['margin']

        #summary_phases
        """self.dict_apicall['bfu']['summary_phases'] = [{
            "phase_title": "PM & Coordination HRS",
            "total_cost": "25000.00",
            "total_sales": "50000.00",
            "gm": "50.00"
        }]"""
        try:
            del self.dict_apicall['bfu']['summary_phases'][:]
            for table_row in self.currentQuote.QuoteTables['NAM_DOA_Summary'].Rows:
                if 'TOTALS' not in table_row['ITEM'] and 'Totals' not in table_row['ITEM']:
                    self.dict_apicall['bfu']['summary_phases'].append({'phase_title': table_row['ITEM'].replace('\n',''),
                                                  "total_cost": self.__strpSymbl(table_row['COST']),
                                                  "total_sales": self.__strpSymbl(table_row['SELL']),
                                                  "gm": str(table_row['GM_'].replace('%', ''))})
        except:
            del self.dict_apicall['bfu']['summary_phases'][:]
            self.dict_apicall['bfu']['summary_phases'] = self.dummyPayload['bfu']['summary_phases']
        #summary_subsection
        self.dict_apicall['bfu']['summary_subsection'] = []


    #opportunity
        #opportinuity_name
        try:
            self.dict_apicall['opportunity']['opportunity_name'] = self.currentQuote['CF_Opportunity_Name']
        except:
            self.dict_apicall['opportunity']['opportunity_name'] = self.dummyPayload['opportunity']['opportunity_name']
        #opportunity_id
        try:
            self.dict_apicall['opportunity']['opportunity_id'] = str(self.currentQuote['CF_SFDC_Opportunity_Number'])
        except:
            self.dict_apicall['opportunity']['opportunity_id'] = self.dummyPayload['opportunity']['opportunity_id']
        #sales_team
        try:
            self.dict_apicall['opportunity']['sales_team'] = self.currentQuote['CF_Profit_Center']
        except:
            self.dict_apicall['opportunity']['sales_team'] = self.dummyPayload['opportunity']['sales_team']
        #sales_region
        try:
            self.dict_apicall['opportunity']['sales_region'] = str(self.currentQuote['CF_Business_Area'])
        except:
            self.dict_apicall['opportunity']['sales_region'] = self.dummyPayload['opportunity']['sales_region']


        #sales_sub_region
        try:
            self.dict_apicall['opportunity']['sales_sub_region'] = str(self.currentQuote['CF_Sub_Region'])
        except:
            self.dict_apicall['opportunity']['sales_sub_region'] = self.dummyPayload['opportunity']['sales_sub_region']

        #opportunity_vertical_1
        try:
            self.dict_apicall['opportunity']['opportunity_subvertical_1'] = str(self.currentQuote['CF_Verticals'])
        except:
            self.dict_apicall['opportunity']['opportunity_subvertical_1'] = self.dummyPayload['opportunity']['opportunity_subvertical_1']
        #scope_options
        try:
            self.dict_apicall['opportunity']['scope_options'] = str(self.currentQuote['CF_Primary_Need'])
        except:
            self.dict_apicall['opportunity']['scope_options'] = self.dummyPayload['opportunity']['scope_options']
        #opportunity_country

        try:
            self.dict_apicall['opportunity']['opportunity_country'] = str(self.currentQuote['CF_End_User_Location'])
        except:
            self.dict_apicall['opportunity']['opportunity_country'] = self.dummyPayload['opportunity']['opportunity_country']
        #est_project_start
        try:
            self.dict_apicall['opportunity']['est_project_start'] = self.__strdData(self.currentQuote['CF_Estimated_Project_Start_Date_Dup'])
        except:
            self.dict_apicall['opportunity']['est_project_start'] = self.dummyPayload['opportunity']['est_project_start']
    #rfq
        #name
        #"assigned_to": "Derek Spaulding",
        #"assigned_to_email": "derek.spaulding@nvent.com.invalid",
        #"sales_person": "Daniel Doubet",
        #"sales_person_email": "f.andre@geral.com.invalid",
        #"sales_person_mobile": "16122704704",
        try:
            self.dict_apicall['rfq']['name'] = self.currentQuote['CF_SFDC_RFQ_Name']
        except:
            self.dict_apicall['rfq']['name'] = self.dummyPayload['rfq']['name']
        #sfdc_rfq_no
        try:
            self.dict_apicall['rfq']['sfdc_rfq_no'] = str(self.currentQuote['CF_SFDC_RFQ_Number'])
        except:
            self.dict_apicall['rfq']['sfdc_rfq_no'] = self.dummyPayload['rfq']['sfdc_rfq_no']
        #revision_no
        try:
            self.dict_apicall['rfq']['revision_no'] = str(self.currentQuote['CF_Revision_Number'])
        except:
            self.dict_apicall['rfq']['revision_no'] = self.dummyPayload['rfq']['revision_no']
        #client_ref_no
        try:
            self.dict_apicall['rfq']['client_ref_no'] = str(self.currentQuote['CF_RFQ_REF_NUM'])
        except:
            self.dict_apicall['rfq']['client_ref_no'] = self.dummyPayload['rfq']['client_ref_no']
        #year
        try:
            self.dict_apicall['rfq']['year'] = str(self.currentQuote['CF_Year'])
        except:
            self.dict_apicall['rfq']['year'] = self.dummyPayload['rfq']['year']
        #assigned_to
        try:
            self.dict_apicall['rfq']['assigned_to'] = self.currentQuote['CF_Assigned_to']
        except:
            self.dict_apicall['rfq']['assigned_to'] = self.dummyPayload['rfq']['assigned_to']
        #assigned_to_email
        try:
            self.dict_apicall['rfq']['assigned_to_email'] = str(self.currentQuote['CF_PROPOSAL_ENG_EMAIL'])
        except:
            self.dict_apicall['rfq']['assigned_to_email'] = self.dummyPayload['rfq']['assigned_to_email']
        #sales_person
        try:
            self.dict_apicall['rfq']['sales_person'] = self.currentQuote['CF_Sales_Person']
        except:
            self.dict_apicall['rfq']['sales_person'] = self.dummyPayload['rfq']['sales_person']
        #sales_person_email

        try:
            self.dict_apicall['rfq']['sales_person_email'] = str(self.currentQuote['CF_SALES_ENG_EMAIL'])
        except:
            self.dict_apicall['rfq']['sales_person_email'] = self.dummyPayload['rfq']['sales_person_email']
        #sales_person_mobile
        try:
            self.dict_apicall['rfq']['sales_person_mobile'] = str(self.currentQuote['CF_SALES_ENG_MOBILE'])
        except:
            self.dict_apicall['rfq']['sales_person_mobile'] = self.dummyPayload['rfq']['sales_person_mobile']
        #pe_team
        try:
            self.dict_apicall['rfq']['pe_team'] = self.currentQuote['CF_Owner']
        except:
            self.dict_apicall['rfq']['pe_team'] = self.dummyPayload['rfq']['pe_team']
        #date_requested
        try:
            self.dict_apicall['rfq']['date_requested'] = self.__strdData(self.currentQuote['CF_RFQ_Received'])
        except:
            self.dict_apicall['rfq']['date_requested'] = self.dummyPayload['rfq']['date_requested']
        #date_scheduled_completion
        try:
            self.dict_apicall['rfq']['date_scheduled_completion'] = self.__strdData(self.currentQuote['CF_Scheduled_Completion'])
        except:
            self.dict_apicall['rfq']['date_scheduled_completion'] = self.dummyPayload['rfq']['date_scheduled_completion']
        #type
        try:
            self.dict_apicall['rfq']['type'] = str(self.currentQuote['CF_RFQ_Type'])
        except:
            self.dict_apicall['rfq']['type'] = self.dummyPayload['rfq']['type']
        #stage
        try:
            self.dict_apicall['rfq']['stage'] = str(self.currentQuote['CF_RFQ_Status'])
        except:
            self.dict_apicall['rfq']['stage'] = self.dummyPayload['rfq']['stage']
        #swimlane
        try:
            self.dict_apicall['rfq']['swimlane'] = str(self.currentQuote['CF_Swimlane'])
        except:
            self.dict_apicall['rfq']['swimlane'] = self.dummyPayload['rfq']['swimlane']
        #scope
        try:
            self.dict_apicall['rfq']['scope'] = str(self.currentQuote['CF_Scope_RFQ'])
        except:
            self.dict_apicall['rfq']['scope'] = self.dummyPayload['rfq']['scope']
        #url
        try:
            self.dict_apicall['rfq']['salesforce_url'] = str(self.currentQuote['CF_RFQ_URL'])
        except:
            self.dict_apicall['rfq']['salesforce_url'] = self.dummyPayload['rfq']['salesforce_url']

    #customer
        #account_name
        try:
            self.dict_apicall['customer']['account_name'] = self.currentQuote['CF_Account_Official_Name']
        except:
            self.dict_apicall['customer']['account_name'] = self.dummyPayload['customer']['account_name']
        #official_name
        try:
            self.dict_apicall['customer']['official_name'] = self.currentQuote['CF_Customer_Name']
        except:
            self.dict_apicall['customer']['official_name'] = self.dummyPayload['customer']['official_name']
        #contact_name
        try:
            self.dict_apicall['customer']['contact_name'] = self.currentQuote['CF_Customer_Contact_Name']
        except:
            self.dict_apicall['customer']['contact_name'] = self.dummyPayload['customer']['contact_name']
        #contact_salutation
        try:
            self.dict_apicall['customer']['contact_salutation'] = str(self.currentQuote['CF_Salutation'])
        except:
            self.dict_apicall['customer']['contact_salutation'] = self.dummyPayload['customer']['contact_salutation']
        #contact_title
        try:
            self.dict_apicall['customer']['contact_title'] = self.currentQuote['CF_Customer_Contact_Title']
        except:
            self.dict_apicall['customer']['contact_title'] = self.dummyPayload['customer']['contact_title']
        #contact_mobile
        try:
            self.dict_apicall['customer']['contact_mobile'] = str(self.currentQuote['CF_Customer_Contact_Phone'])
        except:
            self.dict_apicall['customer']['contact_mobile'] = self.dummyPayload['customer']['contact_mobile']
        #contact_email
        try:
            self.dict_apicall['customer']['contact_email'] = str(self.currentQuote['CF_Customer_Contact_Email'])
        except:
            self.dict_apicall['customer']['contact_email'] = self.dummyPayload['customer']['contact_email']
        #contact_company_name
        try:
            self.dict_apicall['customer']['contact_company_name'] = str(self.currentQuote['CF_Customer_Contact_Company_Name'])
        except:
             self.dict_apicall['customer']['contact_company_name'] =  self.dummyPayload['customer']['contact_company_name']

    #doa
        #status
        try:
            self.dict_apicall['doa']['status'] = str(self.currentQuote['CF_DOA_Status'])
        except:
            self.dict_apicall['doa']['status'] = self.dummyPayload['doa']['status']
        #approval_level

        try:
            self.dict_apicall['doa']['approval_level'] = str(self.currentQuote['CF_DOA_Status'])
        except:
            self.dict_apicall['doa']['approval_level']  = self.dummyPayload['doa']['approval_level']
        #scope_options
        try:
            self.dict_apicall['doa']['scope_options'] = str(self.currentQuote['CF_Primary_Need'])
        except:
            self.dict_apicall['doa']['scope_options'] = self.dummyPayload['doa']['scope_options']
        #application
        try:
            self.dict_apicall['doa']['application'] = str(self.currentQuote['CF_Primary_Technology'])
        except:
            self.dict_apicall['doa']['application'] = self.dummyPayload['doa']['application']
        #executive_summary
        try:
            self.dict_apicall['doa']['executive_summary'] = str(self.currentQuote['CF_DOA_Executive_Summary'])
        except:
            self.dict_apicall['doa']['executive_summary'] = self.dummyPayload['doa']['executive_summary']
        #pricing_summary
        try:
            self.dict_apicall['doa']['pricing_summary'] = str(self.currentQuote['CF_DOA_Pricing_Summary'])
        except:
            self.dict_apicall['doa']['pricing_summary'] = self.dummyPayload['doa']['pricing_summary']
        #rpsm_approval
        try:
            self.dict_apicall['doa']['rpsm_approval'] = str(self.currentQuote['CF_RPSM_Approval'])
        except:
            self.dict_apicall['doa']['rpsm_approval'] = self.dummyPayload['doa']['rpsm_approval']
        #terms_conditions
        try:
            self.dict_apicall['doa']['terms_conditions'] = "Standard Terms"#str(self.currentQuote['CF_Terms_and_Conditions'])
        except:
            self.dict_apicall['doa']['terms_conditions'] = self.dummyPayload['doa']['terms_conditions']
        #provisions
        try:
            self.dict_apicall['doa']['provisions'] = str(self.currentQuote['CF_Provisions'])
        except:
            self.dict_apicall['doa']['provisions'] = self.dummyPayload['doa']['provisions']
        #project_type
        try:
            self.dict_apicall['doa']['project_type'] = str(self.currentQuote['CF_Project_Type'])
        except:
            self.dict_apicall['doa']['project_type'] = self.dummyPayload['doa']['project_type']
        #terms
        try:
            self.dict_apicall['doa']['terms'] = "Standard Terms"#str(self.currentQuote['CF_Terms_and_Conditions'])
        except:
            self.dict_apicall['doa']['terms'] = self.dummyPayload['doa']['terms']
        #non_standard_terms
        try:
            self.dict_apicall['doa']['non_standard_terms'] = str(self.currentQuote['CF_Non _Standard _Term _Description'])
        except:
            self.dict_apicall['doa']['non_standard_terms'] = self.dummyPayload['doa']['non_standard_terms']

        #liquidatedDamages
        try:
            self.dict_apicall['doa']['liquidatedDamages'] = str(self.currentQuote['CF_Liquidated_Damages'])
        except:
            self.dict_apicall['doa']['liquidatedDamages'] = self.dummyPayload['doa']['liquidatedDamages']
        #special_note
        try:
            self.dict_apicall['doa']['special_note'] = str(self.currentQuote['CF_Special_Note_Condition'])
        except:
            self.dict_apicall['doa']['special_note'] = self.dummyPayload['doa']['special_note']
        #bank_instruments
        try:
            self.dict_apicall['doa']['bank_instruments'] = str(self.currentQuote['CF_Bank_Instruments_Required'])
        except:
            #smart_margins
            self.dict_apicall['doa']['bank_instruments'] = self.dummyPayload['doa']['bank_instruments']
        try:
            #terms_doc_link
            self.dict_apicall['doa']['terms_doc_link'] = str(self.currentQuote['CF_T&C_Document_Link'])
        except:
            self.dict_apicall['doa']['terms_doc_link'] = self.dummyPayload['doa']['terms_doc_link']
        #proposal_link
        try:
            self.dict_apicall['doa']['proposal_link'] = str(self.currentQuote['CF_Proposal'])
        except:
            self.dict_apicall['doa']['proposal_link'] = self.dummyPayload['doa']['proposal_link']
        #cashflow_sheet
        try:
            self.dict_apicall['doa']['cashflow_sheet'] = str(self.currentQuote['CF_Cashflow_Sheet'])
        except:
            self.dict_apicall['doa']['cashflow_sheet'] = self.dummyPayload['doa']['cashflow_sheet']
        #qra_sheet
        try:
            self.dict_apicall['doa']['qra_sheet'] = str(self.currentQuote['CF_QRA_Sheet'])
        except:
            self.dict_apicall['doa']['qra_sheet'] = self.dummyPayload['doa']['qra_sheet']

        try:
            self.dict_apicall['doa']['contract_type'] = str(self.currentQuote['CF_Contract_Type'])
        except:
            self.dict_apicall['doa']['contract_type'] = self.dummyPayload['doa']['contract_type']
        #sharepoint_url
        try:
            self.dict_apicall['doa']['sharepoint_url'] = str(self.currentQuote['CF_OneDrive_Folder_Link'])
        except:
            self.dict_apicall['doa']['sharepoint_url'] = self.dummyPayload['doa']['sharepoint_url']


    #proposal
        #currency
        try:
            self.dict_apicall['proposal']['currency'] = str(self.currentQuote['CF_Quoted_Currency'])
        except:
            self.dict_apicall['proposal']['currency'] = self.dummyPayload['proposal']['currency']
        #total_amount
        try:
            self.dict_apicall['proposal']['total_amount'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')#str(self.currentQuote['CF_Total_Amount'])
        except:
            self.dict_apicall['proposal']['total_amount'] = self.dummyPayload['proposal']['total_amount']
        #amount
        try:
            self.dict_apicall['proposal']['amount'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')#str(self.currentQuote['CF_Value_In_Local_Currency'])###total_amount without symbol
        #usd_value
        except:
            self.dict_apicall['proposal']['amount'] = self.dummyPayload['proposal']['amount']
        try:
            self.dict_apicall['proposal']['usd_value'] = self.currentQuote.GetAllItems()[0]['Total_Sales_Str'][3:].replace(',','')#str(self.currentQuote['CF_Value_in_USD'])
        #payment_terms
        except:
            self.dict_apicall['proposal']['usd_value'] = self.dummyPayload['proposal']['usd_value']

        try:
            self.dict_apicall['proposal']['payment_terms'] = str(self.currentQuote['CF_Payment_Terms'])
        except:
            self.dict_apicall['proposal']['payment_terms'] = self.dummyPayload['proposal']['payment_terms']
        #terms_conditions
        try:
            self.dict_apicall['proposal']['terms_conditions'] = str(self.currentQuote['CF_T_C'])
        except:
            self.dict_apicall['proposal']['terms_conditions'] = self.dummyPayload['proposal']['terms_conditions']
        #contractual_entity
        try:
            self.dict_apicall['proposal']['contractual_entity'] = str(self.currentQuote['CF_Contractual_Entity'])
        except:
            self.dict_apicall['proposal']['contractual_entity'] = self.dummyPayload['proposal']['contractual_entity']
        #selling_entity
        try:
            self.dict_apicall['proposal']['selling_entity'] = str(self.currentQuote['CF_Selling_Entity'])
        except:
            self.dict_apicall['proposal']['selling_entity'] = self.dummyPayload['proposal']['selling_entity']
        #scope
        try:
            self.dict_apicall['proposal']['scope'] = str(self.currentQuote['CF_Scope_RFQ'])
        except:
            self.dict_apicall['proposal']['scope'] = self.dummyPayload['proposal']['scope']
        #bom_priced
        try:
            self.dict_apicall['proposal']['bom_priced'] = str(self.currentQuote['CF_BOM_Priced_or_Unpriced'])
        except:
            self.dict_apicall['proposal']['bom_priced'] = self.dummyPayload['proposal']['bom_priced']
        #engineering_hours
        """self.dict_apicall['proposal']['engineering_hours'] = [{
			"position": "Project Engineer WE",
			"hours": "230"
		}]"""
        try:
            del self.dict_apicall['proposal']['engineering_hours'][:]
            for table_row in self.currentQuote.QuoteTables['NAM_DOA_Summary'].Rows:
                if table_row['MH'] != "0" and int(table_row['MH']) > 0:
                    self.dict_apicall['proposal']['engineering_hours'].append({'position': table_row['ITEM'].replace('\n',''),"hours": str(table_row['MH'])})

        except:
            del self.dict_apicall['proposal']['engineering_hours'][:]
            for table_row in self.currentQuote.QuoteTables['NAM_DOA_Summary'].Rows:
                if table_row['MH'] != "0" and int(table_row['MH']) > 0:
                    self.dict_apicall['proposal']['engineering_hours'] = self.dummyPayload['proposal']['engineering_hours']

        #cumulativeHours
        try:
            self.dict_apicall['proposal']['cumulativeHours'] = self.currentQuote['CF_Cumulative_Hours']
        except:
            self.dict_apicall['proposal']['cumulativeHours'] = self.dummyPayload['proposal']['cumulativeHours']
        #lcs
        try:
            self.dict_apicall['proposal']['lcs'] = str(self.currentQuote['CF_LCS'])
        except:
            self.dict_apicall['proposal']['lcs'] = self.dummyPayload['proposal']['lcs']
        #laborType
        try:
            self.dict_apicall['proposal']['labor_type'] = str(self.currentQuote['CF_Labor_Type'])
        except:
            self.dict_apicall['proposal']['labor_type'] = self.dummyPayload['proposal']['labor_type']

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
                    self.currentQuote.AddMessage("P and E Request Successful", MessageLevel.Success, True)
                else:
                    self.currentQuote["CF_DOA_URL"] = "<a href='"+str(response.Results.url)+"' target=_blank>"+str(response.Results.url)+"</a>"
                    self.currentQuote.AddMessage("DOA Request Successful", MessageLevel.Success, True)
            else:
                self.__api_response = "Failure: ERROR, contact NovaCura system admin"
                self.currentQuote.AddMessage("P and E Request Failed", MessageLevel.Error, True)
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
