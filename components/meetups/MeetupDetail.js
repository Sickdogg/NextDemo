import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
    return (
        <section id={props.id} className={classes.detail}>
            <img src={props.src} alt={props.alt} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
}

export default MeetupDetail;