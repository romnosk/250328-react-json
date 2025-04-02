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
    default:{
      return state;
    }
  }
}

export {seminarsReducer, initialState};
