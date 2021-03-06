/**
 * Created by pil on 2016-11-02.
 */
var Detail = require('../models/detail');
var express = require('express');
var router = express.Router();
var isAuthenticatedForMeasurer = require('./common').isAuthenticatedForMeasurer;

/* GET users listing. */
router.get('/', isAuthenticatedForMeasurer, function(req, res, next) {
    var report_id = req.query.Report;
    var user_id = req.user.id;
    Detail.detailsList(report_id, function(err, result) {
        var team_name = "";
        if (err) {
            return next(err);
        }
        Detail.baseDetail(report_id, user_id, function(err, baseResult) {
            if (err) {
                return next(err);
            }
            if(!result[0]) {
                teamname = null;
            } else {
                team_name = result[0].team_name+"/"+date();
            }
            res.render('detail', {
                title: team_name,
                id : req.query.Report,
                detail : result,
                base : baseResult
            });
        });
    });

    function date(){
        var date = new Date();
        var year  = date.getFullYear();
        var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
        var day   = date.getDate();
        if(month < 10) {
            month = "0"+month;
        }
        if(day < 10) {
            day = "0"+day
        }
        return year +'년'+month+'월'+day+'일';
    }
});

router.post('/', isAuthenticatedForMeasurer, function(req, res, next) {
    var addInfo = req.body;
    Detail.addDetail(addInfo, function(err, result) {
        if (err) {
            return next(err);
        }
        res.send({
            result : "ok"
        });
    });
});

router.delete('/:id', isAuthenticatedForMeasurer, function(req, res, next) {
    var detail_id = req.params.id;
    Detail.deleteDetail(detail_id, function(err, result) {
        if (err) {
            return next(err);
        }
        res.send({
            result : 'ok'
        });
    });
});

router.get('/:id', isAuthenticatedForMeasurer, function(req, res, next) {
    var detail_id = req.params.id;
    Detail.updateDetailSelect(detail_id, function(err, result) {
        if (err) {
            return next(err);
        }
        res.send({
            result : result
        });
    });
});

router.put('/:id', isAuthenticatedForMeasurer, function(req, res, next) {
    var info = req.body;
    Detail.updateDetail(info, function(err, result) {
        if (err) {
            return next(err);
        }
        res.send({
            result : 'ok'
        });
    });
});
module.exports = router;