package com.venividicode.bilfit.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Admin {

	@Id
	private Long ID;
	private String hashedPassword;
	@OneToOne
	private Token token;
}