package com.jinah.shop.dao;

import com.jinah.shop.dto.SiteUser;

import java.util.List;

public interface UserMapper {
    // Create
    void insertUser(SiteUser user);

    // Read

    SiteUser getUserByEmail(String email);
    SiteUser getUserById(int num);
    List<SiteUser> getAllUsers();

    // Update
    void updateUser(SiteUser user);

    // Delete
    void deleteUserById(int num);
}
