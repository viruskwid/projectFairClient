import { commonAPI } from "./CommonAPI"
import { SERVER_URL } from "./ServerUrl"

//register API
export const registerAPI = async (user)=>{

    return await commonAPI("POST",`${SERVER_URL}/register`,user , "")
}
//;login Api
export const loginAPI= async(user)=>{
    return await commonAPI("POST" , `${SERVER_URL}/login` , user,"")
}

//add project

export const addProjectAPI = async (reqBody , reqHeader)=>{
    return await commonAPI("POST", `${SERVER_URL}/addproject`,reqBody,reqHeader)
}

//home project API
export const getHomeProjectAPI = async ()=>{
    return await commonAPI("GET", `${SERVER_URL}/home-projects`,"","")
}

//all project API
export const getAllProjectAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)
}

//user project API
export const getUserProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/user-projects`,"",reqHeader)
}
//edit project Api
 export const editProjectAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${id}`,reqBody,reqHeader)
 }

 //project/remove
 export const deleteProjectAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/project/remove/${id}`,{},reqHeader)
 }

 //user/edit api

 export const UpdateUserProfileAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user/update`,reqBody,reqHeader)
 }