export function getJson(url){
    return fetch(url).then((res)=>{
        return res.json();
    });
}