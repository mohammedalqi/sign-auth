require('dotenv').config();
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { kirimEmail } = require('../helpers');

exports.DaftarUser = async (req,res) =>{
    const {namaLengkap, nimNidn, email, kataSandi} = req.body;

    const usernameuser = await User.findOne({namaLengkap: namaLengkap})
    const nimNidnUser = await User.findOne({nimNidn: nimNidn})
    const emailUser = await User.findOne({email: email})
        
        if(usernameuser){
            return res.status (404).json({
                status: false,
                message: 'Nama Lengkap sudah terdaftar'
            })
        }
        if(nimNidnUser){
            return res.status (404).json({
                status: false,
                message: 'NIM atau NIDN sudah terdaftar'
            })
        }
        if(emailUser){
            return res.status (404).json({
                status: false,
                message: 'Email sudah terdaftar'
            })
        }

        const hashPassword = await bcryptjs.hash(kataSandi, 8)
        const user = new User ( {
                namaLengkap: namaLengkap,
                nimNidn: nimNidn,
                email: email,
                kataSandi: hashPassword
        })

        user.save();

        return res.status(201).json({
            status: false,
            message: 'User Berhasil Didaftarkan'      
        })
}

exports.LoginUser = async (req,res) =>{
    const{ email, kataSandi } = req.body

    const dataUser = await User.findOne({email: email})
    if(dataUser){
         
         
         const passwordUser = await bcryptjs.compare(kataSandi, dataUser.kataSandi)
         if(passwordUser){

            const data = {
                    id: dataUser._id
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            return res.status(200).json({
                    message: 'berhasil',
                    token: token
            })
         } else {
            return res.status(400).json({
                    status: false,
                    message: 'Password Salah',
            })
         }

    } else {
            return res.status(404).json({
                    status: false,
                    message: 'User tidak ditemukan',
                    
            })

    }
    
}

exports. getSingleUser = async (req,res) => {
    const user = await User.findOne({_id: req.id})
    return res.status(200).json({
        message:'berhasil dipanggil',
        data: user
    })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(200).json({
            status: false,
            message: 'Email tidak tersedia'
        })
    }

    const token = jsonwebtoken.sign({
        iduser: user._id
    }, process.env.JWT_SECRET)

    await user.updateOne({resetPasswordLink: token})

    const templateEmail = {
        from: 'SIgn System',
        to: email,
        subject: 'Atur Ulang Kata Sandi Anda!',
        html: `<p>Silakan klik tautan di bawah untuk mengatur ulang kata sandi Anda.</p> <p>http://localhost:3000/resetpassword/${token}</p>`
    }
    kirimEmail(templateEmail);
    return res.status(200).json({
        status: true,
        message: 'Tautan reset kata sandi berhasil terkirim'
    })
}

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body
    const user = await User.findOne({resetPasswordLink: token})
    if(user) {
        const hashPassword = await bcryptjs.hash(password, 10)
        user.password = hashPassword
        await user.save()
        return res.status(201).json({
            status: true,
            message: "Kata sandi berhasil diganti"
        })
    }
}
