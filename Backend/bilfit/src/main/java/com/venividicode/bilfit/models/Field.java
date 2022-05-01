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
public class Field {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	@OneToOne
	private SportActivity activity;
	private int maxQuota;
	@ElementCollection(targetClass=String.class)
	private List<String> occupiableTimeSlots;
	public SportActivity getActivity() {
		return this.activity;
	}
}