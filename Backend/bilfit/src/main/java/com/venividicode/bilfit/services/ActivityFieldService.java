package com.venividicode.bilfit.services;

import com.venividicode.bilfit.models.Field;
import com.venividicode.bilfit.models.SportActivity;

import java.util.List;

public interface ActivityFieldService
{
    //For Activity
    public List<SportActivity> getAllSportActivities();
    public List<SportActivity> getSportActivityByID(long id);
    public SportActivity saveSportActivity(SportActivity sportActivity);
    public SportActivity deleteSportActivityByID(long id);

    //For Field
    public List<Field> getAllFields();
    public List<Field> getFieldByID(long id);
    public Field saveField(Field field);
    public Field deleteFieldByID(long id);
}
