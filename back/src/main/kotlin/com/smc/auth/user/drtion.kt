package com.smc.auth.user

import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*

/**
 * Created by usign on 20/05/17.
 */
fun main(args: Array<String>) {
    val calendar = Calendar.getInstance()
    calendar.add(Calendar.MINUTE, 6)
    calendar.time.time

    ////val min = ChronoUnit.MINUTES.between(Instant.now(),Date(calendar.time.time).toInstant())
    val time = Instant.now().toEpochMilli() - 1495283843L
    println("${Instant.now().toEpochMilli()}")
    println("Min ${Date(1495283843L)}")
    println("Min ${Date(time)}")
}