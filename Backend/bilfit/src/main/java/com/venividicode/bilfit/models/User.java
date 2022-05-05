package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.util.HashMap;

@MappedSuperclass
@Getter
@Setter
public abstract class User {
	@Id
	private Long ID;
	private String name;
	private String email;
	private String phoneNumber;
	private String hashedPassword;
	@OneToOne
	private Token token;
}