import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = (props: Props) => {
  return (
    <textarea {...props} className={`rounded resize-none ${props.className}`}>
      {props.children ?? props.value}
    </textarea>
  );
};

export default Textarea;
