package com.viktor.restcontrollers_js.controller;

import com.viktor.restcontrollers_js.model.Role;
import com.viktor.restcontrollers_js.model.User;
import com.viktor.restcontrollers_js.service.RoleService;
import com.viktor.restcontrollers_js.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api")
@RestController
public class UserRestController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping(value = "/users")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        final Iterable<User> users = userService.findAll();
        return users != null
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = this.userService.findById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/users")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping(value = "/users")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        if ("".equals(user.getStringRoles())) {
            user.setRoles(userService.findById(user.getId()).getRoles());
        }
        userService.updateUser(user);
        return new ResponseEntity<>(user, new HttpHeaders(), HttpStatus.OK);
    }


    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {
        userService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    _____________________________________________________________

    @GetMapping("/userInfo")
    public ResponseEntity<User> showUserById(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.findById(user.getId()));
    }
    @GetMapping("/roles")
    ResponseEntity<List<Role>>getAllRoles(){
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }
    @GetMapping("/roles/{id}")
    ResponseEntity<Role> getRoleById(@PathVariable("id") Long id){
        return new ResponseEntity<>(roleService.findById(id), HttpStatus.OK);
    }

}


