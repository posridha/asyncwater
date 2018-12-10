

exports.listevents = function (req, res) {
    log.info(path.basename(module.filename), "Staff List :: getlistevent())");


    async.waterfall([
        getlistofStaffs.bind(null, req),
        getlistofEvents.bind(null, req),
        //getPremise.bind(null, req),
        //getCountry.bind(null, req),
        //getEntity.bind(null, req)

    ], function (err, result) {
        if (err) {

            res.status(500).send({ statusMessage: "Error occured while processing the List of Events API request." });
        } else {
            console.log(result);
            console.log("Success staff records");
            res.status(200).send(result);
        }
    });
};


function getlistofStaffs(req, callback) {
    log.info(path.basename(module.filename), "List Staffs :: getlistofStaffs()");
    var listofStaffsAPI = www.gmail.com;


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
    var listofEventsAPI = www.gmail.com;


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

