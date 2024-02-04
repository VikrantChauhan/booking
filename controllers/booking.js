
var Booking = require("./../models/booking");
var Seats = require("./../models/seats");

exports.getAllBuses = async (req, res) => {
    try{
        let { id, booked,number } = req.query;
        let query = [
            { "$match": {} },
            { "$sort": { "createdAt": 1 } },
            {
                 "$lookup": {
                    from: "users",
                    let: { user_id: "$user" },    
                    pipeline : [
                        { $match: { $expr: { $eq: [ "$_id", "$$user_id" ] } }, },
                        { $project : { name:1,email:1,role:1 } },
                    ],
                    as: "user"
                }
            },
            { "$group": { 
                "_id": "$bus",
                "seats":{ $push: "$$ROOT" },
                "count": { $sum: 1}
            }}
        ];
        if(id){
            query[0]["$match"]["bus"] = id;
        }
        if(booked){
            query[0]["$match"]["booked"]= (booked == 'true');
        }
        if(number){
            query[0]["$match"]["number"] = number;
        }
        let busData = await Seats.aggregate(query)
        res.status(200).send({
            success: true,
            message: "Bus Data",
            data: busData
        })
        
    }catch(err) {
        console.log("err", err)
        res.status(417).send({
            success: false,
            message: err
        })
    }
}

exports.bookSeat = async (req, res) => {
    try{
        let { id } = req.params;
        let { number, booked } = req.body;
        if(id && number){
            let status = await Seats.updateOne({
                bus: id,
                number,
                booked: !booked
            },{
                booked,
                user: req.user._id
            });
            if(status.modifiedCount > 0){
                res.status(200).send({
                    success: true,
                    message: "Seat Booked"
                })
            }
            else{
                res.status(200).send({
                    success: true,
                    message: "Seat not available or already booked"
                }) 
            }
           
        }
        else{
            throw Error("Data not provided")
        }
    }catch(err) {
        res.status(417).send({
            success: false,
            message: err
        })
    }
}

exports.resetAllSeats = async (req, res) => {
    try{
        let { id } = req.params;
        if(id){
            let status = await Seats.updateMany({
                bus: id
            },{
                booked : false,
                user: null
            });
            if(status.modifiedCount > 0){
                res.status(200).send({
                    success: true,
                    message: "Seat Reset"
                })
            }
            else{
                res.status(200).send({
                    success: true,
                    message: "No Data Found"
                }) 
            }
           
        }
        else{
            throw Error("Data not provided")
        }
    }catch(err) {
        res.status(417).send({
            success: false,
            message: err
        })
    }
}

const addSeats = async (seats,busId) =>{
    try{
        let seatsArray = [];
        [...Array(seats)].forEach(( _, index) => {
            console.log('do something');
            seatsArray.push({
                number: index+1,
                bus: busId
            })
        })
        await Seats.create(seatsArray);
        return seatsArray;
    }catch(err){
        throw Error(err);
    }
  
  };

exports.bookBus = async (req, res) => {
    try{
        let { name, seats, type } = req.body;
        var new_bus = new Booking({
           name,
           seats,
           type
        })
        let result = await new_bus.save();
        if(result && result._id){
            await addSeats(seats,result._id);
            res.status(201).send({
                success: true,
                message: "Bus Registered"
            })
        }
    }catch(err) {
        res.status(417).send({
            success: false,
            message: err
        })
    }
};