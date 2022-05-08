package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.util.HashMap;

/**
 * A model class representing the User entity
 * @author Veni Vidi Code
 */
@MappedSuperclass
@Getter
@Setter
public abstract class User {
	// auto generated ID
	@Id
	private Long ID;
	// some physical and personal attributes
	private String name;
	private String email;
	private String phoneNumber;
	private String hashedPassword;
	// used for authentication purposes
	@OneToOne
	private Token token;
}