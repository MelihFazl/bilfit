package com.venividicode.bilfit.models;


import javax.persistence.*;
import java.util.List;


@Entity
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    /**
     * regarding the mappings below: I thought of Contact as a single entity storing all the information
     * of all the gym staffs, instead of one Contact storing information of one gym staff. That's why mappings
     * are OneToMany. This may need to be revisited later on.
     */
    @OneToMany
    private List<SportCenter> sportCenters;
    @OneToMany
    private List<GymStaff> gymStaffs;


    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public List<SportCenter> getSportCenters() {
        return sportCenters;
    }

    public void setSportCenters(List<SportCenter> sportCenters) {
        this.sportCenters = sportCenters;
    }

    public List<GymStaff> getGymStaffs() {
        return gymStaffs;
    }

    public void setGymStaffs(List<GymStaff> gymStaffs) {
        this.gymStaffs = gymStaffs;
    }
}
