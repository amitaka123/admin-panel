class Auth{
    constructor(a,b,c="customer"){
        this.authenticated=a;
        this.token=b;
        this.role=c;
    }
    isAuthenticated()
    {
        return this.authenticated;
    }

    // static EmptyAuth(){
    //     return new Auth(false,"-");
    // }

    // static fromData(a,b)
}


export {Auth};