package com.jinah.shop.controller;

import com.jinah.shop.dao.UserMapper;
import com.jinah.shop.dto.JoinDTO;
import com.jinah.shop.dto.SiteUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    // Create a new user
    @PostMapping
    public void createUser(@RequestBody JoinDTO join) {
        SiteUser user = new SiteUser();
        user.setMb_name(join.getName());
        user.setEmail(join.getEmail());
        user.setMb_pwd(join.getPassword());
        // Add other properties as needed

        // 비밀번호 확인
        if (!join.getPassword().equals(join.getPasswordConfirm())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        userMapper.insertUser(user);
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public SiteUser getUserById(@PathVariable("id") int id) {
        return userMapper.getUserById(id);
    }

    // Get all users
    @GetMapping
    public List<SiteUser> getAllUsers() {
        return userMapper.getAllUsers();
    }

    // Update a user
    @PutMapping("/{id}")
    public void updateUser(@PathVariable("id") int id, @RequestBody JoinDTO join) {
        SiteUser existingUser = userMapper.getUserById(id);
        if (existingUser != null) {
            existingUser.setEmail(join.getEmail());
            existingUser.setMb_pwd(join.getPassword());
            existingUser.setMb_name(join.getName());
            // Add other properties to update as needed

            // 비밀번호 확인
            if (!join.getPassword().equals(join.getPasswordConfirm())) {
                throw new RuntimeException("비밀번호가 일치하지 않습니다.");
            }

            userMapper.updateUser(existingUser);
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id) {
        userMapper.deleteUserById(id);
    }

    // Login a user
    @PostMapping("/login")
    public SiteUser loginUser(JoinDTO join) {
        // Find the user by email
        SiteUser user = userMapper.getUserByEmail(join.getEmail());

        // Check if the user exists and the password is correct
        if (user == null || !user.getMb_pwd().equals(join.getPassword())) {
            throw new RuntimeException("로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.");
        }
        // Return the user information (you can choose not to return the password)
        return user;
    }
}
