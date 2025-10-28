class ApiResponse{
    constructor(statusCode,portfolios,message = "Success" ){
        this.statusCode = statusCode
        this.portfolios = portfolios
        this.message = message
        this.success = statusCode < 400;
    }
}
export {ApiResponse}