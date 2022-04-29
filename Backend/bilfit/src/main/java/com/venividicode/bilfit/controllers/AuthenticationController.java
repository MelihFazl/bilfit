package com.venividicode.bilfit.controllers;

import com.venividicode.bilfit.helpers.LoginRequest;
import com.venividicode.bilfit.helpers.PasswordHashHandler;
import com.venividicode.bilfit.security.AdminTokenGenerator;
import com.venividicode.bilfit.services.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController
{
    private PasswordHashHandler hashHandler = new PasswordHashHandler("");
    private AuthenticationManager authenticationManager;
    private AdminTokenGenerator tokenGenerator;
    private AdminService service;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest)
    {
        hashHandler.setPassword(loginRequest.getPassword());
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername()
                , hashHandler.hashPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = tokenGenerator.generateJwtToken(auth);
        return "Bearer " + token;
    }
}
