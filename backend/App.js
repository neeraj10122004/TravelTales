const express = require('express')
const mongoose = require('mongoose')
const {PORT,MONGOURL} = require('./auth')
mongoose.connect(MONGOURL)
const User = require('./models/Usermodel')
const Post = require('./models/Postmodel')
const app = express()

app.use(express.json())
app.listen(PORT,()=>{
    console.log(`listening on post ${PORT}`)
})

app.post('/', async (req,res)=>{
    const {email,name} = req.body
    try{
        let user = await User.findOne({email: email})

        if(!user){

            let user = new User({email,name})

            await user.save()

            res.send("Success")

        }
        else{
            res.send("user exists")
        }
    }
    catch{
        res.send("Server Error")
    }
    
})

app.post('/post', async (req,res)=>{
    const {placename,placerating,placelikes} = req.body
    try{
        let place = await Place.findOne({placeName:placename})

        if(!place){

            let place = new Place({ placeName:placename,placeRating:placerating,likes:placelikes})

            await place.save()

            res.send("Success")

        }
        else{
            res.send("data exists")
        }
    }
    catch{
        res.send("Server Error")
    }
    
})

app.post('/attraction', async (req,res)=>{
    const {attractionname,description,rating} = req.body
    try{
        let attraction = await Attraction.findOne({attractionName:attractionname})

        if(!attraction){

            let attraction = new Attraction({ attractionName:attractionname,description:description,rating:rating})

            await attraction.save()

            res.send("Success")

        }
        else{
            res.send("data exists")
        }
    }
    catch{
        res.send("Server Error")
    }
    
})
app.post('/food', async (req,res)=>{
    const {foodname,fooddescription,cost,rating,resturantdetails} = req.body
    try{
        let food = await Food.findOne({foodName: foodname})

        if(!food){

            let food = new Food({ foodName : foodname,foodDescription : fooddescription,cost: cost,rating : rating,resturantDetails: resturantdetails})

            await food.save()

            res.send("Success")

        }
        else{
            res.send("data exists")
        }
    }
    catch{
        res.send("Server Error")
    }
    
})
app.post('/guide', async (req,res)=>{
    const {name,experience,rating,cost} = req.body
    try{
        let guide = await Guide.findOne({guidename : name})

        if(!guide){

            let guide = new Guide({ guidename : name,experience : experience ,rating : rating,cost : cost})

            await guide.save()

            res.send("Success")

        }
        else{
            res.send("data exists")
        }
    }
    catch{
        res.send("Server Error")
    }
    
})

app.post('/transport', async (req,res)=>{
    const {description,cost,rating,owner} = req.body
    try{
        let transport = await Transport.findOne({transportDescription : description})

        if(!transport){

            let transport = new Transport({ transportDescription : description,cost : cost ,rating : rating,ownerDetails : owner})

            await transport.save()

            res.send("Success")

        }
        else{
            res.send("data exists")
        }
    }
    catch{
        res.send("Server Error")
    }
    
})



app.post('/flight', async (req, res) => {
    const { airline, departure, destination, price, departureTime, arrivalTime } = req.body;

    try {
        let flight = await Flight.findOne({ airline, departure, destination, departureTime });

        if (!flight) {
            let newFlight = new Flight({
                airline,
                departure,
                destination,
                price,
                departureTime,
                arrivalTime
            });

            await newFlight.save();
            res.send("Flight added successfully");
        } else {
            res.send("Flight already exists");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});



app.post('/hotel', async (req, res) => {
    const { name, location, rating, amenities, pricePerNight, availability } = req.body;

    try {
    
        const newHotel = new Hotel({
            name,
            location,
            rating,
            amenities,
            pricePerNight,
            availability,
        });

        
        await newHotel.save();
        res.status(201).send("Hotel added successfully");
    } catch (error) {
        console.error(error); 
        res.status(500).send("Server Error");
    }
});


app.get('/hotel', async (req, res) => {
    try {
    
        const hotel = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        console.error(error); 
        res.status(500).send("Server Error");
    }
});

app.post('/booking', async (req, res) => {
    const { userId, hotelId, checkInDate, checkOutDate, totalAmount } = req.body;

    try {
        
        const newBooking = new Booking({
            userId,
            hotelId,
            checkInDate,
            checkOutDate,
            totalAmount,
        });

        await newBooking.save();
        res.status(201).send("Booking created successfully");
    } catch (error) {
        console.error(error); 
        res.status(500).send("Server Error");
    }
});


app.get('/booking', async (req, res) => {
    try {
        
        const booking = await Booking.find().populate('userId').populate('hotelId');
        res.status(200).json(booking);
    } catch (error) {
        console.error(error); 
        res.status(500).send("Server Error");
    }
});


app.get('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('userId').populate('hotelId');
        if (!booking) {
            return res.status(404).send("Booking not found");
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error(error); 
        res.status(500).send("Server Error");
    }
});