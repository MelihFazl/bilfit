package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.implementation.bind.annotation.Empty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class GymMember extends User {

	private Double height;
	private Double weight;
	private String gender;
	private LocalDateTime birthday;
	@OneToMany
	private List<Reservation> reservations;
	private Boolean isRestricted;

	@OneToOne
	private GymProgram program;
	//private MemberTypeStrategy typeStrategy;
}