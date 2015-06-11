package com.jelly.backend.ajax;

import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by user on 2015/6/11.
 */
@WebServlet(name = "JellyAction", urlPatterns = "/JellyAction")
public class JellyAction extends HttpServlet {
    private String pdfPassword = "123";
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String password = request.getParameter("password");
        JsonObject myObj = new JsonObject();
        response.setContentType("text/plain");  // Set content type of the response so that jQuery knows what it can expect.
        response.setCharacterEncoding("UTF-8"); // You want world domination, huh?
        myObj.addProperty("success", password.equals(pdfPassword));
        response.getWriter().write(myObj.toString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
