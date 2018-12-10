// statisticsCtrl.js
const path = require("path");
const log = require("npmlog");
const async = require("async");
const request = require("request");
const cloudant = require("cloudant");
const dateFormat = require("date-and-time");
const config = require("../../config.js");
const auth = require("../../auth.js");
var dateTime = require('node-datetime');

 function getListofStaffs(req,clearanceLevel, callback) {}

function getListofEvents(req) {}

exports.listevents = function (req, res) {
    log.info(path.basename(module.filename), "Staff List :: getlistevent())");
    async.waterfall([
        getListofStaffs.bind(null, req),
        getListofEvents.bind(null, req)
      ], (err, results) => {
        if (err) return next(err);
        return res.send(results);
      });
};


function getlistofStaffs(req, clearanceLevel,callback) {
    log.info(path.basename(module.clearanceLevel), "List Staffs :: getlistofStaffs()");
    var listofStaffsAPI = config.composerRestServer.url + "/queries/getStaffClearanceByStaffId?staffId=resource%3Aorg.de.eclearance.Staff%23" + req.user.staffID;
    //var listofEventsAPI = config.composerRestServer.url + "/queries/getStaffClearanceByStaffId?staffId=resource:org.de.eclearance.Staff#Hi " + "0001"; 


    const requestOptions = {
        url: listofStaffsAPI,
        json: true
    };

    request(requestOptions, function (err, res, body) {
        if (err) {
            return callback(true, null);
        } else if (res.statusCode == 200) {

            var clearancesstaff = body[0].clearanceLevel;
            var staffClearanceId = body[0].staffClearanceId;

            return callback(null, { staffClearanceId: body[0].staffClearanceId, clearancesstaff: body[0].clearanceLevel });
        }
    });
}

function getlistofEvents(req, callback) {
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d');
    console.log(formatted);
    log.info(path.basename(module.filename), "List Events :: getlistofEvents()");
    var listofEventsAPI = config.composerRestServer.url + "/queries/getAllFutureEvents?startDate=" + formatted;



    const requestOptions = {
        url: listofEventsAPI,
        json: true
    };


    request(requestOptions, function (err, res, result) {
        if (err) {
            return callback(true, null);
        } else if (res.statusCode == 200) {

            return callback(null, result);
        }
    });
}

function getlistofEvents(req, callback) {
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d ');
    console.log(formatted);
    log.info(path.basename(module.filename), "List Events :: getlistofEvents()");
    var listofEventsAPI = config.composerRestServer.url + "/queries/getAllFutureEvents?startDate=" + formatted;



    const requestOptions = {
        url: listofEventsAPI,
        json: true
    };


    request(requestOptions, function (err, res, result) {
        if (err) {
            return callback(true, null);
        } else if (res.statusCode == 200) {

            return callback(null, result);
        }
    });
}

function getPremise(req, callback) {
    log.info(path.basename(module.filename), "List Premise :: getPremise()");
    var listPremiseAPI = config.composerRestServer.url + "/Premise" + "/P001";
    const requestOptions = {
        url: listPremiseAPI,
        json: true
    };

    request(requestOptions, function (err, res, data) {
        if (err) {
            return callback(true, null);
        } else if (res.statusCode == 200) {
            var premiseentity = data.entity;
            //var premiseentit1 = premiseentity.slice(20,0);

            var premisecountry = data.country;
            var premiseaddress = data.address;

            return callback(null, { premiseentity: data.entity, premisecountry: data.country, premiseaddress: data.address });
            //return callback(null,data);
        }
    });
}

function getCountry(req, callback) {
    log.info(path.basename(module.filename), "List Country :: getCountry()");
    var listCountryAPI = config.composerRestServer.url + "/Country" + "/C001";
    const requestOptions = {
        url: listCountryAPI,
        json: true
    };

    request(requestOptions, function (err, res, result) {
        if (err) {
            return callback(true, null);
        } else if (res.statusCode == 200) {
            var countrycountryId = result.countryId;
            var countrycountryName = result.countryName;

            return callback(null, { countrycountryId: result.countryId, countrycountryName: result.countryName });
        }
    });
}

function getEntity(req, callback) {
    log.info(path.basename(module.filename), "List Entity :: getEntity()");
    var listEntityAPI = config.composerRestServer.url + "/Entity" + "/E001";
    const requestOptions = {
        url: listEntityAPI,
        json: true
    };

    request(requestOptions, function (err, res, result) {
        if (err) {
            return callback(true, null);
        } else if (res.statusCode == 200) {
            var entityentityId = result.entityId;
            var entityname = result.name;

            return callback(null, { entityentityId: result.entityId, entityname: result.name });
        }
    });
}




