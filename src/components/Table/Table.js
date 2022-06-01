
import './Table.css';
import Tile from '../Tile/Tile.js';
import Gameover from '../Gameover/Gameover.js';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Table(){
  const table = useSelector(state => state.pairReducer.table); 
  const roundsCounter = useSelector(state=> state.roundsReducer.rounds);
  const win = useSelector(state=>state.roundsReducer.win);
  const failed = useSelector(state=>state.roundsReducer.failedRounds);
  const success = useSelector(state=>state.roundsReducer.successRounds);

  const [result, setResult] = React.useState('');

  const dispatch = useDispatch();
  const [isPairSelected, setIsPairSelected] = React.useState(false);
  const [pair, setPair] = React.useState([]);

  function restart(){
    dispatch({type: 'FULL_RESET'});
    dispatch({type: 'HIDE_WIN'});
    dispatch({type: 'RESET_ROUND'});
  }
  function core(){
    if(isPairSelected){                
        setTimeout(()=>{
        if(isFound()){
          dispatch({type:'IS_FOUND', payload: pair}); 
          dispatch({type:'INC_SUCCESS'});                                    
        } else {
          dispatch({type:'INC_FAIL'}); 
        }
        dispatch({type:'NEXT_ROUND'});
        setPair([]);
        setIsPairSelected(false);       
        dispatch({type:'RESET'});                            
      },500)     
    }
  }
  async function hanldeCore(){
    try{
      await core();  
      if(failed > 7){       
        dispatch({type:'SHOW_WIN'});                 
      }     
      if(await isWin()){        
        dispatch({type:'SHOW_WIN'});
      }
    } catch(e){

    }
  }
  React.useEffect(()=>{
    hanldeCore();
  },[isPairSelected]);

 function uncover(i){  
    if(!isPairSelected){
      dispatch({type: 'UNCOVER', payload : i});
      if(!table[i].isFound&&!table[i].isUncovered){
        setPair([...pair, table[i].value]);   
        checkPair();  
      }            
    }    
  };

  function checkPair(){   
     if(pair.length>=1){
      setIsPairSelected(true);
     }       
  };

  function isFound(){
   return pair[0] === pair[1];
  };
  async function isWin(){  
    if(failed > success){
      setResult('YOU LOST');
    } else 
      setResult('YOU WON!');
    return table.filter(tile=>{
      return tile.isFound === false;
    }).length === 0;
  }
  return (
    <div className='main container'>
      <h1 className="title">
        Find the pair (test task)
      </h1>
      <div className='table'>
        { table.map((tile, i) => {        
            return (
              <Tile key={i} tile={tile.value} isUncovered={tile.isUncovered} index = {i} handleClick={()=>{
                uncover(i)
              }
            }/>
            );               
          })
        }
      </div>
      <div className="table__game-info">
          <p className="table__rounds-counter">
            Round: {roundsCounter}
          </p>
            <p className="table__failed">
              Fails: {failed}
            </p>  
            <button className='table__button' onClick={restart}>Restart</button>
            <p className="table__success">
              Nice! {success}
            </p>
      </div>
      {win && <Gameover handleClick={restart} text={result}/>}     
    </div>
  );
}