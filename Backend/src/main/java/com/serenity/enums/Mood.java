
package com.serenity.enums;

public enum Mood {
// Java convention uses uppercase for enum constants.
    HAPPY,
    CALM,
    EXCITED,
    GRATEFUL,
    NEUTRAL,
    SAD,
    ANXIOUS,
    STRESSED,
    ANGRY,
    TIRED

}


/*
A Java enum : special Java type used to represent a fixed set of predefined constants.

In Serenity, users must choose one of exactly ten moods. They cannot enter an arbitrary mood value.


database expects lowercase values. We'll handle that with a Moodconverter separately.

 */