package com.viktor.restcontrollers_js.service;



import com.viktor.restcontrollers_js.model.Role;

import java.util.List;


public interface RoleService {

    List<Role> getAllRoles();

    Role findById(int id);

    void saveRole(Role role);
}
