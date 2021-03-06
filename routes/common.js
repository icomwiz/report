function isAuthenticatedForMeasurer(req, res, next) { //측정자용 인증확인
    if ((!req.user) || (req.user.teamPosition === 0) || (req.user.teamPosition === 1) || (req.user.teamPosition === 2)) { //세션이 없거나 분석자일 때
        return res.redirect('http://localhost:3000/auth');
    }
    next();
}

function isAuthenticatedForAnalyst(req, res, next) { //분석자용 인증 확인
    if ((!req.user) || (req.user.teamPosition === 3) || (req.user.teamPosition === 4)) { //세션이 없거나 측정자일 때
        return res.redirect('http://localhost:3000/auth');
    }
    next();
}

function isAuthenticated(req, res, next) { //로그인확인
    if ((!req.user)) {
        return res.redirect('http://localhost:3000/auth');
    }
    next();
}

function isAuthenticatedForOfficer(req, res, next) { //사장님 전무님
    if ((!req.user) || (req.user.teamPosition !== 0 )) {
        return res.redirect('http://localhost:3000/auth');
    }
    next();
}

function isAuthenticatedForMeasurerManager(req, res, next) { //김경헌 과장님
    if ((!req.user) || (req.user.teamPosition !== 5 )) {
        return res.redirect('http://localhost:3000/auth');
    }
    next();
}

function isAuthenticatedForMeasurerManager_Officer(req, res, next) { //김경헌 과장님, 사장님 전무님
    if ((!req.user) || (req.user.teamPosition !== 5 ) || (req.user.teamPosition !== 0 )) {
        return res.redirect('http://localhost:3000/auth');
    }
    next();
}

function isAuthenticatedAdmin(req, res, next) { //어드민권한만!
    if (!((req.user.teamPosition === 0) || (req.user.teamPosition === 6))) {
        return res.redirect('http://localhost:3000/auth');
    }
    next();
}


module.exports.isAuthenticatedForMeasurer = isAuthenticatedForMeasurer;
module.exports.isAuthenticatedForAnalyst = isAuthenticatedForAnalyst;
module.exports.isAuthenticatedForOfficer = isAuthenticatedForOfficer;
module.exports.isAuthenticatedForMeasurerManager = isAuthenticatedForMeasurerManager;
module.exports.isAuthenticatedForMeasurerManager_Officer = isAuthenticatedForMeasurerManager_Officer;
module.exports.isAuthenticated = isAuthenticated;
module.exports.isAuthenticatedAdmin = isAuthenticatedAdmin;