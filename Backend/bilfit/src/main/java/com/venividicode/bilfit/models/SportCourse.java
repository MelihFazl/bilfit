package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SportCourse {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	private String type;
	private String description;
	@OneToMany
	private List<GymStaff> instructors;
	@OneToMany
	private List<GymMember> participants;
	@OneToOne
	private SportCenter location;
	public String getType() {
		return this.type;
	}
}