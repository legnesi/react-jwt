package com.smc.auth
import spark.Filter
import spark.Request
import spark.Response
import spark.Spark.*


fun main(args: Array<String>) {
    enableCORS()
    post("/api/login", ::login)
    post("/api/signUp", ::signUp)
    get("/api/dashboard", ::getDashboardMessage)
    get("/api/checkAuth", ::checkAuthentication)

    before("/api/dashboard", JwtTokenFilter())
}

private fun enableCORS() {
    options("/*", ::cors)
    before(Filter { _, response ->
        response.header("Access-Control-Allow-Origin", "*")
        response.header("Access-Control-Request-Method", "*")
        response.header("Access-Control-Allow-Headers", "*")
        response.type("application/json")
    })
}


private fun cors(request: Request, response: Response) : String {
    val accessControlRequestHeaders = request
            .headers("Access-Control-Request-Headers")
    if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers",
                accessControlRequestHeaders)
    }

    val accessControlRequestMethod = request
            .headers("Access-Control-Request-Method")
    if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods",
                accessControlRequestMethod)
    }

    return "OK"
}