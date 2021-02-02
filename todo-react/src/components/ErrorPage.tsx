import React, { Dispatch, useCallback }  from 'react';
import { useDispatch } from 'react-redux'
import { getListRequest } from '../actions/index'

const ErrorPage = () => {
  const dispatch:Dispatch<any> = useDispatch();

  const getTodoList = useCallback((): void => {
    dispatch(getListRequest());
  },[dispatch])

  return (
    <div className="error-container">
      <div className="error-wrap">
        <span className="error">Sorry, something went wrong</span>
        <button className="button"
          onClick={getTodoList}>Try again
        </button>
      </div>
    </div>
  )
}

export default ErrorPage;