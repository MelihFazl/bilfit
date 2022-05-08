package com.venividicode.bilfit.models;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

/**
 * A model class representing the Admin entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Admin {
	// auto generated ID
	@Id
	private Long ID;
	private String hashedPassword;
	// generated token used for authentication
	@OneToOne
	private Token token;
}