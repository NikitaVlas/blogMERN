import Post from '../models/Post.js'
import User from '../models/User.js'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'

//Create Post
export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)

        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name // даем имя файлу
            const __dirname = dirname(fileURLToPath(import.meta.url)) //получаем путь к папке
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName)) // перемещаем картику в папку аплоадс

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage}
            })
            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post ({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithoutImage}
        })
        return res.json(newPostWithoutImage)

    } catch (error) {
        res.json({message: "Что-то пошло не так"})
    }
}