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
      //logAction: 1 = Login, 2 = Logout
      const DATA = []
      switch (logAction) {
        case 1:
          this.DATA = {
            userId: this.getUserId(),
            logAction: 'login'
          }
          break
        case 2:
          this.DATA = {
            userId: this.getUserId(),
            logAction: 'logout'
          }
          break
        default:
          console.log('Wrong logAction')
          break
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

    },

    logAuditTasks(logAction, logExtra) {

    },

    logAuditTickets(logAction, logExtra) {

    },

    logAuditApprovals(logAction) {

    },

    getUserId(){
        return session.getUser().user_id
    }

}
