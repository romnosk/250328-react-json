// seminarsReducer - функция-редюсер для отработки основных действий со списком семинаров в контексте React
import { FETCH_ACTIONS } from "../actions";

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const seminarsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ACTIONS.PROGRESS : {
      return {
        ...state,
        loading: true,
      }
    }
    case FETCH_ACTIONS.SUCCESS : {
      return {
        ...state,
        loading: false,
        items: action.data,
      }
    }
    case FETCH_ACTIONS.ERROR : {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case FETCH_ACTIONS.REMOVE_ITEM : {
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.id !== action.id),
      }
    }
    case FETCH_ACTIONS.UPDATE_ITEM : {
      return {
        ...state,
        loading: false,

        items: state.items.map(item => {
          if(item.id == action.updatedItem.id)
            return action.updatedItem
          return item;
        })
      }
    }
    default:{
      return state;
    }
  }
}

export {seminarsReducer, initialState};
