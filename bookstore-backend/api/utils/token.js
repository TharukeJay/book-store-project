import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId,email) => {
    return jwt.sign(
        {userId: userId, email: email},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
    );
};

export const generateRefreshToken = (username, userId, email) => {
    const refreshToken = jwt.sign(
        { username: username, id: userId, email: email },
        process.env.JWT_KEY,
        { expiresIn: "7d" } // Refresh token expires in 7 days
    );

    return refreshToken;
};
