// require functions
// module export

var migrateDomains = function () {

  var props = getPropertyIds()
  var map = []

  for (var i = 0; i < props.length; i++ ) {
    var propertyId = props[i]
    // get the property data, reconstruct it and post it to create a new domain
    // store the domainId that is returned into the map
    map[propertyId] = postDomain(reconstructDomain(getPropertyById(propertyId)))
  }
  // if there's an error return error message
  // else
    return map
}


var migrateAudits = function (propertyId, domainId) {

  // array of audits (ids) in a single property
  var audits = getAuditIds(propertyId)
  var map = []

  for (var i = 0; i < audits.length; i++ ) {
    var auditId = audits[i]
    // get the audit data, reconstruct it and post it to create a new audit
    // store the auditId (new one) that is returned into the map (to map to the new one)
    map[auditId] = postAudit(reconstructAudit(getAuditById(auditId)))
  }
  // if there's an error return error message
  // else
  return map
}



var migrateSimulations = function (propertyId, domainId) {

  var simulations = getSimulationIds(propertyId)
  var map = []

  for (var i = 0; i < simulations.length; i++ ) {
    var simulationId = simulations[i]
    // get the audit data, reconstruct it and post it to create a new audit
    // store the auditId (new one) that is returned into the map (to map to the new one)
    map[simulationId] = postSimulation(reconstructSimulation(getSimulationById(simulationId)))
  }
  // if there's an error return error message
  // else
  return map
}
