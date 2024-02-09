require("dotenv").config();
const { dataBase } = require("../../../config/config.js");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../../../modules/admin/validator/loginSchema.js");
const { changePasswordSchema } = require("../../../modules/admin/validator/changePasswordSchema.js");
const { validateRequest } = require("../../../common/validation.js");
// const { successResponseHandler, errorResponseHandler } = require("../../../common/response.handler")
const login = async (req, res) => {
    const { email, password } = validateRequest(req.body, loginSchema);
    // const user = { email, password };

    dataBase.query(
        "SELECT * FROM admin WHERE email = '" +
        email +
        "' AND password = '" +
        password +
        "'", (err, data) => {
            if (err) {

                res.status(500).json({
                    success: false,
                    data: null,
                    error: 'Internal Server Error',
                });

            } else {

                if (data.length !== 0) {


                    // res.status(200).json({
                    //     success: true,
                    //     data: data,
                    //     error: null,
                    // });
                    const admin = data[0];
                    const token = jwt.sign({ email: admin.email, name: admin.name, id: admin.id, role: admin.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

                    res.status(200).json({
                        success: true,
                        data: {
                            // email: admin.email,
                            // name: admin.name,
                            token: token,
                        },
                        error: null,
                    });




                } else {
                    return res.status(401).send("invaliad credentials!");
                }
            }
        }
    );
};


// const chaangePassword = async (req, res) => {




// }

const changePassword = async (req, res) => {
    // const { id } = req.user;
    const { currentPassword, newPassword } = validateRequest(req.body, changePasswordSchema);

    dataBase.query(
        "SELECT * FROM admin WHERE id = ? AND password = ?",
        [id, currentPassword],
        async (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    data: null,
                    error: 'Internal Server Error',
                });
            }

            if (data.length !== 0) {
                // Old password is correct, update the password
                dataBase.query(
                    "UPDATE admin SET password = ? WHERE id = ?",
                    [newPassword, id],
                    (updateErr) => {
                        if (updateErr) {
                            return res.status(500).json({
                                success: false,
                                data: null,
                                error: 'Internal Server Error',
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            data: null,
                            error: null,
                            message: 'Password changed successfully!',
                        });
                    }
                );
            } else {
                return res.status(401).json({
                    success: false,
                    data: null,
                    error: 'Invalid Credentials!',
                });
            }
        }
    );





};





module.exports = { login, changePassword };


