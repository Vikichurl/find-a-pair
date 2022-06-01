

const defaultState = { 
 table: [{value:1, isUncovered: false, isFound:false},
  {value:2, isUncovered:false, isFound:false}, 
  {value:3, isUncovered:false, isFound:false},
  {value:4, isUncovered:false, isFound:false},
  {value:3, isUncovered:false, isFound:false},
  {value:2, isUncovered:false, isFound:false},
  {value:4, isUncovered:false, isFound:false},
  {value:1, isUncovered:false, isFound:false},
  {value:5, isUncovered:false, isFound:false},
  {value:7, isUncovered:false, isFound:false},
  {value:8, isUncovered:false, isFound:false},
  {value:6, isUncovered:false, isFound:false},
  {value:6, isUncovered:false, isFound:false},
  {value:8, isUncovered:false, isFound:false},
  {value:5, isUncovered:false, isFound:false},
  {value:7, isUncovered:false, isFound:false}],    
}
export const pairReducer = (state = defaultState, action) => {
  switch(action.type){   
    case 'UNCOVER':
      return {...state, table: state.table.map((tile, index)=>{    
        return index === action.payload ? {
          ...tile, isUncovered: true
        } : tile
      })}       
    case 'RESET' :    
       return {...state, table: state.table.map((tile)=>{
          return tile.isUncovered&&!tile.isFound ? {...tile, isUncovered: false} : tile
       }),}    
    case 'IS_FOUND':
        return {...state, table: state.table.map(tile=>{             
           return tile.value===action.payload[0] ? {...tile, isFound: true} : tile
          })
        }
    case 'FULL_RESET':
      return {...state, table: state.table.map(tile=>{
        return {...tile, isFound: false, isUncovered: false }
      })}           
    default: 
       return state;
  }
}

