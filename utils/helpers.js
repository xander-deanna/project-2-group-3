module.exports = {
    check_id: (sessionUser, currentUser) => {

        if (sessionUser === currentUser) {
            return true
        }
        else {
            return false
        }
    },

    check_multi: (idArr, currentid) => {
        let matchVal = false
        for(let i= 0; i<idArr.length; i++){
            if(idArr[i] === currentid){
                return matchVal = true
            }
        }
        return matchVal
    }
};