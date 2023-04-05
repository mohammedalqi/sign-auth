const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult (req)
    if(!errors.isEmpty()){
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
            })
    }
    next()
}

//inputan kosong//
exports.validationDaftar = [
    check('namaLengkap', 'Nama Lengkap tidak boleh kosong').notEmpty(),
    check('nimNidn', 'NIM atau NIDN tidak boleh kosong').notEmpty(),
    check('email', 'Email tidak boleh kosong').notEmpty() .contains('uinjkt.ac.id') .withMessage('Format email salah, gunakan email uinjkt.ac.id') .contains('@') .withMessage('Gunakan format email yang benar'),
    check('kataSandi', 'Kata sandi tidak boleh kosong').notEmpty().isLength({ min: 8 }).withMessage('Kata sandi minimal berisikan 8 karakter')
]

//login
exports.validationLogin = [
    check('email', 'Email tidak boleh kosong').notEmpty(),
    check('kataSandi', 'Kata Sandi tidak boleh kosong').notEmpty()
]

//forgotPassword
exports.validationLogin = [
    check('email', 'Email tidak boleh kosong').notEmpty(),
    check('kataSandi', 'Kata Sandi tidak boleh kosong').notEmpty()
]
