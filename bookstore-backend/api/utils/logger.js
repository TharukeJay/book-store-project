import winston from "winston";

// Configure the logger
export const loggerMiddleware = winston.createLogger({
    // level: "debug", // or 'error'
    // level: "info",
    level: "silly",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
        )
    ),
    transports: [new winston.transports.Console()],
});

export const logger = (req, res, next) => {
    const { method, originalUrl, headers, ip, body } = req;

    loggerMiddleware.info(`${method} ${originalUrl}`, {
        headers,
        ip,
        body,
    });

    loggerMiddleware.debug(`${method} ${originalUrl} - Request received`, {
        headers,
        ip,
        body,
    });

    res.on("finish", () => {
        loggerMiddleware.info(
            `${method} ${originalUrl} - Response sent with status code ${res.statusCode}`,
            {
                headers,
                ip,
                body,
            }
        );
    });

    res.on("error", (err) => {
        loggerMiddleware.error(`${method} ${originalUrl} - Request failed`, {
            headers,
            ip,
            body,
            error: err, // Include the error object in the log
        });

        // Handle the error and send an appropriate response to the client
        res.status(500).send("Internal Server Error");
    });

    next();
};
