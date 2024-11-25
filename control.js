// Description: This file contains the logic to check the mode of the device and change the mode of the device.

const { MongoClient } = require('mongodb');
require('dotenv').config();
const dbURI = process.env.MONGO_URI;

// Connect to MongoDB
const client = new MongoClient(dbURI);

const checkmode = async (req, res) => {
    try {
        // Log the entire request body { HardwareID: 'EF-001' } 
        console.log('Received request body:', req.body);
        // Check the mode of the device
        // read json request body
        const { HardwareID } = req.body;

        // connect to MongoDB
        await client.connect();
        const db = client.db("frontier");
        if (!db) {
            console.error("Database not found");
            return;
        } else if (db) {
            console.log("Connected to MongoDB");
            const collection = db.collection("sessions_log");
            if (!collection) {
                console.error("Collection not found");
                return;
            } else if (collection) {
                console.log("Collection found");
                collection.findOne({ HardwareID: HardwareID });
                if (collection) {
                    const device = await collection.findOne({ HardwareID: HardwareID }, { projection: { _id: 0 } });
                    if (device) {
                        console.log("Device found");
                        res.status(200).send(device);
                    } else {
                        console.log("Device not found");
                        res.status(404).send('Device not found');
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

//*[DONE]* 2. Add a new endpoint to register the device
//TODO: Add a activity log to the database
const registerDevice = async (req, res) => {
    try {
        // Function to generate a new HardwareID
        random = Math.floor(Math.random() * 1000) + 1;
        console.log(random);
        function generateHardwareID(random) {
            const prefix = "EF-";
            return prefix + random.toString().padStart(3, "0");
        }
        // Usage example
        const newID = generateHardwareID(random);
        console.log(newID); // Output: EF-xxx

        const newHardwareID = { HardwareID: newID }; // Generate a new HardwareID format 001 002 or 010
        console.log(newHardwareID);

        // connect to MongoDB
        await client.connect();
        const db = client.db("frontier");
        if (!db) {
            console.error("Database not found");
            return;
        } else if (db) {

            console.log("Connected to MongoDB");


            const collection = db.collection("sessions_log");

            if (!collection) {
                console.error("Collection not found");
                return;
            } else if (collection) {
                console.log("Collection found");
            }

            // Perform the findOne query
            const existingDevice = await collection.findOne({ HardwareID: newID });

            if (existingDevice) {
                console.log("[SYSTEM]: HardwareID already exists");
                res.status(400).send('[SYSTEM]: Device registered');
                client.close();
            } else if (!existingDevice) {
                console.log("[SYSTEM]: registering device");
                await collection.insertOne(newHardwareID);
                res.status(200).send({ HardwareID: newID });
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send('Internal Server Error');
    }
};

const changeMode = async (req, res) => {
    try {
        // Log the entire request body to debug the issue
        console.log('Received request body:', req.body);
        res.send('Received request body');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { checkmode, changeMode, registerDevice };