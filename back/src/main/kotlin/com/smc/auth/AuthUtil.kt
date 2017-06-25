package com.smc.auth

import com.smc.auth.user.User
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.slf4j.LoggerFactory
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*

/**
 * Created by usign on 13/05/17.
 */
private val LOGGER = LoggerFactory.getLogger(AuthUtil::class.java)
val TOKEN_KEY = "Authorization"
val JWT_SECRET_KEY = "MBERIMBEU90"
object AuthUtil {
    fun isValidToken(jwtToken: String?) : Boolean {
        try {
            return jwtToken != null && Jwts.parser().setSigningKey(JWT_SECRET_KEY).parseClaimsJws(jwtToken) != null
        }catch (e: Exception) {
            LOGGER.error("[UNAUTHORIZED USER]", e)
            return false
        }

    }

    fun getTokenFromAuthorizationHeader(headerValue : String?) = if (headerValue != null) headerValue.split("Bearer")[1].trim() else null

    fun generateToken(user: User) : String {
        val calendar = Calendar.getInstance()
        calendar.add(Calendar.MINUTE, 6)
        val jwtToken = Jwts.builder()
                .setSubject(user._id.toString())
                .setExpiration(calendar.time)
                .claim("name", user.name)
                .claim("authTime", calendar.time.time)
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET_KEY)
                .compact()

        return jwtToken
    }

    fun getJwtPayloadInfos(token: String) : Pair<String, Long> {
        val claimsJws = Jwts.parser().setSigningKey(JWT_SECRET_KEY).parseClaimsJws(token)
        val startTime = claimsJws.body["authTime"] as Long
        val userName = claimsJws.body["name"] as String

        return userName to ChronoUnit.MINUTES.between(Instant.now(), Date(startTime).toInstant())
    }


}
