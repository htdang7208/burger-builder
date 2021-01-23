import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
  loadding: false,
  idToken: null,
  localId: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loadding: true, error: null });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        loadding: false,
        error: null,
        localId: action.localId,
        idToken: action.idToken,
      });
    case actionTypes.AUTH_FAILED:
      return updateObject(state, { loadding: false, error: action.error });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        loadding: false,
        idToken: null,
        localId: null,
        error: null,
      });
    default:
      return state;
  }
};

export default reducer;
