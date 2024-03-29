import { validateToken } from "../utils/checkvalidation.js";

export function checkForAuthenticationCookie(cookieName){
    return (req, res, next)=>{
     const tokenCookieValue = req.cookies[cookieName];
     if(!tokenCookieValue) {
       return  next();
     }
     try {
        const userPayload = validateToken(tokenCookieValue);
        let user = userPayload;
     } catch (error) {
        return next();
     }
     return next();
    }
}