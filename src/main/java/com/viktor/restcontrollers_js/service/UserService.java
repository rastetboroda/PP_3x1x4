package com.viktor.restcontrollers_js.service;


import com.viktor.restcontrollers_js.model.User;

public interface UserService {
    public User findByName(String name);

    User save(User user);

    User findById(int id);

    Iterable<User> findAll();

    void deleteById(int id);

    User updateUser(User user);
}
