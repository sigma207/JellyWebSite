package com.jelly.backend;

import java.sql.*;
/**
 * Created by user on 2015/6/4.
 */
public class MySql {
    String dbUrl = "localhost:3306";
    String dbName = "test";
    String dbUser = "root";
    String dbPassword = "1234";
    Connection conn;
    public void connected() throws Exception{
        conn = DriverManager.getConnection("jdbc:mysql://" + dbUrl + "/" + dbName + "?user=" + dbUser + "&password=" + dbPassword +
                "&useUnicode=true&characterEncoding=UTF-8");
        System.out.println("connected");
    }

    public void query(String sql) throws Exception{
        Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
        ResultSet rs = stmt.executeQuery(sql);

        while (rs.next()){
            System.out.println(rs.getString("id"));
        }
        System.out.println("rs loop end");
    }
}
