package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * A model class representing the SportCenter entity
 * Either East, Dormitories or Main Campus Hall
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class SportCenter {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// name of the sport center
	private String name;
	// sport activities that can be carried out in this sport center
	@OneToMany
	private List<SportActivity> availableActivities;
	// gym staff working in this sport center
	@OneToMany
	private List<GymStaff> staff;
	// open and close hours
	private LocalDateTime opensAt;
	private LocalDateTime closesAt;
	private Integer latestReservationStepValue;
	/*@OneToMany
	private List<Tournament> tournaments;
	@OneToMany
	private List<SportCourse> courses;*/
	private Double balance;
}