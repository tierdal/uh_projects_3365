import axios from '../utilities/axios';
import session from '../utilities/session'
import config from "../config";
import Swal from "sweetalert2";

export default {

  //global logging method

    logAudit(logType, logAction, logExtra){
    // Audit logType: 1 = Access, 2 = Change Requests, 3 = Incidents, 4 = Tasks, 5 = Tickets, 6 = Approvals
    switch (logType) {
        case 1:
          this.logAuditAccess(logAction)
          break
        case 2:
          this.logAuditChangeRequests(logAction, logExtra)
          break
        case 3:
          this.logAuditIncidents(logAction, logExtra)
          break
        case 4:
          this.logAuditTasks(logAction, logExtra)
          break
        case 5:
          this.logAuditTickets(logAction, logExtra)
          break
        case 6:
          this.logAuditApprovals(logAction)
          break
        default:
          console.log('Wrong logType')
          break
        }
    },

    logAuditAccess(logAction) {
      //1 - access
      const DATA = []
      this.DATA = {
        userId: this.getUserId(),
        logAction: logAction
      }
      //console.log(JSON.stringify(this.DATA))
      axios.post(`${config.api}/api/lumberjack/logAuditAccess`, this.DATA)
        .catch(() => {
          console.log('Something went wrong with submitting logAuditAccess')
        })
    },

    logAuditChangeRequests(logAction, logExtra) {

    },

    logAuditIncidents(logAction, logExtra) {
      //3 - incidents
      const DATA = []
      this.DATA = {
        userId: this.getUserId(),
        logAction: logAction,
        logExtra: logExtra
      }
      axios.post(`${config.api}/api/lumberjack/logAuditIncidents`, this.DATA)
        .catch(() => {
          console.log('Something went wrong with submitting logAuditIncidents')
        })
    },

    logAuditTasks(logAction, logExtra) {

    },

    logAuditTickets(logAction, logExtra) {
      //5 - tickets
      const DATA = []
      this.DATA = {
        userId: this.getUserId(),
        logAction: logAction,
        logExtra: logExtra
      }
      axios.post(`${config.api}/api/lumberjack/logAuditTickets`, this.DATA)
        .catch(() => {
          console.log('Something went wrong with submitting logAuditTickets')
        })
    },

    logAuditApprovals(logAction) {

    },

    getUserId(){
        return session.getUser().user_id
    }

}
