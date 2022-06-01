import React from "react";
import './Gameover.css';
export default function Gameover(props){
  const [text, setText] = React.useState(props.text);

  React.useEffect(()=>{
    setText(props.text);
  },[text])
  function handleClick(){
    props.handleClick();
  }
  return(
    <div className="gameover" onClick={handleClick}>
      <h2 className="gameover__title">
        {text}
      </h2>
    </div>
  )
}