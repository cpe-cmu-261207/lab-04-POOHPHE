
import React from 'react';
import Button from '@material-ui/core/Button';


export const CourseCard = (props,func) => {
  // TODO: design HTML component that displays a course as a "card" on the webpage.
  return (
    <div>
      {props.gpa}
      +
      {props.id}-
      {props.name}*
      {props.credit}/
      {props.subId}
      
      <Button
        variant="contained"
        color="secondary"
        onClick={func}
      >
        Delete
      </Button>
    </div>
  );
};
