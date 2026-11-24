
package com.serenity.config;

import java.util.List;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.function.Supplier;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;
import org.springframework.util.StringUtils;



@Configuration
public class SecurityConfig {

    @Bean
    public CsrfTokenRepository csrfTokenRepository() {
        return CookieCsrfTokenRepository.withHttpOnlyFalse();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }
    
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Allow requests from our React frontend.
        configuration.setAllowedOrigins(
            List.of("http://localhost:5173")
        );

        // Allow the HTTP methods required by our APIs.
        configuration.setAllowedMethods(
            List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        );

        // Allow JSON requests and the CSRF header.
        configuration.setAllowedHeaders(
            List.of("Content-Type", "X-XSRF-TOKEN")
        );

        // Allow browser session cookies.
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
    
    

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

    	http
        .cors(cors -> cors
            .configurationSource(corsConfigurationSource())
        )

        .csrf(csrf -> csrf
            .csrfTokenRepository(csrfTokenRepository())
            .csrfTokenRequestHandler(
                new SpaCsrfTokenRequestHandler()
            )
        )

            .authorizeHttpRequests(auth -> auth

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/auth/register",
                    "/api/auth/login"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/auth/csrf",
                    "/api/health"
                ).permitAll()

             // Public visitors can view approved testimonials and their summary.
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/testimonials",
                    "/api/testimonials/summary"
                ).permitAll()
                
                
                
             // Everything else requires authentication unless explicitly permitted.
                .anyRequest().authenticated()
            )

            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.IF_REQUIRED
                )
            )

            .securityContext(context -> context
                .securityContextRepository(
                    securityContextRepository()
                )
            )

            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }

    private static final class SpaCsrfTokenRequestHandler
            implements CsrfTokenRequestHandler {

        private final CsrfTokenRequestHandler plain =
                new CsrfTokenRequestAttributeHandler();

        private final CsrfTokenRequestHandler xor =
                new XorCsrfTokenRequestAttributeHandler();

        @Override
        public void handle(
                HttpServletRequest request,
                HttpServletResponse response,
                Supplier<CsrfToken> deferredCsrfToken) {

            this.xor.handle(request, response, deferredCsrfToken);

            // Force creation of the deferred token and cookie.
            deferredCsrfToken.get();
        }

        
        
        
        @Override
        public String resolveCsrfTokenValue(
                HttpServletRequest request,
                CsrfToken csrfToken) {

            String headerValue =
                    request.getHeader(csrfToken.getHeaderName());

            CsrfTokenRequestHandler handler =
                    StringUtils.hasText(headerValue)
                    ? this.plain
                    : this.xor;

            return handler.resolveCsrfTokenValue(
                    request, csrfToken
            );
        }
    }
}




/* 
 Code						Meaning
@Configuration				Marks this as a Spring configuration class.
@Bean						Registers the security filter chain in Spring's application context.
SecurityFilterChain			Defines how incoming HTTP requests are secured.
permitAll()					Allows requests without authentication.
authenticated()				Requires an authenticated user.
IF_REQUIRED					Creates a session when authentication needs one.
CookieCsrfTokenRepository	Stores CSRF tokens in a cookie for browser-based clients.



Component									Responsibility
CsrfTokenRepository							Stores and retrieves CSRF tokens.
SecurityContextRepository					Stores and retrieves authentication context.
HttpSessionSecurityContextRepository		Stores security context in the HTTP session.
SpaCsrfTokenRequestHandler					Supports React-style CSRF token submission.
IF_REQUIRED									Creates a session when needed.











Endpoint					Access
POST /api/auth/register		Public
POST /api/auth/login		Public
GET /api/health				Public
Future /api/users/me		Authenticated
Future /api/moods/**		Authenticated
Future /api/breathing-sessions/**	Authenticated




 * */
