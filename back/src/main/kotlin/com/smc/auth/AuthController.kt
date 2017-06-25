package com.smc.auth

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.smc.auth.AuthUtil.generateToken
import com.smc.auth.AuthUtil.getJwtPayloadInfos
import com.smc.auth.AuthUtil.getTokenFromAuthorizationHeader
import com.smc.auth.AuthUtil.isValidToken
import com.smc.auth.user.Credential
import com.smc.auth.user.User
import com.smc.auth.user.UserResponse
import org.litote.kmongo.*
import org.mindrot.jbcrypt.BCrypt
import org.slf4j.LoggerFactory
import spark.Request
import spark.Response


/**
 * Created by usign on 30/04/17.
 */
private val LOGGER = LoggerFactory.getLogger(AuthController::class.java)
private val MONGO_HOST = System.getenv("MONGO_HOST") ?: "localhost"
open class AuthController

fun login(request: Request, response: Response) : String {
    response.type("application/json")
    val jsonMapper = jacksonObjectMapper()
    val credential: Credential = jsonMapper.readValue(request.body())

    val userCollection = KMongo.createClient(MONGO_HOST).getDatabase("react_app").getCollection<User>("users")
    val user = userCollection.findOne("{email: ${credential.email.json}}")
    if( user == null || !BCrypt.checkpw(credential.password, user.password) ) {
        response.status(400)
        val userResponse = UserResponse(
                success = false,
                message = "Incorrect email or password",
                errors = mapOf("email" to "Incorrect email or password", "password" to "Incorrect email or password")
        )
        LOGGER.error("[LOGIN]" + userResponse.message)
        return jsonMapper.writeValueAsString(userResponse)
    }

    response.status(200)
    val userResponse = UserResponse(
            success = true,
            message = "You have successfully logged in!",
            data = user.name,
            token = generateToken(user)
    )
    LOGGER.info("[LOGIN]" + userResponse.message)
    //response.header("token", generateToken(user))
    return jsonMapper.writeValueAsString(userResponse)
}

fun signUp(request: Request, response: Response) : String {
    response.type("application/json")
    val userResponse : UserResponse
    val jsonMapper = jacksonObjectMapper()
    val user: User = jsonMapper.readValue(request.body())

    val userCollection = KMongo.createClient(MONGO_HOST).getDatabase("react_app").getCollection<User>("users")
    val retrievedUser = userCollection.findOne("{email: ${user.email.json}}")
    if(retrievedUser != null) {
        response.status(409)
        userResponse = UserResponse(success = false, message = "Check the form for error", errors = mapOf("email" to "This email is already taken"))
        LOGGER.error("[SIGNUP]" + userResponse.message)
    } else {
        userCollection.save(user.copy(password = BCrypt.hashpw(user.password, BCrypt.gensalt(12))))
        userResponse = UserResponse(success = true, message = "You have successfully signed up! Now you should be able to log in.")
        response.status(201)
        LOGGER.info("[SIGNUP]" + userResponse.message)
    }

    return jsonMapper.writeValueAsString(userResponse)
}

fun getDashboardMessage(request: Request, response: Response) : String {
    response.status(200)
    response.type("application/json")
    val jwtPayloadInfo = getJwtPayloadInfos(getTokenFromAuthorizationHeader(request.headers(TOKEN_KEY))!!)
    val timerMessage = if (jwtPayloadInfo.second == 0L) "soon" else  "in ${jwtPayloadInfo.second} min"
    val message = "Hello ${jwtPayloadInfo.first}! You're authorized to see this secret message. " +
            "Your authorization will expired $timerMessage"
    return jacksonObjectMapper().writeValueAsString(message)
}

fun checkAuthentication(request: Request, response: Response) : Boolean {
    response.type("application/json")
    response.status(200)
    val token = getTokenFromAuthorizationHeader(request.headers(TOKEN_KEY))
    return isValidToken(token)
}