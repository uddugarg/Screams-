import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {
                    if (reload) {
                        props.history.push('/')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/home')
                    } else {
                        if (reload === false) {
                            props.history.push('/home')
                        }
                    }
                }
            })
        }, [dispatch, props.history, user.googleAuth])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck

}
