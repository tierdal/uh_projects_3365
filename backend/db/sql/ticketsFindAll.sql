SELECT        dbo.ticketLog.ticket_id, dbo.ticketLog.ticket_title, { fn CONCAT(created_by.f_name + ' ', created_by.l_name) } AS created_by, dbo.requestStatus.requestStatus_name, { fn CONCAT(assigned_user.f_name + ' ',
                                                                                                                                                                                              assigned_user.l_name) } AS assigned_user, dbo.priorityList.priority_name, dbo.issueType.issueType_name, dbo.issueCategory.issueCategory_name, dbo.ticketLog.is_resolved, dbo.ticketLog.CREATED_AT
FROM            dbo.ticketLog LEFT OUTER JOIN
                dbo.priorityList ON dbo.ticketLog.priorityId = dbo.priorityList.priority_id LEFT OUTER JOIN
                dbo.slaList ON dbo.priorityList.priority_sla_id = dbo.slaList.sla_id LEFT OUTER JOIN
                dbo.teams ON dbo.ticketLog.teamId = dbo.teams.team_id LEFT OUTER JOIN
                dbo.requestStatus ON dbo.ticketLog.requestStatusId = dbo.requestStatus.requestStatus_id LEFT OUTER JOIN
                dbo.users AS created_by ON dbo.ticketLog.created_by = created_by.user_id LEFT OUTER JOIN
                dbo.users AS assigned_user ON dbo.ticketLog.assigned_user = created_by.user_id LEFT OUTER JOIN
                dbo.issueCategory ON dbo.ticketLog.issuecategoryId = dbo.issueCategory.issueCategory_id LEFT OUTER JOIN
                dbo.issueType ON dbo.ticketLog.issueId = dbo.issueType.issueType_id AND dbo.issueCategory.issueCategory_id = dbo.issueType.issueCategoryId