const { default: mongoose } = require("mongoose");
require('dotenv').config()

mongoose.set('strictQuery',false)


const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{family:4})
        console.log(`Mongo DB connected :${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
    
}

module.exports = connectDB;



// if(process.argv.length===3)

// Person.find({}).then(res=>{
//     res.forEach(person=>
//     console.log(person));
//     mongoose.connection.close()
    
// })


// if(process.argv.length>3){
//     let name = process.argv[3];
//     let number = process.argv[4];
//     const person = new Person({
//     name : name,
//     number:number
// })



// person.save().then(()=>{
//     console.log("person saved");
//     mongoose.connection.close()
    
// })
// }