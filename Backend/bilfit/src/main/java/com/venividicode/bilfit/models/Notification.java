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
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	@ElementCollection(targetClass=Long.class)
	private List<Long> targetIDs;
	private String content;
	private String title;
	//Annotation?
	public List<Long> getTargetIDs() {
		return targetIDs;
	}

}