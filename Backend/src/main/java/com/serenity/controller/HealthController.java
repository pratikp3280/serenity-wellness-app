
package com.serenity.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Tells Spring that this class handles REST API requests.
@RestController

// Common URL prefix for APIs in this controller.
@RequestMapping("/api")
public class HealthController {

    // Handles HTTP GET requests sent to /api/health
    @GetMapping("/health")
    public Map<String, String> health() {

        // Return a JSON response.
        return Map.of(
            "status", "UP",
            "application", "Serenity"
        );
    }
}

/*
What is a health API?
A health API is a simple endpoint used to check whether an application is responding.
Think of it like asking your backend: "Hey, are you alive?"

*/