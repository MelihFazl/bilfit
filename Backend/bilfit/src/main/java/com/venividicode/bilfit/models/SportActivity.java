package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * A model class representing the SportActivity entity
 * For example: Tennis, Basketball...
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class SportActivity {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// name of the activity
	private String Activity;
	// the fields that can be used to carry out this sport activity
	@OneToMany
	private List<Field> fields;
}