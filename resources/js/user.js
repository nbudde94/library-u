class User {
    constructor() {
        this.init()
    }

    init() {
        this.loggedIn = localStorage.getItem('userLoggedIn')
    }

    authenticated() {
        localStorage.setItem('userLoggedIn', true)
        this.init()
    }

    logout() {
        localStorage.clear()
        this.loggedIn = null
    }

    /**
     *
     * @return {boolean}
     */
    isLoggedIn() {
        return Boolean(this.loggedIn) === true
    }
}

export default new User()
