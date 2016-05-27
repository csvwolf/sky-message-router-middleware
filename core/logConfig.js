/**
 * Created by SkyAo on 16/5/27.
 */
module.exports = function(path, fs, winston) {
    fs.stat(path + '/logs', function(err, data) {
        if (err) {
            fs.mkdir(path + '/logs', function(err, data) {
            });
        }
    });

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                name: 'info-log',
                filename: path + '/logs/log-info.log',
                level: 'info'
            }),
            new (winston.transports.File)({
                name: 'error-log',
                filename: path + '/logs/log-error.log',
                level: 'error'
            }),
            new (winston.transports.File)({
                name: 'warn-log',
                filename: path + '/logs/log-warn.log',
                level: 'warn'
            })
        ]
    });

    winston.handleExceptions(new (winston.transports.File)({
        filename: path+ '/logs/log-unexceptions.log'
    }));

    return logger;
};