package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * A model class representing the TimeSlot entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;
    private String timeSlot;
    private Integer currentCount;
}
