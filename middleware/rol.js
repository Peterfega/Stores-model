/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => { 
    try{
        
        const {user} = req


        const userRol = user.tipo_usuario

        console.log("role --->",userRol);
        const checkValueRol = roles.includes(userRol);

        if (!checkValueRol) {
            console.log("NOT_ALLOWED");
            res.json({
                        message : res.message,
                        error : "NOT_ALLOWED_403"
                    });
            return
        }

        console.log("Siguiente");
        
        next()
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
        console.log("ERROR_PERMISSIONS");
        res.json({message : err.message})
    }
}

module.exports = checkRol

