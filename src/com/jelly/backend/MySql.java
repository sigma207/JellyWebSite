package com.jelly.backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by user on 2015/6/4.
 */
public class MySql {
    String dbUrl = "127.0.0.1:3306";
    String dbName = "test";
    String dbUser = "root";
    String dbPassword = "1234";

    public MySql(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    private Connection connect() throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:mysql://" + dbUrl + "/" + dbName + "?user=" + dbUser + "&password=" + dbPassword +
                "&useUnicode=true&characterEncoding=UTF-8");
        System.out.println("connected");
        return conn;
    }

    public List<Map<String, String>> query(String sql) throws Exception{
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        Connection conn = null;
        ResultSet rs = null;
        try {
            conn = connect();
            Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            rs = stmt.executeQuery(sql);
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();
            List<String> columns = new ArrayList<String>();
            for (int i = 1; i <= columnCount; i++) {
                columns.add(metaData.getColumnLabel(i));
            }
            Map<String, String> row = null;
            while (rs.next()) {
                row = new HashMap<String, String>();
                for (String key : columns) {
                    row.put(key, rs.getString(key));
                }
                list.add(row);
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        } finally {
            try{
                if(rs != null){
                    rs.close();
                }
                if(conn !=null){
                    conn.close();
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return list;
    }

    public boolean execute(String sql) throws Exception{
        Connection conn = null;
        boolean success = false;
        try {
            conn = connect();
            Statement stmt = conn.createStatement();
            int status = stmt.executeUpdate(sql);
            if(status==1){
                success = true;
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            try{
                if(conn !=null){
                    conn.close();
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return success;
    }
}
