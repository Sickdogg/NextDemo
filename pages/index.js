import {MongoClient} from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {

    return (
        <MeetupList meetups={props.meetup} />
    );
}

// export async function getServerSideProps(content){
// const req = content.req;
// const res = content.res;
// console.log(content);

// return {
//     props:{
//         meetup:DUMMY_MEETUPS
//     }
// }

// }

export async function getStaticProps(){

    // connect to mongodb and get client
    const clinet = await MongoClient.connect('mongodb+srv://user_Next:EqfxSXhlhmd51Fyo@cluster0.f0bhh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        
    // use db
    const db = clinet.db();

    // get collection
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    clinet.close();

    return {
        props:{
            meetup:meetups.map(meetup => (
                {
                    title:meetup.title,
                    image:meetup.image,
                    address:meetup.address,
                    id:meetup._id.toString()
                }
            )),
            revalidate:1000,
        }
    };
}

export default HomePage;