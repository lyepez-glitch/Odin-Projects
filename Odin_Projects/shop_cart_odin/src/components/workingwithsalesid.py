quote = context.Quote
from Scripting.Quote import MessageLevel
#quote.AddMessage("test msg", MessageLevel.Info, False)
tables = quote.QuoteTables
totalSpec = 0
totalDetail = 0
totalPO= 0
totalDest = 0
index = 0
from Scripting.QuoteTables import AccessLevel
def hasTotal(table):
    count = 0
    for row in table.Rows:
        name = row.GetColumnValue('Name')
        if name == 'Total':
            count += 1
    if count > 0:
        return True
    return False
def deleteTotal(table):
    for row in table.Rows:
        name = row.GetColumnValue('Name')
        if name == 'Total':
            table.DeleteRow(row.Id)

for table in tables:
    if table.Name == 'Commission_Table':
        deleteTotal(table)
        #but we should always reprice the total
        for row in table.Rows:
            name = row.GetColumnValue('Name')
            colTotal = 0

            for col in row.Cells:
                colVal = col.DisplayValue
                colName = col.ColumnName
                if colName == 'Name':

                    repId = row.Cells["SalesRepId"]
                    qry= "SELECT Sales_Id FROM COMMISSIONS_REP_LIST WHERE NAME = '{}'".format(colVal)
                    fetchedId = SqlHelper.GetFirst(qry)
                    if fetchedId is not None:
                        Trace.Write(fetchedId.Sales_Id)
                        repId.Value = fetchedId.Sales_Id
                if name != 'Total':
                    if colName == 'Spec_50_':
                        totalSpec += int(colVal)
                        colTotal += int(colVal)
                    elif colName == 'Detail_30_':
                        totalDetail += int(colVal)
                        colTotal += int(colVal)
                    elif colName == 'PO_10_':
                        totalPO += int(colVal)
                        colTotal + int(colVal)
                    elif colName == 'Dest_10_':
                        totalDest += int(colVal)
                        colTotal += int(colVal)

            if index == table.Rows.Count - 1 and table.Rows.Count > 0:#if doesn't have a total column and there is at least one row then we should add total
                total_row = table.AddNewRow()

                total_row.SetColumnValue('Name','Total')
                index = 0
            else:
                index += 1



        for row in table.Rows:
            name = row.GetColumnValue('Name')
            Trace.Write('name' + str(name))

            if name == 'Total':
                for col in row.Cells:
                    colVal = col.DisplayValue
                    colName = col.ColumnName
                    if colName == 'Spec_50_':
                        col.Value = int(totalSpec)
                        Trace.Write('val' + str(col.Value))
                    elif colName == 'Detail_30_':
                        col.Value = int(totalDetail)
                    elif colName == 'PO_10_':
                        col.Value = totalPO
                    elif colName == 'Dest_10_':
                        col.Value =totalDest

        for row in table.Rows:
            name = row.GetColumnValue('Name')
            colTotal = 0
            for col in row.Cells:
                colVal = col.DisplayValue
                colName = col.ColumnName
                if colName == 'Spec_50_':
                    totalSpec += int(colVal)
                    colTotal += int(colVal)
                elif colName == 'Detail_30_':
                    totalDetail += int(colVal)
                    colTotal += int(colVal)
                elif colName == 'PO_10_':
                    totalPO += int(colVal)
                    colTotal + int(colVal)
                elif colName == 'Dest_10_':
                    totalDest += int(colVal)
                    colTotal += int(colVal)
            row.SetColumnValue('Total',colTotal)
