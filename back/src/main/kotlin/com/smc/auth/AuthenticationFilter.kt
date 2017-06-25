package com.smc.auth

import com.smc.auth.AuthUtil.getTokenFromAuthorizationHeader
import com.smc.auth.AuthUtil.isValidToken
import org.slf4j.LoggerFactory
import spark.Filter
import spark.Request
import spark.Response
import spark.Spark.halt

/**
 * Created by usign on 01/05/17.
 */
private val LOGGER = LoggerFactory.getLogger(JwtTokenFilter::class.java)
val MESSAGE_FOR_UNAUTHORIZED_USER = "You're are not authorized or your session is expired! Login first"
val HTTP_METHOD_OPTIONS = "OPTIONS"
class JwtTokenFilter : Filter {
    override fun handle(request: Request, response: Response) {
        if (request.requestMethod() != HTTP_METHOD_OPTIONS) {
            if (!isValidToken(getTokenFromAuthorizationHeader(request.headers(TOKEN_KEY)))) {
                LOGGER.error("[UNAUTHORIZED USER]")
                halt(401, MESSAGE_FOR_UNAUTHORIZED_USER)
            }
        }
    }
}