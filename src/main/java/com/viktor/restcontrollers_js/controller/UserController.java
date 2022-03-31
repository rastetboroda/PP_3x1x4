package com.viktor.restcontrollers_js.controller;

import com.viktor.restcontrollers_js.model.User;
import com.viktor.restcontrollers_js.service.RoleService;
import com.viktor.restcontrollers_js.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public void setRoleService(RoleService roleService) {

        this.roleService = roleService;
    }

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping("admin")
    public String listUsers(Model model){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        model.addAttribute("allUsers", userService.findAll());
        model.addAttribute("userEdit", new User());
        model.addAttribute("roles", roleService.getAllRoles());

        return "admin";
    }

    @GetMapping("user")
    public String getUsers(Model model){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        return "user";
    }
}
