package com.viktor.restcontrollers_js.service;


import com.viktor.restcontrollers_js.dao.RoleDao;
import com.viktor.restcontrollers_js.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleDao roleDao;

    @Autowired
    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public List<Role> getAllRoles() {
        return roleDao.getAllRoles();
    }

    @Override
    public Role findById(int id) {
        return roleDao.findById(id);
    }

    @Override
    public void saveRole(Role role) {
        roleDao.saveRole(role);
    }
}
