###Summary
This app will help migrate data from the ObservePoint legacy platform to the new one. The task is accomplished by first installing the NodeJS app package through npm and configuring it with API keys and other preferences. Then via ObservePoint's REST APIs, HTTP requests will be made to 1) fetch data from the legacy platform (GET method) and 2) send data to the new platform (POST/PUT methods). In between, the JSON data from the legacy platform needs to be reconstructed to fit the respective schemas the new plaform API expects. 
The app will only migrate data for a single account but it has the potential to migrate multiple accounts at once given a set of API keys and some additional wizardry. 

###Architecture
####Overview
  - input api key for legacy platform and api key for new platform
  - fetch all  property ids in legacy
    "GET /properties"
  - for each property
    - create an equivalent in np
      "POST /domains"
    - request all audits for the property 
      "GET /property/id/audits"
    - for each audit
      - create an equivalent in np
        "POST /audit"
      - make another request for actions
        "PUT /audit/id/actions"
    - request all simulations for the property
      "GET /property/id/simulations"
    - for each simulation
      - create an equivalent journey in np

####Structure of functions
  - options (object literal in scope of all functions)
    - legacy platform key
    - new platform key 
    - url for legacy platform
    - url for new platform
    - other options like notifications, max pages, etc.
  - migrateAll()
    - migrateDomains()
    - stores map
    - for each propertyId:domainId kvp 
      - calls migrateAudits(propertyId, domainId)
      - stores map
      - calls migrateJourneys(propertyId, domainId)
      - stores map
    - returns the three maps (in a single object) or error
  - getPropertyIds()
    - GET /properties
    - extracts ids out of the json response
    - returns an array of ids for all the properties
  - getPropertyById(propertyId)
    - GET /property/id
    - returns json response without formatting
  - constructDomain(json)
    - reconstructs and returns Property json data to Domain json data
  - createDomain(json)
    - POST /domain
    - returns id of domain or error
  - migrateDomains()
    - calls getPropertyIds()
    - for each propertyId in the array
      - calls createDomain(constructDomain(getPropertyById(id))))
      - pushes domainId and propertyId to object
    - returns object of properties:domains
  - getAuditIds(propertyId)
    - GET /property/id/audits
    - extracts ids out the json response
    - returns array of ids for all audits
  - getAuditById(auditId)
    - GET /audit/id
    - returns json response without formatting
  - constructAuditActions(json)
    - reconstructs audit json data
    - returns audit actions json data
  - constructAudit (json)
    - reconstructs audit json data  
    - returns new audit json data
  - createAuditActions(auditId, json)
    - calls constructAuditAction(json)
    - PUT /audit/actions
    - returns auditId from response
  - createAudit(json)
    - POST /audit
    - store auditId
    - createAuditActions(auditId, json)
    - return auditId
  - migrateAudits(propertyId, domainId)
    - calls getAuditIds(propertyId)
    - for each auditId in the array
      - calls createAudit(constructAudit(getAuditById(auditId)))
      - pushes legacyAuditId and newAuditId to array
    - returns legacyAuditId:newAuditId map/object
  - getSimulationIds(propertyId)
    - GET /property/id/simulations
    - extracts ids out the json response
    - returns array of ids for all simulations
  - getSimulationById(simulationId)
    - GET /simulation/id
    - returns json response without formatting
  - constructSimulation (json)
    - reconstructs simulation json data  
    - returns new simulation json data
  - createSimulation(json)
    - POST /web-sims
    - return simulationId
  - migrateSimulations(propertyId, domainId)
    - calls getSimulationIds(propertyId)
    - for each simulationId in the array
      - calls createSimulation(constructSimulation(getSimulationById(simulationId)))
      - pushes simulationId to array
    - returns simulationId:journeyId map/object
