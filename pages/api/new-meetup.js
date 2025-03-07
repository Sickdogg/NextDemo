import {MongoClient} from 'mongodb'

async function handler(req,res){
    if(req.method === 'POST'){
        const data = req.body;

        const {title, image, address, description} = data;

        // connect to mongodb and get client
        const clinet = await MongoClient.connect('mongodb+srv://user_Next:EqfxSXhlhmd51Fyo@cluster0.f0bhh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        
        // use db
        const db = clinet.db();

        // get collection
        const meetupsCollection = db.collection('meetups');

        // insert data to this collection
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        clinet.close();

        res.status(201).json({message:'new meetup inserted!'});
    }
}

export default handler