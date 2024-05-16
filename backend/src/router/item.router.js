const express = require('express');
const { PrismaClient } = require("@prisma/client")
const router = express.Router();
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../testing/public/uploads')
      // cb(null, '../assets');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });
  
router.post('/items', upload.fields([{name: 'image' , maxCount: 1}, {name: 'imagevariant', maxCount: 1}, {name :'imagebackground', maxCount: 1}]), async (req, res, next) => {
    try {
        const { name, variant, description } = req.body;
        const image = req.files['image'][0].filename; 
        const imagevariant = req.files['imagevariant'] ? req.files['imagevariant'][0].filename : null;
        const imagebackground = req.files['imagebackground'][0].filename;

        const item = await prisma.Items.create({ 
            data: {
                name,
                variant,
                imagevariant,
                imagebackground,
                description,
                image
            }
        });

     

        res.status(201).json({ 
            message: 'Item created successfully',
            data: item
        });
    } catch (error) {
        console.error('Failed to create item: ', error);
        res.status(500).json({ message: 'Failed to create item' });
    }
});

router.get('/items', async (req, res) => {
    try {
        const items = await prisma.Items.findMany();
        res.status(200).json({ data: items });
    } catch (error) {
        console.error('Failed to fetch items: ', error);
        res.status(500).json({ message: 'Failed to fetch items' });
    }
});

router.delete('/items/:id' , async (req, res) => {
    try {
        const {id} = req.params;
        const items = await prisma.Items.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Failed to delete item: ', error);
        res.status(500).json({ message: 'Failed to delete item' });
    }
});


// router.get('/items/:id', async (req, res) => {
//     const { name } = req.params;
  
//     try {
//       const items = await prisma.items.findFirst({
//         where: {
//           name: name
//         }
//       });
//       res.status(200).json({ data: items });
//     } catch (error) {
//       console.error('Failed to fetch items: ', error);
//       res.status(500).json({ message: 'Failed to fetch items' });
//     }
//   });

  router.get('/items/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const item = await prisma.items.findMany({
            where: {
                name: name
            }
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ data: item });
    } catch (error) {
        console.error('Failed to fetch item: ', error);
        res.status(500).json({ message: 'Failed to fetch item' });
    }
});

  
  
  router.put('/items/:id', upload.single('image'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;
        const image = req.file ? req.file.filename : null; // Nama file gambar yang diunggah

        const item = await prisma.Items.update({ 
            where: { id: parseInt(id) },
            data: {
                name,
                price, 
                description,
                image
            }
        });

        res.status(200).json({ 
            message: 'Item updated successfully',
            data: item
        });
    } catch (error) {
        console.error('Failed to update item: ', error);
        res.status(500).json({ message: 'Failed to update item' });
    }
});

module.exports = router;

