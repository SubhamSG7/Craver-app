import axios from "axios";




export async function LogOut(){
    try {
        const removeToken=await axios.post("http://localhost:3000/api/logout",null,{
            withCredentials:true
        });
        return removeToken.data
        
    } catch (error) {
        console.log(error);
    }

}