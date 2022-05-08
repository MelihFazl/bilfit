package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * A model class representing the SportCourse entity
 * To clarify: Sport Activity can be done at any time (after making
 * a reservation) by the gym user, however Sport Course is the course
 * offered by the university and conducted with instructors
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class SportCourse {

	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// type of the course (For ex: H.I.I.T)
	private String type;
	// textual description of the sport course
	private String description;
	// start and end dates of the sport course
	private String startingDate;
	private String endingDate;
	// the final date that is possible to make reservation
	private LocalDate lastRegistrationDate;
	// instructor of this course
	@ManyToMany
	private List<GymStaff> instructors;
	// participants of this course
	@ManyToMany
	private List<GymMember> participants;
	// location of this course
	@OneToOne
	private SportCenter location;
	public String getType() {
		return this.type;
	}
}