import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from 'next/head';

function MeetupDetails(props) {

    return (
        <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description}/>
        </Head>
        <MeetupDetail {...props.meetupData} />
        </>
    );
}

export async function getStaticPaths() {

    // connect to mongodb and get client
    const clinet = await MongoClient.connect('mongodb+srv://user_Next:EqfxSXhlhmd51Fyo@cluster0.f0bhh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');

    // use db
    const db = clinet.db();

    // get collection
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    clinet.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(content) {
    const meetupId = content.params.meetId;

    // connect to mongodb and get client
    const clinet = await MongoClient.connect('mongodb+srv://user_Next:EqfxSXhlhmd51Fyo@cluster0.f0bhh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');

    // use db
    const db = clinet.db();

    // get collection
    const meetupsCollection = db.collection('meetups');

    const meetup = await meetupsCollection.findOne({ _id:new ObjectId(meetupId)});
    
    clinet.close();

    return {
        props: {
            meetupData: {
                src:meetup.image,
                alt:'place img',
                title:meetup.title,
                address:meetup.address,
                description:meetup.description,
                id:meetup._id.toString()
            }
        }
    }
}

export default MeetupDetails;