import axios from "axios";

export const registerUser = (user)=>async(dispatch)=>{
    dispatch({type:'USER_REGISTER_REQ'})
    try{
        
            const res = await axios.post('/api/users/register',user)
            console.log(res)
            dispatch({type:'USER_REGISTER_SUCCESS'})
            window.location.href="/login"
            
    }catch(error){
        dispatch({type:'USER_REGISTER_FAIL', payload:error})
    }
}

export const loginUser = (user)=>async(dispatch)=>{
    dispatch({type:'USER_LOGIN_REQ'})
    try{
       
            const response = await axios.post('/api/users/login',user)

            console.log(response.data)
            dispatch({type:'USER_LOGIN_SUCCESS', payload:response.data})
            localStorage.setItem('currentUser',JSON.stringify(response.data))
            window.location.href="/dashboard"
    
        }
        catch(error){
                dispatch({type:'USER_LOGIN_FAIL', payload:error})
                alert("Login failed")
    }
}

export const logoutUser = ()=>async(dispatch)=>{
    localStorage.removeItem('currentUser')
    window.location.href="/"
}

