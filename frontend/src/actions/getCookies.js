export function getCookie(name){
    var cookieValue = null
    if(document.cookie && document.cookie !==''){
        var cookies = document.cookie.split(";")
        for(var i = 0; i < cookies.length; i++){
            var cookie = cookies[i].trim(cookies[i])
            if(cookie.substring(0, name.length + 1) === (name + '=')){
                return decodeURIComponent(cookie.substring(name.length + 1))
            }
        }
    }
    return cookieValue
}