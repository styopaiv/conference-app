import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import { addEventToPerson, peopleListSelector } from '../../ducks/people';

class EventCard extends Component {
  render() {
    const { connectDropTarget, hovered, canDrop, people } = this.props;
    const { title, when, where } = this.props.event;

    const dropStyle = {
      border: `2px solid ${canDrop ? '#b4c6b6' : 'black'}`,
      marginBottom: '5px',
      padding: '5px',
      backgroundColor: hovered ? 'grey' : '#c6bce5',
    };

    const peopleElement = people && <p>{people.map(person => person.email).join(', ')}</p>;

    return connectDropTarget(
      <div style={{ ...this.props.style, ...dropStyle }}>
        <h3>{title}</h3>
        <p>
          {where}, {when}
        </p>
        {peopleElement}
      </div>,
    );
  }
}

const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid;
    const eventUid = props.event.uid;

    props.addEventToPerson(eventUid, personUid);

    return { eventUid };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver(),
});

export default connect(
  (state, props) => ({
    people: peopleListSelector(state).filter(
      person => person.events && person.events.includes(props.event.uid),
    ),
  }),
  { addEventToPerson },
)(DropTarget(['person'], spec, collect)(EventCard));
