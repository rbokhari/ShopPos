import dayApi from '../api/dayApi';
import * as types from './types';

// Days's Actions
export function updateDaySuccess( day ) {
    return {
        type: types.UPDATE_DAY_SUCCESS,
        payload: day.data
    };
}

export function createDaySuccess( day ) {
    return {
        type: types.CREATE_DAY_SUCCESS,
        payload: day.data
    };
}

export function loadOpenDaySuccess( day ) {
    return { 
        type: types.LOAD_OPEN_DAY_SUCCESS,
        payload: day.data
    };
}

export function loadCloseDaySuccess() {
    return {
        type: types.UPDATE_CLOSE_DAY_SUCCESS,
        payload: { _id: '0', today: ''}
    };
}

export function loadOpenDay() {
    return function( dispatch ) {
        //dispatch( beginAjaxCall() );
        return dayApi.openDay().then( day => {
                if (day.data !== null) {
                    localStorage.setItem('dayId', day.data._id);
                }
                dispatch(loadOpenDaySuccess( day ) );
            }
        ).catch( error => {
            console.error( error );
            throw(error);
        });
    };
}

export function loadCloseDay() {
    return function( dispatch ) {
        return dayApi.closeDay()
            .then( res => {
                if (res.status == 200) {
                    localStorage.removeItem('dayId');
                    dispatch(loadCloseDaySuccess() );
                }
            }).catch( error => {
                throw(error);
            });
    };
}

export function createDay() {  // this becomes action to send to reducer
    return function( dispatch, getState ) {
        //dispatch( beginAjaxCall() );
        return dayApi.createDay().then( day => {
            localStorage.setItem('dayId', day.data._id);
            dispatch(createDaySuccess(day));
        }).catch( error => {
            throw( error );
        });
    };
}

export function loadDays() {
    return function(dispatch) {
        return dayApi.getAllDays()
            .then( res => {
                dispatch( {
                    type: types.LOAD_DAY_SUCCESS,
                    payload: res.data
                });
            }).catch( error => {
                throw (error);
            });
    };
}

export function loadDayById(id) {
    return function(dispatch) {
        return dayApi.getDayById(id)
            .then( res => {
                dispatch({
                    type: types.LOAD_SINGLE_DAY_SUCCESS,
                    payload: res.data
                });
            }).catch (error => {
                throw(error);
            });
    };
}

export function printDay(id) {
    return function(dispatch) {
        return dayApi.printDay(id);
    };
}