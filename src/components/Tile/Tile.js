
import React from "react";

import './Tile.css';
import img1 from '../../assets/images/1.jpg';
import img2 from '../../assets/images/2.jpg';
import img3 from '../../assets/images/3.jpg';
import img4 from '../../assets/images/4.jpg';
import img5 from '../../assets/images/5.jpg';
import img6 from '../../assets/images/6.jpg';
import img7 from '../../assets/images/7.jpg';
import img8 from '../../assets/images/8.jpg';
import { useSelector } from "react-redux";

export default function Tile(props){
  const isUncovered = useSelector(state=> state.pairReducer.table[props.index].isUncovered);
  const isFound = useSelector(state=>state.pairReducer.table[props.index].isFound);
  function handleClick(){
    props.handleClick();   
  }
  return(
    <div className={`tile ${isFound && 'tile_hide'}`}  onClick={handleClick} >
      <div className={`tile__cover ${ isUncovered && 'tile__cover_hide'}`}></div>
      <img src={
        props.tile===1 ? img1:
        props.tile===2 ? img2:
        props.tile===3 ? img3:
        props.tile===4 ? img4:
        props.tile===5 ? img5:
        props.tile===6 ? img6:
        props.tile===7 ? img7:
        img8         
      }
      alt={props.tile.value} 
      className='tile__img'/>
    </div>
  );
}