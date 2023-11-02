import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register
export const register = async (req, res) => {
    try {
        const {username, password} = req.body

        const isUsed = await User.findOne({username})
        if (isUsed) {
            return res.json({
                message: 'This username already in use'
            })
        }

        const salt = bcrypt.genSaltSync(10) //сложность хешироного пароля
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash
        })

        await newUser.save()

        res.json({
            newUser, message: 'Registration completed successfully'
        })

    } catch (error) {
        res.json({message: 'Error creating user'})
    }
}

// Login
export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.json({
                message: "This user doesn't exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({
                message: "Incorrect password"
            })
        }

        // шифруем токен
        const token = jwt.sign({
                id: user._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        res.json({
            token, user, message: "You are logged in"
        })

    } catch (error) {
        res.json({message: 'Authorisation Error '})
    }
}
//Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: "This user doesn't exist"
            })
        }

        const token = jwt.sign({
                id: user._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        res.json({
            user,
            token
        })
    } catch (error) {
        res.json({message: "No access"})
    }
}
