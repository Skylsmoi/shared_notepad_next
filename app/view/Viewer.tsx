import {marked} from "marked";

interface ViewerProps {
  pad: string;
}

export default function Viewer(props: ViewerProps) {
  const parsedPad = marked.parse(props.pad);

  return (
    <div dangerouslySetInnerHTML={{ __html: parsedPad }} />
  )
}
