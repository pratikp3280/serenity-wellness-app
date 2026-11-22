
package com.serenity.controller;
import java.util.Map;





import com.serenity.dto.LoginRequest;
import com.serenity.dto.RegisterRequest;
import com.serenity.dto.UserResponse;
import com.serenity.entity.User;
import com.serenity.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    public AuthController(
            UserService userService,
            AuthenticationManager authenticationManager,
            SecurityContextRepository securityContextRepository) {

        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.securityContextRepository = securityContextRepository;
    }

    // REGISTRATION

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        User savedUser = userService.registerUser(
                request.fullName(),
                request.email(),
                request.password()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UserResponse.from(savedUser));
    }

    // LOGIN

    @PostMapping("/login")
    public ResponseEntity<UserResponse> loginUser(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        Authentication authentication =
                authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        request.email().trim().toLowerCase(),
                        request.password()
                    )
                );

        // Creates an empty security context
        SecurityContext context =
                SecurityContextHolder.createEmptyContext();

        // Stores the authenticated user's identity in empty security context.
        context.setAuthentication(authentication);

        SecurityContextHolder.setContext(context);

        
        // It saves the context into the HTTP session so future requests can recognize the logged-in user.
        securityContextRepository.saveContext(
                context,
                httpRequest,
                httpResponse
        );

        User user = userService.getUserByEmail(
                authentication.getName()
        );

        return ResponseEntity.ok(
                UserResponse.from(user)
        );
    }

    // PROTECTED SESSION TEST

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            Authentication authentication) {

        User user = userService.getUserByEmail(
                authentication.getName()
        );

        return ResponseEntity.ok(
                UserResponse.from(user)
        );
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(
            Authentication authentication,
            HttpServletRequest request,
            HttpServletResponse response) {

        SecurityContextLogoutHandler logoutHandler =
                new SecurityContextLogoutHandler();

        logoutHandler.logout(request, response, authentication);

        return ResponseEntity.ok(
                Map.of("message", "Logged out successfully.")
        );
    }
    
    
}
