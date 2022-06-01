const defaultState = {
  rounds: 1,
  failedRounds:0,
  successRounds:0,
  win: false,
}
export const roundsReducer = (state= defaultState, action)=>{
  switch(action.type){
    case 'NEXT_ROUND':
      return {...state, rounds : state.rounds+=1} 
    case 'INC_FAIL':
      return {...state, failedRounds: state.failedRounds+=1}  
    case 'INC_SUCCESS':
      return {...state, successRounds: state.successRounds+=1}  
    case 'RESET_ROUND':
      return {...state, rounds: 1, failedRounds:0, successRounds:0}  
    case 'SHOW_WIN':
      return {...state, win: state.win = true }     
    case 'HIDE_WIN':
        return {...state, win: state.win = false }     
    default:
      return state;
  }
}