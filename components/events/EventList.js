import EventItem from "./EventItem";
import classes from "./EventsList.module.css";

export default function EventList(props) {
  console.log(props);
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => {
        return (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            image={event.image}
            location={event.location}
          />
        );
      })}
    </ul>
  );
}
