const express = require('express');
const { PrismaClient } = require("@prisma/client")
const router = express.Router();
const prisma = new PrismaClient();

router.post('/variant', async (req, res) => {
    const { gameName, price, point } = req.body;
    try {
        // Temukan Item yang sesuai berdasarkan nama game
        const item = await prisma.items.findUnique({
            where: {
                name: gameName
            }
        });

        if (!item) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Buat ItemVariant menggunakan Item yang ditemukan
        const itemVariant = await prisma.itemVariant.create({
            data: {
                point: parseInt(point),
                price: parseInt(price),
                item: {
                    connect: {
                        id: item.id
                    }
                }
            }
        });

        res.status(201).json({
            message: 'Item variant created successfully',
            data: itemVariant
        });
    } catch (error) {
        console.error('Failed to create item variant: ', error);
        res.status(500).json({ message: 'Failed to create item variant' });
    }
});

router.get('/variant/:itemName', async (req, res) => {
    const { itemName } = req.params;
    try {
        const variants = await prisma.itemVariant.findMany({
            where: {
                itemName: itemName
            }
        });

        res.status(200).json({
            message: 'Variants fetched successfully',
            data: variants
        });
    } catch (error) {
        console.error('Failed to fetch variants: ', error);
        res.status(500).json({ message: 'Failed to fetch variants' });
    }
});


router.delete('/variant/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        const items = await prisma.itemVariant.delete({ 
            where : { id : parseInt(id)}
        });
    } catch (e) { 
        console.e('Failed to delete ItemVariants' , e);
         res.status(500).json ({ message:'Failed to delete itemVariant'})  
    }
})
module.exports = router;


