import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';
// import fs from 'fs';
import sharp from 'sharp';


const app = express();
//midlleware
app.use(bodyParser.json());

const upload = multer({dest : './images'});

const PORT = 8686;
app.listen(PORT, () => {
    console.log(`Server running on : localhost:${PORT}`);
})
//MongoDB connection
const mongoDBURL = 'mongodb://0.0.0.0:27017/imageResize';
// mongodb://localhost:27017

mongoose.connect(mongoDBURL);
mongoose.connection.on('error', (err) => console.log(err))

// Image Schema
const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});

const Image = mongoose.model('Image', imageSchema);
//routes
// app.get('/', (req, res) => {
//     console.log("Hl00");
//     res.send("Hello")
// });

app.post('/image', upload.single('image'),async (req, res) => {
    try {
        const { width, height, quality, forma } = req.query;
        let widthImg = width? parseInt(width) : 100;
        let heightImg = height? parseInt(height) : 100;
        let qualityImg = quality ? parseInt(quality) : 10;
        if(!req.file){
            return res.status(400).json({ error: 'image file is required' });
        }
        let resizeImage = sharp(req.file.path).resize({ width: widthImg, height: heightImg }).jpeg({ quality: qualityImg });

        if(forma){
            resizeImage = resizeImage.toFormat(forma);
        }
        const imageBuffer = await resizeImage.toBuffer();

        const storeImage = new Image({
            data: imageBuffer,
            contentType: `image/${forma || 'jpeg'}`
        })

        await storeImage.save();
        // res.type(`image/${forma || 'jpeg'}`).send(imageBuffer);
        return res.status(201).json({ imageUrl: `/image/${storeImage._id}` });

    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json("Error to resize image");
    }
})

app.get('/image/:id', async (req, res) => {
    try {
        const result = await Image.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.set('Content-Type', result.contentType);
        res.send(result.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error while fetching the image' });
    }
});

// app.post('/upload', upload.single("avatar"),async (req, res) => {
//     try {
//         await fs.rename(req.file.path, './images/avatar.jpg', (err) => {
//             if(err) console.error("Error renaming file:", err);
//             console.log("File renamed successfully");
//         });
//         await sharp('./images/avatar.jpg').resize(200,200)
//         .jpeg({quality : 50}).toFile('./images/avatar_thumb.jpg');
    
//         return res.json("File upload successful ");
//     } catch (error) {
//         console.log("error in catch: ", error);
//         return res.status(500).json("Error to upload");
//     }
// });
