import { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = (props: Props) => {
  return (
    <textarea {...props} className={`rounded resize-none ${props.className}`}>
      {props.children ?? props.value}
    </textarea>
  );
};

export default Textarea;
