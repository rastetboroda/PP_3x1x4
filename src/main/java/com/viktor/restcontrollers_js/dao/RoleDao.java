package com.viktor.restcontrollers_js.dao;


import com.viktor.restcontrollers_js.model.Role;

import java.util.List;

public interface RoleDao {

    List<Role> getAllRoles();

    Role findById(Long id);

    void saveRole(Role role);
}
