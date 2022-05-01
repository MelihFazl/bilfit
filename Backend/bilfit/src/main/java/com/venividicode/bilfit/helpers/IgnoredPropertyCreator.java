package com.venividicode.bilfit.helpers;

import com.venividicode.bilfit.models.User;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.FeatureDescriptor;
import java.util.stream.Stream;

public class IgnoredPropertyCreator {
    private Object obj;
    private static IgnoredPropertyCreator instance;

    private IgnoredPropertyCreator() {
        this.obj = null;
    }

    public static IgnoredPropertyCreator getInstance()
    {
        if(instance == null)
            instance = new IgnoredPropertyCreator();
        return instance;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    public String[] getNullPropertyNames() {
        final BeanWrapper wrappedSource = new BeanWrapperImpl(obj);
        return Stream.of(wrappedSource.getPropertyDescriptors())
                .map(FeatureDescriptor::getName)
                .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null)
                .toArray(String[]::new);
    }
}
