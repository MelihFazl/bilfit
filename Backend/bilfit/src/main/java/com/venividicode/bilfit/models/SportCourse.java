package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
	// start and end dates of the sport course
	private String startingDate;
	private String endingDate;
	private Integer maxQuota;
	private Integer availableQuota;
	// the final date that is possible to make reservation
	private LocalDate lastRegistrationDate;
	@ElementCollection
	protected Set<String> courseDays = new HashSet();
	// participants of this course
	@ManyToMany
	private List<GymMember> participants;
	// location of this course
	@OneToOne
	private SportCenter location;
	private String field;
	public String getType() {
		return this.type;
	}
}