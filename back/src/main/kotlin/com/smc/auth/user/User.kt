package com.smc.auth.user

import org.bson.types.ObjectId

/**
 * Created by usign on 01/05/17.
 */
data class User(val _id: ObjectId?=null,  val name: String, val email: String, val password: String)
data class Credential(val email: String, val password: String)
data class UserResponse(val success: Boolean, val message: String, val data: Any?=null, val errors: Map<String, String>?= mapOf(), val token: String?="")