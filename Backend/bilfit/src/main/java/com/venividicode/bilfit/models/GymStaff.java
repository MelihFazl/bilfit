package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

/**
 * A model class representing the GymStaff entity
 * (extends User)
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class GymStaff extends User {
	// the places this gym staff works in
	@OneToMany
	private List<SportCenter> workplaces;
}