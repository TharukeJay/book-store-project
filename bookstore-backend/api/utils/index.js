import jwt from "jsonwebtoken";

export const generateOTP = () => {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
};


/**
 * Middleware to authenticate a token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

export const authenticateToken = (requiredRoles) => {
    return async (req, res, next) => {
        // Retrieve the token from the Authorization header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) {
            return res.status(401).json({ error: "Token is missing" });
        }

        // try {
            // Verify the token using the JWT_KEY
            // const user = jwt.verify(token, process.env.JWT_KEY);

            // Check if the user exists in the database
            // const foundUser = await UserModel.findById(user.id).select(
            //     userProjections.authenticateToken
            // );

            // if (!foundUser) {
            //     return res.status(401).json({ error: "User not found" });
            // }

            // Check if the user's role is in the required roles
            // if (!requiredRoles.includes(foundUser.role)) {
            //     return res.status(403).json({ error: "Access forbidden" });
            // }

            // Set the user object on the request for further processing
            // req.user = foundUser;
        //     next();
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: "Internal server error" });
        // }
    };
};

/**
 * Function to verify a token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {boolean|null} - Returns true if the token is verified, false if it's invalid, or null if no token is present.
 */
export const verifyToken = (req, res) => {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        console.log("Token is null");
        return null;
    }

    try {
        // Verify the token using the JWT_KEY
        jwt.verify(token, process.env.JWT_KEY);
        console.log("Token is verified");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

/**
 * Update the last seen timestamp for a user.
 * @param {string} userId - The ID of the user.
 */
export const updateLastSeen = async (userId) => {
    try {
        // Update the lastSeen field with the current timestamp
        // await UserModel.updateOne({ _id: userId }, { lastSeen: new Date() });
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating last seen:", error);
    }
};

export const validateRequest = (validationRules) => (req, res, next) => {
    const { params, body } = req;
    const endpoint = req.route.path;

    const requiredParams = validationRules[endpoint] || [];
    const missingParams = requiredParams.filter(
        (param) => !params[param] && !body[param]
    );

    if (missingParams.length > 0) {
        return res
            .status(400)
            .json({ error: `Missing parameters: ${missingParams.join(", ")}` });
    }

    // If all validations pass, move to the next middleware/function
    next();
};

export const generateTempPasword = (length) => {
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
};
