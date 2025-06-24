import React from 'react';

export interface BandInfoProps {
  event: {
    name: string;
    date: Date;
    location: string;
    description_blurb: string;
    imgUrl: string;
  };
}

export default function BandInfo({ event }: BandInfoProps) {

  return (
    <section>
      <div>
        <img
          src={event.imgUrl}
          alt={event.name}
        />
      <div/>
      <div>
        <h1>{event.name}</h1>
        <div>
          <span>📅 {event.date.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}</span>
          <span>📍 {event.location}</span>
        </div>
      </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: event.description_blurb }}
      />
    </section>
  );
}
