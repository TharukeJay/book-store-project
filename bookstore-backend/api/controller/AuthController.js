import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    generateTempPasword,
    updateLastSeen,
    verifyToken,
} from "../utils/index.js";
import { generateRefreshToken, generateToken } from "../utils/token.js";
import  { readLankaFirebaseAppData } from "../utils/firebaseInit.js"

// Register new user
export const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // req.body.password = hashedPass;
    const { username, email } = req.body;

    const userData = {
        email: email,
        username: email,
        password: hashedPass,
        createdAt: Date.now(),
        userRoles: [ "ADMIN", "USER" ],
    };

    try {
        // checking if username is taken


        // checking if email is taken

        // Generate the initial access token
        const token = jwt.sign(
            {
                username: email,
                email: email,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        // Generate a refresh token
        const refreshToken = generateRefreshToken(
            email
        );

        // Associate the refresh token with the user
        // newUser.refreshToken = refreshToken;

        // Save the user
        await readLankaFirebaseAppData.readLankaDB.collection("users").doc().set(userData)

        res.status(200).json({ user: userData, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Refresh access token
// export const refreshToken = async (req, res) => {
//     const { refreshToken } = req.body;
//
//     try {
//         // Verify the refresh token
//         // Retrieve the user associated with the refresh token
//         const user = await UserModel.findOne({ refreshToken });
//
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//
//         // Generate a new access token
//         const newToken = jwt.sign(
//             { username: user.username, id: user._id, email: user.email },
//             process.env.JWT_KEY,
//             { expiresIn: "1h" }
//         );
//
//         res.status(200).json({ token: newToken });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const username = email;

    try {


        console.log("user");


    } catch (err) {
        res.status(500).json(err);
    }
};

export const requestForPasswordResetLink = async (req, res) => {
    const { email } = req.body;
    try {
        // Find the user by email



        // Generate a reset token and set its expiration date
        // const token = generateToken(user.username, user._id, user.email);
        const expirationDate = new Date(Date.now() + 3600000); // Token expires in 1 hour

        // Save the token and expiration date in the UserModel

        // Create the reset link with the token
        const resetLink = `${process.env.DOMAIN_URL}/reset-password/}`;

        console.log(resetLink);

        // TODO
        // Send the password reset email to the user
        // await sendPasswordResetEmail(user.email, resetLink, 60);

        res.status(200).json({
            message: "Password reset link sent successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", success: false });
    }
};

// export const handlePasswordResetConfirm = async (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;
//
//     try {
//         // Find the user by the reset token
//         const user = await UserModel.findOne({
//             resetPasswordToken: token,
//             resetPasswordTokenExpiration: { $gt: new Date() },
//         });
//
//         // TODO - future enhancements
//         // decode the resetPasswordToken and compare the data from it with the user object
//
//         if (!user) {
//             return res
//                 .status(404)
//                 .json({ error: "Invalid or expired token", success: false });
//         }
//
//         // Generate a new hashed password
//         const salt = await bcrypt.genSalt(10);
//         // const saltRounds = 10; // Adjust the number of salt rounds based on your requirements
//         const newHashedPassword = await bcrypt.hash(newPassword, salt);
//         // Update the user's password
//         user.password = newHashedPassword;
//         // Reset the token fields
//         user.resetPasswordToken = null;
//         user.resetPasswordTokenExpiration = null;
//         // Save the updated user
//         await user.save();
//
//         res
//             .status(200)
//             .json({ message: "Password reset successful", success: true });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error", success: false });
//     }
// };

export const handleTokenVerification = async (req, res) => {
    try {
        const isTokenVerified = verifyToken(req);
        res
            .status(200)
            .json({ message: "Token Verification", success: isTokenVerified });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Token Verification Failed", success: false });
    }
};


