package com.venividicode.bilfit.models;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Random;

/**
 * A model class representing the Token entity
 * Token is used for authentication purposes
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    @Column(name = "token", columnDefinition = "LONGTEXT")
    private String token;
    private Boolean inUse;
    private LocalDateTime lastActive;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;


    public String generateToken()
    {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@.-*!";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 400) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        this.token = saltStr;
        return saltStr;
    }
}
