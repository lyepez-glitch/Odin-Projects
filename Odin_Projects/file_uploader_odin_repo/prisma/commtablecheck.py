from Scripting.Quote import MessageLevel
sowFlag = False
msgFlag = False
quoteTable = context.Quote.QuoteTables['Commission_Table']
quote = context.Quote

val1 = 0
val2 = 0
val3 = 0
val4 = 0
total = 0

if quote.StatusName == "Awarded":
    # Check each row in quoteTable
    for row in quoteTable.Rows:
        if row['Name'] != '':
            sowFlag = True
        else:
            sowFlag = False
            break
    Trace.Write(sowFlag)

for row in quoteTable.Rows:
    if row['Name'] == 'Total':
        for col in row.Cells:
            colVal = col.DisplayValue
            colName = col.ColumnName
            if colName == 'Spec_50_':
                val1 += int(colVal)
            elif colName == 'Detail_30_':
                val2 += int(colVal)
            elif colName == 'PO_10_':
                val3 += int(colVal)
            elif colName == 'Dest_10_':
                val4 += int(colVal)

total = val1 + val2 + val3 + val4
Trace.Write(total)

for msg in quote.Messages:
    if msg.Content == "Start Project Setup action failed!! Commission table in the award tab is not properly filled out. Please click the 'Add Row' option or select a Name from the drop down list for the Commission table in the Award tab. The 'Total' row percentage must add up to 100. Click the 'Start Project Setup' action again when finished.":
        msgFlag = True
        break

if sowFlag == True and total == 100:
    for msg in quote.Messages:
        if msg.Content == "Start Project Setup action failed!! Commission table in the award tab is not properly filled out. Please click the 'Add Row' option or select a Name from the drop down list for the Commission table in the Award tab. The 'Total' row percentage must add up to 100. Click the 'Start Project Setup' action again when finished.":
            msgId = msg.Id
            quote.DeleteMessage(msgId)
if total != 100:
    sowFlag = False
if sowFlag == False and msgFlag == False:
    quote.AddMessage("Start Project Setup action failed!! Commission table in the award tab is not properly filled out. Please click the 'Add Row' option or select a Name from the drop down list for the Commission table in the Award tab. The 'Total' row percentage must add up to 100. Click the 'Start Project Setup' action again when finished.", MessageLevel.Error, False)
    if total != 100:
        context.WorkflowContext.BreakWorkflowExecution = True