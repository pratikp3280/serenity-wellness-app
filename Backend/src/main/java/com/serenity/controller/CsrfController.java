/*Spring Security makes the CSRF token available to the request.*/
package com.serenity.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class CsrfController {

    public record CsrfResponse(
            String headerName,
            String parameterName,
            String token
    ) {}

    @GetMapping("/csrf")
    public CsrfResponse getCsrfToken(CsrfToken csrfToken) {

        return new CsrfResponse(
                csrfToken.getHeaderName(),
                csrfToken.getParameterName(),
                csrfToken.getToken()
        );
    }
}


/*  
 * What happens During Login Flow
Postman/Client
|
| POST /api/auth/login
| email + password + CSRF token
v
AuthController
|
v
AuthenticationManager
|
v
SerenityUserDetailsService
|
v
UserRepository → MySQL
|
v
PasswordEncoder.matches()
|
v
Authentication successful!
|
v
SecurityContext created and saved
|
v
HTTP session established 

*
*
*
*
A session cookie should be present after successful session-based authentication.
*

What is JSESSIONID?
It is the session identifier that allows your backend to associate subsequent requests with the authenticated session.

Think of it as your temporary entry pass.


Two different cookies — two different purposes
Cookie			Purpose
1. XSRF-TOKEN	CSRF protection
2. JSESSIONID	Identifies the HTTP session

*
*/



