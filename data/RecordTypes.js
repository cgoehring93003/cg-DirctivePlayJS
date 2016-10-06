

var recordTypeSortChoices = new Object(); //init an object

recordTypeSortChoices["AccountContact"] = ["AccountContactID", "UserId", "AccountID", "AccountContactFirstName", "AccountContactMiddleName", "AccountContactLastName", "AccountContactPhone", "AccountContactPhone2"];

recordTypeSortChoices["Account"] = ["AccountID", "AccountNumber", "CompanyName", "Address", "City", "State", "Zip", "BillingCareOf", "BillingCareOfPhone", "BillingAddress1", "BillingAddress2", "BillingCity", "BillingState", "BillingZip"];

recordTypeSortChoices["ErrorLog"] = ["LogID", "FriendlyMessage", "Details", "EventDate", "Severity"];

recordTypeSortChoices["Invoice"] = ["InvoiceID", "AccountID", "InvoiceNumber", "InvoiceDate"];

recordTypeSortChoices["LaborCategory"] = ["LaborCategoryID", "AccountID", "LaborCategoryDescription", "BillingRate"];

recordTypeSortChoices["MaterialCategory"] = ["MaterialCategoryID", "AccountID", "MaterialCategoryDescription"];

recordTypeSortChoices["ProjectItemCategory"] = ["ProjectItemCategoryID", "ProjectItemCategory"];

recordTypeSortChoices["ProjectItemComment"] = ["ProjectItemID", "CommentDate", "ProjectItemCommentDetails"];

recordTypeSortChoices["ProjectItemExpandedDetail"] = ["ProjectItemID", "CallDateTime", "CloseDateTime", "CallerFirstName", "CallerLastName", "DowntimeHours"];

recordTypeSortChoices["ProjectItem"] = ["ProjectItemID", "ProjectItemCategoryID", "AccountID", "ProjectID", "ProjectItemDescription", "DetailedDescription", "NeedDate", "Status", "RecordStatus"];

recordTypeSortChoices["ProjectLaborCharge"] = ["LaborChargeTransID", "ProjectItemID", "LaborCategoryID", "LaborHours", "ChargeDate"];

recordTypeSortChoices["ProjectMaterialCharge"] = ["MaterialChargeTransID", "ProjectItemID", "MaterialCategoryID", "ChargeDate", "ChargeAmount", "ChargeDescription"];

recordTypeSortChoices["Project"] = ["ProjectID", "AccountID", "ProjectIdentifier", "ProjectDescription", "ProjectPlannedStartDateTime", "ProjectPlannedEndDateTime", "ProjectDollarsBudget", "RecordStatus"];

recordTypeSortChoices["Addresses of the Stars"] = ["firstName", "lastName", "address", "city", "state", "zip", "RecordStatus"];

