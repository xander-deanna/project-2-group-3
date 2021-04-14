module.exports = {
    check_id: (sessionUser, currentUser) => {
        if (sessionUser == currentUser) {
            return true
        }
        else {
            return false
        }
    }
};