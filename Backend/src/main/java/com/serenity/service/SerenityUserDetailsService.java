/* It's a Spring Security interface used to load a user's information during authentication. **/

package com.serenity.service;

import java.util.Locale;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.serenity.repository.UserRepository;

@Service
public class SerenityUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public SerenityUserDetailsService(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        String normalizedEmail =
                email.trim().toLowerCase(Locale.ROOT);

        com.serenity.entity.User user =
                userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() ->
                    new UsernameNotFoundException(
                        "Invalid email or password."
                    )
                );

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPasswordHash())
                .roles("USER")                      // It gives every registered Serenity user the authority ROLE_USER
                .build();
    }
}

