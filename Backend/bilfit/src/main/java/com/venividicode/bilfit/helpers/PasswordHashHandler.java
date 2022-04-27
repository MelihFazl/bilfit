package com.venividicode.bilfit.helpers;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class PasswordHashHandler {
    private String password;

    public PasswordHashHandler(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String hashPassword()
    {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(this.password.getBytes(StandardCharsets.UTF_8));
            BigInteger number = new BigInteger(1, hash);
            StringBuilder hexString = new StringBuilder(number.toString(16));
            while(hexString.length() < 32)
            {
                hexString.insert(0, '0');
            }
            return hexString.toString();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

}
