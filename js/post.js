// require functions
// module export

var postDomain = function (json) {

  // POST /domain
  var response = request("POST", "/domain", json)

  // return id of domain or error
  return response.data.id
}

var postAuditActions = function (auditId, json) {

  // not sure about this line:
  // var actions = reconstructAuditAction(json)

  // PUT /audit/actions
  var response = request("PUT", "/audit/"+auditId+"/actions", json)

  // returns error or auditId from response
  return response.data.id

}

var postAudit = function (json) {

  // POST /audit
  var response = request("POST", "/audit", json)
  var auditId = response.data.id
  postAuditActions(auditId, json)

  return auditId

}

var postSimulation = function (json) {

  // POST /web-sims
  var response = request("POST", "/web-sims", json)

  // return simulationId or error
  return response.data.id

}
