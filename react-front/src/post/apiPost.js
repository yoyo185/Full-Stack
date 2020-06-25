export const create = (userId,token,post) =>{
    console.log("USER post created",post);
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            //jwt token 前面要加bearer
            Authorization:`Bearer ${token}`
        },
        body:post
    })
        .then(response=>{
            return response.json();
        })
        .catch(err=>console.log(err));
};