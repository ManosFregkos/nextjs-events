import React, { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/eventDetail/event-detail/event-summary";
import EventLogistics from "../../components/eventDetail/event-detail/event-logistics";
import EventContent from "../../components/eventDetail/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
  // const router = useRouter();
  // //sto eventId kataxwreite to query amesws meta to localhost:3000/event/[...eventId]
  // const eventId = props.selectedEvent;

  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...!</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}
//specific id that load data for context
export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}
export default EventDetailPage;
