package com.jelly.backend.ajax;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.jelly.backend.MySql;
import com.jelly.backend.pojo.Bulletin;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by user on 2015/6/5.
 */
@WebServlet(name = "BulletinAction", urlPatterns = "/BulletinAction")
public class BulletinAction extends HttpServlet {
    MySql mysql = new MySql();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        String text = "some text";
        Gson gson = new Gson();
        JsonObject myObj = new JsonObject();
        response.setContentType("text/plain");  // Set content type of the response so that jQuery knows what it can expect.
        response.setCharacterEncoding("UTF-8"); // You want world domination, huh?
        System.out.println("action=" + action);
        try {
            if (action.equals("list")) {
                List<Bulletin> bulletinList = getBulletinList();
                myObj.addProperty("success",(bulletinList.size()>0));
                myObj.addProperty("data", gson.toJson(bulletinList));
            } else if (action.equals("add")) {
                String data = request.getParameter("data");
                Bulletin bulletin = gson.fromJson(data, Bulletin.class);
                boolean success = addBulletin(bulletin);
                myObj.addProperty("success", success);
            } else if(action.equals("remove")){
                String data = request.getParameter("data");
                Bulletin bulletin = gson.fromJson(data, Bulletin.class);
                boolean success = removeBulletin(bulletin);
                myObj.addProperty("success", success);
            } else if(action.equals("update")){
                String data = request.getParameter("data");
                Bulletin bulletin = gson.fromJson(data, Bulletin.class);
                boolean success = updateBulletin(bulletin);
                myObj.addProperty("success", success);
            }
            response.getWriter().write(myObj.toString());
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    private boolean addBulletin(Bulletin bulletin) throws Exception {
        String sql = "insert into bulletin(title,content) values ('" + bulletin.getTitle() + "','" + bulletin.getContent() + "')";
        return mysql.execute(sql);
    }

    private boolean removeBulletin(Bulletin bulletin) throws Exception{
        String sql = "delete from bulletin where id = "+bulletin.getId();
        return mysql.execute(sql);
    }

    private boolean updateBulletin(Bulletin bulletin) throws Exception{
        String sql = "update bulletin set "+
                "title = '"+bulletin.getTitle()+"',"+
                "content = '"+bulletin.getContent()+"'"+
                "where id = "+bulletin.getId();
        return mysql.execute(sql);
    }

    private List<Bulletin> getBulletinList() throws Exception {
        List<Bulletin> bulletinList = new ArrayList<Bulletin>();
        List<Map<String, String>> list = mysql.query("select * from bulletin");
        Bulletin bulletin = null;
        for (Map<String, String> row : list) {
            bulletin = new Bulletin();
            bulletin.setId(Integer.parseInt(row.get("id")));
            bulletin.setTitle(row.get("title"));
            bulletin.setContent(row.get("content"));
            bulletinList.add(bulletin);
        }
        return bulletinList;
    }
}
