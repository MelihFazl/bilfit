package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SportCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	private String name;
	@OneToMany
	private List<SportActivity> availableActivities;
	@OneToMany
	private List<GymStaff> staff;
	private LocalDateTime opensAt;
	private LocalDateTime closesAt;
	private Integer latestReservationStepValue;
	@OneToMany
	private List<Tournament> tournaments;
	@OneToMany
	private List<SportCourse> courses;
	private Double balance;
	public String getName() {
		return this.name;
	}
}